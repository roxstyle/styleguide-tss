var SiteSettings = {
	refreshOnResizing: false,
	urls: {
		loginPath: ""
	}
};


var AjaxHelper = function () {
	var requests = [];
	var request = 0;
	function send(url, data, callback, type, defaultDataType, defaultMethod, params) {
		var paramObj = typeof (data) == 'object' ? data : {};
		var callBackFunc = typeof (callback) == 'function' ? callback : (typeof (data) == 'function' ? data : null);
		var errorCallBackFunc = (params != undefined && params.errorCallBack != undefined && typeof (params.errorCallBack) == 'function') ? params.errorCallBack : null;
		var dataType = typeof (type) == 'string' ? type : (typeof (callback) == 'string' ? callback : defaultDataType);
		var isBlockUi = true;
		var ajaxParams = {
			type: defaultMethod,
			url: url,
			cache: false,
			data: paramObj,
			success: function (result, textStatus, jqXhr) {
				if (result != 'Unauthorized' &&
					result != 'SessionExpired' &&
					((!!result.SessionId) ||
						((!result.SessionId) &&
							(typeof (result) != 'string' || result.indexOf('id="u-login"') == -1)))) {

					var status = "";
					var message = "";
					try {
						var jsonRes = jQuery.parseJSON(result);
						if (jsonRes.Status != "undefined")
							status = jsonRes.Status;
						message = jsonRes.Message;
					}
					catch (e) { }
					if (status == "Failed") {
						{
							if (errorCallBackFunc != null) {
								errorCallBackFunc(message);
							} else {
								ShowErrorTooltip("Request Error", message);
							}
						}
					} else {
						if (callBackFunc != null)
							callBackFunc(result, textStatus, jqXhr);
					}
				}
				else if (SiteSettings.urls.loginPath != window.location.pathname) {
					window.location.href = result == 'SessionExpired' ? window.sessionExpiredPath : SiteSettings.urls.loginPath + '?ReturnUrl=' + encodeURIComponent(window.location.pathname);
				}

				hideProgress();
			},
			error: function (jqXhr, textStatus, errorThrown) {

				//check whether the request is actually completed and not aborted
				if (jqXhr.status == 0 || jqXhr.readyState != 4) {
					hideProgress();
					return;
				}

				hideProgress();

				var errorMessage = "";

				if (textStatus != null && textStatus != "") {
					errorMessage = textStatus;
				}
				if (errorThrown != null && errorThrown != "") {
					errorMessage = errorThrown;
				}
				if (jqXhr.responseText != null && jqXhr.responseText != "") {
					try {
						var jsonRes = jQuery.parseJSON(jqXhr.responseText);
						if (jsonRes.message != "undefined" && jsonRes.message != "") {
							errorMessage = jsonRes.message;
						}
					} catch (e) {
						errorMessage = jqXhr.responseText;
					}
				}

				if (errorCallBackFunc != null)
					errorCallBackFunc();

				ShowErrorTooltip("Request Error", errorMessage);
			},
			dataType: dataType
		};
		$.extend(true, ajaxParams, params);

		if (params != undefined)
			isBlockUi = params.isBlockUi;

		showProgress(isBlockUi);
		isInProfress = true;
		setTimeout(function () {
			$.ajax(ajaxParams);
		}, 50);
	}

	function post(url, data, callback, type, params, emulate) {
		hashSend(url, data, callback, type, 'html', 'POST', params, emulate);
	}

	function get(url, data, callback, type, params, emulate) {
		hashSend(url, data, callback, type, 'html', 'GET', params, emulate);
	}

	function hashSend(url, data, callback, type, defaultDataType, defaultMethod, params, emulate) {
		if (!!params && !!params.nohash) {
			send(url, data, callback, type, defaultDataType, defaultMethod, params);
			return;
		}
		var param = { url: url, data: data, callback: callback, type: type, defaultDataType: defaultDataType, defaultMethod: defaultMethod, params: params, emulate: emulate };
		if (!!data.section) {
			var requestName = 'section-' + data.section;
			requests[requestName] = param;
			if (!emulate) {
				$.history.load(requestName);
			} else {
				requests[''] = param;
			}
		} else {
			request++;
			requests["link-" + request] = param;
			$.history.load("link-" + request);
		}
	}

	function sendRequest(requestNr) {
		var param = requests[requestNr];

		if (!!param) {
			if (!param.emulate) {
				send(param.url, param.data, param.callback, param.type, param.defaultDataType, param.defaultMethod, param.params);
			} else {
				param.emulate = false;
				requests[requestNr] = param;
			}
		}
	}

	var loadProgess = "#loadingDiv";
	var isInProfress = false;
	var ajaxCount = 0;

	function showProgress(isBlockUi) {
		ajaxCount++;
		if (!isInProfress) {
			$(loadProgess).fadeIn(1000, function () {
				if (!isInProfress) hideProgress();
			});
			if (isBlockUi != false)
				$.blockUI({ message: '', baseZ: 10000, overlayCSS: { opacity: 0 } });
		}
	}

	function hideProgress(obj) {
		if (ajaxCount > 0) {
			ajaxCount--;
		}
		if (ajaxCount == 0) {
			$(loadProgess).hide();
			$.unblockUI();
			isInProfress = false;
			if (obj != null) {
				var control = $(obj);
				control.removeAttr("disabled");
				control.attr("style", "background: #8b8b07;");
			}
		}
	}

	function isValid(sender) {
		var validationSummary = sender.find("#validationSummary");
		if ($(validationSummary) && $(validationSummary).html() != null && $(validationSummary).html() != "")
			return false;
		return true;
	}

	function confirm(text) {
		return window.confirm(text);
	}

	return {
		post: post,
		get: get,
		send: sendRequest,
		toolTip: send,
		isValid: isValid,
		confirm: confirm
	};
}();
jQuery.fn.sortElements = (function () {
	var sort = [].sort;
	return function (comparator, getSortable) {
		getSortable = getSortable || function () { return this; };
		var placements = this.map(function () {
			var sortElement = getSortable.call(this),
			parentNode = sortElement.parentNode,
				nextSibling = parentNode.insertBefore(
					document.createTextNode(''),
					sortElement.nextSibling
				);
			return function () {
				if (parentNode === this) {
					throw new Error(
						"You can't sort elements if any one is a descendant of another."
					);
				}
				parentNode.insertBefore(this, nextSibling);
				parentNode.removeChild(nextSibling);
			};
		});
		return sort.call(this, comparator).each(function (i) {
			placements[i].call(getSortable.call(this));
		});
	};
})();

