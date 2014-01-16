


module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'assets/javascript/main.js',
        dest: 'assets/build/javascript/main.min.js'
      }
    },
    compass: {                  // Task
      dist: {                   // Target
        options: {
          config: 'config.rb'
        }
      }

    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'assets/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'assets/images/'
        }]
      }
    },
    coffee:{
      build: {
        expand: true,
        cwd: 'assets/preprocessed_files/coffeescript',
        src: ['**/*.coffee'],
        dest: 'assets/javascripts',
        ext: '.js'
      },
      test: {
        expand: true,
        cwd: 'spec/coffeescript',
        src: ['**/**.coffee'],
        dest: 'spec',
        ext: '.js'
      }
    },

    coffeelint: {
      app: ['assets/preprocessed_files/coffeescript/**/*.coffee', 'spec/coffeescript/**/*_spec.coffee'],
      options: {
        'max_line_length': {
          'level': 'ignore'
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: './'
        }
      }
    },

    clean: {
      build: ["assets/stylesheets/*"],
    },

    htmlmin: {
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                removeEmptyAttributes: true,
                removeCommentsFromCDATA: true,
                removeRedundantAttributes: true,
                collapseBooleanAttributes: true
            },
            files: {
                // Destination : Source
                './index-min.html': './index.html'
            }
        }
    },

    jasmine: {
      require: {
        src: './assets/javascripts/**/*.js',
        options: {
          styles:"./assets/stylesheets/screen.css",
          specs: 'spec/**/*_spec.js',
          keepRunner:true,
          // urlArgs: "cb=" + Math.random(),
          vendor:['assets/javascripts/lib/jquery.min.js', 'spec/lib/sinon-1.6.0.js', 'spec/lib/jasmine-jquery.js','spec/lib/jasmine-sinon.js'],
          // ,
          host: 'http://127.0.0.1:8000/',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig:{
              mainConfigFile:'./assets/javascript/main.js',
              baseUrl: "spec/",
              urlArgs: "cb=" + Math.random(),
              paths: {
                'jquery': '/assets/javascripts/lib/jquery.min',
                'underscore': '/assets/javascripts/lib/underscore-min',
                'sinon': 'lib/sinon-1.6.0',
                'jasmineSinon': 'lib/jasmine-sinon',
                'jasmineJquery': 'lib/jasmine-jquery',
                utils:'/assets/javascripts/utils',
                carousel:"/assets/javascripts/carousel"
              }
            }
          }

        }
      }
    },

    requirejs: {
        compile: {
            options: {
                baseUrl: './assets/javascripts',
                mainConfigFile: './assets/javascripts/main.js',
                dir: './assets/build/',
                fileExclusionRegExp: /^\.|node_modules|Gruntfile|\.md|package.json/,
                // optimize: 'none',
                modules: [
                    {
                        name: 'main'
                    }
                ]
            }
        }
    },

    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['**/**.coffee'],
        tasks: ['coffee:build', 'coffee:test'],
        options: {
          spawn: false,
        }
      },
      sass: {
        files: ["assets/preprocessed_files/sass/*.scss"],
        tasks: ['compass:dist']
      },
      css: {
        files: ['assets/stylesheets/*.css']
      },
      images: {
        files: ['images/**/*.{png,jpg,gif}', 'images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-coffeelint');
  require('load-grunt-tasks')(grunt);

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'compass', 'imagemin', "coffee", "coffeelint"]);

  grunt.registerTask('dev', ['connect', 'watch']);

  grunt.registerTask('test', ['connect', 'jasmine']);

  grunt.registerTask('release', ['test', 'compass', 'imagemin', "coffee", "coffeelint", "htmlmin", 'uglify', 'requirejs']);
};
