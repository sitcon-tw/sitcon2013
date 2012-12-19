(function() {
  var bannerHidden, hideBanner, scrollTimeout, showBanner;

  bannerHidden = false;

  $(document).ready(function() {
    /*
      # Menu Manager
    */

    /*
      $("html, body").animate {
        scrollTop: 0
      }, {druation: 3000, easing: "easeInOutQuad"}
    */

    var map, mapCanvas, mapCenter, mapMarker, mapOptions;
    $("#main_menu a").click(function(e) {
      var offset, target, topFix;
      target = $($(this).attr("href"));
      topFix = 0;
      if (bannerHidden) {
        topFix = 98;
      } else {
        topFix = 248;
      }
      offset = 0;
      if (target.hasClass("attach_arrow_green") || target.hasClass("attach_arrow_black") || target.hasClass("attach_arrow_white")) {
        offset = 35;
      }
      $("html, body").animate({
        scrollTop: target.offset().top - topFix + offset
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


  scrollTimeout = null;

  $(window).scroll(function(e) {
    var curTop, maxScroll, topFix;
    curTop = $("body").scrollTop() || $("html").scrollTop();
    maxScroll = $("body").outerHeight() - $(window).outerHeight() - 1;
    topFix = 0;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout((function() {
      if (curTop > 250) {
        return bannerHidden = hideBanner();
      } else {
        return bannerHidden = showBanner();
      }
    }), 100);
    if (curTop >= maxScroll) {
      $("#main_menu a").each(function(i, el) {
        return $(el).removeClass("active");
      });
      $("#main_menu a:last").addClass("active");
      return;
    }
    if (bannerHidden) {
      topFix = 100;
    } else {
      topFix = 250;
    }
    return $("#main_menu a").each(function(i, el) {
      var height, offsetTop, target;
      target = $($(el).attr("href"));
      offsetTop = Math.floor(target.offset().top) - topFix;
      height = $(target).outerHeight();
      if ((curTop >= offsetTop) && (curTop < (offsetTop + height))) {
        return $(el).addClass("active");
      } else {
        return $(el).removeClass("active");
      }
    });
  });

  hideBanner = function() {
    if (!bannerHidden) {
      $("body").animate({
        'paddingTop': 100
      }, {
        duration: 1000,
        easing: "easeInOutQuad"
      });
      $("header[role=header]").animate({
        'height': 100
      }, {
        duration: 1000,
        easing: "easeOutQuad"
      });
      $("header[role=header] h1").animate({
        height: 0,
        opacity: 0
      }, {
        duration: 1000,
        easing: "easeOutQuad"
      });
    }
    return true;
  };

  showBanner = function() {
    if (bannerHidden) {
      $("body").animate({
        'paddingTop': 250
      }, {
        duration: 1000,
        easing: "easeInOutQuad"
      });
      $("header[role=header]").animate({
        height: 250
      }, {
        duration: 1000,
        easing: "easeInQuad"
      });
      $("header[role=header] h1").animate({
        height: 150,
        opacity: 1
      }, {
        duration: 1000,
        easing: "easeInQuad"
      });
    }
    return false;
  };

}).call(this);
