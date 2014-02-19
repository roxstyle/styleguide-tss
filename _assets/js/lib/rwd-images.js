/*!
 * Responsive Images
 * Mobile-First images that scale responsively and responsibly
 * Copyright 2010, Scott Jehl, Filament Group, Inc
 * MIT License
 * Check out the README.md file for instructions and optimizations
*/
(function(win){
	//defaults / mixins
	var	rwdi = (function(){
			var defaults = {
				// this option assumes data- attributes aren't in use
				// set to false if you need them (see README.md)
				immediateRedirect:	true,
				//default width for small/large images
				widthBreakPoint:	480,
				cookieName: 		"rwdimgsize",
				cookiePath: 		"/"

				/* The path above is set to "/" For the sake of testing on the development subdomain. When the site is moved to the bostonglobe.com primary domain, the line above will need to be changed to the following: */
				//cookiePath: 		".bostonglobe.com"

			};
			//mixins from rwd_images global
			if( win.rwd_images ){
				for (var setting in win.rwd_images) {
			        defaults[setting] = win.rwd_images[setting];
			    }
			}
			return defaults;
		})(),
		widthBreakPoint = rwdi.widthBreakPoint,
		wideload = win.screen.availWidth > widthBreakPoint && location.search.indexOf("mobile-assets") <= 0,
		doc = win.document,

		//record width cookie for subsequent loads
		recordRes = (function(){
			var date = new Date();
		    date.setTime(date.getTime()+(1/*1 day*/*24*60*60*1000));
		    doc.cookie = rwdi.cookieName + "=" + ( wideload ? "large" : "small" ) + "; expires=" + date.toGMTString() + "; path=" + rwdi.cookiePath;
		})();

		//if wideload is false quit now
		if( !wideload ){
			return;
		}

		//find and replace img elements
		var findrepsrc = function(){
			var imgs = doc.getElementsByTagName('img'),
				il = imgs.length;

			for(var i = 0; i < il; i++){
				var img = imgs[i],
					fullsrc = img.getAttribute('data-fullsrc');

				if(fullsrc){
					img.src = fullsrc;
				}
			}
		},

	    //flag for whether loop has run already
	    complete = false,

	    //rfind/rep image srcs if wide enough (maybe make this happen at domready?)
	    readyCallback = function(){
	    	if( complete ){ return; }
	    	complete = true;
	    	findrepsrc();
	    },

		unsetCookie = function(){
			document.cookie = rwdi.cookieName + "=; expires=" + (new Date()).toGMTString() + "; path=" + rwdi.cookiePath;
		};

	//DOM-ready or onload handler
	//W3C event model
	if ( doc.addEventListener ) {
		doc.addEventListener( "DOMContentLoaded", readyCallback, false );
		//fallback
		win.addEventListener( "load", function(){
			readyCallback();
			unsetCookie();
		}, false );

	}
	// If IE event model is used
	else if ( doc.attachEvent ) {
		doc.attachEvent("onreadystatechange", readyCallback );
		//fallback
		win.attachEvent( "onload", function(){
			readyCallback();
			unsetCookie();
		} );
	}
})(this);
