window.fet && fet.register({
	'lib.jQuery':{
		assets:'{IMG_URL}js/lib/jquery.js',
		test:'window.jQuery'
	},
    'lib.ui':{
        assets:'{IMG_URL}js/lib/jquery.ui.js',
        test:'jQuery.ui',
        depends:'lib.jQuery'
    },
    'lib.uidialog':{
        assets:'{IMG_URL}js/lib/jquery-ui/dialog.css',
        depends:'lib.ui'
    },
    'lib.json2':{
        assets:'{IMG_URL}js/lib/json2.js',
        test:'window.JSON && window.JSON.stringify'
    },
	'lib.autocomplete':{
		assets:'{IMG_URL}js/lib/autocomplete/style.css {IMG_URL}js/lib/cmstop.autocomplete.js',
		test:'jQuery.fn.autocomplete',
		depends:'lib.jQuery'
	},
	'lib.colorInput':{
		assets:'{IMG_URL}js/lib/colorInput/style.css {IMG_URL}js/lib/cmstop.colorInput.js',
		test:'jQuery.fn.colorInput',
		depends:'lib.jQuery'
	},
	'lib.datepicker':{
		assets:'{IMG_URL}js/lib/datepicker/style.css {IMG_URL}js/lib/cmstop.datepicker.js',
		test:'window.DatePicker'
	},
	'lib.suggest':{
		assets:'{IMG_URL}js/lib/suggest/style.css {IMG_URL}js/lib/cmstop.suggest.js',
		test:'jQuery.fn.suggest',
		depends:'lib.jQuery'
	},
	'lib.tree':{
		assets:'{IMG_URL}js/lib/tree/style.css {IMG_URL}js/lib/cmstop.tree.js',
		test:'jQuery.fn.tree',
		depends:'lib.jQuery'
	},
	'lib.list':{
		assets:'{IMG_URL}js/lib/list/style.css {IMG_URL}js/lib/cmstop.list.js',
		test:'jQuery.fn.list',
		depends:'lib.jQuery'
	},
	'lib.suggestree':{
		test:'jQuery.fn.tree&&jQuery.fn.list',
		depends:'lib.tree lib.suggest'
	},
    'lib.template':{
        assets:'{IMG_URL}js/lib/cmstop.template.js',
		test:'window.Template'
    },
    'lib.gallery.black':{
        assets:'{IMG_URL}js/lib/gallery/black.css {IMG_URL}js/lib/cmstop.gallery.js',
        test:'jQuery.fn.gallery',
        depends:'lib.jQuery'
    },
    'lib.gallery.white':{
        assets:'{IMG_URL}js/lib/gallery/white.css {IMG_URL}js/lib/cmstop.gallery.js',
        test:'jQuery.fn.gallery',
        depends:'lib.jQuery'
    },
    'lib.validator':{
        assets:'{IMG_URL}js/lib/validator/style.css {IMG_URL}js/lib/cmstop.validator.js',
        test:'jQuery.fn.validate',
        depends:'lib.jQuery'
    },
    'lib.selectree':{
        assets:'{IMG_URL}js/lib/selectree/selectree.css {IMG_URL}js/lib/cmstop.selectree.js',
        test:'jQuery.fn.Selectree',
        depends:'lib.jQuery lib.autocomplete'
    },
    'lib.tipsy':{
        assets:'{IMG_URL}js/lib/tipsy/style.css {IMG_URL}js/lib/jquery.tipsy.js',
        test:'jQuery.fn.tipsy',
        depends:'lib.jQuery'
    },
	cmstop:{
		assets:'{IMG_URL}js/cmstop/style.css {IMG_URL}js/cmstop.js {IMG_URL}js/config.js',
		test:'window.cmstop',
		depends:'lib.jQuery'
	},
	'net.BMap':{
		assets:'http://api.map.baidu.com/res/11/bmap.css http://api.map.baidu.com/getscript?v=1.1&services=true&js',
		test:'window.BMap'
	},
    'net.BCityList':{
        assets:'http://api.map.baidu.com/library/CityList/1.2/src/CityList_min.js',
        test:'window.BMapLib&&BMapLib.CityList'
    }
});
