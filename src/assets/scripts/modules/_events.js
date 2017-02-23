/**
 * @file Events
 * @author {@link http://building-blocks.com Building Blocks}
 */
var bb = bb ? bb : {};
(function($) {
	/**
	 * Publish events using Pub/Sub
	 * @namespace events
	 * @see {@link https://github.com/cowboy/jquery-tiny-pubsub}
	 */
	$.extend(bb, {
		/**
		 * Publish event when the page is ready.
		 * @function pageReady
		 */
		pageReady: function() {
			var self = this;

			$.publish('pageReady_prioritize', self);
			$.publish('pageReady', self);

			self.pageLoaded();
		},
		/**
		 * Publish event when the page has loaded.
		 * @function pageLoaded
		 */
		pageLoaded: function() {
			var self = this;

			self.settings.$window.on('load', function() {

				$.publish('pageLoaded', self);
			});
		},
		/**
		 * Publish event when an AJAX request has finished.
		 * @function ajaxLoaded
		 */
		ajaxLoaded: function() {
			var self = this;

			$.publish('ajaxLoaded', self);
		}
	});
}(jQuery));
