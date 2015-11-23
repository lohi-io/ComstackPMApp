module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'http-server': {
            dev: {
              root: '',
              port: 8000,
              host: '127.0.0.1',
              cache: -1,
              runInBackground: true
            }
        },
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
                    'app/html/**/*.html',
                    'app/js/**/*.js',
                    'specs/**/*.js',
                    '!app/js/ComstackPMApp.js'
                ],
                tasks: ['karma:unitbg:run', 'ngtemplates', 'uglify']
            },
            grunt: {
                files: ['gruntfile.js']
            }
        },

        ngtemplates: {
          ComstackPMApp: {
            cwd: 'app',
            src: 'html/**/*.html',
            dest: 'app/js/ComstackPMAppTpls.js'
          }
        },

        uglify: {
          app: {
            src: [
              'app/js/app.js',
              'app/js/ComstackPMAppTpls.js',
              'app/js/providers/ConfigurationServiceProvider.js',
              'app/js/directives/01_bootstrap.js',
              'app/js/directives/EmojiDirective.js',
              'app/js/directives/DynamicScrollDirective.js',
              'app/js/directives/CtrlEnterDirective.js',
              'app/js/filters/SquishFilter.js',
              'app/js/filters/HtmlSafeFilter.js',
              'app/js/filters/TruncateFilter.js',
              'app/js/filters/DateFromNowFilter.js',
              'app/js/filters/FormatDateFilter.js',
              'app/js/controllers/HomeController.js',
              'app/js/controllers/InboxController.js',
              'app/js/controllers/ConversationController.js',
              'app/js/controllers/MessageController.js',
              'app/js/controllers/DeleteConversationController.js',
              'app/js/controllers/ReportConversationController.js',
              'app/js/controllers/BlockUserController.js',
              'app/js/controllers/UnblockUserController.js',
              'app/js/controllers/ErrorController.js',
              'app/js/services/01_bootstrap.js',
              'app/js/services/UserService.js',
              'app/js/services/ConversationService.js',
              'app/js/services/DeleteConversationState.js',
              'app/js/services/ReportConversationState.js',
              'app/js/services/ErrorState.js',
              'app/js/services/BlockUserState.js',
              'app/js/services/UnblockUserState.js',
              'app/js/services/InterceptorService.js',
              'app/js/services/MessageService.js',
              'app/js/services/PollerRegistrationService.js'
            ],
            dest:'app/js/ComstackPMApp.js'
          }
      }
    });
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('default', ['http-server:dev','ngtemplates','uglify', 'watch']);
};
