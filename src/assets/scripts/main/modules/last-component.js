var bb = bb ? bb : {};
$.extend(bb,{
	// last component in a row
	lastComponent: {
		bb: bb,
		$moduleContainers: null,
		moduleSelector: '.block',
		lastClass: 'block-last',
		ieLastClass: 'block-last-clear',
		$currentModuleContainer: null,
		processing: false,
		roundingOffset: 3,
		setGlobal: function (bb) {
			var self = this;
			self.bb = bb;
		},
		init: function() {
			var self = this;
			self.$moduleContainers = $('.region-inner');
			if (!self.$moduleContainers) {
				return false;
			}
			self.startProcessing(false);
		},
		stopProcessing: function() {
			var self = this;
			console.timeEnd('Processing last components');
			self.processing = false;
			return false;
		},
		startProcessing: function(forceBuild) {
			var self = this;
			console.time('Processing last components');
			self.processing = true;
			if (self.processing || self.$moduleContainers.length < 1) {
				self.stopProcessing();
			}
			if (forceBuild) {
				$(self.moduleSelector).removeClass(self.lastClass);
				if (self.bb.ltIE(8)) {
					$('.' + self.ieLastClass).remove();
				}
			}
			self.$moduleContainers.each(function(i) {
				var $moduleContainer = $(this),
					$modules = $moduleContainer.find(self.moduleSelector),
					//$modules = $(),
					modulesLength = $modules.length,
					moduleContainerWidth = null;
				if (modulesLength < 1) {
					self.stopProcessing();
				}
				moduleContainerWidth = ($moduleContainer.width() - self.roundingOffset);
				self.processModules($modules, moduleContainerWidth);
			});
		},
		processModules: function($modules, moduleContainerWidth) {
			var self = this;
			if (!$modules || !moduleContainerWidth) {
				self.stopProcessing();
			}
			$modules.each(function(i) {
				var $module = $(this);
				if ($module.hasClass('pull-right')) {
					return true;
				}
				var outerWidth = parseInt($module.quickOuterWidth(true), 10);
				if (outerWidth >= moduleContainerWidth) {
					self.setLastModule($module);
					return true;
				}
				var positionLeft = parseInt($module.position().left, 10),
					positionRight = Math.round(moduleContainerWidth - parseInt(positionLeft + outerWidth, 10));
				if (positionRight > self.roundingOffset) {
					return true;
				}
				self.setLastModule($module);
			});
			self.stopProcessing();
		},
		setLastModule: function($module) {
			var self = this;
			if (!$module) {
				return false;
			}
			$module.addClass(self.lastClass);
			if (self.bb.ltIE(8)) {
				$module.after('<div />', {
					'class': self.ieLastClass
				});
			}
		}
	}
});
$.subscribe('setGlobal', function (event, bb) {
	bb.lastComponent.setGlobal(bb);
});
$.subscribe('pageReady', function () {
	// init custom
	bb.lastComponent.init();
});
$.subscribe('resizeFinished', function () {
	bb.lastComponent.startProcessing(true);
});
$.subscribe('ajaxLoaded', function () {
	bb.lastComponent.startProcessing(true);
});
