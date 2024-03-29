function Hammer(e, t, n) {
	function r(e) {
		return e.touches ? e.touches.length : 1
	}
	function i(e) {
		if (e = e || window.event, H) {
			for (var t, n = [], r = 0, i = e.touches.length; i > r; r++) t = e.touches[r], n.push({
				x: t.pageX,
				y: t.pageY
			});
			return n
		}
		var o = document,
			a = o.body;
		return [{
			x: e.pageX || e.clientX + (o && o.scrollLeft || a && a.scrollLeft || 0) - (o && o.clientLeft || a && o.clientLeft || 0),
			y: e.pageY || e.clientY + (o && o.scrollTop || a && a.scrollTop || 0) - (o && o.clientTop || a && o.clientTop || 0)
		}]
	}
	function o(e, t) {
		return 180 * Math.atan2(t.y - e.y, t.x - e.x) / Math.PI
	}
	function a(e, t) {
		var n = t.x - e.x,
			r = t.y - e.y;
		return Math.sqrt(n * n + r * r)
	}
	function s(e, t) {
		if (2 == e.length && 2 == t.length) {
			var n = a(e[0], e[1]),
				r = a(t[0], t[1]);
			return r / n
		}
		return 0
	}
	function l(e, t) {
		if (2 == e.length && 2 == t.length) {
			var n = o(e[1], e[0]),
				r = o(t[1], t[0]);
			return r - n
		}
		return 0
	}
	function c(e, t) {
		t.touches = i(t.originalEvent), t.type = e, g(b["on" + e]) && b["on" + e].call(b, t)
	}
	function u(e) {
		e = e || window.event, e.preventDefault ? (e.preventDefault(), e.stopPropagation()) : (e.returnValue = !1, e.cancelBubble = !0)
	}
	function d() {
		N = {}, j = !1, _ = 0, C = 0, S = 0, A = null
	}
	function f(n) {
		switch (n.type) {
		case "mousedown":
		case "touchstart":
			N.start = i(n), D = (new Date).getTime(), _ = r(n), j = !0, w = n;
			var o = e.getBoundingClientRect(),
				a = e.clientTop || document.body.clientTop || 0,
				f = e.clientLeft || document.body.clientLeft || 0,
				p = window.pageYOffset || e.scrollTop || document.body.scrollTop,
				h = window.pageXOffset || e.scrollLeft || document.body.scrollLeft;
			I = {
				top: o.top + p - a,
				left: o.left + h - f
			}, P = !0, B.hold(n), t.prevent_default && u(n);
			break;
		case "mousemove":
		case "touchmove":
			if (!P) return !1;
			T = n, N.move = i(n), B.transform(n) || B.drag(n);
			break;
		case "mouseup":
		case "mouseout":
		case "touchcancel":
		case "touchend":
			if (!P || "transform" != A && n.touches && n.touches.length > 0) return !1;
			P = !1, k = n, B.swipe(n), "drag" == A ? c("dragend", {
				originalEvent: n,
				direction: E,
				distance: C,
				angle: S
			}) : "transform" == A ? c("transformend", {
				originalEvent: n,
				position: N.center,
				scale: s(N.start, N.move),
				rotation: l(N.start, N.move)
			}) : B.tap(w), L = A, c("release", {
				originalEvent: n,
				gesture: A
			}), d()
		}
	}
	function p(t) {
		h(e, t.relatedTarget) || f(t)
	}
	function h(e, t) {
		if (!t && window.event && window.event.toElement && (t = window.event.toElement), e === t) return !0;
		if (t) for (var n = t.parentNode; null !== n;) {
			if (n === e) return !0;
			n = n.parentNode
		}
		return !1
	}
	function m(e, t) {
		var n = {};
		if (!t) return e;
		for (var r in e) n[r] = r in t ? t[r] : e[r];
		return n
	}
	function g(e) {
		return "[object Function]" == Object.prototype.toString.call(e)
	}
	function v(e, t, n) {
		t = t.split(" ");
		for (var r = 0, i = t.length; i > r; r++) e.addEventListener ? e.addEventListener(t[r], n, !1) : document.attachEvent && e.attachEvent("on" + t[r], n)
	}
	function y(e, t, n) {
		t = t.split(" ");
		for (var r = 0, i = t.length; i > r; r++) e.removeEventListener ? e.removeEventListener(t[r], n, !1) : document.detachEvent && e.detachEvent("on" + t[r], n)
	}
	var b = this,
		x = {
			prevent_default: !1,
			css_hacks: !0,
			swipe: !0,
			swipe_time: 200,
			swipe_min_distance: 20,
			drag: !0,
			drag_vertical: !0,
			drag_horizontal: !0,
			drag_min_distance: 20,
			transform: !0,
			scale_treshold: .1,
			rotation_treshold: 15,
			tap: !0,
			tap_double: !0,
			tap_max_interval: 300,
			tap_max_distance: 10,
			tap_double_distance: 20,
			hold: !0,
			hold_timeout: 500
		};
	t = m(x, t), function () {
		if (!t.css_hacks) return !1;
		for (var n = ["webkit", "moz", "ms", "o", ""], r = {
			userSelect: "none",
			touchCallout: "none",
			userDrag: "none",
			tapHighlightColor: "rgba(0,0,0,0)"
		}, i = "", o = 0; n.length > o; o++) for (var a in r) i = a, n[o] && (i = n[o] + i.substring(0, 1).toUpperCase() + i.substring(1)), e.style[i] = r[a]
	}();
	var w, T, k, C = 0,
		S = 0,
		E = 0,
		N = {},
		_ = 0,
		j = !1,
		A = null,
		L = null,
		D = null,
		F = {
			x: 0,
			y: 0
		},
		O = null,
		M = null,
		I = {},
		P = !1,
		H = "ontouchstart" in window;
	this.option = function (e, r) {
		return r != n && (t[e] = r), t[e]
	}, this.getDirectionFromAngle = function (e) {
		var t, n, r = {
			down: e >= 45 && 135 > e,
			left: e >= 135 || -135 >= e,
			up: -45 > e && e > -135,
			right: e >= -45 && 45 >= e
		};
		for (n in r) if (r[n]) {
			t = n;
			break
		}
		return t
	}, this.destroy = function () {
		H ? y(e, "touchstart touchmove touchend touchcancel", f) : (y(e, "mouseup mousedown mousemove", f), y(e, "mouseout", p))
	};
	var B = {
		hold: function (e) {
			t.hold && (A = "hold", clearTimeout(M), M = setTimeout(function () {
				"hold" == A && c("hold", {
					originalEvent: e,
					position: N.start
				})
			}, t.hold_timeout))
		},
		swipe: function (e) {
			if (N.move) {
				var n = N.move[0].x - N.start[0].x,
					r = N.move[0].y - N.start[0].y;
				C = Math.sqrt(n * n + r * r);
				var i = (new Date).getTime(),
					a = i - D;
				if (t.swipe && t.swipe_time > a && C > t.swipe_min_distance) {
					S = o(N.start[0], N.move[0]), E = b.getDirectionFromAngle(S), A = "swipe";
					var s = {
						x: N.move[0].x - I.left,
						y: N.move[0].y - I.top
					},
						l = {
							originalEvent: e,
							position: s,
							direction: E,
							distance: C,
							distanceX: n,
							distanceY: r,
							angle: S
						};
					c("swipe", l)
				}
			}
		},
		drag: function (e) {
			var n = N.move[0].x - N.start[0].x,
				r = N.move[0].y - N.start[0].y;
			if (C = Math.sqrt(n * n + r * r), t.drag && C > t.drag_min_distance || "drag" == A) {
				S = o(N.start[0], N.move[0]), E = b.getDirectionFromAngle(S);
				var i = "up" == E || "down" == E;
				if ((i && !t.drag_vertical || !i && !t.drag_horizontal) && C > t.drag_min_distance) return;
				A = "drag";
				var a = {
					x: N.move[0].x - I.left,
					y: N.move[0].y - I.top
				},
					s = {
						originalEvent: e,
						position: a,
						direction: E,
						distance: C,
						distanceX: n,
						distanceY: r,
						angle: S
					};
				j && (c("dragstart", s), j = !1), c("drag", s), u(e)
			}
		},
		transform: function (e) {
			if (t.transform) {
				if (2 != r(e)) return !1;
				var n = l(N.start, N.move),
					i = s(N.start, N.move);
				if ("drag" != A && ("transform" == A || Math.abs(1 - i) > t.scale_treshold || Math.abs(n) > t.rotation_treshold)) {
					A = "transform", N.center = {
						x: (N.move[0].x + N.move[1].x) / 2 - I.left,
						y: (N.move[0].y + N.move[1].y) / 2 - I.top
					};
					var o = {
						originalEvent: e,
						position: N.center,
						scale: i,
						rotation: n
					};
					return j && (c("transformstart", o), j = !1), c("transform", o), u(e), !0
				}
			}
			return !1
		},
		tap: function (e) {
			var n = (new Date).getTime(),
				r = n - D;
			if (!t.hold || t.hold && t.hold_timeout > r) {
				var i = function () {
					if (F && t.tap_double && "tap" == L && t.tap_max_interval > D - O) {
						var e = Math.abs(F[0].x - N.start[0].x),
							n = Math.abs(F[0].y - N.start[0].y);
						return F && N.start && Math.max(e, n) < t.tap_double_distance
					}
					return !1
				}();
				if (i) A = "double_tap", O = null, c("doubletap", {
					originalEvent: e,
					position: N.start
				}), u(e);
				else {
					var o = N.move ? Math.abs(N.move[0].x - N.start[0].x) : 0,
						a = N.move ? Math.abs(N.move[0].y - N.start[0].y) : 0;
					C = Math.max(o, a), t.tap_max_distance > C && (A = "tap", O = n, F = N.start, t.tap && (c("tap", {
						originalEvent: e,
						position: N.start
					}), u(e)))
				}
			}
		}
	};
	H ? v(e, "touchstart touchmove touchend touchcancel", f) : (v(e, "mouseup mousedown mousemove", f), v(e, "mouseout", p))
}(function (e, t) {
	function n(e) {
		return M.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
	}
	function r(e) {
		if (!bn[e]) {
			var t = D.body,
				n = M("<" + e + ">").appendTo(t),
				r = n.css("display");
			n.remove(), ("none" === r || "" === r) && (mn || (mn = D.createElement("iframe"), mn.frameBorder = mn.width = mn.height = 0), t.appendChild(mn), gn && mn.createElement || (gn = (mn.contentWindow || mn.contentDocument).document, gn.write((M.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), gn.close()), n = gn.createElement(e), gn.body.appendChild(n), r = M.css(n, "display"), t.removeChild(mn)), bn[e] = r
		}
		return bn[e]
	}
	function i(e, t) {
		var n = {};
		return M.each(Tn.concat.apply([], Tn.slice(0, t)), function () {
			n[this] = e
		}), n
	}
	function o() {
		yn = t
	}
	function a() {
		return setTimeout(o, 0), yn = M.now()
	}
	function s() {
		try {
			return new e.ActiveXObject("Microsoft.XMLHTTP")
		} catch (t) {}
	}
	function l() {
		try {
			return new e.XMLHttpRequest
		} catch (t) {}
	}
	function c(e, n) {
		e.dataFilter && (n = e.dataFilter(n, e.dataType));
		var r, i, o, a, s, l, c, u, d = e.dataTypes,
			f = {},
			p = d.length,
			h = d[0];
		for (r = 1; p > r; r++) {
			if (1 === r) for (i in e.converters)"string" == typeof i && (f[i.toLowerCase()] = e.converters[i]);
			if (a = h, h = d[r], "*" === h) h = a;
			else if ("*" !== a && a !== h) {
				if (s = a + " " + h, l = f[s] || f["* " + h], !l) {
					u = t;
					for (c in f) if (o = c.split(" "), (o[0] === a || "*" === o[0]) && (u = f[o[1] + " " + h])) {
						c = f[c], c === !0 ? l = u : u === !0 && (l = c);
						break
					}
				}!l && !u && M.error("No conversion from " + s.replace(" ", " to ")), l !== !0 && (n = l ? l(n) : u(c(n)))
			}
		}
		return n
	}
	function u(e, n, r) {
		var i, o, a, s, l = e.contents,
			c = e.dataTypes,
			u = e.responseFields;
		for (o in u) o in r && (n[u[o]] = r[o]);
		for (;
		"*" === c[0];) c.shift(), i === t && (i = e.mimeType || n.getResponseHeader("content-type"));
		if (i) for (o in l) if (l[o] && l[o].test(i)) {
			c.unshift(o);
			break
		}
		if (c[0] in r) a = c[0];
		else {
			for (o in r) {
				if (!c[0] || e.converters[o + " " + c[0]]) {
					a = o;
					break
				}
				s || (s = o)
			}
			a = a || s
		}
		return a ? (a !== c[0] && c.unshift(a), r[a]) : void 0
	}
	function d(e, t, n, r) {
		if (M.isArray(t)) M.each(t, function (t, i) {
			n || Rt.test(e) ? r(e, i) : d(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
		});
		else if (n || "object" !== M.type(t)) r(e, t);
		else for (var i in t) d(e + "[" + i + "]", t[i], n, r)
	}
	function f(e, n) {
		var r, i, o = M.ajaxSettings.flatOptions || {};
		for (r in n) n[r] !== t && ((o[r] ? e : i || (i = {}))[r] = n[r]);
		i && M.extend(!0, e, i)
	}
	function p(e, n, r, i, o, a) {
		o = o || n.dataTypes[0], a = a || {}, a[o] = !0;
		for (var s, l = e[o], c = 0, u = l ? l.length : 0, d = e === an; u > c && (d || !s); c++) s = l[c](n, r, i), "string" == typeof s && (!d || a[s] ? s = t : (n.dataTypes.unshift(s), s = p(e, n, r, i, s, a)));
		return (d || !s) && !a["*"] && (s = p(e, n, r, i, "*", a)), s
	}
	function h(e) {
		return function (t, n) {
			if ("string" != typeof t && (n = t, t = "*"), M.isFunction(n)) for (var r, i, o, a = t.toLowerCase().split(tn), s = 0, l = a.length; l > s; s++) r = a[s], o = /^\+/.test(r), o && (r = r.substr(1) || "*"), i = e[r] = e[r] || [], i[o ? "unshift" : "push"](n)
		}
	}
	function m(e, t, n) {
		var r = "width" === t ? e.offsetWidth : e.offsetHeight,
			i = "width" === t ? 1 : 0,
			o = 4;
		if (r > 0) {
			if ("border" !== n) for (; o > i; i += 2) n || (r -= parseFloat(M.css(e, "padding" + Wt[i])) || 0), "margin" === n ? r += parseFloat(M.css(e, n + Wt[i])) || 0 : r -= parseFloat(M.css(e, "border" + Wt[i] + "Width")) || 0;
			return r + "px"
		}
		if (r = jt(e, t), (0 > r || null == r) && (r = e.style[t]), It.test(r)) return r;
		if (r = parseFloat(r) || 0, n) for (; o > i; i += 2) r += parseFloat(M.css(e, "padding" + Wt[i])) || 0, "padding" !== n && (r += parseFloat(M.css(e, "border" + Wt[i] + "Width")) || 0), "margin" === n && (r += parseFloat(M.css(e, n + Wt[i])) || 0);
		return r + "px"
	}
	function g(e) {
		var t = D.createElement("div");
		return _t.appendChild(t), t.innerHTML = e.outerHTML, t.firstChild
	}
	function v(e) {
		var t = (e.nodeName || "").toLowerCase();
		"input" === t ? y(e) : "script" !== t && e.getElementsByTagName !== void 0 && M.grep(e.getElementsByTagName("input"), y)
	}
	function y(e) {
		("checkbox" === e.type || "radio" === e.type) && (e.defaultChecked = e.checked)
	}
	function b(e) {
		return e.getElementsByTagName !== void 0 ? e.getElementsByTagName("*") : e.querySelectorAll !== void 0 ? e.querySelectorAll("*") : []
	}
	function x(e, t) {
		var n;
		1 === t.nodeType && (t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), "object" === n ? t.outerHTML = e.outerHTML : "input" !== n || "checkbox" !== e.type && "radio" !== e.type ? "option" === n ? t.selected = e.defaultSelected : "input" === n || "textarea" === n ? t.defaultValue = e.defaultValue : "script" === n && t.text !== e.text && (t.text = e.text) : (e.checked && (t.defaultChecked = t.checked = e.checked), t.value !== e.value && (t.value = e.value)), t.removeAttribute(M.expando), t.removeAttribute("_submit_attached"), t.removeAttribute("_change_attached"))
	}
	function w(e, t) {
		if (1 === t.nodeType && M.hasData(e)) {
			var n, r, i, o = M._data(e),
				a = M._data(t, o),
				s = o.events;
			if (s) {
				delete a.handle, a.events = {};
				for (n in s) for (r = 0, i = s[n].length; i > r; r++) M.event.add(t, n, s[n][r])
			}
			a.data && (a.data = M.extend({}, a.data))
		}
	}
	function T(e) {
		return M.nodeName(e, "table") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
	}
	function k(e) {
		var t = ht.split("|"),
			n = e.createDocumentFragment();
		if (n.createElement) for (; t.length;) n.createElement(t.pop());
		return n
	}
	function C(e, t, n) {
		if (t = t || 0, M.isFunction(t)) return M.grep(e, function (e, r) {
			var i = !! t.call(e, r, e);
			return i === n
		});
		if (t.nodeType) return M.grep(e, function (e) {
			return e === t === n
		});
		if ("string" == typeof t) {
			var r = M.grep(e, function (e) {
				return 1 === e.nodeType
			});
			if (ut.test(t)) return M.filter(t, r, !n);
			t = M.filter(t, r)
		}
		return M.grep(e, function (e) {
			return M.inArray(e, t) >= 0 === n
		})
	}
	function S(e) {
		return !e || !e.parentNode || 11 === e.parentNode.nodeType
	}
	function E() {
		return !0
	}
	function N() {
		return !1
	}
	function _(e, t, n) {
		var r = t + "defer",
			i = t + "queue",
			o = t + "mark",
			a = M._data(e, r);
		!(!a || "queue" !== n && M._data(e, i) || "mark" !== n && M._data(e, o) || !setTimeout(function () {
			!M._data(e, i) && !M._data(e, o) && (M.removeData(e, r, !0), a.fire())
		}, 0))
	}
	function j(e) {
		for (var t in e) if (("data" !== t || !M.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
		return !0
	}
	function A(e, n, r) {
		if (r === t && 1 === e.nodeType) {
			var i = "data-" + n.replace(B, "-$1").toLowerCase();
			if (r = e.getAttribute(i), "string" == typeof r) {
				try {
					r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : M.isNumeric(r) ? +r : H.test(r) ? M.parseJSON(r) : r
				} catch (o) {}
				M.data(e, n, r)
			} else r = t
		}
		return r
	}
	function L(e) {
		var t, n, r = I[e] = {};
		for (e = e.split(/\s+/), t = 0, n = e.length; n > t; t++) r[e[t]] = !0;
		return r
	}
	var D = e.document,
		F = e.navigator,
		O = e.location,
		M = function () {
			function n() {
				if (!s.isReady) {
					try {
						D.documentElement.doScroll("left")
					} catch (e) {
						return setTimeout(n, 1), void 0
					}
					s.ready()
				}
			}
			var r, i, o, a, s = function (e, t) {
				return new s.fn.init(e, t, r)
			},
				l = e.jQuery,
				c = e.$,
				u = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
				d = /\S/,
				f = /^\s+/,
				p = /\s+$/,
				h = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
				m = /^[\],:{}\s]*$/,
				g = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
				v = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
				y = /(?:^|:|,)(?:\s*\[)+/g,
				b = /(webkit)[ \/]([\w.]+)/,
				x = /(opera)(?:.*version)?[ \/]([\w.]+)/,
				w = /(msie) ([\w.]+)/,
				T = /(mozilla)(?:.*? rv:([\w.]+))?/,
				k = /-([a-z]|[0-9])/gi,
				C = /^-ms-/,
				S = function (e, t) {
					return (t + "").toUpperCase()
				},
				E = F.userAgent,
				N = Object.prototype.toString,
				_ = Object.prototype.hasOwnProperty,
				j = Array.prototype.push,
				A = Array.prototype.slice,
				L = String.prototype.trim,
				O = Array.prototype.indexOf,
				M = {};
			return s.fn = s.prototype = {
				constructor: s,
				init: function (e, n, r) {
					var i, o, a, l;
					if (!e) return this;
					if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;
					if ("body" === e && !n && D.body) return this.context = D, this[0] = D.body, this.selector = e, this.length = 1, this;
					if ("string" == typeof e) {
						if (i = "<" !== e.charAt(0) || ">" !== e.charAt(e.length - 1) || 3 > e.length ? u.exec(e) : [null, e, null], i && (i[1] || !n)) {
							if (i[1]) return n = n instanceof s ? n[0] : n, l = n ? n.ownerDocument || n : D, a = h.exec(e), a ? s.isPlainObject(n) ? (e = [D.createElement(a[1])], s.fn.attr.call(e, n, !0)) : e = [l.createElement(a[1])] : (a = s.buildFragment([i[1]], [l]), e = (a.cacheable ? s.clone(a.fragment) : a.fragment).childNodes), s.merge(this, e);
							if (o = D.getElementById(i[2]), o && o.parentNode) {
								if (o.id !== i[2]) return r.find(e);
								this.length = 1, this[0] = o
							}
							return this.context = D, this.selector = e, this
						}
						return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e)
					}
					return s.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), s.makeArray(e, this))
				},
				selector: "",
				jquery: "1.7.2",
				length: 0,
				size: function () {
					return this.length
				},
				toArray: function () {
					return A.call(this, 0)
				},
				get: function (e) {
					return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
				},
				pushStack: function (e, t, n) {
					var r = this.constructor();
					return s.isArray(e) ? j.apply(r, e) : s.merge(r, e), r.prevObject = this, r.context = this.context, "find" === t ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r
				},
				each: function (e, t) {
					return s.each(this, e, t)
				},
				ready: function (e) {
					return s.bindReady(), o.add(e), this
				},
				eq: function (e) {
					return e = +e, -1 === e ? this.slice(e) : this.slice(e, e + 1)
				},
				first: function () {
					return this.eq(0)
				},
				last: function () {
					return this.eq(-1)
				},
				slice: function () {
					return this.pushStack(A.apply(this, arguments), "slice", A.call(arguments).join(","))
				},
				map: function (e) {
					return this.pushStack(s.map(this, function (t, n) {
						return e.call(t, n, t)
					}))
				},
				end: function () {
					return this.prevObject || this.constructor(null)
				},
				push: j,
				sort: [].sort,
				splice: [].splice
			}, s.fn.init.prototype = s.fn, s.extend = s.fn.extend = function () {
				var e, n, r, i, o, a, l = arguments[0] || {},
					c = 1,
					u = arguments.length,
					d = !1;
				for ("boolean" == typeof l && (d = l, l = arguments[1] || {}, c = 2), "object" != typeof l && !s.isFunction(l) && (l = {}), u === c && (l = this, --c); u > c; c++) if (null != (e = arguments[c])) for (n in e) r = l[n], i = e[n], l !== i && (d && i && (s.isPlainObject(i) || (o = s.isArray(i))) ? (o ? (o = !1, a = r && s.isArray(r) ? r : []) : a = r && s.isPlainObject(r) ? r : {}, l[n] = s.extend(d, a, i)) : i !== t && (l[n] = i));
				return l
			}, s.extend({
				noConflict: function (t) {
					return e.$ === s && (e.$ = c), t && e.jQuery === s && (e.jQuery = l), s
				},
				isReady: !1,
				readyWait: 1,
				holdReady: function (e) {
					e ? s.readyWait++ : s.ready(!0)
				},
				ready: function (e) {
					if (e === !0 && !--s.readyWait || e !== !0 && !s.isReady) {
						if (!D.body) return setTimeout(s.ready, 1);
						if (s.isReady = !0, e !== !0 && --s.readyWait > 0) return;
						o.fireWith(D, [s]), s.fn.trigger && s(D).trigger("ready").off("ready")
					}
				},
				bindReady: function () {
					if (!o) {
						if (o = s.Callbacks("once memory"), "complete" === D.readyState) return setTimeout(s.ready, 1);
						if (D.addEventListener) D.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", s.ready, !1);
						else if (D.attachEvent) {
							D.attachEvent("onreadystatechange", a), e.attachEvent("onload", s.ready);
							var t = !1;
							try {
								t = null == e.frameElement
							} catch (r) {}
							D.documentElement.doScroll && t && n()
						}
					}
				},
				isFunction: function (e) {
					return "function" === s.type(e)
				},
				isArray: Array.isArray ||
				function (e) {
					return "array" === s.type(e)
				},
				isWindow: function (e) {
					return null != e && e == e.window
				},
				isNumeric: function (e) {
					return !isNaN(parseFloat(e)) && isFinite(e)
				},
				type: function (e) {
					return null == e ? e + "" : M[N.call(e)] || "object"
				},
				isPlainObject: function (e) {
					if (!e || "object" !== s.type(e) || e.nodeType || s.isWindow(e)) return !1;
					try {
						if (e.constructor && !_.call(e, "constructor") && !_.call(e.constructor.prototype, "isPrototypeOf")) return !1
					} catch (n) {
						return !1
					}
					var r;
					for (r in e);
					return r === t || _.call(e, r)
				},
				isEmptyObject: function (e) {
					for (var t in e) return !1;
					return !0
				},
				error: function (e) {
					throw Error(e)
				},
				parseJSON: function (t) {
					return "string" == typeof t && t ? (t = s.trim(t), e.JSON && e.JSON.parse ? e.JSON.parse(t) : m.test(t.replace(g, "@").replace(v, "]").replace(y, "")) ? Function("return " + t)() : (s.error("Invalid JSON: " + t), void 0)) : null
				},
				parseXML: function (n) {
					if ("string" != typeof n || !n) return null;
					var r, i;
					try {
						e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
					} catch (o) {
						r = t
					}
					return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && s.error("Invalid XML: " + n), r
				},
				noop: function () {},
				globalEval: function (t) {
					t && d.test(t) && (e.execScript ||
					function (t) {
						e.eval.call(e, t)
					})(t)
				},
				camelCase: function (e) {
					return e.replace(C, "ms-").replace(k, S)
				},
				nodeName: function (e, t) {
					return e.nodeName && e.nodeName.toUpperCase() === t.toUpperCase()
				},
				each: function (e, n, r) {
					var i, o = 0,
						a = e.length,
						l = a === t || s.isFunction(e);
					if (r) if (l) {
						for (i in e) if (n.apply(e[i], r) === !1) break
					} else for (; a > o && n.apply(e[o++], r) !== !1;);
					else if (l) {
						for (i in e) if (n.call(e[i], i, e[i]) === !1) break
					} else for (; a > o && n.call(e[o], o, e[o++]) !== !1;);
					return e
				},
				trim: L ?
				function (e) {
					return null == e ? "" : L.call(e)
				} : function (e) {
					return null == e ? "" : (e + "").replace(f, "").replace(p, "")
				},
				makeArray: function (e, t) {
					var n = t || [];
					if (null != e) {
						var r = s.type(e);
						null == e.length || "string" === r || "function" === r || "regexp" === r || s.isWindow(e) ? j.call(n, e) : s.merge(n, e)
					}
					return n
				},
				inArray: function (e, t, n) {
					var r;
					if (t) {
						if (O) return O.call(t, e, n);
						for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) if (n in t && t[n] === e) return n
					}
					return -1
				},
				merge: function (e, n) {
					var r = e.length,
						i = 0;
					if ("number" == typeof n.length) for (var o = n.length; o > i; i++) e[r++] = n[i];
					else for (; n[i] !== t;) e[r++] = n[i++];
					return e.length = r, e
				},
				grep: function (e, t, n) {
					var r, i = [];
					n = !! n;
					for (var o = 0, a = e.length; a > o; o++) r = !! t(e[o], o), n !== r && i.push(e[o]);
					return i
				},
				map: function (e, n, r) {
					var i, o, a = [],
						l = 0,
						c = e.length,
						u = e instanceof s || c !== t && "number" == typeof c && (c > 0 && e[0] && e[c - 1] || 0 === c || s.isArray(e));
					if (u) for (; c > l; l++) i = n(e[l], l, r), null != i && (a[a.length] = i);
					else for (o in e) i = n(e[o], o, r), null != i && (a[a.length] = i);
					return a.concat.apply([], a)
				},
				guid: 1,
				proxy: function (e, n) {
					if ("string" == typeof n) {
						var r = e[n];
						n = e, e = r
					}
					if (!s.isFunction(e)) return t;
					var i = A.call(arguments, 2),
						o = function () {
							return e.apply(n, i.concat(A.call(arguments)))
						};
					return o.guid = e.guid = e.guid || o.guid || s.guid++, o
				},
				access: function (e, n, r, i, o, a, l) {
					var c, u = null == r,
						d = 0,
						f = e.length;
					if (r && "object" == typeof r) {
						for (d in r) s.access(e, n, d, r[d], 1, a, i);
						o = 1
					} else if (i !== t) {
						if (c = l === t && s.isFunction(i), u && (c ? (c = n, n = function (e, t, n) {
							return c.call(s(e), n)
						}) : (n.call(e, i), n = null)), n) for (; f > d; d++) n(e[d], r, c ? i.call(e[d], d, n(e[d], r)) : i, l);
						o = 1
					}
					return o ? e : u ? n.call(e) : f ? n(e[0], r) : a
				},
				now: function () {
					return (new Date).getTime()
				},
				uaMatch: function (e) {
					e = e.toLowerCase();
					var t = b.exec(e) || x.exec(e) || w.exec(e) || 0 > e.indexOf("compatible") && T.exec(e) || [];
					return {
						browser: t[1] || "",
						version: t[2] || "0"
					}
				},
				sub: function () {
					function e(t, n) {
						return new e.fn.init(t, n)
					}
					s.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function (n, r) {
						return r && r instanceof s && !(r instanceof e) && (r = e(r)), s.fn.init.call(this, n, r, t)
					}, e.fn.init.prototype = e.fn;
					var t = e(D);
					return e
				},
				browser: {}
			}), s.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (e, t) {
				M["[object " + t + "]"] = t.toLowerCase()
			}), i = s.uaMatch(E), i.browser && (s.browser[i.browser] = !0, s.browser.version = i.version), s.browser.webkit && (s.browser.safari = !0), d.test(" ") && (f = /^[\s\xA0]+/, p = /[\s\xA0]+$/), r = s(D), D.addEventListener ? a = function () {
				D.removeEventListener("DOMContentLoaded", a, !1), s.ready()
			} : D.attachEvent && (a = function () {
				"complete" === D.readyState && (D.detachEvent("onreadystatechange", a), s.ready())
			}), s
		}(),
		I = {};
	M.Callbacks = function (e) {
		e = e ? I[e] || L(e) : {};
		var n, r, i, o, a, s, l = [],
			c = [],
			u = function (t) {
				var n, r, i, o;
				for (n = 0, r = t.length; r > n; n++) i = t[n], o = M.type(i), "array" === o ? u(i) : "function" === o && (!e.unique || !f.has(i)) && l.push(i)
			},
			d = function (t, u) {
				for (u = u || [], n = !e.memory || [t, u], r = !0, i = !0, s = o || 0, o = 0, a = l.length; l && a > s; s++) if (l[s].apply(t, u) === !1 && e.stopOnFalse) {
					n = !0;
					break
				}
				i = !1, l && (e.once ? n === !0 ? f.disable() : l = [] : c && c.length && (n = c.shift(), f.fireWith(n[0], n[1])))
			},
			f = {
				add: function () {
					if (l) {
						var e = l.length;
						u(arguments), i ? a = l.length : n && n !== !0 && (o = e, d(n[0], n[1]))
					}
					return this
				},
				remove: function () {
					if (l) for (var t = arguments, n = 0, r = t.length; r > n; n++) for (var o = 0; l.length > o && (t[n] !== l[o] || (i && a >= o && (a--, s >= o && s--), l.splice(o--, 1), !e.unique)); o++);
					return this
				},
				has: function (e) {
					if (l) for (var t = 0, n = l.length; n > t; t++) if (e === l[t]) return !0;
					return !1
				},
				empty: function () {
					return l = [], this
				},
				disable: function () {
					return l = c = n = t, this
				},
				disabled: function () {
					return !l
				},
				lock: function () {
					return c = t, (!n || n === !0) && f.disable(), this
				},
				locked: function () {
					return !c
				},
				fireWith: function (t, r) {
					return c && (i ? e.once || c.push([t, r]) : (!e.once || !n) && d(t, r)), this
				},
				fire: function () {
					return f.fireWith(this, arguments), this
				},
				fired: function () {
					return !!r
				}
			};
		return f
	};
	var P = [].slice;
	M.extend({
		Deferred: function (e) {
			var t, n = M.Callbacks("once memory"),
				r = M.Callbacks("once memory"),
				i = M.Callbacks("memory"),
				o = "pending",
				a = {
					resolve: n,
					reject: r,
					notify: i
				},
				s = {
					done: n.add,
					fail: r.add,
					progress: i.add,
					state: function () {
						return o
					},
					isResolved: n.fired,
					isRejected: r.fired,
					then: function (e, t, n) {
						return l.done(e).fail(t).progress(n), this
					},
					always: function () {
						return l.done.apply(l, arguments).fail.apply(l, arguments), this
					},
					pipe: function (e, t, n) {
						return M.Deferred(function (r) {
							M.each({
								done: [e, "resolve"],
								fail: [t, "reject"],
								progress: [n, "notify"]
							}, function (e, t) {
								var n, i = t[0],
									o = t[1];
								M.isFunction(i) ? l[e](function () {
									n = i.apply(this, arguments), n && M.isFunction(n.promise) ? n.promise().then(r.resolve, r.reject, r.notify) : r[o + "With"](this === l ? r : this, [n])
								}) : l[e](r[o])
							})
						}).promise()
					},
					promise: function (e) {
						if (null == e) e = s;
						else for (var t in s) e[t] = s[t];
						return e
					}
				},
				l = s.promise({});
			for (t in a) l[t] = a[t].fire, l[t + "With"] = a[t].fireWith;
			return l.done(function () {
				o = "resolved"
			}, r.disable, i.lock).fail(function () {
				o = "rejected"
			}, n.disable, i.lock), e && e.call(l, l), l
		},
		when: function (e) {
			function t(e) {
				return function (t) {
					a[e] = arguments.length > 1 ? P.call(arguments, 0) : t, l.notifyWith(c, a)
				}
			}
			function n(e) {
				return function (t) {
					r[e] = arguments.length > 1 ? P.call(arguments, 0) : t, --s || l.resolveWith(l, r)
				}
			}
			var r = P.call(arguments, 0),
				i = 0,
				o = r.length,
				a = Array(o),
				s = o,
				l = 1 >= o && e && M.isFunction(e.promise) ? e : M.Deferred(),
				c = l.promise();
			if (o > 1) {
				for (; o > i; i++) r[i] && r[i].promise && M.isFunction(r[i].promise) ? r[i].promise().then(n(i), l.reject, t(i)) : --s;
				s || l.resolveWith(l, r)
			} else l !== e && l.resolveWith(l, o ? [e] : []);
			return c
		}
	}), M.support = function () {
		var t, n, r, i, o, a, s, l, c, u, d, f = D.createElement("div");
		if (D.documentElement, f.setAttribute("className", "t"), f.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", n = f.getElementsByTagName("*"), r = f.getElementsByTagName("a")[0], !n || !n.length || !r) return {};
		i = D.createElement("select"), o = i.appendChild(D.createElement("option")), a = f.getElementsByTagName("input")[0], t = {
			leadingWhitespace: 3 === f.firstChild.nodeType,
			tbody: !f.getElementsByTagName("tbody").length,
			htmlSerialize: !! f.getElementsByTagName("link").length,
			style: /top/.test(r.getAttribute("style")),
			hrefNormalized: "/a" === r.getAttribute("href"),
			opacity: /^0.55/.test(r.style.opacity),
			cssFloat: !! r.style.cssFloat,
			checkOn: "on" === a.value,
			optSelected: o.selected,
			getSetAttribute: "t" !== f.className,
			enctype: !! D.createElement("form").enctype,
			html5Clone: "<:nav></:nav>" !== D.createElement("nav").cloneNode(!0).outerHTML,
			submitBubbles: !0,
			changeBubbles: !0,
			focusinBubbles: !1,
			deleteExpando: !0,
			noCloneEvent: !0,
			inlineBlockNeedsLayout: !1,
			shrinkWrapBlocks: !1,
			reliableMarginRight: !0,
			pixelMargin: !0
		}, M.boxModel = t.boxModel = "CSS1Compat" === D.compatMode, a.checked = !0, t.noCloneChecked = a.cloneNode(!0).checked, i.disabled = !0, t.optDisabled = !o.disabled;
		try {
			delete f.test
		} catch (p) {
			t.deleteExpando = !1
		}
		if (!f.addEventListener && f.attachEvent && f.fireEvent && (f.attachEvent("onclick", function () {
			t.noCloneEvent = !1
		}), f.cloneNode(!0).fireEvent("onclick")), a = D.createElement("input"), a.value = "t", a.setAttribute("type", "radio"), t.radioValue = "t" === a.value, a.setAttribute("checked", "checked"), a.setAttribute("name", "t"), f.appendChild(a), s = D.createDocumentFragment(), s.appendChild(f.lastChild), t.checkClone = s.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = a.checked, s.removeChild(a), s.appendChild(f), f.attachEvent) for (u in {
			submit: 1,
			change: 1,
			focusin: 1
		}) c = "on" + u, d = c in f, d || (f.setAttribute(c, "return;"), d = "function" == typeof f[c]), t[u + "Bubbles"] = d;
		return s.removeChild(f), s = i = o = f = a = null, M(function () {
			var n, r, i, o, a, s, c, u, p, h, m, g, v = D.getElementsByTagName("body")[0];
			!v || (c = 1, g = "padding:0;margin:0;border:", h = "position:absolute;top:0;left:0;width:1px;height:1px;", m = g + "0;visibility:hidden;", u = "style='" + h + g + "5px solid #000;", p = "<div " + u + "display:block;'><div style='" + g + "0;display:block;overflow:hidden;'></div></div>" + "<table " + u + "' cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", n = D.createElement("div"), n.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + c + "px", v.insertBefore(n, v.firstChild), f = D.createElement("div"), n.appendChild(f), f.innerHTML = "<table><tr><td style='" + g + "0;display:none'></td><td>t</td></tr></table>", l = f.getElementsByTagName("td"), d = 0 === l[0].offsetHeight, l[0].style.display = "", l[1].style.display = "none", t.reliableHiddenOffsets = d && 0 === l[0].offsetHeight, e.getComputedStyle && (f.innerHTML = "", s = D.createElement("div"), s.style.width = "0", s.style.marginRight = "0", f.style.width = "2px", f.appendChild(s), t.reliableMarginRight = 0 === (parseInt((e.getComputedStyle(s, null) || {
				marginRight: 0
			}).marginRight, 10) || 0)), f.style.zoom !== void 0 && (f.innerHTML = "", f.style.width = f.style.padding = "1px", f.style.border = 0, f.style.overflow = "hidden", f.style.display = "inline", f.style.zoom = 1, t.inlineBlockNeedsLayout = 3 === f.offsetWidth, f.style.display = "block", f.style.overflow = "visible", f.innerHTML = "<div style='width:5px;'></div>", t.shrinkWrapBlocks = 3 !== f.offsetWidth), f.style.cssText = h + m, f.innerHTML = p, r = f.firstChild, i = r.firstChild, o = r.nextSibling.firstChild.firstChild, a = {
				doesNotAddBorder: 5 !== i.offsetTop,
				doesAddBorderForTableAndCells: 5 === o.offsetTop
			}, i.style.position = "fixed", i.style.top = "20px", a.fixedPosition = 20 === i.offsetTop || 15 === i.offsetTop, i.style.position = i.style.top = "", r.style.overflow = "hidden", r.style.position = "relative", a.subtractsBorderForOverflowNotVisible = -5 === i.offsetTop, a.doesNotIncludeMarginInBodyOffset = v.offsetTop !== c, e.getComputedStyle && (f.style.marginTop = "1%", t.pixelMargin = "1%" !== (e.getComputedStyle(f, null) || {
				marginTop: 0
			}).marginTop), n.style.zoom !== void 0 && (n.style.zoom = 1), v.removeChild(n), s = f = n = null, M.extend(t, a))
		}), t
	}();
	var H = /^(?:\{.*\}|\[.*\])$/,
		B = /([A-Z])/g;
	M.extend({
		cache: {},
		uuid: 0,
		expando: "jQuery" + (M.fn.jquery + Math.random()).replace(/\D/g, ""),
		noData: {
			embed: !0,
			object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			applet: !0
		},
		hasData: function (e) {
			return e = e.nodeType ? M.cache[e[M.expando]] : e[M.expando], !! e && !j(e)
		},
		data: function (e, n, r, i) {
			if (M.acceptData(e)) {
				var o, a, s, l = M.expando,
					c = "string" == typeof n,
					u = e.nodeType,
					d = u ? M.cache : e,
					f = u ? e[l] : e[l] && l,
					p = "events" === n;
				if (!(f && d[f] && (p || i || d[f].data) || !c || r !== t)) return;
				return f || (u ? e[l] = f = ++M.uuid : f = l), d[f] || (d[f] = {}, u || (d[f].toJSON = M.noop)), ("object" == typeof n || "function" == typeof n) && (i ? d[f] = M.extend(d[f], n) : d[f].data = M.extend(d[f].data, n)), o = a = d[f], i || (a.data || (a.data = {}), a = a.data), r !== t && (a[M.camelCase(n)] = r), p && !a[n] ? o.events : (c ? (s = a[n], null == s && (s = a[M.camelCase(n)])) : s = a, s)
			}
		},
		removeData: function (e, t, n) {
			if (M.acceptData(e)) {
				var r, i, o, a = M.expando,
					s = e.nodeType,
					l = s ? M.cache : e,
					c = s ? e[a] : a;
				if (!l[c]) return;
				if (t && (r = n ? l[c] : l[c].data)) {
					M.isArray(t) || (t in r ? t = [t] : (t = M.camelCase(t), t = t in r ? [t] : t.split(" ")));
					for (i = 0, o = t.length; o > i; i++) delete r[t[i]];
					if (!(n ? j : M.isEmptyObject)(r)) return
				}
				if (!n && (delete l[c].data, !j(l[c]))) return;
				M.support.deleteExpando || !l.setInterval ? delete l[c] : l[c] = null, s && (M.support.deleteExpando ? delete e[a] : e.removeAttribute ? e.removeAttribute(a) : e[a] = null)
			}
		},
		_data: function (e, t, n) {
			return M.data(e, t, n, !0)
		},
		acceptData: function (e) {
			if (e.nodeName) {
				var t = M.noData[e.nodeName.toLowerCase()];
				if (t) return t !== !0 && e.getAttribute("classid") === t
			}
			return !0
		}
	}), M.fn.extend({
		data: function (e, n) {
			var r, i, o, a, s, l = this[0],
				c = 0,
				u = null;
			if (e === t) {
				if (this.length && (u = M.data(l), 1 === l.nodeType && !M._data(l, "parsedAttrs"))) {
					for (o = l.attributes, s = o.length; s > c; c++) a = o[c].name, 0 === a.indexOf("data-") && (a = M.camelCase(a.substring(5)), A(l, a, u[a]));
					M._data(l, "parsedAttrs", !0)
				}
				return u
			}
			return "object" == typeof e ? this.each(function () {
				M.data(this, e)
			}) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", M.access(this, function (n) {
				return n === t ? (u = this.triggerHandler("getData" + i, [r[0]]), u === t && l && (u = M.data(l, e), u = A(l, e, u)), u === t && r[1] ? this.data(r[0]) : u) : (r[1] = n, this.each(function () {
					var t = M(this);
					t.triggerHandler("setData" + i, r), M.data(this, e, n), t.triggerHandler("changeData" + i, r)
				}), void 0)
			}, null, n, arguments.length > 1, null, !1))
		},
		removeData: function (e) {
			return this.each(function () {
				M.removeData(this, e)
			})
		}
	}), M.extend({
		_mark: function (e, t) {
			e && (t = (t || "fx") + "mark", M._data(e, t, (M._data(e, t) || 0) + 1))
		},
		_unmark: function (e, t, n) {
			if (e !== !0 && (n = t, t = e, e = !1), t) {
				n = n || "fx";
				var r = n + "mark",
					i = e ? 0 : (M._data(t, r) || 1) - 1;
				i ? M._data(t, r, i) : (M.removeData(t, r, !0), _(t, n, "mark"))
			}
		},
		queue: function (e, t, n) {
			var r;
			return e ? (t = (t || "fx") + "queue", r = M._data(e, t), n && (!r || M.isArray(n) ? r = M._data(e, t, M.makeArray(n)) : r.push(n)), r || []) : void 0
		},
		dequeue: function (e, t) {
			t = t || "fx";
			var n = M.queue(e, t),
				r = n.shift(),
				i = {};
			"inprogress" === r && (r = n.shift()), r && ("fx" === t && n.unshift("inprogress"), M._data(e, t + ".run", i), r.call(e, function () {
				M.dequeue(e, t)
			}, i)), n.length || (M.removeData(e, t + "queue " + t + ".run", !0), _(e, t, "queue"))
		}
	}), M.fn.extend({
		queue: function (e, n) {
			var r = 2;
			return "string" != typeof e && (n = e, e = "fx", r--), r > arguments.length ? M.queue(this[0], e) : n === t ? this : this.each(function () {
				var t = M.queue(this, e, n);
				"fx" === e && "inprogress" !== t[0] && M.dequeue(this, e)
			})
		},
		dequeue: function (e) {
			return this.each(function () {
				M.dequeue(this, e)
			})
		},
		delay: function (e, t) {
			return e = M.fx ? M.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
				var r = setTimeout(t, e);
				n.stop = function () {
					clearTimeout(r)
				}
			})
		},
		clearQueue: function (e) {
			return this.queue(e || "fx", [])
		},
		promise: function (e, n) {
			function r() {
				--l || o.resolveWith(a, [a])
			}
			"string" != typeof e && (n = e, e = t), e = e || "fx";
			for (var i, o = M.Deferred(), a = this, s = a.length, l = 1, c = e + "defer", u = e + "queue", d = e + "mark"; s--;)(i = M.data(a[s], c, t, !0) || (M.data(a[s], u, t, !0) || M.data(a[s], d, t, !0)) && M.data(a[s], c, M.Callbacks("once memory"), !0)) && (l++, i.add(r));
			return r(), o.promise(n)
		}
	});
	var W, q, $, z = /[\n\t\r]/g,
		R = /\s+/,
		U = /\r/g,
		X = /^(?:button|input)$/i,
		V = /^(?:button|input|object|select|textarea)$/i,
		Y = /^a(?:rea)?$/i,
		Q = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
		K = M.support.getSetAttribute;
	M.fn.extend({
		attr: function (e, t) {
			return M.access(this, M.attr, e, t, arguments.length > 1)
		},
		removeAttr: function (e) {
			return this.each(function () {
				M.removeAttr(this, e)
			})
		},
		prop: function (e, t) {
			return M.access(this, M.prop, e, t, arguments.length > 1)
		},
		removeProp: function (e) {
			return e = M.propFix[e] || e, this.each(function () {
				try {
					this[e] = t, delete this[e]
				} catch (n) {}
			})
		},
		addClass: function (e) {
			var t, n, r, i, o, a, s;
			if (M.isFunction(e)) return this.each(function (t) {
				M(this).addClass(e.call(this, t, this.className))
			});
			if (e && "string" == typeof e) for (t = e.split(R), n = 0, r = this.length; r > n; n++) if (i = this[n], 1 === i.nodeType) if (i.className || 1 !== t.length) {
				for (o = " " + i.className + " ", a = 0, s = t.length; s > a; a++)~o.indexOf(" " + t[a] + " ") || (o += t[a] + " ");
				i.className = M.trim(o)
			} else i.className = e;
			return this
		},
		removeClass: function (e) {
			var n, r, i, o, a, s, l;
			if (M.isFunction(e)) return this.each(function (t) {
				M(this).removeClass(e.call(this, t, this.className))
			});
			if (e && "string" == typeof e || e === t) for (n = (e || "").split(R), r = 0, i = this.length; i > r; r++) if (o = this[r], 1 === o.nodeType && o.className) if (e) {
				for (a = (" " + o.className + " ").replace(z, " "), s = 0, l = n.length; l > s; s++) a = a.replace(" " + n[s] + " ", " ");
				o.className = M.trim(a)
			} else o.className = "";
			return this
		},
		toggleClass: function (e, t) {
			var n = typeof e,
				r = "boolean" == typeof t;
			return M.isFunction(e) ? this.each(function (n) {
				M(this).toggleClass(e.call(this, n, this.className, t), t)
			}) : this.each(function () {
				if ("string" === n) for (var i, o = 0, a = M(this), s = t, l = e.split(R); i = l[o++];) s = r ? s : !a.hasClass(i), a[s ? "addClass" : "removeClass"](i);
				else("undefined" === n || "boolean" === n) && (this.className && M._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : M._data(this, "__className__") || "")
			})
		},
		hasClass: function (e) {
			for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(z, " ").indexOf(t) > -1) return !0;
			return !1
		},
		val: function (e) {
			var n, r, i, o = this[0];
			return arguments.length ? (i = M.isFunction(e), this.each(function (r) {
				var o, a = M(this);
				1 === this.nodeType && (o = i ? e.call(this, r, a.val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : M.isArray(o) && (o = M.map(o, function (e) {
					return null == e ? "" : e + ""
				})), n = M.valHooks[this.type] || M.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, o, "value") !== t || (this.value = o))
			})) : o ? (n = M.valHooks[o.type] || M.valHooks[o.nodeName.toLowerCase()], n && "get" in n && (r = n.get(o, "value")) !== t ? r : (r = o.value, "string" == typeof r ? r.replace(U, "") : null == r ? "" : r)) : void 0
		}
	}), M.extend({
		valHooks: {
			option: {
				get: function (e) {
					var t = e.attributes.value;
					return !t || t.specified ? e.value : e.text
				}
			},
			select: {
				get: function (e) {
					var t, n, r, i, o = e.selectedIndex,
						a = [],
						s = e.options,
						l = "select-one" === e.type;
					if (0 > o) return null;
					for (n = l ? o : 0, r = l ? o + 1 : s.length; r > n; n++) if (i = s[n], !(!i.selected || (M.support.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && M.nodeName(i.parentNode, "optgroup"))) {
						if (t = M(i).val(), l) return t;
						a.push(t)
					}
					return l && !a.length && s.length ? M(s[o]).val() : a
				},
				set: function (e, t) {
					var n = M.makeArray(t);
					return M(e).find("option").each(function () {
						this.selected = M.inArray(M(this).val(), n) >= 0
					}), n.length || (e.selectedIndex = -1), n
				}
			}
		},
		attrFn: {
			val: !0,
			css: !0,
			html: !0,
			text: !0,
			data: !0,
			width: !0,
			height: !0,
			offset: !0
		},
		attr: function (e, n, r, i) {
			var o, a, s, l = e.nodeType;
			return e && 3 !== l && 8 !== l && 2 !== l ? i && n in M.attrFn ? M(e)[n](r) : e.getAttribute === void 0 ? M.prop(e, n, r) : (s = 1 !== l || !M.isXMLDoc(e), s && (n = n.toLowerCase(), a = M.attrHooks[n] || (Q.test(n) ? q : W)), r !== t ? null === r ? (M.removeAttr(e, n), void 0) : a && "set" in a && s && (o = a.set(e, r, n)) !== t ? o : (e.setAttribute(n, "" + r), r) : a && "get" in a && s && null !== (o = a.get(e, n)) ? o : (o = e.getAttribute(n), null === o ? t : o)) : void 0
		},
		removeAttr: function (e, t) {
			var n, r, i, o, a, s = 0;
			if (t && 1 === e.nodeType) for (r = t.toLowerCase().split(R), o = r.length; o > s; s++) i = r[s], i && (n = M.propFix[i] || i, a = Q.test(i), a || M.attr(e, i, ""), e.removeAttribute(K ? i : n), a && n in e && (e[n] = !1))
		},
		attrHooks: {
			type: {
				set: function (e, t) {
					if (X.test(e.nodeName) && e.parentNode) M.error("type property can't be changed");
					else if (!M.support.radioValue && "radio" === t && M.nodeName(e, "input")) {
						var n = e.value;
						return e.setAttribute("type", t), n && (e.value = n), t
					}
				}
			},
			value: {
				get: function (e, t) {
					return W && M.nodeName(e, "button") ? W.get(e, t) : t in e ? e.value : null
				},
				set: function (e, t, n) {
					return W && M.nodeName(e, "button") ? W.set(e, t, n) : (e.value = t, void 0)
				}
			}
		},
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
		prop: function (e, n, r) {
			var i, o, a, s = e.nodeType;
			return e && 3 !== s && 8 !== s && 2 !== s ? (a = 1 !== s || !M.isXMLDoc(e), a && (n = M.propFix[n] || n, o = M.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n]) : void 0
		},
		propHooks: {
			tabIndex: {
				get: function (e) {
					var n = e.getAttributeNode("tabindex");
					return n && n.specified ? parseInt(n.value, 10) : V.test(e.nodeName) || Y.test(e.nodeName) && e.href ? 0 : t
				}
			}
		}
	}), M.attrHooks.tabindex = M.propHooks.tabIndex, q = {
		get: function (e, n) {
			var r, i = M.prop(e, n);
			return i === !0 || "boolean" != typeof i && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t
		},
		set: function (e, t, n) {
			var r;
			return t === !1 ? M.removeAttr(e, n) : (r = M.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n
		}
	}, K || ($ = {
		name: !0,
		id: !0,
		coords: !0
	}, W = M.valHooks.button = {
		get: function (e, n) {
			var r;
			return r = e.getAttributeNode(n), r && ($[n] ? "" !== r.nodeValue : r.specified) ? r.nodeValue : t
		},
		set: function (e, t, n) {
			var r = e.getAttributeNode(n);
			return r || (r = D.createAttribute(n), e.setAttributeNode(r)), r.nodeValue = t + ""
		}
	}, M.attrHooks.tabindex.set = W.set, M.each(["width", "height"], function (e, t) {
		M.attrHooks[t] = M.extend(M.attrHooks[t], {
			set: function (e, n) {
				return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
			}
		})
	}), M.attrHooks.contenteditable = {
		get: W.get,
		set: function (e, t, n) {
			"" === t && (t = "false"), W.set(e, t, n)
		}
	}), M.support.hrefNormalized || M.each(["href", "src", "width", "height"], function (e, n) {
		M.attrHooks[n] = M.extend(M.attrHooks[n], {
			get: function (e) {
				var r = e.getAttribute(n, 2);
				return null === r ? t : r
			}
		})
	}), M.support.style || (M.attrHooks.style = {
		get: function (e) {
			return e.style.cssText.toLowerCase() || t
		},
		set: function (e, t) {
			return e.style.cssText = "" + t
		}
	}), M.support.optSelected || (M.propHooks.selected = M.extend(M.propHooks.selected, {
		get: function (e) {
			var t = e.parentNode;
			return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
		}
	})), M.support.enctype || (M.propFix.enctype = "encoding"), M.support.checkOn || M.each(["radio", "checkbox"], function () {
		M.valHooks[this] = {
			get: function (e) {
				return null === e.getAttribute("value") ? "on" : e.value
			}
		}
	}), M.each(["radio", "checkbox"], function () {
		M.valHooks[this] = M.extend(M.valHooks[this], {
			set: function (e, t) {
				return M.isArray(t) ? e.checked = M.inArray(M(e).val(), t) >= 0 : void 0
			}
		})
	});
	var J = /^(?:textarea|input|select)$/i,
		G = /^([^\.]*)?(?:\.(.+))?$/,
		Z = /(?:^|\s)hover(\.\S+)?\b/,
		et = /^key/,
		tt = /^(?:mouse|contextmenu)|click/,
		nt = /^(?:focusinfocus|focusoutblur)$/,
		rt = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
		it = function (e) {
			var t = rt.exec(e);
			return t && (t[1] = (t[1] || "").toLowerCase(), t[3] = t[3] && RegExp("(?:^|\\s)" + t[3] + "(?:\\s|$)")), t
		},
		ot = function (e, t) {
			var n = e.attributes || {};
			return !(t[1] && e.nodeName.toLowerCase() !== t[1] || t[2] && (n.id || {}).value !== t[2] || t[3] && !t[3].test((n["class"] || {}).value))
		},
		at = function (e) {
			return M.event.special.hover ? e : e.replace(Z, "mouseenter$1 mouseleave$1")
		};
	M.event = {
		add: function (e, n, r, i, o) {
			var a, s, l, c, u, d, f, p, h, m, g;
			if (3 !== e.nodeType && 8 !== e.nodeType && n && r && (a = M._data(e))) {
				for (r.handler && (h = r, r = h.handler, o = h.selector), r.guid || (r.guid = M.guid++), l = a.events, l || (a.events = l = {}), s = a.handle, s || (a.handle = s = function (e) {
					return void 0 === M || e && M.event.triggered === e.type ? t : M.event.dispatch.apply(s.elem, arguments)
				}, s.elem = e), n = M.trim(at(n)).split(" "), c = 0; n.length > c; c++) u = G.exec(n[c]) || [], d = u[1], f = (u[2] || "").split(".").sort(), g = M.event.special[d] || {}, d = (o ? g.delegateType : g.bindType) || d, g = M.event.special[d] || {}, p = M.extend({
					type: d,
					origType: u[1],
					data: i,
					handler: r,
					guid: r.guid,
					selector: o,
					quick: o && it(o),
					namespace: f.join(".")
				}, h), m = l[d], m || (m = l[d] = [], m.delegateCount = 0, g.setup && g.setup.call(e, i, f, s) !== !1 || (e.addEventListener ? e.addEventListener(d, s, !1) : e.attachEvent && e.attachEvent("on" + d, s))), g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), o ? m.splice(m.delegateCount++, 0, p) : m.push(p), M.event.global[d] = !0;
				e = null
			}
		},
		global: {},
		remove: function (e, t, n, r, i) {
			var o, a, s, l, c, u, d, f, p, h, m, g, v = M.hasData(e) && M._data(e);
			if (v && (f = v.events)) {
				for (t = M.trim(at(t || "")).split(" "), o = 0; t.length > o; o++) if (a = G.exec(t[o]) || [], s = l = a[1], c = a[2], s) {
					for (p = M.event.special[s] || {}, s = (r ? p.delegateType : p.bindType) || s, m = f[s] || [], u = m.length, c = c ? RegExp("(^|\\.)" + c.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null, d = 0; m.length > d; d++) g = m[d], !(!i && l !== g.origType || n && n.guid !== g.guid || c && !c.test(g.namespace) || r && r !== g.selector && ("**" !== r || !g.selector) || (m.splice(d--, 1), g.selector && m.delegateCount--, !p.remove || !p.remove.call(e, g)));
					0 === m.length && u !== m.length && ((!p.teardown || p.teardown.call(e, c) === !1) && M.removeEvent(e, s, v.handle), delete f[s])
				} else for (s in f) M.event.remove(e, s + t[o], n, r, !0);
				M.isEmptyObject(f) && (h = v.handle, h && (h.elem = null), M.removeData(e, ["events", "handle"], !0))
			}
		},
		customEvent: {
			getData: !0,
			setData: !0,
			changeData: !0
		},
		trigger: function (n, r, i, o) {
			if (!i || 3 !== i.nodeType && 8 !== i.nodeType) {
				var a, s, l, c, u, d, f, p, h, m, g = n.type || n,
					v = [];
				if (nt.test(g + M.event.triggered)) return;
				if (g.indexOf("!") >= 0 && (g = g.slice(0, -1), s = !0), g.indexOf(".") >= 0 && (v = g.split("."), g = v.shift(), v.sort()), (!i || M.event.customEvent[g]) && !M.event.global[g]) return;
				if (n = "object" == typeof n ? n[M.expando] ? n : new M.Event(g, n) : new M.Event(g), n.type = g, n.isTrigger = !0, n.exclusive = s, n.namespace = v.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + v.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, d = 0 > g.indexOf(":") ? "on" + g : "", !i) {
					a = M.cache;
					for (l in a) a[l].events && a[l].events[g] && M.event.trigger(n, r, a[l].handle.elem, !0);
					return
				}
				if (n.result = t, n.target || (n.target = i), r = null != r ? M.makeArray(r) : [], r.unshift(n), f = M.event.special[g] || {}, f.trigger && f.trigger.apply(i, r) === !1) return;
				if (h = [
					[i, f.bindType || g]
				], !o && !f.noBubble && !M.isWindow(i)) {
					for (m = f.delegateType || g, c = nt.test(m + g) ? i : i.parentNode, u = null; c; c = c.parentNode) h.push([c, m]), u = c;
					u && u === i.ownerDocument && h.push([u.defaultView || u.parentWindow || e, m])
				}
				for (l = 0; h.length > l && !n.isPropagationStopped(); l++) c = h[l][0], n.type = h[l][1], p = (M._data(c, "events") || {})[n.type] && M._data(c, "handle"), p && p.apply(c, r), p = d && c[d], p && M.acceptData(c) && p.apply(c, r) === !1 && n.preventDefault();
				return n.type = g, !(o || n.isDefaultPrevented() || f._default && f._default.apply(i.ownerDocument, r) !== !1 || "click" === g && M.nodeName(i, "a") || !M.acceptData(i) || !d || !i[g] || ("focus" === g || "blur" === g) && 0 === n.target.offsetWidth || M.isWindow(i) || (u = i[d], u && (i[d] = null), M.event.triggered = g, i[g](), M.event.triggered = t, !u || !(i[d] = u))), n.result
			}
		},
		dispatch: function (n) {
			n = M.event.fix(n || e.event);
			var r, i, o, a, s, l, c, u, d, f, p = (M._data(this, "events") || {})[n.type] || [],
				h = p.delegateCount,
				m = [].slice.call(arguments, 0),
				g = !n.exclusive && !n.namespace,
				v = M.event.special[n.type] || {},
				y = [];
			if (m[0] = n, n.delegateTarget = this, !v.preDispatch || v.preDispatch.call(this, n) !== !1) {
				if (h && (!n.button || "click" !== n.type)) for (a = M(this), a.context = this.ownerDocument || this, o = n.target; o != this; o = o.parentNode || this) if (o.disabled !== !0) {
					for (l = {}, u = [], a[0] = o, r = 0; h > r; r++) d = p[r], f = d.selector, l[f] === t && (l[f] = d.quick ? ot(o, d.quick) : a.is(f)), l[f] && u.push(d);
					u.length && y.push({
						elem: o,
						matches: u
					})
				}
				for (p.length > h && y.push({
					elem: this,
					matches: p.slice(h)
				}), r = 0; y.length > r && !n.isPropagationStopped(); r++) for (c = y[r], n.currentTarget = c.elem, i = 0; c.matches.length > i && !n.isImmediatePropagationStopped(); i++) d = c.matches[i], (g || !n.namespace && !d.namespace || n.namespace_re && n.namespace_re.test(d.namespace)) && (n.data = d.data, n.handleObj = d, s = ((M.event.special[d.origType] || {}).handle || d.handler).apply(c.elem, m), s !== t && (n.result = s, s === !1 && (n.preventDefault(), n.stopPropagation())));
				return v.postDispatch && v.postDispatch.call(this, n), n.result
			}
		},
		props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function (e, t) {
				return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function (e, n) {
				var r, i, o, a = n.button,
					s = n.fromElement;
				return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || D, i = r.documentElement, o = r.body, e.pageX = n.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s), !e.which && a !== t && (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
			}
		},
		fix: function (e) {
			if (e[M.expando]) return e;
			var n, r, i = e,
				o = M.event.fixHooks[e.type] || {},
				a = o.props ? this.props.concat(o.props) : this.props;
			for (e = M.Event(i), n = a.length; n;) r = a[--n], e[r] = i[r];
			return e.target || (e.target = i.srcElement || D), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey === t && (e.metaKey = e.ctrlKey), o.filter ? o.filter(e, i) : e
		},
		special: {
			ready: {
				setup: M.bindReady
			},
			load: {
				noBubble: !0
			},
			focus: {
				delegateType: "focusin"
			},
			blur: {
				delegateType: "focusout"
			},
			beforeunload: {
				setup: function (e, t, n) {
					M.isWindow(this) && (this.onbeforeunload = n)
				},
				teardown: function (e, t) {
					this.onbeforeunload === t && (this.onbeforeunload = null)
				}
			}
		},
		simulate: function (e, t, n, r) {
			var i = M.extend(new M.Event, n, {
				type: e,
				isSimulated: !0,
				originalEvent: {}
			});
			r ? M.event.trigger(i, null, t) : M.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
		}
	}, M.event.handle = M.event.dispatch, M.removeEvent = D.removeEventListener ?
	function (e, t, n) {
		e.removeEventListener && e.removeEventListener(t, n, !1)
	} : function (e, t, n) {
		e.detachEvent && e.detachEvent("on" + t, n)
	}, M.Event = function (e, t) {
		return this instanceof M.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? E : N) : this.type = e, t && M.extend(this, t), this.timeStamp = e && e.timeStamp || M.now(), this[M.expando] = !0, void 0) : new M.Event(e, t)
	}, M.Event.prototype = {
		preventDefault: function () {
			this.isDefaultPrevented = E;
			var e = this.originalEvent;
			!e || (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
		},
		stopPropagation: function () {
			this.isPropagationStopped = E;
			var e = this.originalEvent;
			!e || (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
		},
		stopImmediatePropagation: function () {
			this.isImmediatePropagationStopped = E, this.stopPropagation()
		},
		isDefaultPrevented: N,
		isPropagationStopped: N,
		isImmediatePropagationStopped: N
	}, M.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function (e, t) {
		M.event.special[e] = {
			delegateType: t,
			bindType: t,
			handle: function (e) {
				var n, r = this,
					i = e.relatedTarget,
					o = e.handleObj;
				return o.selector, (!i || i !== r && !M.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
			}
		}
	}), M.support.submitBubbles || (M.event.special.submit = {
		setup: function () {
			return M.nodeName(this, "form") ? !1 : (M.event.add(this, "click._submit keypress._submit", function (e) {
				var n = e.target,
					r = M.nodeName(n, "input") || M.nodeName(n, "button") ? n.form : t;
				r && !r._submit_attached && (M.event.add(r, "submit._submit", function (e) {
					e._submit_bubble = !0
				}), r._submit_attached = !0)
			}), void 0)
		},
		postDispatch: function (e) {
			e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && M.event.simulate("submit", this.parentNode, e, !0))
		},
		teardown: function () {
			return M.nodeName(this, "form") ? !1 : (M.event.remove(this, "._submit"), void 0)
		}
	}), M.support.changeBubbles || (M.event.special.change = {
		setup: function () {
			return J.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (M.event.add(this, "propertychange._change", function (e) {
				"checked" === e.originalEvent.propertyName && (this._just_changed = !0)
			}), M.event.add(this, "click._change", function (e) {
				this._just_changed && !e.isTrigger && (this._just_changed = !1, M.event.simulate("change", this, e, !0))
			})), !1) : (M.event.add(this, "beforeactivate._change", function (e) {
				var t = e.target;
				J.test(t.nodeName) && !t._change_attached && (M.event.add(t, "change._change", function (e) {
					this.parentNode && !e.isSimulated && !e.isTrigger && M.event.simulate("change", this.parentNode, e, !0)
				}), t._change_attached = !0)
			}), void 0)
		},
		handle: function (e) {
			var t = e.target;
			return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
		},
		teardown: function () {
			return M.event.remove(this, "._change"), J.test(this.nodeName)
		}
	}), M.support.focusinBubbles || M.each({
		focus: "focusin",
		blur: "focusout"
	}, function (e, t) {
		var n = 0,
			r = function (e) {
				M.event.simulate(t, e.target, M.event.fix(e), !0)
			};
		M.event.special[t] = {
			setup: function () {
				0 === n++ && D.addEventListener(e, r, !0)
			},
			teardown: function () {
				0 === --n && D.removeEventListener(e, r, !0)
			}
		}
	}), M.fn.extend({
		on: function (e, n, r, i, o) {
			var a, s;
			if ("object" == typeof e) {
				"string" != typeof n && (r = r || n, n = t);
				for (s in e) this.on(s, n, r, e[s], o);
				return this
			}
			if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = N;
			else if (!i) return this;
			return 1 === o && (a = i, i = function (e) {
				return M().off(e), a.apply(this, arguments)
			}, i.guid = a.guid || (a.guid = M.guid++)), this.each(function () {
				M.event.add(this, e, i, r, n)
			})
		},
		one: function (e, t, n, r) {
			return this.on(e, t, n, r, 1)
		},
		off: function (e, n, r) {
			if (e && e.preventDefault && e.handleObj) {
				var i = e.handleObj;
				return M(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this
			}
			if ("object" == typeof e) {
				for (var o in e) this.off(o, n, e[o]);
				return this
			}
			return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = N), this.each(function () {
				M.event.remove(this, e, r, n)
			})
		},
		bind: function (e, t, n) {
			return this.on(e, null, t, n)
		},
		unbind: function (e, t) {
			return this.off(e, null, t)
		},
		live: function (e, t, n) {
			return M(this.context).on(e, this.selector, t, n), this
		},
		die: function (e, t) {
			return M(this.context).off(e, this.selector || "**", t), this
		},
		delegate: function (e, t, n, r) {
			return this.on(t, e, n, r)
		},
		undelegate: function (e, t, n) {
			return 1 == arguments.length ? this.off(e, "**") : this.off(t, e, n)
		},
		trigger: function (e, t) {
			return this.each(function () {
				M.event.trigger(e, t, this)
			})
		},
		triggerHandler: function (e, t) {
			return this[0] ? M.event.trigger(e, t, this[0], !0) : void 0
		},
		toggle: function (e) {
			var t = arguments,
				n = e.guid || M.guid++,
				r = 0,
				i = function (n) {
					var i = (M._data(this, "lastToggle" + e.guid) || 0) % r;
					return M._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1
				};
			for (i.guid = n; t.length > r;) t[r++].guid = n;
			return this.click(i)
		},
		hover: function (e, t) {
			return this.mouseenter(e).mouseleave(t || e)
		}
	}), M.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
		M.fn[t] = function (e, n) {
			return null == n && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
		}, M.attrFn && (M.attrFn[t] = !0), et.test(t) && (M.event.fixHooks[t] = M.event.keyHooks), tt.test(t) && (M.event.fixHooks[t] = M.event.mouseHooks)
	}), function () {
		function e(e, t, n, r, o, a) {
			for (var s = 0, l = r.length; l > s; s++) {
				var c = r[s];
				if (c) {
					var u = !1;
					for (c = c[e]; c;) {
						if (c[i] === n) {
							u = r[c.sizset];
							break
						}
						if (1 === c.nodeType) if (a || (c[i] = n, c.sizset = s), "string" != typeof t) {
							if (c === t) {
								u = !0;
								break
							}
						} else if (f.filter(t, [c]).length > 0) {
							u = c;
							break
						}
						c = c[e]
					}
					r[s] = u
				}
			}
		}
		function n(e, t, n, r, o, a) {
			for (var s = 0, l = r.length; l > s; s++) {
				var c = r[s];
				if (c) {
					var u = !1;
					for (c = c[e]; c;) {
						if (c[i] === n) {
							u = r[c.sizset];
							break
						}
						if (1 === c.nodeType && !a && (c[i] = n, c.sizset = s), c.nodeName.toLowerCase() === t) {
							u = c;
							break
						}
						c = c[e]
					}
					r[s] = u
				}
			}
		}
		var r = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
			i = "sizcache" + (Math.random() + "").replace(".", ""),
			o = 0,
			a = Object.prototype.toString,
			s = !1,
			l = !0,
			c = /\\/g,
			u = /\r\n/g,
			d = /\W/;
		[0, 0].sort(function () {
			return l = !1, 0
		});
		var f = function (e, t, n, i) {
			n = n || [], t = t || D;
			var o = t;
			if (1 !== t.nodeType && 9 !== t.nodeType) return [];
			if (!e || "string" != typeof e) return n;
			var s, l, c, u, d, p, g, v, b = !0,
				x = f.isXML(t),
				w = [],
				k = e;
			do
			if (r.exec(""), s = r.exec(k), s && (k = s[3], w.push(s[1]), s[2])) {
				u = s[3];
				break
			}
			while (s);
			if (w.length > 1 && m.exec(e)) if (2 === w.length && h.relative[w[0]]) l = T(w[0] + w[1], t, i);
			else for (l = h.relative[w[0]] ? [t] : f(w.shift(), t); w.length;) e = w.shift(), h.relative[e] && (e += w.shift()), l = T(e, l, i);
			else if (!i && w.length > 1 && 9 === t.nodeType && !x && h.match.ID.test(w[0]) && !h.match.ID.test(w[w.length - 1]) && (d = f.find(w.shift(), t, x), t = d.expr ? f.filter(d.expr, d.set)[0] : d.set[0]), t) for (d = i ? {
				expr: w.pop(),
				set: y(i)
			} : f.find(w.pop(), 1 !== w.length || "~" !== w[0] && "+" !== w[0] || !t.parentNode ? t : t.parentNode, x), l = d.expr ? f.filter(d.expr, d.set) : d.set, w.length > 0 ? c = y(l) : b = !1; w.length;) p = w.pop(), g = p, h.relative[p] ? g = w.pop() : p = "", null == g && (g = t), h.relative[p](c, g, x);
			else c = w = [];
			if (c || (c = l), c || f.error(p || e), "[object Array]" === a.call(c)) if (b) if (t && 1 === t.nodeType) for (v = 0; null != c[v]; v++) c[v] && (c[v] === !0 || 1 === c[v].nodeType && f.contains(t, c[v])) && n.push(l[v]);
			else for (v = 0; null != c[v]; v++) c[v] && 1 === c[v].nodeType && n.push(l[v]);
			else n.push.apply(n, c);
			else y(c, n);
			return u && (f(u, o, n, i), f.uniqueSort(n)), n
		};
		f.uniqueSort = function (e) {
			if (x && (s = l, e.sort(x), s)) for (var t = 1; e.length > t; t++) e[t] === e[t - 1] && e.splice(t--, 1);
			return e
		}, f.matches = function (e, t) {
			return f(e, null, null, t)
		}, f.matchesSelector = function (e, t) {
			return f(t, null, null, [e]).length > 0
		}, f.find = function (e, t, n) {
			var r, i, o, a, s, l;
			if (!e) return [];
			for (i = 0, o = h.order.length; o > i; i++) if (s = h.order[i], (a = h.leftMatch[s].exec(e)) && (l = a[1], a.splice(1, 1), "\\" !== l.substr(l.length - 1) && (a[1] = (a[1] || "").replace(c, ""), r = h.find[s](a, t, n), null != r))) {
				e = e.replace(h.match[s], "");
				break
			}
			return r || (r = t.getElementsByTagName !== void 0 ? t.getElementsByTagName("*") : []), {
				set: r,
				expr: e
			}
		}, f.filter = function (e, n, r, i) {
			for (var o, a, s, l, c, u, d, p, m, g = e, v = [], y = n, b = n && n[0] && f.isXML(n[0]); e && n.length;) {
				for (s in h.filter) if (null != (o = h.leftMatch[s].exec(e)) && o[2]) {
					if (u = h.filter[s], d = o[1], a = !1, o.splice(1, 1), "\\" === d.substr(d.length - 1)) continue;
					if (y === v && (v = []), h.preFilter[s]) if (o = h.preFilter[s](o, y, r, v, i, b)) {
						if (o === !0) continue
					} else a = l = !0;
					if (o) for (p = 0; null != (c = y[p]); p++) c && (l = u(c, o, p, y), m = i ^ l, r && null != l ? m ? a = !0 : y[p] = !1 : m && (v.push(c), a = !0));
					if (l !== t) {
						if (r || (y = v), e = e.replace(h.match[s], ""), !a) return [];
						break
					}
				}
				if (e === g) {
					if (null != a) break;
					f.error(e)
				}
				g = e
			}
			return y
		}, f.error = function (e) {
			throw Error("Syntax error, unrecognized expression: " + e)
		};
		var p = f.getText = function (e) {
			var t, n, r = e.nodeType,
				i = "";
			if (r) {
				if (1 === r || 9 === r || 11 === r) {
					if ("string" == typeof e.textContent) return e.textContent;
					if ("string" == typeof e.innerText) return e.innerText.replace(u, "");
					for (e = e.firstChild; e; e = e.nextSibling) i += p(e)
				} else if (3 === r || 4 === r) return e.nodeValue
			} else for (t = 0; n = e[t]; t++) 8 !== n.nodeType && (i += p(n));
			return i
		},
			h = f.selectors = {
				order: ["ID", "NAME", "TAG"],
				match: {
					ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
					CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
					NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
					ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
					TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
					CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
					POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
					PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
				},
				leftMatch: {},
				attrMap: {
					"class": "className",
					"for": "htmlFor"
				},
				attrHandle: {
					href: function (e) {
						return e.getAttribute("href")
					},
					type: function (e) {
						return e.getAttribute("type")
					}
				},
				relative: {
					"+": function (e, t) {
						var n = "string" == typeof t,
							r = n && !d.test(t),
							i = n && !r;
						r && (t = t.toLowerCase());
						for (var o, a = 0, s = e.length; s > a; a++) if (o = e[a]) {
							for (;
							(o = o.previousSibling) && 1 !== o.nodeType;);
							e[a] = i || o && o.nodeName.toLowerCase() === t ? o || !1 : o === t
						}
						i && f.filter(t, e, !0)
					},
					">": function (e, t) {
						var n, r = "string" == typeof t,
							i = 0,
							o = e.length;
						if (r && !d.test(t)) {
							for (t = t.toLowerCase(); o > i; i++) if (n = e[i]) {
								var a = n.parentNode;
								e[i] = a.nodeName.toLowerCase() === t ? a : !1
							}
						} else {
							for (; o > i; i++) n = e[i], n && (e[i] = r ? n.parentNode : n.parentNode === t);
							r && f.filter(t, e, !0)
						}
					},
					"": function (t, r, i) {
						var a, s = o++,
							l = e;
						"string" == typeof r && !d.test(r) && (r = r.toLowerCase(), a = r, l = n), l("parentNode", r, s, t, a, i)
					},
					"~": function (t, r, i) {
						var a, s = o++,
							l = e;
						"string" == typeof r && !d.test(r) && (r = r.toLowerCase(), a = r, l = n), l("previousSibling", r, s, t, a, i)
					}
				},
				find: {
					ID: function (e, t, n) {
						if (t.getElementById !== void 0 && !n) {
							var r = t.getElementById(e[1]);
							return r && r.parentNode ? [r] : []
						}
					},
					NAME: function (e, t) {
						if (t.getElementsByName !== void 0) {
							for (var n = [], r = t.getElementsByName(e[1]), i = 0, o = r.length; o > i; i++) r[i].getAttribute("name") === e[1] && n.push(r[i]);
							return 0 === n.length ? null : n
						}
					},
					TAG: function (e, t) {
						return t.getElementsByTagName !== void 0 ? t.getElementsByTagName(e[1]) : void 0
					}
				},
				preFilter: {
					CLASS: function (e, t, n, r, i, o) {
						if (e = " " + e[1].replace(c, "") + " ", o) return e;
						for (var a, s = 0; null != (a = t[s]); s++) a && (i ^ (a.className && (" " + a.className + " ").replace(/[\t\n\r]/g, " ").indexOf(e) >= 0) ? n || r.push(a) : n && (t[s] = !1));
						return !1
					},
					ID: function (e) {
						return e[1].replace(c, "")
					},
					TAG: function (e) {
						return e[1].replace(c, "").toLowerCase()
					},
					CHILD: function (e) {
						if ("nth" === e[1]) {
							e[2] || f.error(e[0]), e[2] = e[2].replace(/^\+|\s*/g, "");
							var t = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec("even" === e[2] && "2n" || "odd" === e[2] && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
							e[2] = t[1] + (t[2] || 1) - 0, e[3] = t[3] - 0
						} else e[2] && f.error(e[0]);
						return e[0] = o++, e
					},
					ATTR: function (e, t, n, r, i, o) {
						var a = e[1] = e[1].replace(c, "");
						return !o && h.attrMap[a] && (e[1] = h.attrMap[a]), e[4] = (e[4] || e[5] || "").replace(c, ""), "~=" === e[2] && (e[4] = " " + e[4] + " "), e
					},
					PSEUDO: function (e, t, n, i, o) {
						if ("not" === e[1]) {
							if (!((r.exec(e[3]) || "").length > 1 || /^\w/.test(e[3]))) {
								var a = f.filter(e[3], t, n, !0 ^ o);
								return n || i.push.apply(i, a), !1
							}
							e[3] = f(e[3], null, null, t)
						} else if (h.match.POS.test(e[0]) || h.match.CHILD.test(e[0])) return !0;
						return e
					},
					POS: function (e) {
						return e.unshift(!0), e
					}
				},
				filters: {
					enabled: function (e) {
						return e.disabled === !1 && "hidden" !== e.type
					},
					disabled: function (e) {
						return e.disabled === !0
					},
					checked: function (e) {
						return e.checked === !0
					},
					selected: function (e) {
						return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
					},
					parent: function (e) {
						return !!e.firstChild
					},
					empty: function (e) {
						return !e.firstChild
					},
					has: function (e, t, n) {
						return !!f(n[3], e).length
					},
					header: function (e) {
						return /h\d/i.test(e.nodeName)
					},
					text: function (e) {
						var t = e.getAttribute("type"),
							n = e.type;
						return "input" === e.nodeName.toLowerCase() && "text" === n && (t === n || null === t)
					},
					radio: function (e) {
						return "input" === e.nodeName.toLowerCase() && "radio" === e.type
					},
					checkbox: function (e) {
						return "input" === e.nodeName.toLowerCase() && "checkbox" === e.type
					},
					file: function (e) {
						return "input" === e.nodeName.toLowerCase() && "file" === e.type
					},
					password: function (e) {
						return "input" === e.nodeName.toLowerCase() && "password" === e.type
					},
					submit: function (e) {
						var t = e.nodeName.toLowerCase();
						return ("input" === t || "button" === t) && "submit" === e.type
					},
					image: function (e) {
						return "input" === e.nodeName.toLowerCase() && "image" === e.type
					},
					reset: function (e) {
						var t = e.nodeName.toLowerCase();
						return ("input" === t || "button" === t) && "reset" === e.type
					},
					button: function (e) {
						var t = e.nodeName.toLowerCase();
						return "input" === t && "button" === e.type || "button" === t
					},
					input: function (e) {
						return /input|select|textarea|button/i.test(e.nodeName)
					},
					focus: function (e) {
						return e === e.ownerDocument.activeElement
					}
				},
				setFilters: {
					first: function (e, t) {
						return 0 === t
					},
					last: function (e, t, n, r) {
						return t === r.length - 1
					},
					even: function (e, t) {
						return 0 === t % 2
					},
					odd: function (e, t) {
						return 1 === t % 2
					},
					lt: function (e, t, n) {
						return n[3] - 0 > t
					},
					gt: function (e, t, n) {
						return t > n[3] - 0
					},
					nth: function (e, t, n) {
						return n[3] - 0 === t
					},
					eq: function (e, t, n) {
						return n[3] - 0 === t
					}
				},
				filter: {
					PSEUDO: function (e, t, n, r) {
						var i = t[1],
							o = h.filters[i];
						if (o) return o(e, n, t, r);
						if ("contains" === i) return (e.textContent || e.innerText || p([e]) || "").indexOf(t[3]) >= 0;
						if ("not" === i) {
							for (var a = t[3], s = 0, l = a.length; l > s; s++) if (a[s] === e) return !1;
							return !0
						}
						f.error(i)
					},
					CHILD: function (e, t) {
						var n, r, o, a, s, l, c = t[1],
							u = e;
						switch (c) {
						case "only":
						case "first":
							for (; u = u.previousSibling;) if (1 === u.nodeType) return !1;
							if ("first" === c) return !0;
							u = e;
						case "last":
							for (; u = u.nextSibling;) if (1 === u.nodeType) return !1;
							return !0;
						case "nth":
							if (n = t[2], r = t[3], 1 === n && 0 === r) return !0;
							if (o = t[0], a = e.parentNode, a && (a[i] !== o || !e.nodeIndex)) {
								for (s = 0, u = a.firstChild; u; u = u.nextSibling) 1 === u.nodeType && (u.nodeIndex = ++s);
								a[i] = o
							}
							return l = e.nodeIndex - r, 0 === n ? 0 === l : 0 === l % n && l / n >= 0
						}
					},
					ID: function (e, t) {
						return 1 === e.nodeType && e.getAttribute("id") === t
					},
					TAG: function (e, t) {
						return "*" === t && 1 === e.nodeType || !! e.nodeName && e.nodeName.toLowerCase() === t
					},
					CLASS: function (e, t) {
						return (" " + (e.className || e.getAttribute("class")) + " ").indexOf(t) > -1
					},
					ATTR: function (e, t) {
						var n = t[1],
							r = f.attr ? f.attr(e, n) : h.attrHandle[n] ? h.attrHandle[n](e) : null != e[n] ? e[n] : e.getAttribute(n),
							i = r + "",
							o = t[2],
							a = t[4];
						return null == r ? "!=" === o : !o && f.attr ? null != r : "=" === o ? i === a : "*=" === o ? i.indexOf(a) >= 0 : "~=" === o ? (" " + i + " ").indexOf(a) >= 0 : a ? "!=" === o ? i !== a : "^=" === o ? 0 === i.indexOf(a) : "$=" === o ? i.substr(i.length - a.length) === a : "|=" === o ? i === a || i.substr(0, a.length + 1) === a + "-" : !1 : i && r !== !1
					},
					POS: function (e, t, n, r) {
						var i = t[2],
							o = h.setFilters[i];
						return o ? o(e, n, t, r) : void 0
					}
				}
			},
			m = h.match.POS,
			g = function (e, t) {
				return "\\" + (t - 0 + 1)
			};
		for (var v in h.match) h.match[v] = RegExp(h.match[v].source + /(?![^\[]*\])(?![^\(]*\))/.source), h.leftMatch[v] = RegExp(/(^(?:.|\r|\n)*?)/.source + h.match[v].source.replace(/\\(\d+)/g, g));
		h.match.globalPOS = m;
		var y = function (e, t) {
			return e = Array.prototype.slice.call(e, 0), t ? (t.push.apply(t, e), t) : e
		};
		try {
			Array.prototype.slice.call(D.documentElement.childNodes, 0)[0].nodeType
		} catch (b) {
			y = function (e, t) {
				var n = 0,
					r = t || [];
				if ("[object Array]" === a.call(e)) Array.prototype.push.apply(r, e);
				else if ("number" == typeof e.length) for (var i = e.length; i > n; n++) r.push(e[n]);
				else for (; e[n]; n++) r.push(e[n]);
				return r
			}
		}
		var x, w;
		D.documentElement.compareDocumentPosition ? x = function (e, t) {
			return e === t ? (s = !0, 0) : e.compareDocumentPosition && t.compareDocumentPosition ? 4 & e.compareDocumentPosition(t) ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
		} : (x = function (e, t) {
			if (e === t) return s = !0, 0;
			if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;
			var n, r, i = [],
				o = [],
				a = e.parentNode,
				l = t.parentNode,
				c = a;
			if (a === l) return w(e, t);
			if (!a) return -1;
			if (!l) return 1;
			for (; c;) i.unshift(c), c = c.parentNode;
			for (c = l; c;) o.unshift(c), c = c.parentNode;
			n = i.length, r = o.length;
			for (var u = 0; n > u && r > u; u++) if (i[u] !== o[u]) return w(i[u], o[u]);
			return u === n ? w(e, o[u], -1) : w(i[u], t, 1)
		}, w = function (e, t, n) {
			if (e === t) return n;
			for (var r = e.nextSibling; r;) {
				if (r === t) return -1;
				r = r.nextSibling
			}
			return 1
		}), function () {
			var e = D.createElement("div"),
				n = "script" + (new Date).getTime(),
				r = D.documentElement;
			e.innerHTML = "<a name='" + n + "'/>", r.insertBefore(e, r.firstChild), D.getElementById(n) && (h.find.ID = function (e, n, r) {
				if (n.getElementById !== void 0 && !r) {
					var i = n.getElementById(e[1]);
					return i ? i.id === e[1] || i.getAttributeNode !== void 0 && i.getAttributeNode("id").nodeValue === e[1] ? [i] : t : []
				}
			}, h.filter.ID = function (e, t) {
				var n = e.getAttributeNode !== void 0 && e.getAttributeNode("id");
				return 1 === e.nodeType && n && n.nodeValue === t
			}), r.removeChild(e), r = e = null
		}(), function () {
			var e = D.createElement("div");
			e.appendChild(D.createComment("")), e.getElementsByTagName("*").length > 0 && (h.find.TAG = function (e, t) {
				var n = t.getElementsByTagName(e[1]);
				if ("*" === e[1]) {
					for (var r = [], i = 0; n[i]; i++) 1 === n[i].nodeType && r.push(n[i]);
					n = r
				}
				return n
			}), e.innerHTML = "<a href='#'></a>", e.firstChild && e.firstChild.getAttribute !== void 0 && "#" !== e.firstChild.getAttribute("href") && (h.attrHandle.href = function (e) {
				return e.getAttribute("href", 2)
			}), e = null
		}(), D.querySelectorAll &&
		function () {
			var e = f,
				t = D.createElement("div"),
				n = "__sizzle__";
			if (t.innerHTML = "<p class='TEST'></p>", !t.querySelectorAll || 0 !== t.querySelectorAll(".TEST").length) {
				f = function (t, r, i, o) {
					if (r = r || D, !o && !f.isXML(r)) {
						var a = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(t);
						if (a && (1 === r.nodeType || 9 === r.nodeType)) {
							if (a[1]) return y(r.getElementsByTagName(t), i);
							if (a[2] && h.find.CLASS && r.getElementsByClassName) return y(r.getElementsByClassName(a[2]), i)
						}
						if (9 === r.nodeType) {
							if ("body" === t && r.body) return y([r.body], i);
							if (a && a[3]) {
								var s = r.getElementById(a[3]);
								if (!s || !s.parentNode) return y([], i);
								if (s.id === a[3]) return y([s], i)
							}
							try {
								return y(r.querySelectorAll(t), i)
							} catch (l) {}
						} else if (1 === r.nodeType && "object" !== r.nodeName.toLowerCase()) {
							var c = r,
								u = r.getAttribute("id"),
								d = u || n,
								p = r.parentNode,
								m = /^\s*[+~]/.test(t);
							u ? d = d.replace(/'/g, "\\$&") : r.setAttribute("id", d), m && p && (r = r.parentNode);
							try {
								if (!m || p) return y(r.querySelectorAll("[id='" + d + "'] " + t), i)
							} catch (g) {} finally {
								u || c.removeAttribute("id")
							}
						}
					}
					return e(t, r, i, o)
				};
				for (var r in e) f[r] = e[r];
				t = null
			}
		}(), function () {
			var e = D.documentElement,
				t = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
			if (t) {
				var n = !t.call(D.createElement("div"), "div"),
					r = !1;
				try {
					t.call(D.documentElement, "[test!='']:sizzle")
				} catch (i) {
					r = !0
				}
				f.matchesSelector = function (e, i) {
					if (i = i.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']"), !f.isXML(e)) try {
						if (r || !h.match.PSEUDO.test(i) && !/!=/.test(i)) {
							var o = t.call(e, i);
							if (o || !n || e.document && 11 !== e.document.nodeType) return o
						}
					} catch (a) {}
					return f(i, null, null, [e]).length > 0
				}
			}
		}(), function () {
			var e = D.createElement("div");
			if (e.innerHTML = "<div class='test e'></div><div class='test'></div>", e.getElementsByClassName && 0 !== e.getElementsByClassName("e").length) {
				if (e.lastChild.className = "e", 1 === e.getElementsByClassName("e").length) return;
				h.order.splice(1, 0, "CLASS"), h.find.CLASS = function (e, t, n) {
					return void 0 === t.getElementsByClassName || n ? void 0 : t.getElementsByClassName(e[1])
				}, e = null
			}
		}(), f.contains = D.documentElement.contains ?
		function (e, t) {
			return e !== t && (e.contains ? e.contains(t) : !0)
		} : D.documentElement.compareDocumentPosition ?
		function (e, t) {
			return !!(16 & e.compareDocumentPosition(t))
		} : function () {
			return !1
		}, f.isXML = function (e) {
			var t = (e ? e.ownerDocument || e : 0).documentElement;
			return t ? "HTML" !== t.nodeName : !1
		};
		var T = function (e, t, n) {
			for (var r, i = [], o = "", a = t.nodeType ? [t] : t; r = h.match.PSEUDO.exec(e);) o += r[0], e = e.replace(h.match.PSEUDO, "");
			e = h.relative[e] ? e + "*" : e;
			for (var s = 0, l = a.length; l > s; s++) f(e, a[s], i, n);
			return f.filter(o, i)
		};
		f.attr = M.attr, f.selectors.attrMap = {}, M.find = f, M.expr = f.selectors, M.expr[":"] = M.expr.filters, M.unique = f.uniqueSort, M.text = f.getText, M.isXMLDoc = f.isXML, M.contains = f.contains
	}();
	var st = /Until$/,
		lt = /^(?:parents|prevUntil|prevAll)/,
		ct = /,/,
		ut = /^.[^:#\[\.,]*$/,
		dt = Array.prototype.slice,
		ft = M.expr.match.globalPOS,
		pt = {
			children: !0,
			contents: !0,
			next: !0,
			prev: !0
		};
	M.fn.extend({
		find: function (e) {
			var t, n, r = this;
			if ("string" != typeof e) return M(e).filter(function () {
				for (t = 0, n = r.length; n > t; t++) if (M.contains(r[t], this)) return !0
			});
			var i, o, a, s = this.pushStack("", "find", e);
			for (t = 0, n = this.length; n > t; t++) if (i = s.length, M.find(e, this[t], s), t > 0) for (o = i; s.length > o; o++) for (a = 0; i > a; a++) if (s[a] === s[o]) {
				s.splice(o--, 1);
				break
			}
			return s
		},
		has: function (e) {
			var t = M(e);
			return this.filter(function () {
				for (var e = 0, n = t.length; n > e; e++) if (M.contains(this, t[e])) return !0
			})
		},
		not: function (e) {
			return this.pushStack(C(this, e, !1), "not", e)
		},
		filter: function (e) {
			return this.pushStack(C(this, e, !0), "filter", e)
		},
		is: function (e) {
			return !!e && ("string" == typeof e ? ft.test(e) ? M(e, this.context).index(this[0]) >= 0 : M.filter(e, this).length > 0 : this.filter(e).length > 0)
		},
		closest: function (e, t) {
			var n, r, i = [],
				o = this[0];
			if (M.isArray(e)) {
				for (var a = 1; o && o.ownerDocument && o !== t;) {
					for (n = 0; e.length > n; n++) M(o).is(e[n]) && i.push({
						selector: e[n],
						elem: o,
						level: a
					});
					o = o.parentNode, a++
				}
				return i
			}
			var s = ft.test(e) || "string" != typeof e ? M(e, t || this.context) : 0;
			for (n = 0, r = this.length; r > n; n++) for (o = this[n]; o;) {
				if (s ? s.index(o) > -1 : M.find.matchesSelector(o, e)) {
					i.push(o);
					break
				}
				if (o = o.parentNode, !o || !o.ownerDocument || o === t || 11 === o.nodeType) break
			}
			return i = i.length > 1 ? M.unique(i) : i, this.pushStack(i, "closest", e)
		},
		index: function (e) {
			return e ? "string" == typeof e ? M.inArray(this[0], M(e)) : M.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
		},
		add: function (e, t) {
			var n = "string" == typeof e ? M(e, t) : M.makeArray(e && e.nodeType ? [e] : e),
				r = M.merge(this.get(), n);
			return this.pushStack(S(n[0]) || S(r[0]) ? r : M.unique(r))
		},
		andSelf: function () {
			return this.add(this.prevObject)
		}
	}), M.each({
		parent: function (e) {
			var t = e.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function (e) {
			return M.dir(e, "parentNode")
		},
		parentsUntil: function (e, t, n) {
			return M.dir(e, "parentNode", n)
		},
		next: function (e) {
			return M.nth(e, 2, "nextSibling")
		},
		prev: function (e) {
			return M.nth(e, 2, "previousSibling")
		},
		nextAll: function (e) {
			return M.dir(e, "nextSibling")
		},
		prevAll: function (e) {
			return M.dir(e, "previousSibling")
		},
		nextUntil: function (e, t, n) {
			return M.dir(e, "nextSibling", n)
		},
		prevUntil: function (e, t, n) {
			return M.dir(e, "previousSibling", n)
		},
		siblings: function (e) {
			return M.sibling((e.parentNode || {}).firstChild, e)
		},
		children: function (e) {
			return M.sibling(e.firstChild)
		},
		contents: function (e) {
			return M.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : M.makeArray(e.childNodes)
		}
	}, function (e, t) {
		M.fn[e] = function (n, r) {
			var i = M.map(this, t, n);
			return st.test(e) || (r = n), r && "string" == typeof r && (i = M.filter(r, i)), i = this.length > 1 && !pt[e] ? M.unique(i) : i, (this.length > 1 || ct.test(r)) && lt.test(e) && (i = i.reverse()), this.pushStack(i, e, dt.call(arguments).join(","))
		}
	}), M.extend({
		filter: function (e, t, n) {
			return n && (e = ":not(" + e + ")"), 1 === t.length ? M.find.matchesSelector(t[0], e) ? [t[0]] : [] : M.find.matches(e, t)
		},
		dir: function (e, n, r) {
			for (var i = [], o = e[n]; o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !M(o).is(r));) 1 === o.nodeType && i.push(o), o = o[n];
			return i
		},
		nth: function (e, t, n) {
			t = t || 1;
			for (var r = 0; e && (1 !== e.nodeType || ++r !== t); e = e[n]);
			return e
		},
		sibling: function (e, t) {
			for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
			return n
		}
	});
	var ht = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		mt = / jQuery\d+="(?:\d+|null)"/g,
		gt = /^\s+/,
		vt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		yt = /<([\w:]+)/,
		bt = /<tbody/i,
		xt = /<|&#?\w+;/,
		wt = /<(?:script|style)/i,
		Tt = /<(?:script|object|embed|option|style)/i,
		kt = RegExp("<(?:" + ht + ")[\\s/>]", "i"),
		Ct = /checked\s*(?:[^=]|=\s*.checked.)/i,
		St = /\/(java|ecma)script/i,
		Et = /^\s*<!(?:\[CDATA\[|\-\-)/,
		Nt = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			area: [1, "<map>", "</map>"],
			_default: [0, "", ""]
		},
		_t = k(D);
	Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead, Nt.th = Nt.td, M.support.htmlSerialize || (Nt._default = [1, "div<div>", "</div>"]), M.fn.extend({
		text: function (e) {
			return M.access(this, function (e) {
				return e === t ? M.text(this) : this.empty().append((this[0] && this[0].ownerDocument || D).createTextNode(e))
			}, null, e, arguments.length)
		},
		wrapAll: function (e) {
			if (M.isFunction(e)) return this.each(function (t) {
				M(this).wrapAll(e.call(this, t))
			});
			if (this[0]) {
				var t = M(e, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
					for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
					return e
				}).append(this)
			}
			return this
		},
		wrapInner: function (e) {
			return M.isFunction(e) ? this.each(function (t) {
				M(this).wrapInner(e.call(this, t))
			}) : this.each(function () {
				var t = M(this),
					n = t.contents();
				n.length ? n.wrapAll(e) : t.append(e)
			})
		},
		wrap: function (e) {
			var t = M.isFunction(e);
			return this.each(function (n) {
				M(this).wrapAll(t ? e.call(this, n) : e)
			})
		},
		unwrap: function () {
			return this.parent().each(function () {
				M.nodeName(this, "body") || M(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function () {
			return this.domManip(arguments, !0, function (e) {
				1 === this.nodeType && this.appendChild(e)
			})
		},
		prepend: function () {
			return this.domManip(arguments, !0, function (e) {
				1 === this.nodeType && this.insertBefore(e, this.firstChild)
			})
		},
		before: function () {
			if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (e) {
				this.parentNode.insertBefore(e, this)
			});
			if (arguments.length) {
				var e = M.clean(arguments);
				return e.push.apply(e, this.toArray()), this.pushStack(e, "before", arguments)
			}
		},
		after: function () {
			if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function (e) {
				this.parentNode.insertBefore(e, this.nextSibling)
			});
			if (arguments.length) {
				var e = this.pushStack(this, "after", arguments);
				return e.push.apply(e, M.clean(arguments)), e
			}
		},
		remove: function (e, t) {
			for (var n, r = 0; null != (n = this[r]); r++)(!e || M.filter(e, [n]).length) && (!t && 1 === n.nodeType && (M.cleanData(n.getElementsByTagName("*")), M.cleanData([n])), n.parentNode && n.parentNode.removeChild(n));
			return this
		},
		empty: function () {
			for (var e, t = 0; null != (e = this[t]); t++) for (1 === e.nodeType && M.cleanData(e.getElementsByTagName("*")); e.firstChild;) e.removeChild(e.firstChild);
			return this
		},
		clone: function (e, t) {
			return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
				return M.clone(this, e, t)
			})
		},
		html: function (e) {
			return M.access(this, function (e) {
				var n = this[0] || {},
					r = 0,
					i = this.length;
				if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(mt, "") : null;
				if (!("string" != typeof e || wt.test(e) || !M.support.leadingWhitespace && gt.test(e) || Nt[(yt.exec(e) || ["", ""])[1].toLowerCase()])) {
					e = e.replace(vt, "<$1></$2>");
					try {
						for (; i > r; r++) n = this[r] || {}, 1 === n.nodeType && (M.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
						n = 0
					} catch (o) {}
				}
				n && this.empty().append(e)
			}, null, e, arguments.length)
		},
		replaceWith: function (e) {
			return this[0] && this[0].parentNode ? M.isFunction(e) ? this.each(function (t) {
				var n = M(this),
					r = n.html();
				n.replaceWith(e.call(this, t, r))
			}) : ("string" != typeof e && (e = M(e).detach()), this.each(function () {
				var t = this.nextSibling,
					n = this.parentNode;
				M(this).remove(), t ? M(t).before(e) : M(n).append(e)
			})) : this.length ? this.pushStack(M(M.isFunction(e) ? e() : e), "replaceWith", e) : this
		},
		detach: function (e) {
			return this.remove(e, !0)
		},
		domManip: function (e, n, r) {
			var i, o, a, s, l = e[0],
				c = [];
			if (!M.support.checkClone && 3 === arguments.length && "string" == typeof l && Ct.test(l)) return this.each(function () {
				M(this).domManip(e, n, r, !0)
			});
			if (M.isFunction(l)) return this.each(function (i) {
				var o = M(this);
				e[0] = l.call(this, i, n ? o.html() : t), o.domManip(e, n, r)
			});
			if (this[0]) {
				if (s = l && l.parentNode, i = M.support.parentNode && s && 11 === s.nodeType && s.childNodes.length === this.length ? {
					fragment: s
				} : M.buildFragment(e, this, c), a = i.fragment, o = 1 === a.childNodes.length ? a = a.firstChild : a.firstChild, o) {
					n = n && M.nodeName(o, "tr");
					for (var u = 0, d = this.length, f = d - 1; d > u; u++) r.call(n ? T(this[u], o) : this[u], i.cacheable || d > 1 && f > u ? M.clone(a, !0, !0) : a)
				}
				c.length && M.each(c, function (e, t) {
					t.src ? M.ajax({
						type: "GET",
						global: !1,
						url: t.src,
						async: !1,
						dataType: "script"
					}) : M.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Et, "/*$0*/")), t.parentNode && t.parentNode.removeChild(t)
				})
			}
			return this
		}
	}), M.buildFragment = function (e, t, n) {
		var r, i, o, a, s = e[0];
		return t && t[0] && (a = t[0].ownerDocument || t[0]), a.createDocumentFragment || (a = D), 1 === e.length && "string" == typeof s && 512 > s.length && a === D && "<" === s.charAt(0) && !Tt.test(s) && (M.support.checkClone || !Ct.test(s)) && (M.support.html5Clone || !kt.test(s)) && (i = !0, o = M.fragments[s], o && 1 !== o && (r = o)), r || (r = a.createDocumentFragment(), M.clean(e, a, r, n)), i && (M.fragments[s] = o ? r : 1), {
			fragment: r,
			cacheable: i
		}
	}, M.fragments = {}, M.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (e, t) {
		M.fn[e] = function (n) {
			var r = [],
				i = M(n),
				o = 1 === this.length && this[0].parentNode;
			if (o && 11 === o.nodeType && 1 === o.childNodes.length && 1 === i.length) return i[t](this[0]), this;
			for (var a = 0, s = i.length; s > a; a++) {
				var l = (a > 0 ? this.clone(!0) : this).get();
				M(i[a])[t](l), r = r.concat(l)
			}
			return this.pushStack(r, e, i.selector)
		}
	}), M.extend({
		clone: function (e, t, n) {
			var r, i, o, a = M.support.html5Clone || M.isXMLDoc(e) || !kt.test("<" + e.nodeName + ">") ? e.cloneNode(!0) : g(e);
			if (!(M.support.noCloneEvent && M.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || M.isXMLDoc(e))) for (x(e, a), r = b(e), i = b(a), o = 0; r[o]; ++o) i[o] && x(r[o], i[o]);
			if (t && (w(e, a), n)) for (r = b(e), i = b(a), o = 0; r[o]; ++o) w(r[o], i[o]);
			return r = i = null, a
		},
		clean: function (e, t, n, r) {
			var i, o, a, s = [];
			t = t || D, t.createElement === void 0 && (t = t.ownerDocument || t[0] && t[0].ownerDocument || D);
			for (var l, c = 0; null != (l = e[c]); c++) if ("number" == typeof l && (l += ""), l) {
				if ("string" == typeof l) if (xt.test(l)) {
					l = l.replace(vt, "<$1></$2>");
					var u, d = (yt.exec(l) || ["", ""])[1].toLowerCase(),
						f = Nt[d] || Nt._default,
						p = f[0],
						h = t.createElement("div"),
						m = _t.childNodes;
					for (t === D ? _t.appendChild(h) : k(t).appendChild(h), h.innerHTML = f[1] + l + f[2]; p--;) h = h.lastChild;
					if (!M.support.tbody) {
						var g = bt.test(l),
							y = "table" !== d || g ? "<table>" !== f[1] || g ? [] : h.childNodes : h.firstChild && h.firstChild.childNodes;
						for (a = y.length - 1; a >= 0; --a) M.nodeName(y[a], "tbody") && !y[a].childNodes.length && y[a].parentNode.removeChild(y[a])
					}!M.support.leadingWhitespace && gt.test(l) && h.insertBefore(t.createTextNode(gt.exec(l)[0]), h.firstChild), l = h.childNodes, h && (h.parentNode.removeChild(h), m.length > 0 && (u = m[m.length - 1], u && u.parentNode && u.parentNode.removeChild(u)))
				} else l = t.createTextNode(l);
				var b;
				if (!M.support.appendChecked) if (l[0] && "number" == typeof(b = l.length)) for (a = 0; b > a; a++) v(l[a]);
				else v(l);
				l.nodeType ? s.push(l) : s = M.merge(s, l)
			}
			if (n) for (i = function (e) {
				return !e.type || St.test(e.type)
			}, c = 0; s[c]; c++) if (o = s[c], r && M.nodeName(o, "script") && (!o.type || St.test(o.type))) r.push(o.parentNode ? o.parentNode.removeChild(o) : o);
			else {
				if (1 === o.nodeType) {
					var x = M.grep(o.getElementsByTagName("script"), i);
					s.splice.apply(s, [c + 1, 0].concat(x))
				}
				n.appendChild(o)
			}
			return s
		},
		cleanData: function (e) {
			for (var t, n, r, i = M.cache, o = M.event.special, a = M.support.deleteExpando, s = 0; null != (r = e[s]); s++) if ((!r.nodeName || !M.noData[r.nodeName.toLowerCase()]) && (n = r[M.expando])) {
				if (t = i[n], t && t.events) {
					for (var l in t.events) o[l] ? M.event.remove(r, l) : M.removeEvent(r, l, t.handle);
					t.handle && (t.handle.elem = null)
				}
				a ? delete r[M.expando] : r.removeAttribute && r.removeAttribute(M.expando), delete i[n]
			}
		}
	});
	var jt, At, Lt, Dt = /alpha\([^)]*\)/i,
		Ft = /opacity=([^)]*)/,
		Ot = /([A-Z]|^ms)/g,
		Mt = /^[\-+]?(?:\d*\.)?\d+$/i,
		It = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
		Pt = /^([\-+])=([\-+.\de]+)/,
		Ht = /^margin/,
		Bt = {
			position: "absolute",
			visibility: "hidden",
			display: "block"
		},
		Wt = ["Top", "Right", "Bottom", "Left"];
	M.fn.css = function (e, n) {
		return M.access(this, function (e, n, r) {
			return r !== t ? M.style(e, n, r) : M.css(e, n)
		}, e, n, arguments.length > 1)
	}, M.extend({
		cssHooks: {
			opacity: {
				get: function (e, t) {
					if (t) {
						var n = jt(e, "opacity");
						return "" === n ? "1" : n
					}
					return e.style.opacity
				}
			}
		},
		cssNumber: {
			fillOpacity: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			"float": M.support.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function (e, n, r, i) {
			if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
				var o, a, s = M.camelCase(n),
					l = e.style,
					c = M.cssHooks[s];
				if (n = M.cssProps[s] || s, r === t) return c && "get" in c && (o = c.get(e, !1, i)) !== t ? o : l[n];
				if (a = typeof r, "string" === a && (o = Pt.exec(r)) && (r = +(o[1] + 1) * +o[2] + parseFloat(M.css(e, n)), a = "number"), null == r || "number" === a && isNaN(r)) return;
				if ("number" === a && !M.cssNumber[s] && (r += "px"), !(c && "set" in c && (r = c.set(e, r)) === t)) try {
					l[n] = r
				} catch (u) {}
			}
		},
		css: function (e, n, r) {
			var i, o;
			return n = M.camelCase(n), o = M.cssHooks[n], n = M.cssProps[n] || n, "cssFloat" === n && (n = "float"), o && "get" in o && (i = o.get(e, !0, r)) !== t ? i : jt ? jt(e, n) : void 0
		},
		swap: function (e, t, n) {
			var r, i, o = {};
			for (i in t) o[i] = e.style[i], e.style[i] = t[i];
			r = n.call(e);
			for (i in t) e.style[i] = o[i];
			return r
		}
	}), M.curCSS = M.css, D.defaultView && D.defaultView.getComputedStyle && (At = function (e, t) {
		var n, r, i, o, a = e.style;
		return t = t.replace(Ot, "-$1").toLowerCase(), (r = e.ownerDocument.defaultView) && (i = r.getComputedStyle(e, null)) && (n = i.getPropertyValue(t), "" === n && !M.contains(e.ownerDocument.documentElement, e) && (n = M.style(e, t))), !M.support.pixelMargin && i && Ht.test(t) && It.test(n) && (o = a.width, a.width = n, n = i.width, a.width = o), n
	}), D.documentElement.currentStyle && (Lt = function (e, t) {
		var n, r, i, o = e.currentStyle && e.currentStyle[t],
			a = e.style;
		return null == o && a && (i = a[t]) && (o = i), It.test(o) && (n = a.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), a.left = "fontSize" === t ? "1em" : o, o = a.pixelLeft + "px", a.left = n, r && (e.runtimeStyle.left = r)), "" === o ? "auto" : o
	}), jt = At || Lt, M.each(["height", "width"], function (e, t) {
		M.cssHooks[t] = {
			get: function (e, n, r) {
				return n ? 0 !== e.offsetWidth ? m(e, t, r) : M.swap(e, Bt, function () {
					return m(e, t, r)
				}) : void 0
			},
			set: function (e, t) {
				return Mt.test(t) ? t + "px" : t
			}
		}
	}), M.support.opacity || (M.cssHooks.opacity = {
		get: function (e, t) {
			return Ft.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : t ? "1" : ""
		},
		set: function (e, t) {
			var n = e.style,
				r = e.currentStyle,
				i = M.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
				o = r && r.filter || n.filter || "";
			n.zoom = 1, t >= 1 && "" === M.trim(o.replace(Dt, "")) && (n.removeAttribute("filter"), r && !r.filter) || (n.filter = Dt.test(o) ? o.replace(Dt, i) : o + " " + i)
		}
	}), M(function () {
		M.support.reliableMarginRight || (M.cssHooks.marginRight = {
			get: function (e, t) {
				return M.swap(e, {
					display: "inline-block"
				}, function () {
					return t ? jt(e, "margin-right") : e.style.marginRight
				})
			}
		})
	}), M.expr && M.expr.filters && (M.expr.filters.hidden = function (e) {
		var t = e.offsetWidth,
			n = e.offsetHeight;
		return 0 === t && 0 === n || !M.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || M.css(e, "display"))
	}, M.expr.filters.visible = function (e) {
		return !M.expr.filters.hidden(e)
	}), M.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (e, t) {
		M.cssHooks[e + t] = {
			expand: function (n) {
				var r, i = "string" == typeof n ? n.split(" ") : [n],
					o = {};
				for (r = 0; 4 > r; r++) o[e + Wt[r] + t] = i[r] || i[r - 2] || i[0];
				return o
			}
		}
	});
	var qt, $t, zt = /%20/g,
		Rt = /\[\]$/,
		Ut = /\r?\n/g,
		Xt = /#.*$/,
		Vt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		Yt = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
		Qt = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
		Kt = /^(?:GET|HEAD)$/,
		Jt = /^\/\//,
		Gt = /\?/,
		Zt = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		en = /^(?:select|textarea)/i,
		tn = /\s+/,
		nn = /([?&])_=[^&]*/,
		rn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
		on = M.fn.load,
		an = {},
		sn = {},
		ln = ["*/"] + ["*"];
	try {
		qt = O.href
	} catch (cn) {
		qt = D.createElement("a"), qt.href = "", qt = qt.href
	}
	$t = rn.exec(qt.toLowerCase()) || [], M.fn.extend({
		load: function (e, n, r) {
			if ("string" != typeof e && on) return on.apply(this, arguments);
			if (!this.length) return this;
			var i = e.indexOf(" ");
			if (i >= 0) {
				var o = e.slice(i, e.length);
				e = e.slice(0, i)
			}
			var a = "GET";
			n && (M.isFunction(n) ? (r = n, n = t) : "object" == typeof n && (n = M.param(n, M.ajaxSettings.traditional), a = "POST"));
			var s = this;
			return M.ajax({
				url: e,
				type: a,
				dataType: "html",
				data: n,
				complete: function (e, t, n) {
					n = e.responseText, e.isResolved() && (e.done(function (e) {
						n = e
					}), s.html(o ? M("<div>").append(n.replace(Zt, "")).find(o) : n)), r && s.each(r, [n, t, e])
				}
			}), this
		},
		serialize: function () {
			return M.param(this.serializeArray())
		},
		serializeArray: function () {
			return this.map(function () {
				return this.elements ? M.makeArray(this.elements) : this
			}).filter(function () {
				return this.name && !this.disabled && (this.checked || en.test(this.nodeName) || Yt.test(this.type))
			}).map(function (e, t) {
				var n = M(this).val();
				return null == n ? null : M.isArray(n) ? M.map(n, function (e) {
					return {
						name: t.name,
						value: e.replace(Ut, "\r\n")
					}
				}) : {
					name: t.name,
					value: n.replace(Ut, "\r\n")
				}
			}).get()
		}
	}), M.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
		M.fn[t] = function (e) {
			return this.on(t, e)
		}
	}), M.each(["get", "post"], function (e, n) {
		M[n] = function (e, r, i, o) {
			return M.isFunction(r) && (o = o || i, i = r, r = t), M.ajax({
				type: n,
				url: e,
				data: r,
				success: i,
				dataType: o
			})
		}
	}), M.extend({
		getScript: function (e, n) {
			return M.get(e, t, n, "script")
		},
		getJSON: function (e, t, n) {
			return M.get(e, t, n, "json")
		},
		ajaxSetup: function (e, t) {
			return t ? f(e, M.ajaxSettings) : (t = e, e = M.ajaxSettings), f(e, t), e
		},
		ajaxSettings: {
			url: qt,
			isLocal: Qt.test($t[1]),
			global: !0,
			type: "GET",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			processData: !0,
			async: !0,
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				text: "text/plain",
				json: "application/json, text/javascript",
				"*": ln
			},
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
			converters: {
				"* text": e.String,
				"text html": !0,
				"text json": M.parseJSON,
				"text xml": M.parseXML
			},
			flatOptions: {
				context: !0,
				url: !0
			}
		},
		ajaxPrefilter: h(an),
		ajaxTransport: h(sn),
		ajax: function (e, n) {
			function r(e, n, r, a) {
				if (2 !== k) {
					k = 2, l && clearTimeout(l), s = t, o = a || "", C.readyState = e > 0 ? 4 : 0;
					var d, p, h, w, T, S = n,
						E = r ? u(m, C, r) : t;
					if (e >= 200 && 300 > e || 304 === e) if (m.ifModified && ((w = C.getResponseHeader("Last-Modified")) && (M.lastModified[i] = w), (T = C.getResponseHeader("Etag")) && (M.etag[i] = T)), 304 === e) S = "notmodified", d = !0;
					else try {
						p = c(m, E), S = "success", d = !0
					} catch (N) {
						S = "parsererror", h = N
					} else h = S, (!S || e) && (S = "error", 0 > e && (e = 0));
					C.status = e, C.statusText = "" + (n || S), d ? y.resolveWith(g, [p, S, C]) : y.rejectWith(g, [C, S, h]), C.statusCode(x), x = t, f && v.trigger("ajax" + (d ? "Success" : "Error"), [C, m, d ? p : h]), b.fireWith(g, [C, S]), f && (v.trigger("ajaxComplete", [C, m]), --M.active || M.event.trigger("ajaxStop"))
				}
			}
			"object" == typeof e && (n = e, e = t), n = n || {};
			var i, o, a, s, l, d, f, h, m = M.ajaxSetup({}, n),
				g = m.context || m,
				v = g !== m && (g.nodeType || g instanceof M) ? M(g) : M.event,
				y = M.Deferred(),
				b = M.Callbacks("once memory"),
				x = m.statusCode || {},
				w = {},
				T = {},
				k = 0,
				C = {
					readyState: 0,
					setRequestHeader: function (e, t) {
						if (!k) {
							var n = e.toLowerCase();
							e = T[n] = T[n] || e, w[e] = t
						}
						return this
					},
					getAllResponseHeaders: function () {
						return 2 === k ? o : null
					},
					getResponseHeader: function (e) {
						var n;
						if (2 === k) {
							if (!a) for (a = {}; n = Vt.exec(o);) a[n[1].toLowerCase()] = n[2];
							n = a[e.toLowerCase()]
						}
						return n === t ? null : n
					},
					overrideMimeType: function (e) {
						return k || (m.mimeType = e), this
					},
					abort: function (e) {
						return e = e || "abort", s && s.abort(e), r(0, e), this
					}
				};
			if (y.promise(C), C.success = C.done, C.error = C.fail, C.complete = b.add, C.statusCode = function (e) {
				if (e) {
					var t;
					if (2 > k) for (t in e) x[t] = [x[t], e[t]];
					else t = e[C.status], C.then(t, t)
				}
				return this
			}, m.url = ((e || m.url) + "").replace(Xt, "").replace(Jt, $t[1] + "//"), m.dataTypes = M.trim(m.dataType || "*").toLowerCase().split(tn), null == m.crossDomain && (d = rn.exec(m.url.toLowerCase()), m.crossDomain = !(!d || d[1] == $t[1] && d[2] == $t[2] && (d[3] || ("http:" === d[1] ? 80 : 443)) == ($t[3] || ("http:" === $t[1] ? 80 : 443)))), m.data && m.processData && "string" != typeof m.data && (m.data = M.param(m.data, m.traditional)), p(an, m, n, C), 2 === k) return !1;
			if (f = m.global, m.type = m.type.toUpperCase(), m.hasContent = !Kt.test(m.type), f && 0 === M.active++ && M.event.trigger("ajaxStart"), !m.hasContent && (m.data && (m.url += (Gt.test(m.url) ? "&" : "?") + m.data, delete m.data), i = m.url, m.cache === !1)) {
				var S = M.now(),
					E = m.url.replace(nn, "$1_=" + S);
				m.url = E + (E === m.url ? (Gt.test(m.url) ? "&" : "?") + "_=" + S : "")
			}(m.data && m.hasContent && m.contentType !== !1 || n.contentType) && C.setRequestHeader("Content-Type", m.contentType), m.ifModified && (i = i || m.url, M.lastModified[i] && C.setRequestHeader("If-Modified-Since", M.lastModified[i]), M.etag[i] && C.setRequestHeader("If-None-Match", M.etag[i])), C.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + ln + "; q=0.01" : "") : m.accepts["*"]);
			for (h in m.headers) C.setRequestHeader(h, m.headers[h]);
			if (m.beforeSend && (m.beforeSend.call(g, C, m) === !1 || 2 === k)) return C.abort(), !1;
			for (h in {
				success: 1,
				error: 1,
				complete: 1
			}) C[h](m[h]);
			if (s = p(sn, m, n, C)) {
				C.readyState = 1, f && v.trigger("ajaxSend", [C, m]), m.async && m.timeout > 0 && (l = setTimeout(function () {
					C.abort("timeout")
				}, m.timeout));
				try {
					k = 1, s.send(w, r)
				} catch (N) {
					if (!(2 > k)) throw N;
					r(-1, N)
				}
			} else r(-1, "No Transport");
			return C
		},
		param: function (e, n) {
			var r = [],
				i = function (e, t) {
					t = M.isFunction(t) ? t() : t, r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
				};
			if (n === t && (n = M.ajaxSettings.traditional), M.isArray(e) || e.jquery && !M.isPlainObject(e)) M.each(e, function () {
				i(this.name, this.value)
			});
			else for (var o in e) d(o, e[o], n, i);
			return r.join("&").replace(zt, "+")
		}
	}), M.extend({
		active: 0,
		lastModified: {},
		etag: {}
	});
	var un = M.now(),
		dn = /(\=)\?(&|$)|\?\?/i;
	M.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function () {
			return M.expando + "_" + un++
		}
	}), M.ajaxPrefilter("json jsonp", function (t, n, r) {
		var i = "string" == typeof t.data && /^application\/x\-www\-form\-urlencoded/.test(t.contentType);
		if ("jsonp" === t.dataTypes[0] || t.jsonp !== !1 && (dn.test(t.url) || i && dn.test(t.data))) {
			var o, a = t.jsonpCallback = M.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
				s = e[a],
				l = t.url,
				c = t.data,
				u = "$1" + a + "$2";
			return t.jsonp !== !1 && (l = l.replace(dn, u), t.url === l && (i && (c = c.replace(dn, u)), t.data === c && (l += (/\?/.test(l) ? "&" : "?") + t.jsonp + "=" + a))), t.url = l, t.data = c, e[a] = function (e) {
				o = [e]
			}, r.always(function () {
				e[a] = s, o && M.isFunction(s) && e[a](o[0])
			}), t.converters["script json"] = function () {
				return o || M.error(a + " was not called"), o[0]
			}, t.dataTypes[0] = "json", "script"
		}
	}), M.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /javascript|ecmascript/
		},
		converters: {
			"text script": function (e) {
				return M.globalEval(e), e
			}
		}
	}), M.ajaxPrefilter("script", function (e) {
		e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
	}), M.ajaxTransport("script", function (e) {
		if (e.crossDomain) {
			var n, r = D.head || D.getElementsByTagName("head")[0] || D.documentElement;
			return {
				send: function (i, o) {
					n = D.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, i) {
						(i || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, i || o(200, "success"))
					}, r.insertBefore(n, r.firstChild)
				},
				abort: function () {
					n && n.onload(0, 1)
				}
			}
		}
	});
	var fn, pn = e.ActiveXObject ?
	function () {
		for (var e in fn) fn[e](0, 1)
	} : !1,
		hn = 0;
	M.ajaxSettings.xhr = e.ActiveXObject ?
	function () {
		return !this.isLocal && l() || s()
	} : l, function (e) {
		M.extend(M.support, {
			ajax: !! e,
			cors: !! e && "withCredentials" in e
		})
	}(M.ajaxSettings.xhr()), M.support.ajax && M.ajaxTransport(function (n) {
		if (!n.crossDomain || M.support.cors) {
			var r;
			return {
				send: function (i, o) {
					var a, s, l = n.xhr();
					if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields) for (s in n.xhrFields) l[s] = n.xhrFields[s];
					n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");
					try {
						for (s in i) l.setRequestHeader(s, i[s])
					} catch (c) {}
					l.send(n.hasContent && n.data || null), r = function (e, i) {
						var s, c, u, d, f;
						try {
							if (r && (i || 4 === l.readyState)) if (r = t, a && (l.onreadystatechange = M.noop, pn && delete fn[a]), i) 4 !== l.readyState && l.abort();
							else {
								s = l.status, u = l.getAllResponseHeaders(), d = {}, f = l.responseXML, f && f.documentElement && (d.xml = f);
								try {
									d.text = l.responseText
								} catch (e) {}
								try {
									c = l.statusText
								} catch (p) {
									c = ""
								}
								s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = d.text ? 200 : 404
							}
						} catch (h) {
							i || o(-1, h)
						}
						d && o(s, c, d, u)
					}, n.async && 4 !== l.readyState ? (a = ++hn, pn && (fn || (fn = {}, M(e).unload(pn)), fn[a] = r), l.onreadystatechange = r) : r()
				},
				abort: function () {
					r && r(0, 1)
				}
			}
		}
	});
	var mn, gn, vn, yn, bn = {},
		xn = /^(?:toggle|show|hide)$/,
		wn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
		Tn = [
			["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
			["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
			["opacity"]
		];
	M.fn.extend({
		show: function (e, t, n) {
			var o, a;
			if (e || 0 === e) return this.animate(i("show", 3), e, t, n);
			for (var s = 0, l = this.length; l > s; s++) o = this[s], o.style && (a = o.style.display, !M._data(o, "olddisplay") && "none" === a && (a = o.style.display = ""), ("" === a && "none" === M.css(o, "display") || !M.contains(o.ownerDocument.documentElement, o)) && M._data(o, "olddisplay", r(o.nodeName)));
			for (s = 0; l > s; s++) o = this[s], o.style && (a = o.style.display, ("" === a || "none" === a) && (o.style.display = M._data(o, "olddisplay") || ""));
			return this
		},
		hide: function (e, t, n) {
			if (e || 0 === e) return this.animate(i("hide", 3), e, t, n);
			for (var r, o, a = 0, s = this.length; s > a; a++) r = this[a], r.style && (o = M.css(r, "display"), "none" !== o && !M._data(r, "olddisplay") && M._data(r, "olddisplay", o));
			for (a = 0; s > a; a++) this[a].style && (this[a].style.display = "none");
			return this
		},
		_toggle: M.fn.toggle,
		toggle: function (e, t, n) {
			var r = "boolean" == typeof e;
			return M.isFunction(e) && M.isFunction(t) ? this._toggle.apply(this, arguments) : null == e || r ? this.each(function () {
				var t = r ? e : M(this).is(":hidden");
				M(this)[t ? "show" : "hide"]()
			}) : this.animate(i("toggle", 3), e, t, n), this
		},
		fadeTo: function (e, t, n, r) {
			return this.filter(":hidden").css("opacity", 0).show().end().animate({
				opacity: t
			}, e, n, r)
		},
		animate: function (e, t, n, i) {
			function o() {
				a.queue === !1 && M._mark(this);
				var t, n, i, o, s, l, c, u, d, f, p, h = M.extend({}, a),
					m = 1 === this.nodeType,
					g = m && M(this).is(":hidden");
				h.animatedProperties = {};
				for (i in e) if (t = M.camelCase(i), i !== t && (e[t] = e[i], delete e[i]), (s = M.cssHooks[t]) && "expand" in s) {
					l = s.expand(e[t]), delete e[t];
					for (i in l) i in e || (e[i] = l[i])
				}
				for (t in e) {
					if (n = e[t], M.isArray(n) ? (h.animatedProperties[t] = n[1], n = e[t] = n[0]) : h.animatedProperties[t] = h.specialEasing && h.specialEasing[t] || h.easing || "swing", "hide" === n && g || "show" === n && !g) return h.complete.call(this);
					m && ("height" === t || "width" === t) && (h.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], "inline" === M.css(this, "display") && "none" === M.css(this, "float") && (M.support.inlineBlockNeedsLayout && "inline" !== r(this.nodeName) ? this.style.zoom = 1 : this.style.display = "inline-block"))
				}
				null != h.overflow && (this.style.overflow = "hidden");
				for (i in e) o = new M.fx(this, h, i), n = e[i], xn.test(n) ? (p = M._data(this, "toggle" + i) || ("toggle" === n ? g ? "show" : "hide" : 0), p ? (M._data(this, "toggle" + i, "show" === p ? "hide" : "show"), o[p]()) : o[n]()) : (c = wn.exec(n), u = o.cur(), c ? (d = parseFloat(c[2]), f = c[3] || (M.cssNumber[i] ? "" : "px"), "px" !== f && (M.style(this, i, (d || 1) + f), u = (d || 1) / o.cur() * u, M.style(this, i, u + f)), c[1] && (d = ("-=" === c[1] ? -1 : 1) * d + u), o.custom(u, d, f)) : o.custom(u, n, ""));
				return !0
			}
			var a = M.speed(t, n, i);
			return M.isEmptyObject(e) ? this.each(a.complete, [!1]) : (e = M.extend({}, e), a.queue === !1 ? this.each(o) : this.queue(a.queue, o))
		},
		stop: function (e, n, r) {
			return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
				function t(e, t, n) {
					var i = t[n];
					M.removeData(e, n, !0), i.stop(r)
				}
				var n, i = !1,
					o = M.timers,
					a = M._data(this);
				if (r || M._unmark(!0, this), null == e) for (n in a) a[n] && a[n].stop && n.indexOf(".run") === n.length - 4 && t(this, a, n);
				else a[n = e + ".run"] && a[n].stop && t(this, a, n);
				for (n = o.length; n--;) o[n].elem === this && (null == e || o[n].queue === e) && (r ? o[n](!0) : o[n].saveState(), i = !0, o.splice(n, 1));
				(!r || !i) && M.dequeue(this, e)
			})
		}
	}), M.each({
		slideDown: i("show", 1),
		slideUp: i("hide", 1),
		slideToggle: i("toggle", 1),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function (e, t) {
		M.fn[e] = function (e, n, r) {
			return this.animate(t, e, n, r)
		}
	}), M.extend({
		speed: function (e, t, n) {
			var r = e && "object" == typeof e ? M.extend({}, e) : {
				complete: n || !n && t || M.isFunction(e) && e,
				duration: e,
				easing: n && t || t && !M.isFunction(t) && t
			};
			return r.duration = M.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in M.fx.speeds ? M.fx.speeds[r.duration] : M.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function (e) {
				M.isFunction(r.old) && r.old.call(this), r.queue ? M.dequeue(this, r.queue) : e !== !1 && M._unmark(this)
			}, r
		},
		easing: {
			linear: function (e) {
				return e
			},
			swing: function (e) {
				return -Math.cos(e * Math.PI) / 2 + .5
			}
		},
		timers: [],
		fx: function (e, t, n) {
			this.options = t, this.elem = e, this.prop = n, t.orig = t.orig || {}
		}
	}), M.fx.prototype = {
		update: function () {
			this.options.step && this.options.step.call(this.elem, this.now, this), (M.fx.step[this.prop] || M.fx.step._default)(this)
		},
		cur: function () {
			if (null != this.elem[this.prop] && (!this.elem.style || null == this.elem.style[this.prop])) return this.elem[this.prop];
			var e, t = M.css(this.elem, this.prop);
			return isNaN(e = parseFloat(t)) ? t && "auto" !== t ? t : 0 : e
		},
		custom: function (e, n, r) {
			function i(e) {
				return o.step(e)
			}
			var o = this,
				s = M.fx;
			this.startTime = yn || a(), this.end = n, this.now = this.start = e, this.pos = this.state = 0, this.unit = r || this.unit || (M.cssNumber[this.prop] ? "" : "px"), i.queue = this.options.queue, i.elem = this.elem, i.saveState = function () {
				M._data(o.elem, "fxshow" + o.prop) === t && (o.options.hide ? M._data(o.elem, "fxshow" + o.prop, o.start) : o.options.show && M._data(o.elem, "fxshow" + o.prop, o.end))
			}, i() && M.timers.push(i) && !vn && (vn = setInterval(s.tick, s.interval))
		},
		show: function () {
			var e = M._data(this.elem, "fxshow" + this.prop);
			this.options.orig[this.prop] = e || M.style(this.elem, this.prop), this.options.show = !0, e !== t ? this.custom(this.cur(), e) : this.custom("width" === this.prop || "height" === this.prop ? 1 : 0, this.cur()), M(this.elem).show()
		},
		hide: function () {
			this.options.orig[this.prop] = M._data(this.elem, "fxshow" + this.prop) || M.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
		},
		step: function (e) {
			var t, n, r, i = yn || a(),
				o = !0,
				s = this.elem,
				l = this.options;
			if (e || i >= l.duration + this.startTime) {
				this.now = this.end, this.pos = this.state = 1, this.update(), l.animatedProperties[this.prop] = !0;
				for (t in l.animatedProperties) l.animatedProperties[t] !== !0 && (o = !1);
				if (o) {
					if (null != l.overflow && !M.support.shrinkWrapBlocks && M.each(["", "X", "Y"], function (e, t) {
						s.style["overflow" + t] = l.overflow[e]
					}), l.hide && M(s).hide(), l.hide || l.show) for (t in l.animatedProperties) M.style(s, t, l.orig[t]), M.removeData(s, "fxshow" + t, !0), M.removeData(s, "toggle" + t, !0);
					r = l.complete, r && (l.complete = !1, r.call(s))
				}
				return !1
			}
			return 1 / 0 == l.duration ? this.now = i : (n = i - this.startTime, this.state = n / l.duration, this.pos = M.easing[l.animatedProperties[this.prop]](this.state, n, 0, 1, l.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0
		}
	}, M.extend(M.fx, {
		tick: function () {
			for (var e, t = M.timers, n = 0; t.length > n; n++) e = t[n], !e() && t[n] === e && t.splice(n--, 1);
			t.length || M.fx.stop()
		},
		interval: 13,
		stop: function () {
			clearInterval(vn), vn = null
		},
		speeds: {
			slow: 600,
			fast: 200,
			_default: 400
		},
		step: {
			opacity: function (e) {
				M.style(e.elem, "opacity", e.now)
			},
			_default: function (e) {
				e.elem.style && null != e.elem.style[e.prop] ? e.elem.style[e.prop] = e.now + e.unit : e.elem[e.prop] = e.now
			}
		}
	}), M.each(Tn.concat.apply([], Tn), function (e, t) {
		t.indexOf("margin") && (M.fx.step[t] = function (e) {
			M.style(e.elem, t, Math.max(0, e.now) + e.unit)
		})
	}), M.expr && M.expr.filters && (M.expr.filters.animated = function (e) {
		return M.grep(M.timers, function (t) {
			return e === t.elem
		}).length
	});
	var kn, Cn = /^t(?:able|d|h)$/i,
		Sn = /^(?:body|html)$/i;
	kn = "getBoundingClientRect" in D.documentElement ?
	function (e, t, r, i) {
		try {
			i = e.getBoundingClientRect()
		} catch (o) {}
		if (!i || !M.contains(r, e)) return i ? {
			top: i.top,
			left: i.left
		} : {
			top: 0,
			left: 0
		};
		var a = t.body,
			s = n(t),
			l = r.clientTop || a.clientTop || 0,
			c = r.clientLeft || a.clientLeft || 0,
			u = s.pageYOffset || M.support.boxModel && r.scrollTop || a.scrollTop,
			d = s.pageXOffset || M.support.boxModel && r.scrollLeft || a.scrollLeft,
			f = i.top + u - l,
			p = i.left + d - c;
		return {
			top: f,
			left: p
		}
	} : function (e, t, n) {
		for (var r, i = e.offsetParent, o = e, a = t.body, s = t.defaultView, l = s ? s.getComputedStyle(e, null) : e.currentStyle, c = e.offsetTop, u = e.offsetLeft;
		(e = e.parentNode) && e !== a && e !== n && (!M.support.fixedPosition || "fixed" !== l.position);) r = s ? s.getComputedStyle(e, null) : e.currentStyle, c -= e.scrollTop, u -= e.scrollLeft, e === i && (c += e.offsetTop, u += e.offsetLeft, M.support.doesNotAddBorder && (!M.support.doesAddBorderForTableAndCells || !Cn.test(e.nodeName)) && (c += parseFloat(r.borderTopWidth) || 0, u += parseFloat(r.borderLeftWidth) || 0), o = i, i = e.offsetParent), M.support.subtractsBorderForOverflowNotVisible && "visible" !== r.overflow && (c += parseFloat(r.borderTopWidth) || 0, u += parseFloat(r.borderLeftWidth) || 0), l = r;
		return ("relative" === l.position || "static" === l.position) && (c += a.offsetTop, u += a.offsetLeft), M.support.fixedPosition && "fixed" === l.position && (c += Math.max(n.scrollTop, a.scrollTop), u += Math.max(n.scrollLeft, a.scrollLeft)), {
			top: c,
			left: u
		}
	}, M.fn.offset = function (e) {
		if (arguments.length) return e === t ? this : this.each(function (t) {
			M.offset.setOffset(this, e, t)
		});
		var n = this[0],
			r = n && n.ownerDocument;
		return r ? n === r.body ? M.offset.bodyOffset(n) : kn(n, r, r.documentElement) : null
	}, M.offset = {
		bodyOffset: function (e) {
			var t = e.offsetTop,
				n = e.offsetLeft;
			return M.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(M.css(e, "marginTop")) || 0, n += parseFloat(M.css(e, "marginLeft")) || 0), {
				top: t,
				left: n
			}
		},
		setOffset: function (e, t, n) {
			var r = M.css(e, "position");
			"static" === r && (e.style.position = "relative");
			var i, o, a = M(e),
				s = a.offset(),
				l = M.css(e, "top"),
				c = M.css(e, "left"),
				u = ("absolute" === r || "fixed" === r) && M.inArray("auto", [l, c]) > -1,
				d = {},
				f = {};
			u ? (f = a.position(), i = f.top, o = f.left) : (i = parseFloat(l) || 0, o = parseFloat(c) || 0), M.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (d.top = t.top - s.top + i), null != t.left && (d.left = t.left - s.left + o), "using" in t ? t.using.call(e, d) : a.css(d)
		}
	}, M.fn.extend({
		position: function () {
			if (!this[0]) return null;
			var e = this[0],
				t = this.offsetParent(),
				n = this.offset(),
				r = Sn.test(t[0].nodeName) ? {
					top: 0,
					left: 0
				} : t.offset();
			return n.top -= parseFloat(M.css(e, "marginTop")) || 0, n.left -= parseFloat(M.css(e, "marginLeft")) || 0, r.top += parseFloat(M.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(M.css(t[0], "borderLeftWidth")) || 0, {
				top: n.top - r.top,
				left: n.left - r.left
			}
		},
		offsetParent: function () {
			return this.map(function () {
				for (var e = this.offsetParent || D.body; e && !Sn.test(e.nodeName) && "static" === M.css(e, "position");) e = e.offsetParent;
				return e
			})
		}
	}), M.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function (e, r) {
		var i = /Y/.test(r);
		M.fn[e] = function (o) {
			return M.access(this, function (e, o, a) {
				var s = n(e);
				return a === t ? s ? r in s ? s[r] : M.support.boxModel && s.document.documentElement[o] || s.document.body[o] : e[o] : (s ? s.scrollTo(i ? M(s).scrollLeft() : a, i ? a : M(s).scrollTop()) : e[o] = a, void 0)
			}, e, o, arguments.length, null)
		}
	}), M.each({
		Height: "height",
		Width: "width"
	}, function (e, n) {
		var r = "client" + e,
			i = "scroll" + e,
			o = "offset" + e;
		M.fn["inner" + e] = function () {
			var e = this[0];
			return e ? e.style ? parseFloat(M.css(e, n, "padding")) : this[n]() : null
		}, M.fn["outer" + e] = function (e) {
			var t = this[0];
			return t ? t.style ? parseFloat(M.css(t, n, e ? "margin" : "border")) : this[n]() : null
		}, M.fn[n] = function (e) {
			return M.access(this, function (e, n, a) {
				var s, l, c, u;
				return M.isWindow(e) ? (s = e.document, l = s.documentElement[r], M.support.boxModel && l || s.body && s.body[r] || l) : 9 === e.nodeType ? (s = e.documentElement, s[r] >= s[i] ? s[r] : Math.max(e.body[i], s[i], e.body[o], s[o])) : a === t ? (c = M.css(e, n), u = parseFloat(c), M.isNumeric(u) ? u : c) : (M(e).css(n, a), void 0)
			}, n, e, arguments.length, null)
		}
	}), e.jQuery = e.$ = M, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
		return M
	})
})(window), jQuery.fn.hammer = function (e) {
	return this.each(function () {
		var t = new Hammer(this, e),
			n = jQuery(this);
		n.data("hammer", t);
		for (var r = ["hold", "tap", "doubletap", "transformstart", "transform", "transformend", "dragstart", "drag", "dragend", "swipe", "release"], i = 0; r.length > i; i++) t["on" + r[i]] = function (e, t) {
			return function (n) {
				e.trigger(jQuery.Event(t, n))
			}
		}(n, r[i])
	})
}, function (e) {
	var t = "waitForImages";
	e.waitForImages = {
		hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage"]
	}, e.expr[":"].uncached = function (t) {
		if (!e(t).is('img[src!=""]')) return !1;
		var n = new Image;
		return n.src = t.src, !n.complete
	}, e.fn.waitForImages = function (n, r, i) {
		var o = 0,
			a = 0;
		if (e.isPlainObject(arguments[0]) && (n = arguments[0].finished, r = arguments[0].each, i = arguments[0].waitForAll), n = n || e.noop, r = r || e.noop, i = !! i, !e.isFunction(n) || !e.isFunction(r)) throw new TypeError("An invalid callback was supplied.");
		return this.each(function () {
			var s = e(this),
				l = [],
				c = e.waitForImages.hasImageProperties || [],
				u = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
			i ? s.find("*").andSelf().each(function () {
				var t = e(this);
				t.is("img:uncached") && l.push({
					src: t.attr("src"),
					element: t[0]
				}), e.each(c, function (e, n) {
					var r, i = t.css(n);
					if (!i) return !0;
					for (; r = u.exec(i);) l.push({
						src: r[2],
						element: t[0]
					})
				})
			}) : s.find("img:uncached").each(function () {
				l.push({
					src: this.src,
					element: this
				})
			}), o = l.length, a = 0, 0 === o && n.call(s[0]), e.each(l, function (i, l) {
				var c = new Image;
				e(c).bind("load." + t + " error." + t, function (e) {
					return a++, r.call(l.element, a, o, "load" == e.type), a == o ? (n.call(s[0]), !1) : void 0
				}), c.src = l.src
			})
		})
	}
}(jQuery), function (e, t, n, r) {
	var i = n(e),
		o = n(t),
		a = n.fancybox = function () {
			a.open.apply(this, arguments)
		},
		s = !1,
		l = t.createTouch !== r,
		c = function (e) {
			return "string" === n.type(e)
		},
		u = function (e, t) {
			return t && c(e) && e.indexOf("%") > 0 && (e = a.getViewport()[t] / 100 * parseInt(e, 10)), Math.round(e) + "px"
		};
	n.extend(a, {
		version: "2.0.5",
		defaults: {
			padding: 15,
			margin: 20,
			width: 800,
			height: 600,
			minWidth: 100,
			minHeight: 100,
			maxWidth: 9999,
			maxHeight: 9999,
			autoSize: !0,
			autoResize: !l,
			autoCenter: !l,
			fitToView: !0,
			aspectRatio: !1,
			topRatio: .5,
			fixed: !1,
			scrolling: "auto",
			wrapCSS: "",
			arrows: !0,
			closeBtn: !0,
			closeClick: !1,
			nextClick: !1,
			mouseWheel: !0,
			autoPlay: !1,
			playSpeed: 3e3,
			preload: 3,
			modal: !1,
			loop: !0,
			ajax: {
				dataType: "html",
				headers: {
					"X-fancyBox": !0
				}
			},
			keys: {
				next: [13, 32, 34, 39, 40],
				prev: [8, 33, 37, 38],
				close: [27]
			},
			tpl: {
				wrap: '<div class="fancybox-wrap"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image: '<img class="fancybox-image" src="{href}" alt="" />',
				iframe: '<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0"' + (n.browser.msie ? ' allowtransparency="true"' : "") + "></iframe>",
				swf: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',
				error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn: '<div title="Close" class="fancybox-item fancybox-close"></div>',
				next: '<a title="Next" class="fancybox-nav fancybox-next"><span></span></a>',
				prev: '<a title="Previous" class="fancybox-nav fancybox-prev"><span></span></a>'
			},
			openEffect: "fade",
			openSpeed: 300,
			openEasing: "swing",
			openOpacity: !0,
			openMethod: "zoomIn",
			closeEffect: "fade",
			closeSpeed: 300,
			closeEasing: "swing",
			closeOpacity: !0,
			closeMethod: "zoomOut",
			nextEffect: "elastic",
			nextSpeed: 300,
			nextEasing: "swing",
			nextMethod: "changeIn",
			prevEffect: "elastic",
			prevSpeed: 300,
			prevEasing: "swing",
			prevMethod: "changeOut",
			helpers: {
				overlay: {
					speedIn: 0,
					speedOut: 300,
					opacity: .8,
					css: {
						cursor: "pointer"
					},
					closeClick: !0
				},
				title: {
					type: "float"
				}
			}
		},
		group: {},
		opts: {},
		coming: null,
		current: null,
		isOpen: !1,
		isOpened: !1,
		player: {
			timer: null,
			isActive: !1
		},
		ajaxLoad: null,
		imgPreload: null,
		transitions: {},
		helpers: {},
		open: function (e, t) {
			a.close(!0), e && !n.isArray(e) && (e = e instanceof n ? n(e).get() : [e]), a.isActive = !0, a.opts = n.extend(!0, {}, a.defaults, t), n.isPlainObject(t) && t.keys !== r && (a.opts.keys = t.keys ? n.extend({}, a.defaults.keys, t.keys) : !1), a.group = e, a._start(a.opts.index || 0)
		},
		cancel: function () {
			a.coming && !1 === a.trigger("onCancel") || (a.coming = null, a.hideLoading(), a.ajaxLoad && a.ajaxLoad.abort(), a.ajaxLoad = null, a.imgPreload && (a.imgPreload.onload = a.imgPreload.onabort = a.imgPreload.onerror = null))
		},
		close: function (e) {
			a.cancel(), a.current && !1 !== a.trigger("beforeClose") && (a.unbindEvents(), !a.isOpen || e && !0 === e[0] ? (n(".fancybox-wrap").stop().trigger("onReset").remove(), a._afterZoomOut()) : (a.isOpen = a.isOpened = !1, n(".fancybox-item, .fancybox-nav").remove(), a.wrap.stop(!0).removeClass("fancybox-opened"), a.inner.css("overflow", "hidden"), a.transitions[a.current.closeMethod]()))
		},
		play: function (e) {
			var t = function () {
				clearTimeout(a.player.timer)
			},
				r = function () {
					t(), a.current && a.player.isActive && (a.player.timer = setTimeout(a.next, a.current.playSpeed))
				},
				i = function () {
					t(), n("body").unbind(".player"), a.player.isActive = !1, a.trigger("onPlayEnd")
				};
			a.player.isActive || e && !1 === e[0] ? i() : a.current && (a.current.loop || a.current.index < a.group.length - 1) && (a.player.isActive = !0, n("body").bind({
				"afterShow.player onUpdate.player": r,
				"onCancel.player beforeClose.player": i,
				"beforeLoad.player": t
			}), r(), a.trigger("onPlayStart"))
		},
		next: function () {
			a.current && a.jumpto(a.current.index + 1)
		},
		prev: function () {
			a.current && a.jumpto(a.current.index - 1)
		},
		jumpto: function (e) {
			a.current && (e = parseInt(e, 10), a.group.length > 1 && a.current.loop && (e >= a.group.length ? e = 0 : 0 > e && (e = a.group.length - 1)), a.group[e] !== r && (a.cancel(), a._start(e)))
		},
		reposition: function (e, t) {
			var n;
			a.isOpen && (n = a._getPosition(t), e && "scroll" === e.type ? (delete n.position, a.wrap.stop(!0, !0).animate(n, 200)) : a.wrap.css(n))
		},
		update: function (e) {
			a.isOpen && (s || setTimeout(function () {
				var t = a.current,
					n = !e || e && "orientationchange" === e.type;
				s && (s = !1, t) && ((!e || "scroll" !== e.type || n) && (t.autoSize && "iframe" !== t.type && (a.inner.height("auto"), t.height = a.inner.height()), (t.autoResize || n) && a._setDimension(), t.canGrow && "iframe" !== t.type && a.inner.height("auto")), (t.autoCenter || n) && a.reposition(e), a.trigger("onUpdate"))
			}, 200), s = !0)
		},
		toggle: function () {
			a.isOpen && (a.current.fitToView = !a.current.fitToView, a.update())
		},
		hideLoading: function () {
			o.unbind("keypress.fb"), n("#fancybox-loading").remove()
		},
		showLoading: function () {
			a.hideLoading(), o.bind("keypress.fb", function (e) {
				27 === e.keyCode && (e.preventDefault(), a.cancel())
			}), n('<div id="fancybox-loading"><div></div></div>').click(a.cancel).appendTo("body")
		},
		getViewport: function () {
			return {
				x: i.scrollLeft(),
				y: i.scrollTop(),
				w: l && e.innerWidth ? e.innerWidth : i.width(),
				h: l && e.innerHeight ? e.innerHeight : i.height()
			}
		},
		unbindEvents: function () {
			a.wrap && a.wrap.unbind(".fb"), o.unbind(".fb"), i.unbind(".fb")
		},
		bindEvents: function () {
			var e = a.current,
				t = e.keys;
			e && (i.bind("resize.fb orientationchange.fb" + (e.autoCenter && !e.fixed ? " scroll.fb" : ""), a.update), t && o.bind("keydown.fb", function (e) {
				var r;
				r = e.target || e.srcElement, e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || r && (r.type || n(r).is("[contenteditable]")) || (r = e.keyCode, n.inArray(r, t.close) > -1 ? (a.close(), e.preventDefault()) : n.inArray(r, t.next) > -1 ? (a.next(), e.preventDefault()) : n.inArray(r, t.prev) > -1 && (a.prev(), e.preventDefault()))
			}), n.fn.mousewheel && e.mouseWheel && a.group.length > 1 && a.wrap.bind("mousewheel.fb", function (e, t) {
				var n = e.target || null;
				0 === t || n && 0 !== n.clientHeight && (n.scrollHeight !== n.clientHeight || n.scrollWidth !== n.clientWidth) || (e.preventDefault(), a[t > 0 ? "prev" : "next"]())
			}))
		},
		trigger: function (e, t) {
			var r, i = t || a[n.inArray(e, ["onCancel", "beforeLoad", "afterLoad"]) > -1 ? "coming" : "current"];
			if (i) {
				if (n.isFunction(i[e]) && (r = i[e].apply(i, Array.prototype.slice.call(arguments, 1))), !1 === r) return !1;
				i.helpers && n.each(i.helpers, function (t, r) {
					r && n.isPlainObject(a.helpers[t]) && n.isFunction(a.helpers[t][e]) && a.helpers[t][e](r, i)
				}), n.event.trigger(e + ".fb")
			}
		},
		isImage: function (e) {
			return c(e) && e.match(/\.(jpe?g|gif|png|bmp)((\?|#).*)?$/i)
		},
		isSWF: function (e) {
			return c(e) && e.match(/\.(swf)((\?|#).*)?$/i)
		},
		_start: function (e) {
			var t, r, i, o = {},
				s = a.group[e] || null;
			if (s && (s.nodeType || s instanceof n) && (t = !0, n.metadata && (o = n(s).metadata())), o = n.extend(!0, {}, a.opts, {
				index: e,
				element: s
			}, n.isPlainObject(s) ? s : o), n.each(["href", "title", "content", "type"], function (e, r) {
				o[r] = a.opts[r] || t && n(s).attr(r) || o[r] || null
			}), "number" == typeof o.margin && (o.margin = [o.margin, o.margin, o.margin, o.margin]), o.modal && n.extend(!0, o, {
				closeBtn: !1,
				closeClick: !1,
				nextClick: !1,
				arrows: !1,
				mouseWheel: !1,
				keys: null,
				helpers: {
					overlay: {
						css: {
							cursor: "auto"
						},
						closeClick: !1
					}
				}
			}), a.coming = o, !1 === a.trigger("beforeLoad")) a.coming = null;
			else switch (r = o.type, e = o.href || s, r || (t && (r = n(s).data("fancybox-type"), r || (r = (r = s.className.match(/fancybox\.(\w+)/)) ? r[1] : null)), !r && c(e) && (a.isImage(e) ? r = "image" : a.isSWF(e) ? r = "swf" : e.match(/^#/) && (r = "inline")), r || (r = t ? "inline" : "html"), o.type = r), "inline" === r || "html" === r ? (o.content || (o.content = "inline" === r ? n(c(e) ? e.replace(/.*(?=#[^\s]+$)/, "") : e) : s), o.content && o.content.length || (r = null)) : e || (r = null), "ajax" === r && c(e) && (i = e.split(/\s+/, 2), e = i.shift(), o.selector = i.shift()), o.href = e, o.group = a.group, o.isDom = t, r) {
			case "image":
				a._loadImage();
				break;
			case "ajax":
				a._loadAjax();
				break;
			case "inline":
			case "iframe":
			case "swf":
			case "html":
				a._afterLoad();
				break;
			default:
				a._error("type")
			}
		},
		_error: function (e) {
			a.hideLoading(), n.extend(a.coming, {
				type: "html",
				autoSize: !0,
				minWidth: 0,
				minHeight: 0,
				padding: 15,
				hasError: e,
				content: a.coming.tpl.error
			}), a._afterLoad()
		},
		_loadImage: function () {
			var e = a.imgPreload = new Image;
			e.onload = function () {
				this.onload = this.onerror = null, a.coming.width = this.width, a.coming.height = this.height, a._afterLoad()
			}, e.onerror = function () {
				this.onload = this.onerror = null, a._error("image")
			}, e.src = a.coming.href, (e.complete === r || !e.complete) && a.showLoading()
		},
		_loadAjax: function () {
			a.showLoading(), a.ajaxLoad = n.ajax(n.extend({}, a.coming.ajax, {
				url: a.coming.href,
				error: function (e, t) {
					a.coming && "abort" !== t ? a._error("ajax", e) : a.hideLoading()
				},
				success: function (e, t) {
					"success" === t && (a.coming.content = e, a._afterLoad())
				}
			}))
		},
		_preloadImages: function () {
			var e, t, r, i = a.group,
				o = a.current,
				s = i.length,
				l = Math.min(o.preload, s - 1);
			if (o.preload && !(2 > i.length)) for (r = 1; l >= r; r += 1) e = i[(o.index + r) % s], t = e.href || n(e).attr("href") || e, ("image" === e.type || a.isImage(t)) && ((new Image).src = t)
		},
		_afterLoad: function () {
			a.hideLoading(), a.coming && !1 !== a.trigger("afterLoad", a.current) ? (a.isOpened ? (n(".fancybox-item, .fancybox-nav").remove(), a.wrap.stop(!0).removeClass("fancybox-opened"), a.inner.css("overflow", "hidden"), a.transitions[a.current.prevMethod]()) : (n(".fancybox-wrap").stop().trigger("onReset").remove(), a.trigger("afterClose")), a.unbindEvents(), a.isOpen = !1, a.current = a.coming, a.wrap = n(a.current.tpl.wrap).addClass("fancybox-" + (l ? "mobile" : "desktop") + " fancybox-type-" + a.current.type + " fancybox-tmp " + a.current.wrapCSS).appendTo("body"), a.skin = n(".fancybox-skin", a.wrap).css("padding", u(a.current.padding)), a.outer = n(".fancybox-outer", a.wrap), a.inner = n(".fancybox-inner", a.wrap), a._setContent()) : a.coming = !1
		},
		_setContent: function () {
			var e = a.current,
				t = e.content,
				r = e.type,
				i = e.minWidth,
				o = e.minHeight,
				s = e.maxWidth,
				c = e.maxHeight;
			switch (r) {
			case "inline":
			case "ajax":
			case "html":
				e.selector ? t = n("<div>").html(t).find(e.selector) : t instanceof n && (t.parent().hasClass("fancybox-inner") && t.parents(".fancybox-wrap").unbind("onReset"), t = t.show().detach(), n(a.wrap).bind("onReset", function () {
					t.appendTo("body").hide()
				})), e.autoSize && (i = n('<div class="fancybox-wrap ' + a.current.wrapCSS + ' fancybox-tmp"></div>').appendTo("body").css({
					minWidth: u(i, "w"),
					minHeight: u(o, "h"),
					maxWidth: u(s, "w"),
					maxHeight: u(c, "h")
				}).append(t), e.width = i.width(), e.height = i.height(), i.width(a.current.width), i.height() > e.height && (i.width(e.width + 1), e.width = i.width(), e.height = i.height()), t = i.contents().detach(), i.remove());
				break;
			case "image":
				t = e.tpl.image.replace("{href}", e.href), e.aspectRatio = !0;
				break;
			case "swf":
				t = e.tpl.swf.replace(/\{width\}/g, e.width).replace(/\{height\}/g, e.height).replace(/\{href\}/g, e.href);
				break;
			case "iframe":
				t = n(e.tpl.iframe.replace("{rnd}", (new Date).getTime())).attr("scrolling", e.scrolling).attr("src", e.href), e.scrolling = l ? "scroll" : "auto"
			}("image" === r || "swf" === r) && (e.autoSize = !1, e.scrolling = "visible"), "iframe" === r && e.autoSize ? (a.showLoading(), a._setDimension(), a.inner.css("overflow", e.scrolling), t.bind({
				onCancel: function () {
					n(this).unbind(), a._afterZoomOut()
				},
				load: function () {
					a.hideLoading();
					try {
						this.contentWindow.document.location && (a.current.height = n(this).contents().find("body").height())
					} catch (e) {
						a.current.autoSize = !1
					}
					a[a.isOpen ? "_afterZoomIn" : "_beforeShow"]()
				}
			}).appendTo(a.inner)) : (a.inner.append(t), a._beforeShow())
		},
		_beforeShow: function () {
			a.coming = null, a.trigger("beforeShow"), a._setDimension(), a.wrap.hide().removeClass("fancybox-tmp"), a.bindEvents(), a._preloadImages(), a.transitions[a.isOpened ? a.current.nextMethod : a.current.openMethod]()
		},
		_setDimension: function () {
			var e, t = a.wrap,
				r = a.inner,
				i = a.current,
				o = a.getViewport(),
				s = i.margin,
				l = 2 * i.padding,
				d = i.width,
				f = i.height,
				p = i.maxWidth + l,
				h = i.maxHeight + l,
				m = i.minWidth + l,
				g = i.minHeight + l;
			if (o.w -= s[1] + s[3], o.h -= s[0] + s[2], c(d) && d.indexOf("%") > 0 && (d = (o.w - l) * parseFloat(d) / 100), c(f) && f.indexOf("%") > 0 && (f = (o.h - l) * parseFloat(f) / 100), s = d / f, d += l, f += l, i.fitToView && (p = Math.min(o.w, p), h = Math.min(o.h, h)), i.aspectRatio ? (d > p && (d = p, f = (d - l) / s + l), f > h && (f = h, d = (f - l) * s + l), m > d && (d = m, f = (d - l) / s + l), g > f && (f = g, d = (f - l) * s + l)) : (d = Math.max(m, Math.min(d, p)), f = Math.max(g, Math.min(f, h))), d = Math.round(d), f = Math.round(f), n(t.add(r)).width("auto").height("auto"), r.width(d - l).height(f - l), t.width(d), e = t.height(), d > p || e > h) for (;
			(d > p || e > h) && d > m && e > g;) f -= 10, i.aspectRatio ? (d = Math.round((f - l) * s + l), m > d && (d = m, f = (d - l) / s + l)) : d -= 10, r.width(d - l).height(f - l), t.width(d), e = t.height();
			i.dim = {
				width: u(d),
				height: u(e)
			}, i.canGrow = i.autoSize && f > g && h > f, i.canShrink = !1, i.canExpand = !1, i.width > d - l || i.height > f - l ? i.canExpand = !0 : (d > o.w || e > o.h) && d > m && f > g && (i.canShrink = !0), a.innerSpace = e - l - r.height()
		},
		_getPosition: function (e) {
			var t = a.current,
				n = a.getViewport(),
				r = t.margin,
				i = a.wrap.width() + r[1] + r[3],
				o = a.wrap.height() + r[0] + r[2],
				s = {
					position: "absolute",
					top: r[0] + n.y,
					left: r[3] + n.x
				};
			return t.autoCenter && t.fixed && !e && n.h >= o && n.w >= i && (s = {
				position: "fixed",
				top: r[0],
				left: r[3]
			}), s.top = u(Math.max(s.top, s.top + (n.h - o) * t.topRatio)), s.left = u(Math.max(s.left, s.left + .5 * (n.w - i))), s
		},
		_afterZoomIn: function () {
			var e = a.current,
				t = e ? e.scrolling : "no";
			e && (a.isOpen = a.isOpened = !0, a.wrap.addClass("fancybox-opened"), a.inner.css("overflow", "yes" === t ? "scroll" : "no" === t ? "hidden" : t), a.trigger("afterShow"), a.update(), (e.closeClick || e.nextClick) && a.inner.css("cursor", "pointer").bind("click.fb", function (t) {
				n(t.target).is("a") || n(t.target).parent().is("a") || a[e.closeClick ? "close" : "next"]()
			}), e.closeBtn && n(e.tpl.closeBtn).appendTo(a.skin).bind("click.fb", a.close), e.arrows && a.group.length > 1 && ((e.loop || e.index > 0) && n(e.tpl.prev).appendTo(a.outer).bind("click.fb", a.prev), (e.loop || e.index < a.group.length - 1) && n(e.tpl.next).appendTo(a.outer).bind("click.fb", a.next)), a.opts.autoPlay && !a.player.isActive) && (a.opts.autoPlay = !1, a.play())
		},
		_afterZoomOut: function () {
			var e = a.current;
			a.wrap.trigger("onReset").remove(), n.extend(a, {
				group: {},
				opts: {},
				current: null,
				isActive: !1,
				isOpened: !1,
				isOpen: !1,
				wrap: null,
				skin: null,
				outer: null,
				inner: null
			}), a.trigger("afterClose", e)
		}
	}), a.transitions = {
		getOrigPosition: function () {
			var e = a.current,
				t = e.element,
				r = e.padding,
				i = n(e.orig),
				o = {},
				s = 50,
				l = 50;
			return !i.length && e.isDom && n(t).is(":visible") && (i = n(t).find("img:first"), i.length || (i = n(t))), i.length ? (o = i.offset(), i.is("img") && (s = i.outerWidth(), l = i.outerHeight())) : (e = a.getViewport(), o.top = e.y + .5 * (e.h - l), o.left = e.x + .5 * (e.w - s)), o = {
				top: u(o.top - r),
				left: u(o.left - r),
				width: u(s + 2 * r),
				height: u(l + 2 * r)
			}
		},
		step: function (e, t) {
			var n, r, i = t.prop;
			("width" === i || "height" === i) && (n = Math.ceil(e - 2 * a.current.padding), "height" === i && (r = (e - t.start) / (t.end - t.start), t.start > t.end && (r = 1 - r), n -= a.innerSpace * r), a.inner[i](n))
		},
		zoomIn: function () {
			var e = a.wrap,
				t = a.current,
				r = t.openEffect,
				i = "elastic" === r,
				o = n.extend({}, t.dim, a._getPosition(i)),
				s = n.extend({
					opacity: 1
				}, o);
			delete s.position, i ? (o = this.getOrigPosition(), t.openOpacity && (o.opacity = 0), a.outer.add(a.inner).width("auto").height("auto")) : "fade" === r && (o.opacity = 0), e.css(o).show().animate(s, {
				duration: "none" === r ? 0 : t.openSpeed,
				easing: t.openEasing,
				step: i ? this.step : null,
				complete: a._afterZoomIn
			})
		},
		zoomOut: function () {
			var e = a.wrap,
				t = a.current,
				n = t.openEffect,
				r = "elastic" === n,
				i = {
					opacity: 0
				};
			r && ("fixed" === e.css("position") && e.css(a._getPosition(!0)), i = this.getOrigPosition(), t.closeOpacity && (i.opacity = 0)), e.animate(i, {
				duration: "none" === n ? 0 : t.closeSpeed,
				easing: t.closeEasing,
				step: r ? this.step : null,
				complete: a._afterZoomOut
			})
		},
		changeIn: function () {
			var e = a.wrap,
				t = a.current,
				n = t.nextEffect,
				r = "elastic" === n,
				i = a._getPosition(r),
				o = {
					opacity: 1
				};
			i.opacity = 0, r && (i.top = u(parseInt(i.top, 10) - 200), o.top = "+=200px"), e.css(i).show().animate(o, {
				duration: "none" === n ? 0 : t.nextSpeed,
				easing: t.nextEasing,
				complete: a._afterZoomIn
			})
		},
		changeOut: function () {
			var e = a.wrap,
				t = a.current,
				r = t.prevEffect,
				i = {
					opacity: 0
				};
			e.removeClass("fancybox-opened"), "elastic" === r && (i.top = "+=200px"), e.animate(i, {
				duration: "none" === r ? 0 : t.prevSpeed,
				easing: t.prevEasing,
				complete: function () {
					n(this).trigger("onReset").remove()
				}
			})
		}
	}, a.helpers.overlay = {
		overlay: null,
		update: function () {
			var e, r;
			this.overlay.width("100%").height("100%"), n.browser.msie || l ? (e = Math.max(t.documentElement.scrollWidth, t.body.scrollWidth), r = Math.max(t.documentElement.offsetWidth, t.body.offsetWidth), e = r > e ? i.width() : e) : e = o.width(), this.overlay.width(e).height(o.height())
		},
		beforeShow: function (e) {
			this.overlay || (e = n.extend(!0, {}, a.defaults.helpers.overlay, e), this.overlay = n('<div id="fancybox-overlay"></div>').css(e.css).appendTo("body"), e.closeClick && this.overlay.bind("click.fb", a.close), a.current.fixed && !l ? this.overlay.addClass("overlay-fixed") : (this.update(), this.onUpdate = function () {
				this.update()
			}), this.overlay.fadeTo(e.speedIn, e.opacity))
		},
		afterClose: function (e) {
			this.overlay && this.overlay.fadeOut(e.speedOut || 0, function () {
				n(this).remove()
			}), this.overlay = null
		}
	}, a.helpers.title = {
		beforeShow: function (e) {
			var t;
			(t = a.current.title) && (t = n('<div class="fancybox-title fancybox-title-' + e.type + '-wrap">' + t + "</div>").appendTo("body"), "float" === e.type && (t.width(t.width()), t.wrapInner('<span class="child"></span>'), a.current.margin[2] += Math.abs(parseInt(t.css("margin-bottom"), 10))), t.appendTo("over" === e.type ? a.inner : "outside" === e.type ? a.wrap : a.skin))
		}
	}, n.fn.fancybox = function (e) {
		var t, r = n(this),
			i = this.selector || "",
			s = function (o) {
				var s, l = this,
					c = t;
				!(o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || n(l).is(".fancybox-wrap") || (o.preventDefault(), o = e.groupAttr || "data-fancybox-group", s = n(l).attr(o), s || (o = "rel", s = l[o]), s && "" !== s && "nofollow" !== s && (l = i.length ? n(i) : r, l = l.filter("[" + o + '="' + s + '"]'), c = l.index(this)), e.index = c, !a.open(l, e)))
			},
			e = e || {};
		return t = e.index || 0, i ? o.undelegate(i, "click.fb-start").delegate(i, "click.fb-start", s) : r.unbind("click.fb-start").bind("click.fb-start", s), this
	}, n(t).ready(function () {
		a.defaults.fixed = n.support.fixedPosition || !(n.browser.msie && 6 >= n.browser.version) && !l
	})
}(window, document, jQuery), function (e, t, n) {
	function r(e) {
		return e
	}
	function i(e) {
		return decodeURIComponent(e.replace(o, " "))
	}
	var o = /\+/g,
		a = e.cookie = function (o, s, l) {
			if (s !== n) {
				if (l = e.extend({}, a.defaults, l), null === s && (l.expires = -1), "number" == typeof l.expires) {
					var c = l.expires,
						u = l.expires = new Date;
					u.setDate(u.getDate() + c)
				}
				return s = a.json ? JSON.stringify(s) : s + "", t.cookie = [encodeURIComponent(o), "=", a.raw ? s : encodeURIComponent(s), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
			}
			for (var d = a.raw ? r : i, f = t.cookie.split("; "), p = 0, h = f.length; h > p; p++) {
				var m = f[p].split("=");
				if (d(m.shift()) === o) {
					var g = d(m.join("="));
					return a.json ? JSON.parse(g) : g
				}
			}
			return null
		};
	a.defaults = {}, e.removeCookie = function (t, n) {
		return null !== e.cookie(t) ? (e.cookie(t, null, n), !0) : !1
	}
}(jQuery, document), function (e, t, n, r) {
	e.fn.sonar = function (t, n) {
		return "boolean" == typeof t && (n = t, t = r), e.sonar(this[0], t, n)
	};
	var i, o = n.body,
		a = e(t),
		s = function (e, i, a) {
			if (e) {
				o || (o = n.body);
				var s = e,
					l = 0,
					c = o.offsetHeight,
					u = t.innerHeight || n.documentElement.clientHeight || o.clientHeight || 0,
					d = n.documentElement.scrollTop || t.pageYOffset || o.scrollTop || 0,
					f = e.offsetHeight || 0;
				if (!e.sonarElemTop || e.sonarBodyHeight !== c) {
					if (s.offsetParent) do l += s.offsetTop;
					while (s = s.offsetParent);
					e.sonarElemTop = l, e.sonarBodyHeight = c
				}
				return i = i === r ? 0 : i, !(d - i > e.sonarElemTop + (a ? 0 : f) || e.sonarElemTop + (a ? f : 0) > d + u + i)
			}
		},
		l = {},
		c = 0,
		u = function () {
			i && clearTimeout(i), i = setTimeout(function () {
				var t, n, r, i, o, a, c;
				for (r in l) for (n = l[r], a = 0, c = n.length; c > a; a++) i = n[a], t = i.elem, o = s(t, i.px, i.full), ("scrollout" === r ? !o : o) ? i.tr || (t["_" + r] ? (e(t).trigger(r), i.tr = 1) : (n.splice(a, 1), a--, c--)) : i.tr = 0
			}, 0)
		},
		d = function (t, n) {
			var r = n.px,
				i = n.full,
				o = n.evt,
				d = s(t, r, i),
				f = 0;
			t["_" + o] = 1, ("scrollout" === o ? !d : d) && (setTimeout(function () {
				e(t).trigger("scrollout" === o ? "scrollout" : "scrollin")
			}, 0), f = 1), l[o].push({
				elem: t,
				px: r,
				full: i,
				tr: f
			}), c || (a.bind("scroll", u), c = 1)
		};
	e.sonar = s, l.scrollin = [], e.event.special.scrollin = {
		add: function (e) {
			e = e.data || {}, this.scrollin || d(this, {
				px: e.distance,
				full: e.full,
				evt: "scrollin"
			})
		},
		remove: function () {
			this._scrollin = 0
		}
	}, l.scrollout = [], e.event.special.scrollout = {
		add: function (e) {
			e = e.data || {}, this.scrollout || d(this, {
				px: e.distance,
				full: e.full,
				evt: "scrollout"
			})
		},
		remove: function () {
			this._scrollout = 0
		}
	}
}(jQuery, window, document), function () {
	var e = [].indexOf ||
	function (e) {
		for (var t = 0, n = this.length; n > t; t++) if (t in this && this[t] === e) return t;
		return -1
	},
		t = [].slice;
	(function (e, t) {
		return "function" == typeof define && define.amd ? define("waypoints", ["jquery"], function (n) {
			return t(n, e)
		}) : t(e.jQuery, e)
	})(this, function (n, r) {
		var i, o, a, s, l, c, u, d, f, p, h, m, g, v, y, b;
		return i = n(r), d = e.call(r, "ontouchstart") >= 0, s = {
			horizontal: {},
			vertical: {}
		}, l = 1, u = {}, c = "waypoints-context-id", h = "resize.waypoints", m = "scroll.waypoints", g = 1, v = "waypoints-waypoint-ids", y = "waypoint", b = "waypoints", o = function () {
			function e(e) {
				var t = this;
				this.$element = e, this.element = e[0], this.didResize = !1, this.didScroll = !1, this.id = "context" + l++, this.oldScroll = {
					x: e.scrollLeft(),
					y: e.scrollTop()
				}, this.waypoints = {
					horizontal: {},
					vertical: {}
				}, e.data(c, this.id), u[this.id] = this, e.bind(m, function () {
					var e;
					return t.didScroll || d ? void 0 : (t.didScroll = !0, e = function () {
						return t.doScroll(), t.didScroll = !1
					}, r.setTimeout(e, n[b].settings.scrollThrottle))
				}), e.bind(h, function () {
					var e;
					return t.didResize ? void 0 : (t.didResize = !0, e = function () {
						return n[b]("refresh"), t.didResize = !1
					}, r.setTimeout(e, n[b].settings.resizeThrottle))
				})
			}
			return e.prototype.doScroll = function () {
				var e, t = this;
				return e = {
					horizontal: {
						newScroll: this.$element.scrollLeft(),
						oldScroll: this.oldScroll.x,
						forward: "right",
						backward: "left"
					},
					vertical: {
						newScroll: this.$element.scrollTop(),
						oldScroll: this.oldScroll.y,
						forward: "down",
						backward: "up"
					}
				}, !d || e.vertical.oldScroll && e.vertical.newScroll || n[b]("refresh"), n.each(e, function (e, r) {
					var i, o, a;
					return a = [], o = r.newScroll > r.oldScroll, i = o ? r.forward : r.backward, n.each(t.waypoints[e], function (e, t) {
						var n, i;
						return r.oldScroll < (n = t.offset) && r.newScroll >= n ? a.push(t) : r.newScroll < (i = t.offset) && r.oldScroll >= i ? a.push(t) : void 0
					}), a.sort(function (e, t) {
						return e.offset - t.offset
					}), o || a.reverse(), n.each(a, function (e, t) {
						return t.options.continuous || e === a.length - 1 ? t.trigger([i]) : void 0
					})
				}), this.oldScroll = {
					x: e.horizontal.newScroll,
					y: e.vertical.newScroll
				}
			}, e.prototype.refresh = function () {
				var e, t, r, i = this;
				return r = n.isWindow(this.element), t = this.$element.offset(), this.doScroll(), e = {
					horizontal: {
						contextOffset: r ? 0 : t.left,
						contextScroll: r ? 0 : this.oldScroll.x,
						contextDimension: this.$element.width(),
						oldScroll: this.oldScroll.x,
						forward: "right",
						backward: "left",
						offsetProp: "left"
					},
					vertical: {
						contextOffset: r ? 0 : t.top,
						contextScroll: r ? 0 : this.oldScroll.y,
						contextDimension: r ? n[b]("viewportHeight") : this.$element.height(),
						oldScroll: this.oldScroll.y,
						forward: "down",
						backward: "up",
						offsetProp: "top"
					}
				}, n.each(e, function (e, t) {
					return n.each(i.waypoints[e], function (e, r) {
						var i, o, a, s, l;
						return i = r.options.offset, a = r.offset, o = n.isWindow(r.element) ? 0 : r.$element.offset()[t.offsetProp], n.isFunction(i) ? i = i.apply(r.element) : "string" == typeof i && (i = parseFloat(i), r.options.offset.indexOf("%") > -1 && (i = Math.ceil(t.contextDimension * i / 100))), r.offset = o - t.contextOffset + t.contextScroll - i, r.options.onlyOnScroll && null != a || !r.enabled ? void 0 : null !== a && (s = t.oldScroll) > a && r.offset >= s ? r.trigger([t.backward]) : null !== a && a > (l = t.oldScroll) && l >= r.offset ? r.trigger([t.forward]) : null === a && t.oldScroll >= r.offset ? r.trigger([t.forward]) : void 0
					})
				})
			}, e.prototype.checkEmpty = function () {
				return n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical) ? (this.$element.unbind([h, m].join(" ")), delete u[this.id]) : void 0
			}, e
		}(), a = function () {
			function e(e, t, r) {
				var i, o;
				r = n.extend({}, n.fn[y].defaults, r), "bottom-in-view" === r.offset && (r.offset = function () {
					var e;
					return e = n[b]("viewportHeight"), n.isWindow(t.element) || (e = t.$element.height()), e - n(this).outerHeight()
				}), this.$element = e, this.element = e[0], this.axis = r.horizontal ? "horizontal" : "vertical", this.callback = r.handler, this.context = t, this.enabled = r.enabled, this.id = "waypoints" + g++, this.offset = null, this.options = r, t.waypoints[this.axis][this.id] = this, s[this.axis][this.id] = this, i = null != (o = e.data(v)) ? o : [], i.push(this.id), e.data(v, i)
			}
			return e.prototype.trigger = function (e) {
				return this.enabled ? (null != this.callback && this.callback.apply(this.element, e), this.options.triggerOnce ? this.destroy() : void 0) : void 0
			}, e.prototype.disable = function () {
				return this.enabled = !1
			}, e.prototype.enable = function () {
				return this.context.refresh(), this.enabled = !0
			}, e.prototype.destroy = function () {
				return delete s[this.axis][this.id], delete this.context.waypoints[this.axis][this.id], this.context.checkEmpty()
			}, e.getWaypointsByElement = function (e) {
				var t, r;
				return (r = n(e).data(v)) ? (t = n.extend({}, s.horizontal, s.vertical), n.map(r, function (e) {
					return t[e]
				})) : []
			}, e
		}(), p = {
			init: function (e, t) {
				var r;
				return null == t && (t = {}), null == (r = t.handler) && (t.handler = e), this.each(function () {
					var e, r, i, s;
					return e = n(this), i = null != (s = t.context) ? s : n.fn[y].defaults.context, n.isWindow(i) || (i = e.closest(i)), i = n(i), r = u[i.data(c)], r || (r = new o(i)), new a(e, r, t)
				}), n[b]("refresh"), this
			},
			disable: function () {
				return p._invoke(this, "disable")
			},
			enable: function () {
				return p._invoke(this, "enable")
			},
			destroy: function () {
				return p._invoke(this, "destroy")
			},
			prev: function (e, t) {
				return p._traverse.call(this, e, t, function (e, t, n) {
					return t > 0 ? e.push(n[t - 1]) : void 0
				})
			},
			next: function (e, t) {
				return p._traverse.call(this, e, t, function (e, t, n) {
					return n.length - 1 > t ? e.push(n[t + 1]) : void 0
				})
			},
			_traverse: function (e, t, i) {
				var o, a;
				return null == e && (e = "vertical"), null == t && (t = r), a = f.aggregate(t), o = [], this.each(function () {
					var t;
					return t = n.inArray(this, a[e]), i(o, t, a[e])
				}), this.pushStack(o)
			},
			_invoke: function (e, t) {
				return e.each(function () {
					var e;
					return e = a.getWaypointsByElement(this), n.each(e, function (e, n) {
						return n[t](), !0
					})
				}), this
			}
		}, n.fn[y] = function () {
			var e, r;
			return r = arguments[0], e = arguments.length >= 2 ? t.call(arguments, 1) : [], p[r] ? p[r].apply(this, e) : n.isFunction(r) ? p.init.apply(this, arguments) : n.isPlainObject(r) ? p.init.apply(this, [null, r]) : r ? n.error("The " + r + " method does not exist in jQuery Waypoints.") : n.error("jQuery Waypoints needs a callback function or handler option.")
		}, n.fn[y].defaults = {
			context: r,
			continuous: !0,
			enabled: !0,
			horizontal: !1,
			offset: 0,
			triggerOnce: !1
		}, f = {
			refresh: function () {
				return n.each(u, function (e, t) {
					return t.refresh()
				})
			},
			viewportHeight: function () {
				var e;
				return null != (e = r.innerHeight) ? e : i.height()
			},
			aggregate: function (e) {
				var t, r, i;
				return t = s, e && (t = null != (i = u[n(e).data(c)]) ? i.waypoints : void 0), t ? (r = {
					horizontal: [],
					vertical: []
				}, n.each(r, function (e, i) {
					return n.each(t[e], function (e, t) {
						return i.push(t)
					}), i.sort(function (e, t) {
						return e.offset - t.offset
					}), r[e] = n.map(i, function (e) {
						return e.element
					}), r[e] = n.unique(r[e])
				}), r) : []
			},
			above: function (e) {
				return null == e && (e = r), f._filter(e, "vertical", function (e, t) {
					return t.offset <= e.oldScroll.y
				})
			},
			below: function (e) {
				return null == e && (e = r), f._filter(e, "vertical", function (e, t) {
					return t.offset > e.oldScroll.y
				})
			},
			left: function (e) {
				return null == e && (e = r), f._filter(e, "horizontal", function (e, t) {
					return t.offset <= e.oldScroll.x
				})
			},
			right: function (e) {
				return null == e && (e = r), f._filter(e, "horizontal", function (e, t) {
					return t.offset > e.oldScroll.x
				})
			},
			enable: function () {
				return f._invoke("enable")
			},
			disable: function () {
				return f._invoke("disable")
			},
			destroy: function () {
				return f._invoke("destroy")
			},
			extendFn: function (e, t) {
				return p[e] = t
			},
			_invoke: function (e) {
				var t;
				return t = n.extend({}, s.vertical, s.horizontal), n.each(t, function (t, n) {
					return n[e](), !0
				})
			},
			_filter: function (e, t, r) {
				var i, o;
				return (i = u[n(e).data(c)]) ? (o = [], n.each(i.waypoints[t], function (e, t) {
					return r(i, t) ? o.push(t) : void 0
				}), o.sort(function (e, t) {
					return e.offset - t.offset
				}), n.map(o, function (e) {
					return e.element
				})) : []
			}
		}, n[b] = function () {
			var e, n;
			return n = arguments[0], e = arguments.length >= 2 ? t.call(arguments, 1) : [], f[n] ? f[n].apply(null, e) : f.aggregate.call(null, n)
		}, n[b].settings = {
			resizeThrottle: 100,
			scrollThrottle: 30
		}, i.load(function () {
			return n[b]("refresh")
		})
	})
}.call(this), function () {
	(function (e, t) {
		return "function" == typeof define && define.amd ? define(["jquery", "waypoints"], t) : t(e.jQuery)
	})(this, function (e) {
		var t, n;
		return t = {
			wrapper: '<div class="sticky-wrapper" />',
			stuckClass: "stuck"
		}, n = function (t, n) {
			return t.wrap(n.wrapper), t.each(function () {
				var t;
				return t = e(this), t.parent().height(t.outerHeight()), !0
			}), t.parent()
		}, e.waypoints("extendFn", "sticky", function (r) {
			var i, o;
			return r = e.extend({}, e.fn.waypoint.defaults, t, r), i = n(this, r), o = r.handler, r.handler = function (t) {
				var n, i;
				return n = e(this).children(":first"), i = "down" === t || "right" === t, n.toggleClass(r.stuckClass, i), null != o ? o.call(this, t) : void 0
			}, i.waypoint(r), this
		})
	})
}.call(this);
var bt = {};
bt.initted = !1, String.prototype.score = function (e, t) {
	if (t = t || 0, 0 === e.length) return.9;
	if (e.length > this.length) return 0;
	for (var n = e.length; n > 0; n--) {
		var r = e.substring(0, n),
			i = this.indexOf(r);
		if (!(0 > i || i + e.length > this.length + t)) {
			var o = this.substring(i + r.length),
				a = null;
			a = n >= e.length ? "" : e.substring(n);
			var s = o.score(a, t + i);
			if (s > 0) {
				var l = this.length - o.length;
				if (0 !== i) {
					var c = 0,
						u = this.charCodeAt(i - 1);
					if (32 === u || 9 === u) for (c = i - 2; c >= 0; c--) u = this.charCodeAt(c), l -= 32 === u || 9 === u ? 1 : .15;
					else l -= i
				}
				return l += s * o.length, l /= this.length
			}
		}
	}
	return 0
}, function (e) {
	bt = {
		Validation: {
			setup: function () {
				function t() {
					var t = e("input[name=name]", "#contactform");
					t.val(o(t.val()));
					var n = t.val();
					if (a(n)) return t.addClass("error"), !1;
					var r = /^([a-z0-9_\'\-]+ *)*[a-z0-9]+$/i;
					return r.test(n) ? (t.removeClass("error"), !0) : (t.addClass("error"), !1)
				}
				function n() {
					var t = e("input[name=email]", "#contactform");
					t.val(o(t.val()));
					var n = o(t.val()),
						r = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
					return a(n) ? (t.addClass("error"), !1) : n.match(r) ? (t.removeClass("error"), !0) : (t.addClass("error"), !1)
				}
				function r() {
					var t = e("textarea[name=message]", "#contactform");
					t.val(o(t.val()));
					var n = o(t.val());
					return a(n) ? (t.addClass("error"), !1) : (t.removeClass("error"), !0)
				}
				function i() {
					var e = !0;
					return t() || (e = !1), n() || (e = !1), r() || (e = !1), e
				}
				function o(e) {
					return e.replace(/^\s+|\s+$/g, "")
				}
				function a(e) {
					return 0 === e.length ? !0 : !1
				}
				e("input[name=name]", "#contactform").blur(function () {
					t()
				}), e("input[name=email]", "#contactform").blur(function () {
					n()
				}), e("textarea[name=message]", "#contactform").blur(function () {
					r()
				}), e("#submit", "#contactform").click(function (t) {
					if (t.preventDefault(), !i()) return !1;
					var n = e("#confirmation");
					n.text("Your message is being sent ..."), n.addClass("confirmation_visible");
					var r = e("#contactform").serialize();
					return e.ajax({
						url: "/scripts/contact.php",
						type: "POST",
						data: r,
						dataType: "json",
						success: function (t) {
							t.error === !0 || "ERROR" === t.res ? (e("body,html").animate({
								scrollTop: 0
							}, 100), n.text("Your message could not be sent. Please try again in a few minutes."), n.addClass("confirmation_visible error"), setTimeout(function () {
								n.removeClass("confirmation_visible error")
							}, 3e3)) : "OK" === t.res && (e("body,html").animate({
								scrollTop: 0
							}, 100), n.addClass("confirmation_visible success"), n.text("Your message has been sent."), e("input[name=name],input[name=email],textarea[name=message]", "#contactform").val(""), setTimeout(function () {
								n.fadeOut(2e3, function () {
									n.removeClass("confirmation_visible success")
								})
							}, 3e3))
						},
						error: function () {
							n.text("Your message could not be sent. Please try again later."), n.addClass("confirmation_visible error"), setTimeout(function () {
								n.removeClass("confirmation_visible error")
							}, 3e3)
						}
					}), !1
				})
			}
		},
		checkWinWidth: function () {
			e("#main").waitForImages(function () {
				var t = e(window).width();
				500 >= t ? e("body").hasClass("mobile") || ($images = e("article img", "#main").filter(function () {
					return !e(this).parent("a").length
				}), $images.each(function () {
					$images.fadeOut();
					var t = e(this),
						n = 50 > t.height() || 120 > t.width() ? "contain" : "cover";
					t.replaceWith(e('<a class="blowup" style="display:none;" href="' + t.attr("src") + '"><div style="background-image:url(' + t.attr("src") + "); background-size: " + n + '; background-position:50% 50%;background-repeat:no-repeat;height:150px;width:100%;" /></div></a>').fancybox().data("orig", t))
				}), e("a.blowup", "#main").fadeIn(), e("div.gist").each(function () {
					var t = e(this),
						n = t.find("div.gist-data");
					n.hide()
				}), e("body").addClass("mobile")) : e("body").hasClass("mobile") ? (e("a.blowup", "#main").fadeOut(), e("a.blowup").each(function () {
					var t = e(this);
					t.replaceWith(t.data("orig"))
				}), e("article img", "#main").fadeIn(), e("div.gist").find("div.gist-data").show(), e("body").removeClass("mobile")) : e("img", "#main").show()
			})
		},
		Footnotes: {
			footnotetimeout: !1,
			setup: function () {
				var t = e("a[rel='footnote']");
				t.unbind("mouseover", bt.Footnotes.footnoteover), t.unbind("mouseout", bt.Footnotes.footnoteoout), t.bind("mouseover", bt.Footnotes.footnoteover), t.bind("mouseout", bt.Footnotes.footnoteoout)
			},
			footnoteover: function (t) {
				t.preventDefault(), clearTimeout(bt.Footnotes.footnotetimeout), e("#footnotediv").stop().remove();
				var n = e(this).attr("href").substr(1),
					r = e(this).offset(),
					i = e(document.createElement("div")).attr("id", "footnotediv").bind("mouseover", bt.Footnotes.divover).bind("mouseout click", bt.Footnotes.footnoteoout);
				i.html(e(document.getElementById(n)).html()), e("body").append(i);
				var o = r.left;
				e(window).width() > 320 ? o + i.width() + 30 > e(window).width() + e(window).scrollLeft() && (o = e(window).width() - (i.width() + 30) + e(window).scrollLeft()) : o = "10px";
				var a = r.top + 20;
				a + i.height() + 30 > e(window).height() + e(window).scrollTop() && (a = r.top - i.height() - 15), i.css({
					left: o,
					top: a
				})
			},
			footnoteoout: function () {
				bt.Footnotes.footnotetimeout = setTimeout(function () {
					e("#footnotediv").animate({
						opacity: 0
					}, 200, function () {
						e("#footnotediv").remove()
					})
				}, 100)
			},
			divover: function () {
				clearTimeout(bt.Footnotes.footnotetimeout), e("#footnotediv").stop().css({
					opacity: .9
				})
			}
		},
		Scroll: {
			setup: function () {
				e('a[rel="footnote"]').each(function () {
					var t = e(this).attr("href").substr(1),
						n = e(document.getElementById(t));
					e(this).click(function (t) {
						return t.preventDefault(), e(".fnhighlight", "#main").removeClass("fnhighlight"), n.addClass("fnhighlight"), !1
					})
				}), e('a[rel="reference"]').click(function (t) {
					return t.preventDefault(), e(".fnhighlight", "#main").removeClass("fnhighlight"), !1
				}), e('a[href^="#"]', "#main article").click(function (t) {
					var n = e(this).attr("href").substr(1),
						r = e(document.getElementById(n));
					return r.length ? (t.preventDefault(), e("html,body").animate({
						scrollTop: r.offset().top - 30
					}, 500), !1) : !0
				})
			}
		},
		InfiniteScroll: {
			setup: function () {
				var t = 2;
				e("#pagination").bind("scrollin", function () {
					e("#pagination").before(e("<div class=lazyloaded id=page" + t + ">").load("/page/" + t + " #main .content", function () {
						setTimeout(function () {
							bt.Sticky.setup("#page" + ("" + (t - 1))), e.waypoints("refresh")
						}, 1e3)
					})), t++
				})
			}
		},
		Callouts: {
			setup: function () {
				e("#callouts .links").find("div").click(function (t) {
					t.preventDefault();
					var n = e(e(this).find("a:first").attr("href"));
					return e("#callouts .details div").not(n).slideUp("fast"), n.slideToggle("fast"), !1
				}), e("#callouts .details").find("div").click(function (t) {
					return t.preventDefault(), window.open(e(t.target).closest("div").find("a:first").attr("href")), !1
				})
			}
		},
		Topics: {
			setup: function () {
				var t = e("section", "#main");
				e("#toptags").addClass("visible"), e("#topicnav a").click(function () {
					e("#topicnav a").removeClass("selected"), e(this).addClass("selected");
					var n = e(e(this).attr("href"));
					n.hasClass("visible") || (t.removeClass("visible"), n.addClass("visible"))
				});
				var n = e(".series_index", "#main"),
					r = n.find("h4"),
					i = n.find("ul");
				r.click(function () {
					var t = e(this).next("ul");
					return t.is(":visible") ? e(this).next("ul").slideUp("fast") : (i.slideUp("fast"), e(this).next("ul").slideDown("fast")), !1
				})
			},
			postSetup: function () {
				var t = e("section.series", "#main").find('li:has("span.current")').index(),
					n = e("section.series li", "#main");
				if (n.each(function () {
					e(this).css("width", e(this).width())
				}), n.length > 6) {
					var r = t > 2 ? t - 2 : 0;
					n.splice(r, 6), n.hide(), e("section.series p:first", "#main").append("<span>click <strong>here</strong> to see all</span>").click(function () {
						n.slideToggle("fast")
					})
				}
			}
		},
		Archives: {
			setup: function () {
				function t(t) {
					t = t.replace(/(and?|or|but|if|the|he|she|his|their|this|is)\s/g, "");
					var n = e.map(t.split(/ /), function (e) {
						return e.substring(0, 4)
					}).join(" ");
					return n.substring(0, 20)
				}
				function n(n) {
					n.length > 15 && (n = t(n));
					var o = [],
						a = "",
						s = e.trim(n.toLowerCase().replace(/[^a-z0-9]/gi, ""));
					if (s && "" !== s) {
						e(r.posts).each(function () {
							var e = this,
								t = "";
							e.tags && (t += e.tags.join(" ")), e.keywords && (t += e.keywords.join(" ")), keywords = (e.title + " " + t).toLowerCase().replace(/[^a-z0-9]/gi, "");
							var n = keywords.score(s);
							n > .6 && o.push([n, e])
						}), o = o.sort(function (e, t) {
							return e[0] - t[0]
						}).reverse(), e(o).each(function () {
							var e = this[1];
							a += '<li><a href="' + e.url + '"><h4>' + e.title + " <small>(" + e.date + ")</small></h4></a><p>" + e.summary + "</p></li>"
						});
						var l = e("#searchresults").html(e("<ul></ul>").append(a));
						l.is(":visible") || l.fadeIn("fast"), e("#typeahead").css({
							background: "#fff"
						}), i = !1
					}
				}
				var r, i = !1;
				e.get("/search.json", function (e) {
					r = e
				}, "json");
				var o = function () {
					var e = 0;
					return function (t, n) {
						clearTimeout(e), e = setTimeout(t, n)
					}
				}();
				e.fn.liveUpdate = function () {
					return e("#typeahead").on("keypress keyup", function () {
						i || (e(this).css({
							background: "#fff url(/images/ajax-loader.gif) no-repeat 98% 50%"
						}), i = !0), o(function () {
							n(e("#typeahead").val())
						}, 200), /^\s*$/.test(e("#typeahead").val()) ? e("#searchresults").fadeOut("fast", function () {
							e("#postarchive").fadeIn("fast"), e("#typeahead").css({
								background: "#fff"
							})
						}) : e("#postarchive").is(":visible") && e("#postarchive").fadeOut("fast", function () {
							e("#searchresults").show()
						})
					}).on("keydown", function (t) {
						if (8 === t.keyCode) / ^ \s * $ / .test(e("#typeahead").val()) ? e("#searchresults").fadeOut("fast", function () {
							e("#postarchive").fadeIn("fast"), e("#typeahead").css({
								background: "#fff"
							}), i = !1
						}) : e("#typeahead").keyup();
						else if (27 === t.keyCode) return t.preventDefault(), e("#typeahead").val(""), e("#searchresults").fadeOut("fast", function () {
							e("#postarchive").fadeIn("fast"), e("#typeahead").css({
								background: "#fff"
							}), i = !1
						}), !1
					}), this
				}, e.fn.reverse = [].reverse, 0 === e("#searchresults").length && e('<div id="searchresults"></div>').hide().appendTo("#blog-archives"), e("#blog-archives").liveUpdate(), e("#typeahead").focus()
			}
		},
		Error: {
			setup: function () {
				function t(t) {
					t = t.replace(/(and?|or|but|if|the|he|she|his|their|this|is)\s/g, "");
					var n = e.map(t.split(/ /), function (e) {
						return e.substring(0, 5)
					}).join("");
					return n.substring(0, 20)
				}
				function n(n) {
					n.length > 20 && (n = t(n)), e.getJSON("/search.json", function (t) {
						var r = [],
							i = "",
							o = e.trim(n.toLowerCase().replace(/[^a-z0-9]/gi, ""));
						if (o && "" !== o) if (e(t.posts).each(function () {
							var e, t = this,
								n = "";
							t.tags && (n += t.tags.join(" ")), t.url && (e = t.url.replace(/\/$/, "").replace(/.*\/([^\/]+)$/, "$1").replace(/[^a-z0-9]/gi, "")), keywords = (e + t.title + n).toLowerCase().replace(/[^a-z0-9]/gi, "");
							var i = keywords.score(o);
							i > .6 && r.push([i, t])
						}), 0 === r.length) e("#searchresults").append("<p>Sorry, no matching results were found.");
						else {
							r = r.sort(function (e, t) {
								return e[0] - t[0]
							}).reverse().slice(0, 15), e(r).each(function () {
								var e = this[1];
								i += '<li><a href="' + e.url + '">' + e.title + "</a></li>"
							});
							var a = e("<ul>").append(i);
							e("#searchresults").append(a)
						}
					})
				}
				e.fn.reverse = [].reverse;
				var r = document.location.pathname.replace(/\/$/, "").replace(/.*\/([^\/]+)$/, "$1").replace(/[\-%]/g, " ").replace(/\s+/, " ");
				n(r)
			}
		},
		Utils: {
			isTouchDevice: function () {
				return !!("ontouchstart" in window) || !! ("onmsgesturechange" in window)
			},
			addCodeLineNumbers: function () {
				"Microsoft Internet Explorer" !== navigator.appName && e("div.gist-highlight").each(function (t) {
					for (var n = '<table><tbody><tr><td class="gutter">', r = '<pre class="line-numbers">', i = '</pre></td><td class="code">', o = "</td></tr></tbody></table>", a = e(".line", t).length, s = 1; a >= s; s++) r += '<span class="line-number">' + s + "</span>\n";
					var l = n + r + i + "<pre>" + e("pre", t).html() + "</pre>" + o;
					e(t).html(l)
				})
			},
			flashVideoFallback: function () {
				var t = "/assets/jwplayer/player.swf",
					n = "/assets/jwplayer/glow/glow.xml";
				e("video").each(function (r) {
					r = e(r), (!Modernizr.video.h264 && swfobject.getFlashPlayerVersion() || -1 !== window.location.hash.indexOf("flash-test")) && (r.children("source[src$=mp4]").first().map(function (i) {
						var o = e(i).attr("src"),
							a = "video_" + Math.round(1 + 1e5 * Math.random()),
							s = r.attr("width"),
							l = parseInt(r.attr("height"), 10) + 30;
						r.after('<div class="flash-video"><div><div id=' + a + ">"), swfobject.embedSWF(t, a, s, l + 30, "9.0.0", {
							file: o,
							image: r.attr("poster"),
							skin: n
						}, {
							movie: o,
							wmode: "opaque",
							allowfullscreen: "true"
						})
					}), r.remove())
				})
			},
			wrapFlashVideos: function () {
				e("object").each(function (t) {
					if (t = e(t), e("param[name=movie]", t).length) {
						var n = t.before('<div class="flash-video"><div>').previous();
						e(n).children().append(t)
					}
				}), e("iframe[src*=vimeo],iframe[src*=youtube]").each(function (t) {
					t = e(t);
					var n = t.before('<div class="flash-video"><div>').previous();
					e(n).children().append(t)
				})
			},
			widont: function () {
				e("h1,h2,h3,h4", "#main").each(function () {
					e(this).html(e(this).text().trim().replace(/^(.+)\s(\S+)$/, "$1&nbsp;$2"))
				})
			},
			trackDownloads: function () {
				var t = /\.(zip|dmg|pdf|t?gz|textexpander|mp3|ogg|ogv|webm)$/i;
				e("a").each(function () {
					var n = e(this),
						r = n.attr("href");
					r && (r.match(t) || r.match(/(zipball|tarball)/)) ? n.click(function () {
						return _gaq.push(["_trackEvent", "Download", "Click", r]), void 0 !== n.attr("target") && "_blank" !== n.attr("target").toLowerCase() ? (setTimeout(function () {
							location.href = baseHref + r
						}, 200), !1) : void 0
					}) : r && r.match(/^https?\:/i) && !r.match(document.domain) && n.click(function () {
						var e = r.replace(/^https?\:\/\//i, "");
						return _gaq.push(["_trackEvent", "External", "Click", e]), void 0 !== n.attr("target") && "_blank" !== n.attr("target").toLowerCase() ? (setTimeout(function () {
							location.href = r
						}, 200), !1) : void 0
					})
				})
			},
			setup: function () {
				this.addCodeLineNumbers(), this.flashVideoFallback(), this.widont(), this.trackDownloads()
			}
		},
		Popular: {
			fetched: !1,
			strings: {
				headline: "Recently popular posts&hellip;",
				clickhere: "(click to load)",
				loading: "(loading&hellip;)"
			},
			setup: function () {
				e('<aside id="popular"><header><h1>' + bt.Popular.strings.headline + "</h1></header></aside>").insertAfter("#welcome"), bt.Popular.fetch()
			},
			fetch: function () {
				if (bt.Popular.fetched) return !1;
				var t = e("#popular"),
					n = e("header", t),
					r = 6;
				n.addClass("loading").find("h1").html(bt.Popular.strings.headline + " <span>" + bt.Popular.strings.loading + "</span>"), e.getJSON("/scripts/cacher.rb?k=twitterpopular&a=read&max=60&v=" + Math.floor(400 + 2e3 * Math.random()), function (i) {
					if (i && 0 === i.outdated) {
						var o = e("<ul>").append(i.content).css("display", "none");
						t.append(o), o.slideDown(400), n.removeClass("loading").addClass("loaded"), n.find("h1").html(bt.Popular.strings.headline), bt.Popular.fetched = !0
					} else e.get("/search.json", function (i) {
						var o = i.posts.slice(0, 40),
							a = o.length,
							s = [];
						e(o).each(function (i, o) {
							var l = "http://" + location.hostname + o.url,
								c = o.title;
							e.ajax({
								url: "http://urls.api.twitter.com/1/urls/count.json",
								data: {
									url: l
								},
								dataType: "jsonp",
								success: function (i) {
									if (s.push({
										url: l,
										title: c,
										count: i.count
									}), a--, !a) {
										var o = e("<ul></ul>").css("display", "none"),
											u = s.sort(function (e, t) {
												return t.count - e.count
											}).slice(0, r);
										e(u).each(function (t, n) {
											e("<li>").append(e("<a>").attr("href", n.url).text(n.title).attr("data-count", n.count)).appendTo(o)
										}), e.getJSON("/scripts/cacher.rb?a=write&k=twitterpopular&content=" + encodeURIComponent(o.html())), t.append(o), o.slideDown(400), n.removeClass("loading").addClass("loaded"), n.find("h1").html(bt.Popular.strings.headline), bt.Popular.fetched = !0
									}
								},
								error: function (e) {
									console.log(e)
								}
							})
						})
					}, "json")
				})
			},
			counts: function () {
				e("#popular").find("a").each(function (t, n) {
					var r = e(n);
					r.text(r.text() + " (" + r.attr("data-count") + ")"), console.log(this)
				})
			}
		},
		Toolbar: {
			toggle: function (t) {
				void 0 === t && (t = !1);
				var n = e("#tooltoggle");
				n.is(":visible") && !t || "open" === t ? (e("#toolbar a").not("#tooltoggle").css("display", "block"), n.hide()) : (e("#toolbar a").not("#tooltoggle").css("display", "none"), n.show())
			},
			setup: function () {
				e('<ul id="toolbar">').appendTo("body").load("/include/tools.html", function () {
					var t = e("#tooltoggle");
					bt.Utils.isTouchDevice() || e("#toolbar").on("mouseenter mouseleave", function (e) {
						var t = "mouseenter" === e.type ? "open" : "close";
						bt.Toolbar.toggle(t)
					}), e("#toolbar").on("click", function (t) {
						switch (t.preventDefault(), e(t.target).attr("id")) {
						case "superreadable":
							return e("body").hasClass("dyslexic") ? (e("body").removeClass("dyslexic"), e.cookie("superreadable", "0", {
								expires: 365,
								path: "/"
							})) : (e("body").addClass("dyslexic"), e.cookie("superreadable", "1", {
								expires: 365,
								path: "/"
							})), !1;
						case "nvalt":
							return e("body").hasClass("nvaltlinks") ? (e("body").removeClass("nvaltlinks"), e.cookie("nvaltlinks", "0", {
								expires: 365,
								path: "/"
							})) : (e("body").addClass("nvaltlinks"), e.cookie("nvaltlinks", "1", {
								expires: 365,
								path: "/"
							})), !1;
						case "invert":
							return e("body").hasClass("inverse") ? (e("body").removeClass("inverse"), e.cookie("inverse", "0", {
								expires: 365,
								path: "/"
							})) : (e("body").addClass("inverse"), e.cookie("inverse", "1", {
								expires: 365,
								path: "/"
							})), !1;
						case "tooltoggle":
							return bt.Toolbar.toggle("open"), !1
						}
						return !0
					}), e("#main").on("click", function () {
						t.is(":visible") || bt.Toolbar.toggle("close")
					})
				})
			}
		},
		Sticky: {
			setup: function (t) {
				Modernizr.mq("only screen and (min-width: 769px) and (min-height: 601px)") && !e("html").hasClass("m-touch") ? (void 0 === t && Modernizr.mq("only screen and (max-height: 960px)") && (e("#stick").waypoint("sticky"), e("#sponsor").waypoint("sticky", {
					offset: e("#stick").height() + 29
				})), t = void 0 === t ? "#main" : t, e(t + " article.listpost").waypoint(function (t) {
					var n = e(this);
					"down" === t ? n.addClass("stuck") : (n.removeClass("stuck"), $el = 0 === n.prev("article.listpost").length ? e(this).closest("div:not(.content)").prev("div").find("article.listpost:last") : n.prev("article.listpost"), $el.addClass("stuck"))
				}, {
					offset: -30
				}).waypoint(function (t) {
					var n = "down" === t ? e(this) : e(this).prev("article.listpost");
					0 === n.length && (n = e(this).closest("div:not(.content)").prev("div").find("article.listpost:last")), "down" === t ? n.find("header>a").animate({
						top: -1 * e(this).height() + "px"
					}, 500, "linear", function () {
						n.removeClass("stuck").find("header>a").css("top", 0)
					}) : n.removeClass("stuck").find("header>a").css("top", 0)
				}, {
					offset: function () {
						return -(e(this).height() + 30)
					}
				}), e.waypoints("refresh")) : e.waypoints("destroy")
			}
		},
		init: function () {
			"1" === e.cookie("superreadable") && e("body").addClass("dyslexic"), "1" === e.cookie("inverse") && e("body").addClass("inverse"), "1" === e.cookie("nvaltlinks") && e("body").addClass("nvaltlinks"), e("article img", "#main").hide(), bt.Sticky.setup(), bt.checkWinWidth(), bt.Utils.setup(), bt.Footnotes.setup(), bt.Scroll.setup(), bt.Callouts.setup(), e("#alltags").length > 0 && bt.Topics.setup(), e("section.series", "#main").length > 0 && bt.Topics.postSetup(), e("#typeahead").length > 0 && bt.Archives.setup(), /^404 - Page not found/.test(document.title) && bt.Error.setup(), "contact" === e("body").attr("id") && bt.Validation.setup(), "home" !== e("body").attr("id") || /page\/\d/.test(document.location.href) || (bt.Popular.setup(), bt.InfiniteScroll.setup()), bt.Toolbar.setup(), e('a[href$="jpg"],a[href$="png"]', "section").attr("rel", "gallery").fancybox(), e("#menu-mobile select").change(function () {
				window.location = e("#menu-mobile option:selected").data("link")
			}), e(".parent", "#sidebar").on("tap click", function (t) {
				return "A" !== t.target.tagName ? (t.preventDefault(), e(this).toggleClass("hover"), !1) : void 0
			}), e("a.nvaltlink").click(function (t) {
				return t.preventDefault(), e.getJSON("http://heckyesmarkdown.com/go/?u=" + encodeURIComponent(e(this).data("url")) + "&read=1&output=json&callback=?", function (e) {
					window.location = "nvalt://make/?title=" + encodeURIComponent(e.title) + "&txt=" + encodeURIComponent(e.content)
				}), !1
			}), bt.initted = !0, /^(brettterpstra|trpstra)\.(com|net)$/.test(document.location.hostname) || e('<header id="devbanner">').prependTo("body")
		}
	}, e(window).resize(function () {
		bt.checkWinWidth(), e.waypoints("destroy"), e(".sticky-wrapper").each(function (t, n) {
			e(n).replaceWith(e(n).contents())
		}), bt.Sticky.setup(), e("div.lazyloaded").each(function (t, n) {
			bt.Sticky.setup(e(n).attr("id"))
		})
	}), bt.init()
}(jQuery), function (e) {
	function t() {
		a.content = "width=device-width,minimum-scale=" + o[0] + ",maximum-scale=" + o[1], e.removeEventListener(r, t, !0)
	}
	var n = "addEventListener",
		r = "gesturestart",
		i = "querySelectorAll",
		o = [1, 1],
		a = i in e ? e[i]("meta[name=viewport]") : [];
	(a = a[a.length - 1]) && n in e && (t(), o = [.25, 1.6], e[n](r, t, !0))
}(document), function (e) {
	searchpath = function () {
		function t() {
			0 == e("#searchpath_pane").length && (e("<div>").attr("id", "searchpath_arrow").appendTo("body"), e("<div>").attr("id", "searchpath_pane").appendTo("body"), e("<div>").attr("id", "searchpath_backdrop").appendTo("body"), e(document).keyup(function (e) {
				return 27 == e.which ? (i(), a(), !1) : void 0
			}));
			var t, n, r = document.getElementById(c.searchBoxId),
				l = r.value,
				u = e(r),
				d = e("#searchpath_pane"),
				f = e("#searchpath_arrow"),
				p = e("#searchpath_backdrop");
			if (0 == l.length) return i(), a(), !1;
			var h, m = e(document).width() / 5,
				g = u.offset().left + u.width() / 2;
			g > 2 * m && 3 * m > g ? (t = 2 * m + m / 2 - d.width() / 2, 500 > u.offset().top ? (h = "up", n = u.offset().top + u.height() + 20) : (h = "down", n = u.offset().top - d.height() - 20)) : u.offset().left > 400 ? (t = u.offset().left - d.width() - 20, n = u.offset().top - d.height() / 2 + parseInt(u.css("padding-top")), h = "right") : (t = u.offset().left + u.width() + parseInt(u.css("padding-left")) + parseInt(u.css("padding-right")) + 20, n = u.offset().top - d.height() / 2 + parseInt(u.css("padding-top")), h = "left");
			var v = e(document).scrollTop();
			if (10 > n - v) n = v + 10;
			else {
				var y = v + e(window).height();
				n + d.height() > y && (n = y - d.height() - 10)
			}
			return d.css({
				top: n + "px",
				left: t + "px",
				"box-shadow": "1px 1px 2px gray"
			}), p.css({
				width: e(document).width() + "px",
				height: e(document).height() + "px"
			}), s(p, .7), s(d, 1), d.scrollTop() > 0 && d.animate({
				scrollTop: 0
			}), "up" == h ? (f.css("background-image", "url(http://js.searchpath.io/img/popover_arrow_up.png)"), f.css({
				width: "30px",
				height: "16px",
				top: n - 15 + "px",
				left: u.offset().left + u.width() / 2 - 10 + "px"
			})) : "down" == h ? (f.css("background-image", "url(http://js.searchpath.io/img/popover_arrow_down.png)"), f.css({
				width: "30px",
				height: "16px",
				top: n + d.height() + "px",
				left: u.offset().left + u.width() / 2 - 10 + "px"
			})) : "right" == h ? (f.css("background-image", "url(http://js.searchpath.io/img/popover_arrow_right.png)"), f.css({
				top: u.offset().top - 4 + "px",
				left: d.offset().left + d.width() + 1 + "px"
			})) : "left" == h && f.css({
				top: u.offset().top - 4 + "px",
				left: d.offset().left - f.width() + 1 + "px"
			}), e("#searchpath_pane").height(e(window).height() - 50).css({
				top: 0
			}), s(f, 1), p.unbind("click"), p.click(function () {
				return i(), a(), !1
			}), o(), e.get("http://js.searchpath.io/html?site=" + encodeURIComponent("brettterpstra.com") + "&q=" + encodeURIComponent(l), function (e) {
				d.html(e)
			}), !1
		}
		function n() {
			var t = document.getElementById(c.searchBoxId),
				n = t.value,
				r = e("body");
			return e.get("http://js.searchpath.io/html?site=" + encodeURIComponent("brettterpstra.com") + "&q=" + encodeURIComponent(n), function (e) {
				r.html(e), r.append('<input type="hidden" id="' + c.searchBoxId + '" value="' + encodeURIComponent(n) + '" />'), r.scrollTop() > 0 && r.animate({
					scrollTop: 0
				})
			}), !1
		}
		function r() {
			var t = document.getElementById(c.searchBoxId),
				n = t.value;
			e.get("http://js.searchpath.io/html?site=" + encodeURIComponent("brettterpstra.com") + "&q=" + encodeURIComponent(n) + "&from=10&size=50", function (t) {
				e("#searchpath_more").html(t)
			})
		}
		function i() {
			l(e("#searchpath_pane")), l(e("#searchpath_arrow")), l(e("#searchpath_backdrop")), setTimeout(function () {
				e("#searchpath_pane").hide(), e("#searchpath_arrow").hide(), e("#searchpath_backdrop").hide()
			}, c.animationSpeed)
		}
		function o() {
			null != navigator.userAgent.match(/WebKit/i) && e("body").css("overflow", "hidden")
		}
		function a() {
			null != navigator.userAgent.match(/WebKit/i) && e("body").css("overflow", "scroll")
		}
		function s(e, t) {
			e.show(), e.css("opacity", t)
		}
		function l(e) {
			e.css("opacity", 0)
		}
		var c = {
			animationSpeed: 1e3,
			searchBoxId: "searchpath_q"
		};
		return {
			attach: function (n) {
				e(n).submit(function (e) {
					return e.preventDefault(), t(), !1
				})
			},
			mobile: n,
			more: r,
			options: c
		}
	}()
}(jQuery);
var searchpath_mobileSearch = searchpath.mobile,
	searchpath_showMore = searchpath.more;
searchpath.options.animationSpeed = 400, searchpath.options.searchBoxId = "searchpath_q", searchpath.attach("#search-wrapper .form-search");