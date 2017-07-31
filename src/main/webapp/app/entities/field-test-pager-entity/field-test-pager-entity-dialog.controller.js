(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestPagerEntityDialogController', FieldTestPagerEntityDialogController);

    FieldTestPagerEntityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'FieldTestPagerEntity'];

    function FieldTestPagerEntityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, FieldTestPagerEntity) {
        var vm = this;

        vm.fieldTestPagerEntity = entity;
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
            if (vm.fieldTestPagerEntity.id !== null) {
                FieldTestPagerEntity.update(vm.fieldTestPagerEntity, onSaveSuccess, onSaveError);
            } else {
                FieldTestPagerEntity.save(vm.fieldTestPagerEntity, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:fieldTestPagerEntityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.localDateJade = false;
        vm.datePickerOpenStatus.localDateRequiredJade = false;
        vm.datePickerOpenStatus.zonedDateTimeJade = false;
        vm.datePickerOpenStatus.zonedDateTimeRequiredJade = false;

        vm.setByteImageJade = function ($file, fieldTestPagerEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPagerEntity.byteImageJade = base64Data;
                        fieldTestPagerEntity.byteImageJadeContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageRequiredJade = function ($file, fieldTestPagerEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPagerEntity.byteImageRequiredJade = base64Data;
                        fieldTestPagerEntity.byteImageRequiredJadeContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMinbytesJade = function ($file, fieldTestPagerEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPagerEntity.byteImageMinbytesJade = base64Data;
                        fieldTestPagerEntity.byteImageMinbytesJadeContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMaxbytesJade = function ($file, fieldTestPagerEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPagerEntity.byteImageMaxbytesJade = base64Data;
                        fieldTestPagerEntity.byteImageMaxbytesJadeContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyJade = function ($file, fieldTestPagerEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPagerEntity.byteAnyJade = base64Data;
                        fieldTestPagerEntity.byteAnyJadeContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyRequiredJade = function ($file, fieldTestPagerEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPagerEntity.byteAnyRequiredJade = base64Data;
                        fieldTestPagerEntity.byteAnyRequiredJadeContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMinbytesJade = function ($file, fieldTestPagerEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPagerEntity.byteAnyMinbytesJade = base64Data;
                        fieldTestPagerEntity.byteAnyMinbytesJadeContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMaxbytesJade = function ($file, fieldTestPagerEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPagerEntity.byteAnyMaxbytesJade = base64Data;
                        fieldTestPagerEntity.byteAnyMaxbytesJadeContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
