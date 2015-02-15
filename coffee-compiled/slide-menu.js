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
  var height, html, lr, scale, selectorClassName, style, top, translateX, translateY, width;
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
    if (isNumber(scale)) {
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
    $(addToSelector).css("top", $(selector).height() + 5);
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

$(function() {
  return setupSlider();
});

//# sourceMappingURL=../dist/maps/slide-menu.js.map
