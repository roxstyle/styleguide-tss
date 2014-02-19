
//record pages admin level

//nav.sections person/project/company
//dependent  script.js init
function adminMenu() {

	$(".admin .nav-admin nav.sections>ul>li>a").click(function() {

		$(this).parents().find('.cat li.active').removeClass('active');
		$(this).parent('li').addClass('active');
		unDetails();

		var active = $(this).parent();
		if ((active).hasClass("a-overview")) {
			$("body.admin div#adminMain > #admin-overview").addClass('selected');
			return false;
		}
		if ((active).hasClass("a-edit-menu")) {
			$("body.admin div#adminMain > #admin-edit-menu").addClass('selected');
			$("body.admin div#adminMain > #admin-edit-menu > div:not('.addcontent')").hide();
			return false;
		}
		if ((active).hasClass("a-feedback")) {
			$("body.admin div#adminMain > #admin-feedback").addClass('selected');
			return false;
		}
		if ((active).hasClass("a-help")) {
			$("body.admin div#adminMain > #admin-help").addClass('selected');
			return false;
		}
		function unDetails() {
			$("body.admin div#adminMain > section").removeClass('selected');
		}
	});
}

//close adminWrap panel
function adminClose() {
	$('.adminClose a').on("click", function() {
		$(this).parents(".adminWrap").hide("slide", { direction: "up" }, 500).unbind();
	});
	$('.adminClose input').on("click", function() {
		$(this).parents(".adminWrap").hide("slide", { direction: "up" }, 500).unbind();
	});
}
adminClose();

//steps for admin itemeditor menu update
function adminEditMenu() {
	adminEditStart();

	$('#adminMain #admin-edit-menu input .custom').on("click", function() {
		var s = $(this).parents("#adminMain > section.selected");
		var d = $(this).parents("#adminMain > section.selected > div");

		var t = $(this).hasClass();
		if (t == 'addContent') {
			$(s).find("div.status").hide("slide", { direction: "up" }, 500);
			$(s).find("div.addcontent").show();
		}
	});

	// submit links within modules
	$('#adminMain #admin-edit-menu .modClose a').on("click", function() {
		var s = $(this).parents("#adminMain > section.selected");
		var d = $(this).parents("#adminMain > section.selected > div");
		//$(d).hide("slide", { direction: "up" }, 500);
		//alert('hello');
		var nType = $("#PrimNavNewSectionType").val();
		//alert(nType);
		if (nType == 1) {
			$(s).find("div.addcontent").hide("slide", { direction: "up" }, 500);
			//$(s).find("div.status").show();
			$(s).find("div.addtext").show();
		}
		if (nType == 2) {
			//$(this).parents(".start").hide("slide", { direction: "up" }, 500);
			$(s).find("div.addcontent").hide("slide", { direction: "up" }, 500);
			//$(s).find("div.status").show();
			$(s).find("div.mapcontent").show();
		}

	});

	// submit buttons within modules
	$('#adminMain #admin-edit-menu .modClose input').on("click", function() {

		var s = $(this).parents("#adminMain > section.selected");
		var d = $(this).parents("#adminMain > section.selected > div");
		//$(d).hide("slide", { direction: "up" }, 500);
		//alert('hello');
		var nType = $("#PrimNavNewSectionType").val();
		//alert(nType);
		if (nType == 1) {
			$(s).find("div.addcontent").hide("slide", { direction: "up" }, 500);
			//$(s).find("div.status").show();
			$(s).find("div.addtext").show();
		}
		if (nType == 2) {
			//$(this).parents(".start").hide("slide", { direction: "up" }, 500);
			$(s).find("div.addcontent").hide("slide", { direction: "up" }, 500);
			//$(s).find("div.status").show();
			$(s).find("div.mapcontent").show();
		}
	});

}

//steps for admin itemeditor menu update
function adminEditStart() {
	$("div#adminMain > section.selected > div:not('.status')").hide();
}

//close adminWrap panel
function adminOverview() {
	$('#adminMain #admin-overview a.edit').on("click", function() {
		$(this).parents("#admin-overview").hide("slide", { direction: "up" }, 500);
		$("body.admin div#adminMain > #admin-edit-menu").addClass('selected');
		$("body.admin div#adminMain > #admin-edit-menu > div:not('.addcontent')").hide();
		$(this).parents('.adminWrap').find('.nav-admin nav.sections>ul>li.a-overview').removeClass('active');
		$(this).parents('.adminWrap').find('.nav-admin nav.sections>ul>li.a-edit-menu').addClass('active');
		return false;
	});
		$('#adminMain #admin-overview a.delete').on("click", function() {
			alert("Are you sure you want to delete this content?");
		return false;
	});
}
adminOverview();


//dependant script.js for init
//newadminTemplate()
function newadminTemplate() {
	var updateOutput = function(e) {
		var list   = e.length ? e : $(e.target),
			output = list.data('output');
		if (window.JSON) {
			output.val(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
		} else {
			output.val('JSON browser support required for this demo.');
		}
	};

	// activate Nestable for list 1
	$('#l-options').nestable({
		group: 1
	})
	.on('change', updateOutput);

	// activate Nestable for list 2
	$('#l-template').nestable({
		group: 1
	})
	.on('change', updateOutput);

	// output initial serialised data
	updateOutput($('#l-options').data('output', $('#options-output')));
	updateOutput($('#l-template').data('output', $('#template-output')));

	$('#nestable-menu').on('click', function(e) {
		var target = $(e.target),
			action = target.data('action');
		if (action === 'expand-all') {
			$('.dd').nestable('expandAll');
		}
		if (action === 'collapse-all') {
			$('.dd').nestable('collapseAll');
		}
	});

}

//admin overview toggle check All
function adminCheckAll() {
 	$('.selectall').click(function() {
        $(this).parents('#overview').find(':checkbox').not('.selectall').prop('checked', this.checked);
    });

    $('.selectall').parents('#overview').find(':checkbox').not('.selectall,:checked').click(function() {
        $(this).parents('#overview').find('.selectall').prop('checked', false);
    });
}

