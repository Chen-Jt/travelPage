$(function($){
//轮播图片初始化
$(document).bind("mobileinit", function() {
$.mobile.page.prototype.options.addBackBtn = true;
});
$("#search").focus(function(event) {
$.mobile.changePage("#searchPanelPage","slideright");
            $("#mysearch").focus();
});
$(".searchTagPanel").click(function(event){
         var searchtext = event.target.innerText;
         $("#mysearch").val(searchtext);
        });
});


		
window.onload = function()
{
	//从服务端获取首页活动信息
     var url = "http://10.50.63.83:8080/TourGuide/getPromotions.do";
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
				alert("活动信息success!");
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
	var url1 = "http://10.50.63.83:8080/TourGuide/getScenicByLocation.do";
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
			alert("推荐景点success!");
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
																	  
				AList.target = "_blank";
				
				DivList.appendChild(AList);
				
				var ImgList = document.createElement("img");
				ImgList.setAttribute("src","item.scenicImagePath");
				
				AList.appendChild(ImgList);
				
			});
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


function mySearch()
	{
		var url2 = "http://10.50.63.83:8080/TourGuide//getScenicByNameAndRelates.do";
		$.ajax({
			type:"post",
			url:url2,
			async:true,
			data:{scenicName:$("#mysearch").val()},
			datatype:"JSON",
			error:function()
			{
				alert("搜索Request error!");
			},
			success:function(data)
			{
				alert("搜索success!");
				//alert(data[0].scenicNo);
				window.location.href = "searchResult.html";
			}
		});
	}