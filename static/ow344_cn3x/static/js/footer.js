document.writeln("<div class=\'quanmeiti\'>");
document.writeln("<div class=\'w_1000 mg0 white zi_size14 center\'>关于我们　-　联系我们　-　商务合作　-　版权声明</div>");
document.writeln("</div>");
document.writeln("<div class=\'footer mg0\'>");
document.writeln("<ul>");
document.writeln("<li></li>");
document.writeln("<li>互联网新闻信息服务许可证：42120170004</li>");
document.writeln("<li><a href=\'http://www.cn3x.com.cn/abouts/cbstxk.html\' target=\'_blank\'>信息网络传播视听节目许可证：117330003 </a><span>|</span> 广播电视节目制作经营许可证：（鄂）字第00037号</li>");
document.writeln("<li>互联网出版许可证：新出网证（鄂）字008号 <span>|</span> <a target=\'_blank\' href=\'https://beian.miit.gov.cn\' target=\'_blank\'>鄂ICP备06002096号-1 </a><span>|</span> 鄂网备案证编号：420501 <span>|</span>");
document.writeln("<a target=\'_blank\' href=\'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42050202000002\' style=\'text-decoration:none;height:20px;line-height:20px;\'><img src=\'http://www.cn3x.com.cn/statics/images/2017/anquan.png\' align=\'absmiddle\' />鄂公网安备 42050202000002号</a>");
document.writeln("</li>");
document.writeln("<li>三峡宜昌网版权所有，未经书面授权禁止使用 Copyright @ 2006-2022 www.cn3x.com.cn All Rights Reserved.</li>");
document.writeln("<li>违法和不良信息举报电话：0717-6449287 举报邮箱：sxycwang@126.com 广告热线：0717-6445584</li>");
document.writeln("<li style=\' height:50px;\'>");
document.writeln("<a href=\'http://www.12377.cn/\' target=\'_blank\'><img border=\'0\' target=\'_blank\' original=\'//cdn.ycrmt.cn/images/2022/08/66dfdbaf458babf0849b0748ea2fd6db.png\' src=\'//cdn.ycrmt.cn/images/2022/08/66dfdbaf458babf0849b0748ea2fd6db.png\' style=\'display: inline;\'></a>");

document.writeln("<a href=\'http://jubao.py.cnhubei.com/\' title=\'湖北省互联网违法和不良信息举报平台\' target=\'_blank\'><img src=\'//cdn.ycrmt.cn/images/2021/08/94bc2100cfe296ceefbacb50e4328127.jpg\' border=\'0\' align=\'absmiddle\' /></a><a href=\'http://www.12377.cn/\' target=\'_blank\'><img src=\'https://cdn.ycrmt.cn/images/2022/05/a6907ae90d99bc67a62a0b18244c371a.jpg\' border=\'0\' align=\'absmiddle\' style=\'margin-left:5px;\'/></a>");

document.writeln("<a href=\'https://www.12377.cn/jbxzxq/zpljbxzxq.html?spm=zm1033-001.0.0.1.SOXBdI\' target=\'_blank\'><img border=\'0\' target=\'_blank\' src=\'//cdn.ycrmt.cn/images/2021/08/86e96c9328690bb2536a0b8b6304ef18.jpg\' style=\'display: inline;\'></a>");
document.writeln("<a href=\'https://www.12377.cn/jbxzxq/64d38691937611ebb858c9da04cf59d3_web.html?spm=zm1033-001.0.0.1.SOXBdI&smallHarmType=64d38691937611ebb858c9da04cf59d3\' target=\'_blank\'><img border=\'0\' target=\'_blank\' src=\'//cdn.ycrmt.cn/images/2021/08/0a84878f16597c6d44566d0579258405.jpg\' style=\'display: inline;\'></a>");
document.writeln("<a href=\'https://www.12377.cn/jbxzxq/bf83d0897fbb11eaadee3dafd7f65ee4_web.html?smallHarmType=bf83d0897fbb11eaadee3dafd7f65ee4/\' target=\'_blank\'><img border=\'0\' target=\'_blank\' src=\'//cdn.ycrmt.cn/images/2022/05/3db252acfa2da8a0ecfa08e37bb8fab1.jpg\' style=\'display: inline;\'></a>");


document.write(unescape("%3Cspan id='_ideConac' %3E%3C/span%3E%3Cscript src='https://dcs.conac.cn/js/18/272/0000/40586033/CA182720000405860330001.js' type='text/javascript'%3E%3C/script%3E"));
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
// document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F85602f627e75d4d15546c25337ed6605' type='text/javascript'%3E%3C/script%3E"));
document.writeln("        </li>");
document.writeln("    </ul>");
document.writeln("</div>");
document.writeln("");
let title = document.title.substr(0, document.title.indexOf(' - '));
let search = window.location.search.toLowerCase().substring(1);
let catid = ''
for (let item of search.split('&')) {
  let itemObj = item.split('=')
  if (itemObj['0'] == 'catid') {
    catid = itemObj['1']
  }
}
const s = document.createElement('script');
s.type = 'text/javascript';
s.src = '//web.ycrmt.cn/app/newShare?url=' + btoa(window.location.href) + '&title=' + title + '&catid=' + catid;
document.body.appendChild(s);