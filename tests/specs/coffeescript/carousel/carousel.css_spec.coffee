
describe "CarouselCSS", ->

  beforeEach ->
    flag = false
    loadFixtures "carousel.html"

    @carousel = ""
    that = @

    require ['carousel/carousel.css'], (Carousel_css) ->
      # @feature = new detect()
      flag = true
      that.carousel = new Carousel_css({},false)

    waitsFor ->
      flag


  it 'It should exist', ->
    expect(@carousel).toBeDefined()


  describe "CSS3 transitions", ->

    beforeEach ->
      $('#project_outer').append("<div id='test', class='carousel-items'></div>")
      $(".carousel-items").html($(".slug").first())


    it "sets the start classes", ->
      @carousel.transitionCSSStart("#test", "newclass")
      expect($('#test')).toHaveClass("newclass")
      expect($('#test')).not.toHaveClass("carousel-items")

    describe "starts transitions", ->
      beforeEach ->
        jasmine.Clock.useMock()

      it "should set transition styles", ->
        @carousel.setCSSTransitions("#test", "mover")
        expect($('#test')).not.toHaveClass("mover")
        jasmine.Clock.tick(51)
        expect($('#test')).toHaveClass("mover")

    describe 'check correct functions called when starting transition In and out', ->

      beforeEach ->
        spyOn(@carousel, 'transitionCSSStart')
        spyOn(@carousel, 'setCSSTransitions')
        spyOn(@carousel, 'trackTransition')

      it 'should set the CSS transition in functions', ->
        @carousel.cssTransitionsIn("test-in", "cssIn")
        expect(@carousel.transitionCSSStart).toHaveBeenCalledWith("test-in", 'cssIn')
        expect(@carousel.setCSSTransitions).toHaveBeenCalledWith("test-in", "carousel-in")
        expect(@carousel.trackTransition).toHaveBeenCalledWith("test-in", 'cssIn', true)

      it 'should set the CSS transition out functions', ->
        @carousel.cssTransitionsIn("test-out", "css-out")
        expect(@carousel.transitionCSSStart).toHaveBeenCalledWith("test-out", 'css-out')
        expect(@carousel.trackTransition).toHaveBeenCalledWith("test-out", 'css-out', true)

    describe "Checks when animation finished", ->
      beforeEach ->
        $("#test").addClass("carousel-start-reverse").addClass("carousel-in").removeClass("carousel-items")
        @holder = $("#test")

      it "Should remove styles at end and add selected class", ->
        expect(@holder).toHaveClass("carousel-start-reverse")
        expect(@holder).toHaveClass("carousel-in")
        expect(@holder).not.toHaveClass("carousel-selected")
        expect(@holder).not.toHaveClass("carousel-items")

        @carousel.finishCSS("#test", "carousel-start-reverse")

        expect(@holder).not.toHaveClass("carousel-start-reverse")
        expect(@holder).not.toHaveClass("carousel-in")
        expect(@holder).toHaveClass("carousel-selected")
        expect(@holder).toHaveClass("carousel-items")


    describe 'move carousel functions', ->
      beforeEach ->
        spyOn(@carousel, 'getSelected').andReturn("test1")
        spyOn(@carousel, 'getNextItem').andReturn("test2")

      it "should call functions to find the next item", ->
        @carousel.moveCarousel("right")
        expect(@carousel.getSelected).toHaveBeenCalled()
        expect(@carousel.getNextItem).toHaveBeenCalledWith("test1")


      describe 'CSS Transitions functions', ->

        beforeEach ->
          spyOn(@carousel, 'cssTransitionsIn')
          spyOn(@carousel, 'cssTransitionsOut')

        it "Should trigger css transitions - right", ->
          # spyOn(@feature, "has_css_transitions").andReturn(true)
          @carousel.moveCarousel("right")
          expect(@carousel.cssTransitionsIn).toHaveBeenCalledWith('test2', 'carousel-start')
          expect(@carousel.cssTransitionsOut).toHaveBeenCalledWith('test1', 'carousel-out')

        it "Should trigger css transitions - left", ->
          # spyOn(@feature, "has_css_transitions").andReturn(true)
          @carousel.moveCarousel("left")
          expect(@carousel.cssTransitionsIn).toHaveBeenCalledWith('test2', 'carousel-start-reverse')
          expect(@carousel.cssTransitionsOut).toHaveBeenCalledWith('test1', 'carousel-out-reverse')

