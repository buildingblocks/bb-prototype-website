/**
 * @file Checkbox replace
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function ($) {
	$.extend(bb,{
		/**
		 * Checkbox replace related methods.
		 * @namespace checkboxReplace
		 */
		checkboxReplace: {
			// CSS Selectors
			processedClass: 'checkbox-replace-input',
			ignoreClass: 'checkbox-replace-ignore',
			/**
			 * Initialises checkbox replace module. Processes <inout type="checkbox">s. Creates `.checkbox-replace` markup. Binds events.
			 * @function init
			 * @memberof checkboxReplace
			 */
			init: function () {
				var self = this;

				if (bb.ltIE(9)) {
					return;
				}

				var $inputs = $('input[type=checkbox]:not(.' + self.processedClass + '):not(.' + self.ignoreClass + ')');

				$inputs.each( function () {
					var $input = $(this),
						$placeholder = $('<label />', {
							'class': 'checkbox-replace',
							'for': $input.attr('id'),
							'role': 'presentation'
						});

					$input.addClass(self.processedClass).after($placeholder);
				});
			}
		}
	});
	$.subscribe('pageReady ajaxLoaded', function () {
		bb.checkboxReplace.init();
	});
}(jQuery));
