
// ios-viewport-scaling-bug-fix
// https://gist.github.com/mathiasbynens/901295
// By @mathias, @cheeaun and @jdalton

// Rewritten version
// By @mathias, @cheeaun and @jdalton

(function(doc) {

	var addEvent = 'addEventListener',
		type = 'gesturestart',
		qsa = 'querySelectorAll',
		scales = [1, 1],
		meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

	function fix() {
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
		doc.removeEventListener(type, fix, true);
	}

	if ((meta = meta[meta.length - 1]) && addEvent in doc) {
		fix();
		scales = [.25, 1.6];
		doc[addEvent](type, fix, true);
	}

}(document));

SS = {
	common : {
	init     : function() {
			//UI display
			uiDisplay();
			//UI accessibility
			uiAttr();
			// UI css appends
			uiCssAppends();
			//UI advanced css selectors
			uiCssSelect();
			//UI universal non-sorting tables
			uniTbl();
			//splitLists();

			//editing tools
			// addList();
			// editList();
			// editContent();
			// emailContent();
			systemWatch();
			listActivate();
			viewList();
			panelTools();
			q2Tip();
			//protectimg();
			// itemFav();

			//ajax loader
			loadProgress();
			//select all checkboxes
			selectAll();
			selectNone();
			jQuery('html').addClass('hasJS');
			//jQuery('html').addClass('no-details');
			sumMore();

			//ajax
			//siteMainheader();
			//advanceMenu();

			//end
		}
	},
	//login
	login : {
		init     : function() {
			//default
			//moved to wireframe.js
			function defaultLogin() {
			//$("#u-pwrecover").hide();
			//$("#u-reconfirm").hide();
			//$("#u-error").hide();
			}
			defaultLogin();

			function forgotPass() {
				$("#pw-forgot").on("click", function() {
					$(this).parents("#main").find("#u-pwrecover").show();
					$(this).parents("#u-login").hide();
				});
			}
			forgotPass();

			function recoverPass() {
				$("#s-recover").on("click", function() {
					$(this).parents("#main").find("#u-reconfirm").show();
					//$(this).parents("#u-pwrecover").hide();
				});
			}
			recoverPass();

			function errPass() {
				$("#oops").on("click", function() {
					$(this).parents("#main").find("#u-error").show();
					$(this).parents("#u-login").hide();
				});
			}
			errPass();

			//end
		}
	},
	//home
	index : {
		init     : function() {
			//
			$('.flexslider').flexslider({
				//animation: "slide",
				controlsContainer: ".flex-container",
				slideshow: true,
				controlNav: true
			});

			$('.tsstour').flexslider({
				//animation: "slide",
				controlsContainer: ".tsstour-container",
				slideshow: false,
				controlNav: true
			});

			//end
		}
	},
	//dashboard
	dash: {
		init: function() {
			$('.li-1').easyListSplitter({ colNumber: 1 });
			$('.li-2').easyListSplitter({ colNumber: 2 });
			$('.li-3').easyListSplitter({ colNumber: 3 });
			$('.li-4').easyListSplitter({ colNumber: 4 });
			$(".colcontent fieldset .wrap:odd").css("margin-right", "0");

			// $('section.columns:not(:last-child)').append('<hr class="faded" />');



			//tables
			applyCellWidths("dash-main-bo");


			//end
		}

	},
	calsort: {
		init: function() {

			//us film release calendar sorting paging
			//dependant jquery.dataTables.js
			//usFilmRelSort();

			//end
		}

	},
	//projects
	project : {
		init : function() {
			//profile imageSizer
			profileImg();

			// project nav.sections
			inDetails();
			tabInit();
			showSlide();
			slideGallery();
			mainGallery();

			// default project when page loads showing credits
			function projDetails() {
				$(".sections>ul>li.credits").addClass('active');
				$("#thedetails > section#credits").addClass('selected');
				// hide clients
				$(".sections>ul>li.clients").hide();
				$("#thedetails > section#clients").hide();
				//$('#thedetails > section.d-details:target').show();
				$('#m-gallery').hide();
			}
			projDetails();

			// indented content
				var cellIndent = [
					"all-notes",
					"bio-text"
				];

				$.each(cellIndent, function() {
					$('.' + this + ' p').addClass("ind");
				});

			//tables proj

			//
		},
		gallery  : function() {
			//gallery slideshow
			$("#gslide-nav a[rel^='prettyPhoto']").prettyPhoto({
				animationSpeed:'slow',
				theme:'light_square',
				slideshow:5000,
				autoplay_slideshow: true,
				overlay_gallery: false,
				image_markup: '<img id="fullResImage" class="protect" src="{path}" />'
			});
			//end
		}

			//slider tv year series

			//end
	},
	//project tv season
	season     : {

		init     : function() {

		// project nav.sections
		inDetails();

		// default tv project when page loads showing episodes
		function tvseaDetails() {
			$(".sections>ul>li.episodes").addClass('active');
			$("#thedetails > section#episodes").addClass('selected');
			// hide clients
			$(".sections>ul>li.credits").removeClass('active');
			$("#thedetails > section#credits").removeClass('selected');
			//$('#thedetails > section.d-details:target').show();
			$('#m-gallery').hide();
		}
		tvseaDetails();

		//end
		}
	},
	//project tv season
	episode : {

		init     : function() {

		// project nav.sections
		inDetails();

		// default tv project when page loads showing episodes
		function tvepiDetails() {
			$("#thedetails > section#credits").addClass('selected');
		}
		tvepiDetails();

		//end
		}
	},
	//people
	person : {
		init     : function() {
			//profile imageSizer
			profileImg();

			// person nav.sections
			inDetails();
			tabInit();
			sortPartCredits();
			// sortIntlBO();
			showSlide();
			slideGallery();
			mainGallery();

			// default person when page loads showing credits
			partDetails();

			//

			//tables part

			//end
		}
	},
	//person with credits
	agent : {
		init     : function() {
			//profile imageSizer


			// person nav.sections
			inDetails();
			tabInit();
			sortPartCredits();
			// sortIntlBO();
			showSlide();
			slideGallery();
			mainGallery();

			// default agent when page loads showing credits
			function agentDetails() {
				// make clients active
				$(".sections>ul>li.clients").addClass('active');
				$("#thedetails > section#clients").addClass('selected');
				$(".sections>ul>li.credits").removeClass('active');
				$("#thedetails > section#credits").removeClass('selected');
				//$('#thedetails > section.d-details:target').show();
				$('#m-gallery').hide();
			}
			agentDetails();

			function resumeDetails() {
				$(".sections>ul>li.clients").hide();
				$("#thedetails > section#clients").hide();
				$('#m-gallery').hide();
			}

			//tables part
			// applyCellWidths("p-s-awards");
			// applyCellWidths("p-s-bo");
			// applyCellWidths("p-s-similar");
			//
		},
		gallery  : function() {
			//gallery slideshow
			$("#gslide-nav a[rel^='prettyPhoto']").prettyPhoto({
				animationSpeed:'slow',
				theme:'light_square',
				slideshow:5000,
				autoplay_slideshow: true,
				overlay_gallery: false
			});
			//end
		}
	},
	//organizations
	org : {
		init     : function() {
			//profile imageSizer

			//employee filter
			orgTitle();

			// nav.sections
			inDetails();
			tabInit();
			sortPartCredits();
			// sortIntlBO();
			showSlide();
			slideGallery();
			mainGallery();

			// default person when page loads showing credits
			function orgDetails() {
				$(".sections>ul>li.employees").addClass('active');
				$("#thedetails > section#employees").addClass('selected');
				// hide clients
				$(".sections>ul>li.clients").hide();
				$("#thedetails > section#clients").hide();
				//$('#thedetails > section.d-details:target').show();
				$('#m-gallery').hide();
			}
			orgDetails();

			//tables org
			// applyCellWidths("org-emp");
			//
		},
		gallery  : function() {
			//gallery slideshow
			$("#gslide-nav a[rel^='prettyPhoto']").prettyPhoto({
				animationSpeed:'slow',
				theme:'light_square',
				slideshow:5000,
				autoplay_slideshow: true,
				overlay_gallery: false
			});
			//
		}
	},
	//notes, saved searches, watch lists
	mlist : {
		init     : function() {
			//

			//MyLists Menu Default Load
			function mlistDefault() {
				$(".mlist .nav-lists .sections>ul>li").removeClass('active');
				$(".mlist .nav-lists .sections>ul>li.l-all").addClass('active');
				$(".mlist #main > section:not('#list-all')").removeClass('selected');
				$(".mlist #main > section#list-all").addClass('selected');
			}
			mlistDefault();

			mlistsMenu();

			//tables org

			//
		}
	},
	//mylists templates
	listemplates : {
		init     : function() {
			//

			//MyLists Menu Default Load
			//mylistDefault();

			$('.t table.display').dataTable({
				"bAutoWidth": false,
				"bJQueryUI": true,
				"bFilter": false,
				"bLengthChange": false,
				"bInfo": false,
				"bPaginate": false,
				"bRetrieve": true,
				"aaSorting": [[0, "asc"]]

			});

			//select2 dropdowns
			mlTemplates();
			//nestable lists
			customlistTemplate();

			//tables org

			//
		}
	},
	//searchresults
	advancedSearch : {
		init     : function() {
			advanceMenu();

			//end
		}
	},
	//searchresults
	searchresults : {
		init     : function() {
			//
			perSearch();

			//
		}
	},
	//account settings
	account : {
		init     : function() {

			//MyLists Menu Default Load
			function accountDefault() {
				$(".account .nav-lists .sections>ul>li").removeClass('active');
				$(".account .nav-lists .sections>ul>li.user-profile").addClass('active');
				$("#main > section:not('#user')").removeClass('selected');
				$("#main > #user").addClass('selected');
			}
			accountDefault();

			accountMenu();

			//end
		}
	},
	//whitelabel adminaccount settings
	adminaccount : {
		init     : function() {

			//MyLists Menu Default Load
			//function accountDefault() {
			//$(".account .nav-lists .sections>ul>li").removeClass('active');
			//$(".account .nav-lists .sections>ul>li.user-profile").addClass('active');
			//$("#main > section:not('#user')").removeClass('selected');
			//$("#main > #user").addClass('selected');
			//}
			// accountDefault();

			//accountMenu();
			function adminDefault() {
				$(".adminaccount #main > section:first-child").addClass('open');
				$(".adminaccount #main > section").not(':first-child').addClass('hide');
				$(".adminaccount aside .nav-vert > li:first-child").addClass('hover').find('li:first-child a').addClass('active');
			}
			adminDefault();

			//end
		}
	},
	//administrator panel
	admin: {
		init     : function() {
			//

			//MyLists Menu Default Load
			function adminDefault() {
				$(".admin .nav-admin .sections>ul>li").removeClass('active');
				$(".admin .nav-admin .sections>ul>li.a-overview").addClass('active');
				$("#adminMain > section:not('#admin-overview')").removeClass('selected');
				$("#adminMain > section#admin-overview").addClass('selected');
			}
			adminDefault();

			//section menu
			adminMenu();
			adminEditMenu();

			//draggable new template
			newadminTemplate();

			// overview checkboxes
			defaultAdmincheck();
			adminCheckAll();

			//tables org

			//
		}
	},
	//custom main content panel
	custom: {
		init     : function() {
			//

			// default custom person when page loads showing custom section
			function customDetails() {
				$(".sections>ul>li.credits").removeClass('active');
				$("#thedetails > section#credits").removeClass('selected');
				$(".sections>ul>li.custom").addClass('active');
				$("#thedetails > section#custom").addClass('selected');

				// hide clients
				$(".sections>ul>li.clients").hide();
				$("#thedetails > section#clients").hide();
				//$('#thedetails > section.d-details:target').show();
				$('#m-gallery').hide();
			}
			customDetails();

			$('.t table.display').dataTable({
				"bAutoWidth": false,
				"bJQueryUI": true,
				"bFilter": false,
				"bLengthChange": false,
				"bInfo": false,
				"bPaginate": false,
				"bRetrieve": true,
				"aaSorting": [[0, "asc"]]

			});

			//tables org

			//
		}
	},
	cms: {
		init     : function() {

			showSlide();
			slideGallery();
			mainGallery();
		},
		gallery  : function() {
			//gallery slideshow
			$("#gslide-nav a[rel^='prettyPhoto']").prettyPhoto({
				animationSpeed:'slow',
				theme:'light_square',
				slideshow:5000,
				autoplay_slideshow: true,
				overlay_gallery: false
			});
			//end
		}

	},
	//add participant content
	addcontent : {
		init     : function() {

			//MyLists Menu Default Load
			function addnewDefault() {
				$(".addcontent .nav-lists .sections>ul>li").removeClass('active');
				$(".addcontent .nav-lists .sections>ul>li:first-child").addClass('active');
				$(".addcontent #main > section").not(':first').removeClass('selected');
				$(".addcontent #main > section:first-child").addClass('selected');
			}
			addnewDefault();

			addnewMenu();


			//end
		}
	},
	//print all record
	printlist   : {

		init     : function() {

			// Remove Links for print preview
			printLinks();
			//end
		}
	},
	//print all record
	printrecord    : {

		init     : function() {

			// default
			defaultSubmod();
			//check all checkboxes
			checkAll();
			//end
		}
	}
//end SS

};



