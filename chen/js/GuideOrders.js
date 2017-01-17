window.onload = function(){
	
	var url = HOST+"/getMyBookedOrder.do";
//	var url = HOST+"/getFinishedBookedOrder.do";
	
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{guidePhone:"13165662195"},
		datatype:"JSON",
		error:function()
		{
			alert("全部订单Request error!");
		},
		success:function(data){
			$.each(data, function(i,n) {
				
				var UlList = document.getElementById("OrderUl");
				var LiList = document.createElement("li");
				
				UlList.appendChild(LiList);
				
				var PList = document.createElement("p");
				LiList.appendChild(PList);
				
				//添加订单号
				var SpanListOrderId = document.createElement("span");
				SpanListOrderId.className = "orderId";
				SpanListOrderId.innerHTML = "订单号："+n.bookOrderID+"<br/>";
				
				//添加景区名称
				var SpanListName = document.createElement("span");
				SpanListName.className = "scenicName";
				SpanListName.innerHTML = "景区名称："+n.scenicName+"<br/>";
				
				//添加时间
				var SpanListTime = document.createElement("span");
				SpanListTime.className = "vistTime";
				SpanListTime.innerHTML = "参观时间："+n.visitTime+"<br/>";
				
				//添加人数
				var SpanListNum = document.createElement("span");
				SpanListNum.className = "visitNum";
				SpanListNum.innerHTML = "参观人数："+n.visitNum+"<br/>";
				
				var SpanListFee = document.createElement("span");
				SpanListFee.className = "guideFee";
				SpanListFee.innerHTML = "讲解费："+n.guideFee+"<br/>";
				
				var startButton = document.createElement("button");
				startButton.className = "start";
				startButton.innerHTML = "开始讲解";
								
				var finishButton = document.createElement("button");
				finishButton.className = "finish";
				finishButton.innerHTML = "结束讲解";
				
				PList.appendChild(SpanListOrderId)
					 .appendChild(SpanListName)
					 .appendChild(SpanListTime)
					 .appendChild(SpanListNum)
					 .appendChild(SpanListFee)
					 .appendChild(startButton);
					 
				$("#OrderUl").listview('refresh');	
			});
		}
	});
}
