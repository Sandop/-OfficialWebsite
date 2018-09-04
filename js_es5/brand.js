'use strict';

/*头部锚点链接部分*/
(function () {
	var $root = $('html, body');
	$('.h-nav-list-child li a').click(function () {
		$root.animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 500);
		return false;
	});
})();
/*头部锚点链接部分结束*/

/*视频播放*/
$(function () {
	var video = document.getElementById("story-video");
	var src = "../images/brand/story-bottom-vedios1.png";
	videoPlay(video, src, "#story-video");
});
/*视频播放*/