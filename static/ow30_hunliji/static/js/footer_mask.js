var city_id
var min_price = 4000
var max_price = 5000
var area
var moren_cityid = $("#moren_cityid").val()
window.addEventListener("scroll", bindHandleScroll)
function bindHandleScroll() {
  const bottomHeight =
    document.documentElement.scrollHeight -
    document.documentElement.scrollTop -
    document.documentElement.clientHeight
  if (bottomHeight < 100) {
    $(".div_180710").hide()
  } else {
    $(".div_180710").show()
  }
}
getBtn()
/*20170720*/
$(".style_close").click(function () {
  // 点击关闭的时候去除滚动监听事件
  $(".div_180710").hide()
  window.removeEventListener("scroll", bindHandleScroll)
})

var _width = $(window).width()
if (_width > 1366) {
  $(".style_riji").css({ width: "1460px", marginLeft: "-730px" })
} else {
  $(".style_riji").css({ width: "1326px", marginLeft: "-663px" })
}

$(".query_hotel_city").mouseover(function (e) {
  e.stopPropagation()
  $(".area_select_0710").hide()
  $(".city_select_0710").show()
  $(".budget_select_0710").hide()
})

$(".city_select_0710").on("click", "li", function (e) {
  e.stopPropagation()
  $(this).addClass("on").siblings().removeClass("on")
  $(".query_hotel_city span").html($(this).html())
  city_id = $(this).attr("_cityid")
  $(".city_select_0710").hide()
})

$(".query_hotel_area").mouseover(function (e) {
  e.stopPropagation()
  $(".city_select_0710").hide()
  $(".area_select_0710").show()
  $(".budget_select_0710").hide()
})

$(".area_select_0710").on("click", "li", function (e) {
  e.stopPropagation()
  $(this).addClass("on").siblings().removeClass("on")
  $(".query_hotel_area span").html($(this).html())
  $(".area_select_0710").hide()
})

$(".query_hotel_budget").mouseover(function (e) {
  e.stopPropagation()
  $(".city_select_0710").hide()
  $(".area_select_0710").hide()
  $(".budget_select_0710").show()
})

$(".budget_select_0710").on("click", "li", function (e) {
  e.stopPropagation()
  $(this).addClass("on").siblings().removeClass("on")
  $(".query_hotel_budget span").html($(this).html())
  $(".budget_select_0710").hide()
})

$(document).mouseover(function () {
  $(".area_select_0710").hide()
  $(".city_select_0710").hide()
  $(".budget_select_0710").hide()
})

//城市列表
getcitylist()
function getcitylist() {
  $.get("/p/wedding/index.php/home/APICity/hotel_city", function (result) {
    if (result.status.RetCode == 0) {
      var _html = ""
      var _html2 = ""
      $.each(result.data, function (name, value) {
        _html +=
          '<li  _cityid="' +
          this.cid +
          '" onclick="selectedCity1(' +
          this.cid +
          ')">' +
          this.name +
          "</li>"
        _html2 +=
          '<li  _cityid="' +
          this.cid +
          '" onclick="selectedCity(' +
          this.cid +
          ')">' +
          this.name +
          "</li>"
      })
      $(".city_select_0710").html(_html) //底部城市列表
      $(".city_select").html(_html2) //首页城市列表
    }
  })
}

//选择城市加载区域
function selectedCity(cid) {
  city_id = cid
  $.get("/Hotel/all_area_by_city", { cid: cid }, function (resp) {
    if (resp.status.RetCode == 0) {
      var html = " <div >区域不限</div>"

      $.each(resp.data, function (name, value) {
        html +=
          ' <div val="' +
          this.id +
          '" data-areaid="' +
          this.id +
          '">' +
          this.area_name +
          "</div>"
      })
      $("#city__area").html("")
      $("#city__area").append(html)
      $("#all_box span").html("区域不限")
    }
  })
}

function selectedCity1(cid) {
  city_id = cid
  $.get("/Hotel/all_area_by_city", { cid: cid }, function (resp) {
    if (resp.status.RetCode == 0) {
      var html = ' <li class="item__areaSelect__Active">全部区域</li>'

      $.each(resp.data, function (name, value) {
        html += ' <li data-areaid="' + this.id + '">' + this.area_name + "</li>"
      })
      $("#city_hotel_area").html("")
      $("#city_hotel_area").append(html)
      $(".query_hotel_area span").html("全部区域")
    }
  })
}

