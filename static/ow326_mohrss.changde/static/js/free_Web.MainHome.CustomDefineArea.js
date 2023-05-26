var setCustom= setInterval(function () { 
    if (free_Web && free_Web.Function && free_Web.Function.ReadArea.Config)
        free_Web.Function.ReadArea.Config.CustomDefineArea = [
            {
                Name: "导航区",
                TagName: ".mainNav|.hotNodeList.rotateIcon|#xxgk|#zdxxgk|yyxt",
                img: "Br_ReadArea_menu.png",
            },
            {
                Name: "交互区",
                TagName: ".s-form|.siteSearch",
                img: "Br_ReadArea_interaction.png",
                Single: true
            },
            {
                Name: "正文区",
                TagName: ".mainContent",
                img: "Br_ReadArea_interaction.png",
            },
            {
                Name: "视窗区",
                TagName: ".freewebinfolistarea|.indFocus|.newsTab|.newZtzl|.indBox.fl|.indBox.fr|.focusAd|.index_news.fr|.infoList",
                img: "Br_ReadArea_interaction.png",
            },
            {
                Name: "正文区",
                TagName: ".articleCon",
                img: "Br_ReadArea_interaction.png"
            }
        ]
    clearInterval(setCustom);
},500)