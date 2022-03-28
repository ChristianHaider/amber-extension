'use strict';

module.exports = function (grunt) {
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('@ambers/sdk');

    var path = require('path'),
        helpers = require('@ambers/sdk').helpers;

    // Default task.
    grunt.registerTask('default', ['amdconfig:app', 'amberc:all']);
    grunt.registerTask('devel', ['amdconfig:app', 'requirejs:devel']);
    grunt.registerTask('deploy', ['amdconfig:app', 'requirejs:deploy']);

    var id = function (x) {
        return x
    };

    function mkDefine (deps, cb) {
        return "define(" + JSON.stringify(deps) + "," + cb + ");"
    }

    var cbRequireAndPromiseMain = function (require) {
        return new Promise(function (resolve, reject) {
            require(["app/main"], resolve, reject);
        });
    };

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // task configuration
        amberc: {
            options: {
                amber_dir: path.join(__dirname, "node_modules", "@ambers", "lang"),
                configFile: "config.js"
            },
            all: {
                src: ['src/AmberWebExtension.st'],
                amd_namespace: 'amber-amberwebextension',
                libraries: ['amber/web/Web', 'silk/Silk']
            }
        },

        amdconfig: {app: {dest: 'config.js'}},

        requirejs: {
            options: {
                mainConfigFile: "config.js",
                paths: {
                    "es6-promise/auto": "node_modules/es6-promise/dist/es6-promise.auto"
                },
                useStrict: true
            },
            deploy: {
                options: {
                    rawText: {
                        // "helios/index": "",
                        "app": mkDefine(["require", "es6-promise/auto"], cbRequireAndPromiseMain),
                        "app/main": mkDefine(["deploy", "amber/core/Platform-Browser","helios/all"], id)
                    },
                    pragmas: {
                        excludeIdeData: true,
                        excludeDebugContexts: true
                    },
                    include: ['config', 'node_modules/requirejs/require', 'app', 'app/main'],
                    findNestedDependencies: true,
                    // exclude: ['helios/index'],
                    optimize: "none",
                    out: "theExtension.js"
                }
            },
            devel: {
                options: {
                    rawText: {
                        "app": mkDefine(["require", "es6-promise/auto"], cbRequireAndPromiseMain),
                        "app/main": mkDefine(["devel", "amber/core/Platform-Browser", "helios/all"], id)
                    },
                    include: ['config', 'node_modules/requirejs/require', 'app', 'app/main'],
                    exclude: ['devel', 'amber/core/Platform-Browser'],
                    out: "the.js"
                }
            }
        }
    });

};
