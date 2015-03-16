/**
* @file No transitions
* @author {@link https://github.com/buildingblocks Building Blocks}
*/
var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		/**
        * Toggle transitions related methods.
        * @namespace toggleTransitions
        */
        toggleTransitions: {
			// CSS selectors
			noTransitionsClass: 'no-transitions',
			/**
			* Adds CSS class to <html>, disabling transitions.
			* @function disableTransitions
			* @memberof toggleTransitions
			*/
			disableTransitions: function () {
				var self = this;

				bb.settings.$html.addClass(self.noTransitionsClass);
			},
			/**
			* Removes CSS class from <html>, re-enabling transitions.
			* @function enableTransitions
			* @memberof toggleTransitions
			*/
			enableTransitions: function () {
				var self = this;

				bb.settings.$html.removeClass(self.noTransitionsClass);
			}
		}
	});
	$.subscribe('pageReady', function () {
		bb.toggleTransitions.disableTransitions();
	});
	$.subscribe('pageLoaded', function () {
		bb.toggleTransitions.enableTransitions();
	});
	$.subscribe('viewportResizeStart', function () {
		bb.toggleTransitions.disableTransitions();
	});
	$.subscribe('viewportResizeEnd', function () {
		bb.toggleTransitions.enableTransitions();
	});
}(jQuery));
