function flash(ur,w,h){
document.write('<object classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" id="obj1" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" border="0" width="'+w+'" height="'+h+'">');
document.write('<param name="movie" value="'+ur+'">');
document.write('<param name="quality" value="high"> ');
document.write('<param name="wmode" value="transparent"> ');
document.write('<param name="menu" value="false"> ');
document.write('<embed src="'+ur+'" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" name="obj1" width="'+w+'" height="'+h+'" quality="High" wmode="transparent">');
document.write('</embed>');
document.write('</object>');
}
// JavaScript Document(flash)