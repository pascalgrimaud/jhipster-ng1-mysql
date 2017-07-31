(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestEntityDialogController', FieldTestEntityDialogController);

    FieldTestEntityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'FieldTestEntity'];

    function FieldTestEntityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, FieldTestEntity) {
        var vm = this;

        vm.fieldTestEntity = entity;
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
            if (vm.fieldTestEntity.id !== null) {
                FieldTestEntity.update(vm.fieldTestEntity, onSaveSuccess, onSaveError);
            } else {
                FieldTestEntity.save(vm.fieldTestEntity, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:fieldTestEntityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.localDateTom = false;
        vm.datePickerOpenStatus.localDateRequiredTom = false;
        vm.datePickerOpenStatus.zonedDateTimeTom = false;
        vm.datePickerOpenStatus.zonedDateTimeRequiredTom = false;

        vm.setByteImageTom = function ($file, fieldTestEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestEntity.byteImageTom = base64Data;
                        fieldTestEntity.byteImageTomContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageRequiredTom = function ($file, fieldTestEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestEntity.byteImageRequiredTom = base64Data;
                        fieldTestEntity.byteImageRequiredTomContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMinbytesTom = function ($file, fieldTestEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestEntity.byteImageMinbytesTom = base64Data;
                        fieldTestEntity.byteImageMinbytesTomContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMaxbytesTom = function ($file, fieldTestEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestEntity.byteImageMaxbytesTom = base64Data;
                        fieldTestEntity.byteImageMaxbytesTomContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyTom = function ($file, fieldTestEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestEntity.byteAnyTom = base64Data;
                        fieldTestEntity.byteAnyTomContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyRequiredTom = function ($file, fieldTestEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestEntity.byteAnyRequiredTom = base64Data;
                        fieldTestEntity.byteAnyRequiredTomContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMinbytesTom = function ($file, fieldTestEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestEntity.byteAnyMinbytesTom = base64Data;
                        fieldTestEntity.byteAnyMinbytesTomContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMaxbytesTom = function ($file, fieldTestEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestEntity.byteAnyMaxbytesTom = base64Data;
                        fieldTestEntity.byteAnyMaxbytesTomContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
