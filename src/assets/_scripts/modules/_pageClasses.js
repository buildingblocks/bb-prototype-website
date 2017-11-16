var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		pageReadyClass: function() {
			var self = this;

			self.settings.$html.addClass('page-ready');
		},
		pageLoadedClass: function() {
			var self = this;

			self.settings.$html.addClass('page-loaded');
		}
	});
	$.subscribe('pageReady', function() {
		_buildingBlocks.pageReadyClass();
	});
	$.subscribe('pageLoaded', function() {
		_buildingBlocks.pageLoadedClass();
	});
}(jQuery));
