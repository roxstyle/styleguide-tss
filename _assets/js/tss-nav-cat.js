//category and record level menu w/dropdowns
//used for CMS
(function( $, undefined ){
	$( function() {

		var ww = document.body.clientWidth;
		var navcat = $(".nav-cat");

		 $(document).ready(function() {
			$(".nav-cat li a").each(function() {
				if ($(this).next().length > 0) {
					$(this).addClass("parent");
				};
			})

			$(".toggleMenu").click(function(e) {
				e.preventDefault();
				$(this).toggleClass("active");
				navcat.toggle();
			});
			adjustMenu();
		})

		$(window).bind('resize orientationchange', function() {
			ww = document.body.clientWidth;
			adjustMenu();
		});

		var adjustMenu = function() {
			if (ww < 800) {
				$(".toggleMenu").css("display", "inline-block");
				if (!$(".toggleMenu").hasClass("active")) {
					navcat.hide();
				} else {
					navcat.show();
				}
				$(".nav-cat li").unbind('mouseenter mouseleave');
				$(".nav-cat li a.parent").unbind('click').bind('click', function(e) {
					// must be attached to anchor element to prevent bubbling
					e.preventDefault();
					$(this).parent("li").toggleClass("hover");
				});
			}
			else if (ww >= 800) {
				$(".toggleMenu").css("display", "none");
				navcat.show();
				$(".nav-cat li").removeClass("hover");
				$(".nav-cat li a").unbind('click');
				$(".nav-cat li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
				 	// must be attached to li so that mouseleave is not triggered when hover over submenu
				 	$(this).toggleClass('hover');
				});
			}
		}


	});
 })( jQuery );
