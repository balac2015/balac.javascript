/*!
 * jQuery v1.7.1
 **/

(function( window, undefined ) {

var document = window.document,
 	navigation = window.navigation,
 	location = window.location;

var jQuery = function( selector, context ) {
		return new jQuery.fn.init( selector, context, rootjQuery );
	},
	_jQuery = window.jQuery,
	_$ = window.$,
	rootjQuery,

	quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
	rnotwhite = /\S/,
	trimLeft = /^\s+/,
	trimRight = /\s+$/,
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

	rvalidchars = /^[\],:{}\s]*$/,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,

	rwebkit = /(webkit)[ \/]([\w.]+)/,
	ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
	rmsie = /(msie) ([\w.]+)/,
	rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,

	rdashAlpha = /-([a-z]|[0-9])/ig,
	rmsPrefix = /^-ms-/,

	fcamelCase = function( all, letter ) {
		return ( letter + "" ).toUpperCase();
	},

	userAgent = navigation.userAgent,
	browserMatch,
	readyList,

	DOMContentLoaded,

	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,

	class2type = {};

jQuery.fn = jQuery.prototype = {
	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem, ret, doc;

		// Handle $(""), $(null), or $(undefined)
		if ( !selector ) {
			return this;
		}

		// Handler $(DOMElement)
		if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;
		}

		// The body element only exists once, optimize finding it
		if ( selector === "body" && !context && document.body ) {
			this.context = document;
			this[0] = document.body;
			this.selector = selector;
			this.length = 1;
			return this;
		}

		// Handle HTML Strings
		if ( typeof selector === "string" ) {

			// Are we dealing with HTML string or an ID?
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1) === ">" && selector.length > 3 ) {
				// Assume that string that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];
			} else {
				match = quickExpr.exec( selector );
			}

			// Verify a match, and that no context was specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;
					doc = ( context ? context.ownerDocument || context : document );

					// if a single string is passed in and it's a single tag
					// just do a createElement and skip the rest
					ret = rsingleTag.exec( selector );

					if ( ret ) {
						if ( jQuery.isPlainObject( context ) ) {
							selector = [ document.createElement( ret[1] ) ];
							jQuery.fn.attr.call( selector, context, true );
						} else {
							selector = [ doc.createElement( ret[1] ) ];
						}
					} else {
						ret = jQuery.buildFragment( [ match[1] ], [doc] );
						selector = ( ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment ).childNodes;
					}
					return jQuery.merge( this, selector );

				// HANDLE: $("#id")
				} else {
					elem = document.getElementById( match[2] );
				}

			}
		}
	}
};
jQuery.fn.init.prototype = jQuery.fn;

})( window );