$(document).on("click","#login",function(){
	window.location.href = 'index.php?m=home&c=Login&a=Login';
})
$(window).load(function(){
	$('.str1').liMarquee({
		direction: 'up'	
	});
});
/*提示登录*/
function modalLogin(){
	$("#text2").html("请先登录账号");
	$('#myModal2').modal('show');
	$("#but2").unbind("click");
	$(document).on("click","#but2",function(){
		window.location.href = 'index.php?m=home&c=Login&a=Login';
	})
}
var USERID =JSON.parse(window.localStorage.getItem('hx200309acc'));
// console.log(USERID)
if (USERID!=null) {
	$("#login").remove();
	$.ajax({
	    type:'post',
	    url:'index.php?m=home&c=Home&a=doHome',
	    data:{acc:USERID},
	    dataType:'json',
	    success:function(data){
	        // console.log(data)
	        if(data.code == 1001){
	            $("#loginBox").append($(`<span>欢迎您：</span>
						<span id="Account">`+data.msg[0].u_name+`</span>&nbsp;|&nbsp;
						<span id="out" class="cursor">退出</span>`))
	        }else{
	            $("#text1").html(data.msg);
	            $('#myModal1').modal('show');
	        }
	    }
	})
} 
/*退出*/
$(document).on("click","#out",function(){
	$("#text2").html("是否退出");
	$('#myModal2').modal('show');
	$("#but2").unbind("click");
	$(document).on("click","#but2",function(){
		window.localStorage.removeItem('hx200309acc');
		location.reload();
	})
})

/*秒杀商品路口*/
function saleAjax(hour,id){
	var CurveDay = new Date();
	CurveDay.setTime(CurveDay.getTime());
	if ((CurveDay.getMonth()+1)<10) {
	    var month='0'+(CurveDay.getMonth()+1);
	} else {
	    var month=(CurveDay.getMonth()+1);
	}
	var CurveTime = CurveDay.getFullYear()+"-" + month + "-" + CurveDay.getDate() + " " +hour + ":00:00";
	var CurveTime2 = CurveDay.getFullYear()+"-" + month + "-" + CurveDay.getDate() + " " +CurveDay.getHours() + ":" + CurveDay.getMinutes() + ":" + CurveDay.getSeconds();
	$.ajax({
	    type:'post',
	    url:'index.php?m=home&c=Home&a=saleAjax',
	    data:{itime:CurveTime,etime:CurveTime2},
	    dataType:'json',
	    success:function(data){
	        // console.log(data)
	        if(data.code == 1001){
	            $("#"+id).html("");
				for (var i = 0; i < data.msg.length; i++) {
					$("#"+id).append($(`<div class="col-xs-3 SaleGoods height362">
											<img src=`+data.msg[i].go_img+`>
											<p>
												<span class="SaleName">`+data.msg[i].go_name+`</span>
												<span class="floatRight font-size12">
													库存：<b><span class="SaleCount">`+data.msg[i].go_stock+`</span></b>
												</span>
											</p>
											<p>
												<span>秒杀价￥<b><span class="SalePrice">`+data.msg[i].go_price+`</span></b></span>
												<span class="floatRight">限购：<span class="SaleQuota">`+data.msg[i].go_Quota+`</span></span>
											</p>
											<p>
												<span class="SaleIntro">`+data.msg[i].go_details+`</span>
											</p>
											<p>
												
												    <button type="button" class="btn btn-default AddSale" value=`+data.msg[i].go_id+`>秒杀</button>
												
											</p>
										</div>`))
				}
	        }
	    }
	})
}
 saleAjax("00","seckill0");
 $(document).on("click","#saleTime0",function(){
 	saleAjax("00","seckill0");
 })
 $(document).on("click","#saleTime1",function(){
 	saleAjax("01","seckill1");
 })
 $(document).on("click","#saleTime2",function(){
 	saleAjax("02","seckill2");
 })
 $(document).on("click","#saleTime3",function(){
 	saleAjax("03","seckill3");
 })
 $(document).on("click","#saleTime4",function(){
 	saleAjax("04","seckill4");
 })
 $(document).on("click","#saleTime5",function(){
 	saleAjax("05","seckill5");
 })
 $(document).on("click","#saleTime6",function(){
 	saleAjax("06","seckill6");
 })
 $(document).on("click","#saleTime7",function(){
 	saleAjax("07","seckill7");
 })
 $(document).on("click","#saleTime8",function(){
 	saleAjax("08","seckill8");
 })
 $(document).on("click","#saleTime9",function(){
 	saleAjax("09","seckill9");
 })
 $(document).on("click","#saleTime10",function(){
 	saleAjax("10","seckill10");
 })
 $(document).on("click","#saleTime11",function(){
 	saleAjax("11","seckill11");
 })
 $(document).on("click","#saleTime12",function(){
 	saleAjax("12","seckill12");
 })
 $(document).on("click","#saleTime13",function(){
 	saleAjax("13","seckill13");
 })
 $(document).on("click","#saleTime14",function(){
 	saleAjax("14","seckill14");
 })
 $(document).on("click","#saleTime15",function(){
 	saleAjax("15","seckill15");
 })
 $(document).on("click","#saleTime16",function(){
 	saleAjax("16","seckill16");
 })
 $(document).on("click","#saleTime17",function(){
 	saleAjax("17","seckill17");
 })
 $(document).on("click","#saleTime18",function(){
 	saleAjax("18","seckill18");
 })
 $(document).on("click","#saleTime19",function(){
 	saleAjax("19","seckill19");
 })
 $(document).on("click","#saleTime20",function(){
 	saleAjax("20","seckill20");
 })
 $(document).on("click","#saleTime21",function(){
 	saleAjax("21","seckill21");
 })
 $(document).on("click","#saleTime22",function(){
 	saleAjax("22","seckill22");
 })
 $(document).on("click","#saleTime23",function(){
 	saleAjax("23","seckill23");
 })
