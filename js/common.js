jQuery(document).ready(function () {
	setBasicVisualContent();//閮剖�𡁜抅�𧋦閬𤥁死霈𦠜��
	adjustPosition();
	setSVG();
	detectBroswer();
});

function detectBroswer(){
	var user = detect.parse(navigator.userAgent);
	
	var navU = navigator.userAgent;
	var isAndroidMobile = navU.indexOf('Android') > -1 && navU.indexOf('Mozilla/5.0') > -1 && navU.indexOf('AppleWebKit') > -1;
	
	var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
	var resultAppleWebKitRegEx = regExAppleWebKit.exec(navU);
	var appleWebKitVersion = (resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(navU)[1]));
	
	var regExChrome = new RegExp(/Chrome\/([\d.]+)/);
	var resultChromeRegEx = regExChrome.exec(navU);
	var chromeVersion = (resultChromeRegEx === null ? null : parseFloat(regExChrome.exec(navU)[1]));
	
	var isAndroidBrowser = isAndroidMobile && (appleWebKitVersion !== null && appleWebKitVersion < 537) || (chromeVersion !== null && chromeVersion < 37);
	
	if(isAndroidBrowser){
		$('body').addClass('Android_native_browser');
	}
	if(isMsEdge()){
		$('body').addClass('IE Windows edge');
	}else{
		$('body').addClass(user.browser.family+' '+user.browser.version+' '+user.os.name);
	}
	
	if(user.browser.version=='9'&&user.browser.family=='IE'){
		$('body').addClass('old-IE');
	}
	//console.log(user.browser.family+' '+user.browser.version+' '+user.os.name);
	
}

function setSVG(){
	/*
	 * Replace all SVG images with inline SVG
	 */
	jQuery('img.svg:not(.hasSet)').each(function(){
		$(this).addClass('hasSet');
	    var $img = jQuery(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');
	
	    jQuery.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');
	
	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }
	
	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');
	
	        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
	        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	        }
	
	        // Replace image with new SVG
	        $img.replaceWith($svg);
	
	    }, 'xml');
	
	});
}


//閮剖�𡁜抅�𧋦閬𤥁死霈𦠜��
function setBasicVisualContent(){
	TweenLite.set($('.opacity-first'), {opacity:0});
	$('.ieBackgroundCover').css( "background-size", "cover" );
	$('.ieBackgroundContain').css( "background-size", "contain" );
	
	
	
	if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ){
		$('.action-opacity').each(function(){
			$(this).hover(
				function(){
					TweenLite.to(this, 0.3, {opacity:0.7});
				},function(){
					TweenLite.to(this, 0.3, {opacity:1});
				}
			);
		});
		
		
		$('.action-scale').each(function(){
			$(this).hover(
				function(){
					TweenLite.to(this, 0.3, {scale:1.1});
				},function(){
					TweenLite.to(this, 0.3, {scale:1});
				}
			);
		});
	}
	
	
	$(".disable-link").click(function(e){
		e.preventDefault();
	});
	
	$(".coming_soon a").click(function(e){
		e.preventDefault();
	});
	
	$(window).resize(function(){
		adjustPosition();
	});

    
	$('.scroll-link').click(function(e){
		e.preventDefault();
		var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
		var headerDistance = 95;
		if($(window).width()<992){
			headerDistance = 65;
		}else{
			
		}
		$body.animate({
			scrollTop: $('#'+$(this).attr('scroll-target')).offset().top-headerDistance
		}, 300);
	})
	
	if(getUrlParam('section')){
		if($('#'+getUrlParam('section')).length){
			setTimeout(function(){
				var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
				var headerDistance = 95;
				if($(window).width()<992){
					headerDistance = 65;
				}else{
					
				}
				$body.animate({
					scrollTop: $('#'+getUrlParam('section')).offset().top-headerDistance
				}, 300);
			}, 1000);
		}
	}
	
	if(getUrlParam('lcp_page0')){
		setTimeout(function(){
			var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
			var headerDistance = 115;
			if($(window).width()<992){
				headerDistance = 70;
			}else{
				
			}
			$body.animate({
				scrollTop: $('#news_list').offset().top-headerDistance
			}, 600);
		}, 1300);
	}
	
/*
	$(".fancybox").fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		padding     : 0,
		beforeShow: function () {
            
        }
	});
*/
}


function adjustPosition(){
	
	
	function changeFullScreen(){
		$('.fullScreenSize').css({
			'width': $(window).width(),
			'height': $(window).height()
		});
		
		$('#menu').css('height', '100vh');
	}
	
	$(window).resize(changeFullScreen);
	changeFullScreen();
}


function getIEVersion()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");  //for IE 11
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

//�㬢��𣇉雯��敺䔶�见��彍
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //瑽钅�牐��见鉄��厩𤌍璅坔��彍��甇���”�𥪜�誩�滩情
	var r = window.location.search.substr(1).match(reg);  //�龪�滨𤌍璅坔��彍
	if (r != null) return unescape(r[2]); return null; //餈𥪜�𧼮��彍��
}


function msieversion() {
	var returnVal = true;
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

	if (msie > 0){
    //if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){     // If Internet Explorer, return version number
    	//returnVal = false;
        //alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
        if(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)))>10){
            returnVal = true;
        }else{
	        returnVal = true;
        }
    }else{                // If another browser, return 0
        //alert('otherbrowser');
        //returnVal = true;
        if(navigator.appName == "Netscape"){
	     	
	     	if(navigator.appVersion.indexOf('Trident') === -1){
		     	returnVal = false;
	     	}else{
		     	returnVal = true;
	     	}
	    }else{
		    returnVal = false;
	    }
    }
   return returnVal;
}

function isMsEdge(){
	if (/Edge\/\d./i.test(navigator.userAgent)){
	   return true;
	}else{
		return false;
	}
}

function isRetinaDisplay() {
    if (window.matchMedia) {
        var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
        return (mq && mq.matches || (window.devicePixelRatio > 1));
    }
}