//从登录界面获得游客的手机号即登录名
var VisitTel = $.cookie('LoginName');

function consistOrder()
{
	var HalfPrice;
	var FullPrice;
	var DiscoutPrice;
	if($("input[name='pindan_orderTicket']:checked").val() == 0)
	{
		HalfPrice = 0;
		FullPrice = 0;
		DiscoutPrice = 0;
	}
	if($("input[name='pindan_orderTicket']:checked").val() == 1)
	{
		HalfPrice = $("#halfPriceTicketNum").val();
		FullPrice = $("#fullPriceTicketNum").val();
		DiscoutPrice = $("#discountTicketNum").val();
	}
	var data = 
	{
		scenicID:"19743",
		visitTime:$("#visitTime").val()+" "+$("#pindan_orderDatetime option:selected").val(),
		visitNum:$("#visitorCount").val(),
		visitorPhone:"13589678945",
		purchaseTicket:$("input[name='pindan_orderTicket']:checked").val(),
		halfPrice:HalfPrice,
		discoutPrice:DiscoutPrice,
		fullPrice:FullPrice
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
	
	var url1 = "http://10.50.63.83:8080/TourGuide/getIntroFee.do";
	$.ajax({
		type:"post",
		url:url1,
		async:true,
		data:{scenicID:"19743",date:$("#visitTime").val()},
		datatype:"JSON",
		error:function()
		{
			alert("返回讲解费Request error!");
		},
		success:function(data)
		{
			alert("返回讲解费Request success!");
			alert(data);
			$("#pindan_guide_money").html(data);
			var HalfPrice = $.cookie("HalfPrice");
			var FullPrice = $.cookie("FullPrice");
			var DiscoutPrice = $.cookie("DiscoutPrice");
			var ticketPrice = $("#fullPriceTicketNum").val() * FullPrice			
							 +$("#halfPriceTicketNum").val() * HalfPrice
							 +$("#discountTicketNum").val() * DiscoutPrice;
			var TicketPrice = $("#fullPriceTicketNum").val() + "*" + FullPrice
			                 +"+"+$("#halfPriceTicketNum").val() + "*" + HalfPrice
			                 +"+"+$("#discountTicketNum").val() + "*" + DiscoutPrice
			                 + "=" +ticketPrice;		                
			$("#pindan_ticket_money").html(TicketPrice); 
			var TotalMoney = ticketPrice + data;
			$("#pindan_total_money").html(TotalMoney);
		}
	});
}
//从服务器获取可拼订单
window.onload = function()
{
	var url = "http://10.50.63.83:8080/TourGuide/getAvailableConsistOrder.do";
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
			//动态加载div布局
			$.each(data, function(i,n){
				
				/*var OrderList = document.getElementById("panel1");							
			    var OrderListInfo = document.createElement("div");
				OrderListInfo.id = "order_list1";	
				OrderList.appendChild(OrderListInfo);
												
			   //$("#order_list1").insertBefore(document.getElementById("order_list"));
								
				var UlListInfo = document.createElement("ul");
				UlListInfo.id = "pindan_ul_id";
				$("ul").attr("data-role","listview");
				$("ul").listview();
				OrderListInfo.appendChild(UlListInfo);*/
				
				var UlList = document.getElementById("pindan_ul_id");
				var LiListInfo = document.createElement("li");
				LiListInfo.id = "pindan_li_id";
				UlList.appendChild(LiListInfo);
				
				//添加订单号
				var SpanOrderIdInfo = document.createElement("span");
				SpanOrderIdInfo.id = "consis_orderID";
				SpanOrderIdInfo.className = "orderFormId";
				SpanOrderIdInfo.innerHTML = "订单号：" + n.orderID + "<br/>";
				
				//添加浏览时间
				var SpanVisitTimeInfo = document.createElement("span");
				SpanVisitTimeInfo.id = "consis_visitTime";
				SpanVisitTimeInfo.className = "vistTime";
				SpanVisitTimeInfo.innerHTML = "浏览时间：" + n.visitTime+ "<br/>";
				
				//添加已有人数
				var SpanVisitNumInfo = document.createElement("span");
				SpanVisitNumInfo.id = "consis_visitNum";
				SpanVisitNumInfo.innerHTML = "已有人数：" + n.visitNum+ "<br/>";
				
				//添加可拼单人数
				var SpanConsisNumInfo = document.createElement("span");
				SpanConsisNumInfo.id = "consis_minus";
				var MaxNum = n.maxNum;
				var NowNum = n.visitNum;
				var Number = MaxNum - NowNum;
				SpanConsisNumInfo.innerHTML = "可拼单人数：" + Number+ "<br/>";
				
				//添加按钮
				var DivConsisBtn = document.createElement("div");
				DivConsisBtn.className = "goOrder";
				var ConsisBtn = document.createElement("button");
				ConsisBtn.id = "goOrder";
				ConsisBtn.className = "goOrderbtn ui-btn ui-btn-inline";
				ConsisBtn.innerHTML = "去拼单";
				ConsisBtn.onclick = function()
				{window.location.href = "ConsistOrderList.html?"+"OrderID="+n.orderID;};
				DivConsisBtn.appendChild(ConsisBtn);
				
				LiListInfo.appendChild(SpanOrderIdInfo)
				.appendChild(SpanVisitTimeInfo)
				.appendChild(SpanVisitNumInfo)
				.appendChild(SpanConsisNumInfo)
				.appendChild(DivConsisBtn);
				});
				
				$("#pindan_ul_id").listview('refresh');

			}
		});
}

function goOrder()
{
	window.location.href = "ConsistOrderList.html";
}
