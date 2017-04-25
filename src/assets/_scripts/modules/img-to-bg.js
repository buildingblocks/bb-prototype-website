var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		imgToBg: {
            // DOM Objects
            _ImgToBg: null,
            // Selectors
            imgToBgSelector: '.img-to-bg',
            // Classes
            processedClass: 'img-to-bg-complete',
            // Misc
			init: function() {
				var self = this;

                self._ImgToBg = document.querySelectorAll(self.imgToBgSelector);
                if (!self._ImgToBg) {
                    return;
                }

                for (var i = 0; i < self._ImgToBg.length; i++) {
                    var _ImgContainer = self._ImgToBg[i];
                    self.processImg(_ImgContainer);
                }
			},
            processImg: function (_ImgContainer) {
                var self = this;

                if (!_ImgContainer) {
                    return;
                }

                var width = self.getImgSML();
                var dataLrg = _ImgContainer.getAttribute('data-background-image-lrg');
                var dataMed = _ImgContainer.getAttribute('data-background-image-med');
                var dataSmall = _ImgContainer.getAttribute('data-background-image-small');
                var img = null;

                if (!dataLrg || !dataMed || !dataSmall || !width) {
                    return;
                }

                switch (width) {
                    case 'S':
                        img = dataSmall;
                        break;
                    case 'M':
                        img = dataMed;
                        break;
                    case 'L':
                        img = dataLrg;
                        break;
                    default:
                        console.log('imgToBg - something went wrong');
                        return;
                }

                _ImgContainer.style.backgroundImage = 'url(' + img + ')';
                _ImgContainer.classList.add(self.processedClass);
            },
            getImgSML: function () {
                var self = this;

                var currentBP = bb.monitorMq.currentBreakpoint;
                if (currentBP < bb.settings.breakPointD) {
                    return 'S';
                } else if (currentBP < bb.settings.breakPointF && currentBP >= bb.settings.breakPointD) {
                    return 'M';
                } else {
                    return 'L';
                }
            },
            resizeEvent: function () {
                var self = this;

                self._ImgToBg = document.querySelectorAll(self.imgToBgSelector);
                if (!self._ImgToBg) {
                    return;
                }

                for (var i = 0; i < self._ImgToBg.length; i++) {
                    var _ImgContainer = self._ImgToBg[i];
                    _ImgContainer.classList.remove(self.processedClass);
                    self.processImg(_ImgContainer);
                }
            }
		}
	});
	$.subscribe('pageReady', function() {
		bb.imgToBg.init();
	});
    $.subscribe('viewportResizeEnd', function() {
		bb.imgToBg.resizeEvent();
	});
    $.subscribe('ajaxLoaded', function() {
		bb.imgToBg.resizeEvent();
	});
}(jQuery));
