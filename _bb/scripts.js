var bb = {
	responsiveTest : {
		bb: null,
		$framesContainer: null,
		$frames: null,
		$files: null,
		$options: null,
		currentUrl: null,
		init: function () {
			var self = this;
			self.$framesContainer = $('#responsive_frames');
			self.$frames = self.$framesContainer.find('.responsive-frame');
			self.$files = $('#responsive_files');
			self.$options = $('#responsive_options');
			// calculate the container width
			self.setContainerWidth();
			// event handler for html file select dropdown
			self.$files.on('change.responsiveTest', function (event) {
				var $select = $(this),
					url = $select.find('option:selected').val();
				self.loadFile(url);
			});
			// load event for each iframe
			self.$frames.find('iframe').on('load.responsiveTest', function () {
				var $frame = $(this);
				self.frameLoaded($frame);
			});
			//add event handlers for options radio buttons
			self.$options.on('change.responsiveTest', 'input', function () {
				var id = $('input[type=radio]:checked').attr('id');
				if (id === 'responsive_option_width') {
					self.$framesContainer.addClass('responsive-width-only');
				} else {
					self.$framesContainer.removeClass('responsive-width-only');
				}
			});
			// load from query string?
			var qsArray = window.location.href.split('?'),
				qs = qsArray[qsArray.length - 1];
			if (qs && qsArray.length > 1) {
				self.loadFile(qs);
			}
		},
		setContainerWidth : function () {
			var self = this;
			//set slidable div width
			$('.responsive-frames-inner').css('width', function () {
				var width = 0;
				self.$frames.each(function () {
					width += $(this).outerWidth(true);
				});
				return width;
			});
		},
		loadFile: function (url) {
			var self = this;
			if (url === self.currentUrl) {
				return;
			}
			self.currentUrl = url;
			// add loading class
			self.$frames.closest('.responsive-frame').addClass('loading');
			// change src
			self.$frames.find('iframe').attr('src', url);
			self.$files.find('option:selected').removeAttr('selected');
			self.$files.find('option[value="'+url+'"]').attr('selected','selected');
			// change url
			window.history.pushState(null, null, '?' + url);
		},
		frameLoaded: function ($frame) {
			var self = this,
				$parent = $frame.closest('.responsive-frame');
			// remove loading class
			$parent.removeClass('loading');
		}
	},
	pageReady: function (){
		var self = this;
		self.responsiveTest.init();
	}
};
(function() {
	var init = (bb !== undefined) ? bb.pageReady() : null;
}());
