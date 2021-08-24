define(['exports', 'react'], function (exports, react) { 'use strict';

	

	function ___$insertStyle(css) {
	  if (!css) {
	    return;
	  }
	  if (typeof window === 'undefined') {
	    return;
	  }

	  var style = document.createElement('style');

	  style.setAttribute('type', 'text/css');
	  style.innerHTML = css;
	  document.head.appendChild(style);
	  return css;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
			path: basedir,
			exports: {},
			require: function (path, base) {
				return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
			}
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	var classnames = createCommonjsModule(function (module) {
	/*!
	  Copyright (c) 2017 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/

	/* global define */
	(function () {

	  var hasOwn = {}.hasOwnProperty;

	  function classNames() {
	    var classes = [];

	    for (var i = 0; i < arguments.length; i++) {
	      var arg = arguments[i];
	      if (!arg) continue;
	      var argType = typeof arg;

	      if (argType === 'string' || argType === 'number') {
	        classes.push(arg);
	      } else if (Array.isArray(arg) && arg.length) {
	        var inner = classNames.apply(null, arg);

	        if (inner) {
	          classes.push(inner);
	        }
	      } else if (argType === 'object') {
	        for (var key in arg) {
	          if (hasOwn.call(arg, key) && arg[key]) {
	            classes.push(key);
	          }
	        }
	      }
	    }

	    return classes.join(' ');
	  }

	  if ( module.exports) {
	    classNames.default = classNames;
	    module.exports = classNames;
	  } else {
	    window.classNames = classNames;
	  }
	})();
	});

	const Alert = ({
	  className,
	  bootstrapStyle,
	  children
	}) => react.Children.count(children) > 0 ? react.createElement("div", {
	  className: classnames(`alert alert-${bootstrapStyle}`, className)
	}, children) : null;
	Alert.displayName = "Alert";

	var FormatterType;

	(function (FormatterType) {
	  FormatterType["Number"] = "number";
	  FormatterType["DateTime"] = "datetime";
	})(FormatterType || (FormatterType = {}));

	var shifty = createCommonjsModule(function (module, exports) {
	/*! Shifty 2.13.0 - https://github.com/jeremyckahn/shifty */
	!function (t, n) {
	   module.exports = n() ;
	}(window, function () {
	  return function (t) {
	    var n = {};

	    function e(r) {
	      if (n[r]) return n[r].exports;
	      var i = n[r] = {
	        i: r,
	        l: !1,
	        exports: {}
	      };
	      return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
	    }

	    return e.m = t, e.c = n, e.d = function (t, n, r) {
	      e.o(t, n) || Object.defineProperty(t, n, {
	        enumerable: !0,
	        get: r
	      });
	    }, e.r = function (t) {
	      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
	        value: "Module"
	      }), Object.defineProperty(t, "__esModule", {
	        value: !0
	      });
	    }, e.t = function (t, n) {
	      if (1 & n && (t = e(t)), 8 & n) return t;
	      if (4 & n && "object" == typeof t && t && t.__esModule) return t;
	      var r = Object.create(null);
	      if (e.r(r), Object.defineProperty(r, "default", {
	        enumerable: !0,
	        value: t
	      }), 2 & n && "string" != typeof t) for (var i in t) e.d(r, i, function (n) {
	        return t[n];
	      }.bind(null, i));
	      return r;
	    }, e.n = function (t) {
	      var n = t && t.__esModule ? function () {
	        return t.default;
	      } : function () {
	        return t;
	      };
	      return e.d(n, "a", n), n;
	    }, e.o = function (t, n) {
	      return Object.prototype.hasOwnProperty.call(t, n);
	    }, e.p = "", e(e.s = 4);
	  }([function (t, n, e) {

	    (function (t) {
	      e.d(n, "e", function () {
	        return E;
	      }), e.d(n, "c", function () {
	        return I;
	      }), e.d(n, "b", function () {
	        return q;
	      }), e.d(n, "a", function () {
	        return Q;
	      }), e.d(n, "d", function () {
	        return N;
	      });
	      var r = e(1),
	          i = e.n(r),
	          u = e(2);

	      function o(t, n) {
	        if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
	      }

	      function a(t, n) {
	        for (var e = 0; e < n.length; e++) {
	          var r = n[e];
	          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
	        }
	      }

	      function c(t, n, e) {
	        return n in t ? Object.defineProperty(t, n, {
	          value: e,
	          enumerable: !0,
	          configurable: !0,
	          writable: !0
	        }) : t[n] = e, t;
	      }

	      function s(t) {
	        return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
	          return typeof t;
	        } : function (t) {
	          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
	        })(t);
	      }

	      var f,
	          l,
	          h,
	          p,
	          d,
	          _,
	          v,
	          y,
	          g,
	          m,
	          b,
	          w,
	          S,
	          O,
	          j,
	          k = "undefined" != typeof window ? window : t,
	          M = k.requestAnimationFrame || k.webkitRequestAnimationFrame || k.oRequestAnimationFrame || k.msRequestAnimationFrame || k.mozCancelRequestAnimationFrame && k.mozRequestAnimationFrame || setTimeout,
	          P = function () {},
	          T = null,
	          x = null,
	          A = i()({}, u),
	          E = function (t, n, e, r, i, u, o) {
	        for (l in f = t < u ? 0 : (t - u) / i, n) h = o[l], p = h.call ? h : A[h], d = e[l], n[l] = d + (r[l] - d) * p(f);

	        return n;
	      },
	          F = function (t, n) {
	        _ = t._duration, v = t._timestamp, b = t._currentState, w = t._targetState, S = t._delay, m = _ - ((y = v + S + _) - (g = n > y ? y : n)), g >= y ? (t._render(w, t._data, m), t.stop(!0)) : (t._applyFilter("beforeTween"), g < v + S ? v = _ = g = 1 : v += S, E(g, b, t._originalState, w, _, v, t._easing), t._applyFilter("afterTween"), t._render(b, t._data, m));
	      },
	          I = function (t, n, e) {
	        return function () {
	          for (t = Q.now(), n = T; n;) e = n._next, F(n, t), n = e;
	        }();
	      },
	          C = function t() {
	        T && (M.call(k, t, 1e3 / 60), I());
	      },
	          q = function (t) {
	        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "linear",
	            e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
	            r = s(n);
	        if ("string" === r || "function" === r) for (var i in t) e[i] = n;else for (var u in t) e[u] = n[u] || "linear";
	        return e;
	      },
	          D = function (t) {
	        t === T ? (T = t._next) ? T._previous = null : x = null : t === x ? (x = t._previous) ? x._next = null : T = null : (O = t._previous, j = t._next, O._next = j, j._previous = O), t._previous = t._next = null;
	      },
	          Q = function () {
	        function t() {
	          var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	              e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : void 0;
	          o(this, t), c(this, "_config", {}), c(this, "_data", {}), c(this, "_filters", []), c(this, "_next", null), c(this, "_previous", null), c(this, "_timestamp", null), c(this, "_resolve", null), c(this, "_reject", null), c(this, "_currentState", {}), c(this, "_originalState", {}), c(this, "_targetState", {}), c(this, "_start", P), c(this, "_render", P), this._currentState = n || this._currentState, e && this.setConfig(e);
	        }

	        var n, e;
	        return n = t, (e = [{
	          key: "_applyFilter",
	          value: function (t) {
	            for (var n = this._filters.length; n > 0; n--) {
	              var e = this._filters[n - n][t];
	              e && e(this);
	            }
	          }
	        }, {
	          key: "tween",
	          value: function () {
	            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
	            return this._isPlaying && this.stop(), !n && this._config || this.setConfig(n), this._pausedAtTime = null, this._timestamp = t.now(), this._start(this.get(), this._data), this._resume(this._timestamp);
	          }
	        }, {
	          key: "setConfig",
	          value: function () {
	            var n = this,
	                e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
	            i()(this._config, e);
	            var r = this._config,
	                u = r.promise,
	                o = void 0 === u ? Promise : u,
	                a = r.start,
	                c = void 0 === a ? P : a,
	                s = r.render,
	                f = void 0 === s ? this._config.step || P : s,
	                l = r.step,
	                h = void 0 === l ? P : l;

	            for (var p in this._data = this._config.data || this._config.attachment || this._data, this._isPlaying = !1, this._pausedAtTime = null, this._scheduleId = null, this._delay = e.delay || 0, this._start = c, this._render = f || h, this._duration = this._config.duration || 500, i()(this._currentState, e.from), i()(this._originalState, this._currentState), i()(this._targetState, this._currentState, e.to), this._easing = q(this._currentState, this._config.easing, this._easing), this._filters.length = 0, t.filters) t.filters[p].doesApply(this) && this._filters.push(t.filters[p]);

	            return this._applyFilter("tweenCreated"), this._promise = new o(function (t, e) {
	              n._resolve = t, n._reject = e;
	            }), this;
	          }
	        }, {
	          key: "get",
	          value: function () {
	            return i()({}, this._currentState);
	          }
	        }, {
	          key: "set",
	          value: function (t) {
	            this._currentState = t;
	          }
	        }, {
	          key: "pause",
	          value: function () {
	            if (this._isPlaying) return this._pausedAtTime = t.now(), this._isPlaying = !1, D(this), this;
	          }
	        }, {
	          key: "resume",
	          value: function () {
	            return this._resume();
	          }
	        }, {
	          key: "_resume",
	          value: function () {
	            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : t.now();
	            return null === this._timestamp ? this.tween() : (this._isPlaying || (this._pausedAtTime && (this._timestamp += n - this._pausedAtTime, this._pausedAtTime = null), this._isPlaying = !0, null === T ? (T = this, x = this, C()) : (this._previous = x, x._next = this, x = this)), this._promise);
	          }
	        }, {
	          key: "seek",
	          value: function (n) {
	            n = Math.max(n, 0);
	            var e = t.now();
	            return this._timestamp + n === 0 || (this._timestamp = e - n, this._isPlaying || F(this, e)), this;
	          }
	        }, {
	          key: "stop",
	          value: function () {
	            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
	            return this._isPlaying ? (this._isPlaying = !1, D(this), t && (this._applyFilter("beforeTween"), E(1, this._currentState, this._originalState, this._targetState, 1, 0, this._easing), this._applyFilter("afterTween"), this._applyFilter("afterTweenEnd")), this._resolve && this._resolve({
	              data: this._data,
	              state: this._currentState,
	              tweenable: this
	            }), this._resolve = null, this._reject = null, i()(this._targetState, this._currentState), i()(this._originalState, this._targetState), this) : this;
	          }
	        }, {
	          key: "cancel",
	          value: function () {
	            var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
	                n = this._currentState,
	                e = this._data,
	                r = this._isPlaying;
	            return r ? (this._reject({
	              data: e,
	              state: n,
	              tweenable: this
	            }), this._resolve = null, this._reject = null, this.stop(t)) : this;
	          }
	        }, {
	          key: "isPlaying",
	          value: function () {
	            return this._isPlaying;
	          }
	        }, {
	          key: "setScheduleFunction",
	          value: function (n) {
	            t.setScheduleFunction(n);
	          }
	        }, {
	          key: "data",
	          value: function () {
	            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
	            return t && (this._data = i()({}, t)), this._data;
	          }
	        }, {
	          key: "dispose",
	          value: function () {
	            for (var t in this) delete this[t];
	          }
	        }]) && a(n.prototype, e), t;
	      }();

	      function N() {
	        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	            n = new Q(),
	            e = n.tween(t);
	        return e.tweenable = n, e;
	      }

	      Q.setScheduleFunction = function (t) {
	        return M = t;
	      }, Q.formulas = A, Q.filters = {}, Q.now = Date.now || function () {
	        return +new Date();
	      };
	    }).call(this, e(3));
	  }, function (t, n, e) {
	    /*
	    object-assign
	    (c) Sindre Sorhus
	    @license MIT
	    */

	    var r = Object.getOwnPropertySymbols,
	        i = Object.prototype.hasOwnProperty,
	        u = Object.prototype.propertyIsEnumerable;

	    function o(t) {
	      if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined");
	      return Object(t);
	    }

	    t.exports = function () {
	      try {
	        if (!Object.assign) return !1;
	        var t = new String("abc");
	        if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;

	        for (var n = {}, e = 0; e < 10; e++) n["_" + String.fromCharCode(e)] = e;

	        if ("0123456789" !== Object.getOwnPropertyNames(n).map(function (t) {
	          return n[t];
	        }).join("")) return !1;
	        var r = {};
	        return "abcdefghijklmnopqrst".split("").forEach(function (t) {
	          r[t] = t;
	        }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, r)).join("");
	      } catch (t) {
	        return !1;
	      }
	    }() ? Object.assign : function (t, n) {
	      for (var e, a, c = o(t), s = 1; s < arguments.length; s++) {
	        for (var f in e = Object(arguments[s])) i.call(e, f) && (c[f] = e[f]);

	        if (r) {
	          a = r(e);

	          for (var l = 0; l < a.length; l++) u.call(e, a[l]) && (c[a[l]] = e[a[l]]);
	        }
	      }

	      return c;
	    };
	  }, function (t, n, e) {

	    e.r(n), e.d(n, "linear", function () {
	      return r;
	    }), e.d(n, "easeInQuad", function () {
	      return i;
	    }), e.d(n, "easeOutQuad", function () {
	      return u;
	    }), e.d(n, "easeInOutQuad", function () {
	      return o;
	    }), e.d(n, "easeInCubic", function () {
	      return a;
	    }), e.d(n, "easeOutCubic", function () {
	      return c;
	    }), e.d(n, "easeInOutCubic", function () {
	      return s;
	    }), e.d(n, "easeInQuart", function () {
	      return f;
	    }), e.d(n, "easeOutQuart", function () {
	      return l;
	    }), e.d(n, "easeInOutQuart", function () {
	      return h;
	    }), e.d(n, "easeInQuint", function () {
	      return p;
	    }), e.d(n, "easeOutQuint", function () {
	      return d;
	    }), e.d(n, "easeInOutQuint", function () {
	      return _;
	    }), e.d(n, "easeInSine", function () {
	      return v;
	    }), e.d(n, "easeOutSine", function () {
	      return y;
	    }), e.d(n, "easeInOutSine", function () {
	      return g;
	    }), e.d(n, "easeInExpo", function () {
	      return m;
	    }), e.d(n, "easeOutExpo", function () {
	      return b;
	    }), e.d(n, "easeInOutExpo", function () {
	      return w;
	    }), e.d(n, "easeInCirc", function () {
	      return S;
	    }), e.d(n, "easeOutCirc", function () {
	      return O;
	    }), e.d(n, "easeInOutCirc", function () {
	      return j;
	    }), e.d(n, "easeOutBounce", function () {
	      return k;
	    }), e.d(n, "easeInBack", function () {
	      return M;
	    }), e.d(n, "easeOutBack", function () {
	      return P;
	    }), e.d(n, "easeInOutBack", function () {
	      return T;
	    }), e.d(n, "elastic", function () {
	      return x;
	    }), e.d(n, "swingFromTo", function () {
	      return A;
	    }), e.d(n, "swingFrom", function () {
	      return E;
	    }), e.d(n, "swingTo", function () {
	      return F;
	    }), e.d(n, "bounce", function () {
	      return I;
	    }), e.d(n, "bouncePast", function () {
	      return C;
	    }), e.d(n, "easeFromTo", function () {
	      return q;
	    }), e.d(n, "easeFrom", function () {
	      return D;
	    }), e.d(n, "easeTo", function () {
	      return Q;
	    });
	    /*!
	     * All equations are adapted from Thomas Fuchs'
	     * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
	     *
	     * Based on Easing Equations (c) 2003 [Robert
	     * Penner](http://www.robertpenner.com/), all rights reserved. This work is
	     * [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
	     */

	    /*!
	     *  TERMS OF USE - EASING EQUATIONS
	     *  Open source under the BSD License.
	     *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
	     */

	    var r = function (t) {
	      return t;
	    },
	        i = function (t) {
	      return Math.pow(t, 2);
	    },
	        u = function (t) {
	      return -(Math.pow(t - 1, 2) - 1);
	    },
	        o = function (t) {
	      return (t /= .5) < 1 ? .5 * Math.pow(t, 2) : -.5 * ((t -= 2) * t - 2);
	    },
	        a = function (t) {
	      return Math.pow(t, 3);
	    },
	        c = function (t) {
	      return Math.pow(t - 1, 3) + 1;
	    },
	        s = function (t) {
	      return (t /= .5) < 1 ? .5 * Math.pow(t, 3) : .5 * (Math.pow(t - 2, 3) + 2);
	    },
	        f = function (t) {
	      return Math.pow(t, 4);
	    },
	        l = function (t) {
	      return -(Math.pow(t - 1, 4) - 1);
	    },
	        h = function (t) {
	      return (t /= .5) < 1 ? .5 * Math.pow(t, 4) : -.5 * ((t -= 2) * Math.pow(t, 3) - 2);
	    },
	        p = function (t) {
	      return Math.pow(t, 5);
	    },
	        d = function (t) {
	      return Math.pow(t - 1, 5) + 1;
	    },
	        _ = function (t) {
	      return (t /= .5) < 1 ? .5 * Math.pow(t, 5) : .5 * (Math.pow(t - 2, 5) + 2);
	    },
	        v = function (t) {
	      return 1 - Math.cos(t * (Math.PI / 2));
	    },
	        y = function (t) {
	      return Math.sin(t * (Math.PI / 2));
	    },
	        g = function (t) {
	      return -.5 * (Math.cos(Math.PI * t) - 1);
	    },
	        m = function (t) {
	      return 0 === t ? 0 : Math.pow(2, 10 * (t - 1));
	    },
	        b = function (t) {
	      return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
	    },
	        w = function (t) {
	      return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t));
	    },
	        S = function (t) {
	      return -(Math.sqrt(1 - t * t) - 1);
	    },
	        O = function (t) {
	      return Math.sqrt(1 - Math.pow(t - 1, 2));
	    },
	        j = function (t) {
	      return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
	    },
	        k = function (t) {
	      return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
	    },
	        M = function (t) {
	      var n = 1.70158;
	      return t * t * ((n + 1) * t - n);
	    },
	        P = function (t) {
	      var n = 1.70158;
	      return (t -= 1) * t * ((n + 1) * t + n) + 1;
	    },
	        T = function (t) {
	      var n = 1.70158;
	      return (t /= .5) < 1 ? t * t * ((1 + (n *= 1.525)) * t - n) * .5 : .5 * ((t -= 2) * t * ((1 + (n *= 1.525)) * t + n) + 2);
	    },
	        x = function (t) {
	      return -1 * Math.pow(4, -8 * t) * Math.sin((6 * t - 1) * (2 * Math.PI) / 2) + 1;
	    },
	        A = function (t) {
	      var n = 1.70158;
	      return (t /= .5) < 1 ? t * t * ((1 + (n *= 1.525)) * t - n) * .5 : .5 * ((t -= 2) * t * ((1 + (n *= 1.525)) * t + n) + 2);
	    },
	        E = function (t) {
	      var n = 1.70158;
	      return t * t * ((n + 1) * t - n);
	    },
	        F = function (t) {
	      var n = 1.70158;
	      return (t -= 1) * t * ((n + 1) * t + n) + 1;
	    },
	        I = function (t) {
	      return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
	    },
	        C = function (t) {
	      return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 2 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 2 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 2 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375);
	    },
	        q = function (t) {
	      return (t /= .5) < 1 ? .5 * Math.pow(t, 4) : -.5 * ((t -= 2) * Math.pow(t, 3) - 2);
	    },
	        D = function (t) {
	      return Math.pow(t, 4);
	    },
	        Q = function (t) {
	      return Math.pow(t, .25);
	    };
	  }, function (t, n) {
	    var e;

	    e = function () {
	      return this;
	    }();

	    try {
	      e = e || new Function("return this")();
	    } catch (t) {
	      "object" == typeof window && (e = window);
	    }

	    t.exports = e;
	  }, function (t, n, e) {

	    e.r(n), e.d(n, "processTweens", function () {
	      return o.c;
	    }), e.d(n, "Tweenable", function () {
	      return o.a;
	    }), e.d(n, "tween", function () {
	      return o.d;
	    }), e.d(n, "interpolate", function () {
	      return F;
	    }), e.d(n, "Scene", function () {
	      return B;
	    }), e.d(n, "setBezierFunction", function () {
	      return z;
	    }), e.d(n, "unsetBezierFunction", function () {
	      return L;
	    });
	    var r = {};
	    e.r(r), e.d(r, "doesApply", function () {
	      return O;
	    }), e.d(r, "tweenCreated", function () {
	      return j;
	    }), e.d(r, "beforeTween", function () {
	      return k;
	    }), e.d(r, "afterTween", function () {
	      return M;
	    });

	    var i,
	        u,
	        o = e(0),
	        a = /(\d|-|\.)/,
	        c = /([^\-0-9.]+)/g,
	        s = /[0-9.-]+/g,
	        f = (i = s.source, u = /,\s*/.source, new RegExp("rgb\\(".concat(i).concat(u).concat(i).concat(u).concat(i, "\\)"), "g")),
	        l = /^.*\(/,
	        h = /#([0-9]|[a-f]){3,6}/gi,
	        p = function (t, n) {
	      return t.map(function (t, e) {
	        return "_".concat(n, "_").concat(e);
	      });
	    };

	    function d(t) {
	      return parseInt(t, 16);
	    }

	    var _ = function (t) {
	      return "rgb(".concat((n = t, 3 === (n = n.replace(/#/, "")).length && (n = (n = n.split(""))[0] + n[0] + n[1] + n[1] + n[2] + n[2]), [d(n.substr(0, 2)), d(n.substr(2, 2)), d(n.substr(4, 2))]).join(","), ")");
	      var n;
	    },
	        v = function (t, n, e) {
	      var r = n.match(t),
	          i = n.replace(t, "VAL");
	      return r && r.forEach(function (t) {
	        return i = i.replace("VAL", e(t));
	      }), i;
	    },
	        y = function (t) {
	      for (var n in t) {
	        var e = t[n];
	        "string" == typeof e && e.match(h) && (t[n] = v(h, e, _));
	      }
	    },
	        g = function (t) {
	      var n = t.match(s).map(Math.floor),
	          e = t.match(l)[0];
	      return "".concat(e).concat(n.join(","), ")");
	    },
	        m = function (t) {
	      return t.match(s);
	    },
	        b = function (t, n) {
	      var e = {};
	      return n.forEach(function (n) {
	        e[n] = t[n], delete t[n];
	      }), e;
	    },
	        w = function (t, n) {
	      return n.map(function (n) {
	        return t[n];
	      });
	    },
	        S = function (t, n) {
	      return n.forEach(function (n) {
	        return t = t.replace("VAL", +n.toFixed(4));
	      }), t;
	    },
	        O = function (t) {
	      for (var n in t._currentState) if ("string" == typeof t._currentState[n]) return !0;

	      return !1;
	    };

	    function j(t) {
	      var n = t._currentState;
	      [n, t._originalState, t._targetState].forEach(y), t._tokenData = function (t) {
	        var n,
	            e,
	            r = {};

	        for (var i in t) {
	          var u = t[i];
	          "string" == typeof u && (r[i] = {
	            formatString: (n = u, e = void 0, e = n.match(c), e ? (1 === e.length || n.charAt(0).match(a)) && e.unshift("") : e = ["", ""], e.join("VAL")),
	            chunkNames: p(m(u), i)
	          });
	        }

	        return r;
	      }(n);
	    }

	    function k(t) {
	      var n = t._currentState,
	          e = t._originalState,
	          r = t._targetState,
	          i = t._easing,
	          u = t._tokenData;
	      !function (t, n) {
	        var e = function (e) {
	          var r = n[e].chunkNames,
	              i = t[e];

	          if ("string" == typeof i) {
	            var u = i.split(" "),
	                o = u[u.length - 1];
	            r.forEach(function (n, e) {
	              return t[n] = u[e] || o;
	            });
	          } else r.forEach(function (n) {
	            return t[n] = i;
	          });

	          delete t[e];
	        };

	        for (var r in n) e(r);
	      }(i, u), [n, e, r].forEach(function (t) {
	        return function (t, n) {
	          var e = function (e) {
	            m(t[e]).forEach(function (r, i) {
	              return t[n[e].chunkNames[i]] = +r;
	            }), delete t[e];
	          };

	          for (var r in n) e(r);
	        }(t, u);
	      });
	    }

	    function M(t) {
	      var n = t._currentState,
	          e = t._originalState,
	          r = t._targetState,
	          i = t._easing,
	          u = t._tokenData;
	      [n, e, r].forEach(function (t) {
	        return function (t, n) {
	          for (var e in n) {
	            var r = n[e],
	                i = r.chunkNames,
	                u = r.formatString,
	                o = S(u, w(b(t, i), i));
	            t[e] = v(f, o, g);
	          }
	        }(t, u);
	      }), function (t, n) {
	        for (var e in n) {
	          var r = n[e].chunkNames,
	              i = t[r[0]];
	          t[e] = "string" == typeof i ? r.map(function (n) {
	            var e = t[n];
	            return delete t[n], e;
	          }).join(" ") : i;
	        }
	      }(i, u);
	    }

	    function P(t, n) {
	      var e = Object.keys(t);

	      if (Object.getOwnPropertySymbols) {
	        var r = Object.getOwnPropertySymbols(t);
	        n && (r = r.filter(function (n) {
	          return Object.getOwnPropertyDescriptor(t, n).enumerable;
	        })), e.push.apply(e, r);
	      }

	      return e;
	    }

	    function T(t) {
	      for (var n = 1; n < arguments.length; n++) {
	        var e = null != arguments[n] ? arguments[n] : {};
	        n % 2 ? P(Object(e), !0).forEach(function (n) {
	          x(t, n, e[n]);
	        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : P(Object(e)).forEach(function (n) {
	          Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
	        });
	      }

	      return t;
	    }

	    function x(t, n, e) {
	      return n in t ? Object.defineProperty(t, n, {
	        value: e,
	        enumerable: !0,
	        configurable: !0,
	        writable: !0
	      }) : t[n] = e, t;
	    }

	    var A = new o.a(),
	        E = o.a.filters,
	        F = function (t, n, e, r) {
	      var i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
	          u = T({}, t),
	          a = Object(o.b)(t, r);

	      for (var c in A._filters.length = 0, A.set({}), A._currentState = u, A._originalState = t, A._targetState = n, A._easing = a, E) E[c].doesApply(A) && A._filters.push(E[c]);

	      A._applyFilter("tweenCreated"), A._applyFilter("beforeTween");
	      var s = Object(o.e)(e, u, t, n, 1, i, a);
	      return A._applyFilter("afterTween"), s;
	    };

	    function I(t) {
	      return function (t) {
	        if (Array.isArray(t)) return C(t);
	      }(t) || function (t) {
	        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
	      }(t) || function (t, n) {
	        if (!t) return;
	        if ("string" == typeof t) return C(t, n);
	        var e = Object.prototype.toString.call(t).slice(8, -1);
	        "Object" === e && t.constructor && (e = t.constructor.name);
	        if ("Map" === e || "Set" === e) return Array.from(t);
	        if ("Arguments" === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)) return C(t, n);
	      }(t) || function () {
	        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	      }();
	    }

	    function C(t, n) {
	      (null == n || n > t.length) && (n = t.length);

	      for (var e = 0, r = new Array(n); e < n; e++) r[e] = t[e];

	      return r;
	    }

	    function q(t, n) {
	      if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
	    }

	    function D(t, n) {
	      for (var e = 0; e < n.length; e++) {
	        var r = n[e];
	        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
	      }
	    }

	    function Q(t, n) {
	      var e = n.get(t);
	      if (!e) throw new TypeError("attempted to get private field on non-instance");
	      return e.get ? e.get.call(t) : e.value;
	    }

	    var N = new WeakMap(),
	        B = function () {
	      function t() {
	        q(this, t), N.set(this, {
	          writable: !0,
	          value: []
	        });

	        for (var n = arguments.length, e = new Array(n), r = 0; r < n; r++) e[r] = arguments[r];

	        e.forEach(this.add.bind(this));
	      }

	      var n, e;
	      return n = t, (e = [{
	        key: "add",
	        value: function (t) {
	          return Q(this, N).push(t), t;
	        }
	      }, {
	        key: "remove",
	        value: function (t) {
	          var n = Q(this, N).indexOf(t);
	          return ~n && Q(this, N).splice(n, 1), t;
	        }
	      }, {
	        key: "empty",
	        value: function () {
	          return this.tweenables.map(this.remove.bind(this));
	        }
	      }, {
	        key: "isPlaying",
	        value: function () {
	          return Q(this, N).some(function (t) {
	            return t.isPlaying();
	          });
	        }
	      }, {
	        key: "play",
	        value: function () {
	          return Q(this, N).forEach(function (t) {
	            return t.tween();
	          }), this;
	        }
	      }, {
	        key: "pause",
	        value: function () {
	          return Q(this, N).forEach(function (t) {
	            return t.pause();
	          }), this;
	        }
	      }, {
	        key: "resume",
	        value: function () {
	          return Q(this, N).forEach(function (t) {
	            return t.resume();
	          }), this;
	        }
	      }, {
	        key: "stop",
	        value: function (t) {
	          return Q(this, N).forEach(function (n) {
	            return n.stop(t);
	          }), this;
	        }
	      }, {
	        key: "tweenables",
	        get: function () {
	          return I(Q(this, N));
	        }
	      }, {
	        key: "promises",
	        get: function () {
	          return Q(this, N).map(function (t) {
	            return t._promise;
	          });
	        }
	      }]) && D(n.prototype, e), t;
	    }();

	    function R(t, n, e, r, i, u) {
	      var o,
	          a,
	          c = 0,
	          s = 0,
	          f = 0,
	          l = 0,
	          h = 0,
	          p = 0,
	          d = function (t) {
	        return ((c * t + s) * t + f) * t;
	      },
	          _ = function (t) {
	        return (3 * c * t + 2 * s) * t + f;
	      },
	          v = function (t) {
	        return t >= 0 ? t : 0 - t;
	      };

	      return c = 1 - (f = 3 * n) - (s = 3 * (r - n) - f), l = 1 - (p = 3 * e) - (h = 3 * (i - e) - p), o = t, a = function (t) {
	        return 1 / (200 * t);
	      }(u), function (t) {
	        return ((l * t + h) * t + p) * t;
	      }(function (t, n) {
	        var e, r, i, u, o, a;

	        for (i = t, a = 0; a < 8; a++) {
	          if (u = d(i) - t, v(u) < n) return i;
	          if (o = _(i), v(o) < 1e-6) break;
	          i -= u / o;
	        }

	        if ((i = t) < (e = 0)) return e;
	        if (i > (r = 1)) return r;

	        for (; e < r;) {
	          if (u = d(i), v(u - t) < n) return i;
	          t > u ? e = i : r = i, i = .5 * (r - e) + e;
	        }

	        return i;
	      }(o, a));
	    }

	    var z = function (t, n, e, r, i) {
	      var u = function (t, n, e, r) {
	        return function (i) {
	          return R(i, t, n, e, r, 1);
	        };
	      }(n, e, r, i);

	      return u.displayName = t, u.x1 = n, u.y1 = e, u.x2 = r, u.y2 = i, o.a.formulas[t] = u;
	    },
	        L = function (t) {
	      return delete o.a.formulas[t];
	    };

	    o.a.filters.token = r;
	  }]);
	});
	});

	// Utility functions
	var PREFIXES = 'Webkit Moz O ms'.split(' ');
	var FLOAT_COMPARISON_EPSILON = 0.001; // Copy all attributes from source object to destination object.
	// destination object is mutated.

	function extend(destination, source, recursive) {
	  destination = destination || {};
	  source = source || {};
	  recursive = recursive || false;

	  for (var attrName in source) {
	    if (source.hasOwnProperty(attrName)) {
	      var destVal = destination[attrName];
	      var sourceVal = source[attrName];

	      if (recursive && isObject(destVal) && isObject(sourceVal)) {
	        destination[attrName] = extend(destVal, sourceVal, recursive);
	      } else {
	        destination[attrName] = sourceVal;
	      }
	    }
	  }

	  return destination;
	} // Renders templates with given variables. Variables must be surrounded with
	// braces without any spaces, e.g. {variable}
	// All instances of variable placeholders will be replaced with given content
	// Example:
	// render('Hello, {message}!', {message: 'world'})


	function render(template, vars) {
	  var rendered = template;

	  for (var key in vars) {
	    if (vars.hasOwnProperty(key)) {
	      var val = vars[key];
	      var regExpString = '\\{' + key + '\\}';
	      var regExp = new RegExp(regExpString, 'g');
	      rendered = rendered.replace(regExp, val);
	    }
	  }

	  return rendered;
	}

	function setStyle(element, style, value) {
	  var elStyle = element.style; // cache for performance

	  for (var i = 0; i < PREFIXES.length; ++i) {
	    var prefix = PREFIXES[i];
	    elStyle[prefix + capitalize(style)] = value;
	  }

	  elStyle[style] = value;
	}

	function setStyles(element, styles) {
	  forEachObject(styles, function (styleValue, styleName) {
	    // Allow disabling some individual styles by setting them
	    // to null or undefined
	    if (styleValue === null || styleValue === undefined) {
	      return;
	    } // If style's value is {prefix: true, value: '50%'},
	    // Set also browser prefixed styles


	    if (isObject(styleValue) && styleValue.prefix === true) {
	      setStyle(element, styleName, styleValue.value);
	    } else {
	      element.style[styleName] = styleValue;
	    }
	  });
	}

	function capitalize(text) {
	  return text.charAt(0).toUpperCase() + text.slice(1);
	}

	function isString(obj) {
	  return typeof obj === 'string' || obj instanceof String;
	}

	function isFunction(obj) {
	  return typeof obj === 'function';
	}

	function isArray(obj) {
	  return Object.prototype.toString.call(obj) === '[object Array]';
	} // Returns true if `obj` is object as in {a: 1, b: 2}, not if it's function or
	// array


	function isObject(obj) {
	  if (isArray(obj)) {
	    return false;
	  }

	  var type = typeof obj;
	  return type === 'object' && !!obj;
	}

	function forEachObject(object, callback) {
	  for (var key in object) {
	    if (object.hasOwnProperty(key)) {
	      var val = object[key];
	      callback(val, key);
	    }
	  }
	}

	function floatEquals(a, b) {
	  return Math.abs(a - b) < FLOAT_COMPARISON_EPSILON;
	} // https://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements


	function removeChildren(el) {
	  while (el.firstChild) {
	    el.removeChild(el.firstChild);
	  }
	}

	var utils = {
	  extend: extend,
	  render: render,
	  setStyle: setStyle,
	  setStyles: setStyles,
	  capitalize: capitalize,
	  isString: isString,
	  isFunction: isFunction,
	  isObject: isObject,
	  forEachObject: forEachObject,
	  floatEquals: floatEquals,
	  removeChildren: removeChildren
	};

	// Lower level API to animate any kind of svg path




	var Tweenable = shifty.Tweenable;
	var EASING_ALIASES = {
	  easeIn: 'easeInCubic',
	  easeOut: 'easeOutCubic',
	  easeInOut: 'easeInOutCubic'
	};

	var Path = function Path(path, opts) {
	  // Throw a better error if not initialized with `new` keyword
	  if (!(this instanceof Path)) {
	    throw new Error('Constructor was called without new keyword');
	  } // Default parameters for animation


	  opts = utils.extend({
	    delay: 0,
	    duration: 800,
	    easing: 'linear',
	    from: {},
	    to: {},
	    step: function () {}
	  }, opts);
	  var element;

	  if (utils.isString(path)) {
	    element = document.querySelector(path);
	  } else {
	    element = path;
	  } // Reveal .path as public attribute


	  this.path = element;
	  this._opts = opts;
	  this._tweenable = null; // Set up the starting positions

	  var length = this.path.getTotalLength();
	  this.path.style.strokeDasharray = length + ' ' + length;
	  this.set(0);
	};

	Path.prototype.value = function value() {
	  var offset = this._getComputedDashOffset();

	  var length = this.path.getTotalLength();
	  var progress = 1 - offset / length; // Round number to prevent returning very small number like 1e-30, which
	  // is practically 0

	  return parseFloat(progress.toFixed(6), 10);
	};

	Path.prototype.set = function set(progress) {
	  this.stop();
	  this.path.style.strokeDashoffset = this._progressToOffset(progress);
	  var step = this._opts.step;

	  if (utils.isFunction(step)) {
	    var easing = this._easing(this._opts.easing);

	    var values = this._calculateTo(progress, easing);

	    var reference = this._opts.shape || this;
	    step(values, reference, this._opts.attachment);
	  }
	};

	Path.prototype.stop = function stop() {
	  this._stopTween();

	  this.path.style.strokeDashoffset = this._getComputedDashOffset();
	}; // Method introduced here:
	// http://jakearchibald.com/2013/animated-line-drawing-svg/


	Path.prototype.animate = function animate(progress, opts, cb) {
	  opts = opts || {};

	  if (utils.isFunction(opts)) {
	    cb = opts;
	    opts = {};
	  }

	  var passedOpts = utils.extend({}, opts); // Copy default opts to new object so defaults are not modified

	  var defaultOpts = utils.extend({}, this._opts);
	  opts = utils.extend(defaultOpts, opts);

	  var shiftyEasing = this._easing(opts.easing);

	  var values = this._resolveFromAndTo(progress, shiftyEasing, passedOpts);

	  this.stop(); // Trigger a layout so styles are calculated & the browser
	  // picks up the starting position before animating

	  this.path.getBoundingClientRect();

	  var offset = this._getComputedDashOffset();

	  var newOffset = this._progressToOffset(progress);

	  var self = this;
	  this._tweenable = new Tweenable();

	  this._tweenable.tween({
	    from: utils.extend({
	      offset: offset
	    }, values.from),
	    to: utils.extend({
	      offset: newOffset
	    }, values.to),
	    duration: opts.duration,
	    delay: opts.delay,
	    easing: shiftyEasing,
	    step: function (state) {
	      self.path.style.strokeDashoffset = state.offset;
	      var reference = opts.shape || self;
	      opts.step(state, reference, opts.attachment);
	    }
	  }).then(function (state) {
	    if (utils.isFunction(cb)) {
	      cb();
	    }
	  });
	};

	Path.prototype._getComputedDashOffset = function _getComputedDashOffset() {
	  var computedStyle = window.getComputedStyle(this.path, null);
	  return parseFloat(computedStyle.getPropertyValue('stroke-dashoffset'), 10);
	};

	Path.prototype._progressToOffset = function _progressToOffset(progress) {
	  var length = this.path.getTotalLength();
	  return length - progress * length;
	}; // Resolves from and to values for animation.


	Path.prototype._resolveFromAndTo = function _resolveFromAndTo(progress, easing, opts) {
	  if (opts.from && opts.to) {
	    return {
	      from: opts.from,
	      to: opts.to
	    };
	  }

	  return {
	    from: this._calculateFrom(easing),
	    to: this._calculateTo(progress, easing)
	  };
	}; // Calculate `from` values from options passed at initialization


	Path.prototype._calculateFrom = function _calculateFrom(easing) {
	  return shifty.interpolate(this._opts.from, this._opts.to, this.value(), easing);
	}; // Calculate `to` values from options passed at initialization


	Path.prototype._calculateTo = function _calculateTo(progress, easing) {
	  return shifty.interpolate(this._opts.from, this._opts.to, progress, easing);
	};

	Path.prototype._stopTween = function _stopTween() {
	  if (this._tweenable !== null) {
	    this._tweenable.stop();

	    this._tweenable = null;
	  }
	};

	Path.prototype._easing = function _easing(easing) {
	  if (EASING_ALIASES.hasOwnProperty(easing)) {
	    return EASING_ALIASES[easing];
	  }

	  return easing;
	};

	var path = Path;

	// Base object for different progress bar shapes




	var DESTROYED_ERROR = 'Object is destroyed';

	var Shape = function Shape(container, opts) {
	  // Throw a better error if progress bars are not initialized with `new`
	  // keyword
	  if (!(this instanceof Shape)) {
	    throw new Error('Constructor was called without new keyword');
	  } // Prevent calling constructor without parameters so inheritance
	  // works correctly. To understand, this is how Shape is inherited:
	  //
	  //   Line.prototype = new Shape();
	  //
	  // We just want to set the prototype for Line.


	  if (arguments.length === 0) {
	    return;
	  } // Default parameters for progress bar creation


	  this._opts = utils.extend({
	    color: '#555',
	    strokeWidth: 1.0,
	    trailColor: null,
	    trailWidth: null,
	    fill: null,
	    text: {
	      style: {
	        color: null,
	        position: 'absolute',
	        left: '50%',
	        top: '50%',
	        padding: 0,
	        margin: 0,
	        transform: {
	          prefix: true,
	          value: 'translate(-50%, -50%)'
	        }
	      },
	      autoStyleContainer: true,
	      alignToBottom: true,
	      value: null,
	      className: 'progressbar-text'
	    },
	    svgStyle: {
	      display: 'block',
	      width: '100%'
	    },
	    warnings: false
	  }, opts, true); // Use recursive extend
	  // If user specifies e.g. svgStyle or text style, the whole object
	  // should replace the defaults to make working with styles easier

	  if (utils.isObject(opts) && opts.svgStyle !== undefined) {
	    this._opts.svgStyle = opts.svgStyle;
	  }

	  if (utils.isObject(opts) && utils.isObject(opts.text) && opts.text.style !== undefined) {
	    this._opts.text.style = opts.text.style;
	  }

	  var svgView = this._createSvgView(this._opts);

	  var element;

	  if (utils.isString(container)) {
	    element = document.querySelector(container);
	  } else {
	    element = container;
	  }

	  if (!element) {
	    throw new Error('Container does not exist: ' + container);
	  }

	  this._container = element;

	  this._container.appendChild(svgView.svg);

	  if (this._opts.warnings) {
	    this._warnContainerAspectRatio(this._container);
	  }

	  if (this._opts.svgStyle) {
	    utils.setStyles(svgView.svg, this._opts.svgStyle);
	  } // Expose public attributes before Path initialization


	  this.svg = svgView.svg;
	  this.path = svgView.path;
	  this.trail = svgView.trail;
	  this.text = null;
	  var newOpts = utils.extend({
	    attachment: undefined,
	    shape: this
	  }, this._opts);
	  this._progressPath = new path(svgView.path, newOpts);

	  if (utils.isObject(this._opts.text) && this._opts.text.value !== null) {
	    this.setText(this._opts.text.value);
	  }
	};

	Shape.prototype.animate = function animate(progress, opts, cb) {
	  if (this._progressPath === null) {
	    throw new Error(DESTROYED_ERROR);
	  }

	  this._progressPath.animate(progress, opts, cb);
	};

	Shape.prototype.stop = function stop() {
	  if (this._progressPath === null) {
	    throw new Error(DESTROYED_ERROR);
	  } // Don't crash if stop is called inside step function


	  if (this._progressPath === undefined) {
	    return;
	  }

	  this._progressPath.stop();
	};

	Shape.prototype.pause = function pause() {
	  if (this._progressPath === null) {
	    throw new Error(DESTROYED_ERROR);
	  }

	  if (this._progressPath === undefined) {
	    return;
	  }

	  if (!this._progressPath._tweenable) {
	    // It seems that we can't pause this
	    return;
	  }

	  this._progressPath._tweenable.pause();
	};

	Shape.prototype.resume = function resume() {
	  if (this._progressPath === null) {
	    throw new Error(DESTROYED_ERROR);
	  }

	  if (this._progressPath === undefined) {
	    return;
	  }

	  if (!this._progressPath._tweenable) {
	    // It seems that we can't resume this
	    return;
	  }

	  this._progressPath._tweenable.resume();
	};

	Shape.prototype.destroy = function destroy() {
	  if (this._progressPath === null) {
	    throw new Error(DESTROYED_ERROR);
	  }

	  this.stop();
	  this.svg.parentNode.removeChild(this.svg);
	  this.svg = null;
	  this.path = null;
	  this.trail = null;
	  this._progressPath = null;

	  if (this.text !== null) {
	    this.text.parentNode.removeChild(this.text);
	    this.text = null;
	  }
	};

	Shape.prototype.set = function set(progress) {
	  if (this._progressPath === null) {
	    throw new Error(DESTROYED_ERROR);
	  }

	  this._progressPath.set(progress);
	};

	Shape.prototype.value = function value() {
	  if (this._progressPath === null) {
	    throw new Error(DESTROYED_ERROR);
	  }

	  if (this._progressPath === undefined) {
	    return 0;
	  }

	  return this._progressPath.value();
	};

	Shape.prototype.setText = function setText(newText) {
	  if (this._progressPath === null) {
	    throw new Error(DESTROYED_ERROR);
	  }

	  if (this.text === null) {
	    // Create new text node
	    this.text = this._createTextContainer(this._opts, this._container);

	    this._container.appendChild(this.text);
	  } // Remove previous text and add new


	  if (utils.isObject(newText)) {
	    utils.removeChildren(this.text);
	    this.text.appendChild(newText);
	  } else {
	    this.text.innerHTML = newText;
	  }
	};

	Shape.prototype._createSvgView = function _createSvgView(opts) {
	  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

	  this._initializeSvg(svg, opts);

	  var trailPath = null; // Each option listed in the if condition are 'triggers' for creating
	  // the trail path

	  if (opts.trailColor || opts.trailWidth) {
	    trailPath = this._createTrail(opts);
	    svg.appendChild(trailPath);
	  }

	  var path = this._createPath(opts);

	  svg.appendChild(path);
	  return {
	    svg: svg,
	    path: path,
	    trail: trailPath
	  };
	};

	Shape.prototype._initializeSvg = function _initializeSvg(svg, opts) {
	  svg.setAttribute('viewBox', '0 0 100 100');
	};

	Shape.prototype._createPath = function _createPath(opts) {
	  var pathString = this._pathString(opts);

	  return this._createPathElement(pathString, opts);
	};

	Shape.prototype._createTrail = function _createTrail(opts) {
	  // Create path string with original passed options
	  var pathString = this._trailString(opts); // Prevent modifying original


	  var newOpts = utils.extend({}, opts); // Defaults for parameters which modify trail path

	  if (!newOpts.trailColor) {
	    newOpts.trailColor = '#eee';
	  }

	  if (!newOpts.trailWidth) {
	    newOpts.trailWidth = newOpts.strokeWidth;
	  }

	  newOpts.color = newOpts.trailColor;
	  newOpts.strokeWidth = newOpts.trailWidth; // When trail path is set, fill must be set for it instead of the
	  // actual path to prevent trail stroke from clipping

	  newOpts.fill = null;
	  return this._createPathElement(pathString, newOpts);
	};

	Shape.prototype._createPathElement = function _createPathElement(pathString, opts) {
	  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
	  path.setAttribute('d', pathString);
	  path.setAttribute('stroke', opts.color);
	  path.setAttribute('stroke-width', opts.strokeWidth);

	  if (opts.fill) {
	    path.setAttribute('fill', opts.fill);
	  } else {
	    path.setAttribute('fill-opacity', '0');
	  }

	  return path;
	};

	Shape.prototype._createTextContainer = function _createTextContainer(opts, container) {
	  var textContainer = document.createElement('div');
	  textContainer.className = opts.text.className;
	  var textStyle = opts.text.style;

	  if (textStyle) {
	    if (opts.text.autoStyleContainer) {
	      container.style.position = 'relative';
	    }

	    utils.setStyles(textContainer, textStyle); // Default text color to progress bar's color

	    if (!textStyle.color) {
	      textContainer.style.color = opts.color;
	    }
	  }

	  this._initializeTextContainer(opts, container, textContainer);

	  return textContainer;
	}; // Give custom shapes possibility to modify text element


	Shape.prototype._initializeTextContainer = function (opts, container, element) {// By default, no-op
	  // Custom shapes should respect API options, such as text.style
	};

	Shape.prototype._pathString = function _pathString(opts) {
	  throw new Error('Override this function for each progress bar');
	};

	Shape.prototype._trailString = function _trailString(opts) {
	  throw new Error('Override this function for each progress bar');
	};

	Shape.prototype._warnContainerAspectRatio = function _warnContainerAspectRatio(container) {
	  if (!this.containerAspectRatio) {
	    return;
	  }

	  var computedStyle = window.getComputedStyle(container, null);
	  var width = parseFloat(computedStyle.getPropertyValue('width'), 10);
	  var height = parseFloat(computedStyle.getPropertyValue('height'), 10);

	  if (!utils.floatEquals(this.containerAspectRatio, width / height)) {
	    console.warn('Incorrect aspect ratio of container', '#' + container.id, 'detected:', computedStyle.getPropertyValue('width') + '(width)', '/', computedStyle.getPropertyValue('height') + '(height)', '=', width / height);
	    console.warn('Aspect ratio of should be', this.containerAspectRatio);
	  }
	};

	var shape = Shape;

	// Line shaped progress bar




	var Line = function Line(container, options) {
	  this._pathTemplate = 'M 0,{center} L 100,{center}';
	  shape.apply(this, arguments);
	};

	Line.prototype = new shape();
	Line.prototype.constructor = Line;

	Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
	  svg.setAttribute('viewBox', '0 0 100 ' + opts.strokeWidth);
	  svg.setAttribute('preserveAspectRatio', 'none');
	};

	Line.prototype._pathString = function _pathString(opts) {
	  return utils.render(this._pathTemplate, {
	    center: opts.strokeWidth / 2
	  });
	};

	Line.prototype._trailString = function _trailString(opts) {
	  return this._pathString(opts);
	};

	var line = Line;

	// Circle shaped progress bar




	var Circle = function Circle(container, options) {
	  // Use two arcs to form a circle
	  // See this answer http://stackoverflow.com/a/10477334/1446092
	  this._pathTemplate = 'M 50,50 m 0,-{radius}' + ' a {radius},{radius} 0 1 1 0,{2radius}' + ' a {radius},{radius} 0 1 1 0,-{2radius}';
	  this.containerAspectRatio = 1;
	  shape.apply(this, arguments);
	};

	Circle.prototype = new shape();
	Circle.prototype.constructor = Circle;

	Circle.prototype._pathString = function _pathString(opts) {
	  var widthOfWider = opts.strokeWidth;

	  if (opts.trailWidth && opts.trailWidth > opts.strokeWidth) {
	    widthOfWider = opts.trailWidth;
	  }

	  var r = 50 - widthOfWider / 2;
	  return utils.render(this._pathTemplate, {
	    radius: r,
	    '2radius': r * 2
	  });
	};

	Circle.prototype._trailString = function _trailString(opts) {
	  return this._pathString(opts);
	};

	var circle = Circle;

	// Semi-SemiCircle shaped progress bar






	var SemiCircle = function SemiCircle(container, options) {
	  // Use one arc to form a SemiCircle
	  // See this answer http://stackoverflow.com/a/10477334/1446092
	  this._pathTemplate = 'M 50,50 m -{radius},0' + ' a {radius},{radius} 0 1 1 {2radius},0';
	  this.containerAspectRatio = 2;
	  shape.apply(this, arguments);
	};

	SemiCircle.prototype = new shape();
	SemiCircle.prototype.constructor = SemiCircle;

	SemiCircle.prototype._initializeSvg = function _initializeSvg(svg, opts) {
	  svg.setAttribute('viewBox', '0 0 100 50');
	};

	SemiCircle.prototype._initializeTextContainer = function _initializeTextContainer(opts, container, textContainer) {
	  if (opts.text.style) {
	    // Reset top style
	    textContainer.style.top = 'auto';
	    textContainer.style.bottom = '0';

	    if (opts.text.alignToBottom) {
	      utils.setStyle(textContainer, 'transform', 'translate(-50%, 0)');
	    } else {
	      utils.setStyle(textContainer, 'transform', 'translate(-50%, 50%)');
	    }
	  }
	}; // Share functionality with Circle, just have different path


	SemiCircle.prototype._pathString = circle.prototype._pathString;
	SemiCircle.prototype._trailString = circle.prototype._trailString;
	var semicircle = SemiCircle;

	// Square shaped progress bar
	// Note: Square is not core part of API anymore. It's left here
	//       for reference. square is not included to the progressbar
	//       build anymore




	var Square = function Square(container, options) {
	  this._pathTemplate = 'M 0,{halfOfStrokeWidth}' + ' L {width},{halfOfStrokeWidth}' + ' L {width},{width}' + ' L {halfOfStrokeWidth},{width}' + ' L {halfOfStrokeWidth},{strokeWidth}';
	  this._trailTemplate = 'M {startMargin},{halfOfStrokeWidth}' + ' L {width},{halfOfStrokeWidth}' + ' L {width},{width}' + ' L {halfOfStrokeWidth},{width}' + ' L {halfOfStrokeWidth},{halfOfStrokeWidth}';
	  shape.apply(this, arguments);
	};

	Square.prototype = new shape();
	Square.prototype.constructor = Square;

	Square.prototype._pathString = function _pathString(opts) {
	  var w = 100 - opts.strokeWidth / 2;
	  return utils.render(this._pathTemplate, {
	    width: w,
	    strokeWidth: opts.strokeWidth,
	    halfOfStrokeWidth: opts.strokeWidth / 2
	  });
	};

	Square.prototype._trailString = function _trailString(opts) {
	  var w = 100 - opts.strokeWidth / 2;
	  return utils.render(this._trailTemplate, {
	    width: w,
	    strokeWidth: opts.strokeWidth,
	    halfOfStrokeWidth: opts.strokeWidth / 2,
	    startMargin: opts.strokeWidth / 2 - opts.trailWidth / 2
	  });
	};

	var square = Square;

	var main = {
	  // Higher level API, different shaped progress bars
	  Line: line,
	  Circle: circle,
	  SemiCircle: semicircle,
	  Square: square,
	  // Lower level API to use any SVG path
	  Path: path,
	  // Base-class for creating new custom shapes
	  // to be in line with the API of built-in shapes
	  // Undocumented.
	  Shape: shape,
	  // Internal utils, undocumented.
	  utils: utils
	};

	function calculatePercentage(currentValue, minValue, maxValue) {
	    if (currentValue < minValue) {
	        return 0;
	    }
	    if (currentValue > maxValue) {
	        return 100;
	    }
	    const range = maxValue - minValue;
	    const percentage = Math.round(((currentValue - minValue) / range) * 100);
	    return Math.abs(percentage);
	}

	const defaultOptions = {
	    duration: 800,
	    // These default values are necessary so that progressbar.js at least renders anything, which we override with custom styling.
	    // They also need to be equal to the largest size that we have available, since that will determine the size of the bounding box.
	    strokeWidth: 16,
	    trailWidth: 16
	};
	function getValuesErrorMessage(currentValue, minValue, maxValue) {
	    if (maxValue < minValue) {
	        return "Error in progress circle values: The maximum value is lower than the minimum value.";
	    }
	    if (currentValue < minValue) {
	        return "Error in progress circle values: The progress value is lower than the minimum value.";
	    }
	    if (currentValue > maxValue) {
	        return "Error in progress circle values: The progress value is higher than the maximum value.";
	    }
	    return null;
	}
	const ProgressCircle = ({ class: className, style, currentValue, minValue, maxValue, onClick, label }) => {
	    const [progressCircle, setProgressCircle] = react.useState();
	    const alertMessage = getValuesErrorMessage(currentValue, minValue, maxValue);
	    const setProgressCircleElement = react.useCallback((node) => {
	        if (node !== null) {
	            const circleElement = new main.Circle(node, defaultOptions);
	            circleElement.path.className.baseVal = "widget-progress-circle-path";
	            circleElement.trail.className.baseVal = "widget-progress-circle-trail-path";
	            setProgressCircle(circleElement);
	        }
	    }, [setProgressCircle]);
	    react.useEffect(() => {
	        if (progressCircle) {
	            const percentage = calculatePercentage(currentValue, minValue, maxValue);
	            progressCircle.animate(percentage / 100);
	        }
	    }, [currentValue, minValue, maxValue, progressCircle]);
	    react.useEffect(() => {
	        return () => {
	            progressCircle === null || progressCircle === void 0 ? void 0 : progressCircle.destroy();
	        };
	    }, [progressCircle]);
	    return (react.createElement("div", { className: classnames("widget-progress-circle", "widget-progress-circle-primary", "widget-progress-circle-thickness-medium", className), style: style },
	        alertMessage ? react.createElement(Alert, { bootstrapStyle: "danger" }, alertMessage) : null,
	        react.createElement("div", { className: classnames("h2", "progress-circle-label-container", {
	                "widget-progress-circle-clickable": !!onClick
	            }), onClick: onClick, ref: setProgressCircleElement },
	            react.createElement("div", { className: classnames("progressbar-text") }, label))));
	};

	const defaultValues = {
	    currentValue: 50,
	    minValue: 0,
	    maxValue: 100
	};

	const ProgressCircle$1 = props => {
	    var _a;
	    function getProgressCircleValues() {
	        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
	        switch (props.type) {
	            case "dynamic":
	                return {
	                    currentValue: Number((_b = (_a = props.dynamicCurrentValue) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0),
	                    minValue: Number((_d = (_c = props.dynamicMinValue) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : defaultValues.minValue),
	                    maxValue: Number((_f = (_e = props.dynamicMaxValue) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : defaultValues.maxValue)
	                };
	            case "expression":
	                return {
	                    currentValue: Number((_h = (_g = props.expressionCurrentValue) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : 0),
	                    minValue: Number((_k = (_j = props.expressionMinValue) === null || _j === void 0 ? void 0 : _j.value) !== null && _k !== void 0 ? _k : defaultValues.minValue),
	                    maxValue: Number((_m = (_l = props.expressionMaxValue) === null || _l === void 0 ? void 0 : _l.value) !== null && _m !== void 0 ? _m : defaultValues.maxValue)
	                };
	            case "static":
	                // Default values here are handled by the `ProgressBar.xml`.
	                return {
	                    currentValue: props.staticCurrentValue,
	                    minValue: props.staticMinValue,
	                    maxValue: props.staticMaxValue
	                };
	        }
	    }
	    const onClick = react.useCallback(() => { var _a; return (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.execute(); }, [props.onClick]);
	    const { currentValue, minValue, maxValue } = getProgressCircleValues();
	    return (react.createElement(ProgressCircle, { class: props.class, style: props.style, currentValue: currentValue, minValue: minValue, maxValue: maxValue, onClick: props.onClick ? onClick : undefined, label: props.showLabel
	            ? props.labelType === "custom"
	                ? props.customLabel
	                : props.labelType === "percentage"
	                    ? `${calculatePercentage(currentValue, minValue, maxValue)}%`
	                    : (_a = props.labelText) === null || _a === void 0 ? void 0 : _a.value
	            : null }));
	};

	exports.ProgressCircle = ProgressCircle$1;

	Object.defineProperty(exports, '__esModule', { value: true });

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NDaXJjbGUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vdG9vbHMvcGl3LXV0aWxzLWludGVybmFsL2Rpc3QvY29tcG9uZW50cy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Rvb2xzL3Bpdy11dGlscy1pbnRlcm5hbC9kaXN0L2J1aWxkZXJzL0VkaXRhYmxlVmFsdWVCdWlsZGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NoaWZ0eS9kaXN0L3NoaWZ0eS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcm9ncmVzc2Jhci5qcy9zcmMvdXRpbHMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJvZ3Jlc3NiYXIuanMvc3JjL3BhdGguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJvZ3Jlc3NiYXIuanMvc3JjL3NoYXBlLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb2dyZXNzYmFyLmpzL3NyYy9saW5lLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb2dyZXNzYmFyLmpzL3NyYy9jaXJjbGUuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJvZ3Jlc3NiYXIuanMvc3JjL3NlbWljaXJjbGUuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJvZ3Jlc3NiYXIuanMvc3JjL3NxdWFyZS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcm9ncmVzc2Jhci5qcy9zcmMvbWFpbi5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy91dGlsLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvUHJvZ3Jlc3NDaXJjbGUudHN4IiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3Byb2dyZXNzQ2lyY2xlVmFsdWVzLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL1Byb2dyZXNzQ2lyY2xlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE3IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpICYmIGFyZy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGlubmVyID0gY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdFx0XHRpZiAoaW5uZXIpIHtcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goaW5uZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRjbGFzc05hbWVzLmRlZmF1bHQgPSBjbGFzc05hbWVzO1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCJpbXBvcnQgeyBDaGlsZHJlbiwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmV4cG9ydCBjb25zdCBBbGVydCA9ICh7IGNsYXNzTmFtZSwgYm9vdHN0cmFwU3R5bGUsIGNoaWxkcmVuIH0pID0+IENoaWxkcmVuLmNvdW50KGNoaWxkcmVuKSA+IDAgPyAoY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lcyhgYWxlcnQgYWxlcnQtJHtib290c3RyYXBTdHlsZX1gLCBjbGFzc05hbWUpIH0sIGNoaWxkcmVuKSkgOiBudWxsO1xuQWxlcnQuZGlzcGxheU5hbWUgPSBcIkFsZXJ0XCI7XG4iLCJleHBvcnQgdmFyIEZvcm1hdHRlclR5cGU7XG4oZnVuY3Rpb24gKEZvcm1hdHRlclR5cGUpIHtcbiAgICBGb3JtYXR0ZXJUeXBlW1wiTnVtYmVyXCJdID0gXCJudW1iZXJcIjtcbiAgICBGb3JtYXR0ZXJUeXBlW1wiRGF0ZVRpbWVcIl0gPSBcImRhdGV0aW1lXCI7XG59KShGb3JtYXR0ZXJUeXBlIHx8IChGb3JtYXR0ZXJUeXBlID0ge30pKTtcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZVZhbHVlQnVpbGRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWRpdGFibGVWYWx1ZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBkaXNwbGF5VmFsdWU6IFwiXCIsXG4gICAgICAgICAgICBzdGF0dXM6IFwiYXZhaWxhYmxlXCIgLyogQXZhaWxhYmxlICovLFxuICAgICAgICAgICAgdmFsaWRhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgZm9ybWF0dGVyOiB7XG4gICAgICAgICAgICAgICAgZm9ybWF0OiBqZXN0LmZuKG5hbWUgPT4gYEZvcm1hdHRlZCAke25hbWV9YCksXG4gICAgICAgICAgICAgICAgcGFyc2U6IGplc3QuZm4oKSxcbiAgICAgICAgICAgICAgICB3aXRoQ29uZmlnOiBqZXN0LmZuKCgpID0+IG5ldyBFZGl0YWJsZVZhbHVlQnVpbGRlcigpLmJ1aWxkKCkuZm9ybWF0dGVyKSxcbiAgICAgICAgICAgICAgICBnZXRGb3JtYXRQbGFjZWhvbGRlcjogamVzdC5mbigpLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1hdHRlclR5cGUuRGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgY29uZmlnOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFZhbGlkYXRvcjogamVzdC5mbigpLFxuICAgICAgICAgICAgc2V0VmFsdWU6IGplc3QuZm4oKHZhbHVlKSA9PiB0aGlzLndpdGhWYWx1ZSh2YWx1ZSkpLFxuICAgICAgICAgICAgc2V0VGV4dFZhbHVlOiBqZXN0LmZuKCksXG4gICAgICAgICAgICBzZXRGb3JtYXR0ZXI6IGplc3QuZm4oKVxuICAgICAgICB9O1xuICAgIH1cbiAgICB3aXRoVmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZWRpdGFibGVWYWx1ZS5kaXNwbGF5VmFsdWUgPSB0aGlzLmVkaXRhYmxlVmFsdWUuZm9ybWF0dGVyLmZvcm1hdCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB3aXRoRm9ybWF0dGVyKGZvcm1hdHRlcikge1xuICAgICAgICB0aGlzLmVkaXRhYmxlVmFsdWUuZm9ybWF0dGVyID0gZm9ybWF0dGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaXNSZWFkT25seSgpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlzTG9hZGluZygpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnN0YXR1cyA9IFwibG9hZGluZ1wiIC8qIExvYWRpbmcgKi87XG4gICAgICAgIHJldHVybiB0aGlzLmlzUmVhZE9ubHkoKTtcbiAgICB9XG4gICAgaXNVbmF2YWlsYWJsZSgpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnN0YXR1cyA9IFwidW5hdmFpbGFibGVcIiAvKiBVbmF2YWlsYWJsZSAqLztcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNSZWFkT25seSgpO1xuICAgIH1cbiAgICB3aXRoVmFsaWRhdGlvbih2YWxpZGF0aW9uKSB7XG4gICAgICAgIHRoaXMuZWRpdGFibGVWYWx1ZS52YWxpZGF0aW9uID0gdmFsaWRhdGlvbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHdpdGhVbml2ZXJzZSguLi52YWx1ZXMpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnVuaXZlcnNlID0gdmFsdWVzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRhYmxlVmFsdWU7XG4gICAgfVxufVxuIiwiLyohIFNoaWZ0eSAyLjEzLjAgLSBodHRwczovL2dpdGh1Yi5jb20vamVyZW15Y2thaG4vc2hpZnR5ICovXG4hZnVuY3Rpb24odCxuKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1uKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShcInNoaWZ0eVwiLFtdLG4pOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHMuc2hpZnR5PW4oKTp0LnNoaWZ0eT1uKCl9KHdpbmRvdywoZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCl7dmFyIG49e307ZnVuY3Rpb24gZShyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIGk9bltyXT17aTpyLGw6ITEsZXhwb3J0czp7fX07cmV0dXJuIHRbcl0uY2FsbChpLmV4cG9ydHMsaSxpLmV4cG9ydHMsZSksaS5sPSEwLGkuZXhwb3J0c31yZXR1cm4gZS5tPXQsZS5jPW4sZS5kPWZ1bmN0aW9uKHQsbixyKXtlLm8odCxuKXx8T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbix7ZW51bWVyYWJsZTohMCxnZXQ6cn0pfSxlLnI9ZnVuY3Rpb24odCl7XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFN5bWJvbCYmU3ltYm9sLnRvU3RyaW5nVGFnJiZPYmplY3QuZGVmaW5lUHJvcGVydHkodCxTeW1ib2wudG9TdHJpbmdUYWcse3ZhbHVlOlwiTW9kdWxlXCJ9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX0sZS50PWZ1bmN0aW9uKHQsbil7aWYoMSZuJiYodD1lKHQpKSw4Jm4pcmV0dXJuIHQ7aWYoNCZuJiZcIm9iamVjdFwiPT10eXBlb2YgdCYmdCYmdC5fX2VzTW9kdWxlKXJldHVybiB0O3ZhciByPU9iamVjdC5jcmVhdGUobnVsbCk7aWYoZS5yKHIpLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyLFwiZGVmYXVsdFwiLHtlbnVtZXJhYmxlOiEwLHZhbHVlOnR9KSwyJm4mJlwic3RyaW5nXCIhPXR5cGVvZiB0KWZvcih2YXIgaSBpbiB0KWUuZChyLGksZnVuY3Rpb24obil7cmV0dXJuIHRbbl19LmJpbmQobnVsbCxpKSk7cmV0dXJuIHJ9LGUubj1mdW5jdGlvbih0KXt2YXIgbj10JiZ0Ll9fZXNNb2R1bGU/ZnVuY3Rpb24oKXtyZXR1cm4gdC5kZWZhdWx0fTpmdW5jdGlvbigpe3JldHVybiB0fTtyZXR1cm4gZS5kKG4sXCJhXCIsbiksbn0sZS5vPWZ1bmN0aW9uKHQsbil7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0LG4pfSxlLnA9XCJcIixlKGUucz00KX0oW2Z1bmN0aW9uKHQsbixlKXtcInVzZSBzdHJpY3RcIjsoZnVuY3Rpb24odCl7ZS5kKG4sXCJlXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIEV9KSksZS5kKG4sXCJjXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIEl9KSksZS5kKG4sXCJiXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIHF9KSksZS5kKG4sXCJhXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIFF9KSksZS5kKG4sXCJkXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIE59KSk7dmFyIHI9ZSgxKSxpPWUubihyKSx1PWUoMik7ZnVuY3Rpb24gbyh0LG4pe2lmKCEodCBpbnN0YW5jZW9mIG4pKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIil9ZnVuY3Rpb24gYSh0LG4pe2Zvcih2YXIgZT0wO2U8bi5sZW5ndGg7ZSsrKXt2YXIgcj1uW2VdO3IuZW51bWVyYWJsZT1yLmVudW1lcmFibGV8fCExLHIuY29uZmlndXJhYmxlPSEwLFwidmFsdWVcImluIHImJihyLndyaXRhYmxlPSEwKSxPYmplY3QuZGVmaW5lUHJvcGVydHkodCxyLmtleSxyKX19ZnVuY3Rpb24gYyh0LG4sZSl7cmV0dXJuIG4gaW4gdD9PYmplY3QuZGVmaW5lUHJvcGVydHkodCxuLHt2YWx1ZTplLGVudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwfSk6dFtuXT1lLHR9ZnVuY3Rpb24gcyh0KXtyZXR1cm4ocz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24odCl7cmV0dXJuIHR5cGVvZiB0fTpmdW5jdGlvbih0KXtyZXR1cm4gdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZ0LmNvbnN0cnVjdG9yPT09U3ltYm9sJiZ0IT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiB0fSkodCl9dmFyIGYsbCxoLHAsZCxfLHYseSxnLG0sYix3LFMsTyxqLGs9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdz93aW5kb3c6dCxNPWsucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxrLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8ay5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxrLm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxrLm1vekNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSYmay5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fHNldFRpbWVvdXQsUD1mdW5jdGlvbigpe30sVD1udWxsLHg9bnVsbCxBPWkoKSh7fSx1KSxFPWZ1bmN0aW9uKHQsbixlLHIsaSx1LG8pe2ZvcihsIGluIGY9dDx1PzA6KHQtdSkvaSxuKWg9b1tsXSxwPWguY2FsbD9oOkFbaF0sZD1lW2xdLG5bbF09ZCsocltsXS1kKSpwKGYpO3JldHVybiBufSxGPWZ1bmN0aW9uKHQsbil7Xz10Ll9kdXJhdGlvbix2PXQuX3RpbWVzdGFtcCxiPXQuX2N1cnJlbnRTdGF0ZSx3PXQuX3RhcmdldFN0YXRlLFM9dC5fZGVsYXksbT1fLSgoeT12K1MrXyktKGc9bj55P3k6bikpLGc+PXk/KHQuX3JlbmRlcih3LHQuX2RhdGEsbSksdC5zdG9wKCEwKSk6KHQuX2FwcGx5RmlsdGVyKFwiYmVmb3JlVHdlZW5cIiksZzx2K1M/dj1fPWc9MTp2Kz1TLEUoZyxiLHQuX29yaWdpbmFsU3RhdGUsdyxfLHYsdC5fZWFzaW5nKSx0Ll9hcHBseUZpbHRlcihcImFmdGVyVHdlZW5cIiksdC5fcmVuZGVyKGIsdC5fZGF0YSxtKSl9LEk9ZnVuY3Rpb24odCxuLGUpe3JldHVybiBmdW5jdGlvbigpe2Zvcih0PVEubm93KCksbj1UO247KWU9bi5fbmV4dCxGKG4sdCksbj1lfSgpfSxDPWZ1bmN0aW9uIHQoKXtUJiYoTS5jYWxsKGssdCwxZTMvNjApLEkoKSl9LHE9ZnVuY3Rpb24odCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOlwibGluZWFyXCIsZT1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06e30scj1zKG4pO2lmKFwic3RyaW5nXCI9PT1yfHxcImZ1bmN0aW9uXCI9PT1yKWZvcih2YXIgaSBpbiB0KWVbaV09bjtlbHNlIGZvcih2YXIgdSBpbiB0KWVbdV09blt1XXx8XCJsaW5lYXJcIjtyZXR1cm4gZX0sRD1mdW5jdGlvbih0KXt0PT09VD8oVD10Ll9uZXh0KT9ULl9wcmV2aW91cz1udWxsOng9bnVsbDp0PT09eD8oeD10Ll9wcmV2aW91cyk/eC5fbmV4dD1udWxsOlQ9bnVsbDooTz10Ll9wcmV2aW91cyxqPXQuX25leHQsTy5fbmV4dD1qLGouX3ByZXZpb3VzPU8pLHQuX3ByZXZpb3VzPXQuX25leHQ9bnVsbH0sUT1mdW5jdGlvbigpe2Z1bmN0aW9uIHQoKXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sZT1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06dm9pZCAwO28odGhpcyx0KSxjKHRoaXMsXCJfY29uZmlnXCIse30pLGModGhpcyxcIl9kYXRhXCIse30pLGModGhpcyxcIl9maWx0ZXJzXCIsW10pLGModGhpcyxcIl9uZXh0XCIsbnVsbCksYyh0aGlzLFwiX3ByZXZpb3VzXCIsbnVsbCksYyh0aGlzLFwiX3RpbWVzdGFtcFwiLG51bGwpLGModGhpcyxcIl9yZXNvbHZlXCIsbnVsbCksYyh0aGlzLFwiX3JlamVjdFwiLG51bGwpLGModGhpcyxcIl9jdXJyZW50U3RhdGVcIix7fSksYyh0aGlzLFwiX29yaWdpbmFsU3RhdGVcIix7fSksYyh0aGlzLFwiX3RhcmdldFN0YXRlXCIse30pLGModGhpcyxcIl9zdGFydFwiLFApLGModGhpcyxcIl9yZW5kZXJcIixQKSx0aGlzLl9jdXJyZW50U3RhdGU9bnx8dGhpcy5fY3VycmVudFN0YXRlLGUmJnRoaXMuc2V0Q29uZmlnKGUpfXZhciBuLGUscjtyZXR1cm4gbj10LChlPVt7a2V5OlwiX2FwcGx5RmlsdGVyXCIsdmFsdWU6ZnVuY3Rpb24odCl7Zm9yKHZhciBuPXRoaXMuX2ZpbHRlcnMubGVuZ3RoO24+MDtuLS0pe3ZhciBlPXRoaXMuX2ZpbHRlcnNbbi1uXVt0XTtlJiZlKHRoaXMpfX19LHtrZXk6XCJ0d2VlblwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnZvaWQgMDtyZXR1cm4gdGhpcy5faXNQbGF5aW5nJiZ0aGlzLnN0b3AoKSwhbiYmdGhpcy5fY29uZmlnfHx0aGlzLnNldENvbmZpZyhuKSx0aGlzLl9wYXVzZWRBdFRpbWU9bnVsbCx0aGlzLl90aW1lc3RhbXA9dC5ub3coKSx0aGlzLl9zdGFydCh0aGlzLmdldCgpLHRoaXMuX2RhdGEpLHRoaXMuX3Jlc3VtZSh0aGlzLl90aW1lc3RhbXApfX0se2tleTpcInNldENvbmZpZ1wiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIG49dGhpcyxlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fTtpKCkodGhpcy5fY29uZmlnLGUpO3ZhciByPXRoaXMuX2NvbmZpZyx1PXIucHJvbWlzZSxvPXZvaWQgMD09PXU/UHJvbWlzZTp1LGE9ci5zdGFydCxjPXZvaWQgMD09PWE/UDphLHM9ci5yZW5kZXIsZj12b2lkIDA9PT1zP3RoaXMuX2NvbmZpZy5zdGVwfHxQOnMsbD1yLnN0ZXAsaD12b2lkIDA9PT1sP1A6bDtmb3IodmFyIHAgaW4gdGhpcy5fZGF0YT10aGlzLl9jb25maWcuZGF0YXx8dGhpcy5fY29uZmlnLmF0dGFjaG1lbnR8fHRoaXMuX2RhdGEsdGhpcy5faXNQbGF5aW5nPSExLHRoaXMuX3BhdXNlZEF0VGltZT1udWxsLHRoaXMuX3NjaGVkdWxlSWQ9bnVsbCx0aGlzLl9kZWxheT1lLmRlbGF5fHwwLHRoaXMuX3N0YXJ0PWMsdGhpcy5fcmVuZGVyPWZ8fGgsdGhpcy5fZHVyYXRpb249dGhpcy5fY29uZmlnLmR1cmF0aW9ufHw1MDAsaSgpKHRoaXMuX2N1cnJlbnRTdGF0ZSxlLmZyb20pLGkoKSh0aGlzLl9vcmlnaW5hbFN0YXRlLHRoaXMuX2N1cnJlbnRTdGF0ZSksaSgpKHRoaXMuX3RhcmdldFN0YXRlLHRoaXMuX2N1cnJlbnRTdGF0ZSxlLnRvKSx0aGlzLl9lYXNpbmc9cSh0aGlzLl9jdXJyZW50U3RhdGUsdGhpcy5fY29uZmlnLmVhc2luZyx0aGlzLl9lYXNpbmcpLHRoaXMuX2ZpbHRlcnMubGVuZ3RoPTAsdC5maWx0ZXJzKXQuZmlsdGVyc1twXS5kb2VzQXBwbHkodGhpcykmJnRoaXMuX2ZpbHRlcnMucHVzaCh0LmZpbHRlcnNbcF0pO3JldHVybiB0aGlzLl9hcHBseUZpbHRlcihcInR3ZWVuQ3JlYXRlZFwiKSx0aGlzLl9wcm9taXNlPW5ldyBvKChmdW5jdGlvbih0LGUpe24uX3Jlc29sdmU9dCxuLl9yZWplY3Q9ZX0pKSx0aGlzfX0se2tleTpcImdldFwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIGkoKSh7fSx0aGlzLl9jdXJyZW50U3RhdGUpfX0se2tleTpcInNldFwiLHZhbHVlOmZ1bmN0aW9uKHQpe3RoaXMuX2N1cnJlbnRTdGF0ZT10fX0se2tleTpcInBhdXNlXCIsdmFsdWU6ZnVuY3Rpb24oKXtpZih0aGlzLl9pc1BsYXlpbmcpcmV0dXJuIHRoaXMuX3BhdXNlZEF0VGltZT10Lm5vdygpLHRoaXMuX2lzUGxheWluZz0hMSxEKHRoaXMpLHRoaXN9fSx7a2V5OlwicmVzdW1lXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fcmVzdW1lKCl9fSx7a2V5OlwiX3Jlc3VtZVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOnQubm93KCk7cmV0dXJuIG51bGw9PT10aGlzLl90aW1lc3RhbXA/dGhpcy50d2VlbigpOih0aGlzLl9pc1BsYXlpbmd8fCh0aGlzLl9wYXVzZWRBdFRpbWUmJih0aGlzLl90aW1lc3RhbXArPW4tdGhpcy5fcGF1c2VkQXRUaW1lLHRoaXMuX3BhdXNlZEF0VGltZT1udWxsKSx0aGlzLl9pc1BsYXlpbmc9ITAsbnVsbD09PVQ/KFQ9dGhpcyx4PXRoaXMsQygpKToodGhpcy5fcHJldmlvdXM9eCx4Ll9uZXh0PXRoaXMseD10aGlzKSksdGhpcy5fcHJvbWlzZSl9fSx7a2V5Olwic2Vla1wiLHZhbHVlOmZ1bmN0aW9uKG4pe249TWF0aC5tYXgobiwwKTt2YXIgZT10Lm5vdygpO3JldHVybiB0aGlzLl90aW1lc3RhbXArbj09PTB8fCh0aGlzLl90aW1lc3RhbXA9ZS1uLHRoaXMuX2lzUGxheWluZ3x8Rih0aGlzLGUpKSx0aGlzfX0se2tleTpcInN0b3BcIix2YWx1ZTpmdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF07cmV0dXJuIHRoaXMuX2lzUGxheWluZz8odGhpcy5faXNQbGF5aW5nPSExLEQodGhpcyksdCYmKHRoaXMuX2FwcGx5RmlsdGVyKFwiYmVmb3JlVHdlZW5cIiksRSgxLHRoaXMuX2N1cnJlbnRTdGF0ZSx0aGlzLl9vcmlnaW5hbFN0YXRlLHRoaXMuX3RhcmdldFN0YXRlLDEsMCx0aGlzLl9lYXNpbmcpLHRoaXMuX2FwcGx5RmlsdGVyKFwiYWZ0ZXJUd2VlblwiKSx0aGlzLl9hcHBseUZpbHRlcihcImFmdGVyVHdlZW5FbmRcIikpLHRoaXMuX3Jlc29sdmUmJnRoaXMuX3Jlc29sdmUoe2RhdGE6dGhpcy5fZGF0YSxzdGF0ZTp0aGlzLl9jdXJyZW50U3RhdGUsdHdlZW5hYmxlOnRoaXN9KSx0aGlzLl9yZXNvbHZlPW51bGwsdGhpcy5fcmVqZWN0PW51bGwsaSgpKHRoaXMuX3RhcmdldFN0YXRlLHRoaXMuX2N1cnJlbnRTdGF0ZSksaSgpKHRoaXMuX29yaWdpbmFsU3RhdGUsdGhpcy5fdGFyZ2V0U3RhdGUpLHRoaXMpOnRoaXN9fSx7a2V5OlwiY2FuY2VsXCIsdmFsdWU6ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdLG49dGhpcy5fY3VycmVudFN0YXRlLGU9dGhpcy5fZGF0YSxyPXRoaXMuX2lzUGxheWluZztyZXR1cm4gcj8odGhpcy5fcmVqZWN0KHtkYXRhOmUsc3RhdGU6bix0d2VlbmFibGU6dGhpc30pLHRoaXMuX3Jlc29sdmU9bnVsbCx0aGlzLl9yZWplY3Q9bnVsbCx0aGlzLnN0b3AodCkpOnRoaXN9fSx7a2V5OlwiaXNQbGF5aW5nXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5faXNQbGF5aW5nfX0se2tleTpcInNldFNjaGVkdWxlRnVuY3Rpb25cIix2YWx1ZTpmdW5jdGlvbihuKXt0LnNldFNjaGVkdWxlRnVuY3Rpb24obil9fSx7a2V5OlwiZGF0YVwiLHZhbHVlOmZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOm51bGw7cmV0dXJuIHQmJih0aGlzLl9kYXRhPWkoKSh7fSx0KSksdGhpcy5fZGF0YX19LHtrZXk6XCJkaXNwb3NlXCIsdmFsdWU6ZnVuY3Rpb24oKXtmb3IodmFyIHQgaW4gdGhpcylkZWxldGUgdGhpc1t0XX19XSkmJmEobi5wcm90b3R5cGUsZSksciYmYShuLHIpLHR9KCk7ZnVuY3Rpb24gTigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSxuPW5ldyBRLGU9bi50d2Vlbih0KTtyZXR1cm4gZS50d2VlbmFibGU9bixlfVEuc2V0U2NoZWR1bGVGdW5jdGlvbj1mdW5jdGlvbih0KXtyZXR1cm4gTT10fSxRLmZvcm11bGFzPUEsUS5maWx0ZXJzPXt9LFEubm93PURhdGUubm93fHxmdW5jdGlvbigpe3JldHVybituZXcgRGF0ZX19KS5jYWxsKHRoaXMsZSgzKSl9LGZ1bmN0aW9uKHQsbixlKXtcInVzZSBzdHJpY3RcIjtcbi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL3ZhciByPU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsaT1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LHU9T2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtmdW5jdGlvbiBvKHQpe2lmKG51bGw9PXQpdGhyb3cgbmV3IFR5cGVFcnJvcihcIk9iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkXCIpO3JldHVybiBPYmplY3QodCl9dC5leHBvcnRzPWZ1bmN0aW9uKCl7dHJ5e2lmKCFPYmplY3QuYXNzaWduKXJldHVybiExO3ZhciB0PW5ldyBTdHJpbmcoXCJhYmNcIik7aWYodFs1XT1cImRlXCIsXCI1XCI9PT1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0KVswXSlyZXR1cm4hMTtmb3IodmFyIG49e30sZT0wO2U8MTA7ZSsrKW5bXCJfXCIrU3RyaW5nLmZyb21DaGFyQ29kZShlKV09ZTtpZihcIjAxMjM0NTY3ODlcIiE9PU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG4pLm1hcCgoZnVuY3Rpb24odCl7cmV0dXJuIG5bdF19KSkuam9pbihcIlwiKSlyZXR1cm4hMTt2YXIgcj17fTtyZXR1cm5cImFiY2RlZmdoaWprbG1ub3BxcnN0XCIuc3BsaXQoXCJcIikuZm9yRWFjaCgoZnVuY3Rpb24odCl7clt0XT10fSkpLFwiYWJjZGVmZ2hpamtsbW5vcHFyc3RcIj09PU9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30scikpLmpvaW4oXCJcIil9Y2F0Y2godCl7cmV0dXJuITF9fSgpP09iamVjdC5hc3NpZ246ZnVuY3Rpb24odCxuKXtmb3IodmFyIGUsYSxjPW8odCkscz0xO3M8YXJndW1lbnRzLmxlbmd0aDtzKyspe2Zvcih2YXIgZiBpbiBlPU9iamVjdChhcmd1bWVudHNbc10pKWkuY2FsbChlLGYpJiYoY1tmXT1lW2ZdKTtpZihyKXthPXIoZSk7Zm9yKHZhciBsPTA7bDxhLmxlbmd0aDtsKyspdS5jYWxsKGUsYVtsXSkmJihjW2FbbF1dPWVbYVtsXV0pfX1yZXR1cm4gY319LGZ1bmN0aW9uKHQsbixlKXtcInVzZSBzdHJpY3RcIjtlLnIobiksZS5kKG4sXCJsaW5lYXJcIiwoZnVuY3Rpb24oKXtyZXR1cm4gcn0pKSxlLmQobixcImVhc2VJblF1YWRcIiwoZnVuY3Rpb24oKXtyZXR1cm4gaX0pKSxlLmQobixcImVhc2VPdXRRdWFkXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIHV9KSksZS5kKG4sXCJlYXNlSW5PdXRRdWFkXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIG99KSksZS5kKG4sXCJlYXNlSW5DdWJpY1wiLChmdW5jdGlvbigpe3JldHVybiBhfSkpLGUuZChuLFwiZWFzZU91dEN1YmljXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIGN9KSksZS5kKG4sXCJlYXNlSW5PdXRDdWJpY1wiLChmdW5jdGlvbigpe3JldHVybiBzfSkpLGUuZChuLFwiZWFzZUluUXVhcnRcIiwoZnVuY3Rpb24oKXtyZXR1cm4gZn0pKSxlLmQobixcImVhc2VPdXRRdWFydFwiLChmdW5jdGlvbigpe3JldHVybiBsfSkpLGUuZChuLFwiZWFzZUluT3V0UXVhcnRcIiwoZnVuY3Rpb24oKXtyZXR1cm4gaH0pKSxlLmQobixcImVhc2VJblF1aW50XCIsKGZ1bmN0aW9uKCl7cmV0dXJuIHB9KSksZS5kKG4sXCJlYXNlT3V0UXVpbnRcIiwoZnVuY3Rpb24oKXtyZXR1cm4gZH0pKSxlLmQobixcImVhc2VJbk91dFF1aW50XCIsKGZ1bmN0aW9uKCl7cmV0dXJuIF99KSksZS5kKG4sXCJlYXNlSW5TaW5lXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIHZ9KSksZS5kKG4sXCJlYXNlT3V0U2luZVwiLChmdW5jdGlvbigpe3JldHVybiB5fSkpLGUuZChuLFwiZWFzZUluT3V0U2luZVwiLChmdW5jdGlvbigpe3JldHVybiBnfSkpLGUuZChuLFwiZWFzZUluRXhwb1wiLChmdW5jdGlvbigpe3JldHVybiBtfSkpLGUuZChuLFwiZWFzZU91dEV4cG9cIiwoZnVuY3Rpb24oKXtyZXR1cm4gYn0pKSxlLmQobixcImVhc2VJbk91dEV4cG9cIiwoZnVuY3Rpb24oKXtyZXR1cm4gd30pKSxlLmQobixcImVhc2VJbkNpcmNcIiwoZnVuY3Rpb24oKXtyZXR1cm4gU30pKSxlLmQobixcImVhc2VPdXRDaXJjXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIE99KSksZS5kKG4sXCJlYXNlSW5PdXRDaXJjXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIGp9KSksZS5kKG4sXCJlYXNlT3V0Qm91bmNlXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIGt9KSksZS5kKG4sXCJlYXNlSW5CYWNrXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIE19KSksZS5kKG4sXCJlYXNlT3V0QmFja1wiLChmdW5jdGlvbigpe3JldHVybiBQfSkpLGUuZChuLFwiZWFzZUluT3V0QmFja1wiLChmdW5jdGlvbigpe3JldHVybiBUfSkpLGUuZChuLFwiZWxhc3RpY1wiLChmdW5jdGlvbigpe3JldHVybiB4fSkpLGUuZChuLFwic3dpbmdGcm9tVG9cIiwoZnVuY3Rpb24oKXtyZXR1cm4gQX0pKSxlLmQobixcInN3aW5nRnJvbVwiLChmdW5jdGlvbigpe3JldHVybiBFfSkpLGUuZChuLFwic3dpbmdUb1wiLChmdW5jdGlvbigpe3JldHVybiBGfSkpLGUuZChuLFwiYm91bmNlXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIEl9KSksZS5kKG4sXCJib3VuY2VQYXN0XCIsKGZ1bmN0aW9uKCl7cmV0dXJuIEN9KSksZS5kKG4sXCJlYXNlRnJvbVRvXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIHF9KSksZS5kKG4sXCJlYXNlRnJvbVwiLChmdW5jdGlvbigpe3JldHVybiBEfSkpLGUuZChuLFwiZWFzZVRvXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIFF9KSk7XG4vKiFcbiAqIEFsbCBlcXVhdGlvbnMgYXJlIGFkYXB0ZWQgZnJvbSBUaG9tYXMgRnVjaHMnXG4gKiBbU2NyaXB0eTJdKGh0dHBzOi8vZ2l0aHViLmNvbS9tYWRyb2JieS9zY3JpcHR5Mi9ibG9iL21hc3Rlci9zcmMvZWZmZWN0cy90cmFuc2l0aW9ucy9wZW5uZXIuanMpLlxuICpcbiAqIEJhc2VkIG9uIEVhc2luZyBFcXVhdGlvbnMgKGMpIDIwMDMgW1JvYmVydFxuICogUGVubmVyXShodHRwOi8vd3d3LnJvYmVydHBlbm5lci5jb20vKSwgYWxsIHJpZ2h0cyByZXNlcnZlZC4gVGhpcyB3b3JrIGlzXG4gKiBbc3ViamVjdCB0byB0ZXJtc10oaHR0cDovL3d3dy5yb2JlcnRwZW5uZXIuY29tL2Vhc2luZ190ZXJtc19vZl91c2UuaHRtbCkuXG4gKi9cbi8qIVxuICogIFRFUk1TIE9GIFVTRSAtIEVBU0lORyBFUVVBVElPTlNcbiAqICBPcGVuIHNvdXJjZSB1bmRlciB0aGUgQlNEIExpY2Vuc2UuXG4gKiAgRWFzaW5nIEVxdWF0aW9ucyAoYykgMjAwMyBSb2JlcnQgUGVubmVyLCBhbGwgcmlnaHRzIHJlc2VydmVkLlxuICovXG52YXIgcj1mdW5jdGlvbih0KXtyZXR1cm4gdH0saT1mdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5wb3codCwyKX0sdT1mdW5jdGlvbih0KXtyZXR1cm4tKE1hdGgucG93KHQtMSwyKS0xKX0sbz1mdW5jdGlvbih0KXtyZXR1cm4odC89LjUpPDE/LjUqTWF0aC5wb3codCwyKTotLjUqKCh0LT0yKSp0LTIpfSxhPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnBvdyh0LDMpfSxjPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnBvdyh0LTEsMykrMX0scz1mdW5jdGlvbih0KXtyZXR1cm4odC89LjUpPDE/LjUqTWF0aC5wb3codCwzKTouNSooTWF0aC5wb3codC0yLDMpKzIpfSxmPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnBvdyh0LDQpfSxsPWZ1bmN0aW9uKHQpe3JldHVybi0oTWF0aC5wb3codC0xLDQpLTEpfSxoPWZ1bmN0aW9uKHQpe3JldHVybih0Lz0uNSk8MT8uNSpNYXRoLnBvdyh0LDQpOi0uNSooKHQtPTIpKk1hdGgucG93KHQsMyktMil9LHA9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGgucG93KHQsNSl9LGQ9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGgucG93KHQtMSw1KSsxfSxfPWZ1bmN0aW9uKHQpe3JldHVybih0Lz0uNSk8MT8uNSpNYXRoLnBvdyh0LDUpOi41KihNYXRoLnBvdyh0LTIsNSkrMil9LHY9ZnVuY3Rpb24odCl7cmV0dXJuIDEtTWF0aC5jb3ModCooTWF0aC5QSS8yKSl9LHk9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGguc2luKHQqKE1hdGguUEkvMikpfSxnPWZ1bmN0aW9uKHQpe3JldHVybi0uNSooTWF0aC5jb3MoTWF0aC5QSSp0KS0xKX0sbT1mdW5jdGlvbih0KXtyZXR1cm4gMD09PXQ/MDpNYXRoLnBvdygyLDEwKih0LTEpKX0sYj1mdW5jdGlvbih0KXtyZXR1cm4gMT09PXQ/MToxLU1hdGgucG93KDIsLTEwKnQpfSx3PWZ1bmN0aW9uKHQpe3JldHVybiAwPT09dD8wOjE9PT10PzE6KHQvPS41KTwxPy41Kk1hdGgucG93KDIsMTAqKHQtMSkpOi41KigyLU1hdGgucG93KDIsLTEwKi0tdCkpfSxTPWZ1bmN0aW9uKHQpe3JldHVybi0oTWF0aC5zcXJ0KDEtdCp0KS0xKX0sTz1mdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5zcXJ0KDEtTWF0aC5wb3codC0xLDIpKX0saj1mdW5jdGlvbih0KXtyZXR1cm4odC89LjUpPDE/LS41KihNYXRoLnNxcnQoMS10KnQpLTEpOi41KihNYXRoLnNxcnQoMS0odC09MikqdCkrMSl9LGs9ZnVuY3Rpb24odCl7cmV0dXJuIHQ8MS8yLjc1PzcuNTYyNSp0KnQ6dDwyLzIuNzU/Ny41NjI1Kih0LT0xLjUvMi43NSkqdCsuNzU6dDwyLjUvMi43NT83LjU2MjUqKHQtPTIuMjUvMi43NSkqdCsuOTM3NTo3LjU2MjUqKHQtPTIuNjI1LzIuNzUpKnQrLjk4NDM3NX0sTT1mdW5jdGlvbih0KXt2YXIgbj0xLjcwMTU4O3JldHVybiB0KnQqKChuKzEpKnQtbil9LFA9ZnVuY3Rpb24odCl7dmFyIG49MS43MDE1ODtyZXR1cm4odC09MSkqdCooKG4rMSkqdCtuKSsxfSxUPWZ1bmN0aW9uKHQpe3ZhciBuPTEuNzAxNTg7cmV0dXJuKHQvPS41KTwxP3QqdCooKDErKG4qPTEuNTI1KSkqdC1uKSouNTouNSooKHQtPTIpKnQqKCgxKyhuKj0xLjUyNSkpKnQrbikrMil9LHg9ZnVuY3Rpb24odCl7cmV0dXJuLTEqTWF0aC5wb3coNCwtOCp0KSpNYXRoLnNpbigoNip0LTEpKigyKk1hdGguUEkpLzIpKzF9LEE9ZnVuY3Rpb24odCl7dmFyIG49MS43MDE1ODtyZXR1cm4odC89LjUpPDE/dCp0KigoMSsobio9MS41MjUpKSp0LW4pKi41Oi41KigodC09MikqdCooKDErKG4qPTEuNTI1KSkqdCtuKSsyKX0sRT1mdW5jdGlvbih0KXt2YXIgbj0xLjcwMTU4O3JldHVybiB0KnQqKChuKzEpKnQtbil9LEY9ZnVuY3Rpb24odCl7dmFyIG49MS43MDE1ODtyZXR1cm4odC09MSkqdCooKG4rMSkqdCtuKSsxfSxJPWZ1bmN0aW9uKHQpe3JldHVybiB0PDEvMi43NT83LjU2MjUqdCp0OnQ8Mi8yLjc1PzcuNTYyNSoodC09MS41LzIuNzUpKnQrLjc1OnQ8Mi41LzIuNzU/Ny41NjI1Kih0LT0yLjI1LzIuNzUpKnQrLjkzNzU6Ny41NjI1Kih0LT0yLjYyNS8yLjc1KSp0Ky45ODQzNzV9LEM9ZnVuY3Rpb24odCl7cmV0dXJuIHQ8MS8yLjc1PzcuNTYyNSp0KnQ6dDwyLzIuNzU/Mi0oNy41NjI1Kih0LT0xLjUvMi43NSkqdCsuNzUpOnQ8Mi41LzIuNzU/Mi0oNy41NjI1Kih0LT0yLjI1LzIuNzUpKnQrLjkzNzUpOjItKDcuNTYyNSoodC09Mi42MjUvMi43NSkqdCsuOTg0Mzc1KX0scT1mdW5jdGlvbih0KXtyZXR1cm4odC89LjUpPDE/LjUqTWF0aC5wb3codCw0KTotLjUqKCh0LT0yKSpNYXRoLnBvdyh0LDMpLTIpfSxEPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnBvdyh0LDQpfSxRPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnBvdyh0LC4yNSl9fSxmdW5jdGlvbih0LG4pe3ZhciBlO2U9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc30oKTt0cnl7ZT1lfHxuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpfWNhdGNoKHQpe1wib2JqZWN0XCI9PXR5cGVvZiB3aW5kb3cmJihlPXdpbmRvdyl9dC5leHBvcnRzPWV9LGZ1bmN0aW9uKHQsbixlKXtcInVzZSBzdHJpY3RcIjtlLnIobiksZS5kKG4sXCJwcm9jZXNzVHdlZW5zXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIG8uY30pKSxlLmQobixcIlR3ZWVuYWJsZVwiLChmdW5jdGlvbigpe3JldHVybiBvLmF9KSksZS5kKG4sXCJ0d2VlblwiLChmdW5jdGlvbigpe3JldHVybiBvLmR9KSksZS5kKG4sXCJpbnRlcnBvbGF0ZVwiLChmdW5jdGlvbigpe3JldHVybiBGfSkpLGUuZChuLFwiU2NlbmVcIiwoZnVuY3Rpb24oKXtyZXR1cm4gQn0pKSxlLmQobixcInNldEJlemllckZ1bmN0aW9uXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIHp9KSksZS5kKG4sXCJ1bnNldEJlemllckZ1bmN0aW9uXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIEx9KSk7dmFyIHI9e307ZS5yKHIpLGUuZChyLFwiZG9lc0FwcGx5XCIsKGZ1bmN0aW9uKCl7cmV0dXJuIE99KSksZS5kKHIsXCJ0d2VlbkNyZWF0ZWRcIiwoZnVuY3Rpb24oKXtyZXR1cm4gan0pKSxlLmQocixcImJlZm9yZVR3ZWVuXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIGt9KSksZS5kKHIsXCJhZnRlclR3ZWVuXCIsKGZ1bmN0aW9uKCl7cmV0dXJuIE19KSk7dmFyIGksdSxvPWUoMCksYT0vKFxcZHwtfFxcLikvLGM9LyhbXlxcLTAtOS5dKykvZyxzPS9bMC05Li1dKy9nLGY9KGk9cy5zb3VyY2UsdT0vLFxccyovLnNvdXJjZSxuZXcgUmVnRXhwKFwicmdiXFxcXChcIi5jb25jYXQoaSkuY29uY2F0KHUpLmNvbmNhdChpKS5jb25jYXQodSkuY29uY2F0KGksXCJcXFxcKVwiKSxcImdcIikpLGw9L14uKlxcKC8saD0vIyhbMC05XXxbYS1mXSl7Myw2fS9naSxwPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHQubWFwKChmdW5jdGlvbih0LGUpe3JldHVyblwiX1wiLmNvbmNhdChuLFwiX1wiKS5jb25jYXQoZSl9KSl9O2Z1bmN0aW9uIGQodCl7cmV0dXJuIHBhcnNlSW50KHQsMTYpfXZhciBfPWZ1bmN0aW9uKHQpe3JldHVyblwicmdiKFwiLmNvbmNhdCgobj10LDM9PT0obj1uLnJlcGxhY2UoLyMvLFwiXCIpKS5sZW5ndGgmJihuPShuPW4uc3BsaXQoXCJcIikpWzBdK25bMF0rblsxXStuWzFdK25bMl0rblsyXSksW2Qobi5zdWJzdHIoMCwyKSksZChuLnN1YnN0cigyLDIpKSxkKG4uc3Vic3RyKDQsMikpXSkuam9pbihcIixcIiksXCIpXCIpO3ZhciBufSx2PWZ1bmN0aW9uKHQsbixlKXt2YXIgcj1uLm1hdGNoKHQpLGk9bi5yZXBsYWNlKHQsXCJWQUxcIik7cmV0dXJuIHImJnIuZm9yRWFjaCgoZnVuY3Rpb24odCl7cmV0dXJuIGk9aS5yZXBsYWNlKFwiVkFMXCIsZSh0KSl9KSksaX0seT1mdW5jdGlvbih0KXtmb3IodmFyIG4gaW4gdCl7dmFyIGU9dFtuXTtcInN0cmluZ1wiPT10eXBlb2YgZSYmZS5tYXRjaChoKSYmKHRbbl09dihoLGUsXykpfX0sZz1mdW5jdGlvbih0KXt2YXIgbj10Lm1hdGNoKHMpLm1hcChNYXRoLmZsb29yKSxlPXQubWF0Y2gobClbMF07cmV0dXJuXCJcIi5jb25jYXQoZSkuY29uY2F0KG4uam9pbihcIixcIiksXCIpXCIpfSxtPWZ1bmN0aW9uKHQpe3JldHVybiB0Lm1hdGNoKHMpfSxiPWZ1bmN0aW9uKHQsbil7dmFyIGU9e307cmV0dXJuIG4uZm9yRWFjaCgoZnVuY3Rpb24obil7ZVtuXT10W25dLGRlbGV0ZSB0W25dfSkpLGV9LHc9ZnVuY3Rpb24odCxuKXtyZXR1cm4gbi5tYXAoKGZ1bmN0aW9uKG4pe3JldHVybiB0W25dfSkpfSxTPWZ1bmN0aW9uKHQsbil7cmV0dXJuIG4uZm9yRWFjaCgoZnVuY3Rpb24obil7cmV0dXJuIHQ9dC5yZXBsYWNlKFwiVkFMXCIsK24udG9GaXhlZCg0KSl9KSksdH0sTz1mdW5jdGlvbih0KXtmb3IodmFyIG4gaW4gdC5fY3VycmVudFN0YXRlKWlmKFwic3RyaW5nXCI9PXR5cGVvZiB0Ll9jdXJyZW50U3RhdGVbbl0pcmV0dXJuITA7cmV0dXJuITF9O2Z1bmN0aW9uIGoodCl7dmFyIG49dC5fY3VycmVudFN0YXRlO1tuLHQuX29yaWdpbmFsU3RhdGUsdC5fdGFyZ2V0U3RhdGVdLmZvckVhY2goeSksdC5fdG9rZW5EYXRhPWZ1bmN0aW9uKHQpe3ZhciBuLGUscj17fTtmb3IodmFyIGkgaW4gdCl7dmFyIHU9dFtpXTtcInN0cmluZ1wiPT10eXBlb2YgdSYmKHJbaV09e2Zvcm1hdFN0cmluZzoobj11LGU9dm9pZCAwLGU9bi5tYXRjaChjKSxlPygxPT09ZS5sZW5ndGh8fG4uY2hhckF0KDApLm1hdGNoKGEpKSYmZS51bnNoaWZ0KFwiXCIpOmU9W1wiXCIsXCJcIl0sZS5qb2luKFwiVkFMXCIpKSxjaHVua05hbWVzOnAobSh1KSxpKX0pfXJldHVybiByfShuKX1mdW5jdGlvbiBrKHQpe3ZhciBuPXQuX2N1cnJlbnRTdGF0ZSxlPXQuX29yaWdpbmFsU3RhdGUscj10Ll90YXJnZXRTdGF0ZSxpPXQuX2Vhc2luZyx1PXQuX3Rva2VuRGF0YTshZnVuY3Rpb24odCxuKXt2YXIgZT1mdW5jdGlvbihlKXt2YXIgcj1uW2VdLmNodW5rTmFtZXMsaT10W2VdO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBpKXt2YXIgdT1pLnNwbGl0KFwiIFwiKSxvPXVbdS5sZW5ndGgtMV07ci5mb3JFYWNoKChmdW5jdGlvbihuLGUpe3JldHVybiB0W25dPXVbZV18fG99KSl9ZWxzZSByLmZvckVhY2goKGZ1bmN0aW9uKG4pe3JldHVybiB0W25dPWl9KSk7ZGVsZXRlIHRbZV19O2Zvcih2YXIgciBpbiBuKWUocil9KGksdSksW24sZSxyXS5mb3JFYWNoKChmdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24odCxuKXt2YXIgZT1mdW5jdGlvbihlKXttKHRbZV0pLmZvckVhY2goKGZ1bmN0aW9uKHIsaSl7cmV0dXJuIHRbbltlXS5jaHVua05hbWVzW2ldXT0rcn0pKSxkZWxldGUgdFtlXX07Zm9yKHZhciByIGluIG4pZShyKX0odCx1KX0pKX1mdW5jdGlvbiBNKHQpe3ZhciBuPXQuX2N1cnJlbnRTdGF0ZSxlPXQuX29yaWdpbmFsU3RhdGUscj10Ll90YXJnZXRTdGF0ZSxpPXQuX2Vhc2luZyx1PXQuX3Rva2VuRGF0YTtbbixlLHJdLmZvckVhY2goKGZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbih0LG4pe2Zvcih2YXIgZSBpbiBuKXt2YXIgcj1uW2VdLGk9ci5jaHVua05hbWVzLHU9ci5mb3JtYXRTdHJpbmcsbz1TKHUsdyhiKHQsaSksaSkpO3RbZV09dihmLG8sZyl9fSh0LHUpfSkpLGZ1bmN0aW9uKHQsbil7Zm9yKHZhciBlIGluIG4pe3ZhciByPW5bZV0uY2h1bmtOYW1lcyxpPXRbclswXV07dFtlXT1cInN0cmluZ1wiPT10eXBlb2YgaT9yLm1hcCgoZnVuY3Rpb24obil7dmFyIGU9dFtuXTtyZXR1cm4gZGVsZXRlIHRbbl0sZX0pKS5qb2luKFwiIFwiKTppfX0oaSx1KX1mdW5jdGlvbiBQKHQsbil7dmFyIGU9T2JqZWN0LmtleXModCk7aWYoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyl7dmFyIHI9T2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0KTtuJiYocj1yLmZpbHRlcigoZnVuY3Rpb24obil7cmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodCxuKS5lbnVtZXJhYmxlfSkpKSxlLnB1c2guYXBwbHkoZSxyKX1yZXR1cm4gZX1mdW5jdGlvbiBUKHQpe2Zvcih2YXIgbj0xO248YXJndW1lbnRzLmxlbmd0aDtuKyspe3ZhciBlPW51bGwhPWFyZ3VtZW50c1tuXT9hcmd1bWVudHNbbl06e307biUyP1AoT2JqZWN0KGUpLCEwKS5mb3JFYWNoKChmdW5jdGlvbihuKXt4KHQsbixlW25dKX0pKTpPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycz9PYmplY3QuZGVmaW5lUHJvcGVydGllcyh0LE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKGUpKTpQKE9iamVjdChlKSkuZm9yRWFjaCgoZnVuY3Rpb24obil7T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbixPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGUsbikpfSkpfXJldHVybiB0fWZ1bmN0aW9uIHgodCxuLGUpe3JldHVybiBuIGluIHQ/T2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbix7dmFsdWU6ZSxlbnVtZXJhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMH0pOnRbbl09ZSx0fXZhciBBPW5ldyBvLmEsRT1vLmEuZmlsdGVycyxGPWZ1bmN0aW9uKHQsbixlLHIpe3ZhciBpPWFyZ3VtZW50cy5sZW5ndGg+NCYmdm9pZCAwIT09YXJndW1lbnRzWzRdP2FyZ3VtZW50c1s0XTowLHU9VCh7fSx0KSxhPU9iamVjdChvLmIpKHQscik7Zm9yKHZhciBjIGluIEEuX2ZpbHRlcnMubGVuZ3RoPTAsQS5zZXQoe30pLEEuX2N1cnJlbnRTdGF0ZT11LEEuX29yaWdpbmFsU3RhdGU9dCxBLl90YXJnZXRTdGF0ZT1uLEEuX2Vhc2luZz1hLEUpRVtjXS5kb2VzQXBwbHkoQSkmJkEuX2ZpbHRlcnMucHVzaChFW2NdKTtBLl9hcHBseUZpbHRlcihcInR3ZWVuQ3JlYXRlZFwiKSxBLl9hcHBseUZpbHRlcihcImJlZm9yZVR3ZWVuXCIpO3ZhciBzPU9iamVjdChvLmUpKGUsdSx0LG4sMSxpLGEpO3JldHVybiBBLl9hcHBseUZpbHRlcihcImFmdGVyVHdlZW5cIiksc307ZnVuY3Rpb24gSSh0KXtyZXR1cm4gZnVuY3Rpb24odCl7aWYoQXJyYXkuaXNBcnJheSh0KSlyZXR1cm4gQyh0KX0odCl8fGZ1bmN0aW9uKHQpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBTeW1ib2wmJlN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QodCkpcmV0dXJuIEFycmF5LmZyb20odCl9KHQpfHxmdW5jdGlvbih0LG4pe2lmKCF0KXJldHVybjtpZihcInN0cmluZ1wiPT10eXBlb2YgdClyZXR1cm4gQyh0LG4pO3ZhciBlPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KS5zbGljZSg4LC0xKTtcIk9iamVjdFwiPT09ZSYmdC5jb25zdHJ1Y3RvciYmKGU9dC5jb25zdHJ1Y3Rvci5uYW1lKTtpZihcIk1hcFwiPT09ZXx8XCJTZXRcIj09PWUpcmV0dXJuIEFycmF5LmZyb20odCk7aWYoXCJBcmd1bWVudHNcIj09PWV8fC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KGUpKXJldHVybiBDKHQsbil9KHQpfHxmdW5jdGlvbigpe3Rocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gc3ByZWFkIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpfSgpfWZ1bmN0aW9uIEModCxuKXsobnVsbD09bnx8bj50Lmxlbmd0aCkmJihuPXQubGVuZ3RoKTtmb3IodmFyIGU9MCxyPW5ldyBBcnJheShuKTtlPG47ZSsrKXJbZV09dFtlXTtyZXR1cm4gcn1mdW5jdGlvbiBxKHQsbil7aWYoISh0IGluc3RhbmNlb2YgbikpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX1mdW5jdGlvbiBEKHQsbil7Zm9yKHZhciBlPTA7ZTxuLmxlbmd0aDtlKyspe3ZhciByPW5bZV07ci5lbnVtZXJhYmxlPXIuZW51bWVyYWJsZXx8ITEsci5jb25maWd1cmFibGU9ITAsXCJ2YWx1ZVwiaW4gciYmKHIud3JpdGFibGU9ITApLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LHIua2V5LHIpfX1mdW5jdGlvbiBRKHQsbil7dmFyIGU9bi5nZXQodCk7aWYoIWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7cmV0dXJuIGUuZ2V0P2UuZ2V0LmNhbGwodCk6ZS52YWx1ZX12YXIgTj1uZXcgV2Vha01hcCxCPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCgpe3EodGhpcyx0KSxOLnNldCh0aGlzLHt3cml0YWJsZTohMCx2YWx1ZTpbXX0pO2Zvcih2YXIgbj1hcmd1bWVudHMubGVuZ3RoLGU9bmV3IEFycmF5KG4pLHI9MDtyPG47cisrKWVbcl09YXJndW1lbnRzW3JdO2UuZm9yRWFjaCh0aGlzLmFkZC5iaW5kKHRoaXMpKX12YXIgbixlLHI7cmV0dXJuIG49dCwoZT1be2tleTpcImFkZFwiLHZhbHVlOmZ1bmN0aW9uKHQpe3JldHVybiBRKHRoaXMsTikucHVzaCh0KSx0fX0se2tleTpcInJlbW92ZVwiLHZhbHVlOmZ1bmN0aW9uKHQpe3ZhciBuPVEodGhpcyxOKS5pbmRleE9mKHQpO3JldHVybn5uJiZRKHRoaXMsTikuc3BsaWNlKG4sMSksdH19LHtrZXk6XCJlbXB0eVwiLHZhbHVlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMudHdlZW5hYmxlcy5tYXAodGhpcy5yZW1vdmUuYmluZCh0aGlzKSl9fSx7a2V5OlwiaXNQbGF5aW5nXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gUSh0aGlzLE4pLnNvbWUoKGZ1bmN0aW9uKHQpe3JldHVybiB0LmlzUGxheWluZygpfSkpfX0se2tleTpcInBsYXlcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBRKHRoaXMsTikuZm9yRWFjaCgoZnVuY3Rpb24odCl7cmV0dXJuIHQudHdlZW4oKX0pKSx0aGlzfX0se2tleTpcInBhdXNlXCIsdmFsdWU6ZnVuY3Rpb24oKXtyZXR1cm4gUSh0aGlzLE4pLmZvckVhY2goKGZ1bmN0aW9uKHQpe3JldHVybiB0LnBhdXNlKCl9KSksdGhpc319LHtrZXk6XCJyZXN1bWVcIix2YWx1ZTpmdW5jdGlvbigpe3JldHVybiBRKHRoaXMsTikuZm9yRWFjaCgoZnVuY3Rpb24odCl7cmV0dXJuIHQucmVzdW1lKCl9KSksdGhpc319LHtrZXk6XCJzdG9wXCIsdmFsdWU6ZnVuY3Rpb24odCl7cmV0dXJuIFEodGhpcyxOKS5mb3JFYWNoKChmdW5jdGlvbihuKXtyZXR1cm4gbi5zdG9wKHQpfSkpLHRoaXN9fSx7a2V5OlwidHdlZW5hYmxlc1wiLGdldDpmdW5jdGlvbigpe3JldHVybiBJKFEodGhpcyxOKSl9fSx7a2V5OlwicHJvbWlzZXNcIixnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gUSh0aGlzLE4pLm1hcCgoZnVuY3Rpb24odCl7cmV0dXJuIHQuX3Byb21pc2V9KSl9fV0pJiZEKG4ucHJvdG90eXBlLGUpLHImJkQobixyKSx0fSgpO2Z1bmN0aW9uIFIodCxuLGUscixpLHUpe3ZhciBvLGEsYz0wLHM9MCxmPTAsbD0wLGg9MCxwPTAsZD1mdW5jdGlvbih0KXtyZXR1cm4oKGMqdCtzKSp0K2YpKnR9LF89ZnVuY3Rpb24odCl7cmV0dXJuKDMqYyp0KzIqcykqdCtmfSx2PWZ1bmN0aW9uKHQpe3JldHVybiB0Pj0wP3Q6MC10fTtyZXR1cm4gYz0xLShmPTMqbiktKHM9Myooci1uKS1mKSxsPTEtKHA9MyplKS0oaD0zKihpLWUpLXApLG89dCxhPWZ1bmN0aW9uKHQpe3JldHVybiAxLygyMDAqdCl9KHUpLGZ1bmN0aW9uKHQpe3JldHVybigobCp0K2gpKnQrcCkqdH0oZnVuY3Rpb24odCxuKXt2YXIgZSxyLGksdSxvLGE7Zm9yKGk9dCxhPTA7YTw4O2ErKyl7aWYodT1kKGkpLXQsdih1KTxuKXJldHVybiBpO2lmKG89XyhpKSx2KG8pPDFlLTYpYnJlYWs7aS09dS9vfWlmKChpPXQpPChlPTApKXJldHVybiBlO2lmKGk+KHI9MSkpcmV0dXJuIHI7Zm9yKDtlPHI7KXtpZih1PWQoaSksdih1LXQpPG4pcmV0dXJuIGk7dD51P2U9aTpyPWksaT0uNSooci1lKStlfXJldHVybiBpfShvLGEpKX12YXIgej1mdW5jdGlvbih0LG4sZSxyLGkpe3ZhciB1PWZ1bmN0aW9uKHQsbixlLHIpe3JldHVybiBmdW5jdGlvbihpKXtyZXR1cm4gUihpLHQsbixlLHIsMSl9fShuLGUscixpKTtyZXR1cm4gdS5kaXNwbGF5TmFtZT10LHUueDE9bix1LnkxPWUsdS54Mj1yLHUueTI9aSxvLmEuZm9ybXVsYXNbdF09dX0sTD1mdW5jdGlvbih0KXtyZXR1cm4gZGVsZXRlIG8uYS5mb3JtdWxhc1t0XX07by5hLmZpbHRlcnMudG9rZW49cn1dKX0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNoaWZ0eS5qcy5tYXAiLCIvLyBVdGlsaXR5IGZ1bmN0aW9uc1xuXG52YXIgUFJFRklYRVMgPSAnV2Via2l0IE1veiBPIG1zJy5zcGxpdCgnICcpO1xudmFyIEZMT0FUX0NPTVBBUklTT05fRVBTSUxPTiA9IDAuMDAxO1xuXG4vLyBDb3B5IGFsbCBhdHRyaWJ1dGVzIGZyb20gc291cmNlIG9iamVjdCB0byBkZXN0aW5hdGlvbiBvYmplY3QuXG4vLyBkZXN0aW5hdGlvbiBvYmplY3QgaXMgbXV0YXRlZC5cbmZ1bmN0aW9uIGV4dGVuZChkZXN0aW5hdGlvbiwgc291cmNlLCByZWN1cnNpdmUpIHtcbiAgICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uIHx8IHt9O1xuICAgIHNvdXJjZSA9IHNvdXJjZSB8fCB7fTtcbiAgICByZWN1cnNpdmUgPSByZWN1cnNpdmUgfHwgZmFsc2U7XG5cbiAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgIHZhciBkZXN0VmFsID0gZGVzdGluYXRpb25bYXR0ck5hbWVdO1xuICAgICAgICAgICAgdmFyIHNvdXJjZVZhbCA9IHNvdXJjZVthdHRyTmFtZV07XG4gICAgICAgICAgICBpZiAocmVjdXJzaXZlICYmIGlzT2JqZWN0KGRlc3RWYWwpICYmIGlzT2JqZWN0KHNvdXJjZVZhbCkpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblthdHRyTmFtZV0gPSBleHRlbmQoZGVzdFZhbCwgc291cmNlVmFsLCByZWN1cnNpdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblthdHRyTmFtZV0gPSBzb3VyY2VWYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVzdGluYXRpb247XG59XG5cbi8vIFJlbmRlcnMgdGVtcGxhdGVzIHdpdGggZ2l2ZW4gdmFyaWFibGVzLiBWYXJpYWJsZXMgbXVzdCBiZSBzdXJyb3VuZGVkIHdpdGhcbi8vIGJyYWNlcyB3aXRob3V0IGFueSBzcGFjZXMsIGUuZy4ge3ZhcmlhYmxlfVxuLy8gQWxsIGluc3RhbmNlcyBvZiB2YXJpYWJsZSBwbGFjZWhvbGRlcnMgd2lsbCBiZSByZXBsYWNlZCB3aXRoIGdpdmVuIGNvbnRlbnRcbi8vIEV4YW1wbGU6XG4vLyByZW5kZXIoJ0hlbGxvLCB7bWVzc2FnZX0hJywge21lc3NhZ2U6ICd3b3JsZCd9KVxuZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2YXJzKSB7XG4gICAgdmFyIHJlbmRlcmVkID0gdGVtcGxhdGU7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gdmFycykge1xuICAgICAgICBpZiAodmFycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gdmFyc1trZXldO1xuICAgICAgICAgICAgdmFyIHJlZ0V4cFN0cmluZyA9ICdcXFxceycgKyBrZXkgKyAnXFxcXH0nO1xuICAgICAgICAgICAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAocmVnRXhwU3RyaW5nLCAnZycpO1xuXG4gICAgICAgICAgICByZW5kZXJlZCA9IHJlbmRlcmVkLnJlcGxhY2UocmVnRXhwLCB2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlcmVkO1xufVxuXG5mdW5jdGlvbiBzZXRTdHlsZShlbGVtZW50LCBzdHlsZSwgdmFsdWUpIHtcbiAgICB2YXIgZWxTdHlsZSA9IGVsZW1lbnQuc3R5bGU7ICAvLyBjYWNoZSBmb3IgcGVyZm9ybWFuY2VcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgUFJFRklYRVMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHByZWZpeCA9IFBSRUZJWEVTW2ldO1xuICAgICAgICBlbFN0eWxlW3ByZWZpeCArIGNhcGl0YWxpemUoc3R5bGUpXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGVsU3R5bGVbc3R5bGVdID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlcyhlbGVtZW50LCBzdHlsZXMpIHtcbiAgICBmb3JFYWNoT2JqZWN0KHN0eWxlcywgZnVuY3Rpb24oc3R5bGVWYWx1ZSwgc3R5bGVOYW1lKSB7XG4gICAgICAgIC8vIEFsbG93IGRpc2FibGluZyBzb21lIGluZGl2aWR1YWwgc3R5bGVzIGJ5IHNldHRpbmcgdGhlbVxuICAgICAgICAvLyB0byBudWxsIG9yIHVuZGVmaW5lZFxuICAgICAgICBpZiAoc3R5bGVWYWx1ZSA9PT0gbnVsbCB8fCBzdHlsZVZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHN0eWxlJ3MgdmFsdWUgaXMge3ByZWZpeDogdHJ1ZSwgdmFsdWU6ICc1MCUnfSxcbiAgICAgICAgLy8gU2V0IGFsc28gYnJvd3NlciBwcmVmaXhlZCBzdHlsZXNcbiAgICAgICAgaWYgKGlzT2JqZWN0KHN0eWxlVmFsdWUpICYmIHN0eWxlVmFsdWUucHJlZml4ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzZXRTdHlsZShlbGVtZW50LCBzdHlsZU5hbWUsIHN0eWxlVmFsdWUudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtzdHlsZU5hbWVdID0gc3R5bGVWYWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRleHQuc2xpY2UoMSk7XG59XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCBvYmogaW5zdGFuY2VvZiBTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vLyBSZXR1cm5zIHRydWUgaWYgYG9iamAgaXMgb2JqZWN0IGFzIGluIHthOiAxLCBiOiAyfSwgbm90IGlmIGl0J3MgZnVuY3Rpb24gb3Jcbi8vIGFycmF5XG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgcmV0dXJuIHR5cGUgPT09ICdvYmplY3QnICYmICEhb2JqO1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoT2JqZWN0KG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgY2FsbGJhY2sodmFsLCBrZXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBmbG9hdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8IEZMT0FUX0NPTVBBUklTT05fRVBTSUxPTjtcbn1cblxuLy8gaHR0cHM6Ly9jb2RlcndhbGwuY29tL3AvbnlnZ2h3L2Rvbi10LXVzZS1pbm5lcmh0bWwtdG8tZW1wdHktZG9tLWVsZW1lbnRzXG5mdW5jdGlvbiByZW1vdmVDaGlsZHJlbihlbCkge1xuICAgIHdoaWxlIChlbC5maXJzdENoaWxkKSB7XG4gICAgICAgIGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgcmVuZGVyOiByZW5kZXIsXG4gICAgc2V0U3R5bGU6IHNldFN0eWxlLFxuICAgIHNldFN0eWxlczogc2V0U3R5bGVzLFxuICAgIGNhcGl0YWxpemU6IGNhcGl0YWxpemUsXG4gICAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICAgIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gICAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICAgIGZvckVhY2hPYmplY3Q6IGZvckVhY2hPYmplY3QsXG4gICAgZmxvYXRFcXVhbHM6IGZsb2F0RXF1YWxzLFxuICAgIHJlbW92ZUNoaWxkcmVuOiByZW1vdmVDaGlsZHJlblxufTtcbiIsIi8vIExvd2VyIGxldmVsIEFQSSB0byBhbmltYXRlIGFueSBraW5kIG9mIHN2ZyBwYXRoXG5cbnZhciBzaGlmdHkgPSByZXF1aXJlKCdzaGlmdHknKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIFR3ZWVuYWJsZSA9IHNoaWZ0eS5Ud2VlbmFibGU7XG5cbnZhciBFQVNJTkdfQUxJQVNFUyA9IHtcbiAgICBlYXNlSW46ICdlYXNlSW5DdWJpYycsXG4gICAgZWFzZU91dDogJ2Vhc2VPdXRDdWJpYycsXG4gICAgZWFzZUluT3V0OiAnZWFzZUluT3V0Q3ViaWMnXG59O1xuXG52YXIgUGF0aCA9IGZ1bmN0aW9uIFBhdGgocGF0aCwgb3B0cykge1xuICAgIC8vIFRocm93IGEgYmV0dGVyIGVycm9yIGlmIG5vdCBpbml0aWFsaXplZCB3aXRoIGBuZXdgIGtleXdvcmRcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUGF0aCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25zdHJ1Y3RvciB3YXMgY2FsbGVkIHdpdGhvdXQgbmV3IGtleXdvcmQnKTtcbiAgICB9XG5cbiAgICAvLyBEZWZhdWx0IHBhcmFtZXRlcnMgZm9yIGFuaW1hdGlvblxuICAgIG9wdHMgPSB1dGlscy5leHRlbmQoe1xuICAgICAgICBkZWxheTogMCxcbiAgICAgICAgZHVyYXRpb246IDgwMCxcbiAgICAgICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICAgICAgZnJvbToge30sXG4gICAgICAgIHRvOiB7fSxcbiAgICAgICAgc3RlcDogZnVuY3Rpb24oKSB7fVxuICAgIH0sIG9wdHMpO1xuXG4gICAgdmFyIGVsZW1lbnQ7XG4gICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQgPSBwYXRoO1xuICAgIH1cblxuICAgIC8vIFJldmVhbCAucGF0aCBhcyBwdWJsaWMgYXR0cmlidXRlXG4gICAgdGhpcy5wYXRoID0gZWxlbWVudDtcbiAgICB0aGlzLl9vcHRzID0gb3B0cztcbiAgICB0aGlzLl90d2VlbmFibGUgPSBudWxsO1xuXG4gICAgLy8gU2V0IHVwIHRoZSBzdGFydGluZyBwb3NpdGlvbnNcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5wYXRoLmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgdGhpcy5wYXRoLnN0eWxlLnN0cm9rZURhc2hhcnJheSA9IGxlbmd0aCArICcgJyArIGxlbmd0aDtcbiAgICB0aGlzLnNldCgwKTtcbn07XG5cblBhdGgucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gdmFsdWUoKSB7XG4gICAgdmFyIG9mZnNldCA9IHRoaXMuX2dldENvbXB1dGVkRGFzaE9mZnNldCgpO1xuICAgIHZhciBsZW5ndGggPSB0aGlzLnBhdGguZ2V0VG90YWxMZW5ndGgoKTtcblxuICAgIHZhciBwcm9ncmVzcyA9IDEgLSBvZmZzZXQgLyBsZW5ndGg7XG4gICAgLy8gUm91bmQgbnVtYmVyIHRvIHByZXZlbnQgcmV0dXJuaW5nIHZlcnkgc21hbGwgbnVtYmVyIGxpa2UgMWUtMzAsIHdoaWNoXG4gICAgLy8gaXMgcHJhY3RpY2FsbHkgMFxuICAgIHJldHVybiBwYXJzZUZsb2F0KHByb2dyZXNzLnRvRml4ZWQoNiksIDEwKTtcbn07XG5cblBhdGgucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChwcm9ncmVzcykge1xuICAgIHRoaXMuc3RvcCgpO1xuXG4gICAgdGhpcy5wYXRoLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSB0aGlzLl9wcm9ncmVzc1RvT2Zmc2V0KHByb2dyZXNzKTtcblxuICAgIHZhciBzdGVwID0gdGhpcy5fb3B0cy5zdGVwO1xuICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHN0ZXApKSB7XG4gICAgICAgIHZhciBlYXNpbmcgPSB0aGlzLl9lYXNpbmcodGhpcy5fb3B0cy5lYXNpbmcpO1xuICAgICAgICB2YXIgdmFsdWVzID0gdGhpcy5fY2FsY3VsYXRlVG8ocHJvZ3Jlc3MsIGVhc2luZyk7XG4gICAgICAgIHZhciByZWZlcmVuY2UgPSB0aGlzLl9vcHRzLnNoYXBlIHx8IHRoaXM7XG4gICAgICAgIHN0ZXAodmFsdWVzLCByZWZlcmVuY2UsIHRoaXMuX29wdHMuYXR0YWNobWVudCk7XG4gICAgfVxufTtcblxuUGF0aC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgdGhpcy5fc3RvcFR3ZWVuKCk7XG4gICAgdGhpcy5wYXRoLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSB0aGlzLl9nZXRDb21wdXRlZERhc2hPZmZzZXQoKTtcbn07XG5cbi8vIE1ldGhvZCBpbnRyb2R1Y2VkIGhlcmU6XG4vLyBodHRwOi8vamFrZWFyY2hpYmFsZC5jb20vMjAxMy9hbmltYXRlZC1saW5lLWRyYXdpbmctc3ZnL1xuUGF0aC5wcm90b3R5cGUuYW5pbWF0ZSA9IGZ1bmN0aW9uIGFuaW1hdGUocHJvZ3Jlc3MsIG9wdHMsIGNiKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihvcHRzKSkge1xuICAgICAgICBjYiA9IG9wdHM7XG4gICAgICAgIG9wdHMgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgcGFzc2VkT3B0cyA9IHV0aWxzLmV4dGVuZCh7fSwgb3B0cyk7XG5cbiAgICAvLyBDb3B5IGRlZmF1bHQgb3B0cyB0byBuZXcgb2JqZWN0IHNvIGRlZmF1bHRzIGFyZSBub3QgbW9kaWZpZWRcbiAgICB2YXIgZGVmYXVsdE9wdHMgPSB1dGlscy5leHRlbmQoe30sIHRoaXMuX29wdHMpO1xuICAgIG9wdHMgPSB1dGlscy5leHRlbmQoZGVmYXVsdE9wdHMsIG9wdHMpO1xuXG4gICAgdmFyIHNoaWZ0eUVhc2luZyA9IHRoaXMuX2Vhc2luZyhvcHRzLmVhc2luZyk7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuX3Jlc29sdmVGcm9tQW5kVG8ocHJvZ3Jlc3MsIHNoaWZ0eUVhc2luZywgcGFzc2VkT3B0cyk7XG5cbiAgICB0aGlzLnN0b3AoKTtcblxuICAgIC8vIFRyaWdnZXIgYSBsYXlvdXQgc28gc3R5bGVzIGFyZSBjYWxjdWxhdGVkICYgdGhlIGJyb3dzZXJcbiAgICAvLyBwaWNrcyB1cCB0aGUgc3RhcnRpbmcgcG9zaXRpb24gYmVmb3JlIGFuaW1hdGluZ1xuICAgIHRoaXMucGF0aC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHZhciBvZmZzZXQgPSB0aGlzLl9nZXRDb21wdXRlZERhc2hPZmZzZXQoKTtcbiAgICB2YXIgbmV3T2Zmc2V0ID0gdGhpcy5fcHJvZ3Jlc3NUb09mZnNldChwcm9ncmVzcyk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5fdHdlZW5hYmxlID0gbmV3IFR3ZWVuYWJsZSgpO1xuICAgIHRoaXMuX3R3ZWVuYWJsZS50d2Vlbih7XG4gICAgICAgIGZyb206IHV0aWxzLmV4dGVuZCh7IG9mZnNldDogb2Zmc2V0IH0sIHZhbHVlcy5mcm9tKSxcbiAgICAgICAgdG86IHV0aWxzLmV4dGVuZCh7IG9mZnNldDogbmV3T2Zmc2V0IH0sIHZhbHVlcy50byksXG4gICAgICAgIGR1cmF0aW9uOiBvcHRzLmR1cmF0aW9uLFxuICAgICAgICBkZWxheTogb3B0cy5kZWxheSxcbiAgICAgICAgZWFzaW5nOiBzaGlmdHlFYXNpbmcsXG4gICAgICAgIHN0ZXA6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgICBzZWxmLnBhdGguc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IHN0YXRlLm9mZnNldDtcbiAgICAgICAgICAgIHZhciByZWZlcmVuY2UgPSBvcHRzLnNoYXBlIHx8IHNlbGY7XG4gICAgICAgICAgICBvcHRzLnN0ZXAoc3RhdGUsIHJlZmVyZW5jZSwgb3B0cy5hdHRhY2htZW50KTtcbiAgICAgICAgfVxuICAgIH0pLnRoZW4oZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24oY2IpKSB7XG4gICAgICAgICAgICBjYigpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5QYXRoLnByb3RvdHlwZS5fZ2V0Q29tcHV0ZWREYXNoT2Zmc2V0ID0gZnVuY3Rpb24gX2dldENvbXB1dGVkRGFzaE9mZnNldCgpIHtcbiAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMucGF0aCwgbnVsbCk7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdzdHJva2UtZGFzaG9mZnNldCcpLCAxMCk7XG59O1xuXG5QYXRoLnByb3RvdHlwZS5fcHJvZ3Jlc3NUb09mZnNldCA9IGZ1bmN0aW9uIF9wcm9ncmVzc1RvT2Zmc2V0KHByb2dyZXNzKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMucGF0aC5nZXRUb3RhbExlbmd0aCgpO1xuICAgIHJldHVybiBsZW5ndGggLSBwcm9ncmVzcyAqIGxlbmd0aDtcbn07XG5cbi8vIFJlc29sdmVzIGZyb20gYW5kIHRvIHZhbHVlcyBmb3IgYW5pbWF0aW9uLlxuUGF0aC5wcm90b3R5cGUuX3Jlc29sdmVGcm9tQW5kVG8gPSBmdW5jdGlvbiBfcmVzb2x2ZUZyb21BbmRUbyhwcm9ncmVzcywgZWFzaW5nLCBvcHRzKSB7XG4gICAgaWYgKG9wdHMuZnJvbSAmJiBvcHRzLnRvKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmcm9tOiBvcHRzLmZyb20sXG4gICAgICAgICAgICB0bzogb3B0cy50b1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGZyb206IHRoaXMuX2NhbGN1bGF0ZUZyb20oZWFzaW5nKSxcbiAgICAgICAgdG86IHRoaXMuX2NhbGN1bGF0ZVRvKHByb2dyZXNzLCBlYXNpbmcpXG4gICAgfTtcbn07XG5cbi8vIENhbGN1bGF0ZSBgZnJvbWAgdmFsdWVzIGZyb20gb3B0aW9ucyBwYXNzZWQgYXQgaW5pdGlhbGl6YXRpb25cblBhdGgucHJvdG90eXBlLl9jYWxjdWxhdGVGcm9tID0gZnVuY3Rpb24gX2NhbGN1bGF0ZUZyb20oZWFzaW5nKSB7XG4gICAgcmV0dXJuIHNoaWZ0eS5pbnRlcnBvbGF0ZSh0aGlzLl9vcHRzLmZyb20sIHRoaXMuX29wdHMudG8sIHRoaXMudmFsdWUoKSwgZWFzaW5nKTtcbn07XG5cbi8vIENhbGN1bGF0ZSBgdG9gIHZhbHVlcyBmcm9tIG9wdGlvbnMgcGFzc2VkIGF0IGluaXRpYWxpemF0aW9uXG5QYXRoLnByb3RvdHlwZS5fY2FsY3VsYXRlVG8gPSBmdW5jdGlvbiBfY2FsY3VsYXRlVG8ocHJvZ3Jlc3MsIGVhc2luZykge1xuICAgIHJldHVybiBzaGlmdHkuaW50ZXJwb2xhdGUodGhpcy5fb3B0cy5mcm9tLCB0aGlzLl9vcHRzLnRvLCBwcm9ncmVzcywgZWFzaW5nKTtcbn07XG5cblBhdGgucHJvdG90eXBlLl9zdG9wVHdlZW4gPSBmdW5jdGlvbiBfc3RvcFR3ZWVuKCkge1xuICAgIGlmICh0aGlzLl90d2VlbmFibGUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fdHdlZW5hYmxlLnN0b3AoKTtcbiAgICAgICAgdGhpcy5fdHdlZW5hYmxlID0gbnVsbDtcbiAgICB9XG59O1xuXG5QYXRoLnByb3RvdHlwZS5fZWFzaW5nID0gZnVuY3Rpb24gX2Vhc2luZyhlYXNpbmcpIHtcbiAgICBpZiAoRUFTSU5HX0FMSUFTRVMuaGFzT3duUHJvcGVydHkoZWFzaW5nKSkge1xuICAgICAgICByZXR1cm4gRUFTSU5HX0FMSUFTRVNbZWFzaW5nXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWFzaW5nO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXRoO1xuIiwiLy8gQmFzZSBvYmplY3QgZm9yIGRpZmZlcmVudCBwcm9ncmVzcyBiYXIgc2hhcGVzXG5cbnZhciBQYXRoID0gcmVxdWlyZSgnLi9wYXRoJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBERVNUUk9ZRURfRVJST1IgPSAnT2JqZWN0IGlzIGRlc3Ryb3llZCc7XG5cbnZhciBTaGFwZSA9IGZ1bmN0aW9uIFNoYXBlKGNvbnRhaW5lciwgb3B0cykge1xuICAgIC8vIFRocm93IGEgYmV0dGVyIGVycm9yIGlmIHByb2dyZXNzIGJhcnMgYXJlIG5vdCBpbml0aWFsaXplZCB3aXRoIGBuZXdgXG4gICAgLy8ga2V5d29yZFxuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTaGFwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25zdHJ1Y3RvciB3YXMgY2FsbGVkIHdpdGhvdXQgbmV3IGtleXdvcmQnKTtcbiAgICB9XG5cbiAgICAvLyBQcmV2ZW50IGNhbGxpbmcgY29uc3RydWN0b3Igd2l0aG91dCBwYXJhbWV0ZXJzIHNvIGluaGVyaXRhbmNlXG4gICAgLy8gd29ya3MgY29ycmVjdGx5LiBUbyB1bmRlcnN0YW5kLCB0aGlzIGlzIGhvdyBTaGFwZSBpcyBpbmhlcml0ZWQ6XG4gICAgLy9cbiAgICAvLyAgIExpbmUucHJvdG90eXBlID0gbmV3IFNoYXBlKCk7XG4gICAgLy9cbiAgICAvLyBXZSBqdXN0IHdhbnQgdG8gc2V0IHRoZSBwcm90b3R5cGUgZm9yIExpbmUuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgcGFyYW1ldGVycyBmb3IgcHJvZ3Jlc3MgYmFyIGNyZWF0aW9uXG4gICAgdGhpcy5fb3B0cyA9IHV0aWxzLmV4dGVuZCh7XG4gICAgICAgIGNvbG9yOiAnIzU1NScsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLjAsXG4gICAgICAgIHRyYWlsQ29sb3I6IG51bGwsXG4gICAgICAgIHRyYWlsV2lkdGg6IG51bGwsXG4gICAgICAgIGZpbGw6IG51bGwsXG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgY29sb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgICAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHtcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0b1N0eWxlQ29udGFpbmVyOiB0cnVlLFxuICAgICAgICAgICAgYWxpZ25Ub0JvdHRvbTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAncHJvZ3Jlc3NiYXItdGV4dCdcbiAgICAgICAgfSxcbiAgICAgICAgc3ZnU3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnXG4gICAgICAgIH0sXG4gICAgICAgIHdhcm5pbmdzOiBmYWxzZVxuICAgIH0sIG9wdHMsIHRydWUpOyAgLy8gVXNlIHJlY3Vyc2l2ZSBleHRlbmRcblxuICAgIC8vIElmIHVzZXIgc3BlY2lmaWVzIGUuZy4gc3ZnU3R5bGUgb3IgdGV4dCBzdHlsZSwgdGhlIHdob2xlIG9iamVjdFxuICAgIC8vIHNob3VsZCByZXBsYWNlIHRoZSBkZWZhdWx0cyB0byBtYWtlIHdvcmtpbmcgd2l0aCBzdHlsZXMgZWFzaWVyXG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KG9wdHMpICYmIG9wdHMuc3ZnU3R5bGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9vcHRzLnN2Z1N0eWxlID0gb3B0cy5zdmdTdHlsZTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KG9wdHMpICYmIHV0aWxzLmlzT2JqZWN0KG9wdHMudGV4dCkgJiYgb3B0cy50ZXh0LnN0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fb3B0cy50ZXh0LnN0eWxlID0gb3B0cy50ZXh0LnN0eWxlO1xuICAgIH1cblxuICAgIHZhciBzdmdWaWV3ID0gdGhpcy5fY3JlYXRlU3ZnVmlldyh0aGlzLl9vcHRzKTtcblxuICAgIHZhciBlbGVtZW50O1xuICAgIGlmICh1dGlscy5pc1N0cmluZyhjb250YWluZXIpKSB7XG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudCA9IGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250YWluZXIgZG9lcyBub3QgZXhpc3Q6ICcgKyBjb250YWluZXIpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbnRhaW5lciA9IGVsZW1lbnQ7XG4gICAgdGhpcy5fY29udGFpbmVyLmFwcGVuZENoaWxkKHN2Z1ZpZXcuc3ZnKTtcbiAgICBpZiAodGhpcy5fb3B0cy53YXJuaW5ncykge1xuICAgICAgICB0aGlzLl93YXJuQ29udGFpbmVyQXNwZWN0UmF0aW8odGhpcy5fY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fb3B0cy5zdmdTdHlsZSkge1xuICAgICAgICB1dGlscy5zZXRTdHlsZXMoc3ZnVmlldy5zdmcsIHRoaXMuX29wdHMuc3ZnU3R5bGUpO1xuICAgIH1cblxuICAgIC8vIEV4cG9zZSBwdWJsaWMgYXR0cmlidXRlcyBiZWZvcmUgUGF0aCBpbml0aWFsaXphdGlvblxuICAgIHRoaXMuc3ZnID0gc3ZnVmlldy5zdmc7XG4gICAgdGhpcy5wYXRoID0gc3ZnVmlldy5wYXRoO1xuICAgIHRoaXMudHJhaWwgPSBzdmdWaWV3LnRyYWlsO1xuICAgIHRoaXMudGV4dCA9IG51bGw7XG5cbiAgICB2YXIgbmV3T3B0cyA9IHV0aWxzLmV4dGVuZCh7XG4gICAgICAgIGF0dGFjaG1lbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgc2hhcGU6IHRoaXNcbiAgICB9LCB0aGlzLl9vcHRzKTtcbiAgICB0aGlzLl9wcm9ncmVzc1BhdGggPSBuZXcgUGF0aChzdmdWaWV3LnBhdGgsIG5ld09wdHMpO1xuXG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdHMudGV4dCkgJiYgdGhpcy5fb3B0cy50ZXh0LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuc2V0VGV4dCh0aGlzLl9vcHRzLnRleHQudmFsdWUpO1xuICAgIH1cbn07XG5cblNoYXBlLnByb3RvdHlwZS5hbmltYXRlID0gZnVuY3Rpb24gYW5pbWF0ZShwcm9ncmVzcywgb3B0cywgY2IpIHtcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihERVNUUk9ZRURfRVJST1IpO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb2dyZXNzUGF0aC5hbmltYXRlKHByb2dyZXNzLCBvcHRzLCBjYik7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoREVTVFJPWUVEX0VSUk9SKTtcbiAgICB9XG5cbiAgICAvLyBEb24ndCBjcmFzaCBpZiBzdG9wIGlzIGNhbGxlZCBpbnNpZGUgc3RlcCBmdW5jdGlvblxuICAgIGlmICh0aGlzLl9wcm9ncmVzc1BhdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcHJvZ3Jlc3NQYXRoLnN0b3AoKTtcbn07XG5cblNoYXBlLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgIGlmICh0aGlzLl9wcm9ncmVzc1BhdGggPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKERFU1RST1lFRF9FUlJPUik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzUGF0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX3Byb2dyZXNzUGF0aC5fdHdlZW5hYmxlKSB7XG4gICAgICAgIC8vIEl0IHNlZW1zIHRoYXQgd2UgY2FuJ3QgcGF1c2UgdGhpc1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcHJvZ3Jlc3NQYXRoLl90d2VlbmFibGUucGF1c2UoKTtcbn07XG5cblNoYXBlLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiByZXN1bWUoKSB7XG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoREVTVFJPWUVEX0VSUk9SKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fcHJvZ3Jlc3NQYXRoLl90d2VlbmFibGUpIHtcbiAgICAgICAgLy8gSXQgc2VlbXMgdGhhdCB3ZSBjYW4ndCByZXN1bWUgdGhpc1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcHJvZ3Jlc3NQYXRoLl90d2VlbmFibGUucmVzdW1lKCk7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoREVTVFJPWUVEX0VSUk9SKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0b3AoKTtcbiAgICB0aGlzLnN2Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc3ZnKTtcbiAgICB0aGlzLnN2ZyA9IG51bGw7XG4gICAgdGhpcy5wYXRoID0gbnVsbDtcbiAgICB0aGlzLnRyYWlsID0gbnVsbDtcbiAgICB0aGlzLl9wcm9ncmVzc1BhdGggPSBudWxsO1xuXG4gICAgaWYgKHRoaXMudGV4dCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnRleHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnRleHQpO1xuICAgICAgICB0aGlzLnRleHQgPSBudWxsO1xuICAgIH1cbn07XG5cblNoYXBlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiBzZXQocHJvZ3Jlc3MpIHtcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihERVNUUk9ZRURfRVJST1IpO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb2dyZXNzUGF0aC5zZXQocHJvZ3Jlc3MpO1xufTtcblxuU2hhcGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gdmFsdWUoKSB7XG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoREVTVFJPWUVEX0VSUk9SKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX3Byb2dyZXNzUGF0aC52YWx1ZSgpO1xufTtcblxuU2hhcGUucHJvdG90eXBlLnNldFRleHQgPSBmdW5jdGlvbiBzZXRUZXh0KG5ld1RleHQpIHtcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihERVNUUk9ZRURfRVJST1IpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnRleHQgPT09IG51bGwpIHtcbiAgICAgICAgLy8gQ3JlYXRlIG5ldyB0ZXh0IG5vZGVcbiAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy5fY3JlYXRlVGV4dENvbnRhaW5lcih0aGlzLl9vcHRzLCB0aGlzLl9jb250YWluZXIpO1xuICAgICAgICB0aGlzLl9jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy50ZXh0KTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgcHJldmlvdXMgdGV4dCBhbmQgYWRkIG5ld1xuICAgIGlmICh1dGlscy5pc09iamVjdChuZXdUZXh0KSkge1xuICAgICAgICB1dGlscy5yZW1vdmVDaGlsZHJlbih0aGlzLnRleHQpO1xuICAgICAgICB0aGlzLnRleHQuYXBwZW5kQ2hpbGQobmV3VGV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50ZXh0LmlubmVySFRNTCA9IG5ld1RleHQ7XG4gICAgfVxufTtcblxuU2hhcGUucHJvdG90eXBlLl9jcmVhdGVTdmdWaWV3ID0gZnVuY3Rpb24gX2NyZWF0ZVN2Z1ZpZXcob3B0cykge1xuICAgIHZhciBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpO1xuICAgIHRoaXMuX2luaXRpYWxpemVTdmcoc3ZnLCBvcHRzKTtcblxuICAgIHZhciB0cmFpbFBhdGggPSBudWxsO1xuICAgIC8vIEVhY2ggb3B0aW9uIGxpc3RlZCBpbiB0aGUgaWYgY29uZGl0aW9uIGFyZSAndHJpZ2dlcnMnIGZvciBjcmVhdGluZ1xuICAgIC8vIHRoZSB0cmFpbCBwYXRoXG4gICAgaWYgKG9wdHMudHJhaWxDb2xvciB8fCBvcHRzLnRyYWlsV2lkdGgpIHtcbiAgICAgICAgdHJhaWxQYXRoID0gdGhpcy5fY3JlYXRlVHJhaWwob3B0cyk7XG4gICAgICAgIHN2Zy5hcHBlbmRDaGlsZCh0cmFpbFBhdGgpO1xuICAgIH1cblxuICAgIHZhciBwYXRoID0gdGhpcy5fY3JlYXRlUGF0aChvcHRzKTtcbiAgICBzdmcuYXBwZW5kQ2hpbGQocGF0aCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzdmc6IHN2ZyxcbiAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgdHJhaWw6IHRyYWlsUGF0aFxuICAgIH07XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuX2luaXRpYWxpemVTdmcgPSBmdW5jdGlvbiBfaW5pdGlhbGl6ZVN2ZyhzdmcsIG9wdHMpIHtcbiAgICBzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAgMTAwJyk7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuX2NyZWF0ZVBhdGggPSBmdW5jdGlvbiBfY3JlYXRlUGF0aChvcHRzKSB7XG4gICAgdmFyIHBhdGhTdHJpbmcgPSB0aGlzLl9wYXRoU3RyaW5nKG9wdHMpO1xuICAgIHJldHVybiB0aGlzLl9jcmVhdGVQYXRoRWxlbWVudChwYXRoU3RyaW5nLCBvcHRzKTtcbn07XG5cblNoYXBlLnByb3RvdHlwZS5fY3JlYXRlVHJhaWwgPSBmdW5jdGlvbiBfY3JlYXRlVHJhaWwob3B0cykge1xuICAgIC8vIENyZWF0ZSBwYXRoIHN0cmluZyB3aXRoIG9yaWdpbmFsIHBhc3NlZCBvcHRpb25zXG4gICAgdmFyIHBhdGhTdHJpbmcgPSB0aGlzLl90cmFpbFN0cmluZyhvcHRzKTtcblxuICAgIC8vIFByZXZlbnQgbW9kaWZ5aW5nIG9yaWdpbmFsXG4gICAgdmFyIG5ld09wdHMgPSB1dGlscy5leHRlbmQoe30sIG9wdHMpO1xuXG4gICAgLy8gRGVmYXVsdHMgZm9yIHBhcmFtZXRlcnMgd2hpY2ggbW9kaWZ5IHRyYWlsIHBhdGhcbiAgICBpZiAoIW5ld09wdHMudHJhaWxDb2xvcikge1xuICAgICAgICBuZXdPcHRzLnRyYWlsQ29sb3IgPSAnI2VlZSc7XG4gICAgfVxuICAgIGlmICghbmV3T3B0cy50cmFpbFdpZHRoKSB7XG4gICAgICAgIG5ld09wdHMudHJhaWxXaWR0aCA9IG5ld09wdHMuc3Ryb2tlV2lkdGg7XG4gICAgfVxuXG4gICAgbmV3T3B0cy5jb2xvciA9IG5ld09wdHMudHJhaWxDb2xvcjtcbiAgICBuZXdPcHRzLnN0cm9rZVdpZHRoID0gbmV3T3B0cy50cmFpbFdpZHRoO1xuXG4gICAgLy8gV2hlbiB0cmFpbCBwYXRoIGlzIHNldCwgZmlsbCBtdXN0IGJlIHNldCBmb3IgaXQgaW5zdGVhZCBvZiB0aGVcbiAgICAvLyBhY3R1YWwgcGF0aCB0byBwcmV2ZW50IHRyYWlsIHN0cm9rZSBmcm9tIGNsaXBwaW5nXG4gICAgbmV3T3B0cy5maWxsID0gbnVsbDtcblxuICAgIHJldHVybiB0aGlzLl9jcmVhdGVQYXRoRWxlbWVudChwYXRoU3RyaW5nLCBuZXdPcHRzKTtcbn07XG5cblNoYXBlLnByb3RvdHlwZS5fY3JlYXRlUGF0aEVsZW1lbnQgPSBmdW5jdGlvbiBfY3JlYXRlUGF0aEVsZW1lbnQocGF0aFN0cmluZywgb3B0cykge1xuICAgIHZhciBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdwYXRoJyk7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBwYXRoU3RyaW5nKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgb3B0cy5jb2xvcik7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIG9wdHMuc3Ryb2tlV2lkdGgpO1xuXG4gICAgaWYgKG9wdHMuZmlsbCkge1xuICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZmlsbCcsIG9wdHMuZmlsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2ZpbGwtb3BhY2l0eScsICcwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGg7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuX2NyZWF0ZVRleHRDb250YWluZXIgPSBmdW5jdGlvbiBfY3JlYXRlVGV4dENvbnRhaW5lcihvcHRzLCBjb250YWluZXIpIHtcbiAgICB2YXIgdGV4dENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRleHRDb250YWluZXIuY2xhc3NOYW1lID0gb3B0cy50ZXh0LmNsYXNzTmFtZTtcblxuICAgIHZhciB0ZXh0U3R5bGUgPSBvcHRzLnRleHQuc3R5bGU7XG4gICAgaWYgKHRleHRTdHlsZSkge1xuICAgICAgICBpZiAob3B0cy50ZXh0LmF1dG9TdHlsZUNvbnRhaW5lcikge1xuICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICAgICAgfVxuXG4gICAgICAgIHV0aWxzLnNldFN0eWxlcyh0ZXh0Q29udGFpbmVyLCB0ZXh0U3R5bGUpO1xuICAgICAgICAvLyBEZWZhdWx0IHRleHQgY29sb3IgdG8gcHJvZ3Jlc3MgYmFyJ3MgY29sb3JcbiAgICAgICAgaWYgKCF0ZXh0U3R5bGUuY29sb3IpIHtcbiAgICAgICAgICAgIHRleHRDb250YWluZXIuc3R5bGUuY29sb3IgPSBvcHRzLmNvbG9yO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdGlhbGl6ZVRleHRDb250YWluZXIob3B0cywgY29udGFpbmVyLCB0ZXh0Q29udGFpbmVyKTtcbiAgICByZXR1cm4gdGV4dENvbnRhaW5lcjtcbn07XG5cbi8vIEdpdmUgY3VzdG9tIHNoYXBlcyBwb3NzaWJpbGl0eSB0byBtb2RpZnkgdGV4dCBlbGVtZW50XG5TaGFwZS5wcm90b3R5cGUuX2luaXRpYWxpemVUZXh0Q29udGFpbmVyID0gZnVuY3Rpb24ob3B0cywgY29udGFpbmVyLCBlbGVtZW50KSB7XG4gICAgLy8gQnkgZGVmYXVsdCwgbm8tb3BcbiAgICAvLyBDdXN0b20gc2hhcGVzIHNob3VsZCByZXNwZWN0IEFQSSBvcHRpb25zLCBzdWNoIGFzIHRleHQuc3R5bGVcbn07XG5cblNoYXBlLnByb3RvdHlwZS5fcGF0aFN0cmluZyA9IGZ1bmN0aW9uIF9wYXRoU3RyaW5nKG9wdHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJyaWRlIHRoaXMgZnVuY3Rpb24gZm9yIGVhY2ggcHJvZ3Jlc3MgYmFyJyk7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuX3RyYWlsU3RyaW5nID0gZnVuY3Rpb24gX3RyYWlsU3RyaW5nKG9wdHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ092ZXJyaWRlIHRoaXMgZnVuY3Rpb24gZm9yIGVhY2ggcHJvZ3Jlc3MgYmFyJyk7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuX3dhcm5Db250YWluZXJBc3BlY3RSYXRpbyA9IGZ1bmN0aW9uIF93YXJuQ29udGFpbmVyQXNwZWN0UmF0aW8oY29udGFpbmVyKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lckFzcGVjdFJhdGlvKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lciwgbnVsbCk7XG4gICAgdmFyIHdpZHRoID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJyksIDEwKTtcbiAgICB2YXIgaGVpZ2h0ID0gcGFyc2VGbG9hdChjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpLCAxMCk7XG4gICAgaWYgKCF1dGlscy5mbG9hdEVxdWFscyh0aGlzLmNvbnRhaW5lckFzcGVjdFJhdGlvLCB3aWR0aCAvIGhlaWdodCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgJ0luY29ycmVjdCBhc3BlY3QgcmF0aW8gb2YgY29udGFpbmVyJyxcbiAgICAgICAgICAgICcjJyArIGNvbnRhaW5lci5pZCxcbiAgICAgICAgICAgICdkZXRlY3RlZDonLFxuICAgICAgICAgICAgY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpICsgJyh3aWR0aCknLFxuICAgICAgICAgICAgJy8nLFxuICAgICAgICAgICAgY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKSArICcoaGVpZ2h0KScsXG4gICAgICAgICAgICAnPScsXG4gICAgICAgICAgICB3aWR0aCAvIGhlaWdodFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICdBc3BlY3QgcmF0aW8gb2Ygc2hvdWxkIGJlJyxcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyQXNwZWN0UmF0aW9cbiAgICAgICAgKTtcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoYXBlO1xuIiwiLy8gTGluZSBzaGFwZWQgcHJvZ3Jlc3MgYmFyXG5cbnZhciBTaGFwZSA9IHJlcXVpcmUoJy4vc2hhcGUnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIExpbmUgPSBmdW5jdGlvbiBMaW5lKGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIHRoaXMuX3BhdGhUZW1wbGF0ZSA9ICdNIDAse2NlbnRlcn0gTCAxMDAse2NlbnRlcn0nO1xuICAgIFNoYXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuXG5MaW5lLnByb3RvdHlwZSA9IG5ldyBTaGFwZSgpO1xuTGluZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBMaW5lO1xuXG5MaW5lLnByb3RvdHlwZS5faW5pdGlhbGl6ZVN2ZyA9IGZ1bmN0aW9uIF9pbml0aWFsaXplU3ZnKHN2Zywgb3B0cykge1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDEwMCAnICsgb3B0cy5zdHJva2VXaWR0aCk7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgncHJlc2VydmVBc3BlY3RSYXRpbycsICdub25lJyk7XG59O1xuXG5MaW5lLnByb3RvdHlwZS5fcGF0aFN0cmluZyA9IGZ1bmN0aW9uIF9wYXRoU3RyaW5nKG9wdHMpIHtcbiAgICByZXR1cm4gdXRpbHMucmVuZGVyKHRoaXMuX3BhdGhUZW1wbGF0ZSwge1xuICAgICAgICBjZW50ZXI6IG9wdHMuc3Ryb2tlV2lkdGggLyAyXG4gICAgfSk7XG59O1xuXG5MaW5lLnByb3RvdHlwZS5fdHJhaWxTdHJpbmcgPSBmdW5jdGlvbiBfdHJhaWxTdHJpbmcob3B0cykge1xuICAgIHJldHVybiB0aGlzLl9wYXRoU3RyaW5nKG9wdHMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5lO1xuIiwiLy8gQ2lyY2xlIHNoYXBlZCBwcm9ncmVzcyBiYXJcblxudmFyIFNoYXBlID0gcmVxdWlyZSgnLi9zaGFwZScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgQ2lyY2xlID0gZnVuY3Rpb24gQ2lyY2xlKGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIC8vIFVzZSB0d28gYXJjcyB0byBmb3JtIGEgY2lyY2xlXG4gICAgLy8gU2VlIHRoaXMgYW5zd2VyIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEwNDc3MzM0LzE0NDYwOTJcbiAgICB0aGlzLl9wYXRoVGVtcGxhdGUgPVxuICAgICAgICAnTSA1MCw1MCBtIDAsLXtyYWRpdXN9JyArXG4gICAgICAgICcgYSB7cmFkaXVzfSx7cmFkaXVzfSAwIDEgMSAwLHsycmFkaXVzfScgK1xuICAgICAgICAnIGEge3JhZGl1c30se3JhZGl1c30gMCAxIDEgMCwtezJyYWRpdXN9JztcblxuICAgIHRoaXMuY29udGFpbmVyQXNwZWN0UmF0aW8gPSAxO1xuXG4gICAgU2hhcGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn07XG5cbkNpcmNsZS5wcm90b3R5cGUgPSBuZXcgU2hhcGUoKTtcbkNpcmNsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDaXJjbGU7XG5cbkNpcmNsZS5wcm90b3R5cGUuX3BhdGhTdHJpbmcgPSBmdW5jdGlvbiBfcGF0aFN0cmluZyhvcHRzKSB7XG4gICAgdmFyIHdpZHRoT2ZXaWRlciA9IG9wdHMuc3Ryb2tlV2lkdGg7XG4gICAgaWYgKG9wdHMudHJhaWxXaWR0aCAmJiBvcHRzLnRyYWlsV2lkdGggPiBvcHRzLnN0cm9rZVdpZHRoKSB7XG4gICAgICAgIHdpZHRoT2ZXaWRlciA9IG9wdHMudHJhaWxXaWR0aDtcbiAgICB9XG5cbiAgICB2YXIgciA9IDUwIC0gd2lkdGhPZldpZGVyIC8gMjtcblxuICAgIHJldHVybiB1dGlscy5yZW5kZXIodGhpcy5fcGF0aFRlbXBsYXRlLCB7XG4gICAgICAgIHJhZGl1czogcixcbiAgICAgICAgJzJyYWRpdXMnOiByICogMlxuICAgIH0pO1xufTtcblxuQ2lyY2xlLnByb3RvdHlwZS5fdHJhaWxTdHJpbmcgPSBmdW5jdGlvbiBfdHJhaWxTdHJpbmcob3B0cykge1xuICAgIHJldHVybiB0aGlzLl9wYXRoU3RyaW5nKG9wdHMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaXJjbGU7XG4iLCIvLyBTZW1pLVNlbWlDaXJjbGUgc2hhcGVkIHByb2dyZXNzIGJhclxuXG52YXIgU2hhcGUgPSByZXF1aXJlKCcuL3NoYXBlJyk7XG52YXIgQ2lyY2xlID0gcmVxdWlyZSgnLi9jaXJjbGUnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIFNlbWlDaXJjbGUgPSBmdW5jdGlvbiBTZW1pQ2lyY2xlKGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIC8vIFVzZSBvbmUgYXJjIHRvIGZvcm0gYSBTZW1pQ2lyY2xlXG4gICAgLy8gU2VlIHRoaXMgYW5zd2VyIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEwNDc3MzM0LzE0NDYwOTJcbiAgICB0aGlzLl9wYXRoVGVtcGxhdGUgPVxuICAgICAgICAnTSA1MCw1MCBtIC17cmFkaXVzfSwwJyArXG4gICAgICAgICcgYSB7cmFkaXVzfSx7cmFkaXVzfSAwIDEgMSB7MnJhZGl1c30sMCc7XG5cbiAgICB0aGlzLmNvbnRhaW5lckFzcGVjdFJhdGlvID0gMjtcblxuICAgIFNoYXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuXG5TZW1pQ2lyY2xlLnByb3RvdHlwZSA9IG5ldyBTaGFwZSgpO1xuU2VtaUNpcmNsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTZW1pQ2lyY2xlO1xuXG5TZW1pQ2lyY2xlLnByb3RvdHlwZS5faW5pdGlhbGl6ZVN2ZyA9IGZ1bmN0aW9uIF9pbml0aWFsaXplU3ZnKHN2Zywgb3B0cykge1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDEwMCA1MCcpO1xufTtcblxuU2VtaUNpcmNsZS5wcm90b3R5cGUuX2luaXRpYWxpemVUZXh0Q29udGFpbmVyID0gZnVuY3Rpb24gX2luaXRpYWxpemVUZXh0Q29udGFpbmVyKFxuICAgIG9wdHMsXG4gICAgY29udGFpbmVyLFxuICAgIHRleHRDb250YWluZXJcbikge1xuICAgIGlmIChvcHRzLnRleHQuc3R5bGUpIHtcbiAgICAgICAgLy8gUmVzZXQgdG9wIHN0eWxlXG4gICAgICAgIHRleHRDb250YWluZXIuc3R5bGUudG9wID0gJ2F1dG8nO1xuICAgICAgICB0ZXh0Q29udGFpbmVyLnN0eWxlLmJvdHRvbSA9ICcwJztcblxuICAgICAgICBpZiAob3B0cy50ZXh0LmFsaWduVG9Cb3R0b20pIHtcbiAgICAgICAgICAgIHV0aWxzLnNldFN0eWxlKHRleHRDb250YWluZXIsICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKC01MCUsIDApJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1dGlscy5zZXRTdHlsZSh0ZXh0Q29udGFpbmVyLCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgtNTAlLCA1MCUpJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vLyBTaGFyZSBmdW5jdGlvbmFsaXR5IHdpdGggQ2lyY2xlLCBqdXN0IGhhdmUgZGlmZmVyZW50IHBhdGhcblNlbWlDaXJjbGUucHJvdG90eXBlLl9wYXRoU3RyaW5nID0gQ2lyY2xlLnByb3RvdHlwZS5fcGF0aFN0cmluZztcblNlbWlDaXJjbGUucHJvdG90eXBlLl90cmFpbFN0cmluZyA9IENpcmNsZS5wcm90b3R5cGUuX3RyYWlsU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbWlDaXJjbGU7XG4iLCIvLyBTcXVhcmUgc2hhcGVkIHByb2dyZXNzIGJhclxuLy8gTm90ZTogU3F1YXJlIGlzIG5vdCBjb3JlIHBhcnQgb2YgQVBJIGFueW1vcmUuIEl0J3MgbGVmdCBoZXJlXG4vLyAgICAgICBmb3IgcmVmZXJlbmNlLiBzcXVhcmUgaXMgbm90IGluY2x1ZGVkIHRvIHRoZSBwcm9ncmVzc2JhclxuLy8gICAgICAgYnVpbGQgYW55bW9yZVxuXG52YXIgU2hhcGUgPSByZXF1aXJlKCcuL3NoYXBlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBTcXVhcmUgPSBmdW5jdGlvbiBTcXVhcmUoY29udGFpbmVyLCBvcHRpb25zKSB7XG4gICAgdGhpcy5fcGF0aFRlbXBsYXRlID1cbiAgICAgICAgJ00gMCx7aGFsZk9mU3Ryb2tlV2lkdGh9JyArXG4gICAgICAgICcgTCB7d2lkdGh9LHtoYWxmT2ZTdHJva2VXaWR0aH0nICtcbiAgICAgICAgJyBMIHt3aWR0aH0se3dpZHRofScgK1xuICAgICAgICAnIEwge2hhbGZPZlN0cm9rZVdpZHRofSx7d2lkdGh9JyArXG4gICAgICAgICcgTCB7aGFsZk9mU3Ryb2tlV2lkdGh9LHtzdHJva2VXaWR0aH0nO1xuXG4gICAgdGhpcy5fdHJhaWxUZW1wbGF0ZSA9XG4gICAgICAgICdNIHtzdGFydE1hcmdpbn0se2hhbGZPZlN0cm9rZVdpZHRofScgK1xuICAgICAgICAnIEwge3dpZHRofSx7aGFsZk9mU3Ryb2tlV2lkdGh9JyArXG4gICAgICAgICcgTCB7d2lkdGh9LHt3aWR0aH0nICtcbiAgICAgICAgJyBMIHtoYWxmT2ZTdHJva2VXaWR0aH0se3dpZHRofScgK1xuICAgICAgICAnIEwge2hhbGZPZlN0cm9rZVdpZHRofSx7aGFsZk9mU3Ryb2tlV2lkdGh9JztcblxuICAgIFNoYXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuXG5TcXVhcmUucHJvdG90eXBlID0gbmV3IFNoYXBlKCk7XG5TcXVhcmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3F1YXJlO1xuXG5TcXVhcmUucHJvdG90eXBlLl9wYXRoU3RyaW5nID0gZnVuY3Rpb24gX3BhdGhTdHJpbmcob3B0cykge1xuICAgIHZhciB3ID0gMTAwIC0gb3B0cy5zdHJva2VXaWR0aCAvIDI7XG5cbiAgICByZXR1cm4gdXRpbHMucmVuZGVyKHRoaXMuX3BhdGhUZW1wbGF0ZSwge1xuICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IG9wdHMuc3Ryb2tlV2lkdGgsXG4gICAgICAgIGhhbGZPZlN0cm9rZVdpZHRoOiBvcHRzLnN0cm9rZVdpZHRoIC8gMlxuICAgIH0pO1xufTtcblxuU3F1YXJlLnByb3RvdHlwZS5fdHJhaWxTdHJpbmcgPSBmdW5jdGlvbiBfdHJhaWxTdHJpbmcob3B0cykge1xuICAgIHZhciB3ID0gMTAwIC0gb3B0cy5zdHJva2VXaWR0aCAvIDI7XG5cbiAgICByZXR1cm4gdXRpbHMucmVuZGVyKHRoaXMuX3RyYWlsVGVtcGxhdGUsIHtcbiAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgIHN0cm9rZVdpZHRoOiBvcHRzLnN0cm9rZVdpZHRoLFxuICAgICAgICBoYWxmT2ZTdHJva2VXaWR0aDogb3B0cy5zdHJva2VXaWR0aCAvIDIsXG4gICAgICAgIHN0YXJ0TWFyZ2luOiBvcHRzLnN0cm9rZVdpZHRoIC8gMiAtIG9wdHMudHJhaWxXaWR0aCAvIDJcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3F1YXJlO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8gSGlnaGVyIGxldmVsIEFQSSwgZGlmZmVyZW50IHNoYXBlZCBwcm9ncmVzcyBiYXJzXG4gICAgTGluZTogcmVxdWlyZSgnLi9saW5lJyksXG4gICAgQ2lyY2xlOiByZXF1aXJlKCcuL2NpcmNsZScpLFxuICAgIFNlbWlDaXJjbGU6IHJlcXVpcmUoJy4vc2VtaWNpcmNsZScpLFxuICAgIFNxdWFyZTogcmVxdWlyZSgnLi9zcXVhcmUnKSxcblxuICAgIC8vIExvd2VyIGxldmVsIEFQSSB0byB1c2UgYW55IFNWRyBwYXRoXG4gICAgUGF0aDogcmVxdWlyZSgnLi9wYXRoJyksXG5cbiAgICAvLyBCYXNlLWNsYXNzIGZvciBjcmVhdGluZyBuZXcgY3VzdG9tIHNoYXBlc1xuICAgIC8vIHRvIGJlIGluIGxpbmUgd2l0aCB0aGUgQVBJIG9mIGJ1aWx0LWluIHNoYXBlc1xuICAgIC8vIFVuZG9jdW1lbnRlZC5cbiAgICBTaGFwZTogcmVxdWlyZSgnLi9zaGFwZScpLFxuXG4gICAgLy8gSW50ZXJuYWwgdXRpbHMsIHVuZG9jdW1lbnRlZC5cbiAgICB1dGlsczogcmVxdWlyZSgnLi91dGlscycpXG59O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVBlcmNlbnRhZ2UoY3VycmVudFZhbHVlOiBudW1iZXIsIG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGlmIChjdXJyZW50VmFsdWUgPCBtaW5WYWx1ZSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGN1cnJlbnRWYWx1ZSA+IG1heFZhbHVlKSB7XG4gICAgICAgIHJldHVybiAxMDA7XG4gICAgfVxuICAgIGNvbnN0IHJhbmdlID0gbWF4VmFsdWUgLSBtaW5WYWx1ZTtcbiAgICBjb25zdCBwZXJjZW50YWdlID0gTWF0aC5yb3VuZCgoKGN1cnJlbnRWYWx1ZSAtIG1pblZhbHVlKSAvIHJhbmdlKSAqIDEwMCk7XG4gICAgcmV0dXJuIE1hdGguYWJzKHBlcmNlbnRhZ2UpO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgQ1NTUHJvcGVydGllcywgRnVuY3Rpb25Db21wb25lbnQsIFJlYWN0Tm9kZSwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgeyBBbGVydCB9IGZyb20gXCJAbWVuZGl4L3Bpdy11dGlscy1pbnRlcm5hbFwiO1xuaW1wb3J0IHsgQ2lyY2xlLCBDaXJjbGVPcHRpb25zIH0gZnJvbSBcInByb2dyZXNzYmFyLmpzXCI7XG5pbXBvcnQgeyBjYWxjdWxhdGVQZXJjZW50YWdlIH0gZnJvbSBcIi4uL3V0aWxcIjtcblxuZXhwb3J0IGludGVyZmFjZSBQcm9ncmVzc0NpcmNsZVByb3BzIHtcbiAgICBjbGFzczogc3RyaW5nO1xuICAgIHN0eWxlPzogQ1NTUHJvcGVydGllcztcbiAgICBjdXJyZW50VmFsdWU6IG51bWJlcjtcbiAgICBtaW5WYWx1ZTogbnVtYmVyO1xuICAgIG1heFZhbHVlOiBudW1iZXI7XG4gICAgb25DbGljazogKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xuICAgIGxhYmVsOiBSZWFjdE5vZGU7XG59XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBDaXJjbGVPcHRpb25zID0ge1xuICAgIGR1cmF0aW9uOiA4MDAsXG4gICAgLy8gVGhlc2UgZGVmYXVsdCB2YWx1ZXMgYXJlIG5lY2Vzc2FyeSBzbyB0aGF0IHByb2dyZXNzYmFyLmpzIGF0IGxlYXN0IHJlbmRlcnMgYW55dGhpbmcsIHdoaWNoIHdlIG92ZXJyaWRlIHdpdGggY3VzdG9tIHN0eWxpbmcuXG4gICAgLy8gVGhleSBhbHNvIG5lZWQgdG8gYmUgZXF1YWwgdG8gdGhlIGxhcmdlc3Qgc2l6ZSB0aGF0IHdlIGhhdmUgYXZhaWxhYmxlLCBzaW5jZSB0aGF0IHdpbGwgZGV0ZXJtaW5lIHRoZSBzaXplIG9mIHRoZSBib3VuZGluZyBib3guXG4gICAgc3Ryb2tlV2lkdGg6IDE2LFxuICAgIHRyYWlsV2lkdGg6IDE2XG59O1xuXG5mdW5jdGlvbiBnZXRWYWx1ZXNFcnJvck1lc3NhZ2UoY3VycmVudFZhbHVlOiBudW1iZXIsIG1pblZhbHVlOiBudW1iZXIsIG1heFZhbHVlOiBudW1iZXIpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAobWF4VmFsdWUgPCBtaW5WYWx1ZSkge1xuICAgICAgICByZXR1cm4gXCJFcnJvciBpbiBwcm9ncmVzcyBjaXJjbGUgdmFsdWVzOiBUaGUgbWF4aW11bSB2YWx1ZSBpcyBsb3dlciB0aGFuIHRoZSBtaW5pbXVtIHZhbHVlLlwiO1xuICAgIH1cbiAgICBpZiAoY3VycmVudFZhbHVlIDwgbWluVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIFwiRXJyb3IgaW4gcHJvZ3Jlc3MgY2lyY2xlIHZhbHVlczogVGhlIHByb2dyZXNzIHZhbHVlIGlzIGxvd2VyIHRoYW4gdGhlIG1pbmltdW0gdmFsdWUuXCI7XG4gICAgfVxuICAgIGlmIChjdXJyZW50VmFsdWUgPiBtYXhWYWx1ZSkge1xuICAgICAgICByZXR1cm4gXCJFcnJvciBpbiBwcm9ncmVzcyBjaXJjbGUgdmFsdWVzOiBUaGUgcHJvZ3Jlc3MgdmFsdWUgaXMgaGlnaGVyIHRoYW4gdGhlIG1heGltdW0gdmFsdWUuXCI7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgY29uc3QgUHJvZ3Jlc3NDaXJjbGU6IEZ1bmN0aW9uQ29tcG9uZW50PFByb2dyZXNzQ2lyY2xlUHJvcHM+ID0gKHtcbiAgICBjbGFzczogY2xhc3NOYW1lLFxuICAgIHN0eWxlLFxuICAgIGN1cnJlbnRWYWx1ZSxcbiAgICBtaW5WYWx1ZSxcbiAgICBtYXhWYWx1ZSxcbiAgICBvbkNsaWNrLFxuICAgIGxhYmVsXG59KSA9PiB7XG4gICAgY29uc3QgW3Byb2dyZXNzQ2lyY2xlLCBzZXRQcm9ncmVzc0NpcmNsZV0gPSB1c2VTdGF0ZTxDaXJjbGU+KCk7XG4gICAgY29uc3QgYWxlcnRNZXNzYWdlID0gZ2V0VmFsdWVzRXJyb3JNZXNzYWdlKGN1cnJlbnRWYWx1ZSwgbWluVmFsdWUsIG1heFZhbHVlKTtcblxuICAgIGNvbnN0IHNldFByb2dyZXNzQ2lyY2xlRWxlbWVudCA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAobm9kZTogSFRNTERpdkVsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNpcmNsZUVsZW1lbnQgPSBuZXcgQ2lyY2xlKG5vZGUsIGRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICAgICAgICBjaXJjbGVFbGVtZW50LnBhdGguY2xhc3NOYW1lLmJhc2VWYWwgPSBcIndpZGdldC1wcm9ncmVzcy1jaXJjbGUtcGF0aFwiO1xuICAgICAgICAgICAgICAgIGNpcmNsZUVsZW1lbnQudHJhaWwuY2xhc3NOYW1lLmJhc2VWYWwgPSBcIndpZGdldC1wcm9ncmVzcy1jaXJjbGUtdHJhaWwtcGF0aFwiO1xuICAgICAgICAgICAgICAgIHNldFByb2dyZXNzQ2lyY2xlKGNpcmNsZUVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbc2V0UHJvZ3Jlc3NDaXJjbGVdXG4gICAgKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChwcm9ncmVzc0NpcmNsZSkge1xuICAgICAgICAgICAgY29uc3QgcGVyY2VudGFnZSA9IGNhbGN1bGF0ZVBlcmNlbnRhZ2UoY3VycmVudFZhbHVlLCBtaW5WYWx1ZSwgbWF4VmFsdWUpO1xuICAgICAgICAgICAgcHJvZ3Jlc3NDaXJjbGUuYW5pbWF0ZShwZXJjZW50YWdlIC8gMTAwKTtcbiAgICAgICAgfVxuICAgIH0sIFtjdXJyZW50VmFsdWUsIG1pblZhbHVlLCBtYXhWYWx1ZSwgcHJvZ3Jlc3NDaXJjbGVdKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBwcm9ncmVzc0NpcmNsZT8uZGVzdHJveSgpO1xuICAgICAgICB9O1xuICAgIH0sIFtwcm9ncmVzc0NpcmNsZV0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgIFwid2lkZ2V0LXByb2dyZXNzLWNpcmNsZVwiLFxuICAgICAgICAgICAgICAgIFwid2lkZ2V0LXByb2dyZXNzLWNpcmNsZS1wcmltYXJ5XCIsXG4gICAgICAgICAgICAgICAgXCJ3aWRnZXQtcHJvZ3Jlc3MtY2lyY2xlLXRoaWNrbmVzcy1tZWRpdW1cIixcbiAgICAgICAgICAgICAgICBjbGFzc05hbWVcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBzdHlsZT17c3R5bGV9XG4gICAgICAgID5cbiAgICAgICAgICAgIHthbGVydE1lc3NhZ2UgPyA8QWxlcnQgYm9vdHN0cmFwU3R5bGU9XCJkYW5nZXJcIj57YWxlcnRNZXNzYWdlfTwvQWxlcnQ+IDogbnVsbH1cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJoMlwiLCBcInByb2dyZXNzLWNpcmNsZS1sYWJlbC1jb250YWluZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICBcIndpZGdldC1wcm9ncmVzcy1jaXJjbGUtY2xpY2thYmxlXCI6ICEhb25DbGlja1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgICAgICAgcmVmPXtzZXRQcm9ncmVzc0NpcmNsZUVsZW1lbnR9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJwcm9ncmVzc2Jhci10ZXh0XCIpfT57bGFiZWx9PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn07XG4iLCJleHBvcnQgaW50ZXJmYWNlIFByb2dyZXNzQ2lyY2xlVmFsdWVzIHtcbiAgICBjdXJyZW50VmFsdWU6IG51bWJlcjtcbiAgICBtaW5WYWx1ZTogbnVtYmVyO1xuICAgIG1heFZhbHVlOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0VmFsdWVzOiBQcm9ncmVzc0NpcmNsZVZhbHVlcyA9IHtcbiAgICBjdXJyZW50VmFsdWU6IDUwLFxuICAgIG1pblZhbHVlOiAwLFxuICAgIG1heFZhbHVlOiAxMDBcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBGdW5jdGlvbkNvbXBvbmVudCwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFByb2dyZXNzQ2lyY2xlIGFzIFByb2dyZXNzQ2lyY2xlQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9Qcm9ncmVzc0NpcmNsZVwiO1xuaW1wb3J0IHsgUHJvZ3Jlc3NDaXJjbGVDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi90eXBpbmdzL1Byb2dyZXNzQ2lyY2xlUHJvcHNcIjtcbmltcG9ydCB7IGRlZmF1bHRWYWx1ZXMsIFByb2dyZXNzQ2lyY2xlVmFsdWVzIH0gZnJvbSBcIi4vcHJvZ3Jlc3NDaXJjbGVWYWx1ZXNcIjtcbmltcG9ydCB7IGNhbGN1bGF0ZVBlcmNlbnRhZ2UgfSBmcm9tIFwiLi91dGlsXCI7XG5cbmV4cG9ydCBjb25zdCBQcm9ncmVzc0NpcmNsZTogRnVuY3Rpb25Db21wb25lbnQ8UHJvZ3Jlc3NDaXJjbGVDb250YWluZXJQcm9wcz4gPSBwcm9wcyA9PiB7XG4gICAgZnVuY3Rpb24gZ2V0UHJvZ3Jlc3NDaXJjbGVWYWx1ZXMoKTogUHJvZ3Jlc3NDaXJjbGVWYWx1ZXMge1xuICAgICAgICBzd2l0Y2ggKHByb3BzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJkeW5hbWljXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFZhbHVlOiBOdW1iZXIocHJvcHMuZHluYW1pY0N1cnJlbnRWYWx1ZT8udmFsdWUgPz8gMCksXG4gICAgICAgICAgICAgICAgICAgIG1pblZhbHVlOiBOdW1iZXIocHJvcHMuZHluYW1pY01pblZhbHVlPy52YWx1ZSA/PyBkZWZhdWx0VmFsdWVzLm1pblZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgbWF4VmFsdWU6IE51bWJlcihwcm9wcy5keW5hbWljTWF4VmFsdWU/LnZhbHVlID8/IGRlZmF1bHRWYWx1ZXMubWF4VmFsdWUpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgXCJleHByZXNzaW9uXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFZhbHVlOiBOdW1iZXIocHJvcHMuZXhwcmVzc2lvbkN1cnJlbnRWYWx1ZT8udmFsdWUgPz8gMCksXG4gICAgICAgICAgICAgICAgICAgIG1pblZhbHVlOiBOdW1iZXIocHJvcHMuZXhwcmVzc2lvbk1pblZhbHVlPy52YWx1ZSA/PyBkZWZhdWx0VmFsdWVzLm1pblZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgbWF4VmFsdWU6IE51bWJlcihwcm9wcy5leHByZXNzaW9uTWF4VmFsdWU/LnZhbHVlID8/IGRlZmF1bHRWYWx1ZXMubWF4VmFsdWUpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNhc2UgXCJzdGF0aWNcIjpcbiAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IHZhbHVlcyBoZXJlIGFyZSBoYW5kbGVkIGJ5IHRoZSBgUHJvZ3Jlc3NCYXIueG1sYC5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWU6IHByb3BzLnN0YXRpY0N1cnJlbnRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWluVmFsdWU6IHByb3BzLnN0YXRpY01pblZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBtYXhWYWx1ZTogcHJvcHMuc3RhdGljTWF4VmFsdWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgb25DbGljayA9IHVzZUNhbGxiYWNrKCgpID0+IHByb3BzLm9uQ2xpY2s/LmV4ZWN1dGUoKSwgW3Byb3BzLm9uQ2xpY2tdKTtcbiAgICBjb25zdCB7IGN1cnJlbnRWYWx1ZSwgbWluVmFsdWUsIG1heFZhbHVlIH0gPSBnZXRQcm9ncmVzc0NpcmNsZVZhbHVlcygpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPFByb2dyZXNzQ2lyY2xlQ29tcG9uZW50XG4gICAgICAgICAgICBjbGFzcz17cHJvcHMuY2xhc3N9XG4gICAgICAgICAgICBzdHlsZT17cHJvcHMuc3R5bGV9XG4gICAgICAgICAgICBjdXJyZW50VmFsdWU9e2N1cnJlbnRWYWx1ZX1cbiAgICAgICAgICAgIG1pblZhbHVlPXttaW5WYWx1ZX1cbiAgICAgICAgICAgIG1heFZhbHVlPXttYXhWYWx1ZX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uQ2xpY2sgPyBvbkNsaWNrIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgbGFiZWw9e1xuICAgICAgICAgICAgICAgIHByb3BzLnNob3dMYWJlbFxuICAgICAgICAgICAgICAgICAgICA/IHByb3BzLmxhYmVsVHlwZSA9PT0gXCJjdXN0b21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgPyBwcm9wcy5jdXN0b21MYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBwcm9wcy5sYWJlbFR5cGUgPT09IFwicGVyY2VudGFnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGAke2NhbGN1bGF0ZVBlcmNlbnRhZ2UoY3VycmVudFZhbHVlLCBtaW5WYWx1ZSwgbWF4VmFsdWUpfSVgXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHByb3BzLmxhYmVsVGV4dD8udmFsdWVcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICB9XG4gICAgICAgIC8+XG4gICAgKTtcbn07XG4iXSwibmFtZXMiOlsiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJjbGFzc05hbWVzIiwiY2xhc3NlcyIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmciLCJhcmdUeXBlIiwicHVzaCIsIkFycmF5IiwiaXNBcnJheSIsImlubmVyIiwiYXBwbHkiLCJrZXkiLCJjYWxsIiwiam9pbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJkZWZhdWx0Iiwid2luZG93IiwiQWxlcnQiLCJjbGFzc05hbWUiLCJib290c3RyYXBTdHlsZSIsImNoaWxkcmVuIiwiQ2hpbGRyZW4iLCJjb3VudCIsImNyZWF0ZUVsZW1lbnQiLCJkaXNwbGF5TmFtZSIsIkZvcm1hdHRlclR5cGUiLCJyb290IiwiZmFjdG9yeSIsIlBSRUZJWEVTIiwic3BsaXQiLCJGTE9BVF9DT01QQVJJU09OX0VQU0lMT04iLCJleHRlbmQiLCJkZXN0aW5hdGlvbiIsInNvdXJjZSIsInJlY3Vyc2l2ZSIsImF0dHJOYW1lIiwiZGVzdFZhbCIsInNvdXJjZVZhbCIsImlzT2JqZWN0IiwicmVuZGVyIiwidGVtcGxhdGUiLCJ2YXJzIiwicmVuZGVyZWQiLCJ2YWwiLCJyZWdFeHBTdHJpbmciLCJyZWdFeHAiLCJSZWdFeHAiLCJyZXBsYWNlIiwic2V0U3R5bGUiLCJlbGVtZW50Iiwic3R5bGUiLCJ2YWx1ZSIsImVsU3R5bGUiLCJwcmVmaXgiLCJjYXBpdGFsaXplIiwic2V0U3R5bGVzIiwic3R5bGVzIiwiZm9yRWFjaE9iamVjdCIsInN0eWxlVmFsdWUiLCJzdHlsZU5hbWUiLCJ1bmRlZmluZWQiLCJ0ZXh0IiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsImlzU3RyaW5nIiwib2JqIiwiU3RyaW5nIiwiaXNGdW5jdGlvbiIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwidHlwZSIsIm9iamVjdCIsImNhbGxiYWNrIiwiZmxvYXRFcXVhbHMiLCJhIiwiYiIsIk1hdGgiLCJhYnMiLCJyZW1vdmVDaGlsZHJlbiIsImVsIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiVHdlZW5hYmxlIiwic2hpZnR5IiwiRUFTSU5HX0FMSUFTRVMiLCJlYXNlSW4iLCJlYXNlT3V0IiwiZWFzZUluT3V0IiwiUGF0aCIsInBhdGgiLCJvcHRzIiwiRXJyb3IiLCJ1dGlscyIsImRlbGF5IiwiZHVyYXRpb24iLCJlYXNpbmciLCJmcm9tIiwidG8iLCJzdGVwIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiX29wdHMiLCJfdHdlZW5hYmxlIiwiZ2V0VG90YWxMZW5ndGgiLCJzdHJva2VEYXNoYXJyYXkiLCJzZXQiLCJvZmZzZXQiLCJfZ2V0Q29tcHV0ZWREYXNoT2Zmc2V0IiwicHJvZ3Jlc3MiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsInN0b3AiLCJzdHJva2VEYXNob2Zmc2V0IiwiX3Byb2dyZXNzVG9PZmZzZXQiLCJfZWFzaW5nIiwidmFsdWVzIiwiX2NhbGN1bGF0ZVRvIiwicmVmZXJlbmNlIiwic2hhcGUiLCJhdHRhY2htZW50IiwiX3N0b3BUd2VlbiIsImFuaW1hdGUiLCJjYiIsInBhc3NlZE9wdHMiLCJkZWZhdWx0T3B0cyIsInNoaWZ0eUVhc2luZyIsIl9yZXNvbHZlRnJvbUFuZFRvIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwibmV3T2Zmc2V0Iiwic2VsZiIsInR3ZWVuIiwic3RhdGUiLCJ0aGVuIiwiY29tcHV0ZWRTdHlsZSIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiX2NhbGN1bGF0ZUZyb20iLCJpbnRlcnBvbGF0ZSIsIkRFU1RST1lFRF9FUlJPUiIsIlNoYXBlIiwiY29udGFpbmVyIiwiY29sb3IiLCJzdHJva2VXaWR0aCIsInRyYWlsQ29sb3IiLCJ0cmFpbFdpZHRoIiwiZmlsbCIsInBvc2l0aW9uIiwibGVmdCIsInRvcCIsInBhZGRpbmciLCJtYXJnaW4iLCJ0cmFuc2Zvcm0iLCJhdXRvU3R5bGVDb250YWluZXIiLCJhbGlnblRvQm90dG9tIiwic3ZnU3R5bGUiLCJkaXNwbGF5Iiwid2lkdGgiLCJ3YXJuaW5ncyIsInN2Z1ZpZXciLCJfY3JlYXRlU3ZnVmlldyIsIl9jb250YWluZXIiLCJhcHBlbmRDaGlsZCIsInN2ZyIsIl93YXJuQ29udGFpbmVyQXNwZWN0UmF0aW8iLCJ0cmFpbCIsIm5ld09wdHMiLCJfcHJvZ3Jlc3NQYXRoIiwic2V0VGV4dCIsInBhdXNlIiwicmVzdW1lIiwiZGVzdHJveSIsInBhcmVudE5vZGUiLCJuZXdUZXh0IiwiX2NyZWF0ZVRleHRDb250YWluZXIiLCJpbm5lckhUTUwiLCJjcmVhdGVFbGVtZW50TlMiLCJfaW5pdGlhbGl6ZVN2ZyIsInRyYWlsUGF0aCIsIl9jcmVhdGVUcmFpbCIsIl9jcmVhdGVQYXRoIiwic2V0QXR0cmlidXRlIiwicGF0aFN0cmluZyIsIl9wYXRoU3RyaW5nIiwiX2NyZWF0ZVBhdGhFbGVtZW50IiwiX3RyYWlsU3RyaW5nIiwidGV4dENvbnRhaW5lciIsInRleHRTdHlsZSIsIl9pbml0aWFsaXplVGV4dENvbnRhaW5lciIsImNvbnRhaW5lckFzcGVjdFJhdGlvIiwiaGVpZ2h0IiwiY29uc29sZSIsIndhcm4iLCJpZCIsIkxpbmUiLCJvcHRpb25zIiwiX3BhdGhUZW1wbGF0ZSIsImNvbnN0cnVjdG9yIiwiY2VudGVyIiwiQ2lyY2xlIiwid2lkdGhPZldpZGVyIiwiciIsInJhZGl1cyIsIlNlbWlDaXJjbGUiLCJib3R0b20iLCJTcXVhcmUiLCJfdHJhaWxUZW1wbGF0ZSIsInciLCJoYWxmT2ZTdHJva2VXaWR0aCIsInN0YXJ0TWFyZ2luIiwicmVxdWlyZSIsInVzZVN0YXRlIiwidXNlQ2FsbGJhY2siLCJ1c2VFZmZlY3QiLCJQcm9ncmVzc0NpcmNsZSIsIlByb2dyZXNzQ2lyY2xlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUFBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7O0NBQ0E7Q0FFQyxhQUFZOztDQUdaLE1BQUlBLE1BQU0sR0FBRyxHQUFHQyxjQUFoQjs7Q0FFQSxXQUFTQyxVQUFULEdBQXVCO0NB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BQUE7RUFWQTs7O0NDQUE7Q0FFQSxJQUFJWSxRQUFRLEdBQUcsa0JBQWtCQyxLQUFsQixDQUF3QixHQUF4QixDQUFmO0NBQ0EsSUFBSUMsd0JBQXdCLEdBQUcsS0FBL0I7Q0FHQTs7Q0FDQSxTQUFTQyxNQUFULENBQWdCQyxXQUFoQixFQUE2QkMsTUFBN0IsRUFBcUNDLFNB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
