describe "Carousel Animation (No CSS Transition)", ->

  beforeEach ->
    flag = false
    loadFixtures "carousel.html"

    @carousel = ""
    that = @

    console.log "eh?"

    require ['carousel/carousel.ani'], (Carousel_ani) ->
      # @feature = new detect()
      flag = true
      that.carousel = new Carousel_ani({},false)

    waitsFor ->
      flag


  it 'It should exist', ->
    expect(@carousel).toBeDefined()


  describe 'Animation - no CSS Tranistions', ->
    describe "should set move amount", ->
      beforeEach ->
        spyOn(@carousel, "getDocWidth").andReturn(200)

      it "should return the correct in amount depending on direction", ->
        left = @carousel.getInAmount('left')
        expect(left).toEqual(200)

        right = @carousel.getInAmount()
        expect(right).toEqual(-200)

      it "should return the correct out amount depending on direction", ->
        left = @carousel.getOutAmount('left')
        expect(left).toEqual(-200)

        right = @carousel.getOutAmount()
        expect(right).toEqual(200)



  describe 'move carousel functions', ->

    beforeEach ->
      spyOn(@carousel, 'getSelected').andReturn("test1")
      spyOn(@carousel, 'getNextItem').andReturn("test2")
      spyOn(@carousel, "getDocWidth").andReturn(200)
      spyOn(@carousel, 'transitionsIn')
      spyOn(@carousel, 'transitionsOut')



    it "Should trigger animation - right", ->
      # spyOn(@feature, "has_css_transitions").andReturn(true)
      @carousel.moveCarousel("right")
      expect(@carousel.transitionsIn).toHaveBeenCalledWith('test2', 'carousel-start', -200)
      expect(@carousel.transitionsOut).toHaveBeenCalledWith('test1', 200)

    it "Should trigger animation - left", ->
      # spyOn(@feature, "has_css_transitions").andReturn(true)
      @carousel.moveCarousel("left")
      expect(@carousel.transitionsIn).toHaveBeenCalledWith('test2', 'carousel-start-reverse', 200)
      expect(@carousel.transitionsOut).toHaveBeenCalledWith('test1', -200)

  describe "Animation function", ->
    beforeEach ->
      $('#project_outer').append("<div id='test', class='carousel-items'></div>")
      $(".carousel-items").html($(".slug").first())

    describe "transitions function", ->

      beforeEach ->
        spyOn(@carousel, 'animateCarousel')
        jasmine.Clock.useMock()

      it 'should set the transition in', ->
        @carousel.transitionsIn($("#test"), 'test', 10)
        jasmine.Clock.tick(20)
        expect($('#test')).not.toHaveClass("carousel-items")
        expect($('#test')).toHaveClass("test")
        expect(@carousel.animateCarousel).toHaveBeenCalled()

      it 'should set the transition Out', ->
        @carousel.transitionsIn($("#test"), 10)
        jasmine.Clock.tick(20)
        expect(@carousel.animateCarousel).toHaveBeenCalled()

    describe 'Animate Carousel Function', ->
      beforeEach ->
        spyOn(@carousel, 'finishAnimation')
        jasmine.Clock.useMock()

      it 'should trigger the finish animation function for in', ->
        @carousel.animateCarousel($('#test'), {css:"test", select:true, move:10}, @carousel)
        jasmine.Clock.tick(20)
        expect(@carousel.finishAnimation).toHaveBeenCalled


    describe 'finishAnimation function', ->

      beforeEach ->
        $("#test").addClass('test')


      it 'should set the css for selected', ->
        @carousel.finishAnimation($("#test"), true, "test")
        expect($('#test')).not.toHaveClass("test")
        expect($('#test')).toHaveClass("carousel-selected")
        expect($('#test')).toHaveClass("carousel-items")

      it 'should set the css for unselected', ->
        @carousel.finishAnimation($("#test"), false)
        expect($('#test')).toHaveClass("test")
        expect($('#test')).not.toHaveClass("carousel-selected")
        expect($('#test')).toHaveClass("carousel-items")








