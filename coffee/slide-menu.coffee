mask = document.createElement("div")
mask.className = "mask"
activeNav = "sml-open"
  
jQuery.fn.exists = -> jQuery(this).length > 0

closeMenu = ->
  $("body").removeClass(activeNav)
  $(".mask").remove()
  console.log("Closing menu at #{Date.now()}")

addHamburgerIcon = (selector = ".slide-menu-icon", addToSelector = ".slide-menu") ->
  if not $(selector).exists()
    if not $(addToSelector).exists()
      console.error("Could not add hamburger icon")
    selectorClassName = selector.slice(1)
    html = "<button class=\"toggle-switch toggle-switch__htla #{selectorClassName}\"><span>toggle menu</span></button>"
    # Add the toggle menu before the actual navigation item so it's
    # still visible
    $(addToSelector).before(html)
    # Push the slide nav down by the height of the button
    $(addToSelector).css("top",$(selector).height())
  $(selector).click ->
    $(this).toggleClass("active")
    if $(this).hasClass("close-menu")
      closeMenu()
    else
      $("body").addClass(activeNav)
      # document.body.appendChild(mask)
    $(this).toggleClass("close-menu")
  false

$ ->
  addHamburgerIcon()
  $(".mask").click ->
    closeMenu()
  $(".close-menu").click ->
    closeMenu()
  $(".close-menu-sr").click ->
    closeMenu()
  console.log("Finished setting up slider.")