function CheckLocationHash() {
	if (window.location.hash != "" && window.location.hash != "#" && window.location.hash != "#dashboard" && window.location.hash.indexOf("link-") == -1) {
		setTimeout(function () {
			$('.collapsible-content #' + window.location.hash.replace('#section-', '').replace('medias', 'galleries').replace('videos', 'galleries')).trigger("loadHash");
			window.location.href = window.location.href.replace('medias', 'galleries').replace('videos', 'galleries');
		}, 300);
	}
}

jQuery(document).ready(function ($) {
	CheckLocationHash();

	$.history.init(function (url) {
		AjaxHelper.send(url);
	});

	$('ul.menu li a').each(function () {
		$(this).addTouch();
	});

});


(function ($) {
	$.fn.loadAuthorized = function (url, data, callBack, params, emulate) {
		var element = this;
		if (data && typeof (data) == 'object')
			AjaxHelper.post(url, data, function (result) {
				if (!params || !(params.updateOuter)) {
					element.html(result);
				} else { $(result).insertBefore(element); element.remove(); }
				if (jQuery.validator)
					jQuery.validator.unobtrusive.parse('body');
				UIAccessibility(element);
				if (typeof (callBack) == 'function' && AjaxHelper.isValid(element)) callBack(result);
				if (params != null && params.ajaxCallback && typeof (params.ajaxCallback) == 'function') { params.ajaxCallback(); }
			}, 'html', params, emulate);
		else
			AjaxHelper.get(url, data, function (result) {
				if (!!params && !params.updateOuter) {
					element.html(result);
				} else { $(result).insertBefore(element); element.remove(); }

				if (jQuery.validator)
					jQuery.validator.unobtrusive.parse('body');
				UIAccessibility(element);
				if (typeof (callBack) == 'function' && AjaxHelper.isValid(element)) callBack(result);
				if (params != null && params.ajaxCallback && typeof (params.ajaxCallback) == 'function') { params.ajaxCallback(); }
			}, 'html', params, emulate);
	};
})(jQuery);

function TrackWindowSize() {
	var getCurrentWindowSize = function () {
		var width = $(window).width();
		return width <= 480 ? 480 : (width <= 767 ? 768 : 992);
	};
	window.loadedWidth = getCurrentWindowSize();

	$(window).unbind('resizeEnd').bind('resizeEnd', function () {
		var currentWidth = getCurrentWindowSize();
		if (currentWidth != window.loadedWidth && SiteSettings.refreshOnResizing) {
			window.loadedWidth = currentWidth;
			//$(window).unbind('resize');
			$("div.content").loadAuthorized(
				location.href,
				{
					swidth: currentWidth,
					hashValue: window.location.hash
				},
				function () {
					TssLayout.init();
					html5support();
					TrackWindowSize();
					splitLists();
					TSSHint();
					TssParticipant.bindToolTip();
					CheckLocationHash();
				}, { nohash: true });
		}
	});

	$(window).bind('load', function () {
		var currentWidth = getCurrentWindowSize();
		//if (currentWidth != window.loadedWidth) {
		window.loadedWidth = currentWidth + 1;
		$(window).unbind('load');
		/*$("div.content").loadAuthorized(
			location.href,
			{ swidth: currentWidth },
			null, { nohash: true });*/
		//}
	});

	function initTriggerResize() {
		if (this.resizeTO) clearTimeout(this.resizeTO);
		this.resizeTO = setTimeout(function () {
			$(this).trigger('resizeEnd');
		}, 500);
	}

	$(window).unbind('resize', initTriggerResize).bind('resize', initTriggerResize);

}

