function setCookie(LoginName,Value)
{
	//对字符串进行编码，使计算机能够识别
	var LoginName = escape(LoginName);
	var Value = escape(Value);
	
	document.cookie = LoginName + "=" + Value;
}
function UserLogin()
{
	//简单验证
	var LoginName = document.getElementById("tour_id");
	if(LoginName == "")
	{
		alert("用户名不能为空，请输入用户名：");
	}
	var PassWord = document.getElementById("tour_password_id");
	if(PassWord == "")
	{
		alert("密码不能为空，请输入密码：");
	}
	//添加cookie
	setCookie("LoginName",LoginName);
	//alert("记住了你的密码登录！");
	window.location.href = "TourPersonalMain.html";
}

function regist()
{
	window.location.href = "Tour_Regist.html";
}

var XMLHttpReq;
//创建XMLHttpRequest对象
function createXMLHttpRequest()
{
	if(window.XMLHttpRequest)    //Mozilla浏览器
	{
		XMLHttpReq = new XMLHttpRequest();
	}
	else if(window.ActiveXObject)   //IE浏览器
	{
		try
		{
			XMLHttpReq = new ActiveXObject("Msxm12.XMLHTTP");
		}
		catch(e)
		{
			try
			{
				XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(e)
			{
				
			}
		}
	}
}
//发送请求函数
function sendRequest()
{
	createXMLHttpRequest();
	//从表单中获取用户名的值
	var LoginName = document.getElementById("tour_id").value;
	//指定请求发送的url地址和参数
	var url = "signup?loginname="+LoginName;
	//打开到服务器的连接
	XMLHttpReq.open("GET",url,true);
	//指定响应函数
	XMLHttpReq.onreadystatechange = processResponse;
	//发送请求
	XMLHttpReq.send(null);
}
//处理返回信息的函数
function processResponse()
{
	if(XMLHttpReq.readyState == 4)   //判断对象状态
	{
		if(XMLHttpReq.status == 200)   //信息已经成功返回
		{
			var res = XMLHttpReq.responseText;
			window.alert(res);
		}
		else   //页面返回不正常
		{
			window.alert("您所请求的页面有异常");
		}
	}
}
