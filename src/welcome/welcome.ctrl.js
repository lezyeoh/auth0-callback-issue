(function() {
  'use strict';
  angular
    .module('sportsFinder.welcome')
    .controller('WelcomeCtrl', WelcomeCtrl);

  WelcomeCtrl.$inject = ['sportsService', 'authService', 'eventsService', 'alertService', '$stateParams', '$state'];

  /* @ngInject */
  function WelcomeCtrl(sportsService, authService, eventsService, alertService, $stateParams, $state) {
    var vm = this;
    // authService.whoIs().success(function (user) {
    //   vm.user = user;
    // });

    vm.initialise = initialise;
   
    initialise();

    function initialise() {
      getSports();
    }
    
    function getSports() {
      sportsService.viewAll().success(function(results) {
        if (results) {
          vm.sports =  _.sortBy(results, function(o){
            return o.name;
          });
        }
      });
    }

  }
}());
