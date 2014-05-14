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
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', ['mochaTest']);
    grunt.registerTask('default', ['test']);
};
