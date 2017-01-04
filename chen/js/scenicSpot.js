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
	}
});