function openFile()
{
	document.getElementById("btnFile").click();
}

var image = "";
function selectImage(file)
{
	if(!file.files || !file.files[0])
	{
		return;
	}
	var reader = new FileReader();
	reader.onload = function(evt)
	{
		document.getElementById("visitor_img").src = evt.target.result;
		image = evt.target.result;
	}
	reader.readAsDataURL(file.files[0]);
}

function Regist()
{
	check();
	var data=
	{
		"nickName":document.getElementById("nickname").value,
		"sex":document.getElementById("sex").value,
		"name":document.getElementById("name").value,
		"phone":document.getElementById("tel").value,
		"passwd":document.getElementById("password").value,
		"image":$("#btnFile").val()    		
	};	
	var url = "http://10.50.63.83:8080/TourGuide/visitorRegister.do";
	$.ajax({
		type:"post",
		url:url,
		async:true,
		data:data,
		datatype:"JSON",
		error:function()
		{
			alert("注册Request error!");
		},
		success:function(data)
		{
			alert("注册success!");
			alert(data);
		}
	});
}

//检验输入是否合法
function check()
{
	//获取值
	var NickName = document.getElementById("nickname").value;
	var Sex = document.getElementById("sex").value;
	var Name = document.getElementById("name").value;
	var Tel = document.getElementById("tel").value;
	var Password = document.getElementById("password").value;
	var ConfirmPassword = document.getElementById("confirm_password").value;
	var FilePath = $("#btnFile").val();
	
	if(Tel == null || Tel == "")
	{  
		alert("电话不能为空！");
		return false;
	}
	if(Tel.length != 11)
	{
		alert("请输入正确的手机号");
		return false;
	}
     if(Password == null || Password == "")
	{
		alert("密码不能为空！");
		return false;
	}
	 if(ConfirmPassword == null || ConfirmPassword == "")
	{
		alert("确认密码不能为空！");
		return false;
	}
	if(Password != ConfirmPassword)
	{
		alert("两次输入密码不一致，请重新输入！");
		return false;
	}
	if(Password.length < 3)
	{
		alert("密码长度不能少于3位，请重新输入！");
		return false;
	}
     if((document.getElementById("agreeClause").checked) == true)
	{
		alert("注册成功！");
	}
	
	else
	{
		alert("请选择您接受相关条款服务！");
    } 
	
}