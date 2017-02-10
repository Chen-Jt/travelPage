  window.onload = function()
  {
  
	  var ScenicNo = GetUrlem("scenicNo");
	//从服务器端获取景区详细信息
	var url2 = HOST+"/getDetailScenicByScenicID.do"
	$.ajax({
		type:"post",
		url:url2,
		async:true,
		data:{"scenicID":ScenicNo},
		datatype:"JSON",
		error:function()
		{
			alert("景区详细信息Request error!");
		},
		success:function(data)
		{
			//alert("景区详细信息request success!");
			$.each(data, function(i,item) {
				//设置显示名称
				$("#scenic_title").html(item.scenicName);
				//设置显示图片
				$("#scenic_img").attr("src",HOST+item.scenicImagePath);
				//设置显示简介
				$("#scenic_info").html(item.scenicIntro);
				//设置显示历史参观人数
				var td = $("#scenic_total_visit");
				$(td).html(item.totalVisits);
				
				$("#orderGuideBtn").attr("href","orderGuide.html?scenicNo="+ScenicNo+"&sname="+item.scenicName);
				$("#pinGuideBtn").attr("href","pindan.html?scenicNo="+ScenicNo+"&sname="+item.scenicName);
			});
			
		}
	});
	
	//从服务器端获取票价
	var url1 = HOST+"/geTicketsByScenicNo.do"
	$.ajax({
		type:"post",
		url:url1,
		async:true,
		data:{scenicNo:ScenicNo},
		datatype:"JSON",
		error:function()
		{
			alert("获取门票Request error!");
		},
		success:function(data)
		{
			
			$("#full_price").html(data.fullPrice);
			$.cookie("FullPrice",data.fullPrice);
			$.cookie("HalfPrice",data.halfPrice);
			$.cookie("DiscoutPrice",data.discoutPrice);
		}
	});
	
	//从服务器端获取今日天气
	var url = HOST+"/getWeatherByCity.do";
  $.ajax({
	type:"post",
	url:url,
	async:true,
	data:{city:"西安"},
	datatype:"JSON",
	error:function()
	{
		alert("今日天气Request error!");
	},
	success:function(data)
	{
		//alert("今日天气success!");
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
	
}
  