UTIL = {

  fire : function(func,funcname, args) {

	var namespace = SS;  // indicate your obj literal namespace here

	funcname = (funcname === undefined) ? 'init' : funcname;
	if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
		namespace[func][funcname](args);
	}

  },

  loadEvents : function() {

	var bodyId = document.body.id;

	// hit up common first.
	UTIL.fire('common');

	// do all the classes too.
	$.each(document.body.className.split(/\s+/),function(i,classnm){
		UTIL.fire(classnm);
		UTIL.fire(classnm,bodyId);
	});

	UTIL.fire('common','finalize');

  }

};
// kick it all off here
$(document).ready(UTIL.loadEvents);

/*************************************
All common layout functions are below
*************************************/
// init foundation
$(function() {
	$(document).foundation();
});


//UI display
function uiDisplay() {

	// Tabs
	$(function() {
		$('.tabs').tabs();
	});
	// Accordion
	$(function() {
		$( "#accordion" ).accordion();
		$( "#aside-accordion" ).accordion({
			collapsible: true,
			heightStyle: "content"
		});
	});

	$( ".profile .ui-accordion h3").removeClass(".ui-corner-all");

	//tooltip
	$(function() {
		$(".tooltip, a.tooltip, input.tooltip").tooltip({
			items: ".tooltip, a.tooltip, input.tooltip, [title]",
			content: function() {
				var element = $( this );
				if ( element.is( "[title]" ) ) {
					return element.attr( "title" );
				}
				if ( element.is( "img" ) ) {
					return element.attr( "alt" );
				}
			}
		});
	});

	//Datatables Generic
	$(function() {
		$('table.display').dataTable({
			"bAutoWidth": false,
			"bJQueryUI": true,
			"bFilter": false,
			"bLengthChange": false,
			"bInfo": false,
			"bPaginate": false,
			"bRetrieve": true,
			"aaSorting": [[0, "asc"]],
			//nosort columns
			"aoColumnDefs": [
				{"aTargets": [ 'nosort' ], "bSortable": false }
				]

		});

	});

	//remove row in datatable
	$(function() {
		var $rowremove = $('table.display a.remove');

		$rowremove.on('click', function (e) {
			//e.preventDefault();
			var $this = $(this);
			$this.closest('tr').remove();
			return false;
		});

	});


	//split generated lists
	$('.li-1').easyListSplitter({colNumber: 1, direction: 'vertical'});
	$('.li-2').easyListSplitter({colNumber: 2, direction: 'vertical'});
	$('.li-3').easyListSplitter({colNumber: 3, direction: 'vertical'});
	$('.li-4').easyListSplitter({colNumber: 4, direction: 'vertical'});
	$('.li-5').easyListSplitter({colNumber: 5, direction: 'vertical'});

	$('.header-main.li-2').easyListSplitter({colNumber: 2, direction: 'horizontal'});

	//Datepicker Generic in forms
	$(function() {
		$( ".datepicker" ).datepicker({
			inline: true,
			showOn: 'button',
			buttonImage: '../_assets/img/base/calendar.png',
			buttonImageOnly: true,
			changeMonth: true,
			changeYear: true
		});
	});

	//calendar datepicker
	$(function() {
		$('.cal-date').datepicker({
			changeMonth: true,
			changeYear: true,
			showButtonPanel: false,
			dateFormat: 'MM yy',
			onClose: function(dateText, inst) {
				var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
				var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
				$(this).datepicker('setDate', new Date(year, month, 1));
			}
		});
	});

	//hover states on the static widgets
	$('#dialog_link, ul#icons li').hover(
		function() { $(this).addClass('ui-state-hover'); },
		function() { $(this).removeClass('ui-state-hover'); }
	);

	//html5 details
	$('details').details();
	//form placeholder text
	$('input, textarea').placeholder();
}

