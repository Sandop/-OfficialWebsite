'use strict';

/*brand nav start*/
(function () {
  var typeId = $.getUrlParam('typeId'),
      Id = $.getUrlParam('Id'),
      fid = $.getUrlParam('fid');

  $.ajax({
    url: "http://192.168.100.250/proCategory/showAll/main",
    type: "GET",
    success: function success(data) {
      var item = data[typeId - 1].children;
      var length = item.length;
      for (var i = 0; i < length; i++) {
        if (item[i].proCategoryId == Id) {
          var name = item[i].proCategoryName;
        }
      }
      var brand_nav_prod_list_html = '<a href="products.html?typeId=' + typeId + '">' + data[typeId - 1].proCategoryName + '</a>';
      var brand_nav_prod_style_html = '<a href="prod-list.html?typeId=' + typeId + '&Id=' + Id + '">' + name + '</a>';
      var brand_nav_prod_view_html = '<a href="products.html?typeId=' + typeId + '&Id=' + Id + '&fid=' + fid + '">' + data[typeId - 1].proCategoryName + '</a>';

      $(".brand-nav-list ul li.brand-nav-prod-list").html(brand_nav_prod_list_html);
      $(".brand-nav-list ul li.brand-nav-prod-style").html(brand_nav_prod_style_html);
      $(".brand-nav-list ul li.brand-nav-prod-view").html(brand_nav_prod_view_html);
    }
  });
})();
/*brand nav end*/

