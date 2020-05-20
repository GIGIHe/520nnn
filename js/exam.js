// JavaScript Document
$(function(){



    var u = window.navigator.userAgent.toLocaleLowerCase(),
    ie11 = /(trident)\/([\d.]+)/,
    b = u.match(ie11);
    
    
        if(navigator.appName == "Microsoft Internet Explorer"  || b){
            alert("您的浏览器版本过低，为了更好的浏览体验，请下载谷歌等浏览器！若您使用的是双核浏览器，请切换到非IE内核。");
            };
    
    
        var ansarr=[];
        function roa(){
            var arr=[0,1,2,3,4,5,6,7,8,9];; //随机题目顺序
            var temp=[];   
            var count=arr.length;    
            for (i=0;i<count;i++){ 
                var num=Math.floor(Math.random()*arr.length); 
                temp.push(arr[num]);    
                arr.splice(num,1);    
            }
            temp.length=10;
            ansarr=temp;
            // console.log(ansarr)
            $('.ans_list').find('.ans_item').removeClass('nowans').hide().eq(ansarr[0]).show();
            for(var i=0;i<ansarr.length;i++){
                $('.ans_list').find('.ans_item').eq(ansarr[i]).addClass('nowans');
            }
        }
        var timer=null;
        var timers=null;
        var initnum=0;
        var total=0;
        var num=60;
        var startime=0;
        var lasttime=0;
    
    
        //开始答题
        var item_id = 0;
    $('.exam_lx').click(function(){
        $(this).addClass('on').siblings().removeClass('on');
        item_id = $('.exam_lx.on').index();
    })
        //开始答题 end
    
    // 调用题目 start
    $('.start_ans').click(function(){
        if($('.exam_lx.on').size()<1){
            alert('请选择考试项目呦！');
            return false; 
        }else{
            //item_id == 0 ? htmls0: htmls1
            
            // $('.zgDatiText').hide();
            console.log(item_id)
            $('#ans_list').html(item_id == 0 ? htmls0: htmls1);//调用题目
            // $('.looking dt').html(item_id == 0 ? img1:img2 );
            clearInterval(timers);
            clearInterval(timer);
            $('.ans_wrap_con,.mask').show();
            roa();
            startans();
            clickans();
            startime=new Date();
            num=60;
            initnum=0;
        }
    });
    // 调用题目 end
    
        //答题结果 start
        function startans(){
            timers=setInterval(function(){
                num--;
                $('#times').html(num);
                if(num==0){
                    var totals=0;
                    for(var i=0;i<ansarr.length;i++){
                        if($('.ans_list').find('.ans_item').eq(ansarr[i]).hasClass('correct')){
                            totals++;
                        }
                    } 
                    clearInterval(timers);
                    num=60;
                    ansresult(totals);
                    return;
                }
            },1000);
        }
        // 批改 start
        function clickans(){
            $('.ans_list').find('.nowans').each(function(index,elem){
                $(elem).find('.qus_list').find('li').click(function(){
                     clearInterval(timer);
                     $(this).parents('.qus_list').find('li').removeClass('correct').removeClass('error');
                     if($(this).index()==($(elem).find('.ans_title').attr('qus')-1)){
                        $(this).addClass('correct');
                        $(this).parents('.ans_item').addClass('correct');
                     }else{
                        $(this).addClass('error');
                        $(this).parents('.qus_list').find('li').eq($(elem).find('.ans_title').attr('qus')-1).addClass('correct');
                     }
                     initnum++;
                     if(initnum<=9){
                        timer=setTimeout(function(){
                            $('.ans_list').find('.ans_item').hide().eq(ansarr[initnum]).fadeIn();
                        },500);
                     }else{
                        clearInterval(timers);
                        num=60;
                        var totals=0;
                        for(var i=0;i<ansarr.length;i++){
                            if($('.ans_list').find('.ans_item').eq(ansarr[i]).hasClass('correct')){
                                totals++;
                            }
                        } 
                        ansresult(totals);
                     }
                });
            });
        }
        // 批改 end
       //答题结果 end
        // 用时渲染 start
        function ansresult(lastf){
           lasttime=new Date();
           $('.dt_totle').html(lastf);
           $('.dt_time').html(gettimes(startime,lasttime));
           $('.zg_cover').show();
           $('.ans_ok').show();
           $('.ans_wrap_con,.mask').hide();
        //    if(lastf>=3){
        // 	 $('.zg_cover').show();
        // 	 $('.ans_ok').show();
        // 	 $('.ans_wrap_con,.mask').hide();
        //    }else{
        // 	 $('.zg_cover').show();
        // 	 $('.ans_no').show();
        // 	 $('.ans_wrap_con,.mask').hide();
        //    }
        }
        // 用时渲染 end
        // 答题用时 start
        function gettimes(startime,lasttime) {
            var strtime=lasttime-startime;
            var hourStr=double(Math.floor(strtime/1000/3600%24));
            var fenStr=double(Math.floor(strtime/1000%3600/60));
            var miaoStr=double(Math.floor(strtime/1000%3600%60));
            return hourStr+':'+fenStr+':'+miaoStr;
        }
        function double(obj){
               return obj<10?'0'+obj:obj;
        }
        // 答题用时 end
        
        $('.ans_ok_submit').hover(function(){
            $(this).find('.looking').show();
        },function(){
            $(this).find('.looking').hide();
        });
        
        $('.ans_info_close').click(function(){
            $('.ans_info,.zg_cover').hide();
            item_id = 0;
            $('.zgDatiText').show();
            $('.ans_wrap_con').hide();
            $('#ans_list').html('');//调用题目
            clearInterval(timers);
            clearInterval(timer);
            num=60;
            initnum=0;
            $("#times").html(num);
            
        });
        $('.imgcode_close').click(function(){
            $('.imgcode,.zg_cover').hide();
        });
        $('.downUp').click(function(){
            $('.ans_ok').hide();
            $('.cj_form1').show();
        });
        
        // 答题返回
        $('.dati_back').click(function(){
            item_id = 0;
            // $('.zgDatiText').show();
            $('.ans_wrap_con,.mask').hide();
            $('#ans_list').html('');//调用题目
            clearInterval(timers);
            clearInterval(timer);
            
            num=60;
            initnum=0;
            $("#times").html(num);
        })
    
        //左侧导航
        
  
    
    
    //获取验证码
    $("#getyzm1").click(function(event) {
        var phone = $("#phone1").val();
        if (!phone) {
            alert('请输入手机号');
            return false;
        }
        var phone_re = /^0?1[3456789]\d{9}$/;
        if (!phone_re.test(phone)) {
            alert('请输入正确的手机号');
            return false;
        }
       
        $.ajax({
            url: 'http://zg99.offcn.com/index/biaodan/sendmsg?actid=15596&callback=?',
            type: 'GET',
            dataType: 'jsonp',
            data: {phone: phone},
            success: function(data) {
                if (data.status=="1") {
                    alert('正在发送请稍后...');
                    var sec = 120;
                    $("#getyzm1").text(sec+'s');
                    var timer = setInterval(function (){
                        sec--;
                        $("#getyzm1").text(sec+'s');
                        if (sec<1) {
                            $("#getyzm1").text('获取验证码');
                            clearInterval(timer);
                        }
                    }, 1000);
                } else  if (data.msg == "请勿重复注册"){
                    alert(data.msg)
                     alert('您之前已领取过了，现在直接去查看吧');
                     $(".cj_form1").hide();
                    //  $(".success").show();
                }  else {
                    alert(data.msg);
                }
            }
        });
        
        
    });
    
    $('#dosubmit1').click(function(){
            var fenxiao = $("#fenxiao").val();
            var geneal = $("#geneal").val();
            var data_source = window.location.href
            // var name1   = $("#name1").val();
            var Myphone   = $("#phone1").val();
            var dq1  = $("#dq1").val();
            var yzm  = $("#yzm1").val();
            var dt_totle = $('.dt_totle').text()
           var kslx =  item_id == 0 ? '公基测试': '行测测试'
        //    console.log(dt_totle,kslx)
        // if (name1 == '') { //验证手机号是否为空
        //     alert('请填写姓名');
        //     return false;
        // }
        if (Myphone == '') { //验证手机号是否为空
            alert('请填写手机号');
            return false;
        }
        var reg = /^0?1[3456789]\d{9}$/; //手机号正则
        if (!reg.test(Myphone)) { //验证手机号是否正确
            alert('请填写正确的手机号！');
            return false;
        }
        if (dq1 == '' || dq1 == '请选择分部') {
            alert('请选择分部');
            return false;
        }
    
        if (yzm == '') { //验证码是否为空
            alert('请填写验证码');
            return false;
        }
        $.ajax({
			url: 'http://zg99.offcn.com/index/biaodan/getphonestatus?actid=15596&callback=?',
			type: 'GET',
			dataType: 'jsonp',
			data: { phone: Myphone},
			success: function(data) {
                if(data.status == 1){
                    alert('您已领取过了');
                    $(".cj_form1,.zg_cover").hide();
                   //  $(".success").show();
                   $(".imgcode,.zg_cover").show();
                }else if(data.status == 2){
                    $.ajax({
                        url: 'http://zg99.offcn.com/index/biaodan/register?actid=15596&callback=?',
                        type: 'GET',
                        dataType: 'jsonp',
                        data:{
                            phone:Myphone,
                            fb:dq1,
                            yzm:yzm,
                            fenxiao:fenxiao,
                            geneal:geneal,
                            data_source:data_source,
                            dt_totle:dt_totle,
                            kslx:kslx
                        },
                        success: function (data) {
                            if (data.status == "1") {
                                 alert('提交成功');
                                 $(".cj_form1").hide();
                                 $(".imgcode").show();
                                 $('#times').html(60);
                            } else  if (data.msg == "请勿重复注册"){
                                 alert('您已领取过了');
                                 $(".cj_form1,.zg_cover").hide();
                                //  $(".success").show();
                                $(".imgcode,.zg_cover").show();
                            } else {
                                alert(data.msg);
                            }
                        }
                    })
                }else{
                    alert('注册失败')
                }
            }
        })
     
    });
    });
    
    
    
    
    
    