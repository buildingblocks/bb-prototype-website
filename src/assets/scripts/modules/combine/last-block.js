var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		// last block in a row
		lastBlock: {
			bb: bb,
			$blockContainers: null,
			blockSelector: '.block',
			lastClass: 'block-last',
			ieLastClass: 'block-last-clear',
			$currentBlockContainer: null,
			processing: false,
			roundingOffset: 3,
			setGlobal: function (bb) {
				var self = this;
				self.bb = bb;
			},
			init: function() {
				var self = this;
				self.$blockContainers = $('.region-inner');
				if (!self.$blockContainers) {
					return false;
				}
				self.startProcessing(false);
			},
			stopProcessing: function() {
				var self = this;
				console.timeEnd('Processing last blocks');
				self.processing = false;
				return false;
			},
			startProcessing: function(forceBuild) {
				var self = this;
				console.time('Processing last blocks');
				self.processing = true;
				if (self.processing || self.$blockContainers.length < 1) {
					self.stopProcessing();
				}
				if (forceBuild) {
					$(self.blockSelector).removeClass(self.lastClass);
					if (self.bb.ltIE(8)) {
						$('.' + self.ieLastClass).remove();
					}
				}
				self.$blockContainers.each(function(i) {
					var $blockContainer = $(this),
						$blocks = $blockContainer.find(self.blockSelector),
						//$blocks = $(),
						blocksLength = $blocks.length,
						blockContainerWidth = null;
					if (blocksLength < 1) {
						self.stopProcessing();
					}
					blockContainerWidth = ($blockContainer.width() - self.roundingOffset);
					self.processBlocks($blocks, blockContainerWidth);
				});
			},
			processBlocks: function($blocks, blockContainerWidth) {
				var self = this;
				if (!$blocks || !blockContainerWidth) {
					self.stopProcessing();
				}
				$blocks.each(function(i) {
					var $block = $(this);
					if ($block.hasClass('pull-right')) {
						return true;
					}
					var outerWidth = parseInt($block.quickOuterWidth(true), 10);
					if (outerWidth >= blockContainerWidth) {
						self.setLastBlock($block);
						return true;
					}
					var positionLeft = parseInt($block.position().left, 10),
						positionRight = Math.round(blockContainerWidth - parseInt(positionLeft + outerWidth, 10));
					if (positionRight > self.roundingOffset) {
						return true;
					}
					self.setLastBlock($block);
				});
				self.stopProcessing();
			},
			setLastBlock: function($block) {
				var self = this;
				if (!$block) {
					return false;
				}
				$block.addClass(self.lastClass);
				if (self.bb.ltIE(8)) {
					$block.after('<div />', {
						'class': self.ieLastClass
					});
				}
			}
		}
	});
	$.subscribe('setGlobal', function (event, bb) {
		bb.lastBlock.setGlobal(bb);
	});
	$.subscribe('pageReady', function () {
		bb.lastBlock.init();
	});
	$.subscribe('viewportResizeEnd', function () {
		bb.lastBlock.startProcessing(true);
	});
	$.subscribe('ajaxLoaded', function () {
		bb.lastBlock.startProcessing(true);
	});
}(jQuery));
