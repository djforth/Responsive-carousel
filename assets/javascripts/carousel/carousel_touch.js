(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var $, CarouselCss, CarouselTouch, _, _ref;
    $ = require('jquery');
    _ = require('underscore');
    CarouselCss = require('carousel/carousel_css');
    return CarouselTouch = (function(_super) {
      __extends(CarouselTouch, _super);

      function CarouselTouch() {
        _ref = CarouselTouch.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CarouselTouch.prototype.startX = null;

      CarouselTouch.prototype.moveX = null;

      CarouselTouch.prototype.direction = null;

      CarouselTouch.prototype.touch_area = null;

      CarouselTouch.prototype.touchID = "project_outer";

      CarouselTouch.prototype.init = function() {
        CarouselTouch.__super__.init.call(this);
        this.getTouchArea();
        return this.startTouch();
      };

      CarouselTouch.prototype.getMoveInfo = function(e) {
        var that, touch;
        e.preventDefault();
        touch = this.processTouchData(e.touches);
        this.startX = touch.pageX;
        that = this;
        this.touch_area.on('touchmove', {
          callback: this.touchMove,
          c: this
        }, function(e) {
          return e.data.callback.call(e.data.c, e.originalEvent);
        });
        return this.touch_area.on('touchend', {
          callback: this.touchEnd,
          c: this
        }, function(e) {
          return e.data.callback.call(e.data.c, e.originalEvent);
        });
      };

      CarouselTouch.prototype.getTouchArea = function() {
        return this.touch_area = $(this.holder);
      };

      CarouselTouch.prototype.processTouchData = function(touches) {
        return touches[0];
      };

      CarouselTouch.prototype.startTouch = function() {
        var that;
        that = this;
        if (this.touch_area) {
          return this.touch_area.on('touchstart', {
            callback: this.getMoveInfo,
            c: this
          }, function(e) {
            return e.data.callback.call(e.data.c, e.originalEvent);
          });
        }
      };

      CarouselTouch.prototype.touchCancel = function() {
        this.touch_area.off('touchmove');
        return this.touch_area.off('touchend');
      };

      CarouselTouch.prototype.touchDirection = function() {
        if (this.startX < this.moveX) {
          return "right";
        } else {
          return "left";
        }
      };

      CarouselTouch.prototype.touchEnd = function() {
        this.touchCancel();
        return this.moveCarousel(this.touchDirection());
      };

      CarouselTouch.prototype.touchMove = function(e) {
        var touch;
        e.preventDefault();
        if (this.touchStop(e.touches)) {
          return this.touchCancel();
        } else {
          touch = this.processTouchData(e.touches);
          return this.moveX = touch.pageX;
        }
      };

      CarouselTouch.prototype.touchStop = function(touches) {
        return touches.length > 1;
      };

      return CarouselTouch;

    })(CarouselCss);
  });

}).call(this);
