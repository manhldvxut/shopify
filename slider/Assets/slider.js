
$( document ).ready(function() {

	$('.index_recomen_list_RtoL').slick({
	    autoplay: true,
	    dots: false,
	    infinite: true,
		speed: 800,
		slidesToShow: 4,
	    responsive: [
	      {
	        breakpoint: 1024,
	        settings:{
	          slidesToShow: 2
	        }
	      },
	      {
	        breakpoint: 768,
	        settings:{
	          slidesToShow:1
	        }
	      },
	    ]
	});

})