function findAnhor(event) {
	if (event.target == null) return null;
	if (event.target.tagName == "A") return $(event.target);
	if (event.target.tagName == "SPAN") return $(event.target).parent("div.suggest").parent("a.ui-corner-all");
	if (!!(event.originalEvent)) return findAnhor(event.originalEvent);
	return null;
}

function AddCusomValidation() {
	jQuery.validator.addMethod("phone", function (pnumber) {
		if (!pnumber) return true;
		var stripped = pnumber.replace(/[\(\)\.\-\ ]/g, '');
		if (isNaN(parseInt(stripped)) || !(stripped.length > 9)) {
			return false;
		} else {
			return true;
		}
	}, "Please specify a valid phone number");

	jQuery.validator.unobtrusive.adapters.add("phone", [],
		function (options) {
			options.rules['phone'] = {};
			options.messages['phone'] = options.message;
		});


	jQuery.validator.addMethod("requiredif", function (value, element, params) {
		if ($(element).val() != '' && !(!!(params.wrong) && value == params.wrong)) return true;
		var $other = $('#' + params.other);
		var otherVal = (!!($other.attr('type')) && ($other.attr('type').toUpperCase() == "CHECKBOX")) ?
		($other.attr("checked") ? "true" : "false") : $other.val();
		return params.comp == 'isequalto' ? (jQuery.inArray(otherVal, params.values) == -1)
		: (jQuery.inArray(otherVal, params.values) != -1);
	});

	jQuery.validator.unobtrusive.adapters.add("requiredif", ["other", "comp", "values", "wrong"],
		function (options) {
			options.rules['requiredif'] = {
				other: options.params.other,
				comp: options.params.comp,
				values: jQuery.parseJSON(options.params.values),
				wrong: options.params.wrong
			};
			options.messages['requiredif'] = options.message;
		});

	jQuery.validator.addMethod("compareto", function (value, element, params) {
		var elVal = $(element).val();
		if (elVal == '') return true;
		var otherVal = $('#' + params.other).val();
		if (otherVal == '') return true;
		switch (params.comp) {
			case "morethan": return parseInt(otherVal) <= parseInt(elVal);
			case "lessthan": return parseInt(otherVal) >= parseInt(elVal);
			default: return otherVal == elVal;
		}
	});

	jQuery.validator.unobtrusive.adapters.add("compareto", ["other", "comp"],
	function (options) {
		options.rules['compareto'] = {
			other: options.params.other,
			comp: options.params.comp
		};
		options.messages['compareto'] = options.message;
	});
	$(window).load(function () {
		$('.flexslider').flexslider({
			//animation: "slide",
			controlsContainer: ".flex-container",
			slideshow: true
		});
	});
}
AddCusomValidation();

function ShowErrorTooltip(titleText, message) {
	var hideTimeout = 3000; //ms
	var hideErrorPopup = function (api) {
		setTimeout(function () {
			if ((api.inFocus == 'undefined' || !api.inFocus) &&
				(api.clicked == 'undefined' || !api.clicked)) {
				api.hide();
			}
		}, hideTimeout);
	};

	$('header[role="banner"]')
		.removeData('qtip')
		.qtip({
			content: {
				text: message,
				title: {
					text: titleText,
					button: true
				}
			},
			position: {
				my: 'top right', // Use the corner...
				at: 'bottom right' // ...and opposite corner
			},
			show: {
				event: false, // Don't specify a show event...
				ready: true // ... but show the tooltip when ready
			},
			hide: false, // Don't specify a hide event either!
			style: {
				classes: 'ui-tooltip-shadow ui-tooltip-red tss-error-tooltip',
			},
			events: {
				render: function (event, api) {
					// Grab the tooltip element from the API elements object
					var tooltip = api.elements.tooltip;

					$(tooltip).mouseenter(function () {
						api.inFocus = true;
					});
					$(tooltip).mouseleave(function () {
						api.inFocus = false;
						hideErrorPopup(api);
					});
					$(tooltip).click(function () {
						api.inFocus = true;
						api.clicked = true;
					});
				},
				show: function (event, api) {
					hideErrorPopup(api);
				}
			}
		});
}

function toolsNavigateToTop() {
	$("footer a[data-action=up-to-top]").click(function () {
		window.scrollTo(0, 0);
	});
}