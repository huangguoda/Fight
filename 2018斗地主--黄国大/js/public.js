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