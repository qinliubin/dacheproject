var post =JSON.parse(window.localStorage.getItem('hx200309Post'));
var CurveDay = new Date();
CurveDay.setTime(CurveDay.getTime());
if ((CurveDay.getMonth()+1)<10) {
    var month='0'+(CurveDay.getMonth()+1);
} else {
    var month=(CurveDay.getMonth()+1);
}
var CurveTime = CurveDay.getFullYear()+"-" + month + "-" + CurveDay.getDate() + " " +CurveDay.getHours() + ":" + CurveDay.getMinutes() + ":" + CurveDay.getSeconds();
$("#spanTime").html(CurveTime);
$.ajax({
    type:'post',
    url:'index.php?m=admin&c=Index&a=doIndex',
    data:{account:post,post:post,account:post},
    dataType:'json',
    success:function(data){
        if(data.code == 1001){
            $("#name").html(data.post[0].st_name);
            $("#role_post").html(data.post[0].st_post);
            $("#spanName").html(data.post[0].st_name);
            $("#spanPost").html(data.post[0].st_post);
            $.ajax({
                type:'post',
                url:'index.php?m=admin&c=Index&a=doIndex1',
                data:{account:post,post:data.post[0].st_post},
                dataType:'json',
                success:function(data1){
                    if(data1.code == 1001){
                        if(data1.code == 1001){
                            var post=data1.post;
                            for (var i = 0; i < post.length; i++) {
                                // console.log(post[i].ti_content)
                                $(".btn").each(function(){
                                    // console.log($(this).text())
                                    if ($(this).text()==post[i].ti_content) {
                                        $(this).removeClass("disabled");
                                    }
                                })
                            }
                        }else{
                            $("#text2").html(data1.msg);
                            $('#myModal2').modal('show');
                        }
                    }else{
                        $("#text2").html(data1.msg);
                        $('#myModal2').modal('show');
                    }
                }
            })
        }else{
            $("#text2").html(data.msg);
            $('#myModal2').modal('show');
        }
    }
})
/*
    */
