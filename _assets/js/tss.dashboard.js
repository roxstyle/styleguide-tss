var TssDashboard = function () {
	var settings = {
		urls: {
			popularListsGroup: '#',
			trailers: '#',
			video: "#",
			refreshBodyUrl: "#",
			setNewFeaturesVisibility: "#",
		},
		elements: {
			videoLink: 'a[data-video-id]',
			player: '#playerholder',
			section: 'section.home-section',
			datepicker: '#',
			minYear: 1900,
			nowYear: 0,
			nowMonth: 0,
			reportDescription: "",
			chartFooter: "",
			cleanTitle: ""
		},
		vars: {
			video_container: '<div id="video_content" style="width:616px; height:360px"></div>'
		}
	};

	var elements = {
		newFeaturesSlider: null,
		popularListsSelector: null,
	};

	function init(parameters) {

		$.extend(true, settings, parameters);

		elements.popularListsSelector = $('#explore-lists ul.home-tabs-nav');

		if ($(window).width() > 480) {
			$("div.popular, div.trending").tabs({ alwaysScrollToTop: false });
		}


		var clickHandler = "click";

		if ('ontouchstart' in document.documentElement) {
			clickHandler = "touchstart";
		}

		$('a.popularListGroup').bind(clickHandler, function () {

			refreshPopularLists($(this).attr('data-id'));
		});

		//$(settings.elements.videoLink).die("click").live("click", function () {
		//	$(settings.elements.section).loadAuthorized(settings.urls.trailers, { mediaId: $(this).attr("data-video-id") }, function () { playVideo(id); });
		//});

		$("div.new-trailers a[data-video-id], ul li a[data-video-id]").each(function () {
			var id = $(this).attr("data-video-id");
			$(this).prettyPhoto({
				custom_markup: settings.vars.video_container,
				theme: 'light_square',
				default_width: 616,
				default_height: 344,
				changepicturecallback: function () {
					$("#video_content").loadAuthorized(settings.urls.video, {}, function () {
						TssParticipant.playVideo(id);
					}, { nohash: true });
				}
			});


			$(this).unbind('touchstart').bind('touchstart', function () {
				$(this).attr('touchmove', false);
			});

			$(this).unbind('touchmove').bind('touchmove', function () {
				$(this).attr('touchmove', true);
			});

			$(this).unbind('touchend').bind('touchend', function () {
				if ($(this).attr('touchmove') == "false") {
					var id = $(this).attr("data-video-id");
					playVideo(id);
				}
			});

		});

		$("div.news-caption a").each(function () {
			$(this).addTouch();
		});
	}

	function initNewFeaturesSlider(hideNewFeatures) {
		elements.newFeaturesSlider = $('#new-features .nf-slider');

		var sliderContainer = $('#link-toggle-features');
		sliderContainer
			.off()
			.click(function () {
				if (elements.newFeaturesSlider.hasClass('nf-open')) {
					hideSlider($(this));
				}

				if (elements.newFeaturesSlider.hasClass('nf-closed')) {
					showSlider($(this));
				}
			});

		if (hideNewFeatures != true) {
			showSlider(sliderContainer);
		}
	}

	function initPopularList(parameters) {
		$.extend(true, settings, parameters);

		$("table thead th div[data-sort], section.uscal table thead th div[data-sort]").die("click").live("click", function () {
			var sortBy = $("#sortBy");
			var isDesc = $("#isDesc");
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

			refreshPopularListBody({ page: 0, sortBy: sortBy.val(), isDesc: isDesc.val() });
		});

		$("div.pagination span.paginate_button").die("click").live("click", function () {
			var currentPage = $(this).attr("pageId");
			var sortBy = $("#sortBy").val();
			var isDesc = $("#isDesc").val();

			refreshPopularListBody({ page: currentPage, sortBy: sortBy, isDesc: isDesc });
		});
	}

	function initCalendar(parameters) {
		$.extend(true, settings, parameters);

		if (settings.elements.minYear > 0 && settings.elements.nowYear > 0 && settings.elements.nowMonth > 0) {
			var datepickerElement = $(settings.elements.datepicker);

			datepickerElement.datepicker({
				yearRange: settings.elements.minYear + ":" + (settings.elements.nowYear + 10),
				changeMonth: true,
				changeYear: true,
				showButtonPanel: false,
				monthNamesShort: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				defaultDate: settings.elements.nowMonth + "/01/" + settings.elements.nowYear,
				onChangeMonthYear: function (year, month) {
					var monthName = $(this).find("select.ui-datepicker-month [value=" + (month - 1) + "]").text();
					document.title = settings.elements.cleanTitle + monthName;
					var sortBy = $("#sortBy").val();
					var isDesc = $("#isDesc").val();

					refreshPopularListBody({ year: year, month: month, sortBy: sortBy, isDesc: isDesc });
				},
			});
		}

		$("div.pagination span.paginate_button").die("click").live("click", function () {
			var month = parseInt(datepickerElement.find("select.ui-datepicker-month option:selected").val()) + 1;
			var year = parseInt(datepickerElement.find("select.ui-datepicker-year option:selected").val());
			var sortBy = $("#sortBy").val();
			var isDesc = $("#isDesc").val();

			refreshPopularListBody({ year: year, month: month, page: $(this).attr("pageId"), sortBy: sortBy, isDesc: isDesc });
		});

		$("table thead th div[data-sort], section.uscal table thead th div[data-sort]").die("click").live("click", function () {
			var sortBy = $("#sortBy");
			var isDesc = $("#isDesc");
			var newsort = $(this).attr("data-sort");
			var month = parseInt(datepickerElement.find("select.ui-datepicker-month option:selected").val()) + 1;
			var year = parseInt(datepickerElement.find("select.ui-datepicker-year option:selected").val());
			if (newsort == sortBy.val()) {
				if (isDesc.val() == "False") {
					isDesc.val("True");
				} else {
					isDesc.val("False");
				}
			} else {
				sortBy.val(newsort);
			}

			refreshPopularListBody({ year: year, month: month, page: 0, sortBy: sortBy.val(), isDesc: isDesc.val() });
		});

	}

	function initPublishers(parameters) {
		$.extend(true, settings, parameters);

		$("select#State").change(function () {
			var stateId = $("#State option:selected").val();

			refreshPopularListBody({ stateId: stateId });
		});

		$("div.pagination span.paginate_button").die("click").live("click", function () {
			var stateId = $("#State option:selected").val();
			var sortBy = $("#sortBy").val();
			var isDesc = $("#isDesc").val();

			refreshPopularListBody({ stateId: stateId, page: $(this).attr("pageId"), sortBy: sortBy, isDesc: isDesc });
		});

		$("table thead th div[data-sort], section.uscal table thead th div[data-sort]").die("click").live("click", function () {
			var sortBy = $("#SortBy");
			var isDesc = $("#IsDesc");
			var newsort = $(this).attr("data-sort");
			var stateId = $("#State option:selected").val();
			if (newsort == sortBy.val()) {
				if (isDesc.val() == "False") {
					isDesc.val("True");
				} else {
					isDesc.val("False");
				}
			} else {
				sortBy.val(newsort);
			}

			refreshPopularListBody({ stateId: stateId, page: 0, sortBy: sortBy.val(), isDesc: isDesc.val() });
		});
	}

	function playVideo(id) {
		$(settings.elements.player).show();
		TssParticipant.playVideo(id);
	}

	function refreshPopularLists(groupId) {
		$('#explore-lists ul.home-tabs-content > li.active').loadAuthorized(
			settings.urls.popularListsGroup,
			{ groupId: groupId },
			function () {
				elements.popularListsSelector.find('a[data-id]').removeClass('active');
				elements.popularListsSelector.find('a[data-id="' + groupId + '"]').addClass('active');
			},
			{ nohash: true });
	}

	function refreshPopularListBody(parameters) {
		$('#pl-details-container').loadAuthorized(
			settings.urls.refreshBodyUrl,
			parameters,
			function () {
				TssParticipant.bindToolTip();
			},
			{ nohash: true, updateOuter: true });
	}

	function hideSlider(sliderButton) {
		$('.nf-arrow-next').fadeOut();
		$('.nf-arrow-prev').fadeOut();
		$('.nf-slider').cycle('pause');
		elements.newFeaturesSlider.slideUp(function () {
			sliderButton.html("Show New Features");
			elements.newFeaturesSlider.removeClass('nf-open').addClass('nf-closed');
		});
		AjaxHelper.post(settings.urls.setNewFeaturesVisibility, { hideNewFeatures: true }, null, null, { nohash: true });
	}

	function showSlider(sliderButton) {
		$('.nf-arrow-next').fadeIn();
		$('.nf-arrow-prev').fadeIn();
		var slider = $('ul.nf-slider');
		slider.cycle('reinit');
		slider.cycle('resume');
		$('div.nf-arrow-prev a').unbind("click").bind("click", function () {
			$('ul.nf-slider').cycle('prev');
		});
		$('div.nf-arrow-next a').unbind("click").bind("click", function () {
			$('ul.nf-slider').cycle('next');
		});

		elements.newFeaturesSlider.slideDown(function () {
			sliderButton.html("Hide New Features");
			elements.newFeaturesSlider.removeClass('nf-closed').addClass('nf-open');
		});
		AjaxHelper.post(settings.urls.setNewFeaturesVisibility, { hideNewFeatures: false }, null, null, { nohash: true });
	}

	function trackWindowSize() {
		$(window).die('resizeEnd').bind('resizeEnd', function () {
			$("li.cycle-slide-active div.nav-arrow-next a").click();
		});

		$(window).on("resize", function () {
			if (this.resizeTO) clearTimeout(this.resizeTO);
			this.resizeTO = setTimeout(function () {
				$(this).trigger('resizeEnd');
			}, 500);
		});
	}

	return {
		init: init,
		initNewFeaturesSlider: initNewFeaturesSlider,
		initPopularList: initPopularList,
		initCalendar: initCalendar,
		initPublishers: initPublishers,
		playVideo: playVideo,
		trackWindowSize: trackWindowSize
	};
}();