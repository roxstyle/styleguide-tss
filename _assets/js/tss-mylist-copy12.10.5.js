//My Notes,My Watch,My Saved Searches Aside Menu
//Default Load
//moved to script.js init
// function listMenu() {
// 	$(".mlist .nav-lists .sections>ul>li").removeClass('active');
// 	$(".mlist #main > section:not('#list-all')").removeClass('selected');
// 	$(".mlist #main > #list-all").addClass('selected');
// }
// listMenu();

//My Notes,My Watch,My Saved Searches Aside Menu
//nav.sections person/project/company
//dependent  script.js init
function mlistsMenu() {

	$(".mlist .nav-lists nav.sections>ul>li>a").click(function() {

		$(this).parents().find('.cat li.active').removeClass('active');
		$(this).parent('li').addClass('active');
		unDetails();

		var active = $(this).parent();
		if ((active).hasClass("l-all")) {
			$(".mlist #main > #list-all").addClass('selected');
			$(".mlist #main > #list-all section").show();
		}
		if ((active).hasClass("l-people")) {
			$(".mlist #main > #list-people").addClass('selected');
			$(".mlist #main > #list-people section").show();
		}
		if ((active).hasClass("l-project")) {
			$(".mlist #main > #list-project").addClass('selected');
			$(".mlist #main > #list-project section").show();
		}
		if ((active).hasClass("l-company")) {
			$(".mlist #main > #list-company").addClass('selected');
			$(".mlist #main > #list-company section").show();
		}
		if ((active).hasClass("l-digest")) {
			$(".mlist #main > #list-digest").addClass('selected');
			$(".mlist #main > #list-digest section").show();
		}
		function unDetails() {
			$(".mlist #main > section").removeClass('selected');
		}
	});
}


//lists MyLists main listing
function mainLists() {
	$('ul.lists .toolEdit a').bind("click", function () {
		var s = $(this).closest('.s');
		var i = $(this).closest('.s').next('.itemeditor');
		var li = $(this).closest('li');

		defaultLists();

		$.ajax({
			type: "GET",
			url: 'ajax/edit-main-mylisting.html',
			dataType: 'html',
			success: function (data) {
				$(s).after(data);
			}

		});

	});
}
mainLists();

function defaultLists() {
	var i = $('.itemeditor');
	if ((i) === true){
		$(i).unbind();
	}
}

//lists MyNotes main listing
function myNotes() {
	$('.notes .toolEdit a').bind("click", function () {
		var s = $(this).closest('.s');
		var i = $(this).closest('.s').next('.itemeditor');
		var li = $(this).closest('li');

		defaultLists();

		$.ajax({
			type: "GET",
			url: 'ajax/edit-mynotes.html',
			dataType: 'html',
			success: function (data) {
				$(s).after(data);
			}

		});

	});
}
myNotes();

//lists MyView header
function myViewHead() {
	$('.list-details > header .toolEdit a').bind("click", function () {
		var h = $(this).parents('header').children('.itemeditor');
		$(h).toggle();
		return false;
	});
}
myViewHead();

//lists MyView
function myView() {
	$('ul.t .toolComment a').bind("click", function () {
		var h = $(this).parents('.t > li').children('.itemeditor');
		$(h).toggle();
		return false;
	});
}
myView();

//item to toggle
function defaultListEdit() {
	$(".list-details .itemeditor ").hide();
	return false;
}
defaultListEdit();

//My Account nav.sections person/project/company
function accountMenu( ){
	$(".account .nav-lists nav.sections>ul>li>a").click( function() {

		$(this).parents().find('.cat li.active')
			.removeClass('active');
		$(this).parent('li').addClass('active');

		var active = $(this).parent();
		if ((active).hasClass("user-profile")) {
			unDetails( );
			$(".account #main > #user").addClass('selected');
		}
		if ((active).hasClass("company-profile")) {
			unDetails( );
			$(".account #main > #company").addClass('selected');
			$(".account #main > #company section").show( );
		}
		if ((active).hasClass("change-password")) {
			unDetails( );
			$(".account #main > #password").addClass('selected');
			$(".account #main > #password section").show( );
		}
		function unDetails( ) {
			$(".account #main > section").removeClass('selected');
		}
	});
}


//Mylists project templates
function projTemplates() {
	var template = $("body.listemplates #list-project .tmplt");
	$(template).addClass("hidden");
	$('body.listemplates #list-project > .t-project').removeClass("hidden");
	$("#mylistprojectFilter option:selected").val(1);

}
projTemplates();

