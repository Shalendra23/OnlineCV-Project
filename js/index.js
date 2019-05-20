	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('#status').fadeOut();
		$('#preloader').delay(100).fadeOut('slow');
	});


$(document).ready(function() {
  $(".trigger").click(function() {
    $(".menu").toggleClass("active"); 
  });

  $(document).mousemove(function(event){
    $("#light").css({"top": event.pageY - 250, "left": event.pageX - 300}); 
 }); 


});


var $cont = document.querySelector('.cont');
var $elsArr = [].slice.call(document.querySelectorAll('.el'));
var $closeBtnsArr = [].slice.call(document.querySelectorAll('.el__close-btn'));

setTimeout(function() {
  $cont.classList.remove('s--inactive');
}, 200);

$elsArr.forEach(function($el) {
  $el.addEventListener('click', function() {
    if (this.classList.contains('s--active')) return;
    $cont.classList.add('s--el-active');
    this.classList.add('s--active');
  });
});

$closeBtnsArr.forEach(function($btn) {
  $btn.addEventListener('click', function(e) {
    e.stopPropagation();
    $cont.classList.remove('s--el-active');
    document.querySelector('.el.s--active').classList.remove('s--active');
  });
});

//-----------------------------------
var swiper = new Swiper('.swiper-container', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows : true,
  },
  pagination: {
    el: '.swiper-pagination',
  },
});
//-------------------------------
/**
 * morpher() morph a text to another
 * It loops over chars to morph the text
 *
 * @param {Element} element
 * @param {String} start
 * @param {String} end
 */
const morpher = (element, start, end) => {
  /**
                                           * Write parameters
                                           *
                                           * [1] : chars is an array of characters you choose to randomly morph the text between start and end
                                           * [2] : duration is the duration of the global morph
                                           * [3] : frameRate is the speed of the morph for each letter
                                           */
  const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '%', '$', '?', '!']; /*[1]*/
  const duration = 2; /*[2]*/
  const frameRate = 25; /*[3]*/

  /**
                                 * Write text variables
                                 */
  const string = start.split('');
  const result = end.split('');
  const slen = string.length;
  const rlen = result.length;

  /**
                               * Write time variables
                               */
  let present = new Date();
  let past = present.getTime();
  let count = 0;
  let spentTime = 0;
  // SplitTime  = milliseconds / letters
  let splitTime = duration * 1000 / Math.max(slen, rlen);

  const update = () => {
    // Update present date and spent time
    present = new Date();
    spentTime += present.getTime() - past;

    // Random letters
    for (let i = count; i < Math.max(slen, rlen); i++) {
      const random = Math.floor(Math.random() * (chars.length - 1));
      // Change letter
      string[i] = chars[random];
    }

    // Morph letters from start to end
    if (spentTime >= splitTime) {
      // Update count of letters to morph
      count += Math.floor(spentTime / splitTime);
      // Morphing
      for (let j = 0; j < count; j++) {
        string[j] = result[j] || null;
      }
      // Reset spent time
      spentTime = 0;
    }

    // Update DOM
    element.textContent = string.join('');

    // Save present date
    past = present.getTime();

    // Loop
    if (count < Math.max(slen, rlen)) {
      // Only use a setTimeout if the frameRate is lower than 60FPS
      // Remove the setTimeout if the frameRate is equal to 60FPS
      setTimeout(() => {
        window.requestAnimationFrame(update);
      }, 1000 / frameRate);
    }
  };

  // Start loop
  update();
};

$(() => {
  const button = document.querySelector('.js-morph-trigger');
  const morph = document.querySelector('*[data-morph]');
  const words = ["Web Designer", "UX Designer", "Coder", "UI Designer", "Full Stack Web Developer"];

  let counter = 0;

  setInterval(() => {
    const start = morph.textContent;
    const end = words[counter];

    morpher(morph, start, end);

    if (counter < words.length - 1) {
      counter++;
    } else {
      counter = 0;
    }
  }, 4000);
});

// card fold

( function( $ ) {
	
	$.fn.hoverfold = function( args ) {

		this.each( function() {
		
			$( this ).children( '.view' ).each( function() {
			
				var $item 	= $( this ),
					img		= $item.children( 'img' ).attr( 'src' ),
					struct	= '<div class="slice s1">';
						struct	+='<div class="slice s2">';
							struct	+='<div class="slice s3">';
								struct	+='<div class="slice s4">';
									struct	+='<div class="slice s5">';
									struct	+='</div>';
								struct	+='</div>';
							struct	+='</div>';
						struct	+='</div>';
					struct	+='</div>';
					
				var $struct = $( struct );
				
				$item.find( 'img' ).remove().end().append( $struct ).find( 'div.slice' ).css( 'background-image', 'url(' + img + ')' ).prepend( $( '<span class="overlay" ></span>' ) );
				
			} );
			
		});

	};

} )( jQuery );