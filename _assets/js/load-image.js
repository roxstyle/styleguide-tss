(function (a) {
	"use strict";
	var b = function (a, c, d) {
		var e = document.createElement("img"),
			f, g;
			return e.onerror = c, e.onload = function () {
				g && b.revokeObjectURL(g), c(b.scale(e, d))
			}, window.Blob && a instanceof Blob || window.File && a instanceof File ? f = g = b.createObjectURL(a) : f = a, f ? (e.src = f, e) : b.readFile(a, function (a) {
				e.src = a
			})
		},
		c = window.createObjectURL && window || window.URL && URL.revokeObjectURL && URL || window.webkitURL && webkitURL;
	b.scale = function (a, b) {
		b = b || {};
		var c = document.createElement("canvas"),
			d = a.width,
			e = a.height,
			f = Math.max((b.minWidth || d) / d, (b.minHeight || e) / e);
		return f > 1 && (d = parseInt(d * f, 10), e = parseInt(e * f, 10)), f = Math.min((b.maxWidth || d) / d, (b.maxHeight || e) / e), f < 1 && (d = parseInt(d * f, 10), e = parseInt(e * f, 10)), a.getContext || b.canvas && c.getContext ? (c.width = d, c.height = e, c.getContext("2d").drawImage(a, 0, 0, d, e), c) : (a.width = d, a.height = e, a)
	}, b.createObjectURL = function (a) {
		return c ? c.createObjectURL(a) : !1
	}, b.revokeObjectURL = function (a) {
		return c ? c.revokeObjectURL(a) : !1
	}, b.readFile = function (a, b) {
		if (window.FileReader && FileReader.prototype.readAsDataURL) {
			var c = new FileReader;
			return c.onload = function (a) {
				b(a.target.result)
			}, c.readAsDataURL(a), c
		}
		return !1
	}, typeof define != "undefined" && define.amd ? define(function () {
		return b
	}) : a.loadImage = b
})(this);