//mylists project templates filter
function projectMyListTemplates() {
	$("#mylistprojectFilter").change(function () {
		var template = $(".tmplt");
		var t = $("body.listemplates #list-project").children();
		var sel = $("#mylistprojectFilter option:selected").val();
		$(template).addClass("hidden");

		if (sel == 1) {
			t = $('.t-project').removeClass('hidden');
		}
		if (sel == 2) {
			t = $('.t-premise').removeClass('hidden');
			return;
		}
		if (sel == 3) {
			t = $('.t-projleads').removeClass('hidden');
			return;
		}
		if (sel == 4) {
			t = $('.t-tvgrid').removeClass('hidden');
			return;
		}
		if (sel == 5) {
			t = $('.t-projrelease').removeClass('hidden');
			return;
		}
		if (sel == 6) {
			t = $('.t-projloc').removeClass('hidden');
			return;
		}
		// sample 6col
		if (sel == 10) {
			t = $('.t-projCustom').removeClass('hidden');
			return;
		}
		// sample 7col
		if (sel == 11) {
			t = $('.t-projCustom-2').removeClass('hidden');
			return;
		}
		// sample 8col
		if (sel == 12) {
			t = $('.t-projCustom-3').removeClass('hidden');
			return;
		}
		// sample 5col
		if (sel == 13) {
			t = $('.t-projCustom-4').removeClass('hidden');
			return;
		}
		// itemeditor custom list
		if (sel == 'custom') {
			$('#customlist').slideToggle('fast').addClass("active");
			return;
		}
	});

}
projectMyListTemplates();

function partTemplates() {
	var template = $("body.listemplates #list-people .tmplt");
	$(template).addClass("hidden");
	$('#list-people > .t-partProj').removeClass("hidden");
	$("#mylistpartFilter option:selected").val(1);
}
partTemplates();

//mylists participants templates filter
 function partMyListTemplates() {
	$("#mylistpartFilter").change(function () {
		var template = $(".tmplt");
		var t = $("body.listemplates #list-people").children();
		var sel = $("#mylistpartFilter option:selected").val();
		$(template).addClass("hidden");

			if (sel == 1) {
				t = $('.t-partProj').removeClass('hidden');
				return;
			}
			if (sel == 2) {
				t = $('.t-partExpand').removeClass('hidden');
				return;
			}
			if (sel == 3) {
				t = $('.t-partContact').removeClass('hidden');
				return;
			}
			if (sel == 4) {
				t = $('.t-partCasting').removeClass('hidden');
				return;
			}
			if (sel == 5) {
				t = $('.t-partUpcoming').removeClass('hidden');
				return;
			}
			if (sel == 6) {
				t = $('.t-partDir').removeClass('hidden');
				return;
			}
			if (sel == 7) {
				t = $('.t-partActor').removeClass('hidden');
				return;
			}
			if (sel == 8) {
				t = $('.t-partWriter').removeClass('hidden');
				return;
			}
			// sample 6col
			if (sel == 10) {
				t = $('.t-partCustom').removeClass('hidden');
				return;
			}
			// sample 7col
			if (sel == 11) {
				t = $('.t-partCustom-2').removeClass('hidden');
				return;
			}
			// sample 8col
			if (sel == 12) {
				t = $('.t-partCustom-3').removeClass('hidden');
				return;
			}
			// sample 5col
			if (sel == 13) {
				t = $('.t-partCustom-4').removeClass('hidden');
				return;
			}
			// sample 4col
			if (sel == 14) {
				t = $('.t-partCustom-5').removeClass('hidden');
				return;
			}
			// sample 3col
			if (sel == 15) {
				t = $('.t-partCustom-6').removeClass('hidden');
				return;
			}
			// sample 2col
			if (sel == 16) {
				t = $('.t-partCustom-7').removeClass('hidden');
				return;
			}
			// itemeditor custom list
			if (sel == 'custom') {
				$('#customlist').slideToggle('fast').addClass("active");
				return;
			}
	});

}
partMyListTemplates();

//mylists company templates
function orgTemplates() {
	var template = $("body.listemplates #list-company .tmplt");
	$(template).addClass("hidden");
	$('body.listemplates #list-company > .t-orgAdr').removeClass("hidden");
	$("#mylistorgFilter option:selected").val(1);

}
orgTemplates();

