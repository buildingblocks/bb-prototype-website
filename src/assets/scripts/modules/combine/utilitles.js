var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		getUrlParams: function(queryString) {
			var params = {};
			if (queryString) {
				var queryStringArray = queryString.split('&');
				for (var index in queryStringArray) {
					var query = queryStringArray[index].split('=');
					params[decodeURIComponent(query[0])] = decodeURIComponent(query[1]);
				}
			}
			return params;
		},
		setUrlParams: function() {
			var self = this;
			self.settings.urlParams = self.getUrlParams(window.location.search);
		},
		// use for debugging/logging
		log: function(content) {
			if (typeof(console) !== "undefined") {
				console.log(content);
			}
		},
		htmlEncode: function(value) {
			if (value) {
				return $('<div />').text(value).html();
			} else {
				return '';
			}
		},
		htmlDecode: function(value) {
			if (value) {
				return $('<div />').html(value).text();
			} else {
				return '';
			}
		},
		// get IE version from classname (acceptable values: 10,9,8 or 7)
		ltIE: function(version) {
			var self = this;
			if (self.settings.$html.hasClass('lt-ie' + version)) {
				return true;
			} else {
				return false;
			}
		},
		browserPrefix: function() {
			var self = this,
				styles = window.getComputedStyle(window.document.documentElement, ''),
				prefix = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o']))[1],
				dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + prefix + ')', 'i'))[1];
			self.settings.browserPrefix = '-' + prefix + '-';
		},
		transitionAnimationEndEvent: function() {
			var self = this,
				transition, transitions, animation, animations, element = window.document.createElement('transitionAnimationElement');
			transitions = {
				'WebkitTransition': 'webkitTransitionEnd',
				'MozTransition': 'transitionend',
				'MSTransition': 'msTransitionEnd',
				'OTransition': 'oTransitionEnd',
				'transition': 'transitionend'
			};
			animations = {
				'WebkitAnimation': 'webkitAnimationEnd',
				'MozAnimation': 'animationend',
				'MSAnimation': 'msAnimationEnd',
				'OAnimation': 'oAnimationEnd',
				'animation': 'animationend'
			};
			for (transition in transitions) {
				if (element.style[transition] !== undefined) {
					self.settings.transitionEnd = transitions[transition];
				}
			}
			// is it null?
			if (self.settings.transitionEnd === null) {
				self.settings.transitionEnd = 'noTransitionEnd';
			}
			for (animation in animations) {
				if (element.style[animation] !== undefined) {
					self.settings.animationEnd = animations[animation];
				}
			}
			// is it null?
			if (self.settings.animationEnd === null) {
				self.settings.animationEnd = 'noAnimationEnd';
			}
			self.settings.transitionAnimationEnd = (self.settings.transitionEnd + ' ' + self.settings.animationEnd).toString();
		},
		textDirection: function() {
			var self = this,
				direction = self.settings.$html.attr('dir');
			if(direction === 'rtl') {
				self.settings.rtl = true;
			}
		}
	});
	$.subscribe('pageReady', function () {
		bb.textDirection();
		bb.browserPrefix();
		bb.transitionAnimationEndEvent();
		bb.setUrlParams();
	});
}(jQuery));
