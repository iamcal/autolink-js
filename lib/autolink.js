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

		self.stripProtocols = true;

		self.tagFill = '';
		self.autoTitle = true;
		self.maxLength = 30;

		return self;
	}

	// private methods

	var linkGo = function(text, sub, force_prefix, limit, tagfill, auto_title, strip_protocols){

		return text;
	}

	var label = function(text, limit){

		if (!limit){ return text; }

		if (text.length > $limit){
			return text.substr(0, limit-3) + '...';
		}

		return text;
	}


	// public methods

	autolink.prototype.link = function(str){

		str = linkGo(str, new RegExp('[a-z][a-z-]+://', 'i'),	null,		this.maxLength, this.tagFill, this.autoTitle, this.stripProtocols);
		str = linkGo(str, new RegExp('(mailto|skype):', 'i'),	null,		this.maxLength, this.tagFill, this.autoTitle, this.stripProtocols);
		str = linkGo(str, new RegExp('www\\.', 'i'),		'http://',	this.maxLength, this.tagFill, this.autoTitle, this.stripProtocols);

		return str;
	}

	autolink.prototype.linkEmail = function(str){

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
