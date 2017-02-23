/**
 * @file Last Block
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	$.extend(bb, {
		/**
		 * Last block in a row.
		 * @namespace lastBlock
		 */
		lastBlock: {
			// jQuery DOM objs
			$blockContainers: null,
			$currentBlockContainer: null,
			// CSS selectors
			blockSelector: '.block',
			containerSelector: '.region-inner',
			lastClass: 'block--last',
			ieLastClass: 'block--last--clear',
			// Configuration
			processing: false,
			roundingOffset: 3,
			/**
			 * Initialises last block module, caches jQuery DOM objects.
			 * @function init
			 * @memberOf lastBlock
			 */
			init: function() {
				var self = this;

				self.$blockContainers = $(self.containerSelector);

				if (!self.$blockContainers) {
					return false;
				}

				self.startProcessing(false);
			},
			/**
			 * Starts processing of blocks and logs start time.
			 * @function startProcessing
			 * @memberOf lastBlock
			 * @param {Boolean} [forceBuild] - whether or not to force a rebuild of blocks.
			 */
			startProcessing: function(forceBuild) {
				var self = this;

				console.time('Processing last blocks');

				self.processing = true;

				if (self.processing || self.$blockContainers.length < 1) {
					self.stopProcessing();
				}

				if (forceBuild) {
					$(self.blockSelector).removeClass(self.lastClass);

					if (bb.ltIE(8)) {
						$('.' + self.ieLastClass).remove();
					}
				}

				self.$blockContainers.each(function() {
					var $blockContainer = $(this),
						$blocks = $blockContainer.find(self.blockSelector),
						blocksLength = $blocks.length,
						blockContainerWidth = null;

					if (blocksLength < 1) {
						self.stopProcessing();
					}

					blockContainerWidth = ($blockContainer.width() - self.roundingOffset);

					self.processBlocks($blocks, blockContainerWidth);
				});
			},
			/**
			 * Stops processing of blocks and logs end time.
			 * @function stopProcessing
			 * @memberOf lastBlock
			 */
			stopProcessing: function() {
				var self = this;

				console.timeEnd('Processing last blocks');

				self.processing = false;

				return false;
			},
			/**
			 * Processes blocks, pushing the last block in a row into setLastBlock.
			 * @function processBlocks
			 * @memberOf lastBlock
			 * @param {Obj} $blocks - jQuery DOM objects of elements to calculate widths from.
			 * @param {Number} blockContainerWidth - max width of containing element to calculate widths from.
			 */
			processBlocks: function($blocks, blockContainerWidth) {
				var self = this;

				if (!$blocks || !blockContainerWidth) {
					self.stopProcessing();
				}

				$blocks.each(function() {
					var $block = $(this);

					if ($block.hasClass('pull-right') || $block.hasClass('block-alt')) {
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
			/**
			 * Adds CSS class to last block, plus fallbackfor ltIE8.
			 * @function setLastBlock
			 * @memberOf lastBlock
			 * @param {Obj} $block - jQuery DOM object of element to add class to.
			 */
			setLastBlock: function($block) {
				var self = this;

				if (!$block) {
					return false;
				}

				$block.addClass(self.lastClass);

				if (bb.ltIE(8)) {
					$block.after('<div />', {
						'class': self.ieLastClass
					});
				}
			}
		}
	});
	// Subscribe to published events
	$.subscribe('pageReady ajaxLoaded', function() {
		bb.lastBlock.init();
	});
	$.subscribe('viewportResizeEnd', function() {
		bb.lastBlock.startProcessing(true);
	});
}(jQuery));
