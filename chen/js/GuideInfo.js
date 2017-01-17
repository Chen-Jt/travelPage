//

/*var phoneHref = window.location.href;
var Para = phoneHref.split("?")[1];  //获取链接地址后面的所有参数
var phonePara = Para.split("&")[0];   //获取手机参数
var timePara = Para.split("&")[1];   //获取参观时间参数
var numPara = Para.split("&")[2];    //获取参观人数参数
var IdPara = Para.split("&")[3];    //获取景区编号参数
var phone = phonePara.split("=")[1];  //获取导游手机号
var time = timePara.split("=")[1];   //获取参观时间
alert(phonePara);
alert(timePara);
alert(numPara);
alert(IdPara);*/
//alert(phone);alert(time);

var phone = GetUrlem("phone");

//获取导游详细信息
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
				$("#guide_info_name").html(item.name);
				$("#guide_info_sex").html(item.sex);
				$("#guide_age").html(item.age);			
//				$("#guide_img").attr("src","img/1.jpg");
				$("#guide_img").attr("src",HOST+item.image);
				$("#bgimg").attr("src",HOST+item.image);
				$("#guide_starlevel").html(item.guideLevel);
				$("#guide_Visitors").html(item.historyNum);
				$("#guide_fee").html(item.guideFee+"元");
				$("#guide_self_intro").html(item.selfIntro);
				$("#guide_phone").html(item.phone);
				
				if(item.language == 0)
				{
					$("#guide_language").html("汉语");
				}
				if(item.language == 1)
				{
					$("#guide_language").html("英语");
				}
				if(item.language == 2)
				{
					$("#guide_language").html("汉语 英语");
				}
			});
		}
	});

//获取导游的历史评价记录


//点击立即预定
function bookGuide()
{
	
}
