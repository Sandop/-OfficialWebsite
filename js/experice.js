/*视频播放*/
$(function(){
    var video=document.getElementById("story-video");
    videoPlay(video);
});
/*视频播放*/
/*For what design start*/
$(function(){
	var _index = 0;
	var _clerTime = null;
	var length = $(".experience_dot_nav li").length;
	console.log(length)
	//底部圆点点击事件
	$(".experience_dot_nav li").click(function(){
		_index = $(this).index();
		clearInterval(_clerTime); 	//停止定时器
		start();
	});
	//左侧按钮点击事件
	/*$(".btn_left").click(function(){
		_index --;
		if (_index < 0) {
			_index = length;
		}
		clearInterval(_clerTime);
		start();
	});*/
	//右侧按钮点击事件
	/*$(".btn_right").click(function(){
		_index ++;
		if (_index > length) {
			_index = 0;
		}
		clearInterval(_clerTime);
		start();
	});*/
	//鼠标移入圆点，左右按钮，内容 停止自动播放
	$(".experience_dot_nav li,.experience_tab_content").hover(function(){
		clearInterval(_clerTime);
	},function(){
		autoStart();
	});

	function start(){
		$(".experience_dot_nav li").eq(_index).addClass("active").siblings().removeClass("active");
		$(".experience_tab_content .experience_tab_box").eq(_index).fadeIn(300).siblings().hide();
	}

	//定时器
	function autoStart(){
		_clerTime = setInterval(function () {
			_index ++;
			if (_index > length) {
				_index = 0;
			}
			start();
		},3500);
	}


	//执行自动播放
	autoStart();
});

/*For what design end*/
