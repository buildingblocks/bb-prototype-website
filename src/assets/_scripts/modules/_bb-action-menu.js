var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		bbActionMenu: function() {
			var self = this,
				$demoActions = $('.demo-actions'),
				menuIn = false,
				delayA = null,
				delayB = null,
				wait = false;

			if (!$demoActions.length) {
				return;
			}

			$('.action-demo-actions').on('click.bbActionMenu', function(event) {
				event.preventDefault();

				if (wait) {
					return;
				}

				wait = true;

				if (menuIn) {
					_buildingBlocks.settings.$html.removeClass('demo-actions-show');

					delayA = setTimeout(function() {
						_buildingBlocks.settings.$html.removeClass('demo-actions-out');
						menuIn = false;
						wait = false;
						clearTimeout(delayA);
					}, 250);

				} else {
					_buildingBlocks.settings.$html.addClass('demo-actions-out');

					delayB = setTimeout(function() {
						_buildingBlocks.settings.$html.addClass('demo-actions-show');
						menuIn = true;
						wait = false;
						clearTimeout(delayB);
					}, 250);
				}
			});
		}
	});
	$.subscribe('pageReady', function() {
		_buildingBlocks.bbActionMenu();
	});
}(jQuery));
