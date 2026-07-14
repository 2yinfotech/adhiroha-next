
 /**
 * Owl carousel
 * @version 2.3.4
 * @author Bartosz Wojciechowski
 * @author David Deutsch
 * @license The MIT License (MIT)
 * @todo Lazy Load Icon
 * @todo prevent animationend bubling
 * @todo itemsScaleUp
 * @todo Test Zepto
 * @todo stagePadding calculate wrong active classes
 */
!  function(t, e, i, n) {
	function r(e, i) {
		this.settings = null, this.options = t.extend({}, r.Defaults, i), this.$element = t(e), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
			time: null,
			target: null,
			pointer: null,
			stage: {
				start: null,
				current: null
			},
			direction: null
		}, this._states = {
			current: {},
			tags: {
				initializing: ["busy"],
				animating: ["busy"],
				dragging: ["interacting"]
			}
		}, t.each(["onResize", "onThrottledResize"], t.proxy((function(e, i) {
			this._handlers[i] = t.proxy(this[i], this)
		}), this)), t.each(r.Plugins, t.proxy((function(t, e) {
			this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
		}), this)), t.each(r.Workers, t.proxy((function(e, i) {
			this._pipe.push({
				filter: i.filter,
				run: t.proxy(i.run, this)
			})
		}), this)), this.setup(), this.initialize()
	}
	r.Defaults = {
		items: 3,
		loop: !1,
		center: !1,
		rewind: !1,
		checkVisibility: !0,
		mouseDrag: !0,
		touchDrag: !0,
		pullDrag: !0,
		freeDrag: !1,
		margin: 0,
		stagePadding: 0,
		merge: !1,
		mergeFit: !0,
		autoWidth: !1,
		startPosition: 0,
		rtl: !1,
		smartSpeed: 250,
		fluidSpeed: !1,
		dragEndSpeed: !1,
		responsive: {},
		responsiveRefreshRate: 200,
		responsiveBaseElement: e,
		fallbackEasing: "swing",
		slideTransition: "",
		info: !1,
		nestedItemSelector: !1,
		itemElement: "div",
		stageElement: "div",
		refreshClass: "owl-refresh",
		loadedClass: "owl-loaded",
		loadingClass: "owl-loading",
		rtlClass: "owl-rtl",
		responsiveClass: "owl-responsive",
		dragClass: "owl-drag",
		itemClass: "owl-item",
		stageClass: "owl-stage",
		stageOuterClass: "owl-stage-outer",
		grabClass: "owl-grab"
	}, r.Width = {
		Default: "default",
		Inner: "inner",
		Outer: "outer"
	}, r.Type = {
		Event: "event",
		State: "state"
	}, r.Plugins = {}, r.Workers = [{
		filter: ["width", "settings"],
		run: function() {
			this._width = this.$element.width()
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function(t) {
			t.current = this._items && this._items[this.relative(this._current)]
		}
	}, {
		filter: ["items", "settings"],
		run: function() {
			this.$stage.children(".cloned").remove()
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function(t) {
			var e = this.settings.margin || "",
				i = !this.settings.autoWidth,
				n = this.settings.rtl;
			e = {
				width: "auto",
				"margin-left": n ? e : "",
				"margin-right": n ? "" : e
			};
			i || this.$stage.children().css(e), t.css = e
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function(t) {
			var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin,
				i = null,
				n = this._items.length,
				r = !this.settings.autoWidth,
				s = [];
			for (t.items = {
					merge: !1,
					width: e
				}; n--;) i = this._mergers[n], i = this.settings.mergeFit && Math.min(i, this.settings.items) || i, t.items.merge = 1 < i || t.items.merge, s[n] = r ? e * i : this._items[n].width();
			this._widths = s
		}
	}, {
		filter: ["items", "settings"],
		run: function() {
			var e = [],
				i = this._items,
				n = this.settings,
				r = Math.max(2 * n.items, 4),
				s = 2 * Math.ceil(i.length / 2),
				o = n.loop && i.length ? n.rewind ? r : Math.max(r, s) : 0,
				a = "",
				l = "";
			for (o /= 2; 0 < o;) e.push(this.normalize(e.length / 2, !0)), a += i[e[e.length - 1]][0].outerHTML, e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)), l = i[e[e.length - 1]][0].outerHTML + l, --o;
			this._clones = e, t(a).addClass("cloned").appendTo(this.$stage), t(l).addClass("cloned").prependTo(this.$stage)
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function() {
			for (var t, e, i = this.settings.rtl ? 1 : -1, n = this._clones.length + this._items.length, r = -1, s = []; ++r < n;) t = s[r - 1] || 0, e = this._widths[this.relative(r)] + this.settings.margin, s.push(t + e * i);
			this._coordinates = s
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function() {
			var t = this.settings.stagePadding,
				e = this._coordinates;
			t = {
				width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
				"padding-left": t || "",
				"padding-right": t || ""
			};
			this.$stage.css(t)
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function(t) {
			var e = this._coordinates.length,
				i = !this.settings.autoWidth,
				n = this.$stage.children();
			if (i && t.items.merge)
				for (; e--;) t.css.width = this._widths[this.relative(e)], n.eq(e).css(t.css);
			else i && (t.css.width = t.items.width, n.css(t.css))
		}
	}, {
		filter: ["items"],
		run: function() {
			this._coordinates.length < 1 && this.$stage.removeAttr("style")
		}
	}, {
		filter: ["width", "items", "settings"],
		run: function(t) {
			t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
		}
	}, {
		filter: ["position"],
		run: function() {
			this.animate(this.coordinates(this._current))
		}
	}, {
		filter: ["width", "position", "items", "settings"],
		run: function() {
			for (var t, e, i = this.settings.rtl ? 1 : -1, n = 2 * this.settings.stagePadding, r = this.coordinates(this.current()) + n, s = r + this.width() * i, o = [], a = 0, l = this._coordinates.length; a < l; a++) t = this._coordinates[a - 1] || 0, e = Math.abs(this._coordinates[a]) + n * i, (this.op(t, "<=", r) && this.op(t, ">", s) || this.op(e, "<", r) && this.op(e, ">", s)) && o.push(a);
			this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + o.join("), :eq(") + ")").addClass("active"), this.$stage.children(".center").removeClass("center"), this.settings.center && this.$stage.children().eq(this.current()).addClass("center")
		}
	}], r.prototype.initializeStage = function() {
		this.$stage = this.$element.find("." + this.settings.stageClass), this.$stage.length || (this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ">", {
			class: this.settings.stageClass
		}).wrap(t("<div/>", {
			class: this.settings.stageOuterClass
		})), this.$element.append(this.$stage.parent()))
	}, r.prototype.initializeItems = function() {
		var e = this.$element.find(".owl-item");
		if (e.length) return this._items = e.get().map((function(e) {
			return t(e)
		})), this._mergers = this._items.map((function() {
			return 1
		})), void this.refresh();
		this.replace(this.$element.children().not(this.$stage.parent())), this.isVisible() ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass)
	}, r.prototype.initialize = function() {
		var t, e;
		this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading") && (t = this.$element.find("img"), e = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n, e = this.$element.children(e).width(), t.length && e <= 0 && this.preloadAutoWidthImages(t)), this.initializeStage(), this.initializeItems(), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
	}, r.prototype.isVisible = function() {
		return !this.settings.checkVisibility || this.$element.is(":visible")
	}, r.prototype.setup = function() {
		var e = this.viewport(),
			i = this.options.responsive,
			n = -1,
			r = null;
		i ? (t.each(i, (function(t) {
			t <= e && n < t && (n = Number(t))
		})), "function" == typeof(r = t.extend({}, this.options, i[n])).stagePadding && (r.stagePadding = r.stagePadding()), delete r.responsive, r.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + n))) : r = t.extend({}, this.options), this.trigger("change", {
			property: {
				name: "settings",
				value: r
			}
		}), this._breakpoint = n, this.settings = r, this.invalidate("settings"), this.trigger("changed", {
			property: {
				name: "settings",
				value: this.settings
			}
		})
	}, r.prototype.optionsLogic = function() {
		this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
	}, r.prototype.prepare = function(e) {
		var i = this.trigger("prepare", {
			content: e
		});
		return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), this.trigger("prepared", {
			content: i.data
		}), i.data
	}, r.prototype.update = function() {
		for (var e = 0, i = this._pipe.length, n = t.proxy((function(t) {
				return this[t]
			}), this._invalidated), r = {}; e < i;)(this._invalidated.all || 0 < t.grep(this._pipe[e].filter, n).length) && this._pipe[e].run(r), e++;
		this._invalidated = {}, this.is("valid") || this.enter("valid")
	}, r.prototype.width = function(t) {
		switch (t = t || r.Width.Default) {
			case r.Width.Inner:
			case r.Width.Outer:
				return this._width;
			default:
				return this._width - 2 * this.settings.stagePadding + this.settings.margin
		}
	}, r.prototype.refresh = function() {
		this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
	}, r.prototype.onThrottledResize = function() {
		e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
	}, r.prototype.onResize = function() {
		return !!this._items.length && this._width !== this.$element.width() && !!this.isVisible() && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))
	}, r.prototype.registerEventHandlers = function() {
		t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), !1 !== this.settings.responsive && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", (function() {
			return !1
		}))), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)))
	}, r.prototype.onDragStart = function(e) {
		var n = null;
		3 !== e.which && (n = t.support.transform ? {
			x: (n = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","))[16 === n.length ? 12 : 4],
			y: n[16 === n.length ? 13 : 5]
		} : (n = this.$stage.position(), {
			x: this.settings.rtl ? n.left + this.$stage.width() - this.width() + this.settings.margin : n.left,
			y: n.top
		}), this.is("animating") && (t.support.transform ? this.animate(n.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(e.target), this._drag.stage.start = n, this._drag.stage.current = n, this._drag.pointer = this.pointer(e), t(i).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(i).one("mousemove.owl.core touchmove.owl.core", t.proxy((function(e) {
			var n = this.difference(this._drag.pointer, this.pointer(e));
			t(i).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), Math.abs(n.x) < Math.abs(n.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"))
		}), this)))
	}, r.prototype.onDragMove = function(t) {
		var e, i = null,
			n = null,
			r = this.difference(this._drag.pointer, this.pointer(t)),
			s = this.difference(this._drag.stage.start, r);
		this.is("dragging") && (t.preventDefault(), this.settings.loop ? (i = this.coordinates(this.minimum()), n = this.coordinates(this.maximum() + 1) - i, s.x = ((s.x - i) % n + n) % n + i) : (i = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), n = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), e = this.settings.pullDrag ? -1 * r.x / 5 : 0, s.x = Math.max(Math.min(s.x, i + e), n + e)), this._drag.stage.current = s, this.animate(s.x))
	}, r.prototype.onDragEnd = function(e) {
		var n = this.difference(this._drag.pointer, this.pointer(e)),
			r = this._drag.stage.current;
		e = 0 < n.x ^ this.settings.rtl ? "left" : "right";
		t(i).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== n.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(r.x, 0 !== n.x ? e : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = e, (3 < Math.abs(n.x) || 300 < (new Date).getTime() - this._drag.time) && this._drag.target.one("click.owl.core", (function() {
			return !1
		}))), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
	}, r.prototype.closest = function(e, i) {
		var r = -1,
			s = this.width(),
			o = this.coordinates();
		return this.settings.freeDrag || t.each(o, t.proxy((function(t, a) {
			return "left" === i && a - 30 < e && e < a + 30 ? r = t : "right" === i && a - s - 30 < e && e < a - s + 30 ? r = t + 1 : this.op(e, "<", a) && this.op(e, ">", o[t + 1] !== n ? o[t + 1] : a - s) && (r = "left" === i ? t + 1 : t), -1 === r
		}), this)), this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? r = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (r = e = this.maximum())), r
	}, r.prototype.animate = function(e) {
		var i = 0 < this.speed();
		this.is("animating") && this.onTransitionEnd(), i && (this.enter("animating"), this.trigger("translate")), t.support.transform3d && t.support.transition ? this.$stage.css({
			transform: "translate3d(" + e + "px,0px,0px)",
			transition: this.speed() / 1e3 + "s" + (this.settings.slideTransition ? " " + this.settings.slideTransition : "")
		}) : i ? this.$stage.animate({
			left: e + "px"
		}, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({
			left: e + "px"
		})
	}, r.prototype.is = function(t) {
		return this._states.current[t] && 0 < this._states.current[t]
	}, r.prototype.current = function(t) {
		return t === n ? this._current : 0 === this._items.length ? n : (t = this.normalize(t), this._current !== t && ((e = this.trigger("change", {
			property: {
				name: "position",
				value: t
			}
		})).data !== n && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
			property: {
				name: "position",
				value: this._current
			}
		})), this._current);
		var e
	}, r.prototype.invalidate = function(e) {
		return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, (function(t, e) {
			return e
		}))
	}, r.prototype.reset = function(t) {
		(t = this.normalize(t)) !== n && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
	}, r.prototype.normalize = function(t, e) {
		var i = this._items.length;
		e = e ? 0 : this._clones.length;
		return !this.isNumeric(t) || i < 1 ? t = n : (t < 0 || i + e <= t) && (t = ((t - e / 2) % i + i) % i + e / 2), t
	}, r.prototype.relative = function(t) {
		return t -= this._clones.length / 2, this.normalize(t, !0)
	}, r.prototype.maximum = function(t) {
		var e, i, n, r = this.settings,
			s = this._coordinates.length;
		if (r.loop) s = this._clones.length / 2 + this._items.length - 1;
		else if (r.autoWidth || r.merge) {
			if (e = this._items.length)
				for (i = this._items[--e].width(), n = this.$element.width(); e-- && !(n < (i += this._items[e].width() + this.settings.margin)););
			s = e + 1
		} else s = r.center ? this._items.length - 1 : this._items.length - r.items;
		return t && (s -= this._clones.length / 2), Math.max(s, 0)
	}, r.prototype.minimum = function(t) {
		return t ? 0 : this._clones.length / 2
	}, r.prototype.items = function(t) {
		return t === n ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
	}, r.prototype.mergers = function(t) {
		return t === n ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
	}, r.prototype.clones = function(e) {
		function i(t) {
			return t % 2 == 0 ? s + t / 2 : r - (t + 1) / 2
		}
		var r = this._clones.length / 2,
			s = r + this._items.length;
		return e === n ? t.map(this._clones, (function(t, e) {
			return i(e)
		})) : t.map(this._clones, (function(t, n) {
			return t === e ? i(n) : null
		}))
	}, r.prototype.speed = function(t) {
		return t !== n && (this._speed = t), this._speed
	}, r.prototype.coordinates = function(e) {
		var i, r = 1,
			s = e - 1;
		return e === n ? t.map(this._coordinates, t.proxy((function(t, e) {
			return this.coordinates(e)
		}), this)) : (this.settings.center ? (this.settings.rtl && (r = -1, s = e + 1), i = this._coordinates[e], i += (this.width() - i + (this._coordinates[s] || 0)) / 2 * r) : i = this._coordinates[s] || 0, i = Math.ceil(i))
	}, r.prototype.duration = function(t, e, i) {
		return 0 === i ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
	}, r.prototype.to = function(t, e) {
		var i, n = this.current(),
			r = t - this.relative(n),
			s = (0 < r) - (r < 0),
			o = this._items.length,
			a = this.minimum(),
			l = this.maximum();
		this.settings.loop ? (!this.settings.rewind && Math.abs(r) > o / 2 && (r += -1 * s * o), (i = (((t = n + r) - a) % o + o) % o + a) !== t && i - r <= l && 0 < i - r && (n = i - r, t = i, this.reset(n))) : t = this.settings.rewind ? (t % (l += 1) + l) % l : Math.max(a, Math.min(l, t)), this.speed(this.duration(n, t, e)), this.current(t), this.isVisible() && this.update()
	}, r.prototype.next = function(t) {
		t = t || !1, this.to(this.relative(this.current()) + 1, t)
	}, r.prototype.prev = function(t) {
		t = t || !1, this.to(this.relative(this.current()) - 1, t)
	}, r.prototype.onTransitionEnd = function(t) {
		if (t !== n && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))) return !1;
		this.leave("animating"), this.trigger("translated")
	}, r.prototype.viewport = function() {
		var n;
		return this.options.responsiveBaseElement !== e ? n = t(this.options.responsiveBaseElement).width() : e.innerWidth ? n = e.innerWidth : i.documentElement && i.documentElement.clientWidth ? n = i.documentElement.clientWidth : console.warn("Can not detect viewport width."), n
	}, r.prototype.replace = function(e) {
		this.$stage.empty(), this._items = [], e = e && (e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter((function() {
			return 1 === this.nodeType
		})).each(t.proxy((function(t, e) {
			e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(+e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
		}), this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
	}, r.prototype.add = function(e, i) {
		var r = this.relative(this._current);
		i = i === n ? this._items.length : this.normalize(i, !0), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
			content: e,
			position: i
		}), e = this.prepare(e), 0 === this._items.length || i === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[i - 1].after(e), this._items.push(e), this._mergers.push(+e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[i].before(e), this._items.splice(i, 0, e), this._mergers.splice(i, 0, +e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[r] && this.reset(this._items[r].index()), this.invalidate("items"), this.trigger("added", {
			content: e,
			position: i
		})
	}, r.prototype.remove = function(t) {
		(t = this.normalize(t, !0)) !== n && (this.trigger("remove", {
			content: this._items[t],
			position: t
		}), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
			content: null,
			position: t
		}))
	}, r.prototype.preloadAutoWidthImages = function(e) {
		e.each(t.proxy((function(e, i) {
			this.enter("pre-loading"), i = t(i), t(new Image).one("load", t.proxy((function(t) {
				i.attr("src", t.target.src), i.css("opacity", 1), this.leave("pre-loading"), this.is("pre-loading") || this.is("initializing") || this.refresh()
			}), this)).attr("src", i.attr("src") || i.attr("data-src") || i.attr("data-src-retina"))
		}), this))
	}, r.prototype.destroy = function() {
		for (var n in this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(i).off(".owl.core"), !1 !== this.settings.responsive && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize)), this._plugins) this._plugins[n].destroy();
		this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.remove(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
	}, r.prototype.op = function(t, e, i) {
		var n = this.settings.rtl;
		switch (e) {
			case "<":
				return n ? i < t : t < i;
			case ">":
				return n ? t < i : i < t;
			case ">=":
				return n ? t <= i : i <= t;
			case "<=":
				return n ? i <= t : t <= i
		}
	}, r.prototype.on = function(t, e, i, n) {
		t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
	}, r.prototype.off = function(t, e, i, n) {
		t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
	}, r.prototype.trigger = function(e, i, n, s, o) {
		var a = {
				item: {
					count: this._items.length,
					index: this.current()
				}
			},
			l = t.camelCase(t.grep(["on", e, n], (function(t) {
				return t
			})).join("-").toLowerCase()),
			c = t.Event([e, "owl", n || "carousel"].join(".").toLowerCase(), t.extend({
				relatedTarget: this
			}, a, i));
		return this._supress[e] || (t.each(this._plugins, (function(t, e) {
			e.onTrigger && e.onTrigger(c)
		})), this.register({
			type: r.Type.Event,
			name: e
		}), this.$element.trigger(c), this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, c)), c
	}, r.prototype.enter = function(e) {
		t.each([e].concat(this._states.tags[e] || []), t.proxy((function(t, e) {
			this._states.current[e] === n && (this._states.current[e] = 0), this._states.current[e]++
		}), this))
	}, r.prototype.leave = function(e) {
		t.each([e].concat(this._states.tags[e] || []), t.proxy((function(t, e) {
			this._states.current[e]--
		}), this))
	}, r.prototype.register = function(e) {
		var i;
		e.type === r.Type.Event ? (t.event.special[e.name] || (t.event.special[e.name] = {}), t.event.special[e.name].owl || (i = t.event.special[e.name]._default, t.event.special[e.name]._default = function(t) {
			return !i || !i.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && -1 < t.namespace.indexOf("owl") : i.apply(this, arguments)
		}, t.event.special[e.name].owl = !0)) : e.type === r.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy((function(i, n) {
			return t.inArray(i, this._states.tags[e.name]) === n
		}), this)))
	}, r.prototype.suppress = function(e) {
		t.each(e, t.proxy((function(t, e) {
			this._supress[e] = !0
		}), this))
	}, r.prototype.release = function(e) {
		t.each(e, t.proxy((function(t, e) {
			delete this._supress[e]
		}), this))
	}, r.prototype.pointer = function(t) {
		var i = {
			x: null,
			y: null
		};
		return (t = (t = t.originalEvent || t || e.event).touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t).pageX ? (i.x = t.pageX, i.y = t.pageY) : (i.x = t.clientX, i.y = t.clientY), i
	}, r.prototype.isNumeric = function(t) {
		return !isNaN(parseFloat(t))
	}, r.prototype.difference = function(t, e) {
		return {
			x: t.x - e.x,
			y: t.y - e.y
		}
	}, t.fn.owlCarousel = function(e) {
		var i = Array.prototype.slice.call(arguments, 1);
		return this.each((function() {
			var n = t(this),
				s = n.data("owl.carousel");
			s || (s = new r(this, "object" == typeof e && e), n.data("owl.carousel", s), t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], (function(e, i) {
				s.register({
					type: r.Type.Event,
					name: i
				}), s.$element.on(i + ".owl.carousel.core", t.proxy((function(t) {
					t.namespace && t.relatedTarget !== this && (this.suppress([i]), s[i].apply(this, [].slice.call(arguments, 1)), this.release([i]))
				}), s))
			}))), "string" == typeof e && "_" !== e.charAt(0) && s[e].apply(s, i)
		}))
	}, t.fn.owlCarousel.Constructor = r
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
	var i = function(e) {
		this._core = e, this._interval = null, this._visible = null, this._handlers = {
			"initialized.owl.carousel": t.proxy((function(t) {
				t.namespace && this._core.settings.autoRefresh && this.watch()
			}), this)
		}, this._core.options = t.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers)
	};
	i.Defaults = {
		autoRefresh: !0,
		autoRefreshInterval: 500
	}, i.prototype.watch = function() {
		this._interval || (this._visible = this._core.isVisible(), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
	}, i.prototype.refresh = function() {
		this._core.isVisible() !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
	}, i.prototype.destroy = function() {
		var t, i;
		for (t in e.clearInterval(this._interval), this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = i
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
	var i = function(e) {
		this._core = e, this._loaded = [], this._handlers = {
			"initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy((function(e) {
				if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type)) {
					var i = this._core.settings,
						n = i.center && Math.ceil(i.items / 2) || i.items,
						r = i.center && -1 * n || 0,
						s = (e.property && void 0 !== e.property.value ? e.property.value : this._core.current()) + r,
						o = this._core.clones().length,
						a = t.proxy((function(t, e) {
							this.load(e)
						}), this);
					for (0 < i.lazyLoadEager && (n += i.lazyLoadEager, i.loop && (s -= i.lazyLoadEager, n++)); r++ < n;) this.load(o / 2 + this._core.relative(s)), o && t.each(this._core.clones(this._core.relative(s)), a), s++
				}
			}), this)
		}, this._core.options = t.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers)
	};
	i.Defaults = {
		lazyLoad: !1,
		lazyLoadEager: 0
	}, i.prototype.load = function(i) {
		var n = this._core.$stage.children().eq(i);
		!(i = n && n.find(".owl-lazy")) || -1 < t.inArray(n.get(0), this._loaded) || (i.each(t.proxy((function(i, n) {
			var r = t(n),
				s = 1 < e.devicePixelRatio && r.attr("data-src-retina") || r.attr("data-src") || r.attr("data-srcset");
			this._core.trigger("load", {
				element: r,
				url: s
			}, "lazy"), r.is("img") ? r.one("load.owl.lazy", t.proxy((function() {
				r.css("opacity", 1), this._core.trigger("loaded", {
					element: r,
					url: s
				}, "lazy")
			}), this)).attr("src", s) : r.is("source") ? r.one("load.owl.lazy", t.proxy((function() {
				this._core.trigger("loaded", {
					element: r,
					url: s
				}, "lazy")
			}), this)).attr("srcset", s) : ((n = new Image).onload = t.proxy((function() {
				r.css({
					"background-image": 'url("' + s + '")',
					opacity: "1"
				}), this._core.trigger("loaded", {
					element: r,
					url: s
				}, "lazy")
			}), this), n.src = s)
		}), this)), this._loaded.push(n.get(0)))
	}, i.prototype.destroy = function() {
		var t, e;
		for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.Lazy = i
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
	var i = function(n) {
		this._core = n, this._previousHeight = null, this._handlers = {
			"initialized.owl.carousel refreshed.owl.carousel": t.proxy((function(t) {
				t.namespace && this._core.settings.autoHeight && this.update()
			}), this),
			"changed.owl.carousel": t.proxy((function(t) {
				t.namespace && this._core.settings.autoHeight && "position" === t.property.name && this.update()
			}), this),
			"loaded.owl.lazy": t.proxy((function(t) {
				t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
			}), this)
		}, this._core.options = t.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers), this._intervalId = null;
		var r = this;
		t(e).on("load", (function() {
			r._core.settings.autoHeight && r.update()
		})), t(e).resize((function() {
			r._core.settings.autoHeight && (null != r._intervalId && clearTimeout(r._intervalId), r._intervalId = setTimeout((function() {
				r.update()
			}), 250))
		}))
	};
	i.Defaults = {
		autoHeight: !1,
		autoHeightClass: "owl-height"
	}, i.prototype.update = function() {
		var e = (n = this._core._current) + this._core.settings.items,
			i = this._core.settings.lazyLoad,
			n = this._core.$stage.children().toArray().slice(n, e),
			r = [];
		e = 0;
		t.each(n, (function(e, i) {
			r.push(t(i).height())
		})), (e = Math.max.apply(null, r)) <= 1 && i && this._previousHeight && (e = this._previousHeight), this._previousHeight = e, this._core.$stage.parent().height(e).addClass(this._core.settings.autoHeightClass)
	}, i.prototype.destroy = function() {
		var t, e;
		for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = i
}(window.Zepto || window.jQuery, window, document),
function(t, e) {
	var i = function(e) {
		this._core = e, this._videos = {}, this._playing = null, this._handlers = {
			"initialized.owl.carousel": t.proxy((function(t) {
				t.namespace && this._core.register({
					type: "state",
					name: "playing",
					tags: ["interacting"]
				})
			}), this),
			"resize.owl.carousel": t.proxy((function(t) {
				t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
			}), this),
			"refreshed.owl.carousel": t.proxy((function(t) {
				t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
			}), this),
			"changed.owl.carousel": t.proxy((function(t) {
				t.namespace && "position" === t.property.name && this._playing && this.stop()
			}), this),
			"prepared.owl.carousel": t.proxy((function(e) {
				var i;
				!e.namespace || (i = t(e.content).find(".owl-video")).length && (i.css("display", "none"), this.fetch(i, t(e.content)))
			}), this)
		}, this._core.options = t.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy((function(t) {
			this.play(t)
		}), this))
	};
	i.Defaults = {
		video: !1,
		videoHeight: !1,
		videoWidth: !1
	}, i.prototype.fetch = function(t, e) {
		var i = t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube",
			n = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
			r = t.attr("data-width") || this._core.settings.videoWidth,
			s = t.attr("data-height") || this._core.settings.videoHeight,
			o = t.attr("href");
		if (!o) throw new Error("Missing video URL.");
		if (-1 < (n = o.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/))[3].indexOf("youtu")) i = "youtube";
		else if (-1 < n[3].indexOf("vimeo")) i = "vimeo";
		else {
			if (!(-1 < n[3].indexOf("vzaar"))) throw new Error("Video URL not supported.");
			i = "vzaar"
		}
		n = n[6], this._videos[o] = {
			type: i,
			id: n,
			width: r,
			height: s
		}, e.attr("data-video", o), this.thumbnail(t, this._videos[o])
	}, i.prototype.thumbnail = function(e, i) {
		function n(i) {
			r = c.lazyLoad ? t("<div/>", {
				class: "owl-video-tn " + l,
				srcType: i
			}) : t("<div/>", {
				class: "owl-video-tn",
				style: "opacity:1;background-image:url(" + i + ")"
			}), e.after(r), e.after('<div class="owl-video-play-icon"></div>')
		}
		var r, s = i.width && i.height ? "width:" + i.width + "px;height:" + i.height + "px;" : "",
			o = e.find("img"),
			a = "src",
			l = "",
			c = this._core.settings;
		if (e.wrap(t("<div/>", {
				class: "owl-video-wrapper",
				style: s
			})), this._core.settings.lazyLoad && (a = "data-src", l = "owl-lazy"), o.length) return n(o.attr(a)), o.remove(), !1;
		"youtube" === i.type ? n("//img.youtube.com/vi/" + i.id + "/hqdefault.jpg") : "vimeo" === i.type ? t.ajax({
			type: "GET",
			url: "//vimeo.com/api/v2/video/" + i.id + ".json",
			jsonp: "callback",
			dataType: "jsonp",
			success: function(t) {
				n(t[0].thumbnail_large)
			}
		}) : "vzaar" === i.type && t.ajax({
			type: "GET",
			url: "//vzaar.com/api/videos/" + i.id + ".json",
			jsonp: "callback",
			dataType: "jsonp",
			success: function(t) {
				n(t.framegrab_url)
			}
		})
	}, i.prototype.stop = function() {
		this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
	}, i.prototype.play = function(e) {
		var i = t(e.target).closest("." + this._core.settings.itemClass),
			n = this._videos[i.attr("data-video")],
			r = n.width || "100%",
			s = n.height || this._core.$stage.height();
		this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), i = this._core.items(this._core.relative(i.index())), this._core.reset(i.index()), (e = t('<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>')).attr("height", s), e.attr("width", r), "youtube" === n.type ? e.attr("src", "//www.youtube.com/embed/" + n.id + "?autoplay=1&rel=0&v=" + n.id) : "vimeo" === n.type ? e.attr("src", "//player.vimeo.com/video/" + n.id + "?autoplay=1") : "vzaar" === n.type && e.attr("src", "//view.vzaar.com/" + n.id + "/player?autoplay=true"), t(e).wrap('<div class="owl-video-frame" />').insertAfter(i.find(".owl-video")), this._playing = i.addClass("owl-video-playing"))
	}, i.prototype.isInFullScreen = function() {
		var i = e.fullscreenElement || e.mozFullScreenElement || e.webkitFullscreenElement;
		return i && t(i).parent().hasClass("owl-video-frame")
	}, i.prototype.destroy = function() {
		var t, e;
		for (t in this._core.$element.off("click.owl.video"), this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.Video = i
}(window.Zepto || window.jQuery, (window, document)),
function(t) {
	var e = function(i) {
		this.core = i, this.core.options = t.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = void 0, this.next = void 0, this.handlers = {
			"change.owl.carousel": t.proxy((function(t) {
				t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
			}), this),
			"drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy((function(t) {
				t.namespace && (this.swapping = "translated" == t.type)
			}), this),
			"translate.owl.carousel": t.proxy((function(t) {
				t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
			}), this)
		}, this.core.$element.on(this.handlers)
	};
	e.Defaults = {
		animateOut: !1,
		animateIn: !1
	}, e.prototype.swap = function() {
		var e, i, n, r, s, o;
		1 === this.core.settings.items && t.support.animation && t.support.transition && (this.core.speed(0), i = t.proxy(this.clear, this), n = this.core.$stage.children().eq(this.previous), r = this.core.$stage.children().eq(this.next), s = this.core.settings.animateIn, o = this.core.settings.animateOut, this.core.current() !== this.previous && (o && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), n.one(t.support.animation.end, i).css({
			left: e + "px"
		}).addClass("animated owl-animated-out").addClass(o)), s && r.one(t.support.animation.end, i).addClass("animated owl-animated-in").addClass(s)))
	}, e.prototype.clear = function(e) {
		t(e.target).css({
			left: ""
		}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
	}, e.prototype.destroy = function() {
		var t, e;
		for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.Animate = e
}(window.Zepto || window.jQuery, (window, document)),
function(t, e, i) {
	var n = function(e) {
		this._core = e, this._call = null, this._time = 0, this._timeout = 0, this._paused = !0, this._handlers = {
			"changed.owl.carousel": t.proxy((function(t) {
				t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._paused && (this._time = 0)
			}), this),
			"initialized.owl.carousel": t.proxy((function(t) {
				t.namespace && this._core.settings.autoplay && this.play()
			}), this),
			"play.owl.autoplay": t.proxy((function(t, e, i) {
				t.namespace && this.play(e, i)
			}), this),
			"stop.owl.autoplay": t.proxy((function(t) {
				t.namespace && this.stop()
			}), this),
			"mouseover.owl.autoplay": t.proxy((function() {
				this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
			}), this),
			"mouseleave.owl.autoplay": t.proxy((function() {
				this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
			}), this),
			"touchstart.owl.core": t.proxy((function() {
				this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
			}), this),
			"touchend.owl.core": t.proxy((function() {
				this._core.settings.autoplayHoverPause && this.play()
			}), this)
		}, this._core.$element.on(this._handlers), this._core.options = t.extend({}, n.Defaults, this._core.options)
	};
	n.Defaults = {
		autoplay: !1,
		autoplayTimeout: 5e3,
		autoplayHoverPause: !1,
		autoplaySpeed: !1
	}, n.prototype._next = function(n) {
		this._call = e.setTimeout(t.proxy(this._next, this, n), this._timeout * (Math.round(this.read() / this._timeout) + 1) - this.read()), this._core.is("interacting") || i.hidden || this._core.next(n || this._core.settings.autoplaySpeed)
	}, n.prototype.read = function() {
		return (new Date).getTime() - this._time
	}, n.prototype.play = function(i, n) {
		var r;
		this._core.is("rotating") || this._core.enter("rotating"), i = i || this._core.settings.autoplayTimeout, r = Math.min(this._time % (this._timeout || i), i), this._paused ? (this._time = this.read(), this._paused = !1) : e.clearTimeout(this._call), this._time += this.read() % i - r, this._timeout = i, this._call = e.setTimeout(t.proxy(this._next, this, n), i - r)
	}, n.prototype.stop = function() {
		this._core.is("rotating") && (this._time = 0, this._paused = !0, e.clearTimeout(this._call), this._core.leave("rotating"))
	}, n.prototype.pause = function() {
		this._core.is("rotating") && !this._paused && (this._time = this.read(), this._paused = !0, e.clearTimeout(this._call))
	}, n.prototype.destroy = function() {
		var t, e;
		for (t in this.stop(), this._handlers) this._core.$element.off(t, this._handlers[t]);
		for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.autoplay = n
}(window.Zepto || window.jQuery, window, document),
function(t) {
	"use strict";
	var e = function(i) {
		this._core = i, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
			next: this._core.next,
			prev: this._core.prev,
			to: this._core.to
		}, this._handlers = {
			"prepared.owl.carousel": t.proxy((function(e) {
				e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
			}), this),
			"added.owl.carousel": t.proxy((function(t) {
				t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
			}), this),
			"remove.owl.carousel": t.proxy((function(t) {
				t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
			}), this),
			"changed.owl.carousel": t.proxy((function(t) {
				t.namespace && "position" == t.property.name && this.draw()
			}), this),
			"initialized.owl.carousel": t.proxy((function(t) {
				t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
			}), this),
			"refreshed.owl.carousel": t.proxy((function(t) {
				t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
			}), this)
		}, this._core.options = t.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
	};
	e.Defaults = {
		nav: !1,
		navText: ['<span aria-label="Previous">&#x2039;</span>', '<span aria-label="Next">&#x203a;</span>'],
		navSpeed: !1,
		navElement: 'button type="button" role="presentation"',
		navContainer: !1,
		navContainerClass: "owl-nav",
		navClass: ["owl-prev", "owl-next"],
		slideBy: 1,
		dotClass: "owl-dot",
		dotsClass: "owl-dots",
		dots: !0,
		dotsEach: !1,
		dotsData: !1,
		dotsSpeed: !1,
		dotsContainer: !1
	}, e.prototype.initialize = function() {
		var e, i = this._core.settings;
		for (e in this._controls.$relative = (i.navContainer ? t(i.navContainer) : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = t("<" + i.navElement + ">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy((function(t) {
				this.prev(i.navSpeed)
			}), this)), this._controls.$next = t("<" + i.navElement + ">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy((function(t) {
				this.next(i.navSpeed)
			}), this)), i.dotsData || (this._templates = [t('<button role="button">').addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]), this._controls.$absolute = (i.dotsContainer ? t(i.dotsContainer) : t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "button", t.proxy((function(e) {
				var n = (t(e.target).parent().is(this._controls.$absolute) ? t(e.target) : t(e.target).parent()).index();
				e.preventDefault(), this.to(n, i.dotsSpeed)
			}), this)), this._overrides) this._core[e] = t.proxy(this[e], this)
	}, e.prototype.destroy = function() {
		var t, e, i, n, r = this._core.settings;
		for (t in this._handlers) this.$element.off(t, this._handlers[t]);
		for (e in this._controls) "$relative" === e && r.navContainer ? this._controls[e].html("") : this._controls[e].remove();
		for (n in this.overides) this._core[n] = this._overrides[n];
		for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
	}, e.prototype.update = function() {
		var t, e, i = this._core.clones().length / 2,
			n = i + this._core.items().length,
			r = this._core.maximum(!0),
			s = this._core.settings,
			o = s.center || s.autoWidth || s.dotsData ? 1 : s.dotsEach || s.items;
		if ("page" !== s.slideBy && (s.slideBy = Math.min(s.slideBy, s.items)), s.dots || "page" == s.slideBy)
			for (this._pages = [], t = i, e = 0; t < n; t++) {
				if (o <= e || 0 === e) {
					if (this._pages.push({
							start: Math.min(r, t - i),
							end: t - i + o - 1
						}), Math.min(r, t - i) === r) break;
					e = 0
				}
				e += this._core.mergers(this._core.relative(t))
			}
	}, e.prototype.draw = function() {
		var e = this._core.settings,
			i = this._core.items().length <= e.items,
			n = this._core.relative(this._core.current()),
			r = e.loop || e.rewind;
		this._controls.$relative.toggleClass("disabled", !e.nav || i), e.nav && (this._controls.$previous.toggleClass("disabled", !r && n <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !r && n >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !e.dots || i), e.dots && (i = this._pages.length - this._controls.$absolute.children().length, e.dotsData && 0 != i ? this._controls.$absolute.html(this._templates.join("")) : 0 < i ? this._controls.$absolute.append(new Array(1 + i).join(this._templates[0])) : i < 0 && this._controls.$absolute.children().slice(i).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
	}, e.prototype.onTrigger = function(e) {
		var i = this._core.settings;
		e.page = {
			index: t.inArray(this.current(), this._pages),
			count: this._pages.length,
			size: i && (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items)
		}
	}, e.prototype.current = function() {
		var e = this._core.relative(this._core.current());
		return t.grep(this._pages, t.proxy((function(t, i) {
			return t.start <= e && t.end >= e
		}), this)).pop()
	}, e.prototype.getPosition = function(e) {
		var i, n, r = this._core.settings;
		return "page" == r.slideBy ? (i = t.inArray(this.current(), this._pages), n = this._pages.length, e ? ++i : --i, i = this._pages[(i % n + n) % n].start) : (i = this._core.relative(this._core.current()), n = this._core.items().length, e ? i += r.slideBy : i -= r.slideBy), i
	}, e.prototype.next = function(e) {
		t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
	}, e.prototype.prev = function(e) {
		t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
	}, e.prototype.to = function(e, i, n) {
		!n && this._pages.length ? (n = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % n + n) % n].start, i)) : t.proxy(this._overrides.to, this._core)(e, i)
	}, t.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, (window, document)),
