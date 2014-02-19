
//Advanced Search Menu
// nav.sections person/project
function advSearchMenu() {
	$(".nav-search nav.sections>ul>li>a").click(function() {
		$(this).parents().find('.cat li.active')
			.removeClass('active');
		$(this).parent('li').addClass('active');

		var active = $(this).parent();
		if ((active).hasClass("s-people")) {
			unDetails( );
			$("#main > #people").addClass('selected');
			perJobtype();
			defaultSubJob();
			defaultProjInv();
			calloutPer();
		}
		if ((active).hasClass("s-project")) {
			unDetails( );
			$("#main > #project").addClass('selected');
			calloutProj();
		}
		if ((active).hasClass("s-tv")) {
			unDetails( );
			$("#main > #tv").addClass('selected');
		}
		if ((active).hasClass("s-film")) {
			unDetails( );
			$("#main > #film").addClass('selected');
		}
		if ((active).hasClass("s-company")) {
			unDetails( );
			$("#main > #company").addClass('selected');
			calloutCom();
		}
		if ((active).hasClass("s-popular")) {
			unDetails( );
			$("#main > #popular").addClass('selected');
			defaultPop();
			popType();
		}
		if ((active).hasClass("s-casting")) {
			unDetails( );
			$("#main > #casting").addClass('selected');
		}
		function unDetails( ) {
			$("#main > section").removeClass('selected');
			$('aside .filterby').removeClass('active');
			$('aside .criteria').hide();
		}
	});
}
advSearchMenu( );

//ADVANCED SEARCH
//filters for search results
function calloutPer() {
	$('aside #person-options').addClass('active').show();
	$("aside section:not('#person-options')").removeClass('active');
	$("aside #person-options").find('div.filter').eq(0).addClass("alpha");
	$("aside .active").find('div.filter').eq(0).addClass("alpha").find('.filter-detail').show();
	$("aside section.active .alpha").find('.summary').addClass('open');
	$('aside #crit-person').show();
}

function calloutProj() {
	$('aside #project-options').addClass('active').show();
	$("aside section:not('#project-options')").removeClass('active');
	$("aside #project-options").find('div.filter').eq(0).addClass("alpha");
	// $("aside .active").find('div.filter').eq(0).addClass("alpha");
	$("aside .active").find('div.filter').eq(0).addClass("alpha").find('.filter-detail').show();
	$("aside section.active .alpha").find('.summary').addClass('open');
	$('aside #crit-project').show();
}

function calloutCom() {
	$('aside #company-options').addClass('active').show();
	$("aside section:not('#company-options')").removeClass('active');
	//$("aside #company-options").find('div.filter').eq(0).addClass("alpha");
	$("aside .active").find('div.filter').eq(0).addClass("alpha").find('.filter-detail').show();
	$("aside section.active .alpha").find('.summary').addClass('open');
	$('aside #crit-company').show();
}
defaultCallout();
function defaultCallout() {
	$('aside #person-options').addClass('active');
	$("aside section:not('#person-options')").removeClass('active');
	//$("aside #person-options").find('div.filter').eq(0).addClass("alpha");
	$("aside .active").find('div.filter').eq(0).addClass("alpha").find('.filter-detail').show();
	$("aside section.active .alpha").find('.summary').addClass('open');
	$('aside #crit-person').show();
}

//toggle aside nested filters
function defaultFilter() {
	$('aside .filterby .filter.alpha .summary').addClass("open");
	$('aside .filterby .filter .filter-detail').hide();
	$('aside .filterby .filter.alpha .filter-detail').show();
}
defaultFilter();

function openFilter() {
	$('aside .filter .summary a').click( function( ){
		var s = $(this).parent('.summary');
		var t = $(this).parents('.filter').find('.filter-detail');

		if($(s).hasClass("open")) {
					$(s).removeClass("open");
					$(t).hide('fast');
					return false;
				}
				else {
					$(s).addClass("open");
					$(t).show('fast');
					return false;
				}
	});
}
openFilter();

//toggle search
function searchTog() {
	$('a.slider').click( function( ){
		var id = $(this).next(".slid");
		$(id).slideToggle('fast');
		defaultProjInv();
	});
}
searchTog();

//item to toggle search
function defaultAdvSearch() {
	$(".slid").hide();
	return false;
}
defaultAdvSearch();

//section is live
function sectionSelect() {
	searchTog();
	defaultAdvSearch();
	defaultSubJob();
	splitLists();
}

//filter person search by project invlolvement
function perProjtype() {
	$('.proj-involvement').change(function() {
		var sel = $(".proj-involvement input:checked").val();
		var f = $(this).closest('li').find('.filter-proj-film');
		var t = $(this).closest('li').find('.filter-proj-tv');
		switch(sel)	{
			case 'All':
				$('.filter-proj-tv, .filter-proj-film').hide();
				return;
			case 'TV':
				$(this).prop('checked');
				//alert("checked")
				$(f).hide();
				$(t).show("slow");
				return;
			case 'Film':
				$(this).prop('checked');
				$(t).hide();
				$(f).show("slow");
				return;
			default:
				$('.filter-proj-tv, .filter-proj-film').hide();
				$('.proj-involvement input:nth-child('+ sel +')').show();
				return;
		}

	});
}
perProjtype();

