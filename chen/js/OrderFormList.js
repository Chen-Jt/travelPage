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
				$("#order_orderState").html(n.orderState);
				$("#order_OrderID").html(n.OrderID);
				$("#order_visitTime").html(n.visitTime);
				$("#order_visitNum").html(n.visitNum);
				$("#order_totalMoney").html(n.totalMoney);
				$("#order_scenicName").html(n.scenicName);
			});
		}
		//景区图片暂时不显示在列表
	});