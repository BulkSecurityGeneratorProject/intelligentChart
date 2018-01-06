(function() {
    'use strict';

    angular
        .module('intelligentChartApp')
        .controller('PersonLawBusinessDialogController', PersonLawBusinessDialogController);

    PersonLawBusinessDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'PersonLawBusiness', 'Person', 'LawBusinessType'];

    function PersonLawBusinessDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, PersonLawBusiness, Person, LawBusinessType) {
        var vm = this;

        vm.personLawBusiness = entity;
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
        
        vm.lawbusinesstypes = LawBusinessType.query({size: DEFAULT_HELPER_DATA_SOURCE_SIZE});

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.personLawBusiness.id !== null) {
                PersonLawBusiness.update(vm.personLawBusiness, onSaveSuccess, onSaveError);
            } else {
                PersonLawBusiness.save(vm.personLawBusiness, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('intelligentChartApp:personLawBusinessUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
