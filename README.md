#Leo's Jekyll, Gulp, Bourbon, Neat, Bitters, Sass Starter Kit

##Aktueller Branch ist `develop`.

Hier haben wir das Starterprojekt mit Setup für Jekyll, Gulp, Bourbon, Neat, Bitters, Sass, Browser-Sync, Bildoptimierung, HTML-Minifizierung und vieles mehr.

## Systemcheck

Um dieses Starterprojekt einsetzen zu können, müssen die folgenden Programme auf dem Computer installiert sein:

1. [NodeJS](http://nodejs.org): Das Installationsprogramm der Webseite benutzen

## Lokale Installation

Klone dieses Repository oder lade es in einen Ordner auf Deiner Festplatte herunter.

Starte `./install-dev.sh` im Terminal. Das Terminal gibt Dir Feedback über die durchgeführten Installationen.

## Benutzung

Beim ersten Start nach `install-dev` musst Du
```shell
$ gulp build
```
im Terminal starten. Damit wird die Jekyll-Webseite automatisch komplett aufgebaut. Sie befindet sich danach im ebenfalls automatisch erzeugten Ordner `site`, die dann später auch auf den Server hochgeladen werden kann.

###Beobachtung der Dateiänderungen, Browser-Sync, Sass-Kompilierung etc:
Der Server wird gestartet und die Webseite wird bei jeder Änderung im Browser neu geladen. Damit sind die Ergebnisse der Entwicklungsschritte sofort sichtbar.
```shell
$ gulp
```

**Hilfreiche Tasks**

Die Einstellungen für Bitters automatisch anpassen:
```shell
$ gulp copyBitters
```

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
