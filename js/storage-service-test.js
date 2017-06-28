'use srict';

describe('StorageService', function() {
  var mockWindow;
  var mockStorageService;

  beforeEach(function() {
    module(function($provide) {
      $provide.service('$window', function() {
        this.localStorage = {};
        this.localStorage.setItem = jasmine.createSpy('setItem');
        this.localStorage.getItem = jasmine.createSpy('getItem').and.returnValue({
          name: 'pluto'
        });
      })
    })

    module('crudApp');
  });

  beforeEach(inject(function($window, $injector) {
    mockWindow = $window;
    mockStorageService = $injector.get('StorageService');
  }));

  describe('test setData()', function() {
    it('should set member data to local storage', function() {
      var data = {
        test: 'test value'
      };

      var dataJson = angular.toJson(data);

      mockStorageService.setData(data);
      expect(mockWindow.localStorage.setItem).toHaveBeenCalledWith('members', dataJson);
    });
  });

  describe('test getData()', function() {
    it('should return member data from local storage', function() {
      var mockResponse = angular.fromJson({
        name: 'pluto'
      });

      var response = mockStorageService.getData();

      expect(mockWindow.localStorage.getItem).toHaveBeenCalledWith('members');
      expect(response).toEqual(mockResponse);
    });
  });

  describe('test getNewMemberModel()', function() {
    it('should return empty member model', function() {
      var emptyModel = {
        fullName: '',
        description: '',
        favFruit: '',
        editing: true
      };

      var response = mockStorageService.getNewMemberModel();

      expect(response).toEqual(emptyModel);
    });
  });

  describe('test initialSeed()', function() {

    var initialData;

    beforeEach(function() {
      spyOn(mockStorageService, 'setData');
      initialData = [
        {
          fullname: 'pluto',
          description: 'the dog',
          favFruit: 'durian',
          editing: false
        }
      ];
    });

    it('should seed data if initial data is empty', function() {
      spyOn(mockStorageService, 'getData').and.returnValue([]);

      mockStorageService.initialSeed();

      expect(mockStorageService.setData).toHaveBeenCalledWith(initialData);
    });

    it('should seed data if initial data is undefined', function() {
      spyOn(mockStorageService, 'getData').and.returnValue(undefined);

      mockStorageService.initialSeed();

      expect(mockStorageService.setData).toHaveBeenCalledWith(initialData);
    });

    it('should not seed data is there is already data', function() {
      spyOn(mockStorageService, 'getData').and.returnValue(['not empty']);

      mockStorageService.initialSeed();

      expect(mockStorageService.setData).not.toHaveBeenCalled();
    });
  })
});
