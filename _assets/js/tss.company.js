var TssCompany = function () {
	var settings = {
		urls: {
			credits: '#',
			creditsDetails: '#',
			sectionUpdate: '#',
			employee: "#"
		},
		vars: {
			companyId: 0,
			startTab: ''
		}
	};

	var objects = {
		SectionContainer: null,
		MenuContainer: null,
		SectionContainerConst: "#section_area"
	};

	function reinit() {
		var navSection = objects.MenuContainer;
		navSection.find("li[data-section]")
				.die("click").bind("click", function () { sectionUpdate($(this), $(this).attr("data-section")); })
				.die("loadHash").bind("loadHash", function () { sectionUpdate($(this), $(this).attr("data-section"), true, true); });
		$("a[data-type=moreLink]").die("click").bind("click", function () {
			var section = $(this).attr("data-section");
			sectionUpdate(navSection.find("ul li[data-section=" + section + "]"), section);
			window.scrollTo(0, 0);
			return false;
		});
		$("a[data-type=moreLinkSubTab]").die("click").bind("click", function () {
			var othis = $(this);
			var section = othis.attr("data-section");
			var tabId = othis.attr("tab-id");
			var current = objects.MenuContainer.find('li[data-section].active').attr("data-section");
			if (section != current) {
				sectionUpdateFinEx(navSection.find("ul li[data-section=" + section + "]"), section, false, tabId);
			}
			window.scrollTo(0, 0);
			return false;
		});
	}

	function init(parameters) {
		objects.SectionContainer = $("#section_area");
		objects.MenuContainer = $("nav[role=navigation]");
		$.extend(true, settings, parameters);

		$("#main .sections-heading").collapsible();
		//initEmployees();
		TssParticipant.emulateSectionUpdate(objects.SectionContainer, settings.urls.sectionUpdate, settings.vars.companyId, function (section) { sectionUpdateCallback(section); });

		$("#addListToggler").click(addListClick);
		$("#addNoteToggler").click(addNoteClick);
		protectImg();

		switch (settings.vars.startTab) {
			case "credits":
				initCredits();
				break;
			default:
				initEmployees();
				break;
		}
		reinit();
	}

	function addListClick() {
		TssParticipant.addList(settings.vars.companyId, "Company");
		return false;
	}

	function addNoteClick() {
		TssParticipant.addNote(settings.vars.companyId, "Company");
		return false;
	}

	var updateInProgress = false;

	function sectionUpdateFinEx(sender, section, doRefresh, tabId) {
		if (updateInProgress || sender.hasClass('disabled') || (sender.hasClass('active') && !doRefresh)) {
			if (sender.hasClass('active')) {
				objects.SectionContainer.find('.tabs').find('.tabs-selected').removeClass('tabs-selected').end().find('#tab-' + tabId).addClass("tabs-selected").end().find('.tabs-panel-selected').removeClass('tabs-panel-selected').end().find('#' + tabId + '-enhanced').addClass('tabs-panel-selected');
			}
			return;
		}
		updateInProgress = true;
		objects.SectionContainer.loadAuthorized(settings.urls.sectionUpdate, { id: settings.vars.companyId, section: section }, function () {
			sectionUpdateCallback(section);
			objects.SectionContainer.find('.tabs').find('.tabs-selected').removeClass('tabs-selected').end().find('#tab-' + tabId).addClass("tabs-selected").end().find('.tabs-panel-selected').removeClass('tabs-panel-selected').end().find('#' + tabId + '-enhanced').addClass('tabs-panel-selected');
			objects.MenuContainer.find('li[data-section].active').toggleClass('active');
			objects.MenuContainer.find('li[data-section=' + section + ']').toggleClass('active');
		});
	}

	function sectionUpdate(sender, section, doRefresh, nohash) {
		if (updateInProgress || sender.hasClass('disabled') || (sender.hasClass('active') && !doRefresh)) {
			return;
		}
		updateInProgress = true;

		if (!!sender.attr("data-custom-id"))
			TssWhiteLabel.sectionUpdate(
				{
					vars: {
						id: settings.vars.personId,
						tabId: $(sender).attr("data-custom-id"),
						container: objects.SectionContainer,
						section: section,
						nohash: nohash
					}
				},
				function () {
					sender.closest('ul').find('.active').toggleClass('active');
					sender.toggleClass('active');
					updateInProgress = false;
					TssParticipant.initSection(section);
				}
			);
		else
			objects.SectionContainer.loadAuthorized(settings.urls.sectionUpdate, { id: settings.vars.companyId, section: section }, function () {
				sectionUpdateCallback(section);
				sender.closest('ul').find('.active').toggleClass('active');
				sender.toggleClass('active');
			}, { async: true, nohash: !!nohash, errorCallBack: function() {
				updateInProgress = false;
			} });
	}

	function initMultimedia() {
		objects.SectionContainer.find("#m-img a[data-galleryId]").click(function () {
			objects.SectionContainer.loadAuthorized(settings.urls.sectionUpdate, { id: $(this).attr("data-galleryId"), section: "medias" }, function () { sectionUpdateCallback("medias"); });
		});
	}

	function initGallery() {
		$("#back-to-gallery").click(function () {
			sectionUpdate(objects.MenuContainer.find("li[data-section=galleries]"), "galleries", true);
		});
		slideGallery();
	}

	function sectionUpdateCallback(section) {

		switch (section) {
			case "employees":
				TssLayout.initOrgTables(section);
				initEmployees();

				TssParticipant.bindToolTip();
				break;
			case "credits":
				//in lib/html5-details.js 
				TssLayout.initOrgTables(section);
				initCredits();
				html5support();
				TssLayout.applyCellWidths("p-bio-mile");
				TssLayout.applyCellWidths("p-bio-family");
				TssParticipant.initTabs();
				TssParticipant.bindToolTip();
				break;
			case "financials":
				TssLayout.initOrgTables(section);
				TssParticipant.initTabs();
				initFinancials();
				TssParticipant.bindToolTip();
				TssParticipant.initTabs();
				break;
			case "intl-box-office-section":
				TssLayout.initOrgTables(section);
				TssParticipant.bindToolTip();
				initFinancials();
				break;
			case "profile":
				TssLayout.initPersonDataTables(section);
				break;
			case "galleries":
				initMultimedia();
				break;
			case "medias":
				initGallery(sectionUpdate);
				break;
		}
		updateInProgress = false;
		TssParticipant.initSection(section);
		reinit();
	}

	function initEmployees() {
		$("#LocationId").change(function () {
			objects.SectionContainer.loadAuthorized(settings.urls.employee, { companyId: settings.vars.companyId, locationId: $(this).val() }, function () { sectionUpdateCallback("employees"); });
		});

		$("#TitleId").change(function () {
			objects.SectionContainer.loadAuthorized(settings.urls.employee, { companyId: settings.vars.companyId, titleId: $(this).val(), locationId: $("#LocationId").val() }, function () { sectionUpdateCallback("employees"); });
		});
	}

	function initCredits() {
		objects.SectionContainer.children("header").next("div").remove();
		$("#creditFilterPart").change(function () {
			objects.SectionContainer.loadAuthorized(settings.urls.credits, { companyId: settings.vars.companyId, involvementId: 0, typeid: $(this).val() }, function () { sectionUpdateCallback("credits"); });
		});

		$("#CreditInvolvementId").change(function () {
			objects.SectionContainer.loadAuthorized(settings.urls.credits, { companyId: settings.vars.companyId, involvementId: $(this).val(), typeid: $("#creditFilterPart").val() }, function () { sectionUpdateCallback("credits"); });
		});

		$("#section_area a.credits-more-result").die("click").live("click", function () {
			//var spacer = $(this).parent("section.submod").prev('div');
			//$(this).parent("section.submod").loadAuthorized(settings.urls.creditsDetails, { companyId: settings.vars.companyId, typeid: $(this).attr("data-credit-type") }, function () { spacer.remove(); sectionUpdateCallback("credits"); }, { nohash: true, updateOuter: true });
			objects.SectionContainer.loadAuthorized(settings.urls.credits, { companyId: settings.vars.companyId, typeid: $(this).attr("data-credit-type") }, function () { sectionUpdateCallback("credits"); });
			return false;
		});
	}

	function initFinancials() {
		$("#CreditTypeId").change(function () { updateBoxOfficeInternational(); });
		$("#TerritoryTypeId").change(function () { $("#CreditTypeId").val(""); updateBoxOfficeInternational(); });
		$("#breadcrumb_boxofficetotals").click(function () { $("#TerritoryTypeId").val(""); updateBoxOfficeInternational(); });
		$("#p-intl-fin-box-by-country a[data-territory-id]").click(function () {
			var territoryTypeId = $("#TerritoryTypeId");
			territoryTypeId.val($(this).data("territory-id"));
			territoryTypeId.trigger("change");
		});
		TssLayout.applyCellWidths("p-s-bo");
	}

	function updateBoxOfficeInternational() {
		var territoryId = $("#TerritoryTypeId").val();
		var creditId = $("#CreditTypeId").val();

		if (territoryId == "") { territoryId = 0; }

		$("#tabs-p-intl-fin-box-enhanced").loadAuthorized(settings.urls.boxOfficeInternational, { companyId: settings.vars.companyId, creditTypeId: creditId == "" ? 0 : creditId, territoryTypeId: territoryId }, function () {
			sectionUpdateCallback("intl-box-office-section");
		});
	}

	return {
		init: init,
		sectionUpdate: sectionUpdate
	};
}();