/*退出*/
$(document).on("click","#out",function(){

    $("#text1").html("是否退出？");
    $('#myModal1').modal('show');
    $("#but").unbind("click");
    $(document).on("click","#but",function(){
        $.ajax({
            type:'post',
            url:'index.php?m=admin&c=Index&a=out',
            data:{account:post},
            dataType:'json',
            success:function(data){
                // console.log(data)
                if(data.code == 1001){
                    $.removeCookie('nowAdminUser',{ path: '/'});
                    window.localStorage.removeItem('hx200309Post');
                    window.location.href = 'index.php?m=admin&c=Back&a=Back';
                }else{
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                }
            }
        })
        
    });
});
/*首页*/
$(document).on("click","#user",function(){
    $("#RoleManagement").css("display","none");
    $("#Personne").css("display","none");
    $("#Users").css("display","none");
    $("#GoodsEmployed").css("display","none");
    $("#Blurb").css("display","none");
    $("#nonPayment").css("display","none");
    $("#paid").css("display","none");
    $("#service").css("display","none");
    $("#statistics").css("display","none");
    $("#journal").css("display","none");
    $("#greetbox").css("display","block");
});
/*角色管理*/
$(document).on("click","#but1",function(){
    if ($("#but1").attr("class")!="btnn btn btn-default disabled blue") {
        $("#RoleManagement").css("display","block");
        $("#Personne").css("display","none");
        $("#Users").css("display","none");
        $("#GoodsEmployed").css("display","none");
        $("#Blurb").css("display","none");
        $("#nonPayment").css("display","none");
        $("#paid").css("display","none");
        $("#service").css("display","none");
        $("#statistics").css("display","none");
        $("#journal").css("display","none");
        $("#greetbox").css("display","none");
        $.ajax({
            type:'post',
            url:'index.php?m=admin&c=Index&a=RoleManagement',
            data:{account:post,},
            dataType:'json',
            success:function(data){
                 //console.log(data)
                 if (data.code==1001) {
                    //alert(1)
                    var post1=data.post1;
                    
                    $roleBox=$("#roleBox");
                    $roleBox.html("");
                    for (var i = 0; i < post1.length; i++) {
                        
                            var $roleBoxN=$(`<tr>
                                <td>`+post1[i].ro_id+`</td>
                                <td contenteditable=true>`+post1[i].ro_name+`</td>
                                <td>
                                    <div contenteditable=true>`+post1[i].ro_depict+`</div>
                                </td>
                                <td>
                                    <div class="btn-group btn-group-sm dropdown" >
                                        <button type="button" class="btn btn-default btn-bo btnUp">修改</button>
                                        <button type="button" class="btn btn-default btn-bo btnDe">删除</button>
                                        <button type="button" class="btn btn-default  dropdown-toggle btn-bo management" data-toggle="dropdown">权限管理</button>
                                            <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                                            

                                            <li class="li1 LI">
                                                <label><input type="checkbox" value="角色管理" class="chec2">角色管理</label>
                                            </li>
                                            <li class="li1 LI">
                                                <label><input type="checkbox" value="用户管理" class="chec2">用户管理</label>
                                            </li>
                                            <li class="li1 LI">
                                                <label><input type="checkbox" value="员工管理" class="chec2">员工管理</label>
                                            </li>
                                            <li class="li1 LI">
                                                <label><input type="checkbox" value="商品录用" class="chec2">商品录用</label>
                                            </li>
                                            <li class="li1 LI">
                                                <label><input type="checkbox" value="商品信息" class="chec2">商品信息</label>
                                            </li>
                                            <li class="li1 LI">
                                                <label><input type="checkbox" value="未支付订单" class="chec2">未支付订单</label>
                                            </li>
                                            <li class="li1 LI">
                                                <label><input type="checkbox" value="已支付订单" class="chec2">已支付订单</label>
                                            </li>
                                            <li class="li1 LI">
                                                <label><input type="checkbox" value="客服" class="chec2">客服</label>
                                            </li>
                                            <li class="li1 LI">
                                                <label><input type="checkbox" value="报表统计" class="chec2">报表统计</label>
                                            </li>
                                            <li class="li1 LI">
                                                <label><input type="checkbox" value="日志功能" class="chec2">日志功能</label>
                                            </li>
                                            <li class="li1">
                                                <button type="button" class="btn btn-primary btn-upp">提交</button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                              </tr>`)
                        
                        $roleBox.append($roleBoxN);
                    }

                    
                 } else {
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                 }
            }
        })
    }
});
/*添加+*/
$(document).on("click","#update",function(){
    $('#myModal3').modal('show');
})
$("#butt1").unbind("click");
$(document).on("click","#butt1",function(){
    var chec1=$(".chec1");
    var str=[];
    for (var i = 0; i < chec1.length; i++) {
        if (chec1[i].checked) {
            str.push(chec1[i].value)
            // console.log(chec1[i].value)
        }
    }
    var ro_name=$('#firstname').val();
    var ro_depict=$('#lastname').val();
    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=doRole',
        data:{account:post,ro_name:ro_name,ro_depict:ro_depict,str:str},
        dataType:'json',
        success:function(data){
            if(data.code == 1001){
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
                $.ajax({
                    type:'post',
                    url:'index.php?m=admin&c=Index&a=RoleManagement',
                    data:{account:post,},
                    dataType:'json',
                    success:function(data){
                         //console.log(data)
                         if (data.code==1001) {
                            var post1=data.post1;
                            
                            $roleBox=$("#roleBox");
                            $roleBox.html("");
                            for (var i = 0; i < post1.length; i++) {
                                
                                    var $roleBoxN=$(`<tr>
                                        <td>`+post1[i].ro_id+`</td>
                                        <td contenteditable=true>`+post1[i].ro_name+`</td>
                                        <td>
                                            <div contenteditable=true>`+post1[i].ro_depict+`</div>
                                        </td>
                                        <td>
                                            <div class="btn-group btn-group-sm dropdown" >
                                                <button type="button" class="btn btn-default btn-bo btnUp">修改</button>
                                                <button type="button" class="btn btn-default btn-bo btnDe">删除</button>
                                                <button type="button" class="btn btn-default  dropdown-toggle btn-bo management" data-toggle="dropdown">权限管理</button>
                                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                                                    



                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="角色管理" class="chec2">角色管理</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="用户管理" class="chec2">用户管理</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="员工管理" class="chec2">员工管理</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="商品录用" class="chec2">商品录用</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="商品信息" class="chec2">商品信息</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="未支付订单" class="chec2">未支付订单</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="已支付订单" class="chec2">已支付订单</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="客服" class="chec2">客服</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="报表统计" class="chec2">报表统计</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="日志功能" class="chec2">日志功能</label>
                                                    </li>
                                                    <li class="li1">
                                                        <button type="button" class="btn btn-primary btn-upp">提交</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                      </tr>`)
                                
                                $roleBox.append($roleBoxN);
                            }

                            
                         } else {
                            $("#text2").html(data.msg);
                            $('#myModal2').modal('show');
                         }
                    }
                })
            }else{
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
            }
        }
    })

})
/*修改*/
$(document).on("click",".btnUp",function(){
    
    var up1=$(this).parent().parent().prev().children().html();
    var up2=$(this).parent().parent().prev().prev().prev().html();
    var up3=$(this).parent().parent().prev().prev().html();
    $("#text1").html("是否修改");
    $('#myModal1').modal('show');
    $("#but").unbind("click");
    $(document).on("click","#but",function(){
        $.ajax({
            type:'post',
            url:'index.php?m=admin&c=Index&a=btnUp',
            data:{account:post,up1:up1,up2:up2,up3:up3},
            dataType:'json',
            success:function(data){
                //console.log(data)
                if(data.code == 1001){
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');

                }
            }
        })
    })
    

})
/*删除*/
$(document).on("click",".btnDe",function(){
    var ro_id=$(this).parent().parent().prev().prev().prev().html();
    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=dodelete',
        data:{account:post,ro_id:ro_id},
        dataType:'json',
        success:function(data){
            //console.log(data)
            if(data.code == 1001){
               $("#text2").html(data.msg);
                $('#myModal2').modal('show');
               $.ajax({
                    type:'post',
                    url:'index.php?m=admin&c=Index&a=RoleManagement',
                    data:{account:post,},
                    dataType:'json',
                    success:function(data){
                         //console.log(data)
                         if (data.code==1001) {
                            var post1=data.post1;
                            
                            $roleBox=$("#roleBox");
                            $roleBox.html("");
                            for (var i = 0; i < post1.length; i++) {
                                
                                    var $roleBoxN=$(`<tr>
                                        <td>`+post1[i].ro_id+`</td>
                                        <td contenteditable=true>`+post1[i].ro_name+`</td>
                                        <td>
                                            <div contenteditable=true>`+post1[i].ro_depict+`</div>
                                        </td>
                                        <td>
                                            <div class="btn-group btn-group-sm dropdown" >
                                                <button type="button" class="btn btn-default btn-bo btnUp">修改</button>
                                                <button type="button" class="btn btn-default btn-bo btnDe">删除</button>
                                                <button type="button" class="btn btn-default  dropdown-toggle btn-bo management" data-toggle="dropdown">权限管理</button>
                                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                                                    



                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="角色管理" class="chec2">角色管理</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="用户管理" class="chec2">用户管理</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="员工管理" class="chec2">员工管理</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="商品录用" class="chec2">商品录用</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="商品信息" class="chec2">商品信息</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="未支付订单" class="chec2">未支付订单</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="已支付订单" class="chec2">已支付订单</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="客服" class="chec2">客服</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="报表统计" class="chec2">报表统计</label>
                                                    </li>
                                                    <li class="li1 LI">
                                                        <label><input type="checkbox" value="日志功能" class="chec2">日志功能</label>
                                                    </li>
                                                    <li class="li1">
                                                        <button type="button" class="btn btn-primary btn-upp">提交</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                      </tr>`)
                                
                                $roleBox.append($roleBoxN);
                            }

                            
                         } else {
                            $("#text2").html(data.msg);
                            $('#myModal2').modal('show');
                         }
                    }
                })
            }else{
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
            }
        }
    })
})
/*权限管理*/
$(document).on("click",".management",function(){
    /*if ($(this).attr("class")!="btn btnLi disabled") {
        console.log($(this).prev().text());
    }*/
    var ti_post=$(this).parent().parent().prev().prev().text();
    var chec2=$(this).parent().find('li').find('label').find('input');
    /*for (var i = 0; i < chec2.length; i++) {
        chec2[i].checked=true;
    }*/
    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=btnbo',
        data:{account:post,ti_post:ti_post},
        dataType:'json',
        success:function(data){
            //console.log(data)
            if(data.code == 1001){
                for (var i = 0; i < data.post.length; i++) {
                    for (var j = 0; j < chec2.length; j++) {
                        if (data.post[i].ti_content==chec2[j].value) {
                            chec2[j].checked=true;
                        }
                    }
                }
                
            }
        }
    })
})
/*修改权限*/
$(document).on("click",".btn-upp",function(){
    /*var chec2=$(this).parent().find('li').find('label').find('input');*/
    var chec2=$(this).parent().parent().find('.LI').find('input');;
    var ti_post=$(this).parent().parent().parent().parent().prev().prev().text();
    var Chec2=[];
    for (var i = 0; i < chec2.length; i++) {
        if (chec2[i].checked==true) {
            Chec2.push(chec2[i].value) ;
        }
    }
    //console.log(Chec2)
    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=btnupp',
        data:{account:post,ti_post:ti_post,Chec2:Chec2},
        dataType:'json',
        success:function(data){
            //console.log(data)
            if(data.code == 1001){
                $.ajax({
                    type:'post',
                    url:'index.php?m=admin&c=Index&a=doIndex',
                    data:{account:post,post:post.st_post},
                    dataType:'json',
                    success:function(data1){
                        // console.log(data1)
                        if(data1.code == 1001){
                            var post=data1.post;
                            $(".btnn").each(function(){
                                $(this).addClass("disabled");
                                for (var i = 0; i < post.length; i++) {
                                    if ($(this).text()==post[i].ti_content) {
                                        $(this).removeClass("disabled");
                                    }
                                }
                            })
                        }else{
                            $("#text2").html(data.msg);
                            $('#myModal2').modal('show');
                        }
                    }
                })
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
            }else{
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
            }
        }
    })
})
/*员工管理*/
$(document).on("click","#but10",function(){
    if ($("#but10").attr("class")!="btnn btn btn-default disabled blue") {
        $("#RoleManagement").css("display","none");
        $("#Personne").css("display","block");
        $("#Users").css("display","none");
        $("#GoodsEmployed").css("display","none");
        $("#Blurb").css("display","none");
        $("#nonPayment").css("display","none");
        $("#paid").css("display","none");
        $("#service").css("display","none");
        $("#statistics").css("display","none");
        $("#greetbox").css("display","none");
        $("#journal").css("display","none");
    }

    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=but10',
        data:{account:post,},
        dataType:'json',
        success:function(data){
            //console.log(data)
            if(data.code == 1001){
                $position1=$("#position1");
                $position1.html("");
                for (var i = 0; i < data.role.length; i++) {
                    var option=(`<option>`+data.role[i].ro_name+`</option>`);
                    $position1.append(option);
                }
                $staffBox=$("#staffBox");
                $staffBox.html("");
                var state='';
                for (var i = 0; i < data.staff.length; i++) {
                    if (data.staff[i].st_state=='使用') {
                        state='禁用';
                    } else {
                        state='使用';
                    }
                    var staffBox1=(`<tr>
                                 <td>
                                    <div contenteditable=true class="acc2">`+data.staff[i].st_acc+`</div>
                                 </td>
                                 <td>
                                    <div contenteditable=true class="name2">`+data.staff[i].st_name+`</div>
                                 </td>
                                 <td>
                                    <div contenteditable=true class="pwd2">123</div>
                                 </td>
                                 <td>
                                    <select class="form-control">
                                        <option>`+data.staff[i].st_state+`</option>
                                        <option>`+state+`</option>
                                    </select>
                                 </td>
                                 <td>`+data.staff[i].st_post+`</td>
                                 <td>
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-default  btn-sm btn-bo btn-up">修改</button>
                                        <button type="button" class="btn btn-default  btn-sm btn-bo btn-de">删除</button>
                                    </div>
                                 </td>
                              </tr>`);
                    $staffBox.append(staffBox1);
                }
            }
        }
    })


});
/*添加+*/
$(document).on("click","#update2",function(){
    $('#myModal4').modal('show');
})
/*添加账号*/
$(document).on("keyup","#acc1",function(){
    var reg1=/^[0-9]{5}$/;
    var t1=$("#acc1").val();
    if (t1.match(reg1)!=null) {
        $("#p1").html('账号输入正确');
        $("#p1").css("color","green");
    }else{
        $("#p1").html('请输入5位数字账号');
        $("#p1").css("color","red");
    }
})
$(document).on("keyup","#name1",function(){
    var reg3=/^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
    var t3=$("#name1").val();
    if (t3.match(reg3)!=null) {
        $("#p2").html('昵称可以使用');
        $("#p2").css("color","green");
    }
})
$(document).on("keyup","#pwd1",function(){
    var reg2=/^\w{3,6}$/;
    var t2=$("#pwd1").val();
    if (t2.match(reg2)!=null) {
        $("#p3").html('密码输入正确');
        $("#p3").css("color","green");
    }else{
        $("#p3").html('请输入3-6位数字、字母密码；不区分大小写');
        $("#p3").css("color","red");
    }
})
$("#butt4").unbind("click");
$(document).on("click","#butt4",function(){
    var reg1=/^[0-9]{5}$/;
    var acc1=$("#acc1").val();
    var reg3=/^\w$/;
    var name1=$("#name1").val();
    var reg2=/^\w{3,6}$/;
    var pwd1=$("#pwd1").val();
    var position1=$("#position1 option:selected").text();
    if (acc1.match(reg1)!=null&&pwd1.match(reg2)!=null) {
        $.ajax({
            type:'post',
            url:'index.php?m=admin&c=Index&a=butt4',
            data:{account:post,acc1:acc1,name1:name1,pwd1:pwd1,position1:position1},
            dataType:'json',
            success:function(data){
                console.log(data)
                if(data.code == 1001){
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                    $.ajax({
                        type:'post',
                        url:'index.php?m=admin&c=Index&a=but10',
                        data:{account:post,},
                        dataType:'json',
                        success:function(data){
                            //console.log(data)
                            if(data.code == 1001){
                                $position1=$("#position1");
                                $position1.html("");
                                for (var i = 0; i < data.role.length; i++) {
                                    var option=(`<option>`+data.role[i].ro_name+`</option>`);
                                    $position1.append(option);
                                }
                                $staffBox=$("#staffBox");
                                $staffBox.html("");
                                for (var i = 0; i < data.staff.length; i++) {
                                    if (data.staff[i].st_state=='使用') {
                                        state='禁用';
                                    } else {
                                        state='使用';
                                    }
                                    var staffBox1=(`<tr>
                                                 <td>
                                                    <div contenteditable=true class="acc2">`+data.staff[i].st_acc+`</div>
                                                 </td>
                                                 <td>
                                                    <div contenteditable=true class="name2">`+data.staff[i].st_name+`</div>
                                                 </td>
                                                 <td>
                                                    <div contenteditable=true class="pwd2">123</div>
                                                 </td>
                                                 <td>
                                                    <select class="form-control">
                                                        <option>使用</option>
                                                        <option>禁用</option>
                                                    </select>
                                                 </td>
                                                 <td>`+data.staff[i].st_post+`</td>
                                                 <td>
                                                    <div class="btn-group">
                                                        <button type="button" class="btn btn-default btn-bo btn-up">修改</button>
                                                        <button type="button" class="btn btn-default btn-bo btn-de">删除</button>
                                                    </div>
                                                 </td>
                                              </tr>`);
                                    $staffBox.append(staffBox1);
                                }
                            }
                        }
                    })
                }else{
                    $("#text2").html('账号重复');
                    $('#myModal2').modal('show');
                }
            }
        })

    } else {
        $("#text2").html("添加账号请输入规范");
        $('#myModal2').modal('show');
    }
})
/*修改*/
$(document).on("keyup",".acc2",function(){
    var reg1=/^[0-9]{5}$/;
    var t1=$(this).text();
    if (t1.match(reg1)!=null) {
        $(this).css("color","green");
    }else{
        $(this).css("color","red");
    }
})
$(document).on("keyup",".name2",function(){
    var reg3=/^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
    var t3=$(this).text();
    if (t3.match(reg3)!=null) {
        $(this).css("color","green");
    }
})
$(document).on("keyup",".pwd2",function(){
    var reg2=/^\w{3,6}$/;
    var t2=$(this).text();
    if (t2.match(reg2)!=null) {
        $(this).css("color","green");
    }else{
        $(this).css("color","red");
    }
})
$(document).on("click",".btn-up",function(){
    var reg1=/^[0-9]{5}$/;
    var acc2=$(this).parent().parent().prev().prev().prev().prev().prev().children().text();
    var reg3=/^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
    var name2=$(this).parent().parent().prev().prev().prev().prev().children().text();
    var reg2=/^\w{3,6}$/;
    var pwd2=$(this).parent().parent().prev().prev().prev().children().text();
    var position2=$(this).parent().parent().prev().prev().children().children("option:selected").text();
    var role2=$(this).parent().parent().prev().text();
    if (acc2.match(reg1)!=null&&pwd2.match(reg2)) {
        $.ajax({
            type:'post',
            url:'index.php?m=admin&c=Index&a=btnup2',
            data:{account:post,acc2:acc2,name2:name2,pwd2:pwd2,position2:position2,role2:role2},
            dataType:'json',
            success:function(data){
                // console.log(data)
                if(data.code == 1001){
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                    $.ajax({
                        type:'post',
                        url:'index.php?m=admin&c=Index&a=but10',
                        data:{account:post,},
                        dataType:'json',
                        success:function(data){
                            // console.log(data)
                            if(data.code == 1001){
                                $position1=$("#position1");
                                $position1.html("");
                                for (var i = 0; i < data.role.length; i++) {
                                    var option=(`<option>`+data.role[i].ro_name+`</option>`);
                                    $position1.append(option);
                                }
                                $staffBox=$("#staffBox");
                                $staffBox.html("");
                                var state='';
                                for (var i = 0; i < data.staff.length; i++) {
                                    if (data.staff[i].st_state=='使用') {
                                        state='禁用';
                                    } else {
                                        state='使用';
                                    }
                                    if (data.staff[i].st_state=='使用') {
                                        state='禁用';
                                    } else {
                                        state='使用';
                                    }
                                    var staffBox1=(`<tr>
                                                 <td>
                                                    <div contenteditable=true class="acc2">`+data.staff[i].st_acc+`</div>
                                                 </td>
                                                 <td>
                                                    <div contenteditable=true class="name2">`+data.staff[i].st_name+`</div>
                                                 </td>
                                                 <td>
                                                    <div contenteditable=true class="pwd2">123</div>
                                                 </td>
                                                 <td>
                                                    <select class="form-control">
                                                        <option>`+data.staff[i].st_state+`</option>
                                                        <option>`+state+`</option>
                                                    </select>
                                                 </td>
                                                 <td>`+data.staff[i].st_post+`</td>
                                                 <td>
                                                    <div class="btn-group">
                                                        <button type="button" class="btn btn-default btn-bo btn-up">修改</button>
                                                        <button type="button" class="btn btn-default btn-bo btn-de">删除</button>
                                                    </div>
                                                 </td>
                                              </tr>`);
                                    $staffBox.append(staffBox1);
                                }
                            }
                        }
                    })
                }else{
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                }
            }
        })
    } else {
        $("#text2").html('请注意修改规范');
        $('#myModal2').modal('show');
    }
})
/*删除*/
$(document).on("click",".btn-de",function(){
    var delete2=$(this).parent().parent().prev().prev().prev().prev().prev().children().text();
    // console.log(delete2)
    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=btnDe',
        data:{account:post,delete2:delete2},
        dataType:'json',
        success:function(data){
            // console.log(data)
            if(data.code == 1001){
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
                $.ajax({
                    type:'post',
                    url:'index.php?m=admin&c=Index&a=but10',
                    data:{account:post,},
                    dataType:'json',
                    success:function(data){
                        //console.log(data)
                        if(data.code == 1001){
                            $position1=$("#position1");
                            $position1.html("");
                            for (var i = 0; i < data.role.length; i++) {
                                var option=(`<option>`+data.role[i].ro_name+`</option>`);
                                $position1.append(option);
                            }
                            $staffBox=$("#staffBox");
                            $staffBox.html("");
                            var state='';
                            for (var i = 0; i < data.staff.length; i++) {
                                if (data.staff[i].st_state=='使用') {
                                    state='禁用';
                                } else {
                                    state='使用';
                                }
                                var staffBox1=(`<tr>
                                             <td>
                                                <div contenteditable=true class="acc2">`+data.staff[i].st_acc+`</div>
                                             </td>
                                             <td>
                                                <div contenteditable=true class="name2">`+data.staff[i].st_name+`</div>
                                             </td>
                                             <td>
                                                <div contenteditable=true class="pwd2">123</div>
                                             </td>
                                             <td>
                                                <select class="form-control">
                                                    <option>`+data.staff[i].st_state+`</option>
                                                    <option>`+state+`</option>
                                                </select>
                                             </td>
                                             <td>`+data.staff[i].st_post+`</td>
                                             <td>
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-default btn-bo btn-up">修改</button>
                                                    <button type="button" class="btn btn-default btn-bo btn-de">删除</button>
                                                </div>
                                             </td>
                                          </tr>`);
                                $staffBox.append(staffBox1);
                            }
                        }
                    }
                })
            }else{
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
            }
        }
    })
})
/*用户管理*/
function showReport2(page){
    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=but2',
        data:{account:post,page:page},
        dataType:'json',
        success:function(data){
            // console.log(data)
            if(data.code == 1001){
                var post=data.post;
                $userBox=$("#userBox");
                $userBox.html("");
                var lock="";
                var E="";
                var QQ="";
                var money="";
                for (var i = 0; i < post.length; i++) {
                    if (post[i].u_state=="正常") {
                        lock="锁定";
                    } else {
                        lock="解锁";
                    }
                    if (post[i].u_E==null) {
                        E="暂无";
                    } else {
                        E=post[i].u_E;
                    }
                    if (post[i].u_QQ==null) {
                        QQ="暂无";
                    } else {
                        QQ=post[i].u_QQ;
                    }
                    if (post[i].u_money==null) {
                        money="0.00";
                    } else {
                        money=post[i].u_money;
                    }
                    var userBox=$(`<tr>
                         <td>`+post[i].u_acc+`</td>
                         <td>`+post[i].u_name+`</td>
                         <td>`+post[i].u_time+`</td>
                         <td>`+E+`</td>
                         <td>`+QQ+`</td>
                         <td>`+money+`</td>
                         <td>`+post[i].u_state+`</td>
                         <td>
                            <img src=`+post[i].u_img+` class="userImg">
                         </td>
                         <td>
                            
                            <div class="btn-group">
                                <button type="button" class="btn btn-default btn-sm btn-bo btn-lock">`+lock+`</button>
                                <button type="button" class="btn btn-default btn-sm btn-bo btn-reset">重置</button>
                            </div>

                         </td>
                      </tr>
                    `)
                    $userBox.append(userBox);
                }
                $("#pageParent").html(data.page);
            }else{
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
            }
        }
    })
}

