(function() {
    'use strict';

    angular
        .module('intelligentChartApp')
        .controller('PersonEducationBackgroundDialogController', PersonEducationBackgroundDialogController);

    PersonEducationBackgroundDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'PersonEducationBackground', 'EducationBackgroundType', 'Person'];

    function PersonEducationBackgroundDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, PersonEducationBackground, EducationBackgroundType, Person) {
        var vm = this;

        vm.personEducationBackground = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.educationbackgroundtypes = EducationBackgroundType.query({size: DEFAULT_HELPER_DATA_SOURCE_SIZE});
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

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.personEducationBackground.id !== null) {
                PersonEducationBackground.update(vm.personEducationBackground, onSaveSuccess, onSaveError);
            } else {
                PersonEducationBackground.save(vm.personEducationBackground, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('intelligentChartApp:personEducationBackgroundUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.startDate = false;
        vm.datePickerOpenStatus.endDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
