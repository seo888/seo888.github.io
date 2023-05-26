//20210527 http+https 兼容
//20210818 删除*号，60秒改成120秒
//20220209 删除我的相册
$(function () {
    $.fn.initOne("bbusername");
    JPlaceHolder.init()
});
var JPlaceHolder = {
    _check: function () {
        return "placeholder" in document.createElement("input")
    }, init: function () {
        if (document.all) {
            $('input[type="text"]').each(function () {
                var b = this;
                if (this.attachEvent) {
                    this.attachEvent("onpropertychange", function (a) {
                        if (a.propertyName != "value") {
                            return
                        }
                        $(b).trigger("input")
                    })
                }
            })
        }
        if (!this._check()) {
            this.fix()
        }
    }, fix: function () {
        jQuery(":input[placeholder]").each(function (m, n) {
            var p = $(this), j = p.attr("placeholder");
            p.wrap($("<div></div>").css({
                position: "relative",
                zoom: "1",
                border: "none",
                background: "none",
                padding: "none",
                margin: "none"
            }));
            var k = p.position(), l = p.outerHeight(true), h = p.css("padding-left");
            var o = $("<span></span>").text(j).css({
                position: "absolute",
                left: k.left,
                top: k.top,
                height: l,
                lienHeight: l,
                paddingLeft: h,
                color: "#aaa"
            }).appendTo(p.parent());
            p.focusin(function (a) {
                o.hide()
            }).focusout(function (a) {
                if (!p.val()) {
                    o.show()
                }
            });
            o.click(function (a) {
                o.hide();
                p.focus()
            })
        })
    }
};
(function (Q) {
    var O;
    var x = Q("#captcha-box");
    var y = "https://my.fengniao.com";
    var E = 300;
    var A;
    var M;
    var S;
    var K;
    var N;
    var z = 120;
    var R = 120;
    var I = 0;
    var refreshSuccessFun='';
    var B = Q(".loginNewBox");
    var G = Q(".logonList");
    var P = window.location.href;
    var D = Q(".userName5").val();
    var C = Q(".password").val();
    var J = Q(".loginTanBox .phone").val();
    var F = Q(".loginTanBox .phoneCode").val();
    var codeCommon='';
    var keySecond;
    var keySecond1;
    var countryId='+86';//国家编码已选中
    var countryList='<ul><li class="value1 act" data-id="+86">中国大陆 +86</li><li class="value1" data-id="+852">中国香港 +852</li><li class="value1" data-id="+853">中国澳门 +853</li><li class="value1" data-id="+886">中国台湾 +886</li><li class="value1" data-id="+82">韩国 +82</li><li class="value1" data-id="+81">日本 +81</li><li class="value1" data-id="+1">美国 +1</li><li class="value1" data-id="+1">加拿大 +1</li><li class="value1" data-id="+44">英国 +44</li><li class="value1" data-id="+65">新加坡 +65</li><li class="value1" data-id="+60">马来西亚 +60</li><li class="value1" data-id="+66">泰国 +66</li><li class="value1" data-id="+84">越南 +84</li><li class="value1" data-id="+63">菲律宾 +63</li><li class="value1" data-id="+62">印度尼西亚 +62</li><li class="value1" data-id="+39">意大利 +39</li><li class="value1" data-id="+7">俄罗斯 +7</li><li class="value1" data-id="+64">新西兰 +64</li><li class="value1" data-id="+31">荷兰 +31</li><li class="value1" data-id="+46">瑞典 +46</li><li class="value1" data-id="+61">澳大利亚 +61</li><li class="value1" data-id="+380">乌克兰 +380</li><li class="value1" data-id="+33">法国 +33</li><li class="value1" data-id="+49">德国 +49</li><li class="value1" data-id="+93">阿富汗 +93</li><li class="value1" data-id="+355">阿尔巴尼亚 +355</li><li class="value1" data-id="+213">阿尔及利亚 +213</li><li class="value1" data-id="+1684">东萨摩亚(美) +1684</li><li class="value1" data-id="+376">安道尔 +376</li><li class="value1" data-id="+244">安哥拉 +244</li><li class="value1" data-id="+1264">安圭拉岛(英) +1264</li><li class="value1" data-id="+1268">安提瓜和巴布达 +1268</li><li class="value1" data-id="+54">阿根廷 +54</li><li class="value1" data-id="+374">亚美尼亚 +374</li><li class="value1" data-id="+297">阿鲁巴岛 +297</li><li class="value1" data-id="+43">奥地利 +43</li><li class="value1" data-id="+994">阿塞拜疆 +994</li><li class="value1" data-id="+973">巴林 +973</li><li class="value1" data-id="+880">孟加拉国 +880</li><li class="value1" data-id="+1246">巴巴多斯 +1246</li><li class="value1" data-id="+375">白俄罗斯 +375</li><li class="value1" data-id="+32">比利时 +32</li><li class="value1" data-id="+501">伯利兹 +501</li><li class="value1" data-id="+229">贝宁 +229</li><li class="value1" data-id="+1441">百慕大群岛(英) +1441</li><li class="value1" data-id="+975">不丹 +975</li><li class="value1" data-id="+591">玻利维亚 +591</li><li class="value1" data-id="+387">波斯尼亚和黑塞哥维那 +387</li><li class="value1" data-id="+267">博茨瓦纳 +267</li><li class="value1" data-id="+55">巴西 +55</li><li class="value1" data-id="+359">保加利亚 +359</li><li class="value1" data-id="+226">布基纳法索 +226</li><li class="value1" data-id="+257">布隆迪 +257</li><li class="value1" data-id="+237">喀麦隆 +237</li><li class="value1" data-id="+238">佛得角 +238</li><li class="value1" data-id="+1345">开曼群岛(英) +1345</li><li class="value1" data-id="+236">中非 +236</li><li class="value1" data-id="+235">乍得 +235</li><li class="value1" data-id="+56">智利 +56</li><li class="value1" data-id="+61">圣诞岛 +61</li><li class="value1" data-id="+61">科科斯岛 +61</li><li class="value1" data-id="+57">哥伦比亚 +57</li><li class="value1" data-id="+269">科摩罗 +269</li><li class="value1" data-id="+242">刚果 +242</li><li class="value1" data-id="+682">科克群岛(新) +682</li><li class="value1" data-id="+506">哥斯达黎加 +506</li><li class="value1" data-id="+385">克罗地亚 +385</li><li class="value1" data-id="+53">古巴 +53</li><li class="value1" data-id="+357">塞浦路斯 +357</li><li class="value1" data-id="+420">捷克 +420</li><li class="value1" data-id="+45">丹麦 +45</li><li class="value1" data-id="+253">吉布提 +253</li><li class="value1" data-id="+1767">多米尼克国 +1767</li><li class="value1" data-id="+1809">多米尼加共和国 +1809</li><li class="value1" data-id="+593">厄瓜多尔 +593</li><li class="value1" data-id="+20">埃及 +20</li><li class="value1" data-id="+503">萨尔瓦多 +503</li><li class="value1" data-id="+240">赤道几内亚 +240</li><li class="value1" data-id="+291">厄立特里亚 +291</li><li class="value1" data-id="+372">爱沙尼亚 +372</li><li class="value1" data-id="+251">埃塞俄比亚 +251</li><li class="value1" data-id="+500">福克兰群岛 +500</li><li class="value1" data-id="+298">法罗群岛(丹) +298</li><li class="value1" data-id="+679">斐济 +679</li><li class="value1" data-id="+358">芬兰 +358</li><li class="value1" data-id="+689">法属波里尼西亚 +689</li><li class="value1" data-id="+241">加蓬 +241</li><li class="value1" data-id="+220">冈比亚 +220</li><li class="value1" data-id="+995">格鲁吉亚 +995</li><li class="value1" data-id="+233">加纳 +233</li><li class="value1" data-id="+350">直布罗陀(英) +350</li><li class="value1" data-id="+30">希腊 +30</li><li class="value1" data-id="+299">格陵兰岛 +299</li><li class="value1" data-id="+1473">格林纳达 +1473</li><li class="value1" data-id="+590">瓜德罗普岛(法) +590</li><li class="value1" data-id="+1671">关岛(美) +1671</li><li class="value1" data-id="+502">危地马拉 +502</li><li class="value1" data-id="+224">几内亚 +224</li><li class="value1" data-id="+245">几内亚比绍 +245</li><li class="value1" data-id="+592">圭亚那 +592</li><li class="value1" data-id="+509">海地 +509</li><li class="value1" data-id="+504">洪都拉斯 +504</li><li class="value1" data-id="+36">匈牙利 +36</li><li class="value1" data-id="+354">冰岛 +354</li><li class="value1" data-id="+91">印度 +91</li><li class="value1" data-id="+98">伊郎 +98</li><li class="value1" data-id="+964">伊拉克 +964</li><li class="value1" data-id="+353">爱尔兰 +353</li><li class="value1" data-id="+972">以色列 +972</li><li class="value1" data-id="+225">科特迪瓦 +225</li><li class="value1" data-id="+1876">牙买加 +1876</li><li class="value1" data-id="+962">约旦 +962</li><li class="value1" data-id="+855">柬埔塞 +855</li><li class="value1" data-id="+7">哈萨克斯坦 +7</li><li class="value1" data-id="+254">肯尼亚 +254</li><li class="value1" data-id="+686">基里巴斯 +686</li><li class="value1" data-id="+965">科威特 +965</li><li class="value1" data-id="+996">吉尔吉斯斯坦 +996</li><li class="value1" data-id="+856">老挝 +856</li><li class="value1" data-id="+371">拉脱维亚 +371</li><li class="value1" data-id="+961">黎巴嫩 +961</li><li class="value1" data-id="+266">莱索托 +266</li><li class="value1" data-id="+231">利比里亚 +231</li><li class="value1" data-id="+218">利比亚 +218</li><li class="value1" data-id="+423">列支敦士登 +423</li><li class="value1" data-id="+370">立陶宛 +370</li><li class="value1" data-id="+352">卢森堡 +352</li><li class="value1" data-id="+389">马其顿 +389</li><li class="value1" data-id="+261">马达加斯加 +261</li><li class="value1" data-id="+265">马拉维 +265</li><li class="value1" data-id="+960">马尔代夫 +960</li><li class="value1" data-id="+223">马里 +223</li><li class="value1" data-id="+356">马耳他 +356</li><li class="value1" data-id="+692">马绍尔群岛 +692</li><li class="value1" data-id="+596">马提尼克(法) +596</li><li class="value1" data-id="+222">毛里塔尼亚 +222</li><li class="value1" data-id="+230">毛里求斯 +230</li><li class="value1" data-id="+262">马约特岛 +262</li><li class="value1" data-id="+52">墨西哥 +52</li><li class="value1" data-id="+691">密克罗尼西亚(美) +691</li><li class="value1" data-id="+377">摩纳哥 +377</li><li class="value1" data-id="+976">蒙古 +976</li><li class="value1" data-id="+1664">蒙特塞拉特岛(英) +1664</li><li class="value1" data-id="+212">摩洛哥 +212</li><li class="value1" data-id="+258">莫桑比克 +258</li><li class="value1" data-id="+95">缅甸 +95</li><li class="value1" data-id="+264">纳米比亚 +264</li><li class="value1" data-id="+674">瑙鲁 +674</li><li class="value1" data-id="+977">尼泊尔 +977</li><li class="value1" data-id="+599">荷属安的列斯群岛 +599</li><li class="value1" data-id="+687">新喀里多尼亚群岛(法) +687</li><li class="value1" data-id="+505">尼加拉瓜 +505</li><li class="value1" data-id="+227">尼日尔 +227</li><li class="value1" data-id="+234">尼日利亚 +234</li><li class="value1" data-id="+683">纽埃岛(新) +683</li><li class="value1" data-id="+672">诺福克岛(澳) +672</li><li class="value1" data-id="+850">朝鲜 +850</li><li class="value1" data-id="+1670">马里亚纳群岛 +1670</li><li class="value1" data-id="+47">挪威 +47</li><li class="value1" data-id="+968">阿曼 +968</li><li class="value1" data-id="+92">巴基斯坦 +92</li><li class="value1" data-id="+680">帕劳(美) +680</li><li class="value1" data-id="+507">巴拿马 +507</li><li class="value1" data-id="+675">巴布亚新几内亚 +675</li><li class="value1" data-id="+595">巴拉圭 +595</li><li class="value1" data-id="+51">秘鲁 +51</li><li class="value1" data-id="+48">波兰 +48</li><li class="value1" data-id="+351">葡萄牙 +351</li><li class="value1" data-id="+1">波多黎各(美) +1</li><li class="value1" data-id="+974">卡塔尔 +974</li><li class="value1" data-id="+373">摩尔多瓦 +373</li><li class="value1" data-id="+262">留尼汪岛 +262</li><li class="value1" data-id="+40">罗马尼亚 +40</li><li class="value1" data-id="+250">卢旺达 +250</li><li class="value1" data-id="+247">阿森松(英) +247</li><li class="value1" data-id="+290">圣赫勒拿 +290</li><li class="value1" data-id="+1869">圣克里斯托弗和尼维斯 +1869</li><li class="value1" data-id="+1758">圣卢西亚 +1758</li><li class="value1" data-id="+508">圣皮埃尔岛及密克隆岛 +508</li><li class="value1" data-id="+1784">圣文森特岛(英) +1784</li><li class="value1" data-id="+685">西萨摩亚 +685</li><li class="value1" data-id="+378">圣马力诺 +378</li><li class="value1" data-id="+239">圣多美和普林西比 +239</li><li class="value1" data-id="+966">沙特阿拉伯 +966</li><li class="value1" data-id="+221">塞内加尔 +221</li><li class="value1" data-id="+248">塞舌尔 +248</li><li class="value1" data-id="+232">塞拉利昂 +232</li><li class="value1" data-id="+421">斯洛伐克 +421</li><li class="value1" data-id="+386">斯洛文尼亚 +386</li><li class="value1" data-id="+677">所罗门群岛 +677</li><li class="value1" data-id="+252">索马里 +252</li><li class="value1" data-id="+27">南非 +27</li><li class="value1" data-id="+34">西班牙 +34</li><li class="value1" data-id="+94">斯里兰卡 +94</li><li class="value1" data-id="+249">苏丹 +249</li><li class="value1" data-id="+597">苏里南 +597</li><li class="value1" data-id="+268">斯威士兰 +268</li><li class="value1" data-id="+41">瑞士 +41</li><li class="value1" data-id="+963">叙利亚 +963</li><li class="value1" data-id="+992">塔吉克斯坦 +992</li><li class="value1" data-id="+1242">巴哈马国 +1242</li><li class="value1" data-id="+14397">梵蒂冈 +14397</li><li class="value1" data-id="+228">多哥 +228</li><li class="value1" data-id="+676">汤加 +676</li><li class="value1" data-id="+1868">特立尼达和多巴哥 +1868</li><li class="value1" data-id="+216">突尼斯 +216</li><li class="value1" data-id="+90">土耳其 +90</li><li class="value1" data-id="+993">土库曼斯坦 +993</li><li class="value1" data-id="+1649">特克斯和凯科斯群岛(英) +1649</li><li class="value1" data-id="+688">图瓦卢 +688</li><li class="value1" data-id="+256">乌干达 +256</li><li class="value1" data-id="+255">坦桑尼亚 +255</li><li class="value1" data-id="+598">乌拉圭 +598</li><li class="value1" data-id="+998">乌兹别克斯坦 +998</li><li class="value1" data-id="+678">瓦努阿图 +678</li><li class="value1" data-id="+58">委内瑞拉 +58</li><li class="value1" data-id="+1340">维尔京群岛(英) +1340</li><li class="value1" data-id="+967">也门 +967</li><li class="value1" data-id="+381">南斯拉夫 +381</li><li class="value1" data-id="+260">赞比亚 +260</li><li class="value1" data-id="+259">桑给巴尔 +259</li><li class="value1" data-id="+263">津巴布韦 +263</li></ul>';
    var L = '<div class="loginShareBox"><a href="javascript:;" target="_self" class="weiXin loginIcon toLoginErweima01">微信登录</a> <a href="https://my.fengniao.com/loginThirdParty.php?id=1&url=' + P + '" target="_self"  class="weiBo loginIcon">微博登录</a><a href="https://my.fengniao.com/loginThirdParty.php?id=3&url=' + P + '" target="_self" class="qqLogin loginIcon">qq登录</a> </div>';
    var H = '<span class="global-weclome-tip">您好，</span><ul id="globaSitePersonNav" class="global-sitenav J_globalSitenav"><li class="global-item"><span class="trigger user-name" id="user-name">' + O + '<i class="triangle-icon"></i></span><div class="dropdown-items" style="display: none;"><ul class="global-site-items"><li class="global-site-item"><a href="https://my.fengniao.com/">个人中心</a></li><li class="global-site-item"><a href="https://my.fengniao.com/thread.php">我的论坛</a></li><li class="global-site-item"><a href="http://huodong.fengniao.com/my">我的活动</a></li><li class="global-site-item"><a href="https://my.fengniao.com/course.php">我的课程</a></li><li class="global-site-item"><a href="https://my.fengniao.com/myOrder.php">我的严选</a></li><li class="global-site-item"><a href="http://2.fengniao.com/user/index">我的二手</a></li></ul></div></li><li class="global-item" id="xiaoxi_num"><span class="global-num" style="display:none" id="global-num"><i class="global-icon"></i></span><span class="trigger" id="xiaoxi_nums">提醒<i class="triangle-icon"></i></span><div class="dropdown-items" style="display: none;"><ul class="global-site-items"><li class="global-site-item"><a href="https://my.fengniao.com/messages.php" class="priv">我的私信<em id="priy"></em></a></li><li class="global-site-item"><a href="https://my.fengniao.com/messages.php?type=2" class="reply">论坛回复<em id="reply"></em></a></li><li class="global-site-item"><a href="https://my.fengniao.com/messages.php?type=3" class="station">全站通知<em id="station"></em></a></li><li class="global-site-item"><a href="https://my.fengniao.com/messages.php?type=4" class="pm">系统消息<em id="pm"></em></a></li><li class="global-site-item"><a href="https://my.fengniao.com/messages.php?type=5" class="integral">积分提醒<em id="integral"></em></a></li><li class="global-site-item"><a href="https://my.fengniao.com/messages.php?type=6" class="integral">金币记录</a></li></ul></div></li></ul><a href="javascript:;" id="logout" class="global-login-out" target="_self">退出</a>';
    var T = {
        TanBox: ".loginTanBox",
        Box: ".loginNewBox",
        List: ".logonList",
        hintWord: ".hintWord",
        picErWeiM: ".picErWeiM",
        loginBtnChange: ".loginBtnChange",
        changeTxtUl: '<ul class="loginBtnChange isPc"> <li class="pcIcon">切换至账号登录</li> <li class="erweimaIcon">切换至二维码登录</li> </ul>',
        loginErWeiMBox: '<div class="loginErWeiM logonList"> <b class="tit">微信扫码  安全登录</b> <span class="picErWeiM"> <img src="https://icon.fengniao.com/login/images/erweima001.png" width="222" height="222"> </span> <p>请打开微信  扫一扫登录</p> <a href="javascript:;" target="_self" class="refreshBtn"><i class="loginIcon">刷新</i>刷新二维码</a> <a href="javascript:;" target="_self" class="changeTxtBtn toRegister">注册新账号</a> </div>',
        loginNumBox: '<div class="loginNum logonList"> <h4 class="titLineBox"> <hr> <b class="txt">推荐使用<a class="toLoginErweima01" href="javascript:;" target="_self"><i class="loginIcon">0</i>微信扫码</a>  登录 , 安全快捷</b> </h4> <a href="javascript:;" target="_self" class="markTit toLoginPhone">短信快速登录</a> <ul class="labelBox"> <li class="clearfix"> <input type="text" class="userName userName2 userName5" name="userName" value="大陆手机号/用户名/邮箱"> <div class="hintWord">用户名长度为2-14位字符或1-7个汉字</div> </li> <li> <input type="password" class="password password2" name="password"  placeholder="" value=""> <div class="hintWord"></div> </li> <li class="txtBox"> <a  href="javascript:;" target="_self" class="forgetPassW">忘记密码？</a> <input type="checkbox" value="" id="isRemember"> <label for="isRemember">记住我</label> </li> <li class="submitBtnBox"> <input type="submit" class="loginSubmitBtn loginBtn01" value="登录"> </li> </ul> <h4 class="titLineBox"> <hr> <b class="txt">第三方登录</b> </h4> ' + L + ' <a href="javascript:;" target="_self" class="changeTxtBtn toRegister">注册新账号</a> </div>',
        loginPhoneBox: '<div class="loginPhone logonList"> <h4 class="titLineBox"> <hr> <b class="txt">推荐使用<a class="toLoginErweima01" href="javascript:;" target="_self"><i class="loginIcon">0</i>微信扫码</a>  登录 , 安全快捷</b> </h4> <a href="javascript:;" target="_self" class="markTit toLoginNum">账号密码登录</a> <ul class="labelBox"> <li class="clearfix"><div class="countryBox"><span class="isSelectBox">'+countryId+'</span><div class="selectBox0">'+countryList+'</div></div><input type="text" class="phone phone2 phoneDuan" name="phone" value="请输入手机号"> <div class="hintWord">用户名长度为2-14位字符或1-7个汉字</div> </li> <li class="phoneCodeLi"> <a href="javascript:;" target="_self" data-id="3" class="getPhoneCode">获取验证码</a> <input type="text" class="phoneCode" name="phoneCode" value="请输入短信验证码"> <div class="hintWord"></div> </li> <li class="txtBox"> 注意：如果您已注册过蜂鸟账号，请确认该手机号和账号做了绑定，否则系统将自动创建新账号 </li> <li class="submitBtnBox"> <input type="submit" class="loginSubmitPhoneBtn loginBtn01" value="登录"> </li> </ul> <h4 class="titLineBox"> <hr> <b class="txt">第三方登录</b> </h4> ' + L + ' <a href="javascript:;" target="_self" class="changeTxtBtn toRegister">注册新账号</a> <input name="onlycode" id="onlycode" type="hidden" value="" class="text"></div>',
        loginRegisterBox: '<div class="loginRegister logonList"> <h4 class="titLineBox"> <hr><b class="txt">快速注册</b> </h4> <ul class="labelBox"> <li class="clearfix"> <input type="text" class="userName userName5 userName1" name="userName" value="请输入用户名"> <div class="hintWord">用户名长度为2-14位字符或1-7个汉字</div> </li> <li> <input type="password" class="password password1" name="password" placeholder="" value=""> <div class="hintWord"></div> </li> <li class="clearfix"><div class="countryBox"><span class="isSelectBox">'+countryId+'</span><div class="selectBox0">'+countryList+'</div></div><input type="text" class="phone phone1 phoneDuan" name="phone" value="请输入手机号"> <div class="hintWord">用户名长度为2-14位字符或1-7个汉字</div> </li> <li class="phoneCodeLi"> <a href="javascript:;" target="_self" class="getPhoneCode" data-id="1">获取验证码</a> <input type="text" class="phoneCode" name="phoneCode" value="请输入短信验证码"> <div class="hintWord"></div> </li> <li class="txtBox isAgreeTxtBtn"> <input type="checkbox" value="" id="isAgree"> <label for="isAgree">我已阅读并同意 <a href="http://www.fengniao.com/law.html" target="_blank">《蜂鸟用户注册协议》</a> </label><div class="hintWord"></div> </li> <li class="submitBtnBox"> <input type="submit" class="registerSubmitBtn registerSubmitBtnNo loginBtn01" value="注册"> </li> </ul> <span class="isHaveToLogin">已有账号？返回 <a href="javascript:;" target="_self">登录</a></span> </div>',
        loginForget: '<div class="loginForget logonList"><h4 class=titLineBox><hr><b class=txt>找回密码</b></h4><ul class=labelBox id=forgetFirst><li><input type=text class=text-long id=name value="请输入已绑定的大陆手机号或邮箱"><div class=hintWord>请输入已绑定的大陆手机号或邮箱</div><li class=phoneCodeLi><img src=' + y + '/ajax/code.php?sdklfdlsf id=refreshCode><input type=text class=duanCode id=code value="请输入右侧验证码"><a href="javascript:;" target="_self" id=changeCode>换一张</a><div class=hintWord></div><li class=submitBtnBox><input type=submit class=loginBtn01 id=forgetFirstBtn value="下一步"><li class=rightTxt><a href="javascript:;" target="_self" id="noGetPhoneEmail">手机或邮箱不可用了？</a></ul><ul class=labelBox id=forgetSecond><li><span class=numberUser>18810827876</span><a href="javascript:;" target=_self class=reWriteNumber>修改</a><li class="phoneCodeLi"><a href="javascript:;" target=_self class="getCode getForgetCode">获取验证码</a><input type=text class=duanCode id=secondCode value="请输入验证码"><div class=hintWord>请输入已绑定的大陆手机号或邮箱</div><li class=submitBtnBox><input type=submit class=loginBtn01 id=forgetSecondBtn value="下一步"><li class=rightTxt><a  href="javascript:;" target="_self"  id="noGetPhoneEmail">手机或邮箱不可用了？</a></ul><ul class=labelBox id=forgetThird><li><input type=password class=text-long id=password placeholder="" value=""><div class=hintWord>请您输入新密码</div><li><input type=password class=text-long id=checkpassword placeholder="" value=""><div class=hintWord>请确认新密码</div><li class=submitBtnBox><input type=submit class=loginBtn01 id=forgetThirdBtn value="重置密码"></ul><span style="cursor: pointer;" class="changeTxtBtn toLogin02">已有账号？返回 <a  href="javascript:;" target="_self" style="color: #ff4b4b;">登录</a></span></div>',
        loginForgetSuccess: '<div class="loginForgetSuccess logonList"><div class=tanTxtIn><span class=loginIcon>0</span><div class=txt01><b>新密码设置成功！</b><span class=red>登录成功</span><span><i class=numSecond>5</i>s后自动登录</span></div></div></div>',
        loginForgetCannot: '<div class="loginForgetCannot logonList"><div class=tanTxtIn><div class="txt01"><span>1.请联系客服找回密码，或重新注册蜂鸟账号。邮箱 <span>bbs@fengniao.com</span></span><span style="margin-top:10px;display:block">2.蜂鸟网 <a href="https://my.fengniao.com/static/feedback.php?type=1" target="_blank" style="color: #ff4b4b;">账号申诉</a>，24小时内，我们将会把申诉结果发送到您填写的手机。</span></div></div><span style="cursor: pointer;" class="changeTxtBtn toLogin02">已有账号？返回 <a  href="javascript:;" target="_self" style="color: #ff4b4b;">登录</a></span></div>'
    };
    Q.fn.extend({
        initOne: function (a) {
            Q.fn.removejscssfile("https://icon.fengniao.com/public/js/public_header.js?2", "js");
            jQuery.getScript("https://static.geetest.com/static/tools/gt.js");
            jQuery.getScript("https://my.fengniao.com/icon/js/md5.js");
            jQuery.getScript("https://my.fengniao.com/icon/js/jquery.cookie.js", function () {
                Q.fn.cleatTime();
                var c = Q.fn.topReadCookie(a);
                if (c) {
                    Q.fn.successLogin(c);
                    Q("#globaSitePersonNav li").hover(function () {
                        Q(this).find(".dropdown-items").show()
                    }, function () {
                        Q(this).find(".dropdown-items").hide()
                    })
                } else {
                    Q("#xiding").html('<ul class="login-box"><li><a href="javascript:;" class="login-link" target="_self"><i class="icon"></i>登录</a></li><li><a href="javascript:;" target="_self" class="registerBtn">免费注册</a></li></ul>');
                    Q(".login-link").showMode("login");
                    Q(".registerBtn").showMode("reg")
                }
                Q(document).on("click", ".isGuoQi", function () {
                    Q(this).attr("src", "https://icon.fengniao.com/login/images/erweima001.png");
                    Q.fn.getErWeiMa()
                });
                Q(document).on("click", ".refreshBtn", function () {
                    Q.fn.getErWeiMa()
                });
                Q(document).on("click", ".isErrorEr", function () {
                    Q.fn.getErWeiMa()
                });
                Q('body').append('<input name="onlycode" id="onlycode" type="hidden" value="" class="text">');
                Q("#weChatBox li").hover(function () {
                    Q(this).find(".QR-code").show()
                }, function () {
                    Q(this).find(".QR-code").hide()
                });
                Q("#globaSiteNav li").hover(function () {
                    Q(this).addClass("hover");
                    Q(this).find(".dropdown-items").show()
                }, function () {
                    Q(this).removeClass("hover");
                    Q(this).find(".dropdown-items").hide()
                });
                b();
                Q(window).scroll(function () {
                    b()
                });
                function b() {
                    if (Q(document).scrollTop() > 0) {
                        Q(".global-topnav").css("position", "fixed")
                    } else {
                        Q(".global-topnav").css("position", "relative")
                    }
                }
            })

        }, showMode: function (c) {
            var b = Q.extend({}, T);
            var a;
            Q.fn.cleatTime();
            this.bind("click", function () {
                if (I == 0) {
                    Q("<link>").attr({
                        rel: "stylesheet",
                        type: "text/css",
                        // href: "css/loginCss.v1.3.css"
                        href: "https://icon.fengniao.com/login/css/loginCss.v1.3.css"
                    }).appendTo("head");
                    Q('body').append('<div class="loginTanBox"><div class="loginBlack"></div><div class="loginNewBox"><div class="loginHeader"> <span class="close loginIcon">0</span> <h3 class="logo1 loginIcon">0</h3> </div></div></div>');
                    I = 1
                }
                switch (c) {
                    case"login":
                        a = 1;
                        Q(b.Box).append(b.loginNumBox);
                        Q(b.Box).append(b.changeTxtUl);
                        //Q.fn.getErWeiMa();
                        break;
                    case"reg":
                        Q(b.Box).append(b.loginRegisterBox);
                        Q(b.Box).append(b.changeTxtUl);
                        Q(".loginBtnChange").hide();
                        a = 2;
                        break
                }
                Q(document).on("click", ".forgetPassW", function () {
                    Q(b.List).remove();
                    Q(b.Box).append(b.loginForget)
                });
                //20200407 new add
                Q(document).on("mouseover", ".countryBox", function () {
                    Q('.countryBox .selectBox0').show();
                    Q(document).on("click", ".countryBox .selectBox0 .value1", function () {
                        countryId=Q(this).attr('data-id');
                        $(this).addClass('act').siblings('li').removeClass('act')
                        Q('.countryBox .isSelectBox').html(countryId);
                        Q('.countryBox .selectBox0').hide();
                    });
                });
                Q(document).on("mouseout", ".countryBox", function () {
                    Q('.countryBox .selectBox0').hide();
                });
                //20200407 new add ---end
                Q.fn.focusBlur(".userName2", "大陆手机号/用户名/邮箱");
                Q.fn.focusBlur(".userName1", "请输入用户名");
                Q.fn.focusBlur(".phone1", "请输入手机号");
                Q.fn.focusBlur(".phone2", "请输入手机号");
                Q.fn.focusBlur(".phoneCode", "请输入短信验证码");
                Q.fn.focusBlur("#name", "请输入已绑定的大陆手机号或邮箱");
                Q.fn.focusBlur("#code", "请输入右侧验证码");
                Q.fn.focusBlur("#secondCode", "请输入验证码");
                Q.fn.focusBlurPass(".password1", "password01.png");
                Q.fn.focusBlurPass(".password2", "password01.png");
                Q.fn.focusBlurPass("#password", "password02.png");
                Q.fn.focusBlurPass("#checkpassword", "password03.png");
                Q(document).on("click", ".loginNewBox .loginHeader .close", function () {
                    Q.fn.closeBox()
                });
                Q(document).on("click", ".loginSubmitBtn", function () {
                    Q.fn.toLogin()
                });
                $("body").keydown(function() {
                    if (event.keyCode == "13") {
                        Q.fn.toLogin()
                    }
                });
                Q.fn.changeLoginType(".toLogin02", b.loginNumBox, 4);
                Q(document).on("click", ".loginSubmitPhoneBtn", function () {
                    Q.fn.toMessageLogin()
                });
                Q(document).on("click", ".loginBtnChange", function () {
                    Q.fn.changeBtnType()
                });
                Q(document).on("click", ".registerSubmitBtn", function () {
                    Q.fn.registerLogin()
                });
                Q(document).on("click", ".reWriteNumber", function () {
                    Q.fn.forgetPassBackOne()
                });
                Q(document).on("click", "#isAgree", function () {
                    var e = Q(this).parents("li");
                    if (Q(this).hasClass("isAgreeTxtBtnYes")) {
                        Q(this).removeAttr("checked");
                        Q(this).removeClass("isAgreeTxtBtnYes");
                        e.addClass("warnTxt");
                        Q(".loginNewBox .loginRegister").find(".registerSubmitBtn").addClass("registerSubmitBtnNo")
                    } else {
                        Q(this).attr("checked", "checked");
                        Q(this).addClass("isAgreeTxtBtnYes");
                        e.removeClass("warnTxt");
                        e.find(T.hintWord).hide();
                        Q(".loginNewBox .loginRegister").find(".registerSubmitBtn").removeClass("registerSubmitBtnNo")
                    }
                });
                Q.fn.changeLoginType(".toRegister", b.loginRegisterBox, 2);
                Q.fn.changeLoginType(".toLoginPhone", b.loginPhoneBox,5);
                Q.fn.changeLoginType(".toLoginNum", b.loginNumBox);
                Q.fn.changeLoginType(".isHaveToLogin", b.loginNumBox,4);
                Q.fn.changeLoginType(".toLoginErweima01", b.loginErWeiMBox, 1);
                Q.fn.changeLoginType(".forgetPassW", b.loginForget, 3);
                Q(document).on("input propertychange change", ".phone1", Q.fn.phoneTime);
                Q(document).on("input propertychange change", ".phone2", Q.fn.phoneTime);

                var d = function (g) {
                    var e;
                    var h = Q.fn.hintWord;
                    g.onReady(function () {

                    }).onSuccess(function () {
                        var i = g.getValidate();
                        if (!i) {
                            return alert('请完成验证');
                        }
                        Q.ajax({
                            url: y + "/ajax/SecondVerify.php?keySecond="+keySecond,
                            type: "get",
                            dataType: "jsonp",
                            data: {
                                type: "login",
                                geetest_challenge: i.geetest_challenge,
                                geetest_validate: i.geetest_validate,
                                geetest_seccode: i.geetest_seccode
                            },
                            success: function (k) {
                                if (k.status === "success") {
                                    keySecond1= k.keySecond
                                    Q("#onlycode").val(k.onlycode);
                                    var j = Q(".getPhoneCode");
                                    j.addClass("sendBtnTime");
                                    j.addClass("sendBtnAfterIs");
                                    j.removeClass("sendBtnAfter");
                                    z = 120;
                                    j.html(z + "s");
                                    var l = setInterval(function () {
                                        if (z == 0) {
                                            var m = Q(".loginTanBox .phone").val();
                                            if (m == "") {
                                                j.html("获取验证码")
                                            } else {
                                                if (!Q.fn.isPhoneNo(m)) {
                                                    j.addClass("sendBtnNo");
                                                    j.removeClass("sendBtnAfter");
                                                    j.removeClass("sendBtnAfterIs")
                                                } else {
                                                    j.removeClass("sendBtnNo");
                                                    j.addClass("sendBtnAfter")
                                                }
                                            }
                                            j.removeClass("sendBtnTime");
                                            j.html("获取验证码");
                                            clearInterval(l);
                                            z = R
                                        } else {
                                            z--;
                                            j.html(z + "s")
                                        }
                                    }, 1000);
                                    Q.fn.getSendCode(e,l)
                                }else {
                                    alert('请刷新页面重试');
                                    return false
                                }
                            }
                        })
                    });
                    $(document).on('click', '.getPhoneCode', function () {

                        var j = Q.extend({}, T);
                        var i = Q(".getPhoneCode");
                        var k = Q(".loginTanBox .phone").val();
                        var l = j.hintWord;
                        e = parseInt(i.attr("data-id"));
                        if (k) {
                            if (i.hasClass("sendBtnAfter")) {
                                g.verify();
                                g.show()
                            } else {
                                if (i.hasClass("sendBtnNo")) {
                                    Q(".loginTanBox .phone").siblings(l).show().html("请输入正确手机号码").show()
                                } else {
                                    if (i.hasClass("sendBtnTime")) {
                                        alert("稍等片刻哦~")
                                    } else {
                                        Q(".loginTanBox .phone").siblings(l).show().html("请输入手机号码").show()
                                    }
                                }
                            }
                        } else {
                            Q(".loginTanBox .phone").siblings(l).show().html("请输入手机号码").show()
                        }
                    });

                    // var e;
                    // var h = Q.fn.hintWord;
                    // g.appendTo(x);
                    // g.onSuccess(function () {
                    //     var i = g.getValidate();
                    //     Q.ajax({
                    //         url: y + "/ajax/SecondVerify.php?keySecond="+keySecond,
                    //         type: "get",
                    //         dataType: "jsonp",
                    //         data: {
                    //             type: "login",
                    //             geetest_challenge: i.geetest_challenge,
                    //             geetest_validate: i.geetest_validate,
                    //             geetest_seccode: i.geetest_seccode
                    //         },
                    //         success: function (k) {
                    //             if (k.status === "success") {
                    //                 keySecond1= k.keySecond
                    //                 Q("#onlycode").val(k.onlycode);
                    //                 var j = Q(".getPhoneCode");
                    //                 j.addClass("sendBtnTime");
                    //                 j.addClass("sendBtnAfterIs");
                    //                 j.removeClass("sendBtnAfter");
                    //                 z = 60;
                    //                 j.html(z + "s");
                    //                 var l = setInterval(function () {
                    //                     if (z == 0) {
                    //                         var m = Q(".loginTanBox .phone").val();
                    //                         if (m == "") {
                    //                             j.html("获取验证码")
                    //                         } else {
                    //                             if (!Q.fn.isPhoneNo(m)) {
                    //                                 j.addClass("sendBtnNo");
                    //                                 j.removeClass("sendBtnAfter");
                    //                                 j.removeClass("sendBtnAfterIs")
                    //                             } else {
                    //                                 j.removeClass("sendBtnNo");
                    //                                 j.addClass("sendBtnAfter")
                    //                             }
                    //                         }
                    //                         j.removeClass("sendBtnTime");
                    //                         j.html("获取验证码");
                    //                         clearInterval(l);
                    //                         z = R
                    //                     } else {
                    //                         z--;
                    //                         j.html(z + "s")
                    //                     }
                    //                 }, 1000);
                    //                 Q.fn.getSendCode(e)
                    //             } else {
                    //                 return false
                    //             }
                    //         }
                    //     })
                    // });
                    // Q(document).on("click", ".getPhoneCode", f);
                    // function f() {
                    //     var j = Q.extend({}, T);
                    //     var i = Q(".getPhoneCode");
                    //     var k = Q(".loginTanBox .phone").val();
                    //     var l = j.hintWord;
                    //     e = parseInt(i.attr("data-id"));
                    //     if (k) {
                    //         if (i.hasClass("sendBtnAfter")) {
                    //             g.show()
                    //         } else {
                    //             if (i.hasClass("sendBtnNo")) {
                    //                 Q(".loginTanBox .phone").siblings(l).show().html("请输入正确手机号码").show()
                    //             } else {
                    //                 if (i.hasClass("sendBtnTime")) {
                    //                     alert("稍等片刻哦~")
                    //                 } else {
                    //                     Q(".loginTanBox .phone").siblings(l).show().html("请输入手机号码").show()
                    //                 }
                    //             }
                    //         }
                    //     } else {
                    //         Q(".loginTanBox .phone").siblings(l).show().html("请输入手机号码").show()
                    //     }
                    // }
                };
                Q.ajax({
                    url: y + "/ajax/StartCaptchaServlet.php?type=login&t=" + (new Date()).getTime(),
                    type: "get",
                    dataType: "jsonp",
                    jsonpCallback: "dataBox",
                    success: function (e) {
                        keySecond= e.keySecond
                        initGeetest({
                            gt: e.gt,
                            challenge: e.challenge,
                            offline: !e.success, // 表示用户后台检测极验服务器是否宕机
                            new_captcha: e.new_captcha, // 用于宕机时表示是新验证码的宕机
                            timeout: '5000',
                            product: "bind"
                        }, d)
                    }
                });
                Q(document).on("click", ".hintWord", Q.fn.hintWord)
            })
        }, getErWeiMa: function (d) {
            var b = Q.extend({}, T);
            var a = "";
            var c = Q(b.picErWeiM);
            c.find("img").removeClass("isGuoQi");
            Q.ajax({
                url: y + "/ajax/wechatLoginQrcode.php",
                type: "post",
                data: {type: 1},
                dataType: "jsonp",
                success: function (f) {
                    if (f.code == 1) {
                        a = f.data.ticket;
                        c.find("img").attr("src", f.data.qrcode_url);
                        var e = 0;
                        A = setInterval(function () {
                            e++;
                            if (e == E) {
                                Q.fn.cleatTime();
                                c.find("img").attr("src", "https://icon.fengniao.com/login/images/erweima002.jpg");
                                c.find("img").addClass("isGuoQi");
                                Q.fn.cleatTime()
                            }
                        }, 1000);
                        M = setInterval(function () {
                            Q.ajax({
                                url: y + "/ajax/wechatLoginQrcode.php",
                                type: "post",
                                data: {type: 2, ticket: a},
                                dataType: "jsonp",
                                success: function (g) {
                                    if (g.code == 1) {
                                        Q.fn.successLogin(g.bbusername)
                                    } else {
                                    }
                                },
                                cache: false
                            })
                        }, 2000)
                    } else {
                        if (f.code == -1) {
                            Q.fn.cleatTime();
                            c.find("img").attr("src", "https://icon.fengniao.com/login/images/erweima003.jpg");
                            c.find("img").addClass("isErrorEr")
                        }
                    }
                },
                cache: false
            });
            return false
        }, toLogin: function () {
            Q.fn.checkInputDefaultVal();
            var b = Q(".userName2");
            var c = Q(".password");
            var a = Q.fn.hintWord;
            if (D) {
                if (C) {
                    var _guess = 0;
                    if(!isNaN(C)){
                        _guess = 1;
                    }
                    Q.ajax({
                        url: y + "/ajax/ajaxLogin.php",
                        data: "from=login&name=" + D + "&password=" + hex_md5(C) + "&guess=" + _guess,
                        type: "POST",
                        dataType: "jsonp",
                        jsonpCallback: "dataBox",
                        success: function (d) {
                            if (d.code == 1) {
                                Q.fn.successLogin(D)
                            } else {
                                if (d.code == -1) {
                                    b.siblings(a).show().html(d.msg)
                                } else {
                                    if (d.code == -2) {
                                        c.siblings(a).show().html(d.msg)
                                    } else {
                                        if (d.code == -3) {
                                            b.siblings(a).show().html(d.msg)
                                        } else {
                                            if (d.code == -6) {
                                                b.siblings(a).show().html(d.msg)
                                            } else {
                                                if (d.code == -7) {
                                                    c.siblings(a).show().html("您输入的密码有误");
                                                    c.val("")
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        cache: false
                    })
                } else {
                    c.siblings(a).show().text("请您输入密码")
                }
            } else {
                b.siblings(a).show().text("请您输入手机/用户名/邮箱")
            }
        }, toMessageLogin: function () {
            var b = Q.extend({}, T);
            J = Q(".loginTanBox .phone").val();
            if(countryId != '+86'){
                J = countryId + J;
            }
            F = Q(".loginTanBox .phoneCode").val();
            var a = b.hintWord;
            if (J) {
                if (F) {
                    if (Q.fn.isPhoneNo(J)) {
                        if (/^\d{6}$/m.test(F)) {
                            Q.ajax({
                                url: y + "/ajax/ajaxRegister.php",
                                data: "from=phoneLogin&phone=" + encodeURIComponent(J) + "&code=" + F,
                                type: "POST",
                                dataType: "jsonp",
                                success: function (c) {
                                    if (c.code == 1 || c.code == 2) {
                                        Q.fn.successLogin(J)
                                    } else {
                                        if (c.code == -1 || c.code == -4) {
                                            Q(".loginTanBox .phoneCode").siblings(a).show().html(c.msg)
                                        } else {
                                            if (c.code == -2) {
                                                Q(".loginTanBox .phoneCode").siblings(a).show().html("动态密码不可为空")
                                            } else {
                                                if (c.code == -13 || c.code == -14) {
                                                    Q(".loginTanBox .phoneCode").siblings(a).show().html("请输入正确的验证码");
                                                    Q(".loginTanBox .phoneCode").val("")
                                                } else {
                                                    if (c.code == -7 || c.code == -3 || c.code == -10) {
                                                        Q(".loginTanBox .phone").siblings(a).show().html(c.msg)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                cache: false
                            })
                        } else {
                            Q(".loginTanBox .phoneCode").siblings(a).show().html("请输入正确的验证码");
                            Q(".loginTanBox .phoneCode").val("")
                        }
                    } else {
                        Q(".loginTanBox .phone").siblings(a).show().html("请输入正确的手机号码")
                    }
                } else {
                    Q(".loginTanBox .phoneCode").siblings(a).show().html("请输入正确的验证码")
                }
            } else {
                Q(".loginTanBox .phone").siblings(a).show().html("请输入手机号")
            }
        }, registerLogin: function () {
            Q.fn.cleatTime();
            var c = Q.extend({}, T);
            var d = Q(".isAgreeTxtBtn");
            var b = Q(".registerSubmitBtn");
            if (b.hasClass("registerSubmitBtnNo")) {
                d.addClass("warnTxt");
                d.find(c.hintWord).show().html("请先查看并同意蜂鸟注册协议")
            } else {
                var a = c.hintWord;
                Q.fn.checkInputDefaultVal();
                D = Q.trim(D);
                if (D) {
                    if (C) {
                        if (C.length >= 6 && C.length <= 16) {
                            if (/^[0-9a-zA-Z!@#$%^&*()_+|?\/-=]{6,16}$/m.test(C)) {
                                if (!/^[0-9]{6,16}$/m.test(C)) {
                                    if (J) {
                                        if(countryId != '+86'){
                                            J = countryId + J;
                                        }
                                        if (F) {
                                            Q.ajax({
                                                url: y + "/ajax/ajaxRegister.php",
                                                data: "from=registerPhone&username=" + D + "&password=" + hex_md5(C) + "&phone=" + encodeURIComponent(J) + "&code=" + F,
                                                type: "POST",
                                                dataType: "jsonp",
                                                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                                                success: function (e) {
                                                    if (e.code == 1) {
                                                        Q.fn.successLogin(encodeURI(D))
                                                    } else {
                                                        if (e.code == -1) {
                                                            Q(".userName1").siblings(a).show().html(
                                                                e.msg)
                                                        } else {
                                                            if (e.code == -2) {
                                                                Q(".password").siblings(a).show().html(e.msg)
                                                            } else {
                                                                if (e.code == -3) {
                                                                    Q(".loginTanBox .phone").siblings(a).show().html(e.msg)
                                                                } else {
                                                                    if (e.code == -4) {
                                                                        Q(".loginTanBox .phoneCode").siblings(a).show().html(e.msg)
                                                                    } else {
                                                                        if (e.code == -5) {
                                                                            Q(".userName1").siblings(a).show().html(e.msg)
                                                                        } else {
                                                                            if (e.code == -6) {
                                                                                Q(".userName1").siblings(a).show().html(e.msg)
                                                                            } else {
                                                                                if (e.code == -7) {
                                                                                    Q(".userName1").siblings(a).show().html(e.msg)
                                                                                } else {
                                                                                    if (e.code == -8) {
                                                                                        Q(".userName1").siblings(a).show().html(e.msg)
                                                                                    } else {
                                                                                        if (e.code == -9) {
                                                                                            Q(".userName1").siblings(a).show().html(e.msg)
                                                                                        } else {
                                                                                            if (e.code == -10) {
                                                                                                Q(".userName1").siblings(a).show().html(e.msg)
                                                                                            } else {
                                                                                                if (e.code == -11) {
                                                                                                    Q(".loginTanBox .phone").siblings(a).show().html(e.msg)
                                                                                                } else {
                                                                                                    if (e.code == -12) {
                                                                                                        Q(".loginTanBox .phone").siblings(a).show().html(e.msg)
                                                                                                    } else {
                                                                                                        if (e.code == -13) {
                                                                                                            Q(".loginTanBox .phoneCode").siblings(a).show().html(e.msg)
                                                                                                        } else {
                                                                                                            if (e.code == -14) {
                                                                                                                Q(".loginTanBox .phoneCode").siblings(a).show().html(e.msg)
                                                                                                            } else {
                                                                                                                if (e.code == -16) {
                                                                                                                    Q(".loginTanBox .phone").siblings(a).show().html(e.msg)
                                                                                                                } else {
                                                                                                                    if (e.code == -15) {
                                                                                                                        Q(".loginTanBox .phone").siblings(a).show().html(e.msg)
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                },
                                                cache: false
                                            })
                                        } else {
                                            Q(".loginTanBox .phoneCode").siblings(a).show().html("请输入验证码")
                                        }
                                    } else {
                                        Q(".loginTanBox .phone").siblings(a).show().html("请输入手机号")
                                    }
                                } else {
                                    Q(".password").siblings(a).show().html("密码不能为纯数字")
                                }
                            } else {
                                Q(".password").siblings(a).show().html("密码不能包含特殊字符")
                            }
                        } else {
                            Q(".password").siblings(a).show().html("密码长度为6-16位字符")
                        }
                    } else {
                        Q(".password").siblings(a).show().html("请输入密码")
                    }
                } else {
                    Q(".userName1").siblings(a).show().html("请输入用户名")
                }
            }
        }, checkInputDefaultVal: function () {
            D = Q(".userName5").val();
            C = Q(".password").val();
            J = Q(".loginTanBox .phone").val();
            F = Q(".loginTanBox .phoneCode").val();
            if (D == "大陆手机号/用户名/邮箱") {
                D = ""
            } else {
                if (D == "请输入用户名") {
                    D = ""
                } else {
                    D = encodeURI(Q(".userName5").val())
                }
            }
            if (C == "请输入密码") {
                C = ""
            }
            if (J == "请输入手机号") {
                J = ""
            }
            if (F == "请输入短信验证码") {
                F = ""
            }
        }, forgetPass: function () {
            var b = Q.extend({}, T);
            N = Q("#name").val();
            var a = Q("#code").val();
            if (N == "请输入已绑定的大陆手机号或邮箱") {
                N = ""
            }
            if (a == "请输入右侧验证码") {
                a = ""
            }
            if (N) {
                if (a) {
                    Q.ajax({
                        url: y + "/ajax/ajaxRegister.php",
                        data: "from=resetOne&name=" + N + "&code=" + a,
                        dataType: "jsonp",
                        type: "POST",
                        success: function (c) {
                            if (c.code == 1) {
                                $name = N;
                                $type = c.content.type;
                                if ($type == 1) {
                                    Q(".getForgetCode").text("获取短信验证码")
                                } else {
                                    Q(".getForgetCode").text("获取邮件验证码")
                                }
                                codeCommon = a;
                                Q(".numberUser").text(N);
                                Q("#forgetFirst").hide();
                                Q("#forgetSecond").show()
                            } else {
                                if (c.code == -1) {
                                    Q("#code").parents("li").find(b.hintWord).show().html(c.msg);
                                    Q("#code").val("");
                                    Q.fn.refreshCode()
                                } else {
                                    Q("#name").parents("li").find(b.hintWord).show().html(c.msg);
                                    Q.fn.refreshCode()
                                }
                            }
                        },
                        cache: false
                    })
                } else {
                    Q("#code").parents("li").find(b.hintWord).show().html("请填写右侧验证码");
                    Q("#code").val("")
                }
            } else {
                Q("#name").parents("li").find(b.hintWord).show().html("请填写您的手机号或者邮箱")
            }
        }, forgetPassTwo: function () {
            var b = Q.extend({}, T);
            var a = Q("#secondCode").val();
            if (a) {
                Q.ajax({
                    url: y + "/ajax/ajaxRegister.php",
                    data: "from=resetTwo&type=" + $type + "&contact=" + $name + "&code=" + a,
                    type: "POST",
                    dataType: "jsonp",
                    success: function (c) {
                        console.log(c);
                        if (c.code == 1) {
                            Q("#forgetSecond").hide();
                            Q("#forgetThird").show()
                        } else {
                            Q("#secondCode").parents("li").find(b.hintWord).show().html(c.msg)
                        }
                    },
                    cache: false
                })
            } else {
                Q("#secondCode").parents("li").find(b.hintWord).show().html("请输入验证码")
            }
        }, forgetPassBackOne: function () {
            Q.fn.refreshCode();
            Q.fn.cleatTime();
            Q(".getForgetCode").removeClass("sendBtnNo");
            Q(".getForgetCode").removeClass("sendBtnAfterIs");
            Q("#forgetSecond").hide();
            Q("#forgetFirst").show();
            Q("#name").focus();
            Q("#code").val("请输入右侧验证码")
        }, forgetPassThree: function () {
            var c = Q.extend({}, T);
            var b = Q("#password").val();
            var d = Q("#secondCode").val();
            var a = Q("#checkpassword").val();
            if (b) {
                if (b.length >= 6 && b.length <= 16) {
                    if (/^[0-9a-zA-Z!@#$%^&*()_+|?/\-=]{6,16}$/m.test(b)) {
                        if (!/^[0-9]{6,16}$/m.test(b)) {
                            if (a) {
                                if (b == a) {
                                    Q.fn.cleatTime();
                                    Q("#checkpassword").parents("li").find(c.hintWord).hide();
                                    Q.ajax({
                                        url: y + "/ajax/ajaxRegister.php",
                                        data: "from=resetThree&type=" + $type + "&contact=" + $name + "&code=" + d + "&password=" + hex_md5(b),
                                        type: "POST",
                                        dataType: "jsonp",
                                        success: function (e) {
                                            if (e.code == 1) {
                                                Q(c.List).remove();
                                                Q(c.Box).append(c.loginForgetSuccess);
                                                O = $name.substring(0, 10);
                                                Q("#xiding").html(H);
                                                Q("#user-name").html(O);
                                                var f = 5;
                                                K = setInterval(function () {
                                                    f--;
                                                    if (f == 0) {
                                                        Q.fn.cleatTime();
                                                        Q.fn.successLogin(N)
                                                    } else {
                                                        Q(".numSecond").html(f)
                                                    }
                                                }, 1000)
                                            } else {
                                                Q("#password").parents("li").find(c.hintWord).show().html(e.msg)
                                            }
                                        },
                                        cache: false
                                    })
                                } else {
                                    Q("#checkpassword").parents("li").find(c.hintWord).show().html("您输入的密码与确认密码不一致")
                                }
                            } else {
                                Q("#checkpassword").parents("li").find(c.hintWord).show().html("请您输入确认密码")
                            }
                        } else {
                            Q("#password").parents("li").find(c.hintWord).show().html("密码不能为纯数字")
                        }
                    } else {
                        Q("#password").parents("li").find(c.hintWord).show().html("密码不能包含特殊字符")
                    }
                } else {
                    Q("#password").parents("li").find(c.hintWord).show().html("密码长度为6-16位字符")
                }
            } else {
                Q("#password").parents("li").find(c.hintWord).show().html("请您输入密码")
            }
        }, forgetPassGetCode: function () {
            var c = Q.extend({}, T);
            var b = Q(".getForgetCode");
            var a = b.text();
            Q(".getForgetCode").text("正在发送..");
            b.unbind("click");
            Q.ajax({
                url: y + "/ajax/ajaxUser.php",
                data: "do=getCode&contact=" + $name + "&usetype=" + 2 + "&sendtype=" + $type+ '&codeCommon=' + codeCommon,
                type: "POST",
                dataType: "jsonp",
                success: function (d) {
                    if (d.code == 1) {
                        b.addClass("sendBtnNo");
                        b.addClass("sendBtnAfterIs");
                        Q("#secondCode").parents("li").find(c.hintWord).hide();
                        Q.fn.countDownTime(b, 120, a)
                    } else {
                        if (d.code == -4) {
                            b.addClass("sendBtnNo");
                            b.addClass("sendBtnAfterIs");
                            Q.fn.countDownTime(b, 120, a);
                            Q(".getForgetCode").html("操作过于频繁");
                            Q("#secondCode").parents("li").find(c.hintWord).show().html(d.msg)
                        } else {
                            if (d.code == -3) {
                                b.addClass("sendBtnNo");
                                Q(".getForgetCode").html("超过7次");
                                Q("#secondCode").parents("li").find(c.hintWord).show().html("此号验证码超过7次,请明天再试")
                            } else {
                                Q("#secondCode").parents("li").find(c.hintWord).show().html(d.msg)
                            }
                        }
                    }
                    b.unbind("click")
                },
                cache: false
            })
        }, refreshCode: function () {
            var b = Math.round(new Date().getTime());
            var a = y + "/ajax/code.php";
            a = a + "?" + b;
            Q("#refreshCode").attr("src", a)
        }, changeBtnType: function (b) {
            var c = Q(".loginBtnChange");
            var d = Q.extend({}, T);
            var a = Q(this);
            Q.fn.cleatTime();
            if (c.hasClass("isPc")) {
                c.removeClass("isPc").addClass("isErweima");
                Q(d.List).remove();
                Q(d.Box).append(d.loginErWeiMBox);
                Q.fn.getErWeiMa()
            } else {
                Q.fn.cleatTime();
                c.removeClass("isErweima").addClass("isPc");
                Q(d.List).remove();
                Q(d.Box).append(d.loginNumBox)
            }
        }, changeLoginType: function (b, c, a) {
            var d = Q.extend({}, T);
            Q(document).on("click", b, function () {
                Q.fn.cleatTime();
                Q(d.List).remove();
                Q(d.Box).append(c);
                switch (a) {
                    case 1:
                        Q.fn.getErWeiMa();
                        Q(d.loginBtnChange).removeClass("isPc").addClass("isErweima").show();
                        break;
                    case 2:
                        Q(d.loginBtnChange).removeClass("isPc").addClass("isErweima").hide();
                        break;
                    case 3:
                        Q(d.loginBtnChange).removeClass("isPc").addClass("isErweima").hide();
                        Q(document).on("click", "#forgetFirstBtn", function () {
                            Q.fn.forgetPass()
                        });
                        Q(document).on("click", "#refreshCode", function () {
                            Q.fn.refreshCode()
                        });
                        Q(document).on("click", "#changeCode", function () {
                            Q.fn.refreshCode()
                        });
                        Q(document).on("click", "#forgetSecondBtn", function () {
                            Q.fn.forgetPassTwo()
                        });
                        Q(document).on("click", ".getForgetCode", function () {
                            if (Q(this).hasClass("sendBtnNo")) {
                            } else {
                                Q.fn.forgetPassGetCode()
                            }
                        });
                        Q.fn.changeLoginType("#noGetPhoneEmail", d.loginForgetCannot, 2);
                        Q(document).on("click", "#forgetThirdBtn", function () {
                            Q.fn.forgetPassThree()
                        });
                        break;
                    case 4:
                        Q.fn.cleatTime();
                        Q(d.loginBtnChange).show();
                        Q(".numberUser").html("");
                        Q("#code").val("");
                        Q("#name").val("");
                        Q(d.loginBtnChange).removeClass("isErweima").addClass("isPc").show();
                        break;
                    case 5:
                        Q.fn.cleatTime();
                        Q(d.loginBtnChange).show();
                        Q(".numberUser").html("");
                        Q("#code").val("");
                        Q("#name").val("");
                        Q(d.loginBtnChange).removeClass("isPc").addClass("isErweima").show();
                        break;
                    default:
                        Q.fn.cleatTime();
                        Q(d.loginBtnChange).show();
                        Q(".numberUser").html("");
                        Q("#code").val("");
                        Q("#name").val("");
                        break
                }
            })
        }, focusBlurPass: function (a, b) {
            var c = Q.extend({}, T);
            Q(document).on("focus", a, function () {
                var d = Q(this).val();
                Q(this).css("background-image", "none");
                Q(a).siblings(c.hintWord).hide()
            });
            Q(document).on("blur", a, function () {
                var d = Q(this).val();
                if (d) {
                    Q(this).css("background-image", "none")
                } else {
                    Q(this).css("background", "url(https://icon.fengniao.com/login/images/" + b + ") no-repeat 11px center")
                }
                if (a == ".password1") {
                    Q.fn.checkPassword(a)
                }
            })
        }, focusBlur: function (a, b) {
            var c = Q.extend({}, T);
            Q(document).on("focus", a, function () {
                var d = Q(this).val();
                Q(this).addClass("focus");
                if (d == b) {
                    Q(this).val("")
                }
                Q(a).siblings(c.hintWord).hide()
            });
            Q(document).on("blur", a, function () {
                var d = Q(this).val();
                Q(this).removeClass("focus");
                if (d == "") {
                    Q(this).val(b)
                }
                switch (a) {
                    case".userName1":
                        if (Q(a).val() == "请输入用户名") {
                            Q(a).siblings(T.hintWord).show().text("请输入用户名")
                        } else {
                            Q.fn.checkUsername()
                        }
                        break;
                    case".phone1":
                        if (!Q.fn.isPhoneNo(d)) {
                            Q(a).siblings(T.hintWord).show().text("请输入正确的手机号码")
                        }
                        break;
                    case".userName2":
                        if (Q(a).val() == "大陆手机号/用户名/邮箱") {
                            Q(a).siblings(T.hintWord).show().text("请输入大陆手机号/用户名/邮箱")
                        }
                        break;
                    case"#name":
                        console.log(Q(a).val().length);
                        if (Q(a).val() == "大陆手机号/用户名/邮箱") {
                            Q(a).siblings(T.hintWord).show().text("请输入大陆手机号/用户名/邮箱")
                        }
                        break
                }
            })
        }, checkUsername: function () {
            var c = Q(".userName1");
            var b = encodeURI(c.val());
            var a = Q.fn.hintWord;
            b = Q.trim(b);
            if (b) {
                Q.ajax({
                    url: y + "/ajax/ajaxRegister.php",
                    data: "from=checkUsername&username=" + b,
                    type: "POST",
                    dataType: "jsonp",
                    success: function (d) {
                        if (d.code == 1) {
                            c.siblings(a).show().text("")
                        } else {
                            c.siblings(a).show().text(d.msg)
                        }
                    },
                    cache: false
                })
            } else {
                c.siblings(a).show().text("请输入用户名")
            }
        }, checkPassword: function (c) {
            var c = Q(c).val();
            var b = Q(".password1");
            var a = Q.fn.hintWord;
            if (c) {
                if (c.length >= 6 && c.length <= 16) {
                    if (/^[0-9a-zA-Z!@#$%^&*()_+|?\/-=]{6,16}$/m.test(c)) {
                        if (!/^[0-9]{6,16}$/m.test(c)) {
                            b.siblings(a).hide()
                        } else {
                            b.siblings(a).show().text("密码不能为纯数字")
                        }
                    } else {
                        b.siblings(a).show().text("密码不能包含特殊字符")
                    }
                } else {
                    b.siblings(a).show().text("密码长度为6-16位字符")
                }
            } else {
                b.siblings(a).show().text("请您输入密码")
            }
        }, getSendCode: function (b,l) {
            J = Q(".loginTanBox .phone").val();
            F = Q(".loginTanBox .phoneCode").val();
            var jj = Q(".getPhoneCode");
            if(countryId != '+86'){
                J = countryId + J;
            }
            var a = Q("#onlycode").val();
            Q.ajax({
                url: y + "/ajax/getCode.php?keySecond="+keySecond1,
                type: "get",
                dataType: "jsonp",
                data: {onlycode: a, phone: J, usetype: b, sendtype: 1},
                success: function (c) {
                    if (c.code == 1) {
                        Q(".loginTanBox .phone").siblings(T.hintWord).hide()
                    } else {
                        Q(".loginTanBox .phone").siblings(T.hintWord).show().html(c.msg)
                        jj.removeClass("sendBtnNo");
                        jj.addClass("sendBtnAfter");
                        jj.removeClass("sendBtnAfterIs")
                        jj.removeClass("sendBtnTime");
                        jj.html("获取验证码");
                        clearInterval(l);
                    }
                }
            })
        }, isPhoneNo: function (b) {
            // var a = /^1[345789]\d{9}$/;
            // return a.test(b)
            return true;
        }, phoneTime: function () {
            var c = Q(this).val();
            var a = Q(this);
            var b = Q(".getPhoneCode");
            if (c == "") {
                b.removeClass("sendBtnAfter");
                b.removeClass("sendBtnNo")
            } else {
                if (!Q.fn.isPhoneNo(c)) {
                    if (b.hasClass("sendBtnAfterIs")) {
                        Q(this).siblings(T.hintWord).show().text("请倒计时结束后再点击获取验证码")
                    } else {
                        Q(this).siblings(T.hintWord).show().text("请输入正确的手机号码");
                        b.addClass("sendBtnNo");
                        b.removeClass("sendBtnAfter")
                    }
                } else {
                    Q(this).siblings(T.hintWord).hide();
                    if (!b.hasClass("sendBtnAfterIs")) {
                        b.removeClass("sendBtnNo");
                        b.addClass("sendBtnAfter")
                    }
                }
            }
        }, countDownTime: function (a, b, c) {
            z = b;
            S = setInterval(function () {
                if (z == 0) {
                    a.removeClass("sendBtnNo");
                    a.removeClass("sendBtnAfterIs");
                    a.html(c);
                    clearInterval(S)
                } else {
                    z--;
                    a.html(z + "s")
                }
            }, 1000)
        }, getNewsNumber: function () {
            Q.ajax({
                url: y + "/ajax/ajaxNotice.php?callback=jQuery171012816668872340653_1520991468998&_=1520991469066",
                data: "",
                type: "POST",
                dataType: "jsonp",
                success: function (c) {
                    var a = c.priv + c.reply + c.station + c.pm + c.integration;
                    if (a > 0) {
                        Q("#global-num").show().text(a)
                    }
                    b(Q(".priv"), c.priv);
                    b(Q(".reply"), c.reply);
                    b(Q(".station"), c.station);
                    b(Q(".pm"), c.pm);
                    b(Q(".integral"), c.integration);
                    function b(e, d) {
                        if (d > 0) {
                            e.find("em").html("(" + d + ")")
                        }
                    }
                },
                cache: false
            })
        }, hintWord: function () {
            var a = Q(this).parents("li");
            Q(this).hide();
            a.find("input").focus()
        }, removejscssfile: function (d, c) {
            var f = (c == "js") ? "script" : (c == "css") ? "link" : "none";
            var e = (c == "js") ? "src" : (c == "css") ? "href" : "none";
            var b = document.getElementsByTagName(f);
            for (var a = b.length; a >= 0; a--) {
                if (b[a] && b[a].getAttribute(e) != null && b[a].getAttribute(e).indexOf(d) != -1) {
                    b[a].parentNode.removeChild(b[a])
                }
            }
        }, loadjscssfile: function (c, a) {
            if (a == "js") {
                var b = document.createElement("script");
                b.setAttribute("type", "text/javascript");
                b.setAttribute("src", c)
            } else {
                if (a == "css") {
                    var b = document.createElement("link");
                    b.setAttribute("rel", "stylesheet");
                    b.setAttribute("type", "text/css");
                    b.setAttribute("href", c)
                }
            }
            if (typeof b != "undefined") {
                document.getElementsByTagName("head")[0].appendChild(b)
            }
        }, successLogin: function (a) {
            O = Q.fn.topReadCookie("bbusername").substring(0, 10);
            Q("#xiding").html(H);
            Q("#user-name").html(O + '<i class="triangle-icon"></i>');
            Q("#logout").attr("href", "https://my.fengniao.com/login.php?action=logout&url=" + P);
            Q.fn.getNewsNumber();
            Q.fn.closeBox();
            Q.fn.cleatTime()
            if(Q.fn.refreshSuccessFun){
                // window.location.reload();
                if(location.href.indexOf("#reloaded")==-1){
                    location.href=location.href+"#reloaded";
                    location.reload();
                }
                // Q.fn.refreshSuccessFun.refreshSuccessFun();
            }
        }, closeBox: function (b) {
            var a = Q.extend({}, T);
            I = 0;
            Q(a.TanBox).remove();
            Q.fn.removejscssfile("https://icon.fengniao.com/login/css/loginCss.v1.2.css", "css");
            Q.fn.removejscssfile("https://static.geetest.com/static/tools/gt.js", "js");
            Q.fn.removejscssfile("https://my.fengniao.com/icon/js/md5.js", "js");
            Q.fn.removejscssfile("https://my.fengniao.com/icon/js/jquery.cookie.js", "js");
            Q.fn.cleatTime();
            Q(document).unbind('click');
            Q("#globaSitePersonNav li").hover(function () {
                Q(this).addClass("hover");
                Q(this).find(".dropdown-items").show()
            }, function () {
                Q(this).removeClass("hover");
                Q(this).find(".dropdown-items").hide()
            })
        }, loginOut: function () {
            Q.fn.deleteCookie("bbusername");
            Q.fn.deleteCookie("bbpassword");
            Q.fn.deleteCookie("bbuserid");
            location.reload();
            Q("#logout").attr("href", "https://my.fengniao.com/login.php?action=logout&url=" + P);
            Q("#xiding").html('<ul class="login-box"><li><a href="javascript:;" target="_self" class="login-link"><i class="icon"></i>登录</a></li><li><a href="javascript:;" target="_self" class="registerBtn">免费注册</a></li></ul>')
        }, topSetCookie: function (a, b, c) {
            Q.cookie(a, b, {expires: c, path: "/"})
        }, topReadCookie: function (b) {
            var a = "";
            var d = b + "=";
            if (document.cookie.length > 0) {
                offset = document.cookie.indexOf(d);
                if (offset != -1) {
                    offset += d.length;
                    end = document.cookie.indexOf(";", offset);
                    if (end == -1) {
                        end = document.cookie.length
                    }
                    var c = document.cookie.substring(offset, end);
                    a = decodeURIComponent(c.replace(/\+/g, " "))
                }
            }
            return a
        }, deleteCookie: function (a) {
            Q.cookie(a, null, {expires: -1, path: "/"})
        }, cleatTime: function () {
            z = 0;
            clearInterval(S);
            clearInterval(A);
            clearInterval(M);
            clearInterval(K)
        }
    })
})(jQuery);
