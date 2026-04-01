# FTP Auto-Upload für Cove Garden

Automatischer Upload deiner Website-Dateien zu all-inkl bei jeder Änderung.

> Hinweis: Das ist ein optionaler lokaler Fallback. Primär wird in diesem Projekt per GitHub Actions deployt.

## Setup

### 1. Dependencies installieren
```bash
pip install -r requirements.txt
```

### 2. .env konfigurieren
```bash
cp .env.example .env
```

Dann `.env` mit deinen all-inkl FTP-Daten füllen:
```
FTP_HOST=ftp.deine-domain.de
FTP_USER=dein_ftp_benutzer
FTP_PASSWORD=dein_ftp_passwort
FTP_REMOTE_PATH=/public_html
```

> **Sicherheit**: `.env` wird durch `.gitignore` ignoriert — deine Credentials sind niemals im Git!

### 3. Skript starten
```bash
python upload-ftp.py
```

## Was wird hochgeladen?

✅ **Automatisch uploadet:**
- `index.html`
- `style.css`
- `script.js`
- Kompletter `/images` Ordner

❌ **Ignoriert:**
- `.env` (Credentials)
- `CLAUDE.md` (Projekt-Dokumentation)
- `.git` (Git-Daten)
- `.vscode/` (Editor-Einstellungen)
- Dieses Skript selbst

## Verwendung

1. Terminal öffnen → `cd` ins Projekt
2. `python upload-ftp.py` starten
3. Watcher läuft aktiv und uploadt bei jeder Änderung
4. `Ctrl+C` zum Beenden

## Troubleshooting

**"ImportError: No module named 'watchdog'"**
→ `pip install -r requirements.txt` ausführen

**"FTP-Fehler: Connection refused"**
→ FTP_HOST, FTP_USER, FTP_PASSWORD in `.env` prüfen

**Datei wird nicht hochgeladen**
→ Prüfe, ob die Datei in `FILES_TO_UPLOAD` oder `FOLDERS_TO_UPLOAD` ist

## Tipps

- Skript kann im Hintergrund laufen (z.B. in VS Code Terminal)
- Watch-Modus funktioniert auf Windows, macOS, Linux
- Bei vielen Dateienänderungen kurz hintereinander wird intelligent gebündelt
