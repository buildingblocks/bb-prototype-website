// Apple devices & iOS
Modernizr.addTest('ipad', function () {
	return !!navigator.userAgent.match(/iPad/i);
});
Modernizr.addTest('iphone', function () {
	return !!navigator.userAgent.match(/iPhone/i);
});
Modernizr.addTest('ipod', function () {
	return !!navigator.userAgent.match(/iPod/i);
});
Modernizr.addTest('ios', function () {
	return (Modernizr.ipad || Modernizr.ipod || Modernizr.iphone);
});
// Windows Phone
Modernizr.addTest('windowsphone', function () {
	return !!navigator.userAgent.match(/(Windows Phone)/);
});
// Android OS
Modernizr.addTest('android', function () {
	return !!navigator.userAgent.match(/(Android)/);
});
// Mac OS
Modernizr.addTest('macos', function () {
	return !!navigator.userAgent.match(/(Mac OS)/);
});
