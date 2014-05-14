module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            options: {
                atBegin: true
            },
            test: {
                files: ['index.js', 'tests/*'],
                tasks: ["test"]
            },
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['tests/*.js']
            },
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['*.js', 'tests/*.js'],
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['mochaTest', 'jshint']);
    grunt.registerTask('default', ['test']);
};
