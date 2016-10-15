// (function() {
//         'use strict';
//         angular
//             .module('sportsFinder.common')
//             .factory('googleMapService', googleMapService);

//         googleMapService.$inject = ['$window', '$q'];

//         function googleMapService($window, $q) {

//             //Google's url for async maps initialization accepting callback function
//             var asyncUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCY63B_m8qzHBH8kAU3Ot5r7VjknuZK_Lk&callback=',
//             mapsDefer = $q.defer();

//             //Callback function - resolving promise after maps successfully loaded
//             $window.googleMapsInitialized = mapsDefer.resolve; // removed ()

//             //Async loader
//             var asyncLoad = function(asyncUrl, callbackName) {
//                 var script = document.createElement('script');
//                 //script.type = 'text/javascript';
//                 script.src = asyncUrl + callbackName;
//                 document.body.appendChild(script);
//             };
//             //Start loading google maps
//             asyncLoad(asyncUrl, 'googleMapsInitialized');

//             //Usage: Initializer.mapsInitialized.then(callback)
//             return {
//                 mapsInitialized: mapsDefer.promise
//             };
//         }
// }());