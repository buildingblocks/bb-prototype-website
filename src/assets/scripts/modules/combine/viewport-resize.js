/**
 * @file Monitor Media Queries
 * @version 0.6.2
 * @author {@link https://github.com/buildingblocks Building Blocks}
 */
var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		/**
        * Monitor media queries related methods.
        * @namespace monitorMq
        */
		monitorMq : {
			$detector: null,
			detectorId: 'monitor_mq',
			detectorWidth: 0,
			currentBreakpoint: 0,
			previousBreakpoint: 0,
			init: function () {
				var self = this;
				self.$detector = $('#' + self.detectorId);
				self.monitor();
			},
			monitor: function () {
				var self = this;
				if (!self.$detector.length) {
					self.$detector = $('<div />', {
						id: self.detectorId
					});
					bb.settings.$body.append(self.$detector);
				}
				self.detectorWidth = self.$detector.width();
				if (self.detectorWidth !== self.currentBreakpoint) {
					//a change has occurred so update the comparison variable
					self.previousBreakpoint = self.currentBreakpoint;
					self.currentBreakpoint = self.detectorWidth;
				}
			}
		}
	});
	$.subscribe('pageReady', function () {
		bb.monitorMq.init();
	});
	$.subscribe('viewportResizeEnd', function () {
		bb.monitorMq.monitor();
	});
}(jQuery));
