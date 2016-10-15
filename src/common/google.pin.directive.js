(function() {
    'use strict';
    angular
        .module('sportsFinder.common')
        .directive('googlepin', googlepinDirective);

    googlepinDirective.$inject = [];

    /* @ngInject */
    function googlepinDirective() {
        return {
            link: function(scope, elem, attrs){
              var map;
              var options = {
                center: new google.maps.LatLng(-37.9243110, 145.0408560),
                zoom: 15,
                disableDefaultUI: true
              }
              map = new google.maps.Map(elem[0], options);
            },
            template: '<div id="map"></div>',
            replace: true
        }
    }
}());