//filter person search by company invlolvement
function perComtype() {
	$('.com-involvement').change(function() {
		var sel = $(".com-involvement input:checked").val();
		var f = $(this).closest('li').find('.filter-proj-film');
		var t = $(this).closest('li').find('.filter-proj-tv');
		switch(sel)	{
			case 'All':
				$('.filter-proj-tv, .filter-proj-film').hide();
				//alert("All")
				return;
			case 'TV':
				$(this).prop('checked');
				//alert("TV")
				$(f).hide();
				$(t).show("slow");
				return;
			case 'Film':
				$(this).prop('checked');
				//alert("Film")
				$(t).hide();
				$(f).show("slow");
				return;
			default:
				$('.filter-proj-tv, .filter-proj-film').hide();
				$('.com-involvement input:nth-child('+ sel +')').show();
				return;
		}

	});
}
perComtype();

// default ProjectInvolvement panel
function defaultProjInv() {
	if ((".proj-involvement") == (true)) {
		$(".proj-involvement input").val('All').prop('checked');
	}
	if ((".com-involvement") == (true)) {
		$(".com-involvement input").val('All').prop('checked');
	}
	$('.filter-proj-tv, .filter-proj-film').hide();
}
defaultProjInv();

//filter person search by job
function perJobtype() {

	$('#person-emp-group > li input:checkbox').toggle(function() {
		//count how many checkboxes are checked
		var i = $("#person-emp-group > li > input.checked");
		var n = $("#person-emp-group > li > input:checked").length;
		//make the parent a variable
		var c = $(this).closest("li");
		//make the parent with children a variable
		var ch = $(c).has("span.nested").length;
		var nested = $(this).siblings("span.nested");
			//make this checkbox checked
			$(i).prop("checked");
			//if the input clicked is less than equal to 5 and has child
			if( (n <= 5) && ((ch) == 1) ) {
				//alert(n);
				//show the child
				$(nested).show("fast");
			}
	}, function() {
		//count how many checkboxes are checked
		var i = $("#person-emp-group > li > input.checked");
		var n = $("#person-emp-group > li > input:checked").length;
		//make the parent a variable
		var c = $(this).closest("li");
		//make the parent with children a variable
		var ch = $(c).has("span.nested").length;
		var nested = $(this).siblings("span.nested");

			$("#person-emp-group > li > input").removeProp('checked');
			$(nested).hide("slow");
	});
}
perJobtype();

// default SubPanels in person search by job
function defaultSubJob() {
	$("#person-emp-group li span.nested").hide();
	$("#person-emp-group li input:checkbox").removeAttr(':checked');
	//$('#person-emp-group > li').has('span.nested').css('background-color', 'red');
}
defaultSubJob();

// popular searches by project
function popType() {
	$('.popular-type input:radio').change(function() {
		var sel = $(".popular-type input:checked").val();
		var nosel = $(".popular-type input:not(:checked)");
		var t = $(this).closest('fieldset').find('.pop-proj-tv');
		var f = $(this).closest('fieldset').find('.pop-proj-film');
		switch(sel)	{
			case '1':
				//$(this).prop('checked');
				$(this).attr("checked", "checked");
				$(nosel).removeAttr('checked');
				//alert(nosel.val());
				$(t).hide();
				//$(this).closest('fieldset').find('.pop-proj-tv').hide();
				$(f).show("slow");
				//$(this).closest('fieldset').find('.pop-proj-film').show();
				return;
			case '2':
				//$(this).prop('checked');
				$(this).attr("checked", "checked");
				$(nosel).removeAttr('checked');
				//alert(nosel.val());
				$(f).hide();
				//$(this).closest('fieldset').find('.pop-proj-film').hide();
				$(t).show("slow");
				//$(this).closest('fieldset').find('.pop-proj-tv').show();
				return;
			// default:
			// $('.pop-proj-tv').hide();
			// $('.pop-proj-film').show();
			// return;
		}

	});
}
popType();


function defaultPop() {
	$('.pop-proj-tv').hide();
	$('.pop-proj-film').hide();
}

//default criteria
function defaultCrit() {
	$('aside .criteria').hide();
	$('aside #crit-person').show();
}
defaultCrit();

// popular searches by project
function liSel() {
	$('.li-enabled input:radio').change(function() {
		defaultLiSel();
		//$('input:not(sel)').removeAttr('checked');
		var sel = $(".li-enabled input:checked");
		var ck = $(sel).attr("checked", "checked");
		var t = $(this).closest('li');
		$(t).addClass('selected');
	});
}
liSel();

function defaultLiSel() {
	$('.li-enabled li').removeClass('selected');
}
defaultLiSel();

