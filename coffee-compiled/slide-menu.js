var activeNav, addHamburgerIcon, closeMenu, mask;

mask = document.createElement("div");

mask.className = "mask";

activeNav = "sml-open";

jQuery.fn.exists = function() {
  return jQuery(this).length > 0;
};

closeMenu = function() {
  $("body").removeClass(activeNav);
  $(".mask").remove();
  return console.log("Closing menu at " + (Date.now()));
};

addHamburgerIcon = function(selector, addToSelector) {
  var html, selectorClassName;
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
    $(addToSelector).css("top", $(selector).height());
  }
  $(selector).click(function() {
    $(this).toggleClass("active");
    if ($(this).hasClass("close-menu")) {
      closeMenu();
    } else {
      $("body").addClass(activeNav);
    }
    return $(this).toggleClass("close-menu");
  });
  return false;
};

$(function() {
  addHamburgerIcon();
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
});

//# sourceMappingURL=../dist/maps/slide-menu.js.map
