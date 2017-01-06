
function releaseOrder()
{
	var data = 
	{
		scenicID:"19743",
		otherCommand:$("#otherRequest").val(),
		visitNum:$("#visitorCount").val(),
		priceRange:"100-200",
		guideSex:$("input[name='guideSex']:checked").val(),
		visitorPhone:"13589678945",
		visitorName:$("#visitorName").val(),
		language:$("#guideLanguage option:selected").val(),
		purchaseTicket:$("input[name='orderTicket']:checked").val(),
	    visitTime:$("#orderDate").val()+" "+$("#orderDatetime option:selected").val()
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