/*弹框*/
function query_hotel(page, cityid) {
  //index是首页跟酒店首页酒店3步查询，footer是底部3步查询!!!!cityid为当前页面城市id，非选择的城市id
  var city = "0",
    price
  if (page == "index") {
    if ($(".city_select .on").attr("_cityid")) {
      city = $(".city_select .on").attr("_cityid")
    } else {
      city = cityid
    }
    area = $(".area_select .on").data("areaid")
  } else {
    if ($(".city_select_0710 .on").attr("_cityid")) {
      city = $(".city_select_0710 .on").attr("_cityid")
    } else {
      city = cityid
    }
    area = $(".area_select_0710 .on").data("areaid")
  }
  sessionStorage.setItem("city", city)
  openSubmitInfo(1)
}
function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
  if ((arr = document.cookie.match(reg))) return unescape(arr[2])
  else return null
}
function queryPeriod() {
  $(".modal_box_prompt, .modal_box_prompt1").css({ visibility: "hidden" })
  $(".error").hide()

  var merchant_id = $("#J_appointment").attr("data-id")
  var mobile = $(".input_moble").val()
  var myreg = /^0?1[3|4|5|8|7][0-9]\d{8}$/
  if (!myreg.test(mobile)) {
    $(".error").show()
    return
  } else {
    $.post(
      "/p/wedding/index.php/home/APIMerchant/MakeAppointment",
      { phone_num: mobile, merchant_id: merchant_id, from_type: 18 },
      function (resp) {
        if (resp.status.RetCode == 0) {
          $(".opnebox_dq").removeClass("showbox")
          $(".error").hide()
          openSubmitInfo(2)
        } else if (resp.status.RetCode == 1001) {
          $(".error .error-msg").html(resp.status.msg)
          $(".error").show()
        } else {
          $(".error .error-msg").html(resp.status.msg)
          $(".error").show()
        }
      }
    )
  }
}
function getBtn() {
  $.get(
    "/p/wedding/index.php/home/APIMerchant/IsOpenAppointment",
    function (resp) {
      if (resp.status.RetCode == 0) {
        $(".error").hide()
        if (resp.data == 1) {
          $("#J_appointment").html(
            '<button class="btn btn-primary query-schedule-btn">查询档期</button>'
          )
          $(".query-schedule-btn").on("click", function () {
            $(".opnebox_dq").addClass("showbox")
          })
          $(".opnebox_dq .close").on("click", function () {
            $(".opnebox_dq").removeClass("showbox")
          })
        } else {
          $("#J_appointment").html("")
        }
      }
    }
  )
}
function sub_mit(num) {
  $(".modal_box_prompt, .modal_box_prompt1").css({ visibility: "hidden" })
  if (num == "one") {
    var mobile = $(".stepOne .modal_box_moble input").val()
    var myreg = /^0?1[3|4|5|8|7][0-9]\d{8}$/
    if (!myreg.test(mobile)) {
      $(".stepOne .modal_box_prompt").css({ visibility: "visible" })
      $(".stepOne .modal_box_prompt1").css({ visibility: "hidden" })
      return
    } else {
      var city = sessionStorage.getItem("city")
      $.post(
        "/Index/addLead",
        { phone: mobile, cid: city, type: 14 },
        function (resp) {
          if (resp.status.RetCode == 0) {
            $(".stepOne .modal_box_prompt").css({ visibility: "hidden" })
            $(".stepOne .modal_box_prompt1").css({ visibility: "hidden" })
            openSubmitInfo(2)
          } else {
            $(".stepOne .modal_box_prompt").css({ visibility: "hidden" })
            $(".stepOne .modal_box_prompt1").css({ visibility: "visible" })
          }
        }
      )
    }
  } else if (num == "five") {
    var mobile = $(".stepFive .modal_box_moble input").val()
    var myreg = /^0?1[3|4|5|8|7][0-9]\d{8}$/
    var city = getCookie("city_id")
    if (!myreg.test(mobile)) {
      $(".stepFive .modal_box_prompt").css({ visibility: "visible" })
      $(".stepFive .modal_box_prompt1").css({ visibility: "hidden" })
      return
    } else {
      var time = $(".Wdate").val()
      //查询档期代码
      $.post(
        "/p/wedding/index.php/home/APIHotelSchedule/add_schedule",
        { phone: mobile, schedule_date: time, cid: city },
        function (resp) {
          if (resp.status.RetCode == 0) {
            $(".stepFive .modal_box_prompt").css({ visibility: "hidden" })
            $(".stepFive .modal_box_prompt1").css({ visibility: "hidden" })
            $(".stepFive").removeClass("showModal")
            openSubmitInfo(2)
          } else if (resp.status.RetCode == 1001) {
            $(".stepFive .modal_box_prompt").css({ visibility: "hidden" })
            $(".stepFive .modal_box_prompt1").css({ visibility: "visible" })
          }
        }
      )
    }
  } else if (num == 1) {
    $(".error").hide()
    var mobile = $(".input_moble").val()
    var myreg = /^0?1[3|4|5|8|7][0-9]\d{8}$/
    if (!myreg.test(mobile)) {
      $(".error").show()
      return
    } else {
      $.post(
        "/Index/addLead",
        { phone: mobile, cid: city, type: 14 },
        function (resp) {
          if (resp.status.RetCode == 0) {
            $(".opnebox_dq").removeClass("showbox")
            $(".error").hide()
            openSubmitInfo(2)
          } else if (resp.status.RetCode == 1001) {
            $(".error .error-msg").html(resp.status.msg)
            $(".error").show()
          } else {
            $(".error .error-msg").html(resp.status.msg)
            $(".error").show()
          }
        }
      )
    }
  } else if (num == 2) {
    $(".error").hide()
    var mobile = $("#input_moble").val()
    var myreg = /^0?1[3|4|5|8|7][0-9]\d{8}$/
    if (!myreg.test(mobile)) {
      $(".error").show()
      return
    } else {
      $.post(
        "/Index/addLead",
        { phone: mobile, cid: city, type: 14 },
        function (resp) {
          if (resp.status.RetCode == 0) {
            $(".opnebox_dq1").removeClass("showbox")
            $(".error").hide()
            openSubmitInfo(2)
          } else if (resp.status.RetCode == 1001) {
            $(".error .error-msg").html(resp.status.msg)
            $(".error").show()
          } else {
            $(".error .error-msg").html(resp.status.msg)
            $(".error").show()
          }
        }
      )
    }
  }
}
function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
  if ((arr = document.cookie.match(reg))) return unescape(arr[2])
  else return null
}