// UI accessibility
function uiAttr() {
	$("a.dp-choose-date").attr({title: "Choose date"});
	$(".tool-map a").attr({title: "Current Mappings for this Record"});
	$(".tool-search a").attr({title: "Search for Additional Mappings for this Record"});
	$(".tool-notes a").attr({title: "Notes Archive for this Record"});
	$(".tool-addnotes a").attr({title: "Add A Note for this Record"});
	$(".tool-flag a").attr({title: "Add A Flagged Note for this Record"});
	$("a.pc").attr({title: "View Notes"});
	$("a.pt").attr({title: "More Changes"});
	$("a.drag-handle").attr({title: "Drag this handle to move row"});
	$("li.tool-edit a").attr({title: "Edit current information"});
	$("li.tool-update a").attr({title: "Update current information"});
	$("li.tool-add a").attr({title: "Add to current information"});
	$("li.tool-collapse a").attr({title: "Collapse this section"});
	$("li.pt a").attr({title: "Edit current information"});
	$("abbr:contains('INC')").attr({title: "Incomplete"});
	$("abbr:contains('DEL')").attr({title: "Deleted"});
	$("abbr:contains('ACT')").attr({title: "Active"});
	$("nav.sections li a").attr({role: "button"});
	$('.ui-dialog-titlebar-close').attr({title: "Close"});
}

//UI advanced css selectors
function uiCssSelect() {
	//structure
	$("label.req").prepend('<span class="req">* </span>');
	//calendar
	$("li span.calendar a").addClass("start");
	$("li span.calendar:last-child a").removeClass("start").addClass("end");
	//zebra selectors
	$(".all-notes p:even").addClass("alt");
	$(".section-edu ul:odd").addClass("alt");
	//advance search criteria
	$(".crit li div:first-child").addClass("first-child");
	$(".bar-tools li:first-child").addClass("first-child");
	//sidebar
	$("body:not('.index') aside > section").addClass("clearfix");
	$(".person-options div.filter:first-child").addClass("alpha");
	//home page lists
	$(".index .home-mod > div:first-child").addClass("first");
	$(".index .home-mod > div:last-child").addClass("last");
}
// UI css appends
function uiCssAppends() {
	$("p.time span:first-child").append(":").css("padding-right","0");
	$("aside .vcard li em").append(":");
}
//UI universal non-sorting tables
function uniTbl() {
	//zebra tables
	$("table tbody tr:nth-child(even)").addClass("alt");
	$("body.cms table tbody tr:nth-child(even)").removeClass("alt");
	$("table.display tbody tr:nth-child(even)").removeClass("alt");

	//table hover feedback
	$("table tbody tr").hover(
		function() {
			$(this).children().addClass("hover");
		},
		function() {
			$(this).children().removeClass("hover");
		}
	);
	$("td p > span:first-child").css("padding-right","0.5em");

	//datatables text aligning
	$('.p-fin-boxoffice tbody td:nth-child(5)').addClass("txtright");
	$('.p-fin-boxoffice tbody td:nth-child(6)').addClass("txtright");
	$('.p-fin-sal tbody td:nth-child(3)').addClass("txtright");
	$('.proj-fin-box tbody td:nth-child(2)').addClass("txtright");
	$('.proj-fin-box tbody td:nth-child(4)').addClass("txtright");
	$('.proj-fin-box tbody td:nth-child(5)').addClass("txtright");
	$('.proj-fin-intl-box tbody td:nth-child(3)').addClass("txtright");
	$('.proj-fin-intl-box tbody td:nth-child(4)').addClass("txtright");
}

//UI search results and mylist templates
function viewList() {
	$(".s > .comment").prepend('<span class="comment" title="Comment"></span>');
	$(".s > .step").prepend('<span>Next Step:</span>');
	$(".t .premise").prepend('<span>Premise:</span>');
	$(".t .synopsis").prepend('<span>Synopsis:</span>');
}

//animated loading
function loadProgress() {
	jQuery.ajaxSetup({
		beforeSend: function() {
			$('#loader').show();
		},
		complete: function() {
			$('#loader').hide();
		},
		success: function() {}
	});

}

//section navigation site
function sectionNavigate() {
	var bclass = $("body");
	if ((bclass).hasClass("advSearch")) {
		defaultsiteNav();
		$("ul.main li#mAdvsearch").addClass('selected');
	}
	if ((bclass).hasClass("advResults")) {
		defaultsiteNav();
		$("ul.main li#mResults").addClass('selected');
	}
	if ((bclass).hasClass("cal")) {
		defaultsiteNav();
		$("ul.main li#mCal").addClass('selected');
	}
	if ((bclass).hasClass("calsort")) {
		defaultsiteNav();
		$("ul.main li#mCal").addClass('selected');
	}
	if ((bclass).hasClass("help")) {
		defaultsiteNav();
		$("ul.main li#mHelp").addClass('selected');
	}
	if ((bclass).hasClass("admin")) {
		defaultsiteNav();
		$("ul.main li#mAdmin").addClass('selected');
	}
	if ((bclass).hasClass("person" + "section-awards")) {
		defaultsiteNav();
		$(".nav-primary ul li").attr('').addClass('active');
	}
	function defaultsiteNav() {
		$(".nav-primary ul li").removeClass("selected");
	}
}
sectionNavigate();

//  particpiants body class = person
//  project body class = proj
//  organizations body class = org
//  media body class = gallery
//  searchresults body class = searchresults

// default person when page loads showing credits
function partDetails() {
	$(".sections>ul>li.credits").addClass('active');
	$("#thedetails>section").addClass('selected');
	// hide clients
	$(".sections>ul>li.clients").hide();
	$("#thedetails > section#clients").hide();
	$('#m-gallery').hide();
}
// nav.sections within person/project/org
function inDetails() {

		var $thedetails = $("body").not("body.ui").find("#thedetails"),
			$details = $("body").not("body.ui").find("#main section.d-details");

		$("body").not("body.ui").find("nav.cat-sections>ul>li").on("click", "a", function() {
			event.preventDefault();
			var active = $(this).parent();

			$('nav.cat-sections>ul>li').removeClass('active');
			$(active).not('.disabled').addClass('active');

			var path = $(this).attr("href");

			loadContent(path);
			//return false;
		});

		function loadContent(href){
			$thedetails
				.find(".d-details")
				.fadeOut(200, function() {
					$thedetails.hide().load(href + " .d-details", function() {
					$thedetails.fadeIn(200, function(){
						$(".d-details").addClass("selected");
						tabInit();
						showSlide();
						$('.tabs').tabs();
						$('.selected > .li-2').easyListSplitter({colNumber: 2, direction: 'horizontal'});
						$('table.display').dataTable({
							"bAutoWidth": false,
							"bJQueryUI": true,
							"bFilter": false,
							"bLengthChange": false,
							"bInfo": false,
							"bPaginate": false,
							"bRetrieve": true,
							"aaSorting": [[0, "asc"]]
						});
					});
				});
			});

		}

}inDetails();

