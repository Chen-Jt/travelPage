$(document).ready(function() {
	var scenicSpotImg = $.cookie('scenicSpotImg');
    var totalVisits = $.cookie('totalVisits');
	var scenicIntro = $.cookie('scenicIntro');
	//设置显示图片
	$("#scenic_img").attr("src",scenicSpotImg);
	//设置显示简介
	$("#scenic_info").html(scenicIntro);
	//设置显示历史参观人数
	var td = $("#scenic_total_visit");
	$(td).html(totalVisits);
}); 

//从服务器端获取今日天气
var url = "http://10.50.63.83:8080/TourGuide/getWeatherByCity.do"
$.ajax({
	type:"post",
	url:url,
	async:true,
	data:{city:"西宁"},
	datatype:"JSON",
	error:function()
	{
		alert("今日天气Request error!");
	},
	success:function(data)
	{
		alert("今日天气success!");
		var weather = data.weather;
		var temperature = data.temprature;
		var wind = data.wind;
		var img1 = data.image1;
		var img2 = data.image2;
		if(weather.length>2)
		{
			$("#weather").text(weather);
			$("#img1").attr("src",img1);
			$("#img2").attr("src",img2);
			$("#temperature").text(temperature);
			$("#wind").text(wind);
		}
		else
		{
			$("#weather").text(weather);
			$("#img1").attr("src",img1);
			$("#temperature").text(temperature);
			$("#wind").text(wind);
		}
				
	}
});
//从服务器端获取票价
var url1 = "http://10.50.63.83:8080/TourGuide/geTicketsByScenicNo.do"
$.ajax({
	type:"post",
	url:url1,
	async:true,
	data:{scenicNo:"19743"},
	datatype:"JSON",
	error:function()
	{
		alert("获取门票Request error!");
	},
	success:function(data)
	{
		alert("获取门票success!");
		$("#full_price").html(data.fullPrice);
	}
});