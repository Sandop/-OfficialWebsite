/*推荐资讯*/
(function(){
    $.ajax({  
        url: "http://visney.cn:81/article/getArticleCenterRecommends",//请求导航头部的产品信息 
        type: "GET",  
        success: function (data) {  
            data.forEach(function(currentValue, index, arr){ 
            	//截取字符串中的标签 /*去除标签*//*去除标签的空格*//*去除文章的空格*/
                var txt = currentValue.articleText.replace(/<\/?.+?>/g,"").replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,'');

            	//第一个显示显示字数至少136个
            	if (index == 0) {
            		//截取指定字数末尾显示省略号
            		txt = txt.length < 136 ? txt : txt.substring(0,136).trim().concat('...');
            	} else {
            		txt = txt.length < 42 ? txt : txt.substring(0,42).trim().concat('...');
            	}
            	
            	var recom_info_list_html = 
                	`<li class="recom-info-list">
                		<div class="recom-info-img"><a href="news-view.html?newsListId=${currentValue.articleCategoryId}&articleId=${currentValue.articleId}"><img src="${currentValue.articleImg.articleImgSrc}" alt="${currentValue.articleImg.articleImgAlt}"></a></div>
                		<div class="recom-info-title-box">
                			<div class="recom-info-title">
                				<a href="news-view.html?newsListId=${currentValue.articleCategoryId}&articleId=${currentValue.articleId}">${currentValue.articleName}</a>
                			</div>
                			<div class="recom-info-times">
                				<p>${currentValue.articleAddTime}</p>
                			</div>
                		</div>
                		<div class="recom-info-deesc">${txt}</div>
                		<div class="recom-info-more">
                			<a href="news-view.html?newsListId=${currentValue.articleCategoryId}&articleId=${currentValue.articleId}">了解更多</a>
                		</div>
                	</li>`;
                $(".recom-info-content ul").append(recom_info_list_html); 
            })  
        },  
        error: function (data) {  
            alert("请求错误！");  
        }
    }); 
})();
/*推荐资讯部分结束*/

/*公司资讯部分*/
(function(){
	//公司资讯数据请求
	$.ajax({  
        url: "http://visney.cn:81/article/getRecommendsByCategoryId/1/5",//请求导航头部的产品信息 
        type: "GET",  
        success: function (data) {  
            data.forEach(function(currentValue, index, arr){ 

            	//截取长度三行末尾省略号
                var txt = currentValue.articleText.replace(/<\/?.+?>/g,"").replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,'').substring(0,90).trim().concat('...'),
                company_info_list_html = 
                		`<li class="company-info-list">
                			<div class="company-info-title">
                				<a href="news-view.html?newsListId=${currentValue.articleCategoryId}&articleId=${currentValue.articleId}">${currentValue.articleName}</a>
                			</div>
                			<div class="company-info-desc">${txt}</div>
                		</li>`;
                $(".company-info-content ul").append(company_info_list_html); 
            })  
        },  
        error: function (data) {  
            alert("请求错误！");  
        }
    });
	
})();
/*公司资讯部分结束*/

/*行业资讯部分*/
(function(){
    //行业资讯数据请求
    $.ajax({  
        url: "http://visney.cn:81/article/getRecommendsByCategoryId/5/5",
        type: "GET",  
        success: function (data) {  
            data.forEach(function(currentValue, index, arr){ 
                //截取长度三行末尾省略号
                var txt = currentValue.articleText.replace(/<\/?.+?>/g,"").replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,'').substring(0,90).trim().concat('...'),
                industry_info_list_html = 
                        `<li class="industry-info-list">
                            <div class="industry-info-title">
                                <a href="news-view.html?newsListId=${currentValue.articleCategoryId}&articleId=${currentValue.articleId}">${currentValue.articleName}</a>
                            </div>
                            <div class="industry-info-desc">${txt}</div>
                        </li>`;
                $(".industry-info-content ul").append(industry_info_list_html); 
            })  
        },  
        error: function (data) {  
            alert("请求错误！");  
        }
    });
    
})();
/*行业资讯部分结束*/

