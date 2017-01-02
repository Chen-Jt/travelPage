mui.ready(function(){
	var gallery = mui('.mui-slider');
		gallery.slider({
  		interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
		});
		});
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
			        $("#slider_id1").attr("src",item.promotionImage);
			        $("#slider_a1").attr("href",item.promotionLinks);
			  });
			}			
	   });

//从服务端获取推荐景点信息
var url1 = "http://10.50.63.83:8080/TourGuide/getScenicByLocation.do;"
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
			$("#recommend_img1").attr("src",item.scenicImagePath);	
		});
	}
});

function LoginOrPersonal()
{
	var AllCookies = document.cookie;
	if(AllCookies != "")
	{
		window.location.href = "TourPersonalMain.html";
	}
	else
	{
		window.location.href = "TourLogin.html";
	}
}