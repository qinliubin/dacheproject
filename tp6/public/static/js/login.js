$(document).on("click","#loginGo",function(){
    $acc=$("#lAcc").val();
    $pwd=$("#lPwd").val();
})

    // alert(registercheckRT)




/*
$(document).on("click","#lCodeS,#cCodeS",function(){
	 $(this).attr("src", "Framework/libs/code.php");
});
var CurveDay = new Date();
CurveDay.setTime(CurveDay.getTime());
var CurveTime = CurveDay.getFullYear()+"-" + (CurveDay.getMonth()+1) + "-" + CurveDay.getDate() + " " +CurveDay.getHours() + ":" + CurveDay.getMinutes() + ":" + CurveDay.getSeconds();
function getCookie(c_name)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_name.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end));
    } 
  }
return "";
}
var code=getCookie('code');
/!*注册*!/
$(document).on("keyup","#cAcc",function(){
	var reg1=/^[0-9]{6}$/;
	var t1=$("#cAcc").val();
	if (t1.match(reg1)!=null) {
		$("#p4").html('账号输入正确');
		$("#p4").css("color","green");
	}else{
		$("#p4").html('请输入6位数字账号');
		$("#p4").css("color","red");
	}
})
$(document).on("keyup","#Nickname",function(){
	var reg2=/^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
	var t2=$("#Nickname").val();
	if (t2.match(reg2)!=null) {
		$("#p5").html('昵称可以使用');
		$("#p5").css("color","green");
	}else{
		$("#p5").html('昵称不可以用');
		$("#p5").css("color","red");
	}
})
$(document).on("keyup","#cPwd",function(){
	var reg3=/^\w{3,6}$/;
	var t3=$("#cPwd").val();
	if (t3.match(reg3)!=null) {
		$("#p6").html('密码输入正确');
		$("#p6").css("color","green");
	}else{
		$("#p6").html('请输入3-6位数字、字母密码；不区分大小写');
		$("#p6").css("color","red");
	}
})
$(document).on("keyup","#cPwd2",function(){
	var t4=$("#cPwd2").val();
	if (t4==$("#cPwd").val()) {
		$("#p7").html('两次密码相同');
		$("#p7").css("color","green");
	} else {
		$("#p7").html('两次密码不相同');
		$("#p7").css("color","red");
	}
})
$(document).on("keyup","#payment",function(){
	var reg5=/^[0-9]{6}$/;
	var t5=$("#payment").val();
	if (t5.match(reg5)!=null) {
		$("#p8").html('密码可以使用');
		$("#p8").css("color","green");
	}else{
		$("#p8").html('请输入6位数字密码');
		$("#p8").css("color","red");
	}
})
$(document).on("keyup","#cCode",function(){
	if (code.toUpperCase()==$("#cCode").val().toUpperCase()) {
		$("#p9").html('验证码正确');
		$("#p9").css("color","green");
	} else {
		$("#p9").html('验证码错误');
		$("#p9").css("color","red");
	}
})
/!*注册*!/
$(document).on("click","#registerGo",function(){
	var reg1=/^[0-9]{6}$/;
	var t1=$("#cAcc").val();
	var reg2=/^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
	var t2=$("#Nickname").val();
	var reg3=/^\w{3,6}$/;
	var t3=$("#cPwd").val();
	var t4=$("#cPwd2").val();
	var reg5=/^[0-9]{6}$/;
	var t5=$("#payment").val();
	var CurveDay = new Date();
	CurveDay.setTime(CurveDay.getTime());
	if ((CurveDay.getMonth()+1)<10) {
		var month='0'+(CurveDay.getMonth()+1);
	} else {
		var month=(CurveDay.getMonth()+1);
	}
	var CurveTime = CurveDay.getFullYear()+"-" + month + "-" + CurveDay.getDate() + " " +CurveDay.getHours() + ":" + CurveDay.getMinutes() + ":" + CurveDay.getSeconds();
	// var t=CurveDay.toLocaleString();
	console.log(CurveTime)
	if (t1.match(reg1)!=null&&t2.match(reg2)!=null&&t3.match(reg3)!=null&&t4==t3&&t5.match(reg5)!=null&&code.toUpperCase()==$("#cCode").val().toUpperCase()) {
		$.ajax({
		    type:'post',
		    url:'index.php?m=home&c=Login&a=degister',
		    data:{acc:t1,name:t2,pwd:t3,payment:t5,CurveTime:CurveTime},
		    dataType:'json',
		    success:function(data){
		        // console.log(data)
		        if(data.code == 1001){
		        	$("#text2").html(data.msg);
		            $('#myModal2').modal('show');
		        }else{
		            $("#text2").html(data.msg);
		            $('#myModal2').modal('show');
		        }
		    }
		})
	} else {
		$("#text2").html("注册资料不规范");
        $('#myModal2').modal('show');
	}
})
/!*清空*!/
function emptyGo(){
	$("#cAcc").val('');
	$("#Nickname").val('');
	$("#cPwd").val('');
	$("#cPwd2").val('');
	$("#payment").val('');
	$("#cCode").val('');
}
$(document).on("click","#emptyGo",function(){
	emptyGo();
})
/!*登录*!/
$(document).on("keyup","#lAcc",function(){
	var reg1=/^[0-9]{6}$/;
	var t1=$("#lAcc").val();
	if (t1.match(reg1)!=null) {
		$("#p1").html('账号输入正确');
		$("#p1").css("color","green");
	}else{
		$("#p1").html('请输入6位数字账号');
		$("#p1").css("color","red");
	}
})
$(document).on("keyup","#lPwd",function(){
	var reg2=/^\w{3,6}$/;
	var t2=$("#lPwd").val();
	if (t2.match(reg2)!=null) {
		$("#p2").html('密码输入正确');
		$("#p2").css("color","green");
	}else{
		$("#p2").html('请输入3-6位数字、字母密码；不区分大小写');
		$("#p2").css("color","red");
	}
})
$(document).on("keyup","#lCode",function(){
	if (code.toUpperCase()==$("#lCode").val().toUpperCase()) {
		$("#p3").html('验证码正确');
		$("#p3").css("color","green");
	} else {
		$("#p3").html('验证码错误');
		$("#p3").css("color","red");
	}
})
$(document).on("click","#loginGo",function(){
	var reg1=/^[0-9]{6}$/;
	var t1=$("#lAcc").val();
	var reg2=/^\w{3,6}$/;
	var t2=$("#lPwd").val();
	if (t1.match(reg1)!=null&&t2.match(reg2)!=null&&code.toUpperCase()==$("#lCode").val().toUpperCase()) {
		$.ajax({
		    type:'post',
		    url:'index.php?m=home&c=Login&a=doLogin',
		    data:{acc:t1,pwd:t2},
		    dataType:'json',
		    success:function(data){
		        console.log(data)
		        if(data.code == 1001){
		        	$("#box1").html(data.msg);
		            $('#myModal4').modal('show');
		            window.localStorage.setItem("hx200309acc",t1);
		            $(document).on("click","#but1",function(){
		            	window.location.href = 'index.php?m=home&c=Home&a=Home';
		            })
		        }else{
		            $("#box1").html(data.msg);
		            $('#myModal4').modal('show');
		        }
		    }
		})
	} else {
		$("#text2").html("登录账号不规范");
        $('#myModal2').modal('show');
	}
})*/
