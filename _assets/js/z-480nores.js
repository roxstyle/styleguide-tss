$("body").addClass("s");

	function initPersonDataTables() {
		// project credits sortable table static
		// dependant jquery.dataTables.js
		//upcoming films
		$('.p-credit').dataTable({
			"bAutoWidth": false,
			"bJQueryUI": true,
			"bFilter": false,
			"bLengthChange": false,
			"bInfo": false,
			"bPaginate": false,
			"bRetrieve": true,
			//"sPaginationType": "full_numbers",
			//"aaSorting": [[0, "asc"]],
	
			"aoColumns": [
					{ "sWidth": "60%", "bSortable": false, "bVisible": true },
					{ "bSortable": false, "bVisible": false },
					{ "sWidth": "40%", "bSortable": false, "bVisible": true },
					{ "bSortable": false, "bVisible": false }
			]
		});
		
		// project credits sortable table static
		// dependant jquery.dataTables.js
		//upcoming films
		// $('.p-credit').dataTable({
		// 	"bAutoWidth": false,
		// 	"bJQueryUI": true,
		// 	"bFilter": false,
		// 	"bLengthChange": false,
		// 	"bInfo": false,
		// 	"bPaginate": false,
		// 	"bRetrieve": true,
		// 	//"sPaginationType": "full_numbers",
		// 	"aaSorting": [[0, "asc"]],
		// 
		// 	"aoColumns": [
		// 			{ "sWidth": "222px", "bSortable": true, "bVisible": true },
		// 			{ "sWidth": "204px", "bSortable": true, "bVisible": true },
		// 			{ "sWidth": "222px", "bSortable": true, "bVisible": true },
		// 			{ "sWidth": "105px", "bSortable": true, "bVisible": true }
		// 	]
		// });
		
		//past films
		// $('.p-credit-past').dataTable({
		// 	"bAutoWidth": false,
		// 	"bJQueryUI": true,
		// 	"bFilter": false,
		// 	"bLengthChange": false,
		// 	"bInfo": false,
		// 	"bPaginate": false,
		// 	"bRetrieve": true,
		// 	//"sPaginationType": "full_numbers",
		// 	"aaSorting": [[0, "asc"]],
		// 
		// 	"aoColumns": [
		// 			{ "sWidth": "227px", "bSortable": true, "bVisible": true },
		// 			{ "sWidth": "204px", "bSortable": true, "bVisible": true },
		// 			{ "sWidth": "251px", "bSortable": true, "bVisible": true },
		// 			{ "sWidth": "95px", "bSortable": true, "bVisible": true }
		// 	]
		// });
		
		//inactive films
		// $('.p-credit-inactive').dataTable({
		// 	"bAutoWidth": false,
		// 	"bJQueryUI": true,
		// 	"bFilter": false,
		// 	"bLengthChange": false,
		// 	"bInfo": false,
		// 	"bPaginate": false,
		// 	"bRetrieve": true,
		// 	//"sPaginationType": "full_numbers",
		// 	"aaSorting": [[0, "asc"]],
		// 
		// 	"aoColumns": [
		// 			{ "sWidth": "251px", "bSortable": true, "bVisible": true },
		// 			{ "sWidth": "251px", "bSortable": true, "bVisible": true },
		// 			{ "sWidth": "251px", "bSortable": true, "bVisible": true }
		// 	]
		// });

		//upcoming tv, current tv
		$('.p-credit-tv').dataTable({
			"bAutoWidth": false,
			"bJQueryUI": true,
			"bFilter": false,
			"bLengthChange": false,
			"bInfo": false,
			"bPaginate": false,
			"bRetrieve": true,
			//"sPaginationType": "full_numbers",
			"aaSorting": [[0, "asc"]],

			"aoColumns": [
					{ "sWidth": "25%", "bSortable": true, "bVisible": true },
					{ "sWidth": "25%", "bSortable": true, "bVisible": true },
					{ "sWidth": "25%", "bSortable": true, "bVisible": true },
					{ "sWidth": "15%", "bSortable": true, "bVisible": true },
					{ "sWidth": "10%", "bSortable": true, "bVisible": true }
			]
		});
		$('.p-credit-tvupcoming').dataTable({
			"bAutoWidth": false,
			"bJQueryUI": true,
			"bFilter": false,
			"bLengthChange": false,
			"bInfo": false,
			"bPaginate": false,
			"bRetrieve": true,
			//"sPaginationType": "full_numbers",
			"aaSorting": [[0, "asc"]],

			"aoColumns": [
					{ "sWidth": "25%", "bSortable": true, "bVisible": true },
					{ "sWidth": "25%", "bSortable": true, "bVisible": true },
					{ "sWidth": "25%", "bSortable": true, "bVisible": true },
					{ "sWidth": "15%", "bSortable": true, "bVisible": true },
					{ "sWidth": "10%", "bSortable": true, "bVisible": true }
			]
		});

		//past tv, episodic tv, inactive tv
		$('.p-credit-tvpast').dataTable({
			"bAutoWidth": false,
			"bJQueryUI": true,
			"bFilter": false,
			"bLengthChange": false,
			"bInfo": false,
			"bPaginate": false,
			"bRetrieve": true,
			//"sPaginationType": "full_numbers",
			"aaSorting": [[0, "asc"]],

			"aoColumns": [
					{ "sWidth": "30%", "bSortable": true, "bVisible": true },
					{ "sWidth": "30%", "bSortable": true, "bVisible": true },
					{ "sWidth": "30%", "bSortable": true, "bVisible": true },
					{ "sWidth": "10%", "bSortable": true, "bVisible": true }
			]
		});
		$('.p-credit-tvepi').dataTable({
			"bAutoWidth": false,
			"bJQueryUI": true,
			"bFilter": false,
			"bLengthChange": false,
			"bInfo": false,
			"bPaginate": false,
			"bRetrieve": true,
			//"sPaginationType": "full_numbers",
			"aaSorting": [[0, "asc"]],

			"aoColumns": [
					{ "sWidth": "30%", "bSortable": true, "bVisible": true },
					{ "sWidth": "30%", "bSortable": true, "bVisible": true },
					{ "sWidth": "30%", "bSortable": true, "bVisible": true },
					{ "sWidth": "10%", "bSortable": true, "bVisible": true }
			]
		});
		$('.p-credit-tvinactive').dataTable({
			"bAutoWidth": false,
			"bJQueryUI": true,
			"bFilter": false,
			"bLengthChange": false,
			"bInfo": false,
			"bPaginate": false,
			"bRetrieve": true,
			//"sPaginationType": "full_numbers",
			"aaSorting": [[0, "asc"]],

			"aoColumns": [
					{ "sWidth": "30%", "bSortable": true, "bVisible": true },
					{ "sWidth": "30%", "bSortable": true, "bVisible": true },
					{ "sWidth": "30%", "bSortable": true, "bVisible": true },
					{ "sWidth": "10%", "bSortable": true, "bVisible": true }
			]
		});
		//financials
		$('.p-fin-boxoffice').dataTable({
			"bAutoWidth": false,
			"bJQueryUI": true,
			"bFilter": false,
			"bLengthChange": false,
			"bInfo": false,
			"bPaginate": false,
			"bRetrieve": true,
			//"sPaginationType": "full_numbers",
			"aaSorting": [[0, "asc"]],

			"aoColumns": [
					{ "sWidth": "10%", "bSortable": true, "bVisible": true },
					{ "sWidth": "25%", "bSortable": true, "bVisible": true },
					{ "sWidth": "25%", "bSortable": true, "bVisible": true },
					{ "sWidth": "20%", "bSortable": true, "bVisible": true },
					{ "sWidth": "10%", "bSortable": true, "bVisible": true },
					{ "sWidth": "10%", "bSortable": true, "bVisible": true }
			]
		});
		$('.p-fin-intl-boxoffice').dataTable({
			"bAutoWidth": false,
			"bJQueryUI": true,
			"bFilter": false,
			"bLengthChange": false,
			"bInfo": false,
			"bPaginate": false,
			"bRetrieve": true,
			//"sPaginationType": "full_numbers",
			"aaSorting": [[0, "asc"]],

			"aoColumns": [
					{ "sWidth": "25%", "bSortable": true, "bVisible": true },
					{ "sWidth": "10%", "bSortable": true, "bVisible": true },
					{ "sWidth": "25%", "bSortable": true, "bVisible": true },
					{ "sWidth": "20%", "bSortable": true, "bVisible": true },
					{ "sWidth": "10%", "bSortable": true, "bVisible": true },
					{ "sWidth": "10%", "bSortable": true, "bVisible": true }
			]
		});	
		$('.p-fin-salary').dataTable({
			"bAutoWidth": false,
			"bJQueryUI": true,
			"bFilter": false,
			"bLengthChange": false,
			"bInfo": false,
			"bPaginate": false,
			"bRetrieve": true,
			//"sPaginationType": "full_numbers",
			"aaSorting": [[0, "asc"]],

			"aoColumns": [
					{ "sWidth": "10%", "bSortable": true, "bVisible": true },
					{ "sWidth": "30%", "bSortable": true, "bVisible": true },
					{ "sWidth": "20%", "bSortable": true, "bVisible": true },
					{ "sWidth": "30%", "bSortable": true, "bVisible": true },
					{ "sWidth": "10%", "bSortable": true, "bVisible": true }
			]
		});
		//clients
		$('.p-clients').dataTable({
			"bAutoWidth": false,
			"bJQueryUI": true,
			"bFilter": false,
			"bLengthChange": false,
			"bInfo": false,
			"bPaginate": false,
			"bRetrieve": true,
			//"sPaginationType": "full_numbers",
			"aaSorting": [[0, "asc"]],

			"aoColumns": [
					{ "sWidth": "33%", "bSortable": true, "bVisible": true },
					{ "sWidth": "33%", "bSortable": true, "bVisible": true },
					{ "sWidth": "34%", "bSortable": true, "bVisible": true }
			]
		});		
		
	}
	initPersonDataTables();

	//inherit td width into cell children
	//non-scrolling tables
	 var cellWidth = {

		//person credit
		// "p-credit":[222, 204, 222, 105],
		// "p-credit-past":[227, 204, 251, 95],
		// "p-credit-inactive":[251, 251, 251],
		// "p-credit-tv":[200, 200, 190, 95, 95],
		// "p-credit-tvupcoming":[200, 200, 190, 95, 95],
		// "p-credit-tvpast":[200, 200, 190, 190],
		// "p-credit-tvepi":[200, 200, 190, 190],
		// "p-credit-tvinactive":[200, 200, 190, 190],
	
		//person financial
		// "p-fin-boxoffice":[200, 200, 190, 190],
		// "p-fin-intl-boxoffice":[200, 100, 140, 140, 100, 100,],	
		// "p-fin-salary":[200, 200, 190, 190],
		
		//person awards	
		//"p-awards":["5%", "25%", "30%", "20%", "20%"],
		//person biography
		"p-bio-mile":["10%", "90%"],
		"p-bio-family":["20%", "10%", "20%", "50%"],
		
		//person awards
		//"p-awards":[100, 200, 190, 145, 145],
		
		//person Clients
		"p-clients":[250, 250, 280],
		
		//person
		"proj-credit-all-cat":[245, 430],
		
		//person aside summary tables
		"p-s-awards":["60%", "40%"],
		"p-s-bo":["60%", "40%"],
		"p-s-similar":["60%", "40%"],

		//organization
		"org-creditlist":[317, 202, 152]
		
	 };

	function applyCellWidths(tableName)
	{
	    if(tableName == null || tableName == "")
	    {
			//tbody
		   $.each(cellWidth, function(key, val) {
		     for (var i=0, cl=val.length; i<cl; i++) {
		       $('.' + key + ' tbody td:nth-child(' + (i+1) + ')').width(val[i])
		         .children().css({overflow: 'hidden'}).width(val[i]-9);
		     };
		   });

	    }
	    else
	    {
	        applyWidth(tableName, cellWidth[tableName]);
	    }
	}

	function applyWidth(key, value)
	{
	    for (var i=0, cl=value.length; i<cl; i++) {
	        $('.' + key + ' thead th:nth-child(' + (i+1) + ')').width(value[i]);
	        $('.' + key + ' tbody td:nth-child(' + (i+1) + ')').width(value[i])
	            .children().not("td:last-child").css({overflow: 'hidden'}).width(value[i]-9);
	     };
	    $("td:last-child").children().css({overflow:'visible'}).width("auto");
	}
	//tables org
    //applyCellWidths("p-credit");
	// applyCellWidths("p-credit-past");
	// applyCellWidths("p-credit-inactive");
	// applyCellWidths("p-credit-tv");
	// applyCellWidths("p-credit-tvupcoming");
	// applyCellWidths("p-credit-tvpast");
	// applyCellWidths("p-credit-tvepi");
	// applyCellWidths("p-credit-tvinactive");
	// applyCellWidths("p-fin-boxoffice");
	// applyCellWidths("p-fin-salary");
	// applyCellWidths("p-clients");
	// applyCellWidths("p-s-awards");
	// applyCellWidths("p-s-bo");
	// applyCellWidths("p-s-similar");