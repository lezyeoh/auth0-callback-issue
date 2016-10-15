(function() {
  'use strict';
  angular
    .module('sportsFinder.auth')
    .constant('AUTH_API', '/auth')
    .factory('authService', authService);

  authService.$inject = ['AUTH_API', '$http', '$rootScope', 'lock', 'authManager', 'alertService', '_', '$state'];

  /* @ngInject */
  function authService(AUTH_API, $http, $rootScope, lock, authManager, alertService, _, $state) {

    //Implementation ---
    var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

    function getUserProfile() {
      return userProfile;
    }

    function setUserProfile(profile) {
      userProfile = profile;
    }

    function login() {
      lock.show();
    }

    function isAdmin(profile) {
      if(!profile){
        profile = getUserProfile();
      }
      if (profile.authorization) {
        if (profile.authorization.groups && _.indexOf(profile.authorization.groups, 'Admin') > -1) {
          return true;
        }
      }
      return false;

    }

    // Logging out just requires removing the user's
    // id_token and profile
    function logout() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      localStorage.removeItem('isAdmin');
      authManager.unauthenticate();
      userProfile = {};
      $state.go('welcome.home');
      alertService('success', 'Logged Out!');
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {

      lock.on("authenticated", function(authResult) {
        
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
        lock.getProfile(authResult.idToken, function(error, profile) {
          if (error) {
            console.log(error);
          }
          localStorage.setItem('profile', JSON.stringify(profile));

          $rootScope.$broadcast('userProfileSet', profile);
          updateProfile(profile).success(function(data){
            console.log(data);
            $state.go('register');
          });
        });
      });
    }

    function updateProfile(data) {
      return $http.post(AUTH_API + '/updateProfile', data);
    }
    
    function getUser(profile){
      if(!profile){
        var profile = getUserProfile();
      }
      return $http.post(AUTH_API + '/getUser', profile);
    }

    return {
      login: login,
      logout: logout,
      registerAuthenticationListener: registerAuthenticationListener,
      getUserProfile: getUserProfile,
      updateProfile: updateProfile,
      isAdmin: isAdmin,
      getUser: getUser
    };
  }
}());