$(document).on("click","#but2",function(){
    if ($("#but2").attr("class")!="btnn btn btn-default disabled blue") {
        $("#RoleManagement").css("display","none");
        $("#Personne").css("display","none");
        $("#Users").css("display","block");
        $("#GoodsEmployed").css("display","none");
        $("#Blurb").css("display","none");
        $("#nonPayment").css("display","none");
        $("#paid").css("display","none");
        $("#service").css("display","none");
        $("#statistics").css("display","none");
        $("#greetbox").css("display","none");
        $("#journal").css("display","none");
    }
    showReport2(1)
});
/*搜索*/
$(document).on("click","#userSearch",function(){
    var userBook=$("#userBook").val();
    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=userSearch',
        data:{account:post,userBook:userBook},
        dataType:'json',
        success:function(data){
            // console.log(data)
            if(data.code == 1001){
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
                $("#pageParent").html("");
                var post=data.post;
                $userBox=$("#userBox");
                $userBox.html("");
                var lock="";
                var E="";
                var QQ="";
                var money="";
                for (var i = 0; i < post.length; i++) {
                    if (post[i].u_state=="正常") {
                        lock="锁定";
                    } else {
                        lock="解锁";
                    }
                    if (post[i].u_E==null) {
                        E="暂无";
                    } else {
                        E=post[i].u_E;
                    }
                    if (post[i].u_QQ==null) {
                        QQ="暂无";
                    } else {
                        QQ=post[i].u_QQ;
                    }
                    if (post[i].u_money==null) {
                        money="0.00";
                    } else {
                        money=post[i].u_money;
                    }
                    var userBox=$(`<tr>
                         <td>`+post[i].u_acc+`</td>
                         <td>`+post[i].u_name+`</td>
                         <td>`+post[i].u_time+`</td>
                         <td>`+E+`</td>
                         <td>`+QQ+`</td>
                         <td>`+money+`</td>
                         <td>`+post[i].u_state+`</td>
                         <td>
                            <img src=`+post[i].u_img+` class="userImg">
                         </td>
                         <td>
                            
                            <div class="btn-group">
                                <button type="button" class="btn btn-default btn-sm btn-bo btn-lock">`+lock+`</button>
                                <button type="button" class="btn btn-default btn-sm btn-bo btn-reset">重置</button>
                            </div>

                         </td>
                      </tr>
                    `)
                    $userBox.append(userBox);
                }
            }else{
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
            }
        }
    })
    })
