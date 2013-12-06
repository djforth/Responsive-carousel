define (require) ->
  $           = require('jquery')
  _           = require('underscore')
  CarouselCss = require('carousel/carousel.css')

  class CarouselTouch extends CarouselCss
    startX:null
    moveX:null
    direction:null
    touch_area:null
    touchID:"project_outer"

    init:()->
      super()
      @getTouchArea()
      @startTouch()


    getMoveInfo:(e)->
      e.preventDefault()
      touch = @processTouchData(e.touches)
      @startX = touch.pageX
      that = @
      @touch_area.on 'touchmove', {callback:@touchMove ,c:@}, (e)->

          e.data.callback.call(e.data.c, e.originalEvent)

      @touch_area.on 'touchend', {callback:@touchEnd ,c:@}, (e)->
          e.data.callback.call(e.data.c, e.originalEvent)

    getTouchArea:()->
      @touch_area =  $(@holder)

    processTouchData:(touches)->
      touches[0]

    startTouch:()->
      that = @
      if @touch_area
        @touch_area.on 'touchstart', {callback:@getMoveInfo ,c:@}, (e)->
          # console.log e.originalEvent
          e.data.callback.call(e.data.c, e.originalEvent)

    touchCancel:() ->
      @touch_area.off 'touchmove'
      @touch_area.off 'touchend'

    touchDirection:() ->
      if (@startX < @moveX) then "right" else "left"

    touchEnd:() ->
      @touchCancel()

      @moveCarousel(@touchDirection())

    touchMove:(e) ->
      e.preventDefault()

      if @touchStop(e.touches)
        @touchCancel()
      else
        touch = @processTouchData(e.touches)
        @moveX = touch.pageX

    touchStop:(touches)->
      touches.length > 1



# carouselTouch = (opt) ->

#   startX =  null
#   moveX = null
#   direction = null
#   holder = document.getElementById(opt.id)

#   this.touchCancel = (e) ->
#     # console.log("Touch cancel");
#     holder.removeEventListener('touchmove')
#     holder.removeEventListener('touchend')

#   this.touchDirection = () ->
#     if (startX < moveX)
#       return "right"
#     else
#       return "left"


#   this.touchStart = (e) ->
#     e.preventDefault()
#     touch = e.touches[0];
#     # console.log("Touch x:" + touch.pageX)
#     startX = touch.pageX
#     holder.addEventListener('touchmove', touchMove)
#     holder.addEventListener('touchend', touchEnd)

#   this.touchMove = (e) ->
#     e.preventDefault()
#     if e.touches.length > 1
#       touchCancel()
#     else
#       touch = e.touches[0];
#       moveX = touch.pageX


#     # console.log("Touch move x:" + touch.pageX);

#   this.touchEnd = (e) ->
#     # touch = e.touches[0];
#     touchCancel()

#     direction = touchDirection()

#     if direction == "left"
#       $(".carousel").moveLeft()
#     else
#       $(".carousel").moveRight()
#     # console.log("Touch end" + direction);





#   holder.addEventListener('touchstart', touchStart) if holder




# $(document).ready ->
#   carouselTouch({id:'project_outer'}) if touchSupported