function openSubmitInfo(num) {
  if (num == 1) {
    $(".stepOne").addClass("showModal").find(".modal_box").addClass("zoomIn")
  } else if (num == 2) {
    $(".modal_box_moble input").val("")
    $(".stepOne").removeClass("showModal")
    $(".stepTwo").addClass("showModal").find(".modal_box").addClass("zoomIn")
  } else if (num == 3) {
    $(".stepOne").removeClass("showModal")
    $(".stepThree").addClass("showModal").find(".modal_box").addClass("zoomIn")
  } else if (num == 4) {
    $(".stepFoue").addClass("showModal").find(".down_app").addClass("zoomIn")
  } else if (num == 5) {
    $(".stepFive").addClass("showModal").find(".down_app").addClass("zoomIn")
  }
}
function closeSubmitInfo(num) {
  $(".modal_box_moble input").val("")
  if (num == 1) {
    $(".stepOne").removeClass("showModal")
  } else if (num == 2) {
    $(".stepTwo").removeClass("showModal")
  } else if (num == 3) {
    $(".stepThree").removeClass("showModal")
  } else if (num == 4) {
    $(".stepFoue").removeClass("showModal")
  } else if (num == 5) {
    $(".stepFive").removeClass("showModal")
  }
}
function returnSubmitInfo() {
  $(".modal_box_moble input").val("")
  $(".modal_box_prompt").css({ visibility: "hidden" })
  $(".modal_box_prompt1").css({ visibility: "hidden" })
  $(".stepThree").removeClass("showModal")
  $(".stepOne").addClass("showModal").find(".modal_box").addClass("zoomIn")
}

//div_180710
// var _storage = sessionStorage.getItem('footer_mask')
// if (_storage) {
//   $('.div_180710').hide()
// } else {
//   $('.div_180710').show()
// }

// 结婚工具————结婚吉日相关
function weddingDaySearchHotel(date) {
  $("#weddingDayTitle").text(date)
  $("#weddingTools")
    .addClass("showModal")
    .find(".modal_wedding-tools")
    .addClass("zoomIn")
}
function weddingDayHotelClose() {
  $("#weddingTools").removeClass("showModal")
  $("#weddingToolsHide")
    .addClass("showModal")
    .find(".modal_box")
    .addClass("zoomIn")
}
function weddingDayHotelHide() {
  $("#weddingToolsHide").removeClass("showModal")
}
function weddingToolsReturn() {
  $(".modal_box_moble input").val("")
  $("#weddingToolsHide").removeClass("showModal")
  $("#weddingTools")
    .addClass("showModal")
    .find(".modal_wedding-tools")
    .addClass("zoomIn")
}
function postUserInfoFromWeddingDay() {
  $(".modal_box_prompt, .modal_box_prompt1").css({ visibility: "hidden" })
  var phoneNumber = $("#weddingTools input").val()
  if (!/^0?1[3|4|5|8|7][0-9]\d{8}$/.test(phoneNumber)) {
    $("#weddingTools .modal_box_prompt").css({ visibility: "visible" })
    $("#weddingTools .modal_box_prompt1").css({ visibility: "hidden" })
  } else {
    var city = getCookie("city_id")
    $.post(
      "/Index/addLead",
      { phone: phoneNumber, cid: city, type: 14 },
      function (resp) {
        if (resp.status.RetCode == 0) {
          $("#weddingTools .modal_box_prompt").css({ visibility: "hidden" })
          $("#weddingTools .modal_box_prompt1").css({ visibility: "hidden" })
          $("#weddingTools").removeClass("showModal")
          openSubmitInfo(2)
        } else {
          $("#weddingTools .modal_box_prompt").css({ visibility: "hidden" })
          $("#weddingTools .modal_box_prompt1").css({ visibility: "visible" })
        }
      }
    )
  }
}
