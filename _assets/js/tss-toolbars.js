
function ssToolbar() {
// menu drop menus for actions and toolbars
	$( "#tools .dropdown" )
		.bind( "click", function( ) {
			var oThis = $( this );
			if (oThis.hasClass("dropdown-hover")) {
				oThis.removeClass( "dropdown-hover" );
			} else {
				oThis.addClass( "dropdown-hover" );
			}
			// if ($(e.target)[0].tagName !== "a") {
			// 	return false;
			// }
		})
		.bind( "focusin mouseenter", function() {
			$( ".dropdown" ).removeClass( "dropdown-hover" );
			$( this ).addClass( "dropdown-hover" );
			return false;
		})
		.bind( "focusout mouseleave", function() {
			$( this ).removeClass( "dropdown-hover" );
		});

	//close the mini menus on touch-out
	$( document ).bind( "touchend", function( ){
		var e = $( this );
		$("#tools .dropdown" ).not( $(e.target).closest(".dropdown" ) ).removeClass( "dropdown-hover" );
	});

	//class the first
	$("#tools .dropdown li:first-child" ).addClass( "first-child" );

}
ssToolbar();

function rowToolbar() {
// row drop menus
	$( ".rowtools .drop" )
		.bind( "click", function() {
			var oThis = $( this );
			if (oThis.hasClass("drop-hover")) {
				oThis.removeClass( "drop-hover" );
			} else {
				oThis.addClass( "drop-hover" );
			}
			// if ($(e.target)[0].tagName !== "a") {
			// 	return false;
			// }
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
	$( document ).bind( "touchend", function (e) {
		$( ".drop" ).not( $(e.target).closest(".drop" ) ).removeClass( "drop-hover" );
	});


	//class the first
	$(".drop li:first-child" ).addClass( "first-child" );

}
rowToolbar();

//feature list editing
function editFeature() {
	$('.liststools .menu a.fea-edit').on( "click", function () {
		var h = $(this).parents('.ui-widget-content').children('.f-edit');
		$(h).toggle().addClass("active");
		return false;
	});

	$('.f-edit .btn').on( "click", function () {
		$(this).parents('.f-edit').toggle().removeClass("active");
		return false;
	});
}
editFeature();


