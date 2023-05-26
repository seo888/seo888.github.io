(function (exports) {
/////////////////////////////////////////////////////
//以上勿动
/////////////////////////////////////////////////////

    exports.userinfo = {};

    //获取登录会员信息
    exports.userinfo.get_login_member_info = function (_memberInfo, token, cb) {
    	  var memberInfo = _memberInfo;
        if (!memberInfo && token) {
            //alert("get_login_member_info get from token = "+token);
            var params = {};
            if (token){
                params.token = token;
            }
            memberInfo = tycom.api.member.get_login_user_info(null, params);
        }else if (!memberInfo){
            memberInfo = tycom.api.member.get_login_user_info();
        }else{
            //alert("get_login_member_info false");
        }

        if (!memberInfo) {
        		cb && cb(0);
            return null;
        }else{
        		cb && cb(1)
        }

        var tempStr = JSON.stringify(memberInfo);
        tempStr = tempStr.replace(/"true"/g, 'true');
        tempStr = tempStr.replace(/"false"/g, 'false');
        tempStr = tempStr.replace(/'true'/g, 'true');
        tempStr = tempStr.replace(/'false'/g, 'false');

        memberInfo = JSON.parse(tempStr);

        this.get_authorization = function () {
            return "userinfo.authorization";
        };
        this.get_member_id = function () {
            return memberInfo.id;
        };

        this.get_member_name = function () {
            return memberInfo.name;
        };

        this.get_member_mobile = function () {
            return memberInfo.mobile;
        };

        this.get_member_email = function () {
            return memberInfo.email;
        };

        this.get_member_img_url = function () {
            return memberInfo.imgUrl;
        };
        this.get_member_idCard = function () {
            return memberInfo.idCard;
        };
        this.get_member_qq = function () {
            return memberInfo.qq;
        };
        this.get_member_weibo = function () {
            return memberInfo.weibo;
        };
        this.get_member_weixin = function () {
            return memberInfo.weixin;
        };

        this.get_member = function () {
            return memberInfo;
        };

        if (memberInfo) {
            return {
                get_authorization: this.get_authorization
                , get_member_id: this.get_member_id
                , get_member_name: this.get_member_name
                , get_member_email: this.get_member_email
                , get_member_mobile: this.get_member_mobile
                , get_member_img_url: this.get_member_img_url
                , get_member: this.get_member
                , get_member_idCard: this.get_member_idCard
                , get_member_qq: this.get_member_qq
                , get_member_weibo: this.get_member_weibo
                , get_member_weixin: this.get_member_weixin
            };
        } else {
            return null;
        }
    };

    //注销当前用户
    exports.userinfo.member_logout = function () {
        try {
            tycom.api.member.logout();
            QC.Login.signOut();
        } catch (err) {
            console.error("logout err : " + err.message);
        } finally {
            exports.userinfo.current_member = undefined;
        }
        return true;
    };

    exports.userinfo.current_member = exports.userinfo.get_login_member_info();

    if (!exports.userinfo.current_member){
        if (tycom.native && tycom.native.isNative()) {
            tycom.native.getToken(function (token) {
                //alert("userinfo1 token="+token);
                if (token) {
                    //alert("userinfo2 token="+token);
                    exports.userinfo.current_member = exports.userinfo.get_login_member_info(undefined, token);
                }
            });
        }
    }

    exports.userinfo.refresh_current_member = function (token, cb) {
        exports.userinfo.current_member = exports.userinfo.get_login_member_info(undefined, token, cb);
    };


/////////////////////////////////////////////////////
//以下勿动
/////////////////////////////////////////////////////
})((function () {
    if (typeof exports === 'undefined') {
        if (typeof window.tycom === 'undefined') {
            window.tycom = {};
        }
        return tycom;
    } else {
        return exports;
    }
})());