/*Products show start*/
/*Products top show start*/
(function () {
  var typeId = $.getUrlParam('typeId'),
      Id = $.getUrlParam('Id'),
      proId = $.getUrlParam('fid');
  $.ajax({
    url: "http://192.168.100.250/product/detail/" + proId + "", //获取产品详情接口
    type: "GET",
    success: function success(data) {

      //左侧图片展示区域渲染
      var dataImg = data.proImgs;
      dataImg.forEach(function (currentValue, index, arr) {
        var SmallPicList_html = '<li>\n\t\t\t\t\t\t\t\t\t\t\t<a href="javascript:">\n\t\t\t\t\t\t\t\t\t\t\t\t<img src="' + currentValue.proImgSrc + '" alt="' + currentValue.proImgAlt + '">\n\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t</li>';
        $("#SmallPicList ul").append(SmallPicList_html);
      });

      //右侧侧产品参数区域
      var dataParam = data.param;
      $.each(dataParam, function (keys, value) {
        var prod_details_html = '<p>' + keys + '\uFF1A' + value + '</p>';
        $(".products-par-details-box").append(prod_details_html);
      });
      //右侧文字介绍渲染
      $(".products-view-title p").text(data.proName);
      $(".products-price-num").text(data.proPrice);

      //商品详情信息
      $(".prod-details").html(data.proMsg);
      $(".prod-buy-now a").attr("href", data.proSrc);
    },
    complete: function complete() {
      //加载完成后左侧，左侧放大镜及轮播图效果
      $(function () {
        if ($(".products-pic-panel").length > 0) {
          ProdViewShowPic.Init();
          $("#PicZoom").PicsZoom();
        }
      });
      var ProdViewShowPic = {
        Init: function Init() {
          ProdViewShowPic.PicZoom();
        },
        PicZoom: function PicZoom() {
          $.fn.PicsZoom = function (o) {
            var defaults = {
              SigBox: '#BigPic',
              //Boxwh: [474, 369],
              //Img: [1422, 1107],
              Boxwh: [500, 500],
              Img: [1000, 1000],
              zoom: 9
            };
            var o = $.extend(defaults, o);
            //兼容IE8;因IE8下移动会有斗动！
            function format(str) {
              for (var i = 1; i < arguments.length; i++) {
                str = str.replace('%' + (i - 1), arguments[i]);
              }
              return str;
            }
            var _this = $(this),
                S = $(o.SigBox),
                imgW = o.Img[0],
                imgH = o.Img[1],
                moveW = imgW / o.zoom,
                moveH = imgH / o.zoom,
                bLeft = S.offset().left,
                bTop = S.offset().top,
                sBoxW = S.width(),
                sBoxH = S.height(),
                Bw = imgW - o.Boxwh[0],
                Bh = imgH - o.Boxwh[1],
                Boxleft = o.Boxwh[0] + 1,
                p_box = _this.find("#SmallPicList"),
                p_boxul = p_box.find("ul"),
                liw = p_box.find("ul li").outerWidth(true),
                liInW = p_box.find("ul li").outerWidth(),
                liMarginRight = liw - liInW,
                //计算单个li元素的右边距
            li = p_box.find("ul li").length,
                movebox = S.find(".move"),
                preid = "products-pic-pre",
                nextid = "products-pic-next";
            //大图默认显示
            _this.find("#SmallPicList a").eq(0).addClass("products-pic-cur");
            if ($(o.SigBox).length > 0) {
              var imgSrc = $(".products-pic-cur").find("img").attr("src");
              $(o.SigBox).html("<img src=\"" + imgSrc + "\" />");
            }
            $(o.SigBox).append(format("<div class='move' style='width:%0px;height:%1px'></div>", moveW, moveH));
            S.mouseover(function () {
              var _src = $(this).find("img").attr("src");
              $(this).parent().append(format("<div class='b_box' style='width:%0px;height:%1px;left:%2px'><img src='%3' width='%4' height='%5'></div>", o.Boxwh[0], o.Boxwh[1], Boxleft, _src, o.Img[0], o.Img[1]));
              $(".move,.b_box").css("display", "block");
            }).mouseout(function () {
              $(".b_box").remove();
              $(".move").css("display", "none");
            });
            S.mousemove(function (e) {
              var x, y, _x, _y;
              x = e.pageX - bLeft - moveW / 2;
              y = e.pageY - bTop - moveH / 2;
              if (x < 0) {
                x = 0;
              } else if (x > sBoxW - moveW) {
                x = sBoxW - moveW;
              }
              if (y < 0) {
                y = 0;
              } else if (y > sBoxH - moveH) {
                y = sBoxH - moveH;
              }
              $(".move").css({ "top": y, "left": x });
              _x = -(x / (sBoxW - moveW)) * Bw;
              _y = -(y / (sBoxH - moveH)) * Bh;
              $(".b_box img").css({ left: _x + "px", top: _y + "px" });
            });
            //上一个下一个函数封装
            var p = {
              premove: function premove() {
                var ulmarginLeft = parseInt($("#SmallPicList ul").css("marginLeft"));
                if (ulmarginLeft > -liw) {
                  p_boxul.css("marginLeft", "0");
                  //console.log(ulmarginLeft);
                  return;
                } else {
                  p_boxul.animate({ marginLeft: ulmarginLeft + liw + "px" }, 500);
                }
              },
              nextmove: function nextmove() {
                var ulmarginLeft = parseInt($("#SmallPicList ul").css("marginLeft"));
                if ($("#SmallPicList").width() - ulmarginLeft >= li * liw - (li - 1) * 8) {
                  $("#SmallPicList").css("paddingRight", "0px");
                  return;
                }
                p_boxul.animate({ marginLeft: -liw + ulmarginLeft + "px" }, 500);
              }
            };
            p_boxul.css({ "width": liw * li - liMarginRight }); //ul的宽度减去单个右边距
            _this.find("#SmallPicList a").eq(0).addClass("products-pic-cur");

            //小图数量大于四个显示左右切换按钮，否则隐藏
            if (li > 4) {
              $('#' + preid).show();
              $('#' + nextid).show();
              //上一个
              $('#' + preid).bind("click", function () {
                if (li >= 4) {
                  // p_boxul.find("li:last").prependTo(p_boxul);
                  p.premove();
                }
                return false;
              });
              var btnRight_click_bool = true;
              //下一个
              $('#' + nextid).bind("click", function () {
                if (li >= 4) {

                  if (!btnRight_click_bool) {
                    return;
                  }
                  btnRight_click_bool = false;
                  p.nextmove();
                  setTimeout(function () {
                    btnRight_click_bool = true;$('#' + nextid).bind("click");
                  }, 400);
                }
                return false;
              });
            } else {
              $('#' + preid).hide();
              $('#' + nextid).hide();
            }

            //点击切换大图              
            _this.find("#SmallPicList a").bind("click", function () {
              var src = $(this).find("img").attr("src"),
                  i = _this.find("#SmallPicList a").index(this);
              S.find("img").attr("src", src);
              _this.find("#SmallPicList a").removeClass("products-pic-cur").eq(i).addClass("products-pic-cur");
            });
          };
        }
      };
    }
  });
})();

/*Products top show start*/

