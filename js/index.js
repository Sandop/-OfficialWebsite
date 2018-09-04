
/*视频播放*/
$(function(){
    var video=document.getElementById("story-video");
    var src = "../images/index/story-bottom-vedios1.png"
    videoPlay(video,src,"#story-video");
});
/*视频播放*/

/*产品介绍数据获取*/
(function(){
    $.ajax({  
        url: "http://visney.cn:81/proCategory/showFirst",//请求产品列表信息 
        type: "GET",  
        success: function (data) {  
            data.forEach(function(currentValue, index, arr){  
                var prod_kind_nav_html = '<li data-id='+ currentValue.proCategoryId + ' class="products-kind">' + currentValue.proCategoryName + '</li>'
                $(".products-kind-nav").append(prod_kind_nav_html);    
            });
            $(".products-kind-nav").children().eq(0).addClass("active");  
            
            //单个点击进行请求加载
            $(".products-kind").bind("click",function(){ 
                //导航添加焦点样式                           
                $(this).addClass("active").siblings().removeClass("active"); 
                //每次点击将内容清空   
                $(".products-tab-box ul").empty();                               
                var proCategoryId = $(this).attr("data-id");
                $.ajax({  
                    url: "http://visney.cn:81/product/selectByPosition/"+proCategoryId+"",//请求详细产品信息 
                    type: "GET",  
                    success: function (data) {  
                        data.forEach(function(currentValue, index, arr){ 
                            var prod_kind_list_html = 
                            `<li class="products-kind-list">
                                <div class="products-kind-list-img">
                                    <a href="prod-view.html?typeId=${currentValue.proPositionId}&Id=${currentValue.proTypeId}&fid=${currentValue.proId}"><img src="${currentValue.proImgs[0].proImgSrc}" alt="${currentValue.proImgs[0].proImgAlt}"></a>
                                </div>
                                <div class="products-kind-name">
                                    <a href="prod-view.html?typeId=${currentValue.proPositionId}&Id=${currentValue.proTypeId}&fid=${currentValue.proId}">${currentValue.proName}</a>
                                </div>
                                <div class="products-kind-price">
                                    ￥<span class="price-num">${currentValue.proPrice}</span>
                                </div>
                            </li>`;

                            $(".products-tab-box ul").append(prod_kind_list_html); 
                        })  
                    },  
                    error: function (data) {  
                        alert("请求错误！");  
                    }
                }); 
            });
            //触发默认第一个的点击时间
            $(".products-kind-nav").children().eq(0).trigger('click');
        },  
        error: function (data) {  
            alert("请求错误！");  
        }
    });   
})();
/*产品介绍数据获取*/

/*新闻数据获取*/
(function(){
    $.ajax({  
        url: "http://visney.cn:81/articleCategory/getAll",//请求新闻列表信息 
        type: "GET",  
        success: function (data) {  
            data.forEach(function(currentValue, index, arr){ 

                var news_kind_nav_html = `<li data-id=${currentValue.articleCategoryId} class="news-kind">${currentValue.articleCategoryName}</li>`;
                $(".news-kind-nav").append(news_kind_nav_html);    
            });
            $(".news-kind-nav").children().eq(0).addClass("active");  
            
            //单个点击进行请求加载
            $(".news-kind").bind("click",function(){ 
                //导航添加焦点样式                           
                $(this).addClass("active").siblings().removeClass("active"); 
                //每次点击将内容清空   
                $(".news-first-box").empty();  
                $(".news-list ul").empty();                               
                var articleCategoryId = $(this).attr("data-id");
                $.ajax({  
                    url: "http://visney.cn:81/article/getRecommend/"+articleCategoryId+"",//请求详细产品信息 
                    type: "GET",  
                    success: function (data) {                         
                        //截取字符串中的标签
                        var txt = data.articleText.replace(/<\/?.+?>/g,"").replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,'');
                        //截取指定字数末尾显示省略号
                        txt = txt.length < 150 ? txt : txt.substring(0,150).trim().concat('...');

                        var news_kind_first_html = 
                                `<div class="news-first">
                                    <div class="news-first-left">
                                        <img src="${data.articleImg.articleImgSrc}" alt="${data.articleImg.articleImgAlt}">
                                    </div>
                                    <div class="news-first-right">
                                        <div class="news-first-right-title-box">
                                            <div class="news-first-title">
                                                <a href="news-view.html?newsListId=${data.articleCategoryId}&articleId=${data.articleId}">${data.articleName}</a>
                                            </div>
                                            <div class="news-first-times">
                                                <p>${data.articleUpdateTime}</p>
                                            </div>
                                        </div>
                                        <div class="news-first-intro">${txt}</div>
                                        <div class="news-first-more">
                                            <a href="news-view.html?newsListId=${data.articleCategoryId}&articleId=${data.articleId}">了解更多 ></a>
                                        </div>
                                    </div>
                                </div>`;

                        $(".news-first-box").append(news_kind_first_html);
                       
                    },  
                    error: function (data) {  
                        alert("请求错误！");  
                    }
                });
                $.ajax({  
                    url: "http://visney.cn:81/article/getRecommendsByCategoryId/"+articleCategoryId+"/9", 
                    type: "GET",  
                    success: function (data) {  
                        data.forEach(function(currentValue, index, arr){ 
                            var time = currentValue.articleUpdateTime.slice(5, 10);
                            var news_kind_list_html = 
                                `<li>
                                    <div class="news-list-title">
                                        <a href="news-view.html?newsListId=${currentValue.articleCategoryId}&articleId=${currentValue.articleId}">${currentValue.articleName}</a>
                                    </div>
                                    <div class="news-list-times">
                                        <p>${time}</p>
                                    </div>
                                </li>`;

                            $(".news-list ul").append(news_kind_list_html); 
                        })  
                    }                      
                });  
            });
            //触发默认第一个的点击时间
            $(".news-kind-nav").children().eq(0).trigger('click');
            
        },  
        error: function (data) {  
            alert("请求错误！");  
        }
    });   
})();
/*新闻数据获取*/

/*公共函数部分*/

/*体验馆、产品介绍、新闻资讯部分选项卡切换*/

(function(){
    tabdiv(".experience-place-nav li",".experience-tab-content .experience-tab-box","click",500);
})();

/*公共函数部分结束*/
