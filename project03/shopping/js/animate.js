function animate(obj, target, callback) {
    // 先清除之前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                // 声明步长值，步长值往上取整，不要出现小数
                // var step = Math.ceil((target - obj.offsetLeft) / 10);
                var step = (target - obj.offsetLeft) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if(obj.offsetLeft == target) {
                // 停止动画，即停止定时器
                clearInterval(obj.timer);
                // 回调函数写到定时器结束里面
                if(callback) {
                    // 调用函数
                    callback();
                }
            }
            // 步长公式：（目标值 - 当前位置）/ 10
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
        }