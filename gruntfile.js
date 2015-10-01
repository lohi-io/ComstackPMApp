module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unitbg: {
                configFile: 'karma.conf.js',
                background: true,
                autoWatch: false,
                singleRun: false
            },
            unit: {
                configFile: 'karma.conf.js',
                background: false,
                autoWatch: false,
                singleRun: true
            }
        },
        watch: {
            js: {
                files: [
                    'app/js/**/*.js',
                    'specs/**/*.js',
                    '!app/js/ComstackPMApp.js'
                ],
                tasks: ['karma:unitbg:run', 'uglify']
            },
            grunt: {
                files: ['gruntfile.js']
            }
        },
        uglify: {
          app: {
            src: [
              'app/js/app.js',
              'app/js/providers/ConfigurationServiceProvider.js',
              'app/js/filters/HtmlSafeFilter.js',
              'app/js/filters/TruncateFilter.js',
              'app/js/filters/DateFromNowFilter.js',
              'app/js/filters/FormatDateFilter.js',
              'app/js/controllers/HomeController.js',
              'app/js/controllers/InboxController.js',
              'app/js/controllers/ConversationController.js',
              'app/js/services/01_bootstrap.js',
              'app/js/services/AuthenticationService.js',
              'app/js/services/UserService.js',
              'app/js/services/ConversationService.js'
            ],
            dest:'app/js/ComstackPMApp.js'
          }
      }
    });
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('default', ['karma:unitbg','uglify', 'watch']);

};
