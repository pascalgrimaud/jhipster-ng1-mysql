(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestMapstructEntityDialogController', FieldTestMapstructEntityDialogController);

    FieldTestMapstructEntityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'FieldTestMapstructEntity'];

    function FieldTestMapstructEntityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, FieldTestMapstructEntity) {
        var vm = this;

        vm.fieldTestMapstructEntity = entity;
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
            if (vm.fieldTestMapstructEntity.id !== null) {
                FieldTestMapstructEntity.update(vm.fieldTestMapstructEntity, onSaveSuccess, onSaveError);
            } else {
                FieldTestMapstructEntity.save(vm.fieldTestMapstructEntity, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:fieldTestMapstructEntityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.localDateEva = false;
        vm.datePickerOpenStatus.localDateRequiredEva = false;
        vm.datePickerOpenStatus.zonedDateTimeEva = false;
        vm.datePickerOpenStatus.zonedDateTimeRequiredEva = false;

        vm.setByteImageEva = function ($file, fieldTestMapstructEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestMapstructEntity.byteImageEva = base64Data;
                        fieldTestMapstructEntity.byteImageEvaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageRequiredEva = function ($file, fieldTestMapstructEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestMapstructEntity.byteImageRequiredEva = base64Data;
                        fieldTestMapstructEntity.byteImageRequiredEvaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMinbytesEva = function ($file, fieldTestMapstructEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestMapstructEntity.byteImageMinbytesEva = base64Data;
                        fieldTestMapstructEntity.byteImageMinbytesEvaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMaxbytesEva = function ($file, fieldTestMapstructEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestMapstructEntity.byteImageMaxbytesEva = base64Data;
                        fieldTestMapstructEntity.byteImageMaxbytesEvaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyEva = function ($file, fieldTestMapstructEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestMapstructEntity.byteAnyEva = base64Data;
                        fieldTestMapstructEntity.byteAnyEvaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyRequiredEva = function ($file, fieldTestMapstructEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestMapstructEntity.byteAnyRequiredEva = base64Data;
                        fieldTestMapstructEntity.byteAnyRequiredEvaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMinbytesEva = function ($file, fieldTestMapstructEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestMapstructEntity.byteAnyMinbytesEva = base64Data;
                        fieldTestMapstructEntity.byteAnyMinbytesEvaContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMaxbytesEva = function ($file, fieldTestMapstructEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestMapstructEntity.byteAnyMaxbytesEva = base64Data;
                        fieldTestMapstructEntity.byteAnyMaxbytesEvaContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
