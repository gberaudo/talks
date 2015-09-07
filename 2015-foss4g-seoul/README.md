# FOSS4G 2015 Seoul OL3-Cesium talk

OL3-Cesium presentation for FOSS4G 2015 Seoul.

## Set up

    npm install
    npm start

Now you can view the slides by opening http://localhost:9001/olcs.html in a browser.

## OpenLayers Examples

The OpenLayers examples all share the same basic layout, so they are built from
templates.  The `npm install` step above builds all examples (and more) and
puts everything in the `.grunt/self` directory.

While this task is running, the slideshow is available at
http://localhost:9001/olcs.html and examples are at
http://localhost:9001/examples/.  When the slides are deployed, the examples
will have the same relative path to the slides (e.g. slides can link to
examples with './examples/hello-world.html').

## Credits

Credits to [reveal.js](http://lab.hakim.se/reveal-js/) for the slick
presentation software, and to @tschaub for the nice npm/bower/grunt set-up and
for @elemoine for sharing it.
