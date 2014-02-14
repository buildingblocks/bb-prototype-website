var bb = bb ? bb : {};
$.extend(bb,{
	// watch media query changes
	mq : {
		bb: null,
		$detector: $('#monitor-width'),
		detectorWidth: 0,
		// current break point of page
		currentBreakpoint: 0,
		previousBreakpoint: 0,
		setGlobal: function (bb) {
			var self = this;
			self.bb = bb;
		},
		monitorWidth: function() {
			var self = this;
			if (!self.$detector.length) {
				self.$detector = $('<div />', {
					id: 'monitor-width'
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
	bb.mq.monitorWidth();
});
$.subscribe('resizeFinished', function () {
	bb.mq.monitorWidth();
});
