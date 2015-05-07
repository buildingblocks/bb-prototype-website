/**
 * @file Viewport Resize
 * @author {@link https://github.com/buildingblocks Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Reusable site resize function.
		 * @namespace viewportResize
		 */
		viewportResize: {
			// Configuration
			resizeTimeout: null,
			timeoutDuration: 200,
			/**
			 * Initialises viewport resize module, binds event to window resize.
			 * @function init
			 * @memberOf viewportResize
			 */
			init: function() {
				var self = this;

				bb.settings.$window.on('resize.viewportResize', function() {
					if (self.resizeTimeout) {
						clearTimeout(self.resizeTimeout);
					}

					$.publish('viewportResizeStart');

					self.resizeTimeout = setTimeout(function() {
						$.publish('viewportResizeEnd_prioritize');
						$.publish('viewportResizeEnd');
					}, self.timeoutDuration);
				});
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.viewportResize.init();
	});
}(jQuery));
