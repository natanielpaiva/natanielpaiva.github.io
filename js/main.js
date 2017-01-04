(function ($) {
   "use strict"; 

/*------------------------------
 Change Active State on Scroll
------------------------------ */

    $('body').scrollspy({
        target: '.navbar-collapse',
        offset: 71
    })

/*----------------------------
 wow js active
------------------------------ */

	new WOW().init(); 

/*---------------------
 TOP Menu Stick
--------------------- */

	var navOffset = $("#sticker").offset().top;  
    $(window).scroll(function() {    
    var scrollPos = $(window).scrollTop();    
	    if (scrollPos > navOffset) {
	      $("#sticker").addClass("stick");
	    } else {
	      $("#sticker").removeClass("stick");
	    }
    });

/*----------------------------
 Navbar nav
------------------------------ */
	$(".main-menu ul.navbar-nav li").on('click', function(){
		$(".main-menu ul.navbar-nav li").removeClass("active");
		$(this).addClass("active");
	});	

/*----------------------------
Page Scroll
------------------------------ */

	$('.navbar-nav li a').on('click', function(event) {
		var $anchor = $(this);
		  $('html, body').stop().animate({
			  scrollTop: $($anchor.attr('href')).offset().top - 71
			}, 1500, 'easeInOutExpo');
		event.preventDefault();
	});


/*----------------------------
 Typed js 
------------------------------ */

	$(".typer").typed({
	    strings: ["Desenvolvedor Fullstack", "Java", "Angular 2"],
	    typeSpeed: 200,
	    loop: true,
	    cursorChar: "+"
	});

/*---------------------
 testimonial-curosel
--------------------- */
	$('.testimonial-carousel').owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		dots:false,
		navText:["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		autoplay:true,
		autoplayTimeout: 3000,
		smartSpeed:1000,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:1
			},
			1000:{
				items:1
			}
		}
	});

/*---------------------
 Blog-curosel
--------------------- */
	$('.blog-item ').owlCarousel({
		loop:true,
		margin:0,
		nav:true,
		dots:false,
		animateOut: 'slideOutDown',
		animateIn: 'zoomInLeft',
		navText:["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		autoplay:false,
		responsive:{
			0:{
				items:1
			},
			768:{
				items:2
			},
			1000:{
				items:2
			}
		}
	});

/*--------------------------
 scrollUp
---------------------------- */
	$.scrollUp({
		scrollText: '<i class="fa fa-angle-up"></i>',
		easingType: 'linear',
		scrollSpeed: 900,
		animation: 'fade'
	});
	
/*----------------------------
 isotope active
------------------------------ */
	// portfolio start
    $(window).on("load", function() {
        var $container = $('.portfolio-content');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.portfolio-menu li a').on("click", function() {
            $('.portfolio-menu li a.active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });
    //portfolio end

    // Demo Color Panel Schemes

	$('.theme-collapse-btn').on('click', function(e){
	    var parent = $(this).closest('.theme-panel');
	    parent.toggleClass('active');
	});

	  function swapStyleSheet(sheet) {
	    document.getElementById("pagestyle").setAttribute("href", sheet);  
	}

	// style1.onclick = function () { swapStyleSheet("default.css") };

	$('.theme-list > li').on('click', function(){	  
	  $('.theme-list').find('li').removeClass('active');
	  $(this).addClass('active');
	});

	$('a.theme-default').on('click', function(){
	   swapStyleSheet(""); 
	});
	$('a.theme-jungle-green').on('click', function(){
	   swapStyleSheet("css/theme-jungle-green.css");  
	});
	$('a.theme-dark-blue').on('click', function(){
	   swapStyleSheet("css/theme-dark-blue.css");  
	});
	$('a.theme-red-plum').on('click', function(){
	   swapStyleSheet("css/theme-red-plum.css");  
	});
	$('a.theme-lynch').on('click', function(){
	   swapStyleSheet("css/theme-lynch.css");  
	});
	$('a.theme-cyan-blue').on('click', function(){
	   swapStyleSheet("css/theme-cyan-blue.css");  
	});
	
	/*--------------------------
     preloader
    ---------------------------- */	
	$(window).on('load', function(){
		$('#preloader').fadeOut('slow', function(){$(this).remove();});
	});	
	
})(jQuery); 
