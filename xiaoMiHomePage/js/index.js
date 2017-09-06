$(function(){
    $('.sh-car').mouseover(function(){
        $('.shopping-car').show(500);
    })
    $('.sh-car').mouseout(function(){
        $('.shopping-car').hide(500);
    })
    // 封装函数
    function myAjax(obj){ 
        var baseUrl ='http://192.168.70.61:9900/api';
        $.ajax({
            url:baseUrl+obj.url,
            type:obj.type,
            dataType:"json", 
            data:obj.data,       //转成json对象         
            success:function(data){    
                obj.success({items:data});
                // $('.items').append(template  ('template1',{items:data}));     //   因为拿到的对象没有名字,所以拼接一个名    字.  
            }        
        })
  }
    // 1.导航部分
      
    myAjax({
        url:'/nav',
        success:function(data){ 
            // console.log(data); 
            $('.items1').html(template('template1',data)); 
           
        }        
    }) 

    // 2.导航下拉列表
    $('.navbar-left').on('mouseover','a',function() {
    
        var navType =$(this).attr('type');      //怎么去拿到这个type
        if(navType==false){             
            return;
        }
        $('.items2').show(500);
        
        //怎么让盒子从上往下显示
        $.ajax({
            url:'http://192.168.70.61:9900/api/nav',
            dataType:"json",
            data:{
                type:navType        
            },
            success:function(data){
                //怎么样拿到对象,现在拿到的对象没有名字,可是上面的却可以  拿到?这个问题解决了,是因为我打印的方式不对
                // console.log({list:data});
                $('.items2').html(template('template2',{list:data}))    ; 
            }        
        })
    })
   
    $('.center-product').mouseout(function(){
     $('.items2').hide(500);
    }) 

//3.轮播图
    myAjax({
        url:'/lunbo',
        success:function(data){ 
            console.log(data); 
            $('.swiper-wrapper').append(template('template5',data));            
        }        
    }) 
//4.轮播图侧边栏导航
    myAjax({
        url:'/items',
        success:function(data){ 
            // console.log(data); 
            $('.sideLeft').html(template('template3',data));            
        }        
    }) 

// 第5个模版轮播图侧边栏导航 
    $('.sideLeft').on('mouseover','a',function(){
        var linkType =$(this).attr('type');      //怎么去拿到这个type
        $('.children-listchildren').show();    
        //怎么利用循环把里面的内容分成几块?
        $.ajax({
            url:'http://192.168.70.61:9900/api/items',
            dataType:"json",
            data:{
                type:linkType                 
            },
            success:function(data){            
                // console.log({list:data});
                $('.children-listchildren').html(template('template4',{list:data}));             
            }        
        })
    })
        $('.children-listchildren').hide();
        $('.children').mouseout(function(){
            $('.children-listchildren').hide(500);
        }) 
        //加个判断
    

//6.智能硬件
    myAjax({
        url:'/hardware',
        success:function(data){ 
            console.log(data); 
            $('.hardwareRight ul').append(template('template6',data));            
        }        
    }) 

//7.配件
    var lastLi = '';
    // var hotList =['hotgoods','hot','hotcloths'];
    var arr =['match','accessories','around'];   
    for (var i = 0; i < arr.length; i++) {
        $.ajax({
            url:'http://192.168.70.61:9900/api/product',               
            data:{
                toptitle:arr[i]        
            },
            success:function(data){               
                console.log(data);
               
                $('.match-product').append(template('matchMoban', data)); 
            }        
        })        
    }

    // $('.switch').on('mouseover','li',function(){
    //     var linkKey =$(this).attr('key'); 
    // } 


//8.为你推荐
    var num =1;
   function getRecommend(){
        myAjax({
        url:'/recommend',
        data:{
            page:num
        },
        success:function(data){          
            $('.recommend-box ul').html(template('recommend',data)); 
            if (num==2){
                $('.btn-right').addClass('disabled');
            }else{
                $('.btn-right').removeClass('disabled');
            } 
            if (num==1){
                $('.btn-left').addClass('disabled');
            }else{
                $('.btn-left').removeClass('disabled');
            }                
        }        
    })
    
   }
    getRecommend();
    $('.btn-right').click(function(){
        if($(this).hasClass('disabled')){
            return;
        }
        num ++;
        getRecommend();
        
    })
    $('.btn-left').click(function(){
        if($(this).hasClass('disabled')){
            return;
        }
        num --;
        getRecommend();
        
    })

//9.热评产品
    $.ajax({
        url:'http://192.168.70.61:9900/api/hotcomment',
        dataType:'json',
        success:function(data){
            console.log({products:data});
            $('.hotBox ul').append(template('hotcomment',{products:data}));
        }
    })

})    