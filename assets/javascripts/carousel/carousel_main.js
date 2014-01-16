(function() {
  define(function(require) {
    var $, Carousel, Detect, _;
    $ = require('jquery');
    _ = require('underscore');
    Detect = require("utils/detect");
    return Carousel = (function() {
      Carousel.prototype.holder = "#project_outer";

      Carousel.prototype.buttons = {
        left: "#left",
        right: "#right"
      };

      Carousel.prototype.in_class = "carousel-in";

      Carousel.prototype.item = ".slug";

      Carousel.prototype.item_class = 'carousel-items';

      Carousel.prototype.left_classes = {
        start: 'carousel-start-reverse',
        out: 'carousel-out-reverse'
      };

      Carousel.prototype.right_classes = {
        start: 'carousel-start',
        out: 'carousel-out'
      };

      Carousel.prototype.selected = "carousel-selected";

      Carousel.prototype.items = 0;

      Carousel.prototype.section_limit = 0;

      function Carousel(opt, initialize) {
        if (opt == null) {
          opt = {};
        }
        if (initialize == null) {
          initialize = true;
        }
        if (!_.isEmpty(opt)) {
          if (_.isString(opt.holder)) {
            this.holder = opt.holder;
          }
          if (_.isObject(opt.buttons)) {
            this.buttons = opt.buttons;
          }
          if (_.isString(opt.item)) {
            this.item = opt.item;
          }
        }
        if (initialize) {
          this.init();
        }
      }

      Carousel.prototype.animateItem = function(item, move) {
        return item.animate({
          left: move
        }, 200, function() {
          return $(this);
        });
      };

      Carousel.prototype.applyButtons = function() {
        $('body').off("click", this.buttons.left);
        $('body').on("click", this.buttons.left, {
          dir: "left",
          callback: this.moveCarousel,
          call: this
        }, function(e) {
          e.preventDefault();
          return e.data.callback.call(e.data.call, e.data.dir);
        });
        $('body').off("click", this.buttons.right);
        return $('body').on("click", this.buttons.right, {
          dir: "right",
          callback: this.moveCarousel,
          call: this
        }, function(e) {
          e.preventDefault();
          return e.data.callback.call(e.data.call, e.data.dir);
        });
      };

      Carousel.prototype.createItems = function(slugs, id) {
        $(this.holder).append("<div id='" + id + "' class='" + this.item_class + "'></div>");
        return $("#" + id).html(slugs);
      };

      Carousel.prototype.getItems = function() {
        return this.items = $(this.holder).find(this.item);
      };

      Carousel.prototype.getNextItem = function(current, next) {
        var item;
        if (next == null) {
          next = true;
        }
        if (next) {
          item = current.next();
          if (item.length < 1) {
            item = $(this.holder).children("." + this.item_class).first();
          }
        } else {
          item = current.prev();
          if (item.length < 1) {
            item = $(this.holder).children("." + this.item_class).last();
          }
        }
        return item;
      };

      Carousel.prototype.getSelected = function() {
        var selected;
        selected = $(this.holder).find("." + this.selected).first();
        if (_.isUndefined(selected)) {
          return $(this.holder).children("." + this.item_class).first();
        } else {
          return selected;
        }
      };

      Carousel.prototype.getAmount = function() {
        var item_width, width;
        width = $(this.holder).innerWidth();
        item_width = $(this.items[0]).outerWidth(true);
        return this.section_limit = Math.floor(width / item_width);
      };

      Carousel.prototype.init = function() {
        this.getItems();
        this.getAmount();
        this.wrapItems();
        this.applyButtons();
        return this.moniterResize();
      };

      Carousel.prototype.moniterResize = function() {
        return $(window).on('resize orientationchange', {
          resize: this.resize,
          c: this
        }, function(e) {
          return e.data.resize.call(e.data.c);
        });
      };

      Carousel.prototype.moveCarousel = function(dir) {
        var css, current, item;
        if (dir == null) {
          dir = "right";
        }
        current = this.getSelected();
        item = dir === "left" ? this.getNextItem(current, false) : this.getNextItem(current);
        return css = dir === "left" ? this.left_classes : this.right_classes;
      };

      Carousel.prototype.removeSelect = function(item) {
        return $(item).removeClass(this.selected);
      };

      Carousel.prototype.resize = function() {
        this.items.unwrap();
        $(this.item_class).remove();
        this.getAmount();
        return this.wrapItems();
      };

      Carousel.prototype.selectedItem = function(item) {
        return $(item).addClass(this.selected);
      };

      Carousel.prototype.transitionsOut = function(item, css) {
        return this.removeSelect(item);
      };

      Carousel.prototype.wrapItems = function() {
        var i, n, slugs, _i, _ref, _ref1;
        n = 0;
        for (i = _i = 0, _ref = this.items.length, _ref1 = this.section_limit; _ref1 > 0 ? _i < _ref : _i > _ref; i = _i += _ref1) {
          n++;
          slugs = this.items.slice(i, i + this.section_limit);
          this.createItems(slugs, "inner" + n);
        }
        return this.selectedItem("#inner1");
      };

      return Carousel;

    })();
  });

}).call(this);
