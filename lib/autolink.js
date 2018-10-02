"use strict";

;(function() {

	var root = this;
	var previous_autolink = root.AutoLink;

	/**
	 * @global
	 * @namespace
	 */

	var autolink = function(){

		var self = this;

		/**
		 * Should http:// be visibly stripped from the front of URLs?
		 *
		 * @memberof autolink
		 * @type bool
		 */

		self.strip_protocols = true;

		return self;
	}



	autolink.prototype.link = function(str){

		return str;
	}

	autolink.prototype.noConflict = function(){
		root.AutoLink = previous_autolink;
		return autolink;
	}


	// export
	if (typeof exports !== 'undefined'){
		if (typeof module !== 'undefined' && module.exports){
			exports = module.exports = autolink;
		}
		exports.AutoLink = autolink;
	}else if (typeof define === 'function' && define.amd){
		define(function() { return autolink; })
	}else{
		root.AutoLink = autolink;
	}

}).call(function(){
	return this || (typeof window !== 'undefined' ? window : global);
}());
