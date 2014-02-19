			// http://www.datatables.net/release-datatables/examples/api/row_details.html

			/* Formating function for row details */
			function syfyFormatDetails ( oTable, nTr ) {
				var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
				sOut += '<tr><td style="width: 25%;">Agent:</td><td style="width: 25%;"><p>NA</p></td><td style="width: 25%;">Agency:</td><td style="width: 25%;"><p>NA</p></td></tr>';
				sOut += '<tr><td>Sizzle:</td><td><a href="https://vimeo.com/48169646">https://vimeo.com/48169646  (pw: fixation10)</a></td><td>Treatment:</td><td>NA</td></tr>';
				sOut += '<tr><td>Rel:</td><td>NA</td><td>T1:</td><td><p>6/28/12</p></td></tr>';
				sOut += '<tr><td>T2:</td><td><p>7/5/1 8/28/12 9/4/12 12/7/12 1/8/13</p></td><td>T3:</td><td>NA</td></tr>';
				sOut += '<tr><td>Diversity:</td><td ><p>No</p></td><td>T3:</td><td>NA</td></tr>';
				sOut += '<tr><td colspan="4"><div>Notes:</div></td></tr>';
				sOut += '</table>';

				return sOut;
			}

			$(document).ready(function() {

				var oTable = $('#syfy-pitches-grid').dataTable( {
					"bAutoWidth": false,
					"bJQueryUI": true,
					"bFilter": false,
					"bLengthChange": false,
					"bInfo": false,
					"bPaginate": false,
					"bDestroy": true,
					"aoColumnDefs": [
						{ "bSortable": false, "aTargets": [ 0, 9 ] }
					],
					"aaSorting": [[1, 'asc']]
				});

				/* Add event listener for opening and closing details
				 * Note that the indicator for showing which row is open is not controlled by DataTables,
				 * rather it is done here
				 */
				$('#syfy-pitches-grid tbody td').on('click', 'img', function () {
					var nTr = $(this).parents('tr')[0];
					if ( oTable.fnIsOpen(nTr) )
					{
						/* This row is already open - close it */
						this.src = "../_assets/img/data-tables/details-open.png";
						oTable.fnClose( nTr );
					}
					else
					{
						/* Open this row */
						this.src = "../_assets/img/data-tables/details-close.png";
						oTable.fnOpen( nTr, syfyFormatDetails(oTable, nTr), 'details' );
					}
				} );

			} );

			function nbcFormatDetails ( bTable, nTr ) {
				var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
				sOut += '<tr><td style="width: 25%;">Agent:</td><td style="width: 25%;"><p>NA</p></td><td style="width: 25%;">Agency:</td><td style="width: 25%;"><p>NA</p></td></tr>';
				sOut += '<tr><td>Sizzle:</td><td><a href="https://vimeo.com/48169646">https://vimeo.com/48169646  (pw: fixation10)</a></td><td>Treatment:</td><td>NA</td></tr>';
				sOut += '<tr><td>Rel:</td><td>NA</td><td>T1:</td><td><p>6/28/12</p></td></tr>';
				sOut += '<tr><td>T2:</td><td><p>7/5/1 8/28/12 9/4/12 12/7/12 1/8/13</p></td><td>T3:</td><td>NA</td></tr>';
				sOut += '<tr><td>Diversity:</td><td ><p>No</p></td><td>T3:</td><td>NA</td></tr>';
				sOut += '<tr><td colspan="4"><div>Notes:</div></td></tr>';
				sOut += '</table>';

				return sOut;
			}

			$(document).ready(function() {

				var bTable = $('#nbc-pitches-grid').dataTable( {
					"bAutoWidth": false,
					"bJQueryUI": true,
					"bFilter": false,
					"bLengthChange": false,
					"bInfo": false,
					"bPaginate": false,
					"bDestroy": true,
					"aoColumnDefs": [
						{ "bSortable": false, "aTargets": [ 0, 9 ] }
					],
					"aaSorting": [[1, 'asc']]
				});

				 // Add event listener for opening and closing details
				 // * Note that the indicator for showing which row is open is not controlled by DataTables,
				 // * rather it is done here

				$('#nbc-pitches-grid tbody td').on('click', 'img', function () {
					var nTr = $(this).parents('tr')[0];
					if ( bTable.fnIsOpen(nTr) )
					{
						/* This row is already open - close it */
						this.src = "../_assets/img/data-tables/details-open.png";
						bTable.fnClose( nTr );
					}
					else
					{
						/* Open this row */
						this.src = "../_assets/img/data-tables/details-close.png";
						bTable.fnOpen( nTr, nbcFormatDetails(oTable, nTr), 'details' );
					}
				} );

			} );


