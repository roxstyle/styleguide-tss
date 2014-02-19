$(function() {

	$(".openHint").each(function() {
		var $link = $(this);
		var p = $(this).position();
		var $dialog = $('.hint')
		.dialog({
			autoOpen: false,
			dialogClass: "ahint",
			position: [p.left+50,p.top],
			resizable: false,
			width:340,
			minHeight:360
		});
		$link.mouseover(function() {
			//alert("Position: " + p);
			$('.hint').dialog("open");

		}).mousemove(function(event) {
			$('.hint').dialog("option","position", {
				my: "left",
				at: "right",
				of: event,
				offset: "20 20"
			});

		});
	});
	$(".ahint .ui-dialog-titlebar").hide();

	$('.ahint .ui-dialog-titlebar-close').bind("click", function() {
		$('.hint').dialog('close');
		return false;
	});

});