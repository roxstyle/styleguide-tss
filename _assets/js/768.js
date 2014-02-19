$(function() {

	//homepage dialog
	function tssfeaturetour() {
			$( "#takethetour" ).dialog( "close" );
			$(function() {
				$("#takethetour").dialog({
					bgiframe: true,
					autoOpen: false,
					width:510,
					maxWidth:510,
					resizable: false,
					modal: true,
					dialogClass:'tsstour',
					zIndex: 3200,
					overlay: {
						backgroundColor: '#000',
						opacity: 0.8
					}
				});

				$("#tour").click(function() {
					$( "#takethetour" ).dialog( "open" );
				});
				$("#takethetour .modalClose, #takethetour .ui-icon-closethick, .ui-icon-closethick").click(function() {
				        $('#takethetour').dialog('close');
				 });
			});
	}
	tssfeaturetour();

});

function initUI() {
	// tabs general
	$(function() {
		$( ".tabs" ).tabs();
	});
	// tabs home page
	$(function() {
		$( ".popular" ).tabs();
	});
	$(function() {
		$( ".trending" ).tabs();
	});
	$(function() {
		$( "#featured" ).tabs();
	});
	// search results tabs
	$(function() {
		$( ".filtertype" ).tabs();
	});

	// mylists templates
	$('.t article.t-aside').addClass('box');
	// profile sidebar
	$('aside .profile').addClass('clearfix');
	$("body:not('.index') aside > section").addClass("clearfix");

	// record actions
	$('#record-menu').show();
	$('#toolPrint').show();
	// summary timestamp
	$('#main #summary footer').show();
	// search result filters
	$('#person-options').css("text-indent","0");
	$('#project-options').css("text-indent","0");
	$('#company-options').css("text-indent","0");
	// home page
	$('.flex-container').show();
	$('.thetour').show();
	$('aside .buzzpop').show();
	$('.bb-reports').show();


}
initUI();


// function togNavPrimary() {
// 	//unwrap the form with the id we want for small screen
// 	$(".masthead .h-content > .search").unwrap("#masthead-search");
// }
// togNavPrimary();



//a whole lot of tables makes this responsive site sad

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
		"aaSorting": [[0, "asc"]],

		"aoColumns": [
				{ "sWidth": "30%", "bSortable": true, "bVisible": true },
				{ "sWidth": "30%", "bSortable": true, "bVisible": true },
				{ "sWidth": "30%", "bSortable": true, "bVisible": true },
				{ "sWidth": "10%", "bSortable": true, "bVisible": true }
		]
	});
	//past films
	$('.p-credit-past').dataTable({
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
	//inactive films
	$('.p-credit-inactive').dataTable({
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
				{ "sWidth": "34%", "bSortable": true, "bVisible": true },
				{ "sWidth": "33%", "bSortable": true, "bVisible": true },
				{ "sWidth": "33%", "bSortable": true, "bVisible": true }
		]
	});

	//upcoming tv
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
	//current tv
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
	//past tv
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
	//episodic tv
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
	//inactive tv
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
	//financials domestic box office
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
	//financials international box office
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

	//financials international box office summary
	$('.p-fin-intl-boxoffice-all').dataTable({
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
				{ "sWidth": "45%", "bSortable": true, "bVisible": true },
				{ "sWidth": "15%", "bSortable": true, "bVisible": true },
				{ "sWidth": "20%", "bSortable": true, "bVisible": true },
				{ "sWidth": "20%", "bSortable": true, "bVisible": true }
		]
	});
	//financials salary
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
	//person awards
	$('.p-awards').dataTable({
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
				{ "sWidth": "5%", "bSortable": true, "bVisible": true },
				{ "sWidth": "25%", "bSortable": true, "bVisible": true },
				{ "sWidth": "30%", "bSortable": true, "bVisible": true },
				{ "sWidth": "20%", "bSortable": true, "bVisible": true },
				{ "sWidth": "20%", "bSortable": true, "bVisible": true }
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

function initProjectFilmTables() {
	// project credits sortable table static
	// dependant jquery.dataTables.js
	//upcoming films
	$('.proj-credit').dataTable({
		"bAutoWidth": false,
		"bJQueryUI": true,
		"bFilter": false,
		"bLengthChange": false,
		"bInfo": false,
		"bPaginate": false,
		"bRetrieve": true,

		"aoColumns": [
				{ "sWidth": "35%", "bSortable": true, "bVisible": true },
				{ "sWidth": "40%", "bSortable": true, "bVisible": true },
				{ "sWidth": "25%", "bSortable": true, "bVisible": true }
		]
	});

	//financials domestic box office
	$('.proj-fin-box').dataTable({
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
				{ "sWidth": "15%", "bSortable": true, "bVisible": true },
				{ "sWidth": "15%", "bSortable": true, "bVisible": true },
				{ "sWidth": "20%", "bSortable": true, "bVisible": true }
		]
	});

	//financials international box office
	$('.proj-fin-intl-box').dataTable({
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
				{ "sWidth": "15%", "bSortable": true, "bVisible": true },
				{ "sWidth": "15%", "bSortable": true, "bVisible": true },
				{ "sWidth": "25%", "bSortable": true, "bVisible": true },
				{ "sWidth": "20%", "bSortable": true, "bVisible": true },
				{ "sWidth": "13%", "bSortable": true, "bVisible": true },
				{ "sWidth": "12%", "bSortable": true, "bVisible": true }
		]
	});

	//project film awards
	$('.proj-film-awards').dataTable({
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
				{ "sWidth": "20%", "bSortable": true, "bVisible": true }
		]
	});

	//project tv credits
	$('.proj-credit-tv').dataTable({
		"bAutoWidth": false,
		"bJQueryUI": true,
		"bFilter": false,
		"bLengthChange": false,
		"bInfo": false,
		"bPaginate": false,
		"bRetrieve": true,

		"aoColumns": [
				{ "sWidth": "30%", "bSortable": true, "bVisible": true },
				{ "sWidth": "30%", "bSortable": true, "bVisible": true },
				{ "sWidth": "25%", "bSortable": true, "bVisible": true },
				{ "sWidth": "15%", "bSortable": true, "bVisible": true }
		]
	});

}
initProjectFilmTables();

