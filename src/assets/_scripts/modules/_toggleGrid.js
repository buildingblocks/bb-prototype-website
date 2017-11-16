var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		toggleGrid: function($object) {
			var self = this,
				$visibleGrid = $('.visible-grid');

			if (!$visibleGrid.length) {
				return;
			}

			var $btn = $('<button />', {
				'type': 'button',
				'class': 'visible-grid-btn btn-no-style'
			}).text('Grid on/off');

			var $demoActions = $('.demo-links');
			if ($demoActions && $demoActions.length > 0) {
				$demoActions.append($btn);
			} else {
				_buildingBlocks.settings.$body.append($btn);
			}

			$btn.on('click', function(event) {
				_buildingBlocks.settings.$body.toggleClass('visible-grid-in');
			});
		}
	});
	$.subscribe('pageReady', function() {
		_buildingBlocks.toggleGrid();
	});
}(jQuery));