function(t, e) {
	"use strict";
	var i = function(n) {
		this._core = n, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
			"initialized.owl.carousel": t.proxy((function(i) {
				i.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
			}), this),
			"prepared.owl.carousel": t.proxy((function(e) {
				var i;
				!e.namespace || (i = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash")) && (this._hashes[i] = e.content)
			}), this),
			"changed.owl.carousel": t.proxy((function(i) {
				var n;
				i.namespace && "position" === i.property.name && (n = this._core.items(this._core.relative(this._core.current())), (i = t.map(this._hashes, (function(t, e) {
					return t === n ? e : null
				})).join()) && e.location.hash.slice(1) !== i && (e.location.hash = i))
			}), this)
		}, this._core.options = t.extend({}, i.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy((function(t) {
			var i = e.location.hash.substring(1),
				n = this._core.$stage.children();
			void 0 !== (i = this._hashes[i] && n.index(this._hashes[i])) && i !== this._core.current() && this._core.to(this._core.relative(i), !1, !0)
		}), this))
	};
	i.Defaults = {
		URLhashListener: !1
	}, i.prototype.destroy = function() {
		var i, n;
		for (i in t(e).off("hashchange.owl.navigation"), this._handlers) this._core.$element.off(i, this._handlers[i]);
		for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
	}, t.fn.owlCarousel.Constructor.Plugins.Hash = i
