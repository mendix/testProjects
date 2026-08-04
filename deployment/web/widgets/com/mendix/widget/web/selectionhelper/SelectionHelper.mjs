import { jsx, jsxs } from 'react/jsx-runtime';
import React, { Children, useContext, createContext, useState, forwardRef, memo, useRef, useEffect, useMemo } from 'react';
import { unstable_batchedUpdates } from 'react-dom';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var classnames = {exports: {}};

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/

var hasRequiredClassnames;

function requireClassnames () {
	if (hasRequiredClassnames) return classnames.exports;
	hasRequiredClassnames = 1;
	(function (module) {
		/* global define */

		(function () {

		  var hasOwn = {}.hasOwnProperty;
		  function classNames() {
		    var classes = '';
		    for (var i = 0; i < arguments.length; i++) {
		      var arg = arguments[i];
		      if (arg) {
		        classes = appendClass(classes, parseValue(arg));
		      }
		    }
		    return classes;
		  }
		  function parseValue(arg) {
		    if (typeof arg === 'string' || typeof arg === 'number') {
		      return arg;
		    }
		    if (typeof arg !== 'object') {
		      return '';
		    }
		    if (Array.isArray(arg)) {
		      return classNames.apply(null, arg);
		    }
		    if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
		      return arg.toString();
		    }
		    var classes = '';
		    for (var key in arg) {
		      if (hasOwn.call(arg, key) && arg[key]) {
		        classes = appendClass(classes, key);
		      }
		    }
		    return classes;
		  }
		  function appendClass(value, newClass) {
		    if (!newClass) {
		      return value;
		    }
		    if (value) {
		      return value + ' ' + newClass;
		    }
		    return value + newClass;
		  }
		  if (module.exports) {
		    classNames.default = classNames;
		    module.exports = classNames;
		  } else {
		    window.classNames = classNames;
		  }
		})(); 
	} (classnames));
	return classnames.exports;
}

var classnamesExports = requireClassnames();
var classNames = /*@__PURE__*/getDefaultExportFromCjs(classnamesExports);

const Alert = ({
  className,
  bootstrapStyle,
  children,
  role,
  id
}) => Children.count(children) > 0 ? jsx("div", {
  className: classNames(`alert alert-${bootstrapStyle}`, className),
  role: role,
  id: id,
  children: children
}) : null;
Alert.displayName = "Alert";

var niceErrors = {
  0: "Invalid value for configuration 'enforceActions', expected 'never', 'always' or 'observed'",
  1: function _(annotationType, key) {
    return "Cannot apply '" + annotationType + "' to '" + key.toString() + "': Field not found.";
  },
  /*
  2(prop) {
      return `invalid decorator for '${prop.toString()}'`
  },
  3(prop) {
      return `Cannot decorate '${prop.toString()}': action can only be used on properties with a function value.`
  },
  4(prop) {
      return `Cannot decorate '${prop.toString()}': computed can only be used on getter properties.`
  },
  */
  5: "'keys()' can only be used on observable objects, arrays, sets and maps",
  6: "'values()' can only be used on observable objects, arrays, sets and maps",
  7: "'entries()' can only be used on observable objects, arrays and maps",
  8: "'set()' can only be used on observable objects, arrays and maps",
  9: "'remove()' can only be used on observable objects, arrays and maps",
  10: "'has()' can only be used on observable objects, arrays and maps",
  11: "'get()' can only be used on observable objects, arrays and maps",
  12: "Invalid annotation",
  13: "Dynamic observable objects cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  14: "Intercept handlers should return nothing or a change object",
  15: "Observable arrays cannot be frozen. If you're passing observables to 3rd party component/function that calls Object.freeze, pass copy instead: toJS(observable)",
  16: "Modification exception: the internal structure of an observable array was changed.",
  17: function _(index, length) {
    return "[mobx.array] Index out of bounds, " + index + " is larger than " + length;
  },
  18: "mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js",
  19: function _(other) {
    return "Cannot initialize from classes that inherit from Map: " + other.constructor.name;
  },
  20: function _(other) {
    return "Cannot initialize map from " + other;
  },
  21: function _(dataStructure) {
    return "Cannot convert to map from '" + dataStructure + "'";
  },
  22: "mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js",
  23: "It is not possible to get index atoms from arrays",
  24: function _(thing) {
    return "Cannot obtain administration from " + thing;
  },
  25: function _(property, name) {
    return "the entry '" + property + "' does not exist in the observable map '" + name + "'";
  },
  26: "please specify a property",
  27: function _(property, name) {
    return "no observable property '" + property.toString() + "' found on the observable object '" + name + "'";
  },
  28: function _(thing) {
    return "Cannot obtain atom from " + thing;
  },
  29: "Expecting some object",
  30: "invalid action stack. did you forget to finish an action?",
  31: "missing option for computed: get",
  32: function _(name, derivation) {
    return "Cycle detected in computation " + name + ": " + derivation;
  },
  33: function _(name) {
    return "The setter of computed value '" + name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?";
  },
  34: function _(name) {
    return "[ComputedValue '" + name + "'] It is not possible to assign a new value to a computed value.";
  },
  35: "There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`",
  36: "isolateGlobalState should be called before MobX is running any reactions",
  37: function _(method) {
    return "[mobx] `observableArray." + method + "()` mutates the array in-place, which is not allowed inside a derivation. Use `array.slice()." + method + "()` instead";
  },
  38: "'ownKeys()' can only be used on observable objects",
  39: "'defineProperty()' can only be used on observable objects"
};
var errors = niceErrors ;
function die(error) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  {
    var e = typeof error === "string" ? error : errors[error];
    if (typeof e === "function") e = e.apply(null, args);
    throw new Error("[MobX] " + e);
  }
}
var mockGlobal = {};
function getGlobal() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  return mockGlobal;
}

// We shorten anything used > 5 times
var assign = Object.assign;
var getDescriptor = Object.getOwnPropertyDescriptor;
var defineProperty = Object.defineProperty;
var objectPrototype = Object.prototype;
var EMPTY_ARRAY = [];
Object.freeze(EMPTY_ARRAY);
var EMPTY_OBJECT = {};
Object.freeze(EMPTY_OBJECT);
var hasProxy = typeof Proxy !== "undefined";
var plainObjectString = /*#__PURE__*/Object.toString();
function assertProxies() {
  if (!hasProxy) {
    die("`Proxy` objects are not available in the current environment. Please configure MobX to enable a fallback implementation.`" );
  }
}
function warnAboutProxyRequirement(msg) {
  if (globalState.verifyProxies) {
    die("MobX is currently configured to be able to run in ES5 mode, but in ES5 MobX won't be able to " + msg);
  }
}
function getNextId() {
  return ++globalState.mobxGuid;
}
/**
 * Makes sure that the provided function is invoked at most once.
 */
function once(func) {
  var invoked = false;
  return function () {
    if (invoked) {
      return;
    }
    invoked = true;
    return func.apply(this, arguments);
  };
}
var noop = function noop() {};
function isFunction(fn) {
  return typeof fn === "function";
}
function isStringish(value) {
  var t = typeof value;
  switch (t) {
    case "string":
    case "symbol":
    case "number":
      return true;
  }
  return false;
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isPlainObject(value) {
  if (!isObject(value)) {
    return false;
  }
  var proto = Object.getPrototypeOf(value);
  if (proto == null) {
    return true;
  }
  var protoConstructor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  return typeof protoConstructor === "function" && protoConstructor.toString() === plainObjectString;
}
// https://stackoverflow.com/a/37865170
function isGenerator(obj) {
  var constructor = obj == null ? void 0 : obj.constructor;
  if (!constructor) {
    return false;
  }
  if ("GeneratorFunction" === constructor.name || "GeneratorFunction" === constructor.displayName) {
    return true;
  }
  return false;
}
function addHiddenProp(object, propName, value) {
  defineProperty(object, propName, {
    enumerable: false,
    writable: true,
    configurable: true,
    value: value
  });
}
function addHiddenFinalProp(object, propName, value) {
  defineProperty(object, propName, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: value
  });
}
function createInstanceofPredicate(name, theClass) {
  var propName = "isMobX" + name;
  theClass.prototype[propName] = true;
  return function (x) {
    return isObject(x) && x[propName] === true;
  };
}
function isES6Map(thing) {
  return thing instanceof Map;
}
function isES6Set(thing) {
  return thing instanceof Set;
}
var hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== "undefined";
/**
 * Returns the following: own enumerable keys and symbols.
 */
function getPlainObjectKeys(object) {
  var keys = Object.keys(object);
  // Not supported in IE, so there are not going to be symbol props anyway...
  if (!hasGetOwnPropertySymbols) {
    return keys;
  }
  var symbols = Object.getOwnPropertySymbols(object);
  if (!symbols.length) {
    return keys;
  }
  return [].concat(keys, symbols.filter(function (s) {
    return objectPrototype.propertyIsEnumerable.call(object, s);
  }));
}
// From Immer utils
// Returns all own keys, including non-enumerable and symbolic
var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : hasGetOwnPropertySymbols ? function (obj) {
  return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
} : /* istanbul ignore next */Object.getOwnPropertyNames;
function stringifyKey(key) {
  if (typeof key === "string") {
    return key;
  }
  if (typeof key === "symbol") {
    return key.toString();
  }
  return new String(key).toString();
}
function toPrimitive(value) {
  return value === null ? null : typeof value === "object" ? "" + value : value;
}
function hasProp(target, prop) {
  return objectPrototype.hasOwnProperty.call(target, prop);
}
// From Immer utils
var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(target) {
  // Polyfill needed for Hermes and IE, see https://github.com/facebook/hermes/issues/274
  var res = {};
  // Note: without polyfill for ownKeys, symbols won't be picked up
  ownKeys(target).forEach(function (key) {
    res[key] = getDescriptor(target, key);
  });
  return res;
};
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint);
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (String )(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
var storedAnnotationsSymbol = /*#__PURE__*/Symbol("mobx-stored-annotations");
/**
 * Creates a function that acts as
 * - decorator
 * - annotation object
 */
function createDecoratorAnnotation(annotation) {
  function decorator(target, property) {
    if (is20223Decorator(property)) {
      return annotation.decorate_20223_(target, property);
    } else {
      storeAnnotation(target, property, annotation);
    }
  }
  return Object.assign(decorator, annotation);
}
/**
 * Stores annotation to prototype,
 * so it can be inspected later by `makeObservable` called from constructor
 */
function storeAnnotation(prototype, key, annotation) {
  if (!hasProp(prototype, storedAnnotationsSymbol)) {
    addHiddenProp(prototype, storedAnnotationsSymbol, _extends({}, prototype[storedAnnotationsSymbol]));
  }
  // @override must override something
  if (isOverride(annotation) && !hasProp(prototype[storedAnnotationsSymbol], key)) {
    var fieldName = prototype.constructor.name + ".prototype." + key.toString();
    die("'" + fieldName + "' is decorated with 'override', " + "but no such decorated member was found on prototype.");
  }
  // Cannot re-decorate
  assertNotDecorated(prototype, annotation, key);
  // Ignore override
  if (!isOverride(annotation)) {
    prototype[storedAnnotationsSymbol][key] = annotation;
  }
}
function assertNotDecorated(prototype, annotation, key) {
  if (!isOverride(annotation) && hasProp(prototype[storedAnnotationsSymbol], key)) {
    var fieldName = prototype.constructor.name + ".prototype." + key.toString();
    var currentAnnotationType = prototype[storedAnnotationsSymbol][key].annotationType_;
    var requestedAnnotationType = annotation.annotationType_;
    die("Cannot apply '@" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already decorated with '@" + currentAnnotationType + "'.") + "\nRe-decorating fields is not allowed." + "\nUse '@override' decorator for methods overridden by subclass.");
  }
}
/**
 * Collects annotations from prototypes and stores them on target (instance)
 */
function collectStoredAnnotations(target) {
  if (!hasProp(target, storedAnnotationsSymbol)) {
    // if (__DEV__ && !target[storedAnnotationsSymbol]) {
    //     die(
    //         `No annotations were passed to makeObservable, but no decorated members have been found either`
    //     )
    // }
    // We need a copy as we will remove annotation from the list once it's applied.
    addHiddenProp(target, storedAnnotationsSymbol, _extends({}, target[storedAnnotationsSymbol]));
  }
  return target[storedAnnotationsSymbol];
}
function is20223Decorator(context) {
  return typeof context == "object" && typeof context["kind"] == "string";
}
function assert20223DecoratorType(context, types) {
  if (!types.includes(context.kind)) {
    die("The decorator applied to '" + String(context.name) + "' cannot be used on a " + context.kind + " element");
  }
}
var $mobx = /*#__PURE__*/Symbol("mobx administration");
var Atom = /*#__PURE__*/function () {
  // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed

  /**
   * Create a new atom. For debugging purposes it is recommended to give it a name.
   * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
   */
  function Atom(name_) {
    if (name_ === void 0) {
      name_ = "Atom@" + getNextId() ;
    }
    this.name_ = void 0;
    this.isPendingUnobservation_ = false;
    this.isBeingObserved_ = false;
    this.observers_ = new Set();
    this.diffValue_ = 0;
    this.lastAccessedBy_ = 0;
    this.lowestObserverState_ = IDerivationState_.NOT_TRACKING_;
    this.onBOL = void 0;
    this.onBUOL = void 0;
    this.name_ = name_;
  }
  // onBecomeObservedListeners
  var _proto = Atom.prototype;
  _proto.onBO = function onBO() {
    if (this.onBOL) {
      this.onBOL.forEach(function (listener) {
        return listener();
      });
    }
  };
  _proto.onBUO = function onBUO() {
    if (this.onBUOL) {
      this.onBUOL.forEach(function (listener) {
        return listener();
      });
    }
  }
  /**
   * Invoke this method to notify mobx that your atom has been used somehow.
   * Returns true if there is currently a reactive context.
   */;
  _proto.reportObserved = function reportObserved$1() {
    return reportObserved(this);
  }
  /**
   * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
   */;
  _proto.reportChanged = function reportChanged() {
    startBatch();
    propagateChanged(this);
    endBatch();
  };
  _proto.toString = function toString() {
    return this.name_;
  };
  return Atom;
}();
var isAtom = /*#__PURE__*/createInstanceofPredicate("Atom", Atom);
function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
  if (onBecomeObservedHandler === void 0) {
    onBecomeObservedHandler = noop;
  }
  if (onBecomeUnobservedHandler === void 0) {
    onBecomeUnobservedHandler = noop;
  }
  var atom = new Atom(name);
  // default `noop` listener will not initialize the hook Set
  if (onBecomeObservedHandler !== noop) {
    onBecomeObserved(atom, onBecomeObservedHandler);
  }
  if (onBecomeUnobservedHandler !== noop) {
    onBecomeUnobserved(atom, onBecomeUnobservedHandler);
  }
  return atom;
}
function structuralComparer(a, b) {
  return deepEqual(a, b);
}
function defaultComparer(a, b) {
  if (Object.is) {
    return Object.is(a, b);
  }
  return a === b ? a !== 0 || 1 / a === 1 / b : a !== a && b !== b;
}
var comparer = {
  structural: structuralComparer,
  "default": defaultComparer};
function deepEnhancer(v, _, name) {
  // it is an observable already, done
  if (isObservable(v)) {
    return v;
  }
  // something that can be converted and mutated?
  if (Array.isArray(v)) {
    return observable.array(v, {
      name: name
    });
  }
  if (isPlainObject(v)) {
    return observable.object(v, undefined, {
      name: name
    });
  }
  if (isES6Map(v)) {
    return observable.map(v, {
      name: name
    });
  }
  if (isES6Set(v)) {
    return observable.set(v, {
      name: name
    });
  }
  if (typeof v === "function" && !isAction(v) && !isFlow(v)) {
    if (isGenerator(v)) {
      return flow(v);
    } else {
      return autoAction(name, v);
    }
  }
  return v;
}
function shallowEnhancer(v, _, name) {
  if (v === undefined || v === null) {
    return v;
  }
  if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v) || isObservableSet(v)) {
    return v;
  }
  if (Array.isArray(v)) {
    return observable.array(v, {
      name: name,
      deep: false
    });
  }
  if (isPlainObject(v)) {
    return observable.object(v, undefined, {
      name: name,
      deep: false
    });
  }
  if (isES6Map(v)) {
    return observable.map(v, {
      name: name,
      deep: false
    });
  }
  if (isES6Set(v)) {
    return observable.set(v, {
      name: name,
      deep: false
    });
  }
  {
    die("The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
  }
}
function referenceEnhancer(newValue) {
  // never turn into an observable
  return newValue;
}
function refStructEnhancer(v, oldValue) {
  if (isObservable(v)) {
    die("observable.struct should not be used with observable values");
  }
  if (deepEqual(v, oldValue)) {
    return oldValue;
  }
  return v;
}
var OVERRIDE = "override";
function isOverride(annotation) {
  return annotation.annotationType_ === OVERRIDE;
}
function createActionAnnotation(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$1,
    extend_: extend_$1,
    decorate_20223_: decorate_20223_$1
  };
}
function make_$1(adm, key, descriptor, source) {
  var _this$options_;
  // bound
  if ((_this$options_ = this.options_) != null && _this$options_.bound) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 /* MakeResult.Cancel */ : 1 /* MakeResult.Break */;
  }
  // own
  if (source === adm.target_) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 /* MakeResult.Cancel */ : 2 /* MakeResult.Continue */;
  }
  // prototype
  if (isAction(descriptor.value)) {
    // A prototype could have been annotated already by other constructor,
    // rest of the proto chain must be annotated already
    return 1 /* MakeResult.Break */;
  }
  var actionDescriptor = createActionDescriptor(adm, this, key, descriptor, false);
  defineProperty(source, key, actionDescriptor);
  return 2 /* MakeResult.Continue */;
}
function extend_$1(adm, key, descriptor, proxyTrap) {
  var actionDescriptor = createActionDescriptor(adm, this, key, descriptor);
  return adm.defineProperty_(key, actionDescriptor, proxyTrap);
}
function decorate_20223_$1(mthd, context) {
  {
    assert20223DecoratorType(context, ["method", "field"]);
  }
  var kind = context.kind,
    name = context.name,
    addInitializer = context.addInitializer;
  var ann = this;
  var _createAction = function _createAction(m) {
    var _ann$options_$name, _ann$options_, _ann$options_$autoAct, _ann$options_2;
    return createAction((_ann$options_$name = (_ann$options_ = ann.options_) == null ? void 0 : _ann$options_.name) != null ? _ann$options_$name : name.toString(), m, (_ann$options_$autoAct = (_ann$options_2 = ann.options_) == null ? void 0 : _ann$options_2.autoAction) != null ? _ann$options_$autoAct : false);
  };
  // Backwards/Legacy behavior, expects makeObservable(this)
  if (kind == "field") {
    addInitializer(function () {
      storeAnnotation(this, name, ann);
    });
    return;
  }
  if (kind == "method") {
    var _this$options_2;
    if (!isAction(mthd)) {
      mthd = _createAction(mthd);
    }
    if ((_this$options_2 = this.options_) != null && _this$options_2.bound) {
      addInitializer(function () {
        var self = this;
        var bound = self[name].bind(self);
        bound.isMobxAction = true;
        self[name] = bound;
      });
    }
    return mthd;
  }
  die("Cannot apply '" + ann.annotationType_ + "' to '" + String(name) + "' (kind: " + kind + "):" + ("\n'" + ann.annotationType_ + "' can only be used on properties with a function value."));
}
function assertActionDescriptor(adm, _ref, key, _ref2) {
  var annotationType_ = _ref.annotationType_;
  var value = _ref2.value;
  if (!isFunction(value)) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a function value."));
  }
}
function createActionDescriptor(adm, annotation, key, descriptor,
// provides ability to disable safeDescriptors for prototypes
safeDescriptors) {
  var _annotation$options_, _annotation$options_$, _annotation$options_2, _annotation$options_$2, _annotation$options_3, _annotation$options_4, _adm$proxy_2;
  if (safeDescriptors === void 0) {
    safeDescriptors = globalState.safeDescriptors;
  }
  assertActionDescriptor(adm, annotation, key, descriptor);
  var value = descriptor.value;
  if ((_annotation$options_ = annotation.options_) != null && _annotation$options_.bound) {
    var _adm$proxy_;
    value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
  }
  return {
    value: createAction((_annotation$options_$ = (_annotation$options_2 = annotation.options_) == null ? void 0 : _annotation$options_2.name) != null ? _annotation$options_$ : key.toString(), value, (_annotation$options_$2 = (_annotation$options_3 = annotation.options_) == null ? void 0 : _annotation$options_3.autoAction) != null ? _annotation$options_$2 : false,
    // https://github.com/mobxjs/mobx/discussions/3140
    (_annotation$options_4 = annotation.options_) != null && _annotation$options_4.bound ? (_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_ : undefined),
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: safeDescriptors ? adm.isPlainObject_ : true,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: false,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: safeDescriptors ? false : true
  };
}
function createFlowAnnotation(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$2,
    extend_: extend_$2,
    decorate_20223_: decorate_20223_$2
  };
}
function make_$2(adm, key, descriptor, source) {
  var _this$options_;
  // own
  if (source === adm.target_) {
    return this.extend_(adm, key, descriptor, false) === null ? 0 /* MakeResult.Cancel */ : 2 /* MakeResult.Continue */;
  }
  // prototype
  // bound - must annotate protos to support super.flow()
  if ((_this$options_ = this.options_) != null && _this$options_.bound && (!hasProp(adm.target_, key) || !isFlow(adm.target_[key]))) {
    if (this.extend_(adm, key, descriptor, false) === null) {
      return 0 /* MakeResult.Cancel */;
    }
  }
  if (isFlow(descriptor.value)) {
    // A prototype could have been annotated already by other constructor,
    // rest of the proto chain must be annotated already
    return 1 /* MakeResult.Break */;
  }
  var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, false, false);
  defineProperty(source, key, flowDescriptor);
  return 2 /* MakeResult.Continue */;
}
function extend_$2(adm, key, descriptor, proxyTrap) {
  var _this$options_2;
  var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, (_this$options_2 = this.options_) == null ? void 0 : _this$options_2.bound);
  return adm.defineProperty_(key, flowDescriptor, proxyTrap);
}
function decorate_20223_$2(mthd, context) {
  var _this$options_3;
  {
    assert20223DecoratorType(context, ["method"]);
  }
  var name = context.name,
    addInitializer = context.addInitializer;
  if (!isFlow(mthd)) {
    mthd = flow(mthd);
  }
  if ((_this$options_3 = this.options_) != null && _this$options_3.bound) {
    addInitializer(function () {
      var self = this;
      var bound = self[name].bind(self);
      bound.isMobXFlow = true;
      self[name] = bound;
    });
  }
  return mthd;
}
function assertFlowDescriptor(adm, _ref, key, _ref2) {
  var annotationType_ = _ref.annotationType_;
  var value = _ref2.value;
  if (!isFunction(value)) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a generator function value."));
  }
}
function createFlowDescriptor(adm, annotation, key, descriptor, bound,
// provides ability to disable safeDescriptors for prototypes
safeDescriptors) {
  if (safeDescriptors === void 0) {
    safeDescriptors = globalState.safeDescriptors;
  }
  assertFlowDescriptor(adm, annotation, key, descriptor);
  var value = descriptor.value;
  // In case of flow.bound, the descriptor can be from already annotated prototype
  if (!isFlow(value)) {
    value = flow(value);
  }
  if (bound) {
    var _adm$proxy_;
    // We do not keep original function around, so we bind the existing flow
    value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    // This is normally set by `flow`, but `bind` returns new function...
    value.isMobXFlow = true;
  }
  return {
    value: value,
    // Non-configurable for classes
    // prevents accidental field redefinition in subclass
    configurable: safeDescriptors ? adm.isPlainObject_ : true,
    // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
    enumerable: false,
    // Non-obsevable, therefore non-writable
    // Also prevents rewriting in subclass constructor
    writable: safeDescriptors ? false : true
  };
}
function createComputedAnnotation(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$3,
    extend_: extend_$3,
    decorate_20223_: decorate_20223_$3
  };
}
function make_$3(adm, key, descriptor) {
  return this.extend_(adm, key, descriptor, false) === null ? 0 /* MakeResult.Cancel */ : 1 /* MakeResult.Break */;
}
function extend_$3(adm, key, descriptor, proxyTrap) {
  assertComputedDescriptor(adm, this, key, descriptor);
  return adm.defineComputedProperty_(key, _extends({}, this.options_, {
    get: descriptor.get,
    set: descriptor.set
  }), proxyTrap);
}
function decorate_20223_$3(get, context) {
  {
    assert20223DecoratorType(context, ["getter"]);
  }
  var ann = this;
  var key = context.name,
    addInitializer = context.addInitializer;
  addInitializer(function () {
    var adm = asObservableObject(this)[$mobx];
    var options = _extends({}, ann.options_, {
      get: get,
      context: this
    });
    options.name || (options.name = adm.name_ + "." + key.toString() );
    adm.values_.set(key, new ComputedValue(options));
  });
  return function () {
    return this[$mobx].getObservablePropValue_(key);
  };
}
function assertComputedDescriptor(adm, _ref, key, _ref2) {
  var annotationType_ = _ref.annotationType_;
  var get = _ref2.get;
  if (!get) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on getter(+setter) properties."));
  }
}
function createObservableAnnotation(name, options) {
  return {
    annotationType_: name,
    options_: options,
    make_: make_$4,
    extend_: extend_$4,
    decorate_20223_: decorate_20223_$4
  };
}
function make_$4(adm, key, descriptor) {
  return this.extend_(adm, key, descriptor, false) === null ? 0 /* MakeResult.Cancel */ : 1 /* MakeResult.Break */;
}
function extend_$4(adm, key, descriptor, proxyTrap) {
  var _this$options_$enhanc, _this$options_;
  assertObservableDescriptor(adm, this, key, descriptor);
  return adm.defineObservableProperty_(key, descriptor.value, (_this$options_$enhanc = (_this$options_ = this.options_) == null ? void 0 : _this$options_.enhancer) != null ? _this$options_$enhanc : deepEnhancer, proxyTrap);
}
function decorate_20223_$4(desc, context) {
  {
    if (context.kind === "field") {
      throw die("Please use `@observable accessor " + String(context.name) + "` instead of `@observable " + String(context.name) + "`");
    }
    assert20223DecoratorType(context, ["accessor"]);
  }
  var ann = this;
  var kind = context.kind,
    name = context.name;
  // The laziness here is not ideal... It's a workaround to how 2022.3 Decorators are implemented:
  //   `addInitializer` callbacks are executed _before_ any accessors are defined (instead of the ideal-for-us right after each).
  //   This means that, if we were to do our stuff in an `addInitializer`, we'd attempt to read a private slot
  //   before it has been initialized. The runtime doesn't like that and throws a `Cannot read private member
  //   from an object whose class did not declare it` error.
  // TODO: it seems that this will not be required anymore in the final version of the spec
  // See TODO: link
  var initializedObjects = new WeakSet();
  function initializeObservable(target, value) {
    var _ann$options_$enhance, _ann$options_;
    var adm = asObservableObject(target)[$mobx];
    var observable = new ObservableValue(value, (_ann$options_$enhance = (_ann$options_ = ann.options_) == null ? void 0 : _ann$options_.enhancer) != null ? _ann$options_$enhance : deepEnhancer, adm.name_ + "." + name.toString() , false);
    adm.values_.set(name, observable);
    initializedObjects.add(target);
  }
  if (kind == "accessor") {
    return {
      get: function get() {
        if (!initializedObjects.has(this)) {
          initializeObservable(this, desc.get.call(this));
        }
        return this[$mobx].getObservablePropValue_(name);
      },
      set: function set(value) {
        if (!initializedObjects.has(this)) {
          initializeObservable(this, value);
        }
        return this[$mobx].setObservablePropValue_(name, value);
      },
      init: function init(value) {
        if (!initializedObjects.has(this)) {
          initializeObservable(this, value);
        }
        return value;
      }
    };
  }
  return;
}
function assertObservableDescriptor(adm, _ref, key, descriptor) {
  var annotationType_ = _ref.annotationType_;
  if (!("value" in descriptor)) {
    die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' cannot be used on getter/setter properties"));
  }
}
var AUTO = "true";
var autoAnnotation = /*#__PURE__*/createAutoAnnotation();
function createAutoAnnotation(options) {
  return {
    annotationType_: AUTO,
    options_: options,
    make_: make_$5,
    extend_: extend_$5,
    decorate_20223_: decorate_20223_$5
  };
}
function make_$5(adm, key, descriptor, source) {
  var _this$options_3, _this$options_4;
  // getter -> computed
  if (descriptor.get) {
    return computed.make_(adm, key, descriptor, source);
  }
  // lone setter -> action setter
  if (descriptor.set) {
    // TODO make action applicable to setter and delegate to action.make_
    var set = createAction(key.toString(), descriptor.set);
    // own
    if (source === adm.target_) {
      return adm.defineProperty_(key, {
        configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
        set: set
      }) === null ? 0 /* MakeResult.Cancel */ : 2 /* MakeResult.Continue */;
    }
    // proto
    defineProperty(source, key, {
      configurable: true,
      set: set
    });
    return 2 /* MakeResult.Continue */;
  }
  // function on proto -> autoAction/flow
  if (source !== adm.target_ && typeof descriptor.value === "function") {
    var _this$options_2;
    if (isGenerator(descriptor.value)) {
      var _this$options_;
      var flowAnnotation = (_this$options_ = this.options_) != null && _this$options_.autoBind ? flow.bound : flow;
      return flowAnnotation.make_(adm, key, descriptor, source);
    }
    var actionAnnotation = (_this$options_2 = this.options_) != null && _this$options_2.autoBind ? autoAction.bound : autoAction;
    return actionAnnotation.make_(adm, key, descriptor, source);
  }
  // other -> observable
  // Copy props from proto as well, see test:
  // "decorate should work with Object.create"
  var observableAnnotation = ((_this$options_3 = this.options_) == null ? void 0 : _this$options_3.deep) === false ? observable.ref : observable;
  // if function respect autoBind option
  if (typeof descriptor.value === "function" && (_this$options_4 = this.options_) != null && _this$options_4.autoBind) {
    var _adm$proxy_;
    descriptor.value = descriptor.value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
  }
  return observableAnnotation.make_(adm, key, descriptor, source);
}
function extend_$5(adm, key, descriptor, proxyTrap) {
  var _this$options_5, _this$options_6;
  // getter -> computed
  if (descriptor.get) {
    return computed.extend_(adm, key, descriptor, proxyTrap);
  }
  // lone setter -> action setter
  if (descriptor.set) {
    // TODO make action applicable to setter and delegate to action.extend_
    return adm.defineProperty_(key, {
      configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
      set: createAction(key.toString(), descriptor.set)
    }, proxyTrap);
  }
  // other -> observable
  // if function respect autoBind option
  if (typeof descriptor.value === "function" && (_this$options_5 = this.options_) != null && _this$options_5.autoBind) {
    var _adm$proxy_2;
    descriptor.value = descriptor.value.bind((_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_);
  }
  var observableAnnotation = ((_this$options_6 = this.options_) == null ? void 0 : _this$options_6.deep) === false ? observable.ref : observable;
  return observableAnnotation.extend_(adm, key, descriptor, proxyTrap);
}
function decorate_20223_$5(desc, context) {
  die("'" + this.annotationType_ + "' cannot be used as a decorator");
}
var OBSERVABLE = "observable";
var OBSERVABLE_REF = "observable.ref";
var OBSERVABLE_SHALLOW = "observable.shallow";
var OBSERVABLE_STRUCT = "observable.struct";
// Predefined bags of create observable options, to avoid allocating temporarily option objects
// in the majority of cases
var defaultCreateObservableOptions = {
  deep: true,
  name: undefined,
  defaultDecorator: undefined,
  proxy: true
};
Object.freeze(defaultCreateObservableOptions);
function asCreateObservableOptions(thing) {
  return thing || defaultCreateObservableOptions;
}
var observableAnnotation = /*#__PURE__*/createObservableAnnotation(OBSERVABLE);
var observableRefAnnotation = /*#__PURE__*/createObservableAnnotation(OBSERVABLE_REF, {
  enhancer: referenceEnhancer
});
var observableShallowAnnotation = /*#__PURE__*/createObservableAnnotation(OBSERVABLE_SHALLOW, {
  enhancer: shallowEnhancer
});
var observableStructAnnotation = /*#__PURE__*/createObservableAnnotation(OBSERVABLE_STRUCT, {
  enhancer: refStructEnhancer
});
var observableDecoratorAnnotation = /*#__PURE__*/createDecoratorAnnotation(observableAnnotation);
function getEnhancerFromOptions(options) {
  return options.deep === true ? deepEnhancer : options.deep === false ? referenceEnhancer : getEnhancerFromAnnotation(options.defaultDecorator);
}
function getAnnotationFromOptions(options) {
  var _options$defaultDecor;
  return options ? (_options$defaultDecor = options.defaultDecorator) != null ? _options$defaultDecor : createAutoAnnotation(options) : undefined;
}
function getEnhancerFromAnnotation(annotation) {
  var _annotation$options_$, _annotation$options_;
  return !annotation ? deepEnhancer : (_annotation$options_$ = (_annotation$options_ = annotation.options_) == null ? void 0 : _annotation$options_.enhancer) != null ? _annotation$options_$ : deepEnhancer;
}
/**
 * Turns an object, array or function into a reactive structure.
 * @param v the value which should become observable.
 */
function createObservable(v, arg2, arg3) {
  // @observable someProp; (2022.3 Decorators)
  if (is20223Decorator(arg2)) {
    return observableAnnotation.decorate_20223_(v, arg2);
  }
  // @observable someProp;
  if (isStringish(arg2)) {
    storeAnnotation(v, arg2, observableAnnotation);
    return;
  }
  // already observable - ignore
  if (isObservable(v)) {
    return v;
  }
  // plain object
  if (isPlainObject(v)) {
    return observable.object(v, arg2, arg3);
  }
  // Array
  if (Array.isArray(v)) {
    return observable.array(v, arg2);
  }
  // Map
  if (isES6Map(v)) {
    return observable.map(v, arg2);
  }
  // Set
  if (isES6Set(v)) {
    return observable.set(v, arg2);
  }
  // other object - ignore
  if (typeof v === "object" && v !== null) {
    return v;
  }
  // anything else
  return observable.box(v, arg2);
}
assign(createObservable, observableDecoratorAnnotation);
var observableFactories = {
  box: function box(value, options) {
    var o = asCreateObservableOptions(options);
    return new ObservableValue(value, getEnhancerFromOptions(o), o.name, true, o.equals);
  },
  array: function array(initialValues, options) {
    var o = asCreateObservableOptions(options);
    return (globalState.useProxies === false || o.proxy === false ? createLegacyArray : createObservableArray)(initialValues, getEnhancerFromOptions(o), o.name);
  },
  map: function map(initialValues, options) {
    var o = asCreateObservableOptions(options);
    return new ObservableMap(initialValues, getEnhancerFromOptions(o), o.name);
  },
  set: function set(initialValues, options) {
    var o = asCreateObservableOptions(options);
    return new ObservableSet(initialValues, getEnhancerFromOptions(o), o.name);
  },
  object: function object(props, decorators, options) {
    return initObservable(function () {
      return extendObservable(globalState.useProxies === false || (options == null ? void 0 : options.proxy) === false ? asObservableObject({}, options) : asDynamicObservableObject({}, options), props, decorators);
    });
  },
  ref: /*#__PURE__*/createDecoratorAnnotation(observableRefAnnotation),
  shallow: /*#__PURE__*/createDecoratorAnnotation(observableShallowAnnotation),
  deep: observableDecoratorAnnotation,
  struct: /*#__PURE__*/createDecoratorAnnotation(observableStructAnnotation)
};
// eslint-disable-next-line
var observable = /*#__PURE__*/assign(createObservable, observableFactories);
var COMPUTED = "computed";
var COMPUTED_STRUCT = "computed.struct";
var computedAnnotation = /*#__PURE__*/createComputedAnnotation(COMPUTED);
var computedStructAnnotation = /*#__PURE__*/createComputedAnnotation(COMPUTED_STRUCT, {
  equals: comparer.structural
});
/**
 * Decorator for class properties: @computed get value() { return expr; }.
 * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
 */
var computed = function computed(arg1, arg2) {
  if (is20223Decorator(arg2)) {
    // @computed (2022.3 Decorators)
    return computedAnnotation.decorate_20223_(arg1, arg2);
  }
  if (isStringish(arg2)) {
    // @computed
    return storeAnnotation(arg1, arg2, computedAnnotation);
  }
  if (isPlainObject(arg1)) {
    // @computed({ options })
    return createDecoratorAnnotation(createComputedAnnotation(COMPUTED, arg1));
  }
  // computed(expr, options?)
  {
    if (!isFunction(arg1)) {
      die("First argument to `computed` should be an expression.");
    }
    if (isFunction(arg2)) {
      die("A setter as second argument is no longer supported, use `{ set: fn }` option instead");
    }
  }
  var opts = isPlainObject(arg2) ? arg2 : {};
  opts.get = arg1;
  opts.name || (opts.name = arg1.name || ""); /* for generated name */
  return new ComputedValue(opts);
};
Object.assign(computed, computedAnnotation);
computed.struct = /*#__PURE__*/createDecoratorAnnotation(computedStructAnnotation);
var _getDescriptor$config, _getDescriptor;
// we don't use globalState for these in order to avoid possible issues with multiple
// mobx versions
var currentActionId = 0;
var nextActionId = 1;
var isFunctionNameConfigurable$1 = (_getDescriptor$config = (_getDescriptor = /*#__PURE__*/getDescriptor(function () {}, "name")) == null ? void 0 : _getDescriptor.configurable) != null ? _getDescriptor$config : false;
// we can safely recycle this object
var tmpNameDescriptor = {
  value: "action",
  configurable: true,
  writable: false,
  enumerable: false
};
function createAction(actionName, fn, autoAction, ref) {
  if (autoAction === void 0) {
    autoAction = false;
  }
  {
    if (!isFunction(fn)) {
      die("`action` can only be invoked on functions");
    }
    if (typeof actionName !== "string" || !actionName) {
      die("actions should have valid names, got: '" + actionName + "'");
    }
  }
  function res() {
    return executeAction(actionName, autoAction, fn, ref || this, arguments);
  }
  res.isMobxAction = true;
  res.toString = function () {
    return fn.toString();
  };
  if (isFunctionNameConfigurable$1) {
    tmpNameDescriptor.value = actionName;
    defineProperty(res, "name", tmpNameDescriptor);
  }
  return res;
}
function executeAction(actionName, canRunAsDerivation, fn, scope, args) {
  var runInfo = _startAction(actionName, canRunAsDerivation, scope, args);
  try {
    return fn.apply(scope, args);
  } catch (err) {
    runInfo.error_ = err;
    throw err;
  } finally {
    _endAction(runInfo);
  }
}
function _startAction(actionName, canRunAsDerivation,
// true for autoAction
scope, args) {
  var notifySpy_ = isSpyEnabled() && !!actionName;
  var startTime_ = 0;
  if (notifySpy_) {
    startTime_ = Date.now();
    var flattenedArgs = args ? Array.from(args) : EMPTY_ARRAY;
    spyReportStart({
      type: ACTION,
      name: actionName,
      object: scope,
      arguments: flattenedArgs
    });
  }
  var prevDerivation_ = globalState.trackingDerivation;
  var runAsAction = !canRunAsDerivation || !prevDerivation_;
  startBatch();
  var prevAllowStateChanges_ = globalState.allowStateChanges; // by default preserve previous allow
  if (runAsAction) {
    untrackedStart();
    prevAllowStateChanges_ = allowStateChangesStart(true);
  }
  var prevAllowStateReads_ = allowStateReadsStart(true);
  var runInfo = {
    runAsAction_: runAsAction,
    prevDerivation_: prevDerivation_,
    prevAllowStateChanges_: prevAllowStateChanges_,
    prevAllowStateReads_: prevAllowStateReads_,
    notifySpy_: notifySpy_,
    startTime_: startTime_,
    actionId_: nextActionId++,
    parentActionId_: currentActionId
  };
  currentActionId = runInfo.actionId_;
  return runInfo;
}
function _endAction(runInfo) {
  if (currentActionId !== runInfo.actionId_) {
    die(30);
  }
  currentActionId = runInfo.parentActionId_;
  if (runInfo.error_ !== undefined) {
    globalState.suppressReactionErrors = true;
  }
  allowStateChangesEnd(runInfo.prevAllowStateChanges_);
  allowStateReadsEnd(runInfo.prevAllowStateReads_);
  endBatch();
  if (runInfo.runAsAction_) {
    untrackedEnd(runInfo.prevDerivation_);
  }
  if (runInfo.notifySpy_) {
    spyReportEnd({
      time: Date.now() - runInfo.startTime_
    });
  }
  globalState.suppressReactionErrors = false;
}
function allowStateChangesStart(allowStateChanges) {
  var prev = globalState.allowStateChanges;
  globalState.allowStateChanges = allowStateChanges;
  return prev;
}
function allowStateChangesEnd(prev) {
  globalState.allowStateChanges = prev;
}
var _Symbol$toPrimitive;
var CREATE = "create";
_Symbol$toPrimitive = Symbol.toPrimitive;
var ObservableValue = /*#__PURE__*/function (_Atom) {
  _inheritsLoose(ObservableValue, _Atom);
  function ObservableValue(value, enhancer, name_, notifySpy, equals) {
    var _this;
    if (name_ === void 0) {
      name_ = "ObservableValue@" + getNextId() ;
    }
    if (notifySpy === void 0) {
      notifySpy = true;
    }
    if (equals === void 0) {
      equals = comparer["default"];
    }
    _this = _Atom.call(this, name_) || this;
    _this.enhancer = void 0;
    _this.name_ = void 0;
    _this.equals = void 0;
    _this.hasUnreportedChange_ = false;
    _this.interceptors_ = void 0;
    _this.changeListeners_ = void 0;
    _this.value_ = void 0;
    _this.dehancer = void 0;
    _this.enhancer = enhancer;
    _this.name_ = name_;
    _this.equals = equals;
    _this.value_ = enhancer(value, undefined, name_);
    if (notifySpy && isSpyEnabled()) {
      // only notify spy if this is a stand-alone observable
      spyReport({
        type: CREATE,
        object: _assertThisInitialized(_this),
        observableKind: "value",
        debugObjectName: _this.name_,
        newValue: "" + _this.value_
      });
    }
    return _this;
  }
  var _proto = ObservableValue.prototype;
  _proto.dehanceValue = function dehanceValue(value) {
    if (this.dehancer !== undefined) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.set = function set(newValue) {
    var oldValue = this.value_;
    newValue = this.prepareNewValue_(newValue);
    if (newValue !== globalState.UNCHANGED) {
      var notifySpy = isSpyEnabled();
      if (notifySpy) {
        spyReportStart({
          type: UPDATE,
          object: this,
          observableKind: "value",
          debugObjectName: this.name_,
          newValue: newValue,
          oldValue: oldValue
        });
      }
      this.setNewValue_(newValue);
      if (notifySpy) {
        spyReportEnd();
      }
    }
  };
  _proto.prepareNewValue_ = function prepareNewValue_(newValue) {
    checkIfStateModificationsAreAllowed(this);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this,
        type: UPDATE,
        newValue: newValue
      });
      if (!change) {
        return globalState.UNCHANGED;
      }
      newValue = change.newValue;
    }
    // apply modifier
    newValue = this.enhancer(newValue, this.value_, this.name_);
    return this.equals(this.value_, newValue) ? globalState.UNCHANGED : newValue;
  };
  _proto.setNewValue_ = function setNewValue_(newValue) {
    var oldValue = this.value_;
    this.value_ = newValue;
    this.reportChanged();
    if (hasListeners(this)) {
      notifyListeners(this, {
        type: UPDATE,
        object: this,
        newValue: newValue,
        oldValue: oldValue
      });
    }
  };
  _proto.get = function get() {
    this.reportObserved();
    return this.dehanceValue(this.value_);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (fireImmediately) {
      listener({
        observableKind: "value",
        debugObjectName: this.name_,
        object: this,
        type: UPDATE,
        newValue: this.value_,
        oldValue: undefined
      });
    }
    return registerListener(this, listener);
  };
  _proto.raw = function raw() {
    // used by MST ot get undehanced value
    return this.value_;
  };
  _proto.toJSON = function toJSON() {
    return this.get();
  };
  _proto.toString = function toString() {
    return this.name_ + "[" + this.value_ + "]";
  };
  _proto.valueOf = function valueOf() {
    return toPrimitive(this.get());
  };
  _proto[_Symbol$toPrimitive] = function () {
    return this.valueOf();
  };
  return ObservableValue;
}(Atom);
var _Symbol$toPrimitive$1;
/**
 * A node in the state dependency root that observes other nodes, and can be observed itself.
 *
 * ComputedValue will remember the result of the computation for the duration of the batch, or
 * while being observed.
 *
 * During this time it will recompute only when one of its direct dependencies changed,
 * but only when it is being accessed with `ComputedValue.get()`.
 *
 * Implementation description:
 * 1. First time it's being accessed it will compute and remember result
 *    give back remembered result until 2. happens
 * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
 * 3. When it's being accessed, recompute if any shallow dependency changed.
 *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
 *    go to step 2. either way
 *
 * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
 */
_Symbol$toPrimitive$1 = Symbol.toPrimitive;
var ComputedValue = /*#__PURE__*/function () {
  // nodes we are looking at. Our value depends on these nodes
  // during tracking it's an array with new observed observers

  // to check for cycles

  // N.B: unminified as it is used by MST

  /**
   * Create a new computed value based on a function expression.
   *
   * The `name` property is for debug purposes only.
   *
   * The `equals` property specifies the comparer function to use to determine if a newly produced
   * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
   * compares based on identity comparison (===), and `structuralComparer` deeply compares the structure.
   * Structural comparison can be convenient if you always produce a new aggregated object and
   * don't want to notify observers if it is structurally the same.
   * This is useful for working with vectors, mouse coordinates etc.
   */
  function ComputedValue(options) {
    this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
    this.observing_ = [];
    this.newObserving_ = null;
    this.isBeingObserved_ = false;
    this.isPendingUnobservation_ = false;
    this.observers_ = new Set();
    this.diffValue_ = 0;
    this.runId_ = 0;
    this.lastAccessedBy_ = 0;
    this.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
    this.unboundDepsCount_ = 0;
    this.value_ = new CaughtException(null);
    this.name_ = void 0;
    this.triggeredBy_ = void 0;
    this.isComputing_ = false;
    this.isRunningSetter_ = false;
    this.derivation = void 0;
    this.setter_ = void 0;
    this.isTracing_ = TraceMode.NONE;
    this.scope_ = void 0;
    this.equals_ = void 0;
    this.requiresReaction_ = void 0;
    this.keepAlive_ = void 0;
    this.onBOL = void 0;
    this.onBUOL = void 0;
    if (!options.get) {
      die(31);
    }
    this.derivation = options.get;
    this.name_ = options.name || ("ComputedValue@" + getNextId() );
    if (options.set) {
      this.setter_ = createAction(this.name_ + "-setter" , options.set);
    }
    this.equals_ = options.equals || (options.compareStructural || options.struct ? comparer.structural : comparer["default"]);
    this.scope_ = options.context;
    this.requiresReaction_ = options.requiresReaction;
    this.keepAlive_ = !!options.keepAlive;
  }
  var _proto = ComputedValue.prototype;
  _proto.onBecomeStale_ = function onBecomeStale_() {
    propagateMaybeChanged(this);
  };
  _proto.onBO = function onBO() {
    if (this.onBOL) {
      this.onBOL.forEach(function (listener) {
        return listener();
      });
    }
  };
  _proto.onBUO = function onBUO() {
    if (this.onBUOL) {
      this.onBUOL.forEach(function (listener) {
        return listener();
      });
    }
  }
  /**
   * Returns the current value of this computed value.
   * Will evaluate its computation first if needed.
   */;
  _proto.get = function get() {
    if (this.isComputing_) {
      die(32, this.name_, this.derivation);
    }
    if (globalState.inBatch === 0 &&
    // !globalState.trackingDerivatpion &&
    this.observers_.size === 0 && !this.keepAlive_) {
      if (shouldCompute(this)) {
        this.warnAboutUntrackedRead_();
        startBatch(); // See perf test 'computed memoization'
        this.value_ = this.computeValue_(false);
        endBatch();
      }
    } else {
      reportObserved(this);
      if (shouldCompute(this)) {
        var prevTrackingContext = globalState.trackingContext;
        if (this.keepAlive_ && !prevTrackingContext) {
          globalState.trackingContext = this;
        }
        if (this.trackAndCompute()) {
          propagateChangeConfirmed(this);
        }
        globalState.trackingContext = prevTrackingContext;
      }
    }
    var result = this.value_;
    if (isCaughtException(result)) {
      throw result.cause;
    }
    return result;
  };
  _proto.set = function set(value) {
    if (this.setter_) {
      if (this.isRunningSetter_) {
        die(33, this.name_);
      }
      this.isRunningSetter_ = true;
      try {
        this.setter_.call(this.scope_, value);
      } finally {
        this.isRunningSetter_ = false;
      }
    } else {
      die(34, this.name_);
    }
  };
  _proto.trackAndCompute = function trackAndCompute() {
    // N.B: unminified as it is used by MST
    var oldValue = this.value_;
    var wasSuspended = /* see #1208 */this.dependenciesState_ === IDerivationState_.NOT_TRACKING_;
    var newValue = this.computeValue_(true);
    var changed = wasSuspended || isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals_(oldValue, newValue);
    if (changed) {
      this.value_ = newValue;
      if (isSpyEnabled()) {
        spyReport({
          observableKind: "computed",
          debugObjectName: this.name_,
          object: this.scope_,
          type: "update",
          oldValue: oldValue,
          newValue: newValue
        });
      }
    }
    return changed;
  };
  _proto.computeValue_ = function computeValue_(track) {
    this.isComputing_ = true;
    // don't allow state changes during computation
    var prev = allowStateChangesStart(false);
    var res;
    if (track) {
      res = trackDerivedFunction(this, this.derivation, this.scope_);
    } else {
      if (globalState.disableErrorBoundaries === true) {
        res = this.derivation.call(this.scope_);
      } else {
        try {
          res = this.derivation.call(this.scope_);
        } catch (e) {
          res = new CaughtException(e);
        }
      }
    }
    allowStateChangesEnd(prev);
    this.isComputing_ = false;
    return res;
  };
  _proto.suspend_ = function suspend_() {
    if (!this.keepAlive_) {
      clearObserving(this);
      this.value_ = undefined; // don't hold on to computed value!
      if (this.isTracing_ !== TraceMode.NONE) {
        console.log("[mobx.trace] Computed value '" + this.name_ + "' was suspended and it will recompute on the next access.");
      }
    }
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    var _this = this;
    var firstTime = true;
    var prevValue = undefined;
    return autorun(function () {
      // TODO: why is this in a different place than the spyReport() function? in all other observables it's called in the same place
      var newValue = _this.get();
      if (!firstTime || fireImmediately) {
        var prevU = untrackedStart();
        listener({
          observableKind: "computed",
          debugObjectName: _this.name_,
          type: UPDATE,
          object: _this,
          newValue: newValue,
          oldValue: prevValue
        });
        untrackedEnd(prevU);
      }
      firstTime = false;
      prevValue = newValue;
    });
  };
  _proto.warnAboutUntrackedRead_ = function warnAboutUntrackedRead_() {
    if (this.isTracing_ !== TraceMode.NONE) {
      console.log("[mobx.trace] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute.");
    }
    if (typeof this.requiresReaction_ === "boolean" ? this.requiresReaction_ : globalState.computedRequiresReaction) {
      console.warn("[mobx] Computed value '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute.");
    }
  };
  _proto.toString = function toString() {
    return this.name_ + "[" + this.derivation.toString() + "]";
  };
  _proto.valueOf = function valueOf() {
    return toPrimitive(this.get());
  };
  _proto[_Symbol$toPrimitive$1] = function () {
    return this.valueOf();
  };
  return ComputedValue;
}();
var isComputedValue = /*#__PURE__*/createInstanceofPredicate("ComputedValue", ComputedValue);
var IDerivationState_;
(function (IDerivationState_) {
  // before being run or (outside batch and not being observed)
  // at this point derivation is not holding any data about dependency tree
  IDerivationState_[IDerivationState_["NOT_TRACKING_"] = -1] = "NOT_TRACKING_";
  // no shallow dependency changed since last computation
  // won't recalculate derivation
  // this is what makes mobx fast
  IDerivationState_[IDerivationState_["UP_TO_DATE_"] = 0] = "UP_TO_DATE_";
  // some deep dependency changed, but don't know if shallow dependency changed
  // will require to check first if UP_TO_DATE or POSSIBLY_STALE
  // currently only ComputedValue will propagate POSSIBLY_STALE
  //
  // having this state is second big optimization:
  // don't have to recompute on every dependency change, but only when it's needed
  IDerivationState_[IDerivationState_["POSSIBLY_STALE_"] = 1] = "POSSIBLY_STALE_";
  // A shallow dependency has changed since last computation and the derivation
  // will need to recompute when it's needed next.
  IDerivationState_[IDerivationState_["STALE_"] = 2] = "STALE_";
})(IDerivationState_ || (IDerivationState_ = {}));
var TraceMode;
(function (TraceMode) {
  TraceMode[TraceMode["NONE"] = 0] = "NONE";
  TraceMode[TraceMode["LOG"] = 1] = "LOG";
  TraceMode[TraceMode["BREAK"] = 2] = "BREAK";
})(TraceMode || (TraceMode = {}));
var CaughtException = function CaughtException(cause) {
  this.cause = void 0;
  this.cause = cause;
  // Empty
};
function isCaughtException(e) {
  return e instanceof CaughtException;
}
/**
 * Finds out whether any dependency of the derivation has actually changed.
 * If dependenciesState is 1 then it will recalculate dependencies,
 * if any dependency changed it will propagate it by changing dependenciesState to 2.
 *
 * By iterating over the dependencies in the same order that they were reported and
 * stopping on the first change, all the recalculations are only called for ComputedValues
 * that will be tracked by derivation. That is because we assume that if the first x
 * dependencies of the derivation doesn't change then the derivation should run the same way
 * up until accessing x-th dependency.
 */
function shouldCompute(derivation) {
  switch (derivation.dependenciesState_) {
    case IDerivationState_.UP_TO_DATE_:
      return false;
    case IDerivationState_.NOT_TRACKING_:
    case IDerivationState_.STALE_:
      return true;
    case IDerivationState_.POSSIBLY_STALE_:
      {
        // state propagation can occur outside of action/reactive context #2195
        var prevAllowStateReads = allowStateReadsStart(true);
        var prevUntracked = untrackedStart(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.
        var obs = derivation.observing_,
          l = obs.length;
        for (var i = 0; i < l; i++) {
          var obj = obs[i];
          if (isComputedValue(obj)) {
            if (globalState.disableErrorBoundaries) {
              obj.get();
            } else {
              try {
                obj.get();
              } catch (e) {
                // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                untrackedEnd(prevUntracked);
                allowStateReadsEnd(prevAllowStateReads);
                return true;
              }
            }
            // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
            // and `derivation` is an observer of `obj`
            // invariantShouldCompute(derivation)
            if (derivation.dependenciesState_ === IDerivationState_.STALE_) {
              untrackedEnd(prevUntracked);
              allowStateReadsEnd(prevAllowStateReads);
              return true;
            }
          }
        }
        changeDependenciesStateTo0(derivation);
        untrackedEnd(prevUntracked);
        allowStateReadsEnd(prevAllowStateReads);
        return false;
      }
  }
}
function checkIfStateModificationsAreAllowed(atom) {
  var hasObservers = atom.observers_.size > 0;
  // Should not be possible to change observed state outside strict mode, except during initialization, see #563
  if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === "always")) {
    console.warn("[MobX] " + (globalState.enforceActions ? "Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, a computed value or the render function of a React component? You can wrap side effects in 'runInAction' (or decorate functions with 'action') if needed. Tried to modify: ") + atom.name_);
  }
}
function checkIfStateReadsAreAllowed(observable) {
  if (!globalState.allowStateReads && globalState.observableRequiresReaction) {
    console.warn("[mobx] Observable '" + observable.name_ + "' being read outside a reactive context.");
  }
}
/**
 * Executes the provided function `f` and tracks which observables are being accessed.
 * The tracking information is stored on the `derivation` object and the derivation is registered
 * as observer of any of the accessed observables.
 */
function trackDerivedFunction(derivation, f, context) {
  var prevAllowStateReads = allowStateReadsStart(true);
  changeDependenciesStateTo0(derivation);
  // Preallocate array; will be trimmed by bindDependencies.
  derivation.newObserving_ = new Array(
  // Reserve constant space for initial dependencies, dynamic space otherwise.
  // See https://github.com/mobxjs/mobx/pull/3833
  derivation.runId_ === 0 ? 100 : derivation.observing_.length);
  derivation.unboundDepsCount_ = 0;
  derivation.runId_ = ++globalState.runId;
  var prevTracking = globalState.trackingDerivation;
  globalState.trackingDerivation = derivation;
  globalState.inBatch++;
  var result;
  if (globalState.disableErrorBoundaries === true) {
    result = f.call(context);
  } else {
    try {
      result = f.call(context);
    } catch (e) {
      result = new CaughtException(e);
    }
  }
  globalState.inBatch--;
  globalState.trackingDerivation = prevTracking;
  bindDependencies(derivation);
  warnAboutDerivationWithoutDependencies(derivation);
  allowStateReadsEnd(prevAllowStateReads);
  return result;
}
function warnAboutDerivationWithoutDependencies(derivation) {
  if (derivation.observing_.length !== 0) {
    return;
  }
  if (typeof derivation.requiresObservable_ === "boolean" ? derivation.requiresObservable_ : globalState.reactionRequiresObservable) {
    console.warn("[mobx] Derivation '" + derivation.name_ + "' is created/updated without reading any observable value.");
  }
}
/**
 * diffs newObserving with observing.
 * update observing to be newObserving with unique observables
 * notify observers that become observed/unobserved
 */
function bindDependencies(derivation) {
  // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
  var prevObserving = derivation.observing_;
  var observing = derivation.observing_ = derivation.newObserving_;
  var lowestNewObservingDerivationState = IDerivationState_.UP_TO_DATE_;
  // Go through all new observables and check diffValue: (this list can contain duplicates):
  //   0: first occurrence, change to 1 and keep it
  //   1: extra occurrence, drop it
  var i0 = 0,
    l = derivation.unboundDepsCount_;
  for (var i = 0; i < l; i++) {
    var dep = observing[i];
    if (dep.diffValue_ === 0) {
      dep.diffValue_ = 1;
      if (i0 !== i) {
        observing[i0] = dep;
      }
      i0++;
    }
    // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
    // not hitting the condition
    if (dep.dependenciesState_ > lowestNewObservingDerivationState) {
      lowestNewObservingDerivationState = dep.dependenciesState_;
    }
  }
  observing.length = i0;
  derivation.newObserving_ = null; // newObserving shouldn't be needed outside tracking (statement moved down to work around FF bug, see #614)
  // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
  //   0: it's not in new observables, unobserve it
  //   1: it keeps being observed, don't want to notify it. change to 0
  l = prevObserving.length;
  while (l--) {
    var _dep = prevObserving[l];
    if (_dep.diffValue_ === 0) {
      removeObserver(_dep, derivation);
    }
    _dep.diffValue_ = 0;
  }
  // Go through all new observables and check diffValue: (now it should be unique)
  //   0: it was set to 0 in last loop. don't need to do anything.
  //   1: it wasn't observed, let's observe it. set back to 0
  while (i0--) {
    var _dep2 = observing[i0];
    if (_dep2.diffValue_ === 1) {
      _dep2.diffValue_ = 0;
      addObserver(_dep2, derivation);
    }
  }
  // Some new observed derivations may become stale during this derivation computation
  // so they have had no chance to propagate staleness (#916)
  if (lowestNewObservingDerivationState !== IDerivationState_.UP_TO_DATE_) {
    derivation.dependenciesState_ = lowestNewObservingDerivationState;
    derivation.onBecomeStale_();
  }
}
function clearObserving(derivation) {
  // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
  var obs = derivation.observing_;
  derivation.observing_ = [];
  var i = obs.length;
  while (i--) {
    removeObserver(obs[i], derivation);
  }
  derivation.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
}
function untracked(action) {
  var prev = untrackedStart();
  try {
    return action();
  } finally {
    untrackedEnd(prev);
  }
}
function untrackedStart() {
  var prev = globalState.trackingDerivation;
  globalState.trackingDerivation = null;
  return prev;
}
function untrackedEnd(prev) {
  globalState.trackingDerivation = prev;
}
function allowStateReadsStart(allowStateReads) {
  var prev = globalState.allowStateReads;
  globalState.allowStateReads = allowStateReads;
  return prev;
}
function allowStateReadsEnd(prev) {
  globalState.allowStateReads = prev;
}
/**
 * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
 *
 */
function changeDependenciesStateTo0(derivation) {
  if (derivation.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
    return;
  }
  derivation.dependenciesState_ = IDerivationState_.UP_TO_DATE_;
  var obs = derivation.observing_;
  var i = obs.length;
  while (i--) {
    obs[i].lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
  }
}
var MobXGlobals = function MobXGlobals() {
  this.version = 6;
  this.UNCHANGED = {};
  this.trackingDerivation = null;
  this.trackingContext = null;
  this.runId = 0;
  this.mobxGuid = 0;
  this.inBatch = 0;
  this.pendingUnobservations = [];
  this.pendingReactions = [];
  this.isRunningReactions = false;
  this.allowStateChanges = false;
  this.allowStateReads = true;
  this.enforceActions = true;
  this.spyListeners = [];
  this.globalReactionErrorHandlers = [];
  this.computedRequiresReaction = false;
  this.reactionRequiresObservable = false;
  this.observableRequiresReaction = false;
  this.disableErrorBoundaries = false;
  this.suppressReactionErrors = false;
  this.useProxies = true;
  this.verifyProxies = false;
  this.safeDescriptors = true;
};
var canMergeGlobalState = true;
var isolateCalled = false;
var globalState = /*#__PURE__*/function () {
  var global = /*#__PURE__*/getGlobal();
  if (global.__mx_isolated_mobxInstanceCount > 0 && !global.__mx_isolated_mobxGlobals) {
    canMergeGlobalState = false;
  }
  if (global.__mx_isolated_mobxGlobals && global.__mx_isolated_mobxGlobals.version !== new MobXGlobals().version) {
    canMergeGlobalState = false;
  }
  if (!canMergeGlobalState) {
    // Because this is a IIFE we need to let isolateCalled a chance to change
    // so we run it after the event loop completed at least 1 iteration
    setTimeout(function () {
      if (!isolateCalled) {
        die(35);
      }
    }, 1);
    return new MobXGlobals();
  } else if (global.__mx_isolated_mobxGlobals) {
    global.__mx_isolated_mobxInstanceCount += 1;
    if (!global.__mx_isolated_mobxGlobals.UNCHANGED) {
      global.__mx_isolated_mobxGlobals.UNCHANGED = {};
    } // make merge backward compatible
    return global.__mx_isolated_mobxGlobals;
  } else {
    global.__mx_isolated_mobxInstanceCount = 1;
    return global.__mx_isolated_mobxGlobals = /*#__PURE__*/new MobXGlobals();
  }
}();
function isolateGlobalState() {
  if (globalState.pendingReactions.length || globalState.inBatch || globalState.isRunningReactions) {
    die(36);
  }
  isolateCalled = true;
  if (canMergeGlobalState) {
    var global = getGlobal();
    if (--global.__mx_isolated_mobxInstanceCount === 0) {
      global.__mx_isolated_mobxGlobals = undefined;
    }
    globalState = new MobXGlobals();
  }
}
// function invariantObservers(observable: IObservable) {
//     const list = observable.observers
//     const map = observable.observersIndexes
//     const l = list.length
//     for (let i = 0; i < l; i++) {
//         const id = list[i].__mapid
//         if (i) {
//             invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list") // for performance
//         } else {
//             invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldn't be held in map.") // for performance
//         }
//     }
//     invariant(
//         list.length === 0 || Object.keys(map).length === list.length - 1,
//         "INTERNAL ERROR there is no junk in map"
//     )
// }
function addObserver(observable, node) {
  // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
  // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
  // invariantObservers(observable);
  observable.observers_.add(node);
  if (observable.lowestObserverState_ > node.dependenciesState_) {
    observable.lowestObserverState_ = node.dependenciesState_;
  }
  // invariantObservers(observable);
  // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
}
function removeObserver(observable, node) {
  // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
  // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
  // invariantObservers(observable);
  observable.observers_["delete"](node);
  if (observable.observers_.size === 0) {
    // deleting last observer
    queueForUnobservation(observable);
  }
  // invariantObservers(observable);
  // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");
}
function queueForUnobservation(observable) {
  if (observable.isPendingUnobservation_ === false) {
    // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
    observable.isPendingUnobservation_ = true;
    globalState.pendingUnobservations.push(observable);
  }
}
/**
 * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
 * During a batch `onBecomeUnobserved` will be called at most once per observable.
 * Avoids unnecessary recalculations.
 */
function startBatch() {
  globalState.inBatch++;
}
function endBatch() {
  if (--globalState.inBatch === 0) {
    runReactions();
    // the batch is actually about to finish, all unobserving should happen here.
    var list = globalState.pendingUnobservations;
    for (var i = 0; i < list.length; i++) {
      var observable = list[i];
      observable.isPendingUnobservation_ = false;
      if (observable.observers_.size === 0) {
        if (observable.isBeingObserved_) {
          // if this observable had reactive observers, trigger the hooks
          observable.isBeingObserved_ = false;
          observable.onBUO();
        }
        if (observable instanceof ComputedValue) {
          // computed values are automatically teared down when the last observer leaves
          // this process happens recursively, this computed might be the last observabe of another, etc..
          observable.suspend_();
        }
      }
    }
    globalState.pendingUnobservations = [];
  }
}
function reportObserved(observable) {
  checkIfStateReadsAreAllowed(observable);
  var derivation = globalState.trackingDerivation;
  if (derivation !== null) {
    /**
     * Simple optimization, give each derivation run an unique id (runId)
     * Check if last time this observable was accessed the same runId is used
     * if this is the case, the relation is already known
     */
    if (derivation.runId_ !== observable.lastAccessedBy_) {
      observable.lastAccessedBy_ = derivation.runId_;
      // Tried storing newObserving, or observing, or both as Set, but performance didn't come close...
      derivation.newObserving_[derivation.unboundDepsCount_++] = observable;
      if (!observable.isBeingObserved_ && globalState.trackingContext) {
        observable.isBeingObserved_ = true;
        observable.onBO();
      }
    }
    return observable.isBeingObserved_;
  } else if (observable.observers_.size === 0 && globalState.inBatch > 0) {
    queueForUnobservation(observable);
  }
  return false;
}
// function invariantLOS(observable: IObservable, msg: string) {
//     // it's expensive so better not run it in produciton. but temporarily helpful for testing
//     const min = getObservers(observable).reduce((a, b) => Math.min(a, b.dependenciesState), 2)
//     if (min >= observable.lowestObserverState) return // <- the only assumption about `lowestObserverState`
//     throw new Error(
//         "lowestObserverState is wrong for " +
//             msg +
//             " because " +
//             min +
//             " < " +
//             observable.lowestObserverState
//     )
// }
/**
 * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
 * It will propagate changes to observers from previous run
 * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
 * Hopefully self reruning autoruns aren't a feature people should depend on
 * Also most basic use cases should be ok
 */
// Called by Atom when its value changes
function propagateChanged(observable) {
  // invariantLOS(observable, "changed start");
  if (observable.lowestObserverState_ === IDerivationState_.STALE_) {
    return;
  }
  observable.lowestObserverState_ = IDerivationState_.STALE_;
  // Ideally we use for..of here, but the downcompiled version is really slow...
  observable.observers_.forEach(function (d) {
    if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
      if (d.isTracing_ !== TraceMode.NONE) {
        logTraceInfo(d, observable);
      }
      d.onBecomeStale_();
    }
    d.dependenciesState_ = IDerivationState_.STALE_;
  });
  // invariantLOS(observable, "changed end");
}
// Called by ComputedValue when it recalculate and its value changed
function propagateChangeConfirmed(observable) {
  // invariantLOS(observable, "confirmed start");
  if (observable.lowestObserverState_ === IDerivationState_.STALE_) {
    return;
  }
  observable.lowestObserverState_ = IDerivationState_.STALE_;
  observable.observers_.forEach(function (d) {
    if (d.dependenciesState_ === IDerivationState_.POSSIBLY_STALE_) {
      d.dependenciesState_ = IDerivationState_.STALE_;
      if (d.isTracing_ !== TraceMode.NONE) {
        logTraceInfo(d, observable);
      }
    } else if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_ // this happens during computing of `d`, just keep lowestObserverState up to date.
    ) {
      observable.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
    }
  });
  // invariantLOS(observable, "confirmed end");
}
// Used by computed when its dependency changed, but we don't wan't to immediately recompute.
function propagateMaybeChanged(observable) {
  // invariantLOS(observable, "maybe start");
  if (observable.lowestObserverState_ !== IDerivationState_.UP_TO_DATE_) {
    return;
  }
  observable.lowestObserverState_ = IDerivationState_.POSSIBLY_STALE_;
  observable.observers_.forEach(function (d) {
    if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
      d.dependenciesState_ = IDerivationState_.POSSIBLY_STALE_;
      d.onBecomeStale_();
    }
  });
  // invariantLOS(observable, "maybe end");
}
function logTraceInfo(derivation, observable) {
  console.log("[mobx.trace] '" + derivation.name_ + "' is invalidated due to a change in: '" + observable.name_ + "'");
  if (derivation.isTracing_ === TraceMode.BREAK) {
    var lines = [];
    printDepTree(getDependencyTree(derivation), lines, 1);
    // prettier-ignore
    new Function("debugger;\n/*\nTracing '" + derivation.name_ + "'\n\nYou are entering this break point because derivation '" + derivation.name_ + "' is being traced and '" + observable.name_ + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
  }
}
function printDepTree(tree, lines, depth) {
  if (lines.length >= 1000) {
    lines.push("(and many more)");
    return;
  }
  lines.push("" + "\t".repeat(depth - 1) + tree.name);
  if (tree.dependencies) {
    tree.dependencies.forEach(function (child) {
      return printDepTree(child, lines, depth + 1);
    });
  }
}
var Reaction = /*#__PURE__*/function () {
  // nodes we are looking at. Our value depends on these nodes

  function Reaction(name_, onInvalidate_, errorHandler_, requiresObservable_) {
    if (name_ === void 0) {
      name_ = "Reaction@" + getNextId() ;
    }
    this.name_ = void 0;
    this.onInvalidate_ = void 0;
    this.errorHandler_ = void 0;
    this.requiresObservable_ = void 0;
    this.observing_ = [];
    this.newObserving_ = [];
    this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
    this.diffValue_ = 0;
    this.runId_ = 0;
    this.unboundDepsCount_ = 0;
    this.isDisposed_ = false;
    this.isScheduled_ = false;
    this.isTrackPending_ = false;
    this.isRunning_ = false;
    this.isTracing_ = TraceMode.NONE;
    this.name_ = name_;
    this.onInvalidate_ = onInvalidate_;
    this.errorHandler_ = errorHandler_;
    this.requiresObservable_ = requiresObservable_;
  }
  var _proto = Reaction.prototype;
  _proto.onBecomeStale_ = function onBecomeStale_() {
    this.schedule_();
  };
  _proto.schedule_ = function schedule_() {
    if (!this.isScheduled_) {
      this.isScheduled_ = true;
      globalState.pendingReactions.push(this);
      runReactions();
    }
  };
  _proto.isScheduled = function isScheduled() {
    return this.isScheduled_;
  }
  /**
   * internal, use schedule() if you intend to kick off a reaction
   */;
  _proto.runReaction_ = function runReaction_() {
    if (!this.isDisposed_) {
      startBatch();
      this.isScheduled_ = false;
      var prev = globalState.trackingContext;
      globalState.trackingContext = this;
      if (shouldCompute(this)) {
        this.isTrackPending_ = true;
        try {
          this.onInvalidate_();
          if ('development' !== "production" && this.isTrackPending_ && isSpyEnabled()) {
            // onInvalidate didn't trigger track right away..
            spyReport({
              name: this.name_,
              type: "scheduled-reaction"
            });
          }
        } catch (e) {
          this.reportExceptionInDerivation_(e);
        }
      }
      globalState.trackingContext = prev;
      endBatch();
    }
  };
  _proto.track = function track(fn) {
    if (this.isDisposed_) {
      return;
      // console.warn("Reaction already disposed") // Note: Not a warning / error in mobx 4 either
    }
    startBatch();
    var notify = isSpyEnabled();
    var startTime;
    if (notify) {
      startTime = Date.now();
      spyReportStart({
        name: this.name_,
        type: "reaction"
      });
    }
    this.isRunning_ = true;
    var prevReaction = globalState.trackingContext; // reactions could create reactions...
    globalState.trackingContext = this;
    var result = trackDerivedFunction(this, fn, undefined);
    globalState.trackingContext = prevReaction;
    this.isRunning_ = false;
    this.isTrackPending_ = false;
    if (this.isDisposed_) {
      // disposed during last run. Clean up everything that was bound after the dispose call.
      clearObserving(this);
    }
    if (isCaughtException(result)) {
      this.reportExceptionInDerivation_(result.cause);
    }
    if (notify) {
      spyReportEnd({
        time: Date.now() - startTime
      });
    }
    endBatch();
  };
  _proto.reportExceptionInDerivation_ = function reportExceptionInDerivation_(error) {
    var _this = this;
    if (this.errorHandler_) {
      this.errorHandler_(error, this);
      return;
    }
    if (globalState.disableErrorBoundaries) {
      throw error;
    }
    var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'" ;
    if (!globalState.suppressReactionErrors) {
      console.error(message, error);
      /** If debugging brought you here, please, read the above message :-). Tnx! */
    } else {
      console.warn("[mobx] (error in reaction '" + this.name_ + "' suppressed, fix error of causing action below)");
    } // prettier-ignore
    if (isSpyEnabled()) {
      spyReport({
        type: "error",
        name: this.name_,
        message: message,
        error: "" + error
      });
    }
    globalState.globalReactionErrorHandlers.forEach(function (f) {
      return f(error, _this);
    });
  };
  _proto.dispose = function dispose() {
    if (!this.isDisposed_) {
      this.isDisposed_ = true;
      if (!this.isRunning_) {
        // if disposed while running, clean up later. Maybe not optimal, but rare case
        startBatch();
        clearObserving(this);
        endBatch();
      }
    }
  };
  _proto.getDisposer_ = function getDisposer_(abortSignal) {
    var _this2 = this;
    var dispose = function dispose() {
      _this2.dispose();
      abortSignal == null ? void 0 : abortSignal.removeEventListener == null ? void 0 : abortSignal.removeEventListener("abort", dispose);
    };
    abortSignal == null ? void 0 : abortSignal.addEventListener == null ? void 0 : abortSignal.addEventListener("abort", dispose);
    dispose[$mobx] = this;
    return dispose;
  };
  _proto.toString = function toString() {
    return "Reaction[" + this.name_ + "]";
  };
  _proto.trace = function trace$1(enterBreakPoint) {
    if (enterBreakPoint === void 0) {
      enterBreakPoint = false;
    }
    trace(this, enterBreakPoint);
  };
  return Reaction;
}();
/**
 * Magic number alert!
 * Defines within how many times a reaction is allowed to re-trigger itself
 * until it is assumed that this is gonna be a never ending loop...
 */
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function reactionScheduler(f) {
  return f();
};
function runReactions() {
  // Trampolining, if runReactions are already running, new reactions will be picked up
  if (globalState.inBatch > 0 || globalState.isRunningReactions) {
    return;
  }
  reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
  globalState.isRunningReactions = true;
  var allReactions = globalState.pendingReactions;
  var iterations = 0;
  // While running reactions, new reactions might be triggered.
  // Hence we work with two variables and check whether
  // we converge to no remaining reactions after a while.
  while (allReactions.length > 0) {
    if (++iterations === MAX_REACTION_ITERATIONS) {
      console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]) );
      allReactions.splice(0); // clear reactions
    }
    var remainingReactions = allReactions.splice(0);
    for (var i = 0, l = remainingReactions.length; i < l; i++) {
      remainingReactions[i].runReaction_();
    }
  }
  globalState.isRunningReactions = false;
}
var isReaction = /*#__PURE__*/createInstanceofPredicate("Reaction", Reaction);
function setReactionScheduler(fn) {
  var baseScheduler = reactionScheduler;
  reactionScheduler = function reactionScheduler(f) {
    return fn(function () {
      return baseScheduler(f);
    });
  };
}
function isSpyEnabled() {
  return !!globalState.spyListeners.length;
}
function spyReport(event) {
  if (!globalState.spyListeners.length) {
    return;
  }
  var listeners = globalState.spyListeners;
  for (var i = 0, l = listeners.length; i < l; i++) {
    listeners[i](event);
  }
}
function spyReportStart(event) {
  var change = _extends({}, event, {
    spyReportStart: true
  });
  spyReport(change);
}
var END_EVENT = {
  type: "report-end",
  spyReportEnd: true
};
function spyReportEnd(change) {
  if (change) {
    spyReport(_extends({}, change, {
      type: "report-end",
      spyReportEnd: true
    }));
  } else {
    spyReport(END_EVENT);
  }
}
function spy(listener) {
  {
    globalState.spyListeners.push(listener);
    return once(function () {
      globalState.spyListeners = globalState.spyListeners.filter(function (l) {
        return l !== listener;
      });
    });
  }
}
var ACTION = "action";
var ACTION_BOUND = "action.bound";
var AUTOACTION = "autoAction";
var AUTOACTION_BOUND = "autoAction.bound";
var DEFAULT_ACTION_NAME = "<unnamed action>";
var actionAnnotation = /*#__PURE__*/createActionAnnotation(ACTION);
var actionBoundAnnotation = /*#__PURE__*/createActionAnnotation(ACTION_BOUND, {
  bound: true
});
var autoActionAnnotation = /*#__PURE__*/createActionAnnotation(AUTOACTION, {
  autoAction: true
});
var autoActionBoundAnnotation = /*#__PURE__*/createActionAnnotation(AUTOACTION_BOUND, {
  autoAction: true,
  bound: true
});
function createActionFactory(autoAction) {
  var res = function action(arg1, arg2) {
    // action(fn() {})
    if (isFunction(arg1)) {
      return createAction(arg1.name || DEFAULT_ACTION_NAME, arg1, autoAction);
    }
    // action("name", fn() {})
    if (isFunction(arg2)) {
      return createAction(arg1, arg2, autoAction);
    }
    // @action (2022.3 Decorators)
    if (is20223Decorator(arg2)) {
      return (autoAction ? autoActionAnnotation : actionAnnotation).decorate_20223_(arg1, arg2);
    }
    // @action
    if (isStringish(arg2)) {
      return storeAnnotation(arg1, arg2, autoAction ? autoActionAnnotation : actionAnnotation);
    }
    // action("name") & @action("name")
    if (isStringish(arg1)) {
      return createDecoratorAnnotation(createActionAnnotation(autoAction ? AUTOACTION : ACTION, {
        name: arg1,
        autoAction: autoAction
      }));
    }
    {
      die("Invalid arguments for `action`");
    }
  };
  return res;
}
var action = /*#__PURE__*/createActionFactory(false);
Object.assign(action, actionAnnotation);
var autoAction = /*#__PURE__*/createActionFactory(true);
Object.assign(autoAction, autoActionAnnotation);
action.bound = /*#__PURE__*/createDecoratorAnnotation(actionBoundAnnotation);
autoAction.bound = /*#__PURE__*/createDecoratorAnnotation(autoActionBoundAnnotation);
function isAction(thing) {
  return isFunction(thing) && thing.isMobxAction === true;
}

/**
 * Creates a named reactive view and keeps it alive, so that the view is always
 * updated if one of the dependencies changes, even when the view is not further used by something else.
 * @param view The reactive view
 * @returns disposer function, which can be used to stop the view from being updated in the future.
 */
function autorun(view, opts) {
  var _opts$name, _opts, _opts2, _opts2$signal, _opts3;
  if (opts === void 0) {
    opts = EMPTY_OBJECT;
  }
  {
    if (!isFunction(view)) {
      die("Autorun expects a function as first argument");
    }
    if (isAction(view)) {
      die("Autorun does not accept actions since actions are untrackable");
    }
  }
  var name = (_opts$name = (_opts = opts) == null ? void 0 : _opts.name) != null ? _opts$name : view.name || "Autorun@" + getNextId() ;
  var runSync = !opts.scheduler && !opts.delay;
  var reaction;
  if (runSync) {
    // normal autorun
    reaction = new Reaction(name, function () {
      this.track(reactionRunner);
    }, opts.onError, opts.requiresObservable);
  } else {
    var scheduler = createSchedulerFromOptions(opts);
    // debounced autorun
    var isScheduled = false;
    reaction = new Reaction(name, function () {
      if (!isScheduled) {
        isScheduled = true;
        scheduler(function () {
          isScheduled = false;
          if (!reaction.isDisposed_) {
            reaction.track(reactionRunner);
          }
        });
      }
    }, opts.onError, opts.requiresObservable);
  }
  function reactionRunner() {
    view(reaction);
  }
  if (!((_opts2 = opts) != null && (_opts2$signal = _opts2.signal) != null && _opts2$signal.aborted)) {
    reaction.schedule_();
  }
  return reaction.getDisposer_((_opts3 = opts) == null ? void 0 : _opts3.signal);
}
var run = function run(f) {
  return f();
};
function createSchedulerFromOptions(opts) {
  return opts.scheduler ? opts.scheduler : opts.delay ? function (f) {
    return setTimeout(f, opts.delay);
  } : run;
}
var ON_BECOME_OBSERVED = "onBO";
var ON_BECOME_UNOBSERVED = "onBUO";
function onBecomeObserved(thing, arg2, arg3) {
  return interceptHook(ON_BECOME_OBSERVED, thing, arg2, arg3);
}
function onBecomeUnobserved(thing, arg2, arg3) {
  return interceptHook(ON_BECOME_UNOBSERVED, thing, arg2, arg3);
}
function interceptHook(hook, thing, arg2, arg3) {
  var atom = getAtom(thing);
  var cb = isFunction(arg3) ? arg3 : arg2;
  var listenersKey = hook + "L";
  if (atom[listenersKey]) {
    atom[listenersKey].add(cb);
  } else {
    atom[listenersKey] = new Set([cb]);
  }
  return function () {
    var hookListeners = atom[listenersKey];
    if (hookListeners) {
      hookListeners["delete"](cb);
      if (hookListeners.size === 0) {
        delete atom[listenersKey];
      }
    }
  };
}
var NEVER = "never";
var ALWAYS = "always";
var OBSERVED = "observed";
// const IF_AVAILABLE = "ifavailable"
function configure(options) {
  if (options.isolateGlobalState === true) {
    isolateGlobalState();
  }
  var useProxies = options.useProxies,
    enforceActions = options.enforceActions;
  if (useProxies !== undefined) {
    globalState.useProxies = useProxies === ALWAYS ? true : useProxies === NEVER ? false : typeof Proxy !== "undefined";
  }
  if (useProxies === "ifavailable") {
    globalState.verifyProxies = true;
  }
  if (enforceActions !== undefined) {
    var ea = enforceActions === ALWAYS ? ALWAYS : enforceActions === OBSERVED;
    globalState.enforceActions = ea;
    globalState.allowStateChanges = ea === true || ea === ALWAYS ? false : true;
  }
  ["computedRequiresReaction", "reactionRequiresObservable", "observableRequiresReaction", "disableErrorBoundaries", "safeDescriptors"].forEach(function (key) {
    if (key in options) {
      globalState[key] = !!options[key];
    }
  });
  globalState.allowStateReads = !globalState.observableRequiresReaction;
  if (globalState.disableErrorBoundaries === true) {
    console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled.");
  }
  if (options.reactionScheduler) {
    setReactionScheduler(options.reactionScheduler);
  }
}
function extendObservable(target, properties, annotations, options) {
  {
    if (arguments.length > 4) {
      die("'extendObservable' expected 2-4 arguments");
    }
    if (typeof target !== "object") {
      die("'extendObservable' expects an object as first argument");
    }
    if (isObservableMap(target)) {
      die("'extendObservable' should not be used on maps, use map.merge instead");
    }
    if (!isPlainObject(properties)) {
      die("'extendObservable' only accepts plain objects as second argument");
    }
    if (isObservable(properties) || isObservable(annotations)) {
      die("Extending an object with another observable (object) is not supported");
    }
  }
  // Pull descriptors first, so we don't have to deal with props added by administration ($mobx)
  var descriptors = getOwnPropertyDescriptors(properties);
  initObservable(function () {
    var adm = asObservableObject(target, options)[$mobx];
    ownKeys(descriptors).forEach(function (key) {
      adm.extend_(key, descriptors[key],
      // must pass "undefined" for { key: undefined }
      !annotations ? true : key in annotations ? annotations[key] : true);
    });
  });
  return target;
}
function getDependencyTree(thing, property) {
  return nodeToDependencyTree(getAtom(thing, property));
}
function nodeToDependencyTree(node) {
  var result = {
    name: node.name_
  };
  if (node.observing_ && node.observing_.length > 0) {
    result.dependencies = unique(node.observing_).map(nodeToDependencyTree);
  }
  return result;
}
function unique(list) {
  return Array.from(new Set(list));
}
var generatorId = 0;
function FlowCancellationError() {
  this.message = "FLOW_CANCELLED";
}
FlowCancellationError.prototype = /*#__PURE__*/Object.create(Error.prototype);
var flowAnnotation = /*#__PURE__*/createFlowAnnotation("flow");
var flowBoundAnnotation = /*#__PURE__*/createFlowAnnotation("flow.bound", {
  bound: true
});
var flow = /*#__PURE__*/Object.assign(function flow(arg1, arg2) {
  //  (2022.3 Decorators)
  if (is20223Decorator(arg2)) {
    return flowAnnotation.decorate_20223_(arg1, arg2);
  }
  if (isStringish(arg2)) {
    return storeAnnotation(arg1, arg2, flowAnnotation);
  }
  // flow(fn)
  if (arguments.length !== 1) {
    die("Flow expects single argument with generator function");
  }
  var generator = arg1;
  var name = generator.name || "<unnamed flow>";
  // Implementation based on https://github.com/tj/co/blob/master/index.js
  var res = function res() {
    var ctx = this;
    var args = arguments;
    var runId = ++generatorId;
    var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
    var rejector;
    var pendingPromise = undefined;
    var promise = new Promise(function (resolve, reject) {
      var stepId = 0;
      rejector = reject;
      function onFulfilled(res) {
        pendingPromise = undefined;
        var ret;
        try {
          ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res);
        } catch (e) {
          return reject(e);
        }
        next(ret);
      }
      function onRejected(err) {
        pendingPromise = undefined;
        var ret;
        try {
          ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen["throw"]).call(gen, err);
        } catch (e) {
          return reject(e);
        }
        next(ret);
      }
      function next(ret) {
        if (isFunction(ret == null ? void 0 : ret.then)) {
          // an async iterator
          ret.then(next, reject);
          return;
        }
        if (ret.done) {
          return resolve(ret.value);
        }
        pendingPromise = Promise.resolve(ret.value);
        return pendingPromise.then(onFulfilled, onRejected);
      }
      onFulfilled(undefined); // kick off the process
    });
    promise.cancel = action(name + " - runid: " + runId + " - cancel", function () {
      try {
        if (pendingPromise) {
          cancelPromise(pendingPromise);
        }
        // Finally block can return (or yield) stuff..
        var _res = gen["return"](undefined);
        // eat anything that promise would do, it's cancelled!
        var yieldedPromise = Promise.resolve(_res.value);
        yieldedPromise.then(noop, noop);
        cancelPromise(yieldedPromise); // maybe it can be cancelled :)
        // reject our original promise
        rejector(new FlowCancellationError());
      } catch (e) {
        rejector(e); // there could be a throwing finally block
      }
    });
    return promise;
  };
  res.isMobXFlow = true;
  return res;
}, flowAnnotation);
flow.bound = /*#__PURE__*/createDecoratorAnnotation(flowBoundAnnotation);
function cancelPromise(promise) {
  if (isFunction(promise.cancel)) {
    promise.cancel();
  }
}
function isFlow(fn) {
  return (fn == null ? void 0 : fn.isMobXFlow) === true;
}
function _isObservable(value, property) {
  if (!value) {
    return false;
  }
  // For first check, see #701
  return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
}
function isObservable(value) {
  if (arguments.length !== 1) {
    die("isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
  }
  return _isObservable(value);
}
function trace() {
  var enterBreakPoint = false;
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (typeof args[args.length - 1] === "boolean") {
    enterBreakPoint = args.pop();
  }
  var derivation = getAtomFromArgs(args);
  if (!derivation) {
    return die("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
  }
  if (derivation.isTracing_ === TraceMode.NONE) {
    console.log("[mobx.trace] '" + derivation.name_ + "' tracing enabled");
  }
  derivation.isTracing_ = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
}
function getAtomFromArgs(args) {
  switch (args.length) {
    case 0:
      return globalState.trackingDerivation;
    case 1:
      return getAtom(args[0]);
    case 2:
      return getAtom(args[0], args[1]);
  }
}

/**
 * During a transaction no views are updated until the end of the transaction.
 * The transaction will be run synchronously nonetheless.
 *
 * @param action a function that updates some reactive state
 * @returns any value that was returned by the 'action' parameter.
 */
function transaction(action, thisArg) {
  if (thisArg === void 0) {
    thisArg = undefined;
  }
  startBatch();
  try {
    return action.apply(thisArg);
  } finally {
    endBatch();
  }
}
function getAdm(target) {
  return target[$mobx];
}
// Optimization: we don't need the intermediate objects and could have a completely custom administration for DynamicObjects,
// and skip either the internal values map, or the base object with its property descriptors!
var objectProxyTraps = {
  has: function has(target, name) {
    if (globalState.trackingDerivation) {
      warnAboutProxyRequirement("detect new properties using the 'in' operator. Use 'has' from 'mobx' instead.");
    }
    return getAdm(target).has_(name);
  },
  get: function get(target, name) {
    return getAdm(target).get_(name);
  },
  set: function set(target, name, value) {
    var _getAdm$set_;
    if (!isStringish(name)) {
      return false;
    }
    if (!getAdm(target).values_.has(name)) {
      warnAboutProxyRequirement("add a new observable property through direct assignment. Use 'set' from 'mobx' instead.");
    }
    // null (intercepted) -> true (success)
    return (_getAdm$set_ = getAdm(target).set_(name, value, true)) != null ? _getAdm$set_ : true;
  },
  deleteProperty: function deleteProperty(target, name) {
    var _getAdm$delete_;
    {
      warnAboutProxyRequirement("delete properties from an observable object. Use 'remove' from 'mobx' instead.");
    }
    if (!isStringish(name)) {
      return false;
    }
    // null (intercepted) -> true (success)
    return (_getAdm$delete_ = getAdm(target).delete_(name, true)) != null ? _getAdm$delete_ : true;
  },
  defineProperty: function defineProperty(target, name, descriptor) {
    var _getAdm$definePropert;
    {
      warnAboutProxyRequirement("define property on an observable object. Use 'defineProperty' from 'mobx' instead.");
    }
    // null (intercepted) -> true (success)
    return (_getAdm$definePropert = getAdm(target).defineProperty_(name, descriptor)) != null ? _getAdm$definePropert : true;
  },
  ownKeys: function ownKeys(target) {
    if (globalState.trackingDerivation) {
      warnAboutProxyRequirement("iterate keys to detect added / removed properties. Use 'keys' from 'mobx' instead.");
    }
    return getAdm(target).ownKeys_();
  },
  preventExtensions: function preventExtensions(target) {
    die(13);
  }
};
function asDynamicObservableObject(target, options) {
  var _target$$mobx, _target$$mobx$proxy_;
  assertProxies();
  target = asObservableObject(target, options);
  return (_target$$mobx$proxy_ = (_target$$mobx = target[$mobx]).proxy_) != null ? _target$$mobx$proxy_ : _target$$mobx.proxy_ = new Proxy(target, objectProxyTraps);
}
function hasInterceptors(interceptable) {
  return interceptable.interceptors_ !== undefined && interceptable.interceptors_.length > 0;
}
function registerInterceptor(interceptable, handler) {
  var interceptors = interceptable.interceptors_ || (interceptable.interceptors_ = []);
  interceptors.push(handler);
  return once(function () {
    var idx = interceptors.indexOf(handler);
    if (idx !== -1) {
      interceptors.splice(idx, 1);
    }
  });
}
function interceptChange(interceptable, change) {
  var prevU = untrackedStart();
  try {
    // Interceptor can modify the array, copy it to avoid concurrent modification, see #1950
    var interceptors = [].concat(interceptable.interceptors_ || []);
    for (var i = 0, l = interceptors.length; i < l; i++) {
      change = interceptors[i](change);
      if (change && !change.type) {
        die(14);
      }
      if (!change) {
        break;
      }
    }
    return change;
  } finally {
    untrackedEnd(prevU);
  }
}
function hasListeners(listenable) {
  return listenable.changeListeners_ !== undefined && listenable.changeListeners_.length > 0;
}
function registerListener(listenable, handler) {
  var listeners = listenable.changeListeners_ || (listenable.changeListeners_ = []);
  listeners.push(handler);
  return once(function () {
    var idx = listeners.indexOf(handler);
    if (idx !== -1) {
      listeners.splice(idx, 1);
    }
  });
}
function notifyListeners(listenable, change) {
  var prevU = untrackedStart();
  var listeners = listenable.changeListeners_;
  if (!listeners) {
    return;
  }
  listeners = listeners.slice();
  for (var i = 0, l = listeners.length; i < l; i++) {
    listeners[i](change);
  }
  untrackedEnd(prevU);
}
function makeObservable(target, annotations, options) {
  initObservable(function () {
    var _annotations;
    var adm = asObservableObject(target, options)[$mobx];
    if ('development' !== "production" && annotations && target[storedAnnotationsSymbol]) {
      die("makeObservable second arg must be nullish when using decorators. Mixing @decorator syntax with annotations is not supported.");
    }
    // Default to decorators
    (_annotations = annotations) != null ? _annotations : annotations = collectStoredAnnotations(target);
    // Annotate
    ownKeys(annotations).forEach(function (key) {
      return adm.make_(key, annotations[key]);
    });
  });
  return target;
}
var SPLICE = "splice";
var UPDATE = "update";
var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859
var arrayTraps = {
  get: function get(target, name) {
    var adm = target[$mobx];
    if (name === $mobx) {
      return adm;
    }
    if (name === "length") {
      return adm.getArrayLength_();
    }
    if (typeof name === "string" && !isNaN(name)) {
      return adm.get_(parseInt(name));
    }
    if (hasProp(arrayExtensions, name)) {
      return arrayExtensions[name];
    }
    return target[name];
  },
  set: function set(target, name, value) {
    var adm = target[$mobx];
    if (name === "length") {
      adm.setArrayLength_(value);
    }
    if (typeof name === "symbol" || isNaN(name)) {
      target[name] = value;
    } else {
      // numeric string
      adm.set_(parseInt(name), value);
    }
    return true;
  },
  preventExtensions: function preventExtensions() {
    die(15);
  }
};
var ObservableArrayAdministration = /*#__PURE__*/function () {
  // this is the prop that gets proxied, so can't replace it!

  function ObservableArrayAdministration(name, enhancer, owned_, legacyMode_) {
    if (name === void 0) {
      name = "ObservableArray@" + getNextId() ;
    }
    this.owned_ = void 0;
    this.legacyMode_ = void 0;
    this.atom_ = void 0;
    this.values_ = [];
    this.interceptors_ = void 0;
    this.changeListeners_ = void 0;
    this.enhancer_ = void 0;
    this.dehancer = void 0;
    this.proxy_ = void 0;
    this.lastKnownLength_ = 0;
    this.owned_ = owned_;
    this.legacyMode_ = legacyMode_;
    this.atom_ = new Atom(name);
    this.enhancer_ = function (newV, oldV) {
      return enhancer(newV, oldV, name + "[..]" );
    };
  }
  var _proto = ObservableArrayAdministration.prototype;
  _proto.dehanceValue_ = function dehanceValue_(value) {
    if (this.dehancer !== undefined) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.dehanceValues_ = function dehanceValues_(values) {
    if (this.dehancer !== undefined && values.length > 0) {
      return values.map(this.dehancer);
    }
    return values;
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (fireImmediately === void 0) {
      fireImmediately = false;
    }
    if (fireImmediately) {
      listener({
        observableKind: "array",
        object: this.proxy_,
        debugObjectName: this.atom_.name_,
        type: "splice",
        index: 0,
        added: this.values_.slice(),
        addedCount: this.values_.length,
        removed: [],
        removedCount: 0
      });
    }
    return registerListener(this, listener);
  };
  _proto.getArrayLength_ = function getArrayLength_() {
    this.atom_.reportObserved();
    return this.values_.length;
  };
  _proto.setArrayLength_ = function setArrayLength_(newLength) {
    if (typeof newLength !== "number" || isNaN(newLength) || newLength < 0) {
      die("Out of range: " + newLength);
    }
    var currentLength = this.values_.length;
    if (newLength === currentLength) {
      return;
    } else if (newLength > currentLength) {
      var newItems = new Array(newLength - currentLength);
      for (var i = 0; i < newLength - currentLength; i++) {
        newItems[i] = undefined;
      } // No Array.fill everywhere...
      this.spliceWithArray_(currentLength, 0, newItems);
    } else {
      this.spliceWithArray_(newLength, currentLength - newLength);
    }
  };
  _proto.updateArrayLength_ = function updateArrayLength_(oldLength, delta) {
    if (oldLength !== this.lastKnownLength_) {
      die(16);
    }
    this.lastKnownLength_ += delta;
    if (this.legacyMode_ && delta > 0) {
      reserveArrayBuffer(oldLength + delta + 1);
    }
  };
  _proto.spliceWithArray_ = function spliceWithArray_(index, deleteCount, newItems) {
    var _this = this;
    checkIfStateModificationsAreAllowed(this.atom_);
    var length = this.values_.length;
    if (index === undefined) {
      index = 0;
    } else if (index > length) {
      index = length;
    } else if (index < 0) {
      index = Math.max(0, length + index);
    }
    if (arguments.length === 1) {
      deleteCount = length - index;
    } else if (deleteCount === undefined || deleteCount === null) {
      deleteCount = 0;
    } else {
      deleteCount = Math.max(0, Math.min(deleteCount, length - index));
    }
    if (newItems === undefined) {
      newItems = EMPTY_ARRAY;
    }
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy_,
        type: SPLICE,
        index: index,
        removedCount: deleteCount,
        added: newItems
      });
      if (!change) {
        return EMPTY_ARRAY;
      }
      deleteCount = change.removedCount;
      newItems = change.added;
    }
    newItems = newItems.length === 0 ? newItems : newItems.map(function (v) {
      return _this.enhancer_(v, undefined);
    });
    if (this.legacyMode_ || 'development' !== "production") {
      var lengthDelta = newItems.length - deleteCount;
      this.updateArrayLength_(length, lengthDelta); // checks if internal array wasn't modified
    }
    var res = this.spliceItemsIntoValues_(index, deleteCount, newItems);
    if (deleteCount !== 0 || newItems.length !== 0) {
      this.notifyArraySplice_(index, newItems, res);
    }
    return this.dehanceValues_(res);
  };
  _proto.spliceItemsIntoValues_ = function spliceItemsIntoValues_(index, deleteCount, newItems) {
    if (newItems.length < MAX_SPLICE_SIZE) {
      var _this$values_;
      return (_this$values_ = this.values_).splice.apply(_this$values_, [index, deleteCount].concat(newItems));
    } else {
      // The items removed by the splice
      var res = this.values_.slice(index, index + deleteCount);
      // The items that that should remain at the end of the array
      var oldItems = this.values_.slice(index + deleteCount);
      // New length is the previous length + addition count - deletion count
      this.values_.length += newItems.length - deleteCount;
      for (var i = 0; i < newItems.length; i++) {
        this.values_[index + i] = newItems[i];
      }
      for (var _i = 0; _i < oldItems.length; _i++) {
        this.values_[index + newItems.length + _i] = oldItems[_i];
      }
      return res;
    }
  };
  _proto.notifyArrayChildUpdate_ = function notifyArrayChildUpdate_(index, newValue, oldValue) {
    var notifySpy = !this.owned_ && isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      observableKind: "array",
      object: this.proxy_,
      type: UPDATE,
      debugObjectName: this.atom_.name_,
      index: index,
      newValue: newValue,
      oldValue: oldValue
    } : null;
    // The reason why this is on right hand side here (and not above), is this way the uglifier will drop it, but it won't
    // cause any runtime overhead in development mode without NODE_ENV set, unless spying is enabled
    if (notifySpy) {
      spyReportStart(change);
    }
    this.atom_.reportChanged();
    if (notify) {
      notifyListeners(this, change);
    }
    if (notifySpy) {
      spyReportEnd();
    }
  };
  _proto.notifyArraySplice_ = function notifyArraySplice_(index, added, removed) {
    var notifySpy = !this.owned_ && isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      observableKind: "array",
      object: this.proxy_,
      debugObjectName: this.atom_.name_,
      type: SPLICE,
      index: index,
      removed: removed,
      added: added,
      removedCount: removed.length,
      addedCount: added.length
    } : null;
    if (notifySpy) {
      spyReportStart(change);
    }
    this.atom_.reportChanged();
    // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe
    if (notify) {
      notifyListeners(this, change);
    }
    if (notifySpy) {
      spyReportEnd();
    }
  };
  _proto.get_ = function get_(index) {
    if (this.legacyMode_ && index >= this.values_.length) {
      console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + this.values_.length + "). Please check length first. Out of bound indices will not be tracked by MobX" );
      return undefined;
    }
    this.atom_.reportObserved();
    return this.dehanceValue_(this.values_[index]);
  };
  _proto.set_ = function set_(index, newValue) {
    var values = this.values_;
    if (this.legacyMode_ && index > values.length) {
      // out of bounds
      die(17, index, values.length);
    }
    if (index < values.length) {
      // update at index in range
      checkIfStateModificationsAreAllowed(this.atom_);
      var oldValue = values[index];
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: UPDATE,
          object: this.proxy_,
          index: index,
          newValue: newValue
        });
        if (!change) {
          return;
        }
        newValue = change.newValue;
      }
      newValue = this.enhancer_(newValue, oldValue);
      var changed = newValue !== oldValue;
      if (changed) {
        values[index] = newValue;
        this.notifyArrayChildUpdate_(index, newValue, oldValue);
      }
    } else {
      // For out of bound index, we don't create an actual sparse array,
      // but rather fill the holes with undefined (same as setArrayLength_).
      // This could be considered a bug.
      var newItems = new Array(index + 1 - values.length);
      for (var i = 0; i < newItems.length - 1; i++) {
        newItems[i] = undefined;
      } // No Array.fill everywhere...
      newItems[newItems.length - 1] = newValue;
      this.spliceWithArray_(values.length, 0, newItems);
    }
  };
  return ObservableArrayAdministration;
}();
function createObservableArray(initialValues, enhancer, name, owned) {
  if (name === void 0) {
    name = "ObservableArray@" + getNextId() ;
  }
  if (owned === void 0) {
    owned = false;
  }
  assertProxies();
  return initObservable(function () {
    var adm = new ObservableArrayAdministration(name, enhancer, owned, false);
    addHiddenFinalProp(adm.values_, $mobx, adm);
    var proxy = new Proxy(adm.values_, arrayTraps);
    adm.proxy_ = proxy;
    if (initialValues && initialValues.length) {
      adm.spliceWithArray_(0, 0, initialValues);
    }
    return proxy;
  });
}
// eslint-disable-next-line
var arrayExtensions = {
  clear: function clear() {
    return this.splice(0);
  },
  replace: function replace(newItems) {
    var adm = this[$mobx];
    return adm.spliceWithArray_(0, adm.values_.length, newItems);
  },
  // Used by JSON.stringify
  toJSON: function toJSON() {
    return this.slice();
  },
  /*
   * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
   * since these functions alter the inner structure of the array, the have side effects.
   * Because the have side effects, they should not be used in computed function,
   * and for that reason the do not call dependencyState.notifyObserved
   */
  splice: function splice(index, deleteCount) {
    for (var _len = arguments.length, newItems = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      newItems[_key - 2] = arguments[_key];
    }
    var adm = this[$mobx];
    switch (arguments.length) {
      case 0:
        return [];
      case 1:
        return adm.spliceWithArray_(index);
      case 2:
        return adm.spliceWithArray_(index, deleteCount);
    }
    return adm.spliceWithArray_(index, deleteCount, newItems);
  },
  spliceWithArray: function spliceWithArray(index, deleteCount, newItems) {
    return this[$mobx].spliceWithArray_(index, deleteCount, newItems);
  },
  push: function push() {
    var adm = this[$mobx];
    for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      items[_key2] = arguments[_key2];
    }
    adm.spliceWithArray_(adm.values_.length, 0, items);
    return adm.values_.length;
  },
  pop: function pop() {
    return this.splice(Math.max(this[$mobx].values_.length - 1, 0), 1)[0];
  },
  shift: function shift() {
    return this.splice(0, 1)[0];
  },
  unshift: function unshift() {
    var adm = this[$mobx];
    for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      items[_key3] = arguments[_key3];
    }
    adm.spliceWithArray_(0, 0, items);
    return adm.values_.length;
  },
  reverse: function reverse() {
    // reverse by default mutates in place before returning the result
    // which makes it both a 'derivation' and a 'mutation'.
    if (globalState.trackingDerivation) {
      die(37, "reverse");
    }
    this.replace(this.slice().reverse());
    return this;
  },
  sort: function sort() {
    // sort by default mutates in place before returning the result
    // which goes against all good practices. Let's not change the array in place!
    if (globalState.trackingDerivation) {
      die(37, "sort");
    }
    var copy = this.slice();
    copy.sort.apply(copy, arguments);
    this.replace(copy);
    return this;
  },
  remove: function remove(value) {
    var adm = this[$mobx];
    var idx = adm.dehanceValues_(adm.values_).indexOf(value);
    if (idx > -1) {
      this.splice(idx, 1);
      return true;
    }
    return false;
  }
};
/**
 * Wrap function from prototype
 * Without this, everything works as well, but this works
 * faster as everything works on unproxied values
 */
addArrayExtension("at", simpleFunc);
addArrayExtension("concat", simpleFunc);
addArrayExtension("flat", simpleFunc);
addArrayExtension("includes", simpleFunc);
addArrayExtension("indexOf", simpleFunc);
addArrayExtension("join", simpleFunc);
addArrayExtension("lastIndexOf", simpleFunc);
addArrayExtension("slice", simpleFunc);
addArrayExtension("toString", simpleFunc);
addArrayExtension("toLocaleString", simpleFunc);
addArrayExtension("toSorted", simpleFunc);
addArrayExtension("toSpliced", simpleFunc);
addArrayExtension("with", simpleFunc);
// map
addArrayExtension("every", mapLikeFunc);
addArrayExtension("filter", mapLikeFunc);
addArrayExtension("find", mapLikeFunc);
addArrayExtension("findIndex", mapLikeFunc);
addArrayExtension("findLast", mapLikeFunc);
addArrayExtension("findLastIndex", mapLikeFunc);
addArrayExtension("flatMap", mapLikeFunc);
addArrayExtension("forEach", mapLikeFunc);
addArrayExtension("map", mapLikeFunc);
addArrayExtension("some", mapLikeFunc);
addArrayExtension("toReversed", mapLikeFunc);
// reduce
addArrayExtension("reduce", reduceLikeFunc);
addArrayExtension("reduceRight", reduceLikeFunc);
function addArrayExtension(funcName, funcFactory) {
  if (typeof Array.prototype[funcName] === "function") {
    arrayExtensions[funcName] = funcFactory(funcName);
  }
}
// Report and delegate to dehanced array
function simpleFunc(funcName) {
  return function () {
    var adm = this[$mobx];
    adm.atom_.reportObserved();
    var dehancedValues = adm.dehanceValues_(adm.values_);
    return dehancedValues[funcName].apply(dehancedValues, arguments);
  };
}
// Make sure callbacks receive correct array arg #2326
function mapLikeFunc(funcName) {
  return function (callback, thisArg) {
    var _this2 = this;
    var adm = this[$mobx];
    adm.atom_.reportObserved();
    var dehancedValues = adm.dehanceValues_(adm.values_);
    return dehancedValues[funcName](function (element, index) {
      return callback.call(thisArg, element, index, _this2);
    });
  };
}
// Make sure callbacks receive correct array arg #2326
function reduceLikeFunc(funcName) {
  return function () {
    var _this3 = this;
    var adm = this[$mobx];
    adm.atom_.reportObserved();
    var dehancedValues = adm.dehanceValues_(adm.values_);
    // #2432 - reduce behavior depends on arguments.length
    var callback = arguments[0];
    arguments[0] = function (accumulator, currentValue, index) {
      return callback(accumulator, currentValue, index, _this3);
    };
    return dehancedValues[funcName].apply(dehancedValues, arguments);
  };
}
var isObservableArrayAdministration = /*#__PURE__*/createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray(thing) {
  return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
}
var _Symbol$iterator, _Symbol$toStringTag;
var ObservableMapMarker = {};
var ADD = "add";
var DELETE = "delete";
// just extend Map? See also https://gist.github.com/nestharus/13b4d74f2ef4a2f4357dbd3fc23c1e54
// But: https://github.com/mobxjs/mobx/issues/1556
_Symbol$iterator = Symbol.iterator;
_Symbol$toStringTag = Symbol.toStringTag;
var ObservableMap = /*#__PURE__*/function () {
  // hasMap, not hashMap >-).

  function ObservableMap(initialData, enhancer_, name_) {
    var _this = this;
    if (enhancer_ === void 0) {
      enhancer_ = deepEnhancer;
    }
    if (name_ === void 0) {
      name_ = "ObservableMap@" + getNextId() ;
    }
    this.enhancer_ = void 0;
    this.name_ = void 0;
    this[$mobx] = ObservableMapMarker;
    this.data_ = void 0;
    this.hasMap_ = void 0;
    this.keysAtom_ = void 0;
    this.interceptors_ = void 0;
    this.changeListeners_ = void 0;
    this.dehancer = void 0;
    this.enhancer_ = enhancer_;
    this.name_ = name_;
    if (!isFunction(Map)) {
      die(18);
    }
    initObservable(function () {
      _this.keysAtom_ = createAtom('development' !== "production" ? _this.name_ + ".keys()" : "ObservableMap.keys()");
      _this.data_ = new Map();
      _this.hasMap_ = new Map();
      if (initialData) {
        _this.merge(initialData);
      }
    });
  }
  var _proto = ObservableMap.prototype;
  _proto.has_ = function has_(key) {
    return this.data_.has(key);
  };
  _proto.has = function has(key) {
    var _this2 = this;
    if (!globalState.trackingDerivation) {
      return this.has_(key);
    }
    var entry = this.hasMap_.get(key);
    if (!entry) {
      var newEntry = entry = new ObservableValue(this.has_(key), referenceEnhancer, this.name_ + "." + stringifyKey(key) + "?" , false);
      this.hasMap_.set(key, newEntry);
      onBecomeUnobserved(newEntry, function () {
        return _this2.hasMap_["delete"](key);
      });
    }
    return entry.get();
  };
  _proto.set = function set(key, value) {
    var hasKey = this.has_(key);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: hasKey ? UPDATE : ADD,
        object: this,
        newValue: value,
        name: key
      });
      if (!change) {
        return this;
      }
      value = change.newValue;
    }
    if (hasKey) {
      this.updateValue_(key, value);
    } else {
      this.addValue_(key, value);
    }
    return this;
  };
  _proto["delete"] = function _delete(key) {
    var _this3 = this;
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: DELETE,
        object: this,
        name: key
      });
      if (!change) {
        return false;
      }
    }
    if (this.has_(key)) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var _change = notify || notifySpy ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: DELETE,
        object: this,
        oldValue: this.data_.get(key).value_,
        name: key
      } : null;
      if (notifySpy) {
        spyReportStart(_change);
      } // TODO fix type
      transaction(function () {
        var _this3$hasMap_$get;
        _this3.keysAtom_.reportChanged();
        (_this3$hasMap_$get = _this3.hasMap_.get(key)) == null ? void 0 : _this3$hasMap_$get.setNewValue_(false);
        var observable = _this3.data_.get(key);
        observable.setNewValue_(undefined);
        _this3.data_["delete"](key);
      });
      if (notify) {
        notifyListeners(this, _change);
      }
      if (notifySpy) {
        spyReportEnd();
      }
      return true;
    }
    return false;
  };
  _proto.updateValue_ = function updateValue_(key, newValue) {
    var observable = this.data_.get(key);
    newValue = observable.prepareNewValue_(newValue);
    if (newValue !== globalState.UNCHANGED) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: UPDATE,
        object: this,
        oldValue: observable.value_,
        name: key,
        newValue: newValue
      } : null;
      if (notifySpy) {
        spyReportStart(change);
      } // TODO fix type
      observable.setNewValue_(newValue);
      if (notify) {
        notifyListeners(this, change);
      }
      if (notifySpy) {
        spyReportEnd();
      }
    }
  };
  _proto.addValue_ = function addValue_(key, newValue) {
    var _this4 = this;
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    transaction(function () {
      var _this4$hasMap_$get;
      var observable = new ObservableValue(newValue, _this4.enhancer_, _this4.name_ + "." + stringifyKey(key) , false);
      _this4.data_.set(key, observable);
      newValue = observable.value_; // value might have been changed
      (_this4$hasMap_$get = _this4.hasMap_.get(key)) == null ? void 0 : _this4$hasMap_$get.setNewValue_(true);
      _this4.keysAtom_.reportChanged();
    });
    var notifySpy = isSpyEnabled();
    var notify = hasListeners(this);
    var change = notify || notifySpy ? {
      observableKind: "map",
      debugObjectName: this.name_,
      type: ADD,
      object: this,
      name: key,
      newValue: newValue
    } : null;
    if (notifySpy) {
      spyReportStart(change);
    } // TODO fix type
    if (notify) {
      notifyListeners(this, change);
    }
    if (notifySpy) {
      spyReportEnd();
    }
  };
  _proto.get = function get(key) {
    if (this.has(key)) {
      return this.dehanceValue_(this.data_.get(key).get());
    }
    return this.dehanceValue_(undefined);
  };
  _proto.dehanceValue_ = function dehanceValue_(value) {
    if (this.dehancer !== undefined) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.keys = function keys() {
    this.keysAtom_.reportObserved();
    return this.data_.keys();
  };
  _proto.values = function values() {
    var self = this;
    var keys = this.keys();
    return makeIterable({
      next: function next() {
        var _keys$next = keys.next(),
          done = _keys$next.done,
          value = _keys$next.value;
        return {
          done: done,
          value: done ? undefined : self.get(value)
        };
      }
    });
  };
  _proto.entries = function entries() {
    var self = this;
    var keys = this.keys();
    return makeIterable({
      next: function next() {
        var _keys$next2 = keys.next(),
          done = _keys$next2.done,
          value = _keys$next2.value;
        return {
          done: done,
          value: done ? undefined : [value, self.get(value)]
        };
      }
    });
  };
  _proto[_Symbol$iterator] = function () {
    return this.entries();
  };
  _proto.forEach = function forEach(callback, thisArg) {
    for (var _iterator = _createForOfIteratorHelperLoose(this), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
        key = _step$value[0],
        value = _step$value[1];
      callback.call(thisArg, value, key, this);
    }
  }
  /** Merge another object into this object, returns this. */;
  _proto.merge = function merge(other) {
    var _this5 = this;
    if (isObservableMap(other)) {
      other = new Map(other);
    }
    transaction(function () {
      if (isPlainObject(other)) {
        getPlainObjectKeys(other).forEach(function (key) {
          return _this5.set(key, other[key]);
        });
      } else if (Array.isArray(other)) {
        other.forEach(function (_ref) {
          var key = _ref[0],
            value = _ref[1];
          return _this5.set(key, value);
        });
      } else if (isES6Map(other)) {
        if (other.constructor !== Map) {
          die(19, other);
        }
        other.forEach(function (value, key) {
          return _this5.set(key, value);
        });
      } else if (other !== null && other !== undefined) {
        die(20, other);
      }
    });
    return this;
  };
  _proto.clear = function clear() {
    var _this6 = this;
    transaction(function () {
      untracked(function () {
        for (var _iterator2 = _createForOfIteratorHelperLoose(_this6.keys()), _step2; !(_step2 = _iterator2()).done;) {
          var key = _step2.value;
          _this6["delete"](key);
        }
      });
    });
  };
  _proto.replace = function replace(values) {
    var _this7 = this;
    // Implementation requirements:
    // - respect ordering of replacement map
    // - allow interceptors to run and potentially prevent individual operations
    // - don't recreate observables that already exist in original map (so we don't destroy existing subscriptions)
    // - don't _keysAtom.reportChanged if the keys of resulting map are indentical (order matters!)
    // - note that result map may differ from replacement map due to the interceptors
    transaction(function () {
      // Convert to map so we can do quick key lookups
      var replacementMap = convertToMap(values);
      var orderedData = new Map();
      // Used for optimization
      var keysReportChangedCalled = false;
      // Delete keys that don't exist in replacement map
      // if the key deletion is prevented by interceptor
      // add entry at the beginning of the result map
      for (var _iterator3 = _createForOfIteratorHelperLoose(_this7.data_.keys()), _step3; !(_step3 = _iterator3()).done;) {
        var key = _step3.value;
        // Concurrently iterating/deleting keys
        // iterator should handle this correctly
        if (!replacementMap.has(key)) {
          var deleted = _this7["delete"](key);
          // Was the key removed?
          if (deleted) {
            // _keysAtom.reportChanged() was already called
            keysReportChangedCalled = true;
          } else {
            // Delete prevented by interceptor
            var value = _this7.data_.get(key);
            orderedData.set(key, value);
          }
        }
      }
      // Merge entries
      for (var _iterator4 = _createForOfIteratorHelperLoose(replacementMap.entries()), _step4; !(_step4 = _iterator4()).done;) {
        var _step4$value = _step4.value,
          _key = _step4$value[0],
          _value = _step4$value[1];
        // We will want to know whether a new key is added
        var keyExisted = _this7.data_.has(_key);
        // Add or update value
        _this7.set(_key, _value);
        // The addition could have been prevent by interceptor
        if (_this7.data_.has(_key)) {
          // The update could have been prevented by interceptor
          // and also we want to preserve existing values
          // so use value from _data map (instead of replacement map)
          var _value2 = _this7.data_.get(_key);
          orderedData.set(_key, _value2);
          // Was a new key added?
          if (!keyExisted) {
            // _keysAtom.reportChanged() was already called
            keysReportChangedCalled = true;
          }
        }
      }
      // Check for possible key order change
      if (!keysReportChangedCalled) {
        if (_this7.data_.size !== orderedData.size) {
          // If size differs, keys are definitely modified
          _this7.keysAtom_.reportChanged();
        } else {
          var iter1 = _this7.data_.keys();
          var iter2 = orderedData.keys();
          var next1 = iter1.next();
          var next2 = iter2.next();
          while (!next1.done) {
            if (next1.value !== next2.value) {
              _this7.keysAtom_.reportChanged();
              break;
            }
            next1 = iter1.next();
            next2 = iter2.next();
          }
        }
      }
      // Use correctly ordered map
      _this7.data_ = orderedData;
    });
    return this;
  };
  _proto.toString = function toString() {
    return "[object ObservableMap]";
  };
  _proto.toJSON = function toJSON() {
    return Array.from(this);
  };
  /**
   * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
   * for callback details
   */
  _proto.observe_ = function observe_(listener, fireImmediately) {
    if (fireImmediately === true) {
      die("`observe` doesn't support fireImmediately=true in combination with maps.");
    }
    return registerListener(this, listener);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _createClass(ObservableMap, [{
    key: "size",
    get: function get() {
      this.keysAtom_.reportObserved();
      return this.data_.size;
    }
  }, {
    key: _Symbol$toStringTag,
    get: function get() {
      return "Map";
    }
  }]);
  return ObservableMap;
}();
// eslint-disable-next-line
var isObservableMap = /*#__PURE__*/createInstanceofPredicate("ObservableMap", ObservableMap);
function convertToMap(dataStructure) {
  if (isES6Map(dataStructure) || isObservableMap(dataStructure)) {
    return dataStructure;
  } else if (Array.isArray(dataStructure)) {
    return new Map(dataStructure);
  } else if (isPlainObject(dataStructure)) {
    var map = new Map();
    for (var key in dataStructure) {
      map.set(key, dataStructure[key]);
    }
    return map;
  } else {
    return die(21, dataStructure);
  }
}
var _Symbol$iterator$1, _Symbol$toStringTag$1;
var ObservableSetMarker = {};
_Symbol$iterator$1 = Symbol.iterator;
_Symbol$toStringTag$1 = Symbol.toStringTag;
var ObservableSet = /*#__PURE__*/function () {
  function ObservableSet(initialData, enhancer, name_) {
    var _this = this;
    if (enhancer === void 0) {
      enhancer = deepEnhancer;
    }
    if (name_ === void 0) {
      name_ = "ObservableSet@" + getNextId() ;
    }
    this.name_ = void 0;
    this[$mobx] = ObservableSetMarker;
    this.data_ = new Set();
    this.atom_ = void 0;
    this.changeListeners_ = void 0;
    this.interceptors_ = void 0;
    this.dehancer = void 0;
    this.enhancer_ = void 0;
    this.name_ = name_;
    if (!isFunction(Set)) {
      die(22);
    }
    this.enhancer_ = function (newV, oldV) {
      return enhancer(newV, oldV, name_);
    };
    initObservable(function () {
      _this.atom_ = createAtom(_this.name_);
      if (initialData) {
        _this.replace(initialData);
      }
    });
  }
  var _proto = ObservableSet.prototype;
  _proto.dehanceValue_ = function dehanceValue_(value) {
    if (this.dehancer !== undefined) {
      return this.dehancer(value);
    }
    return value;
  };
  _proto.clear = function clear() {
    var _this2 = this;
    transaction(function () {
      untracked(function () {
        for (var _iterator = _createForOfIteratorHelperLoose(_this2.data_.values()), _step; !(_step = _iterator()).done;) {
          var value = _step.value;
          _this2["delete"](value);
        }
      });
    });
  };
  _proto.forEach = function forEach(callbackFn, thisArg) {
    for (var _iterator2 = _createForOfIteratorHelperLoose(this), _step2; !(_step2 = _iterator2()).done;) {
      var value = _step2.value;
      callbackFn.call(thisArg, value, value, this);
    }
  };
  _proto.add = function add(value) {
    var _this3 = this;
    checkIfStateModificationsAreAllowed(this.atom_);
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: ADD,
        object: this,
        newValue: value
      });
      if (!change) {
        return this;
      }
      // ideally, value = change.value would be done here, so that values can be
      // changed by interceptor. Same applies for other Set and Map api's.
    }
    if (!this.has(value)) {
      transaction(function () {
        _this3.data_.add(_this3.enhancer_(value, undefined));
        _this3.atom_.reportChanged();
      });
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var _change = notify || notifySpy ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: ADD,
        object: this,
        newValue: value
      } : null;
      if (notifySpy && 'development' !== "production") {
        spyReportStart(_change);
      }
      if (notify) {
        notifyListeners(this, _change);
      }
      if (notifySpy && 'development' !== "production") {
        spyReportEnd();
      }
    }
    return this;
  };
  _proto["delete"] = function _delete(value) {
    var _this4 = this;
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: DELETE,
        object: this,
        oldValue: value
      });
      if (!change) {
        return false;
      }
    }
    if (this.has(value)) {
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var _change2 = notify || notifySpy ? {
        observableKind: "set",
        debugObjectName: this.name_,
        type: DELETE,
        object: this,
        oldValue: value
      } : null;
      if (notifySpy && 'development' !== "production") {
        spyReportStart(_change2);
      }
      transaction(function () {
        _this4.atom_.reportChanged();
        _this4.data_["delete"](value);
      });
      if (notify) {
        notifyListeners(this, _change2);
      }
      if (notifySpy && 'development' !== "production") {
        spyReportEnd();
      }
      return true;
    }
    return false;
  };
  _proto.has = function has(value) {
    this.atom_.reportObserved();
    return this.data_.has(this.dehanceValue_(value));
  };
  _proto.entries = function entries() {
    var nextIndex = 0;
    var keys = Array.from(this.keys());
    var values = Array.from(this.values());
    return makeIterable({
      next: function next() {
        var index = nextIndex;
        nextIndex += 1;
        return index < values.length ? {
          value: [keys[index], values[index]],
          done: false
        } : {
          done: true
        };
      }
    });
  };
  _proto.keys = function keys() {
    return this.values();
  };
  _proto.values = function values() {
    this.atom_.reportObserved();
    var self = this;
    var nextIndex = 0;
    var observableValues = Array.from(this.data_.values());
    return makeIterable({
      next: function next() {
        return nextIndex < observableValues.length ? {
          value: self.dehanceValue_(observableValues[nextIndex++]),
          done: false
        } : {
          done: true
        };
      }
    });
  };
  _proto.replace = function replace(other) {
    var _this5 = this;
    if (isObservableSet(other)) {
      other = new Set(other);
    }
    transaction(function () {
      if (Array.isArray(other)) {
        _this5.clear();
        other.forEach(function (value) {
          return _this5.add(value);
        });
      } else if (isES6Set(other)) {
        _this5.clear();
        other.forEach(function (value) {
          return _this5.add(value);
        });
      } else if (other !== null && other !== undefined) {
        die("Cannot initialize set from " + other);
      }
    });
    return this;
  };
  _proto.observe_ = function observe_(listener, fireImmediately) {
    // ... 'fireImmediately' could also be true?
    if (fireImmediately === true) {
      die("`observe` doesn't support fireImmediately=true in combination with sets.");
    }
    return registerListener(this, listener);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.toJSON = function toJSON() {
    return Array.from(this);
  };
  _proto.toString = function toString() {
    return "[object ObservableSet]";
  };
  _proto[_Symbol$iterator$1] = function () {
    return this.values();
  };
  _createClass(ObservableSet, [{
    key: "size",
    get: function get() {
      this.atom_.reportObserved();
      return this.data_.size;
    }
  }, {
    key: _Symbol$toStringTag$1,
    get: function get() {
      return "Set";
    }
  }]);
  return ObservableSet;
}();
// eslint-disable-next-line
var isObservableSet = /*#__PURE__*/createInstanceofPredicate("ObservableSet", ObservableSet);
var descriptorCache = /*#__PURE__*/Object.create(null);
var REMOVE = "remove";
var ObservableObjectAdministration = /*#__PURE__*/function () {
  function ObservableObjectAdministration(target_, values_, name_,
  // Used anytime annotation is not explicitely provided
  defaultAnnotation_) {
    if (values_ === void 0) {
      values_ = new Map();
    }
    if (defaultAnnotation_ === void 0) {
      defaultAnnotation_ = autoAnnotation;
    }
    this.target_ = void 0;
    this.values_ = void 0;
    this.name_ = void 0;
    this.defaultAnnotation_ = void 0;
    this.keysAtom_ = void 0;
    this.changeListeners_ = void 0;
    this.interceptors_ = void 0;
    this.proxy_ = void 0;
    this.isPlainObject_ = void 0;
    this.appliedAnnotations_ = void 0;
    this.pendingKeys_ = void 0;
    this.target_ = target_;
    this.values_ = values_;
    this.name_ = name_;
    this.defaultAnnotation_ = defaultAnnotation_;
    this.keysAtom_ = new Atom(this.name_ + ".keys" );
    // Optimization: we use this frequently
    this.isPlainObject_ = isPlainObject(this.target_);
    if (!isAnnotation(this.defaultAnnotation_)) {
      die("defaultAnnotation must be valid annotation");
    }
    {
      // Prepare structure for tracking which fields were already annotated
      this.appliedAnnotations_ = {};
    }
  }
  var _proto = ObservableObjectAdministration.prototype;
  _proto.getObservablePropValue_ = function getObservablePropValue_(key) {
    return this.values_.get(key).get();
  };
  _proto.setObservablePropValue_ = function setObservablePropValue_(key, newValue) {
    var observable = this.values_.get(key);
    if (observable instanceof ComputedValue) {
      observable.set(newValue);
      return true;
    }
    // intercept
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        type: UPDATE,
        object: this.proxy_ || this.target_,
        name: key,
        newValue: newValue
      });
      if (!change) {
        return null;
      }
      newValue = change.newValue;
    }
    newValue = observable.prepareNewValue_(newValue);
    // notify spy & observers
    if (newValue !== globalState.UNCHANGED) {
      var notify = hasListeners(this);
      var notifySpy = isSpyEnabled();
      var _change = notify || notifySpy ? {
        type: UPDATE,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        oldValue: observable.value_,
        name: key,
        newValue: newValue
      } : null;
      if (notifySpy) {
        spyReportStart(_change);
      }
      observable.setNewValue_(newValue);
      if (notify) {
        notifyListeners(this, _change);
      }
      if (notifySpy) {
        spyReportEnd();
      }
    }
    return true;
  };
  _proto.get_ = function get_(key) {
    if (globalState.trackingDerivation && !hasProp(this.target_, key)) {
      // Key doesn't exist yet, subscribe for it in case it's added later
      this.has_(key);
    }
    return this.target_[key];
  }
  /**
   * @param {PropertyKey} key
   * @param {any} value
   * @param {Annotation|boolean} annotation true - use default annotation, false - copy as is
   * @param {boolean} proxyTrap whether it's called from proxy trap
   * @returns {boolean|null} true on success, false on failure (proxyTrap + non-configurable), null when cancelled by interceptor
   */;
  _proto.set_ = function set_(key, value, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    // Don't use .has(key) - we care about own
    if (hasProp(this.target_, key)) {
      // Existing prop
      if (this.values_.has(key)) {
        // Observable (can be intercepted)
        return this.setObservablePropValue_(key, value);
      } else if (proxyTrap) {
        // Non-observable - proxy
        return Reflect.set(this.target_, key, value);
      } else {
        // Non-observable
        this.target_[key] = value;
        return true;
      }
    } else {
      // New prop
      return this.extend_(key, {
        value: value,
        enumerable: true,
        writable: true,
        configurable: true
      }, this.defaultAnnotation_, proxyTrap);
    }
  }
  // Trap for "in"
;
  _proto.has_ = function has_(key) {
    if (!globalState.trackingDerivation) {
      // Skip key subscription outside derivation
      return key in this.target_;
    }
    this.pendingKeys_ || (this.pendingKeys_ = new Map());
    var entry = this.pendingKeys_.get(key);
    if (!entry) {
      entry = new ObservableValue(key in this.target_, referenceEnhancer, this.name_ + "." + stringifyKey(key) + "?" , false);
      this.pendingKeys_.set(key, entry);
    }
    return entry.get();
  }
  /**
   * @param {PropertyKey} key
   * @param {Annotation|boolean} annotation true - use default annotation, false - ignore prop
   */;
  _proto.make_ = function make_(key, annotation) {
    if (annotation === true) {
      annotation = this.defaultAnnotation_;
    }
    if (annotation === false) {
      return;
    }
    assertAnnotable(this, annotation, key);
    if (!(key in this.target_)) {
      var _this$target_$storedA;
      // Throw on missing key, except for decorators:
      // Decorator annotations are collected from whole prototype chain.
      // When called from super() some props may not exist yet.
      // However we don't have to worry about missing prop,
      // because the decorator must have been applied to something.
      if ((_this$target_$storedA = this.target_[storedAnnotationsSymbol]) != null && _this$target_$storedA[key]) {
        return; // will be annotated by subclass constructor
      } else {
        die(1, annotation.annotationType_, this.name_ + "." + key.toString());
      }
    }
    var source = this.target_;
    while (source && source !== objectPrototype) {
      var descriptor = getDescriptor(source, key);
      if (descriptor) {
        var outcome = annotation.make_(this, key, descriptor, source);
        if (outcome === 0 /* MakeResult.Cancel */) {
          return;
        }
        if (outcome === 1 /* MakeResult.Break */) {
          break;
        }
      }
      source = Object.getPrototypeOf(source);
    }
    recordAnnotationApplied(this, annotation, key);
  }
  /**
   * @param {PropertyKey} key
   * @param {PropertyDescriptor} descriptor
   * @param {Annotation|boolean} annotation true - use default annotation, false - copy as is
   * @param {boolean} proxyTrap whether it's called from proxy trap
   * @returns {boolean|null} true on success, false on failure (proxyTrap + non-configurable), null when cancelled by interceptor
   */;
  _proto.extend_ = function extend_(key, descriptor, annotation, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    if (annotation === true) {
      annotation = this.defaultAnnotation_;
    }
    if (annotation === false) {
      return this.defineProperty_(key, descriptor, proxyTrap);
    }
    assertAnnotable(this, annotation, key);
    var outcome = annotation.extend_(this, key, descriptor, proxyTrap);
    if (outcome) {
      recordAnnotationApplied(this, annotation, key);
    }
    return outcome;
  }
  /**
   * @param {PropertyKey} key
   * @param {PropertyDescriptor} descriptor
   * @param {boolean} proxyTrap whether it's called from proxy trap
   * @returns {boolean|null} true on success, false on failure (proxyTrap + non-configurable), null when cancelled by interceptor
   */;
  _proto.defineProperty_ = function defineProperty_(key, descriptor, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    try {
      startBatch();
      // Delete
      var deleteOutcome = this.delete_(key);
      if (!deleteOutcome) {
        // Failure or intercepted
        return deleteOutcome;
      }
      // ADD interceptor
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: ADD,
          newValue: descriptor.value
        });
        if (!change) {
          return null;
        }
        var newValue = change.newValue;
        if (descriptor.value !== newValue) {
          descriptor = _extends({}, descriptor, {
            value: newValue
          });
        }
      }
      // Define
      if (proxyTrap) {
        if (!Reflect.defineProperty(this.target_, key, descriptor)) {
          return false;
        }
      } else {
        defineProperty(this.target_, key, descriptor);
      }
      // Notify
      this.notifyPropertyAddition_(key, descriptor.value);
    } finally {
      endBatch();
    }
    return true;
  }
  // If original descriptor becomes relevant, move this to annotation directly
;
  _proto.defineObservableProperty_ = function defineObservableProperty_(key, value, enhancer, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    try {
      startBatch();
      // Delete
      var deleteOutcome = this.delete_(key);
      if (!deleteOutcome) {
        // Failure or intercepted
        return deleteOutcome;
      }
      // ADD interceptor
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: ADD,
          newValue: value
        });
        if (!change) {
          return null;
        }
        value = change.newValue;
      }
      var cachedDescriptor = getCachedObservablePropDescriptor(key);
      var descriptor = {
        configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
        enumerable: true,
        get: cachedDescriptor.get,
        set: cachedDescriptor.set
      };
      // Define
      if (proxyTrap) {
        if (!Reflect.defineProperty(this.target_, key, descriptor)) {
          return false;
        }
      } else {
        defineProperty(this.target_, key, descriptor);
      }
      var observable = new ObservableValue(value, enhancer, 'development' !== "production" ? this.name_ + "." + key.toString() : "ObservableObject.key", false);
      this.values_.set(key, observable);
      // Notify (value possibly changed by ObservableValue)
      this.notifyPropertyAddition_(key, observable.value_);
    } finally {
      endBatch();
    }
    return true;
  }
  // If original descriptor becomes relevant, move this to annotation directly
;
  _proto.defineComputedProperty_ = function defineComputedProperty_(key, options, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    try {
      startBatch();
      // Delete
      var deleteOutcome = this.delete_(key);
      if (!deleteOutcome) {
        // Failure or intercepted
        return deleteOutcome;
      }
      // ADD interceptor
      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: ADD,
          newValue: undefined
        });
        if (!change) {
          return null;
        }
      }
      options.name || (options.name = 'development' !== "production" ? this.name_ + "." + key.toString() : "ObservableObject.key");
      options.context = this.proxy_ || this.target_;
      var cachedDescriptor = getCachedObservablePropDescriptor(key);
      var descriptor = {
        configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
        enumerable: false,
        get: cachedDescriptor.get,
        set: cachedDescriptor.set
      };
      // Define
      if (proxyTrap) {
        if (!Reflect.defineProperty(this.target_, key, descriptor)) {
          return false;
        }
      } else {
        defineProperty(this.target_, key, descriptor);
      }
      this.values_.set(key, new ComputedValue(options));
      // Notify
      this.notifyPropertyAddition_(key, undefined);
    } finally {
      endBatch();
    }
    return true;
  }
  /**
   * @param {PropertyKey} key
   * @param {PropertyDescriptor} descriptor
   * @param {boolean} proxyTrap whether it's called from proxy trap
   * @returns {boolean|null} true on success, false on failure (proxyTrap + non-configurable), null when cancelled by interceptor
   */;
  _proto.delete_ = function delete_(key, proxyTrap) {
    if (proxyTrap === void 0) {
      proxyTrap = false;
    }
    checkIfStateModificationsAreAllowed(this.keysAtom_);
    // No such prop
    if (!hasProp(this.target_, key)) {
      return true;
    }
    // Intercept
    if (hasInterceptors(this)) {
      var change = interceptChange(this, {
        object: this.proxy_ || this.target_,
        name: key,
        type: REMOVE
      });
      // Cancelled
      if (!change) {
        return null;
      }
    }
    // Delete
    try {
      var _this$pendingKeys_, _this$pendingKeys_$ge;
      startBatch();
      var notify = hasListeners(this);
      var notifySpy = 'development' !== "production" && isSpyEnabled();
      var observable = this.values_.get(key);
      // Value needed for spies/listeners
      var value = undefined;
      // Optimization: don't pull the value unless we will need it
      if (!observable && (notify || notifySpy)) {
        var _getDescriptor;
        value = (_getDescriptor = getDescriptor(this.target_, key)) == null ? void 0 : _getDescriptor.value;
      }
      // delete prop (do first, may fail)
      if (proxyTrap) {
        if (!Reflect.deleteProperty(this.target_, key)) {
          return false;
        }
      } else {
        delete this.target_[key];
      }
      // Allow re-annotating this field
      if ('development' !== "production") {
        delete this.appliedAnnotations_[key];
      }
      // Clear observable
      if (observable) {
        this.values_["delete"](key);
        // for computed, value is undefined
        if (observable instanceof ObservableValue) {
          value = observable.value_;
        }
        // Notify: autorun(() => obj[key]), see #1796
        propagateChanged(observable);
      }
      // Notify "keys/entries/values" observers
      this.keysAtom_.reportChanged();
      // Notify "has" observers
      // "in" as it may still exist in proto
      (_this$pendingKeys_ = this.pendingKeys_) == null ? void 0 : (_this$pendingKeys_$ge = _this$pendingKeys_.get(key)) == null ? void 0 : _this$pendingKeys_$ge.set(key in this.target_);
      // Notify spies/listeners
      if (notify || notifySpy) {
        var _change2 = {
          type: REMOVE,
          observableKind: "object",
          object: this.proxy_ || this.target_,
          debugObjectName: this.name_,
          oldValue: value,
          name: key
        };
        if ('development' !== "production" && notifySpy) {
          spyReportStart(_change2);
        }
        if (notify) {
          notifyListeners(this, _change2);
        }
        if ('development' !== "production" && notifySpy) {
          spyReportEnd();
        }
      }
    } finally {
      endBatch();
    }
    return true;
  }
  /**
   * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
   * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
   * for callback details
   */;
  _proto.observe_ = function observe_(callback, fireImmediately) {
    if (fireImmediately === true) {
      die("`observe` doesn't support the fire immediately property for observable objects.");
    }
    return registerListener(this, callback);
  };
  _proto.intercept_ = function intercept_(handler) {
    return registerInterceptor(this, handler);
  };
  _proto.notifyPropertyAddition_ = function notifyPropertyAddition_(key, value) {
    var _this$pendingKeys_2, _this$pendingKeys_2$g;
    var notify = hasListeners(this);
    var notifySpy = isSpyEnabled();
    if (notify || notifySpy) {
      var change = notify || notifySpy ? {
        type: ADD,
        observableKind: "object",
        debugObjectName: this.name_,
        object: this.proxy_ || this.target_,
        name: key,
        newValue: value
      } : null;
      if (notifySpy) {
        spyReportStart(change);
      }
      if (notify) {
        notifyListeners(this, change);
      }
      if (notifySpy) {
        spyReportEnd();
      }
    }
    (_this$pendingKeys_2 = this.pendingKeys_) == null ? void 0 : (_this$pendingKeys_2$g = _this$pendingKeys_2.get(key)) == null ? void 0 : _this$pendingKeys_2$g.set(true);
    // Notify "keys/entries/values" observers
    this.keysAtom_.reportChanged();
  };
  _proto.ownKeys_ = function ownKeys_() {
    this.keysAtom_.reportObserved();
    return ownKeys(this.target_);
  };
  _proto.keys_ = function keys_() {
    // Returns enumerable && own, but unfortunately keysAtom will report on ANY key change.
    // There is no way to distinguish between Object.keys(object) and Reflect.ownKeys(object) - both are handled by ownKeys trap.
    // We can either over-report in Object.keys(object) or under-report in Reflect.ownKeys(object)
    // We choose to over-report in Object.keys(object), because:
    // - typically it's used with simple data objects
    // - when symbolic/non-enumerable keys are relevant Reflect.ownKeys works as expected
    this.keysAtom_.reportObserved();
    return Object.keys(this.target_);
  };
  return ObservableObjectAdministration;
}();
function asObservableObject(target, options) {
  var _options$name;
  if (options && isObservableObject(target)) {
    die("Options can't be provided for already observable objects.");
  }
  if (hasProp(target, $mobx)) {
    if (!(getAdministration(target) instanceof ObservableObjectAdministration)) {
      die("Cannot convert '" + getDebugName(target) + "' into observable object:" + "\nThe target is already observable of different type." + "\nExtending builtins is not supported.");
    }
    return target;
  }
  if (!Object.isExtensible(target)) {
    die("Cannot make the designated object observable; it is not extensible");
  }
  var name = (_options$name = options == null ? void 0 : options.name) != null ? _options$name : (isPlainObject(target) ? "ObservableObject" : target.constructor.name) + "@" + getNextId() ;
  var adm = new ObservableObjectAdministration(target, new Map(), String(name), getAnnotationFromOptions(options));
  addHiddenProp(target, $mobx, adm);
  return target;
}
var isObservableObjectAdministration = /*#__PURE__*/createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);
function getCachedObservablePropDescriptor(key) {
  return descriptorCache[key] || (descriptorCache[key] = {
    get: function get() {
      return this[$mobx].getObservablePropValue_(key);
    },
    set: function set(value) {
      return this[$mobx].setObservablePropValue_(key, value);
    }
  });
}
function isObservableObject(thing) {
  if (isObject(thing)) {
    return isObservableObjectAdministration(thing[$mobx]);
  }
  return false;
}
function recordAnnotationApplied(adm, annotation, key) {
  var _adm$target_$storedAn;
  {
    adm.appliedAnnotations_[key] = annotation;
  }
  // Remove applied decorator annotation so we don't try to apply it again in subclass constructor
  (_adm$target_$storedAn = adm.target_[storedAnnotationsSymbol]) == null ? true : delete _adm$target_$storedAn[key];
}
function assertAnnotable(adm, annotation, key) {
  // Valid annotation
  if (!isAnnotation(annotation)) {
    die("Cannot annotate '" + adm.name_ + "." + key.toString() + "': Invalid annotation.");
  }
  /*
  // Configurable, not sealed, not frozen
  // Possibly not needed, just a little better error then the one thrown by engine.
  // Cases where this would be useful the most (subclass field initializer) are not interceptable by this.
  if (__DEV__) {
      const configurable = getDescriptor(adm.target_, key)?.configurable
      const frozen = Object.isFrozen(adm.target_)
      const sealed = Object.isSealed(adm.target_)
      if (!configurable || frozen || sealed) {
          const fieldName = `${adm.name_}.${key.toString()}`
          const requestedAnnotationType = annotation.annotationType_
          let error = `Cannot apply '${requestedAnnotationType}' to '${fieldName}':`
          if (frozen) {
              error += `\nObject is frozen.`
          }
          if (sealed) {
              error += `\nObject is sealed.`
          }
          if (!configurable) {
              error += `\nproperty is not configurable.`
              // Mention only if caused by us to avoid confusion
              if (hasProp(adm.appliedAnnotations!, key)) {
                  error += `\nTo prevent accidental re-definition of a field by a subclass, `
                  error += `all annotated fields of non-plain objects (classes) are not configurable.`
              }
          }
          die(error)
      }
  }
  */
  // Not annotated
  if (!isOverride(annotation) && hasProp(adm.appliedAnnotations_, key)) {
    var fieldName = adm.name_ + "." + key.toString();
    var currentAnnotationType = adm.appliedAnnotations_[key].annotationType_;
    var requestedAnnotationType = annotation.annotationType_;
    die("Cannot apply '" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already annotated with '" + currentAnnotationType + "'.") + "\nRe-annotating fields is not allowed." + "\nUse 'override' annotation for methods overridden by subclass.");
  }
}

// Bug in safari 9.* (or iOS 9 safari mobile). See #364
var ENTRY_0 = /*#__PURE__*/createArrayEntryDescriptor(0);
var safariPrototypeSetterInheritanceBug = /*#__PURE__*/function () {
  var v = false;
  var p = {};
  Object.defineProperty(p, "0", {
    set: function set() {
      v = true;
    }
  });
  /*#__PURE__*/
  Object.create(p)["0"] = 1;
  return v === false;
}();
/**
 * This array buffer contains two lists of properties, so that all arrays
 * can recycle their property definitions, which significantly improves performance of creating
 * properties on the fly.
 */
var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;
// Typescript workaround to make sure ObservableArray extends Array
var StubArray = function StubArray() {};
function inherit(ctor, proto) {
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ctor.prototype, proto);
  } else if (ctor.prototype.__proto__ !== undefined) {
    ctor.prototype.__proto__ = proto;
  } else {
    ctor.prototype = proto;
  }
}
inherit(StubArray, Array.prototype);
// Weex proto freeze protection was here,
// but it is unclear why the hack is need as MobX never changed the prototype
// anyway, so removed it in V6
var LegacyObservableArray = /*#__PURE__*/function (_StubArray, _Symbol$toStringTag, _Symbol$iterator) {
  _inheritsLoose(LegacyObservableArray, _StubArray);
  function LegacyObservableArray(initialValues, enhancer, name, owned) {
    var _this;
    if (name === void 0) {
      name = "ObservableArray@" + getNextId() ;
    }
    if (owned === void 0) {
      owned = false;
    }
    _this = _StubArray.call(this) || this;
    initObservable(function () {
      var adm = new ObservableArrayAdministration(name, enhancer, owned, true);
      adm.proxy_ = _assertThisInitialized(_this);
      addHiddenFinalProp(_assertThisInitialized(_this), $mobx, adm);
      if (initialValues && initialValues.length) {
        // @ts-ignore
        _this.spliceWithArray(0, 0, initialValues);
      }
      if (safariPrototypeSetterInheritanceBug) {
        // Seems that Safari won't use numeric prototype setter until any * numeric property is
        // defined on the instance. After that it works fine, even if this property is deleted.
        Object.defineProperty(_assertThisInitialized(_this), "0", ENTRY_0);
      }
    });
    return _this;
  }
  var _proto = LegacyObservableArray.prototype;
  _proto.concat = function concat() {
    this[$mobx].atom_.reportObserved();
    for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
      arrays[_key] = arguments[_key];
    }
    return Array.prototype.concat.apply(this.slice(),
    //@ts-ignore
    arrays.map(function (a) {
      return isObservableArray(a) ? a.slice() : a;
    }));
  };
  _proto[_Symbol$iterator] = function () {
    var self = this;
    var nextIndex = 0;
    return makeIterable({
      next: function next() {
        return nextIndex < self.length ? {
          value: self[nextIndex++],
          done: false
        } : {
          done: true,
          value: undefined
        };
      }
    });
  };
  _createClass(LegacyObservableArray, [{
    key: "length",
    get: function get() {
      return this[$mobx].getArrayLength_();
    },
    set: function set(newLength) {
      this[$mobx].setArrayLength_(newLength);
    }
  }, {
    key: _Symbol$toStringTag,
    get: function get() {
      return "Array";
    }
  }]);
  return LegacyObservableArray;
}(StubArray, Symbol.toStringTag, Symbol.iterator);
Object.entries(arrayExtensions).forEach(function (_ref) {
  var prop = _ref[0],
    fn = _ref[1];
  if (prop !== "concat") {
    addHiddenProp(LegacyObservableArray.prototype, prop, fn);
  }
});
function createArrayEntryDescriptor(index) {
  return {
    enumerable: false,
    configurable: true,
    get: function get() {
      return this[$mobx].get_(index);
    },
    set: function set(value) {
      this[$mobx].set_(index, value);
    }
  };
}
function createArrayBufferItem(index) {
  defineProperty(LegacyObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
}
function reserveArrayBuffer(max) {
  if (max > OBSERVABLE_ARRAY_BUFFER_SIZE) {
    for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max + 100; index++) {
      createArrayBufferItem(index);
    }
    OBSERVABLE_ARRAY_BUFFER_SIZE = max;
  }
}
reserveArrayBuffer(1000);
function createLegacyArray(initialValues, enhancer, name) {
  return new LegacyObservableArray(initialValues, enhancer, name);
}
function getAtom(thing, property) {
  if (typeof thing === "object" && thing !== null) {
    if (isObservableArray(thing)) {
      if (property !== undefined) {
        die(23);
      }
      return thing[$mobx].atom_;
    }
    if (isObservableSet(thing)) {
      return thing.atom_;
    }
    if (isObservableMap(thing)) {
      if (property === undefined) {
        return thing.keysAtom_;
      }
      var observable = thing.data_.get(property) || thing.hasMap_.get(property);
      if (!observable) {
        die(25, property, getDebugName(thing));
      }
      return observable;
    }
    if (isObservableObject(thing)) {
      if (!property) {
        return die(26);
      }
      var _observable = thing[$mobx].values_.get(property);
      if (!_observable) {
        die(27, property, getDebugName(thing));
      }
      return _observable;
    }
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
      return thing;
    }
  } else if (isFunction(thing)) {
    if (isReaction(thing[$mobx])) {
      // disposer function
      return thing[$mobx];
    }
  }
  die(28);
}
function getAdministration(thing, property) {
  if (!thing) {
    die(29);
  }
  if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
    return thing;
  }
  if (isObservableMap(thing) || isObservableSet(thing)) {
    return thing;
  }
  if (thing[$mobx]) {
    return thing[$mobx];
  }
  die(24, thing);
}
function getDebugName(thing, property) {
  var named;
  if (property !== undefined) {
    named = getAtom(thing, property);
  } else if (isAction(thing)) {
    return thing.name;
  } else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing)) {
    named = getAdministration(thing);
  } else {
    // valid for arrays as well
    named = getAtom(thing);
  }
  return named.name_;
}
/**
 * Helper function for initializing observable structures, it applies:
 * 1. allowStateChanges so we don't violate enforceActions.
 * 2. untracked so we don't accidentaly subscribe to anything observable accessed during init in case the observable is created inside derivation.
 * 3. batch to avoid state version updates
 */
function initObservable(cb) {
  var derivation = untrackedStart();
  var allowStateChanges = allowStateChangesStart(true);
  startBatch();
  try {
    return cb();
  } finally {
    endBatch();
    allowStateChangesEnd(allowStateChanges);
    untrackedEnd(derivation);
  }
}
var toString = objectPrototype.toString;
function deepEqual(a, b, depth) {
  if (depth === void 0) {
    depth = -1;
  }
  return eq(a, b, depth);
}
// Copied from https://github.com/jashkenas/underscore/blob/5c237a7c682fb68fd5378203f0bf22dce1624854/underscore.js#L1186-L1289
// Internal recursive comparison function for `isEqual`.
function eq(a, b, depth, aStack, bStack) {
  // Identical objects are equal. `0 === -0`, but they aren't identical.
  // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
  if (a === b) {
    return a !== 0 || 1 / a === 1 / b;
  }
  // `null` or `undefined` only equal to itself (strict comparison).
  if (a == null || b == null) {
    return false;
  }
  // `NaN`s are equivalent, but non-reflexive.
  if (a !== a) {
    return b !== b;
  }
  // Exhaust primitive checks
  var type = typeof a;
  if (type !== "function" && type !== "object" && typeof b != "object") {
    return false;
  }
  // Compare `[[Class]]` names.
  var className = toString.call(a);
  if (className !== toString.call(b)) {
    return false;
  }
  switch (className) {
    // Strings, numbers, regular expressions, dates, and booleans are compared by value.
    case "[object RegExp]":
    // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
    case "[object String]":
      // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
      // equivalent to `new String("5")`.
      return "" + a === "" + b;
    case "[object Number]":
      // `NaN`s are equivalent, but non-reflexive.
      // Object(NaN) is equivalent to NaN.
      if (+a !== +a) {
        return +b !== +b;
      }
      // An `egal` comparison is performed for other numeric values.
      return +a === 0 ? 1 / +a === 1 / b : +a === +b;
    case "[object Date]":
    case "[object Boolean]":
      // Coerce dates and booleans to numeric primitive values. Dates are compared by their
      // millisecond representations. Note that invalid dates with millisecond representations
      // of `NaN` are not equivalent.
      return +a === +b;
    case "[object Symbol]":
      return typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b);
    case "[object Map]":
    case "[object Set]":
      // Maps and Sets are unwrapped to arrays of entry-pairs, adding an incidental level.
      // Hide this extra level by increasing the depth.
      if (depth >= 0) {
        depth++;
      }
      break;
  }
  // Unwrap any wrapped objects.
  a = unwrap(a);
  b = unwrap(b);
  var areArrays = className === "[object Array]";
  if (!areArrays) {
    if (typeof a != "object" || typeof b != "object") {
      return false;
    }
    // Objects with different constructors are not equivalent, but `Object`s or `Array`s
    // from different frames are.
    var aCtor = a.constructor,
      bCtor = b.constructor;
    if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) {
      return false;
    }
  }
  if (depth === 0) {
    return false;
  } else if (depth < 0) {
    depth = -1;
  }
  // Assume equality for cyclic structures. The algorithm for detecting cyclic
  // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
  // Initializing stack of traversed objects.
  // It's done here since we only need them for objects and arrays comparison.
  aStack = aStack || [];
  bStack = bStack || [];
  var length = aStack.length;
  while (length--) {
    // Linear search. Performance is inversely proportional to the number of
    // unique nested structures.
    if (aStack[length] === a) {
      return bStack[length] === b;
    }
  }
  // Add the first object to the stack of traversed objects.
  aStack.push(a);
  bStack.push(b);
  // Recursively compare objects and arrays.
  if (areArrays) {
    // Compare array lengths to determine if a deep comparison is necessary.
    length = a.length;
    if (length !== b.length) {
      return false;
    }
    // Deep compare the contents, ignoring non-numeric properties.
    while (length--) {
      if (!eq(a[length], b[length], depth - 1, aStack, bStack)) {
        return false;
      }
    }
  } else {
    // Deep compare objects.
    var keys = Object.keys(a);
    var key;
    length = keys.length;
    // Ensure that both objects contain the same number of properties before comparing deep equality.
    if (Object.keys(b).length !== length) {
      return false;
    }
    while (length--) {
      // Deep compare each member
      key = keys[length];
      if (!(hasProp(b, key) && eq(a[key], b[key], depth - 1, aStack, bStack))) {
        return false;
      }
    }
  }
  // Remove the first object from the stack of traversed objects.
  aStack.pop();
  bStack.pop();
  return true;
}
function unwrap(a) {
  if (isObservableArray(a)) {
    return a.slice();
  }
  if (isES6Map(a) || isObservableMap(a)) {
    return Array.from(a.entries());
  }
  if (isES6Set(a) || isObservableSet(a)) {
    return Array.from(a.entries());
  }
  return a;
}
function makeIterable(iterator) {
  iterator[Symbol.iterator] = getSelf;
  return iterator;
}
function getSelf() {
  return this;
}
function isAnnotation(thing) {
  return (
    // Can be function
    thing instanceof Object && typeof thing.annotationType_ === "string" && isFunction(thing.make_) && isFunction(thing.extend_)
  );
}

/**
 * (c) Michel Weststrate 2015 - 2020
 * MIT Licensed
 *
 * Welcome to the mobx sources! To get a global overview of how MobX internally works,
 * this is a good place to start:
 * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
 *
 * Source folders:
 * ===============
 *
 * - api/     Most of the public static methods exposed by the module can be found here.
 * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
 * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
 * - utils/   Utility stuff.
 *
 */
["Symbol", "Map", "Set"].forEach(function (m) {
  var g = getGlobal();
  if (typeof g[m] === "undefined") {
    die("MobX requires global '" + m + "' to be available or polyfilled");
  }
});
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
  // See: https://github.com/andykog/mobx-devtools/
  __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
    spy: spy,
    extras: {
      getDebugName: getDebugName
    },
    $mobx: $mobx
  });
}

function error(error) {
  return {
    hasError: true,
    error
  };
}
function value(value) {
  return {
    hasError: false,
    value
  };
}

const CONTEXT_OBJECT_PATH = "com.mendix.widgets.web.selectable.selectionContext";
function getGlobalSelectionContext() {
  return window[CONTEXT_OBJECT_PATH] ??= createContext(undefined);
}
function useSelectionContextValue() {
  const context = getGlobalSelectionContext();
  const contextValue = useContext(context);
  if (contextValue === undefined) {
    return error(new OutOfContextError());
  }
  return value(contextValue);
}
class OutOfContextError extends Error {
  constructor() {
    super("Component is used out of context provider");
  }
}

if (!useState) {
  throw new Error("mobx-react-lite requires React with Hooks support");
}
if (!makeObservable) {
  throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");
}

function defaultNoopBatch(callback) {
  callback();
}
function observerBatching(reactionScheduler) {
  if (!reactionScheduler) {
    reactionScheduler = defaultNoopBatch;
    {
      console.warn("[MobX] Failed to get unstable_batched updates from react-dom / react-native");
    }
  }
  configure({
    reactionScheduler: reactionScheduler
  });
}

function printDebugValue(v) {
  return getDependencyTree(v);
}

var REGISTRY_FINALIZE_AFTER = 10000;
var REGISTRY_SWEEP_INTERVAL = 10000;
var TimerBasedFinalizationRegistry = /** @class */function () {
  function TimerBasedFinalizationRegistry(finalize) {
    var _this = this;
    Object.defineProperty(this, "finalize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: finalize
    });
    Object.defineProperty(this, "registrations", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: new Map()
    });
    Object.defineProperty(this, "sweepTimeout", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    // Bound so it can be used directly as setTimeout callback.
    Object.defineProperty(this, "sweep", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function (maxAge) {
        if (maxAge === void 0) {
          maxAge = REGISTRY_FINALIZE_AFTER;
        }
        // cancel timeout so we can force sweep anytime
        clearTimeout(_this.sweepTimeout);
        _this.sweepTimeout = undefined;
        var now = Date.now();
        _this.registrations.forEach(function (registration, token) {
          if (now - registration.registeredAt >= maxAge) {
            _this.finalize(registration.value);
            _this.registrations.delete(token);
          }
        });
        if (_this.registrations.size > 0) {
          _this.scheduleSweep();
        }
      }
    });
    // Bound so it can be exported directly as clearTimers test utility.
    Object.defineProperty(this, "finalizeAllImmediately", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function () {
        _this.sweep(0);
      }
    });
  }
  // Token is actually required with this impl
  Object.defineProperty(TimerBasedFinalizationRegistry.prototype, "register", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function (target, value, token) {
      this.registrations.set(token, {
        value: value,
        registeredAt: Date.now()
      });
      this.scheduleSweep();
    }
  });
  Object.defineProperty(TimerBasedFinalizationRegistry.prototype, "unregister", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function (token) {
      this.registrations.delete(token);
    }
  });
  Object.defineProperty(TimerBasedFinalizationRegistry.prototype, "scheduleSweep", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function () {
      if (this.sweepTimeout === undefined) {
        this.sweepTimeout = setTimeout(this.sweep, REGISTRY_SWEEP_INTERVAL);
      }
    }
  });
  return TimerBasedFinalizationRegistry;
}();
var UniversalFinalizationRegistry = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : TimerBasedFinalizationRegistry;

var observerFinalizationRegistry = new UniversalFinalizationRegistry(function (adm) {
  var _a;
  (_a = adm.reaction) === null || _a === void 0 ? void 0 : _a.dispose();
  adm.reaction = null;
});

function createReaction(adm) {
  adm.reaction = new Reaction("observer".concat(adm.name), function () {
    var _a;
    adm.stateVersion = Symbol();
    // onStoreChange won't be available until the component "mounts".
    // If state changes in between initial render and mount,
    // `useSyncExternalStore` should handle that by checking the state version and issuing update.
    (_a = adm.onStoreChange) === null || _a === void 0 ? void 0 : _a.call(adm);
  });
}
function useObserver(render, baseComponentName) {
  if (baseComponentName === void 0) {
    baseComponentName = "observed";
  }
  var admRef = React.useRef(null);
  if (!admRef.current) {
    // First render
    var adm_1 = {
      reaction: null,
      onStoreChange: null,
      stateVersion: Symbol(),
      name: baseComponentName,
      subscribe: function (onStoreChange) {
        // Do NOT access admRef here!
        observerFinalizationRegistry.unregister(adm_1);
        adm_1.onStoreChange = onStoreChange;
        if (!adm_1.reaction) {
          // We've lost our reaction and therefore all subscriptions, occurs when:
          // 1. Timer based finalization registry disposed reaction before component mounted.
          // 2. React "re-mounts" same component without calling render in between (typically <StrictMode>).
          // We have to recreate reaction and schedule re-render to recreate subscriptions,
          // even if state did not change.
          createReaction(adm_1);
          // `onStoreChange` won't force update if subsequent `getSnapshot` returns same value.
          // So we make sure that is not the case
          adm_1.stateVersion = Symbol();
        }
        return function () {
          var _a;
          // Do NOT access admRef here!
          adm_1.onStoreChange = null;
          (_a = adm_1.reaction) === null || _a === void 0 ? void 0 : _a.dispose();
          adm_1.reaction = null;
        };
      },
      getSnapshot: function () {
        // Do NOT access admRef here!
        return adm_1.stateVersion;
      }
    };
    admRef.current = adm_1;
  }
  var adm = admRef.current;
  if (!adm.reaction) {
    // First render or reaction was disposed by registry before subscribe
    createReaction(adm);
    // StrictMode/ConcurrentMode/Suspense may mean that our component is
    // rendered and abandoned multiple times, so we need to track leaked
    // Reactions.
    observerFinalizationRegistry.register(admRef, adm, adm);
  }
  React.useDebugValue(adm.reaction, printDebugValue);
  React.useSyncExternalStore(
  // Both of these must be stable, otherwise it would keep resubscribing every render.
  adm.subscribe, adm.getSnapshot, adm.getSnapshot);
  // render the original component, but have the
  // reaction track the observables, so that rendering
  // can be invalidated (see above) once a dependency changes
  var renderResult;
  var exception;
  adm.reaction.track(function () {
    try {
      renderResult = render();
    } catch (e) {
      exception = e;
    }
  });
  if (exception) {
    throw exception; // re-throw any exceptions caught during rendering
  }
  return renderResult;
}

var _a$1, _b;
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var isFunctionNameConfigurable = (_b = (_a$1 = Object.getOwnPropertyDescriptor(function () {}, "name")) === null || _a$1 === void 0 ? void 0 : _a$1.configurable) !== null && _b !== void 0 ? _b : false;
// Using react-is had some issues (and operates on elements, not on types), see #608 / #609
var ReactForwardRefSymbol = hasSymbol ? Symbol.for("react.forward_ref") : typeof forwardRef === "function" && forwardRef(function (props) {
  return null;
})["$$typeof"];
var ReactMemoSymbol = hasSymbol ? Symbol.for("react.memo") : typeof memo === "function" && memo(function (props) {
  return null;
})["$$typeof"];
// n.b. base case is not used for actual typings or exported in the typing files
function observer(baseComponent,
// TODO remove in next major
options) {
  var _a;
  if (ReactMemoSymbol && baseComponent["$$typeof"] === ReactMemoSymbol) {
    throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");
  }
  var useForwardRef = (_a = void 0 ) !== null && _a !== void 0 ? _a : false;
  var render = baseComponent;
  var baseComponentName = baseComponent.displayName || baseComponent.name;
  // If already wrapped with forwardRef, unwrap,
  // so we can patch render and apply memo
  if (ReactForwardRefSymbol && baseComponent["$$typeof"] === ReactForwardRefSymbol) {
    useForwardRef = true;
    render = baseComponent["render"];
    if (typeof render !== "function") {
      throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");
    }
  }
  var observerComponent = function (props, ref) {
    return useObserver(function () {
      return render(props, ref);
    }, baseComponentName);
  };
  observerComponent.displayName = baseComponent.displayName;
  if (isFunctionNameConfigurable) {
    Object.defineProperty(observerComponent, "name", {
      value: baseComponent.name,
      writable: true,
      configurable: true
    });
  }
  // Support legacy context: `contextTypes` must be applied before `memo`
  if (baseComponent.contextTypes) {
    observerComponent.contextTypes = baseComponent.contextTypes;
  }
  if (useForwardRef) {
    // `forwardRef` must be applied prior `memo`
    // `forwardRef(observer(cmp))` throws:
    // "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))"
    observerComponent = forwardRef(observerComponent);
  }
  // memo; we are not interested in deep updates
  // in props; we assume that if deep objects are changed,
  // this is in observables, which would have been tracked anyway
  observerComponent = memo(observerComponent);
  copyStaticProperties(baseComponent, observerComponent);
  {
    Object.defineProperty(observerComponent, "contextTypes", {
      set: function () {
        var _a, _b;
        throw new Error("[mobx-react-lite] `".concat(this.displayName || ((_a = this.type) === null || _a === void 0 ? void 0 : _a.displayName) || ((_b = this.type) === null || _b === void 0 ? void 0 : _b.name) || "Component", ".contextTypes` must be set before applying `observer`."));
      }
    });
  }
  return observerComponent;
}
// based on https://github.com/mridgway/hoist-non-react-statics/blob/master/src/index.js
var hoistBlackList = {
  $$typeof: true,
  render: true,
  compare: true,
  type: true,
  // Don't redefine `displayName`,
  // it's defined as getter-setter pair on `memo` (see #3192).
  displayName: true
};
function copyStaticProperties(base, target) {
  Object.keys(base).forEach(function (key) {
    if (!hoistBlackList[key]) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
    }
  });
}

var _a;
observerBatching(unstable_batchedUpdates);
(_a = observerFinalizationRegistry["finalizeAllImmediately"]) !== null && _a !== void 0 ? _a : function () {};

function ThreeStateCheckBox({
  value,
  className,
  ...props
}) {
  const checkboxRef = useRef(null);
  useEffect(() => {
    if (!checkboxRef.current) {
      return;
    }
    if (value === "all" || value === "none") {
      checkboxRef.current.indeterminate = false;
    } else if (value === "some") {
      checkboxRef.current.indeterminate = true;
    }
  }, [value]);
  return jsx("input", {
    ...props,
    type: "checkbox",
    className: classNames("three-state-checkbox", className),
    ref: checkboxRef,
    checked: value !== "none"
  });
}

function SelectionHelperComponent(props) {
    // TODO: replace with useId
    const id = useMemo(() => {
        // eslint-disable-next-line react-hooks/purity
        return Date.now().toString();
    }, []);
    return (jsx("div", { className: `widget-selection-helper ${props.className}`, style: props.cssStyles, children: props.type === "custom" ? (jsx("div", { className: "selection-helper-custom", onClick: props.onClick, onKeyDown: e => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    props.onClick?.();
                }
            }, children: props.children })) : (jsxs("div", { className: "selection-helper-checkbox mx-checkbox form-group label-after", children: [jsx(ThreeStateCheckBox, { id: id, value: props.status, onChange: props.onClick }), jsx("label", { htmlFor: id, className: "control-label", children: props.children })] })) }));
}

const SelectionHelper = observer(function SelectionHelper(props) {
    const contextValue = useSelectionContextValue();
    if (contextValue.hasError) {
        return (jsx(Alert, { bootstrapStyle: "danger", children: "The Selection Helper widget should be placed within the header section of the Data Grid 2 or the Gallery widget with multi-selection enabled." }));
    }
    const selection = contextValue.value;
    return (jsxs(SelectionHelperComponent, { type: props.renderStyle, status: selection.selectionStatus, onClick: () => selection.togglePageSelection(), className: props.class, cssStyles: props.style, children: [selection.selectionStatus === "all" && props.customAllSelected, selection.selectionStatus === "some" && props.customSomeSelected, selection.selectionStatus === "none" && props.customNoneSelected, props.checkboxCaption?.value ?? ""] }));
});

export { SelectionHelper };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0aW9uSGVscGVyLm1qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2NsYXNzbmFtZXNAMi41LjEvbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zaGFyZWQvd2lkZ2V0LXBsdWdpbi1jb21wb25lbnQta2l0L2Rpc3QvQWxlcnQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieEA2LjEyLjNfcGF0Y2hfaGFzaD0zOWM1NTI3OWU4Zjc1YzlhMzIyZWJhNjRkZDIyZTFhMzk4ZjYyMWM2NGJiZmMzNjMyZTU1YTk3ZjQ2ZWRmZWI5L25vZGVfbW9kdWxlcy9tb2J4L2Rpc3QvbW9ieC5lc20uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zaGFyZWQvd2lkZ2V0LXBsdWdpbi1ncmlkL2Rpc3Qvc2VsZWN0aW9uL3Jlc3VsdC1tZXRhLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tZ3JpZC9kaXN0L3NlbGVjdGlvbi9jb250ZXh0LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21vYngtcmVhY3QtbGl0ZUA0LjAuN19wYXRjaF9oYXNoPTQ3ZmQyZDFiNWMzNTU1NGRkZDRmYTMyZmNhYTkyOGExNmZkYTlmODJkY2EwZmY2OGJjZGMxZl85OWFmN2U4MDRkMjMxZWNjOWEyMjY0NTJlODQyZDcwNi9ub2RlX21vZHVsZXMvbW9ieC1yZWFjdC1saXRlL2VzL3V0aWxzL2Fzc2VydEVudmlyb25tZW50LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21vYngtcmVhY3QtbGl0ZUA0LjAuN19wYXRjaF9oYXNoPTQ3ZmQyZDFiNWMzNTU1NGRkZDRmYTMyZmNhYTkyOGExNmZkYTlmODJkY2EwZmY2OGJjZGMxZl85OWFmN2U4MDRkMjMxZWNjOWEyMjY0NTJlODQyZDcwNi9ub2RlX21vZHVsZXMvbW9ieC1yZWFjdC1saXRlL2VzL3V0aWxzL29ic2VydmVyQmF0Y2hpbmcuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9NDdmZDJkMWI1YzM1NTU0ZGRkNGZhMzJmY2FhOTI4YTE2ZmRhOWY4MmRjYTBmZjY4YmNkYzFmXzk5YWY3ZTgwNGQyMzFlY2M5YTIyNjQ1MmU4NDJkNzA2L25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvcHJpbnREZWJ1Z1ZhbHVlLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21vYngtcmVhY3QtbGl0ZUA0LjAuN19wYXRjaF9oYXNoPTQ3ZmQyZDFiNWMzNTU1NGRkZDRmYTMyZmNhYTkyOGExNmZkYTlmODJkY2EwZmY2OGJjZGMxZl85OWFmN2U4MDRkMjMxZWNjOWEyMjY0NTJlODQyZDcwNi9ub2RlX21vZHVsZXMvbW9ieC1yZWFjdC1saXRlL2VzL3V0aWxzL1VuaXZlcnNhbEZpbmFsaXphdGlvblJlZ2lzdHJ5LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21vYngtcmVhY3QtbGl0ZUA0LjAuN19wYXRjaF9oYXNoPTQ3ZmQyZDFiNWMzNTU1NGRkZDRmYTMyZmNhYTkyOGExNmZkYTlmODJkY2EwZmY2OGJjZGMxZl85OWFmN2U4MDRkMjMxZWNjOWEyMjY0NTJlODQyZDcwNi9ub2RlX21vZHVsZXMvbW9ieC1yZWFjdC1saXRlL2VzL3V0aWxzL29ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9NDdmZDJkMWI1YzM1NTU0ZGRkNGZhMzJmY2FhOTI4YTE2ZmRhOWY4MmRjYTBmZjY4YmNkYzFmXzk5YWY3ZTgwNGQyMzFlY2M5YTIyNjQ1MmU4NDJkNzA2L25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXNlT2JzZXJ2ZXIuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9NDdmZDJkMWI1YzM1NTU0ZGRkNGZhMzJmY2FhOTI4YTE2ZmRhOWY4MmRjYTBmZjY4YmNkYzFmXzk5YWY3ZTgwNGQyMzFlY2M5YTIyNjQ1MmU4NDJkNzA2L25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvb2JzZXJ2ZXIuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9NDdmZDJkMWI1YzM1NTU0ZGRkNGZhMzJmY2FhOTI4YTE2ZmRhOWY4MmRjYTBmZjY4YmNkYzFmXzk5YWY3ZTgwNGQyMzFlY2M5YTIyNjQ1MmU4NDJkNzA2L25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zaGFyZWQvd2lkZ2V0LXBsdWdpbi1jb21wb25lbnQta2l0L2Rpc3QvVGhyZWVTdGF0ZUNoZWNrQm94LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvU2VsZWN0aW9uSGVscGVyQ29tcG9uZW50LnRzeCIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9TZWxlY3Rpb25IZWxwZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuXHRDb3B5cmlnaHQgKGMpIDIwMTggSmVkIFdhdHNvbi5cblx0TGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcblx0aHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoYXJnKSB7XG5cdFx0XHRcdGNsYXNzZXMgPSBhcHBlbmRDbGFzcyhjbGFzc2VzLCBwYXJzZVZhbHVlKGFyZykpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzO1xuXHR9XG5cblx0ZnVuY3Rpb24gcGFyc2VWYWx1ZSAoYXJnKSB7XG5cdFx0aWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG5cdFx0XHRyZXR1cm4gYXJnO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgYXJnICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0cmV0dXJuICcnO1xuXHRcdH1cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0fVxuXG5cdFx0aWYgKGFyZy50b1N0cmluZyAhPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyAmJiAhYXJnLnRvU3RyaW5nLnRvU3RyaW5nKCkuaW5jbHVkZXMoJ1tuYXRpdmUgY29kZV0nKSkge1xuXHRcdFx0cmV0dXJuIGFyZy50b1N0cmluZygpO1xuXHRcdH1cblxuXHRcdHZhciBjbGFzc2VzID0gJyc7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdGNsYXNzZXMgPSBhcHBlbmRDbGFzcyhjbGFzc2VzLCBrZXkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzO1xuXHR9XG5cblx0ZnVuY3Rpb24gYXBwZW5kQ2xhc3MgKHZhbHVlLCBuZXdDbGFzcykge1xuXHRcdGlmICghbmV3Q2xhc3MpIHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdFxuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlICsgJyAnICsgbmV3Q2xhc3M7XG5cdFx0fVxuXHRcblx0XHRyZXR1cm4gdmFsdWUgKyBuZXdDbGFzcztcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsImltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyBDaGlsZHJlbiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbi8vIGNsb25pbmcgZnJvbSBodHRwczovL2dpdGxhYi5ybmQubWVuZGl4LmNvbS9hcHBkZXYvYXBwZGV2Ly0vYmxvYi9tYXN0ZXIvY2xpZW50L3NyYy93aWRnZXRzL3dlYi9oZWxwZXJzL0FsZXJ0LnRzeFxuZXhwb3J0IGNvbnN0IFZhbGlkYXRpb25BbGVydCA9ICh7IGNsYXNzTmFtZSwgY2hpbGRyZW4sIGlkIH0pID0+IChfanN4KEFsZXJ0LCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lcyhcIm14LXZhbGlkYXRpb24tbWVzc2FnZVwiLCBjbGFzc05hbWUpLCBib290c3RyYXBTdHlsZTogXCJkYW5nZXJcIiwgcm9sZTogXCJhbGVydFwiLCBpZDogaWQsIGNoaWxkcmVuOiBjaGlsZHJlbiB9KSk7XG5leHBvcnQgY29uc3QgQWxlcnQgPSAoeyBjbGFzc05hbWUsIGJvb3RzdHJhcFN0eWxlLCBjaGlsZHJlbiwgcm9sZSwgaWQgfSkgPT4gQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID4gMCA/IChfanN4KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGBhbGVydCBhbGVydC0ke2Jvb3RzdHJhcFN0eWxlfWAsIGNsYXNzTmFtZSksIHJvbGU6IHJvbGUsIGlkOiBpZCwgY2hpbGRyZW46IGNoaWxkcmVuIH0pKSA6IG51bGw7XG5BbGVydC5kaXNwbGF5TmFtZSA9IFwiQWxlcnRcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFsZXJ0LmpzLm1hcCIsInZhciBuaWNlRXJyb3JzID0ge1xuICAwOiBcIkludmFsaWQgdmFsdWUgZm9yIGNvbmZpZ3VyYXRpb24gJ2VuZm9yY2VBY3Rpb25zJywgZXhwZWN0ZWQgJ25ldmVyJywgJ2Fsd2F5cycgb3IgJ29ic2VydmVkJ1wiLFxuICAxOiBmdW5jdGlvbiBfKGFubm90YXRpb25UeXBlLCBrZXkpIHtcbiAgICByZXR1cm4gXCJDYW5ub3QgYXBwbHkgJ1wiICsgYW5ub3RhdGlvblR5cGUgKyBcIicgdG8gJ1wiICsga2V5LnRvU3RyaW5nKCkgKyBcIic6IEZpZWxkIG5vdCBmb3VuZC5cIjtcbiAgfSxcbiAgLypcbiAgMihwcm9wKSB7XG4gICAgICByZXR1cm4gYGludmFsaWQgZGVjb3JhdG9yIGZvciAnJHtwcm9wLnRvU3RyaW5nKCl9J2BcbiAgfSxcbiAgMyhwcm9wKSB7XG4gICAgICByZXR1cm4gYENhbm5vdCBkZWNvcmF0ZSAnJHtwcm9wLnRvU3RyaW5nKCl9JzogYWN0aW9uIGNhbiBvbmx5IGJlIHVzZWQgb24gcHJvcGVydGllcyB3aXRoIGEgZnVuY3Rpb24gdmFsdWUuYFxuICB9LFxuICA0KHByb3ApIHtcbiAgICAgIHJldHVybiBgQ2Fubm90IGRlY29yYXRlICcke3Byb3AudG9TdHJpbmcoKX0nOiBjb21wdXRlZCBjYW4gb25seSBiZSB1c2VkIG9uIGdldHRlciBwcm9wZXJ0aWVzLmBcbiAgfSxcbiAgKi9cbiAgNTogXCIna2V5cygpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzLCBzZXRzIGFuZCBtYXBzXCIsXG4gIDY6IFwiJ3ZhbHVlcygpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzLCBzZXRzIGFuZCBtYXBzXCIsXG4gIDc6IFwiJ2VudHJpZXMoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cyBhbmQgbWFwc1wiLFxuICA4OiBcIidzZXQoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cyBhbmQgbWFwc1wiLFxuICA5OiBcIidyZW1vdmUoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cyBhbmQgbWFwc1wiLFxuICAxMDogXCInaGFzKCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMgYW5kIG1hcHNcIixcbiAgMTE6IFwiJ2dldCgpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzIGFuZCBtYXBzXCIsXG4gIDEyOiBcIkludmFsaWQgYW5ub3RhdGlvblwiLFxuICAxMzogXCJEeW5hbWljIG9ic2VydmFibGUgb2JqZWN0cyBjYW5ub3QgYmUgZnJvemVuLiBJZiB5b3UncmUgcGFzc2luZyBvYnNlcnZhYmxlcyB0byAzcmQgcGFydHkgY29tcG9uZW50L2Z1bmN0aW9uIHRoYXQgY2FsbHMgT2JqZWN0LmZyZWV6ZSwgcGFzcyBjb3B5IGluc3RlYWQ6IHRvSlMob2JzZXJ2YWJsZSlcIixcbiAgMTQ6IFwiSW50ZXJjZXB0IGhhbmRsZXJzIHNob3VsZCByZXR1cm4gbm90aGluZyBvciBhIGNoYW5nZSBvYmplY3RcIixcbiAgMTU6IFwiT2JzZXJ2YWJsZSBhcnJheXMgY2Fubm90IGJlIGZyb3plbi4gSWYgeW91J3JlIHBhc3Npbmcgb2JzZXJ2YWJsZXMgdG8gM3JkIHBhcnR5IGNvbXBvbmVudC9mdW5jdGlvbiB0aGF0IGNhbGxzIE9iamVjdC5mcmVlemUsIHBhc3MgY29weSBpbnN0ZWFkOiB0b0pTKG9ic2VydmFibGUpXCIsXG4gIDE2OiBcIk1vZGlmaWNhdGlvbiBleGNlcHRpb246IHRoZSBpbnRlcm5hbCBzdHJ1Y3R1cmUgb2YgYW4gb2JzZXJ2YWJsZSBhcnJheSB3YXMgY2hhbmdlZC5cIixcbiAgMTc6IGZ1bmN0aW9uIF8oaW5kZXgsIGxlbmd0aCkge1xuICAgIHJldHVybiBcIlttb2J4LmFycmF5XSBJbmRleCBvdXQgb2YgYm91bmRzLCBcIiArIGluZGV4ICsgXCIgaXMgbGFyZ2VyIHRoYW4gXCIgKyBsZW5ndGg7XG4gIH0sXG4gIDE4OiBcIm1vYngubWFwIHJlcXVpcmVzIE1hcCBwb2x5ZmlsbCBmb3IgdGhlIGN1cnJlbnQgYnJvd3Nlci4gQ2hlY2sgYmFiZWwtcG9seWZpbGwgb3IgY29yZS1qcy9lczYvbWFwLmpzXCIsXG4gIDE5OiBmdW5jdGlvbiBfKG90aGVyKSB7XG4gICAgcmV0dXJuIFwiQ2Fubm90IGluaXRpYWxpemUgZnJvbSBjbGFzc2VzIHRoYXQgaW5oZXJpdCBmcm9tIE1hcDogXCIgKyBvdGhlci5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9LFxuICAyMDogZnVuY3Rpb24gXyhvdGhlcikge1xuICAgIHJldHVybiBcIkNhbm5vdCBpbml0aWFsaXplIG1hcCBmcm9tIFwiICsgb3RoZXI7XG4gIH0sXG4gIDIxOiBmdW5jdGlvbiBfKGRhdGFTdHJ1Y3R1cmUpIHtcbiAgICByZXR1cm4gXCJDYW5ub3QgY29udmVydCB0byBtYXAgZnJvbSAnXCIgKyBkYXRhU3RydWN0dXJlICsgXCInXCI7XG4gIH0sXG4gIDIyOiBcIm1vYnguc2V0IHJlcXVpcmVzIFNldCBwb2x5ZmlsbCBmb3IgdGhlIGN1cnJlbnQgYnJvd3Nlci4gQ2hlY2sgYmFiZWwtcG9seWZpbGwgb3IgY29yZS1qcy9lczYvc2V0LmpzXCIsXG4gIDIzOiBcIkl0IGlzIG5vdCBwb3NzaWJsZSB0byBnZXQgaW5kZXggYXRvbXMgZnJvbSBhcnJheXNcIixcbiAgMjQ6IGZ1bmN0aW9uIF8odGhpbmcpIHtcbiAgICByZXR1cm4gXCJDYW5ub3Qgb2J0YWluIGFkbWluaXN0cmF0aW9uIGZyb20gXCIgKyB0aGluZztcbiAgfSxcbiAgMjU6IGZ1bmN0aW9uIF8ocHJvcGVydHksIG5hbWUpIHtcbiAgICByZXR1cm4gXCJ0aGUgZW50cnkgJ1wiICsgcHJvcGVydHkgKyBcIicgZG9lcyBub3QgZXhpc3QgaW4gdGhlIG9ic2VydmFibGUgbWFwICdcIiArIG5hbWUgKyBcIidcIjtcbiAgfSxcbiAgMjY6IFwicGxlYXNlIHNwZWNpZnkgYSBwcm9wZXJ0eVwiLFxuICAyNzogZnVuY3Rpb24gXyhwcm9wZXJ0eSwgbmFtZSkge1xuICAgIHJldHVybiBcIm5vIG9ic2VydmFibGUgcHJvcGVydHkgJ1wiICsgcHJvcGVydHkudG9TdHJpbmcoKSArIFwiJyBmb3VuZCBvbiB0aGUgb2JzZXJ2YWJsZSBvYmplY3QgJ1wiICsgbmFtZSArIFwiJ1wiO1xuICB9LFxuICAyODogZnVuY3Rpb24gXyh0aGluZykge1xuICAgIHJldHVybiBcIkNhbm5vdCBvYnRhaW4gYXRvbSBmcm9tIFwiICsgdGhpbmc7XG4gIH0sXG4gIDI5OiBcIkV4cGVjdGluZyBzb21lIG9iamVjdFwiLFxuICAzMDogXCJpbnZhbGlkIGFjdGlvbiBzdGFjay4gZGlkIHlvdSBmb3JnZXQgdG8gZmluaXNoIGFuIGFjdGlvbj9cIixcbiAgMzE6IFwibWlzc2luZyBvcHRpb24gZm9yIGNvbXB1dGVkOiBnZXRcIixcbiAgMzI6IGZ1bmN0aW9uIF8obmFtZSwgZGVyaXZhdGlvbikge1xuICAgIHJldHVybiBcIkN5Y2xlIGRldGVjdGVkIGluIGNvbXB1dGF0aW9uIFwiICsgbmFtZSArIFwiOiBcIiArIGRlcml2YXRpb247XG4gIH0sXG4gIDMzOiBmdW5jdGlvbiBfKG5hbWUpIHtcbiAgICByZXR1cm4gXCJUaGUgc2V0dGVyIG9mIGNvbXB1dGVkIHZhbHVlICdcIiArIG5hbWUgKyBcIicgaXMgdHJ5aW5nIHRvIHVwZGF0ZSBpdHNlbGYuIERpZCB5b3UgaW50ZW5kIHRvIHVwZGF0ZSBhbiBfb2JzZXJ2YWJsZV8gdmFsdWUsIGluc3RlYWQgb2YgdGhlIGNvbXB1dGVkIHByb3BlcnR5P1wiO1xuICB9LFxuICAzNDogZnVuY3Rpb24gXyhuYW1lKSB7XG4gICAgcmV0dXJuIFwiW0NvbXB1dGVkVmFsdWUgJ1wiICsgbmFtZSArIFwiJ10gSXQgaXMgbm90IHBvc3NpYmxlIHRvIGFzc2lnbiBhIG5ldyB2YWx1ZSB0byBhIGNvbXB1dGVkIHZhbHVlLlwiO1xuICB9LFxuICAzNTogXCJUaGVyZSBhcmUgbXVsdGlwbGUsIGRpZmZlcmVudCB2ZXJzaW9ucyBvZiBNb2JYIGFjdGl2ZS4gTWFrZSBzdXJlIE1vYlggaXMgbG9hZGVkIG9ubHkgb25jZSBvciB1c2UgYGNvbmZpZ3VyZSh7IGlzb2xhdGVHbG9iYWxTdGF0ZTogdHJ1ZSB9KWBcIixcbiAgMzY6IFwiaXNvbGF0ZUdsb2JhbFN0YXRlIHNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIE1vYlggaXMgcnVubmluZyBhbnkgcmVhY3Rpb25zXCIsXG4gIDM3OiBmdW5jdGlvbiBfKG1ldGhvZCkge1xuICAgIHJldHVybiBcIlttb2J4XSBgb2JzZXJ2YWJsZUFycmF5LlwiICsgbWV0aG9kICsgXCIoKWAgbXV0YXRlcyB0aGUgYXJyYXkgaW4tcGxhY2UsIHdoaWNoIGlzIG5vdCBhbGxvd2VkIGluc2lkZSBhIGRlcml2YXRpb24uIFVzZSBgYXJyYXkuc2xpY2UoKS5cIiArIG1ldGhvZCArIFwiKClgIGluc3RlYWRcIjtcbiAgfSxcbiAgMzg6IFwiJ293bktleXMoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHNcIixcbiAgMzk6IFwiJ2RlZmluZVByb3BlcnR5KCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzXCJcbn07XG52YXIgZXJyb3JzID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gbmljZUVycm9ycyA6IHt9O1xuZnVuY3Rpb24gZGllKGVycm9yKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgdmFyIGUgPSB0eXBlb2YgZXJyb3IgPT09IFwic3RyaW5nXCIgPyBlcnJvciA6IGVycm9yc1tlcnJvcl07XG4gICAgaWYgKHR5cGVvZiBlID09PSBcImZ1bmN0aW9uXCIpIGUgPSBlLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIHRocm93IG5ldyBFcnJvcihcIltNb2JYXSBcIiArIGUpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcih0eXBlb2YgZXJyb3IgPT09IFwibnVtYmVyXCIgPyBcIltNb2JYXSBtaW5pZmllZCBlcnJvciBucjogXCIgKyBlcnJvciArIChhcmdzLmxlbmd0aCA/IFwiIFwiICsgYXJncy5tYXAoU3RyaW5nKS5qb2luKFwiLFwiKSA6IFwiXCIpICsgXCIuIEZpbmQgdGhlIGZ1bGwgZXJyb3IgYXQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9tb2J4anMvbW9ieC9ibG9iL21haW4vcGFja2FnZXMvbW9ieC9zcmMvZXJyb3JzLnRzXCIgOiBcIltNb2JYXSBcIiArIGVycm9yKTtcbn1cblxudmFyIG1vY2tHbG9iYWwgPSB7fTtcbmZ1bmN0aW9uIGdldEdsb2JhbCgpIHtcbiAgaWYgKHR5cGVvZiBnbG9iYWxUaGlzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIGdsb2JhbFRoaXM7XG4gIH1cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG4gIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIGdsb2JhbDtcbiAgfVxuICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxuICByZXR1cm4gbW9ja0dsb2JhbDtcbn1cblxuLy8gV2Ugc2hvcnRlbiBhbnl0aGluZyB1c2VkID4gNSB0aW1lc1xudmFyIGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XG52YXIgZ2V0RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgb2JqZWN0UHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcbnZhciBFTVBUWV9BUlJBWSA9IFtdO1xuT2JqZWN0LmZyZWV6ZShFTVBUWV9BUlJBWSk7XG52YXIgRU1QVFlfT0JKRUNUID0ge307XG5PYmplY3QuZnJlZXplKEVNUFRZX09CSkVDVCk7XG52YXIgaGFzUHJveHkgPSB0eXBlb2YgUHJveHkgIT09IFwidW5kZWZpbmVkXCI7XG52YXIgcGxhaW5PYmplY3RTdHJpbmcgPSAvKiNfX1BVUkVfXyovT2JqZWN0LnRvU3RyaW5nKCk7XG5mdW5jdGlvbiBhc3NlcnRQcm94aWVzKCkge1xuICBpZiAoIWhhc1Byb3h5KSB7XG4gICAgZGllKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiYFByb3h5YCBvYmplY3RzIGFyZSBub3QgYXZhaWxhYmxlIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50LiBQbGVhc2UgY29uZmlndXJlIE1vYlggdG8gZW5hYmxlIGEgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24uYFwiIDogXCJQcm94eSBub3QgYXZhaWxhYmxlXCIpO1xuICB9XG59XG5mdW5jdGlvbiB3YXJuQWJvdXRQcm94eVJlcXVpcmVtZW50KG1zZykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGdsb2JhbFN0YXRlLnZlcmlmeVByb3hpZXMpIHtcbiAgICBkaWUoXCJNb2JYIGlzIGN1cnJlbnRseSBjb25maWd1cmVkIHRvIGJlIGFibGUgdG8gcnVuIGluIEVTNSBtb2RlLCBidXQgaW4gRVM1IE1vYlggd29uJ3QgYmUgYWJsZSB0byBcIiArIG1zZyk7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldE5leHRJZCgpIHtcbiAgcmV0dXJuICsrZ2xvYmFsU3RhdGUubW9ieEd1aWQ7XG59XG4vKipcbiAqIE1ha2VzIHN1cmUgdGhhdCB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gaXMgaW52b2tlZCBhdCBtb3N0IG9uY2UuXG4gKi9cbmZ1bmN0aW9uIG9uY2UoZnVuYykge1xuICB2YXIgaW52b2tlZCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmIChpbnZva2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGludm9rZWQgPSB0cnVlO1xuICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG52YXIgbm9vcCA9IGZ1bmN0aW9uIG5vb3AoKSB7fTtcbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZm4pIHtcbiAgcmV0dXJuIHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiO1xufVxuZnVuY3Rpb24gaXNTdHJpbmdpc2godmFsdWUpIHtcbiAgdmFyIHQgPSB0eXBlb2YgdmFsdWU7XG4gIHN3aXRjaCAodCkge1xuICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICBjYXNlIFwic3ltYm9sXCI6XG4gICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKTtcbiAgaWYgKHByb3RvID09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgcHJvdG9Db25zdHJ1Y3RvciA9IE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCBcImNvbnN0cnVjdG9yXCIpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gdHlwZW9mIHByb3RvQ29uc3RydWN0b3IgPT09IFwiZnVuY3Rpb25cIiAmJiBwcm90b0NvbnN0cnVjdG9yLnRvU3RyaW5nKCkgPT09IHBsYWluT2JqZWN0U3RyaW5nO1xufVxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM3ODY1MTcwXG5mdW5jdGlvbiBpc0dlbmVyYXRvcihvYmopIHtcbiAgdmFyIGNvbnN0cnVjdG9yID0gb2JqID09IG51bGwgPyB2b2lkIDAgOiBvYmouY29uc3RydWN0b3I7XG4gIGlmICghY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA9PT0gY29uc3RydWN0b3IubmFtZSB8fCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIgPT09IGNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gYWRkSGlkZGVuUHJvcChvYmplY3QsIHByb3BOYW1lLCB2YWx1ZSkge1xuICBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIHByb3BOYW1lLCB7XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9KTtcbn1cbmZ1bmN0aW9uIGFkZEhpZGRlbkZpbmFsUHJvcChvYmplY3QsIHByb3BOYW1lLCB2YWx1ZSkge1xuICBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIHByb3BOYW1lLCB7XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlKG5hbWUsIHRoZUNsYXNzKSB7XG4gIHZhciBwcm9wTmFtZSA9IFwiaXNNb2JYXCIgKyBuYW1lO1xuICB0aGVDbGFzcy5wcm90b3R5cGVbcHJvcE5hbWVdID0gdHJ1ZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICh4KSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0KHgpICYmIHhbcHJvcE5hbWVdID09PSB0cnVlO1xuICB9O1xufVxuZnVuY3Rpb24gaXNFUzZNYXAodGhpbmcpIHtcbiAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgTWFwO1xufVxuZnVuY3Rpb24gaXNFUzZTZXQodGhpbmcpIHtcbiAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgU2V0O1xufVxudmFyIGhhc0dldE93blByb3BlcnR5U3ltYm9scyA9IHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICE9PSBcInVuZGVmaW5lZFwiO1xuLyoqXG4gKiBSZXR1cm5zIHRoZSBmb2xsb3dpbmc6IG93biBlbnVtZXJhYmxlIGtleXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldFBsYWluT2JqZWN0S2V5cyhvYmplY3QpIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmplY3QpO1xuICAvLyBOb3Qgc3VwcG9ydGVkIGluIElFLCBzbyB0aGVyZSBhcmUgbm90IGdvaW5nIHRvIGJlIHN5bWJvbCBwcm9wcyBhbnl3YXkuLi5cbiAgaWYgKCFoYXNHZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4ga2V5cztcbiAgfVxuICB2YXIgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KTtcbiAgaWYgKCFzeW1ib2xzLmxlbmd0aCkge1xuICAgIHJldHVybiBrZXlzO1xuICB9XG4gIHJldHVybiBbXS5jb25jYXQoa2V5cywgc3ltYm9scy5maWx0ZXIoZnVuY3Rpb24gKHMpIHtcbiAgICByZXR1cm4gb2JqZWN0UHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqZWN0LCBzKTtcbiAgfSkpO1xufVxuLy8gRnJvbSBJbW1lciB1dGlsc1xuLy8gUmV0dXJucyBhbGwgb3duIGtleXMsIGluY2x1ZGluZyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9saWNcbnZhciBvd25LZXlzID0gdHlwZW9mIFJlZmxlY3QgIT09IFwidW5kZWZpbmVkXCIgJiYgUmVmbGVjdC5vd25LZXlzID8gUmVmbGVjdC5vd25LZXlzIDogaGFzR2V0T3duUHJvcGVydHlTeW1ib2xzID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopKTtcbn0gOiAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL09iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuZnVuY3Rpb24gc3RyaW5naWZ5S2V5KGtleSkge1xuICBpZiAodHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBrZXk7XG4gIH1cbiAgaWYgKHR5cGVvZiBrZXkgPT09IFwic3ltYm9sXCIpIHtcbiAgICByZXR1cm4ga2V5LnRvU3RyaW5nKCk7XG4gIH1cbiAgcmV0dXJuIG5ldyBTdHJpbmcoa2V5KS50b1N0cmluZygpO1xufVxuZnVuY3Rpb24gdG9QcmltaXRpdmUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBudWxsID8gbnVsbCA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiA/IFwiXCIgKyB2YWx1ZSA6IHZhbHVlO1xufVxuZnVuY3Rpb24gaGFzUHJvcCh0YXJnZXQsIHByb3ApIHtcbiAgcmV0dXJuIG9iamVjdFByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwgcHJvcCk7XG59XG4vLyBGcm9tIEltbWVyIHV0aWxzXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnModGFyZ2V0KSB7XG4gIC8vIFBvbHlmaWxsIG5lZWRlZCBmb3IgSGVybWVzIGFuZCBJRSwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9oZXJtZXMvaXNzdWVzLzI3NFxuICB2YXIgcmVzID0ge307XG4gIC8vIE5vdGU6IHdpdGhvdXQgcG9seWZpbGwgZm9yIG93bktleXMsIHN5bWJvbHMgd29uJ3QgYmUgcGlja2VkIHVwXG4gIG93bktleXModGFyZ2V0KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXNba2V5XSA9IGdldERlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICB9KTtcbiAgcmV0dXJuIHJlcztcbn07XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIF90b1Byb3BlcnR5S2V5KGRlc2NyaXB0b3Iua2V5KSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5mdW5jdGlvbiBfZXh0ZW5kcygpIHtcbiAgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduID8gT2JqZWN0LmFzc2lnbi5iaW5kKCkgOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuICByZXR1cm4gX2V4dGVuZHMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTtcbn1cbmZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gIF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZi5iaW5kKCkgOiBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcbiAgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTtcbn1cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG4gIHJldHVybiBzZWxmO1xufVxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikge1xuICBpZiAoIW8pIHJldHVybjtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbiAgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTtcbiAgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xufVxuZnVuY3Rpb24gX2FycmF5TGlrZVRvQXJyYXkoYXJyLCBsZW4pIHtcbiAgaWYgKGxlbiA9PSBudWxsIHx8IGxlbiA+IGFyci5sZW5ndGgpIGxlbiA9IGFyci5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBhcnIyID0gbmV3IEFycmF5KGxlbik7IGkgPCBsZW47IGkrKykgYXJyMltpXSA9IGFycltpXTtcbiAgcmV0dXJuIGFycjI7XG59XG5mdW5jdGlvbiBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKG8sIGFsbG93QXJyYXlMaWtlKSB7XG4gIHZhciBpdCA9IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdIHx8IG9bXCJAQGl0ZXJhdG9yXCJdO1xuICBpZiAoaXQpIHJldHVybiAoaXQgPSBpdC5jYWxsKG8pKS5uZXh0LmJpbmQoaXQpO1xuICBpZiAoQXJyYXkuaXNBcnJheShvKSB8fCAoaXQgPSBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobykpIHx8IGFsbG93QXJyYXlMaWtlICYmIG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XG4gICAgaWYgKGl0KSBvID0gaXQ7XG4gICAgdmFyIGkgPSAwO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaSA+PSBvLmxlbmd0aCkgcmV0dXJuIHtcbiAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgfTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogb1tpKytdXG4gICAgICB9O1xuICAgIH07XG4gIH1cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBpdGVyYXRlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZS5cXG5JbiBvcmRlciB0byBiZSBpdGVyYWJsZSwgbm9uLWFycmF5IG9iamVjdHMgbXVzdCBoYXZlIGEgW1N5bWJvbC5pdGVyYXRvcl0oKSBtZXRob2QuXCIpO1xufVxuZnVuY3Rpb24gX3RvUHJpbWl0aXZlKGlucHV0LCBoaW50KSB7XG4gIGlmICh0eXBlb2YgaW5wdXQgIT09IFwib2JqZWN0XCIgfHwgaW5wdXQgPT09IG51bGwpIHJldHVybiBpbnB1dDtcbiAgdmFyIHByaW0gPSBpbnB1dFtTeW1ib2wudG9QcmltaXRpdmVdO1xuICBpZiAocHJpbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIHJlcyA9IHByaW0uY2FsbChpbnB1dCwgaGludCB8fCBcImRlZmF1bHRcIik7XG4gICAgaWYgKHR5cGVvZiByZXMgIT09IFwib2JqZWN0XCIpIHJldHVybiByZXM7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkBAdG9QcmltaXRpdmUgbXVzdCByZXR1cm4gYSBwcmltaXRpdmUgdmFsdWUuXCIpO1xuICB9XG4gIHJldHVybiAoaGludCA9PT0gXCJzdHJpbmdcIiA/IFN0cmluZyA6IE51bWJlcikoaW5wdXQpO1xufVxuZnVuY3Rpb24gX3RvUHJvcGVydHlLZXkoYXJnKSB7XG4gIHZhciBrZXkgPSBfdG9QcmltaXRpdmUoYXJnLCBcInN0cmluZ1wiKTtcbiAgcmV0dXJuIHR5cGVvZiBrZXkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBTdHJpbmcoa2V5KTtcbn1cblxudmFyIHN0b3JlZEFubm90YXRpb25zU3ltYm9sID0gLyojX19QVVJFX18qL1N5bWJvbChcIm1vYngtc3RvcmVkLWFubm90YXRpb25zXCIpO1xuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBhY3RzIGFzXG4gKiAtIGRlY29yYXRvclxuICogLSBhbm5vdGF0aW9uIG9iamVjdFxuICovXG5mdW5jdGlvbiBjcmVhdGVEZWNvcmF0b3JBbm5vdGF0aW9uKGFubm90YXRpb24pIHtcbiAgZnVuY3Rpb24gZGVjb3JhdG9yKHRhcmdldCwgcHJvcGVydHkpIHtcbiAgICBpZiAoaXMyMDIyM0RlY29yYXRvcihwcm9wZXJ0eSkpIHtcbiAgICAgIHJldHVybiBhbm5vdGF0aW9uLmRlY29yYXRlXzIwMjIzXyh0YXJnZXQsIHByb3BlcnR5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RvcmVBbm5vdGF0aW9uKHRhcmdldCwgcHJvcGVydHksIGFubm90YXRpb24pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihkZWNvcmF0b3IsIGFubm90YXRpb24pO1xufVxuLyoqXG4gKiBTdG9yZXMgYW5ub3RhdGlvbiB0byBwcm90b3R5cGUsXG4gKiBzbyBpdCBjYW4gYmUgaW5zcGVjdGVkIGxhdGVyIGJ5IGBtYWtlT2JzZXJ2YWJsZWAgY2FsbGVkIGZyb20gY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gc3RvcmVBbm5vdGF0aW9uKHByb3RvdHlwZSwga2V5LCBhbm5vdGF0aW9uKSB7XG4gIGlmICghaGFzUHJvcChwcm90b3R5cGUsIHN0b3JlZEFubm90YXRpb25zU3ltYm9sKSkge1xuICAgIGFkZEhpZGRlblByb3AocHJvdG90eXBlLCBzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbCwgX2V4dGVuZHMoe30sIHByb3RvdHlwZVtzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbF0pKTtcbiAgfVxuICAvLyBAb3ZlcnJpZGUgbXVzdCBvdmVycmlkZSBzb21ldGhpbmdcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBpc092ZXJyaWRlKGFubm90YXRpb24pICYmICFoYXNQcm9wKHByb3RvdHlwZVtzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbF0sIGtleSkpIHtcbiAgICB2YXIgZmllbGROYW1lID0gcHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWUgKyBcIi5wcm90b3R5cGUuXCIgKyBrZXkudG9TdHJpbmcoKTtcbiAgICBkaWUoXCInXCIgKyBmaWVsZE5hbWUgKyBcIicgaXMgZGVjb3JhdGVkIHdpdGggJ292ZXJyaWRlJywgXCIgKyBcImJ1dCBubyBzdWNoIGRlY29yYXRlZCBtZW1iZXIgd2FzIGZvdW5kIG9uIHByb3RvdHlwZS5cIik7XG4gIH1cbiAgLy8gQ2Fubm90IHJlLWRlY29yYXRlXG4gIGFzc2VydE5vdERlY29yYXRlZChwcm90b3R5cGUsIGFubm90YXRpb24sIGtleSk7XG4gIC8vIElnbm9yZSBvdmVycmlkZVxuICBpZiAoIWlzT3ZlcnJpZGUoYW5ub3RhdGlvbikpIHtcbiAgICBwcm90b3R5cGVbc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2xdW2tleV0gPSBhbm5vdGF0aW9uO1xuICB9XG59XG5mdW5jdGlvbiBhc3NlcnROb3REZWNvcmF0ZWQocHJvdG90eXBlLCBhbm5vdGF0aW9uLCBrZXkpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhaXNPdmVycmlkZShhbm5vdGF0aW9uKSAmJiBoYXNQcm9wKHByb3RvdHlwZVtzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbF0sIGtleSkpIHtcbiAgICB2YXIgZmllbGROYW1lID0gcHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWUgKyBcIi5wcm90b3R5cGUuXCIgKyBrZXkudG9TdHJpbmcoKTtcbiAgICB2YXIgY3VycmVudEFubm90YXRpb25UeXBlID0gcHJvdG90eXBlW3N0b3JlZEFubm90YXRpb25zU3ltYm9sXVtrZXldLmFubm90YXRpb25UeXBlXztcbiAgICB2YXIgcmVxdWVzdGVkQW5ub3RhdGlvblR5cGUgPSBhbm5vdGF0aW9uLmFubm90YXRpb25UeXBlXztcbiAgICBkaWUoXCJDYW5ub3QgYXBwbHkgJ0BcIiArIHJlcXVlc3RlZEFubm90YXRpb25UeXBlICsgXCInIHRvICdcIiArIGZpZWxkTmFtZSArIFwiJzpcIiArIChcIlxcblRoZSBmaWVsZCBpcyBhbHJlYWR5IGRlY29yYXRlZCB3aXRoICdAXCIgKyBjdXJyZW50QW5ub3RhdGlvblR5cGUgKyBcIicuXCIpICsgXCJcXG5SZS1kZWNvcmF0aW5nIGZpZWxkcyBpcyBub3QgYWxsb3dlZC5cIiArIFwiXFxuVXNlICdAb3ZlcnJpZGUnIGRlY29yYXRvciBmb3IgbWV0aG9kcyBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzLlwiKTtcbiAgfVxufVxuLyoqXG4gKiBDb2xsZWN0cyBhbm5vdGF0aW9ucyBmcm9tIHByb3RvdHlwZXMgYW5kIHN0b3JlcyB0aGVtIG9uIHRhcmdldCAoaW5zdGFuY2UpXG4gKi9cbmZ1bmN0aW9uIGNvbGxlY3RTdG9yZWRBbm5vdGF0aW9ucyh0YXJnZXQpIHtcbiAgaWYgKCFoYXNQcm9wKHRhcmdldCwgc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2wpKSB7XG4gICAgLy8gaWYgKF9fREVWX18gJiYgIXRhcmdldFtzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbF0pIHtcbiAgICAvLyAgICAgZGllKFxuICAgIC8vICAgICAgICAgYE5vIGFubm90YXRpb25zIHdlcmUgcGFzc2VkIHRvIG1ha2VPYnNlcnZhYmxlLCBidXQgbm8gZGVjb3JhdGVkIG1lbWJlcnMgaGF2ZSBiZWVuIGZvdW5kIGVpdGhlcmBcbiAgICAvLyAgICAgKVxuICAgIC8vIH1cbiAgICAvLyBXZSBuZWVkIGEgY29weSBhcyB3ZSB3aWxsIHJlbW92ZSBhbm5vdGF0aW9uIGZyb20gdGhlIGxpc3Qgb25jZSBpdCdzIGFwcGxpZWQuXG4gICAgYWRkSGlkZGVuUHJvcCh0YXJnZXQsIHN0b3JlZEFubm90YXRpb25zU3ltYm9sLCBfZXh0ZW5kcyh7fSwgdGFyZ2V0W3N0b3JlZEFubm90YXRpb25zU3ltYm9sXSkpO1xuICB9XG4gIHJldHVybiB0YXJnZXRbc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2xdO1xufVxuZnVuY3Rpb24gaXMyMDIyM0RlY29yYXRvcihjb250ZXh0KSB7XG4gIHJldHVybiB0eXBlb2YgY29udGV4dCA9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBjb250ZXh0W1wia2luZFwiXSA9PSBcInN0cmluZ1wiO1xufVxuZnVuY3Rpb24gYXNzZXJ0MjAyMjNEZWNvcmF0b3JUeXBlKGNvbnRleHQsIHR5cGVzKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIXR5cGVzLmluY2x1ZGVzKGNvbnRleHQua2luZCkpIHtcbiAgICBkaWUoXCJUaGUgZGVjb3JhdG9yIGFwcGxpZWQgdG8gJ1wiICsgU3RyaW5nKGNvbnRleHQubmFtZSkgKyBcIicgY2Fubm90IGJlIHVzZWQgb24gYSBcIiArIGNvbnRleHQua2luZCArIFwiIGVsZW1lbnRcIik7XG4gIH1cbn1cblxudmFyICRtb2J4ID0gLyojX19QVVJFX18qL1N5bWJvbChcIm1vYnggYWRtaW5pc3RyYXRpb25cIik7XG52YXIgQXRvbSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8vIGZvciBlZmZlY3RpdmUgdW5vYnNlcnZpbmcuIEJhc2VBdG9tIGhhcyB0cnVlLCBmb3IgZXh0cmEgb3B0aW1pemF0aW9uLCBzbyBpdHMgb25CZWNvbWVVbm9ic2VydmVkIG5ldmVyIGdldHMgY2FsbGVkLCBiZWNhdXNlIGl0J3Mgbm90IG5lZWRlZFxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYXRvbS4gRm9yIGRlYnVnZ2luZyBwdXJwb3NlcyBpdCBpcyByZWNvbW1lbmRlZCB0byBnaXZlIGl0IGEgbmFtZS5cbiAgICogVGhlIG9uQmVjb21lT2JzZXJ2ZWQgYW5kIG9uQmVjb21lVW5vYnNlcnZlZCBjYWxsYmFja3MgY2FuIGJlIHVzZWQgZm9yIHJlc291cmNlIG1hbmFnZW1lbnQuXG4gICAqL1xuICBmdW5jdGlvbiBBdG9tKG5hbWVfKSB7XG4gICAgaWYgKG5hbWVfID09PSB2b2lkIDApIHtcbiAgICAgIG5hbWVfID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJBdG9tQFwiICsgZ2V0TmV4dElkKCkgOiBcIkF0b21cIjtcbiAgICB9XG4gICAgdGhpcy5uYW1lXyA9IHZvaWQgMDtcbiAgICB0aGlzLmlzUGVuZGluZ1Vub2JzZXJ2YXRpb25fID0gZmFsc2U7XG4gICAgdGhpcy5pc0JlaW5nT2JzZXJ2ZWRfID0gZmFsc2U7XG4gICAgdGhpcy5vYnNlcnZlcnNfID0gbmV3IFNldCgpO1xuICAgIHRoaXMuZGlmZlZhbHVlXyA9IDA7XG4gICAgdGhpcy5sYXN0QWNjZXNzZWRCeV8gPSAwO1xuICAgIHRoaXMubG93ZXN0T2JzZXJ2ZXJTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5OT1RfVFJBQ0tJTkdfO1xuICAgIHRoaXMub25CT0wgPSB2b2lkIDA7XG4gICAgdGhpcy5vbkJVT0wgPSB2b2lkIDA7XG4gICAgdGhpcy5uYW1lXyA9IG5hbWVfO1xuICB9XG4gIC8vIG9uQmVjb21lT2JzZXJ2ZWRMaXN0ZW5lcnNcbiAgdmFyIF9wcm90byA9IEF0b20ucHJvdG90eXBlO1xuICBfcHJvdG8ub25CTyA9IGZ1bmN0aW9uIG9uQk8oKSB7XG4gICAgaWYgKHRoaXMub25CT0wpIHtcbiAgICAgIHRoaXMub25CT0wuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5vbkJVTyA9IGZ1bmN0aW9uIG9uQlVPKCkge1xuICAgIGlmICh0aGlzLm9uQlVPTCkge1xuICAgICAgdGhpcy5vbkJVT0wuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIEludm9rZSB0aGlzIG1ldGhvZCB0byBub3RpZnkgbW9ieCB0aGF0IHlvdXIgYXRvbSBoYXMgYmVlbiB1c2VkIHNvbWVob3cuXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBjdXJyZW50bHkgYSByZWFjdGl2ZSBjb250ZXh0LlxuICAgKi87XG4gIF9wcm90by5yZXBvcnRPYnNlcnZlZCA9IGZ1bmN0aW9uIHJlcG9ydE9ic2VydmVkJDEoKSB7XG4gICAgcmV0dXJuIHJlcG9ydE9ic2VydmVkKHRoaXMpO1xuICB9XG4gIC8qKlxuICAgKiBJbnZva2UgdGhpcyBtZXRob2QgX2FmdGVyXyB0aGlzIG1ldGhvZCBoYXMgY2hhbmdlZCB0byBzaWduYWwgbW9ieCB0aGF0IGFsbCBpdHMgb2JzZXJ2ZXJzIHNob3VsZCBpbnZhbGlkYXRlLlxuICAgKi87XG4gIF9wcm90by5yZXBvcnRDaGFuZ2VkID0gZnVuY3Rpb24gcmVwb3J0Q2hhbmdlZCgpIHtcbiAgICBzdGFydEJhdGNoKCk7XG4gICAgcHJvcGFnYXRlQ2hhbmdlZCh0aGlzKTtcbiAgICBlbmRCYXRjaCgpO1xuICB9O1xuICBfcHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lXztcbiAgfTtcbiAgcmV0dXJuIEF0b207XG59KCk7XG52YXIgaXNBdG9tID0gLyojX19QVVJFX18qL2NyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUoXCJBdG9tXCIsIEF0b20pO1xuZnVuY3Rpb24gY3JlYXRlQXRvbShuYW1lLCBvbkJlY29tZU9ic2VydmVkSGFuZGxlciwgb25CZWNvbWVVbm9ic2VydmVkSGFuZGxlcikge1xuICBpZiAob25CZWNvbWVPYnNlcnZlZEhhbmRsZXIgPT09IHZvaWQgMCkge1xuICAgIG9uQmVjb21lT2JzZXJ2ZWRIYW5kbGVyID0gbm9vcDtcbiAgfVxuICBpZiAob25CZWNvbWVVbm9ic2VydmVkSGFuZGxlciA9PT0gdm9pZCAwKSB7XG4gICAgb25CZWNvbWVVbm9ic2VydmVkSGFuZGxlciA9IG5vb3A7XG4gIH1cbiAgdmFyIGF0b20gPSBuZXcgQXRvbShuYW1lKTtcbiAgLy8gZGVmYXVsdCBgbm9vcGAgbGlzdGVuZXIgd2lsbCBub3QgaW5pdGlhbGl6ZSB0aGUgaG9vayBTZXRcbiAgaWYgKG9uQmVjb21lT2JzZXJ2ZWRIYW5kbGVyICE9PSBub29wKSB7XG4gICAgb25CZWNvbWVPYnNlcnZlZChhdG9tLCBvbkJlY29tZU9ic2VydmVkSGFuZGxlcik7XG4gIH1cbiAgaWYgKG9uQmVjb21lVW5vYnNlcnZlZEhhbmRsZXIgIT09IG5vb3ApIHtcbiAgICBvbkJlY29tZVVub2JzZXJ2ZWQoYXRvbSwgb25CZWNvbWVVbm9ic2VydmVkSGFuZGxlcik7XG4gIH1cbiAgcmV0dXJuIGF0b207XG59XG5cbmZ1bmN0aW9uIGlkZW50aXR5Q29tcGFyZXIoYSwgYikge1xuICByZXR1cm4gYSA9PT0gYjtcbn1cbmZ1bmN0aW9uIHN0cnVjdHVyYWxDb21wYXJlcihhLCBiKSB7XG4gIHJldHVybiBkZWVwRXF1YWwoYSwgYik7XG59XG5mdW5jdGlvbiBzaGFsbG93Q29tcGFyZXIoYSwgYikge1xuICByZXR1cm4gZGVlcEVxdWFsKGEsIGIsIDEpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmVyKGEsIGIpIHtcbiAgaWYgKE9iamVjdC5pcykge1xuICAgIHJldHVybiBPYmplY3QuaXMoYSwgYik7XG4gIH1cbiAgcmV0dXJuIGEgPT09IGIgPyBhICE9PSAwIHx8IDEgLyBhID09PSAxIC8gYiA6IGEgIT09IGEgJiYgYiAhPT0gYjtcbn1cbnZhciBjb21wYXJlciA9IHtcbiAgaWRlbnRpdHk6IGlkZW50aXR5Q29tcGFyZXIsXG4gIHN0cnVjdHVyYWw6IHN0cnVjdHVyYWxDb21wYXJlcixcbiAgXCJkZWZhdWx0XCI6IGRlZmF1bHRDb21wYXJlcixcbiAgc2hhbGxvdzogc2hhbGxvd0NvbXBhcmVyXG59O1xuXG5mdW5jdGlvbiBkZWVwRW5oYW5jZXIodiwgXywgbmFtZSkge1xuICAvLyBpdCBpcyBhbiBvYnNlcnZhYmxlIGFscmVhZHksIGRvbmVcbiAgaWYgKGlzT2JzZXJ2YWJsZSh2KSkge1xuICAgIHJldHVybiB2O1xuICB9XG4gIC8vIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb252ZXJ0ZWQgYW5kIG11dGF0ZWQ/XG4gIGlmIChBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUuYXJyYXkodiwge1xuICAgICAgbmFtZTogbmFtZVxuICAgIH0pO1xuICB9XG4gIGlmIChpc1BsYWluT2JqZWN0KHYpKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUub2JqZWN0KHYsIHVuZGVmaW5lZCwge1xuICAgICAgbmFtZTogbmFtZVxuICAgIH0pO1xuICB9XG4gIGlmIChpc0VTNk1hcCh2KSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlLm1hcCh2LCB7XG4gICAgICBuYW1lOiBuYW1lXG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzRVM2U2V0KHYpKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUuc2V0KHYsIHtcbiAgICAgIG5hbWU6IG5hbWVcbiAgICB9KTtcbiAgfVxuICBpZiAodHlwZW9mIHYgPT09IFwiZnVuY3Rpb25cIiAmJiAhaXNBY3Rpb24odikgJiYgIWlzRmxvdyh2KSkge1xuICAgIGlmIChpc0dlbmVyYXRvcih2KSkge1xuICAgICAgcmV0dXJuIGZsb3codik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhdXRvQWN0aW9uKG5hbWUsIHYpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdjtcbn1cbmZ1bmN0aW9uIHNoYWxsb3dFbmhhbmNlcih2LCBfLCBuYW1lKSB7XG4gIGlmICh2ID09PSB1bmRlZmluZWQgfHwgdiA9PT0gbnVsbCkge1xuICAgIHJldHVybiB2O1xuICB9XG4gIGlmIChpc09ic2VydmFibGVPYmplY3QodikgfHwgaXNPYnNlcnZhYmxlQXJyYXkodikgfHwgaXNPYnNlcnZhYmxlTWFwKHYpIHx8IGlzT2JzZXJ2YWJsZVNldCh2KSkge1xuICAgIHJldHVybiB2O1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUuYXJyYXkodiwge1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGRlZXA6IGZhbHNlXG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzUGxhaW5PYmplY3QodikpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5vYmplY3QodiwgdW5kZWZpbmVkLCB7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgZGVlcDogZmFsc2VcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNFUzZNYXAodikpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5tYXAodiwge1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGRlZXA6IGZhbHNlXG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzRVM2U2V0KHYpKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUuc2V0KHYsIHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBkZWVwOiBmYWxzZVxuICAgIH0pO1xuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBkaWUoXCJUaGUgc2hhbGxvdyBtb2RpZmllciAvIGRlY29yYXRvciBjYW4gb25seSB1c2VkIGluIGNvbWJpbmF0aW9uIHdpdGggYXJyYXlzLCBvYmplY3RzLCBtYXBzIGFuZCBzZXRzXCIpO1xuICB9XG59XG5mdW5jdGlvbiByZWZlcmVuY2VFbmhhbmNlcihuZXdWYWx1ZSkge1xuICAvLyBuZXZlciB0dXJuIGludG8gYW4gb2JzZXJ2YWJsZVxuICByZXR1cm4gbmV3VmFsdWU7XG59XG5mdW5jdGlvbiByZWZTdHJ1Y3RFbmhhbmNlcih2LCBvbGRWYWx1ZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGlzT2JzZXJ2YWJsZSh2KSkge1xuICAgIGRpZShcIm9ic2VydmFibGUuc3RydWN0IHNob3VsZCBub3QgYmUgdXNlZCB3aXRoIG9ic2VydmFibGUgdmFsdWVzXCIpO1xuICB9XG4gIGlmIChkZWVwRXF1YWwodiwgb2xkVmFsdWUpKSB7XG4gICAgcmV0dXJuIG9sZFZhbHVlO1xuICB9XG4gIHJldHVybiB2O1xufVxuXG52YXIgT1ZFUlJJREUgPSBcIm92ZXJyaWRlXCI7XG52YXIgb3ZlcnJpZGUgPSAvKiNfX1BVUkVfXyovY3JlYXRlRGVjb3JhdG9yQW5ub3RhdGlvbih7XG4gIGFubm90YXRpb25UeXBlXzogT1ZFUlJJREUsXG4gIG1ha2VfOiBtYWtlXyxcbiAgZXh0ZW5kXzogZXh0ZW5kXyxcbiAgZGVjb3JhdGVfMjAyMjNfOiBkZWNvcmF0ZV8yMDIyM19cbn0pO1xuZnVuY3Rpb24gaXNPdmVycmlkZShhbm5vdGF0aW9uKSB7XG4gIHJldHVybiBhbm5vdGF0aW9uLmFubm90YXRpb25UeXBlXyA9PT0gT1ZFUlJJREU7XG59XG5mdW5jdGlvbiBtYWtlXyhhZG0sIGtleSkge1xuICAvLyBNdXN0IG5vdCBiZSBwbGFpbiBvYmplY3RcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBhZG0uaXNQbGFpbk9iamVjdF8pIHtcbiAgICBkaWUoXCJDYW5ub3QgYXBwbHkgJ1wiICsgdGhpcy5hbm5vdGF0aW9uVHlwZV8gKyBcIicgdG8gJ1wiICsgYWRtLm5hbWVfICsgXCIuXCIgKyBrZXkudG9TdHJpbmcoKSArIFwiJzpcIiArIChcIlxcbidcIiArIHRoaXMuYW5ub3RhdGlvblR5cGVfICsgXCInIGNhbm5vdCBiZSB1c2VkIG9uIHBsYWluIG9iamVjdHMuXCIpKTtcbiAgfVxuICAvLyBNdXN0IG92ZXJyaWRlIHNvbWV0aGluZ1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFoYXNQcm9wKGFkbS5hcHBsaWVkQW5ub3RhdGlvbnNfLCBrZXkpKSB7XG4gICAgZGllKFwiJ1wiICsgYWRtLm5hbWVfICsgXCIuXCIgKyBrZXkudG9TdHJpbmcoKSArIFwiJyBpcyBhbm5vdGF0ZWQgd2l0aCAnXCIgKyB0aGlzLmFubm90YXRpb25UeXBlXyArIFwiJywgXCIgKyBcImJ1dCBubyBzdWNoIGFubm90YXRlZCBtZW1iZXIgd2FzIGZvdW5kIG9uIHByb3RvdHlwZS5cIik7XG4gIH1cbiAgcmV0dXJuIDAgLyogTWFrZVJlc3VsdC5DYW5jZWwgKi87XG59XG5cbmZ1bmN0aW9uIGV4dGVuZF8oYWRtLCBrZXksIGRlc2NyaXB0b3IsIHByb3h5VHJhcCkge1xuICBkaWUoXCInXCIgKyB0aGlzLmFubm90YXRpb25UeXBlXyArIFwiJyBjYW4gb25seSBiZSB1c2VkIHdpdGggJ21ha2VPYnNlcnZhYmxlJ1wiKTtcbn1cbmZ1bmN0aW9uIGRlY29yYXRlXzIwMjIzXyhkZXNjLCBjb250ZXh0KSB7XG4gIGNvbnNvbGUud2FybihcIidcIiArIHRoaXMuYW5ub3RhdGlvblR5cGVfICsgXCInIGNhbm5vdCBiZSB1c2VkIHdpdGggZGVjb3JhdG9ycyAtIHRoaXMgaXMgYSBuby1vcFwiKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQWN0aW9uQW5ub3RhdGlvbihuYW1lLCBvcHRpb25zKSB7XG4gIHJldHVybiB7XG4gICAgYW5ub3RhdGlvblR5cGVfOiBuYW1lLFxuICAgIG9wdGlvbnNfOiBvcHRpb25zLFxuICAgIG1ha2VfOiBtYWtlXyQxLFxuICAgIGV4dGVuZF86IGV4dGVuZF8kMSxcbiAgICBkZWNvcmF0ZV8yMDIyM186IGRlY29yYXRlXzIwMjIzXyQxXG4gIH07XG59XG5mdW5jdGlvbiBtYWtlXyQxKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBzb3VyY2UpIHtcbiAgdmFyIF90aGlzJG9wdGlvbnNfO1xuICAvLyBib3VuZFxuICBpZiAoKF90aGlzJG9wdGlvbnNfID0gdGhpcy5vcHRpb25zXykgIT0gbnVsbCAmJiBfdGhpcyRvcHRpb25zXy5ib3VuZCkge1xuICAgIHJldHVybiB0aGlzLmV4dGVuZF8oYWRtLCBrZXksIGRlc2NyaXB0b3IsIGZhbHNlKSA9PT0gbnVsbCA/IDAgLyogTWFrZVJlc3VsdC5DYW5jZWwgKi8gOiAxIC8qIE1ha2VSZXN1bHQuQnJlYWsgKi87XG4gIH1cbiAgLy8gb3duXG4gIGlmIChzb3VyY2UgPT09IGFkbS50YXJnZXRfKSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5kXyhhZG0sIGtleSwgZGVzY3JpcHRvciwgZmFsc2UpID09PSBudWxsID8gMCAvKiBNYWtlUmVzdWx0LkNhbmNlbCAqLyA6IDIgLyogTWFrZVJlc3VsdC5Db250aW51ZSAqLztcbiAgfVxuICAvLyBwcm90b3R5cGVcbiAgaWYgKGlzQWN0aW9uKGRlc2NyaXB0b3IudmFsdWUpKSB7XG4gICAgLy8gQSBwcm90b3R5cGUgY291bGQgaGF2ZSBiZWVuIGFubm90YXRlZCBhbHJlYWR5IGJ5IG90aGVyIGNvbnN0cnVjdG9yLFxuICAgIC8vIHJlc3Qgb2YgdGhlIHByb3RvIGNoYWluIG11c3QgYmUgYW5ub3RhdGVkIGFscmVhZHlcbiAgICByZXR1cm4gMSAvKiBNYWtlUmVzdWx0LkJyZWFrICovO1xuICB9XG5cbiAgdmFyIGFjdGlvbkRlc2NyaXB0b3IgPSBjcmVhdGVBY3Rpb25EZXNjcmlwdG9yKGFkbSwgdGhpcywga2V5LCBkZXNjcmlwdG9yLCBmYWxzZSk7XG4gIGRlZmluZVByb3BlcnR5KHNvdXJjZSwga2V5LCBhY3Rpb25EZXNjcmlwdG9yKTtcbiAgcmV0dXJuIDIgLyogTWFrZVJlc3VsdC5Db250aW51ZSAqLztcbn1cblxuZnVuY3Rpb24gZXh0ZW5kXyQxKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBwcm94eVRyYXApIHtcbiAgdmFyIGFjdGlvbkRlc2NyaXB0b3IgPSBjcmVhdGVBY3Rpb25EZXNjcmlwdG9yKGFkbSwgdGhpcywga2V5LCBkZXNjcmlwdG9yKTtcbiAgcmV0dXJuIGFkbS5kZWZpbmVQcm9wZXJ0eV8oa2V5LCBhY3Rpb25EZXNjcmlwdG9yLCBwcm94eVRyYXApO1xufVxuZnVuY3Rpb24gZGVjb3JhdGVfMjAyMjNfJDEobXRoZCwgY29udGV4dCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgYXNzZXJ0MjAyMjNEZWNvcmF0b3JUeXBlKGNvbnRleHQsIFtcIm1ldGhvZFwiLCBcImZpZWxkXCJdKTtcbiAgfVxuICB2YXIga2luZCA9IGNvbnRleHQua2luZCxcbiAgICBuYW1lID0gY29udGV4dC5uYW1lLFxuICAgIGFkZEluaXRpYWxpemVyID0gY29udGV4dC5hZGRJbml0aWFsaXplcjtcbiAgdmFyIGFubiA9IHRoaXM7XG4gIHZhciBfY3JlYXRlQWN0aW9uID0gZnVuY3Rpb24gX2NyZWF0ZUFjdGlvbihtKSB7XG4gICAgdmFyIF9hbm4kb3B0aW9uc18kbmFtZSwgX2FubiRvcHRpb25zXywgX2FubiRvcHRpb25zXyRhdXRvQWN0LCBfYW5uJG9wdGlvbnNfMjtcbiAgICByZXR1cm4gY3JlYXRlQWN0aW9uKChfYW5uJG9wdGlvbnNfJG5hbWUgPSAoX2FubiRvcHRpb25zXyA9IGFubi5vcHRpb25zXykgPT0gbnVsbCA/IHZvaWQgMCA6IF9hbm4kb3B0aW9uc18ubmFtZSkgIT0gbnVsbCA/IF9hbm4kb3B0aW9uc18kbmFtZSA6IG5hbWUudG9TdHJpbmcoKSwgbSwgKF9hbm4kb3B0aW9uc18kYXV0b0FjdCA9IChfYW5uJG9wdGlvbnNfMiA9IGFubi5vcHRpb25zXykgPT0gbnVsbCA/IHZvaWQgMCA6IF9hbm4kb3B0aW9uc18yLmF1dG9BY3Rpb24pICE9IG51bGwgPyBfYW5uJG9wdGlvbnNfJGF1dG9BY3QgOiBmYWxzZSk7XG4gIH07XG4gIC8vIEJhY2t3YXJkcy9MZWdhY3kgYmVoYXZpb3IsIGV4cGVjdHMgbWFrZU9ic2VydmFibGUodGhpcylcbiAgaWYgKGtpbmQgPT0gXCJmaWVsZFwiKSB7XG4gICAgYWRkSW5pdGlhbGl6ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgc3RvcmVBbm5vdGF0aW9uKHRoaXMsIG5hbWUsIGFubik7XG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChraW5kID09IFwibWV0aG9kXCIpIHtcbiAgICB2YXIgX3RoaXMkb3B0aW9uc18yO1xuICAgIGlmICghaXNBY3Rpb24obXRoZCkpIHtcbiAgICAgIG10aGQgPSBfY3JlYXRlQWN0aW9uKG10aGQpO1xuICAgIH1cbiAgICBpZiAoKF90aGlzJG9wdGlvbnNfMiA9IHRoaXMub3B0aW9uc18pICE9IG51bGwgJiYgX3RoaXMkb3B0aW9uc18yLmJvdW5kKSB7XG4gICAgICBhZGRJbml0aWFsaXplcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGJvdW5kID0gc2VsZltuYW1lXS5iaW5kKHNlbGYpO1xuICAgICAgICBib3VuZC5pc01vYnhBY3Rpb24gPSB0cnVlO1xuICAgICAgICBzZWxmW25hbWVdID0gYm91bmQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG10aGQ7XG4gIH1cbiAgZGllKFwiQ2Fubm90IGFwcGx5ICdcIiArIGFubi5hbm5vdGF0aW9uVHlwZV8gKyBcIicgdG8gJ1wiICsgU3RyaW5nKG5hbWUpICsgXCInIChraW5kOiBcIiArIGtpbmQgKyBcIik6XCIgKyAoXCJcXG4nXCIgKyBhbm4uYW5ub3RhdGlvblR5cGVfICsgXCInIGNhbiBvbmx5IGJlIHVzZWQgb24gcHJvcGVydGllcyB3aXRoIGEgZnVuY3Rpb24gdmFsdWUuXCIpKTtcbn1cbmZ1bmN0aW9uIGFzc2VydEFjdGlvbkRlc2NyaXB0b3IoYWRtLCBfcmVmLCBrZXksIF9yZWYyKSB7XG4gIHZhciBhbm5vdGF0aW9uVHlwZV8gPSBfcmVmLmFubm90YXRpb25UeXBlXztcbiAgdmFyIHZhbHVlID0gX3JlZjIudmFsdWU7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgZGllKFwiQ2Fubm90IGFwcGx5ICdcIiArIGFubm90YXRpb25UeXBlXyArIFwiJyB0byAnXCIgKyBhZG0ubmFtZV8gKyBcIi5cIiArIGtleS50b1N0cmluZygpICsgXCInOlwiICsgKFwiXFxuJ1wiICsgYW5ub3RhdGlvblR5cGVfICsgXCInIGNhbiBvbmx5IGJlIHVzZWQgb24gcHJvcGVydGllcyB3aXRoIGEgZnVuY3Rpb24gdmFsdWUuXCIpKTtcbiAgfVxufVxuZnVuY3Rpb24gY3JlYXRlQWN0aW9uRGVzY3JpcHRvcihhZG0sIGFubm90YXRpb24sIGtleSwgZGVzY3JpcHRvcixcbi8vIHByb3ZpZGVzIGFiaWxpdHkgdG8gZGlzYWJsZSBzYWZlRGVzY3JpcHRvcnMgZm9yIHByb3RvdHlwZXNcbnNhZmVEZXNjcmlwdG9ycykge1xuICB2YXIgX2Fubm90YXRpb24kb3B0aW9uc18sIF9hbm5vdGF0aW9uJG9wdGlvbnNfJCwgX2Fubm90YXRpb24kb3B0aW9uc18yLCBfYW5ub3RhdGlvbiRvcHRpb25zXyQyLCBfYW5ub3RhdGlvbiRvcHRpb25zXzMsIF9hbm5vdGF0aW9uJG9wdGlvbnNfNCwgX2FkbSRwcm94eV8yO1xuICBpZiAoc2FmZURlc2NyaXB0b3JzID09PSB2b2lkIDApIHtcbiAgICBzYWZlRGVzY3JpcHRvcnMgPSBnbG9iYWxTdGF0ZS5zYWZlRGVzY3JpcHRvcnM7XG4gIH1cbiAgYXNzZXJ0QWN0aW9uRGVzY3JpcHRvcihhZG0sIGFubm90YXRpb24sIGtleSwgZGVzY3JpcHRvcik7XG4gIHZhciB2YWx1ZSA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIGlmICgoX2Fubm90YXRpb24kb3B0aW9uc18gPSBhbm5vdGF0aW9uLm9wdGlvbnNfKSAhPSBudWxsICYmIF9hbm5vdGF0aW9uJG9wdGlvbnNfLmJvdW5kKSB7XG4gICAgdmFyIF9hZG0kcHJveHlfO1xuICAgIHZhbHVlID0gdmFsdWUuYmluZCgoX2FkbSRwcm94eV8gPSBhZG0ucHJveHlfKSAhPSBudWxsID8gX2FkbSRwcm94eV8gOiBhZG0udGFyZ2V0Xyk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB2YWx1ZTogY3JlYXRlQWN0aW9uKChfYW5ub3RhdGlvbiRvcHRpb25zXyQgPSAoX2Fubm90YXRpb24kb3B0aW9uc18yID0gYW5ub3RhdGlvbi5vcHRpb25zXykgPT0gbnVsbCA/IHZvaWQgMCA6IF9hbm5vdGF0aW9uJG9wdGlvbnNfMi5uYW1lKSAhPSBudWxsID8gX2Fubm90YXRpb24kb3B0aW9uc18kIDoga2V5LnRvU3RyaW5nKCksIHZhbHVlLCAoX2Fubm90YXRpb24kb3B0aW9uc18kMiA9IChfYW5ub3RhdGlvbiRvcHRpb25zXzMgPSBhbm5vdGF0aW9uLm9wdGlvbnNfKSA9PSBudWxsID8gdm9pZCAwIDogX2Fubm90YXRpb24kb3B0aW9uc18zLmF1dG9BY3Rpb24pICE9IG51bGwgPyBfYW5ub3RhdGlvbiRvcHRpb25zXyQyIDogZmFsc2UsXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vYnhqcy9tb2J4L2Rpc2N1c3Npb25zLzMxNDBcbiAgICAoX2Fubm90YXRpb24kb3B0aW9uc180ID0gYW5ub3RhdGlvbi5vcHRpb25zXykgIT0gbnVsbCAmJiBfYW5ub3RhdGlvbiRvcHRpb25zXzQuYm91bmQgPyAoX2FkbSRwcm94eV8yID0gYWRtLnByb3h5XykgIT0gbnVsbCA/IF9hZG0kcHJveHlfMiA6IGFkbS50YXJnZXRfIDogdW5kZWZpbmVkKSxcbiAgICAvLyBOb24tY29uZmlndXJhYmxlIGZvciBjbGFzc2VzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbCBmaWVsZCByZWRlZmluaXRpb24gaW4gc3ViY2xhc3NcbiAgICBjb25maWd1cmFibGU6IHNhZmVEZXNjcmlwdG9ycyA/IGFkbS5pc1BsYWluT2JqZWN0XyA6IHRydWUsXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vYnhqcy9tb2J4L3B1bGwvMjY0MSNpc3N1ZWNvbW1lbnQtNzM3MjkyMDU4XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgLy8gTm9uLW9ic2V2YWJsZSwgdGhlcmVmb3JlIG5vbi13cml0YWJsZVxuICAgIC8vIEFsc28gcHJldmVudHMgcmV3cml0aW5nIGluIHN1YmNsYXNzIGNvbnN0cnVjdG9yXG4gICAgd3JpdGFibGU6IHNhZmVEZXNjcmlwdG9ycyA/IGZhbHNlIDogdHJ1ZVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGbG93QW5ub3RhdGlvbihuYW1lLCBvcHRpb25zKSB7XG4gIHJldHVybiB7XG4gICAgYW5ub3RhdGlvblR5cGVfOiBuYW1lLFxuICAgIG9wdGlvbnNfOiBvcHRpb25zLFxuICAgIG1ha2VfOiBtYWtlXyQyLFxuICAgIGV4dGVuZF86IGV4dGVuZF8kMixcbiAgICBkZWNvcmF0ZV8yMDIyM186IGRlY29yYXRlXzIwMjIzXyQyXG4gIH07XG59XG5mdW5jdGlvbiBtYWtlXyQyKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBzb3VyY2UpIHtcbiAgdmFyIF90aGlzJG9wdGlvbnNfO1xuICAvLyBvd25cbiAgaWYgKHNvdXJjZSA9PT0gYWRtLnRhcmdldF8pIHtcbiAgICByZXR1cm4gdGhpcy5leHRlbmRfKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBmYWxzZSkgPT09IG51bGwgPyAwIC8qIE1ha2VSZXN1bHQuQ2FuY2VsICovIDogMiAvKiBNYWtlUmVzdWx0LkNvbnRpbnVlICovO1xuICB9XG4gIC8vIHByb3RvdHlwZVxuICAvLyBib3VuZCAtIG11c3QgYW5ub3RhdGUgcHJvdG9zIHRvIHN1cHBvcnQgc3VwZXIuZmxvdygpXG4gIGlmICgoX3RoaXMkb3B0aW9uc18gPSB0aGlzLm9wdGlvbnNfKSAhPSBudWxsICYmIF90aGlzJG9wdGlvbnNfLmJvdW5kICYmICghaGFzUHJvcChhZG0udGFyZ2V0Xywga2V5KSB8fCAhaXNGbG93KGFkbS50YXJnZXRfW2tleV0pKSkge1xuICAgIGlmICh0aGlzLmV4dGVuZF8oYWRtLCBrZXksIGRlc2NyaXB0b3IsIGZhbHNlKSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDAgLyogTWFrZVJlc3VsdC5DYW5jZWwgKi87XG4gICAgfVxuICB9XG5cbiAgaWYgKGlzRmxvdyhkZXNjcmlwdG9yLnZhbHVlKSkge1xuICAgIC8vIEEgcHJvdG90eXBlIGNvdWxkIGhhdmUgYmVlbiBhbm5vdGF0ZWQgYWxyZWFkeSBieSBvdGhlciBjb25zdHJ1Y3RvcixcbiAgICAvLyByZXN0IG9mIHRoZSBwcm90byBjaGFpbiBtdXN0IGJlIGFubm90YXRlZCBhbHJlYWR5XG4gICAgcmV0dXJuIDEgLyogTWFrZVJlc3VsdC5CcmVhayAqLztcbiAgfVxuXG4gIHZhciBmbG93RGVzY3JpcHRvciA9IGNyZWF0ZUZsb3dEZXNjcmlwdG9yKGFkbSwgdGhpcywga2V5LCBkZXNjcmlwdG9yLCBmYWxzZSwgZmFsc2UpO1xuICBkZWZpbmVQcm9wZXJ0eShzb3VyY2UsIGtleSwgZmxvd0Rlc2NyaXB0b3IpO1xuICByZXR1cm4gMiAvKiBNYWtlUmVzdWx0LkNvbnRpbnVlICovO1xufVxuXG5mdW5jdGlvbiBleHRlbmRfJDIoYWRtLCBrZXksIGRlc2NyaXB0b3IsIHByb3h5VHJhcCkge1xuICB2YXIgX3RoaXMkb3B0aW9uc18yO1xuICB2YXIgZmxvd0Rlc2NyaXB0b3IgPSBjcmVhdGVGbG93RGVzY3JpcHRvcihhZG0sIHRoaXMsIGtleSwgZGVzY3JpcHRvciwgKF90aGlzJG9wdGlvbnNfMiA9IHRoaXMub3B0aW9uc18pID09IG51bGwgPyB2b2lkIDAgOiBfdGhpcyRvcHRpb25zXzIuYm91bmQpO1xuICByZXR1cm4gYWRtLmRlZmluZVByb3BlcnR5XyhrZXksIGZsb3dEZXNjcmlwdG9yLCBwcm94eVRyYXApO1xufVxuZnVuY3Rpb24gZGVjb3JhdGVfMjAyMjNfJDIobXRoZCwgY29udGV4dCkge1xuICB2YXIgX3RoaXMkb3B0aW9uc18zO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgYXNzZXJ0MjAyMjNEZWNvcmF0b3JUeXBlKGNvbnRleHQsIFtcIm1ldGhvZFwiXSk7XG4gIH1cbiAgdmFyIG5hbWUgPSBjb250ZXh0Lm5hbWUsXG4gICAgYWRkSW5pdGlhbGl6ZXIgPSBjb250ZXh0LmFkZEluaXRpYWxpemVyO1xuICBpZiAoIWlzRmxvdyhtdGhkKSkge1xuICAgIG10aGQgPSBmbG93KG10aGQpO1xuICB9XG4gIGlmICgoX3RoaXMkb3B0aW9uc18zID0gdGhpcy5vcHRpb25zXykgIT0gbnVsbCAmJiBfdGhpcyRvcHRpb25zXzMuYm91bmQpIHtcbiAgICBhZGRJbml0aWFsaXplcihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgYm91bmQgPSBzZWxmW25hbWVdLmJpbmQoc2VsZik7XG4gICAgICBib3VuZC5pc01vYlhGbG93ID0gdHJ1ZTtcbiAgICAgIHNlbGZbbmFtZV0gPSBib3VuZDtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gbXRoZDtcbn1cbmZ1bmN0aW9uIGFzc2VydEZsb3dEZXNjcmlwdG9yKGFkbSwgX3JlZiwga2V5LCBfcmVmMikge1xuICB2YXIgYW5ub3RhdGlvblR5cGVfID0gX3JlZi5hbm5vdGF0aW9uVHlwZV87XG4gIHZhciB2YWx1ZSA9IF9yZWYyLnZhbHVlO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIGRpZShcIkNhbm5vdCBhcHBseSAnXCIgKyBhbm5vdGF0aW9uVHlwZV8gKyBcIicgdG8gJ1wiICsgYWRtLm5hbWVfICsgXCIuXCIgKyBrZXkudG9TdHJpbmcoKSArIFwiJzpcIiArIChcIlxcbidcIiArIGFubm90YXRpb25UeXBlXyArIFwiJyBjYW4gb25seSBiZSB1c2VkIG9uIHByb3BlcnRpZXMgd2l0aCBhIGdlbmVyYXRvciBmdW5jdGlvbiB2YWx1ZS5cIikpO1xuICB9XG59XG5mdW5jdGlvbiBjcmVhdGVGbG93RGVzY3JpcHRvcihhZG0sIGFubm90YXRpb24sIGtleSwgZGVzY3JpcHRvciwgYm91bmQsXG4vLyBwcm92aWRlcyBhYmlsaXR5IHRvIGRpc2FibGUgc2FmZURlc2NyaXB0b3JzIGZvciBwcm90b3R5cGVzXG5zYWZlRGVzY3JpcHRvcnMpIHtcbiAgaWYgKHNhZmVEZXNjcmlwdG9ycyA9PT0gdm9pZCAwKSB7XG4gICAgc2FmZURlc2NyaXB0b3JzID0gZ2xvYmFsU3RhdGUuc2FmZURlc2NyaXB0b3JzO1xuICB9XG4gIGFzc2VydEZsb3dEZXNjcmlwdG9yKGFkbSwgYW5ub3RhdGlvbiwga2V5LCBkZXNjcmlwdG9yKTtcbiAgdmFyIHZhbHVlID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgLy8gSW4gY2FzZSBvZiBmbG93LmJvdW5kLCB0aGUgZGVzY3JpcHRvciBjYW4gYmUgZnJvbSBhbHJlYWR5IGFubm90YXRlZCBwcm90b3R5cGVcbiAgaWYgKCFpc0Zsb3codmFsdWUpKSB7XG4gICAgdmFsdWUgPSBmbG93KHZhbHVlKTtcbiAgfVxuICBpZiAoYm91bmQpIHtcbiAgICB2YXIgX2FkbSRwcm94eV87XG4gICAgLy8gV2UgZG8gbm90IGtlZXAgb3JpZ2luYWwgZnVuY3Rpb24gYXJvdW5kLCBzbyB3ZSBiaW5kIHRoZSBleGlzdGluZyBmbG93XG4gICAgdmFsdWUgPSB2YWx1ZS5iaW5kKChfYWRtJHByb3h5XyA9IGFkbS5wcm94eV8pICE9IG51bGwgPyBfYWRtJHByb3h5XyA6IGFkbS50YXJnZXRfKTtcbiAgICAvLyBUaGlzIGlzIG5vcm1hbGx5IHNldCBieSBgZmxvd2AsIGJ1dCBgYmluZGAgcmV0dXJucyBuZXcgZnVuY3Rpb24uLi5cbiAgICB2YWx1ZS5pc01vYlhGbG93ID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAvLyBOb24tY29uZmlndXJhYmxlIGZvciBjbGFzc2VzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbCBmaWVsZCByZWRlZmluaXRpb24gaW4gc3ViY2xhc3NcbiAgICBjb25maWd1cmFibGU6IHNhZmVEZXNjcmlwdG9ycyA/IGFkbS5pc1BsYWluT2JqZWN0XyA6IHRydWUsXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vYnhqcy9tb2J4L3B1bGwvMjY0MSNpc3N1ZWNvbW1lbnQtNzM3MjkyMDU4XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgLy8gTm9uLW9ic2V2YWJsZSwgdGhlcmVmb3JlIG5vbi13cml0YWJsZVxuICAgIC8vIEFsc28gcHJldmVudHMgcmV3cml0aW5nIGluIHN1YmNsYXNzIGNvbnN0cnVjdG9yXG4gICAgd3JpdGFibGU6IHNhZmVEZXNjcmlwdG9ycyA/IGZhbHNlIDogdHJ1ZVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wdXRlZEFubm90YXRpb24obmFtZSwgb3B0aW9ucykge1xuICByZXR1cm4ge1xuICAgIGFubm90YXRpb25UeXBlXzogbmFtZSxcbiAgICBvcHRpb25zXzogb3B0aW9ucyxcbiAgICBtYWtlXzogbWFrZV8kMyxcbiAgICBleHRlbmRfOiBleHRlbmRfJDMsXG4gICAgZGVjb3JhdGVfMjAyMjNfOiBkZWNvcmF0ZV8yMDIyM18kM1xuICB9O1xufVxuZnVuY3Rpb24gbWFrZV8kMyhhZG0sIGtleSwgZGVzY3JpcHRvcikge1xuICByZXR1cm4gdGhpcy5leHRlbmRfKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBmYWxzZSkgPT09IG51bGwgPyAwIC8qIE1ha2VSZXN1bHQuQ2FuY2VsICovIDogMSAvKiBNYWtlUmVzdWx0LkJyZWFrICovO1xufVxuXG5mdW5jdGlvbiBleHRlbmRfJDMoYWRtLCBrZXksIGRlc2NyaXB0b3IsIHByb3h5VHJhcCkge1xuICBhc3NlcnRDb21wdXRlZERlc2NyaXB0b3IoYWRtLCB0aGlzLCBrZXksIGRlc2NyaXB0b3IpO1xuICByZXR1cm4gYWRtLmRlZmluZUNvbXB1dGVkUHJvcGVydHlfKGtleSwgX2V4dGVuZHMoe30sIHRoaXMub3B0aW9uc18sIHtcbiAgICBnZXQ6IGRlc2NyaXB0b3IuZ2V0LFxuICAgIHNldDogZGVzY3JpcHRvci5zZXRcbiAgfSksIHByb3h5VHJhcCk7XG59XG5mdW5jdGlvbiBkZWNvcmF0ZV8yMDIyM18kMyhnZXQsIGNvbnRleHQpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGFzc2VydDIwMjIzRGVjb3JhdG9yVHlwZShjb250ZXh0LCBbXCJnZXR0ZXJcIl0pO1xuICB9XG4gIHZhciBhbm4gPSB0aGlzO1xuICB2YXIga2V5ID0gY29udGV4dC5uYW1lLFxuICAgIGFkZEluaXRpYWxpemVyID0gY29udGV4dC5hZGRJbml0aWFsaXplcjtcbiAgYWRkSW5pdGlhbGl6ZXIoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhZG0gPSBhc09ic2VydmFibGVPYmplY3QodGhpcylbJG1vYnhdO1xuICAgIHZhciBvcHRpb25zID0gX2V4dGVuZHMoe30sIGFubi5vcHRpb25zXywge1xuICAgICAgZ2V0OiBnZXQsXG4gICAgICBjb250ZXh0OiB0aGlzXG4gICAgfSk7XG4gICAgb3B0aW9ucy5uYW1lIHx8IChvcHRpb25zLm5hbWUgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBhZG0ubmFtZV8gKyBcIi5cIiArIGtleS50b1N0cmluZygpIDogXCJPYnNlcnZhYmxlT2JqZWN0LlwiICsga2V5LnRvU3RyaW5nKCkpO1xuICAgIGFkbS52YWx1ZXNfLnNldChrZXksIG5ldyBDb21wdXRlZFZhbHVlKG9wdGlvbnMpKTtcbiAgfSk7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXNbJG1vYnhdLmdldE9ic2VydmFibGVQcm9wVmFsdWVfKGtleSk7XG4gIH07XG59XG5mdW5jdGlvbiBhc3NlcnRDb21wdXRlZERlc2NyaXB0b3IoYWRtLCBfcmVmLCBrZXksIF9yZWYyKSB7XG4gIHZhciBhbm5vdGF0aW9uVHlwZV8gPSBfcmVmLmFubm90YXRpb25UeXBlXztcbiAgdmFyIGdldCA9IF9yZWYyLmdldDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhZ2V0KSB7XG4gICAgZGllKFwiQ2Fubm90IGFwcGx5ICdcIiArIGFubm90YXRpb25UeXBlXyArIFwiJyB0byAnXCIgKyBhZG0ubmFtZV8gKyBcIi5cIiArIGtleS50b1N0cmluZygpICsgXCInOlwiICsgKFwiXFxuJ1wiICsgYW5ub3RhdGlvblR5cGVfICsgXCInIGNhbiBvbmx5IGJlIHVzZWQgb24gZ2V0dGVyKCtzZXR0ZXIpIHByb3BlcnRpZXMuXCIpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVPYnNlcnZhYmxlQW5ub3RhdGlvbihuYW1lLCBvcHRpb25zKSB7XG4gIHJldHVybiB7XG4gICAgYW5ub3RhdGlvblR5cGVfOiBuYW1lLFxuICAgIG9wdGlvbnNfOiBvcHRpb25zLFxuICAgIG1ha2VfOiBtYWtlXyQ0LFxuICAgIGV4dGVuZF86IGV4dGVuZF8kNCxcbiAgICBkZWNvcmF0ZV8yMDIyM186IGRlY29yYXRlXzIwMjIzXyQ0XG4gIH07XG59XG5mdW5jdGlvbiBtYWtlXyQ0KGFkbSwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIHJldHVybiB0aGlzLmV4dGVuZF8oYWRtLCBrZXksIGRlc2NyaXB0b3IsIGZhbHNlKSA9PT0gbnVsbCA/IDAgLyogTWFrZVJlc3VsdC5DYW5jZWwgKi8gOiAxIC8qIE1ha2VSZXN1bHQuQnJlYWsgKi87XG59XG5cbmZ1bmN0aW9uIGV4dGVuZF8kNChhZG0sIGtleSwgZGVzY3JpcHRvciwgcHJveHlUcmFwKSB7XG4gIHZhciBfdGhpcyRvcHRpb25zXyRlbmhhbmMsIF90aGlzJG9wdGlvbnNfO1xuICBhc3NlcnRPYnNlcnZhYmxlRGVzY3JpcHRvcihhZG0sIHRoaXMsIGtleSwgZGVzY3JpcHRvcik7XG4gIHJldHVybiBhZG0uZGVmaW5lT2JzZXJ2YWJsZVByb3BlcnR5XyhrZXksIGRlc2NyaXB0b3IudmFsdWUsIChfdGhpcyRvcHRpb25zXyRlbmhhbmMgPSAoX3RoaXMkb3B0aW9uc18gPSB0aGlzLm9wdGlvbnNfKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMkb3B0aW9uc18uZW5oYW5jZXIpICE9IG51bGwgPyBfdGhpcyRvcHRpb25zXyRlbmhhbmMgOiBkZWVwRW5oYW5jZXIsIHByb3h5VHJhcCk7XG59XG5mdW5jdGlvbiBkZWNvcmF0ZV8yMDIyM18kNChkZXNjLCBjb250ZXh0KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAoY29udGV4dC5raW5kID09PSBcImZpZWxkXCIpIHtcbiAgICAgIHRocm93IGRpZShcIlBsZWFzZSB1c2UgYEBvYnNlcnZhYmxlIGFjY2Vzc29yIFwiICsgU3RyaW5nKGNvbnRleHQubmFtZSkgKyBcImAgaW5zdGVhZCBvZiBgQG9ic2VydmFibGUgXCIgKyBTdHJpbmcoY29udGV4dC5uYW1lKSArIFwiYFwiKTtcbiAgICB9XG4gICAgYXNzZXJ0MjAyMjNEZWNvcmF0b3JUeXBlKGNvbnRleHQsIFtcImFjY2Vzc29yXCJdKTtcbiAgfVxuICB2YXIgYW5uID0gdGhpcztcbiAgdmFyIGtpbmQgPSBjb250ZXh0LmtpbmQsXG4gICAgbmFtZSA9IGNvbnRleHQubmFtZTtcbiAgLy8gVGhlIGxhemluZXNzIGhlcmUgaXMgbm90IGlkZWFsLi4uIEl0J3MgYSB3b3JrYXJvdW5kIHRvIGhvdyAyMDIyLjMgRGVjb3JhdG9ycyBhcmUgaW1wbGVtZW50ZWQ6XG4gIC8vICAgYGFkZEluaXRpYWxpemVyYCBjYWxsYmFja3MgYXJlIGV4ZWN1dGVkIF9iZWZvcmVfIGFueSBhY2Nlc3NvcnMgYXJlIGRlZmluZWQgKGluc3RlYWQgb2YgdGhlIGlkZWFsLWZvci11cyByaWdodCBhZnRlciBlYWNoKS5cbiAgLy8gICBUaGlzIG1lYW5zIHRoYXQsIGlmIHdlIHdlcmUgdG8gZG8gb3VyIHN0dWZmIGluIGFuIGBhZGRJbml0aWFsaXplcmAsIHdlJ2QgYXR0ZW1wdCB0byByZWFkIGEgcHJpdmF0ZSBzbG90XG4gIC8vICAgYmVmb3JlIGl0IGhhcyBiZWVuIGluaXRpYWxpemVkLiBUaGUgcnVudGltZSBkb2Vzbid0IGxpa2UgdGhhdCBhbmQgdGhyb3dzIGEgYENhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyXG4gIC8vICAgZnJvbSBhbiBvYmplY3Qgd2hvc2UgY2xhc3MgZGlkIG5vdCBkZWNsYXJlIGl0YCBlcnJvci5cbiAgLy8gVE9ETzogaXQgc2VlbXMgdGhhdCB0aGlzIHdpbGwgbm90IGJlIHJlcXVpcmVkIGFueW1vcmUgaW4gdGhlIGZpbmFsIHZlcnNpb24gb2YgdGhlIHNwZWNcbiAgLy8gU2VlIFRPRE86IGxpbmtcbiAgdmFyIGluaXRpYWxpemVkT2JqZWN0cyA9IG5ldyBXZWFrU2V0KCk7XG4gIGZ1bmN0aW9uIGluaXRpYWxpemVPYnNlcnZhYmxlKHRhcmdldCwgdmFsdWUpIHtcbiAgICB2YXIgX2FubiRvcHRpb25zXyRlbmhhbmNlLCBfYW5uJG9wdGlvbnNfO1xuICAgIHZhciBhZG0gPSBhc09ic2VydmFibGVPYmplY3QodGFyZ2V0KVskbW9ieF07XG4gICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZVZhbHVlKHZhbHVlLCAoX2FubiRvcHRpb25zXyRlbmhhbmNlID0gKF9hbm4kb3B0aW9uc18gPSBhbm4ub3B0aW9uc18pID09IG51bGwgPyB2b2lkIDAgOiBfYW5uJG9wdGlvbnNfLmVuaGFuY2VyKSAhPSBudWxsID8gX2FubiRvcHRpb25zXyRlbmhhbmNlIDogZGVlcEVuaGFuY2VyLCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBhZG0ubmFtZV8gKyBcIi5cIiArIG5hbWUudG9TdHJpbmcoKSA6IFwiT2JzZXJ2YWJsZU9iamVjdC5cIiArIG5hbWUudG9TdHJpbmcoKSwgZmFsc2UpO1xuICAgIGFkbS52YWx1ZXNfLnNldChuYW1lLCBvYnNlcnZhYmxlKTtcbiAgICBpbml0aWFsaXplZE9iamVjdHMuYWRkKHRhcmdldCk7XG4gIH1cbiAgaWYgKGtpbmQgPT0gXCJhY2Nlc3NvclwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICBpZiAoIWluaXRpYWxpemVkT2JqZWN0cy5oYXModGhpcykpIHtcbiAgICAgICAgICBpbml0aWFsaXplT2JzZXJ2YWJsZSh0aGlzLCBkZXNjLmdldC5jYWxsKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1skbW9ieF0uZ2V0T2JzZXJ2YWJsZVByb3BWYWx1ZV8obmFtZSk7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgICAgaWYgKCFpbml0aWFsaXplZE9iamVjdHMuaGFzKHRoaXMpKSB7XG4gICAgICAgICAgaW5pdGlhbGl6ZU9ic2VydmFibGUodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzWyRtb2J4XS5zZXRPYnNlcnZhYmxlUHJvcFZhbHVlXyhuYW1lLCB2YWx1ZSk7XG4gICAgICB9LFxuICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCh2YWx1ZSkge1xuICAgICAgICBpZiAoIWluaXRpYWxpemVkT2JqZWN0cy5oYXModGhpcykpIHtcbiAgICAgICAgICBpbml0aWFsaXplT2JzZXJ2YWJsZSh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgcmV0dXJuO1xufVxuZnVuY3Rpb24gYXNzZXJ0T2JzZXJ2YWJsZURlc2NyaXB0b3IoYWRtLCBfcmVmLCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgdmFyIGFubm90YXRpb25UeXBlXyA9IF9yZWYuYW5ub3RhdGlvblR5cGVfO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICEoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpKSB7XG4gICAgZGllKFwiQ2Fubm90IGFwcGx5ICdcIiArIGFubm90YXRpb25UeXBlXyArIFwiJyB0byAnXCIgKyBhZG0ubmFtZV8gKyBcIi5cIiArIGtleS50b1N0cmluZygpICsgXCInOlwiICsgKFwiXFxuJ1wiICsgYW5ub3RhdGlvblR5cGVfICsgXCInIGNhbm5vdCBiZSB1c2VkIG9uIGdldHRlci9zZXR0ZXIgcHJvcGVydGllc1wiKSk7XG4gIH1cbn1cblxudmFyIEFVVE8gPSBcInRydWVcIjtcbnZhciBhdXRvQW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVBdXRvQW5ub3RhdGlvbigpO1xuZnVuY3Rpb24gY3JlYXRlQXV0b0Fubm90YXRpb24ob3B0aW9ucykge1xuICByZXR1cm4ge1xuICAgIGFubm90YXRpb25UeXBlXzogQVVUTyxcbiAgICBvcHRpb25zXzogb3B0aW9ucyxcbiAgICBtYWtlXzogbWFrZV8kNSxcbiAgICBleHRlbmRfOiBleHRlbmRfJDUsXG4gICAgZGVjb3JhdGVfMjAyMjNfOiBkZWNvcmF0ZV8yMDIyM18kNVxuICB9O1xufVxuZnVuY3Rpb24gbWFrZV8kNShhZG0sIGtleSwgZGVzY3JpcHRvciwgc291cmNlKSB7XG4gIHZhciBfdGhpcyRvcHRpb25zXzMsIF90aGlzJG9wdGlvbnNfNDtcbiAgLy8gZ2V0dGVyIC0+IGNvbXB1dGVkXG4gIGlmIChkZXNjcmlwdG9yLmdldCkge1xuICAgIHJldHVybiBjb21wdXRlZC5tYWtlXyhhZG0sIGtleSwgZGVzY3JpcHRvciwgc291cmNlKTtcbiAgfVxuICAvLyBsb25lIHNldHRlciAtPiBhY3Rpb24gc2V0dGVyXG4gIGlmIChkZXNjcmlwdG9yLnNldCkge1xuICAgIC8vIFRPRE8gbWFrZSBhY3Rpb24gYXBwbGljYWJsZSB0byBzZXR0ZXIgYW5kIGRlbGVnYXRlIHRvIGFjdGlvbi5tYWtlX1xuICAgIHZhciBzZXQgPSBjcmVhdGVBY3Rpb24oa2V5LnRvU3RyaW5nKCksIGRlc2NyaXB0b3Iuc2V0KTtcbiAgICAvLyBvd25cbiAgICBpZiAoc291cmNlID09PSBhZG0udGFyZ2V0Xykge1xuICAgICAgcmV0dXJuIGFkbS5kZWZpbmVQcm9wZXJ0eV8oa2V5LCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZ2xvYmFsU3RhdGUuc2FmZURlc2NyaXB0b3JzID8gYWRtLmlzUGxhaW5PYmplY3RfIDogdHJ1ZSxcbiAgICAgICAgc2V0OiBzZXRcbiAgICAgIH0pID09PSBudWxsID8gMCAvKiBNYWtlUmVzdWx0LkNhbmNlbCAqLyA6IDIgLyogTWFrZVJlc3VsdC5Db250aW51ZSAqLztcbiAgICB9XG4gICAgLy8gcHJvdG9cbiAgICBkZWZpbmVQcm9wZXJ0eShzb3VyY2UsIGtleSwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgc2V0OiBzZXRcbiAgICB9KTtcbiAgICByZXR1cm4gMiAvKiBNYWtlUmVzdWx0LkNvbnRpbnVlICovO1xuICB9XG4gIC8vIGZ1bmN0aW9uIG9uIHByb3RvIC0+IGF1dG9BY3Rpb24vZmxvd1xuICBpZiAoc291cmNlICE9PSBhZG0udGFyZ2V0XyAmJiB0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIF90aGlzJG9wdGlvbnNfMjtcbiAgICBpZiAoaXNHZW5lcmF0b3IoZGVzY3JpcHRvci52YWx1ZSkpIHtcbiAgICAgIHZhciBfdGhpcyRvcHRpb25zXztcbiAgICAgIHZhciBmbG93QW5ub3RhdGlvbiA9IChfdGhpcyRvcHRpb25zXyA9IHRoaXMub3B0aW9uc18pICE9IG51bGwgJiYgX3RoaXMkb3B0aW9uc18uYXV0b0JpbmQgPyBmbG93LmJvdW5kIDogZmxvdztcbiAgICAgIHJldHVybiBmbG93QW5ub3RhdGlvbi5tYWtlXyhhZG0sIGtleSwgZGVzY3JpcHRvciwgc291cmNlKTtcbiAgICB9XG4gICAgdmFyIGFjdGlvbkFubm90YXRpb24gPSAoX3RoaXMkb3B0aW9uc18yID0gdGhpcy5vcHRpb25zXykgIT0gbnVsbCAmJiBfdGhpcyRvcHRpb25zXzIuYXV0b0JpbmQgPyBhdXRvQWN0aW9uLmJvdW5kIDogYXV0b0FjdGlvbjtcbiAgICByZXR1cm4gYWN0aW9uQW5ub3RhdGlvbi5tYWtlXyhhZG0sIGtleSwgZGVzY3JpcHRvciwgc291cmNlKTtcbiAgfVxuICAvLyBvdGhlciAtPiBvYnNlcnZhYmxlXG4gIC8vIENvcHkgcHJvcHMgZnJvbSBwcm90byBhcyB3ZWxsLCBzZWUgdGVzdDpcbiAgLy8gXCJkZWNvcmF0ZSBzaG91bGQgd29yayB3aXRoIE9iamVjdC5jcmVhdGVcIlxuICB2YXIgb2JzZXJ2YWJsZUFubm90YXRpb24gPSAoKF90aGlzJG9wdGlvbnNfMyA9IHRoaXMub3B0aW9uc18pID09IG51bGwgPyB2b2lkIDAgOiBfdGhpcyRvcHRpb25zXzMuZGVlcCkgPT09IGZhbHNlID8gb2JzZXJ2YWJsZS5yZWYgOiBvYnNlcnZhYmxlO1xuICAvLyBpZiBmdW5jdGlvbiByZXNwZWN0IGF1dG9CaW5kIG9wdGlvblxuICBpZiAodHlwZW9mIGRlc2NyaXB0b3IudmFsdWUgPT09IFwiZnVuY3Rpb25cIiAmJiAoX3RoaXMkb3B0aW9uc180ID0gdGhpcy5vcHRpb25zXykgIT0gbnVsbCAmJiBfdGhpcyRvcHRpb25zXzQuYXV0b0JpbmQpIHtcbiAgICB2YXIgX2FkbSRwcm94eV87XG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IGRlc2NyaXB0b3IudmFsdWUuYmluZCgoX2FkbSRwcm94eV8gPSBhZG0ucHJveHlfKSAhPSBudWxsID8gX2FkbSRwcm94eV8gOiBhZG0udGFyZ2V0Xyk7XG4gIH1cbiAgcmV0dXJuIG9ic2VydmFibGVBbm5vdGF0aW9uLm1ha2VfKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBzb3VyY2UpO1xufVxuZnVuY3Rpb24gZXh0ZW5kXyQ1KGFkbSwga2V5LCBkZXNjcmlwdG9yLCBwcm94eVRyYXApIHtcbiAgdmFyIF90aGlzJG9wdGlvbnNfNSwgX3RoaXMkb3B0aW9uc182O1xuICAvLyBnZXR0ZXIgLT4gY29tcHV0ZWRcbiAgaWYgKGRlc2NyaXB0b3IuZ2V0KSB7XG4gICAgcmV0dXJuIGNvbXB1dGVkLmV4dGVuZF8oYWRtLCBrZXksIGRlc2NyaXB0b3IsIHByb3h5VHJhcCk7XG4gIH1cbiAgLy8gbG9uZSBzZXR0ZXIgLT4gYWN0aW9uIHNldHRlclxuICBpZiAoZGVzY3JpcHRvci5zZXQpIHtcbiAgICAvLyBUT0RPIG1ha2UgYWN0aW9uIGFwcGxpY2FibGUgdG8gc2V0dGVyIGFuZCBkZWxlZ2F0ZSB0byBhY3Rpb24uZXh0ZW5kX1xuICAgIHJldHVybiBhZG0uZGVmaW5lUHJvcGVydHlfKGtleSwge1xuICAgICAgY29uZmlndXJhYmxlOiBnbG9iYWxTdGF0ZS5zYWZlRGVzY3JpcHRvcnMgPyBhZG0uaXNQbGFpbk9iamVjdF8gOiB0cnVlLFxuICAgICAgc2V0OiBjcmVhdGVBY3Rpb24oa2V5LnRvU3RyaW5nKCksIGRlc2NyaXB0b3Iuc2V0KVxuICAgIH0sIHByb3h5VHJhcCk7XG4gIH1cbiAgLy8gb3RoZXIgLT4gb2JzZXJ2YWJsZVxuICAvLyBpZiBmdW5jdGlvbiByZXNwZWN0IGF1dG9CaW5kIG9wdGlvblxuICBpZiAodHlwZW9mIGRlc2NyaXB0b3IudmFsdWUgPT09IFwiZnVuY3Rpb25cIiAmJiAoX3RoaXMkb3B0aW9uc181ID0gdGhpcy5vcHRpb25zXykgIT0gbnVsbCAmJiBfdGhpcyRvcHRpb25zXzUuYXV0b0JpbmQpIHtcbiAgICB2YXIgX2FkbSRwcm94eV8yO1xuICAgIGRlc2NyaXB0b3IudmFsdWUgPSBkZXNjcmlwdG9yLnZhbHVlLmJpbmQoKF9hZG0kcHJveHlfMiA9IGFkbS5wcm94eV8pICE9IG51bGwgPyBfYWRtJHByb3h5XzIgOiBhZG0udGFyZ2V0Xyk7XG4gIH1cbiAgdmFyIG9ic2VydmFibGVBbm5vdGF0aW9uID0gKChfdGhpcyRvcHRpb25zXzYgPSB0aGlzLm9wdGlvbnNfKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMkb3B0aW9uc182LmRlZXApID09PSBmYWxzZSA/IG9ic2VydmFibGUucmVmIDogb2JzZXJ2YWJsZTtcbiAgcmV0dXJuIG9ic2VydmFibGVBbm5vdGF0aW9uLmV4dGVuZF8oYWRtLCBrZXksIGRlc2NyaXB0b3IsIHByb3h5VHJhcCk7XG59XG5mdW5jdGlvbiBkZWNvcmF0ZV8yMDIyM18kNShkZXNjLCBjb250ZXh0KSB7XG4gIGRpZShcIidcIiArIHRoaXMuYW5ub3RhdGlvblR5cGVfICsgXCInIGNhbm5vdCBiZSB1c2VkIGFzIGEgZGVjb3JhdG9yXCIpO1xufVxuXG52YXIgT0JTRVJWQUJMRSA9IFwib2JzZXJ2YWJsZVwiO1xudmFyIE9CU0VSVkFCTEVfUkVGID0gXCJvYnNlcnZhYmxlLnJlZlwiO1xudmFyIE9CU0VSVkFCTEVfU0hBTExPVyA9IFwib2JzZXJ2YWJsZS5zaGFsbG93XCI7XG52YXIgT0JTRVJWQUJMRV9TVFJVQ1QgPSBcIm9ic2VydmFibGUuc3RydWN0XCI7XG4vLyBQcmVkZWZpbmVkIGJhZ3Mgb2YgY3JlYXRlIG9ic2VydmFibGUgb3B0aW9ucywgdG8gYXZvaWQgYWxsb2NhdGluZyB0ZW1wb3JhcmlseSBvcHRpb24gb2JqZWN0c1xuLy8gaW4gdGhlIG1ham9yaXR5IG9mIGNhc2VzXG52YXIgZGVmYXVsdENyZWF0ZU9ic2VydmFibGVPcHRpb25zID0ge1xuICBkZWVwOiB0cnVlLFxuICBuYW1lOiB1bmRlZmluZWQsXG4gIGRlZmF1bHREZWNvcmF0b3I6IHVuZGVmaW5lZCxcbiAgcHJveHk6IHRydWVcbn07XG5PYmplY3QuZnJlZXplKGRlZmF1bHRDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyk7XG5mdW5jdGlvbiBhc0NyZWF0ZU9ic2VydmFibGVPcHRpb25zKHRoaW5nKSB7XG4gIHJldHVybiB0aGluZyB8fCBkZWZhdWx0Q3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnM7XG59XG52YXIgb2JzZXJ2YWJsZUFubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlT2JzZXJ2YWJsZUFubm90YXRpb24oT0JTRVJWQUJMRSk7XG52YXIgb2JzZXJ2YWJsZVJlZkFubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlT2JzZXJ2YWJsZUFubm90YXRpb24oT0JTRVJWQUJMRV9SRUYsIHtcbiAgZW5oYW5jZXI6IHJlZmVyZW5jZUVuaGFuY2VyXG59KTtcbnZhciBvYnNlcnZhYmxlU2hhbGxvd0Fubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlT2JzZXJ2YWJsZUFubm90YXRpb24oT0JTRVJWQUJMRV9TSEFMTE9XLCB7XG4gIGVuaGFuY2VyOiBzaGFsbG93RW5oYW5jZXJcbn0pO1xudmFyIG9ic2VydmFibGVTdHJ1Y3RBbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZU9ic2VydmFibGVBbm5vdGF0aW9uKE9CU0VSVkFCTEVfU1RSVUNULCB7XG4gIGVuaGFuY2VyOiByZWZTdHJ1Y3RFbmhhbmNlclxufSk7XG52YXIgb2JzZXJ2YWJsZURlY29yYXRvckFubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlRGVjb3JhdG9yQW5ub3RhdGlvbihvYnNlcnZhYmxlQW5ub3RhdGlvbik7XG5mdW5jdGlvbiBnZXRFbmhhbmNlckZyb21PcHRpb25zKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG9wdGlvbnMuZGVlcCA9PT0gdHJ1ZSA/IGRlZXBFbmhhbmNlciA6IG9wdGlvbnMuZGVlcCA9PT0gZmFsc2UgPyByZWZlcmVuY2VFbmhhbmNlciA6IGdldEVuaGFuY2VyRnJvbUFubm90YXRpb24ob3B0aW9ucy5kZWZhdWx0RGVjb3JhdG9yKTtcbn1cbmZ1bmN0aW9uIGdldEFubm90YXRpb25Gcm9tT3B0aW9ucyhvcHRpb25zKSB7XG4gIHZhciBfb3B0aW9ucyRkZWZhdWx0RGVjb3I7XG4gIHJldHVybiBvcHRpb25zID8gKF9vcHRpb25zJGRlZmF1bHREZWNvciA9IG9wdGlvbnMuZGVmYXVsdERlY29yYXRvcikgIT0gbnVsbCA/IF9vcHRpb25zJGRlZmF1bHREZWNvciA6IGNyZWF0ZUF1dG9Bbm5vdGF0aW9uKG9wdGlvbnMpIDogdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gZ2V0RW5oYW5jZXJGcm9tQW5ub3RhdGlvbihhbm5vdGF0aW9uKSB7XG4gIHZhciBfYW5ub3RhdGlvbiRvcHRpb25zXyQsIF9hbm5vdGF0aW9uJG9wdGlvbnNfO1xuICByZXR1cm4gIWFubm90YXRpb24gPyBkZWVwRW5oYW5jZXIgOiAoX2Fubm90YXRpb24kb3B0aW9uc18kID0gKF9hbm5vdGF0aW9uJG9wdGlvbnNfID0gYW5ub3RhdGlvbi5vcHRpb25zXykgPT0gbnVsbCA/IHZvaWQgMCA6IF9hbm5vdGF0aW9uJG9wdGlvbnNfLmVuaGFuY2VyKSAhPSBudWxsID8gX2Fubm90YXRpb24kb3B0aW9uc18kIDogZGVlcEVuaGFuY2VyO1xufVxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3QsIGFycmF5IG9yIGZ1bmN0aW9uIGludG8gYSByZWFjdGl2ZSBzdHJ1Y3R1cmUuXG4gKiBAcGFyYW0gdiB0aGUgdmFsdWUgd2hpY2ggc2hvdWxkIGJlY29tZSBvYnNlcnZhYmxlLlxuICovXG5mdW5jdGlvbiBjcmVhdGVPYnNlcnZhYmxlKHYsIGFyZzIsIGFyZzMpIHtcbiAgLy8gQG9ic2VydmFibGUgc29tZVByb3A7ICgyMDIyLjMgRGVjb3JhdG9ycylcbiAgaWYgKGlzMjAyMjNEZWNvcmF0b3IoYXJnMikpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZUFubm90YXRpb24uZGVjb3JhdGVfMjAyMjNfKHYsIGFyZzIpO1xuICB9XG4gIC8vIEBvYnNlcnZhYmxlIHNvbWVQcm9wO1xuICBpZiAoaXNTdHJpbmdpc2goYXJnMikpIHtcbiAgICBzdG9yZUFubm90YXRpb24odiwgYXJnMiwgb2JzZXJ2YWJsZUFubm90YXRpb24pO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBhbHJlYWR5IG9ic2VydmFibGUgLSBpZ25vcmVcbiAgaWYgKGlzT2JzZXJ2YWJsZSh2KSkge1xuICAgIHJldHVybiB2O1xuICB9XG4gIC8vIHBsYWluIG9iamVjdFxuICBpZiAoaXNQbGFpbk9iamVjdCh2KSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlLm9iamVjdCh2LCBhcmcyLCBhcmczKTtcbiAgfVxuICAvLyBBcnJheVxuICBpZiAoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlLmFycmF5KHYsIGFyZzIpO1xuICB9XG4gIC8vIE1hcFxuICBpZiAoaXNFUzZNYXAodikpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5tYXAodiwgYXJnMik7XG4gIH1cbiAgLy8gU2V0XG4gIGlmIChpc0VTNlNldCh2KSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlLnNldCh2LCBhcmcyKTtcbiAgfVxuICAvLyBvdGhlciBvYmplY3QgLSBpZ25vcmVcbiAgaWYgKHR5cGVvZiB2ID09PSBcIm9iamVjdFwiICYmIHYgIT09IG51bGwpIHtcbiAgICByZXR1cm4gdjtcbiAgfVxuICAvLyBhbnl0aGluZyBlbHNlXG4gIHJldHVybiBvYnNlcnZhYmxlLmJveCh2LCBhcmcyKTtcbn1cbmFzc2lnbihjcmVhdGVPYnNlcnZhYmxlLCBvYnNlcnZhYmxlRGVjb3JhdG9yQW5ub3RhdGlvbik7XG52YXIgb2JzZXJ2YWJsZUZhY3RvcmllcyA9IHtcbiAgYm94OiBmdW5jdGlvbiBib3godmFsdWUsIG9wdGlvbnMpIHtcbiAgICB2YXIgbyA9IGFzQ3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlVmFsdWUodmFsdWUsIGdldEVuaGFuY2VyRnJvbU9wdGlvbnMobyksIG8ubmFtZSwgdHJ1ZSwgby5lcXVhbHMpO1xuICB9LFxuICBhcnJheTogZnVuY3Rpb24gYXJyYXkoaW5pdGlhbFZhbHVlcywgb3B0aW9ucykge1xuICAgIHZhciBvID0gYXNDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyhvcHRpb25zKTtcbiAgICByZXR1cm4gKGdsb2JhbFN0YXRlLnVzZVByb3hpZXMgPT09IGZhbHNlIHx8IG8ucHJveHkgPT09IGZhbHNlID8gY3JlYXRlTGVnYWN5QXJyYXkgOiBjcmVhdGVPYnNlcnZhYmxlQXJyYXkpKGluaXRpYWxWYWx1ZXMsIGdldEVuaGFuY2VyRnJvbU9wdGlvbnMobyksIG8ubmFtZSk7XG4gIH0sXG4gIG1hcDogZnVuY3Rpb24gbWFwKGluaXRpYWxWYWx1ZXMsIG9wdGlvbnMpIHtcbiAgICB2YXIgbyA9IGFzQ3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlTWFwKGluaXRpYWxWYWx1ZXMsIGdldEVuaGFuY2VyRnJvbU9wdGlvbnMobyksIG8ubmFtZSk7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gc2V0KGluaXRpYWxWYWx1ZXMsIG9wdGlvbnMpIHtcbiAgICB2YXIgbyA9IGFzQ3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlU2V0KGluaXRpYWxWYWx1ZXMsIGdldEVuaGFuY2VyRnJvbU9wdGlvbnMobyksIG8ubmFtZSk7XG4gIH0sXG4gIG9iamVjdDogZnVuY3Rpb24gb2JqZWN0KHByb3BzLCBkZWNvcmF0b3JzLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGluaXRPYnNlcnZhYmxlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBleHRlbmRPYnNlcnZhYmxlKGdsb2JhbFN0YXRlLnVzZVByb3hpZXMgPT09IGZhbHNlIHx8IChvcHRpb25zID09IG51bGwgPyB2b2lkIDAgOiBvcHRpb25zLnByb3h5KSA9PT0gZmFsc2UgPyBhc09ic2VydmFibGVPYmplY3Qoe30sIG9wdGlvbnMpIDogYXNEeW5hbWljT2JzZXJ2YWJsZU9iamVjdCh7fSwgb3B0aW9ucyksIHByb3BzLCBkZWNvcmF0b3JzKTtcbiAgICB9KTtcbiAgfSxcbiAgcmVmOiAvKiNfX1BVUkVfXyovY3JlYXRlRGVjb3JhdG9yQW5ub3RhdGlvbihvYnNlcnZhYmxlUmVmQW5ub3RhdGlvbiksXG4gIHNoYWxsb3c6IC8qI19fUFVSRV9fKi9jcmVhdGVEZWNvcmF0b3JBbm5vdGF0aW9uKG9ic2VydmFibGVTaGFsbG93QW5ub3RhdGlvbiksXG4gIGRlZXA6IG9ic2VydmFibGVEZWNvcmF0b3JBbm5vdGF0aW9uLFxuICBzdHJ1Y3Q6IC8qI19fUFVSRV9fKi9jcmVhdGVEZWNvcmF0b3JBbm5vdGF0aW9uKG9ic2VydmFibGVTdHJ1Y3RBbm5vdGF0aW9uKVxufTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxudmFyIG9ic2VydmFibGUgPSAvKiNfX1BVUkVfXyovYXNzaWduKGNyZWF0ZU9ic2VydmFibGUsIG9ic2VydmFibGVGYWN0b3JpZXMpO1xuXG52YXIgQ09NUFVURUQgPSBcImNvbXB1dGVkXCI7XG52YXIgQ09NUFVURURfU1RSVUNUID0gXCJjb21wdXRlZC5zdHJ1Y3RcIjtcbnZhciBjb21wdXRlZEFubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlQ29tcHV0ZWRBbm5vdGF0aW9uKENPTVBVVEVEKTtcbnZhciBjb21wdXRlZFN0cnVjdEFubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlQ29tcHV0ZWRBbm5vdGF0aW9uKENPTVBVVEVEX1NUUlVDVCwge1xuICBlcXVhbHM6IGNvbXBhcmVyLnN0cnVjdHVyYWxcbn0pO1xuLyoqXG4gKiBEZWNvcmF0b3IgZm9yIGNsYXNzIHByb3BlcnRpZXM6IEBjb21wdXRlZCBnZXQgdmFsdWUoKSB7IHJldHVybiBleHByOyB9LlxuICogRm9yIGxlZ2FjeSBwdXJwb3NlcyBhbHNvIGludm9rYWJsZSBhcyBFUzUgb2JzZXJ2YWJsZSBjcmVhdGVkOiBgY29tcHV0ZWQoKCkgPT4gZXhwcilgO1xuICovXG52YXIgY29tcHV0ZWQgPSBmdW5jdGlvbiBjb21wdXRlZChhcmcxLCBhcmcyKSB7XG4gIGlmIChpczIwMjIzRGVjb3JhdG9yKGFyZzIpKSB7XG4gICAgLy8gQGNvbXB1dGVkICgyMDIyLjMgRGVjb3JhdG9ycylcbiAgICByZXR1cm4gY29tcHV0ZWRBbm5vdGF0aW9uLmRlY29yYXRlXzIwMjIzXyhhcmcxLCBhcmcyKTtcbiAgfVxuICBpZiAoaXNTdHJpbmdpc2goYXJnMikpIHtcbiAgICAvLyBAY29tcHV0ZWRcbiAgICByZXR1cm4gc3RvcmVBbm5vdGF0aW9uKGFyZzEsIGFyZzIsIGNvbXB1dGVkQW5ub3RhdGlvbik7XG4gIH1cbiAgaWYgKGlzUGxhaW5PYmplY3QoYXJnMSkpIHtcbiAgICAvLyBAY29tcHV0ZWQoeyBvcHRpb25zIH0pXG4gICAgcmV0dXJuIGNyZWF0ZURlY29yYXRvckFubm90YXRpb24oY3JlYXRlQ29tcHV0ZWRBbm5vdGF0aW9uKENPTVBVVEVELCBhcmcxKSk7XG4gIH1cbiAgLy8gY29tcHV0ZWQoZXhwciwgb3B0aW9ucz8pXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAoIWlzRnVuY3Rpb24oYXJnMSkpIHtcbiAgICAgIGRpZShcIkZpcnN0IGFyZ3VtZW50IHRvIGBjb21wdXRlZGAgc2hvdWxkIGJlIGFuIGV4cHJlc3Npb24uXCIpO1xuICAgIH1cbiAgICBpZiAoaXNGdW5jdGlvbihhcmcyKSkge1xuICAgICAgZGllKFwiQSBzZXR0ZXIgYXMgc2Vjb25kIGFyZ3VtZW50IGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQsIHVzZSBgeyBzZXQ6IGZuIH1gIG9wdGlvbiBpbnN0ZWFkXCIpO1xuICAgIH1cbiAgfVxuICB2YXIgb3B0cyA9IGlzUGxhaW5PYmplY3QoYXJnMikgPyBhcmcyIDoge307XG4gIG9wdHMuZ2V0ID0gYXJnMTtcbiAgb3B0cy5uYW1lIHx8IChvcHRzLm5hbWUgPSBhcmcxLm5hbWUgfHwgXCJcIik7IC8qIGZvciBnZW5lcmF0ZWQgbmFtZSAqL1xuICByZXR1cm4gbmV3IENvbXB1dGVkVmFsdWUob3B0cyk7XG59O1xuT2JqZWN0LmFzc2lnbihjb21wdXRlZCwgY29tcHV0ZWRBbm5vdGF0aW9uKTtcbmNvbXB1dGVkLnN0cnVjdCA9IC8qI19fUFVSRV9fKi9jcmVhdGVEZWNvcmF0b3JBbm5vdGF0aW9uKGNvbXB1dGVkU3RydWN0QW5ub3RhdGlvbik7XG5cbnZhciBfZ2V0RGVzY3JpcHRvciRjb25maWcsIF9nZXREZXNjcmlwdG9yO1xuLy8gd2UgZG9uJ3QgdXNlIGdsb2JhbFN0YXRlIGZvciB0aGVzZSBpbiBvcmRlciB0byBhdm9pZCBwb3NzaWJsZSBpc3N1ZXMgd2l0aCBtdWx0aXBsZVxuLy8gbW9ieCB2ZXJzaW9uc1xudmFyIGN1cnJlbnRBY3Rpb25JZCA9IDA7XG52YXIgbmV4dEFjdGlvbklkID0gMTtcbnZhciBpc0Z1bmN0aW9uTmFtZUNvbmZpZ3VyYWJsZSA9IChfZ2V0RGVzY3JpcHRvciRjb25maWcgPSAoX2dldERlc2NyaXB0b3IgPSAvKiNfX1BVUkVfXyovZ2V0RGVzY3JpcHRvcihmdW5jdGlvbiAoKSB7fSwgXCJuYW1lXCIpKSA9PSBudWxsID8gdm9pZCAwIDogX2dldERlc2NyaXB0b3IuY29uZmlndXJhYmxlKSAhPSBudWxsID8gX2dldERlc2NyaXB0b3IkY29uZmlnIDogZmFsc2U7XG4vLyB3ZSBjYW4gc2FmZWx5IHJlY3ljbGUgdGhpcyBvYmplY3RcbnZhciB0bXBOYW1lRGVzY3JpcHRvciA9IHtcbiAgdmFsdWU6IFwiYWN0aW9uXCIsXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgd3JpdGFibGU6IGZhbHNlLFxuICBlbnVtZXJhYmxlOiBmYWxzZVxufTtcbmZ1bmN0aW9uIGNyZWF0ZUFjdGlvbihhY3Rpb25OYW1lLCBmbiwgYXV0b0FjdGlvbiwgcmVmKSB7XG4gIGlmIChhdXRvQWN0aW9uID09PSB2b2lkIDApIHtcbiAgICBhdXRvQWN0aW9uID0gZmFsc2U7XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGlmICghaXNGdW5jdGlvbihmbikpIHtcbiAgICAgIGRpZShcImBhY3Rpb25gIGNhbiBvbmx5IGJlIGludm9rZWQgb24gZnVuY3Rpb25zXCIpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGFjdGlvbk5hbWUgIT09IFwic3RyaW5nXCIgfHwgIWFjdGlvbk5hbWUpIHtcbiAgICAgIGRpZShcImFjdGlvbnMgc2hvdWxkIGhhdmUgdmFsaWQgbmFtZXMsIGdvdDogJ1wiICsgYWN0aW9uTmFtZSArIFwiJ1wiKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcmVzKCkge1xuICAgIHJldHVybiBleGVjdXRlQWN0aW9uKGFjdGlvbk5hbWUsIGF1dG9BY3Rpb24sIGZuLCByZWYgfHwgdGhpcywgYXJndW1lbnRzKTtcbiAgfVxuICByZXMuaXNNb2J4QWN0aW9uID0gdHJ1ZTtcbiAgcmVzLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmbi50b1N0cmluZygpO1xuICB9O1xuICBpZiAoaXNGdW5jdGlvbk5hbWVDb25maWd1cmFibGUpIHtcbiAgICB0bXBOYW1lRGVzY3JpcHRvci52YWx1ZSA9IGFjdGlvbk5hbWU7XG4gICAgZGVmaW5lUHJvcGVydHkocmVzLCBcIm5hbWVcIiwgdG1wTmFtZURlc2NyaXB0b3IpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBleGVjdXRlQWN0aW9uKGFjdGlvbk5hbWUsIGNhblJ1bkFzRGVyaXZhdGlvbiwgZm4sIHNjb3BlLCBhcmdzKSB7XG4gIHZhciBydW5JbmZvID0gX3N0YXJ0QWN0aW9uKGFjdGlvbk5hbWUsIGNhblJ1bkFzRGVyaXZhdGlvbiwgc2NvcGUsIGFyZ3MpO1xuICB0cnkge1xuICAgIHJldHVybiBmbi5hcHBseShzY29wZSwgYXJncyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJ1bkluZm8uZXJyb3JfID0gZXJyO1xuICAgIHRocm93IGVycjtcbiAgfSBmaW5hbGx5IHtcbiAgICBfZW5kQWN0aW9uKHJ1bkluZm8pO1xuICB9XG59XG5mdW5jdGlvbiBfc3RhcnRBY3Rpb24oYWN0aW9uTmFtZSwgY2FuUnVuQXNEZXJpdmF0aW9uLFxuLy8gdHJ1ZSBmb3IgYXV0b0FjdGlvblxuc2NvcGUsIGFyZ3MpIHtcbiAgdmFyIG5vdGlmeVNweV8gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgaXNTcHlFbmFibGVkKCkgJiYgISFhY3Rpb25OYW1lO1xuICB2YXIgc3RhcnRUaW1lXyA9IDA7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5Xykge1xuICAgIHN0YXJ0VGltZV8gPSBEYXRlLm5vdygpO1xuICAgIHZhciBmbGF0dGVuZWRBcmdzID0gYXJncyA/IEFycmF5LmZyb20oYXJncykgOiBFTVBUWV9BUlJBWTtcbiAgICBzcHlSZXBvcnRTdGFydCh7XG4gICAgICB0eXBlOiBBQ1RJT04sXG4gICAgICBuYW1lOiBhY3Rpb25OYW1lLFxuICAgICAgb2JqZWN0OiBzY29wZSxcbiAgICAgIGFyZ3VtZW50czogZmxhdHRlbmVkQXJnc1xuICAgIH0pO1xuICB9XG4gIHZhciBwcmV2RGVyaXZhdGlvbl8gPSBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb247XG4gIHZhciBydW5Bc0FjdGlvbiA9ICFjYW5SdW5Bc0Rlcml2YXRpb24gfHwgIXByZXZEZXJpdmF0aW9uXztcbiAgc3RhcnRCYXRjaCgpO1xuICB2YXIgcHJldkFsbG93U3RhdGVDaGFuZ2VzXyA9IGdsb2JhbFN0YXRlLmFsbG93U3RhdGVDaGFuZ2VzOyAvLyBieSBkZWZhdWx0IHByZXNlcnZlIHByZXZpb3VzIGFsbG93XG4gIGlmIChydW5Bc0FjdGlvbikge1xuICAgIHVudHJhY2tlZFN0YXJ0KCk7XG4gICAgcHJldkFsbG93U3RhdGVDaGFuZ2VzXyA9IGFsbG93U3RhdGVDaGFuZ2VzU3RhcnQodHJ1ZSk7XG4gIH1cbiAgdmFyIHByZXZBbGxvd1N0YXRlUmVhZHNfID0gYWxsb3dTdGF0ZVJlYWRzU3RhcnQodHJ1ZSk7XG4gIHZhciBydW5JbmZvID0ge1xuICAgIHJ1bkFzQWN0aW9uXzogcnVuQXNBY3Rpb24sXG4gICAgcHJldkRlcml2YXRpb25fOiBwcmV2RGVyaXZhdGlvbl8sXG4gICAgcHJldkFsbG93U3RhdGVDaGFuZ2VzXzogcHJldkFsbG93U3RhdGVDaGFuZ2VzXyxcbiAgICBwcmV2QWxsb3dTdGF0ZVJlYWRzXzogcHJldkFsbG93U3RhdGVSZWFkc18sXG4gICAgbm90aWZ5U3B5Xzogbm90aWZ5U3B5XyxcbiAgICBzdGFydFRpbWVfOiBzdGFydFRpbWVfLFxuICAgIGFjdGlvbklkXzogbmV4dEFjdGlvbklkKyssXG4gICAgcGFyZW50QWN0aW9uSWRfOiBjdXJyZW50QWN0aW9uSWRcbiAgfTtcbiAgY3VycmVudEFjdGlvbklkID0gcnVuSW5mby5hY3Rpb25JZF87XG4gIHJldHVybiBydW5JbmZvO1xufVxuZnVuY3Rpb24gX2VuZEFjdGlvbihydW5JbmZvKSB7XG4gIGlmIChjdXJyZW50QWN0aW9uSWQgIT09IHJ1bkluZm8uYWN0aW9uSWRfKSB7XG4gICAgZGllKDMwKTtcbiAgfVxuICBjdXJyZW50QWN0aW9uSWQgPSBydW5JbmZvLnBhcmVudEFjdGlvbklkXztcbiAgaWYgKHJ1bkluZm8uZXJyb3JfICE9PSB1bmRlZmluZWQpIHtcbiAgICBnbG9iYWxTdGF0ZS5zdXBwcmVzc1JlYWN0aW9uRXJyb3JzID0gdHJ1ZTtcbiAgfVxuICBhbGxvd1N0YXRlQ2hhbmdlc0VuZChydW5JbmZvLnByZXZBbGxvd1N0YXRlQ2hhbmdlc18pO1xuICBhbGxvd1N0YXRlUmVhZHNFbmQocnVuSW5mby5wcmV2QWxsb3dTdGF0ZVJlYWRzXyk7XG4gIGVuZEJhdGNoKCk7XG4gIGlmIChydW5JbmZvLnJ1bkFzQWN0aW9uXykge1xuICAgIHVudHJhY2tlZEVuZChydW5JbmZvLnByZXZEZXJpdmF0aW9uXyk7XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBydW5JbmZvLm5vdGlmeVNweV8pIHtcbiAgICBzcHlSZXBvcnRFbmQoe1xuICAgICAgdGltZTogRGF0ZS5ub3coKSAtIHJ1bkluZm8uc3RhcnRUaW1lX1xuICAgIH0pO1xuICB9XG4gIGdsb2JhbFN0YXRlLnN1cHByZXNzUmVhY3Rpb25FcnJvcnMgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIGFsbG93U3RhdGVDaGFuZ2VzKGFsbG93U3RhdGVDaGFuZ2VzLCBmdW5jKSB7XG4gIHZhciBwcmV2ID0gYWxsb3dTdGF0ZUNoYW5nZXNTdGFydChhbGxvd1N0YXRlQ2hhbmdlcyk7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZ1bmMoKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBhbGxvd1N0YXRlQ2hhbmdlc0VuZChwcmV2KTtcbiAgfVxufVxuZnVuY3Rpb24gYWxsb3dTdGF0ZUNoYW5nZXNTdGFydChhbGxvd1N0YXRlQ2hhbmdlcykge1xuICB2YXIgcHJldiA9IGdsb2JhbFN0YXRlLmFsbG93U3RhdGVDaGFuZ2VzO1xuICBnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlQ2hhbmdlcyA9IGFsbG93U3RhdGVDaGFuZ2VzO1xuICByZXR1cm4gcHJldjtcbn1cbmZ1bmN0aW9uIGFsbG93U3RhdGVDaGFuZ2VzRW5kKHByZXYpIHtcbiAgZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZUNoYW5nZXMgPSBwcmV2O1xufVxuXG52YXIgX1N5bWJvbCR0b1ByaW1pdGl2ZTtcbnZhciBDUkVBVEUgPSBcImNyZWF0ZVwiO1xuX1N5bWJvbCR0b1ByaW1pdGl2ZSA9IFN5bWJvbC50b1ByaW1pdGl2ZTtcbnZhciBPYnNlcnZhYmxlVmFsdWUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9BdG9tKSB7XG4gIF9pbmhlcml0c0xvb3NlKE9ic2VydmFibGVWYWx1ZSwgX0F0b20pO1xuICBmdW5jdGlvbiBPYnNlcnZhYmxlVmFsdWUodmFsdWUsIGVuaGFuY2VyLCBuYW1lXywgbm90aWZ5U3B5LCBlcXVhbHMpIHtcbiAgICB2YXIgX3RoaXM7XG4gICAgaWYgKG5hbWVfID09PSB2b2lkIDApIHtcbiAgICAgIG5hbWVfID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJPYnNlcnZhYmxlVmFsdWVAXCIgKyBnZXROZXh0SWQoKSA6IFwiT2JzZXJ2YWJsZVZhbHVlXCI7XG4gICAgfVxuICAgIGlmIChub3RpZnlTcHkgPT09IHZvaWQgMCkge1xuICAgICAgbm90aWZ5U3B5ID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGVxdWFscyA9PT0gdm9pZCAwKSB7XG4gICAgICBlcXVhbHMgPSBjb21wYXJlcltcImRlZmF1bHRcIl07XG4gICAgfVxuICAgIF90aGlzID0gX0F0b20uY2FsbCh0aGlzLCBuYW1lXykgfHwgdGhpcztcbiAgICBfdGhpcy5lbmhhbmNlciA9IHZvaWQgMDtcbiAgICBfdGhpcy5uYW1lXyA9IHZvaWQgMDtcbiAgICBfdGhpcy5lcXVhbHMgPSB2b2lkIDA7XG4gICAgX3RoaXMuaGFzVW5yZXBvcnRlZENoYW5nZV8gPSBmYWxzZTtcbiAgICBfdGhpcy5pbnRlcmNlcHRvcnNfID0gdm9pZCAwO1xuICAgIF90aGlzLmNoYW5nZUxpc3RlbmVyc18gPSB2b2lkIDA7XG4gICAgX3RoaXMudmFsdWVfID0gdm9pZCAwO1xuICAgIF90aGlzLmRlaGFuY2VyID0gdm9pZCAwO1xuICAgIF90aGlzLmVuaGFuY2VyID0gZW5oYW5jZXI7XG4gICAgX3RoaXMubmFtZV8gPSBuYW1lXztcbiAgICBfdGhpcy5lcXVhbHMgPSBlcXVhbHM7XG4gICAgX3RoaXMudmFsdWVfID0gZW5oYW5jZXIodmFsdWUsIHVuZGVmaW5lZCwgbmFtZV8pO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5ICYmIGlzU3B5RW5hYmxlZCgpKSB7XG4gICAgICAvLyBvbmx5IG5vdGlmeSBzcHkgaWYgdGhpcyBpcyBhIHN0YW5kLWFsb25lIG9ic2VydmFibGVcbiAgICAgIHNweVJlcG9ydCh7XG4gICAgICAgIHR5cGU6IENSRUFURSxcbiAgICAgICAgb2JqZWN0OiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSxcbiAgICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwidmFsdWVcIixcbiAgICAgICAgZGVidWdPYmplY3ROYW1lOiBfdGhpcy5uYW1lXyxcbiAgICAgICAgbmV3VmFsdWU6IFwiXCIgKyBfdGhpcy52YWx1ZV9cbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgdmFyIF9wcm90byA9IE9ic2VydmFibGVWYWx1ZS5wcm90b3R5cGU7XG4gIF9wcm90by5kZWhhbmNlVmFsdWUgPSBmdW5jdGlvbiBkZWhhbmNlVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodGhpcy5kZWhhbmNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWhhbmNlcih2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbiAgX3Byb3RvLnNldCA9IGZ1bmN0aW9uIHNldChuZXdWYWx1ZSkge1xuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWVfO1xuICAgIG5ld1ZhbHVlID0gdGhpcy5wcmVwYXJlTmV3VmFsdWVfKG5ld1ZhbHVlKTtcbiAgICBpZiAobmV3VmFsdWUgIT09IGdsb2JhbFN0YXRlLlVOQ0hBTkdFRCkge1xuICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCgpO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgICAgc3B5UmVwb3J0U3RhcnQoe1xuICAgICAgICAgIHR5cGU6IFVQREFURSxcbiAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwidmFsdWVcIixcbiAgICAgICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMubmFtZV8sXG4gICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0TmV3VmFsdWVfKG5ld1ZhbHVlKTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnByZXBhcmVOZXdWYWx1ZV8gPSBmdW5jdGlvbiBwcmVwYXJlTmV3VmFsdWVfKG5ld1ZhbHVlKSB7XG4gICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQodGhpcyk7XG4gICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgdHlwZTogVVBEQVRFLFxuICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgIH0pO1xuICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbFN0YXRlLlVOQ0hBTkdFRDtcbiAgICAgIH1cbiAgICAgIG5ld1ZhbHVlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgIH1cbiAgICAvLyBhcHBseSBtb2RpZmllclxuICAgIG5ld1ZhbHVlID0gdGhpcy5lbmhhbmNlcihuZXdWYWx1ZSwgdGhpcy52YWx1ZV8sIHRoaXMubmFtZV8pO1xuICAgIHJldHVybiB0aGlzLmVxdWFscyh0aGlzLnZhbHVlXywgbmV3VmFsdWUpID8gZ2xvYmFsU3RhdGUuVU5DSEFOR0VEIDogbmV3VmFsdWU7XG4gIH07XG4gIF9wcm90by5zZXROZXdWYWx1ZV8gPSBmdW5jdGlvbiBzZXROZXdWYWx1ZV8obmV3VmFsdWUpIHtcbiAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlXztcbiAgICB0aGlzLnZhbHVlXyA9IG5ld1ZhbHVlO1xuICAgIHRoaXMucmVwb3J0Q2hhbmdlZCgpO1xuICAgIGlmIChoYXNMaXN0ZW5lcnModGhpcykpIHtcbiAgICAgIG5vdGlmeUxpc3RlbmVycyh0aGlzLCB7XG4gICAgICAgIHR5cGU6IFVQREFURSxcbiAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWUsXG4gICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIHRoaXMucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICByZXR1cm4gdGhpcy5kZWhhbmNlVmFsdWUodGhpcy52YWx1ZV8pO1xuICB9O1xuICBfcHJvdG8uaW50ZXJjZXB0XyA9IGZ1bmN0aW9uIGludGVyY2VwdF8oaGFuZGxlcikge1xuICAgIHJldHVybiByZWdpc3RlckludGVyY2VwdG9yKHRoaXMsIGhhbmRsZXIpO1xuICB9O1xuICBfcHJvdG8ub2JzZXJ2ZV8gPSBmdW5jdGlvbiBvYnNlcnZlXyhsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgaWYgKGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgbGlzdGVuZXIoe1xuICAgICAgICBvYnNlcnZhYmxlS2luZDogXCJ2YWx1ZVwiLFxuICAgICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMubmFtZV8sXG4gICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgdHlwZTogVVBEQVRFLFxuICAgICAgICBuZXdWYWx1ZTogdGhpcy52YWx1ZV8sXG4gICAgICAgIG9sZFZhbHVlOiB1bmRlZmluZWRcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJMaXN0ZW5lcih0aGlzLCBsaXN0ZW5lcik7XG4gIH07XG4gIF9wcm90by5yYXcgPSBmdW5jdGlvbiByYXcoKSB7XG4gICAgLy8gdXNlZCBieSBNU1Qgb3QgZ2V0IHVuZGVoYW5jZWQgdmFsdWVcbiAgICByZXR1cm4gdGhpcy52YWx1ZV87XG4gIH07XG4gIF9wcm90by50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCk7XG4gIH07XG4gIF9wcm90by50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWVfICsgXCJbXCIgKyB0aGlzLnZhbHVlXyArIFwiXVwiO1xuICB9O1xuICBfcHJvdG8udmFsdWVPZiA9IGZ1bmN0aW9uIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHRvUHJpbWl0aXZlKHRoaXMuZ2V0KCkpO1xuICB9O1xuICBfcHJvdG9bX1N5bWJvbCR0b1ByaW1pdGl2ZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVPZigpO1xuICB9O1xuICByZXR1cm4gT2JzZXJ2YWJsZVZhbHVlO1xufShBdG9tKTtcbnZhciBpc09ic2VydmFibGVWYWx1ZSA9IC8qI19fUFVSRV9fKi9jcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlKFwiT2JzZXJ2YWJsZVZhbHVlXCIsIE9ic2VydmFibGVWYWx1ZSk7XG5cbnZhciBfU3ltYm9sJHRvUHJpbWl0aXZlJDE7XG4vKipcbiAqIEEgbm9kZSBpbiB0aGUgc3RhdGUgZGVwZW5kZW5jeSByb290IHRoYXQgb2JzZXJ2ZXMgb3RoZXIgbm9kZXMsIGFuZCBjYW4gYmUgb2JzZXJ2ZWQgaXRzZWxmLlxuICpcbiAqIENvbXB1dGVkVmFsdWUgd2lsbCByZW1lbWJlciB0aGUgcmVzdWx0IG9mIHRoZSBjb21wdXRhdGlvbiBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoZSBiYXRjaCwgb3JcbiAqIHdoaWxlIGJlaW5nIG9ic2VydmVkLlxuICpcbiAqIER1cmluZyB0aGlzIHRpbWUgaXQgd2lsbCByZWNvbXB1dGUgb25seSB3aGVuIG9uZSBvZiBpdHMgZGlyZWN0IGRlcGVuZGVuY2llcyBjaGFuZ2VkLFxuICogYnV0IG9ubHkgd2hlbiBpdCBpcyBiZWluZyBhY2Nlc3NlZCB3aXRoIGBDb21wdXRlZFZhbHVlLmdldCgpYC5cbiAqXG4gKiBJbXBsZW1lbnRhdGlvbiBkZXNjcmlwdGlvbjpcbiAqIDEuIEZpcnN0IHRpbWUgaXQncyBiZWluZyBhY2Nlc3NlZCBpdCB3aWxsIGNvbXB1dGUgYW5kIHJlbWVtYmVyIHJlc3VsdFxuICogICAgZ2l2ZSBiYWNrIHJlbWVtYmVyZWQgcmVzdWx0IHVudGlsIDIuIGhhcHBlbnNcbiAqIDIuIEZpcnN0IHRpbWUgYW55IGRlZXAgZGVwZW5kZW5jeSBjaGFuZ2UsIHByb3BhZ2F0ZSBQT1NTSUJMWV9TVEFMRSB0byBhbGwgb2JzZXJ2ZXJzLCB3YWl0IGZvciAzLlxuICogMy4gV2hlbiBpdCdzIGJlaW5nIGFjY2Vzc2VkLCByZWNvbXB1dGUgaWYgYW55IHNoYWxsb3cgZGVwZW5kZW5jeSBjaGFuZ2VkLlxuICogICAgaWYgcmVzdWx0IGNoYW5nZWQ6IHByb3BhZ2F0ZSBTVEFMRSB0byBhbGwgb2JzZXJ2ZXJzLCB0aGF0IHdlcmUgUE9TU0lCTFlfU1RBTEUgZnJvbSB0aGUgbGFzdCBzdGVwLlxuICogICAgZ28gdG8gc3RlcCAyLiBlaXRoZXIgd2F5XG4gKlxuICogSWYgYXQgYW55IHBvaW50IGl0J3Mgb3V0c2lkZSBiYXRjaCBhbmQgaXQgaXNuJ3Qgb2JzZXJ2ZWQ6IHJlc2V0IGV2ZXJ5dGhpbmcgYW5kIGdvIHRvIDEuXG4gKi9cbl9TeW1ib2wkdG9QcmltaXRpdmUkMSA9IFN5bWJvbC50b1ByaW1pdGl2ZTtcbnZhciBDb21wdXRlZFZhbHVlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLy8gbm9kZXMgd2UgYXJlIGxvb2tpbmcgYXQuIE91ciB2YWx1ZSBkZXBlbmRzIG9uIHRoZXNlIG5vZGVzXG4gIC8vIGR1cmluZyB0cmFja2luZyBpdCdzIGFuIGFycmF5IHdpdGggbmV3IG9ic2VydmVkIG9ic2VydmVyc1xuXG4gIC8vIHRvIGNoZWNrIGZvciBjeWNsZXNcblxuICAvLyBOLkI6IHVubWluaWZpZWQgYXMgaXQgaXMgdXNlZCBieSBNU1RcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGNvbXB1dGVkIHZhbHVlIGJhc2VkIG9uIGEgZnVuY3Rpb24gZXhwcmVzc2lvbi5cbiAgICpcbiAgICogVGhlIGBuYW1lYCBwcm9wZXJ0eSBpcyBmb3IgZGVidWcgcHVycG9zZXMgb25seS5cbiAgICpcbiAgICogVGhlIGBlcXVhbHNgIHByb3BlcnR5IHNwZWNpZmllcyB0aGUgY29tcGFyZXIgZnVuY3Rpb24gdG8gdXNlIHRvIGRldGVybWluZSBpZiBhIG5ld2x5IHByb2R1Y2VkXG4gICAqIHZhbHVlIGRpZmZlcnMgZnJvbSB0aGUgcHJldmlvdXMgdmFsdWUuIFR3byBjb21wYXJlcnMgYXJlIHByb3ZpZGVkIGluIHRoZSBsaWJyYXJ5OyBgZGVmYXVsdENvbXBhcmVyYFxuICAgKiBjb21wYXJlcyBiYXNlZCBvbiBpZGVudGl0eSBjb21wYXJpc29uICg9PT0pLCBhbmQgYHN0cnVjdHVyYWxDb21wYXJlcmAgZGVlcGx5IGNvbXBhcmVzIHRoZSBzdHJ1Y3R1cmUuXG4gICAqIFN0cnVjdHVyYWwgY29tcGFyaXNvbiBjYW4gYmUgY29udmVuaWVudCBpZiB5b3UgYWx3YXlzIHByb2R1Y2UgYSBuZXcgYWdncmVnYXRlZCBvYmplY3QgYW5kXG4gICAqIGRvbid0IHdhbnQgdG8gbm90aWZ5IG9ic2VydmVycyBpZiBpdCBpcyBzdHJ1Y3R1cmFsbHkgdGhlIHNhbWUuXG4gICAqIFRoaXMgaXMgdXNlZnVsIGZvciB3b3JraW5nIHdpdGggdmVjdG9ycywgbW91c2UgY29vcmRpbmF0ZXMgZXRjLlxuICAgKi9cbiAgZnVuY3Rpb24gQ29tcHV0ZWRWYWx1ZShvcHRpb25zKSB7XG4gICAgdGhpcy5kZXBlbmRlbmNpZXNTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5OT1RfVFJBQ0tJTkdfO1xuICAgIHRoaXMub2JzZXJ2aW5nXyA9IFtdO1xuICAgIHRoaXMubmV3T2JzZXJ2aW5nXyA9IG51bGw7XG4gICAgdGhpcy5pc0JlaW5nT2JzZXJ2ZWRfID0gZmFsc2U7XG4gICAgdGhpcy5pc1BlbmRpbmdVbm9ic2VydmF0aW9uXyA9IGZhbHNlO1xuICAgIHRoaXMub2JzZXJ2ZXJzXyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLmRpZmZWYWx1ZV8gPSAwO1xuICAgIHRoaXMucnVuSWRfID0gMDtcbiAgICB0aGlzLmxhc3RBY2Nlc3NlZEJ5XyA9IDA7XG4gICAgdGhpcy5sb3dlc3RPYnNlcnZlclN0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLlVQX1RPX0RBVEVfO1xuICAgIHRoaXMudW5ib3VuZERlcHNDb3VudF8gPSAwO1xuICAgIHRoaXMudmFsdWVfID0gbmV3IENhdWdodEV4Y2VwdGlvbihudWxsKTtcbiAgICB0aGlzLm5hbWVfID0gdm9pZCAwO1xuICAgIHRoaXMudHJpZ2dlcmVkQnlfID0gdm9pZCAwO1xuICAgIHRoaXMuaXNDb21wdXRpbmdfID0gZmFsc2U7XG4gICAgdGhpcy5pc1J1bm5pbmdTZXR0ZXJfID0gZmFsc2U7XG4gICAgdGhpcy5kZXJpdmF0aW9uID0gdm9pZCAwO1xuICAgIHRoaXMuc2V0dGVyXyA9IHZvaWQgMDtcbiAgICB0aGlzLmlzVHJhY2luZ18gPSBUcmFjZU1vZGUuTk9ORTtcbiAgICB0aGlzLnNjb3BlXyA9IHZvaWQgMDtcbiAgICB0aGlzLmVxdWFsc18gPSB2b2lkIDA7XG4gICAgdGhpcy5yZXF1aXJlc1JlYWN0aW9uXyA9IHZvaWQgMDtcbiAgICB0aGlzLmtlZXBBbGl2ZV8gPSB2b2lkIDA7XG4gICAgdGhpcy5vbkJPTCA9IHZvaWQgMDtcbiAgICB0aGlzLm9uQlVPTCA9IHZvaWQgMDtcbiAgICBpZiAoIW9wdGlvbnMuZ2V0KSB7XG4gICAgICBkaWUoMzEpO1xuICAgIH1cbiAgICB0aGlzLmRlcml2YXRpb24gPSBvcHRpb25zLmdldDtcbiAgICB0aGlzLm5hbWVfID0gb3B0aW9ucy5uYW1lIHx8IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcIkNvbXB1dGVkVmFsdWVAXCIgKyBnZXROZXh0SWQoKSA6IFwiQ29tcHV0ZWRWYWx1ZVwiKTtcbiAgICBpZiAob3B0aW9ucy5zZXQpIHtcbiAgICAgIHRoaXMuc2V0dGVyXyA9IGNyZWF0ZUFjdGlvbihwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB0aGlzLm5hbWVfICsgXCItc2V0dGVyXCIgOiBcIkNvbXB1dGVkVmFsdWUtc2V0dGVyXCIsIG9wdGlvbnMuc2V0KTtcbiAgICB9XG4gICAgdGhpcy5lcXVhbHNfID0gb3B0aW9ucy5lcXVhbHMgfHwgKG9wdGlvbnMuY29tcGFyZVN0cnVjdHVyYWwgfHwgb3B0aW9ucy5zdHJ1Y3QgPyBjb21wYXJlci5zdHJ1Y3R1cmFsIDogY29tcGFyZXJbXCJkZWZhdWx0XCJdKTtcbiAgICB0aGlzLnNjb3BlXyA9IG9wdGlvbnMuY29udGV4dDtcbiAgICB0aGlzLnJlcXVpcmVzUmVhY3Rpb25fID0gb3B0aW9ucy5yZXF1aXJlc1JlYWN0aW9uO1xuICAgIHRoaXMua2VlcEFsaXZlXyA9ICEhb3B0aW9ucy5rZWVwQWxpdmU7XG4gIH1cbiAgdmFyIF9wcm90byA9IENvbXB1dGVkVmFsdWUucHJvdG90eXBlO1xuICBfcHJvdG8ub25CZWNvbWVTdGFsZV8gPSBmdW5jdGlvbiBvbkJlY29tZVN0YWxlXygpIHtcbiAgICBwcm9wYWdhdGVNYXliZUNoYW5nZWQodGhpcyk7XG4gIH07XG4gIF9wcm90by5vbkJPID0gZnVuY3Rpb24gb25CTygpIHtcbiAgICBpZiAodGhpcy5vbkJPTCkge1xuICAgICAgdGhpcy5vbkJPTC5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gbGlzdGVuZXIoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLm9uQlVPID0gZnVuY3Rpb24gb25CVU8oKSB7XG4gICAgaWYgKHRoaXMub25CVU9MKSB7XG4gICAgICB0aGlzLm9uQlVPTC5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gbGlzdGVuZXIoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGlzIGNvbXB1dGVkIHZhbHVlLlxuICAgKiBXaWxsIGV2YWx1YXRlIGl0cyBjb21wdXRhdGlvbiBmaXJzdCBpZiBuZWVkZWQuXG4gICAqLztcbiAgX3Byb3RvLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICBpZiAodGhpcy5pc0NvbXB1dGluZ18pIHtcbiAgICAgIGRpZSgzMiwgdGhpcy5uYW1lXywgdGhpcy5kZXJpdmF0aW9uKTtcbiAgICB9XG4gICAgaWYgKGdsb2JhbFN0YXRlLmluQmF0Y2ggPT09IDAgJiZcbiAgICAvLyAhZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0cGlvbiAmJlxuICAgIHRoaXMub2JzZXJ2ZXJzXy5zaXplID09PSAwICYmICF0aGlzLmtlZXBBbGl2ZV8pIHtcbiAgICAgIGlmIChzaG91bGRDb21wdXRlKHRoaXMpKSB7XG4gICAgICAgIHRoaXMud2FybkFib3V0VW50cmFja2VkUmVhZF8oKTtcbiAgICAgICAgc3RhcnRCYXRjaCgpOyAvLyBTZWUgcGVyZiB0ZXN0ICdjb21wdXRlZCBtZW1vaXphdGlvbidcbiAgICAgICAgdGhpcy52YWx1ZV8gPSB0aGlzLmNvbXB1dGVWYWx1ZV8oZmFsc2UpO1xuICAgICAgICBlbmRCYXRjaCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXBvcnRPYnNlcnZlZCh0aGlzKTtcbiAgICAgIGlmIChzaG91bGRDb21wdXRlKHRoaXMpKSB7XG4gICAgICAgIHZhciBwcmV2VHJhY2tpbmdDb250ZXh0ID0gZ2xvYmFsU3RhdGUudHJhY2tpbmdDb250ZXh0O1xuICAgICAgICBpZiAodGhpcy5rZWVwQWxpdmVfICYmICFwcmV2VHJhY2tpbmdDb250ZXh0KSB7XG4gICAgICAgICAgZ2xvYmFsU3RhdGUudHJhY2tpbmdDb250ZXh0ID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy50cmFja0FuZENvbXB1dGUoKSkge1xuICAgICAgICAgIHByb3BhZ2F0ZUNoYW5nZUNvbmZpcm1lZCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxTdGF0ZS50cmFja2luZ0NvbnRleHQgPSBwcmV2VHJhY2tpbmdDb250ZXh0O1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gdGhpcy52YWx1ZV87XG4gICAgaWYgKGlzQ2F1Z2h0RXhjZXB0aW9uKHJlc3VsdCkpIHtcbiAgICAgIHRocm93IHJlc3VsdC5jYXVzZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgX3Byb3RvLnNldCA9IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgIGlmICh0aGlzLnNldHRlcl8pIHtcbiAgICAgIGlmICh0aGlzLmlzUnVubmluZ1NldHRlcl8pIHtcbiAgICAgICAgZGllKDMzLCB0aGlzLm5hbWVfKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXNSdW5uaW5nU2V0dGVyXyA9IHRydWU7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnNldHRlcl8uY2FsbCh0aGlzLnNjb3BlXywgdmFsdWUpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdGhpcy5pc1J1bm5pbmdTZXR0ZXJfID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpZSgzNCwgdGhpcy5uYW1lXyk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8udHJhY2tBbmRDb21wdXRlID0gZnVuY3Rpb24gdHJhY2tBbmRDb21wdXRlKCkge1xuICAgIC8vIE4uQjogdW5taW5pZmllZCBhcyBpdCBpcyB1c2VkIGJ5IE1TVFxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWVfO1xuICAgIHZhciB3YXNTdXNwZW5kZWQgPSAvKiBzZWUgIzEyMDggKi90aGlzLmRlcGVuZGVuY2llc1N0YXRlXyA9PT0gSURlcml2YXRpb25TdGF0ZV8uTk9UX1RSQUNLSU5HXztcbiAgICB2YXIgbmV3VmFsdWUgPSB0aGlzLmNvbXB1dGVWYWx1ZV8odHJ1ZSk7XG4gICAgdmFyIGNoYW5nZWQgPSB3YXNTdXNwZW5kZWQgfHwgaXNDYXVnaHRFeGNlcHRpb24ob2xkVmFsdWUpIHx8IGlzQ2F1Z2h0RXhjZXB0aW9uKG5ld1ZhbHVlKSB8fCAhdGhpcy5lcXVhbHNfKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgIHRoaXMudmFsdWVfID0gbmV3VmFsdWU7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGlzU3B5RW5hYmxlZCgpKSB7XG4gICAgICAgIHNweVJlcG9ydCh7XG4gICAgICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwiY29tcHV0ZWRcIixcbiAgICAgICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMubmFtZV8sXG4gICAgICAgICAgb2JqZWN0OiB0aGlzLnNjb3BlXyxcbiAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZSxcbiAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjaGFuZ2VkO1xuICB9O1xuICBfcHJvdG8uY29tcHV0ZVZhbHVlXyA9IGZ1bmN0aW9uIGNvbXB1dGVWYWx1ZV8odHJhY2spIHtcbiAgICB0aGlzLmlzQ29tcHV0aW5nXyA9IHRydWU7XG4gICAgLy8gZG9uJ3QgYWxsb3cgc3RhdGUgY2hhbmdlcyBkdXJpbmcgY29tcHV0YXRpb25cbiAgICB2YXIgcHJldiA9IGFsbG93U3RhdGVDaGFuZ2VzU3RhcnQoZmFsc2UpO1xuICAgIHZhciByZXM7XG4gICAgaWYgKHRyYWNrKSB7XG4gICAgICByZXMgPSB0cmFja0Rlcml2ZWRGdW5jdGlvbih0aGlzLCB0aGlzLmRlcml2YXRpb24sIHRoaXMuc2NvcGVfKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGdsb2JhbFN0YXRlLmRpc2FibGVFcnJvckJvdW5kYXJpZXMgPT09IHRydWUpIHtcbiAgICAgICAgcmVzID0gdGhpcy5kZXJpdmF0aW9uLmNhbGwodGhpcy5zY29wZV8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXMgPSB0aGlzLmRlcml2YXRpb24uY2FsbCh0aGlzLnNjb3BlXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXMgPSBuZXcgQ2F1Z2h0RXhjZXB0aW9uKGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGFsbG93U3RhdGVDaGFuZ2VzRW5kKHByZXYpO1xuICAgIHRoaXMuaXNDb21wdXRpbmdfID0gZmFsc2U7XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcbiAgX3Byb3RvLnN1c3BlbmRfID0gZnVuY3Rpb24gc3VzcGVuZF8oKSB7XG4gICAgaWYgKCF0aGlzLmtlZXBBbGl2ZV8pIHtcbiAgICAgIGNsZWFyT2JzZXJ2aW5nKHRoaXMpO1xuICAgICAgdGhpcy52YWx1ZV8gPSB1bmRlZmluZWQ7IC8vIGRvbid0IGhvbGQgb24gdG8gY29tcHV0ZWQgdmFsdWUhXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIHRoaXMuaXNUcmFjaW5nXyAhPT0gVHJhY2VNb2RlLk5PTkUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbbW9ieC50cmFjZV0gQ29tcHV0ZWQgdmFsdWUgJ1wiICsgdGhpcy5uYW1lXyArIFwiJyB3YXMgc3VzcGVuZGVkIGFuZCBpdCB3aWxsIHJlY29tcHV0ZSBvbiB0aGUgbmV4dCBhY2Nlc3MuXCIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgX3Byb3RvLm9ic2VydmVfID0gZnVuY3Rpb24gb2JzZXJ2ZV8obGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGZpcnN0VGltZSA9IHRydWU7XG4gICAgdmFyIHByZXZWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gYXV0b3J1bihmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBUT0RPOiB3aHkgaXMgdGhpcyBpbiBhIGRpZmZlcmVudCBwbGFjZSB0aGFuIHRoZSBzcHlSZXBvcnQoKSBmdW5jdGlvbj8gaW4gYWxsIG90aGVyIG9ic2VydmFibGVzIGl0J3MgY2FsbGVkIGluIHRoZSBzYW1lIHBsYWNlXG4gICAgICB2YXIgbmV3VmFsdWUgPSBfdGhpcy5nZXQoKTtcbiAgICAgIGlmICghZmlyc3RUaW1lIHx8IGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgICB2YXIgcHJldlUgPSB1bnRyYWNrZWRTdGFydCgpO1xuICAgICAgICBsaXN0ZW5lcih7XG4gICAgICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwiY29tcHV0ZWRcIixcbiAgICAgICAgICBkZWJ1Z09iamVjdE5hbWU6IF90aGlzLm5hbWVfLFxuICAgICAgICAgIHR5cGU6IFVQREFURSxcbiAgICAgICAgICBvYmplY3Q6IF90aGlzLFxuICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgICBvbGRWYWx1ZTogcHJldlZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICB1bnRyYWNrZWRFbmQocHJldlUpO1xuICAgICAgfVxuICAgICAgZmlyc3RUaW1lID0gZmFsc2U7XG4gICAgICBwcmV2VmFsdWUgPSBuZXdWYWx1ZTtcbiAgICB9KTtcbiAgfTtcbiAgX3Byb3RvLndhcm5BYm91dFVudHJhY2tlZFJlYWRfID0gZnVuY3Rpb24gd2FybkFib3V0VW50cmFja2VkUmVhZF8oKSB7XG4gICAgaWYgKCEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1RyYWNpbmdfICE9PSBUcmFjZU1vZGUuTk9ORSkge1xuICAgICAgY29uc29sZS5sb2coXCJbbW9ieC50cmFjZV0gQ29tcHV0ZWQgdmFsdWUgJ1wiICsgdGhpcy5uYW1lXyArIFwiJyBpcyBiZWluZyByZWFkIG91dHNpZGUgYSByZWFjdGl2ZSBjb250ZXh0LiBEb2luZyBhIGZ1bGwgcmVjb21wdXRlLlwiKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLnJlcXVpcmVzUmVhY3Rpb25fID09PSBcImJvb2xlYW5cIiA/IHRoaXMucmVxdWlyZXNSZWFjdGlvbl8gOiBnbG9iYWxTdGF0ZS5jb21wdXRlZFJlcXVpcmVzUmVhY3Rpb24pIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlttb2J4XSBDb21wdXRlZCB2YWx1ZSAnXCIgKyB0aGlzLm5hbWVfICsgXCInIGlzIGJlaW5nIHJlYWQgb3V0c2lkZSBhIHJlYWN0aXZlIGNvbnRleHQuIERvaW5nIGEgZnVsbCByZWNvbXB1dGUuXCIpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZV8gKyBcIltcIiArIHRoaXMuZGVyaXZhdGlvbi50b1N0cmluZygpICsgXCJdXCI7XG4gIH07XG4gIF9wcm90by52YWx1ZU9mID0gZnVuY3Rpb24gdmFsdWVPZigpIHtcbiAgICByZXR1cm4gdG9QcmltaXRpdmUodGhpcy5nZXQoKSk7XG4gIH07XG4gIF9wcm90b1tfU3ltYm9sJHRvUHJpbWl0aXZlJDFdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKTtcbiAgfTtcbiAgcmV0dXJuIENvbXB1dGVkVmFsdWU7XG59KCk7XG52YXIgaXNDb21wdXRlZFZhbHVlID0gLyojX19QVVJFX18qL2NyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUoXCJDb21wdXRlZFZhbHVlXCIsIENvbXB1dGVkVmFsdWUpO1xuXG52YXIgSURlcml2YXRpb25TdGF0ZV87XG4oZnVuY3Rpb24gKElEZXJpdmF0aW9uU3RhdGVfKSB7XG4gIC8vIGJlZm9yZSBiZWluZyBydW4gb3IgKG91dHNpZGUgYmF0Y2ggYW5kIG5vdCBiZWluZyBvYnNlcnZlZClcbiAgLy8gYXQgdGhpcyBwb2ludCBkZXJpdmF0aW9uIGlzIG5vdCBob2xkaW5nIGFueSBkYXRhIGFib3V0IGRlcGVuZGVuY3kgdHJlZVxuICBJRGVyaXZhdGlvblN0YXRlX1tJRGVyaXZhdGlvblN0YXRlX1tcIk5PVF9UUkFDS0lOR19cIl0gPSAtMV0gPSBcIk5PVF9UUkFDS0lOR19cIjtcbiAgLy8gbm8gc2hhbGxvdyBkZXBlbmRlbmN5IGNoYW5nZWQgc2luY2UgbGFzdCBjb21wdXRhdGlvblxuICAvLyB3b24ndCByZWNhbGN1bGF0ZSBkZXJpdmF0aW9uXG4gIC8vIHRoaXMgaXMgd2hhdCBtYWtlcyBtb2J4IGZhc3RcbiAgSURlcml2YXRpb25TdGF0ZV9bSURlcml2YXRpb25TdGF0ZV9bXCJVUF9UT19EQVRFX1wiXSA9IDBdID0gXCJVUF9UT19EQVRFX1wiO1xuICAvLyBzb21lIGRlZXAgZGVwZW5kZW5jeSBjaGFuZ2VkLCBidXQgZG9uJ3Qga25vdyBpZiBzaGFsbG93IGRlcGVuZGVuY3kgY2hhbmdlZFxuICAvLyB3aWxsIHJlcXVpcmUgdG8gY2hlY2sgZmlyc3QgaWYgVVBfVE9fREFURSBvciBQT1NTSUJMWV9TVEFMRVxuICAvLyBjdXJyZW50bHkgb25seSBDb21wdXRlZFZhbHVlIHdpbGwgcHJvcGFnYXRlIFBPU1NJQkxZX1NUQUxFXG4gIC8vXG4gIC8vIGhhdmluZyB0aGlzIHN0YXRlIGlzIHNlY29uZCBiaWcgb3B0aW1pemF0aW9uOlxuICAvLyBkb24ndCBoYXZlIHRvIHJlY29tcHV0ZSBvbiBldmVyeSBkZXBlbmRlbmN5IGNoYW5nZSwgYnV0IG9ubHkgd2hlbiBpdCdzIG5lZWRlZFxuICBJRGVyaXZhdGlvblN0YXRlX1tJRGVyaXZhdGlvblN0YXRlX1tcIlBPU1NJQkxZX1NUQUxFX1wiXSA9IDFdID0gXCJQT1NTSUJMWV9TVEFMRV9cIjtcbiAgLy8gQSBzaGFsbG93IGRlcGVuZGVuY3kgaGFzIGNoYW5nZWQgc2luY2UgbGFzdCBjb21wdXRhdGlvbiBhbmQgdGhlIGRlcml2YXRpb25cbiAgLy8gd2lsbCBuZWVkIHRvIHJlY29tcHV0ZSB3aGVuIGl0J3MgbmVlZGVkIG5leHQuXG4gIElEZXJpdmF0aW9uU3RhdGVfW0lEZXJpdmF0aW9uU3RhdGVfW1wiU1RBTEVfXCJdID0gMl0gPSBcIlNUQUxFX1wiO1xufSkoSURlcml2YXRpb25TdGF0ZV8gfHwgKElEZXJpdmF0aW9uU3RhdGVfID0ge30pKTtcbnZhciBUcmFjZU1vZGU7XG4oZnVuY3Rpb24gKFRyYWNlTW9kZSkge1xuICBUcmFjZU1vZGVbVHJhY2VNb2RlW1wiTk9ORVwiXSA9IDBdID0gXCJOT05FXCI7XG4gIFRyYWNlTW9kZVtUcmFjZU1vZGVbXCJMT0dcIl0gPSAxXSA9IFwiTE9HXCI7XG4gIFRyYWNlTW9kZVtUcmFjZU1vZGVbXCJCUkVBS1wiXSA9IDJdID0gXCJCUkVBS1wiO1xufSkoVHJhY2VNb2RlIHx8IChUcmFjZU1vZGUgPSB7fSkpO1xudmFyIENhdWdodEV4Y2VwdGlvbiA9IGZ1bmN0aW9uIENhdWdodEV4Y2VwdGlvbihjYXVzZSkge1xuICB0aGlzLmNhdXNlID0gdm9pZCAwO1xuICB0aGlzLmNhdXNlID0gY2F1c2U7XG4gIC8vIEVtcHR5XG59O1xuXG5mdW5jdGlvbiBpc0NhdWdodEV4Y2VwdGlvbihlKSB7XG4gIHJldHVybiBlIGluc3RhbmNlb2YgQ2F1Z2h0RXhjZXB0aW9uO1xufVxuLyoqXG4gKiBGaW5kcyBvdXQgd2hldGhlciBhbnkgZGVwZW5kZW5jeSBvZiB0aGUgZGVyaXZhdGlvbiBoYXMgYWN0dWFsbHkgY2hhbmdlZC5cbiAqIElmIGRlcGVuZGVuY2llc1N0YXRlIGlzIDEgdGhlbiBpdCB3aWxsIHJlY2FsY3VsYXRlIGRlcGVuZGVuY2llcyxcbiAqIGlmIGFueSBkZXBlbmRlbmN5IGNoYW5nZWQgaXQgd2lsbCBwcm9wYWdhdGUgaXQgYnkgY2hhbmdpbmcgZGVwZW5kZW5jaWVzU3RhdGUgdG8gMi5cbiAqXG4gKiBCeSBpdGVyYXRpbmcgb3ZlciB0aGUgZGVwZW5kZW5jaWVzIGluIHRoZSBzYW1lIG9yZGVyIHRoYXQgdGhleSB3ZXJlIHJlcG9ydGVkIGFuZFxuICogc3RvcHBpbmcgb24gdGhlIGZpcnN0IGNoYW5nZSwgYWxsIHRoZSByZWNhbGN1bGF0aW9ucyBhcmUgb25seSBjYWxsZWQgZm9yIENvbXB1dGVkVmFsdWVzXG4gKiB0aGF0IHdpbGwgYmUgdHJhY2tlZCBieSBkZXJpdmF0aW9uLiBUaGF0IGlzIGJlY2F1c2Ugd2UgYXNzdW1lIHRoYXQgaWYgdGhlIGZpcnN0IHhcbiAqIGRlcGVuZGVuY2llcyBvZiB0aGUgZGVyaXZhdGlvbiBkb2Vzbid0IGNoYW5nZSB0aGVuIHRoZSBkZXJpdmF0aW9uIHNob3VsZCBydW4gdGhlIHNhbWUgd2F5XG4gKiB1cCB1bnRpbCBhY2Nlc3NpbmcgeC10aCBkZXBlbmRlbmN5LlxuICovXG5mdW5jdGlvbiBzaG91bGRDb21wdXRlKGRlcml2YXRpb24pIHtcbiAgc3dpdGNoIChkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlXykge1xuICAgIGNhc2UgSURlcml2YXRpb25TdGF0ZV8uVVBfVE9fREFURV86XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgY2FzZSBJRGVyaXZhdGlvblN0YXRlXy5OT1RfVFJBQ0tJTkdfOlxuICAgIGNhc2UgSURlcml2YXRpb25TdGF0ZV8uU1RBTEVfOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSBJRGVyaXZhdGlvblN0YXRlXy5QT1NTSUJMWV9TVEFMRV86XG4gICAgICB7XG4gICAgICAgIC8vIHN0YXRlIHByb3BhZ2F0aW9uIGNhbiBvY2N1ciBvdXRzaWRlIG9mIGFjdGlvbi9yZWFjdGl2ZSBjb250ZXh0ICMyMTk1XG4gICAgICAgIHZhciBwcmV2QWxsb3dTdGF0ZVJlYWRzID0gYWxsb3dTdGF0ZVJlYWRzU3RhcnQodHJ1ZSk7XG4gICAgICAgIHZhciBwcmV2VW50cmFja2VkID0gdW50cmFja2VkU3RhcnQoKTsgLy8gbm8gbmVlZCBmb3IgdGhvc2UgY29tcHV0ZWRzIHRvIGJlIHJlcG9ydGVkLCB0aGV5IHdpbGwgYmUgcGlja2VkIHVwIGluIHRyYWNrRGVyaXZlZEZ1bmN0aW9uLlxuICAgICAgICB2YXIgb2JzID0gZGVyaXZhdGlvbi5vYnNlcnZpbmdfLFxuICAgICAgICAgIGwgPSBvYnMubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIHZhciBvYmogPSBvYnNbaV07XG4gICAgICAgICAgaWYgKGlzQ29tcHV0ZWRWYWx1ZShvYmopKSB7XG4gICAgICAgICAgICBpZiAoZ2xvYmFsU3RhdGUuZGlzYWJsZUVycm9yQm91bmRhcmllcykge1xuICAgICAgICAgICAgICBvYmouZ2V0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG9iai5nZXQoKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIHdlIGFyZSBub3QgaW50ZXJlc3RlZCBpbiB0aGUgdmFsdWUgKm9yKiBleGNlcHRpb24gYXQgdGhpcyBtb21lbnQsIGJ1dCBpZiB0aGVyZSBpcyBvbmUsIG5vdGlmeSBhbGxcbiAgICAgICAgICAgICAgICB1bnRyYWNrZWRFbmQocHJldlVudHJhY2tlZCk7XG4gICAgICAgICAgICAgICAgYWxsb3dTdGF0ZVJlYWRzRW5kKHByZXZBbGxvd1N0YXRlUmVhZHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBDb21wdXRlZFZhbHVlIGBvYmpgIGFjdHVhbGx5IGNoYW5nZWQgaXQgd2lsbCBiZSBjb21wdXRlZCBhbmQgcHJvcGFnYXRlZCB0byBpdHMgb2JzZXJ2ZXJzLlxuICAgICAgICAgICAgLy8gYW5kIGBkZXJpdmF0aW9uYCBpcyBhbiBvYnNlcnZlciBvZiBgb2JqYFxuICAgICAgICAgICAgLy8gaW52YXJpYW50U2hvdWxkQ29tcHV0ZShkZXJpdmF0aW9uKVxuICAgICAgICAgICAgaWYgKGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGVfID09PSBJRGVyaXZhdGlvblN0YXRlXy5TVEFMRV8pIHtcbiAgICAgICAgICAgICAgdW50cmFja2VkRW5kKHByZXZVbnRyYWNrZWQpO1xuICAgICAgICAgICAgICBhbGxvd1N0YXRlUmVhZHNFbmQocHJldkFsbG93U3RhdGVSZWFkcyk7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjaGFuZ2VEZXBlbmRlbmNpZXNTdGF0ZVRvMChkZXJpdmF0aW9uKTtcbiAgICAgICAgdW50cmFja2VkRW5kKHByZXZVbnRyYWNrZWQpO1xuICAgICAgICBhbGxvd1N0YXRlUmVhZHNFbmQocHJldkFsbG93U3RhdGVSZWFkcyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gaXNDb21wdXRpbmdEZXJpdmF0aW9uKCkge1xuICByZXR1cm4gZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uICE9PSBudWxsOyAvLyBmaWx0ZXIgb3V0IGFjdGlvbnMgaW5zaWRlIGNvbXB1dGF0aW9uc1xufVxuXG5mdW5jdGlvbiBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZChhdG9tKSB7XG4gIGlmICghKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGhhc09ic2VydmVycyA9IGF0b20ub2JzZXJ2ZXJzXy5zaXplID4gMDtcbiAgLy8gU2hvdWxkIG5vdCBiZSBwb3NzaWJsZSB0byBjaGFuZ2Ugb2JzZXJ2ZWQgc3RhdGUgb3V0c2lkZSBzdHJpY3QgbW9kZSwgZXhjZXB0IGR1cmluZyBpbml0aWFsaXphdGlvbiwgc2VlICM1NjNcbiAgaWYgKCFnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlQ2hhbmdlcyAmJiAoaGFzT2JzZXJ2ZXJzIHx8IGdsb2JhbFN0YXRlLmVuZm9yY2VBY3Rpb25zID09PSBcImFsd2F5c1wiKSkge1xuICAgIGNvbnNvbGUud2FybihcIltNb2JYXSBcIiArIChnbG9iYWxTdGF0ZS5lbmZvcmNlQWN0aW9ucyA/IFwiU2luY2Ugc3RyaWN0LW1vZGUgaXMgZW5hYmxlZCwgY2hhbmdpbmcgKG9ic2VydmVkKSBvYnNlcnZhYmxlIHZhbHVlcyB3aXRob3V0IHVzaW5nIGFuIGFjdGlvbiBpcyBub3QgYWxsb3dlZC4gVHJpZWQgdG8gbW9kaWZ5OiBcIiA6IFwiU2lkZSBlZmZlY3RzIGxpa2UgY2hhbmdpbmcgc3RhdGUgYXJlIG5vdCBhbGxvd2VkIGF0IHRoaXMgcG9pbnQuIEFyZSB5b3UgdHJ5aW5nIHRvIG1vZGlmeSBzdGF0ZSBmcm9tLCBmb3IgZXhhbXBsZSwgYSBjb21wdXRlZCB2YWx1ZSBvciB0aGUgcmVuZGVyIGZ1bmN0aW9uIG9mIGEgUmVhY3QgY29tcG9uZW50PyBZb3UgY2FuIHdyYXAgc2lkZSBlZmZlY3RzIGluICdydW5JbkFjdGlvbicgKG9yIGRlY29yYXRlIGZ1bmN0aW9ucyB3aXRoICdhY3Rpb24nKSBpZiBuZWVkZWQuIFRyaWVkIHRvIG1vZGlmeTogXCIpICsgYXRvbS5uYW1lXyk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNoZWNrSWZTdGF0ZVJlYWRzQXJlQWxsb3dlZChvYnNlcnZhYmxlKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWdsb2JhbFN0YXRlLmFsbG93U3RhdGVSZWFkcyAmJiBnbG9iYWxTdGF0ZS5vYnNlcnZhYmxlUmVxdWlyZXNSZWFjdGlvbikge1xuICAgIGNvbnNvbGUud2FybihcIlttb2J4XSBPYnNlcnZhYmxlICdcIiArIG9ic2VydmFibGUubmFtZV8gKyBcIicgYmVpbmcgcmVhZCBvdXRzaWRlIGEgcmVhY3RpdmUgY29udGV4dC5cIik7XG4gIH1cbn1cbi8qKlxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIGBmYCBhbmQgdHJhY2tzIHdoaWNoIG9ic2VydmFibGVzIGFyZSBiZWluZyBhY2Nlc3NlZC5cbiAqIFRoZSB0cmFja2luZyBpbmZvcm1hdGlvbiBpcyBzdG9yZWQgb24gdGhlIGBkZXJpdmF0aW9uYCBvYmplY3QgYW5kIHRoZSBkZXJpdmF0aW9uIGlzIHJlZ2lzdGVyZWRcbiAqIGFzIG9ic2VydmVyIG9mIGFueSBvZiB0aGUgYWNjZXNzZWQgb2JzZXJ2YWJsZXMuXG4gKi9cbmZ1bmN0aW9uIHRyYWNrRGVyaXZlZEZ1bmN0aW9uKGRlcml2YXRpb24sIGYsIGNvbnRleHQpIHtcbiAgdmFyIHByZXZBbGxvd1N0YXRlUmVhZHMgPSBhbGxvd1N0YXRlUmVhZHNTdGFydCh0cnVlKTtcbiAgY2hhbmdlRGVwZW5kZW5jaWVzU3RhdGVUbzAoZGVyaXZhdGlvbik7XG4gIC8vIFByZWFsbG9jYXRlIGFycmF5OyB3aWxsIGJlIHRyaW1tZWQgYnkgYmluZERlcGVuZGVuY2llcy5cbiAgZGVyaXZhdGlvbi5uZXdPYnNlcnZpbmdfID0gbmV3IEFycmF5KFxuICAvLyBSZXNlcnZlIGNvbnN0YW50IHNwYWNlIGZvciBpbml0aWFsIGRlcGVuZGVuY2llcywgZHluYW1pYyBzcGFjZSBvdGhlcndpc2UuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbW9ieGpzL21vYngvcHVsbC8zODMzXG4gIGRlcml2YXRpb24ucnVuSWRfID09PSAwID8gMTAwIDogZGVyaXZhdGlvbi5vYnNlcnZpbmdfLmxlbmd0aCk7XG4gIGRlcml2YXRpb24udW5ib3VuZERlcHNDb3VudF8gPSAwO1xuICBkZXJpdmF0aW9uLnJ1bklkXyA9ICsrZ2xvYmFsU3RhdGUucnVuSWQ7XG4gIHZhciBwcmV2VHJhY2tpbmcgPSBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb247XG4gIGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbiA9IGRlcml2YXRpb247XG4gIGdsb2JhbFN0YXRlLmluQmF0Y2grKztcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGdsb2JhbFN0YXRlLmRpc2FibGVFcnJvckJvdW5kYXJpZXMgPT09IHRydWUpIHtcbiAgICByZXN1bHQgPSBmLmNhbGwoY29udGV4dCk7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9IGYuY2FsbChjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXN1bHQgPSBuZXcgQ2F1Z2h0RXhjZXB0aW9uKGUpO1xuICAgIH1cbiAgfVxuICBnbG9iYWxTdGF0ZS5pbkJhdGNoLS07XG4gIGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbiA9IHByZXZUcmFja2luZztcbiAgYmluZERlcGVuZGVuY2llcyhkZXJpdmF0aW9uKTtcbiAgd2FybkFib3V0RGVyaXZhdGlvbldpdGhvdXREZXBlbmRlbmNpZXMoZGVyaXZhdGlvbik7XG4gIGFsbG93U3RhdGVSZWFkc0VuZChwcmV2QWxsb3dTdGF0ZVJlYWRzKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHdhcm5BYm91dERlcml2YXRpb25XaXRob3V0RGVwZW5kZW5jaWVzKGRlcml2YXRpb24pIHtcbiAgaWYgKCEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZGVyaXZhdGlvbi5vYnNlcnZpbmdfLmxlbmd0aCAhPT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodHlwZW9mIGRlcml2YXRpb24ucmVxdWlyZXNPYnNlcnZhYmxlXyA9PT0gXCJib29sZWFuXCIgPyBkZXJpdmF0aW9uLnJlcXVpcmVzT2JzZXJ2YWJsZV8gOiBnbG9iYWxTdGF0ZS5yZWFjdGlvblJlcXVpcmVzT2JzZXJ2YWJsZSkge1xuICAgIGNvbnNvbGUud2FybihcIlttb2J4XSBEZXJpdmF0aW9uICdcIiArIGRlcml2YXRpb24ubmFtZV8gKyBcIicgaXMgY3JlYXRlZC91cGRhdGVkIHdpdGhvdXQgcmVhZGluZyBhbnkgb2JzZXJ2YWJsZSB2YWx1ZS5cIik7XG4gIH1cbn1cbi8qKlxuICogZGlmZnMgbmV3T2JzZXJ2aW5nIHdpdGggb2JzZXJ2aW5nLlxuICogdXBkYXRlIG9ic2VydmluZyB0byBiZSBuZXdPYnNlcnZpbmcgd2l0aCB1bmlxdWUgb2JzZXJ2YWJsZXNcbiAqIG5vdGlmeSBvYnNlcnZlcnMgdGhhdCBiZWNvbWUgb2JzZXJ2ZWQvdW5vYnNlcnZlZFxuICovXG5mdW5jdGlvbiBiaW5kRGVwZW5kZW5jaWVzKGRlcml2YXRpb24pIHtcbiAgLy8gaW52YXJpYW50KGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGUgIT09IElEZXJpdmF0aW9uU3RhdGUuTk9UX1RSQUNLSU5HLCBcIklOVEVSTkFMIEVSUk9SIGJpbmREZXBlbmRlbmNpZXMgZXhwZWN0cyBkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlICE9PSAtMVwiKTtcbiAgdmFyIHByZXZPYnNlcnZpbmcgPSBkZXJpdmF0aW9uLm9ic2VydmluZ187XG4gIHZhciBvYnNlcnZpbmcgPSBkZXJpdmF0aW9uLm9ic2VydmluZ18gPSBkZXJpdmF0aW9uLm5ld09ic2VydmluZ187XG4gIHZhciBsb3dlc3ROZXdPYnNlcnZpbmdEZXJpdmF0aW9uU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlXy5VUF9UT19EQVRFXztcbiAgLy8gR28gdGhyb3VnaCBhbGwgbmV3IG9ic2VydmFibGVzIGFuZCBjaGVjayBkaWZmVmFsdWU6ICh0aGlzIGxpc3QgY2FuIGNvbnRhaW4gZHVwbGljYXRlcyk6XG4gIC8vICAgMDogZmlyc3Qgb2NjdXJyZW5jZSwgY2hhbmdlIHRvIDEgYW5kIGtlZXAgaXRcbiAgLy8gICAxOiBleHRyYSBvY2N1cnJlbmNlLCBkcm9wIGl0XG4gIHZhciBpMCA9IDAsXG4gICAgbCA9IGRlcml2YXRpb24udW5ib3VuZERlcHNDb3VudF87XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGRlcCA9IG9ic2VydmluZ1tpXTtcbiAgICBpZiAoZGVwLmRpZmZWYWx1ZV8gPT09IDApIHtcbiAgICAgIGRlcC5kaWZmVmFsdWVfID0gMTtcbiAgICAgIGlmIChpMCAhPT0gaSkge1xuICAgICAgICBvYnNlcnZpbmdbaTBdID0gZGVwO1xuICAgICAgfVxuICAgICAgaTArKztcbiAgICB9XG4gICAgLy8gVXBjYXN0IGlzICdzYWZlJyBoZXJlLCBiZWNhdXNlIGlmIGRlcCBpcyBJT2JzZXJ2YWJsZSwgYGRlcGVuZGVuY2llc1N0YXRlYCB3aWxsIGJlIHVuZGVmaW5lZCxcbiAgICAvLyBub3QgaGl0dGluZyB0aGUgY29uZGl0aW9uXG4gICAgaWYgKGRlcC5kZXBlbmRlbmNpZXNTdGF0ZV8gPiBsb3dlc3ROZXdPYnNlcnZpbmdEZXJpdmF0aW9uU3RhdGUpIHtcbiAgICAgIGxvd2VzdE5ld09ic2VydmluZ0Rlcml2YXRpb25TdGF0ZSA9IGRlcC5kZXBlbmRlbmNpZXNTdGF0ZV87XG4gICAgfVxuICB9XG4gIG9ic2VydmluZy5sZW5ndGggPSBpMDtcbiAgZGVyaXZhdGlvbi5uZXdPYnNlcnZpbmdfID0gbnVsbDsgLy8gbmV3T2JzZXJ2aW5nIHNob3VsZG4ndCBiZSBuZWVkZWQgb3V0c2lkZSB0cmFja2luZyAoc3RhdGVtZW50IG1vdmVkIGRvd24gdG8gd29yayBhcm91bmQgRkYgYnVnLCBzZWUgIzYxNClcbiAgLy8gR28gdGhyb3VnaCBhbGwgb2xkIG9ic2VydmFibGVzIGFuZCBjaGVjayBkaWZmVmFsdWU6IChpdCBpcyB1bmlxdWUgYWZ0ZXIgbGFzdCBiaW5kRGVwZW5kZW5jaWVzKVxuICAvLyAgIDA6IGl0J3Mgbm90IGluIG5ldyBvYnNlcnZhYmxlcywgdW5vYnNlcnZlIGl0XG4gIC8vICAgMTogaXQga2VlcHMgYmVpbmcgb2JzZXJ2ZWQsIGRvbid0IHdhbnQgdG8gbm90aWZ5IGl0LiBjaGFuZ2UgdG8gMFxuICBsID0gcHJldk9ic2VydmluZy5sZW5ndGg7XG4gIHdoaWxlIChsLS0pIHtcbiAgICB2YXIgX2RlcCA9IHByZXZPYnNlcnZpbmdbbF07XG4gICAgaWYgKF9kZXAuZGlmZlZhbHVlXyA9PT0gMCkge1xuICAgICAgcmVtb3ZlT2JzZXJ2ZXIoX2RlcCwgZGVyaXZhdGlvbik7XG4gICAgfVxuICAgIF9kZXAuZGlmZlZhbHVlXyA9IDA7XG4gIH1cbiAgLy8gR28gdGhyb3VnaCBhbGwgbmV3IG9ic2VydmFibGVzIGFuZCBjaGVjayBkaWZmVmFsdWU6IChub3cgaXQgc2hvdWxkIGJlIHVuaXF1ZSlcbiAgLy8gICAwOiBpdCB3YXMgc2V0IHRvIDAgaW4gbGFzdCBsb29wLiBkb24ndCBuZWVkIHRvIGRvIGFueXRoaW5nLlxuICAvLyAgIDE6IGl0IHdhc24ndCBvYnNlcnZlZCwgbGV0J3Mgb2JzZXJ2ZSBpdC4gc2V0IGJhY2sgdG8gMFxuICB3aGlsZSAoaTAtLSkge1xuICAgIHZhciBfZGVwMiA9IG9ic2VydmluZ1tpMF07XG4gICAgaWYgKF9kZXAyLmRpZmZWYWx1ZV8gPT09IDEpIHtcbiAgICAgIF9kZXAyLmRpZmZWYWx1ZV8gPSAwO1xuICAgICAgYWRkT2JzZXJ2ZXIoX2RlcDIsIGRlcml2YXRpb24pO1xuICAgIH1cbiAgfVxuICAvLyBTb21lIG5ldyBvYnNlcnZlZCBkZXJpdmF0aW9ucyBtYXkgYmVjb21lIHN0YWxlIGR1cmluZyB0aGlzIGRlcml2YXRpb24gY29tcHV0YXRpb25cbiAgLy8gc28gdGhleSBoYXZlIGhhZCBubyBjaGFuY2UgdG8gcHJvcGFnYXRlIHN0YWxlbmVzcyAoIzkxNilcbiAgaWYgKGxvd2VzdE5ld09ic2VydmluZ0Rlcml2YXRpb25TdGF0ZSAhPT0gSURlcml2YXRpb25TdGF0ZV8uVVBfVE9fREFURV8pIHtcbiAgICBkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlXyA9IGxvd2VzdE5ld09ic2VydmluZ0Rlcml2YXRpb25TdGF0ZTtcbiAgICBkZXJpdmF0aW9uLm9uQmVjb21lU3RhbGVfKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNsZWFyT2JzZXJ2aW5nKGRlcml2YXRpb24pIHtcbiAgLy8gaW52YXJpYW50KGdsb2JhbFN0YXRlLmluQmF0Y2ggPiAwLCBcIklOVEVSTkFMIEVSUk9SIGNsZWFyT2JzZXJ2aW5nIHNob3VsZCBiZSBjYWxsZWQgb25seSBpbnNpZGUgYmF0Y2hcIik7XG4gIHZhciBvYnMgPSBkZXJpdmF0aW9uLm9ic2VydmluZ187XG4gIGRlcml2YXRpb24ub2JzZXJ2aW5nXyA9IFtdO1xuICB2YXIgaSA9IG9icy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICByZW1vdmVPYnNlcnZlcihvYnNbaV0sIGRlcml2YXRpb24pO1xuICB9XG4gIGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uTk9UX1RSQUNLSU5HXztcbn1cbmZ1bmN0aW9uIHVudHJhY2tlZChhY3Rpb24pIHtcbiAgdmFyIHByZXYgPSB1bnRyYWNrZWRTdGFydCgpO1xuICB0cnkge1xuICAgIHJldHVybiBhY3Rpb24oKTtcbiAgfSBmaW5hbGx5IHtcbiAgICB1bnRyYWNrZWRFbmQocHJldik7XG4gIH1cbn1cbmZ1bmN0aW9uIHVudHJhY2tlZFN0YXJ0KCkge1xuICB2YXIgcHJldiA9IGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbjtcbiAgZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uID0gbnVsbDtcbiAgcmV0dXJuIHByZXY7XG59XG5mdW5jdGlvbiB1bnRyYWNrZWRFbmQocHJldikge1xuICBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb24gPSBwcmV2O1xufVxuZnVuY3Rpb24gYWxsb3dTdGF0ZVJlYWRzU3RhcnQoYWxsb3dTdGF0ZVJlYWRzKSB7XG4gIHZhciBwcmV2ID0gZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZVJlYWRzO1xuICBnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlUmVhZHMgPSBhbGxvd1N0YXRlUmVhZHM7XG4gIHJldHVybiBwcmV2O1xufVxuZnVuY3Rpb24gYWxsb3dTdGF0ZVJlYWRzRW5kKHByZXYpIHtcbiAgZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZVJlYWRzID0gcHJldjtcbn1cbi8qKlxuICogbmVlZGVkIHRvIGtlZXAgYGxvd2VzdE9ic2VydmVyU3RhdGVgIGNvcnJlY3QuIHdoZW4gY2hhbmdpbmcgZnJvbSAoMiBvciAxKSB0byAwXG4gKlxuICovXG5mdW5jdGlvbiBjaGFuZ2VEZXBlbmRlbmNpZXNTdGF0ZVRvMChkZXJpdmF0aW9uKSB7XG4gIGlmIChkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlXyA9PT0gSURlcml2YXRpb25TdGF0ZV8uVVBfVE9fREFURV8pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5VUF9UT19EQVRFXztcbiAgdmFyIG9icyA9IGRlcml2YXRpb24ub2JzZXJ2aW5nXztcbiAgdmFyIGkgPSBvYnMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgb2JzW2ldLmxvd2VzdE9ic2VydmVyU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uVVBfVE9fREFURV87XG4gIH1cbn1cblxuLyoqXG4gKiBUaGVzZSB2YWx1ZXMgd2lsbCBwZXJzaXN0IGlmIGdsb2JhbCBzdGF0ZSBpcyByZXNldFxuICovXG52YXIgcGVyc2lzdGVudEtleXMgPSBbXCJtb2J4R3VpZFwiLCBcInNweUxpc3RlbmVyc1wiLCBcImVuZm9yY2VBY3Rpb25zXCIsIFwiY29tcHV0ZWRSZXF1aXJlc1JlYWN0aW9uXCIsIFwicmVhY3Rpb25SZXF1aXJlc09ic2VydmFibGVcIiwgXCJvYnNlcnZhYmxlUmVxdWlyZXNSZWFjdGlvblwiLCBcImFsbG93U3RhdGVSZWFkc1wiLCBcImRpc2FibGVFcnJvckJvdW5kYXJpZXNcIiwgXCJydW5JZFwiLCBcIlVOQ0hBTkdFRFwiLCBcInVzZVByb3hpZXNcIl07XG52YXIgTW9iWEdsb2JhbHMgPSBmdW5jdGlvbiBNb2JYR2xvYmFscygpIHtcbiAgdGhpcy52ZXJzaW9uID0gNjtcbiAgdGhpcy5VTkNIQU5HRUQgPSB7fTtcbiAgdGhpcy50cmFja2luZ0Rlcml2YXRpb24gPSBudWxsO1xuICB0aGlzLnRyYWNraW5nQ29udGV4dCA9IG51bGw7XG4gIHRoaXMucnVuSWQgPSAwO1xuICB0aGlzLm1vYnhHdWlkID0gMDtcbiAgdGhpcy5pbkJhdGNoID0gMDtcbiAgdGhpcy5wZW5kaW5nVW5vYnNlcnZhdGlvbnMgPSBbXTtcbiAgdGhpcy5wZW5kaW5nUmVhY3Rpb25zID0gW107XG4gIHRoaXMuaXNSdW5uaW5nUmVhY3Rpb25zID0gZmFsc2U7XG4gIHRoaXMuYWxsb3dTdGF0ZUNoYW5nZXMgPSBmYWxzZTtcbiAgdGhpcy5hbGxvd1N0YXRlUmVhZHMgPSB0cnVlO1xuICB0aGlzLmVuZm9yY2VBY3Rpb25zID0gdHJ1ZTtcbiAgdGhpcy5zcHlMaXN0ZW5lcnMgPSBbXTtcbiAgdGhpcy5nbG9iYWxSZWFjdGlvbkVycm9ySGFuZGxlcnMgPSBbXTtcbiAgdGhpcy5jb21wdXRlZFJlcXVpcmVzUmVhY3Rpb24gPSBmYWxzZTtcbiAgdGhpcy5yZWFjdGlvblJlcXVpcmVzT2JzZXJ2YWJsZSA9IGZhbHNlO1xuICB0aGlzLm9ic2VydmFibGVSZXF1aXJlc1JlYWN0aW9uID0gZmFsc2U7XG4gIHRoaXMuZGlzYWJsZUVycm9yQm91bmRhcmllcyA9IGZhbHNlO1xuICB0aGlzLnN1cHByZXNzUmVhY3Rpb25FcnJvcnMgPSBmYWxzZTtcbiAgdGhpcy51c2VQcm94aWVzID0gdHJ1ZTtcbiAgdGhpcy52ZXJpZnlQcm94aWVzID0gZmFsc2U7XG4gIHRoaXMuc2FmZURlc2NyaXB0b3JzID0gdHJ1ZTtcbn07XG52YXIgY2FuTWVyZ2VHbG9iYWxTdGF0ZSA9IHRydWU7XG52YXIgaXNvbGF0ZUNhbGxlZCA9IGZhbHNlO1xudmFyIGdsb2JhbFN0YXRlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIGdsb2JhbCA9IC8qI19fUFVSRV9fKi9nZXRHbG9iYWwoKTtcbiAgaWYgKGdsb2JhbC5fX214X2lzb2xhdGVkX21vYnhJbnN0YW5jZUNvdW50ID4gMCAmJiAhZ2xvYmFsLl9fbXhfaXNvbGF0ZWRfbW9ieEdsb2JhbHMpIHtcbiAgICBjYW5NZXJnZUdsb2JhbFN0YXRlID0gZmFsc2U7XG4gIH1cbiAgaWYgKGdsb2JhbC5fX214X2lzb2xhdGVkX21vYnhHbG9iYWxzICYmIGdsb2JhbC5fX214X2lzb2xhdGVkX21vYnhHbG9iYWxzLnZlcnNpb24gIT09IG5ldyBNb2JYR2xvYmFscygpLnZlcnNpb24pIHtcbiAgICBjYW5NZXJnZUdsb2JhbFN0YXRlID0gZmFsc2U7XG4gIH1cbiAgaWYgKCFjYW5NZXJnZUdsb2JhbFN0YXRlKSB7XG4gICAgLy8gQmVjYXVzZSB0aGlzIGlzIGEgSUlGRSB3ZSBuZWVkIHRvIGxldCBpc29sYXRlQ2FsbGVkIGEgY2hhbmNlIHRvIGNoYW5nZVxuICAgIC8vIHNvIHdlIHJ1biBpdCBhZnRlciB0aGUgZXZlbnQgbG9vcCBjb21wbGV0ZWQgYXQgbGVhc3QgMSBpdGVyYXRpb25cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghaXNvbGF0ZUNhbGxlZCkge1xuICAgICAgICBkaWUoMzUpO1xuICAgICAgfVxuICAgIH0sIDEpO1xuICAgIHJldHVybiBuZXcgTW9iWEdsb2JhbHMoKTtcbiAgfSBlbHNlIGlmIChnbG9iYWwuX19teF9pc29sYXRlZF9tb2J4R2xvYmFscykge1xuICAgIGdsb2JhbC5fX214X2lzb2xhdGVkX21vYnhJbnN0YW5jZUNvdW50ICs9IDE7XG4gICAgaWYgKCFnbG9iYWwuX19teF9pc29sYXRlZF9tb2J4R2xvYmFscy5VTkNIQU5HRUQpIHtcbiAgICAgIGdsb2JhbC5fX214X2lzb2xhdGVkX21vYnhHbG9iYWxzLlVOQ0hBTkdFRCA9IHt9O1xuICAgIH0gLy8gbWFrZSBtZXJnZSBiYWNrd2FyZCBjb21wYXRpYmxlXG4gICAgcmV0dXJuIGdsb2JhbC5fX214X2lzb2xhdGVkX21vYnhHbG9iYWxzO1xuICB9IGVsc2Uge1xuICAgIGdsb2JhbC5fX214X2lzb2xhdGVkX21vYnhJbnN0YW5jZUNvdW50ID0gMTtcbiAgICByZXR1cm4gZ2xvYmFsLl9fbXhfaXNvbGF0ZWRfbW9ieEdsb2JhbHMgPSAvKiNfX1BVUkVfXyovbmV3IE1vYlhHbG9iYWxzKCk7XG4gIH1cbn0oKTtcbmZ1bmN0aW9uIGlzb2xhdGVHbG9iYWxTdGF0ZSgpIHtcbiAgaWYgKGdsb2JhbFN0YXRlLnBlbmRpbmdSZWFjdGlvbnMubGVuZ3RoIHx8IGdsb2JhbFN0YXRlLmluQmF0Y2ggfHwgZ2xvYmFsU3RhdGUuaXNSdW5uaW5nUmVhY3Rpb25zKSB7XG4gICAgZGllKDM2KTtcbiAgfVxuICBpc29sYXRlQ2FsbGVkID0gdHJ1ZTtcbiAgaWYgKGNhbk1lcmdlR2xvYmFsU3RhdGUpIHtcbiAgICB2YXIgZ2xvYmFsID0gZ2V0R2xvYmFsKCk7XG4gICAgaWYgKC0tZ2xvYmFsLl9fbXhfaXNvbGF0ZWRfbW9ieEluc3RhbmNlQ291bnQgPT09IDApIHtcbiAgICAgIGdsb2JhbC5fX214X2lzb2xhdGVkX21vYnhHbG9iYWxzID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBnbG9iYWxTdGF0ZSA9IG5ldyBNb2JYR2xvYmFscygpO1xuICB9XG59XG5mdW5jdGlvbiBnZXRHbG9iYWxTdGF0ZSgpIHtcbiAgcmV0dXJuIGdsb2JhbFN0YXRlO1xufVxuLyoqXG4gKiBGb3IgdGVzdGluZyBwdXJwb3NlcyBvbmx5OyB0aGlzIHdpbGwgYnJlYWsgdGhlIGludGVybmFsIHN0YXRlIG9mIGV4aXN0aW5nIG9ic2VydmFibGVzLFxuICogYnV0IGNhbiBiZSB1c2VkIHRvIGdldCBiYWNrIGF0IGEgc3RhYmxlIHN0YXRlIGFmdGVyIHRocm93aW5nIGVycm9yc1xuICovXG5mdW5jdGlvbiByZXNldEdsb2JhbFN0YXRlKCkge1xuICB2YXIgZGVmYXVsdEdsb2JhbHMgPSBuZXcgTW9iWEdsb2JhbHMoKTtcbiAgZm9yICh2YXIga2V5IGluIGRlZmF1bHRHbG9iYWxzKSB7XG4gICAgaWYgKHBlcnNpc3RlbnRLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgIGdsb2JhbFN0YXRlW2tleV0gPSBkZWZhdWx0R2xvYmFsc1trZXldO1xuICAgIH1cbiAgfVxuICBnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlQ2hhbmdlcyA9ICFnbG9iYWxTdGF0ZS5lbmZvcmNlQWN0aW9ucztcbn1cblxuZnVuY3Rpb24gaGFzT2JzZXJ2ZXJzKG9ic2VydmFibGUpIHtcbiAgcmV0dXJuIG9ic2VydmFibGUub2JzZXJ2ZXJzXyAmJiBvYnNlcnZhYmxlLm9ic2VydmVyc18uc2l6ZSA+IDA7XG59XG5mdW5jdGlvbiBnZXRPYnNlcnZlcnMob2JzZXJ2YWJsZSkge1xuICByZXR1cm4gb2JzZXJ2YWJsZS5vYnNlcnZlcnNfO1xufVxuLy8gZnVuY3Rpb24gaW52YXJpYW50T2JzZXJ2ZXJzKG9ic2VydmFibGU6IElPYnNlcnZhYmxlKSB7XG4vLyAgICAgY29uc3QgbGlzdCA9IG9ic2VydmFibGUub2JzZXJ2ZXJzXG4vLyAgICAgY29uc3QgbWFwID0gb2JzZXJ2YWJsZS5vYnNlcnZlcnNJbmRleGVzXG4vLyAgICAgY29uc3QgbCA9IGxpc3QubGVuZ3RoXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbi8vICAgICAgICAgY29uc3QgaWQgPSBsaXN0W2ldLl9fbWFwaWRcbi8vICAgICAgICAgaWYgKGkpIHtcbi8vICAgICAgICAgICAgIGludmFyaWFudChtYXBbaWRdID09PSBpLCBcIklOVEVSTkFMIEVSUk9SIG1hcHMgZGVyaXZhdGlvbi5fX21hcGlkIHRvIGluZGV4IGluIGxpc3RcIikgLy8gZm9yIHBlcmZvcm1hbmNlXG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBpbnZhcmlhbnQoIShpZCBpbiBtYXApLCBcIklOVEVSTkFMIEVSUk9SIG9ic2VydmVyIG9uIGluZGV4IDAgc2hvdWxkbid0IGJlIGhlbGQgaW4gbWFwLlwiKSAvLyBmb3IgcGVyZm9ybWFuY2Vcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vICAgICBpbnZhcmlhbnQoXG4vLyAgICAgICAgIGxpc3QubGVuZ3RoID09PSAwIHx8IE9iamVjdC5rZXlzKG1hcCkubGVuZ3RoID09PSBsaXN0Lmxlbmd0aCAtIDEsXG4vLyAgICAgICAgIFwiSU5URVJOQUwgRVJST1IgdGhlcmUgaXMgbm8ganVuayBpbiBtYXBcIlxuLy8gICAgIClcbi8vIH1cbmZ1bmN0aW9uIGFkZE9ic2VydmVyKG9ic2VydmFibGUsIG5vZGUpIHtcbiAgLy8gaW52YXJpYW50KG5vZGUuZGVwZW5kZW5jaWVzU3RhdGUgIT09IC0xLCBcIklOVEVSTkFMIEVSUk9SLCBjYW4gYWRkIG9ubHkgZGVwZW5kZW5jaWVzU3RhdGUgIT09IC0xXCIpO1xuICAvLyBpbnZhcmlhbnQob2JzZXJ2YWJsZS5fb2JzZXJ2ZXJzLmluZGV4T2Yobm9kZSkgPT09IC0xLCBcIklOVEVSTkFMIEVSUk9SIGFkZCBhbHJlYWR5IGFkZGVkIG5vZGVcIik7XG4gIC8vIGludmFyaWFudE9ic2VydmVycyhvYnNlcnZhYmxlKTtcbiAgb2JzZXJ2YWJsZS5vYnNlcnZlcnNfLmFkZChub2RlKTtcbiAgaWYgKG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZV8gPiBub2RlLmRlcGVuZGVuY2llc1N0YXRlXykge1xuICAgIG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZV8gPSBub2RlLmRlcGVuZGVuY2llc1N0YXRlXztcbiAgfVxuICAvLyBpbnZhcmlhbnRPYnNlcnZlcnMob2JzZXJ2YWJsZSk7XG4gIC8vIGludmFyaWFudChvYnNlcnZhYmxlLl9vYnNlcnZlcnMuaW5kZXhPZihub2RlKSAhPT0gLTEsIFwiSU5URVJOQUwgRVJST1IgZGlkbid0IGFkZCBub2RlXCIpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVPYnNlcnZlcihvYnNlcnZhYmxlLCBub2RlKSB7XG4gIC8vIGludmFyaWFudChnbG9iYWxTdGF0ZS5pbkJhdGNoID4gMCwgXCJJTlRFUk5BTCBFUlJPUiwgcmVtb3ZlIHNob3VsZCBiZSBjYWxsZWQgb25seSBpbnNpZGUgYmF0Y2hcIik7XG4gIC8vIGludmFyaWFudChvYnNlcnZhYmxlLl9vYnNlcnZlcnMuaW5kZXhPZihub2RlKSAhPT0gLTEsIFwiSU5URVJOQUwgRVJST1IgcmVtb3ZlIGFscmVhZHkgcmVtb3ZlZCBub2RlXCIpO1xuICAvLyBpbnZhcmlhbnRPYnNlcnZlcnMob2JzZXJ2YWJsZSk7XG4gIG9ic2VydmFibGUub2JzZXJ2ZXJzX1tcImRlbGV0ZVwiXShub2RlKTtcbiAgaWYgKG9ic2VydmFibGUub2JzZXJ2ZXJzXy5zaXplID09PSAwKSB7XG4gICAgLy8gZGVsZXRpbmcgbGFzdCBvYnNlcnZlclxuICAgIHF1ZXVlRm9yVW5vYnNlcnZhdGlvbihvYnNlcnZhYmxlKTtcbiAgfVxuICAvLyBpbnZhcmlhbnRPYnNlcnZlcnMob2JzZXJ2YWJsZSk7XG4gIC8vIGludmFyaWFudChvYnNlcnZhYmxlLl9vYnNlcnZlcnMuaW5kZXhPZihub2RlKSA9PT0gLTEsIFwiSU5URVJOQUwgRVJST1IgcmVtb3ZlIGFscmVhZHkgcmVtb3ZlZCBub2RlMlwiKTtcbn1cblxuZnVuY3Rpb24gcXVldWVGb3JVbm9ic2VydmF0aW9uKG9ic2VydmFibGUpIHtcbiAgaWYgKG9ic2VydmFibGUuaXNQZW5kaW5nVW5vYnNlcnZhdGlvbl8gPT09IGZhbHNlKSB7XG4gICAgLy8gaW52YXJpYW50KG9ic2VydmFibGUuX29ic2VydmVycy5sZW5ndGggPT09IDAsIFwiSU5URVJOQUwgRVJST1IsIHNob3VsZCBvbmx5IHF1ZXVlIGZvciB1bm9ic2VydmF0aW9uIHVub2JzZXJ2ZWQgb2JzZXJ2YWJsZXNcIik7XG4gICAgb2JzZXJ2YWJsZS5pc1BlbmRpbmdVbm9ic2VydmF0aW9uXyA9IHRydWU7XG4gICAgZ2xvYmFsU3RhdGUucGVuZGluZ1Vub2JzZXJ2YXRpb25zLnB1c2gob2JzZXJ2YWJsZSk7XG4gIH1cbn1cbi8qKlxuICogQmF0Y2ggc3RhcnRzIGEgdHJhbnNhY3Rpb24sIGF0IGxlYXN0IGZvciBwdXJwb3NlcyBvZiBtZW1vaXppbmcgQ29tcHV0ZWRWYWx1ZXMgd2hlbiBub3RoaW5nIGVsc2UgZG9lcy5cbiAqIER1cmluZyBhIGJhdGNoIGBvbkJlY29tZVVub2JzZXJ2ZWRgIHdpbGwgYmUgY2FsbGVkIGF0IG1vc3Qgb25jZSBwZXIgb2JzZXJ2YWJsZS5cbiAqIEF2b2lkcyB1bm5lY2Vzc2FyeSByZWNhbGN1bGF0aW9ucy5cbiAqL1xuZnVuY3Rpb24gc3RhcnRCYXRjaCgpIHtcbiAgZ2xvYmFsU3RhdGUuaW5CYXRjaCsrO1xufVxuZnVuY3Rpb24gZW5kQmF0Y2goKSB7XG4gIGlmICgtLWdsb2JhbFN0YXRlLmluQmF0Y2ggPT09IDApIHtcbiAgICBydW5SZWFjdGlvbnMoKTtcbiAgICAvLyB0aGUgYmF0Y2ggaXMgYWN0dWFsbHkgYWJvdXQgdG8gZmluaXNoLCBhbGwgdW5vYnNlcnZpbmcgc2hvdWxkIGhhcHBlbiBoZXJlLlxuICAgIHZhciBsaXN0ID0gZ2xvYmFsU3RhdGUucGVuZGluZ1Vub2JzZXJ2YXRpb25zO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG9ic2VydmFibGUgPSBsaXN0W2ldO1xuICAgICAgb2JzZXJ2YWJsZS5pc1BlbmRpbmdVbm9ic2VydmF0aW9uXyA9IGZhbHNlO1xuICAgICAgaWYgKG9ic2VydmFibGUub2JzZXJ2ZXJzXy5zaXplID09PSAwKSB7XG4gICAgICAgIGlmIChvYnNlcnZhYmxlLmlzQmVpbmdPYnNlcnZlZF8pIHtcbiAgICAgICAgICAvLyBpZiB0aGlzIG9ic2VydmFibGUgaGFkIHJlYWN0aXZlIG9ic2VydmVycywgdHJpZ2dlciB0aGUgaG9va3NcbiAgICAgICAgICBvYnNlcnZhYmxlLmlzQmVpbmdPYnNlcnZlZF8gPSBmYWxzZTtcbiAgICAgICAgICBvYnNlcnZhYmxlLm9uQlVPKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9ic2VydmFibGUgaW5zdGFuY2VvZiBDb21wdXRlZFZhbHVlKSB7XG4gICAgICAgICAgLy8gY29tcHV0ZWQgdmFsdWVzIGFyZSBhdXRvbWF0aWNhbGx5IHRlYXJlZCBkb3duIHdoZW4gdGhlIGxhc3Qgb2JzZXJ2ZXIgbGVhdmVzXG4gICAgICAgICAgLy8gdGhpcyBwcm9jZXNzIGhhcHBlbnMgcmVjdXJzaXZlbHksIHRoaXMgY29tcHV0ZWQgbWlnaHQgYmUgdGhlIGxhc3Qgb2JzZXJ2YWJlIG9mIGFub3RoZXIsIGV0Yy4uXG4gICAgICAgICAgb2JzZXJ2YWJsZS5zdXNwZW5kXygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGdsb2JhbFN0YXRlLnBlbmRpbmdVbm9ic2VydmF0aW9ucyA9IFtdO1xuICB9XG59XG5mdW5jdGlvbiByZXBvcnRPYnNlcnZlZChvYnNlcnZhYmxlKSB7XG4gIGNoZWNrSWZTdGF0ZVJlYWRzQXJlQWxsb3dlZChvYnNlcnZhYmxlKTtcbiAgdmFyIGRlcml2YXRpb24gPSBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb247XG4gIGlmIChkZXJpdmF0aW9uICE9PSBudWxsKSB7XG4gICAgLyoqXG4gICAgICogU2ltcGxlIG9wdGltaXphdGlvbiwgZ2l2ZSBlYWNoIGRlcml2YXRpb24gcnVuIGFuIHVuaXF1ZSBpZCAocnVuSWQpXG4gICAgICogQ2hlY2sgaWYgbGFzdCB0aW1lIHRoaXMgb2JzZXJ2YWJsZSB3YXMgYWNjZXNzZWQgdGhlIHNhbWUgcnVuSWQgaXMgdXNlZFxuICAgICAqIGlmIHRoaXMgaXMgdGhlIGNhc2UsIHRoZSByZWxhdGlvbiBpcyBhbHJlYWR5IGtub3duXG4gICAgICovXG4gICAgaWYgKGRlcml2YXRpb24ucnVuSWRfICE9PSBvYnNlcnZhYmxlLmxhc3RBY2Nlc3NlZEJ5Xykge1xuICAgICAgb2JzZXJ2YWJsZS5sYXN0QWNjZXNzZWRCeV8gPSBkZXJpdmF0aW9uLnJ1bklkXztcbiAgICAgIC8vIFRyaWVkIHN0b3JpbmcgbmV3T2JzZXJ2aW5nLCBvciBvYnNlcnZpbmcsIG9yIGJvdGggYXMgU2V0LCBidXQgcGVyZm9ybWFuY2UgZGlkbid0IGNvbWUgY2xvc2UuLi5cbiAgICAgIGRlcml2YXRpb24ubmV3T2JzZXJ2aW5nX1tkZXJpdmF0aW9uLnVuYm91bmREZXBzQ291bnRfKytdID0gb2JzZXJ2YWJsZTtcbiAgICAgIGlmICghb2JzZXJ2YWJsZS5pc0JlaW5nT2JzZXJ2ZWRfICYmIGdsb2JhbFN0YXRlLnRyYWNraW5nQ29udGV4dCkge1xuICAgICAgICBvYnNlcnZhYmxlLmlzQmVpbmdPYnNlcnZlZF8gPSB0cnVlO1xuICAgICAgICBvYnNlcnZhYmxlLm9uQk8oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9ic2VydmFibGUuaXNCZWluZ09ic2VydmVkXztcbiAgfSBlbHNlIGlmIChvYnNlcnZhYmxlLm9ic2VydmVyc18uc2l6ZSA9PT0gMCAmJiBnbG9iYWxTdGF0ZS5pbkJhdGNoID4gMCkge1xuICAgIHF1ZXVlRm9yVW5vYnNlcnZhdGlvbihvYnNlcnZhYmxlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG4vLyBmdW5jdGlvbiBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZTogSU9ic2VydmFibGUsIG1zZzogc3RyaW5nKSB7XG4vLyAgICAgLy8gaXQncyBleHBlbnNpdmUgc28gYmV0dGVyIG5vdCBydW4gaXQgaW4gcHJvZHVjaXRvbi4gYnV0IHRlbXBvcmFyaWx5IGhlbHBmdWwgZm9yIHRlc3Rpbmdcbi8vICAgICBjb25zdCBtaW4gPSBnZXRPYnNlcnZlcnMob2JzZXJ2YWJsZSkucmVkdWNlKChhLCBiKSA9PiBNYXRoLm1pbihhLCBiLmRlcGVuZGVuY2llc1N0YXRlKSwgMilcbi8vICAgICBpZiAobWluID49IG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZSkgcmV0dXJuIC8vIDwtIHRoZSBvbmx5IGFzc3VtcHRpb24gYWJvdXQgYGxvd2VzdE9ic2VydmVyU3RhdGVgXG4vLyAgICAgdGhyb3cgbmV3IEVycm9yKFxuLy8gICAgICAgICBcImxvd2VzdE9ic2VydmVyU3RhdGUgaXMgd3JvbmcgZm9yIFwiICtcbi8vICAgICAgICAgICAgIG1zZyArXG4vLyAgICAgICAgICAgICBcIiBiZWNhdXNlIFwiICtcbi8vICAgICAgICAgICAgIG1pbiArXG4vLyAgICAgICAgICAgICBcIiA8IFwiICtcbi8vICAgICAgICAgICAgIG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZVxuLy8gICAgIClcbi8vIH1cbi8qKlxuICogTk9URTogY3VycmVudCBwcm9wYWdhdGlvbiBtZWNoYW5pc20gd2lsbCBpbiBjYXNlIG9mIHNlbGYgcmVydW5pbmcgYXV0b3J1bnMgYmVoYXZlIHVuZXhwZWN0ZWRseVxuICogSXQgd2lsbCBwcm9wYWdhdGUgY2hhbmdlcyB0byBvYnNlcnZlcnMgZnJvbSBwcmV2aW91cyBydW5cbiAqIEl0J3MgaGFyZCBvciBtYXliZSBpbXBvc3NpYmxlICh3aXRoIHJlYXNvbmFibGUgcGVyZikgdG8gZ2V0IGl0IHJpZ2h0IHdpdGggY3VycmVudCBhcHByb2FjaFxuICogSG9wZWZ1bGx5IHNlbGYgcmVydW5pbmcgYXV0b3J1bnMgYXJlbid0IGEgZmVhdHVyZSBwZW9wbGUgc2hvdWxkIGRlcGVuZCBvblxuICogQWxzbyBtb3N0IGJhc2ljIHVzZSBjYXNlcyBzaG91bGQgYmUgb2tcbiAqL1xuLy8gQ2FsbGVkIGJ5IEF0b20gd2hlbiBpdHMgdmFsdWUgY2hhbmdlc1xuZnVuY3Rpb24gcHJvcGFnYXRlQ2hhbmdlZChvYnNlcnZhYmxlKSB7XG4gIC8vIGludmFyaWFudExPUyhvYnNlcnZhYmxlLCBcImNoYW5nZWQgc3RhcnRcIik7XG4gIGlmIChvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGVfID09PSBJRGVyaXZhdGlvblN0YXRlXy5TVEFMRV8pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgb2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLlNUQUxFXztcbiAgLy8gSWRlYWxseSB3ZSB1c2UgZm9yLi5vZiBoZXJlLCBidXQgdGhlIGRvd25jb21waWxlZCB2ZXJzaW9uIGlzIHJlYWxseSBzbG93Li4uXG4gIG9ic2VydmFibGUub2JzZXJ2ZXJzXy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgaWYgKGQuZGVwZW5kZW5jaWVzU3RhdGVfID09PSBJRGVyaXZhdGlvblN0YXRlXy5VUF9UT19EQVRFXykge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBkLmlzVHJhY2luZ18gIT09IFRyYWNlTW9kZS5OT05FKSB7XG4gICAgICAgIGxvZ1RyYWNlSW5mbyhkLCBvYnNlcnZhYmxlKTtcbiAgICAgIH1cbiAgICAgIGQub25CZWNvbWVTdGFsZV8oKTtcbiAgICB9XG4gICAgZC5kZXBlbmRlbmNpZXNTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5TVEFMRV87XG4gIH0pO1xuICAvLyBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZSwgXCJjaGFuZ2VkIGVuZFwiKTtcbn1cbi8vIENhbGxlZCBieSBDb21wdXRlZFZhbHVlIHdoZW4gaXQgcmVjYWxjdWxhdGUgYW5kIGl0cyB2YWx1ZSBjaGFuZ2VkXG5mdW5jdGlvbiBwcm9wYWdhdGVDaGFuZ2VDb25maXJtZWQob2JzZXJ2YWJsZSkge1xuICAvLyBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZSwgXCJjb25maXJtZWQgc3RhcnRcIik7XG4gIGlmIChvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGVfID09PSBJRGVyaXZhdGlvblN0YXRlXy5TVEFMRV8pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgb2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLlNUQUxFXztcbiAgb2JzZXJ2YWJsZS5vYnNlcnZlcnNfLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICBpZiAoZC5kZXBlbmRlbmNpZXNTdGF0ZV8gPT09IElEZXJpdmF0aW9uU3RhdGVfLlBPU1NJQkxZX1NUQUxFXykge1xuICAgICAgZC5kZXBlbmRlbmNpZXNTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5TVEFMRV87XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGQuaXNUcmFjaW5nXyAhPT0gVHJhY2VNb2RlLk5PTkUpIHtcbiAgICAgICAgbG9nVHJhY2VJbmZvKGQsIG9ic2VydmFibGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZC5kZXBlbmRlbmNpZXNTdGF0ZV8gPT09IElEZXJpdmF0aW9uU3RhdGVfLlVQX1RPX0RBVEVfIC8vIHRoaXMgaGFwcGVucyBkdXJpbmcgY29tcHV0aW5nIG9mIGBkYCwganVzdCBrZWVwIGxvd2VzdE9ic2VydmVyU3RhdGUgdXAgdG8gZGF0ZS5cbiAgICApIHtcbiAgICAgIG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5VUF9UT19EQVRFXztcbiAgICB9XG4gIH0pO1xuICAvLyBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZSwgXCJjb25maXJtZWQgZW5kXCIpO1xufVxuLy8gVXNlZCBieSBjb21wdXRlZCB3aGVuIGl0cyBkZXBlbmRlbmN5IGNoYW5nZWQsIGJ1dCB3ZSBkb24ndCB3YW4ndCB0byBpbW1lZGlhdGVseSByZWNvbXB1dGUuXG5mdW5jdGlvbiBwcm9wYWdhdGVNYXliZUNoYW5nZWQob2JzZXJ2YWJsZSkge1xuICAvLyBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZSwgXCJtYXliZSBzdGFydFwiKTtcbiAgaWYgKG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZV8gIT09IElEZXJpdmF0aW9uU3RhdGVfLlVQX1RPX0RBVEVfKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5QT1NTSUJMWV9TVEFMRV87XG4gIG9ic2VydmFibGUub2JzZXJ2ZXJzXy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgaWYgKGQuZGVwZW5kZW5jaWVzU3RhdGVfID09PSBJRGVyaXZhdGlvblN0YXRlXy5VUF9UT19EQVRFXykge1xuICAgICAgZC5kZXBlbmRlbmNpZXNTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5QT1NTSUJMWV9TVEFMRV87XG4gICAgICBkLm9uQmVjb21lU3RhbGVfKCk7XG4gICAgfVxuICB9KTtcbiAgLy8gaW52YXJpYW50TE9TKG9ic2VydmFibGUsIFwibWF5YmUgZW5kXCIpO1xufVxuXG5mdW5jdGlvbiBsb2dUcmFjZUluZm8oZGVyaXZhdGlvbiwgb2JzZXJ2YWJsZSkge1xuICBjb25zb2xlLmxvZyhcIlttb2J4LnRyYWNlXSAnXCIgKyBkZXJpdmF0aW9uLm5hbWVfICsgXCInIGlzIGludmFsaWRhdGVkIGR1ZSB0byBhIGNoYW5nZSBpbjogJ1wiICsgb2JzZXJ2YWJsZS5uYW1lXyArIFwiJ1wiKTtcbiAgaWYgKGRlcml2YXRpb24uaXNUcmFjaW5nXyA9PT0gVHJhY2VNb2RlLkJSRUFLKSB7XG4gICAgdmFyIGxpbmVzID0gW107XG4gICAgcHJpbnREZXBUcmVlKGdldERlcGVuZGVuY3lUcmVlKGRlcml2YXRpb24pLCBsaW5lcywgMSk7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgbmV3IEZ1bmN0aW9uKFwiZGVidWdnZXI7XFxuLypcXG5UcmFjaW5nICdcIiArIGRlcml2YXRpb24ubmFtZV8gKyBcIidcXG5cXG5Zb3UgYXJlIGVudGVyaW5nIHRoaXMgYnJlYWsgcG9pbnQgYmVjYXVzZSBkZXJpdmF0aW9uICdcIiArIGRlcml2YXRpb24ubmFtZV8gKyBcIicgaXMgYmVpbmcgdHJhY2VkIGFuZCAnXCIgKyBvYnNlcnZhYmxlLm5hbWVfICsgXCInIGlzIG5vdyBmb3JjaW5nIGl0IHRvIHVwZGF0ZS5cXG5KdXN0IGZvbGxvdyB0aGUgc3RhY2t0cmFjZSB5b3Ugc2hvdWxkIG5vdyBzZWUgaW4gdGhlIGRldnRvb2xzIHRvIHNlZSBwcmVjaXNlbHkgd2hhdCBwaWVjZSBvZiB5b3VyIGNvZGUgaXMgY2F1c2luZyB0aGlzIHVwZGF0ZVxcblRoZSBzdGFja2ZyYW1lIHlvdSBhcmUgbG9va2luZyBmb3IgaXMgYXQgbGVhc3QgfjYtOCBzdGFjay1mcmFtZXMgdXAuXFxuXFxuXCIgKyAoZGVyaXZhdGlvbiBpbnN0YW5jZW9mIENvbXB1dGVkVmFsdWUgPyBkZXJpdmF0aW9uLmRlcml2YXRpb24udG9TdHJpbmcoKS5yZXBsYWNlKC9bKl1cXC8vZywgXCIvXCIpIDogXCJcIikgKyBcIlxcblxcblRoZSBkZXBlbmRlbmNpZXMgZm9yIHRoaXMgZGVyaXZhdGlvbiBhcmU6XFxuXFxuXCIgKyBsaW5lcy5qb2luKFwiXFxuXCIpICsgXCJcXG4qL1xcbiAgICBcIikoKTtcbiAgfVxufVxuZnVuY3Rpb24gcHJpbnREZXBUcmVlKHRyZWUsIGxpbmVzLCBkZXB0aCkge1xuICBpZiAobGluZXMubGVuZ3RoID49IDEwMDApIHtcbiAgICBsaW5lcy5wdXNoKFwiKGFuZCBtYW55IG1vcmUpXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBsaW5lcy5wdXNoKFwiXCIgKyBcIlxcdFwiLnJlcGVhdChkZXB0aCAtIDEpICsgdHJlZS5uYW1lKTtcbiAgaWYgKHRyZWUuZGVwZW5kZW5jaWVzKSB7XG4gICAgdHJlZS5kZXBlbmRlbmNpZXMuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgIHJldHVybiBwcmludERlcFRyZWUoY2hpbGQsIGxpbmVzLCBkZXB0aCArIDEpO1xuICAgIH0pO1xuICB9XG59XG5cbnZhciBSZWFjdGlvbiA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8vIG5vZGVzIHdlIGFyZSBsb29raW5nIGF0LiBPdXIgdmFsdWUgZGVwZW5kcyBvbiB0aGVzZSBub2Rlc1xuXG4gIGZ1bmN0aW9uIFJlYWN0aW9uKG5hbWVfLCBvbkludmFsaWRhdGVfLCBlcnJvckhhbmRsZXJfLCByZXF1aXJlc09ic2VydmFibGVfKSB7XG4gICAgaWYgKG5hbWVfID09PSB2b2lkIDApIHtcbiAgICAgIG5hbWVfID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJSZWFjdGlvbkBcIiArIGdldE5leHRJZCgpIDogXCJSZWFjdGlvblwiO1xuICAgIH1cbiAgICB0aGlzLm5hbWVfID0gdm9pZCAwO1xuICAgIHRoaXMub25JbnZhbGlkYXRlXyA9IHZvaWQgMDtcbiAgICB0aGlzLmVycm9ySGFuZGxlcl8gPSB2b2lkIDA7XG4gICAgdGhpcy5yZXF1aXJlc09ic2VydmFibGVfID0gdm9pZCAwO1xuICAgIHRoaXMub2JzZXJ2aW5nXyA9IFtdO1xuICAgIHRoaXMubmV3T2JzZXJ2aW5nXyA9IFtdO1xuICAgIHRoaXMuZGVwZW5kZW5jaWVzU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uTk9UX1RSQUNLSU5HXztcbiAgICB0aGlzLmRpZmZWYWx1ZV8gPSAwO1xuICAgIHRoaXMucnVuSWRfID0gMDtcbiAgICB0aGlzLnVuYm91bmREZXBzQ291bnRfID0gMDtcbiAgICB0aGlzLmlzRGlzcG9zZWRfID0gZmFsc2U7XG4gICAgdGhpcy5pc1NjaGVkdWxlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmlzVHJhY2tQZW5kaW5nXyA9IGZhbHNlO1xuICAgIHRoaXMuaXNSdW5uaW5nXyA9IGZhbHNlO1xuICAgIHRoaXMuaXNUcmFjaW5nXyA9IFRyYWNlTW9kZS5OT05FO1xuICAgIHRoaXMubmFtZV8gPSBuYW1lXztcbiAgICB0aGlzLm9uSW52YWxpZGF0ZV8gPSBvbkludmFsaWRhdGVfO1xuICAgIHRoaXMuZXJyb3JIYW5kbGVyXyA9IGVycm9ySGFuZGxlcl87XG4gICAgdGhpcy5yZXF1aXJlc09ic2VydmFibGVfID0gcmVxdWlyZXNPYnNlcnZhYmxlXztcbiAgfVxuICB2YXIgX3Byb3RvID0gUmVhY3Rpb24ucHJvdG90eXBlO1xuICBfcHJvdG8ub25CZWNvbWVTdGFsZV8gPSBmdW5jdGlvbiBvbkJlY29tZVN0YWxlXygpIHtcbiAgICB0aGlzLnNjaGVkdWxlXygpO1xuICB9O1xuICBfcHJvdG8uc2NoZWR1bGVfID0gZnVuY3Rpb24gc2NoZWR1bGVfKCkge1xuICAgIGlmICghdGhpcy5pc1NjaGVkdWxlZF8pIHtcbiAgICAgIHRoaXMuaXNTY2hlZHVsZWRfID0gdHJ1ZTtcbiAgICAgIGdsb2JhbFN0YXRlLnBlbmRpbmdSZWFjdGlvbnMucHVzaCh0aGlzKTtcbiAgICAgIHJ1blJlYWN0aW9ucygpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmlzU2NoZWR1bGVkID0gZnVuY3Rpb24gaXNTY2hlZHVsZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNTY2hlZHVsZWRfO1xuICB9XG4gIC8qKlxuICAgKiBpbnRlcm5hbCwgdXNlIHNjaGVkdWxlKCkgaWYgeW91IGludGVuZCB0byBraWNrIG9mZiBhIHJlYWN0aW9uXG4gICAqLztcbiAgX3Byb3RvLnJ1blJlYWN0aW9uXyA9IGZ1bmN0aW9uIHJ1blJlYWN0aW9uXygpIHtcbiAgICBpZiAoIXRoaXMuaXNEaXNwb3NlZF8pIHtcbiAgICAgIHN0YXJ0QmF0Y2goKTtcbiAgICAgIHRoaXMuaXNTY2hlZHVsZWRfID0gZmFsc2U7XG4gICAgICB2YXIgcHJldiA9IGdsb2JhbFN0YXRlLnRyYWNraW5nQ29udGV4dDtcbiAgICAgIGdsb2JhbFN0YXRlLnRyYWNraW5nQ29udGV4dCA9IHRoaXM7XG4gICAgICBpZiAoc2hvdWxkQ29tcHV0ZSh0aGlzKSkge1xuICAgICAgICB0aGlzLmlzVHJhY2tQZW5kaW5nXyA9IHRydWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5vbkludmFsaWRhdGVfKCk7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiB0aGlzLmlzVHJhY2tQZW5kaW5nXyAmJiBpc1NweUVuYWJsZWQoKSkge1xuICAgICAgICAgICAgLy8gb25JbnZhbGlkYXRlIGRpZG4ndCB0cmlnZ2VyIHRyYWNrIHJpZ2h0IGF3YXkuLlxuICAgICAgICAgICAgc3B5UmVwb3J0KHtcbiAgICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lXyxcbiAgICAgICAgICAgICAgdHlwZTogXCJzY2hlZHVsZWQtcmVhY3Rpb25cIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGhpcy5yZXBvcnRFeGNlcHRpb25JbkRlcml2YXRpb25fKGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBnbG9iYWxTdGF0ZS50cmFja2luZ0NvbnRleHQgPSBwcmV2O1xuICAgICAgZW5kQmF0Y2goKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by50cmFjayA9IGZ1bmN0aW9uIHRyYWNrKGZuKSB7XG4gICAgaWYgKHRoaXMuaXNEaXNwb3NlZF8pIHtcbiAgICAgIHJldHVybjtcbiAgICAgIC8vIGNvbnNvbGUud2FybihcIlJlYWN0aW9uIGFscmVhZHkgZGlzcG9zZWRcIikgLy8gTm90ZTogTm90IGEgd2FybmluZyAvIGVycm9yIGluIG1vYnggNCBlaXRoZXJcbiAgICB9XG5cbiAgICBzdGFydEJhdGNoKCk7XG4gICAgdmFyIG5vdGlmeSA9IGlzU3B5RW5hYmxlZCgpO1xuICAgIHZhciBzdGFydFRpbWU7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnkpIHtcbiAgICAgIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICBzcHlSZXBvcnRTdGFydCh7XG4gICAgICAgIG5hbWU6IHRoaXMubmFtZV8sXG4gICAgICAgIHR5cGU6IFwicmVhY3Rpb25cIlxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuaXNSdW5uaW5nXyA9IHRydWU7XG4gICAgdmFyIHByZXZSZWFjdGlvbiA9IGdsb2JhbFN0YXRlLnRyYWNraW5nQ29udGV4dDsgLy8gcmVhY3Rpb25zIGNvdWxkIGNyZWF0ZSByZWFjdGlvbnMuLi5cbiAgICBnbG9iYWxTdGF0ZS50cmFja2luZ0NvbnRleHQgPSB0aGlzO1xuICAgIHZhciByZXN1bHQgPSB0cmFja0Rlcml2ZWRGdW5jdGlvbih0aGlzLCBmbiwgdW5kZWZpbmVkKTtcbiAgICBnbG9iYWxTdGF0ZS50cmFja2luZ0NvbnRleHQgPSBwcmV2UmVhY3Rpb247XG4gICAgdGhpcy5pc1J1bm5pbmdfID0gZmFsc2U7XG4gICAgdGhpcy5pc1RyYWNrUGVuZGluZ18gPSBmYWxzZTtcbiAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkXykge1xuICAgICAgLy8gZGlzcG9zZWQgZHVyaW5nIGxhc3QgcnVuLiBDbGVhbiB1cCBldmVyeXRoaW5nIHRoYXQgd2FzIGJvdW5kIGFmdGVyIHRoZSBkaXNwb3NlIGNhbGwuXG4gICAgICBjbGVhck9ic2VydmluZyh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGlzQ2F1Z2h0RXhjZXB0aW9uKHJlc3VsdCkpIHtcbiAgICAgIHRoaXMucmVwb3J0RXhjZXB0aW9uSW5EZXJpdmF0aW9uXyhyZXN1bHQuY2F1c2UpO1xuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeSkge1xuICAgICAgc3B5UmVwb3J0RW5kKHtcbiAgICAgICAgdGltZTogRGF0ZS5ub3coKSAtIHN0YXJ0VGltZVxuICAgICAgfSk7XG4gICAgfVxuICAgIGVuZEJhdGNoKCk7XG4gIH07XG4gIF9wcm90by5yZXBvcnRFeGNlcHRpb25JbkRlcml2YXRpb25fID0gZnVuY3Rpb24gcmVwb3J0RXhjZXB0aW9uSW5EZXJpdmF0aW9uXyhlcnJvcikge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgaWYgKHRoaXMuZXJyb3JIYW5kbGVyXykge1xuICAgICAgdGhpcy5lcnJvckhhbmRsZXJfKGVycm9yLCB0aGlzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGdsb2JhbFN0YXRlLmRpc2FibGVFcnJvckJvdW5kYXJpZXMpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgICB2YXIgbWVzc2FnZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiW21vYnhdIEVuY291bnRlcmVkIGFuIHVuY2F1Z2h0IGV4Y2VwdGlvbiB0aGF0IHdhcyB0aHJvd24gYnkgYSByZWFjdGlvbiBvciBvYnNlcnZlciBjb21wb25lbnQsIGluOiAnXCIgKyB0aGlzICsgXCInXCIgOiBcIlttb2J4XSB1bmNhdWdodCBlcnJvciBpbiAnXCIgKyB0aGlzICsgXCInXCI7XG4gICAgaWYgKCFnbG9iYWxTdGF0ZS5zdXBwcmVzc1JlYWN0aW9uRXJyb3JzKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UsIGVycm9yKTtcbiAgICAgIC8qKiBJZiBkZWJ1Z2dpbmcgYnJvdWdodCB5b3UgaGVyZSwgcGxlYXNlLCByZWFkIHRoZSBhYm92ZSBtZXNzYWdlIDotKS4gVG54ISAqL1xuICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJbbW9ieF0gKGVycm9yIGluIHJlYWN0aW9uICdcIiArIHRoaXMubmFtZV8gKyBcIicgc3VwcHJlc3NlZCwgZml4IGVycm9yIG9mIGNhdXNpbmcgYWN0aW9uIGJlbG93KVwiKTtcbiAgICB9IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgaXNTcHlFbmFibGVkKCkpIHtcbiAgICAgIHNweVJlcG9ydCh7XG4gICAgICAgIHR5cGU6IFwiZXJyb3JcIixcbiAgICAgICAgbmFtZTogdGhpcy5uYW1lXyxcbiAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgZXJyb3I6IFwiXCIgKyBlcnJvclxuICAgICAgfSk7XG4gICAgfVxuICAgIGdsb2JhbFN0YXRlLmdsb2JhbFJlYWN0aW9uRXJyb3JIYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChmKSB7XG4gICAgICByZXR1cm4gZihlcnJvciwgX3RoaXMpO1xuICAgIH0pO1xuICB9O1xuICBfcHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgaWYgKCF0aGlzLmlzRGlzcG9zZWRfKSB7XG4gICAgICB0aGlzLmlzRGlzcG9zZWRfID0gdHJ1ZTtcbiAgICAgIGlmICghdGhpcy5pc1J1bm5pbmdfKSB7XG4gICAgICAgIC8vIGlmIGRpc3Bvc2VkIHdoaWxlIHJ1bm5pbmcsIGNsZWFuIHVwIGxhdGVyLiBNYXliZSBub3Qgb3B0aW1hbCwgYnV0IHJhcmUgY2FzZVxuICAgICAgICBzdGFydEJhdGNoKCk7XG4gICAgICAgIGNsZWFyT2JzZXJ2aW5nKHRoaXMpO1xuICAgICAgICBlbmRCYXRjaCgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmdldERpc3Bvc2VyXyA9IGZ1bmN0aW9uIGdldERpc3Bvc2VyXyhhYm9ydFNpZ25hbCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgIHZhciBkaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgIF90aGlzMi5kaXNwb3NlKCk7XG4gICAgICBhYm9ydFNpZ25hbCA9PSBudWxsID8gdm9pZCAwIDogYWJvcnRTaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PSBudWxsID8gdm9pZCAwIDogYWJvcnRTaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGRpc3Bvc2UpO1xuICAgIH07XG4gICAgYWJvcnRTaWduYWwgPT0gbnVsbCA/IHZvaWQgMCA6IGFib3J0U2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIgPT0gbnVsbCA/IHZvaWQgMCA6IGFib3J0U2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBkaXNwb3NlKTtcbiAgICBkaXNwb3NlWyRtb2J4XSA9IHRoaXM7XG4gICAgcmV0dXJuIGRpc3Bvc2U7XG4gIH07XG4gIF9wcm90by50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBcIlJlYWN0aW9uW1wiICsgdGhpcy5uYW1lXyArIFwiXVwiO1xuICB9O1xuICBfcHJvdG8udHJhY2UgPSBmdW5jdGlvbiB0cmFjZSQxKGVudGVyQnJlYWtQb2ludCkge1xuICAgIGlmIChlbnRlckJyZWFrUG9pbnQgPT09IHZvaWQgMCkge1xuICAgICAgZW50ZXJCcmVha1BvaW50ID0gZmFsc2U7XG4gICAgfVxuICAgIHRyYWNlKHRoaXMsIGVudGVyQnJlYWtQb2ludCk7XG4gIH07XG4gIHJldHVybiBSZWFjdGlvbjtcbn0oKTtcbmZ1bmN0aW9uIG9uUmVhY3Rpb25FcnJvcihoYW5kbGVyKSB7XG4gIGdsb2JhbFN0YXRlLmdsb2JhbFJlYWN0aW9uRXJyb3JIYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpZHggPSBnbG9iYWxTdGF0ZS5nbG9iYWxSZWFjdGlvbkVycm9ySGFuZGxlcnMuaW5kZXhPZihoYW5kbGVyKTtcbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGdsb2JhbFN0YXRlLmdsb2JhbFJlYWN0aW9uRXJyb3JIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gIH07XG59XG4vKipcbiAqIE1hZ2ljIG51bWJlciBhbGVydCFcbiAqIERlZmluZXMgd2l0aGluIGhvdyBtYW55IHRpbWVzIGEgcmVhY3Rpb24gaXMgYWxsb3dlZCB0byByZS10cmlnZ2VyIGl0c2VsZlxuICogdW50aWwgaXQgaXMgYXNzdW1lZCB0aGF0IHRoaXMgaXMgZ29ubmEgYmUgYSBuZXZlciBlbmRpbmcgbG9vcC4uLlxuICovXG52YXIgTUFYX1JFQUNUSU9OX0lURVJBVElPTlMgPSAxMDA7XG52YXIgcmVhY3Rpb25TY2hlZHVsZXIgPSBmdW5jdGlvbiByZWFjdGlvblNjaGVkdWxlcihmKSB7XG4gIHJldHVybiBmKCk7XG59O1xuZnVuY3Rpb24gcnVuUmVhY3Rpb25zKCkge1xuICAvLyBUcmFtcG9saW5pbmcsIGlmIHJ1blJlYWN0aW9ucyBhcmUgYWxyZWFkeSBydW5uaW5nLCBuZXcgcmVhY3Rpb25zIHdpbGwgYmUgcGlja2VkIHVwXG4gIGlmIChnbG9iYWxTdGF0ZS5pbkJhdGNoID4gMCB8fCBnbG9iYWxTdGF0ZS5pc1J1bm5pbmdSZWFjdGlvbnMpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgcmVhY3Rpb25TY2hlZHVsZXIocnVuUmVhY3Rpb25zSGVscGVyKTtcbn1cbmZ1bmN0aW9uIHJ1blJlYWN0aW9uc0hlbHBlcigpIHtcbiAgZ2xvYmFsU3RhdGUuaXNSdW5uaW5nUmVhY3Rpb25zID0gdHJ1ZTtcbiAgdmFyIGFsbFJlYWN0aW9ucyA9IGdsb2JhbFN0YXRlLnBlbmRpbmdSZWFjdGlvbnM7XG4gIHZhciBpdGVyYXRpb25zID0gMDtcbiAgLy8gV2hpbGUgcnVubmluZyByZWFjdGlvbnMsIG5ldyByZWFjdGlvbnMgbWlnaHQgYmUgdHJpZ2dlcmVkLlxuICAvLyBIZW5jZSB3ZSB3b3JrIHdpdGggdHdvIHZhcmlhYmxlcyBhbmQgY2hlY2sgd2hldGhlclxuICAvLyB3ZSBjb252ZXJnZSB0byBubyByZW1haW5pbmcgcmVhY3Rpb25zIGFmdGVyIGEgd2hpbGUuXG4gIHdoaWxlIChhbGxSZWFjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgIGlmICgrK2l0ZXJhdGlvbnMgPT09IE1BWF9SRUFDVElPTl9JVEVSQVRJT05TKSB7XG4gICAgICBjb25zb2xlLmVycm9yKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiUmVhY3Rpb24gZG9lc24ndCBjb252ZXJnZSB0byBhIHN0YWJsZSBzdGF0ZSBhZnRlciBcIiArIE1BWF9SRUFDVElPTl9JVEVSQVRJT05TICsgXCIgaXRlcmF0aW9ucy5cIiArIChcIiBQcm9iYWJseSB0aGVyZSBpcyBhIGN5Y2xlIGluIHRoZSByZWFjdGl2ZSBmdW5jdGlvbjogXCIgKyBhbGxSZWFjdGlvbnNbMF0pIDogXCJbbW9ieF0gY3ljbGUgaW4gcmVhY3Rpb246IFwiICsgYWxsUmVhY3Rpb25zWzBdKTtcbiAgICAgIGFsbFJlYWN0aW9ucy5zcGxpY2UoMCk7IC8vIGNsZWFyIHJlYWN0aW9uc1xuICAgIH1cblxuICAgIHZhciByZW1haW5pbmdSZWFjdGlvbnMgPSBhbGxSZWFjdGlvbnMuc3BsaWNlKDApO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gcmVtYWluaW5nUmVhY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgcmVtYWluaW5nUmVhY3Rpb25zW2ldLnJ1blJlYWN0aW9uXygpO1xuICAgIH1cbiAgfVxuICBnbG9iYWxTdGF0ZS5pc1J1bm5pbmdSZWFjdGlvbnMgPSBmYWxzZTtcbn1cbnZhciBpc1JlYWN0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUoXCJSZWFjdGlvblwiLCBSZWFjdGlvbik7XG5mdW5jdGlvbiBzZXRSZWFjdGlvblNjaGVkdWxlcihmbikge1xuICB2YXIgYmFzZVNjaGVkdWxlciA9IHJlYWN0aW9uU2NoZWR1bGVyO1xuICByZWFjdGlvblNjaGVkdWxlciA9IGZ1bmN0aW9uIHJlYWN0aW9uU2NoZWR1bGVyKGYpIHtcbiAgICByZXR1cm4gZm4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGJhc2VTY2hlZHVsZXIoZik7XG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGlzU3B5RW5hYmxlZCgpIHtcbiAgcmV0dXJuIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhIWdsb2JhbFN0YXRlLnNweUxpc3RlbmVycy5sZW5ndGg7XG59XG5mdW5jdGlvbiBzcHlSZXBvcnQoZXZlbnQpIHtcbiAgaWYgKCEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHJldHVybjtcbiAgfSAvLyBkZWFkIGNvZGUgZWxpbWluYXRpb24gY2FuIGRvIHRoZSByZXN0XG4gIGlmICghZ2xvYmFsU3RhdGUuc3B5TGlzdGVuZXJzLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGlzdGVuZXJzID0gZ2xvYmFsU3RhdGUuc3B5TGlzdGVuZXJzO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBsaXN0ZW5lcnNbaV0oZXZlbnQpO1xuICB9XG59XG5mdW5jdGlvbiBzcHlSZXBvcnRTdGFydChldmVudCkge1xuICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBjaGFuZ2UgPSBfZXh0ZW5kcyh7fSwgZXZlbnQsIHtcbiAgICBzcHlSZXBvcnRTdGFydDogdHJ1ZVxuICB9KTtcbiAgc3B5UmVwb3J0KGNoYW5nZSk7XG59XG52YXIgRU5EX0VWRU5UID0ge1xuICB0eXBlOiBcInJlcG9ydC1lbmRcIixcbiAgc3B5UmVwb3J0RW5kOiB0cnVlXG59O1xuZnVuY3Rpb24gc3B5UmVwb3J0RW5kKGNoYW5nZSkge1xuICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjaGFuZ2UpIHtcbiAgICBzcHlSZXBvcnQoX2V4dGVuZHMoe30sIGNoYW5nZSwge1xuICAgICAgdHlwZTogXCJyZXBvcnQtZW5kXCIsXG4gICAgICBzcHlSZXBvcnRFbmQ6IHRydWVcbiAgICB9KSk7XG4gIH0gZWxzZSB7XG4gICAgc3B5UmVwb3J0KEVORF9FVkVOVCk7XG4gIH1cbn1cbmZ1bmN0aW9uIHNweShsaXN0ZW5lcikge1xuICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgY29uc29sZS53YXJuKFwiW21vYnguc3B5XSBJcyBhIG5vLW9wIGluIHByb2R1Y3Rpb24gYnVpbGRzXCIpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7fTtcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWxTdGF0ZS5zcHlMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgcmV0dXJuIG9uY2UoZnVuY3Rpb24gKCkge1xuICAgICAgZ2xvYmFsU3RhdGUuc3B5TGlzdGVuZXJzID0gZ2xvYmFsU3RhdGUuc3B5TGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAobCkge1xuICAgICAgICByZXR1cm4gbCAhPT0gbGlzdGVuZXI7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG52YXIgQUNUSU9OID0gXCJhY3Rpb25cIjtcbnZhciBBQ1RJT05fQk9VTkQgPSBcImFjdGlvbi5ib3VuZFwiO1xudmFyIEFVVE9BQ1RJT04gPSBcImF1dG9BY3Rpb25cIjtcbnZhciBBVVRPQUNUSU9OX0JPVU5EID0gXCJhdXRvQWN0aW9uLmJvdW5kXCI7XG52YXIgREVGQVVMVF9BQ1RJT05fTkFNRSA9IFwiPHVubmFtZWQgYWN0aW9uPlwiO1xudmFyIGFjdGlvbkFubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlQWN0aW9uQW5ub3RhdGlvbihBQ1RJT04pO1xudmFyIGFjdGlvbkJvdW5kQW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVBY3Rpb25Bbm5vdGF0aW9uKEFDVElPTl9CT1VORCwge1xuICBib3VuZDogdHJ1ZVxufSk7XG52YXIgYXV0b0FjdGlvbkFubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlQWN0aW9uQW5ub3RhdGlvbihBVVRPQUNUSU9OLCB7XG4gIGF1dG9BY3Rpb246IHRydWVcbn0pO1xudmFyIGF1dG9BY3Rpb25Cb3VuZEFubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlQWN0aW9uQW5ub3RhdGlvbihBVVRPQUNUSU9OX0JPVU5ELCB7XG4gIGF1dG9BY3Rpb246IHRydWUsXG4gIGJvdW5kOiB0cnVlXG59KTtcbmZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkZhY3RvcnkoYXV0b0FjdGlvbikge1xuICB2YXIgcmVzID0gZnVuY3Rpb24gYWN0aW9uKGFyZzEsIGFyZzIpIHtcbiAgICAvLyBhY3Rpb24oZm4oKSB7fSlcbiAgICBpZiAoaXNGdW5jdGlvbihhcmcxKSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUFjdGlvbihhcmcxLm5hbWUgfHwgREVGQVVMVF9BQ1RJT05fTkFNRSwgYXJnMSwgYXV0b0FjdGlvbik7XG4gICAgfVxuICAgIC8vIGFjdGlvbihcIm5hbWVcIiwgZm4oKSB7fSlcbiAgICBpZiAoaXNGdW5jdGlvbihhcmcyKSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUFjdGlvbihhcmcxLCBhcmcyLCBhdXRvQWN0aW9uKTtcbiAgICB9XG4gICAgLy8gQGFjdGlvbiAoMjAyMi4zIERlY29yYXRvcnMpXG4gICAgaWYgKGlzMjAyMjNEZWNvcmF0b3IoYXJnMikpIHtcbiAgICAgIHJldHVybiAoYXV0b0FjdGlvbiA/IGF1dG9BY3Rpb25Bbm5vdGF0aW9uIDogYWN0aW9uQW5ub3RhdGlvbikuZGVjb3JhdGVfMjAyMjNfKGFyZzEsIGFyZzIpO1xuICAgIH1cbiAgICAvLyBAYWN0aW9uXG4gICAgaWYgKGlzU3RyaW5naXNoKGFyZzIpKSB7XG4gICAgICByZXR1cm4gc3RvcmVBbm5vdGF0aW9uKGFyZzEsIGFyZzIsIGF1dG9BY3Rpb24gPyBhdXRvQWN0aW9uQW5ub3RhdGlvbiA6IGFjdGlvbkFubm90YXRpb24pO1xuICAgIH1cbiAgICAvLyBhY3Rpb24oXCJuYW1lXCIpICYgQGFjdGlvbihcIm5hbWVcIilcbiAgICBpZiAoaXNTdHJpbmdpc2goYXJnMSkpIHtcbiAgICAgIHJldHVybiBjcmVhdGVEZWNvcmF0b3JBbm5vdGF0aW9uKGNyZWF0ZUFjdGlvbkFubm90YXRpb24oYXV0b0FjdGlvbiA/IEFVVE9BQ1RJT04gOiBBQ1RJT04sIHtcbiAgICAgICAgbmFtZTogYXJnMSxcbiAgICAgICAgYXV0b0FjdGlvbjogYXV0b0FjdGlvblxuICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICBkaWUoXCJJbnZhbGlkIGFyZ3VtZW50cyBmb3IgYGFjdGlvbmBcIik7XG4gICAgfVxuICB9O1xuICByZXR1cm4gcmVzO1xufVxudmFyIGFjdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVBY3Rpb25GYWN0b3J5KGZhbHNlKTtcbk9iamVjdC5hc3NpZ24oYWN0aW9uLCBhY3Rpb25Bbm5vdGF0aW9uKTtcbnZhciBhdXRvQWN0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUFjdGlvbkZhY3RvcnkodHJ1ZSk7XG5PYmplY3QuYXNzaWduKGF1dG9BY3Rpb24sIGF1dG9BY3Rpb25Bbm5vdGF0aW9uKTtcbmFjdGlvbi5ib3VuZCA9IC8qI19fUFVSRV9fKi9jcmVhdGVEZWNvcmF0b3JBbm5vdGF0aW9uKGFjdGlvbkJvdW5kQW5ub3RhdGlvbik7XG5hdXRvQWN0aW9uLmJvdW5kID0gLyojX19QVVJFX18qL2NyZWF0ZURlY29yYXRvckFubm90YXRpb24oYXV0b0FjdGlvbkJvdW5kQW5ub3RhdGlvbik7XG5mdW5jdGlvbiBydW5JbkFjdGlvbihmbikge1xuICByZXR1cm4gZXhlY3V0ZUFjdGlvbihmbi5uYW1lIHx8IERFRkFVTFRfQUNUSU9OX05BTUUsIGZhbHNlLCBmbiwgdGhpcywgdW5kZWZpbmVkKTtcbn1cbmZ1bmN0aW9uIGlzQWN0aW9uKHRoaW5nKSB7XG4gIHJldHVybiBpc0Z1bmN0aW9uKHRoaW5nKSAmJiB0aGluZy5pc01vYnhBY3Rpb24gPT09IHRydWU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5hbWVkIHJlYWN0aXZlIHZpZXcgYW5kIGtlZXBzIGl0IGFsaXZlLCBzbyB0aGF0IHRoZSB2aWV3IGlzIGFsd2F5c1xuICogdXBkYXRlZCBpZiBvbmUgb2YgdGhlIGRlcGVuZGVuY2llcyBjaGFuZ2VzLCBldmVuIHdoZW4gdGhlIHZpZXcgaXMgbm90IGZ1cnRoZXIgdXNlZCBieSBzb21ldGhpbmcgZWxzZS5cbiAqIEBwYXJhbSB2aWV3IFRoZSByZWFjdGl2ZSB2aWV3XG4gKiBAcmV0dXJucyBkaXNwb3NlciBmdW5jdGlvbiwgd2hpY2ggY2FuIGJlIHVzZWQgdG8gc3RvcCB0aGUgdmlldyBmcm9tIGJlaW5nIHVwZGF0ZWQgaW4gdGhlIGZ1dHVyZS5cbiAqL1xuZnVuY3Rpb24gYXV0b3J1bih2aWV3LCBvcHRzKSB7XG4gIHZhciBfb3B0cyRuYW1lLCBfb3B0cywgX29wdHMyLCBfb3B0czIkc2lnbmFsLCBfb3B0czM7XG4gIGlmIChvcHRzID09PSB2b2lkIDApIHtcbiAgICBvcHRzID0gRU1QVFlfT0JKRUNUO1xuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAoIWlzRnVuY3Rpb24odmlldykpIHtcbiAgICAgIGRpZShcIkF1dG9ydW4gZXhwZWN0cyBhIGZ1bmN0aW9uIGFzIGZpcnN0IGFyZ3VtZW50XCIpO1xuICAgIH1cbiAgICBpZiAoaXNBY3Rpb24odmlldykpIHtcbiAgICAgIGRpZShcIkF1dG9ydW4gZG9lcyBub3QgYWNjZXB0IGFjdGlvbnMgc2luY2UgYWN0aW9ucyBhcmUgdW50cmFja2FibGVcIik7XG4gICAgfVxuICB9XG4gIHZhciBuYW1lID0gKF9vcHRzJG5hbWUgPSAoX29wdHMgPSBvcHRzKSA9PSBudWxsID8gdm9pZCAwIDogX29wdHMubmFtZSkgIT0gbnVsbCA/IF9vcHRzJG5hbWUgOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB2aWV3Lm5hbWUgfHwgXCJBdXRvcnVuQFwiICsgZ2V0TmV4dElkKCkgOiBcIkF1dG9ydW5cIjtcbiAgdmFyIHJ1blN5bmMgPSAhb3B0cy5zY2hlZHVsZXIgJiYgIW9wdHMuZGVsYXk7XG4gIHZhciByZWFjdGlvbjtcbiAgaWYgKHJ1blN5bmMpIHtcbiAgICAvLyBub3JtYWwgYXV0b3J1blxuICAgIHJlYWN0aW9uID0gbmV3IFJlYWN0aW9uKG5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMudHJhY2socmVhY3Rpb25SdW5uZXIpO1xuICAgIH0sIG9wdHMub25FcnJvciwgb3B0cy5yZXF1aXJlc09ic2VydmFibGUpO1xuICB9IGVsc2Uge1xuICAgIHZhciBzY2hlZHVsZXIgPSBjcmVhdGVTY2hlZHVsZXJGcm9tT3B0aW9ucyhvcHRzKTtcbiAgICAvLyBkZWJvdW5jZWQgYXV0b3J1blxuICAgIHZhciBpc1NjaGVkdWxlZCA9IGZhbHNlO1xuICAgIHJlYWN0aW9uID0gbmV3IFJlYWN0aW9uKG5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghaXNTY2hlZHVsZWQpIHtcbiAgICAgICAgaXNTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICBzY2hlZHVsZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlzU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgICAgaWYgKCFyZWFjdGlvbi5pc0Rpc3Bvc2VkXykge1xuICAgICAgICAgICAgcmVhY3Rpb24udHJhY2socmVhY3Rpb25SdW5uZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgb3B0cy5vbkVycm9yLCBvcHRzLnJlcXVpcmVzT2JzZXJ2YWJsZSk7XG4gIH1cbiAgZnVuY3Rpb24gcmVhY3Rpb25SdW5uZXIoKSB7XG4gICAgdmlldyhyZWFjdGlvbik7XG4gIH1cbiAgaWYgKCEoKF9vcHRzMiA9IG9wdHMpICE9IG51bGwgJiYgKF9vcHRzMiRzaWduYWwgPSBfb3B0czIuc2lnbmFsKSAhPSBudWxsICYmIF9vcHRzMiRzaWduYWwuYWJvcnRlZCkpIHtcbiAgICByZWFjdGlvbi5zY2hlZHVsZV8oKTtcbiAgfVxuICByZXR1cm4gcmVhY3Rpb24uZ2V0RGlzcG9zZXJfKChfb3B0czMgPSBvcHRzKSA9PSBudWxsID8gdm9pZCAwIDogX29wdHMzLnNpZ25hbCk7XG59XG52YXIgcnVuID0gZnVuY3Rpb24gcnVuKGYpIHtcbiAgcmV0dXJuIGYoKTtcbn07XG5mdW5jdGlvbiBjcmVhdGVTY2hlZHVsZXJGcm9tT3B0aW9ucyhvcHRzKSB7XG4gIHJldHVybiBvcHRzLnNjaGVkdWxlciA/IG9wdHMuc2NoZWR1bGVyIDogb3B0cy5kZWxheSA/IGZ1bmN0aW9uIChmKSB7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZiwgb3B0cy5kZWxheSk7XG4gIH0gOiBydW47XG59XG5mdW5jdGlvbiByZWFjdGlvbihleHByZXNzaW9uLCBlZmZlY3QsIG9wdHMpIHtcbiAgdmFyIF9vcHRzJG5hbWUyLCBfb3B0czQsIF9vcHRzNCRzaWduYWwsIF9vcHRzNTtcbiAgaWYgKG9wdHMgPT09IHZvaWQgMCkge1xuICAgIG9wdHMgPSBFTVBUWV9PQkpFQ1Q7XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGlmICghaXNGdW5jdGlvbihleHByZXNzaW9uKSB8fCAhaXNGdW5jdGlvbihlZmZlY3QpKSB7XG4gICAgICBkaWUoXCJGaXJzdCBhbmQgc2Vjb25kIGFyZ3VtZW50IHRvIHJlYWN0aW9uIHNob3VsZCBiZSBmdW5jdGlvbnNcIik7XG4gICAgfVxuICAgIGlmICghaXNQbGFpbk9iamVjdChvcHRzKSkge1xuICAgICAgZGllKFwiVGhpcmQgYXJndW1lbnQgb2YgcmVhY3Rpb25zIHNob3VsZCBiZSBhbiBvYmplY3RcIik7XG4gICAgfVxuICB9XG4gIHZhciBuYW1lID0gKF9vcHRzJG5hbWUyID0gb3B0cy5uYW1lKSAhPSBudWxsID8gX29wdHMkbmFtZTIgOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcIlJlYWN0aW9uQFwiICsgZ2V0TmV4dElkKCkgOiBcIlJlYWN0aW9uXCI7XG4gIHZhciBlZmZlY3RBY3Rpb24gPSBhY3Rpb24obmFtZSwgb3B0cy5vbkVycm9yID8gd3JhcEVycm9ySGFuZGxlcihvcHRzLm9uRXJyb3IsIGVmZmVjdCkgOiBlZmZlY3QpO1xuICB2YXIgcnVuU3luYyA9ICFvcHRzLnNjaGVkdWxlciAmJiAhb3B0cy5kZWxheTtcbiAgdmFyIHNjaGVkdWxlciA9IGNyZWF0ZVNjaGVkdWxlckZyb21PcHRpb25zKG9wdHMpO1xuICB2YXIgZmlyc3RUaW1lID0gdHJ1ZTtcbiAgdmFyIGlzU2NoZWR1bGVkID0gZmFsc2U7XG4gIHZhciB2YWx1ZTtcbiAgdmFyIGVxdWFscyA9IG9wdHMuY29tcGFyZVN0cnVjdHVyYWwgPyBjb21wYXJlci5zdHJ1Y3R1cmFsIDogb3B0cy5lcXVhbHMgfHwgY29tcGFyZXJbXCJkZWZhdWx0XCJdO1xuICB2YXIgciA9IG5ldyBSZWFjdGlvbihuYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGZpcnN0VGltZSB8fCBydW5TeW5jKSB7XG4gICAgICByZWFjdGlvblJ1bm5lcigpO1xuICAgIH0gZWxzZSBpZiAoIWlzU2NoZWR1bGVkKSB7XG4gICAgICBpc1NjaGVkdWxlZCA9IHRydWU7XG4gICAgICBzY2hlZHVsZXIocmVhY3Rpb25SdW5uZXIpO1xuICAgIH1cbiAgfSwgb3B0cy5vbkVycm9yLCBvcHRzLnJlcXVpcmVzT2JzZXJ2YWJsZSk7XG4gIGZ1bmN0aW9uIHJlYWN0aW9uUnVubmVyKCkge1xuICAgIGlzU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgaWYgKHIuaXNEaXNwb3NlZF8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgb2xkVmFsdWUgPSB2YWx1ZTtcbiAgICByLnRyYWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBuZXh0VmFsdWUgPSBhbGxvd1N0YXRlQ2hhbmdlcyhmYWxzZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZXhwcmVzc2lvbihyKTtcbiAgICAgIH0pO1xuICAgICAgY2hhbmdlZCA9IGZpcnN0VGltZSB8fCAhZXF1YWxzKHZhbHVlLCBuZXh0VmFsdWUpO1xuICAgICAgdmFsdWUgPSBuZXh0VmFsdWU7XG4gICAgfSk7XG4gICAgaWYgKGZpcnN0VGltZSAmJiBvcHRzLmZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgZWZmZWN0QWN0aW9uKHZhbHVlLCBvbGRWYWx1ZSwgcik7XG4gICAgfSBlbHNlIGlmICghZmlyc3RUaW1lICYmIGNoYW5nZWQpIHtcbiAgICAgIGVmZmVjdEFjdGlvbih2YWx1ZSwgb2xkVmFsdWUsIHIpO1xuICAgIH1cbiAgICBmaXJzdFRpbWUgPSBmYWxzZTtcbiAgfVxuICBpZiAoISgoX29wdHM0ID0gb3B0cykgIT0gbnVsbCAmJiAoX29wdHM0JHNpZ25hbCA9IF9vcHRzNC5zaWduYWwpICE9IG51bGwgJiYgX29wdHM0JHNpZ25hbC5hYm9ydGVkKSkge1xuICAgIHIuc2NoZWR1bGVfKCk7XG4gIH1cbiAgcmV0dXJuIHIuZ2V0RGlzcG9zZXJfKChfb3B0czUgPSBvcHRzKSA9PSBudWxsID8gdm9pZCAwIDogX29wdHM1LnNpZ25hbCk7XG59XG5mdW5jdGlvbiB3cmFwRXJyb3JIYW5kbGVyKGVycm9ySGFuZGxlciwgYmFzZUZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBiYXNlRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlcnJvckhhbmRsZXIuY2FsbCh0aGlzLCBlKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBPTl9CRUNPTUVfT0JTRVJWRUQgPSBcIm9uQk9cIjtcbnZhciBPTl9CRUNPTUVfVU5PQlNFUlZFRCA9IFwib25CVU9cIjtcbmZ1bmN0aW9uIG9uQmVjb21lT2JzZXJ2ZWQodGhpbmcsIGFyZzIsIGFyZzMpIHtcbiAgcmV0dXJuIGludGVyY2VwdEhvb2soT05fQkVDT01FX09CU0VSVkVELCB0aGluZywgYXJnMiwgYXJnMyk7XG59XG5mdW5jdGlvbiBvbkJlY29tZVVub2JzZXJ2ZWQodGhpbmcsIGFyZzIsIGFyZzMpIHtcbiAgcmV0dXJuIGludGVyY2VwdEhvb2soT05fQkVDT01FX1VOT0JTRVJWRUQsIHRoaW5nLCBhcmcyLCBhcmczKTtcbn1cbmZ1bmN0aW9uIGludGVyY2VwdEhvb2soaG9vaywgdGhpbmcsIGFyZzIsIGFyZzMpIHtcbiAgdmFyIGF0b20gPSB0eXBlb2YgYXJnMyA9PT0gXCJmdW5jdGlvblwiID8gZ2V0QXRvbSh0aGluZywgYXJnMikgOiBnZXRBdG9tKHRoaW5nKTtcbiAgdmFyIGNiID0gaXNGdW5jdGlvbihhcmczKSA/IGFyZzMgOiBhcmcyO1xuICB2YXIgbGlzdGVuZXJzS2V5ID0gaG9vayArIFwiTFwiO1xuICBpZiAoYXRvbVtsaXN0ZW5lcnNLZXldKSB7XG4gICAgYXRvbVtsaXN0ZW5lcnNLZXldLmFkZChjYik7XG4gIH0gZWxzZSB7XG4gICAgYXRvbVtsaXN0ZW5lcnNLZXldID0gbmV3IFNldChbY2JdKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBob29rTGlzdGVuZXJzID0gYXRvbVtsaXN0ZW5lcnNLZXldO1xuICAgIGlmIChob29rTGlzdGVuZXJzKSB7XG4gICAgICBob29rTGlzdGVuZXJzW1wiZGVsZXRlXCJdKGNiKTtcbiAgICAgIGlmIChob29rTGlzdGVuZXJzLnNpemUgPT09IDApIHtcbiAgICAgICAgZGVsZXRlIGF0b21bbGlzdGVuZXJzS2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbnZhciBORVZFUiA9IFwibmV2ZXJcIjtcbnZhciBBTFdBWVMgPSBcImFsd2F5c1wiO1xudmFyIE9CU0VSVkVEID0gXCJvYnNlcnZlZFwiO1xuLy8gY29uc3QgSUZfQVZBSUxBQkxFID0gXCJpZmF2YWlsYWJsZVwiXG5mdW5jdGlvbiBjb25maWd1cmUob3B0aW9ucykge1xuICBpZiAob3B0aW9ucy5pc29sYXRlR2xvYmFsU3RhdGUgPT09IHRydWUpIHtcbiAgICBpc29sYXRlR2xvYmFsU3RhdGUoKTtcbiAgfVxuICB2YXIgdXNlUHJveGllcyA9IG9wdGlvbnMudXNlUHJveGllcyxcbiAgICBlbmZvcmNlQWN0aW9ucyA9IG9wdGlvbnMuZW5mb3JjZUFjdGlvbnM7XG4gIGlmICh1c2VQcm94aWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBnbG9iYWxTdGF0ZS51c2VQcm94aWVzID0gdXNlUHJveGllcyA9PT0gQUxXQVlTID8gdHJ1ZSA6IHVzZVByb3hpZXMgPT09IE5FVkVSID8gZmFsc2UgOiB0eXBlb2YgUHJveHkgIT09IFwidW5kZWZpbmVkXCI7XG4gIH1cbiAgaWYgKHVzZVByb3hpZXMgPT09IFwiaWZhdmFpbGFibGVcIikge1xuICAgIGdsb2JhbFN0YXRlLnZlcmlmeVByb3hpZXMgPSB0cnVlO1xuICB9XG4gIGlmIChlbmZvcmNlQWN0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGVhID0gZW5mb3JjZUFjdGlvbnMgPT09IEFMV0FZUyA/IEFMV0FZUyA6IGVuZm9yY2VBY3Rpb25zID09PSBPQlNFUlZFRDtcbiAgICBnbG9iYWxTdGF0ZS5lbmZvcmNlQWN0aW9ucyA9IGVhO1xuICAgIGdsb2JhbFN0YXRlLmFsbG93U3RhdGVDaGFuZ2VzID0gZWEgPT09IHRydWUgfHwgZWEgPT09IEFMV0FZUyA/IGZhbHNlIDogdHJ1ZTtcbiAgfVxuICBbXCJjb21wdXRlZFJlcXVpcmVzUmVhY3Rpb25cIiwgXCJyZWFjdGlvblJlcXVpcmVzT2JzZXJ2YWJsZVwiLCBcIm9ic2VydmFibGVSZXF1aXJlc1JlYWN0aW9uXCIsIFwiZGlzYWJsZUVycm9yQm91bmRhcmllc1wiLCBcInNhZmVEZXNjcmlwdG9yc1wiXS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBpZiAoa2V5IGluIG9wdGlvbnMpIHtcbiAgICAgIGdsb2JhbFN0YXRlW2tleV0gPSAhIW9wdGlvbnNba2V5XTtcbiAgICB9XG4gIH0pO1xuICBnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlUmVhZHMgPSAhZ2xvYmFsU3RhdGUub2JzZXJ2YWJsZVJlcXVpcmVzUmVhY3Rpb247XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgZ2xvYmFsU3RhdGUuZGlzYWJsZUVycm9yQm91bmRhcmllcyA9PT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUud2FybihcIldBUk5JTkc6IERlYnVnIGZlYXR1cmUgb25seS4gTW9iWCB3aWxsIE5PVCByZWNvdmVyIGZyb20gZXJyb3JzIHdoZW4gYGRpc2FibGVFcnJvckJvdW5kYXJpZXNgIGlzIGVuYWJsZWQuXCIpO1xuICB9XG4gIGlmIChvcHRpb25zLnJlYWN0aW9uU2NoZWR1bGVyKSB7XG4gICAgc2V0UmVhY3Rpb25TY2hlZHVsZXIob3B0aW9ucy5yZWFjdGlvblNjaGVkdWxlcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXh0ZW5kT2JzZXJ2YWJsZSh0YXJnZXQsIHByb3BlcnRpZXMsIGFubm90YXRpb25zLCBvcHRpb25zKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDQpIHtcbiAgICAgIGRpZShcIidleHRlbmRPYnNlcnZhYmxlJyBleHBlY3RlZCAyLTQgYXJndW1lbnRzXCIpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gXCJvYmplY3RcIikge1xuICAgICAgZGllKFwiJ2V4dGVuZE9ic2VydmFibGUnIGV4cGVjdHMgYW4gb2JqZWN0IGFzIGZpcnN0IGFyZ3VtZW50XCIpO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlTWFwKHRhcmdldCkpIHtcbiAgICAgIGRpZShcIidleHRlbmRPYnNlcnZhYmxlJyBzaG91bGQgbm90IGJlIHVzZWQgb24gbWFwcywgdXNlIG1hcC5tZXJnZSBpbnN0ZWFkXCIpO1xuICAgIH1cbiAgICBpZiAoIWlzUGxhaW5PYmplY3QocHJvcGVydGllcykpIHtcbiAgICAgIGRpZShcIidleHRlbmRPYnNlcnZhYmxlJyBvbmx5IGFjY2VwdHMgcGxhaW4gb2JqZWN0cyBhcyBzZWNvbmQgYXJndW1lbnRcIik7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGUocHJvcGVydGllcykgfHwgaXNPYnNlcnZhYmxlKGFubm90YXRpb25zKSkge1xuICAgICAgZGllKFwiRXh0ZW5kaW5nIGFuIG9iamVjdCB3aXRoIGFub3RoZXIgb2JzZXJ2YWJsZSAob2JqZWN0KSBpcyBub3Qgc3VwcG9ydGVkXCIpO1xuICAgIH1cbiAgfVxuICAvLyBQdWxsIGRlc2NyaXB0b3JzIGZpcnN0LCBzbyB3ZSBkb24ndCBoYXZlIHRvIGRlYWwgd2l0aCBwcm9wcyBhZGRlZCBieSBhZG1pbmlzdHJhdGlvbiAoJG1vYngpXG4gIHZhciBkZXNjcmlwdG9ycyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMocHJvcGVydGllcyk7XG4gIGluaXRPYnNlcnZhYmxlKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYWRtID0gYXNPYnNlcnZhYmxlT2JqZWN0KHRhcmdldCwgb3B0aW9ucylbJG1vYnhdO1xuICAgIG93bktleXMoZGVzY3JpcHRvcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgYWRtLmV4dGVuZF8oa2V5LCBkZXNjcmlwdG9yc1trZXldLFxuICAgICAgLy8gbXVzdCBwYXNzIFwidW5kZWZpbmVkXCIgZm9yIHsga2V5OiB1bmRlZmluZWQgfVxuICAgICAgIWFubm90YXRpb25zID8gdHJ1ZSA6IGtleSBpbiBhbm5vdGF0aW9ucyA/IGFubm90YXRpb25zW2tleV0gOiB0cnVlKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmZ1bmN0aW9uIGdldERlcGVuZGVuY3lUcmVlKHRoaW5nLCBwcm9wZXJ0eSkge1xuICByZXR1cm4gbm9kZVRvRGVwZW5kZW5jeVRyZWUoZ2V0QXRvbSh0aGluZywgcHJvcGVydHkpKTtcbn1cbmZ1bmN0aW9uIG5vZGVUb0RlcGVuZGVuY3lUcmVlKG5vZGUpIHtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICBuYW1lOiBub2RlLm5hbWVfXG4gIH07XG4gIGlmIChub2RlLm9ic2VydmluZ18gJiYgbm9kZS5vYnNlcnZpbmdfLmxlbmd0aCA+IDApIHtcbiAgICByZXN1bHQuZGVwZW5kZW5jaWVzID0gdW5pcXVlKG5vZGUub2JzZXJ2aW5nXykubWFwKG5vZGVUb0RlcGVuZGVuY3lUcmVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZ2V0T2JzZXJ2ZXJUcmVlKHRoaW5nLCBwcm9wZXJ0eSkge1xuICByZXR1cm4gbm9kZVRvT2JzZXJ2ZXJUcmVlKGdldEF0b20odGhpbmcsIHByb3BlcnR5KSk7XG59XG5mdW5jdGlvbiBub2RlVG9PYnNlcnZlclRyZWUobm9kZSkge1xuICB2YXIgcmVzdWx0ID0ge1xuICAgIG5hbWU6IG5vZGUubmFtZV9cbiAgfTtcbiAgaWYgKGhhc09ic2VydmVycyhub2RlKSkge1xuICAgIHJlc3VsdC5vYnNlcnZlcnMgPSBBcnJheS5mcm9tKGdldE9ic2VydmVycyhub2RlKSkubWFwKG5vZGVUb09ic2VydmVyVHJlZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHVuaXF1ZShsaXN0KSB7XG4gIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQobGlzdCkpO1xufVxuXG52YXIgZ2VuZXJhdG9ySWQgPSAwO1xuZnVuY3Rpb24gRmxvd0NhbmNlbGxhdGlvbkVycm9yKCkge1xuICB0aGlzLm1lc3NhZ2UgPSBcIkZMT1dfQ0FOQ0VMTEVEXCI7XG59XG5GbG93Q2FuY2VsbGF0aW9uRXJyb3IucHJvdG90eXBlID0gLyojX19QVVJFX18qL09iamVjdC5jcmVhdGUoRXJyb3IucHJvdG90eXBlKTtcbmZ1bmN0aW9uIGlzRmxvd0NhbmNlbGxhdGlvbkVycm9yKGVycm9yKSB7XG4gIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEZsb3dDYW5jZWxsYXRpb25FcnJvcjtcbn1cbnZhciBmbG93QW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVGbG93QW5ub3RhdGlvbihcImZsb3dcIik7XG52YXIgZmxvd0JvdW5kQW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVGbG93QW5ub3RhdGlvbihcImZsb3cuYm91bmRcIiwge1xuICBib3VuZDogdHJ1ZVxufSk7XG52YXIgZmxvdyA9IC8qI19fUFVSRV9fKi9PYmplY3QuYXNzaWduKGZ1bmN0aW9uIGZsb3coYXJnMSwgYXJnMikge1xuICAvLyBAZmxvdyAoMjAyMi4zIERlY29yYXRvcnMpXG4gIGlmIChpczIwMjIzRGVjb3JhdG9yKGFyZzIpKSB7XG4gICAgcmV0dXJuIGZsb3dBbm5vdGF0aW9uLmRlY29yYXRlXzIwMjIzXyhhcmcxLCBhcmcyKTtcbiAgfVxuICAvLyBAZmxvd1xuICBpZiAoaXNTdHJpbmdpc2goYXJnMikpIHtcbiAgICByZXR1cm4gc3RvcmVBbm5vdGF0aW9uKGFyZzEsIGFyZzIsIGZsb3dBbm5vdGF0aW9uKTtcbiAgfVxuICAvLyBmbG93KGZuKVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGFyZ3VtZW50cy5sZW5ndGggIT09IDEpIHtcbiAgICBkaWUoXCJGbG93IGV4cGVjdHMgc2luZ2xlIGFyZ3VtZW50IHdpdGggZ2VuZXJhdG9yIGZ1bmN0aW9uXCIpO1xuICB9XG4gIHZhciBnZW5lcmF0b3IgPSBhcmcxO1xuICB2YXIgbmFtZSA9IGdlbmVyYXRvci5uYW1lIHx8IFwiPHVubmFtZWQgZmxvdz5cIjtcbiAgLy8gSW1wbGVtZW50YXRpb24gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL3RqL2NvL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG4gIHZhciByZXMgPSBmdW5jdGlvbiByZXMoKSB7XG4gICAgdmFyIGN0eCA9IHRoaXM7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIHJ1bklkID0gKytnZW5lcmF0b3JJZDtcbiAgICB2YXIgZ2VuID0gYWN0aW9uKG5hbWUgKyBcIiAtIHJ1bmlkOiBcIiArIHJ1bklkICsgXCIgLSBpbml0XCIsIGdlbmVyYXRvcikuYXBwbHkoY3R4LCBhcmdzKTtcbiAgICB2YXIgcmVqZWN0b3I7XG4gICAgdmFyIHBlbmRpbmdQcm9taXNlID0gdW5kZWZpbmVkO1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIHN0ZXBJZCA9IDA7XG4gICAgICByZWplY3RvciA9IHJlamVjdDtcbiAgICAgIGZ1bmN0aW9uIG9uRnVsZmlsbGVkKHJlcykge1xuICAgICAgICBwZW5kaW5nUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIHJldDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXQgPSBhY3Rpb24obmFtZSArIFwiIC0gcnVuaWQ6IFwiICsgcnVuSWQgKyBcIiAtIHlpZWxkIFwiICsgc3RlcElkKyssIGdlbi5uZXh0KS5jYWxsKGdlbiwgcmVzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dChyZXQpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gb25SZWplY3RlZChlcnIpIHtcbiAgICAgICAgcGVuZGluZ1Byb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciByZXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0ID0gYWN0aW9uKG5hbWUgKyBcIiAtIHJ1bmlkOiBcIiArIHJ1bklkICsgXCIgLSB5aWVsZCBcIiArIHN0ZXBJZCsrLCBnZW5bXCJ0aHJvd1wiXSkuY2FsbChnZW4sIGVycik7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQocmV0KTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG5leHQocmV0KSB7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHJldCA9PSBudWxsID8gdm9pZCAwIDogcmV0LnRoZW4pKSB7XG4gICAgICAgICAgLy8gYW4gYXN5bmMgaXRlcmF0b3JcbiAgICAgICAgICByZXQudGhlbihuZXh0LCByZWplY3QpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0LmRvbmUpIHtcbiAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXQudmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHBlbmRpbmdQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHJldC52YWx1ZSk7XG4gICAgICAgIHJldHVybiBwZW5kaW5nUHJvbWlzZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbiAgICAgIH1cbiAgICAgIG9uRnVsZmlsbGVkKHVuZGVmaW5lZCk7IC8vIGtpY2sgb2ZmIHRoZSBwcm9jZXNzXG4gICAgfSk7XG5cbiAgICBwcm9taXNlLmNhbmNlbCA9IGFjdGlvbihuYW1lICsgXCIgLSBydW5pZDogXCIgKyBydW5JZCArIFwiIC0gY2FuY2VsXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChwZW5kaW5nUHJvbWlzZSkge1xuICAgICAgICAgIGNhbmNlbFByb21pc2UocGVuZGluZ1Byb21pc2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZpbmFsbHkgYmxvY2sgY2FuIHJldHVybiAob3IgeWllbGQpIHN0dWZmLi5cbiAgICAgICAgdmFyIF9yZXMgPSBnZW5bXCJyZXR1cm5cIl0odW5kZWZpbmVkKTtcbiAgICAgICAgLy8gZWF0IGFueXRoaW5nIHRoYXQgcHJvbWlzZSB3b3VsZCBkbywgaXQncyBjYW5jZWxsZWQhXG4gICAgICAgIHZhciB5aWVsZGVkUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShfcmVzLnZhbHVlKTtcbiAgICAgICAgeWllbGRlZFByb21pc2UudGhlbihub29wLCBub29wKTtcbiAgICAgICAgY2FuY2VsUHJvbWlzZSh5aWVsZGVkUHJvbWlzZSk7IC8vIG1heWJlIGl0IGNhbiBiZSBjYW5jZWxsZWQgOilcbiAgICAgICAgLy8gcmVqZWN0IG91ciBvcmlnaW5hbCBwcm9taXNlXG4gICAgICAgIHJlamVjdG9yKG5ldyBGbG93Q2FuY2VsbGF0aW9uRXJyb3IoKSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlamVjdG9yKGUpOyAvLyB0aGVyZSBjb3VsZCBiZSBhIHRocm93aW5nIGZpbmFsbHkgYmxvY2tcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xuICByZXMuaXNNb2JYRmxvdyA9IHRydWU7XG4gIHJldHVybiByZXM7XG59LCBmbG93QW5ub3RhdGlvbik7XG5mbG93LmJvdW5kID0gLyojX19QVVJFX18qL2NyZWF0ZURlY29yYXRvckFubm90YXRpb24oZmxvd0JvdW5kQW5ub3RhdGlvbik7XG5mdW5jdGlvbiBjYW5jZWxQcm9taXNlKHByb21pc2UpIHtcbiAgaWYgKGlzRnVuY3Rpb24ocHJvbWlzZS5jYW5jZWwpKSB7XG4gICAgcHJvbWlzZS5jYW5jZWwoKTtcbiAgfVxufVxuZnVuY3Rpb24gZmxvd1Jlc3VsdChyZXN1bHQpIHtcbiAgcmV0dXJuIHJlc3VsdDsgLy8ganVzdCB0cmlja2luZyBUeXBlU2NyaXB0IDopXG59XG5cbmZ1bmN0aW9uIGlzRmxvdyhmbikge1xuICByZXR1cm4gKGZuID09IG51bGwgPyB2b2lkIDAgOiBmbi5pc01vYlhGbG93KSA9PT0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaW50ZXJjZXB0UmVhZHModGhpbmcsIHByb3BPckhhbmRsZXIsIGhhbmRsZXIpIHtcbiAgdmFyIHRhcmdldDtcbiAgaWYgKGlzT2JzZXJ2YWJsZU1hcCh0aGluZykgfHwgaXNPYnNlcnZhYmxlQXJyYXkodGhpbmcpIHx8IGlzT2JzZXJ2YWJsZVZhbHVlKHRoaW5nKSkge1xuICAgIHRhcmdldCA9IGdldEFkbWluaXN0cmF0aW9uKHRoaW5nKTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGVPYmplY3QodGhpbmcpKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhaXNTdHJpbmdpc2gocHJvcE9ySGFuZGxlcikpIHtcbiAgICAgIHJldHVybiBkaWUoXCJJbnRlcmNlcHRSZWFkcyBjYW4gb25seSBiZSB1c2VkIHdpdGggYSBzcGVjaWZpYyBwcm9wZXJ0eSwgbm90IHdpdGggYW4gb2JqZWN0IGluIGdlbmVyYWxcIik7XG4gICAgfVxuICAgIHRhcmdldCA9IGdldEFkbWluaXN0cmF0aW9uKHRoaW5nLCBwcm9wT3JIYW5kbGVyKTtcbiAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICByZXR1cm4gZGllKFwiRXhwZWN0ZWQgb2JzZXJ2YWJsZSBtYXAsIG9iamVjdCBvciBhcnJheSBhcyBmaXJzdCBhcnJheVwiKTtcbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIHRhcmdldC5kZWhhbmNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGRpZShcIkFuIGludGVyY2VwdCByZWFkZXIgd2FzIGFscmVhZHkgZXN0YWJsaXNoZWRcIik7XG4gIH1cbiAgdGFyZ2V0LmRlaGFuY2VyID0gdHlwZW9mIHByb3BPckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIiA/IHByb3BPckhhbmRsZXIgOiBoYW5kbGVyO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHRhcmdldC5kZWhhbmNlciA9IHVuZGVmaW5lZDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gaW50ZXJjZXB0KHRoaW5nLCBwcm9wT3JIYW5kbGVyLCBoYW5kbGVyKSB7XG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgcmV0dXJuIGludGVyY2VwdFByb3BlcnR5KHRoaW5nLCBwcm9wT3JIYW5kbGVyLCBoYW5kbGVyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gaW50ZXJjZXB0SW50ZXJjZXB0YWJsZSh0aGluZywgcHJvcE9ySGFuZGxlcik7XG4gIH1cbn1cbmZ1bmN0aW9uIGludGVyY2VwdEludGVyY2VwdGFibGUodGhpbmcsIGhhbmRsZXIpIHtcbiAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uKHRoaW5nKS5pbnRlcmNlcHRfKGhhbmRsZXIpO1xufVxuZnVuY3Rpb24gaW50ZXJjZXB0UHJvcGVydHkodGhpbmcsIHByb3BlcnR5LCBoYW5kbGVyKSB7XG4gIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbih0aGluZywgcHJvcGVydHkpLmludGVyY2VwdF8oaGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIF9pc0NvbXB1dGVkKHZhbHVlLCBwcm9wZXJ0eSkge1xuICBpZiAocHJvcGVydHkgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBpc0NvbXB1dGVkVmFsdWUodmFsdWUpO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVPYmplY3QodmFsdWUpID09PSBmYWxzZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoIXZhbHVlWyRtb2J4XS52YWx1ZXNfLmhhcyhwcm9wZXJ0eSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGF0b20gPSBnZXRBdG9tKHZhbHVlLCBwcm9wZXJ0eSk7XG4gIHJldHVybiBpc0NvbXB1dGVkVmFsdWUoYXRvbSk7XG59XG5mdW5jdGlvbiBpc0NvbXB1dGVkKHZhbHVlKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gZGllKFwiaXNDb21wdXRlZCBleHBlY3RzIG9ubHkgMSBhcmd1bWVudC4gVXNlIGlzQ29tcHV0ZWRQcm9wIHRvIGluc3BlY3QgdGhlIG9ic2VydmFiaWxpdHkgb2YgYSBwcm9wZXJ0eVwiKTtcbiAgfVxuICByZXR1cm4gX2lzQ29tcHV0ZWQodmFsdWUpO1xufVxuZnVuY3Rpb24gaXNDb21wdXRlZFByb3AodmFsdWUsIHByb3BOYW1lKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWlzU3RyaW5naXNoKHByb3BOYW1lKSkge1xuICAgIHJldHVybiBkaWUoXCJpc0NvbXB1dGVkIGV4cGVjdGVkIGEgcHJvcGVydHkgbmFtZSBhcyBzZWNvbmQgYXJndW1lbnRcIik7XG4gIH1cbiAgcmV0dXJuIF9pc0NvbXB1dGVkKHZhbHVlLCBwcm9wTmFtZSk7XG59XG5cbmZ1bmN0aW9uIF9pc09ic2VydmFibGUodmFsdWUsIHByb3BlcnR5KSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIChpc09ic2VydmFibGVNYXAodmFsdWUpIHx8IGlzT2JzZXJ2YWJsZUFycmF5KHZhbHVlKSkpIHtcbiAgICAgIHJldHVybiBkaWUoXCJpc09ic2VydmFibGUob2JqZWN0LCBwcm9wZXJ0eU5hbWUpIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIGFycmF5cyBhbmQgbWFwcy4gVXNlIG1hcC5oYXMgb3IgYXJyYXkubGVuZ3RoIGluc3RlYWQuXCIpO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlWyRtb2J4XS52YWx1ZXNfLmhhcyhwcm9wZXJ0eSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBGb3IgZmlyc3QgY2hlY2ssIHNlZSAjNzAxXG4gIHJldHVybiBpc09ic2VydmFibGVPYmplY3QodmFsdWUpIHx8ICEhdmFsdWVbJG1vYnhdIHx8IGlzQXRvbSh2YWx1ZSkgfHwgaXNSZWFjdGlvbih2YWx1ZSkgfHwgaXNDb21wdXRlZFZhbHVlKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGlzT2JzZXJ2YWJsZSh2YWx1ZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGFyZ3VtZW50cy5sZW5ndGggIT09IDEpIHtcbiAgICBkaWUoXCJpc09ic2VydmFibGUgZXhwZWN0cyBvbmx5IDEgYXJndW1lbnQuIFVzZSBpc09ic2VydmFibGVQcm9wIHRvIGluc3BlY3QgdGhlIG9ic2VydmFiaWxpdHkgb2YgYSBwcm9wZXJ0eVwiKTtcbiAgfVxuICByZXR1cm4gX2lzT2JzZXJ2YWJsZSh2YWx1ZSk7XG59XG5mdW5jdGlvbiBpc09ic2VydmFibGVQcm9wKHZhbHVlLCBwcm9wTmFtZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFpc1N0cmluZ2lzaChwcm9wTmFtZSkpIHtcbiAgICByZXR1cm4gZGllKFwiZXhwZWN0ZWQgYSBwcm9wZXJ0eSBuYW1lIGFzIHNlY29uZCBhcmd1bWVudFwiKTtcbiAgfVxuICByZXR1cm4gX2lzT2JzZXJ2YWJsZSh2YWx1ZSwgcHJvcE5hbWUpO1xufVxuXG5mdW5jdGlvbiBrZXlzKG9iaikge1xuICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4gb2JqWyRtb2J4XS5rZXlzXygpO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVNYXAob2JqKSB8fCBpc09ic2VydmFibGVTZXQob2JqKSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKG9iai5rZXlzKCkpO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iai5tYXAoZnVuY3Rpb24gKF8sIGluZGV4KSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfSk7XG4gIH1cbiAgZGllKDUpO1xufVxuZnVuY3Rpb24gdmFsdWVzKG9iaikge1xuICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4ga2V5cyhvYmopLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZU1hcChvYmopKSB7XG4gICAgcmV0dXJuIGtleXMob2JqKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIG9iai5nZXQoa2V5KTtcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlU2V0KG9iaikpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShvYmoudmFsdWVzKCkpO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iai5zbGljZSgpO1xuICB9XG4gIGRpZSg2KTtcbn1cbmZ1bmN0aW9uIGVudHJpZXMob2JqKSB7XG4gIGlmIChpc09ic2VydmFibGVPYmplY3Qob2JqKSkge1xuICAgIHJldHVybiBrZXlzKG9iaikubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBba2V5LCBvYmpba2V5XV07XG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZU1hcChvYmopKSB7XG4gICAgcmV0dXJuIGtleXMob2JqKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIFtrZXksIG9iai5nZXQoa2V5KV07XG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZVNldChvYmopKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ob2JqLmVudHJpZXMoKSk7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZUFycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqLm1hcChmdW5jdGlvbiAoa2V5LCBpbmRleCkge1xuICAgICAgcmV0dXJuIFtpbmRleCwga2V5XTtcbiAgICB9KTtcbiAgfVxuICBkaWUoNyk7XG59XG5mdW5jdGlvbiBzZXQob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmICFpc09ic2VydmFibGVTZXQob2JqKSkge1xuICAgIHN0YXJ0QmF0Y2goKTtcbiAgICB2YXIgX3ZhbHVlcyA9IGtleTtcbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2tleSBpbiBfdmFsdWVzKSB7XG4gICAgICAgIHNldChvYmosIF9rZXksIF92YWx1ZXNbX2tleV0pO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBlbmRCYXRjaCgpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdChvYmopKSB7XG4gICAgb2JqWyRtb2J4XS5zZXRfKGtleSwgdmFsdWUpO1xuICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZU1hcChvYmopKSB7XG4gICAgb2JqLnNldChrZXksIHZhbHVlKTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGVTZXQob2JqKSkge1xuICAgIG9iai5hZGQoa2V5KTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGVBcnJheShvYmopKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGtleSA9IHBhcnNlSW50KGtleSwgMTApO1xuICAgIH1cbiAgICBpZiAoa2V5IDwgMCkge1xuICAgICAgZGllKFwiSW52YWxpZCBpbmRleDogJ1wiICsga2V5ICsgXCInXCIpO1xuICAgIH1cbiAgICBzdGFydEJhdGNoKCk7XG4gICAgaWYgKGtleSA+PSBvYmoubGVuZ3RoKSB7XG4gICAgICBvYmoubGVuZ3RoID0ga2V5ICsgMTtcbiAgICB9XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICBlbmRCYXRjaCgpO1xuICB9IGVsc2Uge1xuICAgIGRpZSg4KTtcbiAgfVxufVxuZnVuY3Rpb24gcmVtb3ZlKG9iaiwga2V5KSB7XG4gIGlmIChpc09ic2VydmFibGVPYmplY3Qob2JqKSkge1xuICAgIG9ialskbW9ieF0uZGVsZXRlXyhrZXkpO1xuICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZU1hcChvYmopKSB7XG4gICAgb2JqW1wiZGVsZXRlXCJdKGtleSk7XG4gIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlU2V0KG9iaikpIHtcbiAgICBvYmpbXCJkZWxldGVcIl0oa2V5KTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGVBcnJheShvYmopKSB7XG4gICAgaWYgKHR5cGVvZiBrZXkgIT09IFwibnVtYmVyXCIpIHtcbiAgICAgIGtleSA9IHBhcnNlSW50KGtleSwgMTApO1xuICAgIH1cbiAgICBvYmouc3BsaWNlKGtleSwgMSk7XG4gIH0gZWxzZSB7XG4gICAgZGllKDkpO1xuICB9XG59XG5mdW5jdGlvbiBoYXMob2JqLCBrZXkpIHtcbiAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdChvYmopKSB7XG4gICAgcmV0dXJuIG9ialskbW9ieF0uaGFzXyhrZXkpO1xuICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZU1hcChvYmopKSB7XG4gICAgcmV0dXJuIG9iai5oYXMoa2V5KTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGVTZXQob2JqKSkge1xuICAgIHJldHVybiBvYmouaGFzKGtleSk7XG4gIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBrZXkgPj0gMCAmJiBrZXkgPCBvYmoubGVuZ3RoO1xuICB9XG4gIGRpZSgxMCk7XG59XG5mdW5jdGlvbiBnZXQob2JqLCBrZXkpIHtcbiAgaWYgKCFoYXMob2JqLCBrZXkpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4gb2JqWyRtb2J4XS5nZXRfKGtleSk7XG4gIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlTWFwKG9iaikpIHtcbiAgICByZXR1cm4gb2JqLmdldChrZXkpO1xuICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZUFycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgZGllKDExKTtcbn1cbmZ1bmN0aW9uIGFwaURlZmluZVByb3BlcnR5KG9iaiwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIGlmIChpc09ic2VydmFibGVPYmplY3Qob2JqKSkge1xuICAgIHJldHVybiBvYmpbJG1vYnhdLmRlZmluZVByb3BlcnR5XyhrZXksIGRlc2NyaXB0b3IpO1xuICB9XG4gIGRpZSgzOSk7XG59XG5mdW5jdGlvbiBhcGlPd25LZXlzKG9iaikge1xuICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4gb2JqWyRtb2J4XS5vd25LZXlzXygpO1xuICB9XG4gIGRpZSgzOCk7XG59XG5cbmZ1bmN0aW9uIG9ic2VydmUodGhpbmcsIHByb3BPckNiLCBjYk9yRmlyZSwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gIGlmIChpc0Z1bmN0aW9uKGNiT3JGaXJlKSkge1xuICAgIHJldHVybiBvYnNlcnZlT2JzZXJ2YWJsZVByb3BlcnR5KHRoaW5nLCBwcm9wT3JDYiwgY2JPckZpcmUsIGZpcmVJbW1lZGlhdGVseSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9ic2VydmVPYnNlcnZhYmxlKHRoaW5nLCBwcm9wT3JDYiwgY2JPckZpcmUpO1xuICB9XG59XG5mdW5jdGlvbiBvYnNlcnZlT2JzZXJ2YWJsZSh0aGluZywgbGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICByZXR1cm4gZ2V0QWRtaW5pc3RyYXRpb24odGhpbmcpLm9ic2VydmVfKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpO1xufVxuZnVuY3Rpb24gb2JzZXJ2ZU9ic2VydmFibGVQcm9wZXJ0eSh0aGluZywgcHJvcGVydHksIGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uKHRoaW5nLCBwcm9wZXJ0eSkub2JzZXJ2ZV8obGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSk7XG59XG5cbmZ1bmN0aW9uIGNhY2hlKG1hcCwga2V5LCB2YWx1ZSkge1xuICBtYXAuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiB0b0pTSGVscGVyKHNvdXJjZSwgX19hbHJlYWR5U2Vlbikge1xuICBpZiAoc291cmNlID09IG51bGwgfHwgdHlwZW9mIHNvdXJjZSAhPT0gXCJvYmplY3RcIiB8fCBzb3VyY2UgaW5zdGFuY2VvZiBEYXRlIHx8ICFpc09ic2VydmFibGUoc291cmNlKSkge1xuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZVZhbHVlKHNvdXJjZSkgfHwgaXNDb21wdXRlZFZhbHVlKHNvdXJjZSkpIHtcbiAgICByZXR1cm4gdG9KU0hlbHBlcihzb3VyY2UuZ2V0KCksIF9fYWxyZWFkeVNlZW4pO1xuICB9XG4gIGlmIChfX2FscmVhZHlTZWVuLmhhcyhzb3VyY2UpKSB7XG4gICAgcmV0dXJuIF9fYWxyZWFkeVNlZW4uZ2V0KHNvdXJjZSk7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZUFycmF5KHNvdXJjZSkpIHtcbiAgICB2YXIgcmVzID0gY2FjaGUoX19hbHJlYWR5U2Vlbiwgc291cmNlLCBuZXcgQXJyYXkoc291cmNlLmxlbmd0aCkpO1xuICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwgaWR4KSB7XG4gICAgICByZXNbaWR4XSA9IHRvSlNIZWxwZXIodmFsdWUsIF9fYWxyZWFkeVNlZW4pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZVNldChzb3VyY2UpKSB7XG4gICAgdmFyIF9yZXMgPSBjYWNoZShfX2FscmVhZHlTZWVuLCBzb3VyY2UsIG5ldyBTZXQoKSk7XG4gICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICBfcmVzLmFkZCh0b0pTSGVscGVyKHZhbHVlLCBfX2FscmVhZHlTZWVuKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIF9yZXM7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZU1hcChzb3VyY2UpKSB7XG4gICAgdmFyIF9yZXMyID0gY2FjaGUoX19hbHJlYWR5U2Vlbiwgc291cmNlLCBuZXcgTWFwKCkpO1xuICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICBfcmVzMi5zZXQoa2V5LCB0b0pTSGVscGVyKHZhbHVlLCBfX2FscmVhZHlTZWVuKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIF9yZXMyO1xuICB9IGVsc2Uge1xuICAgIC8vIG11c3QgYmUgb2JzZXJ2YWJsZSBvYmplY3RcbiAgICB2YXIgX3JlczMgPSBjYWNoZShfX2FscmVhZHlTZWVuLCBzb3VyY2UsIHt9KTtcbiAgICBhcGlPd25LZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAob2JqZWN0UHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIF9yZXMzW2tleV0gPSB0b0pTSGVscGVyKHNvdXJjZVtrZXldLCBfX2FscmVhZHlTZWVuKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gX3JlczM7XG4gIH1cbn1cbi8qKlxuICogUmVjdXJzaXZlbHkgY29udmVydHMgYW4gb2JzZXJ2YWJsZSB0byBpdCdzIG5vbi1vYnNlcnZhYmxlIG5hdGl2ZSBjb3VudGVycGFydC5cbiAqIEl0IGRvZXMgTk9UIHJlY3Vyc2UgaW50byBub24tb2JzZXJ2YWJsZXMsIHRoZXNlIGFyZSBsZWZ0IGFzIHRoZXkgYXJlLCBldmVuIGlmIHRoZXkgY29udGFpbiBvYnNlcnZhYmxlcy5cbiAqIENvbXB1dGVkIGFuZCBvdGhlciBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGFyZSBjb21wbGV0ZWx5IGlnbm9yZWQuXG4gKiBDb21wbGV4IHNjZW5hcmlvcyByZXF1aXJlIGN1c3RvbSBzb2x1dGlvbiwgZWcgaW1wbGVtZW50aW5nIGB0b0pTT05gIG9yIHVzaW5nIGBzZXJpYWxpenJgIGxpYi5cbiAqL1xuZnVuY3Rpb24gdG9KUyhzb3VyY2UsIG9wdGlvbnMpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBvcHRpb25zKSB7XG4gICAgZGllKFwidG9KUyBubyBsb25nZXIgc3VwcG9ydHMgb3B0aW9uc1wiKTtcbiAgfVxuICByZXR1cm4gdG9KU0hlbHBlcihzb3VyY2UsIG5ldyBNYXAoKSk7XG59XG5cbmZ1bmN0aW9uIHRyYWNlKCkge1xuICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBlbnRlckJyZWFrUG9pbnQgPSBmYWxzZTtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuICBpZiAodHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICBlbnRlckJyZWFrUG9pbnQgPSBhcmdzLnBvcCgpO1xuICB9XG4gIHZhciBkZXJpdmF0aW9uID0gZ2V0QXRvbUZyb21BcmdzKGFyZ3MpO1xuICBpZiAoIWRlcml2YXRpb24pIHtcbiAgICByZXR1cm4gZGllKFwiJ3RyYWNlKGJyZWFrPyknIGNhbiBvbmx5IGJlIHVzZWQgaW5zaWRlIGEgdHJhY2tlZCBjb21wdXRlZCB2YWx1ZSBvciBhIFJlYWN0aW9uLiBDb25zaWRlciBwYXNzaW5nIGluIHRoZSBjb21wdXRlZCB2YWx1ZSBvciByZWFjdGlvbiBleHBsaWNpdGx5XCIpO1xuICB9XG4gIGlmIChkZXJpdmF0aW9uLmlzVHJhY2luZ18gPT09IFRyYWNlTW9kZS5OT05FKSB7XG4gICAgY29uc29sZS5sb2coXCJbbW9ieC50cmFjZV0gJ1wiICsgZGVyaXZhdGlvbi5uYW1lXyArIFwiJyB0cmFjaW5nIGVuYWJsZWRcIik7XG4gIH1cbiAgZGVyaXZhdGlvbi5pc1RyYWNpbmdfID0gZW50ZXJCcmVha1BvaW50ID8gVHJhY2VNb2RlLkJSRUFLIDogVHJhY2VNb2RlLkxPRztcbn1cbmZ1bmN0aW9uIGdldEF0b21Gcm9tQXJncyhhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uO1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBnZXRBdG9tKGFyZ3NbMF0pO1xuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiBnZXRBdG9tKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICB9XG59XG5cbi8qKlxuICogRHVyaW5nIGEgdHJhbnNhY3Rpb24gbm8gdmlld3MgYXJlIHVwZGF0ZWQgdW50aWwgdGhlIGVuZCBvZiB0aGUgdHJhbnNhY3Rpb24uXG4gKiBUaGUgdHJhbnNhY3Rpb24gd2lsbCBiZSBydW4gc3luY2hyb25vdXNseSBub25ldGhlbGVzcy5cbiAqXG4gKiBAcGFyYW0gYWN0aW9uIGEgZnVuY3Rpb24gdGhhdCB1cGRhdGVzIHNvbWUgcmVhY3RpdmUgc3RhdGVcbiAqIEByZXR1cm5zIGFueSB2YWx1ZSB0aGF0IHdhcyByZXR1cm5lZCBieSB0aGUgJ2FjdGlvbicgcGFyYW1ldGVyLlxuICovXG5mdW5jdGlvbiB0cmFuc2FjdGlvbihhY3Rpb24sIHRoaXNBcmcpIHtcbiAgaWYgKHRoaXNBcmcgPT09IHZvaWQgMCkge1xuICAgIHRoaXNBcmcgPSB1bmRlZmluZWQ7XG4gIH1cbiAgc3RhcnRCYXRjaCgpO1xuICB0cnkge1xuICAgIHJldHVybiBhY3Rpb24uYXBwbHkodGhpc0FyZyk7XG4gIH0gZmluYWxseSB7XG4gICAgZW5kQmF0Y2goKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3aGVuKHByZWRpY2F0ZSwgYXJnMSwgYXJnMikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSB8fCBhcmcxICYmIHR5cGVvZiBhcmcxID09PSBcIm9iamVjdFwiKSB7XG4gICAgcmV0dXJuIHdoZW5Qcm9taXNlKHByZWRpY2F0ZSwgYXJnMSk7XG4gIH1cbiAgcmV0dXJuIF93aGVuKHByZWRpY2F0ZSwgYXJnMSwgYXJnMiB8fCB7fSk7XG59XG5mdW5jdGlvbiBfd2hlbihwcmVkaWNhdGUsIGVmZmVjdCwgb3B0cykge1xuICB2YXIgdGltZW91dEhhbmRsZTtcbiAgaWYgKHR5cGVvZiBvcHRzLnRpbWVvdXQgPT09IFwibnVtYmVyXCIpIHtcbiAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoXCJXSEVOX1RJTUVPVVRcIik7XG4gICAgdGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFkaXNwb3NlclskbW9ieF0uaXNEaXNwb3NlZF8pIHtcbiAgICAgICAgZGlzcG9zZXIoKTtcbiAgICAgICAgaWYgKG9wdHMub25FcnJvcikge1xuICAgICAgICAgIG9wdHMub25FcnJvcihlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBvcHRzLnRpbWVvdXQpO1xuICB9XG4gIG9wdHMubmFtZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IG9wdHMubmFtZSB8fCBcIldoZW5AXCIgKyBnZXROZXh0SWQoKSA6IFwiV2hlblwiO1xuICB2YXIgZWZmZWN0QWN0aW9uID0gY3JlYXRlQWN0aW9uKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IG9wdHMubmFtZSArIFwiLWVmZmVjdFwiIDogXCJXaGVuLWVmZmVjdFwiLCBlZmZlY3QpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgdmFyIGRpc3Bvc2VyID0gYXV0b3J1bihmdW5jdGlvbiAocikge1xuICAgIC8vIHByZWRpY2F0ZSBzaG91bGQgbm90IGNoYW5nZSBzdGF0ZVxuICAgIHZhciBjb25kID0gYWxsb3dTdGF0ZUNoYW5nZXMoZmFsc2UsIHByZWRpY2F0ZSk7XG4gICAgaWYgKGNvbmQpIHtcbiAgICAgIHIuZGlzcG9zZSgpO1xuICAgICAgaWYgKHRpbWVvdXRIYW5kbGUpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xuICAgICAgfVxuICAgICAgZWZmZWN0QWN0aW9uKCk7XG4gICAgfVxuICB9LCBvcHRzKTtcbiAgcmV0dXJuIGRpc3Bvc2VyO1xufVxuZnVuY3Rpb24gd2hlblByb21pc2UocHJlZGljYXRlLCBvcHRzKSB7XG4gIHZhciBfb3B0cyRzaWduYWw7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgb3B0cyAmJiBvcHRzLm9uRXJyb3IpIHtcbiAgICByZXR1cm4gZGllKFwidGhlIG9wdGlvbnMgJ29uRXJyb3InIGFuZCAncHJvbWlzZScgY2Fubm90IGJlIGNvbWJpbmVkXCIpO1xuICB9XG4gIGlmIChvcHRzICE9IG51bGwgJiYgKF9vcHRzJHNpZ25hbCA9IG9wdHMuc2lnbmFsKSAhPSBudWxsICYmIF9vcHRzJHNpZ25hbC5hYm9ydGVkKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiV0hFTl9BQk9SVEVEXCIpKSwge1xuICAgICAgY2FuY2VsOiBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHZhciBjYW5jZWw7XG4gIHZhciBhYm9ydDtcbiAgdmFyIHJlcyA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgX29wdHMkc2lnbmFsMjtcbiAgICB2YXIgZGlzcG9zZXIgPSBfd2hlbihwcmVkaWNhdGUsIHJlc29sdmUsIF9leHRlbmRzKHt9LCBvcHRzLCB7XG4gICAgICBvbkVycm9yOiByZWplY3RcbiAgICB9KSk7XG4gICAgY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgZGlzcG9zZXIoKTtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJXSEVOX0NBTkNFTExFRFwiKSk7XG4gICAgfTtcbiAgICBhYm9ydCA9IGZ1bmN0aW9uIGFib3J0KCkge1xuICAgICAgZGlzcG9zZXIoKTtcbiAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJXSEVOX0FCT1JURURcIikpO1xuICAgIH07XG4gICAgb3B0cyA9PSBudWxsID8gdm9pZCAwIDogKF9vcHRzJHNpZ25hbDIgPSBvcHRzLnNpZ25hbCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9vcHRzJHNpZ25hbDIuYWRkRXZlbnRMaXN0ZW5lciA9PSBudWxsID8gdm9pZCAwIDogX29wdHMkc2lnbmFsMi5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgYWJvcnQpO1xuICB9KVtcImZpbmFsbHlcIl0oZnVuY3Rpb24gKCkge1xuICAgIHZhciBfb3B0cyRzaWduYWwzO1xuICAgIHJldHVybiBvcHRzID09IG51bGwgPyB2b2lkIDAgOiAoX29wdHMkc2lnbmFsMyA9IG9wdHMuc2lnbmFsKSA9PSBudWxsID8gdm9pZCAwIDogX29wdHMkc2lnbmFsMy5yZW1vdmVFdmVudExpc3RlbmVyID09IG51bGwgPyB2b2lkIDAgOiBfb3B0cyRzaWduYWwzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBhYm9ydCk7XG4gIH0pO1xuICByZXMuY2FuY2VsID0gY2FuY2VsO1xuICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBnZXRBZG0odGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXRbJG1vYnhdO1xufVxuLy8gT3B0aW1pemF0aW9uOiB3ZSBkb24ndCBuZWVkIHRoZSBpbnRlcm1lZGlhdGUgb2JqZWN0cyBhbmQgY291bGQgaGF2ZSBhIGNvbXBsZXRlbHkgY3VzdG9tIGFkbWluaXN0cmF0aW9uIGZvciBEeW5hbWljT2JqZWN0cyxcbi8vIGFuZCBza2lwIGVpdGhlciB0aGUgaW50ZXJuYWwgdmFsdWVzIG1hcCwgb3IgdGhlIGJhc2Ugb2JqZWN0IHdpdGggaXRzIHByb3BlcnR5IGRlc2NyaXB0b3JzIVxudmFyIG9iamVjdFByb3h5VHJhcHMgPSB7XG4gIGhhczogZnVuY3Rpb24gaGFzKHRhcmdldCwgbmFtZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uKSB7XG4gICAgICB3YXJuQWJvdXRQcm94eVJlcXVpcmVtZW50KFwiZGV0ZWN0IG5ldyBwcm9wZXJ0aWVzIHVzaW5nIHRoZSAnaW4nIG9wZXJhdG9yLiBVc2UgJ2hhcycgZnJvbSAnbW9ieCcgaW5zdGVhZC5cIik7XG4gICAgfVxuICAgIHJldHVybiBnZXRBZG0odGFyZ2V0KS5oYXNfKG5hbWUpO1xuICB9LFxuICBnZXQ6IGZ1bmN0aW9uIGdldCh0YXJnZXQsIG5hbWUpIHtcbiAgICByZXR1cm4gZ2V0QWRtKHRhcmdldCkuZ2V0XyhuYW1lKTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiBzZXQodGFyZ2V0LCBuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBfZ2V0QWRtJHNldF87XG4gICAgaWYgKCFpc1N0cmluZ2lzaChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFnZXRBZG0odGFyZ2V0KS52YWx1ZXNfLmhhcyhuYW1lKSkge1xuICAgICAgd2FybkFib3V0UHJveHlSZXF1aXJlbWVudChcImFkZCBhIG5ldyBvYnNlcnZhYmxlIHByb3BlcnR5IHRocm91Z2ggZGlyZWN0IGFzc2lnbm1lbnQuIFVzZSAnc2V0JyBmcm9tICdtb2J4JyBpbnN0ZWFkLlwiKTtcbiAgICB9XG4gICAgLy8gbnVsbCAoaW50ZXJjZXB0ZWQpIC0+IHRydWUgKHN1Y2Nlc3MpXG4gICAgcmV0dXJuIChfZ2V0QWRtJHNldF8gPSBnZXRBZG0odGFyZ2V0KS5zZXRfKG5hbWUsIHZhbHVlLCB0cnVlKSkgIT0gbnVsbCA/IF9nZXRBZG0kc2V0XyA6IHRydWU7XG4gIH0sXG4gIGRlbGV0ZVByb3BlcnR5OiBmdW5jdGlvbiBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIG5hbWUpIHtcbiAgICB2YXIgX2dldEFkbSRkZWxldGVfO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIHdhcm5BYm91dFByb3h5UmVxdWlyZW1lbnQoXCJkZWxldGUgcHJvcGVydGllcyBmcm9tIGFuIG9ic2VydmFibGUgb2JqZWN0LiBVc2UgJ3JlbW92ZScgZnJvbSAnbW9ieCcgaW5zdGVhZC5cIik7XG4gICAgfVxuICAgIGlmICghaXNTdHJpbmdpc2gobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gbnVsbCAoaW50ZXJjZXB0ZWQpIC0+IHRydWUgKHN1Y2Nlc3MpXG4gICAgcmV0dXJuIChfZ2V0QWRtJGRlbGV0ZV8gPSBnZXRBZG0odGFyZ2V0KS5kZWxldGVfKG5hbWUsIHRydWUpKSAhPSBudWxsID8gX2dldEFkbSRkZWxldGVfIDogdHJ1ZTtcbiAgfSxcbiAgZGVmaW5lUHJvcGVydHk6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KHRhcmdldCwgbmFtZSwgZGVzY3JpcHRvcikge1xuICAgIHZhciBfZ2V0QWRtJGRlZmluZVByb3BlcnQ7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgd2FybkFib3V0UHJveHlSZXF1aXJlbWVudChcImRlZmluZSBwcm9wZXJ0eSBvbiBhbiBvYnNlcnZhYmxlIG9iamVjdC4gVXNlICdkZWZpbmVQcm9wZXJ0eScgZnJvbSAnbW9ieCcgaW5zdGVhZC5cIik7XG4gICAgfVxuICAgIC8vIG51bGwgKGludGVyY2VwdGVkKSAtPiB0cnVlIChzdWNjZXNzKVxuICAgIHJldHVybiAoX2dldEFkbSRkZWZpbmVQcm9wZXJ0ID0gZ2V0QWRtKHRhcmdldCkuZGVmaW5lUHJvcGVydHlfKG5hbWUsIGRlc2NyaXB0b3IpKSAhPSBudWxsID8gX2dldEFkbSRkZWZpbmVQcm9wZXJ0IDogdHJ1ZTtcbiAgfSxcbiAgb3duS2V5czogZnVuY3Rpb24gb3duS2V5cyh0YXJnZXQpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbikge1xuICAgICAgd2FybkFib3V0UHJveHlSZXF1aXJlbWVudChcIml0ZXJhdGUga2V5cyB0byBkZXRlY3QgYWRkZWQgLyByZW1vdmVkIHByb3BlcnRpZXMuIFVzZSAna2V5cycgZnJvbSAnbW9ieCcgaW5zdGVhZC5cIik7XG4gICAgfVxuICAgIHJldHVybiBnZXRBZG0odGFyZ2V0KS5vd25LZXlzXygpO1xuICB9LFxuICBwcmV2ZW50RXh0ZW5zaW9uczogZnVuY3Rpb24gcHJldmVudEV4dGVuc2lvbnModGFyZ2V0KSB7XG4gICAgZGllKDEzKTtcbiAgfVxufTtcbmZ1bmN0aW9uIGFzRHluYW1pY09ic2VydmFibGVPYmplY3QodGFyZ2V0LCBvcHRpb25zKSB7XG4gIHZhciBfdGFyZ2V0JCRtb2J4LCBfdGFyZ2V0JCRtb2J4JHByb3h5XztcbiAgYXNzZXJ0UHJveGllcygpO1xuICB0YXJnZXQgPSBhc09ic2VydmFibGVPYmplY3QodGFyZ2V0LCBvcHRpb25zKTtcbiAgcmV0dXJuIChfdGFyZ2V0JCRtb2J4JHByb3h5XyA9IChfdGFyZ2V0JCRtb2J4ID0gdGFyZ2V0WyRtb2J4XSkucHJveHlfKSAhPSBudWxsID8gX3RhcmdldCQkbW9ieCRwcm94eV8gOiBfdGFyZ2V0JCRtb2J4LnByb3h5XyA9IG5ldyBQcm94eSh0YXJnZXQsIG9iamVjdFByb3h5VHJhcHMpO1xufVxuXG5mdW5jdGlvbiBoYXNJbnRlcmNlcHRvcnMoaW50ZXJjZXB0YWJsZSkge1xuICByZXR1cm4gaW50ZXJjZXB0YWJsZS5pbnRlcmNlcHRvcnNfICE9PSB1bmRlZmluZWQgJiYgaW50ZXJjZXB0YWJsZS5pbnRlcmNlcHRvcnNfLmxlbmd0aCA+IDA7XG59XG5mdW5jdGlvbiByZWdpc3RlckludGVyY2VwdG9yKGludGVyY2VwdGFibGUsIGhhbmRsZXIpIHtcbiAgdmFyIGludGVyY2VwdG9ycyA9IGludGVyY2VwdGFibGUuaW50ZXJjZXB0b3JzXyB8fCAoaW50ZXJjZXB0YWJsZS5pbnRlcmNlcHRvcnNfID0gW10pO1xuICBpbnRlcmNlcHRvcnMucHVzaChoYW5kbGVyKTtcbiAgcmV0dXJuIG9uY2UoZnVuY3Rpb24gKCkge1xuICAgIHZhciBpZHggPSBpbnRlcmNlcHRvcnMuaW5kZXhPZihoYW5kbGVyKTtcbiAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgaW50ZXJjZXB0b3JzLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBpbnRlcmNlcHRDaGFuZ2UoaW50ZXJjZXB0YWJsZSwgY2hhbmdlKSB7XG4gIHZhciBwcmV2VSA9IHVudHJhY2tlZFN0YXJ0KCk7XG4gIHRyeSB7XG4gICAgLy8gSW50ZXJjZXB0b3IgY2FuIG1vZGlmeSB0aGUgYXJyYXksIGNvcHkgaXQgdG8gYXZvaWQgY29uY3VycmVudCBtb2RpZmljYXRpb24sIHNlZSAjMTk1MFxuICAgIHZhciBpbnRlcmNlcHRvcnMgPSBbXS5jb25jYXQoaW50ZXJjZXB0YWJsZS5pbnRlcmNlcHRvcnNfIHx8IFtdKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGludGVyY2VwdG9ycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGNoYW5nZSA9IGludGVyY2VwdG9yc1tpXShjaGFuZ2UpO1xuICAgICAgaWYgKGNoYW5nZSAmJiAhY2hhbmdlLnR5cGUpIHtcbiAgICAgICAgZGllKDE0KTtcbiAgICAgIH1cbiAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2hhbmdlO1xuICB9IGZpbmFsbHkge1xuICAgIHVudHJhY2tlZEVuZChwcmV2VSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFzTGlzdGVuZXJzKGxpc3RlbmFibGUpIHtcbiAgcmV0dXJuIGxpc3RlbmFibGUuY2hhbmdlTGlzdGVuZXJzXyAhPT0gdW5kZWZpbmVkICYmIGxpc3RlbmFibGUuY2hhbmdlTGlzdGVuZXJzXy5sZW5ndGggPiAwO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJMaXN0ZW5lcihsaXN0ZW5hYmxlLCBoYW5kbGVyKSB7XG4gIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5hYmxlLmNoYW5nZUxpc3RlbmVyc18gfHwgKGxpc3RlbmFibGUuY2hhbmdlTGlzdGVuZXJzXyA9IFtdKTtcbiAgbGlzdGVuZXJzLnB1c2goaGFuZGxlcik7XG4gIHJldHVybiBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWR4ID0gbGlzdGVuZXJzLmluZGV4T2YoaGFuZGxlcik7XG4gICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgIGxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gbm90aWZ5TGlzdGVuZXJzKGxpc3RlbmFibGUsIGNoYW5nZSkge1xuICB2YXIgcHJldlUgPSB1bnRyYWNrZWRTdGFydCgpO1xuICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuYWJsZS5jaGFuZ2VMaXN0ZW5lcnNfO1xuICBpZiAoIWxpc3RlbmVycykge1xuICAgIHJldHVybjtcbiAgfVxuICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuc2xpY2UoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgbGlzdGVuZXJzW2ldKGNoYW5nZSk7XG4gIH1cbiAgdW50cmFja2VkRW5kKHByZXZVKTtcbn1cblxuZnVuY3Rpb24gbWFrZU9ic2VydmFibGUodGFyZ2V0LCBhbm5vdGF0aW9ucywgb3B0aW9ucykge1xuICBpbml0T2JzZXJ2YWJsZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9hbm5vdGF0aW9ucztcbiAgICB2YXIgYWRtID0gYXNPYnNlcnZhYmxlT2JqZWN0KHRhcmdldCwgb3B0aW9ucylbJG1vYnhdO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgYW5ub3RhdGlvbnMgJiYgdGFyZ2V0W3N0b3JlZEFubm90YXRpb25zU3ltYm9sXSkge1xuICAgICAgZGllKFwibWFrZU9ic2VydmFibGUgc2Vjb25kIGFyZyBtdXN0IGJlIG51bGxpc2ggd2hlbiB1c2luZyBkZWNvcmF0b3JzLiBNaXhpbmcgQGRlY29yYXRvciBzeW50YXggd2l0aCBhbm5vdGF0aW9ucyBpcyBub3Qgc3VwcG9ydGVkLlwiKTtcbiAgICB9XG4gICAgLy8gRGVmYXVsdCB0byBkZWNvcmF0b3JzXG4gICAgKF9hbm5vdGF0aW9ucyA9IGFubm90YXRpb25zKSAhPSBudWxsID8gX2Fubm90YXRpb25zIDogYW5ub3RhdGlvbnMgPSBjb2xsZWN0U3RvcmVkQW5ub3RhdGlvbnModGFyZ2V0KTtcbiAgICAvLyBBbm5vdGF0ZVxuICAgIG93bktleXMoYW5ub3RhdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIGFkbS5tYWtlXyhrZXksIGFubm90YXRpb25zW2tleV0pO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cbi8vIHByb3RvW2tleXNTeW1ib2xdID0gbmV3IFNldDxQcm9wZXJ0eUtleT4oKVxudmFyIGtleXNTeW1ib2wgPSAvKiNfX1BVUkVfXyovU3ltYm9sKFwibW9ieC1rZXlzXCIpO1xuZnVuY3Rpb24gbWFrZUF1dG9PYnNlcnZhYmxlKHRhcmdldCwgb3ZlcnJpZGVzLCBvcHRpb25zKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiAhaXNQbGFpbk9iamVjdChPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KSkpIHtcbiAgICAgIGRpZShcIidtYWtlQXV0b09ic2VydmFibGUnIGNhbiBvbmx5IGJlIHVzZWQgZm9yIGNsYXNzZXMgdGhhdCBkb24ndCBoYXZlIGEgc3VwZXJjbGFzc1wiKTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCh0YXJnZXQpKSB7XG4gICAgICBkaWUoXCJtYWtlQXV0b09ic2VydmFibGUgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYmplY3RzIG5vdCBhbHJlYWR5IG1hZGUgb2JzZXJ2YWJsZVwiKTtcbiAgICB9XG4gIH1cbiAgLy8gT3B0aW1pemF0aW9uOiBhdm9pZCB2aXNpdGluZyBwcm90b3NcbiAgLy8gQXNzdW1lcyB0aGF0IGFubm90YXRpb24ubWFrZV8vLmV4dGVuZF8gd29ya3MgdGhlIHNhbWUgZm9yIHBsYWluIG9iamVjdHNcbiAgaWYgKGlzUGxhaW5PYmplY3QodGFyZ2V0KSkge1xuICAgIHJldHVybiBleHRlbmRPYnNlcnZhYmxlKHRhcmdldCwgdGFyZ2V0LCBvdmVycmlkZXMsIG9wdGlvbnMpO1xuICB9XG4gIGluaXRPYnNlcnZhYmxlKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYWRtID0gYXNPYnNlcnZhYmxlT2JqZWN0KHRhcmdldCwgb3B0aW9ucylbJG1vYnhdO1xuICAgIC8vIE9wdGltaXphdGlvbjogY2FjaGUga2V5cyBvbiBwcm90b1xuICAgIC8vIEFzc3VtZXMgbWFrZUF1dG9PYnNlcnZhYmxlIGNhbiBiZSBjYWxsZWQgb25seSBvbmNlIHBlciBvYmplY3QgYW5kIGNhbid0IGJlIHVzZWQgaW4gc3ViY2xhc3NcbiAgICBpZiAoIXRhcmdldFtrZXlzU3ltYm9sXSkge1xuICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCk7XG4gICAgICB2YXIga2V5cyA9IG5ldyBTZXQoW10uY29uY2F0KG93bktleXModGFyZ2V0KSwgb3duS2V5cyhwcm90bykpKTtcbiAgICAgIGtleXNbXCJkZWxldGVcIl0oXCJjb25zdHJ1Y3RvclwiKTtcbiAgICAgIGtleXNbXCJkZWxldGVcIl0oJG1vYngpO1xuICAgICAgYWRkSGlkZGVuUHJvcChwcm90bywga2V5c1N5bWJvbCwga2V5cyk7XG4gICAgfVxuICAgIHRhcmdldFtrZXlzU3ltYm9sXS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBhZG0ubWFrZV8oa2V5LFxuICAgICAgLy8gbXVzdCBwYXNzIFwidW5kZWZpbmVkXCIgZm9yIHsga2V5OiB1bmRlZmluZWQgfVxuICAgICAgIW92ZXJyaWRlcyA/IHRydWUgOiBrZXkgaW4gb3ZlcnJpZGVzID8gb3ZlcnJpZGVzW2tleV0gOiB0cnVlKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbnZhciBTUExJQ0UgPSBcInNwbGljZVwiO1xudmFyIFVQREFURSA9IFwidXBkYXRlXCI7XG52YXIgTUFYX1NQTElDRV9TSVpFID0gMTAwMDA7IC8vIFNlZSBlLmcuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb2J4anMvbW9ieC9pc3N1ZXMvODU5XG52YXIgYXJyYXlUcmFwcyA9IHtcbiAgZ2V0OiBmdW5jdGlvbiBnZXQodGFyZ2V0LCBuYW1lKSB7XG4gICAgdmFyIGFkbSA9IHRhcmdldFskbW9ieF07XG4gICAgaWYgKG5hbWUgPT09ICRtb2J4KSB7XG4gICAgICByZXR1cm4gYWRtO1xuICAgIH1cbiAgICBpZiAobmFtZSA9PT0gXCJsZW5ndGhcIikge1xuICAgICAgcmV0dXJuIGFkbS5nZXRBcnJheUxlbmd0aF8oKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiICYmICFpc05hTihuYW1lKSkge1xuICAgICAgcmV0dXJuIGFkbS5nZXRfKHBhcnNlSW50KG5hbWUpKTtcbiAgICB9XG4gICAgaWYgKGhhc1Byb3AoYXJyYXlFeHRlbnNpb25zLCBuYW1lKSkge1xuICAgICAgcmV0dXJuIGFycmF5RXh0ZW5zaW9uc1tuYW1lXTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldFtuYW1lXTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiBzZXQodGFyZ2V0LCBuYW1lLCB2YWx1ZSkge1xuICAgIHZhciBhZG0gPSB0YXJnZXRbJG1vYnhdO1xuICAgIGlmIChuYW1lID09PSBcImxlbmd0aFwiKSB7XG4gICAgICBhZG0uc2V0QXJyYXlMZW5ndGhfKHZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN5bWJvbFwiIHx8IGlzTmFOKG5hbWUpKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbnVtZXJpYyBzdHJpbmdcbiAgICAgIGFkbS5zZXRfKHBhcnNlSW50KG5hbWUpLCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBwcmV2ZW50RXh0ZW5zaW9uczogZnVuY3Rpb24gcHJldmVudEV4dGVuc2lvbnMoKSB7XG4gICAgZGllKDE1KTtcbiAgfVxufTtcbnZhciBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbiA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8vIHRoaXMgaXMgdGhlIHByb3AgdGhhdCBnZXRzIHByb3hpZWQsIHNvIGNhbid0IHJlcGxhY2UgaXQhXG5cbiAgZnVuY3Rpb24gT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24obmFtZSwgZW5oYW5jZXIsIG93bmVkXywgbGVnYWN5TW9kZV8pIHtcbiAgICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7XG4gICAgICBuYW1lID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJPYnNlcnZhYmxlQXJyYXlAXCIgKyBnZXROZXh0SWQoKSA6IFwiT2JzZXJ2YWJsZUFycmF5XCI7XG4gICAgfVxuICAgIHRoaXMub3duZWRfID0gdm9pZCAwO1xuICAgIHRoaXMubGVnYWN5TW9kZV8gPSB2b2lkIDA7XG4gICAgdGhpcy5hdG9tXyA9IHZvaWQgMDtcbiAgICB0aGlzLnZhbHVlc18gPSBbXTtcbiAgICB0aGlzLmludGVyY2VwdG9yc18gPSB2b2lkIDA7XG4gICAgdGhpcy5jaGFuZ2VMaXN0ZW5lcnNfID0gdm9pZCAwO1xuICAgIHRoaXMuZW5oYW5jZXJfID0gdm9pZCAwO1xuICAgIHRoaXMuZGVoYW5jZXIgPSB2b2lkIDA7XG4gICAgdGhpcy5wcm94eV8gPSB2b2lkIDA7XG4gICAgdGhpcy5sYXN0S25vd25MZW5ndGhfID0gMDtcbiAgICB0aGlzLm93bmVkXyA9IG93bmVkXztcbiAgICB0aGlzLmxlZ2FjeU1vZGVfID0gbGVnYWN5TW9kZV87XG4gICAgdGhpcy5hdG9tXyA9IG5ldyBBdG9tKG5hbWUpO1xuICAgIHRoaXMuZW5oYW5jZXJfID0gZnVuY3Rpb24gKG5ld1YsIG9sZFYpIHtcbiAgICAgIHJldHVybiBlbmhhbmNlcihuZXdWLCBvbGRWLCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBuYW1lICsgXCJbLi5dXCIgOiBcIk9ic2VydmFibGVBcnJheVsuLl1cIik7XG4gICAgfTtcbiAgfVxuICB2YXIgX3Byb3RvID0gT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlO1xuICBfcHJvdG8uZGVoYW5jZVZhbHVlXyA9IGZ1bmN0aW9uIGRlaGFuY2VWYWx1ZV8odmFsdWUpIHtcbiAgICBpZiAodGhpcy5kZWhhbmNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWhhbmNlcih2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbiAgX3Byb3RvLmRlaGFuY2VWYWx1ZXNfID0gZnVuY3Rpb24gZGVoYW5jZVZhbHVlc18odmFsdWVzKSB7XG4gICAgaWYgKHRoaXMuZGVoYW5jZXIgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHZhbHVlcy5tYXAodGhpcy5kZWhhbmNlcik7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH07XG4gIF9wcm90by5pbnRlcmNlcHRfID0gZnVuY3Rpb24gaW50ZXJjZXB0XyhoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHJlZ2lzdGVySW50ZXJjZXB0b3IodGhpcywgaGFuZGxlcik7XG4gIH07XG4gIF9wcm90by5vYnNlcnZlXyA9IGZ1bmN0aW9uIG9ic2VydmVfKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICBpZiAoZmlyZUltbWVkaWF0ZWx5ID09PSB2b2lkIDApIHtcbiAgICAgIGZpcmVJbW1lZGlhdGVseSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICBsaXN0ZW5lcih7XG4gICAgICAgIG9ic2VydmFibGVLaW5kOiBcImFycmF5XCIsXG4gICAgICAgIG9iamVjdDogdGhpcy5wcm94eV8sXG4gICAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5hdG9tXy5uYW1lXyxcbiAgICAgICAgdHlwZTogXCJzcGxpY2VcIixcbiAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgIGFkZGVkOiB0aGlzLnZhbHVlc18uc2xpY2UoKSxcbiAgICAgICAgYWRkZWRDb3VudDogdGhpcy52YWx1ZXNfLmxlbmd0aCxcbiAgICAgICAgcmVtb3ZlZDogW10sXG4gICAgICAgIHJlbW92ZWRDb3VudDogMFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZWdpc3Rlckxpc3RlbmVyKHRoaXMsIGxpc3RlbmVyKTtcbiAgfTtcbiAgX3Byb3RvLmdldEFycmF5TGVuZ3RoXyA9IGZ1bmN0aW9uIGdldEFycmF5TGVuZ3RoXygpIHtcbiAgICB0aGlzLmF0b21fLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzXy5sZW5ndGg7XG4gIH07XG4gIF9wcm90by5zZXRBcnJheUxlbmd0aF8gPSBmdW5jdGlvbiBzZXRBcnJheUxlbmd0aF8obmV3TGVuZ3RoKSB7XG4gICAgaWYgKHR5cGVvZiBuZXdMZW5ndGggIT09IFwibnVtYmVyXCIgfHwgaXNOYU4obmV3TGVuZ3RoKSB8fCBuZXdMZW5ndGggPCAwKSB7XG4gICAgICBkaWUoXCJPdXQgb2YgcmFuZ2U6IFwiICsgbmV3TGVuZ3RoKTtcbiAgICB9XG4gICAgdmFyIGN1cnJlbnRMZW5ndGggPSB0aGlzLnZhbHVlc18ubGVuZ3RoO1xuICAgIGlmIChuZXdMZW5ndGggPT09IGN1cnJlbnRMZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKG5ld0xlbmd0aCA+IGN1cnJlbnRMZW5ndGgpIHtcbiAgICAgIHZhciBuZXdJdGVtcyA9IG5ldyBBcnJheShuZXdMZW5ndGggLSBjdXJyZW50TGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3TGVuZ3RoIC0gY3VycmVudExlbmd0aDsgaSsrKSB7XG4gICAgICAgIG5ld0l0ZW1zW2ldID0gdW5kZWZpbmVkO1xuICAgICAgfSAvLyBObyBBcnJheS5maWxsIGV2ZXJ5d2hlcmUuLi5cbiAgICAgIHRoaXMuc3BsaWNlV2l0aEFycmF5XyhjdXJyZW50TGVuZ3RoLCAwLCBuZXdJdGVtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3BsaWNlV2l0aEFycmF5XyhuZXdMZW5ndGgsIGN1cnJlbnRMZW5ndGggLSBuZXdMZW5ndGgpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnVwZGF0ZUFycmF5TGVuZ3RoXyA9IGZ1bmN0aW9uIHVwZGF0ZUFycmF5TGVuZ3RoXyhvbGRMZW5ndGgsIGRlbHRhKSB7XG4gICAgaWYgKG9sZExlbmd0aCAhPT0gdGhpcy5sYXN0S25vd25MZW5ndGhfKSB7XG4gICAgICBkaWUoMTYpO1xuICAgIH1cbiAgICB0aGlzLmxhc3RLbm93bkxlbmd0aF8gKz0gZGVsdGE7XG4gICAgaWYgKHRoaXMubGVnYWN5TW9kZV8gJiYgZGVsdGEgPiAwKSB7XG4gICAgICByZXNlcnZlQXJyYXlCdWZmZXIob2xkTGVuZ3RoICsgZGVsdGEgKyAxKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5zcGxpY2VXaXRoQXJyYXlfID0gZnVuY3Rpb24gc3BsaWNlV2l0aEFycmF5XyhpbmRleCwgZGVsZXRlQ291bnQsIG5ld0l0ZW1zKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCh0aGlzLmF0b21fKTtcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy52YWx1ZXNfLmxlbmd0aDtcbiAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgaW5kZXggPSAwO1xuICAgIH0gZWxzZSBpZiAoaW5kZXggPiBsZW5ndGgpIHtcbiAgICAgIGluZGV4ID0gbGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwKSB7XG4gICAgICBpbmRleCA9IE1hdGgubWF4KDAsIGxlbmd0aCArIGluZGV4KTtcbiAgICB9XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGRlbGV0ZUNvdW50ID0gbGVuZ3RoIC0gaW5kZXg7XG4gICAgfSBlbHNlIGlmIChkZWxldGVDb3VudCA9PT0gdW5kZWZpbmVkIHx8IGRlbGV0ZUNvdW50ID09PSBudWxsKSB7XG4gICAgICBkZWxldGVDb3VudCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZUNvdW50ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZGVsZXRlQ291bnQsIGxlbmd0aCAtIGluZGV4KSk7XG4gICAgfVxuICAgIGlmIChuZXdJdGVtcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdJdGVtcyA9IEVNUFRZX0FSUkFZO1xuICAgIH1cbiAgICBpZiAoaGFzSW50ZXJjZXB0b3JzKHRoaXMpKSB7XG4gICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKHRoaXMsIHtcbiAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5XyxcbiAgICAgICAgdHlwZTogU1BMSUNFLFxuICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgIHJlbW92ZWRDb3VudDogZGVsZXRlQ291bnQsXG4gICAgICAgIGFkZGVkOiBuZXdJdGVtc1xuICAgICAgfSk7XG4gICAgICBpZiAoIWNoYW5nZSkge1xuICAgICAgICByZXR1cm4gRU1QVFlfQVJSQVk7XG4gICAgICB9XG4gICAgICBkZWxldGVDb3VudCA9IGNoYW5nZS5yZW1vdmVkQ291bnQ7XG4gICAgICBuZXdJdGVtcyA9IGNoYW5nZS5hZGRlZDtcbiAgICB9XG4gICAgbmV3SXRlbXMgPSBuZXdJdGVtcy5sZW5ndGggPT09IDAgPyBuZXdJdGVtcyA6IG5ld0l0ZW1zLm1hcChmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIF90aGlzLmVuaGFuY2VyXyh2LCB1bmRlZmluZWQpO1xuICAgIH0pO1xuICAgIGlmICh0aGlzLmxlZ2FjeU1vZGVfIHx8IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgdmFyIGxlbmd0aERlbHRhID0gbmV3SXRlbXMubGVuZ3RoIC0gZGVsZXRlQ291bnQ7XG4gICAgICB0aGlzLnVwZGF0ZUFycmF5TGVuZ3RoXyhsZW5ndGgsIGxlbmd0aERlbHRhKTsgLy8gY2hlY2tzIGlmIGludGVybmFsIGFycmF5IHdhc24ndCBtb2RpZmllZFxuICAgIH1cblxuICAgIHZhciByZXMgPSB0aGlzLnNwbGljZUl0ZW1zSW50b1ZhbHVlc18oaW5kZXgsIGRlbGV0ZUNvdW50LCBuZXdJdGVtcyk7XG4gICAgaWYgKGRlbGV0ZUNvdW50ICE9PSAwIHx8IG5ld0l0ZW1zLmxlbmd0aCAhPT0gMCkge1xuICAgICAgdGhpcy5ub3RpZnlBcnJheVNwbGljZV8oaW5kZXgsIG5ld0l0ZW1zLCByZXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kZWhhbmNlVmFsdWVzXyhyZXMpO1xuICB9O1xuICBfcHJvdG8uc3BsaWNlSXRlbXNJbnRvVmFsdWVzXyA9IGZ1bmN0aW9uIHNwbGljZUl0ZW1zSW50b1ZhbHVlc18oaW5kZXgsIGRlbGV0ZUNvdW50LCBuZXdJdGVtcykge1xuICAgIGlmIChuZXdJdGVtcy5sZW5ndGggPCBNQVhfU1BMSUNFX1NJWkUpIHtcbiAgICAgIHZhciBfdGhpcyR2YWx1ZXNfO1xuICAgICAgcmV0dXJuIChfdGhpcyR2YWx1ZXNfID0gdGhpcy52YWx1ZXNfKS5zcGxpY2UuYXBwbHkoX3RoaXMkdmFsdWVzXywgW2luZGV4LCBkZWxldGVDb3VudF0uY29uY2F0KG5ld0l0ZW1zKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoZSBpdGVtcyByZW1vdmVkIGJ5IHRoZSBzcGxpY2VcbiAgICAgIHZhciByZXMgPSB0aGlzLnZhbHVlc18uc2xpY2UoaW5kZXgsIGluZGV4ICsgZGVsZXRlQ291bnQpO1xuICAgICAgLy8gVGhlIGl0ZW1zIHRoYXQgdGhhdCBzaG91bGQgcmVtYWluIGF0IHRoZSBlbmQgb2YgdGhlIGFycmF5XG4gICAgICB2YXIgb2xkSXRlbXMgPSB0aGlzLnZhbHVlc18uc2xpY2UoaW5kZXggKyBkZWxldGVDb3VudCk7XG4gICAgICAvLyBOZXcgbGVuZ3RoIGlzIHRoZSBwcmV2aW91cyBsZW5ndGggKyBhZGRpdGlvbiBjb3VudCAtIGRlbGV0aW9uIGNvdW50XG4gICAgICB0aGlzLnZhbHVlc18ubGVuZ3RoICs9IG5ld0l0ZW1zLmxlbmd0aCAtIGRlbGV0ZUNvdW50O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnZhbHVlc19baW5kZXggKyBpXSA9IG5ld0l0ZW1zW2ldO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IG9sZEl0ZW1zLmxlbmd0aDsgX2krKykge1xuICAgICAgICB0aGlzLnZhbHVlc19baW5kZXggKyBuZXdJdGVtcy5sZW5ndGggKyBfaV0gPSBvbGRJdGVtc1tfaV07XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLm5vdGlmeUFycmF5Q2hpbGRVcGRhdGVfID0gZnVuY3Rpb24gbm90aWZ5QXJyYXlDaGlsZFVwZGF0ZV8oaW5kZXgsIG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgIHZhciBub3RpZnlTcHkgPSAhdGhpcy5vd25lZF8gJiYgaXNTcHlFbmFibGVkKCk7XG4gICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyh0aGlzKTtcbiAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweSA/IHtcbiAgICAgIG9ic2VydmFibGVLaW5kOiBcImFycmF5XCIsXG4gICAgICBvYmplY3Q6IHRoaXMucHJveHlfLFxuICAgICAgdHlwZTogVVBEQVRFLFxuICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLmF0b21fLm5hbWVfLFxuICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlXG4gICAgfSA6IG51bGw7XG4gICAgLy8gVGhlIHJlYXNvbiB3aHkgdGhpcyBpcyBvbiByaWdodCBoYW5kIHNpZGUgaGVyZSAoYW5kIG5vdCBhYm92ZSksIGlzIHRoaXMgd2F5IHRoZSB1Z2xpZmllciB3aWxsIGRyb3AgaXQsIGJ1dCBpdCB3b24ndFxuICAgIC8vIGNhdXNlIGFueSBydW50aW1lIG92ZXJoZWFkIGluIGRldmVsb3BtZW50IG1vZGUgd2l0aG91dCBOT0RFX0VOViBzZXQsIHVubGVzcyBzcHlpbmcgaXMgZW5hYmxlZFxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICBzcHlSZXBvcnRTdGFydChjaGFuZ2UpO1xuICAgIH1cbiAgICB0aGlzLmF0b21fLnJlcG9ydENoYW5nZWQoKTtcbiAgICBpZiAobm90aWZ5KSB7XG4gICAgICBub3RpZnlMaXN0ZW5lcnModGhpcywgY2hhbmdlKTtcbiAgICB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLm5vdGlmeUFycmF5U3BsaWNlXyA9IGZ1bmN0aW9uIG5vdGlmeUFycmF5U3BsaWNlXyhpbmRleCwgYWRkZWQsIHJlbW92ZWQpIHtcbiAgICB2YXIgbm90aWZ5U3B5ID0gIXRoaXMub3duZWRfICYmIGlzU3B5RW5hYmxlZCgpO1xuICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnModGhpcyk7XG4gICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHkgPyB7XG4gICAgICBvYnNlcnZhYmxlS2luZDogXCJhcnJheVwiLFxuICAgICAgb2JqZWN0OiB0aGlzLnByb3h5XyxcbiAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5hdG9tXy5uYW1lXyxcbiAgICAgIHR5cGU6IFNQTElDRSxcbiAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgIHJlbW92ZWQ6IHJlbW92ZWQsXG4gICAgICBhZGRlZDogYWRkZWQsXG4gICAgICByZW1vdmVkQ291bnQ6IHJlbW92ZWQubGVuZ3RoLFxuICAgICAgYWRkZWRDb3VudDogYWRkZWQubGVuZ3RoXG4gICAgfSA6IG51bGw7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgIHNweVJlcG9ydFN0YXJ0KGNoYW5nZSk7XG4gICAgfVxuICAgIHRoaXMuYXRvbV8ucmVwb3J0Q2hhbmdlZCgpO1xuICAgIC8vIGNvbmZvcm06IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L29ic2VydmVcbiAgICBpZiAobm90aWZ5KSB7XG4gICAgICBub3RpZnlMaXN0ZW5lcnModGhpcywgY2hhbmdlKTtcbiAgICB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmdldF8gPSBmdW5jdGlvbiBnZXRfKGluZGV4KSB7XG4gICAgaWYgKHRoaXMubGVnYWN5TW9kZV8gJiYgaW5kZXggPj0gdGhpcy52YWx1ZXNfLmxlbmd0aCkge1xuICAgICAgY29uc29sZS53YXJuKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiW21vYnguYXJyYXldIEF0dGVtcHQgdG8gcmVhZCBhbiBhcnJheSBpbmRleCAoXCIgKyBpbmRleCArIFwiKSB0aGF0IGlzIG91dCBvZiBib3VuZHMgKFwiICsgdGhpcy52YWx1ZXNfLmxlbmd0aCArIFwiKS4gUGxlYXNlIGNoZWNrIGxlbmd0aCBmaXJzdC4gT3V0IG9mIGJvdW5kIGluZGljZXMgd2lsbCBub3QgYmUgdHJhY2tlZCBieSBNb2JYXCIgOiBcIlttb2J4XSBPdXQgb2YgYm91bmRzIHJlYWQ6IFwiICsgaW5kZXgpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdGhpcy5hdG9tXy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgIHJldHVybiB0aGlzLmRlaGFuY2VWYWx1ZV8odGhpcy52YWx1ZXNfW2luZGV4XSk7XG4gIH07XG4gIF9wcm90by5zZXRfID0gZnVuY3Rpb24gc2V0XyhpbmRleCwgbmV3VmFsdWUpIHtcbiAgICB2YXIgdmFsdWVzID0gdGhpcy52YWx1ZXNfO1xuICAgIGlmICh0aGlzLmxlZ2FjeU1vZGVfICYmIGluZGV4ID4gdmFsdWVzLmxlbmd0aCkge1xuICAgICAgLy8gb3V0IG9mIGJvdW5kc1xuICAgICAgZGllKDE3LCBpbmRleCwgdmFsdWVzLmxlbmd0aCk7XG4gICAgfVxuICAgIGlmIChpbmRleCA8IHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgIC8vIHVwZGF0ZSBhdCBpbmRleCBpbiByYW5nZVxuICAgICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQodGhpcy5hdG9tXyk7XG4gICAgICB2YXIgb2xkVmFsdWUgPSB2YWx1ZXNbaW5kZXhdO1xuICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKHRoaXMsIHtcbiAgICAgICAgICB0eXBlOiBVUERBVEUsXG4gICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5XyxcbiAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWNoYW5nZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBuZXdWYWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgIH1cbiAgICAgIG5ld1ZhbHVlID0gdGhpcy5lbmhhbmNlcl8obmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgIHZhciBjaGFuZ2VkID0gbmV3VmFsdWUgIT09IG9sZFZhbHVlO1xuICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgdmFsdWVzW2luZGV4XSA9IG5ld1ZhbHVlO1xuICAgICAgICB0aGlzLm5vdGlmeUFycmF5Q2hpbGRVcGRhdGVfKGluZGV4LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBGb3Igb3V0IG9mIGJvdW5kIGluZGV4LCB3ZSBkb24ndCBjcmVhdGUgYW4gYWN0dWFsIHNwYXJzZSBhcnJheSxcbiAgICAgIC8vIGJ1dCByYXRoZXIgZmlsbCB0aGUgaG9sZXMgd2l0aCB1bmRlZmluZWQgKHNhbWUgYXMgc2V0QXJyYXlMZW5ndGhfKS5cbiAgICAgIC8vIFRoaXMgY291bGQgYmUgY29uc2lkZXJlZCBhIGJ1Zy5cbiAgICAgIHZhciBuZXdJdGVtcyA9IG5ldyBBcnJheShpbmRleCArIDEgLSB2YWx1ZXMubGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgIG5ld0l0ZW1zW2ldID0gdW5kZWZpbmVkO1xuICAgICAgfSAvLyBObyBBcnJheS5maWxsIGV2ZXJ5d2hlcmUuLi5cbiAgICAgIG5ld0l0ZW1zW25ld0l0ZW1zLmxlbmd0aCAtIDFdID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLnNwbGljZVdpdGhBcnJheV8odmFsdWVzLmxlbmd0aCwgMCwgbmV3SXRlbXMpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uO1xufSgpO1xuZnVuY3Rpb24gY3JlYXRlT2JzZXJ2YWJsZUFycmF5KGluaXRpYWxWYWx1ZXMsIGVuaGFuY2VyLCBuYW1lLCBvd25lZCkge1xuICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7XG4gICAgbmFtZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiT2JzZXJ2YWJsZUFycmF5QFwiICsgZ2V0TmV4dElkKCkgOiBcIk9ic2VydmFibGVBcnJheVwiO1xuICB9XG4gIGlmIChvd25lZCA9PT0gdm9pZCAwKSB7XG4gICAgb3duZWQgPSBmYWxzZTtcbiAgfVxuICBhc3NlcnRQcm94aWVzKCk7XG4gIHJldHVybiBpbml0T2JzZXJ2YWJsZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFkbSA9IG5ldyBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbihuYW1lLCBlbmhhbmNlciwgb3duZWQsIGZhbHNlKTtcbiAgICBhZGRIaWRkZW5GaW5hbFByb3AoYWRtLnZhbHVlc18sICRtb2J4LCBhZG0pO1xuICAgIHZhciBwcm94eSA9IG5ldyBQcm94eShhZG0udmFsdWVzXywgYXJyYXlUcmFwcyk7XG4gICAgYWRtLnByb3h5XyA9IHByb3h5O1xuICAgIGlmIChpbml0aWFsVmFsdWVzICYmIGluaXRpYWxWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICBhZG0uc3BsaWNlV2l0aEFycmF5XygwLCAwLCBpbml0aWFsVmFsdWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHByb3h5O1xuICB9KTtcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxudmFyIGFycmF5RXh0ZW5zaW9ucyA9IHtcbiAgY2xlYXI6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHJldHVybiB0aGlzLnNwbGljZSgwKTtcbiAgfSxcbiAgcmVwbGFjZTogZnVuY3Rpb24gcmVwbGFjZShuZXdJdGVtcykge1xuICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4XTtcbiAgICByZXR1cm4gYWRtLnNwbGljZVdpdGhBcnJheV8oMCwgYWRtLnZhbHVlc18ubGVuZ3RoLCBuZXdJdGVtcyk7XG4gIH0sXG4gIC8vIFVzZWQgYnkgSlNPTi5zdHJpbmdpZnlcbiAgdG9KU09OOiBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIHRoaXMuc2xpY2UoKTtcbiAgfSxcbiAgLypcbiAgICogZnVuY3Rpb25zIHRoYXQgZG8gYWx0ZXIgdGhlIGludGVybmFsIHN0cnVjdHVyZSBvZiB0aGUgYXJyYXksIChiYXNlZCBvbiBsaWIuZXM2LmQudHMpXG4gICAqIHNpbmNlIHRoZXNlIGZ1bmN0aW9ucyBhbHRlciB0aGUgaW5uZXIgc3RydWN0dXJlIG9mIHRoZSBhcnJheSwgdGhlIGhhdmUgc2lkZSBlZmZlY3RzLlxuICAgKiBCZWNhdXNlIHRoZSBoYXZlIHNpZGUgZWZmZWN0cywgdGhleSBzaG91bGQgbm90IGJlIHVzZWQgaW4gY29tcHV0ZWQgZnVuY3Rpb24sXG4gICAqIGFuZCBmb3IgdGhhdCByZWFzb24gdGhlIGRvIG5vdCBjYWxsIGRlcGVuZGVuY3lTdGF0ZS5ub3RpZnlPYnNlcnZlZFxuICAgKi9cbiAgc3BsaWNlOiBmdW5jdGlvbiBzcGxpY2UoaW5kZXgsIGRlbGV0ZUNvdW50KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG5ld0l0ZW1zID0gbmV3IEFycmF5KF9sZW4gPiAyID8gX2xlbiAtIDIgOiAwKSwgX2tleSA9IDI7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIG5ld0l0ZW1zW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG4gICAgdmFyIGFkbSA9IHRoaXNbJG1vYnhdO1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICByZXR1cm4gW107XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBhZG0uc3BsaWNlV2l0aEFycmF5XyhpbmRleCk7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBhZG0uc3BsaWNlV2l0aEFycmF5XyhpbmRleCwgZGVsZXRlQ291bnQpO1xuICAgIH1cbiAgICByZXR1cm4gYWRtLnNwbGljZVdpdGhBcnJheV8oaW5kZXgsIGRlbGV0ZUNvdW50LCBuZXdJdGVtcyk7XG4gIH0sXG4gIHNwbGljZVdpdGhBcnJheTogZnVuY3Rpb24gc3BsaWNlV2l0aEFycmF5KGluZGV4LCBkZWxldGVDb3VudCwgbmV3SXRlbXMpIHtcbiAgICByZXR1cm4gdGhpc1skbW9ieF0uc3BsaWNlV2l0aEFycmF5XyhpbmRleCwgZGVsZXRlQ291bnQsIG5ld0l0ZW1zKTtcbiAgfSxcbiAgcHVzaDogZnVuY3Rpb24gcHVzaCgpIHtcbiAgICB2YXIgYWRtID0gdGhpc1skbW9ieF07XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBpdGVtcyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgaXRlbXNbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG4gICAgYWRtLnNwbGljZVdpdGhBcnJheV8oYWRtLnZhbHVlc18ubGVuZ3RoLCAwLCBpdGVtcyk7XG4gICAgcmV0dXJuIGFkbS52YWx1ZXNfLmxlbmd0aDtcbiAgfSxcbiAgcG9wOiBmdW5jdGlvbiBwb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3BsaWNlKE1hdGgubWF4KHRoaXNbJG1vYnhdLnZhbHVlc18ubGVuZ3RoIC0gMSwgMCksIDEpWzBdO1xuICB9LFxuICBzaGlmdDogZnVuY3Rpb24gc2hpZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3BsaWNlKDAsIDEpWzBdO1xuICB9LFxuICB1bnNoaWZ0OiBmdW5jdGlvbiB1bnNoaWZ0KCkge1xuICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4XTtcbiAgICBmb3IgKHZhciBfbGVuMyA9IGFyZ3VtZW50cy5sZW5ndGgsIGl0ZW1zID0gbmV3IEFycmF5KF9sZW4zKSwgX2tleTMgPSAwOyBfa2V5MyA8IF9sZW4zOyBfa2V5MysrKSB7XG4gICAgICBpdGVtc1tfa2V5M10gPSBhcmd1bWVudHNbX2tleTNdO1xuICAgIH1cbiAgICBhZG0uc3BsaWNlV2l0aEFycmF5XygwLCAwLCBpdGVtcyk7XG4gICAgcmV0dXJuIGFkbS52YWx1ZXNfLmxlbmd0aDtcbiAgfSxcbiAgcmV2ZXJzZTogZnVuY3Rpb24gcmV2ZXJzZSgpIHtcbiAgICAvLyByZXZlcnNlIGJ5IGRlZmF1bHQgbXV0YXRlcyBpbiBwbGFjZSBiZWZvcmUgcmV0dXJuaW5nIHRoZSByZXN1bHRcbiAgICAvLyB3aGljaCBtYWtlcyBpdCBib3RoIGEgJ2Rlcml2YXRpb24nIGFuZCBhICdtdXRhdGlvbicuXG4gICAgaWYgKGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbikge1xuICAgICAgZGllKDM3LCBcInJldmVyc2VcIik7XG4gICAgfVxuICAgIHRoaXMucmVwbGFjZSh0aGlzLnNsaWNlKCkucmV2ZXJzZSgpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgc29ydDogZnVuY3Rpb24gc29ydCgpIHtcbiAgICAvLyBzb3J0IGJ5IGRlZmF1bHQgbXV0YXRlcyBpbiBwbGFjZSBiZWZvcmUgcmV0dXJuaW5nIHRoZSByZXN1bHRcbiAgICAvLyB3aGljaCBnb2VzIGFnYWluc3QgYWxsIGdvb2QgcHJhY3RpY2VzLiBMZXQncyBub3QgY2hhbmdlIHRoZSBhcnJheSBpbiBwbGFjZSFcbiAgICBpZiAoZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uKSB7XG4gICAgICBkaWUoMzcsIFwic29ydFwiKTtcbiAgICB9XG4gICAgdmFyIGNvcHkgPSB0aGlzLnNsaWNlKCk7XG4gICAgY29weS5zb3J0LmFwcGx5KGNvcHksIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5yZXBsYWNlKGNvcHkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSh2YWx1ZSkge1xuICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4XTtcbiAgICB2YXIgaWR4ID0gYWRtLmRlaGFuY2VWYWx1ZXNfKGFkbS52YWx1ZXNfKS5pbmRleE9mKHZhbHVlKTtcbiAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgIHRoaXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuLyoqXG4gKiBXcmFwIGZ1bmN0aW9uIGZyb20gcHJvdG90eXBlXG4gKiBXaXRob3V0IHRoaXMsIGV2ZXJ5dGhpbmcgd29ya3MgYXMgd2VsbCwgYnV0IHRoaXMgd29ya3NcbiAqIGZhc3RlciBhcyBldmVyeXRoaW5nIHdvcmtzIG9uIHVucHJveGllZCB2YWx1ZXNcbiAqL1xuYWRkQXJyYXlFeHRlbnNpb24oXCJhdFwiLCBzaW1wbGVGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwiY29uY2F0XCIsIHNpbXBsZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJmbGF0XCIsIHNpbXBsZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJpbmNsdWRlc1wiLCBzaW1wbGVGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwiaW5kZXhPZlwiLCBzaW1wbGVGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwiam9pblwiLCBzaW1wbGVGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwibGFzdEluZGV4T2ZcIiwgc2ltcGxlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcInNsaWNlXCIsIHNpbXBsZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJ0b1N0cmluZ1wiLCBzaW1wbGVGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwidG9Mb2NhbGVTdHJpbmdcIiwgc2ltcGxlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcInRvU29ydGVkXCIsIHNpbXBsZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJ0b1NwbGljZWRcIiwgc2ltcGxlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcIndpdGhcIiwgc2ltcGxlRnVuYyk7XG4vLyBtYXBcbmFkZEFycmF5RXh0ZW5zaW9uKFwiZXZlcnlcIiwgbWFwTGlrZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJmaWx0ZXJcIiwgbWFwTGlrZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJmaW5kXCIsIG1hcExpa2VGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwiZmluZEluZGV4XCIsIG1hcExpa2VGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwiZmluZExhc3RcIiwgbWFwTGlrZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJmaW5kTGFzdEluZGV4XCIsIG1hcExpa2VGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwiZmxhdE1hcFwiLCBtYXBMaWtlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcImZvckVhY2hcIiwgbWFwTGlrZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJtYXBcIiwgbWFwTGlrZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJzb21lXCIsIG1hcExpa2VGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwidG9SZXZlcnNlZFwiLCBtYXBMaWtlRnVuYyk7XG4vLyByZWR1Y2VcbmFkZEFycmF5RXh0ZW5zaW9uKFwicmVkdWNlXCIsIHJlZHVjZUxpa2VGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwicmVkdWNlUmlnaHRcIiwgcmVkdWNlTGlrZUZ1bmMpO1xuZnVuY3Rpb24gYWRkQXJyYXlFeHRlbnNpb24oZnVuY05hbWUsIGZ1bmNGYWN0b3J5KSB7XG4gIGlmICh0eXBlb2YgQXJyYXkucHJvdG90eXBlW2Z1bmNOYW1lXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgYXJyYXlFeHRlbnNpb25zW2Z1bmNOYW1lXSA9IGZ1bmNGYWN0b3J5KGZ1bmNOYW1lKTtcbiAgfVxufVxuLy8gUmVwb3J0IGFuZCBkZWxlZ2F0ZSB0byBkZWhhbmNlZCBhcnJheVxuZnVuY3Rpb24gc2ltcGxlRnVuYyhmdW5jTmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4XTtcbiAgICBhZG0uYXRvbV8ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICB2YXIgZGVoYW5jZWRWYWx1ZXMgPSBhZG0uZGVoYW5jZVZhbHVlc18oYWRtLnZhbHVlc18pO1xuICAgIHJldHVybiBkZWhhbmNlZFZhbHVlc1tmdW5jTmFtZV0uYXBwbHkoZGVoYW5jZWRWYWx1ZXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG4vLyBNYWtlIHN1cmUgY2FsbGJhY2tzIHJlY2VpdmUgY29ycmVjdCBhcnJheSBhcmcgIzIzMjZcbmZ1bmN0aW9uIG1hcExpa2VGdW5jKGZ1bmNOYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICB2YXIgYWRtID0gdGhpc1skbW9ieF07XG4gICAgYWRtLmF0b21fLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgdmFyIGRlaGFuY2VkVmFsdWVzID0gYWRtLmRlaGFuY2VWYWx1ZXNfKGFkbS52YWx1ZXNfKTtcbiAgICByZXR1cm4gZGVoYW5jZWRWYWx1ZXNbZnVuY05hbWVdKGZ1bmN0aW9uIChlbGVtZW50LCBpbmRleCkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgZWxlbWVudCwgaW5kZXgsIF90aGlzMik7XG4gICAgfSk7XG4gIH07XG59XG4vLyBNYWtlIHN1cmUgY2FsbGJhY2tzIHJlY2VpdmUgY29ycmVjdCBhcnJheSBhcmcgIzIzMjZcbmZ1bmN0aW9uIHJlZHVjZUxpa2VGdW5jKGZ1bmNOYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG4gICAgdmFyIGFkbSA9IHRoaXNbJG1vYnhdO1xuICAgIGFkbS5hdG9tXy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgIHZhciBkZWhhbmNlZFZhbHVlcyA9IGFkbS5kZWhhbmNlVmFsdWVzXyhhZG0udmFsdWVzXyk7XG4gICAgLy8gIzI0MzIgLSByZWR1Y2UgYmVoYXZpb3IgZGVwZW5kcyBvbiBhcmd1bWVudHMubGVuZ3RoXG4gICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzWzBdO1xuICAgIGFyZ3VtZW50c1swXSA9IGZ1bmN0aW9uIChhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUsIGluZGV4LCBfdGhpczMpO1xuICAgIH07XG4gICAgcmV0dXJuIGRlaGFuY2VkVmFsdWVzW2Z1bmNOYW1lXS5hcHBseShkZWhhbmNlZFZhbHVlcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbnZhciBpc09ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUoXCJPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvblwiLCBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbik7XG5mdW5jdGlvbiBpc09ic2VydmFibGVBcnJheSh0aGluZykge1xuICByZXR1cm4gaXNPYmplY3QodGhpbmcpICYmIGlzT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24odGhpbmdbJG1vYnhdKTtcbn1cblxudmFyIF9TeW1ib2wkaXRlcmF0b3IsIF9TeW1ib2wkdG9TdHJpbmdUYWc7XG52YXIgT2JzZXJ2YWJsZU1hcE1hcmtlciA9IHt9O1xudmFyIEFERCA9IFwiYWRkXCI7XG52YXIgREVMRVRFID0gXCJkZWxldGVcIjtcbi8vIGp1c3QgZXh0ZW5kIE1hcD8gU2VlIGFsc28gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vbmVzdGhhcnVzLzEzYjRkNzRmMmVmNGEyZjQzNTdkYmQzZmMyM2MxZTU0XG4vLyBCdXQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9tb2J4anMvbW9ieC9pc3N1ZXMvMTU1NlxuX1N5bWJvbCRpdGVyYXRvciA9IFN5bWJvbC5pdGVyYXRvcjtcbl9TeW1ib2wkdG9TdHJpbmdUYWcgPSBTeW1ib2wudG9TdHJpbmdUYWc7XG52YXIgT2JzZXJ2YWJsZU1hcCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8vIGhhc01hcCwgbm90IGhhc2hNYXAgPi0pLlxuXG4gIGZ1bmN0aW9uIE9ic2VydmFibGVNYXAoaW5pdGlhbERhdGEsIGVuaGFuY2VyXywgbmFtZV8pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIGlmIChlbmhhbmNlcl8gPT09IHZvaWQgMCkge1xuICAgICAgZW5oYW5jZXJfID0gZGVlcEVuaGFuY2VyO1xuICAgIH1cbiAgICBpZiAobmFtZV8gPT09IHZvaWQgMCkge1xuICAgICAgbmFtZV8gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcIk9ic2VydmFibGVNYXBAXCIgKyBnZXROZXh0SWQoKSA6IFwiT2JzZXJ2YWJsZU1hcFwiO1xuICAgIH1cbiAgICB0aGlzLmVuaGFuY2VyXyA9IHZvaWQgMDtcbiAgICB0aGlzLm5hbWVfID0gdm9pZCAwO1xuICAgIHRoaXNbJG1vYnhdID0gT2JzZXJ2YWJsZU1hcE1hcmtlcjtcbiAgICB0aGlzLmRhdGFfID0gdm9pZCAwO1xuICAgIHRoaXMuaGFzTWFwXyA9IHZvaWQgMDtcbiAgICB0aGlzLmtleXNBdG9tXyA9IHZvaWQgMDtcbiAgICB0aGlzLmludGVyY2VwdG9yc18gPSB2b2lkIDA7XG4gICAgdGhpcy5jaGFuZ2VMaXN0ZW5lcnNfID0gdm9pZCAwO1xuICAgIHRoaXMuZGVoYW5jZXIgPSB2b2lkIDA7XG4gICAgdGhpcy5lbmhhbmNlcl8gPSBlbmhhbmNlcl87XG4gICAgdGhpcy5uYW1lXyA9IG5hbWVfO1xuICAgIGlmICghaXNGdW5jdGlvbihNYXApKSB7XG4gICAgICBkaWUoMTgpO1xuICAgIH1cbiAgICBpbml0T2JzZXJ2YWJsZShmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5rZXlzQXRvbV8gPSBjcmVhdGVBdG9tKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IF90aGlzLm5hbWVfICsgXCIua2V5cygpXCIgOiBcIk9ic2VydmFibGVNYXAua2V5cygpXCIpO1xuICAgICAgX3RoaXMuZGF0YV8gPSBuZXcgTWFwKCk7XG4gICAgICBfdGhpcy5oYXNNYXBfID0gbmV3IE1hcCgpO1xuICAgICAgaWYgKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIF90aGlzLm1lcmdlKGluaXRpYWxEYXRhKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICB2YXIgX3Byb3RvID0gT2JzZXJ2YWJsZU1hcC5wcm90b3R5cGU7XG4gIF9wcm90by5oYXNfID0gZnVuY3Rpb24gaGFzXyhrZXkpIHtcbiAgICByZXR1cm4gdGhpcy5kYXRhXy5oYXMoa2V5KTtcbiAgfTtcbiAgX3Byb3RvLmhhcyA9IGZ1bmN0aW9uIGhhcyhrZXkpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICBpZiAoIWdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbikge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzXyhrZXkpO1xuICAgIH1cbiAgICB2YXIgZW50cnkgPSB0aGlzLmhhc01hcF8uZ2V0KGtleSk7XG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgdmFyIG5ld0VudHJ5ID0gZW50cnkgPSBuZXcgT2JzZXJ2YWJsZVZhbHVlKHRoaXMuaGFzXyhrZXkpLCByZWZlcmVuY2VFbmhhbmNlciwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gdGhpcy5uYW1lXyArIFwiLlwiICsgc3RyaW5naWZ5S2V5KGtleSkgKyBcIj9cIiA6IFwiT2JzZXJ2YWJsZU1hcC5rZXk/XCIsIGZhbHNlKTtcbiAgICAgIHRoaXMuaGFzTWFwXy5zZXQoa2V5LCBuZXdFbnRyeSk7XG4gICAgICBvbkJlY29tZVVub2JzZXJ2ZWQobmV3RW50cnksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMi5oYXNNYXBfW1wiZGVsZXRlXCJdKGtleSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGVudHJ5LmdldCgpO1xuICB9O1xuICBfcHJvdG8uc2V0ID0gZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICB2YXIgaGFzS2V5ID0gdGhpcy5oYXNfKGtleSk7XG4gICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgIHR5cGU6IGhhc0tleSA/IFVQREFURSA6IEFERCxcbiAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICBuZXdWYWx1ZTogdmFsdWUsXG4gICAgICAgIG5hbWU6IGtleVxuICAgICAgfSk7XG4gICAgICBpZiAoIWNoYW5nZSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHZhbHVlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgIH1cbiAgICBpZiAoaGFzS2V5KSB7XG4gICAgICB0aGlzLnVwZGF0ZVZhbHVlXyhrZXksIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRWYWx1ZV8oa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBfcHJvdG9bXCJkZWxldGVcIl0gPSBmdW5jdGlvbiBfZGVsZXRlKGtleSkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkKHRoaXMua2V5c0F0b21fKTtcbiAgICBpZiAoaGFzSW50ZXJjZXB0b3JzKHRoaXMpKSB7XG4gICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKHRoaXMsIHtcbiAgICAgICAgdHlwZTogREVMRVRFLFxuICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgIG5hbWU6IGtleVxuICAgICAgfSk7XG4gICAgICBpZiAoIWNoYW5nZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmhhc18oa2V5KSkge1xuICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCgpO1xuICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyh0aGlzKTtcbiAgICAgIHZhciBfY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweSA/IHtcbiAgICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwibWFwXCIsXG4gICAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5uYW1lXyxcbiAgICAgICAgdHlwZTogREVMRVRFLFxuICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgIG9sZFZhbHVlOiB0aGlzLmRhdGFfLmdldChrZXkpLnZhbHVlXyxcbiAgICAgICAgbmFtZToga2V5XG4gICAgICB9IDogbnVsbDtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICAgIHNweVJlcG9ydFN0YXJ0KF9jaGFuZ2UpO1xuICAgICAgfSAvLyBUT0RPIGZpeCB0eXBlXG4gICAgICB0cmFuc2FjdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpczMkaGFzTWFwXyRnZXQ7XG4gICAgICAgIF90aGlzMy5rZXlzQXRvbV8ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICAoX3RoaXMzJGhhc01hcF8kZ2V0ID0gX3RoaXMzLmhhc01hcF8uZ2V0KGtleSkpID09IG51bGwgPyB2b2lkIDAgOiBfdGhpczMkaGFzTWFwXyRnZXQuc2V0TmV3VmFsdWVfKGZhbHNlKTtcbiAgICAgICAgdmFyIG9ic2VydmFibGUgPSBfdGhpczMuZGF0YV8uZ2V0KGtleSk7XG4gICAgICAgIG9ic2VydmFibGUuc2V0TmV3VmFsdWVfKHVuZGVmaW5lZCk7XG4gICAgICAgIF90aGlzMy5kYXRhX1tcImRlbGV0ZVwiXShrZXkpO1xuICAgICAgfSk7XG4gICAgICBpZiAobm90aWZ5KSB7XG4gICAgICAgIG5vdGlmeUxpc3RlbmVycyh0aGlzLCBfY2hhbmdlKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbiAgX3Byb3RvLnVwZGF0ZVZhbHVlXyA9IGZ1bmN0aW9uIHVwZGF0ZVZhbHVlXyhrZXksIG5ld1ZhbHVlKSB7XG4gICAgdmFyIG9ic2VydmFibGUgPSB0aGlzLmRhdGFfLmdldChrZXkpO1xuICAgIG5ld1ZhbHVlID0gb2JzZXJ2YWJsZS5wcmVwYXJlTmV3VmFsdWVfKG5ld1ZhbHVlKTtcbiAgICBpZiAobmV3VmFsdWUgIT09IGdsb2JhbFN0YXRlLlVOQ0hBTkdFRCkge1xuICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCgpO1xuICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyh0aGlzKTtcbiAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5ID8ge1xuICAgICAgICBvYnNlcnZhYmxlS2luZDogXCJtYXBcIixcbiAgICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgICB0eXBlOiBVUERBVEUsXG4gICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgb2xkVmFsdWU6IG9ic2VydmFibGUudmFsdWVfLFxuICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgfSA6IG51bGw7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgICBzcHlSZXBvcnRTdGFydChjaGFuZ2UpO1xuICAgICAgfSAvLyBUT0RPIGZpeCB0eXBlXG4gICAgICBvYnNlcnZhYmxlLnNldE5ld1ZhbHVlXyhuZXdWYWx1ZSk7XG4gICAgICBpZiAobm90aWZ5KSB7XG4gICAgICAgIG5vdGlmeUxpc3RlbmVycyh0aGlzLCBjaGFuZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgICAgc3B5UmVwb3J0RW5kKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBfcHJvdG8uYWRkVmFsdWVfID0gZnVuY3Rpb24gYWRkVmFsdWVfKGtleSwgbmV3VmFsdWUpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcbiAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCh0aGlzLmtleXNBdG9tXyk7XG4gICAgdHJhbnNhY3Rpb24oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIF90aGlzNCRoYXNNYXBfJGdldDtcbiAgICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGVWYWx1ZShuZXdWYWx1ZSwgX3RoaXM0LmVuaGFuY2VyXywgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gX3RoaXM0Lm5hbWVfICsgXCIuXCIgKyBzdHJpbmdpZnlLZXkoa2V5KSA6IFwiT2JzZXJ2YWJsZU1hcC5rZXlcIiwgZmFsc2UpO1xuICAgICAgX3RoaXM0LmRhdGFfLnNldChrZXksIG9ic2VydmFibGUpO1xuICAgICAgbmV3VmFsdWUgPSBvYnNlcnZhYmxlLnZhbHVlXzsgLy8gdmFsdWUgbWlnaHQgaGF2ZSBiZWVuIGNoYW5nZWRcbiAgICAgIChfdGhpczQkaGFzTWFwXyRnZXQgPSBfdGhpczQuaGFzTWFwXy5nZXQoa2V5KSkgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzNCRoYXNNYXBfJGdldC5zZXROZXdWYWx1ZV8odHJ1ZSk7XG4gICAgICBfdGhpczQua2V5c0F0b21fLnJlcG9ydENoYW5nZWQoKTtcbiAgICB9KTtcbiAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkKCk7XG4gICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyh0aGlzKTtcbiAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweSA/IHtcbiAgICAgIG9ic2VydmFibGVLaW5kOiBcIm1hcFwiLFxuICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgdHlwZTogQURELFxuICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgbmFtZToga2V5LFxuICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgfSA6IG51bGw7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgIHNweVJlcG9ydFN0YXJ0KGNoYW5nZSk7XG4gICAgfSAvLyBUT0RPIGZpeCB0eXBlXG4gICAgaWYgKG5vdGlmeSkge1xuICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIGNoYW5nZSk7XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5nZXQgPSBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgaWYgKHRoaXMuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VWYWx1ZV8odGhpcy5kYXRhXy5nZXQoa2V5KS5nZXQoKSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRlaGFuY2VWYWx1ZV8odW5kZWZpbmVkKTtcbiAgfTtcbiAgX3Byb3RvLmRlaGFuY2VWYWx1ZV8gPSBmdW5jdGlvbiBkZWhhbmNlVmFsdWVfKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuZGVoYW5jZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVoYW5jZXIodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG4gIF9wcm90by5rZXlzID0gZnVuY3Rpb24ga2V5cygpIHtcbiAgICB0aGlzLmtleXNBdG9tXy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgIHJldHVybiB0aGlzLmRhdGFfLmtleXMoKTtcbiAgfTtcbiAgX3Byb3RvLnZhbHVlcyA9IGZ1bmN0aW9uIHZhbHVlcygpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGtleXMgPSB0aGlzLmtleXMoKTtcbiAgICByZXR1cm4gbWFrZUl0ZXJhYmxlKHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgIHZhciBfa2V5cyRuZXh0ID0ga2V5cy5uZXh0KCksXG4gICAgICAgICAgZG9uZSA9IF9rZXlzJG5leHQuZG9uZSxcbiAgICAgICAgICB2YWx1ZSA9IF9rZXlzJG5leHQudmFsdWU7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZG9uZTogZG9uZSxcbiAgICAgICAgICB2YWx1ZTogZG9uZSA/IHVuZGVmaW5lZCA6IHNlbGYuZ2V0KHZhbHVlKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICBfcHJvdG8uZW50cmllcyA9IGZ1bmN0aW9uIGVudHJpZXMoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBrZXlzID0gdGhpcy5rZXlzKCk7XG4gICAgcmV0dXJuIG1ha2VJdGVyYWJsZSh7XG4gICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICB2YXIgX2tleXMkbmV4dDIgPSBrZXlzLm5leHQoKSxcbiAgICAgICAgICBkb25lID0gX2tleXMkbmV4dDIuZG9uZSxcbiAgICAgICAgICB2YWx1ZSA9IF9rZXlzJG5leHQyLnZhbHVlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGRvbmU6IGRvbmUsXG4gICAgICAgICAgdmFsdWU6IGRvbmUgPyB1bmRlZmluZWQgOiBbdmFsdWUsIHNlbGYuZ2V0KHZhbHVlKV1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgX3Byb3RvW19TeW1ib2wkaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmVudHJpZXMoKTtcbiAgfTtcbiAgX3Byb3RvLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZSh0aGlzKSwgX3N0ZXA7ICEoX3N0ZXAgPSBfaXRlcmF0b3IoKSkuZG9uZTspIHtcbiAgICAgIHZhciBfc3RlcCR2YWx1ZSA9IF9zdGVwLnZhbHVlLFxuICAgICAgICBrZXkgPSBfc3RlcCR2YWx1ZVswXSxcbiAgICAgICAgdmFsdWUgPSBfc3RlcCR2YWx1ZVsxXTtcbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsdWUsIGtleSwgdGhpcyk7XG4gICAgfVxuICB9XG4gIC8qKiBNZXJnZSBhbm90aGVyIG9iamVjdCBpbnRvIHRoaXMgb2JqZWN0LCByZXR1cm5zIHRoaXMuICovO1xuICBfcHJvdG8ubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShvdGhlcikge1xuICAgIHZhciBfdGhpczUgPSB0aGlzO1xuICAgIGlmIChpc09ic2VydmFibGVNYXAob3RoZXIpKSB7XG4gICAgICBvdGhlciA9IG5ldyBNYXAob3RoZXIpO1xuICAgIH1cbiAgICB0cmFuc2FjdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoaXNQbGFpbk9iamVjdChvdGhlcikpIHtcbiAgICAgICAgZ2V0UGxhaW5PYmplY3RLZXlzKG90aGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXM1LnNldChrZXksIG90aGVyW2tleV0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvdGhlcikpIHtcbiAgICAgICAgb3RoZXIuZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICAgIHZhciBrZXkgPSBfcmVmWzBdLFxuICAgICAgICAgICAgdmFsdWUgPSBfcmVmWzFdO1xuICAgICAgICAgIHJldHVybiBfdGhpczUuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNFUzZNYXAob3RoZXIpKSB7XG4gICAgICAgIGlmIChvdGhlci5jb25zdHJ1Y3RvciAhPT0gTWFwKSB7XG4gICAgICAgICAgZGllKDE5LCBvdGhlcik7XG4gICAgICAgIH1cbiAgICAgICAgb3RoZXIuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgIHJldHVybiBfdGhpczUuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAob3RoZXIgIT09IG51bGwgJiYgb3RoZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkaWUoMjAsIG90aGVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgX3Byb3RvLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgdmFyIF90aGlzNiA9IHRoaXM7XG4gICAgdHJhbnNhY3Rpb24oZnVuY3Rpb24gKCkge1xuICAgICAgdW50cmFja2VkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UoX3RoaXM2LmtleXMoKSksIF9zdGVwMjsgIShfc3RlcDIgPSBfaXRlcmF0b3IyKCkpLmRvbmU7KSB7XG4gICAgICAgICAgdmFyIGtleSA9IF9zdGVwMi52YWx1ZTtcbiAgICAgICAgICBfdGhpczZbXCJkZWxldGVcIl0oa2V5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG4gIF9wcm90by5yZXBsYWNlID0gZnVuY3Rpb24gcmVwbGFjZSh2YWx1ZXMpIHtcbiAgICB2YXIgX3RoaXM3ID0gdGhpcztcbiAgICAvLyBJbXBsZW1lbnRhdGlvbiByZXF1aXJlbWVudHM6XG4gICAgLy8gLSByZXNwZWN0IG9yZGVyaW5nIG9mIHJlcGxhY2VtZW50IG1hcFxuICAgIC8vIC0gYWxsb3cgaW50ZXJjZXB0b3JzIHRvIHJ1biBhbmQgcG90ZW50aWFsbHkgcHJldmVudCBpbmRpdmlkdWFsIG9wZXJhdGlvbnNcbiAgICAvLyAtIGRvbid0IHJlY3JlYXRlIG9ic2VydmFibGVzIHRoYXQgYWxyZWFkeSBleGlzdCBpbiBvcmlnaW5hbCBtYXAgKHNvIHdlIGRvbid0IGRlc3Ryb3kgZXhpc3Rpbmcgc3Vic2NyaXB0aW9ucylcbiAgICAvLyAtIGRvbid0IF9rZXlzQXRvbS5yZXBvcnRDaGFuZ2VkIGlmIHRoZSBrZXlzIG9mIHJlc3VsdGluZyBtYXAgYXJlIGluZGVudGljYWwgKG9yZGVyIG1hdHRlcnMhKVxuICAgIC8vIC0gbm90ZSB0aGF0IHJlc3VsdCBtYXAgbWF5IGRpZmZlciBmcm9tIHJlcGxhY2VtZW50IG1hcCBkdWUgdG8gdGhlIGludGVyY2VwdG9yc1xuICAgIHRyYW5zYWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIENvbnZlcnQgdG8gbWFwIHNvIHdlIGNhbiBkbyBxdWljayBrZXkgbG9va3Vwc1xuICAgICAgdmFyIHJlcGxhY2VtZW50TWFwID0gY29udmVydFRvTWFwKHZhbHVlcyk7XG4gICAgICB2YXIgb3JkZXJlZERhdGEgPSBuZXcgTWFwKCk7XG4gICAgICAvLyBVc2VkIGZvciBvcHRpbWl6YXRpb25cbiAgICAgIHZhciBrZXlzUmVwb3J0Q2hhbmdlZENhbGxlZCA9IGZhbHNlO1xuICAgICAgLy8gRGVsZXRlIGtleXMgdGhhdCBkb24ndCBleGlzdCBpbiByZXBsYWNlbWVudCBtYXBcbiAgICAgIC8vIGlmIHRoZSBrZXkgZGVsZXRpb24gaXMgcHJldmVudGVkIGJ5IGludGVyY2VwdG9yXG4gICAgICAvLyBhZGQgZW50cnkgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgcmVzdWx0IG1hcFxuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UoX3RoaXM3LmRhdGFfLmtleXMoKSksIF9zdGVwMzsgIShfc3RlcDMgPSBfaXRlcmF0b3IzKCkpLmRvbmU7KSB7XG4gICAgICAgIHZhciBrZXkgPSBfc3RlcDMudmFsdWU7XG4gICAgICAgIC8vIENvbmN1cnJlbnRseSBpdGVyYXRpbmcvZGVsZXRpbmcga2V5c1xuICAgICAgICAvLyBpdGVyYXRvciBzaG91bGQgaGFuZGxlIHRoaXMgY29ycmVjdGx5XG4gICAgICAgIGlmICghcmVwbGFjZW1lbnRNYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICB2YXIgZGVsZXRlZCA9IF90aGlzN1tcImRlbGV0ZVwiXShrZXkpO1xuICAgICAgICAgIC8vIFdhcyB0aGUga2V5IHJlbW92ZWQ/XG4gICAgICAgICAgaWYgKGRlbGV0ZWQpIHtcbiAgICAgICAgICAgIC8vIF9rZXlzQXRvbS5yZXBvcnRDaGFuZ2VkKCkgd2FzIGFscmVhZHkgY2FsbGVkXG4gICAgICAgICAgICBrZXlzUmVwb3J0Q2hhbmdlZENhbGxlZCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIERlbGV0ZSBwcmV2ZW50ZWQgYnkgaW50ZXJjZXB0b3JcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IF90aGlzNy5kYXRhXy5nZXQoa2V5KTtcbiAgICAgICAgICAgIG9yZGVyZWREYXRhLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIE1lcmdlIGVudHJpZXNcbiAgICAgIGZvciAodmFyIF9pdGVyYXRvcjQgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHJlcGxhY2VtZW50TWFwLmVudHJpZXMoKSksIF9zdGVwNDsgIShfc3RlcDQgPSBfaXRlcmF0b3I0KCkpLmRvbmU7KSB7XG4gICAgICAgIHZhciBfc3RlcDQkdmFsdWUgPSBfc3RlcDQudmFsdWUsXG4gICAgICAgICAgX2tleSA9IF9zdGVwNCR2YWx1ZVswXSxcbiAgICAgICAgICBfdmFsdWUgPSBfc3RlcDQkdmFsdWVbMV07XG4gICAgICAgIC8vIFdlIHdpbGwgd2FudCB0byBrbm93IHdoZXRoZXIgYSBuZXcga2V5IGlzIGFkZGVkXG4gICAgICAgIHZhciBrZXlFeGlzdGVkID0gX3RoaXM3LmRhdGFfLmhhcyhfa2V5KTtcbiAgICAgICAgLy8gQWRkIG9yIHVwZGF0ZSB2YWx1ZVxuICAgICAgICBfdGhpczcuc2V0KF9rZXksIF92YWx1ZSk7XG4gICAgICAgIC8vIFRoZSBhZGRpdGlvbiBjb3VsZCBoYXZlIGJlZW4gcHJldmVudCBieSBpbnRlcmNlcHRvclxuICAgICAgICBpZiAoX3RoaXM3LmRhdGFfLmhhcyhfa2V5KSkge1xuICAgICAgICAgIC8vIFRoZSB1cGRhdGUgY291bGQgaGF2ZSBiZWVuIHByZXZlbnRlZCBieSBpbnRlcmNlcHRvclxuICAgICAgICAgIC8vIGFuZCBhbHNvIHdlIHdhbnQgdG8gcHJlc2VydmUgZXhpc3RpbmcgdmFsdWVzXG4gICAgICAgICAgLy8gc28gdXNlIHZhbHVlIGZyb20gX2RhdGEgbWFwIChpbnN0ZWFkIG9mIHJlcGxhY2VtZW50IG1hcClcbiAgICAgICAgICB2YXIgX3ZhbHVlMiA9IF90aGlzNy5kYXRhXy5nZXQoX2tleSk7XG4gICAgICAgICAgb3JkZXJlZERhdGEuc2V0KF9rZXksIF92YWx1ZTIpO1xuICAgICAgICAgIC8vIFdhcyBhIG5ldyBrZXkgYWRkZWQ/XG4gICAgICAgICAgaWYgKCFrZXlFeGlzdGVkKSB7XG4gICAgICAgICAgICAvLyBfa2V5c0F0b20ucmVwb3J0Q2hhbmdlZCgpIHdhcyBhbHJlYWR5IGNhbGxlZFxuICAgICAgICAgICAga2V5c1JlcG9ydENoYW5nZWRDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gQ2hlY2sgZm9yIHBvc3NpYmxlIGtleSBvcmRlciBjaGFuZ2VcbiAgICAgIGlmICgha2V5c1JlcG9ydENoYW5nZWRDYWxsZWQpIHtcbiAgICAgICAgaWYgKF90aGlzNy5kYXRhXy5zaXplICE9PSBvcmRlcmVkRGF0YS5zaXplKSB7XG4gICAgICAgICAgLy8gSWYgc2l6ZSBkaWZmZXJzLCBrZXlzIGFyZSBkZWZpbml0ZWx5IG1vZGlmaWVkXG4gICAgICAgICAgX3RoaXM3LmtleXNBdG9tXy5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGl0ZXIxID0gX3RoaXM3LmRhdGFfLmtleXMoKTtcbiAgICAgICAgICB2YXIgaXRlcjIgPSBvcmRlcmVkRGF0YS5rZXlzKCk7XG4gICAgICAgICAgdmFyIG5leHQxID0gaXRlcjEubmV4dCgpO1xuICAgICAgICAgIHZhciBuZXh0MiA9IGl0ZXIyLm5leHQoKTtcbiAgICAgICAgICB3aGlsZSAoIW5leHQxLmRvbmUpIHtcbiAgICAgICAgICAgIGlmIChuZXh0MS52YWx1ZSAhPT0gbmV4dDIudmFsdWUpIHtcbiAgICAgICAgICAgICAgX3RoaXM3LmtleXNBdG9tXy5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV4dDEgPSBpdGVyMS5uZXh0KCk7XG4gICAgICAgICAgICBuZXh0MiA9IGl0ZXIyLm5leHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIFVzZSBjb3JyZWN0bHkgb3JkZXJlZCBtYXBcbiAgICAgIF90aGlzNy5kYXRhXyA9IG9yZGVyZWREYXRhO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBfcHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IE9ic2VydmFibGVNYXBdXCI7XG4gIH07XG4gIF9wcm90by50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcyk7XG4gIH07XG4gIC8qKlxuICAgKiBPYnNlcnZlcyB0aGlzIG9iamVjdC4gVHJpZ2dlcnMgZm9yIHRoZSBldmVudHMgJ2FkZCcsICd1cGRhdGUnIGFuZCAnZGVsZXRlJy5cbiAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3Qvb2JzZXJ2ZVxuICAgKiBmb3IgY2FsbGJhY2sgZGV0YWlsc1xuICAgKi9cbiAgX3Byb3RvLm9ic2VydmVfID0gZnVuY3Rpb24gb2JzZXJ2ZV8obGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgZmlyZUltbWVkaWF0ZWx5ID09PSB0cnVlKSB7XG4gICAgICBkaWUoXCJgb2JzZXJ2ZWAgZG9lc24ndCBzdXBwb3J0IGZpcmVJbW1lZGlhdGVseT10cnVlIGluIGNvbWJpbmF0aW9uIHdpdGggbWFwcy5cIik7XG4gICAgfVxuICAgIHJldHVybiByZWdpc3Rlckxpc3RlbmVyKHRoaXMsIGxpc3RlbmVyKTtcbiAgfTtcbiAgX3Byb3RvLmludGVyY2VwdF8gPSBmdW5jdGlvbiBpbnRlcmNlcHRfKGhhbmRsZXIpIHtcbiAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvcih0aGlzLCBoYW5kbGVyKTtcbiAgfTtcbiAgX2NyZWF0ZUNsYXNzKE9ic2VydmFibGVNYXAsIFt7XG4gICAga2V5OiBcInNpemVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHRoaXMua2V5c0F0b21fLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhXy5zaXplO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogX1N5bWJvbCR0b1N0cmluZ1RhZyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBcIk1hcFwiO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gT2JzZXJ2YWJsZU1hcDtcbn0oKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxudmFyIGlzT2JzZXJ2YWJsZU1hcCA9IC8qI19fUFVSRV9fKi9jcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlKFwiT2JzZXJ2YWJsZU1hcFwiLCBPYnNlcnZhYmxlTWFwKTtcbmZ1bmN0aW9uIGNvbnZlcnRUb01hcChkYXRhU3RydWN0dXJlKSB7XG4gIGlmIChpc0VTNk1hcChkYXRhU3RydWN0dXJlKSB8fCBpc09ic2VydmFibGVNYXAoZGF0YVN0cnVjdHVyZSkpIHtcbiAgICByZXR1cm4gZGF0YVN0cnVjdHVyZTtcbiAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGRhdGFTdHJ1Y3R1cmUpKSB7XG4gICAgcmV0dXJuIG5ldyBNYXAoZGF0YVN0cnVjdHVyZSk7XG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChkYXRhU3RydWN0dXJlKSkge1xuICAgIHZhciBtYXAgPSBuZXcgTWFwKCk7XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGFTdHJ1Y3R1cmUpIHtcbiAgICAgIG1hcC5zZXQoa2V5LCBkYXRhU3RydWN0dXJlW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gbWFwO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBkaWUoMjEsIGRhdGFTdHJ1Y3R1cmUpO1xuICB9XG59XG5cbnZhciBfU3ltYm9sJGl0ZXJhdG9yJDEsIF9TeW1ib2wkdG9TdHJpbmdUYWckMTtcbnZhciBPYnNlcnZhYmxlU2V0TWFya2VyID0ge307XG5fU3ltYm9sJGl0ZXJhdG9yJDEgPSBTeW1ib2wuaXRlcmF0b3I7XG5fU3ltYm9sJHRvU3RyaW5nVGFnJDEgPSBTeW1ib2wudG9TdHJpbmdUYWc7XG52YXIgT2JzZXJ2YWJsZVNldCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE9ic2VydmFibGVTZXQoaW5pdGlhbERhdGEsIGVuaGFuY2VyLCBuYW1lXykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgaWYgKGVuaGFuY2VyID09PSB2b2lkIDApIHtcbiAgICAgIGVuaGFuY2VyID0gZGVlcEVuaGFuY2VyO1xuICAgIH1cbiAgICBpZiAobmFtZV8gPT09IHZvaWQgMCkge1xuICAgICAgbmFtZV8gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcIk9ic2VydmFibGVTZXRAXCIgKyBnZXROZXh0SWQoKSA6IFwiT2JzZXJ2YWJsZVNldFwiO1xuICAgIH1cbiAgICB0aGlzLm5hbWVfID0gdm9pZCAwO1xuICAgIHRoaXNbJG1vYnhdID0gT2JzZXJ2YWJsZVNldE1hcmtlcjtcbiAgICB0aGlzLmRhdGFfID0gbmV3IFNldCgpO1xuICAgIHRoaXMuYXRvbV8gPSB2b2lkIDA7XG4gICAgdGhpcy5jaGFuZ2VMaXN0ZW5lcnNfID0gdm9pZCAwO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzXyA9IHZvaWQgMDtcbiAgICB0aGlzLmRlaGFuY2VyID0gdm9pZCAwO1xuICAgIHRoaXMuZW5oYW5jZXJfID0gdm9pZCAwO1xuICAgIHRoaXMubmFtZV8gPSBuYW1lXztcbiAgICBpZiAoIWlzRnVuY3Rpb24oU2V0KSkge1xuICAgICAgZGllKDIyKTtcbiAgICB9XG4gICAgdGhpcy5lbmhhbmNlcl8gPSBmdW5jdGlvbiAobmV3Viwgb2xkVikge1xuICAgICAgcmV0dXJuIGVuaGFuY2VyKG5ld1YsIG9sZFYsIG5hbWVfKTtcbiAgICB9O1xuICAgIGluaXRPYnNlcnZhYmxlKGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmF0b21fID0gY3JlYXRlQXRvbShfdGhpcy5uYW1lXyk7XG4gICAgICBpZiAoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgX3RoaXMucmVwbGFjZShpbml0aWFsRGF0YSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgdmFyIF9wcm90byA9IE9ic2VydmFibGVTZXQucHJvdG90eXBlO1xuICBfcHJvdG8uZGVoYW5jZVZhbHVlXyA9IGZ1bmN0aW9uIGRlaGFuY2VWYWx1ZV8odmFsdWUpIHtcbiAgICBpZiAodGhpcy5kZWhhbmNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWhhbmNlcih2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbiAgX3Byb3RvLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG4gICAgdHJhbnNhY3Rpb24oZnVuY3Rpb24gKCkge1xuICAgICAgdW50cmFja2VkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShfdGhpczIuZGF0YV8udmFsdWVzKCkpLCBfc3RlcDsgIShfc3RlcCA9IF9pdGVyYXRvcigpKS5kb25lOykge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IF9zdGVwLnZhbHVlO1xuICAgICAgICAgIF90aGlzMltcImRlbGV0ZVwiXSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICBfcHJvdG8uZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2tGbiwgdGhpc0FyZykge1xuICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHRoaXMpLCBfc3RlcDI7ICEoX3N0ZXAyID0gX2l0ZXJhdG9yMigpKS5kb25lOykge1xuICAgICAgdmFyIHZhbHVlID0gX3N0ZXAyLnZhbHVlO1xuICAgICAgY2FsbGJhY2tGbi5jYWxsKHRoaXNBcmcsIHZhbHVlLCB2YWx1ZSwgdGhpcyk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uYWRkID0gZnVuY3Rpb24gYWRkKHZhbHVlKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG4gICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQodGhpcy5hdG9tXyk7XG4gICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgIHR5cGU6IEFERCxcbiAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICBuZXdWYWx1ZTogdmFsdWVcbiAgICAgIH0pO1xuICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICAvLyBpZGVhbGx5LCB2YWx1ZSA9IGNoYW5nZS52YWx1ZSB3b3VsZCBiZSBkb25lIGhlcmUsIHNvIHRoYXQgdmFsdWVzIGNhbiBiZVxuICAgICAgLy8gY2hhbmdlZCBieSBpbnRlcmNlcHRvci4gU2FtZSBhcHBsaWVzIGZvciBvdGhlciBTZXQgYW5kIE1hcCBhcGkncy5cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgdHJhbnNhY3Rpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczMuZGF0YV8uYWRkKF90aGlzMy5lbmhhbmNlcl8odmFsdWUsIHVuZGVmaW5lZCkpO1xuICAgICAgICBfdGhpczMuYXRvbV8ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgfSk7XG4gICAgICB2YXIgbm90aWZ5U3B5ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGlzU3B5RW5hYmxlZCgpO1xuICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyh0aGlzKTtcbiAgICAgIHZhciBfY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweSA/IHtcbiAgICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwic2V0XCIsXG4gICAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5uYW1lXyxcbiAgICAgICAgdHlwZTogQURELFxuICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgIG5ld1ZhbHVlOiB2YWx1ZVxuICAgICAgfSA6IG51bGw7XG4gICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBzcHlSZXBvcnRTdGFydChfY2hhbmdlKTtcbiAgICAgIH1cbiAgICAgIGlmIChub3RpZnkpIHtcbiAgICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIF9jaGFuZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgc3B5UmVwb3J0RW5kKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBfcHJvdG9bXCJkZWxldGVcIl0gPSBmdW5jdGlvbiBfZGVsZXRlKHZhbHVlKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG4gICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgIHR5cGU6IERFTEVURSxcbiAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICBvbGRWYWx1ZTogdmFsdWVcbiAgICAgIH0pO1xuICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5oYXModmFsdWUpKSB7XG4gICAgICB2YXIgbm90aWZ5U3B5ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGlzU3B5RW5hYmxlZCgpO1xuICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyh0aGlzKTtcbiAgICAgIHZhciBfY2hhbmdlMiA9IG5vdGlmeSB8fCBub3RpZnlTcHkgPyB7XG4gICAgICAgIG9ic2VydmFibGVLaW5kOiBcInNldFwiLFxuICAgICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMubmFtZV8sXG4gICAgICAgIHR5cGU6IERFTEVURSxcbiAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICBvbGRWYWx1ZTogdmFsdWVcbiAgICAgIH0gOiBudWxsO1xuICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgc3B5UmVwb3J0U3RhcnQoX2NoYW5nZTIpO1xuICAgICAgfVxuICAgICAgdHJhbnNhY3Rpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczQuYXRvbV8ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICBfdGhpczQuZGF0YV9bXCJkZWxldGVcIl0odmFsdWUpO1xuICAgICAgfSk7XG4gICAgICBpZiAobm90aWZ5KSB7XG4gICAgICAgIG5vdGlmeUxpc3RlbmVycyh0aGlzLCBfY2hhbmdlMik7XG4gICAgICB9XG4gICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG4gIF9wcm90by5oYXMgPSBmdW5jdGlvbiBoYXModmFsdWUpIHtcbiAgICB0aGlzLmF0b21fLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgcmV0dXJuIHRoaXMuZGF0YV8uaGFzKHRoaXMuZGVoYW5jZVZhbHVlXyh2YWx1ZSkpO1xuICB9O1xuICBfcHJvdG8uZW50cmllcyA9IGZ1bmN0aW9uIGVudHJpZXMoKSB7XG4gICAgdmFyIG5leHRJbmRleCA9IDA7XG4gICAgdmFyIGtleXMgPSBBcnJheS5mcm9tKHRoaXMua2V5cygpKTtcbiAgICB2YXIgdmFsdWVzID0gQXJyYXkuZnJvbSh0aGlzLnZhbHVlcygpKTtcbiAgICByZXR1cm4gbWFrZUl0ZXJhYmxlKHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgIHZhciBpbmRleCA9IG5leHRJbmRleDtcbiAgICAgICAgbmV4dEluZGV4ICs9IDE7XG4gICAgICAgIHJldHVybiBpbmRleCA8IHZhbHVlcy5sZW5ndGggPyB7XG4gICAgICAgICAgdmFsdWU6IFtrZXlzW2luZGV4XSwgdmFsdWVzW2luZGV4XV0sXG4gICAgICAgICAgZG9uZTogZmFsc2VcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICBkb25lOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIF9wcm90by5rZXlzID0gZnVuY3Rpb24ga2V5cygpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMoKTtcbiAgfTtcbiAgX3Byb3RvLnZhbHVlcyA9IGZ1bmN0aW9uIHZhbHVlcygpIHtcbiAgICB0aGlzLmF0b21fLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBuZXh0SW5kZXggPSAwO1xuICAgIHZhciBvYnNlcnZhYmxlVmFsdWVzID0gQXJyYXkuZnJvbSh0aGlzLmRhdGFfLnZhbHVlcygpKTtcbiAgICByZXR1cm4gbWFrZUl0ZXJhYmxlKHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgIHJldHVybiBuZXh0SW5kZXggPCBvYnNlcnZhYmxlVmFsdWVzLmxlbmd0aCA/IHtcbiAgICAgICAgICB2YWx1ZTogc2VsZi5kZWhhbmNlVmFsdWVfKG9ic2VydmFibGVWYWx1ZXNbbmV4dEluZGV4KytdKSxcbiAgICAgICAgICBkb25lOiBmYWxzZVxuICAgICAgICB9IDoge1xuICAgICAgICAgIGRvbmU6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgX3Byb3RvLnJlcGxhY2UgPSBmdW5jdGlvbiByZXBsYWNlKG90aGVyKSB7XG4gICAgdmFyIF90aGlzNSA9IHRoaXM7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZVNldChvdGhlcikpIHtcbiAgICAgIG90aGVyID0gbmV3IFNldChvdGhlcik7XG4gICAgfVxuICAgIHRyYW5zYWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG90aGVyKSkge1xuICAgICAgICBfdGhpczUuY2xlYXIoKTtcbiAgICAgICAgb3RoZXIuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXM1LmFkZCh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChpc0VTNlNldChvdGhlcikpIHtcbiAgICAgICAgX3RoaXM1LmNsZWFyKCk7XG4gICAgICAgIG90aGVyLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzNS5hZGQodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAob3RoZXIgIT09IG51bGwgJiYgb3RoZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkaWUoXCJDYW5ub3QgaW5pdGlhbGl6ZSBzZXQgZnJvbSBcIiArIG90aGVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgX3Byb3RvLm9ic2VydmVfID0gZnVuY3Rpb24gb2JzZXJ2ZV8obGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgIC8vIC4uLiAnZmlyZUltbWVkaWF0ZWx5JyBjb3VsZCBhbHNvIGJlIHRydWU/XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBmaXJlSW1tZWRpYXRlbHkgPT09IHRydWUpIHtcbiAgICAgIGRpZShcImBvYnNlcnZlYCBkb2Vzbid0IHN1cHBvcnQgZmlyZUltbWVkaWF0ZWx5PXRydWUgaW4gY29tYmluYXRpb24gd2l0aCBzZXRzLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZ2lzdGVyTGlzdGVuZXIodGhpcywgbGlzdGVuZXIpO1xuICB9O1xuICBfcHJvdG8uaW50ZXJjZXB0XyA9IGZ1bmN0aW9uIGludGVyY2VwdF8oaGFuZGxlcikge1xuICAgIHJldHVybiByZWdpc3RlckludGVyY2VwdG9yKHRoaXMsIGhhbmRsZXIpO1xuICB9O1xuICBfcHJvdG8udG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMpO1xuICB9O1xuICBfcHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IE9ic2VydmFibGVTZXRdXCI7XG4gIH07XG4gIF9wcm90b1tfU3ltYm9sJGl0ZXJhdG9yJDFdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlcygpO1xuICB9O1xuICBfY3JlYXRlQ2xhc3MoT2JzZXJ2YWJsZVNldCwgW3tcbiAgICBrZXk6IFwic2l6ZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdGhpcy5hdG9tXy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YV8uc2l6ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IF9TeW1ib2wkdG9TdHJpbmdUYWckMSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBcIlNldFwiO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gT2JzZXJ2YWJsZVNldDtcbn0oKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxudmFyIGlzT2JzZXJ2YWJsZVNldCA9IC8qI19fUFVSRV9fKi9jcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlKFwiT2JzZXJ2YWJsZVNldFwiLCBPYnNlcnZhYmxlU2V0KTtcblxudmFyIGRlc2NyaXB0b3JDYWNoZSA9IC8qI19fUFVSRV9fKi9PYmplY3QuY3JlYXRlKG51bGwpO1xudmFyIFJFTU9WRSA9IFwicmVtb3ZlXCI7XG52YXIgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uKHRhcmdldF8sIHZhbHVlc18sIG5hbWVfLFxuICAvLyBVc2VkIGFueXRpbWUgYW5ub3RhdGlvbiBpcyBub3QgZXhwbGljaXRlbHkgcHJvdmlkZWRcbiAgZGVmYXVsdEFubm90YXRpb25fKSB7XG4gICAgaWYgKHZhbHVlc18gPT09IHZvaWQgMCkge1xuICAgICAgdmFsdWVzXyA9IG5ldyBNYXAoKTtcbiAgICB9XG4gICAgaWYgKGRlZmF1bHRBbm5vdGF0aW9uXyA9PT0gdm9pZCAwKSB7XG4gICAgICBkZWZhdWx0QW5ub3RhdGlvbl8gPSBhdXRvQW5ub3RhdGlvbjtcbiAgICB9XG4gICAgdGhpcy50YXJnZXRfID0gdm9pZCAwO1xuICAgIHRoaXMudmFsdWVzXyA9IHZvaWQgMDtcbiAgICB0aGlzLm5hbWVfID0gdm9pZCAwO1xuICAgIHRoaXMuZGVmYXVsdEFubm90YXRpb25fID0gdm9pZCAwO1xuICAgIHRoaXMua2V5c0F0b21fID0gdm9pZCAwO1xuICAgIHRoaXMuY2hhbmdlTGlzdGVuZXJzXyA9IHZvaWQgMDtcbiAgICB0aGlzLmludGVyY2VwdG9yc18gPSB2b2lkIDA7XG4gICAgdGhpcy5wcm94eV8gPSB2b2lkIDA7XG4gICAgdGhpcy5pc1BsYWluT2JqZWN0XyA9IHZvaWQgMDtcbiAgICB0aGlzLmFwcGxpZWRBbm5vdGF0aW9uc18gPSB2b2lkIDA7XG4gICAgdGhpcy5wZW5kaW5nS2V5c18gPSB2b2lkIDA7XG4gICAgdGhpcy50YXJnZXRfID0gdGFyZ2V0XztcbiAgICB0aGlzLnZhbHVlc18gPSB2YWx1ZXNfO1xuICAgIHRoaXMubmFtZV8gPSBuYW1lXztcbiAgICB0aGlzLmRlZmF1bHRBbm5vdGF0aW9uXyA9IGRlZmF1bHRBbm5vdGF0aW9uXztcbiAgICB0aGlzLmtleXNBdG9tXyA9IG5ldyBBdG9tKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHRoaXMubmFtZV8gKyBcIi5rZXlzXCIgOiBcIk9ic2VydmFibGVPYmplY3Qua2V5c1wiKTtcbiAgICAvLyBPcHRpbWl6YXRpb246IHdlIHVzZSB0aGlzIGZyZXF1ZW50bHlcbiAgICB0aGlzLmlzUGxhaW5PYmplY3RfID0gaXNQbGFpbk9iamVjdCh0aGlzLnRhcmdldF8pO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWlzQW5ub3RhdGlvbih0aGlzLmRlZmF1bHRBbm5vdGF0aW9uXykpIHtcbiAgICAgIGRpZShcImRlZmF1bHRBbm5vdGF0aW9uIG11c3QgYmUgdmFsaWQgYW5ub3RhdGlvblwiKTtcbiAgICB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgLy8gUHJlcGFyZSBzdHJ1Y3R1cmUgZm9yIHRyYWNraW5nIHdoaWNoIGZpZWxkcyB3ZXJlIGFscmVhZHkgYW5ub3RhdGVkXG4gICAgICB0aGlzLmFwcGxpZWRBbm5vdGF0aW9uc18gPSB7fTtcbiAgICB9XG4gIH1cbiAgdmFyIF9wcm90byA9IE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGU7XG4gIF9wcm90by5nZXRPYnNlcnZhYmxlUHJvcFZhbHVlXyA9IGZ1bmN0aW9uIGdldE9ic2VydmFibGVQcm9wVmFsdWVfKGtleSkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlc18uZ2V0KGtleSkuZ2V0KCk7XG4gIH07XG4gIF9wcm90by5zZXRPYnNlcnZhYmxlUHJvcFZhbHVlXyA9IGZ1bmN0aW9uIHNldE9ic2VydmFibGVQcm9wVmFsdWVfKGtleSwgbmV3VmFsdWUpIHtcbiAgICB2YXIgb2JzZXJ2YWJsZSA9IHRoaXMudmFsdWVzXy5nZXQoa2V5KTtcbiAgICBpZiAob2JzZXJ2YWJsZSBpbnN0YW5jZW9mIENvbXB1dGVkVmFsdWUpIHtcbiAgICAgIG9ic2VydmFibGUuc2V0KG5ld1ZhbHVlKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBpbnRlcmNlcHRcbiAgICBpZiAoaGFzSW50ZXJjZXB0b3JzKHRoaXMpKSB7XG4gICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKHRoaXMsIHtcbiAgICAgICAgdHlwZTogVVBEQVRFLFxuICAgICAgICBvYmplY3Q6IHRoaXMucHJveHlfIHx8IHRoaXMudGFyZ2V0XyxcbiAgICAgICAgbmFtZToga2V5LFxuICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgIH0pO1xuICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBuZXdWYWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICB9XG4gICAgbmV3VmFsdWUgPSBvYnNlcnZhYmxlLnByZXBhcmVOZXdWYWx1ZV8obmV3VmFsdWUpO1xuICAgIC8vIG5vdGlmeSBzcHkgJiBvYnNlcnZlcnNcbiAgICBpZiAobmV3VmFsdWUgIT09IGdsb2JhbFN0YXRlLlVOQ0hBTkdFRCkge1xuICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyh0aGlzKTtcbiAgICAgIHZhciBub3RpZnlTcHkgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgaXNTcHlFbmFibGVkKCk7XG4gICAgICB2YXIgX2NoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHkgPyB7XG4gICAgICAgIHR5cGU6IFVQREFURSxcbiAgICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwib2JqZWN0XCIsXG4gICAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5uYW1lXyxcbiAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5XyB8fCB0aGlzLnRhcmdldF8sXG4gICAgICAgIG9sZFZhbHVlOiBvYnNlcnZhYmxlLnZhbHVlXyxcbiAgICAgICAgbmFtZToga2V5LFxuICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgIH0gOiBudWxsO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgICAgc3B5UmVwb3J0U3RhcnQoX2NoYW5nZSk7XG4gICAgICB9XG4gICAgICBvYnNlcnZhYmxlLnNldE5ld1ZhbHVlXyhuZXdWYWx1ZSk7XG4gICAgICBpZiAobm90aWZ5KSB7XG4gICAgICAgIG5vdGlmeUxpc3RlbmVycyh0aGlzLCBfY2hhbmdlKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgX3Byb3RvLmdldF8gPSBmdW5jdGlvbiBnZXRfKGtleSkge1xuICAgIGlmIChnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb24gJiYgIWhhc1Byb3AodGhpcy50YXJnZXRfLCBrZXkpKSB7XG4gICAgICAvLyBLZXkgZG9lc24ndCBleGlzdCB5ZXQsIHN1YnNjcmliZSBmb3IgaXQgaW4gY2FzZSBpdCdzIGFkZGVkIGxhdGVyXG4gICAgICB0aGlzLmhhc18oa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudGFyZ2V0X1trZXldO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge1Byb3BlcnR5S2V5fSBrZXlcbiAgICogQHBhcmFtIHthbnl9IHZhbHVlXG4gICAqIEBwYXJhbSB7QW5ub3RhdGlvbnxib29sZWFufSBhbm5vdGF0aW9uIHRydWUgLSB1c2UgZGVmYXVsdCBhbm5vdGF0aW9uLCBmYWxzZSAtIGNvcHkgYXMgaXNcbiAgICogQHBhcmFtIHtib29sZWFufSBwcm94eVRyYXAgd2hldGhlciBpdCdzIGNhbGxlZCBmcm9tIHByb3h5IHRyYXBcbiAgICogQHJldHVybnMge2Jvb2xlYW58bnVsbH0gdHJ1ZSBvbiBzdWNjZXNzLCBmYWxzZSBvbiBmYWlsdXJlIChwcm94eVRyYXAgKyBub24tY29uZmlndXJhYmxlKSwgbnVsbCB3aGVuIGNhbmNlbGxlZCBieSBpbnRlcmNlcHRvclxuICAgKi87XG4gIF9wcm90by5zZXRfID0gZnVuY3Rpb24gc2V0XyhrZXksIHZhbHVlLCBwcm94eVRyYXApIHtcbiAgICBpZiAocHJveHlUcmFwID09PSB2b2lkIDApIHtcbiAgICAgIHByb3h5VHJhcCA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyBEb24ndCB1c2UgLmhhcyhrZXkpIC0gd2UgY2FyZSBhYm91dCBvd25cbiAgICBpZiAoaGFzUHJvcCh0aGlzLnRhcmdldF8sIGtleSkpIHtcbiAgICAgIC8vIEV4aXN0aW5nIHByb3BcbiAgICAgIGlmICh0aGlzLnZhbHVlc18uaGFzKGtleSkpIHtcbiAgICAgICAgLy8gT2JzZXJ2YWJsZSAoY2FuIGJlIGludGVyY2VwdGVkKVxuICAgICAgICByZXR1cm4gdGhpcy5zZXRPYnNlcnZhYmxlUHJvcFZhbHVlXyhrZXksIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAocHJveHlUcmFwKSB7XG4gICAgICAgIC8vIE5vbi1vYnNlcnZhYmxlIC0gcHJveHlcbiAgICAgICAgcmV0dXJuIFJlZmxlY3Quc2V0KHRoaXMudGFyZ2V0Xywga2V5LCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOb24tb2JzZXJ2YWJsZVxuICAgICAgICB0aGlzLnRhcmdldF9ba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTmV3IHByb3BcbiAgICAgIHJldHVybiB0aGlzLmV4dGVuZF8oa2V5LCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfSwgdGhpcy5kZWZhdWx0QW5ub3RhdGlvbl8sIHByb3h5VHJhcCk7XG4gICAgfVxuICB9XG4gIC8vIFRyYXAgZm9yIFwiaW5cIlxuICA7XG4gIF9wcm90by5oYXNfID0gZnVuY3Rpb24gaGFzXyhrZXkpIHtcbiAgICBpZiAoIWdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbikge1xuICAgICAgLy8gU2tpcCBrZXkgc3Vic2NyaXB0aW9uIG91dHNpZGUgZGVyaXZhdGlvblxuICAgICAgcmV0dXJuIGtleSBpbiB0aGlzLnRhcmdldF87XG4gICAgfVxuICAgIHRoaXMucGVuZGluZ0tleXNfIHx8ICh0aGlzLnBlbmRpbmdLZXlzXyA9IG5ldyBNYXAoKSk7XG4gICAgdmFyIGVudHJ5ID0gdGhpcy5wZW5kaW5nS2V5c18uZ2V0KGtleSk7XG4gICAgaWYgKCFlbnRyeSkge1xuICAgICAgZW50cnkgPSBuZXcgT2JzZXJ2YWJsZVZhbHVlKGtleSBpbiB0aGlzLnRhcmdldF8sIHJlZmVyZW5jZUVuaGFuY2VyLCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB0aGlzLm5hbWVfICsgXCIuXCIgKyBzdHJpbmdpZnlLZXkoa2V5KSArIFwiP1wiIDogXCJPYnNlcnZhYmxlT2JqZWN0LmtleT9cIiwgZmFsc2UpO1xuICAgICAgdGhpcy5wZW5kaW5nS2V5c18uc2V0KGtleSwgZW50cnkpO1xuICAgIH1cbiAgICByZXR1cm4gZW50cnkuZ2V0KCk7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7UHJvcGVydHlLZXl9IGtleVxuICAgKiBAcGFyYW0ge0Fubm90YXRpb258Ym9vbGVhbn0gYW5ub3RhdGlvbiB0cnVlIC0gdXNlIGRlZmF1bHQgYW5ub3RhdGlvbiwgZmFsc2UgLSBpZ25vcmUgcHJvcFxuICAgKi87XG4gIF9wcm90by5tYWtlXyA9IGZ1bmN0aW9uIG1ha2VfKGtleSwgYW5ub3RhdGlvbikge1xuICAgIGlmIChhbm5vdGF0aW9uID09PSB0cnVlKSB7XG4gICAgICBhbm5vdGF0aW9uID0gdGhpcy5kZWZhdWx0QW5ub3RhdGlvbl87XG4gICAgfVxuICAgIGlmIChhbm5vdGF0aW9uID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhc3NlcnRBbm5vdGFibGUodGhpcywgYW5ub3RhdGlvbiwga2V5KTtcbiAgICBpZiAoIShrZXkgaW4gdGhpcy50YXJnZXRfKSkge1xuICAgICAgdmFyIF90aGlzJHRhcmdldF8kc3RvcmVkQTtcbiAgICAgIC8vIFRocm93IG9uIG1pc3Npbmcga2V5LCBleGNlcHQgZm9yIGRlY29yYXRvcnM6XG4gICAgICAvLyBEZWNvcmF0b3IgYW5ub3RhdGlvbnMgYXJlIGNvbGxlY3RlZCBmcm9tIHdob2xlIHByb3RvdHlwZSBjaGFpbi5cbiAgICAgIC8vIFdoZW4gY2FsbGVkIGZyb20gc3VwZXIoKSBzb21lIHByb3BzIG1heSBub3QgZXhpc3QgeWV0LlxuICAgICAgLy8gSG93ZXZlciB3ZSBkb24ndCBoYXZlIHRvIHdvcnJ5IGFib3V0IG1pc3NpbmcgcHJvcCxcbiAgICAgIC8vIGJlY2F1c2UgdGhlIGRlY29yYXRvciBtdXN0IGhhdmUgYmVlbiBhcHBsaWVkIHRvIHNvbWV0aGluZy5cbiAgICAgIGlmICgoX3RoaXMkdGFyZ2V0XyRzdG9yZWRBID0gdGhpcy50YXJnZXRfW3N0b3JlZEFubm90YXRpb25zU3ltYm9sXSkgIT0gbnVsbCAmJiBfdGhpcyR0YXJnZXRfJHN0b3JlZEFba2V5XSkge1xuICAgICAgICByZXR1cm47IC8vIHdpbGwgYmUgYW5ub3RhdGVkIGJ5IHN1YmNsYXNzIGNvbnN0cnVjdG9yXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaWUoMSwgYW5ub3RhdGlvbi5hbm5vdGF0aW9uVHlwZV8sIHRoaXMubmFtZV8gKyBcIi5cIiArIGtleS50b1N0cmluZygpKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHNvdXJjZSA9IHRoaXMudGFyZ2V0XztcbiAgICB3aGlsZSAoc291cmNlICYmIHNvdXJjZSAhPT0gb2JqZWN0UHJvdG90eXBlKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IGdldERlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgdmFyIG91dGNvbWUgPSBhbm5vdGF0aW9uLm1ha2VfKHRoaXMsIGtleSwgZGVzY3JpcHRvciwgc291cmNlKTtcbiAgICAgICAgaWYgKG91dGNvbWUgPT09IDAgLyogTWFrZVJlc3VsdC5DYW5jZWwgKi8pIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG91dGNvbWUgPT09IDEgLyogTWFrZVJlc3VsdC5CcmVhayAqLykge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzb3VyY2UgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc291cmNlKTtcbiAgICB9XG4gICAgcmVjb3JkQW5ub3RhdGlvbkFwcGxpZWQodGhpcywgYW5ub3RhdGlvbiwga2V5KTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtQcm9wZXJ0eUtleX0ga2V5XG4gICAqIEBwYXJhbSB7UHJvcGVydHlEZXNjcmlwdG9yfSBkZXNjcmlwdG9yXG4gICAqIEBwYXJhbSB7QW5ub3RhdGlvbnxib29sZWFufSBhbm5vdGF0aW9uIHRydWUgLSB1c2UgZGVmYXVsdCBhbm5vdGF0aW9uLCBmYWxzZSAtIGNvcHkgYXMgaXNcbiAgICogQHBhcmFtIHtib29sZWFufSBwcm94eVRyYXAgd2hldGhlciBpdCdzIGNhbGxlZCBmcm9tIHByb3h5IHRyYXBcbiAgICogQHJldHVybnMge2Jvb2xlYW58bnVsbH0gdHJ1ZSBvbiBzdWNjZXNzLCBmYWxzZSBvbiBmYWlsdXJlIChwcm94eVRyYXAgKyBub24tY29uZmlndXJhYmxlKSwgbnVsbCB3aGVuIGNhbmNlbGxlZCBieSBpbnRlcmNlcHRvclxuICAgKi87XG4gIF9wcm90by5leHRlbmRfID0gZnVuY3Rpb24gZXh0ZW5kXyhrZXksIGRlc2NyaXB0b3IsIGFubm90YXRpb24sIHByb3h5VHJhcCkge1xuICAgIGlmIChwcm94eVRyYXAgPT09IHZvaWQgMCkge1xuICAgICAgcHJveHlUcmFwID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChhbm5vdGF0aW9uID09PSB0cnVlKSB7XG4gICAgICBhbm5vdGF0aW9uID0gdGhpcy5kZWZhdWx0QW5ub3RhdGlvbl87XG4gICAgfVxuICAgIGlmIChhbm5vdGF0aW9uID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVmaW5lUHJvcGVydHlfKGtleSwgZGVzY3JpcHRvciwgcHJveHlUcmFwKTtcbiAgICB9XG4gICAgYXNzZXJ0QW5ub3RhYmxlKHRoaXMsIGFubm90YXRpb24sIGtleSk7XG4gICAgdmFyIG91dGNvbWUgPSBhbm5vdGF0aW9uLmV4dGVuZF8odGhpcywga2V5LCBkZXNjcmlwdG9yLCBwcm94eVRyYXApO1xuICAgIGlmIChvdXRjb21lKSB7XG4gICAgICByZWNvcmRBbm5vdGF0aW9uQXBwbGllZCh0aGlzLCBhbm5vdGF0aW9uLCBrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gb3V0Y29tZTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtQcm9wZXJ0eUtleX0ga2V5XG4gICAqIEBwYXJhbSB7UHJvcGVydHlEZXNjcmlwdG9yfSBkZXNjcmlwdG9yXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcHJveHlUcmFwIHdoZXRoZXIgaXQncyBjYWxsZWQgZnJvbSBwcm94eSB0cmFwXG4gICAqIEByZXR1cm5zIHtib29sZWFufG51bGx9IHRydWUgb24gc3VjY2VzcywgZmFsc2Ugb24gZmFpbHVyZSAocHJveHlUcmFwICsgbm9uLWNvbmZpZ3VyYWJsZSksIG51bGwgd2hlbiBjYW5jZWxsZWQgYnkgaW50ZXJjZXB0b3JcbiAgICovO1xuICBfcHJvdG8uZGVmaW5lUHJvcGVydHlfID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHlfKGtleSwgZGVzY3JpcHRvciwgcHJveHlUcmFwKSB7XG4gICAgaWYgKHByb3h5VHJhcCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm94eVRyYXAgPSBmYWxzZTtcbiAgICB9XG4gICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQodGhpcy5rZXlzQXRvbV8pO1xuICAgIHRyeSB7XG4gICAgICBzdGFydEJhdGNoKCk7XG4gICAgICAvLyBEZWxldGVcbiAgICAgIHZhciBkZWxldGVPdXRjb21lID0gdGhpcy5kZWxldGVfKGtleSk7XG4gICAgICBpZiAoIWRlbGV0ZU91dGNvbWUpIHtcbiAgICAgICAgLy8gRmFpbHVyZSBvciBpbnRlcmNlcHRlZFxuICAgICAgICByZXR1cm4gZGVsZXRlT3V0Y29tZTtcbiAgICAgIH1cbiAgICAgIC8vIEFERCBpbnRlcmNlcHRvclxuICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKHRoaXMsIHtcbiAgICAgICAgICBvYmplY3Q6IHRoaXMucHJveHlfIHx8IHRoaXMudGFyZ2V0XyxcbiAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgdHlwZTogQURELFxuICAgICAgICAgIG5ld1ZhbHVlOiBkZXNjcmlwdG9yLnZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWNoYW5nZSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgZGVzY3JpcHRvciA9IF9leHRlbmRzKHt9LCBkZXNjcmlwdG9yLCB7XG4gICAgICAgICAgICB2YWx1ZTogbmV3VmFsdWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gRGVmaW5lXG4gICAgICBpZiAocHJveHlUcmFwKSB7XG4gICAgICAgIGlmICghUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnRhcmdldF8sIGtleSwgZGVzY3JpcHRvcikpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZmluZVByb3BlcnR5KHRoaXMudGFyZ2V0Xywga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgIH1cbiAgICAgIC8vIE5vdGlmeVxuICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUFkZGl0aW9uXyhrZXksIGRlc2NyaXB0b3IudmFsdWUpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBlbmRCYXRjaCgpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvLyBJZiBvcmlnaW5hbCBkZXNjcmlwdG9yIGJlY29tZXMgcmVsZXZhbnQsIG1vdmUgdGhpcyB0byBhbm5vdGF0aW9uIGRpcmVjdGx5XG4gIDtcbiAgX3Byb3RvLmRlZmluZU9ic2VydmFibGVQcm9wZXJ0eV8gPSBmdW5jdGlvbiBkZWZpbmVPYnNlcnZhYmxlUHJvcGVydHlfKGtleSwgdmFsdWUsIGVuaGFuY2VyLCBwcm94eVRyYXApIHtcbiAgICBpZiAocHJveHlUcmFwID09PSB2b2lkIDApIHtcbiAgICAgIHByb3h5VHJhcCA9IGZhbHNlO1xuICAgIH1cbiAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCh0aGlzLmtleXNBdG9tXyk7XG4gICAgdHJ5IHtcbiAgICAgIHN0YXJ0QmF0Y2goKTtcbiAgICAgIC8vIERlbGV0ZVxuICAgICAgdmFyIGRlbGV0ZU91dGNvbWUgPSB0aGlzLmRlbGV0ZV8oa2V5KTtcbiAgICAgIGlmICghZGVsZXRlT3V0Y29tZSkge1xuICAgICAgICAvLyBGYWlsdXJlIG9yIGludGVyY2VwdGVkXG4gICAgICAgIHJldHVybiBkZWxldGVPdXRjb21lO1xuICAgICAgfVxuICAgICAgLy8gQUREIGludGVyY2VwdG9yXG4gICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzKHRoaXMpKSB7XG4gICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UodGhpcywge1xuICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eV8gfHwgdGhpcy50YXJnZXRfLFxuICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICB0eXBlOiBBREQsXG4gICAgICAgICAgbmV3VmFsdWU6IHZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWNoYW5nZSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgICAgfVxuICAgICAgdmFyIGNhY2hlZERlc2NyaXB0b3IgPSBnZXRDYWNoZWRPYnNlcnZhYmxlUHJvcERlc2NyaXB0b3Ioa2V5KTtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0ge1xuICAgICAgICBjb25maWd1cmFibGU6IGdsb2JhbFN0YXRlLnNhZmVEZXNjcmlwdG9ycyA/IHRoaXMuaXNQbGFpbk9iamVjdF8gOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6IGNhY2hlZERlc2NyaXB0b3IuZ2V0LFxuICAgICAgICBzZXQ6IGNhY2hlZERlc2NyaXB0b3Iuc2V0XG4gICAgICB9O1xuICAgICAgLy8gRGVmaW5lXG4gICAgICBpZiAocHJveHlUcmFwKSB7XG4gICAgICAgIGlmICghUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnRhcmdldF8sIGtleSwgZGVzY3JpcHRvcikpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZmluZVByb3BlcnR5KHRoaXMudGFyZ2V0Xywga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgIH1cbiAgICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGVWYWx1ZSh2YWx1ZSwgZW5oYW5jZXIsIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHRoaXMubmFtZV8gKyBcIi5cIiArIGtleS50b1N0cmluZygpIDogXCJPYnNlcnZhYmxlT2JqZWN0LmtleVwiLCBmYWxzZSk7XG4gICAgICB0aGlzLnZhbHVlc18uc2V0KGtleSwgb2JzZXJ2YWJsZSk7XG4gICAgICAvLyBOb3RpZnkgKHZhbHVlIHBvc3NpYmx5IGNoYW5nZWQgYnkgT2JzZXJ2YWJsZVZhbHVlKVxuICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUFkZGl0aW9uXyhrZXksIG9ic2VydmFibGUudmFsdWVfKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgZW5kQmF0Y2goKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLy8gSWYgb3JpZ2luYWwgZGVzY3JpcHRvciBiZWNvbWVzIHJlbGV2YW50LCBtb3ZlIHRoaXMgdG8gYW5ub3RhdGlvbiBkaXJlY3RseVxuICA7XG4gIF9wcm90by5kZWZpbmVDb21wdXRlZFByb3BlcnR5XyA9IGZ1bmN0aW9uIGRlZmluZUNvbXB1dGVkUHJvcGVydHlfKGtleSwgb3B0aW9ucywgcHJveHlUcmFwKSB7XG4gICAgaWYgKHByb3h5VHJhcCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm94eVRyYXAgPSBmYWxzZTtcbiAgICB9XG4gICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQodGhpcy5rZXlzQXRvbV8pO1xuICAgIHRyeSB7XG4gICAgICBzdGFydEJhdGNoKCk7XG4gICAgICAvLyBEZWxldGVcbiAgICAgIHZhciBkZWxldGVPdXRjb21lID0gdGhpcy5kZWxldGVfKGtleSk7XG4gICAgICBpZiAoIWRlbGV0ZU91dGNvbWUpIHtcbiAgICAgICAgLy8gRmFpbHVyZSBvciBpbnRlcmNlcHRlZFxuICAgICAgICByZXR1cm4gZGVsZXRlT3V0Y29tZTtcbiAgICAgIH1cbiAgICAgIC8vIEFERCBpbnRlcmNlcHRvclxuICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKHRoaXMsIHtcbiAgICAgICAgICBvYmplY3Q6IHRoaXMucHJveHlfIHx8IHRoaXMudGFyZ2V0XyxcbiAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgdHlwZTogQURELFxuICAgICAgICAgIG5ld1ZhbHVlOiB1bmRlZmluZWRcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9wdGlvbnMubmFtZSB8fCAob3B0aW9ucy5uYW1lID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gdGhpcy5uYW1lXyArIFwiLlwiICsga2V5LnRvU3RyaW5nKCkgOiBcIk9ic2VydmFibGVPYmplY3Qua2V5XCIpO1xuICAgICAgb3B0aW9ucy5jb250ZXh0ID0gdGhpcy5wcm94eV8gfHwgdGhpcy50YXJnZXRfO1xuICAgICAgdmFyIGNhY2hlZERlc2NyaXB0b3IgPSBnZXRDYWNoZWRPYnNlcnZhYmxlUHJvcERlc2NyaXB0b3Ioa2V5KTtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0ge1xuICAgICAgICBjb25maWd1cmFibGU6IGdsb2JhbFN0YXRlLnNhZmVEZXNjcmlwdG9ycyA/IHRoaXMuaXNQbGFpbk9iamVjdF8gOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZ2V0OiBjYWNoZWREZXNjcmlwdG9yLmdldCxcbiAgICAgICAgc2V0OiBjYWNoZWREZXNjcmlwdG9yLnNldFxuICAgICAgfTtcbiAgICAgIC8vIERlZmluZVxuICAgICAgaWYgKHByb3h5VHJhcCkge1xuICAgICAgICBpZiAoIVJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGhpcy50YXJnZXRfLCBrZXksIGRlc2NyaXB0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLnRhcmdldF8sIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICB9XG4gICAgICB0aGlzLnZhbHVlc18uc2V0KGtleSwgbmV3IENvbXB1dGVkVmFsdWUob3B0aW9ucykpO1xuICAgICAgLy8gTm90aWZ5XG4gICAgICB0aGlzLm5vdGlmeVByb3BlcnR5QWRkaXRpb25fKGtleSwgdW5kZWZpbmVkKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgZW5kQmF0Y2goKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7UHJvcGVydHlLZXl9IGtleVxuICAgKiBAcGFyYW0ge1Byb3BlcnR5RGVzY3JpcHRvcn0gZGVzY3JpcHRvclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHByb3h5VHJhcCB3aGV0aGVyIGl0J3MgY2FsbGVkIGZyb20gcHJveHkgdHJhcFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbnxudWxsfSB0cnVlIG9uIHN1Y2Nlc3MsIGZhbHNlIG9uIGZhaWx1cmUgKHByb3h5VHJhcCArIG5vbi1jb25maWd1cmFibGUpLCBudWxsIHdoZW4gY2FuY2VsbGVkIGJ5IGludGVyY2VwdG9yXG4gICAqLztcbiAgX3Byb3RvLmRlbGV0ZV8gPSBmdW5jdGlvbiBkZWxldGVfKGtleSwgcHJveHlUcmFwKSB7XG4gICAgaWYgKHByb3h5VHJhcCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm94eVRyYXAgPSBmYWxzZTtcbiAgICB9XG4gICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQodGhpcy5rZXlzQXRvbV8pO1xuICAgIC8vIE5vIHN1Y2ggcHJvcFxuICAgIGlmICghaGFzUHJvcCh0aGlzLnRhcmdldF8sIGtleSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvLyBJbnRlcmNlcHRcbiAgICBpZiAoaGFzSW50ZXJjZXB0b3JzKHRoaXMpKSB7XG4gICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKHRoaXMsIHtcbiAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5XyB8fCB0aGlzLnRhcmdldF8sXG4gICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgdHlwZTogUkVNT1ZFXG4gICAgICB9KTtcbiAgICAgIC8vIENhbmNlbGxlZFxuICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIERlbGV0ZVxuICAgIHRyeSB7XG4gICAgICB2YXIgX3RoaXMkcGVuZGluZ0tleXNfLCBfdGhpcyRwZW5kaW5nS2V5c18kZ2U7XG4gICAgICBzdGFydEJhdGNoKCk7XG4gICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKHRoaXMpO1xuICAgICAgdmFyIG5vdGlmeVNweSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBpc1NweUVuYWJsZWQoKTtcbiAgICAgIHZhciBvYnNlcnZhYmxlID0gdGhpcy52YWx1ZXNfLmdldChrZXkpO1xuICAgICAgLy8gVmFsdWUgbmVlZGVkIGZvciBzcGllcy9saXN0ZW5lcnNcbiAgICAgIHZhciB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgIC8vIE9wdGltaXphdGlvbjogZG9uJ3QgcHVsbCB0aGUgdmFsdWUgdW5sZXNzIHdlIHdpbGwgbmVlZCBpdFxuICAgICAgaWYgKCFvYnNlcnZhYmxlICYmIChub3RpZnkgfHwgbm90aWZ5U3B5KSkge1xuICAgICAgICB2YXIgX2dldERlc2NyaXB0b3I7XG4gICAgICAgIHZhbHVlID0gKF9nZXREZXNjcmlwdG9yID0gZ2V0RGVzY3JpcHRvcih0aGlzLnRhcmdldF8sIGtleSkpID09IG51bGwgPyB2b2lkIDAgOiBfZ2V0RGVzY3JpcHRvci52YWx1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGRlbGV0ZSBwcm9wIChkbyBmaXJzdCwgbWF5IGZhaWwpXG4gICAgICBpZiAocHJveHlUcmFwKSB7XG4gICAgICAgIGlmICghUmVmbGVjdC5kZWxldGVQcm9wZXJ0eSh0aGlzLnRhcmdldF8sIGtleSkpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnRhcmdldF9ba2V5XTtcbiAgICAgIH1cbiAgICAgIC8vIEFsbG93IHJlLWFubm90YXRpbmcgdGhpcyBmaWVsZFxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBkZWxldGUgdGhpcy5hcHBsaWVkQW5ub3RhdGlvbnNfW2tleV07XG4gICAgICB9XG4gICAgICAvLyBDbGVhciBvYnNlcnZhYmxlXG4gICAgICBpZiAob2JzZXJ2YWJsZSkge1xuICAgICAgICB0aGlzLnZhbHVlc19bXCJkZWxldGVcIl0oa2V5KTtcbiAgICAgICAgLy8gZm9yIGNvbXB1dGVkLCB2YWx1ZSBpcyB1bmRlZmluZWRcbiAgICAgICAgaWYgKG9ic2VydmFibGUgaW5zdGFuY2VvZiBPYnNlcnZhYmxlVmFsdWUpIHtcbiAgICAgICAgICB2YWx1ZSA9IG9ic2VydmFibGUudmFsdWVfO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5vdGlmeTogYXV0b3J1bigoKSA9PiBvYmpba2V5XSksIHNlZSAjMTc5NlxuICAgICAgICBwcm9wYWdhdGVDaGFuZ2VkKG9ic2VydmFibGUpO1xuICAgICAgfVxuICAgICAgLy8gTm90aWZ5IFwia2V5cy9lbnRyaWVzL3ZhbHVlc1wiIG9ic2VydmVyc1xuICAgICAgdGhpcy5rZXlzQXRvbV8ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgLy8gTm90aWZ5IFwiaGFzXCIgb2JzZXJ2ZXJzXG4gICAgICAvLyBcImluXCIgYXMgaXQgbWF5IHN0aWxsIGV4aXN0IGluIHByb3RvXG4gICAgICAoX3RoaXMkcGVuZGluZ0tleXNfID0gdGhpcy5wZW5kaW5nS2V5c18pID09IG51bGwgPyB2b2lkIDAgOiAoX3RoaXMkcGVuZGluZ0tleXNfJGdlID0gX3RoaXMkcGVuZGluZ0tleXNfLmdldChrZXkpKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMkcGVuZGluZ0tleXNfJGdlLnNldChrZXkgaW4gdGhpcy50YXJnZXRfKTtcbiAgICAgIC8vIE5vdGlmeSBzcGllcy9saXN0ZW5lcnNcbiAgICAgIGlmIChub3RpZnkgfHwgbm90aWZ5U3B5KSB7XG4gICAgICAgIHZhciBfY2hhbmdlMiA9IHtcbiAgICAgICAgICB0eXBlOiBSRU1PVkUsXG4gICAgICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwib2JqZWN0XCIsXG4gICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5XyB8fCB0aGlzLnRhcmdldF8sXG4gICAgICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgICAgIG9sZFZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICBuYW1lOiBrZXlcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgICAgICBzcHlSZXBvcnRTdGFydChfY2hhbmdlMik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5vdGlmeSkge1xuICAgICAgICAgIG5vdGlmeUxpc3RlbmVycyh0aGlzLCBfY2hhbmdlMik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBlbmRCYXRjaCgpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvKipcbiAgICogT2JzZXJ2ZXMgdGhpcyBvYmplY3QuIFRyaWdnZXJzIGZvciB0aGUgZXZlbnRzICdhZGQnLCAndXBkYXRlJyBhbmQgJ2RlbGV0ZScuXG4gICAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L29ic2VydmVcbiAgICogZm9yIGNhbGxiYWNrIGRldGFpbHNcbiAgICovO1xuICBfcHJvdG8ub2JzZXJ2ZV8gPSBmdW5jdGlvbiBvYnNlcnZlXyhjYWxsYmFjaywgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBmaXJlSW1tZWRpYXRlbHkgPT09IHRydWUpIHtcbiAgICAgIGRpZShcImBvYnNlcnZlYCBkb2Vzbid0IHN1cHBvcnQgdGhlIGZpcmUgaW1tZWRpYXRlbHkgcHJvcGVydHkgZm9yIG9ic2VydmFibGUgb2JqZWN0cy5cIik7XG4gICAgfVxuICAgIHJldHVybiByZWdpc3Rlckxpc3RlbmVyKHRoaXMsIGNhbGxiYWNrKTtcbiAgfTtcbiAgX3Byb3RvLmludGVyY2VwdF8gPSBmdW5jdGlvbiBpbnRlcmNlcHRfKGhhbmRsZXIpIHtcbiAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvcih0aGlzLCBoYW5kbGVyKTtcbiAgfTtcbiAgX3Byb3RvLm5vdGlmeVByb3BlcnR5QWRkaXRpb25fID0gZnVuY3Rpb24gbm90aWZ5UHJvcGVydHlBZGRpdGlvbl8oa2V5LCB2YWx1ZSkge1xuICAgIHZhciBfdGhpcyRwZW5kaW5nS2V5c18yLCBfdGhpcyRwZW5kaW5nS2V5c18yJGc7XG4gICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyh0aGlzKTtcbiAgICB2YXIgbm90aWZ5U3B5ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGlzU3B5RW5hYmxlZCgpO1xuICAgIGlmIChub3RpZnkgfHwgbm90aWZ5U3B5KSB7XG4gICAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweSA/IHtcbiAgICAgICAgdHlwZTogQURELFxuICAgICAgICBvYnNlcnZhYmxlS2luZDogXCJvYmplY3RcIixcbiAgICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgICBvYmplY3Q6IHRoaXMucHJveHlfIHx8IHRoaXMudGFyZ2V0XyxcbiAgICAgICAgbmFtZToga2V5LFxuICAgICAgICBuZXdWYWx1ZTogdmFsdWVcbiAgICAgIH0gOiBudWxsO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgICAgc3B5UmVwb3J0U3RhcnQoY2hhbmdlKTtcbiAgICAgIH1cbiAgICAgIGlmIChub3RpZnkpIHtcbiAgICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIGNoYW5nZSk7XG4gICAgICB9XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgKF90aGlzJHBlbmRpbmdLZXlzXzIgPSB0aGlzLnBlbmRpbmdLZXlzXykgPT0gbnVsbCA/IHZvaWQgMCA6IChfdGhpcyRwZW5kaW5nS2V5c18yJGcgPSBfdGhpcyRwZW5kaW5nS2V5c18yLmdldChrZXkpKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMkcGVuZGluZ0tleXNfMiRnLnNldCh0cnVlKTtcbiAgICAvLyBOb3RpZnkgXCJrZXlzL2VudHJpZXMvdmFsdWVzXCIgb2JzZXJ2ZXJzXG4gICAgdGhpcy5rZXlzQXRvbV8ucmVwb3J0Q2hhbmdlZCgpO1xuICB9O1xuICBfcHJvdG8ub3duS2V5c18gPSBmdW5jdGlvbiBvd25LZXlzXygpIHtcbiAgICB0aGlzLmtleXNBdG9tXy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgIHJldHVybiBvd25LZXlzKHRoaXMudGFyZ2V0Xyk7XG4gIH07XG4gIF9wcm90by5rZXlzXyA9IGZ1bmN0aW9uIGtleXNfKCkge1xuICAgIC8vIFJldHVybnMgZW51bWVyYWJsZSAmJiBvd24sIGJ1dCB1bmZvcnR1bmF0ZWx5IGtleXNBdG9tIHdpbGwgcmVwb3J0IG9uIEFOWSBrZXkgY2hhbmdlLlxuICAgIC8vIFRoZXJlIGlzIG5vIHdheSB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuIE9iamVjdC5rZXlzKG9iamVjdCkgYW5kIFJlZmxlY3Qub3duS2V5cyhvYmplY3QpIC0gYm90aCBhcmUgaGFuZGxlZCBieSBvd25LZXlzIHRyYXAuXG4gICAgLy8gV2UgY2FuIGVpdGhlciBvdmVyLXJlcG9ydCBpbiBPYmplY3Qua2V5cyhvYmplY3QpIG9yIHVuZGVyLXJlcG9ydCBpbiBSZWZsZWN0Lm93bktleXMob2JqZWN0KVxuICAgIC8vIFdlIGNob29zZSB0byBvdmVyLXJlcG9ydCBpbiBPYmplY3Qua2V5cyhvYmplY3QpLCBiZWNhdXNlOlxuICAgIC8vIC0gdHlwaWNhbGx5IGl0J3MgdXNlZCB3aXRoIHNpbXBsZSBkYXRhIG9iamVjdHNcbiAgICAvLyAtIHdoZW4gc3ltYm9saWMvbm9uLWVudW1lcmFibGUga2V5cyBhcmUgcmVsZXZhbnQgUmVmbGVjdC5vd25LZXlzIHdvcmtzIGFzIGV4cGVjdGVkXG4gICAgdGhpcy5rZXlzQXRvbV8ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy50YXJnZXRfKTtcbiAgfTtcbiAgcmV0dXJuIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbjtcbn0oKTtcbmZ1bmN0aW9uIGFzT2JzZXJ2YWJsZU9iamVjdCh0YXJnZXQsIG9wdGlvbnMpIHtcbiAgdmFyIF9vcHRpb25zJG5hbWU7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgb3B0aW9ucyAmJiBpc09ic2VydmFibGVPYmplY3QodGFyZ2V0KSkge1xuICAgIGRpZShcIk9wdGlvbnMgY2FuJ3QgYmUgcHJvdmlkZWQgZm9yIGFscmVhZHkgb2JzZXJ2YWJsZSBvYmplY3RzLlwiKTtcbiAgfVxuICBpZiAoaGFzUHJvcCh0YXJnZXQsICRtb2J4KSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIShnZXRBZG1pbmlzdHJhdGlvbih0YXJnZXQpIGluc3RhbmNlb2YgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uKSkge1xuICAgICAgZGllKFwiQ2Fubm90IGNvbnZlcnQgJ1wiICsgZ2V0RGVidWdOYW1lKHRhcmdldCkgKyBcIicgaW50byBvYnNlcnZhYmxlIG9iamVjdDpcIiArIFwiXFxuVGhlIHRhcmdldCBpcyBhbHJlYWR5IG9ic2VydmFibGUgb2YgZGlmZmVyZW50IHR5cGUuXCIgKyBcIlxcbkV4dGVuZGluZyBidWlsdGlucyBpcyBub3Qgc3VwcG9ydGVkLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFPYmplY3QuaXNFeHRlbnNpYmxlKHRhcmdldCkpIHtcbiAgICBkaWUoXCJDYW5ub3QgbWFrZSB0aGUgZGVzaWduYXRlZCBvYmplY3Qgb2JzZXJ2YWJsZTsgaXQgaXMgbm90IGV4dGVuc2libGVcIik7XG4gIH1cbiAgdmFyIG5hbWUgPSAoX29wdGlvbnMkbmFtZSA9IG9wdGlvbnMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdGlvbnMubmFtZSkgIT0gbnVsbCA/IF9vcHRpb25zJG5hbWUgOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyAoaXNQbGFpbk9iamVjdCh0YXJnZXQpID8gXCJPYnNlcnZhYmxlT2JqZWN0XCIgOiB0YXJnZXQuY29uc3RydWN0b3IubmFtZSkgKyBcIkBcIiArIGdldE5leHRJZCgpIDogXCJPYnNlcnZhYmxlT2JqZWN0XCI7XG4gIHZhciBhZG0gPSBuZXcgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uKHRhcmdldCwgbmV3IE1hcCgpLCBTdHJpbmcobmFtZSksIGdldEFubm90YXRpb25Gcm9tT3B0aW9ucyhvcHRpb25zKSk7XG4gIGFkZEhpZGRlblByb3AodGFyZ2V0LCAkbW9ieCwgYWRtKTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cbnZhciBpc09ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlKFwiT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uXCIsIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbik7XG5mdW5jdGlvbiBnZXRDYWNoZWRPYnNlcnZhYmxlUHJvcERlc2NyaXB0b3Ioa2V5KSB7XG4gIHJldHVybiBkZXNjcmlwdG9yQ2FjaGVba2V5XSB8fCAoZGVzY3JpcHRvckNhY2hlW2tleV0gPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpc1skbW9ieF0uZ2V0T2JzZXJ2YWJsZVByb3BWYWx1ZV8oa2V5KTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpc1skbW9ieF0uc2V0T2JzZXJ2YWJsZVByb3BWYWx1ZV8oa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIGlzT2JzZXJ2YWJsZU9iamVjdCh0aGluZykge1xuICBpZiAoaXNPYmplY3QodGhpbmcpKSB7XG4gICAgcmV0dXJuIGlzT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uKHRoaW5nWyRtb2J4XSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gcmVjb3JkQW5ub3RhdGlvbkFwcGxpZWQoYWRtLCBhbm5vdGF0aW9uLCBrZXkpIHtcbiAgdmFyIF9hZG0kdGFyZ2V0XyRzdG9yZWRBbjtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGFkbS5hcHBsaWVkQW5ub3RhdGlvbnNfW2tleV0gPSBhbm5vdGF0aW9uO1xuICB9XG4gIC8vIFJlbW92ZSBhcHBsaWVkIGRlY29yYXRvciBhbm5vdGF0aW9uIHNvIHdlIGRvbid0IHRyeSB0byBhcHBseSBpdCBhZ2FpbiBpbiBzdWJjbGFzcyBjb25zdHJ1Y3RvclxuICAoX2FkbSR0YXJnZXRfJHN0b3JlZEFuID0gYWRtLnRhcmdldF9bc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2xdKSA9PSBudWxsID8gdHJ1ZSA6IGRlbGV0ZSBfYWRtJHRhcmdldF8kc3RvcmVkQW5ba2V5XTtcbn1cbmZ1bmN0aW9uIGFzc2VydEFubm90YWJsZShhZG0sIGFubm90YXRpb24sIGtleSkge1xuICAvLyBWYWxpZCBhbm5vdGF0aW9uXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWlzQW5ub3RhdGlvbihhbm5vdGF0aW9uKSkge1xuICAgIGRpZShcIkNhbm5vdCBhbm5vdGF0ZSAnXCIgKyBhZG0ubmFtZV8gKyBcIi5cIiArIGtleS50b1N0cmluZygpICsgXCInOiBJbnZhbGlkIGFubm90YXRpb24uXCIpO1xuICB9XG4gIC8qXG4gIC8vIENvbmZpZ3VyYWJsZSwgbm90IHNlYWxlZCwgbm90IGZyb3plblxuICAvLyBQb3NzaWJseSBub3QgbmVlZGVkLCBqdXN0IGEgbGl0dGxlIGJldHRlciBlcnJvciB0aGVuIHRoZSBvbmUgdGhyb3duIGJ5IGVuZ2luZS5cbiAgLy8gQ2FzZXMgd2hlcmUgdGhpcyB3b3VsZCBiZSB1c2VmdWwgdGhlIG1vc3QgKHN1YmNsYXNzIGZpZWxkIGluaXRpYWxpemVyKSBhcmUgbm90IGludGVyY2VwdGFibGUgYnkgdGhpcy5cbiAgaWYgKF9fREVWX18pIHtcbiAgICAgIGNvbnN0IGNvbmZpZ3VyYWJsZSA9IGdldERlc2NyaXB0b3IoYWRtLnRhcmdldF8sIGtleSk/LmNvbmZpZ3VyYWJsZVxuICAgICAgY29uc3QgZnJvemVuID0gT2JqZWN0LmlzRnJvemVuKGFkbS50YXJnZXRfKVxuICAgICAgY29uc3Qgc2VhbGVkID0gT2JqZWN0LmlzU2VhbGVkKGFkbS50YXJnZXRfKVxuICAgICAgaWYgKCFjb25maWd1cmFibGUgfHwgZnJvemVuIHx8IHNlYWxlZCkge1xuICAgICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IGAke2FkbS5uYW1lX30uJHtrZXkudG9TdHJpbmcoKX1gXG4gICAgICAgICAgY29uc3QgcmVxdWVzdGVkQW5ub3RhdGlvblR5cGUgPSBhbm5vdGF0aW9uLmFubm90YXRpb25UeXBlX1xuICAgICAgICAgIGxldCBlcnJvciA9IGBDYW5ub3QgYXBwbHkgJyR7cmVxdWVzdGVkQW5ub3RhdGlvblR5cGV9JyB0byAnJHtmaWVsZE5hbWV9JzpgXG4gICAgICAgICAgaWYgKGZyb3plbikge1xuICAgICAgICAgICAgICBlcnJvciArPSBgXFxuT2JqZWN0IGlzIGZyb3plbi5gXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzZWFsZWQpIHtcbiAgICAgICAgICAgICAgZXJyb3IgKz0gYFxcbk9iamVjdCBpcyBzZWFsZWQuYFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWNvbmZpZ3VyYWJsZSkge1xuICAgICAgICAgICAgICBlcnJvciArPSBgXFxucHJvcGVydHkgaXMgbm90IGNvbmZpZ3VyYWJsZS5gXG4gICAgICAgICAgICAgIC8vIE1lbnRpb24gb25seSBpZiBjYXVzZWQgYnkgdXMgdG8gYXZvaWQgY29uZnVzaW9uXG4gICAgICAgICAgICAgIGlmIChoYXNQcm9wKGFkbS5hcHBsaWVkQW5ub3RhdGlvbnMhLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICBlcnJvciArPSBgXFxuVG8gcHJldmVudCBhY2NpZGVudGFsIHJlLWRlZmluaXRpb24gb2YgYSBmaWVsZCBieSBhIHN1YmNsYXNzLCBgXG4gICAgICAgICAgICAgICAgICBlcnJvciArPSBgYWxsIGFubm90YXRlZCBmaWVsZHMgb2Ygbm9uLXBsYWluIG9iamVjdHMgKGNsYXNzZXMpIGFyZSBub3QgY29uZmlndXJhYmxlLmBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkaWUoZXJyb3IpXG4gICAgICB9XG4gIH1cbiAgKi9cbiAgLy8gTm90IGFubm90YXRlZFxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFpc092ZXJyaWRlKGFubm90YXRpb24pICYmIGhhc1Byb3AoYWRtLmFwcGxpZWRBbm5vdGF0aW9uc18sIGtleSkpIHtcbiAgICB2YXIgZmllbGROYW1lID0gYWRtLm5hbWVfICsgXCIuXCIgKyBrZXkudG9TdHJpbmcoKTtcbiAgICB2YXIgY3VycmVudEFubm90YXRpb25UeXBlID0gYWRtLmFwcGxpZWRBbm5vdGF0aW9uc19ba2V5XS5hbm5vdGF0aW9uVHlwZV87XG4gICAgdmFyIHJlcXVlc3RlZEFubm90YXRpb25UeXBlID0gYW5ub3RhdGlvbi5hbm5vdGF0aW9uVHlwZV87XG4gICAgZGllKFwiQ2Fubm90IGFwcGx5ICdcIiArIHJlcXVlc3RlZEFubm90YXRpb25UeXBlICsgXCInIHRvICdcIiArIGZpZWxkTmFtZSArIFwiJzpcIiArIChcIlxcblRoZSBmaWVsZCBpcyBhbHJlYWR5IGFubm90YXRlZCB3aXRoICdcIiArIGN1cnJlbnRBbm5vdGF0aW9uVHlwZSArIFwiJy5cIikgKyBcIlxcblJlLWFubm90YXRpbmcgZmllbGRzIGlzIG5vdCBhbGxvd2VkLlwiICsgXCJcXG5Vc2UgJ292ZXJyaWRlJyBhbm5vdGF0aW9uIGZvciBtZXRob2RzIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3MuXCIpO1xuICB9XG59XG5cbi8vIEJ1ZyBpbiBzYWZhcmkgOS4qIChvciBpT1MgOSBzYWZhcmkgbW9iaWxlKS4gU2VlICMzNjRcbnZhciBFTlRSWV8wID0gLyojX19QVVJFX18qL2NyZWF0ZUFycmF5RW50cnlEZXNjcmlwdG9yKDApO1xudmFyIHNhZmFyaVByb3RvdHlwZVNldHRlckluaGVyaXRhbmNlQnVnID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgdmFyIHYgPSBmYWxzZTtcbiAgdmFyIHAgPSB7fTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHAsIFwiMFwiLCB7XG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoKSB7XG4gICAgICB2ID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICAvKiNfX1BVUkVfXyovT2JqZWN0LmNyZWF0ZShwKVtcIjBcIl0gPSAxO1xuICByZXR1cm4gdiA9PT0gZmFsc2U7XG59KCk7XG4vKipcbiAqIFRoaXMgYXJyYXkgYnVmZmVyIGNvbnRhaW5zIHR3byBsaXN0cyBvZiBwcm9wZXJ0aWVzLCBzbyB0aGF0IGFsbCBhcnJheXNcbiAqIGNhbiByZWN5Y2xlIHRoZWlyIHByb3BlcnR5IGRlZmluaXRpb25zLCB3aGljaCBzaWduaWZpY2FudGx5IGltcHJvdmVzIHBlcmZvcm1hbmNlIG9mIGNyZWF0aW5nXG4gKiBwcm9wZXJ0aWVzIG9uIHRoZSBmbHkuXG4gKi9cbnZhciBPQlNFUlZBQkxFX0FSUkFZX0JVRkZFUl9TSVpFID0gMDtcbi8vIFR5cGVzY3JpcHQgd29ya2Fyb3VuZCB0byBtYWtlIHN1cmUgT2JzZXJ2YWJsZUFycmF5IGV4dGVuZHMgQXJyYXlcbnZhciBTdHViQXJyYXkgPSBmdW5jdGlvbiBTdHViQXJyYXkoKSB7fTtcbmZ1bmN0aW9uIGluaGVyaXQoY3RvciwgcHJvdG8pIHtcbiAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihjdG9yLnByb3RvdHlwZSwgcHJvdG8pO1xuICB9IGVsc2UgaWYgKGN0b3IucHJvdG90eXBlLl9fcHJvdG9fXyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY3Rvci5wcm90b3R5cGUuX19wcm90b19fID0gcHJvdG87XG4gIH0gZWxzZSB7XG4gICAgY3Rvci5wcm90b3R5cGUgPSBwcm90bztcbiAgfVxufVxuaW5oZXJpdChTdHViQXJyYXksIEFycmF5LnByb3RvdHlwZSk7XG4vLyBXZWV4IHByb3RvIGZyZWV6ZSBwcm90ZWN0aW9uIHdhcyBoZXJlLFxuLy8gYnV0IGl0IGlzIHVuY2xlYXIgd2h5IHRoZSBoYWNrIGlzIG5lZWQgYXMgTW9iWCBuZXZlciBjaGFuZ2VkIHRoZSBwcm90b3R5cGVcbi8vIGFueXdheSwgc28gcmVtb3ZlZCBpdCBpbiBWNlxudmFyIExlZ2FjeU9ic2VydmFibGVBcnJheSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX1N0dWJBcnJheSwgX1N5bWJvbCR0b1N0cmluZ1RhZywgX1N5bWJvbCRpdGVyYXRvcikge1xuICBfaW5oZXJpdHNMb29zZShMZWdhY3lPYnNlcnZhYmxlQXJyYXksIF9TdHViQXJyYXkpO1xuICBmdW5jdGlvbiBMZWdhY3lPYnNlcnZhYmxlQXJyYXkoaW5pdGlhbFZhbHVlcywgZW5oYW5jZXIsIG5hbWUsIG93bmVkKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIGlmIChuYW1lID09PSB2b2lkIDApIHtcbiAgICAgIG5hbWUgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcIk9ic2VydmFibGVBcnJheUBcIiArIGdldE5leHRJZCgpIDogXCJPYnNlcnZhYmxlQXJyYXlcIjtcbiAgICB9XG4gICAgaWYgKG93bmVkID09PSB2b2lkIDApIHtcbiAgICAgIG93bmVkID0gZmFsc2U7XG4gICAgfVxuICAgIF90aGlzID0gX1N0dWJBcnJheS5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgaW5pdE9ic2VydmFibGUoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGFkbSA9IG5ldyBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbihuYW1lLCBlbmhhbmNlciwgb3duZWQsIHRydWUpO1xuICAgICAgYWRtLnByb3h5XyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpO1xuICAgICAgYWRkSGlkZGVuRmluYWxQcm9wKF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCAkbW9ieCwgYWRtKTtcbiAgICAgIGlmIChpbml0aWFsVmFsdWVzICYmIGluaXRpYWxWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgX3RoaXMuc3BsaWNlV2l0aEFycmF5KDAsIDAsIGluaXRpYWxWYWx1ZXMpO1xuICAgICAgfVxuICAgICAgaWYgKHNhZmFyaVByb3RvdHlwZVNldHRlckluaGVyaXRhbmNlQnVnKSB7XG4gICAgICAgIC8vIFNlZW1zIHRoYXQgU2FmYXJpIHdvbid0IHVzZSBudW1lcmljIHByb3RvdHlwZSBzZXR0ZXIgdW50aWwgYW55ICogbnVtZXJpYyBwcm9wZXJ0eSBpc1xuICAgICAgICAvLyBkZWZpbmVkIG9uIHRoZSBpbnN0YW5jZS4gQWZ0ZXIgdGhhdCBpdCB3b3JrcyBmaW5lLCBldmVuIGlmIHRoaXMgcHJvcGVydHkgaXMgZGVsZXRlZC5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLCBcIjBcIiwgRU5UUllfMCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIHZhciBfcHJvdG8gPSBMZWdhY3lPYnNlcnZhYmxlQXJyYXkucHJvdG90eXBlO1xuICBfcHJvdG8uY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0KCkge1xuICAgIHRoaXNbJG1vYnhdLmF0b21fLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFycmF5cyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFycmF5c1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkodGhpcy5zbGljZSgpLFxuICAgIC8vQHRzLWlnbm9yZVxuICAgIGFycmF5cy5tYXAoZnVuY3Rpb24gKGEpIHtcbiAgICAgIHJldHVybiBpc09ic2VydmFibGVBcnJheShhKSA/IGEuc2xpY2UoKSA6IGE7XG4gICAgfSkpO1xuICB9O1xuICBfcHJvdG9bX1N5bWJvbCRpdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBuZXh0SW5kZXggPSAwO1xuICAgIHJldHVybiBtYWtlSXRlcmFibGUoe1xuICAgICAgbmV4dDogZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIG5leHRJbmRleCA8IHNlbGYubGVuZ3RoID8ge1xuICAgICAgICAgIHZhbHVlOiBzZWxmW25leHRJbmRleCsrXSxcbiAgICAgICAgICBkb25lOiBmYWxzZVxuICAgICAgICB9IDoge1xuICAgICAgICAgIGRvbmU6IHRydWUsXG4gICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICBfY3JlYXRlQ2xhc3MoTGVnYWN5T2JzZXJ2YWJsZUFycmF5LCBbe1xuICAgIGtleTogXCJsZW5ndGhcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzWyRtb2J4XS5nZXRBcnJheUxlbmd0aF8oKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KG5ld0xlbmd0aCkge1xuICAgICAgdGhpc1skbW9ieF0uc2V0QXJyYXlMZW5ndGhfKG5ld0xlbmd0aCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBfU3ltYm9sJHRvU3RyaW5nVGFnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIFwiQXJyYXlcIjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIExlZ2FjeU9ic2VydmFibGVBcnJheTtcbn0oU3R1YkFycmF5LCBTeW1ib2wudG9TdHJpbmdUYWcsIFN5bWJvbC5pdGVyYXRvcik7XG5PYmplY3QuZW50cmllcyhhcnJheUV4dGVuc2lvbnMpLmZvckVhY2goZnVuY3Rpb24gKF9yZWYpIHtcbiAgdmFyIHByb3AgPSBfcmVmWzBdLFxuICAgIGZuID0gX3JlZlsxXTtcbiAgaWYgKHByb3AgIT09IFwiY29uY2F0XCIpIHtcbiAgICBhZGRIaWRkZW5Qcm9wKExlZ2FjeU9ic2VydmFibGVBcnJheS5wcm90b3R5cGUsIHByb3AsIGZuKTtcbiAgfVxufSk7XG5mdW5jdGlvbiBjcmVhdGVBcnJheUVudHJ5RGVzY3JpcHRvcihpbmRleCkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzWyRtb2J4XS5nZXRfKGluZGV4KTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICB0aGlzWyRtb2J4XS5zZXRfKGluZGV4LCB2YWx1ZSk7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gY3JlYXRlQXJyYXlCdWZmZXJJdGVtKGluZGV4KSB7XG4gIGRlZmluZVByb3BlcnR5KExlZ2FjeU9ic2VydmFibGVBcnJheS5wcm90b3R5cGUsIFwiXCIgKyBpbmRleCwgY3JlYXRlQXJyYXlFbnRyeURlc2NyaXB0b3IoaW5kZXgpKTtcbn1cbmZ1bmN0aW9uIHJlc2VydmVBcnJheUJ1ZmZlcihtYXgpIHtcbiAgaWYgKG1heCA+IE9CU0VSVkFCTEVfQVJSQVlfQlVGRkVSX1NJWkUpIHtcbiAgICBmb3IgKHZhciBpbmRleCA9IE9CU0VSVkFCTEVfQVJSQVlfQlVGRkVSX1NJWkU7IGluZGV4IDwgbWF4ICsgMTAwOyBpbmRleCsrKSB7XG4gICAgICBjcmVhdGVBcnJheUJ1ZmZlckl0ZW0oaW5kZXgpO1xuICAgIH1cbiAgICBPQlNFUlZBQkxFX0FSUkFZX0JVRkZFUl9TSVpFID0gbWF4O1xuICB9XG59XG5yZXNlcnZlQXJyYXlCdWZmZXIoMTAwMCk7XG5mdW5jdGlvbiBjcmVhdGVMZWdhY3lBcnJheShpbml0aWFsVmFsdWVzLCBlbmhhbmNlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IExlZ2FjeU9ic2VydmFibGVBcnJheShpbml0aWFsVmFsdWVzLCBlbmhhbmNlciwgbmFtZSk7XG59XG5cbmZ1bmN0aW9uIGdldEF0b20odGhpbmcsIHByb3BlcnR5KSB7XG4gIGlmICh0eXBlb2YgdGhpbmcgPT09IFwib2JqZWN0XCIgJiYgdGhpbmcgIT09IG51bGwpIHtcbiAgICBpZiAoaXNPYnNlcnZhYmxlQXJyYXkodGhpbmcpKSB7XG4gICAgICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkaWUoMjMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaW5nWyRtb2J4XS5hdG9tXztcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZVNldCh0aGluZykpIHtcbiAgICAgIHJldHVybiB0aGluZy5hdG9tXztcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU1hcCh0aGluZykpIHtcbiAgICAgIGlmIChwcm9wZXJ0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGluZy5rZXlzQXRvbV87XG4gICAgICB9XG4gICAgICB2YXIgb2JzZXJ2YWJsZSA9IHRoaW5nLmRhdGFfLmdldChwcm9wZXJ0eSkgfHwgdGhpbmcuaGFzTWFwXy5nZXQocHJvcGVydHkpO1xuICAgICAgaWYgKCFvYnNlcnZhYmxlKSB7XG4gICAgICAgIGRpZSgyNSwgcHJvcGVydHksIGdldERlYnVnTmFtZSh0aGluZykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ic2VydmFibGU7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVPYmplY3QodGhpbmcpKSB7XG4gICAgICBpZiAoIXByb3BlcnR5KSB7XG4gICAgICAgIHJldHVybiBkaWUoMjYpO1xuICAgICAgfVxuICAgICAgdmFyIF9vYnNlcnZhYmxlID0gdGhpbmdbJG1vYnhdLnZhbHVlc18uZ2V0KHByb3BlcnR5KTtcbiAgICAgIGlmICghX29ic2VydmFibGUpIHtcbiAgICAgICAgZGllKDI3LCBwcm9wZXJ0eSwgZ2V0RGVidWdOYW1lKHRoaW5nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gX29ic2VydmFibGU7XG4gICAgfVxuICAgIGlmIChpc0F0b20odGhpbmcpIHx8IGlzQ29tcHV0ZWRWYWx1ZSh0aGluZykgfHwgaXNSZWFjdGlvbih0aGluZykpIHtcbiAgICAgIHJldHVybiB0aGluZztcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aGluZykpIHtcbiAgICBpZiAoaXNSZWFjdGlvbih0aGluZ1skbW9ieF0pKSB7XG4gICAgICAvLyBkaXNwb3NlciBmdW5jdGlvblxuICAgICAgcmV0dXJuIHRoaW5nWyRtb2J4XTtcbiAgICB9XG4gIH1cbiAgZGllKDI4KTtcbn1cbmZ1bmN0aW9uIGdldEFkbWluaXN0cmF0aW9uKHRoaW5nLCBwcm9wZXJ0eSkge1xuICBpZiAoIXRoaW5nKSB7XG4gICAgZGllKDI5KTtcbiAgfVxuICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbihnZXRBdG9tKHRoaW5nLCBwcm9wZXJ0eSkpO1xuICB9XG4gIGlmIChpc0F0b20odGhpbmcpIHx8IGlzQ29tcHV0ZWRWYWx1ZSh0aGluZykgfHwgaXNSZWFjdGlvbih0aGluZykpIHtcbiAgICByZXR1cm4gdGhpbmc7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZU1hcCh0aGluZykgfHwgaXNPYnNlcnZhYmxlU2V0KHRoaW5nKSkge1xuICAgIHJldHVybiB0aGluZztcbiAgfVxuICBpZiAodGhpbmdbJG1vYnhdKSB7XG4gICAgcmV0dXJuIHRoaW5nWyRtb2J4XTtcbiAgfVxuICBkaWUoMjQsIHRoaW5nKTtcbn1cbmZ1bmN0aW9uIGdldERlYnVnTmFtZSh0aGluZywgcHJvcGVydHkpIHtcbiAgdmFyIG5hbWVkO1xuICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgIG5hbWVkID0gZ2V0QXRvbSh0aGluZywgcHJvcGVydHkpO1xuICB9IGVsc2UgaWYgKGlzQWN0aW9uKHRoaW5nKSkge1xuICAgIHJldHVybiB0aGluZy5uYW1lO1xuICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCh0aGluZykgfHwgaXNPYnNlcnZhYmxlTWFwKHRoaW5nKSB8fCBpc09ic2VydmFibGVTZXQodGhpbmcpKSB7XG4gICAgbmFtZWQgPSBnZXRBZG1pbmlzdHJhdGlvbih0aGluZyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gdmFsaWQgZm9yIGFycmF5cyBhcyB3ZWxsXG4gICAgbmFtZWQgPSBnZXRBdG9tKHRoaW5nKTtcbiAgfVxuICByZXR1cm4gbmFtZWQubmFtZV87XG59XG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiBmb3IgaW5pdGlhbGl6aW5nIG9ic2VydmFibGUgc3RydWN0dXJlcywgaXQgYXBwbGllczpcbiAqIDEuIGFsbG93U3RhdGVDaGFuZ2VzIHNvIHdlIGRvbid0IHZpb2xhdGUgZW5mb3JjZUFjdGlvbnMuXG4gKiAyLiB1bnRyYWNrZWQgc28gd2UgZG9uJ3QgYWNjaWRlbnRhbHkgc3Vic2NyaWJlIHRvIGFueXRoaW5nIG9ic2VydmFibGUgYWNjZXNzZWQgZHVyaW5nIGluaXQgaW4gY2FzZSB0aGUgb2JzZXJ2YWJsZSBpcyBjcmVhdGVkIGluc2lkZSBkZXJpdmF0aW9uLlxuICogMy4gYmF0Y2ggdG8gYXZvaWQgc3RhdGUgdmVyc2lvbiB1cGRhdGVzXG4gKi9cbmZ1bmN0aW9uIGluaXRPYnNlcnZhYmxlKGNiKSB7XG4gIHZhciBkZXJpdmF0aW9uID0gdW50cmFja2VkU3RhcnQoKTtcbiAgdmFyIGFsbG93U3RhdGVDaGFuZ2VzID0gYWxsb3dTdGF0ZUNoYW5nZXNTdGFydCh0cnVlKTtcbiAgc3RhcnRCYXRjaCgpO1xuICB0cnkge1xuICAgIHJldHVybiBjYigpO1xuICB9IGZpbmFsbHkge1xuICAgIGVuZEJhdGNoKCk7XG4gICAgYWxsb3dTdGF0ZUNoYW5nZXNFbmQoYWxsb3dTdGF0ZUNoYW5nZXMpO1xuICAgIHVudHJhY2tlZEVuZChkZXJpdmF0aW9uKTtcbiAgfVxufVxuXG52YXIgdG9TdHJpbmcgPSBvYmplY3RQcm90b3R5cGUudG9TdHJpbmc7XG5mdW5jdGlvbiBkZWVwRXF1YWwoYSwgYiwgZGVwdGgpIHtcbiAgaWYgKGRlcHRoID09PSB2b2lkIDApIHtcbiAgICBkZXB0aCA9IC0xO1xuICB9XG4gIHJldHVybiBlcShhLCBiLCBkZXB0aCk7XG59XG4vLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvYmxvYi81YzIzN2E3YzY4MmZiNjhmZDUzNzgyMDNmMGJmMjJkY2UxNjI0ODU0L3VuZGVyc2NvcmUuanMjTDExODYtTDEyODlcbi8vIEludGVybmFsIHJlY3Vyc2l2ZSBjb21wYXJpc29uIGZ1bmN0aW9uIGZvciBgaXNFcXVhbGAuXG5mdW5jdGlvbiBlcShhLCBiLCBkZXB0aCwgYVN0YWNrLCBiU3RhY2spIHtcbiAgLy8gSWRlbnRpY2FsIG9iamVjdHMgYXJlIGVxdWFsLiBgMCA9PT0gLTBgLCBidXQgdGhleSBhcmVuJ3QgaWRlbnRpY2FsLlxuICAvLyBTZWUgdGhlIFtIYXJtb255IGBlZ2FsYCBwcm9wb3NhbF0oaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTplZ2FsKS5cbiAgaWYgKGEgPT09IGIpIHtcbiAgICByZXR1cm4gYSAhPT0gMCB8fCAxIC8gYSA9PT0gMSAvIGI7XG4gIH1cbiAgLy8gYG51bGxgIG9yIGB1bmRlZmluZWRgIG9ubHkgZXF1YWwgdG8gaXRzZWxmIChzdHJpY3QgY29tcGFyaXNvbikuXG4gIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIGBOYU5gcyBhcmUgZXF1aXZhbGVudCwgYnV0IG5vbi1yZWZsZXhpdmUuXG4gIGlmIChhICE9PSBhKSB7XG4gICAgcmV0dXJuIGIgIT09IGI7XG4gIH1cbiAgLy8gRXhoYXVzdCBwcmltaXRpdmUgY2hlY2tzXG4gIHZhciB0eXBlID0gdHlwZW9mIGE7XG4gIGlmICh0eXBlICE9PSBcImZ1bmN0aW9uXCIgJiYgdHlwZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgYiAhPSBcIm9iamVjdFwiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIENvbXBhcmUgYFtbQ2xhc3NdXWAgbmFtZXMuXG4gIHZhciBjbGFzc05hbWUgPSB0b1N0cmluZy5jYWxsKGEpO1xuICBpZiAoY2xhc3NOYW1lICE9PSB0b1N0cmluZy5jYWxsKGIpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgLy8gU3RyaW5ncywgbnVtYmVycywgcmVndWxhciBleHByZXNzaW9ucywgZGF0ZXMsIGFuZCBib29sZWFucyBhcmUgY29tcGFyZWQgYnkgdmFsdWUuXG4gICAgY2FzZSBcIltvYmplY3QgUmVnRXhwXVwiOlxuICAgIC8vIFJlZ0V4cHMgYXJlIGNvZXJjZWQgdG8gc3RyaW5ncyBmb3IgY29tcGFyaXNvbiAoTm90ZTogJycgKyAvYS9pID09PSAnL2EvaScpXG4gICAgY2FzZSBcIltvYmplY3QgU3RyaW5nXVwiOlxuICAgICAgLy8gUHJpbWl0aXZlcyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBvYmplY3Qgd3JhcHBlcnMgYXJlIGVxdWl2YWxlbnQ7IHRodXMsIGBcIjVcImAgaXNcbiAgICAgIC8vIGVxdWl2YWxlbnQgdG8gYG5ldyBTdHJpbmcoXCI1XCIpYC5cbiAgICAgIHJldHVybiBcIlwiICsgYSA9PT0gXCJcIiArIGI7XG4gICAgY2FzZSBcIltvYmplY3QgTnVtYmVyXVwiOlxuICAgICAgLy8gYE5hTmBzIGFyZSBlcXVpdmFsZW50LCBidXQgbm9uLXJlZmxleGl2ZS5cbiAgICAgIC8vIE9iamVjdChOYU4pIGlzIGVxdWl2YWxlbnQgdG8gTmFOLlxuICAgICAgaWYgKCthICE9PSArYSkge1xuICAgICAgICByZXR1cm4gK2IgIT09ICtiO1xuICAgICAgfVxuICAgICAgLy8gQW4gYGVnYWxgIGNvbXBhcmlzb24gaXMgcGVyZm9ybWVkIGZvciBvdGhlciBudW1lcmljIHZhbHVlcy5cbiAgICAgIHJldHVybiArYSA9PT0gMCA/IDEgLyArYSA9PT0gMSAvIGIgOiArYSA9PT0gK2I7XG4gICAgY2FzZSBcIltvYmplY3QgRGF0ZV1cIjpcbiAgICBjYXNlIFwiW29iamVjdCBCb29sZWFuXVwiOlxuICAgICAgLy8gQ29lcmNlIGRhdGVzIGFuZCBib29sZWFucyB0byBudW1lcmljIHByaW1pdGl2ZSB2YWx1ZXMuIERhdGVzIGFyZSBjb21wYXJlZCBieSB0aGVpclxuICAgICAgLy8gbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zLiBOb3RlIHRoYXQgaW52YWxpZCBkYXRlcyB3aXRoIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9uc1xuICAgICAgLy8gb2YgYE5hTmAgYXJlIG5vdCBlcXVpdmFsZW50LlxuICAgICAgcmV0dXJuICthID09PSArYjtcbiAgICBjYXNlIFwiW29iamVjdCBTeW1ib2xdXCI6XG4gICAgICByZXR1cm4gdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBTeW1ib2wudmFsdWVPZi5jYWxsKGEpID09PSBTeW1ib2wudmFsdWVPZi5jYWxsKGIpO1xuICAgIGNhc2UgXCJbb2JqZWN0IE1hcF1cIjpcbiAgICBjYXNlIFwiW29iamVjdCBTZXRdXCI6XG4gICAgICAvLyBNYXBzIGFuZCBTZXRzIGFyZSB1bndyYXBwZWQgdG8gYXJyYXlzIG9mIGVudHJ5LXBhaXJzLCBhZGRpbmcgYW4gaW5jaWRlbnRhbCBsZXZlbC5cbiAgICAgIC8vIEhpZGUgdGhpcyBleHRyYSBsZXZlbCBieSBpbmNyZWFzaW5nIHRoZSBkZXB0aC5cbiAgICAgIGlmIChkZXB0aCA+PSAwKSB7XG4gICAgICAgIGRlcHRoKys7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgfVxuICAvLyBVbndyYXAgYW55IHdyYXBwZWQgb2JqZWN0cy5cbiAgYSA9IHVud3JhcChhKTtcbiAgYiA9IHVud3JhcChiKTtcbiAgdmFyIGFyZUFycmF5cyA9IGNsYXNzTmFtZSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICBpZiAoIWFyZUFycmF5cykge1xuICAgIGlmICh0eXBlb2YgYSAhPSBcIm9iamVjdFwiIHx8IHR5cGVvZiBiICE9IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gT2JqZWN0cyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVpdmFsZW50LCBidXQgYE9iamVjdGBzIG9yIGBBcnJheWBzXG4gICAgLy8gZnJvbSBkaWZmZXJlbnQgZnJhbWVzIGFyZS5cbiAgICB2YXIgYUN0b3IgPSBhLmNvbnN0cnVjdG9yLFxuICAgICAgYkN0b3IgPSBiLmNvbnN0cnVjdG9yO1xuICAgIGlmIChhQ3RvciAhPT0gYkN0b3IgJiYgIShpc0Z1bmN0aW9uKGFDdG9yKSAmJiBhQ3RvciBpbnN0YW5jZW9mIGFDdG9yICYmIGlzRnVuY3Rpb24oYkN0b3IpICYmIGJDdG9yIGluc3RhbmNlb2YgYkN0b3IpICYmIFwiY29uc3RydWN0b3JcIiBpbiBhICYmIFwiY29uc3RydWN0b3JcIiBpbiBiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChkZXB0aCA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIGlmIChkZXB0aCA8IDApIHtcbiAgICBkZXB0aCA9IC0xO1xuICB9XG4gIC8vIEFzc3VtZSBlcXVhbGl0eSBmb3IgY3ljbGljIHN0cnVjdHVyZXMuIFRoZSBhbGdvcml0aG0gZm9yIGRldGVjdGluZyBjeWNsaWNcbiAgLy8gc3RydWN0dXJlcyBpcyBhZGFwdGVkIGZyb20gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMywgYWJzdHJhY3Qgb3BlcmF0aW9uIGBKT2AuXG4gIC8vIEluaXRpYWxpemluZyBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgLy8gSXQncyBkb25lIGhlcmUgc2luY2Ugd2Ugb25seSBuZWVkIHRoZW0gZm9yIG9iamVjdHMgYW5kIGFycmF5cyBjb21wYXJpc29uLlxuICBhU3RhY2sgPSBhU3RhY2sgfHwgW107XG4gIGJTdGFjayA9IGJTdGFjayB8fCBbXTtcbiAgdmFyIGxlbmd0aCA9IGFTdGFjay5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIC8vIExpbmVhciBzZWFyY2guIFBlcmZvcm1hbmNlIGlzIGludmVyc2VseSBwcm9wb3J0aW9uYWwgdG8gdGhlIG51bWJlciBvZlxuICAgIC8vIHVuaXF1ZSBuZXN0ZWQgc3RydWN0dXJlcy5cbiAgICBpZiAoYVN0YWNrW2xlbmd0aF0gPT09IGEpIHtcbiAgICAgIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PT0gYjtcbiAgICB9XG4gIH1cbiAgLy8gQWRkIHRoZSBmaXJzdCBvYmplY3QgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICBhU3RhY2sucHVzaChhKTtcbiAgYlN0YWNrLnB1c2goYik7XG4gIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyBhbmQgYXJyYXlzLlxuICBpZiAoYXJlQXJyYXlzKSB7XG4gICAgLy8gQ29tcGFyZSBhcnJheSBsZW5ndGhzIHRvIGRldGVybWluZSBpZiBhIGRlZXAgY29tcGFyaXNvbiBpcyBuZWNlc3NhcnkuXG4gICAgbGVuZ3RoID0gYS5sZW5ndGg7XG4gICAgaWYgKGxlbmd0aCAhPT0gYi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gRGVlcCBjb21wYXJlIHRoZSBjb250ZW50cywgaWdub3Jpbmcgbm9uLW51bWVyaWMgcHJvcGVydGllcy5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIGlmICghZXEoYVtsZW5ndGhdLCBiW2xlbmd0aF0sIGRlcHRoIC0gMSwgYVN0YWNrLCBiU3RhY2spKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gRGVlcCBjb21wYXJlIG9iamVjdHMuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhKTtcbiAgICB2YXIga2V5O1xuICAgIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIC8vIEVuc3VyZSB0aGF0IGJvdGggb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIG51bWJlciBvZiBwcm9wZXJ0aWVzIGJlZm9yZSBjb21wYXJpbmcgZGVlcCBlcXVhbGl0eS5cbiAgICBpZiAoT2JqZWN0LmtleXMoYikubGVuZ3RoICE9PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAvLyBEZWVwIGNvbXBhcmUgZWFjaCBtZW1iZXJcbiAgICAgIGtleSA9IGtleXNbbGVuZ3RoXTtcbiAgICAgIGlmICghKGhhc1Byb3AoYiwga2V5KSAmJiBlcShhW2tleV0sIGJba2V5XSwgZGVwdGggLSAxLCBhU3RhY2ssIGJTdGFjaykpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gIGFTdGFjay5wb3AoKTtcbiAgYlN0YWNrLnBvcCgpO1xuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHVud3JhcChhKSB7XG4gIGlmIChpc09ic2VydmFibGVBcnJheShhKSkge1xuICAgIHJldHVybiBhLnNsaWNlKCk7XG4gIH1cbiAgaWYgKGlzRVM2TWFwKGEpIHx8IGlzT2JzZXJ2YWJsZU1hcChhKSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGEuZW50cmllcygpKTtcbiAgfVxuICBpZiAoaXNFUzZTZXQoYSkgfHwgaXNPYnNlcnZhYmxlU2V0KGEpKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYS5lbnRyaWVzKCkpO1xuICB9XG4gIHJldHVybiBhO1xufVxuXG5mdW5jdGlvbiBtYWtlSXRlcmFibGUoaXRlcmF0b3IpIHtcbiAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGdldFNlbGY7XG4gIHJldHVybiBpdGVyYXRvcjtcbn1cbmZ1bmN0aW9uIGdldFNlbGYoKSB7XG4gIHJldHVybiB0aGlzO1xufVxuXG5mdW5jdGlvbiBpc0Fubm90YXRpb24odGhpbmcpIHtcbiAgcmV0dXJuIChcbiAgICAvLyBDYW4gYmUgZnVuY3Rpb25cbiAgICB0aGluZyBpbnN0YW5jZW9mIE9iamVjdCAmJiB0eXBlb2YgdGhpbmcuYW5ub3RhdGlvblR5cGVfID09PSBcInN0cmluZ1wiICYmIGlzRnVuY3Rpb24odGhpbmcubWFrZV8pICYmIGlzRnVuY3Rpb24odGhpbmcuZXh0ZW5kXylcbiAgKTtcbn1cblxuLyoqXG4gKiAoYykgTWljaGVsIFdlc3RzdHJhdGUgMjAxNSAtIDIwMjBcbiAqIE1JVCBMaWNlbnNlZFxuICpcbiAqIFdlbGNvbWUgdG8gdGhlIG1vYnggc291cmNlcyEgVG8gZ2V0IGEgZ2xvYmFsIG92ZXJ2aWV3IG9mIGhvdyBNb2JYIGludGVybmFsbHkgd29ya3MsXG4gKiB0aGlzIGlzIGEgZ29vZCBwbGFjZSB0byBzdGFydDpcbiAqIGh0dHBzOi8vbWVkaXVtLmNvbS9AbXdlc3RzdHJhdGUvYmVjb21pbmctZnVsbHktcmVhY3RpdmUtYW4taW4tZGVwdGgtZXhwbGFuYXRpb24tb2YtbW9ic2VydmFibGUtNTU5OTUyNjJhMjU0Iy54dmJoNnFkNzRcbiAqXG4gKiBTb3VyY2UgZm9sZGVyczpcbiAqID09PT09PT09PT09PT09PVxuICpcbiAqIC0gYXBpLyAgICAgTW9zdCBvZiB0aGUgcHVibGljIHN0YXRpYyBtZXRob2RzIGV4cG9zZWQgYnkgdGhlIG1vZHVsZSBjYW4gYmUgZm91bmQgaGVyZS5cbiAqIC0gY29yZS8gICAgSW1wbGVtZW50YXRpb24gb2YgdGhlIE1vYlggYWxnb3JpdGhtOyBhdG9tcywgZGVyaXZhdGlvbnMsIHJlYWN0aW9ucywgZGVwZW5kZW5jeSB0cmVlcywgb3B0aW1pemF0aW9ucy4gQ29vbCBzdHVmZiBjYW4gYmUgZm91bmQgaGVyZS5cbiAqIC0gdHlwZXMvICAgQWxsIHRoZSBtYWdpYyB0aGF0IGlzIG5lZWQgdG8gaGF2ZSBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cyBhbmQgdmFsdWVzIGlzIGluIHRoaXMgZm9sZGVyLiBJbmNsdWRpbmcgdGhlIG1vZGlmaWVycyBsaWtlIGBhc0ZsYXRgLlxuICogLSB1dGlscy8gICBVdGlsaXR5IHN0dWZmLlxuICpcbiAqL1xuW1wiU3ltYm9sXCIsIFwiTWFwXCIsIFwiU2V0XCJdLmZvckVhY2goZnVuY3Rpb24gKG0pIHtcbiAgdmFyIGcgPSBnZXRHbG9iYWwoKTtcbiAgaWYgKHR5cGVvZiBnW21dID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgZGllKFwiTW9iWCByZXF1aXJlcyBnbG9iYWwgJ1wiICsgbSArIFwiJyB0byBiZSBhdmFpbGFibGUgb3IgcG9seWZpbGxlZFwiKTtcbiAgfVxufSk7XG5pZiAodHlwZW9mIF9fTU9CWF9ERVZUT09MU19HTE9CQUxfSE9PS19fID09PSBcIm9iamVjdFwiKSB7XG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZHlrb2cvbW9ieC1kZXZ0b29scy9cbiAgX19NT0JYX0RFVlRPT0xTX0dMT0JBTF9IT09LX18uaW5qZWN0TW9ieCh7XG4gICAgc3B5OiBzcHksXG4gICAgZXh0cmFzOiB7XG4gICAgICBnZXREZWJ1Z05hbWU6IGdldERlYnVnTmFtZVxuICAgIH0sXG4gICAgJG1vYng6ICRtb2J4XG4gIH0pO1xufVxuXG5leHBvcnQgeyAkbW9ieCwgRmxvd0NhbmNlbGxhdGlvbkVycm9yLCBPYnNlcnZhYmxlTWFwLCBPYnNlcnZhYmxlU2V0LCBSZWFjdGlvbiwgYWxsb3dTdGF0ZUNoYW5nZXMgYXMgX2FsbG93U3RhdGVDaGFuZ2VzLCBydW5JbkFjdGlvbiBhcyBfYWxsb3dTdGF0ZUNoYW5nZXNJbnNpZGVDb21wdXRlZCwgYWxsb3dTdGF0ZVJlYWRzRW5kIGFzIF9hbGxvd1N0YXRlUmVhZHNFbmQsIGFsbG93U3RhdGVSZWFkc1N0YXJ0IGFzIF9hbGxvd1N0YXRlUmVhZHNTdGFydCwgYXV0b0FjdGlvbiBhcyBfYXV0b0FjdGlvbiwgX2VuZEFjdGlvbiwgZ2V0QWRtaW5pc3RyYXRpb24gYXMgX2dldEFkbWluaXN0cmF0aW9uLCBnZXRHbG9iYWxTdGF0ZSBhcyBfZ2V0R2xvYmFsU3RhdGUsIGludGVyY2VwdFJlYWRzIGFzIF9pbnRlcmNlcHRSZWFkcywgaXNDb21wdXRpbmdEZXJpdmF0aW9uIGFzIF9pc0NvbXB1dGluZ0Rlcml2YXRpb24sIHJlc2V0R2xvYmFsU3RhdGUgYXMgX3Jlc2V0R2xvYmFsU3RhdGUsIF9zdGFydEFjdGlvbiwgYWN0aW9uLCBhdXRvcnVuLCBjb21wYXJlciwgY29tcHV0ZWQsIGNvbmZpZ3VyZSwgY3JlYXRlQXRvbSwgYXBpRGVmaW5lUHJvcGVydHkgYXMgZGVmaW5lUHJvcGVydHksIGVudHJpZXMsIGV4dGVuZE9ic2VydmFibGUsIGZsb3csIGZsb3dSZXN1bHQsIGdldCwgZ2V0QXRvbSwgZ2V0RGVidWdOYW1lLCBnZXREZXBlbmRlbmN5VHJlZSwgZ2V0T2JzZXJ2ZXJUcmVlLCBoYXMsIGludGVyY2VwdCwgaXNBY3Rpb24sIGlzT2JzZXJ2YWJsZVZhbHVlIGFzIGlzQm94ZWRPYnNlcnZhYmxlLCBpc0NvbXB1dGVkLCBpc0NvbXB1dGVkUHJvcCwgaXNGbG93LCBpc0Zsb3dDYW5jZWxsYXRpb25FcnJvciwgaXNPYnNlcnZhYmxlLCBpc09ic2VydmFibGVBcnJheSwgaXNPYnNlcnZhYmxlTWFwLCBpc09ic2VydmFibGVPYmplY3QsIGlzT2JzZXJ2YWJsZVByb3AsIGlzT2JzZXJ2YWJsZVNldCwga2V5cywgbWFrZUF1dG9PYnNlcnZhYmxlLCBtYWtlT2JzZXJ2YWJsZSwgb2JzZXJ2YWJsZSwgb2JzZXJ2ZSwgb25CZWNvbWVPYnNlcnZlZCwgb25CZWNvbWVVbm9ic2VydmVkLCBvblJlYWN0aW9uRXJyb3IsIG92ZXJyaWRlLCBhcGlPd25LZXlzIGFzIG93bktleXMsIHJlYWN0aW9uLCByZW1vdmUsIHJ1bkluQWN0aW9uLCBzZXQsIHNweSwgdG9KUywgdHJhY2UsIHRyYW5zYWN0aW9uLCB1bnRyYWNrZWQsIHZhbHVlcywgd2hlbiB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bW9ieC5lc20uanMubWFwXG4iLCJleHBvcnQgZnVuY3Rpb24gZXJyb3IoZXJyb3IpIHtcbiAgICByZXR1cm4geyBoYXNFcnJvcjogdHJ1ZSwgZXJyb3IgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB7IGhhc0Vycm9yOiBmYWxzZSwgdmFsdWUgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlc3VsdC1tZXRhLmpzLm1hcCIsImltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGVycm9yLCB2YWx1ZSB9IGZyb20gXCIuL3Jlc3VsdC1tZXRhLmpzXCI7XG5jb25zdCBDT05URVhUX09CSkVDVF9QQVRIID0gXCJjb20ubWVuZGl4LndpZGdldHMud2ViLnNlbGVjdGFibGUuc2VsZWN0aW9uQ29udGV4dFwiO1xuZXhwb3J0IGZ1bmN0aW9uIGdldEdsb2JhbFNlbGVjdGlvbkNvbnRleHQoKSB7XG4gICAgcmV0dXJuICh3aW5kb3dbQ09OVEVYVF9PQkpFQ1RfUEFUSF0gPz89IGNyZWF0ZUNvbnRleHQodW5kZWZpbmVkKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdXNlQ3JlYXRlU2VsZWN0aW9uQ29udGV4dFZhbHVlKHNlbGVjdGlvbikge1xuICAgIHJldHVybiB1c2VNZW1vKCgpID0+IChzZWxlY3Rpb24/LnR5cGUgPT09IFwiTXVsdGlcIiA/IHNlbGVjdGlvbiA6IHVuZGVmaW5lZCksIFtzZWxlY3Rpb25dKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1c2VTZWxlY3Rpb25Db250ZXh0VmFsdWUoKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGdldEdsb2JhbFNlbGVjdGlvbkNvbnRleHQoKTtcbiAgICBjb25zdCBjb250ZXh0VmFsdWUgPSB1c2VDb250ZXh0KGNvbnRleHQpO1xuICAgIGlmIChjb250ZXh0VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gZXJyb3IobmV3IE91dE9mQ29udGV4dEVycm9yKCkpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUoY29udGV4dFZhbHVlKTtcbn1cbmNsYXNzIE91dE9mQ29udGV4dEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihcIkNvbXBvbmVudCBpcyB1c2VkIG91dCBvZiBjb250ZXh0IHByb3ZpZGVyXCIpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbnRleHQuanMubWFwIiwiaW1wb3J0IHsgbWFrZU9ic2VydmFibGUgfSBmcm9tIFwibW9ieFwiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmlmICghdXNlU3RhdGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJtb2J4LXJlYWN0LWxpdGUgcmVxdWlyZXMgUmVhY3Qgd2l0aCBIb29rcyBzdXBwb3J0XCIpO1xufVxuaWYgKCFtYWtlT2JzZXJ2YWJsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm1vYngtcmVhY3QtbGl0ZUAzIHJlcXVpcmVzIG1vYnggYXQgbGVhc3QgdmVyc2lvbiA2IHRvIGJlIGF2YWlsYWJsZVwiKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzc2VydEVudmlyb25tZW50LmpzLm1hcCIsImltcG9ydCB7IGNvbmZpZ3VyZSB9IGZyb20gXCJtb2J4XCI7XG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdE5vb3BCYXRjaChjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZXJCYXRjaGluZyhyZWFjdGlvblNjaGVkdWxlcikge1xuICAgIGlmICghcmVhY3Rpb25TY2hlZHVsZXIpIHtcbiAgICAgICAgcmVhY3Rpb25TY2hlZHVsZXIgPSBkZWZhdWx0Tm9vcEJhdGNoO1xuICAgICAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbTW9iWF0gRmFpbGVkIHRvIGdldCB1bnN0YWJsZV9iYXRjaGVkIHVwZGF0ZXMgZnJvbSByZWFjdC1kb20gLyByZWFjdC1uYXRpdmVcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uZmlndXJlKHsgcmVhY3Rpb25TY2hlZHVsZXI6IHJlYWN0aW9uU2NoZWR1bGVyIH0pO1xufVxuZXhwb3J0IHZhciBpc09ic2VydmVyQmF0Y2hlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIltNb2JYXSBEZXByZWNhdGVkXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZlckJhdGNoaW5nLmpzLm1hcCIsImltcG9ydCB7IGdldERlcGVuZGVuY3lUcmVlIH0gZnJvbSBcIm1vYnhcIjtcbmV4cG9ydCBmdW5jdGlvbiBwcmludERlYnVnVmFsdWUodikge1xuICAgIHJldHVybiBnZXREZXBlbmRlbmN5VHJlZSh2KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByaW50RGVidWdWYWx1ZS5qcy5tYXAiLCJleHBvcnQgdmFyIFJFR0lTVFJZX0ZJTkFMSVpFX0FGVEVSID0gMTAwMDA7XG5leHBvcnQgdmFyIFJFR0lTVFJZX1NXRUVQX0lOVEVSVkFMID0gMTAwMDA7XG52YXIgVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeShmaW5hbGl6ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJmaW5hbGl6ZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogZmluYWxpemVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInJlZ2lzdHJhdGlvbnNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IG5ldyBNYXAoKVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic3dlZXBUaW1lb3V0XCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEJvdW5kIHNvIGl0IGNhbiBiZSB1c2VkIGRpcmVjdGx5IGFzIHNldFRpbWVvdXQgY2FsbGJhY2suXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInN3ZWVwXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAobWF4QWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1heEFnZSA9PT0gdm9pZCAwKSB7IG1heEFnZSA9IFJFR0lTVFJZX0ZJTkFMSVpFX0FGVEVSOyB9XG4gICAgICAgICAgICAgICAgLy8gY2FuY2VsIHRpbWVvdXQgc28gd2UgY2FuIGZvcmNlIHN3ZWVwIGFueXRpbWVcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMuc3dlZXBUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zd2VlcFRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVnaXN0cmF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChyZWdpc3RyYXRpb24sIHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub3cgLSByZWdpc3RyYXRpb24ucmVnaXN0ZXJlZEF0ID49IG1heEFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluYWxpemUocmVnaXN0cmF0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlZ2lzdHJhdGlvbnMuZGVsZXRlKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5yZWdpc3RyYXRpb25zLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNjaGVkdWxlU3dlZXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBCb3VuZCBzbyBpdCBjYW4gYmUgZXhwb3J0ZWQgZGlyZWN0bHkgYXMgY2xlYXJUaW1lcnMgdGVzdCB1dGlsaXR5LlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJmaW5hbGl6ZUFsbEltbWVkaWF0ZWx5XCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc3dlZXAoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBUb2tlbiBpcyBhY3R1YWxseSByZXF1aXJlZCB3aXRoIHRoaXMgaW1wbFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnkucHJvdG90eXBlLCBcInJlZ2lzdGVyXCIsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAodGFyZ2V0LCB2YWx1ZSwgdG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9ucy5zZXQodG9rZW4sIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJlZEF0OiBEYXRlLm5vdygpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVTd2VlcCgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeS5wcm90b3R5cGUsIFwidW5yZWdpc3RlclwiLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbnMuZGVsZXRlKHRva2VuKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnkucHJvdG90eXBlLCBcInNjaGVkdWxlU3dlZXBcIiwge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN3ZWVwVGltZW91dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zd2VlcFRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuc3dlZXAsIFJFR0lTVFJZX1NXRUVQX0lOVEVSVkFMKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnk7XG59KCkpO1xuZXhwb3J0IHsgVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5IH07XG5leHBvcnQgdmFyIFVuaXZlcnNhbEZpbmFsaXphdGlvblJlZ2lzdHJ5ID0gdHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5ICE9PSBcInVuZGVmaW5lZFwiXG4gICAgPyBGaW5hbGl6YXRpb25SZWdpc3RyeVxuICAgIDogVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VW5pdmVyc2FsRmluYWxpemF0aW9uUmVnaXN0cnkuanMubWFwIiwiaW1wb3J0IHsgVW5pdmVyc2FsRmluYWxpemF0aW9uUmVnaXN0cnkgfSBmcm9tIFwiLi9Vbml2ZXJzYWxGaW5hbGl6YXRpb25SZWdpc3RyeVwiO1xuZXhwb3J0IHZhciBvYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5ID0gbmV3IFVuaXZlcnNhbEZpbmFsaXphdGlvblJlZ2lzdHJ5KGZ1bmN0aW9uIChhZG0pIHtcbiAgICB2YXIgX2E7XG4gICAgKF9hID0gYWRtLnJlYWN0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGlzcG9zZSgpO1xuICAgIGFkbS5yZWFjdGlvbiA9IG51bGw7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkuanMubWFwIiwiaW1wb3J0IHsgUmVhY3Rpb24gfSBmcm9tIFwibW9ieFwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcHJpbnREZWJ1Z1ZhbHVlIH0gZnJvbSBcIi4vdXRpbHMvcHJpbnREZWJ1Z1ZhbHVlXCI7XG5pbXBvcnQgeyBpc1VzaW5nU3RhdGljUmVuZGVyaW5nIH0gZnJvbSBcIi4vc3RhdGljUmVuZGVyaW5nXCI7XG5pbXBvcnQgeyBvYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5IH0gZnJvbSBcIi4vdXRpbHMvb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeVwiO1xuZnVuY3Rpb24gY3JlYXRlUmVhY3Rpb24oYWRtKSB7XG4gICAgYWRtLnJlYWN0aW9uID0gbmV3IFJlYWN0aW9uKFwib2JzZXJ2ZXJcIi5jb25jYXQoYWRtLm5hbWUpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgYWRtLnN0YXRlVmVyc2lvbiA9IFN5bWJvbCgpO1xuICAgICAgICAvLyBvblN0b3JlQ2hhbmdlIHdvbid0IGJlIGF2YWlsYWJsZSB1bnRpbCB0aGUgY29tcG9uZW50IFwibW91bnRzXCIuXG4gICAgICAgIC8vIElmIHN0YXRlIGNoYW5nZXMgaW4gYmV0d2VlbiBpbml0aWFsIHJlbmRlciBhbmQgbW91bnQsXG4gICAgICAgIC8vIGB1c2VTeW5jRXh0ZXJuYWxTdG9yZWAgc2hvdWxkIGhhbmRsZSB0aGF0IGJ5IGNoZWNraW5nIHRoZSBzdGF0ZSB2ZXJzaW9uIGFuZCBpc3N1aW5nIHVwZGF0ZS5cbiAgICAgICAgKF9hID0gYWRtLm9uU3RvcmVDaGFuZ2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKGFkbSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdXNlT2JzZXJ2ZXIocmVuZGVyLCBiYXNlQ29tcG9uZW50TmFtZSkge1xuICAgIGlmIChiYXNlQ29tcG9uZW50TmFtZSA9PT0gdm9pZCAwKSB7IGJhc2VDb21wb25lbnROYW1lID0gXCJvYnNlcnZlZFwiOyB9XG4gICAgaWYgKGlzVXNpbmdTdGF0aWNSZW5kZXJpbmcoKSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyKCk7XG4gICAgfVxuICAgIHZhciBhZG1SZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gICAgaWYgKCFhZG1SZWYuY3VycmVudCkge1xuICAgICAgICAvLyBGaXJzdCByZW5kZXJcbiAgICAgICAgdmFyIGFkbV8xID0ge1xuICAgICAgICAgICAgcmVhY3Rpb246IG51bGwsXG4gICAgICAgICAgICBvblN0b3JlQ2hhbmdlOiBudWxsLFxuICAgICAgICAgICAgc3RhdGVWZXJzaW9uOiBTeW1ib2woKSxcbiAgICAgICAgICAgIG5hbWU6IGJhc2VDb21wb25lbnROYW1lLFxuICAgICAgICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbiAob25TdG9yZUNoYW5nZSkge1xuICAgICAgICAgICAgICAgIC8vIERvIE5PVCBhY2Nlc3MgYWRtUmVmIGhlcmUhXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeS51bnJlZ2lzdGVyKGFkbV8xKTtcbiAgICAgICAgICAgICAgICBhZG1fMS5vblN0b3JlQ2hhbmdlID0gb25TdG9yZUNoYW5nZTtcbiAgICAgICAgICAgICAgICBpZiAoIWFkbV8xLnJlYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlJ3ZlIGxvc3Qgb3VyIHJlYWN0aW9uIGFuZCB0aGVyZWZvcmUgYWxsIHN1YnNjcmlwdGlvbnMsIG9jY3VycyB3aGVuOlxuICAgICAgICAgICAgICAgICAgICAvLyAxLiBUaW1lciBiYXNlZCBmaW5hbGl6YXRpb24gcmVnaXN0cnkgZGlzcG9zZWQgcmVhY3Rpb24gYmVmb3JlIGNvbXBvbmVudCBtb3VudGVkLlxuICAgICAgICAgICAgICAgICAgICAvLyAyLiBSZWFjdCBcInJlLW1vdW50c1wiIHNhbWUgY29tcG9uZW50IHdpdGhvdXQgY2FsbGluZyByZW5kZXIgaW4gYmV0d2VlbiAodHlwaWNhbGx5IDxTdHJpY3RNb2RlPikuXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVjcmVhdGUgcmVhY3Rpb24gYW5kIHNjaGVkdWxlIHJlLXJlbmRlciB0byByZWNyZWF0ZSBzdWJzY3JpcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAvLyBldmVuIGlmIHN0YXRlIGRpZCBub3QgY2hhbmdlLlxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVSZWFjdGlvbihhZG1fMSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGBvblN0b3JlQ2hhbmdlYCB3b24ndCBmb3JjZSB1cGRhdGUgaWYgc3Vic2VxdWVudCBgZ2V0U25hcHNob3RgIHJldHVybnMgc2FtZSB2YWx1ZS5cbiAgICAgICAgICAgICAgICAgICAgLy8gU28gd2UgbWFrZSBzdXJlIHRoYXQgaXMgbm90IHRoZSBjYXNlXG4gICAgICAgICAgICAgICAgICAgIGFkbV8xLnN0YXRlVmVyc2lvbiA9IFN5bWJvbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgICAgIC8vIERvIE5PVCBhY2Nlc3MgYWRtUmVmIGhlcmUhXG4gICAgICAgICAgICAgICAgICAgIGFkbV8xLm9uU3RvcmVDaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBhZG1fMS5yZWFjdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYWRtXzEucmVhY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U25hcHNob3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBEbyBOT1QgYWNjZXNzIGFkbVJlZiBoZXJlIVxuICAgICAgICAgICAgICAgIHJldHVybiBhZG1fMS5zdGF0ZVZlcnNpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGFkbVJlZi5jdXJyZW50ID0gYWRtXzE7XG4gICAgfVxuICAgIHZhciBhZG0gPSBhZG1SZWYuY3VycmVudDtcbiAgICBpZiAoIWFkbS5yZWFjdGlvbikge1xuICAgICAgICAvLyBGaXJzdCByZW5kZXIgb3IgcmVhY3Rpb24gd2FzIGRpc3Bvc2VkIGJ5IHJlZ2lzdHJ5IGJlZm9yZSBzdWJzY3JpYmVcbiAgICAgICAgY3JlYXRlUmVhY3Rpb24oYWRtKTtcbiAgICAgICAgLy8gU3RyaWN0TW9kZS9Db25jdXJyZW50TW9kZS9TdXNwZW5zZSBtYXkgbWVhbiB0aGF0IG91ciBjb21wb25lbnQgaXNcbiAgICAgICAgLy8gcmVuZGVyZWQgYW5kIGFiYW5kb25lZCBtdWx0aXBsZSB0aW1lcywgc28gd2UgbmVlZCB0byB0cmFjayBsZWFrZWRcbiAgICAgICAgLy8gUmVhY3Rpb25zLlxuICAgICAgICBvYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5LnJlZ2lzdGVyKGFkbVJlZiwgYWRtLCBhZG0pO1xuICAgIH1cbiAgICBSZWFjdC51c2VEZWJ1Z1ZhbHVlKGFkbS5yZWFjdGlvbiwgcHJpbnREZWJ1Z1ZhbHVlKTtcbiAgICBSZWFjdC51c2VTeW5jRXh0ZXJuYWxTdG9yZShcbiAgICAvLyBCb3RoIG9mIHRoZXNlIG11c3QgYmUgc3RhYmxlLCBvdGhlcndpc2UgaXQgd291bGQga2VlcCByZXN1YnNjcmliaW5nIGV2ZXJ5IHJlbmRlci5cbiAgICBhZG0uc3Vic2NyaWJlLCBhZG0uZ2V0U25hcHNob3QsIGFkbS5nZXRTbmFwc2hvdCk7XG4gICAgLy8gcmVuZGVyIHRoZSBvcmlnaW5hbCBjb21wb25lbnQsIGJ1dCBoYXZlIHRoZVxuICAgIC8vIHJlYWN0aW9uIHRyYWNrIHRoZSBvYnNlcnZhYmxlcywgc28gdGhhdCByZW5kZXJpbmdcbiAgICAvLyBjYW4gYmUgaW52YWxpZGF0ZWQgKHNlZSBhYm92ZSkgb25jZSBhIGRlcGVuZGVuY3kgY2hhbmdlc1xuICAgIHZhciByZW5kZXJSZXN1bHQ7XG4gICAgdmFyIGV4Y2VwdGlvbjtcbiAgICBhZG0ucmVhY3Rpb24udHJhY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVuZGVyUmVzdWx0ID0gcmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGV4Y2VwdGlvbiA9IGU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZXhjZXB0aW9uKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjsgLy8gcmUtdGhyb3cgYW55IGV4Y2VwdGlvbnMgY2F1Z2h0IGR1cmluZyByZW5kZXJpbmdcbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlclJlc3VsdDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZU9ic2VydmVyLmpzLm1hcCIsInZhciBfYSwgX2I7XG5pbXBvcnQgeyBmb3J3YXJkUmVmLCBtZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpc1VzaW5nU3RhdGljUmVuZGVyaW5nIH0gZnJvbSBcIi4vc3RhdGljUmVuZGVyaW5nXCI7XG5pbXBvcnQgeyB1c2VPYnNlcnZlciB9IGZyb20gXCIuL3VzZU9ic2VydmVyXCI7XG52YXIgd2Fybk9ic2VydmVyT3B0aW9uc0RlcHJlY2F0ZWQgPSB0cnVlO1xudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuZm9yO1xudmFyIGlzRnVuY3Rpb25OYW1lQ29uZmlndXJhYmxlID0gKF9iID0gKF9hID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihmdW5jdGlvbiAoKSB7IH0sIFwibmFtZVwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbmZpZ3VyYWJsZSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogZmFsc2U7XG4vLyBVc2luZyByZWFjdC1pcyBoYWQgc29tZSBpc3N1ZXMgKGFuZCBvcGVyYXRlcyBvbiBlbGVtZW50cywgbm90IG9uIHR5cGVzKSwgc2VlICM2MDggLyAjNjA5XG52YXIgUmVhY3RGb3J3YXJkUmVmU3ltYm9sID0gaGFzU3ltYm9sXG4gICAgPyBTeW1ib2wuZm9yKFwicmVhY3QuZm9yd2FyZF9yZWZcIilcbiAgICA6IHR5cGVvZiBmb3J3YXJkUmVmID09PSBcImZ1bmN0aW9uXCIgJiYgZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIG51bGw7IH0pW1wiJCR0eXBlb2ZcIl07XG52YXIgUmVhY3RNZW1vU3ltYm9sID0gaGFzU3ltYm9sXG4gICAgPyBTeW1ib2wuZm9yKFwicmVhY3QubWVtb1wiKVxuICAgIDogdHlwZW9mIG1lbW8gPT09IFwiZnVuY3Rpb25cIiAmJiBtZW1vKGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gbnVsbDsgfSlbXCIkJHR5cGVvZlwiXTtcbi8vIG4uYi4gYmFzZSBjYXNlIGlzIG5vdCB1c2VkIGZvciBhY3R1YWwgdHlwaW5ncyBvciBleHBvcnRlZCBpbiB0aGUgdHlwaW5nIGZpbGVzXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZXIoYmFzZUNvbXBvbmVudCwgXG4vLyBUT0RPIHJlbW92ZSBpbiBuZXh0IG1ham9yXG5vcHRpb25zKSB7XG4gICAgdmFyIF9hO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgd2Fybk9ic2VydmVyT3B0aW9uc0RlcHJlY2F0ZWQgJiYgb3B0aW9ucykge1xuICAgICAgICB3YXJuT2JzZXJ2ZXJPcHRpb25zRGVwcmVjYXRlZCA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbbW9ieC1yZWFjdC1saXRlXSBgb2JzZXJ2ZXIoZm4sIHsgZm9yd2FyZFJlZjogdHJ1ZSB9KWAgaXMgZGVwcmVjYXRlZCwgdXNlIGBvYnNlcnZlcihSZWFjdC5mb3J3YXJkUmVmKGZuKSlgXCIpO1xuICAgIH1cbiAgICBpZiAoUmVhY3RNZW1vU3ltYm9sICYmIGJhc2VDb21wb25lbnRbXCIkJHR5cGVvZlwiXSA9PT0gUmVhY3RNZW1vU3ltYm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4LXJlYWN0LWxpdGVdIFlvdSBhcmUgdHJ5aW5nIHRvIHVzZSBgb2JzZXJ2ZXJgIG9uIGEgZnVuY3Rpb24gY29tcG9uZW50IHdyYXBwZWQgaW4gZWl0aGVyIGFub3RoZXIgYG9ic2VydmVyYCBvciBgUmVhY3QubWVtb2AuIFRoZSBvYnNlcnZlciBhbHJlYWR5IGFwcGxpZXMgJ1JlYWN0Lm1lbW8nIGZvciB5b3UuXCIpO1xuICAgIH1cbiAgICAvLyBUaGUgd29ya2luZyBvZiBvYnNlcnZlciBpcyBleHBsYWluZWQgc3RlcCBieSBzdGVwIGluIHRoaXMgdGFsazogaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1jUEY0aUJlZG9GMCZmZWF0dXJlPXlvdXR1LmJlJnQ9MTMwN1xuICAgIGlmIChpc1VzaW5nU3RhdGljUmVuZGVyaW5nKCkpIHtcbiAgICAgICAgcmV0dXJuIGJhc2VDb21wb25lbnQ7XG4gICAgfVxuICAgIHZhciB1c2VGb3J3YXJkUmVmID0gKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmZvcndhcmRSZWYpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGZhbHNlO1xuICAgIHZhciByZW5kZXIgPSBiYXNlQ29tcG9uZW50O1xuICAgIHZhciBiYXNlQ29tcG9uZW50TmFtZSA9IGJhc2VDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgYmFzZUNvbXBvbmVudC5uYW1lO1xuICAgIC8vIElmIGFscmVhZHkgd3JhcHBlZCB3aXRoIGZvcndhcmRSZWYsIHVud3JhcCxcbiAgICAvLyBzbyB3ZSBjYW4gcGF0Y2ggcmVuZGVyIGFuZCBhcHBseSBtZW1vXG4gICAgaWYgKFJlYWN0Rm9yd2FyZFJlZlN5bWJvbCAmJiBiYXNlQ29tcG9uZW50W1wiJCR0eXBlb2ZcIl0gPT09IFJlYWN0Rm9yd2FyZFJlZlN5bWJvbCkge1xuICAgICAgICB1c2VGb3J3YXJkUmVmID0gdHJ1ZTtcbiAgICAgICAgcmVuZGVyID0gYmFzZUNvbXBvbmVudFtcInJlbmRlclwiXTtcbiAgICAgICAgaWYgKHR5cGVvZiByZW5kZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYngtcmVhY3QtbGl0ZV0gYHJlbmRlcmAgcHJvcGVydHkgb2YgRm9yd2FyZFJlZiB3YXMgbm90IGEgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIG9ic2VydmVyQ29tcG9uZW50ID0gZnVuY3Rpb24gKHByb3BzLCByZWYpIHtcbiAgICAgICAgcmV0dXJuIHVzZU9ic2VydmVyKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlbmRlcihwcm9wcywgcmVmKTsgfSwgYmFzZUNvbXBvbmVudE5hbWUpO1xuICAgIH07XG4gICAgb2JzZXJ2ZXJDb21wb25lbnQuZGlzcGxheU5hbWUgPSBiYXNlQ29tcG9uZW50LmRpc3BsYXlOYW1lO1xuICAgIGlmIChpc0Z1bmN0aW9uTmFtZUNvbmZpZ3VyYWJsZSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JzZXJ2ZXJDb21wb25lbnQsIFwibmFtZVwiLCB7XG4gICAgICAgICAgICB2YWx1ZTogYmFzZUNvbXBvbmVudC5uYW1lLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFN1cHBvcnQgbGVnYWN5IGNvbnRleHQ6IGBjb250ZXh0VHlwZXNgIG11c3QgYmUgYXBwbGllZCBiZWZvcmUgYG1lbW9gXG4gICAgaWYgKGJhc2VDb21wb25lbnQuY29udGV4dFR5cGVzKSB7XG4gICAgICAgIDtcbiAgICAgICAgb2JzZXJ2ZXJDb21wb25lbnQuY29udGV4dFR5cGVzID0gYmFzZUNvbXBvbmVudC5jb250ZXh0VHlwZXM7XG4gICAgfVxuICAgIGlmICh1c2VGb3J3YXJkUmVmKSB7XG4gICAgICAgIC8vIGBmb3J3YXJkUmVmYCBtdXN0IGJlIGFwcGxpZWQgcHJpb3IgYG1lbW9gXG4gICAgICAgIC8vIGBmb3J3YXJkUmVmKG9ic2VydmVyKGNtcCkpYCB0aHJvd3M6XG4gICAgICAgIC8vIFwiZm9yd2FyZFJlZiByZXF1aXJlcyBhIHJlbmRlciBmdW5jdGlvbiBidXQgcmVjZWl2ZWQgYSBgbWVtb2AgY29tcG9uZW50LiBJbnN0ZWFkIG9mIGZvcndhcmRSZWYobWVtbyguLi4pKSwgdXNlIG1lbW8oZm9yd2FyZFJlZiguLi4pKVwiXG4gICAgICAgIG9ic2VydmVyQ29tcG9uZW50ID0gZm9yd2FyZFJlZihvYnNlcnZlckNvbXBvbmVudCk7XG4gICAgfVxuICAgIC8vIG1lbW87IHdlIGFyZSBub3QgaW50ZXJlc3RlZCBpbiBkZWVwIHVwZGF0ZXNcbiAgICAvLyBpbiBwcm9wczsgd2UgYXNzdW1lIHRoYXQgaWYgZGVlcCBvYmplY3RzIGFyZSBjaGFuZ2VkLFxuICAgIC8vIHRoaXMgaXMgaW4gb2JzZXJ2YWJsZXMsIHdoaWNoIHdvdWxkIGhhdmUgYmVlbiB0cmFja2VkIGFueXdheVxuICAgIG9ic2VydmVyQ29tcG9uZW50ID0gbWVtbyhvYnNlcnZlckNvbXBvbmVudCk7XG4gICAgY29weVN0YXRpY1Byb3BlcnRpZXMoYmFzZUNvbXBvbmVudCwgb2JzZXJ2ZXJDb21wb25lbnQpO1xuICAgIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9ic2VydmVyQ29tcG9uZW50LCBcImNvbnRleHRUeXBlc1wiLCB7XG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4LXJlYWN0LWxpdGVdIGBcIi5jb25jYXQodGhpcy5kaXNwbGF5TmFtZSB8fCAoKF9hID0gdGhpcy50eXBlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGlzcGxheU5hbWUpIHx8ICgoX2IgPSB0aGlzLnR5cGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5uYW1lKSB8fCBcIkNvbXBvbmVudFwiLCBcIi5jb250ZXh0VHlwZXNgIG11c3QgYmUgc2V0IGJlZm9yZSBhcHBseWluZyBgb2JzZXJ2ZXJgLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gb2JzZXJ2ZXJDb21wb25lbnQ7XG59XG4vLyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vbXJpZGd3YXkvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MvYmxvYi9tYXN0ZXIvc3JjL2luZGV4LmpzXG52YXIgaG9pc3RCbGFja0xpc3QgPSB7XG4gICAgJCR0eXBlb2Y6IHRydWUsXG4gICAgcmVuZGVyOiB0cnVlLFxuICAgIGNvbXBhcmU6IHRydWUsXG4gICAgdHlwZTogdHJ1ZSxcbiAgICAvLyBEb24ndCByZWRlZmluZSBgZGlzcGxheU5hbWVgLFxuICAgIC8vIGl0J3MgZGVmaW5lZCBhcyBnZXR0ZXItc2V0dGVyIHBhaXIgb24gYG1lbW9gIChzZWUgIzMxOTIpLlxuICAgIGRpc3BsYXlOYW1lOiB0cnVlXG59O1xuZnVuY3Rpb24gY29weVN0YXRpY1Byb3BlcnRpZXMoYmFzZSwgdGFyZ2V0KSB7XG4gICAgT2JqZWN0LmtleXMoYmFzZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICghaG9pc3RCbGFja0xpc3Rba2V5XSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIGtleSkpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZlci5qcy5tYXAiLCJ2YXIgX2E7XG5pbXBvcnQgXCIuL3V0aWxzL2Fzc2VydEVudmlyb25tZW50XCI7XG5pbXBvcnQgeyB1bnN0YWJsZV9iYXRjaGVkVXBkYXRlcyBhcyBiYXRjaCB9IGZyb20gXCIuL3V0aWxzL3JlYWN0QmF0Y2hlZFVwZGF0ZXNcIjtcbmltcG9ydCB7IG9ic2VydmVyQmF0Y2hpbmcgfSBmcm9tIFwiLi91dGlscy9vYnNlcnZlckJhdGNoaW5nXCI7XG5pbXBvcnQgeyB1c2VEZXByZWNhdGVkIH0gZnJvbSBcIi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IHVzZU9ic2VydmVyIGFzIHVzZU9ic2VydmVyT3JpZ2luYWwgfSBmcm9tIFwiLi91c2VPYnNlcnZlclwiO1xuaW1wb3J0IHsgZW5hYmxlU3RhdGljUmVuZGVyaW5nIH0gZnJvbSBcIi4vc3RhdGljUmVuZGVyaW5nXCI7XG5pbXBvcnQgeyBvYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5IH0gZnJvbSBcIi4vdXRpbHMvb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeVwiO1xub2JzZXJ2ZXJCYXRjaGluZyhiYXRjaCk7XG5leHBvcnQgeyBpc1VzaW5nU3RhdGljUmVuZGVyaW5nLCBlbmFibGVTdGF0aWNSZW5kZXJpbmcgfSBmcm9tIFwiLi9zdGF0aWNSZW5kZXJpbmdcIjtcbmV4cG9ydCB7IG9ic2VydmVyIH0gZnJvbSBcIi4vb2JzZXJ2ZXJcIjtcbmV4cG9ydCB7IE9ic2VydmVyIH0gZnJvbSBcIi4vT2JzZXJ2ZXJDb21wb25lbnRcIjtcbmV4cG9ydCB7IHVzZUxvY2FsT2JzZXJ2YWJsZSB9IGZyb20gXCIuL3VzZUxvY2FsT2JzZXJ2YWJsZVwiO1xuZXhwb3J0IHsgdXNlTG9jYWxTdG9yZSB9IGZyb20gXCIuL3VzZUxvY2FsU3RvcmVcIjtcbmV4cG9ydCB7IHVzZUFzT2JzZXJ2YWJsZVNvdXJjZSB9IGZyb20gXCIuL3VzZUFzT2JzZXJ2YWJsZVNvdXJjZVwiO1xuZXhwb3J0IHsgb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeSBhcyBfb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeSB9O1xuZXhwb3J0IHZhciBjbGVhclRpbWVycyA9IChfYSA9IG9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnlbXCJmaW5hbGl6ZUFsbEltbWVkaWF0ZWx5XCJdKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAoZnVuY3Rpb24gKCkgeyB9KTtcbmV4cG9ydCBmdW5jdGlvbiB1c2VPYnNlcnZlcihmbiwgYmFzZUNvbXBvbmVudE5hbWUpIHtcbiAgICBpZiAoYmFzZUNvbXBvbmVudE5hbWUgPT09IHZvaWQgMCkgeyBiYXNlQ29tcG9uZW50TmFtZSA9IFwib2JzZXJ2ZWRcIjsgfVxuICAgIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIHtcbiAgICAgICAgdXNlRGVwcmVjYXRlZChcIlttb2J4LXJlYWN0LWxpdGVdICd1c2VPYnNlcnZlcihmbiknIGlzIGRlcHJlY2F0ZWQuIFVzZSBgPE9ic2VydmVyPntmbn08L09ic2VydmVyPmAgaW5zdGVhZCwgb3Igd3JhcCB0aGUgZW50aXJlIGNvbXBvbmVudCBpbiBgb2JzZXJ2ZXJgLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHVzZU9ic2VydmVyT3JpZ2luYWwoZm4sIGJhc2VDb21wb25lbnROYW1lKTtcbn1cbmV4cG9ydCB7IGlzT2JzZXJ2ZXJCYXRjaGVkLCBvYnNlcnZlckJhdGNoaW5nIH0gZnJvbSBcIi4vdXRpbHMvb2JzZXJ2ZXJCYXRjaGluZ1wiO1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVN0YXRpY1JlbmRlcmluZyhlbmFibGUpIHtcbiAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlttb2J4LXJlYWN0LWxpdGVdICd1c2VTdGF0aWNSZW5kZXJpbmcnIGlzIGRlcHJlY2F0ZWQsIHVzZSAnZW5hYmxlU3RhdGljUmVuZGVyaW5nJyBpbnN0ZWFkXCIpO1xuICAgIH1cbiAgICBlbmFibGVTdGF0aWNSZW5kZXJpbmcoZW5hYmxlKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImltcG9ydCB7IGpzeCBhcyBfanN4IH0gZnJvbSBcInJlYWN0L2pzeC1ydW50aW1lXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmV4cG9ydCBmdW5jdGlvbiBUaHJlZVN0YXRlQ2hlY2tCb3goeyB2YWx1ZSwgY2xhc3NOYW1lLCAuLi5wcm9wcyB9KSB7XG4gICAgY29uc3QgY2hlY2tib3hSZWYgPSB1c2VSZWYobnVsbCk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKCFjaGVja2JveFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09PSBcImFsbFwiIHx8IHZhbHVlID09PSBcIm5vbmVcIikge1xuICAgICAgICAgICAgY2hlY2tib3hSZWYuY3VycmVudC5pbmRldGVybWluYXRlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmFsdWUgPT09IFwic29tZVwiKSB7XG4gICAgICAgICAgICBjaGVja2JveFJlZi5jdXJyZW50LmluZGV0ZXJtaW5hdGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfSwgW3ZhbHVlXSk7XG4gICAgcmV0dXJuIChfanN4KFwiaW5wdXRcIiwgeyAuLi5wcm9wcywgdHlwZTogXCJjaGVja2JveFwiLCBjbGFzc05hbWU6IGNsYXNzTmFtZXMoXCJ0aHJlZS1zdGF0ZS1jaGVja2JveFwiLCBjbGFzc05hbWUpLCByZWY6IGNoZWNrYm94UmVmLCBjaGVja2VkOiB2YWx1ZSAhPT0gXCJub25lXCIgfSkpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGhyZWVTdGF0ZUNoZWNrQm94LmpzLm1hcCIsImltcG9ydCB7IFRocmVlU3RhdGVDaGVja0JveCB9IGZyb20gXCJAbWVuZGl4L3dpZGdldC1wbHVnaW4tY29tcG9uZW50LWtpdC9UaHJlZVN0YXRlQ2hlY2tCb3hcIjtcbmltcG9ydCB7IENTU1Byb3BlcnRpZXMsIFJlYWN0RWxlbWVudCwgUmVhY3ROb2RlLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gICAgdHlwZTogXCJjaGVja2JveFwiIHwgXCJjdXN0b21cIjtcbiAgICBzdGF0dXM6IFwiYWxsXCIgfCBcInNvbWVcIiB8IFwibm9uZVwiO1xuICAgIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xuICAgIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG4gICAgY2xhc3NOYW1lOiBzdHJpbmc7XG4gICAgY3NzU3R5bGVzPzogQ1NTUHJvcGVydGllcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNlbGVjdGlvbkhlbHBlckNvbXBvbmVudChwcm9wczogUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIC8vIFRPRE86IHJlcGxhY2Ugd2l0aCB1c2VJZFxuICAgIGNvbnN0IGlkID0gdXNlTWVtbygoKSA9PiB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9wdXJpdHlcbiAgICAgICAgcmV0dXJuIERhdGUubm93KCkudG9TdHJpbmcoKTtcbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHdpZGdldC1zZWxlY3Rpb24taGVscGVyICR7cHJvcHMuY2xhc3NOYW1lfWB9IHN0eWxlPXtwcm9wcy5jc3NTdHlsZXN9PlxuICAgICAgICAgICAge3Byb3BzLnR5cGUgPT09IFwiY3VzdG9tXCIgPyAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzZWxlY3Rpb24taGVscGVyLWN1c3RvbVwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3Byb3BzLm9uQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiB8fCBlLmtleSA9PT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHMub25DbGljaz8uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VsZWN0aW9uLWhlbHBlci1jaGVja2JveCBteC1jaGVja2JveCBmb3JtLWdyb3VwIGxhYmVsLWFmdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxUaHJlZVN0YXRlQ2hlY2tCb3ggaWQ9e2lkfSB2YWx1ZT17cHJvcHMuc3RhdHVzfSBvbkNoYW5nZT17cHJvcHMub25DbGlja30gLz5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2lkfSBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIiwiaW1wb3J0IHsgQWxlcnQgfSBmcm9tIFwiQG1lbmRpeC93aWRnZXQtcGx1Z2luLWNvbXBvbmVudC1raXQvQWxlcnRcIjtcbmltcG9ydCB7IHVzZVNlbGVjdGlvbkNvbnRleHRWYWx1ZSB9IGZyb20gXCJAbWVuZGl4L3dpZGdldC1wbHVnaW4tZ3JpZC9zZWxlY3Rpb25cIjtcbmltcG9ydCB7IG9ic2VydmVyIH0gZnJvbSBcIm1vYngtcmVhY3QtbGl0ZVwiO1xuaW1wb3J0IHsgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBTZWxlY3Rpb25IZWxwZXJDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi90eXBpbmdzL1NlbGVjdGlvbkhlbHBlclByb3BzXCI7XG5pbXBvcnQgeyBTZWxlY3Rpb25IZWxwZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL1NlbGVjdGlvbkhlbHBlckNvbXBvbmVudFwiO1xuXG5jb25zdCBTZWxlY3Rpb25IZWxwZXIgPSBvYnNlcnZlcihmdW5jdGlvbiBTZWxlY3Rpb25IZWxwZXIocHJvcHM6IFNlbGVjdGlvbkhlbHBlckNvbnRhaW5lclByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBjb250ZXh0VmFsdWUgPSB1c2VTZWxlY3Rpb25Db250ZXh0VmFsdWUoKTtcblxuICAgIGlmIChjb250ZXh0VmFsdWUuaGFzRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxBbGVydCBib290c3RyYXBTdHlsZT1cImRhbmdlclwiPlxuICAgICAgICAgICAgICAgIFRoZSBTZWxlY3Rpb24gSGVscGVyIHdpZGdldCBzaG91bGQgYmUgcGxhY2VkIHdpdGhpbiB0aGUgaGVhZGVyIHNlY3Rpb24gb2YgdGhlIERhdGEgR3JpZCAyIG9yIHRoZSBHYWxsZXJ5XG4gICAgICAgICAgICAgICAgd2lkZ2V0IHdpdGggbXVsdGktc2VsZWN0aW9uIGVuYWJsZWQuXG4gICAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IGNvbnRleHRWYWx1ZS52YWx1ZTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxTZWxlY3Rpb25IZWxwZXJDb21wb25lbnRcbiAgICAgICAgICAgIHR5cGU9e3Byb3BzLnJlbmRlclN0eWxlfVxuICAgICAgICAgICAgc3RhdHVzPXtzZWxlY3Rpb24uc2VsZWN0aW9uU3RhdHVzfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0aW9uLnRvZ2dsZVBhZ2VTZWxlY3Rpb24oKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17cHJvcHMuY2xhc3N9XG4gICAgICAgICAgICBjc3NTdHlsZXM9e3Byb3BzLnN0eWxlfVxuICAgICAgICA+XG4gICAgICAgICAgICB7c2VsZWN0aW9uLnNlbGVjdGlvblN0YXR1cyA9PT0gXCJhbGxcIiAmJiBwcm9wcy5jdXN0b21BbGxTZWxlY3RlZH1cbiAgICAgICAgICAgIHtzZWxlY3Rpb24uc2VsZWN0aW9uU3RhdHVzID09PSBcInNvbWVcIiAmJiBwcm9wcy5jdXN0b21Tb21lU2VsZWN0ZWR9XG4gICAgICAgICAgICB7c2VsZWN0aW9uLnNlbGVjdGlvblN0YXR1cyA9PT0gXCJub25lXCIgJiYgcHJvcHMuY3VzdG9tTm9uZVNlbGVjdGVkfVxuICAgICAgICAgICAge3Byb3BzLmNoZWNrYm94Q2FwdGlvbj8udmFsdWUgPz8gXCJcIn1cbiAgICAgICAgPC9TZWxlY3Rpb25IZWxwZXJDb21wb25lbnQ+XG4gICAgKTtcbn0pO1xuXG5leHBvcnQgeyBTZWxlY3Rpb25IZWxwZXIgfTtcbiJdLCJuYW1lcyI6WyJoYXNPd24iLCJoYXNPd25Qcm9wZXJ0eSIsImNsYXNzTmFtZXMiLCJjbGFzc2VzIiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsImFyZyIsImFwcGVuZENsYXNzIiwicGFyc2VWYWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsImFwcGx5IiwidG9TdHJpbmciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJpbmNsdWRlcyIsImtleSIsImNhbGwiLCJ2YWx1ZSIsIm5ld0NsYXNzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJ3aW5kb3ciLCJBbGVydCIsImNsYXNzTmFtZSIsImJvb3RzdHJhcFN0eWxlIiwiY2hpbGRyZW4iLCJyb2xlIiwiaWQiLCJDaGlsZHJlbiIsImNvdW50IiwiX2pzeCIsImRpc3BsYXlOYW1lIiwibmljZUVycm9ycyIsIl8iLCJhbm5vdGF0aW9uVHlwZSIsImluZGV4Iiwib3RoZXIiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJkYXRhU3RydWN0dXJlIiwidGhpbmciLCJwcm9wZXJ0eSIsImRlcml2YXRpb24iLCJtZXRob2QiLCJlcnJvcnMiLCJkaWUiLCJlcnJvciIsImFyZ3MiLCJfbGVuIiwiX2tleSIsImUiLCJFcnJvciIsImhhc0Vycm9yIiwiQ09OVEVYVF9PQkpFQ1RfUEFUSCIsImdldEdsb2JhbFNlbGVjdGlvbkNvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwidW5kZWZpbmVkIiwidXNlU2VsZWN0aW9uQ29udGV4dFZhbHVlIiwiY29udGV4dCIsImNvbnRleHRWYWx1ZSIsInVzZUNvbnRleHQiLCJPdXRPZkNvbnRleHRFcnJvciIsInVzZVN0YXRlIiwibWFrZU9ic2VydmFibGUiLCJkZWZhdWx0Tm9vcEJhdGNoIiwiY2FsbGJhY2siLCJvYnNlcnZlckJhdGNoaW5nIiwicmVhY3Rpb25TY2hlZHVsZXIiLCJjb25zb2xlIiwid2FybiIsImNvbmZpZ3VyZSIsInByaW50RGVidWdWYWx1ZSIsInYiLCJnZXREZXBlbmRlbmN5VHJlZSIsIlJFR0lTVFJZX0ZJTkFMSVpFX0FGVEVSIiwiUkVHSVNUUllfU1dFRVBfSU5URVJWQUwiLCJUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnkiLCJmaW5hbGl6ZSIsIl90aGlzIiwiZGVmaW5lUHJvcGVydHkiLCJNYXAiLCJtYXhBZ2UiLCJjbGVhclRpbWVvdXQiLCJzd2VlcFRpbWVvdXQiLCJub3ciLCJEYXRlIiwicmVnaXN0cmF0aW9ucyIsImZvckVhY2giLCJyZWdpc3RyYXRpb24iLCJ0b2tlbiIsInJlZ2lzdGVyZWRBdCIsImRlbGV0ZSIsInNpemUiLCJzY2hlZHVsZVN3ZWVwIiwic3dlZXAiLCJ0YXJnZXQiLCJzZXQiLCJzZXRUaW1lb3V0IiwiVW5pdmVyc2FsRmluYWxpemF0aW9uUmVnaXN0cnkiLCJGaW5hbGl6YXRpb25SZWdpc3RyeSIsIm9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkiLCJhZG0iLCJfYSIsInJlYWN0aW9uIiwiZGlzcG9zZSIsImNyZWF0ZVJlYWN0aW9uIiwiUmVhY3Rpb24iLCJjb25jYXQiLCJzdGF0ZVZlcnNpb24iLCJTeW1ib2wiLCJvblN0b3JlQ2hhbmdlIiwidXNlT2JzZXJ2ZXIiLCJyZW5kZXIiLCJiYXNlQ29tcG9uZW50TmFtZSIsImFkbVJlZiIsIlJlYWN0IiwidXNlUmVmIiwiY3VycmVudCIsImFkbV8xIiwic3Vic2NyaWJlIiwidW5yZWdpc3RlciIsImdldFNuYXBzaG90IiwicmVnaXN0ZXIiLCJ1c2VEZWJ1Z1ZhbHVlIiwidXNlU3luY0V4dGVybmFsU3RvcmUiLCJyZW5kZXJSZXN1bHQiLCJleGNlcHRpb24iLCJ0cmFjayIsImhhc1N5bWJvbCIsImZvciIsImlzRnVuY3Rpb25OYW1lQ29uZmlndXJhYmxlIiwiX2IiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJjb25maWd1cmFibGUiLCJSZWFjdEZvcndhcmRSZWZTeW1ib2wiLCJmb3J3YXJkUmVmIiwicHJvcHMiLCJSZWFjdE1lbW9TeW1ib2wiLCJtZW1vIiwib2JzZXJ2ZXIiLCJiYXNlQ29tcG9uZW50Iiwib3B0aW9ucyIsInVzZUZvcndhcmRSZWYiLCJvYnNlcnZlckNvbXBvbmVudCIsInJlZiIsIndyaXRhYmxlIiwiY29udGV4dFR5cGVzIiwiY29weVN0YXRpY1Byb3BlcnRpZXMiLCJ0eXBlIiwiaG9pc3RCbGFja0xpc3QiLCIkJHR5cGVvZiIsImNvbXBhcmUiLCJiYXNlIiwia2V5cyIsImJhdGNoIiwiVGhyZWVTdGF0ZUNoZWNrQm94IiwiY2hlY2tib3hSZWYiLCJ1c2VFZmZlY3QiLCJpbmRldGVybWluYXRlIiwiY2hlY2tlZCIsIl9qc3hzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0E7O0FBRUMsRUFBQSxDQUFBLFlBQVk7O0FBR1osSUFBQSxJQUFJQSxNQUFNLEdBQUcsRUFBRSxDQUFDQyxjQUFjO0lBRTlCLFNBQVNDLFVBQVVBLEdBQUk7TUFDdEIsSUFBSUMsT0FBTyxHQUFHLEVBQUU7QUFFaEIsTUFBQSxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0MsU0FBUyxDQUFDQyxNQUFNLEVBQUVGLENBQUMsRUFBRSxFQUFFO0FBQzFDLFFBQUEsSUFBSUcsR0FBRyxHQUFHRixTQUFTLENBQUNELENBQUMsQ0FBQztRQUN0QixJQUFJRyxHQUFHLEVBQUU7VUFDUkosT0FBTyxHQUFHSyxXQUFXLENBQUNMLE9BQU8sRUFBRU0sVUFBVSxDQUFDRixHQUFHLENBQUMsQ0FBQztBQUNoRCxRQUFBO0FBQ0QsTUFBQTtBQUVBLE1BQUEsT0FBT0osT0FBTztBQUNmLElBQUE7SUFFQSxTQUFTTSxVQUFVQSxDQUFFRixHQUFHLEVBQUU7TUFDekIsSUFBSSxPQUFPQSxHQUFHLEtBQUssUUFBUSxJQUFJLE9BQU9BLEdBQUcsS0FBSyxRQUFRLEVBQUU7QUFDdkQsUUFBQSxPQUFPQSxHQUFHO0FBQ1gsTUFBQTtBQUVBLE1BQUEsSUFBSSxPQUFPQSxHQUFHLEtBQUssUUFBUSxFQUFFO0FBQzVCLFFBQUEsT0FBTyxFQUFFO0FBQ1YsTUFBQTtBQUVBLE1BQUEsSUFBSUcsS0FBSyxDQUFDQyxPQUFPLENBQUNKLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZCLE9BQU9MLFVBQVUsQ0FBQ1UsS0FBSyxDQUFDLElBQUksRUFBRUwsR0FBRyxDQUFDO0FBQ25DLE1BQUE7TUFFQSxJQUFJQSxHQUFHLENBQUNNLFFBQVEsS0FBS0MsTUFBTSxDQUFDQyxTQUFTLENBQUNGLFFBQVEsSUFBSSxDQUFDTixHQUFHLENBQUNNLFFBQVEsQ0FBQ0EsUUFBUSxFQUFFLENBQUNHLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtBQUNyRyxRQUFBLE9BQU9ULEdBQUcsQ0FBQ00sUUFBUSxFQUFFO0FBQ3RCLE1BQUE7TUFFQSxJQUFJVixPQUFPLEdBQUcsRUFBRTtBQUVoQixNQUFBLEtBQUssSUFBSWMsR0FBRyxJQUFJVixHQUFHLEVBQUU7QUFDcEIsUUFBQSxJQUFJUCxNQUFNLENBQUNrQixJQUFJLENBQUNYLEdBQUcsRUFBRVUsR0FBRyxDQUFDLElBQUlWLEdBQUcsQ0FBQ1UsR0FBRyxDQUFDLEVBQUU7QUFDdENkLFVBQUFBLE9BQU8sR0FBR0ssV0FBVyxDQUFDTCxPQUFPLEVBQUVjLEdBQUcsQ0FBQztBQUNwQyxRQUFBO0FBQ0QsTUFBQTtBQUVBLE1BQUEsT0FBT2QsT0FBTztBQUNmLElBQUE7QUFFQSxJQUFBLFNBQVNLLFdBQVdBLENBQUVXLEtBQUssRUFBRUMsUUFBUSxFQUFFO01BQ3RDLElBQUksQ0FBQ0EsUUFBUSxFQUFFO0FBQ2QsUUFBQSxPQUFPRCxLQUFLO0FBQ2IsTUFBQTtNQUVBLElBQUlBLEtBQUssRUFBRTtBQUNWLFFBQUEsT0FBT0EsS0FBSyxHQUFHLEdBQUcsR0FBR0MsUUFBUTtBQUM5QixNQUFBO01BRUEsT0FBT0QsS0FBSyxHQUFHQyxRQUFRO0FBQ3hCLElBQUE7SUFFQSxJQUFxQ0MsTUFBTSxDQUFDQyxPQUFPLEVBQUU7TUFDcERwQixVQUFVLENBQUNxQixPQUFPLEdBQUdyQixVQUFVO01BQy9CbUIsaUJBQWlCbkIsVUFBVTtBQUM1QixJQUFBLENBQUMsTUFLTTtNQUNOc0IsTUFBTSxDQUFDdEIsVUFBVSxHQUFHQSxVQUFVO0FBQy9CLElBQUE7QUFDRCxFQUFBLENBQUMsR0FBRSxDQUFBOzs7Ozs7OztBQ3BESSxNQUFNdUIsS0FBSyxHQUFHQSxDQUFDO0VBQUVDLFNBQVM7RUFBRUMsY0FBYztFQUFFQyxRQUFRO0VBQUVDLElBQUk7QUFBRUMsRUFBQUE7QUFBRSxDQUFjLEtBQy9FQyxRQUFRLENBQUNDLEtBQUssQ0FBQ0osUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUN4QkssR0FBQSxDQUFBLEtBQUEsRUFBQTtFQUFLUCxTQUFTLEVBQUV4QixVQUFVLENBQUMsQ0FBQSxZQUFBLEVBQWV5QixjQUFjLENBQUEsQ0FBRSxFQUFFRCxTQUFTLENBQUM7QUFBRUcsRUFBQUEsSUFBSSxFQUFFQSxJQUFJO0FBQUVDLEVBQUFBLEVBQUUsRUFBRUEsRUFBRTtBQUFBRixFQUFBQSxRQUFBLEVBQ3JGQTtBQUFRLENBQUEsQ0FDUCxHQUNOLElBQUk7QUFFWkgsS0FBSyxDQUFDUyxXQUFXLEdBQUcsT0FBTzs7QUMvQjNCLElBQU1DLFVBQVUsR0FBRztBQUNmLEVBQUEsQ0FBQyxFQUFBLDRGQUE4RjtBQUMvRixFQUFBLENBQUMsRUFBQSxTQUFBQyxDQUFBQSxDQUFDQyxjQUFjLEVBQUVwQixHQUFnQixFQUFBO0FBQzlCLElBQUEsT0FBQSxnQkFBQSxHQUF3Qm9CLGNBQWMsR0FBQSxRQUFBLEdBQVNwQixHQUFHLENBQUNKLFFBQVEsRUFBRSxHQUFBLHFCQUFBO0FBQ2hFLEVBQUEsQ0FBQTs7Ozs7Ozs7Ozs7O0FBWUQsRUFBQSxDQUFDLEVBQUUsd0VBQXdFO0FBQzNFLEVBQUEsQ0FBQyxFQUFFLDBFQUEwRTtBQUM3RSxFQUFBLENBQUMsRUFBRSxxRUFBcUU7QUFDeEUsRUFBQSxDQUFDLEVBQUUsaUVBQWlFO0FBQ3BFLEVBQUEsQ0FBQyxFQUFFLG9FQUFvRTtBQUN2RSxFQUFBLEVBQUUsRUFBRSxpRUFBaUU7QUFDckUsRUFBQSxFQUFFLEVBQUUsaUVBQWlFO0FBQ3JFLEVBQUEsRUFBRSxFQUFBLG9CQUFzQjtBQUN4QixFQUFBLEVBQUUsRUFBQSwwS0FBNEs7QUFDOUssRUFBQSxFQUFFLEVBQUUsNkRBQTZEO0FBQ2pFLEVBQUEsRUFBRSxFQUFBLGlLQUFtSztBQUNySyxFQUFBLEVBQUUsRUFBQSxvRkFBc0Y7QUFDeEYsRUFBQSxFQUFFLEVBQUEsU0FBQXVCLENBQUFBLENBQUNFLEtBQUssRUFBRWhDLE1BQU0sRUFBQTtJQUNaLE9BQUEsb0NBQUEsR0FBNENnQyxLQUFLLHdCQUFtQmhDLE1BQU07QUFDN0UsRUFBQSxDQUFBO0FBQ0QsRUFBQSxFQUFFLEVBQUUsb0dBQW9HO0VBQ3hHLEVBQUUsRUFBQSxTQUFBOEIsRUFBQ0csS0FBSyxFQUFBO0FBQ0osSUFBQSxPQUFPLHdEQUF3RCxHQUFHQSxLQUFLLENBQUNDLFdBQVcsQ0FBQ0MsSUFBSTtBQUMzRixFQUFBLENBQUE7RUFDRCxFQUFFLEVBQUEsU0FBQUwsRUFBQ0csS0FBSyxFQUFBO0lBQ0osT0FBTyw2QkFBNkIsR0FBR0EsS0FBSztBQUMvQyxFQUFBLENBQUE7RUFDRCxFQUFFLEVBQUEsU0FBQUgsRUFBQ00sYUFBYSxFQUFBO0FBQ1osSUFBQSxPQUFBLDhCQUFBLEdBQXNDQSxhQUFhLEdBQUEsR0FBQTtBQUN0RCxFQUFBLENBQUE7QUFDRCxFQUFBLEVBQUUsRUFBRSxvR0FBb0c7QUFDeEcsRUFBQSxFQUFFLEVBQUUsbURBQW1EO0VBQ3ZELEVBQUUsRUFBQSxTQUFBTixFQUFDTyxLQUFLLEVBQUE7SUFDSixPQUFPLG9DQUFvQyxHQUFHQSxLQUFLO0FBQ3RELEVBQUEsQ0FBQTtBQUNELEVBQUEsRUFBRSxFQUFBLFNBQUFQLENBQUFBLENBQUNRLFFBQVEsRUFBRUgsSUFBSSxFQUFBO0lBQ2IsT0FBQSxhQUFBLEdBQXFCRyxRQUFRLGdEQUEyQ0gsSUFBSSxHQUFBLEdBQUE7QUFDL0UsRUFBQSxDQUFBO0FBQ0QsRUFBQSxFQUFFLEVBQUUsMkJBQTJCO0FBQy9CLEVBQUEsRUFBRSxFQUFBLFNBQUFMLENBQUFBLENBQUNRLFFBQVEsRUFBRUgsSUFBSSxFQUFBO0FBQ2IsSUFBQSxPQUFBLDBCQUFBLEdBQWtDRyxRQUFRLENBQUMvQixRQUFRLEVBQUUsMENBQXFDNEIsSUFBSSxHQUFBLEdBQUE7QUFDakcsRUFBQSxDQUFBO0VBQ0QsRUFBRSxFQUFBLFNBQUFMLEVBQUNPLEtBQUssRUFBQTtJQUNKLE9BQU8sMEJBQTBCLEdBQUdBLEtBQUs7QUFDNUMsRUFBQSxDQUFBO0FBQ0QsRUFBQSxFQUFFLEVBQUUsdUJBQXVCO0FBQzNCLEVBQUEsRUFBRSxFQUFFLDJEQUEyRDtBQUMvRCxFQUFBLEVBQUUsRUFBRSxrQ0FBa0M7QUFDdEMsRUFBQSxFQUFFLEVBQUEsU0FBQVAsQ0FBQUEsQ0FBQ0ssSUFBSSxFQUFFSSxVQUFVLEVBQUE7SUFDZixPQUFBLGdDQUFBLEdBQXdDSixJQUFJLFVBQUtJLFVBQVU7QUFDOUQsRUFBQSxDQUFBO0VBQ0QsRUFBRSxFQUFBLFNBQUFULEVBQUNLLElBQUksRUFBQTtBQUNILElBQUEsT0FBQSxnQ0FBQSxHQUF3Q0EsSUFBSSxHQUFBLGlIQUFBO0FBQy9DLEVBQUEsQ0FBQTtFQUNELEVBQUUsRUFBQSxTQUFBTCxFQUFDSyxJQUFJLEVBQUE7QUFDSCxJQUFBLE9BQUEsa0JBQUEsR0FBMEJBLElBQUksR0FBQSxrRUFBQTtBQUNqQyxFQUFBLENBQUE7QUFDRCxFQUFBLEVBQUUsRUFBRSw0SUFBNEk7QUFDaEosRUFBQSxFQUFFLEVBQUUsMEVBQTBFO0VBQzlFLEVBQUUsRUFBQSxTQUFBTCxFQUFDVSxNQUFNLEVBQUE7SUFDTCxPQUFBLDBCQUFBLEdBQW1DQSxNQUFNLHFHQUFrR0EsTUFBTSxHQUFBLGFBQUE7QUFDcEosRUFBQSxDQUFBO0FBQ0QsRUFBQSxFQUFFLEVBQUUsb0RBQW9EO0FBQ3hELEVBQUEsRUFBRSxFQUFFO0FBQ0UsQ0FBQTtBQUVWLElBQU1DLE1BQU0sR0FBZ0NaLFVBQVUsQ0FBYztBQUVwRGEsU0FBQUEsR0FBR0EsQ0FBQ0MsS0FBbUMsRUFBQTtBQUFLQyxFQUFBQSxLQUFBQSxJQUFBQSxJQUFBQSxHQUFBQSxTQUFBQSxDQUFBQSxNQUFBQSxFQUFBQSxJQUFXLEdBQUEsSUFBQXhDLEtBQUEsQ0FBQXlDLElBQUEsR0FBQSxDQUFBLEdBQUFBLElBQUEsR0FBQSxDQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUFDLElBQUEsR0FBQSxDQUFBLEVBQUFBLElBQUEsR0FBQUQsSUFBQSxFQUFBQyxJQUFBLEVBQUEsRUFBQTtBQUFYRixJQUFBQSxJQUFXLENBQUFFLElBQUEsR0FBQSxDQUFBLENBQUEsR0FBQS9DLFNBQUEsQ0FBQStDLElBQUEsQ0FBQTs7QUFDbkUsRUFBYTtBQUNULElBQUEsSUFBSUMsQ0FBQyxHQUFRLE9BQU9KLEtBQUssS0FBSyxRQUFRLEdBQUdBLEtBQUssR0FBR0YsTUFBTSxDQUFDRSxLQUFLLENBQUM7QUFDOUQsSUFBQSxJQUFJLE9BQU9JLENBQUMsS0FBSyxVQUFVLEVBQUVBLENBQUMsR0FBR0EsQ0FBQyxDQUFDekMsS0FBSyxDQUFDLElBQUksRUFBRXNDLElBQVcsQ0FBQztBQUMzRCxJQUFBLE1BQU0sSUFBSUksS0FBSyxDQUFBLFNBQUEsR0FBV0QsQ0FBQyxDQUFHOztBQVN0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hGTSxTQUFVSixLQUFLQSxDQUFJQSxLQUFRLEVBQUE7RUFDN0IsT0FBTztBQUFFTSxJQUFBQSxRQUFRLEVBQUUsSUFBSTtBQUFFTixJQUFBQTtHQUFPO0FBQ3BDO0FBRU0sU0FBVTlCLEtBQUtBLENBQUlBLEtBQVEsRUFBQTtFQUM3QixPQUFPO0FBQUVvQyxJQUFBQSxRQUFRLEVBQUUsS0FBSztBQUFFcEMsSUFBQUE7R0FBTztBQUNyQzs7QUNiQSxNQUFNcUMsbUJBQW1CLEdBQUcsb0RBQTZEO0FBVW5GLFNBQVVDLHlCQUF5QkEsR0FBQTtFQUNyQyxPQUFRakMsTUFBTSxDQUFDZ0MsbUJBQW1CLENBQUMsS0FBS0UsYUFBYSxDQUFvQ0MsU0FBUyxDQUFDO0FBQ3ZHO0FBUU0sU0FBVUMsd0JBQXdCQSxHQUFBO0VBQ3BDLE1BQU1DLE9BQU8sR0FBR0oseUJBQXlCLEVBQUU7QUFDM0MsRUFBQSxNQUFNSyxZQUFZLEdBQUdDLFVBQVUsQ0FBQ0YsT0FBTyxDQUFDO0VBRXhDLElBQUlDLFlBQVksS0FBS0gsU0FBUyxFQUFFO0FBQzVCLElBQUEsT0FBT1YsS0FBSyxDQUFDLElBQUllLGlCQUFpQixFQUFFLENBQUM7QUFDekMsRUFBQTtFQUVBLE9BQU83QyxLQUFLLENBQUMyQyxZQUFZLENBQUM7QUFDOUI7QUFFQSxNQUFNRSxpQkFBa0IsU0FBUVYsS0FBSyxDQUFBO0VBQ2pDZCxXQUFBQSxHQUFBO0lBQ0ksS0FBSyxDQUFDLDJDQUEyQyxDQUFDO0FBQ3RELEVBQUE7OztBQ3BDSixJQUFJLENBQUN5QixRQUFRLEVBQUU7QUFDWCxFQUFBLE1BQU0sSUFBSVgsS0FBSyxDQUFDLG1EQUFtRCxDQUFDOztBQUV4RSxJQUFJLENBQUNZLGNBQWMsRUFBRTtBQUNqQixFQUFBLE1BQU0sSUFBSVosS0FBSyxDQUFDLG9FQUFvRSxDQUFDOzs7QUNMbkYsU0FBVWEsZ0JBQWdCQSxDQUFDQyxRQUFvQixFQUFBO0FBQ2pEQSxFQUFBQSxRQUFRLEVBQUU7QUFDZDtBQUVNLFNBQVVDLGdCQUFnQkEsQ0FBQ0MsaUJBQXNCLEVBQUE7RUFDbkQsSUFBSSxDQUFDQSxpQkFBaUIsRUFBRTtBQUNwQkEsSUFBQUEsaUJBQWlCLEdBQUdILGdCQUFnQjtBQUNwQyxJQUEyQztBQUN2Q0ksTUFBQUEsT0FBTyxDQUFDQyxJQUFJLENBQ1IsNkVBQTZFLENBQ2hGOzs7QUFHVEMsRUFBQUEsU0FBUyxDQUFDO0FBQUVILElBQUFBLGlCQUFpQixFQUFBQTtBQUFBLEdBQUUsQ0FBQztBQUNwQzs7QUNkTSxTQUFVSSxlQUFlQSxDQUFDQyxDQUFXLEVBQUE7RUFDdkMsT0FBT0MsaUJBQWlCLENBQUNELENBQUMsQ0FBQztBQUMvQjs7QUNJTyxJQUFNRSx1QkFBdUIsR0FBRyxLQUFNO0FBQ3RDLElBQU1DLHVCQUF1QixHQUFHLEtBQU07QUFFN0MsSUFBQUMsOEJBQUEsZ0JBQUEsWUFBQTtBQUlJLEVBQUEsU0FBQUEsK0JBQTZCQyxRQUE0QixFQUFBO0FBQXpELElBQUEsSUFBQUMsS0FBQSxHQUFBLElBQUE7QUFBWW5FLElBQUFBLE1BQUEsQ0FBQW9FLGNBQUEsQ0FBQSxJQUFBLEVBQUEsVUFBQSxFQUFBOzs7O0FBQWlCRixNQUFBQSxLQUFBQSxFQUFBQTs7QUFIckJsRSxJQUFBQSxNQUFBLENBQUFvRSxjQUFBLENBQUEsSUFBQSxFQUFBLGVBQUEsRUFBQTs7OztBQUFrRSxNQUFBLEtBQUEsRUFBQSxJQUFJQyxHQUFHOztBQUN6RXJFLElBQUFBLE1BQUEsQ0FBQW9FLGNBQUEsQ0FBQSxJQUFBLEVBQUEsY0FBQSxFQUFBOzs7Ozs7QUFpQlI7QUFDQXBFLElBQUFBLE1BQUEsQ0FBQW9FLGNBQUEsQ0FBQSxJQUFBLEVBQUEsT0FBQSxFQUFBOzs7O0FBQVEsTUFBQSxLQUFBLEVBQUEsVUFBQ0UsTUFBZ0MsRUFBQTtBQUFoQyxRQUFBLElBQUFBLE1BQUEsS0FBQSxNQUFBLEVBQUE7QUFBQUEsVUFBQUEsTUFBQSxHQUFBUCx1QkFBZ0M7QUFBQSxRQUFBO0FBQ3JDO0FBQ0FRLFFBQUFBLFlBQVksQ0FBQ0osS0FBSSxDQUFDSyxZQUFZLENBQUM7UUFDL0JMLEtBQUksQ0FBQ0ssWUFBWSxHQUFHM0IsU0FBUztBQUU3QixRQUFBLElBQU00QixHQUFHLEdBQUdDLElBQUksQ0FBQ0QsR0FBRyxFQUFFO1FBQ3RCTixLQUFJLENBQUNRLGFBQWEsQ0FBQ0MsT0FBTyxDQUFDLFVBQUNDLFlBQVksRUFBRUMsS0FBSyxFQUFBO0FBQzNDLFVBQUEsSUFBSUwsR0FBRyxHQUFHSSxZQUFZLENBQUNFLFlBQVksSUFBSVQsTUFBTSxFQUFFO0FBQzNDSCxZQUFBQSxLQUFJLENBQUNELFFBQVEsQ0FBQ1csWUFBWSxDQUFDeEUsS0FBSyxDQUFDO0FBQ2pDOEQsWUFBQUEsS0FBSSxDQUFDUSxhQUFhLENBQUNLLE1BQU0sQ0FBQ0YsS0FBSyxDQUFDOztBQUV4QyxRQUFBLENBQUMsQ0FBQztBQUVGLFFBQUEsSUFBSVgsS0FBSSxDQUFDUSxhQUFhLENBQUNNLElBQUksR0FBRyxDQUFDLEVBQUU7VUFDN0JkLEtBQUksQ0FBQ2UsYUFBYSxFQUFFOztBQUU1QixNQUFBOztBQUVBO0FBQ0FsRixJQUFBQSxNQUFBLENBQUFvRSxjQUFBLENBQUEsSUFBQSxFQUFBLHdCQUFBLEVBQUE7Ozs7QUFBeUIsTUFBQSxLQUFBLEVBQUEsWUFBQTtBQUNyQkQsUUFBQUEsS0FBSSxDQUFDZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNqQixNQUFBOztBQXJDNEQsRUFBQTtBQUU1RDs7Ozs7QUFDQSxJQUFBLEtBQUEsRUFBQSxVQUFTQyxNQUFjLEVBQUUvRSxLQUFRLEVBQUV5RSxLQUFjLEVBQUE7QUFDN0MsTUFBQSxJQUFJLENBQUNILGFBQWEsQ0FBQ1UsR0FBRyxDQUFDUCxLQUFLLEVBQUU7QUFDMUJ6RSxRQUFBQSxLQUFLLEVBQUFBLEtBQUE7UUFDTDBFLFlBQVksRUFBRUwsSUFBSSxDQUFDRCxHQUFHO09BQ3pCLENBQUM7TUFDRixJQUFJLENBQUNTLGFBQWEsRUFBRTtBQUN4QixJQUFBOzs7Ozs7QUFFQSxJQUFBLEtBQUEsRUFBQSxVQUFXSixLQUFjLEVBQUE7QUFDckIsTUFBQSxJQUFJLENBQUNILGFBQWEsQ0FBQ0ssTUFBTSxDQUFDRixLQUFLLENBQUM7QUFDcEMsSUFBQTs7Ozs7O0FBMEJBLElBQUEsS0FBQSxFQUFBLFlBQUE7QUFDSSxNQUFBLElBQUksSUFBSSxDQUFDTixZQUFZLEtBQUszQixTQUFTLEVBQUU7UUFDakMsSUFBSSxDQUFDMkIsWUFBWSxHQUFHYyxVQUFVLENBQUMsSUFBSSxDQUFDSCxLQUFLLEVBQUVuQix1QkFBdUIsQ0FBQzs7QUFFM0UsSUFBQTs7QUFDSixFQUFBLE9BQUFDLDhCQUFDO0FBQUQsQ0FBQyxFQWhERDtBQWtETyxJQUFNc0IsNkJBQTZCLEdBQ3RDLE9BQU9DLG9CQUFvQixLQUFLLFdBQVcsR0FDckNBLG9CQUFvQixHQUNwQnZCLDhCQUE4Qjs7QUM3RGpDLElBQU13Qiw0QkFBNEIsR0FBRyxJQUFJRiw2QkFBNkIsQ0FDekUsVUFBQ0csR0FBa0MsRUFBQTs7RUFDL0IsQ0FBQUMsRUFBQSxHQUFBRCxHQUFHLENBQUNFLFFBQVEsTUFBQSxJQUFBLElBQUFELEVBQUEsS0FBQSxNQUFBLEdBQUEsTUFBQSxHQUFBQSxFQUFBLENBQUVFLE9BQU8sRUFBRTtFQUN2QkgsR0FBRyxDQUFDRSxRQUFRLEdBQUcsSUFBSTtBQUN2QixDQUFDLENBQ0o7O0FDZUQsU0FBU0UsY0FBY0EsQ0FBQ0osR0FBMkIsRUFBQTtBQUMvQ0EsRUFBQUEsR0FBRyxDQUFDRSxRQUFRLEdBQUcsSUFBSUcsUUFBUSxDQUFDLFVBQUEsQ0FBQUMsTUFBQSxDQUFXTixHQUFHLENBQUMvRCxJQUFJLENBQUUsRUFBRSxZQUFBOztBQUMvQytELElBQUFBLEdBQUcsQ0FBQ08sWUFBWSxHQUFHQyxNQUFNLEVBQUU7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsSUFBQSxDQUFBUCxFQUFBLEdBQUFELEdBQUcsQ0FBQ1MsYUFBYSxNQUFBLElBQUEsSUFBQVIsRUFBQSxLQUFBLE1BQUEsR0FBQSxNQUFBLEdBQUFBLEVBQUEsQ0FBQXZGLElBQUEsQ0FBQXNGLEdBQUEsQ0FBSTtBQUN6QixFQUFBLENBQUMsQ0FBQztBQUNOO0FBRU0sU0FBVVUsV0FBV0EsQ0FBSUMsTUFBZSxFQUFFQyxpQkFBc0MsRUFBQTtBQUF0QyxFQUFBLElBQUFBLGlCQUFBLEtBQUEsTUFBQSxFQUFBO0FBQUFBLElBQUFBLGlCQUFBLEdBQUEsVUFBc0M7QUFBQSxFQUFBO0FBS2xGLEVBQUEsSUFBTUMsTUFBTSxHQUFHQyxLQUFLLENBQUNDLE1BQU0sQ0FBZ0MsSUFBSSxDQUFDO0FBRWhFLEVBQUEsSUFBSSxDQUFDRixNQUFNLENBQUNHLE9BQU8sRUFBRTtBQUNqQjtBQUNBLElBQUEsSUFBTUMsS0FBRyxHQUEyQjtBQUNoQ2YsTUFBQUEsUUFBUSxFQUFFLElBQUk7QUFDZE8sTUFBQUEsYUFBYSxFQUFFLElBQUk7TUFDbkJGLFlBQVksRUFBRUMsTUFBTSxFQUFFO0FBQ3RCdkUsTUFBQUEsSUFBSSxFQUFFMkUsaUJBQWlCO01BQ3ZCTSxTQUFTLEVBQUEsVUFBQ1QsYUFBeUIsRUFBQTtBQUMvQjtBQUNBVixRQUFBQSw0QkFBNEIsQ0FBQ29CLFVBQVUsQ0FBQ0YsS0FBRyxDQUFDO1FBQzVDQSxLQUFHLENBQUNSLGFBQWEsR0FBR0EsYUFBYTtBQUNqQyxRQUFBLElBQUksQ0FBQ1EsS0FBRyxDQUFDZixRQUFRLEVBQUU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO1VBQ0FFLGNBQWMsQ0FBQ2EsS0FBRyxDQUFDO0FBQ25CO0FBQ0E7QUFDQUEsVUFBQUEsS0FBRyxDQUFDVixZQUFZLEdBQUdDLE1BQU0sRUFBRTs7UUFHL0IsT0FBTyxZQUFBOztBQUNIO1VBQ0FTLEtBQUcsQ0FBQ1IsYUFBYSxHQUFHLElBQUk7VUFDeEIsQ0FBQVIsRUFBQSxHQUFBZ0IsS0FBRyxDQUFDZixRQUFRLE1BQUEsSUFBQSxJQUFBRCxFQUFBLEtBQUEsTUFBQSxHQUFBLE1BQUEsR0FBQUEsRUFBQSxDQUFFRSxPQUFPLEVBQUU7VUFDdkJjLEtBQUcsQ0FBQ2YsUUFBUSxHQUFHLElBQUk7UUFDdkIsQ0FBQztNQUNMLENBQUM7QUFDRGtCLE1BQUFBLFdBQVcsY0FBQTtBQUNQO1FBQ0EsT0FBT0gsS0FBRyxDQUFDVixZQUFZO0FBQzNCLE1BQUE7QUFDSCxLQUFBO0lBRURNLE1BQU0sQ0FBQ0csT0FBTyxHQUFHQyxLQUFHOztBQUd4QixFQUFBLElBQU1qQixHQUFHLEdBQUdhLE1BQU0sQ0FBQ0csT0FBUTtBQUUzQixFQUFBLElBQUksQ0FBQ2hCLEdBQUcsQ0FBQ0UsUUFBUSxFQUFFO0FBQ2Y7SUFDQUUsY0FBYyxDQUFDSixHQUFHLENBQUM7QUFDbkI7QUFDQTtBQUNBO0lBQ0FELDRCQUE0QixDQUFDc0IsUUFBUSxDQUFDUixNQUFNLEVBQUViLEdBQUcsRUFBRUEsR0FBRyxDQUFDOztFQUczRGMsS0FBSyxDQUFDUSxhQUFhLENBQUN0QixHQUFHLENBQUNFLFFBQVMsRUFBRWhDLGVBQWUsQ0FBQztBQUVuRDRDLEVBQUFBLEtBQUssQ0FBQ1Msb0JBQW9CO0FBQ3RCO0VBQ0F2QixHQUFHLENBQUNrQixTQUFTLEVBQ2JsQixHQUFHLENBQUNvQixXQUFXLEVBQ2ZwQixHQUFHLENBQUNvQixXQUFXLENBQ2xCO0FBRUQ7QUFDQTtBQUNBO0FBQ0EsRUFBQSxJQUFJSSxZQUFnQjtBQUNwQixFQUFBLElBQUlDLFNBQVM7QUFDYnpCLEVBQUFBLEdBQUcsQ0FBQ0UsUUFBUyxDQUFDd0IsS0FBSyxDQUFDLFlBQUE7SUFDaEIsSUFBSTtNQUNBRixZQUFZLEdBQUdiLE1BQU0sRUFBRTtLQUMxQixDQUFDLE9BQU85RCxDQUFDLEVBQUU7QUFDUjRFLE1BQUFBLFNBQVMsR0FBRzVFLENBQUM7O0FBRXJCLEVBQUEsQ0FBQyxDQUFDO0FBRUYsRUFBQSxJQUFJNEUsU0FBUyxFQUFFO0FBQ1gsSUFBQSxNQUFNQSxTQUFTLENBQUE7O0FBR25CLEVBQUEsT0FBT0QsWUFBWTtBQUN2Qjs7O0FDOUdBLElBQU1HLFNBQVMsR0FBRyxPQUFPbkIsTUFBTSxLQUFLLFVBQVUsSUFBSUEsTUFBTSxDQUFDb0IsR0FBRztBQUM1RCxJQUFNQywwQkFBMEIsR0FDNUIsQ0FBQUMsRUFBQSxHQUFBLENBQUE3QixJQUFBLEdBQUEzRixNQUFNLENBQUN5SCx3QkFBd0IsQ0FBQyxZQUFBLENBQU8sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFBLElBQUEsSUFBQTlCLElBQUEsS0FBQSxNQUFBLEdBQUEsTUFBQSxHQUFBQSxJQUFBLENBQUUrQixZQUFZLE1BQUEsSUFBQSxJQUFBRixFQUFBLEtBQUEsTUFBQSxHQUFBQSxFQUFBLEdBQUksS0FBSztBQUU1RTtBQUNBLElBQU1HLHFCQUFxQixHQUFHTixTQUFTLEdBQ2pDbkIsTUFBTSxDQUFDb0IsR0FBRyxDQUFDLG1CQUFtQixDQUFDLEdBQy9CLE9BQU9NLFVBQVUsS0FBSyxVQUFVLElBQUlBLFVBQVUsQ0FBQyxVQUFDQyxLQUFVLEVBQUE7RUFBSyxPQUFBLElBQUk7QUFBSixDQUFJLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFFdEYsSUFBTUMsZUFBZSxHQUFHVCxTQUFTLEdBQzNCbkIsTUFBTSxDQUFDb0IsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUN4QixPQUFPUyxJQUFJLEtBQUssVUFBVSxJQUFJQSxJQUFJLENBQUMsVUFBQ0YsS0FBVSxFQUFBO0VBQUssT0FBQSxJQUFJO0FBQUosQ0FBSSxDQUFDLENBQUMsVUFBVSxDQUFDO0FBMkMxRTtBQUNNLFNBQVVHLFFBQVFBLENBQ3BCQyxhQUcyRjtBQUMzRjtBQUNBQyxPQUEwQixFQUFBOztFQVMxQixJQUFJSixlQUFlLElBQUlHLGFBQWEsQ0FBQyxVQUFVLENBQUMsS0FBS0gsZUFBZSxFQUFFO0FBQ2xFLElBQUEsTUFBTSxJQUFJdEYsS0FBSyxDQUNYLHFMQUEyTCxDQUM5TDs7QUFRTCxFQUFBLElBQUkyRixhQUFhLEdBQUcsQ0FBQXhDLEVBQUEsR0FBTyxNQUFBLENBQVksTUFBQSxJQUFBLElBQUFBLEVBQUEsS0FBQSxNQUFBLEdBQUFBLEVBQUEsR0FBSSxLQUFLO0VBQ2hELElBQUlVLE1BQU0sR0FBRzRCLGFBQWE7RUFFMUIsSUFBTTNCLGlCQUFpQixHQUFHMkIsYUFBYSxDQUFDN0csV0FBVyxJQUFJNkcsYUFBYSxDQUFDdEcsSUFBSTtBQUV6RTtBQUNBO0VBQ0EsSUFBSWdHLHFCQUFxQixJQUFJTSxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUtOLHFCQUFxQixFQUFFO0FBQzlFUSxJQUFBQSxhQUFhLEdBQUcsSUFBSTtBQUNwQjlCLElBQUFBLE1BQU0sR0FBRzRCLGFBQWEsQ0FBQyxRQUFRLENBQUM7QUFDaEMsSUFBQSxJQUFJLE9BQU81QixNQUFNLEtBQUssVUFBVSxFQUFFO0FBQzlCLE1BQUEsTUFBTSxJQUFJN0QsS0FBSyxDQUNYLHNFQUF3RSxDQUMzRTs7O0FBSVQsRUFBQSxJQUFJNEYsaUJBQWlCLEdBQUcsVUFBQ1AsS0FBVSxFQUFFUSxHQUFvQixFQUFBO0FBQ3JELElBQUEsT0FBT2pDLFdBQVcsQ0FBQyxZQUFBO0FBQU0sTUFBQSxPQUFBQyxNQUFNLENBQUN3QixLQUFLLEVBQUVRLEdBQUcsQ0FBQztJQUFsQixDQUFrQixFQUFFL0IsaUJBQWlCLENBQUM7RUFDbkUsQ0FBQztBQUdDOEIsRUFBQUEsaUJBQTZDLENBQUNoSCxXQUFXLEdBQUc2RyxhQUFhLENBQUM3RyxXQUFXO0FBRXZGLEVBQUEsSUFBSW1HLDBCQUEwQixFQUFFO0FBQzVCdkgsSUFBQUEsTUFBTSxDQUFDb0UsY0FBYyxDQUFDZ0UsaUJBQWlCLEVBQUUsTUFBTSxFQUFFO01BQzdDL0gsS0FBSyxFQUFFNEgsYUFBYSxDQUFDdEcsSUFBSTtBQUN6QjJHLE1BQUFBLFFBQVEsRUFBRSxJQUFJO0FBQ2RaLE1BQUFBLFlBQVksRUFBRTtLQUNqQixDQUFDOztBQUdOO0VBQ0EsSUFBS08sYUFBcUIsQ0FBQ00sWUFBWSxFQUFFO0FBQ25DSCxJQUFBQSxpQkFBNkMsQ0FBQ0csWUFBWSxHQUN4RE4sYUFDSCxDQUFDTSxZQUFZOztBQUdsQixFQUFBLElBQUlKLGFBQWEsRUFBRTtBQUNmO0FBQ0E7QUFDQTtBQUNBQyxJQUFBQSxpQkFBaUIsR0FBR1IsVUFBVSxDQUFDUSxpQkFBaUIsQ0FBQzs7QUFHckQ7QUFDQTtBQUNBO0FBQ0FBLEVBQUFBLGlCQUFpQixHQUFHTCxJQUFJLENBQUNLLGlCQUFpQixDQUFDO0FBRTNDSSxFQUFBQSxvQkFBb0IsQ0FBQ1AsYUFBYSxFQUFFRyxpQkFBaUIsQ0FBQztBQUV0RCxFQUEyQztBQUN2Q3BJLElBQUFBLE1BQU0sQ0FBQ29FLGNBQWMsQ0FBQ2dFLGlCQUFpQixFQUFFLGNBQWMsRUFBRTtBQUNyRC9DLE1BQUFBLEdBQUcsY0FBQTs7QUFDQyxRQUFBLE1BQU0sSUFBSTdDLEtBQUssQ0FDWCxxQkFBQSxDQUFBd0QsTUFBQSxDQUNJLElBQUksQ0FBQzVFLFdBQVcsS0FBSSxDQUFBdUUsRUFBQSxHQUFBLElBQUksQ0FBQzhDLElBQUksY0FBQTlDLEVBQUEsS0FBQSxNQUFBLEdBQUEsTUFBQSxHQUFBQSxFQUFBLENBQUV2RSxXQUFXLENBQUEsS0FBSSxDQUFBb0csRUFBQSxHQUFBLElBQUksQ0FBQ2lCLElBQUksTUFBQSxJQUFBLElBQUFqQixFQUFBLEtBQUEsTUFBQSxHQUFBLE1BQUEsR0FBQUEsRUFBQSxDQUFFN0YsSUFBSSxDQUFBLElBQUksV0FBVywyREFDckIsQ0FDOUQ7QUFDTCxNQUFBO0tBQ0gsQ0FBQzs7QUFHTixFQUFBLE9BQU95RyxpQkFBaUI7QUFDNUI7QUFFQTtBQUNBLElBQU1NLGNBQWMsR0FBUTtBQUN4QkMsRUFBQUEsUUFBUSxFQUFFLElBQUk7QUFDZHRDLEVBQUFBLE1BQU0sRUFBRSxJQUFJO0FBQ1p1QyxFQUFBQSxPQUFPLEVBQUUsSUFBSTtBQUNiSCxFQUFBQSxJQUFJLEVBQUUsSUFBSTtBQUNWO0FBQ0E7QUFDQXJILEVBQUFBLFdBQVcsRUFBRTtBQUNoQixDQUFBO0FBRUQsU0FBU29ILG9CQUFvQkEsQ0FBQ0ssSUFBUyxFQUFFekQsTUFBVyxFQUFBO0VBQ2hEcEYsTUFBTSxDQUFDOEksSUFBSSxDQUFDRCxJQUFJLENBQUMsQ0FBQ2pFLE9BQU8sQ0FBQyxVQUFBekUsR0FBRyxFQUFBO0FBQ3pCLElBQUEsSUFBSSxDQUFDdUksY0FBYyxDQUFDdkksR0FBRyxDQUFDLEVBQUU7QUFDdEJILE1BQUFBLE1BQU0sQ0FBQ29FLGNBQWMsQ0FBQ2dCLE1BQU0sRUFBRWpGLEdBQUcsRUFBRUgsTUFBTSxDQUFDeUgsd0JBQXdCLENBQUNvQixJQUFJLEVBQUUxSSxHQUFHLENBQUUsQ0FBQzs7QUFFdkYsRUFBQSxDQUFDLENBQUM7QUFDTjs7O0FDcEtBb0QsZ0JBQWdCLENBQUN3Rix1QkFBSyxDQUFDO0FBVUksQ0FBQXBELEVBQUEsR0FBQUYsNEJBQTRCLENBQUMsd0JBQXdCLENBQUMsY0FBQUUsRUFBQSxLQUFBLE1BQUEsR0FBQUEsRUFBQSxHQUFLLGFBQU87O0FDUHZGLFNBQVVxRCxrQkFBa0JBLENBQUM7RUFBRTNJLEtBQUs7RUFBRU8sU0FBUztFQUFFLEdBQUdpSDtBQUFLLENBQTJCLEVBQUE7QUFDdEYsRUFBQSxNQUFNb0IsV0FBVyxHQUFHeEMsTUFBTSxDQUEwQixJQUFJLENBQUM7QUFDekR5QyxFQUFBQSxTQUFTLENBQUMsTUFBSztBQUNYLElBQUEsSUFBSSxDQUFDRCxXQUFXLENBQUN2QyxPQUFPLEVBQUU7QUFDdEIsTUFBQTtBQUNKLElBQUE7QUFDQSxJQUFBLElBQUlyRyxLQUFLLEtBQUssS0FBSyxJQUFJQSxLQUFLLEtBQUssTUFBTSxFQUFFO0FBQ3JDNEksTUFBQUEsV0FBVyxDQUFDdkMsT0FBTyxDQUFDeUMsYUFBYSxHQUFHLEtBQUs7QUFDN0MsSUFBQSxDQUFDLE1BQU0sSUFBSTlJLEtBQUssS0FBSyxNQUFNLEVBQUU7QUFDekI0SSxNQUFBQSxXQUFXLENBQUN2QyxPQUFPLENBQUN5QyxhQUFhLEdBQUcsSUFBSTtBQUM1QyxJQUFBO0FBQ0osRUFBQSxDQUFDLEVBQUUsQ0FBQzlJLEtBQUssQ0FBQyxDQUFDO0FBRVgsRUFBQSxPQUNJYyxHQUFBLENBQUEsT0FBQSxFQUFBO0FBQUEsSUFBQSxHQUNRMEcsS0FBSztBQUNUWSxJQUFBQSxJQUFJLEVBQUMsVUFBVTtBQUNmN0gsSUFBQUEsU0FBUyxFQUFFeEIsVUFBVSxDQUFDLHNCQUFzQixFQUFFd0IsU0FBUyxDQUFDO0FBQ3hEeUgsSUFBQUEsR0FBRyxFQUFFWSxXQUFXO0lBQ2hCRyxPQUFPLEVBQUUvSSxLQUFLLEtBQUs7R0FBTSxDQUMzQjtBQUVWOztBQ3RCTSxTQUFVLHdCQUF3QixDQUFDLEtBQVksRUFBQTs7QUFFakQsSUFBQSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBSzs7QUFFcEIsUUFBQSxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDaEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUVOLElBQUEsUUFDSWMsR0FBQSxDQUFBLEtBQUEsRUFBQSxFQUFLLFNBQVMsRUFBRSxDQUFBLHdCQUFBLEVBQTJCLEtBQUssQ0FBQyxTQUFTLENBQUEsQ0FBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFBLFFBQUEsRUFDL0UsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLElBQ3BCQSxhQUNJLFNBQVMsRUFBQyx5QkFBeUIsRUFDbkMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQ3RCLFNBQVMsRUFBRSxDQUFDLElBQUc7QUFDWCxnQkFBQSxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxFQUFFO29CQUNwQyxDQUFDLENBQUMsY0FBYyxFQUFFO0FBQ2xCLG9CQUFBLEtBQUssQ0FBQyxPQUFPLElBQUk7Z0JBQ3JCO1lBQ0osQ0FBQyxFQUFBLFFBQUEsRUFFQSxLQUFLLENBQUMsUUFBUSxFQUFBLENBQ2IsS0FFTmtJLElBQUEsQ0FBQSxLQUFBLEVBQUEsRUFBSyxTQUFTLEVBQUMsOERBQThELEVBQUEsUUFBQSxFQUFBLENBQ3pFbEksR0FBQSxDQUFDLGtCQUFrQixFQUFBLEVBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLE9BQU8sR0FBSSxFQUM1RUEsR0FBQSxDQUFBLE9BQUEsRUFBQSxFQUFPLE9BQU8sRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFDLGVBQWUsRUFBQSxRQUFBLEVBQ3hDLEtBQUssQ0FBQyxRQUFRLEdBQ1gsQ0FBQSxFQUFBLENBQ04sQ0FDVCxFQUFBLENBQ0M7QUFFZDs7QUNyQ0EsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLFNBQVMsZUFBZSxDQUFDLEtBQW9DLEVBQUE7QUFDMUYsSUFBQSxNQUFNLFlBQVksR0FBRyx3QkFBd0IsRUFBRTtBQUUvQyxJQUFBLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRTtRQUN2QixRQUNJQSxJQUFDLEtBQUssRUFBQSxFQUFDLGNBQWMsRUFBQyxRQUFRLEVBQUEsUUFBQSxFQUFBLCtJQUFBLEVBQUEsQ0FHdEI7SUFFaEI7QUFFQSxJQUFBLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFLO0FBRXBDLElBQUEsUUFDSWtJLElBQUEsQ0FBQyx3QkFBd0IsRUFBQSxFQUNyQixJQUFJLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFDdkIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxlQUFlLEVBQ2pDLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxFQUM5QyxTQUFTLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFDdEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUEsUUFBQSxFQUFBLENBRXJCLFNBQVMsQ0FBQyxlQUFlLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsRUFDOUQsU0FBUyxDQUFDLGVBQWUsS0FBSyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixFQUNoRSxTQUFTLENBQUMsZUFBZSxLQUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWtCLEVBQ2hFLEtBQUssQ0FBQyxlQUFlLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FBQSxFQUFBLENBQ1o7QUFFbkMsQ0FBQzs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMCwyLDUsNiw3LDgsOSwxMCwxMSwxMl19
