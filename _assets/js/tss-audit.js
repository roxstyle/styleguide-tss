(function( $, undefined ){
	$( function() {

	var adjustMenu = function() {

		var oTable = $('#nbc-audit').dataTable( {
			"bAutoWidth": false,
			"bJQueryUI": true,
			"bFilter": false,
			"bLengthChange": true,
			"bInfo": true,
			"bPaginate": true,
			"bDestroy": true,
			"aoColumnDefs": [
				{ "bSortable": false, "aTargets": [ 3, 4 ] }
			],
			"aaSorting": [[1, 'asc']]
		});
	}

});

})( jQuery );
