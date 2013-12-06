define (require) ->
  $        = require('jquery')
  _        = require('underscore')
  Carousel = require('carousel/carousel.main')

  class CarouselAni extends Carousel

    animateCarousel:(item, data, that)->
      item.animate
        left:data.move
      , 200, ->
        that.finishAnimation.call(that, $(this), data.select, data.css)

    finishAnimation:(item, select, start_css)->
      item.removeClass(start_css) if select
      item.removeAttr( 'style' )
      if select
        item.addClass(@selected) 
      else 
        item.removeClass(@selected)
      item.addClass(@item_class)

    getDocWidth:()->
      $(document).width()

    getInAmount:(dir='right')->
      w = @getDocWidth()
      if dir == 'right' then 0 - w else w

    getOutAmount:(dir='right')->
      w = @getDocWidth()
      if dir == 'right' then w else 0 - w


    moveCarousel:(dir="right")->
      current =  @getSelected()  
      item = if dir == "left" then @getNextItem(current, false) else @getNextItem(current)

      css = if dir == "left" then @left_classes else @right_classes

      in_mover = @getInAmount(dir)
      out_mover = @getOutAmount(dir)

      @transitionsIn(item, css.start, in_mover)
      @transitionsOut(current, out_mover)


    transitionsIn:(item, css, starter)->
      item.removeClass(@item_class)
      item.addClass(css)
      item.css("left", starter)
      _.defer(@animateCarousel, item, {css:css, move:0, select:true}, @)

    transitionsOut:(item, starter)->

      _.defer(@animateCarousel, item, {css:"", move:starter, select:false}, @)
  




