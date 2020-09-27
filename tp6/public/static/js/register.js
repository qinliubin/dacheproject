var ws = new WebSocket("ws://127.0.0.1:8888");
ws.onopen=function(){
    console.log("与服务器建立链接...");
}
ws.onmessage= function(remsges){
    console.log(remsges);
	//6.收到服务器的信息data
	var msgobj = JSON.parse(remsges.data);
	var type = msgobj.type;
	var content = msgobj.data;
	switch(type){
		case "reges":
			//7. 处理结果
			if(content.results=="success"){
				alert("注册成功!");
				//跳转
				location.href="qiantailogin.html";
			}else{
				alert("注册失败");
			}
		break;

	}
}

$(function(){
    $("#btnLogin").click(function(){
        var username = $("#username").val();
        var phonen = $("#phonen").val();
        var password = $("#password").val();
        if(username  ==  '' || phonen ==  '' || password == '' ){
            alert('您输入的用户名、手机号或密码不能为空');
        }else{
            var msgobj={
                type :"register",
                data:{
                    mingzi:username,
                    phone: phonen,
                    mima :password,
                }
            }
            ws.send(JSON.stringify(msgobj));
        }
    })
})