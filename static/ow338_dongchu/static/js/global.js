/*
 * 全局
 * @Author: Rohan
 * @Date:   2021-11-02 15:50:07
 * @Last Modified by:   Rohan
 * @Last Modified time: 2021-11-09 10:35:28
 */
//新闻
var _news = {
	cid:'11',			//栏目ID
	second_cid:'0',		//二级栏目ID
	city:'0',			//城市ID
	id:'',				//新闻ID
	page:1,				//分页
	scrollFinished:true,//下拉加载
	haveMore:true,		//更多新闻
	key:'',				//搜索关键词
};
//用户
var _user = {
	login:false,	//登录
	userid:'0',		//用户ID
	username:'',	//用户名
	nickname:'',	//用户昵称
	avatar:''		//用户头像
};
//极验验证
var _geetest = {
	challenge:'',
	validate:'',
	seccode:''
}

var _from_url = document.referrer;


