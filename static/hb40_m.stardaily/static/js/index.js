$('.closead').each(function (index) {
  $(this).click(function () {
    $(this).parent('.closed').css('display' , 'none');
  });
})

$(document).ready(function () {
  var imglist = $("a");
  for (var i = 0; i < imglist.length; i++) {
    if (!imglist.eq(i).attr("href")) {
      imglist.eq(i).attr('href' , '');
    }
  }
})

$(document).ready(function () {
  var imglist = $("a");
  for (var i = 0; i < imglist.length; i++) {
    if (!imglist.eq(i).attr("target")) {
      imglist.eq(i).attr('target' , '_blank');
    }
  }
})

$("#nav").click(function () {
  $(".menu_block").toggleClass("active");
});


// $(".close").click(function () {
//   $(".menu_block").animate({ "height" :  "0" } , 500).css("zIndex" , '1200');
// })




$(".tabs-head li").each(function (index) {
  $(this).click(function () {
    $(this).addClass("active").siblings(".tabs-head li").removeClass("active")
    $(".tabs-body ul").eq(index).addClass("active").siblings(".tabs-body ul").removeClass("active")

  })

})

