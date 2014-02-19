/**
* --------------------------------------------------------------------
* jQuery collapsible plugin
* Author: Scott Jehl, scott@filamentgroup.com
* Copyright (c) 2009 Filament Group
* licensed under MIT (filamentgroup.com/examples/mit-license.txt)
* --------------------------------------------------------------------
*
* See: http://dwpe.googlecode.com
* http://filamentgroup.com/lab/expand_and_collapse_content_accessibly_with_progressive_enhancement_jquery/
*
* some local changes by jrochkind, eventually would like to publish these as a
* fork. For now, just diff this against a version from the repo to see changes
* I guess.
*
* Requires these CSS to be defined:
.collapsible-heading {
position: relative;
}
.collapsible-heading .ui-icon {
margin-top:-8px;
position:absolute;
top:50%;
}
.collapsible-heading .collapsible-heading-status {
padding-left:1.4em;
}
*/
$.fn.collapsible = function(){
    return $(this).each(function(){

        //define
        var collapsibleHeading = $(this);
        var collapsibleContent = collapsibleHeading.next();

        //modify markup & attributes
        collapsibleHeading.addClass('collapsible-heading')
            .prepend('<span class="collapsible-heading-status"></span>');
            //commented these out for now.  They were adding in nested span's and a's
            //.prepend('<span class="collapsible-heading-icon ui-icon ui-icon-triangle-1-s"/>')
            //.wrapInner('<a href="#" class="collapsible-heading-toggle"></a>');

        collapsibleContent.addClass('collapsible-content');

        //events
        collapsibleHeading.bind('collapse', function(){
            $(this).addClass('collapsible-heading-collapsed')
                .find(".collapsible-heading-icon").toggleClass("ui-icon-triangle-1-e ui-icon-triangle-1-s")
                .end()
                .find('.collapsible-heading-status').text('Show ');

            collapsibleContent.slideUp(function(){
                $(this).addClass('collapsible-content-collapsed').removeAttr('style').attr('aria-hidden',true).hide();
            });
        }).bind('expand', function(){
            $(this).removeClass('collapsible-heading-collapsed')
                .find(".collapsible-heading-icon").toggleClass("ui-icon-triangle-1-e ui-icon-triangle-1-s")
                .end()
                .find('.collapsible-heading-status').text('Hide ');

            collapsibleContent.slideDown(function(){
                $(this).removeClass('collapsible-content-collapsed').removeAttr('style').attr('aria-hidden',false).show();
            });
        }).click(function(){
            if( $(this).is('.collapsible-heading-collapsed') ){
                $(this).trigger('expand');
            }
            else {
                $(this).trigger('collapse');
            }
                return false;
        }).trigger('collapse');
    });
};