(function() {
  var activeColor, activeNav, addHamburgerIcon, closeMenu, inactiveColor, isBlank, isEmpty, isNull, isNumber, mask, setupSlider, toFloat, toInt;

  mask = document.createElement("div");

  mask.className = "mask";

  activeNav = "sml-open";

  inactiveColor = "";

  activeColor = "";

  isEmpty = function(str) {
    return !str || str.length === 0;
  };

  isBlank = function(str) {
    return !str || /^\s*$/.test(str);
  };

  isNull = function(str) {
    var e;
    try {
      if (isEmpty(str) || isBlank(str) || (str == null)) {
        if (!(str === false || str === 0)) {
          return true;
        }
      }
    } catch (_error) {
      e = _error;
      return false;
    }
    return false;
  };

  isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  toInt = function(str) {
    if (!isNumber(str) || isNull(str)) {
      return 0;
    }
    return parseInt(str);
  };

  toFloat = function(str) {
    if (!isNumber(str) || isNull(str)) {
      return 0;
    }
    return parseFloat(str);
  };

  jQuery.fn.exists = function() {
    return jQuery(this).length > 0;
  };

  closeMenu = function() {
    $("body").removeClass(activeNav);
    $(".mask").remove();
    return console.log("Closing menu at " + (Date.now()));
  };

  addHamburgerIcon = function(selector, addToSelector) {
    var height, html, lr, menuWidth, scale, selectorClassName, style, top, translateX, translateY, width;
    if (selector == null) {
      selector = ".slide-menu-icon";
    }
    if (addToSelector == null) {
      addToSelector = ".slide-menu";
    }
    if (!$(selector).exists()) {
      if (!$(addToSelector).exists()) {
        console.error("Could not add hamburger icon");
      }
      selectorClassName = selector.slice(1);
      html = "<button class=\"toggle-switch toggle-switch__htla " + selectorClassName + "\"><span>toggle menu</span></button>";
      $(addToSelector).before(html);
      inactiveColor = $(addToSelector).attr("data-button-inactive-color");
      activeColor = $(addToSelector).attr("data-button-active-color");
      scale = toFloat($(addToSelector).attr("data-scale"));
      menuWidth = $(addToSelector).attr("data-width");
      if (isNull(menuWidth)) {
        menuWidth = "300px";
      }
      style = "<style type='text/css'>" + addToSelector + " {width: " + menuWidth + "; left:-" + menuWidth + ";}</style>";
      $(addToSelector).before(style);
      if (isNumber(scale) && scale > 0) {
        height = 96 * scale;
        width = 108 * scale;
        $(selector).css("background-color", activeColor).css("height", "" + height + "px").css("width", "" + width + "px");
        top = 45 * scale;
        lr = 18 * scale;
        translateX = "" + (42 * scale) + "px";
        translateY = "" + (3 * scale) + "px";
        height = "" + (6 * scale) + "px";
        $("" + selector + " span").css("top", top).css("left", lr).css("right", lr).css("height", height);
        style = "<style type='text/css'>.toggle-switch span::before {top: -" + (27 * scale) + "px;height:" + height + ";} .toggle-switch span::after {bottom: -" + (27 * scale) + "px;height:" + height + ";}.toggle-switch__htla.active span::before {top: 0; -webkit-transform: translateX(" + translateX + ") translateY(" + translateY + ") rotate(45deg); -ms-transform: translateX(" + translateX + ") translateY(" + translateY + ") rotate(45deg); transform: translateX(" + translateX + ") translateY(" + translateY + ") rotate(45deg);} .toggle-switch__htla.active span::after {bottom: 0; -webkit-transform: translateX(" + translateX + ") translateY(-" + translateY + ") rotate(-45deg); -ms-transform: translateX(" + translateX + ") translateY(-" + translateY + ") rotate(-45deg); transform: translateX(" + translateX + ") translateY(-" + translateY + ") rotate(-45deg);}</style>";
        $(addToSelector).prepend(style);
      }
      offsetMenu(selector, addToSelector);
    }
    $(selector).click(function() {
      $(this).toggleClass("active");
      if ($(this).hasClass("active")) {
        $(this).css("background-color", activeColor);
      } else {
        $(this).css("background-color", inactiveColor);
      }
      if ($(this).hasClass("close-menu")) {
        closeMenu();
      } else {
        $("body").addClass(activeNav);
      }
      return $(this).toggleClass("close-menu");
    });
    return false;
  };

  setupSlider = function(selector, addToSelector) {
    if (selector == null) {
      selector = ".slide-menu-icon";
    }
    if (addToSelector == null) {
      addToSelector = ".slide-menu";
    }
    addHamburgerIcon(selector, addToSelector);
    $(".mask").click(function() {
      return closeMenu();
    });
    $(".close-menu").click(function() {
      return closeMenu();
    });
    $(".close-menu-sr").click(function() {
      return closeMenu();
    });
    return console.log("Finished setting up slider.");
  };

  window.offsetMenu = function(selector, menuSelector) {
    var offset;
    if (selector == null) {
      selector = ".slide-menu-icon";
    }
    if (menuSelector == null) {
      menuSelector = ".slide-menu";
    }
    offset = $(selector).position().top + $(selector).height();
    return $(menuSelector).css("top", offset);
  };

  $(function() {
    var e;
    if ($(".slide-menu").exists()) {
      try {
        return setupSlider();
      } catch (_error) {
        e = _error;
        return console.error("Couldn't set up slider!! " + e.message);
      }
    } else {
      return console.warn("Not setting up slider - .slide-menu doesn't exist");
    }
  });

}).call(this);

//# sourceMappingURL=../dist/maps/slide-menu.js.map
