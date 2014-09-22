/**
 * @file Viewport Resize
 * @version 0.6.2
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
				self.bb.settings.$window.on('resize.viewportResize', function () {
					self.clearResizeTimeout();
					self.resizeTimeout = setTimeout(function () {
						self.viewportResizeEnd();
					}, 500);
				});
			},
			clearResizeTimeout: function () {
				var self = this;
				if (self.resizeTimeout) {
					clearTimeout(self.resizeTimeout);
				}
			},
			viewportResizeEnd: function () {
				var self = this;

				self.clearResizeTimeout();
				$.publish('viewportResizeEnd');
			}
		}
	});
	$.subscribe('setGlobal', function (e, bb) {
		bb.viewportResize.setGlobal(bb);
	});
	$.subscribe('pageReady', function () {
		bb.viewportResize.init();
	});
}(jQuery));
