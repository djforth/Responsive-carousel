(function() {
  describe("Carousel Animation (No CSS Transition)", function() {
    beforeEach(function() {
      var flag, that;
      flag = false;
      loadFixtures("carousel.html");
      this.carousel = "";
      that = this;
      require(['carousel/carousel_ani'], function(Carousel_ani) {
        flag = true;
        return that.carousel = new Carousel_ani({}, false);
      });
      return waitsFor(function() {
        return flag;
      });
    });
    it('It should exist', function() {
      return expect(this.carousel).toBeDefined();
    });
    describe('Animation - no CSS Tranistions', function() {
      return describe("should set move amount", function() {
        beforeEach(function() {
          return spyOn(this.carousel, "getDocWidth").andReturn(200);
        });
        it("should return the correct in amount depending on direction", function() {
          var left, right;
          left = this.carousel.getInAmount('left');
          expect(left).toEqual(200);
          right = this.carousel.getInAmount();
          return expect(right).toEqual(-200);
        });
        return it("should return the correct out amount depending on direction", function() {
          var left, right;
          left = this.carousel.getOutAmount('left');
          expect(left).toEqual(-200);
          right = this.carousel.getOutAmount();
          return expect(right).toEqual(200);
        });
      });
    });
    describe('move carousel functions', function() {
      beforeEach(function() {
        spyOn(this.carousel, 'getSelected').andReturn("test1");
        spyOn(this.carousel, 'getNextItem').andReturn("test2");
        spyOn(this.carousel, "getDocWidth").andReturn(200);
        spyOn(this.carousel, 'transitionsIn');
        return spyOn(this.carousel, 'transitionsOut');
      });
      it("Should trigger animation - right", function() {
        this.carousel.moveCarousel("right");
        expect(this.carousel.transitionsIn).toHaveBeenCalledWith('test2', 'carousel-start', -200);
        return expect(this.carousel.transitionsOut).toHaveBeenCalledWith('test1', 200);
      });
      return it("Should trigger animation - left", function() {
        this.carousel.moveCarousel("left");
        expect(this.carousel.transitionsIn).toHaveBeenCalledWith('test2', 'carousel-start-reverse', 200);
        return expect(this.carousel.transitionsOut).toHaveBeenCalledWith('test1', -200);
      });
    });
    return describe("Animation function", function() {
      beforeEach(function() {
        $('#project_outer').append("<div id='test', class='carousel-items'></div>");
        return $(".carousel-items").html($(".slug").first());
      });
      describe("transitions function", function() {
        beforeEach(function() {
          spyOn(this.carousel, 'animateCarousel');
          return jasmine.Clock.useMock();
        });
        it('should set the transition in', function() {
          this.carousel.transitionsIn($("#test"), 'test', 10);
          jasmine.Clock.tick(20);
          expect($('#test')).not.toHaveClass("carousel-items");
          expect($('#test')).toHaveClass("test");
          return expect(this.carousel.animateCarousel).toHaveBeenCalled();
        });
        return it('should set the transition Out', function() {
          this.carousel.transitionsIn($("#test"), 10);
          jasmine.Clock.tick(20);
          return expect(this.carousel.animateCarousel).toHaveBeenCalled();
        });
      });
      describe('Animate Carousel Function', function() {
        beforeEach(function() {
          spyOn(this.carousel, 'finishAnimation');
          return jasmine.Clock.useMock();
        });
        return it('should trigger the finish animation function for in', function() {
          this.carousel.animateCarousel($('#test'), {
            css: "test",
            select: true,
            move: 10
          }, this.carousel);
          jasmine.Clock.tick(20);
          return expect(this.carousel.finishAnimation).toHaveBeenCalled;
        });
      });
      return describe('finishAnimation function', function() {
        beforeEach(function() {
          return $("#test").addClass('test');
        });
        it('should set the css for selected', function() {
          this.carousel.finishAnimation($("#test"), true, "test");
          expect($('#test')).not.toHaveClass("test");
          expect($('#test')).toHaveClass("carousel-selected");
          return expect($('#test')).toHaveClass("carousel-items");
        });
        return it('should set the css for unselected', function() {
          this.carousel.finishAnimation($("#test"), false);
          expect($('#test')).toHaveClass("test");
          expect($('#test')).not.toHaveClass("carousel-selected");
          return expect($('#test')).toHaveClass("carousel-items");
        });
      });
    });
  });

}).call(this);
