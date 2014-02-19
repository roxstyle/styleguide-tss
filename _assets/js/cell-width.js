//inherit td width into cell children
//non-scrolling tables
//common tables
 var cellWidth = {

	//person credit
	"p-bio-mile":["10%", "90%"],
	"p-bio-family":["20%", "10%", "20%", "50%"],
	//person credit
	"p-awards":["5%", "25%", "30%", "20%", "20%"],
	//person aside summary tables
	"p-s-awards":["60%", "40%"],
	"p-s-bo":["60%", "40%"],
	"p-s-similar":["60%", "40%"]

 };

function applyCellWidths(tableName) {
	if(tableName == null || tableName == "") {
		//tbody
		$.each(cellWidth, function(key, val) {
			for (var i=0, cl=val.length; i<cl; i++) {
				$('.' + key + ' tbody td:nth-child(' + (i+1) + ')').width(val[i])
				.children().css({overflow: 'hidden'}).width(val[i]-9);
			}
		});
	}
	else
	{
		applyWidth(tabeName, cellWidth[tableName]);
	}
}

function applyWidth(key, value) {
	for (var i=0, cl=value.length; i<cl; i++) {
		$('.' + key + ' thead th:nth-child(' + (i+1) + ')').width(value[i]);
		$('.' + key + ' tbody td:nth-child(' + (i+1) + ')').width(value[i])
			.children().not("td:last-child").css({overflow: 'hidden'}).width(value[i]-9);
	 }
	$("td:last-child").children().css({overflow:'visible'}).width("auto");
}
//tables
applyCellWidths("p-s-awards");
applyCellWidths("p-s-bo");
applyCellWidths("p-s-similar");
