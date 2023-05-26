app.factory("public",function($http){
    var obj = {}
    // 选择一级分类 和二级分类
    obj.isLoad=false;
    obj.cateApi='/member/Account/getcate';
    obj.isAdmin=false;
    if(location.pathname.indexOf('admin') != -1){
        obj.cateApi='/admin/website/getcate';
        obj.isAdmin=true;
    }
    // 一级分类
    $http.get(obj.cateApi).success(function (data) {
        obj.cateArr = obj.isAdmin? data.list : data//一级分类
        obj.isLoad=true;
       
    }).error(function (e) {
    })

    
    // str: 二级数组名称
    // name:一级分类的名称
    //id 一级分类id
    obj.changeOneCate = function (name, str, cateOne, cateTwo,id,cid) {
        obj.cateOneId=id
       obj[cateOne] = name

        if(obj[cateOne] != '' &&  obj[cateOne] != undefined ){
            var typeOne = obj.cateArr.filter(function (item) {
            return item.name == name
        });
        }
        if(typeOne){
        $http({
            url: obj.cateApi,
            data: { id: typeOne[0].id },
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            transformRequest: function (obj) {
                var str = [];
                for (var o in obj)
                    if (obj[o]) str.push(encodeURIComponent(o) + "=" + encodeURIComponent(obj[o]));
                return str.join("&");
            }
        }).success(function (data) {
            if(obj.isAdmin){
                data=data.list;
            } 
            obj[str] = data
            if(cid){
                for(var i=0;i<data.length;i++){
                    if(data[i].id==cid){
                        obj[cateTwo] = data[i].name    //添加网站二级分类   
                        obj.typeTwoId = data[i].id 
                        break;
                    }
                }
            }else{
                obj[cateTwo] = data[0].name    //添加网站二级分类   
                obj.typeTwoId = data[0].id      
            }
           
                   
        }, function () { })
        }
    }

    //  二级分类
   obj.changeTwoCate = function (name, cateTwo) {
       obj[cateTwo] = name   
    }
    
    obj.findTowArr = function(cateone,callback){
        obj.cateArr.filter(function(item,index){
            if(cateone == item.name){
                obj.typeOneId = item.id

                $http.post("/member/Account/getcate",{id:item.id}).success(function(data){
                    obj.towArr = data
                    callback(obj.towArr)
                })
            }
        })

    }

     // 正则匹配网站是否合法
     var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
  + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
  + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
  + "|" // 允许IP和DOMAIN（域名）
  + "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
  + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
  + "[a-z]{2,6})" // first level domain- .com or .museum 
  + "(:[0-9]{1,4})?" // 端口- :80 
  + "((/?)|" // a slash isn't required if there is no file name 
  + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"; 
  
   obj.re=new RegExp(strRegex); 
   //   re.test()

    return obj




})
