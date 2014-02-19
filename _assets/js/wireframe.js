//the following functions are for wireframe

//default
function defaultLogin() {
	$("#u-pwrecover").hide();
	$("#u-reconfirm").hide();
	$("#u-error").hide();
}
defaultLogin();


// financial international boxoffice filter by country
function defaultIntlBO() {
	$('#tabs-p-fin-intl-box .help-block').show();
	//$('#tabs-p-fin-intl-box #p-fin-intlbox').hide();
	$('#tabs-p-fin-intl-box p.key').hide();
}
defaultIntlBO() ;

function sortIntlBO() {
	$("body.person #territoryid").change(function() {
		var sel = $("#territoryid option:selected").val();
		if (sel === '0') {
			$('.help-block').show();
			$('#p-fin-intlbox').hide();
			$('#p-fin-intlbox-all').show();
			$('p.key').hide();
			return;
		}
		if (sel === '11') {
			$('.help-block').hide();
			$('#p-fin-intlbox').show();
			$('#p-fin-intlbox-all').hide();
			$('p.key').hide();
			return;
		}
		if (sel ==='12') {
			$('.help-block').hide();
			$('#p-fin-intlbox').show();
			$('#p-fin-intlbox-all').hide();
			$('p.key').hide();
			return;
		}
		else {
			$('.help-block').hide();
			$('#p-fin-intlbox').show();
			$('#p-fin-intlbox-all').hide();
			$('p.key').hide();
			return;
		}
	});
}

//$('.masthead').load('ajax/site-main-header.html');

//site header
function siteMainheader() {
	//studiosystem
	if ($('body').hasClass('tss')) {
		$.ajax({
				url: "ajax/site-main-header2.html",
				dataType: 'html',
				async: false,
				success: function (data) {
					$('header[role="banner"]').html(data);
				}
		});
	}
	//studiosystem cms
	if ($('body').hasClass('cms')) {
		$.ajax({
				url: "ajax/site-cms-header.html",
				dataType: 'html',
				async: false,
				success: function (data) {
					$('header[role="banner"]').html(data);
				}
		});
	}
	//nbcu cms
	if ($('body').hasClass('nbc-cms')) {
		$.ajax({
				url: "ajax/site-nbc-cms-header.html",
				dataType: 'html',
				async: false,
				success: function (data) {
					$('header[role="banner"]').html(data);
				}
		});
	}
	//nbcu whitelabel for studiosystem
	if ($('body').hasClass('nbc')) {
		$.ajax({
				url: "ajax/site-nbc-header.html",
				dataType: 'html',
				async: false,
				success: function (data) {
					$('header[role="banner"]').html(data);
				}
		});
	}
	if ($('body').hasClass('mh2')) {
		$.ajax({
				url: "ajax/site-main-header2.html",
				dataType: 'html',
				async: false,
				success: function (data) {
					$('header[role="banner"]').html(data);
				}
		});
	}
	if ($('body').hasClass('home')) {
		$.ajax({
				url: "ajax/site-main-header2.html",
				dataType: 'html',
				async: false,
				success: function (data) {
					$('header[role="banner"]').html(data);
				}
		});
	}
	if ($('.row').hasClass('sample-row') ) {
		$.ajax({
				url: "ajax/site-main-header2-logo.html",
				dataType: 'html',
				async: false,
				success: function (data) {
					$('header[role="banner"]').html(data);
				}
		});
	}
	//end
}
siteMainheader();


