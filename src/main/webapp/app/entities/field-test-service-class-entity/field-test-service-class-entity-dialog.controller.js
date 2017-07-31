(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestServiceClassEntityDialogController', FieldTestServiceClassEntityDialogController);

    FieldTestServiceClassEntityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'FieldTestServiceClassEntity'];

    function FieldTestServiceClassEntityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, FieldTestServiceClassEntity) {
        var vm = this;

        vm.fieldTestServiceClassEntity = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.fieldTestServiceClassEntity.id !== null) {
                FieldTestServiceClassEntity.update(vm.fieldTestServiceClassEntity, onSaveSuccess, onSaveError);
            } else {
                FieldTestServiceClassEntity.save(vm.fieldTestServiceClassEntity, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:fieldTestServiceClassEntityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.localDateBob = false;
        vm.datePickerOpenStatus.localDateRequiredBob = false;
        vm.datePickerOpenStatus.zonedDateTimeBob = false;
        vm.datePickerOpenStatus.zonedDateTimeRequiredBob = false;

        vm.setByteImageBob = function ($file, fieldTestServiceClassEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceClassEntity.byteImageBob = base64Data;
                        fieldTestServiceClassEntity.byteImageBobContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageRequiredBob = function ($file, fieldTestServiceClassEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceClassEntity.byteImageRequiredBob = base64Data;
                        fieldTestServiceClassEntity.byteImageRequiredBobContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMinbytesBob = function ($file, fieldTestServiceClassEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceClassEntity.byteImageMinbytesBob = base64Data;
                        fieldTestServiceClassEntity.byteImageMinbytesBobContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMaxbytesBob = function ($file, fieldTestServiceClassEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceClassEntity.byteImageMaxbytesBob = base64Data;
                        fieldTestServiceClassEntity.byteImageMaxbytesBobContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyBob = function ($file, fieldTestServiceClassEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceClassEntity.byteAnyBob = base64Data;
                        fieldTestServiceClassEntity.byteAnyBobContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyRequiredBob = function ($file, fieldTestServiceClassEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceClassEntity.byteAnyRequiredBob = base64Data;
                        fieldTestServiceClassEntity.byteAnyRequiredBobContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMinbytesBob = function ($file, fieldTestServiceClassEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceClassEntity.byteAnyMinbytesBob = base64Data;
                        fieldTestServiceClassEntity.byteAnyMinbytesBobContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMaxbytesBob = function ($file, fieldTestServiceClassEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceClassEntity.byteAnyMaxbytesBob = base64Data;
                        fieldTestServiceClassEntity.byteAnyMaxbytesBobContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