/*普通商品路口*/
function commonGoods(){
	var CurveDay = new Date();
	CurveDay.setTime(CurveDay.getTime());
	if ((CurveDay.getMonth()+1)<10) {
	    var month='0'+(CurveDay.getMonth()+1);
	} else {
	    var month=(CurveDay.getMonth()+1);
	}
	var CurveTime = CurveDay.getFullYear()+"-" + month + "-" + CurveDay.getDate() + " " +CurveDay.getHours() + ":" + CurveDay.getMinutes() + ":" + CurveDay.getSeconds();
	$.ajax({
	    type:'post',
	    url:'index.php?m=home&c=Home&a=commonGoods',
	    data:{time:CurveTime},
	    dataType:'json',
	    success:function(data){
	        // console.log(data)
	        if(data.code == 1001){
	            $("#generalGoods").html('');
	            for (var i = 0; i < data.msg.length; i++) {
	            	$("#generalGoods").append($(`<div class="col-xs-3 commonGoods height415">
								<img src=`+data.msg[i].go_img+`>
								<p>
									<span class="goodsName">`+data.msg[i].go_name+`</span>
									<span class="floatRight font-size12">
										库存：<b><span class="goodsCount">`+data.msg[i].go_stock+`</span></b>
									</span>
								</p>
								<p>
									<span>价格：￥<span class="goodsPrice">`+data.msg[i].go_price+`</span></span>
								</p>
								<p>
									<span class="goodsIntro">`+data.msg[i].go_details+`</span>
								</p>
								<p>
									
									<div class="btn-group">
									    <button type="button" class="btn btn-default AddCart" value=`+data.msg[i].go_id+`>加入购物车</button>
									    <button type="button" class="btn btn-default ShopNow" value=`+data.msg[i].go_id+`>立即购买</button>
									</div>

								</p>
							</div>`))
	            }
	        }else{
	            $("#text1").html(data.msg);
	            $('#myModal1').modal('show');
	            $("#generalGoods").html('');
	        }
	    }
	})
}
commonGoods();
/*首页*/
$(document).on("click","#log",function(){
	$("#homePage").css("display","block");
	$("#MyCenter").css("display","none");
	commonGoods();
})
/*加入购物车*/
$(document).on("click",".AddCart",function(){
	if (USERID!=null) {
		var id=$(this).val();
		var count= parseFloat($(this).parent().parent().find(".goodsCount").text())-1;
		var name=$(this).parent().parent().find(".goodsName").text();
		var money=$(this).parent().parent().find(".goodsPrice").text();
		$.ajax({
		    type:'post',
		    url:'index.php?m=home&c=Home&a=AddCart',
		    data:{acc:USERID,id:id,count:count,name:name,money:money},
		    dataType:'json',
		    success:function(data){
		        // console.log(data)
		        if(data.code == 1001){
		            $("#text1").html(data.msg);
		            $('#myModal1').modal('show');
		            commonGoods()
		        }else{
		            $("#text1").html(data.msg);
		            $('#myModal1').modal('show');
		            commonGoods()
		        }
		    }
		})
	}else{
		modalLogin()
	}
})
/*立即购买*/
$(document).on("click",".ShopNow",function(){
	if (USERID!=null) {
		var id=$(this).val();
	    var count= parseFloat($(this).parent().parent().find(".goodsCount").text())-1;
		var name=$(this).parent().parent().find(".goodsName").text();
		var money=$(this).parent().parent().find(".goodsPrice").text();
		var CurveDay = new Date();
		CurveDay.setTime(CurveDay.getTime());
		if ((CurveDay.getMonth()+1)<10) {
		    var month='0'+(CurveDay.getMonth()+1);
		} else {
		    var month=(CurveDay.getMonth()+1);
		}
		var CurveTime = CurveDay.getFullYear()+"-" + month + "-" + CurveDay.getDate() + " " +CurveDay.getHours() + ":" + CurveDay.getMinutes() + ":" + CurveDay.getSeconds();
		var money2=parseFloat($("#MyCenterMoney").text());
		if (money<=money2) {
			$("#myModalLabel4").html("请输入支付密码");
	    	$("#UGC1").attr("type","password");
	        $('#myModal4').modal('show');
	        $("#but5").unbind("click");
	        $(document).on("click","#but5",function(){
	        	$.ajax({
				    type:'post',
				    url:'index.php?m=home&c=Home&a=paymentCode',
				    data:{acc:USERID,pwd:$("#UGC1").val()},
				    dataType:'json',
				    success:function(data){
				        // console.log(data)
				        if(data.code == 1001){
							$.ajax({
							    type:'post',
							    url:'index.php?m=home&c=Home&a=ShopNow',
							    data:{id:id,count:count,acc:USERID,accMoney:money2-money,money:money,time:CurveTime,det:name+"*1"},
							    dataType:'json',
							    success:function(data){
							        // console.log(data)
							        if(data.code == 1001){
							        	commonGoods();
							            $("#text1").html(data.msg);
							            $('#myModal1').modal('show');
							        }else{
							        	commonGoods();
							            $("#text1").html(data.msg);
							            $('#myModal1').modal('show');
							        }
							    }
							})
				        }else{
				            $("#text1").html(data.msg);
				            $('#myModal1').modal('show');
				        }
				    }
				})
	        })
		}else{
			$("#text1").html("余额不足，请充值！");
		    $('#myModal1').modal('show');
		}
	}else{
		modalLogin()
	}
})
/*订单*//*默认未完成*/
function undoneA(){
	$.ajax({
	    type:'post',
	    url:'index.php?m=home&c=Home&a=undoneA',
	    data:{acc:USERID},
	    dataType:'json',
	    success:function(data){
	        // console.log(data)
	        if(data.code == 1001){
	        	$("#undoneBox").html('');
	            for (var i = 0; i < data.msg.length; i++) {
	            	if (data.msg[i].or_state=="交易关闭") {
	            		var operation=`<div class="btn-group">
											    <button type="button" class="btn btn-xs disabled btn-bo undoneCancel">取消</button>
											    <button type="button" class="btn btn-xs disabled btn-bo undonePay">支付</button>
											</div>`;
	            	} else {
						var operation=`<div class="btn-group">
											    <button type="button" class="btn btn-xs btn-bo undoneCancel">取消</button>
											    <button type="button" class="btn btn-xs btn-bo undonePay">支付</button>
											</div>`;
	            	}
	            	$("#undoneBox").append($(`<tr>
								         <td>`+data.msg[i].or_orderID+`</td>
								         <td>`+data.msg[i].or_type+`</td>
								         <td>`+data.msg[i].or_time+`</td>
								         <td>`+data.msg[i].or_money+`</td>
								         <td>`+data.msg[i].or_details+`</td>
								         <td>`+data.msg[i].or_state+`</td>
								         <td>
								         	`+operation+`
								         </td>
								      </tr>`))
	            }
	        }
	    }
	})
}
$(document).on("click","#order,#orderA,#undoneA",function(){
	if (USERID!=null) {
		$("#homePage").css("display","none");
		$("#MyCenter").css("display","block");
		$("#MyCenterBox2").css("display","block");
		$("#MyCenterBox1").css("display","none");
		$("#MyCenterBox3").css("display","none");
		$("#MyCenterBox4").css("display","none");
		$("#orderA").css("color","red");
		$("#MyCenterA").css("color","black");
		$("#CartA").css("color","black");
		$("#serviceA").css("color","black");
	undoneA();
	} else {
		modalLogin()
	}
})

