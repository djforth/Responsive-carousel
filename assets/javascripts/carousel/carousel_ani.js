(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var $, Carousel, CarouselAni, _, _ref;
    $ = require('jquery');
    _ = require('underscore');
    Carousel = require('carousel/carousel_main');
    return CarouselAni = (function(_super) {
      __extends(CarouselAni, _super);

      function CarouselAni() {
        _ref = CarouselAni.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CarouselAni.prototype.animateCarousel = function(item, data, that) {
        return item.animate({
          left: data.move
        }, 200, function() {
          return that.finishAnimation.call(that, $(this), data.select, data.css);
        });
      };

      CarouselAni.prototype.finishAnimation = function(item, select, start_css) {
        if (select) {
          item.removeClass(start_css);
        }
        item.removeAttr('style');
        if (select) {
          item.addClass(this.selected);
        } else {
          item.removeClass(this.selected);
        }
        return item.addClass(this.item_class);
      };

      CarouselAni.prototype.getDocWidth = function() {
        return $(document).width();
      };

      CarouselAni.prototype.getInAmount = function(dir) {
        var w;
        if (dir == null) {
          dir = 'right';
        }
        w = this.getDocWidth();
        if (dir === 'right') {
          return 0 - w;
        } else {
          return w;
        }
      };

      CarouselAni.prototype.getOutAmount = function(dir) {
        var w;
        if (dir == null) {
          dir = 'right';
        }
        w = this.getDocWidth();
        if (dir === 'right') {
          return w;
        } else {
          return 0 - w;
        }
      };

      CarouselAni.prototype.moveCarousel = function(dir) {
        var css, current, in_mover, item, out_mover;
        if (dir == null) {
          dir = "right";
        }
        current = this.getSelected();
        item = dir === "left" ? this.getNextItem(current, false) : this.getNextItem(current);
        css = dir === "left" ? this.left_classes : this.right_classes;
        in_mover = this.getInAmount(dir);
        out_mover = this.getOutAmount(dir);
        this.transitionsIn(item, css.start, in_mover);
        return this.transitionsOut(current, out_mover);
      };

      CarouselAni.prototype.transitionsIn = function(item, css, starter) {
        item.removeClass(this.item_class);
        item.addClass(css);
        item.css("left", starter);
        return _.defer(this.animateCarousel, item, {
          css: css,
          move: 0,
          select: true
        }, this);
      };

      CarouselAni.prototype.transitionsOut = function(item, starter) {
        return _.defer(this.animateCarousel, item, {
          css: "",
          move: starter,
          select: false
        }, this);
      };

      return CarouselAni;

    })(Carousel);
  });

}).call(this);
