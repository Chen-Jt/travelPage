window.onload = function()
{
    var url = "http://10.50.63.83:8080/TourGuide/getAllOrders.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{visitorPhone:"13589678945"},
		datatype:"JSON",
		error:function()
		{
			alert("全部订单Request error!");
		},
		success:function(data)
		{
			alert("全部订单success!");
			$.each(data, function(i,n) {
				/*$("#order_orderState").html(n.orderState);
				$("#order_OrderID").html(n.OrderID);
				$("#order_visitTime").html(n.visitTime);
				$("#order_visitNum").html(n.visitNum);
				$("#order_totalMoney").html(n.totalMoney);
				$("#order_scenicName").html(n.scenicName);*/
				
				var UlList = document.getElementById("OrderStateUl");
				var LiList = document.createElement("li");
				UlList.appendChild(LiList);
				
				var AList = document.createElement("a");
				AList.target = "_top";
				
				LiList.appendChild(AList);
				
				var PList = document.createElement("p");
				AList.appendChild(PList);
				
				//添加景区名称
				var SpanListName = document.createElement("span");
				SpanListName.className = "scenicName";
				SpanListName.innerHTML = "景区名称："+n.scenicName+"<br/>";
				
				//添加订单号
				var SpanListOrderId = document.createElement("span");
				SpanListOrderId.className = "orderFormId";
				SpanListOrderId.innerHTML = "订单号："+n.OrderID+"<br/>";
				  //添加订单状态
				var SpanListOrderState = document.createElement("span");
				SpanListOrderState.className = "viewState";
				SpanListOrderState.innerHTML = n.orderState;
				SpanListOrderId.appendChild(SpanListOrderState);
				
				//添加时间
				var SpanListTime = document.createElement("span");
				SpanListTime.className = "vistTime";
				SpanListTime.innerHTML = "时间："+n.visitTime+"<br/>";
				
				//添加人数
				var SpanListNum = document.createElement("span");
				SpanListNum.className = "existedVisitor";
				SpanListNum.innerHTML = "人数："+n.visitNum+"<br/>";
				
				//添加价格
				var SpanListPrice = document.createElement("span");
				SpanListPrice.innerHTML = "价格："+n.totalMoney+"<br/>";
				
				PList.appendChild(SpanListName)
					 .appendChild(SpanListOrderId)
					 .appendChild(SpanListTime)
					 .appendChild(SpanListNum)
					 .appendChild(SpanListPrice);
					 
				$("#OrderStateUl").listview('refresh');	 
				
			});
		}
		//景区图片暂时不显示在列表
	});	
}
    