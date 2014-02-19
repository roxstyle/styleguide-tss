function loadPrint(path) {
	resetPrint();

	$.get(path, function(data) {

		//data = data.replace(/<script.*>.*<\/script>/ig,""); // Remove script tags
		//data = data.replace(/<\/?link.*>/ig,""); //Remove link tags
		//data = data.replace(/<\/?html.*>/ig,""); //Remove html tag
		//data = data.replace(/<\/?body.*>/ig,""); //Remove body tag
		//data = data.replace(/<\/?head.*>/ig,""); //Remove head tag
		//data = data.replace(/<\/?!doctype.*>/ig,""); //Remove doctype
		//data = data.replace(/<title.*>.*<\/title>/ig,""); // Remove title tags
		//data = data.replace(/<iframe(.+)src=(\"|\')(.+)(\"|\')>/ig, '<iframe$1src="'+'/'+section+'/'+'$3">');; // Change iframe src
		data = data.replace(/<img([^<>]+)src=(\"|\')([^\"\']+)(\"|\')([^<>]+)?>/ig, '<img$1src="'+'/'+section+'/'+'$3" $5/>');; // Change images src
		data = $.trim(data);

		//$('style.demo-style').remove();
		$('.tssprint').empty().html(data);
		$('#print-nav a').attr('href', path);

	});

}

function resetPrint() {
	$(".ui-dialog-content").remove();
}

$(document).ready(function() {

	//Do not run on /demos/ root page.
	if ( (/demos\/(#.*)?$/i).test(window.location) ) {
		return;
	}

	//Rewrite and prepare links of right-hand sub navigation
	$('#print-nav a').each(function() {
		$(this).attr('target', 'preview');
		$(this).click(function(e) {

			resetPrint();
			//$(this).parents('ul').find('li').removeClass('demo-config-on');
			//$(this).parent().addClass('demo-config-on');

			//Set the hash to the actual page without ".html"
			window.location.hash = this.getAttribute('href').match((/\/([^\/\\]+)\.html/))[1];

			loadPrint(this.getAttribute('href'));
			e.preventDefault();

		});
	});

	//If a hash is available, select the right-hand menu item and load it
	if(window.location.hash && window.location.href.indexOf('/html/') != -1) {
		loadHash();
	}

	resetPrint();


function listenToHashChange() {

	var savedHash = window.location.hash;

	window.setInterval(function() {

		if(savedHash != window.location.hash) {
			savedHash = window.location.hash;
			if(window.location.hash && window.location.href.indexOf('/docs/') != -1)
				gotoHash();
			//Since we have bind click event on print link and load hash on document.ready
			//if(window.location.hash && window.location.href.indexOf('/html/') != -1)
			//	loadHash();
		}

	},200);

}

function loadHash() {

	$('#print-nav a').each(function() {
		if(this.getAttribute('href').indexOf('/'+window.location.hash.substr(1)+'.html') != -1) {

			$(this).parents('ul').find('li').removeClass('print-nav-on');
			$(this).parent().addClass('print-nav-on');

			loadPrint(this.getAttribute('href'));
		}
	});

}
