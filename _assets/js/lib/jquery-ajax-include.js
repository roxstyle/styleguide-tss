/*
  * anchor-include pattern for already-functional links that work as a client-side include
  * Copyright 2011, Scott Jehl, scottjehl.com
  * Dual licensed under the MIT
  * Idea from Scott Gonzalez
  * to use, place attributes on an already-functional anchor pointing to content
    * that should either replace, or insert before or after that anchor
    * after the page has loaded
    * Replace:	<a href="..." data-replace="articles/latest/fragment">Latest Articles</a>
    * Before:	<a href="..." data-before="articles/latest/fragment">Latest Articles</a>
    * After:	<a href="..." data-after="articles/latest/fragment">Latest Articles</a>
    * On domready, you can use it like this:
         $("[data-append],[data-replace],[data-after],[data-before]").ajaxInclude();
*/
(function( $ ){
	$.fn.ajaxInclude = function( e ) {
		return this.each(function() {
			var el			= $( this ),
				target		= el.data( "target" ),
				targetEl	= target && $( target ) || el,
				threshold	= screen.width > parseInt( el.data( "threshold" ) || 0 ),
				methods		= [ "append", "replace", "before", "after" ],
				method,
				url;

			if (threshold) {

				for( var ml = methods.length, i=0; i < ml; i++ ){
					if( el.is( "[data-" + methods[ i ] + "]" ) ){
						method	= methods[ i ];
						url		= el.data( method );
					}
				}

				if( method === "replace" ){
					method += "With";
				}

				if( url && method ){
					$.get( url, function( data ) {
						var responseEl = $(data),
							eTarget = method === "replaceWith" ? responseEl : el;

						targetEl[ method ]( responseEl );

						eTarget.trigger( "ajaxInclude", [eTarget, data] );
					});
				}

			}
		});
	};
})( jQuery );