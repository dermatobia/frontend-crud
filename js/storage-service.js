'use strict';

(function() {

  // ** StorageService **
  // ** This service uses localStorage for persistent data **

  crudApp.service('StorageService', StorageService);

  StorageService.$inject = ['$window'];

  function StorageService($window) {

    var _this = this;

    // * Save data to local storage
    // * Param: (type array) array of member objects
    this.setData = function(data) {
      var json = angular.toJson(data);
      $window.localStorage.setItem('members', json);
    }

    // * Get data from local storage
    // * Returns: (type array) array of member objects
    this.getData = function() {
      var members = $window.localStorage.getItem('members');

      return angular.fromJson(members);
    }

    // * Get empty member model
    // * Returns: (type object) empty member model
    this.getNewMemberModel = function() {
      var emptyModel = {
        fullName: '',
        description: '',
        favFruit: '',
        editing: true
      };

      return emptyModel;
    }

    // * This is just a helper method to seed UI table with
    //   initial member data
    this.initialSeed = function() {
      if (!_this.getData() || _this.getData().length < 1 ) {
        var initialValue = [
          {
            fullname: 'pluto',
            description: 'the dog',
            favFruit: 'durian',
            editing: false
          }
        ];

        _this.setData(initialValue);
      }
    }
  }

})();
