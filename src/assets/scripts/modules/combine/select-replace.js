/**
 * @file Select replace
 * @author {@link http://buildingblocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Select replace related methods.
		 * @namespace selectReplace
		 */
		selectReplace: {
			// CSS Selectors
			processedClass: 'processed',
			numberSpinnerSelector: '.number-spinner',
			/**
			 * Initialises select replace module. Processes <select>s. Creates `.select-replace` markup. Binds events.
			 * @function init
			 * @memberof menu
			 */
			init: function() {
				var self = this;

				if (bb.ltIE(9)) {
					return;
				}

				var $selects = $('select:not(.' + self.processedClass + '):not([multiple])');

				$selects.each(function() {
					var $select = $(this),
						$numberSpinner = $select.closest(self.numberSpinnerSelector),
						id = $select.attr('id');

					if ($numberSpinner.length) {
						var $numberLabel = $('<span />', {
							'for': $select.attr('id'),
							'class': 'number-spinner-label'
						});

						$select.before($numberLabel);

						var val = $select.find('option:selected').text();

						$numberLabel.text(val);

						$select.on('change.selectReplace', function() {
							var val = $select.find('option:selected').text();
							$numberLabel.text(val);
						});
					} else {
						var classes = $select.attr('class') ? $select.attr('class') : '',
							$wrapper = $('<span />', {
								'class': 'select-replace ' + classes
							});

						$select.removeAttr('class').wrap($wrapper);
					}

					if (id) {
						var $label = $('label[for="' + id + '"]');

						if ($label) {
							$label.on('click.selects', function(event) {
								$select.trigger('click');
								event.preventDefault();
							});
						}
					}

					$select.addClass(self.processedClass);
				});
			}
		}
	});
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.selectReplace.init();
	});
}(jQuery));
