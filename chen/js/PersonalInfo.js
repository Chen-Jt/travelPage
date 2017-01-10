
/*var data = {phone:$.cookie("LoginName")};
alert(data);*/

var url = "http://10.50.63.83:8080/TourGuide/getVisitorInfoWithPhone.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:{phone:"13589678945"},
		datatype:"JSON",
		error:function()
		{
			alert("显示个人信息Request error!");
		},
		success:function(data)
		{
			alert("显示个人信息success!");
			document.getElementById("person_info_tel").value = data.phone;
			document.getElementById("person_info_nickname").value = data.nickName;
			document.getElementById("person_info_name").value = data.name;
			document.getElementById("person_info_sex").value = data.sex;		
			/*if(data == -1)
			{
				alert("您还未登录，请登录！");
				window.location.href = "TourLogin.html";
			}*/
		}
	});