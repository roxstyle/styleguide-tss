(function( $, undefined ){
	$( function() {

	// sections nav
		// on small screen, a "sections" heading allows for toggling the nav visibility
		// the classes do nothing at resolutions > ~620ish
		$( ".adminWrap .sections-heading" ).collapsible();

		// Check to see if a subnav is actually present
		var thisContent = $( "#adminMain nav.section" );

		//if ( thisContent.length && $( "li", thisContent ).length ) {
			var $main = $(".nav-admin");

			// On article pages, the h1 is a collapsible for that sub-section's menus
			$main.find( "h1 a" )
				.collapsible({
					content: thisContent
				});

			$main.find( "h1 .collapsible-heading" )
				.find( ".collapsible-heading-status" )
					.bind( "click", function(e) {
						$(this).closest( "a" )
							.trigger( "toggleCollapsible" );
							e.preventDefault();
					});
		//}

		/* Primary navigation drop menus
		--------------------------------------- */
			//Request menu content via ajax on first hover
			$( ".adminWrap .sections[data-admin-content]" ).each( function() {
				var sections = $( this ),
					hovering,
					target;

				sections
					.bind( "fetch", function() {
						// if( window.screen.width <= 788 || dev.mobileOverride ){
						// 	return;
						// }

						$.get( sections.data( "admin-content" ), function( response ){
							var menu = $( response ).appendTo( "#contain" );

							sections.unbind( "fetch .fetch" );

							menuBehavior();

							if( hovering ){
								$( "div[data-admin='"+ $(target).closest("li[data-section]").data("section") +"']:eq(0)" ).trigger( "menushow" );
							}

						});
					})
					.bind( "mouseenter.fetch focus.fetch", function( e ){
						hovering = true;
						target = e.target;
						$(this).trigger( "fetch" );
					})
					.bind( "mouseleave.fetch blur.fetch", function() {
						hovering = false;
					})
					.trigger( "fetch" );
			});

			//once appended, apply events, behavior to menu, anchor
			function menuBehavior(){

				var focusoutMenuTimer;

				//toggle menu visibility using hoverIntent
				$( ".adminWrap .sections>ul>li[data-section]")
					.each(function(i){
						var anchor 	= $(this).find("a"),
							menu = $( "div[data-menu='"+ $(this).data("section") +"']:eq(0)" ),
							menuid =  menu.attr("id"),
							anchorid = anchor.attr("id");

						if( !menuid ){
							menuid = "admin-primary-menu-" + i;
							menu.attr( "id", menuid );
						}

						if( !anchorid ){
							anchorid = "admin-primary-btnlabel-" + i;
							anchor.attr( "id", anchorid );
						}

						anchor
							.attr({
								"role": "button",
								"aria-haspopup": true,
								"aria-owns": menuid,
								"aria-expanded": false,
								"aria-label": anchor.text() + " section. Click to visit, or use arrow keys to enter and leave menu."
							});

						anchor.data( "menuObj", menu );

						menu
							.attr({
								"aria-labelledby": menuid
							})
							.data( "anchorObj", anchor );
					})
					.bind( "keydown", function( e ){
						if( e.keyCode == 40 || e.keyCode == 39 ){
							$(this).find("a:first").data( "menuObj" ).find('a:first').focus();
							e.preventDefault();
						}
					} )
					.children( "a" )
					.bind( "delayedEnter mouseenter focus", function( e ){
						clearTimeout( focusoutMenuTimer );

						//if event is delayedEnter, or another menu is already open
						if( e.type === "delayedEnter" || e.type === "focus" || $( ".menu-expanded", $( this ).closest( ".sections" ) ).length ){
							$(this).data( "menuObj" ).trigger( "menushow" );
						}
					})
					.bind( "mouseleave blur", function() {
						var el = $(this);
						el.data( "hoverfocused", false );
						focusoutMenuTimer = setTimeout(function() {
							el.data( "menuObj" ).trigger( "menuhide" );
						}, 100);
					});


				// assign hover / focus behavior to menu as well
				$(".adminWrap nav[data-admin]")
					.bind( "menushow", function() {
						//if( $(window).width() <= 788 || globe.dev.mobileOverride ){
							//return;
						//}

						var anchor = $(this).data( "anchorObj" );

						anchor.attr("aria-expanded", true);

						// add class to both anchor and div
						$( this )
							.add( anchor.parent() )
							.add( anchor.closest('ul') )
							.addClass( "menu-expanded" )
							// position the div
							.filter( "div" )
							.css({
								//get offset differently depending on whether it's an article page
								top: $( ".sections").position().top + $( ".sections").outerHeight()
							});

						//hide open menus
						$( "nav[data-admin].menu-expanded" ).not(this).trigger( "menuhide" );
					} )
					.bind( "menuhide", function() {
						// remove class from anchor and div
						var anchor = $(this).data( "anchorObj" );
						anchor.attr("aria-expanded", false);
						$( this )
							.add( anchor.parent() )
							.add( anchor.closest('ul') )
							.removeClass( "menu-expanded" );
					} )
					.bind( "mouseenter focusin", function() {
						$(this).data( "anchorObj" ).data( "hoverfocus", true );
						clearTimeout( focusoutMenuTimer );
					} )
					.bind( "delayedLeave", function() {
						$(this).data( "anchorObj" ).data( "hoverfocus", false );
						$(this).trigger( "menuhide" );
					} )
					.bind( "focusout", function() {
						var el = $(this);
						focusoutMenuTimer = setTimeout(function() {
							el.trigger( "delayedLeave" );
						}, 100);
					})
					//jump focus back on arrow up/left
					.bind( "keydown", function( e ){
						var anchor			= $( this ).data( "anchorObj" ),
							firstMenuLink	= $( "a:first", this ),
							lastMenuLink	= $( "a:last", this );

						//up or left Arrow Keys leave menu, back to anchor
						if( e.keyCode === 38 || e.keyCode === 37 ){
							anchor.focus();
						}
						//tab key on last anchor goes back to nav, next sibling
						else if( e.keyCode === 9 ){
							if( $( e.target ).is( lastMenuLink ) || e.shiftKey && $( e.target ).is( firstMenuLink ) ){
								anchor.focus();
							}
						}

					} );
			};


	});
})( jQuery );
