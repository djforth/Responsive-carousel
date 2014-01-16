(function() {
  describe("CarouselCSS", function() {
    beforeEach(function() {
      var flag, that;
      flag = false;
      loadFixtures("carousel.html");
      this.carousel = "";
      that = this;
      require(['carousel/carousel_css'], function(Carousel_css) {
        flag = true;
        return that.carousel = new Carousel_css({}, false);
      });
      return waitsFor(function() {
        return flag;
      });
    });
    it('It should exist', function() {
      return expect(this.carousel).toBeDefined();
    });
    return describe("CSS3 transitions", function() {
      beforeEach(function() {
        $('#project_outer').append("<div id='test', class='carousel-items'></div>");
        return $(".carousel-items").html($(".slug").first());
      });
      it("sets the start classes", function() {
        this.carousel.transitionCSSStart("#test", "newclass");
        expect($('#test')).toHaveClass("newclass");
        return expect($('#test')).not.toHaveClass("carousel-items");
      });
      describe("starts transitions", function() {
        beforeEach(function() {
          return jasmine.Clock.useMock();
        });
        return it("should set transition styles", function() {
          this.carousel.setCSSTransitions("#test", "mover");
          expect($('#test')).not.toHaveClass("mover");
          jasmine.Clock.tick(51);
          return expect($('#test')).toHaveClass("mover");
        });
      });
      describe('check correct functions called when starting transition In and out', function() {
        beforeEach(function() {
          spyOn(this.carousel, 'transitionCSSStart');
          spyOn(this.carousel, 'setCSSTransitions');
          return spyOn(this.carousel, 'trackTransition');
        });
        it('should set the CSS transition in functions', function() {
          this.carousel.cssTransitionsIn("test-in", "cssIn");
          expect(this.carousel.transitionCSSStart).toHaveBeenCalledWith("test-in", 'cssIn');
          expect(this.carousel.setCSSTransitions).toHaveBeenCalledWith("test-in", "carousel-in");
          return expect(this.carousel.trackTransition).toHaveBeenCalledWith("test-in", 'cssIn', true);
        });
        return it('should set the CSS transition out functions', function() {
          this.carousel.cssTransitionsIn("test-out", "css-out");
          expect(this.carousel.transitionCSSStart).toHaveBeenCalledWith("test-out", 'css-out');
          return expect(this.carousel.trackTransition).toHaveBeenCalledWith("test-out", 'css-out', true);
        });
      });
      describe("Checks when animation finished", function() {
        beforeEach(function() {
          $("#test").addClass("carousel-start-reverse").addClass("carousel-in").removeClass("carousel-items");
          return this.holder = $("#test");
        });
        return it("Should remove styles at end and add selected class", function() {
          expect(this.holder).toHaveClass("carousel-start-reverse");
          expect(this.holder).toHaveClass("carousel-in");
          expect(this.holder).not.toHaveClass("carousel-selected");
          expect(this.holder).not.toHaveClass("carousel-items");
          this.carousel.finishCSS("#test", "carousel-start-reverse");
          expect(this.holder).not.toHaveClass("carousel-start-reverse");
          expect(this.holder).not.toHaveClass("carousel-in");
          expect(this.holder).toHaveClass("carousel-selected");
          return expect(this.holder).toHaveClass("carousel-items");
        });
      });
      return describe('move carousel functions', function() {
        beforeEach(function() {
          spyOn(this.carousel, 'getSelected').andReturn("test1");
          return spyOn(this.carousel, 'getNextItem').andReturn("test2");
        });
        it("should call functions to find the next item", function() {
          this.carousel.moveCarousel("right");
          expect(this.carousel.getSelected).toHaveBeenCalled();
          return expect(this.carousel.getNextItem).toHaveBeenCalledWith("test1");
        });
        return describe('CSS Transitions functions', function() {
          beforeEach(function() {
            spyOn(this.carousel, 'cssTransitionsIn');
            return spyOn(this.carousel, 'cssTransitionsOut');
          });
          it("Should trigger css transitions - right", function() {
            this.carousel.moveCarousel("right");
            expect(this.carousel.cssTransitionsIn).toHaveBeenCalledWith('test2', 'carousel-start');
            return expect(this.carousel.cssTransitionsOut).toHaveBeenCalledWith('test1', 'carousel-out');
          });
          return it("Should trigger css transitions - left", function() {
            this.carousel.moveCarousel("left");
            expect(this.carousel.cssTransitionsIn).toHaveBeenCalledWith('test2', 'carousel-start-reverse');
            return expect(this.carousel.cssTransitionsOut).toHaveBeenCalledWith('test1', 'carousel-out-reverse');
          });
        });
      });
    });
  });

}).call(this);
