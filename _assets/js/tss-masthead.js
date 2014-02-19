
function ssmastMenu() {

// masthead menu drop menus
	// account
	$( "#mast-menu .drop" )
		.bind( "click", function( ) {
			var oThis = $( this );
			if (oThis.hasClass("drop-hover")) {
				oThis.removeClass( "drop-hover" );
			} else {
				oThis.addClass( "drop-hover" );
			}
			if ($(e.target)[0].tagName !== "a") {
				return false;
			}
		})
		.bind( "focusin mouseenter", function() {
			$( ".drop" ).removeClass( "drop-hover" );
			$( this ).addClass( "drop-hover" );
			return false;
		})
		.bind( "focusout mouseleave", function() {
			$( this ).removeClass( "drop-hover" );
		});
		// search tools
		$( "#mast-search .drop" )
		.bind( "click", function( ) {
			var oThis = $( this );
			if (oThis.hasClass("drop-hover")) {
				oThis.removeClass( "drop-hover" );
			} else {
				oThis.addClass( "drop-hover" );
			}
			if ($(e.target)[0].tagName !== "a") {
				return false;
			}
		})
		.bind( "focusin mouseenter", function() {
			$( ".drop" ).removeClass( "drop-hover" );
			$( this ).addClass( "drop-hover" );
			return false;
		})
		.bind( "focusout mouseleave", function() {
			$( this ).removeClass( "drop-hover" );
		});

	//close the mini menus on touch-out
	$( document ).bind( "touchend", function(e){
		$(".drop" ).not( $(e.target).closest(".drop" ) ).removeClass( "drop-hover" );
	});


	//class the first
	$(".drop li:first-child" ).addClass( "first-child" );

}ssmastMenu();
