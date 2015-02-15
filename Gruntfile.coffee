module.exports = (grunt) ->
  # Gruntfile
  # https://github.com/sindresorhus/grunt-shell
  grunt.loadNpmTasks("grunt-shell")
  # https://www.npmjs.com/package/grunt-contrib-coffee
  grunt.loadNpmTasks("grunt-contrib-coffee")
  # https://github.com/gruntjs/grunt-contrib-watch
  grunt.loadNpmTasks("grunt-contrib-watch")
  grunt.loadNpmTasks("grunt-contrib-uglify")
  # https://github.com/mathiasbynens/grunt-yui-compressor
  # May end up porting to https://github.com/gruntjs/grunt-contrib-uglify
  grunt.loadNpmTasks('grunt-yui-compressor')
  # https://www.npmjs.com/package/grunt-phplint
  grunt.loadNpmTasks("grunt-phplint");
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    uglify:
      options:
        mangle:
          except:['jQuery']
        screwIE8: true
        compress:
          drop_console: false
      dist:
        options:
          sourceMap:true
          sourceMapIncludeSources:true
          sourceMapName: "dist/maps/dist.map"
          sourceMapIn: "dist/maps/slide-menu.map"
        files:
          "dist/slide-menu.min.js":"coffee-compiled/slide-menu.js"
    cssmin:
      dist:
        src:["slide-menu.css"]
        dest:"dist/slide-menu.min.css"
    coffee:
      compile:
        options:
          bare: false
          sourceMapDir: "dist/maps"
          sourceMap: true
        files: [
          expand: true
          flatten: true
          cwd: "coffee"
          src: "*.coffee"
          dest: "coffee-compiled/"
          ext: ".js"
          ]
    watch:
      scripts:
        files: ["coffee/*.coffee"]
        tasks: ["coffee:compile","uglify:dist"]
      styles:
        files: ["*.css"]
        tasks: ["cssmin"]
  grunt.registerTask("default",["watch"])
  grunt.registerTask("compile","Compile coffeescript and minify CSS",["coffee:compile","uglify:dist","cssmin"])
