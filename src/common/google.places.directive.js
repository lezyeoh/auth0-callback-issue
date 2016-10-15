(function() {
    'use strict';
    angular
        .module('sportsFinder.common')
        .directive('googleplace', googleplaceDirective);

    googleplaceDirective.$inject = [];

    /* @ngInject */
    function googleplaceDirective() {
        return {
            require: 'ngModel',
            scope: {
                ngModel: '=',
                details: '=?'
            },
            link: function(scope, element, attrs, model) {
                var options = {
                    types: [],
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