function orgMyListTemplates() {
	$("#mylistorgFilter").change(function () {
		var template = $(".tmplt");
		var t = $("body.listemplates #list-company").children();
		var sel = $("#mylistorgFilter option:selected").val();
		$(template).addClass("hidden");

			if (sel == 1) {
				t = $('.t-orgAdr').removeClass('hidden');
				return;
			}
			if (sel == 2) {
				t = $('.t-orgProjFilm').removeClass('hidden');
				return;
			}
			if (sel == 3) {
				t = $('.t-orgProjTV').removeClass('hidden');
				return;
			}
			// sample 6col
			if (sel == 10) {
				t = $('.t-orgCustom').removeClass('hidden');
				return;
			}
			// sample 7col
			if (sel == 11) {
				t = $('.t-orgCustom-2').removeClass('hidden');
				return;
			}
			// sample 8col
			if (sel == 12) {
				t = $('.t-orgCustom-3').removeClass('hidden');
				return;
			}
			// sample 4col
			if (sel == 13) {
				t = $('.t-orgCustom-4').removeClass('hidden');
				return;
			}
			// itemeditor custom list
			if (sel == 'custom') {
				$('#customlist').slideToggle('fast').addClass("active");
				return;
			}
	});

}
orgMyListTemplates();

//sortable connected lists for custom templates
// $(function() {

// 		$(".custom-list").sortable({
// 			connectWith: ".connectedSortable",
// 			placeholder: "dd-placeholder",
// 			items: "li:not(.persistent)",
// 			dropOnEmpty:  true
// 		});
// 		$(".persistent").sortable("disabled");
// 		$(".custom-sort").disableSelection();

// });

//delete one sortable list item
$(".list-template .sl-list .delete").click(function() {
$(this).closest("sl-item").slideUp().remove();
// 	$template.refresh();
// 		return true;
});

