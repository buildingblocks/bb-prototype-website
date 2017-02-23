/**
 * @file Toggle grid
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
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
				bb.settings.$body.append($btn);
			}

			$btn.on('click', function(event) {
				bb.settings.$body.toggleClass('visible-grid');
			});
		}
	});
	$.subscribe('pageReady', function() {
		bb.toggleGrid();
	});
}(jQuery));
