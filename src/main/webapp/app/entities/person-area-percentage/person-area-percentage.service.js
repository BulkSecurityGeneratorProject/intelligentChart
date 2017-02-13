(function() {
    'use strict';
    angular
        .module('intelligentChartApp')
        .factory('PersonAreaPercentage', PersonAreaPercentage);

    PersonAreaPercentage.$inject = ['$resource'];

    function PersonAreaPercentage ($resource) {
        var resourceUrl =  'api/person-area-percentages/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' },
            'loadAllByPersonId' : {
                method: 'GET',
                isArray: true,
                url: 'api/person-area-percentages/person/:id',
                params: { id : '@id'}
            }
        });
    }
})();