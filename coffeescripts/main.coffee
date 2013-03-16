
bannerHidden = false
smallScreen = false

$(document).ready ->

  smallScreen = ()->
    Modernizr.mq("(max-width: 767px)")

  ###
  # Menu Manager
  ###

  ###
  $("html, body").animate {
    scrollTop: 0
  }, {druation: 3000, easing: "easeInOutQuad"}
  ###

  $("#feedback").on 'click', 'a', ->
    if _gaq != "undefined" and _gaq
      _gaq.push(['_trackEvent', 'Feedback', 'Click'])

  $("#main_menu ul a").click (e)->

    link = $(this).attr("href")
    target = $(link)

    topFix = 0

    if bannerHidden
      topFix = 98
    else
      topFix = 248

    if smallScreen()
      topFix = 53

    offset = 0

    if target.hasClass("attach_arrow_green") || target.hasClass("attach_arrow_black") || target.hasClass("attach_arrow_white")
      offset = 35

    if _gaq
      _gaq.push(['_trackPageview', "/#{link}"])


    $("html, body").animate {
      scrollTop: target.offset().top - topFix + offset
    }, {druation: 3000, easing: "easeInOutQuad"}

    if smallScreen()
      $("#main_menu ul").toggle("fast")

    e.preventDefault();

  $("#main_menu h2 a").click (e) ->
    $("#main_menu ul").toggle("fast")

    e.preventDefault();

  ###
  # Google Maps
  ###

  mapCenter = new google.maps.LatLng(25.014218,121.54065)

  mapCanvas = $("#map_canvas")

  mapOptions= {
    center: mapCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    scrollwheel: false,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    },
    zoom: 16
  }

  mapCanvas.width('100%')
  mapCanvas.height(400)

  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions)
  mapMarker = new google.maps.Marker({
    position: mapCenter,
    map: map,
    icon: 'images/location_pin.png'
  })

###
# Scroll Menu
###

scrollTimeout = null

$(window).scroll (e)->
  curTop = $("body").scrollTop() || $("html").scrollTop()

  maxScroll = $("body").outerHeight() - $(window).outerHeight() - 1 # Fix Last Menu

  topFix = 0

  clearTimeout(scrollTimeout)

  scrollTimeout = setTimeout (()->
    if !smallScreen()
      if curTop > 250
        bannerHidden = hideBanner()
      else
        bannerHidden = showBanner()

  ),100

  if curTop >= maxScroll
    $("#main_menu ul a").each (i, el)->
      $(el).removeClass("active")

    $("#main_menu ul a:last").addClass("active")
    return

  if bannerHidden
    topFix = 100
  else
    topFix = 250

  $("#main_menu ul a").each (i, el)->
    link = $(el).attr("href")

    if link.indexOf("#") > -1
      target = $(link)
      offsetTop = Math.floor(target.offset().top) - topFix
      height = $(target).outerHeight()

      if (curTop >= offsetTop) and (curTop < (offsetTop + height))
        $(el).addClass("active")
      else
        $(el).removeClass("active")

hideBanner = ->
  if !bannerHidden
    ###
    $("body").animate {
      'paddingTop': 100
    }, {duration: 1000, easing: "easeInOutQuad"}
    $("header[role=header]").animate {
      'height': 100
    }, {duration: 1000, easing: "easeOutQuad"}
    $("header[role=header] h1").animate {
      height: 0,
      opacity: 0
    }, {duration: 1000, easing: "easeOutQuad"}
    ###

    $("body").addClass("close")
    $("header[role=header]").addClass("close")

  return true

showBanner = ->
  if bannerHidden
    ###
    $("body").animate {
      'paddingTop': 250
    }, {duration: 1000, easing: "easeInOutQuad"}
    $("header[role=header]").animate {
      height: 250
    }, {duration: 1000, easing: "easeInQuad"}
    $("header[role=header] h1").animate {
      height: 150,
      opacity: 1
    }, {duration: 1000, easing: "easeInQuad"}
    ###

    $("body").removeClass("close")
    $("header[role=header]").removeClass("close")

  return false

