// Generated by CoffeeScript 1.6.2
(function() {
  var jasmineFolder, jsFolder, requiredModules, specsFolder;

  jasmineFolder = "lib/jasmine-1.3.1/";

  specsFolder = "specs/";

  jsFolder = "../assets/javascripts/";

  require.config({
    baseUrl: "/tests/",
    urlArgs: "cb=" + Math.random(),
    paths: {
      jasmine: jasmineFolder + "jasmine",
      jasmineHtml: jasmineFolder + "jasmine-html",
      jasmineJquery: "lib/jasmine-jquery",
      jquery: "http://code.jquery.com/jquery.min",
      underscore: jsFolder + 'lib/underscore-min',
      utils: jsFolder + "utils",
      carousel: jsFolder + "carousel",
      c_spec: "specs/carousel",
    },
    shim: {
      jasmine: {
        exports: "jasmine"
      },
      jasmineHtml: ["jasmine"],
      jasmineJquery: ["jasmine"],
      jquery: {
        exports: "$"
      }
    }
  });

  requiredModules = ["jquery", "jasmine", "jasmineHtml", "jasmineJquery"];

  require(requiredModules, function() {
    var htmlReporter, jasmineEnv, specs;

    jasmine.getFixtures().fixturesPath = "fixtures"

    jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);
    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };
    specs = ['c_spec/carousel_spec',
            'c_spec/carousel.css_spec',
            'c_spec/carousel.touch_spec',
            'c_spec/carousel.ani_spec'];
    return require(specs, function() {
      return jasmineEnv.execute();
    });
  });

}).call(this);