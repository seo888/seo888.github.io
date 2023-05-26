
function $Id(elm) {return document.getElementById(elm)}
function hasClass(obj, cls) {
    var obj_class = obj.className,
        obj_class_lst = obj_class.split(/\s+/);
    x = 0;
    for (x in obj_class_lst) {
        if (obj_class_lst[x] == cls) {
            return true;
        }
    }
    return false;
}
function addClass(obj, cls) {
    var obj_class = obj.className,
        blank = (obj_class != '') ? ' ': '';
    added = obj_class + blank + cls;
    obj.className = added;
}
function removeClass(obj, cls) {
    var obj_class = ' ' + obj.className + ' ';
    obj_class = obj_class.replace(/(\s+)/gi, ' '),
        removed = obj_class.replace(' ' + cls + ' ', ' ');
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');
    obj.className = removed;
}
function BthOpen() {
    var _obj = document.getElementsByClassName('sub-icon-search')[0];
    var cl = document.getElementsByClassName('research')[0];
    document.onclick = function(e) {
        var target = e.target;
        var tc = target.className;
        if (tc != 'ipt-text') {
            removeClass(cl, 'research_zk');
        }
    };
    _obj.addEventListener('click',
        function(event) {
            event.stopPropagation();
            event.cancelBubble = true;
            addClass(cl, 'research_zk');
        });
}
BthOpen();
function NewBanner(n, id) {
    var dom = document.getElementById(id);
    var child = dom.getElementsByTagName('li');
    var t = child.length;
    n = n - 1;
    if (n >= t) {
        n = 0
    } else if (n === -1) {
        n = t - 1
    }
    for (var i = 0; i < child.length; i++) {
        child[i].style.display = 'none';
        if (n === i) {
            child[i].style.display = 'block';
        }
    }
}
new Swiper('.f-l .swiper-container2', {
    loop: true,
    autoplay: {
        delay: 5000
    },
    lazy: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    on: {
        slideChangeTransitionEnd: function() {
            var n = this.activeIndex;
            NewBanner(n, 'swiper-ul');
        }
    }
});
new Swiper('.swiper_hd1 .swiper-container', {
    loop: true,
    autoplay: {
        delay: 4000
    },
    lazy: true,
    pagination: {
        el: '.swiper_hd1 .swiper-pagination',
        clickable: true
    },
});
new Swiper('.swiper_hd2 .swiper-container', {
    loop: true,
    autoplay: {
        delay: 4000
    },
    lazy: true,
    pagination: {
        el: '.swiper_hd2 .swiper-pagination',
        clickable: true
    },
});
var poster = null;
function Closed(j, timer) {
    this.poster = document.querySelectorAll(j);
    this.init(timer)
}
Closed.prototype.init = function(t) {
    var This = this;
    for (var i = 0; i < this.poster.length; i++) {
        var th = This.poster[i];
        This.poster[i].onclick = function(e) {
            var par;
            if ( !! window.ActiveXObject || "ActiveXObject" in window) {
                par = e.target.parentNode
            } else {
                par = e.target.parentElement
            }
            par.style.display = 'none'
        };
        if (t != null) {
            this.autoplay(th, t)
        }
    }
};
Closed.prototype.autoplay = function(dom, t) {
    setTimeout(function() {
            dom.style.display = 'none'
        },
        t)
};
var inNow = 0;
function t(d) {
    var ds = null;
    var num = 0;
    var sj = 2000;
    var _obj = d.getElementsByTagName('a');
    ds = setInterval(function() {
            num++;
            if (num >= _obj.length) {
                num = 0
            }
            for (let j = 0; j < _obj.length; j++) {
                _obj[j].style.display = 'none';
                _obj[j].onmousemove = function() {
                    clearInterval(ds)
                };
                _obj[j].onmouseout = function() {
                    setInterval(t(d), sj)
                }
            }
            _obj[num].style.display = 'block'
        },
        sj)
}
function Poster() {
    var lbBth = document.getElementsByClassName('poster_lb');
    for (var i = 0; i < lbBth.length; i++) {
        t(lbBth[i])
    }
}


var NewCrumbs = document.querySelectorAll('.new_plate_area')[0];
if(NewCrumbs!=null || NewCrumbs!=undefined){
    NewCrumbs.onmousemove = function(){
        removeClass(NewCrumbs,'new_plate_area1')
    };
    NewCrumbs.onmouseout= function(){
       addClass(NewCrumbs,'new_plate_area1')
    };
}
var nav_top = $Id('nav_id');
if(nav_top!=null || nav_top!=undefined){
    var lm = document.getElementsByClassName('nav_list')[0];
    var n = nav_top.innerText;
    if(lm!=null || lm!=undefined || n!= null || n!= undefined){
        var at = lm.querySelectorAll('li');
        for(var i = 0 ;i<at.length;i++){
            (function(i) {
                 if(i===parseInt(n)){
                     addClass(  at[i],'new_nav_list');
                     // console.log(at[i].querySelectorAll('p')[0]);
                     // at[i].querySelectorAll('p')[0].style.color = '#d61518';
                 }
            })(i)
        }
    }
}


