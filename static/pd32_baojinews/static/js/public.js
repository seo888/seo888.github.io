/*字体多余隐藏*/
function wordlimit(cname,wordLength){//1.首先，定义函数，其中两个参数，参数一是目标元素，也就是需要显示省略号的那个元素；参数二是需要限制的字数。

    var cname=document.getElementsByClassName(cname);//2.定义变量cname，即目标元素

    for(var i=0;i<cname.length;i++){//3.这里写了个循环，因为目标元素不止一个，之前找到一个通过获取id来截取字段实现效果的，但是如果目标元素有多个，id每个又不能相同，就显得麻烦了

        var nowLength=cname[i].innerHTML.length;//4.定义变量nowLength，里面存储的是每一个目标元素所包含的字数。

        if(nowLength>wordLength){//这里做一些判断，如果现在的每个目标元素里面的字数多于我们需要限制的字数

            cname[i].innerHTML=cname[i].innerHTML.substr(0,wordLength)+'...';//<a class="details" href="'+url+'">[详情]</a>每个目标元素的内容就会被改变为当前内容的字符长度从0开始然后一直截取到需要限制的字数位置。
//                cname[i].innerHTML+="...";
        }

    }

}
