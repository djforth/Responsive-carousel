require.config {
  baseUrl: "/assets/javascripts"
  paths:
    jquery:'lib/jquery.min'
    underscore: 'lib/underscore-min'
    carousel:'carousel'
    utils:'utils'
}

dependencies = [
  'utils/detect',
  'carousel/carousel.css',
  'carousel/carousel.ani'
  'carousel/carousel.touch'
]


require [
  'utils/detect',
  'carousel/carousel.css',
  'carousel/carousel.ani'
  'carousel/carousel.touch'
], (Detect, CarouselCss, CarouselAni, CarouselTouch) ->

    #Sets carousel functions - Homepage only
    d = new Detect()
    if d.has_touch()
      # # console.log "Touch"
      carousel = new CarouselTouch()
    else if d.has_css_transitions()
      # # console.log "CSS Transitions"
      carousel = new CarouselCss()
    else
      # # console.log "Animations"
      carousel = new CarouselAni()
