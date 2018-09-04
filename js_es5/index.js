"use strict";

/*视频播放*/
$(function () {
    var video = document.getElementById("story-video");
    var src = "../images/index/story-bottom-vedios1.png";
    videoPlay(video, src, "#story-video");
});
/*视频播放*/

/*产品介绍数据获取*/
(function () {
    $.ajax({
        url: "http://192.168.100.250/proCategory/showFirst", //请求产品列表信息 
        type: "GET",
        success: function success(data) {
            data.forEach(function (currentValue, index, arr) {
                var prod_kind_nav_html = '<li data-id=' + currentValue.proCategoryId + ' class="products-kind">' + currentValue.proCategoryName + '</li>';
                $(".products-kind-nav").append(prod_kind_nav_html);
            });
            $(".products-kind-nav").children().eq(0).addClass("active");

            //单个点击进行请求加载
            $(".products-kind").bind("click", function () {
                //导航添加焦点样式                           
                $(this).addClass("active").siblings().removeClass("active");
                //每次点击将内容清空   
                $(".products-tab-box ul").empty();
                var proCategoryId = $(this).attr("data-id");
                $.ajax({
                    url: "http://192.168.100.250/product/selectByPosition/" + proCategoryId + "", //请求详细产品信息 
                    type: "GET",
                    success: function success(data) {
                        data.forEach(function (currentValue, index, arr) {
                            var prod_kind_list_html = "<li class=\"products-kind-list\">\n                                <div class=\"products-kind-list-img\">\n                                    <a href=\"prod-view.html?typeId=" + currentValue.proPositionId + "&Id=" + currentValue.proTypeId + "&fid=" + currentValue.proId + "\"><img src=\"" + currentValue.proImgs[0].proImgSrc + "\" alt=\"" + currentValue.proImgs[0].proImgAlt + "\"></a>\n                                </div>\n                                <div class=\"products-kind-name\">\n                                    <a href=\"prod-view.html?typeId=" + currentValue.proPositionId + "&Id=" + currentValue.proTypeId + "&fid=" + currentValue.proId + "\">" + currentValue.proName + "</a>\n                                </div>\n                                <div class=\"products-kind-price\">\n                                    \uFFE5<span class=\"price-num\">" + currentValue.proPrice + "</span>\n                                </div>\n                            </li>";

                            $(".products-tab-box ul").append(prod_kind_list_html);
                        });
                    },
                    error: function error(data) {
                        alert("请求错误！");
                    }
                });
            });
            //触发默认第一个的点击时间
            $(".products-kind-nav").children().eq(0).trigger('click');
        },
        error: function error(data) {
            alert("请求错误！");
        }
    });
})();
/*产品介绍数据获取*/

/*新闻数据获取*/
(function () {
    $.ajax({
        url: "http://192.168.100.250/articleCategory/getAll", //请求新闻列表信息 
        type: "GET",
        success: function success(data) {
            data.forEach(function (currentValue, index, arr) {

                var news_kind_nav_html = "<li data-id=" + currentValue.articleCategoryId + " class=\"news-kind\">" + currentValue.articleCategoryName + "</li>";
                $(".news-kind-nav").append(news_kind_nav_html);
            });
            $(".news-kind-nav").children().eq(0).addClass("active");

            //单个点击进行请求加载
            $(".news-kind").bind("click", function () {
                //导航添加焦点样式                           
                $(this).addClass("active").siblings().removeClass("active");
                //每次点击将内容清空   
                $(".news-first-box").empty();
                $(".news-list ul").empty();
                var articleCategoryId = $(this).attr("data-id");
                $.ajax({
                    url: "http://192.168.100.250/article/getRecommend/" + articleCategoryId + "", //请求详细产品信息 
                    type: "GET",
                    success: function success(data) {
                        //截取字符串中的标签
                        var txt = data.articleText.replace(/<\/?.+?>/g, "").replace(/(^\s+)|(\s+$)/g, "").replace(/\s/g, '');
                        //截取指定字数末尾显示省略号
                        txt = txt.length < 150 ? txt : txt.substring(0, 150).trim().concat('...');

                        var news_kind_first_html = "<div class=\"news-first\">\n                                    <div class=\"news-first-left\">\n                                        <img src=\"" + data.articleImg.articleImgSrc + "\" alt=\"" + data.articleImg.articleImgAlt + "\">\n                                    </div>\n                                    <div class=\"news-first-right\">\n                                        <div class=\"news-first-right-title-box\">\n                                            <div class=\"news-first-title\">\n                                                <a href=\"news-view.html?newsListId=" + data.articleCategoryId + "&articleId=" + data.articleId + "\">" + data.articleName + "</a>\n                                            </div>\n                                            <div class=\"news-first-times\">\n                                                <p>" + data.articleUpdateTime + "</p>\n                                            </div>\n                                        </div>\n                                        <div class=\"news-first-intro\">" + txt + "</div>\n                                        <div class=\"news-first-more\">\n                                            <a href=\"news-view.html?newsListId=" + data.articleCategoryId + "&articleId=" + data.articleId + "\">\u4E86\u89E3\u66F4\u591A ></a>\n                                        </div>\n                                    </div>\n                                </div>";

                        $(".news-first-box").append(news_kind_first_html);
                    },
                    error: function error(data) {
                        alert("请求错误！");
                    }
                });
                $.ajax({
                    url: "http://192.168.100.250/article/getRecommendsByCategoryId/" + articleCategoryId + "/9",
                    type: "GET",
                    success: function success(data) {
                        data.forEach(function (currentValue, index, arr) {
                            var time = currentValue.articleUpdateTime.slice(5, 10);
                            var news_kind_list_html = "<li>\n                                    <div class=\"news-list-title\">\n                                        <a href=\"news-view.html?newsListId=" + currentValue.articleCategoryId + "&articleId=" + currentValue.articleId + "\">" + currentValue.articleName + "</a>\n                                    </div>\n                                    <div class=\"news-list-times\">\n                                        <p>" + time + "</p>\n                                    </div>\n                                </li>";

                            $(".news-list ul").append(news_kind_list_html);
                        });
                    }
                });
            });
            //触发默认第一个的点击时间
            $(".news-kind-nav").children().eq(0).trigger('click');
        },
        error: function error(data) {
            alert("请求错误！");
        }
    });
})();
/*新闻数据获取*/

/*公共函数部分*/

/*体验馆、产品介绍、新闻资讯部分选项卡切换*/

(function () {
    tabdiv(".experience-place-nav li", ".experience-tab-content .experience-tab-box", "click", 500);
})();

/*公共函数部分结束*/