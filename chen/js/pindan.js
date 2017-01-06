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
			alert(data.scenicID);
			alert(data.visitTime);
			alert(data.visitNum);
			alert(data.visitorPhone);
			alert(data.purchaseTicket);
			alert(data.fullPrice);
			alert(data.halfPrice);
			alert(data.discoutPrice);
			alert("发起拼单Request error!");
		},
		success:function(data)
		{
			alert("发起拼单success!");
			alert(data);
		}
	});
}
