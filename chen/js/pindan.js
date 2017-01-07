//从登录界面获得游客的手机号即登录名
var VisitTel = $.cookie('LoginName');

function consistOrder()
{
	var data = 
	{
		scenicID:"19743",
		visitTime:$("#visitTime").val()+" "+$("#pindan_orderDatetime option:selected").val(),
		visitNum:$("#visitorCount").val(),
		visitorPhone:"13589678945",
		purchaseTicket:$("input[name='pindan_orderTicket']:checked").val(),
		halfPrice:$("#halfPriceTicketNum").val(),
		discoutPrice:$("#discountTicketNum").val(),
		fullPrice:$("#fullPriceTicketNum").val()
	};
	
	var url = "http://10.50.63.83:8080/TourGuide/releaseConsistOrder.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:data,
		datatype:"JSON",
		error:function()
		{
			alert("发起拼单Request error!");
		},
		success:function(data)
		{
			alert("发起拼单success!");
			alert(data);
		}
	});
}
//从服务器获取可拼订单
/*var url = "http://10.50.63.83:8080/TourGuide/getAvailableConsistOrder.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{scenicID:"19743"},
		datatype:"JSON",
		error:function()
		{
			alert("可拼拼单Request error!");
		},
		success:function(data)
		{
			alert("可拼拼单success!");
			$.each(data, function(i,n) {
				$("#consis_orderID").html(n.orderID);
				$("#consis_visitTime").html(n.visitTime);
				$("#consis_visitNum").html(n.visitNum);
				//$("#consis_minus").html(n.maxNum - n.visitNum)
			});
//			for(int i = 0 ;i < data.length; i++)
//			{
				
//				$("#consis_visitTime").innerHTML = data[i].visitTime;
//				$("#consis_visitNum").innerHTML = data[i].visitNum;
//				$("#consis_minus").innerHTML = data[i].maxNum - data[i].visitNum;
			//}
			
			
		}
	});*/
	
//动态加载div布局
var Array = [{"orderID":"1234567","visitTime":"2017-01-01","visitNum":"5","consis_minus":"9"},
             {"orderID":"1234567","visitTime":"2017-01-01","visitNum":"5","consis_minus":"9"}];
for(i = 0; i < Array.length; i++)
{
	var OrderList = document.getElementById("pindan_panel1");
	alert(OrderList);
	var OrderListInfo = document.createElement("div");
	OrderListInfo.id = "panel1";
	OrderListInfo.className = "pannel1_class";
	//OrderList.appendChild(OrderListInfo);
	
	var UlListInfo = document.createElement("ul");
	UlListInfo.id = "pindan_ul_id";
	OrderListInfo.appendChild(UlListInfo);
	
	var LiListInfo = document.createElement("li");
	LiListInfo.id = "pindan_li_id";
	UlListInfo.appendChild(LiListInfo);
	
	//添加订单号
	var SpanOrderIdInfo = document.createElement("span");
	SpanOrderIdInfo.id = "consis_orderID";
	SpanOrderIdInfo.innerHTML = Array[i].orderID;
	alert(Array[i].orderID);
	
	//添加浏览时间
	var SpanVisitTimeInfo = document.createElement("span");
	SpanVisitTimeInfo.id = "consis_visitTime";
	SpanVisitTimeInfo.innerHTML = Array[i].visitTime;
	
	//添加已有人数
	var SpanVisitNumInfo = document.createElement("span");
	SpanVisitNumInfo.id = "consis_visitNum";
	SpanVisitNumInfo.innerHTML = Array[i].visitNum;
	alert(Array[i].visitNum);
	
	//添加可拼单人数
	var SpanConsisNumInfo = document.createElement("span");
	SpanConsisNumInfo.id = "consis_minus";
	SpanConsisNumInfo.innerHTML = Array[i].consis_minus;
	
	LiListInfo.appendChild(SpanOrderIdInfo).appendChild(SpanVisitTimeInfo).appendChild(SpanVisitNumInfo).appendChild(SpanConsisNumInfo);
}