//dependant script.js for init
//customListTemplate()
function customlistTemplate() {
	var $options = $('.list-options .sl-list');
	var $template = $('.list-template .sl-list');
	var $bye = $(".list-template .sl-list .delete");
	var sortableIn = 0;

	// activate draggable for list options
	$('li', $options).draggable({
		containment: $( ".custom-lists" ),
		cursor: "move",
		connectToSortable: ".connected",
		placeholder: "sl-placeholder",
		items: "li:not(.ui-state-disabled)",
		appendTo: ".custom-lists",
		helper: "clone",
		// helper: function() {
		// var selected = $('.grouped ');
		//	var container = $('<div/>');
		//var height;
		//if (selected.length === 0) {
		//	selected = $(this);
		//	}
		// container.append(selected.clone());
		// selected.toggle('fast');
		// height= parseInt(selected.parent().outerHeight(),10) - (parseInt(selected.length,10) * parseInt(selected.first().outerHeight(),10));
		// selected.parent().css('height',height);
		// return container;
		// },
		revert: "invalid",
		zIndex: 99999,
		// stop: function( event, ui ) {
		// 	var temp = $(".list-template .sl-item").data("id");
		// 	var opt = $(this).data("id");
		// 	//var opt = $(".list-options .sl-item").data("id");
		// 	if ( temp == opt ) {
		// 		$(opt).removeClass('ui-draggable').addClass("ui-state-disabled");
		// 		//$(ui.draggable).addClass("disabled");
		// 	}
		// }
		stop: function( event, ui ) {
			var temp = $(this).parents('.custom-lists').find(".list-template .sl-item").data("id");
			var id = $(this).data("id");
			//var opt = $(".list-options .sl-item").data("id");
			if ( id === temp ) {
				$(id).css("color","red").removeClass('ui-draggable').addClass("ui-state-disabled");
				//$(ui.draggable).addClass("disabled");
			}
		}
	});

	//deleting sortable list items
	// $bye.click(function() {
	// $(this).parent("li").remove();
	//	$template.refresh();
	//	return true;
	// });

	$template.droppable({
		// accept: ":not(.ui-sortable-helper)",
		accept: ".list-options .sl-list li",
		tolerance: 'pointer',
		hoverClass:  'dropHover',
		handle: 'sl-handle',
		drop: function( event, ui ) {
			console.log("Item was Dropped");
			$(this).append($(ui.draggable).clone());
			//ui.helper.empty();
			//addTool(ui.draggable);
			$('.sl-item').css('height','auto');
			// var $dragItems = $('.grouped');
			//	if($dragItems.length==0){
			//	moveList(ui.draggable, $(this));
			// }
			// else{
			//	moveList($dragItems , $(this) );
			//	}
			// var temp = $(".list-template .sl-list li").data("id");
			// var opt = $(".list-options .sl-list li").data("id");
			// if ( temp === opt ) {
			// 	//$(opt).addClass("disabled");
			// 	$(ui.draggable).addClass("disabled");
			// }

			 // var elementID = $(ui.draggable).attr("id") // get the dynamically set li id for each list item chosen
			 // var opt = $(".list-options .sl-list li").data("id");

    //             if( $(this).attr('id') == $(opt) ) {
    //                 // disable the element once it's been dragged and dropped
    //                 $(ui.draggable).draggable( 'option', 'disabled', true );
    //             }

		},
		deactivate: function(event, ui) {
			if ($(ui.draggable).hasClass("ui-draggable")) {
				$(ui.draggable).removeClass("ui-draggable").find('.sl-handle')
				.after('<button class="delete"><span class="tool tool-remove" title="remove"></span></button>');
			}
		}
	}).sortable({
		connectWith: ".connected",
		placeholder: "sl-placeholder",
		items: "li:not(.sl-persistent)",
		//handle: "sl-handle",
		// sort: function() {
		//	$(ui.draggable).removeClass("ui-draggable").find('.sl-handle')
		//	.after('<button class="delete"><span class="tool tool-remove" title="remove"></span></button>').end();
		// },
		revert: true,
		//receive: function(e, ui) { sortableIn = 1; },
		//over: function(e, ui) { sortableIn = 1; },
		//out: function(e, ui) { sortableIn = 0; },
		beforeStop: function(e, ui) {
			//if (sortableIn == 0) {
				//delete one sortable list item
				$(".list-template li .delete").click(function() {
					$(this).parent("li").remove();
						//$template.refresh();
						//return true;
				});
			//}
		},
			//
		success: function(e, ui) {
			var temp = $(this).parents('.custom-lists').find(".list-template .sl-item").each().data("id");
			var opt = $(this).parents('.custom-lists').find(".list-options .sl-item").data("id");
				$(".list-template li .delete").click(function() {
					$(this).parent("li").remove();
					if ( $(this).parent("li").data("id") ===  $(opt) ) {
						$(opt).removeClass('ui-state-disabled').addClass('ui-draggable');
					};
				});
		}

	});

	$(".sl-persistent").sortable("disabled");
	$(".sl-list li").disableSelection();

	// grouped element droppable and draggable
	// $('.sl-list > li').die('click');
	// $('.sl-list > li').live('click', function(e){
	// 	if($('.grouped').length!=0){
	// 		if($(this).parent().attr('id') != $('.grouped').parent().attr('id')){
	// 			$('li').removeClass('grouped');
	// 		}
	// 	}
	// 	$(this).toggleClass('grouped');
	// });
	// updateItem();

	// function addTool($item) {
	// 	$item.fadeOut( function() {
	// 		$item
	// 			.find('> .sl-handle')
	// 			.append('<span class="tool tool-close" title="remove"></span>')
	// 			.fadeIn();
	// 	});

	// }
}
customlistTemplate();

//function to move item from options to template
function moveList($dragItem,$dropList){
	//move the list (or the draggable item) when it is not dropped on its own droppable area.
	if($dragItem.parent().attr('id')!=$dropList.attr('id')){
		$dragItem.fadeOut(function(){
			$(this).appendTo($dropList).fadeIn('slow',updateItem());
		});
		//ungrouped after moved
		$('.grouped').toggleClass('grouped');
	}
	//when it is dropped to own list, then re-show the hidden items
	else{
		$dragItem.fadeIn('slow',updateItem());
	}
}

//this function is used to update the total item information in each box and also the itemList
function updateItem(){
	//Update itemList total item left information
	$('#options-num').text(function() {
		var n = $(".list-container li.sl-item").length;
		return "n";
	});
	$('#template-num').text(function() {
		var n = $(".list-template li.sl-item").length;
		return "n";
	});
}

//multiAccordian
(function ($) {
	$.fn.multiAccordion = function() {
		$(this).addClass("ui-accordion ui-accordion-icons ui-widget ui-helper-reset")
			.find("h3")
				.addClass("ui-accordion-header ui-helper-reset ui-state-default")
				.hover(function() { $(this).toggleClass("ui-state-hover"); })
				.prepend('<span class="ui-icon ui-icon-triangle-1-e"></span>')
			.click(function() {
				$(this)
					.toggleClass("ui-accordion-header-active ui-state-active ui-state-default")
				.find("> .ui-icon").toggleClass("ui-icon-triangle-1-e ui-icon-triangle-1-s").end()
				.next().toggleClass("ui-accordion-content-active").slideToggle();
					return false;
				})
				.next('div')
					.addClass("ui-accordion-content ui-helper-reset ui-widget-content")
					.css("display", "block")
					.hide()
				.end().trigger("click");
	};
})(jQuery);

