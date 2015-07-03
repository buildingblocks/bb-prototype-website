/**
 * @file Monitor Media Queries
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Monitor media queries related methods.
		 * @namespace monitorMq
		 */
		monitorMq: {
			// jQuery DOM caching
			$detector: null,
			// CSS selectors
			detectorId: 'monitor_mq',
			// Configuration
			detectorWidth: 0,
			currentBreakpoint: 0,
			previousBreakpoint: 0,
			/**
			 * Initialises monitor media queries module. Caches jQuery DOM objects, calls monitor() on pageReady.
			 * @function init
			 * @memberof monitorMq
			 */
			init: function() {
				var self = this;
				self.$detector = $('#' + self.detectorId);
				self.monitor();
			},
			/**
			 * Creates detector <div> if not present. Updates the comparison variable when a change in screen size occurs.
			 * @function monitor
			 * @memberof monitorMq
			 */
			monitor: function() {
				var self = this;
				if (!self.$detector.length) {
					self.$detector = $('<div />', {
						id: self.detectorId
					});
					bb.settings.$body.append(self.$detector);
				}
				self.detectorWidth = self.$detector.width();
				if (self.detectorWidth !== self.currentBreakpoint) {
					self.previousBreakpoint = self.currentBreakpoint;
					self.currentBreakpoint = self.detectorWidth;
				}
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.monitorMq.init();
	});
	$.subscribe('viewportResizeEnd', function() {
		bb.monitorMq.monitor();
	});
}(jQuery));
