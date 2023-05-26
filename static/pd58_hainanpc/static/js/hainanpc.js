$(window).load(function() {
let fr1 = $("#fr1 .select_ul li").eq(0).text();
let fr2= $("#fr2 .select_ul li").eq(0).text();
let fr3= $("#fr3 .select_ul li").eq(0).text();
let fr4= $("#fr4 .select_ul li").eq(0).text();

$("#fr1 .select_text").text(fr1);
$("#fr2 .select_text").text(fr2);
$("#fr3 .select_text").text(fr3);
$("#fr4 .select_text").text(fr4);
});