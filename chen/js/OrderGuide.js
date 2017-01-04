function releaseOrder()
{
	var data = 
	{
		scenicID:"19743",visitTime:$("#orderDate").val()+$("#orderDatetime").val(),
		visitNum:$("#visitorCount").val(),language:$("#guideLanguage").value,
		guideSex:$("input[name='guideSex']:checked").val(),visitorPhone:$("#visitorPhone").val(),
		visitorName:$("#visitorName").val(),priceRange:"100",
		purchaseTicket:$("input[name='orderTicket']:checked").val(),
		otherCommand:$("#otherRequest").val()
	};
	var url = "http://10.50.63.83:8080/TourGuide/releaseBookOrder.do";
	$.ajax({
	type:"post",
	url:url,
	async:true,
	data:data,
	datatype:"JSON",
	error:function()
	{
		alert("发布订单Request error!");
	},
	success:function(data)
	{
		alert("发布订单success!");
		alert(data);
	}
});
}
