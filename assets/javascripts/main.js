(function() {
  var dependencies;

  require.config({
    baseUrl: "/assets/javascripts",
    paths: {
      jquery: 'lib/jquery.min',
      underscore: 'lib/underscore-min',
      carousel: 'carousel',
      utils: 'utils'
    }
  });

  dependencies = ['utils/detect', 'carousel/carousel_css', 'carousel/carousel_ani', 'carousel/carousel_touch'];

  require(['utils/detect', 'carousel/carousel_css', 'carousel/carousel_ani', 'carousel/carousel_touch'], function(Detect, CarouselCss, CarouselAni, CarouselTouch) {
    var carousel, d;
    d = new Detect();
    if (d.has_touch()) {
      return carousel = new CarouselTouch();
    } else if (d.has_css_transitions()) {
      return carousel = new CarouselCss();
    } else {
      return carousel = new CarouselAni();
    }
  });

}).call(this);
