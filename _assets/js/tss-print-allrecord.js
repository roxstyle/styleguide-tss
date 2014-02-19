//Print All Record
//print allrecord toggle submod
function subTog() {
	$('.subtog header').click( function( ){
		var details = $(this).next(".details");
		var sTog  = $(this).parent(".subtog");
		var h  = $(this).children("h2");

			if($(h).hasClass("open")) {
	            $(h).removeClass("open");
	            $(details).hide('fast');
	            return false;
	        }
	        else {
	        	$(details).show('fast');
	            $(h).addClass("open");
	         }
	});
    $(".expand-all").click(function() {
    	var details = $(this).parents('#main').find(".details");
    	var hd = $(this).parents('#main').find(".subtog header h2");
    	if($(this).hasClass("expanded")) {
	            $(this).removeClass("expanded").text('Expand All Sections');
	            $(details).hide('fast');
	            $(hd).removeClass("open");
	            return false;
	        }
	        else {
	        	$(details).show('fast');
	            $(this).addClass("expanded").text('Collapse All Sections');
	            $(hd).addClass("open");
	         }
    });
}
subTog();

//print allrecord toggle check All
function checkAll() {
 	$('.printrecord .selectall').click(function() {
        $(this).parents('#main').find(':checkbox').not('.selectall').prop('checked', this.checked);
    });

    $('.printrecord .selectall').parents('#main').find(':checkbox').not('.selectall,:checked').click(function() {
        $(this).parents('#main').find('.selectall').prop('checked', false);
    });
}
