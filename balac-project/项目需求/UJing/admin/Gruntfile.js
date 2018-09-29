module.exports = function (grunt) {
  "use strict";

  require('time-grunt')(grunt)
  require('jit-grunt')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    nodemon: {
      dev: {
        script: "server.js",
        options: {
          ignore: ["README.md", "node_modules/**", ".DS_Store", "public"],
          ext: "js",
          watch: ["app", "public", "server.js", "Gruntfile.js", "package.json"],
          delayTime: 1,
          env: {
            PORT: process.env.PORT || 3001
          },
          cwd: __dirname
        }
      }
    },
    concurrent: {
      watch: [
        "nodemon"
      ],
      options: {
        logConcurrentOutput: true
      }
    },
    clean: {
      dev: ["public/js/apps.js", "public/js/bootstrap.js"],
      build: ["public/assets/*"]
    }
  });
  grunt.registerTask("default", [ "concurrent:watch"]);
};
