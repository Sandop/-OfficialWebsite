/**/
(function(){
	$.ajax({  
	       url: "http://visney.cn:81/article/getArticles/20/1/8", 
	       type: "GET",  
	       success: function (data) {
	       		var pagelist = 8;   //每页显示的新闻数目
	           	var totalList = data.total, //获取数据总条数
	               	allPageNum = Math.ceil(totalList / pagelist);       //根据每页显示数目获取总页数

	            

	            //分页加载
	            $('.questions_list_pagination_box').pagination({
	                mode:'fixed',   //固定显示页码数量，unfixed不固定页码数量
	                coping: true,   //是否开启首页尾页功能
	                homePage: '<<', //回到首页
	                endPage: '>>',  //回到尾页
	                pageCount: allPageNum,  //分页总页数
	                jump: false,    //是否开启跳转指定页数
	                callback: function (api) {
	                    var nowPage = api.getCurrent(); //获取当前点击页数
	                    getQuesListAjax(20,nowPage,pagelist);
	                }
	            },function(){   //插件初始化时调用该方法，比如请求第一次接口来初始化分页配置
                    //默认显示第一页的内容
                    getQuesListAjax(20,1,pagelist);
                });
	           
	      },  
	      error: function (data) {  
	          alert("请求错误！");  
	      }
	  });
})();
/**/

/*常见问题页面请求*/
function getQuesListAjax(newsListId,nowPage,pagelist){
    $(".questions_list_box ul").empty(); //加载前清空内容
    $.ajax({  
       url: "http://visney.cn:81/article/getArticles/"+newsListId+"/"+nowPage+"/"+pagelist+"",//请求导航头部的产品信息 
       type: "GET",  
       success: function (data) {
           var datalist = "";
           $.each(data.list, function(i, item) { 
               //截取字符串中的标签
               var txt = item.articleText.replace(/<\/?.+?>/g,"");
               //截取指定字数末尾显示省略号
               txt = txt.length < 170 ? txt : txt.substring(0,170).trim().concat('...');
               datalist +=`<li class="questions_list">
                            <div class="questions_list_left">
                                <a href="questions-view.html?newsListId=20&articleId=${item.articleId}"><img src="${item.articleImg.articleImgSrc}" alt="${item.articleImg.articleImgAlt}"></a>
                            </div>
                            <div class="questions_list_right">
                                <div class="questions_list_title">
                                    <a href="questions-view.html?newsListId=20&articleId=${item.articleId}">${item.articleName}</a>
                                </div>
                                <div class="questions_list_desc">${txt}</div>
                                <div class="questions_list_bottom">
                                    <div class="questions_list_tag_box">
                                        <div class="questions_list_tag"><a href="javascript:viod(0);">${item.labelList[0].articleLabelName}</a></div>
                                        <div class="questions_list_tag"><a href="javascript:viod(0);">${item.labelList[1].articleLabelName}</a></div>
                                    </div>
                                    <div class="questions_list_time">
                                        <p>${item.articleAddTime}</p>
                                    </div>
                                </div>
                            </div>
                      	</li>`; 
           });
           $(".questions_list_box ul").append(datalist);
       } 
   });
}