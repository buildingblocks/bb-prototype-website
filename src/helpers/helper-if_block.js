module.exports.register = function (Handlebars, options, params)  {
	Handlebars.registerHelper('if_block', function (name, options) {
		var block = null;
		this.blocks = this.blocks || {};
		block = this.blocks[name];
		if (block) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
};