/*取消订单*/
if (USERID!=null) {
	$(document).on("click",".undoneCancel",function(){
		if ($(this).attr("class")=="btn btn-xs btn-bo undoneCancel") {
			$("#text2").html("是否取消订单");
            $('#myModal2').modal('show');
            $("#but2").unbind("click");
            var or_orderID=$(this).parent().parent().prev().prev().prev().prev().prev().prev().html();
            console.log(or_orderID)
            $(document).on("click","#but2",function(){
            	$.ajax({
				    type:'post',
				    url:'index.php?m=home&c=Home&a=undoneCancel',
				    data:{acc:USERID,or_orderID:or_orderID},
				    dataType:'json',
				    success:function(data){
				        // console.log(data)
				        if(data.code == 1001){
				            $("#text1").html(data.msg);
				            $('#myModal1').modal('show');
				            undoneA();
				        }else{
				            $("#text1").html(data.msg);
				            $('#myModal1').modal('show');
				        }
				    }
				})
            })
			

		}
		
	})
}
/*支付订单*/
if (USERID!=null) {
	$(document).on("click",".undonePay",function(){
		if ($(this).attr("class")=="btn btn-xs btn-bo undonePay") {
			var or_orderID=$(this).parent().parent().prev().prev().prev().prev().prev().prev().html();
			var money=parseFloat($(this).parent().parent().prev().prev().prev().html());
			var money2=parseFloat($("#MyCenterMoney").text());
			if (money<=money2) {
				$("#text2").html("是否支付订单");
	            $('#myModal2').modal('show');
	            $("#but2").unbind("click");
	            $(document).on("click","#but2",function(){
	            	$("#myModalLabel4").html("请输入支付密码");
	            	$("#UGC1").attr("type","password");
		            $('#myModal4').modal('show');
		            $("#but5").unbind("click");
		            $(document).on("click","#but5",function(){
		            	$.ajax({
						    type:'post',
						    url:'index.php?m=home&c=Home&a=paymentCode',
						    data:{acc:USERID,pwd:$("#UGC1").val()},
						    dataType:'json',
						    success:function(data){
						        // console.log(data)
						        if(data.code == 1001){
						            var cash=money2-money;
									$.ajax({
									    type:'post',
									    url:'index.php?m=home&c=Home&a=undonePay',
									    data:{acc:USERID,cash:cash,or_orderID:or_orderID},
									    dataType:'json',
									    success:function(data){
									        // console.log(data)
									        if(data.code == 1001){
									            $("#text1").html(data.msg);
									            $('#myModal1').modal('show');
									            undoneA();
									        }else{
									            $("#text1").html(data.msg);
									            $('#myModal1').modal('show');
									        }
									    }
									})
						        }else{
						            $("#text1").html(data.msg);
						            $('#myModal1').modal('show');
						        }
						    }
						})
		            })
	            })
			} else {
				$("#text1").html("余额不足，请充值！");
		        $('#myModal1').modal('show');
			}
		}
		
	})
}
/*已完成*/
if (USERID!=null) {
	$(document).on("click","#completedA",function(){
		$.ajax({
		    type:'post',
		    url:'index.php?m=home&c=Home&a=completedA',
		    data:{acc:USERID},
		    dataType:'json',
		    success:function(data){
		        // console.log(data)
		        if(data.code == 1001){
		            $("#completedBox").html("");
		            for (var i = 0; i < data.msg.length; i++) {
		            	$("#completedBox").append($(`<tr>
									         <td>`+data.msg[i].or_orderID+`</td>
									         <td>`+data.msg[i].or_type+`</td>
									         <td>`+data.msg[i].or_time+`</td>
									         <td>`+data.msg[i].or_money+`</td>
									         <td>`+data.msg[i].or_details+`</td>
									         <td>`+data.msg[i].or_state+`</td>
									      </tr>`))
		            }
		        }else{
		            $("#completedBox").html("");
		        }
		    }
		})
	})
}
/*购物车*/
function cartA(){
	$.ajax({
	    type:'post',
	    url:'index.php?m=home&c=Home&a=CartA',
	    data:{acc:USERID},
	    dataType:'json',
	    success:function(data){
	        // console.log(data)
	        if(data.code == 1001){
	            $("#cartBox").html("");
	            for (var i = 0; i < data.msg.length; i++) {
	            	$("#cartBox").append($(`<tr>
						         <td><input type="checkbox" class="cart" value=`+data.msg[i].ca_id+`></td>
						         <td>`+data.msg[i].ca_name+`</td>
						         <td>`+data.msg[i].ca_count+`</td>
						         <td>`+data.msg[i].ca_money+`</td>
						         <td>`+data.msg[i].ca_time+`</td>
						      </tr>`))
	            }
	        }else{
	        	$("#cartBox").html("");
	        }
	    }
	})
}
$(document).on("click","#Cart,#CartA",function(){
	if (USERID!=null) {
		$("#homePage").css("display","none");
		$("#MyCenter").css("display","block");
		$("#MyCenterBox2").css("display","none");
		$("#MyCenterBox1").css("display","none");
		$("#MyCenterBox3").css("display","block");
		$("#MyCenterBox4").css("display","none");
		$("#orderA").css("color","black");
		$("#MyCenterA").css("color","black");
		$("#CartA").css("color","red");
		$("#serviceA").css("color","black");
		$("#aggregate").html("0");
		cartA();
	}else{
		modalLogin()
	}
		
})
/*全选*/
$(document).on("click","#cart",function(){
	var isChecked = $(this).prop("checked");
    $(".cart").prop("checked", isChecked);
    var sum=0;
    $(".cart:checkbox:checked").each(function(i){ 
    	var money=parseFloat($(this).parent().next().next().next().text());
        sum+=money;
    })
    $("#aggregate").text(sum);
    
})
$(document).on("change",".cart",function(){
	var sum=0;
    $(".cart:checkbox:checked").each(function(i){ 
    	var money=parseFloat($(this).parent().next().next().next().text());
        sum+=money;
    })
    $("#aggregate").text(sum);
})
/*结算*/

