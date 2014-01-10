/*! tagged-infinite-scroll - v0.0.1 - 2014-01-09 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], factory);
  } else {
    // Browser globals
    root.taggedInfiniteScroll = factory(root.angular);
  }
}(this, function (angular) {
  "use strict";

  /*
   * Adapted from: http://code.google.com/p/gaequery/source/browse/trunk/src/static/scripts/jquery.autogrow-textarea.js
   *
   * Works nicely with the following styles:
   * textarea {
   *  resize: none;
   *  transition: 0.05s;
   *  -moz-transition: 0.05s;
   *  -webkit-transition: 0.05s;
   *  -o-transition: 0.05s;
   * }
   *
   * Usage: <textarea ng-model="myModel" tagged-auto-grow></textarea>
   */
  var module = angular.module('tagged.directives.autogrow', []);
  module.directive('taggedAutoGrow', ['$window', '$document', '$timeout', function($window, $document, $timeout) {
    var $shadow = angular.element('<div></div>').css({
      position: 'absolute',
      top: '-10000px',
      left: '-10000px',
      whiteSpace: 'pre-wrap'
    });
    angular.element($document[0].body).append($shadow);

    return {
      require: 'ngModel',
      link: function(scope, element, attr) {
        $timeout(function() {
          var minHeight = element[0].offsetHeight,
            styles = $window.getComputedStyle(element[0]),
            stylesToDuplicate = [
              'width', 'boxSizing', 'paddingTop', 'paddingRight',
              'paddingBottom', 'paddingLeft', 'borderTopWidth',
              'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
              'lineHeight'
            ];

          scope.$watch(attr.ngModel, function() {
            var newStyles = {},
              // additional text to add to the shadow element
              padding = ' oooooo',
              val,
              height;

            angular.forEach(stylesToDuplicate, function(style) {
              newStyles[style] = styles[style];
            });

            $shadow.css(newStyles);
            val = element.val().replace(/\n$/g, "\n.") + padding;
            $shadow.text(val);
            height = Math.max($shadow[0].offsetHeight, minHeight);
            element.css('height', height + 'px');
          });
        });
      }
    };
  }]);

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return module;
}));
