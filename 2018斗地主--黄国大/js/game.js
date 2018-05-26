$(function() {

        let click = 0;	// 点击数
        let choices=[];
        // 1、生成扑克
        // 方法1
        // let poker_html = '';
        // for(let i=0; i<54; i++){
        // 	poker_html += '<li class="back" style="top:-'+i+'px;"></li>';
        // }
        // $('.all_poker').html(poker_html);
        // 方法2
        for(let i=0;i<54; i++){
            $li = $('<li />');		// 通过JS生成一个JQ的HTML（DOM）对象
            $li.attr('class', 'back').css({'top': -i + 'px'});
            $('.all_poker').append($li);
        }
        //首页图片逐渐隐藏效果
        function yingcang() {
            var oImg = document.getElementById("img1");
            var oBtnChange2=document.getElementById("btnChange2");
            var iAlpha = 90;//用来定义默认的图片的透明度
            oBtnChange2.onclick = function() {//逐渐消失
                iAlpha=100;
                oImg.style.opacity=1;//设置透明度
                oImg.style.filter='alpha(opacity=100)';//设置透明度 IE
                changeOpacity(oImg, 0);
            };
            var oTimer = null;
            //定时器
            function changeOpacity(obj, iTarget) {
                clearInterval(oTimer);
                //关闭定时器
                var iSpeed = 0;
                //速度
                if (iAlpha < iTarget) {
                    iSpeed = 50;
                } else {
                    iSpeed = -50;
                }
                oTimer = setInterval(function() {
                    if (iAlpha == iTarget) {
                        clearInterval(oTimer);
                    } else {
                        iAlpha += iSpeed;
                        //设置透明度
                        obj.style.opacity = iAlpha / 100;
                        obj.style.filter = "alpha(opacity=" + iAlpha + ")";
                        if(obj.style.opacity == 0){
                            $('#img').css({'display':'none','z-index':'-99999'});
                            $('.back').css({'z-index':'100'});
                            //删除开头动画元素
                            $('#img1').remove();
                        }
                    }

                }, 1000);

            }
        }
        yingcang();
        // $(oBtnChange2).off()


        // 初始化扑克数据
        let all_poker = [];
        // all_poker[[1, 0], [1, 1], [1, 2], [1, 3]];
        // poker = {number:1, color: 0};
        for(let i=1; i<=13; i++){
            for(let j=0; j<4; j++){
                all_poker.push({number:i, color: j});
            }
        }
        all_poker.push({number:14, color: 0});
        all_poker.push({number:14, color: 1});
        // console.log(all_poker);

        // 生成玩家的数据
        let play_1 = {poker:[], role: 0, score: 10000};
        let play_2 = {poker:[], role: 0, score: 10000};
        let play_3 = {poker:[], role: 0, score: 10000};

        $(".fraction_1 span").html(play_1.score);
        $(".fraction_2 span").html(play_2.score);
        $(".fraction_3 span").html(play_3.score);
        var fractionVal = 200;

        // let play = [
        //     {poker:[], role: 0, score: 10000},
        //     {poker:[], role: 0, score: 10000},
        //     {poker:[], role: 0, score: 10000}
        // ];

        // 设置一个变量为对象，用于保存游戏里的数据
        let game = {'present': '-1'};

        // 设置一个变量对象，用于保存游戏中玩家选择牌的数据
        let select_poker = {
            'type':0,
            'max':0,
            'list':[]
        };
        // 设置一个变量对象，用于保存游戏中桌面上牌的数据
        let desktop = {
            'type':0,
            'max':0,
            'list':[]
        };
        // 2、绑定洗牌与发牌的方法
        // $('.all_poker li').click(function(){
        $('.mid_top').on('click', '.all_poker li', function(){
            if(click == 0){
                clearPoker();		// 调用洗牌方法
                click++;
                // console.log(all_poker);
            }else{
                // alert('开始发牌');
                deal();				// 调用发牌方法
                // console.log(play_2);
                //点击发牌5秒钟后关闭背景音乐
                // setTimeout(function () {
                //     $('#music').remove();
                // },5000);

            }
        });

        // 定义洗牌的方法
        function clearPoker(){
            // 对扑克数据进行排序的打乱
            for(let i=0; i<3; i++){
                all_poker.sort(function(x, y){
                    return Math.random()-0.5;
                });
            }

            // 2.0 先保存原组代码（对象）
            $all_poker = $('.all_poker');

            // 2.1 删除原牌组
            $('.all_poker').remove();

            //     // 2.2 生成新的三堆临时牌组
            //     for(let i=0; i<3; i++){
            //         $ul = $('<ul />');
            //         $ul.attr('class', 'all_poker').css({'top': -i* 275 +'px'});
            //
            //         for(let j=0; j<18; j++){
            //             $li = $('<li />');
            //             $li.attr('class', 'back').css({'top': -j + 'px'});
            //             $ul.append($li);
            //         }
            //
            //         $('.mid_top').append($ul);
            //     }
            //
            //     // 2.3 执行洗牌动画
            //     for(let i=0; i<3; i++){
            //         $('.mid_top ul').eq(0).animate({'left':'-500px'},300).animate({'left':'0px'},300);
            //         $('.mid_top ul').eq(1).animate({'left':'500px'},300).animate({'left':'0px'},300);
            //     }
            //
            //     // 2.4 变回原样
            //     setTimeout(function(){
            //         // 2.4.1 先把三个临时牌组删除
            //         $('.all_poker').remove();
            //         // 2.4.2 把原牌组放回页面中
            //         $('.mid_top').html($all_poker);
            //     },1900);
            // }

            //重建数组
            var ul='';
            ul +='<ul class="all_poker" style="left:0">';
            for( var i=0;i<=54; i++){
                ul +='<li class="back" style="left: 0;"></li>'
            }
            ul +='</ul>';
            $('.mid_top').append(ul);
            var p=54;
            var anim3 = setInterval(function(){
                $('.all_poker li').eq(p).css({
                    'left':-p*10+200+'px',
                    'transform-origin': '0px,0px',
                    'transition':'0.5s'
                });
                p--;
                if (p<0) {
                    clearInterval(anim3);
                }
            },50);
            var anim2 = setInterval(function(){
                $('.all_poker li').eq(p).css({
                    'left':p*10+200+'px',
                    // 'transform':'rotate(360deg) translateX(400px) ',
                    'transform-origin': '0px,0px',
                    'transition':'2s'
                });
                p--;
                if (p<0) {
                    clearInterval(anim2);
                }
            },50);
            //洗牌的方法
            setTimeout(function(){
                p = 54;
                var anim3 = setInterval(function(){
                    $('.all_poker li').eq(p).css({
                        'transform':'rotate(360deg) translateX(400px) ',
                        'transform-origin': '0,0px',
                        'transition':'2s'
                    });
                    p--;
                    if (p<0) {
                        clearInterval(anim3);
                    }
                },50)
            },3000);
            setTimeout(function(){
                p = 54;
                var anim3 = setInterval(function(){
                    $('.all_poker li').eq(p).css({
                        'transform':'translateX(0) ',
                        'transform-origin': '0,0',
                        'transition':'0.5s'
                    });
                    p--;
                    if (p<0) {
                        clearInterval(anim3);
                    }
                },50)
            },9000);

            // 2.4 变回原样
            setTimeout(function(){
                // 2.4.1 先把三个临时牌组删除
                $('.all_poker').remove();
                // 2.4.2 把原牌组放回页面中
                $('.mid_top').html($all_poker);
            },1900);
        }


        // 定义发牌方法
        function deal(num){
            num = num || 0;		// 给参数设置默认值
            // console.log(num);
            // 发牌给左边玩家
            $('.all_poker li:last').animate({'left':'-500px', 'top':'200px'}, 20);
            // 从总牌堆把最后一张牌发给玩家1
            play_1.poker.push(all_poker.pop());
            setTimeout(function(){
                $('.all_poker li:last').remove();

                // 把玩家得到的牌生成到对应的位置上，并且进行调整
                poker_html = makePoker(play_1.poker[play_1.poker.length-1]);		// 调用生成牌面的方法
                $('.play_1').append(poker_html);
                // $('.play_1 li:last').css({'left':num*18+'px'});
                $('.play_1 li:last').css({'-webkit-transform':'rotate(90deg)','top':200+num*22+'px'});
                $('.play_1').css({'top': -num*11+'px'});

            }, 25);

            // 发牌给中间玩家
            setTimeout(function(){
                // 从总牌堆把最后一张牌发给玩家2
                play_2.poker.push(all_poker.pop());
                $('.all_poker li:last').animate({'top':'500px'}, 20);
                setTimeout(function(){
                    $('.all_poker li:last').remove();

                    // 把玩家得到的牌生成到对应的位置上，并且进行调整
                    poker_html = makePoker(play_2.poker[play_2.poker.length-1]);		// 调用生成牌面的方法
                    $('.play_2').append(poker_html);
                    // $('.play_2 li:last').css({'left':num*18+'px'});
                    $('.play_2 li:last').css({'-webkit-transform':'rotate(0deg)','left':num*22+'px'});
                    $('.play_2').css({'left': -num*11+'px'});
                }, 25);
            }, 30);

            // 发牌给右边玩家
            setTimeout(function(){
                // 从总牌堆把最后一张牌发给玩家3
                play_3.poker.push(all_poker.pop());
                $('.all_poker li:last').animate({'left':'500px', 'top':'200px'}, 20);
                setTimeout(function(){
                    $('.all_poker li:last').remove();

                    // 把玩家得到的牌生成到对应的位置上，并且进行调整
                    poker_html = makePoker(play_3.poker[play_3.poker.length-1]);		// 调用生成牌面的方法
                    $('.play_3').append(poker_html);
                    // $('.play_3 li:last').css({'left':num*18+'px'});
                    $('.play_3 li:last').css({'-webkit-transform':'rotate(-90deg)','top':200+num*22+'px'});
                    $('.play_3').css({'top': -num*11+'px'});

                    // num++;
                    if(++num < 17){
                        deal(num);	//  通过自调函数重新执行下一轮的发牌
                    }else{
                        setTimeout(function(){
                            // 发牌步骤已经完成。现在需要把玩家手上的牌进行排序
                            $('.play_1 li').css({'background': "url('./images/14.png') -87px -225px"});
                            $('.play_2 li').css({'background': "url('./images/14.png') -87px -225px"});
                            $('.play_3 li').css({'background': "url('./images/14.png') -87px -225px"});
                        }, 1000);
                        setTimeout(function(){
                            // 对各玩家手牌数据进行排序

                            $('.play_1 li').remove();
                            play_1.poker = pokerSort(play_1.poker);
                            for(let i=0; i<play_1.poker.length; i++){
                                poker_html = makePoker(play_1.poker[i]);
                                $('.play_1').append(poker_html);
                                // $('.play_1 li:last').css({'left':i*18+'px'});
                                $('.play_1 li:last').css({'-webkit-transform':'rotate(90deg)','top':200+i*22+'px'});
                                $('.play_1').css({'top': -i*11+'px'});
                            }

                            $('.play_2 li').remove();
                            play_2.poker = pokerSort(play_2.poker);
                            for(let i=0; i<play_2.poker.length; i++){
                                poker_html = makePoker(play_2.poker[i]);
                                $('.play_2').append(poker_html);
                                // $('.play_2 li:last').css({'left':i*18+'px'});
                                $('.play_2 li:last').css({'-webkit-transform':'rotate(0deg)','left':i*22+'px'});
                                $('.play_2').css({'left': -i*11+'px'});
                            }
                            $('.play_3 li').remove();
                            play_3.poker = pokerSort(play_3.poker);
                            for(let i=0; i<play_3.poker.length; i++){
                                poker_html = makePoker(play_3.poker[i]);
                                $('.play_3').append(poker_html);
                                // $('.play_3 li:last').css({'left':i*18+'px'});
                                $('.play_3 li:last').css({'-webkit-transform':'rotate(-90deg)','top':200+i*22+'px'});
                                $('.play_3').css({'top': -i*11+'px'});
                            }

                            // 执行抢地主的方法
                            getLandlord();
                        }, 2000);
                    }
                }, 25);
            }, 60);
        }

        // 生成牌面代码（对象）的方法
        function makePoker( poker_data ){
            // console.log(poker_data);
            let color_arr = [
                [-17, -228],
                [-17, -6],
                [-160, -6],
                [-160, -228]
            ];
            let x = 0;
            let y = 0;
            if(poker_data.number < 14){
                x = color_arr[poker_data.color][0];
                y = color_arr[poker_data.color][1];
            }else{
                if(poker_data.color == 0){
                    x = -160;
                    y = -6;
                }else{
                    x = -17;
                    y = -6;
                }
            }
            let html = '<li data-poker="'+poker_data.number+'_'+poker_data.color+'" style="width: 125px; height: 175px; background: url(./images/'+poker_data.number+'.png) '+x+'px '+y+'px;"></li>';
            return html;
        }

        // 扑克数组进行排序的方法
        function pokerSort( poker_list ){

            // let arr = [1,23,541,21,551,2542];
            // [{number:1, color:1},{number:2, color:0}]
            poker_list.sort(function(x, y){
                if( x.number == y.number){
                    return x.color-y.color;
                }else{
                    return x.number-y.number;
                }
            });
            return poker_list;
        }

        // 定义抢地主方法
        function getLandlord(start, number){
            // 随机从其中一位玩家开始抢地主
            // let start = Math.round(Math.random()*(2+1) + (0-0.5));
            // start = start||Math.round(Math.random()*(2+1) + (0-0.5));		// 给抢地主的玩家索引一个默认值
            if(start == undefined){
                start = Math.round(Math.random()*(2+1) + (0-0.5));
            }

            // start = 2;
            number = number||1;
            // console.log(start);
            $('.play_btn').hide();
            $('.play_btn').eq(start).show();

            $('.play_btn:eq('+start+') .get').click(function(){
                // alert('抢地主');
                // 给玩家分配角色
                switch(start){
                    case 0:
                        play_1.role = 1;
                        // 给对应玩家分配地主牌
                        play_1.poker = play_1.poker.concat(all_poker);
                        getLandlordPoker(0);
                        $('.pass').hide();


                        // 农民和地主头像
                        // $('.cancel').click(function () {
                        $('.headPortrait').css({'background':'url("images/nonmin.png")','display':'block'});
                        $('.headPortrait2').css({'background':'url("images/dizhu.png")','display':'block'});
                        $('.headPortrait3').css({'background':'url("images/nonmin.png")','display':'block'});
                        // });

                        break;
                    case 1:
                        play_2.role = 1;
                        play_2.poker = play_2.poker.concat(all_poker);
                        getLandlordPoker(1);
                        $('.pass').hide();

                        // 农民和地主头像
                        // $('.cancel').click(function () {
                        $('.headPortrait').css({'background':'url("images/dizhu.png")','display':'block'});
                        $('.headPortrait2').css({'background':'url("images/nonmin.png")','display':'block'});
                        $('.headPortrait3').css({'background':'url("images/nonmin.png")','display':'block'});
                        // });

                        break;
                    case 2:
                        play_3.role = 1;
                        play_3.poker = play_3.poker.concat(all_poker);
                        getLandlordPoker(2);
                        $('.pass').hide();

                        // 农民和地主头像
                        $('.headPortrait').css({'background':'url("images/nonmin.png")','display':'block'});
                        $('.headPortrait2').css({'background':'url("images/nonmin.png")','display':'block'});
                        $('.headPortrait3').css({'background':'url("images/dizhu.png")','display':'block'});
                        // });

                        break;
                }
                // play[start].role = 1;
            });

            $('.play_btn:eq('+start+') .cancel').click(function(){
                // alert('不抢');
                $(".music7").get(0).play();
                start = (++start > 2)? 0:start;
                if(++number > 3){
                    alert('本局无人抢地主，为流局！');
                    // return;
                    window.location.reload(true);
                }else{
                    getLandlord(start, number);
                }
            });
            // console.log(play_2.poker.length);
        }


        // 定义获取主地牌的方法
        function getLandlordPoker(play_index){
            // 删除原来地主牌牌背
            $('.all_poker li').remove();
            // 把所有的玩家按钮隐藏
            $('.play_btn').css({'display':'none'});
            // 生成地主牌牌面的方法
            for(let i=0; i<3; i++){
                poker_html = makePoker(all_poker[i]);
                $('.all_poker').append(poker_html);
                $('.play').eq(play_index).append(poker_html);


                if(play_index == 0){
                    $('.play:eq(0) li:last').css({'-webkit-transform':'rotate(90deg)','top':200+i*22+'px'});
                    $('.play:eq(0)').css({'top':-(i+1)*11-144+'px'});

                    // 等0.5秒后对地主手牌再进行一次排序
                    setTimeout(function(){
                        $('.play:eq(0) li').css({'background': "url('./images/14.png') -87px -225px"});
                    },500);
                    setTimeout(function(){
                        $('.play_1 li').remove();
                        play_1.poker = pokerSort(play_1.poker);
                        for(let i=0; i<play_1.poker.length; i++){
                            poker_html = makePoker(play_1.poker[i]);
                            $('.play_1').append(poker_html);
                            // $('.play_3 li:last').css({'left':i*18+'px'});
                            $('.play_1 li:last').css({'-webkit-transform':'rotate(90deg)','top':200+i*22+'px'});
                            $('.play_1').css({'top': -i*11+'px'});
                        }
                    }, 700);
                }


                if(play_index == 1){
                    // $('.play:eq(1) li:last').css({'left':(i+1)*22 + 288+'px'});
                    $('.play:eq(1) li:last').css({'-webkit-transform':'rotate(0deg)','left':(i+1)*22 + 288+'px'});
                    $('.play:eq(1)').css({'left':-(i+1)*11-144+'px'});

                    // 等0.5秒后对地主手牌再进行一次排序
                    setTimeout(function(){
                        $('.play:eq(1) li').css({'background': "url('./images/14.png') -87px -225px"});
                    },500);
                    setTimeout(function(){
                        $('.play_2 li').remove();
                        play_2.poker = pokerSort(play_2.poker);
                        for(let i=0; i<play_2.poker.length; i++){
                            poker_html = makePoker(play_2.poker[i]);
                            $('.play_2').append(poker_html);
                            // $('.play_2 li:last').css({'left':i*22+'px'});
                            $('.play_2 li:last').css({'-webkit-transform':'rotate(0deg)','left':i*22+'px'});
                            $('.play_2').css({'left': -i*11+'px'});
                        }
                    }, 700);
                }


                if(play_index == 2){
                    $('.play:eq(2) li:last').css({'-webkit-transform':'rotate(-90deg)','top':200+i*22+'px'});
                    $('.play:eq(2)').css({'top':-(i+1)*11-144+'px'});

                    // 等0.5秒后对地主手牌再进行一次排序
                    setTimeout(function(){
                        $('.play:eq(2) li').css({'background': "url('./images/14.png') -87px -225px"});
                    },500);
                    setTimeout(function(){
                        $('.play_3 li').remove();
                        play_3.poker = pokerSort(play_3.poker);
                        for(let i=0; i<play_3.poker.length; i++){
                            poker_html = makePoker(play_3.poker[i]);
                            $('.play_3').append(poker_html);
                            // $('.play_3 li:last').css({'left':i*18+'px'});
                            $('.play_3 li:last').css({'-webkit-transform':'rotate(-90deg)','top':200+i*22+'px'});
                            $('.play_3').css({'top': -i*11+'px'});
                        }
                    }, 700);
                }

            }

            // 地主牌移动的动画
            $('.all_poker li').eq(0).animate({'left':'-200px'}, 500).animate({'top':'-50px'}, 500);
            $('.all_poker li').eq(1).animate({'left':'200px'}, 500).animate({'top':'-50px'}, 500);
            $('.all_poker li').eq(2).animate({'left':'0px'}, 500).animate({'top':'-50px'}, 500);

            game.present = play_index;
            // 调用开始游戏的方法
            setTimeout(function(){
                startGame(0);
            },1000);
        }


        // 开始游戏的方法
        function startGame( cancel_num){
            // 1、确定谁是当前出牌的玩家
            $('.play_btn2').hide();
            $('.play_btn2').eq(game.present).show();
            // 2、调用绑定出牌事件的方法
            $('.play li').removeClass('select');
            presentClick( cancel_num);
            clearInterval(timer);
            $('.timer').hide();
            $('.timer').eq(game.present).show();
            //调用计时器的方法
            Time(15,cancel_num);
            setTimeout(function(){
                $('.buchu').hide();
                $('.buchu1').hide();
            },3000);
            setTimeout(function () {
                $('.notPlay').hide();
            },3000);
            setInterval(function () {
                $('.under').hide();
            },2000);

        }

        // 点击选择牌的方法
        function presentClick( cancel_num ){
            // $('.play:eq('+game.present+') li').click(function(){
            $('.play').eq(game.present).on('click','li',function () {
                console.log("执行选牌方法:",desktop.list.length);
                // 得到选择到的牌的数据信息

                let str = $(this).attr('data-poker');
                let arr = str.split('_');
                let poker = {'number':arr[0], 'color':arr[1]};


                // 通过样式来判断需要选择牌还是取消选择
                if($(this).attr('class') == 'select'){
                    $(this).removeClass('select');
                    // 遍历数组得到当前数据一致元素的下标
                    for(let i=0; i<select_poker.list.length; i++){
                        /*
                            由于在对象的概念点两个完全相同的对象，也是不同一个对象。
                            所以直接使用比较运算等  == 或者 === 来进行对比的话，得到的结果永远为false.
                            也就是说不我们不能直接使用对象跟对象进行相同的比较
                        */
                        // if(select_poker.list[i] == poker){
                        if(select_poker.list[i].number == poker.number &&
                            select_poker.list[i].color == poker.color){
                            select_poker.list.splice(i,1);
                            break;	// 中断当前语句
                            // continue; // 本次语句不再执行，继续下一次语句的执行
                        }
                    }
                    console.log(select_poker.list);
                }else{
                    $(this).addClass('select');
                    select_poker.list.push(poker);
                    // console.log("d:",select_poker.list);
                }
            });

            // 绑定出牌事件
            // $('.play_btn2').eq(game.present).find('.play_out').click(function(){
            $('.play_btn2').eq(game.present).on('click', '.play_out', function(){
                // console.log("执行打牌方法");
                $('.pass').show();

                // 出的牌是否为空
                if(select_poker.list.length == 0){
                    // console.log(select_poker);
                    //弹出没有要出的牌
                    notPlayAnimate();
                    function notPlayAnimate() {
                        $div =$('<div />');
                        $div.attr('class','notPlay').css({
                            'position':'absolute',
                            'top':'50%',
                            'left':'50%',
                            'margin':'-300px 0 0 -300px',
                            'width':'600px',
                            'height':'600px',
                            // 'border':'1px solid #ccc',
                            'background':'url("images/tanchukuang.png")no-repeat'
                        });
                        $('body').append($div);
                    }
                }else{
                    // 判断选择的牌型是否正确
                    /*
                        关于逻辑与跟逻辑或使用需要注意的点：
                        1、逻辑与前一个条件只要为假，后一个条件就不再执行。直接返回false
                        2、逻辑或前一个条件只要为真，后一个条件就不再执行。直接返回true
                    */
                    if( checkPoker() && checkVS() ){
                        // console.log(select_poker);
                        // 玩家手牌可以打掉桌面的牌的情况下数据流
                        // 1、把原玩家的手牌替换掉桌面的牌
                        // for( x in select_poker){
                        //     desktop[x] = select_poker[x];
                        // }
                        desktop.type=select_poker.type;
                        desktop.max=select_poker.max;
                        desktop.list=[];
                        for(let i=0;i<select_poker.list.length;i++){
                            desktop.list[i]={};
                            desktop.list[i].number=select_poker.list[i].number;
                            desktop.list[i].color=select_poker.list[i].color;
                        }

                        // 在桌面对应的位置生成对应牌面

                        $('.desktop li').remove();
                        for(var i=0; i<desktop.list.length; i++){
                            var li = makePoker(desktop.list[i]);
                            $('.desktop').append(li);
                            $('.desktop li:last').css({left:(50*i)+'px'});
                            $('.desktop').css({'left': -i*25+'px'});
                        }

                        if(desktop.type == 110 || desktop.type == 100){
                            fractionVal = $(".fraction span").html()*2;
                            $(".fraction span").html(fractionVal);
                        }


                        //调用对应牌型的动画和声音
                        switch (desktop.type){
                            case 6://顺子
                                straightanimate();
                                // straight2animate();
                                $(".music3").get(0).play();
                                break;
                            case 66: //连对
                                rocketanimate();
                                $(".music5").get(0).play();
                                // $(".music4_1").get(0).play();
                                break;
                            case 7: //飞机
                                planeanimate();
                                $(".music4").get(0).play();
                                $(".music4_1").get(0).play();
                                break;
                            case 77://飞机
                                planeanimate();
                                $(".music4").get(0).play();
                                $(".music4_1").get(0).play();
                                break;
                            case 777://飞机
                                planeanimate();
                                $(".music4").get(0).play();
                                $(".music4_1").get(0).play();
                                break;
                            case 778://飞机
                                planeanimate();
                                $(".music4").get(0).play();
                                $(".music4_1").get(0).play();
                                break;
                            case 779://飞机
                                planeanimate();
                                $(".music4").get(0).play();
                                $(".music4_1").get(0).play();
                                break;
                            case 88://飞机
                                planeanimate();
                                $(".music4").get(0).play();
                                $(".music4_1").get(0).play();
                                break;
                            case 878://飞机
                                planeanimate();
                                $(".music4").get(0).play();
                                $(".music4_1").get(0).play();
                                break;
                            case 887://飞机
                                planeanimate();
                                $(".music4").get(0).play();
                                $(".music4_1").get(0).play();
                                break;
                            case 8://飞机
                                planeanimate();
                                $(".music4").get(0).play();
                                $(".music4_1").get(0).play();
                                break;
                            case 888://飞机
                                planeanimate();
                                $(".music4").get(0).play();
                                $(".music4_1").get(0).play();
                                break;
                            case 889://飞机
                                planeanimate();
                                $(".music4").get(0).play();
                                $(".music4_1").get(0).play();
                                break;
                            case 899://飞机
                                planeanimate();
                                $(".music4").get(0).play();
                                $(".music4_1").get(0).play();
                                break;
                            case 100://炸弹
                                kinganiemate();
                                kingHaniemate();
                                $(".music1").get(0).play();
                                // $(".music1_1").get(0).play();
                                break;
                            case 110://王炸
                                friedKinganimate();
                                // $(".music2").get(0).play();
                                $(".music2_1").get(0).play();
                                break;
                        }


                        // 删除玩家手牌数据中的对应打出去的牌的数据
                        switch(game.present){
                            case 0:
                                removeArr(play_1,select_poker);
                                break;
                            case 1:
                                removeArr(play_2,select_poker);
                                break;
                            case 2:
                                removeArr(play_3,select_poker);
                                break;
                        }
                        // 把对应玩家手牌现在的牌面更新
                        switch (game.present){
                            case 0:
                                $('.play_1 li').remove();
                                // $(this).remove();
                                play_1.poker = pokerSort(play_1.poker);
                                for(let i=0; i<play_1.poker.length; i++) {
                                    poker_html = makePoker(play_1.poker[i]);
                                    $('.play_1').append(poker_html);
                                    $('.play_1 li:last').css({'-webkit-transform':'rotate(90deg)','top':200+i*22+'px'});
                                    $('.play_1').css({'top': -i*11+'px'});
                                }
                                break;
                            case 1:
                                $('.play_2 li').remove();
                                // $(this).remove();
                                play_2.poker = pokerSort(play_2.poker);
                                for(let i=0; i<play_2.poker.length; i++) {
                                    poker_html = makePoker(play_2.poker[i]);
                                    $('.play_2').append(poker_html);
                                    // $('.play_2 li:last').css({'left': i * 22 + 'px'});
                                    $('.play_2 li:last').css({'-webkit-transform':'rotate(0deg)','left':i*22+'px'});
                                    $('.play_2').css({'left': -i * 11 + 'px'});
                                }
                                break;
                            case 2:
                                $('.play_3 li').remove();
                                // $(this).remove();
                                play_3.poker = pokerSort(play_3.poker);
                                for(let i=0; i<play_3.poker.length; i++) {
                                    poker_html = makePoker(play_3.poker[i]);
                                    $('.play_3').append(poker_html);
                                    $('.play_3 li:last').css({'-webkit-transform':'rotate(-90deg)','top':200+i*22+'px'});
                                    $('.play_3').css({'top': -i*11+'px'});
                                }
                                break;
                        }

                        // 2、清空玩家的手牌数据
                        select_poker.type = 0;
                        select_poker.max = 0;
                        select_poker.list = [];
                        // 通过当前玩家手中牌的数量来判断该玩家是否已经赢了。
                        bunko(play_1,play_2,play_3);
                        // 把出牌权给下一个位玩家
                        game.present = (++game.present > 2)? 0: game.present;

                        // 通过动画特效方法回传的时间来定义，下次玩家开始打牌的时间
                        // time = animate();
                        $('.play').eq(game.present).off('click','li');
                        $('.play_btn2').eq(game.present).off('click', '.play_out');
                        $('.play_btn2').eq(1).off('click', '.prompt');
                        clearInterval(timer);
                        console.log("110:",select_poker.list);
                        startGame(0);

                    }else{
                        unreasonableanimate();
                        select_poker.type = 0;
                        select_poker.max = 0;
                        select_poker.list = [];
                        $('.play').eq(game.present).off('click','li');
                        $('.play_btn2').eq(1).off('click', '.prompt');
                        clearInterval(timer);
                        startGame(0);
                    }
                }
            });
            $('.play_btn2').eq(game.present).off('click','.pass');
            // 绑定不出牌事件
            // $('.play_btn2').eq(game.present).find('.pass').click(function(){
            $('.play_btn2').eq(game.present).on('click','.pass',function () {
                // clearInterval(timer);
                // alert('要不起');
                $(".music6").get(0).play();
                $('.buchu').eq(game.present).show();

                game.present = (++game.present > 2)? 0: game.present;
                cancel_num++;
                // 连续两不出牌把桌面的牌清空
                if(cancel_num > 1){
                    desktop.type = 0;
                    desktop.max = 0;
                    desktop.list = [];
                    $('.desktop li').remove();
                    $('.pass').hide();
                }
                console.log(desktop);
                // console.log($('.timer'));
                select_poker.type = 0;
                select_poker.max = 0;
                select_poker.list = [];
                // $('.play_btn2').eq(game.present).off('click','.pass');
                $('.play').eq(game.present).off('click','li');
                $('.play_btn2').eq(game.present).off('click', '.play_out');
                // $('.play_btn2').eq(game.present).off('click', '.prompt');

                startGame(cancel_num);

            });
            //提示功能
            $('.play_btn2').eq(1).on('click', '.prompt', function() {
                choices=aiplay();
                console.log("choices1:",choices);
                 for(let i=0;i<choices.length;i++){
                     $('.play').eq(1).find('li:eq('+choices[i]+')').click();
                 }
                 if(choices.length==0){
                     alert("你没有牌大过大家");
                 }
                $('.play_btn2').eq(1).off('click', '.prompt');
            });
            // $('.play_btn2').eq(game.present).off('click', '.prompt');
        }
        //倒计时计时器
        var timer;
        function Time(t,cancel_num) {
            timer=setInterval(function () {
                t--;
                $('.timer').text(t);
                if(t<=0){
                    clearInterval(timer);
                    $('.buchu').eq(game.present).show();
                    game.present = (++game.present > 2)? 0: game.present;
                    cancel_num++;
                    // 连续两不出牌把桌面的牌清空
                    if(cancel_num > 1){
                        cancel_num=0;
                        desktop.type = 0;
                        desktop.max = 0;
                        desktop.list = [];
                        $('.desktop li').remove();
                        $('.pass').hide();
                    }
                    // 2、清空玩家的手牌数据
                    select_poker.type = 0;
                    select_poker.max = 0;
                    select_poker.list = [];
                    // console.log($('.timer'));
                    $('.play').eq(game.present).off('click','li');
                    $('.play_btn2').eq(game.present).off('click', '.play_out');
                    // $('.play_btn2').eq(game.present).off('click', '.prompt');
                    startGame(cancel_num);
                }
            },1000);
            // t=0;
        }

        //取消选择
        function removeArr(play1, select1){
            for(let i=0; i<play1.poker.length; i++){
                for(let j=0; j<select1.list.length;j++){
                    if(play1.poker[i].number == select1.list[j].number &&
                        play1.poker[i].color == select1.list[j].color
                    ){
                        play1.poker.splice(i,1);
                        select1.list.splice(j,1);
                        removeArr(play1,select1);
                    }
                }
            }
            return ;
        }

        // 定义玩家出的牌与桌面牌对比的方法
        function checkVS(){
            if(select_poker.type == 0){
                return false;
            }else if(desktop.type == 0 ||select_poker.type == 110 || select_poker.type == 100 && desktop.type != 100){
                return true;
            }else if(select_poker.type == desktop.type && select_poker.list.length == desktop.list.length ){
                // 判断单张中的大小王
                if(select_poker.list[0].number == 14 && desktop.list[0].number == 14){
                    if(select_poker.list[0].color > desktop.list[0].color){
                        return true;
                    }else{
                        return false;
                    }
                }
                if(select_poker.max > desktop.max){
                    return true;
                }else{
                    return false;
                }
            }
            return false;
        }


        // 定义检查牌型的方法
        function checkPoker(){
            // 1、先对玩家选择的牌进行重新排序
            select_poker.list = pokerSort(select_poker.list);

            /*
                牌型代码表
                1		单张
                2		对子
                3		三张
                4		三带一
                5		三带二
                76      四带二
                766		四带四
                6		顺子
                66		连对 2 4 6 8 10 12 14 16 18 20
                7		只有连续二个三的飞机 6
                77 		连续三个三的飞机 9
                777     连续四个三的飞机 12
                778    	连续五个三的飞机 15
                779     连续六个三的飞机 18
                88      二个三带二的飞机 10
                878		三个三带二的飞机 15
                887     四个三带二的飞机  20
                8		二个三带一的飞机 8
                888     三个三带一的飞机 12
                889     四个三带一的飞机 16
                899		五个三带一的飞机  20
                110		王炸
                100     炸弹
            */
            // 根据选择牌的数量来再进行判断牌型
            switch(select_poker.list.length){
                // 一张牌
                case 1:
                    select_poker.type = 1;							// 设置牌型为单张
                    select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                    return true;
                    break;
                // 两张牌
                case 2:
                    if (select_poker.list[0].number == select_poker.list[1].number){
                        if(select_poker.list[0].number == 14){
                            select_poker.type = 110 ;						// 设置牌型为王炸
                            select_poker.max = 14*1; 							// 设置判断值为该牌的点数
                        }else{
                            //33
                            //44
                            select_poker.type = 2 ;							// 设置牌型为对子
                            select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        }
                        return true;
                    }
                    break;
                // 三张牌
                case 3:
                    if(select_poker.list[0].number == select_poker.list[2].number){
                        select_poker.type = 3;							// 设置牌型为三张
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                // 四张牌
                case 4:
                    // 判断是否为炸弹
                    if(select_poker.list[0].number == select_poker.list[3].number){
                        select_poker.type = 100;							// 设置牌型为炸弹
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        kinganiemate();
                        kingHaniemate();
                        return true;
                    }else if(select_poker.list[0].number == select_poker.list[2].number ||
                        select_poker.list[1].number == select_poker.list[3].number){
                        select_poker.type = 4;							// 设置牌型为三带一
                        select_poker.max = select_poker.list[1].number*1; 	// 设置判断值为该牌的点数
                        return true;
                        /*
                            3334
                            3444
                            5559
                            3666
                        */
                    }
                    break;
                // 五张牌
                case 5:
                    // console.log(1);
                    // console.log(checkStraight());
                    // 判断是否为顺子
                    if( checkStraight() ){
                        select_poker.type = 6;							// 设置牌型为顺子
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        // console.log(2);
                        return true;
                    }else if( select_poker.list[0].number == select_poker.list[2].number &&   // 判断三带二的方法
                        select_poker.list[3].number == select_poker.list[4].number ||
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[4].number
                    ){
                        select_poker.type = 5;							// 设置牌型为三带二
                        select_poker.max = select_poker.list[2].number*1; 	// 设置判断值为该牌的点数
                        // console.log(3);
                        return true;
                    }
                    break;
                // 六张牌
                case 6:
                    // 判断是否为顺子
                    if( checkStraight() ){
                        select_poker.type = 6;							// 设置牌型为顺子
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if(checkTwoPairs()){
                        select_poker.type = 66;							// 设置牌型为连对
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if( select_poker.list[0].number == select_poker.list[3].number ||
                        select_poker.list[1].number == select_poker.list[4].number ||
                        select_poker.list[2].number == select_poker.list[5].number ){
                        /*
                            333345
                            344445
                            345555
                        */
                        select_poker.type = 76;							// 设置牌型为四带二
                        select_poker.max = select_poker.list[2].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if(setAirplane()){
                        return true;
                    }
                    break;
                case 7:
                    if(checkStraight()){
                        select_poker.type = 6;
                        select_poker.max = select_poker.list[0].number*1;
                        return true;
                    }
                    break;
                case  8:
                    if(checkStraight()){
                        select_poker.type = 6;
                        select_poker.max = select_poker.list[0].number*1;
                        return true;
                    }else if(setAirplane()){
                        return true;
                    }else if(select_poker.list[0].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[7].number
                    ){//33334455
                        select_poker.type = 766;
                        select_poker.max = select_poker.list[0].number*1;
                        return true;
                    }else if(select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[7].number ||
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[7].number
                    ){
                        /*
                        33445555
                        33444455
                         */
                        select_poker.type = 766;
                        select_poker.max = select_poker.list[5].number*1;
                        return true;
                    }else if(checkTwoPairs()){
                        select_poker.type = 66;							// 设置牌型为连对
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                case 9:
                    if(checkStraight()){
                        select_poker.type = 6;
                        select_poker.max = select_poker.list[0].number*1;
                        return true;
                    }else if(setAirplane()){
                        return true;
                    }
                    break;
                case 10:
                    if(checkStraight()){
                        select_poker.type = 6;
                        select_poker.max = select_poker.list[0].number*1;
                        return true;
                    }else if(setAirplane()){
                        return true;
                    }else if(checkTwoPairs()){
                        select_poker.type = 66;							// 设置牌型为连对
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                case 11:
                    if(checkStraight()){
                        select_poker.type = 6;
                        select_poker.max = select_poker.list[0].number*1;
                        return true;
                    }
                    break;
                case 12:
                    if(checkStraight()){
                        select_poker.type = 6;
                        select_poker.max = select_poker.list[0].number*1;
                        return true;
                    }else if(setAirplane()){
                        return true;
                    }else if(checkTwoPairs()){
                        select_poker.type = 66;							// 设置牌型为连对
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                case 14:
                    if(checkTwoPairs()){
                        select_poker.type = 66;							// 设置牌型为连对
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                case 15:
                    if(setAirplane()){
                        return true;
                    }
                    break;
                case 16:
                    if(setAirplane()){
                        return true;
                    }else if(checkTwoPairs()){
                        select_poker.type = 66;							// 设置牌型为连对
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                case 18:
                    if(setAirplane()){
                        return true;
                    }else if(checkTwoPairs()){
                        select_poker.type = 66;							// 设置牌型为连对
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                case 20:
                    if(setAirplane()){
                        return true;
                    }else if(checkTwoPairs()){
                        select_poker.type = 66;							// 设置牌型为连对
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }
                    break;

                default:
                    return false;
                    break;
            }

            return false;
        }

        // 定义检查牌型为顺子的方法
        function checkStraight(){
            // 判断最大的值不能大于12
            if(select_poker.list[select_poker.list.length-1].number >12){
                return false;
            }

            for(let i=0; i<select_poker.list.length-1; i++){
                if(select_poker.list[i].number*1 +1 != select_poker.list[i+1].number){
                    return false;
                }
            }
            return true;
        }


        // 定义检查牌型为连对的方法
        function checkTwoPairs(){
            /*
                3344556677
                0123456789

            */
            // 判断最大的值不能大于12
            if(select_poker.list[select_poker.list.length-1].number >12){
                return false;
            }

            // 单独判断最后两位的值是相等的
            if(select_poker.list[select_poker.list.length-1].number != select_poker.list[select_poker.list.length-2].number){
                return false;
            }

            // 使用遍历方法来对牌型进行检查
            for(let i=0; i<select_poker.list.length-3; i+=2){
                if(select_poker.list[i].number != select_poker.list[i+1].number ||
                    select_poker.list[i].number != select_poker.list[i+2].number-1){
                    return false;
                }
            }

            return true;
        }

        // 检查牌型是否为飞机的方法
        function setAirplane(){

            // 判断最大的值不能大于12
            if(select_poker.list[select_poker.list.length-1].number >12){
                return false;
            }

            // 通过牌数来判断可能的牌型可能
            switch(select_poker.list.length){
                case 6:
                    if(select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[0].number == select_poker.list[3].number-1 &&
                        select_poker.list[3].number == select_poker.list[5].number
                    ){//333444
                        select_poker.type = 7;								// 设置牌型为二个三的飞机
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                case 8:
                    /*
                        33344456
                        34555666
                        34445556
                        34555666
                    */
                    if(select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[0].number == select_poker.list[3].number-1 &&
                        select_poker.list[3].number == select_poker.list[5].number ||
                        select_poker.list[1].number == select_poker.list[3].number &&
                        select_poker.list[1].number == select_poker.list[4].number-1 &&
                        select_poker.list[4].number == select_poker.list[6].number ||
                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[2].number == select_poker.list[5].number-1 &&
                        select_poker.list[5].number == select_poker.list[7].number
                    ){
                        select_poker.type = 8;								// 设置牌型为二个三带一的飞机
                        select_poker.max = select_poker.list[2].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                case 9:
                    // 333444555
                    if(select_poker.list[select_poker.list.length-3].number != select_poker.list[select_poker.list.length-1].number){
                        return false;
                    }
                    for(let i=0; i<select_poker.list.length - 4; i+=3){
                        if( select_poker.list[i].number != select_poker.list[i+2].number ||
                            select_poker.list[i].number != select_poker.list[i+3].number-1
                        ){
                            return false;
                        }
                    }
                    select_poker.type = 77;								// 设置牌型为三个三的飞机
                    select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                    return true;
                    break;
                case 10:
                    if(select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[0].number == select_poker.list[3].number-1 &&
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[9].number
                    ){
                        //3334445566
                        select_poker.type = 88;								// 设置牌型为二个三带二的飞机
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if(select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[4].number == select_poker.list[7].number-1 &&
                        select_poker.list[7].number == select_poker.list[9].number ||
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[2].number == select_poker.list[5].number-1 &&
                        select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[9].number
                    ){
                        /*
                            3344555666
                            3344455566
                         */
                        select_poker.type = 88;								// 设置牌型为二个三带二的飞机
                        select_poker.max = select_poker.list[4].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                case 12:
                    if(select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[0].number == select_poker.list[3].number-1 &&
                        select_poker.list[3].number == select_poker.list[6].number-1
                    ){
                        //333444555678
                        select_poker.type = 888;								// 设置牌型为三个三带一的飞机
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if( select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[3].number == select_poker.list[6].number-1 &&
                        select_poker.list[6].number == select_poker.list[9].number-1
                    ){
                        //345666777888
                        select_poker.type = 888;								// 设置牌型为三个三带一的飞机
                        select_poker.max = select_poker.list[3].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if(select_poker.list[1].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[1].number == select_poker.list[4].number-1 &&
                        select_poker.list[4].number == select_poker.list[7].number-1 ||
                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[2].number == select_poker.list[5].number-1 &&
                        select_poker.list[5].number == select_poker.list[8].number-1

                    ){/*
			   		3 444555666 78
					34 555666777 8
			   */
                        select_poker.type = 888;								// 设置牌型为三个三带一的飞机
                        select_poker.max = select_poker.list[2].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }
                    //333444555666
                    if(select_poker.list[select_poker.list.length-3].number != select_poker.list[select_poker.list.length-1].number){
                        return false;
                    }
                    for(let i=0; i<select_poker.list.length - 4; i+=3){
                        if( select_poker.list[i].number != select_poker.list[i+2].number ||
                            select_poker.list[i].number != select_poker.list[i+3].number-1
                        ){
                            return false;
                        }
                    }
                    select_poker.type = 777;								// 设置牌型为四个三的飞机
                    select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                    return true;
                    break;
                case 15:
                    if(select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[0].number == select_poker.list[3].number -1 &&
                        select_poker.list[3].number == select_poker.list[6].number-1 &&
                        select_poker.list[9].number == select_poker.list[10].number &&
                        select_poker.list[11].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[14].number
                    ){//333444555667788
                        select_poker.type = 878;								// 设置牌型为三个三带二的飞机
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if(select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[12].number == select_poker.list[14].number &&
                        select_poker.list[6].number == select_poker.list[9].number -1 &&
                        select_poker.list[9].number == select_poker.list[12].number-1
                    ){//334455666777888
                        select_poker.type = 878;								// 设置牌型为三个三带二的飞机
                        select_poker.max = select_poker.list[6].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else  if(select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[11].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[14].number &&
                        select_poker.list[2].number == select_poker.list[5].number -1 &&
                        select_poker.list[5].number == select_poker.list[8].number-1	||
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[10].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[14].number &&
                        select_poker.list[4].number == select_poker.list[7].number -1 &&
                        select_poker.list[7].number == select_poker.list[10].number-1
                    ){
                        /*
                            33 444555666 7788
                            3344 555666777 88
                         */
                        select_poker.type = 878;								// 设置牌型为三个三带二的飞机
                        select_poker.max = select_poker.list[4].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }

                    //333444555666777
                    if(select_poker.list[select_poker.list.length-3].number != select_poker.list[select_poker.list.length-1].number){
                        return false;
                    }
                    for(let i=0; i<select_poker.list.length - 4; i+=3){
                        if( select_poker.list[i].number != select_poker.list[i+2].number ||
                            select_poker.list[i].number != select_poker.list[i+3].number-1
                        ){
                            return false;
                        }
                    }
                    select_poker.type = 778;								// 设置牌型为五个三的飞机
                    select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                    return true;
                    break;
                case 16:
                    /*
                    3334445556667891
                     */
                    if(select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[0].number == select_poker.list[3].number-1 &&
                        select_poker.list[3].number == select_poker.list[6].number-1 &&
                        select_poker.list[6].number == select_poker.list[9].number-1
                    ){
                        select_poker.type = 889;								// 设置牌型为四个三带一的飞机
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if(select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[10].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[15].number &&
                        select_poker.list[4].number == select_poker.list[7].number-1 &&
                        select_poker.list[7].number == select_poker.list[10].number-1 &&
                        select_poker.list[10].number == select_poker.list[13].number-1
                    ){//1234555666777888
                        select_poker.type = 889;								// 设置牌型为四个三带一的飞机
                        select_poker.max = select_poker.list[4].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if(select_poker.list[1].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[10].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[15].number	&&
                        select_poker.list[1].number == select_poker.list[4].number-1 &&
                        select_poker.list[4].number == select_poker.list[7].number-1 &&
                        select_poker.list[7].number == select_poker.list[10].number-1 &&
                        select_poker.list[10].number == select_poker.list[13].number-1||
                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[11].number == select_poker.list[13].number &&
                        select_poker.list[14].number == select_poker.list[16].number &&
                        select_poker.list[2].number == select_poker.list[5].number-1 &&
                        select_poker.list[5].number == select_poker.list[8].number-1 &&
                        select_poker.list[8].number == select_poker.list[11].number-1 &&
                        select_poker.list[11].number == select_poker.list[14].number-1 ||
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[12].number == select_poker.list[14].number &&
                        select_poker.list[15].number == select_poker.list[17].number &&
                        select_poker.list[3].number == select_poker.list[6].number-1 &&
                        select_poker.list[6].number == select_poker.list[9].number-1 &&
                        select_poker.list[9].number == select_poker.list[12].number-1 &&
                        select_poker.list[12].number == select_poker.list[15].number-1
                    ){
                        /*
                        1 333444555666 789
                        12 333444555666 78
                        122 333444555666 7
                         */
                        select_poker.type = 889;								// 设置牌型为四个三带一的飞机
                        select_poker.max = select_poker.list[3].number*1; 	// 设置判断值为该牌的点数
                        return true;

                    }
                    break;
                case 18:
                    /*
                    333444555666777888
                     */
                    if(select_poker.list[select_poker.list.length-3].number != select_poker.list[select_poker.list.length-1].number){
                        return false;
                    }
                    for(let i=0; i<select_poker.list.length - 4; i+=3){
                        if( select_poker.list[i].number != select_poker.list[i+2].number ||
                            select_poker.list[i].number != select_poker.list[i+3].number-1
                        ){
                            return false;
                        }
                    }
                    select_poker.type = 779;								// 设置牌型为六个三的飞机
                    select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                    return true;
                    break;
                case 20:
                    if(select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[12].number == select_poker.list[14].number &&
                        select_poker.list[0].number == select_poker.list[3].number-1 &&
                        select_poker.list[3].number == select_poker.list[6].number-1 &&
                        select_poker.list[6].number == select_poker.list[9].number-1 &&
                        select_poker.list[9].number == select_poker.list[12].number-1
                    ){//33344455566677789122
                        select_poker.type = 899;								// 设置牌型为五个三带一的飞机
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if(select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[11].number == select_poker.list[13].number &&
                        select_poker.list[14].number == select_poker.list[16].number &&
                        select_poker.list[17].number == select_poker.list[19].number &&
                        select_poker.list[5].number == select_poker.list[8].number-1 &&
                        select_poker.list[8].number == select_poker.list[11].number-1 &&
                        select_poker.list[11].number == select_poker.list[14].number-1 &&
                        select_poker.list[14].number == select_poker.list[17].number-1
                    ){//12234555666777888999
                        select_poker.type = 899;								// 设置牌型为五个三带一的飞机
                        select_poker.max = select_poker.list[5].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if(select_poker.list[1].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[10].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[15].number	&&
                        select_poker.list[1].number == select_poker.list[4].number-1 &&
                        select_poker.list[4].number == select_poker.list[7].number-1 &&
                        select_poker.list[7].number == select_poker.list[10].number-1 &&
                        select_poker.list[10].number == select_poker.list[13].number-1||
                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[11].number == select_poker.list[13].number &&
                        select_poker.list[14].number == select_poker.list[16].number &&
                        select_poker.list[2].number == select_poker.list[5].number-1 &&
                        select_poker.list[5].number == select_poker.list[8].number-1 &&
                        select_poker.list[8].number == select_poker.list[11].number-1 &&
                        select_poker.list[11].number == select_poker.list[14].number-1 ||
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[12].number == select_poker.list[14].number &&
                        select_poker.list[15].number == select_poker.list[17].number &&
                        select_poker.list[3].number == select_poker.list[6].number-1 &&
                        select_poker.list[6].number == select_poker.list[9].number-1 &&
                        select_poker.list[9].number == select_poker.list[12].number-1 &&
                        select_poker.list[12].number == select_poker.list[15].number-1
                    ){
                        /*
                        1 555666777888999 0123
                        10 555666777888999 222
                        120 555666777888999 22
                         */
                        select_poker.type = 899;								// 设置牌型为五个三带一的飞机
                        select_poker.max = select_poker.list[3].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if(select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[10].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[15].number &&
                        select_poker.list[16].number == select_poker.list[18].number &&
                        select_poker.list[4].number == select_poker.list[7].number-1 &&
                        select_poker.list[7].number == select_poker.list[10].number-1 &&
                        select_poker.list[10].number == select_poker.list[13].number-1 &&
                        select_poker.list[13].number == select_poker.list[16].number-1
                    ){//2222 555666777888999 0
                        select_poker.type = 899;								// 设置牌型为五个三带一的飞机
                        select_poker.max = select_poker.list[4].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if(select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[0].number == select_poker.list[3].number -1 &&
                        select_poker.list[3].number == select_poker.list[6].number-1 &&
                        select_poker.list[6].number == select_poker.list[9].number-1 &&
                        select_poker.list[12].number == select_poker.list[13].number &&
                        select_poker.list[14].number == select_poker.list[15].number &&
                        select_poker.list[16].number == select_poker.list[17].number &&
                        select_poker.list[18].number == select_poker.list[19].number
                    ){//33344455566677889911
                        select_poker.type = 887;								// 设置牌型为四个三带二的飞机
                        select_poker.max = select_poker.list[0].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if(select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[11].number == select_poker.list[13].number &&
                        select_poker.list[14].number == select_poker.list[16].number &&
                        select_poker.list[17].number == select_poker.list[19].number &&
                        select_poker.list[8].number == select_poker.list[11].number -1 &&
                        select_poker.list[11].number == select_poker.list[14].number-1 &&
                        select_poker.list[14].number == select_poker.list[17].number-1
                    ){//11223344555666777888
                        select_poker.type = 887;								// 设置牌型为四个三带二的飞机
                        select_poker.max = select_poker.list[8].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if(select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[11].number == select_poker.list[13].number &&
                        select_poker.list[14].number == select_poker.list[15].number &&
                        select_poker.list[16].number == select_poker.list[17].number &&
                        select_poker.list[18].number == select_poker.list[19].number &&
                        select_poker.list[2].number == select_poker.list[5].number -1 &&
                        select_poker.list[5].number == select_poker.list[8].number-1 &&
                        select_poker.list[8].number == select_poker.list[11].number-1 ||
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[10].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[15].number &&
                        select_poker.list[16].number == select_poker.list[17].number &&
                        select_poker.list[18].number == select_poker.list[19].number &&
                        select_poker.list[4].number == select_poker.list[7].number -1 &&
                        select_poker.list[7].number == select_poker.list[10].number-1 &&
                        select_poker.list[10].number == select_poker.list[13].number-1

                    ){
                        /*
                        11 555666777888 223344
                        1122 555666777888 3344
                         */
                        select_poker.type = 887;								// 设置牌型为四个三带二的飞机
                        select_poker.max = select_poker.list[4].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }else if( select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[12].number == select_poker.list[14].number &&
                        select_poker.list[15].number == select_poker.list[17].number &&
                        select_poker.list[18].number == select_poker.list[19].number &&
                        select_poker.list[6].number == select_poker.list[9].number -1 &&
                        select_poker.list[9].number == select_poker.list[12].number-1 &&
                        select_poker.list[12].number == select_poker.list[15].number-1
                    ){//112233 555666777888 44
                        select_poker.type = 887;								// 设置牌型为四个三带二的飞机
                        select_poker.max = select_poker.list[6].number*1; 	// 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                default:
                    return false;
                    break;
            }
        }

        function animate(){
            switch(desktop.type){
                case 110:
                    // 王炸动画
                    return 3000;
                    break;
                case 100:
                    // 炸弹动画
                    return 2000;
                    break;
            }
        }

        //判断输赢
        function bunko(play_1,play_2,play_3) {
            if(play_1.poker.length==0){
                if(play_1.role==1){
                    $('.bunko').show();
                    play_1.score = play_1.score + fractionVal;
                    play_2.score = play_2.score - fractionVal/2;
                    play_3.score = play_3.score - fractionVal/2;
                    // $(".fraction_1 span").html(play_1.score);
                    // $(".fraction_2 span").html(play_2.score);
                    // $(".fraction_3 span").html(play_3.score);
                }else if(play_2.role==1){
                    $('.bunko1').show();
                    play_1.score = play_1.score +fractionVal/2;
                    play_2.score = play_2.score - fractionVal;
                    play_3.score = play_3.score + fractionVal/2;
                }else if(play_3.role==1){
                    $('.bunko1').show();
                    play_1.score = play_1.score +fractionVal/2;
                    play_2.score = play_2.score + fractionVal/2;
                    play_3.score = play_3.score - fractionVal;
                }
                    $(".fraction_1 span").html(play_1.score);
                    $(".fraction_2 span").html(play_2.score);
                    $(".fraction_3 span").html(play_3.score);
                    $('.bunko1').show();
                    setTimeout(function () {
                        window.location.reload(true);
                    },10000);
                }

            if(play_2.poker.length==0){
                if(play_2.role==1){
                    $('.bunko').show();
                    play_1.score = play_1.score -fractionVal/2;
                    play_2.score = play_2.score + fractionVal;
                    play_3.score = play_3.score - fractionVal/2;
                    // $(".fraction_1 span").html(play_1.score);
                    // $(".fraction_2 span").html(play_2.score);
                    // $(".fraction_3 span").html(play_3.score);
                }else if(play_1.role==1){
                    $('.bunko1').show();
                    play_2.score = play_2.score + fractionVal/2;
                    play_1.score = play_1.score - fractionVal;
                    play_3.score = play_3.score +fractionVal/2;
                }else if(play_3.role==1){
                    $('.bunko1').show();
                    play_2.score = play_2.score + fractionVal/2;
                    play_1.score = play_1.score + fractionVal/2;
                    play_3.score = play_3.score - fractionVal;
                }
                    $(".fraction_1 span").html(play_1.score);
                    $(".fraction_2 span").html(play_2.score);
                    $(".fraction_3 span").html(play_3.score);
                    setTimeout(function () {
                        window.location.reload(true);
                    },10000);

                }


            if(play_3.poker.length==0){
                if(play_3.role==1){
                    $('.bunko').show();
                    play_1.score = play_1.score -fractionVal/2;
                    play_2.score = play_2.score - fractionVal/2;
                    play_3.score = play_3.score +fractionVal;
                    // $(".fraction_1 span").html(play_1.score);
                    // $(".fraction_2 span").html(play_2.score);
                    // $(".fraction_3 span").html(play_3.score);
                }else if(play_1.role==1){
                    $('.bunko1').show();
                    play_3.score = play_3.score + fractionVal/2;
                    play_1.score = play_1.score - fractionVal;
                    play_2.score = play_2.score + fractionVal/2;
                }else if(play_2.role==1){
                    $('.bunko1').show();
                    play_3.score = play_3.score + fractionVal/2;
                    play_1.score = play_1.score + fractionVal/2;
                    play_2.score = play_2.score - fractionVal;
                }
                    $(".fraction_1 span").html(play_1.score);
                    $(".fraction_2 span").html(play_2.score);
                    $(".fraction_3 span").html(play_3.score);
                    setTimeout(function () {
                        window.location.reload(true);
                    },10000);
                }
            }

        //所选择的牌不符合规则
        function unreasonableanimate() {
            $('.play_out').click(function () {
                setTimeout(function () {
                    // $('.under').css({'display':'block'})
                    $('.under').show();
                },500);
                // setInterval(function () {
                //     $('.under').hide();
                // },2000);
                $(document).css('background','#ccc')

            });
        }

        //飞机动画
        function planeanimate() {
            $ul =$('<ul/>');
            $('.play_btn2').append($ul);
            $('.play_btn2 ul').addClass('effect').css({'right':'-800px'}).animate({'right':'800px'},3000);
            setInterval(function () {
                $('.play_btn2 ul').remove();
            },3000);
        }


        // 炸弹动画
        function kinganiemate() {
            $ul=$('<ul/>');
            $('.play_btn2').append($ul);
            $('.play_btn2 ul').addClass('king').css({'top':'-300','right':'-1800px','display':'absolute'}).animate({'top':'300px','right':'0','display':'none'},5000);
            // $('.play_btn2 div').addClass('kingHuo').css({'top':'300px','right':'300px','display':'block'}).animate({'top':'300px','right':'300px'});
            setInterval(function () {
                $('.king').remove();
            },5000);
        }
        function kingHaniemate() {
            $div=$('<div/>');
            $('.play_btn2').append($div);
            setTimeout(function () {
                $('.play_btn2 div').addClass('kingHuo').css({'top':'100px','left':'-100px','display':'absolute'});
            },5000);
            setInterval(function () {
                $('.kingHuo').remove()
            },5000)
        }


        //王炸动画
        function friedKinganimate() {
            $ul=$('<ul/>');
            $('.play_btn2').append($ul);
            $('.play_btn2 ul').addClass('friedKing').css({'top':'-300px','right':'-300px',"background-size":"50%"}).animate({'top':'800px','right':'600px'},3000);
            // setInterval(function () {
            //     $('.play_btn2 ul').remove();
            // },3000);
        }

        //火箭的动画
        function rocketanimate() {
            $ul=$('<ul/>');
            $('.play_btn2').append($ul);
            $('.play_btn2 ul').addClass('rocket').css({'right':'800px','top':'800px'}).animate({'top':'-800px'},3000)
        }
        setInterval(function () {
            $('.play_btn2 ul').remove();
        },3000);

        //春天
        function springanimate() {
            $ul = $('<ul/>');
            $('.play_btn2').append($ul);
            $('.play_btn2 ul').addClass('spring').css({'right': '600px', 'top': '210px'});
        }
        function spring_petalanimate() {
            $li=$('<li/>');
            $('.spring').append($li);
            setTimeout(function () {
                $('.spring li').addClass('spring_petal').css({'top':'28px','right':'-115px'})
            },1500);

        }

    function straightanimate() {
        $('.straight1').css('display','block').animate({'left':'800px'},1500);
        $('.straight2').css({'display':'block'}).animate({'left':'600px'},1500)
        setTimeout(function () {
            $('.straight1').remove();
            $('.straight2').remove()
        },3000)
    }
    //提示
    function aiplay() {
        console.log("desktop.length:",desktop.list.length);
        switch (desktop.type){
            //单张提示
            case 1:
                if(desktop.max*1==14&&play_2.poker[play_2.poker.length-1].number*1==14&&
                play_2.poker[play_2.poker.length-1].color*1==1){
                    choices.push(play_2.poker.length-1);
                    break;
                }
                for (let i = 0; i < play_2.poker.length; i++) {
                    if (play_2.poker[i].number > desktop.max) {
                        choices.push(i);
                        break;
                    }
                }
                break;
            //对子
            case 2:
                for(let i=0;i<play_2.poker.length; i++){
                    if(play_2.poker[i].number>desktop.max&&play_2.poker[i].number==play_2.poker[i+1].number){
                        choices.push(i,i+1);
                        break;
                    }
                }
                break;
            //三张
            case 3:
                for(let i=0;i<play_2.poker.length;i++){
                    if(play_2.poker[i].number>desktop.max&&play_2.poker[i].number==play_2.poker[i+2].number){
                        choices.push(i,i+1,i+2);
                        break;
                    }
                }

                break;
            //三带一
            case 4:
                for (let i=0;i<play_2.poker.length-2;i++){
                    if(play_2.poker[i].number>desktop.max&&play_2.poker[i].number==play_2.poker[i+2].number){
                        for(let j=1;j<play_2.poker.length-1;j++){
                            if(play_2.poker[j].number != play_2.poker[j-1].number && play_2.poker[j].number != play_2.poker[j+1].number){
                                choices.push(i,i+1,i+2,j);
                                return choices;
                            }
                        }
                    }
                }
                break;
            //三带二
            case 5:
                for(let i=0;i<play_2.poker.length-2;i++){
                    if(play_2.poker[i].number>desktop.max && play_2.poker[i].number==play_2.poker[i+2].number){
                        for(let j=0;j<play_2.poker.length-1;j++){
                            if(i!=j&&i+1!=j&&i+2!=j&&play_2.poker[j].number==play_2.poker[j+1].number){
                                choices.push(i,i+1,i+2,j,j+1);
                                return choices;
                            }
                        }
                    }
                }
                break;
            //顺子
            case 6:
                for(let i=0;i<play_2.poker.length-desktop.list.length;i++){
                    if(play_2.poker[i].number>desktop.max){
                        let arr=[];
                        arr.push(i);
                        for(let j=i+1;j<play_2.poker.length;j++){
                            if(arr.length==desktop.list.length){
                                return arr;
                            }
                        }
                    }
                }
                break;
            //连对
            case 66:
                for(let i=0;i<play_2.poker.length-1;i++){
                    if(play_2.poker[i].number>desktop.max&&play_2.poker[i].number==play_2.poker[i+1].number){
                        let arr=[];
                        arr.push(i,i+1);
                        for(let j=i+2;j<play_2.poker.length-1;j++){
                            if(play_2.poker[j].number-1==play_2.poker[arr[arr.length-1]].number&&play_2.poker[j].number==play_2.poker[j+1].number){
                                arr.push(j,j+1);
                                if(arr.length==desktop.list.length){
                                    return arr;
                                }
                            }
                        }
                    }
                }
                break;
            }
            if(desktop.list.length==0){
                choices.push(0);
                // alert("你没有牌大过大家");
            }
            return choices;
        }
});