$(document).on("click","#Overbooking",function(){
	var userids = '';
	var sum=0;
	var id=[];
    $(".cart:checkbox:checked").each(function(i){ 
    	var name=$(this).parent().next().text();
    	var count=$(this).parent().next().next().text();
    	var money=parseFloat($(this).parent().next().next().next().text());
        userids+=name+"*"+count+"<br>"; 
        sum+=money;
        id.push($(this).val());
    })
	 if (userids == []||userids=='') {

		$("#text1").html("请选择下单商品");
		$('#myModal1').modal('show');
	 } else {
	 	/*console.log(userids);
	 	console.log(sum);*/
	 	if (sum>parseFloat($("#MyCenterMoney").text())) {
	 		$("#text1").html("余额不足，请充值！");
			$('#myModal1').modal('show');
	 	} else {
	 		$("#text2").html("是否支付订单？");
			$('#myModal2').modal('show');
			$("#but2").unbind("click");
			$(document).on("click","#but2",function(){
            	$("#myModalLabel4").html("请输入支付密码");
            	$("#UGC1").attr("type","password");
	            $('#myModal4').modal('show');
	            $("#but5").unbind("click");
	            $(document).on("click","#but5",function(){
	            	$.ajax({
					    type:'post',
					    url:'index.php?m=home&c=Home&a=paymentCode',
					    data:{acc:USERID,pwd:$("#UGC1").val()},
					    dataType:'json',
					    success:function(data){
					        // console.log(data)
					        if(data.code == 1001){
					           sum=parseFloat($("#MyCenterMoney").text())-sum;
								var CurveDay = new Date();
								CurveDay.setTime(CurveDay.getTime());
								if ((CurveDay.getMonth()+1)<10) {
								    var month='0'+(CurveDay.getMonth()+1);
								} else {
								    var month=(CurveDay.getMonth()+1);
								}
								var CurveTime = CurveDay.getFullYear()+"-" + month + "-" + CurveDay.getDate() + " " +CurveDay.getHours() + ":" + CurveDay.getMinutes() + ":" + CurveDay.getSeconds();
								$.ajax({
								    type:'post',
								    url:'index.php?m=home&c=Home&a=Overbooking',
								    data:{acc:USERID,money:sum,time:CurveTime,det:userids,id:id},
								    dataType:'json',
								    success:function(data){
								        // console.log(data)
								        if(data.code == 1001){
								        	cartA();	
								            $("#text1").html(data.msg);
								            $('#myModal1').modal('show');
								        }else{
								        	cartA();	
								            $("#text1").html(data.msg);
								            $('#myModal1').modal('show');
								        }
								    }
								})
					        }else{
					            $("#text1").html(data.msg);
					            $('#myModal1').modal('show');
					        }
					    }
					})
	            })
            })
			$("#but4").unbind("click");
            $(document).on("click","#but4",function(){
            	sum=parseFloat($("#MyCenterMoney").text())-sum;
				var CurveDay = new Date();
				CurveDay.setTime(CurveDay.getTime());
				if ((CurveDay.getMonth()+1)<10) {
				    var month='0'+(CurveDay.getMonth()+1);
				} else {
				    var month=(CurveDay.getMonth()+1);
				}
				var CurveTime = CurveDay.getFullYear()+"-" + month + "-" + CurveDay.getDate() + " " +CurveDay.getHours() + ":" + CurveDay.getMinutes() + ":" + CurveDay.getSeconds();
				$.ajax({
				    type:'post',
				    url:'index.php?m=home&c=Home&a=Overbooking2',
				    data:{acc:USERID,money:sum,time:CurveTime,det:userids,id:id},
				    dataType:'json',
				    success:function(data){
				        // console.log(data)
				        if(data.code == 1001){
				        	cartA();	
				            $("#text1").html(data.msg);
				            $('#myModal1').modal('show');
				        }else{
				        	cartA();	
				            $("#text1").html(data.msg);
				            $('#myModal1').modal('show');
				        }
				    }
				})
            })
      
	 	}
	 }
})


