var bb = bb ? bb : {};
(function ($) {
	$.extend(bb, {
		menu: {
			$handle : null,
			menuInClass : 'menu-in',
			init: function () {
				var self = this;
				self.$handle = $('.action-menu');
				self.$handle.on('click.menu', function (event) {
					event.preventDefault();
					if (bb.settings.$html.hasClass(self.menuInClass)) {
						self.closeMenu(event);
					} else {
						self.openMenu(event);
					}
				});
			},
			openMenu: function () {
				var self = this;
				bb.settings.$html.addClass(self.menuInClass);
			},
			closeMenu: function () {
				var self = this;
				bb.settings.$html.removeClass(self.menuInClass);
			}
		}
	});
	$.subscribe('pageReady', function () {
		bb.menu.init();
	});
}(jQuery));
