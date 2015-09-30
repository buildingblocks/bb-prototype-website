if (Modernizr) {
	// Apple devices & iOS
	Modernizr.addTest('ipad', function() {
		return !!navigator.userAgent.match(/iPad/i);
	});
	Modernizr.addTest('iphone', function() {
		return !!navigator.userAgent.match(/iPhone/i);
	});
	Modernizr.addTest('ipod', function() {
		return !!navigator.userAgent.match(/iPod/i);
	});
	Modernizr.addTest('ios', function() {
		return (Modernizr.ipad || Modernizr.ipod || Modernizr.iphone);
	});
	// IE10
	Modernizr.addTest('ie10', function() {
		var trident = !!navigator.userAgent.match(/Trident\/6.0/);
		var ie = !!navigator.userAgent.match(/MSIE 10/);
		return trident && ie;
	});
	// IE11
	Modernizr.addTest('ie11', function() {
		var trident = !!navigator.userAgent.match(/Trident\/7.0/);
		var net = !!navigator.userAgent.match(/.NET4.0C/ || /.NET4.0E/);
		return trident && net;
	});
	// Safari
	Modernizr.addTest('safari', function() {
		var safari = !!navigator.userAgent.match(/Safari\//);
		var chrome = !!navigator.userAgent.match(/Chrome\//);
		return safari && !chrome;
	});
	// Windows Phone
	Modernizr.addTest('windowsphone', function() {
		return !!navigator.userAgent.match(/(Windows Phone)/);
	});
	// Android OS
	Modernizr.addTest('android', function() {
		return !!navigator.userAgent.match(/(Android)/);
	});
	// Mac OS
	Modernizr.addTest('macos', function() {
		return !!navigator.userAgent.match(/(Mac OS)/);
	});
}
