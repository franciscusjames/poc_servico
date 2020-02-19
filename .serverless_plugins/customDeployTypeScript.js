'use strict';

const gulp = require('gulp');
var shell = require('gulp-shell');

class CustomDeployTypeScript {

    constructor(serverless, options) {

        this.serverless = serverless;
        this.options = options;

        this.commands = {

            deploy: {
                lifecycleEvents: [
                    'resources'
                ]
            }
        }

        this.hooks = {
            'before:deploy:resources': this.copyOtherFiles
        }
    }

    copyOtherFiles() {

        shell.task('tsc')();
        shell.task('gulp copy')();
    }
}

module.exports = CustomDeployTypeScript;