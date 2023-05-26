(function() {
	function g(a) {
		return "'" + a.replace(i, "\\\\").replace(j, "\\'").replace(k, " ") + "'"
	}

	function e(a) {
		return "(function(){try{return(" + a + ')}catch(e){return""}})()'
	}
	var l = /^if\s+(.+)$/,
		m = /^(?:elif|else\s*if)\s+(.+)$/,
		n = /^(?:for)?each\s+(.+)\s+as\s+(\w+)(?:\s*,\s*(\w+))?$/,
		p = /^(\w+)\s*=\s*(.+)$/,
		q = /\S/.test(" ") ? /^[\s ]+|[\s ]+$/g : /^\s+|\s+$/g,
		i = /\\/g,
		j = /'/g,
		k = /[\t\b\f\r\n]/g,
		h = {}.toString,
		r = "".trim ?
	function(a) {
		return a.trim()
	} : function(a) {
		return a.replace(q, "")
	}, f = function(a) {
		var b = ["var __O=[];"],
			c, a = a.split("{%");
		for (b.push("__O.push(" + g(a.shift()) + ");"); c = a.shift();) {
			c = c.split("%}");
			var d;
			if (1 < c.length && (d = r(c.shift()))) switch (!0) {
			case "endif" == d:
				b.push("}");
				break;
			case "endforeach" == d:
			case "endeach" == d:
				b.push("});");
				break;
			case "else" == d:
				b.push("}else{");
				break;
			case l.test(d):
				b.push("if(" + e(RegExp.$1) + "){");
				break;
			case m.test(d):
				b.push("}else if(" + e(RegExp.$1) + "){");
				break;
			case n.test(d):
				b.push("this.each(" + e(RegExp.$1) + ",function(" + RegExp.$2 + "," + (RegExp.$3 || "__index") + "){");
				break;
			case p.test(d):
				b.push("var " + RegExp.$1 + "=" + e(RegExp.$2) + ";");
				break;
			default:
				b.push("__O.push(" + e(d) + ");")
			}
			b.push("__O.push(" + g(c.join("%}")) + ");")
		}
		b.push('return __O.join("");');
		this.template = b.join("")
	};
	f.each = function(a, b) {
		if (a) {
			var c = 0,
				d = a.length;
			if ("[object Function]" == h.call(a.forEach)) a.forEach(b);
			else if (void 0 === d || "[object Function]" == h.call(a)) for (c in a) b(a[c], c, a);
			else for (; c < d;) b(a[c], c++, a)
		}
	};
	f.prototype.render = function(a) {
		var b = ["with(__I){", this.template, "}"].join("");
		return (new Function("__I", b)).call(f, a)
	};
	window.Template = f
})();