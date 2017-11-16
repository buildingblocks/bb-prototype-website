var _buildingBlocks = _buildingBlocks ? _buildingBlocks : {};
(function($) {
	$.extend(_buildingBlocks, {
		/**
		 * Show and hide alerts
		 * @namespace alerts
		 */
		alerts: {
			alertWaitTime: 300,
			alertsInClass: 'flash-alerts--in',
			alertInClass: 'alert--in',
			alertOutClass: 'alert--out',
			alertShowClass: 'alert--show',
			alertHideShowClass: 'alert-hide-show',
			$alertsContainer: $('.flash-alerts'),
			/**
			 * Initialises alerts module.
			 * @function init
			 * @memberof alert
			 */
			init: function() {
				var self = this;

				self.$alertsContainer = $('.flash-alerts');

				var $alerts = self.$alertsContainer.find('.alert:not(.' + self.alertInClass + ')');
				if ($alerts.length > 0 && !$alerts.hasClass(self.alertHideShowClass)) {
					self.showAlerts();
				}
				self.$alertsContainer.on('click.alerts', '.alert--dismiss', function(event) {
					self.hideAlert($(this).closest('.alert'));
					event.preventDefault();
				});
				self.formAlerts();
			},
			showContainer: function() {
				var self = this;
				self.$alertsContainer.addClass(self.alertsInClass);
			},
			hideContainer: function() {
				var self = this;
				self.$alertsContainer.removeClass(self.alertsInClass);
			},
			addAlert: function(alertID) {
				var self = this,
					$alert = $('#' + alertID),
					$clone = $alert.clone().removeAttr('id').attr('data-id', alertID);
				if (self.$alertsContainer.find('[data-id=' + alertID + ']').length < 1) {
					self.hideAlerts();
					self.$alertsContainer.find('.flash-alerts-inner').prepend($clone);
					self.showAlerts();
				}
			},
			hideAlerts: function() {
				var self = this,
					$alerts = self.$alertsContainer.find('.alert');
				if ($alerts.length === 0) {
					return false;
				}
				$alerts.each(function(index) {
					var $alert = $(this),
						alertWait;
					alertWait = window.setTimeout(function() {
						self.hideAlert($alert);
						window.clearTimeout(alertWait);
					}, self.alertWaitTime * index);
				});
			},
			hideAlert: function($alert) {
        var self = this;
				if ($alert.length > 0) {

					if (Modernizr.cssanimations) {
						if ($alert.hasClass(self.alertHideShowClass)) {
							$alert.removeClass(self.alertInClass).addClass(self.alertOutClass);
						} else {
							$alert.on(_buildingBlocks.settings.animationEnd, function() {
								$(this).remove();
							}).removeClass(self.alertInClass).addClass(self.alertOutClass);
						}
					} else {
						if ($alert.hasClass(self.alertHideShowClass)) {
							$alert.removeClass(self.alertInClass).addClass(self.alertOutClass);
						} else {
							$alert.removeClass(self.alertInClass).addClass(self.alertOutClass);
							$alert.each(function() {
								$(this).remove();
							});
						}
					}
					if (self.$alertsContainer.find('.alert').length < 1) {
						self.$alertsContainer.removeClass(self.alertsInClass);
					}
				}
			},
			showAlerts: function() {
				var self = this,
					$alerts = self.$alertsContainer.find('.alert:not(.' + self.alertInClass + ')'),
					$hideShowAlerts = self.$alertsContainer.find('.' + self.alertHideShowClass);

				if ($hideShowAlerts.length > 0) {
					$hideShowAlerts.removeClass(self.alertOutClass).addClass(self.alertInClass);
				}

				if ($alerts.length === 0) {
					return false;
				}
				self.showContainer();

				$alerts.reverse().each(function(i) {
					var $alert = $(this),
						timeout = $alert.data('timeout'),
						//in seconds
						alertWait, timeoutWait;
					$alert.addClass(self.alertShowClass);
					alertWait = window.setTimeout(function() {
						$alert.addClass(self.alertInClass);
						if (timeout && timeout > 0) {
							timeoutWait = window.setTimeout(function() {
								self.hideAlert($alert);
								window.clearTimeout(timeoutWait);
							}, timeout * 1000); //convert to miliseconds
						}
						window.clearTimeout(alertWait);
					}, self.alertWaitTime * i);
				});
			},
			formAlerts: function() {
				var self = this,
					$forms = $('[data-alert]:not(.processed)');
				$forms.each(function() {
					var $this = $(this),
						alertID = $this.data('alert'),
						$inputs = $this.find('select,input,textarea').not('[data-alert-ignore]'),
						inputs = 'select,input,textarea';
					$this.addClass('processed');
					$this.on('change.alerts remove.alerts', $inputs, function() {
						var $input = $(this);
						if ($input.is('[data-alert-ignore]')) {
							return false;
						}
						self.addAlert(alertID);
					});
				});
			},
			showAlert: function(type, message, alertUrl) {
				var self = this;
				var flashUrl = alertUrl + '?type=' + encodeURIComponent(type) + '&text=' + encodeURIComponent(message);

				var flashContent = $.get(flashUrl, function(data) {
					self.$alertsContainer.find('.flash-alerts-inner').append(data);
					self.showAlerts();
					self.showContainer();
				});
			}
		}
	});
	$.subscribe('pageReady', function() {
		_buildingBlocks.alerts.init();
	});
	$.subscribe('ajaxLoaded', function() {
		_buildingBlocks.alerts.init();
	});
}(jQuery));