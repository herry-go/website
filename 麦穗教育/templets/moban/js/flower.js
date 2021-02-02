$(document).ready(function(){
    /**********赋予宽度************/

            ///////////////////////////////pc的
            ///////////////////////////
            ///
            ///
            ///
            ///
                        if($('.information_label .li_wrap ul li').length<9){
                            $('.information').remove();
                        }
            ///////////////////////////////////讲师信息
                        ///////////////////banner轮播
                        ///
                        var timer01 = null;
                        var l=0;
                        var o = 0;
                        var ulKey = 0;
                        var cloneLi = $('.flower_pic li').eq(0).clone(true);
                        $('.flower_pic').append(cloneLi);
                        var lilength= $('.flower ul li.flower_li').length;//4
                        for(var w=0;w<lilength-1;w++){
                            $('.flower ol').append('<li></li>')
                        }
                        $('.flower ol li').eq(0).addClass('current')  
                        var ulwidth = lilength*100;
                        var liwidth = 100/lilength;
                        $('ul.flower_pic').css('width',ulwidth+'%');
                        $('ul.flower_pic  li.flower_li').css('width',liwidth+'%')
                        function timers(){
                            o--;
                            if(o<0){
                                o=lilength-2;
                            }
                            $('.flower ol li').eq(o).addClass('current').siblings().removeClass('current');
                            l--;
                            
                            if( l <0){
                                l=(lilength-2);
                                $('.flower_pic').css('left',-((lilength-1)*100)+'%')
                            }
                            var leftW = l*-100;
                            $('.flower_pic').stop().animate({'left':leftW+'%'},1000)
                        };


                        function timer(){
                            o++;
                            if(o>(lilength-2)){
                                o=0;
                            }
                            $('.flower ol li').eq(o).addClass('current').siblings().removeClass('current');
                            l++;
                            // alert(l)
                            // alert(lilength)
                            if( l > (lilength-1)){
                                l=1;
                                $('.flower_pic').css('left','0')
                            }
                            var leftW = l*-100;
                            $('.flower_pic').stop().animate({'left':leftW+'%'},1000)
                        };
                             timer01 = setInterval(timer,2500);
                        
                        $('.flower ol li').click(function(event) {
                            clearInterval(timer01);
                            var clickOl = $(this).index();
                            o = l = clickOl-1;
                            timer();
                        });
                        $('.flower').mouseenter(function() {
                            console.log(1)
                            clearInterval(timer01);
                            $('.flower .banner_l').stop().animate({'left':'0'},500)
                            $('.flower .banner_r').stop().animate({'right':'0'},500)
                        }); 
                        $('.flower').mouseleave(function() {
                            timer01 = setInterval(timer,5000);
                             $('.flower .banner_l').stop().animate({'left':'-38px'},500)
                            $('.flower .banner_r').stop().animate({'right':'-38px'},500)
                        });

                        $('.flower .banner_r').click(function(event) {
                            timer();
                        });
                        $('.flower .banner_l').click(function(event) {
                            timers();
                        });
                        
                        ////////////文字限制字数
                        ///
                        for(var i = 0; i < $('.curriculum_label li').length; i++){
                          var  pHtml = $('.curriculum_label li').eq(i).find('p').html();
                            var pNum =  pHtml.length;                                                
                            if( pNum > 46){
                                pHtml = pHtml.substring(0,46)
                                pHtml = pHtml+'...'
                                $('.label_content p').eq(i).html(pHtml);
                            }
                        }
                         


                         ///////////咨询活动字数限制
                         ///.activities_contentli p
                        for(var s = 0; s < $('.activities_content .activities_contentli  ul li').length; s++){
                           var wHtml = $('.activities_content .activities_contentli ul li').eq(s).find('p').html();
                            var wNum =  wHtml.length;                                             
                            if( wNum > 30){
                                wHtml = wHtml.substring(0,30)
                                wHtml = wHtml+'...'
                                $('.activities_contentli ul li').eq(s).find('p').html(wHtml);
                            }
                        }

                            sHtml = $('.activities_content_l p').html();
                            var sNum =  sHtml.length;                                                
                            if( sNum > 30){
                                sHtml = sHtml.substring(0,30)
                                sHtml = sHtml+'...'
                                $('.activities_content_l p').html(sHtml);
                            }
                        ///////////那个遮罩
                     
                        for(var b = 0; b < $('.information_show>ul li').length; b++){
                           var bHtml = $('.information_show>ul li').eq(b).children('p:last-child').children('a').html();
                            var bNum =  bHtml.length;                                          
                            if( bNum > 100){
                                bHtml = bHtml.substring(0,100)
                                bHtml = bHtml+'...'
                                $('.information_show>ul li').eq(b).children('p:last-child').children('a').html(bHtml);
                            }
                        }

                        $('.lecturer_content ul li').mouseleave(function() {
                            var heightli =$(this).children('.lecturer_content_li');
                            heightli.stop().css('transform','translateY(0px)')
                            


                        });
                        $('.lecturer_content ul li').mouseenter(function(){
                            var heightli =$(this).children('.lecturer_content_li');
                            heightli.stop().css('transform','translateY('+(-heightli.children('p').height())+'px)')
                            
                        });

                        //////////悬停箭头
                        $('.lecturer').hover(function() {
                             if(device.mobile()){

                             }else{
                               $('.lecturer_content b').fadeIn(500); 
                             }
                            
                        }, function() {
                            if(device.mobile()){

                             }else{
                               $('.lecturer_content b').fadeOut(500); 
                             }
                        });
                        ///////////点击效果
                        ///
                        ///
                        ///添加教师外框
                        ///
                        ///
                        $('.lecturer_content ul').append($('.lecturer_content ul li:lt(3)').clone(true));
                        var cliwidth=100/$('.lecturer_content ul li').length;
                         $('.lecturer_content ul li').css('width',cliwidth+'%')
                         var culwidth=$('.lecturer_content ul li').length*(100/3);
                        $('.lecturer_content ul').css('width',culwidth+'%')
                        var cl=0;
                        $('.lecturer_content .lecturer_content_l').click(function(event) {
                            cl--;
                            if(cl<0){
                                cl=$('.lecturer_content ul li').length-4;
                                var conl=(100/3)*(cl+1);
                                $('.lecturer_content ul').css('left',-conl+'%')
                            }
                            var ulleft=-cl*(100/3);
                            $('.lecturer_content ul').stop().animate({'left':ulleft+'%'},500);
                        });
                        $('.lecturer_content .lecturer_content_r').click(function(event) {
                            cl++;
                            if(cl>($('.lecturer_content ul li').length-3)){
                                cl=1;
                                $('.lecturer_content ul').css('left',0)
                            }
                            var ulleft=-cl*(100/3);
                            $('.lecturer_content ul').stop().animate({'left':ulleft+'%'},500);
                            /* Act on the event */
                        });
                        $('.lecturer_content .ul_wrap').css('height',$('.lecturer_content ul li:nth-of-type(1)  img').css('width'));
            ////////////////////////////////////视频
            ///
            ///
                        ///////点击播放
                        $('body').on('click','.video,.play_icon',function(event) {
                            if(!$('video')[0].paused){
                                $('video')[0].pause();
                                $('.play_icon').show();
                            }else{
                                $('video')[0].play();
                                $('.play_icon').hide();
                                $('.little_video_true img').hide();
                            }                   
                        });

            /////////////////////////////////////咨询活动
            ///
            ///
                        ////////点击切换
                        $('.activities_content ol li').hover(function(event) {
                            $(this).addClass('current').siblings().removeClass('current');
                            $('.activities_contentli').eq($(this).index()).stop().fadeIn(500).siblings('div').fadeOut(200)
                        });





            /////////shouuji
    if(device.mobile()){


            ////////////////////////////////学员信息
            ///
            ///
                        ////点击切换
                        ///
                         var addli = $('.li_wrap li:lt(1)').clone(true);
                        $('.li_wrap ul').append(addli);
                        $('.li_wrap ul li:nth-of-type(1)').addClass('currenth2').show()
                        $('.information_show ul li:nth-of-type(1)').show();
                        var m=0;
                        var mli = 0;
                        $('.information_label .information_l').click(function(event){
                            m--;
                            mli--;
                            if(mli<0){
                                mli =9;
                            }
                            if(m<0){
                                m=9;
                               $('.information_label ul').css('left','-960px');
                               $('.information_label ul li:nth-of-type(11)').addClass('currenth2').siblings().removeClass('currenth2'); 
                            }
                            var mleft = m*-96;
                            $('.information_label ul').stop().animate({'left':mleft}, 500);
                            $('.information_label ul li.currenth2').prev().addClass('currenth2').siblings().removeClass('currenth2');
                            $('.information_show ul li').stop().fadeOut(100);
                            $('.information_show ul li').eq(mli).stop().fadeIn(1000);
                        });

                        $('.information_label .information_r').click(function(event) {
                            m++;
                            mli++;
                            if(mli>9){
                                mli=0;
                            }
                            if(m>10){
                                m=1
                               $('.information_label ul').css('left','0');
                               $('.information_label ul li:nth-of-type(1)').addClass('currenth2').siblings().removeClass('currenth2'); 
                            }
                            var mleft = m*-96;
                            $('.information_label ul').stop().animate({'left':mleft}, 500);
                            $('.information_label ul li.currenth2').next().addClass('currenth2').siblings().removeClass('currenth2');
                            $('.information_show ul li').stop().fadeOut(100,function(){

                                $('.information_show ul li').eq(mli).stop().fadeIn(1000)
                            });
                             
                        });

                        $('.lecturer_content ul li').css('height',$('.lecturer_content ul li img').css('width'));
                        $('.lecturer_content .ul_wrap').css('height',$('.lecturer_content ul li:nth-of-type(1) img').css('width'));
                        $(window).resize(function(event) {
                            $('.lecturer_content .ul_wrap').css('height',$('.lecturer_content ul li:nth-of-type(1) img').css('width'));
                            $('.lecturer_content ul li').css('height',$('.lecturer_content ul li img').css('width'));
                            $('.model').css('height',$('.flower img').css('height'))
                        });
                        $('.model').css('height',$('.flower img').css('height'))



               
        var wenzi = $('.curriculum_banner span:nth-of-type(2) p').html();
        var wenzinum = wenzi.length;
        if(wenzinum>50){
            wenzi=wenzi.substring(0,40);
            wenzi = wenzi+'...';
            $('.curriculum_banner span:nth-of-type(2) p').html(wenzi);
        }
        $('.ul_wrap ul li:gt(2)').remove();
        /*$('.video').attr('controls','controls');*/
        

        $('.model').css('height',$('.flower img').css('height'))

        var t1=new TouchSlider('slider',{duration:800, interval:3000, direction:0, autoplay:true,/*after: doSlideAfter,*/ align:'left', mousewheel:false, mouse:true, fullsize:false});
        //var t2=new TouchSlider('slider1',{duration:800, interval:3000, direction:0, autoplay:true,align:'left', mousewheel:false, mouse:true, fullsize:false});
        t1.pause();
        //t2.pause();
    }else{

            ////////////////////////////////学员信息
            ///
            ///
                        ////点击切换
                        ///
                        var addli = $('.li_wrap li:lt(7)').clone(true);
                        $('.li_wrap ul').append(addli);
                        $('.li_wrap ul li:nth-of-type(4)').addClass('currenth2')
                        $('.information_show ul li:nth-of-type(4)').show();
                        var m=0;
                        var mli = 3;
                        $('.information_label .information_l').click(function(event){
                            m--;
                            mli--;
                            if(mli<0){
                                mli =9;
                            }
                            if(m<0){
                                m=9;
                               $('.information_label ul').css('left','-960px');
                               $('.information_label ul li:nth-of-type(14)').addClass('currenth2').siblings().removeClass('currenth2'); 
                            }
                            var mleft = m*-96;
                            $('.information_label ul').stop().animate({'left':mleft}, 500);
                            $('.information_label ul li.currenth2').prev().addClass('currenth2').siblings().removeClass('currenth2');
                            $('.information_show ul li').eq(mli).stop().fadeIn(500).siblings().stop().fadeOut(500);
                        });

                        $('.information_label .information_r').click(function(event) {
                            m++;
                            mli++;
                            if(mli>9){
                                mli=0;
                            }
                            if(m>10){
                                m=1
                               $('.information_label ul').css('left','0');
                               $('.information_label ul li:nth-of-type(4)').addClass('currenth2').siblings().removeClass('currenth2'); 
                            }
                            var mleft = m*-96;
                            $('.information_label ul').stop().animate({'left':mleft}, 500);
                            $('.information_label ul li.currenth2').next().addClass('currenth2').siblings().removeClass('currenth2');
                             $('.information_show ul li').eq(mli).stop().fadeIn(500).siblings().stop().fadeOut(500);
                             
                        });

                        $('.lecturer_content ul li').css('height',$('.lecturer_content ul li img').css('width'));
                        $(window).resize(function(event) {
                            $('.lecturer_content ul li').css('height',$('.lecturer_content ul li img').css('width'));
                            $('.model').css('height',$('.flower img').css('height'))
                        });

            

                        $(window).resize(function(event) {
                        $('.lecturer_content .ul_wrap').css('height',$('.lecturer_content ul li:nth-of-type(1) img').css('width'));
                        });
    }       
}); 