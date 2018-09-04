'use strict';

/*面包屑导航*/
(function () {
	var typeId = $.getUrlParam('typeId'),
	    Id = $.getUrlParam('Id');
	$.ajax({
		url: "http://192.168.100.250/proCategory/showAll/main",
		type: "GET",
		success: function success(data) {
			var brand_list_html = '<a href="products.html?typeId=' + data[typeId - 1].proCategoryId + '">' + data[typeId - 1].proCategoryName + '</a>';
			$(".brand-nav-list ul li:last-child").html(brand_list_html);
		}
	});
})();
/*面包屑导航结束*/

/*筛选部分内容加载*/
(function () {
	/*封装函数在common.js里面*/
	//获取页面链接参数 
	var typeId = $.getUrlParam('typeId'),
	    Id = $.getUrlParam('Id');
	$.ajax({
		url: "http://192.168.100.250/proCategory/showAll/main",
		type: "GET",
		success: function success(data) {
			//循环遍历空间内容部分
			data.forEach(function (currentValue, index, arr) {
				var furniture_place_kinds_list_html = '<li data-id="' + currentValue.proCategoryId + '" class="furniture-place-kinds-list"><a href="prod-list.html?typeId=' + currentValue.proCategoryId + '">' + currentValue.proCategoryName + '</a></li>';
				$(".furniture-place-kinds ul").append(furniture_place_kinds_list_html);
			});
			$(".furniture-place-kinds ul").children("li").eq(typeId - 1).addClass("active");

			//循环遍历类型部分内容
			var classData = data[typeId - 1].children;
			classData.forEach(function (currentValue, index, arr) {
				var furniture_class_kinds_list_html = '<li data-id="' + currentValue.proCategoryId + '" class="furniture-class-kinds-list">' + currentValue.proCategoryName + '</li>';
				$(".furniture-class-kinds ul").append(furniture_class_kinds_list_html);
			});
		},
		complete: function complete() {

			getProdAjax(".furniture-class-kinds ul");

			/*类型部分*/
			//判断链接是否存在，存在给指定的li添加active
			if (Id) {
				$(".furniture-class-kinds ul").children("li[data-id=" + Id + "]").addClass("active");
				$(".furniture-class-kinds ul").children("li[data-id=" + Id + "]").trigger('click');
			} else {
				$(".furniture-class-kinds ul").children("li[data-id='']").addClass("active");
				$(".furniture-class-kinds ul").children("li[data-id='']").eq(0).trigger('click');
			}
		}
	});

	$.ajax({
		url: "http://192.168.100.250/proCategory/showAll/list",
		type: "GET",
		success: function success(data) {
			//循环遍历家具材质部分内容
			var materialsData = data[0].children;
			materialsData.forEach(function (currentValue, index, arr) {
				var furniture_materials_kinds_list_html = '<li data-id="' + currentValue.proCategoryId + '" class="furniture-materials-kinds-list">' + currentValue.proCategoryName + '</li>';
				$(".furniture-materials-kinds ul").append(furniture_materials_kinds_list_html);
			});

			//循环遍历家具系列部分内容
			var seriesData = data[1].children;
			seriesData.forEach(function (currentValue, index, arr) {
				var furniture_series_kinds_list_html = '<li data-id="' + currentValue.proCategoryId + '" class="furniture-series-kinds-list">' + currentValue.proCategoryName + '</li>';
				$(".furniture-series-kinds ul").append(furniture_series_kinds_list_html);
			});

			//循环遍历家具风格部分内容
			var styleData = data[2].children;
			styleData.forEach(function (currentValue, index, arr) {
				var furniture_style_kinds_list_html = '<li data-id="' + currentValue.proCategoryId + '" class="furniture-style-kinds-list">' + currentValue.proCategoryName + '</li>';
				$(".furniture-style-kinds ul").append(furniture_style_kinds_list_html);
			});
		},
		complete: function complete() {
			$(".furniture-materials-kinds ul").children("li[data-id='']").addClass("active");
			$(".furniture-series-kinds ul").children("li[data-id='']").addClass("active");
			$(".furniture-style-kinds ul").children("li[data-id='']").addClass("active");

			// 各项条件的传入
			getProdAjax(".furniture-materials-kinds ul");
			getProdAjax(".furniture-series-kinds ul");
			getProdAjax(".furniture-style-kinds ul");
			getProdAjax(".sales-volume ul");
			getProdAjax(".news-products ul");
			getProdAjax(".products-prices ul");
		}
	});
})();
/*筛选部分内容加载结束*/

