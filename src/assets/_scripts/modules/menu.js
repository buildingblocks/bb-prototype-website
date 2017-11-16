var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		/**
		 * Menu related methods.
		 * @namespace menu
		 */
		menu: {
			// jQuery DOM caching
			$handle: null,
			// CSS selectors
			menuInClass: 'menu-in',
			/**
			 * Initialises menu module. Caches jQuery DOM objects.
			 * @function init
			 * @memberof menu
			 */
			init: function() {
				const self = this;
				self.$handle = $('.action-menu');

				self.$handle.on('click.menu', (event) => {
					event.preventDefault();
					if (_buildingBlocks.settings.$html.hasClass(self.menuInClass)) {
						self.closeMenu();
					} else {
						self.openMenu();
					}
				});
			},
			/**
			 * Adds CSS class to <html>, showing menu.
			 * @function openMenu
			 * @memberof menu
			 */
			openMenu: function() {
				var self = this;
				_buildingBlocks.settings.$html.addClass(self.menuInClass);
			},
			/**
			 * Removes CSS class from <html>, hiding menu.
			 * @function closeMenu
			 * @memberof menu
			 */
			closeMenu: function() {
				var self = this;
				_buildingBlocks.settings.$html.removeClass(self.menuInClass);
			}
		}
	});
	$.subscribe('pageReady', function() {
		_buildingBlocks.menu.init();
	});
}(jQuery));
