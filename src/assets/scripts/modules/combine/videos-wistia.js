var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		videosWistia: {
			bb: bb,
			videoSelector: '.video-wistia',
			$videos: null,
			setGlobal: function (bb) {
				var self = this;
				self.bb = bb;
			},
			preInit: function () {
				var self = this;
				self.$videos = $(self.videoSelector);
				Modernizr.load({
                    test: self.$videos.length,
                    yep: '//fast.wistia.net/static/iframe-api-v1.js',
                    complete: function() {
                        self.init();
                    }
                });
			},
			init: function() {
				var self = this;
			}
		}
	});
	$.subscribe('setGlobal', function (event, bb) {
		bb.lastBlock.setGlobal(bb);
	});
	$.subscribe('pageReady', function () {
		bb.videosWistia.preInit();
	});
}(jQuery));
