//rowheight
// function unifyHeights() {
// 	var maxHeight = 0;
// 	$('.ad').load(function() {
// 		var height = $('.new-trailers').outerHeight();
// 		alert(height);
// 		if ( height > maxHeight ) {
// 			maxHeight = height;
// 		}
// 	});
// 	$('.ad').css('height', maxHeight+30);
// }
// unifyHeights();

// $(window).resize(function(){unifyHeight()});

// function equalHeight() {
// 	var maxHeight = 0;
// 	$('.adwrapper').load(function() { maxHeight = Math.max(maxHeight, $(this).children('.theframe').height()); })
// 	.css('min-height',maxHeight+250);

// }
// equalHeight();

// $(window).resize(function(){equalHeight()});


//friendly iframe

function adCat() {

/*
	Array of ad positions, and corresponding widths/heights.

		* [].position is the only required property, and should be unique across the array.
		* Specifying [].width and [].height is OPTIONAL. (Defaults are set in globe-adinclude.js.)
			* Default value of [].width is "100%".
			* Default value of [].height is "150".

	NB: We recommend leaving widths at the default width of 100% unless required. (The below `width: "100%" is only included for demonstration purposes, and isn't required.)

	Also, we suggest careful care and maintenance of this array. Prune often! :)

	*/

  adCatalog = [
  {
	position: "BOX",
	height: "260"
  },
  {
	position: "SPONSOR",
	height: "150"
  },
  {
	position: "EXTRA",
	height: "1"
  },
  {
	position: "ARTICLE",
	height: "260",
	width: "310"
  }

  ];

}
adCat();

function lookupAd() {

	// Build lookup from the globe.OAS.adCatalog table
	var adKeys = [];
	for (var i in adCatalog) {
		var obj = adCatalog[i];

		adKeys[obj.position] = {};
		adKeys[obj.position].width = obj.width || "100%";
		adKeys[obj.position].height = obj.height || "150";
	};

	// Shift ads on resize
	// Resize handler (with buffer) for adShift()
	function resizeAd() {
		var adShift = function() {

			var $thisAd,
				sPos,
				$ads		= $( ".ad[data-adname]" ),
				iAds		= $ads.length,
				i			= 0;

			for ( ; i < iAds; i++) {
				$thisAd		= $( $ads[i] );
				sPos		= $thisAd.data("adname");

				if ( $thisAd.is( ":visible" ) ) {
					if ( $thisAd.children().length === 0 ) {
						// Look for ad slots that share the same ad position name (CENTRAL, SPONSOR, etc.)
						var $related = $ads.data("adname", sPos).not(":visible"),
							iRel = $related.length;

						if ( iRel ) {
							for (var j = 0; j < iRel; j++) {
								var $oThis = $( $related[j] );
								if ($oThis.children().length > 0) {
									$oThis
										.children()
											.appendTo($thisAd)
										.end()
										.empty();
								}
							}
						}
					}
				}

			}
		};

		//run adShift on throttled resize
		$( window ).bind( "throttledresize" , adShift );
	}
	resizeAd();


}
lookupAd();

function fifi() {

	// create friendly iframe
	$('div.iframe').each(function (i) {
			// Replace the DIV
			//$(this).replaceWith("<iframe src='" + this.getAttribute("data-src") + "' "+ this.getAttribute("data-styles")  +" frameborder='0' scrolling='no'></iframe>");
			$(this).replaceWith("<iframe src='" + this.getAttribute("data-src") + "' frameborder='0' scrolling='no'></iframe>");
		}
	);
}
fifi();

// $(window).resize(function() { fifi() });  //call function for each resize




// function fifi() {
// 		  $('div.iframe').each( //div for iframe with attributes and settings
// 				 function () {
// 						var sender = $(this);
// 						var size = $('.adwrapper').height() + 'px'; //take height for iframe
// 						var iframe = document.createElement('iframe'); //create iframe
// 						(iframe.frameElement || iframe).width = size; //setting size
// 						(iframe.frameElement || iframe).height = size;
// 						(iframe.frameElement || iframe).style.overflow = "hidden"; //hide scrollbars
// 						iframe.src = "javascript:false";
// 						$(sender).empty(); //clear html inside of the div (removing the previous div)
// 						$(sender).append(iframe); // putting the created iframe in the div
// 						var doc = iframe.contentWindow.document; // content for inserting in iframe
// 						var inputHtml = "<img src='" + $(sender).attr("data-src") + "' style='height:" + size + "; width:" + size + "' />";
// 						doc.open().write(inputHtml);
// 						doc.close();
// 				 }
// 		  );
// } fifi();
// $(window).resize(function () { fifi() });//call function for each resize
