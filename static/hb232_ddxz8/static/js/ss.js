function ObjectAD() {
  /* Define Variables*/
  this.ADID        = 0;
  this.ADType      = 0;
  this.ADName      = "";
  this.ImgUrl      = "";
  this.ImgWidth    = 0;
  this.ImgHeight   = 0;
  this.FlashWmode  = 0;
  this.LinkUrl     = "";
  this.LinkTarget  = 0;
  this.LinkAlt     = "";
  this.Priority    = 0;
  this.CountView   = 0;
  this.CountClick  = 0;
  this.InstallDir  = "";
  this.ADDIR       = "";
}

function CodeZoneAD(_id) {
  /* Define Common Variables*/
  this.ID          = _id;
  this.ZoneID      = 0;

  /* Define Unique Variables*/

  /* Define Objects */
  this.AllAD       = new Array();
  this.ShowAD      = null;

  /* Define Functions */
  this.AddAD       = CodeZoneAD_AddAD;
  this.GetShowAD   = CodeZoneAD_GetShowAD;
  this.Show        = CodeZoneAD_Show;

}

function CodeZoneAD_AddAD(_AD) {
  this.AllAD[this.AllAD.length] = _AD;
}

function CodeZoneAD_GetShowAD() {
  if (this.ShowType > 1) {
    this.ShowAD = this.AllAD[0];
    return;
  }
  var num = this.AllAD.length;
  var sum = 0;
  for (var i = 0; i < num; i++) {
    sum = sum + this.AllAD[i].Priority;
  }
  if (sum <= 0) {return ;}
  var rndNum = Math.random() * sum;
  i = 0;
  j = 0;
  while (true) {
    j = j + this.AllAD[i].Priority;
    if (j >= rndNum) {break;}
    i++;
  }
  this.ShowAD = this.AllAD[i];
}

function CodeZoneAD_Show() {
  if (!this.AllAD) {
    return;
  } else {
    this.GetShowAD();
  }

  if (this.ShowAD == null) return false;
  document.write(this.ShowAD.ADIntro);
}

var ZoneAD_2 = new CodeZoneAD("ZoneAD_2");
ZoneAD_2.ZoneID      = 2;
ZoneAD_2.ZoneWidth   = 0;
ZoneAD_2.ZoneHeight  = 0;
ZoneAD_2.ShowType    = 1;

var objAD = new ObjectAD();
objAD.ADID           = 2;
objAD.ADType         = 4;
objAD.ADName         = "站内搜索";
objAD.ImgUrl         = "";
objAD.InstallDir     = "http://www.jin10086.cn/";
objAD.ImgWidth       = 0;
objAD.ImgHeight      = 0;
objAD.FlashWmode     = 0;
objAD.ADIntro        = "<form method=\"get\" action=\"http://zhannei.baidu.com/cse/search\" target=\"_blank\">\n\r<input class=\"sol\" type=\"text\" value=\" \" name=\"q\" onfocus=\"if (this.value == \'请输入关键词... \')  {this.value = \'\';}\" onblur=\"if (this.value == \'\') \n\r{this.value = \'请输入关键词... \';}\">\n\r<input type=\"hidden\" name=\"s\" value=\"12108510016246137078\">\n\r<input type=\"hidden\" name=\"entry\" value=\"1\">\n\r<input name=\"ok\" class=\"sor\" type=\"submit\" value=\"搜索\">\n\r</form>";
objAD.LinkUrl        = "";
objAD.LinkTarget     = 1;
objAD.LinkAlt        = "";
objAD.Priority       = 1;
objAD.CountView      = 0;
objAD.CountClick     = 0;
objAD.ADDIR          = "AD";
ZoneAD_2.AddAD(objAD);

ZoneAD_2.Show();