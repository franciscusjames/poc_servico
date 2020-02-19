'use strict';

const gulp = require('gulp');
var shell = require('gulp-shell');

class CustomOffline {

    constructor(serverless, options) {

        this.serverless = serverless;
        this.options = options;

        this.commands = {

            offline: {
                lifecycleEvents: [
                    'start'
                ]
            }
        }

        this.hooks = {
            'before:offline:start': this.copyOtherFiles,
            'offline:start': this.watch
        }
    }

    copyOtherFiles() {
        
        shell.task('tsc')();
        shell.task('gulp copy')();
    }

    watch() {

        shell.task('gulp ts:watch')();
    }
}

module.exports = CustomOffline;