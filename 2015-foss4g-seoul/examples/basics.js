var politechnico = ol.proj.fromLonLat([9.0953396, 45.8020744]);

var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: politechnico,
    zoom: 16
  })
});

var pointFeature = new ol.Feature({
  geometry: new ol.geom.Point(politechnico)
});

var pointStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: 'icon3d.png'
  })
});

var vectorLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [pointFeature]
  }),
  style: pointStyle
});

map.addLayer(vectorLayer);


var ol3d = new olcs.OLCesium({map: map, target: 'globe'});
ol3d.setEnabled(true);
