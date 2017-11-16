var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		bbPageNav: function() {
			var self = this,
				$pageNav = $('.bb-page-nav'),
				navOpen = false;

			if (!$pageNav.length) {
				return;
			}

			// create open nav btn
			var $btn = $('<button />', {
				'type': 'button',
				'class': 'action-bb-page-nav bb-page-nav-btn btn-no-style'
			}).text('menu');
			var $demoActions = $('.demo-links');
			if ($demoActions && $demoActions.length > 0) {
				$demoActions.append($btn);
			}

			// open nav on btn click
			$btn.on('click.bbPageNav', function(event) {
				_buildingBlocks.settings.$html.toggleClass('bb-page-nav-show');

				if (navOpen) {
					navOpen = false;
				} else {
					navOpen = true;
				}
			});

			// close nav on close button click
			$('.action-bb-page-nav-close').on('click.bbPageNav', function(event) {
				event.preventDefault();
				_buildingBlocks.settings.$html.removeClass('bb-page-nav-show');
				navOpen = false;
			});

			// close nav on body click
			_buildingBlocks.settings.$htmlbody.on('click.bbPageNav', function(event) {
				var $clickElement = $(event.target),
					$actionBtn = $clickElement.closest('.action-bb-page-nav'),
					$pageNav = $clickElement.closest('.bb-page-nav');

				if (($actionBtn && $actionBtn.length > 0) || ($pageNav && $pageNav.length > 0)) {
					return;
				}

				if (navOpen) {
					_buildingBlocks.settings.$html.removeClass('bb-page-nav-show');
					navOpen = false;
				} else {
					return;
				}
			});
		}
	});
	$.subscribe('pageReady', function() {
		_buildingBlocks.bbPageNav();
	});
}(jQuery));
