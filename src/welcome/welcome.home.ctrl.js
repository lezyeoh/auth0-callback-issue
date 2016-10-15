(function() {
  'use strict';
  angular
    .module('sportsFinder.welcome')
    .controller('WelcomehomeCtrl', WelcomehomeCtrl);

  WelcomehomeCtrl.$inject = ['sportsService','spinnerService','authService', 'eventsService', 'alertService', '$stateParams', '$state'];

  /* @ngInject */
  function WelcomehomeCtrl(sportsService, spinnerService, authService, eventsService, alertService, $stateParams, $state) {
    var vm = this;
    //vm.user = user.data;
    // vm.isSuperUser = isSuperUser;
    // vm.isAdmin = isAdmin;

    //vm.searchterm = $stateParams.search;

    // Implementation ---
    vm.initialise = initialise;
    vm.placeholder = 'http://ingridwu.dmmdmcfatter.com/wp-content/uploads/2015/01/placeholder.png';
    vm.slickConfig = {
      enabled: true,
      slidesPerRow: 4,
      slidesToShow: 4
    };

    initialise();

    function initialise() {
      getUpcomingEvents();
      getTodaysEvents();
      getPopularEvents();
    }

    function getPopularEvents() {
      eventsService.popularEvents().success(function(results) {
        vm.popularEvents = results;
      }).finally(function(){
        spinnerService.hide('popularSpinner');
      });
    }

    function getTodaysEvents() {
      eventsService.todaysEvents().success(function(results) {
        vm.todaysEvents = results;
      });
    }

    function getUpcomingEvents() {
      eventsService.upcomingEvents().success(function(results) {
        vm.upcomingEvents = results;
      }).finally(function(){
        spinnerService.hide('upcomingSpinner');
      });
    }

  }
}());
