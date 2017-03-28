var bb = bb ? bb : {};
(function($) {
	$.subscribe('pageReady ajaxLoaded', function() {
		if (typeof picturefill === 'function') {
			// console.log('picturefill');
			picturefill();
		}
	});
}(jQuery));