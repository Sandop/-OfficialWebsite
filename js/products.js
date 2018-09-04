

/*产品页面请求函数封装*/
(function(){
	/*客厅家具产品信息显示*/
	prodAjax(1,".living-room-content ul"); 
	prodLinkAjax(1,".living-room-link ul");

	/*餐厅家具产品信息显示*/
	prodAjax(2,".dining-room-content ul"); 
	prodLinkAjax(2,".dining-room-link ul");

	/*卧室家具产品信息显示*/
	prodAjax(3,".bedroom-furniture-content ul"); 
	prodLinkAjax(3,".bedroom-furniture-link ul");

	/*书房家具产品信息显示*/
	prodAjax(4,".study-furniture-content ul"); 
	prodLinkAjax(4,".study-furniture-link ul");

})();

function prodLinkAjax(typeId,ulBox){
	$.ajax({  
	    url: "http://visney.cn:81/proCategory/showAll/main",
	    type: "GET", 
	    success: function (data) {  
	    	var data = data[typeId - 1].children;  //获取当前typeId下的子类别数据
	        data.forEach(function(currentValue, index, arr){
	            var products_kind_link_list_html = 
		            `<li class="products-kinds-link-list">
		            	<a href="prod-list.html?typeId=${typeId}&Id=${currentValue.proCategoryId}">${currentValue.proCategoryName}</a>
		            </li>`;
	            $(ulBox).append(products_kind_link_list_html);
	        })  
	    },
	    error:function () {
	    	alert("找不到服务器啦^_^");
	    }
	});
}

function prodAjax(typeId,ulBox){
	$.ajax({  
	    url: "http://visney.cn:81/product/selectByPosition/"+typeId+"",
	    type: "GET", 
	    success: function (data) {  
	        data.forEach(function(currentValue, index, arr){
	            var products_kind_list_html = 
	                `<li class="products-kind-list">
						<div class="products-kind-list-img">
							<a href="prod-view.html?typeId=${typeId}&Id=${currentValue.proTypeId}&fid=${currentValue.proId}"><img src="${currentValue.proImgs[0].proImgSrc}" alt="${currentValue.proImgs[0].proImgAlt}"></a>
						</div>
						<div class="products-kind-name">
							<a href="prod-view.html?typeId=${typeId}&Id=${currentValue.proTypeId}&fid=${currentValue.proId}">${currentValue.proName}</a>
						</div>
						<div class="products-kind-price">
							￥<span class="price-num">${currentValue.proPrice}</span>
						</div>
					</li>`;

	            $(ulBox).append(products_kind_list_html);

	        })  
	    },
	    error:function () {
	    	alert("找不到服务器啦^_^");
	    }
	});
}

/*产品页面请求函数封装结束*/
