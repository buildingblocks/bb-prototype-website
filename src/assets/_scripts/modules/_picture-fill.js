var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.subscribe('pageReady ajaxLoaded', function() {
		if (typeof picturefill === 'function') {
			// console.log('picturefill');
			picturefill();
		}
	});
}(jQuery));
