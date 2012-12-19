
$(document).ready ->

  ###
  # Menu Manager
  ###

  $("html, body").animate {
    scrollTop: 0
  }, {druation: 3000, easing: "easeInOutQuad"}

  $("#main_menu a").click (e)->

    target = $($(this).attr("href"))

    offset = 0

    if target.hasClass("attach_arrow_green") || target.hasClass("attach_arrow_black") || target.hasClass("attach_arrow_white")
      offset = 35

    $("html, body").animate {
      scrollTop: target.offset().top - 248 + offset
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
  mapMarker = new google.maps.Marker({position: mapCenter, map: map, icon: '../images/location_pin.png'})

###
# Scroll Menu
###

$(window).scroll (e)->
  curTop = $("body").scrollTop()

  $("#main_menu a").each (i, el)->
    target = $($(el).attr("href"))
    offsetTop = Math.floor(target.offset().top) - 250
    height = $(target).outerHeight()

    if (curTop >= offsetTop) and (curTop < (offsetTop + height))
      $(el).addClass("active")
    else
      $(el).removeClass("active")