/*锁定/解锁*/
$(document).on("click",".btn-lock",function(){
    var acc=$(this).parent().parent().prev().prev().prev().prev().prev().prev().prev().prev().text();
    var lock=$(this).text();
    var gotoPage=$("#gotoPage option:selected").text();
    $("#text1").html("是否"+lock+"？");
    $('#myModal1').modal('show');
    $("#but").unbind("click");
    $(document).on("click","#but",function(){
        $.ajax({
            type:'post',
            url:'index.php?m=admin&c=Index&a=btnLock',
            data:{account:post,acc:acc,lock:lock},
            dataType:'json',
            success:function(data){
                // console.log(data)
                if(data.code == 1001){
                    showReport2(gotoPage);
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                }else{
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                }
            }
        })

    })
})
/*重置*/
$(document).on("click",".btn-reset",function(){
    var acc=$(this).parent().parent().prev().prev().prev().prev().prev().prev().prev().prev().text();
    var gotoPage=$("#gotoPage option:selected").text();
    $("#text1").html("是否重置账号密码和支付密码？");
    $('#myModal1').modal('show');
    $("#but").unbind("click");
    $(document).on("click","#but",function(){
        $.ajax({
            type:'post',
            url:'index.php?m=admin&c=Index&a=btnReset',
            data:{account:post,acc:acc},
            dataType:'json',
            success:function(data){
                // console.log(data)
                if(data.code == 1001){
                    showReport2(gotoPage);
                    $("#text2").html(data.msg+"密码为：123");
                    $('#myModal2').modal('show');
                }else{
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                }
            }
        })
    })
})
/*商品录用*/
$(document).on("click","#but3",function(){
    if ($("#but3").attr("class")!="btnn btn btn-default disabled blue") {
        $("#RoleManagement").css("display","none");
        $("#Personne").css("display","none");
        $("#Users").css("display","none");
        $("#GoodsEmployed").css("display","block");
        $("#Blurb").css("display","none");
        $("#nonPayment").css("display","none");
        $("#paid").css("display","none");
        $("#service").css("display","none");
        $("#statistics").css("display","none");
        $("#greetbox").css("display","none");
        $("#journal").css("display","none");
    }
});
/*图片预览*/
$(document).on("change","#file2",function(){
    var objUrl = $(this)[0].files[0];
    if (objUrl!=undefined) {
        var windowURL = window.URL || window.webkitURL;
        var dataURL = windowURL.createObjectURL(objUrl);
        var img=$(`<img src="`+dataURL+`">`);
        $("#preview").html("");
        $("#preview").append(img);
    }
})
/*图片上传*/
var uploadingImg2;
$(document).on("click","#btnFile2",function(){
    uploadingImg2="";
    if($('#file2').val() == ''){  
        $("#text2").html('请选择图片再进行上传操作！');
        $('#myModal2').modal('show');
　　}else{
        var animateimg = $("#file2").val();
        var imgarr=animateimg.split('\\'); 
        var myimg=imgarr[imgarr.length-1]; 
        var houzui = myimg.lastIndexOf('.'); 
        var ext = myimg.substring(houzui, myimg.length).toUpperCase(); 
        
        var file = $('#file2').get(0).files[0]; 
        var fileSize = file.size;           
        var maxSize = 5242880;
            if(ext !='.PNG' && ext !='.GIF' && ext !='.JPG' && ext !='.JPEG' && ext !='.BMP'){
                $("#text2").html('文件类型错误,请上传图片类型');
                $('#myModal2').modal('show');
                return false;
            }else if(parseInt(fileSize) >= parseInt(maxSize)){
                $("#text2").html('上传的文件不能超过5MB');
                $('#myModal2').modal('show');
                 
                return false;
            }else{  
                var data = new FormData($('#form2')[0]); 
                $.ajax({
                    type:'post',
                    url:'index.php?m=admin&c=Index&a=btnFile2',
                    data:data,
                    dataType:'json',
                    cache: false,  
                    processData: false,  
                    contentType: false,  
                    success:function(data){
                        console.log(data)
                        if(data.code == 1001){
                            $("#text2").html(data.msg);
                            $('#myModal2').modal('show');
                            uploadingImg2=data.post;
                        }else{
                            $("#text2").html(data.msg);
                            $('#myModal2').modal('show');
                            uploadingImg2="";
                        }
                        //console.log(uploadingImg2)
                    }
                })
            }
    }

})

