function containsNumber(str) {
    var reg = /\d/;
    return reg.test(str);
}

$(function() {

    var url = window.location.pathname
    var domain = document.domain

    if (domain.indexOf('.dev') == -1) {
        var apidomain = "//api.bjd.com.cn";
        var photodomain = "//photo.bjd.com.cn";
        domain = domain.replace('.dev', '');
        domain = domain.replace('.bjd.com.cn', '');

        if (domain == 'news') {
	    url = url.replace('.dev', '');
            var domain = url.split('/')[1];
	    if (containsNumber(domain)) {
	         domain = 'news';
            }             
            console.log(domain)
            
            // $.ajax({
            //     url: apidomain + '/hotarticle/' + domain + 'list.html',
            //     type: "GET",
            //     success: function(res) {
            //         $("#hotarticle").html(res);
            //     }
            // });
        } else {
            url = url.replace('.dev', '');
            var result = url.split('/')[1];
            console.log(result)

            // $.ajax({
            //     url: apidomain + '/hotarticle/' + result + 'list.html',
            //     type: "GET",
            //     success: function(res) {
            //         $("#hotarticle").html(res);
            //     }
            // });
        }
    } else {
        var apidomain = "//api.dev.bjd.com.cn";
        var photodomain = "//photo.dev.bjd.com.cn";
        domain = domain.replace('.dev', '');
        domain = domain.replace('.bjd.com.cn', '');
        // $.ajax({
        //     url: apidomain + '/hotarticle/' + domain + 'list.html',
        //     type: "GET",
        //     success: function(res) {
        //         $("#hotarticle").html(res);
        //     }
        // });
    }

    // $.ajax({
    //     url: photodomain + '/newest_photos/list.html',
    //     type: "GET",
    //     success: function(res) {
    //         $("#newest-photos").html(res);
    //     }
    // });

    // $.ajax({
    //     url: apidomain + '/adarticle/toplist.html',
    //     type: "GET",
    //     success: function(res) {
    //         $(".adarticletop").html(res)
    //     }
    // });

    // $.ajax({
    //     url: apidomain + '/adarticle/sidebar1list.html',
    //     type: "GET",
    //     success: function(res) {
    //         $('.adarticlesidebar1').html(res) //console.log(res);
    //     }
    // });

    // $.ajax({
    //     url: apidomain + '/adarticle/sidebar2list.html',
    //     type: "GET",
    //     success: function(res) {
    //         $('.adarticlesidebar2').html(res) //console.log(res)
    //     }
    // });
    
    // $.ajax({
    //     url: apidomain + '/adarticle/adbottomlist.html',
    //     type: "GET",
    //     success: function(res) {
    //         $('.adbottom').html(res) //console.log(res)
    //     }
    // });

})
