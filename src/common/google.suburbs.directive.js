(function() {
    'use strict';
    angular
        .module('sportsFinder.common')
        .directive('googlesuburb', googlesuburbDirective);

    googlesuburbDirective.$inject = [];

    /* @ngInject */
    function googlesuburbDirective() {
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                details: '=?'
            },
            link: function(scope, element, attrs, model) {
                var options = {
                    types: ['(cities)'],
                    componentRestrictions: {}
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    scope.$apply(function() {
                        scope.details = scope.gPlace.getPlace();
                        model.$setViewValue(element.val());
                    });
                });
            }
        };
    }
}());