/*清空*/
$(document).on("click","#goodSempty1",function(){
    $("#goodsName1").val('');
    $("#time2").val('');
    $("#goodsPrice1").val('');
    $("#goodsStock1").val('');
    $("#file2").val('');
    $("#details1").val('');
    $('#preview img').remove();
})
var goodsUp1Time
laydate.render({
  elem: '#time2',
  type: 'datetime',
  done: function(value){
    goodsUp1Time='';
    goodsUp1Time=value;
  }
});
/*促销商品发布*/
$(document).on("click","#goodsUp1",function(){
    var goodsName1=$("#goodsName1").val();
    var goodsPrice1=$("#goodsPrice1").val();
    var goodsStock1=$("#goodsStock1").val();
    var goodsState1=$("#goodsState1 option:selected").text();
    var details1=$("#details1").val();
    if (goodsName1!=""&&goodsPrice1!=""&&goodsStock1!=""&&uploadingImg2!=undefined) {
        $.ajax({
            type:'post',
            url:'index.php?m=admin&c=Index&a=goodsUp1',
            data:{account:post,
                goodsName1:goodsName1,
                uploadingImg2:uploadingImg2,
                goodsPrice1:goodsPrice1,
                goodsStock1:goodsStock1,
                time:goodsUp1Time,
                goodsState1:goodsState1,
                details1:details1
            },
            dataType:'json',
            success:function(data){
                // console.log(data)
                if(data.code == 1001){
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                    $("#goodsName1").val('');
                    $("#time2").val('');
                    $("#goodsPrice1").val('');
                    $("#goodsStock1").val('');
                    $("#file2").val('');
                    $("#details1").val('');
                    $('#preview img').remove();
                }else{
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                    $("#goodsName1").val('');
                    $("#time2").val('');
                    $("#goodsPrice1").val('');
                    $("#goodsStock1").val('');
                    $("#file2").val('');
                    $("#details1").val('');
                    $('#preview img').remove();
                                    }
            }
        })
    } else {
        $("#text2").html("请注意商品信息是否完整！");
        $('#myModal2').modal('show');
    }
})
///////////////////////////////////秒杀部分
/*图片预览*/
$(document).on("change","#file3",function(){
    var objUrl = $(this)[0].files[0];
    if (objUrl!=undefined) {
        var windowURL = window.URL || window.webkitURL;
        var dataURL = windowURL.createObjectURL(objUrl);
        var img=$(`<img src="`+dataURL+`">`);
        $("#preview2").html("");
        $("#preview2").append(img);
    }
})
/*图片上传*/
var uploadingImg3;
$(document).on("click","#btnFile3",function(){
    uploadingImg3="";
    if($('#file3').val() == ''){  
        $("#text2").html('请选择图片再进行上传操作！');
        $('#myModal2').modal('show');
　　}else{
        var animateimg = $("#file3").val();
        var imgarr=animateimg.split('\\'); 
        var myimg=imgarr[imgarr.length-1]; 
        var houzui = myimg.lastIndexOf('.'); 
        var ext = myimg.substring(houzui, myimg.length).toUpperCase(); 
        
        var file = $('#file3').get(0).files[0]; 
        var fileSize = file.size;           
        var maxSize = 5242880;
            if(ext !='.PNG' && ext !='.GIF' && ext !='.JPG' && ext !='.JPEG' && ext !='.BMP'){
                $("#text2").html('文件类型错误,请上传图片类型');
                $('#myModal2').modal('show');
                return false;
            }else if(parseInt(fileSize) >= parseInt(maxSize)){
                $("#text2").html('上传的文件不能超过5MB');
                $('#myModal2').modal('show');
                 
                return false;
            }else{  
                var data = new FormData($('#form3')[0]); 
                $.ajax({
                    type:'post',
                    url:'index.php?m=admin&c=Index&a=btnFile3',
                    data:data,
                    dataType:'json',
                    cache: false,  
                    processData: false,  
                    contentType: false,  
                    success:function(data){
                        // console.log(data)
                        if(data.code == 1001){
                            $("#text2").html(data.msg);
                            $('#myModal2').modal('show');
                            uploadingImg3=data.post;
                        }else{
                            $("#text2").html(data.msg);
                            $('#myModal2').modal('show');
                            uploadingImg3="";
                        }
                        //console.log(uploadingImg2)
                    }
                })
            }
    }

})

/*秒杀商品发布*/
var goodsUp2Time1;
var goodsUp2Time2;
laydate.render({
  elem: '#time3',
  type: 'datetime',
  done: function(value3){
    goodsUp2Time1="";
    goodsUp2Time1=value3;
  }
})
laydate.render({
      elem: '#time4',
      type: 'datetime',
      done: function(value4){
        goodsUp2Time2="";
        goodsUp2Time2=value4;
        if (goodsUp2Time2<goodsUp2Time1) {
            $("#eTime").css("color","red")
            $("#eTime").addClass("eTime")
        } else{
            $("#eTime").css("color","green")
        }

      }
    })
$(document).on("click","#goodsUp2",function(){
    var goodsName2=$("#goodsName2").val();
    var goodsPrice2=$("#goodsPrice2").val();
    var goodsStock2=$("#goodsStock2").val();
    var goodsQuota2=$("#goodsQuota2").val();
    var details2=$("#details2").val();
    if (goodsName2!=""&&goodsPrice2!=""&&goodsStock2!=""&&uploadingImg3!=undefined&&$("#eTime").attr("class")=="col-sm-2") {
         $.ajax({
            type:'post',
            url:'index.php?m=admin&c=Index&a=goodsUp2',
            data:{account:post,
                goodsName2:goodsName2,
                uploadingImg3:uploadingImg3,
                goodsPrice2:goodsPrice2,
                goodsStock2:goodsStock2,
                itime:goodsUp2Time1,
                etime:goodsUp2Time2,
                goodsQuota2:goodsQuota2,
                details2:details2
            },
            dataType:'json',
            success:function(data){
                // console.log(data)
                if(data.code == 1001){
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                    $("#goodsName2").val('');
                    $("#time3").val('');
                    $("#time4").val('');
                    $("#goodsPrice2").val('');
                    $("#goodsStock2").val('');
                    $("#goodsQuota2").val('');
                    $("#file3").val('');
                    $("#details2").val('');
                    $('#preview2 img').remove();
                }else{
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                    $("#goodsName2").val('');
                    $("#time3").val('');
                    $("#time4").val('');
                    $("#goodsPrice2").val('');
                    $("#goodsStock2").val('');
                    $("#goodsQuota2").val('');
                    $("#file3").val('');
                    $("#details2").val('');
                    $('#preview2 img').remove();
                }
            }
        })
        
    } else {
        $("#text2").html("请注意商品信息是否完整！");
        $('#myModal2').modal('show');
    }
})

