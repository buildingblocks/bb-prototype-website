(function($) {
	jQuery.fn.quickOuterWidth = function(includeMargin) {
		var elem = this.get(0),
			width = elem.offsetWidth;
		if (includeMargin && window.getComputedStyle) {
			var computedStyle = window.getComputedStyle(elem, null);
			width = width + (parseInt(computedStyle.getPropertyValue('margin-left'), 10) || 0) + (parseInt(computedStyle.getPropertyValue('margin-right'), 10) || 0);
		} else if (includeMargin) {
			width = width + (parseInt(elem.currentStyle["marginLeft"]) || 0) + (parseInt(elem.currentStyle["marginRight"]) || 0);
		}
		return width;
	};
}(jQuery));
