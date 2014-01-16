(function() {
  var clickElement;

  clickElement = function(el) {
    var ev;
    ev = document.createEvent("MouseEvent");
    ev.initMouseEvent("click", true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
    return el.dispatchEvent(ev);
  };

  describe("Carousel", function() {
    beforeEach(function() {
      var flag, that;
      flag = false;
      loadFixtures("carousel.html");
      this.carousel = "";
      that = this;
      require(['carousel/carousel_main'], function(Carousel) {
        flag = true;
        return that.carousel = new Carousel({}, false);
      });
      return waitsFor(function() {
        return flag;
      });
    });
    return describe("checks the number of items", function() {
      beforeEach(function() {
        $('#project_outer').width(360);
        $("#project_outer article").width(100);
        this.carousel.getItems();
        return this.carousel.getAmount();
      });
      it("should check number of items", function() {
        return expect(this.carousel.items.length).toEqual(5);
      });
      it("should how manyItems will fit", function() {
        return expect(this.carousel.section_limit).toEqual(2);
      });
      describe("wrap containers", function() {
        beforeEach(function() {
          return this.carousel.wrapItems();
        });
        it("should add containers", function() {
          return expect($(".carousel-items").length).toEqual(3);
        });
        it("should add selected to first item", function() {
          expect($('#inner1')).toHaveClass("carousel-selected");
          return expect($('#inner2')).not.toHaveClass("carousel-selected");
        });
        describe("should add and remove selected class", function() {
          it("should remove selected from item", function() {
            expect($('#inner1')).toHaveClass("carousel-selected");
            this.carousel.removeSelect($('#inner1'));
            return expect($('#inner1')).not.toHaveClass("carousel-selected");
          });
          return it("should add selected from item", function() {
            expect($('#inner2')).not.toHaveClass("carousel-selected");
            this.carousel.selectedItem($('#inner2'));
            return expect($('#inner2')).toHaveClass("carousel-selected");
          });
        });
        return describe("find items", function() {
          it("Should return the selected item", function() {
            var item;
            item = this.carousel.getSelected();
            return expect(item.attr("id")).toEqual("inner1");
          });
          it("Should select the next item", function() {
            var item;
            item = this.carousel.getNextItem($(".carousel-selected"));
            return expect(item.attr("id")).toEqual("inner2");
          });
          it("Should select first item if selected at last", function() {
            var item;
            $('#inner1').removeClass("carousel-selected");
            $('#inner3').addClass("carousel-selected");
            item = this.carousel.getNextItem($(".carousel-selected"));
            return expect(item.attr("id")).toEqual("inner1");
          });
          it("Should select previous item", function() {
            var item;
            $('#inner1').removeClass("carousel-selected");
            $('#inner2').addClass("carousel-selected");
            item = this.carousel.getNextItem($(".carousel-selected"), false);
            return expect(item).toBe("#inner1");
          });
          return it("Should select last item if selected at first", function() {
            var item;
            item = this.carousel.getNextItem($(".carousel-selected"), false);
            return expect(item.attr("id")).toEqual("inner3");
          });
        });
      });
      describe("sets click functions", function() {
        beforeEach(function() {
          spyOn(this.carousel, 'moveCarousel');
          this.carousel.applyButtons();
          this.left_btn = spyOnEvent('#left', 'click');
          return this.right_btn = spyOnEvent('#right', 'click');
        });
        it('should apply a click event to the left button', function() {
          var el;
          if (window._phantom) {
            el = document.querySelector("#left");
            clickElement(el);
          } else {
            $('#left').click();
          }
          expect(this.left_btn).toHaveBeenTriggered();
          return expect(this.carousel.moveCarousel).toHaveBeenCalledWith("left");
        });
        return it('should apply a click event to the right button', function() {
          var el;
          if (window._phantom) {
            el = document.querySelector("#right");
            clickElement(el);
          } else {
            $('#right').click();
          }
          expect(this.right_btn).toHaveBeenTriggered();
          return expect(this.carousel.moveCarousel).toHaveBeenCalledWith("right");
        });
      });
      describe('resize functions', function() {
        beforeEach(function() {
          spyOn(this.carousel, 'getAmount');
          return spyOn(this.carousel, 'wrapItems');
        });
        return it('should call all of the correct functions to resize carousel', function() {
          this.carousel.resize();
          expect(this.carousel.getAmount).toHaveBeenCalled();
          return expect(this.carousel.wrapItems).toHaveBeenCalled();
        });
      });
      return describe('init function', function() {
        beforeEach(function() {
          spyOn(this.carousel, 'getItems');
          spyOn(this.carousel, 'getAmount');
          spyOn(this.carousel, 'wrapItems');
          spyOn(this.carousel, 'applyButtons');
          return spyOn(this.carousel, 'moniterResize');
        });
        return it('should call all of the correct functions to initialise carousel', function() {
          this.carousel.init();
          expect(this.carousel.getItems).toHaveBeenCalled();
          expect(this.carousel.getAmount).toHaveBeenCalled();
          expect(this.carousel.wrapItems).toHaveBeenCalled();
          expect(this.carousel.applyButtons).toHaveBeenCalled();
          return expect(this.carousel.moniterResize).toHaveBeenCalled();
        });
      });
    });
  });

}).call(this);