/*家具百科*/
(function(){
    $.ajax({  
        url: "http://visney.cn:81/article/getRecommendsByCategoryId/2/5",
        type: "GET",  
        success: function (data) {  
            data.forEach(function(currentValue, index, arr){
            	//截取字符串中的标签
            	var txt = currentValue.articleText.replace(/<\/?.+?>/g,"").replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,'');
            	//第一个显示显示字数至少136个
            	if (index == 0) {
            		//截取指定字数末尾显示省略号
            		txt = txt.length < 115 ? txt : txt.substring(0,115).trim().concat('...');
            	} else {
            		txt = txt.length < 32 ? txt : txt.substring(0,32).trim().concat('...');
            	}
            	
            	var furniture_encyclopedia_list_html = 
                	`<li class="furniture-encyclopedia-list">
						<div class="fur-ency-list-img">
							<a href="news-view.html?newsListId=${currentValue.articleCategoryId}&articleId=${currentValue.articleId}"><img src="${currentValue.articleImg.articleImgSrc}" alt="${currentValue.articleImg.articleImgAlt}"></a>
						</div>
						<div class="fur-ency-list-title">
							<a href="news-view.html?newsListId=${currentValue.articleCategoryId}&articleId=${currentValue.articleId}">${currentValue.articleName}</a>
						</div>
						<div class="fur-ency-list-desc">${txt}</div>
						<div class="fur-ency-list-time">
							<p>${currentValue.articleUpdateTime}</p>
						</div>
					</li>`;
                $(".furniture-encyclopedia-content ul").append(furniture_encyclopedia_list_html); 
            })  
        },  
        error: function (data) {  
            alert("请求错误！");  
        }
    }); 
})();
/*家具百科部分结束*/

/*品牌选购*/
(function(){
    $.ajax({  
        url: "http://visney.cn:81/article/getRecommendsByCategoryId/3/5",
        type: "GET",  
        success: function (data) {  
            data.forEach(function(currentValue, index, arr){
            	//截取字符串中的标签
            	var txt = currentValue.articleText.replace(/<\/?.+?>/g,"").replace(/(^\s+)|(\s+$)/g,"").replace(/\s/g,'');
            	//第一个显示显示字数至少136个
            	if (index == 0) {
            		//截取指定字数末尾显示省略号
            		txt = txt.length < 115 ? txt : txt.substring(0,115).trim().concat('...');
            	} else {
            		txt = txt.length < 32 ? txt : txt.substring(0,32).trim().concat('...');
            	}
            	
            	var brand_selection_list_html = 
            		`<li class="brand-selection-list">
            			<div class="brand-selection-list-img">
            				<a href="news-view.html?newsListId=${currentValue.articleCategoryId}&articleId=${currentValue.articleId}"><img src="${currentValue.articleImg.articleImgSrc}" alt="${currentValue.articleImg.articleImgAlt}"></a>
            			</div>
            			<div class="brand-selection-list-title">
            				<a href="news-view.html?newsListId=${currentValue.articleCategoryId}&articleId=${currentValue.articleId}">${currentValue.articleName}</a>
            			</div>
            			<div class="brand-selection-list-desc">${txt}</div>
            			<div class="brand-selection-list-time">
            				<p>${currentValue.articleUpdateTime}</p>
            			</div>
            		</li>`;
                $(".brand-selection-content ul").append(brand_selection_list_html); 
            })  
        },  
        error: function (data) {  
            alert("请求错误！");  
        }
    }); 
})();
/*品牌选购部分结束*/

/*装修摆放*/
(function(){
    $.ajax({  
        url: "http://visney.cn:81/article/getRecommendsByCategoryId/4/5",
        type: "GET",  
        success: function (data) {  
            data.forEach(function(currentValue, index, arr){
            	var time = currentValue.articleUpdateTime.substring(5,10);
            	var decoration_place_list_html = 
            		`<li class="decoration-place-list">
            			<div class="decoration-place-img">
            				<a href="news-view.html?newsListId=${currentValue.articleCategoryId}&articleId=${currentValue.articleId}"><img src="${currentValue.articleImg.articleImgSrc}" alt="${currentValue.articleImg.articleImgAlt}"></a>
            			</div>
            			<div class="decoration-place-title">
            				<a href="news-view.html?newsListId=${currentValue.articleCategoryId}&articleId=${currentValue.articleId}">${currentValue.articleName}</a>
            			</div>
            			<div class="decoration-place-time"><p>${time}</p></div>
            		</li>`;
                $(".decoration-place-content ul").append(decoration_place_list_html); 
            })  
        },  
        error: function (data) {  
            alert("请求错误！");  
        }
    }); 
})();
/*装修摆放部分结束*/