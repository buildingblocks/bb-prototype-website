/**
 * @file Menu
 * @version 1.0.0
 * @author {@link https://github.com/buildingblocks Building Blocks}
 */

var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		/**
        * Menu related methods.
        * @namespace menu
        */
		menu: {
			bb : null,
			$handle : null,
			menuInClass : 'menu-in',
			setGlobal: function (bb) {
				var self = this;
				self.bb = bb;
			},
			init : function () {
				var self = this;
				self.$handle = $('.action-menu');
				self.$handle.on('click.menu', function (event) {
					event.preventDefault();
					if (self.bb.settings.$html.hasClass(self.menuInClass)) {
						self.closeMenu(event);
					} else {
						self.openMenu(event);
					}
				});
			},
			openMenu : function (event) {
				var self = this;
				self.bb.settings.$html.addClass(self.menuInClass).removeClass(self.bb.search.searchInClass);
			},
			closeMenu : function (event) {
				var self = this;
				self.bb.settings.$html.removeClass(self.menuInClass);
			}
		}
	});
	$.subscribe('setGlobal', function (event, bb) {
		bb.menu.setGlobal(bb);
	});
	$.subscribe('pageReady', function () {
		bb.menu.init();
	});
}(jQuery));
