/**
 * @file Toggle markup
 * @author {@link http://buildingblocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		toggleMarkup: function($object) {
			var self = this,
				$btn = $('.kss-toggle-markup'),
				$markup = $('.kss-markup');

			$markup.hide();

			$btn.on('click', function(event) {
				var $self = $(this);

				$self.siblings('.kss-markup').slideToggle();
				$self.toggleClass('active');
			});
		}
	});
	$.subscribe('pageReady', function() {
		bb.toggleMarkup();
	});
}(jQuery));