/*products-search start*/
(function () {
  $.ajax({
    url: "http://192.168.100.250/proCategory/showAll/main",
    tyep: "GET",
    success: function success(data) {
      data.forEach(function (currentValue, index, arr) {
        var dataChildren = data[index].children;

        var prod_link_html = '<div class="prod-link-room">\n\t\t\t\t\t\t<div class="prod-link-title">\n\t\t\t\t\t\t\t<span class="prod-link-title-word">' + currentValue.proCategoryName + '</span>\n\t\t\t\t\t\t\t<span class="prod-link-mark">\n\t\t\t\t\t\t\t\t<span class="prod-link-minus prod-link-active">-</span>\n\t\t\t\t\t\t\t\t<span class="prod-link-add">+</span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="prod-link-list-box">\n\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>';
        $(".prod-link-box").append(prod_link_html);
        // $(".prod-link-room").eq(index).find(".prod-link-title-word").text(currentValue.proCategoryName);

        var prod_link_list_html = '';

        dataChildren.forEach(function (element, index) {
          prod_link_list_html += '<li class="prod-link-list">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="prod-list.html?typeId=' + currentValue.proCategoryId + '&Id=' + element.proCategoryId + '">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span>\xB7</span><span class="prod-link-cont">' + element.proCategoryName + '</span>\n\t\t\t\t\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t\t\t\t\t</li>';
        });

        $(".prod-link-room").eq(index).find(".prod-link-list-box ul").append(prod_link_list_html);
      });
    },
    complete: function complete() {
      //从第五个开始添加+号，隐藏-号
      $(".prod-link-box .prod-link-room:nth-child(n+5) .prod-link-mark .prod-link-add").addClass("prod-link-active").siblings().removeClass("prod-link-active");

      //产品详情左侧导航列表点击展开闭合
      $(".prod-link-title").click(function () {
        $(this).find(".prod-link-active").removeClass("prod-link-active").siblings().addClass("prod-link-active");
        if ($(this).find(".prod-link-minus").hasClass("prod-link-active")) {
          $(this).siblings(".prod-link-list-box").show(400);
        } else {
          $(this).siblings(".prod-link-list-box").hide(400);
        }
      });
    }
  });
})();
/*products-search end*/
/*Products show end*/

/*Related Products start*/
(function () {
  var typeId = $.getUrlParam('typeId'),
      Id = $.getUrlParam('Id');
  $.ajax({
    url: "http://192.168.100.250/product/getProByTpyeId/" + Id + "/4",
    type: "GET",
    success: function success(data) {
      data.forEach(function (element, index) {
        var related_prod_list_html = '<li class="related_prod_list">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="related_prod_list_img">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="prod-view.html?typeId=' + element.proPositionId + '&Id=' + element.proTypeId + '&fid=' + element.proId + '"><img src="' + element.proImgs[0].proImgSrc + '" alt="' + element.proImgs[0].proImgAlt + '"></a>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="related_prod_name">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="prod-view.html?typeId=' + element.proPositionId + '&Id=' + element.proTypeId + '&fid=' + element.proId + '">' + element.proName + '</a>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="related_prod_price">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\uFFE5<span class="price-num">' + element.proPrice + '</span>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</li>';
        $(".related_prod_list_box ul").append(related_prod_list_html);
      });
    }
  });
})();
/*Related Products end*/

/*You Like start*/
(function () {
  var typeId = $.getUrlParam('typeId'),
      Id = $.getUrlParam('Id');
  $.ajax({
    url: "http://192.168.100.250/product/getProRandom/4",
    type: "GET",
    success: function success(data) {
      data.forEach(function (element, index) {
        var prod_link_list_html = '<li class="prod_like_list">\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="prod_like_list_img">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="prod-view.html?typeId=' + element.proPositionId + '&Id=' + element.proTypeId + '&fid=' + element.proId + '"><img src="' + element.proImgs[0].proImgSrc + '" alt="' + element.proImgs[0].proImgAlt + '"></a>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="prod_like_name">\n\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="prod-view.html?typeId=' + element.proPositionId + '&Id=' + element.proTypeId + '&fid=' + element.proId + '">' + element.proName + '</a>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<div class="prod_like_price">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\uFFE5<span class="price-num">' + element.proPrice + '</span>\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t</li>';
        $(".prod_like_list_box ul").append(prod_link_list_html);
      });
    }
  });
})();
/*You Like end*/