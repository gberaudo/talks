var logDom = document.getElementById('logs');
function log(msg) {
  var div = document.createElement("div");
  var t = document.createTextNode(msg);
  div.appendChild(t);
  logDom.appendChild(div);
  console.log(msg);
}

var center = ol.proj.transform([6.9275, 46.414167], 'EPSG:4326', 'EPSG:3857');

var cervinFeature = new ol.Feature({
  geometry: new ol.geom.Point(center)
});
cervinFeature.getGeometry().set('altitudeMode', 'clampToGround');


var iconStyle = new ol.style.Style({
  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 0.75,
    src: 'data/icon.png'
  }))
});


var iconStyle2 = new ol.style.Style({
  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 0.75,
    scale: 2.0,
    src: 'data/icon.png'
  }))
});

cervinFeature.setStyle(iconStyle);


var vectorSource2 = new ol.source.Vector({
  features: [cervinFeature]
});
var vectorLayer2 = new ol.layer.Image({
  source: new ol.source.ImageVector({
    source: vectorSource2
  })
});


var ol2d = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    vectorLayer2
  ],
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  target: 'map2d',
  view: new ol.View({
    center: center,
    zoom: 15
  })
});


var ol3d;


function enableCesium() {
  if (!ol3d) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../Cesium/Cesium.js";
    console.log('Loading Cesium.js ...');

    s.onload = function() {
      log('Cesium.js loaded')
      init3D();
    };

    document.body.appendChild(s);
  }
}


function init3D() {
  ol3d = new olcs.OLCesium({map: ol2d, target: 'map3d'});
  log('OL3-Cesium created');
  var scene = ol3d.getCesiumScene();
  var terrainProvider = new Cesium.CesiumTerrainProvider({
      url : '//assets.agi.com/stk-terrain/world',
      requestVertexNormals: true
  });
  scene.terrainProvider = terrainProvider;
  scene.globe.depthTestAgainstTerrain = true;

  //ol3d.enableAutoRenderLoop();
  ol3d.setEnabled(true);
  log('OL3-Cesium 3D enabled');
}



function addOrRemoveOneFeature() {
  var found = vectorSource2.getFeatures().indexOf(cervinFeature);
  if (found === -1) {
    vectorSource2.addFeature(cervinFeature);
    log('Added feature');
  } else {
    vectorSource2.removeFeature(cervinFeature);
    log('Removed feature');
  }
}



function toggleStyle() {
  if (cervinFeature.getStyle() === iconStyle) {
    cervinFeature.setStyle(iconStyle2);
    log('Big style');
  } else {
    cervinFeature.setStyle(iconStyle);
    log('Small style');
  }
}
