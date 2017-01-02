mui.ready(function(){
	var gallery = mui('.mui-slider');
		gallery.slider({
  		interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
		});
		});
		
var url = "http://10.50.63.83:8080/TourGuide/getPromotions.do";
		$.ajax({
			url: url,
			datatype: "JSON",
			type: "GET",
			error: function()
			{
				alert("request error!");
			},
			success: function(data)
			{
				alert("success!");
				$.each(data,function(i,item)
				{
					//alert(item.promotionLinks);
					var slider_img1 = document.getElementById("slider_id1");
					var slider_img2 = document.getElementById("slider_id2");
			        var slider_img3 = document.getElementById("slider_id3");
			        var slider_img4 = document.getElementById("slider_id4");
			        slider_img1.src = item.promotionLinks;
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