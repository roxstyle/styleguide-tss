/* ie8 select dropdown fix */

$(function() {

	var el;

	$("select")
		.each(function() {
			el = $(this);
			el.data("origWidth", el.outerWidth()) // IE 8 will take padding on selects
		})
	  .mouseenter(function(){
	    $(this).css("width", "auto");
	  })
	  .bind("blur change", function(){
	  	el = $(this);
	    el.css("width", el.data("origWidth"));
	  });

});
