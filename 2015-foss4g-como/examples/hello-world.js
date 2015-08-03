var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([9.0806637, 45.8154034]),
    zoom: 9
  })
});

var ol3d = new olcs.OLCesium({map: map, target: 'globe'});
ol3d.setEnabled(true);
