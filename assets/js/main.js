$(function() {
	window.scrollBy(0, -1);
	mobileMenu();
	cloneMenu();
	//scrollMenu();
	contactForm();
	Components.Init();
});

function mobileMenu(){
  $(".toggle-container").on('click', function(){
    $(".toggle-container, .mobile-navigation").toggleClass("active");
  });

	$(".mobile-navigation").swipe( {
		//Generic swipe handler for all directions
		swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
			$(".toggle-container, .mobile-navigation").removeClass("active");
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
		threshold: 60
	});
}
function cloneMenu() {
	var $menuItems = $(".menu-items").clone(true);

	// $("").append($menuItems);
	$(".mobile-navigation, .footer-section").prepend($menuItems);

}

/* Ajax Contact Form */
function contactForm() {
  // Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

}

/*
function scrollMenu(){
  var top = 0;
  $(window).scroll(function(){
    var position =$(this).scrollTop();

    if (position > top && position > 500 ){
            //For devices with display smaller then 775px
            if ($(window).width()< 775) {
              $(".mobile-header, .novis-header").fadeOut();
            }else{
              $(".novis-header").fadeOut();
            }

    } else if(position < top-20) {

            if ($(window).width()< 775) {
              $(".novis-header, .mobile-header").fadeIn();
            }else{
              $(".novis-header").fadeIn();
                }
    }
    top = position;
});
}
*/

var Components = {
	sliderControls: function () {

		$.each($("[data-slider-wrap]"), function (index, $wrap) {
			$(this).find("[data-slider-unit]").first().addClass("current");
		});
		$.each($("[data-slider-indicator-wrap]"), function (index, $wrap) {
			$(this).find("[data-slider-indicator]").first().addClass("current");
		});

		$("body").on("click", "[data-slider-control]", function () {
			var clickedControlValue = $(this).attr("data-slider-control");
			var $sliderWrap = $(this).parent().siblings("[data-slider-wrap]");
			var $currentSlider = $sliderWrap.find("[data-slider-unit].current");

			var $indicatorWrap = $(this).parent().siblings("[data-slider-indicator-wrap]");
			var $currentIndicator = $indicatorWrap.find("[data-slider-indicator].current");


			$currentSlider.removeClass("current");
			$currentIndicator.removeClass("current");

			if ( clickedControlValue == "previous" ) {
				if ( $currentSlider.is(":first-child") ) {
					$sliderWrap.find("[data-slider-unit]:last-child").addClass("current");
					$indicatorWrap.find("[data-slider-indicator]:last-child").addClass("current");
				} else {
					$currentSlider.prev().addClass("current");
					$currentIndicator.prev().addClass("current");
				}
			} else {
				if ( $currentSlider.is(":last-child") ) {
					$sliderWrap.find("[data-slider-unit]:first-child").addClass("current");
					$indicatorWrap.find("[data-slider-indicator]:first-child").addClass("current");
				} else {
					$currentSlider.next().addClass("current");
					$currentIndicator.next().addClass("current");
				}
			}

		});
		$("[data-slider-unit]").swipe( {
			//Generic swipe handler for all directions
			swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
				var $indicatorWrap = $(this).parent().siblings("[data-slider-indicator-wrap]");
				var $currentIndicator = $indicatorWrap.find("[data-slider-indicator].current");

				var $currentSlider = $(this);

				$currentSlider.removeClass("current");
				$currentIndicator.removeClass("current");

				if($currentSlider.is(':last-child')){
					$currentSlider.siblings(":first").addClass("current");
					$currentIndicator.siblings(":first").addClass("current");
				} else {
					$currentSlider.next().addClass("current");
					$currentIndicator.next().addClass("current");
				}
			},
			swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
				var $indicatorWrap = $(this).parent().siblings("[data-slider-indicator-wrap]");
				var $currentIndicator = $indicatorWrap.find("[data-slider-indicator].current");

				var $currentSlider = $(this);

				$currentSlider.removeClass("current");
				$currentIndicator.removeClass("current");

				if($currentSlider.is(':first-child')){
					$currentSlider.siblings(":last").addClass("current");
					$currentIndicator.siblings(":last").addClass("current");
				} else {
					$currentSlider.prev().addClass("current");
					$currentIndicator.prev().addClass("current");
				}
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold:0
		});
	},
	gallery: function () {

		function showImage(imageUrl) {
			var $image = "<aside data-galery-view>\n" +
				"\t<img src=\""+imageUrl+"\" alt=\"{{site.title}}\">\n" +
				"</aside>";

			$("body").append($image);
		}
		function closeImage() {
			$("[data-galery-view]").on("click", function () {
				var $this = $(this);
				$this.addClass("remove");
				setTimeout(function () {
					$this.remove();
				}, 600);
			});
		}

		$("body").on("click", "[data-galery] img", function () {
			var imageUrl = $(this).attr("src");

			showImage(imageUrl);
			closeImage();
		});
	},
	Init: function () {
		this.sliderControls();
		this.gallery();
	}
}

$(window).on("load", function () {
	console.log("loaded");
	$(".loader-wrap").addClass("remove");
	setTimeout(function () {
		$(".loader-wrap").remove();
	}, 600);
});