function tabInit() {
	slideGallery();
}

// credits filter by project type
function sortPartCredits() {
	$("#creditFilterPart").change(function() {
		var sel = $("#creditFilterPart option:selected").val();
		switch(sel)	{
			case '0':
				$('.c-tv, .c-films').show();
				return;
			case '1':
				$('.c-tv').hide();
				$('.c-films').show();
				return;
			case '10':
				$('.c-films').hide();
				$('.c-tv').show();
				return;
			default:
				$('.c-tv, .c-films').hide();
				$('#credits section:nth-child('+ sel +')').show();
				return;
		}

	});
}
//organization employees filter by title
function orgTitle() {
	$('#titleFilterOrg').change(function() {
		var sel = $("#titleFilterOrg option:selected").val();
		switch(sel)	{
			case '0':
				$('.emp-exec, .emp-agent, .emp-legal, .emp-assist, .emp-emp, .emp-notitle').show();
				return;
			case '1':
				$('#employees > section:not(".emp-exec")').hide();
				$('.emp-exec').show();
				return;
			case '2':
				$('#employees > section:not(".emp-agent")').hide();
				$('.emp-agent').show();
				return;
			case '3':
				$('#employees section:not(".emp-legal")').hide();
				$('.emp-legal').show();
				return;
			case '4':
				$('#employees section:not(".emp-assist")').hide();
				$('.emp-assist').show();
				return;
			case '5':
				$('#employees section:not(".emp-emp")').hide();
				$('.emp-emp').show();
				return;
			case '6':
				$('#employees section:not(".emp-notitle")').hide();
				$('.emp-notitle').show();
				return;
			default:
				$('.emp-exec, .emp-agent, .emp-legal, .emp-assist, .emp-emp, .emp-notitle').hide();
				$('#titleFilterOrg section:nth-child('+ sel +')').show();
				return;
		}

	});
}

//gallery
function showSlide() {
	$('.g-tn a').click( function( ){
		$('#m-gallery').show();
		$('#media #m-img').hide();
		$('#media #m-video').hide();
	});
}

function slideGallery() {
	$("#gslide-nav a[rel^='prettyPhoto']").prettyPhoto({
		animationSpeed: 'slow',
		theme: 'light_square',
		// slideshow: 5000,
		slideshow: false,
		autoplay_slideshow: false,
		overlay_gallery: false,
		image_markup: '<img id="fullResImage" class="protect" src="{path}" />'
	});
}

function mainGallery() {
	$('a.togallery').click( function( ){
		$('#m-gallery').hide();
		$('#media #m-img').show();
		$('#media #m-video').show();
	});
}
function profileImg() {
	var aImgs = $('aside[role="complementary"] .profile figure img');
	imgSizer.collate(aImgs);
}

// gallery counter
function mcounter(){
	var i = $('.media-image-gallery li').size();
	$('.text-remaining-images span').text(10-i);
}
// gallery remove images
function media_image_updater(){
	var i = $('.media-image-gallery li').size();
	$('.text-remaining-images span').text(10-i);
	$('.edit-image-delete').click(
		function(){
			$(this).parent('li').remove();
			mcounter();
			return false;
		}
	);
};
media_image_updater();

// SECTION EDITING TOOLS
// tools systemWatch
function systemWatch() {
	$(".inline-tools .toolWatch a.watch").attr({title: "Add to My Watch List"});
	$(".inline-tools .toolWatch a.unwatch").attr({title: "Remove from My Watch List"});
	var flag = $("header .inline-tools .toolWatch a");
	var title = $(flag).attr("title");
	$(flag).text(title);

	if ((flag).hasClass('watch')) {
		$(this).attr({title: "Add to My Watch List"});
		$(this).text("Add to My Watch List");
	}
	if ((flag).hasClass('unwatch')) {
		$(this).attr({title: "Remove from My Watch List"});
		$(this).text("Remove from My Watch List");
	}

	$(flag).click(function() {
		var title = $(flag).attr("title");

		if ((flag).hasClass('unwatch')) {
			flag.removeClass('unwatch');
			flag.addClass('watch').attr({title: "Add to My Watch List"});
			$(flag).text(title);
			return false;
		}
		if ((flag).hasClass("watch")) {
			flag.removeClass('watch');
			flag.addClass('unwatch').attr({title: "Remove from My Watch List"});
			$(flag).text(title);
			return false;
		}

	});

}

// tools promote to pilot
function promotePilot() {
	$("li.propilot a.promote").attr('title', 'Promote to Pilot');
	$("li.propilot a.promoted").attr('title', 'Promoted to Pilot');
	$("li.procur a.promote").attr('title', 'Promote to Current');
	$("li.procur a.promoted").attr('title', 'Promoted to Current');

	$("li.prodev a.promote").attr('title', 'Promote to Dev');
	$("li.prodev a.promoted").attr('title', 'Promoted to Dev');

	$("li.propublic a.promote").attr('title', 'Make Publicly Available');
	$("li.propublic a.promoted").attr('title', 'Publicly Available');

	var flag = $("li.protool > a");
	var title = $(flag).attr("title");
	var one = $(this);
	$(one).text($(one).attr("title"));
	var yes = $(".yespilot");

	if ((flag).hasClass('promote')) {
		$(one).text($(one).attr("title"));
	}
	if ((flag).hasClass('promoted')) {
		$(one).text($(one).attr("title"));
	}

	//open modal
	$(flag).click(function() {
		var one = $(this);
		var title = $(one).attr("title");
		var tool = $(".tool");

		//open modal
		//if ((flag).hasClass('openTopilot')) {
		//$('#topilot').dialog('open');
		//return false;
		//}

		//if ((flag).hasClass('openTocurrent')) {
		//$('#tocurrent').dialog('open');
		//return false;
		//}

		//close modal and change status and text
		$(".yesstatus").click(function () {
			$(one).removeClass('promote').addClass('promoted');
			promotedAttr();
			$(one).text($(one).attr("title"));
			$(one).prev(tool).removeClass('tool-off').addClass('tool-on');
			return false;
		});

			// change status and text
			// $(one).removeClass('promote').addClass('promoted');
			// promotedAttr();
			// $(one).text($(one).attr("title"));
			// $(one).prev(tool).removeClass('tool-off').addClass('tool-on');
			// return false;

	});

	// change status and text
	$(yes).click(function() {
		var one = $(this);
		var title = $(one).attr("title");
		var tool = $(".tool");

			$(one).removeClass('promote').addClass('promoted');
			promotedAttr();
			$(one).text($(one).attr("title"));
			$(one).prev(tool).removeClass('tool-off').addClass('tool-on');
			return false;

	});

	function promoteAttr() {
	$("li.propilot a.promote").attr('title', 'Promote to Pilot');
	$("li.prodev a.promote").attr('title', 'Promote to Current');
	$("li.propublic a.promote").attr('title', 'Make Publicly Available');
	}
	function promotedAttr() {
	$("li.propilot a.promoted").attr('title', 'Promoted to Pilot');
	$("li.prodev a.promoted").attr('title', 'Promoted to Current');
	$("li.propublic a.promoted").attr('title', 'Publicly Available');
	}
}
promotePilot();

