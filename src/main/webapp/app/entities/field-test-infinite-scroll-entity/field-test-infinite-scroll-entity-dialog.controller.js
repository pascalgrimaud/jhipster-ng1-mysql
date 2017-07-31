(function() {
    'use strict';

    angular
        .module('travisMysqlApp')
        .controller('FieldTestInfiniteScrollEntityDialogController', FieldTestInfiniteScrollEntityDialogController);

    FieldTestInfiniteScrollEntityDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'FieldTestInfiniteScrollEntity'];

    function FieldTestInfiniteScrollEntityDialogController ($timeout, $scope, $stateParams, $uibModalInstance, DataUtils, entity, FieldTestInfiniteScrollEntity) {
        var vm = this;

        vm.fieldTestInfiniteScrollEntity = entity;
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
            if (vm.fieldTestInfiniteScrollEntity.id !== null) {
                FieldTestInfiniteScrollEntity.update(vm.fieldTestInfiniteScrollEntity, onSaveSuccess, onSaveError);
            } else {
                FieldTestInfiniteScrollEntity.save(vm.fieldTestInfiniteScrollEntity, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('travisMysqlApp:fieldTestInfiniteScrollEntityUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.localDateHugo = false;
        vm.datePickerOpenStatus.localDateRequiredHugo = false;
        vm.datePickerOpenStatus.zonedDateTimeHugo = false;
        vm.datePickerOpenStatus.zonedDateTimeRequiredHugo = false;

        vm.setByteImageHugo = function ($file, fieldTestInfiniteScrollEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestInfiniteScrollEntity.byteImageHugo = base64Data;
                        fieldTestInfiniteScrollEntity.byteImageHugoContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageRequiredHugo = function ($file, fieldTestInfiniteScrollEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestInfiniteScrollEntity.byteImageRequiredHugo = base64Data;
                        fieldTestInfiniteScrollEntity.byteImageRequiredHugoContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMinbytesHugo = function ($file, fieldTestInfiniteScrollEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestInfiniteScrollEntity.byteImageMinbytesHugo = base64Data;
                        fieldTestInfiniteScrollEntity.byteImageMinbytesHugoContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteImageMaxbytesHugo = function ($file, fieldTestInfiniteScrollEntity) {
            if ($file && $file.$error === 'pattern') {
                return;
            }
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestInfiniteScrollEntity.byteImageMaxbytesHugo = base64Data;
                        fieldTestInfiniteScrollEntity.byteImageMaxbytesHugoContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyHugo = function ($file, fieldTestInfiniteScrollEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestInfiniteScrollEntity.byteAnyHugo = base64Data;
                        fieldTestInfiniteScrollEntity.byteAnyHugoContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyRequiredHugo = function ($file, fieldTestInfiniteScrollEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestInfiniteScrollEntity.byteAnyRequiredHugo = base64Data;
                        fieldTestInfiniteScrollEntity.byteAnyRequiredHugoContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMinbytesHugo = function ($file, fieldTestInfiniteScrollEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestInfiniteScrollEntity.byteAnyMinbytesHugo = base64Data;
                        fieldTestInfiniteScrollEntity.byteAnyMinbytesHugoContentType = $file.type;
                    });
                });
            }
        };

        vm.setByteAnyMaxbytesHugo = function ($file, fieldTestInfiniteScrollEntity) {
            if ($file) {
                DataUtils.toBase64($file, function(base64Data) {
                    $scope.$apply(function() {
                        fieldTestInfiniteScrollEntity.byteAnyMaxbytesHugo = base64Data;
                        fieldTestInfiniteScrollEntity.byteAnyMaxbytesHugoContentType = $file.type;
                    });
                });
            }
        };

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
