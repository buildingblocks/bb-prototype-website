/**
 * @file Menu module
 * @author {@link http://buildingblocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
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
				var self = this;
				self.$handle = $('.action-menu');
				self.$handle.on('click.menu', function(event) {
					event.preventDefault();
					if (bb.settings.$html.hasClass(self.menuInClass)) {
						self.closeMenu(event);
					} else {
						self.openMenu(event);
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
				bb.settings.$html.addClass(self.menuInClass);
			},
			/**
			 * Removes CSS class from <html>, hiding menu.
			 * @function closeMenu
			 * @memberof menu
			 */
			closeMenu: function() {
				var self = this;
				bb.settings.$html.removeClass(self.menuInClass);
			}
		}
	});
	$.subscribe('pageReady', function() {
		bb.menu.init();
	});
}(jQuery));
