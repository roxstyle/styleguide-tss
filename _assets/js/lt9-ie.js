// fix for ie8 selects
//http://css-tricks.com/select-cuts-off-options-in-ie-fix/
function fixSelects( ) {

	var el;

	$("select")
		.each(function() {
			el = $(this);
			el.data("origWidth", el.outerWidth()) // IE 8
		.mouseenter(function() {
		$(this).css("width", "auto");
		})
		.bind("blur change", function() {
			el = $(this);
			el.css("width", el.data("origWidth"));
		});

}
fixSelects( );
