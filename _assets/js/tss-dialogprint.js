		// print dialog
			function thisDialog() {

				$('a[rel~=dialog]').click(function() {
					$('#printDialog').empty();

					$('#printDialog').dialog({
						modal: true,
						width: 558,
						maxWidth: 558,
						position: ['center', 'top'],
						resizable: false,
						draggable: false,
						dialogClass: 'tssprint',
						zIndex: 9999,
						overlay: {
							backgroundColor: '#000',
							opacity: 0.8
						},
						close: function() { $(this).empty(); }
					});
					//bodyclass print template
						var bclass = $("body");
						if ((bclass).hasClass("person")) {
							$('#printDialog').html("<iframe src='print/participant-print-layout.html' id='printIframe' allowtransparency width='100%' height='550' frameborder='0' hspace='0' vspace='0' marginheight='0' marginwidth='0' scrolling='yes' seamless> dialog content </iframe>");
						}
						if ((bclass).hasClass("org")) {
							$('#printDialog').html("<iframe src='print/org-print-layout.html' id='printIframe' allowtransparency width='100%' height='550' frameborder='0' hspace='0' vspace='0' marginheight='0' marginwidth='0' scrolling='yes' seamless> dialog content </iframe>");
						}
						// if ((bclass).is(".person, .printrecord")) {
						// 	$('#printDialog').html("<iframe src='print/participant-print-record.html' id='printIframe' allowtransparency width='100%' height='550' frameborder='0' hspace='0' vspace='0' marginheight='0' marginwidth='0' scrolling='yes' seamless> dialog content </iframe>");
						//  }

						// if ((bclass).hasClass("tv")) {
						// }
						// if ((bclass).hasClass("film")) {
						// }

					var insertType = $(this).attr('data-type');
					var insertHtml = '';

					if (insertType == 'profile') {
						insertHtml = $("div .content aside").html();
					} else if (insertType == 'rep') {
						insertHtml = $("div .content aside section:first").html();
					} else if (insertType == 'company') {
						insertHtml = $("div .content aside section:first").next().html();
					} else if (insertType == 'awards') {
						insertHtml = $("div .content #main #thedetails section#awards").html();
					} else if (insertType == 'credits') {
						insertHtml = $("div .content #main #thedetails section#credits").html();
					} else if (insertType == 'bio') {
						insertHtml = $("div .content #main #thedetails section#biography").html();
					} else if (insertType == 'clients') {
						insertHtml = $("div .content #main #thedetails section#clients").html();
					} else if (insertType == 'co-loc') {
						insertHtml = $("body.org div .content aside section:first").next().next().html();
					} else if (insertType == 'fullrecord') {
						insertHtml = $("print/participant-print-record.html").html();
					} else if (insertType == 'sectionlist') {
						insertHtml = $("print/participant-quickprint.html").html();
					}

					//$('#printContent', $('#printIframe').contents()).html(insertHtml);

					$('#printIframe').load(function() {
						$(this).contents().find('#printContent').html(insertHtml);
					});

					$('.tssprint .ui-dialog-titlebar').prepend('<div id="print-modal-controls">' + '<a href="#" class="print" title="Print Page"></a>' + '<a href="#" class="ui-titlebar-close close" title="Close print preview"></a>');
					$('.tssprint .ui-dialog-title').hide();
					$('.tssprint .ui-dialog-titlebar-close').hide();

					$('#print-modal-controls a').bind('click', function (e) {
						e.preventDefault();
						if ($(this).hasClass('print')) {
							var iframe = $('#printIframe');
							var ifWin = iframe[0].contentWindow || iframe;
							iframe.focus();
							ifWin.print();
							$('#printDialog').dialog('destroy');
						}
						else {
							$('#printDialog').dialog('destroy');
						}
					});
				});



			}
			thisDialog();

			function pDialog() {

				$('a.opener').click(function() {
					$('#openDialog').empty();

					$('#openDialog').dialog({
						modal: true,
						width: 738,
						maxWidth: 738,
						position: ['center', 'top'],
						resizable: false,
						draggable: false,
						dialogClass: 'tssprint',
						zIndex: 9999,
						overlay: {
							backgroundColor: '#000',
							opacity: 0.8
						},
						close: function() { $(this).empty(); }
					});
					//bodyclass print template
						var bclass = $("body");
						if ((bclass).hasClass("person")) {
							$('#openDialog').html("<iframe src='print/participant-print-record.html' id='printIframe' allowtransparency width='100%' height='550' frameborder='0' hspace='0' vspace='0' marginheight='0' marginwidth='0' scrolling='yes' seamless> dialog content </iframe>");
						}
						if ((bclass).hasClass("org")) {
							$('#openDialog').html("<iframe src='print/participant-print-record.html' id='printIframe' allowtransparency width='100%' height='550' frameborder='0' hspace='0' vspace='0' marginheight='0' marginwidth='0' scrolling='yes' seamless> dialog content </iframe>");
						}

					var insertType = $(this).attr('data-type');
					var insertHtml = '';

					if (insertType == 'fullrecord') {
						insertHtml = $("print/participant-print-record.html").html();
					}

					//$('#printContent', $('#printIframe').contents()).html(insertHtml);

					$('#printIframe').load(function() {
						$(this).contents().find('#printContent').html(insertHtml);
					});

					$('.tssprint .ui-dialog-titlebar').prepend('<div id="print-modal-controls">' + '<a href="#" class="print" title="Print preview"></a>' + '<a href="#" class="ui-titlebar-close close" title="Close print preview"></a>');
					$('.tssprint .ui-dialog-title').hide();
					$('.tssprint .ui-dialog-titlebar-close').hide();

					$('#print-modal-controls a').bind('click', function (e) {
						e.preventDefault();
						if ($(this).hasClass('print')) {
							var iframe = $('#printIframe');
							var ifWin = iframe[0].contentWindow || iframe;
							iframe.focus();
							ifWin.print();
							$('#openDialog').dialog('destroy');
						}
						else {
							$('#openDialog').dialog('destroy');
						}
					});
				});

			}
			pDialog();

			function listDialog() {

				$('a.lister').click(function() {
					$('#listDialog').empty();

					$('#listDialog').dialog({
						modal: true,
						width: 1000,
						maxWidth: 1000,
						position: ['center', 'top'],
						resizable: false,
						draggable: false,
						dialogClass: 'tssprint',
						show: "blind",
						zIndex: 9999,
						overlay: {
							backgroundColor: '#000',
							opacity: 0.8
						},
						close: function() { $(this).empty(); }
					});
					//bodyclass print template
						var bclass = $("body");
						if ((bclass).hasClass("person")) {
							$('#listDialog').html("<iframe src='print/participant-listprint.html' id='printIframe' allowtransparency width='100%' height='490' frameborder='0' hspace='0' vspace='0' marginheight='0' marginwidth='0' scrolling='yes' seamless> dialog content </iframe>");
						}
						if ((bclass).hasClass("org")) {
							$('#listDialog').html("<iframe src='print/participant-listprint.html' id='printIframe' allowtransparency width='100%' height='490' frameborder='0' hspace='0' vspace='0' marginheight='0' marginwidth='0' scrolling='yes' seamless> dialog content </iframe>");
						}

					// var insertType = $(this).attr('data-type');
					// var insertHtml = '';

					// if (insertType == 'sectionlist') {
					// 	insertHtml = $("print/participant-listprint.html").html();
					// }

					//$('#printContent', $('#printIframe').contents()).html(insertHtml);

					// $('#printIframe').load(function() {
					// 	$(this).contents().find('#printContent').html(insertHtml);
					// });

					$('#printIframe').load(function() {
						$(this).contents().find('#printContent').html("print/participant-listprint.html");
					});

					$('.tssprint .ui-dialog-titlebar').prepend('<div id="print-modal-controls">' + '<a href="#" class="print" title="Print"></a>' + '<a href="#" class="ui-titlebar-close close" title="Close print preview"></a>');
					$('.tssprint .ui-dialog-title').hide();
					$('.tssprint .ui-dialog-titlebar-close').hide();

					$('#print-modal-controls a').bind('click', function (e) {
						e.preventDefault();
						if ($(this).hasClass('print')) {
							var iframe = $('#printIframe');
							var ifWin = iframe[0].contentWindow || iframe;
							iframe.focus();
							ifWin.print();
							$('#listDialog').dialog('destroy');
						}
						if ($(this).hasClass('preview')) {
						}
						else {
							$('#listDialog').dialog('destroy');
						}
					});
				});

				// $('a.preview').click(function() {
				// 	$(this).parents('')

				// }

			}
			listDialog();


			function radiolistDialog() {

				$('a.radiolist').click(function() {
					$('#radiolistDialog').empty();

					$('#radiolistDialog').dialog({
						modal: true,
						width: 1000,
						maxWidth: 1000,
						position: ['center', 'top'],
						resizable: false,
						draggable: false,
						dialogClass: 'tssprint',
						show: "blind",
						zIndex: 9999,
						overlay: {
							backgroundColor: '#000',
							opacity: 0.8
						},
						close: function() { $(this).empty(); }
					});
					//bodyclass print template
						var bclass = $("body");
						if ((bclass).hasClass("person")) {
							$('#radiolistDialog').html("<iframe src='print/participant-radiolistprint.html' id='printIframe' allowtransparency width='100%' height='490' frameborder='0' hspace='0' vspace='0' marginheight='0' marginwidth='0' scrolling='yes' seamless> dialog content </iframe>");
						}

					 //var insertType = $(this).attr('data-type');
					// var insertHtml = '';

					// if (insertType == 'radiosection') {
					// 	insertHtml = $("print/participant-radiolistprint.html").html();
					// }

					//$('#printContent', $('#printIframe').contents()).html(insertHtml);

					$('#printIframe').load(function() {
						$(this).contents().find('#printContent').html("print/participant-radiolistprint.html");
					});

					$('.tssprint .ui-dialog-titlebar').prepend('<div id="print-modal-controls">' + '<a href="#" class="print" title="Print"></a>' + '<a href="#" class="ui-titlebar-close close" title="Close print preview"></a>');
					$('.tssprint .ui-dialog-title').hide();
					$('.tssprint .ui-dialog-titlebar-close').hide();

					$('#print-modal-controls a').bind('click', function (e) {
						e.preventDefault();
						if ($(this).hasClass('print')) {
							var iframe = $('#printIframe');
							var ifWin = iframe[0].contentWindow || iframe;
							iframe.focus();
							ifWin.print();
							$('#radiolistDialog').dialog('destroy');
						}
						if ($(this).hasClass('preview')) {
						}
						else {
							$('#radiolistDialog').dialog('destroy');
						}
					});
				});

				// $('a.preview').click(function() {
				// 	$(this).parents('')

				// }

			}
			radiolistDialog();
