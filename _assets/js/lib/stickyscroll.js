(function($){
	$.fn.stickyScroll = function() {
		if( !$(this).length ) { return; }
			
		var $win = $(window),
			$quicknav = $(this),
			insetTop = $quicknav.offset().top,
			mastHeight = $('#masthead').height(),
			containerTop = insetTop + $quicknav.outerHeight(true) - $quicknav.height(),
			initScroll = (( $(document).scrollTop() == 0 ) ? $('html') : $(document)).scrollTop(),
			stickyScroll = function() {
				if( window.innerWidth < 800 ) { return; }
				
				var scroll = (( $(document).scrollTop() == 0 ) ? $('html') : $(document)).scrollTop();

				//console.log('scroll: '+scroll);
				//console.log('containerTop: '+containerTop);

				if( ( scroll + $quicknav.height() ) < $('#main').height() + mastHeight ) {
					if( scroll > containerTop ) {
						$quicknav
							.removeClass('quicknav-docked')
							.addClass('quicknav-scrolling')
							.stop()
							.animate({"top": ( scroll - mastHeight ) + "px" }, 200 );
					} else {
						$quicknav
							.removeClass('quicknav-scrolling')
							.addClass('quicknav-docked');
					}
				} else {
					$quicknav.css('top', ( $('#main').height() - $quicknav.height() ) + 'px');
				}
			};

		$win.bind('scroll', function() {
				stickyScroll();
			}).bind('throttledresize', function() {
				stickyScroll();
			});
			
		$(document).ready(function() {
			$quicknav.parent().addClass('has-quicknav');
			
				// TODO remove this hack with a real solution for the containerTop math
				if(globe.section === "todays-paper"){
					containerTop += 200;
				}
			
			stickyScroll();	
		});
		
	};
})(jQuery);