
describe "Carousel", ->
  beforeEach ->
    flag = false
    loadFixtures "carousel.html"

    @carousel = ""
    that = @

    # @feature = new detect()
    require ['carousel/carousel.main'], (Carousel) ->
      flag = true
      that.carousel = new Carousel({},false)


    waitsFor ->
      flag

  describe "checks the number of items", ->

    beforeEach ->
      $('#project_outer').width(360)

      $("#project_outer article").width(100)

      @carousel.getItems()
      @carousel.getAmount()

    it "should check number of items", ->
      expect(@carousel.items.length).toEqual(5)

    it "should how manyItems will fit", ->
      expect(@carousel.section_limit).toEqual(2)

    describe "wrap containers", ->
      beforeEach ->
        @carousel.wrapItems()

      it "should add containers", ->
        expect($(".carousel-items").length).toEqual(3)

      it "should add selected to first item", ->
        expect($('#inner1')).toHaveClass("carousel-selected")
        expect($('#inner2')).not.toHaveClass("carousel-selected")

      describe "should add and remove selected class", ->

        it "should remove selected from item", ->
          expect($('#inner1')).toHaveClass("carousel-selected")
          @carousel.removeSelect($('#inner1'))
          expect($('#inner1')).not.toHaveClass("carousel-selected")

        it "should add selected from item", ->
          expect($('#inner2')).not.toHaveClass("carousel-selected")
          @carousel.selectedItem($('#inner2'))
          expect($('#inner2')).toHaveClass("carousel-selected")


      describe "find items", ->
        it "Should return the selected item", ->
          item = @carousel.getSelected()
          expect(item).toBe("#inner1")

        it "Should select the next item", ->
          item = @carousel.getNextItem($(".carousel-selected"))
          expect(item).toBe("#inner2")

        it "Should select first item if selected at last", ->
          $('#inner1').removeClass("carousel-selected")
          $('#inner3').addClass("carousel-selected")
          item = @carousel.getNextItem($(".carousel-selected"))
          expect(item).toBe("#inner1")


        it "Should select previous item", ->
          $('#inner1').removeClass("carousel-selected")
          $('#inner2').addClass("carousel-selected")
          item = @carousel.getNextItem($(".carousel-selected"), false)
          expect(item).toBe("#inner1")

        it "Should select last item if selected at first", ->
          item = @carousel.getNextItem($(".carousel-selected"), false)
          expect(item).toBe("#inner3")

    describe "sets click functions", ->
      beforeEach ->
        spyOn(@carousel, 'moveCarousel')
        @carousel.applyButtons()
        @left_btn = spyOnEvent('#left', 'click')
        @right_btn = spyOnEvent('#right', 'click')

      it 'should apply a click event to the left button', ->
        $('#left').click()
        expect(@left_btn).toHaveBeenTriggered()
        expect(@carousel.moveCarousel).toHaveBeenCalledWith("left")


      it 'should apply a click event to the right button', ->
        $('#right').click()
        expect(@right_btn).toHaveBeenTriggered()
        expect(@carousel.moveCarousel).toHaveBeenCalledWith("right")

    describe 'resize functions', ->
      beforeEach ->
        spyOn(@carousel, 'getAmount')
        spyOn(@carousel, 'wrapItems')


      it 'should call all of the correct functions to resize carousel', ->
          @carousel.resize()
          expect(@carousel.getAmount).toHaveBeenCalled()
          expect(@carousel.wrapItems).toHaveBeenCalled()

    describe 'init function', ->
      beforeEach ->
        spyOn(@carousel, 'getItems')
        spyOn(@carousel, 'getAmount')
        spyOn(@carousel, 'wrapItems')
        spyOn(@carousel, 'applyButtons')
        spyOn(@carousel, 'moniterResize')

      it 'should call all of the correct functions to initialise carousel', ->
        @carousel.init()
        expect(@carousel.getItems).toHaveBeenCalled()
        expect(@carousel.getAmount).toHaveBeenCalled()
        expect(@carousel.wrapItems).toHaveBeenCalled()
        expect(@carousel.applyButtons).toHaveBeenCalled()
        expect(@carousel.moniterResize).toHaveBeenCalled()














