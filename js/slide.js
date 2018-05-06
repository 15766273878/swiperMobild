/*轮播图部分开始*/
function slider() {
    var imgUl = document.querySelector('.imgUl');
    var imgBox = imgUl.parentNode;
    var li_width = imgUl.children[0].offsetWidth;
    var dots = document.querySelector('.slide-list').children;
    var current = 1;
    setTransform(imgUl,-current*li_width,'x');
    imgUl.timeInterval = 5000;
    clearInterval(imgUl.timer);
    imgUl.timer = setInterval(function () {
        current++;
        addTransition(imgUl);
        var dis = -current *li_width;
        setTransform(imgUl,dis,'x')
    },imgUl.timeInterval)


    addTransitionEnd(imgUl,function () {
        if(current >= imgUl.children.length -1){
            current = 1;
        }else if(current == 0){
            current = imgUl.children.length - 2;
        }
        removeTransition(imgUl);
        setTransform(imgUl,-current*li_width,'x');
        updateDot();
    });

    imgBox.addEventListener('touchstart',function (e) {
        clearInterval(imgUl.timer);
        imgUl.startX = e.touches[0].pageX;
        imgUl.isMove = false;
    })
    imgBox.addEventListener('touchmove',function (e) {
        imgUl.isMove = true;
        imgUl.endX = e.touches[0].pageX;
        imgUl.distance = imgUl.endX - imgUl.startX;
        removeTransition(imgUl);
        setTransform(imgUl,-current*li_width+imgUl.distance,'x')
    })
    imgBox.addEventListener('touchend',function () {
        if(imgUl.isMove){
            if(Math.abs(imgUl.distance)>li_width/3){
                if(imgUl.distance>0 && current>=1){
                    current--;
                }else if(imgUl.distance<0 && current<=imgUl.children.length -2){
                    current++;
                }
                addTransition(imgUl);
                setTransform(imgUl,-current*li_width,'x')
            }else{
                addTransition(imgUl);
                setTransform(imgUl, -current*li_width, 'x');
            }
        }
        clearInterval(imgUl.timer);
        imgUl.timer = setInterval(function () {
            current++;
            addTransition(imgUl);
            var dis = -current *li_width;
            setTransform(imgUl,dis,'x')
        },imgUl.timeInterval)
        updateDot();
    })

    function updateDot() {
        for(var i = 0;i<dots.length;i++){
            dots[i].className = ''
        }
        dots[current - 1].className = 'active';
    }
}/*轮播图部分结束*/


function addTransition(obj,time) {
    var dur = 0.5;
    if(time){
        dur = time;
    }
    obj.style.transition = 'all ' + dur +'s';
    obj.style.webkitTransition = 'all ' + dur +'s';
}

function removeTransition(obj) {
    obj.style.transition = ''
    obj.style.webkitTransition = '';
}

function setTransform(obj,dis,dir) {
    obj.style.transform = 'translate'+dir+'('+dis+'px)';
    obj.style.webkitTransform = 'translate'+dir+'('+dis+'px)';
}

function addTransitionEnd(obj,fn) {
    obj.addEventListener('transitionEnd', fn);
    obj.addEventListener('webkitTransitionEnd', fn);
}