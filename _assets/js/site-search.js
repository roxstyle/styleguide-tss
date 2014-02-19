		$.widget( "custom.catcomplete", $.ui.autocomplete, {
			_renderMenu: function( ul, items ) {
			var that = this,
				currentCategory = "";
				$.each( items, function( index, item ) {
				if ( item.category != currentCategory ) {
					ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
					currentCategory = item.category;
				}
				that._renderItemData( ul, item );
				});
			}
		});

	$(function() {
		var projects = [
			{
				value: "tim-richard",
				label: "Tim Richard",
				desc: "Actor, Machine Gun 2001 (2001)",
				icon: "../img/icons/search-person.png",
				category: "People"
			},
			{
				value: "tim-mcinnerney",
				label: "Tim McInnerney",
				desc: "Producer, Director, Writer, Actor, Choreographer, Wardrobe, Hair &amp; Makeup, Production Management, Consultants &amp; Advisors, The Hobbit 2: There and Back Again (2013) ",
				icon: "../img/icons/search-person.png",
				category: "People"
			},
			{
				value: "fred-timampay",
				label: "Fred Timampay",
				desc: "Actor, Hollywood &amp; Crime (2000) ",
				icon: "../img/icons/search-person.png",
				category: "People"
			},
			{
				value: "tim-mran",
				label: "Tim Mran",
				desc: "Actor, Poltergeist III (1988) ",
				icon: "../img/icons/search-person.png",
				category: "People"
			},
			{
				value: "tim-steele",
				label: "Tim Steele",
				desc: "Actor, Payne (1999) ",
				icon: "../img/icons/search-person.png",
				category: "People"
			},
			{
				value: "timer",
				label: "TiMER",
				desc: "Feature Film, Released (2009) ",
				icon: "../img/icons/search-project-film.png",
				category: "Projects"
			},
			{
				value: "my-lover-my-son",
				label: "The Second Time Around",
				desc: "Feature Film, Released (1996) ",
				icon: "../img/icons/search-project-film.png",
				category: "Projects"
			},
			{
				value: "spirit-of-jeet-kune-do:-once-upon-a-time-in-high-school",
				label: "Spirit of Jeet Kune Do: Once Upon a Time in High School",
				desc: "TV Series, Aired (1986-1999) ",
				icon: "../img/icons/search-project-tv.png",
				category: "Projects"
			},
			{
				value: "out-of-time",
				label: "Out of Time",
				desc: "Feature Film, Wrapped (2007) ",
				icon: "../img/icons/search-project-film.png",
				category: "Projects"
			},
			{
				value: "the-pitts",
				label: "The Pitts",
				desc: "TV Pilot, In Development (2012) ",
				icon: "../img/icons/search-project-tv.png",
				category: "Projects"
			},
			{
				value: "timing",
				label: "Timing",
				desc: "",
				icon: "../img/icons/search-company.png",
				category: "Company"
			},
			{
				value: "tim-burton-productions",
				label: "Tim Burton Productions",
				desc: "Film Production, Abraham Lincoln: Vampire Hunter (2012) ",
				icon: "../img/icons/search-company.png",
				category: "Company"
			},
			{
				value: "lucky-time-taxi",
				label: "Lucky Time Taxi",
				desc: "",
				icon: "../img/icons/search-company.png",
				category: "Company"
			},
			{
				value: "on-time-service",
				label: "On Time Service",
				desc: "",
				icon: "../img/icons/search-company.png",
				category: "Company"
			},
			{
				value: "tim-burton-productions",
				label: "Tim Burton Productions",
				desc: "Film Production, Abraham Lincoln: Vampire Hunter (2012) ",
				icon: "../img/icons/search-company.png",
				category: "Company"
			}
		];

		$( "#search" ).catcomplete({
			delay: 0,
			minLength: 2,
			appendTo: ".search-primary",
			source: projects,
			focus: function( event, ui ) {
				$( "#project" ).val( ui.item.label );
				return false;
			},
			select: function( event, ui ) {
				$( "#project" ).val( ui.item.label );
				$( "#project-id" ).val( ui.item.value );
				$( "#project-description" ).html( ui.item.desc );
				//$( ".project-icon" ).attr( "src", "../img/icons/" + ui.item.icon );
				return false;
			}
		});
		// 	data( "catcomplete" )._renderItem = function(ul, item) {
		// 	return $( "<li></li>" )
		// 		.data( "item.autocomplete", item )
		// 		.append( "<a>"+ ('<img class="project-icon project-icon-noimage" src="' + item.icon + '" alt="" />') + "<div class='suggest'>" + ("<span class='label'>"+ item.label + "</span>") + ("<span class='desc'>"+ item.desc + "</span>") + "</div>" + "</a>" )
		// 		.appendTo( ul );
		// };

	});


