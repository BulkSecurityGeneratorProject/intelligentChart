(function() {
    'use strict';

    angular
        .module('intelligentChartApp')
        .controller('PersonFanSexDialogController', PersonFanSexDialogController);

    PersonFanSexDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'PersonFanSex', 'Person', 'Sex'];

    function PersonFanSexDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, PersonFanSex, Person, Sex) {
        var vm = this;

        vm.personFanSex = entity;
        vm.clear = clear;
        vm.save = save;
        vm.people = Person.query();
        vm.sexes = Sex.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.personFanSex.id !== null) {
                PersonFanSex.update(vm.personFanSex, onSaveSuccess, onSaveError);
            } else {
                PersonFanSex.save(vm.personFanSex, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('intelligentChartApp:personFanSexUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();