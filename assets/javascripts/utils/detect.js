(function() {
  define(function(require) {
    var FeatureDetect;
    FeatureDetect = (function() {
      FeatureDetect.prototype.canvas = false;

      FeatureDetect.prototype.geo = false;

      FeatureDetect.prototype.transitions = false;

      FeatureDetect.prototype.touch = false;

      FeatureDetect.prototype.ie = false;

      function FeatureDetect(reset) {
        if (reset) {
          this.transitions = false;
          this.touch = false;
        }
        this.canvasSupported();
        this.geoloactionSupported();
        this.transitionsCSS();
        this.touchSupport();
        this.ieCheck();
      }

      FeatureDetect.prototype.canvasSupported = function() {
        return this.canvas = !!document.createElement('canvas').getContext;
      };

      FeatureDetect.prototype.has_canvas = function() {
        return this.canvas;
      };

      FeatureDetect.prototype.has_geolocation = function() {
        return this.geo;
      };

      FeatureDetect.prototype.has_css_transitions = function() {
        return this.transitions;
      };

      FeatureDetect.prototype.has_touch = function() {
        return this.touch;
      };

      FeatureDetect.prototype.geoloactionSupported = function() {
        return this.geo = !!navigator.geolocation;
      };

      FeatureDetect.prototype.ieCheck = function() {
        return this.ie = !('__proto__' in {});
      };

      FeatureDetect.prototype.ieBrowser = function() {
        return this.ie;
      };

      FeatureDetect.prototype.touchSupport = function() {
        return this.touch = window.touch;
      };

      FeatureDetect.prototype.transitionsCSS = function() {
        var div;
        div = document.createElement('div');
        div.innerHTML = '<div style="-webkit-transition:color 1s linear;-moz-transition:color 1s linear;"></div>';
        this.transitions = (div.firstChild.style.webkitTransition !== void 0) || (div.firstChild.style.MozTransition !== void 0) || (div.firstChild.style.Transition !== void 0);
        return div["delete"];
      };

      return FeatureDetect;

    })();
    return FeatureDetect;
  });

}).call(this);
