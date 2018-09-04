"use strict";

/*新闻资讯部分*/
(function () {
    $.ajax({
        url: "http://192.168.100.250/articleCategory/getAll", //请求新闻列表信息 
        type: "GET",
        success: function success(data) {

            data.forEach(function (currentValue, index, arr) {
                var news_list_nav_html = '<li data-id=' + currentValue.articleCategoryId + ' class="news-list-kind"><a href="news-list.html?newsListId=' + currentValue.articleCategoryId + '">' + currentValue.articleCategoryName + '</a></li>';
                $(".news-list-nav").append(news_list_nav_html);
            });
            /*封装函数在common.js里面*/
            //获取页面链接参数 
            var newsListId = $.getUrlParam('newsListId');
            $(".news-list-nav").children("li").eq(newsListId - 1).addClass("active");
            $.ajax({
                url: "http://192.168.100.250/article/getArticles/" + newsListId + "/1/8",
                type: "GET",
                success: function success(data) {
                    var pagelist = 8; //每页显示的新闻数目
                    var totalList = data.total,
                        //获取数据总条数
                    allPageNum = Math.ceil(totalList / pagelist); //根据每页显示数目获取总页数


                    //分页加载
                    $('.news-list-pagination-box').pagination({
                        mode: 'fixed', //固定显示页码数量，unfixed不固定页码数量
                        coping: true, //是否开启首页尾页功能
                        homePage: '<<', //回到首页
                        endPage: '>>', //回到尾页
                        pageCount: allPageNum, //分页总页数
                        jump: false, //是否开启跳转指定页数
                        callback: function callback(api) {
                            //点击页码执行一次回调函数
                            var nowPage = api.getCurrent(); //获取当前点击页数
                            getNewsListAjax(newsListId, nowPage, pagelist);
                        }
                    }, function () {
                        //插件初始化时调用该方法，比如请求第一次接口来初始化分页配置
                        getNewsListAjax(newsListId, 1, pagelist);
                    });
                },
                error: function error(data) {
                    alert("请求错误！");
                }
            });
        },
        error: function error(data) {
            alert("请求错误！");
        }
    });
})();

/*新闻资讯部分结束*/

/*推荐文章*/
(function () {
    /*封装函数在common.js里面*/
    //获取页面链接参数 
    var newsListId = $.getUrlParam('newsListId');
    $.ajax({
        url: "http://192.168.100.250/article/getRecommendsByCategoryId/" + newsListId + "/8", //请求导航头部的产品信息 
        type: "GET",
        success: function success(data) {
            data.forEach(function (currentValue, index, arr) {
                var recom_article_list_html = "<li class=\"recom-article-list\">\n                        <div class=\"recom-article-list-title\">\n                            <a href=\"news-view.html?newsListId=" + newsListId + "&articleId=" + currentValue.articleId + "\">" + currentValue.articleName + "</a>\n                        </div>\n                    </li>";

                index < 4 ? $(".recom-article-left ul").append(recom_article_list_html) : $(".recom-article-right ul").append(recom_article_list_html);
            });
        }
    });
})();
/*推荐文章结束*/

/*推荐产品*/
(function () {
    /*封装函数在common.js里面*/
    //获取页面链接参数 
    var newsListId = $.getUrlParam('newsListId');
    $.ajax({
        url: "http://192.168.100.250/product/getProRandom/5",
        type: "GET",
        success: function success(data) {
            data.forEach(function (currentValue, index, arr) {
                var recom_products_list_html = "<li class=\"recom-products-list\">\n                        <div class=\"recom-products-list-img\">\n                            <a href=\"prod-view.html?typeId=" + currentValue.proPositionId + "&Id=" + currentValue.proTypeId + "&fid=" + currentValue.proId + "\"><img src=\"" + currentValue.proImgs[0].proImgSrc + "\" alt=\"" + currentValue.proImgs[0].proImgAlt + "\"></a>\n                        </div>\n                        <div class=\"recom-products-list-title\">\n                            <a href=\"prod-view.html?typeId=" + currentValue.proPositionId + "&Id=" + currentValue.proTypeId + "&fid=" + currentValue.proId + "\">" + currentValue.proName + "</a>\n                        </div>\n                    </li>";
                $(".recom-products-list-box ul").append(recom_products_list_html);
            });
        }
    });
})();
/*推荐产品结束*/

/*新闻列表页面分页加载内容*/
function getNewsListAjax(newsListId, nowPage, pagelist) {
    $(".news-list-tab-box ul").empty(); //加载前清空内容
    $.ajax({
        url: "http://192.168.100.250/article/getArticles/" + newsListId + "/" + nowPage + "/" + pagelist + "",
        type: "GET",
        success: function success(data) {
            var datalist = "";
            $.each(data.list, function (i, item) {
                //截取字符串中的标签
                var txt = item.articleText.replace(/<\/?.+?>/g, "").replace(/(^\s+)|(\s+$)/g, "").replace(/\s/g, '');
                //截取指定字数末尾显示省略号
                txt = txt.length < 170 ? txt : txt.substring(0, 170).trim().concat('...');
                datalist += "<li class=\"news-list-details\">\n                            <div class=\"news-list-left\">\n                                <a href=\"news-view.html?newsListId=" + newsListId + "&articleId=" + item.articleId + "\"><img src=\"" + item.articleImg.articleImgSrc + "\" alt=\"" + item.articleImg.articleImgAlt + "\"></a>\n                            </div>\n                            <div class=\"news-list-right\">\n                                <div class=\"news-list-title\">\n                                    <a href=\"news-view.html?newsListId=" + newsListId + "&articleId=" + item.articleId + "\">" + item.articleName + "</a>\n                                </div>\n                                <div class=\"news-list-desc\">" + txt + "</div>\n                                <div class=\"news-list-bottom\">\n                                    <div class=\"news-list-tag-box\">\n                                        <div class=\"news-list-tag\"><a href=\"javascript:viod(0);\">" + item.labelList[0].articleLabelName + "</a></div>\n                                        <div class=\"news-list-tag\"><a href=\"javascript:viod(0);\">" + item.labelList[1].articleLabelName + "</a></div>\n                                    </div>\n                                    <div class=\"news-list-time\">\n                                        <p>" + item.articleAddTime + "</p>\n                                    </div>\n                                </div>\n                            </div>\n                       </li>";
            });
            $(".news-list-tab-box ul").append(datalist);
        }
    });
}