function initOrgTables() {
	// organization sortable tables
	// dependant jquery.dataTables.js
	//organization employees
	$('.org-emp').dataTable({
		"bAutoWidth": false,
		"bJQueryUI": true,
		"bFilter": false,
		"bLengthChange": false,
		"bInfo": false,
		"bPaginate": false,
		"bRetrieve": true,

		"aoColumns": [
				{ "sWidth": "50%", "bSortable": true, "bVisible": true },
				{ "sWidth": "50%", "bSortable": true, "bVisible": true }
		]
	});

}
initOrgTables();

function initResultsTables() {
	// search results sortable tables
	// dependant jquery.dataTables.js
	//people
	$('.sresults-peo').dataTable({
		"bAutoWidth": false,
		"bJQueryUI": true,
		"bFilter": false,
		"bLengthChange": false,
		"bInfo": false,
		"bPaginate": false,
		"bRetrieve": true,

		"aoColumns": [
				{ "sWidth": "5%", "bSortable": false, "bVisible": true },
				{ "sWidth": "10%", "bSortable": false, "bVisible": true},
				{ "sWidth": "15%", "bSortable": true, "bVisible": true },
				{ "sWidth": "10%", "bSortable": true, "bVisible": true },
				{ "sWidth": "20%", "bSortable": true, "bVisible": true },
				{ "sWidth": "20%", "bSortable": true, "bVisible": true },
				{ "sWidth": "20%", "bSortable": false, "bVisible": true }
		]
	});

	//project
	$('.sresults-project').dataTable({
		"bAutoWidth": false,
		"bJQueryUI": true,
		"bFilter": false,
		"bLengthChange": false,
		"bInfo": false,
		"bPaginate": false,
		"bRetrieve": true,

		"aoColumns": [
				{ "sWidth": "5%", "bSortable": false, "bVisible": true },
				{ "sWidth": "10%", "bSortable": false, "bVisible": true },
				{ "sWidth": "20%", "bSortable": true, "bVisible": true },
				{ "sWidth": "15%", "bSortable": false, "bVisible": true },
				{ "sWidth": "15%", "bSortable": true, "bVisible": true },
				{ "sWidth": "20%", "bSortable": false, "bVisible": true },
				{ "sWidth": "15%", "bSortable": true, "bVisible": true }
		]
	});

	//company
	$('.sresults-com').dataTable({
		"bAutoWidth": false,
		"bJQueryUI": true,
		"bFilter": false,
		"bLengthChange": false,
		"bInfo": false,
		"bPaginate": false,
		"bRetrieve": true,

		"aoColumns": [
				{ "sWidth": "5%", "bSortable": false, "bVisible": true },
				{ "sWidth": "10%", "bSortable": false, "bVisible": true },
				{ "sWidth": "20%", "bSortable": true, "bVisible": true },
				{ "sWidth": "20%", "bSortable": false, "bVisible": true },
				{ "sWidth": "20%", "bSortable": false, "bVisible": true },
				{ "sWidth": "25%", "bSortable": false, "bVisible": true }
		]
	});

}
initResultsTables();

