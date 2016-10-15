/**
 * Created by Rahul on 21/4/15.
 */
(function () {
  'use strict';
  angular
    .module('sportsFinder.profile')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['authService', 'alertService', 'formUtilsService'];

  /* @ngInject */
  function ProfileCtrl(authService, alertService, formUtilsService) {
    var vm = this;
    vm.getStatus = formUtilsService.getStatus;
    vm.updateProfile = updateProfile;
    vm.profile = authService.getUserProfile();

    vm.modelOptions = {
      updateOn: 'blur'
    };

    //Implementation ---
    function updateProfile(isValid, profileData) {
      if (!isValid) {
        return;
      }
      authService.updateProfile(profileData).success(function (data) {
        if (data) {
          alertService('success', 'Profile updated!');
        } else {
          alertService('warning', 'Oops', 'something went wrong');
        }
      }).error(function (error) {
        alertService('warning', 'Oops', error.error);
      });
    }
  }
}());
