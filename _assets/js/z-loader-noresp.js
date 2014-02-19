// Loads in the javascript 
function s(n) {
    // Create script element 
    var e = document.createElement('script');

    // Set its source based on the passed name value 
    e.setAttribute('src', n + '.js');
	e.setAttribute('class', 'new_script');

    // Append to the document body 
    document.getElementsByTagName('body')[0].appendChild(e);
}

var windowWidth = $(window).width();

if (windowWidth < 480) {
    // Load 480.js 
    s('../_assets/js/480nores');
}
if (windowWidth > 480 && windowWidth < 767) {
    // Load 760.js 
    s('../_assets/js/768');
}
if (windowWidth > 768) {
     //Load 992.js 
    s('../_assets/js/992');
}
//    if (windowWidth > 768 && windowWidth < 992) {
//        // Load 992.js 
//        s('_assets/js/992');
//    }
//    if (windowWidth > 992 && windowWidth < 1382) {
//        // Load 1382.js 
//        s('_assets/js/1382');
//    }
// else {
//     // Load 992.js 
//     s('_assets/js/992');
// }
