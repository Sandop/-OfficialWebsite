"use strict";

/*推荐资讯*/
(function () {
    $.ajax({
        url: "http://192.168.100.250/article/getArticleCenterRecommends", //请求导航头部的产品信息 
        type: "GET",
        success: function success(data) {
            data.forEach(function (currentValue, index, arr) {
                //截取字符串中的标签 /*去除标签*//*去除标签的空格*//*去除文章的空格*/
                var txt = currentValue.articleText.replace(/<\/?.+?>/g, "").replace(/(^\s+)|(\s+$)/g, "").replace(/\s/g, '');

                //第一个显示显示字数至少136个
                if (index == 0) {
                    //截取指定字数末尾显示省略号
                    txt = txt.length < 136 ? txt : txt.substring(0, 136).trim().concat('...');
                } else {
                    txt = txt.length < 42 ? txt : txt.substring(0, 42).trim().concat('...');
                }

                var recom_info_list_html = "<li class=\"recom-info-list\">\n                \t\t<div class=\"recom-info-img\"><a href=\"news-view.html?newsListId=" + currentValue.articleCategoryId + "&articleId=" + currentValue.articleId + "\"><img src=\"" + currentValue.articleImg.articleImgSrc + "\" alt=\"" + currentValue.articleImg.articleImgAlt + "\"></a></div>\n                \t\t<div class=\"recom-info-title-box\">\n                \t\t\t<div class=\"recom-info-title\">\n                \t\t\t\t<a href=\"news-view.html?newsListId=" + currentValue.articleCategoryId + "&articleId=" + currentValue.articleId + "\">" + currentValue.articleName + "</a>\n                \t\t\t</div>\n                \t\t\t<div class=\"recom-info-times\">\n                \t\t\t\t<p>" + currentValue.articleAddTime + "</p>\n                \t\t\t</div>\n                \t\t</div>\n                \t\t<div class=\"recom-info-deesc\">" + txt + "</div>\n                \t\t<div class=\"recom-info-more\">\n                \t\t\t<a href=\"news-view.html?newsListId=" + currentValue.articleCategoryId + "&articleId=" + currentValue.articleId + "\">\u4E86\u89E3\u66F4\u591A</a>\n                \t\t</div>\n                \t</li>";
                $(".recom-info-content ul").append(recom_info_list_html);
            });
        },
        error: function error(data) {
            alert("请求错误！");
        }
    });
})();
/*推荐资讯部分结束*/

/*公司资讯部分*/
(function () {
    //公司资讯数据请求
    $.ajax({
        url: "http://192.168.100.250/article/getRecommendsByCategoryId/1/5", //请求导航头部的产品信息 
        type: "GET",
        success: function success(data) {
            data.forEach(function (currentValue, index, arr) {

                //截取长度三行末尾省略号
                var txt = currentValue.articleText.replace(/<\/?.+?>/g, "").replace(/(^\s+)|(\s+$)/g, "").replace(/\s/g, '').substring(0, 90).trim().concat('...'),
                    company_info_list_html = "<li class=\"company-info-list\">\n                \t\t\t<div class=\"company-info-title\">\n                \t\t\t\t<a href=\"news-view.html?newsListId=" + currentValue.articleCategoryId + "&articleId=" + currentValue.articleId + "\">" + currentValue.articleName + "</a>\n                \t\t\t</div>\n                \t\t\t<div class=\"company-info-desc\">" + txt + "</div>\n                \t\t</li>";
                $(".company-info-content ul").append(company_info_list_html);
            });
        },
        error: function error(data) {
            alert("请求错误！");
        }
    });
})();
/*公司资讯部分结束*/

/*行业资讯部分*/
(function () {
    //行业资讯数据请求
    $.ajax({
        url: "http://192.168.100.250/article/getRecommendsByCategoryId/5/5",
        type: "GET",
        success: function success(data) {
            data.forEach(function (currentValue, index, arr) {
                //截取长度三行末尾省略号
                var txt = currentValue.articleText.replace(/<\/?.+?>/g, "").replace(/(^\s+)|(\s+$)/g, "").replace(/\s/g, '').substring(0, 90).trim().concat('...'),
                    industry_info_list_html = "<li class=\"industry-info-list\">\n                            <div class=\"industry-info-title\">\n                                <a href=\"news-view.html?newsListId=" + currentValue.articleCategoryId + "&articleId=" + currentValue.articleId + "\">" + currentValue.articleName + "</a>\n                            </div>\n                            <div class=\"industry-info-desc\">" + txt + "</div>\n                        </li>";
                $(".industry-info-content ul").append(industry_info_list_html);
            });
        },
        error: function error(data) {
            alert("请求错误！");
        }
    });
})();
/*行业资讯部分结束*/

