
var OrderID = GetUrlem("Orderid");

window.onload = function(){
var url = HOST+"/getDetailedReleasedOrders.do";
//var OrderID = GetUrlem("Orderid");
$.ajax({
	type:"post",
	url:url,
	async:true,
	data:{orderID:OrderID},
	datatype:"JSON",
	error:function()
	{
		alert("获取可接单订单的详情 Request error!");
	},
	success:function(data)
	{
		$.each(data, function(i,n)
		{
			$("#orderID").html(n.bookOrderID);
			$("#scenicName").html(n.scenicName);
			$("#visitTime").html(n.visitTime);
			$("#visitNum").html(n.visitNum);
			$("#totalTicket").html(n.totalTicket);

			if(n.language == 1){
				$("#language").html("英文");
			}
			if(n.language == 0){
				$("#language").html("中文");
			}
			
			$("#sex").html(n.guideSex);
			$("#price").html(n.priceRange);
			$("#visitorName").html(n.visitorName);
			$("#visitorPhone").html(n.visitorPhone);
			$("#otherCommand").html(n.otherCommand);
	
		});
	}

});
}

function takeorder(){
	
	var url = HOST+"/takeReleasedOrderByGuide.do";
	
	$.ajax({
		type:"post",
		url:url,
		async:true,
		datatype:"JSON",
		data:{orderID:OrderID,guidePhone:"13165662195"},
		error:function()
		{
			alert("抢单 Request error!");
		},
		success:function(data)
		{
			alert(data);
			if(data == true){
				alert("抢单成功！");
			}else{
				alert("抢单失败！");
			}			
		}
	});
}