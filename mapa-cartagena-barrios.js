var Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 21,
});
var OpenCycleMap = L.tileLayer('https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=6170aad10dfd42a38d4d8c709a536f38', {
    maxZoom: 24
});
var BlancoNegro = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
});
var OpenTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17
});
var SateliteEsri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19
});
var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 22,
    subdomains:['mt0','mt1','mt2','mt3']
});
var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 22,
    subdomains:['mt0','mt1','mt2','mt3']
});
var googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

// satelite solo sin lineas
var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
///************************************** */
var CartoDB_PositronOnlyLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

var map = L.map("map", {
    layers: [Mapnik],
    zoomSnap: -1,
}).setView([10.409, -75.489], 14);

L.control.scale().addTo(map);
L.control.mousePosition().addTo(map);

// Variable para almacenar el marcador actual
var currentMarker = null;

document
    .getElementById("barriosSelect")
    .addEventListener("change", function (e) {
        console.log(e.target.value);
        let coords = e.target.value.split(",");

        // Si hay un marcador actual, eliminarlo del mapa
        if (currentMarker !== null) {
            map.removeLayer(currentMarker);
        }

        // Crear un marcador en la coordenada con un popup que muestra el nombre del punto
        var marker = L.marker(coords)
            .bindPopup(e.target.options[e.target.selectedIndex].text) // Obtener el nombre del punto desde el elemento seleccionado del select
            .addTo(map);

        // Establecer el nuevo marcador como el marcador actual
        currentMarker = marker;

        map.flyTo(coords, 17);
    });

// Cargar JSON desde un archivo externo y agregar la capa de puntos
fetch('barrios2.json')
    .then(response => response.json())
    .then(data => {
        //******** PUNTOS */
        var geojsonFeature = {
            "type": "FeatureCollection",
            "features": data.map(point => {
                return {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [point.lng, point.lat]
                    },
                    "properties": {
                        "name": point.name
                    }
                };
            })
        };
        /////********  */
        const barriosSelect = document.getElementById('barriosSelect');
        // Crear opciones del select basadas en los datos del archivo JSON
        data.forEach(barrio => {
            const option = document.createElement('option');
            option.value = barrio.id;
            option.value = barrio.lat + ',' + barrio.lng; // Suponiendo que cada barrio tiene un campo 'id'
            option.textContent = barrio.name; // Suponiendo que cada barrio tiene un campo 'nombre'
            barriosSelect.appendChild(option);
        });

        var pointLayer = L.geoJSON(geojsonFeature, {
            pointToLayer: function (feature, latlng) {
                var marker = L.circleMarker(latlng, {
                    radius: 8,
                    fillColor: "#FF0000",
                    color: "#000000",
                    weight: 3,
                    opacity: 1,
                    fillOpacity: 1
                });

                // Agregar eventos de mouseover y mouseout para mostrar u ocultar el popup
                marker.on('mouseover', function (e) {
                    this.bindPopup(feature.properties.name).openPopup();
                });

                marker.on('mouseout', function (e) {
                    this.closePopup();
                });

                return marker;
            }
        });

        var baseLayers = {
            "Mapnik": Mapnik,
            "Gogle Maps": googleStreets,
            "OpenCycleMap": OpenCycleMap,
            "Blanco y negro": BlancoNegro,
            "OpenTopo": OpenTopo,
            "Google Satelite":googleHybrid,
            "Satelite-Esri": SateliteEsri,
            "googleTerrain":googleTerrain,
            "googleSat":googleSat
        };
        var overlays = {
            "Puntos": pointLayer,
            'Lineas': CartoDB_PositronOnlyLabels
        };

        // Añadir control de capas
        L.control.layers(baseLayers, overlays).addTo(map);
    })
    .catch(error => console.error('Error cargando JSON:', error));
