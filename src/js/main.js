/* Theme: Niwax - Creative Web Design & Digital Marketing Agency HTML5 Template
Author: Rajesh-Doot	
File Description: Main JS file of the template*/
(function ($) {
    "use strict";
  
   //wow animation
    new WOW().init();
    //Mobile nav
    var $main_nav = $('#main-nav');
    var $toggle = $('.toggle');
    var defaultOptions = {
      disableAt: false,
      customToggle: $toggle,
      levelSpacing: 10,
      navTitle: 'Site Name',
      levelTitles: true,
      levelTitles: true,
      labelClose: false,
      levelTitleAsBack: true,
      levelOpen: 'expand',
      closeOnClick: true,
      insertClose: true,
      closeActiveLevel: true,
      insertBack: true
    };  
  // Nav call plugin
    var Nav = $main_nav.hcOffcanvasNav(defaultOptions);
  //Mobile nav
  var $main_nav_options = $('#main-nav-options');
  var $toggleOptions = $('.toggle-options');
  var defaultOptionsForOptions = {
    disableAt: false,
    customToggle: $toggleOptions,
    levelSpacing: 10,
    navTitle: 'Site Menu',
    levelTitles: true,
    evelTitles: true,
    labelClose: false,
    levelTitleAsBack: true,
    levelOpen: 'expand',
    closeOnClick: true,
    insertClose: true,
    closeActiveLevel: true,
    insertBack: true
  };  
// Nav call plugin
  var Nav = $main_nav_options.hcOffcanvasNav(defaultOptionsForOptions);
  //Sticky Header 
    function updateScroll() {
      if ($(window).scrollTop() >= 80) {
        $(".navfix").addClass('sticky');
      } else {
        $(".navfix").removeClass("sticky");
      }
    }
    $(function () {
      $(window).scroll(updateScroll);
      updateScroll();
    });
  
  //Header mega menu
    var $nav = $('li.sbmenu');
    $nav.hover(
      function () {
        $(this).addClass('hover');
      },
      function () {
        $(this).removeClass('hover');
      }
    );
  
   //Video magnificPopup
    $('.video-link').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
    });
  
 
   //Owl-Carousel - Home hero card
    var owl = $('.service-card-prb');
    owl.owlCarousel({
      items: 4,
      loop: true,
      autoplay: true,
      margin: 20,
      nav: false,
      dots: false,
      autoplayTimeout: 3500,
      autoplayHoverPause: true,
      smartSpeed: 2000,
      responsive: {
        0: {
          items: 1
        },
        520: {
          items: 2
        },
        768: {
          items: 3
        },
        1200: {
          items: 3
        },
        1400: {
          items: 3
        },
        1600: {
          items: 3
        },
      }
    });
  
    //Owl-Carousel - Home testimonial
    var owl = $('.testimonial-card-a');
    owl.owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: true,
      smartSpeed: 500,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 1
        },
        1024: {
          items: 1
        },
        1400: {
          items: 1
        }
      }
    });
  
    //Owl-Carousel - video testimonial
    var owl = $('.video-testimonials');
    owl.owlCarousel({
      items: 2,  
      nav: false,
      dots: false,
      autoplay: false,
      autoplayTimeout: 3500,  
      smartSpeed: 1500,
      margin: 20,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        1024: {
          items: 2
        },
        1400: {
          items: 2
        }
      }
    });
  
    //Owl-Carousel - case-study
    var owl = $('.project-screens');
    owl.owlCarousel({
      items: 4,
      loop: true,
      autoplay: true,
      margin: 20,
      nav: false,
      dots: false,
      autoplayTimeout: 3500,
      autoplayHoverPause: true,
      smartSpeed: 2000,
      responsive: {
        0: {
          items: 1
        },
        520: {
          items: 2
        },
        768: {
          items: 3
        },
        1200: {
          items: 3
        },
        1400: {
          items: 3
        },
        1600: {
          items: 3
        },
      }
    }); 
  
     //Owl-Carousel -portfolio slide 
    var owl = $('.porto-slide');
    owl.owlCarousel({ 
      items:1,  
      loop: true,
      autoplay: true,
      margin: 10,
      nav: false,
      dots: true,
      stagePadding: 50,
      autoplayTimeout: 350000,
      autoplayHoverPause: true,
      smartSpeed: 2000,
      responsive: {
        0: {
          items: 1,
          stagePadding:0
        },
        520: {
           items: 1,
          stagePadding:0
        },
        768: {
           items: 1,
          stagePadding:0
        },
        1200: {
          items: 1
        },
        1400: {
          items: 1
        },
        1600: {
          items: 1
        },
      }
    }); 
  
      //Owl-Carousel -single slide
    var owl = $('.single-slide');
    owl.owlCarousel({ 
      items:1,  
      loop: true,
      autoplay: true,
      margin: 10,
      nav: false,
      dots: true,
      stagePadding: 100,
      autoplayTimeout: 3500,
      autoplayHoverPause: true,
      smartSpeed: 2000,
       responsive: {
        0: {
          items: 1,
          stagePadding:0
        },
        520: {
           items: 1,
          stagePadding:0
        },
        768: {
           items: 1,
          stagePadding:0
        },
        1200: {
          items: 1
        },
        1400: {
          items: 1
        },
        1600: {
          items: 1
        },
      }
    });
  
   //Owl-Carousel - app page bages-slider
    var owl = $('.bages-slider');
    owl.owlCarousel({
      items: 4,
      loop: true,
      autoplay: true,
      centre:true,
      margin: 20,
      nav: false,
      dots: false,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 2000,
      responsive: {
        0: {
          items: 2
        },
        520: {
          items: 3
        },
        768: {
          items: 3
        },
        1200: {
          items: 3
        },
        1400: {
          items: 4
        },
        1600: {
          items: 4
        },
      }
    });
  
  //Owl-Carousel - app page bages-slider
    var owl = $('.logo-weworkfor');
    owl.owlCarousel({
      items: 4,
      loop: true,
      autoplay: true,
      margin: 10,
      nav: false,
      dots: false,
      autoplayTimeout: 1800,
      autoplayHoverPause: false,
      smartSpeed: 2000,
      responsive: {
        0: {
          items: 3
        },
        520: {
          items: 3
        },
        768: {
          items: 4
        },
        1200: {
          items: 4
        },
        1400: {
          items: 5
        },
        1600: {
          items: 6
        },
      }
    });
  
    //  //Owl-Carousel - Home testimonial
    var owl = $('.testimonial-card-b');
    owl.owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      dots: true,
      dotsContainer: "#testimonials-avatar",
      smartSpeed: 500,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 1
        },
        1024: {
          items: 1
        },
        1400: {
          items: 1
        }
      }
    });
  
  
  //full card portfolio
    var owl = $('.zoomowl');
    owl.owlCarousel({
          stagePadding: 200,
          loop:true,
          margin:10,
          nav:false,
          items:1,
          lazyLoad: true,      
          responsive:{
            0:{
              items:1,
              stagePadding: 60
            },
            600:{
              items:1,
              stagePadding: 100
            },
            1000:{
              items:1,
              stagePadding: 200
            },
            1200:{
              items:1,
              stagePadding: 250
            },
            1400:{
              items:1,
              stagePadding: 300
            },
            1600:{
              items:1,
              stagePadding: 350
            },
            1800:{
              items:1,
              stagePadding: 400
            }
          }
        });  
  
    //Counter Up	
    $(".counter").counterUp({
      delay: 10,
      time: 2500,
    });
  
    //Scroll to top
    $.scrollUp({
      animation: 'fade',
      scrollImg: {
        active: true,
        type: 'background'
      }
    });
  
    //Portfolio Filter		
    $('.card-list').imagesLoaded(function () {
      // init Isotope
      var $grid = $('.card-list').isotope({
        itemSelector: '.single-card-item',
        percentPosition: true,
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: '.grid-sizer'
        }
      });    
      // filter items on button click
      $('.filter-menu').on('click', 'li', function () {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({
          filter: filterValue
        });
      });
    });
    //for menu active class
    $('.filter-menu li').on('click', function (event) {
      $(this).siblings('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
      event.preventDefault();
    });
  
  
  // background image
    $("[data-background]").each(function () {
      $(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
    })
  
  
  //end of page
  })(jQuery);
  