//toggle itemeditor forms universal
function slideTog() {
	$('.toggler').click( function( ){
		defaultCloseExisting();
		var id = $(this).attr("href");

		$(id).slideToggle('fast').addClass("active");
		defaultListOption();
		if($(this).hasClass("read-more-link")) {
			return;
		}
		else {
			return false;
		}
	});
}
slideTog();


//toggle search
function searchTog() {
	$('.slideOpen').click( function( ){
		var $this = $(this);
		var id = $(this).next(".slid");
		$(id).slideToggle('fast');

		if($this.hasClass("open")){
			$(this).removeClass("open");
		} else {
			$(this).addClass("open");
		}
		return false;
	});
}
searchTog();

function defaultCloseExisting() {
	var $ie = $(".itemeditor.active");
	$ie.hide("slide", { direction: "up" }, 500).removeClass("active").unbind();
}

//close itemeditor
function toolClose() {
	$('.toolClose a').on("click", function() {
		$(this).parents(".itemeditor").hide("slide", { direction: "up" }, 500).unbind();
	});
	$('.toolClose input').on("click", function() {
		$(this).parents(".itemeditor").hide("slide", { direction: "up" }, 500).unbind();
	});
	$('.toolClose button').on("click", function() {
		$(this).parents(".itemeditor").hide("slide", { direction: "up" }, 500).unbind();
	});
}
toolClose();


//toggle new list form
function defaultListOption() {
	$("#pNewListName").hide();
	$("#pNewListDescription").hide();
	return false;
}
defaultListOption();


//vertical accordian 1 level menu
//used in cms, project tv aside
function verticalNav() {

	$(".vert-nav > li > a").on("click", function(e){
		if($(this).parent().has("ul")) {
			e.preventDefault();
		}
		if(!$(this).hasClass("open")) {
			// hide any open menus and remove all other classes
			$(".vert-nav li ul").slideUp(350);
			$(".vert-nav li a").removeClass("open");

			// open our new menu and add the open class
			$(this).next("ul").slideDown(350);
			$(this).addClass("open");
		}

		else if($(this).hasClass("open")) {
			$(this).removeClass("open");
			$(this).next("ul").slideUp(350);
		}
	});
}
verticalNav();

//toggle for multiple used in admin
function indexTog() {

	var $ilinks = $('.itoggle'),
		$iedit = $('.s-edit'),
		$itbodylinks = $('tbody .itoggle');
		$itbodyedit = $('tbody .s-edit');
		$iadd = $('.itoggleAdd');
		$isel = $('select.itog')
	//button links
	$ilinks.not($itbodylinks).on('click', function (e) {
		e.preventDefault();
		var $this = $(this);

		$thisEdit = $iedit
			.eq($ilinks.index(this))
			.slideToggle('fast');

		$iedit.not($thisEdit).hide();

	});
	//table cell links
	$itbodylinks.on('click', function (e) {
		e.preventDefault();
		var $this = $(this);

		$thisEdit = $itbodyedit
			.eq($itbodylinks.index(this))
			.slideToggle('fast').removeClass("hidden");

		$itbodyedit.not($thisEdit).hide().addClass("hidden");

	});
	//
	$iadd.on('click', function (e) {
		e.preventDefault();
		var $this = $(this);
		var	$toedit = $this.closest('tbody')
							.find('.s-edit')
							.slideToggle('fast')
							.removeClass("hidden");

	});
	//select options
	$isel.on('change', function (e) {
		$("." + $(this).val()).show().siblings('.s-edit').hide();
	});

}
indexTog();

//used in whitelabel standards tab
// show/hide reports
function standardReport( ){

	$(".standard-list tr td a.itoggle").bind('click', function(e) {
		e.preventDefault();
		var $this = $(this);
		var $list = $(this).parents(".standard-list");
		$(this).parents(".standard-list").next(".single-standard").addClass("active");
		$list.addClass("hidden");
		return false;
	});

	$(".single-standard .btn").bind('click', function(e) {
		e.preventDefault();
		var $this = $(this);
		$(this).parents(".single-standard").prev(".standard-list").removeClass("hidden");
		$(this).parents(".single-standard").removeClass("active");
		return false;
	});

}
standardReport( );

//used in adminaccount.html
function verticalMenu( ){
	var ww = document.body.clientWidth;

	$(".nav-vert li a").each(function() {
		if ($(this).next().length > 0) {
			$(this).addClass("parent");
		};
	})

	$(".nav-vert").show();
	$(".nav-vert li").unbind('mouseenter mouseleave');
	$(".nav-vert li a.parent").unbind('click').bind('click', function(e) {
		// must be attached to anchor element to prevent bubbling
		e.preventDefault();
		$(this).parent("li").toggleClass("hover");
	});

}
verticalMenu( );

// admin area menu
function adminMenu( ){
	$(".nav-vert a.tog").click( function() {

		var $this = $(this),
			id = $(this).attr('href'),
			$alinks = $('.nav-vert a.tog');

		$(this).addClass("active");
		$alinks.not(this).removeClass("active");

		$(id).removeClass('hide').addClass('open');
		$("#main > section").not(id).removeClass('open').addClass('hide');
		return false;

		$(".nav-vert a").not($this).removeClass("active");
		var active = $('.nav-vert a.active').parent();
	});

}
adminMenu( );

// admin links feedback to nav-vert
function adminNested( ) {
	$(".adminaccount section table tbody a").not('a.action').on("click", function() {

		var $this = $(this),
			id = $(this).attr('href'),
			$alinks = $('.nav-vert a.tog');
			$ahref = $alinks.attr('href');
			$iactionlinks = $('tbody a.action');


			$(".adminaccount #main > section").not(id).removeClass('open').addClass('hide');
			$(id).removeClass('hide').addClass('open');
			var $isection = $(".adminaccount #main > section.open");

			$ihref = $($isection).attr('id');
				if( $alinks.attr('href') === $ihref ) {
					$(this).addClass("active")
					.closest(".parent").parent("li")
					.addClass("hover");
					return false;
				}

	});

	$(".adminaccount section header h2 a").on("click", function()  {

		var $this = $(this),
			id = $(this).attr('href'),
			$alinks = $('.nav-vert a.tog');
			$ahref = $alinks.attr('href');


			$(".adminaccount #main > section").not(id).removeClass('open').addClass('hide');
			$(id).removeClass('hide').addClass('open');
			var $isection = $(".adminaccount #main > section.open");

			$ihref = $($isection).attr('id');
				if( $alinks.attr('href') === $ihref ) {
					$(this).addClass("active")
						.closest(".parent").parent("li")
						.addClass("hover");
						return false;
				}

	});

}
adminNested( );

//progress tracker steps
function progTrack( ){
	$("ol.progtrckr").each(function(){
		$(this).attr("data-progtrckr-steps",
		$(this).children("li").length);
	});

}
progTrack( );


//toggle account sections
// function accountTog() {

// 	$(".account .nav-vert ul>li>a.tog").click( function(e) {
// 		 e.preventDefault();
// 		//defaultCloseSection();
// 		var $this = $(this),
// 			id = $(this).attr('href');

// 		$(this).addClass("active");

// 		var active = $(this).parent();
// 		if ((active).hasClass("user-profile")) {
// 			unDetails( );
// 			$(".account #main > #user").addClass('open');
// 		}

// 				function unDetails( ) {
// 			$(".account #main > section").removeClass('selected');
// 		}

// 		//$(id).slideToggle('fast').addClass("open");
// 		$(id).addClass("open");



// 		$(".nav-vert a").not($this).removeClass("active");
// 		//defaultCloseSection();

// 		//var id = $(this).attr("href");
// 		//var id = $this.parents('.content').find('#main > section').attr("href");

