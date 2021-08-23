define(['react', 'mendix/filters/builders'], function (react, builders) { 'use strict';

	

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

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

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

	function useOnClickOutside(ref, handler) {
	  react.useEffect(() => {
	    const listener = event => {
	      if (!ref.current || ref.current.contains(event.target)) {
	        return;
	      }

	      handler();
	    };

	    document.addEventListener("mousedown", listener);
	    document.addEventListener("touchstart", listener);
	    return () => {
	      document.removeEventListener("mousedown", listener);
	      document.removeEventListener("touchstart", listener);
	    };
	  }, [ref, handler]);
	}

	function getFilterDispatcher() {
	  return window["com.mendix.widgets.web.filterable.filterContext"];
	}

	var toStr = Object.prototype.toString;

	var isArguments = function isArguments(value) {
	  var str = toStr.call(value);
	  var isArgs = str === '[object Arguments]';

	  if (!isArgs) {
	    isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
	  }

	  return isArgs;
	};

	var keysShim;

	if (!Object.keys) {
	  // modified from https://github.com/es-shims/es5-shim
	  var has = Object.prototype.hasOwnProperty;
	  var toStr$1 = Object.prototype.toString;

	  var isArgs = isArguments; // eslint-disable-line global-require


	  var isEnumerable = Object.prototype.propertyIsEnumerable;
	  var hasDontEnumBug = !isEnumerable.call({
	    toString: null
	  }, 'toString');
	  var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	  var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

	  var equalsConstructorPrototype = function (o) {
	    var ctor = o.constructor;
	    return ctor && ctor.prototype === o;
	  };

	  var excludedKeys = {
	    $applicationCache: true,
	    $console: true,
	    $external: true,
	    $frame: true,
	    $frameElement: true,
	    $frames: true,
	    $innerHeight: true,
	    $innerWidth: true,
	    $onmozfullscreenchange: true,
	    $onmozfullscreenerror: true,
	    $outerHeight: true,
	    $outerWidth: true,
	    $pageXOffset: true,
	    $pageYOffset: true,
	    $parent: true,
	    $scrollLeft: true,
	    $scrollTop: true,
	    $scrollX: true,
	    $scrollY: true,
	    $self: true,
	    $webkitIndexedDB: true,
	    $webkitStorageInfo: true,
	    $window: true
	  };

	  var hasAutomationEqualityBug = function () {
	    /* global window */
	    if (typeof window === 'undefined') {
	      return false;
	    }

	    for (var k in window) {
	      try {
	        if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
	          try {
	            equalsConstructorPrototype(window[k]);
	          } catch (e) {
	            return true;
	          }
	        }
	      } catch (e) {
	        return true;
	      }
	    }

	    return false;
	  }();

	  var equalsConstructorPrototypeIfNotBuggy = function (o) {
	    /* global window */
	    if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
	      return equalsConstructorPrototype(o);
	    }

	    try {
	      return equalsConstructorPrototype(o);
	    } catch (e) {
	      return false;
	    }
	  };

	  keysShim = function keys(object) {
	    var isObject = object !== null && typeof object === 'object';
	    var isFunction = toStr$1.call(object) === '[object Function]';
	    var isArguments = isArgs(object);
	    var isString = isObject && toStr$1.call(object) === '[object String]';
	    var theKeys = [];

	    if (!isObject && !isFunction && !isArguments) {
	      throw new TypeError('Object.keys called on a non-object');
	    }

	    var skipProto = hasProtoEnumBug && isFunction;

	    if (isString && object.length > 0 && !has.call(object, 0)) {
	      for (var i = 0; i < object.length; ++i) {
	        theKeys.push(String(i));
	      }
	    }

	    if (isArguments && object.length > 0) {
	      for (var j = 0; j < object.length; ++j) {
	        theKeys.push(String(j));
	      }
	    } else {
	      for (var name in object) {
	        if (!(skipProto && name === 'prototype') && has.call(object, name)) {
	          theKeys.push(String(name));
	        }
	      }
	    }

	    if (hasDontEnumBug) {
	      var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

	      for (var k = 0; k < dontEnums.length; ++k) {
	        if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
	          theKeys.push(dontEnums[k]);
	        }
	      }
	    }

	    return theKeys;
	  };
	}

	var implementation = keysShim;

	var slice = Array.prototype.slice;



	var origKeys = Object.keys;
	var keysShim$1 = origKeys ? function keys(o) {
	  return origKeys(o);
	} : implementation;
	var originalKeys = Object.keys;

	keysShim$1.shim = function shimObjectKeys() {
	  if (Object.keys) {
	    var keysWorksWithArguments = function () {
	      // Safari 5.0 bug
	      var args = Object.keys(arguments);
	      return args && args.length === arguments.length;
	    }(1, 2);

	    if (!keysWorksWithArguments) {
	      Object.keys = function keys(object) {
	        // eslint-disable-line func-name-matching
	        if (isArguments(object)) {
	          return originalKeys(slice.call(object));
	        }

	        return originalKeys(object);
	      };
	    }
	  } else {
	    Object.keys = keysShim$1;
	  }

	  return Object.keys || keysShim$1;
	};

	var objectKeys = keysShim$1;

	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	var toStr$2 = Object.prototype.toString;

	var isStandardArguments = function isArguments(value) {
	  if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
	    return false;
	  }

	  return toStr$2.call(value) === '[object Arguments]';
	};

	var isLegacyArguments = function isArguments(value) {
	  if (isStandardArguments(value)) {
	    return true;
	  }

	  return value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr$2.call(value) !== '[object Array]' && toStr$2.call(value.callee) === '[object Function]';
	};

	var supportsStandardArguments = function () {
	  return isStandardArguments(arguments);
	}();

	isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

	var isArguments$1 = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

	var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';
	var toStr$3 = Object.prototype.toString;
	var concat = Array.prototype.concat;
	var origDefineProperty = Object.defineProperty;

	var isFunction = function (fn) {
	  return typeof fn === 'function' && toStr$3.call(fn) === '[object Function]';
	};

	var arePropertyDescriptorsSupported = function () {
	  var obj = {};

	  try {
	    origDefineProperty(obj, 'x', {
	      enumerable: false,
	      value: obj
	    }); // eslint-disable-next-line no-unused-vars, no-restricted-syntax

	    for (var _ in obj) {
	      // jscs:ignore disallowUnusedVariables
	      return false;
	    }

	    return obj.x === obj;
	  } catch (e) {
	    /* this is IE 8. */
	    return false;
	  }
	};

	var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

	var defineProperty = function (object, name, value, predicate) {
	  if (name in object && (!isFunction(predicate) || !predicate())) {
	    return;
	  }

	  if (supportsDescriptors) {
	    origDefineProperty(object, name, {
	      configurable: true,
	      enumerable: false,
	      value: value,
	      writable: true
	    });
	  } else {
	    object[name] = value;
	  }
	};

	var defineProperties = function (object, map) {
	  var predicates = arguments.length > 2 ? arguments[2] : {};
	  var props = objectKeys(map);

	  if (hasSymbols) {
	    props = concat.call(props, Object.getOwnPropertySymbols(map));
	  }

	  for (var i = 0; i < props.length; i += 1) {
	    defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	  }
	};

	defineProperties.supportsDescriptors = !!supportsDescriptors;
	var defineProperties_1 = defineProperties;

	/* eslint no-invalid-this: 1 */

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice$1 = Array.prototype.slice;
	var toStr$4 = Object.prototype.toString;
	var funcType = '[object Function]';

	var implementation$1 = function bind(that) {
	  var target = this;

	  if (typeof target !== 'function' || toStr$4.call(target) !== funcType) {
	    throw new TypeError(ERROR_MESSAGE + target);
	  }

	  var args = slice$1.call(arguments, 1);
	  var bound;

	  var binder = function () {
	    if (this instanceof bound) {
	      var result = target.apply(this, args.concat(slice$1.call(arguments)));

	      if (Object(result) === result) {
	        return result;
	      }

	      return this;
	    } else {
	      return target.apply(that, args.concat(slice$1.call(arguments)));
	    }
	  };

	  var boundLength = Math.max(0, target.length - args.length);
	  var boundArgs = [];

	  for (var i = 0; i < boundLength; i++) {
	    boundArgs.push('$' + i);
	  }

	  bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	  if (target.prototype) {
	    var Empty = function Empty() {};

	    Empty.prototype = target.prototype;
	    bound.prototype = new Empty();
	    Empty.prototype = null;
	  }

	  return bound;
	};

	var functionBind = Function.prototype.bind || implementation$1;

	/* eslint complexity: [2, 18], max-statements: [2, 33] */

	var shams = function hasSymbols() {
	  if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
	    return false;
	  }

	  if (typeof Symbol.iterator === 'symbol') {
	    return true;
	  }

	  var obj = {};
	  var sym = Symbol('test');
	  var symObj = Object(sym);

	  if (typeof sym === 'string') {
	    return false;
	  }

	  if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
	    return false;
	  }

	  if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
	    return false;
	  } // temp disabled per https://github.com/ljharb/object.assign/issues/17
	  // if (sym instanceof Symbol) { return false; }
	  // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	  // if (!(symObj instanceof Symbol)) { return false; }
	  // if (typeof Symbol.prototype.toString !== 'function') { return false; }
	  // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }


	  var symVal = 42;
	  obj[sym] = symVal;

	  for (sym in obj) {
	    return false;
	  } // eslint-disable-line no-restricted-syntax


	  if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
	    return false;
	  }

	  if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
	    return false;
	  }

	  var syms = Object.getOwnPropertySymbols(obj);

	  if (syms.length !== 1 || syms[0] !== sym) {
	    return false;
	  }

	  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
	    return false;
	  }

	  if (typeof Object.getOwnPropertyDescriptor === 'function') {
	    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);

	    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
	      return false;
	    }
	  }

	  return true;
	};

	var origSymbol = commonjsGlobal.Symbol;



	var hasSymbols$1 = function hasNativeSymbols() {
	  if (typeof origSymbol !== 'function') {
	    return false;
	  }

	  if (typeof Symbol !== 'function') {
	    return false;
	  }

	  if (typeof origSymbol('foo') !== 'symbol') {
	    return false;
	  }

	  if (typeof Symbol('bar') !== 'symbol') {
	    return false;
	  }

	  return shams();
	};

	var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

	/* globals
		AggregateError,
		Atomics,
		FinalizationRegistry,
		SharedArrayBuffer,
		WeakRef,
	*/

	var undefined$1;
	var $SyntaxError = SyntaxError;
	var $Function = Function;
	var $TypeError = TypeError; // eslint-disable-next-line consistent-return

	var getEvalledConstructor = function (expressionSyntax) {
	  try {
	    // eslint-disable-next-line no-new-func
	    return Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	  } catch (e) {}
	};

	var $gOPD = Object.getOwnPropertyDescriptor;

	if ($gOPD) {
	  try {
	    $gOPD({}, '');
	  } catch (e) {
	    $gOPD = null; // this is IE 8, which has a broken gOPD
	  }
	}

	var throwTypeError = function () {
	  throw new $TypeError();
	};

	var ThrowTypeError = $gOPD ? function () {
	  try {
	    // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
	    arguments.callee; // IE 8 does not throw here

	    return throwTypeError;
	  } catch (calleeThrows) {
	    try {
	      // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
	      return $gOPD(arguments, 'callee').get;
	    } catch (gOPDthrows) {
	      return throwTypeError;
	    }
	  }
	}() : throwTypeError;

	var hasSymbols$2 = hasSymbols$1();

	var getProto = Object.getPrototypeOf || function (x) {
	  return x.__proto__;
	}; // eslint-disable-line no-proto


	var asyncGenFunction = getEvalledConstructor('async function* () {}');
	var asyncGenFunctionPrototype = asyncGenFunction ? asyncGenFunction.prototype : undefined$1;
	var asyncGenPrototype = asyncGenFunctionPrototype ? asyncGenFunctionPrototype.prototype : undefined$1;
	var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);
	var INTRINSICS = {
	  '%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
	  '%Array%': Array,
	  '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
	  '%ArrayIteratorPrototype%': hasSymbols$2 ? getProto([][Symbol.iterator]()) : undefined$1,
	  '%AsyncFromSyncIteratorPrototype%': undefined$1,
	  '%AsyncFunction%': getEvalledConstructor('async function () {}'),
	  '%AsyncGenerator%': asyncGenFunctionPrototype,
	  '%AsyncGeneratorFunction%': asyncGenFunction,
	  '%AsyncIteratorPrototype%': asyncGenPrototype ? getProto(asyncGenPrototype) : undefined$1,
	  '%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
	  '%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
	  '%Boolean%': Boolean,
	  '%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
	  '%Date%': Date,
	  '%decodeURI%': decodeURI,
	  '%decodeURIComponent%': decodeURIComponent,
	  '%encodeURI%': encodeURI,
	  '%encodeURIComponent%': encodeURIComponent,
	  '%Error%': Error,
	  '%eval%': eval,
	  // eslint-disable-line no-eval
	  '%EvalError%': EvalError,
	  '%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
	  '%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
	  '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
	  '%Function%': $Function,
	  '%GeneratorFunction%': getEvalledConstructor('function* () {}'),
	  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
	  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
	  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
	  '%isFinite%': isFinite,
	  '%isNaN%': isNaN,
	  '%IteratorPrototype%': hasSymbols$2 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
	  '%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
	  '%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
	  '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$2 ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
	  '%Math%': Math,
	  '%Number%': Number,
	  '%Object%': Object,
	  '%parseFloat%': parseFloat,
	  '%parseInt%': parseInt,
	  '%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
	  '%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
	  '%RangeError%': RangeError,
	  '%ReferenceError%': ReferenceError,
	  '%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
	  '%RegExp%': RegExp,
	  '%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
	  '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$2 ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
	  '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
	  '%String%': String,
	  '%StringIteratorPrototype%': hasSymbols$2 ? getProto(''[Symbol.iterator]()) : undefined$1,
	  '%Symbol%': hasSymbols$2 ? Symbol : undefined$1,
	  '%SyntaxError%': $SyntaxError,
	  '%ThrowTypeError%': ThrowTypeError,
	  '%TypedArray%': TypedArray,
	  '%TypeError%': $TypeError,
	  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
	  '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
	  '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
	  '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
	  '%URIError%': URIError,
	  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
	  '%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
	  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
	};
	var LEGACY_ALIASES = {
	  '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	  '%ArrayPrototype%': ['Array', 'prototype'],
	  '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	  '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	  '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	  '%ArrayProto_values%': ['Array', 'prototype', 'values'],
	  '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	  '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	  '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	  '%BooleanPrototype%': ['Boolean', 'prototype'],
	  '%DataViewPrototype%': ['DataView', 'prototype'],
	  '%DatePrototype%': ['Date', 'prototype'],
	  '%ErrorPrototype%': ['Error', 'prototype'],
	  '%EvalErrorPrototype%': ['EvalError', 'prototype'],
	  '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	  '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	  '%FunctionPrototype%': ['Function', 'prototype'],
	  '%Generator%': ['GeneratorFunction', 'prototype'],
	  '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	  '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	  '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	  '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	  '%JSONParse%': ['JSON', 'parse'],
	  '%JSONStringify%': ['JSON', 'stringify'],
	  '%MapPrototype%': ['Map', 'prototype'],
	  '%NumberPrototype%': ['Number', 'prototype'],
	  '%ObjectPrototype%': ['Object', 'prototype'],
	  '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	  '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	  '%PromisePrototype%': ['Promise', 'prototype'],
	  '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	  '%Promise_all%': ['Promise', 'all'],
	  '%Promise_reject%': ['Promise', 'reject'],
	  '%Promise_resolve%': ['Promise', 'resolve'],
	  '%RangeErrorPrototype%': ['RangeError', 'prototype'],
	  '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	  '%RegExpPrototype%': ['RegExp', 'prototype'],
	  '%SetPrototype%': ['Set', 'prototype'],
	  '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	  '%StringPrototype%': ['String', 'prototype'],
	  '%SymbolPrototype%': ['Symbol', 'prototype'],
	  '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	  '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	  '%TypeErrorPrototype%': ['TypeError', 'prototype'],
	  '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	  '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	  '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	  '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	  '%URIErrorPrototype%': ['URIError', 'prototype'],
	  '%WeakMapPrototype%': ['WeakMap', 'prototype'],
	  '%WeakSetPrototype%': ['WeakSet', 'prototype']
	};





	var $concat = functionBind.call(Function.call, Array.prototype.concat);
	var $spliceApply = functionBind.call(Function.apply, Array.prototype.splice);
	var $replace = functionBind.call(Function.call, String.prototype.replace);
	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */

	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g;
	/** Used to match backslashes in property paths. */

	var stringToPath = function stringToPath(string) {
	  var result = [];
	  $replace(string, rePropName, function (match, number, quote, subString) {
	    result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	  });
	  return result;
	};
	/* end adaptation */


	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	  var intrinsicName = name;
	  var alias;

	  if (src(LEGACY_ALIASES, intrinsicName)) {
	    alias = LEGACY_ALIASES[intrinsicName];
	    intrinsicName = '%' + alias[0] + '%';
	  }

	  if (src(INTRINSICS, intrinsicName)) {
	    var value = INTRINSICS[intrinsicName];

	    if (typeof value === 'undefined' && !allowMissing) {
	      throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	    }

	    return {
	      alias: alias,
	      name: intrinsicName,
	      value: value
	    };
	  }

	  throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
	};

	var GetIntrinsic = function GetIntrinsic(name, allowMissing) {
	  if (typeof name !== 'string' || name.length === 0) {
	    throw new $TypeError('intrinsic name must be a non-empty string');
	  }

	  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
	    throw new $TypeError('"allowMissing" argument must be a boolean');
	  }

	  var parts = stringToPath(name);
	  var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
	  var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	  var intrinsicRealName = intrinsic.name;
	  var value = intrinsic.value;
	  var skipFurtherCaching = false;
	  var alias = intrinsic.alias;

	  if (alias) {
	    intrinsicBaseName = alias[0];
	    $spliceApply(parts, $concat([0, 1], alias));
	  }

	  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
	    var part = parts[i];

	    if (part === 'constructor' || !isOwn) {
	      skipFurtherCaching = true;
	    }

	    intrinsicBaseName += '.' + part;
	    intrinsicRealName = '%' + intrinsicBaseName + '%';

	    if (src(INTRINSICS, intrinsicRealName)) {
	      value = INTRINSICS[intrinsicRealName];
	    } else if (value != null) {
	      if ($gOPD && i + 1 >= parts.length) {
	        var desc = $gOPD(value, part);
	        isOwn = !!desc;

	        if (!allowMissing && !(part in value)) {
	          throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
	        } // By convention, when a data property is converted to an accessor
	        // property to emulate a data property that does not suffer from
	        // the override mistake, that accessor's getter is marked with
	        // an `originalValue` property. Here, when we detect this, we
	        // uphold the illusion by pretending to see that original data
	        // property, i.e., returning the value rather than the getter
	        // itself.


	        if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
	          value = desc.get;
	        } else {
	          value = value[part];
	        }
	      } else {
	        isOwn = src(value, part);
	        value = value[part];
	      }

	      if (isOwn && !skipFurtherCaching) {
	        INTRINSICS[intrinsicRealName] = value;
	      }
	    }
	  }

	  return value;
	};

	var callBind = createCommonjsModule(function (module) {





	var $apply = GetIntrinsic('%Function.prototype.apply%');
	var $call = GetIntrinsic('%Function.prototype.call%');
	var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || functionBind.call($call, $apply);
	var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

	if ($defineProperty) {
	  try {
	    $defineProperty({}, 'a', {
	      value: 1
	    });
	  } catch (e) {
	    // IE 8 has a broken defineProperty
	    $defineProperty = null;
	  }
	}

	module.exports = function callBind() {
	  return $reflectApply(functionBind, $call, arguments);
	};

	var applyBind = function applyBind() {
	  return $reflectApply(functionBind, $apply, arguments);
	};

	if ($defineProperty) {
	  $defineProperty(module.exports, 'apply', {
	    value: applyBind
	  });
	} else {
	  module.exports.apply = applyBind;
	}
	});

	var numberIsNaN = function (value) {
	  return value !== value;
	};

	var implementation$2 = function is(a, b) {
	  if (a === 0 && b === 0) {
	    return 1 / a === 1 / b;
	  }

	  if (a === b) {
	    return true;
	  }

	  if (numberIsNaN(a) && numberIsNaN(b)) {
	    return true;
	  }

	  return false;
	};

	var polyfill = function getPolyfill() {
	  return typeof Object.is === 'function' ? Object.is : implementation$2;
	};

	var shim = function shimObjectIs() {
	  var polyfill$1 = polyfill();
	  defineProperties_1(Object, {
	    is: polyfill$1
	  }, {
	    is: function testObjectIs() {
	      return Object.is !== polyfill$1;
	    }
	  });
	  return polyfill$1;
	};

	var polyfill$1 = callBind(polyfill(), Object);
	defineProperties_1(polyfill$1, {
	  getPolyfill: polyfill,
	  implementation: implementation$2,
	  shim: shim
	});
	var objectIs = polyfill$1;

	var hasSymbols$3 = hasSymbols$1();

	var hasToStringTag$1 = hasSymbols$3 && typeof Symbol.toStringTag === 'symbol';
	var hasOwnProperty;
	var regexExec;
	var isRegexMarker;
	var badStringifier;

	if (hasToStringTag$1) {
	  hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
	  regexExec = Function.call.bind(RegExp.prototype.exec);
	  isRegexMarker = {};

	  var throwRegexMarker = function () {
	    throw isRegexMarker;
	  };

	  badStringifier = {
	    toString: throwRegexMarker,
	    valueOf: throwRegexMarker
	  };

	  if (typeof Symbol.toPrimitive === 'symbol') {
	    badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	  }
	}

	var toStr$5 = Object.prototype.toString;
	var gOPD = Object.getOwnPropertyDescriptor;
	var regexClass = '[object RegExp]';
	var isRegex = hasToStringTag$1 // eslint-disable-next-line consistent-return
	? function isRegex(value) {
	  if (!value || typeof value !== 'object') {
	    return false;
	  }

	  var descriptor = gOPD(value, 'lastIndex');
	  var hasLastIndexDataProperty = descriptor && hasOwnProperty(descriptor, 'value');

	  if (!hasLastIndexDataProperty) {
	    return false;
	  }

	  try {
	    regexExec(value, badStringifier);
	  } catch (e) {
	    return e === isRegexMarker;
	  }
	} : function isRegex(value) {
	  // In older browsers, typeof regex incorrectly returns 'function'
	  if (!value || typeof value !== 'object' && typeof value !== 'function') {
	    return false;
	  }

	  return toStr$5.call(value) === regexClass;
	};

	/* globals
		Atomics,
		SharedArrayBuffer,
	*/

	var undefined$2;
	var $TypeError$1 = TypeError;
	var $gOPD$1 = Object.getOwnPropertyDescriptor;

	if ($gOPD$1) {
	  try {
	    $gOPD$1({}, '');
	  } catch (e) {
	    $gOPD$1 = null; // this is IE 8, which has a broken gOPD
	  }
	}

	var throwTypeError$1 = function () {
	  throw new $TypeError$1();
	};

	var ThrowTypeError$1 = $gOPD$1 ? function () {
	  try {
	    // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
	    arguments.callee; // IE 8 does not throw here

	    return throwTypeError$1;
	  } catch (calleeThrows) {
	    try {
	      // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
	      return $gOPD$1(arguments, 'callee').get;
	    } catch (gOPDthrows) {
	      return throwTypeError$1;
	    }
	  }
	}() : throwTypeError$1;

	var hasSymbols$4 = hasSymbols$1();

	var getProto$1 = Object.getPrototypeOf || function (x) {
	  return x.__proto__;
	}; // eslint-disable-line no-proto

	var generatorFunction =  undefined$2;

	var asyncFunction =  undefined$2;

	var asyncGenFunction$1 =  undefined$2;
	var TypedArray$1 = typeof Uint8Array === 'undefined' ? undefined$2 : getProto$1(Uint8Array);
	var INTRINSICS$1 = {
	  '%Array%': Array,
	  '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$2 : ArrayBuffer,
	  '%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined$2 : ArrayBuffer.prototype,
	  '%ArrayIteratorPrototype%': hasSymbols$4 ? getProto$1([][Symbol.iterator]()) : undefined$2,
	  '%ArrayPrototype%': Array.prototype,
	  '%ArrayProto_entries%': Array.prototype.entries,
	  '%ArrayProto_forEach%': Array.prototype.forEach,
	  '%ArrayProto_keys%': Array.prototype.keys,
	  '%ArrayProto_values%': Array.prototype.values,
	  '%AsyncFromSyncIteratorPrototype%': undefined$2,
	  '%AsyncFunction%': asyncFunction,
	  '%AsyncFunctionPrototype%':  undefined$2,
	  '%AsyncGenerator%':  undefined$2,
	  '%AsyncGeneratorFunction%': asyncGenFunction$1,
	  '%AsyncGeneratorPrototype%':  undefined$2,
	  '%AsyncIteratorPrototype%':  undefined$2,
	  '%Atomics%': typeof Atomics === 'undefined' ? undefined$2 : Atomics,
	  '%Boolean%': Boolean,
	  '%BooleanPrototype%': Boolean.prototype,
	  '%DataView%': typeof DataView === 'undefined' ? undefined$2 : DataView,
	  '%DataViewPrototype%': typeof DataView === 'undefined' ? undefined$2 : DataView.prototype,
	  '%Date%': Date,
	  '%DatePrototype%': Date.prototype,
	  '%decodeURI%': decodeURI,
	  '%decodeURIComponent%': decodeURIComponent,
	  '%encodeURI%': encodeURI,
	  '%encodeURIComponent%': encodeURIComponent,
	  '%Error%': Error,
	  '%ErrorPrototype%': Error.prototype,
	  '%eval%': eval,
	  // eslint-disable-line no-eval
	  '%EvalError%': EvalError,
	  '%EvalErrorPrototype%': EvalError.prototype,
	  '%Float32Array%': typeof Float32Array === 'undefined' ? undefined$2 : Float32Array,
	  '%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined$2 : Float32Array.prototype,
	  '%Float64Array%': typeof Float64Array === 'undefined' ? undefined$2 : Float64Array,
	  '%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined$2 : Float64Array.prototype,
	  '%Function%': Function,
	  '%FunctionPrototype%': Function.prototype,
	  '%Generator%':  undefined$2,
	  '%GeneratorFunction%': generatorFunction,
	  '%GeneratorPrototype%':  undefined$2,
	  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined$2 : Int8Array,
	  '%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined$2 : Int8Array.prototype,
	  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined$2 : Int16Array,
	  '%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined$2 : Int8Array.prototype,
	  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined$2 : Int32Array,
	  '%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined$2 : Int32Array.prototype,
	  '%isFinite%': isFinite,
	  '%isNaN%': isNaN,
	  '%IteratorPrototype%': hasSymbols$4 ? getProto$1(getProto$1([][Symbol.iterator]())) : undefined$2,
	  '%JSON%': typeof JSON === 'object' ? JSON : undefined$2,
	  '%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined$2,
	  '%Map%': typeof Map === 'undefined' ? undefined$2 : Map,
	  '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$4 ? undefined$2 : getProto$1(new Map()[Symbol.iterator]()),
	  '%MapPrototype%': typeof Map === 'undefined' ? undefined$2 : Map.prototype,
	  '%Math%': Math,
	  '%Number%': Number,
	  '%NumberPrototype%': Number.prototype,
	  '%Object%': Object,
	  '%ObjectPrototype%': Object.prototype,
	  '%ObjProto_toString%': Object.prototype.toString,
	  '%ObjProto_valueOf%': Object.prototype.valueOf,
	  '%parseFloat%': parseFloat,
	  '%parseInt%': parseInt,
	  '%Promise%': typeof Promise === 'undefined' ? undefined$2 : Promise,
	  '%PromisePrototype%': typeof Promise === 'undefined' ? undefined$2 : Promise.prototype,
	  '%PromiseProto_then%': typeof Promise === 'undefined' ? undefined$2 : Promise.prototype.then,
	  '%Promise_all%': typeof Promise === 'undefined' ? undefined$2 : Promise.all,
	  '%Promise_reject%': typeof Promise === 'undefined' ? undefined$2 : Promise.reject,
	  '%Promise_resolve%': typeof Promise === 'undefined' ? undefined$2 : Promise.resolve,
	  '%Proxy%': typeof Proxy === 'undefined' ? undefined$2 : Proxy,
	  '%RangeError%': RangeError,
	  '%RangeErrorPrototype%': RangeError.prototype,
	  '%ReferenceError%': ReferenceError,
	  '%ReferenceErrorPrototype%': ReferenceError.prototype,
	  '%Reflect%': typeof Reflect === 'undefined' ? undefined$2 : Reflect,
	  '%RegExp%': RegExp,
	  '%RegExpPrototype%': RegExp.prototype,
	  '%Set%': typeof Set === 'undefined' ? undefined$2 : Set,
	  '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$4 ? undefined$2 : getProto$1(new Set()[Symbol.iterator]()),
	  '%SetPrototype%': typeof Set === 'undefined' ? undefined$2 : Set.prototype,
	  '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$2 : SharedArrayBuffer,
	  '%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined$2 : SharedArrayBuffer.prototype,
	  '%String%': String,
	  '%StringIteratorPrototype%': hasSymbols$4 ? getProto$1(''[Symbol.iterator]()) : undefined$2,
	  '%StringPrototype%': String.prototype,
	  '%Symbol%': hasSymbols$4 ? Symbol : undefined$2,
	  '%SymbolPrototype%': hasSymbols$4 ? Symbol.prototype : undefined$2,
	  '%SyntaxError%': SyntaxError,
	  '%SyntaxErrorPrototype%': SyntaxError.prototype,
	  '%ThrowTypeError%': ThrowTypeError$1,
	  '%TypedArray%': TypedArray$1,
	  '%TypedArrayPrototype%': TypedArray$1 ? TypedArray$1.prototype : undefined$2,
	  '%TypeError%': $TypeError$1,
	  '%TypeErrorPrototype%': $TypeError$1.prototype,
	  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$2 : Uint8Array,
	  '%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined$2 : Uint8Array.prototype,
	  '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$2 : Uint8ClampedArray,
	  '%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined$2 : Uint8ClampedArray.prototype,
	  '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$2 : Uint16Array,
	  '%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined$2 : Uint16Array.prototype,
	  '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$2 : Uint32Array,
	  '%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined$2 : Uint32Array.prototype,
	  '%URIError%': URIError,
	  '%URIErrorPrototype%': URIError.prototype,
	  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined$2 : WeakMap,
	  '%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined$2 : WeakMap.prototype,
	  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined$2 : WeakSet,
	  '%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined$2 : WeakSet.prototype
	};



	var $replace$1 = functionBind.call(Function.call, String.prototype.replace);
	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */

	var rePropName$1 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar$1 = /\\(\\)?/g;
	/** Used to match backslashes in property paths. */

	var stringToPath$1 = function stringToPath(string) {
	  var result = [];
	  $replace$1(string, rePropName$1, function (match, number, quote, subString) {
	    result[result.length] = quote ? $replace$1(subString, reEscapeChar$1, '$1') : number || match;
	  });
	  return result;
	};
	/* end adaptation */


	var getBaseIntrinsic$1 = function getBaseIntrinsic(name, allowMissing) {
	  if (!(name in INTRINSICS$1)) {
	    throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	  } // istanbul ignore if // hopefully this is impossible to test :-)


	  if (typeof INTRINSICS$1[name] === 'undefined' && !allowMissing) {
	    throw new $TypeError$1('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	  }

	  return INTRINSICS$1[name];
	};

	var GetIntrinsic$1 = function GetIntrinsic(name, allowMissing) {
	  if (typeof name !== 'string' || name.length === 0) {
	    throw new TypeError('intrinsic name must be a non-empty string');
	  }

	  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
	    throw new TypeError('"allowMissing" argument must be a boolean');
	  }

	  var parts = stringToPath$1(name);
	  var value = getBaseIntrinsic$1('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);

	  for (var i = 1; i < parts.length; i += 1) {
	    if (value != null) {
	      if ($gOPD$1 && i + 1 >= parts.length) {
	        var desc = $gOPD$1(value, parts[i]);

	        if (!allowMissing && !(parts[i] in value)) {
	          throw new $TypeError$1('base intrinsic for ' + name + ' exists, but the property is not available.');
	        } // By convention, when a data property is converted to an accessor
	        // property to emulate a data property that does not suffer from
	        // the override mistake, that accessor's getter is marked with
	        // an `originalValue` property. Here, when we detect this, we
	        // uphold the illusion by pretending to see that original data
	        // property, i.e., returning the value rather than the getter
	        // itself.


	        value = desc && 'get' in desc && !('originalValue' in desc.get) ? desc.get : value[parts[i]];
	      } else {
	        value = value[parts[i]];
	      }
	    }
	  }

	  return value;
	};

	var callBind$1 = createCommonjsModule(function (module) {





	var $apply = GetIntrinsic$1('%Function.prototype.apply%');
	var $call = GetIntrinsic$1('%Function.prototype.call%');
	var $reflectApply = GetIntrinsic$1('%Reflect.apply%', true) || functionBind.call($call, $apply);
	var $defineProperty = GetIntrinsic$1('%Object.defineProperty%', true);

	if ($defineProperty) {
	  try {
	    $defineProperty({}, 'a', {
	      value: 1
	    });
	  } catch (e) {
	    // IE 8 has a broken defineProperty
	    $defineProperty = null;
	  }
	}

	module.exports = function callBind() {
	  return $reflectApply(functionBind, $call, arguments);
	};

	var applyBind = function applyBind() {
	  return $reflectApply(functionBind, $apply, arguments);
	};

	if ($defineProperty) {
	  $defineProperty(module.exports, 'apply', {
	    value: applyBind
	  });
	} else {
	  module.exports.apply = applyBind;
	}
	});

	var $Object = Object;
	var $TypeError$2 = TypeError;

	var implementation$3 = function flags() {
	  if (this != null && this !== $Object(this)) {
	    throw new $TypeError$2('RegExp.prototype.flags getter called on non-object');
	  }

	  var result = '';

	  if (this.global) {
	    result += 'g';
	  }

	  if (this.ignoreCase) {
	    result += 'i';
	  }

	  if (this.multiline) {
	    result += 'm';
	  }

	  if (this.dotAll) {
	    result += 's';
	  }

	  if (this.unicode) {
	    result += 'u';
	  }

	  if (this.sticky) {
	    result += 'y';
	  }

	  return result;
	};

	var supportsDescriptors$1 = defineProperties_1.supportsDescriptors;

	var $gOPD$2 = Object.getOwnPropertyDescriptor;
	var $TypeError$3 = TypeError;

	var polyfill$2 = function getPolyfill() {
	  if (!supportsDescriptors$1) {
	    throw new $TypeError$3('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	  }

	  if (/a/mig.flags === 'gim') {
	    var descriptor = $gOPD$2(RegExp.prototype, 'flags');

	    if (descriptor && typeof descriptor.get === 'function' && typeof /a/.dotAll === 'boolean') {
	      return descriptor.get;
	    }
	  }

	  return implementation$3;
	};

	var supportsDescriptors$2 = defineProperties_1.supportsDescriptors;



	var gOPD$1 = Object.getOwnPropertyDescriptor;
	var defineProperty$1 = Object.defineProperty;
	var TypeErr = TypeError;
	var getProto$2 = Object.getPrototypeOf;
	var regex = /a/;

	var shim$1 = function shimFlags() {
	  if (!supportsDescriptors$2 || !getProto$2) {
	    throw new TypeErr('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	  }

	  var polyfill = polyfill$2();
	  var proto = getProto$2(regex);
	  var descriptor = gOPD$1(proto, 'flags');

	  if (!descriptor || descriptor.get !== polyfill) {
	    defineProperty$1(proto, 'flags', {
	      configurable: true,
	      enumerable: false,
	      get: polyfill
	    });
	  }

	  return polyfill;
	};

	var flagsBound = callBind$1(implementation$3);
	defineProperties_1(flagsBound, {
	  getPolyfill: polyfill$2,
	  implementation: implementation$3,
	  shim: shim$1
	});
	var regexp_prototype_flags = flagsBound;

	var toString = {}.toString;

	var isarray = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

	var getDay = Date.prototype.getDay;

	var tryDateObject = function tryDateGetDayCall(value) {
	  try {
	    getDay.call(value);
	    return true;
	  } catch (e) {
	    return false;
	  }
	};

	var toStr$6 = Object.prototype.toString;
	var dateClass = '[object Date]';
	var hasToStringTag$2 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	var isDateObject = function isDateObject(value) {
	  if (typeof value !== 'object' || value === null) {
	    return false;
	  }

	  return hasToStringTag$2 ? tryDateObject(value) : toStr$6.call(value) === dateClass;
	};

	var strValue = String.prototype.valueOf;

	var tryStringObject = function tryStringObject(value) {
	  try {
	    strValue.call(value);
	    return true;
	  } catch (e) {
	    return false;
	  }
	};

	var toStr$7 = Object.prototype.toString;
	var strClass = '[object String]';
	var hasToStringTag$3 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	var isString = function isString(value) {
	  if (typeof value === 'string') {
	    return true;
	  }

	  if (typeof value !== 'object') {
	    return false;
	  }

	  return hasToStringTag$3 ? tryStringObject(value) : toStr$7.call(value) === strClass;
	};

	var numToStr = Number.prototype.toString;

	var tryNumberObject = function tryNumberObject(value) {
	  try {
	    numToStr.call(value);
	    return true;
	  } catch (e) {
	    return false;
	  }
	};

	var toStr$8 = Object.prototype.toString;
	var numClass = '[object Number]';
	var hasToStringTag$4 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	var isNumberObject = function isNumberObject(value) {
	  if (typeof value === 'number') {
	    return true;
	  }

	  if (typeof value !== 'object') {
	    return false;
	  }

	  return hasToStringTag$4 ? tryNumberObject(value) : toStr$8.call(value) === numClass;
	};

	var boolToStr = Boolean.prototype.toString;

	var tryBooleanObject = function booleanBrandCheck(value) {
	  try {
	    boolToStr.call(value);
	    return true;
	  } catch (e) {
	    return false;
	  }
	};

	var toStr$9 = Object.prototype.toString;
	var boolClass = '[object Boolean]';
	var hasToStringTag$5 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	var isBooleanObject = function isBoolean(value) {
	  if (typeof value === 'boolean') {
	    return true;
	  }

	  if (value === null || typeof value !== 'object') {
	    return false;
	  }

	  return hasToStringTag$5 && Symbol.toStringTag in value ? tryBooleanObject(value) : toStr$9.call(value) === boolClass;
	};

	var isSymbol = createCommonjsModule(function (module) {

	var toStr = Object.prototype.toString;

	var hasSymbols = hasSymbols$1();

	if (hasSymbols) {
	  var symToStr = Symbol.prototype.toString;
	  var symStringRegex = /^Symbol\(.*\)$/;

	  var isSymbolObject = function isRealSymbolObject(value) {
	    if (typeof value.valueOf() !== 'symbol') {
	      return false;
	    }

	    return symStringRegex.test(symToStr.call(value));
	  };

	  module.exports = function isSymbol(value) {
	    if (typeof value === 'symbol') {
	      return true;
	    }

	    if (toStr.call(value) !== '[object Symbol]') {
	      return false;
	    }

	    try {
	      return isSymbolObject(value);
	    } catch (e) {
	      return false;
	    }
	  };
	} else {
	  module.exports = function isSymbol(value) {
	    // this environment does not support Symbols.
	    return false ;
	  };
	}
	});

	var isBigint = createCommonjsModule(function (module) {

	if (typeof BigInt === 'function') {
	  var bigIntValueOf = BigInt.prototype.valueOf;

	  var tryBigInt = function tryBigIntObject(value) {
	    try {
	      bigIntValueOf.call(value);
	      return true;
	    } catch (e) {}

	    return false;
	  };

	  module.exports = function isBigInt(value) {
	    if (value === null || typeof value === 'undefined' || typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol' || typeof value === 'function') {
	      return false;
	    }

	    if (typeof value === 'bigint') {
	      // eslint-disable-line valid-typeof
	      return true;
	    }

	    return tryBigInt(value);
	  };
	} else {
	  module.exports = function isBigInt(value) {
	    return false ;
	  };
	}
	});

	// eslint-disable-next-line consistent-return


	var whichBoxedPrimitive = function whichBoxedPrimitive(value) {
	  // eslint-disable-next-line eqeqeq
	  if (value == null || typeof value !== 'object' && typeof value !== 'function') {
	    return null;
	  }

	  if (isString(value)) {
	    return 'String';
	  }

	  if (isNumberObject(value)) {
	    return 'Number';
	  }

	  if (isBooleanObject(value)) {
	    return 'Boolean';
	  }

	  if (isSymbol(value)) {
	    return 'Symbol';
	  }

	  if (isBigint(value)) {
	    return 'BigInt';
	  }
	};

	/* globals
		AggregateError,
		Atomics,
		FinalizationRegistry,
		SharedArrayBuffer,
		WeakRef,
	*/

	var undefined$3;
	var $SyntaxError$1 = SyntaxError;
	var $Function$1 = Function;
	var $TypeError$4 = TypeError; // eslint-disable-next-line consistent-return

	var getEvalledConstructor$1 = function (expressionSyntax) {
	  try {
	    // eslint-disable-next-line no-new-func
	    return Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	  } catch (e) {}
	};

	var $gOPD$3 = Object.getOwnPropertyDescriptor;

	if ($gOPD$3) {
	  try {
	    $gOPD$3({}, '');
	  } catch (e) {
	    $gOPD$3 = null; // this is IE 8, which has a broken gOPD
	  }
	}

	var throwTypeError$2 = function () {
	  throw new $TypeError$4();
	};

	var ThrowTypeError$2 = $gOPD$3 ? function () {
	  try {
	    // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
	    arguments.callee; // IE 8 does not throw here

	    return throwTypeError$2;
	  } catch (calleeThrows) {
	    try {
	      // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
	      return $gOPD$3(arguments, 'callee').get;
	    } catch (gOPDthrows) {
	      return throwTypeError$2;
	    }
	  }
	}() : throwTypeError$2;

	var hasSymbols$5 = hasSymbols$1();

	var getProto$3 = Object.getPrototypeOf || function (x) {
	  return x.__proto__;
	}; // eslint-disable-line no-proto


	var asyncGenFunction$2 = getEvalledConstructor$1('async function* () {}');
	var asyncGenFunctionPrototype$1 = asyncGenFunction$2 ? asyncGenFunction$2.prototype : undefined$3;
	var asyncGenPrototype$1 = asyncGenFunctionPrototype$1 ? asyncGenFunctionPrototype$1.prototype : undefined$3;
	var TypedArray$2 = typeof Uint8Array === 'undefined' ? undefined$3 : getProto$3(Uint8Array);
	var INTRINSICS$2 = {
	  '%AggregateError%': typeof AggregateError === 'undefined' ? undefined$3 : AggregateError,
	  '%Array%': Array,
	  '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$3 : ArrayBuffer,
	  '%ArrayIteratorPrototype%': hasSymbols$5 ? getProto$3([][Symbol.iterator]()) : undefined$3,
	  '%AsyncFromSyncIteratorPrototype%': undefined$3,
	  '%AsyncFunction%': getEvalledConstructor$1('async function () {}'),
	  '%AsyncGenerator%': asyncGenFunctionPrototype$1,
	  '%AsyncGeneratorFunction%': asyncGenFunction$2,
	  '%AsyncIteratorPrototype%': asyncGenPrototype$1 ? getProto$3(asyncGenPrototype$1) : undefined$3,
	  '%Atomics%': typeof Atomics === 'undefined' ? undefined$3 : Atomics,
	  '%BigInt%': typeof BigInt === 'undefined' ? undefined$3 : BigInt,
	  '%Boolean%': Boolean,
	  '%DataView%': typeof DataView === 'undefined' ? undefined$3 : DataView,
	  '%Date%': Date,
	  '%decodeURI%': decodeURI,
	  '%decodeURIComponent%': decodeURIComponent,
	  '%encodeURI%': encodeURI,
	  '%encodeURIComponent%': encodeURIComponent,
	  '%Error%': Error,
	  '%eval%': eval,
	  // eslint-disable-line no-eval
	  '%EvalError%': EvalError,
	  '%Float32Array%': typeof Float32Array === 'undefined' ? undefined$3 : Float32Array,
	  '%Float64Array%': typeof Float64Array === 'undefined' ? undefined$3 : Float64Array,
	  '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$3 : FinalizationRegistry,
	  '%Function%': $Function$1,
	  '%GeneratorFunction%': getEvalledConstructor$1('function* () {}'),
	  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined$3 : Int8Array,
	  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined$3 : Int16Array,
	  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined$3 : Int32Array,
	  '%isFinite%': isFinite,
	  '%isNaN%': isNaN,
	  '%IteratorPrototype%': hasSymbols$5 ? getProto$3(getProto$3([][Symbol.iterator]())) : undefined$3,
	  '%JSON%': typeof JSON === 'object' ? JSON : undefined$3,
	  '%Map%': typeof Map === 'undefined' ? undefined$3 : Map,
	  '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$5 ? undefined$3 : getProto$3(new Map()[Symbol.iterator]()),
	  '%Math%': Math,
	  '%Number%': Number,
	  '%Object%': Object,
	  '%parseFloat%': parseFloat,
	  '%parseInt%': parseInt,
	  '%Promise%': typeof Promise === 'undefined' ? undefined$3 : Promise,
	  '%Proxy%': typeof Proxy === 'undefined' ? undefined$3 : Proxy,
	  '%RangeError%': RangeError,
	  '%ReferenceError%': ReferenceError,
	  '%Reflect%': typeof Reflect === 'undefined' ? undefined$3 : Reflect,
	  '%RegExp%': RegExp,
	  '%Set%': typeof Set === 'undefined' ? undefined$3 : Set,
	  '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$5 ? undefined$3 : getProto$3(new Set()[Symbol.iterator]()),
	  '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$3 : SharedArrayBuffer,
	  '%String%': String,
	  '%StringIteratorPrototype%': hasSymbols$5 ? getProto$3(''[Symbol.iterator]()) : undefined$3,
	  '%Symbol%': hasSymbols$5 ? Symbol : undefined$3,
	  '%SyntaxError%': $SyntaxError$1,
	  '%ThrowTypeError%': ThrowTypeError$2,
	  '%TypedArray%': TypedArray$2,
	  '%TypeError%': $TypeError$4,
	  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$3 : Uint8Array,
	  '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$3 : Uint8ClampedArray,
	  '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$3 : Uint16Array,
	  '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$3 : Uint32Array,
	  '%URIError%': URIError,
	  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined$3 : WeakMap,
	  '%WeakRef%': typeof WeakRef === 'undefined' ? undefined$3 : WeakRef,
	  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined$3 : WeakSet
	};
	var LEGACY_ALIASES$1 = {
	  '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	  '%ArrayPrototype%': ['Array', 'prototype'],
	  '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	  '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	  '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	  '%ArrayProto_values%': ['Array', 'prototype', 'values'],
	  '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	  '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	  '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	  '%BooleanPrototype%': ['Boolean', 'prototype'],
	  '%DataViewPrototype%': ['DataView', 'prototype'],
	  '%DatePrototype%': ['Date', 'prototype'],
	  '%ErrorPrototype%': ['Error', 'prototype'],
	  '%EvalErrorPrototype%': ['EvalError', 'prototype'],
	  '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	  '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	  '%FunctionPrototype%': ['Function', 'prototype'],
	  '%Generator%': ['GeneratorFunction', 'prototype'],
	  '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	  '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	  '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	  '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	  '%JSONParse%': ['JSON', 'parse'],
	  '%JSONStringify%': ['JSON', 'stringify'],
	  '%MapPrototype%': ['Map', 'prototype'],
	  '%NumberPrototype%': ['Number', 'prototype'],
	  '%ObjectPrototype%': ['Object', 'prototype'],
	  '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	  '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	  '%PromisePrototype%': ['Promise', 'prototype'],
	  '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	  '%Promise_all%': ['Promise', 'all'],
	  '%Promise_reject%': ['Promise', 'reject'],
	  '%Promise_resolve%': ['Promise', 'resolve'],
	  '%RangeErrorPrototype%': ['RangeError', 'prototype'],
	  '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	  '%RegExpPrototype%': ['RegExp', 'prototype'],
	  '%SetPrototype%': ['Set', 'prototype'],
	  '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	  '%StringPrototype%': ['String', 'prototype'],
	  '%SymbolPrototype%': ['Symbol', 'prototype'],
	  '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	  '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	  '%TypeErrorPrototype%': ['TypeError', 'prototype'],
	  '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	  '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	  '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	  '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	  '%URIErrorPrototype%': ['URIError', 'prototype'],
	  '%WeakMapPrototype%': ['WeakMap', 'prototype'],
	  '%WeakSetPrototype%': ['WeakSet', 'prototype']
	};





	var $concat$1 = functionBind.call(Function.call, Array.prototype.concat);
	var $spliceApply$1 = functionBind.call(Function.apply, Array.prototype.splice);
	var $replace$2 = functionBind.call(Function.call, String.prototype.replace);
	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */

	var rePropName$2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar$2 = /\\(\\)?/g;
	/** Used to match backslashes in property paths. */

	var stringToPath$2 = function stringToPath(string) {
	  var result = [];
	  $replace$2(string, rePropName$2, function (match, number, quote, subString) {
	    result[result.length] = quote ? $replace$2(subString, reEscapeChar$2, '$1') : number || match;
	  });
	  return result;
	};
	/* end adaptation */


	var getBaseIntrinsic$2 = function getBaseIntrinsic(name, allowMissing) {
	  var intrinsicName = name;
	  var alias;

	  if (src(LEGACY_ALIASES$1, intrinsicName)) {
	    alias = LEGACY_ALIASES$1[intrinsicName];
	    intrinsicName = '%' + alias[0] + '%';
	  }

	  if (src(INTRINSICS$2, intrinsicName)) {
	    var value = INTRINSICS$2[intrinsicName];

	    if (typeof value === 'undefined' && !allowMissing) {
	      throw new $TypeError$4('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	    }

	    return {
	      alias: alias,
	      name: intrinsicName,
	      value: value
	    };
	  }

	  throw new $SyntaxError$1('intrinsic ' + name + ' does not exist!');
	};

	var GetIntrinsic$2 = function GetIntrinsic(name, allowMissing) {
	  if (typeof name !== 'string' || name.length === 0) {
	    throw new $TypeError$4('intrinsic name must be a non-empty string');
	  }

	  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
	    throw new $TypeError$4('"allowMissing" argument must be a boolean');
	  }

	  var parts = stringToPath$2(name);
	  var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
	  var intrinsic = getBaseIntrinsic$2('%' + intrinsicBaseName + '%', allowMissing);
	  var intrinsicRealName = intrinsic.name;
	  var value = intrinsic.value;
	  var skipFurtherCaching = false;
	  var alias = intrinsic.alias;

	  if (alias) {
	    intrinsicBaseName = alias[0];
	    $spliceApply$1(parts, $concat$1([0, 1], alias));
	  }

	  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
	    var part = parts[i];

	    if (part === 'constructor' || !isOwn) {
	      skipFurtherCaching = true;
	    }

	    intrinsicBaseName += '.' + part;
	    intrinsicRealName = '%' + intrinsicBaseName + '%';

	    if (src(INTRINSICS$2, intrinsicRealName)) {
	      value = INTRINSICS$2[intrinsicRealName];
	    } else if (value != null) {
	      if ($gOPD$3 && i + 1 >= parts.length) {
	        var desc = $gOPD$3(value, part);
	        isOwn = !!desc;

	        if (!allowMissing && !(part in value)) {
	          throw new $TypeError$4('base intrinsic for ' + name + ' exists, but the property is not available.');
	        } // By convention, when a data property is converted to an accessor
	        // property to emulate a data property that does not suffer from
	        // the override mistake, that accessor's getter is marked with
	        // an `originalValue` property. Here, when we detect this, we
	        // uphold the illusion by pretending to see that original data
	        // property, i.e., returning the value rather than the getter
	        // itself.


	        if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
	          value = desc.get;
	        } else {
	          value = value[part];
	        }
	      } else {
	        isOwn = src(value, part);
	        value = value[part];
	      }

	      if (isOwn && !skipFurtherCaching) {
	        INTRINSICS$2[intrinsicRealName] = value;
	      }
	    }
	  }

	  return value;
	};

	var callBind$2 = createCommonjsModule(function (module) {





	var $apply = GetIntrinsic$2('%Function.prototype.apply%');
	var $call = GetIntrinsic$2('%Function.prototype.call%');
	var $reflectApply = GetIntrinsic$2('%Reflect.apply%', true) || functionBind.call($call, $apply);
	var $defineProperty = GetIntrinsic$2('%Object.defineProperty%', true);

	if ($defineProperty) {
	  try {
	    $defineProperty({}, 'a', {
	      value: 1
	    });
	  } catch (e) {
	    // IE 8 has a broken defineProperty
	    $defineProperty = null;
	  }
	}

	module.exports = function callBind() {
	  return $reflectApply(functionBind, $call, arguments);
	};

	var applyBind = function applyBind() {
	  return $reflectApply(functionBind, $apply, arguments);
	};

	if ($defineProperty) {
	  $defineProperty(module.exports, 'apply', {
	    value: applyBind
	  });
	} else {
	  module.exports.apply = applyBind;
	}
	});

	var $indexOf = callBind$2(GetIntrinsic$2('String.prototype.indexOf'));

	var callBound = function callBoundIntrinsic(name, allowMissing) {
	  var intrinsic = GetIntrinsic$2(name, !!allowMissing);

	  if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {
	    return callBind$2(intrinsic);
	  }

	  return intrinsic;
	};

	var $Map = typeof Map === 'function' && Map.prototype ? Map : null;
	var $Set = typeof Set === 'function' && Set.prototype ? Set : null;
	var exported;

	if (!$Map) {
	  // eslint-disable-next-line no-unused-vars
	  exported = function isMap(x) {
	    // `Map` is not present in this environment.
	    return false;
	  };
	}

	var $mapHas = $Map ? Map.prototype.has : null;
	var $setHas = $Set ? Set.prototype.has : null;

	if (!exported && !$mapHas) {
	  // eslint-disable-next-line no-unused-vars
	  exported = function isMap(x) {
	    // `Map` does not have a `has` method
	    return false;
	  };
	}

	var isMap = exported || function isMap(x) {
	  if (!x || typeof x !== 'object') {
	    return false;
	  }

	  try {
	    $mapHas.call(x);

	    if ($setHas) {
	      try {
	        $setHas.call(x);
	      } catch (e) {
	        return true;
	      }
	    }

	    return x instanceof $Map; // core-js workaround, pre-v2.5.0
	  } catch (e) {}

	  return false;
	};

	var $Map$1 = typeof Map === 'function' && Map.prototype ? Map : null;
	var $Set$1 = typeof Set === 'function' && Set.prototype ? Set : null;
	var exported$1;

	if (!$Set$1) {
	  // eslint-disable-next-line no-unused-vars
	  exported$1 = function isSet(x) {
	    // `Set` is not present in this environment.
	    return false;
	  };
	}

	var $mapHas$1 = $Map$1 ? Map.prototype.has : null;
	var $setHas$1 = $Set$1 ? Set.prototype.has : null;

	if (!exported$1 && !$setHas$1) {
	  // eslint-disable-next-line no-unused-vars
	  exported$1 = function isSet(x) {
	    // `Set` does not have a `has` method
	    return false;
	  };
	}

	var isSet = exported$1 || function isSet(x) {
	  if (!x || typeof x !== 'object') {
	    return false;
	  }

	  try {
	    $setHas$1.call(x);

	    if ($mapHas$1) {
	      try {
	        $mapHas$1.call(x);
	      } catch (e) {
	        return true;
	      }
	    }

	    return x instanceof $Set$1; // core-js workaround, pre-v2.5.0
	  } catch (e) {}

	  return false;
	};

	var $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;
	var $WeakSet = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;
	var exported$2;

	if (!$WeakMap) {
	  // eslint-disable-next-line no-unused-vars
	  exported$2 = function isWeakMap(x) {
	    // `WeakMap` is not present in this environment.
	    return false;
	  };
	}

	var $mapHas$2 = $WeakMap ? $WeakMap.prototype.has : null;
	var $setHas$2 = $WeakSet ? $WeakSet.prototype.has : null;

	if (!exported$2 && !$mapHas$2) {
	  // eslint-disable-next-line no-unused-vars
	  exported$2 = function isWeakMap(x) {
	    // `WeakMap` does not have a `has` method
	    return false;
	  };
	}

	var isWeakmap = exported$2 || function isWeakMap(x) {
	  if (!x || typeof x !== 'object') {
	    return false;
	  }

	  try {
	    $mapHas$2.call(x, $mapHas$2);

	    if ($setHas$2) {
	      try {
	        $setHas$2.call(x, $setHas$2);
	      } catch (e) {
	        return true;
	      }
	    }

	    return x instanceof $WeakMap; // core-js workaround, pre-v3
	  } catch (e) {}

	  return false;
	};

	var isWeakset = createCommonjsModule(function (module) {

	var $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;
	var $WeakSet = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;
	var exported;

	if (!$WeakMap) {
	  // eslint-disable-next-line no-unused-vars
	  exported = function isWeakSet(x) {
	    // `WeakSet` is not present in this environment.
	    return false;
	  };
	}

	var $mapHas = $WeakMap ? $WeakMap.prototype.has : null;
	var $setHas = $WeakSet ? $WeakSet.prototype.has : null;

	if (!exported && !$setHas) {
	  // eslint-disable-next-line no-unused-vars
	  module.exports = function isWeakSet(x) {
	    // `WeakSet` does not have a `has` method
	    return false;
	  };
	}

	module.exports = exported || function isWeakSet(x) {
	  if (!x || typeof x !== 'object') {
	    return false;
	  }

	  try {
	    $setHas.call(x, $setHas);

	    if ($mapHas) {
	      try {
	        $mapHas.call(x, $mapHas);
	      } catch (e) {
	        return true;
	      }
	    }

	    return x instanceof $WeakSet; // core-js workaround, pre-v3
	  } catch (e) {}

	  return false;
	};
	});

	var whichCollection = function whichCollection(value) {
	  if (value && typeof value === 'object') {
	    if (isMap(value)) {
	      return 'Map';
	    }

	    if (isSet(value)) {
	      return 'Set';
	    }

	    if (isWeakmap(value)) {
	      return 'WeakMap';
	    }

	    if (isWeakset(value)) {
	      return 'WeakSet';
	    }
	  }

	  return false;
	};

	var toString$1 = {}.toString;

	var isarray$1 = Array.isArray || function (arr) {
	  return toString$1.call(arr) == '[object Array]';
	};

	var $indexOf$1 = callBind$1(GetIntrinsic$1('String.prototype.indexOf'));

	var callBound$1 = function callBoundIntrinsic(name, allowMissing) {
	  var intrinsic = GetIntrinsic$1(name, !!allowMissing);

	  if (typeof intrinsic === 'function' && $indexOf$1(name, '.prototype.')) {
	    return callBind$1(intrinsic);
	  }

	  return intrinsic;
	};

	var esGetIterator = createCommonjsModule(function (module) {
	/* eslint global-require: 0 */
	// the code is structured this way so that bundlers can
	// alias out `has-symbols` to `() => true` or `() => false` if your target
	// environments' Symbol capabilities are known, and then use
	// dead code elimination on the rest of this module.
	//
	// Similarly, `isarray` can be aliased to `Array.isArray` if
	// available in all target environments.



	if (hasSymbols$1() || shams()) {
	  var $iterator = Symbol.iterator; // Symbol is available natively or shammed
	  // natively:
	  //  - Chrome >= 38
	  //  - Edge 12-14?, Edge >= 15 for sure
	  //  - FF >= 36
	  //  - Safari >= 9
	  //  - node >= 0.12

	  module.exports = function getIterator(iterable) {
	    // alternatively, `iterable[$iterator]?.()`
	    if (iterable != null && typeof iterable[$iterator] !== 'undefined') {
	      return iterable[$iterator]();
	    }

	    if (isArguments$1(iterable)) {
	      // arguments objects lack Symbol.iterator
	      // - node 0.12
	      return Array.prototype[$iterator].call(iterable);
	    }
	  };
	} else {
	  // Symbol is not available, native or shammed
	  var isArray = isarray$1;

	  var isString$1 = isString;

	  var GetIntrinsic = GetIntrinsic$1;

	  var $Map = GetIntrinsic('%Map%', true);
	  var $Set = GetIntrinsic('%Set%', true);

	  var callBound = callBound$1;

	  var $arrayPush = callBound('Array.prototype.push');
	  var $charCodeAt = callBound('String.prototype.charCodeAt');
	  var $stringSlice = callBound('String.prototype.slice');

	  var advanceStringIndex = function advanceStringIndex(S, index) {
	    var length = S.length;

	    if (index + 1 >= length) {
	      return index + 1;
	    }

	    var first = $charCodeAt(S, index);

	    if (first < 0xD800 || first > 0xDBFF) {
	      return index + 1;
	    }

	    var second = $charCodeAt(S, index + 1);

	    if (second < 0xDC00 || second > 0xDFFF) {
	      return index + 1;
	    }

	    return index + 2;
	  };

	  var getArrayIterator = function getArrayIterator(arraylike) {
	    var i = 0;
	    return {
	      next: function next() {
	        var done = i >= arraylike.length;
	        var value;

	        if (!done) {
	          value = arraylike[i];
	          i += 1;
	        }

	        return {
	          done: done,
	          value: value
	        };
	      }
	    };
	  };

	  var getNonCollectionIterator = function getNonCollectionIterator(iterable) {
	    if (isArray(iterable) || isArguments$1(iterable)) {
	      return getArrayIterator(iterable);
	    }

	    if (isString$1(iterable)) {
	      var i = 0;
	      return {
	        next: function next() {
	          var nextIndex = advanceStringIndex(iterable, i);
	          var value = $stringSlice(iterable, i, nextIndex);
	          i = nextIndex;
	          return {
	            done: nextIndex > iterable.length,
	            value: value
	          };
	        }
	      };
	    }
	  };

	  if (!$Map && !$Set) {
	    // the only language iterables are Array, String, arguments
	    // - Safari <= 6.0
	    // - Chrome < 38
	    // - node < 0.12
	    // - FF < 13
	    // - IE < 11
	    // - Edge < 11
	    module.exports = getNonCollectionIterator;
	  } else {
	    // either Map or Set are available, but Symbol is not
	    // - es6-shim on an ES5 browser
	    // - Safari 6.2 (maybe 6.1?)
	    // - FF v[13, 36)
	    // - IE 11
	    // - Edge 11
	    // - Safari v[6, 9)
	    var isMap$1 = isMap;

	    var isSet$1 = isSet; // Firefox >= 27, IE 11, Safari 6.2 - 9, Edge 11, es6-shim in older envs, all have forEach


	    var $mapForEach = callBound('Map.prototype.forEach', true);
	    var $setForEach = callBound('Set.prototype.forEach', true);

	    if (typeof process === 'undefined' || !process.versions || !process.versions.node) {
	      // "if is not node"
	      // Firefox 17 - 26 has `.iterator()`, whose iterator `.next()` either
	      // returns a value, or throws a StopIteration object. These browsers
	      // do not have any other mechanism for iteration.
	      var $mapIterator = callBound('Map.prototype.iterator', true);
	      var $setIterator = callBound('Set.prototype.iterator', true);

	      var getStopIterationIterator = function (iterator) {
	        var done = false;
	        return {
	          next: function next() {
	            try {
	              return {
	                done: done,
	                value: done ? undefined : iterator.next()
	              };
	            } catch (e) {
	              done = true;
	              return {
	                done: true,
	                value: undefined
	              };
	            }
	          }
	        };
	      };
	    } // Firefox 27-35, and some older es6-shim versions, use a string "@@iterator" property
	    // this returns a proper iterator object, so we should use it instead of forEach.
	    // newer es6-shim versions use a string "_es6-shim iterator_" property.


	    var $mapAtAtIterator = callBound('Map.prototype.@@iterator', true) || callBound('Map.prototype._es6-shim iterator_', true);
	    var $setAtAtIterator = callBound('Set.prototype.@@iterator', true) || callBound('Set.prototype._es6-shim iterator_', true);

	    var getCollectionIterator = function getCollectionIterator(iterable) {
	      if (isMap$1(iterable)) {
	        if ($mapIterator) {
	          return getStopIterationIterator($mapIterator(iterable));
	        }

	        if ($mapAtAtIterator) {
	          return $mapAtAtIterator(iterable);
	        }

	        if ($mapForEach) {
	          var entries = [];
	          $mapForEach(iterable, function (v, k) {
	            $arrayPush(entries, [k, v]);
	          });
	          return getArrayIterator(entries);
	        }
	      }

	      if (isSet$1(iterable)) {
	        if ($setIterator) {
	          return getStopIterationIterator($setIterator(iterable));
	        }

	        if ($setAtAtIterator) {
	          return $setAtAtIterator(iterable);
	        }

	        if ($setForEach) {
	          var values = [];
	          $setForEach(iterable, function (v) {
	            $arrayPush(values, v);
	          });
	          return getArrayIterator(values);
	        }
	      }
	    };

	    module.exports = function getIterator(iterable) {
	      return getCollectionIterator(iterable) || getNonCollectionIterator(iterable);
	    };
	  }
	}
	});

	/* globals
		AggregateError,
		Atomics,
		FinalizationRegistry,
		SharedArrayBuffer,
		WeakRef,
	*/

	var undefined$4;
	var $SyntaxError$2 = SyntaxError;
	var $Function$2 = Function;
	var $TypeError$5 = TypeError; // eslint-disable-next-line consistent-return

	var getEvalledConstructor$2 = function (expressionSyntax) {
	  try {
	    // eslint-disable-next-line no-new-func
	    return Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	  } catch (e) {}
	};

	var $gOPD$4 = Object.getOwnPropertyDescriptor;

	if ($gOPD$4) {
	  try {
	    $gOPD$4({}, '');
	  } catch (e) {
	    $gOPD$4 = null; // this is IE 8, which has a broken gOPD
	  }
	}

	var throwTypeError$3 = function () {
	  throw new $TypeError$5();
	};

	var ThrowTypeError$3 = $gOPD$4 ? function () {
	  try {
	    // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
	    arguments.callee; // IE 8 does not throw here

	    return throwTypeError$3;
	  } catch (calleeThrows) {
	    try {
	      // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
	      return $gOPD$4(arguments, 'callee').get;
	    } catch (gOPDthrows) {
	      return throwTypeError$3;
	    }
	  }
	}() : throwTypeError$3;

	var hasSymbols$6 = hasSymbols$1();

	var getProto$4 = Object.getPrototypeOf || function (x) {
	  return x.__proto__;
	}; // eslint-disable-line no-proto


	var asyncGenFunction$3 = getEvalledConstructor$2('async function* () {}');
	var asyncGenFunctionPrototype$2 = asyncGenFunction$3 ? asyncGenFunction$3.prototype : undefined$4;
	var asyncGenPrototype$2 = asyncGenFunctionPrototype$2 ? asyncGenFunctionPrototype$2.prototype : undefined$4;
	var TypedArray$3 = typeof Uint8Array === 'undefined' ? undefined$4 : getProto$4(Uint8Array);
	var INTRINSICS$3 = {
	  '%AggregateError%': typeof AggregateError === 'undefined' ? undefined$4 : AggregateError,
	  '%Array%': Array,
	  '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$4 : ArrayBuffer,
	  '%ArrayIteratorPrototype%': hasSymbols$6 ? getProto$4([][Symbol.iterator]()) : undefined$4,
	  '%AsyncFromSyncIteratorPrototype%': undefined$4,
	  '%AsyncFunction%': getEvalledConstructor$2('async function () {}'),
	  '%AsyncGenerator%': asyncGenFunctionPrototype$2,
	  '%AsyncGeneratorFunction%': asyncGenFunction$3,
	  '%AsyncIteratorPrototype%': asyncGenPrototype$2 ? getProto$4(asyncGenPrototype$2) : undefined$4,
	  '%Atomics%': typeof Atomics === 'undefined' ? undefined$4 : Atomics,
	  '%BigInt%': typeof BigInt === 'undefined' ? undefined$4 : BigInt,
	  '%Boolean%': Boolean,
	  '%DataView%': typeof DataView === 'undefined' ? undefined$4 : DataView,
	  '%Date%': Date,
	  '%decodeURI%': decodeURI,
	  '%decodeURIComponent%': decodeURIComponent,
	  '%encodeURI%': encodeURI,
	  '%encodeURIComponent%': encodeURIComponent,
	  '%Error%': Error,
	  '%eval%': eval,
	  // eslint-disable-line no-eval
	  '%EvalError%': EvalError,
	  '%Float32Array%': typeof Float32Array === 'undefined' ? undefined$4 : Float32Array,
	  '%Float64Array%': typeof Float64Array === 'undefined' ? undefined$4 : Float64Array,
	  '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$4 : FinalizationRegistry,
	  '%Function%': $Function$2,
	  '%GeneratorFunction%': getEvalledConstructor$2('function* () {}'),
	  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined$4 : Int8Array,
	  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined$4 : Int16Array,
	  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined$4 : Int32Array,
	  '%isFinite%': isFinite,
	  '%isNaN%': isNaN,
	  '%IteratorPrototype%': hasSymbols$6 ? getProto$4(getProto$4([][Symbol.iterator]())) : undefined$4,
	  '%JSON%': typeof JSON === 'object' ? JSON : undefined$4,
	  '%Map%': typeof Map === 'undefined' ? undefined$4 : Map,
	  '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$6 ? undefined$4 : getProto$4(new Map()[Symbol.iterator]()),
	  '%Math%': Math,
	  '%Number%': Number,
	  '%Object%': Object,
	  '%parseFloat%': parseFloat,
	  '%parseInt%': parseInt,
	  '%Promise%': typeof Promise === 'undefined' ? undefined$4 : Promise,
	  '%Proxy%': typeof Proxy === 'undefined' ? undefined$4 : Proxy,
	  '%RangeError%': RangeError,
	  '%ReferenceError%': ReferenceError,
	  '%Reflect%': typeof Reflect === 'undefined' ? undefined$4 : Reflect,
	  '%RegExp%': RegExp,
	  '%Set%': typeof Set === 'undefined' ? undefined$4 : Set,
	  '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$6 ? undefined$4 : getProto$4(new Set()[Symbol.iterator]()),
	  '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$4 : SharedArrayBuffer,
	  '%String%': String,
	  '%StringIteratorPrototype%': hasSymbols$6 ? getProto$4(''[Symbol.iterator]()) : undefined$4,
	  '%Symbol%': hasSymbols$6 ? Symbol : undefined$4,
	  '%SyntaxError%': $SyntaxError$2,
	  '%ThrowTypeError%': ThrowTypeError$3,
	  '%TypedArray%': TypedArray$3,
	  '%TypeError%': $TypeError$5,
	  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$4 : Uint8Array,
	  '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$4 : Uint8ClampedArray,
	  '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$4 : Uint16Array,
	  '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$4 : Uint32Array,
	  '%URIError%': URIError,
	  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined$4 : WeakMap,
	  '%WeakRef%': typeof WeakRef === 'undefined' ? undefined$4 : WeakRef,
	  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined$4 : WeakSet
	};
	var LEGACY_ALIASES$2 = {
	  '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	  '%ArrayPrototype%': ['Array', 'prototype'],
	  '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	  '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	  '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	  '%ArrayProto_values%': ['Array', 'prototype', 'values'],
	  '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	  '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	  '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	  '%BooleanPrototype%': ['Boolean', 'prototype'],
	  '%DataViewPrototype%': ['DataView', 'prototype'],
	  '%DatePrototype%': ['Date', 'prototype'],
	  '%ErrorPrototype%': ['Error', 'prototype'],
	  '%EvalErrorPrototype%': ['EvalError', 'prototype'],
	  '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	  '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	  '%FunctionPrototype%': ['Function', 'prototype'],
	  '%Generator%': ['GeneratorFunction', 'prototype'],
	  '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	  '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	  '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	  '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	  '%JSONParse%': ['JSON', 'parse'],
	  '%JSONStringify%': ['JSON', 'stringify'],
	  '%MapPrototype%': ['Map', 'prototype'],
	  '%NumberPrototype%': ['Number', 'prototype'],
	  '%ObjectPrototype%': ['Object', 'prototype'],
	  '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	  '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	  '%PromisePrototype%': ['Promise', 'prototype'],
	  '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	  '%Promise_all%': ['Promise', 'all'],
	  '%Promise_reject%': ['Promise', 'reject'],
	  '%Promise_resolve%': ['Promise', 'resolve'],
	  '%RangeErrorPrototype%': ['RangeError', 'prototype'],
	  '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	  '%RegExpPrototype%': ['RegExp', 'prototype'],
	  '%SetPrototype%': ['Set', 'prototype'],
	  '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	  '%StringPrototype%': ['String', 'prototype'],
	  '%SymbolPrototype%': ['Symbol', 'prototype'],
	  '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	  '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	  '%TypeErrorPrototype%': ['TypeError', 'prototype'],
	  '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	  '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	  '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	  '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	  '%URIErrorPrototype%': ['URIError', 'prototype'],
	  '%WeakMapPrototype%': ['WeakMap', 'prototype'],
	  '%WeakSetPrototype%': ['WeakSet', 'prototype']
	};





	var $concat$2 = functionBind.call(Function.call, Array.prototype.concat);
	var $spliceApply$2 = functionBind.call(Function.apply, Array.prototype.splice);
	var $replace$3 = functionBind.call(Function.call, String.prototype.replace);
	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */

	var rePropName$3 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar$3 = /\\(\\)?/g;
	/** Used to match backslashes in property paths. */

	var stringToPath$3 = function stringToPath(string) {
	  var result = [];
	  $replace$3(string, rePropName$3, function (match, number, quote, subString) {
	    result[result.length] = quote ? $replace$3(subString, reEscapeChar$3, '$1') : number || match;
	  });
	  return result;
	};
	/* end adaptation */


	var getBaseIntrinsic$3 = function getBaseIntrinsic(name, allowMissing) {
	  var intrinsicName = name;
	  var alias;

	  if (src(LEGACY_ALIASES$2, intrinsicName)) {
	    alias = LEGACY_ALIASES$2[intrinsicName];
	    intrinsicName = '%' + alias[0] + '%';
	  }

	  if (src(INTRINSICS$3, intrinsicName)) {
	    var value = INTRINSICS$3[intrinsicName];

	    if (typeof value === 'undefined' && !allowMissing) {
	      throw new $TypeError$5('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	    }

	    return {
	      alias: alias,
	      name: intrinsicName,
	      value: value
	    };
	  }

	  throw new $SyntaxError$2('intrinsic ' + name + ' does not exist!');
	};

	var GetIntrinsic$3 = function GetIntrinsic(name, allowMissing) {
	  if (typeof name !== 'string' || name.length === 0) {
	    throw new $TypeError$5('intrinsic name must be a non-empty string');
	  }

	  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
	    throw new $TypeError$5('"allowMissing" argument must be a boolean');
	  }

	  var parts = stringToPath$3(name);
	  var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
	  var intrinsic = getBaseIntrinsic$3('%' + intrinsicBaseName + '%', allowMissing);
	  var intrinsicRealName = intrinsic.name;
	  var value = intrinsic.value;
	  var skipFurtherCaching = false;
	  var alias = intrinsic.alias;

	  if (alias) {
	    intrinsicBaseName = alias[0];
	    $spliceApply$2(parts, $concat$2([0, 1], alias));
	  }

	  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
	    var part = parts[i];

	    if (part === 'constructor' || !isOwn) {
	      skipFurtherCaching = true;
	    }

	    intrinsicBaseName += '.' + part;
	    intrinsicRealName = '%' + intrinsicBaseName + '%';

	    if (src(INTRINSICS$3, intrinsicRealName)) {
	      value = INTRINSICS$3[intrinsicRealName];
	    } else if (value != null) {
	      if ($gOPD$4 && i + 1 >= parts.length) {
	        var desc = $gOPD$4(value, part);
	        isOwn = !!desc;

	        if (!allowMissing && !(part in value)) {
	          throw new $TypeError$5('base intrinsic for ' + name + ' exists, but the property is not available.');
	        } // By convention, when a data property is converted to an accessor
	        // property to emulate a data property that does not suffer from
	        // the override mistake, that accessor's getter is marked with
	        // an `originalValue` property. Here, when we detect this, we
	        // uphold the illusion by pretending to see that original data
	        // property, i.e., returning the value rather than the getter
	        // itself.


	        if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
	          value = desc.get;
	        } else {
	          value = value[part];
	        }
	      } else {
	        isOwn = src(value, part);
	        value = value[part];
	      }

	      if (isOwn && !skipFurtherCaching) {
	        INTRINSICS$3[intrinsicRealName] = value;
	      }
	    }
	  }

	  return value;
	};

	var callBind$3 = createCommonjsModule(function (module) {





	var $apply = GetIntrinsic$3('%Function.prototype.apply%');
	var $call = GetIntrinsic$3('%Function.prototype.call%');
	var $reflectApply = GetIntrinsic$3('%Reflect.apply%', true) || functionBind.call($call, $apply);
	var $defineProperty = GetIntrinsic$3('%Object.defineProperty%', true);

	if ($defineProperty) {
	  try {
	    $defineProperty({}, 'a', {
	      value: 1
	    });
	  } catch (e) {
	    // IE 8 has a broken defineProperty
	    $defineProperty = null;
	  }
	}

	module.exports = function callBind() {
	  return $reflectApply(functionBind, $call, arguments);
	};

	var applyBind = function applyBind() {
	  return $reflectApply(functionBind, $apply, arguments);
	};

	if ($defineProperty) {
	  $defineProperty(module.exports, 'apply', {
	    value: applyBind
	  });
	} else {
	  module.exports.apply = applyBind;
	}
	});

	var $indexOf$2 = callBind$3(GetIntrinsic$3('String.prototype.indexOf'));

	var callBound$2 = function callBoundIntrinsic(name, allowMissing) {
	  var intrinsic = GetIntrinsic$3(name, !!allowMissing);

	  if (typeof intrinsic === 'function' && $indexOf$2(name, '.prototype.')) {
	    return callBind$3(intrinsic);
	  }

	  return intrinsic;
	};

	var hasMap = typeof Map === 'function' && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === 'function' && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;
	var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
	var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
	var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
	var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
	var booleanValueOf = Boolean.prototype.valueOf;
	var objectToString = Object.prototype.toString;
	var functionToString = Function.prototype.toString;
	var match = String.prototype.match;
	var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;

	var objectInspect = function inspect_(obj, options, depth, seen) {
	  var opts = options || {};

	  if (has$1(opts, 'quoteStyle') && opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double') {
	    throw new TypeError('option "quoteStyle" must be "single" or "double"');
	  }

	  if (has$1(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number' ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
	    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
	  }

	  var customInspect = has$1(opts, 'customInspect') ? opts.customInspect : true;

	  if (typeof customInspect !== 'boolean') {
	    throw new TypeError('option "customInspect", if provided, must be `true` or `false`');
	  }

	  if (has$1(opts, 'indent') && opts.indent !== null && opts.indent !== '\t' && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
	    throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
	  }

	  if (typeof obj === 'undefined') {
	    return 'undefined';
	  }

	  if (obj === null) {
	    return 'null';
	  }

	  if (typeof obj === 'boolean') {
	    return obj ? 'true' : 'false';
	  }

	  if (typeof obj === 'string') {
	    return inspectString(obj, opts);
	  }

	  if (typeof obj === 'number') {
	    if (obj === 0) {
	      return Infinity / obj > 0 ? '0' : '-0';
	    }

	    return String(obj);
	  }

	  if (typeof obj === 'bigint') {
	    // eslint-disable-line valid-typeof
	    return String(obj) + 'n';
	  }

	  var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;

	  if (typeof depth === 'undefined') {
	    depth = 0;
	  }

	  if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
	    return isArray(obj) ? '[Array]' : '[Object]';
	  }

	  var indent = getIndent(opts, depth);

	  if (typeof seen === 'undefined') {
	    seen = [];
	  } else if (indexOf(seen, obj) >= 0) {
	    return '[Circular]';
	  }

	  function inspect(value, from, noIndent) {
	    if (from) {
	      seen = seen.slice();
	      seen.push(from);
	    }

	    if (noIndent) {
	      var newOpts = {
	        depth: opts.depth
	      };

	      if (has$1(opts, 'quoteStyle')) {
	        newOpts.quoteStyle = opts.quoteStyle;
	      }

	      return inspect_(value, newOpts, depth + 1, seen);
	    }

	    return inspect_(value, opts, depth + 1, seen);
	  }

	  if (typeof obj === 'function') {
	    var name = nameOf(obj);
	    return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']';
	  }

	  if (isSymbol$1(obj)) {
	    var symString = Symbol.prototype.toString.call(obj);
	    return typeof obj === 'object' ? markBoxed(symString) : symString;
	  }

	  if (isElement(obj)) {
	    var s = '<' + String(obj.nodeName).toLowerCase();
	    var attrs = obj.attributes || [];

	    for (var i = 0; i < attrs.length; i++) {
	      s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
	    }

	    s += '>';

	    if (obj.childNodes && obj.childNodes.length) {
	      s += '...';
	    }

	    s += '</' + String(obj.nodeName).toLowerCase() + '>';
	    return s;
	  }

	  if (isArray(obj)) {
	    if (obj.length === 0) {
	      return '[]';
	    }

	    var xs = arrObjKeys(obj, inspect);

	    if (indent && !singleLineValues(xs)) {
	      return '[' + indentedJoin(xs, indent) + ']';
	    }

	    return '[ ' + xs.join(', ') + ' ]';
	  }

	  if (isError(obj)) {
	    var parts = arrObjKeys(obj, inspect);

	    if (parts.length === 0) {
	      return '[' + String(obj) + ']';
	    }

	    return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
	  }

	  if (typeof obj === 'object' && customInspect) {
	    if (typeof obj.inspect === 'function') {
	      return obj.inspect();
	    }
	  }

	  if (isMap$1(obj)) {
	    var mapParts = [];
	    mapForEach.call(obj, function (value, key) {
	      mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
	    });
	    return collectionOf('Map', mapSize.call(obj), mapParts, indent);
	  }

	  if (isSet$1(obj)) {
	    var setParts = [];
	    setForEach.call(obj, function (value) {
	      setParts.push(inspect(value, obj));
	    });
	    return collectionOf('Set', setSize.call(obj), setParts, indent);
	  }

	  if (isWeakMap(obj)) {
	    return weakCollectionOf('WeakMap');
	  }

	  if (isWeakSet(obj)) {
	    return weakCollectionOf('WeakSet');
	  }

	  if (isNumber(obj)) {
	    return markBoxed(inspect(Number(obj)));
	  }

	  if (isBigInt(obj)) {
	    return markBoxed(inspect(bigIntValueOf.call(obj)));
	  }

	  if (isBoolean(obj)) {
	    return markBoxed(booleanValueOf.call(obj));
	  }

	  if (isString$1(obj)) {
	    return markBoxed(inspect(String(obj)));
	  }

	  if (!isDate(obj) && !isRegExp(obj)) {
	    var ys = arrObjKeys(obj, inspect);

	    if (ys.length === 0) {
	      return '{}';
	    }

	    if (indent) {
	      return '{' + indentedJoin(ys, indent) + '}';
	    }

	    return '{ ' + ys.join(', ') + ' }';
	  }

	  return String(obj);
	};

	function wrapQuotes(s, defaultStyle, opts) {
	  var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
	  return quoteChar + s + quoteChar;
	}

	function quote(s) {
	  return String(s).replace(/"/g, '&quot;');
	}

	function isArray(obj) {
	  return toStr$a(obj) === '[object Array]';
	}

	function isDate(obj) {
	  return toStr$a(obj) === '[object Date]';
	}

	function isRegExp(obj) {
	  return toStr$a(obj) === '[object RegExp]';
	}

	function isError(obj) {
	  return toStr$a(obj) === '[object Error]';
	}

	function isSymbol$1(obj) {
	  return toStr$a(obj) === '[object Symbol]';
	}

	function isString$1(obj) {
	  return toStr$a(obj) === '[object String]';
	}

	function isNumber(obj) {
	  return toStr$a(obj) === '[object Number]';
	}

	function isBigInt(obj) {
	  return toStr$a(obj) === '[object BigInt]';
	}

	function isBoolean(obj) {
	  return toStr$a(obj) === '[object Boolean]';
	}

	var hasOwn = Object.prototype.hasOwnProperty || function (key) {
	  return key in this;
	};

	function has$1(obj, key) {
	  return hasOwn.call(obj, key);
	}

	function toStr$a(obj) {
	  return objectToString.call(obj);
	}

	function nameOf(f) {
	  if (f.name) {
	    return f.name;
	  }

	  var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);

	  if (m) {
	    return m[1];
	  }

	  return null;
	}

	function indexOf(xs, x) {
	  if (xs.indexOf) {
	    return xs.indexOf(x);
	  }

	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) {
	      return i;
	    }
	  }

	  return -1;
	}

	function isMap$1(x) {
	  if (!mapSize || !x || typeof x !== 'object') {
	    return false;
	  }

	  try {
	    mapSize.call(x);

	    try {
	      setSize.call(x);
	    } catch (s) {
	      return true;
	    }

	    return x instanceof Map; // core-js workaround, pre-v2.5.0
	  } catch (e) {}

	  return false;
	}

	function isWeakMap(x) {
	  if (!weakMapHas || !x || typeof x !== 'object') {
	    return false;
	  }

	  try {
	    weakMapHas.call(x, weakMapHas);

	    try {
	      weakSetHas.call(x, weakSetHas);
	    } catch (s) {
	      return true;
	    }

	    return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
	  } catch (e) {}

	  return false;
	}

	function isSet$1(x) {
	  if (!setSize || !x || typeof x !== 'object') {
	    return false;
	  }

	  try {
	    setSize.call(x);

	    try {
	      mapSize.call(x);
	    } catch (m) {
	      return true;
	    }

	    return x instanceof Set; // core-js workaround, pre-v2.5.0
	  } catch (e) {}

	  return false;
	}

	function isWeakSet(x) {
	  if (!weakSetHas || !x || typeof x !== 'object') {
	    return false;
	  }

	  try {
	    weakSetHas.call(x, weakSetHas);

	    try {
	      weakMapHas.call(x, weakMapHas);
	    } catch (s) {
	      return true;
	    }

	    return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
	  } catch (e) {}

	  return false;
	}

	function isElement(x) {
	  if (!x || typeof x !== 'object') {
	    return false;
	  }

	  if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
	    return true;
	  }

	  return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
	}

	function inspectString(str, opts) {
	  if (str.length > opts.maxStringLength) {
	    var remaining = str.length - opts.maxStringLength;
	    var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
	    return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
	  } // eslint-disable-next-line no-control-regex


	  var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
	  return wrapQuotes(s, 'single', opts);
	}

	function lowbyte(c) {
	  var n = c.charCodeAt(0);
	  var x = {
	    8: 'b',
	    9: 't',
	    10: 'n',
	    12: 'f',
	    13: 'r'
	  }[n];

	  if (x) {
	    return '\\' + x;
	  }

	  return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
	}

	function markBoxed(str) {
	  return 'Object(' + str + ')';
	}

	function weakCollectionOf(type) {
	  return type + ' { ? }';
	}

	function collectionOf(type, size, entries, indent) {
	  var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(', ');
	  return type + ' (' + size + ') {' + joinedEntries + '}';
	}

	function singleLineValues(xs) {
	  for (var i = 0; i < xs.length; i++) {
	    if (indexOf(xs[i], '\n') >= 0) {
	      return false;
	    }
	  }

	  return true;
	}

	function getIndent(opts, depth) {
	  var baseIndent;

	  if (opts.indent === '\t') {
	    baseIndent = '\t';
	  } else if (typeof opts.indent === 'number' && opts.indent > 0) {
	    baseIndent = Array(opts.indent + 1).join(' ');
	  } else {
	    return null;
	  }

	  return {
	    base: baseIndent,
	    prev: Array(depth + 1).join(baseIndent)
	  };
	}

	function indentedJoin(xs, indent) {
	  if (xs.length === 0) {
	    return '';
	  }

	  var lineJoiner = '\n' + indent.prev + indent.base;
	  return lineJoiner + xs.join(',' + lineJoiner) + '\n' + indent.prev;
	}

	function arrObjKeys(obj, inspect) {
	  var isArr = isArray(obj);
	  var xs = [];

	  if (isArr) {
	    xs.length = obj.length;

	    for (var i = 0; i < obj.length; i++) {
	      xs[i] = has$1(obj, i) ? inspect(obj[i], obj) : '';
	    }
	  }

	  for (var key in obj) {
	    // eslint-disable-line no-restricted-syntax
	    if (!has$1(obj, key)) {
	      continue;
	    } // eslint-disable-line no-restricted-syntax, no-continue


	    if (isArr && String(Number(key)) === key && key < obj.length) {
	      continue;
	    } // eslint-disable-line no-restricted-syntax, no-continue


	    if (/[^\w$]/.test(key)) {
	      xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
	    } else {
	      xs.push(key + ': ' + inspect(obj[key], obj));
	    }
	  }

	  return xs;
	}

	var $TypeError$6 = GetIntrinsic$3('%TypeError%');
	var $WeakMap$1 = GetIntrinsic$3('%WeakMap%', true);
	var $Map$2 = GetIntrinsic$3('%Map%', true);
	var $push = callBound$2('Array.prototype.push');
	var $weakMapGet = callBound$2('WeakMap.prototype.get', true);
	var $weakMapSet = callBound$2('WeakMap.prototype.set', true);
	var $weakMapHas = callBound$2('WeakMap.prototype.has', true);
	var $mapGet = callBound$2('Map.prototype.get', true);
	var $mapSet = callBound$2('Map.prototype.set', true);
	var $mapHas$3 = callBound$2('Map.prototype.has', true);

	var objectGet = function (objects, key) {
	  // eslint-disable-line consistent-return
	  for (var i = 0; i < objects.length; i += 1) {
	    if (objects[i].key === key) {
	      return objects[i].value;
	    }
	  }
	};

	var objectSet = function (objects, key, value) {
	  for (var i = 0; i < objects.length; i += 1) {
	    if (objects[i].key === key) {
	      objects[i].value = value; // eslint-disable-line no-param-reassign

	      return;
	    }
	  }

	  $push(objects, {
	    key: key,
	    value: value
	  });
	};

	var objectHas = function (objects, key) {
	  for (var i = 0; i < objects.length; i += 1) {
	    if (objects[i].key === key) {
	      return true;
	    }
	  }

	  return false;
	};

	var sideChannel = function getSideChannel() {
	  var $wm;
	  var $m;
	  var $o;
	  var channel = {
	    assert: function (key) {
	      if (!channel.has(key)) {
	        throw new $TypeError$6('Side channel does not contain ' + objectInspect(key));
	      }
	    },
	    get: function (key) {
	      // eslint-disable-line consistent-return
	      if ($WeakMap$1 && key && (typeof key === 'object' || typeof key === 'function')) {
	        if ($wm) {
	          return $weakMapGet($wm, key);
	        }
	      } else if ($Map$2) {
	        if ($m) {
	          return $mapGet($m, key);
	        }
	      } else {
	        if ($o) {
	          // eslint-disable-line no-lonely-if
	          return objectGet($o, key);
	        }
	      }
	    },
	    has: function (key) {
	      if ($WeakMap$1 && key && (typeof key === 'object' || typeof key === 'function')) {
	        if ($wm) {
	          return $weakMapHas($wm, key);
	        }
	      } else if ($Map$2) {
	        if ($m) {
	          return $mapHas$3($m, key);
	        }
	      } else {
	        if ($o) {
	          // eslint-disable-line no-lonely-if
	          return objectHas($o, key);
	        }
	      }

	      return false;
	    },
	    set: function (key, value) {
	      if ($WeakMap$1 && key && (typeof key === 'object' || typeof key === 'function')) {
	        if (!$wm) {
	          $wm = new $WeakMap$1();
	        }

	        $weakMapSet($wm, key, value);
	      } else if ($Map$2) {
	        if (!$m) {
	          $m = new $Map$2();
	        }

	        $mapSet($m, key, value);
	      } else {
	        if (!$o) {
	          $o = [];
	        }

	        objectSet($o, key, value);
	      }
	    }
	  };
	  return channel;
	};

	var hasOwn$1 = Object.prototype.hasOwnProperty;
	var toString$2 = Object.prototype.toString;

	var foreach = function forEach(obj, fn, ctx) {
	  if (toString$2.call(fn) !== '[object Function]') {
	    throw new TypeError('iterator must be a function');
	  }

	  var l = obj.length;

	  if (l === +l) {
	    for (var i = 0; i < l; i++) {
	      fn.call(ctx, obj[i], i, obj);
	    }
	  } else {
	    for (var k in obj) {
	      if (hasOwn$1.call(obj, k)) {
	        fn.call(ctx, obj[k], k, obj);
	      }
	    }
	  }
	};

	/**
	 * Array#filter.
	 *
	 * @param {Array} arr
	 * @param {Function} fn
	 * @param {Object=} self
	 * @return {Array}
	 * @throw TypeError
	 */
	var arrayFilter = function (arr, fn, self) {
	  if (arr.filter) return arr.filter(fn, self);
	  if (void 0 === arr || null === arr) throw new TypeError();
	  if ('function' != typeof fn) throw new TypeError();
	  var ret = [];

	  for (var i = 0; i < arr.length; i++) {
	    if (!hasOwn$2.call(arr, i)) continue;
	    var val = arr[i];
	    if (fn.call(self, val, i, arr)) ret.push(val);
	  }

	  return ret;
	};

	var hasOwn$2 = Object.prototype.hasOwnProperty;

	var availableTypedArrays = function availableTypedArrays() {
	  return arrayFilter(['BigInt64Array', 'BigUint64Array', 'Float32Array', 'Float64Array', 'Int16Array', 'Int32Array', 'Int8Array', 'Uint16Array', 'Uint32Array', 'Uint8Array', 'Uint8ClampedArray'], function (typedArray) {
	    return typeof commonjsGlobal[typedArray] === 'function';
	  });
	};

	var $gOPD$5 = GetIntrinsic$1('%Object.getOwnPropertyDescriptor%');

	if ($gOPD$5) {
	  try {
	    $gOPD$5([], 'length');
	  } catch (e) {
	    // IE 8 has a broken gOPD
	    $gOPD$5 = null;
	  }
	}

	var getOwnPropertyDescriptor = $gOPD$5;

	var $toString = callBound$1('Object.prototype.toString');

	var hasSymbols$7 = hasSymbols$1();

	var hasToStringTag$6 = hasSymbols$7 && typeof Symbol.toStringTag === 'symbol';
	var typedArrays = availableTypedArrays();

	var $indexOf$3 = callBound$1('Array.prototype.indexOf', true) || function indexOf(array, value) {
	  for (var i = 0; i < array.length; i += 1) {
	    if (array[i] === value) {
	      return i;
	    }
	  }

	  return -1;
	};

	var $slice = callBound$1('String.prototype.slice');
	var toStrTags = {};



	var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');

	if (hasToStringTag$6 && getOwnPropertyDescriptor && getPrototypeOf) {
	  foreach(typedArrays, function (typedArray) {
	    var arr = new commonjsGlobal[typedArray]();

	    if (!(Symbol.toStringTag in arr)) {
	      throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
	    }

	    var proto = getPrototypeOf(arr);
	    var descriptor = getOwnPropertyDescriptor(proto, Symbol.toStringTag);

	    if (!descriptor) {
	      var superProto = getPrototypeOf(proto);
	      descriptor = getOwnPropertyDescriptor(superProto, Symbol.toStringTag);
	    }

	    toStrTags[typedArray] = descriptor.get;
	  });
	}

	var tryTypedArrays = function tryAllTypedArrays(value) {
	  var anyTrue = false;
	  foreach(toStrTags, function (getter, typedArray) {
	    if (!anyTrue) {
	      try {
	        anyTrue = getter.call(value) === typedArray;
	      } catch (e) {
	        /**/
	      }
	    }
	  });
	  return anyTrue;
	};

	var isTypedArray = function isTypedArray(value) {
	  if (!value || typeof value !== 'object') {
	    return false;
	  }

	  if (!hasToStringTag$6) {
	    var tag = $slice($toString(value), 8, -1);
	    return $indexOf$3(typedArrays, tag) > -1;
	  }

	  if (!getOwnPropertyDescriptor) {
	    return false;
	  }

	  return tryTypedArrays(value);
	};

	var $toString$1 = callBound$1('Object.prototype.toString');

	var hasSymbols$8 = hasSymbols$1();

	var hasToStringTag$7 = hasSymbols$8 && typeof Symbol.toStringTag === 'symbol';
	var typedArrays$1 = availableTypedArrays();
	var $slice$1 = callBound$1('String.prototype.slice');
	var toStrTags$1 = {};



	var getPrototypeOf$1 = Object.getPrototypeOf; // require('getprototypeof');

	if (hasToStringTag$7 && getOwnPropertyDescriptor && getPrototypeOf$1) {
	  foreach(typedArrays$1, function (typedArray) {
	    if (typeof commonjsGlobal[typedArray] === 'function') {
	      var arr = new commonjsGlobal[typedArray]();

	      if (!(Symbol.toStringTag in arr)) {
	        throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
	      }

	      var proto = getPrototypeOf$1(arr);
	      var descriptor = getOwnPropertyDescriptor(proto, Symbol.toStringTag);

	      if (!descriptor) {
	        var superProto = getPrototypeOf$1(proto);
	        descriptor = getOwnPropertyDescriptor(superProto, Symbol.toStringTag);
	      }

	      toStrTags$1[typedArray] = descriptor.get;
	    }
	  });
	}

	var tryTypedArrays$1 = function tryAllTypedArrays(value) {
	  var foundName = false;
	  foreach(toStrTags$1, function (getter, typedArray) {
	    if (!foundName) {
	      try {
	        var name = getter.call(value);

	        if (name === typedArray) {
	          foundName = name;
	        }
	      } catch (e) {}
	    }
	  });
	  return foundName;
	};



	var whichTypedArray = function whichTypedArray(value) {
	  if (!isTypedArray(value)) {
	    return false;
	  }

	  if (!hasToStringTag$7) {
	    return $slice$1($toString$1(value), 8, -1);
	  }

	  return tryTypedArrays$1(value);
	};

	/* globals
		AggregateError,
		Atomics,
		FinalizationRegistry,
		SharedArrayBuffer,
		WeakRef,
	*/

	var undefined$5;
	var $SyntaxError$3 = SyntaxError;
	var $Function$3 = Function;
	var $TypeError$7 = TypeError; // eslint-disable-next-line consistent-return

	var getEvalledConstructor$3 = function (expressionSyntax) {
	  try {
	    // eslint-disable-next-line no-new-func
	    return Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	  } catch (e) {}
	};

	var $gOPD$6 = Object.getOwnPropertyDescriptor;

	if ($gOPD$6) {
	  try {
	    $gOPD$6({}, '');
	  } catch (e) {
	    $gOPD$6 = null; // this is IE 8, which has a broken gOPD
	  }
	}

	var throwTypeError$4 = function () {
	  throw new $TypeError$7();
	};

	var ThrowTypeError$4 = $gOPD$6 ? function () {
	  try {
	    // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
	    arguments.callee; // IE 8 does not throw here

	    return throwTypeError$4;
	  } catch (calleeThrows) {
	    try {
	      // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
	      return $gOPD$6(arguments, 'callee').get;
	    } catch (gOPDthrows) {
	      return throwTypeError$4;
	    }
	  }
	}() : throwTypeError$4;

	var hasSymbols$9 = hasSymbols$1();

	var getProto$5 = Object.getPrototypeOf || function (x) {
	  return x.__proto__;
	}; // eslint-disable-line no-proto


	var asyncGenFunction$4 = getEvalledConstructor$3('async function* () {}');
	var asyncGenFunctionPrototype$3 = asyncGenFunction$4 ? asyncGenFunction$4.prototype : undefined$5;
	var asyncGenPrototype$3 = asyncGenFunctionPrototype$3 ? asyncGenFunctionPrototype$3.prototype : undefined$5;
	var TypedArray$4 = typeof Uint8Array === 'undefined' ? undefined$5 : getProto$5(Uint8Array);
	var INTRINSICS$4 = {
	  '%AggregateError%': typeof AggregateError === 'undefined' ? undefined$5 : AggregateError,
	  '%Array%': Array,
	  '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$5 : ArrayBuffer,
	  '%ArrayIteratorPrototype%': hasSymbols$9 ? getProto$5([][Symbol.iterator]()) : undefined$5,
	  '%AsyncFromSyncIteratorPrototype%': undefined$5,
	  '%AsyncFunction%': getEvalledConstructor$3('async function () {}'),
	  '%AsyncGenerator%': asyncGenFunctionPrototype$3,
	  '%AsyncGeneratorFunction%': asyncGenFunction$4,
	  '%AsyncIteratorPrototype%': asyncGenPrototype$3 ? getProto$5(asyncGenPrototype$3) : undefined$5,
	  '%Atomics%': typeof Atomics === 'undefined' ? undefined$5 : Atomics,
	  '%BigInt%': typeof BigInt === 'undefined' ? undefined$5 : BigInt,
	  '%Boolean%': Boolean,
	  '%DataView%': typeof DataView === 'undefined' ? undefined$5 : DataView,
	  '%Date%': Date,
	  '%decodeURI%': decodeURI,
	  '%decodeURIComponent%': decodeURIComponent,
	  '%encodeURI%': encodeURI,
	  '%encodeURIComponent%': encodeURIComponent,
	  '%Error%': Error,
	  '%eval%': eval,
	  // eslint-disable-line no-eval
	  '%EvalError%': EvalError,
	  '%Float32Array%': typeof Float32Array === 'undefined' ? undefined$5 : Float32Array,
	  '%Float64Array%': typeof Float64Array === 'undefined' ? undefined$5 : Float64Array,
	  '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$5 : FinalizationRegistry,
	  '%Function%': $Function$3,
	  '%GeneratorFunction%': getEvalledConstructor$3('function* () {}'),
	  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined$5 : Int8Array,
	  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined$5 : Int16Array,
	  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined$5 : Int32Array,
	  '%isFinite%': isFinite,
	  '%isNaN%': isNaN,
	  '%IteratorPrototype%': hasSymbols$9 ? getProto$5(getProto$5([][Symbol.iterator]())) : undefined$5,
	  '%JSON%': typeof JSON === 'object' ? JSON : undefined$5,
	  '%Map%': typeof Map === 'undefined' ? undefined$5 : Map,
	  '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$9 ? undefined$5 : getProto$5(new Map()[Symbol.iterator]()),
	  '%Math%': Math,
	  '%Number%': Number,
	  '%Object%': Object,
	  '%parseFloat%': parseFloat,
	  '%parseInt%': parseInt,
	  '%Promise%': typeof Promise === 'undefined' ? undefined$5 : Promise,
	  '%Proxy%': typeof Proxy === 'undefined' ? undefined$5 : Proxy,
	  '%RangeError%': RangeError,
	  '%ReferenceError%': ReferenceError,
	  '%Reflect%': typeof Reflect === 'undefined' ? undefined$5 : Reflect,
	  '%RegExp%': RegExp,
	  '%Set%': typeof Set === 'undefined' ? undefined$5 : Set,
	  '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$9 ? undefined$5 : getProto$5(new Set()[Symbol.iterator]()),
	  '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$5 : SharedArrayBuffer,
	  '%String%': String,
	  '%StringIteratorPrototype%': hasSymbols$9 ? getProto$5(''[Symbol.iterator]()) : undefined$5,
	  '%Symbol%': hasSymbols$9 ? Symbol : undefined$5,
	  '%SyntaxError%': $SyntaxError$3,
	  '%ThrowTypeError%': ThrowTypeError$4,
	  '%TypedArray%': TypedArray$4,
	  '%TypeError%': $TypeError$7,
	  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$5 : Uint8Array,
	  '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$5 : Uint8ClampedArray,
	  '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$5 : Uint16Array,
	  '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$5 : Uint32Array,
	  '%URIError%': URIError,
	  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined$5 : WeakMap,
	  '%WeakRef%': typeof WeakRef === 'undefined' ? undefined$5 : WeakRef,
	  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined$5 : WeakSet
	};
	var LEGACY_ALIASES$3 = {
	  '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	  '%ArrayPrototype%': ['Array', 'prototype'],
	  '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	  '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	  '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	  '%ArrayProto_values%': ['Array', 'prototype', 'values'],
	  '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	  '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	  '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	  '%BooleanPrototype%': ['Boolean', 'prototype'],
	  '%DataViewPrototype%': ['DataView', 'prototype'],
	  '%DatePrototype%': ['Date', 'prototype'],
	  '%ErrorPrototype%': ['Error', 'prototype'],
	  '%EvalErrorPrototype%': ['EvalError', 'prototype'],
	  '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	  '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	  '%FunctionPrototype%': ['Function', 'prototype'],
	  '%Generator%': ['GeneratorFunction', 'prototype'],
	  '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	  '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	  '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	  '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	  '%JSONParse%': ['JSON', 'parse'],
	  '%JSONStringify%': ['JSON', 'stringify'],
	  '%MapPrototype%': ['Map', 'prototype'],
	  '%NumberPrototype%': ['Number', 'prototype'],
	  '%ObjectPrototype%': ['Object', 'prototype'],
	  '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	  '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	  '%PromisePrototype%': ['Promise', 'prototype'],
	  '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	  '%Promise_all%': ['Promise', 'all'],
	  '%Promise_reject%': ['Promise', 'reject'],
	  '%Promise_resolve%': ['Promise', 'resolve'],
	  '%RangeErrorPrototype%': ['RangeError', 'prototype'],
	  '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	  '%RegExpPrototype%': ['RegExp', 'prototype'],
	  '%SetPrototype%': ['Set', 'prototype'],
	  '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	  '%StringPrototype%': ['String', 'prototype'],
	  '%SymbolPrototype%': ['Symbol', 'prototype'],
	  '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	  '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	  '%TypeErrorPrototype%': ['TypeError', 'prototype'],
	  '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	  '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	  '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	  '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	  '%URIErrorPrototype%': ['URIError', 'prototype'],
	  '%WeakMapPrototype%': ['WeakMap', 'prototype'],
	  '%WeakSetPrototype%': ['WeakSet', 'prototype']
	};





	var $concat$3 = functionBind.call(Function.call, Array.prototype.concat);
	var $spliceApply$3 = functionBind.call(Function.apply, Array.prototype.splice);
	var $replace$4 = functionBind.call(Function.call, String.prototype.replace);
	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */

	var rePropName$4 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar$4 = /\\(\\)?/g;
	/** Used to match backslashes in property paths. */

	var stringToPath$4 = function stringToPath(string) {
	  var result = [];
	  $replace$4(string, rePropName$4, function (match, number, quote, subString) {
	    result[result.length] = quote ? $replace$4(subString, reEscapeChar$4, '$1') : number || match;
	  });
	  return result;
	};
	/* end adaptation */


	var getBaseIntrinsic$4 = function getBaseIntrinsic(name, allowMissing) {
	  var intrinsicName = name;
	  var alias;

	  if (src(LEGACY_ALIASES$3, intrinsicName)) {
	    alias = LEGACY_ALIASES$3[intrinsicName];
	    intrinsicName = '%' + alias[0] + '%';
	  }

	  if (src(INTRINSICS$4, intrinsicName)) {
	    var value = INTRINSICS$4[intrinsicName];

	    if (typeof value === 'undefined' && !allowMissing) {
	      throw new $TypeError$7('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	    }

	    return {
	      alias: alias,
	      name: intrinsicName,
	      value: value
	    };
	  }

	  throw new $SyntaxError$3('intrinsic ' + name + ' does not exist!');
	};

	var getIntrinsic = function GetIntrinsic(name, allowMissing) {
	  if (typeof name !== 'string' || name.length === 0) {
	    throw new $TypeError$7('intrinsic name must be a non-empty string');
	  }

	  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
	    throw new $TypeError$7('"allowMissing" argument must be a boolean');
	  }

	  var parts = stringToPath$4(name);
	  var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
	  var intrinsic = getBaseIntrinsic$4('%' + intrinsicBaseName + '%', allowMissing);
	  var intrinsicRealName = intrinsic.name;
	  var value = intrinsic.value;
	  var skipFurtherCaching = false;
	  var alias = intrinsic.alias;

	  if (alias) {
	    intrinsicBaseName = alias[0];
	    $spliceApply$3(parts, $concat$3([0, 1], alias));
	  }

	  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
	    var part = parts[i];

	    if (part === 'constructor' || !isOwn) {
	      skipFurtherCaching = true;
	    }

	    intrinsicBaseName += '.' + part;
	    intrinsicRealName = '%' + intrinsicBaseName + '%';

	    if (src(INTRINSICS$4, intrinsicRealName)) {
	      value = INTRINSICS$4[intrinsicRealName];
	    } else if (value != null) {
	      if ($gOPD$6 && i + 1 >= parts.length) {
	        var desc = $gOPD$6(value, part);
	        isOwn = !!desc;

	        if (!allowMissing && !(part in value)) {
	          throw new $TypeError$7('base intrinsic for ' + name + ' exists, but the property is not available.');
	        } // By convention, when a data property is converted to an accessor
	        // property to emulate a data property that does not suffer from
	        // the override mistake, that accessor's getter is marked with
	        // an `originalValue` property. Here, when we detect this, we
	        // uphold the illusion by pretending to see that original data
	        // property, i.e., returning the value rather than the getter
	        // itself.


	        if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
	          value = desc.get;
	        } else {
	          value = value[part];
	        }
	      } else {
	        isOwn = src(value, part);
	        value = value[part];
	      }

	      if (isOwn && !skipFurtherCaching) {
	        INTRINSICS$4[intrinsicRealName] = value;
	      }
	    }
	  }

	  return value;
	};

	var callBind$4 = createCommonjsModule(function (module) {





	var $apply = getIntrinsic('%Function.prototype.apply%');
	var $call = getIntrinsic('%Function.prototype.call%');
	var $reflectApply = getIntrinsic('%Reflect.apply%', true) || functionBind.call($call, $apply);
	var $defineProperty = getIntrinsic('%Object.defineProperty%', true);

	if ($defineProperty) {
	  try {
	    $defineProperty({}, 'a', {
	      value: 1
	    });
	  } catch (e) {
	    // IE 8 has a broken defineProperty
	    $defineProperty = null;
	  }
	}

	module.exports = function callBind() {
	  return $reflectApply(functionBind, $call, arguments);
	};

	var applyBind = function applyBind() {
	  return $reflectApply(functionBind, $apply, arguments);
	};

	if ($defineProperty) {
	  $defineProperty(module.exports, 'apply', {
	    value: applyBind
	  });
	} else {
	  module.exports.apply = applyBind;
	}
	});

	var $indexOf$4 = callBind$4(getIntrinsic('String.prototype.indexOf'));

	var callBound$3 = function callBoundIntrinsic(name, allowMissing) {
	  var intrinsic = getIntrinsic(name, !!allowMissing);

	  if (typeof intrinsic === 'function' && $indexOf$4(name, '.prototype.') > -1) {
	    return callBind$4(intrinsic);
	  }

	  return intrinsic;
	};

	var canBeObject = function (obj) {
	  return typeof obj !== 'undefined' && obj !== null;
	};

	var hasSymbols$a = shams();



	var toObject = Object;
	var $push$1 = callBound$3('Array.prototype.push');
	var $propIsEnumerable = callBound$3('Object.prototype.propertyIsEnumerable');
	var originalGetSymbols = hasSymbols$a ? Object.getOwnPropertySymbols : null; // eslint-disable-next-line no-unused-vars

	var implementation$4 = function assign(target, source1) {
	  if (!canBeObject(target)) {
	    throw new TypeError('target must be an object');
	  }

	  var objTarget = toObject(target);
	  var s, source, i, props, syms, value, key;

	  for (s = 1; s < arguments.length; ++s) {
	    source = toObject(arguments[s]);
	    props = objectKeys(source);
	    var getSymbols = hasSymbols$a && (Object.getOwnPropertySymbols || originalGetSymbols);

	    if (getSymbols) {
	      syms = getSymbols(source);

	      for (i = 0; i < syms.length; ++i) {
	        key = syms[i];

	        if ($propIsEnumerable(source, key)) {
	          $push$1(props, key);
	        }
	      }
	    }

	    for (i = 0; i < props.length; ++i) {
	      key = props[i];
	      value = source[key];

	      if ($propIsEnumerable(source, key)) {
	        objTarget[key] = value;
	      }
	    }
	  }

	  return objTarget;
	};

	var lacksProperEnumerationOrder = function () {
	  if (!Object.assign) {
	    return false;
	  }
	  /*
	   * v8, specifically in node 4.x, has a bug with incorrect property enumeration order
	   * note: this does not detect the bug unless there's 20 characters
	   */


	  var str = 'abcdefghijklmnopqrst';
	  var letters = str.split('');
	  var map = {};

	  for (var i = 0; i < letters.length; ++i) {
	    map[letters[i]] = letters[i];
	  }

	  var obj = Object.assign({}, map);
	  var actual = '';

	  for (var k in obj) {
	    actual += k;
	  }

	  return str !== actual;
	};

	var assignHasPendingExceptions = function () {
	  if (!Object.assign || !Object.preventExtensions) {
	    return false;
	  }
	  /*
	   * Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	   * which is 72% slower than our shim, and Firefox 40's native implementation.
	   */


	  var thrower = Object.preventExtensions({
	    1: 2
	  });

	  try {
	    Object.assign(thrower, 'xy');
	  } catch (e) {
	    return thrower[1] === 'y';
	  }

	  return false;
	};

	var polyfill$3 = function getPolyfill() {
	  if (!Object.assign) {
	    return implementation$4;
	  }

	  if (lacksProperEnumerationOrder()) {
	    return implementation$4;
	  }

	  if (assignHasPendingExceptions()) {
	    return implementation$4;
	  }

	  return Object.assign;
	};

	var shim$2 = function shimAssign() {
	  var polyfill = polyfill$3();
	  defineProperties_1(Object, {
	    assign: polyfill
	  }, {
	    assign: function () {
	      return Object.assign !== polyfill;
	    }
	  });
	  return polyfill;
	};

	var polyfill$4 = callBind$4.apply(polyfill$3()); // eslint-disable-next-line no-unused-vars

	var bound = function assign(target, source1) {
	  return polyfill$4(Object, arguments);
	};

	defineProperties_1(bound, {
	  getPolyfill: polyfill$3,
	  implementation: implementation$4,
	  shim: shim$2
	});
	var object_assign = bound;

	var $getTime = callBound('Date.prototype.getTime');
	var gPO = Object.getPrototypeOf;
	var $objToString = callBound('Object.prototype.toString');
	var $Set$2 = GetIntrinsic$2('%Set%', true);
	var $mapHas$4 = callBound('Map.prototype.has', true);
	var $mapGet$1 = callBound('Map.prototype.get', true);
	var $mapSize = callBound('Map.prototype.size', true);
	var $setAdd = callBound('Set.prototype.add', true);
	var $setDelete = callBound('Set.prototype.delete', true);
	var $setHas$3 = callBound('Set.prototype.has', true);
	var $setSize = callBound('Set.prototype.size', true); // taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L401-L414

	function setHasEqualElement(set, val1, opts, channel) {
	  var i = esGetIterator(set);
	  var result;

	  while ((result = i.next()) && !result.done) {
	    if (internalDeepEqual(val1, result.value, opts, channel)) {
	      // eslint-disable-line no-use-before-define
	      // Remove the matching element to make sure we do not check that again.
	      $setDelete(set, result.value);
	      return true;
	    }
	  }

	  return false;
	} // taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L416-L439


	function findLooseMatchingPrimitives(prim) {
	  if (typeof prim === 'undefined') {
	    return null;
	  }

	  if (typeof prim === 'object') {
	    // Only pass in null as object!
	    return void 0;
	  }

	  if (typeof prim === 'symbol') {
	    return false;
	  }

	  if (typeof prim === 'string' || typeof prim === 'number') {
	    // Loose equal entries exist only if the string is possible to convert to a regular number and not NaN.
	    return +prim === +prim; // eslint-disable-line no-implicit-coercion
	  }

	  return true;
	} // taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L449-L460


	function mapMightHaveLoosePrim(a, b, prim, item, opts, channel) {
	  var altValue = findLooseMatchingPrimitives(prim);

	  if (altValue != null) {
	    return altValue;
	  }

	  var curB = $mapGet$1(b, altValue);
	  var looseOpts = object_assign({}, opts, {
	    strict: false
	  });

	  if (typeof curB === 'undefined' && !$mapHas$4(b, altValue) || // eslint-disable-next-line no-use-before-define
	  !internalDeepEqual(item, curB, looseOpts, channel)) {
	    return false;
	  } // eslint-disable-next-line no-use-before-define


	  return !$mapHas$4(a, altValue) && internalDeepEqual(item, curB, looseOpts, channel);
	} // taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L441-L447


	function setMightHaveLoosePrim(a, b, prim) {
	  var altValue = findLooseMatchingPrimitives(prim);

	  if (altValue != null) {
	    return altValue;
	  }

	  return $setHas$3(b, altValue) && !$setHas$3(a, altValue);
	} // taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L518-L533


	function mapHasEqualEntry(set, map, key1, item1, opts, channel) {
	  var i = esGetIterator(set);
	  var result;
	  var key2;

	  while ((result = i.next()) && !result.done) {
	    key2 = result.value;

	    if ( // eslint-disable-next-line no-use-before-define
	    internalDeepEqual(key1, key2, opts, channel) // eslint-disable-next-line no-use-before-define
	    && internalDeepEqual(item1, $mapGet$1(map, key2), opts, channel)) {
	      $setDelete(set, key2);
	      return true;
	    }
	  }

	  return false;
	}

	function internalDeepEqual(actual, expected, options, channel) {
	  var opts = options || {}; // 7.1. All identical values are equivalent, as determined by ===.

	  if (opts.strict ? objectIs(actual, expected) : actual === expected) {
	    return true;
	  }

	  var actualBoxed = whichBoxedPrimitive(actual);
	  var expectedBoxed = whichBoxedPrimitive(expected);

	  if (actualBoxed !== expectedBoxed) {
	    return false;
	  } // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.


	  if (!actual || !expected || typeof actual !== 'object' && typeof expected !== 'object') {
	    return opts.strict ? objectIs(actual, expected) : actual == expected; // eslint-disable-line eqeqeq
	  }
	  /*
	   * 7.4. For all other Object pairs, including Array objects, equivalence is
	   * determined by having the same number of owned properties (as verified
	   * with Object.prototype.hasOwnProperty.call), the same set of keys
	   * (although not necessarily the same order), equivalent values for every
	   * corresponding key, and an identical 'prototype' property. Note: this
	   * accounts for both named and indexed properties on Arrays.
	   */
	  // see https://github.com/nodejs/node/commit/d3aafd02efd3a403d646a3044adcf14e63a88d32 for memos/channel inspiration


	  var hasActual = channel.has(actual);
	  var hasExpected = channel.has(expected);
	  var sentinel;

	  if (hasActual && hasExpected) {
	    if (channel.get(actual) === channel.get(expected)) {
	      return true;
	    }
	  } else {
	    sentinel = {};
	  }

	  if (!hasActual) {
	    channel.set(actual, sentinel);
	  }

	  if (!hasExpected) {
	    channel.set(expected, sentinel);
	  } // eslint-disable-next-line no-use-before-define


	  return objEquiv(actual, expected, opts, channel);
	}

	function isBuffer(x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') {
	    return false;
	  }

	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }

	  if (x.length > 0 && typeof x[0] !== 'number') {
	    return false;
	  }

	  return !!(x.constructor && x.constructor.isBuffer && x.constructor.isBuffer(x));
	}

	function setEquiv(a, b, opts, channel) {
	  if ($setSize(a) !== $setSize(b)) {
	    return false;
	  }

	  var iA = esGetIterator(a);
	  var iB = esGetIterator(b);
	  var resultA;
	  var resultB;
	  var set;

	  while ((resultA = iA.next()) && !resultA.done) {
	    if (resultA.value && typeof resultA.value === 'object') {
	      if (!set) {
	        set = new $Set$2();
	      }

	      $setAdd(set, resultA.value);
	    } else if (!$setHas$3(b, resultA.value)) {
	      if (opts.strict) {
	        return false;
	      }

	      if (!setMightHaveLoosePrim(a, b, resultA.value)) {
	        return false;
	      }

	      if (!set) {
	        set = new $Set$2();
	      }

	      $setAdd(set, resultA.value);
	    }
	  }

	  if (set) {
	    while ((resultB = iB.next()) && !resultB.done) {
	      // We have to check if a primitive value is already matching and only if it's not, go hunting for it.
	      if (resultB.value && typeof resultB.value === 'object') {
	        if (!setHasEqualElement(set, resultB.value, opts.strict, channel)) {
	          return false;
	        }
	      } else if (!opts.strict && !$setHas$3(a, resultB.value) && !setHasEqualElement(set, resultB.value, opts.strict, channel)) {
	        return false;
	      }
	    }

	    return $setSize(set) === 0;
	  }

	  return true;
	}

	function mapEquiv(a, b, opts, channel) {
	  if ($mapSize(a) !== $mapSize(b)) {
	    return false;
	  }

	  var iA = esGetIterator(a);
	  var iB = esGetIterator(b);
	  var resultA;
	  var resultB;
	  var set;
	  var key;
	  var item1;
	  var item2;

	  while ((resultA = iA.next()) && !resultA.done) {
	    key = resultA.value[0];
	    item1 = resultA.value[1];

	    if (key && typeof key === 'object') {
	      if (!set) {
	        set = new $Set$2();
	      }

	      $setAdd(set, key);
	    } else {
	      item2 = $mapGet$1(b, key);

	      if (typeof item2 === 'undefined' && !$mapHas$4(b, key) || !internalDeepEqual(item1, item2, opts, channel)) {
	        if (opts.strict) {
	          return false;
	        }

	        if (!mapMightHaveLoosePrim(a, b, key, item1, opts, channel)) {
	          return false;
	        }

	        if (!set) {
	          set = new $Set$2();
	        }

	        $setAdd(set, key);
	      }
	    }
	  }

	  if (set) {
	    while ((resultB = iB.next()) && !resultB.done) {
	      key = resultB.value[0];
	      item2 = resultB.value[1];

	      if (key && typeof key === 'object') {
	        if (!mapHasEqualEntry(set, a, key, item2, opts, channel)) {
	          return false;
	        }
	      } else if (!opts.strict && (!a.has(key) || !internalDeepEqual($mapGet$1(a, key), item2, opts, channel)) && !mapHasEqualEntry(set, a, key, item2, object_assign({}, opts, {
	        strict: false
	      }), channel)) {
	        return false;
	      }
	    }

	    return $setSize(set) === 0;
	  }

	  return true;
	}

	function objEquiv(a, b, opts, channel) {
	  /* eslint max-statements: [2, 100], max-lines-per-function: [2, 120], max-depth: [2, 5] */
	  var i, key;

	  if (typeof a !== typeof b) {
	    return false;
	  }

	  if (a == null || b == null) {
	    return false;
	  }

	  if ($objToString(a) !== $objToString(b)) {
	    return false;
	  }

	  if (isArguments$1(a) !== isArguments$1(b)) {
	    return false;
	  }

	  var aIsArray = isarray(a);
	  var bIsArray = isarray(b);

	  if (aIsArray !== bIsArray) {
	    return false;
	  } // TODO: replace when a cross-realm brand check is available


	  var aIsError = a instanceof Error;
	  var bIsError = b instanceof Error;

	  if (aIsError !== bIsError) {
	    return false;
	  }

	  if (aIsError || bIsError) {
	    if (a.name !== b.name || a.message !== b.message) {
	      return false;
	    }
	  }

	  var aIsRegex = isRegex(a);
	  var bIsRegex = isRegex(b);

	  if (aIsRegex !== bIsRegex) {
	    return false;
	  }

	  if ((aIsRegex || bIsRegex) && (a.source !== b.source || regexp_prototype_flags(a) !== regexp_prototype_flags(b))) {
	    return false;
	  }

	  var aIsDate = isDateObject(a);
	  var bIsDate = isDateObject(b);

	  if (aIsDate !== bIsDate) {
	    return false;
	  }

	  if (aIsDate || bIsDate) {
	    // && would work too, because both are true or both false here
	    if ($getTime(a) !== $getTime(b)) {
	      return false;
	    }
	  }

	  if (opts.strict && gPO && gPO(a) !== gPO(b)) {
	    return false;
	  }

	  if (whichTypedArray(a) !== whichTypedArray(b)) {
	    return false;
	  }

	  var aIsBuffer = isBuffer(a);
	  var bIsBuffer = isBuffer(b);

	  if (aIsBuffer !== bIsBuffer) {
	    return false;
	  }

	  if (aIsBuffer || bIsBuffer) {
	    // && would work too, because both are true or both false here
	    if (a.length !== b.length) {
	      return false;
	    }

	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) {
	        return false;
	      }
	    }

	    return true;
	  }

	  if (typeof a !== typeof b) {
	    return false;
	  }

	  var ka = objectKeys(a);
	  var kb = objectKeys(b); // having the same number of owned properties (keys incorporates hasOwnProperty)

	  if (ka.length !== kb.length) {
	    return false;
	  } // the same set of keys (although not necessarily the same order),


	  ka.sort();
	  kb.sort(); // ~~~cheap key test

	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i]) {
	      return false;
	    } // eslint-disable-line eqeqeq

	  } // equivalent values for every corresponding key, and ~~~possibly expensive deep test


	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];

	    if (!internalDeepEqual(a[key], b[key], opts, channel)) {
	      return false;
	    }
	  }

	  var aCollection = whichCollection(a);
	  var bCollection = whichCollection(b);

	  if (aCollection !== bCollection) {
	    return false;
	  }

	  if (aCollection === 'Set' || bCollection === 'Set') {
	    // aCollection === bCollection
	    return setEquiv(a, b, opts, channel);
	  }

	  if (aCollection === 'Map') {
	    // aCollection === bCollection
	    return mapEquiv(a, b, opts, channel);
	  }

	  return true;
	}

	var deepEqual = function deepEqual(a, b, opts) {
	  return internalDeepEqual(a, b, opts, sideChannel());
	};

	function FilterComponent(props) {
	    var _a;
	    const [valueInput, setValueInput] = react.useState("");
	    const [options, setOptions] = react.useState([]);
	    const [selectedFilters, setSelectedFilters] = react.useState([]);
	    const [show, setShow] = react.useState(false);
	    const [dropdownWidth, setDropdownWidth] = react.useState(0);
	    const defaultValuesLoaded = react.useRef(false);
	    const componentRef = react.useRef(null);
	    const setMultiSelectFilters = react.useCallback((selectedOptions) => {
	        var _a;
	        if ((selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.length) === 0) {
	            setValueInput((_a = props.emptyOptionCaption) !== null && _a !== void 0 ? _a : "");
	            setSelectedFilters(prev => {
	                if (prev.length === 0) {
	                    return prev;
	                }
	                return [];
	            });
	        }
	        else {
	            setValueInput(selectedOptions.map(option => option.caption).join(","));
	            setSelectedFilters(prev => {
	                if (deepEqual(selectedOptions, prev, { strict: true })) {
	                    return prev;
	                }
	                return selectedOptions;
	            });
	        }
	    }, [props.emptyOptionCaption]);
	    const onClick = react.useCallback((option) => {
	        if (props.multiSelect) {
	            setMultiSelectFilters(toggleFilter(selectedFilters, option));
	        }
	        else {
	            setValueInput(option.caption);
	            setSelectedFilters([option]);
	            setShow(false);
	        }
	    }, [selectedFilters, props.multiSelect]);
	    useOnClickOutside(componentRef, () => setShow(false));
	    // Select the first option Or default option on load
	    react.useEffect(() => {
	        var _a, _b, _c;
	        if (!defaultValuesLoaded.current && options.length > 0) {
	            if (props.multiSelect) {
	                if (props.defaultValue) {
	                    const initialOptions = props.defaultValue
	                        .split(",")
	                        .map(value => options.find(option => option.value === value))
	                        .filter(Boolean);
	                    // User can set anything, but it could not match so we have to set to empty or ""
	                    setMultiSelectFilters(initialOptions);
	                }
	                else {
	                    setValueInput((_a = props.emptyOptionCaption) !== null && _a !== void 0 ? _a : "");
	                }
	            }
	            else {
	                // We want to add empty option caption
	                const initialOption = (_b = options.find(option => option.value === props.defaultValue)) !== null && _b !== void 0 ? _b : options[0];
	                setValueInput((_c = initialOption === null || initialOption === void 0 ? void 0 : initialOption.caption) !== null && _c !== void 0 ? _c : "");
	                setSelectedFilters(prev => {
	                    const newValue = [initialOption];
	                    if (deepEqual(newValue, prev, { strict: true })) {
	                        return prev;
	                    }
	                    return newValue;
	                });
	            }
	            defaultValuesLoaded.current = true;
	        }
	    }, [props.defaultValue, props.emptyOptionCaption, props.multiSelect, options]);
	    react.useEffect(() => {
	        var _a;
	        const options = [
	            ...(!props.multiSelect
	                ? [
	                    {
	                        caption: (_a = props.emptyOptionCaption) !== null && _a !== void 0 ? _a : "",
	                        value: ""
	                    }
	                ]
	                : []),
	            ...props.options
	        ];
	        setOptions(prev => {
	            if (deepEqual(prev, options, { strict: true })) {
	                return prev;
	            }
	            return options;
	        });
	        // Resets the option to reload default values
	        defaultValuesLoaded.current = false;
	    }, [props.emptyOptionCaption, props.multiSelect, props.options, props.defaultValue]);
	    react.useEffect(() => {
	        var _a;
	        (_a = props.updateFilters) === null || _a === void 0 ? void 0 : _a.call(props, selectedFilters);
	    }, [selectedFilters]);
	    const showPlaceholder = selectedFilters.length === 0 || valueInput === props.emptyOptionCaption;
	    return (react.createElement("div", { className: "dropdown-container", "data-focusindex": (_a = props.tabIndex) !== null && _a !== void 0 ? _a : 0, ref: componentRef },
	        react.createElement("input", { value: !showPlaceholder ? valueInput : "", placeholder: showPlaceholder ? props.emptyOptionCaption : undefined, className: "form-control dropdown-triggerer", onClick: () => setShow(true), onFocus: () => setShow(true), "aria-haspopup": true, ref: inputRef => {
	                if (inputRef && inputRef.clientWidth) {
	                    setDropdownWidth(inputRef.clientWidth);
	                }
	            }, "aria-expanded": show, "aria-controls": `${props.name}-dropdown-list`, "aria-label": props.ariaLabel }),
	        show && (react.createElement("ul", { id: `${props.name}-dropdown-list`, className: "dropdown-list", style: { width: dropdownWidth }, role: "menu", "data-focusindex": 0 }, options.map((option, index) => (react.createElement("li", { className: classnames({
	                "filter-selected": !props.multiSelect && selectedFilters.includes(option)
	            }), key: index, onClick: () => onClick(option), onKeyDown: e => {
	                if (e.key === "Enter" || e.key === " ") {
	                    e.preventDefault();
	                    onClick(option);
	                }
	            }, role: "menuitem", tabIndex: 0 }, props.multiSelect ? (react.createElement(react.Fragment, null,
	            react.createElement("input", { id: `${props.name}_checkbox_toggle_${index}`, type: "checkbox", checked: selectedFilters.includes(option) }),
	            react.createElement("label", { htmlFor: `${props.name}_checkbox_toggle_${index}`, style: { pointerEvents: "none" } }, option.caption))) : (react.createElement("div", { className: "filter-label" }, option.caption)))))))));
	}
	function toggleFilter(filters, filterToToggle) {
	    const alteredFilters = [...filters];
	    const index = filters.indexOf(filterToToggle);
	    if (index > -1) {
	        alteredFilters.splice(index, 1);
	    }
	    else {
	        alteredFilters.push(filterToToggle);
	    }
	    return alteredFilters;
	}

	function DatagridDropdownFilter(props) {
	    const FilterContext = getFilterDispatcher();
	    const isAllOptionsReady = props.filterOptions.every(({ value, caption }) => value.status === "available" /* Available */ && caption.status === "available" /* Available */);
	    const parsedOptions = isAllOptionsReady
	        ? props.filterOptions.map(value => {
	            var _a, _b;
	            return ({
	                caption: (_a = value.caption.value) !== null && _a !== void 0 ? _a : "",
	                value: (_b = value.value.value) !== null && _b !== void 0 ? _b : ""
	            });
	        })
	        : [];
	    const alertMessage = (react.createElement(Alert, { bootstrapStyle: "danger" }, "The drop-down filter widget must be placed inside the header of the Data grid 2.0 or Gallery widget."));
	    const alertMessageMultipleFilters = (react.createElement(Alert, { bootstrapStyle: "danger" }, "To use multiple filters you need to define a filter identification in the properties of drop-down filter or have a \"Boolean or Enumeration\" attribute available."));
	    return (FilterContext === null || FilterContext === void 0 ? void 0 : FilterContext.Consumer) ? (react.createElement(FilterContext.Consumer, null, filterContextValue => {
	        var _a, _b, _c, _d, _e;
	        if (!filterContextValue ||
	            !filterContextValue.filterDispatcher ||
	            (!filterContextValue.singleAttribute && !filterContextValue.multipleAttributes)) {
	            return alertMessage;
	        }
	        const { filterDispatcher, singleAttribute, multipleAttributes, singleInitialFilter, multipleInitialFilters } = filterContextValue;
	        const attribute = singleAttribute !== null && singleAttribute !== void 0 ? singleAttribute : (_a = findAttributesByType(multipleAttributes)) === null || _a === void 0 ? void 0 : _a[0];
	        if (!attribute) {
	            if (multipleAttributes) {
	                return alertMessageMultipleFilters;
	            }
	            return alertMessage;
	        }
	        const errorMessage = getAttributeTypeErrorMessage(attribute.type) || validateValues(attribute, parsedOptions);
	        if (errorMessage) {
	            return react.createElement(Alert, { bootstrapStyle: "danger" }, errorMessage);
	        }
	        const attributes = singleAttribute ? [attribute] : findAttributesByType(multipleAttributes);
	        const defaultValues = singleInitialFilter
	            ? singleInitialFilter === null || singleInitialFilter === void 0 ? void 0 : singleInitialFilter.map(filter => filter.value).join(",") : attributes === null || attributes === void 0 ? void 0 : attributes.flatMap(attribute => multipleInitialFilters === null || multipleInitialFilters === void 0 ? void 0 : multipleInitialFilters[attribute.id].map(filter => filter.value)).join(",");
	        const options = props.auto
	            ? (_b = attributes === null || attributes === void 0 ? void 0 : attributes.flatMap(attribute => attribute.universe
	                ? attribute.universe.map(value => {
	                    var _a, _b;
	                    return ({
	                        caption: (_a = attribute.formatter.format(value)) !== null && _a !== void 0 ? _a : "",
	                        value: (_b = value === null || value === void 0 ? void 0 : value.toString()) !== null && _b !== void 0 ? _b : ""
	                    });
	                })
	                : [])) !== null && _b !== void 0 ? _b : [] : parsedOptions;
	        return (react.createElement(FilterComponent, { ariaLabel: (_c = props.ariaLabel) === null || _c === void 0 ? void 0 : _c.value, defaultValue: defaultValues !== null && defaultValues !== void 0 ? defaultValues : (_d = props.defaultValue) === null || _d === void 0 ? void 0 : _d.value, emptyOptionCaption: (_e = props.emptyOptionCaption) === null || _e === void 0 ? void 0 : _e.value, multiSelect: props.multiSelect, name: props.name, options: options, tabIndex: props.tabIndex, updateFilters: (values) => {
	                const conditions = attributes === null || attributes === void 0 ? void 0 : attributes.map(attribute => getFilterCondition(attribute, values)).filter((filter) => filter !== undefined);
	                filterDispatcher({
	                    getFilterCondition: () => conditions && conditions.length > 1 ? builders.or(...conditions) : conditions === null || conditions === void 0 ? void 0 : conditions[0],
	                    filterType: "enum" /* ENUMERATION */
	                });
	            } }));
	    })) : (alertMessage);
	}
	function findAttributesByType(multipleAttributes) {
	    if (!multipleAttributes) {
	        return undefined;
	    }
	    return Object.keys(multipleAttributes)
	        .map(key => multipleAttributes[key])
	        .filter(attr => attr.type.match(/Enum|Boolean/));
	}
	function getAttributeTypeErrorMessage(type) {
	    return type && !type.match(/Enum|Boolean/)
	        ? "The attribute type being used for Data grid drop-down filter is not 'Boolean or Enumeration'"
	        : null;
	}
	function validateValues(listAttribute, options) {
	    if (options.length === 0) {
	        return null;
	    }
	    return options.some(filterOption => { var _a; return !((_a = listAttribute.universe) === null || _a === void 0 ? void 0 : _a.includes(checkValue(filterOption.value, listAttribute.type))); })
	        ? "There are invalid values available in the Data grid drop-down filter"
	        : null;
	}
	function getFilterCondition(listAttribute, values) {
	    if (!listAttribute || !listAttribute.filterable || values.length === 0) {
	        return undefined;
	    }
	    const { id, type } = listAttribute;
	    const filterAttribute = builders.attribute(id);
	    if (values.some(filterOption => { var _a; return !((_a = listAttribute.universe) === null || _a === void 0 ? void 0 : _a.includes(checkValue(filterOption.value, listAttribute.type))); })) {
	        return undefined;
	    }
	    if (values.length > 1) {
	        return builders.or(...values.map(filter => builders.equals(filterAttribute, builders.literal(checkValue(filter.value, type)))));
	    }
	    const [filterValue] = values;
	    if (filterValue.value) {
	        return builders.equals(filterAttribute, builders.literal(checkValue(filterValue.value, type)));
	    }
	    return undefined;
	}
	function checkValue(value, type) {
	    if (type === "Boolean") {
	        if (value !== "true" && value !== "false") {
	            return value;
	        }
	        return value === "true";
	    }
	    return value;
	}

	return DatagridDropdownFilter;

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWdyaWREcm9wZG93bkZpbHRlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90b29scy9waXctdXRpbHMtaW50ZXJuYWwvZGlzdC9jb21wb25lbnRzLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vdG9vbHMvcGl3LXV0aWxzLWludGVybmFsL2Rpc3QvYnVpbGRlcnMvRWRpdGFibGVWYWx1ZUJ1aWxkZXIuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90b29scy9waXctdXRpbHMtaW50ZXJuYWwvZGlzdC91dGlscy9kb20uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90b29scy9waXctdXRpbHMtaW50ZXJuYWwvZGlzdC91dGlscy9GaWx0ZXJQcm92aWRlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pc0FyZ3VtZW50cy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbXBsZW1lbnRhdGlvbi5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9vYmplY3Qta2V5cy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pcy1hcmd1bWVudHMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZGVmaW5lLXByb3BlcnRpZXMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbXBsZW1lbnRhdGlvbi5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9mdW5jdGlvbi1iaW5kL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL3NoYW1zLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2hhcy9zcmMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvb2JqZWN0LWlzL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC9HZXRJbnRyaW5zaWMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvb2JqZWN0LWlzL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC9oZWxwZXJzL2NhbGxCaW5kLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL29iamVjdC1pcy9pbXBsZW1lbnRhdGlvbi5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9vYmplY3QtaXMvcG9seWZpbGwuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvb2JqZWN0LWlzL3NoaW0uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvb2JqZWN0LWlzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzLXJlZ2V4L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0L0dldEludHJpbnNpYy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC9oZWxwZXJzL2NhbGxCaW5kLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlZ2V4cC5wcm90b3R5cGUuZmxhZ3MvaW1wbGVtZW50YXRpb24uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVnZXhwLnByb3RvdHlwZS5mbGFncy9wb2x5ZmlsbC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWdleHAucHJvdG90eXBlLmZsYWdzL3NoaW0uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVnZXhwLnByb3RvdHlwZS5mbGFncy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9kZWVwLWVxdWFsL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzLWRhdGUtb2JqZWN0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzLXN0cmluZy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pcy1udW1iZXItb2JqZWN0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzLWJvb2xlYW4tb2JqZWN0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzLXN5bWJvbC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pcy1iaWdpbnQvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvd2hpY2gtYm94ZWQtcHJpbWl0aXZlL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2RlZXAtZXF1YWwvbm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0L0dldEludHJpbnNpYy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9kZWVwLWVxdWFsL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC9oZWxwZXJzL2NhbGxCaW5kLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2RlZXAtZXF1YWwvbm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0L2hlbHBlcnMvY2FsbEJvdW5kLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2lzLW1hcC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pcy1zZXQvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvaXMtd2Vha21hcC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pcy13ZWFrc2V0L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3doaWNoLWNvbGxlY3Rpb24vaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZXMtZ2V0LWl0ZXJhdG9yL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0L2hlbHBlcnMvY2FsbEJvdW5kLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2VzLWdldC1pdGVyYXRvci9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zaWRlLWNoYW5uZWwvbm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0L0dldEludHJpbnNpYy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zaWRlLWNoYW5uZWwvbm9kZV9tb2R1bGVzL2VzLWFic3RyYWN0L2hlbHBlcnMvY2FsbEJpbmQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc2lkZS1jaGFubmVsL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC9oZWxwZXJzL2NhbGxCb3VuZC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9vYmplY3QtaW5zcGVjdC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zaWRlLWNoYW5uZWwvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZm9yZWFjaC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9hdmFpbGFibGUtdHlwZWQtYXJyYXlzL25vZGVfbW9kdWxlcy9hcnJheS1maWx0ZXIvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvYXZhaWxhYmxlLXR5cGVkLWFycmF5cy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9lcy1hYnN0cmFjdC9oZWxwZXJzL2dldE93blByb3BlcnR5RGVzY3JpcHRvci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9pcy10eXBlZC1hcnJheS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy93aGljaC10eXBlZC1hcnJheS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9nZXQtaW50cmluc2ljL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NhbGwtYmluZC9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvY2FsbEJvdW5kLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL29iamVjdC5hc3NpZ24vaW1wbGVtZW50YXRpb24uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvb2JqZWN0LmFzc2lnbi9wb2x5ZmlsbC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9vYmplY3QuYXNzaWduL3NoaW0uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvb2JqZWN0LmFzc2lnbi9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9kZWVwLWVxdWFsL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRmlsdGVyQ29tcG9uZW50LnRzeCIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9EYXRhZ3JpZERyb3Bkb3duRmlsdGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE3IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpICYmIGFyZy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGlubmVyID0gY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdFx0XHRpZiAoaW5uZXIpIHtcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goaW5uZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRjbGFzc05hbWVzLmRlZmF1bHQgPSBjbGFzc05hbWVzO1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCJpbXBvcnQgeyBDaGlsZHJlbiwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmV4cG9ydCBjb25zdCBBbGVydCA9ICh7IGNsYXNzTmFtZSwgYm9vdHN0cmFwU3R5bGUsIGNoaWxkcmVuIH0pID0+IENoaWxkcmVuLmNvdW50KGNoaWxkcmVuKSA+IDAgPyAoY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lcyhgYWxlcnQgYWxlcnQtJHtib290c3RyYXBTdHlsZX1gLCBjbGFzc05hbWUpIH0sIGNoaWxkcmVuKSkgOiBudWxsO1xuQWxlcnQuZGlzcGxheU5hbWUgPSBcIkFsZXJ0XCI7XG4iLCJleHBvcnQgdmFyIEZvcm1hdHRlclR5cGU7XG4oZnVuY3Rpb24gKEZvcm1hdHRlclR5cGUpIHtcbiAgICBGb3JtYXR0ZXJUeXBlW1wiTnVtYmVyXCJdID0gXCJudW1iZXJcIjtcbiAgICBGb3JtYXR0ZXJUeXBlW1wiRGF0ZVRpbWVcIl0gPSBcImRhdGV0aW1lXCI7XG59KShGb3JtYXR0ZXJUeXBlIHx8IChGb3JtYXR0ZXJUeXBlID0ge30pKTtcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZVZhbHVlQnVpbGRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWRpdGFibGVWYWx1ZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBkaXNwbGF5VmFsdWU6IFwiXCIsXG4gICAgICAgICAgICBzdGF0dXM6IFwiYXZhaWxhYmxlXCIgLyogQXZhaWxhYmxlICovLFxuICAgICAgICAgICAgdmFsaWRhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgZm9ybWF0dGVyOiB7XG4gICAgICAgICAgICAgICAgZm9ybWF0OiBqZXN0LmZuKG5hbWUgPT4gYEZvcm1hdHRlZCAke25hbWV9YCksXG4gICAgICAgICAgICAgICAgcGFyc2U6IGplc3QuZm4oKSxcbiAgICAgICAgICAgICAgICB3aXRoQ29uZmlnOiBqZXN0LmZuKCgpID0+IG5ldyBFZGl0YWJsZVZhbHVlQnVpbGRlcigpLmJ1aWxkKCkuZm9ybWF0dGVyKSxcbiAgICAgICAgICAgICAgICBnZXRGb3JtYXRQbGFjZWhvbGRlcjogamVzdC5mbigpLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1hdHRlclR5cGUuRGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgY29uZmlnOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFZhbGlkYXRvcjogamVzdC5mbigpLFxuICAgICAgICAgICAgc2V0VmFsdWU6IGplc3QuZm4oKHZhbHVlKSA9PiB0aGlzLndpdGhWYWx1ZSh2YWx1ZSkpLFxuICAgICAgICAgICAgc2V0VGV4dFZhbHVlOiBqZXN0LmZuKCksXG4gICAgICAgICAgICBzZXRGb3JtYXR0ZXI6IGplc3QuZm4oKVxuICAgICAgICB9O1xuICAgIH1cbiAgICB3aXRoVmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZWRpdGFibGVWYWx1ZS5kaXNwbGF5VmFsdWUgPSB0aGlzLmVkaXRhYmxlVmFsdWUuZm9ybWF0dGVyLmZvcm1hdCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB3aXRoRm9ybWF0dGVyKGZvcm1hdHRlcikge1xuICAgICAgICB0aGlzLmVkaXRhYmxlVmFsdWUuZm9ybWF0dGVyID0gZm9ybWF0dGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaXNSZWFkT25seSgpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlzTG9hZGluZygpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnN0YXR1cyA9IFwibG9hZGluZ1wiIC8qIExvYWRpbmcgKi87XG4gICAgICAgIHJldHVybiB0aGlzLmlzUmVhZE9ubHkoKTtcbiAgICB9XG4gICAgaXNVbmF2YWlsYWJsZSgpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnN0YXR1cyA9IFwidW5hdmFpbGFibGVcIiAvKiBVbmF2YWlsYWJsZSAqLztcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNSZWFkT25seSgpO1xuICAgIH1cbiAgICB3aXRoVmFsaWRhdGlvbih2YWxpZGF0aW9uKSB7XG4gICAgICAgIHRoaXMuZWRpdGFibGVWYWx1ZS52YWxpZGF0aW9uID0gdmFsaWRhdGlvbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHdpdGhVbml2ZXJzZSguLi52YWx1ZXMpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnVuaXZlcnNlID0gdmFsdWVzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRhYmxlVmFsdWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5leHBvcnQgZnVuY3Rpb24gdXNlT25DbGlja091dHNpZGUocmVmLCBoYW5kbGVyKSB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghcmVmLmN1cnJlbnQgfHwgcmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhhbmRsZXIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBsaXN0ZW5lcik7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgbGlzdGVuZXIpO1xuICAgICAgICB9O1xuICAgIH0sIFtyZWYsIGhhbmRsZXJdKTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyRGlzcGF0Y2hlcigpIHtcbiAgICByZXR1cm4gd2luZG93W1wiY29tLm1lbmRpeC53aWRnZXRzLndlYi5maWx0ZXJhYmxlLmZpbHRlckNvbnRleHRcIl07XG59XG5leHBvcnQgZnVuY3Rpb24gdXNlRmlsdGVyQ29udGV4dCgpIHtcbiAgICBjb25zdCBnbG9iYWxGaWx0ZXJDb250ZXh0ID0gZ2V0RmlsdGVyRGlzcGF0Y2hlcigpO1xuICAgIGlmIChnbG9iYWxGaWx0ZXJDb250ZXh0KSB7XG4gICAgICAgIHJldHVybiB7IEZpbHRlckNvbnRleHQ6IGdsb2JhbEZpbHRlckNvbnRleHQgfTtcbiAgICB9XG4gICAgY29uc3QgRmlsdGVyQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQodW5kZWZpbmVkKTtcbiAgICB3aW5kb3dbXCJjb20ubWVuZGl4LndpZGdldHMud2ViLmZpbHRlcmFibGUuZmlsdGVyQ29udGV4dFwiXSA9IEZpbHRlckNvbnRleHQ7XG4gICAgcmV0dXJuIHsgRmlsdGVyQ29udGV4dCB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVzZU11bHRpcGxlRmlsdGVyaW5nKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIFtcInN0cmluZ1wiIC8qIFNUUklORyAqL106IHVzZVN0YXRlKCksXG4gICAgICAgIFtcIm51bWJlclwiIC8qIE5VTUJFUiAqL106IHVzZVN0YXRlKCksXG4gICAgICAgIFtcImRhdGVcIiAvKiBEQVRFICovXTogdXNlU3RhdGUoKSxcbiAgICAgICAgW1wiZW51bVwiIC8qIEVOVU1FUkFUSU9OICovXTogdXNlU3RhdGUoKVxuICAgIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcblx0dmFyIHN0ciA9IHRvU3RyLmNhbGwodmFsdWUpO1xuXHR2YXIgaXNBcmdzID0gc3RyID09PSAnW29iamVjdCBBcmd1bWVudHNdJztcblx0aWYgKCFpc0FyZ3MpIHtcblx0XHRpc0FyZ3MgPSBzdHIgIT09ICdbb2JqZWN0IEFycmF5XScgJiZcblx0XHRcdHZhbHVlICE9PSBudWxsICYmXG5cdFx0XHR0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmXG5cdFx0XHR0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJyAmJlxuXHRcdFx0dmFsdWUubGVuZ3RoID49IDAgJiZcblx0XHRcdHRvU3RyLmNhbGwodmFsdWUuY2FsbGVlKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblx0fVxuXHRyZXR1cm4gaXNBcmdzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGtleXNTaGltO1xuaWYgKCFPYmplY3Qua2V5cykge1xuXHQvLyBtb2RpZmllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbVxuXHR2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblx0dmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblx0dmFyIGlzQXJncyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBnbG9iYWwtcmVxdWlyZVxuXHR2YXIgaXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblx0dmFyIGhhc0RvbnRFbnVtQnVnID0gIWlzRW51bWVyYWJsZS5jYWxsKHsgdG9TdHJpbmc6IG51bGwgfSwgJ3RvU3RyaW5nJyk7XG5cdHZhciBoYXNQcm90b0VudW1CdWcgPSBpc0VudW1lcmFibGUuY2FsbChmdW5jdGlvbiAoKSB7fSwgJ3Byb3RvdHlwZScpO1xuXHR2YXIgZG9udEVudW1zID0gW1xuXHRcdCd0b1N0cmluZycsXG5cdFx0J3RvTG9jYWxlU3RyaW5nJyxcblx0XHQndmFsdWVPZicsXG5cdFx0J2hhc093blByb3BlcnR5Jyxcblx0XHQnaXNQcm90b3R5cGVPZicsXG5cdFx0J3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcblx0XHQnY29uc3RydWN0b3InXG5cdF07XG5cdHZhciBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSA9IGZ1bmN0aW9uIChvKSB7XG5cdFx0dmFyIGN0b3IgPSBvLmNvbnN0cnVjdG9yO1xuXHRcdHJldHVybiBjdG9yICYmIGN0b3IucHJvdG90eXBlID09PSBvO1xuXHR9O1xuXHR2YXIgZXhjbHVkZWRLZXlzID0ge1xuXHRcdCRhcHBsaWNhdGlvbkNhY2hlOiB0cnVlLFxuXHRcdCRjb25zb2xlOiB0cnVlLFxuXHRcdCRleHRlcm5hbDogdHJ1ZSxcblx0XHQkZnJhbWU6IHRydWUsXG5cdFx0JGZyYW1lRWxlbWVudDogdHJ1ZSxcblx0XHQkZnJhbWVzOiB0cnVlLFxuXHRcdCRpbm5lckhlaWdodDogdHJ1ZSxcblx0XHQkaW5uZXJXaWR0aDogdHJ1ZSxcblx0XHQkb25tb3pmdWxsc2NyZWVuY2hhbmdlOiB0cnVlLFxuXHRcdCRvbm1vemZ1bGxzY3JlZW5lcnJvcjogdHJ1ZSxcblx0XHQkb3V0ZXJIZWlnaHQ6IHRydWUsXG5cdFx0JG91dGVyV2lkdGg6IHRydWUsXG5cdFx0JHBhZ2VYT2Zmc2V0OiB0cnVlLFxuXHRcdCRwYWdlWU9mZnNldDogdHJ1ZSxcblx0XHQkcGFyZW50OiB0cnVlLFxuXHRcdCRzY3JvbGxMZWZ0OiB0cnVlLFxuXHRcdCRzY3JvbGxUb3A6IHRydWUsXG5cdFx0JHNjcm9sbFg6IHRydWUsXG5cdFx0JHNjcm9sbFk6IHRydWUsXG5cdFx0JHNlbGY6IHRydWUsXG5cdFx0JHdlYmtpdEluZGV4ZWREQjogdHJ1ZSxcblx0XHQkd2Via2l0U3RvcmFnZUluZm86IHRydWUsXG5cdFx0JHdpbmRvdzogdHJ1ZVxuXHR9O1xuXHR2YXIgaGFzQXV0b21hdGlvbkVxdWFsaXR5QnVnID0gKGZ1bmN0aW9uICgpIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdGZvciAodmFyIGsgaW4gd2luZG93KSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZiAoIWV4Y2x1ZGVkS2V5c1snJCcgKyBrXSAmJiBoYXMuY2FsbCh3aW5kb3csIGspICYmIHdpbmRvd1trXSAhPT0gbnVsbCAmJiB0eXBlb2Ygd2luZG93W2tdID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZSh3aW5kb3dba10pO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KCkpO1xuXHR2YXIgZXF1YWxzQ29uc3RydWN0b3JQcm90b3R5cGVJZk5vdEJ1Z2d5ID0gZnVuY3Rpb24gKG8pIHtcblx0XHQvKiBnbG9iYWwgd2luZG93ICovXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNBdXRvbWF0aW9uRXF1YWxpdHlCdWcpIHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZShvKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9O1xuXG5cdGtleXNTaGltID0gZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcblx0XHR2YXIgaXNPYmplY3QgPSBvYmplY3QgIT09IG51bGwgJiYgdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCc7XG5cdFx0dmFyIGlzRnVuY3Rpb24gPSB0b1N0ci5jYWxsKG9iamVjdCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG5cdFx0dmFyIGlzQXJndW1lbnRzID0gaXNBcmdzKG9iamVjdCk7XG5cdFx0dmFyIGlzU3RyaW5nID0gaXNPYmplY3QgJiYgdG9TdHIuY2FsbChvYmplY3QpID09PSAnW29iamVjdCBTdHJpbmddJztcblx0XHR2YXIgdGhlS2V5cyA9IFtdO1xuXG5cdFx0aWYgKCFpc09iamVjdCAmJiAhaXNGdW5jdGlvbiAmJiAhaXNBcmd1bWVudHMpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5rZXlzIGNhbGxlZCBvbiBhIG5vbi1vYmplY3QnKTtcblx0XHR9XG5cblx0XHR2YXIgc2tpcFByb3RvID0gaGFzUHJvdG9FbnVtQnVnICYmIGlzRnVuY3Rpb247XG5cdFx0aWYgKGlzU3RyaW5nICYmIG9iamVjdC5sZW5ndGggPiAwICYmICFoYXMuY2FsbChvYmplY3QsIDApKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5sZW5ndGg7ICsraSkge1xuXHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKGkpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaXNBcmd1bWVudHMgJiYgb2JqZWN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgb2JqZWN0Lmxlbmd0aDsgKytqKSB7XG5cdFx0XHRcdHRoZUtleXMucHVzaChTdHJpbmcoaikpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRmb3IgKHZhciBuYW1lIGluIG9iamVjdCkge1xuXHRcdFx0XHRpZiAoIShza2lwUHJvdG8gJiYgbmFtZSA9PT0gJ3Byb3RvdHlwZScpICYmIGhhcy5jYWxsKG9iamVjdCwgbmFtZSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goU3RyaW5nKG5hbWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChoYXNEb250RW51bUJ1Zykge1xuXHRcdFx0dmFyIHNraXBDb25zdHJ1Y3RvciA9IGVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlSWZOb3RCdWdneShvYmplY3QpO1xuXG5cdFx0XHRmb3IgKHZhciBrID0gMDsgayA8IGRvbnRFbnVtcy5sZW5ndGg7ICsraykge1xuXHRcdFx0XHRpZiAoIShza2lwQ29uc3RydWN0b3IgJiYgZG9udEVudW1zW2tdID09PSAnY29uc3RydWN0b3InKSAmJiBoYXMuY2FsbChvYmplY3QsIGRvbnRFbnVtc1trXSkpIHtcblx0XHRcdFx0XHR0aGVLZXlzLnB1c2goZG9udEVudW1zW2tdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhlS2V5cztcblx0fTtcbn1cbm1vZHVsZS5leHBvcnRzID0ga2V5c1NoaW07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBpc0FyZ3MgPSByZXF1aXJlKCcuL2lzQXJndW1lbnRzJyk7XG5cbnZhciBvcmlnS2V5cyA9IE9iamVjdC5rZXlzO1xudmFyIGtleXNTaGltID0gb3JpZ0tleXMgPyBmdW5jdGlvbiBrZXlzKG8pIHsgcmV0dXJuIG9yaWdLZXlzKG8pOyB9IDogcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG52YXIgb3JpZ2luYWxLZXlzID0gT2JqZWN0LmtleXM7XG5cbmtleXNTaGltLnNoaW0gPSBmdW5jdGlvbiBzaGltT2JqZWN0S2V5cygpIHtcblx0aWYgKE9iamVjdC5rZXlzKSB7XG5cdFx0dmFyIGtleXNXb3Jrc1dpdGhBcmd1bWVudHMgPSAoZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gU2FmYXJpIDUuMCBidWdcblx0XHRcdHZhciBhcmdzID0gT2JqZWN0LmtleXMoYXJndW1lbnRzKTtcblx0XHRcdHJldHVybiBhcmdzICYmIGFyZ3MubGVuZ3RoID09PSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdH0oMSwgMikpO1xuXHRcdGlmICgha2V5c1dvcmtzV2l0aEFyZ3VtZW50cykge1xuXHRcdFx0T2JqZWN0LmtleXMgPSBmdW5jdGlvbiBrZXlzKG9iamVjdCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuXHRcdFx0XHRpZiAoaXNBcmdzKG9iamVjdCkpIHtcblx0XHRcdFx0XHRyZXR1cm4gb3JpZ2luYWxLZXlzKHNsaWNlLmNhbGwob2JqZWN0KSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9yaWdpbmFsS2V5cyhvYmplY3QpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0T2JqZWN0LmtleXMgPSBrZXlzU2hpbTtcblx0fVxuXHRyZXR1cm4gT2JqZWN0LmtleXMgfHwga2V5c1NoaW07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNTaGltO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzVG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnO1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxudmFyIGlzU3RhbmRhcmRBcmd1bWVudHMgPSBmdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuXHRpZiAoaGFzVG9TdHJpbmdUYWcgJiYgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiBTeW1ib2wudG9TdHJpbmdUYWcgaW4gdmFsdWUpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0cmV0dXJuIHRvU3RyLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn07XG5cbnZhciBpc0xlZ2FjeUFyZ3VtZW50cyA9IGZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG5cdGlmIChpc1N0YW5kYXJkQXJndW1lbnRzKHZhbHVlKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJlxuXHRcdHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiZcblx0XHR0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJyAmJlxuXHRcdHZhbHVlLmxlbmd0aCA+PSAwICYmXG5cdFx0dG9TdHIuY2FsbCh2YWx1ZSkgIT09ICdbb2JqZWN0IEFycmF5XScgJiZcblx0XHR0b1N0ci5jYWxsKHZhbHVlLmNhbGxlZSkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG52YXIgc3VwcG9ydHNTdGFuZGFyZEFyZ3VtZW50cyA9IChmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBpc1N0YW5kYXJkQXJndW1lbnRzKGFyZ3VtZW50cyk7XG59KCkpO1xuXG5pc1N0YW5kYXJkQXJndW1lbnRzLmlzTGVnYWN5QXJndW1lbnRzID0gaXNMZWdhY3lBcmd1bWVudHM7IC8vIGZvciB0ZXN0c1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN1cHBvcnRzU3RhbmRhcmRBcmd1bWVudHMgPyBpc1N0YW5kYXJkQXJndW1lbnRzIDogaXNMZWdhY3lBcmd1bWVudHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBrZXlzID0gcmVxdWlyZSgnb2JqZWN0LWtleXMnKTtcbnZhciBoYXNTeW1ib2xzID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sKCdmb28nKSA9PT0gJ3N5bWJvbCc7XG5cbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgY29uY2F0ID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdDtcbnZhciBvcmlnRGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbnZhciBpc0Z1bmN0aW9uID0gZnVuY3Rpb24gKGZuKSB7XG5cdHJldHVybiB0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgdG9TdHIuY2FsbChmbikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59O1xuXG52YXIgYXJlUHJvcGVydHlEZXNjcmlwdG9yc1N1cHBvcnRlZCA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIG9iaiA9IHt9O1xuXHR0cnkge1xuXHRcdG9yaWdEZWZpbmVQcm9wZXJ0eShvYmosICd4JywgeyBlbnVtZXJhYmxlOiBmYWxzZSwgdmFsdWU6IG9iaiB9KTtcblx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnMsIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG5cdFx0Zm9yICh2YXIgXyBpbiBvYmopIHsgLy8ganNjczppZ25vcmUgZGlzYWxsb3dVbnVzZWRWYXJpYWJsZXNcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIG9iai54ID09PSBvYmo7XG5cdH0gY2F0Y2ggKGUpIHsgLyogdGhpcyBpcyBJRSA4LiAqL1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbnZhciBzdXBwb3J0c0Rlc2NyaXB0b3JzID0gb3JpZ0RlZmluZVByb3BlcnR5ICYmIGFyZVByb3BlcnR5RGVzY3JpcHRvcnNTdXBwb3J0ZWQoKTtcblxudmFyIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZSwgdmFsdWUsIHByZWRpY2F0ZSkge1xuXHRpZiAobmFtZSBpbiBvYmplY3QgJiYgKCFpc0Z1bmN0aW9uKHByZWRpY2F0ZSkgfHwgIXByZWRpY2F0ZSgpKSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRpZiAoc3VwcG9ydHNEZXNjcmlwdG9ycykge1xuXHRcdG9yaWdEZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdFx0dmFsdWU6IHZhbHVlLFxuXHRcdFx0d3JpdGFibGU6IHRydWVcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRvYmplY3RbbmFtZV0gPSB2YWx1ZTtcblx0fVxufTtcblxudmFyIGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqZWN0LCBtYXApIHtcblx0dmFyIHByZWRpY2F0ZXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHt9O1xuXHR2YXIgcHJvcHMgPSBrZXlzKG1hcCk7XG5cdGlmIChoYXNTeW1ib2xzKSB7XG5cdFx0cHJvcHMgPSBjb25jYXQuY2FsbChwcm9wcywgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhtYXApKTtcblx0fVxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0ZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wc1tpXSwgbWFwW3Byb3BzW2ldXSwgcHJlZGljYXRlc1twcm9wc1tpXV0pO1xuXHR9XG59O1xuXG5kZWZpbmVQcm9wZXJ0aWVzLnN1cHBvcnRzRGVzY3JpcHRvcnMgPSAhIXN1cHBvcnRzRGVzY3JpcHRvcnM7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmaW5lUHJvcGVydGllcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IG5vLWludmFsaWQtdGhpczogMSAqL1xuXG52YXIgRVJST1JfTUVTU0FHRSA9ICdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBjYWxsZWQgb24gaW5jb21wYXRpYmxlICc7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGZ1bmNUeXBlID0gJ1tvYmplY3QgRnVuY3Rpb25dJztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKHRoYXQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcztcbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJyB8fCB0b1N0ci5jYWxsKHRhcmdldCkgIT09IGZ1bmNUeXBlKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRVJST1JfTUVTU0FHRSArIHRhcmdldCk7XG4gICAgfVxuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gICAgdmFyIGJvdW5kO1xuICAgIHZhciBiaW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgYm91bmQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhpcyxcbiAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKE9iamVjdChyZXN1bHQpID09PSByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgICAgIHRoYXQsXG4gICAgICAgICAgICAgICAgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgYm91bmRMZW5ndGggPSBNYXRoLm1heCgwLCB0YXJnZXQubGVuZ3RoIC0gYXJncy5sZW5ndGgpO1xuICAgIHZhciBib3VuZEFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJvdW5kTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYm91bmRBcmdzLnB1c2goJyQnICsgaSk7XG4gICAgfVxuXG4gICAgYm91bmQgPSBGdW5jdGlvbignYmluZGVyJywgJ3JldHVybiBmdW5jdGlvbiAoJyArIGJvdW5kQXJncy5qb2luKCcsJykgKyAnKXsgcmV0dXJuIGJpbmRlci5hcHBseSh0aGlzLGFyZ3VtZW50cyk7IH0nKShiaW5kZXIpO1xuXG4gICAgaWYgKHRhcmdldC5wcm90b3R5cGUpIHtcbiAgICAgICAgdmFyIEVtcHR5ID0gZnVuY3Rpb24gRW1wdHkoKSB7fTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gdGFyZ2V0LnByb3RvdHlwZTtcbiAgICAgICAgYm91bmQucHJvdG90eXBlID0gbmV3IEVtcHR5KCk7XG4gICAgICAgIEVtcHR5LnByb3RvdHlwZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdW5kO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIHx8IGltcGxlbWVudGF0aW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgY29tcGxleGl0eTogWzIsIDE4XSwgbWF4LXN0YXRlbWVudHM6IFsyLCAzM10gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzU3ltYm9scygpIHtcblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnc3ltYm9sJykgeyByZXR1cm4gdHJ1ZTsgfVxuXG5cdHZhciBvYmogPSB7fTtcblx0dmFyIHN5bSA9IFN5bWJvbCgndGVzdCcpO1xuXHR2YXIgc3ltT2JqID0gT2JqZWN0KHN5bSk7XG5cdGlmICh0eXBlb2Ygc3ltID09PSAnc3RyaW5nJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bSkgIT09ICdbb2JqZWN0IFN5bWJvbF0nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bU9iaikgIT09ICdbb2JqZWN0IFN5bWJvbF0nKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIHRlbXAgZGlzYWJsZWQgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9samhhcmIvb2JqZWN0LmFzc2lnbi9pc3N1ZXMvMTdcblx0Ly8gaWYgKHN5bSBpbnN0YW5jZW9mIFN5bWJvbCkgeyByZXR1cm4gZmFsc2U7IH1cblx0Ly8gdGVtcCBkaXNhYmxlZCBwZXIgaHR0cHM6Ly9naXRodWIuY29tL1dlYlJlZmxlY3Rpb24vZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzL2lzc3Vlcy80XG5cdC8vIGlmICghKHN5bU9iaiBpbnN0YW5jZW9mIFN5bWJvbCkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gaWYgKHR5cGVvZiBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHQvLyBpZiAoU3RyaW5nKHN5bSkgIT09IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW0pKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHZhciBzeW1WYWwgPSA0Mjtcblx0b2JqW3N5bV0gPSBzeW1WYWw7XG5cdGZvciAoc3ltIGluIG9iaikgeyByZXR1cm4gZmFsc2U7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuXHRpZiAodHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nICYmIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoICE9PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgPT09ICdmdW5jdGlvbicgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5sZW5ndGggIT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0dmFyIHN5bXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaik7XG5cdGlmIChzeW1zLmxlbmd0aCAhPT0gMSB8fCBzeW1zWzBdICE9PSBzeW0pIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqLCBzeW0pKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHN5bSk7XG5cdFx0aWYgKGRlc2NyaXB0b3IudmFsdWUgIT09IHN5bVZhbCB8fCBkZXNjcmlwdG9yLmVudW1lcmFibGUgIT09IHRydWUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBvcmlnU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBoYXNTeW1ib2xTaGFtID0gcmVxdWlyZSgnLi9zaGFtcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc05hdGl2ZVN5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCgnZm9vJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCgnYmFyJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHJldHVybiBoYXNTeW1ib2xTaGFtKCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbHNcblx0QWdncmVnYXRlRXJyb3IsXG5cdEF0b21pY3MsXG5cdEZpbmFsaXphdGlvblJlZ2lzdHJ5LFxuXHRTaGFyZWRBcnJheUJ1ZmZlcixcblx0V2Vha1JlZixcbiovXG5cbnZhciB1bmRlZmluZWQ7XG5cbnZhciAkU3ludGF4RXJyb3IgPSBTeW50YXhFcnJvcjtcbnZhciAkRnVuY3Rpb24gPSBGdW5jdGlvbjtcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbnZhciBnZXRFdmFsbGVkQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZXhwcmVzc2lvblN5bnRheCkge1xuXHR0cnkge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuXHRcdHJldHVybiBGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7IHJldHVybiAoJyArIGV4cHJlc3Npb25TeW50YXggKyAnKS5jb25zdHJ1Y3RvcjsnKSgpO1xuXHR9IGNhdGNoIChlKSB7fVxufTtcblxudmFyICRnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbmlmICgkZ09QRCkge1xuXHR0cnkge1xuXHRcdCRnT1BEKHt9LCAnJyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQkZ09QRCA9IG51bGw7IC8vIHRoaXMgaXMgSUUgOCwgd2hpY2ggaGFzIGEgYnJva2VuIGdPUERcblx0fVxufVxuXG52YXIgdGhyb3dUeXBlRXJyb3IgPSBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyAkVHlwZUVycm9yKCk7IH07XG52YXIgVGhyb3dUeXBlRXJyb3IgPSAkZ09QRFxuXHQ/IChmdW5jdGlvbiAoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnMsIG5vLWNhbGxlciwgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzXG5cdFx0XHRhcmd1bWVudHMuY2FsbGVlOyAvLyBJRSA4IGRvZXMgbm90IHRocm93IGhlcmVcblx0XHRcdHJldHVybiB0aHJvd1R5cGVFcnJvcjtcblx0XHR9IGNhdGNoIChjYWxsZWVUaHJvd3MpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIElFIDggdGhyb3dzIG9uIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYXJndW1lbnRzLCAnJylcblx0XHRcdFx0cmV0dXJuICRnT1BEKGFyZ3VtZW50cywgJ2NhbGxlZScpLmdldDtcblx0XHRcdH0gY2F0Y2ggKGdPUER0aHJvd3MpIHtcblx0XHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdFx0fVxuXHRcdH1cblx0fSgpKVxuXHQ6IHRocm93VHlwZUVycm9yO1xuXG52YXIgaGFzU3ltYm9scyA9IHJlcXVpcmUoJ2hhcy1zeW1ib2xzJykoKTtcblxudmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Ll9fcHJvdG9fXzsgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b1xuXG52YXIgYXN5bmNHZW5GdW5jdGlvbiA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignYXN5bmMgZnVuY3Rpb24qICgpIHt9Jyk7XG52YXIgYXN5bmNHZW5GdW5jdGlvblByb3RvdHlwZSA9IGFzeW5jR2VuRnVuY3Rpb24gPyBhc3luY0dlbkZ1bmN0aW9uLnByb3RvdHlwZSA6IHVuZGVmaW5lZDtcbnZhciBhc3luY0dlblByb3RvdHlwZSA9IGFzeW5jR2VuRnVuY3Rpb25Qcm90b3R5cGUgPyBhc3luY0dlbkZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA6IHVuZGVmaW5lZDtcblxudmFyIFR5cGVkQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBnZXRQcm90byhVaW50OEFycmF5KTtcblxudmFyIElOVFJJTlNJQ1MgPSB7XG5cdCclQWdncmVnYXRlRXJyb3IlJzogdHlwZW9mIEFnZ3JlZ2F0ZUVycm9yID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFnZ3JlZ2F0ZUVycm9yLFxuXHQnJUFycmF5JSc6IEFycmF5LFxuXHQnJUFycmF5QnVmZmVyJSc6IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBcnJheUJ1ZmZlcixcblx0JyVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnJvbVN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGdW5jdGlvbiUnOiBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uICgpIHt9JyksXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogYXN5bmNHZW5GdW5jdGlvblByb3RvdHlwZSxcblx0JyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJSc6IGFzeW5jR2VuRnVuY3Rpb24sXG5cdCclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiBhc3luY0dlblByb3RvdHlwZSA/IGdldFByb3RvKGFzeW5jR2VuUHJvdG90eXBlKSA6IHVuZGVmaW5lZCxcblx0JyVBdG9taWNzJSc6IHR5cGVvZiBBdG9taWNzID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEF0b21pY3MsXG5cdCclQmlnSW50JSc6IHR5cGVvZiBCaWdJbnQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQmlnSW50LFxuXHQnJUJvb2xlYW4lJzogQm9vbGVhbixcblx0JyVEYXRhVmlldyUnOiB0eXBlb2YgRGF0YVZpZXcgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRGF0YVZpZXcsXG5cdCclRGF0ZSUnOiBEYXRlLFxuXHQnJWRlY29kZVVSSSUnOiBkZWNvZGVVUkksXG5cdCclZGVjb2RlVVJJQ29tcG9uZW50JSc6IGRlY29kZVVSSUNvbXBvbmVudCxcblx0JyVlbmNvZGVVUkklJzogZW5jb2RlVVJJLFxuXHQnJWVuY29kZVVSSUNvbXBvbmVudCUnOiBlbmNvZGVVUklDb21wb25lbnQsXG5cdCclRXJyb3IlJzogRXJyb3IsXG5cdCclZXZhbCUnOiBldmFsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcblx0JyVFdmFsRXJyb3IlJzogRXZhbEVycm9yLFxuXHQnJUZsb2F0MzJBcnJheSUnOiB0eXBlb2YgRmxvYXQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0MzJBcnJheSxcblx0JyVGbG9hdDY0QXJyYXklJzogdHlwZW9mIEZsb2F0NjRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDY0QXJyYXksXG5cdCclRmluYWxpemF0aW9uUmVnaXN0cnklJzogdHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZpbmFsaXphdGlvblJlZ2lzdHJ5LFxuXHQnJUZ1bmN0aW9uJSc6ICRGdW5jdGlvbixcblx0JyVHZW5lcmF0b3JGdW5jdGlvbiUnOiBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2Z1bmN0aW9uKiAoKSB7fScpLFxuXHQnJUludDhBcnJheSUnOiB0eXBlb2YgSW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDhBcnJheSxcblx0JyVJbnQxNkFycmF5JSc6IHR5cGVvZiBJbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDE2QXJyYXksXG5cdCclSW50MzJBcnJheSUnOiB0eXBlb2YgSW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQzMkFycmF5LFxuXHQnJWlzRmluaXRlJSc6IGlzRmluaXRlLFxuXHQnJWlzTmFOJSc6IGlzTmFOLFxuXHQnJUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSA6IHVuZGVmaW5lZCxcblx0JyVKU09OJSc6IHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyA/IEpTT04gOiB1bmRlZmluZWQsXG5cdCclTWFwJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTWFwLFxuXHQnJU1hcEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IE1hcCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclTWF0aCUnOiBNYXRoLFxuXHQnJU51bWJlciUnOiBOdW1iZXIsXG5cdCclT2JqZWN0JSc6IE9iamVjdCxcblx0JyVwYXJzZUZsb2F0JSc6IHBhcnNlRmxvYXQsXG5cdCclcGFyc2VJbnQlJzogcGFyc2VJbnQsXG5cdCclUHJvbWlzZSUnOiB0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm9taXNlLFxuXHQnJVByb3h5JSc6IHR5cGVvZiBQcm94eSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm94eSxcblx0JyVSYW5nZUVycm9yJSc6IFJhbmdlRXJyb3IsXG5cdCclUmVmZXJlbmNlRXJyb3IlJzogUmVmZXJlbmNlRXJyb3IsXG5cdCclUmVmbGVjdCUnOiB0eXBlb2YgUmVmbGVjdCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBSZWZsZWN0LFxuXHQnJVJlZ0V4cCUnOiBSZWdFeHAsXG5cdCclU2V0JSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2V0LFxuXHQnJVNldEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IFNldCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclU2hhcmVkQXJyYXlCdWZmZXIlJzogdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNoYXJlZEFycmF5QnVmZmVyLFxuXHQnJVN0cmluZyUnOiBTdHJpbmcsXG5cdCclU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKCcnW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclU3ltYm9sJSc6IGhhc1N5bWJvbHMgPyBTeW1ib2wgOiB1bmRlZmluZWQsXG5cdCclU3ludGF4RXJyb3IlJzogJFN5bnRheEVycm9yLFxuXHQnJVRocm93VHlwZUVycm9yJSc6IFRocm93VHlwZUVycm9yLFxuXHQnJVR5cGVkQXJyYXklJzogVHlwZWRBcnJheSxcblx0JyVUeXBlRXJyb3IlJzogJFR5cGVFcnJvcixcblx0JyVVaW50OEFycmF5JSc6IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4QXJyYXksXG5cdCclVWludDhDbGFtcGVkQXJyYXklJzogdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4Q2xhbXBlZEFycmF5LFxuXHQnJVVpbnQxNkFycmF5JSc6IHR5cGVvZiBVaW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MTZBcnJheSxcblx0JyVVaW50MzJBcnJheSUnOiB0eXBlb2YgVWludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDMyQXJyYXksXG5cdCclVVJJRXJyb3IlJzogVVJJRXJyb3IsXG5cdCclV2Vha01hcCUnOiB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrTWFwLFxuXHQnJVdlYWtSZWYlJzogdHlwZW9mIFdlYWtSZWYgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1JlZixcblx0JyVXZWFrU2V0JSc6IHR5cGVvZiBXZWFrU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtTZXRcbn07XG5cbnZhciBMRUdBQ1lfQUxJQVNFUyA9IHtcblx0JyVBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ0FycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG90eXBlJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b19lbnRyaWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2VudHJpZXMnXSxcblx0JyVBcnJheVByb3RvX2ZvckVhY2glJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZm9yRWFjaCddLFxuXHQnJUFycmF5UHJvdG9fa2V5cyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdrZXlzJ10sXG5cdCclQXJyYXlQcm90b192YWx1ZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAndmFsdWVzJ10sXG5cdCclQXN5bmNGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0FzeW5jRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclQm9vbGVhblByb3RvdHlwZSUnOiBbJ0Jvb2xlYW4nLCAncHJvdG90eXBlJ10sXG5cdCclRGF0YVZpZXdQcm90b3R5cGUlJzogWydEYXRhVmlldycsICdwcm90b3R5cGUnXSxcblx0JyVEYXRlUHJvdG90eXBlJSc6IFsnRGF0ZScsICdwcm90b3R5cGUnXSxcblx0JyVFcnJvclByb3RvdHlwZSUnOiBbJ0Vycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUV2YWxFcnJvclByb3RvdHlwZSUnOiBbJ0V2YWxFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDMyQXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQ2NEFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQ2NEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZ1bmN0aW9uUHJvdG90eXBlJSc6IFsnRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDhBcnJheVByb3RvdHlwZSUnOiBbJ0ludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnSW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnSW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVKU09OUGFyc2UlJzogWydKU09OJywgJ3BhcnNlJ10sXG5cdCclSlNPTlN0cmluZ2lmeSUnOiBbJ0pTT04nLCAnc3RyaW5naWZ5J10sXG5cdCclTWFwUHJvdG90eXBlJSc6IFsnTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJU51bWJlclByb3RvdHlwZSUnOiBbJ051bWJlcicsICdwcm90b3R5cGUnXSxcblx0JyVPYmplY3RQcm90b3R5cGUlJzogWydPYmplY3QnLCAncHJvdG90eXBlJ10sXG5cdCclT2JqUHJvdG9fdG9TdHJpbmclJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3RvU3RyaW5nJ10sXG5cdCclT2JqUHJvdG9fdmFsdWVPZiUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndmFsdWVPZiddLFxuXHQnJVByb21pc2VQcm90b3R5cGUlJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZSddLFxuXHQnJVByb21pc2VQcm90b190aGVuJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnLCAndGhlbiddLFxuXHQnJVByb21pc2VfYWxsJSc6IFsnUHJvbWlzZScsICdhbGwnXSxcblx0JyVQcm9taXNlX3JlamVjdCUnOiBbJ1Byb21pc2UnLCAncmVqZWN0J10sXG5cdCclUHJvbWlzZV9yZXNvbHZlJSc6IFsnUHJvbWlzZScsICdyZXNvbHZlJ10sXG5cdCclUmFuZ2VFcnJvclByb3RvdHlwZSUnOiBbJ1JhbmdlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVmZXJlbmNlRXJyb3JQcm90b3R5cGUlJzogWydSZWZlcmVuY2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWdFeHBQcm90b3R5cGUlJzogWydSZWdFeHAnLCAncHJvdG90eXBlJ10sXG5cdCclU2V0UHJvdG90eXBlJSc6IFsnU2V0JywgJ3Byb3RvdHlwZSddLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnU2hhcmVkQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclU3RyaW5nUHJvdG90eXBlJSc6IFsnU3RyaW5nJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bWJvbFByb3RvdHlwZSUnOiBbJ1N5bWJvbCcsICdwcm90b3R5cGUnXSxcblx0JyVTeW50YXhFcnJvclByb3RvdHlwZSUnOiBbJ1N5bnRheEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVkQXJyYXlQcm90b3R5cGUlJzogWydUeXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVFcnJvclByb3RvdHlwZSUnOiBbJ1R5cGVFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OENsYW1wZWRBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4Q2xhbXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnVWludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDMyQXJyYXlQcm90b3R5cGUlJzogWydVaW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVUklFcnJvclByb3RvdHlwZSUnOiBbJ1VSSUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtNYXBQcm90b3R5cGUlJzogWydXZWFrTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtTZXRQcm90b3R5cGUlJzogWydXZWFrU2V0JywgJ3Byb3RvdHlwZSddXG59O1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCdoYXMnKTtcbnZhciAkY29uY2F0ID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIEFycmF5LnByb3RvdHlwZS5jb25jYXQpO1xudmFyICRzcGxpY2VBcHBseSA9IGJpbmQuY2FsbChGdW5jdGlvbi5hcHBseSwgQXJyYXkucHJvdG90eXBlLnNwbGljZSk7XG52YXIgJHJlcGxhY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcblxuLyogYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvNC4xNy4xNS9kaXN0L2xvZGFzaC5qcyNMNjczNS1MNjc0NCAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14lLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCUkKSkvZztcbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZzsgLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgc3RyaW5nVG9QYXRoID0gZnVuY3Rpb24gc3RyaW5nVG9QYXRoKHN0cmluZykge1xuXHR2YXIgcmVzdWx0ID0gW107XG5cdCRyZXBsYWNlKHN0cmluZywgcmVQcm9wTmFtZSwgZnVuY3Rpb24gKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdWJTdHJpbmcpIHtcblx0XHRyZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBxdW90ZSA/ICRyZXBsYWNlKHN1YlN0cmluZywgcmVFc2NhcGVDaGFyLCAnJDEnKSA6IG51bWJlciB8fCBtYXRjaDtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuLyogZW5kIGFkYXB0YXRpb24gKi9cblxudmFyIGdldEJhc2VJbnRyaW5zaWMgPSBmdW5jdGlvbiBnZXRCYXNlSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljTmFtZSA9IG5hbWU7XG5cdHZhciBhbGlhcztcblx0aWYgKGhhc093bihMRUdBQ1lfQUxJQVNFUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHRhbGlhcyA9IExFR0FDWV9BTElBU0VTW2ludHJpbnNpY05hbWVdO1xuXHRcdGludHJpbnNpY05hbWUgPSAnJScgKyBhbGlhc1swXSArICclJztcblx0fVxuXG5cdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHR2YXIgdmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY05hbWVdO1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICYmICFhbGxvd01pc3NpbmcpIHtcblx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBmaWxlIGFuIGlzc3VlIScpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRhbGlhczogYWxpYXMsXG5cdFx0XHRuYW1lOiBpbnRyaW5zaWNOYW1lLFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fTtcblx0fVxuXG5cdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZG9lcyBub3QgZXhpc3QhJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEdldEludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0aWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCBuYW1lLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdpbnRyaW5zaWMgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuXHR9XG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSAmJiB0eXBlb2YgYWxsb3dNaXNzaW5nICE9PSAnYm9vbGVhbicpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignXCJhbGxvd01pc3NpbmdcIiBhcmd1bWVudCBtdXN0IGJlIGEgYm9vbGVhbicpO1xuXHR9XG5cblx0dmFyIHBhcnRzID0gc3RyaW5nVG9QYXRoKG5hbWUpO1xuXHR2YXIgaW50cmluc2ljQmFzZU5hbWUgPSBwYXJ0cy5sZW5ndGggPiAwID8gcGFydHNbMF0gOiAnJztcblxuXHR2YXIgaW50cmluc2ljID0gZ2V0QmFzZUludHJpbnNpYygnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJywgYWxsb3dNaXNzaW5nKTtcblx0dmFyIGludHJpbnNpY1JlYWxOYW1lID0gaW50cmluc2ljLm5hbWU7XG5cdHZhciB2YWx1ZSA9IGludHJpbnNpYy52YWx1ZTtcblx0dmFyIHNraXBGdXJ0aGVyQ2FjaGluZyA9IGZhbHNlO1xuXG5cdHZhciBhbGlhcyA9IGludHJpbnNpYy5hbGlhcztcblx0aWYgKGFsaWFzKSB7XG5cdFx0aW50cmluc2ljQmFzZU5hbWUgPSBhbGlhc1swXTtcblx0XHQkc3BsaWNlQXBwbHkocGFydHMsICRjb25jYXQoWzAsIDFdLCBhbGlhcykpO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDEsIGlzT3duID0gdHJ1ZTsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0dmFyIHBhcnQgPSBwYXJ0c1tpXTtcblx0XHRpZiAocGFydCA9PT0gJ2NvbnN0cnVjdG9yJyB8fCAhaXNPd24pIHtcblx0XHRcdHNraXBGdXJ0aGVyQ2FjaGluZyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW50cmluc2ljQmFzZU5hbWUgKz0gJy4nICsgcGFydDtcblx0XHRpbnRyaW5zaWNSZWFsTmFtZSA9ICclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnO1xuXG5cdFx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNSZWFsTmFtZSkpIHtcblx0XHRcdHZhbHVlID0gSU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV07XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG5cdFx0XHRpZiAoJGdPUEQgJiYgKGkgKyAxKSA+PSBwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGRlc2MgPSAkZ09QRCh2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdGlzT3duID0gISFkZXNjO1xuXG5cdFx0XHRcdGlmICghYWxsb3dNaXNzaW5nICYmICEocGFydCBpbiB2YWx1ZSkpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYmFzZSBpbnRyaW5zaWMgZm9yICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCB0aGUgcHJvcGVydHkgaXMgbm90IGF2YWlsYWJsZS4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBCeSBjb252ZW50aW9uLCB3aGVuIGEgZGF0YSBwcm9wZXJ0eSBpcyBjb252ZXJ0ZWQgdG8gYW4gYWNjZXNzb3Jcblx0XHRcdFx0Ly8gcHJvcGVydHkgdG8gZW11bGF0ZSBhIGRhdGEgcHJvcGVydHkgdGhhdCBkb2VzIG5vdCBzdWZmZXIgZnJvbVxuXHRcdFx0XHQvLyB0aGUgb3ZlcnJpZGUgbWlzdGFrZSwgdGhhdCBhY2Nlc3NvcidzIGdldHRlciBpcyBtYXJrZWQgd2l0aFxuXHRcdFx0XHQvLyBhbiBgb3JpZ2luYWxWYWx1ZWAgcHJvcGVydHkuIEhlcmUsIHdoZW4gd2UgZGV0ZWN0IHRoaXMsIHdlXG5cdFx0XHRcdC8vIHVwaG9sZCB0aGUgaWxsdXNpb24gYnkgcHJldGVuZGluZyB0byBzZWUgdGhhdCBvcmlnaW5hbCBkYXRhXG5cdFx0XHRcdC8vIHByb3BlcnR5LCBpLmUuLCByZXR1cm5pbmcgdGhlIHZhbHVlIHJhdGhlciB0aGFuIHRoZSBnZXR0ZXJcblx0XHRcdFx0Ly8gaXRzZWxmLlxuXHRcdFx0XHRpZiAoaXNPd24gJiYgJ2dldCcgaW4gZGVzYyAmJiAhKCdvcmlnaW5hbFZhbHVlJyBpbiBkZXNjLmdldCkpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGRlc2MuZ2V0O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlzT3duID0gaGFzT3duKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzT3duICYmICFza2lwRnVydGhlckNhY2hpbmcpIHtcblx0XHRcdFx0SU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCcuLi9HZXRJbnRyaW5zaWMnKTtcblxudmFyICRhcHBseSA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSUnKTtcbnZhciAkY2FsbCA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsJScpO1xudmFyICRyZWZsZWN0QXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVSZWZsZWN0LmFwcGx5JScsIHRydWUpIHx8IGJpbmQuY2FsbCgkY2FsbCwgJGFwcGx5KTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IEdldEludHJpbnNpYygnJU9iamVjdC5kZWZpbmVQcm9wZXJ0eSUnLCB0cnVlKTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdCRkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IHZhbHVlOiAxIH0pO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZGVmaW5lUHJvcGVydHlcblx0XHQkZGVmaW5lUHJvcGVydHkgPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJpbmQoKSB7XG5cdHJldHVybiAkcmVmbGVjdEFwcGx5KGJpbmQsICRjYWxsLCBhcmd1bWVudHMpO1xufTtcblxudmFyIGFwcGx5QmluZCA9IGZ1bmN0aW9uIGFwcGx5QmluZCgpIHtcblx0cmV0dXJuICRyZWZsZWN0QXBwbHkoYmluZCwgJGFwcGx5LCBhcmd1bWVudHMpO1xufTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHQkZGVmaW5lUHJvcGVydHkobW9kdWxlLmV4cG9ydHMsICdhcHBseScsIHsgdmFsdWU6IGFwcGx5QmluZCB9KTtcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzLmFwcGx5ID0gYXBwbHlCaW5kO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbnVtYmVySXNOYU4gPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0cmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXMoYSwgYikge1xuXHRpZiAoYSA9PT0gMCAmJiBiID09PSAwKSB7XG5cdFx0cmV0dXJuIDEgLyBhID09PSAxIC8gYjtcblx0fVxuXHRpZiAoYSA9PT0gYikge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGlmIChudW1iZXJJc05hTihhKSAmJiBudW1iZXJJc05hTihiKSkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFBvbHlmaWxsKCkge1xuXHRyZXR1cm4gdHlwZW9mIE9iamVjdC5pcyA9PT0gJ2Z1bmN0aW9uJyA/IE9iamVjdC5pcyA6IGltcGxlbWVudGF0aW9uO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIGRlZmluZSA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2hpbU9iamVjdElzKCkge1xuXHR2YXIgcG9seWZpbGwgPSBnZXRQb2x5ZmlsbCgpO1xuXHRkZWZpbmUoT2JqZWN0LCB7IGlzOiBwb2x5ZmlsbCB9LCB7XG5cdFx0aXM6IGZ1bmN0aW9uIHRlc3RPYmplY3RJcygpIHtcblx0XHRcdHJldHVybiBPYmplY3QuaXMgIT09IHBvbHlmaWxsO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBwb2x5ZmlsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZpbmUgPSByZXF1aXJlKCdkZWZpbmUtcHJvcGVydGllcycpO1xudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnZXMtYWJzdHJhY3QvaGVscGVycy9jYWxsQmluZCcpO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG52YXIgc2hpbSA9IHJlcXVpcmUoJy4vc2hpbScpO1xuXG52YXIgcG9seWZpbGwgPSBjYWxsQmluZChnZXRQb2x5ZmlsbCgpLCBPYmplY3QpO1xuXG5kZWZpbmUocG9seWZpbGwsIHtcblx0Z2V0UG9seWZpbGw6IGdldFBvbHlmaWxsLFxuXHRpbXBsZW1lbnRhdGlvbjogaW1wbGVtZW50YXRpb24sXG5cdHNoaW06IHNoaW1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvbHlmaWxsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzU3ltYm9scyA9IHJlcXVpcmUoJ2hhcy1zeW1ib2xzJykoKTtcbnZhciBoYXNUb1N0cmluZ1RhZyA9IGhhc1N5bWJvbHMgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCc7XG52YXIgaGFzT3duUHJvcGVydHk7XG52YXIgcmVnZXhFeGVjO1xudmFyIGlzUmVnZXhNYXJrZXI7XG52YXIgYmFkU3RyaW5naWZpZXI7XG5cbmlmIChoYXNUb1N0cmluZ1RhZykge1xuXHRoYXNPd25Qcm9wZXJ0eSA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcblx0cmVnZXhFeGVjID0gRnVuY3Rpb24uY2FsbC5iaW5kKFJlZ0V4cC5wcm90b3R5cGUuZXhlYyk7XG5cdGlzUmVnZXhNYXJrZXIgPSB7fTtcblxuXHR2YXIgdGhyb3dSZWdleE1hcmtlciA9IGZ1bmN0aW9uICgpIHtcblx0XHR0aHJvdyBpc1JlZ2V4TWFya2VyO1xuXHR9O1xuXHRiYWRTdHJpbmdpZmllciA9IHtcblx0XHR0b1N0cmluZzogdGhyb3dSZWdleE1hcmtlcixcblx0XHR2YWx1ZU9mOiB0aHJvd1JlZ2V4TWFya2VyXG5cdH07XG5cblx0aWYgKHR5cGVvZiBTeW1ib2wudG9QcmltaXRpdmUgPT09ICdzeW1ib2wnKSB7XG5cdFx0YmFkU3RyaW5naWZpZXJbU3ltYm9sLnRvUHJpbWl0aXZlXSA9IHRocm93UmVnZXhNYXJrZXI7XG5cdH1cbn1cblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciByZWdleENsYXNzID0gJ1tvYmplY3QgUmVnRXhwXSc7XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzVG9TdHJpbmdUYWdcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG5cdD8gZnVuY3Rpb24gaXNSZWdleCh2YWx1ZSkge1xuXHRcdGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHZhciBkZXNjcmlwdG9yID0gZ09QRCh2YWx1ZSwgJ2xhc3RJbmRleCcpO1xuXHRcdHZhciBoYXNMYXN0SW5kZXhEYXRhUHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGhhc093blByb3BlcnR5KGRlc2NyaXB0b3IsICd2YWx1ZScpO1xuXHRcdGlmICghaGFzTGFzdEluZGV4RGF0YVByb3BlcnR5KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdHJlZ2V4RXhlYyh2YWx1ZSwgYmFkU3RyaW5naWZpZXIpO1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdHJldHVybiBlID09PSBpc1JlZ2V4TWFya2VyO1xuXHRcdH1cblx0fVxuXHQ6IGZ1bmN0aW9uIGlzUmVnZXgodmFsdWUpIHtcblx0XHQvLyBJbiBvbGRlciBicm93c2VycywgdHlwZW9mIHJlZ2V4IGluY29ycmVjdGx5IHJldHVybnMgJ2Z1bmN0aW9uJ1xuXHRcdGlmICghdmFsdWUgfHwgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gcmVnZXhDbGFzcztcblx0fTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsc1xuXHRBdG9taWNzLFxuXHRTaGFyZWRBcnJheUJ1ZmZlcixcbiovXG5cbnZhciB1bmRlZmluZWQ7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG52YXIgJGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuaWYgKCRnT1BEKSB7XG5cdHRyeSB7XG5cdFx0JGdPUEQoe30sICcnKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdCRnT1BEID0gbnVsbDsgLy8gdGhpcyBpcyBJRSA4LCB3aGljaCBoYXMgYSBicm9rZW4gZ09QRFxuXHR9XG59XG5cbnZhciB0aHJvd1R5cGVFcnJvciA9IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3ICRUeXBlRXJyb3IoKTsgfTtcbnZhciBUaHJvd1R5cGVFcnJvciA9ICRnT1BEXG5cdD8gKGZ1bmN0aW9uICgpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9ucywgbm8tY2FsbGVyLCBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcblx0XHRcdGFyZ3VtZW50cy5jYWxsZWU7IC8vIElFIDggZG9lcyBub3QgdGhyb3cgaGVyZVxuXHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdH0gY2F0Y2ggKGNhbGxlZVRocm93cykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gSUUgOCB0aHJvd3Mgb24gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhcmd1bWVudHMsICcnKVxuXHRcdFx0XHRyZXR1cm4gJGdPUEQoYXJndW1lbnRzLCAnY2FsbGVlJykuZ2V0O1xuXHRcdFx0fSBjYXRjaCAoZ09QRHRocm93cykge1xuXHRcdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KCkpXG5cdDogdGhyb3dUeXBlRXJyb3I7XG5cbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xuXG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguX19wcm90b19fOyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG5cbnZhciBnZW5lcmF0b3I7IC8vID0gZnVuY3Rpb24gKiAoKSB7fTtcbnZhciBnZW5lcmF0b3JGdW5jdGlvbiA9IGdlbmVyYXRvciA/IGdldFByb3RvKGdlbmVyYXRvcikgOiB1bmRlZmluZWQ7XG52YXIgYXN5bmNGbjsgLy8gYXN5bmMgZnVuY3Rpb24oKSB7fTtcbnZhciBhc3luY0Z1bmN0aW9uID0gYXN5bmNGbiA/IGFzeW5jRm4uY29uc3RydWN0b3IgOiB1bmRlZmluZWQ7XG52YXIgYXN5bmNHZW47IC8vIGFzeW5jIGZ1bmN0aW9uICogKCkge307XG52YXIgYXN5bmNHZW5GdW5jdGlvbiA9IGFzeW5jR2VuID8gZ2V0UHJvdG8oYXN5bmNHZW4pIDogdW5kZWZpbmVkO1xudmFyIGFzeW5jR2VuSXRlcmF0b3IgPSBhc3luY0dlbiA/IGFzeW5jR2VuKCkgOiB1bmRlZmluZWQ7XG5cbnZhciBUeXBlZEFycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8oVWludDhBcnJheSk7XG5cbnZhciBJTlRSSU5TSUNTID0ge1xuXHQnJUFycmF5JSc6IEFycmF5LFxuXHQnJUFycmF5QnVmZmVyJSc6IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBcnJheUJ1ZmZlcixcblx0JyVBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiB0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXJyYXlCdWZmZXIucHJvdG90eXBlLFxuXHQnJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclQXJyYXlQcm90b3R5cGUlJzogQXJyYXkucHJvdG90eXBlLFxuXHQnJUFycmF5UHJvdG9fZW50cmllcyUnOiBBcnJheS5wcm90b3R5cGUuZW50cmllcyxcblx0JyVBcnJheVByb3RvX2ZvckVhY2glJzogQXJyYXkucHJvdG90eXBlLmZvckVhY2gsXG5cdCclQXJyYXlQcm90b19rZXlzJSc6IEFycmF5LnByb3RvdHlwZS5rZXlzLFxuXHQnJUFycmF5UHJvdG9fdmFsdWVzJSc6IEFycmF5LnByb3RvdHlwZS52YWx1ZXMsXG5cdCclQXN5bmNGcm9tU3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Z1bmN0aW9uJSc6IGFzeW5jRnVuY3Rpb24sXG5cdCclQXN5bmNGdW5jdGlvblByb3RvdHlwZSUnOiBhc3luY0Z1bmN0aW9uID8gYXN5bmNGdW5jdGlvbi5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogYXN5bmNHZW4gPyBnZXRQcm90byhhc3luY0dlbkl0ZXJhdG9yKSA6IHVuZGVmaW5lZCxcblx0JyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJSc6IGFzeW5jR2VuRnVuY3Rpb24sXG5cdCclQXN5bmNHZW5lcmF0b3JQcm90b3R5cGUlJzogYXN5bmNHZW5GdW5jdGlvbiA/IGFzeW5jR2VuRnVuY3Rpb24ucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuXHQnJUFzeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogYXN5bmNHZW5JdGVyYXRvciAmJiBoYXNTeW1ib2xzICYmIFN5bWJvbC5hc3luY0l0ZXJhdG9yID8gYXN5bmNHZW5JdGVyYXRvcltTeW1ib2wuYXN5bmNJdGVyYXRvcl0oKSA6IHVuZGVmaW5lZCxcblx0JyVBdG9taWNzJSc6IHR5cGVvZiBBdG9taWNzID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEF0b21pY3MsXG5cdCclQm9vbGVhbiUnOiBCb29sZWFuLFxuXHQnJUJvb2xlYW5Qcm90b3R5cGUlJzogQm9vbGVhbi5wcm90b3R5cGUsXG5cdCclRGF0YVZpZXclJzogdHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IERhdGFWaWV3LFxuXHQnJURhdGFWaWV3UHJvdG90eXBlJSc6IHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBEYXRhVmlldy5wcm90b3R5cGUsXG5cdCclRGF0ZSUnOiBEYXRlLFxuXHQnJURhdGVQcm90b3R5cGUlJzogRGF0ZS5wcm90b3R5cGUsXG5cdCclZGVjb2RlVVJJJSc6IGRlY29kZVVSSSxcblx0JyVkZWNvZGVVUklDb21wb25lbnQlJzogZGVjb2RlVVJJQ29tcG9uZW50LFxuXHQnJWVuY29kZVVSSSUnOiBlbmNvZGVVUkksXG5cdCclZW5jb2RlVVJJQ29tcG9uZW50JSc6IGVuY29kZVVSSUNvbXBvbmVudCxcblx0JyVFcnJvciUnOiBFcnJvcixcblx0JyVFcnJvclByb3RvdHlwZSUnOiBFcnJvci5wcm90b3R5cGUsXG5cdCclZXZhbCUnOiBldmFsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcblx0JyVFdmFsRXJyb3IlJzogRXZhbEVycm9yLFxuXHQnJUV2YWxFcnJvclByb3RvdHlwZSUnOiBFdmFsRXJyb3IucHJvdG90eXBlLFxuXHQnJUZsb2F0MzJBcnJheSUnOiB0eXBlb2YgRmxvYXQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0MzJBcnJheSxcblx0JyVGbG9hdDMyQXJyYXlQcm90b3R5cGUlJzogdHlwZW9mIEZsb2F0MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDMyQXJyYXkucHJvdG90eXBlLFxuXHQnJUZsb2F0NjRBcnJheSUnOiB0eXBlb2YgRmxvYXQ2NEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0NjRBcnJheSxcblx0JyVGbG9hdDY0QXJyYXlQcm90b3R5cGUlJzogdHlwZW9mIEZsb2F0NjRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDY0QXJyYXkucHJvdG90eXBlLFxuXHQnJUZ1bmN0aW9uJSc6IEZ1bmN0aW9uLFxuXHQnJUZ1bmN0aW9uUHJvdG90eXBlJSc6IEZ1bmN0aW9uLnByb3RvdHlwZSxcblx0JyVHZW5lcmF0b3IlJzogZ2VuZXJhdG9yID8gZ2V0UHJvdG8oZ2VuZXJhdG9yKCkpIDogdW5kZWZpbmVkLFxuXHQnJUdlbmVyYXRvckZ1bmN0aW9uJSc6IGdlbmVyYXRvckZ1bmN0aW9uLFxuXHQnJUdlbmVyYXRvclByb3RvdHlwZSUnOiBnZW5lcmF0b3JGdW5jdGlvbiA/IGdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcblx0JyVJbnQ4QXJyYXklJzogdHlwZW9mIEludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQ4QXJyYXksXG5cdCclSW50OEFycmF5UHJvdG90eXBlJSc6IHR5cGVvZiBJbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50OEFycmF5LnByb3RvdHlwZSxcblx0JyVJbnQxNkFycmF5JSc6IHR5cGVvZiBJbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDE2QXJyYXksXG5cdCclSW50MTZBcnJheVByb3RvdHlwZSUnOiB0eXBlb2YgSW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQ4QXJyYXkucHJvdG90eXBlLFxuXHQnJUludDMyQXJyYXklJzogdHlwZW9mIEludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50MzJBcnJheSxcblx0JyVJbnQzMkFycmF5UHJvdG90eXBlJSc6IHR5cGVvZiBJbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDMyQXJyYXkucHJvdG90eXBlLFxuXHQnJWlzRmluaXRlJSc6IGlzRmluaXRlLFxuXHQnJWlzTmFOJSc6IGlzTmFOLFxuXHQnJUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSA6IHVuZGVmaW5lZCxcblx0JyVKU09OJSc6IHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyA/IEpTT04gOiB1bmRlZmluZWQsXG5cdCclSlNPTlBhcnNlJSc6IHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyA/IEpTT04ucGFyc2UgOiB1bmRlZmluZWQsXG5cdCclTWFwJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTWFwLFxuXHQnJU1hcEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IE1hcCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclTWFwUHJvdG90eXBlJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTWFwLnByb3RvdHlwZSxcblx0JyVNYXRoJSc6IE1hdGgsXG5cdCclTnVtYmVyJSc6IE51bWJlcixcblx0JyVOdW1iZXJQcm90b3R5cGUlJzogTnVtYmVyLnByb3RvdHlwZSxcblx0JyVPYmplY3QlJzogT2JqZWN0LFxuXHQnJU9iamVjdFByb3RvdHlwZSUnOiBPYmplY3QucHJvdG90eXBlLFxuXHQnJU9ialByb3RvX3RvU3RyaW5nJSc6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsXG5cdCclT2JqUHJvdG9fdmFsdWVPZiUnOiBPYmplY3QucHJvdG90eXBlLnZhbHVlT2YsXG5cdCclcGFyc2VGbG9hdCUnOiBwYXJzZUZsb2F0LFxuXHQnJXBhcnNlSW50JSc6IHBhcnNlSW50LFxuXHQnJVByb21pc2UlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZSxcblx0JyVQcm9taXNlUHJvdG90eXBlJSc6IHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb21pc2UucHJvdG90eXBlLFxuXHQnJVByb21pc2VQcm90b190aGVuJSc6IHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb21pc2UucHJvdG90eXBlLnRoZW4sXG5cdCclUHJvbWlzZV9hbGwlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZS5hbGwsXG5cdCclUHJvbWlzZV9yZWplY3QlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZS5yZWplY3QsXG5cdCclUHJvbWlzZV9yZXNvbHZlJSc6IHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb21pc2UucmVzb2x2ZSxcblx0JyVQcm94eSUnOiB0eXBlb2YgUHJveHkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJveHksXG5cdCclUmFuZ2VFcnJvciUnOiBSYW5nZUVycm9yLFxuXHQnJVJhbmdlRXJyb3JQcm90b3R5cGUlJzogUmFuZ2VFcnJvci5wcm90b3R5cGUsXG5cdCclUmVmZXJlbmNlRXJyb3IlJzogUmVmZXJlbmNlRXJyb3IsXG5cdCclUmVmZXJlbmNlRXJyb3JQcm90b3R5cGUlJzogUmVmZXJlbmNlRXJyb3IucHJvdG90eXBlLFxuXHQnJVJlZmxlY3QlJzogdHlwZW9mIFJlZmxlY3QgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUmVmbGVjdCxcblx0JyVSZWdFeHAlJzogUmVnRXhwLFxuXHQnJVJlZ0V4cFByb3RvdHlwZSUnOiBSZWdFeHAucHJvdG90eXBlLFxuXHQnJVNldCUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNldCxcblx0JyVTZXRJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBTZXQoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJVNldFByb3RvdHlwZSUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNldC5wcm90b3R5cGUsXG5cdCclU2hhcmVkQXJyYXlCdWZmZXIlJzogdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNoYXJlZEFycmF5QnVmZmVyLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyUHJvdG90eXBlJSc6IHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTaGFyZWRBcnJheUJ1ZmZlci5wcm90b3R5cGUsXG5cdCclU3RyaW5nJSc6IFN0cmluZyxcblx0JyVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oJydbU3ltYm9sLml0ZXJhdG9yXSgpKSA6IHVuZGVmaW5lZCxcblx0JyVTdHJpbmdQcm90b3R5cGUlJzogU3RyaW5nLnByb3RvdHlwZSxcblx0JyVTeW1ib2wlJzogaGFzU3ltYm9scyA/IFN5bWJvbCA6IHVuZGVmaW5lZCxcblx0JyVTeW1ib2xQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG5cdCclU3ludGF4RXJyb3IlJzogU3ludGF4RXJyb3IsXG5cdCclU3ludGF4RXJyb3JQcm90b3R5cGUlJzogU3ludGF4RXJyb3IucHJvdG90eXBlLFxuXHQnJVRocm93VHlwZUVycm9yJSc6IFRocm93VHlwZUVycm9yLFxuXHQnJVR5cGVkQXJyYXklJzogVHlwZWRBcnJheSxcblx0JyVUeXBlZEFycmF5UHJvdG90eXBlJSc6IFR5cGVkQXJyYXkgPyBUeXBlZEFycmF5LnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcblx0JyVUeXBlRXJyb3IlJzogJFR5cGVFcnJvcixcblx0JyVUeXBlRXJyb3JQcm90b3R5cGUlJzogJFR5cGVFcnJvci5wcm90b3R5cGUsXG5cdCclVWludDhBcnJheSUnOiB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OEFycmF5LFxuXHQnJVVpbnQ4QXJyYXlQcm90b3R5cGUlJzogdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhBcnJheS5wcm90b3R5cGUsXG5cdCclVWludDhDbGFtcGVkQXJyYXklJzogdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4Q2xhbXBlZEFycmF5LFxuXHQnJVVpbnQ4Q2xhbXBlZEFycmF5UHJvdG90eXBlJSc6IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OENsYW1wZWRBcnJheS5wcm90b3R5cGUsXG5cdCclVWludDE2QXJyYXklJzogdHlwZW9mIFVpbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQxNkFycmF5LFxuXHQnJVVpbnQxNkFycmF5UHJvdG90eXBlJSc6IHR5cGVvZiBVaW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MTZBcnJheS5wcm90b3R5cGUsXG5cdCclVWludDMyQXJyYXklJzogdHlwZW9mIFVpbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQzMkFycmF5LFxuXHQnJVVpbnQzMkFycmF5UHJvdG90eXBlJSc6IHR5cGVvZiBVaW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MzJBcnJheS5wcm90b3R5cGUsXG5cdCclVVJJRXJyb3IlJzogVVJJRXJyb3IsXG5cdCclVVJJRXJyb3JQcm90b3R5cGUlJzogVVJJRXJyb3IucHJvdG90eXBlLFxuXHQnJVdlYWtNYXAlJzogdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha01hcCxcblx0JyVXZWFrTWFwUHJvdG90eXBlJSc6IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtNYXAucHJvdG90eXBlLFxuXHQnJVdlYWtTZXQlJzogdHlwZW9mIFdlYWtTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1NldCxcblx0JyVXZWFrU2V0UHJvdG90eXBlJSc6IHR5cGVvZiBXZWFrU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtTZXQucHJvdG90eXBlXG59O1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciAkcmVwbGFjZSA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xuXG4vKiBhZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi80LjE3LjE1L2Rpc3QvbG9kYXNoLmpzI0w2NzM1LUw2NzQ0ICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXiUuW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JSQpKS9nO1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nOyAvKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBmdW5jdGlvbiBzdHJpbmdUb1BhdGgoc3RyaW5nKSB7XG5cdHZhciByZXN1bHQgPSBbXTtcblx0JHJlcGxhY2Uoc3RyaW5nLCByZVByb3BOYW1lLCBmdW5jdGlvbiAobWF0Y2gsIG51bWJlciwgcXVvdGUsIHN1YlN0cmluZykge1xuXHRcdHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHF1b3RlID8gJHJlcGxhY2Uoc3ViU3RyaW5nLCByZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCk7XG5cdH0pO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcbi8qIGVuZCBhZGFwdGF0aW9uICovXG5cbnZhciBnZXRCYXNlSW50cmluc2ljID0gZnVuY3Rpb24gZ2V0QmFzZUludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0aWYgKCEobmFtZSBpbiBJTlRSSU5TSUNTKSkge1xuXHRcdHRocm93IG5ldyBTeW50YXhFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBkb2VzIG5vdCBleGlzdCEnKTtcblx0fVxuXG5cdC8vIGlzdGFuYnVsIGlnbm9yZSBpZiAvLyBob3BlZnVsbHkgdGhpcyBpcyBpbXBvc3NpYmxlIHRvIHRlc3QgOi0pXG5cdGlmICh0eXBlb2YgSU5UUklOU0lDU1tuYW1lXSA9PT0gJ3VuZGVmaW5lZCcgJiYgIWFsbG93TWlzc2luZykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBmaWxlIGFuIGlzc3VlIScpO1xuXHR9XG5cblx0cmV0dXJuIElOVFJJTlNJQ1NbbmFtZV07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEdldEludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0aWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCBuYW1lLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2ludHJpbnNpYyBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG5cdH1cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHR5cGVvZiBhbGxvd01pc3NpbmcgIT09ICdib29sZWFuJykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYWxsb3dNaXNzaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBhIGJvb2xlYW4nKTtcblx0fVxuXG5cdHZhciBwYXJ0cyA9IHN0cmluZ1RvUGF0aChuYW1lKTtcblxuXHR2YXIgdmFsdWUgPSBnZXRCYXNlSW50cmluc2ljKCclJyArIChwYXJ0cy5sZW5ndGggPiAwID8gcGFydHNbMF0gOiAnJykgKyAnJScsIGFsbG93TWlzc2luZyk7XG5cdGZvciAodmFyIGkgPSAxOyBpIDwgcGFydHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAodmFsdWUgIT0gbnVsbCkge1xuXHRcdFx0aWYgKCRnT1BEICYmIChpICsgMSkgPj0gcGFydHMubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBkZXNjID0gJGdPUEQodmFsdWUsIHBhcnRzW2ldKTtcblx0XHRcdFx0aWYgKCFhbGxvd01pc3NpbmcgJiYgIShwYXJ0c1tpXSBpbiB2YWx1ZSkpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYmFzZSBpbnRyaW5zaWMgZm9yICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCB0aGUgcHJvcGVydHkgaXMgbm90IGF2YWlsYWJsZS4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBCeSBjb252ZW50aW9uLCB3aGVuIGEgZGF0YSBwcm9wZXJ0eSBpcyBjb252ZXJ0ZWQgdG8gYW4gYWNjZXNzb3Jcblx0XHRcdFx0Ly8gcHJvcGVydHkgdG8gZW11bGF0ZSBhIGRhdGEgcHJvcGVydHkgdGhhdCBkb2VzIG5vdCBzdWZmZXIgZnJvbVxuXHRcdFx0XHQvLyB0aGUgb3ZlcnJpZGUgbWlzdGFrZSwgdGhhdCBhY2Nlc3NvcidzIGdldHRlciBpcyBtYXJrZWQgd2l0aFxuXHRcdFx0XHQvLyBhbiBgb3JpZ2luYWxWYWx1ZWAgcHJvcGVydHkuIEhlcmUsIHdoZW4gd2UgZGV0ZWN0IHRoaXMsIHdlXG5cdFx0XHRcdC8vIHVwaG9sZCB0aGUgaWxsdXNpb24gYnkgcHJldGVuZGluZyB0byBzZWUgdGhhdCBvcmlnaW5hbCBkYXRhXG5cdFx0XHRcdC8vIHByb3BlcnR5LCBpLmUuLCByZXR1cm5pbmcgdGhlIHZhbHVlIHJhdGhlciB0aGFuIHRoZSBnZXR0ZXJcblx0XHRcdFx0Ly8gaXRzZWxmLlxuXHRcdFx0XHR2YWx1ZSA9IGRlc2MgJiYgJ2dldCcgaW4gZGVzYyAmJiAhKCdvcmlnaW5hbFZhbHVlJyBpbiBkZXNjLmdldCkgPyBkZXNjLmdldCA6IHZhbHVlW3BhcnRzW2ldXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydHNbaV1dO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJy4uL0dldEludHJpbnNpYycpO1xuXG52YXIgJGFwcGx5ID0gR2V0SW50cmluc2ljKCclRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5JScpO1xudmFyICRjYWxsID0gR2V0SW50cmluc2ljKCclRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwlJyk7XG52YXIgJHJlZmxlY3RBcHBseSA9IEdldEludHJpbnNpYygnJVJlZmxlY3QuYXBwbHklJywgdHJ1ZSkgfHwgYmluZC5jYWxsKCRjYWxsLCAkYXBwbHkpO1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmRlZmluZVByb3BlcnR5JScsIHRydWUpO1xuXG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdHRyeSB7XG5cdFx0JGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgdmFsdWU6IDEgfSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSA4IGhhcyBhIGJyb2tlbiBkZWZpbmVQcm9wZXJ0eVxuXHRcdCRkZWZpbmVQcm9wZXJ0eSA9IG51bGw7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQmluZCgpIHtcblx0cmV0dXJuICRyZWZsZWN0QXBwbHkoYmluZCwgJGNhbGwsIGFyZ3VtZW50cyk7XG59O1xuXG52YXIgYXBwbHlCaW5kID0gZnVuY3Rpb24gYXBwbHlCaW5kKCkge1xuXHRyZXR1cm4gJHJlZmxlY3RBcHBseShiaW5kLCAkYXBwbHksIGFyZ3VtZW50cyk7XG59O1xuXG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdCRkZWZpbmVQcm9wZXJ0eShtb2R1bGUuZXhwb3J0cywgJ2FwcGx5JywgeyB2YWx1ZTogYXBwbHlCaW5kIH0pO1xufSBlbHNlIHtcblx0bW9kdWxlLmV4cG9ydHMuYXBwbHkgPSBhcHBseUJpbmQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmxhZ3MoKSB7XG5cdGlmICh0aGlzICE9IG51bGwgJiYgdGhpcyAhPT0gJE9iamVjdCh0aGlzKSkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdSZWdFeHAucHJvdG90eXBlLmZsYWdzIGdldHRlciBjYWxsZWQgb24gbm9uLW9iamVjdCcpO1xuXHR9XG5cdHZhciByZXN1bHQgPSAnJztcblx0aWYgKHRoaXMuZ2xvYmFsKSB7XG5cdFx0cmVzdWx0ICs9ICdnJztcblx0fVxuXHRpZiAodGhpcy5pZ25vcmVDYXNlKSB7XG5cdFx0cmVzdWx0ICs9ICdpJztcblx0fVxuXHRpZiAodGhpcy5tdWx0aWxpbmUpIHtcblx0XHRyZXN1bHQgKz0gJ20nO1xuXHR9XG5cdGlmICh0aGlzLmRvdEFsbCkge1xuXHRcdHJlc3VsdCArPSAncyc7XG5cdH1cblx0aWYgKHRoaXMudW5pY29kZSkge1xuXHRcdHJlc3VsdCArPSAndSc7XG5cdH1cblx0aWYgKHRoaXMuc3RpY2t5KSB7XG5cdFx0cmVzdWx0ICs9ICd5Jztcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG52YXIgc3VwcG9ydHNEZXNjcmlwdG9ycyA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJykuc3VwcG9ydHNEZXNjcmlwdG9ycztcbnZhciAkZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRQb2x5ZmlsbCgpIHtcblx0aWYgKCFzdXBwb3J0c0Rlc2NyaXB0b3JzKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1JlZ0V4cC5wcm90b3R5cGUuZmxhZ3MgcmVxdWlyZXMgYSB0cnVlIEVTNSBlbnZpcm9ubWVudCB0aGF0IHN1cHBvcnRzIHByb3BlcnR5IGRlc2NyaXB0b3JzJyk7XG5cdH1cblx0aWYgKCgvYS9taWcpLmZsYWdzID09PSAnZ2ltJykge1xuXHRcdHZhciBkZXNjcmlwdG9yID0gJGdPUEQoUmVnRXhwLnByb3RvdHlwZSwgJ2ZsYWdzJyk7XG5cdFx0aWYgKGRlc2NyaXB0b3IgJiYgdHlwZW9mIGRlc2NyaXB0b3IuZ2V0ID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiAoL2EvKS5kb3RBbGwgPT09ICdib29sZWFuJykge1xuXHRcdFx0cmV0dXJuIGRlc2NyaXB0b3IuZ2V0O1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gaW1wbGVtZW50YXRpb247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3VwcG9ydHNEZXNjcmlwdG9ycyA9IHJlcXVpcmUoJ2RlZmluZS1wcm9wZXJ0aWVzJykuc3VwcG9ydHNEZXNjcmlwdG9ycztcbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcbnZhciBnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBUeXBlRXJyID0gVHlwZUVycm9yO1xudmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xudmFyIHJlZ2V4ID0gL2EvO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNoaW1GbGFncygpIHtcblx0aWYgKCFzdXBwb3J0c0Rlc2NyaXB0b3JzIHx8ICFnZXRQcm90bykge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyKCdSZWdFeHAucHJvdG90eXBlLmZsYWdzIHJlcXVpcmVzIGEgdHJ1ZSBFUzUgZW52aXJvbm1lbnQgdGhhdCBzdXBwb3J0cyBwcm9wZXJ0eSBkZXNjcmlwdG9ycycpO1xuXHR9XG5cdHZhciBwb2x5ZmlsbCA9IGdldFBvbHlmaWxsKCk7XG5cdHZhciBwcm90byA9IGdldFByb3RvKHJlZ2V4KTtcblx0dmFyIGRlc2NyaXB0b3IgPSBnT1BEKHByb3RvLCAnZmxhZ3MnKTtcblx0aWYgKCFkZXNjcmlwdG9yIHx8IGRlc2NyaXB0b3IuZ2V0ICE9PSBwb2x5ZmlsbCkge1xuXHRcdGRlZmluZVByb3BlcnR5KHByb3RvLCAnZmxhZ3MnLCB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRcdGdldDogcG9seWZpbGxcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4gcG9seWZpbGw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJ2VzLWFic3RyYWN0L2hlbHBlcnMvY2FsbEJpbmQnKTtcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xudmFyIGdldFBvbHlmaWxsID0gcmVxdWlyZSgnLi9wb2x5ZmlsbCcpO1xudmFyIHNoaW0gPSByZXF1aXJlKCcuL3NoaW0nKTtcblxudmFyIGZsYWdzQm91bmQgPSBjYWxsQmluZChpbXBsZW1lbnRhdGlvbik7XG5cbmRlZmluZShmbGFnc0JvdW5kLCB7XG5cdGdldFBvbHlmaWxsOiBnZXRQb2x5ZmlsbCxcblx0aW1wbGVtZW50YXRpb246IGltcGxlbWVudGF0aW9uLFxuXHRzaGltOiBzaGltXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbGFnc0JvdW5kO1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXREYXkgPSBEYXRlLnByb3RvdHlwZS5nZXREYXk7XG52YXIgdHJ5RGF0ZU9iamVjdCA9IGZ1bmN0aW9uIHRyeURhdGVHZXREYXlDYWxsKHZhbHVlKSB7XG5cdHRyeSB7XG5cdFx0Z2V0RGF5LmNhbGwodmFsdWUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xuXG52YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIGRhdGVDbGFzcyA9ICdbb2JqZWN0IERhdGVdJztcbnZhciBoYXNUb1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNEYXRlT2JqZWN0KHZhbHVlKSB7XG5cdGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnIHx8IHZhbHVlID09PSBudWxsKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJldHVybiBoYXNUb1N0cmluZ1RhZyA/IHRyeURhdGVPYmplY3QodmFsdWUpIDogdG9TdHIuY2FsbCh2YWx1ZSkgPT09IGRhdGVDbGFzcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJWYWx1ZSA9IFN0cmluZy5wcm90b3R5cGUudmFsdWVPZjtcbnZhciB0cnlTdHJpbmdPYmplY3QgPSBmdW5jdGlvbiB0cnlTdHJpbmdPYmplY3QodmFsdWUpIHtcblx0dHJ5IHtcblx0XHRzdHJWYWx1ZS5jYWxsKHZhbHVlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgc3RyQ2xhc3MgPSAnW29iamVjdCBTdHJpbmddJztcbnZhciBoYXNUb1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gaGFzVG9TdHJpbmdUYWcgPyB0cnlTdHJpbmdPYmplY3QodmFsdWUpIDogdG9TdHIuY2FsbCh2YWx1ZSkgPT09IHN0ckNsYXNzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG51bVRvU3RyID0gTnVtYmVyLnByb3RvdHlwZS50b1N0cmluZztcbnZhciB0cnlOdW1iZXJPYmplY3QgPSBmdW5jdGlvbiB0cnlOdW1iZXJPYmplY3QodmFsdWUpIHtcblx0dHJ5IHtcblx0XHRudW1Ub1N0ci5jYWxsKHZhbHVlKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgbnVtQ2xhc3MgPSAnW29iamVjdCBOdW1iZXJdJztcbnZhciBoYXNUb1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNOdW1iZXJPYmplY3QodmFsdWUpIHtcblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gaGFzVG9TdHJpbmdUYWcgPyB0cnlOdW1iZXJPYmplY3QodmFsdWUpIDogdG9TdHIuY2FsbCh2YWx1ZSkgPT09IG51bUNsYXNzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJvb2xUb1N0ciA9IEJvb2xlYW4ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG52YXIgdHJ5Qm9vbGVhbk9iamVjdCA9IGZ1bmN0aW9uIGJvb2xlYW5CcmFuZENoZWNrKHZhbHVlKSB7XG5cdHRyeSB7XG5cdFx0Ym9vbFRvU3RyLmNhbGwodmFsdWUpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBib29sQ2xhc3MgPSAnW29iamVjdCBCb29sZWFuXSc7XG52YXIgaGFzVG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQm9vbGVhbih2YWx1ZSkge1xuXHRpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRpZiAodmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gaGFzVG9TdHJpbmdUYWcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnIGluIHZhbHVlID8gdHJ5Qm9vbGVhbk9iamVjdCh2YWx1ZSkgOiB0b1N0ci5jYWxsKHZhbHVlKSA9PT0gYm9vbENsYXNzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xuXG5pZiAoaGFzU3ltYm9scykge1xuXHR2YXIgc3ltVG9TdHIgPSBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nO1xuXHR2YXIgc3ltU3RyaW5nUmVnZXggPSAvXlN5bWJvbFxcKC4qXFwpJC87XG5cdHZhciBpc1N5bWJvbE9iamVjdCA9IGZ1bmN0aW9uIGlzUmVhbFN5bWJvbE9iamVjdCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUudmFsdWVPZigpICE9PSAnc3ltYm9sJykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gc3ltU3RyaW5nUmVnZXgudGVzdChzeW1Ub1N0ci5jYWxsKHZhbHVlKSk7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzeW1ib2wnKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKHRvU3RyLmNhbGwodmFsdWUpICE9PSAnW29iamVjdCBTeW1ib2xdJykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGlzU3ltYm9sT2JqZWN0KHZhbHVlKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9O1xufSBlbHNlIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG5cdFx0Ly8gdGhpcyBlbnZpcm9ubWVudCBkb2VzIG5vdCBzdXBwb3J0IFN5bWJvbHMuXG5cdFx0cmV0dXJuIGZhbHNlICYmIHZhbHVlO1xuXHR9O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pZiAodHlwZW9mIEJpZ0ludCA9PT0gJ2Z1bmN0aW9uJykge1xuXHR2YXIgYmlnSW50VmFsdWVPZiA9IEJpZ0ludC5wcm90b3R5cGUudmFsdWVPZjtcblx0dmFyIHRyeUJpZ0ludCA9IGZ1bmN0aW9uIHRyeUJpZ0ludE9iamVjdCh2YWx1ZSkge1xuXHRcdHRyeSB7XG5cdFx0XHRiaWdJbnRWYWx1ZU9mLmNhbGwodmFsdWUpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0JpZ0ludCh2YWx1ZSkge1xuXHRcdGlmIChcblx0XHRcdHZhbHVlID09PSBudWxsXG5cdFx0XHR8fCB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnXG5cdFx0XHR8fCB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJ1xuXHRcdFx0fHwgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJ1xuXHRcdFx0fHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJ1xuXHRcdFx0fHwgdHlwZW9mIHZhbHVlID09PSAnc3ltYm9sJ1xuXHRcdFx0fHwgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nXG5cdFx0KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdiaWdpbnQnKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgdmFsaWQtdHlwZW9mXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ5QmlnSW50KHZhbHVlKTtcblx0fTtcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNCaWdJbnQodmFsdWUpIHtcblx0XHRyZXR1cm4gZmFsc2UgJiYgdmFsdWU7XG5cdH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc1N0cmluZyA9IHJlcXVpcmUoJ2lzLXN0cmluZycpO1xudmFyIGlzTnVtYmVyID0gcmVxdWlyZSgnaXMtbnVtYmVyLW9iamVjdCcpO1xudmFyIGlzQm9vbGVhbiA9IHJlcXVpcmUoJ2lzLWJvb2xlYW4tb2JqZWN0Jyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCdpcy1zeW1ib2wnKTtcbnZhciBpc0JpZ0ludCA9IHJlcXVpcmUoJ2lzLWJpZ2ludCcpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hpY2hCb3hlZFByaW1pdGl2ZSh2YWx1ZSkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG5cdGlmICh2YWx1ZSA9PSBudWxsIHx8ICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWx1ZSAhPT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG5cdFx0cmV0dXJuICdTdHJpbmcnO1xuXHR9XG5cdGlmIChpc051bWJlcih2YWx1ZSkpIHtcblx0XHRyZXR1cm4gJ051bWJlcic7XG5cdH1cblx0aWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcblx0XHRyZXR1cm4gJ0Jvb2xlYW4nO1xuXHR9XG5cdGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcblx0XHRyZXR1cm4gJ1N5bWJvbCc7XG5cdH1cblx0aWYgKGlzQmlnSW50KHZhbHVlKSkge1xuXHRcdHJldHVybiAnQmlnSW50Jztcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsc1xuXHRBZ2dyZWdhdGVFcnJvcixcblx0QXRvbWljcyxcblx0RmluYWxpemF0aW9uUmVnaXN0cnksXG5cdFNoYXJlZEFycmF5QnVmZmVyLFxuXHRXZWFrUmVmLFxuKi9cblxudmFyIHVuZGVmaW5lZDtcblxudmFyICRTeW50YXhFcnJvciA9IFN5bnRheEVycm9yO1xudmFyICRGdW5jdGlvbiA9IEZ1bmN0aW9uO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxudmFyIGdldEV2YWxsZWRDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChleHByZXNzaW9uU3ludGF4KSB7XG5cdHRyeSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG5cdFx0cmV0dXJuIEZ1bmN0aW9uKCdcInVzZSBzdHJpY3RcIjsgcmV0dXJuICgnICsgZXhwcmVzc2lvblN5bnRheCArICcpLmNvbnN0cnVjdG9yOycpKCk7XG5cdH0gY2F0Y2ggKGUpIHt9XG59O1xuXG52YXIgJGdPUEQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuaWYgKCRnT1BEKSB7XG5cdHRyeSB7XG5cdFx0JGdPUEQoe30sICcnKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdCRnT1BEID0gbnVsbDsgLy8gdGhpcyBpcyBJRSA4LCB3aGljaCBoYXMgYSBicm9rZW4gZ09QRFxuXHR9XG59XG5cbnZhciB0aHJvd1R5cGVFcnJvciA9IGZ1bmN0aW9uICgpIHsgdGhyb3cgbmV3ICRUeXBlRXJyb3IoKTsgfTtcbnZhciBUaHJvd1R5cGVFcnJvciA9ICRnT1BEXG5cdD8gKGZ1bmN0aW9uICgpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9ucywgbm8tY2FsbGVyLCBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcblx0XHRcdGFyZ3VtZW50cy5jYWxsZWU7IC8vIElFIDggZG9lcyBub3QgdGhyb3cgaGVyZVxuXHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdH0gY2F0Y2ggKGNhbGxlZVRocm93cykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gSUUgOCB0aHJvd3Mgb24gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhcmd1bWVudHMsICcnKVxuXHRcdFx0XHRyZXR1cm4gJGdPUEQoYXJndW1lbnRzLCAnY2FsbGVlJykuZ2V0O1xuXHRcdFx0fSBjYXRjaCAoZ09QRHRocm93cykge1xuXHRcdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KCkpXG5cdDogdGhyb3dUeXBlRXJyb3I7XG5cbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xuXG52YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHguX19wcm90b19fOyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG5cbnZhciBhc3luY0dlbkZ1bmN0aW9uID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiogKCkge30nKTtcbnZhciBhc3luY0dlbkZ1bmN0aW9uUHJvdG90eXBlID0gYXN5bmNHZW5GdW5jdGlvbiA/IGFzeW5jR2VuRnVuY3Rpb24ucHJvdG90eXBlIDogdW5kZWZpbmVkO1xudmFyIGFzeW5jR2VuUHJvdG90eXBlID0gYXN5bmNHZW5GdW5jdGlvblByb3RvdHlwZSA/IGFzeW5jR2VuRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlIDogdW5kZWZpbmVkO1xuXG52YXIgVHlwZWRBcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKFVpbnQ4QXJyYXkpO1xuXG52YXIgSU5UUklOU0lDUyA9IHtcblx0JyVBZ2dyZWdhdGVFcnJvciUnOiB0eXBlb2YgQWdncmVnYXRlRXJyb3IgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQWdncmVnYXRlRXJyb3IsXG5cdCclQXJyYXklJzogQXJyYXksXG5cdCclQXJyYXlCdWZmZXIlJzogdHlwZW9mIEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFycmF5QnVmZmVyLFxuXHQnJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGcm9tU3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Z1bmN0aW9uJSc6IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignYXN5bmMgZnVuY3Rpb24gKCkge30nKSxcblx0JyVBc3luY0dlbmVyYXRvciUnOiBhc3luY0dlbkZ1bmN0aW9uUHJvdG90eXBlLFxuXHQnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJzogYXN5bmNHZW5GdW5jdGlvbixcblx0JyVBc3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IGFzeW5jR2VuUHJvdG90eXBlID8gZ2V0UHJvdG8oYXN5bmNHZW5Qcm90b3R5cGUpIDogdW5kZWZpbmVkLFxuXHQnJUF0b21pY3MlJzogdHlwZW9mIEF0b21pY3MgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXRvbWljcyxcblx0JyVCaWdJbnQlJzogdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBCaWdJbnQsXG5cdCclQm9vbGVhbiUnOiBCb29sZWFuLFxuXHQnJURhdGFWaWV3JSc6IHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBEYXRhVmlldyxcblx0JyVEYXRlJSc6IERhdGUsXG5cdCclZGVjb2RlVVJJJSc6IGRlY29kZVVSSSxcblx0JyVkZWNvZGVVUklDb21wb25lbnQlJzogZGVjb2RlVVJJQ29tcG9uZW50LFxuXHQnJWVuY29kZVVSSSUnOiBlbmNvZGVVUkksXG5cdCclZW5jb2RlVVJJQ29tcG9uZW50JSc6IGVuY29kZVVSSUNvbXBvbmVudCxcblx0JyVFcnJvciUnOiBFcnJvcixcblx0JyVldmFsJSc6IGV2YWwsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxuXHQnJUV2YWxFcnJvciUnOiBFdmFsRXJyb3IsXG5cdCclRmxvYXQzMkFycmF5JSc6IHR5cGVvZiBGbG9hdDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQzMkFycmF5LFxuXHQnJUZsb2F0NjRBcnJheSUnOiB0eXBlb2YgRmxvYXQ2NEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0NjRBcnJheSxcblx0JyVGaW5hbGl6YXRpb25SZWdpc3RyeSUnOiB0eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmluYWxpemF0aW9uUmVnaXN0cnksXG5cdCclRnVuY3Rpb24lJzogJEZ1bmN0aW9uLFxuXHQnJUdlbmVyYXRvckZ1bmN0aW9uJSc6IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignZnVuY3Rpb24qICgpIHt9JyksXG5cdCclSW50OEFycmF5JSc6IHR5cGVvZiBJbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50OEFycmF5LFxuXHQnJUludDE2QXJyYXklJzogdHlwZW9mIEludDE2QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50MTZBcnJheSxcblx0JyVJbnQzMkFycmF5JSc6IHR5cGVvZiBJbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDMyQXJyYXksXG5cdCclaXNGaW5pdGUlJzogaXNGaW5pdGUsXG5cdCclaXNOYU4lJzogaXNOYU4sXG5cdCclSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKGdldFByb3RvKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkpIDogdW5kZWZpbmVkLFxuXHQnJUpTT04lJzogdHlwZW9mIEpTT04gPT09ICdvYmplY3QnID8gSlNPTiA6IHVuZGVmaW5lZCxcblx0JyVNYXAlJzogdHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBNYXAsXG5cdCclTWFwSXRlcmF0b3JQcm90b3R5cGUlJzogdHlwZW9mIE1hcCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc1N5bWJvbHMgPyB1bmRlZmluZWQgOiBnZXRQcm90byhuZXcgTWFwKClbU3ltYm9sLml0ZXJhdG9yXSgpKSxcblx0JyVNYXRoJSc6IE1hdGgsXG5cdCclTnVtYmVyJSc6IE51bWJlcixcblx0JyVPYmplY3QlJzogT2JqZWN0LFxuXHQnJXBhcnNlRmxvYXQlJzogcGFyc2VGbG9hdCxcblx0JyVwYXJzZUludCUnOiBwYXJzZUludCxcblx0JyVQcm9taXNlJSc6IHR5cGVvZiBQcm9taXNlID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb21pc2UsXG5cdCclUHJveHklJzogdHlwZW9mIFByb3h5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFByb3h5LFxuXHQnJVJhbmdlRXJyb3IlJzogUmFuZ2VFcnJvcixcblx0JyVSZWZlcmVuY2VFcnJvciUnOiBSZWZlcmVuY2VFcnJvcixcblx0JyVSZWZsZWN0JSc6IHR5cGVvZiBSZWZsZWN0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFJlZmxlY3QsXG5cdCclUmVnRXhwJSc6IFJlZ0V4cCxcblx0JyVTZXQlJzogdHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTZXQsXG5cdCclU2V0SXRlcmF0b3JQcm90b3R5cGUlJzogdHlwZW9mIFNldCA9PT0gJ3VuZGVmaW5lZCcgfHwgIWhhc1N5bWJvbHMgPyB1bmRlZmluZWQgOiBnZXRQcm90byhuZXcgU2V0KClbU3ltYm9sLml0ZXJhdG9yXSgpKSxcblx0JyVTaGFyZWRBcnJheUJ1ZmZlciUnOiB0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2hhcmVkQXJyYXlCdWZmZXIsXG5cdCclU3RyaW5nJSc6IFN0cmluZyxcblx0JyVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oJydbU3ltYm9sLml0ZXJhdG9yXSgpKSA6IHVuZGVmaW5lZCxcblx0JyVTeW1ib2wlJzogaGFzU3ltYm9scyA/IFN5bWJvbCA6IHVuZGVmaW5lZCxcblx0JyVTeW50YXhFcnJvciUnOiAkU3ludGF4RXJyb3IsXG5cdCclVGhyb3dUeXBlRXJyb3IlJzogVGhyb3dUeXBlRXJyb3IsXG5cdCclVHlwZWRBcnJheSUnOiBUeXBlZEFycmF5LFxuXHQnJVR5cGVFcnJvciUnOiAkVHlwZUVycm9yLFxuXHQnJVVpbnQ4QXJyYXklJzogdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhBcnJheSxcblx0JyVVaW50OENsYW1wZWRBcnJheSUnOiB0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDhDbGFtcGVkQXJyYXksXG5cdCclVWludDE2QXJyYXklJzogdHlwZW9mIFVpbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQxNkFycmF5LFxuXHQnJVVpbnQzMkFycmF5JSc6IHR5cGVvZiBVaW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MzJBcnJheSxcblx0JyVVUklFcnJvciUnOiBVUklFcnJvcixcblx0JyVXZWFrTWFwJSc6IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtNYXAsXG5cdCclV2Vha1JlZiUnOiB0eXBlb2YgV2Vha1JlZiA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrUmVmLFxuXHQnJVdlYWtTZXQlJzogdHlwZW9mIFdlYWtTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1NldFxufTtcblxudmFyIExFR0FDWV9BTElBU0VTID0ge1xuXHQnJUFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b3R5cGUlJzogWydBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVBcnJheVByb3RvX2VudHJpZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZW50cmllcyddLFxuXHQnJUFycmF5UHJvdG9fZm9yRWFjaCUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdmb3JFYWNoJ10sXG5cdCclQXJyYXlQcm90b19rZXlzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2tleXMnXSxcblx0JyVBcnJheVByb3RvX3ZhbHVlcyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICd2YWx1ZXMnXSxcblx0JyVBc3luY0Z1bmN0aW9uUHJvdG90eXBlJSc6IFsnQXN5bmNGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVBc3luY0dlbmVyYXRvciUnOiBbJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3JQcm90b3R5cGUlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZScsICdwcm90b3R5cGUnXSxcblx0JyVCb29sZWFuUHJvdG90eXBlJSc6IFsnQm9vbGVhbicsICdwcm90b3R5cGUnXSxcblx0JyVEYXRhVmlld1Byb3RvdHlwZSUnOiBbJ0RhdGFWaWV3JywgJ3Byb3RvdHlwZSddLFxuXHQnJURhdGVQcm90b3R5cGUlJzogWydEYXRlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUVycm9yUHJvdG90eXBlJSc6IFsnRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclRXZhbEVycm9yUHJvdG90eXBlJSc6IFsnRXZhbEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUZsb2F0MzJBcnJheVByb3RvdHlwZSUnOiBbJ0Zsb2F0MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDY0QXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDY0QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRnVuY3Rpb25Qcm90b3R5cGUlJzogWydGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVHZW5lcmF0b3IlJzogWydHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVHZW5lcmF0b3JQcm90b3R5cGUlJzogWydHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclSW50OEFycmF5UHJvdG90eXBlJSc6IFsnSW50OEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDE2QXJyYXlQcm90b3R5cGUlJzogWydJbnQxNkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDMyQXJyYXlQcm90b3R5cGUlJzogWydJbnQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUpTT05QYXJzZSUnOiBbJ0pTT04nLCAncGFyc2UnXSxcblx0JyVKU09OU3RyaW5naWZ5JSc6IFsnSlNPTicsICdzdHJpbmdpZnknXSxcblx0JyVNYXBQcm90b3R5cGUlJzogWydNYXAnLCAncHJvdG90eXBlJ10sXG5cdCclTnVtYmVyUHJvdG90eXBlJSc6IFsnTnVtYmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJU9iamVjdFByb3RvdHlwZSUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnXSxcblx0JyVPYmpQcm90b190b1N0cmluZyUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndG9TdHJpbmcnXSxcblx0JyVPYmpQcm90b192YWx1ZU9mJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZScsICd2YWx1ZU9mJ10sXG5cdCclUHJvbWlzZVByb3RvdHlwZSUnOiBbJ1Byb21pc2UnLCAncHJvdG90eXBlJ10sXG5cdCclUHJvbWlzZVByb3RvX3RoZW4lJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZScsICd0aGVuJ10sXG5cdCclUHJvbWlzZV9hbGwlJzogWydQcm9taXNlJywgJ2FsbCddLFxuXHQnJVByb21pc2VfcmVqZWN0JSc6IFsnUHJvbWlzZScsICdyZWplY3QnXSxcblx0JyVQcm9taXNlX3Jlc29sdmUlJzogWydQcm9taXNlJywgJ3Jlc29sdmUnXSxcblx0JyVSYW5nZUVycm9yUHJvdG90eXBlJSc6IFsnUmFuZ2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWZlcmVuY2VFcnJvclByb3RvdHlwZSUnOiBbJ1JlZmVyZW5jZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVJlZ0V4cFByb3RvdHlwZSUnOiBbJ1JlZ0V4cCcsICdwcm90b3R5cGUnXSxcblx0JyVTZXRQcm90b3R5cGUlJzogWydTZXQnLCAncHJvdG90eXBlJ10sXG5cdCclU2hhcmVkQXJyYXlCdWZmZXJQcm90b3R5cGUlJzogWydTaGFyZWRBcnJheUJ1ZmZlcicsICdwcm90b3R5cGUnXSxcblx0JyVTdHJpbmdQcm90b3R5cGUlJzogWydTdHJpbmcnLCAncHJvdG90eXBlJ10sXG5cdCclU3ltYm9sUHJvdG90eXBlJSc6IFsnU3ltYm9sJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bnRheEVycm9yUHJvdG90eXBlJSc6IFsnU3ludGF4RXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclVHlwZWRBcnJheVByb3RvdHlwZSUnOiBbJ1R5cGVkQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVHlwZUVycm9yUHJvdG90eXBlJSc6IFsnVHlwZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQ4QXJyYXlQcm90b3R5cGUlJzogWydVaW50OEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQ4Q2xhbXBlZEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhDbGFtcGVkQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDE2QXJyYXlQcm90b3R5cGUlJzogWydVaW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50MzJBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVSSUVycm9yUHJvdG90eXBlJSc6IFsnVVJJRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclV2Vha01hcFByb3RvdHlwZSUnOiBbJ1dlYWtNYXAnLCAncHJvdG90eXBlJ10sXG5cdCclV2Vha1NldFByb3RvdHlwZSUnOiBbJ1dlYWtTZXQnLCAncHJvdG90eXBlJ11cbn07XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJ2hhcycpO1xudmFyICRjb25jYXQgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgQXJyYXkucHJvdG90eXBlLmNvbmNhdCk7XG52YXIgJHNwbGljZUFwcGx5ID0gYmluZC5jYWxsKEZ1bmN0aW9uLmFwcGx5LCBBcnJheS5wcm90b3R5cGUuc3BsaWNlKTtcbnZhciAkcmVwbGFjZSA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2UpO1xuXG4vKiBhZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2xvZGFzaC9sb2Rhc2gvYmxvYi80LjE3LjE1L2Rpc3QvbG9kYXNoLmpzI0w2NzM1LUw2NzQ0ICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXiUuW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JSQpKS9nO1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nOyAvKiogVXNlZCB0byBtYXRjaCBiYWNrc2xhc2hlcyBpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBmdW5jdGlvbiBzdHJpbmdUb1BhdGgoc3RyaW5nKSB7XG5cdHZhciByZXN1bHQgPSBbXTtcblx0JHJlcGxhY2Uoc3RyaW5nLCByZVByb3BOYW1lLCBmdW5jdGlvbiAobWF0Y2gsIG51bWJlciwgcXVvdGUsIHN1YlN0cmluZykge1xuXHRcdHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHF1b3RlID8gJHJlcGxhY2Uoc3ViU3RyaW5nLCByZUVzY2FwZUNoYXIsICckMScpIDogbnVtYmVyIHx8IG1hdGNoO1xuXHR9KTtcblx0cmV0dXJuIHJlc3VsdDtcbn07XG4vKiBlbmQgYWRhcHRhdGlvbiAqL1xuXG52YXIgZ2V0QmFzZUludHJpbnNpYyA9IGZ1bmN0aW9uIGdldEJhc2VJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWNOYW1lID0gbmFtZTtcblx0dmFyIGFsaWFzO1xuXHRpZiAoaGFzT3duKExFR0FDWV9BTElBU0VTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdGFsaWFzID0gTEVHQUNZX0FMSUFTRVNbaW50cmluc2ljTmFtZV07XG5cdFx0aW50cmluc2ljTmFtZSA9ICclJyArIGFsaWFzWzBdICsgJyUnO1xuXHR9XG5cblx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNOYW1lKSkge1xuXHRcdHZhciB2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljTmFtZV07XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgJiYgIWFsbG93TWlzc2luZykge1xuXHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGZpbGUgYW4gaXNzdWUhJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGFsaWFzOiBhbGlhcyxcblx0XHRcdG5hbWU6IGludHJpbnNpY05hbWUsXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9O1xuXHR9XG5cblx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBkb2VzIG5vdCBleGlzdCEnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gR2V0SW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG5cdH1cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHR5cGVvZiBhbGxvd01pc3NpbmcgIT09ICdib29sZWFuJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdcImFsbG93TWlzc2luZ1wiIGFyZ3VtZW50IG11c3QgYmUgYSBib29sZWFuJyk7XG5cdH1cblxuXHR2YXIgcGFydHMgPSBzdHJpbmdUb1BhdGgobmFtZSk7XG5cdHZhciBpbnRyaW5zaWNCYXNlTmFtZSA9IHBhcnRzLmxlbmd0aCA+IDAgPyBwYXJ0c1swXSA6ICcnO1xuXG5cdHZhciBpbnRyaW5zaWMgPSBnZXRCYXNlSW50cmluc2ljKCclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnLCBhbGxvd01pc3NpbmcpO1xuXHR2YXIgaW50cmluc2ljUmVhbE5hbWUgPSBpbnRyaW5zaWMubmFtZTtcblx0dmFyIHZhbHVlID0gaW50cmluc2ljLnZhbHVlO1xuXHR2YXIgc2tpcEZ1cnRoZXJDYWNoaW5nID0gZmFsc2U7XG5cblx0dmFyIGFsaWFzID0gaW50cmluc2ljLmFsaWFzO1xuXHRpZiAoYWxpYXMpIHtcblx0XHRpbnRyaW5zaWNCYXNlTmFtZSA9IGFsaWFzWzBdO1xuXHRcdCRzcGxpY2VBcHBseShwYXJ0cywgJGNvbmNhdChbMCwgMV0sIGFsaWFzKSk7XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMSwgaXNPd24gPSB0cnVlOyBpIDwgcGFydHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHR2YXIgcGFydCA9IHBhcnRzW2ldO1xuXHRcdGlmIChwYXJ0ID09PSAnY29uc3RydWN0b3InIHx8ICFpc093bikge1xuXHRcdFx0c2tpcEZ1cnRoZXJDYWNoaW5nID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpbnRyaW5zaWNCYXNlTmFtZSArPSAnLicgKyBwYXJ0O1xuXHRcdGludHJpbnNpY1JlYWxOYW1lID0gJyUnICsgaW50cmluc2ljQmFzZU5hbWUgKyAnJSc7XG5cblx0XHRpZiAoaGFzT3duKElOVFJJTlNJQ1MsIGludHJpbnNpY1JlYWxOYW1lKSkge1xuXHRcdFx0dmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY1JlYWxOYW1lXTtcblx0XHR9IGVsc2UgaWYgKHZhbHVlICE9IG51bGwpIHtcblx0XHRcdGlmICgkZ09QRCAmJiAoaSArIDEpID49IHBhcnRzLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgZGVzYyA9ICRnT1BEKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0aXNPd24gPSAhIWRlc2M7XG5cblx0XHRcdFx0aWYgKCFhbGxvd01pc3NpbmcgJiYgIShwYXJ0IGluIHZhbHVlKSkge1xuXHRcdFx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdiYXNlIGludHJpbnNpYyBmb3IgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IHRoZSBwcm9wZXJ0eSBpcyBub3QgYXZhaWxhYmxlLicpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIEJ5IGNvbnZlbnRpb24sIHdoZW4gYSBkYXRhIHByb3BlcnR5IGlzIGNvbnZlcnRlZCB0byBhbiBhY2Nlc3NvclxuXHRcdFx0XHQvLyBwcm9wZXJ0eSB0byBlbXVsYXRlIGEgZGF0YSBwcm9wZXJ0eSB0aGF0IGRvZXMgbm90IHN1ZmZlciBmcm9tXG5cdFx0XHRcdC8vIHRoZSBvdmVycmlkZSBtaXN0YWtlLCB0aGF0IGFjY2Vzc29yJ3MgZ2V0dGVyIGlzIG1hcmtlZCB3aXRoXG5cdFx0XHRcdC8vIGFuIGBvcmlnaW5hbFZhbHVlYCBwcm9wZXJ0eS4gSGVyZSwgd2hlbiB3ZSBkZXRlY3QgdGhpcywgd2Vcblx0XHRcdFx0Ly8gdXBob2xkIHRoZSBpbGx1c2lvbiBieSBwcmV0ZW5kaW5nIHRvIHNlZSB0aGF0IG9yaWdpbmFsIGRhdGFcblx0XHRcdFx0Ly8gcHJvcGVydHksIGkuZS4sIHJldHVybmluZyB0aGUgdmFsdWUgcmF0aGVyIHRoYW4gdGhlIGdldHRlclxuXHRcdFx0XHQvLyBpdHNlbGYuXG5cdFx0XHRcdGlmIChpc093biAmJiAnZ2V0JyBpbiBkZXNjICYmICEoJ29yaWdpbmFsVmFsdWUnIGluIGRlc2MuZ2V0KSkge1xuXHRcdFx0XHRcdHZhbHVlID0gZGVzYy5nZXQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aXNPd24gPSBoYXNPd24odmFsdWUsIHBhcnQpO1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNPd24gJiYgIXNraXBGdXJ0aGVyQ2FjaGluZykge1xuXHRcdFx0XHRJTlRSSU5TSUNTW2ludHJpbnNpY1JlYWxOYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJy4uL0dldEludHJpbnNpYycpO1xuXG52YXIgJGFwcGx5ID0gR2V0SW50cmluc2ljKCclRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5JScpO1xudmFyICRjYWxsID0gR2V0SW50cmluc2ljKCclRnVuY3Rpb24ucHJvdG90eXBlLmNhbGwlJyk7XG52YXIgJHJlZmxlY3RBcHBseSA9IEdldEludHJpbnNpYygnJVJlZmxlY3QuYXBwbHklJywgdHJ1ZSkgfHwgYmluZC5jYWxsKCRjYWxsLCAkYXBwbHkpO1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmRlZmluZVByb3BlcnR5JScsIHRydWUpO1xuXG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdHRyeSB7XG5cdFx0JGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgdmFsdWU6IDEgfSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSA4IGhhcyBhIGJyb2tlbiBkZWZpbmVQcm9wZXJ0eVxuXHRcdCRkZWZpbmVQcm9wZXJ0eSA9IG51bGw7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQmluZCgpIHtcblx0cmV0dXJuICRyZWZsZWN0QXBwbHkoYmluZCwgJGNhbGwsIGFyZ3VtZW50cyk7XG59O1xuXG52YXIgYXBwbHlCaW5kID0gZnVuY3Rpb24gYXBwbHlCaW5kKCkge1xuXHRyZXR1cm4gJHJlZmxlY3RBcHBseShiaW5kLCAkYXBwbHksIGFyZ3VtZW50cyk7XG59O1xuXG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdCRkZWZpbmVQcm9wZXJ0eShtb2R1bGUuZXhwb3J0cywgJ2FwcGx5JywgeyB2YWx1ZTogYXBwbHlCaW5kIH0pO1xufSBlbHNlIHtcblx0bW9kdWxlLmV4cG9ydHMuYXBwbHkgPSBhcHBseUJpbmQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCcuLi9HZXRJbnRyaW5zaWMnKTtcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnLi9jYWxsQmluZCcpO1xuXG52YXIgJGluZGV4T2YgPSBjYWxsQmluZChHZXRJbnRyaW5zaWMoJ1N0cmluZy5wcm90b3R5cGUuaW5kZXhPZicpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQm91bmRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWMgPSBHZXRJbnRyaW5zaWMobmFtZSwgISFhbGxvd01pc3NpbmcpO1xuXHRpZiAodHlwZW9mIGludHJpbnNpYyA9PT0gJ2Z1bmN0aW9uJyAmJiAkaW5kZXhPZihuYW1lLCAnLnByb3RvdHlwZS4nKSkge1xuXHRcdHJldHVybiBjYWxsQmluZChpbnRyaW5zaWMpO1xuXHR9XG5cdHJldHVybiBpbnRyaW5zaWM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgJE1hcCA9IHR5cGVvZiBNYXAgPT09ICdmdW5jdGlvbicgJiYgTWFwLnByb3RvdHlwZSA/IE1hcCA6IG51bGw7XG52YXIgJFNldCA9IHR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgJiYgU2V0LnByb3RvdHlwZSA/IFNldCA6IG51bGw7XG5cbnZhciBleHBvcnRlZDtcblxuaWYgKCEkTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRleHBvcnRlZCA9IGZ1bmN0aW9uIGlzTWFwKHgpIHtcblx0XHQvLyBgTWFwYCBpcyBub3QgcHJlc2VudCBpbiB0aGlzIGVudmlyb25tZW50LlxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxudmFyICRtYXBIYXMgPSAkTWFwID8gTWFwLnByb3RvdHlwZS5oYXMgOiBudWxsO1xudmFyICRzZXRIYXMgPSAkU2V0ID8gU2V0LnByb3RvdHlwZS5oYXMgOiBudWxsO1xuaWYgKCFleHBvcnRlZCAmJiAhJG1hcEhhcykge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0ZXhwb3J0ZWQgPSBmdW5jdGlvbiBpc01hcCh4KSB7XG5cdFx0Ly8gYE1hcGAgZG9lcyBub3QgaGF2ZSBhIGBoYXNgIG1ldGhvZFxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRlZCB8fCBmdW5jdGlvbiBpc01hcCh4KSB7XG5cdGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0dHJ5IHtcblx0XHQkbWFwSGFzLmNhbGwoeCk7XG5cdFx0aWYgKCRzZXRIYXMpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdCRzZXRIYXMuY2FsbCh4KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB4IGluc3RhbmNlb2YgJE1hcDsgLy8gY29yZS1qcyB3b3JrYXJvdW5kLCBwcmUtdjIuNS4wXG5cdH0gY2F0Y2ggKGUpIHt9XG5cdHJldHVybiBmYWxzZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciAkTWFwID0gdHlwZW9mIE1hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBNYXAucHJvdG90eXBlID8gTWFwIDogbnVsbDtcbnZhciAkU2V0ID0gdHlwZW9mIFNldCA9PT0gJ2Z1bmN0aW9uJyAmJiBTZXQucHJvdG90eXBlID8gU2V0IDogbnVsbDtcblxudmFyIGV4cG9ydGVkO1xuXG5pZiAoISRTZXQpIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdGV4cG9ydGVkID0gZnVuY3Rpb24gaXNTZXQoeCkge1xuXHRcdC8vIGBTZXRgIGlzIG5vdCBwcmVzZW50IGluIHRoaXMgZW52aXJvbm1lbnQuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuXG52YXIgJG1hcEhhcyA9ICRNYXAgPyBNYXAucHJvdG90eXBlLmhhcyA6IG51bGw7XG52YXIgJHNldEhhcyA9ICRTZXQgPyBTZXQucHJvdG90eXBlLmhhcyA6IG51bGw7XG5pZiAoIWV4cG9ydGVkICYmICEkc2V0SGFzKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRleHBvcnRlZCA9IGZ1bmN0aW9uIGlzU2V0KHgpIHtcblx0XHQvLyBgU2V0YCBkb2VzIG5vdCBoYXZlIGEgYGhhc2AgbWV0aG9kXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydGVkIHx8IGZ1bmN0aW9uIGlzU2V0KHgpIHtcblx0aWYgKCF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHR0cnkge1xuXHRcdCRzZXRIYXMuY2FsbCh4KTtcblx0XHRpZiAoJG1hcEhhcykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0JG1hcEhhcy5jYWxsKHgpO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHggaW5zdGFuY2VvZiAkU2V0OyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12Mi41LjBcblx0fSBjYXRjaCAoZSkge31cblx0cmV0dXJuIGZhbHNlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyICRXZWFrTWFwID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicgJiYgV2Vha01hcC5wcm90b3R5cGUgPyBXZWFrTWFwIDogbnVsbDtcbnZhciAkV2Vha1NldCA9IHR5cGVvZiBXZWFrU2V0ID09PSAnZnVuY3Rpb24nICYmIFdlYWtTZXQucHJvdG90eXBlID8gV2Vha1NldCA6IG51bGw7XG5cbnZhciBleHBvcnRlZDtcblxuaWYgKCEkV2Vha01hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0ZXhwb3J0ZWQgPSBmdW5jdGlvbiBpc1dlYWtNYXAoeCkge1xuXHRcdC8vIGBXZWFrTWFwYCBpcyBub3QgcHJlc2VudCBpbiB0aGlzIGVudmlyb25tZW50LlxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxudmFyICRtYXBIYXMgPSAkV2Vha01hcCA/ICRXZWFrTWFwLnByb3RvdHlwZS5oYXMgOiBudWxsO1xudmFyICRzZXRIYXMgPSAkV2Vha1NldCA/ICRXZWFrU2V0LnByb3RvdHlwZS5oYXMgOiBudWxsO1xuaWYgKCFleHBvcnRlZCAmJiAhJG1hcEhhcykge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcblx0ZXhwb3J0ZWQgPSBmdW5jdGlvbiBpc1dlYWtNYXAoeCkge1xuXHRcdC8vIGBXZWFrTWFwYCBkb2VzIG5vdCBoYXZlIGEgYGhhc2AgbWV0aG9kXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydGVkIHx8IGZ1bmN0aW9uIGlzV2Vha01hcCh4KSB7XG5cdGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0dHJ5IHtcblx0XHQkbWFwSGFzLmNhbGwoeCwgJG1hcEhhcyk7XG5cdFx0aWYgKCRzZXRIYXMpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdCRzZXRIYXMuY2FsbCh4LCAkc2V0SGFzKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB4IGluc3RhbmNlb2YgJFdlYWtNYXA7IC8vIGNvcmUtanMgd29ya2Fyb3VuZCwgcHJlLXYzXG5cdH0gY2F0Y2ggKGUpIHt9XG5cdHJldHVybiBmYWxzZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciAkV2Vha01hcCA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIFdlYWtNYXAucHJvdG90eXBlID8gV2Vha01hcCA6IG51bGw7XG52YXIgJFdlYWtTZXQgPSB0eXBlb2YgV2Vha1NldCA9PT0gJ2Z1bmN0aW9uJyAmJiBXZWFrU2V0LnByb3RvdHlwZSA/IFdlYWtTZXQgOiBudWxsO1xuXG52YXIgZXhwb3J0ZWQ7XG5cbmlmICghJFdlYWtNYXApIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdGV4cG9ydGVkID0gZnVuY3Rpb24gaXNXZWFrU2V0KHgpIHtcblx0XHQvLyBgV2Vha1NldGAgaXMgbm90IHByZXNlbnQgaW4gdGhpcyBlbnZpcm9ubWVudC5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG59XG5cbnZhciAkbWFwSGFzID0gJFdlYWtNYXAgPyAkV2Vha01hcC5wcm90b3R5cGUuaGFzIDogbnVsbDtcbnZhciAkc2V0SGFzID0gJFdlYWtTZXQgPyAkV2Vha1NldC5wcm90b3R5cGUuaGFzIDogbnVsbDtcbmlmICghZXhwb3J0ZWQgJiYgISRzZXRIYXMpIHtcblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNXZWFrU2V0KHgpIHtcblx0XHQvLyBgV2Vha1NldGAgZG9lcyBub3QgaGF2ZSBhIGBoYXNgIG1ldGhvZFxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRlZCB8fCBmdW5jdGlvbiBpc1dlYWtTZXQoeCkge1xuXHRpZiAoIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHRyeSB7XG5cdFx0JHNldEhhcy5jYWxsKHgsICRzZXRIYXMpO1xuXHRcdGlmICgkbWFwSGFzKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQkbWFwSGFzLmNhbGwoeCwgJG1hcEhhcyk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4geCBpbnN0YW5jZW9mICRXZWFrU2V0OyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12M1xuXHR9IGNhdGNoIChlKSB7fVxuXHRyZXR1cm4gZmFsc2U7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNNYXAgPSByZXF1aXJlKCdpcy1tYXAnKTtcbnZhciBpc1NldCA9IHJlcXVpcmUoJ2lzLXNldCcpO1xudmFyIGlzV2Vha01hcCA9IHJlcXVpcmUoJ2lzLXdlYWttYXAnKTtcbnZhciBpc1dlYWtTZXQgPSByZXF1aXJlKCdpcy13ZWFrc2V0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hpY2hDb2xsZWN0aW9uKHZhbHVlKSB7XG5cdGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0aWYgKGlzTWFwKHZhbHVlKSkge1xuXHRcdFx0cmV0dXJuICdNYXAnO1xuXHRcdH1cblx0XHRpZiAoaXNTZXQodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gJ1NldCc7XG5cdFx0fVxuXHRcdGlmIChpc1dlYWtNYXAodmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gJ1dlYWtNYXAnO1xuXHRcdH1cblx0XHRpZiAoaXNXZWFrU2V0KHZhbHVlKSkge1xuXHRcdFx0cmV0dXJuICdXZWFrU2V0Jztcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnLi4vR2V0SW50cmluc2ljJyk7XG5cbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJy4vY2FsbEJpbmQnKTtcblxudmFyICRpbmRleE9mID0gY2FsbEJpbmQoR2V0SW50cmluc2ljKCdTdHJpbmcucHJvdG90eXBlLmluZGV4T2YnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJvdW5kSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljID0gR2V0SW50cmluc2ljKG5hbWUsICEhYWxsb3dNaXNzaW5nKTtcblx0aWYgKHR5cGVvZiBpbnRyaW5zaWMgPT09ICdmdW5jdGlvbicgJiYgJGluZGV4T2YobmFtZSwgJy5wcm90b3R5cGUuJykpIHtcblx0XHRyZXR1cm4gY2FsbEJpbmQoaW50cmluc2ljKTtcblx0fVxuXHRyZXR1cm4gaW50cmluc2ljO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IGdsb2JhbC1yZXF1aXJlOiAwICovXG4vLyB0aGUgY29kZSBpcyBzdHJ1Y3R1cmVkIHRoaXMgd2F5IHNvIHRoYXQgYnVuZGxlcnMgY2FuXG4vLyBhbGlhcyBvdXQgYGhhcy1zeW1ib2xzYCB0byBgKCkgPT4gdHJ1ZWAgb3IgYCgpID0+IGZhbHNlYCBpZiB5b3VyIHRhcmdldFxuLy8gZW52aXJvbm1lbnRzJyBTeW1ib2wgY2FwYWJpbGl0aWVzIGFyZSBrbm93biwgYW5kIHRoZW4gdXNlXG4vLyBkZWFkIGNvZGUgZWxpbWluYXRpb24gb24gdGhlIHJlc3Qgb2YgdGhpcyBtb2R1bGUuXG4vL1xuLy8gU2ltaWxhcmx5LCBgaXNhcnJheWAgY2FuIGJlIGFsaWFzZWQgdG8gYEFycmF5LmlzQXJyYXlgIGlmXG4vLyBhdmFpbGFibGUgaW4gYWxsIHRhcmdldCBlbnZpcm9ubWVudHMuXG5cbnZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJ2lzLWFyZ3VtZW50cycpO1xuXG5pZiAocmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpIHx8IHJlcXVpcmUoJ2hhcy1zeW1ib2xzL3NoYW1zJykoKSkge1xuXHR2YXIgJGl0ZXJhdG9yID0gU3ltYm9sLml0ZXJhdG9yO1xuXHQvLyBTeW1ib2wgaXMgYXZhaWxhYmxlIG5hdGl2ZWx5IG9yIHNoYW1tZWRcblx0Ly8gbmF0aXZlbHk6XG5cdC8vICAtIENocm9tZSA+PSAzOFxuXHQvLyAgLSBFZGdlIDEyLTE0PywgRWRnZSA+PSAxNSBmb3Igc3VyZVxuXHQvLyAgLSBGRiA+PSAzNlxuXHQvLyAgLSBTYWZhcmkgPj0gOVxuXHQvLyAgLSBub2RlID49IDAuMTJcblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRJdGVyYXRvcihpdGVyYWJsZSkge1xuXHRcdC8vIGFsdGVybmF0aXZlbHksIGBpdGVyYWJsZVskaXRlcmF0b3JdPy4oKWBcblx0XHRpZiAoaXRlcmFibGUgIT0gbnVsbCAmJiB0eXBlb2YgaXRlcmFibGVbJGl0ZXJhdG9yXSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiBpdGVyYWJsZVskaXRlcmF0b3JdKCk7XG5cdFx0fVxuXHRcdGlmIChpc0FyZ3VtZW50cyhpdGVyYWJsZSkpIHtcblx0XHRcdC8vIGFyZ3VtZW50cyBvYmplY3RzIGxhY2sgU3ltYm9sLml0ZXJhdG9yXG5cdFx0XHQvLyAtIG5vZGUgMC4xMlxuXHRcdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZVskaXRlcmF0b3JdLmNhbGwoaXRlcmFibGUpO1xuXHRcdH1cblx0fTtcbn0gZWxzZSB7XG5cdC8vIFN5bWJvbCBpcyBub3QgYXZhaWxhYmxlLCBuYXRpdmUgb3Igc2hhbW1lZFxuXHR2YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcblx0dmFyIGlzU3RyaW5nID0gcmVxdWlyZSgnaXMtc3RyaW5nJyk7XG5cdHZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdlcy1hYnN0cmFjdC9HZXRJbnRyaW5zaWMnKTtcblx0dmFyICRNYXAgPSBHZXRJbnRyaW5zaWMoJyVNYXAlJywgdHJ1ZSk7XG5cdHZhciAkU2V0ID0gR2V0SW50cmluc2ljKCclU2V0JScsIHRydWUpO1xuXHR2YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnZXMtYWJzdHJhY3QvaGVscGVycy9jYWxsQm91bmQnKTtcblx0dmFyICRhcnJheVB1c2ggPSBjYWxsQm91bmQoJ0FycmF5LnByb3RvdHlwZS5wdXNoJyk7XG5cdHZhciAkY2hhckNvZGVBdCA9IGNhbGxCb3VuZCgnU3RyaW5nLnByb3RvdHlwZS5jaGFyQ29kZUF0Jyk7XG5cdHZhciAkc3RyaW5nU2xpY2UgPSBjYWxsQm91bmQoJ1N0cmluZy5wcm90b3R5cGUuc2xpY2UnKTtcblxuXHR2YXIgYWR2YW5jZVN0cmluZ0luZGV4ID0gZnVuY3Rpb24gYWR2YW5jZVN0cmluZ0luZGV4KFMsIGluZGV4KSB7XG5cdFx0dmFyIGxlbmd0aCA9IFMubGVuZ3RoO1xuXHRcdGlmICgoaW5kZXggKyAxKSA+PSBsZW5ndGgpIHtcblx0XHRcdHJldHVybiBpbmRleCArIDE7XG5cdFx0fVxuXG5cdFx0dmFyIGZpcnN0ID0gJGNoYXJDb2RlQXQoUywgaW5kZXgpO1xuXHRcdGlmIChmaXJzdCA8IDB4RDgwMCB8fCBmaXJzdCA+IDB4REJGRikge1xuXHRcdFx0cmV0dXJuIGluZGV4ICsgMTtcblx0XHR9XG5cblx0XHR2YXIgc2Vjb25kID0gJGNoYXJDb2RlQXQoUywgaW5kZXggKyAxKTtcblx0XHRpZiAoc2Vjb25kIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRikge1xuXHRcdFx0cmV0dXJuIGluZGV4ICsgMTtcblx0XHR9XG5cblx0XHRyZXR1cm4gaW5kZXggKyAyO1xuXHR9O1xuXG5cdHZhciBnZXRBcnJheUl0ZXJhdG9yID0gZnVuY3Rpb24gZ2V0QXJyYXlJdGVyYXRvcihhcnJheWxpa2UpIHtcblx0XHR2YXIgaSA9IDA7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG5leHQ6IGZ1bmN0aW9uIG5leHQoKSB7XG5cdFx0XHRcdHZhciBkb25lID0gaSA+PSBhcnJheWxpa2UubGVuZ3RoO1xuXHRcdFx0XHR2YXIgdmFsdWU7XG5cdFx0XHRcdGlmICghZG9uZSkge1xuXHRcdFx0XHRcdHZhbHVlID0gYXJyYXlsaWtlW2ldO1xuXHRcdFx0XHRcdGkgKz0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdGRvbmU6IGRvbmUsXG5cdFx0XHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblxuXHR2YXIgZ2V0Tm9uQ29sbGVjdGlvbkl0ZXJhdG9yID0gZnVuY3Rpb24gZ2V0Tm9uQ29sbGVjdGlvbkl0ZXJhdG9yKGl0ZXJhYmxlKSB7XG5cdFx0aWYgKGlzQXJyYXkoaXRlcmFibGUpIHx8IGlzQXJndW1lbnRzKGl0ZXJhYmxlKSkge1xuXHRcdFx0cmV0dXJuIGdldEFycmF5SXRlcmF0b3IoaXRlcmFibGUpO1xuXHRcdH1cblx0XHRpZiAoaXNTdHJpbmcoaXRlcmFibGUpKSB7XG5cdFx0XHR2YXIgaSA9IDA7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRuZXh0OiBmdW5jdGlvbiBuZXh0KCkge1xuXHRcdFx0XHRcdHZhciBuZXh0SW5kZXggPSBhZHZhbmNlU3RyaW5nSW5kZXgoaXRlcmFibGUsIGkpO1xuXHRcdFx0XHRcdHZhciB2YWx1ZSA9ICRzdHJpbmdTbGljZShpdGVyYWJsZSwgaSwgbmV4dEluZGV4KTtcblx0XHRcdFx0XHRpID0gbmV4dEluZGV4O1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRkb25lOiBuZXh0SW5kZXggPiBpdGVyYWJsZS5sZW5ndGgsXG5cdFx0XHRcdFx0XHR2YWx1ZTogdmFsdWVcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblx0fTtcblxuXHRpZiAoISRNYXAgJiYgISRTZXQpIHtcblx0XHQvLyB0aGUgb25seSBsYW5ndWFnZSBpdGVyYWJsZXMgYXJlIEFycmF5LCBTdHJpbmcsIGFyZ3VtZW50c1xuXHRcdC8vIC0gU2FmYXJpIDw9IDYuMFxuXHRcdC8vIC0gQ2hyb21lIDwgMzhcblx0XHQvLyAtIG5vZGUgPCAwLjEyXG5cdFx0Ly8gLSBGRiA8IDEzXG5cdFx0Ly8gLSBJRSA8IDExXG5cdFx0Ly8gLSBFZGdlIDwgMTFcblxuXHRcdG1vZHVsZS5leHBvcnRzID0gZ2V0Tm9uQ29sbGVjdGlvbkl0ZXJhdG9yO1xuXHR9IGVsc2Uge1xuXHRcdC8vIGVpdGhlciBNYXAgb3IgU2V0IGFyZSBhdmFpbGFibGUsIGJ1dCBTeW1ib2wgaXMgbm90XG5cdFx0Ly8gLSBlczYtc2hpbSBvbiBhbiBFUzUgYnJvd3NlclxuXHRcdC8vIC0gU2FmYXJpIDYuMiAobWF5YmUgNi4xPylcblx0XHQvLyAtIEZGIHZbMTMsIDM2KVxuXHRcdC8vIC0gSUUgMTFcblx0XHQvLyAtIEVkZ2UgMTFcblx0XHQvLyAtIFNhZmFyaSB2WzYsIDkpXG5cblx0XHR2YXIgaXNNYXAgPSByZXF1aXJlKCdpcy1tYXAnKTtcblx0XHR2YXIgaXNTZXQgPSByZXF1aXJlKCdpcy1zZXQnKTtcblxuXHRcdC8vIEZpcmVmb3ggPj0gMjcsIElFIDExLCBTYWZhcmkgNi4yIC0gOSwgRWRnZSAxMSwgZXM2LXNoaW0gaW4gb2xkZXIgZW52cywgYWxsIGhhdmUgZm9yRWFjaFxuXHRcdHZhciAkbWFwRm9yRWFjaCA9IGNhbGxCb3VuZCgnTWFwLnByb3RvdHlwZS5mb3JFYWNoJywgdHJ1ZSk7XG5cdFx0dmFyICRzZXRGb3JFYWNoID0gY2FsbEJvdW5kKCdTZXQucHJvdG90eXBlLmZvckVhY2gnLCB0cnVlKTtcblx0XHRpZiAodHlwZW9mIHByb2Nlc3MgPT09ICd1bmRlZmluZWQnIHx8ICFwcm9jZXNzLnZlcnNpb25zIHx8ICFwcm9jZXNzLnZlcnNpb25zLm5vZGUpIHsgLy8gXCJpZiBpcyBub3Qgbm9kZVwiXG5cblx0XHRcdC8vIEZpcmVmb3ggMTcgLSAyNiBoYXMgYC5pdGVyYXRvcigpYCwgd2hvc2UgaXRlcmF0b3IgYC5uZXh0KClgIGVpdGhlclxuXHRcdFx0Ly8gcmV0dXJucyBhIHZhbHVlLCBvciB0aHJvd3MgYSBTdG9wSXRlcmF0aW9uIG9iamVjdC4gVGhlc2UgYnJvd3NlcnNcblx0XHRcdC8vIGRvIG5vdCBoYXZlIGFueSBvdGhlciBtZWNoYW5pc20gZm9yIGl0ZXJhdGlvbi5cblx0XHRcdHZhciAkbWFwSXRlcmF0b3IgPSBjYWxsQm91bmQoJ01hcC5wcm90b3R5cGUuaXRlcmF0b3InLCB0cnVlKTtcblx0XHRcdHZhciAkc2V0SXRlcmF0b3IgPSBjYWxsQm91bmQoJ1NldC5wcm90b3R5cGUuaXRlcmF0b3InLCB0cnVlKTtcblx0XHRcdHZhciBnZXRTdG9wSXRlcmF0aW9uSXRlcmF0b3IgPSBmdW5jdGlvbiAoaXRlcmF0b3IpIHtcblx0XHRcdFx0dmFyIGRvbmUgPSBmYWxzZTtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRuZXh0OiBmdW5jdGlvbiBuZXh0KCkge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdFx0XHRkb25lOiBkb25lLFxuXHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBkb25lID8gdW5kZWZpbmVkIDogaXRlcmF0b3IubmV4dCgpXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0XHRcdGRvbmUgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRcdGRvbmU6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH07XG5cdFx0fVxuXHRcdC8vIEZpcmVmb3ggMjctMzUsIGFuZCBzb21lIG9sZGVyIGVzNi1zaGltIHZlcnNpb25zLCB1c2UgYSBzdHJpbmcgXCJAQGl0ZXJhdG9yXCIgcHJvcGVydHlcblx0XHQvLyB0aGlzIHJldHVybnMgYSBwcm9wZXIgaXRlcmF0b3Igb2JqZWN0LCBzbyB3ZSBzaG91bGQgdXNlIGl0IGluc3RlYWQgb2YgZm9yRWFjaC5cblx0XHQvLyBuZXdlciBlczYtc2hpbSB2ZXJzaW9ucyB1c2UgYSBzdHJpbmcgXCJfZXM2LXNoaW0gaXRlcmF0b3JfXCIgcHJvcGVydHkuXG5cdFx0dmFyICRtYXBBdEF0SXRlcmF0b3IgPSBjYWxsQm91bmQoJ01hcC5wcm90b3R5cGUuQEBpdGVyYXRvcicsIHRydWUpIHx8IGNhbGxCb3VuZCgnTWFwLnByb3RvdHlwZS5fZXM2LXNoaW0gaXRlcmF0b3JfJywgdHJ1ZSk7XG5cdFx0dmFyICRzZXRBdEF0SXRlcmF0b3IgPSBjYWxsQm91bmQoJ1NldC5wcm90b3R5cGUuQEBpdGVyYXRvcicsIHRydWUpIHx8IGNhbGxCb3VuZCgnU2V0LnByb3RvdHlwZS5fZXM2LXNoaW0gaXRlcmF0b3JfJywgdHJ1ZSk7XG5cblx0XHR2YXIgZ2V0Q29sbGVjdGlvbkl0ZXJhdG9yID0gZnVuY3Rpb24gZ2V0Q29sbGVjdGlvbkl0ZXJhdG9yKGl0ZXJhYmxlKSB7XG5cdFx0XHRpZiAoaXNNYXAoaXRlcmFibGUpKSB7XG5cdFx0XHRcdGlmICgkbWFwSXRlcmF0b3IpIHtcblx0XHRcdFx0XHRyZXR1cm4gZ2V0U3RvcEl0ZXJhdGlvbkl0ZXJhdG9yKCRtYXBJdGVyYXRvcihpdGVyYWJsZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICgkbWFwQXRBdEl0ZXJhdG9yKSB7XG5cdFx0XHRcdFx0cmV0dXJuICRtYXBBdEF0SXRlcmF0b3IoaXRlcmFibGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICgkbWFwRm9yRWFjaCkge1xuXHRcdFx0XHRcdHZhciBlbnRyaWVzID0gW107XG5cdFx0XHRcdFx0JG1hcEZvckVhY2goaXRlcmFibGUsIGZ1bmN0aW9uICh2LCBrKSB7XG5cdFx0XHRcdFx0XHQkYXJyYXlQdXNoKGVudHJpZXMsIFtrLCB2XSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuIGdldEFycmF5SXRlcmF0b3IoZW50cmllcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChpc1NldChpdGVyYWJsZSkpIHtcblx0XHRcdFx0aWYgKCRzZXRJdGVyYXRvcikge1xuXHRcdFx0XHRcdHJldHVybiBnZXRTdG9wSXRlcmF0aW9uSXRlcmF0b3IoJHNldEl0ZXJhdG9yKGl0ZXJhYmxlKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCRzZXRBdEF0SXRlcmF0b3IpIHtcblx0XHRcdFx0XHRyZXR1cm4gJHNldEF0QXRJdGVyYXRvcihpdGVyYWJsZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCRzZXRGb3JFYWNoKSB7XG5cdFx0XHRcdFx0dmFyIHZhbHVlcyA9IFtdO1xuXHRcdFx0XHRcdCRzZXRGb3JFYWNoKGl0ZXJhYmxlLCBmdW5jdGlvbiAodikge1xuXHRcdFx0XHRcdFx0JGFycmF5UHVzaCh2YWx1ZXMsIHYpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybiBnZXRBcnJheUl0ZXJhdG9yKHZhbHVlcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRJdGVyYXRvcihpdGVyYWJsZSkge1xuXHRcdFx0cmV0dXJuIGdldENvbGxlY3Rpb25JdGVyYXRvcihpdGVyYWJsZSkgfHwgZ2V0Tm9uQ29sbGVjdGlvbkl0ZXJhdG9yKGl0ZXJhYmxlKTtcblx0XHR9O1xuXHR9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbHNcblx0QWdncmVnYXRlRXJyb3IsXG5cdEF0b21pY3MsXG5cdEZpbmFsaXphdGlvblJlZ2lzdHJ5LFxuXHRTaGFyZWRBcnJheUJ1ZmZlcixcblx0V2Vha1JlZixcbiovXG5cbnZhciB1bmRlZmluZWQ7XG5cbnZhciAkU3ludGF4RXJyb3IgPSBTeW50YXhFcnJvcjtcbnZhciAkRnVuY3Rpb24gPSBGdW5jdGlvbjtcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbnZhciBnZXRFdmFsbGVkQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZXhwcmVzc2lvblN5bnRheCkge1xuXHR0cnkge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuXHRcdHJldHVybiBGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7IHJldHVybiAoJyArIGV4cHJlc3Npb25TeW50YXggKyAnKS5jb25zdHJ1Y3RvcjsnKSgpO1xuXHR9IGNhdGNoIChlKSB7fVxufTtcblxudmFyICRnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbmlmICgkZ09QRCkge1xuXHR0cnkge1xuXHRcdCRnT1BEKHt9LCAnJyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQkZ09QRCA9IG51bGw7IC8vIHRoaXMgaXMgSUUgOCwgd2hpY2ggaGFzIGEgYnJva2VuIGdPUERcblx0fVxufVxuXG52YXIgdGhyb3dUeXBlRXJyb3IgPSBmdW5jdGlvbiAoKSB7IHRocm93IG5ldyAkVHlwZUVycm9yKCk7IH07XG52YXIgVGhyb3dUeXBlRXJyb3IgPSAkZ09QRFxuXHQ/IChmdW5jdGlvbiAoKSB7XG5cdFx0dHJ5IHtcblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnMsIG5vLWNhbGxlciwgbm8tcmVzdHJpY3RlZC1wcm9wZXJ0aWVzXG5cdFx0XHRhcmd1bWVudHMuY2FsbGVlOyAvLyBJRSA4IGRvZXMgbm90IHRocm93IGhlcmVcblx0XHRcdHJldHVybiB0aHJvd1R5cGVFcnJvcjtcblx0XHR9IGNhdGNoIChjYWxsZWVUaHJvd3MpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIElFIDggdGhyb3dzIG9uIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYXJndW1lbnRzLCAnJylcblx0XHRcdFx0cmV0dXJuICRnT1BEKGFyZ3VtZW50cywgJ2NhbGxlZScpLmdldDtcblx0XHRcdH0gY2F0Y2ggKGdPUER0aHJvd3MpIHtcblx0XHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdFx0fVxuXHRcdH1cblx0fSgpKVxuXHQ6IHRocm93VHlwZUVycm9yO1xuXG52YXIgaGFzU3ltYm9scyA9IHJlcXVpcmUoJ2hhcy1zeW1ib2xzJykoKTtcblxudmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Ll9fcHJvdG9fXzsgfTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b1xuXG52YXIgYXN5bmNHZW5GdW5jdGlvbiA9IGdldEV2YWxsZWRDb25zdHJ1Y3RvcignYXN5bmMgZnVuY3Rpb24qICgpIHt9Jyk7XG52YXIgYXN5bmNHZW5GdW5jdGlvblByb3RvdHlwZSA9IGFzeW5jR2VuRnVuY3Rpb24gPyBhc3luY0dlbkZ1bmN0aW9uLnByb3RvdHlwZSA6IHVuZGVmaW5lZDtcbnZhciBhc3luY0dlblByb3RvdHlwZSA9IGFzeW5jR2VuRnVuY3Rpb25Qcm90b3R5cGUgPyBhc3luY0dlbkZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA6IHVuZGVmaW5lZDtcblxudmFyIFR5cGVkQXJyYXkgPSB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBnZXRQcm90byhVaW50OEFycmF5KTtcblxudmFyIElOVFJJTlNJQ1MgPSB7XG5cdCclQWdncmVnYXRlRXJyb3IlJzogdHlwZW9mIEFnZ3JlZ2F0ZUVycm9yID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFnZ3JlZ2F0ZUVycm9yLFxuXHQnJUFycmF5JSc6IEFycmF5LFxuXHQnJUFycmF5QnVmZmVyJSc6IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBcnJheUJ1ZmZlcixcblx0JyVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnJvbVN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGdW5jdGlvbiUnOiBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uICgpIHt9JyksXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogYXN5bmNHZW5GdW5jdGlvblByb3RvdHlwZSxcblx0JyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJSc6IGFzeW5jR2VuRnVuY3Rpb24sXG5cdCclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiBhc3luY0dlblByb3RvdHlwZSA/IGdldFByb3RvKGFzeW5jR2VuUHJvdG90eXBlKSA6IHVuZGVmaW5lZCxcblx0JyVBdG9taWNzJSc6IHR5cGVvZiBBdG9taWNzID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEF0b21pY3MsXG5cdCclQmlnSW50JSc6IHR5cGVvZiBCaWdJbnQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQmlnSW50LFxuXHQnJUJvb2xlYW4lJzogQm9vbGVhbixcblx0JyVEYXRhVmlldyUnOiB0eXBlb2YgRGF0YVZpZXcgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRGF0YVZpZXcsXG5cdCclRGF0ZSUnOiBEYXRlLFxuXHQnJWRlY29kZVVSSSUnOiBkZWNvZGVVUkksXG5cdCclZGVjb2RlVVJJQ29tcG9uZW50JSc6IGRlY29kZVVSSUNvbXBvbmVudCxcblx0JyVlbmNvZGVVUkklJzogZW5jb2RlVVJJLFxuXHQnJWVuY29kZVVSSUNvbXBvbmVudCUnOiBlbmNvZGVVUklDb21wb25lbnQsXG5cdCclRXJyb3IlJzogRXJyb3IsXG5cdCclZXZhbCUnOiBldmFsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcblx0JyVFdmFsRXJyb3IlJzogRXZhbEVycm9yLFxuXHQnJUZsb2F0MzJBcnJheSUnOiB0eXBlb2YgRmxvYXQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZsb2F0MzJBcnJheSxcblx0JyVGbG9hdDY0QXJyYXklJzogdHlwZW9mIEZsb2F0NjRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDY0QXJyYXksXG5cdCclRmluYWxpemF0aW9uUmVnaXN0cnklJzogdHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEZpbmFsaXphdGlvblJlZ2lzdHJ5LFxuXHQnJUZ1bmN0aW9uJSc6ICRGdW5jdGlvbixcblx0JyVHZW5lcmF0b3JGdW5jdGlvbiUnOiBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2Z1bmN0aW9uKiAoKSB7fScpLFxuXHQnJUludDhBcnJheSUnOiB0eXBlb2YgSW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDhBcnJheSxcblx0JyVJbnQxNkFycmF5JSc6IHR5cGVvZiBJbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDE2QXJyYXksXG5cdCclSW50MzJBcnJheSUnOiB0eXBlb2YgSW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQzMkFycmF5LFxuXHQnJWlzRmluaXRlJSc6IGlzRmluaXRlLFxuXHQnJWlzTmFOJSc6IGlzTmFOLFxuXHQnJUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSA6IHVuZGVmaW5lZCxcblx0JyVKU09OJSc6IHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyA/IEpTT04gOiB1bmRlZmluZWQsXG5cdCclTWFwJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTWFwLFxuXHQnJU1hcEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IE1hcCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclTWF0aCUnOiBNYXRoLFxuXHQnJU51bWJlciUnOiBOdW1iZXIsXG5cdCclT2JqZWN0JSc6IE9iamVjdCxcblx0JyVwYXJzZUZsb2F0JSc6IHBhcnNlRmxvYXQsXG5cdCclcGFyc2VJbnQlJzogcGFyc2VJbnQsXG5cdCclUHJvbWlzZSUnOiB0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm9taXNlLFxuXHQnJVByb3h5JSc6IHR5cGVvZiBQcm94eSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm94eSxcblx0JyVSYW5nZUVycm9yJSc6IFJhbmdlRXJyb3IsXG5cdCclUmVmZXJlbmNlRXJyb3IlJzogUmVmZXJlbmNlRXJyb3IsXG5cdCclUmVmbGVjdCUnOiB0eXBlb2YgUmVmbGVjdCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBSZWZsZWN0LFxuXHQnJVJlZ0V4cCUnOiBSZWdFeHAsXG5cdCclU2V0JSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2V0LFxuXHQnJVNldEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IFNldCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclU2hhcmVkQXJyYXlCdWZmZXIlJzogdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNoYXJlZEFycmF5QnVmZmVyLFxuXHQnJVN0cmluZyUnOiBTdHJpbmcsXG5cdCclU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKCcnW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclU3ltYm9sJSc6IGhhc1N5bWJvbHMgPyBTeW1ib2wgOiB1bmRlZmluZWQsXG5cdCclU3ludGF4RXJyb3IlJzogJFN5bnRheEVycm9yLFxuXHQnJVRocm93VHlwZUVycm9yJSc6IFRocm93VHlwZUVycm9yLFxuXHQnJVR5cGVkQXJyYXklJzogVHlwZWRBcnJheSxcblx0JyVUeXBlRXJyb3IlJzogJFR5cGVFcnJvcixcblx0JyVVaW50OEFycmF5JSc6IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4QXJyYXksXG5cdCclVWludDhDbGFtcGVkQXJyYXklJzogdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4Q2xhbXBlZEFycmF5LFxuXHQnJVVpbnQxNkFycmF5JSc6IHR5cGVvZiBVaW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MTZBcnJheSxcblx0JyVVaW50MzJBcnJheSUnOiB0eXBlb2YgVWludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDMyQXJyYXksXG5cdCclVVJJRXJyb3IlJzogVVJJRXJyb3IsXG5cdCclV2Vha01hcCUnOiB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrTWFwLFxuXHQnJVdlYWtSZWYlJzogdHlwZW9mIFdlYWtSZWYgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1JlZixcblx0JyVXZWFrU2V0JSc6IHR5cGVvZiBXZWFrU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtTZXRcbn07XG5cbnZhciBMRUdBQ1lfQUxJQVNFUyA9IHtcblx0JyVBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ0FycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG90eXBlJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b19lbnRyaWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2VudHJpZXMnXSxcblx0JyVBcnJheVByb3RvX2ZvckVhY2glJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZm9yRWFjaCddLFxuXHQnJUFycmF5UHJvdG9fa2V5cyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdrZXlzJ10sXG5cdCclQXJyYXlQcm90b192YWx1ZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAndmFsdWVzJ10sXG5cdCclQXN5bmNGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0FzeW5jRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclQm9vbGVhblByb3RvdHlwZSUnOiBbJ0Jvb2xlYW4nLCAncHJvdG90eXBlJ10sXG5cdCclRGF0YVZpZXdQcm90b3R5cGUlJzogWydEYXRhVmlldycsICdwcm90b3R5cGUnXSxcblx0JyVEYXRlUHJvdG90eXBlJSc6IFsnRGF0ZScsICdwcm90b3R5cGUnXSxcblx0JyVFcnJvclByb3RvdHlwZSUnOiBbJ0Vycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUV2YWxFcnJvclByb3RvdHlwZSUnOiBbJ0V2YWxFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDMyQXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQ2NEFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQ2NEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZ1bmN0aW9uUHJvdG90eXBlJSc6IFsnRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDhBcnJheVByb3RvdHlwZSUnOiBbJ0ludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnSW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnSW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVKU09OUGFyc2UlJzogWydKU09OJywgJ3BhcnNlJ10sXG5cdCclSlNPTlN0cmluZ2lmeSUnOiBbJ0pTT04nLCAnc3RyaW5naWZ5J10sXG5cdCclTWFwUHJvdG90eXBlJSc6IFsnTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJU51bWJlclByb3RvdHlwZSUnOiBbJ051bWJlcicsICdwcm90b3R5cGUnXSxcblx0JyVPYmplY3RQcm90b3R5cGUlJzogWydPYmplY3QnLCAncHJvdG90eXBlJ10sXG5cdCclT2JqUHJvdG9fdG9TdHJpbmclJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3RvU3RyaW5nJ10sXG5cdCclT2JqUHJvdG9fdmFsdWVPZiUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndmFsdWVPZiddLFxuXHQnJVByb21pc2VQcm90b3R5cGUlJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZSddLFxuXHQnJVByb21pc2VQcm90b190aGVuJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnLCAndGhlbiddLFxuXHQnJVByb21pc2VfYWxsJSc6IFsnUHJvbWlzZScsICdhbGwnXSxcblx0JyVQcm9taXNlX3JlamVjdCUnOiBbJ1Byb21pc2UnLCAncmVqZWN0J10sXG5cdCclUHJvbWlzZV9yZXNvbHZlJSc6IFsnUHJvbWlzZScsICdyZXNvbHZlJ10sXG5cdCclUmFuZ2VFcnJvclByb3RvdHlwZSUnOiBbJ1JhbmdlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVmZXJlbmNlRXJyb3JQcm90b3R5cGUlJzogWydSZWZlcmVuY2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWdFeHBQcm90b3R5cGUlJzogWydSZWdFeHAnLCAncHJvdG90eXBlJ10sXG5cdCclU2V0UHJvdG90eXBlJSc6IFsnU2V0JywgJ3Byb3RvdHlwZSddLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnU2hhcmVkQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclU3RyaW5nUHJvdG90eXBlJSc6IFsnU3RyaW5nJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bWJvbFByb3RvdHlwZSUnOiBbJ1N5bWJvbCcsICdwcm90b3R5cGUnXSxcblx0JyVTeW50YXhFcnJvclByb3RvdHlwZSUnOiBbJ1N5bnRheEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVkQXJyYXlQcm90b3R5cGUlJzogWydUeXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVFcnJvclByb3RvdHlwZSUnOiBbJ1R5cGVFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OENsYW1wZWRBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4Q2xhbXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnVWludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDMyQXJyYXlQcm90b3R5cGUlJzogWydVaW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVUklFcnJvclByb3RvdHlwZSUnOiBbJ1VSSUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtNYXBQcm90b3R5cGUlJzogWydXZWFrTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtTZXRQcm90b3R5cGUlJzogWydXZWFrU2V0JywgJ3Byb3RvdHlwZSddXG59O1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCdoYXMnKTtcbnZhciAkY29uY2F0ID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIEFycmF5LnByb3RvdHlwZS5jb25jYXQpO1xudmFyICRzcGxpY2VBcHBseSA9IGJpbmQuY2FsbChGdW5jdGlvbi5hcHBseSwgQXJyYXkucHJvdG90eXBlLnNwbGljZSk7XG52YXIgJHJlcGxhY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcblxuLyogYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvNC4xNy4xNS9kaXN0L2xvZGFzaC5qcyNMNjczNS1MNjc0NCAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14lLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCUkKSkvZztcbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZzsgLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgc3RyaW5nVG9QYXRoID0gZnVuY3Rpb24gc3RyaW5nVG9QYXRoKHN0cmluZykge1xuXHR2YXIgcmVzdWx0ID0gW107XG5cdCRyZXBsYWNlKHN0cmluZywgcmVQcm9wTmFtZSwgZnVuY3Rpb24gKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdWJTdHJpbmcpIHtcblx0XHRyZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBxdW90ZSA/ICRyZXBsYWNlKHN1YlN0cmluZywgcmVFc2NhcGVDaGFyLCAnJDEnKSA6IG51bWJlciB8fCBtYXRjaDtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuLyogZW5kIGFkYXB0YXRpb24gKi9cblxudmFyIGdldEJhc2VJbnRyaW5zaWMgPSBmdW5jdGlvbiBnZXRCYXNlSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljTmFtZSA9IG5hbWU7XG5cdHZhciBhbGlhcztcblx0aWYgKGhhc093bihMRUdBQ1lfQUxJQVNFUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHRhbGlhcyA9IExFR0FDWV9BTElBU0VTW2ludHJpbnNpY05hbWVdO1xuXHRcdGludHJpbnNpY05hbWUgPSAnJScgKyBhbGlhc1swXSArICclJztcblx0fVxuXG5cdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHR2YXIgdmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY05hbWVdO1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICYmICFhbGxvd01pc3NpbmcpIHtcblx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBmaWxlIGFuIGlzc3VlIScpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRhbGlhczogYWxpYXMsXG5cdFx0XHRuYW1lOiBpbnRyaW5zaWNOYW1lLFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fTtcblx0fVxuXG5cdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZG9lcyBub3QgZXhpc3QhJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEdldEludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0aWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCBuYW1lLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdpbnRyaW5zaWMgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuXHR9XG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSAmJiB0eXBlb2YgYWxsb3dNaXNzaW5nICE9PSAnYm9vbGVhbicpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignXCJhbGxvd01pc3NpbmdcIiBhcmd1bWVudCBtdXN0IGJlIGEgYm9vbGVhbicpO1xuXHR9XG5cblx0dmFyIHBhcnRzID0gc3RyaW5nVG9QYXRoKG5hbWUpO1xuXHR2YXIgaW50cmluc2ljQmFzZU5hbWUgPSBwYXJ0cy5sZW5ndGggPiAwID8gcGFydHNbMF0gOiAnJztcblxuXHR2YXIgaW50cmluc2ljID0gZ2V0QmFzZUludHJpbnNpYygnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJywgYWxsb3dNaXNzaW5nKTtcblx0dmFyIGludHJpbnNpY1JlYWxOYW1lID0gaW50cmluc2ljLm5hbWU7XG5cdHZhciB2YWx1ZSA9IGludHJpbnNpYy52YWx1ZTtcblx0dmFyIHNraXBGdXJ0aGVyQ2FjaGluZyA9IGZhbHNlO1xuXG5cdHZhciBhbGlhcyA9IGludHJpbnNpYy5hbGlhcztcblx0aWYgKGFsaWFzKSB7XG5cdFx0aW50cmluc2ljQmFzZU5hbWUgPSBhbGlhc1swXTtcblx0XHQkc3BsaWNlQXBwbHkocGFydHMsICRjb25jYXQoWzAsIDFdLCBhbGlhcykpO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDEsIGlzT3duID0gdHJ1ZTsgaSA8IHBhcnRzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0dmFyIHBhcnQgPSBwYXJ0c1tpXTtcblx0XHRpZiAocGFydCA9PT0gJ2NvbnN0cnVjdG9yJyB8fCAhaXNPd24pIHtcblx0XHRcdHNraXBGdXJ0aGVyQ2FjaGluZyA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aW50cmluc2ljQmFzZU5hbWUgKz0gJy4nICsgcGFydDtcblx0XHRpbnRyaW5zaWNSZWFsTmFtZSA9ICclJyArIGludHJpbnNpY0Jhc2VOYW1lICsgJyUnO1xuXG5cdFx0aWYgKGhhc093bihJTlRSSU5TSUNTLCBpbnRyaW5zaWNSZWFsTmFtZSkpIHtcblx0XHRcdHZhbHVlID0gSU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV07XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG5cdFx0XHRpZiAoJGdPUEQgJiYgKGkgKyAxKSA+PSBwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGRlc2MgPSAkZ09QRCh2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdGlzT3duID0gISFkZXNjO1xuXG5cdFx0XHRcdGlmICghYWxsb3dNaXNzaW5nICYmICEocGFydCBpbiB2YWx1ZSkpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYmFzZSBpbnRyaW5zaWMgZm9yICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCB0aGUgcHJvcGVydHkgaXMgbm90IGF2YWlsYWJsZS4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBCeSBjb252ZW50aW9uLCB3aGVuIGEgZGF0YSBwcm9wZXJ0eSBpcyBjb252ZXJ0ZWQgdG8gYW4gYWNjZXNzb3Jcblx0XHRcdFx0Ly8gcHJvcGVydHkgdG8gZW11bGF0ZSBhIGRhdGEgcHJvcGVydHkgdGhhdCBkb2VzIG5vdCBzdWZmZXIgZnJvbVxuXHRcdFx0XHQvLyB0aGUgb3ZlcnJpZGUgbWlzdGFrZSwgdGhhdCBhY2Nlc3NvcidzIGdldHRlciBpcyBtYXJrZWQgd2l0aFxuXHRcdFx0XHQvLyBhbiBgb3JpZ2luYWxWYWx1ZWAgcHJvcGVydHkuIEhlcmUsIHdoZW4gd2UgZGV0ZWN0IHRoaXMsIHdlXG5cdFx0XHRcdC8vIHVwaG9sZCB0aGUgaWxsdXNpb24gYnkgcHJldGVuZGluZyB0byBzZWUgdGhhdCBvcmlnaW5hbCBkYXRhXG5cdFx0XHRcdC8vIHByb3BlcnR5LCBpLmUuLCByZXR1cm5pbmcgdGhlIHZhbHVlIHJhdGhlciB0aGFuIHRoZSBnZXR0ZXJcblx0XHRcdFx0Ly8gaXRzZWxmLlxuXHRcdFx0XHRpZiAoaXNPd24gJiYgJ2dldCcgaW4gZGVzYyAmJiAhKCdvcmlnaW5hbFZhbHVlJyBpbiBkZXNjLmdldCkpIHtcblx0XHRcdFx0XHR2YWx1ZSA9IGRlc2MuZ2V0O1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlzT3duID0gaGFzT3duKHZhbHVlLCBwYXJ0KTtcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGlzT3duICYmICFza2lwRnVydGhlckNhY2hpbmcpIHtcblx0XHRcdFx0SU5UUklOU0lDU1tpbnRyaW5zaWNSZWFsTmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCcuLi9HZXRJbnRyaW5zaWMnKTtcblxudmFyICRhcHBseSA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSUnKTtcbnZhciAkY2FsbCA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsJScpO1xudmFyICRyZWZsZWN0QXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVSZWZsZWN0LmFwcGx5JScsIHRydWUpIHx8IGJpbmQuY2FsbCgkY2FsbCwgJGFwcGx5KTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IEdldEludHJpbnNpYygnJU9iamVjdC5kZWZpbmVQcm9wZXJ0eSUnLCB0cnVlKTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdCRkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IHZhbHVlOiAxIH0pO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZGVmaW5lUHJvcGVydHlcblx0XHQkZGVmaW5lUHJvcGVydHkgPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJpbmQoKSB7XG5cdHJldHVybiAkcmVmbGVjdEFwcGx5KGJpbmQsICRjYWxsLCBhcmd1bWVudHMpO1xufTtcblxudmFyIGFwcGx5QmluZCA9IGZ1bmN0aW9uIGFwcGx5QmluZCgpIHtcblx0cmV0dXJuICRyZWZsZWN0QXBwbHkoYmluZCwgJGFwcGx5LCBhcmd1bWVudHMpO1xufTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHQkZGVmaW5lUHJvcGVydHkobW9kdWxlLmV4cG9ydHMsICdhcHBseScsIHsgdmFsdWU6IGFwcGx5QmluZCB9KTtcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzLmFwcGx5ID0gYXBwbHlCaW5kO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnLi4vR2V0SW50cmluc2ljJyk7XG5cbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJy4vY2FsbEJpbmQnKTtcblxudmFyICRpbmRleE9mID0gY2FsbEJpbmQoR2V0SW50cmluc2ljKCdTdHJpbmcucHJvdG90eXBlLmluZGV4T2YnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJvdW5kSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljID0gR2V0SW50cmluc2ljKG5hbWUsICEhYWxsb3dNaXNzaW5nKTtcblx0aWYgKHR5cGVvZiBpbnRyaW5zaWMgPT09ICdmdW5jdGlvbicgJiYgJGluZGV4T2YobmFtZSwgJy5wcm90b3R5cGUuJykpIHtcblx0XHRyZXR1cm4gY2FsbEJpbmQoaW50cmluc2ljKTtcblx0fVxuXHRyZXR1cm4gaW50cmluc2ljO1xufTtcbiIsInZhciBoYXNNYXAgPSB0eXBlb2YgTWFwID09PSAnZnVuY3Rpb24nICYmIE1hcC5wcm90b3R5cGU7XG52YXIgbWFwU2l6ZURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIGhhc01hcCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTWFwLnByb3RvdHlwZSwgJ3NpemUnKSA6IG51bGw7XG52YXIgbWFwU2l6ZSA9IGhhc01hcCAmJiBtYXBTaXplRGVzY3JpcHRvciAmJiB0eXBlb2YgbWFwU2l6ZURlc2NyaXB0b3IuZ2V0ID09PSAnZnVuY3Rpb24nID8gbWFwU2l6ZURlc2NyaXB0b3IuZ2V0IDogbnVsbDtcbnZhciBtYXBGb3JFYWNoID0gaGFzTWFwICYmIE1hcC5wcm90b3R5cGUuZm9yRWFjaDtcbnZhciBoYXNTZXQgPSB0eXBlb2YgU2V0ID09PSAnZnVuY3Rpb24nICYmIFNldC5wcm90b3R5cGU7XG52YXIgc2V0U2l6ZURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIGhhc1NldCA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoU2V0LnByb3RvdHlwZSwgJ3NpemUnKSA6IG51bGw7XG52YXIgc2V0U2l6ZSA9IGhhc1NldCAmJiBzZXRTaXplRGVzY3JpcHRvciAmJiB0eXBlb2Ygc2V0U2l6ZURlc2NyaXB0b3IuZ2V0ID09PSAnZnVuY3Rpb24nID8gc2V0U2l6ZURlc2NyaXB0b3IuZ2V0IDogbnVsbDtcbnZhciBzZXRGb3JFYWNoID0gaGFzU2V0ICYmIFNldC5wcm90b3R5cGUuZm9yRWFjaDtcbnZhciBoYXNXZWFrTWFwID0gdHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicgJiYgV2Vha01hcC5wcm90b3R5cGU7XG52YXIgd2Vha01hcEhhcyA9IGhhc1dlYWtNYXAgPyBXZWFrTWFwLnByb3RvdHlwZS5oYXMgOiBudWxsO1xudmFyIGhhc1dlYWtTZXQgPSB0eXBlb2YgV2Vha1NldCA9PT0gJ2Z1bmN0aW9uJyAmJiBXZWFrU2V0LnByb3RvdHlwZTtcbnZhciB3ZWFrU2V0SGFzID0gaGFzV2Vha1NldCA/IFdlYWtTZXQucHJvdG90eXBlLmhhcyA6IG51bGw7XG52YXIgYm9vbGVhblZhbHVlT2YgPSBCb29sZWFuLnByb3RvdHlwZS52YWx1ZU9mO1xudmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciBmdW5jdGlvblRvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIG1hdGNoID0gU3RyaW5nLnByb3RvdHlwZS5tYXRjaDtcbnZhciBiaWdJbnRWYWx1ZU9mID0gdHlwZW9mIEJpZ0ludCA9PT0gJ2Z1bmN0aW9uJyA/IEJpZ0ludC5wcm90b3R5cGUudmFsdWVPZiA6IG51bGw7XG5cbnZhciBpbnNwZWN0Q3VzdG9tID0gcmVxdWlyZSgnLi91dGlsLmluc3BlY3QnKS5jdXN0b207XG52YXIgaW5zcGVjdFN5bWJvbCA9IGluc3BlY3RDdXN0b20gJiYgaXNTeW1ib2woaW5zcGVjdEN1c3RvbSkgPyBpbnNwZWN0Q3VzdG9tIDogbnVsbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnNwZWN0XyhvYmosIG9wdGlvbnMsIGRlcHRoLCBzZWVuKSB7XG4gICAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgaWYgKGhhcyhvcHRzLCAncXVvdGVTdHlsZScpICYmIChvcHRzLnF1b3RlU3R5bGUgIT09ICdzaW5nbGUnICYmIG9wdHMucXVvdGVTdHlsZSAhPT0gJ2RvdWJsZScpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcInF1b3RlU3R5bGVcIiBtdXN0IGJlIFwic2luZ2xlXCIgb3IgXCJkb3VibGVcIicpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAgIGhhcyhvcHRzLCAnbWF4U3RyaW5nTGVuZ3RoJykgJiYgKHR5cGVvZiBvcHRzLm1heFN0cmluZ0xlbmd0aCA9PT0gJ251bWJlcidcbiAgICAgICAgICAgID8gb3B0cy5tYXhTdHJpbmdMZW5ndGggPCAwICYmIG9wdHMubWF4U3RyaW5nTGVuZ3RoICE9PSBJbmZpbml0eVxuICAgICAgICAgICAgOiBvcHRzLm1heFN0cmluZ0xlbmd0aCAhPT0gbnVsbFxuICAgICAgICApXG4gICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcIm1heFN0cmluZ0xlbmd0aFwiLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIsIEluZmluaXR5LCBvciBgbnVsbGAnKTtcbiAgICB9XG4gICAgdmFyIGN1c3RvbUluc3BlY3QgPSBoYXMob3B0cywgJ2N1c3RvbUluc3BlY3QnKSA/IG9wdHMuY3VzdG9tSW5zcGVjdCA6IHRydWU7XG4gICAgaWYgKHR5cGVvZiBjdXN0b21JbnNwZWN0ICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwiY3VzdG9tSW5zcGVjdFwiLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBgdHJ1ZWAgb3IgYGZhbHNlYCcpO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgaGFzKG9wdHMsICdpbmRlbnQnKVxuICAgICAgICAmJiBvcHRzLmluZGVudCAhPT0gbnVsbFxuICAgICAgICAmJiBvcHRzLmluZGVudCAhPT0gJ1xcdCdcbiAgICAgICAgJiYgIShwYXJzZUludChvcHRzLmluZGVudCwgMTApID09PSBvcHRzLmluZGVudCAmJiBvcHRzLmluZGVudCA+IDApXG4gICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbnMgXCJpbmRlbnRcIiBtdXN0IGJlIFwiXFxcXHRcIiwgYW4gaW50ZWdlciA+IDAsIG9yIGBudWxsYCcpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICdudWxsJztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdib29sZWFuJykge1xuICAgICAgICByZXR1cm4gb2JqID8gJ3RydWUnIDogJ2ZhbHNlJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGluc3BlY3RTdHJpbmcob2JqLCBvcHRzKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlmIChvYmogPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBJbmZpbml0eSAvIG9iaiA+IDAgPyAnMCcgOiAnLTAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdHJpbmcob2JqKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdiaWdpbnQnKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgdmFsaWQtdHlwZW9mXG4gICAgICAgIHJldHVybiBTdHJpbmcob2JqKSArICduJztcbiAgICB9XG5cbiAgICB2YXIgbWF4RGVwdGggPSB0eXBlb2Ygb3B0cy5kZXB0aCA9PT0gJ3VuZGVmaW5lZCcgPyA1IDogb3B0cy5kZXB0aDtcbiAgICBpZiAodHlwZW9mIGRlcHRoID09PSAndW5kZWZpbmVkJykgeyBkZXB0aCA9IDA7IH1cbiAgICBpZiAoZGVwdGggPj0gbWF4RGVwdGggJiYgbWF4RGVwdGggPiAwICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5KG9iaikgPyAnW0FycmF5XScgOiAnW09iamVjdF0nO1xuICAgIH1cblxuICAgIHZhciBpbmRlbnQgPSBnZXRJbmRlbnQob3B0cywgZGVwdGgpO1xuXG4gICAgaWYgKHR5cGVvZiBzZWVuID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzZWVuID0gW107XG4gICAgfSBlbHNlIGlmIChpbmRleE9mKHNlZW4sIG9iaikgPj0gMCkge1xuICAgICAgICByZXR1cm4gJ1tDaXJjdWxhcl0nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3BlY3QodmFsdWUsIGZyb20sIG5vSW5kZW50KSB7XG4gICAgICAgIGlmIChmcm9tKSB7XG4gICAgICAgICAgICBzZWVuID0gc2Vlbi5zbGljZSgpO1xuICAgICAgICAgICAgc2Vlbi5wdXNoKGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub0luZGVudCkge1xuICAgICAgICAgICAgdmFyIG5ld09wdHMgPSB7XG4gICAgICAgICAgICAgICAgZGVwdGg6IG9wdHMuZGVwdGhcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoaGFzKG9wdHMsICdxdW90ZVN0eWxlJykpIHtcbiAgICAgICAgICAgICAgICBuZXdPcHRzLnF1b3RlU3R5bGUgPSBvcHRzLnF1b3RlU3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5zcGVjdF8odmFsdWUsIG5ld09wdHMsIGRlcHRoICsgMSwgc2Vlbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluc3BlY3RfKHZhbHVlLCBvcHRzLCBkZXB0aCArIDEsIHNlZW4pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHZhciBuYW1lID0gbmFtZU9mKG9iaik7XG4gICAgICAgIHJldHVybiAnW0Z1bmN0aW9uJyArIChuYW1lID8gJzogJyArIG5hbWUgOiAnIChhbm9ueW1vdXMpJykgKyAnXSc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChvYmopKSB7XG4gICAgICAgIHZhciBzeW1TdHJpbmcgPSBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnID8gbWFya0JveGVkKHN5bVN0cmluZykgOiBzeW1TdHJpbmc7XG4gICAgfVxuICAgIGlmIChpc0VsZW1lbnQob2JqKSkge1xuICAgICAgICB2YXIgcyA9ICc8JyArIFN0cmluZyhvYmoubm9kZU5hbWUpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciBhdHRycyA9IG9iai5hdHRyaWJ1dGVzIHx8IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzICs9ICcgJyArIGF0dHJzW2ldLm5hbWUgKyAnPScgKyB3cmFwUXVvdGVzKHF1b3RlKGF0dHJzW2ldLnZhbHVlKSwgJ2RvdWJsZScsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIHMgKz0gJz4nO1xuICAgICAgICBpZiAob2JqLmNoaWxkTm9kZXMgJiYgb2JqLmNoaWxkTm9kZXMubGVuZ3RoKSB7IHMgKz0gJy4uLic7IH1cbiAgICAgICAgcyArPSAnPC8nICsgU3RyaW5nKG9iai5ub2RlTmFtZSkudG9Mb3dlckNhc2UoKSArICc+JztcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgaWYgKG9iai5sZW5ndGggPT09IDApIHsgcmV0dXJuICdbXSc7IH1cbiAgICAgICAgdmFyIHhzID0gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QpO1xuICAgICAgICBpZiAoaW5kZW50ICYmICFzaW5nbGVMaW5lVmFsdWVzKHhzKSkge1xuICAgICAgICAgICAgcmV0dXJuICdbJyArIGluZGVudGVkSm9pbih4cywgaW5kZW50KSArICddJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ1sgJyArIHhzLmpvaW4oJywgJykgKyAnIF0nO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcihvYmopKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IGFyck9iaktleXMob2JqLCBpbnNwZWN0KTtcbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJ1snICsgU3RyaW5nKG9iaikgKyAnXSc7IH1cbiAgICAgICAgcmV0dXJuICd7IFsnICsgU3RyaW5nKG9iaikgKyAnXSAnICsgcGFydHMuam9pbignLCAnKSArICcgfSc7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiBjdXN0b21JbnNwZWN0KSB7XG4gICAgICAgIGlmIChpbnNwZWN0U3ltYm9sICYmIHR5cGVvZiBvYmpbaW5zcGVjdFN5bWJvbF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmpbaW5zcGVjdFN5bWJvbF0oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqLmluc3BlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmouaW5zcGVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpc01hcChvYmopKSB7XG4gICAgICAgIHZhciBtYXBQYXJ0cyA9IFtdO1xuICAgICAgICBtYXBGb3JFYWNoLmNhbGwob2JqLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgbWFwUGFydHMucHVzaChpbnNwZWN0KGtleSwgb2JqLCB0cnVlKSArICcgPT4gJyArIGluc3BlY3QodmFsdWUsIG9iaikpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25PZignTWFwJywgbWFwU2l6ZS5jYWxsKG9iaiksIG1hcFBhcnRzLCBpbmRlbnQpO1xuICAgIH1cbiAgICBpZiAoaXNTZXQob2JqKSkge1xuICAgICAgICB2YXIgc2V0UGFydHMgPSBbXTtcbiAgICAgICAgc2V0Rm9yRWFjaC5jYWxsKG9iaiwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICBzZXRQYXJ0cy5wdXNoKGluc3BlY3QodmFsdWUsIG9iaikpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25PZignU2V0Jywgc2V0U2l6ZS5jYWxsKG9iaiksIHNldFBhcnRzLCBpbmRlbnQpO1xuICAgIH1cbiAgICBpZiAoaXNXZWFrTWFwKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHdlYWtDb2xsZWN0aW9uT2YoJ1dlYWtNYXAnKTtcbiAgICB9XG4gICAgaWYgKGlzV2Vha1NldChvYmopKSB7XG4gICAgICAgIHJldHVybiB3ZWFrQ29sbGVjdGlvbk9mKCdXZWFrU2V0Jyk7XG4gICAgfVxuICAgIGlmIChpc051bWJlcihvYmopKSB7XG4gICAgICAgIHJldHVybiBtYXJrQm94ZWQoaW5zcGVjdChOdW1iZXIob2JqKSkpO1xuICAgIH1cbiAgICBpZiAoaXNCaWdJbnQob2JqKSkge1xuICAgICAgICByZXR1cm4gbWFya0JveGVkKGluc3BlY3QoYmlnSW50VmFsdWVPZi5jYWxsKG9iaikpKTtcbiAgICB9XG4gICAgaWYgKGlzQm9vbGVhbihvYmopKSB7XG4gICAgICAgIHJldHVybiBtYXJrQm94ZWQoYm9vbGVhblZhbHVlT2YuY2FsbChvYmopKTtcbiAgICB9XG4gICAgaWYgKGlzU3RyaW5nKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChpbnNwZWN0KFN0cmluZyhvYmopKSk7XG4gICAgfVxuICAgIGlmICghaXNEYXRlKG9iaikgJiYgIWlzUmVnRXhwKG9iaikpIHtcbiAgICAgICAgdmFyIHlzID0gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QpO1xuICAgICAgICBpZiAoeXMubGVuZ3RoID09PSAwKSB7IHJldHVybiAne30nOyB9XG4gICAgICAgIGlmIChpbmRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiAneycgKyBpbmRlbnRlZEpvaW4oeXMsIGluZGVudCkgKyAnfSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICd7ICcgKyB5cy5qb2luKCcsICcpICsgJyB9JztcbiAgICB9XG4gICAgcmV0dXJuIFN0cmluZyhvYmopO1xufTtcblxuZnVuY3Rpb24gd3JhcFF1b3RlcyhzLCBkZWZhdWx0U3R5bGUsIG9wdHMpIHtcbiAgICB2YXIgcXVvdGVDaGFyID0gKG9wdHMucXVvdGVTdHlsZSB8fCBkZWZhdWx0U3R5bGUpID09PSAnZG91YmxlJyA/ICdcIicgOiBcIidcIjtcbiAgICByZXR1cm4gcXVvdGVDaGFyICsgcyArIHF1b3RlQ2hhcjtcbn1cblxuZnVuY3Rpb24gcXVvdGUocykge1xuICAgIHJldHVybiBTdHJpbmcocykucmVwbGFjZSgvXCIvZywgJyZxdW90OycpO1xufVxuXG5mdW5jdGlvbiBpc0FycmF5KG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJzsgfVxuZnVuY3Rpb24gaXNEYXRlKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgRGF0ZV0nOyB9XG5mdW5jdGlvbiBpc1JlZ0V4cChvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nOyB9XG5mdW5jdGlvbiBpc0Vycm9yKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgRXJyb3JdJzsgfVxuZnVuY3Rpb24gaXNTeW1ib2wob2JqKSB7IHJldHVybiB0b1N0cihvYmopID09PSAnW29iamVjdCBTeW1ib2xdJzsgfVxuZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7IHJldHVybiB0b1N0cihvYmopID09PSAnW29iamVjdCBTdHJpbmddJzsgfVxuZnVuY3Rpb24gaXNOdW1iZXIob2JqKSB7IHJldHVybiB0b1N0cihvYmopID09PSAnW29iamVjdCBOdW1iZXJdJzsgfVxuZnVuY3Rpb24gaXNCaWdJbnQob2JqKSB7IHJldHVybiB0b1N0cihvYmopID09PSAnW29iamVjdCBCaWdJbnRdJzsgfVxuZnVuY3Rpb24gaXNCb29sZWFuKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nOyB9XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5IHx8IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGtleSBpbiB0aGlzOyB9O1xuZnVuY3Rpb24gaGFzKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIGhhc093bi5jYWxsKG9iaiwga2V5KTtcbn1cblxuZnVuY3Rpb24gdG9TdHIob2JqKSB7XG4gICAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwob2JqKTtcbn1cblxuZnVuY3Rpb24gbmFtZU9mKGYpIHtcbiAgICBpZiAoZi5uYW1lKSB7IHJldHVybiBmLm5hbWU7IH1cbiAgICB2YXIgbSA9IG1hdGNoLmNhbGwoZnVuY3Rpb25Ub1N0cmluZy5jYWxsKGYpLCAvXmZ1bmN0aW9uXFxzKihbXFx3JF0rKS8pO1xuICAgIGlmIChtKSB7IHJldHVybiBtWzFdOyB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGluZGV4T2YoeHMsIHgpIHtcbiAgICBpZiAoeHMuaW5kZXhPZikgeyByZXR1cm4geHMuaW5kZXhPZih4KTsgfVxuICAgIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmICh4c1tpXSA9PT0geCkgeyByZXR1cm4gaTsgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIGlzTWFwKHgpIHtcbiAgICBpZiAoIW1hcFNpemUgfHwgIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgbWFwU2l6ZS5jYWxsKHgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0U2l6ZS5jYWxsKHgpO1xuICAgICAgICB9IGNhdGNoIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIE1hcDsgLy8gY29yZS1qcyB3b3JrYXJvdW5kLCBwcmUtdjIuNS4wXG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzV2Vha01hcCh4KSB7XG4gICAgaWYgKCF3ZWFrTWFwSGFzIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHdlYWtNYXBIYXMuY2FsbCh4LCB3ZWFrTWFwSGFzKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdlYWtTZXRIYXMuY2FsbCh4LCB3ZWFrU2V0SGFzKTtcbiAgICAgICAgfSBjYXRjaCAocykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggaW5zdGFuY2VvZiBXZWFrTWFwOyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12Mi41LjBcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNTZXQoeCkge1xuICAgIGlmICghc2V0U2l6ZSB8fCAheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBzZXRTaXplLmNhbGwoeCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBtYXBTaXplLmNhbGwoeCk7XG4gICAgICAgIH0gY2F0Y2ggKG0pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgU2V0OyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12Mi41LjBcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNXZWFrU2V0KHgpIHtcbiAgICBpZiAoIXdlYWtTZXRIYXMgfHwgIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgd2Vha1NldEhhcy5jYWxsKHgsIHdlYWtTZXRIYXMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2Vha01hcEhhcy5jYWxsKHgsIHdlYWtNYXBIYXMpO1xuICAgICAgICB9IGNhdGNoIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIFdlYWtTZXQ7IC8vIGNvcmUtanMgd29ya2Fyb3VuZCwgcHJlLXYyLjUuMFxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc0VsZW1lbnQoeCkge1xuICAgIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgeCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIHgubm9kZU5hbWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB4LmdldEF0dHJpYnV0ZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaW5zcGVjdFN0cmluZyhzdHIsIG9wdHMpIHtcbiAgICBpZiAoc3RyLmxlbmd0aCA+IG9wdHMubWF4U3RyaW5nTGVuZ3RoKSB7XG4gICAgICAgIHZhciByZW1haW5pbmcgPSBzdHIubGVuZ3RoIC0gb3B0cy5tYXhTdHJpbmdMZW5ndGg7XG4gICAgICAgIHZhciB0cmFpbGVyID0gJy4uLiAnICsgcmVtYWluaW5nICsgJyBtb3JlIGNoYXJhY3RlcicgKyAocmVtYWluaW5nID4gMSA/ICdzJyA6ICcnKTtcbiAgICAgICAgcmV0dXJuIGluc3BlY3RTdHJpbmcoc3RyLnNsaWNlKDAsIG9wdHMubWF4U3RyaW5nTGVuZ3RoKSwgb3B0cykgKyB0cmFpbGVyO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udHJvbC1yZWdleFxuICAgIHZhciBzID0gc3RyLnJlcGxhY2UoLyhbJ1xcXFxdKS9nLCAnXFxcXCQxJykucmVwbGFjZSgvW1xceDAwLVxceDFmXS9nLCBsb3dieXRlKTtcbiAgICByZXR1cm4gd3JhcFF1b3RlcyhzLCAnc2luZ2xlJywgb3B0cyk7XG59XG5cbmZ1bmN0aW9uIGxvd2J5dGUoYykge1xuICAgIHZhciBuID0gYy5jaGFyQ29kZUF0KDApO1xuICAgIHZhciB4ID0ge1xuICAgICAgICA4OiAnYicsIDk6ICd0JywgMTA6ICduJywgMTI6ICdmJywgMTM6ICdyJ1xuICAgIH1bbl07XG4gICAgaWYgKHgpIHsgcmV0dXJuICdcXFxcJyArIHg7IH1cbiAgICByZXR1cm4gJ1xcXFx4JyArIChuIDwgMHgxMCA/ICcwJyA6ICcnKSArIG4udG9TdHJpbmcoMTYpO1xufVxuXG5mdW5jdGlvbiBtYXJrQm94ZWQoc3RyKSB7XG4gICAgcmV0dXJuICdPYmplY3QoJyArIHN0ciArICcpJztcbn1cblxuZnVuY3Rpb24gd2Vha0NvbGxlY3Rpb25PZih0eXBlKSB7XG4gICAgcmV0dXJuIHR5cGUgKyAnIHsgPyB9Jztcbn1cblxuZnVuY3Rpb24gY29sbGVjdGlvbk9mKHR5cGUsIHNpemUsIGVudHJpZXMsIGluZGVudCkge1xuICAgIHZhciBqb2luZWRFbnRyaWVzID0gaW5kZW50ID8gaW5kZW50ZWRKb2luKGVudHJpZXMsIGluZGVudCkgOiBlbnRyaWVzLmpvaW4oJywgJyk7XG4gICAgcmV0dXJuIHR5cGUgKyAnICgnICsgc2l6ZSArICcpIHsnICsgam9pbmVkRW50cmllcyArICd9Jztcbn1cblxuZnVuY3Rpb24gc2luZ2xlTGluZVZhbHVlcyh4cykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGluZGV4T2YoeHNbaV0sICdcXG4nKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldEluZGVudChvcHRzLCBkZXB0aCkge1xuICAgIHZhciBiYXNlSW5kZW50O1xuICAgIGlmIChvcHRzLmluZGVudCA9PT0gJ1xcdCcpIHtcbiAgICAgICAgYmFzZUluZGVudCA9ICdcXHQnO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuaW5kZW50ID09PSAnbnVtYmVyJyAmJiBvcHRzLmluZGVudCA+IDApIHtcbiAgICAgICAgYmFzZUluZGVudCA9IEFycmF5KG9wdHMuaW5kZW50ICsgMSkuam9pbignICcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBiYXNlOiBiYXNlSW5kZW50LFxuICAgICAgICBwcmV2OiBBcnJheShkZXB0aCArIDEpLmpvaW4oYmFzZUluZGVudClcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBpbmRlbnRlZEpvaW4oeHMsIGluZGVudCkge1xuICAgIGlmICh4cy5sZW5ndGggPT09IDApIHsgcmV0dXJuICcnOyB9XG4gICAgdmFyIGxpbmVKb2luZXIgPSAnXFxuJyArIGluZGVudC5wcmV2ICsgaW5kZW50LmJhc2U7XG4gICAgcmV0dXJuIGxpbmVKb2luZXIgKyB4cy5qb2luKCcsJyArIGxpbmVKb2luZXIpICsgJ1xcbicgKyBpbmRlbnQucHJldjtcbn1cblxuZnVuY3Rpb24gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QpIHtcbiAgICB2YXIgaXNBcnIgPSBpc0FycmF5KG9iaik7XG4gICAgdmFyIHhzID0gW107XG4gICAgaWYgKGlzQXJyKSB7XG4gICAgICAgIHhzLmxlbmd0aCA9IG9iai5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB4c1tpXSA9IGhhcyhvYmosIGkpID8gaW5zcGVjdChvYmpbaV0sIG9iaikgOiAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgICAgaWYgKCFoYXMob2JqLCBrZXkpKSB7IGNvbnRpbnVlOyB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIG5vLWNvbnRpbnVlXG4gICAgICAgIGlmIChpc0FyciAmJiBTdHJpbmcoTnVtYmVyKGtleSkpID09PSBrZXkgJiYga2V5IDwgb2JqLmxlbmd0aCkgeyBjb250aW51ZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBuby1jb250aW51ZVxuICAgICAgICBpZiAoKC9bXlxcdyRdLykudGVzdChrZXkpKSB7XG4gICAgICAgICAgICB4cy5wdXNoKGluc3BlY3Qoa2V5LCBvYmopICsgJzogJyArIGluc3BlY3Qob2JqW2tleV0sIG9iaikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeHMucHVzaChrZXkgKyAnOiAnICsgaW5zcGVjdChvYmpba2V5XSwgb2JqKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHhzO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZXMtYWJzdHJhY3QvR2V0SW50cmluc2ljJyk7XG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnZXMtYWJzdHJhY3QvaGVscGVycy9jYWxsQm91bmQnKTtcbnZhciBpbnNwZWN0ID0gcmVxdWlyZSgnb2JqZWN0LWluc3BlY3QnKTtcblxudmFyICRUeXBlRXJyb3IgPSBHZXRJbnRyaW5zaWMoJyVUeXBlRXJyb3IlJyk7XG52YXIgJFdlYWtNYXAgPSBHZXRJbnRyaW5zaWMoJyVXZWFrTWFwJScsIHRydWUpO1xudmFyICRNYXAgPSBHZXRJbnRyaW5zaWMoJyVNYXAlJywgdHJ1ZSk7XG52YXIgJHB1c2ggPSBjYWxsQm91bmQoJ0FycmF5LnByb3RvdHlwZS5wdXNoJyk7XG5cbnZhciAkd2Vha01hcEdldCA9IGNhbGxCb3VuZCgnV2Vha01hcC5wcm90b3R5cGUuZ2V0JywgdHJ1ZSk7XG52YXIgJHdlYWtNYXBTZXQgPSBjYWxsQm91bmQoJ1dlYWtNYXAucHJvdG90eXBlLnNldCcsIHRydWUpO1xudmFyICR3ZWFrTWFwSGFzID0gY2FsbEJvdW5kKCdXZWFrTWFwLnByb3RvdHlwZS5oYXMnLCB0cnVlKTtcbnZhciAkbWFwR2V0ID0gY2FsbEJvdW5kKCdNYXAucHJvdG90eXBlLmdldCcsIHRydWUpO1xudmFyICRtYXBTZXQgPSBjYWxsQm91bmQoJ01hcC5wcm90b3R5cGUuc2V0JywgdHJ1ZSk7XG52YXIgJG1hcEhhcyA9IGNhbGxCb3VuZCgnTWFwLnByb3RvdHlwZS5oYXMnLCB0cnVlKTtcbnZhciBvYmplY3RHZXQgPSBmdW5jdGlvbiAob2JqZWN0cywga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKG9iamVjdHNbaV0ua2V5ID09PSBrZXkpIHtcblx0XHRcdHJldHVybiBvYmplY3RzW2ldLnZhbHVlO1xuXHRcdH1cblx0fVxufTtcbnZhciBvYmplY3RTZXQgPSBmdW5jdGlvbiAob2JqZWN0cywga2V5LCB2YWx1ZSkge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAob2JqZWN0c1tpXS5rZXkgPT09IGtleSkge1xuXHRcdFx0b2JqZWN0c1tpXS52YWx1ZSA9IHZhbHVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHR9XG5cdCRwdXNoKG9iamVjdHMsIHtcblx0XHRrZXk6IGtleSxcblx0XHR2YWx1ZTogdmFsdWVcblx0fSk7XG59O1xudmFyIG9iamVjdEhhcyA9IGZ1bmN0aW9uIChvYmplY3RzLCBrZXkpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYmplY3RzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKG9iamVjdHNbaV0ua2V5ID09PSBrZXkpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGdldFNpZGVDaGFubmVsKCkge1xuXHR2YXIgJHdtO1xuXHR2YXIgJG07XG5cdHZhciAkbztcblx0dmFyIGNoYW5uZWwgPSB7XG5cdFx0YXNzZXJ0OiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRpZiAoIWNoYW5uZWwuaGFzKGtleSkpIHtcblx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1NpZGUgY2hhbm5lbCBkb2VzIG5vdCBjb250YWluICcgKyBpbnNwZWN0KGtleSkpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Z2V0OiBmdW5jdGlvbiAoa2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cblx0XHRcdGlmICgkV2Vha01hcCAmJiBrZXkgJiYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpKSB7XG5cdFx0XHRcdGlmICgkd20pIHtcblx0XHRcdFx0XHRyZXR1cm4gJHdlYWtNYXBHZXQoJHdtLCBrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKCRNYXApIHtcblx0XHRcdFx0aWYgKCRtKSB7XG5cdFx0XHRcdFx0cmV0dXJuICRtYXBHZXQoJG0sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICgkbykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmVseS1pZlxuXHRcdFx0XHRcdHJldHVybiBvYmplY3RHZXQoJG8sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGhhczogZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0aWYgKCRXZWFrTWFwICYmIGtleSAmJiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRcdFx0aWYgKCR3bSkge1xuXHRcdFx0XHRcdHJldHVybiAkd2Vha01hcEhhcygkd20sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoJE1hcCkge1xuXHRcdFx0XHRpZiAoJG0pIHtcblx0XHRcdFx0XHRyZXR1cm4gJG1hcEhhcygkbSwga2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCRvKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZWx5LWlmXG5cdFx0XHRcdFx0cmV0dXJuIG9iamVjdEhhcygkbywga2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0aWYgKCRXZWFrTWFwICYmIGtleSAmJiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRcdFx0aWYgKCEkd20pIHtcblx0XHRcdFx0XHQkd20gPSBuZXcgJFdlYWtNYXAoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkd2Vha01hcFNldCgkd20sIGtleSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIGlmICgkTWFwKSB7XG5cdFx0XHRcdGlmICghJG0pIHtcblx0XHRcdFx0XHQkbSA9IG5ldyAkTWFwKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JG1hcFNldCgkbSwga2V5LCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoISRvKSB7XG5cdFx0XHRcdFx0JG8gPSBbXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRvYmplY3RTZXQoJG8sIGtleSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGNoYW5uZWw7XG59O1xuIiwiXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9yRWFjaCAob2JqLCBmbiwgY3R4KSB7XG4gICAgaWYgKHRvU3RyaW5nLmNhbGwoZm4pICE9PSAnW29iamVjdCBGdW5jdGlvbl0nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2l0ZXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgIH1cbiAgICB2YXIgbCA9IG9iai5sZW5ndGg7XG4gICAgaWYgKGwgPT09ICtsKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBmbi5jYWxsKGN0eCwgb2JqW2ldLCBpLCBvYmopO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgayBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChvYmosIGspKSB7XG4gICAgICAgICAgICAgICAgZm4uY2FsbChjdHgsIG9ialtrXSwgaywgb2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbiIsIlxuLyoqXG4gKiBBcnJheSNmaWx0ZXIuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3Q9fSBzZWxmXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEB0aHJvdyBUeXBlRXJyb3JcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnIsIGZuLCBzZWxmKSB7XG4gIGlmIChhcnIuZmlsdGVyKSByZXR1cm4gYXJyLmZpbHRlcihmbiwgc2VsZik7XG4gIGlmICh2b2lkIDAgPT09IGFyciB8fCBudWxsID09PSBhcnIpIHRocm93IG5ldyBUeXBlRXJyb3I7XG4gIGlmICgnZnVuY3Rpb24nICE9IHR5cGVvZiBmbikgdGhyb3cgbmV3IFR5cGVFcnJvcjtcbiAgdmFyIHJldCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duLmNhbGwoYXJyLCBpKSkgY29udGludWU7XG4gICAgdmFyIHZhbCA9IGFycltpXTtcbiAgICBpZiAoZm4uY2FsbChzZWxmLCB2YWwsIGksIGFycikpIHJldC5wdXNoKHZhbCk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmlsdGVyID0gcmVxdWlyZSgnYXJyYXktZmlsdGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXZhaWxhYmxlVHlwZWRBcnJheXMoKSB7XG5cdHJldHVybiBmaWx0ZXIoW1xuXHRcdCdCaWdJbnQ2NEFycmF5Jyxcblx0XHQnQmlnVWludDY0QXJyYXknLFxuXHRcdCdGbG9hdDMyQXJyYXknLFxuXHRcdCdGbG9hdDY0QXJyYXknLFxuXHRcdCdJbnQxNkFycmF5Jyxcblx0XHQnSW50MzJBcnJheScsXG5cdFx0J0ludDhBcnJheScsXG5cdFx0J1VpbnQxNkFycmF5Jyxcblx0XHQnVWludDMyQXJyYXknLFxuXHRcdCdVaW50OEFycmF5Jyxcblx0XHQnVWludDhDbGFtcGVkQXJyYXknXG5cdF0sIGZ1bmN0aW9uICh0eXBlZEFycmF5KSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBnbG9iYWxbdHlwZWRBcnJheV0gPT09ICdmdW5jdGlvbic7XG5cdH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJy4uL0dldEludHJpbnNpYycpO1xuXG52YXIgJGdPUEQgPSBHZXRJbnRyaW5zaWMoJyVPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yJScpO1xuaWYgKCRnT1BEKSB7XG5cdHRyeSB7XG5cdFx0JGdPUEQoW10sICdsZW5ndGgnKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIElFIDggaGFzIGEgYnJva2VuIGdPUERcblx0XHQkZ09QRCA9IG51bGw7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSAkZ09QRDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZvckVhY2ggPSByZXF1aXJlKCdmb3JlYWNoJyk7XG52YXIgYXZhaWxhYmxlVHlwZWRBcnJheXMgPSByZXF1aXJlKCdhdmFpbGFibGUtdHlwZWQtYXJyYXlzJyk7XG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnZXMtYWJzdHJhY3QvaGVscGVycy9jYWxsQm91bmQnKTtcblxudmFyICR0b1N0cmluZyA9IGNhbGxCb3VuZCgnT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZycpO1xudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scycpKCk7XG52YXIgaGFzVG9TdHJpbmdUYWcgPSBoYXNTeW1ib2xzICYmIHR5cGVvZiBTeW1ib2wudG9TdHJpbmdUYWcgPT09ICdzeW1ib2wnO1xuXG52YXIgdHlwZWRBcnJheXMgPSBhdmFpbGFibGVUeXBlZEFycmF5cygpO1xuXG52YXIgJGluZGV4T2YgPSBjYWxsQm91bmQoJ0FycmF5LnByb3RvdHlwZS5pbmRleE9mJywgdHJ1ZSkgfHwgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdGlmIChhcnJheVtpXSA9PT0gdmFsdWUpIHtcblx0XHRcdHJldHVybiBpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gLTE7XG59O1xudmFyICRzbGljZSA9IGNhbGxCb3VuZCgnU3RyaW5nLnByb3RvdHlwZS5zbGljZScpO1xudmFyIHRvU3RyVGFncyA9IHt9O1xudmFyIGdPUEQgPSByZXF1aXJlKCdlcy1hYnN0cmFjdC9oZWxwZXJzL2dldE93blByb3BlcnR5RGVzY3JpcHRvcicpO1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mOyAvLyByZXF1aXJlKCdnZXRwcm90b3R5cGVvZicpO1xuaWYgKGhhc1RvU3RyaW5nVGFnICYmIGdPUEQgJiYgZ2V0UHJvdG90eXBlT2YpIHtcblx0Zm9yRWFjaCh0eXBlZEFycmF5cywgZnVuY3Rpb24gKHR5cGVkQXJyYXkpIHtcblx0XHR2YXIgYXJyID0gbmV3IGdsb2JhbFt0eXBlZEFycmF5XSgpO1xuXHRcdGlmICghKFN5bWJvbC50b1N0cmluZ1RhZyBpbiBhcnIpKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXZhbEVycm9yKCd0aGlzIGVuZ2luZSBoYXMgc3VwcG9ydCBmb3IgU3ltYm9sLnRvU3RyaW5nVGFnLCBidXQgJyArIHR5cGVkQXJyYXkgKyAnIGRvZXMgbm90IGhhdmUgdGhlIHByb3BlcnR5ISBQbGVhc2UgcmVwb3J0IHRoaXMuJyk7XG5cdFx0fVxuXHRcdHZhciBwcm90byA9IGdldFByb3RvdHlwZU9mKGFycik7XG5cdFx0dmFyIGRlc2NyaXB0b3IgPSBnT1BEKHByb3RvLCBTeW1ib2wudG9TdHJpbmdUYWcpO1xuXHRcdGlmICghZGVzY3JpcHRvcikge1xuXHRcdFx0dmFyIHN1cGVyUHJvdG8gPSBnZXRQcm90b3R5cGVPZihwcm90byk7XG5cdFx0XHRkZXNjcmlwdG9yID0gZ09QRChzdXBlclByb3RvLCBTeW1ib2wudG9TdHJpbmdUYWcpO1xuXHRcdH1cblx0XHR0b1N0clRhZ3NbdHlwZWRBcnJheV0gPSBkZXNjcmlwdG9yLmdldDtcblx0fSk7XG59XG5cbnZhciB0cnlUeXBlZEFycmF5cyA9IGZ1bmN0aW9uIHRyeUFsbFR5cGVkQXJyYXlzKHZhbHVlKSB7XG5cdHZhciBhbnlUcnVlID0gZmFsc2U7XG5cdGZvckVhY2godG9TdHJUYWdzLCBmdW5jdGlvbiAoZ2V0dGVyLCB0eXBlZEFycmF5KSB7XG5cdFx0aWYgKCFhbnlUcnVlKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRhbnlUcnVlID0gZ2V0dGVyLmNhbGwodmFsdWUpID09PSB0eXBlZEFycmF5O1xuXHRcdFx0fSBjYXRjaCAoZSkgeyAvKiovIH1cblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gYW55VHJ1ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNUeXBlZEFycmF5KHZhbHVlKSB7XG5cdGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKCFoYXNUb1N0cmluZ1RhZykge1xuXHRcdHZhciB0YWcgPSAkc2xpY2UoJHRvU3RyaW5nKHZhbHVlKSwgOCwgLTEpO1xuXHRcdHJldHVybiAkaW5kZXhPZih0eXBlZEFycmF5cywgdGFnKSA+IC0xO1xuXHR9XG5cdGlmICghZ09QRCkgeyByZXR1cm4gZmFsc2U7IH1cblx0cmV0dXJuIHRyeVR5cGVkQXJyYXlzKHZhbHVlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBmb3JFYWNoID0gcmVxdWlyZSgnZm9yZWFjaCcpO1xudmFyIGF2YWlsYWJsZVR5cGVkQXJyYXlzID0gcmVxdWlyZSgnYXZhaWxhYmxlLXR5cGVkLWFycmF5cycpO1xudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2VzLWFic3RyYWN0L2hlbHBlcnMvY2FsbEJvdW5kJyk7XG5cbnZhciAkdG9TdHJpbmcgPSBjYWxsQm91bmQoJ09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcnKTtcbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xudmFyIGhhc1RvU3RyaW5nVGFnID0gaGFzU3ltYm9scyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJztcblxudmFyIHR5cGVkQXJyYXlzID0gYXZhaWxhYmxlVHlwZWRBcnJheXMoKTtcblxudmFyICRzbGljZSA9IGNhbGxCb3VuZCgnU3RyaW5nLnByb3RvdHlwZS5zbGljZScpO1xudmFyIHRvU3RyVGFncyA9IHt9O1xudmFyIGdPUEQgPSByZXF1aXJlKCdlcy1hYnN0cmFjdC9oZWxwZXJzL2dldE93blByb3BlcnR5RGVzY3JpcHRvcicpO1xudmFyIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mOyAvLyByZXF1aXJlKCdnZXRwcm90b3R5cGVvZicpO1xuaWYgKGhhc1RvU3RyaW5nVGFnICYmIGdPUEQgJiYgZ2V0UHJvdG90eXBlT2YpIHtcblx0Zm9yRWFjaCh0eXBlZEFycmF5cywgZnVuY3Rpb24gKHR5cGVkQXJyYXkpIHtcblx0XHRpZiAodHlwZW9mIGdsb2JhbFt0eXBlZEFycmF5XSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dmFyIGFyciA9IG5ldyBnbG9iYWxbdHlwZWRBcnJheV0oKTtcblx0XHRcdGlmICghKFN5bWJvbC50b1N0cmluZ1RhZyBpbiBhcnIpKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFdmFsRXJyb3IoJ3RoaXMgZW5naW5lIGhhcyBzdXBwb3J0IGZvciBTeW1ib2wudG9TdHJpbmdUYWcsIGJ1dCAnICsgdHlwZWRBcnJheSArICcgZG9lcyBub3QgaGF2ZSB0aGUgcHJvcGVydHkhIFBsZWFzZSByZXBvcnQgdGhpcy4nKTtcblx0XHRcdH1cblx0XHRcdHZhciBwcm90byA9IGdldFByb3RvdHlwZU9mKGFycik7XG5cdFx0XHR2YXIgZGVzY3JpcHRvciA9IGdPUEQocHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0XHRpZiAoIWRlc2NyaXB0b3IpIHtcblx0XHRcdFx0dmFyIHN1cGVyUHJvdG8gPSBnZXRQcm90b3R5cGVPZihwcm90byk7XG5cdFx0XHRcdGRlc2NyaXB0b3IgPSBnT1BEKHN1cGVyUHJvdG8sIFN5bWJvbC50b1N0cmluZ1RhZyk7XG5cdFx0XHR9XG5cdFx0XHR0b1N0clRhZ3NbdHlwZWRBcnJheV0gPSBkZXNjcmlwdG9yLmdldDtcblx0XHR9XG5cdH0pO1xufVxuXG52YXIgdHJ5VHlwZWRBcnJheXMgPSBmdW5jdGlvbiB0cnlBbGxUeXBlZEFycmF5cyh2YWx1ZSkge1xuXHR2YXIgZm91bmROYW1lID0gZmFsc2U7XG5cdGZvckVhY2godG9TdHJUYWdzLCBmdW5jdGlvbiAoZ2V0dGVyLCB0eXBlZEFycmF5KSB7XG5cdFx0aWYgKCFmb3VuZE5hbWUpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHZhciBuYW1lID0gZ2V0dGVyLmNhbGwodmFsdWUpO1xuXHRcdFx0XHRpZiAobmFtZSA9PT0gdHlwZWRBcnJheSkge1xuXHRcdFx0XHRcdGZvdW5kTmFtZSA9IG5hbWU7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHt9XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGZvdW5kTmFtZTtcbn07XG5cbnZhciBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCdpcy10eXBlZC1hcnJheScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoaWNoVHlwZWRBcnJheSh2YWx1ZSkge1xuXHRpZiAoIWlzVHlwZWRBcnJheSh2YWx1ZSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICghaGFzVG9TdHJpbmdUYWcpIHsgcmV0dXJuICRzbGljZSgkdG9TdHJpbmcodmFsdWUpLCA4LCAtMSk7IH1cblx0cmV0dXJuIHRyeVR5cGVkQXJyYXlzKHZhbHVlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbHNcblx0QWdncmVnYXRlRXJyb3IsXG5cdEF0b21pY3MsXG5cdEZpbmFsaXphdGlvblJlZ2lzdHJ5LFxuXHRTaGFyZWRBcnJheUJ1ZmZlcixcblx0V2Vha1JlZixcbiovXG5cbnZhciB1bmRlZmluZWQ7XG5cbnZhciAkU3ludGF4RXJyb3IgPSBTeW50YXhFcnJvcjtcbnZhciAkRnVuY3Rpb24gPSBGdW5jdGlvbjtcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbnZhciBnZXRFdmFsbGVkQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZXhwcmVzc2lvblN5bnRheCkge1xuXHR0cnkge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuXHRcdHJldHVybiBGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7IHJldHVybiAoJyArIGV4cHJlc3Npb25TeW50YXggKyAnKS5jb25zdHJ1Y3RvcjsnKSgpO1xuXHR9IGNhdGNoIChlKSB7fVxufTtcblxudmFyICRnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbmlmICgkZ09QRCkge1xuXHR0cnkge1xuXHRcdCRnT1BEKHt9LCAnJyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQkZ09QRCA9IG51bGw7IC8vIHRoaXMgaXMgSUUgOCwgd2hpY2ggaGFzIGEgYnJva2VuIGdPUERcblx0fVxufVxuXG52YXIgdGhyb3dUeXBlRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdHRocm93IG5ldyAkVHlwZUVycm9yKCk7XG59O1xudmFyIFRocm93VHlwZUVycm9yID0gJGdPUERcblx0PyAoZnVuY3Rpb24gKCkge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zLCBuby1jYWxsZXIsIG5vLXJlc3RyaWN0ZWQtcHJvcGVydGllc1xuXHRcdFx0YXJndW1lbnRzLmNhbGxlZTsgLy8gSUUgOCBkb2VzIG5vdCB0aHJvdyBoZXJlXG5cdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0fSBjYXRjaCAoY2FsbGVlVGhyb3dzKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBJRSA4IHRocm93cyBvbiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGFyZ3VtZW50cywgJycpXG5cdFx0XHRcdHJldHVybiAkZ09QRChhcmd1bWVudHMsICdjYWxsZWUnKS5nZXQ7XG5cdFx0XHR9IGNhdGNoIChnT1BEdGhyb3dzKSB7XG5cdFx0XHRcdHJldHVybiB0aHJvd1R5cGVFcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH0oKSlcblx0OiB0aHJvd1R5cGVFcnJvcjtcblxudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scycpKCk7XG5cbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5fX3Byb3RvX187IH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cblxudmFyIGFzeW5jR2VuRnVuY3Rpb24gPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uKiAoKSB7fScpO1xudmFyIGFzeW5jR2VuRnVuY3Rpb25Qcm90b3R5cGUgPSBhc3luY0dlbkZ1bmN0aW9uID8gYXN5bmNHZW5GdW5jdGlvbi5wcm90b3R5cGUgOiB1bmRlZmluZWQ7XG52YXIgYXN5bmNHZW5Qcm90b3R5cGUgPSBhc3luY0dlbkZ1bmN0aW9uUHJvdG90eXBlID8gYXN5bmNHZW5GdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgOiB1bmRlZmluZWQ7XG5cbnZhciBUeXBlZEFycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8oVWludDhBcnJheSk7XG5cbnZhciBJTlRSSU5TSUNTID0ge1xuXHQnJUFnZ3JlZ2F0ZUVycm9yJSc6IHR5cGVvZiBBZ2dyZWdhdGVFcnJvciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBZ2dyZWdhdGVFcnJvcixcblx0JyVBcnJheSUnOiBBcnJheSxcblx0JyVBcnJheUJ1ZmZlciUnOiB0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXJyYXlCdWZmZXIsXG5cdCclQXJyYXlJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSA6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Zyb21TeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnVuY3Rpb24lJzogZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiAoKSB7fScpLFxuXHQnJUFzeW5jR2VuZXJhdG9yJSc6IGFzeW5jR2VuRnVuY3Rpb25Qcm90b3R5cGUsXG5cdCclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnOiBhc3luY0dlbkZ1bmN0aW9uLFxuXHQnJUFzeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogYXN5bmNHZW5Qcm90b3R5cGUgPyBnZXRQcm90byhhc3luY0dlblByb3RvdHlwZSkgOiB1bmRlZmluZWQsXG5cdCclQXRvbWljcyUnOiB0eXBlb2YgQXRvbWljcyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBdG9taWNzLFxuXHQnJUJpZ0ludCUnOiB0eXBlb2YgQmlnSW50ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEJpZ0ludCxcblx0JyVCb29sZWFuJSc6IEJvb2xlYW4sXG5cdCclRGF0YVZpZXclJzogdHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IERhdGFWaWV3LFxuXHQnJURhdGUlJzogRGF0ZSxcblx0JyVkZWNvZGVVUkklJzogZGVjb2RlVVJJLFxuXHQnJWRlY29kZVVSSUNvbXBvbmVudCUnOiBkZWNvZGVVUklDb21wb25lbnQsXG5cdCclZW5jb2RlVVJJJSc6IGVuY29kZVVSSSxcblx0JyVlbmNvZGVVUklDb21wb25lbnQlJzogZW5jb2RlVVJJQ29tcG9uZW50LFxuXHQnJUVycm9yJSc6IEVycm9yLFxuXHQnJWV2YWwlJzogZXZhbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXG5cdCclRXZhbEVycm9yJSc6IEV2YWxFcnJvcixcblx0JyVGbG9hdDMyQXJyYXklJzogdHlwZW9mIEZsb2F0MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDMyQXJyYXksXG5cdCclRmxvYXQ2NEFycmF5JSc6IHR5cGVvZiBGbG9hdDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQ2NEFycmF5LFxuXHQnJUZpbmFsaXphdGlvblJlZ2lzdHJ5JSc6IHR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGaW5hbGl6YXRpb25SZWdpc3RyeSxcblx0JyVGdW5jdGlvbiUnOiAkRnVuY3Rpb24sXG5cdCclR2VuZXJhdG9yRnVuY3Rpb24lJzogZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdmdW5jdGlvbiogKCkge30nKSxcblx0JyVJbnQ4QXJyYXklJzogdHlwZW9mIEludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQ4QXJyYXksXG5cdCclSW50MTZBcnJheSUnOiB0eXBlb2YgSW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQxNkFycmF5LFxuXHQnJUludDMyQXJyYXklJzogdHlwZW9mIEludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogSW50MzJBcnJheSxcblx0JyVpc0Zpbml0ZSUnOiBpc0Zpbml0ZSxcblx0JyVpc05hTiUnOiBpc05hTixcblx0JyVJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzID8gZ2V0UHJvdG8oZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSkgOiB1bmRlZmluZWQsXG5cdCclSlNPTiUnOiB0eXBlb2YgSlNPTiA9PT0gJ29iamVjdCcgPyBKU09OIDogdW5kZWZpbmVkLFxuXHQnJU1hcCUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IE1hcCxcblx0JyVNYXBJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgTWFwID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBNYXAoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJU1hdGglJzogTWF0aCxcblx0JyVOdW1iZXIlJzogTnVtYmVyLFxuXHQnJU9iamVjdCUnOiBPYmplY3QsXG5cdCclcGFyc2VGbG9hdCUnOiBwYXJzZUZsb2F0LFxuXHQnJXBhcnNlSW50JSc6IHBhcnNlSW50LFxuXHQnJVByb21pc2UlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZSxcblx0JyVQcm94eSUnOiB0eXBlb2YgUHJveHkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJveHksXG5cdCclUmFuZ2VFcnJvciUnOiBSYW5nZUVycm9yLFxuXHQnJVJlZmVyZW5jZUVycm9yJSc6IFJlZmVyZW5jZUVycm9yLFxuXHQnJVJlZmxlY3QlJzogdHlwZW9mIFJlZmxlY3QgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUmVmbGVjdCxcblx0JyVSZWdFeHAlJzogUmVnRXhwLFxuXHQnJVNldCUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNldCxcblx0JyVTZXRJdGVyYXRvclByb3RvdHlwZSUnOiB0eXBlb2YgU2V0ID09PSAndW5kZWZpbmVkJyB8fCAhaGFzU3ltYm9scyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBTZXQoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyJSc6IHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTaGFyZWRBcnJheUJ1ZmZlcixcblx0JyVTdHJpbmclJzogU3RyaW5nLFxuXHQnJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90bygnJ1tTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJVN5bWJvbCUnOiBoYXNTeW1ib2xzID8gU3ltYm9sIDogdW5kZWZpbmVkLFxuXHQnJVN5bnRheEVycm9yJSc6ICRTeW50YXhFcnJvcixcblx0JyVUaHJvd1R5cGVFcnJvciUnOiBUaHJvd1R5cGVFcnJvcixcblx0JyVUeXBlZEFycmF5JSc6IFR5cGVkQXJyYXksXG5cdCclVHlwZUVycm9yJSc6ICRUeXBlRXJyb3IsXG5cdCclVWludDhBcnJheSUnOiB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OEFycmF5LFxuXHQnJVVpbnQ4Q2xhbXBlZEFycmF5JSc6IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OENsYW1wZWRBcnJheSxcblx0JyVVaW50MTZBcnJheSUnOiB0eXBlb2YgVWludDE2QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDE2QXJyYXksXG5cdCclVWludDMyQXJyYXklJzogdHlwZW9mIFVpbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQzMkFycmF5LFxuXHQnJVVSSUVycm9yJSc6IFVSSUVycm9yLFxuXHQnJVdlYWtNYXAlJzogdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha01hcCxcblx0JyVXZWFrUmVmJSc6IHR5cGVvZiBXZWFrUmVmID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtSZWYsXG5cdCclV2Vha1NldCUnOiB0eXBlb2YgV2Vha1NldCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrU2V0XG59O1xuXG52YXIgTEVHQUNZX0FMSUFTRVMgPSB7XG5cdCclQXJyYXlCdWZmZXJQcm90b3R5cGUlJzogWydBcnJheUJ1ZmZlcicsICdwcm90b3R5cGUnXSxcblx0JyVBcnJheVByb3RvdHlwZSUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG9fZW50cmllcyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdlbnRyaWVzJ10sXG5cdCclQXJyYXlQcm90b19mb3JFYWNoJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2ZvckVhY2gnXSxcblx0JyVBcnJheVByb3RvX2tleXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAna2V5cyddLFxuXHQnJUFycmF5UHJvdG9fdmFsdWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ3ZhbHVlcyddLFxuXHQnJUFzeW5jRnVuY3Rpb25Qcm90b3R5cGUlJzogWydBc3luY0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVBc3luY0dlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUJvb2xlYW5Qcm90b3R5cGUlJzogWydCb29sZWFuJywgJ3Byb3RvdHlwZSddLFxuXHQnJURhdGFWaWV3UHJvdG90eXBlJSc6IFsnRGF0YVZpZXcnLCAncHJvdG90eXBlJ10sXG5cdCclRGF0ZVByb3RvdHlwZSUnOiBbJ0RhdGUnLCAncHJvdG90eXBlJ10sXG5cdCclRXJyb3JQcm90b3R5cGUlJzogWydFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVFdmFsRXJyb3JQcm90b3R5cGUlJzogWydFdmFsRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQzMkFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZsb2F0NjRBcnJheVByb3RvdHlwZSUnOiBbJ0Zsb2F0NjRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvciUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQ4QXJyYXlQcm90b3R5cGUlJzogWydJbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ0ludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MzJBcnJheVByb3RvdHlwZSUnOiBbJ0ludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSlNPTlBhcnNlJSc6IFsnSlNPTicsICdwYXJzZSddLFxuXHQnJUpTT05TdHJpbmdpZnklJzogWydKU09OJywgJ3N0cmluZ2lmeSddLFxuXHQnJU1hcFByb3RvdHlwZSUnOiBbJ01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVOdW1iZXJQcm90b3R5cGUlJzogWydOdW1iZXInLCAncHJvdG90eXBlJ10sXG5cdCclT2JqZWN0UHJvdG90eXBlJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZSddLFxuXHQnJU9ialByb3RvX3RvU3RyaW5nJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZScsICd0b1N0cmluZyddLFxuXHQnJU9ialByb3RvX3ZhbHVlT2YlJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3ZhbHVlT2YnXSxcblx0JyVQcm9taXNlUHJvdG90eXBlJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnXSxcblx0JyVQcm9taXNlUHJvdG9fdGhlbiUnOiBbJ1Byb21pc2UnLCAncHJvdG90eXBlJywgJ3RoZW4nXSxcblx0JyVQcm9taXNlX2FsbCUnOiBbJ1Byb21pc2UnLCAnYWxsJ10sXG5cdCclUHJvbWlzZV9yZWplY3QlJzogWydQcm9taXNlJywgJ3JlamVjdCddLFxuXHQnJVByb21pc2VfcmVzb2x2ZSUnOiBbJ1Byb21pc2UnLCAncmVzb2x2ZSddLFxuXHQnJVJhbmdlRXJyb3JQcm90b3R5cGUlJzogWydSYW5nZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVJlZmVyZW5jZUVycm9yUHJvdG90eXBlJSc6IFsnUmVmZXJlbmNlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVnRXhwUHJvdG90eXBlJSc6IFsnUmVnRXhwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVNldFByb3RvdHlwZSUnOiBbJ1NldCcsICdwcm90b3R5cGUnXSxcblx0JyVTaGFyZWRBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ1NoYXJlZEFycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN0cmluZ1Byb3RvdHlwZSUnOiBbJ1N0cmluZycsICdwcm90b3R5cGUnXSxcblx0JyVTeW1ib2xQcm90b3R5cGUlJzogWydTeW1ib2wnLCAncHJvdG90eXBlJ10sXG5cdCclU3ludGF4RXJyb3JQcm90b3R5cGUlJzogWydTeW50YXhFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlZEFycmF5UHJvdG90eXBlJSc6IFsnVHlwZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlRXJyb3JQcm90b3R5cGUlJzogWydUeXBlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhDbGFtcGVkQXJyYXlQcm90b3R5cGUlJzogWydVaW50OENsYW1wZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQxNkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnVWludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVVJJRXJyb3JQcm90b3R5cGUlJzogWydVUklFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrTWFwUHJvdG90eXBlJSc6IFsnV2Vha01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrU2V0UHJvdG90eXBlJSc6IFsnV2Vha1NldCcsICdwcm90b3R5cGUnXVxufTtcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnaGFzJyk7XG52YXIgJGNvbmNhdCA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBBcnJheS5wcm90b3R5cGUuY29uY2F0KTtcbnZhciAkc3BsaWNlQXBwbHkgPSBiaW5kLmNhbGwoRnVuY3Rpb24uYXBwbHksIEFycmF5LnByb3RvdHlwZS5zcGxpY2UpO1xudmFyICRyZXBsYWNlID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG5cbi8qIGFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbG9kYXNoL2xvZGFzaC9ibG9iLzQuMTcuMTUvZGlzdC9sb2Rhc2guanMjTDY3MzUtTDY3NDQgKi9cbnZhciByZVByb3BOYW1lID0gL1teJS5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwlJCkpL2c7XG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7IC8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IGZ1bmN0aW9uIHN0cmluZ1RvUGF0aChzdHJpbmcpIHtcblx0dmFyIHJlc3VsdCA9IFtdO1xuXHQkcmVwbGFjZShzdHJpbmcsIHJlUHJvcE5hbWUsIGZ1bmN0aW9uIChtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3ViU3RyaW5nKSB7XG5cdFx0cmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gcXVvdGUgPyAkcmVwbGFjZShzdWJTdHJpbmcsIHJlRXNjYXBlQ2hhciwgJyQxJykgOiBudW1iZXIgfHwgbWF0Y2g7XG5cdH0pO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcbi8qIGVuZCBhZGFwdGF0aW9uICovXG5cbnZhciBnZXRCYXNlSW50cmluc2ljID0gZnVuY3Rpb24gZ2V0QmFzZUludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0dmFyIGludHJpbnNpY05hbWUgPSBuYW1lO1xuXHR2YXIgYWxpYXM7XG5cdGlmIChoYXNPd24oTEVHQUNZX0FMSUFTRVMsIGludHJpbnNpY05hbWUpKSB7XG5cdFx0YWxpYXMgPSBMRUdBQ1lfQUxJQVNFU1tpbnRyaW5zaWNOYW1lXTtcblx0XHRpbnRyaW5zaWNOYW1lID0gJyUnICsgYWxpYXNbMF0gKyAnJSc7XG5cdH1cblxuXHRpZiAoaGFzT3duKElOVFJJTlNJQ1MsIGludHJpbnNpY05hbWUpKSB7XG5cdFx0dmFyIHZhbHVlID0gSU5UUklOU0lDU1tpbnRyaW5zaWNOYW1lXTtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyAmJiAhYWxsb3dNaXNzaW5nKSB7XG5cdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCBpcyBub3QgYXZhaWxhYmxlLiBQbGVhc2UgZmlsZSBhbiBpc3N1ZSEnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0YWxpYXM6IGFsaWFzLFxuXHRcdFx0bmFtZTogaW50cmluc2ljTmFtZSxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdH1cblxuXHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGRvZXMgbm90IGV4aXN0IScpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBHZXRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycgfHwgbmFtZS5sZW5ndGggPT09IDApIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignaW50cmluc2ljIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgdHlwZW9mIGFsbG93TWlzc2luZyAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1wiYWxsb3dNaXNzaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBhIGJvb2xlYW4nKTtcblx0fVxuXG5cdHZhciBwYXJ0cyA9IHN0cmluZ1RvUGF0aChuYW1lKTtcblx0dmFyIGludHJpbnNpY0Jhc2VOYW1lID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzWzBdIDogJyc7XG5cblx0dmFyIGludHJpbnNpYyA9IGdldEJhc2VJbnRyaW5zaWMoJyUnICsgaW50cmluc2ljQmFzZU5hbWUgKyAnJScsIGFsbG93TWlzc2luZyk7XG5cdHZhciBpbnRyaW5zaWNSZWFsTmFtZSA9IGludHJpbnNpYy5uYW1lO1xuXHR2YXIgdmFsdWUgPSBpbnRyaW5zaWMudmFsdWU7XG5cdHZhciBza2lwRnVydGhlckNhY2hpbmcgPSBmYWxzZTtcblxuXHR2YXIgYWxpYXMgPSBpbnRyaW5zaWMuYWxpYXM7XG5cdGlmIChhbGlhcykge1xuXHRcdGludHJpbnNpY0Jhc2VOYW1lID0gYWxpYXNbMF07XG5cdFx0JHNwbGljZUFwcGx5KHBhcnRzLCAkY29uY2F0KFswLCAxXSwgYWxpYXMpKTtcblx0fVxuXG5cdGZvciAodmFyIGkgPSAxLCBpc093biA9IHRydWU7IGkgPCBwYXJ0cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdHZhciBwYXJ0ID0gcGFydHNbaV07XG5cdFx0aWYgKHBhcnQgPT09ICdjb25zdHJ1Y3RvcicgfHwgIWlzT3duKSB7XG5cdFx0XHRza2lwRnVydGhlckNhY2hpbmcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGludHJpbnNpY0Jhc2VOYW1lICs9ICcuJyArIHBhcnQ7XG5cdFx0aW50cmluc2ljUmVhbE5hbWUgPSAnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJztcblxuXHRcdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljUmVhbE5hbWUpKSB7XG5cdFx0XHR2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdO1xuXHRcdH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuXHRcdFx0aWYgKCRnT1BEICYmIChpICsgMSkgPj0gcGFydHMubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBkZXNjID0gJGdPUEQodmFsdWUsIHBhcnQpO1xuXHRcdFx0XHRpc093biA9ICEhZGVzYztcblxuXHRcdFx0XHRpZiAoIWFsbG93TWlzc2luZyAmJiAhKHBhcnQgaW4gdmFsdWUpKSB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2Jhc2UgaW50cmluc2ljIGZvciAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgdGhlIHByb3BlcnR5IGlzIG5vdCBhdmFpbGFibGUuJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gQnkgY29udmVudGlvbiwgd2hlbiBhIGRhdGEgcHJvcGVydHkgaXMgY29udmVydGVkIHRvIGFuIGFjY2Vzc29yXG5cdFx0XHRcdC8vIHByb3BlcnR5IHRvIGVtdWxhdGUgYSBkYXRhIHByb3BlcnR5IHRoYXQgZG9lcyBub3Qgc3VmZmVyIGZyb21cblx0XHRcdFx0Ly8gdGhlIG92ZXJyaWRlIG1pc3Rha2UsIHRoYXQgYWNjZXNzb3IncyBnZXR0ZXIgaXMgbWFya2VkIHdpdGhcblx0XHRcdFx0Ly8gYW4gYG9yaWdpbmFsVmFsdWVgIHByb3BlcnR5LiBIZXJlLCB3aGVuIHdlIGRldGVjdCB0aGlzLCB3ZVxuXHRcdFx0XHQvLyB1cGhvbGQgdGhlIGlsbHVzaW9uIGJ5IHByZXRlbmRpbmcgdG8gc2VlIHRoYXQgb3JpZ2luYWwgZGF0YVxuXHRcdFx0XHQvLyBwcm9wZXJ0eSwgaS5lLiwgcmV0dXJuaW5nIHRoZSB2YWx1ZSByYXRoZXIgdGhhbiB0aGUgZ2V0dGVyXG5cdFx0XHRcdC8vIGl0c2VsZi5cblx0XHRcdFx0aWYgKGlzT3duICYmICdnZXQnIGluIGRlc2MgJiYgISgnb3JpZ2luYWxWYWx1ZScgaW4gZGVzYy5nZXQpKSB7XG5cdFx0XHRcdFx0dmFsdWUgPSBkZXNjLmdldDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpc093biA9IGhhc093bih2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdHZhbHVlID0gdmFsdWVbcGFydF07XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpc093biAmJiAhc2tpcEZ1cnRoZXJDYWNoaW5nKSB7XG5cdFx0XHRcdElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyICRhcHBseSA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseSUnKTtcbnZhciAkY2FsbCA9IEdldEludHJpbnNpYygnJUZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsJScpO1xudmFyICRyZWZsZWN0QXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVSZWZsZWN0LmFwcGx5JScsIHRydWUpIHx8IGJpbmQuY2FsbCgkY2FsbCwgJGFwcGx5KTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IEdldEludHJpbnNpYygnJU9iamVjdC5kZWZpbmVQcm9wZXJ0eSUnLCB0cnVlKTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdCRkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IHZhbHVlOiAxIH0pO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZGVmaW5lUHJvcGVydHlcblx0XHQkZGVmaW5lUHJvcGVydHkgPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJpbmQoKSB7XG5cdHJldHVybiAkcmVmbGVjdEFwcGx5KGJpbmQsICRjYWxsLCBhcmd1bWVudHMpO1xufTtcblxudmFyIGFwcGx5QmluZCA9IGZ1bmN0aW9uIGFwcGx5QmluZCgpIHtcblx0cmV0dXJuICRyZWZsZWN0QXBwbHkoYmluZCwgJGFwcGx5LCBhcmd1bWVudHMpO1xufTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHQkZGVmaW5lUHJvcGVydHkobW9kdWxlLmV4cG9ydHMsICdhcHBseScsIHsgdmFsdWU6IGFwcGx5QmluZCB9KTtcbn0gZWxzZSB7XG5cdG1vZHVsZS5leHBvcnRzLmFwcGx5ID0gYXBwbHlCaW5kO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgY2FsbEJpbmQgPSByZXF1aXJlKCcuLycpO1xuXG52YXIgJGluZGV4T2YgPSBjYWxsQmluZChHZXRJbnRyaW5zaWMoJ1N0cmluZy5wcm90b3R5cGUuaW5kZXhPZicpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQm91bmRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWMgPSBHZXRJbnRyaW5zaWMobmFtZSwgISFhbGxvd01pc3NpbmcpO1xuXHRpZiAodHlwZW9mIGludHJpbnNpYyA9PT0gJ2Z1bmN0aW9uJyAmJiAkaW5kZXhPZihuYW1lLCAnLnByb3RvdHlwZS4nKSA+IC0xKSB7XG5cdFx0cmV0dXJuIGNhbGxCaW5kKGludHJpbnNpYyk7XG5cdH1cblx0cmV0dXJuIGludHJpbnNpYztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIG1vZGlmaWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNi1zaGltXG52YXIga2V5cyA9IHJlcXVpcmUoJ29iamVjdC1rZXlzJyk7XG52YXIgY2FuQmVPYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG5cdHJldHVybiB0eXBlb2Ygb2JqICE9PSAndW5kZWZpbmVkJyAmJiBvYmogIT09IG51bGw7XG59O1xudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scy9zaGFtcycpKCk7XG52YXIgY2FsbEJvdW5kID0gcmVxdWlyZSgnY2FsbC1iaW5kL2NhbGxCb3VuZCcpO1xudmFyIHRvT2JqZWN0ID0gT2JqZWN0O1xudmFyICRwdXNoID0gY2FsbEJvdW5kKCdBcnJheS5wcm90b3R5cGUucHVzaCcpO1xudmFyICRwcm9wSXNFbnVtZXJhYmxlID0gY2FsbEJvdW5kKCdPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlJyk7XG52YXIgb3JpZ2luYWxHZXRTeW1ib2xzID0gaGFzU3ltYm9scyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgOiBudWxsO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlMSkge1xuXHRpZiAoIWNhbkJlT2JqZWN0KHRhcmdldCkpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcigndGFyZ2V0IG11c3QgYmUgYW4gb2JqZWN0Jyk7IH1cblx0dmFyIG9ialRhcmdldCA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzLCBzb3VyY2UsIGksIHByb3BzLCBzeW1zLCB2YWx1ZSwga2V5O1xuXHRmb3IgKHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgKytzKSB7XG5cdFx0c291cmNlID0gdG9PYmplY3QoYXJndW1lbnRzW3NdKTtcblx0XHRwcm9wcyA9IGtleXMoc291cmNlKTtcblx0XHR2YXIgZ2V0U3ltYm9scyA9IGhhc1N5bWJvbHMgJiYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgfHwgb3JpZ2luYWxHZXRTeW1ib2xzKTtcblx0XHRpZiAoZ2V0U3ltYm9scykge1xuXHRcdFx0c3ltcyA9IGdldFN5bWJvbHMoc291cmNlKTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBzeW1zLmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdGtleSA9IHN5bXNbaV07XG5cdFx0XHRcdGlmICgkcHJvcElzRW51bWVyYWJsZShzb3VyY2UsIGtleSkpIHtcblx0XHRcdFx0XHQkcHVzaChwcm9wcywga2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyArK2kpIHtcblx0XHRcdGtleSA9IHByb3BzW2ldO1xuXHRcdFx0dmFsdWUgPSBzb3VyY2Vba2V5XTtcblx0XHRcdGlmICgkcHJvcElzRW51bWVyYWJsZShzb3VyY2UsIGtleSkpIHtcblx0XHRcdFx0b2JqVGFyZ2V0W2tleV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIG9ialRhcmdldDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbXBsZW1lbnRhdGlvbiA9IHJlcXVpcmUoJy4vaW1wbGVtZW50YXRpb24nKTtcblxudmFyIGxhY2tzUHJvcGVyRW51bWVyYXRpb25PcmRlciA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdC8qXG5cdCAqIHY4LCBzcGVjaWZpY2FsbHkgaW4gbm9kZSA0LngsIGhhcyBhIGJ1ZyB3aXRoIGluY29ycmVjdCBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlclxuXHQgKiBub3RlOiB0aGlzIGRvZXMgbm90IGRldGVjdCB0aGUgYnVnIHVubGVzcyB0aGVyZSdzIDIwIGNoYXJhY3RlcnNcblx0ICovXG5cdHZhciBzdHIgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuXHR2YXIgbGV0dGVycyA9IHN0ci5zcGxpdCgnJyk7XG5cdHZhciBtYXAgPSB7fTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZXR0ZXJzLmxlbmd0aDsgKytpKSB7XG5cdFx0bWFwW2xldHRlcnNbaV1dID0gbGV0dGVyc1tpXTtcblx0fVxuXHR2YXIgb2JqID0gT2JqZWN0LmFzc2lnbih7fSwgbWFwKTtcblx0dmFyIGFjdHVhbCA9ICcnO1xuXHRmb3IgKHZhciBrIGluIG9iaikge1xuXHRcdGFjdHVhbCArPSBrO1xuXHR9XG5cdHJldHVybiBzdHIgIT09IGFjdHVhbDtcbn07XG5cbnZhciBhc3NpZ25IYXNQZW5kaW5nRXhjZXB0aW9ucyA9IGZ1bmN0aW9uICgpIHtcblx0aWYgKCFPYmplY3QuYXNzaWduIHx8ICFPYmplY3QucHJldmVudEV4dGVuc2lvbnMpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Lypcblx0ICogRmlyZWZveCAzNyBzdGlsbCBoYXMgXCJwZW5kaW5nIGV4Y2VwdGlvblwiIGxvZ2ljIGluIGl0cyBPYmplY3QuYXNzaWduIGltcGxlbWVudGF0aW9uLFxuXHQgKiB3aGljaCBpcyA3MiUgc2xvd2VyIHRoYW4gb3VyIHNoaW0sIGFuZCBGaXJlZm94IDQwJ3MgbmF0aXZlIGltcGxlbWVudGF0aW9uLlxuXHQgKi9cblx0dmFyIHRocm93ZXIgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnMoeyAxOiAyIH0pO1xuXHR0cnkge1xuXHRcdE9iamVjdC5hc3NpZ24odGhyb3dlciwgJ3h5Jyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXR1cm4gdGhyb3dlclsxXSA9PT0gJ3knO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0UG9seWZpbGwoKSB7XG5cdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdHJldHVybiBpbXBsZW1lbnRhdGlvbjtcblx0fVxuXHRpZiAobGFja3NQcm9wZXJFbnVtZXJhdGlvbk9yZGVyKCkpIHtcblx0XHRyZXR1cm4gaW1wbGVtZW50YXRpb247XG5cdH1cblx0aWYgKGFzc2lnbkhhc1BlbmRpbmdFeGNlcHRpb25zKCkpIHtcblx0XHRyZXR1cm4gaW1wbGVtZW50YXRpb247XG5cdH1cblx0cmV0dXJuIE9iamVjdC5hc3NpZ247XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBnZXRQb2x5ZmlsbCA9IHJlcXVpcmUoJy4vcG9seWZpbGwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGltQXNzaWduKCkge1xuXHR2YXIgcG9seWZpbGwgPSBnZXRQb2x5ZmlsbCgpO1xuXHRkZWZpbmUoXG5cdFx0T2JqZWN0LFxuXHRcdHsgYXNzaWduOiBwb2x5ZmlsbCB9LFxuXHRcdHsgYXNzaWduOiBmdW5jdGlvbiAoKSB7IHJldHVybiBPYmplY3QuYXNzaWduICE9PSBwb2x5ZmlsbDsgfSB9XG5cdCk7XG5cdHJldHVybiBwb2x5ZmlsbDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZpbmVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBjYWxsQmluZCA9IHJlcXVpcmUoJ2NhbGwtYmluZCcpO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG52YXIgZ2V0UG9seWZpbGwgPSByZXF1aXJlKCcuL3BvbHlmaWxsJyk7XG52YXIgc2hpbSA9IHJlcXVpcmUoJy4vc2hpbScpO1xuXG52YXIgcG9seWZpbGwgPSBjYWxsQmluZC5hcHBseShnZXRQb2x5ZmlsbCgpKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xudmFyIGJvdW5kID0gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlMSkge1xuXHRyZXR1cm4gcG9seWZpbGwoT2JqZWN0LCBhcmd1bWVudHMpO1xufTtcblxuZGVmaW5lUHJvcGVydGllcyhib3VuZCwge1xuXHRnZXRQb2x5ZmlsbDogZ2V0UG9seWZpbGwsXG5cdGltcGxlbWVudGF0aW9uOiBpbXBsZW1lbnRhdGlvbixcblx0c2hpbTogc2hpbVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gYm91bmQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBvYmplY3RLZXlzID0gcmVxdWlyZSgnb2JqZWN0LWtleXMnKTtcbnZhciBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJ2lzLWFyZ3VtZW50cycpO1xudmFyIGlzID0gcmVxdWlyZSgnb2JqZWN0LWlzJyk7XG52YXIgaXNSZWdleCA9IHJlcXVpcmUoJ2lzLXJlZ2V4Jyk7XG52YXIgZmxhZ3MgPSByZXF1aXJlKCdyZWdleHAucHJvdG90eXBlLmZsYWdzJyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcbnZhciBpc0RhdGUgPSByZXF1aXJlKCdpcy1kYXRlLW9iamVjdCcpO1xudmFyIHdoaWNoQm94ZWRQcmltaXRpdmUgPSByZXF1aXJlKCd3aGljaC1ib3hlZC1wcmltaXRpdmUnKTtcbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdlcy1hYnN0cmFjdC9HZXRJbnRyaW5zaWMnKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdlcy1hYnN0cmFjdC9oZWxwZXJzL2NhbGxCb3VuZCcpO1xudmFyIHdoaWNoQ29sbGVjdGlvbiA9IHJlcXVpcmUoJ3doaWNoLWNvbGxlY3Rpb24nKTtcbnZhciBnZXRJdGVyYXRvciA9IHJlcXVpcmUoJ2VzLWdldC1pdGVyYXRvcicpO1xudmFyIGdldFNpZGVDaGFubmVsID0gcmVxdWlyZSgnc2lkZS1jaGFubmVsJyk7XG52YXIgd2hpY2hUeXBlZEFycmF5ID0gcmVxdWlyZSgnd2hpY2gtdHlwZWQtYXJyYXknKTtcbnZhciBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QuYXNzaWduJyk7XG5cbnZhciAkZ2V0VGltZSA9IGNhbGxCb3VuZCgnRGF0ZS5wcm90b3R5cGUuZ2V0VGltZScpO1xudmFyIGdQTyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbnZhciAkb2JqVG9TdHJpbmcgPSBjYWxsQm91bmQoJ09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcnKTtcblxudmFyICRTZXQgPSBHZXRJbnRyaW5zaWMoJyVTZXQlJywgdHJ1ZSk7XG52YXIgJG1hcEhhcyA9IGNhbGxCb3VuZCgnTWFwLnByb3RvdHlwZS5oYXMnLCB0cnVlKTtcbnZhciAkbWFwR2V0ID0gY2FsbEJvdW5kKCdNYXAucHJvdG90eXBlLmdldCcsIHRydWUpO1xudmFyICRtYXBTaXplID0gY2FsbEJvdW5kKCdNYXAucHJvdG90eXBlLnNpemUnLCB0cnVlKTtcbnZhciAkc2V0QWRkID0gY2FsbEJvdW5kKCdTZXQucHJvdG90eXBlLmFkZCcsIHRydWUpO1xudmFyICRzZXREZWxldGUgPSBjYWxsQm91bmQoJ1NldC5wcm90b3R5cGUuZGVsZXRlJywgdHJ1ZSk7XG52YXIgJHNldEhhcyA9IGNhbGxCb3VuZCgnU2V0LnByb3RvdHlwZS5oYXMnLCB0cnVlKTtcbnZhciAkc2V0U2l6ZSA9IGNhbGxCb3VuZCgnU2V0LnByb3RvdHlwZS5zaXplJywgdHJ1ZSk7XG5cbi8vIHRha2VuIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2Jyb3dzZXJpZnkvY29tbW9uanMtYXNzZXJ0L2Jsb2IvYmJhODM4ZTliYTllMjhlZGYzMTI3Y2U2OTc0NjI0MjA4NTAyZjZiYy9pbnRlcm5hbC91dGlsL2NvbXBhcmlzb25zLmpzI0w0MDEtTDQxNFxuZnVuY3Rpb24gc2V0SGFzRXF1YWxFbGVtZW50KHNldCwgdmFsMSwgb3B0cywgY2hhbm5lbCkge1xuICB2YXIgaSA9IGdldEl0ZXJhdG9yKHNldCk7XG4gIHZhciByZXN1bHQ7XG4gIHdoaWxlICgocmVzdWx0ID0gaS5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGlmIChpbnRlcm5hbERlZXBFcXVhbCh2YWwxLCByZXN1bHQudmFsdWUsIG9wdHMsIGNoYW5uZWwpKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICAgIC8vIFJlbW92ZSB0aGUgbWF0Y2hpbmcgZWxlbWVudCB0byBtYWtlIHN1cmUgd2UgZG8gbm90IGNoZWNrIHRoYXQgYWdhaW4uXG4gICAgICAkc2V0RGVsZXRlKHNldCwgcmVzdWx0LnZhbHVlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLy8gdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYnJvd3NlcmlmeS9jb21tb25qcy1hc3NlcnQvYmxvYi9iYmE4MzhlOWJhOWUyOGVkZjMxMjdjZTY5NzQ2MjQyMDg1MDJmNmJjL2ludGVybmFsL3V0aWwvY29tcGFyaXNvbnMuanMjTDQxNi1MNDM5XG5mdW5jdGlvbiBmaW5kTG9vc2VNYXRjaGluZ1ByaW1pdGl2ZXMocHJpbSkge1xuICBpZiAodHlwZW9mIHByaW0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKHR5cGVvZiBwcmltID09PSAnb2JqZWN0JykgeyAvLyBPbmx5IHBhc3MgaW4gbnVsbCBhcyBvYmplY3QhXG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuICBpZiAodHlwZW9mIHByaW0gPT09ICdzeW1ib2wnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgcHJpbSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHByaW0gPT09ICdudW1iZXInKSB7XG4gICAgLy8gTG9vc2UgZXF1YWwgZW50cmllcyBleGlzdCBvbmx5IGlmIHRoZSBzdHJpbmcgaXMgcG9zc2libGUgdG8gY29udmVydCB0byBhIHJlZ3VsYXIgbnVtYmVyIGFuZCBub3QgTmFOLlxuICAgIHJldHVybiArcHJpbSA9PT0gK3ByaW07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8taW1wbGljaXQtY29lcmNpb25cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vYnJvd3NlcmlmeS9jb21tb25qcy1hc3NlcnQvYmxvYi9iYmE4MzhlOWJhOWUyOGVkZjMxMjdjZTY5NzQ2MjQyMDg1MDJmNmJjL2ludGVybmFsL3V0aWwvY29tcGFyaXNvbnMuanMjTDQ0OS1MNDYwXG5mdW5jdGlvbiBtYXBNaWdodEhhdmVMb29zZVByaW0oYSwgYiwgcHJpbSwgaXRlbSwgb3B0cywgY2hhbm5lbCkge1xuICB2YXIgYWx0VmFsdWUgPSBmaW5kTG9vc2VNYXRjaGluZ1ByaW1pdGl2ZXMocHJpbSk7XG4gIGlmIChhbHRWYWx1ZSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIGFsdFZhbHVlO1xuICB9XG4gIHZhciBjdXJCID0gJG1hcEdldChiLCBhbHRWYWx1ZSk7XG4gIHZhciBsb29zZU9wdHMgPSBhc3NpZ24oe30sIG9wdHMsIHsgc3RyaWN0OiBmYWxzZSB9KTtcbiAgaWYgKFxuICAgICh0eXBlb2YgY3VyQiA9PT0gJ3VuZGVmaW5lZCcgJiYgISRtYXBIYXMoYiwgYWx0VmFsdWUpKVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuICAgIHx8ICFpbnRlcm5hbERlZXBFcXVhbChpdGVtLCBjdXJCLCBsb29zZU9wdHMsIGNoYW5uZWwpXG4gICkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgcmV0dXJuICEkbWFwSGFzKGEsIGFsdFZhbHVlKSAmJiBpbnRlcm5hbERlZXBFcXVhbChpdGVtLCBjdXJCLCBsb29zZU9wdHMsIGNoYW5uZWwpO1xufVxuXG4vLyB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9icm93c2VyaWZ5L2NvbW1vbmpzLWFzc2VydC9ibG9iL2JiYTgzOGU5YmE5ZTI4ZWRmMzEyN2NlNjk3NDYyNDIwODUwMmY2YmMvaW50ZXJuYWwvdXRpbC9jb21wYXJpc29ucy5qcyNMNDQxLUw0NDdcbmZ1bmN0aW9uIHNldE1pZ2h0SGF2ZUxvb3NlUHJpbShhLCBiLCBwcmltKSB7XG4gIHZhciBhbHRWYWx1ZSA9IGZpbmRMb29zZU1hdGNoaW5nUHJpbWl0aXZlcyhwcmltKTtcbiAgaWYgKGFsdFZhbHVlICE9IG51bGwpIHtcbiAgICByZXR1cm4gYWx0VmFsdWU7XG4gIH1cblxuICByZXR1cm4gJHNldEhhcyhiLCBhbHRWYWx1ZSkgJiYgISRzZXRIYXMoYSwgYWx0VmFsdWUpO1xufVxuXG4vLyB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9icm93c2VyaWZ5L2NvbW1vbmpzLWFzc2VydC9ibG9iL2JiYTgzOGU5YmE5ZTI4ZWRmMzEyN2NlNjk3NDYyNDIwODUwMmY2YmMvaW50ZXJuYWwvdXRpbC9jb21wYXJpc29ucy5qcyNMNTE4LUw1MzNcbmZ1bmN0aW9uIG1hcEhhc0VxdWFsRW50cnkoc2V0LCBtYXAsIGtleTEsIGl0ZW0xLCBvcHRzLCBjaGFubmVsKSB7XG4gIHZhciBpID0gZ2V0SXRlcmF0b3Ioc2V0KTtcbiAgdmFyIHJlc3VsdDtcbiAgdmFyIGtleTI7XG4gIHdoaWxlICgocmVzdWx0ID0gaS5uZXh0KCkpICYmICFyZXN1bHQuZG9uZSkge1xuICAgIGtleTIgPSByZXN1bHQudmFsdWU7XG4gICAgaWYgKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgICBpbnRlcm5hbERlZXBFcXVhbChrZXkxLCBrZXkyLCBvcHRzLCBjaGFubmVsKVxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgICAmJiBpbnRlcm5hbERlZXBFcXVhbChpdGVtMSwgJG1hcEdldChtYXAsIGtleTIpLCBvcHRzLCBjaGFubmVsKVxuICAgICkge1xuICAgICAgJHNldERlbGV0ZShzZXQsIGtleTIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpbnRlcm5hbERlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBvcHRpb25zLCBjaGFubmVsKSB7XG4gIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcblxuICAvLyA3LjEuIEFsbCBpZGVudGljYWwgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbiAgaWYgKG9wdHMuc3RyaWN0ID8gaXMoYWN0dWFsLCBleHBlY3RlZCkgOiBhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB2YXIgYWN0dWFsQm94ZWQgPSB3aGljaEJveGVkUHJpbWl0aXZlKGFjdHVhbCk7XG4gIHZhciBleHBlY3RlZEJveGVkID0gd2hpY2hCb3hlZFByaW1pdGl2ZShleHBlY3RlZCk7XG4gIGlmIChhY3R1YWxCb3hlZCAhPT0gZXhwZWN0ZWRCb3hlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIDcuMy4gT3RoZXIgcGFpcnMgdGhhdCBkbyBub3QgYm90aCBwYXNzIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JywgZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSA9PS5cbiAgaWYgKCFhY3R1YWwgfHwgIWV4cGVjdGVkIHx8ICh0eXBlb2YgYWN0dWFsICE9PSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwZWN0ZWQgIT09ICdvYmplY3QnKSkge1xuICAgIHJldHVybiBvcHRzLnN0cmljdCA/IGlzKGFjdHVhbCwgZXhwZWN0ZWQpIDogYWN0dWFsID09IGV4cGVjdGVkOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICB9XG5cbiAgLypcbiAgICogNy40LiBGb3IgYWxsIG90aGVyIE9iamVjdCBwYWlycywgaW5jbHVkaW5nIEFycmF5IG9iamVjdHMsIGVxdWl2YWxlbmNlIGlzXG4gICAqIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuICAgKiB3aXRoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCksIHRoZSBzYW1lIHNldCBvZiBrZXlzXG4gICAqIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLCBlcXVpdmFsZW50IHZhbHVlcyBmb3IgZXZlcnlcbiAgICogY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcbiAgICogYWNjb3VudHMgZm9yIGJvdGggbmFtZWQgYW5kIGluZGV4ZWQgcHJvcGVydGllcyBvbiBBcnJheXMuXG4gICAqL1xuICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2NvbW1pdC9kM2FhZmQwMmVmZDNhNDAzZDY0NmEzMDQ0YWRjZjE0ZTYzYTg4ZDMyIGZvciBtZW1vcy9jaGFubmVsIGluc3BpcmF0aW9uXG5cbiAgdmFyIGhhc0FjdHVhbCA9IGNoYW5uZWwuaGFzKGFjdHVhbCk7XG4gIHZhciBoYXNFeHBlY3RlZCA9IGNoYW5uZWwuaGFzKGV4cGVjdGVkKTtcbiAgdmFyIHNlbnRpbmVsO1xuICBpZiAoaGFzQWN0dWFsICYmIGhhc0V4cGVjdGVkKSB7XG4gICAgaWYgKGNoYW5uZWwuZ2V0KGFjdHVhbCkgPT09IGNoYW5uZWwuZ2V0KGV4cGVjdGVkKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHNlbnRpbmVsID0ge307XG4gIH1cbiAgaWYgKCFoYXNBY3R1YWwpIHsgY2hhbm5lbC5zZXQoYWN0dWFsLCBzZW50aW5lbCk7IH1cbiAgaWYgKCFoYXNFeHBlY3RlZCkgeyBjaGFubmVsLnNldChleHBlY3RlZCwgc2VudGluZWwpOyB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gIHJldHVybiBvYmpFcXVpdihhY3R1YWwsIGV4cGVjdGVkLCBvcHRzLCBjaGFubmVsKTtcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIoeCkge1xuICBpZiAoIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnIHx8IHR5cGVvZiB4Lmxlbmd0aCAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHR5cGVvZiB4LmNvcHkgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHguc2xpY2UgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHgubGVuZ3RoID4gMCAmJiB0eXBlb2YgeFswXSAhPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gISEoeC5jb25zdHJ1Y3RvciAmJiB4LmNvbnN0cnVjdG9yLmlzQnVmZmVyICYmIHguY29uc3RydWN0b3IuaXNCdWZmZXIoeCkpO1xufVxuXG5mdW5jdGlvbiBzZXRFcXVpdihhLCBiLCBvcHRzLCBjaGFubmVsKSB7XG4gIGlmICgkc2V0U2l6ZShhKSAhPT0gJHNldFNpemUoYikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGlBID0gZ2V0SXRlcmF0b3IoYSk7XG4gIHZhciBpQiA9IGdldEl0ZXJhdG9yKGIpO1xuICB2YXIgcmVzdWx0QTtcbiAgdmFyIHJlc3VsdEI7XG4gIHZhciBzZXQ7XG4gIHdoaWxlICgocmVzdWx0QSA9IGlBLm5leHQoKSkgJiYgIXJlc3VsdEEuZG9uZSkge1xuICAgIGlmIChyZXN1bHRBLnZhbHVlICYmIHR5cGVvZiByZXN1bHRBLnZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKCFzZXQpIHsgc2V0ID0gbmV3ICRTZXQoKTsgfVxuICAgICAgJHNldEFkZChzZXQsIHJlc3VsdEEudmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoISRzZXRIYXMoYiwgcmVzdWx0QS52YWx1ZSkpIHtcbiAgICAgIGlmIChvcHRzLnN0cmljdCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgIGlmICghc2V0TWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIHJlc3VsdEEudmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghc2V0KSB7IHNldCA9IG5ldyAkU2V0KCk7IH1cbiAgICAgICRzZXRBZGQoc2V0LCByZXN1bHRBLnZhbHVlKTtcbiAgICB9XG4gIH1cbiAgaWYgKHNldCkge1xuICAgIHdoaWxlICgocmVzdWx0QiA9IGlCLm5leHQoKSkgJiYgIXJlc3VsdEIuZG9uZSkge1xuICAgICAgLy8gV2UgaGF2ZSB0byBjaGVjayBpZiBhIHByaW1pdGl2ZSB2YWx1ZSBpcyBhbHJlYWR5IG1hdGNoaW5nIGFuZCBvbmx5IGlmIGl0J3Mgbm90LCBnbyBodW50aW5nIGZvciBpdC5cbiAgICAgIGlmIChyZXN1bHRCLnZhbHVlICYmIHR5cGVvZiByZXN1bHRCLnZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoIXNldEhhc0VxdWFsRWxlbWVudChzZXQsIHJlc3VsdEIudmFsdWUsIG9wdHMuc3RyaWN0LCBjaGFubmVsKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgIW9wdHMuc3RyaWN0XG4gICAgICAgICYmICEkc2V0SGFzKGEsIHJlc3VsdEIudmFsdWUpXG4gICAgICAgICYmICFzZXRIYXNFcXVhbEVsZW1lbnQoc2V0LCByZXN1bHRCLnZhbHVlLCBvcHRzLnN0cmljdCwgY2hhbm5lbClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAkc2V0U2l6ZShzZXQpID09PSAwO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBtYXBFcXVpdihhLCBiLCBvcHRzLCBjaGFubmVsKSB7XG4gIGlmICgkbWFwU2l6ZShhKSAhPT0gJG1hcFNpemUoYikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGlBID0gZ2V0SXRlcmF0b3IoYSk7XG4gIHZhciBpQiA9IGdldEl0ZXJhdG9yKGIpO1xuICB2YXIgcmVzdWx0QTtcbiAgdmFyIHJlc3VsdEI7XG4gIHZhciBzZXQ7XG4gIHZhciBrZXk7XG4gIHZhciBpdGVtMTtcbiAgdmFyIGl0ZW0yO1xuICB3aGlsZSAoKHJlc3VsdEEgPSBpQS5uZXh0KCkpICYmICFyZXN1bHRBLmRvbmUpIHtcbiAgICBrZXkgPSByZXN1bHRBLnZhbHVlWzBdO1xuICAgIGl0ZW0xID0gcmVzdWx0QS52YWx1ZVsxXTtcbiAgICBpZiAoa2V5ICYmIHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAoIXNldCkgeyBzZXQgPSBuZXcgJFNldCgpOyB9XG4gICAgICAkc2V0QWRkKHNldCwga2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbTIgPSAkbWFwR2V0KGIsIGtleSk7XG4gICAgICBpZiAoKHR5cGVvZiBpdGVtMiA9PT0gJ3VuZGVmaW5lZCcgJiYgISRtYXBIYXMoYiwga2V5KSkgfHwgIWludGVybmFsRGVlcEVxdWFsKGl0ZW0xLCBpdGVtMiwgb3B0cywgY2hhbm5lbCkpIHtcbiAgICAgICAgaWYgKG9wdHMuc3RyaWN0KSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbWFwTWlnaHRIYXZlTG9vc2VQcmltKGEsIGIsIGtleSwgaXRlbTEsIG9wdHMsIGNoYW5uZWwpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc2V0KSB7IHNldCA9IG5ldyAkU2V0KCk7IH1cbiAgICAgICAgJHNldEFkZChzZXQsIGtleSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHNldCkge1xuICAgIHdoaWxlICgocmVzdWx0QiA9IGlCLm5leHQoKSkgJiYgIXJlc3VsdEIuZG9uZSkge1xuICAgICAga2V5ID0gcmVzdWx0Qi52YWx1ZVswXTtcbiAgICAgIGl0ZW0yID0gcmVzdWx0Qi52YWx1ZVsxXTtcbiAgICAgIGlmIChrZXkgJiYgdHlwZW9mIGtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKCFtYXBIYXNFcXVhbEVudHJ5KHNldCwgYSwga2V5LCBpdGVtMiwgb3B0cywgY2hhbm5lbCkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICFvcHRzLnN0cmljdFxuICAgICAgICAmJiAoIWEuaGFzKGtleSkgfHwgIWludGVybmFsRGVlcEVxdWFsKCRtYXBHZXQoYSwga2V5KSwgaXRlbTIsIG9wdHMsIGNoYW5uZWwpKVxuICAgICAgICAmJiAhbWFwSGFzRXF1YWxFbnRyeShzZXQsIGEsIGtleSwgaXRlbTIsIGFzc2lnbih7fSwgb3B0cywgeyBzdHJpY3Q6IGZhbHNlIH0pLCBjaGFubmVsKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICRzZXRTaXplKHNldCkgPT09IDA7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIG9iakVxdWl2KGEsIGIsIG9wdHMsIGNoYW5uZWwpIHtcbiAgLyogZXNsaW50IG1heC1zdGF0ZW1lbnRzOiBbMiwgMTAwXSwgbWF4LWxpbmVzLXBlci1mdW5jdGlvbjogWzIsIDEyMF0sIG1heC1kZXB0aDogWzIsIDVdICovXG4gIHZhciBpLCBrZXk7XG5cbiAgaWYgKHR5cGVvZiBhICE9PSB0eXBlb2YgYikgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgaWYgKCRvYmpUb1N0cmluZyhhKSAhPT0gJG9ialRvU3RyaW5nKGIpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIGlmIChpc0FyZ3VtZW50cyhhKSAhPT0gaXNBcmd1bWVudHMoYikpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgdmFyIGFJc0FycmF5ID0gaXNBcnJheShhKTtcbiAgdmFyIGJJc0FycmF5ID0gaXNBcnJheShiKTtcbiAgaWYgKGFJc0FycmF5ICE9PSBiSXNBcnJheSkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAvLyBUT0RPOiByZXBsYWNlIHdoZW4gYSBjcm9zcy1yZWFsbSBicmFuZCBjaGVjayBpcyBhdmFpbGFibGVcbiAgdmFyIGFJc0Vycm9yID0gYSBpbnN0YW5jZW9mIEVycm9yO1xuICB2YXIgYklzRXJyb3IgPSBiIGluc3RhbmNlb2YgRXJyb3I7XG4gIGlmIChhSXNFcnJvciAhPT0gYklzRXJyb3IpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChhSXNFcnJvciB8fCBiSXNFcnJvcikge1xuICAgIGlmIChhLm5hbWUgIT09IGIubmFtZSB8fCBhLm1lc3NhZ2UgIT09IGIubWVzc2FnZSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgfVxuXG4gIHZhciBhSXNSZWdleCA9IGlzUmVnZXgoYSk7XG4gIHZhciBiSXNSZWdleCA9IGlzUmVnZXgoYik7XG4gIGlmIChhSXNSZWdleCAhPT0gYklzUmVnZXgpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmICgoYUlzUmVnZXggfHwgYklzUmVnZXgpICYmIChhLnNvdXJjZSAhPT0gYi5zb3VyY2UgfHwgZmxhZ3MoYSkgIT09IGZsYWdzKGIpKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBhSXNEYXRlID0gaXNEYXRlKGEpO1xuICB2YXIgYklzRGF0ZSA9IGlzRGF0ZShiKTtcbiAgaWYgKGFJc0RhdGUgIT09IGJJc0RhdGUpIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGlmIChhSXNEYXRlIHx8IGJJc0RhdGUpIHsgLy8gJiYgd291bGQgd29yayB0b28sIGJlY2F1c2UgYm90aCBhcmUgdHJ1ZSBvciBib3RoIGZhbHNlIGhlcmVcbiAgICBpZiAoJGdldFRpbWUoYSkgIT09ICRnZXRUaW1lKGIpKSB7IHJldHVybiBmYWxzZTsgfVxuICB9XG4gIGlmIChvcHRzLnN0cmljdCAmJiBnUE8gJiYgZ1BPKGEpICE9PSBnUE8oYikpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgaWYgKHdoaWNoVHlwZWRBcnJheShhKSAhPT0gd2hpY2hUeXBlZEFycmF5KGIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGFJc0J1ZmZlciA9IGlzQnVmZmVyKGEpO1xuICB2YXIgYklzQnVmZmVyID0gaXNCdWZmZXIoYik7XG4gIGlmIChhSXNCdWZmZXIgIT09IGJJc0J1ZmZlcikgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGFJc0J1ZmZlciB8fCBiSXNCdWZmZXIpIHsgLy8gJiYgd291bGQgd29yayB0b28sIGJlY2F1c2UgYm90aCBhcmUgdHJ1ZSBvciBib3RoIGZhbHNlIGhlcmVcbiAgICBpZiAoYS5sZW5ndGggIT09IGIubGVuZ3RoKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGZvciAoaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoYVtpXSAhPT0gYltpXSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIGEgIT09IHR5cGVvZiBiKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gIHZhciBrYSA9IG9iamVjdEtleXMoYSk7XG4gIHZhciBrYiA9IG9iamVjdEtleXMoYik7XG4gIC8vIGhhdmluZyB0aGUgc2FtZSBudW1iZXIgb2Ygb3duZWQgcHJvcGVydGllcyAoa2V5cyBpbmNvcnBvcmF0ZXMgaGFzT3duUHJvcGVydHkpXG4gIGlmIChrYS5sZW5ndGggIT09IGtiLmxlbmd0aCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAvLyB0aGUgc2FtZSBzZXQgb2Yga2V5cyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSxcbiAga2Euc29ydCgpO1xuICBrYi5zb3J0KCk7XG4gIC8vIH5+fmNoZWFwIGtleSB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGthW2ldICE9IGtiW2ldKSB7IHJldHVybiBmYWxzZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICB9XG5cbiAgLy8gZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LCBhbmQgfn5+cG9zc2libHkgZXhwZW5zaXZlIGRlZXAgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGtleSA9IGthW2ldO1xuICAgIGlmICghaW50ZXJuYWxEZWVwRXF1YWwoYVtrZXldLCBiW2tleV0sIG9wdHMsIGNoYW5uZWwpKSB7IHJldHVybiBmYWxzZTsgfVxuICB9XG5cbiAgdmFyIGFDb2xsZWN0aW9uID0gd2hpY2hDb2xsZWN0aW9uKGEpO1xuICB2YXIgYkNvbGxlY3Rpb24gPSB3aGljaENvbGxlY3Rpb24oYik7XG4gIGlmIChhQ29sbGVjdGlvbiAhPT0gYkNvbGxlY3Rpb24pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGFDb2xsZWN0aW9uID09PSAnU2V0JyB8fCBiQ29sbGVjdGlvbiA9PT0gJ1NldCcpIHsgLy8gYUNvbGxlY3Rpb24gPT09IGJDb2xsZWN0aW9uXG4gICAgcmV0dXJuIHNldEVxdWl2KGEsIGIsIG9wdHMsIGNoYW5uZWwpO1xuICB9XG4gIGlmIChhQ29sbGVjdGlvbiA9PT0gJ01hcCcpIHsgLy8gYUNvbGxlY3Rpb24gPT09IGJDb2xsZWN0aW9uXG4gICAgcmV0dXJuIG1hcEVxdWl2KGEsIGIsIG9wdHMsIGNoYW5uZWwpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVlcEVxdWFsKGEsIGIsIG9wdHMpIHtcbiAgcmV0dXJuIGludGVybmFsRGVlcEVxdWFsKGEsIGIsIG9wdHMsIGdldFNpZGVDaGFubmVsKCkpO1xufTtcbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIEZyYWdtZW50LCBSZWFjdEVsZW1lbnQsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZU9uQ2xpY2tPdXRzaWRlIH0gZnJvbSBcIkBtZW5kaXgvcGl3LXV0aWxzLWludGVybmFsXCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0IGRlZXBFcXVhbCBmcm9tIFwiZGVlcC1lcXVhbFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbHRlck9wdGlvbiB7XG4gICAgY2FwdGlvbjogc3RyaW5nO1xuICAgIHZhbHVlOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBGaWx0ZXJDb21wb25lbnRQcm9wcyB7XG4gICAgYXJpYUxhYmVsPzogc3RyaW5nO1xuICAgIGVtcHR5T3B0aW9uQ2FwdGlvbj86IHN0cmluZztcbiAgICBtdWx0aVNlbGVjdD86IGJvb2xlYW47XG4gICAgbmFtZT86IHN0cmluZztcbiAgICBvcHRpb25zOiBGaWx0ZXJPcHRpb25bXTtcbiAgICB0YWJJbmRleD86IG51bWJlcjtcbiAgICBkZWZhdWx0VmFsdWU/OiBzdHJpbmc7XG4gICAgdXBkYXRlRmlsdGVycz86ICh2YWx1ZXM6IEZpbHRlck9wdGlvbltdKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRmlsdGVyQ29tcG9uZW50KHByb3BzOiBGaWx0ZXJDb21wb25lbnRQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgW3ZhbHVlSW5wdXQsIHNldFZhbHVlSW5wdXRdID0gdXNlU3RhdGUoXCJcIik7XG4gICAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8RmlsdGVyT3B0aW9uW10+KFtdKTtcbiAgICBjb25zdCBbc2VsZWN0ZWRGaWx0ZXJzLCBzZXRTZWxlY3RlZEZpbHRlcnNdID0gdXNlU3RhdGU8RmlsdGVyT3B0aW9uW10+KFtdKTtcbiAgICBjb25zdCBbc2hvdywgc2V0U2hvd10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgW2Ryb3Bkb3duV2lkdGgsIHNldERyb3Bkb3duV2lkdGhdID0gdXNlU3RhdGUoMCk7XG4gICAgY29uc3QgZGVmYXVsdFZhbHVlc0xvYWRlZCA9IHVzZVJlZjxib29sZWFuPihmYWxzZSk7XG5cbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuXG4gICAgY29uc3Qgc2V0TXVsdGlTZWxlY3RGaWx0ZXJzID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChzZWxlY3RlZE9wdGlvbnM6IEZpbHRlck9wdGlvbltdKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRPcHRpb25zPy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzZXRWYWx1ZUlucHV0KHByb3BzLmVtcHR5T3B0aW9uQ2FwdGlvbiA/PyBcIlwiKTtcbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZEZpbHRlcnMocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRWYWx1ZUlucHV0KHNlbGVjdGVkT3B0aW9ucy5tYXAob3B0aW9uID0+IG9wdGlvbi5jYXB0aW9uKS5qb2luKFwiLFwiKSk7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRGaWx0ZXJzKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVlcEVxdWFsKHNlbGVjdGVkT3B0aW9ucywgcHJldiwgeyBzdHJpY3Q6IHRydWUgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RlZE9wdGlvbnM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtwcm9wcy5lbXB0eU9wdGlvbkNhcHRpb25dXG4gICAgKTtcblxuICAgIGNvbnN0IG9uQ2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKG9wdGlvbjogRmlsdGVyT3B0aW9uKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJvcHMubXVsdGlTZWxlY3QpIHtcbiAgICAgICAgICAgICAgICBzZXRNdWx0aVNlbGVjdEZpbHRlcnModG9nZ2xlRmlsdGVyKHNlbGVjdGVkRmlsdGVycywgb3B0aW9uKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFZhbHVlSW5wdXQob3B0aW9uLmNhcHRpb24pO1xuICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkRmlsdGVycyhbb3B0aW9uXSk7XG4gICAgICAgICAgICAgICAgc2V0U2hvdyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtzZWxlY3RlZEZpbHRlcnMsIHByb3BzLm11bHRpU2VsZWN0XVxuICAgICk7XG5cbiAgICB1c2VPbkNsaWNrT3V0c2lkZShjb21wb25lbnRSZWYsICgpID0+IHNldFNob3coZmFsc2UpKTtcblxuICAgIC8vIFNlbGVjdCB0aGUgZmlyc3Qgb3B0aW9uIE9yIGRlZmF1bHQgb3B0aW9uIG9uIGxvYWRcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAoIWRlZmF1bHRWYWx1ZXNMb2FkZWQuY3VycmVudCAmJiBvcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGlmIChwcm9wcy5tdWx0aVNlbGVjdCkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wcy5kZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5pdGlhbE9wdGlvbnMgPSBwcm9wcy5kZWZhdWx0VmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdChcIixcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAodmFsdWUgPT4gb3B0aW9ucy5maW5kKG9wdGlvbiA9PiBvcHRpb24udmFsdWUgPT09IHZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgRmlsdGVyT3B0aW9uW107XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVXNlciBjYW4gc2V0IGFueXRoaW5nLCBidXQgaXQgY291bGQgbm90IG1hdGNoIHNvIHdlIGhhdmUgdG8gc2V0IHRvIGVtcHR5IG9yIFwiXCJcbiAgICAgICAgICAgICAgICAgICAgc2V0TXVsdGlTZWxlY3RGaWx0ZXJzKGluaXRpYWxPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXRWYWx1ZUlucHV0KHByb3BzLmVtcHR5T3B0aW9uQ2FwdGlvbiA/PyBcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFdlIHdhbnQgdG8gYWRkIGVtcHR5IG9wdGlvbiBjYXB0aW9uXG4gICAgICAgICAgICAgICAgY29uc3QgaW5pdGlhbE9wdGlvbiA9IG9wdGlvbnMuZmluZChvcHRpb24gPT4gb3B0aW9uLnZhbHVlID09PSBwcm9wcy5kZWZhdWx0VmFsdWUpID8/IG9wdGlvbnNbMF07XG5cbiAgICAgICAgICAgICAgICBzZXRWYWx1ZUlucHV0KGluaXRpYWxPcHRpb24/LmNhcHRpb24gPz8gXCJcIik7XG4gICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRGaWx0ZXJzKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IFtpbml0aWFsT3B0aW9uXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlZXBFcXVhbChuZXdWYWx1ZSwgcHJldiwgeyBzdHJpY3Q6IHRydWUgfSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZXNMb2FkZWQuY3VycmVudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9LCBbcHJvcHMuZGVmYXVsdFZhbHVlLCBwcm9wcy5lbXB0eU9wdGlvbkNhcHRpb24sIHByb3BzLm11bHRpU2VsZWN0LCBvcHRpb25zXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gW1xuICAgICAgICAgICAgLi4uKCFwcm9wcy5tdWx0aVNlbGVjdFxuICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogcHJvcHMuZW1wdHlPcHRpb25DYXB0aW9uID8/IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIDogW10pLFxuICAgICAgICAgICAgLi4ucHJvcHMub3B0aW9uc1xuICAgICAgICBdO1xuICAgICAgICBzZXRPcHRpb25zKHByZXYgPT4ge1xuICAgICAgICAgICAgaWYgKGRlZXBFcXVhbChwcmV2LCBvcHRpb25zLCB7IHN0cmljdDogdHJ1ZSB9KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlc2V0cyB0aGUgb3B0aW9uIHRvIHJlbG9hZCBkZWZhdWx0IHZhbHVlc1xuICAgICAgICBkZWZhdWx0VmFsdWVzTG9hZGVkLmN1cnJlbnQgPSBmYWxzZTtcbiAgICB9LCBbcHJvcHMuZW1wdHlPcHRpb25DYXB0aW9uLCBwcm9wcy5tdWx0aVNlbGVjdCwgcHJvcHMub3B0aW9ucywgcHJvcHMuZGVmYXVsdFZhbHVlXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBwcm9wcy51cGRhdGVGaWx0ZXJzPy4oc2VsZWN0ZWRGaWx0ZXJzKTtcbiAgICB9LCBbc2VsZWN0ZWRGaWx0ZXJzXSk7XG5cbiAgICBjb25zdCBzaG93UGxhY2Vob2xkZXIgPSBzZWxlY3RlZEZpbHRlcnMubGVuZ3RoID09PSAwIHx8IHZhbHVlSW5wdXQgPT09IHByb3BzLmVtcHR5T3B0aW9uQ2FwdGlvbjtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJvcGRvd24tY29udGFpbmVyXCIgZGF0YS1mb2N1c2luZGV4PXtwcm9wcy50YWJJbmRleCA/PyAwfSByZWY9e2NvbXBvbmVudFJlZn0+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB2YWx1ZT17IXNob3dQbGFjZWhvbGRlciA/IHZhbHVlSW5wdXQgOiBcIlwifVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtzaG93UGxhY2Vob2xkZXIgPyBwcm9wcy5lbXB0eU9wdGlvbkNhcHRpb24gOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGRyb3Bkb3duLXRyaWdnZXJlclwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvdyh0cnVlKX1cbiAgICAgICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiBzZXRTaG93KHRydWUpfVxuICAgICAgICAgICAgICAgIGFyaWEtaGFzcG9wdXBcbiAgICAgICAgICAgICAgICByZWY9e2lucHV0UmVmID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0UmVmICYmIGlucHV0UmVmLmNsaWVudFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXREcm9wZG93bldpZHRoKGlucHV0UmVmLmNsaWVudFdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17c2hvd31cbiAgICAgICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtgJHtwcm9wcy5uYW1lfS1kcm9wZG93bi1saXN0YH1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtwcm9wcy5hcmlhTGFiZWx9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge3Nob3cgJiYgKFxuICAgICAgICAgICAgICAgIDx1bFxuICAgICAgICAgICAgICAgICAgICBpZD17YCR7cHJvcHMubmFtZX0tZHJvcGRvd24tbGlzdGB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRyb3Bkb3duLWxpc3RcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogZHJvcGRvd25XaWR0aCB9fVxuICAgICAgICAgICAgICAgICAgICByb2xlPVwibWVudVwiXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtZm9jdXNpbmRleD17MH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtvcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmaWx0ZXItc2VsZWN0ZWRcIjogIXByb3BzLm11bHRpU2VsZWN0ICYmIHNlbGVjdGVkRmlsdGVycy5pbmNsdWRlcyhvcHRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNsaWNrKG9wdGlvbil9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIgfHwgZS5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3Byb3BzLm11bHRpU2VsZWN0ID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7cHJvcHMubmFtZX1fY2hlY2tib3hfdG9nZ2xlXyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3NlbGVjdGVkRmlsdGVycy5pbmNsdWRlcyhvcHRpb24pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9e2Ake3Byb3BzLm5hbWV9X2NoZWNrYm94X3RvZ2dsZV8ke2luZGV4fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgcG9pbnRlckV2ZW50czogXCJub25lXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b3B0aW9uLmNhcHRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWxhYmVsXCI+e29wdGlvbi5jYXB0aW9ufTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlRmlsdGVyKGZpbHRlcnM6IEZpbHRlck9wdGlvbltdLCBmaWx0ZXJUb1RvZ2dsZTogRmlsdGVyT3B0aW9uKTogRmlsdGVyT3B0aW9uW10ge1xuICAgIGNvbnN0IGFsdGVyZWRGaWx0ZXJzID0gWy4uLmZpbHRlcnNdO1xuICAgIGNvbnN0IGluZGV4ID0gZmlsdGVycy5pbmRleE9mKGZpbHRlclRvVG9nZ2xlKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBhbHRlcmVkRmlsdGVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFsdGVyZWRGaWx0ZXJzLnB1c2goZmlsdGVyVG9Ub2dnbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBhbHRlcmVkRmlsdGVycztcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRGF0YWdyaWREcm9wZG93bkZpbHRlckNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uL3R5cGluZ3MvRGF0YWdyaWREcm9wZG93bkZpbHRlclByb3BzXCI7XG5pbXBvcnQgeyBWYWx1ZVN0YXR1cywgTGlzdEF0dHJpYnV0ZVZhbHVlIH0gZnJvbSBcIm1lbmRpeFwiO1xuaW1wb3J0IHsgRmlsdGVyQ29tcG9uZW50LCBGaWx0ZXJPcHRpb24gfSBmcm9tIFwiLi9jb21wb25lbnRzL0ZpbHRlckNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQWxlcnQsIEZpbHRlclR5cGUsIGdldEZpbHRlckRpc3BhdGNoZXIgfSBmcm9tIFwiQG1lbmRpeC9waXctdXRpbHMtaW50ZXJuYWxcIjtcblxuaW1wb3J0IHsgYXR0cmlidXRlLCBlcXVhbHMsIGxpdGVyYWwsIG9yIH0gZnJvbSBcIm1lbmRpeC9maWx0ZXJzL2J1aWxkZXJzXCI7XG5pbXBvcnQgeyBGaWx0ZXJDb25kaXRpb24gfSBmcm9tIFwibWVuZGl4L2ZpbHRlcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGF0YWdyaWREcm9wZG93bkZpbHRlcihwcm9wczogRGF0YWdyaWREcm9wZG93bkZpbHRlckNvbnRhaW5lclByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBGaWx0ZXJDb250ZXh0ID0gZ2V0RmlsdGVyRGlzcGF0Y2hlcigpO1xuICAgIGNvbnN0IGlzQWxsT3B0aW9uc1JlYWR5ID0gcHJvcHMuZmlsdGVyT3B0aW9ucy5ldmVyeShcbiAgICAgICAgKHsgdmFsdWUsIGNhcHRpb24gfSkgPT4gdmFsdWUuc3RhdHVzID09PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgJiYgY2FwdGlvbi5zdGF0dXMgPT09IFZhbHVlU3RhdHVzLkF2YWlsYWJsZVxuICAgICk7XG4gICAgY29uc3QgcGFyc2VkT3B0aW9ucyA9IGlzQWxsT3B0aW9uc1JlYWR5XG4gICAgICAgID8gcHJvcHMuZmlsdGVyT3B0aW9ucy5tYXAodmFsdWUgPT4gKHtcbiAgICAgICAgICAgICAgY2FwdGlvbjogdmFsdWUuY2FwdGlvbi52YWx1ZSA/PyBcIlwiLFxuICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUudmFsdWUudmFsdWUgPz8gXCJcIlxuICAgICAgICAgIH0pKVxuICAgICAgICA6IFtdO1xuXG4gICAgY29uc3QgYWxlcnRNZXNzYWdlID0gKFxuICAgICAgICA8QWxlcnQgYm9vdHN0cmFwU3R5bGU9XCJkYW5nZXJcIj5cbiAgICAgICAgICAgIFRoZSBkcm9wLWRvd24gZmlsdGVyIHdpZGdldCBtdXN0IGJlIHBsYWNlZCBpbnNpZGUgdGhlIGhlYWRlciBvZiB0aGUgRGF0YSBncmlkIDIuMCBvciBHYWxsZXJ5IHdpZGdldC5cbiAgICAgICAgPC9BbGVydD5cbiAgICApO1xuXG4gICAgY29uc3QgYWxlcnRNZXNzYWdlTXVsdGlwbGVGaWx0ZXJzID0gKFxuICAgICAgICA8QWxlcnQgYm9vdHN0cmFwU3R5bGU9XCJkYW5nZXJcIj5cbiAgICAgICAgICAgIFRvIHVzZSBtdWx0aXBsZSBmaWx0ZXJzIHlvdSBuZWVkIHRvIGRlZmluZSBhIGZpbHRlciBpZGVudGlmaWNhdGlvbiBpbiB0aGUgcHJvcGVydGllcyBvZiBkcm9wLWRvd24gZmlsdGVyIG9yXG4gICAgICAgICAgICBoYXZlIGEgJnF1b3Q7Qm9vbGVhbiBvciBFbnVtZXJhdGlvbiZxdW90OyBhdHRyaWJ1dGUgYXZhaWxhYmxlLlxuICAgICAgICA8L0FsZXJ0PlxuICAgICk7XG5cbiAgICByZXR1cm4gRmlsdGVyQ29udGV4dD8uQ29uc3VtZXIgPyAoXG4gICAgICAgIDxGaWx0ZXJDb250ZXh0LkNvbnN1bWVyPlxuICAgICAgICAgICAge2ZpbHRlckNvbnRleHRWYWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAhZmlsdGVyQ29udGV4dFZhbHVlIHx8XG4gICAgICAgICAgICAgICAgICAgICFmaWx0ZXJDb250ZXh0VmFsdWUuZmlsdGVyRGlzcGF0Y2hlciB8fFxuICAgICAgICAgICAgICAgICAgICAoIWZpbHRlckNvbnRleHRWYWx1ZS5zaW5nbGVBdHRyaWJ1dGUgJiYgIWZpbHRlckNvbnRleHRWYWx1ZS5tdWx0aXBsZUF0dHJpYnV0ZXMpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGVydE1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyRGlzcGF0Y2hlcixcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlQXR0cmlidXRlLFxuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZUF0dHJpYnV0ZXMsXG4gICAgICAgICAgICAgICAgICAgIHNpbmdsZUluaXRpYWxGaWx0ZXIsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxlSW5pdGlhbEZpbHRlcnNcbiAgICAgICAgICAgICAgICB9ID0gZmlsdGVyQ29udGV4dFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gc2luZ2xlQXR0cmlidXRlID8/IGZpbmRBdHRyaWJ1dGVzQnlUeXBlKG11bHRpcGxlQXR0cmlidXRlcyk/LlswXTtcblxuICAgICAgICAgICAgICAgIGlmICghYXR0cmlidXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtdWx0aXBsZUF0dHJpYnV0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGVydE1lc3NhZ2VNdWx0aXBsZUZpbHRlcnM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0TWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPVxuICAgICAgICAgICAgICAgICAgICBnZXRBdHRyaWJ1dGVUeXBlRXJyb3JNZXNzYWdlKGF0dHJpYnV0ZS50eXBlKSB8fCB2YWxpZGF0ZVZhbHVlcyhhdHRyaWJ1dGUsIHBhcnNlZE9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxBbGVydCBib290c3RyYXBTdHlsZT1cImRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9BbGVydD47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IHNpbmdsZUF0dHJpYnV0ZSA/IFthdHRyaWJ1dGVdIDogZmluZEF0dHJpYnV0ZXNCeVR5cGUobXVsdGlwbGVBdHRyaWJ1dGVzKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZXMgPSBzaW5nbGVJbml0aWFsRmlsdGVyXG4gICAgICAgICAgICAgICAgICAgID8gc2luZ2xlSW5pdGlhbEZpbHRlcj8ubWFwKGZpbHRlciA9PiBmaWx0ZXIudmFsdWUpLmpvaW4oXCIsXCIpXG4gICAgICAgICAgICAgICAgICAgIDogYXR0cmlidXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICA/LmZsYXRNYXAoYXR0cmlidXRlID0+IG11bHRpcGxlSW5pdGlhbEZpbHRlcnM/LlthdHRyaWJ1dGUuaWRdLm1hcChmaWx0ZXIgPT4gZmlsdGVyLnZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4oXCIsXCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHByb3BzLmF1dG9cbiAgICAgICAgICAgICAgICAgICAgPyBhdHRyaWJ1dGVzPy5mbGF0TWFwKGF0dHJpYnV0ZSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGUudW5pdmVyc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYXR0cmlidXRlLnVuaXZlcnNlLm1hcCh2YWx1ZSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdGlvbjogYXR0cmlidXRlLmZvcm1hdHRlci5mb3JtYXQodmFsdWUpID8/IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWU/LnRvU3RyaW5nKCkgPz8gXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogW11cbiAgICAgICAgICAgICAgICAgICAgICApID8/IFtdXG4gICAgICAgICAgICAgICAgICAgIDogcGFyc2VkT3B0aW9ucztcblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxGaWx0ZXJDb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWFMYWJlbD17cHJvcHMuYXJpYUxhYmVsPy52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlcyA/PyBwcm9wcy5kZWZhdWx0VmFsdWU/LnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgZW1wdHlPcHRpb25DYXB0aW9uPXtwcm9wcy5lbXB0eU9wdGlvbkNhcHRpb24/LnZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlTZWxlY3Q9e3Byb3BzLm11bHRpU2VsZWN0fVxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17cHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD17cHJvcHMudGFiSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVGaWx0ZXJzPXsodmFsdWVzOiBGaWx0ZXJPcHRpb25bXSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbmRpdGlvbnMgPSBhdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8ubWFwKGF0dHJpYnV0ZSA9PiBnZXRGaWx0ZXJDb25kaXRpb24oYXR0cmlidXRlLCB2YWx1ZXMpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChmaWx0ZXIpOiBmaWx0ZXIgaXMgRmlsdGVyQ29uZGl0aW9uID0+IGZpbHRlciAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEaXNwYXRjaGVyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RmlsdGVyQ29uZGl0aW9uOiAoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9ucyAmJiBjb25kaXRpb25zLmxlbmd0aCA+IDEgPyBvciguLi5jb25kaXRpb25zKSA6IGNvbmRpdGlvbnM/LlswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyVHlwZTogRmlsdGVyVHlwZS5FTlVNRVJBVElPTlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgPC9GaWx0ZXJDb250ZXh0LkNvbnN1bWVyPlxuICAgICkgOiAoXG4gICAgICAgIGFsZXJ0TWVzc2FnZVxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGZpbmRBdHRyaWJ1dGVzQnlUeXBlKG11bHRpcGxlQXR0cmlidXRlcz86IHtcbiAgICBba2V5OiBzdHJpbmddOiBMaXN0QXR0cmlidXRlVmFsdWU7XG59KTogTGlzdEF0dHJpYnV0ZVZhbHVlW10gfCB1bmRlZmluZWQge1xuICAgIGlmICghbXVsdGlwbGVBdHRyaWJ1dGVzKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3Qua2V5cyhtdWx0aXBsZUF0dHJpYnV0ZXMpXG4gICAgICAgIC5tYXAoa2V5ID0+IG11bHRpcGxlQXR0cmlidXRlc1trZXldKVxuICAgICAgICAuZmlsdGVyKGF0dHIgPT4gYXR0ci50eXBlLm1hdGNoKC9FbnVtfEJvb2xlYW4vKSk7XG59XG5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZVR5cGVFcnJvck1lc3NhZ2UodHlwZT86IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiB0eXBlICYmICF0eXBlLm1hdGNoKC9FbnVtfEJvb2xlYW4vKVxuICAgICAgICA/IFwiVGhlIGF0dHJpYnV0ZSB0eXBlIGJlaW5nIHVzZWQgZm9yIERhdGEgZ3JpZCBkcm9wLWRvd24gZmlsdGVyIGlzIG5vdCAnQm9vbGVhbiBvciBFbnVtZXJhdGlvbidcIlxuICAgICAgICA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVmFsdWVzKGxpc3RBdHRyaWJ1dGU6IExpc3RBdHRyaWJ1dGVWYWx1ZSwgb3B0aW9uczogRmlsdGVyT3B0aW9uW10pOiBzdHJpbmcgfCBudWxsIHtcbiAgICBpZiAob3B0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnMuc29tZShcbiAgICAgICAgZmlsdGVyT3B0aW9uID0+ICFsaXN0QXR0cmlidXRlLnVuaXZlcnNlPy5pbmNsdWRlcyhjaGVja1ZhbHVlKGZpbHRlck9wdGlvbi52YWx1ZSwgbGlzdEF0dHJpYnV0ZS50eXBlKSlcbiAgICApXG4gICAgICAgID8gXCJUaGVyZSBhcmUgaW52YWxpZCB2YWx1ZXMgYXZhaWxhYmxlIGluIHRoZSBEYXRhIGdyaWQgZHJvcC1kb3duIGZpbHRlclwiXG4gICAgICAgIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0RmlsdGVyQ29uZGl0aW9uKFxuICAgIGxpc3RBdHRyaWJ1dGU6IExpc3RBdHRyaWJ1dGVWYWx1ZSB8IHVuZGVmaW5lZCxcbiAgICB2YWx1ZXM6IEZpbHRlck9wdGlvbltdXG4pOiBGaWx0ZXJDb25kaXRpb24gfCB1bmRlZmluZWQge1xuICAgIGlmICghbGlzdEF0dHJpYnV0ZSB8fCAhbGlzdEF0dHJpYnV0ZS5maWx0ZXJhYmxlIHx8IHZhbHVlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCB7IGlkLCB0eXBlIH0gPSBsaXN0QXR0cmlidXRlO1xuICAgIGNvbnN0IGZpbHRlckF0dHJpYnV0ZSA9IGF0dHJpYnV0ZShpZCk7XG5cbiAgICBpZiAoXG4gICAgICAgIHZhbHVlcy5zb21lKFxuICAgICAgICAgICAgZmlsdGVyT3B0aW9uID0+ICFsaXN0QXR0cmlidXRlLnVuaXZlcnNlPy5pbmNsdWRlcyhjaGVja1ZhbHVlKGZpbHRlck9wdGlvbi52YWx1ZSwgbGlzdEF0dHJpYnV0ZS50eXBlKSlcbiAgICAgICAgKVxuICAgICkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZXMubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4gb3IoLi4udmFsdWVzLm1hcChmaWx0ZXIgPT4gZXF1YWxzKGZpbHRlckF0dHJpYnV0ZSwgbGl0ZXJhbChjaGVja1ZhbHVlKGZpbHRlci52YWx1ZSwgdHlwZSkpKSkpO1xuICAgIH1cblxuICAgIGNvbnN0IFtmaWx0ZXJWYWx1ZV0gPSB2YWx1ZXM7XG4gICAgaWYgKGZpbHRlclZhbHVlLnZhbHVlKSB7XG4gICAgICAgIHJldHVybiBlcXVhbHMoZmlsdGVyQXR0cmlidXRlLCBsaXRlcmFsKGNoZWNrVmFsdWUoZmlsdGVyVmFsdWUudmFsdWUsIHR5cGUpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gY2hlY2tWYWx1ZSh2YWx1ZTogc3RyaW5nLCB0eXBlOiBzdHJpbmcpOiBib29sZWFuIHwgc3RyaW5nIHtcbiAgICBpZiAodHlwZSA9PT0gXCJCb29sZWFuXCIpIHtcbiAgICAgICAgaWYgKHZhbHVlICE9PSBcInRydWVcIiAmJiB2YWx1ZSAhPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSBcInRydWVcIjtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuIl0sIm5hbWVzIjpbImhhc093biIsImhhc093blByb3BlcnR5IiwiY2xhc3NOYW1lcyIsImNsYXNzZXMiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXJnIiwiYXJnVHlwZSIsInB1c2giLCJBcnJheSIsImlzQXJyYXkiLCJpbm5lciIsImFwcGx5Iiwia2V5IiwiY2FsbCIsImpvaW4iLCJtb2R1bGUiLCJleHBvcnRzIiwiZGVmYXVsdCIsIndpbmRvdyIsIkFsZXJ0IiwiY2xhc3NOYW1lIiwiYm9vdHN0cmFwU3R5bGUiLCJjaGlsZHJlbiIsIkNoaWxkcmVuIiwiY291bnQiLCJjcmVhdGVFbGVtZW50IiwiZGlzcGxheU5hbWUiLCJGb3JtYXR0ZXJUeXBlIiwidXNlT25DbGlja091dHNpZGUiLCJyZWYiLCJoYW5kbGVyIiwidXNlRWZmZWN0IiwibGlzdGVuZXIiLCJldmVudCIsImN1cnJlbnQiLCJjb250YWlucyIsInRhcmdldCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJnZXRGaWx0ZXJEaXNwYXRjaGVyIiwidG9TdHIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImlzQXJndW1lbnRzIiwidmFsdWUiLCJzdHIiLCJpc0FyZ3MiLCJjYWxsZWUiLCJrZXlzU2hpbSIsImtleXMiLCJoYXMiLCJyZXF1aXJlIiwiaXNFbnVtZXJhYmxlIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJoYXNEb250RW51bUJ1ZyIsImhhc1Byb3RvRW51bUJ1ZyIsImRvbnRFbnVtcyIsImVxdWFsc0NvbnN0cnVjdG9yUHJvdG90eXBlIiwibyIsImN0b3IiLCJjb25zdHJ1Y3RvciIsImV4Y2x1ZGVkS2V5cyIsIiRhcHBsaWNhdGlvbkNhY2hlIiwiJGNvbnNvbGUiLCIkZXh0ZXJuYWwiLCIkZnJhbWUiLCIkZnJhbWVFbGVtZW50IiwiJGZyYW1lcyIsIiRpbm5lckhlaWdodCIsIiRpbm5lcldpZHRoIiwiJG9ubW96ZnVsbHNjcmVlbmNoYW5nZSIsIiRvbm1vemZ1bGxzY3JlZW5lcnJvciIsIiRvdXRlckhlaWdodCIsIiRvdXRlcldpZHRoIiwiJHBhZ2VYT2Zmc2V0IiwiJHBhZ2VZT2Zmc2V0IiwiJHBhcmVudCIsIiRzY3JvbGxMZWZ0IiwiJHNjcm9sbFRvcCIsIiRzY3JvbGxYIiwiJHNjcm9sbFkiLCIkc2VsZiIsIiR3ZWJraXRJbmRleGVkREIiLCIkd2Via2l0U3RvcmFnZUluZm8iLCIkd2luZG93IiwiaGFzQXV0b21hdGlvbkVxdWFsaXR5QnVnIiwiayIsImUiLCJlcXVhbHNDb25zdHJ1Y3RvclByb3RvdHlwZUlmTm90QnVnZ3kiLCJvYmplY3QiLCJpc09iamVjdCIsImlzRnVuY3Rpb24iLCJpc1N0cmluZyIsInRoZUtleXMiLCJUeXBlRXJyb3IiLCJza2lwUHJvdG8iLCJTdHJpbmciLCJqIiwibmFtZSIsInNraXBDb25zdHJ1Y3RvciIsInNsaWNlIiwib3JpZ0tleXMiLCJvcmlnaW5hbEtleXMiLCJzaGltIiwic2hpbU9iamVjdEtleXMiLCJrZXlzV29ya3NXaXRoQXJndW1lbnRzIiwiYXJncyIsImhhc1RvU3RyaW5nVGFnIiwiU3ltYm9sIiwidG9TdHJpbmdUYWciLCJpc1N0YW5kYXJkQXJndW1lbnRzIiwiaXNMZWdhY3lBcmd1bWVudHMiLCJzdXBwb3J0c1N0YW5kYXJkQXJndW1lbnRzIiwiaGFzU3ltYm9scyIsImNvbmNhdCIsIm9yaWdEZWZpbmVQcm9wZXJ0eSIsImRlZmluZVByb3BlcnR5IiwiZm4iLCJhcmVQcm9wZXJ0eURlc2NyaXB0b3JzU3VwcG9ydGVkIiwib2JqIiwiZW51bWVyYWJsZSIsIl8iLCJ4Iiwic3VwcG9ydHNEZXNjcmlwdG9ycyIsInByZWRpY2F0ZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZGVmaW5lUHJvcGVydGllcyIsIm1hcCIsInByZWRpY2F0ZXMiLCJwcm9wcyIsImdldE93blByb3BlcnR5U3ltYm9scyIsIkVSUk9SX01FU1NBR0UiLCJmdW5jVHlwZSIsImJpbmQiLCJ0aGF0IiwiYm91bmQiLCJiaW5kZXIiLCJyZXN1bHQiLCJib3VuZExlbmd0aCIsIk1hdGgiLCJtYXgiLCJib3VuZEFyZ3MiLCJGdW5jdGlvbiIsIkVtcHR5IiwiaW1wbGVtZW50YXRpb24iLCJpdGVyYXRvciIsInN5bSIsInN5bU9iaiIsInN5bVZhbCIsImdldE93blByb3BlcnR5TmFtZXMiLCJzeW1zIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZGVzY3JpcHRvciIsIm9yaWdTeW1ib2wiLCJnbG9iYWwiLCJoYXNOYXRpdmVTeW1ib2xzIiwiaGFzU3ltYm9sU2hhbSIsInVuZGVmaW5lZCIsIiRTeW50YXhFcnJvciIsIlN5bnRheEVycm9yIiwiJEZ1bmN0aW9uIiwiJFR5cGVFcnJvciIsImdldEV2YWxsZWRDb25zdHJ1Y3RvciIsImV4cHJlc3Npb25TeW50YXgiLCIkZ09QRCIsInRocm93VHlwZUVycm9yIiwiVGhyb3dUeXBlRXJyb3IiLCJjYWxsZWVUaHJvd3MiLCJnZXQiLCJnT1BEdGhyb3dzIiwiZ2V0UHJvdG8iLCJnZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImFzeW5jR2VuRnVuY3Rpb24iLCJhc3luY0dlbkZ1bmN0aW9uUHJvdG90eXBlIiwiYXN5bmNHZW5Qcm90b3R5cGUiLCJUeXBlZEFycmF5IiwiVWludDhBcnJheSIsIklOVFJJTlNJQ1MiLCJBZ2dyZWdhdGVFcnJvciIsIkFycmF5QnVmZmVyIiwiQXRvbWljcyIsIkJpZ0ludCIsIkJvb2xlYW4iLCJEYXRhVmlldyIsIkRhdGUiLCJkZWNvZGVVUkkiLCJkZWNvZGVVUklDb21wb25lbnQiLCJlbmNvZGVVUkkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJFcnJvciIsImV2YWwiLCJFdmFsRXJyb3IiLCJGbG9hdDMyQXJyYXkiLCJGbG9hdDY0QXJyYXkiLCJGaW5hbGl6YXRpb25SZWdpc3RyeSIsIkludDhBcnJheSIsIkludDE2QXJyYXkiLCJJbnQzMkFycmF5IiwiaXNGaW5pdGUiLCJpc05hTiIsIkpTT04iLCJNYXAiLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwicGFyc2VJbnQiLCJQcm9taXNlIiwiUHJveHkiLCJSYW5nZUVycm9yIiwiUmVmZXJlbmNlRXJyb3IiLCJSZWZsZWN0IiwiUmVnRXhwIiwiU2V0IiwiU2hhcmVkQXJyYXlCdWZmZXIiLCJVaW50OENsYW1wZWRBcnJheSIsIlVpbnQxNkFycmF5IiwiVWludDMyQXJyYXkiLCJVUklFcnJvciIsIldlYWtNYXAiLCJXZWFrUmVmIiwiV2Vha1NldCIsIkxFR0FDWV9BTElBU0VTIiwiJGNvbmNhdCIsIiRzcGxpY2VBcHBseSIsInNwbGljZSIsIiRyZXBsYWNlIiwicmVwbGFjZSIsInJlUHJvcE5hbWUiLCJyZUVzY2FwZUNoYXIiLCJzdHJpbmdUb1BhdGgiLCJzdHJpbmciLCJtYXRjaCIsIm51bWJlciIsInF1b3RlIiwic3ViU3RyaW5nIiwiZ2V0QmFzZUludHJpbnNpYyIsImFsbG93TWlzc2luZyIsImludHJpbnNpY05hbWUiLCJhbGlhcyIsIkdldEludHJpbnNpYyIsInBhcnRzIiwiaW50cmluc2ljQmFzZU5hbWUiLCJpbnRyaW5zaWMiLCJpbnRyaW5zaWNSZWFsTmFtZSIsInNraXBGdXJ0aGVyQ2FjaGluZyIsImlzT3duIiwicGFydCIsImRlc2MiLCIkYXBwbHkiLCIkY2FsbCIsIiRyZWZsZWN0QXBwbHkiLCIkZGVmaW5lUHJvcGVydHkiLCJjYWxsQmluZCIsImFwcGx5QmluZCIsIm51bWJlcklzTmFOIiwiaXMiLCJhIiwiYiIsImdldFBvbHlmaWxsIiwic2hpbU9iamVjdElzIiwicG9seWZpbGwiLCJkZWZpbmUiLCJ0ZXN0T2JqZWN0SXMiLCJyZWdleEV4ZWMiLCJpc1JlZ2V4TWFya2VyIiwiYmFkU3RyaW5naWZpZXIiLCJleGVjIiwidGhyb3dSZWdleE1hcmtlciIsInZhbHVlT2YiLCJ0b1ByaW1pdGl2ZSIsImdPUEQiLCJyZWdleENsYXNzIiwiaXNSZWdleCIsImhhc0xhc3RJbmRleERhdGFQcm9wZXJ0eSIsImdlbmVyYXRvckZ1bmN0aW9uIiwiYXN5bmNGdW5jdGlvbiIsImVudHJpZXMiLCJmb3JFYWNoIiwidmFsdWVzIiwicGFyc2UiLCJ0aGVuIiwiYWxsIiwicmVqZWN0IiwicmVzb2x2ZSIsIiRPYmplY3QiLCJmbGFncyIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJkb3RBbGwiLCJ1bmljb2RlIiwic3RpY2t5IiwiVHlwZUVyciIsInJlZ2V4Iiwic2hpbUZsYWdzIiwicHJvdG8iLCJmbGFnc0JvdW5kIiwiYXJyIiwiZ2V0RGF5IiwidHJ5RGF0ZU9iamVjdCIsInRyeURhdGVHZXREYXlDYWxsIiwiZGF0ZUNsYXNzIiwiaXNEYXRlT2JqZWN0Iiwic3RyVmFsdWUiLCJ0cnlTdHJpbmdPYmplY3QiLCJzdHJDbGFzcyIsIm51bVRvU3RyIiwidHJ5TnVtYmVyT2JqZWN0IiwibnVtQ2xhc3MiLCJpc051bWJlck9iamVjdCIsImJvb2xUb1N0ciIsInRyeUJvb2xlYW5PYmplY3QiLCJib29sZWFuQnJhbmRDaGVjayIsImJvb2xDbGFzcyIsImlzQm9vbGVhbiIsInN5bVRvU3RyIiwic3ltU3RyaW5nUmVnZXgiLCJpc1N5bWJvbE9iamVjdCIsImlzUmVhbFN5bWJvbE9iamVjdCIsInRlc3QiLCJpc1N5bWJvbCIsImJpZ0ludFZhbHVlT2YiLCJ0cnlCaWdJbnQiLCJ0cnlCaWdJbnRPYmplY3QiLCJpc0JpZ0ludCIsIndoaWNoQm94ZWRQcmltaXRpdmUiLCJpc051bWJlciIsIiRpbmRleE9mIiwiY2FsbEJvdW5kSW50cmluc2ljIiwiJE1hcCIsIiRTZXQiLCJleHBvcnRlZCIsImlzTWFwIiwiJG1hcEhhcyIsIiRzZXRIYXMiLCJpc1NldCIsIiRXZWFrTWFwIiwiJFdlYWtTZXQiLCJpc1dlYWtNYXAiLCJpc1dlYWtTZXQiLCJ3aGljaENvbGxlY3Rpb24iLCIkaXRlcmF0b3IiLCJnZXRJdGVyYXRvciIsIml0ZXJhYmxlIiwiY2FsbEJvdW5kIiwiJGFycmF5UHVzaCIsIiRjaGFyQ29kZUF0IiwiJHN0cmluZ1NsaWNlIiwiYWR2YW5jZVN0cmluZ0luZGV4IiwiUyIsImluZGV4IiwiZmlyc3QiLCJzZWNvbmQiLCJnZXRBcnJheUl0ZXJhdG9yIiwiYXJyYXlsaWtlIiwibmV4dCIsImRvbmUiLCJnZXROb25Db2xsZWN0aW9uSXRlcmF0b3IiLCJuZXh0SW5kZXgiLCIkbWFwRm9yRWFjaCIsIiRzZXRGb3JFYWNoIiwicHJvY2VzcyIsInZlcnNpb25zIiwibm9kZSIsIiRtYXBJdGVyYXRvciIsIiRzZXRJdGVyYXRvciIsImdldFN0b3BJdGVyYXRpb25JdGVyYXRvciIsIiRtYXBBdEF0SXRlcmF0b3IiLCIkc2V0QXRBdEl0ZXJhdG9yIiwiZ2V0Q29sbGVjdGlvbkl0ZXJhdG9yIiwidiIsImhhc01hcCIsIm1hcFNpemVEZXNjcmlwdG9yIiwibWFwU2l6ZSIsIm1hcEZvckVhY2giLCJoYXNTZXQiLCJzZXRTaXplRGVzY3JpcHRvciIsInNldFNpemUiLCJzZXRGb3JFYWNoIiwiaGFzV2Vha01hcCIsIndlYWtNYXBIYXMiLCJoYXNXZWFrU2V0Iiwid2Vha1NldEhhcyIsImJvb2xlYW5WYWx1ZU9mIiwib2JqZWN0VG9TdHJpbmciLCJmdW5jdGlvblRvU3RyaW5nIiwiaW5zcGVjdF8iLCJvcHRpb25zIiwiZGVwdGgiLCJzZWVuIiwib3B0cyIsInF1b3RlU3R5bGUiLCJtYXhTdHJpbmdMZW5ndGgiLCJJbmZpbml0eSIsImN1c3RvbUluc3BlY3QiLCJpbmRlbnQiLCJpbnNwZWN0U3RyaW5nIiwibWF4RGVwdGgiLCJnZXRJbmRlbnQiLCJpbmRleE9mIiwiaW5zcGVjdCIsImZyb20iLCJub0luZGVudCIsIm5ld09wdHMiLCJuYW1lT2YiLCJzeW1TdHJpbmciLCJtYXJrQm94ZWQiLCJpc0VsZW1lbnQiLCJzIiwibm9kZU5hbWUiLCJ0b0xvd2VyQ2FzZSIsImF0dHJzIiwiYXR0cmlidXRlcyIsIndyYXBRdW90ZXMiLCJjaGlsZE5vZGVzIiwieHMiLCJhcnJPYmpLZXlzIiwic2luZ2xlTGluZVZhbHVlcyIsImluZGVudGVkSm9pbiIsImlzRXJyb3IiLCJtYXBQYXJ0cyIsImNvbGxlY3Rpb25PZiIsInNldFBhcnRzIiwid2Vha0NvbGxlY3Rpb25PZiIsImlzRGF0ZSIsImlzUmVnRXhwIiwieXMiLCJkZWZhdWx0U3R5bGUiLCJxdW90ZUNoYXIiLCJmIiwibSIsImwiLCJIVE1MRWxlbWVudCIsImdldEF0dHJpYnV0ZSIsInJlbWFpbmluZyIsInRyYWlsZXIiLCJsb3dieXRlIiwiYyIsIm4iLCJjaGFyQ29kZUF0IiwidHlwZSIsInNpemUiLCJqb2luZWRFbnRyaWVzIiwiYmFzZUluZGVudCIsImJhc2UiLCJwcmV2IiwibGluZUpvaW5lciIsImlzQXJyIiwiJHB1c2giLCIkd2Vha01hcEdldCIsIiR3ZWFrTWFwU2V0IiwiJHdlYWtNYXBIYXMiLCIkbWFwR2V0IiwiJG1hcFNldCIsIm9iamVjdEdldCIsIm9iamVjdHMiLCJvYmplY3RTZXQiLCJvYmplY3RIYXMiLCJnZXRTaWRlQ2hhbm5lbCIsIiR3bSIsIiRtIiwiJG8iLCJjaGFubmVsIiwiYXNzZXJ0Iiwic2V0IiwiY3R4Iiwic2VsZiIsImZpbHRlciIsInJldCIsInZhbCIsImF2YWlsYWJsZVR5cGVkQXJyYXlzIiwidHlwZWRBcnJheSIsIiR0b1N0cmluZyIsInR5cGVkQXJyYXlzIiwiYXJyYXkiLCIkc2xpY2UiLCJ0b1N0clRhZ3MiLCJzdXBlclByb3RvIiwidHJ5VHlwZWRBcnJheXMiLCJ0cnlBbGxUeXBlZEFycmF5cyIsImFueVRydWUiLCJnZXR0ZXIiLCJpc1R5cGVkQXJyYXkiLCJ0YWciLCJmb3VuZE5hbWUiLCJ3aGljaFR5cGVkQXJyYXkiLCJjYW5CZU9iamVjdCIsInRvT2JqZWN0IiwiJHByb3BJc0VudW1lcmFibGUiLCJvcmlnaW5hbEdldFN5bWJvbHMiLCJhc3NpZ24iLCJzb3VyY2UxIiwib2JqVGFyZ2V0Iiwic291cmNlIiwiZ2V0U3ltYm9scyIsImxhY2tzUHJvcGVyRW51bWVyYXRpb25PcmRlciIsImxldHRlcnMiLCJzcGxpdCIsImFjdHVhbCIsImFzc2lnbkhhc1BlbmRpbmdFeGNlcHRpb25zIiwicHJldmVudEV4dGVuc2lvbnMiLCJ0aHJvd2VyIiwic2hpbUFzc2lnbiIsIiRnZXRUaW1lIiwiZ1BPIiwiJG9ialRvU3RyaW5nIiwiJG1hcFNpemUiLCIkc2V0QWRkIiwiJHNldERlbGV0ZSIsIiRzZXRTaXplIiwic2V0SGFzRXF1YWxFbGVtZW50IiwidmFsMSIsImludGVybmFsRGVlcEVxdWFsIiwiZmluZExvb3NlTWF0Y2hpbmdQcmltaXRpdmVzIiwicHJpbSIsIm1hcE1pZ2h0SGF2ZUxvb3NlUHJpbSIsIml0ZW0iLCJhbHRWYWx1ZSIsImN1ckIiLCJsb29zZU9wdHMiLCJzdHJpY3QiLCJzZXRNaWdodEhhdmVMb29zZVByaW0iLCJtYXBIYXNFcXVhbEVudHJ5Iiwia2V5MSIsIml0ZW0xIiwia2V5MiIsImV4cGVjdGVkIiwiYWN0dWFsQm94ZWQiLCJleHBlY3RlZEJveGVkIiwiaGFzQWN0dWFsIiwiaGFzRXhwZWN0ZWQiLCJzZW50aW5lbCIsIm9iakVxdWl2IiwiaXNCdWZmZXIiLCJjb3B5Iiwic2V0RXF1aXYiLCJpQSIsImlCIiwicmVzdWx0QSIsInJlc3VsdEIiLCJtYXBFcXVpdiIsIml0ZW0yIiwiYUlzQXJyYXkiLCJiSXNBcnJheSIsImFJc0Vycm9yIiwiYklzRXJyb3IiLCJtZXNzYWdlIiwiYUlzUmVnZXgiLCJiSXNSZWdleCIsImFJc0RhdGUiLCJiSXNEYXRlIiwiYUlzQnVmZmVyIiwiYklzQnVmZmVyIiwia2EiLCJvYmplY3RLZXlzIiwia2IiLCJzb3J0IiwiYUNvbGxlY3Rpb24iLCJiQ29sbGVjdGlvbiIsImRlZXBFcXVhbCIsInVzZVN0YXRlIiwidXNlUmVmIiwidXNlQ2FsbGJhY2siLCJGcmFnbWVudCIsIm9yIiwiYXR0cmlidXRlIiwiZXF1YWxzIiwibGl0ZXJhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQUFBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7O0NBQ0E7Q0FFQyxhQUFZOztDQUdaLE1BQUlBLE1BQU0sR0FBRyxHQUFHQyxjQUFoQjs7Q0FFQSxXQUFTQyxVQUFULEdBQXVCO0NBQ3RCLFFBQUlDLE9BQU8s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