function initClientTables() {
	// client sortable tables
	// dependant jquery.dataTables.js
	//client project tv standards
	$('.client-standards').dataTable({
		"bAutoWidth": false,
		"bJQueryUI": true,
		"bFilter": false,
		"bLengthChange": false,
		"bInfo": false,
		"bPaginate": false,
		"bRetrieve": true,

		"aoColumns": [
				{ "sWidth": "10%", "bSortable": true, "bVisible": true },
				{ "sWidth": "20%", "bSortable": true, "bVisible": true },
				{ "sWidth": "20%", "bSortable": true, "bVisible": true },
				{ "sWidth": "35%", "bSortable": true, "bVisible": true },
				{ "sWidth": "15%", "bSortable": true, "bVisible": true }
		]
	});
	// client sortable tables
	// dependant jquery.dataTables.js
	//client project tv pdm
	$('.client-pdm').dataTable({
		"bAutoWidth": false,
		"bJQueryUI": true,
		"bFilter": false,
		"bLengthChange": false,
		"bInfo": false,
		"bPaginate": false,
		"bRetrieve": true,

		"aoColumns": [
				{ "sWidth": "16%", "bSortable": true, "bVisible": true },
				{ "sWidth": "16%", "bSortable": true, "bVisible": true },
				{ "sWidth": "16%", "bSortable": true, "bVisible": true },
				{ "sWidth": "16%", "bSortable": true, "bVisible": true },
				{ "sWidth": "16%", "bSortable": true, "bVisible": true },
				{ "sWidth": "16%", "bSortable": true, "bVisible": true }
		]
	});
	// client sortable tables
	// dependant jquery.dataTables.js
	//client project tv pdm
	$('.client-pitch').dataTable({
		"bAutoWidth": false,
		"bJQueryUI": true,
		"bFilter": false,
		"bLengthChange": false,
		"bInfo": false,
		"bPaginate": false,
		"bRetrieve": true,

		"aoColumns": [
				{ "sWidth": "16%", "bSortable": true, "bVisible": true },
				{ "sWidth": "16%", "bSortable": true, "bVisible": true },
				{ "sWidth": "16%", "bSortable": true, "bVisible": true },
				{ "sWidth": "16%", "bSortable": true, "bVisible": true },
				{ "sWidth": "16%", "bSortable": true, "bVisible": true },
				{ "sWidth": "16%", "bSortable": true, "bVisible": true }
		]
	});

}
initClientTables();

//us film release calendar sorting paging
//dependant jquery.dataTables.js
function usFilmRelSort() {
        $.ajax({
            url: 'ajax/cal-film-release-sort.html',
            dataType: 'html',
            success: function (data) {
                $('.calsort #main .uscal header').after(data);
                // sortable table
                // dependant jquery.dataTables.js
                $('.cal-filmrelease-sort').dataTable({
                    "bAutoWidth": false,
                    "bJQueryUI": true,
                    "bFilter": false,
                    "bLengthChange": false,
                    "bInfo": false,
                    "bPaginate": false,
                    //"sPaginationType": "full_numbers",
                    "aaSorting": [[1, "asc"]],

	                "aoColumns": [
					{ "sTitle": "Release Date", "sWidth": "10%", "bSortable": true },
					{ "sTitle": "Title", "sWidth": "25%", "bSortable": true },
					{ "sTitle": "Director", "sWidth": "15%", "bSortable": false },
					{ "sTitle": "Rating", "sWidth": "10%", "bSortable": true },
					{ "sTitle": "Distributor", "sWidth": "20%", "bSortable": false },
					{ "sTitle": "Genre", "sWidth": "20%", "bSortable": false }
					]
            	});
        	}

    });
}
usFilmRelSort();

//recent rep updates listing sorting paging
//dependant jquery.dataTables.js
function repUpdates() {
        $.ajax({
            url: 'ajax/replist.html',
            dataType: 'html',
            success: function (data) {
                $('.repup #main .repslist header').after(data);
                // sortable table
                // dependant jquery.dataTables.js
                $('.dashboard-recentrepupdates').dataTable({
                    "bAutoWidth": false,
                    "bJQueryUI": true,
                    "bFilter": false,
                    "bLengthChange": false,
                    "bInfo": false,
                    "bPaginate": false,
                    //"sPaginationType": "full_numbers",
                    "aaSorting": [[1, "asc"]],

	                "aoColumns": [
					{ "sTitle": "Person", "sWidth": "20%", "bSortable": true },
					{ "sTitle": "Rep Company", "sWidth": "25%", "bSortable": true },
					{ "sTitle": "Point Person", "sWidth": "20%", "bSortable": true },
					{ "sTitle": "Phone Number", "sWidth": "20%", "bSortable": true },
					{ "sTitle": "Updated", "sWidth": "15%", "bSortable": true }
					]
            	});
        	}

    });
}
repUpdates();


//inherit td width into cell children
//non-scrolling non-datatable non-sorting tables
 var cellWidth = {
	//person biography
	"p-bio-mile":["10%", "90%"],
	"p-bio-family":["20%", "10%", "20%", "50%"],
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

//tables person
applyCellWidths("p-clients");
applyCellWidths("p-bio-mile");
applyCellWidths("p-bio-family");
applyCellWidths("p-s-awards");
applyCellWidths("p-s-bo");
applyCellWidths("p-s-similar");


