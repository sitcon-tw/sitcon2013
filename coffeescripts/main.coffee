
bannerHidden = false

$(document).ready ->

  ###
  # Menu Manager
  ###

  ###
  $("html, body").animate {
    scrollTop: 0
  }, {druation: 3000, easing: "easeInOutQuad"}
  ###

  $("#main_menu a").click (e)->

    target = $($(this).attr("href"))

    topFix = 0

    if bannerHidden
      topFix = 98
    else
      topFix = 248

    offset = 0

    if target.hasClass("attach_arrow_green") || target.hasClass("attach_arrow_black") || target.hasClass("attach_arrow_white")
      offset = 35

    $("html, body").animate {
      scrollTop: target.offset().top - topFix + offset
    }, {druation: 3000, easing: "easeInOutQuad"}

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
    icon: '../images/location_pin.png'
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
    if curTop > 250
      bannerHidden = hideBanner()
    else
      bannerHidden = showBanner()

  ),100

  if curTop >= maxScroll
    $("#main_menu a").each (i, el)->
      $(el).removeClass("active")

    $("#main_menu a:last").addClass("active")
    return

  if bannerHidden
    topFix = 100
  else
    topFix = 250

  $("#main_menu a").each (i, el)->
    target = $($(el).attr("href"))
    offsetTop = Math.floor(target.offset().top) - topFix
    height = $(target).outerHeight()

    if (curTop >= offsetTop) and (curTop < (offsetTop + height))
      $(el).addClass("active")
    else
      $(el).removeClass("active")

hideBanner = ->
  if !bannerHidden
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

  return true

showBanner = ->
  if bannerHidden
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

  return false

