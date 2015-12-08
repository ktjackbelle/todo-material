'use strict';

var angular = require('angular');

var activeLink = angular.module('activeLink', []);

activeLink.directive('activeLink', [
  '$location',
  function($location) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        var href = attrs.href;
        var activeClass = attrs.activeLink || 'active';

        scope.$on('$locationChangeSuccess', updateClass);

        function updateClass() {
          var active = href === '#' + $location.path();
          var method = active ? 'addClass' : 'removeClass';

          elem[method](activeClass);
        }
        updateClass();
      },
    };
  },
]);

module.exports = activeLink.name;
