
// 获取导航
function getTabs (restData, callback) {
    ajax('/p/wedding/Home/APISearchSite/tabs', 'get', restData, callback )
}

// 获取全部列表
function getAllListApi (restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/all_list', 'get', restData, callback )
}

// 获取商家列表
function getMerchantListApi (restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/merchant_list', 'get', restData, callback )
}

// 获取套餐列表
function getPackageListApi (restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/package_list', 'get', restData, callback )
}

// 获取案例列表
function getExampleListApi (restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/example_list', 'get', restData, callback )
}

// 获取婚品列表
function getShopProductListApi (restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/shop_product_list', 'get', restData, callback )
}

// 获取酒店列表
function getHotelListApi (restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/hotel_list', 'get', restData, callback )
}

// 获取婚车列表
function getCarListApi (restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/car_list', 'get', restData, callback )
}

// 获取攻略列表
function getBaikeListApi (restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/baike_list', 'get', restData, callback )
}

// 获取输入框热词列表
function getInputWordList (restData, callback) {
  ajax('/p/wedding/index.php/home/APISearchWordV2/web_input_word_list','get',restData, callback)
}

// 搜索猜测
function getSearchTips(restData, callback) {
  ajax('/p/wedding/index.php/Home/APISearchSite/tips', 'get', restData, callback)
}

// 热搜榜
function getRank(restData, callback) {
  ajax('/p/wedding/index.php/home/APISearchWordV2/rank_v2', 'get', restData, callback)
}

// 获取推荐poster
function getPoster(restData, callback) {
    ajax('/p/wedding/index.php/home/APIPosterBlock/block_info?id=3008','get',restData, callback)
}


// 推荐商家列表
function getMerchantRecommendList(restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/sidebar_merchant_recommend','get',restData, callback)
}

// 推荐套餐列表
function getPackageRecommendList(restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/sidebar_package_recommend','get',restData, callback)
}

// 推荐婚品人气列表
function getHunpinRecommendList(restData, callback) {
    ajax('/p/wedding/index.php/Shop/APIShopProduct/WebHotProductList','get',restData, callback)
}


// 猜你喜欢-商家
function getMerchantLike(restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/merchant_recommend','get',restData, callback)
}

// 猜你喜欢-套餐
function getPackageLike(restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/package_recommend','get',restData, callback)
}

// 猜你喜欢-案例
function getCaseLike(restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/shop_product_recommend','get',restData, callback)
}

// 猜你喜欢-婚品
function getHunpinLike(restData, callback) {
    ajax('/p/wedding/index.php/Home/APISearchSite/shop_product_recommend','get',restData, callback)
}





function ajax (url, type, restData, callback) {
    $.ajax({
         url: url,
         type: type,
         data: restData,
         success: function (res) {
             callback && callback(res);
         },
         error: function (res) {
             callback && callback(res);
         }
    })
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
}

var flag = 1
function backToAll(flag) {
    if (getParam('from') && flag == 1) {
        location.href = location.href.split('?')[0] + '?keyword=' + getParam('keyword')
        flag ++ 
        return flag
    }
}