/*个人中心*/
function MyCenter(){
	$.ajax({
	    type:'post',
	    url:'index.php?m=home&c=Home&a=doHome',
	    data:{acc:USERID},
	    dataType:'json',
	    success:function(data){
	         // console.log(data)
	        if(data.code == 1001){
	        	$("#MyCenterImg").attr("src",data.msg[0].u_img);
	            $("#MyCenterName").html(data.msg[0].u_name);
	            if (data.msg[0].u_money==null) {
	            	$("#MyCenterMoney").html("0.00");
	            } else {
	            	$("#MyCenterMoney").html(data.msg[0].u_money);
	            }
	            $("#userId").html(data.msg[0].u_acc);
	            if (data.msg[0].u_QQ==null) {
	            	$("#userQQ").html("暂无");
	            } else {
	            	$("#userQQ").html(data.msg[0].u_QQ);
	            }
	            if (data.msg[0].u_E==null) {
	            	$("#userE").html("暂无");
	            } else {
	            	$("#userE").html(data.msg[0].u_E);
	            }
	        }else{
	            $("#text1").html(data.msg);
	            $('#myModal1').modal('show');
	        }
	    }
	})
}
$(document).on("click","#Account,#MyCenterA",function(){
	if (USERID!=null) {
		$("#homePage").css("display","none");
		$("#MyCenter").css("display","block");
		$("#MyCenterBox1").css("display","block");
		$("#MyCenterBox2").css("display","none");
		$("#MyCenterBox3").css("display","none");
		$("#MyCenterBox4").css("display","none");
		$("#MyCenterA").css("color","red");
		$("#orderA").css("color","black");
		$("#CartA").css("color","black");
		$("#serviceA").css("color","black");

		MyCenter();
	}else{
		modalLogin()
	}
	
})
/*修改头像*/
$(document).on("change","#file1",function(){
	var animateimg = $("#file1").val();
    var imgarr=animateimg.split('\\'); 
    var myimg=imgarr[imgarr.length-1]; 
    var houzui = myimg.lastIndexOf('.'); 
    var ext = myimg.substring(houzui, myimg.length).toUpperCase(); 
    
    var file = $('#file1').get(0).files[0]; 
    var fileSize = file.size;           
    var maxSize = 5242880;
    if(ext !='.PNG' && ext !='.GIF' && ext !='.JPG' && ext !='.JPEG' && ext !='.BMP'){
    	$('#file1').val('');
        $("#text1").html('文件类型错误,请上传图片类型');
        $('#myModal1').modal('show');
        
        return false;
    }else if(parseInt(fileSize) >= parseInt(maxSize)){
    	$('#file1').val('');
        $("#text1").html('上传的文件不能超过5MB');
        $('#myModal1').modal('show');
        
        return false;
    }else{ 
    	var objUrl = $(this)[0].files[0];
	    if (objUrl!=undefined) {
	        var windowURL = window.URL || window.webkitURL;
	        var dataURL = windowURL.createObjectURL(objUrl);
	       $("#MyCenterImg").attr("src",dataURL);
	    }
        var data = new FormData($('#form1')[0]); 
        $.ajax({
            type:'post',
            url:'index.php?m=home&c=Home&a=file1',
            data:data,
            dataType:'json',
            cache: false,  
            processData: false,  
            contentType: false,  
            success:function(data){
                console.log(data)
                if(data.code == 1001){
                    $.ajax({
					    type:'post',
					    url:'index.php?m=home&c=Home&a=douserImg',
					    data:{img:data.post,acc:USERID},
					    dataType:'json',
					    success:function(data1){
					        // console.log(data)
					        if(data1.code == 1001){
					            $("#text1").html(data1.msg);
					            $('#myModal1').modal('show');
	           					 $('#file1').val('');
					        }else{
					            $("#text1").html(data1.msg);
					            $('#myModal1').modal('show');
					        }
					    }
					})
                }else{
                    $("#text1").html(data.msg);
                    $('#myModal1').modal('show');
                }
                //console.log(uploadingImg2)
            }
        })
    }
    
})
/*修改头像*/
$(document).on("click","#changeName",function(){
	var name=$("#MyCenterName").text();
	$.ajax({
	    type:'post',
	    url:'index.php?m=home&c=Home&a=changeName',
	    data:{acc:USERID,name:name},
	    dataType:'json',
	    success:function(data){
	        // console.log(data)
	        if(data.code == 1001){
	            $("#text1").html(data.msg);
	            $('#myModal1').modal('show');
	        }else{
	            $("#text1").html(data.msg);
	            $('#myModal1').modal('show');
	        }
	    }
	})
})
/*充值*/
$(document).on("click","#changeMoney",function(){
	var money=parseFloat($("#MyCenterMoney").text());
	$("#myModalLabel3").html("请输入充值金额");
	$("#UGC").attr("type","text");
	$('#myModal3').modal('show');
	$("#but3").unbind("click");
	$(document).on("click","#but3",function(){
		if (!isNaN(parseFloat($("#UGC").val()))&&parseFloat($("#UGC").val())>=0) {
			var int=parseFloat($("#UGC").val());
			var Money=money+int;
			$.ajax({
			    type:'post',
			    url:'index.php?m=home&c=Home&a=changeMoney',
			    data:{acc:USERID,Money:Money},
			    dataType:'json',
			    success:function(data){
			        // console.log(data)
			        if(data.code == 1001){
			            $("#text1").html(data.msg);
			            $('#myModal1').modal('show');
			            MyCenter();
			        }else{
			            $("#text1").html(data.msg);
			            $('#myModal1').modal('show');
			        }
			    }
			})
		} else {
			$("#text1").html("请输入数字金额！");
	        $('#myModal1').modal('show');
		}
	})
	
})
/*修改密码*/
$(document).on("click","#changePwd",function(){
	$("#myModalLabel3").html("请输入新密码");
	$("#UGC").attr("type","password");
	$('#myModal3').modal('show');
	$("#but3").unbind("click");
	$(document).on("click","#but3",function(){
		var reg3=/^\w{3,6}$/;
		var t3=$("#UGC").val();
		if (t3.match(reg3)!=null) {
			$.ajax({
			    type:'post',
			    url:'index.php?m=home&c=Home&a=changePwd',
			    data:{acc:USERID,pwd:t3},
			    dataType:'json',
			    success:function(data){
			        // console.log(data)
			        if(data.code == 1001){
			            $("#text1").html(data.msg);
			            $('#myModal1').modal('show');
			        }else{
			            $("#text1").html(data.msg);
			            $('#myModal1').modal('show');
			        }
			    }
			})
		}else{
			$("#text1").html("请输入3-6位数字、字母密码");
	        $('#myModal1').modal('show');
		}
	})
	
})
/*修改支付密码*/
$(document).on("click","#changePwd2",function(){
	$("#myModalLabel3").html("请输入新的支付密码");
	$("#UGC").attr("type","password");
	$('#myModal3').modal('show');
	$("#but3").unbind("click");
	$(document).on("click","#but3",function(){
		var reg5=/^[0-9]{6}$/;
		var t5=$("#UGC").val();
		if (t5.match(reg5)!=null) {
			$.ajax({
			    type:'post',
			    url:'index.php?m=home&c=Home&a=changePwd2',
			    data:{acc:USERID,code:t5},
			    dataType:'json',
			    success:function(data){
			        // console.log(data)
			        if(data.code == 1001){
			            $("#text1").html(data.msg);
			            $('#myModal1').modal('show');
			        }else{
			            $("#text1").html(data.msg);
			            $('#myModal1').modal('show');
			        }
			    }
			})
		}else{
			$("#text1").html("请输入6位数字密码");
	        $('#myModal1').modal('show');
		}
	})
	
})
/*修改qq*/
$(document).on("click","#changeQQ",function(){
	$("#myModalLabel3").html("请输入新的QQ账号");
	$("#UGC").attr("type","text");
	$('#myModal3').modal('show');
	$("#but3").unbind("click");
	$(document).on("click","#but3",function(){
		var reg5=/^[0-9]{5,11}$/;
		var t5=$("#UGC").val();
		if (t5.match(reg5)!=null) {
			$.ajax({
			    type:'post',
			    url:'index.php?m=home&c=Home&a=changeQQ',
			    data:{acc:USERID,QQ:t5},
			    dataType:'json',
			    success:function(data){
			        // console.log(data)
			        if(data.code == 1001){
			            $("#text1").html(data.msg);
			            $('#myModal1').modal('show');
			            MyCenter();
			        }else{
			            $("#text1").html(data.msg);
			            $('#myModal1').modal('show');
			        }
			    }
			})
		}else{
			$("#text1").html("QQ账号不符合");
	        $('#myModal1').modal('show');
		}
	})
	
})
/*修改邮箱*/
$(document).on("click","#changeE",function(){
	$("#myModalLabel3").html("请输入新的邮箱");
	$("#UGC").attr("type","text");
	$('#myModal3').modal('show');
	$("#but3").unbind("click");
	$(document).on("click","#but3",function(){
		var reg5=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		var t5=$("#UGC").val();
		if (t5.match(reg5)!=null) {
			$.ajax({
			    type:'post',
			    url:'index.php?m=home&c=Home&a=changeE',
			    data:{acc:USERID,E:t5},
			    dataType:'json',
			    success:function(data){
			        // console.log(data)
			        if(data.code == 1001){
			            $("#text1").html(data.msg);
			            $('#myModal1').modal('show');
			            MyCenter();
			        }else{
			            $("#text1").html(data.msg);
			            $('#myModal1').modal('show');
			        }
			    }
			})
		}else{
			$("#text1").html("邮箱不符合");
	        $('#myModal1').modal('show');
		}
	})
	
})


