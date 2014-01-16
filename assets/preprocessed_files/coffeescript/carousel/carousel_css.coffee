define (require) ->
  $        = require('jquery')
  _        = require('underscore')
  Carousel = require('carousel/carousel_main')

  # d = new Detect()
  # $ = if !d.ieBrowser() then $2 else $1

  class CarouselCSS extends Carousel
    CSSTransitions:""

    cssTransitionsIn:(item, css)->
      @transitionCSSStart item, css
      @setCSSTransitions item, @in_class
      @trackTransition item, css, true

    cssTransitionsOut:(item, css)->
      @removeSelect(item)
      @transitionCSSStart item, css
      @trackTransition item, css, false

    finishCSS:(item, transCSS, selected=true)->
      $(item).removeClass(@in_class).removeClass(transCSS)
      $(item).addClass(@selected) if selected
      $(item).addClass(@item_class)
      $(item).off "transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd"

    moveCarousel:(dir="right")->
      # super(dir)
      current =  @getSelected()
      item = if dir == "left" then @getNextItem(current, false) else @getNextItem(current)

      css = if dir == "left" then @left_classes else @right_classes

      @cssTransitionsIn(item, css.start)
      @cssTransitionsOut(current, css.out)

    setCSSTransitions:(id, move)->
      _.defer (id, move)->
        $(id).addClass(move)
      , id, move

    transitionCSSStart:(item, start) ->
      $(item).removeClass(@item_class).addClass(start)

    trackTransition:(item, css, selected)->
      $(item).on "transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd", {callback:@finishCSS, css:css, call:@, selected:selected},(e)->
        e.data.callback.call(e.data.call, this, css, selected)

