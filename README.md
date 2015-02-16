Slide Out Menu
================

Simply set up a `<nav>` element with the class `menu slide-menu`, then include the CSS and JS files in `dist/`, and you're set!

## Configuration

In the nav element, you can specify the following attributes:

- `data-button-active-color`: The active color on the hamburger button
- `data-button-inactive-color`: The inactive background color on the hamburger button
- `data-scale`: The relative sizing of the button. Default is 108px X 96px.


To have the slider not autoload, comment out the last line in `coffee/slide-menu.coffee` and type `grunt compile` at the command line.

To remove the top-level safety wrapper, change the `bare` keyword in the `Gruntfile` in `coffee:compile` to `true` before compiling.
