/**
 * @file Viewport Resize
 * @author {@link https://github.com/buildingblocks Building Blocks}
 */
var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
        /**
        * Reusable site resize function.
        * @namespace viewportResize
        */
		viewportResize: {
			resizeTimeout: null,
			init: function () {
				var self = this;
				bb.settings.$window.on('resize.viewportResize', function () {
					self.clearResizeTimeout();
					$.publish('viewportResizeStart');
					self.resizeTimeout = setTimeout(function () {
						$.publish('viewportResizeEnd_prioritize');
						$.publish('viewportResizeEnd');
					}, 200);
				});
			},
			clearResizeTimeout: function () {
				var self = this;
				if (self.resizeTimeout) {
					clearTimeout(self.resizeTimeout);
				}
			}
		}
	});
	$.subscribe('pageReady', function () {
		bb.viewportResize.init();
	});
}(jQuery));
