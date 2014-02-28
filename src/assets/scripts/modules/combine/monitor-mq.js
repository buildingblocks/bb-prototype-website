var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		mq : {
			bb: null,
			$detector: null,
			detectorId: 'monitor_mq',
			detectorWidth: 0,
			currentBreakpoint: 0,
			previousBreakpoint: 0,
			setGlobal: function (bb) {
				var self = this;
				self.bb = bb;
			},
			init: function () {
				var self = this;
				self.$detector = $('#' + self.detectorId);
				self.monitorMq();
			},
			monitorMq: function() {
				var self = this;
				if (!self.$detector.length) {
					self.$detector = $('<div />', {
						id: self.detectorId
					});
					self.bb.settings.$body.append(self.$detector);
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
	$.subscribe('setGlobal', function (event, bb) {
		bb.mq.setGlobal(bb);
	});
	$.subscribe('pageReady', function () {
		bb.mq.init();
	});
	$.subscribe('viewportResizeEnd', function () {
		bb.mq.monitorMq();
	});
}(jQuery));
