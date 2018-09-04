'use strict';

/*新闻页详情*/
(function () {
    /*封装函数在common.js里面*/
    //获取页面链接参数 
    var newsListId = $.getUrlParam('newsListId'),
        articleId = $.getUrlParam('articleId');
    /*新闻标题及内容数据*/
    $.ajax({
        url: "http://192.168.100.250/article/getArticleDetails/" + articleId + "",
        type: "GET",
        success: function success(data) {
            var label_html = '<div class="news-view-tag"><a href="javascript:viod(0);">' + data.labelList[0].articleLabelName + '</a></div>\n            \t\t\t\t    <div class="news-view-tag"><a href="javascript:viod(0);">' + data.labelList[1].articleLabelName + '</a></div>';
            $(".news-view-title p").text(data.articleName);
            $(".news-view-sort-cont").text(data.articleCategory.articleCategoryName);
            $(".news-view-edit-cont").text(data.articleEditor.articleEditorName);
            $(".news-view-access-cont").text(data.pageViews.pageViewsCount);
            $(".news-view-time-cont").text(data.articleUpdateTime);
            $(".news-view-details").html(data.articleText);
            $(".news-view-tag-box").html(label_html);
        }
    });
    /*上下篇数据获取*/
    $.ajax({
        url: "http://192.168.100.250/article/getArticleNextAndBefore/" + newsListId + "/" + articleId + "",
        type: "GET",
        success: function success(data) {
            //新闻条数
            var dataLength = data.list.length,
                prevNewsNull = '<a href="javascript:;"><span>\u4E0A\u4E00\u7BC7:</span><span class="news-view-prev-title">\u6CA1\u6709\u4E0A\u4E00\u7BC7\u5566^_^</span></a>',
                //只有一条数据时候上一篇与下一篇
            nextNewsNull = '<a href="javascript:;"><span>\u4E0B\u4E00\u7BC7:</span><span class="news-view-next-title">\u6CA1\u6709\u4E0B\u4E00\u7BC7\u5566^_^</span></a>',
                prevNewsOnly = '<a href="news-view.html?newsListId=' + newsListId + '&articleId=' + data.list[0].articleId + '"><span>\u4E0A\u4E00\u7BC7:</span><span class="news-view-prev-title">' + data.list[0].articleName + '</span></a>',
                nextNewsOnly = '<a href="news-view.html?newsListId=' + newsListId + '&articleId=' + data.list[0].articleId + '"><span>\u4E0B\u4E00\u7BC7:</span><span class="news-view-prev-title">' + data.list[0].articleName + '</span></a>';

            if (dataLength == 1) {
                if (data.list[0].articleId < articleId) {
                    $(".news-view-prev").html(prevNewsOnly);
                    $(".news-view-next").html(nextNewsNull);
                } else {
                    $(".news-view-prev").html(prevNewsNull);
                    $(".news-view-next").html(nextNewsOnly);
                }
            } else {
                var prevNews = '<a href="news-view.html?newsListId=' + newsListId + '&articleId=' + data.list[0].articleId + '"><span>\u4E0A\u4E00\u7BC7:</span><span class="news-view-prev-title">' + data.list[0].articleName + '</span></a>';
                var nextNews = '<a href="news-view.html?newsListId=' + newsListId + '&articleId=' + data.list[1].articleId + '"><span>\u4E0B\u4E00\u7BC7:</span><span class="news-view-next-title">' + data.list[1].articleName + '</span></a>';
                $(".news-view-prev").html(prevNews);
                $(".news-view-next").html(nextNews);
            }
        }
    });
})();
/*新闻页详情结束*/

/*相关文章*/
(function () {
    /*封装函数在common.js里面*/
    //获取页面链接参数 
    var newsListId = $.getUrlParam('newsListId');
    $.ajax({
        url: "http://192.168.100.250/article/getRecommendsByCategoryId/" + newsListId + "/8", //请求导航头部的产品信息 
        type: "GET",
        success: function success(data) {
            data.forEach(function (currentValue, index, arr) {
                var related_article_list_html = '<li class="related-article-list">\n        \t\t\t\t<div class="related-article-list-title">\n        \t\t            <a href="news-view.html?newsListId=' + currentValue.articleCategoryId + '&articleId=' + currentValue.articleId + '">' + currentValue.articleName + '</a>\n        \t\t\t\t</div>\n        \t\t\t</li>';

                index < 4 ? $(".related-article-left ul").append(related_article_list_html) : $(".related-article-right ul").append(related_article_list_html);
            });
        }
    });
})();
/*相关文章结束*/

/*最新文章*/
(function () {
    $.ajax({
        url: "http://192.168.100.250/article/getArticleNew/6", //请求导航头部的产品信息 
        type: "GET",
        success: function success(data) {
            data.forEach(function (currentValue, index, arr) {
                var latest_article_list_html = '<li class="latest-article-list">\n        \t\t\t\t<div class="latest-article-list-title">\n        \t\t            <a href="news-view.html?newsListId=' + currentValue.articleCategoryId + '&articleId=' + currentValue.articleId + '">' + currentValue.articleName + '</a>\n        \t\t\t\t</div>\n        \t\t\t</li>';

                $(".latest-article-list-box ul").append(latest_article_list_html);
            });
        }
    });
})();
/*最新文章结束*/
/*猜你喜欢*/
(function () {
    /*封装函数在common.js里面*/
    //获取页面链接参数 
    $.ajax({
        url: "http://192.168.100.250/article/getArticleRandom", //请求导航头部的产品信息 
        type: "GET",
        success: function success(data) {
            data.forEach(function (currentValue, index, arr) {
                var love_products_list_html = '<li class="love-products-list">\n        \t\t\t\t<div class="love-products-list-img">\n        \t\t\t\t\t<a href="news-view.html?newsListId=' + currentValue.articleCategoryId + '&articleId=' + currentValue.articleId + '"><img src="' + currentValue.articleImg.articleImgSrc + '" alt="' + currentValue.articleImg.articleImgAlt + '"></a>\n        \t\t\t\t</div>\n        \t\t\t\t<div class="love-products-list-title">\n        \t\t            <a href="news-view.html?newsListId=' + currentValue.articleCategoryId + '&articleId=' + currentValue.articleId + '">' + currentValue.articleName + '</a>\n        \t\t\t\t</div>\n        \t\t\t</li>';
                $(".love-products-list-box ul").append(love_products_list_html);
            });
        }
    });
})();
/*猜你喜欢结束*/