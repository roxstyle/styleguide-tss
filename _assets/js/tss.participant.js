var TssParticipant = function () {

	var settings = {
		urls: {
			addList: '#',
			addNote: '#',
			addWatch: '#',
			deleteWatch: '#',
			getWatch: '#',
			updateRecord: '#',
			siteTips: '#',
			closeTip: '#',
			home: '#',
			backToClassic: '#'
		},
		elements: {
			toolsSection: '#addlist'
		}
	};

	var objects = {
		SectionContainer: null,
		MenuContainer: null,
		SectionContainerConst: "#section_area"
	};

	function initTabs() {
		if (!isSmallSizeWindow()) {
			$(objects.SectionContainerConst + " .tabs.subtabs").tabs({ alwaysScrollToTop: false });
			//$(".tabs.subtabs ul").addClass("tabs-nav");
		}
	}

	function isSmallSizeWindow() {
		return window.loadedWidth == 480;
	}

	function init(parameters) {
		objects.SectionContainer = $("#section_area");
		objects.MenuContainer = $("nav[role=navigation]");
		$.extend(true, settings, parameters);

		initSystemWatch();
		initUpdateRecord();
	}

	function emulateSectionUpdate(sectionContainer, sectionUpdateUrl, id, callBack) {
		var sender = objects.MenuContainer.find('li:first');
		var section = sender.attr('data-section');
		var firstpos = window.location.search.indexOf('section=');

		if (firstpos != -1) {
			var endpos = window.location.search.indexOf('&', firstpos + 8);
			section = (endpos == -1) ? window.location.search.substr(firstpos + 8) : window.location.search.substr(firstpos + 8, endpos - 9);
			sender = objects.MenuContainer.find('li#' + section);
		}
		sectionContainer.loadAuthorized(sectionUpdateUrl, { id: id, section: section }, function () {
			callBack(section);
			sender.closest('ul').find('.active').toggleClass('active');
			sender.toggleClass('active');
		}, null, true);
	}

	function initGallery(updateFunction) {
		$("#back-to-gallery").click(function () {

			updateFunction(objects.MenuContainer.find("li[data-section=galleries]"), "galleries", true);
			return false;
		});
		slideGallery();
	}

	function bindToolTip() {

		if (!Modernizr.touch && !!$('a[data-tooltip-type]').length) {
			$.fn.qtip.defaults.hide.leave = false;
			var params = {
				content: {
					text: function () {
						return toolTipBody($(this));
					},
					title: {
						text: "Loading..",
						button: false
					}
				},
				style: {
					tip: {
						corner: false
					},
					classes: 'ui-tooltip-wiki ui-tooltip-dark ui-tooltip-shadow'
				},
				position: {
					at: 'right center',
					my: 'left center',
					viewport: $(window), //keep tooltip on-screen
					effect: false
				},
				show: {
					event: 'mouseover',
					delay: 400,
					solo: true
				},
				hide: {
					fixed: true,
					delay: 250
				},
				events: {
					show: function (event, api) {
						var element = $(api.elements.target);
						var type = element.attr("data-tooltip-type");
						var id = element.attr("data-tooltip-id");
						if (!!(cachedTooltip[type + id])) {
							AjaxHelper.get(settings.urls.getWatch, { recordId: id }, function (result) {
								updateTooltipWatchButtons(id, result);
							}, "json", { nohash: true, cache: false, isBlockUi: false });
						}
					}
				}
			};
			if ($("html").is(".lt-ie9")) {
				params.position.target = 'mouse';
				params.position.adjust = {};
				params.position.adjust.mouse = false;
				params.position.adjust.x = 20;
			}
			$('a[data-tooltip-type]').qtip(params);
		}


		$('a[data-in-watchlist]').die('click').live('click', function() {
			var sender = $(this);
			if ($(sender).data('in-watchlist')) {
				AjaxHelper.post(settings.urls.deleteWatch, { recordId: $(this).data('id') }, function (data) {
					updataWatchStatus(data, function () {
						sender.data("in-watchlist", false).text("Add to Watchlist");
					});
				}, null, { nohash: true, cache: false });
			} else {
				AjaxHelper.post(settings.urls.addWatch, { recordId: $(this).data('id') }, function (data) {
					updataWatchStatus(data, function () {
						sender.data("in-watchlist", true).text("Remove from Watchlist");
					});
				}, null, { nohash: true, cache: false });
			}
			return false;
		});
	}
	var tooltips = {};
	var cachedTooltip = {};
	var tooltipHeads = {};

	function toolTipBody(element) {
		var type = element.attr("data-tooltip-type");
		var id = element.attr("data-tooltip-id");
		if (!!(tooltips[type + id])) {
			element.qtip('option', 'content.title.text', "");
			cachedTooltip[type + id] = true;
			return tooltips[type + id];
		}
		element.qtip().elements.tooltip.addClass("loading");
		AjaxHelper.toolTip("/" + type + "/Tooltip", { id: id }, function (el, tipName) {
			return function (result) { toolTipUpdate(el, tipName, $(result)); };
		}(element, type + id), 'html', 'html', 'POST', { async: true, cache: true, isBlockUi: false });
		tooltipHeads[type + id] = "Loading..";
		tooltips[type + id] = "Loading..";
		return "Loading...";
	}

	function toolTipUpdate(element, tipName, body) {
		tooltipHeads[tipName] = body.find("div#header").html();
		tooltips[tipName] = body.find("div#header").remove().end().html();
		element.qtip('option', 'content.title.text', tooltipHeads[tipName]);
		element.qtip('option', 'content.text', tooltips[tipName]);
		element.qtip().elements.tooltip.removeClass("loading");

		updateTooltipHeader(element);
		tooltips[tipName] = element.qtip().elements.tooltip.find("div.ui-tooltip-content").html();
	}

	function updateTooltipHeader(element) {
		var sender = $(element.qtip().elements.tooltip);
		var $headerClone = $(sender).find("div.ui-tooltip-titlebar").clone();
		$(sender).find("div.ui-tooltip-titlebar").remove();
		$(sender).find("article").prepend($headerClone);
	}

	function updateTooltipWatchButtons(id, result) {
		if (typeof (result) != "undefined" && typeof (result.Enabled) != "undefined") {
			var buttonText;

			if (!result.Enabled) {
				buttonText = "Add to Watchlist";
			} else {
				buttonText = "Remove from Watchlist";
			}

			$("a[data-in-watchlist][data-id='" + id + "']").each(function() {
				$(this).data("in-watchlist", result.Enabled).text(buttonText);
			});
		}
	}

	function addList(id, recordType) {
		var target = $("#addlist");
		target.loadAuthorized(settings.urls.addList, {
			id: id,
			recordType: recordType,
			sessionId: getSessionId()
		}, function () {
			target.show();
			target.find("form").attr("style", "margin-bottom:0px");
		}, { nohash: true, cache: false });
	}

	function addNote(id, recordType) {
		window.scrollTo(0, 0);
		var target = $("#addlist");
		target.loadAuthorized(settings.urls.addNote, {
			id: id,
			recordType: recordType,
			sessionId: getSessionId()
		}, function () {
			target.show();
		}, { nohash: true, cache: false });
	}

	// tools systemWatch
	function initSystemWatch() {
		var flag = $("#toolGears .toolWatch a");
		var recordId = flag.attr("recordId");

		if (recordId) {
			AjaxHelper.get(settings.urls.getWatch, { recordId: recordId }, function (result) {
				if (typeof (result) != "undefined" && typeof (result.Enabled) != "undefined") {

					$("#toolGears .toolWatch a.watch").attr({ title: "Add to My Watch List" });
					$("#toolGears .toolWatch a.unwatch").attr({ title: "Remove from My Watch List" });
					var title = flag.attr("title");
					flag.text(title);

					if (!result.Enabled) {
						flag.removeClass('unwatch');
						flag.addClass('watch');
						flag.attr({ title: "Add to My Watch List" }).text("Add to My Watch List");
					} else {
						flag.removeClass('watch');
						flag.addClass('unwatch');
						flag.attr({ title: "Remove from My Watch List" }).text("Remove from My Watch List");
					}

					flag.click(function () {
						if (flag.hasClass('unwatch')) {
							AjaxHelper.post(settings.urls.deleteWatch, { recordId: recordId }, function (data) {
								updataWatchStatus(data, function() {
									flag.removeClass('unwatch').addClass('watch').attr({ title: "Add to My Watch List" }).text(flag.attr("title"));
								});
							}, null, { nohash: true, cache: false });
						} else if (flag.hasClass("watch")) {
							AjaxHelper.post(settings.urls.addWatch, { recordId: recordId }, function (data) {
								updataWatchStatus(data, function () {
									flag.removeClass('watch').addClass('unwatch').attr({ title: "Remove from My Watch List" }).text(flag.attr("title"));
								});
							}, null, { nohash: true, cache: false });
						}
						return false;
					});
				}
			}, "json", { nohash: true, cache: false });
		}
	}

	function updataWatchStatus(data, callBack) {
		var resultJson = jQuery.parseJSON(data);
		if (resultJson.Message !== undefined && resultJson.Message !== null && resultJson.Message !== '') {
			alert(resultJson.Message);
		}
		callBack();
	}

	// Update Record
	function initUpdateRecord() {
		$('#updateRecordToggler').click(function () {
			$(settings.elements.toolsSection).loadAuthorized(settings.urls.updateRecord, { id: $('#recordId').val(), recordType: $('#recordType').val(), recordName: $('#recordName').val() }, function () {
				$(settings.elements.toolsSection).show();
			}, { nohash: true });
			return false;
		});
	}

	function playVideo(id, widht, height, autostart) {
		if (!widht)
			widht = '615';
		if (!height)
			height = '346';
		if (typeof autostart == "undefined")
			autostart = true;

		window.setTimeout(function () {
			if (typeof window.ivaplayer != "undefined") {

				var player = window.ivaplayer('ivaPlayer');
				if (player && !!player.setup)
					player.setup({
						'flashplayer': 'http://www.videodetective.net/flash/players/?pversion=5.6&playerid=460&sub=HTML5ReportTag',
						'customerid': '401223',
						'publishedid': id,
						'playerid': '460',
						'playlistid': '0',
						'videokbrate': '750',
						'fmt': '4',
						'width': widht,
						'height': height,
						'sub': 'HTML5ReportTag',
						'autostart': autostart
					});

			}
			if (typeof window.swfobject != "undefined") {
				var flashvars = {};  // do not use
				var params = { menu: "false", allowScriptAccess: "always", allowNetworking: "all", allowfullscreen: "true", 'autostart': autostart };
				var attributes = { id: "IvaPlayer", name: "IvaPlayer" };
				window.swfobject.embedSWF("http://www.videodetective.net/flash/players/?customerid=401223&playerid=460&publishedid=" + id + "&playlistid=0&pversion=4.6&autostart=" + autostart + "&videokbrate=750&sub=", "ivaPlayer", widht, height, "9.0.0", "expressInstall.swf", flashvars, params, attributes);
			}
		}, 2000);
	}

	function showTip() {
		var $body = $("body");
		if ($body.is('.l') || $body.is('.m')) {
			var overlay = $('<div></div>').hide().appendTo('body');
			overlay.loadAuthorized(settings.urls.siteTips, {}, function () {
				overlay.find("#takethetour").dialog({
					modal: true,
					draggable: false,
					resizable: false,
					width: $body.is('.l') ? 780 : 510,
					height: 627,
					zIndex: 3200,
					bgiframe: true,
					dialogClass: 'tsstour',
					close: function () {
						AjaxHelper.post(settings.urls.closeTip, {}, function () {
						}, 'json', { nohash: true });
					},
					overlay: {
						backgroundColor: '#000',
						opacity: 0.8
					},
					open: function () {
						$(this).find('.tsstour').flexslider({
							controlsContainer: ".tsstour-container",
							slideshow: false,
							controlNav: true
						});
					}
				});
			}, { nohash: true });
		}

		$("#takethetour #taketour").click(function () {
			$("#takethetour .next").click();
			return false;
		});

		$("#takethetour #closetour").click(function () {
			$("#takethetour").dialog("close");
			return false;
		});
	}

	function updateUserInfo(url) {
		AjaxHelper.post(url, {}, function (data) {
			$("#lblUserName").html(data.UserName);
			if (data.IsAdmin == true)
				$("#menuAdmin").show();
			if (data.ShowSiteTips == true)
				showTip();

			$("#SessionId").val(data.SessionId);

			if (typeof (TssDashboard) != 'undefined') {
				TssDashboard.initNewFeaturesSlider(data.HideNewFeatures);
			}

		}, 'json', { nohash: true, cache: false });
	}

	function getSessionId() {
		return $("#SessionId").val();
	}

	function initPagination(sectionId) {

		var sectionIdi = null;
		if (sectionId) {
			sectionIdi = $(sectionId);
		}
		$("#main div.pagination span.paginate_button[pageId]").click(function () {
			$("#Page").val($(this).attr("pageId"));

			var form = $(this).closest("form");
			if (sectionIdi != null) {
				sectionIdi.loadAuthorized(form.attr("action"), form.serializeArray(), function () { }, { async: true });
			}
			else {
				form.submit();
			}
		});

		$("table thead th div[data-sort], section.uscal table thead th div[data-sort]").click(function () {
			var sortBy = $("#SortBy");
			var isDesc = $("#IsDesc");
			var newsort = $(this).attr("data-sort");
			if (newsort == sortBy.val()) {
				if (isDesc.val() == "False") {
					isDesc.val("True");
				} else {
					isDesc.val("False");
				}
			} else {
				sortBy.val(newsort);
			}
			$("#Page").val(1);

			var form = $(this).closest("form");
			if (sectionIdi != null) {
				sectionIdi.loadAuthorized(form.attr("action"), form.serializeArray(), function () { }, { async: true });
			}
			else {
				form.submit();
			}
		});
	}

	function initSection(section) {
		objects.MenuContainer.find("li#" + section + " a").focus();
	}

	function getSection() {
		var sender = objects.MenuContainer.find('li.active:first');
		var section = sender.attr('data-section');
		return section;
	}

	return {
		initTabs: initTabs,
		isSmallSizeWindow: isSmallSizeWindow,
		emulateSectionUpdate: emulateSectionUpdate,
		initGallery: initGallery,
		bindToolTip: bindToolTip,
		init: init,
		addList: addList,
		addNote: addNote,
		playVideo: playVideo,
		updateUserInfo: updateUserInfo,
		initPagination: initPagination,
		initSection: initSection,
		getSection: getSection
	};
}();
