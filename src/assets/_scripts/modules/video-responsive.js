var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function ($) {
	$.extend(_buildingBlocks, {
		$selector: null,
		videosResponsive: function ($object) {
			if (!$object) {
				$object = $('.media-video');
			}
			$object.fitVids({
				customSelector: 'iframe[src^="http://' + window.location.host + '"], iframe[src^="http://fast.wistia.net"], iframe[src^="http://cdnapi.kaltura.com"]'
			});
		}
	});
	$.subscribe('pageReady', function () {
		_buildingBlocks.videosResponsive();
	});
}(jQuery));