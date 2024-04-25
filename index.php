<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.2/dist/leaflet.css" />
        <link rel="stylesheet" href="leafletPlugins/Leaflet.MousePosition-master/src/L.Control.MousePosition.css" />
        <link rel="stylesheet" href="leafletPlugins/Leaflet.zoomdisplay-master/dist/leaflet.zoomdisplay.css" />

        <script src="https://unpkg.com/leaflet@1.0.2/dist/leaflet.js"></script>
        <script src="Leaflet.heat-gh-pages/dist/leaflet-heat.js"></script>
        <script src="leafletPlugins/Leaflet.MousePosition-master/src/L.Control.MousePosition.js"></script>
        <script type="text/javascript" src="leafletPlugins/Leaflet.zoomdisplay-master/dist/leaflet.zoomdisplay-src.js">
        </script>
        <style>
        #map {
            height: 900px;
        }
        </style>
    </head>

    <body>

        <div>
            <select id="barriosSelect">
                <option value="">Seleccione un barrio</option>
            </select>
        </div>

        <div id="map"></div>

        <script>

        </script>

        <script src="mapa-cartagena-barrios.js"></script>
    </body>

</html>