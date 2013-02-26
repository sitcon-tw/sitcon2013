(function() {
  var bannerHidden, hideBanner, scrollTimeout, showBanner, smallScreen;

  bannerHidden = false;

  smallScreen = false;

  $(document).ready(function() {
    var map, mapCanvas, mapCenter, mapMarker, mapOptions;
    smallScreen = function() {
      return Modernizr.mq("(max-width: 767px)");
    };
    /*
      # Menu Manager
    */

    /*
      $("html, body").animate {
        scrollTop: 0
      }, {druation: 3000, easing: "easeInOutQuad"}
    */

    $("#main_menu ul a").click(function(e) {
      var link, offset, target, topFix;
      link = $(this).attr("href");
      target = $(link);
      topFix = 0;
      if (bannerHidden) {
        topFix = 98;
      } else {
        topFix = 248;
      }
      if (smallScreen()) {
        topFix = 53;
      }
      offset = 0;
      if (target.hasClass("attach_arrow_green") || target.hasClass("attach_arrow_black") || target.hasClass("attach_arrow_white")) {
        offset = 35;
      }
      if (_gaq) {
        _gaq.push(['_trackPageview', "/" + link]);
      }
      $("html, body").animate({
        scrollTop: target.offset().top - topFix + offset
      }, {
        druation: 3000,
        easing: "easeInOutQuad"
      });
      if (smallScreen()) {
        $("#main_menu ul").toggle("fast");
      }
      return e.preventDefault();
    });
    $("#main_menu h2 a").click(function(e) {
      $("#main_menu ul").toggle("fast");
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
      icon: 'images/location_pin.png'
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
      if (!smallScreen()) {
        if (curTop > 250) {
          return bannerHidden = hideBanner();
        } else {
          return bannerHidden = showBanner();
        }
      }
    }), 100);
    if (curTop >= maxScroll) {
      $("#main_menu ul a").each(function(i, el) {
        return $(el).removeClass("active");
      });
      $("#main_menu ul a:last").addClass("active");
      return;
    }
    if (bannerHidden) {
      topFix = 100;
    } else {
      topFix = 250;
    }
    return $("#main_menu ul a").each(function(i, el) {
      var height, link, offsetTop, target;
      link = $(el).attr("href");
      if (link.indexOf("#") > -1) {
        target = $(link);
        offsetTop = Math.floor(target.offset().top) - topFix;
        height = $(target).outerHeight();
        if ((curTop >= offsetTop) && (curTop < (offsetTop + height))) {
          return $(el).addClass("active");
        } else {
          return $(el).removeClass("active");
        }
      }
    });
  });

  hideBanner = function() {
    if (!bannerHidden) {
      /*
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
      */

      $("body").addClass("close");
      $("header[role=header]").addClass("close");
    }
    return true;
  };

  showBanner = function() {
    if (bannerHidden) {
      /*
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
      */

      $("body").removeClass("close");
      $("header[role=header]").removeClass("close");
    }
    return false;
  };

}).call(this);