/*筛选方法*/
function getProdAjax(ulBox) {
	$(ulBox).delegate("li", "click", function () {
		//清除展示列表产品信息
		$(".products-show-box ul").empty();

		//判断点击的是否为销量、新品、价格
		//若是，增加active并改变data-id，再次点击取消active并回复data-id
		//若否，其他筛选条件增加类名
		if ($(this).parents()[2] == $("div.products-sequence")[0]) {
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
				$(this).attr("data-id", 0);
			} else {
				$(".products-sequence").find("li").removeClass("active");
				$(".products-sequence").find("li").attr("data-id", 0);
				$(this).addClass("active").siblings().removeClass("active");
				$(this).attr("data-id", 1);
			}
		} else {
			$(this).addClass("active").siblings().removeClass("active");
		}
		var positionId = $(".furniture-place-kinds-list.active").attr("data-id"); //获取选中家具空间data-id
		var typeId = $(".furniture-class-kinds-list.active").attr("data-id"); //获取选中家具材质data-id
		var textureId = $(".furniture-materials-kinds-list.active").attr("data-id"); //获取选中家具材质data-id
		var seriesId = $(".furniture-series-kinds-list.active").attr("data-id"); //获取选中家具系列data-id
		var styleId = $(".furniture-style-kinds-list.active").attr("data-id"); //获取选中家具风格data-id

		var orderByTime = $(".news-products-list").attr("data-id"); //获取新品data-id
		var orderByPageViewsCount = $(".sales-volume-list").attr("data-id"); //获取销量data-id
		var orderByPrice = $(".products-prices-list").attr("data-id"); //获取选中家具风格data-id

		var dataJson = {
			positionId: positionId,
			typeId: typeId,
			textureId: textureId,
			seriesId: seriesId,
			styleId: styleId,
			orderByTime: orderByTime, //是否根据时间排序，1代表是，0代表否
			orderByPageViewsCount: orderByPageViewsCount, //是否销量排序，1代表是，0代表否
			orderByPrice: orderByPrice //是否根据价格排序，1代表是，0代表否
		};
		var pageNum = 12; //规定每页显示数目

		$.ajax({
			url: "http://192.168.100.250/product/selectByCondition/1/" + pageNum + "",
			method: "POST",
			dataType: 'json',
			async: true,
			data: dataJson,
			success: function success(data) {
				var totalList = data.total,
				    //获取数据总条数
				allPageNum = Math.ceil(totalList / pageNum); //根据每页显示数目获取总页数

				//若总条数为0，则显示提示内容,分页器隐藏
				if (totalList == 0) {
					var noProdAlert = "<p>还没有类似产品哦^_^，请选择其他相关产品，O(∩_∩)O谢谢！</p>";
					$(".products-show-box ul").html(noProdAlert);
					$(".products-pagination-box").hide();
				} else {
					//分页加载
					$('.products-pagination-box').pagination({
						mode: 'fixed', //固定显示页码数量，unfixed不固定页码数量
						coping: true, //是否开启首页尾页功能
						homePage: '<<', //回到首页
						endPage: '>>', //回到尾页
						pageCount: allPageNum, //分页总页数
						jump: false, //是否开启跳转指定页数
						callback: function callback(api) {
							//点击页码执行一次回调函数
							var nowPage = api.getCurrent(); //获取当前点击页数
							getProdPgAjax(nowPage, pageNum);
						}
					}, function () {
						//插件初始化时调用该方法，比如请求第一次接口来初始化分页配置
						getProdPgAjax(1, pageNum);
					});
				}
			}
		});
	});
}

/*筛选方法*/

/*产品分页方法*/
function getProdPgAjax(nowPage, pageNum) {
	$(".products-show-box ul").empty(); //清空数据
	var positionId = $(".furniture-place-kinds-list.active").attr("data-id"); //获取选中家具空间data-id
	var typeId = $(".furniture-class-kinds-list.active").attr("data-id"); //获取选中家具材质data-id
	var textureId = $(".furniture-materials-kinds-list.active").attr("data-id"); //获取选中家具材质data-id
	var seriesId = $(".furniture-series-kinds-list.active").attr("data-id"); //获取选中家具系列data-id
	var styleId = $(".furniture-style-kinds-list.active").attr("data-id"); //获取选中家具风格data-id

	var orderByTime = $(".news-products-list").attr("data-id"); //获取新品data-id
	var orderByPageViewsCount = $(".sales-volume-list").attr("data-id"); //获取销量data-id
	var orderByPrice = $(".products-prices-list").attr("data-id"); //获取选中家具风格data-id

	var dataJson = {
		positionId: positionId,
		typeId: typeId,
		textureId: textureId,
		seriesId: seriesId,
		styleId: styleId,
		orderByTime: orderByTime, //是否根据时间排序，1代表是，0代表否
		orderByPageViewsCount: orderByPageViewsCount, //是否销量排序，1代表是，0代表否
		orderByPrice: orderByPrice //是否根据价格排序，1代表是，0代表否
	};

	$.ajax({
		url: "http://192.168.100.250/product/selectByCondition/" + nowPage + "/" + pageNum + "",
		method: "POST",
		dataType: 'json',
		async: true,
		data: dataJson,
		success: function success(data) {
			var datalist = "";
			$.each(data.list, function (i, item) {
				//截取字符串中的标签
				// var txt = item.articleText.replace(/<\/?.+?>/g,"");
				//截取指定字数末尾显示省略号
				// txt = txt.length < 170 ? txt : txt.substring(0,170).trim().concat('...');
				datalist += '<li class="products-kind-list">\n\t\t\t\t\t\t\t\t<div class="products-kind-list-img">\n\t\t\t\t\t\t\t\t\t<a href="prod-view.html?typeId=' + item.proPositionId + '&Id=' + item.proTypeId + '&fid=' + item.proId + '"><img src="' + item.proImgs[0].proImgSrc + '" alt="' + item.proImgs[0].proImgAlt + '"></a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="products-kind-name">\n\t\t\t\t\t\t\t\t\t<a href="prod-view.html?typeId=' + item.proPositionId + '&Id=' + item.proTypeId + '&fid=' + item.proId + '">' + item.proName + '</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="products-kind-price">\n\t\t\t\t\t\t\t\t\t\uFFE5<span class="price-num">' + item.proPrice + '</span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</li>';
			});
			$(".products-show-box ul").append(datalist);
		}

	});
}