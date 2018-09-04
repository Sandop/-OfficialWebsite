/*head start*/
$(function(){

	//页面对应的参数，index.html对应1
	var navId = {
		"index" : 1,
		"brand" : 2,
		"experice" : 3,
		"experice-bt" : 3,
		"experice-cd" : 3,
		"experice-dg" : 3,
		"experice-nj" : 3,
		"products" : 4,
		"news-list" : 5,
		"prod-view" : 10,
		"prod-list" : 11,
		"news" : 12,
		"news-view" : 13,
		"join" : 14,
		"pre-sales" : 15,
		"after-sales" : 16,
		"contact" : 17,
		"questions" : 18,
		"questions-view" : 18
	};

	var pathName = window.location.pathname;  //获取链接
	var pairs = pathName.split("/");
	var txtName = pairs[pairs.length - 1].split(".")[0];  //取得例如index.html中的index
	if (!txtName) {txtName = "index";}
	/*为头部添加meta标签*/
	$.ajax({
		url:"http://visney.cn:81/NavigationMeta/get/"+ navId[txtName] +"",
		type:"GET",
		success:function (data) {
			var meta_html = `
					<meta name="keywords" content="${data.navigationKeyword}">
					<meta name="description" content="${data.navigationDescription}">
					<title>${data.navigationTitle}</title>
			`;
			$("head").prepend(meta_html);
		}
	});

	//判断是否为首页，产品综合页、产品列表页 职位这三个页面添加轮播图部分
	if ( navId[txtName] == 1 || navId[txtName] == 4 || navId[txtName] == 11 ) {
		$.ajax({
			url:"http://visney.cn:81/banner/selectAllByTpye/"+ navId[txtName] +"",
			type:"GET",
			success:function (data) {
				data.forEach(function(item,index,arr){
					var part_html = `
						<div class="b-c-part">
							<img src="${item.bannerSrc}" alt="${item.bannerAlt}">
						</div>
					`;
					var li_html = `<li></li>`;

					$(".i-b-container").append(part_html);
					$(".i-b-tab ul").append(li_html);
				});
			},
			complete:function(){
				/*轮播图部分开始*/
				(function (){
					var $tab = $('.banner .i-b-tab ul li'),
						$part = $('.banner .i-b-container .b-c-part'),
						$banner = $('.banner'),
						$btn = $('.banner .i-b-btn div'),
						length = $tab.length,
						clickTime = 0,
						index = 0,
						timer = null;

						$tab.eq(0).addClass('on');
						$part.eq(0).show();
						
						$tab.click(function(){
							tabChange(function(){
								index = $(this).index();
							}.bind(this));
						});

						$btn.click(function (){
							if (new Date() - clickTime > 550) {

								if ($(this).index()) {
									tabChange(function(){
										index ++;
										index %= length;
									}) ;
								} else {
									tabChange(function(){
										index --;
										if(index < 0)index = length - 1;
									}) ;
								}

								clickTime = new Date();
							}
						});

						auto();
						$banner.hover(function(){
							clearInterval(timer);
						},auto);

						function auto(){
							timer = setInterval(function(){
								tabChange(function(){
									index ++;
									index %= length;
								}) ;
							},3000);
						}
						function tabChange(fn){
							$part.eq(index).fadeOut(500);
							$tab.eq(index).removeClass('on');
							fn && fn();
							$part.eq(index).fadeIn(500);
							$tab.eq(index).addClass('on');
						}
				})();
				/*轮播图部分结束*/
			}
		});
	}
});
/*head end*/
/*head nav start*/

//头部导航滚动时候固定
(function(){
	$(window).scroll(function(){
		var $this = $(this);
		var top = $(this).scrollTop();
		if( top  >= 100){
			$("#index-header").addClass("fixedTop");
			$("#common-banner").addClass("marginTop");
			$("#index-banner").addClass("marginTop");
		} else {
			$("#index-header").removeClass("fixedTop");
			$("#common-banner").removeClass("marginTop");
			$("#index-banner").removeClass("marginTop");
		}
	})
})();

//ajax请求后台产品导航、新闻导航列表
(function(){
	jqajax();
    function jqajax(){  
        $.ajax({  
            url: "http://visney.cn:81/proCategory/showAll/main",//请求导航头部的产品信息 
            type: "GET",  
            success: function (data) {  

                data.forEach(function(currentValue, index, arr){  

                	var dataChild = data[index].children;
                	var head_navProd_html = `<li>
                							<a href="prod-list.html?typeId=${currentValue.proCategoryId}">${currentValue.proCategoryName}</a>
                							<a href="prod-list.html?typeId=${currentValue.proCategoryId}">全部</a>
                							<ul class="nav-childProd"></ul>
                						</li>`;

					var foot_navProd_html = `<li>
											<a href="prod-list.html?typeId=${currentValue.proCategoryId}">${currentValue.proCategoryName}</a>
										</li>`;
                    $(".h-nav-list-childProd").append(head_navProd_html); 
                    $(".footer-nav-childProd").append(foot_navProd_html); 

                    var head_navProdChild_html = "";
                    dataChild.forEach(function(item,num){
                    	head_navProdChild_html += `	<li>
							                    		<a href="prod-list.html?typeId=${currentValue.proCategoryId}&Id=${item.proCategoryId}">${item.proCategoryName}</a>
							                    	</li>`;
                    });
                	$(".h-nav-list-childProd>li").eq(index).find("ul.nav-childProd").append(head_navProdChild_html);

                })  
            },  
            error: function (data) {  
                alert("请求错误！");  
            }
        }); 
        $.ajax({  
            url: "http://visney.cn:81/articleCategory/getAll",//请求导航头部的新闻信息 
            type: "GET",  
            success: function (data) {  
                data.forEach(function(currentValue, index, arr){  
                	var navNews_html = `<li><a href="news-list.html?newsListId=${currentValue.articleCategoryId}">${currentValue.articleCategoryName}</a></li>`;
                    $(".h-nav-list-childNews").append(navNews_html);
                    $(".footer-nav-childNews").append(navNews_html);    
                })  
            },  
            error: function (data) {  
                alert("请求错误！");  
            }
        }); 
    };    
})();
/*head nav end*/



/*底部部分 start*/
/*(function(){
	$(".footer-code>div").click(function(){
		$(".footer-code>div").find('.code-pic').removeClass("active");
		$(this).find('.code-pic').addClass("active");
	});
})();*/
/*底部部分结束*/


/*获取链接中参数的方法封装*/
(function($){
    $.getUrlParam = function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) 
        	return unescape(r[2]); 
        return '';
    }
})(jQuery);

/*体验馆调用*/
(function(){
    tabdiv(".place_tag_box ul li",".place_desc_right ul li","click",500);
})();
//页签切换函数
function tabdiv(tab,div,event,speed){
    speed=isNaN(speed)?0:speed;
    $(tab).eq(0).addClass("active");
    $(div).each(function(index, element) {
        $(this).attr("idx",index);
    });
    $(tab).each(function(index, element) {
        $(this).bind(event,function(){
            $(tab).removeClass("active");
            $(this).addClass("active");
            $(div+"[idx='"+index+"']").fadeIn(speed);
            $(div+"[idx!='"+index+"']").hide();
        });
    });
}

/* 视频点击播放暂停函数封装 */
function videoPlay(video,src,node){
	var isFirefox = window.navigator.userAgent.toUpperCase().indexOf("FIREFOX");
	if (isFirefox > 0) {
		$(node).attr("poster",src);
	}
	video.onclick=function(){
		video.paused ? video.play() : video.pause();
	}
}
