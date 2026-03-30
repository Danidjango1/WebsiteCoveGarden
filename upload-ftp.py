#!/usr/bin/env python3
"""
FTP Upload Script for Cove Garden Website
Automatischer Upload zu all-inkl bei Dateienänderungen
"""

import os
import sys
import ftplib
from pathlib import Path
from dotenv import load_dotenv
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import time
import logging

# Logging konfigurieren
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# .env laden
load_dotenv()

# FTP Einstellungen
FTP_HOST = os.getenv('FTP_HOST')
FTP_USER = os.getenv('FTP_USER')
FTP_PASSWORD = os.getenv('FTP_PASSWORD')
FTP_REMOTE_PATH = os.getenv('FTP_REMOTE_PATH', '/')

# Lokale Einstellungen
PROJECT_ROOT = Path(__file__).parent
FILES_TO_UPLOAD = ['index.html', 'style.css', 'script.js']
FOLDERS_TO_UPLOAD = ['images']

# Dateien ignorieren
IGNORE_PATTERNS = ['.DS_Store', '.gitignore', 'CLAUDE.md', '.git', '.env', 'upload-ftp.py', 'requirements.txt', '.watchdog', '.vscode']


class FTPUploader:
    """Verwaltet FTP-Verbindung und Uploads"""
    
    def __init__(self):
        self.ftp = None
        self.last_upload = {}
    
    def connect(self):
        """Verbindung zu FTP-Server herstellen"""
        try:
            self.ftp = ftplib.FTP(FTP_HOST, FTP_USER, FTP_PASSWORD)
            logger.info(f"✓ Mit FTP verbunden: {FTP_HOST}")
            return True
        except Exception as e:
            logger.error(f"✗ FTP-Fehler: {e}")
            return False
    
    def disconnect(self):
        """FTP-Verbindung trennen"""
        try:
            if self.ftp:
                self.ftp.quit()
        except:
            pass
    
    def upload_file(self, local_path, remote_rel_path):
        """Datei zu FTP hochladen"""
        try:
            # Ablauf-Limitierung: nur 1x pro 0.5 Sekunden upload
            file_key = str(remote_rel_path)
            now = time.time()
            if file_key in self.last_upload and (now - self.last_upload[file_key]) < 0.5:
                return False
            
            self.last_upload[file_key] = now
            
            remote_path = FTP_REMOTE_PATH.rstrip('/') + '/' + remote_rel_path.replace('\\', '/')
            remote_dir = '/'.join(remote_path.split('/')[:-1])
            
            # Zielverzeichnis erstellen falls nötig
            try:
                self.ftp.cwd('/')
                for part in remote_dir.split('/'):
                    if part:
                        try:
                            self.ftp.cwd(part)
                        except:
                            self.ftp.mkd(part)
                            self.ftp.cwd(part)
            except Exception as e:
                logger.warning(f"Verzeichnis-Problem: {e}")
            
            # Datei hochladen
            with open(local_path, 'rb') as f:
                self.ftp.storbinary(f'STOR {remote_path.split("/")[-1]}', f)
            
            logger.info(f"↑ Upload: {remote_rel_path}")
            return True
        except Exception as e:
            logger.error(f"✗ Upload-Fehler ({remote_rel_path}): {e}")
            return False
    
    def upload_directory(self, local_dir, remote_rel_path):
        """Komplettes Verzeichnis hochladen"""
        try:
            local_dir = Path(local_dir)
            for file_path in local_dir.rglob('*'):
                if file_path.is_file():
                    # Ignore check
                    if any(pattern in str(file_path) for pattern in IGNORE_PATTERNS):
                        continue
                    
                    rel_path = remote_rel_path / file_path.relative_to(local_dir)
                    self.upload_file(file_path, rel_path)
        except Exception as e:
            logger.error(f"✗ Verzeichnis-Upload-Fehler: {e}")


class ChangeHandler(FileSystemEventHandler):
    """Watchdog-Handler für Dateiänderungen"""
    
    def __init__(self, uploader):
        self.uploader = uploader
    
    def should_process(self, path):
        """Prüft ob Datei verarbeitet werden soll"""
        # Ignoriere bestimmte Dateien/Ordner
        if any(pattern in path for pattern in IGNORE_PATTERNS):
            return False
        
        # Prüfe ob Datei zum Upload gehört
        rel_path = str(Path(path).relative_to(PROJECT_ROOT))
        
        # Einzelne Dateien
        if Path(path).is_file() and Path(path).name in FILES_TO_UPLOAD:
            return True
        
        # Verzeichnisse
        for folder in FOLDERS_TO_UPLOAD:
            if rel_path.startswith(folder):
                return True
        
        return False
    
    def on_modified(self, event):
        if event.is_directory:
            return
        if self.should_process(event.src_path):
            local_path = Path(event.src_path)
            remote_path = local_path.relative_to(PROJECT_ROOT)
            self.uploader.upload_file(local_path, remote_path)
    
    def on_created(self, event):
        if event.is_directory:
            return
        if self.should_process(event.src_path):
            local_path = Path(event.src_path)
            remote_path = local_path.relative_to(PROJECT_ROOT)
            self.uploader.upload_file(local_path, remote_path)


def initial_upload(uploader):
    """Initiales Upload aller Dateien"""
    logger.info("📁 Starte initiales Upload...")
    
    # Einzelne Dateien
    for file in FILES_TO_UPLOAD:
        file_path = PROJECT_ROOT / file
        if file_path.exists():
            uploader.upload_file(file_path, Path(file))
    
    # Verzeichnisse
    for folder in FOLDERS_TO_UPLOAD:
        folder_path = PROJECT_ROOT / folder
        if folder_path.exists():
            uploader.upload_directory(folder_path, Path(folder))
    
    logger.info("✓ Initiales Upload abgeschlossen")


def main():
    """Hauptfunktion"""
    # Credentials prüfen
    if not all([FTP_HOST, FTP_USER, FTP_PASSWORD]):
        logger.error("✗ Fehler: FTP-Credentials fehlen in .env")
        logger.error("   Bitte .env mit FTP_HOST, FTP_USER, FTP_PASSWORD füllen")
        sys.exit(1)
    
    logger.info(f"🚀 Cove Garden FTP Upload-Watcher gestartet")
    logger.info(f"   Host: {FTP_HOST}")
    logger.info(f"   User: {FTP_USER}")
    logger.info(f"   Remote Path: {FTP_REMOTE_PATH}")
    
    uploader = FTPUploader()
    
    # Initial verbinden und hochladen
    if not uploader.connect():
        sys.exit(1)
    
    initial_upload(uploader)
    uploader.disconnect()
    
    # Watchdog starten
    event_handler = ChangeHandler(uploader)
    observer = Observer()
    observer.schedule(event_handler, str(PROJECT_ROOT), recursive=True)
    observer.start()
    
    logger.info("👁️  Watch-Modus aktiv. Drücke Ctrl+C zum Beenden.")
    
    try:
        while True:
            if not uploader.ftp:
                uploader.connect()
            time.sleep(1)
    except KeyboardInterrupt:
        logger.info("⏹️  Upload-Watcher beendet")
        observer.stop()
    
    observer.join()
    uploader.disconnect()


if __name__ == '__main__':
    main()
