//右侧二维码
function closeDiv(){ewm.style.display='none';}
var rrstr=(screen.width-1260)/2;
document.writeln("<div id=\"ewm\" style=\"position:fixed; top:100px;right:30px;width:108px; height:143px; z-index:1;font-size:13px;\">");
document.writeln("  <table width=\"102\" border=\"0\" align=\"center\" cellspacing=\"0\" cellpadding=\"3\" style=\"background:#fff;\">");
document.writeln("    <tr>");
document.writeln("      <td align=\"center\" style=\"text-align:center;\">中安新闻客户端<\/td>");
document.writeln("  <\/tr>");
document.writeln("  <tr>");
document.writeln("      <td align=\"center\"><a href=\"http:\/\/ah.anhuinews.com/ziliaoku/202101/t20210118_5076917.html\"><img src=http://ah.anhuinews.com/material/images/new_ewm.jpg  width=\"101\" height=\"101\" border=\"0\"><\/a><\/td>");
document.writeln("  <\/tr>");
document.writeln("  <tr>");
document.writeln("      <td align=\"center\" style=\"text-align:center;\">&nbsp;&nbsp;&nbsp;&nbsp;<\/td>");
document.writeln("  <\/tr>");
document.writeln("  <tr>");
document.writeln("      <td align=\"center\"><a onclick=\"closeDiv()\" style=\"cursor:hand;\"><img src=http://ah.anhuinews.com/material/images/yjgb.gif><\/a><\/td>");
document.writeln("  <\/tr>");
document.writeln("<\/table>");
document.writeln("<\/div>");