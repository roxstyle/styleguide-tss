/*
 * jQuery special events for delayedEnter, delayedLeave, and delayedHover
 * Author: Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2011 Filament Group 
 * licensed under MIT
 * note: Each event can be used with bind or live event handling as you would use mouseenter,mouseleave, and hover
 * events fire after 200ms timeout
*/
(function($){
//delayedEnter event
$.event.special.delayedEnter = {
    enabled: true,
    
    setup: function() {
        var thisObject = this,
            $this = $( thisObject ),
            timeout = 200,
            hovering,
            timer;
        
        function trigger( event ) {
            var originalType = event.type;
            event.type = "delayedEnter";
            $.event.handle.call( thisObject, event );
            event.type = originalType;
        }
        
        $this.bind({
            "mouseenter": function( event ) {
                if ( !$.event.special.delayedEnter.enabled ) {
                    return;
                }
                hovering = true;
    
                clearTimeout( timer );
                
                timer = setTimeout(function() {
                    if ( hovering ) {
                        trigger( event );
                    }
                }, timeout );
            },
            "mouseleave": function(){
                hovering = false;
            }
        });
    },
    // .off() hook
    remove: function() {
        $(this).off('mouseleave mouseenter');
    }
};
 
//make available as method
$.fn.delayedEnter = function( fn ) {
    return fn ? this.bind( "delayedEnter", fn ) : this.trigger( "delayedEnter" );
};
$.attrFn.delayedEnter = true;
 
 
 
//delayedLeave event
$.event.special.delayedLeave = {
    enabled: true,
    
    setup: function() {
        var thisObject = this,
            $this = $( thisObject ),
            timeout = 300,
            hovering,
            timer;
        
        function trigger( event ) {
            var originalType = event.type;
            event.type = "delayedLeave";
            $.event.handle.call( thisObject, event );
            event.type = originalType;
        }
        
        $this.bind({
            "mouseleave": function( event ) {
                if ( !$.event.special.delayedLeave.enabled ) {
                    return;
                }
                hovering = false;
    
                clearTimeout( timer );
                
                timer = setTimeout(function() {
                    if ( !hovering ) {
                        trigger( event );
                    }
                }, timeout );
            },
            "mouseenter": function(){
                hovering = true;
            }
        });
    }
};
 
//make available as method
$.fn.delayedLeave = function( fn ) {
    return fn ? this.bind( "delayedLeave", fn ) : this.trigger( "delayedLeave" );
};
$.attrFn.delayedLeave = true;
 
//proxy similar to jQuery's hover
//if leaveCallback isn't defined, enterCallback will apply to both
$.fn.delayedHover = function( enterCallback, leaveCallback ){
    return this.delayedEnter(enterCallback).delayedLeave( leaveCallback || enterCallback );
};
})(jQuery);