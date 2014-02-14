var bb = bb ? bb : {};
$.extend(bb,{
	// reusable site resize function
	resize: {
		bb: null,
		resizeTimeout: null,
		setGlobal: function (bb) {
			var self = this;
			self.bb = bb;
		},
		init: function() {
			var self = this;
			self.bb.settings.$window.on('resize.bbResize', function() {
				self.clearResizeTimeout();
				self.resizeTimeout = setTimeout(function(){
					self.resizeFinished();
				}, 500);
			});
		},
		clearResizeTimeout: function() {
			var self = this;
			if(self.resizeTimeout) {
				clearTimeout(self.resizeTimeout);
			}
		},
		resizeFinished: function() {
			var self = this;

			self.clearResizeTimeout();
			$.publish('resizeFinish');
		}
	}
});
$.subscribe('setGlobal', function (e, bb) {
	bb.resize.setGlobal(bb);
});
$.subscribe('pageReady', function () {
	bb.resize.init();
});
