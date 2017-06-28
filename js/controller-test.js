'use srict';

describe('CrudController', function() {
  var controller;
  var scope;
  var StorageServiceSpy;
  var mockData;

  beforeEach(module('crudApp'));

  beforeEach(function() {
    mockData = {
      fullname: 'pluto',
      description: 'the dog',
      favFruit: 'durian',
      editing: false
    };

    module(function($provide) {
      var mockStorageService = {
        setData: jasmine.createSpy('setData'),
        getData: jasmine.createSpy('getData').and.returnValue([mockData]),
        getNewMemberModel: jasmine.createSpy('getNewMemberModel').and.returnValue({}),
        initialSeed: jasmine.createSpy('initialSeed')
      };

      $provide.value('StorageService', mockStorageService);
    });
  });

  beforeEach(inject(function($controller, _StorageService_) {
    scope = {};
    StorageServiceSpy = _StorageService_;

    controller = $controller('CrudController', {
      $scope: scope,
      StorageService: StorageServiceSpy
    })
  }));

  describe('initial', function() {
    it('should have initial variable and methods defined', function() {
      expect(scope.members).toEqual([mockData]);

      expect(scope.sortBy).toBeDefined();
      expect(scope.toggleEdit).toBeDefined();
      expect(scope.addMember).toBeDefined();
      expect(scope.validateFields).toBeDefined();
      expect(scope.removeMember).toBeDefined();
    });

    it('should seed data and get initial data', function() {
      expect(StorageServiceSpy.initialSeed).toHaveBeenCalled();
      expect(StorageServiceSpy.getData).toHaveBeenCalled();
    });
  });

  describe('toggleEdit', function() {
    it('should toggle editing value from false to true', function() {
      var test = {
        editing: false
      };
      scope.toggleEdit(test);

      expect(test.editing).toBeTruthy();
      expect(StorageServiceSpy.setData).toHaveBeenCalledWith(scope.members);
    });

    it('should toggle editing value from true to false', function() {
      var test = {
        editing: true
      };
      scope.toggleEdit(test);

      expect(test.editing).toBeFalsy();
      expect(StorageServiceSpy.setData).toHaveBeenCalledWith(scope.members);
    });
  });

  describe('addMember', function() {
    it('should add new member', function() {
      expect(scope.members.length).toBe(1);

      scope.addMember();

      expect(StorageServiceSpy.getNewMemberModel).toHaveBeenCalled();
      expect(scope.members.length).toBe(2);
    });
  });

  describe('validateFields', function() {
    it('should return false if all fields are filled', function() {
      var member = angular.copy(mockData);

      var response = scope.validateFields(member);

      expect(response).toBeFalsy();
    });

    it('should return true if name field is not filled', function() {
      var member = angular.copy(mockData);
      member.fullname = '';

      var response = scope.validateFields(member);

      expect(response).toBeTruthy();
    });

    it('should return true if description field is not filled', function() {
      var member = angular.copy(mockData);
      member.description = '';

      var response = scope.validateFields(member);

      expect(response).toBeTruthy();
    });

    it('should return true if favorite fruit field is not filled', function() {
      var member = angular.copy(mockData);
      member.favFruit = '';

      var response = scope.validateFields(member);

      expect(response).toBeTruthy();
    });
  });

  describe('removeMember', function() {
    it('should remove member from members array', function() {
      expect(scope.members.length).toBe(1);

      scope.removeMember(mockData);

      expect(scope.members.length).toBe(0);
      expect(StorageServiceSpy.setData).toHaveBeenCalledWith(scope.members);
    });

    it('should not remove if member is not found in members array', function() {
      expect(scope.members.length).toBe(1);

      scope.removeMember('alien');

      expect(scope.members.length).toBe(1);
      expect(StorageServiceSpy.setData).not.toHaveBeenCalled();
    });
  });

});
