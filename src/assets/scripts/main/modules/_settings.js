var bb = bb ? bb : {};
$.extend(bb,{
	settings: {
		// cache some common variables
		$window: $(window),
		$html: $('html'),
		$body: $('body'),
		$htmlbody: $('html,body'),
		$page: $('#page'),
		$header: $('#header'),
		$main: $('#main'),
		$footer: $('#footer'),
		rtl: false,
		// stored URL params (empty to begin with)
		urlParams: {},
		// class to use on
		processedClass: 'processed',
		browserPrefix: null,
		transitionEnd: null,
		animationEnd: null,
		transitionAnimationEnd: null,
		// store processing of last component globally
		processinglastComponent: false,
		// breakpoint variables (should match variables.less)
		breakPointA: 320,
		breakPointB: 480,
		breakPointC: 600,
		breakPointD: 768,
		breakPointE: 1024,
		breakPointF: 1200
	}
});
