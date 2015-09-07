var rasterLayer = new ol.layer.Tile({
  preload: 2,
  source: new ol.source.MapQuest({
    url: 'http://localhost:8080/tiles/0/tiles/{z}/{x}/{y}',
    layer: 'osm'
  })
});

var styleCache = {};
var vectorLayer = new ol.layer.Vector({
  source: new ol.source.GeoJSON({
    url: 'data/countries.geojson',
    projection: 'EPSG:3857'
  }),
  style: function(feature, resolution) {
    var text = feature.get('name');
    if (!styleCache[text]) {
      styleCache[text] = [new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.1)'
        }),
        stroke: new ol.style.Stroke({
          color: '#319FD3',
          width: 3
        }),
        text: new ol.style.Text({
          font: '16px Calibri,sans-serif',
          text: text,
          fill: new ol.style.Fill({
            color: '#000'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 3
          })
        })
      })];
    }
    return styleCache[text];
  }
});

var greenSightStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: 'data/sight-2.png',
    anchor: [0.5, 1]
  })
});
var pinkSightStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: 'data/sight-2-pink.png',
    anchor: [0.5, 1]
  })
});

var jamaicaMarker = new ol.Feature(
    new ol.geom.Point([-8620815.572252877, 2078464.5633878764]));
jamaicaMarker.setStyle(greenSightStyle);

var guatemalaMarker = new ol.Feature(
    new ol.geom.Point([-10037040.832320623, 1804514.2540138045]));
guatemalaMarker.setStyle(pinkSightStyle);

vectorLayer.getSource().addFeatures([jamaicaMarker, guatemalaMarker]);

var map = new ol.Map({
  target: 'map',
  layers: [rasterLayer, vectorLayer],
  view: new ol.View({
    center: jamaicaMarker.getGeometry().getCoordinates(),
    zoom: 6
  })
});

var rotation = new ol.dom.Input(document.getElementById('rotation'));
rotation.bindTo('value', map.getView(), 'rotation');

document.onkeydown = function(e) {
  var view = map.getView();
  var rotation = view.getRotation();
  if (e.keyCode == 82) {
    // "r" key
    rotation += 0.01;
    view.setRotation(Math.min(rotation, 3.14159));
  } else if (e.keyCode == 76) {
    // "l" key
    rotation -= 0.01;
    view.setRotation(Math.max(rotation, -3.14159));
  } else if (e.keyCode == 70 || e.keyCode == 66) {
    // "f" key - fly to Mexico
    // "b" key - fly back to Jamaica
    var duration = 2000;
    var start = +new Date();
    var pan = ol.animation.pan({
      duration: duration,
      source: view.getCenter(),
      start: start
    });
    var bounce = ol.animation.bounce({
      duration: duration,
      resolution: 4 * view.getResolution(),
      start: start
    });
    map.beforeRender(pan, bounce);
    if (e.keyCode == 70) {
      // Guatemala
      view.setCenter(guatemalaMarker.getGeometry().getCoordinates());
    } else {
      // Jamaica
      view.setCenter(jamaicaMarker.getGeometry().getCoordinates());
    }
  }
};
