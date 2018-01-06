(function() {
    'use strict';

    angular
        .module('intelligentChartApp')
        .controller('PersonPopularityDialogController', PersonPopularityDialogController);

    PersonPopularityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'PersonPopularity', 'Person', 'PopularityType'];

    function PersonPopularityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, PersonPopularity, Person, PopularityType) {
        var vm = this;

        vm.personPopularity = entity;
        vm.clear = clear;
        vm.save = save;
                vm.people = [];
        vm.searchPersonWithKeyword = searchPersonWithKeyword;
        function searchPersonWithKeyword(keyword) {

            if (keyword) {

                Person.loadAllByPersonName({
                    page: 0,
                    size: 10,
                    name: keyword
                }, onSuccess, onError);
            }

            function onSuccess(data) {
                vm.people = data;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }
        
        vm.popularitytypes = PopularityType.query({size: DEFAULT_HELPER_DATA_SOURCE_SIZE});

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.personPopularity.id !== null) {
                PersonPopularity.update(vm.personPopularity, onSaveSuccess, onSaveError);
            } else {
                PersonPopularity.save(vm.personPopularity, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('intelligentChartApp:personPopularityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
