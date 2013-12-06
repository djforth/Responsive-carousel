
define (require) ->


  class FeatureDetect
    canvas:false
    geo:false
    transitions:false
    touch:false
    ie:false

    constructor:(reset)->
      if reset
        @transitions = false
        @touch = false

      @canvasSupported()
      @geoloactionSupported()
      @transitionsCSS()
      @touchSupport()
      @ieCheck()


    canvasSupported:()->
      @canvas = !!document.createElement('canvas').getContext

    has_canvas:()->
      @canvas

    has_geolocation:()->
      @geo

    has_css_transitions:()->
      @transitions

    has_touch:()->
      @touch

    geoloactionSupported:()->
      @geo = !!navigator.geolocation

    ieCheck:()->
      @ie = !('__proto__' of {})

    ieBrowser:()->
      @ie

    touchSupport:()->
      @touch = window.touch

    transitionsCSS:()->
      div = document.createElement('div')
      div.innerHTML = '<div style="-webkit-transition:color 1s linear;-moz-transition:color 1s linear;"></div>'
      @transitions = (div.firstChild.style.webkitTransition != undefined) || (div.firstChild.style.MozTransition != undefined) || (div.firstChild.style.Transition != undefined)

      div.delete

  FeatureDetect