$(".list-options > .list-container").multiAccordion();

//accordian expand collapse
function expandAll() {
	$(".list-options > .list-container h3").unbind('click.collapse');

	$(".list-options > .list-container h3").removeClass('ui-state-default')
		.addClass('ui-accordion-header-active ui-state-active')
		// .attr('aria-expanded', 'true')
		// .attr('aria-selected', 'true')
		// .attr('tabIndex', 0)
	.find("> .ui-icon")
		.removeClass('ui-icon-triangle-1-e')
		.addClass('ui-icon-triangle-1-s').end()
	.closest('h3').next('div')
		.addClass("ui-accordion-content-active")
		.css("display", "block")
		.show()
		.end();

	$('.collapse').text('collapse all sections').unbind('click').bind('click', collapseAll);

	// $('.list-container h3').bind('click.collapse', function() {
	//     collapseAll();
	//     $(this).click();
	// });
}

function collapseAll() {
	//$(".list-options > .list-container h3").unbind('click.collapse');

	$(".list-options > .list-container h3").removeClass('ui-accordion-header-active ui-state-active')
			.addClass("ui-state-default")
			.removeClass('ui-corner-top ui-corner-bottom')
			// .attr('aria-expanded', 'false')
			// .attr('aria-selected', 'false')
			// .attr('tabIndex', -1)
		.find("> .ui-icon")
			.removeClass('ui-icon-triangle-1-s')
			.addClass('ui-icon-triangle-1-e').end()
		.closest('h3').next('div')
			.removeClass("ui-accordion-content-active")
			.css("display", "none")
			.hide()
			.end();

	$('.collapse').text('expand all sections').unbind('click').bind('click', expandAll);

	//$('.list-container').accordion('destroy').accordion();
}

$('.collapse').click(collapseAll);

//select2 dropdowns
//dependant select2.min.js
//dependant script.js for init
function mlTemplates() {
	var s = $("body.listemplates #main > section");
	var selector = $("select.ml-templates");
	//list section showing controlled by left menu
	if ((s).hasClass('selected')) {
		$("select.ml-templates").select2({
			placeholder: "Select a Template"
		});
	}
	return false;

}
mlTemplates();

//toggle itemeditor for lists
function listTog() {
	$('.list-options input.slider').click(function() {
		var id = $(this).next(".slid");
		$(id).slideToggle('fast');
	});
}
listTog();

$(".list-details .checks label").prepend('<button class="edit"><span class="tool tool-edit" title="edit"></span></button><button class="delete"><span class="tool tool-remove" title="remove"></span></button>');

//close customlisting and open custom list with current options
function customlist() {
	$(".list-details li input:radio").change(function() {
		var radio = $(this);

		if ($(".list-details li input:radio:checked").length > 0) {
			$(this).parents("mylist-options").find("custom-lists").addClass("active")
			.closest("list-details").removeClass('expanded');
		} else {
			$(this).prop('checked', false);
			return;
		}

	});
}
customlist();

//edit a custom list
function customEdit() {
	$(".list-details li button.edit").live("click", function() {
		$(this).closest("fieldset.form-stacked").find('.custom-lists').addClass('active').end()
			.find('.list-name').addClass('active').end()
			.find(".list-details").removeClass('expanded').end()
			//.find('.mylist-options').find('.mylist-edit > .cur-temp').addClass('active');
			.find('.mylist-options').find('.mylist-edit > .tog .cur-temp').addClass('active');
		//$(this).parents(".list-details").removeClass('expanded');
	});
}
customEdit();

//delete a custom list
function customDelete() {
	$(".list-details li .delete").live("click", function() {
		$(this).closest("li").remove();
	});
}
customDelete();


