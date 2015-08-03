var path = require('path');


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  var build = path.join('.grunt', 'self');

  grunt.initConfig({
    copy: {
      local: {
        // local files with no pre-processing
        expand: true,
        src: ['olcs.html', 'img/**/*.*', 'theme/**/*.*'],
        dest: build
      },
      examples: {
        // all example files except jade
        expand: true,
        src: ['examples/**/*.*', '!**/*.jade'],
        dest: build
      },
      other: {
        // 3rd party componnets js and css
        expand: true,
        src: ['bower_components/**/*.js', 'bower_components/**/*.css'],
        dest: build
      }
    },
    jade: {
      options: {
        pretty: true
      },
      examples: {
        // all example templates except those in "_" prefixed directories
        expand: true,
        src: ['examples/**/*.jade', '!**/_*/**/*.*'],
        dest: build,
        ext: '.html'
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: build
        }
      }
    },
    watch: {
      local: {
        files: '<%= copy.local.src %>',
        tasks: ['copy:local']
      },
      examples: {
        files: '<%= copy.examples.src %>',
        tasks: ['copy:examples']
      },
      other: {
        files: '<%= copy.other.src %>',
        tasks: ['copy:other']
      },
      jade: {
        files: ['examples/**/*.jade'],
        tasks: ['jade']
      }
    },
    clean: {
      all: build
    }
  });

  // contrib tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 3rd party tasks
  grunt.loadNpmTasks('grunt-gh-pages');

  // local tasks
  grunt.registerTask('build', ['copy', 'jade']);
  grunt.registerTask('start', ['build', 'connect', 'watch']);
};

