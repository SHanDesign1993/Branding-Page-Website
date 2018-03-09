$(document).ready(function() {
	
	function initLoading(){
		//if (jQuery.support.leadingWhitespace){
			var wh = $(window).height();
			var isLoaded = false;
			
		
			function loading() {
				var imgArray = [];
				$("img").each(function () {
					var s = $(this).attr("src");
					imgArray.push(s);
				});
		
				Array.prototype.remove = function (element) {
				for (var i = 0; i < this.length; i++)
					if (this[i] == element) this.splice(i, 1);
				};
		
				function preload(images, progress) {
					var total = images.length;
					$(images).each(function () {
						var src = this;
						$('<img/>').attr('src', src).load(function () {
							images.remove(src);
							progress(total, total - images.length);
						});
					});
				}
				var now_percent = 0;
				var displaying_percent = 0;
				preload(imgArray,
					function (total, loaded) {
						now_percent = Math.ceil(100 * loaded / total);
					});
				var actual_count = 0;
				var timer = window.setInterval(function () {
					
					if(actual_count<now_percent){
						actual_count++;
					}
					if(actual_count<=36){
						$('#loading .loading_wrap .right_line_1').css('width', (actual_count*1.5)+'%');
						$('#loading .loading_wrap .left_line_1').css('width', (actual_count*1.5)+'%');
					}else if(actual_count<=69){
						$('#loading .loading_wrap .right_line_1').css('width', 50+'%');
						$('#loading .loading_wrap .left_line_1').css('width', 50+'%');
						$('#loading .loading_wrap .right_line_2').css('height', ((actual_count-33)*3)+'%');
						$('#loading .loading_wrap .left_line_2').css('height', ((actual_count-33)*3)+'%');
					}else if(actual_count<100){
						$('#loading .loading_wrap .right_line_1').css('width', 50+'%');
						$('#loading .loading_wrap .left_line_1').css('width', 50+'%');
						$('#loading .loading_wrap .right_line_2').css('height', 105+'%');
						$('#loading .loading_wrap .left_line_2').css('height', 105+'%');
						$('#loading .loading_wrap .right_line_3').css('width', ((actual_count-66)*3)+'%');
						$('#loading .loading_wrap .left_line_3').css('width', ((actual_count-66)*3)+'%');
					}else{
						$('#loading .loading_wrap .right_line_1').css('width', 50+'%');
						$('#loading .loading_wrap .left_line_1').css('width', 50+'%');
						$('#loading .loading_wrap .right_line_2').css('height', 105+'%');
						$('#loading .loading_wrap .left_line_2').css('height', 105+'%');
						$('#loading .loading_wrap .right_line_3').css('width', 55+'%');
						$('#loading .loading_wrap .left_line_3').css('width', 55+'%');
					}
					if(actual_count>=100&&windowLoad){
						window.clearInterval(timer);
						isLoaded = true;
						
						setTimeout(function(){
							$('#loading').fadeOut(600);
							$('#top_banner').addClass('activeMotion');
							$('#header').addClass('activeMotion');
							$('#banner').addClass('activeMotion');
							activeScrollAnimation();
							$(window).trigger('scroll');
						}, 300);
						
					}
				}, 10);
				var windowLoad = false;
				$(window).bind("load", function() {
					windowLoad = true;
				});
				
				var timeout = window.setTimeout(function(){
					window.clearInterval(timer);
					clearTimeout(timeout);
					isLoaded = true;
					$('#loading .loading_wrap .right_line_1').css('width', 50+'%');
					$('#loading .loading_wrap .left_line_1').css('width', 50+'%');
					$('#loading .loading_wrap .right_line_2').css('height', 105+'%');
					$('#loading .loading_wrap .left_line_2').css('height', 105+'%');
					$('#loading .loading_wrap .right_line_3').css('width', 55+'%');
					$('#loading .loading_wrap .left_line_3').css('width', 55+'%');
					
					setTimeout(function(){
						$('#loading').fadeOut(600);
						$('#top_banner').addClass('activeMotion');
						$('#header').addClass('activeMotion');
						$('#banner').addClass('activeMotion');
						activeScrollAnimation();
						$(window).trigger('scroll');
					}, 300);
				}, 5000);
			}
			loading();
/*
		}else{
			$("#loading").hide();
		}
*/
	}
	
	initLoading();
});

function waitForWebfonts(fonts, callback) {
    var loadedFonts = 0;
    for(var i = 0, l = fonts.length; i < l; ++i) {
        (function(font) {
            var node = document.createElement('span');
            // Characters that vary significantly among different fonts
            node.innerHTML = 'giItT1WQy@!-/#';
            // Visible - so we can measure it - but not on the screen
            node.style.position      = 'absolute';
            node.style.left          = '-10000px';
            node.style.top           = '-10000px';
            // Large font size makes even subtle changes obvious
            node.style.fontSize      = '300px';
            // Reset any font properties
            node.style.fontFamily    = 'sans-serif';
            node.style.fontVariant   = 'normal';
            node.style.fontStyle     = 'normal';
            node.style.fontWeight    = 'normal';
            node.style.letterSpacing = '0';
            document.body.appendChild(node);

            // Remember width with no applied web font
            var width = node.offsetWidth;

            node.style.fontFamily = font;

            var interval;
            function checkFont() {
                // Compare current width with original width
                if(node && node.offsetWidth != width) {
                    ++loadedFonts;
                    node.parentNode.removeChild(node);
                    node = null;
                }

                // If all fonts have been loaded
                if(loadedFonts >= fonts.length) {
                    if(interval) {
                        clearInterval(interval);
                    }
                    if(loadedFonts == fonts.length) {
                        callback();
                        return true;
                    }
                }
            };

            if(!checkFont()) {
                interval = setInterval(checkFont, 50);
            }
        })(fonts[i]);
    }
};