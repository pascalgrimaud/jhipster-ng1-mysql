(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestServiceImplEntityDialogController', FieldTestServiceImplEntityDialogController);

    FieldTestServiceImplEntityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'FieldTestServiceImplEntity'];

    function FieldTestServiceImplEntityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, FieldTestServiceImplEntity) {
        var vm = this;

        vm.fieldTestServiceImplEntity = entity;
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
            if (vm.fieldTestServiceImplEntity.id !== null) {
                FieldTestServiceImplEntity.update(vm.fieldTestServiceImplEntity, onSaveSuccess, onSaveError);
            } else {
                FieldTestServiceImplEntity.save(vm.fieldTestServiceImplEntity, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:fieldTestServiceImplEntityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.localDateMika = false;
        vm.datePickerOpenStatus.localDateRequiredMika = false;
        vm.datePickerOpenStatus.zonedDateTimeMika = false;
        vm.datePickerOpenStatus.zonedDateTimeRequiredMika = false;

        vm.setByteImageMika = function ($file, fieldTestServiceImplEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceImplEntity.byteImageMika = base64Data;
                        fieldTestServiceImplEntity.byteImageMikaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageRequiredMika = function ($file, fieldTestServiceImplEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceImplEntity.byteImageRequiredMika = base64Data;
                        fieldTestServiceImplEntity.byteImageRequiredMikaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMinbytesMika = function ($file, fieldTestServiceImplEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceImplEntity.byteImageMinbytesMika = base64Data;
                        fieldTestServiceImplEntity.byteImageMinbytesMikaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMaxbytesMika = function ($file, fieldTestServiceImplEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceImplEntity.byteImageMaxbytesMika = base64Data;
                        fieldTestServiceImplEntity.byteImageMaxbytesMikaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMika = function ($file, fieldTestServiceImplEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceImplEntity.byteAnyMika = base64Data;
                        fieldTestServiceImplEntity.byteAnyMikaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyRequiredMika = function ($file, fieldTestServiceImplEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceImplEntity.byteAnyRequiredMika = base64Data;
                        fieldTestServiceImplEntity.byteAnyRequiredMikaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMinbytesMika = function ($file, fieldTestServiceImplEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceImplEntity.byteAnyMinbytesMika = base64Data;
                        fieldTestServiceImplEntity.byteAnyMinbytesMikaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMaxbytesMika = function ($file, fieldTestServiceImplEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestServiceImplEntity.byteAnyMaxbytesMika = base64Data;
                        fieldTestServiceImplEntity.byteAnyMaxbytesMikaContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
