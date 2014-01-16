(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(function(require) {
    var $, Carousel, CarouselCSS, _, _ref;
    $ = require('jquery');
    _ = require('underscore');
    Carousel = require('carousel/carousel_main');
    return CarouselCSS = (function(_super) {
      __extends(CarouselCSS, _super);

      function CarouselCSS() {
        _ref = CarouselCSS.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CarouselCSS.prototype.CSSTransitions = "";

      CarouselCSS.prototype.cssTransitionsIn = function(item, css) {
        this.transitionCSSStart(item, css);
        this.setCSSTransitions(item, this.in_class);
        return this.trackTransition(item, css, true);
      };

      CarouselCSS.prototype.cssTransitionsOut = function(item, css) {
        this.removeSelect(item);
        this.transitionCSSStart(item, css);
        return this.trackTransition(item, css, false);
      };

      CarouselCSS.prototype.finishCSS = function(item, transCSS, selected) {
        if (selected == null) {
          selected = true;
        }
        $(item).removeClass(this.in_class).removeClass(transCSS);
        if (selected) {
          $(item).addClass(this.selected);
        }
        $(item).addClass(this.item_class);
        return $(item).off("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd");
      };

      CarouselCSS.prototype.moveCarousel = function(dir) {
        var css, current, item;
        if (dir == null) {
          dir = "right";
        }
        current = this.getSelected();
        item = dir === "left" ? this.getNextItem(current, false) : this.getNextItem(current);
        css = dir === "left" ? this.left_classes : this.right_classes;
        this.cssTransitionsIn(item, css.start);
        return this.cssTransitionsOut(current, css.out);
      };

      CarouselCSS.prototype.setCSSTransitions = function(id, move) {
        return _.defer(function(id, move) {
          return $(id).addClass(move);
        }, id, move);
      };

      CarouselCSS.prototype.transitionCSSStart = function(item, start) {
        return $(item).removeClass(this.item_class).addClass(start);
      };

      CarouselCSS.prototype.trackTransition = function(item, css, selected) {
        return $(item).on("transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd", {
          callback: this.finishCSS,
          css: css,
          call: this,
          selected: selected
        }, function(e) {
          return e.data.callback.call(e.data.call, this, css, selected);
        });
      };

      return CarouselCSS;

    })(Carousel);
  });

}).call(this);