// 		//$(id).addClass("selected");
// 		$("#main > section:not(id)").removeClass('open').unbind();
// 	});
// }
// accountTog();

// function defaultCloseSection() {
// 	var $ms = $(".account #main > section.open");
// 	$ms.removeClass("open");
// }

//toggle record summary items
function sumMore() {
	$('ul.s-details dd.more').append('<a class="tog" title"More">More</a>');
	$('ul.s-details dd.more div').addClass('hidden');

	$('dd.more a.tog').click(function() {
		var tog = $('dd.more a');
		var d = $(this).parent('dd').find('div');

		if($(this).hasClass("open")) {
			$(this).removeClass("open");
			$(d).addClass('hidden');
			return false;
		}
		else {
			$(this).addClass("open");
			$(d).removeClass('hidden');
		}
		return false;
	});
}

// checkrights toggle boxed checks
function rightsChecked() {

	$('body.adminaccount input.checkrights').on( 'change', function() {
		//var $ckbox = $('input.checkrights:checked').prop('checked', $( this ).is( ':checked' ) ? 'checked' : 'true' );
		var $ckbox = $(this);
		var rightsbox = $(this).closest('fieldset').find('div.box');

		$ckbox.addClass('active');
		$rightsbox.removeClass('hidden');

		//$ckbox.slideToggle($rightsbox).removeClass('hidden');
	});

}
rightsChecked();

// checkrights default
// function rightsDefault() {
// 	$('body.adminaccount .box').addClass('hidden');
// }
// rightsDefault();

//print allrecord default
function defaultSubmod() {
	$("body.printrecord section:not('.controls') > .subtog").before('<input type="checkbox" name="toprint" data-select-all="sa" value="1" class="checkme" />');
	$('body.printrecord .controls > .subtog').before('<input type="checkbox" name="sa-toprint" id="check-master" value="0" class="selectall" />' + '<span id="checkAll">All</span>');
	$("body.printrecord .expand-all").removeClass("expanded").text('Expand All Sections');
	$("body.printrecord .subtog header h2").removeClass("open");
	$("body.printrecord .subtog .details").hide();
	//return false;
}

//print allrecord default
function defaultAdmincheck() {
	$("body.admin #overview tbody>tr>td>p.ch").prepend('<input type="checkbox" name="toedit" data-select-all="sa" value="1" class="checkme" />');
	$('body.admin #overview thead .controls').prepend('<input type="checkbox" name="sa-toedit" id="check-master" value="0" class="selectall" />' + '<span id="checkAll" class="clearfix">All</span>');
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
printlistCheckAll();


// printlist default
function printlistDefault() {
	$('body.printlist .record-sections :checkbox').prop('checked', true);
}
printlistDefault();

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
		// $(".record-sections input[type=checkbox]").prop('disabled', true);
		// }
		// if($(this).prop( 'checked', '' )) {
		// $(".record-sections input[type=checkbox]").removeProp('disabled');
		// }
		// else {
		// $(".record-sections input[type=checkbox]").prop('enabled', true);
		// }
	});
}
printradioDisabled();

// printlist default
function printradioDefault() {
	$('body.printlist .record-sections input[type=radio].printall').prop('checked', true);
	$('body.printlist .record-sections input[type=checkbox]').prop('disabled', true);
}
printradioDefault();

//remove links for print preview
function printLinks() {
	$('a').contents().unwrap();
}

//mylists templates vertmenu default
// function mylistDefault() {
// var menu_ul = $('.vert-menu > li > ul');
// var sel = $('.vert-menu > li:first-child');
// menu_ul.hide();

// $(sel).children('a').addClass('active').next('ul').show();
// $('.listemplates #main > section:not("#list-people")').hide();
// }

//Advanced Search Default Load
function advanceMenu() {
	// search menu
	$(".nav-search .sections>ul>li").removeClass('active');
	$(".nav-search .sections>ul>li.s-people").addClass('active');
	// main section search form body class advancedSearch
	$(".advancedSearch #main > section:not('#people')").removeClass('selected');
	$(".advancedSearch #main > #people").addClass('selected');
	// search filters
	$(".advancedSearch aside #person-options").addClass('active');
	$(".advancedSearch aside .active").find('div.filter').eq(0).addClass("alpha").find('.filter-detail').show();
}


//AddNewContent
//dependent  script.js init
function addnewMenu() {

	$(".addcontent .nav-lists nav.sections>ul>li>a").on("click", function()  {

		$(this).parents('.cat').find('li.active').removeClass('active');
		$(this).parent('li').addClass('active');

		var $active = $(this).parent();
		if ($active.hasClass("contact-info")) {
			unDetails();
			$(".addcontent #main > #contact").addClass('selected');
			$(".addcontent #main").not("> #contact").removeClass('selected');
		}
		if ($active.hasClass("assist-info")) {
			unDetails();
			$(".addcontent #main > #assist").addClass('selected');
			$(".addcontent #main").not("> #assist").removeClass('selected');
		}
		if ($active.hasClass("misc-info")) {
			unDetails();
			$(".addcontent #main > #misc").addClass('selected');
			$(".addcontent #main").not("> #misc").removeClass('selected');
		}
		function unDetails() {
			$(".addcontent #main > section").removeClass('selected');
		}
	});
}


// tools list activate
function listActivate() {
	$(" .toolState a.activate").attr({title: "Click to Inactivate"}).html( "<span class='tool tool-state'></span>" + "Active");
	$(".toolState a.inactive").attr({title: "Click to Activate"}).html( "<span class='tool tool-state'></span>" + "Inactive");
	var flag = $(".mylisting .toolState a");

	if ((flag).hasClass('activate')) {
		$(this).attr({title: "Click to Inactivate"});
		$(this).html( "<span class='tool tool-state'></span>" + "Active");
	}
	if ((flag).hasClass('inactive')) {
		$(this).attr({title: "Click to Activate"});
		$(this).html( "<span class='tool tool-state'></span>" + "Inactive");
	}

	$(flag).click(function() {
		var t = $(this);

		if ((t).hasClass('inactive')) {
			(t).removeClass('inactive');
			(t).addClass('activate').attr({title: "Click to Inactivate"});
			$(t).html( "<span class='tool tool-state'></span>" + "Active");
			return false;
		}
		if ((t).hasClass("activate")) {
			(t).removeClass('activate');
			(t).addClass('inactive').attr({title: "Click to Activate"});
			$(t).html( "<span class='tool tool-state'></span>" + "Inactive");
			return false;
		}

	});

}

//show fields for new list
function newListOption() {
	$("#ddlExistingList").change(function() {
		var nlo = $("#ddlExistingList option:selected").val();
		if (nlo == "new") {
			$("#pNewListName").show();
			$("#pNewListDescription").show();
		}
	});
}
newListOption();

// system tools panel
function panelTools() {
	$("div.panel_button").click(function() {
		$("div#panel").animate({
			height: "280px"
		})
		.animate({
			height: "260px"
		}, "fast");
		$("div.panel_button").toggle();

	});

	$("div#hide_button").click(function() {
		$("div#panel").animate({
			height: "0px"
		}, "fast");

	});
}

//loading
var loadProgess = $("#loadingDiv");

function ShowProgress(obj) {
	$('loadProgess').fadeIn(2000);
}

function waitToLoad() {
	loadProgess.hide();
}

function HideProgress(obj) {
	setTimeout("waitToLoad()", 0);
	if (obj !== null) {
		var control = $(obj);
		control.removeAttr("disabled");
		control.attr("style", "background: #8b8b07;");
	}
}

//item upload file
function fileUpload() {
	var uploadbtn = $("uploadBtn");
	var uploadfile = $("uploadFile");

	$(uploadbtn).on('click', function() {
		$(uploadfile).value = this.value;
	});
}
fileUpload();

