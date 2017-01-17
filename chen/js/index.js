
$(function($){
$(document).bind("mobileinit", function() {
$.mobile.page.prototype.options.addBackBtn = true;
});


function bindSearch(){
    $(".search").focus(function(event) {
    $.mobile.changePage("#searchPanelPage","slideright");
    });
}
bindSearch();
    $(".searchTagPanel").click(function(event){
         var searchtext = event.target.innerText;
         $("#mySearchInput").val(searchtext);
         $("#searchSubmit").trigger("click");
        });
    //点击搜索按钮
    $("#searchSubmit").click(function(event) {
        sessionStorage.searchText=$("#mySearchInput").val();
         $.mobile.changePage("#searchResultPage","slideright");
    });
    //更多景点页面创建时触发 执行一次
    $('#moreSpotPage').bind('pagecreate',function(event, ui){
        bindSearch();
        var url = HOST+"/getAllScenicByLocation.do";
		$.ajax({
			type:"post",
			url:url,
			async:true,
			data:{"province":"陕西"},
			datatype:"JSON",
			error:function()
			{
				alert("全部景点Request error!");
			},
			success:function(data)
			{ 
				$.each(data, function(i,item) {
					
					var MoreUlList = document.getElementById("more_ul");
					
					var MoreLiList = document.createElement("li");
					MoreUlList.appendChild(MoreLiList);
					
					var MoreAList = document.createElement("a");
					MoreAList.href = "scenicSpot.html?"+"scenicNo="+item.scenicNo;
					MoreLiList.appendChild(MoreAList);
					
					var MoreImgList = document.createElement("img");
					MoreImgList.src = HOST+item.scenicImagePath;
					MoreAList.appendChild(MoreImgList);
					
					var MorePList = document.createElement("p");
					MorePList.className = "imgbar";
					MoreImgList.appendChild(MorePList);
					
					var MoreSpanListName = document.createElement("span");
					MoreSpanListName.className = "imgbar-left-title";
					MoreSpanListName.innerHTML = item.scenicName;
//					var MoreSpanListNum = document.createElement("span");
//					MoreSpanListNum.className = "imgbar-right-title";
					MorePList.appendChild(MoreSpanListName);
					
					
				});
				
				$("#more_ul").listview('refresh');
				$("more_ul").children("li").height($("more_ul").children("li").width()*0.6);
			}
		});
    });
    //搜索结果页面创建时触发 执行一次
    $('#searchResultPage').bind('pagecreate',function(event, ui){
        bindSearch();
    });
    //搜索面板显示时触发 每次都执行
    $('#searchPanelPage').bind('pageshow',function(event, ui){
        setTimeout(function(){
            $("#mySearchInput").trigger("click").focus();
        },10);
    });
    
    $('#searchResultPage').bind('pagebeforeshow',function(event, ui){
                if(sessionStorage.searchText)
                {
                $(".search").val(sessionStorage.searchText)
                var url = HOST+"/getScenicByName.do";
				$.ajax({
					type:"post",
					url:url,
					async:true,
					data:{"scenicName":sessionStorage.searchText},
					datatype:"JSON",
					error:function()
					{
						alert("搜索结果Request error!");
					},
					success:function(data)
					{
						//alert("搜索结果Request success!");
						$.each(data, function(i,item) {
							//alert(item.scenicNo);
							$("#imgA").attr("href","scenicSpot.html?scenicNo="+item.scenicNo);
							$("#search_img").attr("src",HOST+item.scenicImagePath);
							$("#search_scenic_intro").html(item.scenicIntro);
							$("#search_starlevel").html(item.scenicLevel);
							$("#search_address").html(item.province+item.city+item.scenicLocation);						
						});
						
					}
				});
				//获取推荐景点
				var url = HOST+"/getScenicRelatesByName.do";
				$.ajax({
					type:"post",
					url:url,
					async:true,
					data:{"scenicName":sessionStorage.searchText},
					datatype:"JSON",
					error:function()
					{
						alert("相关推荐景点Request error!");
					},
					success:function(data)
					{
						$.each(data, function(i,item) {
							//alert("相关推荐景点Request success!");
							var UlList = document.getElementById("search_ul");
							
							var LiList = document.createElement("li");
							UlList.appendChild(LiList);
							
							var DivList = document.createElement("div");
							DivList.className = "imglist-box";
							LiList.appendChild(DivList);
										
							var AList = document.createElement("a");
							AList.href = "scenicSpot.html?"+"scenicNo="+item.scenicNo;
							DivList.appendChild(AList);
							
							var ImgList = document.createElement("img");
							ImgList.src = HOST+item.scenicImagePath;
							//ImgList.setAttribute("src",item.scenicImagePath);
							AList.appendChild(ImgList);
						    
						    var PList = document.createElement("p");
						    PList.className = "imgbar";
						    ImgList.appendChild(PList);
						    
						    var SpanList = document.createElement("span");
						    SpanList.className = "imgbar-left-title";
						    SpanList.innerHTML = item.scenicName;
						    PList.appendChild(SpanList);
						    
						    $("search_ul").listview('refresh');
						});
						
					}
				});
                
                }
            });

});




		
window.onload = function()
{
	//从服务端获取首页活动信息
     var url = HOST+"/getPromotions.do";
		$.ajax
		({
			url: url,
			datatype: "JSON",
			type: "GET",
			error: function()
			{
				alert("活动信息request error!");
			},
			success: function(data)
			{
//				alert("活动信息success!");
				$.each(data,function(i,item)
				{			      			        
			        var UlList = document.getElementById("index_ul_id");
			        var LiList = document.createElement("li");
			        UlList.appendChild(LiList);
			        
			        var AList = document.createElement("a");
			        
			        AList.setAttribute("href",item.promotionLinks);			        
			        
			        LiList.appendChild(AList);
			        
			        var ImgList = document.createElement("img");			        
			        ImgList.setAttribute("src",item.promotionImage);
			        ImgList.setAttribute("alt","首页活动图片");			        
			        AList.appendChild(ImgList);			       
			        
			 });
		      $(".slider").yxMobileSlider({width:640,height:320,during:3000});//轮播图片初始化
			}
	   });

	//从服务端获取推荐景点信息
	var url1 = HOST+"/getScenicByLocation.do";
	$.ajax({
		type:"post",
		url:url1,
		async:true,
		data:{province:"陕西"},
		datatype:"JSON",
		error:function()
		{
			alert("推荐景点Request error!");
		},
		success:function(data)
		{
//			alert("推荐景点success!");
			$.each(data, function(i,item)
			{
							
				var UlList = document.getElementById("index_scenic_ul_id");
				var LiList = document.createElement("li");
				UlList.appendChild(LiList);
				
				var DivList = document.createElement("div");
				DivList.className = "imglist-box";
				LiList.appendChild(DivList);
				
				var AList = document.createElement("a");	
				AList.href = "scenicSpot.html?"+"scenicNo="+item.scenicNo;
																	  
				AList.target = "_top";
				
				DivList.appendChild(AList);
				
				var ImgList = document.createElement("img");
				ImgList.setAttribute("src",HOST+item.scenicImagePath);
				
				AList.appendChild(ImgList);
				
			});
			$(".imglist-box").height($(".imglist-box").width()*0.5);
		}
	});

}



function LoginOrPersonal()

{

	var AllCookies = document.cookie;
    alert(AllCookies);
	if(AllCookies != "")

	{

		window.location.href = "personalHome.html";

	}

	else

	{

		window.location.href = "TourLogin.html";

	}

}
