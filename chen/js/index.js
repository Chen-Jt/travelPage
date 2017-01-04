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
			//将景区图片、历史参观人数、简介存入cookie
			$.cookie('scenicSpotImg',item.scenicImagePath);
			$.cookie('totalVisits',item.totalVisits);
			$.cookie('scenicIntro',item.scenicIntro);
		});
	}
});


function LoginOrPersonal()
{
	getCookie("LoginName");
}

function getCookie(LoginName)
{
	var AllCookie = document.cookie;
	var cookie_start = AllCookie.indexOf("LoginName");
	
	if(cookie_start != -1)
	{
		cookie_start += LoginName.length + 1;
		alert(cookie_start);
		var cookie_end = AllCookie.indexOf(";",cookie_start);  
		alert(cookie_end);
	}
	var value = AllCookie.substring(cookie_start,cookie_end);
	var loginName = unescape(value);
	alert(loginName);
	return value;
}
