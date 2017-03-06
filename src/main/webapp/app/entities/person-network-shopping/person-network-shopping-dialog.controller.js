(function() {
    'use strict';

    angular
        .module('intelligentChartApp')
        .controller('PersonNetworkShoppingDialogController', PersonNetworkShoppingDialogController);

    PersonNetworkShoppingDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'PersonNetworkShopping', 'Person', 'NetworkShoppingType'];

    function PersonNetworkShoppingDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, PersonNetworkShopping, Person, NetworkShoppingType) {
        var vm = this;

        vm.personNetworkShopping = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.people = Person.query();
        vm.networkshoppingtypes = NetworkShoppingType.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.personNetworkShopping.id !== null) {
                PersonNetworkShopping.update(vm.personNetworkShopping, onSaveSuccess, onSaveError);
            } else {
                PersonNetworkShopping.save(vm.personNetworkShopping, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('intelligentChartApp:personNetworkShoppingUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.createDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();