//testing panel
function panelNav() {
	var nav = $('ul#navtest li a');
	$(nav).click(function() {
		var target = $($(this).attr('href') + '-page');
		target.addClass('active').toggle(500);
		$('.page:visible').not(target).removeClass('active').toggle(500);
		return false;
	});

	$(".page button").click(function() {
		$(".page").hide(1000);
	});
}
panelNav();

//selectall checkboxes
function selectAll() {

	$(':checkbox.checkAll').on('click', function() {
		$(':checkbox[name=' + $(this).data('checkbox-name') + ']').prop("checked", $(this).prop("checked"));
	});
	// Individual checkboxes
	$(':checkbox.checkme').on('click', function() {

		var _this = $(this);
		var _selectall = _this.prop("checked");

		if ( _selectall ) {
			$( ':checkbox[name=' + _this.attr('name') + ']' ).each(function(i){

				_selectall = $(this).prop("checked");
				return _selectall;
			});

		}

		$(':checkbox[name=' + $(this).data('select-all') + ']').prop("checked", _selectall);
	});

}

//selectnone checkboxes
function selectNone() {

	$(':checkbox.checkNone').on('click', function() {
		var _this = $(this);
		var _selectnone = _this.prop("checked");

		if ( _selectnone ) {
			$(':checkbox[name=' + $(this).data('checkbox-name') + ']').prop("checked", false);
		}
	});
	// Individual checkboxes
	$(':checkbox.checkone').on('click', function() {

		$(':checkbox[name=' + $(this).data('select-none') + ']').prop("checked", false);
	});

}

function switchselects() {
// iOS6 style switch checkboxes
// JS is only used to add the <div>s
	var switches = document.querySelectorAll('input[type="checkbox"].ios-switch');

	for (var i=0, sw; sw = switches[i++]; ) {
		var div = document.createElement('div');
		div.className = 'switch';
		sw.parentNode.insertBefore(div, sw.nextSibling);
	}

}
switchselects();

// pattern of hidden table rows in cms, admin
//table panel row
	$(".row-panel").addClass('hidden');

	function activeRow() {

			$('.show-button button').on('click', function()  {
				var row = $(this).closest('.row-view'),
					cell = $(this).parent('td'),
					tbody = $(this).closest('tbody'),
					rowpanel = $(row).nextAll('.row-panel')[0];

				if (row.hasClass('active')) {
					cell.removeClass('hide-button').addClass('show-button'),
					row.removeClass('active'),
					$(rowpanel).addClass('hidden');
					return false;
				}
				if (row.not('.active')) {
					cell.removeClass('show-button').addClass('hide-button'),
					row.addClass('active');
					$(rowpanel).removeClass('hidden');
					return false;
				}

			});

			$('.actions button').on('click', function()  {
				var rpanel = $(this).parents('.row-panel'),
					rview = $(this).parents('.row-panel').prev('.row-view');

				$(rview).find('td.hide-button').removeClass('hide-button').addClass('show-button');
				$(rview).removeClass('active');
				$(rpanel).addClass('hidden');
			});

			$('.viewall').on('click', function()  {
				var cell = $(this).parent('td');
				var listRowpanel = $(this).closest('table').find('tbody').children('.row-panel');
				listRowpanel.toggleClass('hidden');
				return false;
			});
			$('.viewsub').on('click', function()  {
				var $this = $(this);
				var cell = $(this).parent('td');
				var subRowpanel = $(this).parents('.subtitle').closest('tbody').find('.row-panel');
				subRowpanel.toggleClass('hidden');
				if($this.hasClass("open")){
					$(this).removeClass("open");
				} else {
					$(this).addClass("open");
				}
				return false;
			});

			$('.subtitle itoggle').on('click', function()  {

			});

	}
	activeRow();

//table row itemeditor
	function editRow() {
		$('tbody .s-edit button').on('click', function()  {
			var $editor = $(this).parents('.s-edit');
			$editor.hide();
		});
	}
	editRow();

// modal - award credits for project
function recipientCredits() {
	$(function() {
		$("#recipient").dialog({
			bgiframe: true,
			autoOpen: false,
			height:510,
			width:700,
			resizable: false,
			modal: true,
			zIndex: 999999,
			overlay: {
				backgroundColor: '#000',
				opacity: 0.4
			},
			title: 'Choose a Recipient for Award'
		});

		$(".openRecipient").click(function () {
			$('#recipient').dialog('open');
			$(this).attr({value:"Change Recipient"});
		});

		$("#recipient .modalClose, #recipient .ui-icon-closethick").click(function() {
			$('.splist-3').uncolumnlists();
			$('#recipient').dialog('close');
			$(".updaterecipient").show();
		});

		$("#recipient .updaterecipient input:submit").click(function() {
			$(this).parents('.updaterecipient').hide();
				return false;
		});
	});
}
recipientCredits();


// modal - award credits participant organization
function awardCredits() {
	$('#project').hide();

	$(function() {
		$("#project").dialog({
			bgiframe: true,
			autoOpen: false,
			height:510,
			width:720,
			resizable: false,
			modal: true,
			zIndex: 999999,
			overlay: {
				backgroundColor: '#000',
				opacity: 0.4
			},
			title: 'Choose a Project for Award'
		});

		$(".openProject").click(function () {
			$('#project').dialog('open');
			$(this).attr({value:"Change Project"});
		});

		$("#project .modalClose, #project .ui-icon-closethick, .ui-icon-closethick").click(function() {
			$('#project').dialog('close');
			$(".updaterecipient").show();
		});

		$(".addAward .updaterecipient input:submit").click(function() {
			$(this).parents('.updaterecipient').hide();
			$(".addAward .openProject").attr({value:"Select A Project"});
				return false;
		});
	});
}
awardCredits();

		$("#project .modalClose").click(function() {
			$('#project').dialog('close');
			$(".updaterecipient").show();
		});

//cms awards editing step by step form
function stepSearch() {
	$(".award-search-results").addClass('hidden');
	$(".award-update-selection").addClass('hidden');

	var find = ".find";
		findResults = ".find-results",
		update = ".update",
		findupdate = ".find-update";

		//button to reveal results table
	$('.find-results').click(function() {
		var results = $(this).parents('fieldset').find('.award-search-results')[0];
		$(results).removeClass('hidden');
		return false;
	});

	//button to reveal selection
	$('.find-update').click(function() {
		var updateselect = $(this).parents('fieldset').find('.award-update-selection')[0];
		$(updateselect).removeClass('hidden');
		$(this).parents('.award-search-results').addClass('hidden');
		return false;
	});

	//button to remove selection
	$('.delete-sel').click(function() {
		$(this).parents('award-update-selection').addClass('hidden');
		return false;
	});


}
stepSearch();

//CMS datepickers default
$(function() {
	$( ".datepicker" ).datepicker({
		changeMonth: true,
		changeYear: true
	});
});

//CMS date range - org project credits
	$(function() {
		$( ".date-range-from" ).datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 1,
			zIndex: 999999,
			onClose: function( selectedDate ) {
				$( ".date-range-to" ).datepicker( "option", "minDate", selectedDate );
			}
		});
		$( ".date-range-to" ).datepicker({
			defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 1,
			zIndex: 999999,
			onClose: function( selectedDate ) {
				$( ".date-range-from" ).datepicker( "option", "maxDate", selectedDate );
			}
		});
	});

//CMS select multiple from dropdown
$(function() {
	// $("#products1,#products2").select2();
	$(".multistatus").select2({
		placeholder: "Select Multiple Options"
	});
});
// general select2 dropdown
$(function() {
	$(".select").select2();

	// select2 dropdown allow user input
	$(".selector").select2();
});

// CMS project standards filter by report type


