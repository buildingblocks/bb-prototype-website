/**
 * @file Toggle grid
 * @author {@link https://github.com/buildingblocks Building Blocks}
 */
 var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		toggleGrid: function ($object) {
			var self = this,
			$visibleGrid = $('.visible-grid');

			if (!$visibleGrid.length) {
				return;
			}

			var $btn = $('<button />', {
				'type': 'button',
				'class': 'visible-grid-btn btn btn-style-a btn-small'
			}).text('Toggle Grid');

			bb.settings.$body.append($btn);

			$btn.on('click', function (event) {
				bb.settings.$body.toggleClass('visible-grid');
			});
		}
	});
	$.subscribe('pageReady', function () {
		bb.toggleGrid();
	});
}(jQuery));
