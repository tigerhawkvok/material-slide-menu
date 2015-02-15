
addHamburgerIcon = (selector = ".menu-icon", addToSelector = ".slide-menu") ->
  if not $(selector).exists()
    selectorClassName = selector.slice(1)
    html = "<button class=\"toggle-switch toggle-switch__htla #{selectorClassName}\"><span>toggle menu</span></button>"
    # Add the toggle menu before the actual navigation item so it's
    # still visible
    $(addToSelector).before(html)
  $(selector).click ->
    $(this).toggleClass("active")
  false

$ ->
  activeNav = ""
  mask = document.createElement("div")
  mask.className = "mask"
  addHamburgerIcon()
  $(".slide-menu").click ->
    $("body").addClass("sm-open")
    document.body.appendChild(mask)
    activeNav = "sml-open"
  closeMenu = ->
    $("body").removeClass(activeNav)
    activeNav = ""
    document.body.removeChild(mask)    
  $(".mask").click ->
    closeMenu()
  $(".close-menu").click ->
    closeMenu()
