var track = new ol.source.Vector({
  format: new ol.format.GPX(),
  url: 'data/track.gpx'
});
track.once('change', function() {
  var features = track.getFeatures();
  var geometry, coordinates;
  for (var i = 0, ii = features.length; i < ii; ++i) {
    geometry = features[i].getGeometry();
    coordinates = geometry.getCoordinates()[0];
    for (var j = 0, jj = coordinates.length; j < jj; ++j) {
      coordinates[j][2] += 50;
    }
    geometry.setCoordinates([coordinates]);
  }
  ol3d.setEnabled(true);
});

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.BingMaps({
        // Get your own key at http://bingmapsportal.com/
        // Replace the key below with your own.
        key: 'AhaJDO_bWhekq58C0nGLRkwJSMphRFDTYeccozENkqZTAAa1W0OgoaWmcgbPxatZ',
        imagerySet: 'AerialWithLabels'
      })
    }),
    new ol.layer.Vector({
      source: track
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([15.975, 47.806]),
    zoom: 13
  })
});

var ol3d = new olcs.OLCesium({map: map});
var scene = ol3d.getCesiumScene();
var terrainProvider = new Cesium.CesiumTerrainProvider({
  url: '//cesiumjs.org/stk-terrain/tilesets/world/tiles'
});
scene.terrainProvider = terrainProvider;
