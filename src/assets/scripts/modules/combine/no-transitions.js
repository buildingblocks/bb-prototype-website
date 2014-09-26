var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		toggleTransitions: {
			bb: bb,
			noTransitionsClass: 'no-transitions',
			setGlobal: function (bb) {
				var self = this;
				self.bb = bb;
			},
			disableTransitions: function () {
				var self = this;
				self.bb.settings.$html.addClass(self.noTransitionsClass);
			},
			enableTransitions: function () {
				var self = this;
				self.bb.settings.$html.removeClass(self.noTransitionsClass);
			}
		}
	});
	$.subscribe('setGlobal', function (event, bb) {
		bb.toggleTransitions.setGlobal(bb);
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
