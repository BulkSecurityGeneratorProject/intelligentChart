var DEFAULT_HELPER_DATA_SOURCE_SIZE = 5000;
(function() {
    'use strict';

    angular
        .module('intelligentChartApp', [
            'ngStorage',
            'tmh.dynamicLocale',
            'pascalprecht.translate',
            'ngResource',
            'ngCookies',
            'ngAria',
            'ngCacheBuster',
            'ngFileUpload',
            'ui.bootstrap',
            'ui.bootstrap.datetimepicker',
            'ui.router',
            'infinite-scroll',
            // jhipster-needle-angularjs-add-module JHipster will add new module here
            'angular-loading-bar',
            'angular-echarts',
            'ngAside',
            'angular.filter',
            'ngLodash',
            'angular-d3-word-cloud',
            'ui.select',
            'nvd3'
        ])
        .run(run);

    run.$inject = ['stateHandler', 'translationHandler'];

    function run(stateHandler, translationHandler) {
        stateHandler.initialize();
        translationHandler.initialize();
    }
})();
