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
				UlList.appendChild(LiListInfo);
				
				var AList = document.createElement("a");		
				AList.href = "guideInfo.html?"+"phone="+n.phone;
				//AList.setAttribute("href","guideInfo.html");
				AList.target = "_top";
				
				var A1List = document.createElement("a");
				A1List.href = "orderFormPage.html?"+"phone="+n.phone;
				A1List.target = "_top";
				LiListInfo.appendChild(AList).appendChild(A1List);		
				
				var ImgList = document.createElement("img");
				ImgList.src =n.Image;
				var PList = document.createElement("p");
				
				AList.appendChild(PList).appendChild(ImgList);
				
				//添加姓名
				var SpanListName= document.createElement("span");
				SpanListName.className = "name";
				//SpanListName.id = "order_guide_name";
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



//查看推荐显示的导游
function getAvailableGuides()
{
	var scenicName = $("#chooseScenicName").val();
	var visitTime = $("#chooseDate").val();
	var visitNum = $("#chooseVisitNum").val();
	//alert(scenicName);alert(visitTime);alert(visitNum);
	//返回数据库中的名字
	var url = "http://10.50.63.83:8080/TourGuide//getNameSimilarScenics.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{"scenicName":scenicName},
		datatype:"JSON",
		error:function()
		{
			alert("搜索景区名称Request error!");
		},
		success:function(data)
		{
			alert("搜索景区名称Request success!");
			if(data == null)
			{
				alert("您输入的名称有误，请重新输入！");
			}
			$.each(data, function(i,item) {
				var scenicNo = item.scenicNo;
				alert(item.scenicName);
				//$.cookie("scenicFullName",item.scenicName);
				var dataGuide = {"scenicName":item.scenicName,
								 "visitTime":visitTime,
								 "visitNum":visitNum};
				var url = "http://10.50.63.83:8080/TourGuide/getAvailableGuides.do";
				$.ajax({
					type:"post",
					url:url,
					async:true,
					data:dataGuide,
					datatype:"JSON",
					error:function()
					{
						alert("推荐讲解员Request error!");
					},
					success:function(data)
					{
						$("#order_guide_ul").empty();
						$.each(data,function(i,n)
						{
							alert("推荐讲解员Request success!");							
							//动态显示可推荐的讲解员
							var UlList = document.getElementById("order_guide_ul");
							var LiListInfo = document.createElement("li");
							LiListInfo.id = "order_guide_li";
							UlList.appendChild(LiListInfo);
							
							var AList = document.createElement("a");
							AList.id = "order_guide_aid";
							AList.href = "guideInfo.html?"+"phone="+n.phone+"&"+"visitTime="+dataGuide.visitTime+"&"+"visitNum="+dataGuide.visitNum+"&"+"scenicNo="+scenicNo;					
							//AList.setAttribute("href","guideInfo.html");
							AList.target = "_top";
							
							var A1List = document.createElement("a");
							A1List.id = "orderGuideA";
							A1List.target = "_top";
							LiListInfo.appendChild(AList).appendChild(A1List);		
							
							var ImgList = document.createElement("img");
							ImgList.src =n.Image;
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
				
			});
			
		}
	});
	
//	var scenicFullName = $.cookie("scenicFullName");
//	alert(scenicFullName);
}

//根据详细筛选条件显示导游
function selectAvailableGuides()
{	
	var sex;     //转换性别
	var issex = $("input:radio[name='sex']:checked").val();
	if(issex == undefined)
	{
		sex = "null";
	}
	else
	{
		sex = issex;
	}
	
	var age;    //转换年龄
	var isage = $("input:radio[name='age']:checked").val();
	if(isage == undefined)
	{
		age = "null";
	}
	else
	{
		age = isage;
	}
	
	var language;    //转换语种
	var islanguage = $("input:radio[name='language']:checked").val();
	if(islanguage == undefined)
	{
		language = "null";
	}
	else
	{
		language = islanguage;
	}
	
	var scenicName = $("#chooseScenicName").val();
	var visitTime = $("#chooseDate").val();
	var visitNum = $("#chooseVisitNum").val();	
	var starlevel = $("#starleve").val();
	
	//根据用户输入返回数据库中存在的名字
	var url = "http://10.50.63.83:8080/TourGuide//getNameSimilarScenics.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{"scenicName":scenicName},
		datatype:"JSON",
		error:function()
		{
			alert("搜索景区名称Request error!");
		},
		success:function(data)
		{
			alert("搜索景区名称Request success!");
			if(data == null)
			{
				alert("您输入的名称有误，请重新输入！");
			}
			$.each(data, function(i,item) {
				alert(item.scenicName);
				
				//定义要发送到服务器的参数
			var data = {"scenicName":item.scenicName,
						"visitTime":visitTime,
						"visitNum":visitNum,
						"sex":sex,"age":age,
						"level":starlevel,
						"language":language};
			//从数据库返回符合详细筛选条件的导游
		    var url = "http://10.50.63.83:8080/TourGuide//getAvailableGuidesWithSelector.do"
	        $.ajax({
			type:"post",
			url:url,
			async:true,
			data:data,
			datatype:"JSON",
			error:function()
			{
				alert("筛选Request error!");
			},
			success:function(data)
			{
				alert("筛选success!");
				$("#order_guide_ul").empty();
			    $.each(data,function(i,n)
				{
					alert("推荐讲解员Request success!");							
					//动态显示可推荐的讲解员
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
					ImgList.src =n.Image;
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
	});
  }
});		
}

