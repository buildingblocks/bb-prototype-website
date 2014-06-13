// Additional methods in jquery.validate.methods.js
(function($) {

	$.validator.unobtrusive.adapters.addBool('mandatory', 'required');

	$.validator.unobtrusive.adapters.add('requiredif', ['dependentupon'], function (options) {
		options.rules['requiredif'] = {
			dependentupon: options.params['dependentupon']
		};
		options.messages['requiredif'] = options.message;
	});

	$.validator.unobtrusive.adapters.add('requiredifvalue', ['dependentupon', 'targetvalue'], function (options) {
		options.rules['requiredif'] = {
			dependentupon: options.params['dependentupon'],
			targetvalue: options.params['targetvalue']
		};
		options.messages['requiredif'] = options.message;
	});

	$.validator.unobtrusive.adapters.add('atleast', ['minimum'], function (options) {
		options.rules['atleast'] = options.params['minimum'];
		options.messages['atleast'] = options.message;
	});

	$.validator.unobtrusive.adapters.add('multiemail', function (options) {
		options.rules['multiemail'] = {};
		options.messages['multiemail'] = options.message;
	});

	$.validator.unobtrusive.adapters.add('datetimerange', function (options) {
		options.rules['datetimerange'] = {};
		options.messages['datetimerange'] = options.message;
	});

	$.validator.unobtrusive.adapters.add('time', function (options) {
		options.rules['time'] = {};
		options.messages['time'] = options.message;
	});

}(window.jQuery));
