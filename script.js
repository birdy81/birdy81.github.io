document.addEventListener("DOMContentLoaded", function() {
    // Initialisierung der Karte
    var map = L.map('map').setView([48.1351, 11.5820], 1); //munich

    // Hinzufügen einer Grundkarte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Array, um Heatmap-Punkte zu speichern
    var heatPoints = [];

    // Funktion zum Laden von GPX-Dateien
    function loadGPX(file) {
        new L.GPX(file, {
            async: true
        }).on('loaded', function(e) {
            var gpx = e.target;
            var latlngs = gpx.getLatLngs();
            latlngs.forEach(function(latlng) {
                heatPoints.push([latlng.lat, latlng.lng, 0.5]); // 0.5 ist die Intensität
            });
            // Heatmap aktualisieren
            var heat = L.heatLayer(heatPoints, {radius: 25}).addTo(map);
        }).addTo(map);
    }

    // Laden der GPX-Dateien aus dem tracks-Ordner
    var gpxFiles = ['tracks/track1.gpx']; // Beispiel-Pfade
    gpxFiles.forEach(function(file) {
        loadGPX(file);
    });
});
