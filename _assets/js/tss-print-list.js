//print allrecord default
function defaultSubmod() {
	$("body.printrecord section:not('.controls') > .subtog").before('<input type="checkbox" name="toprint" data-select-all="sa" value="1" class="checkme" />');
	$('body.printrecord .controls > .subtog').before('<input type="checkbox" name="sa-toprint" id="check-master" value="0" class="selectall" />' + '<span id="checkAll">All</span>');
	$("body.printrecord .expand-all").removeClass("expanded").text('Expand All Sections');
	$("body.printrecord .subtog header h2").removeClass("open");
	$("body.printrecord .subtog .details").hide();
	//checkall checkboxes -todo

	//return false;
}

//printlist default
function defaultprintCheck() {
	//$(".record-sections ul > li").prepend('<input type="checkbox" name="toprint" data-select-all="sa" data-input=" " value="1" class="checkme" />');
	$('.record-sections .controls').prepend('<input type="checkbox" name="sa-toprint" id="check-master" value="0" class="selectall" />' + '<span id="checkAll">Print All</span>');
	//return false;
}
defaultprintCheck();

// printlist toggle check All
function printlistCheckAll() {
	$('.record-sections .selectall').on( 'change', function() {
		$('.record-sections :checkbox.checkme').prop('checked', $( this ).is( ':checked' ) ? 'checked' : '' );
		$( this ).next().text( $( this ).is( ':checked' ) ? 'Print All' : 'Print Selected' );

		if($(this.checked)) {
			$(this).parents('.content').find('#main section').removeClass('hidden').fadeIn();
		} else {

		}
	});

	$('.record-sections :checkbox.checkme').on( 'change', function()  {
		//$(this).parents('.record-sections').find('.selectall').prop('checked', false);
		$( ':checkbox.checkme' ).length == $( ':checkbox.checkme:checked' ).length ? $( '.selectall' ).prop( 'checked', 'checked' ).next().text( 'Print All' ) : $( '.selectall' ).prop( 'checked', '' ).next().text( 'Print Selected' );

		var option = 'sec-' + $(this).data('input');
		var d = '[data-print-default-hidden="true"]';
		if ($('.' + option).hasClass('hidden')) {
			$('.' + option).addClass('hidden notprint').fadeIn();
		}
		else {
			$('.' + option).removeClass('hidden notprint').fadeOut();
		}
	});


}
//printlistCheckAll();

// printlist default
function printlistDefault() {
	$('body.printlist .record-sections :checkbox').prop('checked', true);
}
//printlistDefault();

// printlist radiobuttons toggle disabled
function printradioDisabled() {

	$('.record-sections input[type=radio]').on( 'change', function()  {

		var ck = $(".record-sections input[type=radio]:checked").val();
		switch(ck)	{
			case 'printall':
				$(".record-sections input[type=checkbox]").attr('disabled');
				return;
			case 'printsome':
				$(".record-sections input[type=checkbox]").removeAttr('disabled');
				return;
		}


		// if($(this).prop( 'checked', 'checked' )) {
		// 	$(".record-sections input[type=checkbox]").prop('disabled', true);
		// }
		// if($(this).prop( 'checked', '' )) {
		// 	$(".record-sections input[type=checkbox]").removeProp('disabled');
		// }
		// else {
		// 	$(".record-sections input[type=checkbox]").prop('enabled', true);
		// }
	});
}
//printradioDisabled();

// printlist default
function printradioDefault() {
	$('body.printlist .record-sections input[type=radio].printall').prop('checked', true);
	$('body.printlist .record-sections input[type=checkbox]').prop('disabled', true);
}
//printradioDefault();

//remove links for print preview
	function printLinks() {
		$('a').contents().unwrap();
	}
