/**
 * @file Shapes module
 * @author {@link mailto:d.furze@building-blocks.com Daniel Furze}
 */
 var bb = bb ? bb : {};
 (function ($) {
 	$.extend(bb, {
		/**
        * Shapes related methods.
        * @namespace shapes
        */
        shapes: {
			// jQuery DOM caching
			$container : null,
			// Configuration
			shapeColors: null,
			triangleClasses: null,
			/**
			* Initialises shapes module. Caches jQuery DOM objects. Sets configuration objects.
			* @function init
			* @memberof shapes
			*/
			init: function () {
				var self = this;

				self.$container = $('.shapes-container');

				self.bounds = {
					height: self.$container.height(),
					width: self.$container.width()
				};

				self.shapeColors = [
				'shape-color-a',
				'shape-color-b',
				'shape-color-c',
				'shape-color-d'
				];

				self.triangleClasses = [
				'triangle-up',
				'triangle-right',
				'triangle-down',
				'triangle-left'
				];

				self.buildCircles(5);
				self.buildRectangles(5);
				self.buildSquares(5);
				self.buildTriangles(5);
			},
			/**
			* Returns a random number from bounds.
			* @function getRandom
			* @memberof shapes
			* @param {Int} max
			* @returns {Int} random
			*/
			getRandom: function (min, max) {
				var random = Math.floor(Math.random() * max) + min;

				return random;
			},
			/**
			* Builds circles of random size and position.
			* @function buildCircles
			* @memberof shapes
			* @param {Int} total
			*/
			buildCircles: function (total) {
				var self = this;

				for (var i = 0; i < total; i++) {
					var $shape = $('<div />', {
						'class': 'shape circle ' + self.shapeColors[self.getRandom(0, self.shapeColors.length)]
					});

					var height = self.getRandom(5, 20),
					width = height;

					$shape.css({
						height: height,
						width: width
					});

					self.positionShape($shape);
				}
			},
			/**
			* Builds rectangles of random size and position.
			* @function buildRectangles
			* @memberof shapes
			* @param {Int} total
			*/
			buildRectangles: function (total) {
				var self = this;

				for (var i = 0; i < total; i++) {
					var $shape = $('<div />', {
						'class': 'shape rectangle ' + self.shapeColors[self.getRandom(0, self.shapeColors.length)]
					});

					var height = self.getRandom(5, 20),
					width = self.getRandom(5, 60);

					$shape.css({
						height: height,
						width: width
					});

					self.positionShape($shape);
				}
			},
			/**
			* Builds squares of random size and position.
			* @function buildRectangles
			* @memberof shapes
			* @param {Int} total
			*/
			buildSquares: function (total) {
				var self = this;

				for (var i = 0; i < total; i++) {
					var $shape = $('<div />', {
						'class': 'shape ' + self.shapeColors[self.getRandom(0, self.shapeColors.length)]
					});

					var height = self.getRandom(5, 20),
					width = height;

					$shape.css({
						height: height,
						width: width
					});

					self.positionShape($shape);
				}
			},
			/**
			* Builds triangles of random size and position.
			* @function buildTriangles
			* @memberof shapes
			* @param {Int} total
			*/
			buildTriangles: function (total) {
				var self = this;

				for (var i = 0; i < total; i++) {
					var $shape = $('<div />', {
						'class': 'shape triangle ' + self.triangleClasses[self.getRandom(0, self.triangleClasses.length)] + ' ' + self.shapeColors[self.getRandom(0, self.shapeColors.length)]
					});

					var height = self.getRandom(5, 20),
					width = height;

					$shape.css({
						'border-width': width
					});

					self.positionShape($shape);
				}
			},
			/**
			* Randomly positions shapes and appends to container.
			* @function positionShape
			* @memberof shapes
			* @param {Obj} $shape
			*/
			positionShape: function ($shape) {
				var self = this;

				var top = self.getRandom(50, self.bounds.height),
				left = self.getRandom(50, self.bounds.width),
				rotation = self.getRandom(0, 360);

				$shape.css({
					display: 'block',
					top: top + 'px',
					left: left + 'px',
					transform: 'rotate(' + rotation + 'deg)',
				});

				self.$container.append($shape);
			}
		}
	});
$.subscribe('pageReady', function () {
	bb.shapes.init();
});
}(jQuery));
