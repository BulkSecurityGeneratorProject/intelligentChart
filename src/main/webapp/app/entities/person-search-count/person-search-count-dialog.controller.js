(function() {
    'use strict';

    angular
        .module('intelligentChartApp')
        .controller('PersonSearchCountDialogController', PersonSearchCountDialogController);

    PersonSearchCountDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'PersonSearchCount', 'Person'];

    function PersonSearchCountDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, PersonSearchCount, Person) {
        var vm = this;

        vm.personSearchCount = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
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
        

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.personSearchCount.id !== null) {
                PersonSearchCount.update(vm.personSearchCount, onSaveSuccess, onSaveError);
            } else {
                PersonSearchCount.save(vm.personSearchCount, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('intelligentChartApp:personSearchCountUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.searchDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
