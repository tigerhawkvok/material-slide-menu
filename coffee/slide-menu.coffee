mask = document.createElement("div")
mask.className = "mask"
activeNav = "sml-open"
inactiveColor = ""
activeColor = ""

isEmpty = (str) -> not str or str.length is 0

isBlank = (str) -> not str or /^\s*$/.test(str)

isNull = (str) ->
  try
    if isEmpty(str) or isBlank(str) or not str?
      unless str is false or str is 0 then return true
  catch e
    return false
  false
isNumber = (n) -> not isNaN(parseFloat(n)) and isFinite(n)
toInt = (str) ->
  if not isNumber(str) or isNull(str) then return 0
  parseInt(str)
toFloat = (str) ->
  if not isNumber(str) or isNull(str) then return 0
  parseFloat(str)
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
    inactiveColor = $(addToSelector).attr("data-button-inactive-color")
    activeColor = $(addToSelector).attr("data-button-active-color")
    scale = toFloat($(addToSelector).attr("data-scale"))
    menuWidth = $(addToSelector).attr("data-width")
    if isNull(menuWidth)
      menuWidth = "300px"
    style = "<style type='text/css'>#{addToSelector} {width: #{menuWidth}; left:-#{menuWidth};}</style>"
    $(addToSelector).before(style)
    if isNumber(scale) and scale > 0
      height = 96*scale
      width = 108*scale
      $(selector)
      .css("background-color",activeColor)
      .css("height","#{height}px")
      .css("width","#{width}px")
      top = 45*scale
      lr = 18*scale
      translateX = "#{42*scale}px"
      translateY = "#{3*scale}px"
      height = "#{6*scale}px"
      $("#{selector} span")
      .css("top",top)
      .css("left",lr)
      .css("right",lr)
      .css("height",height)
      style = "<style type='text/css'>.toggle-switch span::before {top: -#{27*scale}px;height:#{height};} .toggle-switch span::after {bottom: -#{27*scale}px;height:#{height};}.toggle-switch__htla.active span::before {top: 0; -webkit-transform: translateX(#{translateX}) translateY(#{translateY}) rotate(45deg); -ms-transform: translateX(#{translateX}) translateY(#{translateY}) rotate(45deg); transform: translateX(#{translateX}) translateY(#{translateY}) rotate(45deg);} .toggle-switch__htla.active span::after {bottom: 0; -webkit-transform: translateX(#{translateX}) translateY(-#{translateY}) rotate(-45deg); -ms-transform: translateX(#{translateX}) translateY(-#{translateY}) rotate(-45deg); transform: translateX(#{translateX}) translateY(-#{translateY}) rotate(-45deg);}</style>"
      $(addToSelector).prepend(style)
    offsetMenu(selector,addToSelector)
  $(selector).click ->
    $(this).toggleClass("active")
    if $(this).hasClass("active")
      $(this).css("background-color",activeColor)
    else
      $(this).css("background-color",inactiveColor)
    if $(this).hasClass("close-menu")
      closeMenu()
    else
      $("body").addClass(activeNav)
      # document.body.appendChild(mask)
    $(this).toggleClass("close-menu")
  false

setupSlider = (selector = ".slide-menu-icon", addToSelector = ".slide-menu") ->
  addHamburgerIcon(selector,addToSelector)
  $(".mask").click ->
    closeMenu()
  $(".close-menu").click ->
    closeMenu()
  $(".close-menu-sr").click ->
    closeMenu()
  console.log("Finished setting up slider.")

window.offsetMenu = (selector = ".slide-menu-icon",menuSelector = ".slide-menu") ->
  # Push the slide nav down by the height of the button
  offset = $(selector).position().top + $(selector).height()
  $(menuSelector).css("top",offset)


$ ->
  setupSlider()
