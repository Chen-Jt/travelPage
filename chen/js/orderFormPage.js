
$(function($){
	
	setGuideInfo();//设置讲解员信息返回讲解费
	setOrderInfo();//设置预约信息
	setChargeInfo();//设置门票信息
	
});

//获取session值

function setOrderInfo()
{
	var visitTime = getSession(sessionStorage.directVisitTime);
	var visitNum = getSession(sessionStorage.directVisitNum);
	$("#orderTime").html(visitTime);
	$("#visitorCount").html(visitNum);
}
function setChargeInfo(guideMoney)
{
	$("#guideMoney").html(guideMoney);
	var pur = GetUrlem("purchaseTicket");
	var TicketM = 0;
	var ticm = "<br/>";
	
		var half = GetUrlem("halfPrice");
		var disc = GetUrlem("discoutPrice");
		var full = GetUrlem("fullPrice");
		
	var secnicNo = getSession(sessionStorage.scenicNo);
	if(!secnicNo)
	{
		return false;
	}
	var url = HOST+"/geTicketsByScenicNo.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{"scenicNo":secnicNo},
		datatype:"JSON",
		error:function()
		{
			alert("获取门票费用Request error!");
			return false;
		},
		success:function(data)
		{
		
		if(pur==1){
			
	
		//alert(JSON.stringify(data));
		if(full!=0)
		{
			ticm +="<p>全价票"+full+"*"+data.fullPrice+"元</p>";
		}
		if(half!=0)
		{
			ticm+="<p>半价票"+half+"*"+data.halfPrice+"元</p>";
		}
		if(disc!=0)
		{
			ticm += "<p>折扣票"+disc+"*"+data.discoutPrice+"元</p>";
		}
			}
		//var add = parseInt(full)*parseInt(data.fullPrice)+parseInt(half)*parseInt(data.halfPrice)+parseInt(disc)+*parseInt(data.discoutPrice);
		if(pur==1)
		{	
			TicketM = parseInt(full) * parseInt(data.fullPrice) + parseInt(half) * parseInt(data.halfPrice)+parseInt(disc)*parseInt(data.discoutPrice);
		}
		var guideMoney = $("#guideMoney").html();
		$("#sumMoney").html(TicketM+parseInt(guideMoney));
		$("#ticketMoney").html(ticm);
		}		
	});
	
}
//http://127.0.0.1:8020/travelPage/chen/orderFormPage.html?phone=13165662195&purchaseTicket=1&halfPrice=1&discoutPrice=3&fullPrice=2
function setGuideInfo()//设置讲解员信息返回讲解费
{
	var phone = GetUrlem("phone");
	var Url = HOST+"/getDetailGuideInfoByPhone.do";
	$.ajax({
		type:"post",
		url:Url,
		async:true,
		data:{"guidePhone":phone},
		datatype:"JSON",
		error:function()
		{
			alert("导游详细信息Request error!");
		},
		success:function(data)
		{
			alert("导游详细信息success!");
			$.each(data, function(i,item) {
				$("#name").html(item.name);
				$("#sex").html(item.sex);
				$("#age").html(item.age);			
				/*$("#guide_img").attr("src","img/1.jpg");
				$("#guide_starlevel").html(item.guideLevel);
				$("#guide_Visitors").html(item.historyNum);
				$("#guide_fee").html(item.guideFee+"元");
				$("#guide_self_intro").html(item.selfIntro);
				$("#guide_phone").html(item.phone);*/	
				var language="汉语";
				if(item.language == 1)
				{
					language = "英语";
				}
				if(item.language == 2)
				{
					language="汉语 英语";
				}
				$("#language").html(language);
				$("#guideMoney").html(item.guideFee);
			});
		}
	});
}

function getTicketMoney(){
	var secnicNo = getSession(sessionStorage.scenicNo);
	if(!secnicNo)
	{
		return false;
	}
	var url = HOST+"/geTicketsByScenicNo.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{"scenicNo":secnicNo},
		datatype:"JSON",
		error:function()
		{
			alert("获取门票费用Request error!");
			return false;
		},
		success:function(data)
		{
			alert(JSON.stringify(data));
			return data;
		}		
	});
}

function goPay(){
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
		purchaseTicket:PurchaseTicket,
		halfPrice:HalfPrice,
		discoutPrice:DiscoutPrice,
		fullPrice:FullPrice,
	    visitTime:$("#orderDate").val()+" "+$("#orderDatetime").val()
	};
}

function getSession(name){
	if(name)
	{
		return name;
	}
	return null;
}

