# Foto-Anleitung für Cove Garden

Lege deine Fotos in diesen Ordner und ersetze die Platzhalter in `index.html`.

## Benötigte Fotos

| Dateiname              | Bereich               | Empfohlene Größe      |
|------------------------|-----------------------|-----------------------|
| `hero.jpg`             | Hero-Vollbild         | 1920 × 1080 px        |
| `villa-exterior.jpg`   | About-Sektion         | 900 × 1200 px         |
| `terrace-view.jpg`     | About-Accent          | 900 × 500 px          |
| `pool.jpg`             | Galerie groß          | 900 × 600 px          |
| `living-room.jpg`      | Galerie               | 900 × 600 px          |
| `kitchen.jpg`          | Galerie               | 900 × 600 px          |
| `master-bedroom.jpg`   | Galerie               | 900 × 600 px          |
| `garden-view.jpg`      | Galerie groß          | 1200 × 600 px         |
| `bathroom.jpg`         | Galerie               | 900 × 600 px          |

## Platzhalter ersetzen

**Hero-Foto (Hintergrund):**
1. Suche in `index.html` nach `class="hero-photo-placeholder"`
2. Ersetze das `<div class="hero-photo-placeholder">` durch:
   ```html
   <img src="images/hero.jpg" alt="Cove Garden - North Cyprus" class="hero-img">
   ```

**Galerie-Fotos (Beispiel):**
1. Suche nach `<!-- Replace with: <img src="images/pool.jpg" ...>`
2. Ersetze das gesamte `<div class="photo-placeholder" ...>` durch:
   ```html
   <img src="images/pool.jpg" alt="Private Pool" style="width:100%;height:100%;object-fit:cover;">
   ```

## Tipps
- Verwende JPG für Fotos (bessere Dateigröße)
- Optimiere Fotos vor dem Upload (z.B. mit squoosh.app)
- Landscape-Format (16:9) funktioniert am besten für die Galerie
- Hero-Foto sollte die Unterkunft oder die Meeresansicht zeigen
