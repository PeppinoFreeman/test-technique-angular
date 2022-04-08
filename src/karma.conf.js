module.exports = (config) => {
    config.set({
        basePath: '/',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        //files: [
        //  { pattern: '../app/**/*.ts', included: true },
        //{ pattern: '**/*.ts', included: true }
        //],
        //...
    });
}