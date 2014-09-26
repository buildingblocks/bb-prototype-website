var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		toggleTransitions: {
			noTransitionsClass: 'no-transitions',
			disableTransitions: function () {
				var self = this;
				bb.settings.$html.addClass(self.noTransitionsClass);
			},
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
