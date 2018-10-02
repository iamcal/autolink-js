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

		var text_l = text.toLowerCase();
		var cursor = 0;
		var loop = true;
		var buffer = '';
		var ok = true;

		var sub_len = 0;

		var pre_hit = '';
		var hit = '';
		var pre = '';
		var post = '';

		var fail_text = '';
		var fail_len = 0;

//var c=0;

		while ((cursor < text.length) && loop){

//console.log('cursor', cursor, c);
//c++;
//if (c > 100) break;

			ok = true;

			sub.lastIndex = cursor;
			var matched = sub.exec(text_l);

			if (!matched){

				loop = false;
				ok = false;

			}else{

				var pos = matched.index;
				var sub_len = matched[0].length;

				pre_hit = text.substr(cursor, pos-cursor);
				hit = text.substr(pos, sub_len);
				pre = text.substr(0, pos);
				post = text.substr(pos + sub_len);

				fail_text = pre_hit + hit;
				fail_len = fail_text.length;


				//
				// substring found - first check to see if we're inside a link tag already...
				//

				var bits = pre.split( /<\/a>/i );
				var last_bit = bits.pop();
				if (last_bit.match( /<a\s/i )){

					debug("fail 1 at "+cursor);

					ok = false;
					cursor += fail_len;
					buffer += fail_text;
				}
			}


			//
			// looks like a nice spot to autolink from - check the pre
			// to see if there was whitespace before this match
			//

			if (ok){

				if (pre.length){
					if (!pre.match( /[\s\(\[\{>]$/ )){ // previously has 's' flag, no-op in JS

						debug("fail 2 at "+cursor+" ("+pre+")");

						ok = false;
						cursor += fail_len;
						buffer += fail_text;
					}
				}
			}


			//
			// we want to autolink here - find the extent of the url
			//

			if (ok){
				var rx = /^([a-z0-9\-\.\/\-_%~!?=,:;&+*#@\(\)\$]+)/i;
				var matches = rx.exec(post);

				if (matches){

					var url = hit + matches[1];

					cursor += url.length + pre_hit.length;
					buffer += pre_hit;

					url = html_entity_decode(url);


					//
					// remove trailing punctuation from url
					//

					while (url.match( /[.,!;:?]$/ )){
						url = url.substr(0, url.length-1);
						cursor--;
					}


					//
					// process balanced pairs
					//

					if (url.match( /^(\)|^)[^\(]+\)$/ )){ url = url.substr(0, url.length-1); cursor--; }
					if (url.match( /^(\]|^)[^\[]+\]$/ )){ url = url.substr(0, url.length-1); cursor--; }
					if (url.match( /^(\}|^)[^\{]+\}$/ )){ url = url.substr(0, url.length-1); cursor--; }

				//	var pairs = [['(',')'], ['[',']'], ['{','}']];
				//	for (var i=0; i<pairs.length; i++){
				//		var o = pairs[i][0];
				//		var c = pairs[i][1];

				//		if (preg_match("!^(\\$c|^)[^\\$o]+\\$c$!", $url)){
				//			url = url.substr(0, url.length-1);
				//			cursor--;
				//		}
				//	}


					//
					// nice-i-fy url here
					//

					var link_url = url;
					var display_url = url;

					if (force_prefix) link_url = force_prefix + link_url;

					if (strip_protocols){
						var sp_sub = new RegExp('^(http|https)://', 'i');
						var sp_m = sp_sub.exec(display_url);
						if (sp_m){

							display_url = display_url.substr(sp_m[1].length+3);
						}
					}

					display_url = label(display_url, limit);


					//
					// add the url
					//

					var currentTagfill = tagfill;
					if (display_url != link_url && !currentTagfill.match( /title=/i ) && auto_title){

						if (!link_url.match( new RegExp('https?://'+escapeRegExp(display_url), 'i') )){

							currentTagfill += ' title="'+link_url+'"';
						}
					}

					var link_url_enc = xml_chars(link_url);
					var display_url_enc = xml_chars(display_url);

					buffer += '<a href="'+link_url_enc+'"'+currentTagfill+'>'+display_url_enc+'</a>';

				}else{
					debug("fail 3 at "+cursor);

					ok = false;
					cursor += fail_len;
					buffer += fail_text;
				}
			}

		}


		//
		// add everything from the cursor to the end onto the buffer.
		//

		buffer += text.substr(cursor);

		return buffer;
	}

	var escapeRegExp = function(string){
		return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	}

	var debug = function(str){
		//console.log('DEBUG: '+str);
	}

	var html_entity_decode = function(str){
		return str.replace(/&(quot|gt|lt|amp|\#([0-9]+)|\#x([0-9a-f]+));/ig, function (m0, m1, m2, m3){
			if (m1.toLowerCase() == 'quot') return '"';
			if (m1.toLowerCase() == 'gt'  ) return '>';
			if (m1.toLowerCase() == 'lt'  ) return '<';
			if (m1.toLowerCase() == 'amp' ) return '&';
			if (m2) return String.fromCharCode(parseInt(m2));
			if (m3) return String.fromCharCode(parseInt(m3, 16));
		});
	}

	var xml_chars = function(str){
		return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
	}

	var label = function(text, limit){

		if (!limit){ return text; }

		if (text.length > limit){
			return text.substr(0, limit-3) + '...';
		}

		return text;
	}


	// public methods

	autolink.prototype.link = function(str){

		str = linkGo(str, new RegExp('[a-z][a-z-]+://', 'ig'),	null,		this.maxLength, this.tagFill, this.autoTitle, this.stripProtocols);
		str = linkGo(str, new RegExp('(mailto|skype):', 'ig'),	null,		this.maxLength, this.tagFill, this.autoTitle, this.stripProtocols);
		str = linkGo(str, new RegExp('www\\.', 'ig'),		'http://',	this.maxLength, this.tagFill, this.autoTitle, this.stripProtocols);

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
