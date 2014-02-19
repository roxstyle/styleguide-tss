//mylists templates menu
function menuTemplates() {

	var menu_ul = $('.listemplates .vert-menu > li > ul');
	var menu_a  = $('.listemplates .vert-menu > li > a');
	var menu_li = $('.listemplates .vert-menu > li');
	var mylist = $('.listemplates .vert-menu > li').data();
	var i = $('.record .itemeditor');

	menu_a.click(function(e) {
		e.preventDefault();
		//var mylist = $(this).parent('li').data();

		if(!$(this).hasClass('active')) {
			menu_a.removeClass('active');
			menu_ul.filter(':visible').slideUp('normal');
			//$(this).next('ul').hide("slide", { direction: "up" }, 500).removeClass("active").unbind();
			$(this).addClass('active').next('ul').stop(true,true).slideDown('normal');

			if (mylist.section ==  "listpeople") {
				$('.listemplates #main > section:not("#list-people")').hide().removeClass("selected");
				$('.listemplates #main > section#list-people').show().addClass("selected");
			}
			if (mylist.section ==  "listprojects") {
				$('.listemplates #main > section:not("#list-project")').hide().removeClass("selected");
				$('.listemplates #main > section#list-project').show().addClass("selected");
			}
			if (mylist.section ==  "listcompanies") {
				$('.listemplates #main > section:not("#list-company")').hide().removeClass("selected");
				$('.listemplates #main > section#list-company').show().addClass("selected");
			}

		} else {
			$(this).removeClass('active');
			$(this).next().stop(true,true).slideUp('normal');
		}

	});
}
menuTemplates();

$(".vert-wrapper:first-child").css("margin-top","0");

//mylists templates vertmenu default
function mylistLoad() {

	var menu_ul = $('.vert-menu > li > ul');
	menu_ul.hide();

	$('.vert-menu > li:first-child').children('a').addClass('active').next('ul').show();

	$('.listemplates #main > section:not("#list-people")').hide().removeClass("selected");
	$('.listemplates #main > section#list-people').show().addClass("selected");
}
mylistLoad();

