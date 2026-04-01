# GitHub Secrets Setup - Schritt für Schritt

## Was sind GitHub Secrets?

GitHub Secrets sind **verschlüsselte Variablen**, die:
- ✅ Niemals im Code sichtbar sind
- ✅ Sicher auf GitHub-Servern gespeichert werden
- ✅ Im Workflow automatisch verwendet werden
- ✅ Nur du & GitHub sehen sie

## Schritt-für-Schritt: Secrets eintragen

### 1. Zu GitHub Settings gehen

```
github.com/YOUR-USERNAME/WebsiteCoveGarden/settings/secrets/actions
```

Oder per Hand:
1. Gehe zu **deinem Repository**
2. Klick oben auf **Settings**
3. Links im Menü: **Secrets and variables → Actions**

### 2. Secrets erstellen

Klick auf **New repository secret** (grüner Button)

---

### Secret #1: FTP_HOST

| Feld | Wert |
|---|---|
| **Name** | `FTP_HOST` |
| **Value** | `ftp.DEINE-DOMAIN.de` |

Beispiel: `ftp.covegarden.de`

→ **Add secret** klicken

---

### Secret #2: FTP_USER

| Feld | Wert |
|---|---|
| **Name** | `FTP_USER` |
| **Value** | `Dein FTP Benutzername` |

Beispiel: `covegarden_ftp`

→ **Add secret** klicken

---

### Secret #3: FTP_PASSWORD

| Feld | Wert |
|---|---|
| **Name** | `FTP_PASSWORD` |
| **Value** | `Dein FTP Passwort` |

→ **Add secret** klicken

---

### Secret #4: FTP_REMOTE_PATH

| Feld | Wert |
|---|---|
| **Name** | `FTP_REMOTE_PATH` |
| **Value** | `/w0189d65/terzle.com/covegarden` |

Empfohlen: separater Unterordner statt WordPress-Root.

Wenn WordPress im Root liegt (`wp-admin`, `wp-content`, `wp-includes`), nicht in diese 3 Ordner deployen.

→ **Add secret** klicken

---

## Woher bekommst du die FTP-Daten?

### Bei all-inkl.com:

1. Anmelden auf **https://all-inkl.com**
2. Gehe zu **Kundenbereich**
3. **Verwaltung → FTP-Zugänge**
4. Du siehst:
   - **FTP-Server** (= FTP_HOST)
   - **Benutzer** (= FTP_USER)
   - **Passwort** (= FTP_PASSWORD)
   - Zielverzeichnis tipischerweise: `/public_html`

---

## Nach dem Setup

Nachdem alle 4 Secrets eingegeben sind:

```bash
# 1. Änderung committen
git add .
git commit -m "Add: GitHub Actions workflow"

# 2. Zu GitHub pushen
git push origin master
```

**Automatisch wird dann:**
- ✅ Der Workflow triggert
- ✅ Secrets werden geladen
- ✅ Website zu all-inkl hochgeladen
- ✅ Du siehst Status unter **Actions-Tab**

Alternativ ohne Push: **Actions → Deploy to all-inkl FTP → Run workflow**.

---

## Sicherheit Check

**Überprüfe, dass keine echten Passwörter im Code sind:**

```bash
grep -r "FTP_PASSWORD" .
grep -r "ftp_password" .
```

Sollte NICHTS zeigen (außer dieser Dokumentation)! ✅

---

## Test: Ist es funktioniert?

1. Ändere etwas in `index.html`
2. Commit & Push: 
   ```bash
   git add index.html
   git commit -m "Test: Small change"
   git push origin master
   ```
3. Gehe zu **GitHub → Actions**
4. Du solltest einen laufenden Workflow sehen ▶️
5. Nach 1-2 Min: Status wird ✅ (erfolgreich)
6. Deine Live-Website sollte die Änderung zeigen!

Wenn du auf Unterordner deployt hast, teste direkt die Unterordner-URL, z.B. `https://terzle.com/covegarden/`.

---

**Fragen?** Lese [GITHUB-DEPLOYMENT.md](GITHUB-DEPLOYMENT.md)
