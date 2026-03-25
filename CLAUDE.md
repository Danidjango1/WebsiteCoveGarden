# Cove Garden – Holiday Rental Website

## Projekt
Statische Ferienwohnungs-Website für "Cove Garden", ein Duplex-Loft-Apartment in Esentepe, Nordzypern.
Kontakt: info@terzle.com | Telefon: noch offen (Platzhalter +90 XXX XXX XXXX)

## Tech Stack
- Plain HTML5 + CSS3 (keine Frameworks)
- Vanilla JavaScript (Scroll-Animationen, Mobile-Menü)
- Alle Fotos lokal im `images/` Ordner

## Dateistruktur
- `index.html` — einzige HTML-Datei, alle Sektionen darin
- `style.css` — alle Styles, CSS Custom Properties in `:root`
- `images/` — alle Fotos

## Farbpalette (CSS Custom Properties)
```
--deep-sea:    #0A3D6B   (dunkles Navy, Hauptakzent)
--azure:       #008DC0   (kräftiges Blau, Links/Buttons)
--sand:        #A8CEDE   (mittleres Hellblau)
--sand-light:  #BADAE8   (Sektions-Hintergrund, alle weißen Sektionen)
--terracotta:  #E76F51   (CTA-Buttons)
```
Hero-Gradient: `linear-gradient(180deg, #3AAEE0 0%, #60C0EA 35%, #96D8F2 70%, #C4EAF8 100%)`

## Seitenstruktur (Reihenfolge)
1. Navbar (fixed, height 52px)
2. Hero – Blau-Gradient, 4 Carousel-Fotos (pool-lagoon, master-bedroom, coast-cliffs, girne-harbour + je 1 Portrait-Version)
3. Intro-Strip – 4 Kennzahlen (330+ Sunny Days, 5 min to Beach, 25km Girne, 3000+ Years History)
4. About – "The Apartment": romantischer Text + 2 Fotos (hammock-view, rooftop-terrace) + 2×2 Highlights-Grid
5. Rooms & Spaces – 7 Karten + 1 breite Karte (Master Bed, Bedroom 2, Living & Dining, Kitchen, 2 Bathrooms, Mezzanine Loft, + Rooftop Terrace wide)
6. Amenities – 7-Spalten-Grid mit SVG-Icons (viele Kategorien inkl. Self Check-in, Car Rental, Iron, Waschmaschine)
7. Region – 3 Karten (Girne, Esentepe, Golden Beach/Karpaz)
8. Experiences – 8 Karten (Beaches, Golf Korineum, Besparmak Mountains, Ancient History, Girne Harbour, Cypriot Cuisine, Karpaz & Wild Donkeys, Cafe Paris)
9. On-Site – Resort-Annehmlichkeiten (Pool, Bar, Parking)
10. Reviews – 3 Gästebewertungen
11. More Apartments Banner
12. Booking – Preisinfos, Kontaktformular, Anreiseinfos (Ercan ~1h, Larnaca ~1.5h, Mietwagenhinweis)
13. Footer – Logo, Quick Links, Kontakt, Nearby

## Fotos (Quellordner)
Originalfotos: `C:\Users\DanielaS\Desktop\Fotos Cove\`
Namensschema kopierter Fotos: `cove-XXXX.jpg` (Nummer aus IMG_XXXX)
Aktuell im Gallery eingebaut: pool-lagoon, living-room, resort-moon, master-bedroom, rooftop-terrace, cove-5829, kitchen, hammock-view, bathroom, bedroom2-full, interior-night, cove-7929, dining-evening, workspace-sea-view, cove-5569, rooftop-yoga, cove-5645, cove-5947, cove-9259, cove-5807, cove-2903 (21 Fotos)

## Offene Punkte
- Telefonnummer eintragen (aktuell Platzhalter `+90 XXX XXX XXXX` in Booking-Sektion und Footer)
- Alt-Texte für cove-5645, cove-5947, cove-9259, cove-5807, cove-2903 präzisieren (sobald Inhalt bekannt)

## Design-Regeln
- Blau-Palette konsequent einhalten
- Fotos mit `object-fit: cover` + `object-position` für Bildausschnitt
- Masonry-Gallery: `columns: 4`, max-height 340px, ähnliche Orientierungen nicht nebeneinander
- Mobile: 2 Spalten Gallery, responsive Grid-Layouts
- Texte in About-Sektion: `text-align: justify`
