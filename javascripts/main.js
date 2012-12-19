(function() {

  $(document).ready(function() {
    /*
      # Menu Manager
    */

    var map, mapCanvas, mapCenter, mapMarker, mapOptions;
    $("html, body").animate({
      scrollTop: 0
    }, {
      druation: 3000,
      easing: "easeInOutQuad"
    });
    $("#main_menu a").click(function(e) {
      var offset, target;
      target = $($(this).attr("href"));
      offset = 0;
      if (target.hasClass("attach_arrow_green") || target.hasClass("attach_arrow_black") || target.hasClass("attach_arrow_white")) {
        offset = 35;
      }
      $("html, body").animate({
        scrollTop: target.offset().top - 248 + offset
      }, {
        druation: 3000,
        easing: "easeInOutQuad"
      });
      return e.preventDefault();
    });
    /*
      # Google Maps
    */

    mapCenter = new google.maps.LatLng(25.014218, 121.54065);
    mapCanvas = $("#map_canvas");
    mapOptions = {
      center: mapCenter,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      scrollwheel: false,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
      },
      zoom: 16
    };
    mapCanvas.width('100%');
    mapCanvas.height(400);
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    return mapMarker = new google.maps.Marker({
      position: mapCenter,
      map: map,
      icon: '../images/location_pin.png'
    });
  });

  /*
  # Scroll Menu
  */


  $(window).scroll(function(e) {
    var curTop;
    curTop = $("body").scrollTop();
    return $("#main_menu a").each(function(i, el) {
      var height, offsetTop, target;
      target = $($(el).attr("href"));
      offsetTop = Math.floor(target.offset().top) - 250;
      height = $(target).outerHeight();
      if ((curTop >= offsetTop) && (curTop < (offsetTop + height))) {
        return $(el).addClass("active");
      } else {
        return $(el).removeClass("active");
      }
    });
  });

}).call(this);
