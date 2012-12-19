module.exports = function( grunt ) {
  'use strict';
  //
  // Grunt configuration:
  //
  // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
  //
  grunt.initConfig({

    // Project configuration
    // ---------------------

    // specify an alternate install location for Bower
    bower: {
      dir: 'app/components'
    },

    // Coffee to JS compilation
    coffee: {
      compile: {
        files: {
          'app/scripts/*.js': 'app/scripts/**/*.coffee',
          'test/spec/*.js': 'test/spec/**/*.coffee'
        }
      }
    },

    // compile .scss/.sass to .css using Compass
    compass: {
      dist: {
        // http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
        options: {
          css_dir: 'temp/styles',
          sass_dir: 'app/styles',
          images_dir: 'app/images',
          javascripts_dir: 'temp/scripts',
          force: true
        }
      }
    },

    // generate application cache manifest
    manifest:{
      dest: ''
    },

    // default watch configuration
    watch: {
      coffee: {
        files: 'app/scripts/**/*.coffee',
        tasks: 'coffee reload'
      },
      compass: {
        files: [
          'app/styles/**/*.{scss,sass}'
        ],
        tasks: 'compass reload'
      },
      reload: {
        files: [
          'app/*.html',
          'app/styles/**/*.css',
          'app/scripts/**/*.js',
          'app/views/**/*.html',
          'app/images/**/*'
        ],
        tasks: 'reload'
      }
    },

    // default lint configuration, change this to match your setup:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#lint-built-in-task
    lint: {
      files: [
        'Gruntfile.js',
        'app/scripts/**/*.js',
        'spec/**/*.js'
      ]
    },

    // specifying JSHint options and globals
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        angular: true
      }
    },

    // Build configuration
    // -------------------
    reduce: {
      // Source folder
      root: 'app', // Default: 'app',

      // Build destination folder
      outRoot: 'dist', // Default: 'dist',

      // Root of your CDN. Optional
      //cdnRoot: 'https://my.amazon.s3.bucket',

      // minimatch patterns of files to include as base assets
      // Dependencies of these will be automatically populated
      // Paths are relative to reduce.root ('app')
      include: [
        '**/*.html',
        '**/.htaccess',
        '*.txt',
        '*.ico'
      ],

      // Compile less files and remove less.js from application
      less: true, // Default: true

      // Run all available jpeg and png optimizations on images
      // For maximum efficiency install jpegtran, optipng, pngcrush and pngquant
      optimizeImages: true, // Default: true

      // Create a cache manifest file
      // If one already exists it will be ammended with static assets
      manifest: false, // Default: false

      // Set the 'async'-attribute on all script tags
      asyncScripts: true, // Default: true

      // Pretty print assets. Good for debugging
      pretty: false, // Default: false

      // Inline CSS backgrounds below this byte threshold as data-uris
      // There will be an old IE fallback to the original image
      // 0 disables.
      inlineSize: 4096 // Default: 4096
    }
  });

  // Alias the `test` task to run `testacular` instead
  grunt.registerTask('test', 'run the testacular test driver', function () {
    var done = this.async();
    require('child_process').exec('testacular start --single-run', function (err, stdout) {
      grunt.log.write(stdout);
      done(err);
    });
  });

  grunt.loadNpmTasks('grunt-reduce');

  grunt.registerTask('build', ['coffee', 'reduce']);
};