/*家具百科*/
(function () {
    $.ajax({
        url: "http://192.168.100.250/article/getRecommendsByCategoryId/2/5",
        type: "GET",
        success: function success(data) {
            data.forEach(function (currentValue, index, arr) {
                //截取字符串中的标签
                var txt = currentValue.articleText.replace(/<\/?.+?>/g, "").replace(/(^\s+)|(\s+$)/g, "").replace(/\s/g, '');
                //第一个显示显示字数至少136个
                if (index == 0) {
                    //截取指定字数末尾显示省略号
                    txt = txt.length < 115 ? txt : txt.substring(0, 115).trim().concat('...');
                } else {
                    txt = txt.length < 32 ? txt : txt.substring(0, 32).trim().concat('...');
                }

                var furniture_encyclopedia_list_html = "<li class=\"furniture-encyclopedia-list\">\n\t\t\t\t\t\t<div class=\"fur-ency-list-img\">\n\t\t\t\t\t\t\t<a href=\"news-view.html?newsListId=" + currentValue.articleCategoryId + "&articleId=" + currentValue.articleId + "\"><img src=\"" + currentValue.articleImg.articleImgSrc + "\" alt=\"" + currentValue.articleImg.articleImgAlt + "\"></a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"fur-ency-list-title\">\n\t\t\t\t\t\t\t<a href=\"news-view.html?newsListId=" + currentValue.articleCategoryId + "&articleId=" + currentValue.articleId + "\">" + currentValue.articleName + "</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"fur-ency-list-desc\">" + txt + "</div>\n\t\t\t\t\t\t<div class=\"fur-ency-list-time\">\n\t\t\t\t\t\t\t<p>" + currentValue.articleUpdateTime + "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</li>";
                $(".furniture-encyclopedia-content ul").append(furniture_encyclopedia_list_html);
            });
        },
        error: function error(data) {
            alert("请求错误！");
        }
    });
})();
/*家具百科部分结束*/

/*品牌选购*/
(function () {
    $.ajax({
        url: "http://192.168.100.250/article/getRecommendsByCategoryId/3/5",
        type: "GET",
        success: function success(data) {
            data.forEach(function (currentValue, index, arr) {
                //截取字符串中的标签
                var txt = currentValue.articleText.replace(/<\/?.+?>/g, "").replace(/(^\s+)|(\s+$)/g, "").replace(/\s/g, '');
                //第一个显示显示字数至少136个
                if (index == 0) {
                    //截取指定字数末尾显示省略号
                    txt = txt.length < 115 ? txt : txt.substring(0, 115).trim().concat('...');
                } else {
                    txt = txt.length < 32 ? txt : txt.substring(0, 32).trim().concat('...');
                }

                var brand_selection_list_html = "<li class=\"brand-selection-list\">\n            \t\t\t<div class=\"brand-selection-list-img\">\n            \t\t\t\t<a href=\"news-view.html?newsListId=" + currentValue.articleCategoryId + "&articleId=" + currentValue.articleId + "\"><img src=\"" + currentValue.articleImg.articleImgSrc + "\" alt=\"" + currentValue.articleImg.articleImgAlt + "\"></a>\n            \t\t\t</div>\n            \t\t\t<div class=\"brand-selection-list-title\">\n            \t\t\t\t<a href=\"news-view.html?newsListId=" + currentValue.articleCategoryId + "&articleId=" + currentValue.articleId + "\">" + currentValue.articleName + "</a>\n            \t\t\t</div>\n            \t\t\t<div class=\"brand-selection-list-desc\">" + txt + "</div>\n            \t\t\t<div class=\"brand-selection-list-time\">\n            \t\t\t\t<p>" + currentValue.articleUpdateTime + "</p>\n            \t\t\t</div>\n            \t\t</li>";
                $(".brand-selection-content ul").append(brand_selection_list_html);
            });
        },
        error: function error(data) {
            alert("请求错误！");
        }
    });
})();
/*品牌选购部分结束*/

/*装修摆放*/
(function () {
    $.ajax({
        url: "http://192.168.100.250/article/getRecommendsByCategoryId/4/5",
        type: "GET",
        success: function success(data) {
            data.forEach(function (currentValue, index, arr) {
                var time = currentValue.articleUpdateTime.substring(5, 10);
                var decoration_place_list_html = "<li class=\"decoration-place-list\">\n            \t\t\t<div class=\"decoration-place-img\">\n            \t\t\t\t<a href=\"news-view.html?newsListId=" + currentValue.articleCategoryId + "&articleId=" + currentValue.articleId + "\"><img src=\"" + currentValue.articleImg.articleImgSrc + "\" alt=\"" + currentValue.articleImg.articleImgAlt + "\"></a>\n            \t\t\t</div>\n            \t\t\t<div class=\"decoration-place-title\">\n            \t\t\t\t<a href=\"news-view.html?newsListId=" + currentValue.articleCategoryId + "&articleId=" + currentValue.articleId + "\">" + currentValue.articleName + "</a>\n            \t\t\t</div>\n            \t\t\t<div class=\"decoration-place-time\"><p>" + time + "</p></div>\n            \t\t</li>";
                $(".decoration-place-content ul").append(decoration_place_list_html);
            });
        },
        error: function error(data) {
            alert("请求错误！");
        }
    });
})();
/*装修摆放部分结束*/