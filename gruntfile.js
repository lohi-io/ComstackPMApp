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
                    'specs/**/*.js'
                ],
                tasks: ['karma:unitbg:run']
            },
            grunt: {
                files: ['gruntfile.js']
            }
        }
    });
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('default', ['karma:unitbg','watch']);

};