//从登录界面获得游客的手机号即登录名
var VisitTel = $.cookie('LoginName');

function consistOrder()
{
	var data = 
	{
		scenicID:"19743",
		visitTime:$("#visitTime").val(),
		visitNum:$("#visitorCount").val(),
		visitorPhone:VisitTel,
		purchaseTicket:$("input[name='orderTicket']".checked).val(),
		halfPrice:"1",
		discoutPrice:"2",
		fullPrice:"3"
	};
	var url = "http://10.50.63.83:8080/TourGuide/releaseConsistOrder.do";
	$.ajax({
		type:"post",
		url:"url",
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