/*客服*/
$(document).on("click","#serviceA",function(){
	if (USERID!=null) {
		$("#homePage").css("display","none");
		$("#MyCenter").css("display","block");
		$("#MyCenterBox2").css("display","none");
		$("#MyCenterBox1").css("display","none");
		$("#MyCenterBox3").css("display","none");
		$("#MyCenterBox4").css("display","block");
		$("#orderA").css("color","black");
		$("#MyCenterA").css("color","black");
		$("#CartA").css("color","black");
		$("#serviceA").css("color","red");
		$.ajax({
	    type:'post',
		    url:'index.php?m=home&c=Home&a=serviceA',
		    data:{},
		    dataType:'json',
		    success:function(data){
		         // console.log(data)
		        if(data.code == 1001){
		            $("#serviceBox").html("");
		            for (var i = 0; i < data.msg.length; i++) {
		            	$("#serviceBox").append($(`<p class="serviceP cursor" flog=`+data.msg[i].st_acc+`>`+data.msg[i].st_name+`</p>`))
		            }
		            
		        }else{
		            $("#text1").html(data.msg);
		            $('#myModal1').modal('show');
		        }
		    }
		})
	}else{
		modalLogin()
	}
	
})

var ws = new WebSocket("ws://127.0.0.1:8888");
ws.onopen = function() {
	console.log("与服务器建立连接...");
	var msg = {
		type: "reception",
		data: {
			USERID: USERID
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
		case "HchatRT":
		if (content.ch_accept==String(USERID)) {
			$("#serviceChat1").append($(`<p>`+content.ch_sendAcc+`对你说：`+content.ch_content+`</P>`))
		}
		
		break;
	}
}
/*聊天*/
$(document).on("dblclick",".serviceP",function(){
	$(".serviceP").css("color","#000000");
	$(this).css("color","#FF0000");
	$("#serviceChat").css("display","block");
	var id=$(this).attr("flog");
	$(document).on("click","#ChatBtn",function(){
		var content=$("#chatBox").val();
		$("#serviceChat1").append($(`<p class="tright">你对`+id+`说：`+content+`</P>`))
		var msg = {
			type: "Qchat",
			data: {
				"ch_sendAcc": String(USERID), 
				"ch_accept": String(id), 
				"ch_content": content,
			}
		}
		ws.send(JSON.stringify(msg));
	})
})
/*秒杀*/
$(document).on("click",".AddSale",function(){
	var id=$(this).val();
	var name=$(this).parent().parent().find(".SaleName").text();
	var count=parseFloat($(this).parent().parent().find(".SaleCount").text())-1;
	var price=$(this).parent().parent().find(".SalePrice").text();
	var Quota=$(this).parent().parent().find(".SaleQuota").text();
	var num=$(this).parent().parent().parent().attr("folg");
	var ID=$(this).parent().parent().parent().attr("id");
	var CurveDay = new Date();
	CurveDay.setTime(CurveDay.getTime());
	if ((CurveDay.getMonth()+1)<10) {
	    var month='0'+(CurveDay.getMonth()+1);
	} else {
	    var month=(CurveDay.getMonth()+1);
	}
	var CurveTime = CurveDay.getFullYear()+"-" + month + "-" + CurveDay.getDate() + " " +CurveDay.getHours() + ":" + CurveDay.getMinutes() + ":" + CurveDay.getSeconds();
	$("#myModalLabel4").html("请输入支付密码");
	$("#UGC1").attr("type","password");
    $('#myModal4').modal('show');
    $("#but5").unbind("click");
    $(document).on("click","#but5",function(){
    	$.ajax({
		    type:'post',
		    url:'index.php?m=home&c=Home&a=paymentCode',
		    data:{acc:USERID,pwd:$("#UGC1").val()},
		    dataType:'json',
		    success:function(data){
		        // console.log(data)
		        if(data.code == 1001){
		           $.ajax({
					    type:'post',
					    url:'index.php?m=home&c=Home&a=AddSale',
					    data:{
					    	acc:USERID,
							id: id, 
							name: name+"*1", 
							count: count,
							price: price,
							Quota:Quota,
							time:CurveTime},
					    dataType:'json',
					    success:function(data){
					         console.log(data)
					        if(data.code == 1001){
					        	saleAjax(num,ID);
					            $("#text1").html(data.msg);
					            $('#myModal1').modal('show');
					        }else{
					        	saleAjax(num,ID);
					            $("#text1").html(data.msg);
					            $('#myModal1').modal('show');
					        }
					    }
					})
		        }else{
		            $("#text1").html(data.msg);
		            $('#myModal1').modal('show');
		        }
		    }
		})
    })

	/*var msg = {
			type: "AddSale",
			data: {
				id:USERID,
				goodsID: id, 
				name: name, 
				count: count,
				price: price,
			}
		}
		ws.send(JSON.stringify(msg));*/
})
/*荣誉墙*/
setInterval(function(){
	var CurveDay = new Date();
	CurveDay.setTime(CurveDay.getTime());
	if ((CurveDay.getMonth()+1)<10) {
	    var month='0'+(CurveDay.getMonth()+1);
	} else {
	    var month=(CurveDay.getMonth()+1);
	}
	var CurveTime = CurveDay.getFullYear()+"-" + month + "-" + CurveDay.getDate() + " " +CurveDay.getHours() + ":" + CurveDay.getMinutes() + ":" +(parseFloat(CurveDay.getSeconds()) - parseFloat(5));
	$.ajax({
	    type:'post',
	    url:'index.php?m=home&c=Home&a=trotting',
	    data:{time:CurveTime},
	    dataType:'json',
	    success:function(data){
	        // console.log(data)
	        if(data.code == 1001){
	        	for (var i = 0; i < data.msg.length; i++) {
	        		$("#trotting .str_move").append($(`<p>`+data.msg[i].or_acc+`在`+data.msg[i].or_time+`秒杀了`+data.msg[i].or_details+`</p>`))
	        	}
	            
	        }
	    }
	})
},1000)