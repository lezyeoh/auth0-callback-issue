(function() {
  'use strict';
  angular.module('sportsFinder')
    /* @ngInject */
    .config(function(jwtOptionsProvider, lockProvider, $stateProvider, $urlRouterProvider, $compileProvider, $httpProvider, jwtInterceptorProvider, $locationProvider) {
      $compileProvider.debugInfoEnabled(false);
      
      lockProvider.init({
        domain: 'XXX.au.auth0.com',
        clientID: 'XXXX',
        options: {
          avatar: null,
          theme: {
            primaryColor: '#286DA8'
          },
          languageDictionary: {
            emailInputPlaceholder: "something@youremail.com",
            title: "Log In"
          },
          auth: {
            params: {
              scope: 'openid email authorization'
            }
          }
        }
      });
      
      jwtOptionsProvider.config({
        tokenGetter: function() {
          return localStorage.getItem('id_token');
        },
        whiteListedDomains: ['localhost'],
        unauthenticatedRedirectPath: '/'
      });
      
      $locationProvider.html5Mode(true);
      
      $httpProvider.interceptors.push('jwtInterceptor');

      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state('welcome', {
          abstract: true,
          templateUrl: 'src/welcome/welcome.html',
          controller: 'WelcomeCtrl as vm'
        })
        .state('welcome.home', {
          url: '/',
          views: {
            '': {
              templateUrl: 'src/welcome/welcome.home.html',
              controller: 'WelcomehomeCtrl as vm'
            },
            'upcoming@welcome.home': {
              templateUrl: 'src/events/templates/welcome.upcoming.tmpl.html'
            },
            'popular@welcome.home': {
              templateUrl: 'src/events/templates/welcome.popular.tmpl.html'
            }
          },
        })
        .state('home', {
          url: '/admin',
          controller: 'HomeCtrl as home',
          templateUrl: 'src/home/home.html',
          data: {
            requiresAdmin: true,
            requiresLogin: true
          }
        })
        .state('profile', {
          url: '/profile',
          controller: 'ProfileCtrl as vm',
          templateUrl: 'src/profile/profile.html'
        })
        .state('home.sports', {
          url: '/sports/view/:id',
          controller: 'SportsViewAllCtrl as vm',
          templateUrl: 'src/sports/sports.view.all.html',
          resolve: {
            id: ['$stateParams', function($stateParams) {
              return $stateParams.id;
            }]
          }
        })
        .state('home.sportscreate', {
          url: '/sports/create',
          controller: 'SportsCreateCtrl as vm',
          templateUrl: 'src/sports/sports.create.html'
        })
        .state('home.sportsedit', {
          url: '/sports/edit/:id',
          controller: 'SportsEditCtrl as vm',
          templateUrl: 'src/sports/sports.edit.html',
          resolve: {
            id: ['$stateParams', function($stateParams) {
              return $stateParams.id;
            }]
          }
        })
        .state('welcome.about', {
          url: '/about',
          templateUrl: 'src/welcome/welcome.about.html'
        })
        .state('welcome.contact', {
          url: '/contact',
          templateUrl: 'src/welcome/welcome.contact.html'
        })
        .state('welcome.sports', {
          url: '/sports/:id',
          views: {
            '': {
              controller: 'SportsPublicViewAllCtrl as vm',
              templateUrl: 'src/sports/sports.public.all.html',
              resolve: {
                id: ['$stateParams', function($stateParams) {
                  return $stateParams.id;
                }]
              }
            },
            'events@welcome.sports': {
              templateUrl: 'src/events/templates/events.tmpl.html'
            }
          }
        })
        .state('welcome.venues', {
          url: '/venues/:id',
          views: {
            '': {
              controller: 'VenuesPublicViewAllCtrl as vm',
              templateUrl: 'src/venues/venues.public.all.html',
              resolve: {
                id: ['$stateParams', function($stateParams) {
                  return $stateParams.id;
                }]
              }
            },
            'venues@welcome.venues': {
              templateUrl: 'src/venues/venues.public.tmpl.html'
            }
          }
        });

      // $httpProvider.interceptors.push('jwtInterceptor');
    })
    .run(function($rootScope, authService, authManager, lock, $state, $location, $timeout, jwtHelper){
      lock.interceptHash();
      $rootScope.authService = authService;
      authService.registerAuthenticationListener();
      authManager.checkAuthOnRefresh();
      authManager.redirectWhenUnauthenticated();
      
      $rootScope.$on('$stateChangeStart', function(event, to, toParams){
       var token = localStorage.getItem('id_token');
        if (to.data && to.data.requiresLogin) {
          if (jwtHelper.isTokenExpired(token)) {
            $timeout(function() {
              $state.go('welcome.home');
            });
          }
        }
      });
    });
}());
