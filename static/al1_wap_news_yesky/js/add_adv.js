/**
 * Created by Administrator on 2016/10/9.
 */
test("div");
function test(tag){
    var _pro=document.getElementsByTagName(tag);
    var _reg=new RegExp("(?!mlp_yesky_duilian|mlp_yesky-floating|mlp_yesky-tanchuwindows|mlp_yesky-fudongguanggao|mlp_yesky_liumeiti|mlp_shipin|mlp_yesky_fuceng_column|mlp_yesky-rlxwbanner|mlp_yesky-rdztbanner|mlp_yesky-teselanmu|mlp_yesky-pcycbanner|mlp_yesky-gjznbanner|mlp_jdtxiawenzilian|mlp_yesky_buttonxword|mlp_yesky_jdt_320180|mlp_yesky_diyidabiaoti|mlp_yesky-dierdabiaoti|mlp_yesky_dbtxxiaobiaoti|mlp_yesky-disandabiaoti|mlp_yesky-dsdbtxxbt|mlp_ypro_chanpin_mitext)(mlp_)|(adv_)",'g');
    var _floatreg=new RegExp("(mlp_shipin|mlp_yesky-floating|mlp_shipin)",'g');
    var pro_name='';
    for(var i=0;i <_pro.length;i++){
        pro_name=_pro[i].className;
        if(_reg.test(pro_name)){
            var _adicon1=document.createElement("div");
            _adicon1.style.position='absolute';
            _adicon1.style.left='0px';
            _adicon1.style.bottom='0px';
            _adicon1.style.width='29px';
            _adicon1.style.height='16px';
            _adicon1.style.zIndex='99999';
            _adicon1.style.backgroundImage='url(/TLimages2009/yesky/images/pic/adtips.png)';
            _pro[i].style.position='relative';
            _pro[i].appendChild(_adicon1);
        }else if(_reg.test(_floatreg)){
            var _adicon2=document.createElement("div");
            var _style = _adicon2.childNodes[i].style;
            _adicon2.style()
            console.log('ssss');
            _adicon2.style.position='absolute';
            _adicon2.style.left='0px';
            _adicon2.style.bottom='0px';
            _adicon2.style.width='29px';
            _adicon2.style.height='16px';
            _adicon2.style.zIndex='99999';
            _adicon2.style.backgroundImage='url(/TLimages2009/yesky/images/pic/adtips.png)';
            _pro[i].style.position='fixed';
            _pro[i].appendChild(_adicon2);
        }
    }
}