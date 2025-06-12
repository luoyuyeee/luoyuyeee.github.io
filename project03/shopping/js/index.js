window.addEventListener('load', function() {
    // 1.获取元素
    var arrow_l = this.document.querySelector('.arrow-l');
    var arrow_r = this.document.querySelector('.arrow-r');
    var focus = this.document.querySelector('.focus');
    // 2.鼠标经过 focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    });
    // 3.动态生成小点点，根据图片个数动态生成小点点
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    //验证图片个数
    // console.log(ul.children.length); 
    for(var i = 0 ; i < ul.children.length ; i++){
        // 创建一个 li
        var li = this.document.createElement('li');
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
        })
    }
    // 把ol里面的第一个小点点li设置类名current
    ol.children[0].className = 'current';
    
})