//CMS adddelete cloned elements
function makeAlist() {
	$(function() {
		// var $makeList = $('<div class="makeListing"/>'),
		// add = $('.makeListing a.add'),
		// remove = $('.makeListing a.remove');

		var $makeList = $('<div class="makeListing"/>'),
		$clone = $makeList.clone( true ),
		add = $('.makeListing a.add');
		// remove = $('.makeListing a.remove');

		$('.add').on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
				$orig =  $this.parents('.makeListing');
			$orig.clone(true, true).hide().insertAfter($orig).fadeIn().addClass('copylist');
			// $orig.clone().insertAfter($orig).addClass('copylist');
			$(this).remove();
			//$orig.remove('.makeListing a.add');
		});
		$('.remove').click(function(e) {
			e.preventDefault();
			var $this = $(this);
			$this.closest('.makeListing').remove();
		});
	});
}
makeAlist();

//CMS MODALS

// generic modal close buttons
function closeModal() {
		$(".ui-dialog-content .actions > button, .btn, .modalClose, .ui-icon-closethick").click(function() {
			$(".ui-dialog-content").dialog("close");
		});
}
closeModal();

//edit pitchgrid modal
function pitchEdit() {
	$('#editpitch').hide();

	$(function() {
		$( "#editpitch" ).dialog({
			bgiframe: true,
			autoOpen: false,
			height:710,
			width:1100,
			resizable: false,
			modal: true,
			zIndex: 999999999,
			overlay: {
				backgroundColor: '#000',
				opacity: 0.4
			}
		});

		$(".openEditpitch").click(function () {
			$('#editpitch').dialog('open');
			return false;
		});

		//close
		closeModal();

	});
}
pitchEdit();

//tv project promote
function projectPromote() {
	//promote to dev modal
	$('#todev').hide();

	$(function() {
		$( "#todev" ).dialog({
			bgiframe: true,
			autoOpen: false,
			minHeight: 100,
			width:480,
			resizable: false,
			modal: true,
			zIndex: 999999999,
			overlay: {
				backgroundColor: '#000',
				opacity: 0.4
			}
		});

		$(".openTodev").click(function () {
			$('#todev').dialog('open');
			return false;
		});

		//close
		closeModal();

	});

	//promote to pilot modal
	$('#topilot').hide();

	$(function() {
		$( "#topilot" ).dialog({
			bgiframe: true,
			autoOpen: false,
			minHeight: 100,
			width:480,
			resizable: false,
			modal: true,
			zIndex: 999999999,
			overlay: {
				backgroundColor: '#000',
				opacity: 0.4
			}
		});

		$(".openTopilot").click(function () {
			$('#topilot').dialog('open');
			return false;
		});

		//close
		closeModal();

	});

	//promote to current modal
	$('#tocurrent').hide();

	$(function() {
		$( "#tocurrent" ).dialog({
			bgiframe: true,
			autoOpen: false,
			minHeight: 100,
			width:480,
			resizable: false,
			modal: true,
			zIndex: 999999999,
			overlay: {
				backgroundColor: '#000',
				opacity: 0.4
			}
		});

		$(".openTocurrent").click(function () {
			$('#tocurrent').dialog('open');
			return false;
		});

		closeModal();

	});

	//promote to public modal
	$('#topublic').hide();

	$(function() {
		$( "#topublic" ).dialog({
			bgiframe: true,
			autoOpen: false,
			minHeight: 100,
			width:480,
			resizable: false,
			modal: true,
			zIndex: 999999999,
			overlay: {
				backgroundColor: '#000',
				opacity: 0.4
			}
		});

		$(".openTopublic").click(function () {
			$('#topublic').dialog('open');
			return false;
		});

		//close
		closeModal();

	});

}
projectPromote();

//project episodes add new empty episodes modal
function addEpisodes() {
	$('#addepisodes').hide();

	$(function() {
		$( "#addepisodes" ).dialog({
			bgiframe: true,
			autoOpen: false,
			minHeight: 100,
			width:480,
			resizable: false,
			modal: true,
			zIndex: 999999999,
			overlay: {
				backgroundColor: '#000',
				opacity: 0.4
			}
		});

		$(".openModal").click(function () {
			$('#addepisodes').dialog('open');
			return false;
		});

		//close
		closeModal();

	});
}
addEpisodes();

// Prevent jQuery UI dialog from blocking focusin
// for tinyMCE
function mceWindow() {

	$(document).on('focusin', function(e) {
		if ($(event.target).closest(".mce-window").length) {
			e.stopImmediatePropagation();
		}
	});

}
 mceWindow();

//edit standards modal
//using tinymce
function disclaimerStandards() {

		$( "#tostandard" ).dialog({
			bgiframe: true,
			autoOpen: false,
			mode: "none",
			minHeight: 100,
			width:520,
			resizable: false,
			modal: true,
			zIndex: 999999999,
			dialogClass: "modal-tinymce",
			overlay: {
				backgroundColor: '#000',
				opacity: 0.4
			},
			open: addTinyMCE,
			close: function() {
				$(this).dialog('close');
			}
		});

		$(".openStandard").click(function () {
			$('#tostandard').dialog('open');
			return false;
		});

		//close
		closeModal();

}
disclaimerStandards();

//edit standards language modal
//using tinymce
function langStandards() {
	//standards modal
	$(function() {
		$( "#tolang" ).dialog({
			autoOpen: false,
			mode: "none",
			minHeight: 100,
			width:520,
			resizable: false,
			modal: true,
			zIndex: 999999999,
			dialogClass: "modal-tinymce",
			overlay: {
				backgroundColor: '#000',
				opacity: 0.4
			},
			open: addTinyMCE,
			close: function() {
				$(this).dialog('close');
			}

		});

		$(".openLang").click(function () {
			$('#tolang').dialog('open');
			return false;
		});

		//close
		closeModal();

	});

}
langStandards();

//tinymce text editor
function addTinyMCE() {

	var tinymce_url = 'http://tinymce.cachefly.net/4.0/';

	jQuery.getScript(tinymce_url+"jquery.tinymce.min.js").done(function(){
		$('textarea.wysiwyg').tinymce({
			script_url: tinymce_url+'tinymce.min.js',
			plugins: [
				"link",
				"paste"
			],
			//menubar: "file format edit view",
			menu: {
				edit: {title: 'Edit', items: 'undo redo | cut copy paste | selectall'},
				view: {title: 'View', items: 'visualaid'},
				format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | removeformat'}
			},
			toolbar: "undo redo | bold italic | bullist numlist outdent indent",
			statusbar : false
		});
	});

}
addTinyMCE();

// tinymce instance in dialog must be removed on close
function removeTinyMCE () {
	tinyMCE.execCommand('mceFocus', false, 'textarea.wysiwyg');
	tinyMCE.execCommand('mceRemoveControl', false, 'textarea.wysiwyg');
}

//google web fonts
//controls FOUT
  WebFontConfig = {
	google: { families: [ 'Open+Sans:400,600:latin', 'Open+Sans+Condensed:300:latin' ] }
  };
  (function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
  })();

// qtip tooltip
//http://craigsworks.com/projects/qtip/
function q2Tip() {
	//find links with class=qt
	$('a.qt').each( function() {
		$(this).qtip ({
			content: {
				text: 'Loading...',
				ajax: {

					url:  $(this).attr('rel'),
					dataType: 'html',
					method: 'get',
					success: function (data) {
						$('.ui-tooltip-content').html(data);
						$(".ui-tooltip-content .titlecell").append(":");
					}
				} ,
				title: {
					text: $(this).text() + '<span class="role">' + 'role, role, role' +'</span>',
					button:true
				}
			},
			position: {
				at: 'right center',
				my: 'left center',
				viewport: $(window), //keep tooltip on-screen
				effect: false
			},
			show: {
				event: 'mouseover',
				solo: true //only show one at a time
			},
			hide: 'unfocus',
			style: {
				tip: true,
				classes: 'ui-tooltip-wiki ui-tooltip-dark ui-tooltip-shadow'
			}

		});


	});

}
