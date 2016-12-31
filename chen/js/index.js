mui.ready(function(){
	var gallery = mui('.mui-slider');
		gallery.slider({
  		interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
		});
		});

function LoginOrPersonal()
{
	var AllCookies = document.cookie;
	if(AllCookies != "")
	{
		window.location.href = "TourPersonalMain.html";
	}
	else
	{
		window.location.href = "TourLogin.html";
	}
}