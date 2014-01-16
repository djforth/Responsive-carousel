(function() {
  describe("Carousel Touch", function() {
    beforeEach(function() {
      var flag, that;
      flag = false;
      loadFixtures("carousel.html");
      this.carousel = "";
      that = this;
      require(['carousel/carousel_touch'], function(Carousel_touch) {
        flag = true;
        return that.carousel = new Carousel_touch({}, false);
      });
      return waitsFor(function() {
        return flag;
      });
    });
    it('It should exist', function() {
      return expect(this.carousel).toBeDefined();
    });
    return describe('get touch area', function() {
      beforeEach(function() {
        return this.area = this.carousel.getTouchArea();
      });
      it('should get touch area', function() {
        console.log("Area test", this.area);
        expect(this.area).toBeDefined();
        return expect(this.area.attr('id')).toEqual("project_outer");
      });
      describe('move functions', function() {
        beforeEach(function() {
          spyOn(this.carousel, 'processTouchData').andReturn({
            pageX: 10
          });
          return this.e = jasmine.createSpyObj('e', ['preventDefault', 'touches']);
        });
        it("should trigger the move info", function() {
          this.carousel.getMoveInfo(this.e);
          expect(this.e.preventDefault).toHaveBeenCalled();
          expect(this.carousel.processTouchData).toHaveBeenCalled();
          return expect(this.carousel.startX).toEqual(10);
        });
        it('touch stop should return boolean', function() {
          expect(this.carousel.touchStop([1, 2])).toBeTruthy();
          return expect(this.carousel.touchStop([1])).toBeFalsy();
        });
        it('touch move should stop', function() {
          spyOn(this.carousel, 'touchStop').andReturn(true);
          spyOn(this.carousel, 'touchCancel');
          this.carousel.touchMove(this.e);
          expect(this.e.preventDefault).toHaveBeenCalled();
          return expect(this.carousel.touchCancel).toHaveBeenCalled();
        });
        it('touch move should set moveX', function() {
          spyOn(this.carousel, 'touchStop').andReturn(false);
          this.carousel.touchMove(this.e);
          expect(this.e.preventDefault).toHaveBeenCalled();
          return expect(this.carousel.moveX).toEqual(10);
        });
        it("should set direction based on start and end", function() {
          var dir;
          this.carousel.startX = 0;
          this.carousel.moveX = 10;
          dir = this.carousel.touchDirection();
          expect(dir).toEqual('right');
          this.carousel.startX = 20;
          dir = this.carousel.touchDirection();
          return expect(dir).toEqual('left');
        });
        return it('touch end should set transition', function() {
          spyOn(this.carousel, 'touchDirection').andReturn("right");
          spyOn(this.carousel, 'touchCancel');
          spyOn(this.carousel, 'moveCarousel');
          this.carousel.touchEnd();
          expect(this.carousel.touchCancel).toHaveBeenCalled();
          expect(this.carousel.touchDirection).toHaveBeenCalled();
          return expect(this.carousel.moveCarousel).toHaveBeenCalledWith("right");
        });
      });
      return describe('initialize function', function() {
        beforeEach(function() {
          spyOn(this.carousel, 'getItems');
          spyOn(this.carousel, 'getAmount');
          spyOn(this.carousel, 'wrapItems');
          spyOn(this.carousel, 'applyButtons');
          spyOn(this.carousel, 'moniterResize');
          spyOn(this.carousel, 'getTouchArea');
          return spyOn(this.carousel, 'startTouch');
        });
        return it('should call all of the correct functions to initialise carousel', function() {
          this.carousel.init();
          expect(this.carousel.getItems).toHaveBeenCalled();
          expect(this.carousel.getAmount).toHaveBeenCalled();
          expect(this.carousel.wrapItems).toHaveBeenCalled();
          expect(this.carousel.applyButtons).toHaveBeenCalled();
          expect(this.carousel.moniterResize).toHaveBeenCalled();
          expect(this.carousel.getTouchArea).toHaveBeenCalled();
          return expect(this.carousel.startTouch).toHaveBeenCalled();
        });
      });
    });
  });

}).call(this);
