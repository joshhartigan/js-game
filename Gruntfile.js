module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    concat: {
      dist: {
        src: [
          "js/utils.js",
          "js/monster.js",
          "js/game.js"
        ],
        dest: "js/build/js-game.js"
      }
    },

    uglify: {
      build: {
        src: "js/build/js-game.js",
        dest: "js/build/js-game.min.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");

  grunt.registerTask("default", ["concat", "uglify"]);
}
