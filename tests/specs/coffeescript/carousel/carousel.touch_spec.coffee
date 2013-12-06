describe "Carousel Touch", ->

  beforeEach ->
    flag = false
    loadFixtures "carousel.html"

    @carousel = ""
    that = @

    require ['carousel/carousel.touch'], (Carousel_touch) ->
      # @feature = new detect()
      flag = true
      that.carousel = new Carousel_touch({},false)

    waitsFor ->
      flag


  it 'It should exist', ->
    expect(@carousel).toBeDefined()


  describe 'get touch area', ->

    beforeEach ->
      @area = @carousel.getTouchArea()

    it 'should get touch area', ->
      # area = @carousel.getTouchArea()
      expect(@area).toBeDefined()
      expect(@area).toHaveAttr('id',"project_outer")

    describe 'move functions', ->
      beforeEach ->
        spyOn(@carousel, 'processTouchData').andReturn({pageX:10})
        @e = jasmine.createSpyObj('e', [ 'preventDefault', 'touches' ]);

      it "should trigger the move info", ->
        @carousel.getMoveInfo(@e)
        expect(@e.preventDefault).toHaveBeenCalled()
        expect(@carousel.processTouchData).toHaveBeenCalled()
        expect(@carousel.startX).toEqual(10)

      it 'touch stop should return boolean', ->
        expect(@carousel.touchStop([1,2])).toBeTruthy()
        expect(@carousel.touchStop([1])).toBeFalsy()

      it 'touch move should stop', ->
        spyOn(@carousel, 'touchStop').andReturn(true)
        spyOn(@carousel, 'touchCancel')

        @carousel.touchMove(@e)
        expect(@e.preventDefault).toHaveBeenCalled()
        expect(@carousel.touchCancel).toHaveBeenCalled()

      it 'touch move should set moveX', ->
        spyOn(@carousel, 'touchStop').andReturn(false)
        # spyOn(@carousel, 'touchCancel')

        @carousel.touchMove(@e)
        expect(@e.preventDefault).toHaveBeenCalled()
        expect(@carousel.moveX).toEqual(10)

      it "should set direction based on start and end", ->
        @carousel.startX = 0
        @carousel.moveX =  10

        dir = @carousel.touchDirection()
        expect(dir).toEqual('right')

        @carousel.startX = 20
        dir = @carousel.touchDirection()
        expect(dir).toEqual('left')

      it 'touch end should set transition', ->
        spyOn(@carousel, 'touchDirection').andReturn("right")
        spyOn(@carousel, 'touchCancel')
        spyOn(@carousel, 'moveCarousel')

        @carousel.touchEnd()

        expect(@carousel.touchCancel).toHaveBeenCalled()
        expect(@carousel.touchDirection).toHaveBeenCalled()
        expect(@carousel.moveCarousel).toHaveBeenCalledWith("right")

    describe 'initialize function', ->

      beforeEach ->
        spyOn(@carousel, 'getItems')
        spyOn(@carousel, 'getAmount')
        spyOn(@carousel, 'wrapItems')
        spyOn(@carousel, 'applyButtons')
        spyOn(@carousel, 'moniterResize')
        spyOn(@carousel, 'getTouchArea')
        spyOn(@carousel, 'startTouch')

      it 'should call all of the correct functions to initialise carousel', ->
        @carousel.init()
        expect(@carousel.getItems).toHaveBeenCalled()
        expect(@carousel.getAmount).toHaveBeenCalled()
        expect(@carousel.wrapItems).toHaveBeenCalled()
        expect(@carousel.applyButtons).toHaveBeenCalled()
        expect(@carousel.moniterResize).toHaveBeenCalled()
        expect(@carousel.getTouchArea).toHaveBeenCalled()
        expect(@carousel.startTouch).toHaveBeenCalled()




