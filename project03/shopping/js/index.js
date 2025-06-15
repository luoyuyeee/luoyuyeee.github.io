window.addEventListener('load', function() {
    // 1.获取元素
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2.鼠标经过 focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
    });
    // 3.动态生成小点点，根据图片个数动态生成小点点
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    //验证图片个数
    // console.log(ul.children.length); 
    for(var i = 0 ; i < ul.children.length ; i++){
        // 创建一个 li
        var li = this.document.createElement('li');
        // 记录当前小点点的索引号,通过自定义属性
        li.setAttribute('index', i);
        // 把小li插入到 ol
        ol.appendChild(li);
        // 4.小点点的排他思想
        li.addEventListener('click', function() {
            // 排他
            for(var i = 0 ; i < ol.children.length ; i++) {
                ol.children[i].className = '';
            }
            // 利己
            this.className = 'current';
            // 5.点击小点点,移动图片-ul
            // target= 小点点的索引号 * 图片的宽度,负值
            // 点击某个小li,就拿到当前li的索引号
            var index = this.getAttribute('index');
            // 当点击某个小li,就要把该小li的索引号给num,和circle
            num = circle = index;
            var focusWidth = focus.offsetWidth;
            console.log(focusWidth);
            console.log(index);
            
            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小点点li设置类名current
    ol.children[0].className = 'current';
    // 6.克隆第一张图片li,放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7.点击右侧按钮,图片滚动一张
    var num = 0;
    var circle = 0;
    // 节流阀
    var flag = true;
    // circle 控制小点点的播放

    arrow_r.addEventListener('click', function() {
        if(flag) {
            flag = false; //关闭节流阀
            // 如果走到最后一张克隆图片,此时ul要快速复原,left改为0
        if(num == ul.children.length - 1){
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * focusWidth, function() {
            flag = true; //打开节流阀
        });
        // 8.点击右侧按钮,小点点跟随一起变化,即再声明一个变量控制小点点的播放
        circle++;
        // 如果circle == 4 ,说明走到最后的克隆图片,就要复原
        if(circle == ol.children.length) {
            circle = 0;
        }
        // 调用函数
        circleChange();
        }
    });

    // 9.左侧按钮做法
    arrow_l.addEventListener('click', function() {
        if(flag) {
            flag = false;
            // 如果走到最后一张克隆图片,此时ul要快速复原,left改为0
        if(num == ul.children.length - 1){
            num = ul.children.length - 1;
            ul.style.left = -num * focusWidth + 'px';
            
        }
        num--;
        animate(ul, -num * focusWidth, function() {
            flag = true;
        });
        // 8.点击右侧按钮,小点点跟随一起变化,即再声明一个变量控制小点点的播放
        circle++;
        // 如果circle == 4 ,说明走到最后的克隆图片,就要复原
        // if(circle < 0) {
        //     circle = ol.children.length - 1;
        // }
        circle = circle < 0 ? ol.children.length - 1 : circle;
        circleChange();
        
        }
    });
    function circleChange() {
        // 排他思想
        for(var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 10.自动播放功能
    var timer = setInterval(function() {
        // 手动调用点击事件
        arrow_r.click();
    }, 2000);
    
})