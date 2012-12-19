
$(document).ready ->

  ###
  # Menu Manager
  ###

  $("#main_menu a").click (e)->

    target = $($(this).attr("href"))

    offset = 0

    if target.hasClass("attach_arrow_green") || target.hasClass("attach_arrow_black") || target.hasClass("attach_arrow_white")
      offset = 35

    $("html, body").animate {
      scrollTop: target.offset().top - 298 + offset;
    }, {druation: 3000, easing: "easeInOutQuad"}

    e.preventDefault();


