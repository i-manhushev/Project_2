$(document).ready(function(){

// selectors' variables
	var header = $("#header");
	var menuButton = $('.header__menu');
	var navList = $('.nav');
	var menuShow = false;

// fixed header on scroll
	$(window).on("scroll", function() {
  	if ($(this).scrollTop() > 20) {
    	header.addClass("header-fixed");
  	} else {
    	header.removeClass("header-fixed");
    } 
	});


/*clickable menu for small screens*/
 	menuButton.on('click', function(e){
 		e.preventDefault();
 		if (!menuShow) {
			navList.slideDown();
			menuButton.text('Hide menu');
			menuShow = true;
// works on small screen, off on > 568			
			$('.nav a').on('click.my', function(e){
				e.preventDefault()
				navList.slideUp();
				menuButton.text('menu');
				menuShow = false;
			});
// works on small screen, off on > 568
			$(document).on('mouseup',function(e){
				e.stopPropagation;
    	if (!navList.is(e.target) // if the target of the click isn't the container...
        && navList.has(e.target).length === 0 // ... nor a descendant of the container
        && !menuButton.is(e.target) ) // ... nor the menu button
    		{ 
        navList.slideUp();
        menuButton.text('menu');
    		menuShow = false;
    		}
    	});
// works on small screen, off on > 568
    	$(window).on("scroll.my", function() {
				navList.slideUp();
				menuButton.text('menu');
				menuShow = false;
			});

		} else {
			navList.slideUp();
			menuButton.text('menu');
			menuShow = false;
			}
	 });
/*clickable menu for small screens*/


/*restore styles after resize*/
 	$(window).resize(function(){
		var wid = $(window).width();
		if(wid > 568) { 
		  navList.removeAttr('style');
		  menuButton.text('menu');
		  menuShow = false; 
// turning off events that work on small screens
		  $(window).off("scroll.my");
			$('.nav a').off('click.my');
			$(document).off('mouseup');  
		}
	});
/*restore styles after resize*/

			
// smooth scroll 
  $(".nav li a").on('click', function(event) {
    // Prevent default anchor click behavior
    event.preventDefault();
    // Store hash
    var hash = this.hash;
    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 900, function(){
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  });

  //my slider for apps
var srcArray = ["images/parentControl.jpg","images/antivirus.jpg","images/google-cube.jpg","images/system.jpg"];
var count = 0;
function sliderMy(){
	++count;
	if (count == 4) {count =0;}
	$('.apps__image img').attr('src',srcArray[count]);
}
setInterval(sliderMy,4000);


  //slick slider 
  $('.about__wrap').slick({
  	arrows:false,
  	dots: false,
  	autoplay:true,
  	cssEase: "ease-in-out"
  });


  //navigation for portrolio section;
  $('.portfolio__nav li a').on('click', function(e){
  	e.preventDefault();

  	if($(this).hasClass('activeLink')) {
  		return false;
  	}
  	var anchorId = $(this).attr('href').slice(1);
  		 $('.portfolio__nav li a').removeClass('activeLink');
  		 $(this).addClass('activeLink');
  		 $('.portfolio__wrap').removeClass('activeSection');
  		 $("#" + anchorId).addClass('activeSection');

  		if($('.appBlock__title').is('.active')) {
  			$('.appBlock__title').removeClass('active');
  			$('.appBlock__title').removeAttr('style');
  			$('.appBlock__title').siblings('.appBlock__content').removeAttr('style');
  		}
		});

  // collapsible tabs for apps 
  $('.appBlock__title').on('click', function(e){
  	$(this).toggleClass('active');
  	if ($(this).is('.active')) {
  		$(this).siblings('.appBlock__content').slideDown(500);
  	} else {
  		$(this).siblings('.appBlock__content').slideUp(500);
  	}

  });


});







