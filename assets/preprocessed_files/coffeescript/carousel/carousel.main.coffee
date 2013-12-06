define (require) ->
  $        = require('jquery')
  _        = require('underscore')
  Detect   = require("utils/detect")


  # d = new Detect()

  # $ = if !d.ieBrowser() then $2 else $1

  class Carousel
    holder:"#project_outer"
    buttons:{
      left:"#left"
      right:"#right"
    }
    # CSSTransitions:""
    in_class:"carousel-in"
    item:".slug"
    item_class:'carousel-items'
    left_classes:{
      start:'carousel-start-reverse',
      out:'carousel-out-reverse'
    }
    right_classes:{
      start:'carousel-start',
      out:'carousel-out'
    }
    selected:"carousel-selected"
    items:0
    section_limit:0

    constructor:(opt={}, initialize=true)->
      if !_.isEmpty(opt)
        @holder = opt.holder if _.isString(opt.holder)
        @buttons = opt.buttons if _.isObject(opt.buttons)
        @item = opt.item if _.isString(opt.item)

      @init() if initialize

    animateItem:(item, move)->
      item.animate
        left:move, 200, ->
          $(this)

    applyButtons:()->
      $('body').off "click", @buttons.left
      $('body').on "click", @buttons.left, {dir:"left", callback:@moveCarousel, call:@}, (e)->
          e.preventDefault()
          e.data.callback.call(e.data.call, e.data.dir)

      $('body').off "click", @buttons.right
      $('body').on "click", @buttons.right, {dir:"right", callback:@moveCarousel, call:@}, (e)->
          e.preventDefault()
          e.data.callback.call(e.data.call, e.data.dir)


    createItems:(slugs, id)->
      $(@holder).append("<div id='"+id+"' class='"+@item_class+"'></div>")
      $("#"+id).html(slugs)


    getItems:()->
      @items = $(@holder).find(@item)

    getNextItem:(current, next=true)->
      if next
        item = current.next()
        item = $(@holder).children("."+@item_class).first() if item.length < 1

      else
        item = current.prev()
        item = $(@holder).children("."+@item_class).last() if item.length < 1

      item

    getSelected:()->
      selected = $(@holder).find("."+@selected).first()
      return if _.isUndefined(selected) then $(@holder).children("."+@item_class).first() else selected


    #Works out how many visible
    getAmount:()->
      width = $(@holder).innerWidth()
      item_width = $(@items[0]).outerWidth(true)
      @section_limit = Math.floor(width/item_width)

    init:()->
      # console.log "huh??"
      @getItems()
      @getAmount()
      @wrapItems()
      @applyButtons()
      @moniterResize()

    moniterResize:() ->
      $(window).on 'resize orientationchange', {resize:@resize, c:@}, (e) ->
        e.data.resize.call(e.data.c)


    moveCarousel:(dir="right")->
      current =  @getSelected()
      item = if dir == "left" then @getNextItem(current, false) else @getNextItem(current)

      css = if dir == "left" then @left_classes else @right_classes

    removeSelect:(item)->
      $(item).removeClass(@selected)

    resize:() ->
      @items.unwrap()
      $(@item_class).remove()
      @getAmount()
      @wrapItems()

    selectedItem:(item)->
      $(item).addClass(@selected)

    transitionsOut:(item, css)->
      @removeSelect(item)

    wrapItems:()->
      n = 0

      for i in [0...@items.length] by @section_limit
        n++

        slugs = @items.slice(i, i+@section_limit)
        @createItems(slugs, "inner"+n)

      @selectedItem("#inner1")



