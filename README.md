Leos Jekyll Gulp Starter Kit
=============================

Dieses Projekt basiert auf 2 verschiedenen Arbeitsweisen: Gulp mit Sass `Branch: version-sass` und Gulp mit PostCSS `Branch: version-postcss`.

Hier haben wir das Starterprojekt `Branch: version-sass` mit vollem Setup für Jekyll, Gulp, Sass, Browser-Sync, Bildoptimierung, HTML-Minifizierung und vieles mehr.

## Systemcheck

Um dieses Starterprojekt einsetzen zu können, müssen die folgenden Programme auf dem Computer installiert sein:

1. [Jekyll](http://jekyllrb.com/): `gem install jekyll`
2. [NodeJS](http://nodejs.org): Das Installationsprogramm der Webseite benutzen
3. npm install (Mac-Benutzer müssen evtl. `sudo` voranstellen)

## Lokal Installation

Klone dieses Repository oder lade es in einen Ordner auf Deiner Festplatte herunter.

Starte `./install-dev.sh` im Terminal.

## Benutzung

Beobachtung der Dateiänderungen, Browser-Sync, Jade-Kompilierung, Post CSS etc:
```shell
$ gulp serve
```

Standardaufgabe kompiliert das komplette Projekt und bereitet es für den Upload vor:
```shell
$ gulp
```

Alle Dateien von `_src/_jadefiles` werdn in `_src/_includes` kompiliert:
```shell
$ gulp jade
```

**Hilfreiche Befehle**

Löschen der Bilder in `site/img` und `_assets/_img` Ordnern:
```shell
$ gulp delimg
```

Generieren von kleinen und großen Thumbnails in `site/img` und `_assets/_img` Ordnern. Du kannst die Größen im `Gulpfile.js` ändern:
```shell
$ gulp thumbnails
```

**Jekyll**

Weil dies ein Jekyll-Projekt ist, können die Befehle von [docs](http://jekyllrb.com/docs/usage/) genutzt werden.
