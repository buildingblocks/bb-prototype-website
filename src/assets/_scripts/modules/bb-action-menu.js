/**
 * @file bbActionMenu
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
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
					bb.settings.$html.removeClass('demo-actions-show');

					delayA = setTimeout(function() {
						bb.settings.$html.removeClass('demo-actions-out');
						menuIn = false;
						wait = false;
						clearTimeout(delayA);
					}, 250);

				} else {
					bb.settings.$html.addClass('demo-actions-out');

					delayB = setTimeout(function() {
						bb.settings.$html.addClass('demo-actions-show');
						menuIn = true;
						wait = false;
						clearTimeout(delayB);
					}, 250);
				}
			});
		}
	});
	$.subscribe('pageReady', function() {
		bb.bbActionMenu();
	});
}(jQuery));
