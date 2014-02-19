var TssTools = function () {

	/* Watch list */
	var tssWatchList = function () {
		var watchlistSettings = {
			urls: {
				sectionUpdate: '#',
				deleteItem: '#',
				activateItem: '#',
				deactivateItem: '#'
			},
			elements: {
				section: '#',
				deleteButton: '#',
				activateButton: '#',
				deactivateButton: '#'
			}
		};

		var sectionLinks;

		function getRowId(object) {
			return $(object).parents('.row').attr("id");
		}

		function getType() {
			return sectionLinks.closest('.active').attr("data-section");
		}

		function init(parameters) {
			$.extend(true, watchlistSettings, parameters);

			sectionLinks = $("nav.sections ul li[data-section]");
			sectionLinks.die("click").live("click", function () { sectionUpdate($(this), $(this).attr("data-section")); });

			$(watchlistSettings.elements.deleteButton).die("click").live("click", function () {
				if (confirm("Do you want to delete the selected item?")) {
					refreshSection(watchlistSettings.urls.deleteItem, null, $(this).attr('recordId'));
				}

				return false;
			});

			$(watchlistSettings.elements.activateButton).die("click").live("click", function () {
				return refreshSection(watchlistSettings.urls.activateItem, getRowId($(this)));
			});

			$(watchlistSettings.elements.deactivateButton).die("click").live("click", function () {
				return refreshSection(watchlistSettings.urls.deactivateItem, getRowId($(this)));
			});
		}

		function refreshSection(url, rowId, recordId) {
			var type = getType();
			if (type) {
				updateInProgress = true;

				AjaxHelper.post(url, { id: rowId, recordId: recordId, type: type }, function (data) {
					updateInProgress = false;

					if (data.contains("Message")) {
						var resultJson = jQuery.parseJSON(data);
						alert(resultJson.Message);
						refreshSection(watchlistSettings.urls.activateItem, 0);
					} else {
						$(watchlistSettings.elements.section).html(data);
						TssParticipant.bindToolTip();
					}

				}, null, { async: false });
			}

			return false;
		}

		var updateInProgress = false;

		function sectionUpdate(sender, type) {
			if (updateInProgress || sender.hasClass('disabled') || sender.hasClass('active')) {
				return;
			}

			updateInProgress = true;
			$(watchlistSettings.elements.section).loadAuthorized(watchlistSettings.urls.sectionUpdate, { type: type }, function () {
				sender.closest('ul').find('.active').removeClass('active'); //unselect active tabs
				sender.toggleClass('active'); //make the currently selected as active
				updateInProgress = false;
				TssParticipant.bindToolTip();

				$('#search.isearch').focus().blur();
			}, { async: false, nohash: true });
		}

		return {
			init: init
		};
	}();

	var tssContactUs = function () {
		var contatcUsSettings = {
			urls: {
				sectionUpdate: '#'
			},
			elements: {
				section: '#'
			}
		};

		var updateInProgress = false;

		function init(parameters) {
			$.extend(true, contatcUsSettings, parameters);

			sectionLinks = $("nav.sections ul li[data-section]");
			sectionLinks.die("click").live("click", function () { sectionUpdate($(this), $(this).attr("data-section")); });
		}

		function sectionUpdate(sender, type) {
			if (updateInProgress || sender.hasClass('disabled') || sender.hasClass('active')) {
				return;
			}

			$(contatcUsSettings.elements.section).loadAuthorized(contatcUsSettings.urls.sectionUpdate, { type: type }, function () {
				sender.closest('ul').find('.active').removeClass('active'); //unselect active tabs
				sender.toggleClass('active'); //make the currently selected as active
				updateInProgress = false;

				$('#search.isearch').focus().blur();
			}, { async: false, nohash: true });
		}
		return {
			init: init
		};
	}();

	/* Searches */
	var tssSearches = function () {
		var searchesSettings = {
			urls: {
				add: '#',
				save: '#',
				deleteItem: '#',
				refresh: '#',
				edit: '#',
				newQuery: '#',
				modifyQuery: '#'
			},
			elements: {
				addSection: '#addlist',
				addButton: '[data-search-action="save"]',
				newButton: '[data-search-action="new"]',
				modifyButton: '[data-search-action="modify"]',
				saveSearch: '#btnSaveSearch',
				params: '#Params',
				txtName: '#Name',
				sectionLinks: 'nav.sections ul li[data-section]',
				section: '#list-main-area',
				deleteButton: '.toolDelete a',
				editButton: '.toolEdit a',
				editSaveButton: '#search-edit-save',
				editCancelButton: '#search-edit-cancel'
			}
		};

		var sectionLinks;
		var updateInProgress = false;

		function getRowId(object) {
			return $(object).parents('.row').attr("id");
		}

		function getType() {
			return $(searchesSettings.elements.sectionLinks).closest('.active').attr("data-section");
		}

		function init(parameters) {
			$.extend(true, searchesSettings, parameters);

			sectionLinks = $(searchesSettings.elements.sectionLinks);
			sectionLinks.die("click").live("click", function () {
				if (updateInProgress || $(this).hasClass('disabled') || $(this).hasClass('active')) {
					return;
				}

				$(this).closest('ul').find('.active').removeClass('active'); //unselect active tabs
				$(this).toggleClass('active'); //make the currently selected as active

				refreshSection(searchesSettings.urls.refresh);
			});

			$(searchesSettings.elements.deleteButton).die("click").live("click", function () {
				if (confirm("Do you want to delete the selected item?")) {
					refreshSection(searchesSettings.urls.deleteItem, getRowId($(this)));
				}

				return false;
			});

			$(searchesSettings.elements.editButton).die("click").live("click", function () {
				var id = getRowId($(this));
				var editContainer = $("<div class='edit-search' id='edit-search-" + id + "'></div>");
				$(this).closest("div.s.clearfix").parent().append(editContainer);
				var editbuton = $(this).hide();

				editContainer.loadAuthorized(searchesSettings.urls.edit, { id: id }, function () { initEditSearch(id, editbuton); }, { nohash: true });
			});
		}

		function initEditSearch(id, editbuton) {
			var listcontainer = $("div#edit-search-" + id);

			listcontainer.find(searchesSettings.elements.editCancelButton).die("click").live("click", function () {
				listcontainer.remove();
				editbuton.show();
			});

			listcontainer.find(searchesSettings.elements.editSaveButton).die("click").live("click", function () {
				editSearch(listcontainer, id);
			});

			listcontainer.find('form').die("keypress").live("keypress", function (event) {
				if (event.which == 13) {
					event.preventDefault();
					editSearch(listcontainer, id);
					return false;
				}
				return true;
			});

			if (jQuery.validator)
				jQuery.validator.unobtrusive.parse('body');
		}

		function editSearch(listcontainer, id) {
			listcontainer.loadAuthorized(searchesSettings.urls.save, {
				id: id, Name: listcontainer.find("#Name").val(), Description: listcontainer.find("#Description").val(), RecordGroupTypeId: listcontainer.find("#RecordGroupTypeId").val()
			}, function () {
				refreshSection(searchesSettings.urls.refresh);
			}, { nohash: true }, false);
		}


		function refreshSection(url, id) {
			var type = getType();

			if (type) {
				updateInProgress = true;

				$(searchesSettings.elements.section).loadAuthorized(url, { id: id, recordGroupType: type }, function () {
					updateInProgress = false;
				}, { async: false });
			}

			return false;
		}

		function initAddSearches(parameters, recordGroupType) {
			$.extend(true, searchesSettings, parameters);

			$(searchesSettings.elements.addButton).die("click").live("click", function () {
				var params = $(searchesSettings.elements.params).val();
				$(searchesSettings.elements.addSection).loadAuthorized(searchesSettings.urls.add, { recordGroupType: recordGroupType, searchParams: params }, function () {
					$(searchesSettings.elements.addSection).show();
				}, { nohash: true });

				return false;
			});
		}

		function initAddSearch(parameters) {
			$.extend(true, searchesSettings, parameters);

			$(searchesSettings.elements.saveSearch).die("click").live("click", function () {
				saveSearch();
			});

			$('#pNewSearchName input').keypress(function (event) {
				if (event.which == '13') {
					event.preventDefault();
					saveSearch();
				}
			});

		}

		function initActionButtons(parameters, recordGroupType) {
			$.extend(true, searchesSettings, parameters);

			initAddSearches(parameters, recordGroupType);

			$(searchesSettings.elements.newButton).die("click").live("click", function () {
				window.location.href = searchesSettings.urls.newQuery;
			});

			$(searchesSettings.elements.modifyButton).die("click").live("click", function () {
				window.location.href = searchesSettings.urls.modifyQuery;
			});
		}

		function saveSearch() {
			var form = $(searchesSettings.elements.saveSearch).closest("form");
			if (form.valid()) {
				$(searchesSettings.elements.addSection).loadAuthorized(searchesSettings.urls.save, $(form).serializeArray(), function () {
					$(searchesSettings.elements.addSection).hide("slide", { direction: "up" }, 1000);
				}, { nohash: true });
			}
		}

		return {
			init: init,
			initAddSearches: initAddSearches,
			initAddSearch: initAddSearch,
			initActionButtons: initActionButtons
		};
	}();

	/* Update Record */
	var tssUpdateRecord = function () {
		var updateRecordSettings = {
			urls: {
				save: '#'
			},
			elements: {
				section: '#'
			},
			vars: {
				overlayId: '#addlist',
				btnUpdateRecord: '#btnUpdateRecord',
				overlay: null
			}
		};

		function init(parameters) {
			$.extend(true, updateRecordSettings, parameters);
			updateRecordSettings.vars.overlay = $(updateRecordSettings.vars.overlayId);

			sectionLinks = $("nav.sections ul li[data-section]");
			sectionLinks.die("click").live("click", function () { sectionUpdate($(this), $(this).attr("data-section")); });

			$(updateRecordSettings.vars.btnUpdateRecord).click(function () {

				var form = $(this).closest("form");
				if (form.valid()) {
					$(updateRecordSettings.vars.overlay).loadAuthorized(updateRecordSettings.urls.save, $(form).serializeArray(), function () {
						$(updateRecordSettings.vars.overlayId).delay(2500).hide("slide", { direction: "up" }, 1000);
					}, { nohash: true });
				}
			});
		}

		return {
			init: init
		};
	}();

	var settings = {
		urls: {
			saveList: '#',
			goToList: '#',
			saveNote: '#',
			getNotes: '#',
			deleteList: '#',
			deleteNote: '#',
			deleteCurrentNote: '#',
			editList: "#",
			editListSave: "#",
			customTemplateSave: "#",
			customTemplatePreview: "#",
			refreshLists: "#",
			editNoteSave: "#",
			refreshNotes: "#",
			viewList: "#",
			editComment: "#",
			deleteListItem: "#",
			updateCurrentNotePrintable: "#",
			updateCurrentNoteImportable: "#",
			getListTemplates: "#",
			deleteCustomTemplate: "#",
			getCustomTemplate: "#",
			getFields: "#",
			listDynamicSearch: "#",
			addItemToList: "#",
			currentCustomUrl: '#',
		},
		vars: {
			overlayId: '#addlist',
			listId: '#ListId',
			newListNameId: '#newListName',
			newListDescId: '#newListDescription',
			btnAddToList: '#btnAddToList',
			btnAddToNote: '#btnAddToNote',
			currentNotes: '#currentnotes',
			overlay: null,
			list: null,
			newListName: null,
			newListDesc: null,
			dynamicSearchInput: '#searchListItems',
			customTemplatePreview: '#customTemplatePreview',
			customTemplatePreviewDialog: '#customTemplatePreviewDialog'
		}
	};

	function initAddList(parameters) {
		$.extend(true, settings, parameters);
		settings.vars.overlay = $(settings.vars.overlayId);
		settings.vars.list = $(settings.vars.overlayId).find(settings.vars.listId);
		settings.vars.newListName = $(settings.vars.overlayId).find(settings.vars.newListNameId);
		settings.vars.newListDesc = $(settings.vars.overlayId).find(settings.vars.newListDescId);

		$(settings.vars.list).change(function () {
			if ($(this).val() == "0") {
				$(settings.vars.newListName).show();
				$(settings.vars.newListDesc).show();
			} else {
				$(settings.vars.newListName).hide();
				$(settings.vars.newListDesc).hide();
			}
		});

		$(settings.vars.btnAddToList).click(function () {
			addToList();
		});

		$('#newListName input').keypress(function (event) {
			if (event.which == '13') {
				event.preventDefault();
				addToList();
			}
		});

	}

	function addToList() {
		var form = $(settings.vars.btnAddToList).closest("form");
		if (form.valid()) {
			$(settings.vars.overlay).loadAuthorized(settings.urls.saveList, $(form).serializeArray(), function () {
				$(settings.vars.overlayId).slideUp(1000);
			}, { nohash: true });
		}
	}

	function initExpander() {
		$(".list-details header p.byline").expander({
			slicePoint: 40
		});
		TssParticipant.bindToolTip();
	}

	function initLists(parameters) {
		initExpander();
		$.extend(true, settings, parameters);
		settings.urls.currentCustomUrl = '#';

		$("#list-navigation li[data-section] a").die("click").live("click", function () {
			$(this).parents().find('.cat li.active').removeClass('active');
			$(this).parent('li').addClass('active');

			var section = $(this).parent("li").attr("data-section");
			if (section == "list-all") {
				$("#list-all section, #list-all>header").show();
			} else {
				$("#list-all > header").hide();
				$("#list-all section").each(function () {
					$(this).toggle(this.id == section);
				});
			}
		});

		$("section.list-details ul.toolbar.h-tools li.toolDelete a[list-id]").die("click").live("click", function () {
			deleteList($(this).attr('list-id'), $(this).attr("list-type"));
		});

		$("section.list-details ul.toolbar.h-tools li.toolEdit a[list-id]").die("click").live("click", function () {
			var $editDiv = $('#editlist');
			var id = $(this).attr('list-id');
			var editContainer = $("<div class='itemeditor comment atl dropshadow active' id='edit-list-" + id + "'></div>");
			//$("ul.toolbar").siblings(".byline").append(editContainer);
			var editbuton = $("li.toolEdit");
			$editDiv.show();
			$editDiv.html(editContainer);
			editContainer.loadAuthorized(settings.urls.editList, { id: id, page: $("#Page").val() }, function () { initEditList(id, editbuton); }, { nohash: true, errorCallBack: function (message) { refreshLists(message); } });
		});

		$("#list-main-area ul.vert-menu a[data-list-id]").die("click").live("click", function () {
			settings.urls.currentCustomUrl = '#';
			updateListSection($(this), false);
		});

		$("#editCustomTemplate").die("click").live("click", function () {
			TssMylist.clearCustomizeTempale();
			showListTemplate();
			var templateId = $(this).data('template-id');
			var type = $("#list-main-area ul.vert-menu a[data-list-id].active").closest('ul').data('group-id');
			$(".mylist-type input[data-group-id=" + type + "]").attr('checked', 'checked');
			$(".mylist-type").trigger('change').ajaxStop(function () {
				$(".mylist-edit input[value=edit]").attr('checked', 'checked');
				TssMylist.getCustomColumns(templateId);
				$(this).unbind('ajaxStop');
			});
		});

		updateListSection($("#list-main-area ul.vert-menu a[data-list-id]:first"), true);

		$('#createCustomTemplate').click(function () {
			if ($("#listtemplate").is(':visible'))
				hideListTemplate();
			else {
				showListTemplate();
				TssMylist.reinintRadioButtons();
				newlistTemplate();
				$("#submitBtnPanel").show();
			}

			TssMylist.initListFilter();
		});


		$("#main #TemplateKey").die("change").live("change", function () {
			var sender = $("#list-main-area ul.vert-menu a[data-list-id].active");
			var sortBy = $("#list-sort-options input:radio:checked").val();
			var templateNum = $(this).val();
			var sectionStr = 'list' + sender.attr('data-list-id') + '_template' + templateNum + '_sortBy' + sortBy;
			if ($(this).val() == 0) {
				showListTemplate();
				newlistTemplate();
				initMyListDropdown();
				//updateOptionsCount();
			} else {
				hideListTemplate();
				$("#main").loadAuthorized(settings.urls.viewList, { id: $(this).attr("listId"), type: $(this).val(), page: $("#Page").val(), section: sectionStr, sortBy: sortBy }, function () {
					//$("#main").loadAuthorized(settings.urls.viewList, { id: $("#TemplateKey").attr("listId"), type: $("#TemplateKey").val(), page: $("#Page").val(), section: sectionStr, sortBy: $("#SortByKey").val() }, function () {
					initExpander();
					initMyListDropdown();
					updateNavigationList(sender);
					initSearch();
					saveCurrentUrl(templateNum);
				}, { nohash: false, errorCallBack: function (message) { refreshLists(message); } });
			}
		});

		$("#list-sort-options input:radio").die("change").live("change", function () {
			var sender = $("#list-main-area ul.vert-menu a[data-list-id].active");
			var sortBy = $("#list-sort-options input:radio:checked").val();
			var templateNum = $("#main #TemplateKey").val();
			var sectionStr = 'list' + sender.attr('data-list-id') + '_template' + templateNum + '_sortBy' + sortBy;
			if ($("#TemplateKey").val() == 0) {
				showListTemplate();
				newlistTemplate();
				initMyListDropdown();
				updateOptionsCount();
				initSearch();
			} else {
				hideListTemplate();
				$("#main").loadAuthorized(settings.urls.viewList, { id: $("#TemplateKey").attr("listId"), type: $("#TemplateKey").val(), page: $("#Page").val(), section: sectionStr, sortBy: sortBy }, function () {
					initExpander();
					initMyListDropdown();
					updateNavigationList(sender);
					initSearch();
					saveCurrentUrl(templateNum);
				}, { nohash: false, errorCallBack: function (message) { refreshLists(message); } });
			}
		});

		$("ul.toolbar.h-tools li.state-default.toolComment a").die("click").live("click", function () {
			$(this).parents("ul.toolbar.h-tools").siblings("div.itemeditor.comment").toggle();
			return false;
		});

		$("#main input:button[list-item-id]").die("click").live("click", function () {
			var listItemId = $(this).attr("list-item-id");
			$("#main").loadAuthorized(settings.urls.editComment, { id: listItemId, type: $("#main #TemplateKey").val(), listId: $("#main #ListId").val(), comment: $("textarea[list-item-id=" + listItemId + "]").val(), page: $("#Page").val() }, function () { initMyListDropdown(); initExpander(); }, { nohash: true, errorCallBack: function (message) { refreshLists(message); } });
		});
		$("ul.mylisting ul.toolbar.h-tools li.state-default.toolDelete a").die("click").live("click", function () {
			if (AjaxHelper.confirm("Do you want to delete the list item?")) {
				var listItemId = $(this).attr("list-item-id");
				$("#main").loadAuthorized(settings.urls.deleteListItem, { id: listItemId, type: $("#main #TemplateKey").val(), listId: $("#main #ListId").val() }, function () {
					//initExpander();
					location.reload();
				}, { nohash: true, errorCallBack: function (message) { refreshLists(message); } });
			}
			return false;
		});

		$("#toolPrint ul.menu a#print").die("click").live("click", function () {
			window.open($(this).attr("href"), "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=yes, width=700, height=520");
			return false;
		});

		$("ul.toolbar.h-tools li.state-default.toolPrint a").die("click").live("click", function () {
			window.open($(this).attr("href"), "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=yes, width=700, height=520");
			return false;
		});

		$("div.pagination span.paginate_button[pageId]").die("click").live("click", function () {
			var listId = $(this).closest("section").find("#ListId").val();
			$("#main").loadAuthorized(settings.urls.viewList, { id: listId, page: $(this).attr("pageId"), type: $("#TemplateKey").val() }, function () {
				initExpander();
				initSearch();
			}, { nohash: true });
		});

		emulateSectionUpdate();
		initMyListDropdown();
		initSearch();
	}

	function updateListSortButtons(sortValue) {
		$("#list-sort-options input[value=" + sortValue + "]").attr('checked', 'checked');
	}

	function saveCurrentUrl(templateNum) {
		if (templateNum < 0) {
			settings.urls.currentCustomUrl = window.location.href;
		} else {
			settings.urls.currentCustomUrl = '#';
		}
	}

	var isLocked = false;
	function updateOptionsCount() {
		$('#options-num').val($(".list-container li.sl-item").length);
		//$('#options-num').val($(".list-container li.sl-item:visible").length);

		var template = $(".list-template");
		var remainItemCount = 8 - template.find("li.sl-item").length;
		if (remainItemCount <= 0) {
			disableOptionItems();
		} else {
			enableOptionItems();
		}

		$('#template-num').val(remainItemCount).text(remainItemCount);
		var arrayList = template.find('.sl-list li').map(function () { return { id: $(this).attr("data-id") }; }).get();
		$("#TemplateSchema").val(window.JSON.stringify(arrayList));
	}

	function disableOptionItems() {
		$('#list-container-items .sl-list li').each(function () {
			$(this).draggable("option", "disabled", true);
		});
		isLocked = true;
	}

	function enableOptionItems() {
		if (isLocked) {
			var listTemplates = $(".list-template");
			$('#list-container-items .sl-list li').each(function () {
				var id = $(this).attr('data-id');
				var item = listTemplates.find("[data-id=" + id + "]");
				if (item.length == 1) {
					$(this).draggable("option", "disabled", true);
				} else {
					$(this).draggable("option", "disabled", false);
				}
			});
			isLocked = false;
		}
	}

	function initRecordToolsMenu() {
		// mylists-menu drop menus

		var clickHandler = "click";

		if ('ontouchstart' in document.documentElement) {
			clickHandler = "touchstart";
		}

		$("#mylists-menu .drop")
		//	.bind("click", function () {
		//	var oThis = $(this);
		//	if (oThis.hasClass("drop-hover")) {
		//		oThis.removeClass("drop-hover");
		//	} else {
		//		oThis.addClass("drop-hover");
		//	}
		//})
		.bind("focusin mouseenter", function () {
			$("#mylists-menu .drop").removeClass("drop-hover");
			$(this).addClass("drop-hover");
			return false;
		})
		.bind("focusout mouseleave", function () {
			$(this).removeClass("drop-hover");
		});

		//close the mini menus on touch-out
		//$(document).bind("touchend", function (e) {
		//	$(".drop").not($(e.target).closest("#mylists-menu .drop")).removeClass("drop-hover");
		//});

		//class the first
		$("#mylists-menu .drop li:first-child").addClass("first-child");
	}

	function showListTemplate() {
		$('#customListHidden').children().appendTo($('#listtemplate'));
		$('#listtemplate').show();
	}

	function hideListTemplate() {
		var listtemplate = $('#listtemplate');
		//listtemplate.children().remove();
		listtemplate.hide();
	}

	function initMyListDropdown() {
		initRecordToolsMenu();
		$("#TemplateKey").select2();

		$('#createCustomTemplate1').click(function () {

			showListTemplate();
			TssMylist.reinintRadioButtons();
			newlistTemplate();
			//updateOptionsCount();
			$("#submitBtnPanel").show();

			TssMylist.initListFilter();
		});
	}

	function initSearch() {

		$(settings.vars.dynamicSearchInput).catcomplete({
			source: function (request, response) {
				$.ajax({
					type: 'POST',
					url: settings.urls.listDynamicSearch,
					dataType: "html",
					data: {
						search: request.term,
						type: $("#list-main-area ul.vert-menu a[data-list-id].active").closest('ul').data('group-id'),
						existIds: $('#existItemsIds').val()
					},
					success: function (result) {
						var html = $(result);
						html.find("a").each(function () {
							var element = $(this);
							var item = {
								value: element.find("span.label").text(),
								label: element.find("span.label").text(),
								href: element.attr("href")
							};
							element.parent("li").data("item.autocomplete", item);
						});
						var type = html.find("input#DominantCategory").val();
						if (type != undefined)
							$(settings.vars.dynamicSearchInput).siblings("#type").val(type);
						response(html.find("div.suggest").highlight(request.term).end());

						html.find("a.ui-list-dynamic-search").click(function (event) {
							var $target = $(event.target);

							if ($target.is("input[data-item-id]")) {
								var currentUrl = window.location.href;
								try {
									AjaxHelper.post(settings.urls.addItemToList, { listId: $("#list-main-area ul.vert-menu a[data-list-id].active").data('list-id'), itemId: $target.data('item-id') }, function (data) {
										if (!!data) {
											alert(data);
										} else {
											setTimeout(function() {
												window.location.href = currentUrl;
												window.location.reload();
											}, 3000);
											
										}
									}, null, {
										nohash: true, errorCallBack: function (message) { refreshLists(message); }
									});
								} catch (e) {
									alert(e.message);
								}
								return false;
							}

							return true;
						});
					}
				});
			},
			minLength: 2,
			open: function () {
				$(this).removeClass("ui-corner-all").addClass("ui-corner-top");
			},
			close: function () {
				$(this).removeClass("ui-corner-top").addClass("ui-corner-all");
			},
			select: function (event, ui) {
				window.location.href = ui.item.href;
			}
		});

		$(settings.vars.dynamicSearchInput).focus(function () {
			if (!!$(settings.vars.dynamicSearchInput).val()) {
				$(this).catcomplete(settings.vars.dynamicSearchInput.substring(1), this.value);
			}
		});
		initMyListDropdown();
	}

	function updateListSection(sender, emulate) {
		var id = $(sender).attr("data-list-id");

		$("#main").loadAuthorized(settings.urls.viewList, { id: id, section: 'list' + id }, function () {
			initExpander();
			hideListTemplate();
			initMyListDropdown();
			updateNavigationList(sender);
			initSearch();
		}, { nohash: false, errorCallBack: function (message) { refreshLists(message); } }, emulate);

		// fix Defect #229 - TSS: Favicon work incorrect. for same brouser
		//var link = document.createElement('link');
		//link.type = 'image/x-icon';
		//link.rel = 'shortcut icon';
		//link.href = '/favicon.ico?v=15';
		//document.getElementsByTagName('head')[0].appendChild(link);
	}

	function refreshLists(message) {
		alert(message);
		$("#editlist").empty()
		$("#list-main-area").loadAuthorized(settings.urls.refreshLists, { id: $("#ListId").val() }, function () {
			hideListTemplate();
			initVertMenu();
			initExpander();
			initMyListDropdown();
			TssMylist.initListFilter();
			initSearch();
			$("#listtemplate").find(".custom-lists").hide();
		}, { nohash: true });
	}

	function newlistTemplate() {
		$('#customTemplateCancel').die("click").live("click", function () {
			hideListTemplate();
			//$("#list-main-area").loadAuthorized(settings.urls.refreshLists, { id: $("#ListId").val() });
			//TssMylist.initListFilter();
		});

		$(settings.vars.customTemplatePreview).die("click").live("click", function () {
			showCustomPreviewDialog();
		});

		$('#customTemplateSave').die("click").live("click", function () {
			if ($(".list-template li.sl-item").length > 8) {
				alert("Maximum of 8 Template items allowed.");
				//TssMylist.initListFilter();
				return false;
			}
			var form = $(this).closest("form");
			var projType = TssMylist.validateSaveSetting();

			if (!projType) {
				alert("Select project type");
			} else {
				if (form.valid() && projType) {
					$("#listtemplate").find(".custom-lists").show();
					window.scrollTo(0, 0);
					$('#listtemplate').loadAuthorized(settings.urls.customTemplateSave, { id: $("#ListId").val(), RecordGroupType: $(".mylist-type input:checked").val(), TemplateName: $("#TemplateName").val(), TemplateSchema: $("#TemplateSchema").val(), CustomTemplateId: $("#CustomTemplateId").val(), ProjectType: $(".list-proj-type input:checked").val() }, function () {
						if (settings.urls.currentCustomUrl == '#') {
							window.setTimeout(function () {
								$("#list-main-area").loadAuthorized(settings.urls.refreshLists, { id: $("#ListId").val() }, function () {
									hideListTemplate();
									initVertMenu();
									initExpander();
									initMyListDropdown();
									TssMylist.initListFilter();
									initSearch();
									$("#listtemplate").find(".custom-lists").hide();
								}, { nohash: true });
							}, 2000);
						} else {
							hideListTemplate();
							window.location.href = settings.urls.currentCustomUrl;
						}
					}, { nohash: true });
				} else {
					$("#validationSummary").show();
				}
			}
			return true;
		});
		//updateOptionsCount();




		var $options = $('.list-options .sl-list');
		var $template = $('.list-template .sl-list');

		$('li', $options).draggable({
			containment: $(".custom-lists"),
			cursor: "auto",
			connectToSortable: ".connected",
			placeholder: "sl-placeholder",
			appendTo: ".custom-lists",
			items: "li:not(.sl-persistent)",
			helper: "clone",
			revert: "invalid",
			zIndex: 99999
		}).addTouch();

		$template.droppable({
			accept: ".list-options .sl-list li",
			tolerance: 'pointer',
			hoverClass: 'dropHover',
			handle: 'sl-handle',
		}).sortable({
			connectWith: ".connected",
			placeholder: "sl-placeholder",
			items: "li:not(.sl-persistent)",
			revert: true,
			update: function (event, ui) {
				var id = $(ui.item).attr("data-id");
				$(".list-options li[data-id=" + id + "]").removeClass('ui-draggable').addClass("ui-state-disabled").draggable("option", "disabled", true);
				//$(".list-options li[data-id=" + id + "]").hide();
				$(ui.item).removeClass("ui-draggable").find('.sl-handle').after('<button class="delete"><span class="tool tool-close" title="remove"></span></button>').end();
				updateOptionsCount();
			}
		});

		$(".list-template li .delete").die("click").live("click", function () {
			var iD = $(this).parent("li").attr("data-id");
			$(this).parent("li").remove();
			$("#list-container-items").find("li[data-id=" + iD + "]").removeClass('ui-state-disabled').addClass('ui-draggable').draggable("option", "disabled", false).end()
					.find("li[data-id=" + iD + "]").show();
			updateOptionsCount();
		});

		$(".sl-persistent").sortable("disabled");
		$(".sl-list li").disableSelection();

		//function expandAll() {
		//	$(".list-options > .list-container h3").unbind('click.collapse');
		//	$(".list-options > .list-container h3").removeClass('ui-state-default').addClass('ui-accordion-header-active ui-state-active').find("> .ui-icon").removeClass('ui-icon-triangle-1-e').addClass('ui-icon-triangle-1-s').end().closest('h3').next('div').addClass("ui-accordion-content-active").css("display", "block").show().end();
		//	$('.collapse').text('collapse all sections').unbind('click').bind('click', collapseAll);
		//}

		//function collapseAll() {
		//	$(".list-options > .list-container h3").removeClass('ui-accordion-header-active ui-state-active').addClass("ui-state-default").removeClass('ui-corner-top ui-corner-bottom').find("> .ui-icon").removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e').end().closest('h3').next('div').removeClass("ui-accordion-content-active").css("display", "none").hide().end();
		//	//$('.collapse').text('expand all sections').unbind('click').bind('click', expandAll);
		//}

		//if (!$(".list-options > .list-container >h3>span").hasClass('ui-icon-triangle-1-s')) {
		//	$(".list-options > .list-container").multiAccordion();
		//}
		//$('.collapse').click(collapseAll);
	}

	function showCustomPreviewDialog() {
		$(settings.vars.customTemplatePreviewDialog).remove();

		var dialog = $('<div></div>').hide().appendTo('body');
		dialog.attr('id', settings.vars.customTemplatePreviewDialog.replace("#", ""));

		$(settings.vars.customTemplatePreviewDialog).loadAuthorized(settings.urls.customTemplatePreview, { type: $(".mylist-type input:checked").val(), templateSchema: $("#TemplateSchema").val() }, function () {
			$("#teplateViewResult a").attr("href", "javascript:void(0)");

			dialog.dialog({
				modal: true,
				width: 1000,
				maxWidth: 1000,
				position: ['center', 'center'],
				resizable: false,
				draggable: false,
				dialogClass: 'tssprint',
				show: "blind",
				zIndex: 9999,
				title: "List Preview (Sample Data)",
				overlay: {
					backgroundColor: '#000',
					opacity: 0.8
				},
				close: function () {
					$(this).empty();
				}
			});
		});
	}

	function emulateSectionUpdate() {
		var listId = 0;
		var listSender = $('a[data-list-id=0]');
		var firstpos = window.location.href.indexOf('section-list');
		if (firstpos != -1) {
			var endpos = window.location.href.indexOf('&', firstpos + 12);
			if (endpos == -1)
				endpos = window.location.href.indexOf('_', firstpos + 12);
			listId = (endpos == -1) ? window.location.href.substr(firstpos + 12) : window.location.href.substr(firstpos + 12, endpos - (firstpos + 12));
			listSender = $('a[data-list-id=' + listId + ']');
		}

		var templateValue = "";
		firstpos = window.location.href.indexOf('template');
		if (firstpos != -1) {
			endpos = window.location.href.indexOf('&', firstpos + 8);
			if (endpos == -1)
				endpos = window.location.href.indexOf('_', firstpos + 8);
			templateValue = (endpos == -1) ? window.location.href.substr(firstpos + 8) : window.location.href.substr(firstpos + 8, endpos - (firstpos + 8));
		}

		var sortBy = "";
		firstpos = window.location.href.indexOf('sortBy');
		if (firstpos != -1) {
			endpos = window.location.href.indexOf('&', firstpos + 6);
			if (endpos == -1)
				endpos = window.location.href.indexOf('_', firstpos + 6);
			sortBy = (endpos == -1) ? window.location.href.substr(firstpos + 6) : window.location.href.substr(firstpos + 6, endpos - (firstpos + 6));
		}

		if ($(listSender).length > 0) {
			var sectionStr = 'list' + listId;

			if (templateValue != "")
				sectionStr = sectionStr + '_template' + templateValue;
			if (sortBy != "")
				sectionStr = sectionStr + '_sortBy' + sortBy;
			window.location.hash = '';
			$("#main").loadAuthorized(settings.urls.viewList, { id: listId, type: templateValue, page: $("#Page").val(), sortBy: sortBy, section: sectionStr }, function () {
				initExpander();
				updateNavigationList(listSender);
				initSearch();
			}, { nohash: false });
		}
	}

	function updateNavigationList(sender) {
		$("#list-main-area ul.vert-menu a[data-list-id]").removeClass("active");
		$(sender).addClass("active");
		var menuItem = $(sender).closest('li[data-section]').find('a:first');
		if (menuItem.hasClass('active') == false) {
			menuItem.click();
		}
	}

	function initEditList(id, editbuton) {
		var listcontainer = $("div#edit-list-" + id);
		listcontainer.find("#list-edit-cancel").die("click").live("click", function () {
			listcontainer.slideUp('slow', function () { listcontainer.remove(); });
			editbuton.show();
		});

		listcontainer.find("#list-edit-save").die("click").live("click", function () {
			editList(listcontainer, id);
		});

		listcontainer.find('form').die("keypress").live("keypress", function (event) {
			if (event.which == 13) {
				event.preventDefault();
				editList(listcontainer, id);
				return false;
			}
			return true;
		});

		if (jQuery.validator)
			jQuery.validator.unobtrusive.parse('body');

		$('#pEditThisListTitle input').keypress(function (event) {
			if (event.which == '13') {
				event.preventDefault();
				editList(listcontainer, id);
			}
		});
	}

	function editList(listcontainer, id) {
		listcontainer.loadAuthorized(settings.urls.editListSave, {
			id: id, Name: listcontainer.find("#Name").val(), Description: listcontainer.find("#Description").val()
		}, function () {
			listcontainer.find("div.itemeditor").hide();
			window.setTimeout(function () {
				$("#list-main-area").loadAuthorized(settings.urls.refreshLists, { id: id }, function () {
					listcontainer.slideUp('slow', function () { listcontainer.remove(); });
					initVertMenu();
					initExpander();
					hideListTemplate();
					initMyListDropdown();
				}, { nohash: true });
			}, 2000);
		}, { nohash: true }, false);
	}

	function deleteList(id, type) {
		if (AjaxHelper.confirm("Do you want to delete the list?"))
			$("#list-main-area").loadAuthorized(settings.urls.deleteList, { id: id, type: type }, function () { initVertMenu(); initExpander(); initMyListDropdown(); }, { nohash: true }, false);
	}

	function initAddListItems(parameters) {
		$.extend(true, settings, parameters);
		$("#btnAddToList").die("click").live("click", function () {
			saveList();
		});

		$("#btnGoToList").die("click").live("click", function () {
			window.location.href = settings.urls.goToList;
		});

		$('#newListName input').keypress(function (event) {
			if (event.which == '13') {
				event.preventDefault();
				saveList();
			}
		});
	}

	function saveList() {
		var form = $("#btnAddToList").closest("form");
		if (form.valid()) {
			var recordIds = new Array();
			$("input.checkme:checked").each(function () { recordIds.push(this.value); });
			var formData = { recordIds: recordIds };
			$.each($(form).serializeArray(), function () {
				formData[this.name] = this.value;
			});
			$("#addlist").loadAuthorized(settings.urls.saveList, formData, function () {
				$("input.checkme:checked").removeAttr("checked"); //uncheck grid contents
				$("input.checkAll:checked").removeAttr("checked"); //uncheck header check box
			}, { nohash: true, traditional: true });
		}
	}

	function getNoteId(object) {
		return $(object).parents('section').attr("note-id");
	}

	function updateNotesSection() {
		AjaxHelper.post(settings.urls.getNotes, { id: $('#RecordId').val() }, function (result) { $('#MyNotesSummary').replaceWith(result); }, null, { nohash: true });
	}

	function updateNotesTitle(notesCount) {
		$('#addNoteToggler').html(notesCount == 0 ? 'Add Note' : 'Add/View Notes (' + notesCount + ')');
	}

	function initAddNote(parameters) {
		$.extend(true, settings, parameters);
		settings.vars.overlay = $(settings.vars.overlayId);
		settings.vars.list = $(settings.vars.overlayId).find(settings.vars.listId);
		settings.vars.newListName = $(settings.vars.overlayId).find(settings.vars.newListNameId);
		settings.vars.newListDesc = $(settings.vars.overlayId).find(settings.vars.newListDescId);

		$(settings.vars.btnAddToNote).click(function () {
			addToNote();
		});

		$("section.s ul li.toolDelete a").die("click").live("click", function () {
			if (AjaxHelper.confirm("Do you want to delete the note?")) {
				$(settings.vars.currentNotes).loadAuthorized(settings.urls.deleteCurrentNote, { id: getNoteId(this), recordId: $('#RecordId').val() }, function () {
					updateNotesSection();
					updateNotesTitle(parseInt($('#CurrentNotesCount').val()));
				}, { nohash: true });
			}
		});

		$("section.s span.checks input").die("click").live("click", function () {
			var name = $(this).attr('name');
			var url;
			if (name.indexOf("Printable") != -1) {
				url = settings.urls.updateCurrentNotePrintable;
			}
			else {
				url = settings.urls.updateCurrentNoteImportable;
			}
			AjaxHelper.post(url, { id: getNoteId(this), selected: $(this).is(':checked') }, function () { }, 'html', { nohash: true }, false);
		});

		$('#pNewNoteName input').keypress(function (event) {
			if (event.which == '13') {
				event.preventDefault();
				addToNote();
			}
		});
	}

	function addToNote() {
		var form = $(settings.vars.btnAddToNote).closest("form");
		if (form.valid()) {
			$(settings.vars.overlay).loadAuthorized(settings.urls.saveNote, $(form).serializeArray(), function () {
				updateNotesSection();
				$(settings.vars.overlayId).slideUp(1000);
				updateNotesTitle(parseInt($('#CurrentNotesCount').val()));
			});
		}
	}

	function initNotes(parameters) {
		$.extend(true, settings, parameters);
		$("#list-navigation li[data-section] a").die("click").live("click", function () {
			$(this).parents().find('.cat li.active').removeClass('active').end().end()
			.parent('li').addClass('active');
			var section = $(this).parent("li").attr("data-section");
			if (section == "list-all") {
				$("#list-all section, #list-all>header").show();
			} else {
				$("#list-all>header").hide();
				$("#list-all section[id]").each(function () {
					$(this).toggle(this.id == section);
				});
			}
		});
		$("#list-all li.toolDelete a").die("click").live("click", function () {
			deleteNote($(this).attr('note-id'), $(this).parent("section"));
		});

		$("#list-all li.toolEdit a").die("click").live("click", function () {
			var id = $(this).attr('note-id');
			var editContainer = $("<div class='edit-note' id='edit-note-" + id + "'></div>");
			$(this).closest("div.s.clearfix").parent().append(editContainer);
			var editbuton = $(this).hide();
			editContainer.loadAuthorized(settings.urls.editNote, { id: id }, function () { initEditNote(id, editbuton); }, { nohash: true });
		});
	}

	function initEditNote(id, editbuton) {
		var listcontainer = $("div#edit-note-" + id);
		listcontainer.find("#note-edit-cancel").die("click").live("click", function () {
			listcontainer.remove();
			editbuton.show();
		});
		listcontainer.find("#note-edit-save").die("click").live("click", function () {
			editNote(listcontainer);
		});
		if (jQuery.validator)
			jQuery.validator.unobtrusive.parse('body');

		$('#pEditNoteTitle input').keypress(function (event) {
			if (event.which == '13') {
				event.preventDefault();
				editNote(listcontainer);
			}
		});
	}

	function editNote(listcontainer) {
		var form = $("#note-edit-save").closest("form");
		if (form.valid()) {
			listcontainer.loadAuthorized(settings.urls.editNoteSave, $(form).serializeArray(), function () {
				$("#note-main-area").loadAuthorized(settings.urls.refreshNotes, {}, function () {
					TssParticipant.bindToolTip();
				}, { nohash: true });
			}, { nohash: true }, false);
		}
	}

	function deleteNote(id) {
		if (confirm("Do you want to delete the note?"))
			$("#note-main-area").loadAuthorized(settings.urls.deleteNote, { id: id }, function () {
				TssParticipant.bindToolTip();
			}, { nohash: true }, false);
	}

	return {
		initAddList: initAddList,
		initLists: initLists,
		initAddListItems: initAddListItems,
		newlistTemplate: newlistTemplate,
		initAddNote: initAddNote,
		initNotes: initNotes,
		updateOptionsCount: updateOptionsCount,
		tssWatchList: tssWatchList,
		tssContactUs: tssContactUs,
		tssSearches: tssSearches,
		tssUpdateRecord: tssUpdateRecord,
		updateNotesSection: updateNotesSection,
		updateNotesTitle: updateNotesTitle,
		settings: settings,
		initSearch: initSearch,
		updateListSortButtons: updateListSortButtons,
		emulateSectionUpdate: emulateSectionUpdate
	};
}();
