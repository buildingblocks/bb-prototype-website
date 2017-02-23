(function($) {
	jQuery.fn.removeStyle = function(properties) {
		return this.each( function() {
			if(properties) {
				// turn properties into array
				var propertiesArray = properties.split(',');
				// remove each property
				for (var i = 0; i < propertiesArray.length; i++) {
					this.removeProperty( properties[i] );
				}
			}else{
				this.removeAttribute('style');
			}
		});
	};
}(jQuery));
