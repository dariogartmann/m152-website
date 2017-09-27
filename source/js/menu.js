$(document).ready(function(){
    var isMenuOpen = false;

    // listener
    $('.menu-icon').on('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });

    $('.close-menu, .modal').on('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // toggle
    function toggleMenu() {
        switch(isMenuOpen) {
            case true:
                $('.modal').css('transform', 'rotateX(180deg)');
                isMenuOpen = false;
                break;
            case false:
                $('.modal').css('transform', 'rotateX(0deg)');
                isMenuOpen = true;
                break;
            default:
                break;
        }
    }
    
    var $banner = $('.navbar');
    var $win = $(window);
    var winH = $win.height();   // Get the window height.

    $win.on("scroll", function () {
        if ($(this).scrollTop() >= winH ) {
            $banner.addClass("sticky");
        } else {
            $banner.removeClass("sticky");
        }

    }).on("resize", function(){ // If the user resizes the window
       winH = $(this).height(); // you'll need the new height value
    });
});