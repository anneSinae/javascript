/*!
 * type-hangul v0.2.4
 * https://github.com/SDuck4/type-hangul
 * 
 * MIT License
 * Copyright (c) 2020 Chae SeungWoo
 */
! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 1)
}([function(e, t) {
    e.exports = Hangul
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(0);
    const o = {
        text: null,
        append: !1,
        intervalType: 120,
        humanize: null
    };

    function u(e, t) {
        console.log(t, "zzz")
        null === (t = function(e, t) {
            let n = JSON.parse(JSON.stringify(e));
            for (let e in t) n[e] = t[e];
            return n
        }(o, t)).text && (t.text = i(e));
        
        let n, u = function(e) {
                let t = Object(r.d)(e, !0),
                    n = [],
                    o = [];
                for (let e in t) {
                    let r = t[e];
                    r.length > 1 ? o = o.concat(r) : (o.length > 0 && (n.push(o), o = []), n.push(r))
                }
                return o.length > 0 && n.push(o), n
            }(t.text),
            l = 0,
            a = 0,
            c = t.append ? i(e) : "",
            f = c;

        function p() {
            if (null === t.humanize) return t.intervalType;
            console.log(t.intervalType,  t.humanize, "----")
            if ("number" == typeof t.humanize) return function(e, t) {
                let n = e - e * t,
                    r = e + e * t;
                return Math.round(Math.random() * (r - n) + n)
            }(t.intervalType, t.humanize);
            if ("function" == typeof t.humanize) return t.humanize(t.intervalType);
            throw new Error("'humanize' cannnot be " + typeof t.humanize)
        }
        const s = new CustomEvent("th.startType", {
            detail: {
                target: e,
                options: t
            }
        });
        e.dispatchEvent(s),
            function o() {
                let s = u[l];
                if (a >= s.length) {
                    if (l += 1, a = 0, c = i(e), l >= u.length) {
                        const n = new CustomEvent("th.endType", {
                            detail: {
                                target: e,
                                options: t
                            }
                        });
                        return void e.dispatchEvent(n)
                    }
                    return n = p(), void setTimeout(o, n)
                }
                let d = Object(r.a)(s.slice(0, a + 1)),
                    h = s[a];
                const y = new CustomEvent("th.beforeType", {
                    detail: {
                        target: e,
                        options: t,
                        progress: f,
                        typeChar: h
                    }
                });
                e.dispatchEvent(y), f = c + d,
                    function(e, t) {
                        "INPUT" === e.nodeName ? e.value = t : e.textContent = t
                    }(e, f), a += 1;
                const v = new CustomEvent("th.afterType", {
                    detail: {
                        target: e,
                        options: t,
                        progress: f,
                        typeChar: h
                    }
                });
                e.dispatchEvent(v), n = p(), setTimeout(o, n)
            }()
    }

    function i(e) {
        return "INPUT" === e.nodeName ? e.value : e.textContent
    }
    const l = {
        type: function(e, t) {
            if (void 0 === e) throw new Error("'selector' cannnot be undefined");
            if (null === e) throw new Error("'selector' cannnot be null");
            let n = document.querySelectorAll(e);
            for (let e = 0; e < n.length; e++) u(n[e], t)
        }
    };
    window.TypeHangul = l, t.default = l
}]);