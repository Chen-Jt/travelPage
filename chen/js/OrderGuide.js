//发布订单
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
//从服务器获取讲解员
window.onload = function()
{
	var url = "http://10.50.63.83:8080/TourGuide/getPopularGuides.do"
	$.ajax({
		type:"post",
		url:url,
		async:true,
		datatype:"JSON",
		error:function()
		{
			alert("获取讲解员Request error!");
		},
		success:function(data)
		{
			alert("获取讲解员success!");		
			$.each(data,function(i,n)
			{
				//动态显示最受欢迎的讲解员
				var UlList = document.getElementById("order_guide_ul");
				var LiListInfo = document.createElement("li");
				LiListInfo.id = "order_guide_li";
				UlList.appendChild(LiListInfo);
				
				var AList = document.createElement("a");
				AList.id = "order_guide_aid";
				AList.setAttribute("href","guideInfo.html");
				AList.target = "_top";
				
				var A1List = document.createElement("a");
				A1List.id = "orderGuideA";
				A1List.target = "_top";
				LiListInfo.appendChild(AList).appendChild(A1List);		
				
				var ImgList = document.createElement("img");
				ImgList.src ="img/1.jpg";
				var PList = document.createElement("p");
				
				AList.appendChild(PList).appendChild(ImgList);
				
				//添加姓名
				var SpanListName= document.createElement("span");
				SpanListName.className = "name";
				SpanListName.id = "order_guide_name";
				SpanListName.innerHTML = "姓名："+n.name+"<br/>";
		
				//添加性别
				var SpanListSex= document.createElement("span");
				SpanListSex.className = "sex";
				SpanListSex.innerHTML = "性别："+n.sex+"<br/>";
				
				//添加年龄
				var SpanListAge= document.createElement("span");
				SpanListAge.className = "age";
				SpanListAge.innerHTML = "年龄："+n.age+"<br/>";
				
				//添加等级
				var SpanListLevel= document.createElement("span");
				SpanListLevel.className = "starLevel";
				SpanListLevel.innerHTML = "等级："+n.guideLevel+"<br/>";
				
				PList.appendChild(SpanListName)
					 .appendChild(SpanListSex)
					 .appendChild(SpanListAge)
					 .appendChild(SpanListLevel);
					 
				$("#order_guide_ul").listview('refresh');
					 
				 
			});
		}
	});
}




function getAvailableGuides()
{
	
}
			


