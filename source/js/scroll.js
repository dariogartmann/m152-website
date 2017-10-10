$('a[href*="#"].scroll').not('[href="#"]').not('[href="#0"]').click(function(event) {
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 300, function() {
        // bla;
      });
    }
  }
});


$(document).ready(function() {

    $(window).scroll( function() {
        var scroll = $(window).scrollTop();
        var speed = 0.5;
        $('.parallax').each(function(){
            var $this = $(this);
            var $parent = $this.parent();
            var topOffset = $parent.offset().top;
            var height = $parent.outerHeight(true);
            var parallaxSize = (scroll - topOffset) * speed;
                
            // prevent parallax when scroll down
            if(scroll > topOffset + height) {
                return;
            }
            
            $this.css({ 
                'transform': scroll >= topOffset ? ('translate(-75px, ' + parallaxSize + 'px)' ) : 'translateX(-75px)'
            });
        }); 
    });  
});
