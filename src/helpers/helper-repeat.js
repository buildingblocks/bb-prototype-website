module.exports.register = function (Handlebars, options, params)  {
	Handlebars.registerHelper('repeat', function(n, options) {
		var content = '',
		count = n - 1;

		for (var i = 0; i <= count; i++) {
			var data = {
				index: i + 1
			};
			content += options.fn(this, {data: data});
		}

		return new Handlebars.SafeString(content);
	});

};
