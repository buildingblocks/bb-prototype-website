/**
 * @file Radio replace
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Select replace related methods.
		 * @namespace radioReplace
		 */
		radioReplace: {
			// CSS Selectors
			processedClass: 'radio-replace-input',
			ignoreClass: 'radio-replace-ignore',
			/**
			 * Initialises radio replace module. Processes <input type="radio">s. Creates `.radio-replace` markup.
			 * @function init
			 * @memberof radioReplace
			 */
			init: function() {
				var self = this;

				if (bb.ltIE(9)) {
					return;
				}

				var $inputs = $('input[type=radio]:not(.' + self.processedClass + '):not(.' + self.ignoreClass + '), .checkbox-radio-style:not(.' + self.processedClass + '):not(.' + self.ignoreClass + ')');

				$inputs.each(function() {
					var $input = $(this),
						$placeholder = $('<label />', {
							'for': $input.attr('id'),
							'class': 'radio-replace'
						});

					$input.addClass(self.processedClass).after($placeholder);
				});
			}
		}
	});
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.styleRadio.init();
	});
}(jQuery));
