/*
  Class:      dwIMageProtector
  Author:     David Walsh
  Website:    http://davidwalsh.name
  Version:    1.0.0
  Date:       08/09/2008
  Built For:  jQuery 1.2.6
*/

jQuery.fn.protectImage = function(settings) {
  settings = jQuery.extend({
    image: '../_assets/img/base/spacer.gif',
    zIndex: 10
  }, settings);
  return this.each(function() {
    var position = $(this).position();
    var height = $(this).height();
    var width = $(this).width();
    var offset = $(this).offset();
    $('<img />').attr({
      width: width,
      height: height,
      offset: offset,
      src: settings.image
    }).css({
      top: offset.top,
      left: offset.left,
      position: 'absolute',
      zIndex: settings.zIndex
    }).appendTo('body')
  });
};

/* sample usage

$(window).bind('load', function() {
  $('img.protect').protectImage();
});

*/
