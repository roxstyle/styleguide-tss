//
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };

}());

$(function() {
	var currentSize = "small";
	var ns = $(".new_script");

	// Loads in the javascript
	function loadjs(n) {
		'use strict';

		// Create script element
		var e = document.createElement('script');

		// Set its source based on the passed name value
		e.setAttribute('src', n + '.js');
		e.setAttribute('class', 'new_script');

		// Append to the document body
		document.getElementsByTagName('body')[0].appendChild(e);
	}

	if (matchMedia('only screen and (max-width: 480px)').matches) {
  		// smartphone/iphone
  		ns.remove();
  		loadjs('../_assets/js/480');
	}
	if (matchMedia('only screen and (min-width: 481px) and (max-width: 767px)').matches) {
  		// medium tablet
  		ns.remove();
  		loadjs('../_assets/js/768');
	}
	if (matchMedia('only screen and (min-width: 768px)').matches) {
  		// large screen
  		ns.remove();
  		loadjs('../_assets/js/992');
	}

});

// Loads in the javascript based on window size DRY
// based on http://css-tricks.com/conditional-content-via-css-media-queries/

	// $(function() {

	// 	var currentSize = "small";

	// 	$(window).resize(function() {
	// 	var size = window.getComputedStyle(document.body, ':after').getPropertyValue('container');
	// 	var windowWidth = $(window).width();

	// 		// Ridiculous thing to deal with inconsistent returning of
	// 		// value from query. Some browsers have quotes some don't
	// 		size = size.replace(/"/g, "");
	// 		size = size.replace(/'/g, "");

	// 		// Loads in the javascript
	// 		function loadjs(n) {
	// 			'use strict';

	// 			// Create script element
	// 			var e = document.createElement('script');

	// 			// Set its source based on the passed name value
	// 			e.setAttribute('src', n + '.js');
	// 			e.setAttribute('class', 'new_script');

	// 			// Append to the document body
	// 			document.getElementsByTagName('body')[0].appendChild(e);
	// 		}

	// 		if (size != currentSize) {
	// 			var ns = $(".new_script");

	// 			// if (size == 'l')
	// 			if (size.indexOf("l") !=-1){
	// 				ns.remove();
	// 				loadjs('../_assets/js/992');
	// 				currentSize = 'l';
	// 			}
	// 			// if (size == 'm')
	// 			if (size.indexOf("m") !=-1) {
	// 				ns.remove();
	// 				loadjs('../_assets/js/768');
	// 				currentSize = 'm';
	// 			}
	// 			// if (size == 'small')
	// 			if (size.indexOf("small") !=-1) {
	// 				ns.remove();
	// 				loadjs('../_assets/js/480');
	// 				currentSize = 'small';
	// 			}

	// 		}

	// 	}).resize();

	// });


//function above deos not work with ie8
// Loads in the javascript
// $(window).load(function() {
// 	function s(n) {
// 	    'use strict';

// 	    // Create script element
// 	    var e = document.createElement('script');

// 	    // Set its source based on the passed name value
// 	    e.setAttribute('src', n + '.js');
// 		e.setAttribute('class', 'new_script');

// 	    // Append to the document body
// 	    document.getElementsByTagName('body')[0].appendChild(e);
// 	}

// 	var windowWidth = $(window).width();

// 	if (windowWidth < 480) {
// 	    // Load 480.js
// 	    s('../_assets/js/480');
// 	}
// 	if (windowWidth > 480 && windowWidth < 767) {
// 	    // Load 760.js
// 	    s('../_assets/js/768');
// 	}
// 	if (windowWidth > 768) {
// 	     //Load 992.js
// 	    s('../_assets/js/992');
// 	}

// }).load();


