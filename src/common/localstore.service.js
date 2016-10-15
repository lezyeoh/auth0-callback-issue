(function () {
  'use strict';
  angular
    .module('sportsFinder.common')
    .factory('localStoreService', localStoreService);

  localStoreService.$inject = ['$window'];

  /* @ngInject */
  function localStoreService($window) {
    var storage = $window.localStorage;

    // API
    return {
      set: set,
      get: get,
      remove: remove
    };

    //Implementation ---

    function set(key, value) {
      storage.setItem(key, value);
      return get(key);
    }

    function get(key) {
      return storage.getItem(key);
    }

    function remove(key) {
      return storage.removeItem(key);
    }
  }
}());
