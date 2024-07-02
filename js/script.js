document.addEventListener("DOMContentLoaded", function() {
    // Initialisierung der Karte
    var map = L.map('map').setView([48.1351, 11.5820], 10); // Munich

    // Hinzufügen einer Grundkarte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'OpenStreetMap contributors'
    }).addTo(map);

    // Heatmap Layer
    var heat = L.heatLayer([], { radius: 8 }).addTo(map);

    // Funktion zum Laden von GPX-Dateien
    function loadGPX(file) {
        new L.GPX(file, {
            polyline_options: {
                color: 'blue',
                weight: 5,
                opacity: 0.3
            },
            async: true,
            gpx_options: {
                parseElements: ['track']
            },
            marker_options: {
                startIconUrl: '',
                endIconUrl: '',
                shadowUrl: ''
            }
        }).on('loaded', function(e) {
            map.fitBounds(e.target.getBounds());
        }).on('addline', function(e) {
            var line = e.line.getLatLngs();
            line.forEach(function(latlng) {
                heat.addLatLng([latlng.lat, latlng.lng]);
            });
        }).on('error', function(e) {
            console.error('Error loading GPX file:', e);
        }).addTo(map);
    }

    // Laden der GPX-Dateien aus dem tracks-Ordner
    var gpxFiles = [
                    'tracks/track1.gpx', 
                    'tracks/track2.gpx', 
                    'tracks/track3.gpx',
                    'tracks/track4.gpx',
                    'tracks/track5.gpx',
                    'tracks/track6.gpx',
                    'tracks/track7.gpx',
                    'tracks/track8.gpx',
                    'tracks/track9.gpx',
                    'tracks/track10.gpx'
                   ];              
    gpxFiles.forEach(function(file) {
        loadGPX(file);
    });
});