/*清空*/
$(document).on("click","#goodSempty2",function(){
    $("#goodsName2").val('');
    $("#time3").val('');
    $("#time4").val('');
    $("#goodsPrice2").val('');
    $("#goodsStock2").val('');
    $("#goodsQuota2").val('');
    $("#file3").val('');
    $("#details2").val('');
    $('#preview2 img').remove();
})
/*商品信息*/
function showReport(page){
    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=but4',
        data:{account:post,page:page},
        dataType:'json',
        success:function(data){
            if(data.code == 1001){
                var go_etime="";
                var go_id="";
                for (var i = 0; i < data.post.length; i++) {
                    if (data.post[i].go_etime!=null) {
                        if (CurveTime>data.post[i].go_etime) {
                            go_etime=data.post[i].go_etime;
                            go_id=data.post[i].go_id;
                            $.ajax({
                                type:'post',
                                url:'index.php?m=admin&c=Index&a=overdue',
                                data:{account:post,
                                    go_etime:go_etime,
                                    go_id:go_id,
                                },
                                dataType:'json'
                            })
                        }
                    }

                }
                $goodsBox=$("#goodsBox");
                $goodsBox.html("");
                $detailsBox=$("#detailsBox");
                $detailsBox.html("");
                var sold='';
                for (var i = 0; i < data.post.length; i++) {
                    if (data.post[i].go_state=="上架") {
                        sold='下架';
                    }else{
                        sold='上架';
                    }
                    var goodsbox=$(`
                                <tr>
                                 <td value="`+data.post[i].go_id+`">`+(i+1)+`</td>
                                 <td>`+data.post[i].go_name+`</td>
                                 <td>
                                    <img src=`+data.post[i].go_img+`>
                                 </td>
                                 <td>`+data.post[i].go_price+`</td>
                                 <td>`+data.post[i].go_stock+`</td>
                                 <td>`+data.post[i].go_type+`</td>
                                 <td>`+data.post[i].go_ptime+`</td>
                                 <td>`+data.post[i].go_itime+`</td>
                                 <td>
                                    <button type="button" class="btn btn-default btn-sm btn-bo btn-edit">修改</button>
                                    <button type="button" class="btn btn-default btn-sm btn-bo btn-sold">`+sold+`</button>
                                    <button type="button" class="btn btn-default btn-sm btn-bo"  data-toggle="modal"  data-target="#details`+data.post[i].go_id+`">详情</button>
                                 </td>
                              </tr>
                              `);
                    $goodsBox.append(goodsbox);
                    var detailsBoxs=$(`
                        <div class="modal fade" id="details`+data.post[i].go_id+`" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                &times;
                                            </button>
                                            <h4 class="modal-title" id="myModalLabel">
                                                商品详细信息
                                            </h4>
                                        </div>
                                        <div class="modal-body" id="modalBody`+data.post[i].go_id+`">
                                            `+data.post[i].go_details+`
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `)
                    $detailsBox.append(detailsBoxs);
                }
                $("#goodPage").html(data.page);
            }else{
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
            }
        }
    })
}
$(document).on("click","#but4",function(){
    if ($("#but4").attr("class")!="btnn btn btn-default disabled blue") {
        $("#RoleManagement").css("display","none");
        $("#Personne").css("display","none");
        $("#Users").css("display","none");
        $("#GoodsEmployed").css("display","none");
        $("#Blurb").css("display","block");
        $("#nonPayment").css("display","none");
        $("#paid").css("display","none");
        $("#service").css("display","none");
        $("#statistics").css("display","none");
        $("#greetbox").css("display","none");
        $("#journal").css("display","none");
    }
    showReport(1);
    
});
/*编辑*/
var addTime;
var addImg;
$(document).on("click",".btn-edit",function(){
    addTime="";
    addImg="";
    var go_id1=$(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().text();
    var go_id2=$(this).parent().prev().prev().prev().prev().prev().prev().prev().prev('td').attr("value");
    var go_name=$(this).parent().prev().prev().prev().prev().prev().prev().prev().text();
    var go_img=$(this).parent().prev().prev().prev().prev().prev().prev().find("img").attr("src");
    var go_price=$(this).parent().prev().prev().prev().prev().prev().text();
    var go_stock=$(this).parent().prev().prev().prev().prev().text();
    var go_type=$(this).parent().prev().prev().prev().text();
    var go_ptime=$(this).parent().prev().prev().text();
    var go_itime=$(this).parent().prev().text();
    var go_details=$("#modalBody"+go_id2).text();
    addTime=go_ptime;
    addImg=go_img;
    if (go_type=="秒杀") {
        $("#text2").html("秒杀商品！无法修改");
    $('#myModal2').modal('show');
    } else {
        $("#s1").text(go_id1);
        $("#s1").attr("value",go_id2);
        $("#s2").text(go_name);
        $("#s3").text(go_price);
        $("#s4").text(go_stock);
        $("#time1").val(go_itime);
        $("#details").text(go_details);
        $("#headImg").attr("src",go_img);

         $('#myModal5').modal('show');
    }
    
    
})
/*图片预览*/
$(document).on("change","#file1",function(){
    var objUrl = $(this)[0].files[0];
    if (objUrl!=undefined) {
        var windowURL = window.URL || window.webkitURL;  
        var dataURL = windowURL.createObjectURL(objUrl);
        $("#headImg").attr("src", dataURL);
    }
})
/*图片上传*/
var uploadingImg
$(document).on("click","#btnFile",function(){
    if($('#file1').val() == ''){  
        $("#text2").html('请选择图片再进行上传操作！');
        $('#myModal2').modal('show');
　　}else{
        var animateimg = $("#file1").val();
        var imgarr=animateimg.split('\\'); 
        var myimg=imgarr[imgarr.length-1]; 
        var houzui = myimg.lastIndexOf('.'); 
        var ext = myimg.substring(houzui, myimg.length).toUpperCase(); 
        
        var file = $('#file1').get(0).files[0]; 
        var fileSize = file.size;           
        var maxSize = 5242880;
            if(ext !='.PNG' && ext !='.GIF' && ext !='.JPG' && ext !='.JPEG' && ext !='.BMP'){
                $("#text2").html('文件类型错误,请上传图片类型');
                $('#myModal2').modal('show');
                return false;
            }else if(parseInt(fileSize) >= parseInt(maxSize)){
                $("#text2").html('上传的文件不能超过5MB');
                $('#myModal2').modal('show');
                 
                return false;
            }else{  
                var data = new FormData($('#form1')[0]); 
                $.ajax({
                    type:'post',
                    url:'index.php?m=admin&c=Index&a=btnFile',
                    data:data,
                    dataType:'json',
                    cache: false,  
                    processData: false,  
                    contentType: false,  
                    success:function(data){
                        // console.log(data)
                        if(data.code == 1001){
                            $("#text2").html(data.msg);
                            $('#myModal2').modal('show');
                            uploadingImg=data.post;
                        }else{
                            $("#text2").html(data.msg);
                            $('#myModal2').modal('show');
                            uploadingImg=addImg;
                        }
                    }
                })
            }
    }
})
/*提交修改*/
$("#butt5").unbind("click");
$(document).on("click","#butt5",function(){
    $("#text1").html("是否修改");
    $('#myModal1').modal('show');
    $("#but").unbind("click");
    $(document).on("click","#but",function(){
      
        var id=$("#s1").attr("value");
        var name=$("#s2").text();
        var time=$("#time1").val();
        if (uploadingImg==undefined) {
            var img=addImg;
        } else {
            var img=uploadingImg;
        }
        var price=$("#s3").text();
        var stock=$("#s4").text();
        var details=$("#details").text();
        $.ajax({
            type:'post',
            url:'index.php?m=admin&c=Index&a=butt5',
            data:{account:post,
                id:id,
                name:name,
                img:img,
                price:price,
                stock:stock,
                time:time,
                details:details
            },
            dataType:'json',
            success:function(data){
                // console.log(data)
                if(data.code == 1001){
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                    showReport($("#goodPage .now_page").text());
                }else{
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                    showReport($("#goodPage .now_page").text());
                }
            }
        })
    
    })
    
})
/*修改上架时间*/
laydate.render({
    elem: '#time1',
    type: 'datetime',
    done: function(value){
        if (value>addTime) {
            $("#addTime").css("color","green");
            $("#addTime").addClass("addTime");
        } else {
            $("#addTime").css("color","red");
        }
        /*提交修改*/
        $("#butt5").unbind("click");
        $(document).on("click","#butt5",function(){
            $("#text1").html("是否修改");
            $('#myModal1').modal('show');
            $("#but").unbind("click");
            $(document).on("click","#but",function(){
                if ($("#addTime").attr("class")=="col-sm-2 addTime") {
                    var id=$("#s1").attr("value");
                    var name=$("#s2").text();
                    if (uploadingImg==undefined) {
                        var img=addImg;
                    } else {
                        var img=uploadingImg;
                    }
                    var price=$("#s3").text();
                    var stock=$("#s4").text();
                    var details=$("#details").text();
                    $.ajax({
                        type:'post',
                        url:'index.php?m=admin&c=Index&a=butt5',
                        data:{account:post,
                            id:id,
                            name:name,
                            img:img,
                            price:price,
                            stock:stock,
                            time:value,
                            details:details
                        },
                        dataType:'json',
                        success:function(data){
                            // console.log(data)
                            if(data.code == 1001){
                                $("#text2").html(data.msg);
                                $('#myModal2').modal('show');
                                showReport($("#goodPage .now_page").text());
                            }else{
                                $("#text2").html(data.msg);
                                $('#myModal2').modal('show');
                                showReport($("#goodPage .now_page").text());
                            }
                        }
                    })
                } else {
                    $("#text2").html("发布时间不规范");
                    $('#myModal2').modal('show');
                }
            })
            
        })
    }
});


/*上架/下架*/
$(document).on("click",".btn-sold",function(){
    var id=$(this).parent().prev().prev().prev().prev().prev().prev().prev().prev().attr("value");
    var state=$(this).text();
    var state2=$(this).parent().prev().prev().prev().text();
    if (state2=="秒杀") {
        $("#text2").html("秒杀商品！无法修改");
        $('#myModal2').modal('show');
    } else {
       $("#text1").html("是否"+state);
        $('#myModal1').modal('show');
        $("#but").unbind("click");
        $(document).on("click","#but",function(){
            $.ajax({
                type:'post',
                url:'index.php?m=admin&c=Index&a=btnSold',
                data:{account:post,id:id,state:state},
                dataType:'json',
                success:function(data){
                    // console.log(data)
                    if(data.code == 1001){
                        $("#text2").html(data.msg);
                        $('#myModal2').modal('show');
                        showReport($("#goodPage .now_page").text());
                    }else{
                        $("#text2").html(data.msg);
                        $('#myModal2').modal('show');
                        showReport($("#goodPage .now_page").text());
                    }
                }
            })
                
        })
        /*$(document).on("click","#but",function(){
            $("#text1").html("是否"+state);
            $('#myModal1').modal('show');
            $(document).on("click","#but",function(){
                $.ajax({
                    type:'post',
                    url:'index.php?m=admin&c=Index&a=btnSold',
                    data:{account:post,id:id,state:state},
                    dataType:'json',
                    success:function(data){
                        // console.log(data)
                        if(data.code == 1001){
                            $("#text2").html(data.msg);
                            $('#myModal2').modal('show');
                            showReport($(".now_page").text());
                        }else{
                            $("#text2").html(data.msg);
                            $('#myModal2').modal('show');
                            showReport($(".now_page").text());
                        }
                    }
                })
            })
            
        })*/
    }
    
    
})
/*商品查找*/
$(document).on("click","#btnFind",function(){
    if ($("#select1 option:selected").text()=="选择分类"||$("#select1 option:selected").text()=="全部") {
        var select1=null;
    } else {
        var select1=$("#select1 option:selected").text();
    }
    if ($("#select2 option:selected").text()=="商品状态"||$("#select2 option:selected").text()=="全部") {
        var select2=null;
    } else {
        if ($("#select2 option:selected").text()=="未上架商品"||$("#select2 option:selected").text()=="过期商品") {
            var select2="下架";
        } else {
            var select2="上架";
        }
    }
    if ($("#tradeName").val()=="") {
        var tradeName=null;
    } else {
        var tradeName=$("#tradeName").val();
    }
    /*console.log(select1)
    console.log(select2)
    console.log(tradeName)*/
    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=btnFind',
        data:{account:post,select1:select1,
            select2:select2,
            tradeName:tradeName},
        dataType:'json',
        success:function(data){
            //console.log(data)
            if(data.code == 1001){
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
                $goodsBox=$("#goodsBox");
                $goodsBox.html("");
                $detailsBox=$("#detailsBox");
                $detailsBox.html("");
                var sold='';
                for (var i = 0; i < data.post.length; i++) {
                    if (data.post[i].go_state=="上架") {
                        sold='下架';
                    }else{
                        sold='上架';
                    }
                    var goodsbox=$(`
                                <tr>
                                 <td value="`+data.post[i].go_id+`">`+data.post[i].go_id+`</td>
                                 <td>`+data.post[i].go_name+`</td>
                                 <td>
                                    <img src=`+data.post[i].go_img+`>
                                 </td>
                                 <td>`+data.post[i].go_price+`</td>
                                 <td>`+data.post[i].go_stock+`</td>
                                 <td>`+data.post[i].go_type+`</td>
                                 <td>`+data.post[i].go_ptime+`</td>
                                 <td>`+data.post[i].go_itime+`</td>
                                 <td>
                                    <button type="button" class="btn btn-default btn-sm btn-bo btn-edit">修改</button>
                                    <button type="button" class="btn btn-default btn-sm btn-bo btn-sold">`+sold+`</button>
                                    <button type="button" class="btn btn-default btn-sm btn-bo"  data-toggle="modal"  data-target="#details`+data.post[i].go_id+`">详情</button>
                                 </td>
                              </tr>
                              `);
                    $goodsBox.append(goodsbox);
                    var detailsBoxs=$(`
                        <div class="modal fade" id="details`+data.post[i].go_id+`" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                                &times;
                                            </button>
                                            <h4 class="modal-title" id="myModalLabel">
                                                商品详细信息
                                            </h4>
                                        </div>
                                        <div class="modal-body">
                                            `+data.post[i].go_details+`
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `)
                    $detailsBox.append(detailsBoxs);
                }
                $("#goodPage").html('');
            }else{
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
            }
        }
    })
})
/*未支付订单*/
function showReport3(page){
    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=but5',
        data:{account:post,page:page},
        dataType:'json',
        success:function(data){
            // console.log(data)
            if(data.code == 1001){
                $nonPaymentBox=$("#nonPaymentBox");
                $nonPaymentBox.html("");
                $detailsBox=$("#detailsBox");
                $detailsBox.html("");
                for (var i = 0; i < data.post.length; i++) {
                    var nonPaymentBox=$(`<tr>
                                 <td class="`+data.post[i].or_id+`">`+data.post[i].or_orderID+`</td>
                                 <td>`+data.post[i].or_acc+`</td>
                                 <td>`+data.post[i].or_type+`</td>
                                 <td>￥`+data.post[i].or_money+`</td>
                                 <td>`+data.post[i].or_time+`</td>
                                 <td>`+data.post[i].or_state+`</td>
                                 <td>
                                    <button type="button" class="btn btn-sm btn-default  btn-nonPayment">详情</button>
                                 </td>
                              </tr>
                        `)
                    $nonPaymentBox.append(nonPaymentBox);
                    var detailsBox=$(`<div class="modal fade" id="myModal6`+data.post[i].or_id+`" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                            &times;
                                        </button>
                                        <h4 class="modal-title" id="myModalLabel">
                                            订单详情
                                        </h4>
                                    </div>
                                    <div class="modal-body" id="nonPayment1">
                                        `+data.post[i].or_details+`
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `);
                    $detailsBox.append(detailsBox);
                }
                $("#nonPaymentPage").html(data.page)
            }else{
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
            }
        }
    })
}
$(document).on("click","#but5",function(){
    if ($("#but5").attr("class")!="btnn btn btn-default disabled blue") {
        $("#RoleManagement").css("display","none");
        $("#Personne").css("display","none");
        $("#Users").css("display","none");
        $("#GoodsEmployed").css("display","none");
        $("#Blurb").css("display","none");
        $("#nonPayment").css("display","block");
        $("#paid").css("display","none");
        $("#service").css("display","none");
        $("#statistics").css("display","none");
        $("#greetbox").css("display","none");
        $("#journal").css("display","none");
    }
    showReport3(1)
});
/*未完成详情*/
$(document).on("click",".btn-nonPayment",function(){
    var id=$(this).parent().prev().prev().prev().prev().prev().prev().attr("class");
    $("#myModal6"+id).modal('show');
})
/*已支付订单*/
function showReport4(page){
    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=but6',
        data:{account:post,page:page},
        dataType:'json',
        success:function(data){
            // console.log(data)
            if(data.code == 1001){
                $paidBox=$("#paidBox");
                $paidBox.html("");
                $detailsBox=$("#detailsBox");
                $detailsBox.html("");
                var paid2="";
                for (var i = 0; i < data.post.length; i++) {
                    if (data.post[i].or_state=="已支付") {
                        paid2=`<button type="button" class="btn btn-default btn_bo btn-sm btn-paid2">发货</button>`;
                    } else {
                         paid2=`<button type="button" class="btn btn-default btn_bo btn-sm disabled btn-paid2">发货</button>`;
                    }
                    var paidBox=$(`<tr>
                                 <td class="`+data.post[i].or_id+`">`+data.post[i].or_orderID+`</td>
                                 <td>`+data.post[i].or_acc+`</td>
                                 <td>`+data.post[i].or_type+`</td>
                                 <td>￥`+data.post[i].or_money+`</td>
                                 <td>`+data.post[i].or_time+`</td>
                                 <td>`+data.post[i].or_state+`</td>
                                 <td>
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-default btn_bo btn-sm btn-paid1">详情</button>
                                        `+paid2+`
                                    </div>
                                 </td>
                              </tr>
                        `)
                    $paidBox.append(paidBox);
                    var detailsBox=$(`<div class="modal fade" id="myModal7`+data.post[i].or_id+`" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                                            &times;
                                        </button>
                                        <h4 class="modal-title" id="myModalLabel">
                                            订单详情
                                        </h4>
                                    </div>
                                    <div class="modal-body" id="nonPayment1">
                                        `+data.post[i].or_details+`
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `);
                    $detailsBox.append(detailsBox);
                }
                $("#paidPage").html(data.page)
            }else{
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
            }
        }
    })
}
$(document).on("click","#but6",function(){
    if ($("#but6").attr("class")!="btnn btn btn-default disabled blue") {
        $("#RoleManagement").css("display","none");
        $("#Personne").css("display","none");
        $("#Users").css("display","none");
        $("#GoodsEmployed").css("display","none");
        $("#Blurb").css("display","none");
        $("#nonPayment").css("display","none");
        $("#paid").css("display","block");
        $("#service").css("display","none");
        $("#statistics").css("display","none");
        $("#greetbox").css("display","none");
        $("#journal").css("display","none");
    }
    showReport4(1)
});
/*已支付详情*/
$(document).on("click",".btn-paid1",function(){
    var id=$(this).parent().parent().prev().prev().prev().prev().prev().prev().attr("class");
    $("#myModal7"+id).modal('show');
})
/*已支付发货*/
$(document).on("click",".btn-paid2",function(){
    if ($(this).attr("class")!="btn btn-default btn_bo btn-sm disabled btn-paid2") {
        var id=$(this).parent().parent().prev().prev().prev().prev().prev().prev().text();
        $.ajax({
            type:'post',
            url:'index.php?m=admin&c=Index&a=btnPaid2',
            data:{account:post,id:id},
            dataType:'json',
            success:function(data){
                // console.log(data)
                if(data.code == 1001){
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                    showReport4($("#paidPage .now_page").text())
                }else{
                    $("#text2").html(data.msg);
                    $('#myModal2').modal('show');
                }
            }
        })
    } 
    
})
/*客服*/
$(document).on("click","#but7",function(){
    if ($("#but7").attr("class")!="btnn btn btn-default disabled blue") {
        $("#RoleManagement").css("display","none");
        $("#Personne").css("display","none");
        $("#Users").css("display","none");
        $("#GoodsEmployed").css("display","none");
        $("#Blurb").css("display","none");
        $("#nonPayment").css("display","none");
        $("#paid").css("display","none");
        $("#service").css("display","block");
        $("#statistics").css("display","none");
        $("#greetbox").css("display","none");
        $("#journal").css("display","none");
    }
});
/*报表统计*/
$(document).on("click","#but8",function(){
    if ($("#but8").attr("class")!="btnn btn btn-default disabled blue") {
        $("#RoleManagement").css("display","none");
        $("#Personne").css("display","none");
        $("#Users").css("display","none");
        $("#GoodsEmployed").css("display","none");
        $("#Blurb").css("display","none");
        $("#nonPayment").css("display","none");
        $("#paid").css("display","none");
        $("#service").css("display","none");
        $("#statistics").css("display","block");
        $("#greetbox").css("display","none");
        $("#journal").css("display","none");
    }
    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=but8',
        data:{account:post},
        dataType:'json',
        success:function(data){
            console.log(data)
            if(data.code == 1001){
                $("#datatableBox").html('');
                $("#datatable2Box").html('');
                for (var i = 0; i < data.post1.length; i++) {
                    $("#datatableBox").append($(`<tr>
                                                    <th>`+data.post1[i].months+`月</th>
                                                    <td>`+data.post1[i].run+`</td>
                                                </tr>`));
                }
                for (var i = 0; i < data.post2.length; i++) {
                    $("#datatable2Box").append($(`<tr>
                                                    <th>`+data.post2[i].months+`月</th>
                                                    <td>`+data.post2[i].run+`</td>
                                                </tr>`));
                }

                var chart = Highcharts.chart('container', {
                    data: {
                        table: 'datatable'
                    },
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '2020年每月销售额统计'
                        // 该功能依赖 data.js 模块，详见https://www.hcharts.cn/docs/data-modules
                    },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: '元',
                            rotation: 0
                        }
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.series.name + '</b><br/>' +
                                this.point.y + ' 元' + this.point.name.toLowerCase();
                        }
                    }
                });
                var chart = Highcharts.chart('container2', {
                    data: {
                        table: 'datatable2'
                    },
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: '2020年每月注册用户统计'
                        // 该功能依赖 data.js 模块，详见https://www.hcharts.cn/docs/data-modules
                    },
                    yAxis: {
                        allowDecimals: false,
                        title: {
                            text: '个',
                            rotation: 0
                        }
                    },
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.series.name + '</b><br/>' +
                                this.point.y + ' 个' + this.point.name.toLowerCase();
                        }
                    }
                });


                
            }else{
                $("#text2").html(data.msg);
                $('#myModal2').modal('show');
            }
        }
    })

});
/*日志功能*/
$(document).on("click","#but9",function(){
    if ($("#but9").attr("class")!="btnn btn btn-default disabled blue") {
        $("#RoleManagement").css("display","none");
        $("#Personne").css("display","none");
        $("#Users").css("display","none");
        $("#GoodsEmployed").css("display","none");
        $("#Blurb").css("display","none");
        $("#nonPayment").css("display","none");
        $("#paid").css("display","none");
        $("#service").css("display","none");
        $("#statistics").css("display","none");
        $("#greetbox").css("display","none");
        $("#journal").css("display","block");
    }
    $.ajax({
        type:'post',
        url:'index.php?m=admin&c=Index&a=but9',
        data:{},
        dataType:'json',
        success:function(data){
            console.log(data);
            $("#journal").append($(`<div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-10 size18 word">`+data+`</div>
                            <div class="col-sm-1"></div>
                        </div>`));
            /*for (var i = 0; i < data.length; i++) {
                $("#journal").append($(`<p>`+data[i]+`</p>`))
            }*/
        }
    })
});
var ws = new WebSocket("ws://127.0.0.1:8888");
ws.onopen = function() {
    console.log("与服务器建立连接...");
    var msg = {
        type: "backstage",
        data: {
            post: post
        }
    }
    ws.send(JSON.stringify(msg));
}
ws.onmessage = function(msg) {
    //6.收到服务器的信息data
    var msgobj = JSON.parse(msg.data);
    var type = msgobj.type;
    var content = msgobj.data;
    console.log(msgobj)
    switch (type) {
        case "QchatRT":
            if (content.ch_accept==post) {
                var serviceName=$(".serviceName");
                var serbox=$(".serbox");
                var array=[];
                if (serviceName.length>0&&serbox.length>0) {
                    serviceName.each(function () {
                        array.push($(this).text());
                    });
                    var num=0;
                    for (var i = 0; i < array.length; i++) {
                        if (array[i]==content.ch_sendAcc) {
                            num=1;
                        }
                    }
                    if (num==0) {
                        $("#serviceName").append($(`<li><a href="#service`+content.ch_sendAcc+`" data-toggle="tab" class="serviceName" flog="`+content.ch_sendAcc+`">`+content.ch_sendAcc+`</a></li>`))
                        $("#serviceContent").append($(`<div class="tab-pane fade serbox" id="service`+content.ch_sendAcc+`">
                                    <div class="serviceChat">
                                        <div class="serviceChat1">
                                            <p>`+content.ch_sendAcc+`对你说：`+content.ch_content+`</P>
                                        </div>
                                        <div class="serviceChat2">
                                            <div class="input-group">
                                                <input type="text" class="form-control chatBox">
                                                <span class="input-group-btn">
                                                    <button class="btn btn-default ChatBtn" type="button">
                                                        发送
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`))
                    } else {
                        $("#service"+content.ch_sendAcc).find(".serviceChat1").append($(`<p>`+content.ch_sendAcc+`对你说：`+content.ch_content+`</P>`))
                    }   
                } else {
                   $("#serviceName").append($(`<li><a href="#service`+content.ch_sendAcc+`" data-toggle="tab" class="serviceName" flog="`+content.ch_sendAcc+`">`+content.ch_sendAcc+`</a></li>`))
                   $("#serviceContent").append($(`<div class="tab-pane fade serbox" id="service`+content.ch_sendAcc+`">
                                <div class="serviceChat">
                                    <div class="serviceChat1">
                                        <p>`+content.ch_sendAcc+`对你说：`+content.ch_content+`</P>
                                    </div>
                                    <div class="serviceChat2">
                                        <div class="input-group">
                                            <input type="text" class="form-control chatBox">
                                            <span class="input-group-btn">
                                                <button class="btn btn-default ChatBtn" type="button">
                                                    发送
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>`))
                }
                
            }
        
        break;
    }
}




/*客服*/
var servicename
$(document).on("click",".serviceName",function(){
    servicename='';
    servicename=$(this).text();
    
})
$(document).on("click",".ChatBtn",function(){
    var content=$(this).parent().parent().find(".chatBox").val();
    var serviceChat1=$(this).parent().parent().parent().parent().find(".serviceChat1");
    serviceChat1.append($(`<p class="tright">你对`+servicename+`说：`+content+`</P>`));
    var msg = {
            type: "Hchat",
            data: {
                "ch_sendAcc": String(post), 
                "ch_accept": String(servicename), 
                "ch_content": content,
            }
        }
        ws.send(JSON.stringify(msg));
})