var element = document.querySelector('.scroll-animation');
var isHidden = false;
var lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

function handleScroll() {
  var currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollPosition > lastScrollPosition) {
    if (!isHidden && element) {
      element.classList.add('hide');
      isHidden = true;
    }
  } else {
    if (isHidden && element) {
      element.classList.remove('hide');
      isHidden = false;
    }
  }

  lastScrollPosition = currentScrollPosition;
}

window.addEventListener('scroll', handleScroll);


async function activateBlock(blockNumber) {
  // Удаляем активный класс у всех блоков и кнопок
  const buttons = document.querySelectorAll('.button-for-active');
  buttons.forEach(button => button.classList.remove('activeButton'));
  const blocks = document.querySelectorAll('.block-for-active');
  blocks.forEach(block => block.classList.remove('active'));
  const normalPrice = document.querySelectorAll('.normal-price-for-active');
  normalPrice.forEach(price => price.classList.remove('active'));
  const premiumPrice = document.querySelectorAll('.premium-price-for-active');
  premiumPrice.forEach(price => price.classList.remove('active'));

  // Добавляем активный класс к выбранному блоку и кнопке
  const selectedButton = document.querySelector(`.button-for-active[data-block="${blockNumber}"]`);
  selectedButton.classList.add('activeButton');
  const selectedBlock = document.querySelector(`.block-for-active[data-block="${blockNumber}"]`);
  selectedBlock.classList.add('active');
  const selectedNormalPrice = document.querySelector(`.normal-price-for-active[data-block="${blockNumber}"]`);
  selectedNormalPrice.classList.add('active');
  const selectedPremiumPrice = document.querySelector(`.premium-price-for-active[data-block="${blockNumber}"]`);
  selectedPremiumPrice.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a');

  anchorLinks.forEach(function(link) {
    link.addEventListener('dragstart', function(event) {
      // Предотвращаем перетаскивание содержимого при зажатой мышке
      event.preventDefault();
    });
  });
});

async function rearrangeBlocks() {
  const firstIco = document.getElementById('section-2-firstIco');
  const secondIco = document.getElementById('section-2-secondIco');
  const thirdIco = document.getElementById('section-2-thirdIco');
  
  const firstBlock = document.getElementById('section-2-firstBlock');
  const secondBlock = document.getElementById('section-2-secondBlock');
  const thirdBlock = document.getElementById('section-2-thirdBlock');
  
  const container1 = firstIco.parentNode;
  const container2 = firstBlock.parentNode;
  if (window.innerWidth <= 767) {
    container1.insertBefore(secondBlock, secondIco);
    container1.insertBefore(thirdBlock, thirdIco);
  } else {
    container2.insertBefore(secondBlock, firstBlock.nextSibling);
    container2.insertBefore(thirdBlock, secondBlock.nextSibling);
  }
}

if (window.location.href.includes('index.html')) {
  // Call the function on page load and when the window is resized
  window.addEventListener('DOMContentLoaded', rearrangeBlocks);
  window.addEventListener('resize', rearrangeBlocks);
}