/*!
 * VERSION: 
 * DATE: 2015-11-05
 * 
 * @author: https://www.bram.us/2013/11/20/scroll-animations/
 **/
jQuery(function($) {
	activeScrollAnimation();
});

function activeScrollAnimation(){
	
    
	
	var doAnimations = function() {
    
    // Calc current offset and get all animatables
    var offset = $(window).scrollTop(),
        $animatables = $('.animatable');
    
    // Unbind scroll handler if we have no animatables
    if ($animatables.size() == 0) {
      //$(window).off('scroll', doAnimations);
    }
    // Check all animatables and animate them if necessary
    $animatables.each(function(i) {
       var $animatable = $(this);
       		//console.log($animatable.attr('id')+'   '+$animatable.offset().top+' window height'+$(window).height()+' scroll:'+offset);
            //if (($animatable.offset().top + $animatable.height() - 100) < offset && !$animatable.hasClass('wait')) {
	        if ($animatable.offset().top < offset+($(window).height()/4)*3 && !$animatable.hasClass('wait')) {
		        if($(window).width()>780&&!$('.iOS').length&&!$('.Android').length){
			       
					$animatable.removeClass('animatable').addClass('animated');
					
					if(!$('.Windows.IE.9').length&&$(window).width()>780&&!$('.iOS').length&&!$('.Android').length){
						if($animatable.find('.pic_4_1').length){
							
							setTimeout(function(){
								pic_4_1.trigger();
							}, 400);
						}
					}
				}
            }
            
            if($animatable.hasClass('must_trig')){
	             if($(window).width()>780&&!$('.iOS').length&&!$('.Android').length){
					$animatable.removeClass('animatable').addClass('animated');
				}
            }
            
            if($(window).width()<=780||$('.iOS').length||$('.Android').length){
	            $animatable.removeClass('needActive').addClass('active');
	            $animatable.removeClass('animatable').addClass('animated');
				$animatable.find('.childAnimate').removeClass('childAnimate');
				$animatable.removeClass('needActive').addClass('activeMotion');
	        }
    });

    };
    
    var doAnimations_1 = function() {
    // Calc current offset and get all animatables
    var offset = $(window).scrollTop(),
        $needActives = $('.needActive');
    
    // Unbind scroll handler if we have no animatables
    if ($needActives.size() == 0) {
      $(window).off('scroll', doAnimations_1);
    }
    
    
    
    $needActives.each(function(i) {
       var $needActive = $(this);
       		//console.log($animatable.attr('id')+'   '+$animatable.offset().top+' window height'+$(window).height()+' scroll:'+offset);
            //if (($animatable.offset().top + $animatable.height() - 100) < offset && !$animatable.hasClass('wait')) {
	        if ($needActive.offset().top < offset+($(window).height()/4)*3 && !$needActive.hasClass('wait')) {
		        if($(window).width()>780&&!$('.iOS').length&&!$('.Android').length){
			       
					$needActive.removeClass('needActive').addClass('activeMotion');
					$needActive.find('.childAnimate').removeClass('childAnimate');
					
					if($needActive.hasClass('eachElements')){
						var counter = 0;
						$needActive.find('.eachElementTrig').each(function(){
							$(this).addClass('el-'+counter);
							if($(this).hasClass('triggerItem')){
								$(this).css('transition-delay', (counter*100+100)+'ms');
							}
							$(this).find('.pic').css('transition-delay', (counter*100+0)+'ms');
							$(this).find('.layer_one').css('transition-delay', (counter*200)+'ms');
							//$(this).find('.layer_two').css('transition-delay', (counter*200)+'ms');
							counter++;
						})
					}
				}
            }
            
            if($needActive.hasClass('must_trig')){
	             if($(window).width()>780&&!$('.iOS').length&&!$('.Android').length){
					$needActive.removeClass('needActive').addClass('active');
					$needActive.find('.childAnimate').removeClass('childAnimate');
				}
            }
            
            if($(window).width()<=780||$('.iOS').length||$('.Android').length){
	            $needActive.removeClass('needActive').addClass('active');
				$needActive.find('.childAnimate').removeClass('childAnimate');
				$needActive.removeClass('needActive').addClass('activeMotion');
	        }
    });

    };
  
  // Hook doAnimations on scroll, and trigger a scroll
    $(window).scroll(doAnimations);
    $(window).scroll(doAnimations_1);
    setTimeout(function(){
	    //$(window).trigger('scroll');
	}, 600);	 
    //$('.main-wrap').scroll(doAnimations);
	
}