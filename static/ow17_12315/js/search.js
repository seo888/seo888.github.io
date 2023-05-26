
    var data = [{name:'全国名牌数据库',value:'1'},{name:'资讯文章',value:'2'}]
    var iptData = [{name:'(品牌/企业/行业分类)',value:'1'},{name:'(排行榜/新闻资讯)',value:'2'}]
    var content = document.getElementById('content');
    var main = document.getElementById('main');
    var selectImg = document.getElementById('selectImg');
    var selectItem = document.getElementById('selectItem');
    var hiddenIpt = document.getElementById('hidden-ipt');
    var serchIpt = document.getElementById('wjx-ipt');

    var ul = document.createElement('ul');
    selectItem.appendChild(ul);
    for(var i = 0; i < data.length; i++){
        var li = document.createElement('li');
        li.setAttribute('data-value',data[i].value);
        li.innerText = data[i].name;
        ul.appendChild(li);
    }
    /**
     * 点击下拉箭头
     */
    main.onmouseover = function(){
        if(selectItem.style.display == 'none' || selectItem.style.display == ''){
            selectItem.style.display = 'block';
        }
    }
    main.onmouseleave = function() {
            selectItem.style.display = 'none';
    }
    // selectImg.onclick = function () {
    //     console.log(selectItem.style.display);
    //     if(selectItem.style.display == 'none' || selectItem.style.display == ''){
    //         selectItem.style.display = 'block';
    //     }else{
    //         selectItem.style.display = 'none';
    //     }

    // }

    var lis = selectItem.getElementsByTagName('li');
    for(var i = 0; i < lis.length; i++){
        lis[i].onclick = function () {
            console.log(this.innerHTML,this.getAttribute('data-value'));
            content.innerText = this.innerHTML;
            hiddenIpt.value = this.getAttribute('data-value');
            serchIpt.setAttribute("placeholder",iptData[this.getAttribute('data-value')-1].name)
            console.log(hiddenIpt.value)
            selectItem.style.display = 'none';
        }
    }