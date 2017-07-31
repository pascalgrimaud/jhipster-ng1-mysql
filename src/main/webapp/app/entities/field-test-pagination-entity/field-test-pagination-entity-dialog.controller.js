(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestPaginationEntityDialogController', FieldTestPaginationEntityDialogController);

    FieldTestPaginationEntityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'FieldTestPaginationEntity'];

    function FieldTestPaginationEntityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, FieldTestPaginationEntity) {
        var vm = this;

        vm.fieldTestPaginationEntity = entity;
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
            if (vm.fieldTestPaginationEntity.id !== null) {
                FieldTestPaginationEntity.update(vm.fieldTestPaginationEntity, onSaveSuccess, onSaveError);
            } else {
                FieldTestPaginationEntity.save(vm.fieldTestPaginationEntity, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:fieldTestPaginationEntityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.localDateAlice = false;
        vm.datePickerOpenStatus.localDateRequiredAlice = false;
        vm.datePickerOpenStatus.zonedDateTimeAlice = false;
        vm.datePickerOpenStatus.zonedDateTimeRequiredAlice = false;

        vm.setByteImageAlice = function ($file, fieldTestPaginationEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPaginationEntity.byteImageAlice = base64Data;
                        fieldTestPaginationEntity.byteImageAliceContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageRequiredAlice = function ($file, fieldTestPaginationEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPaginationEntity.byteImageRequiredAlice = base64Data;
                        fieldTestPaginationEntity.byteImageRequiredAliceContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMinbytesAlice = function ($file, fieldTestPaginationEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPaginationEntity.byteImageMinbytesAlice = base64Data;
                        fieldTestPaginationEntity.byteImageMinbytesAliceContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMaxbytesAlice = function ($file, fieldTestPaginationEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPaginationEntity.byteImageMaxbytesAlice = base64Data;
                        fieldTestPaginationEntity.byteImageMaxbytesAliceContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyAlice = function ($file, fieldTestPaginationEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPaginationEntity.byteAnyAlice = base64Data;
                        fieldTestPaginationEntity.byteAnyAliceContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyRequiredAlice = function ($file, fieldTestPaginationEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPaginationEntity.byteAnyRequiredAlice = base64Data;
                        fieldTestPaginationEntity.byteAnyRequiredAliceContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMinbytesAlice = function ($file, fieldTestPaginationEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPaginationEntity.byteAnyMinbytesAlice = base64Data;
                        fieldTestPaginationEntity.byteAnyMinbytesAliceContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMaxbytesAlice = function ($file, fieldTestPaginationEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestPaginationEntity.byteAnyMaxbytesAlice = base64Data;
                        fieldTestPaginationEntity.byteAnyMaxbytesAliceContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
