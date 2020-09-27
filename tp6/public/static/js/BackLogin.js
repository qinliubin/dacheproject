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
//console.log(code)

$(document).on("keyup","#Account",function(){
	var reg1=/^[0-9]{5}$/;
	var t1=$("#Account").val();
	if (t1.match(reg1)!=null) {
		$("#p3").html('账号输入正确');
		$("#p3").css("color","green");
	}else{
		$("#p3").html('请输入5位数字账号');
		$("#p3").css("color","red");
	}
})
$(document).on("keyup","#password",function(){
	var reg2=/^\w{3,6}$/;
	var t2=$("#password").val();
	if (t2.match(reg2)!=null) {
		$("#p4").html('密码输入正确');
		$("#p4").css("color","green");
	}else{
		$("#p4").html('请输入3-6位数字、字母密码；不区分大小写');
		$("#p4").css("color","red");
	}
})
$(document).on("keyup","#code",function(){
	if (code.toUpperCase()==$("#code").val().toUpperCase()) {
		$("#p5").html('验证码正确');
		$("#p5").css("color","green");
	} else {
		$("#p5").html('验证码错误');
		$("#p5").css("color","red");
	}
})


$(document).on("click","#codeS",function(){
	 $(this).attr("src", "Framework/libs/code.php");
});



$(document).on("click","#login",function(){
		var reg1=/^[0-9]{5}$/;
		var t1=$("#Account").val();	 
		var reg2=/^\w{3,6}$/;
		var t2=$("#password").val();
		if (t1.match(reg1)==null) {
			$('#myModal1').modal('show');
		} else {
			if (t2.match(reg2)==null) {
				$('#myModal2').modal('show');
			}else {
				if (code.toUpperCase()!=$("#code").val().toUpperCase()) {
					$('#myModal3').modal('show');
				} else {
					$.ajax({
						type:'post',
						url:'index.php?m=admin&c=Back&a=doLogin',
						data:{acc:$('#Account').val(),pwd:$('#password').val()},
						dataType:'json',
						success:function(data){
							//console.log(data)
							if(data.code == 1001){
								$("#box1").html(data.msg);
								$('#myModal4').modal('show');
								window.localStorage.setItem("hx200309Post",data.post.st_acc);
								$(document).on("click","#but1,#myModal4",function(){
									window.location.href = 'index.php?m=admin&c=Index&a=Index';
								})
							}else{
								$("#box1").html(data.msg);
								$('#myModal4').modal('show');
							}
						}
					})
				}
			}
		}
})