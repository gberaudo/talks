var ol2d, ol3d;


// OL3 only stuff
function openlayers() {
  var center = ol.proj.transform([6.9275, 46.414167], 'EPSG:4326', 'EPSG:3857');
  
  var view = new ol.View({
    center: center,
    zoom: 15,
  });
  
  ol2d = new ol.Map({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    target: 'map2d',
    view: view
  });
}


// OL3-Cesium stuff
function create() {
  ol3d = new olcs.OLCesium({map: ol2d, target: 'map3d'});
  ol3d.setEnabled(true);
}


// Cesium only stuff (terrain)
function terrain() {
  var scene = ol3d.getCesiumScene();
  scene.terrainProvider = new Cesium.CesiumTerrainProvider({
    url : '//assets.agi.com/stk-terrain/world'
  });
}
