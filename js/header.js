jQuery(document).ready(function () {
	initHeader();
});


function initHeader(){
	$('#menu_btn').click(activeMenu);
	
	$(window).scroll(function(){
		scrollHeader();
	})
	
	$(window).resize(function(){
		scrollHeader();
	})
	
	scrollHeader();
}

function activeMenu(){
	if(!$('#header').hasClass('activemenu')){
		$('#header').addClass('activemenu');
		$('#menu_btn').addClass('active');
		$('#header #menu').show();
		setTimeout(function(){
			$('#header #menu').addClass('activeMotion');
		}, 100);
		TweenLite.to($('#header #menu'), 0.4, {opacity:1, scale: 1, ease: Power2.easeOut});
	}else{
		
		$('#menu_btn').removeClass('active');
		$('#header #menu').removeClass('activeMotion');
		TweenLite.to($('#header #menu'), 0.4, {opacity:0, scale: 0.9, ease: Power2.easeOut, onComplete: function(){
			$('#header #menu').hide();
			$('#header #menu').removeClass('activeMotion');
			$('#header').removeClass('activemenu');
		}});
	}
}

function scrollHeader(){
	var distacne = $(window).scrollTop();
	
	
	if($(window).width()<769){
		$('#header').addClass('stick');
	}else{
		if(distacne>100){
			$('#header').addClass('stick');
		}else{
			$('#header').removeClass('stick');
			//$('#header').css('top', $(window).height());
		}
	}
}