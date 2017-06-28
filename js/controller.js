'use strict';

(function() {

  // ** Controller for crudApp **

  crudApp.controller('CrudController', CrudController);

  CrudController.$inject = ['$scope', 'StorageService'];

  function CrudController($scope, StorageService) {

    // Seeding table with initial member data
    StorageService.initialSeed();

    $scope.members = StorageService.getData();

    $scope.sortBy = function(property) {
      $scope.reverse = ($scope.propertyName === property) ? !$scope.reverse : false;
      $scope.propertyName = property;
    }

    $scope.toggleEdit = function(member) {
      member.editing = !member.editing;
      _update();
    }

    $scope.addMember = function() {
      var newMember = StorageService.getNewMemberModel();
      $scope.propertyName = undefined;
      $scope.reverse = undefined;
      $scope.members.push(newMember);
    }

    $scope.validateFields = function(member) {
      return !member.fullname || !member.description || !member.favFruit;
    }

    $scope.removeMember = function(member) {
      var index = $scope.members.indexOf(member);

      if (index > -1) {
        $scope.members.splice(index, 1);
        _update();
      }
    }

    // private method
    function _update() {
      StorageService.setData($scope.members);
    }
  }

})();