//create and edit a custom template in mylists
function mylistsFilter() {
	$(".mylist-edit").change(function() {
		var sel = $(".mylist-edit input:checked").val();

		var list = $(this).parents('.mylist-options');
		var opt = $(this).parents('.mylist-options').find('.list-details');
		var custom = $(this).parents('.mylist-options').next('.custom-lists');
		var listname = $(this).parents('.form-stacked').find('.list-name');

		if (sel == 'new') {
			mylistsDefault();
			$(this).prop('checked');
			$(this).removeClass('expanded');
			$(custom).addClass('active');
			$(listname).addClass('active');
			$(opt).removeClass('expanded').hide;
			$(this).find('.cur-temp').removeClass('active');
			return;
		}
		if (sel == 'edit') {
			mylistsDefault();
			$(this).prop('checked');
			$(this).addClass('expanded');
			$(opt).addClass('expanded');
			$(custom).removeClass('active');
			$(listname).removeClass('active');
			return;
		} else {
			$('.my-list-edit input:radio').each().prop('checked', false);
			$('.my-list-edit').removeClass('expanded');
			$(opt).removeClass('expanded');
		}

	});

	$(".mylist-type").change(function() {
		var sel = $(".mylist-type input:radio:checked").val();
		var list = $(this).parents('.mylist-options');
		var projtype = $(this).parents('.mylist-options').find('.p-type');
		var mltype = $(this).parents('.mylist-options').find('.ml-type');
		var f = $(this).closest('fieldset');
		var listname = $(f).find('fieldset.list-name');

		if (sel == 'participant') {
			mylistsDefault();
			$(this).prop('checked');
			$(list).find('.ml-type > .my-list-edit').removeClass('expanded');
			$(list).find('> .list-details').removeClass('expanded');
			//$(mltype).find('.my-list-edit input:radio:checked').removeProp('checked');
			$(mltype).find('.my-list-edit input:radio').each().prop('checked', false);

			$(projtype).removeClass('active');
			$(mltype).removeClass('active');
			$(f).find('> .custom-lists').removeClass('active');
			$(listname).removeClass('active');

			$(list).removeClass('active').find('> .ml-type').addClass('active').find('> .mylist-edit').removeClass('expanded').find('> input:radio').attr('name', 'list-custom-type').prop('checked', false);
			return;
		}

		if (sel == 'project') {
			mylistsDefault();
			$(this).prop('checked');
			$(projtype).addClass('active');
			$(list).find('> .my-list-edit').removeClass('expanded').prop('checked', false);
			$(list).find('> .list-details').removeClass('expanded');
			$(f).find('> .custom-lists').removeClass('active').find('> .list-name').removeClass('active');

			$(list).removeClass('active').find('> .ml-type').removeClass('active');
			return;
		}

		if (sel == 'company') {
			mylistsDefault();
			$(this).prop('checked');
			$(list).find('.ml-type > .my-list-edit').removeClass('expanded');
			$(list).find('> .list-details').removeClass('expanded');
			//$(mltype).find('.my-list-edit input:radio:checked').removeProp('checked');
			$(mltype).find('.my-list-edit input:radio').each().prop('checked', false);

			$(projtype).removeClass('active');
			$(mltype).removeClass('active');
			$(f).find('> .custom-lists').removeClass('active');
			$(listname).removeClass('active');

			$(list).removeClass('active').find('> .ml-type').addClass('active').find('> .mylist-edit').removeClass('expanded').find('> input:radio').attr('name', 'list-custom-type').prop('checked', false);
			return;
		}

	});

	$(".list-proj-type").change(function() {
		var sel = $(".list-proj-type input:radio:checked").val();
		var list = $(this).parents('.mylist-options');
		var projtype = $(this).parents('.mylist-options').find('.p-type');

		if (sel == 'film') {
			$(this).prop('checked');
			$(list).find('> .ml-type').addClass('active').end().find('.mylist-type #mylist-proj').prop('checked', true);
			return;
		}
		if (sel == 'tv') {
			$(this).prop('checked');
			$(list).find('> .ml-type').addClass('active').end().find('.mylist-type #mylist-proj').prop('checked', true);
			return;
		}


	});

	function mylistsDefault() {
		var list = $(this).parents('.mylist-options');
		var f = $('.mylist-type').closest('fieldset');
		$(list).removeClass('active');
		$(list).removeClass('active').find('> .ml-type').removeClass('active');
		$(list).removeClass('active').find('> .my-list-edit').removeClass('expanded').prop('checked', false);
		$(list).removeClass('active').find('> .list-details').removeClass('expanded');
		$(f).find('> .custom-lists').removeClass('active');
		$(f).find('> .list-name').removeClass('active');
	}


}
mylistsFilter();



// function mycustomListing() {

// }
// mycustomListing();


