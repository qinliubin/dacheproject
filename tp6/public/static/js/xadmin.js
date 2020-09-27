$(function () {
    //åŠ è½½å¼¹å‡ºå±‚
    layui.use(['form','element'],
        function() {
            layer = layui.layer;
            element = layui.element;
        });

    //è§¦å‘äº‹ä»¶
    var tab = {
        tabAdd: function(title,url,id){
            //æ–°å¢žä¸€ä¸ªTabé¡¹
            element.tabAdd('xbs_tab', {
                title: title
                ,content: '<iframe tab-id="'+id+'" frameborder="0" src="'+url+'" scrolling="yes" class="x-iframe"></iframe>'
                ,id: id
            })
        }
        ,tabDelete: function(othis){
            //åˆ é™¤æŒ‡å®šTabé¡¹
            element.tabDelete('xbs_tab', '44'); //åˆ é™¤ï¼šâ€œå•†å“ç®¡ç†â€


            othis.addClass('layui-btn-disabled');
        }
        ,tabChange: function(id){
            //åˆ‡æ¢åˆ°æŒ‡å®šTabé¡¹
            element.tabChange('xbs_tab', id); //åˆ‡æ¢åˆ°ï¼šç”¨æˆ·ç®¡ç†
        }
    };


    tableCheck = {
        init:function  () {
            $(".layui-form-checkbox").click(function(event) {
                if($(this).hasClass('layui-form-checked')){
                    $(this).removeClass('layui-form-checked');
                    if($(this).hasClass('header')){
                        $(".layui-form-checkbox").removeClass('layui-form-checked');
                    }
                }else{
                    $(this).addClass('layui-form-checked');
                    if($(this).hasClass('header')){
                        $(".layui-form-checkbox").addClass('layui-form-checked');
                    }
                }

            });
        },
        getData:function  () {
            var obj = $(".layui-form-checked").not('.header');
            var arr=[];
            obj.each(function(index, el) {
                arr.push(obj.eq(index).attr('data-id'));
            });
            return arr;
        }
    }

    //å¼€å¯è¡¨æ ¼å¤šé€‰
    tableCheck.init();


    $('.container .left_open i').click(function(event) {
        if($('.left-nav').css('left')=='0px'){
            $('.left-nav').animate({left: '-221px'}, 100);
            $('.page-content').animate({left: '0px'}, 100);
            $('.page-content-bg').hide();
        }else{
            $('.left-nav').animate({left: '0px'}, 100);
            $('.page-content').animate({left: '221px'}, 100);
            if($(window).width()<768){
                $('.page-content-bg').show();
            }
        }

    });

    $('.page-content-bg').click(function(event) {
        $('.left-nav').animate({left: '-221px'}, 100);
        $('.page-content').animate({left: '0px'}, 100);
        $(this).hide();
    });

    $('.layui-tab-close').click(function(event) {
        $('.layui-tab-title li').eq(0).find('i').remove();
    });

    //å·¦ä¾§èœå•æ•ˆæžœ
    // $('#content').bind("click",function(event){
    $('.left-nav #nav li').click(function (event) {

        if($(this).children('.sub-menu').length){
            if($(this).hasClass('open')){
                $(this).removeClass('open');
                $(this).find('.nav_right').html('&#xe697;');
                $(this).children('.sub-menu').stop().slideUp();
                $(this).siblings().children('.sub-menu').slideUp();
            }else{
                $(this).addClass('open');
                $(this).children('a').find('.nav_right').html('&#xe6a6;');
                $(this).children('.sub-menu').stop().slideDown();
                $(this).siblings().children('.sub-menu').stop().slideUp();
                $(this).siblings().find('.nav_right').html('&#xe697;');
                $(this).siblings().removeClass('open');
            }
        }else{

            var url = $(this).children('a').attr('_href');
            var title = $(this).find('cite').html();
            var index  = $('.left-nav #nav li').index($(this));

            for (var i = 0; i <$('.x-iframe').length; i++) {
                if($('.x-iframe').eq(i).attr('tab-id')==index+1){
                    tab.tabChange(index+1);
                    event.stopPropagation();
                    return;
                }
            };

            tab.tabAdd(title,url,index+1);
            tab.tabChange(index+1);
        }

        event.stopPropagation();

    })

})

/*å¼¹å‡ºå±‚*/
/*
    å‚æ•°è§£é‡Šï¼š
    title   æ ‡é¢˜
    url     è¯·æ±‚çš„url
    id      éœ€è¦æ“ä½œçš„æ•°æ®id
    w       å¼¹å‡ºå±‚å®½åº¦ï¼ˆç¼ºçœè°ƒé»˜è®¤å€¼ï¼‰
    h       å¼¹å‡ºå±‚é«˜åº¦ï¼ˆç¼ºçœè°ƒé»˜è®¤å€¼ï¼‰
*/
function x_admin_show(title,url,w,h){
    if (title == null || title == '') {
        title=false;
    };
    if (url == null || url == '') {
        url="404.html";
    };
    if (w == null || w == '') {
        w=($(window).width()*0.9);
    };
    if (h == null || h == '') {
        h=($(window).height() - 50);
    };
    layer.open({
        type: 2,
        area: [w+'px', h +'px'],
        fix: false, //ä¸å›ºå®š
        maxmin: true,
        shadeClose: true,
        shade:0.4,
        title: title,
        content: url
    });
}

/*å…³é—­å¼¹å‡ºæ¡†å£*/
function x_admin_close(){
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}


