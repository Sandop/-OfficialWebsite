/*Who are the partners start*/
(function(){
	var joinUl = $(".join_partners_banner ul"),
		liW = joinUl.find(".join_partners_list").outerWidth(true),
		liLength = joinUl.find(".join_partners_list").length,
		btnPrev = $(".join_partners_banner_pre"),
		btnNext = $(".join_partners_banner_next"),
		liBox = $(".join_partners_banner"),
		liBoxW = liBox.width();

	joinUl.css({ "width": liW * liLength });

	//li个数大于四个显示切换按钮
	if (liLength > 4) {
		var lastData = Date.now();
		btnPrev.bind('click',function(){
			var nowData = Date.now();
			var ulmarginLeft = parseInt( joinUl.css("marginLeft"));
			//设置限制点击时间间隔大于500才能生效
			if (nowData - lastData > 500) {
				if ( ulmarginLeft > -liW ) {
		            joinUl.css("marginLeft", "0");
					return;
				} else {
					joinUl.animate({marginLeft: ulmarginLeft + liW +"px"},500);
				}
			}
			lastData = nowData;
		});
		btnNext.bind('click',function(){
			var nowData = Date.now();
			var ulmarginLeft = parseInt( joinUl.css("marginLeft"));
			if (nowData - lastData > 500) {
				if ( liBoxW - ulmarginLeft >= liLength * liW - (liLength - 1) * 8) {
				    $(".join_partners_banner").css("paddingRight", "0px");
				    return;
				}
				joinUl.animate({ marginLeft: -liW + ulmarginLeft + "px" }, 500);
			}
			lastData = nowData;
		});
	} else {
		btnPrev.hide();
		btnNext.hide();
	}
})();
/*Who are the partners end*/

/*join support start*/
(function(){
    tabdiv(".join_support_tab_list",".join_support_container","click",500);
})();
/*join support end*/
