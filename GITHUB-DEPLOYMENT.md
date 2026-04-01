# 🚀 GitHub Actions Auto-Deployment für all-inkl

Automatischer Upload zu all-inkl bei jedem Push auf `master` + optionaler manueller Start im Actions-Tab.

## Setup (einmalig)

### Schritt 1: GitHub Secrets erstellen

Gehe zu: `https://github.com/YOUR-USERNAME/WebsiteCoveGarden/settings/secrets/actions`

Klicke auf **"New repository secret"** und füge folgende 4 Secrets ein:

| Secret-Name | Wert | Beispiel |
|---|---|---|
| `FTP_HOST` | FTP-Server von all-inkl | `ftp.covegarden.de` |
| `FTP_USER` | FTP-Benutzername | `dein_benutzername` |
| `FTP_PASSWORD` | FTP-Passwort | `dein_passwort123` |
| `FTP_REMOTE_PATH` | Zielordner | `/w0189d65/terzle.com/covegarden` |

> **⛔ WICHTIG:** GitHub verschlüsselt diese Secrets! Sie sind NIEMALS im Code sichtbar.

**Woher bekommst du die Daten?**
- Melde dich bei all-inkl.com an
- Gehe zu: **Verwaltung → FTP-Zugänge**
- Kopiere die Werte in GitHub Secrets

### Schritt 2: Repository konfigurieren

```bash
# 1. Stelle sicher, dass alle Dateien committed sind
git status

# 2. Falls nicht, committen:
git add .
git commit -m "Setup: GitHub Actions Deployment"

# 3. Zu GitHub pushen
git push origin master
```

## Verwendung

Ab jetzt passiert **automatisch**:

1. **Du speicherst eine Datei** (z.B. `index.html`)
2. **Du pushst zu GitHub**: `git push`
3. **GitHub Actions startet** automatisch den Workflow
4. **Deine Website wird hochgeladen** zu all-inkl ✅

Das ist es! Keine manuellen Uploads mehr nötig.

### Manueller Start (Run workflow)

Falls kein Push erfolgen soll, kannst du den Workflow auch per Klick starten:

1. **GitHub → Actions**
2. Workflow **Deploy to all-inkl FTP** öffnen
3. **Run workflow** klicken
4. Branch `master` wählen

## Status überprüfen

1. Gehe zu **GitHub → Actions-Tab**
2. Sehe aktive/abgeschlossene Deployments
3. Bei Fehlern: Klick auf den Workflow → Logs ansehen

## Backup mit GitHub Pages (optional)

Deine Website ist auch automatisch unter `https://YOUR-USERNAME.github.io/WebsiteCoveGarden/` erreichbar

- Konfigurieren: **Settings → Pages → Source → master Branch**
- Kostenlos gehostet auf GitHub
- Perfekt als Backup falls all-inkl ausfällt

## Troubleshooting

**❌ "Deployment failed"**
- Überprüfe GitHub Secrets (richtige Namen? richtige Werte?)
- Teste die FTP-Credentials manuell (z.B. mit FileZilla)

**❌ "Authentication failed"**
- FTP_USER oder FTP_PASSWORD ist falsch
- Überprüfe bei all-inkl

**❌ "Connection refused"**
- FTP_HOST ist falsch
- Keine Internetverbindung

**❌ "Error: Client is closed because read ECONNRESET (data socket)"**
- Meist kurzzeitiger FTP-Datenkanalabbruch beim Hoster
- Workflow erneut starten (Run workflow)
- Wenn wiederholt: `FTP_REMOTE_PATH` auf separaten Unterordner setzen (z.B. `/w0189d65/terzle.com/covegarden` statt WordPress-Root)

## WordPress Hinweis

Wenn der Zielordner eine bestehende WordPress-Installation ist (mit `wp-admin`, `wp-content`, `wp-includes`):

- Für sichere Trennung besser in Unterordner deployen: `/w0189d65/terzle.com/covegarden`
- URL dann: `https://terzle.com/covegarden/`

## Dateistruktur

```
.github/
  workflows/
    deploy.yml     ← Dieser Workflow steuert alles
index.html
style.css
script.js
images/
.env.example       ← Nicht nötig mehr (nutze GitHub Secrets!)
upload-ftp.py      ← Nicht nötig mehr (nutze GitHub Actions!)
```

---

**Sicherheit:**
- ✅ FTP-Credentials sind **verschlüsselt** in GitHub
- ✅ Credentials sind **NIEMALS** im Code sichtbar
- ✅ Nur du & GitHub-Server sehen die Daten
- ✅ `.env` Datei nicht nötig
