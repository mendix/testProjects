import React, { useRef, createElement, Fragment, useState, forwardRef, memo, createRef, useEffect, useCallback, Children, useContext, createContext } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import 'mendix/filters/builders';
import 'big.js';

function withPreloader(Component, isLoading) {
  return function Preloader(props) {
    const isLoaded = useRef(false).current ||= !isLoading(props);
    return isLoaded ? createElement(Component, {
      ...props
    }) : createElement(Fragment, null);
  };
}

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
    Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
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
  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
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
function _toPrimitive$1(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey$1(arg) {
  var key = _toPrimitive$1(arg, "string");
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
function identityComparer(a, b) {
  return a === b;
}
function structuralComparer(a, b) {
  return deepEqual(a, b);
}
function shallowComparer(a, b) {
  return deepEqual(a, b, 1);
}
function defaultComparer(a, b) {
  if (Object.is) {
    return Object.is(a, b);
  }
  return a === b ? a !== 0 || 1 / a === 1 / b : a !== a && b !== b;
}
var comparer = {
  identity: identityComparer,
  structural: structuralComparer,
  "default": defaultComparer,
  shallow: shallowComparer
};
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
var isFunctionNameConfigurable$2 = (_getDescriptor$config = (_getDescriptor = /*#__PURE__*/getDescriptor(function () {}, "name")) == null ? void 0 : _getDescriptor.configurable) != null ? _getDescriptor$config : false;
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
  if (isFunctionNameConfigurable$2) {
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
function allowStateChanges(allowStateChanges, func) {
  var prev = allowStateChangesStart(allowStateChanges);
  try {
    return func();
  } finally {
    allowStateChangesEnd(prev);
  }
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
function runInAction(fn) {
  return executeAction(fn.name || DEFAULT_ACTION_NAME, false, fn, this, undefined);
}
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
function reaction(expression, effect, opts) {
  var _opts$name2, _opts4, _opts4$signal, _opts5;
  if (opts === void 0) {
    opts = EMPTY_OBJECT;
  }
  {
    if (!isFunction(expression) || !isFunction(effect)) {
      die("First and second argument to reaction should be functions");
    }
    if (!isPlainObject(opts)) {
      die("Third argument of reactions should be an object");
    }
  }
  var name = (_opts$name2 = opts.name) != null ? _opts$name2 : "Reaction@" + getNextId() ;
  var effectAction = action(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
  var runSync = !opts.scheduler && !opts.delay;
  var scheduler = createSchedulerFromOptions(opts);
  var firstTime = true;
  var isScheduled = false;
  var value;
  var equals = opts.compareStructural ? comparer.structural : opts.equals || comparer["default"];
  var r = new Reaction(name, function () {
    if (firstTime || runSync) {
      reactionRunner();
    } else if (!isScheduled) {
      isScheduled = true;
      scheduler(reactionRunner);
    }
  }, opts.onError, opts.requiresObservable);
  function reactionRunner() {
    isScheduled = false;
    if (r.isDisposed_) {
      return;
    }
    var changed = false;
    var oldValue = value;
    r.track(function () {
      var nextValue = allowStateChanges(false, function () {
        return expression(r);
      });
      changed = firstTime || !equals(value, nextValue);
      value = nextValue;
    });
    if (firstTime && opts.fireImmediately) {
      effectAction(value, oldValue, r);
    } else if (!firstTime && changed) {
      effectAction(value, oldValue, r);
    }
    firstTime = false;
  }
  if (!((_opts4 = opts) != null && (_opts4$signal = _opts4.signal) != null && _opts4$signal.aborted)) {
    r.schedule_();
  }
  return r.getDisposer_((_opts5 = opts) == null ? void 0 : _opts5.signal);
}
function wrapErrorHandler(errorHandler, baseFn) {
  return function () {
    try {
      return baseFn.apply(this, arguments);
    } catch (e) {
      errorHandler.call(this, e);
    }
  };
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
  var atom = typeof arg3 === "function" ? getAtom(thing, arg2) : getAtom(thing);
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
  if (property !== undefined) {
    if ((isObservableMap(value) || isObservableArray(value))) {
      return die("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
    }
    if (isObservableObject(value)) {
      return value[$mobx].values_.has(property);
    }
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
  if (property !== undefined) {
    return getAdministration(getAtom(thing, property));
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

if (!useState) {
  throw new Error("mobx-react-lite requires React with Hooks support");
}
if (!makeObservable) {
  throw new Error("mobx-react-lite@3 requires mobx at least version 6 to be available");
}

function defaultNoopBatch$1(callback) {
  callback();
}
function observerBatching$1(reactionScheduler) {
  if (!reactionScheduler) {
    reactionScheduler = defaultNoopBatch$1;
    {
      console.warn("[MobX] Failed to get unstable_batched updates from react-dom / react-native");
    }
  }
  configure({
    reactionScheduler: reactionScheduler
  });
}

function printDebugValue$1(v) {
  return getDependencyTree(v);
}

var REGISTRY_FINALIZE_AFTER$1 = 10000;
var REGISTRY_SWEEP_INTERVAL$1 = 10000;
var TimerBasedFinalizationRegistry$1 = /** @class */function () {
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
          maxAge = REGISTRY_FINALIZE_AFTER$1;
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
        this.sweepTimeout = setTimeout(this.sweep, REGISTRY_SWEEP_INTERVAL$1);
      }
    }
  });
  return TimerBasedFinalizationRegistry;
}();
var UniversalFinalizationRegistry$1 = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : TimerBasedFinalizationRegistry$1;

var observerFinalizationRegistry$1 = new UniversalFinalizationRegistry$1(function (adm) {
  var _a;
  (_a = adm.reaction) === null || _a === void 0 ? void 0 : _a.dispose();
  adm.reaction = null;
});

function createReaction$1(adm) {
  adm.reaction = new Reaction("observer".concat(adm.name), function () {
    var _a;
    adm.stateVersion = Symbol();
    // onStoreChange won't be available until the component "mounts".
    // If state changes in between initial render and mount,
    // `useSyncExternalStore` should handle that by checking the state version and issuing update.
    (_a = adm.onStoreChange) === null || _a === void 0 ? void 0 : _a.call(adm);
  });
}
function useObserver$1(render, baseComponentName) {
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
        observerFinalizationRegistry$1.unregister(adm_1);
        adm_1.onStoreChange = onStoreChange;
        if (!adm_1.reaction) {
          // We've lost our reaction and therefore all subscriptions, occurs when:
          // 1. Timer based finalization registry disposed reaction before component mounted.
          // 2. React "re-mounts" same component without calling render in between (typically <StrictMode>).
          // We have to recreate reaction and schedule re-render to recreate subscriptions,
          // even if state did not change.
          createReaction$1(adm_1);
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
    createReaction$1(adm);
    // StrictMode/ConcurrentMode/Suspense may mean that our component is
    // rendered and abandoned multiple times, so we need to track leaked
    // Reactions.
    observerFinalizationRegistry$1.register(admRef, adm, adm);
  }
  React.useDebugValue(adm.reaction, printDebugValue$1);
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

var _a$3, _b$1;
var warnObserverOptionsDeprecated$1 = true;
var hasSymbol$1 = typeof Symbol === "function" && Symbol.for;
var isFunctionNameConfigurable$1 = (_b$1 = (_a$3 = Object.getOwnPropertyDescriptor(function () {}, "name")) === null || _a$3 === void 0 ? void 0 : _a$3.configurable) !== null && _b$1 !== void 0 ? _b$1 : false;
// Using react-is had some issues (and operates on elements, not on types), see #608 / #609
var ReactForwardRefSymbol$1 = hasSymbol$1 ? Symbol.for("react.forward_ref") : typeof forwardRef === "function" && forwardRef(function (props) {
  return null;
})["$$typeof"];
var ReactMemoSymbol$1 = hasSymbol$1 ? Symbol.for("react.memo") : typeof memo === "function" && memo(function (props) {
  return null;
})["$$typeof"];
// n.b. base case is not used for actual typings or exported in the typing files
function observer$1(baseComponent,
// TODO remove in next major
options) {
  var _a;
  if (warnObserverOptionsDeprecated$1 && options) {
    warnObserverOptionsDeprecated$1 = false;
    console.warn("[mobx-react-lite] `observer(fn, { forwardRef: true })` is deprecated, use `observer(React.forwardRef(fn))`");
  }
  if (ReactMemoSymbol$1 && baseComponent["$$typeof"] === ReactMemoSymbol$1) {
    throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");
  }
  var useForwardRef = (_a = options === null || options === void 0 ? void 0 : options.forwardRef) !== null && _a !== void 0 ? _a : false;
  var render = baseComponent;
  var baseComponentName = baseComponent.displayName || baseComponent.name;
  // If already wrapped with forwardRef, unwrap,
  // so we can patch render and apply memo
  if (ReactForwardRefSymbol$1 && baseComponent["$$typeof"] === ReactForwardRefSymbol$1) {
    useForwardRef = true;
    render = baseComponent["render"];
    if (typeof render !== "function") {
      throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");
    }
  }
  var observerComponent = function (props, ref) {
    return useObserver$1(function () {
      return render(props, ref);
    }, baseComponentName);
  };
  observerComponent.displayName = baseComponent.displayName;
  if (isFunctionNameConfigurable$1) {
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
  copyStaticProperties$1(baseComponent, observerComponent);
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
var hoistBlackList$1 = {
  $$typeof: true,
  render: true,
  compare: true,
  type: true,
  // Don't redefine `displayName`,
  // it's defined as getter-setter pair on `memo` (see #3192).
  displayName: true
};
function copyStaticProperties$1(base, target) {
  Object.keys(base).forEach(function (key) {
    if (!hoistBlackList$1[key]) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
    }
  });
}

var _a$2;
observerBatching$1(unstable_batchedUpdates);
(_a$2 = observerFinalizationRegistry$1["finalizeAllImmediately"]) !== null && _a$2 !== void 0 ? _a$2 : function () {};

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

const debounce = (func, waitFor) => {
  let timeout = null;
  const abort = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  const debounced = (...args) => {
    abort();
    timeout = setTimeout(() => func(...args), waitFor);
  };
  return [debounced, abort];
};

class InputStore {
  constructor(init = "") {
    _defineProperty(this, "value", void 0);
    _defineProperty(this, "onChange", event => {
      this.setValue(event.target.value);
    });
    this.value = init;
    makeObservable(this, {
      value: observable,
      setValue: action,
      onChange: action
    });
  }
  setValue(value) {
    this.value = value;
  }
}

class EditableFilterController {
  constructor(params) {
    _defineProperty(this, "filter", void 0);
    _defineProperty(this, "changeDelay", void 0);
    _defineProperty(this, "disabledFn", void 0);
    _defineProperty(this, "input1", void 0);
    _defineProperty(this, "input2", void 0);
    _defineProperty(this, "inputRef", createRef());
    _defineProperty(this, "defaults", void 0);
    _defineProperty(this, "inputs", void 0);
    _defineProperty(this, "handleFilterFnChange", fn => {
      this.filter.filterFunction = fn;
      this.inputRef.current?.focus();
    });
    const {
      filter,
      changeDelay = 500
    } = params;
    this.changeDelay = changeDelay;
    this.input1 = new InputStore(filter.arg1.displayValue);
    this.input2 = new InputStore(filter.arg2.displayValue);
    this.inputs = [this.input1, this.input2];
    this.filter = filter;
    this.defaults = [params.defaultFilter, params.defaultValue];
    this.disabledFn = params.disableInputs;
    makeObservable(this, {
      selectedFn: computed,
      disableInputs: computed,
      handleFilterFnChange: action
    });
  }
  get selectedFn() {
    return this.filter.filterFunction;
  }
  get disableInputs() {
    return this.disabledFn ? this.disabledFn(this.filter.filterFunction) : false;
  }
  setup() {
    const disposers = [];
    // onInputsChange - debounced reaction (effect) for both inputs.
    // Triggered whenever one of the inputs is changed.
    // This reaction writes value to filter.
    const [onInputsChange, clearDebounce] = debounce(([v1, v2]) => {
      runInAction(() => {
        this.filter.arg1.displayValue = v1;
        this.filter.arg2.displayValue = v2;
      });
    }, this.changeDelay);
    disposers.push(clearDebounce);
    disposers.push(reaction(() => {
      return [this.input1.value, this.input2.value];
    }, onInputsChange));
    // Autorun to sync filter args with inputs.
    // Runs whenever one of the argument value is changed.
    disposers.push(autorun(() => {
      this.input1.setValue(this.filter.arg1.displayValue);
      this.input2.setValue(this.filter.arg2.displayValue);
    }));
    // Set default state for the filter, if present.
    this.filter.UNSAFE_setDefaults(this.defaults);
    return () => {
      disposers.forEach(dispose => dispose());
    };
  }
}

function useEditableFilterController(params) {
  const [ctrl] = useState(() => new EditableFilterController(params));
  useEffect(() => ctrl.setup(), [ctrl]);
  return ctrl;
}

function useBasicSync(props, store) {
  const pbox = useRef(props);
  useEffect(() => {
    pbox.current = props;
  });
  useEffect(() => {
    return reaction(() => [store.arg1.value, store.arg2.value], createPusher(pbox));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
function createPusher(pbox) {
  return ([value1, _value2]) => {
    const props = pbox.current;
    props.valueAttribute?.setValue(value1 ?? undefined);
    if (props.onChange?.canExecute) {
      props.onChange?.execute();
    }
  };
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
var warnObserverOptionsDeprecated = true;
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
  if (warnObserverOptionsDeprecated && options) {
    warnObserverOptionsDeprecated = false;
    console.warn("[mobx-react-lite] `observer(fn, { forwardRef: true })` is deprecated, use `observer(React.forwardRef(fn))`");
  }
  if (ReactMemoSymbol && baseComponent["$$typeof"] === ReactMemoSymbol) {
    throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");
  }
  var useForwardRef = (_a = options === null || options === void 0 ? void 0 : options.forwardRef) !== null && _a !== void 0 ? _a : false;
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

var classnames = {exports: {}};

/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/

(function (module) {
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
	      } else if (Array.isArray(arg)) {
	        if (arg.length) {
	          var inner = classNames.apply(null, arg);
	          if (inner) {
	            classes.push(inner);
	          }
	        }
	      } else if (argType === 'object') {
	        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
	          classes.push(arg.toString());
	          continue;
	        }
	        for (var key in arg) {
	          if (hasOwn.call(arg, key) && arg[key]) {
	            classes.push(key);
	          }
	        }
	      }
	    }
	    return classes.join(' ');
	  }
	  if (module.exports) {
	    classNames.default = classNames;
	    module.exports = classNames;
	  } else {
	    window.classNames = classNames;
	  }
	})();
} (classnames));

var classNames = classnames.exports;

function usePositionObserver(target, active) {
  const [position, setPosition] = useState();
  const onAnimationFrameHandler = useCallback(() => {
    setPosition(prev => {
      const next = target?.getBoundingClientRect();
      if (shouldUpdatePosition(prev, next)) {
        return next;
      }
      return prev;
    });
  }, [target]);
  useAnimationFrameEffect(active ? onAnimationFrameHandler : undefined);
  return position;
}
function useAnimationFrameEffect(callback) {
  useEffect(() => callback ? animationLoop(callback) : undefined, [callback]);
}
function shouldUpdatePosition(a, b) {
  return !a || !b || a.height !== b.height || a.width !== b.width || a.bottom !== b.bottom || a.top !== b.top || a.left !== b.left || a.right !== b.right;
}
function animationLoop(callback) {
  let requestId;
  const requestFrame = () => {
    requestId = window.requestAnimationFrame(() => {
      callback();
      requestFrame();
    });
  };
  const cancel = () => window.cancelAnimationFrame(requestId);
  requestFrame();
  return cancel;
}

function FilterSelector(props) {
  const {
    value,
    onChange
  } = props;
  const [show, setShow] = useState(false);
  const componentRef = useRef(null);
  const filterSelectorsRef = useRef(null);
  useOnClickOutside([componentRef, filterSelectorsRef], () => setShow(false));
  const position = usePositionObserver(componentRef.current, show);
  const onClick = useCallback(value => {
    onChange(value);
    setShow(false);
  }, [onChange]);
  const filterSelectors = createElement("ul", {
    ref: filterSelectorsRef,
    id: `${props.id}-filter-selectors`,
    className: "filter-selectors",
    role: "menu",
    "data-focusindex": 0,
    style: {
      position: "fixed",
      top: position?.bottom,
      left: position?.left
    }
  }, props.options.map((option, index) => createElement("li", {
    className: classNames({
      "filter-selected": value === option.value
    }),
    key: index,
    onClick: e => {
      e.preventDefault();
      e.stopPropagation();
      onClick(option.value);
    },
    onKeyDown: e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        onClick(option.value);
      } else if (e.key === "Tab" && index + 1 === props.options.length) {
        e.preventDefault();
        onClick(value);
      } else if (e.key === "Tab" && e.shiftKey && index === 0 || e.key === "Escape") {
        e.preventDefault();
        componentRef.current?.querySelector("button")?.focus();
        setShow(false);
      }
    },
    role: "menuitem",
    tabIndex: 0
  }, createElement("div", {
    className: classNames("filter-icon", option.value),
    "aria-hidden": true
  }), createElement("div", {
    className: "filter-label"
  }, option.label))));
  const containerClick = useCallback(() => {
    setShow(prev => !prev);
    setTimeout(() => {
      filterSelectorsRef.current?.querySelector("li.filter-selected")?.focus();
    }, 10);
  }, []);
  return createElement("div", {
    className: "filter-selector"
  }, createElement("div", {
    className: "filter-selector-content",
    ref: componentRef
  }, createElement("button", {
    "aria-controls": `${props.id}-filter-selectors`,
    "aria-expanded": show,
    "aria-haspopup": true,
    "aria-label": props.ariaLabel,
    className: classNames("btn btn-default filter-selector-button button-icon", value),
    onClick: containerClick,
    onKeyDown: e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        e.stopPropagation();
        containerClick();
      }
    }
  }, "\u00A0"), show && filterSelectors));
}
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (Array.isArray(ref)) {
        if (ref.some(r => !r.current || r.current.contains(event.target))) {
          return;
        }
      } else if (!ref.current || ref.current.contains(event.target)) {
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

function Badge(props) {
  return createElement("div", {
    className: "corner-badge",
    style: {
      position: "absolute",
      color: "var(--highlightSelectionColor)",
      background: "var(--highlightSelectionBackground)",
      fontSize: 10,
      // fontFamily: "monospace",
      top: 0,
      padding: "2px 8px",
      borderRadius: 3,
      ...props.style
    }
  }, props.children);
}

// eslint-disable-next-line prefer-arrow-callback
const InputWithFilters = observer(function InputWithFilters(props) {
  const {
    inputStores: [input1]
  } = props;
  return createElement("div", {
    className: classNames("filter-container", props.className),
    "data-focusindex": props.tabIndex ?? 0,
    style: props.styles
  }, props.badge ? createElement(Badge, {
    style: {
      left: 40
    }
  }, props.badge) : null, props.adjustable && createElement(FilterSelector, {
    ariaLabel: props.screenReaderButtonCaption,
    id: props.id,
    value: props.filterFn,
    onChange: props.onFilterChange,
    options: props.filterFnList
  }), createElement("input", {
    "aria-label": props.screenReaderInputCaption,
    className: classNames("form-control", {
      "filter-input": props.adjustable
    }),
    disabled: props.disableInputs,
    onChange: input1.onChange,
    placeholder: props.placeholder,
    ref: props.inputRef,
    type: props.type,
    value: input1.value
  }));
});

function generateUUID() {
  const UUIDLocation = "com.mendix.widgets.web.UUID";
  if (!window[UUIDLocation]) {
    window[UUIDLocation] = 1;
  }
  return window[UUIDLocation]++;
}

const filterDefs = {
    greater: "Greater than",
    greaterEqual: "Greater than or equal",
    equal: "Equal",
    notEqual: "Not equal",
    smaller: "Smaller than",
    smallerEqual: "Smaller than or equal",
    empty: "Empty",
    notEmpty: "Not empty"
};
const filters = Object.entries(filterDefs).map(([value, label]) => ({
    value,
    label
}));
function Container(props) {
    var _a, _b, _c, _d, _e;
    var _f;
    const id = ((_a = (_f = useRef()).current) !== null && _a !== void 0 ? _a : (_f.current = `NumberFilter${generateUUID()}`));
    const controller = useEditableFilterController({
        filter: props.filterStore,
        changeDelay: props.delay,
        defaultFilter: props.defaultFilter,
        defaultValue: (_b = props.defaultValue) === null || _b === void 0 ? void 0 : _b.value,
        disableInputs: fn => fn === "empty" || fn === "notEmpty"
    });
    useBasicSync(props, props.filterStore);
    return (createElement(InputWithFilters, { adjustable: props.adjustable, className: props.class, disableInputs: controller.disableInputs, filterFn: controller.selectedFn, filterFnList: filters, id: id, inputRef: controller.inputRef, inputStores: controller.inputs, name: props.name, onFilterChange: controller.handleFilterFnChange, placeholder: (_c = props.placeholder) === null || _c === void 0 ? void 0 : _c.value, screenReaderButtonCaption: (_d = props.screenReaderButtonCaption) === null || _d === void 0 ? void 0 : _d.value, screenReaderInputCaption: (_e = props.screenReaderInputCaption) === null || _e === void 0 ? void 0 : _e.value, styles: props.style, tabIndex: props.tabIndex, type: "number" }));
}
const NumberFilterContainer = observer$1(Container);

function isLoadingDefaultValues(props) {
    var _a;
    return ((_a = props.defaultValue) === null || _a === void 0 ? void 0 : _a.status) === "loading";
}

const Alert = ({
  className,
  bootstrapStyle,
  children,
  role
}) => Children.count(children) > 0 ? createElement("div", {
  className: classNames(`alert alert-${bootstrapStyle}`, className),
  role: role
}, children) : null;
Alert.displayName = "Alert";

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

var Code;
(function (Code) {
  Code[Code["EGRPINVALIDATTRS"] = 5] = "EGRPINVALIDATTRS";
  Code[Code["EGRPSTORECREATE"] = 4] = "EGRPSTORECREATE";
  Code[Code["EMISSINGSTORE"] = 2] = "EMISSINGSTORE";
  Code[Code["ENOCONTEXT"] = 1] = "ENOCONTEXT";
  Code[Code["ESTORETYPE"] = 3] = "ESTORETYPE";
  Code[Code["EGRPKEY"] = 6] = "EGRPKEY";
})(Code || (Code = {}));
const ENOCONTEXT = Object.freeze({
  code: Code.ENOCONTEXT,
  message: "The filter widget must be placed inside the column or header of the Data grid 2.0 or inside header of the Gallery widget."
});
const EMISSINGSTORE = Object.freeze({
  code: Code.EMISSINGSTORE,
  message: "Unable to get filter store. Check parent widget configuration."
});
const ESTORETYPE = Object.freeze({
  code: Code.ESTORETYPE,
  message: "The type of the filter and parent widget configuration is incompatible. The filter must " + "be used with correct attribute/group type."
});
const EGRPKEY = Object.freeze({
  code: Code.EGRPKEY,
  message: "Filter error: property 'Group key' is required."
});

/** @deprecated */
var FilterType;
(function (FilterType) {
  FilterType["STRING"] = "string";
  FilterType["NUMBER"] = "number";
  FilterType["ENUMERATION"] = "enum";
  FilterType["DATE"] = "date";
})(FilterType || (FilterType = {}));
const CONTEXT_OBJECT_PATH = "com.mendix.widgets.web.filterable.filterContext.v2";
function getGlobalFilterContextObject() {
  return window[CONTEXT_OBJECT_PATH] ??= createContext(null);
}
function useFilterContextValue() {
  const context = getGlobalFilterContextObject();
  const contextValue = useContext(context);
  if (contextValue == null) {
    return error(ENOCONTEXT);
  }
  return value(contextValue);
}
function getFilterStore(provider, legacyType, key) {
  switch (provider.type) {
    case "direct":
      return provider.store;
    case "key-value":
      return provider.get(key);
    case "legacy":
      return provider.get(legacyType);
    default:
      return null;
  }
}

function isNumberFilter(store) {
  return store.arg1.type === "number";
}

function useNumberFilterAPI(key) {
  const ctx = useFilterContextValue();
  const numAPI = useRef();
  if (ctx.hasError) {
    return error(ctx.error);
  }
  const api = ctx.value;
  if (api.provider.hasError) {
    return error(api.provider.error);
  }
  if (api.provider.value.type === "key-value" && key === "") {
    return error(EGRPKEY);
  }
  const store = getFilterStore(api.provider.value, FilterType.NUMBER, key);
  if (store === null) {
    return error(EMISSINGSTORE);
  }
  if (store.storeType === "optionlist" || !isNumberFilter(store)) {
    return error(ESTORETYPE);
  }
  return value(numAPI.current ??= {
    filterStore: store,
    parentChannelName: api.parentChannelName
  });
}

function withNumberFilterAPI(Component) {
    return function FilterAPIProvider(props) {
        const api = useNumberFilterAPI(props.groupKey);
        if (api.hasError) {
            return createElement(Alert, { bootstrapStyle: "danger" }, api.error.message);
        }
        return (createElement(Component, { filterStore: api.value.filterStore, parentChannelName: api.value.parentChannelName, ...props }));
    };
}

const container = withPreloader(NumberFilterContainer, isLoadingDefaultValues);
const Widget = withNumberFilterAPI(container);
function DatagridNumberFilter(props) {
    return createElement(Widget, { ...props });
}

export { DatagridNumberFilter as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWdyaWROdW1iZXJGaWx0ZXIubWpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zaGFyZWQvd2lkZ2V0LXBsdWdpbi1wbGF0Zm9ybS9kaXN0L2hvYy93aXRoUHJlbG9hZGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21vYnhANi4xMi4zX3BhdGNoX2hhc2g9aG4yNGhmeW52b3NydXIyNW1xY25heXl2cWkvbm9kZV9tb2R1bGVzL21vYngvZGlzdC9tb2J4LmVzbS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4LXJlYWN0LWxpdGVANC4wLjdfcGF0Y2hfaGFzaD16aXV3c2R0b2plc3pzdTR3NXpxZmNzNzQ1bV9tb2J4QDYuMTIuM19yZWFjdC1kb21AMTguMi4wX3JlYWN0QDE4LjIuMC9ub2RlX21vZHVsZXMvbW9ieC1yZWFjdC1saXRlL2VzL3V0aWxzL2Fzc2VydEVudmlyb25tZW50LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21vYngtcmVhY3QtbGl0ZUA0LjAuN19wYXRjaF9oYXNoPXppdXdzZHRvamVzenN1NHc1enFmY3M3NDVtX21vYnhANi4xMi4zX3JlYWN0LWRvbUAxOC4yLjBfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvb2JzZXJ2ZXJCYXRjaGluZy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4LXJlYWN0LWxpdGVANC4wLjdfcGF0Y2hfaGFzaD16aXV3c2R0b2plc3pzdTR3NXpxZmNzNzQ1bV9tb2J4QDYuMTIuM19yZWFjdC1kb21AMTguMi4wX3JlYWN0QDE4LjIuMC9ub2RlX21vZHVsZXMvbW9ieC1yZWFjdC1saXRlL2VzL3V0aWxzL3ByaW50RGVidWdWYWx1ZS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4LXJlYWN0LWxpdGVANC4wLjdfcGF0Y2hfaGFzaD16aXV3c2R0b2plc3pzdTR3NXpxZmNzNzQ1bV9tb2J4QDYuMTIuM19yZWFjdC1kb21AMTguMi4wX3JlYWN0QDE4LjIuMC9ub2RlX21vZHVsZXMvbW9ieC1yZWFjdC1saXRlL2VzL3V0aWxzL1VuaXZlcnNhbEZpbmFsaXphdGlvblJlZ2lzdHJ5LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21vYngtcmVhY3QtbGl0ZUA0LjAuN19wYXRjaF9oYXNoPXppdXdzZHRvamVzenN1NHc1enFmY3M3NDVtX21vYnhANi4xMi4zX3JlYWN0LWRvbUAxOC4yLjBfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4LXJlYWN0LWxpdGVANC4wLjdfcGF0Y2hfaGFzaD16aXV3c2R0b2plc3pzdTR3NXpxZmNzNzQ1bV9tb2J4QDYuMTIuM19yZWFjdC1kb21AMTguMi4wX3JlYWN0QDE4LjIuMC9ub2RlX21vZHVsZXMvbW9ieC1yZWFjdC1saXRlL2VzL3VzZU9ic2VydmVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21vYngtcmVhY3QtbGl0ZUA0LjAuN19wYXRjaF9oYXNoPXppdXdzZHRvamVzenN1NHc1enFmY3M3NDVtX21vYnhANi4xMi4zX3JlYWN0LWRvbUAxOC4yLjBfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvb2JzZXJ2ZXIuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9eml1d3NkdG9qZXN6c3U0dzV6cWZjczc0NW1fbW9ieEA2LjEyLjNfcmVhY3QtZG9tQDE4LjIuMF9yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL21vYngtcmVhY3QtbGl0ZS9lcy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLXBsYXRmb3JtL2Rpc3QvdXRpbHMvZGVib3VuY2UuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zaGFyZWQvd2lkZ2V0LXBsdWdpbi1maWx0ZXJpbmcvZGlzdC9zdG9yZXMvSW5wdXRTdG9yZS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLWZpbHRlcmluZy9kaXN0L2NvbnRyb2xsZXJzL0VkaXRhYmxlRmlsdGVyQ29udHJvbGxlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLWZpbHRlcmluZy9kaXN0L2hlbHBlcnMvdXNlRWRpdGFibGVGaWx0ZXJDb250cm9sbGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tZmlsdGVyaW5nL2Rpc3QvaGVscGVycy91c2VCYXNpY1N5bmMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9eml1d3NkdG9qZXN6c3U0dzV6cWZjczc0NW1fbW9ieEA2LjEyLjNfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvYXNzZXJ0RW52aXJvbm1lbnQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9eml1d3NkdG9qZXN6c3U0dzV6cWZjczc0NW1fbW9ieEA2LjEyLjNfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvb2JzZXJ2ZXJCYXRjaGluZy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4LXJlYWN0LWxpdGVANC4wLjdfcGF0Y2hfaGFzaD16aXV3c2R0b2plc3pzdTR3NXpxZmNzNzQ1bV9tb2J4QDYuMTIuM19yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL21vYngtcmVhY3QtbGl0ZS9lcy91dGlscy9wcmludERlYnVnVmFsdWUuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9eml1d3NkdG9qZXN6c3U0dzV6cWZjczc0NW1fbW9ieEA2LjEyLjNfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvVW5pdmVyc2FsRmluYWxpemF0aW9uUmVnaXN0cnkuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9eml1d3NkdG9qZXN6c3U0dzV6cWZjczc0NW1fbW9ieEA2LjEyLjNfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4LXJlYWN0LWxpdGVANC4wLjdfcGF0Y2hfaGFzaD16aXV3c2R0b2plc3pzdTR3NXpxZmNzNzQ1bV9tb2J4QDYuMTIuM19yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL21vYngtcmVhY3QtbGl0ZS9lcy91c2VPYnNlcnZlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4LXJlYWN0LWxpdGVANC4wLjdfcGF0Y2hfaGFzaD16aXV3c2R0b2plc3pzdTR3NXpxZmNzNzQ1bV9tb2J4QDYuMTIuM19yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL21vYngtcmVhY3QtbGl0ZS9lcy9vYnNlcnZlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4LXJlYWN0LWxpdGVANC4wLjdfcGF0Y2hfaGFzaD16aXV3c2R0b2plc3pzdTR3NXpxZmNzNzQ1bV9tb2J4QDYuMTIuM19yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL21vYngtcmVhY3QtbGl0ZS9lcy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9jbGFzc25hbWVzQDIuMy4yL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tZmlsdGVyLXNlbGVjdG9yL2Rpc3QvdXNlUG9zaXRpb25PYnNlcnZlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLWZpbHRlci1zZWxlY3Rvci9kaXN0L0ZpbHRlclNlbGVjdG9yLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tZmlsdGVyaW5nL2Rpc3QvY29udHJvbHMvc2hhcmVkLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tZmlsdGVyaW5nL2Rpc3QvY29udHJvbHMvaW5wdXQvSW5wdXRXaXRoRmlsdGVycy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLXBsYXRmb3JtL2Rpc3QvZnJhbWV3b3JrL2dlbmVyYXRlLXV1aWQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9OdW1iZXJGaWx0ZXJDb250YWluZXIudHN4IiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL3V0aWxzL3dpZGdldC11dGlscy50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLWNvbXBvbmVudC1raXQvZGlzdC9BbGVydC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLWZpbHRlcmluZy9kaXN0L3Jlc3VsdC1tZXRhLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tZmlsdGVyaW5nL2Rpc3QvZXJyb3JzLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tZmlsdGVyaW5nL2Rpc3QvY29udGV4dC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLWZpbHRlcmluZy9kaXN0L3N0b3Jlcy9zdG9yZS11dGlscy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLWZpbHRlcmluZy9kaXN0L2hlbHBlcnMvdXNlTnVtYmVyRmlsdGVyQVBJLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2hvY3Mvd2l0aE51bWJlckZpbHRlckFQSS50c3giLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvRGF0YWdyaWROdW1iZXJGaWx0ZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIHVzZVJlZiwgRnJhZ21lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmV4cG9ydCBmdW5jdGlvbiB3aXRoUHJlbG9hZGVyKENvbXBvbmVudCwgaXNMb2FkaW5nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIFByZWxvYWRlcihwcm9wcykge1xuICAgICAgICBjb25zdCBpc0xvYWRlZCA9ICh1c2VSZWYoZmFsc2UpLmN1cnJlbnQgfHw9ICFpc0xvYWRpbmcocHJvcHMpKTtcbiAgICAgICAgcmV0dXJuIGlzTG9hZGVkID8gY3JlYXRlRWxlbWVudChDb21wb25lbnQsIHsgLi4ucHJvcHMgfSkgOiBjcmVhdGVFbGVtZW50KEZyYWdtZW50LCBudWxsKTtcbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9d2l0aFByZWxvYWRlci5qcy5tYXAiLCJ2YXIgbmljZUVycm9ycyA9IHtcbiAgMDogXCJJbnZhbGlkIHZhbHVlIGZvciBjb25maWd1cmF0aW9uICdlbmZvcmNlQWN0aW9ucycsIGV4cGVjdGVkICduZXZlcicsICdhbHdheXMnIG9yICdvYnNlcnZlZCdcIixcbiAgMTogZnVuY3Rpb24gXyhhbm5vdGF0aW9uVHlwZSwga2V5KSB7XG4gICAgcmV0dXJuIFwiQ2Fubm90IGFwcGx5ICdcIiArIGFubm90YXRpb25UeXBlICsgXCInIHRvICdcIiArIGtleS50b1N0cmluZygpICsgXCInOiBGaWVsZCBub3QgZm91bmQuXCI7XG4gIH0sXG4gIC8qXG4gIDIocHJvcCkge1xuICAgICAgcmV0dXJuIGBpbnZhbGlkIGRlY29yYXRvciBmb3IgJyR7cHJvcC50b1N0cmluZygpfSdgXG4gIH0sXG4gIDMocHJvcCkge1xuICAgICAgcmV0dXJuIGBDYW5ub3QgZGVjb3JhdGUgJyR7cHJvcC50b1N0cmluZygpfSc6IGFjdGlvbiBjYW4gb25seSBiZSB1c2VkIG9uIHByb3BlcnRpZXMgd2l0aCBhIGZ1bmN0aW9uIHZhbHVlLmBcbiAgfSxcbiAgNChwcm9wKSB7XG4gICAgICByZXR1cm4gYENhbm5vdCBkZWNvcmF0ZSAnJHtwcm9wLnRvU3RyaW5nKCl9JzogY29tcHV0ZWQgY2FuIG9ubHkgYmUgdXNlZCBvbiBnZXR0ZXIgcHJvcGVydGllcy5gXG4gIH0sXG4gICovXG4gIDU6IFwiJ2tleXMoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cywgc2V0cyBhbmQgbWFwc1wiLFxuICA2OiBcIid2YWx1ZXMoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cywgc2V0cyBhbmQgbWFwc1wiLFxuICA3OiBcIidlbnRyaWVzKCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMgYW5kIG1hcHNcIixcbiAgODogXCInc2V0KCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMgYW5kIG1hcHNcIixcbiAgOTogXCIncmVtb3ZlKCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMgYW5kIG1hcHNcIixcbiAgMTA6IFwiJ2hhcygpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzIGFuZCBtYXBzXCIsXG4gIDExOiBcIidnZXQoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cyBhbmQgbWFwc1wiLFxuICAxMjogXCJJbnZhbGlkIGFubm90YXRpb25cIixcbiAgMTM6IFwiRHluYW1pYyBvYnNlcnZhYmxlIG9iamVjdHMgY2Fubm90IGJlIGZyb3plbi4gSWYgeW91J3JlIHBhc3Npbmcgb2JzZXJ2YWJsZXMgdG8gM3JkIHBhcnR5IGNvbXBvbmVudC9mdW5jdGlvbiB0aGF0IGNhbGxzIE9iamVjdC5mcmVlemUsIHBhc3MgY29weSBpbnN0ZWFkOiB0b0pTKG9ic2VydmFibGUpXCIsXG4gIDE0OiBcIkludGVyY2VwdCBoYW5kbGVycyBzaG91bGQgcmV0dXJuIG5vdGhpbmcgb3IgYSBjaGFuZ2Ugb2JqZWN0XCIsXG4gIDE1OiBcIk9ic2VydmFibGUgYXJyYXlzIGNhbm5vdCBiZSBmcm96ZW4uIElmIHlvdSdyZSBwYXNzaW5nIG9ic2VydmFibGVzIHRvIDNyZCBwYXJ0eSBjb21wb25lbnQvZnVuY3Rpb24gdGhhdCBjYWxscyBPYmplY3QuZnJlZXplLCBwYXNzIGNvcHkgaW5zdGVhZDogdG9KUyhvYnNlcnZhYmxlKVwiLFxuICAxNjogXCJNb2RpZmljYXRpb24gZXhjZXB0aW9uOiB0aGUgaW50ZXJuYWwgc3RydWN0dXJlIG9mIGFuIG9ic2VydmFibGUgYXJyYXkgd2FzIGNoYW5nZWQuXCIsXG4gIDE3OiBmdW5jdGlvbiBfKGluZGV4LCBsZW5ndGgpIHtcbiAgICByZXR1cm4gXCJbbW9ieC5hcnJheV0gSW5kZXggb3V0IG9mIGJvdW5kcywgXCIgKyBpbmRleCArIFwiIGlzIGxhcmdlciB0aGFuIFwiICsgbGVuZ3RoO1xuICB9LFxuICAxODogXCJtb2J4Lm1hcCByZXF1aXJlcyBNYXAgcG9seWZpbGwgZm9yIHRoZSBjdXJyZW50IGJyb3dzZXIuIENoZWNrIGJhYmVsLXBvbHlmaWxsIG9yIGNvcmUtanMvZXM2L21hcC5qc1wiLFxuICAxOTogZnVuY3Rpb24gXyhvdGhlcikge1xuICAgIHJldHVybiBcIkNhbm5vdCBpbml0aWFsaXplIGZyb20gY2xhc3NlcyB0aGF0IGluaGVyaXQgZnJvbSBNYXA6IFwiICsgb3RoZXIuY29uc3RydWN0b3IubmFtZTtcbiAgfSxcbiAgMjA6IGZ1bmN0aW9uIF8ob3RoZXIpIHtcbiAgICByZXR1cm4gXCJDYW5ub3QgaW5pdGlhbGl6ZSBtYXAgZnJvbSBcIiArIG90aGVyO1xuICB9LFxuICAyMTogZnVuY3Rpb24gXyhkYXRhU3RydWN0dXJlKSB7XG4gICAgcmV0dXJuIFwiQ2Fubm90IGNvbnZlcnQgdG8gbWFwIGZyb20gJ1wiICsgZGF0YVN0cnVjdHVyZSArIFwiJ1wiO1xuICB9LFxuICAyMjogXCJtb2J4LnNldCByZXF1aXJlcyBTZXQgcG9seWZpbGwgZm9yIHRoZSBjdXJyZW50IGJyb3dzZXIuIENoZWNrIGJhYmVsLXBvbHlmaWxsIG9yIGNvcmUtanMvZXM2L3NldC5qc1wiLFxuICAyMzogXCJJdCBpcyBub3QgcG9zc2libGUgdG8gZ2V0IGluZGV4IGF0b21zIGZyb20gYXJyYXlzXCIsXG4gIDI0OiBmdW5jdGlvbiBfKHRoaW5nKSB7XG4gICAgcmV0dXJuIFwiQ2Fubm90IG9idGFpbiBhZG1pbmlzdHJhdGlvbiBmcm9tIFwiICsgdGhpbmc7XG4gIH0sXG4gIDI1OiBmdW5jdGlvbiBfKHByb3BlcnR5LCBuYW1lKSB7XG4gICAgcmV0dXJuIFwidGhlIGVudHJ5ICdcIiArIHByb3BlcnR5ICsgXCInIGRvZXMgbm90IGV4aXN0IGluIHRoZSBvYnNlcnZhYmxlIG1hcCAnXCIgKyBuYW1lICsgXCInXCI7XG4gIH0sXG4gIDI2OiBcInBsZWFzZSBzcGVjaWZ5IGEgcHJvcGVydHlcIixcbiAgMjc6IGZ1bmN0aW9uIF8ocHJvcGVydHksIG5hbWUpIHtcbiAgICByZXR1cm4gXCJubyBvYnNlcnZhYmxlIHByb3BlcnR5ICdcIiArIHByb3BlcnR5LnRvU3RyaW5nKCkgKyBcIicgZm91bmQgb24gdGhlIG9ic2VydmFibGUgb2JqZWN0ICdcIiArIG5hbWUgKyBcIidcIjtcbiAgfSxcbiAgMjg6IGZ1bmN0aW9uIF8odGhpbmcpIHtcbiAgICByZXR1cm4gXCJDYW5ub3Qgb2J0YWluIGF0b20gZnJvbSBcIiArIHRoaW5nO1xuICB9LFxuICAyOTogXCJFeHBlY3Rpbmcgc29tZSBvYmplY3RcIixcbiAgMzA6IFwiaW52YWxpZCBhY3Rpb24gc3RhY2suIGRpZCB5b3UgZm9yZ2V0IHRvIGZpbmlzaCBhbiBhY3Rpb24/XCIsXG4gIDMxOiBcIm1pc3Npbmcgb3B0aW9uIGZvciBjb21wdXRlZDogZ2V0XCIsXG4gIDMyOiBmdW5jdGlvbiBfKG5hbWUsIGRlcml2YXRpb24pIHtcbiAgICByZXR1cm4gXCJDeWNsZSBkZXRlY3RlZCBpbiBjb21wdXRhdGlvbiBcIiArIG5hbWUgKyBcIjogXCIgKyBkZXJpdmF0aW9uO1xuICB9LFxuICAzMzogZnVuY3Rpb24gXyhuYW1lKSB7XG4gICAgcmV0dXJuIFwiVGhlIHNldHRlciBvZiBjb21wdXRlZCB2YWx1ZSAnXCIgKyBuYW1lICsgXCInIGlzIHRyeWluZyB0byB1cGRhdGUgaXRzZWxmLiBEaWQgeW91IGludGVuZCB0byB1cGRhdGUgYW4gX29ic2VydmFibGVfIHZhbHVlLCBpbnN0ZWFkIG9mIHRoZSBjb21wdXRlZCBwcm9wZXJ0eT9cIjtcbiAgfSxcbiAgMzQ6IGZ1bmN0aW9uIF8obmFtZSkge1xuICAgIHJldHVybiBcIltDb21wdXRlZFZhbHVlICdcIiArIG5hbWUgKyBcIiddIEl0IGlzIG5vdCBwb3NzaWJsZSB0byBhc3NpZ24gYSBuZXcgdmFsdWUgdG8gYSBjb21wdXRlZCB2YWx1ZS5cIjtcbiAgfSxcbiAgMzU6IFwiVGhlcmUgYXJlIG11bHRpcGxlLCBkaWZmZXJlbnQgdmVyc2lvbnMgb2YgTW9iWCBhY3RpdmUuIE1ha2Ugc3VyZSBNb2JYIGlzIGxvYWRlZCBvbmx5IG9uY2Ugb3IgdXNlIGBjb25maWd1cmUoeyBpc29sYXRlR2xvYmFsU3RhdGU6IHRydWUgfSlgXCIsXG4gIDM2OiBcImlzb2xhdGVHbG9iYWxTdGF0ZSBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBNb2JYIGlzIHJ1bm5pbmcgYW55IHJlYWN0aW9uc1wiLFxuICAzNzogZnVuY3Rpb24gXyhtZXRob2QpIHtcbiAgICByZXR1cm4gXCJbbW9ieF0gYG9ic2VydmFibGVBcnJheS5cIiArIG1ldGhvZCArIFwiKClgIG11dGF0ZXMgdGhlIGFycmF5IGluLXBsYWNlLCB3aGljaCBpcyBub3QgYWxsb3dlZCBpbnNpZGUgYSBkZXJpdmF0aW9uLiBVc2UgYGFycmF5LnNsaWNlKCkuXCIgKyBtZXRob2QgKyBcIigpYCBpbnN0ZWFkXCI7XG4gIH0sXG4gIDM4OiBcIidvd25LZXlzKCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzXCIsXG4gIDM5OiBcIidkZWZpbmVQcm9wZXJ0eSgpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0c1wiXG59O1xudmFyIGVycm9ycyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IG5pY2VFcnJvcnMgOiB7fTtcbmZ1bmN0aW9uIGRpZShlcnJvcikge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIHZhciBlID0gdHlwZW9mIGVycm9yID09PSBcInN0cmluZ1wiID8gZXJyb3IgOiBlcnJvcnNbZXJyb3JdO1xuICAgIGlmICh0eXBlb2YgZSA9PT0gXCJmdW5jdGlvblwiKSBlID0gZS5hcHBseShudWxsLCBhcmdzKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJbTW9iWF0gXCIgKyBlKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IodHlwZW9mIGVycm9yID09PSBcIm51bWJlclwiID8gXCJbTW9iWF0gbWluaWZpZWQgZXJyb3IgbnI6IFwiICsgZXJyb3IgKyAoYXJncy5sZW5ndGggPyBcIiBcIiArIGFyZ3MubWFwKFN0cmluZykuam9pbihcIixcIikgOiBcIlwiKSArIFwiLiBGaW5kIHRoZSBmdWxsIGVycm9yIGF0OiBodHRwczovL2dpdGh1Yi5jb20vbW9ieGpzL21vYngvYmxvYi9tYWluL3BhY2thZ2VzL21vYngvc3JjL2Vycm9ycy50c1wiIDogXCJbTW9iWF0gXCIgKyBlcnJvcik7XG59XG5cbnZhciBtb2NrR2xvYmFsID0ge307XG5mdW5jdGlvbiBnZXRHbG9iYWwoKSB7XG4gIGlmICh0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiBnbG9iYWxUaGlzO1xuICB9XG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHdpbmRvdztcbiAgfVxuICBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiBnbG9iYWw7XG4gIH1cbiAgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cbiAgcmV0dXJuIG1vY2tHbG9iYWw7XG59XG5cbi8vIFdlIHNob3J0ZW4gYW55dGhpbmcgdXNlZCA+IDUgdGltZXNcbnZhciBhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xudmFyIGdldERlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIG9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG52YXIgRU1QVFlfQVJSQVkgPSBbXTtcbk9iamVjdC5mcmVlemUoRU1QVFlfQVJSQVkpO1xudmFyIEVNUFRZX09CSkVDVCA9IHt9O1xuT2JqZWN0LmZyZWV6ZShFTVBUWV9PQkpFQ1QpO1xudmFyIGhhc1Byb3h5ID0gdHlwZW9mIFByb3h5ICE9PSBcInVuZGVmaW5lZFwiO1xudmFyIHBsYWluT2JqZWN0U3RyaW5nID0gLyojX19QVVJFX18qL09iamVjdC50b1N0cmluZygpO1xuZnVuY3Rpb24gYXNzZXJ0UHJveGllcygpIHtcbiAgaWYgKCFoYXNQcm94eSkge1xuICAgIGRpZShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcImBQcm94eWAgb2JqZWN0cyBhcmUgbm90IGF2YWlsYWJsZSBpbiB0aGUgY3VycmVudCBlbnZpcm9ubWVudC4gUGxlYXNlIGNvbmZpZ3VyZSBNb2JYIHRvIGVuYWJsZSBhIGZhbGxiYWNrIGltcGxlbWVudGF0aW9uLmBcIiA6IFwiUHJveHkgbm90IGF2YWlsYWJsZVwiKTtcbiAgfVxufVxuZnVuY3Rpb24gd2FybkFib3V0UHJveHlSZXF1aXJlbWVudChtc2cpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBnbG9iYWxTdGF0ZS52ZXJpZnlQcm94aWVzKSB7XG4gICAgZGllKFwiTW9iWCBpcyBjdXJyZW50bHkgY29uZmlndXJlZCB0byBiZSBhYmxlIHRvIHJ1biBpbiBFUzUgbW9kZSwgYnV0IGluIEVTNSBNb2JYIHdvbid0IGJlIGFibGUgdG8gXCIgKyBtc2cpO1xuICB9XG59XG5mdW5jdGlvbiBnZXROZXh0SWQoKSB7XG4gIHJldHVybiArK2dsb2JhbFN0YXRlLm1vYnhHdWlkO1xufVxuLyoqXG4gKiBNYWtlcyBzdXJlIHRoYXQgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIGlzIGludm9rZWQgYXQgbW9zdCBvbmNlLlxuICovXG5mdW5jdGlvbiBvbmNlKGZ1bmMpIHtcbiAgdmFyIGludm9rZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoaW52b2tlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpbnZva2VkID0gdHJ1ZTtcbiAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxudmFyIG5vb3AgPSBmdW5jdGlvbiBub29wKCkge307XG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZuKSB7XG4gIHJldHVybiB0eXBlb2YgZm4gPT09IFwiZnVuY3Rpb25cIjtcbn1cbmZ1bmN0aW9uIGlzU3RyaW5naXNoKHZhbHVlKSB7XG4gIHZhciB0ID0gdHlwZW9mIHZhbHVlO1xuICBzd2l0Y2ggKHQpIHtcbiAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgY2FzZSBcInN5bWJvbFwiOlxuICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSk7XG4gIGlmIChwcm90byA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIHByb3RvQ29uc3RydWN0b3IgPSBPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgXCJjb25zdHJ1Y3RvclwiKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuIHR5cGVvZiBwcm90b0NvbnN0cnVjdG9yID09PSBcImZ1bmN0aW9uXCIgJiYgcHJvdG9Db25zdHJ1Y3Rvci50b1N0cmluZygpID09PSBwbGFpbk9iamVjdFN0cmluZztcbn1cbi8vIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zNzg2NTE3MFxuZnVuY3Rpb24gaXNHZW5lcmF0b3Iob2JqKSB7XG4gIHZhciBjb25zdHJ1Y3RvciA9IG9iaiA9PSBudWxsID8gdm9pZCAwIDogb2JqLmNvbnN0cnVjdG9yO1xuICBpZiAoIWNvbnN0cnVjdG9yKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChcIkdlbmVyYXRvckZ1bmN0aW9uXCIgPT09IGNvbnN0cnVjdG9yLm5hbWUgfHwgXCJHZW5lcmF0b3JGdW5jdGlvblwiID09PSBjb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGFkZEhpZGRlblByb3Aob2JqZWN0LCBwcm9wTmFtZSwgdmFsdWUpIHtcbiAgZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wTmFtZSwge1xuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfSk7XG59XG5mdW5jdGlvbiBhZGRIaWRkZW5GaW5hbFByb3Aob2JqZWN0LCBwcm9wTmFtZSwgdmFsdWUpIHtcbiAgZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wTmFtZSwge1xuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IHZhbHVlXG4gIH0pO1xufVxuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZShuYW1lLCB0aGVDbGFzcykge1xuICB2YXIgcHJvcE5hbWUgPSBcImlzTW9iWFwiICsgbmFtZTtcbiAgdGhlQ2xhc3MucHJvdG90eXBlW3Byb3BOYW1lXSA9IHRydWU7XG4gIHJldHVybiBmdW5jdGlvbiAoeCkge1xuICAgIHJldHVybiBpc09iamVjdCh4KSAmJiB4W3Byb3BOYW1lXSA9PT0gdHJ1ZTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGlzRVM2TWFwKHRoaW5nKSB7XG4gIHJldHVybiB0aGluZyBpbnN0YW5jZW9mIE1hcDtcbn1cbmZ1bmN0aW9uIGlzRVM2U2V0KHRoaW5nKSB7XG4gIHJldHVybiB0aGluZyBpbnN0YW5jZW9mIFNldDtcbn1cbnZhciBoYXNHZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAhPT0gXCJ1bmRlZmluZWRcIjtcbi8qKlxuICogUmV0dXJucyB0aGUgZm9sbG93aW5nOiBvd24gZW51bWVyYWJsZSBrZXlzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBnZXRQbGFpbk9iamVjdEtleXMob2JqZWN0KSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqZWN0KTtcbiAgLy8gTm90IHN1cHBvcnRlZCBpbiBJRSwgc28gdGhlcmUgYXJlIG5vdCBnb2luZyB0byBiZSBzeW1ib2wgcHJvcHMgYW55d2F5Li4uXG4gIGlmICghaGFzR2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgcmV0dXJuIGtleXM7XG4gIH1cbiAgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCk7XG4gIGlmICghc3ltYm9scy5sZW5ndGgpIHtcbiAgICByZXR1cm4ga2V5cztcbiAgfVxuICByZXR1cm4gW10uY29uY2F0KGtleXMsIHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uIChzKSB7XG4gICAgcmV0dXJuIG9iamVjdFByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iamVjdCwgcyk7XG4gIH0pKTtcbn1cbi8vIEZyb20gSW1tZXIgdXRpbHNcbi8vIFJldHVybnMgYWxsIG93biBrZXlzLCBpbmNsdWRpbmcgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbGljXG52YXIgb3duS2V5cyA9IHR5cGVvZiBSZWZsZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIFJlZmxlY3Qub3duS2V5cyA/IFJlZmxlY3Qub3duS2V5cyA6IGhhc0dldE93blByb3BlcnR5U3ltYm9scyA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKSk7XG59IDogLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbmZ1bmN0aW9uIHN0cmluZ2lmeUtleShrZXkpIHtcbiAgaWYgKHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4ga2V5O1xuICB9XG4gIGlmICh0eXBlb2Yga2V5ID09PSBcInN5bWJvbFwiKSB7XG4gICAgcmV0dXJuIGtleS50b1N0cmluZygpO1xuICB9XG4gIHJldHVybiBuZXcgU3RyaW5nKGtleSkudG9TdHJpbmcoKTtcbn1cbmZ1bmN0aW9uIHRvUHJpbWl0aXZlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgPyBcIlwiICsgdmFsdWUgOiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGhhc1Byb3AodGFyZ2V0LCBwcm9wKSB7XG4gIHJldHVybiBvYmplY3RQcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsIHByb3ApO1xufVxuLy8gRnJvbSBJbW1lciB1dGlsc1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHRhcmdldCkge1xuICAvLyBQb2x5ZmlsbCBuZWVkZWQgZm9yIEhlcm1lcyBhbmQgSUUsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svaGVybWVzL2lzc3Vlcy8yNzRcbiAgdmFyIHJlcyA9IHt9O1xuICAvLyBOb3RlOiB3aXRob3V0IHBvbHlmaWxsIGZvciBvd25LZXlzLCBzeW1ib2xzIHdvbid0IGJlIHBpY2tlZCB1cFxuICBvd25LZXlzKHRhcmdldCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmVzW2tleV0gPSBnZXREZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgfSk7XG4gIHJldHVybiByZXM7XG59O1xuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBfdG9Qcm9wZXJ0eUtleShkZXNjcmlwdG9yLmtleSksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiA/IE9iamVjdC5hc3NpZ24uYmluZCgpIDogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7XG4gIF9zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcyk7XG59XG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2YuYmluZCgpIDogZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgICBvLl9fcHJvdG9fXyA9IHA7XG4gICAgcmV0dXJuIG87XG4gIH07XG4gIHJldHVybiBfc2V0UHJvdG90eXBlT2YobywgcCk7XG59XG5mdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuICByZXR1cm4gc2VsZjtcbn1cbmZ1bmN0aW9uIF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvLCBtaW5MZW4pIHtcbiAgaWYgKCFvKSByZXR1cm47XG4gIGlmICh0eXBlb2YgbyA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG4gIHZhciBuID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcbiAgaWYgKG4gPT09IFwiT2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvcikgbiA9IG8uY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKG4gPT09IFwiTWFwXCIgfHwgbiA9PT0gXCJTZXRcIikgcmV0dXJuIEFycmF5LmZyb20obyk7XG4gIGlmIChuID09PSBcIkFyZ3VtZW50c1wiIHx8IC9eKD86VWl8SSludCg/Ojh8MTZ8MzIpKD86Q2xhbXBlZCk/QXJyYXkkLy50ZXN0KG4pKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTtcbn1cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7XG4gIGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIGFycjJbaV0gPSBhcnJbaV07XG4gIHJldHVybiBhcnIyO1xufVxuZnVuY3Rpb24gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShvLCBhbGxvd0FycmF5TGlrZSkge1xuICB2YXIgaXQgPSB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSB8fCBvW1wiQEBpdGVyYXRvclwiXTtcbiAgaWYgKGl0KSByZXR1cm4gKGl0ID0gaXQuY2FsbChvKSkubmV4dC5iaW5kKGl0KTtcbiAgaWYgKEFycmF5LmlzQXJyYXkobykgfHwgKGl0ID0gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8pKSB8fCBhbGxvd0FycmF5TGlrZSAmJiBvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikge1xuICAgIGlmIChpdCkgbyA9IGl0O1xuICAgIHZhciBpID0gMDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGkgPj0gby5sZW5ndGgpIHJldHVybiB7XG4gICAgICAgIGRvbmU6IHRydWVcbiAgICAgIH07XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkb25lOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IG9baSsrXVxuICAgICAgfTtcbiAgICB9O1xuICB9XG4gIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gaXRlcmF0ZSBub24taXRlcmFibGUgaW5zdGFuY2UuXFxuSW4gb3JkZXIgdG8gYmUgaXRlcmFibGUsIG5vbi1hcnJheSBvYmplY3RzIG11c3QgaGF2ZSBhIFtTeW1ib2wuaXRlcmF0b3JdKCkgbWV0aG9kLlwiKTtcbn1cbmZ1bmN0aW9uIF90b1ByaW1pdGl2ZShpbnB1dCwgaGludCkge1xuICBpZiAodHlwZW9mIGlucHV0ICE9PSBcIm9iamVjdFwiIHx8IGlucHV0ID09PSBudWxsKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBwcmltID0gaW5wdXRbU3ltYm9sLnRvUHJpbWl0aXZlXTtcbiAgaWYgKHByaW0gIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciByZXMgPSBwcmltLmNhbGwoaW5wdXQsIGhpbnQgfHwgXCJkZWZhdWx0XCIpO1xuICAgIGlmICh0eXBlb2YgcmVzICE9PSBcIm9iamVjdFwiKSByZXR1cm4gcmVzO1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJAQHRvUHJpbWl0aXZlIG11c3QgcmV0dXJuIGEgcHJpbWl0aXZlIHZhbHVlLlwiKTtcbiAgfVxuICByZXR1cm4gKGhpbnQgPT09IFwic3RyaW5nXCIgPyBTdHJpbmcgOiBOdW1iZXIpKGlucHV0KTtcbn1cbmZ1bmN0aW9uIF90b1Byb3BlcnR5S2V5KGFyZykge1xuICB2YXIga2V5ID0gX3RvUHJpbWl0aXZlKGFyZywgXCJzdHJpbmdcIik7XG4gIHJldHVybiB0eXBlb2Yga2V5ID09PSBcInN5bWJvbFwiID8ga2V5IDogU3RyaW5nKGtleSk7XG59XG5cbnZhciBzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbCA9IC8qI19fUFVSRV9fKi9TeW1ib2woXCJtb2J4LXN0b3JlZC1hbm5vdGF0aW9uc1wiKTtcbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgYWN0cyBhc1xuICogLSBkZWNvcmF0b3JcbiAqIC0gYW5ub3RhdGlvbiBvYmplY3RcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRGVjb3JhdG9yQW5ub3RhdGlvbihhbm5vdGF0aW9uKSB7XG4gIGZ1bmN0aW9uIGRlY29yYXRvcih0YXJnZXQsIHByb3BlcnR5KSB7XG4gICAgaWYgKGlzMjAyMjNEZWNvcmF0b3IocHJvcGVydHkpKSB7XG4gICAgICByZXR1cm4gYW5ub3RhdGlvbi5kZWNvcmF0ZV8yMDIyM18odGFyZ2V0LCBwcm9wZXJ0eSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0b3JlQW5ub3RhdGlvbih0YXJnZXQsIHByb3BlcnR5LCBhbm5vdGF0aW9uKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oZGVjb3JhdG9yLCBhbm5vdGF0aW9uKTtcbn1cbi8qKlxuICogU3RvcmVzIGFubm90YXRpb24gdG8gcHJvdG90eXBlLFxuICogc28gaXQgY2FuIGJlIGluc3BlY3RlZCBsYXRlciBieSBgbWFrZU9ic2VydmFibGVgIGNhbGxlZCBmcm9tIGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIHN0b3JlQW5ub3RhdGlvbihwcm90b3R5cGUsIGtleSwgYW5ub3RhdGlvbikge1xuICBpZiAoIWhhc1Byb3AocHJvdG90eXBlLCBzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbCkpIHtcbiAgICBhZGRIaWRkZW5Qcm9wKHByb3RvdHlwZSwgc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2wsIF9leHRlbmRzKHt9LCBwcm90b3R5cGVbc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2xdKSk7XG4gIH1cbiAgLy8gQG92ZXJyaWRlIG11c3Qgb3ZlcnJpZGUgc29tZXRoaW5nXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgaXNPdmVycmlkZShhbm5vdGF0aW9uKSAmJiAhaGFzUHJvcChwcm90b3R5cGVbc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2xdLCBrZXkpKSB7XG4gICAgdmFyIGZpZWxkTmFtZSA9IHByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lICsgXCIucHJvdG90eXBlLlwiICsga2V5LnRvU3RyaW5nKCk7XG4gICAgZGllKFwiJ1wiICsgZmllbGROYW1lICsgXCInIGlzIGRlY29yYXRlZCB3aXRoICdvdmVycmlkZScsIFwiICsgXCJidXQgbm8gc3VjaCBkZWNvcmF0ZWQgbWVtYmVyIHdhcyBmb3VuZCBvbiBwcm90b3R5cGUuXCIpO1xuICB9XG4gIC8vIENhbm5vdCByZS1kZWNvcmF0ZVxuICBhc3NlcnROb3REZWNvcmF0ZWQocHJvdG90eXBlLCBhbm5vdGF0aW9uLCBrZXkpO1xuICAvLyBJZ25vcmUgb3ZlcnJpZGVcbiAgaWYgKCFpc092ZXJyaWRlKGFubm90YXRpb24pKSB7XG4gICAgcHJvdG90eXBlW3N0b3JlZEFubm90YXRpb25zU3ltYm9sXVtrZXldID0gYW5ub3RhdGlvbjtcbiAgfVxufVxuZnVuY3Rpb24gYXNzZXJ0Tm90RGVjb3JhdGVkKHByb3RvdHlwZSwgYW5ub3RhdGlvbiwga2V5KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWlzT3ZlcnJpZGUoYW5ub3RhdGlvbikgJiYgaGFzUHJvcChwcm90b3R5cGVbc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2xdLCBrZXkpKSB7XG4gICAgdmFyIGZpZWxkTmFtZSA9IHByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lICsgXCIucHJvdG90eXBlLlwiICsga2V5LnRvU3RyaW5nKCk7XG4gICAgdmFyIGN1cnJlbnRBbm5vdGF0aW9uVHlwZSA9IHByb3RvdHlwZVtzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbF1ba2V5XS5hbm5vdGF0aW9uVHlwZV87XG4gICAgdmFyIHJlcXVlc3RlZEFubm90YXRpb25UeXBlID0gYW5ub3RhdGlvbi5hbm5vdGF0aW9uVHlwZV87XG4gICAgZGllKFwiQ2Fubm90IGFwcGx5ICdAXCIgKyByZXF1ZXN0ZWRBbm5vdGF0aW9uVHlwZSArIFwiJyB0byAnXCIgKyBmaWVsZE5hbWUgKyBcIic6XCIgKyAoXCJcXG5UaGUgZmllbGQgaXMgYWxyZWFkeSBkZWNvcmF0ZWQgd2l0aCAnQFwiICsgY3VycmVudEFubm90YXRpb25UeXBlICsgXCInLlwiKSArIFwiXFxuUmUtZGVjb3JhdGluZyBmaWVsZHMgaXMgbm90IGFsbG93ZWQuXCIgKyBcIlxcblVzZSAnQG92ZXJyaWRlJyBkZWNvcmF0b3IgZm9yIG1ldGhvZHMgb3ZlcnJpZGRlbiBieSBzdWJjbGFzcy5cIik7XG4gIH1cbn1cbi8qKlxuICogQ29sbGVjdHMgYW5ub3RhdGlvbnMgZnJvbSBwcm90b3R5cGVzIGFuZCBzdG9yZXMgdGhlbSBvbiB0YXJnZXQgKGluc3RhbmNlKVxuICovXG5mdW5jdGlvbiBjb2xsZWN0U3RvcmVkQW5ub3RhdGlvbnModGFyZ2V0KSB7XG4gIGlmICghaGFzUHJvcCh0YXJnZXQsIHN0b3JlZEFubm90YXRpb25zU3ltYm9sKSkge1xuICAgIC8vIGlmIChfX0RFVl9fICYmICF0YXJnZXRbc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2xdKSB7XG4gICAgLy8gICAgIGRpZShcbiAgICAvLyAgICAgICAgIGBObyBhbm5vdGF0aW9ucyB3ZXJlIHBhc3NlZCB0byBtYWtlT2JzZXJ2YWJsZSwgYnV0IG5vIGRlY29yYXRlZCBtZW1iZXJzIGhhdmUgYmVlbiBmb3VuZCBlaXRoZXJgXG4gICAgLy8gICAgIClcbiAgICAvLyB9XG4gICAgLy8gV2UgbmVlZCBhIGNvcHkgYXMgd2Ugd2lsbCByZW1vdmUgYW5ub3RhdGlvbiBmcm9tIHRoZSBsaXN0IG9uY2UgaXQncyBhcHBsaWVkLlxuICAgIGFkZEhpZGRlblByb3AodGFyZ2V0LCBzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbCwgX2V4dGVuZHMoe30sIHRhcmdldFtzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbF0pKTtcbiAgfVxuICByZXR1cm4gdGFyZ2V0W3N0b3JlZEFubm90YXRpb25zU3ltYm9sXTtcbn1cbmZ1bmN0aW9uIGlzMjAyMjNEZWNvcmF0b3IoY29udGV4dCkge1xuICByZXR1cm4gdHlwZW9mIGNvbnRleHQgPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgY29udGV4dFtcImtpbmRcIl0gPT0gXCJzdHJpbmdcIjtcbn1cbmZ1bmN0aW9uIGFzc2VydDIwMjIzRGVjb3JhdG9yVHlwZShjb250ZXh0LCB0eXBlcykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICF0eXBlcy5pbmNsdWRlcyhjb250ZXh0LmtpbmQpKSB7XG4gICAgZGllKFwiVGhlIGRlY29yYXRvciBhcHBsaWVkIHRvICdcIiArIFN0cmluZyhjb250ZXh0Lm5hbWUpICsgXCInIGNhbm5vdCBiZSB1c2VkIG9uIGEgXCIgKyBjb250ZXh0LmtpbmQgKyBcIiBlbGVtZW50XCIpO1xuICB9XG59XG5cbnZhciAkbW9ieCA9IC8qI19fUFVSRV9fKi9TeW1ib2woXCJtb2J4IGFkbWluaXN0cmF0aW9uXCIpO1xudmFyIEF0b20gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvLyBmb3IgZWZmZWN0aXZlIHVub2JzZXJ2aW5nLiBCYXNlQXRvbSBoYXMgdHJ1ZSwgZm9yIGV4dHJhIG9wdGltaXphdGlvbiwgc28gaXRzIG9uQmVjb21lVW5vYnNlcnZlZCBuZXZlciBnZXRzIGNhbGxlZCwgYmVjYXVzZSBpdCdzIG5vdCBuZWVkZWRcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGF0b20uIEZvciBkZWJ1Z2dpbmcgcHVycG9zZXMgaXQgaXMgcmVjb21tZW5kZWQgdG8gZ2l2ZSBpdCBhIG5hbWUuXG4gICAqIFRoZSBvbkJlY29tZU9ic2VydmVkIGFuZCBvbkJlY29tZVVub2JzZXJ2ZWQgY2FsbGJhY2tzIGNhbiBiZSB1c2VkIGZvciByZXNvdXJjZSBtYW5hZ2VtZW50LlxuICAgKi9cbiAgZnVuY3Rpb24gQXRvbShuYW1lXykge1xuICAgIGlmIChuYW1lXyA9PT0gdm9pZCAwKSB7XG4gICAgICBuYW1lXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiQXRvbUBcIiArIGdldE5leHRJZCgpIDogXCJBdG9tXCI7XG4gICAgfVxuICAgIHRoaXMubmFtZV8gPSB2b2lkIDA7XG4gICAgdGhpcy5pc1BlbmRpbmdVbm9ic2VydmF0aW9uXyA9IGZhbHNlO1xuICAgIHRoaXMuaXNCZWluZ09ic2VydmVkXyA9IGZhbHNlO1xuICAgIHRoaXMub2JzZXJ2ZXJzXyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLmRpZmZWYWx1ZV8gPSAwO1xuICAgIHRoaXMubGFzdEFjY2Vzc2VkQnlfID0gMDtcbiAgICB0aGlzLmxvd2VzdE9ic2VydmVyU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uTk9UX1RSQUNLSU5HXztcbiAgICB0aGlzLm9uQk9MID0gdm9pZCAwO1xuICAgIHRoaXMub25CVU9MID0gdm9pZCAwO1xuICAgIHRoaXMubmFtZV8gPSBuYW1lXztcbiAgfVxuICAvLyBvbkJlY29tZU9ic2VydmVkTGlzdGVuZXJzXG4gIHZhciBfcHJvdG8gPSBBdG9tLnByb3RvdHlwZTtcbiAgX3Byb3RvLm9uQk8gPSBmdW5jdGlvbiBvbkJPKCkge1xuICAgIGlmICh0aGlzLm9uQk9MKSB7XG4gICAgICB0aGlzLm9uQk9MLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8ub25CVU8gPSBmdW5jdGlvbiBvbkJVTygpIHtcbiAgICBpZiAodGhpcy5vbkJVT0wpIHtcbiAgICAgIHRoaXMub25CVU9MLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBJbnZva2UgdGhpcyBtZXRob2QgdG8gbm90aWZ5IG1vYnggdGhhdCB5b3VyIGF0b20gaGFzIGJlZW4gdXNlZCBzb21laG93LlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgY3VycmVudGx5IGEgcmVhY3RpdmUgY29udGV4dC5cbiAgICovO1xuICBfcHJvdG8ucmVwb3J0T2JzZXJ2ZWQgPSBmdW5jdGlvbiByZXBvcnRPYnNlcnZlZCQxKCkge1xuICAgIHJldHVybiByZXBvcnRPYnNlcnZlZCh0aGlzKTtcbiAgfVxuICAvKipcbiAgICogSW52b2tlIHRoaXMgbWV0aG9kIF9hZnRlcl8gdGhpcyBtZXRob2QgaGFzIGNoYW5nZWQgdG8gc2lnbmFsIG1vYnggdGhhdCBhbGwgaXRzIG9ic2VydmVycyBzaG91bGQgaW52YWxpZGF0ZS5cbiAgICovO1xuICBfcHJvdG8ucmVwb3J0Q2hhbmdlZCA9IGZ1bmN0aW9uIHJlcG9ydENoYW5nZWQoKSB7XG4gICAgc3RhcnRCYXRjaCgpO1xuICAgIHByb3BhZ2F0ZUNoYW5nZWQodGhpcyk7XG4gICAgZW5kQmF0Y2goKTtcbiAgfTtcbiAgX3Byb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZV87XG4gIH07XG4gIHJldHVybiBBdG9tO1xufSgpO1xudmFyIGlzQXRvbSA9IC8qI19fUFVSRV9fKi9jcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlKFwiQXRvbVwiLCBBdG9tKTtcbmZ1bmN0aW9uIGNyZWF0ZUF0b20obmFtZSwgb25CZWNvbWVPYnNlcnZlZEhhbmRsZXIsIG9uQmVjb21lVW5vYnNlcnZlZEhhbmRsZXIpIHtcbiAgaWYgKG9uQmVjb21lT2JzZXJ2ZWRIYW5kbGVyID09PSB2b2lkIDApIHtcbiAgICBvbkJlY29tZU9ic2VydmVkSGFuZGxlciA9IG5vb3A7XG4gIH1cbiAgaWYgKG9uQmVjb21lVW5vYnNlcnZlZEhhbmRsZXIgPT09IHZvaWQgMCkge1xuICAgIG9uQmVjb21lVW5vYnNlcnZlZEhhbmRsZXIgPSBub29wO1xuICB9XG4gIHZhciBhdG9tID0gbmV3IEF0b20obmFtZSk7XG4gIC8vIGRlZmF1bHQgYG5vb3BgIGxpc3RlbmVyIHdpbGwgbm90IGluaXRpYWxpemUgdGhlIGhvb2sgU2V0XG4gIGlmIChvbkJlY29tZU9ic2VydmVkSGFuZGxlciAhPT0gbm9vcCkge1xuICAgIG9uQmVjb21lT2JzZXJ2ZWQoYXRvbSwgb25CZWNvbWVPYnNlcnZlZEhhbmRsZXIpO1xuICB9XG4gIGlmIChvbkJlY29tZVVub2JzZXJ2ZWRIYW5kbGVyICE9PSBub29wKSB7XG4gICAgb25CZWNvbWVVbm9ic2VydmVkKGF0b20sIG9uQmVjb21lVW5vYnNlcnZlZEhhbmRsZXIpO1xuICB9XG4gIHJldHVybiBhdG9tO1xufVxuXG5mdW5jdGlvbiBpZGVudGl0eUNvbXBhcmVyKGEsIGIpIHtcbiAgcmV0dXJuIGEgPT09IGI7XG59XG5mdW5jdGlvbiBzdHJ1Y3R1cmFsQ29tcGFyZXIoYSwgYikge1xuICByZXR1cm4gZGVlcEVxdWFsKGEsIGIpO1xufVxuZnVuY3Rpb24gc2hhbGxvd0NvbXBhcmVyKGEsIGIpIHtcbiAgcmV0dXJuIGRlZXBFcXVhbChhLCBiLCAxKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlcihhLCBiKSB7XG4gIGlmIChPYmplY3QuaXMpIHtcbiAgICByZXR1cm4gT2JqZWN0LmlzKGEsIGIpO1xuICB9XG4gIHJldHVybiBhID09PSBiID8gYSAhPT0gMCB8fCAxIC8gYSA9PT0gMSAvIGIgOiBhICE9PSBhICYmIGIgIT09IGI7XG59XG52YXIgY29tcGFyZXIgPSB7XG4gIGlkZW50aXR5OiBpZGVudGl0eUNvbXBhcmVyLFxuICBzdHJ1Y3R1cmFsOiBzdHJ1Y3R1cmFsQ29tcGFyZXIsXG4gIFwiZGVmYXVsdFwiOiBkZWZhdWx0Q29tcGFyZXIsXG4gIHNoYWxsb3c6IHNoYWxsb3dDb21wYXJlclxufTtcblxuZnVuY3Rpb24gZGVlcEVuaGFuY2VyKHYsIF8sIG5hbWUpIHtcbiAgLy8gaXQgaXMgYW4gb2JzZXJ2YWJsZSBhbHJlYWR5LCBkb25lXG4gIGlmIChpc09ic2VydmFibGUodikpIHtcbiAgICByZXR1cm4gdjtcbiAgfVxuICAvLyBzb21ldGhpbmcgdGhhdCBjYW4gYmUgY29udmVydGVkIGFuZCBtdXRhdGVkP1xuICBpZiAoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlLmFycmF5KHYsIHtcbiAgICAgIG5hbWU6IG5hbWVcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNQbGFpbk9iamVjdCh2KSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlLm9iamVjdCh2LCB1bmRlZmluZWQsIHtcbiAgICAgIG5hbWU6IG5hbWVcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNFUzZNYXAodikpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5tYXAodiwge1xuICAgICAgbmFtZTogbmFtZVxuICAgIH0pO1xuICB9XG4gIGlmIChpc0VTNlNldCh2KSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlLnNldCh2LCB7XG4gICAgICBuYW1lOiBuYW1lXG4gICAgfSk7XG4gIH1cbiAgaWYgKHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCIgJiYgIWlzQWN0aW9uKHYpICYmICFpc0Zsb3codikpIHtcbiAgICBpZiAoaXNHZW5lcmF0b3IodikpIHtcbiAgICAgIHJldHVybiBmbG93KHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYXV0b0FjdGlvbihuYW1lLCB2KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHY7XG59XG5mdW5jdGlvbiBzaGFsbG93RW5oYW5jZXIodiwgXywgbmFtZSkge1xuICBpZiAodiA9PT0gdW5kZWZpbmVkIHx8IHYgPT09IG51bGwpIHtcbiAgICByZXR1cm4gdjtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KHYpIHx8IGlzT2JzZXJ2YWJsZUFycmF5KHYpIHx8IGlzT2JzZXJ2YWJsZU1hcCh2KSB8fCBpc09ic2VydmFibGVTZXQodikpIHtcbiAgICByZXR1cm4gdjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlLmFycmF5KHYsIHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBkZWVwOiBmYWxzZVxuICAgIH0pO1xuICB9XG4gIGlmIChpc1BsYWluT2JqZWN0KHYpKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUub2JqZWN0KHYsIHVuZGVmaW5lZCwge1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGRlZXA6IGZhbHNlXG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzRVM2TWFwKHYpKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUubWFwKHYsIHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBkZWVwOiBmYWxzZVxuICAgIH0pO1xuICB9XG4gIGlmIChpc0VTNlNldCh2KSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlLnNldCh2LCB7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgZGVlcDogZmFsc2VcbiAgICB9KTtcbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgZGllKFwiVGhlIHNoYWxsb3cgbW9kaWZpZXIgLyBkZWNvcmF0b3IgY2FuIG9ubHkgdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIGFycmF5cywgb2JqZWN0cywgbWFwcyBhbmQgc2V0c1wiKTtcbiAgfVxufVxuZnVuY3Rpb24gcmVmZXJlbmNlRW5oYW5jZXIobmV3VmFsdWUpIHtcbiAgLy8gbmV2ZXIgdHVybiBpbnRvIGFuIG9ic2VydmFibGVcbiAgcmV0dXJuIG5ld1ZhbHVlO1xufVxuZnVuY3Rpb24gcmVmU3RydWN0RW5oYW5jZXIodiwgb2xkVmFsdWUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBpc09ic2VydmFibGUodikpIHtcbiAgICBkaWUoXCJvYnNlcnZhYmxlLnN0cnVjdCBzaG91bGQgbm90IGJlIHVzZWQgd2l0aCBvYnNlcnZhYmxlIHZhbHVlc1wiKTtcbiAgfVxuICBpZiAoZGVlcEVxdWFsKHYsIG9sZFZhbHVlKSkge1xuICAgIHJldHVybiBvbGRWYWx1ZTtcbiAgfVxuICByZXR1cm4gdjtcbn1cblxudmFyIE9WRVJSSURFID0gXCJvdmVycmlkZVwiO1xudmFyIG92ZXJyaWRlID0gLyojX19QVVJFX18qL2NyZWF0ZURlY29yYXRvckFubm90YXRpb24oe1xuICBhbm5vdGF0aW9uVHlwZV86IE9WRVJSSURFLFxuICBtYWtlXzogbWFrZV8sXG4gIGV4dGVuZF86IGV4dGVuZF8sXG4gIGRlY29yYXRlXzIwMjIzXzogZGVjb3JhdGVfMjAyMjNfXG59KTtcbmZ1bmN0aW9uIGlzT3ZlcnJpZGUoYW5ub3RhdGlvbikge1xuICByZXR1cm4gYW5ub3RhdGlvbi5hbm5vdGF0aW9uVHlwZV8gPT09IE9WRVJSSURFO1xufVxuZnVuY3Rpb24gbWFrZV8oYWRtLCBrZXkpIHtcbiAgLy8gTXVzdCBub3QgYmUgcGxhaW4gb2JqZWN0XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgYWRtLmlzUGxhaW5PYmplY3RfKSB7XG4gICAgZGllKFwiQ2Fubm90IGFwcGx5ICdcIiArIHRoaXMuYW5ub3RhdGlvblR5cGVfICsgXCInIHRvICdcIiArIGFkbS5uYW1lXyArIFwiLlwiICsga2V5LnRvU3RyaW5nKCkgKyBcIic6XCIgKyAoXCJcXG4nXCIgKyB0aGlzLmFubm90YXRpb25UeXBlXyArIFwiJyBjYW5ub3QgYmUgdXNlZCBvbiBwbGFpbiBvYmplY3RzLlwiKSk7XG4gIH1cbiAgLy8gTXVzdCBvdmVycmlkZSBzb21ldGhpbmdcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhaGFzUHJvcChhZG0uYXBwbGllZEFubm90YXRpb25zXywga2V5KSkge1xuICAgIGRpZShcIidcIiArIGFkbS5uYW1lXyArIFwiLlwiICsga2V5LnRvU3RyaW5nKCkgKyBcIicgaXMgYW5ub3RhdGVkIHdpdGggJ1wiICsgdGhpcy5hbm5vdGF0aW9uVHlwZV8gKyBcIicsIFwiICsgXCJidXQgbm8gc3VjaCBhbm5vdGF0ZWQgbWVtYmVyIHdhcyBmb3VuZCBvbiBwcm90b3R5cGUuXCIpO1xuICB9XG4gIHJldHVybiAwIC8qIE1ha2VSZXN1bHQuQ2FuY2VsICovO1xufVxuXG5mdW5jdGlvbiBleHRlbmRfKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBwcm94eVRyYXApIHtcbiAgZGllKFwiJ1wiICsgdGhpcy5hbm5vdGF0aW9uVHlwZV8gKyBcIicgY2FuIG9ubHkgYmUgdXNlZCB3aXRoICdtYWtlT2JzZXJ2YWJsZSdcIik7XG59XG5mdW5jdGlvbiBkZWNvcmF0ZV8yMDIyM18oZGVzYywgY29udGV4dCkge1xuICBjb25zb2xlLndhcm4oXCInXCIgKyB0aGlzLmFubm90YXRpb25UeXBlXyArIFwiJyBjYW5ub3QgYmUgdXNlZCB3aXRoIGRlY29yYXRvcnMgLSB0aGlzIGlzIGEgbm8tb3BcIik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkFubm90YXRpb24obmFtZSwgb3B0aW9ucykge1xuICByZXR1cm4ge1xuICAgIGFubm90YXRpb25UeXBlXzogbmFtZSxcbiAgICBvcHRpb25zXzogb3B0aW9ucyxcbiAgICBtYWtlXzogbWFrZV8kMSxcbiAgICBleHRlbmRfOiBleHRlbmRfJDEsXG4gICAgZGVjb3JhdGVfMjAyMjNfOiBkZWNvcmF0ZV8yMDIyM18kMVxuICB9O1xufVxuZnVuY3Rpb24gbWFrZV8kMShhZG0sIGtleSwgZGVzY3JpcHRvciwgc291cmNlKSB7XG4gIHZhciBfdGhpcyRvcHRpb25zXztcbiAgLy8gYm91bmRcbiAgaWYgKChfdGhpcyRvcHRpb25zXyA9IHRoaXMub3B0aW9uc18pICE9IG51bGwgJiYgX3RoaXMkb3B0aW9uc18uYm91bmQpIHtcbiAgICByZXR1cm4gdGhpcy5leHRlbmRfKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBmYWxzZSkgPT09IG51bGwgPyAwIC8qIE1ha2VSZXN1bHQuQ2FuY2VsICovIDogMSAvKiBNYWtlUmVzdWx0LkJyZWFrICovO1xuICB9XG4gIC8vIG93blxuICBpZiAoc291cmNlID09PSBhZG0udGFyZ2V0Xykge1xuICAgIHJldHVybiB0aGlzLmV4dGVuZF8oYWRtLCBrZXksIGRlc2NyaXB0b3IsIGZhbHNlKSA9PT0gbnVsbCA/IDAgLyogTWFrZVJlc3VsdC5DYW5jZWwgKi8gOiAyIC8qIE1ha2VSZXN1bHQuQ29udGludWUgKi87XG4gIH1cbiAgLy8gcHJvdG90eXBlXG4gIGlmIChpc0FjdGlvbihkZXNjcmlwdG9yLnZhbHVlKSkge1xuICAgIC8vIEEgcHJvdG90eXBlIGNvdWxkIGhhdmUgYmVlbiBhbm5vdGF0ZWQgYWxyZWFkeSBieSBvdGhlciBjb25zdHJ1Y3RvcixcbiAgICAvLyByZXN0IG9mIHRoZSBwcm90byBjaGFpbiBtdXN0IGJlIGFubm90YXRlZCBhbHJlYWR5XG4gICAgcmV0dXJuIDEgLyogTWFrZVJlc3VsdC5CcmVhayAqLztcbiAgfVxuXG4gIHZhciBhY3Rpb25EZXNjcmlwdG9yID0gY3JlYXRlQWN0aW9uRGVzY3JpcHRvcihhZG0sIHRoaXMsIGtleSwgZGVzY3JpcHRvciwgZmFsc2UpO1xuICBkZWZpbmVQcm9wZXJ0eShzb3VyY2UsIGtleSwgYWN0aW9uRGVzY3JpcHRvcik7XG4gIHJldHVybiAyIC8qIE1ha2VSZXN1bHQuQ29udGludWUgKi87XG59XG5cbmZ1bmN0aW9uIGV4dGVuZF8kMShhZG0sIGtleSwgZGVzY3JpcHRvciwgcHJveHlUcmFwKSB7XG4gIHZhciBhY3Rpb25EZXNjcmlwdG9yID0gY3JlYXRlQWN0aW9uRGVzY3JpcHRvcihhZG0sIHRoaXMsIGtleSwgZGVzY3JpcHRvcik7XG4gIHJldHVybiBhZG0uZGVmaW5lUHJvcGVydHlfKGtleSwgYWN0aW9uRGVzY3JpcHRvciwgcHJveHlUcmFwKTtcbn1cbmZ1bmN0aW9uIGRlY29yYXRlXzIwMjIzXyQxKG10aGQsIGNvbnRleHQpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGFzc2VydDIwMjIzRGVjb3JhdG9yVHlwZShjb250ZXh0LCBbXCJtZXRob2RcIiwgXCJmaWVsZFwiXSk7XG4gIH1cbiAgdmFyIGtpbmQgPSBjb250ZXh0LmtpbmQsXG4gICAgbmFtZSA9IGNvbnRleHQubmFtZSxcbiAgICBhZGRJbml0aWFsaXplciA9IGNvbnRleHQuYWRkSW5pdGlhbGl6ZXI7XG4gIHZhciBhbm4gPSB0aGlzO1xuICB2YXIgX2NyZWF0ZUFjdGlvbiA9IGZ1bmN0aW9uIF9jcmVhdGVBY3Rpb24obSkge1xuICAgIHZhciBfYW5uJG9wdGlvbnNfJG5hbWUsIF9hbm4kb3B0aW9uc18sIF9hbm4kb3B0aW9uc18kYXV0b0FjdCwgX2FubiRvcHRpb25zXzI7XG4gICAgcmV0dXJuIGNyZWF0ZUFjdGlvbigoX2FubiRvcHRpb25zXyRuYW1lID0gKF9hbm4kb3B0aW9uc18gPSBhbm4ub3B0aW9uc18pID09IG51bGwgPyB2b2lkIDAgOiBfYW5uJG9wdGlvbnNfLm5hbWUpICE9IG51bGwgPyBfYW5uJG9wdGlvbnNfJG5hbWUgOiBuYW1lLnRvU3RyaW5nKCksIG0sIChfYW5uJG9wdGlvbnNfJGF1dG9BY3QgPSAoX2FubiRvcHRpb25zXzIgPSBhbm4ub3B0aW9uc18pID09IG51bGwgPyB2b2lkIDAgOiBfYW5uJG9wdGlvbnNfMi5hdXRvQWN0aW9uKSAhPSBudWxsID8gX2FubiRvcHRpb25zXyRhdXRvQWN0IDogZmFsc2UpO1xuICB9O1xuICAvLyBCYWNrd2FyZHMvTGVnYWN5IGJlaGF2aW9yLCBleHBlY3RzIG1ha2VPYnNlcnZhYmxlKHRoaXMpXG4gIGlmIChraW5kID09IFwiZmllbGRcIikge1xuICAgIGFkZEluaXRpYWxpemVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0b3JlQW5ub3RhdGlvbih0aGlzLCBuYW1lLCBhbm4pO1xuICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoa2luZCA9PSBcIm1ldGhvZFwiKSB7XG4gICAgdmFyIF90aGlzJG9wdGlvbnNfMjtcbiAgICBpZiAoIWlzQWN0aW9uKG10aGQpKSB7XG4gICAgICBtdGhkID0gX2NyZWF0ZUFjdGlvbihtdGhkKTtcbiAgICB9XG4gICAgaWYgKChfdGhpcyRvcHRpb25zXzIgPSB0aGlzLm9wdGlvbnNfKSAhPSBudWxsICYmIF90aGlzJG9wdGlvbnNfMi5ib3VuZCkge1xuICAgICAgYWRkSW5pdGlhbGl6ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBib3VuZCA9IHNlbGZbbmFtZV0uYmluZChzZWxmKTtcbiAgICAgICAgYm91bmQuaXNNb2J4QWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgc2VsZltuYW1lXSA9IGJvdW5kO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBtdGhkO1xuICB9XG4gIGRpZShcIkNhbm5vdCBhcHBseSAnXCIgKyBhbm4uYW5ub3RhdGlvblR5cGVfICsgXCInIHRvICdcIiArIFN0cmluZyhuYW1lKSArIFwiJyAoa2luZDogXCIgKyBraW5kICsgXCIpOlwiICsgKFwiXFxuJ1wiICsgYW5uLmFubm90YXRpb25UeXBlXyArIFwiJyBjYW4gb25seSBiZSB1c2VkIG9uIHByb3BlcnRpZXMgd2l0aCBhIGZ1bmN0aW9uIHZhbHVlLlwiKSk7XG59XG5mdW5jdGlvbiBhc3NlcnRBY3Rpb25EZXNjcmlwdG9yKGFkbSwgX3JlZiwga2V5LCBfcmVmMikge1xuICB2YXIgYW5ub3RhdGlvblR5cGVfID0gX3JlZi5hbm5vdGF0aW9uVHlwZV87XG4gIHZhciB2YWx1ZSA9IF9yZWYyLnZhbHVlO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIGRpZShcIkNhbm5vdCBhcHBseSAnXCIgKyBhbm5vdGF0aW9uVHlwZV8gKyBcIicgdG8gJ1wiICsgYWRtLm5hbWVfICsgXCIuXCIgKyBrZXkudG9TdHJpbmcoKSArIFwiJzpcIiArIChcIlxcbidcIiArIGFubm90YXRpb25UeXBlXyArIFwiJyBjYW4gb25seSBiZSB1c2VkIG9uIHByb3BlcnRpZXMgd2l0aCBhIGZ1bmN0aW9uIHZhbHVlLlwiKSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkRlc2NyaXB0b3IoYWRtLCBhbm5vdGF0aW9uLCBrZXksIGRlc2NyaXB0b3IsXG4vLyBwcm92aWRlcyBhYmlsaXR5IHRvIGRpc2FibGUgc2FmZURlc2NyaXB0b3JzIGZvciBwcm90b3R5cGVzXG5zYWZlRGVzY3JpcHRvcnMpIHtcbiAgdmFyIF9hbm5vdGF0aW9uJG9wdGlvbnNfLCBfYW5ub3RhdGlvbiRvcHRpb25zXyQsIF9hbm5vdGF0aW9uJG9wdGlvbnNfMiwgX2Fubm90YXRpb24kb3B0aW9uc18kMiwgX2Fubm90YXRpb24kb3B0aW9uc18zLCBfYW5ub3RhdGlvbiRvcHRpb25zXzQsIF9hZG0kcHJveHlfMjtcbiAgaWYgKHNhZmVEZXNjcmlwdG9ycyA9PT0gdm9pZCAwKSB7XG4gICAgc2FmZURlc2NyaXB0b3JzID0gZ2xvYmFsU3RhdGUuc2FmZURlc2NyaXB0b3JzO1xuICB9XG4gIGFzc2VydEFjdGlvbkRlc2NyaXB0b3IoYWRtLCBhbm5vdGF0aW9uLCBrZXksIGRlc2NyaXB0b3IpO1xuICB2YXIgdmFsdWUgPSBkZXNjcmlwdG9yLnZhbHVlO1xuICBpZiAoKF9hbm5vdGF0aW9uJG9wdGlvbnNfID0gYW5ub3RhdGlvbi5vcHRpb25zXykgIT0gbnVsbCAmJiBfYW5ub3RhdGlvbiRvcHRpb25zXy5ib3VuZCkge1xuICAgIHZhciBfYWRtJHByb3h5XztcbiAgICB2YWx1ZSA9IHZhbHVlLmJpbmQoKF9hZG0kcHJveHlfID0gYWRtLnByb3h5XykgIT0gbnVsbCA/IF9hZG0kcHJveHlfIDogYWRtLnRhcmdldF8pO1xuICB9XG4gIHJldHVybiB7XG4gICAgdmFsdWU6IGNyZWF0ZUFjdGlvbigoX2Fubm90YXRpb24kb3B0aW9uc18kID0gKF9hbm5vdGF0aW9uJG9wdGlvbnNfMiA9IGFubm90YXRpb24ub3B0aW9uc18pID09IG51bGwgPyB2b2lkIDAgOiBfYW5ub3RhdGlvbiRvcHRpb25zXzIubmFtZSkgIT0gbnVsbCA/IF9hbm5vdGF0aW9uJG9wdGlvbnNfJCA6IGtleS50b1N0cmluZygpLCB2YWx1ZSwgKF9hbm5vdGF0aW9uJG9wdGlvbnNfJDIgPSAoX2Fubm90YXRpb24kb3B0aW9uc18zID0gYW5ub3RhdGlvbi5vcHRpb25zXykgPT0gbnVsbCA/IHZvaWQgMCA6IF9hbm5vdGF0aW9uJG9wdGlvbnNfMy5hdXRvQWN0aW9uKSAhPSBudWxsID8gX2Fubm90YXRpb24kb3B0aW9uc18kMiA6IGZhbHNlLFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb2J4anMvbW9ieC9kaXNjdXNzaW9ucy8zMTQwXG4gICAgKF9hbm5vdGF0aW9uJG9wdGlvbnNfNCA9IGFubm90YXRpb24ub3B0aW9uc18pICE9IG51bGwgJiYgX2Fubm90YXRpb24kb3B0aW9uc180LmJvdW5kID8gKF9hZG0kcHJveHlfMiA9IGFkbS5wcm94eV8pICE9IG51bGwgPyBfYWRtJHByb3h5XzIgOiBhZG0udGFyZ2V0XyA6IHVuZGVmaW5lZCksXG4gICAgLy8gTm9uLWNvbmZpZ3VyYWJsZSBmb3IgY2xhc3Nlc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWwgZmllbGQgcmVkZWZpbml0aW9uIGluIHN1YmNsYXNzXG4gICAgY29uZmlndXJhYmxlOiBzYWZlRGVzY3JpcHRvcnMgPyBhZG0uaXNQbGFpbk9iamVjdF8gOiB0cnVlLFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb2J4anMvbW9ieC9wdWxsLzI2NDEjaXNzdWVjb21tZW50LTczNzI5MjA1OFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIC8vIE5vbi1vYnNldmFibGUsIHRoZXJlZm9yZSBub24td3JpdGFibGVcbiAgICAvLyBBbHNvIHByZXZlbnRzIHJld3JpdGluZyBpbiBzdWJjbGFzcyBjb25zdHJ1Y3RvclxuICAgIHdyaXRhYmxlOiBzYWZlRGVzY3JpcHRvcnMgPyBmYWxzZSA6IHRydWVcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRmxvd0Fubm90YXRpb24obmFtZSwgb3B0aW9ucykge1xuICByZXR1cm4ge1xuICAgIGFubm90YXRpb25UeXBlXzogbmFtZSxcbiAgICBvcHRpb25zXzogb3B0aW9ucyxcbiAgICBtYWtlXzogbWFrZV8kMixcbiAgICBleHRlbmRfOiBleHRlbmRfJDIsXG4gICAgZGVjb3JhdGVfMjAyMjNfOiBkZWNvcmF0ZV8yMDIyM18kMlxuICB9O1xufVxuZnVuY3Rpb24gbWFrZV8kMihhZG0sIGtleSwgZGVzY3JpcHRvciwgc291cmNlKSB7XG4gIHZhciBfdGhpcyRvcHRpb25zXztcbiAgLy8gb3duXG4gIGlmIChzb3VyY2UgPT09IGFkbS50YXJnZXRfKSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5kXyhhZG0sIGtleSwgZGVzY3JpcHRvciwgZmFsc2UpID09PSBudWxsID8gMCAvKiBNYWtlUmVzdWx0LkNhbmNlbCAqLyA6IDIgLyogTWFrZVJlc3VsdC5Db250aW51ZSAqLztcbiAgfVxuICAvLyBwcm90b3R5cGVcbiAgLy8gYm91bmQgLSBtdXN0IGFubm90YXRlIHByb3RvcyB0byBzdXBwb3J0IHN1cGVyLmZsb3coKVxuICBpZiAoKF90aGlzJG9wdGlvbnNfID0gdGhpcy5vcHRpb25zXykgIT0gbnVsbCAmJiBfdGhpcyRvcHRpb25zXy5ib3VuZCAmJiAoIWhhc1Byb3AoYWRtLnRhcmdldF8sIGtleSkgfHwgIWlzRmxvdyhhZG0udGFyZ2V0X1trZXldKSkpIHtcbiAgICBpZiAodGhpcy5leHRlbmRfKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBmYWxzZSkgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAwIC8qIE1ha2VSZXN1bHQuQ2FuY2VsICovO1xuICAgIH1cbiAgfVxuXG4gIGlmIChpc0Zsb3coZGVzY3JpcHRvci52YWx1ZSkpIHtcbiAgICAvLyBBIHByb3RvdHlwZSBjb3VsZCBoYXZlIGJlZW4gYW5ub3RhdGVkIGFscmVhZHkgYnkgb3RoZXIgY29uc3RydWN0b3IsXG4gICAgLy8gcmVzdCBvZiB0aGUgcHJvdG8gY2hhaW4gbXVzdCBiZSBhbm5vdGF0ZWQgYWxyZWFkeVxuICAgIHJldHVybiAxIC8qIE1ha2VSZXN1bHQuQnJlYWsgKi87XG4gIH1cblxuICB2YXIgZmxvd0Rlc2NyaXB0b3IgPSBjcmVhdGVGbG93RGVzY3JpcHRvcihhZG0sIHRoaXMsIGtleSwgZGVzY3JpcHRvciwgZmFsc2UsIGZhbHNlKTtcbiAgZGVmaW5lUHJvcGVydHkoc291cmNlLCBrZXksIGZsb3dEZXNjcmlwdG9yKTtcbiAgcmV0dXJuIDIgLyogTWFrZVJlc3VsdC5Db250aW51ZSAqLztcbn1cblxuZnVuY3Rpb24gZXh0ZW5kXyQyKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBwcm94eVRyYXApIHtcbiAgdmFyIF90aGlzJG9wdGlvbnNfMjtcbiAgdmFyIGZsb3dEZXNjcmlwdG9yID0gY3JlYXRlRmxvd0Rlc2NyaXB0b3IoYWRtLCB0aGlzLCBrZXksIGRlc2NyaXB0b3IsIChfdGhpcyRvcHRpb25zXzIgPSB0aGlzLm9wdGlvbnNfKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMkb3B0aW9uc18yLmJvdW5kKTtcbiAgcmV0dXJuIGFkbS5kZWZpbmVQcm9wZXJ0eV8oa2V5LCBmbG93RGVzY3JpcHRvciwgcHJveHlUcmFwKTtcbn1cbmZ1bmN0aW9uIGRlY29yYXRlXzIwMjIzXyQyKG10aGQsIGNvbnRleHQpIHtcbiAgdmFyIF90aGlzJG9wdGlvbnNfMztcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGFzc2VydDIwMjIzRGVjb3JhdG9yVHlwZShjb250ZXh0LCBbXCJtZXRob2RcIl0pO1xuICB9XG4gIHZhciBuYW1lID0gY29udGV4dC5uYW1lLFxuICAgIGFkZEluaXRpYWxpemVyID0gY29udGV4dC5hZGRJbml0aWFsaXplcjtcbiAgaWYgKCFpc0Zsb3cobXRoZCkpIHtcbiAgICBtdGhkID0gZmxvdyhtdGhkKTtcbiAgfVxuICBpZiAoKF90aGlzJG9wdGlvbnNfMyA9IHRoaXMub3B0aW9uc18pICE9IG51bGwgJiYgX3RoaXMkb3B0aW9uc18zLmJvdW5kKSB7XG4gICAgYWRkSW5pdGlhbGl6ZXIoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIGJvdW5kID0gc2VsZltuYW1lXS5iaW5kKHNlbGYpO1xuICAgICAgYm91bmQuaXNNb2JYRmxvdyA9IHRydWU7XG4gICAgICBzZWxmW25hbWVdID0gYm91bmQ7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIG10aGQ7XG59XG5mdW5jdGlvbiBhc3NlcnRGbG93RGVzY3JpcHRvcihhZG0sIF9yZWYsIGtleSwgX3JlZjIpIHtcbiAgdmFyIGFubm90YXRpb25UeXBlXyA9IF9yZWYuYW5ub3RhdGlvblR5cGVfO1xuICB2YXIgdmFsdWUgPSBfcmVmMi52YWx1ZTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICBkaWUoXCJDYW5ub3QgYXBwbHkgJ1wiICsgYW5ub3RhdGlvblR5cGVfICsgXCInIHRvICdcIiArIGFkbS5uYW1lXyArIFwiLlwiICsga2V5LnRvU3RyaW5nKCkgKyBcIic6XCIgKyAoXCJcXG4nXCIgKyBhbm5vdGF0aW9uVHlwZV8gKyBcIicgY2FuIG9ubHkgYmUgdXNlZCBvbiBwcm9wZXJ0aWVzIHdpdGggYSBnZW5lcmF0b3IgZnVuY3Rpb24gdmFsdWUuXCIpKTtcbiAgfVxufVxuZnVuY3Rpb24gY3JlYXRlRmxvd0Rlc2NyaXB0b3IoYWRtLCBhbm5vdGF0aW9uLCBrZXksIGRlc2NyaXB0b3IsIGJvdW5kLFxuLy8gcHJvdmlkZXMgYWJpbGl0eSB0byBkaXNhYmxlIHNhZmVEZXNjcmlwdG9ycyBmb3IgcHJvdG90eXBlc1xuc2FmZURlc2NyaXB0b3JzKSB7XG4gIGlmIChzYWZlRGVzY3JpcHRvcnMgPT09IHZvaWQgMCkge1xuICAgIHNhZmVEZXNjcmlwdG9ycyA9IGdsb2JhbFN0YXRlLnNhZmVEZXNjcmlwdG9ycztcbiAgfVxuICBhc3NlcnRGbG93RGVzY3JpcHRvcihhZG0sIGFubm90YXRpb24sIGtleSwgZGVzY3JpcHRvcik7XG4gIHZhciB2YWx1ZSA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIC8vIEluIGNhc2Ugb2YgZmxvdy5ib3VuZCwgdGhlIGRlc2NyaXB0b3IgY2FuIGJlIGZyb20gYWxyZWFkeSBhbm5vdGF0ZWQgcHJvdG90eXBlXG4gIGlmICghaXNGbG93KHZhbHVlKSkge1xuICAgIHZhbHVlID0gZmxvdyh2YWx1ZSk7XG4gIH1cbiAgaWYgKGJvdW5kKSB7XG4gICAgdmFyIF9hZG0kcHJveHlfO1xuICAgIC8vIFdlIGRvIG5vdCBrZWVwIG9yaWdpbmFsIGZ1bmN0aW9uIGFyb3VuZCwgc28gd2UgYmluZCB0aGUgZXhpc3RpbmcgZmxvd1xuICAgIHZhbHVlID0gdmFsdWUuYmluZCgoX2FkbSRwcm94eV8gPSBhZG0ucHJveHlfKSAhPSBudWxsID8gX2FkbSRwcm94eV8gOiBhZG0udGFyZ2V0Xyk7XG4gICAgLy8gVGhpcyBpcyBub3JtYWxseSBzZXQgYnkgYGZsb3dgLCBidXQgYGJpbmRgIHJldHVybnMgbmV3IGZ1bmN0aW9uLi4uXG4gICAgdmFsdWUuaXNNb2JYRmxvdyA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgLy8gTm9uLWNvbmZpZ3VyYWJsZSBmb3IgY2xhc3Nlc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWwgZmllbGQgcmVkZWZpbml0aW9uIGluIHN1YmNsYXNzXG4gICAgY29uZmlndXJhYmxlOiBzYWZlRGVzY3JpcHRvcnMgPyBhZG0uaXNQbGFpbk9iamVjdF8gOiB0cnVlLFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb2J4anMvbW9ieC9wdWxsLzI2NDEjaXNzdWVjb21tZW50LTczNzI5MjA1OFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIC8vIE5vbi1vYnNldmFibGUsIHRoZXJlZm9yZSBub24td3JpdGFibGVcbiAgICAvLyBBbHNvIHByZXZlbnRzIHJld3JpdGluZyBpbiBzdWJjbGFzcyBjb25zdHJ1Y3RvclxuICAgIHdyaXRhYmxlOiBzYWZlRGVzY3JpcHRvcnMgPyBmYWxzZSA6IHRydWVcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcHV0ZWRBbm5vdGF0aW9uKG5hbWUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHtcbiAgICBhbm5vdGF0aW9uVHlwZV86IG5hbWUsXG4gICAgb3B0aW9uc186IG9wdGlvbnMsXG4gICAgbWFrZV86IG1ha2VfJDMsXG4gICAgZXh0ZW5kXzogZXh0ZW5kXyQzLFxuICAgIGRlY29yYXRlXzIwMjIzXzogZGVjb3JhdGVfMjAyMjNfJDNcbiAgfTtcbn1cbmZ1bmN0aW9uIG1ha2VfJDMoYWRtLCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgcmV0dXJuIHRoaXMuZXh0ZW5kXyhhZG0sIGtleSwgZGVzY3JpcHRvciwgZmFsc2UpID09PSBudWxsID8gMCAvKiBNYWtlUmVzdWx0LkNhbmNlbCAqLyA6IDEgLyogTWFrZVJlc3VsdC5CcmVhayAqLztcbn1cblxuZnVuY3Rpb24gZXh0ZW5kXyQzKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBwcm94eVRyYXApIHtcbiAgYXNzZXJ0Q29tcHV0ZWREZXNjcmlwdG9yKGFkbSwgdGhpcywga2V5LCBkZXNjcmlwdG9yKTtcbiAgcmV0dXJuIGFkbS5kZWZpbmVDb21wdXRlZFByb3BlcnR5XyhrZXksIF9leHRlbmRzKHt9LCB0aGlzLm9wdGlvbnNfLCB7XG4gICAgZ2V0OiBkZXNjcmlwdG9yLmdldCxcbiAgICBzZXQ6IGRlc2NyaXB0b3Iuc2V0XG4gIH0pLCBwcm94eVRyYXApO1xufVxuZnVuY3Rpb24gZGVjb3JhdGVfMjAyMjNfJDMoZ2V0LCBjb250ZXh0KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBhc3NlcnQyMDIyM0RlY29yYXRvclR5cGUoY29udGV4dCwgW1wiZ2V0dGVyXCJdKTtcbiAgfVxuICB2YXIgYW5uID0gdGhpcztcbiAgdmFyIGtleSA9IGNvbnRleHQubmFtZSxcbiAgICBhZGRJbml0aWFsaXplciA9IGNvbnRleHQuYWRkSW5pdGlhbGl6ZXI7XG4gIGFkZEluaXRpYWxpemVyKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYWRtID0gYXNPYnNlcnZhYmxlT2JqZWN0KHRoaXMpWyRtb2J4XTtcbiAgICB2YXIgb3B0aW9ucyA9IF9leHRlbmRzKHt9LCBhbm4ub3B0aW9uc18sIHtcbiAgICAgIGdldDogZ2V0LFxuICAgICAgY29udGV4dDogdGhpc1xuICAgIH0pO1xuICAgIG9wdGlvbnMubmFtZSB8fCAob3B0aW9ucy5uYW1lID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gYWRtLm5hbWVfICsgXCIuXCIgKyBrZXkudG9TdHJpbmcoKSA6IFwiT2JzZXJ2YWJsZU9iamVjdC5cIiArIGtleS50b1N0cmluZygpKTtcbiAgICBhZG0udmFsdWVzXy5zZXQoa2V5LCBuZXcgQ29tcHV0ZWRWYWx1ZShvcHRpb25zKSk7XG4gIH0pO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzWyRtb2J4XS5nZXRPYnNlcnZhYmxlUHJvcFZhbHVlXyhrZXkpO1xuICB9O1xufVxuZnVuY3Rpb24gYXNzZXJ0Q29tcHV0ZWREZXNjcmlwdG9yKGFkbSwgX3JlZiwga2V5LCBfcmVmMikge1xuICB2YXIgYW5ub3RhdGlvblR5cGVfID0gX3JlZi5hbm5vdGF0aW9uVHlwZV87XG4gIHZhciBnZXQgPSBfcmVmMi5nZXQ7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWdldCkge1xuICAgIGRpZShcIkNhbm5vdCBhcHBseSAnXCIgKyBhbm5vdGF0aW9uVHlwZV8gKyBcIicgdG8gJ1wiICsgYWRtLm5hbWVfICsgXCIuXCIgKyBrZXkudG9TdHJpbmcoKSArIFwiJzpcIiArIChcIlxcbidcIiArIGFubm90YXRpb25UeXBlXyArIFwiJyBjYW4gb25seSBiZSB1c2VkIG9uIGdldHRlcigrc2V0dGVyKSBwcm9wZXJ0aWVzLlwiKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlT2JzZXJ2YWJsZUFubm90YXRpb24obmFtZSwgb3B0aW9ucykge1xuICByZXR1cm4ge1xuICAgIGFubm90YXRpb25UeXBlXzogbmFtZSxcbiAgICBvcHRpb25zXzogb3B0aW9ucyxcbiAgICBtYWtlXzogbWFrZV8kNCxcbiAgICBleHRlbmRfOiBleHRlbmRfJDQsXG4gICAgZGVjb3JhdGVfMjAyMjNfOiBkZWNvcmF0ZV8yMDIyM18kNFxuICB9O1xufVxuZnVuY3Rpb24gbWFrZV8kNChhZG0sIGtleSwgZGVzY3JpcHRvcikge1xuICByZXR1cm4gdGhpcy5leHRlbmRfKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBmYWxzZSkgPT09IG51bGwgPyAwIC8qIE1ha2VSZXN1bHQuQ2FuY2VsICovIDogMSAvKiBNYWtlUmVzdWx0LkJyZWFrICovO1xufVxuXG5mdW5jdGlvbiBleHRlbmRfJDQoYWRtLCBrZXksIGRlc2NyaXB0b3IsIHByb3h5VHJhcCkge1xuICB2YXIgX3RoaXMkb3B0aW9uc18kZW5oYW5jLCBfdGhpcyRvcHRpb25zXztcbiAgYXNzZXJ0T2JzZXJ2YWJsZURlc2NyaXB0b3IoYWRtLCB0aGlzLCBrZXksIGRlc2NyaXB0b3IpO1xuICByZXR1cm4gYWRtLmRlZmluZU9ic2VydmFibGVQcm9wZXJ0eV8oa2V5LCBkZXNjcmlwdG9yLnZhbHVlLCAoX3RoaXMkb3B0aW9uc18kZW5oYW5jID0gKF90aGlzJG9wdGlvbnNfID0gdGhpcy5vcHRpb25zXykgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJG9wdGlvbnNfLmVuaGFuY2VyKSAhPSBudWxsID8gX3RoaXMkb3B0aW9uc18kZW5oYW5jIDogZGVlcEVuaGFuY2VyLCBwcm94eVRyYXApO1xufVxuZnVuY3Rpb24gZGVjb3JhdGVfMjAyMjNfJDQoZGVzYywgY29udGV4dCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgaWYgKGNvbnRleHQua2luZCA9PT0gXCJmaWVsZFwiKSB7XG4gICAgICB0aHJvdyBkaWUoXCJQbGVhc2UgdXNlIGBAb2JzZXJ2YWJsZSBhY2Nlc3NvciBcIiArIFN0cmluZyhjb250ZXh0Lm5hbWUpICsgXCJgIGluc3RlYWQgb2YgYEBvYnNlcnZhYmxlIFwiICsgU3RyaW5nKGNvbnRleHQubmFtZSkgKyBcImBcIik7XG4gICAgfVxuICAgIGFzc2VydDIwMjIzRGVjb3JhdG9yVHlwZShjb250ZXh0LCBbXCJhY2Nlc3NvclwiXSk7XG4gIH1cbiAgdmFyIGFubiA9IHRoaXM7XG4gIHZhciBraW5kID0gY29udGV4dC5raW5kLFxuICAgIG5hbWUgPSBjb250ZXh0Lm5hbWU7XG4gIC8vIFRoZSBsYXppbmVzcyBoZXJlIGlzIG5vdCBpZGVhbC4uLiBJdCdzIGEgd29ya2Fyb3VuZCB0byBob3cgMjAyMi4zIERlY29yYXRvcnMgYXJlIGltcGxlbWVudGVkOlxuICAvLyAgIGBhZGRJbml0aWFsaXplcmAgY2FsbGJhY2tzIGFyZSBleGVjdXRlZCBfYmVmb3JlXyBhbnkgYWNjZXNzb3JzIGFyZSBkZWZpbmVkIChpbnN0ZWFkIG9mIHRoZSBpZGVhbC1mb3ItdXMgcmlnaHQgYWZ0ZXIgZWFjaCkuXG4gIC8vICAgVGhpcyBtZWFucyB0aGF0LCBpZiB3ZSB3ZXJlIHRvIGRvIG91ciBzdHVmZiBpbiBhbiBgYWRkSW5pdGlhbGl6ZXJgLCB3ZSdkIGF0dGVtcHQgdG8gcmVhZCBhIHByaXZhdGUgc2xvdFxuICAvLyAgIGJlZm9yZSBpdCBoYXMgYmVlbiBpbml0aWFsaXplZC4gVGhlIHJ1bnRpbWUgZG9lc24ndCBsaWtlIHRoYXQgYW5kIHRocm93cyBhIGBDYW5ub3QgcmVhZCBwcml2YXRlIG1lbWJlclxuICAvLyAgIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdGAgZXJyb3IuXG4gIC8vIFRPRE86IGl0IHNlZW1zIHRoYXQgdGhpcyB3aWxsIG5vdCBiZSByZXF1aXJlZCBhbnltb3JlIGluIHRoZSBmaW5hbCB2ZXJzaW9uIG9mIHRoZSBzcGVjXG4gIC8vIFNlZSBUT0RPOiBsaW5rXG4gIHZhciBpbml0aWFsaXplZE9iamVjdHMgPSBuZXcgV2Vha1NldCgpO1xuICBmdW5jdGlvbiBpbml0aWFsaXplT2JzZXJ2YWJsZSh0YXJnZXQsIHZhbHVlKSB7XG4gICAgdmFyIF9hbm4kb3B0aW9uc18kZW5oYW5jZSwgX2FubiRvcHRpb25zXztcbiAgICB2YXIgYWRtID0gYXNPYnNlcnZhYmxlT2JqZWN0KHRhcmdldClbJG1vYnhdO1xuICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGVWYWx1ZSh2YWx1ZSwgKF9hbm4kb3B0aW9uc18kZW5oYW5jZSA9IChfYW5uJG9wdGlvbnNfID0gYW5uLm9wdGlvbnNfKSA9PSBudWxsID8gdm9pZCAwIDogX2FubiRvcHRpb25zXy5lbmhhbmNlcikgIT0gbnVsbCA/IF9hbm4kb3B0aW9uc18kZW5oYW5jZSA6IGRlZXBFbmhhbmNlciwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gYWRtLm5hbWVfICsgXCIuXCIgKyBuYW1lLnRvU3RyaW5nKCkgOiBcIk9ic2VydmFibGVPYmplY3QuXCIgKyBuYW1lLnRvU3RyaW5nKCksIGZhbHNlKTtcbiAgICBhZG0udmFsdWVzXy5zZXQobmFtZSwgb2JzZXJ2YWJsZSk7XG4gICAgaW5pdGlhbGl6ZWRPYmplY3RzLmFkZCh0YXJnZXQpO1xuICB9XG4gIGlmIChraW5kID09IFwiYWNjZXNzb3JcIikge1xuICAgIHJldHVybiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgaWYgKCFpbml0aWFsaXplZE9iamVjdHMuaGFzKHRoaXMpKSB7XG4gICAgICAgICAgaW5pdGlhbGl6ZU9ic2VydmFibGUodGhpcywgZGVzYy5nZXQuY2FsbCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNbJG1vYnhdLmdldE9ic2VydmFibGVQcm9wVmFsdWVfKG5hbWUpO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgICAgIGlmICghaW5pdGlhbGl6ZWRPYmplY3RzLmhhcyh0aGlzKSkge1xuICAgICAgICAgIGluaXRpYWxpemVPYnNlcnZhYmxlKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1skbW9ieF0uc2V0T2JzZXJ2YWJsZVByb3BWYWx1ZV8obmFtZSwgdmFsdWUpO1xuICAgICAgfSxcbiAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQodmFsdWUpIHtcbiAgICAgICAgaWYgKCFpbml0aWFsaXplZE9iamVjdHMuaGFzKHRoaXMpKSB7XG4gICAgICAgICAgaW5pdGlhbGl6ZU9ic2VydmFibGUodGhpcywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIHJldHVybjtcbn1cbmZ1bmN0aW9uIGFzc2VydE9ic2VydmFibGVEZXNjcmlwdG9yKGFkbSwgX3JlZiwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIHZhciBhbm5vdGF0aW9uVHlwZV8gPSBfcmVmLmFubm90YXRpb25UeXBlXztcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSkge1xuICAgIGRpZShcIkNhbm5vdCBhcHBseSAnXCIgKyBhbm5vdGF0aW9uVHlwZV8gKyBcIicgdG8gJ1wiICsgYWRtLm5hbWVfICsgXCIuXCIgKyBrZXkudG9TdHJpbmcoKSArIFwiJzpcIiArIChcIlxcbidcIiArIGFubm90YXRpb25UeXBlXyArIFwiJyBjYW5ub3QgYmUgdXNlZCBvbiBnZXR0ZXIvc2V0dGVyIHByb3BlcnRpZXNcIikpO1xuICB9XG59XG5cbnZhciBBVVRPID0gXCJ0cnVlXCI7XG52YXIgYXV0b0Fubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlQXV0b0Fubm90YXRpb24oKTtcbmZ1bmN0aW9uIGNyZWF0ZUF1dG9Bbm5vdGF0aW9uKG9wdGlvbnMpIHtcbiAgcmV0dXJuIHtcbiAgICBhbm5vdGF0aW9uVHlwZV86IEFVVE8sXG4gICAgb3B0aW9uc186IG9wdGlvbnMsXG4gICAgbWFrZV86IG1ha2VfJDUsXG4gICAgZXh0ZW5kXzogZXh0ZW5kXyQ1LFxuICAgIGRlY29yYXRlXzIwMjIzXzogZGVjb3JhdGVfMjAyMjNfJDVcbiAgfTtcbn1cbmZ1bmN0aW9uIG1ha2VfJDUoYWRtLCBrZXksIGRlc2NyaXB0b3IsIHNvdXJjZSkge1xuICB2YXIgX3RoaXMkb3B0aW9uc18zLCBfdGhpcyRvcHRpb25zXzQ7XG4gIC8vIGdldHRlciAtPiBjb21wdXRlZFxuICBpZiAoZGVzY3JpcHRvci5nZXQpIHtcbiAgICByZXR1cm4gY29tcHV0ZWQubWFrZV8oYWRtLCBrZXksIGRlc2NyaXB0b3IsIHNvdXJjZSk7XG4gIH1cbiAgLy8gbG9uZSBzZXR0ZXIgLT4gYWN0aW9uIHNldHRlclxuICBpZiAoZGVzY3JpcHRvci5zZXQpIHtcbiAgICAvLyBUT0RPIG1ha2UgYWN0aW9uIGFwcGxpY2FibGUgdG8gc2V0dGVyIGFuZCBkZWxlZ2F0ZSB0byBhY3Rpb24ubWFrZV9cbiAgICB2YXIgc2V0ID0gY3JlYXRlQWN0aW9uKGtleS50b1N0cmluZygpLCBkZXNjcmlwdG9yLnNldCk7XG4gICAgLy8gb3duXG4gICAgaWYgKHNvdXJjZSA9PT0gYWRtLnRhcmdldF8pIHtcbiAgICAgIHJldHVybiBhZG0uZGVmaW5lUHJvcGVydHlfKGtleSwge1xuICAgICAgICBjb25maWd1cmFibGU6IGdsb2JhbFN0YXRlLnNhZmVEZXNjcmlwdG9ycyA/IGFkbS5pc1BsYWluT2JqZWN0XyA6IHRydWUsXG4gICAgICAgIHNldDogc2V0XG4gICAgICB9KSA9PT0gbnVsbCA/IDAgLyogTWFrZVJlc3VsdC5DYW5jZWwgKi8gOiAyIC8qIE1ha2VSZXN1bHQuQ29udGludWUgKi87XG4gICAgfVxuICAgIC8vIHByb3RvXG4gICAgZGVmaW5lUHJvcGVydHkoc291cmNlLCBrZXksIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHNldDogc2V0XG4gICAgfSk7XG4gICAgcmV0dXJuIDIgLyogTWFrZVJlc3VsdC5Db250aW51ZSAqLztcbiAgfVxuICAvLyBmdW5jdGlvbiBvbiBwcm90byAtPiBhdXRvQWN0aW9uL2Zsb3dcbiAgaWYgKHNvdXJjZSAhPT0gYWRtLnRhcmdldF8gJiYgdHlwZW9mIGRlc2NyaXB0b3IudmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBfdGhpcyRvcHRpb25zXzI7XG4gICAgaWYgKGlzR2VuZXJhdG9yKGRlc2NyaXB0b3IudmFsdWUpKSB7XG4gICAgICB2YXIgX3RoaXMkb3B0aW9uc187XG4gICAgICB2YXIgZmxvd0Fubm90YXRpb24gPSAoX3RoaXMkb3B0aW9uc18gPSB0aGlzLm9wdGlvbnNfKSAhPSBudWxsICYmIF90aGlzJG9wdGlvbnNfLmF1dG9CaW5kID8gZmxvdy5ib3VuZCA6IGZsb3c7XG4gICAgICByZXR1cm4gZmxvd0Fubm90YXRpb24ubWFrZV8oYWRtLCBrZXksIGRlc2NyaXB0b3IsIHNvdXJjZSk7XG4gICAgfVxuICAgIHZhciBhY3Rpb25Bbm5vdGF0aW9uID0gKF90aGlzJG9wdGlvbnNfMiA9IHRoaXMub3B0aW9uc18pICE9IG51bGwgJiYgX3RoaXMkb3B0aW9uc18yLmF1dG9CaW5kID8gYXV0b0FjdGlvbi5ib3VuZCA6IGF1dG9BY3Rpb247XG4gICAgcmV0dXJuIGFjdGlvbkFubm90YXRpb24ubWFrZV8oYWRtLCBrZXksIGRlc2NyaXB0b3IsIHNvdXJjZSk7XG4gIH1cbiAgLy8gb3RoZXIgLT4gb2JzZXJ2YWJsZVxuICAvLyBDb3B5IHByb3BzIGZyb20gcHJvdG8gYXMgd2VsbCwgc2VlIHRlc3Q6XG4gIC8vIFwiZGVjb3JhdGUgc2hvdWxkIHdvcmsgd2l0aCBPYmplY3QuY3JlYXRlXCJcbiAgdmFyIG9ic2VydmFibGVBbm5vdGF0aW9uID0gKChfdGhpcyRvcHRpb25zXzMgPSB0aGlzLm9wdGlvbnNfKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMkb3B0aW9uc18zLmRlZXApID09PSBmYWxzZSA/IG9ic2VydmFibGUucmVmIDogb2JzZXJ2YWJsZTtcbiAgLy8gaWYgZnVuY3Rpb24gcmVzcGVjdCBhdXRvQmluZCBvcHRpb25cbiAgaWYgKHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSBcImZ1bmN0aW9uXCIgJiYgKF90aGlzJG9wdGlvbnNfNCA9IHRoaXMub3B0aW9uc18pICE9IG51bGwgJiYgX3RoaXMkb3B0aW9uc180LmF1dG9CaW5kKSB7XG4gICAgdmFyIF9hZG0kcHJveHlfO1xuICAgIGRlc2NyaXB0b3IudmFsdWUgPSBkZXNjcmlwdG9yLnZhbHVlLmJpbmQoKF9hZG0kcHJveHlfID0gYWRtLnByb3h5XykgIT0gbnVsbCA/IF9hZG0kcHJveHlfIDogYWRtLnRhcmdldF8pO1xuICB9XG4gIHJldHVybiBvYnNlcnZhYmxlQW5ub3RhdGlvbi5tYWtlXyhhZG0sIGtleSwgZGVzY3JpcHRvciwgc291cmNlKTtcbn1cbmZ1bmN0aW9uIGV4dGVuZF8kNShhZG0sIGtleSwgZGVzY3JpcHRvciwgcHJveHlUcmFwKSB7XG4gIHZhciBfdGhpcyRvcHRpb25zXzUsIF90aGlzJG9wdGlvbnNfNjtcbiAgLy8gZ2V0dGVyIC0+IGNvbXB1dGVkXG4gIGlmIChkZXNjcmlwdG9yLmdldCkge1xuICAgIHJldHVybiBjb21wdXRlZC5leHRlbmRfKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBwcm94eVRyYXApO1xuICB9XG4gIC8vIGxvbmUgc2V0dGVyIC0+IGFjdGlvbiBzZXR0ZXJcbiAgaWYgKGRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgLy8gVE9ETyBtYWtlIGFjdGlvbiBhcHBsaWNhYmxlIHRvIHNldHRlciBhbmQgZGVsZWdhdGUgdG8gYWN0aW9uLmV4dGVuZF9cbiAgICByZXR1cm4gYWRtLmRlZmluZVByb3BlcnR5XyhrZXksIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZ2xvYmFsU3RhdGUuc2FmZURlc2NyaXB0b3JzID8gYWRtLmlzUGxhaW5PYmplY3RfIDogdHJ1ZSxcbiAgICAgIHNldDogY3JlYXRlQWN0aW9uKGtleS50b1N0cmluZygpLCBkZXNjcmlwdG9yLnNldClcbiAgICB9LCBwcm94eVRyYXApO1xuICB9XG4gIC8vIG90aGVyIC0+IG9ic2VydmFibGVcbiAgLy8gaWYgZnVuY3Rpb24gcmVzcGVjdCBhdXRvQmluZCBvcHRpb25cbiAgaWYgKHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSBcImZ1bmN0aW9uXCIgJiYgKF90aGlzJG9wdGlvbnNfNSA9IHRoaXMub3B0aW9uc18pICE9IG51bGwgJiYgX3RoaXMkb3B0aW9uc181LmF1dG9CaW5kKSB7XG4gICAgdmFyIF9hZG0kcHJveHlfMjtcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gZGVzY3JpcHRvci52YWx1ZS5iaW5kKChfYWRtJHByb3h5XzIgPSBhZG0ucHJveHlfKSAhPSBudWxsID8gX2FkbSRwcm94eV8yIDogYWRtLnRhcmdldF8pO1xuICB9XG4gIHZhciBvYnNlcnZhYmxlQW5ub3RhdGlvbiA9ICgoX3RoaXMkb3B0aW9uc182ID0gdGhpcy5vcHRpb25zXykgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJG9wdGlvbnNfNi5kZWVwKSA9PT0gZmFsc2UgPyBvYnNlcnZhYmxlLnJlZiA6IG9ic2VydmFibGU7XG4gIHJldHVybiBvYnNlcnZhYmxlQW5ub3RhdGlvbi5leHRlbmRfKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBwcm94eVRyYXApO1xufVxuZnVuY3Rpb24gZGVjb3JhdGVfMjAyMjNfJDUoZGVzYywgY29udGV4dCkge1xuICBkaWUoXCInXCIgKyB0aGlzLmFubm90YXRpb25UeXBlXyArIFwiJyBjYW5ub3QgYmUgdXNlZCBhcyBhIGRlY29yYXRvclwiKTtcbn1cblxudmFyIE9CU0VSVkFCTEUgPSBcIm9ic2VydmFibGVcIjtcbnZhciBPQlNFUlZBQkxFX1JFRiA9IFwib2JzZXJ2YWJsZS5yZWZcIjtcbnZhciBPQlNFUlZBQkxFX1NIQUxMT1cgPSBcIm9ic2VydmFibGUuc2hhbGxvd1wiO1xudmFyIE9CU0VSVkFCTEVfU1RSVUNUID0gXCJvYnNlcnZhYmxlLnN0cnVjdFwiO1xuLy8gUHJlZGVmaW5lZCBiYWdzIG9mIGNyZWF0ZSBvYnNlcnZhYmxlIG9wdGlvbnMsIHRvIGF2b2lkIGFsbG9jYXRpbmcgdGVtcG9yYXJpbHkgb3B0aW9uIG9iamVjdHNcbi8vIGluIHRoZSBtYWpvcml0eSBvZiBjYXNlc1xudmFyIGRlZmF1bHRDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyA9IHtcbiAgZGVlcDogdHJ1ZSxcbiAgbmFtZTogdW5kZWZpbmVkLFxuICBkZWZhdWx0RGVjb3JhdG9yOiB1bmRlZmluZWQsXG4gIHByb3h5OiB0cnVlXG59O1xuT2JqZWN0LmZyZWV6ZShkZWZhdWx0Q3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMpO1xuZnVuY3Rpb24gYXNDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyh0aGluZykge1xuICByZXR1cm4gdGhpbmcgfHwgZGVmYXVsdENyZWF0ZU9ic2VydmFibGVPcHRpb25zO1xufVxudmFyIG9ic2VydmFibGVBbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZU9ic2VydmFibGVBbm5vdGF0aW9uKE9CU0VSVkFCTEUpO1xudmFyIG9ic2VydmFibGVSZWZBbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZU9ic2VydmFibGVBbm5vdGF0aW9uKE9CU0VSVkFCTEVfUkVGLCB7XG4gIGVuaGFuY2VyOiByZWZlcmVuY2VFbmhhbmNlclxufSk7XG52YXIgb2JzZXJ2YWJsZVNoYWxsb3dBbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZU9ic2VydmFibGVBbm5vdGF0aW9uKE9CU0VSVkFCTEVfU0hBTExPVywge1xuICBlbmhhbmNlcjogc2hhbGxvd0VuaGFuY2VyXG59KTtcbnZhciBvYnNlcnZhYmxlU3RydWN0QW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVPYnNlcnZhYmxlQW5ub3RhdGlvbihPQlNFUlZBQkxFX1NUUlVDVCwge1xuICBlbmhhbmNlcjogcmVmU3RydWN0RW5oYW5jZXJcbn0pO1xudmFyIG9ic2VydmFibGVEZWNvcmF0b3JBbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZURlY29yYXRvckFubm90YXRpb24ob2JzZXJ2YWJsZUFubm90YXRpb24pO1xuZnVuY3Rpb24gZ2V0RW5oYW5jZXJGcm9tT3B0aW9ucyhvcHRpb25zKSB7XG4gIHJldHVybiBvcHRpb25zLmRlZXAgPT09IHRydWUgPyBkZWVwRW5oYW5jZXIgOiBvcHRpb25zLmRlZXAgPT09IGZhbHNlID8gcmVmZXJlbmNlRW5oYW5jZXIgOiBnZXRFbmhhbmNlckZyb21Bbm5vdGF0aW9uKG9wdGlvbnMuZGVmYXVsdERlY29yYXRvcik7XG59XG5mdW5jdGlvbiBnZXRBbm5vdGF0aW9uRnJvbU9wdGlvbnMob3B0aW9ucykge1xuICB2YXIgX29wdGlvbnMkZGVmYXVsdERlY29yO1xuICByZXR1cm4gb3B0aW9ucyA/IChfb3B0aW9ucyRkZWZhdWx0RGVjb3IgPSBvcHRpb25zLmRlZmF1bHREZWNvcmF0b3IpICE9IG51bGwgPyBfb3B0aW9ucyRkZWZhdWx0RGVjb3IgOiBjcmVhdGVBdXRvQW5ub3RhdGlvbihvcHRpb25zKSA6IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGdldEVuaGFuY2VyRnJvbUFubm90YXRpb24oYW5ub3RhdGlvbikge1xuICB2YXIgX2Fubm90YXRpb24kb3B0aW9uc18kLCBfYW5ub3RhdGlvbiRvcHRpb25zXztcbiAgcmV0dXJuICFhbm5vdGF0aW9uID8gZGVlcEVuaGFuY2VyIDogKF9hbm5vdGF0aW9uJG9wdGlvbnNfJCA9IChfYW5ub3RhdGlvbiRvcHRpb25zXyA9IGFubm90YXRpb24ub3B0aW9uc18pID09IG51bGwgPyB2b2lkIDAgOiBfYW5ub3RhdGlvbiRvcHRpb25zXy5lbmhhbmNlcikgIT0gbnVsbCA/IF9hbm5vdGF0aW9uJG9wdGlvbnNfJCA6IGRlZXBFbmhhbmNlcjtcbn1cbi8qKlxuICogVHVybnMgYW4gb2JqZWN0LCBhcnJheSBvciBmdW5jdGlvbiBpbnRvIGEgcmVhY3RpdmUgc3RydWN0dXJlLlxuICogQHBhcmFtIHYgdGhlIHZhbHVlIHdoaWNoIHNob3VsZCBiZWNvbWUgb2JzZXJ2YWJsZS5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlT2JzZXJ2YWJsZSh2LCBhcmcyLCBhcmczKSB7XG4gIC8vIEBvYnNlcnZhYmxlIHNvbWVQcm9wOyAoMjAyMi4zIERlY29yYXRvcnMpXG4gIGlmIChpczIwMjIzRGVjb3JhdG9yKGFyZzIpKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGVBbm5vdGF0aW9uLmRlY29yYXRlXzIwMjIzXyh2LCBhcmcyKTtcbiAgfVxuICAvLyBAb2JzZXJ2YWJsZSBzb21lUHJvcDtcbiAgaWYgKGlzU3RyaW5naXNoKGFyZzIpKSB7XG4gICAgc3RvcmVBbm5vdGF0aW9uKHYsIGFyZzIsIG9ic2VydmFibGVBbm5vdGF0aW9uKTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gYWxyZWFkeSBvYnNlcnZhYmxlIC0gaWdub3JlXG4gIGlmIChpc09ic2VydmFibGUodikpIHtcbiAgICByZXR1cm4gdjtcbiAgfVxuICAvLyBwbGFpbiBvYmplY3RcbiAgaWYgKGlzUGxhaW5PYmplY3QodikpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5vYmplY3QodiwgYXJnMiwgYXJnMyk7XG4gIH1cbiAgLy8gQXJyYXlcbiAgaWYgKEFycmF5LmlzQXJyYXkodikpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5hcnJheSh2LCBhcmcyKTtcbiAgfVxuICAvLyBNYXBcbiAgaWYgKGlzRVM2TWFwKHYpKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUubWFwKHYsIGFyZzIpO1xuICB9XG4gIC8vIFNldFxuICBpZiAoaXNFUzZTZXQodikpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5zZXQodiwgYXJnMik7XG4gIH1cbiAgLy8gb3RoZXIgb2JqZWN0IC0gaWdub3JlXG4gIGlmICh0eXBlb2YgdiA9PT0gXCJvYmplY3RcIiAmJiB2ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHY7XG4gIH1cbiAgLy8gYW55dGhpbmcgZWxzZVxuICByZXR1cm4gb2JzZXJ2YWJsZS5ib3godiwgYXJnMik7XG59XG5hc3NpZ24oY3JlYXRlT2JzZXJ2YWJsZSwgb2JzZXJ2YWJsZURlY29yYXRvckFubm90YXRpb24pO1xudmFyIG9ic2VydmFibGVGYWN0b3JpZXMgPSB7XG4gIGJveDogZnVuY3Rpb24gYm94KHZhbHVlLCBvcHRpb25zKSB7XG4gICAgdmFyIG8gPSBhc0NyZWF0ZU9ic2VydmFibGVPcHRpb25zKG9wdGlvbnMpO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVZhbHVlKHZhbHVlLCBnZXRFbmhhbmNlckZyb21PcHRpb25zKG8pLCBvLm5hbWUsIHRydWUsIG8uZXF1YWxzKTtcbiAgfSxcbiAgYXJyYXk6IGZ1bmN0aW9uIGFycmF5KGluaXRpYWxWYWx1ZXMsIG9wdGlvbnMpIHtcbiAgICB2YXIgbyA9IGFzQ3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgcmV0dXJuIChnbG9iYWxTdGF0ZS51c2VQcm94aWVzID09PSBmYWxzZSB8fCBvLnByb3h5ID09PSBmYWxzZSA/IGNyZWF0ZUxlZ2FjeUFycmF5IDogY3JlYXRlT2JzZXJ2YWJsZUFycmF5KShpbml0aWFsVmFsdWVzLCBnZXRFbmhhbmNlckZyb21PcHRpb25zKG8pLCBvLm5hbWUpO1xuICB9LFxuICBtYXA6IGZ1bmN0aW9uIG1hcChpbml0aWFsVmFsdWVzLCBvcHRpb25zKSB7XG4gICAgdmFyIG8gPSBhc0NyZWF0ZU9ic2VydmFibGVPcHRpb25zKG9wdGlvbnMpO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZU1hcChpbml0aWFsVmFsdWVzLCBnZXRFbmhhbmNlckZyb21PcHRpb25zKG8pLCBvLm5hbWUpO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uIHNldChpbml0aWFsVmFsdWVzLCBvcHRpb25zKSB7XG4gICAgdmFyIG8gPSBhc0NyZWF0ZU9ic2VydmFibGVPcHRpb25zKG9wdGlvbnMpO1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVNldChpbml0aWFsVmFsdWVzLCBnZXRFbmhhbmNlckZyb21PcHRpb25zKG8pLCBvLm5hbWUpO1xuICB9LFxuICBvYmplY3Q6IGZ1bmN0aW9uIG9iamVjdChwcm9wcywgZGVjb3JhdG9ycywgb3B0aW9ucykge1xuICAgIHJldHVybiBpbml0T2JzZXJ2YWJsZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZXh0ZW5kT2JzZXJ2YWJsZShnbG9iYWxTdGF0ZS51c2VQcm94aWVzID09PSBmYWxzZSB8fCAob3B0aW9ucyA9PSBudWxsID8gdm9pZCAwIDogb3B0aW9ucy5wcm94eSkgPT09IGZhbHNlID8gYXNPYnNlcnZhYmxlT2JqZWN0KHt9LCBvcHRpb25zKSA6IGFzRHluYW1pY09ic2VydmFibGVPYmplY3Qoe30sIG9wdGlvbnMpLCBwcm9wcywgZGVjb3JhdG9ycyk7XG4gICAgfSk7XG4gIH0sXG4gIHJlZjogLyojX19QVVJFX18qL2NyZWF0ZURlY29yYXRvckFubm90YXRpb24ob2JzZXJ2YWJsZVJlZkFubm90YXRpb24pLFxuICBzaGFsbG93OiAvKiNfX1BVUkVfXyovY3JlYXRlRGVjb3JhdG9yQW5ub3RhdGlvbihvYnNlcnZhYmxlU2hhbGxvd0Fubm90YXRpb24pLFxuICBkZWVwOiBvYnNlcnZhYmxlRGVjb3JhdG9yQW5ub3RhdGlvbixcbiAgc3RydWN0OiAvKiNfX1BVUkVfXyovY3JlYXRlRGVjb3JhdG9yQW5ub3RhdGlvbihvYnNlcnZhYmxlU3RydWN0QW5ub3RhdGlvbilcbn07XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbnZhciBvYnNlcnZhYmxlID0gLyojX19QVVJFX18qL2Fzc2lnbihjcmVhdGVPYnNlcnZhYmxlLCBvYnNlcnZhYmxlRmFjdG9yaWVzKTtcblxudmFyIENPTVBVVEVEID0gXCJjb21wdXRlZFwiO1xudmFyIENPTVBVVEVEX1NUUlVDVCA9IFwiY29tcHV0ZWQuc3RydWN0XCI7XG52YXIgY29tcHV0ZWRBbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUNvbXB1dGVkQW5ub3RhdGlvbihDT01QVVRFRCk7XG52YXIgY29tcHV0ZWRTdHJ1Y3RBbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUNvbXB1dGVkQW5ub3RhdGlvbihDT01QVVRFRF9TVFJVQ1QsIHtcbiAgZXF1YWxzOiBjb21wYXJlci5zdHJ1Y3R1cmFsXG59KTtcbi8qKlxuICogRGVjb3JhdG9yIGZvciBjbGFzcyBwcm9wZXJ0aWVzOiBAY29tcHV0ZWQgZ2V0IHZhbHVlKCkgeyByZXR1cm4gZXhwcjsgfS5cbiAqIEZvciBsZWdhY3kgcHVycG9zZXMgYWxzbyBpbnZva2FibGUgYXMgRVM1IG9ic2VydmFibGUgY3JlYXRlZDogYGNvbXB1dGVkKCgpID0+IGV4cHIpYDtcbiAqL1xudmFyIGNvbXB1dGVkID0gZnVuY3Rpb24gY29tcHV0ZWQoYXJnMSwgYXJnMikge1xuICBpZiAoaXMyMDIyM0RlY29yYXRvcihhcmcyKSkge1xuICAgIC8vIEBjb21wdXRlZCAoMjAyMi4zIERlY29yYXRvcnMpXG4gICAgcmV0dXJuIGNvbXB1dGVkQW5ub3RhdGlvbi5kZWNvcmF0ZV8yMDIyM18oYXJnMSwgYXJnMik7XG4gIH1cbiAgaWYgKGlzU3RyaW5naXNoKGFyZzIpKSB7XG4gICAgLy8gQGNvbXB1dGVkXG4gICAgcmV0dXJuIHN0b3JlQW5ub3RhdGlvbihhcmcxLCBhcmcyLCBjb21wdXRlZEFubm90YXRpb24pO1xuICB9XG4gIGlmIChpc1BsYWluT2JqZWN0KGFyZzEpKSB7XG4gICAgLy8gQGNvbXB1dGVkKHsgb3B0aW9ucyB9KVxuICAgIHJldHVybiBjcmVhdGVEZWNvcmF0b3JBbm5vdGF0aW9uKGNyZWF0ZUNvbXB1dGVkQW5ub3RhdGlvbihDT01QVVRFRCwgYXJnMSkpO1xuICB9XG4gIC8vIGNvbXB1dGVkKGV4cHIsIG9wdGlvbnM/KVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgaWYgKCFpc0Z1bmN0aW9uKGFyZzEpKSB7XG4gICAgICBkaWUoXCJGaXJzdCBhcmd1bWVudCB0byBgY29tcHV0ZWRgIHNob3VsZCBiZSBhbiBleHByZXNzaW9uLlwiKTtcbiAgICB9XG4gICAgaWYgKGlzRnVuY3Rpb24oYXJnMikpIHtcbiAgICAgIGRpZShcIkEgc2V0dGVyIGFzIHNlY29uZCBhcmd1bWVudCBpcyBubyBsb25nZXIgc3VwcG9ydGVkLCB1c2UgYHsgc2V0OiBmbiB9YCBvcHRpb24gaW5zdGVhZFwiKTtcbiAgICB9XG4gIH1cbiAgdmFyIG9wdHMgPSBpc1BsYWluT2JqZWN0KGFyZzIpID8gYXJnMiA6IHt9O1xuICBvcHRzLmdldCA9IGFyZzE7XG4gIG9wdHMubmFtZSB8fCAob3B0cy5uYW1lID0gYXJnMS5uYW1lIHx8IFwiXCIpOyAvKiBmb3IgZ2VuZXJhdGVkIG5hbWUgKi9cbiAgcmV0dXJuIG5ldyBDb21wdXRlZFZhbHVlKG9wdHMpO1xufTtcbk9iamVjdC5hc3NpZ24oY29tcHV0ZWQsIGNvbXB1dGVkQW5ub3RhdGlvbik7XG5jb21wdXRlZC5zdHJ1Y3QgPSAvKiNfX1BVUkVfXyovY3JlYXRlRGVjb3JhdG9yQW5ub3RhdGlvbihjb21wdXRlZFN0cnVjdEFubm90YXRpb24pO1xuXG52YXIgX2dldERlc2NyaXB0b3IkY29uZmlnLCBfZ2V0RGVzY3JpcHRvcjtcbi8vIHdlIGRvbid0IHVzZSBnbG9iYWxTdGF0ZSBmb3IgdGhlc2UgaW4gb3JkZXIgdG8gYXZvaWQgcG9zc2libGUgaXNzdWVzIHdpdGggbXVsdGlwbGVcbi8vIG1vYnggdmVyc2lvbnNcbnZhciBjdXJyZW50QWN0aW9uSWQgPSAwO1xudmFyIG5leHRBY3Rpb25JZCA9IDE7XG52YXIgaXNGdW5jdGlvbk5hbWVDb25maWd1cmFibGUgPSAoX2dldERlc2NyaXB0b3IkY29uZmlnID0gKF9nZXREZXNjcmlwdG9yID0gLyojX19QVVJFX18qL2dldERlc2NyaXB0b3IoZnVuY3Rpb24gKCkge30sIFwibmFtZVwiKSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9nZXREZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSkgIT0gbnVsbCA/IF9nZXREZXNjcmlwdG9yJGNvbmZpZyA6IGZhbHNlO1xuLy8gd2UgY2FuIHNhZmVseSByZWN5Y2xlIHRoaXMgb2JqZWN0XG52YXIgdG1wTmFtZURlc2NyaXB0b3IgPSB7XG4gIHZhbHVlOiBcImFjdGlvblwiLFxuICBjb25maWd1cmFibGU6IHRydWUsXG4gIHdyaXRhYmxlOiBmYWxzZSxcbiAgZW51bWVyYWJsZTogZmFsc2Vcbn07XG5mdW5jdGlvbiBjcmVhdGVBY3Rpb24oYWN0aW9uTmFtZSwgZm4sIGF1dG9BY3Rpb24sIHJlZikge1xuICBpZiAoYXV0b0FjdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgYXV0b0FjdGlvbiA9IGZhbHNlO1xuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAoIWlzRnVuY3Rpb24oZm4pKSB7XG4gICAgICBkaWUoXCJgYWN0aW9uYCBjYW4gb25seSBiZSBpbnZva2VkIG9uIGZ1bmN0aW9uc1wiKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBhY3Rpb25OYW1lICE9PSBcInN0cmluZ1wiIHx8ICFhY3Rpb25OYW1lKSB7XG4gICAgICBkaWUoXCJhY3Rpb25zIHNob3VsZCBoYXZlIHZhbGlkIG5hbWVzLCBnb3Q6ICdcIiArIGFjdGlvbk5hbWUgKyBcIidcIik7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHJlcygpIHtcbiAgICByZXR1cm4gZXhlY3V0ZUFjdGlvbihhY3Rpb25OYW1lLCBhdXRvQWN0aW9uLCBmbiwgcmVmIHx8IHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cbiAgcmVzLmlzTW9ieEFjdGlvbiA9IHRydWU7XG4gIHJlcy50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZm4udG9TdHJpbmcoKTtcbiAgfTtcbiAgaWYgKGlzRnVuY3Rpb25OYW1lQ29uZmlndXJhYmxlKSB7XG4gICAgdG1wTmFtZURlc2NyaXB0b3IudmFsdWUgPSBhY3Rpb25OYW1lO1xuICAgIGRlZmluZVByb3BlcnR5KHJlcywgXCJuYW1lXCIsIHRtcE5hbWVEZXNjcmlwdG9yKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuZnVuY3Rpb24gZXhlY3V0ZUFjdGlvbihhY3Rpb25OYW1lLCBjYW5SdW5Bc0Rlcml2YXRpb24sIGZuLCBzY29wZSwgYXJncykge1xuICB2YXIgcnVuSW5mbyA9IF9zdGFydEFjdGlvbihhY3Rpb25OYW1lLCBjYW5SdW5Bc0Rlcml2YXRpb24sIHNjb3BlLCBhcmdzKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZm4uYXBwbHkoc2NvcGUsIGFyZ3MpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBydW5JbmZvLmVycm9yXyA9IGVycjtcbiAgICB0aHJvdyBlcnI7XG4gIH0gZmluYWxseSB7XG4gICAgX2VuZEFjdGlvbihydW5JbmZvKTtcbiAgfVxufVxuZnVuY3Rpb24gX3N0YXJ0QWN0aW9uKGFjdGlvbk5hbWUsIGNhblJ1bkFzRGVyaXZhdGlvbixcbi8vIHRydWUgZm9yIGF1dG9BY3Rpb25cbnNjb3BlLCBhcmdzKSB7XG4gIHZhciBub3RpZnlTcHlfID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGlzU3B5RW5hYmxlZCgpICYmICEhYWN0aW9uTmFtZTtcbiAgdmFyIHN0YXJ0VGltZV8gPSAwO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweV8pIHtcbiAgICBzdGFydFRpbWVfID0gRGF0ZS5ub3coKTtcbiAgICB2YXIgZmxhdHRlbmVkQXJncyA9IGFyZ3MgPyBBcnJheS5mcm9tKGFyZ3MpIDogRU1QVFlfQVJSQVk7XG4gICAgc3B5UmVwb3J0U3RhcnQoe1xuICAgICAgdHlwZTogQUNUSU9OLFxuICAgICAgbmFtZTogYWN0aW9uTmFtZSxcbiAgICAgIG9iamVjdDogc2NvcGUsXG4gICAgICBhcmd1bWVudHM6IGZsYXR0ZW5lZEFyZ3NcbiAgICB9KTtcbiAgfVxuICB2YXIgcHJldkRlcml2YXRpb25fID0gZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uO1xuICB2YXIgcnVuQXNBY3Rpb24gPSAhY2FuUnVuQXNEZXJpdmF0aW9uIHx8ICFwcmV2RGVyaXZhdGlvbl87XG4gIHN0YXJ0QmF0Y2goKTtcbiAgdmFyIHByZXZBbGxvd1N0YXRlQ2hhbmdlc18gPSBnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlQ2hhbmdlczsgLy8gYnkgZGVmYXVsdCBwcmVzZXJ2ZSBwcmV2aW91cyBhbGxvd1xuICBpZiAocnVuQXNBY3Rpb24pIHtcbiAgICB1bnRyYWNrZWRTdGFydCgpO1xuICAgIHByZXZBbGxvd1N0YXRlQ2hhbmdlc18gPSBhbGxvd1N0YXRlQ2hhbmdlc1N0YXJ0KHRydWUpO1xuICB9XG4gIHZhciBwcmV2QWxsb3dTdGF0ZVJlYWRzXyA9IGFsbG93U3RhdGVSZWFkc1N0YXJ0KHRydWUpO1xuICB2YXIgcnVuSW5mbyA9IHtcbiAgICBydW5Bc0FjdGlvbl86IHJ1bkFzQWN0aW9uLFxuICAgIHByZXZEZXJpdmF0aW9uXzogcHJldkRlcml2YXRpb25fLFxuICAgIHByZXZBbGxvd1N0YXRlQ2hhbmdlc186IHByZXZBbGxvd1N0YXRlQ2hhbmdlc18sXG4gICAgcHJldkFsbG93U3RhdGVSZWFkc186IHByZXZBbGxvd1N0YXRlUmVhZHNfLFxuICAgIG5vdGlmeVNweV86IG5vdGlmeVNweV8sXG4gICAgc3RhcnRUaW1lXzogc3RhcnRUaW1lXyxcbiAgICBhY3Rpb25JZF86IG5leHRBY3Rpb25JZCsrLFxuICAgIHBhcmVudEFjdGlvbklkXzogY3VycmVudEFjdGlvbklkXG4gIH07XG4gIGN1cnJlbnRBY3Rpb25JZCA9IHJ1bkluZm8uYWN0aW9uSWRfO1xuICByZXR1cm4gcnVuSW5mbztcbn1cbmZ1bmN0aW9uIF9lbmRBY3Rpb24ocnVuSW5mbykge1xuICBpZiAoY3VycmVudEFjdGlvbklkICE9PSBydW5JbmZvLmFjdGlvbklkXykge1xuICAgIGRpZSgzMCk7XG4gIH1cbiAgY3VycmVudEFjdGlvbklkID0gcnVuSW5mby5wYXJlbnRBY3Rpb25JZF87XG4gIGlmIChydW5JbmZvLmVycm9yXyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZ2xvYmFsU3RhdGUuc3VwcHJlc3NSZWFjdGlvbkVycm9ycyA9IHRydWU7XG4gIH1cbiAgYWxsb3dTdGF0ZUNoYW5nZXNFbmQocnVuSW5mby5wcmV2QWxsb3dTdGF0ZUNoYW5nZXNfKTtcbiAgYWxsb3dTdGF0ZVJlYWRzRW5kKHJ1bkluZm8ucHJldkFsbG93U3RhdGVSZWFkc18pO1xuICBlbmRCYXRjaCgpO1xuICBpZiAocnVuSW5mby5ydW5Bc0FjdGlvbl8pIHtcbiAgICB1bnRyYWNrZWRFbmQocnVuSW5mby5wcmV2RGVyaXZhdGlvbl8pO1xuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgcnVuSW5mby5ub3RpZnlTcHlfKSB7XG4gICAgc3B5UmVwb3J0RW5kKHtcbiAgICAgIHRpbWU6IERhdGUubm93KCkgLSBydW5JbmZvLnN0YXJ0VGltZV9cbiAgICB9KTtcbiAgfVxuICBnbG9iYWxTdGF0ZS5zdXBwcmVzc1JlYWN0aW9uRXJyb3JzID0gZmFsc2U7XG59XG5mdW5jdGlvbiBhbGxvd1N0YXRlQ2hhbmdlcyhhbGxvd1N0YXRlQ2hhbmdlcywgZnVuYykge1xuICB2YXIgcHJldiA9IGFsbG93U3RhdGVDaGFuZ2VzU3RhcnQoYWxsb3dTdGF0ZUNoYW5nZXMpO1xuICB0cnkge1xuICAgIHJldHVybiBmdW5jKCk7XG4gIH0gZmluYWxseSB7XG4gICAgYWxsb3dTdGF0ZUNoYW5nZXNFbmQocHJldik7XG4gIH1cbn1cbmZ1bmN0aW9uIGFsbG93U3RhdGVDaGFuZ2VzU3RhcnQoYWxsb3dTdGF0ZUNoYW5nZXMpIHtcbiAgdmFyIHByZXYgPSBnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlQ2hhbmdlcztcbiAgZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZUNoYW5nZXMgPSBhbGxvd1N0YXRlQ2hhbmdlcztcbiAgcmV0dXJuIHByZXY7XG59XG5mdW5jdGlvbiBhbGxvd1N0YXRlQ2hhbmdlc0VuZChwcmV2KSB7XG4gIGdsb2JhbFN0YXRlLmFsbG93U3RhdGVDaGFuZ2VzID0gcHJldjtcbn1cblxudmFyIF9TeW1ib2wkdG9QcmltaXRpdmU7XG52YXIgQ1JFQVRFID0gXCJjcmVhdGVcIjtcbl9TeW1ib2wkdG9QcmltaXRpdmUgPSBTeW1ib2wudG9QcmltaXRpdmU7XG52YXIgT2JzZXJ2YWJsZVZhbHVlID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfQXRvbSkge1xuICBfaW5oZXJpdHNMb29zZShPYnNlcnZhYmxlVmFsdWUsIF9BdG9tKTtcbiAgZnVuY3Rpb24gT2JzZXJ2YWJsZVZhbHVlKHZhbHVlLCBlbmhhbmNlciwgbmFtZV8sIG5vdGlmeVNweSwgZXF1YWxzKSB7XG4gICAgdmFyIF90aGlzO1xuICAgIGlmIChuYW1lXyA9PT0gdm9pZCAwKSB7XG4gICAgICBuYW1lXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiT2JzZXJ2YWJsZVZhbHVlQFwiICsgZ2V0TmV4dElkKCkgOiBcIk9ic2VydmFibGVWYWx1ZVwiO1xuICAgIH1cbiAgICBpZiAobm90aWZ5U3B5ID09PSB2b2lkIDApIHtcbiAgICAgIG5vdGlmeVNweSA9IHRydWU7XG4gICAgfVxuICAgIGlmIChlcXVhbHMgPT09IHZvaWQgMCkge1xuICAgICAgZXF1YWxzID0gY29tcGFyZXJbXCJkZWZhdWx0XCJdO1xuICAgIH1cbiAgICBfdGhpcyA9IF9BdG9tLmNhbGwodGhpcywgbmFtZV8pIHx8IHRoaXM7XG4gICAgX3RoaXMuZW5oYW5jZXIgPSB2b2lkIDA7XG4gICAgX3RoaXMubmFtZV8gPSB2b2lkIDA7XG4gICAgX3RoaXMuZXF1YWxzID0gdm9pZCAwO1xuICAgIF90aGlzLmhhc1VucmVwb3J0ZWRDaGFuZ2VfID0gZmFsc2U7XG4gICAgX3RoaXMuaW50ZXJjZXB0b3JzXyA9IHZvaWQgMDtcbiAgICBfdGhpcy5jaGFuZ2VMaXN0ZW5lcnNfID0gdm9pZCAwO1xuICAgIF90aGlzLnZhbHVlXyA9IHZvaWQgMDtcbiAgICBfdGhpcy5kZWhhbmNlciA9IHZvaWQgMDtcbiAgICBfdGhpcy5lbmhhbmNlciA9IGVuaGFuY2VyO1xuICAgIF90aGlzLm5hbWVfID0gbmFtZV87XG4gICAgX3RoaXMuZXF1YWxzID0gZXF1YWxzO1xuICAgIF90aGlzLnZhbHVlXyA9IGVuaGFuY2VyKHZhbHVlLCB1bmRlZmluZWQsIG5hbWVfKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSAmJiBpc1NweUVuYWJsZWQoKSkge1xuICAgICAgLy8gb25seSBub3RpZnkgc3B5IGlmIHRoaXMgaXMgYSBzdGFuZC1hbG9uZSBvYnNlcnZhYmxlXG4gICAgICBzcHlSZXBvcnQoe1xuICAgICAgICB0eXBlOiBDUkVBVEUsXG4gICAgICAgIG9iamVjdDogX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksXG4gICAgICAgIG9ic2VydmFibGVLaW5kOiBcInZhbHVlXCIsXG4gICAgICAgIGRlYnVnT2JqZWN0TmFtZTogX3RoaXMubmFtZV8sXG4gICAgICAgIG5ld1ZhbHVlOiBcIlwiICsgX3RoaXMudmFsdWVfXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG4gIHZhciBfcHJvdG8gPSBPYnNlcnZhYmxlVmFsdWUucHJvdG90eXBlO1xuICBfcHJvdG8uZGVoYW5jZVZhbHVlID0gZnVuY3Rpb24gZGVoYW5jZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuZGVoYW5jZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVoYW5jZXIodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG4gIF9wcm90by5zZXQgPSBmdW5jdGlvbiBzZXQobmV3VmFsdWUpIHtcbiAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlXztcbiAgICBuZXdWYWx1ZSA9IHRoaXMucHJlcGFyZU5ld1ZhbHVlXyhuZXdWYWx1ZSk7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSBnbG9iYWxTdGF0ZS5VTkNIQU5HRUQpIHtcbiAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQoKTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICAgIHNweVJlcG9ydFN0YXJ0KHtcbiAgICAgICAgICB0eXBlOiBVUERBVEUsXG4gICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgIG9ic2VydmFibGVLaW5kOiBcInZhbHVlXCIsXG4gICAgICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLnNldE5ld1ZhbHVlXyhuZXdWYWx1ZSk7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIF9wcm90by5wcmVwYXJlTmV3VmFsdWVfID0gZnVuY3Rpb24gcHJlcGFyZU5ld1ZhbHVlXyhuZXdWYWx1ZSkge1xuICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkKHRoaXMpO1xuICAgIGlmIChoYXNJbnRlcmNlcHRvcnModGhpcykpIHtcbiAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UodGhpcywge1xuICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgIHR5cGU6IFVQREFURSxcbiAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICB9KTtcbiAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgIHJldHVybiBnbG9iYWxTdGF0ZS5VTkNIQU5HRUQ7XG4gICAgICB9XG4gICAgICBuZXdWYWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICB9XG4gICAgLy8gYXBwbHkgbW9kaWZpZXJcbiAgICBuZXdWYWx1ZSA9IHRoaXMuZW5oYW5jZXIobmV3VmFsdWUsIHRoaXMudmFsdWVfLCB0aGlzLm5hbWVfKTtcbiAgICByZXR1cm4gdGhpcy5lcXVhbHModGhpcy52YWx1ZV8sIG5ld1ZhbHVlKSA/IGdsb2JhbFN0YXRlLlVOQ0hBTkdFRCA6IG5ld1ZhbHVlO1xuICB9O1xuICBfcHJvdG8uc2V0TmV3VmFsdWVfID0gZnVuY3Rpb24gc2V0TmV3VmFsdWVfKG5ld1ZhbHVlKSB7XG4gICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZV87XG4gICAgdGhpcy52YWx1ZV8gPSBuZXdWYWx1ZTtcbiAgICB0aGlzLnJlcG9ydENoYW5nZWQoKTtcbiAgICBpZiAoaGFzTGlzdGVuZXJzKHRoaXMpKSB7XG4gICAgICBub3RpZnlMaXN0ZW5lcnModGhpcywge1xuICAgICAgICB0eXBlOiBVUERBVEUsXG4gICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmdldCA9IGZ1bmN0aW9uIGdldCgpIHtcbiAgICB0aGlzLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgcmV0dXJuIHRoaXMuZGVoYW5jZVZhbHVlKHRoaXMudmFsdWVfKTtcbiAgfTtcbiAgX3Byb3RvLmludGVyY2VwdF8gPSBmdW5jdGlvbiBpbnRlcmNlcHRfKGhhbmRsZXIpIHtcbiAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvcih0aGlzLCBoYW5kbGVyKTtcbiAgfTtcbiAgX3Byb3RvLm9ic2VydmVfID0gZnVuY3Rpb24gb2JzZXJ2ZV8obGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgIGlmIChmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgIGxpc3RlbmVyKHtcbiAgICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwidmFsdWVcIixcbiAgICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgIHR5cGU6IFVQREFURSxcbiAgICAgICAgbmV3VmFsdWU6IHRoaXMudmFsdWVfLFxuICAgICAgICBvbGRWYWx1ZTogdW5kZWZpbmVkXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZ2lzdGVyTGlzdGVuZXIodGhpcywgbGlzdGVuZXIpO1xuICB9O1xuICBfcHJvdG8ucmF3ID0gZnVuY3Rpb24gcmF3KCkge1xuICAgIC8vIHVzZWQgYnkgTVNUIG90IGdldCB1bmRlaGFuY2VkIHZhbHVlXG4gICAgcmV0dXJuIHRoaXMudmFsdWVfO1xuICB9O1xuICBfcHJvdG8udG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzLmdldCgpO1xuICB9O1xuICBfcHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lXyArIFwiW1wiICsgdGhpcy52YWx1ZV8gKyBcIl1cIjtcbiAgfTtcbiAgX3Byb3RvLnZhbHVlT2YgPSBmdW5jdGlvbiB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB0b1ByaW1pdGl2ZSh0aGlzLmdldCgpKTtcbiAgfTtcbiAgX3Byb3RvW19TeW1ib2wkdG9QcmltaXRpdmVdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKTtcbiAgfTtcbiAgcmV0dXJuIE9ic2VydmFibGVWYWx1ZTtcbn0oQXRvbSk7XG52YXIgaXNPYnNlcnZhYmxlVmFsdWUgPSAvKiNfX1BVUkVfXyovY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZShcIk9ic2VydmFibGVWYWx1ZVwiLCBPYnNlcnZhYmxlVmFsdWUpO1xuXG52YXIgX1N5bWJvbCR0b1ByaW1pdGl2ZSQxO1xuLyoqXG4gKiBBIG5vZGUgaW4gdGhlIHN0YXRlIGRlcGVuZGVuY3kgcm9vdCB0aGF0IG9ic2VydmVzIG90aGVyIG5vZGVzLCBhbmQgY2FuIGJlIG9ic2VydmVkIGl0c2VsZi5cbiAqXG4gKiBDb21wdXRlZFZhbHVlIHdpbGwgcmVtZW1iZXIgdGhlIHJlc3VsdCBvZiB0aGUgY29tcHV0YXRpb24gZm9yIHRoZSBkdXJhdGlvbiBvZiB0aGUgYmF0Y2gsIG9yXG4gKiB3aGlsZSBiZWluZyBvYnNlcnZlZC5cbiAqXG4gKiBEdXJpbmcgdGhpcyB0aW1lIGl0IHdpbGwgcmVjb21wdXRlIG9ubHkgd2hlbiBvbmUgb2YgaXRzIGRpcmVjdCBkZXBlbmRlbmNpZXMgY2hhbmdlZCxcbiAqIGJ1dCBvbmx5IHdoZW4gaXQgaXMgYmVpbmcgYWNjZXNzZWQgd2l0aCBgQ29tcHV0ZWRWYWx1ZS5nZXQoKWAuXG4gKlxuICogSW1wbGVtZW50YXRpb24gZGVzY3JpcHRpb246XG4gKiAxLiBGaXJzdCB0aW1lIGl0J3MgYmVpbmcgYWNjZXNzZWQgaXQgd2lsbCBjb21wdXRlIGFuZCByZW1lbWJlciByZXN1bHRcbiAqICAgIGdpdmUgYmFjayByZW1lbWJlcmVkIHJlc3VsdCB1bnRpbCAyLiBoYXBwZW5zXG4gKiAyLiBGaXJzdCB0aW1lIGFueSBkZWVwIGRlcGVuZGVuY3kgY2hhbmdlLCBwcm9wYWdhdGUgUE9TU0lCTFlfU1RBTEUgdG8gYWxsIG9ic2VydmVycywgd2FpdCBmb3IgMy5cbiAqIDMuIFdoZW4gaXQncyBiZWluZyBhY2Nlc3NlZCwgcmVjb21wdXRlIGlmIGFueSBzaGFsbG93IGRlcGVuZGVuY3kgY2hhbmdlZC5cbiAqICAgIGlmIHJlc3VsdCBjaGFuZ2VkOiBwcm9wYWdhdGUgU1RBTEUgdG8gYWxsIG9ic2VydmVycywgdGhhdCB3ZXJlIFBPU1NJQkxZX1NUQUxFIGZyb20gdGhlIGxhc3Qgc3RlcC5cbiAqICAgIGdvIHRvIHN0ZXAgMi4gZWl0aGVyIHdheVxuICpcbiAqIElmIGF0IGFueSBwb2ludCBpdCdzIG91dHNpZGUgYmF0Y2ggYW5kIGl0IGlzbid0IG9ic2VydmVkOiByZXNldCBldmVyeXRoaW5nIGFuZCBnbyB0byAxLlxuICovXG5fU3ltYm9sJHRvUHJpbWl0aXZlJDEgPSBTeW1ib2wudG9QcmltaXRpdmU7XG52YXIgQ29tcHV0ZWRWYWx1ZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIC8vIG5vZGVzIHdlIGFyZSBsb29raW5nIGF0LiBPdXIgdmFsdWUgZGVwZW5kcyBvbiB0aGVzZSBub2Rlc1xuICAvLyBkdXJpbmcgdHJhY2tpbmcgaXQncyBhbiBhcnJheSB3aXRoIG5ldyBvYnNlcnZlZCBvYnNlcnZlcnNcblxuICAvLyB0byBjaGVjayBmb3IgY3ljbGVzXG5cbiAgLy8gTi5COiB1bm1pbmlmaWVkIGFzIGl0IGlzIHVzZWQgYnkgTVNUXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBjb21wdXRlZCB2YWx1ZSBiYXNlZCBvbiBhIGZ1bmN0aW9uIGV4cHJlc3Npb24uXG4gICAqXG4gICAqIFRoZSBgbmFtZWAgcHJvcGVydHkgaXMgZm9yIGRlYnVnIHB1cnBvc2VzIG9ubHkuXG4gICAqXG4gICAqIFRoZSBgZXF1YWxzYCBwcm9wZXJ0eSBzcGVjaWZpZXMgdGhlIGNvbXBhcmVyIGZ1bmN0aW9uIHRvIHVzZSB0byBkZXRlcm1pbmUgaWYgYSBuZXdseSBwcm9kdWNlZFxuICAgKiB2YWx1ZSBkaWZmZXJzIGZyb20gdGhlIHByZXZpb3VzIHZhbHVlLiBUd28gY29tcGFyZXJzIGFyZSBwcm92aWRlZCBpbiB0aGUgbGlicmFyeTsgYGRlZmF1bHRDb21wYXJlcmBcbiAgICogY29tcGFyZXMgYmFzZWQgb24gaWRlbnRpdHkgY29tcGFyaXNvbiAoPT09KSwgYW5kIGBzdHJ1Y3R1cmFsQ29tcGFyZXJgIGRlZXBseSBjb21wYXJlcyB0aGUgc3RydWN0dXJlLlxuICAgKiBTdHJ1Y3R1cmFsIGNvbXBhcmlzb24gY2FuIGJlIGNvbnZlbmllbnQgaWYgeW91IGFsd2F5cyBwcm9kdWNlIGEgbmV3IGFnZ3JlZ2F0ZWQgb2JqZWN0IGFuZFxuICAgKiBkb24ndCB3YW50IHRvIG5vdGlmeSBvYnNlcnZlcnMgaWYgaXQgaXMgc3RydWN0dXJhbGx5IHRoZSBzYW1lLlxuICAgKiBUaGlzIGlzIHVzZWZ1bCBmb3Igd29ya2luZyB3aXRoIHZlY3RvcnMsIG1vdXNlIGNvb3JkaW5hdGVzIGV0Yy5cbiAgICovXG4gIGZ1bmN0aW9uIENvbXB1dGVkVmFsdWUob3B0aW9ucykge1xuICAgIHRoaXMuZGVwZW5kZW5jaWVzU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uTk9UX1RSQUNLSU5HXztcbiAgICB0aGlzLm9ic2VydmluZ18gPSBbXTtcbiAgICB0aGlzLm5ld09ic2VydmluZ18gPSBudWxsO1xuICAgIHRoaXMuaXNCZWluZ09ic2VydmVkXyA9IGZhbHNlO1xuICAgIHRoaXMuaXNQZW5kaW5nVW5vYnNlcnZhdGlvbl8gPSBmYWxzZTtcbiAgICB0aGlzLm9ic2VydmVyc18gPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5kaWZmVmFsdWVfID0gMDtcbiAgICB0aGlzLnJ1bklkXyA9IDA7XG4gICAgdGhpcy5sYXN0QWNjZXNzZWRCeV8gPSAwO1xuICAgIHRoaXMubG93ZXN0T2JzZXJ2ZXJTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5VUF9UT19EQVRFXztcbiAgICB0aGlzLnVuYm91bmREZXBzQ291bnRfID0gMDtcbiAgICB0aGlzLnZhbHVlXyA9IG5ldyBDYXVnaHRFeGNlcHRpb24obnVsbCk7XG4gICAgdGhpcy5uYW1lXyA9IHZvaWQgMDtcbiAgICB0aGlzLnRyaWdnZXJlZEJ5XyA9IHZvaWQgMDtcbiAgICB0aGlzLmlzQ29tcHV0aW5nXyA9IGZhbHNlO1xuICAgIHRoaXMuaXNSdW5uaW5nU2V0dGVyXyA9IGZhbHNlO1xuICAgIHRoaXMuZGVyaXZhdGlvbiA9IHZvaWQgMDtcbiAgICB0aGlzLnNldHRlcl8gPSB2b2lkIDA7XG4gICAgdGhpcy5pc1RyYWNpbmdfID0gVHJhY2VNb2RlLk5PTkU7XG4gICAgdGhpcy5zY29wZV8gPSB2b2lkIDA7XG4gICAgdGhpcy5lcXVhbHNfID0gdm9pZCAwO1xuICAgIHRoaXMucmVxdWlyZXNSZWFjdGlvbl8gPSB2b2lkIDA7XG4gICAgdGhpcy5rZWVwQWxpdmVfID0gdm9pZCAwO1xuICAgIHRoaXMub25CT0wgPSB2b2lkIDA7XG4gICAgdGhpcy5vbkJVT0wgPSB2b2lkIDA7XG4gICAgaWYgKCFvcHRpb25zLmdldCkge1xuICAgICAgZGllKDMxKTtcbiAgICB9XG4gICAgdGhpcy5kZXJpdmF0aW9uID0gb3B0aW9ucy5nZXQ7XG4gICAgdGhpcy5uYW1lXyA9IG9wdGlvbnMubmFtZSB8fCAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJDb21wdXRlZFZhbHVlQFwiICsgZ2V0TmV4dElkKCkgOiBcIkNvbXB1dGVkVmFsdWVcIik7XG4gICAgaWYgKG9wdGlvbnMuc2V0KSB7XG4gICAgICB0aGlzLnNldHRlcl8gPSBjcmVhdGVBY3Rpb24ocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gdGhpcy5uYW1lXyArIFwiLXNldHRlclwiIDogXCJDb21wdXRlZFZhbHVlLXNldHRlclwiLCBvcHRpb25zLnNldCk7XG4gICAgfVxuICAgIHRoaXMuZXF1YWxzXyA9IG9wdGlvbnMuZXF1YWxzIHx8IChvcHRpb25zLmNvbXBhcmVTdHJ1Y3R1cmFsIHx8IG9wdGlvbnMuc3RydWN0ID8gY29tcGFyZXIuc3RydWN0dXJhbCA6IGNvbXBhcmVyW1wiZGVmYXVsdFwiXSk7XG4gICAgdGhpcy5zY29wZV8gPSBvcHRpb25zLmNvbnRleHQ7XG4gICAgdGhpcy5yZXF1aXJlc1JlYWN0aW9uXyA9IG9wdGlvbnMucmVxdWlyZXNSZWFjdGlvbjtcbiAgICB0aGlzLmtlZXBBbGl2ZV8gPSAhIW9wdGlvbnMua2VlcEFsaXZlO1xuICB9XG4gIHZhciBfcHJvdG8gPSBDb21wdXRlZFZhbHVlLnByb3RvdHlwZTtcbiAgX3Byb3RvLm9uQmVjb21lU3RhbGVfID0gZnVuY3Rpb24gb25CZWNvbWVTdGFsZV8oKSB7XG4gICAgcHJvcGFnYXRlTWF5YmVDaGFuZ2VkKHRoaXMpO1xuICB9O1xuICBfcHJvdG8ub25CTyA9IGZ1bmN0aW9uIG9uQk8oKSB7XG4gICAgaWYgKHRoaXMub25CT0wpIHtcbiAgICAgIHRoaXMub25CT0wuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5vbkJVTyA9IGZ1bmN0aW9uIG9uQlVPKCkge1xuICAgIGlmICh0aGlzLm9uQlVPTCkge1xuICAgICAgdGhpcy5vbkJVT0wuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RlbmVyKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhpcyBjb21wdXRlZCB2YWx1ZS5cbiAgICogV2lsbCBldmFsdWF0ZSBpdHMgY29tcHV0YXRpb24gZmlyc3QgaWYgbmVlZGVkLlxuICAgKi87XG4gIF9wcm90by5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgaWYgKHRoaXMuaXNDb21wdXRpbmdfKSB7XG4gICAgICBkaWUoMzIsIHRoaXMubmFtZV8sIHRoaXMuZGVyaXZhdGlvbik7XG4gICAgfVxuICAgIGlmIChnbG9iYWxTdGF0ZS5pbkJhdGNoID09PSAwICYmXG4gICAgLy8gIWdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdHBpb24gJiZcbiAgICB0aGlzLm9ic2VydmVyc18uc2l6ZSA9PT0gMCAmJiAhdGhpcy5rZWVwQWxpdmVfKSB7XG4gICAgICBpZiAoc2hvdWxkQ29tcHV0ZSh0aGlzKSkge1xuICAgICAgICB0aGlzLndhcm5BYm91dFVudHJhY2tlZFJlYWRfKCk7XG4gICAgICAgIHN0YXJ0QmF0Y2goKTsgLy8gU2VlIHBlcmYgdGVzdCAnY29tcHV0ZWQgbWVtb2l6YXRpb24nXG4gICAgICAgIHRoaXMudmFsdWVfID0gdGhpcy5jb21wdXRlVmFsdWVfKGZhbHNlKTtcbiAgICAgICAgZW5kQmF0Y2goKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVwb3J0T2JzZXJ2ZWQodGhpcyk7XG4gICAgICBpZiAoc2hvdWxkQ29tcHV0ZSh0aGlzKSkge1xuICAgICAgICB2YXIgcHJldlRyYWNraW5nQ29udGV4dCA9IGdsb2JhbFN0YXRlLnRyYWNraW5nQ29udGV4dDtcbiAgICAgICAgaWYgKHRoaXMua2VlcEFsaXZlXyAmJiAhcHJldlRyYWNraW5nQ29udGV4dCkge1xuICAgICAgICAgIGdsb2JhbFN0YXRlLnRyYWNraW5nQ29udGV4dCA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMudHJhY2tBbmRDb21wdXRlKCkpIHtcbiAgICAgICAgICBwcm9wYWdhdGVDaGFuZ2VDb25maXJtZWQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsU3RhdGUudHJhY2tpbmdDb250ZXh0ID0gcHJldlRyYWNraW5nQ29udGV4dDtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IHRoaXMudmFsdWVfO1xuICAgIGlmIChpc0NhdWdodEV4Y2VwdGlvbihyZXN1bHQpKSB7XG4gICAgICB0aHJvdyByZXN1bHQuY2F1c2U7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIF9wcm90by5zZXQgPSBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICBpZiAodGhpcy5zZXR0ZXJfKSB7XG4gICAgICBpZiAodGhpcy5pc1J1bm5pbmdTZXR0ZXJfKSB7XG4gICAgICAgIGRpZSgzMywgdGhpcy5uYW1lXyk7XG4gICAgICB9XG4gICAgICB0aGlzLmlzUnVubmluZ1NldHRlcl8gPSB0cnVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5zZXR0ZXJfLmNhbGwodGhpcy5zY29wZV8sIHZhbHVlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMuaXNSdW5uaW5nU2V0dGVyXyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkaWUoMzQsIHRoaXMubmFtZV8pO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnRyYWNrQW5kQ29tcHV0ZSA9IGZ1bmN0aW9uIHRyYWNrQW5kQ29tcHV0ZSgpIHtcbiAgICAvLyBOLkI6IHVubWluaWZpZWQgYXMgaXQgaXMgdXNlZCBieSBNU1RcbiAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlXztcbiAgICB2YXIgd2FzU3VzcGVuZGVkID0gLyogc2VlICMxMjA4ICovdGhpcy5kZXBlbmRlbmNpZXNTdGF0ZV8gPT09IElEZXJpdmF0aW9uU3RhdGVfLk5PVF9UUkFDS0lOR187XG4gICAgdmFyIG5ld1ZhbHVlID0gdGhpcy5jb21wdXRlVmFsdWVfKHRydWUpO1xuICAgIHZhciBjaGFuZ2VkID0gd2FzU3VzcGVuZGVkIHx8IGlzQ2F1Z2h0RXhjZXB0aW9uKG9sZFZhbHVlKSB8fCBpc0NhdWdodEV4Y2VwdGlvbihuZXdWYWx1ZSkgfHwgIXRoaXMuZXF1YWxzXyhvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICB0aGlzLnZhbHVlXyA9IG5ld1ZhbHVlO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBpc1NweUVuYWJsZWQoKSkge1xuICAgICAgICBzcHlSZXBvcnQoe1xuICAgICAgICAgIG9ic2VydmFibGVLaW5kOiBcImNvbXB1dGVkXCIsXG4gICAgICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgICAgIG9iamVjdDogdGhpcy5zY29wZV8sXG4gICAgICAgICAgdHlwZTogXCJ1cGRhdGVcIixcbiAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWUsXG4gICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2hhbmdlZDtcbiAgfTtcbiAgX3Byb3RvLmNvbXB1dGVWYWx1ZV8gPSBmdW5jdGlvbiBjb21wdXRlVmFsdWVfKHRyYWNrKSB7XG4gICAgdGhpcy5pc0NvbXB1dGluZ18gPSB0cnVlO1xuICAgIC8vIGRvbid0IGFsbG93IHN0YXRlIGNoYW5nZXMgZHVyaW5nIGNvbXB1dGF0aW9uXG4gICAgdmFyIHByZXYgPSBhbGxvd1N0YXRlQ2hhbmdlc1N0YXJ0KGZhbHNlKTtcbiAgICB2YXIgcmVzO1xuICAgIGlmICh0cmFjaykge1xuICAgICAgcmVzID0gdHJhY2tEZXJpdmVkRnVuY3Rpb24odGhpcywgdGhpcy5kZXJpdmF0aW9uLCB0aGlzLnNjb3BlXyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChnbG9iYWxTdGF0ZS5kaXNhYmxlRXJyb3JCb3VuZGFyaWVzID09PSB0cnVlKSB7XG4gICAgICAgIHJlcyA9IHRoaXMuZGVyaXZhdGlvbi5jYWxsKHRoaXMuc2NvcGVfKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVzID0gdGhpcy5kZXJpdmF0aW9uLmNhbGwodGhpcy5zY29wZV8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmVzID0gbmV3IENhdWdodEV4Y2VwdGlvbihlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBhbGxvd1N0YXRlQ2hhbmdlc0VuZChwcmV2KTtcbiAgICB0aGlzLmlzQ29tcHV0aW5nXyA9IGZhbHNlO1xuICAgIHJldHVybiByZXM7XG4gIH07XG4gIF9wcm90by5zdXNwZW5kXyA9IGZ1bmN0aW9uIHN1c3BlbmRfKCkge1xuICAgIGlmICghdGhpcy5rZWVwQWxpdmVfKSB7XG4gICAgICBjbGVhck9ic2VydmluZyh0aGlzKTtcbiAgICAgIHRoaXMudmFsdWVfID0gdW5kZWZpbmVkOyAvLyBkb24ndCBob2xkIG9uIHRvIGNvbXB1dGVkIHZhbHVlIVxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiB0aGlzLmlzVHJhY2luZ18gIT09IFRyYWNlTW9kZS5OT05FKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW21vYngudHJhY2VdIENvbXB1dGVkIHZhbHVlICdcIiArIHRoaXMubmFtZV8gKyBcIicgd2FzIHN1c3BlbmRlZCBhbmQgaXQgd2lsbCByZWNvbXB1dGUgb24gdGhlIG5leHQgYWNjZXNzLlwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIF9wcm90by5vYnNlcnZlXyA9IGZ1bmN0aW9uIG9ic2VydmVfKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBmaXJzdFRpbWUgPSB0cnVlO1xuICAgIHZhciBwcmV2VmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGF1dG9ydW4oZnVuY3Rpb24gKCkge1xuICAgICAgLy8gVE9ETzogd2h5IGlzIHRoaXMgaW4gYSBkaWZmZXJlbnQgcGxhY2UgdGhhbiB0aGUgc3B5UmVwb3J0KCkgZnVuY3Rpb24/IGluIGFsbCBvdGhlciBvYnNlcnZhYmxlcyBpdCdzIGNhbGxlZCBpbiB0aGUgc2FtZSBwbGFjZVxuICAgICAgdmFyIG5ld1ZhbHVlID0gX3RoaXMuZ2V0KCk7XG4gICAgICBpZiAoIWZpcnN0VGltZSB8fCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgdmFyIHByZXZVID0gdW50cmFja2VkU3RhcnQoKTtcbiAgICAgICAgbGlzdGVuZXIoe1xuICAgICAgICAgIG9ic2VydmFibGVLaW5kOiBcImNvbXB1dGVkXCIsXG4gICAgICAgICAgZGVidWdPYmplY3ROYW1lOiBfdGhpcy5uYW1lXyxcbiAgICAgICAgICB0eXBlOiBVUERBVEUsXG4gICAgICAgICAgb2JqZWN0OiBfdGhpcyxcbiAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWUsXG4gICAgICAgICAgb2xkVmFsdWU6IHByZXZWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgdW50cmFja2VkRW5kKHByZXZVKTtcbiAgICAgIH1cbiAgICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICAgICAgcHJldlZhbHVlID0gbmV3VmFsdWU7XG4gICAgfSk7XG4gIH07XG4gIF9wcm90by53YXJuQWJvdXRVbnRyYWNrZWRSZWFkXyA9IGZ1bmN0aW9uIHdhcm5BYm91dFVudHJhY2tlZFJlYWRfKCkge1xuICAgIGlmICghKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNUcmFjaW5nXyAhPT0gVHJhY2VNb2RlLk5PTkUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW21vYngudHJhY2VdIENvbXB1dGVkIHZhbHVlICdcIiArIHRoaXMubmFtZV8gKyBcIicgaXMgYmVpbmcgcmVhZCBvdXRzaWRlIGEgcmVhY3RpdmUgY29udGV4dC4gRG9pbmcgYSBmdWxsIHJlY29tcHV0ZS5cIik7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5yZXF1aXJlc1JlYWN0aW9uXyA9PT0gXCJib29sZWFuXCIgPyB0aGlzLnJlcXVpcmVzUmVhY3Rpb25fIDogZ2xvYmFsU3RhdGUuY29tcHV0ZWRSZXF1aXJlc1JlYWN0aW9uKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJbbW9ieF0gQ29tcHV0ZWQgdmFsdWUgJ1wiICsgdGhpcy5uYW1lXyArIFwiJyBpcyBiZWluZyByZWFkIG91dHNpZGUgYSByZWFjdGl2ZSBjb250ZXh0LiBEb2luZyBhIGZ1bGwgcmVjb21wdXRlLlwiKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWVfICsgXCJbXCIgKyB0aGlzLmRlcml2YXRpb24udG9TdHJpbmcoKSArIFwiXVwiO1xuICB9O1xuICBfcHJvdG8udmFsdWVPZiA9IGZ1bmN0aW9uIHZhbHVlT2YoKSB7XG4gICAgcmV0dXJuIHRvUHJpbWl0aXZlKHRoaXMuZ2V0KCkpO1xuICB9O1xuICBfcHJvdG9bX1N5bWJvbCR0b1ByaW1pdGl2ZSQxXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCk7XG4gIH07XG4gIHJldHVybiBDb21wdXRlZFZhbHVlO1xufSgpO1xudmFyIGlzQ29tcHV0ZWRWYWx1ZSA9IC8qI19fUFVSRV9fKi9jcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlKFwiQ29tcHV0ZWRWYWx1ZVwiLCBDb21wdXRlZFZhbHVlKTtcblxudmFyIElEZXJpdmF0aW9uU3RhdGVfO1xuKGZ1bmN0aW9uIChJRGVyaXZhdGlvblN0YXRlXykge1xuICAvLyBiZWZvcmUgYmVpbmcgcnVuIG9yIChvdXRzaWRlIGJhdGNoIGFuZCBub3QgYmVpbmcgb2JzZXJ2ZWQpXG4gIC8vIGF0IHRoaXMgcG9pbnQgZGVyaXZhdGlvbiBpcyBub3QgaG9sZGluZyBhbnkgZGF0YSBhYm91dCBkZXBlbmRlbmN5IHRyZWVcbiAgSURlcml2YXRpb25TdGF0ZV9bSURlcml2YXRpb25TdGF0ZV9bXCJOT1RfVFJBQ0tJTkdfXCJdID0gLTFdID0gXCJOT1RfVFJBQ0tJTkdfXCI7XG4gIC8vIG5vIHNoYWxsb3cgZGVwZW5kZW5jeSBjaGFuZ2VkIHNpbmNlIGxhc3QgY29tcHV0YXRpb25cbiAgLy8gd29uJ3QgcmVjYWxjdWxhdGUgZGVyaXZhdGlvblxuICAvLyB0aGlzIGlzIHdoYXQgbWFrZXMgbW9ieCBmYXN0XG4gIElEZXJpdmF0aW9uU3RhdGVfW0lEZXJpdmF0aW9uU3RhdGVfW1wiVVBfVE9fREFURV9cIl0gPSAwXSA9IFwiVVBfVE9fREFURV9cIjtcbiAgLy8gc29tZSBkZWVwIGRlcGVuZGVuY3kgY2hhbmdlZCwgYnV0IGRvbid0IGtub3cgaWYgc2hhbGxvdyBkZXBlbmRlbmN5IGNoYW5nZWRcbiAgLy8gd2lsbCByZXF1aXJlIHRvIGNoZWNrIGZpcnN0IGlmIFVQX1RPX0RBVEUgb3IgUE9TU0lCTFlfU1RBTEVcbiAgLy8gY3VycmVudGx5IG9ubHkgQ29tcHV0ZWRWYWx1ZSB3aWxsIHByb3BhZ2F0ZSBQT1NTSUJMWV9TVEFMRVxuICAvL1xuICAvLyBoYXZpbmcgdGhpcyBzdGF0ZSBpcyBzZWNvbmQgYmlnIG9wdGltaXphdGlvbjpcbiAgLy8gZG9uJ3QgaGF2ZSB0byByZWNvbXB1dGUgb24gZXZlcnkgZGVwZW5kZW5jeSBjaGFuZ2UsIGJ1dCBvbmx5IHdoZW4gaXQncyBuZWVkZWRcbiAgSURlcml2YXRpb25TdGF0ZV9bSURlcml2YXRpb25TdGF0ZV9bXCJQT1NTSUJMWV9TVEFMRV9cIl0gPSAxXSA9IFwiUE9TU0lCTFlfU1RBTEVfXCI7XG4gIC8vIEEgc2hhbGxvdyBkZXBlbmRlbmN5IGhhcyBjaGFuZ2VkIHNpbmNlIGxhc3QgY29tcHV0YXRpb24gYW5kIHRoZSBkZXJpdmF0aW9uXG4gIC8vIHdpbGwgbmVlZCB0byByZWNvbXB1dGUgd2hlbiBpdCdzIG5lZWRlZCBuZXh0LlxuICBJRGVyaXZhdGlvblN0YXRlX1tJRGVyaXZhdGlvblN0YXRlX1tcIlNUQUxFX1wiXSA9IDJdID0gXCJTVEFMRV9cIjtcbn0pKElEZXJpdmF0aW9uU3RhdGVfIHx8IChJRGVyaXZhdGlvblN0YXRlXyA9IHt9KSk7XG52YXIgVHJhY2VNb2RlO1xuKGZ1bmN0aW9uIChUcmFjZU1vZGUpIHtcbiAgVHJhY2VNb2RlW1RyYWNlTW9kZVtcIk5PTkVcIl0gPSAwXSA9IFwiTk9ORVwiO1xuICBUcmFjZU1vZGVbVHJhY2VNb2RlW1wiTE9HXCJdID0gMV0gPSBcIkxPR1wiO1xuICBUcmFjZU1vZGVbVHJhY2VNb2RlW1wiQlJFQUtcIl0gPSAyXSA9IFwiQlJFQUtcIjtcbn0pKFRyYWNlTW9kZSB8fCAoVHJhY2VNb2RlID0ge30pKTtcbnZhciBDYXVnaHRFeGNlcHRpb24gPSBmdW5jdGlvbiBDYXVnaHRFeGNlcHRpb24oY2F1c2UpIHtcbiAgdGhpcy5jYXVzZSA9IHZvaWQgMDtcbiAgdGhpcy5jYXVzZSA9IGNhdXNlO1xuICAvLyBFbXB0eVxufTtcblxuZnVuY3Rpb24gaXNDYXVnaHRFeGNlcHRpb24oZSkge1xuICByZXR1cm4gZSBpbnN0YW5jZW9mIENhdWdodEV4Y2VwdGlvbjtcbn1cbi8qKlxuICogRmluZHMgb3V0IHdoZXRoZXIgYW55IGRlcGVuZGVuY3kgb2YgdGhlIGRlcml2YXRpb24gaGFzIGFjdHVhbGx5IGNoYW5nZWQuXG4gKiBJZiBkZXBlbmRlbmNpZXNTdGF0ZSBpcyAxIHRoZW4gaXQgd2lsbCByZWNhbGN1bGF0ZSBkZXBlbmRlbmNpZXMsXG4gKiBpZiBhbnkgZGVwZW5kZW5jeSBjaGFuZ2VkIGl0IHdpbGwgcHJvcGFnYXRlIGl0IGJ5IGNoYW5naW5nIGRlcGVuZGVuY2llc1N0YXRlIHRvIDIuXG4gKlxuICogQnkgaXRlcmF0aW5nIG92ZXIgdGhlIGRlcGVuZGVuY2llcyBpbiB0aGUgc2FtZSBvcmRlciB0aGF0IHRoZXkgd2VyZSByZXBvcnRlZCBhbmRcbiAqIHN0b3BwaW5nIG9uIHRoZSBmaXJzdCBjaGFuZ2UsIGFsbCB0aGUgcmVjYWxjdWxhdGlvbnMgYXJlIG9ubHkgY2FsbGVkIGZvciBDb21wdXRlZFZhbHVlc1xuICogdGhhdCB3aWxsIGJlIHRyYWNrZWQgYnkgZGVyaXZhdGlvbi4gVGhhdCBpcyBiZWNhdXNlIHdlIGFzc3VtZSB0aGF0IGlmIHRoZSBmaXJzdCB4XG4gKiBkZXBlbmRlbmNpZXMgb2YgdGhlIGRlcml2YXRpb24gZG9lc24ndCBjaGFuZ2UgdGhlbiB0aGUgZGVyaXZhdGlvbiBzaG91bGQgcnVuIHRoZSBzYW1lIHdheVxuICogdXAgdW50aWwgYWNjZXNzaW5nIHgtdGggZGVwZW5kZW5jeS5cbiAqL1xuZnVuY3Rpb24gc2hvdWxkQ29tcHV0ZShkZXJpdmF0aW9uKSB7XG4gIHN3aXRjaCAoZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZV8pIHtcbiAgICBjYXNlIElEZXJpdmF0aW9uU3RhdGVfLlVQX1RPX0RBVEVfOlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNhc2UgSURlcml2YXRpb25TdGF0ZV8uTk9UX1RSQUNLSU5HXzpcbiAgICBjYXNlIElEZXJpdmF0aW9uU3RhdGVfLlNUQUxFXzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNhc2UgSURlcml2YXRpb25TdGF0ZV8uUE9TU0lCTFlfU1RBTEVfOlxuICAgICAge1xuICAgICAgICAvLyBzdGF0ZSBwcm9wYWdhdGlvbiBjYW4gb2NjdXIgb3V0c2lkZSBvZiBhY3Rpb24vcmVhY3RpdmUgY29udGV4dCAjMjE5NVxuICAgICAgICB2YXIgcHJldkFsbG93U3RhdGVSZWFkcyA9IGFsbG93U3RhdGVSZWFkc1N0YXJ0KHRydWUpO1xuICAgICAgICB2YXIgcHJldlVudHJhY2tlZCA9IHVudHJhY2tlZFN0YXJ0KCk7IC8vIG5vIG5lZWQgZm9yIHRob3NlIGNvbXB1dGVkcyB0byBiZSByZXBvcnRlZCwgdGhleSB3aWxsIGJlIHBpY2tlZCB1cCBpbiB0cmFja0Rlcml2ZWRGdW5jdGlvbi5cbiAgICAgICAgdmFyIG9icyA9IGRlcml2YXRpb24ub2JzZXJ2aW5nXyxcbiAgICAgICAgICBsID0gb2JzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB2YXIgb2JqID0gb2JzW2ldO1xuICAgICAgICAgIGlmIChpc0NvbXB1dGVkVmFsdWUob2JqKSkge1xuICAgICAgICAgICAgaWYgKGdsb2JhbFN0YXRlLmRpc2FibGVFcnJvckJvdW5kYXJpZXMpIHtcbiAgICAgICAgICAgICAgb2JqLmdldCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBvYmouZ2V0KCk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvLyB3ZSBhcmUgbm90IGludGVyZXN0ZWQgaW4gdGhlIHZhbHVlICpvciogZXhjZXB0aW9uIGF0IHRoaXMgbW9tZW50LCBidXQgaWYgdGhlcmUgaXMgb25lLCBub3RpZnkgYWxsXG4gICAgICAgICAgICAgICAgdW50cmFja2VkRW5kKHByZXZVbnRyYWNrZWQpO1xuICAgICAgICAgICAgICAgIGFsbG93U3RhdGVSZWFkc0VuZChwcmV2QWxsb3dTdGF0ZVJlYWRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgQ29tcHV0ZWRWYWx1ZSBgb2JqYCBhY3R1YWxseSBjaGFuZ2VkIGl0IHdpbGwgYmUgY29tcHV0ZWQgYW5kIHByb3BhZ2F0ZWQgdG8gaXRzIG9ic2VydmVycy5cbiAgICAgICAgICAgIC8vIGFuZCBgZGVyaXZhdGlvbmAgaXMgYW4gb2JzZXJ2ZXIgb2YgYG9iamBcbiAgICAgICAgICAgIC8vIGludmFyaWFudFNob3VsZENvbXB1dGUoZGVyaXZhdGlvbilcbiAgICAgICAgICAgIGlmIChkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlXyA9PT0gSURlcml2YXRpb25TdGF0ZV8uU1RBTEVfKSB7XG4gICAgICAgICAgICAgIHVudHJhY2tlZEVuZChwcmV2VW50cmFja2VkKTtcbiAgICAgICAgICAgICAgYWxsb3dTdGF0ZVJlYWRzRW5kKHByZXZBbGxvd1N0YXRlUmVhZHMpO1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hhbmdlRGVwZW5kZW5jaWVzU3RhdGVUbzAoZGVyaXZhdGlvbik7XG4gICAgICAgIHVudHJhY2tlZEVuZChwcmV2VW50cmFja2VkKTtcbiAgICAgICAgYWxsb3dTdGF0ZVJlYWRzRW5kKHByZXZBbGxvd1N0YXRlUmVhZHMpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIGlzQ29tcHV0aW5nRGVyaXZhdGlvbigpIHtcbiAgcmV0dXJuIGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbiAhPT0gbnVsbDsgLy8gZmlsdGVyIG91dCBhY3Rpb25zIGluc2lkZSBjb21wdXRhdGlvbnNcbn1cblxuZnVuY3Rpb24gY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQoYXRvbSkge1xuICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBoYXNPYnNlcnZlcnMgPSBhdG9tLm9ic2VydmVyc18uc2l6ZSA+IDA7XG4gIC8vIFNob3VsZCBub3QgYmUgcG9zc2libGUgdG8gY2hhbmdlIG9ic2VydmVkIHN0YXRlIG91dHNpZGUgc3RyaWN0IG1vZGUsIGV4Y2VwdCBkdXJpbmcgaW5pdGlhbGl6YXRpb24sIHNlZSAjNTYzXG4gIGlmICghZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZUNoYW5nZXMgJiYgKGhhc09ic2VydmVycyB8fCBnbG9iYWxTdGF0ZS5lbmZvcmNlQWN0aW9ucyA9PT0gXCJhbHdheXNcIikpIHtcbiAgICBjb25zb2xlLndhcm4oXCJbTW9iWF0gXCIgKyAoZ2xvYmFsU3RhdGUuZW5mb3JjZUFjdGlvbnMgPyBcIlNpbmNlIHN0cmljdC1tb2RlIGlzIGVuYWJsZWQsIGNoYW5naW5nIChvYnNlcnZlZCkgb2JzZXJ2YWJsZSB2YWx1ZXMgd2l0aG91dCB1c2luZyBhbiBhY3Rpb24gaXMgbm90IGFsbG93ZWQuIFRyaWVkIHRvIG1vZGlmeTogXCIgOiBcIlNpZGUgZWZmZWN0cyBsaWtlIGNoYW5naW5nIHN0YXRlIGFyZSBub3QgYWxsb3dlZCBhdCB0aGlzIHBvaW50LiBBcmUgeW91IHRyeWluZyB0byBtb2RpZnkgc3RhdGUgZnJvbSwgZm9yIGV4YW1wbGUsIGEgY29tcHV0ZWQgdmFsdWUgb3IgdGhlIHJlbmRlciBmdW5jdGlvbiBvZiBhIFJlYWN0IGNvbXBvbmVudD8gWW91IGNhbiB3cmFwIHNpZGUgZWZmZWN0cyBpbiAncnVuSW5BY3Rpb24nIChvciBkZWNvcmF0ZSBmdW5jdGlvbnMgd2l0aCAnYWN0aW9uJykgaWYgbmVlZGVkLiBUcmllZCB0byBtb2RpZnk6IFwiKSArIGF0b20ubmFtZV8pO1xuICB9XG59XG5mdW5jdGlvbiBjaGVja0lmU3RhdGVSZWFkc0FyZUFsbG93ZWQob2JzZXJ2YWJsZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlUmVhZHMgJiYgZ2xvYmFsU3RhdGUub2JzZXJ2YWJsZVJlcXVpcmVzUmVhY3Rpb24pIHtcbiAgICBjb25zb2xlLndhcm4oXCJbbW9ieF0gT2JzZXJ2YWJsZSAnXCIgKyBvYnNlcnZhYmxlLm5hbWVfICsgXCInIGJlaW5nIHJlYWQgb3V0c2lkZSBhIHJlYWN0aXZlIGNvbnRleHQuXCIpO1xuICB9XG59XG4vKipcbiAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBgZmAgYW5kIHRyYWNrcyB3aGljaCBvYnNlcnZhYmxlcyBhcmUgYmVpbmcgYWNjZXNzZWQuXG4gKiBUaGUgdHJhY2tpbmcgaW5mb3JtYXRpb24gaXMgc3RvcmVkIG9uIHRoZSBgZGVyaXZhdGlvbmAgb2JqZWN0IGFuZCB0aGUgZGVyaXZhdGlvbiBpcyByZWdpc3RlcmVkXG4gKiBhcyBvYnNlcnZlciBvZiBhbnkgb2YgdGhlIGFjY2Vzc2VkIG9ic2VydmFibGVzLlxuICovXG5mdW5jdGlvbiB0cmFja0Rlcml2ZWRGdW5jdGlvbihkZXJpdmF0aW9uLCBmLCBjb250ZXh0KSB7XG4gIHZhciBwcmV2QWxsb3dTdGF0ZVJlYWRzID0gYWxsb3dTdGF0ZVJlYWRzU3RhcnQodHJ1ZSk7XG4gIGNoYW5nZURlcGVuZGVuY2llc1N0YXRlVG8wKGRlcml2YXRpb24pO1xuICAvLyBQcmVhbGxvY2F0ZSBhcnJheTsgd2lsbCBiZSB0cmltbWVkIGJ5IGJpbmREZXBlbmRlbmNpZXMuXG4gIGRlcml2YXRpb24ubmV3T2JzZXJ2aW5nXyA9IG5ldyBBcnJheShcbiAgLy8gUmVzZXJ2ZSBjb25zdGFudCBzcGFjZSBmb3IgaW5pdGlhbCBkZXBlbmRlbmNpZXMsIGR5bmFtaWMgc3BhY2Ugb3RoZXJ3aXNlLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21vYnhqcy9tb2J4L3B1bGwvMzgzM1xuICBkZXJpdmF0aW9uLnJ1bklkXyA9PT0gMCA/IDEwMCA6IGRlcml2YXRpb24ub2JzZXJ2aW5nXy5sZW5ndGgpO1xuICBkZXJpdmF0aW9uLnVuYm91bmREZXBzQ291bnRfID0gMDtcbiAgZGVyaXZhdGlvbi5ydW5JZF8gPSArK2dsb2JhbFN0YXRlLnJ1bklkO1xuICB2YXIgcHJldlRyYWNraW5nID0gZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uO1xuICBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb24gPSBkZXJpdmF0aW9uO1xuICBnbG9iYWxTdGF0ZS5pbkJhdGNoKys7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChnbG9iYWxTdGF0ZS5kaXNhYmxlRXJyb3JCb3VuZGFyaWVzID09PSB0cnVlKSB7XG4gICAgcmVzdWx0ID0gZi5jYWxsKGNvbnRleHQpO1xuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSBmLmNhbGwoY29udGV4dCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmVzdWx0ID0gbmV3IENhdWdodEV4Y2VwdGlvbihlKTtcbiAgICB9XG4gIH1cbiAgZ2xvYmFsU3RhdGUuaW5CYXRjaC0tO1xuICBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb24gPSBwcmV2VHJhY2tpbmc7XG4gIGJpbmREZXBlbmRlbmNpZXMoZGVyaXZhdGlvbik7XG4gIHdhcm5BYm91dERlcml2YXRpb25XaXRob3V0RGVwZW5kZW5jaWVzKGRlcml2YXRpb24pO1xuICBhbGxvd1N0YXRlUmVhZHNFbmQocHJldkFsbG93U3RhdGVSZWFkcyk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiB3YXJuQWJvdXREZXJpdmF0aW9uV2l0aG91dERlcGVuZGVuY2llcyhkZXJpdmF0aW9uKSB7XG4gIGlmICghKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGRlcml2YXRpb24ub2JzZXJ2aW5nXy5sZW5ndGggIT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHR5cGVvZiBkZXJpdmF0aW9uLnJlcXVpcmVzT2JzZXJ2YWJsZV8gPT09IFwiYm9vbGVhblwiID8gZGVyaXZhdGlvbi5yZXF1aXJlc09ic2VydmFibGVfIDogZ2xvYmFsU3RhdGUucmVhY3Rpb25SZXF1aXJlc09ic2VydmFibGUpIHtcbiAgICBjb25zb2xlLndhcm4oXCJbbW9ieF0gRGVyaXZhdGlvbiAnXCIgKyBkZXJpdmF0aW9uLm5hbWVfICsgXCInIGlzIGNyZWF0ZWQvdXBkYXRlZCB3aXRob3V0IHJlYWRpbmcgYW55IG9ic2VydmFibGUgdmFsdWUuXCIpO1xuICB9XG59XG4vKipcbiAqIGRpZmZzIG5ld09ic2VydmluZyB3aXRoIG9ic2VydmluZy5cbiAqIHVwZGF0ZSBvYnNlcnZpbmcgdG8gYmUgbmV3T2JzZXJ2aW5nIHdpdGggdW5pcXVlIG9ic2VydmFibGVzXG4gKiBub3RpZnkgb2JzZXJ2ZXJzIHRoYXQgYmVjb21lIG9ic2VydmVkL3Vub2JzZXJ2ZWRcbiAqL1xuZnVuY3Rpb24gYmluZERlcGVuZGVuY2llcyhkZXJpdmF0aW9uKSB7XG4gIC8vIGludmFyaWFudChkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlICE9PSBJRGVyaXZhdGlvblN0YXRlLk5PVF9UUkFDS0lORywgXCJJTlRFUk5BTCBFUlJPUiBiaW5kRGVwZW5kZW5jaWVzIGV4cGVjdHMgZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZSAhPT0gLTFcIik7XG4gIHZhciBwcmV2T2JzZXJ2aW5nID0gZGVyaXZhdGlvbi5vYnNlcnZpbmdfO1xuICB2YXIgb2JzZXJ2aW5nID0gZGVyaXZhdGlvbi5vYnNlcnZpbmdfID0gZGVyaXZhdGlvbi5uZXdPYnNlcnZpbmdfO1xuICB2YXIgbG93ZXN0TmV3T2JzZXJ2aW5nRGVyaXZhdGlvblN0YXRlID0gSURlcml2YXRpb25TdGF0ZV8uVVBfVE9fREFURV87XG4gIC8vIEdvIHRocm91Z2ggYWxsIG5ldyBvYnNlcnZhYmxlcyBhbmQgY2hlY2sgZGlmZlZhbHVlOiAodGhpcyBsaXN0IGNhbiBjb250YWluIGR1cGxpY2F0ZXMpOlxuICAvLyAgIDA6IGZpcnN0IG9jY3VycmVuY2UsIGNoYW5nZSB0byAxIGFuZCBrZWVwIGl0XG4gIC8vICAgMTogZXh0cmEgb2NjdXJyZW5jZSwgZHJvcCBpdFxuICB2YXIgaTAgPSAwLFxuICAgIGwgPSBkZXJpdmF0aW9uLnVuYm91bmREZXBzQ291bnRfO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBkZXAgPSBvYnNlcnZpbmdbaV07XG4gICAgaWYgKGRlcC5kaWZmVmFsdWVfID09PSAwKSB7XG4gICAgICBkZXAuZGlmZlZhbHVlXyA9IDE7XG4gICAgICBpZiAoaTAgIT09IGkpIHtcbiAgICAgICAgb2JzZXJ2aW5nW2kwXSA9IGRlcDtcbiAgICAgIH1cbiAgICAgIGkwKys7XG4gICAgfVxuICAgIC8vIFVwY2FzdCBpcyAnc2FmZScgaGVyZSwgYmVjYXVzZSBpZiBkZXAgaXMgSU9ic2VydmFibGUsIGBkZXBlbmRlbmNpZXNTdGF0ZWAgd2lsbCBiZSB1bmRlZmluZWQsXG4gICAgLy8gbm90IGhpdHRpbmcgdGhlIGNvbmRpdGlvblxuICAgIGlmIChkZXAuZGVwZW5kZW5jaWVzU3RhdGVfID4gbG93ZXN0TmV3T2JzZXJ2aW5nRGVyaXZhdGlvblN0YXRlKSB7XG4gICAgICBsb3dlc3ROZXdPYnNlcnZpbmdEZXJpdmF0aW9uU3RhdGUgPSBkZXAuZGVwZW5kZW5jaWVzU3RhdGVfO1xuICAgIH1cbiAgfVxuICBvYnNlcnZpbmcubGVuZ3RoID0gaTA7XG4gIGRlcml2YXRpb24ubmV3T2JzZXJ2aW5nXyA9IG51bGw7IC8vIG5ld09ic2VydmluZyBzaG91bGRuJ3QgYmUgbmVlZGVkIG91dHNpZGUgdHJhY2tpbmcgKHN0YXRlbWVudCBtb3ZlZCBkb3duIHRvIHdvcmsgYXJvdW5kIEZGIGJ1Zywgc2VlICM2MTQpXG4gIC8vIEdvIHRocm91Z2ggYWxsIG9sZCBvYnNlcnZhYmxlcyBhbmQgY2hlY2sgZGlmZlZhbHVlOiAoaXQgaXMgdW5pcXVlIGFmdGVyIGxhc3QgYmluZERlcGVuZGVuY2llcylcbiAgLy8gICAwOiBpdCdzIG5vdCBpbiBuZXcgb2JzZXJ2YWJsZXMsIHVub2JzZXJ2ZSBpdFxuICAvLyAgIDE6IGl0IGtlZXBzIGJlaW5nIG9ic2VydmVkLCBkb24ndCB3YW50IHRvIG5vdGlmeSBpdC4gY2hhbmdlIHRvIDBcbiAgbCA9IHByZXZPYnNlcnZpbmcubGVuZ3RoO1xuICB3aGlsZSAobC0tKSB7XG4gICAgdmFyIF9kZXAgPSBwcmV2T2JzZXJ2aW5nW2xdO1xuICAgIGlmIChfZGVwLmRpZmZWYWx1ZV8gPT09IDApIHtcbiAgICAgIHJlbW92ZU9ic2VydmVyKF9kZXAsIGRlcml2YXRpb24pO1xuICAgIH1cbiAgICBfZGVwLmRpZmZWYWx1ZV8gPSAwO1xuICB9XG4gIC8vIEdvIHRocm91Z2ggYWxsIG5ldyBvYnNlcnZhYmxlcyBhbmQgY2hlY2sgZGlmZlZhbHVlOiAobm93IGl0IHNob3VsZCBiZSB1bmlxdWUpXG4gIC8vICAgMDogaXQgd2FzIHNldCB0byAwIGluIGxhc3QgbG9vcC4gZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZy5cbiAgLy8gICAxOiBpdCB3YXNuJ3Qgb2JzZXJ2ZWQsIGxldCdzIG9ic2VydmUgaXQuIHNldCBiYWNrIHRvIDBcbiAgd2hpbGUgKGkwLS0pIHtcbiAgICB2YXIgX2RlcDIgPSBvYnNlcnZpbmdbaTBdO1xuICAgIGlmIChfZGVwMi5kaWZmVmFsdWVfID09PSAxKSB7XG4gICAgICBfZGVwMi5kaWZmVmFsdWVfID0gMDtcbiAgICAgIGFkZE9ic2VydmVyKF9kZXAyLCBkZXJpdmF0aW9uKTtcbiAgICB9XG4gIH1cbiAgLy8gU29tZSBuZXcgb2JzZXJ2ZWQgZGVyaXZhdGlvbnMgbWF5IGJlY29tZSBzdGFsZSBkdXJpbmcgdGhpcyBkZXJpdmF0aW9uIGNvbXB1dGF0aW9uXG4gIC8vIHNvIHRoZXkgaGF2ZSBoYWQgbm8gY2hhbmNlIHRvIHByb3BhZ2F0ZSBzdGFsZW5lc3MgKCM5MTYpXG4gIGlmIChsb3dlc3ROZXdPYnNlcnZpbmdEZXJpdmF0aW9uU3RhdGUgIT09IElEZXJpdmF0aW9uU3RhdGVfLlVQX1RPX0RBVEVfKSB7XG4gICAgZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZV8gPSBsb3dlc3ROZXdPYnNlcnZpbmdEZXJpdmF0aW9uU3RhdGU7XG4gICAgZGVyaXZhdGlvbi5vbkJlY29tZVN0YWxlXygpO1xuICB9XG59XG5mdW5jdGlvbiBjbGVhck9ic2VydmluZyhkZXJpdmF0aW9uKSB7XG4gIC8vIGludmFyaWFudChnbG9iYWxTdGF0ZS5pbkJhdGNoID4gMCwgXCJJTlRFUk5BTCBFUlJPUiBjbGVhck9ic2VydmluZyBzaG91bGQgYmUgY2FsbGVkIG9ubHkgaW5zaWRlIGJhdGNoXCIpO1xuICB2YXIgb2JzID0gZGVyaXZhdGlvbi5vYnNlcnZpbmdfO1xuICBkZXJpdmF0aW9uLm9ic2VydmluZ18gPSBbXTtcbiAgdmFyIGkgPSBvYnMubGVuZ3RoO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgcmVtb3ZlT2JzZXJ2ZXIob2JzW2ldLCBkZXJpdmF0aW9uKTtcbiAgfVxuICBkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLk5PVF9UUkFDS0lOR187XG59XG5mdW5jdGlvbiB1bnRyYWNrZWQoYWN0aW9uKSB7XG4gIHZhciBwcmV2ID0gdW50cmFja2VkU3RhcnQoKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYWN0aW9uKCk7XG4gIH0gZmluYWxseSB7XG4gICAgdW50cmFja2VkRW5kKHByZXYpO1xuICB9XG59XG5mdW5jdGlvbiB1bnRyYWNrZWRTdGFydCgpIHtcbiAgdmFyIHByZXYgPSBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb247XG4gIGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbiA9IG51bGw7XG4gIHJldHVybiBwcmV2O1xufVxuZnVuY3Rpb24gdW50cmFja2VkRW5kKHByZXYpIHtcbiAgZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uID0gcHJldjtcbn1cbmZ1bmN0aW9uIGFsbG93U3RhdGVSZWFkc1N0YXJ0KGFsbG93U3RhdGVSZWFkcykge1xuICB2YXIgcHJldiA9IGdsb2JhbFN0YXRlLmFsbG93U3RhdGVSZWFkcztcbiAgZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZVJlYWRzID0gYWxsb3dTdGF0ZVJlYWRzO1xuICByZXR1cm4gcHJldjtcbn1cbmZ1bmN0aW9uIGFsbG93U3RhdGVSZWFkc0VuZChwcmV2KSB7XG4gIGdsb2JhbFN0YXRlLmFsbG93U3RhdGVSZWFkcyA9IHByZXY7XG59XG4vKipcbiAqIG5lZWRlZCB0byBrZWVwIGBsb3dlc3RPYnNlcnZlclN0YXRlYCBjb3JyZWN0LiB3aGVuIGNoYW5naW5nIGZyb20gKDIgb3IgMSkgdG8gMFxuICpcbiAqL1xuZnVuY3Rpb24gY2hhbmdlRGVwZW5kZW5jaWVzU3RhdGVUbzAoZGVyaXZhdGlvbikge1xuICBpZiAoZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZV8gPT09IElEZXJpdmF0aW9uU3RhdGVfLlVQX1RPX0RBVEVfKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uVVBfVE9fREFURV87XG4gIHZhciBvYnMgPSBkZXJpdmF0aW9uLm9ic2VydmluZ187XG4gIHZhciBpID0gb2JzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIG9ic1tpXS5sb3dlc3RPYnNlcnZlclN0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLlVQX1RPX0RBVEVfO1xuICB9XG59XG5cbi8qKlxuICogVGhlc2UgdmFsdWVzIHdpbGwgcGVyc2lzdCBpZiBnbG9iYWwgc3RhdGUgaXMgcmVzZXRcbiAqL1xudmFyIHBlcnNpc3RlbnRLZXlzID0gW1wibW9ieEd1aWRcIiwgXCJzcHlMaXN0ZW5lcnNcIiwgXCJlbmZvcmNlQWN0aW9uc1wiLCBcImNvbXB1dGVkUmVxdWlyZXNSZWFjdGlvblwiLCBcInJlYWN0aW9uUmVxdWlyZXNPYnNlcnZhYmxlXCIsIFwib2JzZXJ2YWJsZVJlcXVpcmVzUmVhY3Rpb25cIiwgXCJhbGxvd1N0YXRlUmVhZHNcIiwgXCJkaXNhYmxlRXJyb3JCb3VuZGFyaWVzXCIsIFwicnVuSWRcIiwgXCJVTkNIQU5HRURcIiwgXCJ1c2VQcm94aWVzXCJdO1xudmFyIE1vYlhHbG9iYWxzID0gZnVuY3Rpb24gTW9iWEdsb2JhbHMoKSB7XG4gIHRoaXMudmVyc2lvbiA9IDY7XG4gIHRoaXMuVU5DSEFOR0VEID0ge307XG4gIHRoaXMudHJhY2tpbmdEZXJpdmF0aW9uID0gbnVsbDtcbiAgdGhpcy50cmFja2luZ0NvbnRleHQgPSBudWxsO1xuICB0aGlzLnJ1bklkID0gMDtcbiAgdGhpcy5tb2J4R3VpZCA9IDA7XG4gIHRoaXMuaW5CYXRjaCA9IDA7XG4gIHRoaXMucGVuZGluZ1Vub2JzZXJ2YXRpb25zID0gW107XG4gIHRoaXMucGVuZGluZ1JlYWN0aW9ucyA9IFtdO1xuICB0aGlzLmlzUnVubmluZ1JlYWN0aW9ucyA9IGZhbHNlO1xuICB0aGlzLmFsbG93U3RhdGVDaGFuZ2VzID0gZmFsc2U7XG4gIHRoaXMuYWxsb3dTdGF0ZVJlYWRzID0gdHJ1ZTtcbiAgdGhpcy5lbmZvcmNlQWN0aW9ucyA9IHRydWU7XG4gIHRoaXMuc3B5TGlzdGVuZXJzID0gW107XG4gIHRoaXMuZ2xvYmFsUmVhY3Rpb25FcnJvckhhbmRsZXJzID0gW107XG4gIHRoaXMuY29tcHV0ZWRSZXF1aXJlc1JlYWN0aW9uID0gZmFsc2U7XG4gIHRoaXMucmVhY3Rpb25SZXF1aXJlc09ic2VydmFibGUgPSBmYWxzZTtcbiAgdGhpcy5vYnNlcnZhYmxlUmVxdWlyZXNSZWFjdGlvbiA9IGZhbHNlO1xuICB0aGlzLmRpc2FibGVFcnJvckJvdW5kYXJpZXMgPSBmYWxzZTtcbiAgdGhpcy5zdXBwcmVzc1JlYWN0aW9uRXJyb3JzID0gZmFsc2U7XG4gIHRoaXMudXNlUHJveGllcyA9IHRydWU7XG4gIHRoaXMudmVyaWZ5UHJveGllcyA9IGZhbHNlO1xuICB0aGlzLnNhZmVEZXNjcmlwdG9ycyA9IHRydWU7XG59O1xudmFyIGNhbk1lcmdlR2xvYmFsU3RhdGUgPSB0cnVlO1xudmFyIGlzb2xhdGVDYWxsZWQgPSBmYWxzZTtcbnZhciBnbG9iYWxTdGF0ZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciBnbG9iYWwgPSAvKiNfX1BVUkVfXyovZ2V0R2xvYmFsKCk7XG4gIGlmIChnbG9iYWwuX19teF9pc29sYXRlZF9tb2J4SW5zdGFuY2VDb3VudCA+IDAgJiYgIWdsb2JhbC5fX214X2lzb2xhdGVkX21vYnhHbG9iYWxzKSB7XG4gICAgY2FuTWVyZ2VHbG9iYWxTdGF0ZSA9IGZhbHNlO1xuICB9XG4gIGlmIChnbG9iYWwuX19teF9pc29sYXRlZF9tb2J4R2xvYmFscyAmJiBnbG9iYWwuX19teF9pc29sYXRlZF9tb2J4R2xvYmFscy52ZXJzaW9uICE9PSBuZXcgTW9iWEdsb2JhbHMoKS52ZXJzaW9uKSB7XG4gICAgY2FuTWVyZ2VHbG9iYWxTdGF0ZSA9IGZhbHNlO1xuICB9XG4gIGlmICghY2FuTWVyZ2VHbG9iYWxTdGF0ZSkge1xuICAgIC8vIEJlY2F1c2UgdGhpcyBpcyBhIElJRkUgd2UgbmVlZCB0byBsZXQgaXNvbGF0ZUNhbGxlZCBhIGNoYW5jZSB0byBjaGFuZ2VcbiAgICAvLyBzbyB3ZSBydW4gaXQgYWZ0ZXIgdGhlIGV2ZW50IGxvb3AgY29tcGxldGVkIGF0IGxlYXN0IDEgaXRlcmF0aW9uXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWlzb2xhdGVDYWxsZWQpIHtcbiAgICAgICAgZGllKDM1KTtcbiAgICAgIH1cbiAgICB9LCAxKTtcbiAgICByZXR1cm4gbmV3IE1vYlhHbG9iYWxzKCk7XG4gIH0gZWxzZSBpZiAoZ2xvYmFsLl9fbXhfaXNvbGF0ZWRfbW9ieEdsb2JhbHMpIHtcbiAgICBnbG9iYWwuX19teF9pc29sYXRlZF9tb2J4SW5zdGFuY2VDb3VudCArPSAxO1xuICAgIGlmICghZ2xvYmFsLl9fbXhfaXNvbGF0ZWRfbW9ieEdsb2JhbHMuVU5DSEFOR0VEKSB7XG4gICAgICBnbG9iYWwuX19teF9pc29sYXRlZF9tb2J4R2xvYmFscy5VTkNIQU5HRUQgPSB7fTtcbiAgICB9IC8vIG1ha2UgbWVyZ2UgYmFja3dhcmQgY29tcGF0aWJsZVxuICAgIHJldHVybiBnbG9iYWwuX19teF9pc29sYXRlZF9tb2J4R2xvYmFscztcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWwuX19teF9pc29sYXRlZF9tb2J4SW5zdGFuY2VDb3VudCA9IDE7XG4gICAgcmV0dXJuIGdsb2JhbC5fX214X2lzb2xhdGVkX21vYnhHbG9iYWxzID0gLyojX19QVVJFX18qL25ldyBNb2JYR2xvYmFscygpO1xuICB9XG59KCk7XG5mdW5jdGlvbiBpc29sYXRlR2xvYmFsU3RhdGUoKSB7XG4gIGlmIChnbG9iYWxTdGF0ZS5wZW5kaW5nUmVhY3Rpb25zLmxlbmd0aCB8fCBnbG9iYWxTdGF0ZS5pbkJhdGNoIHx8IGdsb2JhbFN0YXRlLmlzUnVubmluZ1JlYWN0aW9ucykge1xuICAgIGRpZSgzNik7XG4gIH1cbiAgaXNvbGF0ZUNhbGxlZCA9IHRydWU7XG4gIGlmIChjYW5NZXJnZUdsb2JhbFN0YXRlKSB7XG4gICAgdmFyIGdsb2JhbCA9IGdldEdsb2JhbCgpO1xuICAgIGlmICgtLWdsb2JhbC5fX214X2lzb2xhdGVkX21vYnhJbnN0YW5jZUNvdW50ID09PSAwKSB7XG4gICAgICBnbG9iYWwuX19teF9pc29sYXRlZF9tb2J4R2xvYmFscyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZ2xvYmFsU3RhdGUgPSBuZXcgTW9iWEdsb2JhbHMoKTtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0R2xvYmFsU3RhdGUoKSB7XG4gIHJldHVybiBnbG9iYWxTdGF0ZTtcbn1cbi8qKlxuICogRm9yIHRlc3RpbmcgcHVycG9zZXMgb25seTsgdGhpcyB3aWxsIGJyZWFrIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiBleGlzdGluZyBvYnNlcnZhYmxlcyxcbiAqIGJ1dCBjYW4gYmUgdXNlZCB0byBnZXQgYmFjayBhdCBhIHN0YWJsZSBzdGF0ZSBhZnRlciB0aHJvd2luZyBlcnJvcnNcbiAqL1xuZnVuY3Rpb24gcmVzZXRHbG9iYWxTdGF0ZSgpIHtcbiAgdmFyIGRlZmF1bHRHbG9iYWxzID0gbmV3IE1vYlhHbG9iYWxzKCk7XG4gIGZvciAodmFyIGtleSBpbiBkZWZhdWx0R2xvYmFscykge1xuICAgIGlmIChwZXJzaXN0ZW50S2V5cy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICBnbG9iYWxTdGF0ZVtrZXldID0gZGVmYXVsdEdsb2JhbHNba2V5XTtcbiAgICB9XG4gIH1cbiAgZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZUNoYW5nZXMgPSAhZ2xvYmFsU3RhdGUuZW5mb3JjZUFjdGlvbnM7XG59XG5cbmZ1bmN0aW9uIGhhc09ic2VydmVycyhvYnNlcnZhYmxlKSB7XG4gIHJldHVybiBvYnNlcnZhYmxlLm9ic2VydmVyc18gJiYgb2JzZXJ2YWJsZS5vYnNlcnZlcnNfLnNpemUgPiAwO1xufVxuZnVuY3Rpb24gZ2V0T2JzZXJ2ZXJzKG9ic2VydmFibGUpIHtcbiAgcmV0dXJuIG9ic2VydmFibGUub2JzZXJ2ZXJzXztcbn1cbi8vIGZ1bmN0aW9uIGludmFyaWFudE9ic2VydmVycyhvYnNlcnZhYmxlOiBJT2JzZXJ2YWJsZSkge1xuLy8gICAgIGNvbnN0IGxpc3QgPSBvYnNlcnZhYmxlLm9ic2VydmVyc1xuLy8gICAgIGNvbnN0IG1hcCA9IG9ic2VydmFibGUub2JzZXJ2ZXJzSW5kZXhlc1xuLy8gICAgIGNvbnN0IGwgPSBsaXN0Lmxlbmd0aFxuLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4vLyAgICAgICAgIGNvbnN0IGlkID0gbGlzdFtpXS5fX21hcGlkXG4vLyAgICAgICAgIGlmIChpKSB7XG4vLyAgICAgICAgICAgICBpbnZhcmlhbnQobWFwW2lkXSA9PT0gaSwgXCJJTlRFUk5BTCBFUlJPUiBtYXBzIGRlcml2YXRpb24uX19tYXBpZCB0byBpbmRleCBpbiBsaXN0XCIpIC8vIGZvciBwZXJmb3JtYW5jZVxuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgaW52YXJpYW50KCEoaWQgaW4gbWFwKSwgXCJJTlRFUk5BTCBFUlJPUiBvYnNlcnZlciBvbiBpbmRleCAwIHNob3VsZG4ndCBiZSBoZWxkIGluIG1hcC5cIikgLy8gZm9yIHBlcmZvcm1hbmNlXG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyAgICAgaW52YXJpYW50KFxuLy8gICAgICAgICBsaXN0Lmxlbmd0aCA9PT0gMCB8fCBPYmplY3Qua2V5cyhtYXApLmxlbmd0aCA9PT0gbGlzdC5sZW5ndGggLSAxLFxuLy8gICAgICAgICBcIklOVEVSTkFMIEVSUk9SIHRoZXJlIGlzIG5vIGp1bmsgaW4gbWFwXCJcbi8vICAgICApXG4vLyB9XG5mdW5jdGlvbiBhZGRPYnNlcnZlcihvYnNlcnZhYmxlLCBub2RlKSB7XG4gIC8vIGludmFyaWFudChub2RlLmRlcGVuZGVuY2llc1N0YXRlICE9PSAtMSwgXCJJTlRFUk5BTCBFUlJPUiwgY2FuIGFkZCBvbmx5IGRlcGVuZGVuY2llc1N0YXRlICE9PSAtMVwiKTtcbiAgLy8gaW52YXJpYW50KG9ic2VydmFibGUuX29ic2VydmVycy5pbmRleE9mKG5vZGUpID09PSAtMSwgXCJJTlRFUk5BTCBFUlJPUiBhZGQgYWxyZWFkeSBhZGRlZCBub2RlXCIpO1xuICAvLyBpbnZhcmlhbnRPYnNlcnZlcnMob2JzZXJ2YWJsZSk7XG4gIG9ic2VydmFibGUub2JzZXJ2ZXJzXy5hZGQobm9kZSk7XG4gIGlmIChvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGVfID4gbm9kZS5kZXBlbmRlbmNpZXNTdGF0ZV8pIHtcbiAgICBvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGVfID0gbm9kZS5kZXBlbmRlbmNpZXNTdGF0ZV87XG4gIH1cbiAgLy8gaW52YXJpYW50T2JzZXJ2ZXJzKG9ic2VydmFibGUpO1xuICAvLyBpbnZhcmlhbnQob2JzZXJ2YWJsZS5fb2JzZXJ2ZXJzLmluZGV4T2Yobm9kZSkgIT09IC0xLCBcIklOVEVSTkFMIEVSUk9SIGRpZG4ndCBhZGQgbm9kZVwiKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlT2JzZXJ2ZXIob2JzZXJ2YWJsZSwgbm9kZSkge1xuICAvLyBpbnZhcmlhbnQoZ2xvYmFsU3RhdGUuaW5CYXRjaCA+IDAsIFwiSU5URVJOQUwgRVJST1IsIHJlbW92ZSBzaG91bGQgYmUgY2FsbGVkIG9ubHkgaW5zaWRlIGJhdGNoXCIpO1xuICAvLyBpbnZhcmlhbnQob2JzZXJ2YWJsZS5fb2JzZXJ2ZXJzLmluZGV4T2Yobm9kZSkgIT09IC0xLCBcIklOVEVSTkFMIEVSUk9SIHJlbW92ZSBhbHJlYWR5IHJlbW92ZWQgbm9kZVwiKTtcbiAgLy8gaW52YXJpYW50T2JzZXJ2ZXJzKG9ic2VydmFibGUpO1xuICBvYnNlcnZhYmxlLm9ic2VydmVyc19bXCJkZWxldGVcIl0obm9kZSk7XG4gIGlmIChvYnNlcnZhYmxlLm9ic2VydmVyc18uc2l6ZSA9PT0gMCkge1xuICAgIC8vIGRlbGV0aW5nIGxhc3Qgb2JzZXJ2ZXJcbiAgICBxdWV1ZUZvclVub2JzZXJ2YXRpb24ob2JzZXJ2YWJsZSk7XG4gIH1cbiAgLy8gaW52YXJpYW50T2JzZXJ2ZXJzKG9ic2VydmFibGUpO1xuICAvLyBpbnZhcmlhbnQob2JzZXJ2YWJsZS5fb2JzZXJ2ZXJzLmluZGV4T2Yobm9kZSkgPT09IC0xLCBcIklOVEVSTkFMIEVSUk9SIHJlbW92ZSBhbHJlYWR5IHJlbW92ZWQgbm9kZTJcIik7XG59XG5cbmZ1bmN0aW9uIHF1ZXVlRm9yVW5vYnNlcnZhdGlvbihvYnNlcnZhYmxlKSB7XG4gIGlmIChvYnNlcnZhYmxlLmlzUGVuZGluZ1Vub2JzZXJ2YXRpb25fID09PSBmYWxzZSkge1xuICAgIC8vIGludmFyaWFudChvYnNlcnZhYmxlLl9vYnNlcnZlcnMubGVuZ3RoID09PSAwLCBcIklOVEVSTkFMIEVSUk9SLCBzaG91bGQgb25seSBxdWV1ZSBmb3IgdW5vYnNlcnZhdGlvbiB1bm9ic2VydmVkIG9ic2VydmFibGVzXCIpO1xuICAgIG9ic2VydmFibGUuaXNQZW5kaW5nVW5vYnNlcnZhdGlvbl8gPSB0cnVlO1xuICAgIGdsb2JhbFN0YXRlLnBlbmRpbmdVbm9ic2VydmF0aW9ucy5wdXNoKG9ic2VydmFibGUpO1xuICB9XG59XG4vKipcbiAqIEJhdGNoIHN0YXJ0cyBhIHRyYW5zYWN0aW9uLCBhdCBsZWFzdCBmb3IgcHVycG9zZXMgb2YgbWVtb2l6aW5nIENvbXB1dGVkVmFsdWVzIHdoZW4gbm90aGluZyBlbHNlIGRvZXMuXG4gKiBEdXJpbmcgYSBiYXRjaCBgb25CZWNvbWVVbm9ic2VydmVkYCB3aWxsIGJlIGNhbGxlZCBhdCBtb3N0IG9uY2UgcGVyIG9ic2VydmFibGUuXG4gKiBBdm9pZHMgdW5uZWNlc3NhcnkgcmVjYWxjdWxhdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0QmF0Y2goKSB7XG4gIGdsb2JhbFN0YXRlLmluQmF0Y2grKztcbn1cbmZ1bmN0aW9uIGVuZEJhdGNoKCkge1xuICBpZiAoLS1nbG9iYWxTdGF0ZS5pbkJhdGNoID09PSAwKSB7XG4gICAgcnVuUmVhY3Rpb25zKCk7XG4gICAgLy8gdGhlIGJhdGNoIGlzIGFjdHVhbGx5IGFib3V0IHRvIGZpbmlzaCwgYWxsIHVub2JzZXJ2aW5nIHNob3VsZCBoYXBwZW4gaGVyZS5cbiAgICB2YXIgbGlzdCA9IGdsb2JhbFN0YXRlLnBlbmRpbmdVbm9ic2VydmF0aW9ucztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBvYnNlcnZhYmxlID0gbGlzdFtpXTtcbiAgICAgIG9ic2VydmFibGUuaXNQZW5kaW5nVW5vYnNlcnZhdGlvbl8gPSBmYWxzZTtcbiAgICAgIGlmIChvYnNlcnZhYmxlLm9ic2VydmVyc18uc2l6ZSA9PT0gMCkge1xuICAgICAgICBpZiAob2JzZXJ2YWJsZS5pc0JlaW5nT2JzZXJ2ZWRfKSB7XG4gICAgICAgICAgLy8gaWYgdGhpcyBvYnNlcnZhYmxlIGhhZCByZWFjdGl2ZSBvYnNlcnZlcnMsIHRyaWdnZXIgdGhlIGhvb2tzXG4gICAgICAgICAgb2JzZXJ2YWJsZS5pc0JlaW5nT2JzZXJ2ZWRfID0gZmFsc2U7XG4gICAgICAgICAgb2JzZXJ2YWJsZS5vbkJVTygpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvYnNlcnZhYmxlIGluc3RhbmNlb2YgQ29tcHV0ZWRWYWx1ZSkge1xuICAgICAgICAgIC8vIGNvbXB1dGVkIHZhbHVlcyBhcmUgYXV0b21hdGljYWxseSB0ZWFyZWQgZG93biB3aGVuIHRoZSBsYXN0IG9ic2VydmVyIGxlYXZlc1xuICAgICAgICAgIC8vIHRoaXMgcHJvY2VzcyBoYXBwZW5zIHJlY3Vyc2l2ZWx5LCB0aGlzIGNvbXB1dGVkIG1pZ2h0IGJlIHRoZSBsYXN0IG9ic2VydmFiZSBvZiBhbm90aGVyLCBldGMuLlxuICAgICAgICAgIG9ic2VydmFibGUuc3VzcGVuZF8oKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBnbG9iYWxTdGF0ZS5wZW5kaW5nVW5vYnNlcnZhdGlvbnMgPSBbXTtcbiAgfVxufVxuZnVuY3Rpb24gcmVwb3J0T2JzZXJ2ZWQob2JzZXJ2YWJsZSkge1xuICBjaGVja0lmU3RhdGVSZWFkc0FyZUFsbG93ZWQob2JzZXJ2YWJsZSk7XG4gIHZhciBkZXJpdmF0aW9uID0gZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uO1xuICBpZiAoZGVyaXZhdGlvbiAhPT0gbnVsbCkge1xuICAgIC8qKlxuICAgICAqIFNpbXBsZSBvcHRpbWl6YXRpb24sIGdpdmUgZWFjaCBkZXJpdmF0aW9uIHJ1biBhbiB1bmlxdWUgaWQgKHJ1bklkKVxuICAgICAqIENoZWNrIGlmIGxhc3QgdGltZSB0aGlzIG9ic2VydmFibGUgd2FzIGFjY2Vzc2VkIHRoZSBzYW1lIHJ1bklkIGlzIHVzZWRcbiAgICAgKiBpZiB0aGlzIGlzIHRoZSBjYXNlLCB0aGUgcmVsYXRpb24gaXMgYWxyZWFkeSBrbm93blxuICAgICAqL1xuICAgIGlmIChkZXJpdmF0aW9uLnJ1bklkXyAhPT0gb2JzZXJ2YWJsZS5sYXN0QWNjZXNzZWRCeV8pIHtcbiAgICAgIG9ic2VydmFibGUubGFzdEFjY2Vzc2VkQnlfID0gZGVyaXZhdGlvbi5ydW5JZF87XG4gICAgICAvLyBUcmllZCBzdG9yaW5nIG5ld09ic2VydmluZywgb3Igb2JzZXJ2aW5nLCBvciBib3RoIGFzIFNldCwgYnV0IHBlcmZvcm1hbmNlIGRpZG4ndCBjb21lIGNsb3NlLi4uXG4gICAgICBkZXJpdmF0aW9uLm5ld09ic2VydmluZ19bZGVyaXZhdGlvbi51bmJvdW5kRGVwc0NvdW50XysrXSA9IG9ic2VydmFibGU7XG4gICAgICBpZiAoIW9ic2VydmFibGUuaXNCZWluZ09ic2VydmVkXyAmJiBnbG9iYWxTdGF0ZS50cmFja2luZ0NvbnRleHQpIHtcbiAgICAgICAgb2JzZXJ2YWJsZS5pc0JlaW5nT2JzZXJ2ZWRfID0gdHJ1ZTtcbiAgICAgICAgb2JzZXJ2YWJsZS5vbkJPKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYnNlcnZhYmxlLmlzQmVpbmdPYnNlcnZlZF87XG4gIH0gZWxzZSBpZiAob2JzZXJ2YWJsZS5vYnNlcnZlcnNfLnNpemUgPT09IDAgJiYgZ2xvYmFsU3RhdGUuaW5CYXRjaCA+IDApIHtcbiAgICBxdWV1ZUZvclVub2JzZXJ2YXRpb24ob2JzZXJ2YWJsZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuLy8gZnVuY3Rpb24gaW52YXJpYW50TE9TKG9ic2VydmFibGU6IElPYnNlcnZhYmxlLCBtc2c6IHN0cmluZykge1xuLy8gICAgIC8vIGl0J3MgZXhwZW5zaXZlIHNvIGJldHRlciBub3QgcnVuIGl0IGluIHByb2R1Y2l0b24uIGJ1dCB0ZW1wb3JhcmlseSBoZWxwZnVsIGZvciB0ZXN0aW5nXG4vLyAgICAgY29uc3QgbWluID0gZ2V0T2JzZXJ2ZXJzKG9ic2VydmFibGUpLnJlZHVjZSgoYSwgYikgPT4gTWF0aC5taW4oYSwgYi5kZXBlbmRlbmNpZXNTdGF0ZSksIDIpXG4vLyAgICAgaWYgKG1pbiA+PSBvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGUpIHJldHVybiAvLyA8LSB0aGUgb25seSBhc3N1bXB0aW9uIGFib3V0IGBsb3dlc3RPYnNlcnZlclN0YXRlYFxuLy8gICAgIHRocm93IG5ldyBFcnJvcihcbi8vICAgICAgICAgXCJsb3dlc3RPYnNlcnZlclN0YXRlIGlzIHdyb25nIGZvciBcIiArXG4vLyAgICAgICAgICAgICBtc2cgK1xuLy8gICAgICAgICAgICAgXCIgYmVjYXVzZSBcIiArXG4vLyAgICAgICAgICAgICBtaW4gK1xuLy8gICAgICAgICAgICAgXCIgPCBcIiArXG4vLyAgICAgICAgICAgICBvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGVcbi8vICAgICApXG4vLyB9XG4vKipcbiAqIE5PVEU6IGN1cnJlbnQgcHJvcGFnYXRpb24gbWVjaGFuaXNtIHdpbGwgaW4gY2FzZSBvZiBzZWxmIHJlcnVuaW5nIGF1dG9ydW5zIGJlaGF2ZSB1bmV4cGVjdGVkbHlcbiAqIEl0IHdpbGwgcHJvcGFnYXRlIGNoYW5nZXMgdG8gb2JzZXJ2ZXJzIGZyb20gcHJldmlvdXMgcnVuXG4gKiBJdCdzIGhhcmQgb3IgbWF5YmUgaW1wb3NzaWJsZSAod2l0aCByZWFzb25hYmxlIHBlcmYpIHRvIGdldCBpdCByaWdodCB3aXRoIGN1cnJlbnQgYXBwcm9hY2hcbiAqIEhvcGVmdWxseSBzZWxmIHJlcnVuaW5nIGF1dG9ydW5zIGFyZW4ndCBhIGZlYXR1cmUgcGVvcGxlIHNob3VsZCBkZXBlbmQgb25cbiAqIEFsc28gbW9zdCBiYXNpYyB1c2UgY2FzZXMgc2hvdWxkIGJlIG9rXG4gKi9cbi8vIENhbGxlZCBieSBBdG9tIHdoZW4gaXRzIHZhbHVlIGNoYW5nZXNcbmZ1bmN0aW9uIHByb3BhZ2F0ZUNoYW5nZWQob2JzZXJ2YWJsZSkge1xuICAvLyBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZSwgXCJjaGFuZ2VkIHN0YXJ0XCIpO1xuICBpZiAob2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlXyA9PT0gSURlcml2YXRpb25TdGF0ZV8uU1RBTEVfKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5TVEFMRV87XG4gIC8vIElkZWFsbHkgd2UgdXNlIGZvci4ub2YgaGVyZSwgYnV0IHRoZSBkb3duY29tcGlsZWQgdmVyc2lvbiBpcyByZWFsbHkgc2xvdy4uLlxuICBvYnNlcnZhYmxlLm9ic2VydmVyc18uZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgIGlmIChkLmRlcGVuZGVuY2llc1N0YXRlXyA9PT0gSURlcml2YXRpb25TdGF0ZV8uVVBfVE9fREFURV8pIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgZC5pc1RyYWNpbmdfICE9PSBUcmFjZU1vZGUuTk9ORSkge1xuICAgICAgICBsb2dUcmFjZUluZm8oZCwgb2JzZXJ2YWJsZSk7XG4gICAgICB9XG4gICAgICBkLm9uQmVjb21lU3RhbGVfKCk7XG4gICAgfVxuICAgIGQuZGVwZW5kZW5jaWVzU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uU1RBTEVfO1xuICB9KTtcbiAgLy8gaW52YXJpYW50TE9TKG9ic2VydmFibGUsIFwiY2hhbmdlZCBlbmRcIik7XG59XG4vLyBDYWxsZWQgYnkgQ29tcHV0ZWRWYWx1ZSB3aGVuIGl0IHJlY2FsY3VsYXRlIGFuZCBpdHMgdmFsdWUgY2hhbmdlZFxuZnVuY3Rpb24gcHJvcGFnYXRlQ2hhbmdlQ29uZmlybWVkKG9ic2VydmFibGUpIHtcbiAgLy8gaW52YXJpYW50TE9TKG9ic2VydmFibGUsIFwiY29uZmlybWVkIHN0YXJ0XCIpO1xuICBpZiAob2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlXyA9PT0gSURlcml2YXRpb25TdGF0ZV8uU1RBTEVfKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5TVEFMRV87XG4gIG9ic2VydmFibGUub2JzZXJ2ZXJzXy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgaWYgKGQuZGVwZW5kZW5jaWVzU3RhdGVfID09PSBJRGVyaXZhdGlvblN0YXRlXy5QT1NTSUJMWV9TVEFMRV8pIHtcbiAgICAgIGQuZGVwZW5kZW5jaWVzU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uU1RBTEVfO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBkLmlzVHJhY2luZ18gIT09IFRyYWNlTW9kZS5OT05FKSB7XG4gICAgICAgIGxvZ1RyYWNlSW5mbyhkLCBvYnNlcnZhYmxlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGQuZGVwZW5kZW5jaWVzU3RhdGVfID09PSBJRGVyaXZhdGlvblN0YXRlXy5VUF9UT19EQVRFXyAvLyB0aGlzIGhhcHBlbnMgZHVyaW5nIGNvbXB1dGluZyBvZiBgZGAsIGp1c3Qga2VlcCBsb3dlc3RPYnNlcnZlclN0YXRlIHVwIHRvIGRhdGUuXG4gICAgKSB7XG4gICAgICBvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uVVBfVE9fREFURV87XG4gICAgfVxuICB9KTtcbiAgLy8gaW52YXJpYW50TE9TKG9ic2VydmFibGUsIFwiY29uZmlybWVkIGVuZFwiKTtcbn1cbi8vIFVzZWQgYnkgY29tcHV0ZWQgd2hlbiBpdHMgZGVwZW5kZW5jeSBjaGFuZ2VkLCBidXQgd2UgZG9uJ3Qgd2FuJ3QgdG8gaW1tZWRpYXRlbHkgcmVjb21wdXRlLlxuZnVuY3Rpb24gcHJvcGFnYXRlTWF5YmVDaGFuZ2VkKG9ic2VydmFibGUpIHtcbiAgLy8gaW52YXJpYW50TE9TKG9ic2VydmFibGUsIFwibWF5YmUgc3RhcnRcIik7XG4gIGlmIChvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGVfICE9PSBJRGVyaXZhdGlvblN0YXRlXy5VUF9UT19EQVRFXykge1xuICAgIHJldHVybjtcbiAgfVxuICBvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uUE9TU0lCTFlfU1RBTEVfO1xuICBvYnNlcnZhYmxlLm9ic2VydmVyc18uZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgIGlmIChkLmRlcGVuZGVuY2llc1N0YXRlXyA9PT0gSURlcml2YXRpb25TdGF0ZV8uVVBfVE9fREFURV8pIHtcbiAgICAgIGQuZGVwZW5kZW5jaWVzU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uUE9TU0lCTFlfU1RBTEVfO1xuICAgICAgZC5vbkJlY29tZVN0YWxlXygpO1xuICAgIH1cbiAgfSk7XG4gIC8vIGludmFyaWFudExPUyhvYnNlcnZhYmxlLCBcIm1heWJlIGVuZFwiKTtcbn1cblxuZnVuY3Rpb24gbG9nVHJhY2VJbmZvKGRlcml2YXRpb24sIG9ic2VydmFibGUpIHtcbiAgY29uc29sZS5sb2coXCJbbW9ieC50cmFjZV0gJ1wiICsgZGVyaXZhdGlvbi5uYW1lXyArIFwiJyBpcyBpbnZhbGlkYXRlZCBkdWUgdG8gYSBjaGFuZ2UgaW46ICdcIiArIG9ic2VydmFibGUubmFtZV8gKyBcIidcIik7XG4gIGlmIChkZXJpdmF0aW9uLmlzVHJhY2luZ18gPT09IFRyYWNlTW9kZS5CUkVBSykge1xuICAgIHZhciBsaW5lcyA9IFtdO1xuICAgIHByaW50RGVwVHJlZShnZXREZXBlbmRlbmN5VHJlZShkZXJpdmF0aW9uKSwgbGluZXMsIDEpO1xuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIG5ldyBGdW5jdGlvbihcImRlYnVnZ2VyO1xcbi8qXFxuVHJhY2luZyAnXCIgKyBkZXJpdmF0aW9uLm5hbWVfICsgXCInXFxuXFxuWW91IGFyZSBlbnRlcmluZyB0aGlzIGJyZWFrIHBvaW50IGJlY2F1c2UgZGVyaXZhdGlvbiAnXCIgKyBkZXJpdmF0aW9uLm5hbWVfICsgXCInIGlzIGJlaW5nIHRyYWNlZCBhbmQgJ1wiICsgb2JzZXJ2YWJsZS5uYW1lXyArIFwiJyBpcyBub3cgZm9yY2luZyBpdCB0byB1cGRhdGUuXFxuSnVzdCBmb2xsb3cgdGhlIHN0YWNrdHJhY2UgeW91IHNob3VsZCBub3cgc2VlIGluIHRoZSBkZXZ0b29scyB0byBzZWUgcHJlY2lzZWx5IHdoYXQgcGllY2Ugb2YgeW91ciBjb2RlIGlzIGNhdXNpbmcgdGhpcyB1cGRhdGVcXG5UaGUgc3RhY2tmcmFtZSB5b3UgYXJlIGxvb2tpbmcgZm9yIGlzIGF0IGxlYXN0IH42LTggc3RhY2stZnJhbWVzIHVwLlxcblxcblwiICsgKGRlcml2YXRpb24gaW5zdGFuY2VvZiBDb21wdXRlZFZhbHVlID8gZGVyaXZhdGlvbi5kZXJpdmF0aW9uLnRvU3RyaW5nKCkucmVwbGFjZSgvWypdXFwvL2csIFwiL1wiKSA6IFwiXCIpICsgXCJcXG5cXG5UaGUgZGVwZW5kZW5jaWVzIGZvciB0aGlzIGRlcml2YXRpb24gYXJlOlxcblxcblwiICsgbGluZXMuam9pbihcIlxcblwiKSArIFwiXFxuKi9cXG4gICAgXCIpKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIHByaW50RGVwVHJlZSh0cmVlLCBsaW5lcywgZGVwdGgpIHtcbiAgaWYgKGxpbmVzLmxlbmd0aCA+PSAxMDAwKSB7XG4gICAgbGluZXMucHVzaChcIihhbmQgbWFueSBtb3JlKVwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgbGluZXMucHVzaChcIlwiICsgXCJcXHRcIi5yZXBlYXQoZGVwdGggLSAxKSArIHRyZWUubmFtZSk7XG4gIGlmICh0cmVlLmRlcGVuZGVuY2llcykge1xuICAgIHRyZWUuZGVwZW5kZW5jaWVzLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICByZXR1cm4gcHJpbnREZXBUcmVlKGNoaWxkLCBsaW5lcywgZGVwdGggKyAxKTtcbiAgICB9KTtcbiAgfVxufVxuXG52YXIgUmVhY3Rpb24gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvLyBub2RlcyB3ZSBhcmUgbG9va2luZyBhdC4gT3VyIHZhbHVlIGRlcGVuZHMgb24gdGhlc2Ugbm9kZXNcblxuICBmdW5jdGlvbiBSZWFjdGlvbihuYW1lXywgb25JbnZhbGlkYXRlXywgZXJyb3JIYW5kbGVyXywgcmVxdWlyZXNPYnNlcnZhYmxlXykge1xuICAgIGlmIChuYW1lXyA9PT0gdm9pZCAwKSB7XG4gICAgICBuYW1lXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiUmVhY3Rpb25AXCIgKyBnZXROZXh0SWQoKSA6IFwiUmVhY3Rpb25cIjtcbiAgICB9XG4gICAgdGhpcy5uYW1lXyA9IHZvaWQgMDtcbiAgICB0aGlzLm9uSW52YWxpZGF0ZV8gPSB2b2lkIDA7XG4gICAgdGhpcy5lcnJvckhhbmRsZXJfID0gdm9pZCAwO1xuICAgIHRoaXMucmVxdWlyZXNPYnNlcnZhYmxlXyA9IHZvaWQgMDtcbiAgICB0aGlzLm9ic2VydmluZ18gPSBbXTtcbiAgICB0aGlzLm5ld09ic2VydmluZ18gPSBbXTtcbiAgICB0aGlzLmRlcGVuZGVuY2llc1N0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLk5PVF9UUkFDS0lOR187XG4gICAgdGhpcy5kaWZmVmFsdWVfID0gMDtcbiAgICB0aGlzLnJ1bklkXyA9IDA7XG4gICAgdGhpcy51bmJvdW5kRGVwc0NvdW50XyA9IDA7XG4gICAgdGhpcy5pc0Rpc3Bvc2VkXyA9IGZhbHNlO1xuICAgIHRoaXMuaXNTY2hlZHVsZWRfID0gZmFsc2U7XG4gICAgdGhpcy5pc1RyYWNrUGVuZGluZ18gPSBmYWxzZTtcbiAgICB0aGlzLmlzUnVubmluZ18gPSBmYWxzZTtcbiAgICB0aGlzLmlzVHJhY2luZ18gPSBUcmFjZU1vZGUuTk9ORTtcbiAgICB0aGlzLm5hbWVfID0gbmFtZV87XG4gICAgdGhpcy5vbkludmFsaWRhdGVfID0gb25JbnZhbGlkYXRlXztcbiAgICB0aGlzLmVycm9ySGFuZGxlcl8gPSBlcnJvckhhbmRsZXJfO1xuICAgIHRoaXMucmVxdWlyZXNPYnNlcnZhYmxlXyA9IHJlcXVpcmVzT2JzZXJ2YWJsZV87XG4gIH1cbiAgdmFyIF9wcm90byA9IFJlYWN0aW9uLnByb3RvdHlwZTtcbiAgX3Byb3RvLm9uQmVjb21lU3RhbGVfID0gZnVuY3Rpb24gb25CZWNvbWVTdGFsZV8oKSB7XG4gICAgdGhpcy5zY2hlZHVsZV8oKTtcbiAgfTtcbiAgX3Byb3RvLnNjaGVkdWxlXyA9IGZ1bmN0aW9uIHNjaGVkdWxlXygpIHtcbiAgICBpZiAoIXRoaXMuaXNTY2hlZHVsZWRfKSB7XG4gICAgICB0aGlzLmlzU2NoZWR1bGVkXyA9IHRydWU7XG4gICAgICBnbG9iYWxTdGF0ZS5wZW5kaW5nUmVhY3Rpb25zLnB1c2godGhpcyk7XG4gICAgICBydW5SZWFjdGlvbnMoKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5pc1NjaGVkdWxlZCA9IGZ1bmN0aW9uIGlzU2NoZWR1bGVkKCkge1xuICAgIHJldHVybiB0aGlzLmlzU2NoZWR1bGVkXztcbiAgfVxuICAvKipcbiAgICogaW50ZXJuYWwsIHVzZSBzY2hlZHVsZSgpIGlmIHlvdSBpbnRlbmQgdG8ga2ljayBvZmYgYSByZWFjdGlvblxuICAgKi87XG4gIF9wcm90by5ydW5SZWFjdGlvbl8gPSBmdW5jdGlvbiBydW5SZWFjdGlvbl8oKSB7XG4gICAgaWYgKCF0aGlzLmlzRGlzcG9zZWRfKSB7XG4gICAgICBzdGFydEJhdGNoKCk7XG4gICAgICB0aGlzLmlzU2NoZWR1bGVkXyA9IGZhbHNlO1xuICAgICAgdmFyIHByZXYgPSBnbG9iYWxTdGF0ZS50cmFja2luZ0NvbnRleHQ7XG4gICAgICBnbG9iYWxTdGF0ZS50cmFja2luZ0NvbnRleHQgPSB0aGlzO1xuICAgICAgaWYgKHNob3VsZENvbXB1dGUodGhpcykpIHtcbiAgICAgICAgdGhpcy5pc1RyYWNrUGVuZGluZ18gPSB0cnVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMub25JbnZhbGlkYXRlXygpO1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgdGhpcy5pc1RyYWNrUGVuZGluZ18gJiYgaXNTcHlFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIC8vIG9uSW52YWxpZGF0ZSBkaWRuJ3QgdHJpZ2dlciB0cmFjayByaWdodCBhd2F5Li5cbiAgICAgICAgICAgIHNweVJlcG9ydCh7XG4gICAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZV8sXG4gICAgICAgICAgICAgIHR5cGU6IFwic2NoZWR1bGVkLXJlYWN0aW9uXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRoaXMucmVwb3J0RXhjZXB0aW9uSW5EZXJpdmF0aW9uXyhlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZ2xvYmFsU3RhdGUudHJhY2tpbmdDb250ZXh0ID0gcHJldjtcbiAgICAgIGVuZEJhdGNoKCk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8udHJhY2sgPSBmdW5jdGlvbiB0cmFjayhmbikge1xuICAgIGlmICh0aGlzLmlzRGlzcG9zZWRfKSB7XG4gICAgICByZXR1cm47XG4gICAgICAvLyBjb25zb2xlLndhcm4oXCJSZWFjdGlvbiBhbHJlYWR5IGRpc3Bvc2VkXCIpIC8vIE5vdGU6IE5vdCBhIHdhcm5pbmcgLyBlcnJvciBpbiBtb2J4IDQgZWl0aGVyXG4gICAgfVxuXG4gICAgc3RhcnRCYXRjaCgpO1xuICAgIHZhciBub3RpZnkgPSBpc1NweUVuYWJsZWQoKTtcbiAgICB2YXIgc3RhcnRUaW1lO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5KSB7XG4gICAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgc3B5UmVwb3J0U3RhcnQoe1xuICAgICAgICBuYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgICB0eXBlOiBcInJlYWN0aW9uXCJcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmlzUnVubmluZ18gPSB0cnVlO1xuICAgIHZhciBwcmV2UmVhY3Rpb24gPSBnbG9iYWxTdGF0ZS50cmFja2luZ0NvbnRleHQ7IC8vIHJlYWN0aW9ucyBjb3VsZCBjcmVhdGUgcmVhY3Rpb25zLi4uXG4gICAgZ2xvYmFsU3RhdGUudHJhY2tpbmdDb250ZXh0ID0gdGhpcztcbiAgICB2YXIgcmVzdWx0ID0gdHJhY2tEZXJpdmVkRnVuY3Rpb24odGhpcywgZm4sIHVuZGVmaW5lZCk7XG4gICAgZ2xvYmFsU3RhdGUudHJhY2tpbmdDb250ZXh0ID0gcHJldlJlYWN0aW9uO1xuICAgIHRoaXMuaXNSdW5uaW5nXyA9IGZhbHNlO1xuICAgIHRoaXMuaXNUcmFja1BlbmRpbmdfID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuaXNEaXNwb3NlZF8pIHtcbiAgICAgIC8vIGRpc3Bvc2VkIGR1cmluZyBsYXN0IHJ1bi4gQ2xlYW4gdXAgZXZlcnl0aGluZyB0aGF0IHdhcyBib3VuZCBhZnRlciB0aGUgZGlzcG9zZSBjYWxsLlxuICAgICAgY2xlYXJPYnNlcnZpbmcodGhpcyk7XG4gICAgfVxuICAgIGlmIChpc0NhdWdodEV4Y2VwdGlvbihyZXN1bHQpKSB7XG4gICAgICB0aGlzLnJlcG9ydEV4Y2VwdGlvbkluRGVyaXZhdGlvbl8ocmVzdWx0LmNhdXNlKTtcbiAgICB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnkpIHtcbiAgICAgIHNweVJlcG9ydEVuZCh7XG4gICAgICAgIHRpbWU6IERhdGUubm93KCkgLSBzdGFydFRpbWVcbiAgICAgIH0pO1xuICAgIH1cbiAgICBlbmRCYXRjaCgpO1xuICB9O1xuICBfcHJvdG8ucmVwb3J0RXhjZXB0aW9uSW5EZXJpdmF0aW9uXyA9IGZ1bmN0aW9uIHJlcG9ydEV4Y2VwdGlvbkluRGVyaXZhdGlvbl8oZXJyb3IpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIGlmICh0aGlzLmVycm9ySGFuZGxlcl8pIHtcbiAgICAgIHRoaXMuZXJyb3JIYW5kbGVyXyhlcnJvciwgdGhpcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChnbG9iYWxTdGF0ZS5kaXNhYmxlRXJyb3JCb3VuZGFyaWVzKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgdmFyIG1lc3NhZ2UgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcIlttb2J4XSBFbmNvdW50ZXJlZCBhbiB1bmNhdWdodCBleGNlcHRpb24gdGhhdCB3YXMgdGhyb3duIGJ5IGEgcmVhY3Rpb24gb3Igb2JzZXJ2ZXIgY29tcG9uZW50LCBpbjogJ1wiICsgdGhpcyArIFwiJ1wiIDogXCJbbW9ieF0gdW5jYXVnaHQgZXJyb3IgaW4gJ1wiICsgdGhpcyArIFwiJ1wiO1xuICAgIGlmICghZ2xvYmFsU3RhdGUuc3VwcHJlc3NSZWFjdGlvbkVycm9ycykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCBlcnJvcik7XG4gICAgICAvKiogSWYgZGVidWdnaW5nIGJyb3VnaHQgeW91IGhlcmUsIHBsZWFzZSwgcmVhZCB0aGUgYWJvdmUgbWVzc2FnZSA6LSkuIFRueCEgKi9cbiAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgY29uc29sZS53YXJuKFwiW21vYnhdIChlcnJvciBpbiByZWFjdGlvbiAnXCIgKyB0aGlzLm5hbWVfICsgXCInIHN1cHByZXNzZWQsIGZpeCBlcnJvciBvZiBjYXVzaW5nIGFjdGlvbiBiZWxvdylcIik7XG4gICAgfSAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGlzU3B5RW5hYmxlZCgpKSB7XG4gICAgICBzcHlSZXBvcnQoe1xuICAgICAgICB0eXBlOiBcImVycm9yXCIsXG4gICAgICAgIG5hbWU6IHRoaXMubmFtZV8sXG4gICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgIGVycm9yOiBcIlwiICsgZXJyb3JcbiAgICAgIH0pO1xuICAgIH1cbiAgICBnbG9iYWxTdGF0ZS5nbG9iYWxSZWFjdGlvbkVycm9ySGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoZikge1xuICAgICAgcmV0dXJuIGYoZXJyb3IsIF90aGlzKTtcbiAgICB9KTtcbiAgfTtcbiAgX3Byb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgIGlmICghdGhpcy5pc0Rpc3Bvc2VkXykge1xuICAgICAgdGhpcy5pc0Rpc3Bvc2VkXyA9IHRydWU7XG4gICAgICBpZiAoIXRoaXMuaXNSdW5uaW5nXykge1xuICAgICAgICAvLyBpZiBkaXNwb3NlZCB3aGlsZSBydW5uaW5nLCBjbGVhbiB1cCBsYXRlci4gTWF5YmUgbm90IG9wdGltYWwsIGJ1dCByYXJlIGNhc2VcbiAgICAgICAgc3RhcnRCYXRjaCgpO1xuICAgICAgICBjbGVhck9ic2VydmluZyh0aGlzKTtcbiAgICAgICAgZW5kQmF0Y2goKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIF9wcm90by5nZXREaXNwb3Nlcl8gPSBmdW5jdGlvbiBnZXREaXNwb3Nlcl8oYWJvcnRTaWduYWwpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICB2YXIgZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICBfdGhpczIuZGlzcG9zZSgpO1xuICAgICAgYWJvcnRTaWduYWwgPT0gbnVsbCA/IHZvaWQgMCA6IGFib3J0U2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIgPT0gbnVsbCA/IHZvaWQgMCA6IGFib3J0U2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBkaXNwb3NlKTtcbiAgICB9O1xuICAgIGFib3J0U2lnbmFsID09IG51bGwgPyB2b2lkIDAgOiBhYm9ydFNpZ25hbC5hZGRFdmVudExpc3RlbmVyID09IG51bGwgPyB2b2lkIDAgOiBhYm9ydFNpZ25hbC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgZGlzcG9zZSk7XG4gICAgZGlzcG9zZVskbW9ieF0gPSB0aGlzO1xuICAgIHJldHVybiBkaXNwb3NlO1xuICB9O1xuICBfcHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gXCJSZWFjdGlvbltcIiArIHRoaXMubmFtZV8gKyBcIl1cIjtcbiAgfTtcbiAgX3Byb3RvLnRyYWNlID0gZnVuY3Rpb24gdHJhY2UkMShlbnRlckJyZWFrUG9pbnQpIHtcbiAgICBpZiAoZW50ZXJCcmVha1BvaW50ID09PSB2b2lkIDApIHtcbiAgICAgIGVudGVyQnJlYWtQb2ludCA9IGZhbHNlO1xuICAgIH1cbiAgICB0cmFjZSh0aGlzLCBlbnRlckJyZWFrUG9pbnQpO1xuICB9O1xuICByZXR1cm4gUmVhY3Rpb247XG59KCk7XG5mdW5jdGlvbiBvblJlYWN0aW9uRXJyb3IoaGFuZGxlcikge1xuICBnbG9iYWxTdGF0ZS5nbG9iYWxSZWFjdGlvbkVycm9ySGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWR4ID0gZ2xvYmFsU3RhdGUuZ2xvYmFsUmVhY3Rpb25FcnJvckhhbmRsZXJzLmluZGV4T2YoaGFuZGxlcik7XG4gICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICBnbG9iYWxTdGF0ZS5nbG9iYWxSZWFjdGlvbkVycm9ySGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICB9O1xufVxuLyoqXG4gKiBNYWdpYyBudW1iZXIgYWxlcnQhXG4gKiBEZWZpbmVzIHdpdGhpbiBob3cgbWFueSB0aW1lcyBhIHJlYWN0aW9uIGlzIGFsbG93ZWQgdG8gcmUtdHJpZ2dlciBpdHNlbGZcbiAqIHVudGlsIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGlzIGlzIGdvbm5hIGJlIGEgbmV2ZXIgZW5kaW5nIGxvb3AuLi5cbiAqL1xudmFyIE1BWF9SRUFDVElPTl9JVEVSQVRJT05TID0gMTAwO1xudmFyIHJlYWN0aW9uU2NoZWR1bGVyID0gZnVuY3Rpb24gcmVhY3Rpb25TY2hlZHVsZXIoZikge1xuICByZXR1cm4gZigpO1xufTtcbmZ1bmN0aW9uIHJ1blJlYWN0aW9ucygpIHtcbiAgLy8gVHJhbXBvbGluaW5nLCBpZiBydW5SZWFjdGlvbnMgYXJlIGFscmVhZHkgcnVubmluZywgbmV3IHJlYWN0aW9ucyB3aWxsIGJlIHBpY2tlZCB1cFxuICBpZiAoZ2xvYmFsU3RhdGUuaW5CYXRjaCA+IDAgfHwgZ2xvYmFsU3RhdGUuaXNSdW5uaW5nUmVhY3Rpb25zKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJlYWN0aW9uU2NoZWR1bGVyKHJ1blJlYWN0aW9uc0hlbHBlcik7XG59XG5mdW5jdGlvbiBydW5SZWFjdGlvbnNIZWxwZXIoKSB7XG4gIGdsb2JhbFN0YXRlLmlzUnVubmluZ1JlYWN0aW9ucyA9IHRydWU7XG4gIHZhciBhbGxSZWFjdGlvbnMgPSBnbG9iYWxTdGF0ZS5wZW5kaW5nUmVhY3Rpb25zO1xuICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gIC8vIFdoaWxlIHJ1bm5pbmcgcmVhY3Rpb25zLCBuZXcgcmVhY3Rpb25zIG1pZ2h0IGJlIHRyaWdnZXJlZC5cbiAgLy8gSGVuY2Ugd2Ugd29yayB3aXRoIHR3byB2YXJpYWJsZXMgYW5kIGNoZWNrIHdoZXRoZXJcbiAgLy8gd2UgY29udmVyZ2UgdG8gbm8gcmVtYWluaW5nIHJlYWN0aW9ucyBhZnRlciBhIHdoaWxlLlxuICB3aGlsZSAoYWxsUmVhY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICBpZiAoKytpdGVyYXRpb25zID09PSBNQVhfUkVBQ1RJT05fSVRFUkFUSU9OUykge1xuICAgICAgY29uc29sZS5lcnJvcihwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcIlJlYWN0aW9uIGRvZXNuJ3QgY29udmVyZ2UgdG8gYSBzdGFibGUgc3RhdGUgYWZ0ZXIgXCIgKyBNQVhfUkVBQ1RJT05fSVRFUkFUSU9OUyArIFwiIGl0ZXJhdGlvbnMuXCIgKyAoXCIgUHJvYmFibHkgdGhlcmUgaXMgYSBjeWNsZSBpbiB0aGUgcmVhY3RpdmUgZnVuY3Rpb246IFwiICsgYWxsUmVhY3Rpb25zWzBdKSA6IFwiW21vYnhdIGN5Y2xlIGluIHJlYWN0aW9uOiBcIiArIGFsbFJlYWN0aW9uc1swXSk7XG4gICAgICBhbGxSZWFjdGlvbnMuc3BsaWNlKDApOyAvLyBjbGVhciByZWFjdGlvbnNcbiAgICB9XG5cbiAgICB2YXIgcmVtYWluaW5nUmVhY3Rpb25zID0gYWxsUmVhY3Rpb25zLnNwbGljZSgwKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHJlbWFpbmluZ1JlYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHJlbWFpbmluZ1JlYWN0aW9uc1tpXS5ydW5SZWFjdGlvbl8oKTtcbiAgICB9XG4gIH1cbiAgZ2xvYmFsU3RhdGUuaXNSdW5uaW5nUmVhY3Rpb25zID0gZmFsc2U7XG59XG52YXIgaXNSZWFjdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlKFwiUmVhY3Rpb25cIiwgUmVhY3Rpb24pO1xuZnVuY3Rpb24gc2V0UmVhY3Rpb25TY2hlZHVsZXIoZm4pIHtcbiAgdmFyIGJhc2VTY2hlZHVsZXIgPSByZWFjdGlvblNjaGVkdWxlcjtcbiAgcmVhY3Rpb25TY2hlZHVsZXIgPSBmdW5jdGlvbiByZWFjdGlvblNjaGVkdWxlcihmKSB7XG4gICAgcmV0dXJuIGZuKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBiYXNlU2NoZWR1bGVyKGYpO1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBpc1NweUVuYWJsZWQoKSB7XG4gIHJldHVybiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgISFnbG9iYWxTdGF0ZS5zcHlMaXN0ZW5lcnMubGVuZ3RoO1xufVxuZnVuY3Rpb24gc3B5UmVwb3J0KGV2ZW50KSB7XG4gIGlmICghKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gZGVhZCBjb2RlIGVsaW1pbmF0aW9uIGNhbiBkbyB0aGUgcmVzdFxuICBpZiAoIWdsb2JhbFN0YXRlLnNweUxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxpc3RlbmVycyA9IGdsb2JhbFN0YXRlLnNweUxpc3RlbmVycztcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgbGlzdGVuZXJzW2ldKGV2ZW50KTtcbiAgfVxufVxuZnVuY3Rpb24gc3B5UmVwb3J0U3RhcnQoZXZlbnQpIHtcbiAgaWYgKCEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgY2hhbmdlID0gX2V4dGVuZHMoe30sIGV2ZW50LCB7XG4gICAgc3B5UmVwb3J0U3RhcnQ6IHRydWVcbiAgfSk7XG4gIHNweVJlcG9ydChjaGFuZ2UpO1xufVxudmFyIEVORF9FVkVOVCA9IHtcbiAgdHlwZTogXCJyZXBvcnQtZW5kXCIsXG4gIHNweVJlcG9ydEVuZDogdHJ1ZVxufTtcbmZ1bmN0aW9uIHNweVJlcG9ydEVuZChjaGFuZ2UpIHtcbiAgaWYgKCEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2hhbmdlKSB7XG4gICAgc3B5UmVwb3J0KF9leHRlbmRzKHt9LCBjaGFuZ2UsIHtcbiAgICAgIHR5cGU6IFwicmVwb3J0LWVuZFwiLFxuICAgICAgc3B5UmVwb3J0RW5kOiB0cnVlXG4gICAgfSkpO1xuICB9IGVsc2Uge1xuICAgIHNweVJlcG9ydChFTkRfRVZFTlQpO1xuICB9XG59XG5mdW5jdGlvbiBzcHkobGlzdGVuZXIpIHtcbiAgaWYgKCEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIGNvbnNvbGUud2FybihcIlttb2J4LnNweV0gSXMgYSBuby1vcCBpbiBwcm9kdWN0aW9uIGJ1aWxkc1wiKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge307XG4gIH0gZWxzZSB7XG4gICAgZ2xvYmFsU3RhdGUuc3B5TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIHJldHVybiBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgICAgIGdsb2JhbFN0YXRlLnNweUxpc3RlbmVycyA9IGdsb2JhbFN0YXRlLnNweUxpc3RlbmVycy5maWx0ZXIoZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgcmV0dXJuIGwgIT09IGxpc3RlbmVyO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxudmFyIEFDVElPTiA9IFwiYWN0aW9uXCI7XG52YXIgQUNUSU9OX0JPVU5EID0gXCJhY3Rpb24uYm91bmRcIjtcbnZhciBBVVRPQUNUSU9OID0gXCJhdXRvQWN0aW9uXCI7XG52YXIgQVVUT0FDVElPTl9CT1VORCA9IFwiYXV0b0FjdGlvbi5ib3VuZFwiO1xudmFyIERFRkFVTFRfQUNUSU9OX05BTUUgPSBcIjx1bm5hbWVkIGFjdGlvbj5cIjtcbnZhciBhY3Rpb25Bbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUFjdGlvbkFubm90YXRpb24oQUNUSU9OKTtcbnZhciBhY3Rpb25Cb3VuZEFubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlQWN0aW9uQW5ub3RhdGlvbihBQ1RJT05fQk9VTkQsIHtcbiAgYm91bmQ6IHRydWVcbn0pO1xudmFyIGF1dG9BY3Rpb25Bbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUFjdGlvbkFubm90YXRpb24oQVVUT0FDVElPTiwge1xuICBhdXRvQWN0aW9uOiB0cnVlXG59KTtcbnZhciBhdXRvQWN0aW9uQm91bmRBbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUFjdGlvbkFubm90YXRpb24oQVVUT0FDVElPTl9CT1VORCwge1xuICBhdXRvQWN0aW9uOiB0cnVlLFxuICBib3VuZDogdHJ1ZVxufSk7XG5mdW5jdGlvbiBjcmVhdGVBY3Rpb25GYWN0b3J5KGF1dG9BY3Rpb24pIHtcbiAgdmFyIHJlcyA9IGZ1bmN0aW9uIGFjdGlvbihhcmcxLCBhcmcyKSB7XG4gICAgLy8gYWN0aW9uKGZuKCkge30pXG4gICAgaWYgKGlzRnVuY3Rpb24oYXJnMSkpIHtcbiAgICAgIHJldHVybiBjcmVhdGVBY3Rpb24oYXJnMS5uYW1lIHx8IERFRkFVTFRfQUNUSU9OX05BTUUsIGFyZzEsIGF1dG9BY3Rpb24pO1xuICAgIH1cbiAgICAvLyBhY3Rpb24oXCJuYW1lXCIsIGZuKCkge30pXG4gICAgaWYgKGlzRnVuY3Rpb24oYXJnMikpIHtcbiAgICAgIHJldHVybiBjcmVhdGVBY3Rpb24oYXJnMSwgYXJnMiwgYXV0b0FjdGlvbik7XG4gICAgfVxuICAgIC8vIEBhY3Rpb24gKDIwMjIuMyBEZWNvcmF0b3JzKVxuICAgIGlmIChpczIwMjIzRGVjb3JhdG9yKGFyZzIpKSB7XG4gICAgICByZXR1cm4gKGF1dG9BY3Rpb24gPyBhdXRvQWN0aW9uQW5ub3RhdGlvbiA6IGFjdGlvbkFubm90YXRpb24pLmRlY29yYXRlXzIwMjIzXyhhcmcxLCBhcmcyKTtcbiAgICB9XG4gICAgLy8gQGFjdGlvblxuICAgIGlmIChpc1N0cmluZ2lzaChhcmcyKSkge1xuICAgICAgcmV0dXJuIHN0b3JlQW5ub3RhdGlvbihhcmcxLCBhcmcyLCBhdXRvQWN0aW9uID8gYXV0b0FjdGlvbkFubm90YXRpb24gOiBhY3Rpb25Bbm5vdGF0aW9uKTtcbiAgICB9XG4gICAgLy8gYWN0aW9uKFwibmFtZVwiKSAmIEBhY3Rpb24oXCJuYW1lXCIpXG4gICAgaWYgKGlzU3RyaW5naXNoKGFyZzEpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRGVjb3JhdG9yQW5ub3RhdGlvbihjcmVhdGVBY3Rpb25Bbm5vdGF0aW9uKGF1dG9BY3Rpb24gPyBBVVRPQUNUSU9OIDogQUNUSU9OLCB7XG4gICAgICAgIG5hbWU6IGFyZzEsXG4gICAgICAgIGF1dG9BY3Rpb246IGF1dG9BY3Rpb25cbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgZGllKFwiSW52YWxpZCBhcmd1bWVudHMgZm9yIGBhY3Rpb25gXCIpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHJlcztcbn1cbnZhciBhY3Rpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlQWN0aW9uRmFjdG9yeShmYWxzZSk7XG5PYmplY3QuYXNzaWduKGFjdGlvbiwgYWN0aW9uQW5ub3RhdGlvbik7XG52YXIgYXV0b0FjdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVBY3Rpb25GYWN0b3J5KHRydWUpO1xuT2JqZWN0LmFzc2lnbihhdXRvQWN0aW9uLCBhdXRvQWN0aW9uQW5ub3RhdGlvbik7XG5hY3Rpb24uYm91bmQgPSAvKiNfX1BVUkVfXyovY3JlYXRlRGVjb3JhdG9yQW5ub3RhdGlvbihhY3Rpb25Cb3VuZEFubm90YXRpb24pO1xuYXV0b0FjdGlvbi5ib3VuZCA9IC8qI19fUFVSRV9fKi9jcmVhdGVEZWNvcmF0b3JBbm5vdGF0aW9uKGF1dG9BY3Rpb25Cb3VuZEFubm90YXRpb24pO1xuZnVuY3Rpb24gcnVuSW5BY3Rpb24oZm4pIHtcbiAgcmV0dXJuIGV4ZWN1dGVBY3Rpb24oZm4ubmFtZSB8fCBERUZBVUxUX0FDVElPTl9OQU1FLCBmYWxzZSwgZm4sIHRoaXMsIHVuZGVmaW5lZCk7XG59XG5mdW5jdGlvbiBpc0FjdGlvbih0aGluZykge1xuICByZXR1cm4gaXNGdW5jdGlvbih0aGluZykgJiYgdGhpbmcuaXNNb2J4QWN0aW9uID09PSB0cnVlO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuYW1lZCByZWFjdGl2ZSB2aWV3IGFuZCBrZWVwcyBpdCBhbGl2ZSwgc28gdGhhdCB0aGUgdmlldyBpcyBhbHdheXNcbiAqIHVwZGF0ZWQgaWYgb25lIG9mIHRoZSBkZXBlbmRlbmNpZXMgY2hhbmdlcywgZXZlbiB3aGVuIHRoZSB2aWV3IGlzIG5vdCBmdXJ0aGVyIHVzZWQgYnkgc29tZXRoaW5nIGVsc2UuXG4gKiBAcGFyYW0gdmlldyBUaGUgcmVhY3RpdmUgdmlld1xuICogQHJldHVybnMgZGlzcG9zZXIgZnVuY3Rpb24sIHdoaWNoIGNhbiBiZSB1c2VkIHRvIHN0b3AgdGhlIHZpZXcgZnJvbSBiZWluZyB1cGRhdGVkIGluIHRoZSBmdXR1cmUuXG4gKi9cbmZ1bmN0aW9uIGF1dG9ydW4odmlldywgb3B0cykge1xuICB2YXIgX29wdHMkbmFtZSwgX29wdHMsIF9vcHRzMiwgX29wdHMyJHNpZ25hbCwgX29wdHMzO1xuICBpZiAob3B0cyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0cyA9IEVNUFRZX09CSkVDVDtcbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgaWYgKCFpc0Z1bmN0aW9uKHZpZXcpKSB7XG4gICAgICBkaWUoXCJBdXRvcnVuIGV4cGVjdHMgYSBmdW5jdGlvbiBhcyBmaXJzdCBhcmd1bWVudFwiKTtcbiAgICB9XG4gICAgaWYgKGlzQWN0aW9uKHZpZXcpKSB7XG4gICAgICBkaWUoXCJBdXRvcnVuIGRvZXMgbm90IGFjY2VwdCBhY3Rpb25zIHNpbmNlIGFjdGlvbnMgYXJlIHVudHJhY2thYmxlXCIpO1xuICAgIH1cbiAgfVxuICB2YXIgbmFtZSA9IChfb3B0cyRuYW1lID0gKF9vcHRzID0gb3B0cykgPT0gbnVsbCA/IHZvaWQgMCA6IF9vcHRzLm5hbWUpICE9IG51bGwgPyBfb3B0cyRuYW1lIDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gdmlldy5uYW1lIHx8IFwiQXV0b3J1bkBcIiArIGdldE5leHRJZCgpIDogXCJBdXRvcnVuXCI7XG4gIHZhciBydW5TeW5jID0gIW9wdHMuc2NoZWR1bGVyICYmICFvcHRzLmRlbGF5O1xuICB2YXIgcmVhY3Rpb247XG4gIGlmIChydW5TeW5jKSB7XG4gICAgLy8gbm9ybWFsIGF1dG9ydW5cbiAgICByZWFjdGlvbiA9IG5ldyBSZWFjdGlvbihuYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnRyYWNrKHJlYWN0aW9uUnVubmVyKTtcbiAgICB9LCBvcHRzLm9uRXJyb3IsIG9wdHMucmVxdWlyZXNPYnNlcnZhYmxlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2NoZWR1bGVyID0gY3JlYXRlU2NoZWR1bGVyRnJvbU9wdGlvbnMob3B0cyk7XG4gICAgLy8gZGVib3VuY2VkIGF1dG9ydW5cbiAgICB2YXIgaXNTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICByZWFjdGlvbiA9IG5ldyBSZWFjdGlvbihuYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWlzU2NoZWR1bGVkKSB7XG4gICAgICAgIGlzU2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgc2NoZWR1bGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpc1NjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICAgIGlmICghcmVhY3Rpb24uaXNEaXNwb3NlZF8pIHtcbiAgICAgICAgICAgIHJlYWN0aW9uLnRyYWNrKHJlYWN0aW9uUnVubmVyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIG9wdHMub25FcnJvciwgb3B0cy5yZXF1aXJlc09ic2VydmFibGUpO1xuICB9XG4gIGZ1bmN0aW9uIHJlYWN0aW9uUnVubmVyKCkge1xuICAgIHZpZXcocmVhY3Rpb24pO1xuICB9XG4gIGlmICghKChfb3B0czIgPSBvcHRzKSAhPSBudWxsICYmIChfb3B0czIkc2lnbmFsID0gX29wdHMyLnNpZ25hbCkgIT0gbnVsbCAmJiBfb3B0czIkc2lnbmFsLmFib3J0ZWQpKSB7XG4gICAgcmVhY3Rpb24uc2NoZWR1bGVfKCk7XG4gIH1cbiAgcmV0dXJuIHJlYWN0aW9uLmdldERpc3Bvc2VyXygoX29wdHMzID0gb3B0cykgPT0gbnVsbCA/IHZvaWQgMCA6IF9vcHRzMy5zaWduYWwpO1xufVxudmFyIHJ1biA9IGZ1bmN0aW9uIHJ1bihmKSB7XG4gIHJldHVybiBmKCk7XG59O1xuZnVuY3Rpb24gY3JlYXRlU2NoZWR1bGVyRnJvbU9wdGlvbnMob3B0cykge1xuICByZXR1cm4gb3B0cy5zY2hlZHVsZXIgPyBvcHRzLnNjaGVkdWxlciA6IG9wdHMuZGVsYXkgPyBmdW5jdGlvbiAoZikge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGYsIG9wdHMuZGVsYXkpO1xuICB9IDogcnVuO1xufVxuZnVuY3Rpb24gcmVhY3Rpb24oZXhwcmVzc2lvbiwgZWZmZWN0LCBvcHRzKSB7XG4gIHZhciBfb3B0cyRuYW1lMiwgX29wdHM0LCBfb3B0czQkc2lnbmFsLCBfb3B0czU7XG4gIGlmIChvcHRzID09PSB2b2lkIDApIHtcbiAgICBvcHRzID0gRU1QVFlfT0JKRUNUO1xuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBpZiAoIWlzRnVuY3Rpb24oZXhwcmVzc2lvbikgfHwgIWlzRnVuY3Rpb24oZWZmZWN0KSkge1xuICAgICAgZGllKFwiRmlyc3QgYW5kIHNlY29uZCBhcmd1bWVudCB0byByZWFjdGlvbiBzaG91bGQgYmUgZnVuY3Rpb25zXCIpO1xuICAgIH1cbiAgICBpZiAoIWlzUGxhaW5PYmplY3Qob3B0cykpIHtcbiAgICAgIGRpZShcIlRoaXJkIGFyZ3VtZW50IG9mIHJlYWN0aW9ucyBzaG91bGQgYmUgYW4gb2JqZWN0XCIpO1xuICAgIH1cbiAgfVxuICB2YXIgbmFtZSA9IChfb3B0cyRuYW1lMiA9IG9wdHMubmFtZSkgIT0gbnVsbCA/IF9vcHRzJG5hbWUyIDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJSZWFjdGlvbkBcIiArIGdldE5leHRJZCgpIDogXCJSZWFjdGlvblwiO1xuICB2YXIgZWZmZWN0QWN0aW9uID0gYWN0aW9uKG5hbWUsIG9wdHMub25FcnJvciA/IHdyYXBFcnJvckhhbmRsZXIob3B0cy5vbkVycm9yLCBlZmZlY3QpIDogZWZmZWN0KTtcbiAgdmFyIHJ1blN5bmMgPSAhb3B0cy5zY2hlZHVsZXIgJiYgIW9wdHMuZGVsYXk7XG4gIHZhciBzY2hlZHVsZXIgPSBjcmVhdGVTY2hlZHVsZXJGcm9tT3B0aW9ucyhvcHRzKTtcbiAgdmFyIGZpcnN0VGltZSA9IHRydWU7XG4gIHZhciBpc1NjaGVkdWxlZCA9IGZhbHNlO1xuICB2YXIgdmFsdWU7XG4gIHZhciBlcXVhbHMgPSBvcHRzLmNvbXBhcmVTdHJ1Y3R1cmFsID8gY29tcGFyZXIuc3RydWN0dXJhbCA6IG9wdHMuZXF1YWxzIHx8IGNvbXBhcmVyW1wiZGVmYXVsdFwiXTtcbiAgdmFyIHIgPSBuZXcgUmVhY3Rpb24obmFtZSwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChmaXJzdFRpbWUgfHwgcnVuU3luYykge1xuICAgICAgcmVhY3Rpb25SdW5uZXIoKTtcbiAgICB9IGVsc2UgaWYgKCFpc1NjaGVkdWxlZCkge1xuICAgICAgaXNTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgc2NoZWR1bGVyKHJlYWN0aW9uUnVubmVyKTtcbiAgICB9XG4gIH0sIG9wdHMub25FcnJvciwgb3B0cy5yZXF1aXJlc09ic2VydmFibGUpO1xuICBmdW5jdGlvbiByZWFjdGlvblJ1bm5lcigpIHtcbiAgICBpc1NjaGVkdWxlZCA9IGZhbHNlO1xuICAgIGlmIChyLmlzRGlzcG9zZWRfKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgdmFyIG9sZFZhbHVlID0gdmFsdWU7XG4gICAgci50cmFjayhmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgbmV4dFZhbHVlID0gYWxsb3dTdGF0ZUNoYW5nZXMoZmFsc2UsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGV4cHJlc3Npb24ocik7XG4gICAgICB9KTtcbiAgICAgIGNoYW5nZWQgPSBmaXJzdFRpbWUgfHwgIWVxdWFscyh2YWx1ZSwgbmV4dFZhbHVlKTtcbiAgICAgIHZhbHVlID0gbmV4dFZhbHVlO1xuICAgIH0pO1xuICAgIGlmIChmaXJzdFRpbWUgJiYgb3B0cy5maXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgIGVmZmVjdEFjdGlvbih2YWx1ZSwgb2xkVmFsdWUsIHIpO1xuICAgIH0gZWxzZSBpZiAoIWZpcnN0VGltZSAmJiBjaGFuZ2VkKSB7XG4gICAgICBlZmZlY3RBY3Rpb24odmFsdWUsIG9sZFZhbHVlLCByKTtcbiAgICB9XG4gICAgZmlyc3RUaW1lID0gZmFsc2U7XG4gIH1cbiAgaWYgKCEoKF9vcHRzNCA9IG9wdHMpICE9IG51bGwgJiYgKF9vcHRzNCRzaWduYWwgPSBfb3B0czQuc2lnbmFsKSAhPSBudWxsICYmIF9vcHRzNCRzaWduYWwuYWJvcnRlZCkpIHtcbiAgICByLnNjaGVkdWxlXygpO1xuICB9XG4gIHJldHVybiByLmdldERpc3Bvc2VyXygoX29wdHM1ID0gb3B0cykgPT0gbnVsbCA/IHZvaWQgMCA6IF9vcHRzNS5zaWduYWwpO1xufVxuZnVuY3Rpb24gd3JhcEVycm9ySGFuZGxlcihlcnJvckhhbmRsZXIsIGJhc2VGbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYmFzZUZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgZXJyb3JIYW5kbGVyLmNhbGwodGhpcywgZSk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgT05fQkVDT01FX09CU0VSVkVEID0gXCJvbkJPXCI7XG52YXIgT05fQkVDT01FX1VOT0JTRVJWRUQgPSBcIm9uQlVPXCI7XG5mdW5jdGlvbiBvbkJlY29tZU9ic2VydmVkKHRoaW5nLCBhcmcyLCBhcmczKSB7XG4gIHJldHVybiBpbnRlcmNlcHRIb29rKE9OX0JFQ09NRV9PQlNFUlZFRCwgdGhpbmcsIGFyZzIsIGFyZzMpO1xufVxuZnVuY3Rpb24gb25CZWNvbWVVbm9ic2VydmVkKHRoaW5nLCBhcmcyLCBhcmczKSB7XG4gIHJldHVybiBpbnRlcmNlcHRIb29rKE9OX0JFQ09NRV9VTk9CU0VSVkVELCB0aGluZywgYXJnMiwgYXJnMyk7XG59XG5mdW5jdGlvbiBpbnRlcmNlcHRIb29rKGhvb2ssIHRoaW5nLCBhcmcyLCBhcmczKSB7XG4gIHZhciBhdG9tID0gdHlwZW9mIGFyZzMgPT09IFwiZnVuY3Rpb25cIiA/IGdldEF0b20odGhpbmcsIGFyZzIpIDogZ2V0QXRvbSh0aGluZyk7XG4gIHZhciBjYiA9IGlzRnVuY3Rpb24oYXJnMykgPyBhcmczIDogYXJnMjtcbiAgdmFyIGxpc3RlbmVyc0tleSA9IGhvb2sgKyBcIkxcIjtcbiAgaWYgKGF0b21bbGlzdGVuZXJzS2V5XSkge1xuICAgIGF0b21bbGlzdGVuZXJzS2V5XS5hZGQoY2IpO1xuICB9IGVsc2Uge1xuICAgIGF0b21bbGlzdGVuZXJzS2V5XSA9IG5ldyBTZXQoW2NiXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaG9va0xpc3RlbmVycyA9IGF0b21bbGlzdGVuZXJzS2V5XTtcbiAgICBpZiAoaG9va0xpc3RlbmVycykge1xuICAgICAgaG9va0xpc3RlbmVyc1tcImRlbGV0ZVwiXShjYik7XG4gICAgICBpZiAoaG9va0xpc3RlbmVycy5zaXplID09PSAwKSB7XG4gICAgICAgIGRlbGV0ZSBhdG9tW2xpc3RlbmVyc0tleV07XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG52YXIgTkVWRVIgPSBcIm5ldmVyXCI7XG52YXIgQUxXQVlTID0gXCJhbHdheXNcIjtcbnZhciBPQlNFUlZFRCA9IFwib2JzZXJ2ZWRcIjtcbi8vIGNvbnN0IElGX0FWQUlMQUJMRSA9IFwiaWZhdmFpbGFibGVcIlxuZnVuY3Rpb24gY29uZmlndXJlKG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMuaXNvbGF0ZUdsb2JhbFN0YXRlID09PSB0cnVlKSB7XG4gICAgaXNvbGF0ZUdsb2JhbFN0YXRlKCk7XG4gIH1cbiAgdmFyIHVzZVByb3hpZXMgPSBvcHRpb25zLnVzZVByb3hpZXMsXG4gICAgZW5mb3JjZUFjdGlvbnMgPSBvcHRpb25zLmVuZm9yY2VBY3Rpb25zO1xuICBpZiAodXNlUHJveGllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZ2xvYmFsU3RhdGUudXNlUHJveGllcyA9IHVzZVByb3hpZXMgPT09IEFMV0FZUyA/IHRydWUgOiB1c2VQcm94aWVzID09PSBORVZFUiA/IGZhbHNlIDogdHlwZW9mIFByb3h5ICE9PSBcInVuZGVmaW5lZFwiO1xuICB9XG4gIGlmICh1c2VQcm94aWVzID09PSBcImlmYXZhaWxhYmxlXCIpIHtcbiAgICBnbG9iYWxTdGF0ZS52ZXJpZnlQcm94aWVzID0gdHJ1ZTtcbiAgfVxuICBpZiAoZW5mb3JjZUFjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBlYSA9IGVuZm9yY2VBY3Rpb25zID09PSBBTFdBWVMgPyBBTFdBWVMgOiBlbmZvcmNlQWN0aW9ucyA9PT0gT0JTRVJWRUQ7XG4gICAgZ2xvYmFsU3RhdGUuZW5mb3JjZUFjdGlvbnMgPSBlYTtcbiAgICBnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlQ2hhbmdlcyA9IGVhID09PSB0cnVlIHx8IGVhID09PSBBTFdBWVMgPyBmYWxzZSA6IHRydWU7XG4gIH1cbiAgW1wiY29tcHV0ZWRSZXF1aXJlc1JlYWN0aW9uXCIsIFwicmVhY3Rpb25SZXF1aXJlc09ic2VydmFibGVcIiwgXCJvYnNlcnZhYmxlUmVxdWlyZXNSZWFjdGlvblwiLCBcImRpc2FibGVFcnJvckJvdW5kYXJpZXNcIiwgXCJzYWZlRGVzY3JpcHRvcnNcIl0uZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGtleSBpbiBvcHRpb25zKSB7XG4gICAgICBnbG9iYWxTdGF0ZVtrZXldID0gISFvcHRpb25zW2tleV07XG4gICAgfVxuICB9KTtcbiAgZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZVJlYWRzID0gIWdsb2JhbFN0YXRlLm9ic2VydmFibGVSZXF1aXJlc1JlYWN0aW9uO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGdsb2JhbFN0YXRlLmRpc2FibGVFcnJvckJvdW5kYXJpZXMgPT09IHRydWUpIHtcbiAgICBjb25zb2xlLndhcm4oXCJXQVJOSU5HOiBEZWJ1ZyBmZWF0dXJlIG9ubHkuIE1vYlggd2lsbCBOT1QgcmVjb3ZlciBmcm9tIGVycm9ycyB3aGVuIGBkaXNhYmxlRXJyb3JCb3VuZGFyaWVzYCBpcyBlbmFibGVkLlwiKTtcbiAgfVxuICBpZiAob3B0aW9ucy5yZWFjdGlvblNjaGVkdWxlcikge1xuICAgIHNldFJlYWN0aW9uU2NoZWR1bGVyKG9wdGlvbnMucmVhY3Rpb25TY2hlZHVsZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV4dGVuZE9ic2VydmFibGUodGFyZ2V0LCBwcm9wZXJ0aWVzLCBhbm5vdGF0aW9ucywgb3B0aW9ucykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiA0KSB7XG4gICAgICBkaWUoXCInZXh0ZW5kT2JzZXJ2YWJsZScgZXhwZWN0ZWQgMi00IGFyZ3VtZW50c1wiKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQgIT09IFwib2JqZWN0XCIpIHtcbiAgICAgIGRpZShcIidleHRlbmRPYnNlcnZhYmxlJyBleHBlY3RzIGFuIG9iamVjdCBhcyBmaXJzdCBhcmd1bWVudFwiKTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU1hcCh0YXJnZXQpKSB7XG4gICAgICBkaWUoXCInZXh0ZW5kT2JzZXJ2YWJsZScgc2hvdWxkIG5vdCBiZSB1c2VkIG9uIG1hcHMsIHVzZSBtYXAubWVyZ2UgaW5zdGVhZFwiKTtcbiAgICB9XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KHByb3BlcnRpZXMpKSB7XG4gICAgICBkaWUoXCInZXh0ZW5kT2JzZXJ2YWJsZScgb25seSBhY2NlcHRzIHBsYWluIG9iamVjdHMgYXMgc2Vjb25kIGFyZ3VtZW50XCIpO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlKHByb3BlcnRpZXMpIHx8IGlzT2JzZXJ2YWJsZShhbm5vdGF0aW9ucykpIHtcbiAgICAgIGRpZShcIkV4dGVuZGluZyBhbiBvYmplY3Qgd2l0aCBhbm90aGVyIG9ic2VydmFibGUgKG9iamVjdCkgaXMgbm90IHN1cHBvcnRlZFwiKTtcbiAgICB9XG4gIH1cbiAgLy8gUHVsbCBkZXNjcmlwdG9ycyBmaXJzdCwgc28gd2UgZG9uJ3QgaGF2ZSB0byBkZWFsIHdpdGggcHJvcHMgYWRkZWQgYnkgYWRtaW5pc3RyYXRpb24gKCRtb2J4KVxuICB2YXIgZGVzY3JpcHRvcnMgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHByb3BlcnRpZXMpO1xuICBpbml0T2JzZXJ2YWJsZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFkbSA9IGFzT2JzZXJ2YWJsZU9iamVjdCh0YXJnZXQsIG9wdGlvbnMpWyRtb2J4XTtcbiAgICBvd25LZXlzKGRlc2NyaXB0b3JzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGFkbS5leHRlbmRfKGtleSwgZGVzY3JpcHRvcnNba2V5XSxcbiAgICAgIC8vIG11c3QgcGFzcyBcInVuZGVmaW5lZFwiIGZvciB7IGtleTogdW5kZWZpbmVkIH1cbiAgICAgICFhbm5vdGF0aW9ucyA/IHRydWUgOiBrZXkgaW4gYW5ub3RhdGlvbnMgPyBhbm5vdGF0aW9uc1trZXldIDogdHJ1ZSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBnZXREZXBlbmRlbmN5VHJlZSh0aGluZywgcHJvcGVydHkpIHtcbiAgcmV0dXJuIG5vZGVUb0RlcGVuZGVuY3lUcmVlKGdldEF0b20odGhpbmcsIHByb3BlcnR5KSk7XG59XG5mdW5jdGlvbiBub2RlVG9EZXBlbmRlbmN5VHJlZShub2RlKSB7XG4gIHZhciByZXN1bHQgPSB7XG4gICAgbmFtZTogbm9kZS5uYW1lX1xuICB9O1xuICBpZiAobm9kZS5vYnNlcnZpbmdfICYmIG5vZGUub2JzZXJ2aW5nXy5sZW5ndGggPiAwKSB7XG4gICAgcmVzdWx0LmRlcGVuZGVuY2llcyA9IHVuaXF1ZShub2RlLm9ic2VydmluZ18pLm1hcChub2RlVG9EZXBlbmRlbmN5VHJlZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGdldE9ic2VydmVyVHJlZSh0aGluZywgcHJvcGVydHkpIHtcbiAgcmV0dXJuIG5vZGVUb09ic2VydmVyVHJlZShnZXRBdG9tKHRoaW5nLCBwcm9wZXJ0eSkpO1xufVxuZnVuY3Rpb24gbm9kZVRvT2JzZXJ2ZXJUcmVlKG5vZGUpIHtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICBuYW1lOiBub2RlLm5hbWVfXG4gIH07XG4gIGlmIChoYXNPYnNlcnZlcnMobm9kZSkpIHtcbiAgICByZXN1bHQub2JzZXJ2ZXJzID0gQXJyYXkuZnJvbShnZXRPYnNlcnZlcnMobm9kZSkpLm1hcChub2RlVG9PYnNlcnZlclRyZWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiB1bmlxdWUobGlzdCkge1xuICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KGxpc3QpKTtcbn1cblxudmFyIGdlbmVyYXRvcklkID0gMDtcbmZ1bmN0aW9uIEZsb3dDYW5jZWxsYXRpb25FcnJvcigpIHtcbiAgdGhpcy5tZXNzYWdlID0gXCJGTE9XX0NBTkNFTExFRFwiO1xufVxuRmxvd0NhbmNlbGxhdGlvbkVycm9yLnByb3RvdHlwZSA9IC8qI19fUFVSRV9fKi9PYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5mdW5jdGlvbiBpc0Zsb3dDYW5jZWxsYXRpb25FcnJvcihlcnJvcikge1xuICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBGbG93Q2FuY2VsbGF0aW9uRXJyb3I7XG59XG52YXIgZmxvd0Fubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlRmxvd0Fubm90YXRpb24oXCJmbG93XCIpO1xudmFyIGZsb3dCb3VuZEFubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlRmxvd0Fubm90YXRpb24oXCJmbG93LmJvdW5kXCIsIHtcbiAgYm91bmQ6IHRydWVcbn0pO1xudmFyIGZsb3cgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmFzc2lnbihmdW5jdGlvbiBmbG93KGFyZzEsIGFyZzIpIHtcbiAgLy8gQGZsb3cgKDIwMjIuMyBEZWNvcmF0b3JzKVxuICBpZiAoaXMyMDIyM0RlY29yYXRvcihhcmcyKSkge1xuICAgIHJldHVybiBmbG93QW5ub3RhdGlvbi5kZWNvcmF0ZV8yMDIyM18oYXJnMSwgYXJnMik7XG4gIH1cbiAgLy8gQGZsb3dcbiAgaWYgKGlzU3RyaW5naXNoKGFyZzIpKSB7XG4gICAgcmV0dXJuIHN0b3JlQW5ub3RhdGlvbihhcmcxLCBhcmcyLCBmbG93QW5ub3RhdGlvbik7XG4gIH1cbiAgLy8gZmxvdyhmbilcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBhcmd1bWVudHMubGVuZ3RoICE9PSAxKSB7XG4gICAgZGllKFwiRmxvdyBleHBlY3RzIHNpbmdsZSBhcmd1bWVudCB3aXRoIGdlbmVyYXRvciBmdW5jdGlvblwiKTtcbiAgfVxuICB2YXIgZ2VuZXJhdG9yID0gYXJnMTtcbiAgdmFyIG5hbWUgPSBnZW5lcmF0b3IubmFtZSB8fCBcIjx1bm5hbWVkIGZsb3c+XCI7XG4gIC8vIEltcGxlbWVudGF0aW9uIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS90ai9jby9ibG9iL21hc3Rlci9pbmRleC5qc1xuICB2YXIgcmVzID0gZnVuY3Rpb24gcmVzKCkge1xuICAgIHZhciBjdHggPSB0aGlzO1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBydW5JZCA9ICsrZ2VuZXJhdG9ySWQ7XG4gICAgdmFyIGdlbiA9IGFjdGlvbihuYW1lICsgXCIgLSBydW5pZDogXCIgKyBydW5JZCArIFwiIC0gaW5pdFwiLCBnZW5lcmF0b3IpLmFwcGx5KGN0eCwgYXJncyk7XG4gICAgdmFyIHJlamVjdG9yO1xuICAgIHZhciBwZW5kaW5nUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBzdGVwSWQgPSAwO1xuICAgICAgcmVqZWN0b3IgPSByZWplY3Q7XG4gICAgICBmdW5jdGlvbiBvbkZ1bGZpbGxlZChyZXMpIHtcbiAgICAgICAgcGVuZGluZ1Byb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciByZXQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0ID0gYWN0aW9uKG5hbWUgKyBcIiAtIHJ1bmlkOiBcIiArIHJ1bklkICsgXCIgLSB5aWVsZCBcIiArIHN0ZXBJZCsrLCBnZW4ubmV4dCkuY2FsbChnZW4sIHJlcyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGUpO1xuICAgICAgICB9XG4gICAgICAgIG5leHQocmV0KTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG9uUmVqZWN0ZWQoZXJyKSB7XG4gICAgICAgIHBlbmRpbmdQcm9taXNlID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgcmV0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldCA9IGFjdGlvbihuYW1lICsgXCIgLSBydW5pZDogXCIgKyBydW5JZCArIFwiIC0geWllbGQgXCIgKyBzdGVwSWQrKywgZ2VuW1widGhyb3dcIl0pLmNhbGwoZ2VuLCBlcnIpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0KHJldCk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBuZXh0KHJldCkge1xuICAgICAgICBpZiAoaXNGdW5jdGlvbihyZXQgPT0gbnVsbCA/IHZvaWQgMCA6IHJldC50aGVuKSkge1xuICAgICAgICAgIC8vIGFuIGFzeW5jIGl0ZXJhdG9yXG4gICAgICAgICAgcmV0LnRoZW4obmV4dCwgcmVqZWN0KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJldC5kb25lKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUocmV0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBwZW5kaW5nUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShyZXQudmFsdWUpO1xuICAgICAgICByZXR1cm4gcGVuZGluZ1Byb21pc2UudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG4gICAgICB9XG4gICAgICBvbkZ1bGZpbGxlZCh1bmRlZmluZWQpOyAvLyBraWNrIG9mZiB0aGUgcHJvY2Vzc1xuICAgIH0pO1xuXG4gICAgcHJvbWlzZS5jYW5jZWwgPSBhY3Rpb24obmFtZSArIFwiIC0gcnVuaWQ6IFwiICsgcnVuSWQgKyBcIiAtIGNhbmNlbFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAocGVuZGluZ1Byb21pc2UpIHtcbiAgICAgICAgICBjYW5jZWxQcm9taXNlKHBlbmRpbmdQcm9taXNlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBGaW5hbGx5IGJsb2NrIGNhbiByZXR1cm4gKG9yIHlpZWxkKSBzdHVmZi4uXG4gICAgICAgIHZhciBfcmVzID0gZ2VuW1wicmV0dXJuXCJdKHVuZGVmaW5lZCk7XG4gICAgICAgIC8vIGVhdCBhbnl0aGluZyB0aGF0IHByb21pc2Ugd291bGQgZG8sIGl0J3MgY2FuY2VsbGVkIVxuICAgICAgICB2YXIgeWllbGRlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoX3Jlcy52YWx1ZSk7XG4gICAgICAgIHlpZWxkZWRQcm9taXNlLnRoZW4obm9vcCwgbm9vcCk7XG4gICAgICAgIGNhbmNlbFByb21pc2UoeWllbGRlZFByb21pc2UpOyAvLyBtYXliZSBpdCBjYW4gYmUgY2FuY2VsbGVkIDopXG4gICAgICAgIC8vIHJlamVjdCBvdXIgb3JpZ2luYWwgcHJvbWlzZVxuICAgICAgICByZWplY3RvcihuZXcgRmxvd0NhbmNlbGxhdGlvbkVycm9yKCkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZWplY3RvcihlKTsgLy8gdGhlcmUgY291bGQgYmUgYSB0aHJvd2luZyBmaW5hbGx5IGJsb2NrXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfTtcbiAgcmVzLmlzTW9iWEZsb3cgPSB0cnVlO1xuICByZXR1cm4gcmVzO1xufSwgZmxvd0Fubm90YXRpb24pO1xuZmxvdy5ib3VuZCA9IC8qI19fUFVSRV9fKi9jcmVhdGVEZWNvcmF0b3JBbm5vdGF0aW9uKGZsb3dCb3VuZEFubm90YXRpb24pO1xuZnVuY3Rpb24gY2FuY2VsUHJvbWlzZShwcm9taXNlKSB7XG4gIGlmIChpc0Z1bmN0aW9uKHByb21pc2UuY2FuY2VsKSkge1xuICAgIHByb21pc2UuY2FuY2VsKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGZsb3dSZXN1bHQocmVzdWx0KSB7XG4gIHJldHVybiByZXN1bHQ7IC8vIGp1c3QgdHJpY2tpbmcgVHlwZVNjcmlwdCA6KVxufVxuXG5mdW5jdGlvbiBpc0Zsb3coZm4pIHtcbiAgcmV0dXJuIChmbiA9PSBudWxsID8gdm9pZCAwIDogZm4uaXNNb2JYRmxvdykgPT09IHRydWU7XG59XG5cbmZ1bmN0aW9uIGludGVyY2VwdFJlYWRzKHRoaW5nLCBwcm9wT3JIYW5kbGVyLCBoYW5kbGVyKSB7XG4gIHZhciB0YXJnZXQ7XG4gIGlmIChpc09ic2VydmFibGVNYXAodGhpbmcpIHx8IGlzT2JzZXJ2YWJsZUFycmF5KHRoaW5nKSB8fCBpc09ic2VydmFibGVWYWx1ZSh0aGluZykpIHtcbiAgICB0YXJnZXQgPSBnZXRBZG1pbmlzdHJhdGlvbih0aGluZyk7XG4gIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KHRoaW5nKSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWlzU3RyaW5naXNoKHByb3BPckhhbmRsZXIpKSB7XG4gICAgICByZXR1cm4gZGllKFwiSW50ZXJjZXB0UmVhZHMgY2FuIG9ubHkgYmUgdXNlZCB3aXRoIGEgc3BlY2lmaWMgcHJvcGVydHksIG5vdCB3aXRoIGFuIG9iamVjdCBpbiBnZW5lcmFsXCIpO1xuICAgIH1cbiAgICB0YXJnZXQgPSBnZXRBZG1pbmlzdHJhdGlvbih0aGluZywgcHJvcE9ySGFuZGxlcik7XG4gIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgcmV0dXJuIGRpZShcIkV4cGVjdGVkIG9ic2VydmFibGUgbWFwLCBvYmplY3Qgb3IgYXJyYXkgYXMgZmlyc3QgYXJyYXlcIik7XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiB0YXJnZXQuZGVoYW5jZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBkaWUoXCJBbiBpbnRlcmNlcHQgcmVhZGVyIHdhcyBhbHJlYWR5IGVzdGFibGlzaGVkXCIpO1xuICB9XG4gIHRhcmdldC5kZWhhbmNlciA9IHR5cGVvZiBwcm9wT3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIgPyBwcm9wT3JIYW5kbGVyIDogaGFuZGxlcjtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB0YXJnZXQuZGVoYW5jZXIgPSB1bmRlZmluZWQ7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGludGVyY2VwdCh0aGluZywgcHJvcE9ySGFuZGxlciwgaGFuZGxlcikge1xuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHJldHVybiBpbnRlcmNlcHRQcm9wZXJ0eSh0aGluZywgcHJvcE9ySGFuZGxlciwgaGFuZGxlcik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGludGVyY2VwdEludGVyY2VwdGFibGUodGhpbmcsIHByb3BPckhhbmRsZXIpO1xuICB9XG59XG5mdW5jdGlvbiBpbnRlcmNlcHRJbnRlcmNlcHRhYmxlKHRoaW5nLCBoYW5kbGVyKSB7XG4gIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbih0aGluZykuaW50ZXJjZXB0XyhoYW5kbGVyKTtcbn1cbmZ1bmN0aW9uIGludGVyY2VwdFByb3BlcnR5KHRoaW5nLCBwcm9wZXJ0eSwgaGFuZGxlcikge1xuICByZXR1cm4gZ2V0QWRtaW5pc3RyYXRpb24odGhpbmcsIHByb3BlcnR5KS5pbnRlcmNlcHRfKGhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBfaXNDb21wdXRlZCh2YWx1ZSwgcHJvcGVydHkpIHtcbiAgaWYgKHByb3BlcnR5ID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gaXNDb21wdXRlZFZhbHVlKHZhbHVlKTtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KHZhbHVlKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCF2YWx1ZVskbW9ieF0udmFsdWVzXy5oYXMocHJvcGVydHkpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBhdG9tID0gZ2V0QXRvbSh2YWx1ZSwgcHJvcGVydHkpO1xuICByZXR1cm4gaXNDb21wdXRlZFZhbHVlKGF0b20pO1xufVxuZnVuY3Rpb24gaXNDb21wdXRlZCh2YWx1ZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIGRpZShcImlzQ29tcHV0ZWQgZXhwZWN0cyBvbmx5IDEgYXJndW1lbnQuIFVzZSBpc0NvbXB1dGVkUHJvcCB0byBpbnNwZWN0IHRoZSBvYnNlcnZhYmlsaXR5IG9mIGEgcHJvcGVydHlcIik7XG4gIH1cbiAgcmV0dXJuIF9pc0NvbXB1dGVkKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGlzQ29tcHV0ZWRQcm9wKHZhbHVlLCBwcm9wTmFtZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFpc1N0cmluZ2lzaChwcm9wTmFtZSkpIHtcbiAgICByZXR1cm4gZGllKFwiaXNDb21wdXRlZCBleHBlY3RlZCBhIHByb3BlcnR5IG5hbWUgYXMgc2Vjb25kIGFyZ3VtZW50XCIpO1xuICB9XG4gIHJldHVybiBfaXNDb21wdXRlZCh2YWx1ZSwgcHJvcE5hbWUpO1xufVxuXG5mdW5jdGlvbiBfaXNPYnNlcnZhYmxlKHZhbHVlLCBwcm9wZXJ0eSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAoaXNPYnNlcnZhYmxlTWFwKHZhbHVlKSB8fCBpc09ic2VydmFibGVBcnJheSh2YWx1ZSkpKSB7XG4gICAgICByZXR1cm4gZGllKFwiaXNPYnNlcnZhYmxlKG9iamVjdCwgcHJvcGVydHlOYW1lKSBpcyBub3Qgc3VwcG9ydGVkIGZvciBhcnJheXMgYW5kIG1hcHMuIFVzZSBtYXAuaGFzIG9yIGFycmF5Lmxlbmd0aCBpbnN0ZWFkLlwiKTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZVskbW9ieF0udmFsdWVzXy5oYXMocHJvcGVydHkpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gRm9yIGZpcnN0IGNoZWNrLCBzZWUgIzcwMVxuICByZXR1cm4gaXNPYnNlcnZhYmxlT2JqZWN0KHZhbHVlKSB8fCAhIXZhbHVlWyRtb2J4XSB8fCBpc0F0b20odmFsdWUpIHx8IGlzUmVhY3Rpb24odmFsdWUpIHx8IGlzQ29tcHV0ZWRWYWx1ZSh2YWx1ZSk7XG59XG5mdW5jdGlvbiBpc09ic2VydmFibGUodmFsdWUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBhcmd1bWVudHMubGVuZ3RoICE9PSAxKSB7XG4gICAgZGllKFwiaXNPYnNlcnZhYmxlIGV4cGVjdHMgb25seSAxIGFyZ3VtZW50LiBVc2UgaXNPYnNlcnZhYmxlUHJvcCB0byBpbnNwZWN0IHRoZSBvYnNlcnZhYmlsaXR5IG9mIGEgcHJvcGVydHlcIik7XG4gIH1cbiAgcmV0dXJuIF9pc09ic2VydmFibGUodmFsdWUpO1xufVxuZnVuY3Rpb24gaXNPYnNlcnZhYmxlUHJvcCh2YWx1ZSwgcHJvcE5hbWUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhaXNTdHJpbmdpc2gocHJvcE5hbWUpKSB7XG4gICAgcmV0dXJuIGRpZShcImV4cGVjdGVkIGEgcHJvcGVydHkgbmFtZSBhcyBzZWNvbmQgYXJndW1lbnRcIik7XG4gIH1cbiAgcmV0dXJuIF9pc09ic2VydmFibGUodmFsdWUsIHByb3BOYW1lKTtcbn1cblxuZnVuY3Rpb24ga2V5cyhvYmopIHtcbiAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdChvYmopKSB7XG4gICAgcmV0dXJuIG9ialskbW9ieF0ua2V5c18oKTtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlTWFwKG9iaikgfHwgaXNPYnNlcnZhYmxlU2V0KG9iaikpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShvYmoua2V5cygpKTtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmoubWFwKGZ1bmN0aW9uIChfLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH0pO1xuICB9XG4gIGRpZSg1KTtcbn1cbmZ1bmN0aW9uIHZhbHVlcyhvYmopIHtcbiAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdChvYmopKSB7XG4gICAgcmV0dXJuIGtleXMob2JqKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH0pO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVNYXAob2JqKSkge1xuICAgIHJldHVybiBrZXlzKG9iaikubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBvYmouZ2V0KGtleSk7XG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZVNldChvYmopKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ob2JqLnZhbHVlcygpKTtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmouc2xpY2UoKTtcbiAgfVxuICBkaWUoNik7XG59XG5mdW5jdGlvbiBlbnRyaWVzKG9iaikge1xuICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4ga2V5cyhvYmopLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gW2tleSwgb2JqW2tleV1dO1xuICAgIH0pO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVNYXAob2JqKSkge1xuICAgIHJldHVybiBrZXlzKG9iaikubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBba2V5LCBvYmouZ2V0KGtleSldO1xuICAgIH0pO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVTZXQob2JqKSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKG9iai5lbnRyaWVzKCkpO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iai5tYXAoZnVuY3Rpb24gKGtleSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBbaW5kZXgsIGtleV07XG4gICAgfSk7XG4gIH1cbiAgZGllKDcpO1xufVxuZnVuY3Rpb24gc2V0KG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiAhaXNPYnNlcnZhYmxlU2V0KG9iaikpIHtcbiAgICBzdGFydEJhdGNoKCk7XG4gICAgdmFyIF92YWx1ZXMgPSBrZXk7XG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9rZXkgaW4gX3ZhbHVlcykge1xuICAgICAgICBzZXQob2JqLCBfa2V5LCBfdmFsdWVzW19rZXldKTtcbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgZW5kQmF0Y2goKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVPYmplY3Qob2JqKSkge1xuICAgIG9ialskbW9ieF0uc2V0XyhrZXksIHZhbHVlKTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGVNYXAob2JqKSkge1xuICAgIG9iai5zZXQoa2V5LCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlU2V0KG9iaikpIHtcbiAgICBvYmouYWRkKGtleSk7XG4gIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlQXJyYXkob2JqKSkge1xuICAgIGlmICh0eXBlb2Yga2V5ICE9PSBcIm51bWJlclwiKSB7XG4gICAgICBrZXkgPSBwYXJzZUludChrZXksIDEwKTtcbiAgICB9XG4gICAgaWYgKGtleSA8IDApIHtcbiAgICAgIGRpZShcIkludmFsaWQgaW5kZXg6ICdcIiArIGtleSArIFwiJ1wiKTtcbiAgICB9XG4gICAgc3RhcnRCYXRjaCgpO1xuICAgIGlmIChrZXkgPj0gb2JqLmxlbmd0aCkge1xuICAgICAgb2JqLmxlbmd0aCA9IGtleSArIDE7XG4gICAgfVxuICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgZW5kQmF0Y2goKTtcbiAgfSBlbHNlIHtcbiAgICBkaWUoOCk7XG4gIH1cbn1cbmZ1bmN0aW9uIHJlbW92ZShvYmosIGtleSkge1xuICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KG9iaikpIHtcbiAgICBvYmpbJG1vYnhdLmRlbGV0ZV8oa2V5KTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGVNYXAob2JqKSkge1xuICAgIG9ialtcImRlbGV0ZVwiXShrZXkpO1xuICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZVNldChvYmopKSB7XG4gICAgb2JqW1wiZGVsZXRlXCJdKGtleSk7XG4gIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlQXJyYXkob2JqKSkge1xuICAgIGlmICh0eXBlb2Yga2V5ICE9PSBcIm51bWJlclwiKSB7XG4gICAgICBrZXkgPSBwYXJzZUludChrZXksIDEwKTtcbiAgICB9XG4gICAgb2JqLnNwbGljZShrZXksIDEpO1xuICB9IGVsc2Uge1xuICAgIGRpZSg5KTtcbiAgfVxufVxuZnVuY3Rpb24gaGFzKG9iaiwga2V5KSB7XG4gIGlmIChpc09ic2VydmFibGVPYmplY3Qob2JqKSkge1xuICAgIHJldHVybiBvYmpbJG1vYnhdLmhhc18oa2V5KTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGVNYXAob2JqKSkge1xuICAgIHJldHVybiBvYmouaGFzKGtleSk7XG4gIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlU2V0KG9iaikpIHtcbiAgICByZXR1cm4gb2JqLmhhcyhrZXkpO1xuICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZUFycmF5KG9iaikpIHtcbiAgICByZXR1cm4ga2V5ID49IDAgJiYga2V5IDwgb2JqLmxlbmd0aDtcbiAgfVxuICBkaWUoMTApO1xufVxuZnVuY3Rpb24gZ2V0KG9iaiwga2V5KSB7XG4gIGlmICghaGFzKG9iaiwga2V5KSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdChvYmopKSB7XG4gICAgcmV0dXJuIG9ialskbW9ieF0uZ2V0XyhrZXkpO1xuICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZU1hcChvYmopKSB7XG4gICAgcmV0dXJuIG9iai5nZXQoa2V5KTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGVBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIGRpZSgxMSk7XG59XG5mdW5jdGlvbiBhcGlEZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgZGVzY3JpcHRvcikge1xuICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4gb2JqWyRtb2J4XS5kZWZpbmVQcm9wZXJ0eV8oa2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxuICBkaWUoMzkpO1xufVxuZnVuY3Rpb24gYXBpT3duS2V5cyhvYmopIHtcbiAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdChvYmopKSB7XG4gICAgcmV0dXJuIG9ialskbW9ieF0ub3duS2V5c18oKTtcbiAgfVxuICBkaWUoMzgpO1xufVxuXG5mdW5jdGlvbiBvYnNlcnZlKHRoaW5nLCBwcm9wT3JDYiwgY2JPckZpcmUsIGZpcmVJbW1lZGlhdGVseSkge1xuICBpZiAoaXNGdW5jdGlvbihjYk9yRmlyZSkpIHtcbiAgICByZXR1cm4gb2JzZXJ2ZU9ic2VydmFibGVQcm9wZXJ0eSh0aGluZywgcHJvcE9yQ2IsIGNiT3JGaXJlLCBmaXJlSW1tZWRpYXRlbHkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYnNlcnZlT2JzZXJ2YWJsZSh0aGluZywgcHJvcE9yQ2IsIGNiT3JGaXJlKTtcbiAgfVxufVxuZnVuY3Rpb24gb2JzZXJ2ZU9ic2VydmFibGUodGhpbmcsIGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uKHRoaW5nKS5vYnNlcnZlXyhsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KTtcbn1cbmZ1bmN0aW9uIG9ic2VydmVPYnNlcnZhYmxlUHJvcGVydHkodGhpbmcsIHByb3BlcnR5LCBsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbih0aGluZywgcHJvcGVydHkpLm9ic2VydmVfKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpO1xufVxuXG5mdW5jdGlvbiBjYWNoZShtYXAsIGtleSwgdmFsdWUpIHtcbiAgbWFwLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gdG9KU0hlbHBlcihzb3VyY2UsIF9fYWxyZWFkeVNlZW4pIHtcbiAgaWYgKHNvdXJjZSA9PSBudWxsIHx8IHR5cGVvZiBzb3VyY2UgIT09IFwib2JqZWN0XCIgfHwgc291cmNlIGluc3RhbmNlb2YgRGF0ZSB8fCAhaXNPYnNlcnZhYmxlKHNvdXJjZSkpIHtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVWYWx1ZShzb3VyY2UpIHx8IGlzQ29tcHV0ZWRWYWx1ZShzb3VyY2UpKSB7XG4gICAgcmV0dXJuIHRvSlNIZWxwZXIoc291cmNlLmdldCgpLCBfX2FscmVhZHlTZWVuKTtcbiAgfVxuICBpZiAoX19hbHJlYWR5U2Vlbi5oYXMoc291cmNlKSkge1xuICAgIHJldHVybiBfX2FscmVhZHlTZWVuLmdldChzb3VyY2UpO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVBcnJheShzb3VyY2UpKSB7XG4gICAgdmFyIHJlcyA9IGNhY2hlKF9fYWxyZWFkeVNlZW4sIHNvdXJjZSwgbmV3IEFycmF5KHNvdXJjZS5sZW5ndGgpKTtcbiAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGlkeCkge1xuICAgICAgcmVzW2lkeF0gPSB0b0pTSGVscGVyKHZhbHVlLCBfX2FscmVhZHlTZWVuKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVTZXQoc291cmNlKSkge1xuICAgIHZhciBfcmVzID0gY2FjaGUoX19hbHJlYWR5U2Vlbiwgc291cmNlLCBuZXcgU2V0KCkpO1xuICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgX3Jlcy5hZGQodG9KU0hlbHBlcih2YWx1ZSwgX19hbHJlYWR5U2VlbikpO1xuICAgIH0pO1xuICAgIHJldHVybiBfcmVzO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVNYXAoc291cmNlKSkge1xuICAgIHZhciBfcmVzMiA9IGNhY2hlKF9fYWxyZWFkeVNlZW4sIHNvdXJjZSwgbmV3IE1hcCgpKTtcbiAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgX3JlczIuc2V0KGtleSwgdG9KU0hlbHBlcih2YWx1ZSwgX19hbHJlYWR5U2VlbikpO1xuICAgIH0pO1xuICAgIHJldHVybiBfcmVzMjtcbiAgfSBlbHNlIHtcbiAgICAvLyBtdXN0IGJlIG9ic2VydmFibGUgb2JqZWN0XG4gICAgdmFyIF9yZXMzID0gY2FjaGUoX19hbHJlYWR5U2Vlbiwgc291cmNlLCB7fSk7XG4gICAgYXBpT3duS2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKG9iamVjdFByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICBfcmVzM1trZXldID0gdG9KU0hlbHBlcihzb3VyY2Vba2V5XSwgX19hbHJlYWR5U2Vlbik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIF9yZXMzO1xuICB9XG59XG4vKipcbiAqIFJlY3Vyc2l2ZWx5IGNvbnZlcnRzIGFuIG9ic2VydmFibGUgdG8gaXQncyBub24tb2JzZXJ2YWJsZSBuYXRpdmUgY291bnRlcnBhcnQuXG4gKiBJdCBkb2VzIE5PVCByZWN1cnNlIGludG8gbm9uLW9ic2VydmFibGVzLCB0aGVzZSBhcmUgbGVmdCBhcyB0aGV5IGFyZSwgZXZlbiBpZiB0aGV5IGNvbnRhaW4gb2JzZXJ2YWJsZXMuXG4gKiBDb21wdXRlZCBhbmQgb3RoZXIgbm9uLWVudW1lcmFibGUgcHJvcGVydGllcyBhcmUgY29tcGxldGVseSBpZ25vcmVkLlxuICogQ29tcGxleCBzY2VuYXJpb3MgcmVxdWlyZSBjdXN0b20gc29sdXRpb24sIGVnIGltcGxlbWVudGluZyBgdG9KU09OYCBvciB1c2luZyBgc2VyaWFsaXpyYCBsaWIuXG4gKi9cbmZ1bmN0aW9uIHRvSlMoc291cmNlLCBvcHRpb25zKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgb3B0aW9ucykge1xuICAgIGRpZShcInRvSlMgbm8gbG9uZ2VyIHN1cHBvcnRzIG9wdGlvbnNcIik7XG4gIH1cbiAgcmV0dXJuIHRvSlNIZWxwZXIoc291cmNlLCBuZXcgTWFwKCkpO1xufVxuXG5mdW5jdGlvbiB0cmFjZSgpIHtcbiAgaWYgKCEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgZW50ZXJCcmVha1BvaW50ID0gZmFsc2U7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gIH1cbiAgaWYgKHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09IFwiYm9vbGVhblwiKSB7XG4gICAgZW50ZXJCcmVha1BvaW50ID0gYXJncy5wb3AoKTtcbiAgfVxuICB2YXIgZGVyaXZhdGlvbiA9IGdldEF0b21Gcm9tQXJncyhhcmdzKTtcbiAgaWYgKCFkZXJpdmF0aW9uKSB7XG4gICAgcmV0dXJuIGRpZShcIid0cmFjZShicmVhaz8pJyBjYW4gb25seSBiZSB1c2VkIGluc2lkZSBhIHRyYWNrZWQgY29tcHV0ZWQgdmFsdWUgb3IgYSBSZWFjdGlvbi4gQ29uc2lkZXIgcGFzc2luZyBpbiB0aGUgY29tcHV0ZWQgdmFsdWUgb3IgcmVhY3Rpb24gZXhwbGljaXRseVwiKTtcbiAgfVxuICBpZiAoZGVyaXZhdGlvbi5pc1RyYWNpbmdfID09PSBUcmFjZU1vZGUuTk9ORSkge1xuICAgIGNvbnNvbGUubG9nKFwiW21vYngudHJhY2VdICdcIiArIGRlcml2YXRpb24ubmFtZV8gKyBcIicgdHJhY2luZyBlbmFibGVkXCIpO1xuICB9XG4gIGRlcml2YXRpb24uaXNUcmFjaW5nXyA9IGVudGVyQnJlYWtQb2ludCA/IFRyYWNlTW9kZS5CUkVBSyA6IFRyYWNlTW9kZS5MT0c7XG59XG5mdW5jdGlvbiBnZXRBdG9tRnJvbUFyZ3MoYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbjtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gZ2V0QXRvbShhcmdzWzBdKTtcbiAgICBjYXNlIDI6XG4gICAgICByZXR1cm4gZ2V0QXRvbShhcmdzWzBdLCBhcmdzWzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIER1cmluZyBhIHRyYW5zYWN0aW9uIG5vIHZpZXdzIGFyZSB1cGRhdGVkIHVudGlsIHRoZSBlbmQgb2YgdGhlIHRyYW5zYWN0aW9uLlxuICogVGhlIHRyYW5zYWN0aW9uIHdpbGwgYmUgcnVuIHN5bmNocm9ub3VzbHkgbm9uZXRoZWxlc3MuXG4gKlxuICogQHBhcmFtIGFjdGlvbiBhIGZ1bmN0aW9uIHRoYXQgdXBkYXRlcyBzb21lIHJlYWN0aXZlIHN0YXRlXG4gKiBAcmV0dXJucyBhbnkgdmFsdWUgdGhhdCB3YXMgcmV0dXJuZWQgYnkgdGhlICdhY3Rpb24nIHBhcmFtZXRlci5cbiAqL1xuZnVuY3Rpb24gdHJhbnNhY3Rpb24oYWN0aW9uLCB0aGlzQXJnKSB7XG4gIGlmICh0aGlzQXJnID09PSB2b2lkIDApIHtcbiAgICB0aGlzQXJnID0gdW5kZWZpbmVkO1xuICB9XG4gIHN0YXJ0QmF0Y2goKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYWN0aW9uLmFwcGx5KHRoaXNBcmcpO1xuICB9IGZpbmFsbHkge1xuICAgIGVuZEJhdGNoKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gd2hlbihwcmVkaWNhdGUsIGFyZzEsIGFyZzIpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgfHwgYXJnMSAmJiB0eXBlb2YgYXJnMSA9PT0gXCJvYmplY3RcIikge1xuICAgIHJldHVybiB3aGVuUHJvbWlzZShwcmVkaWNhdGUsIGFyZzEpO1xuICB9XG4gIHJldHVybiBfd2hlbihwcmVkaWNhdGUsIGFyZzEsIGFyZzIgfHwge30pO1xufVxuZnVuY3Rpb24gX3doZW4ocHJlZGljYXRlLCBlZmZlY3QsIG9wdHMpIHtcbiAgdmFyIHRpbWVvdXRIYW5kbGU7XG4gIGlmICh0eXBlb2Ygb3B0cy50aW1lb3V0ID09PSBcIm51bWJlclwiKSB7XG4gICAgdmFyIGVycm9yID0gbmV3IEVycm9yKFwiV0hFTl9USU1FT1VUXCIpO1xuICAgIHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghZGlzcG9zZXJbJG1vYnhdLmlzRGlzcG9zZWRfKSB7XG4gICAgICAgIGRpc3Bvc2VyKCk7XG4gICAgICAgIGlmIChvcHRzLm9uRXJyb3IpIHtcbiAgICAgICAgICBvcHRzLm9uRXJyb3IoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgb3B0cy50aW1lb3V0KTtcbiAgfVxuICBvcHRzLm5hbWUgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBvcHRzLm5hbWUgfHwgXCJXaGVuQFwiICsgZ2V0TmV4dElkKCkgOiBcIldoZW5cIjtcbiAgdmFyIGVmZmVjdEFjdGlvbiA9IGNyZWF0ZUFjdGlvbihwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBvcHRzLm5hbWUgKyBcIi1lZmZlY3RcIiA6IFwiV2hlbi1lZmZlY3RcIiwgZWZmZWN0KTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIHZhciBkaXNwb3NlciA9IGF1dG9ydW4oZnVuY3Rpb24gKHIpIHtcbiAgICAvLyBwcmVkaWNhdGUgc2hvdWxkIG5vdCBjaGFuZ2Ugc3RhdGVcbiAgICB2YXIgY29uZCA9IGFsbG93U3RhdGVDaGFuZ2VzKGZhbHNlLCBwcmVkaWNhdGUpO1xuICAgIGlmIChjb25kKSB7XG4gICAgICByLmRpc3Bvc2UoKTtcbiAgICAgIGlmICh0aW1lb3V0SGFuZGxlKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SGFuZGxlKTtcbiAgICAgIH1cbiAgICAgIGVmZmVjdEFjdGlvbigpO1xuICAgIH1cbiAgfSwgb3B0cyk7XG4gIHJldHVybiBkaXNwb3Nlcjtcbn1cbmZ1bmN0aW9uIHdoZW5Qcm9taXNlKHByZWRpY2F0ZSwgb3B0cykge1xuICB2YXIgX29wdHMkc2lnbmFsO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG9wdHMgJiYgb3B0cy5vbkVycm9yKSB7XG4gICAgcmV0dXJuIGRpZShcInRoZSBvcHRpb25zICdvbkVycm9yJyBhbmQgJ3Byb21pc2UnIGNhbm5vdCBiZSBjb21iaW5lZFwiKTtcbiAgfVxuICBpZiAob3B0cyAhPSBudWxsICYmIChfb3B0cyRzaWduYWwgPSBvcHRzLnNpZ25hbCkgIT0gbnVsbCAmJiBfb3B0cyRzaWduYWwuYWJvcnRlZCkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIldIRU5fQUJPUlRFRFwiKSksIHtcbiAgICAgIGNhbmNlbDogZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICB2YXIgY2FuY2VsO1xuICB2YXIgYWJvcnQ7XG4gIHZhciByZXMgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIF9vcHRzJHNpZ25hbDI7XG4gICAgdmFyIGRpc3Bvc2VyID0gX3doZW4ocHJlZGljYXRlLCByZXNvbHZlLCBfZXh0ZW5kcyh7fSwgb3B0cywge1xuICAgICAgb25FcnJvcjogcmVqZWN0XG4gICAgfSkpO1xuICAgIGNhbmNlbCA9IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICAgIGRpc3Bvc2VyKCk7XG4gICAgICByZWplY3QobmV3IEVycm9yKFwiV0hFTl9DQU5DRUxMRURcIikpO1xuICAgIH07XG4gICAgYWJvcnQgPSBmdW5jdGlvbiBhYm9ydCgpIHtcbiAgICAgIGRpc3Bvc2VyKCk7XG4gICAgICByZWplY3QobmV3IEVycm9yKFwiV0hFTl9BQk9SVEVEXCIpKTtcbiAgICB9O1xuICAgIG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IChfb3B0cyRzaWduYWwyID0gb3B0cy5zaWduYWwpID09IG51bGwgPyB2b2lkIDAgOiBfb3B0cyRzaWduYWwyLmFkZEV2ZW50TGlzdGVuZXIgPT0gbnVsbCA/IHZvaWQgMCA6IF9vcHRzJHNpZ25hbDIuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGFib3J0KTtcbiAgfSlbXCJmaW5hbGx5XCJdKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX29wdHMkc2lnbmFsMztcbiAgICByZXR1cm4gb3B0cyA9PSBudWxsID8gdm9pZCAwIDogKF9vcHRzJHNpZ25hbDMgPSBvcHRzLnNpZ25hbCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9vcHRzJHNpZ25hbDMucmVtb3ZlRXZlbnRMaXN0ZW5lciA9PSBudWxsID8gdm9pZCAwIDogX29wdHMkc2lnbmFsMy5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgYWJvcnQpO1xuICB9KTtcbiAgcmVzLmNhbmNlbCA9IGNhbmNlbDtcbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gZ2V0QWRtKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0WyRtb2J4XTtcbn1cbi8vIE9wdGltaXphdGlvbjogd2UgZG9uJ3QgbmVlZCB0aGUgaW50ZXJtZWRpYXRlIG9iamVjdHMgYW5kIGNvdWxkIGhhdmUgYSBjb21wbGV0ZWx5IGN1c3RvbSBhZG1pbmlzdHJhdGlvbiBmb3IgRHluYW1pY09iamVjdHMsXG4vLyBhbmQgc2tpcCBlaXRoZXIgdGhlIGludGVybmFsIHZhbHVlcyBtYXAsIG9yIHRoZSBiYXNlIG9iamVjdCB3aXRoIGl0cyBwcm9wZXJ0eSBkZXNjcmlwdG9ycyFcbnZhciBvYmplY3RQcm94eVRyYXBzID0ge1xuICBoYXM6IGZ1bmN0aW9uIGhhcyh0YXJnZXQsIG5hbWUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbikge1xuICAgICAgd2FybkFib3V0UHJveHlSZXF1aXJlbWVudChcImRldGVjdCBuZXcgcHJvcGVydGllcyB1c2luZyB0aGUgJ2luJyBvcGVyYXRvci4gVXNlICdoYXMnIGZyb20gJ21vYngnIGluc3RlYWQuXCIpO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0QWRtKHRhcmdldCkuaGFzXyhuYW1lKTtcbiAgfSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQodGFyZ2V0LCBuYW1lKSB7XG4gICAgcmV0dXJuIGdldEFkbSh0YXJnZXQpLmdldF8obmFtZSk7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gc2V0KHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgX2dldEFkbSRzZXRfO1xuICAgIGlmICghaXNTdHJpbmdpc2gobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhZ2V0QWRtKHRhcmdldCkudmFsdWVzXy5oYXMobmFtZSkpIHtcbiAgICAgIHdhcm5BYm91dFByb3h5UmVxdWlyZW1lbnQoXCJhZGQgYSBuZXcgb2JzZXJ2YWJsZSBwcm9wZXJ0eSB0aHJvdWdoIGRpcmVjdCBhc3NpZ25tZW50LiBVc2UgJ3NldCcgZnJvbSAnbW9ieCcgaW5zdGVhZC5cIik7XG4gICAgfVxuICAgIC8vIG51bGwgKGludGVyY2VwdGVkKSAtPiB0cnVlIChzdWNjZXNzKVxuICAgIHJldHVybiAoX2dldEFkbSRzZXRfID0gZ2V0QWRtKHRhcmdldCkuc2V0XyhuYW1lLCB2YWx1ZSwgdHJ1ZSkpICE9IG51bGwgPyBfZ2V0QWRtJHNldF8gOiB0cnVlO1xuICB9LFxuICBkZWxldGVQcm9wZXJ0eTogZnVuY3Rpb24gZGVsZXRlUHJvcGVydHkodGFyZ2V0LCBuYW1lKSB7XG4gICAgdmFyIF9nZXRBZG0kZGVsZXRlXztcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICB3YXJuQWJvdXRQcm94eVJlcXVpcmVtZW50KFwiZGVsZXRlIHByb3BlcnRpZXMgZnJvbSBhbiBvYnNlcnZhYmxlIG9iamVjdC4gVXNlICdyZW1vdmUnIGZyb20gJ21vYngnIGluc3RlYWQuXCIpO1xuICAgIH1cbiAgICBpZiAoIWlzU3RyaW5naXNoKG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIG51bGwgKGludGVyY2VwdGVkKSAtPiB0cnVlIChzdWNjZXNzKVxuICAgIHJldHVybiAoX2dldEFkbSRkZWxldGVfID0gZ2V0QWRtKHRhcmdldCkuZGVsZXRlXyhuYW1lLCB0cnVlKSkgIT0gbnVsbCA/IF9nZXRBZG0kZGVsZXRlXyA6IHRydWU7XG4gIH0sXG4gIGRlZmluZVByb3BlcnR5OiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgICB2YXIgX2dldEFkbSRkZWZpbmVQcm9wZXJ0O1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIHdhcm5BYm91dFByb3h5UmVxdWlyZW1lbnQoXCJkZWZpbmUgcHJvcGVydHkgb24gYW4gb2JzZXJ2YWJsZSBvYmplY3QuIFVzZSAnZGVmaW5lUHJvcGVydHknIGZyb20gJ21vYngnIGluc3RlYWQuXCIpO1xuICAgIH1cbiAgICAvLyBudWxsIChpbnRlcmNlcHRlZCkgLT4gdHJ1ZSAoc3VjY2VzcylcbiAgICByZXR1cm4gKF9nZXRBZG0kZGVmaW5lUHJvcGVydCA9IGdldEFkbSh0YXJnZXQpLmRlZmluZVByb3BlcnR5XyhuYW1lLCBkZXNjcmlwdG9yKSkgIT0gbnVsbCA/IF9nZXRBZG0kZGVmaW5lUHJvcGVydCA6IHRydWU7XG4gIH0sXG4gIG93bktleXM6IGZ1bmN0aW9uIG93bktleXModGFyZ2V0KSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb24pIHtcbiAgICAgIHdhcm5BYm91dFByb3h5UmVxdWlyZW1lbnQoXCJpdGVyYXRlIGtleXMgdG8gZGV0ZWN0IGFkZGVkIC8gcmVtb3ZlZCBwcm9wZXJ0aWVzLiBVc2UgJ2tleXMnIGZyb20gJ21vYngnIGluc3RlYWQuXCIpO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0QWRtKHRhcmdldCkub3duS2V5c18oKTtcbiAgfSxcbiAgcHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKHRhcmdldCkge1xuICAgIGRpZSgxMyk7XG4gIH1cbn07XG5mdW5jdGlvbiBhc0R5bmFtaWNPYnNlcnZhYmxlT2JqZWN0KHRhcmdldCwgb3B0aW9ucykge1xuICB2YXIgX3RhcmdldCQkbW9ieCwgX3RhcmdldCQkbW9ieCRwcm94eV87XG4gIGFzc2VydFByb3hpZXMoKTtcbiAgdGFyZ2V0ID0gYXNPYnNlcnZhYmxlT2JqZWN0KHRhcmdldCwgb3B0aW9ucyk7XG4gIHJldHVybiAoX3RhcmdldCQkbW9ieCRwcm94eV8gPSAoX3RhcmdldCQkbW9ieCA9IHRhcmdldFskbW9ieF0pLnByb3h5XykgIT0gbnVsbCA/IF90YXJnZXQkJG1vYngkcHJveHlfIDogX3RhcmdldCQkbW9ieC5wcm94eV8gPSBuZXcgUHJveHkodGFyZ2V0LCBvYmplY3RQcm94eVRyYXBzKTtcbn1cblxuZnVuY3Rpb24gaGFzSW50ZXJjZXB0b3JzKGludGVyY2VwdGFibGUpIHtcbiAgcmV0dXJuIGludGVyY2VwdGFibGUuaW50ZXJjZXB0b3JzXyAhPT0gdW5kZWZpbmVkICYmIGludGVyY2VwdGFibGUuaW50ZXJjZXB0b3JzXy5sZW5ndGggPiAwO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJJbnRlcmNlcHRvcihpbnRlcmNlcHRhYmxlLCBoYW5kbGVyKSB7XG4gIHZhciBpbnRlcmNlcHRvcnMgPSBpbnRlcmNlcHRhYmxlLmludGVyY2VwdG9yc18gfHwgKGludGVyY2VwdGFibGUuaW50ZXJjZXB0b3JzXyA9IFtdKTtcbiAgaW50ZXJjZXB0b3JzLnB1c2goaGFuZGxlcik7XG4gIHJldHVybiBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaWR4ID0gaW50ZXJjZXB0b3JzLmluZGV4T2YoaGFuZGxlcik7XG4gICAgaWYgKGlkeCAhPT0gLTEpIHtcbiAgICAgIGludGVyY2VwdG9ycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gaW50ZXJjZXB0Q2hhbmdlKGludGVyY2VwdGFibGUsIGNoYW5nZSkge1xuICB2YXIgcHJldlUgPSB1bnRyYWNrZWRTdGFydCgpO1xuICB0cnkge1xuICAgIC8vIEludGVyY2VwdG9yIGNhbiBtb2RpZnkgdGhlIGFycmF5LCBjb3B5IGl0IHRvIGF2b2lkIGNvbmN1cnJlbnQgbW9kaWZpY2F0aW9uLCBzZWUgIzE5NTBcbiAgICB2YXIgaW50ZXJjZXB0b3JzID0gW10uY29uY2F0KGludGVyY2VwdGFibGUuaW50ZXJjZXB0b3JzXyB8fCBbXSk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBpbnRlcmNlcHRvcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjaGFuZ2UgPSBpbnRlcmNlcHRvcnNbaV0oY2hhbmdlKTtcbiAgICAgIGlmIChjaGFuZ2UgJiYgIWNoYW5nZS50eXBlKSB7XG4gICAgICAgIGRpZSgxNCk7XG4gICAgICB9XG4gICAgICBpZiAoIWNoYW5nZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNoYW5nZTtcbiAgfSBmaW5hbGx5IHtcbiAgICB1bnRyYWNrZWRFbmQocHJldlUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhhc0xpc3RlbmVycyhsaXN0ZW5hYmxlKSB7XG4gIHJldHVybiBsaXN0ZW5hYmxlLmNoYW5nZUxpc3RlbmVyc18gIT09IHVuZGVmaW5lZCAmJiBsaXN0ZW5hYmxlLmNoYW5nZUxpc3RlbmVyc18ubGVuZ3RoID4gMDtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyTGlzdGVuZXIobGlzdGVuYWJsZSwgaGFuZGxlcikge1xuICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuYWJsZS5jaGFuZ2VMaXN0ZW5lcnNfIHx8IChsaXN0ZW5hYmxlLmNoYW5nZUxpc3RlbmVyc18gPSBbXSk7XG4gIGxpc3RlbmVycy5wdXNoKGhhbmRsZXIpO1xuICByZXR1cm4gb25jZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlkeCA9IGxpc3RlbmVycy5pbmRleE9mKGhhbmRsZXIpO1xuICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICBsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIG5vdGlmeUxpc3RlbmVycyhsaXN0ZW5hYmxlLCBjaGFuZ2UpIHtcbiAgdmFyIHByZXZVID0gdW50cmFja2VkU3RhcnQoKTtcbiAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmFibGUuY2hhbmdlTGlzdGVuZXJzXztcbiAgaWYgKCFsaXN0ZW5lcnMpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLnNsaWNlKCk7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGxpc3RlbmVyc1tpXShjaGFuZ2UpO1xuICB9XG4gIHVudHJhY2tlZEVuZChwcmV2VSk7XG59XG5cbmZ1bmN0aW9uIG1ha2VPYnNlcnZhYmxlKHRhcmdldCwgYW5ub3RhdGlvbnMsIG9wdGlvbnMpIHtcbiAgaW5pdE9ic2VydmFibGUoZnVuY3Rpb24gKCkge1xuICAgIHZhciBfYW5ub3RhdGlvbnM7XG4gICAgdmFyIGFkbSA9IGFzT2JzZXJ2YWJsZU9iamVjdCh0YXJnZXQsIG9wdGlvbnMpWyRtb2J4XTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGFubm90YXRpb25zICYmIHRhcmdldFtzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbF0pIHtcbiAgICAgIGRpZShcIm1ha2VPYnNlcnZhYmxlIHNlY29uZCBhcmcgbXVzdCBiZSBudWxsaXNoIHdoZW4gdXNpbmcgZGVjb3JhdG9ycy4gTWl4aW5nIEBkZWNvcmF0b3Igc3ludGF4IHdpdGggYW5ub3RhdGlvbnMgaXMgbm90IHN1cHBvcnRlZC5cIik7XG4gICAgfVxuICAgIC8vIERlZmF1bHQgdG8gZGVjb3JhdG9yc1xuICAgIChfYW5ub3RhdGlvbnMgPSBhbm5vdGF0aW9ucykgIT0gbnVsbCA/IF9hbm5vdGF0aW9ucyA6IGFubm90YXRpb25zID0gY29sbGVjdFN0b3JlZEFubm90YXRpb25zKHRhcmdldCk7XG4gICAgLy8gQW5ub3RhdGVcbiAgICBvd25LZXlzKGFubm90YXRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBhZG0ubWFrZV8oa2V5LCBhbm5vdGF0aW9uc1trZXldKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG4vLyBwcm90b1trZXlzU3ltYm9sXSA9IG5ldyBTZXQ8UHJvcGVydHlLZXk+KClcbnZhciBrZXlzU3ltYm9sID0gLyojX19QVVJFX18qL1N5bWJvbChcIm1vYngta2V5c1wiKTtcbmZ1bmN0aW9uIG1ha2VBdXRvT2JzZXJ2YWJsZSh0YXJnZXQsIG92ZXJyaWRlcywgb3B0aW9ucykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KHRhcmdldCkgJiYgIWlzUGxhaW5PYmplY3QoT2JqZWN0LmdldFByb3RvdHlwZU9mKHRhcmdldCkpKSB7XG4gICAgICBkaWUoXCInbWFrZUF1dG9PYnNlcnZhYmxlJyBjYW4gb25seSBiZSB1c2VkIGZvciBjbGFzc2VzIHRoYXQgZG9uJ3QgaGF2ZSBhIHN1cGVyY2xhc3NcIik7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVPYmplY3QodGFyZ2V0KSkge1xuICAgICAgZGllKFwibWFrZUF1dG9PYnNlcnZhYmxlIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JqZWN0cyBub3QgYWxyZWFkeSBtYWRlIG9ic2VydmFibGVcIik7XG4gICAgfVxuICB9XG4gIC8vIE9wdGltaXphdGlvbjogYXZvaWQgdmlzaXRpbmcgcHJvdG9zXG4gIC8vIEFzc3VtZXMgdGhhdCBhbm5vdGF0aW9uLm1ha2VfLy5leHRlbmRfIHdvcmtzIHRoZSBzYW1lIGZvciBwbGFpbiBvYmplY3RzXG4gIGlmIChpc1BsYWluT2JqZWN0KHRhcmdldCkpIHtcbiAgICByZXR1cm4gZXh0ZW5kT2JzZXJ2YWJsZSh0YXJnZXQsIHRhcmdldCwgb3ZlcnJpZGVzLCBvcHRpb25zKTtcbiAgfVxuICBpbml0T2JzZXJ2YWJsZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFkbSA9IGFzT2JzZXJ2YWJsZU9iamVjdCh0YXJnZXQsIG9wdGlvbnMpWyRtb2J4XTtcbiAgICAvLyBPcHRpbWl6YXRpb246IGNhY2hlIGtleXMgb24gcHJvdG9cbiAgICAvLyBBc3N1bWVzIG1ha2VBdXRvT2JzZXJ2YWJsZSBjYW4gYmUgY2FsbGVkIG9ubHkgb25jZSBwZXIgb2JqZWN0IGFuZCBjYW4ndCBiZSB1c2VkIGluIHN1YmNsYXNzXG4gICAgaWYgKCF0YXJnZXRba2V5c1N5bWJvbF0pIHtcbiAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpO1xuICAgICAgdmFyIGtleXMgPSBuZXcgU2V0KFtdLmNvbmNhdChvd25LZXlzKHRhcmdldCksIG93bktleXMocHJvdG8pKSk7XG4gICAgICBrZXlzW1wiZGVsZXRlXCJdKFwiY29uc3RydWN0b3JcIik7XG4gICAgICBrZXlzW1wiZGVsZXRlXCJdKCRtb2J4KTtcbiAgICAgIGFkZEhpZGRlblByb3AocHJvdG8sIGtleXNTeW1ib2wsIGtleXMpO1xuICAgIH1cbiAgICB0YXJnZXRba2V5c1N5bWJvbF0uZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gYWRtLm1ha2VfKGtleSxcbiAgICAgIC8vIG11c3QgcGFzcyBcInVuZGVmaW5lZFwiIGZvciB7IGtleTogdW5kZWZpbmVkIH1cbiAgICAgICFvdmVycmlkZXMgPyB0cnVlIDoga2V5IGluIG92ZXJyaWRlcyA/IG92ZXJyaWRlc1trZXldIDogdHJ1ZSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuXG52YXIgU1BMSUNFID0gXCJzcGxpY2VcIjtcbnZhciBVUERBVEUgPSBcInVwZGF0ZVwiO1xudmFyIE1BWF9TUExJQ0VfU0laRSA9IDEwMDAwOyAvLyBTZWUgZS5nLiBodHRwczovL2dpdGh1Yi5jb20vbW9ieGpzL21vYngvaXNzdWVzLzg1OVxudmFyIGFycmF5VHJhcHMgPSB7XG4gIGdldDogZnVuY3Rpb24gZ2V0KHRhcmdldCwgbmFtZSkge1xuICAgIHZhciBhZG0gPSB0YXJnZXRbJG1vYnhdO1xuICAgIGlmIChuYW1lID09PSAkbW9ieCkge1xuICAgICAgcmV0dXJuIGFkbTtcbiAgICB9XG4gICAgaWYgKG5hbWUgPT09IFwibGVuZ3RoXCIpIHtcbiAgICAgIHJldHVybiBhZG0uZ2V0QXJyYXlMZW5ndGhfKCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIiAmJiAhaXNOYU4obmFtZSkpIHtcbiAgICAgIHJldHVybiBhZG0uZ2V0XyhwYXJzZUludChuYW1lKSk7XG4gICAgfVxuICAgIGlmIChoYXNQcm9wKGFycmF5RXh0ZW5zaW9ucywgbmFtZSkpIHtcbiAgICAgIHJldHVybiBhcnJheUV4dGVuc2lvbnNbbmFtZV07XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXRbbmFtZV07XG4gIH0sXG4gIHNldDogZnVuY3Rpb24gc2V0KHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgYWRtID0gdGFyZ2V0WyRtb2J4XTtcbiAgICBpZiAobmFtZSA9PT0gXCJsZW5ndGhcIikge1xuICAgICAgYWRtLnNldEFycmF5TGVuZ3RoXyh2YWx1ZSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzeW1ib2xcIiB8fCBpc05hTihuYW1lKSkge1xuICAgICAgdGFyZ2V0W25hbWVdID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG51bWVyaWMgc3RyaW5nXG4gICAgICBhZG0uc2V0XyhwYXJzZUludChuYW1lKSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgcHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uIHByZXZlbnRFeHRlbnNpb25zKCkge1xuICAgIGRpZSgxNSk7XG4gIH1cbn07XG52YXIgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvLyB0aGlzIGlzIHRoZSBwcm9wIHRoYXQgZ2V0cyBwcm94aWVkLCBzbyBjYW4ndCByZXBsYWNlIGl0IVxuXG4gIGZ1bmN0aW9uIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uKG5hbWUsIGVuaGFuY2VyLCBvd25lZF8sIGxlZ2FjeU1vZGVfKSB7XG4gICAgaWYgKG5hbWUgPT09IHZvaWQgMCkge1xuICAgICAgbmFtZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiT2JzZXJ2YWJsZUFycmF5QFwiICsgZ2V0TmV4dElkKCkgOiBcIk9ic2VydmFibGVBcnJheVwiO1xuICAgIH1cbiAgICB0aGlzLm93bmVkXyA9IHZvaWQgMDtcbiAgICB0aGlzLmxlZ2FjeU1vZGVfID0gdm9pZCAwO1xuICAgIHRoaXMuYXRvbV8gPSB2b2lkIDA7XG4gICAgdGhpcy52YWx1ZXNfID0gW107XG4gICAgdGhpcy5pbnRlcmNlcHRvcnNfID0gdm9pZCAwO1xuICAgIHRoaXMuY2hhbmdlTGlzdGVuZXJzXyA9IHZvaWQgMDtcbiAgICB0aGlzLmVuaGFuY2VyXyA9IHZvaWQgMDtcbiAgICB0aGlzLmRlaGFuY2VyID0gdm9pZCAwO1xuICAgIHRoaXMucHJveHlfID0gdm9pZCAwO1xuICAgIHRoaXMubGFzdEtub3duTGVuZ3RoXyA9IDA7XG4gICAgdGhpcy5vd25lZF8gPSBvd25lZF87XG4gICAgdGhpcy5sZWdhY3lNb2RlXyA9IGxlZ2FjeU1vZGVfO1xuICAgIHRoaXMuYXRvbV8gPSBuZXcgQXRvbShuYW1lKTtcbiAgICB0aGlzLmVuaGFuY2VyXyA9IGZ1bmN0aW9uIChuZXdWLCBvbGRWKSB7XG4gICAgICByZXR1cm4gZW5oYW5jZXIobmV3Viwgb2xkViwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gbmFtZSArIFwiWy4uXVwiIDogXCJPYnNlcnZhYmxlQXJyYXlbLi5dXCIpO1xuICAgIH07XG4gIH1cbiAgdmFyIF9wcm90byA9IE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZTtcbiAgX3Byb3RvLmRlaGFuY2VWYWx1ZV8gPSBmdW5jdGlvbiBkZWhhbmNlVmFsdWVfKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuZGVoYW5jZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVoYW5jZXIodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG4gIF9wcm90by5kZWhhbmNlVmFsdWVzXyA9IGZ1bmN0aW9uIGRlaGFuY2VWYWx1ZXNfKHZhbHVlcykge1xuICAgIGlmICh0aGlzLmRlaGFuY2VyICE9PSB1bmRlZmluZWQgJiYgdmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB2YWx1ZXMubWFwKHRoaXMuZGVoYW5jZXIpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuICBfcHJvdG8uaW50ZXJjZXB0XyA9IGZ1bmN0aW9uIGludGVyY2VwdF8oaGFuZGxlcikge1xuICAgIHJldHVybiByZWdpc3RlckludGVyY2VwdG9yKHRoaXMsIGhhbmRsZXIpO1xuICB9O1xuICBfcHJvdG8ub2JzZXJ2ZV8gPSBmdW5jdGlvbiBvYnNlcnZlXyhsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgaWYgKGZpcmVJbW1lZGlhdGVseSA9PT0gdm9pZCAwKSB7XG4gICAgICBmaXJlSW1tZWRpYXRlbHkgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgbGlzdGVuZXIoe1xuICAgICAgICBvYnNlcnZhYmxlS2luZDogXCJhcnJheVwiLFxuICAgICAgICBvYmplY3Q6IHRoaXMucHJveHlfLFxuICAgICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMuYXRvbV8ubmFtZV8sXG4gICAgICAgIHR5cGU6IFwic3BsaWNlXCIsXG4gICAgICAgIGluZGV4OiAwLFxuICAgICAgICBhZGRlZDogdGhpcy52YWx1ZXNfLnNsaWNlKCksXG4gICAgICAgIGFkZGVkQ291bnQ6IHRoaXMudmFsdWVzXy5sZW5ndGgsXG4gICAgICAgIHJlbW92ZWQ6IFtdLFxuICAgICAgICByZW1vdmVkQ291bnQ6IDBcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJMaXN0ZW5lcih0aGlzLCBsaXN0ZW5lcik7XG4gIH07XG4gIF9wcm90by5nZXRBcnJheUxlbmd0aF8gPSBmdW5jdGlvbiBnZXRBcnJheUxlbmd0aF8oKSB7XG4gICAgdGhpcy5hdG9tXy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgIHJldHVybiB0aGlzLnZhbHVlc18ubGVuZ3RoO1xuICB9O1xuICBfcHJvdG8uc2V0QXJyYXlMZW5ndGhfID0gZnVuY3Rpb24gc2V0QXJyYXlMZW5ndGhfKG5ld0xlbmd0aCkge1xuICAgIGlmICh0eXBlb2YgbmV3TGVuZ3RoICE9PSBcIm51bWJlclwiIHx8IGlzTmFOKG5ld0xlbmd0aCkgfHwgbmV3TGVuZ3RoIDwgMCkge1xuICAgICAgZGllKFwiT3V0IG9mIHJhbmdlOiBcIiArIG5ld0xlbmd0aCk7XG4gICAgfVxuICAgIHZhciBjdXJyZW50TGVuZ3RoID0gdGhpcy52YWx1ZXNfLmxlbmd0aDtcbiAgICBpZiAobmV3TGVuZ3RoID09PSBjdXJyZW50TGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChuZXdMZW5ndGggPiBjdXJyZW50TGVuZ3RoKSB7XG4gICAgICB2YXIgbmV3SXRlbXMgPSBuZXcgQXJyYXkobmV3TGVuZ3RoIC0gY3VycmVudExlbmd0aCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld0xlbmd0aCAtIGN1cnJlbnRMZW5ndGg7IGkrKykge1xuICAgICAgICBuZXdJdGVtc1tpXSA9IHVuZGVmaW5lZDtcbiAgICAgIH0gLy8gTm8gQXJyYXkuZmlsbCBldmVyeXdoZXJlLi4uXG4gICAgICB0aGlzLnNwbGljZVdpdGhBcnJheV8oY3VycmVudExlbmd0aCwgMCwgbmV3SXRlbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNwbGljZVdpdGhBcnJheV8obmV3TGVuZ3RoLCBjdXJyZW50TGVuZ3RoIC0gbmV3TGVuZ3RoKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by51cGRhdGVBcnJheUxlbmd0aF8gPSBmdW5jdGlvbiB1cGRhdGVBcnJheUxlbmd0aF8ob2xkTGVuZ3RoLCBkZWx0YSkge1xuICAgIGlmIChvbGRMZW5ndGggIT09IHRoaXMubGFzdEtub3duTGVuZ3RoXykge1xuICAgICAgZGllKDE2KTtcbiAgICB9XG4gICAgdGhpcy5sYXN0S25vd25MZW5ndGhfICs9IGRlbHRhO1xuICAgIGlmICh0aGlzLmxlZ2FjeU1vZGVfICYmIGRlbHRhID4gMCkge1xuICAgICAgcmVzZXJ2ZUFycmF5QnVmZmVyKG9sZExlbmd0aCArIGRlbHRhICsgMSk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uc3BsaWNlV2l0aEFycmF5XyA9IGZ1bmN0aW9uIHNwbGljZVdpdGhBcnJheV8oaW5kZXgsIGRlbGV0ZUNvdW50LCBuZXdJdGVtcykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQodGhpcy5hdG9tXyk7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMudmFsdWVzXy5sZW5ndGg7XG4gICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGluZGV4ID0gMDtcbiAgICB9IGVsc2UgaWYgKGluZGV4ID4gbGVuZ3RoKSB7XG4gICAgICBpbmRleCA9IGxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKGluZGV4IDwgMCkge1xuICAgICAgaW5kZXggPSBNYXRoLm1heCgwLCBsZW5ndGggKyBpbmRleCk7XG4gICAgfVxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBkZWxldGVDb3VudCA9IGxlbmd0aCAtIGluZGV4O1xuICAgIH0gZWxzZSBpZiAoZGVsZXRlQ291bnQgPT09IHVuZGVmaW5lZCB8fCBkZWxldGVDb3VudCA9PT0gbnVsbCkge1xuICAgICAgZGVsZXRlQ291bnQgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGVDb3VudCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGRlbGV0ZUNvdW50LCBsZW5ndGggLSBpbmRleCkpO1xuICAgIH1cbiAgICBpZiAobmV3SXRlbXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbmV3SXRlbXMgPSBFTVBUWV9BUlJBWTtcbiAgICB9XG4gICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgIG9iamVjdDogdGhpcy5wcm94eV8sXG4gICAgICAgIHR5cGU6IFNQTElDRSxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICByZW1vdmVkQ291bnQ6IGRlbGV0ZUNvdW50LFxuICAgICAgICBhZGRlZDogbmV3SXRlbXNcbiAgICAgIH0pO1xuICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIEVNUFRZX0FSUkFZO1xuICAgICAgfVxuICAgICAgZGVsZXRlQ291bnQgPSBjaGFuZ2UucmVtb3ZlZENvdW50O1xuICAgICAgbmV3SXRlbXMgPSBjaGFuZ2UuYWRkZWQ7XG4gICAgfVxuICAgIG5ld0l0ZW1zID0gbmV3SXRlbXMubGVuZ3RoID09PSAwID8gbmV3SXRlbXMgOiBuZXdJdGVtcy5tYXAoZnVuY3Rpb24gKHYpIHtcbiAgICAgIHJldHVybiBfdGhpcy5lbmhhbmNlcl8odiwgdW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5sZWdhY3lNb2RlXyB8fCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIHZhciBsZW5ndGhEZWx0YSA9IG5ld0l0ZW1zLmxlbmd0aCAtIGRlbGV0ZUNvdW50O1xuICAgICAgdGhpcy51cGRhdGVBcnJheUxlbmd0aF8obGVuZ3RoLCBsZW5ndGhEZWx0YSk7IC8vIGNoZWNrcyBpZiBpbnRlcm5hbCBhcnJheSB3YXNuJ3QgbW9kaWZpZWRcbiAgICB9XG5cbiAgICB2YXIgcmVzID0gdGhpcy5zcGxpY2VJdGVtc0ludG9WYWx1ZXNfKGluZGV4LCBkZWxldGVDb3VudCwgbmV3SXRlbXMpO1xuICAgIGlmIChkZWxldGVDb3VudCAhPT0gMCB8fCBuZXdJdGVtcy5sZW5ndGggIT09IDApIHtcbiAgICAgIHRoaXMubm90aWZ5QXJyYXlTcGxpY2VfKGluZGV4LCBuZXdJdGVtcywgcmVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGVoYW5jZVZhbHVlc18ocmVzKTtcbiAgfTtcbiAgX3Byb3RvLnNwbGljZUl0ZW1zSW50b1ZhbHVlc18gPSBmdW5jdGlvbiBzcGxpY2VJdGVtc0ludG9WYWx1ZXNfKGluZGV4LCBkZWxldGVDb3VudCwgbmV3SXRlbXMpIHtcbiAgICBpZiAobmV3SXRlbXMubGVuZ3RoIDwgTUFYX1NQTElDRV9TSVpFKSB7XG4gICAgICB2YXIgX3RoaXMkdmFsdWVzXztcbiAgICAgIHJldHVybiAoX3RoaXMkdmFsdWVzXyA9IHRoaXMudmFsdWVzXykuc3BsaWNlLmFwcGx5KF90aGlzJHZhbHVlc18sIFtpbmRleCwgZGVsZXRlQ291bnRdLmNvbmNhdChuZXdJdGVtcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUaGUgaXRlbXMgcmVtb3ZlZCBieSB0aGUgc3BsaWNlXG4gICAgICB2YXIgcmVzID0gdGhpcy52YWx1ZXNfLnNsaWNlKGluZGV4LCBpbmRleCArIGRlbGV0ZUNvdW50KTtcbiAgICAgIC8vIFRoZSBpdGVtcyB0aGF0IHRoYXQgc2hvdWxkIHJlbWFpbiBhdCB0aGUgZW5kIG9mIHRoZSBhcnJheVxuICAgICAgdmFyIG9sZEl0ZW1zID0gdGhpcy52YWx1ZXNfLnNsaWNlKGluZGV4ICsgZGVsZXRlQ291bnQpO1xuICAgICAgLy8gTmV3IGxlbmd0aCBpcyB0aGUgcHJldmlvdXMgbGVuZ3RoICsgYWRkaXRpb24gY291bnQgLSBkZWxldGlvbiBjb3VudFxuICAgICAgdGhpcy52YWx1ZXNfLmxlbmd0aCArPSBuZXdJdGVtcy5sZW5ndGggLSBkZWxldGVDb3VudDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3SXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy52YWx1ZXNfW2luZGV4ICsgaV0gPSBuZXdJdGVtc1tpXTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBvbGRJdGVtcy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdGhpcy52YWx1ZXNfW2luZGV4ICsgbmV3SXRlbXMubGVuZ3RoICsgX2ldID0gb2xkSXRlbXNbX2ldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gIH07XG4gIF9wcm90by5ub3RpZnlBcnJheUNoaWxkVXBkYXRlXyA9IGZ1bmN0aW9uIG5vdGlmeUFycmF5Q2hpbGRVcGRhdGVfKGluZGV4LCBuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICB2YXIgbm90aWZ5U3B5ID0gIXRoaXMub3duZWRfICYmIGlzU3B5RW5hYmxlZCgpO1xuICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnModGhpcyk7XG4gICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHkgPyB7XG4gICAgICBvYnNlcnZhYmxlS2luZDogXCJhcnJheVwiLFxuICAgICAgb2JqZWN0OiB0aGlzLnByb3h5XyxcbiAgICAgIHR5cGU6IFVQREFURSxcbiAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5hdG9tXy5uYW1lXyxcbiAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZVxuICAgIH0gOiBudWxsO1xuICAgIC8vIFRoZSByZWFzb24gd2h5IHRoaXMgaXMgb24gcmlnaHQgaGFuZCBzaWRlIGhlcmUgKGFuZCBub3QgYWJvdmUpLCBpcyB0aGlzIHdheSB0aGUgdWdsaWZpZXIgd2lsbCBkcm9wIGl0LCBidXQgaXQgd29uJ3RcbiAgICAvLyBjYXVzZSBhbnkgcnVudGltZSBvdmVyaGVhZCBpbiBkZXZlbG9wbWVudCBtb2RlIHdpdGhvdXQgTk9ERV9FTlYgc2V0LCB1bmxlc3Mgc3B5aW5nIGlzIGVuYWJsZWRcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgc3B5UmVwb3J0U3RhcnQoY2hhbmdlKTtcbiAgICB9XG4gICAgdGhpcy5hdG9tXy5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgaWYgKG5vdGlmeSkge1xuICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIGNoYW5nZSk7XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5ub3RpZnlBcnJheVNwbGljZV8gPSBmdW5jdGlvbiBub3RpZnlBcnJheVNwbGljZV8oaW5kZXgsIGFkZGVkLCByZW1vdmVkKSB7XG4gICAgdmFyIG5vdGlmeVNweSA9ICF0aGlzLm93bmVkXyAmJiBpc1NweUVuYWJsZWQoKTtcbiAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKHRoaXMpO1xuICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5ID8ge1xuICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwiYXJyYXlcIixcbiAgICAgIG9iamVjdDogdGhpcy5wcm94eV8sXG4gICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMuYXRvbV8ubmFtZV8sXG4gICAgICB0eXBlOiBTUExJQ0UsXG4gICAgICBpbmRleDogaW5kZXgsXG4gICAgICByZW1vdmVkOiByZW1vdmVkLFxuICAgICAgYWRkZWQ6IGFkZGVkLFxuICAgICAgcmVtb3ZlZENvdW50OiByZW1vdmVkLmxlbmd0aCxcbiAgICAgIGFkZGVkQ291bnQ6IGFkZGVkLmxlbmd0aFxuICAgIH0gOiBudWxsO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICBzcHlSZXBvcnRTdGFydChjaGFuZ2UpO1xuICAgIH1cbiAgICB0aGlzLmF0b21fLnJlcG9ydENoYW5nZWQoKTtcbiAgICAvLyBjb25mb3JtOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9vYnNlcnZlXG4gICAgaWYgKG5vdGlmeSkge1xuICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIGNoYW5nZSk7XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5nZXRfID0gZnVuY3Rpb24gZ2V0XyhpbmRleCkge1xuICAgIGlmICh0aGlzLmxlZ2FjeU1vZGVfICYmIGluZGV4ID49IHRoaXMudmFsdWVzXy5sZW5ndGgpIHtcbiAgICAgIGNvbnNvbGUud2Fybihwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcIlttb2J4LmFycmF5XSBBdHRlbXB0IHRvIHJlYWQgYW4gYXJyYXkgaW5kZXggKFwiICsgaW5kZXggKyBcIikgdGhhdCBpcyBvdXQgb2YgYm91bmRzIChcIiArIHRoaXMudmFsdWVzXy5sZW5ndGggKyBcIikuIFBsZWFzZSBjaGVjayBsZW5ndGggZmlyc3QuIE91dCBvZiBib3VuZCBpbmRpY2VzIHdpbGwgbm90IGJlIHRyYWNrZWQgYnkgTW9iWFwiIDogXCJbbW9ieF0gT3V0IG9mIGJvdW5kcyByZWFkOiBcIiArIGluZGV4KTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHRoaXMuYXRvbV8ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICByZXR1cm4gdGhpcy5kZWhhbmNlVmFsdWVfKHRoaXMudmFsdWVzX1tpbmRleF0pO1xuICB9O1xuICBfcHJvdG8uc2V0XyA9IGZ1bmN0aW9uIHNldF8oaW5kZXgsIG5ld1ZhbHVlKSB7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMudmFsdWVzXztcbiAgICBpZiAodGhpcy5sZWdhY3lNb2RlXyAmJiBpbmRleCA+IHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgIC8vIG91dCBvZiBib3VuZHNcbiAgICAgIGRpZSgxNywgaW5kZXgsIHZhbHVlcy5sZW5ndGgpO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPCB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAvLyB1cGRhdGUgYXQgaW5kZXggaW4gcmFuZ2VcbiAgICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkKHRoaXMuYXRvbV8pO1xuICAgICAgdmFyIG9sZFZhbHVlID0gdmFsdWVzW2luZGV4XTtcbiAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnModGhpcykpIHtcbiAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgICAgdHlwZTogVVBEQVRFLFxuICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eV8sXG4gICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbmV3VmFsdWUgPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICB9XG4gICAgICBuZXdWYWx1ZSA9IHRoaXMuZW5oYW5jZXJfKG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICB2YXIgY2hhbmdlZCA9IG5ld1ZhbHVlICE9PSBvbGRWYWx1ZTtcbiAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgIHZhbHVlc1tpbmRleF0gPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy5ub3RpZnlBcnJheUNoaWxkVXBkYXRlXyhpbmRleCwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRm9yIG91dCBvZiBib3VuZCBpbmRleCwgd2UgZG9uJ3QgY3JlYXRlIGFuIGFjdHVhbCBzcGFyc2UgYXJyYXksXG4gICAgICAvLyBidXQgcmF0aGVyIGZpbGwgdGhlIGhvbGVzIHdpdGggdW5kZWZpbmVkIChzYW1lIGFzIHNldEFycmF5TGVuZ3RoXykuXG4gICAgICAvLyBUaGlzIGNvdWxkIGJlIGNvbnNpZGVyZWQgYSBidWcuXG4gICAgICB2YXIgbmV3SXRlbXMgPSBuZXcgQXJyYXkoaW5kZXggKyAxIC0gdmFsdWVzLmxlbmd0aCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICBuZXdJdGVtc1tpXSA9IHVuZGVmaW5lZDtcbiAgICAgIH0gLy8gTm8gQXJyYXkuZmlsbCBldmVyeXdoZXJlLi4uXG4gICAgICBuZXdJdGVtc1tuZXdJdGVtcy5sZW5ndGggLSAxXSA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5zcGxpY2VXaXRoQXJyYXlfKHZhbHVlcy5sZW5ndGgsIDAsIG5ld0l0ZW1zKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbjtcbn0oKTtcbmZ1bmN0aW9uIGNyZWF0ZU9ic2VydmFibGVBcnJheShpbml0aWFsVmFsdWVzLCBlbmhhbmNlciwgbmFtZSwgb3duZWQpIHtcbiAgaWYgKG5hbWUgPT09IHZvaWQgMCkge1xuICAgIG5hbWUgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcIk9ic2VydmFibGVBcnJheUBcIiArIGdldE5leHRJZCgpIDogXCJPYnNlcnZhYmxlQXJyYXlcIjtcbiAgfVxuICBpZiAob3duZWQgPT09IHZvaWQgMCkge1xuICAgIG93bmVkID0gZmFsc2U7XG4gIH1cbiAgYXNzZXJ0UHJveGllcygpO1xuICByZXR1cm4gaW5pdE9ic2VydmFibGUoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhZG0gPSBuZXcgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24obmFtZSwgZW5oYW5jZXIsIG93bmVkLCBmYWxzZSk7XG4gICAgYWRkSGlkZGVuRmluYWxQcm9wKGFkbS52YWx1ZXNfLCAkbW9ieCwgYWRtKTtcbiAgICB2YXIgcHJveHkgPSBuZXcgUHJveHkoYWRtLnZhbHVlc18sIGFycmF5VHJhcHMpO1xuICAgIGFkbS5wcm94eV8gPSBwcm94eTtcbiAgICBpZiAoaW5pdGlhbFZhbHVlcyAmJiBpbml0aWFsVmFsdWVzLmxlbmd0aCkge1xuICAgICAgYWRtLnNwbGljZVdpdGhBcnJheV8oMCwgMCwgaW5pdGlhbFZhbHVlcyk7XG4gICAgfVxuICAgIHJldHVybiBwcm94eTtcbiAgfSk7XG59XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbnZhciBhcnJheUV4dGVuc2lvbnMgPSB7XG4gIGNsZWFyOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICByZXR1cm4gdGhpcy5zcGxpY2UoMCk7XG4gIH0sXG4gIHJlcGxhY2U6IGZ1bmN0aW9uIHJlcGxhY2UobmV3SXRlbXMpIHtcbiAgICB2YXIgYWRtID0gdGhpc1skbW9ieF07XG4gICAgcmV0dXJuIGFkbS5zcGxpY2VXaXRoQXJyYXlfKDAsIGFkbS52YWx1ZXNfLmxlbmd0aCwgbmV3SXRlbXMpO1xuICB9LFxuICAvLyBVc2VkIGJ5IEpTT04uc3RyaW5naWZ5XG4gIHRvSlNPTjogZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiB0aGlzLnNsaWNlKCk7XG4gIH0sXG4gIC8qXG4gICAqIGZ1bmN0aW9ucyB0aGF0IGRvIGFsdGVyIHRoZSBpbnRlcm5hbCBzdHJ1Y3R1cmUgb2YgdGhlIGFycmF5LCAoYmFzZWQgb24gbGliLmVzNi5kLnRzKVxuICAgKiBzaW5jZSB0aGVzZSBmdW5jdGlvbnMgYWx0ZXIgdGhlIGlubmVyIHN0cnVjdHVyZSBvZiB0aGUgYXJyYXksIHRoZSBoYXZlIHNpZGUgZWZmZWN0cy5cbiAgICogQmVjYXVzZSB0aGUgaGF2ZSBzaWRlIGVmZmVjdHMsIHRoZXkgc2hvdWxkIG5vdCBiZSB1c2VkIGluIGNvbXB1dGVkIGZ1bmN0aW9uLFxuICAgKiBhbmQgZm9yIHRoYXQgcmVhc29uIHRoZSBkbyBub3QgY2FsbCBkZXBlbmRlbmN5U3RhdGUubm90aWZ5T2JzZXJ2ZWRcbiAgICovXG4gIHNwbGljZTogZnVuY3Rpb24gc3BsaWNlKGluZGV4LCBkZWxldGVDb3VudCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBuZXdJdGVtcyA9IG5ldyBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBuZXdJdGVtc1tfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4XTtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gYWRtLnNwbGljZVdpdGhBcnJheV8oaW5kZXgpO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gYWRtLnNwbGljZVdpdGhBcnJheV8oaW5kZXgsIGRlbGV0ZUNvdW50KTtcbiAgICB9XG4gICAgcmV0dXJuIGFkbS5zcGxpY2VXaXRoQXJyYXlfKGluZGV4LCBkZWxldGVDb3VudCwgbmV3SXRlbXMpO1xuICB9LFxuICBzcGxpY2VXaXRoQXJyYXk6IGZ1bmN0aW9uIHNwbGljZVdpdGhBcnJheShpbmRleCwgZGVsZXRlQ291bnQsIG5ld0l0ZW1zKSB7XG4gICAgcmV0dXJuIHRoaXNbJG1vYnhdLnNwbGljZVdpdGhBcnJheV8oaW5kZXgsIGRlbGV0ZUNvdW50LCBuZXdJdGVtcyk7XG4gIH0sXG4gIHB1c2g6IGZ1bmN0aW9uIHB1c2goKSB7XG4gICAgdmFyIGFkbSA9IHRoaXNbJG1vYnhdO1xuICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgaXRlbXMgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGl0ZW1zW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuICAgIGFkbS5zcGxpY2VXaXRoQXJyYXlfKGFkbS52YWx1ZXNfLmxlbmd0aCwgMCwgaXRlbXMpO1xuICAgIHJldHVybiBhZG0udmFsdWVzXy5sZW5ndGg7XG4gIH0sXG4gIHBvcDogZnVuY3Rpb24gcG9wKCkge1xuICAgIHJldHVybiB0aGlzLnNwbGljZShNYXRoLm1heCh0aGlzWyRtb2J4XS52YWx1ZXNfLmxlbmd0aCAtIDEsIDApLCAxKVswXTtcbiAgfSxcbiAgc2hpZnQ6IGZ1bmN0aW9uIHNoaWZ0KCkge1xuICAgIHJldHVybiB0aGlzLnNwbGljZSgwLCAxKVswXTtcbiAgfSxcbiAgdW5zaGlmdDogZnVuY3Rpb24gdW5zaGlmdCgpIHtcbiAgICB2YXIgYWRtID0gdGhpc1skbW9ieF07XG4gICAgZm9yICh2YXIgX2xlbjMgPSBhcmd1bWVudHMubGVuZ3RoLCBpdGVtcyA9IG5ldyBBcnJheShfbGVuMyksIF9rZXkzID0gMDsgX2tleTMgPCBfbGVuMzsgX2tleTMrKykge1xuICAgICAgaXRlbXNbX2tleTNdID0gYXJndW1lbnRzW19rZXkzXTtcbiAgICB9XG4gICAgYWRtLnNwbGljZVdpdGhBcnJheV8oMCwgMCwgaXRlbXMpO1xuICAgIHJldHVybiBhZG0udmFsdWVzXy5sZW5ndGg7XG4gIH0sXG4gIHJldmVyc2U6IGZ1bmN0aW9uIHJldmVyc2UoKSB7XG4gICAgLy8gcmV2ZXJzZSBieSBkZWZhdWx0IG11dGF0ZXMgaW4gcGxhY2UgYmVmb3JlIHJldHVybmluZyB0aGUgcmVzdWx0XG4gICAgLy8gd2hpY2ggbWFrZXMgaXQgYm90aCBhICdkZXJpdmF0aW9uJyBhbmQgYSAnbXV0YXRpb24nLlxuICAgIGlmIChnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb24pIHtcbiAgICAgIGRpZSgzNywgXCJyZXZlcnNlXCIpO1xuICAgIH1cbiAgICB0aGlzLnJlcGxhY2UodGhpcy5zbGljZSgpLnJldmVyc2UoKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHNvcnQ6IGZ1bmN0aW9uIHNvcnQoKSB7XG4gICAgLy8gc29ydCBieSBkZWZhdWx0IG11dGF0ZXMgaW4gcGxhY2UgYmVmb3JlIHJldHVybmluZyB0aGUgcmVzdWx0XG4gICAgLy8gd2hpY2ggZ29lcyBhZ2FpbnN0IGFsbCBnb29kIHByYWN0aWNlcy4gTGV0J3Mgbm90IGNoYW5nZSB0aGUgYXJyYXkgaW4gcGxhY2UhXG4gICAgaWYgKGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbikge1xuICAgICAgZGllKDM3LCBcInNvcnRcIik7XG4gICAgfVxuICAgIHZhciBjb3B5ID0gdGhpcy5zbGljZSgpO1xuICAgIGNvcHkuc29ydC5hcHBseShjb3B5LCBhcmd1bWVudHMpO1xuICAgIHRoaXMucmVwbGFjZShjb3B5KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUodmFsdWUpIHtcbiAgICB2YXIgYWRtID0gdGhpc1skbW9ieF07XG4gICAgdmFyIGlkeCA9IGFkbS5kZWhhbmNlVmFsdWVzXyhhZG0udmFsdWVzXykuaW5kZXhPZih2YWx1ZSk7XG4gICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICB0aGlzLnNwbGljZShpZHgsIDEpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcbi8qKlxuICogV3JhcCBmdW5jdGlvbiBmcm9tIHByb3RvdHlwZVxuICogV2l0aG91dCB0aGlzLCBldmVyeXRoaW5nIHdvcmtzIGFzIHdlbGwsIGJ1dCB0aGlzIHdvcmtzXG4gKiBmYXN0ZXIgYXMgZXZlcnl0aGluZyB3b3JrcyBvbiB1bnByb3hpZWQgdmFsdWVzXG4gKi9cbmFkZEFycmF5RXh0ZW5zaW9uKFwiYXRcIiwgc2ltcGxlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcImNvbmNhdFwiLCBzaW1wbGVGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwiZmxhdFwiLCBzaW1wbGVGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwiaW5jbHVkZXNcIiwgc2ltcGxlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcImluZGV4T2ZcIiwgc2ltcGxlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcImpvaW5cIiwgc2ltcGxlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcImxhc3RJbmRleE9mXCIsIHNpbXBsZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJzbGljZVwiLCBzaW1wbGVGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwidG9TdHJpbmdcIiwgc2ltcGxlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcInRvTG9jYWxlU3RyaW5nXCIsIHNpbXBsZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJ0b1NvcnRlZFwiLCBzaW1wbGVGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwidG9TcGxpY2VkXCIsIHNpbXBsZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJ3aXRoXCIsIHNpbXBsZUZ1bmMpO1xuLy8gbWFwXG5hZGRBcnJheUV4dGVuc2lvbihcImV2ZXJ5XCIsIG1hcExpa2VGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwiZmlsdGVyXCIsIG1hcExpa2VGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwiZmluZFwiLCBtYXBMaWtlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcImZpbmRJbmRleFwiLCBtYXBMaWtlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcImZpbmRMYXN0XCIsIG1hcExpa2VGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwiZmluZExhc3RJbmRleFwiLCBtYXBMaWtlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcImZsYXRNYXBcIiwgbWFwTGlrZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJmb3JFYWNoXCIsIG1hcExpa2VGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwibWFwXCIsIG1hcExpa2VGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwic29tZVwiLCBtYXBMaWtlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcInRvUmV2ZXJzZWRcIiwgbWFwTGlrZUZ1bmMpO1xuLy8gcmVkdWNlXG5hZGRBcnJheUV4dGVuc2lvbihcInJlZHVjZVwiLCByZWR1Y2VMaWtlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcInJlZHVjZVJpZ2h0XCIsIHJlZHVjZUxpa2VGdW5jKTtcbmZ1bmN0aW9uIGFkZEFycmF5RXh0ZW5zaW9uKGZ1bmNOYW1lLCBmdW5jRmFjdG9yeSkge1xuICBpZiAodHlwZW9mIEFycmF5LnByb3RvdHlwZVtmdW5jTmFtZV0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGFycmF5RXh0ZW5zaW9uc1tmdW5jTmFtZV0gPSBmdW5jRmFjdG9yeShmdW5jTmFtZSk7XG4gIH1cbn1cbi8vIFJlcG9ydCBhbmQgZGVsZWdhdGUgdG8gZGVoYW5jZWQgYXJyYXlcbmZ1bmN0aW9uIHNpbXBsZUZ1bmMoZnVuY05hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYWRtID0gdGhpc1skbW9ieF07XG4gICAgYWRtLmF0b21fLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgdmFyIGRlaGFuY2VkVmFsdWVzID0gYWRtLmRlaGFuY2VWYWx1ZXNfKGFkbS52YWx1ZXNfKTtcbiAgICByZXR1cm4gZGVoYW5jZWRWYWx1ZXNbZnVuY05hbWVdLmFwcGx5KGRlaGFuY2VkVmFsdWVzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuLy8gTWFrZSBzdXJlIGNhbGxiYWNrcyByZWNlaXZlIGNvcnJlY3QgYXJyYXkgYXJnICMyMzI2XG5mdW5jdGlvbiBtYXBMaWtlRnVuYyhmdW5jTmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG4gICAgdmFyIGFkbSA9IHRoaXNbJG1vYnhdO1xuICAgIGFkbS5hdG9tXy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgIHZhciBkZWhhbmNlZFZhbHVlcyA9IGFkbS5kZWhhbmNlVmFsdWVzXyhhZG0udmFsdWVzXyk7XG4gICAgcmV0dXJuIGRlaGFuY2VkVmFsdWVzW2Z1bmNOYW1lXShmdW5jdGlvbiAoZWxlbWVudCwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIGVsZW1lbnQsIGluZGV4LCBfdGhpczIpO1xuICAgIH0pO1xuICB9O1xufVxuLy8gTWFrZSBzdXJlIGNhbGxiYWNrcyByZWNlaXZlIGNvcnJlY3QgYXJyYXkgYXJnICMyMzI2XG5mdW5jdGlvbiByZWR1Y2VMaWtlRnVuYyhmdW5jTmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4XTtcbiAgICBhZG0uYXRvbV8ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICB2YXIgZGVoYW5jZWRWYWx1ZXMgPSBhZG0uZGVoYW5jZVZhbHVlc18oYWRtLnZhbHVlc18pO1xuICAgIC8vICMyNDMyIC0gcmVkdWNlIGJlaGF2aW9yIGRlcGVuZHMgb24gYXJndW1lbnRzLmxlbmd0aFxuICAgIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50c1swXTtcbiAgICBhcmd1bWVudHNbMF0gPSBmdW5jdGlvbiAoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlLCBpbmRleCwgX3RoaXMzKTtcbiAgICB9O1xuICAgIHJldHVybiBkZWhhbmNlZFZhbHVlc1tmdW5jTmFtZV0uYXBwbHkoZGVoYW5jZWRWYWx1ZXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG52YXIgaXNPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlKFwiT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb25cIiwgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24pO1xuZnVuY3Rpb24gaXNPYnNlcnZhYmxlQXJyYXkodGhpbmcpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHRoaW5nKSAmJiBpc09ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uKHRoaW5nWyRtb2J4XSk7XG59XG5cbnZhciBfU3ltYm9sJGl0ZXJhdG9yLCBfU3ltYm9sJHRvU3RyaW5nVGFnO1xudmFyIE9ic2VydmFibGVNYXBNYXJrZXIgPSB7fTtcbnZhciBBREQgPSBcImFkZFwiO1xudmFyIERFTEVURSA9IFwiZGVsZXRlXCI7XG4vLyBqdXN0IGV4dGVuZCBNYXA/IFNlZSBhbHNvIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL25lc3RoYXJ1cy8xM2I0ZDc0ZjJlZjRhMmY0MzU3ZGJkM2ZjMjNjMWU1NFxuLy8gQnV0OiBodHRwczovL2dpdGh1Yi5jb20vbW9ieGpzL21vYngvaXNzdWVzLzE1NTZcbl9TeW1ib2wkaXRlcmF0b3IgPSBTeW1ib2wuaXRlcmF0b3I7XG5fU3ltYm9sJHRvU3RyaW5nVGFnID0gU3ltYm9sLnRvU3RyaW5nVGFnO1xudmFyIE9ic2VydmFibGVNYXAgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvLyBoYXNNYXAsIG5vdCBoYXNoTWFwID4tKS5cblxuICBmdW5jdGlvbiBPYnNlcnZhYmxlTWFwKGluaXRpYWxEYXRhLCBlbmhhbmNlcl8sIG5hbWVfKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBpZiAoZW5oYW5jZXJfID09PSB2b2lkIDApIHtcbiAgICAgIGVuaGFuY2VyXyA9IGRlZXBFbmhhbmNlcjtcbiAgICB9XG4gICAgaWYgKG5hbWVfID09PSB2b2lkIDApIHtcbiAgICAgIG5hbWVfID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJPYnNlcnZhYmxlTWFwQFwiICsgZ2V0TmV4dElkKCkgOiBcIk9ic2VydmFibGVNYXBcIjtcbiAgICB9XG4gICAgdGhpcy5lbmhhbmNlcl8gPSB2b2lkIDA7XG4gICAgdGhpcy5uYW1lXyA9IHZvaWQgMDtcbiAgICB0aGlzWyRtb2J4XSA9IE9ic2VydmFibGVNYXBNYXJrZXI7XG4gICAgdGhpcy5kYXRhXyA9IHZvaWQgMDtcbiAgICB0aGlzLmhhc01hcF8gPSB2b2lkIDA7XG4gICAgdGhpcy5rZXlzQXRvbV8gPSB2b2lkIDA7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnNfID0gdm9pZCAwO1xuICAgIHRoaXMuY2hhbmdlTGlzdGVuZXJzXyA9IHZvaWQgMDtcbiAgICB0aGlzLmRlaGFuY2VyID0gdm9pZCAwO1xuICAgIHRoaXMuZW5oYW5jZXJfID0gZW5oYW5jZXJfO1xuICAgIHRoaXMubmFtZV8gPSBuYW1lXztcbiAgICBpZiAoIWlzRnVuY3Rpb24oTWFwKSkge1xuICAgICAgZGllKDE4KTtcbiAgICB9XG4gICAgaW5pdE9ic2VydmFibGUoZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMua2V5c0F0b21fID0gY3JlYXRlQXRvbShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBfdGhpcy5uYW1lXyArIFwiLmtleXMoKVwiIDogXCJPYnNlcnZhYmxlTWFwLmtleXMoKVwiKTtcbiAgICAgIF90aGlzLmRhdGFfID0gbmV3IE1hcCgpO1xuICAgICAgX3RoaXMuaGFzTWFwXyA9IG5ldyBNYXAoKTtcbiAgICAgIGlmIChpbml0aWFsRGF0YSkge1xuICAgICAgICBfdGhpcy5tZXJnZShpbml0aWFsRGF0YSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgdmFyIF9wcm90byA9IE9ic2VydmFibGVNYXAucHJvdG90eXBlO1xuICBfcHJvdG8uaGFzXyA9IGZ1bmN0aW9uIGhhc18oa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YV8uaGFzKGtleSk7XG4gIH07XG4gIF9wcm90by5oYXMgPSBmdW5jdGlvbiBoYXMoa2V5KSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG4gICAgaWYgKCFnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmhhc18oa2V5KTtcbiAgICB9XG4gICAgdmFyIGVudHJ5ID0gdGhpcy5oYXNNYXBfLmdldChrZXkpO1xuICAgIGlmICghZW50cnkpIHtcbiAgICAgIHZhciBuZXdFbnRyeSA9IGVudHJ5ID0gbmV3IE9ic2VydmFibGVWYWx1ZSh0aGlzLmhhc18oa2V5KSwgcmVmZXJlbmNlRW5oYW5jZXIsIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHRoaXMubmFtZV8gKyBcIi5cIiArIHN0cmluZ2lmeUtleShrZXkpICsgXCI/XCIgOiBcIk9ic2VydmFibGVNYXAua2V5P1wiLCBmYWxzZSk7XG4gICAgICB0aGlzLmhhc01hcF8uc2V0KGtleSwgbmV3RW50cnkpO1xuICAgICAgb25CZWNvbWVVbm9ic2VydmVkKG5ld0VudHJ5LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczIuaGFzTWFwX1tcImRlbGV0ZVwiXShrZXkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBlbnRyeS5nZXQoKTtcbiAgfTtcbiAgX3Byb3RvLnNldCA9IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgdmFyIGhhc0tleSA9IHRoaXMuaGFzXyhrZXkpO1xuICAgIGlmIChoYXNJbnRlcmNlcHRvcnModGhpcykpIHtcbiAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UodGhpcywge1xuICAgICAgICB0eXBlOiBoYXNLZXkgPyBVUERBVEUgOiBBREQsXG4gICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgbmV3VmFsdWU6IHZhbHVlLFxuICAgICAgICBuYW1lOiBrZXlcbiAgICAgIH0pO1xuICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICB9XG4gICAgaWYgKGhhc0tleSkge1xuICAgICAgdGhpcy51cGRhdGVWYWx1ZV8oa2V5LCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkVmFsdWVfKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgX3Byb3RvW1wiZGVsZXRlXCJdID0gZnVuY3Rpb24gX2RlbGV0ZShrZXkpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcbiAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCh0aGlzLmtleXNBdG9tXyk7XG4gICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgIHR5cGU6IERFTEVURSxcbiAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICBuYW1lOiBrZXlcbiAgICAgIH0pO1xuICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5oYXNfKGtleSkpIHtcbiAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQoKTtcbiAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnModGhpcyk7XG4gICAgICB2YXIgX2NoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHkgPyB7XG4gICAgICAgIG9ic2VydmFibGVLaW5kOiBcIm1hcFwiLFxuICAgICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMubmFtZV8sXG4gICAgICAgIHR5cGU6IERFTEVURSxcbiAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICBvbGRWYWx1ZTogdGhpcy5kYXRhXy5nZXQoa2V5KS52YWx1ZV8sXG4gICAgICAgIG5hbWU6IGtleVxuICAgICAgfSA6IG51bGw7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgICBzcHlSZXBvcnRTdGFydChfY2hhbmdlKTtcbiAgICAgIH0gLy8gVE9ETyBmaXggdHlwZVxuICAgICAgdHJhbnNhY3Rpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMzJGhhc01hcF8kZ2V0O1xuICAgICAgICBfdGhpczMua2V5c0F0b21fLnJlcG9ydENoYW5nZWQoKTtcbiAgICAgICAgKF90aGlzMyRoYXNNYXBfJGdldCA9IF90aGlzMy5oYXNNYXBfLmdldChrZXkpKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXMzJGhhc01hcF8kZ2V0LnNldE5ld1ZhbHVlXyhmYWxzZSk7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gX3RoaXMzLmRhdGFfLmdldChrZXkpO1xuICAgICAgICBvYnNlcnZhYmxlLnNldE5ld1ZhbHVlXyh1bmRlZmluZWQpO1xuICAgICAgICBfdGhpczMuZGF0YV9bXCJkZWxldGVcIl0oa2V5KTtcbiAgICAgIH0pO1xuICAgICAgaWYgKG5vdGlmeSkge1xuICAgICAgICBub3RpZnlMaXN0ZW5lcnModGhpcywgX2NoYW5nZSk7XG4gICAgICB9XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG4gIF9wcm90by51cGRhdGVWYWx1ZV8gPSBmdW5jdGlvbiB1cGRhdGVWYWx1ZV8oa2V5LCBuZXdWYWx1ZSkge1xuICAgIHZhciBvYnNlcnZhYmxlID0gdGhpcy5kYXRhXy5nZXQoa2V5KTtcbiAgICBuZXdWYWx1ZSA9IG9ic2VydmFibGUucHJlcGFyZU5ld1ZhbHVlXyhuZXdWYWx1ZSk7XG4gICAgaWYgKG5ld1ZhbHVlICE9PSBnbG9iYWxTdGF0ZS5VTkNIQU5HRUQpIHtcbiAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQoKTtcbiAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnModGhpcyk7XG4gICAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweSA/IHtcbiAgICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwibWFwXCIsXG4gICAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5uYW1lXyxcbiAgICAgICAgdHlwZTogVVBEQVRFLFxuICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgIG9sZFZhbHVlOiBvYnNlcnZhYmxlLnZhbHVlXyxcbiAgICAgICAgbmFtZToga2V5LFxuICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgIH0gOiBudWxsO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgICAgc3B5UmVwb3J0U3RhcnQoY2hhbmdlKTtcbiAgICAgIH0gLy8gVE9ETyBmaXggdHlwZVxuICAgICAgb2JzZXJ2YWJsZS5zZXROZXdWYWx1ZV8obmV3VmFsdWUpO1xuICAgICAgaWYgKG5vdGlmeSkge1xuICAgICAgICBub3RpZnlMaXN0ZW5lcnModGhpcywgY2hhbmdlKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmFkZFZhbHVlXyA9IGZ1bmN0aW9uIGFkZFZhbHVlXyhrZXksIG5ld1ZhbHVlKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG4gICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQodGhpcy5rZXlzQXRvbV8pO1xuICAgIHRyYW5zYWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBfdGhpczQkaGFzTWFwXyRnZXQ7XG4gICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlVmFsdWUobmV3VmFsdWUsIF90aGlzNC5lbmhhbmNlcl8sIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IF90aGlzNC5uYW1lXyArIFwiLlwiICsgc3RyaW5naWZ5S2V5KGtleSkgOiBcIk9ic2VydmFibGVNYXAua2V5XCIsIGZhbHNlKTtcbiAgICAgIF90aGlzNC5kYXRhXy5zZXQoa2V5LCBvYnNlcnZhYmxlKTtcbiAgICAgIG5ld1ZhbHVlID0gb2JzZXJ2YWJsZS52YWx1ZV87IC8vIHZhbHVlIG1pZ2h0IGhhdmUgYmVlbiBjaGFuZ2VkXG4gICAgICAoX3RoaXM0JGhhc01hcF8kZ2V0ID0gX3RoaXM0Lmhhc01hcF8uZ2V0KGtleSkpID09IG51bGwgPyB2b2lkIDAgOiBfdGhpczQkaGFzTWFwXyRnZXQuc2V0TmV3VmFsdWVfKHRydWUpO1xuICAgICAgX3RoaXM0LmtleXNBdG9tXy5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgfSk7XG4gICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCgpO1xuICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnModGhpcyk7XG4gICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHkgPyB7XG4gICAgICBvYnNlcnZhYmxlS2luZDogXCJtYXBcIixcbiAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5uYW1lXyxcbiAgICAgIHR5cGU6IEFERCxcbiAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgIG5hbWU6IGtleSxcbiAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgIH0gOiBudWxsO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICBzcHlSZXBvcnRTdGFydChjaGFuZ2UpO1xuICAgIH0gLy8gVE9ETyBmaXggdHlwZVxuICAgIGlmIChub3RpZnkpIHtcbiAgICAgIG5vdGlmeUxpc3RlbmVycyh0aGlzLCBjaGFuZ2UpO1xuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgc3B5UmVwb3J0RW5kKCk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uZ2V0ID0gZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgIGlmICh0aGlzLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWhhbmNlVmFsdWVfKHRoaXMuZGF0YV8uZ2V0KGtleSkuZ2V0KCkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kZWhhbmNlVmFsdWVfKHVuZGVmaW5lZCk7XG4gIH07XG4gIF9wcm90by5kZWhhbmNlVmFsdWVfID0gZnVuY3Rpb24gZGVoYW5jZVZhbHVlXyh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmRlaGFuY2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VyKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuICBfcHJvdG8ua2V5cyA9IGZ1bmN0aW9uIGtleXMoKSB7XG4gICAgdGhpcy5rZXlzQXRvbV8ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICByZXR1cm4gdGhpcy5kYXRhXy5rZXlzKCk7XG4gIH07XG4gIF9wcm90by52YWx1ZXMgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBrZXlzID0gdGhpcy5rZXlzKCk7XG4gICAgcmV0dXJuIG1ha2VJdGVyYWJsZSh7XG4gICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICB2YXIgX2tleXMkbmV4dCA9IGtleXMubmV4dCgpLFxuICAgICAgICAgIGRvbmUgPSBfa2V5cyRuZXh0LmRvbmUsXG4gICAgICAgICAgdmFsdWUgPSBfa2V5cyRuZXh0LnZhbHVlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGRvbmU6IGRvbmUsXG4gICAgICAgICAgdmFsdWU6IGRvbmUgPyB1bmRlZmluZWQgOiBzZWxmLmdldCh2YWx1ZSlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgX3Byb3RvLmVudHJpZXMgPSBmdW5jdGlvbiBlbnRyaWVzKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIga2V5cyA9IHRoaXMua2V5cygpO1xuICAgIHJldHVybiBtYWtlSXRlcmFibGUoe1xuICAgICAgbmV4dDogZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgdmFyIF9rZXlzJG5leHQyID0ga2V5cy5uZXh0KCksXG4gICAgICAgICAgZG9uZSA9IF9rZXlzJG5leHQyLmRvbmUsXG4gICAgICAgICAgdmFsdWUgPSBfa2V5cyRuZXh0Mi52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkb25lOiBkb25lLFxuICAgICAgICAgIHZhbHVlOiBkb25lID8gdW5kZWZpbmVkIDogW3ZhbHVlLCBzZWxmLmdldCh2YWx1ZSldXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIF9wcm90b1tfU3ltYm9sJGl0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5lbnRyaWVzKCk7XG4gIH07XG4gIF9wcm90by5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UodGhpcyksIF9zdGVwOyAhKF9zdGVwID0gX2l0ZXJhdG9yKCkpLmRvbmU7KSB7XG4gICAgICB2YXIgX3N0ZXAkdmFsdWUgPSBfc3RlcC52YWx1ZSxcbiAgICAgICAga2V5ID0gX3N0ZXAkdmFsdWVbMF0sXG4gICAgICAgIHZhbHVlID0gX3N0ZXAkdmFsdWVbMV07XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbHVlLCBrZXksIHRoaXMpO1xuICAgIH1cbiAgfVxuICAvKiogTWVyZ2UgYW5vdGhlciBvYmplY3QgaW50byB0aGlzIG9iamVjdCwgcmV0dXJucyB0aGlzLiAqLztcbiAgX3Byb3RvLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2Uob3RoZXIpIHtcbiAgICB2YXIgX3RoaXM1ID0gdGhpcztcbiAgICBpZiAoaXNPYnNlcnZhYmxlTWFwKG90aGVyKSkge1xuICAgICAgb3RoZXIgPSBuZXcgTWFwKG90aGVyKTtcbiAgICB9XG4gICAgdHJhbnNhY3Rpb24oZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGlzUGxhaW5PYmplY3Qob3RoZXIpKSB7XG4gICAgICAgIGdldFBsYWluT2JqZWN0S2V5cyhvdGhlcikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzNS5zZXQoa2V5LCBvdGhlcltrZXldKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3RoZXIpKSB7XG4gICAgICAgIG90aGVyLmZvckVhY2goZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgICB2YXIga2V5ID0gX3JlZlswXSxcbiAgICAgICAgICAgIHZhbHVlID0gX3JlZlsxXTtcbiAgICAgICAgICByZXR1cm4gX3RoaXM1LnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGlzRVM2TWFwKG90aGVyKSkge1xuICAgICAgICBpZiAob3RoZXIuY29uc3RydWN0b3IgIT09IE1hcCkge1xuICAgICAgICAgIGRpZSgxOSwgb3RoZXIpO1xuICAgICAgICB9XG4gICAgICAgIG90aGVyLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXM1LnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKG90aGVyICE9PSBudWxsICYmIG90aGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGllKDIwLCBvdGhlcik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIF9wcm90by5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHZhciBfdGhpczYgPSB0aGlzO1xuICAgIHRyYW5zYWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgIHVudHJhY2tlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKF90aGlzNi5rZXlzKCkpLCBfc3RlcDI7ICEoX3N0ZXAyID0gX2l0ZXJhdG9yMigpKS5kb25lOykge1xuICAgICAgICAgIHZhciBrZXkgPSBfc3RlcDIudmFsdWU7XG4gICAgICAgICAgX3RoaXM2W1wiZGVsZXRlXCJdKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuICBfcHJvdG8ucmVwbGFjZSA9IGZ1bmN0aW9uIHJlcGxhY2UodmFsdWVzKSB7XG4gICAgdmFyIF90aGlzNyA9IHRoaXM7XG4gICAgLy8gSW1wbGVtZW50YXRpb24gcmVxdWlyZW1lbnRzOlxuICAgIC8vIC0gcmVzcGVjdCBvcmRlcmluZyBvZiByZXBsYWNlbWVudCBtYXBcbiAgICAvLyAtIGFsbG93IGludGVyY2VwdG9ycyB0byBydW4gYW5kIHBvdGVudGlhbGx5IHByZXZlbnQgaW5kaXZpZHVhbCBvcGVyYXRpb25zXG4gICAgLy8gLSBkb24ndCByZWNyZWF0ZSBvYnNlcnZhYmxlcyB0aGF0IGFscmVhZHkgZXhpc3QgaW4gb3JpZ2luYWwgbWFwIChzbyB3ZSBkb24ndCBkZXN0cm95IGV4aXN0aW5nIHN1YnNjcmlwdGlvbnMpXG4gICAgLy8gLSBkb24ndCBfa2V5c0F0b20ucmVwb3J0Q2hhbmdlZCBpZiB0aGUga2V5cyBvZiByZXN1bHRpbmcgbWFwIGFyZSBpbmRlbnRpY2FsIChvcmRlciBtYXR0ZXJzISlcbiAgICAvLyAtIG5vdGUgdGhhdCByZXN1bHQgbWFwIG1heSBkaWZmZXIgZnJvbSByZXBsYWNlbWVudCBtYXAgZHVlIHRvIHRoZSBpbnRlcmNlcHRvcnNcbiAgICB0cmFuc2FjdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBDb252ZXJ0IHRvIG1hcCBzbyB3ZSBjYW4gZG8gcXVpY2sga2V5IGxvb2t1cHNcbiAgICAgIHZhciByZXBsYWNlbWVudE1hcCA9IGNvbnZlcnRUb01hcCh2YWx1ZXMpO1xuICAgICAgdmFyIG9yZGVyZWREYXRhID0gbmV3IE1hcCgpO1xuICAgICAgLy8gVXNlZCBmb3Igb3B0aW1pemF0aW9uXG4gICAgICB2YXIga2V5c1JlcG9ydENoYW5nZWRDYWxsZWQgPSBmYWxzZTtcbiAgICAgIC8vIERlbGV0ZSBrZXlzIHRoYXQgZG9uJ3QgZXhpc3QgaW4gcmVwbGFjZW1lbnQgbWFwXG4gICAgICAvLyBpZiB0aGUga2V5IGRlbGV0aW9uIGlzIHByZXZlbnRlZCBieSBpbnRlcmNlcHRvclxuICAgICAgLy8gYWRkIGVudHJ5IGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIHJlc3VsdCBtYXBcbiAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKF90aGlzNy5kYXRhXy5rZXlzKCkpLCBfc3RlcDM7ICEoX3N0ZXAzID0gX2l0ZXJhdG9yMygpKS5kb25lOykge1xuICAgICAgICB2YXIga2V5ID0gX3N0ZXAzLnZhbHVlO1xuICAgICAgICAvLyBDb25jdXJyZW50bHkgaXRlcmF0aW5nL2RlbGV0aW5nIGtleXNcbiAgICAgICAgLy8gaXRlcmF0b3Igc2hvdWxkIGhhbmRsZSB0aGlzIGNvcnJlY3RseVxuICAgICAgICBpZiAoIXJlcGxhY2VtZW50TWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgdmFyIGRlbGV0ZWQgPSBfdGhpczdbXCJkZWxldGVcIl0oa2V5KTtcbiAgICAgICAgICAvLyBXYXMgdGhlIGtleSByZW1vdmVkP1xuICAgICAgICAgIGlmIChkZWxldGVkKSB7XG4gICAgICAgICAgICAvLyBfa2V5c0F0b20ucmVwb3J0Q2hhbmdlZCgpIHdhcyBhbHJlYWR5IGNhbGxlZFxuICAgICAgICAgICAga2V5c1JlcG9ydENoYW5nZWRDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBEZWxldGUgcHJldmVudGVkIGJ5IGludGVyY2VwdG9yXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBfdGhpczcuZGF0YV8uZ2V0KGtleSk7XG4gICAgICAgICAgICBvcmRlcmVkRGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBNZXJnZSBlbnRyaWVzXG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3I0ID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShyZXBsYWNlbWVudE1hcC5lbnRyaWVzKCkpLCBfc3RlcDQ7ICEoX3N0ZXA0ID0gX2l0ZXJhdG9yNCgpKS5kb25lOykge1xuICAgICAgICB2YXIgX3N0ZXA0JHZhbHVlID0gX3N0ZXA0LnZhbHVlLFxuICAgICAgICAgIF9rZXkgPSBfc3RlcDQkdmFsdWVbMF0sXG4gICAgICAgICAgX3ZhbHVlID0gX3N0ZXA0JHZhbHVlWzFdO1xuICAgICAgICAvLyBXZSB3aWxsIHdhbnQgdG8ga25vdyB3aGV0aGVyIGEgbmV3IGtleSBpcyBhZGRlZFxuICAgICAgICB2YXIga2V5RXhpc3RlZCA9IF90aGlzNy5kYXRhXy5oYXMoX2tleSk7XG4gICAgICAgIC8vIEFkZCBvciB1cGRhdGUgdmFsdWVcbiAgICAgICAgX3RoaXM3LnNldChfa2V5LCBfdmFsdWUpO1xuICAgICAgICAvLyBUaGUgYWRkaXRpb24gY291bGQgaGF2ZSBiZWVuIHByZXZlbnQgYnkgaW50ZXJjZXB0b3JcbiAgICAgICAgaWYgKF90aGlzNy5kYXRhXy5oYXMoX2tleSkpIHtcbiAgICAgICAgICAvLyBUaGUgdXBkYXRlIGNvdWxkIGhhdmUgYmVlbiBwcmV2ZW50ZWQgYnkgaW50ZXJjZXB0b3JcbiAgICAgICAgICAvLyBhbmQgYWxzbyB3ZSB3YW50IHRvIHByZXNlcnZlIGV4aXN0aW5nIHZhbHVlc1xuICAgICAgICAgIC8vIHNvIHVzZSB2YWx1ZSBmcm9tIF9kYXRhIG1hcCAoaW5zdGVhZCBvZiByZXBsYWNlbWVudCBtYXApXG4gICAgICAgICAgdmFyIF92YWx1ZTIgPSBfdGhpczcuZGF0YV8uZ2V0KF9rZXkpO1xuICAgICAgICAgIG9yZGVyZWREYXRhLnNldChfa2V5LCBfdmFsdWUyKTtcbiAgICAgICAgICAvLyBXYXMgYSBuZXcga2V5IGFkZGVkP1xuICAgICAgICAgIGlmICgha2V5RXhpc3RlZCkge1xuICAgICAgICAgICAgLy8gX2tleXNBdG9tLnJlcG9ydENoYW5nZWQoKSB3YXMgYWxyZWFkeSBjYWxsZWRcbiAgICAgICAgICAgIGtleXNSZXBvcnRDaGFuZ2VkQ2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIENoZWNrIGZvciBwb3NzaWJsZSBrZXkgb3JkZXIgY2hhbmdlXG4gICAgICBpZiAoIWtleXNSZXBvcnRDaGFuZ2VkQ2FsbGVkKSB7XG4gICAgICAgIGlmIChfdGhpczcuZGF0YV8uc2l6ZSAhPT0gb3JkZXJlZERhdGEuc2l6ZSkge1xuICAgICAgICAgIC8vIElmIHNpemUgZGlmZmVycywga2V5cyBhcmUgZGVmaW5pdGVseSBtb2RpZmllZFxuICAgICAgICAgIF90aGlzNy5rZXlzQXRvbV8ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBpdGVyMSA9IF90aGlzNy5kYXRhXy5rZXlzKCk7XG4gICAgICAgICAgdmFyIGl0ZXIyID0gb3JkZXJlZERhdGEua2V5cygpO1xuICAgICAgICAgIHZhciBuZXh0MSA9IGl0ZXIxLm5leHQoKTtcbiAgICAgICAgICB2YXIgbmV4dDIgPSBpdGVyMi5uZXh0KCk7XG4gICAgICAgICAgd2hpbGUgKCFuZXh0MS5kb25lKSB7XG4gICAgICAgICAgICBpZiAobmV4dDEudmFsdWUgIT09IG5leHQyLnZhbHVlKSB7XG4gICAgICAgICAgICAgIF90aGlzNy5rZXlzQXRvbV8ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5leHQxID0gaXRlcjEubmV4dCgpO1xuICAgICAgICAgICAgbmV4dDIgPSBpdGVyMi5uZXh0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBVc2UgY29ycmVjdGx5IG9yZGVyZWQgbWFwXG4gICAgICBfdGhpczcuZGF0YV8gPSBvcmRlcmVkRGF0YTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgX3Byb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBPYnNlcnZhYmxlTWFwXVwiO1xuICB9O1xuICBfcHJvdG8udG9KU09OID0gZnVuY3Rpb24gdG9KU09OKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMpO1xuICB9O1xuICAvKipcbiAgICogT2JzZXJ2ZXMgdGhpcyBvYmplY3QuIFRyaWdnZXJzIGZvciB0aGUgZXZlbnRzICdhZGQnLCAndXBkYXRlJyBhbmQgJ2RlbGV0ZScuXG4gICAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L29ic2VydmVcbiAgICogZm9yIGNhbGxiYWNrIGRldGFpbHNcbiAgICovXG4gIF9wcm90by5vYnNlcnZlXyA9IGZ1bmN0aW9uIG9ic2VydmVfKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGZpcmVJbW1lZGlhdGVseSA9PT0gdHJ1ZSkge1xuICAgICAgZGllKFwiYG9ic2VydmVgIGRvZXNuJ3Qgc3VwcG9ydCBmaXJlSW1tZWRpYXRlbHk9dHJ1ZSBpbiBjb21iaW5hdGlvbiB3aXRoIG1hcHMuXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJMaXN0ZW5lcih0aGlzLCBsaXN0ZW5lcik7XG4gIH07XG4gIF9wcm90by5pbnRlcmNlcHRfID0gZnVuY3Rpb24gaW50ZXJjZXB0XyhoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHJlZ2lzdGVySW50ZXJjZXB0b3IodGhpcywgaGFuZGxlcik7XG4gIH07XG4gIF9jcmVhdGVDbGFzcyhPYnNlcnZhYmxlTWFwLCBbe1xuICAgIGtleTogXCJzaXplXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB0aGlzLmtleXNBdG9tXy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YV8uc2l6ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IF9TeW1ib2wkdG9TdHJpbmdUYWcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gXCJNYXBcIjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE9ic2VydmFibGVNYXA7XG59KCk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbnZhciBpc09ic2VydmFibGVNYXAgPSAvKiNfX1BVUkVfXyovY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZShcIk9ic2VydmFibGVNYXBcIiwgT2JzZXJ2YWJsZU1hcCk7XG5mdW5jdGlvbiBjb252ZXJ0VG9NYXAoZGF0YVN0cnVjdHVyZSkge1xuICBpZiAoaXNFUzZNYXAoZGF0YVN0cnVjdHVyZSkgfHwgaXNPYnNlcnZhYmxlTWFwKGRhdGFTdHJ1Y3R1cmUpKSB7XG4gICAgcmV0dXJuIGRhdGFTdHJ1Y3R1cmU7XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkYXRhU3RydWN0dXJlKSkge1xuICAgIHJldHVybiBuZXcgTWFwKGRhdGFTdHJ1Y3R1cmUpO1xuICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoZGF0YVN0cnVjdHVyZSkpIHtcbiAgICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhU3RydWN0dXJlKSB7XG4gICAgICBtYXAuc2V0KGtleSwgZGF0YVN0cnVjdHVyZVtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIG1hcDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGllKDIxLCBkYXRhU3RydWN0dXJlKTtcbiAgfVxufVxuXG52YXIgX1N5bWJvbCRpdGVyYXRvciQxLCBfU3ltYm9sJHRvU3RyaW5nVGFnJDE7XG52YXIgT2JzZXJ2YWJsZVNldE1hcmtlciA9IHt9O1xuX1N5bWJvbCRpdGVyYXRvciQxID0gU3ltYm9sLml0ZXJhdG9yO1xuX1N5bWJvbCR0b1N0cmluZ1RhZyQxID0gU3ltYm9sLnRvU3RyaW5nVGFnO1xudmFyIE9ic2VydmFibGVTZXQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBPYnNlcnZhYmxlU2V0KGluaXRpYWxEYXRhLCBlbmhhbmNlciwgbmFtZV8pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIGlmIChlbmhhbmNlciA9PT0gdm9pZCAwKSB7XG4gICAgICBlbmhhbmNlciA9IGRlZXBFbmhhbmNlcjtcbiAgICB9XG4gICAgaWYgKG5hbWVfID09PSB2b2lkIDApIHtcbiAgICAgIG5hbWVfID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJPYnNlcnZhYmxlU2V0QFwiICsgZ2V0TmV4dElkKCkgOiBcIk9ic2VydmFibGVTZXRcIjtcbiAgICB9XG4gICAgdGhpcy5uYW1lXyA9IHZvaWQgMDtcbiAgICB0aGlzWyRtb2J4XSA9IE9ic2VydmFibGVTZXRNYXJrZXI7XG4gICAgdGhpcy5kYXRhXyA9IG5ldyBTZXQoKTtcbiAgICB0aGlzLmF0b21fID0gdm9pZCAwO1xuICAgIHRoaXMuY2hhbmdlTGlzdGVuZXJzXyA9IHZvaWQgMDtcbiAgICB0aGlzLmludGVyY2VwdG9yc18gPSB2b2lkIDA7XG4gICAgdGhpcy5kZWhhbmNlciA9IHZvaWQgMDtcbiAgICB0aGlzLmVuaGFuY2VyXyA9IHZvaWQgMDtcbiAgICB0aGlzLm5hbWVfID0gbmFtZV87XG4gICAgaWYgKCFpc0Z1bmN0aW9uKFNldCkpIHtcbiAgICAgIGRpZSgyMik7XG4gICAgfVxuICAgIHRoaXMuZW5oYW5jZXJfID0gZnVuY3Rpb24gKG5ld1YsIG9sZFYpIHtcbiAgICAgIHJldHVybiBlbmhhbmNlcihuZXdWLCBvbGRWLCBuYW1lXyk7XG4gICAgfTtcbiAgICBpbml0T2JzZXJ2YWJsZShmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5hdG9tXyA9IGNyZWF0ZUF0b20oX3RoaXMubmFtZV8pO1xuICAgICAgaWYgKGluaXRpYWxEYXRhKSB7XG4gICAgICAgIF90aGlzLnJlcGxhY2UoaW5pdGlhbERhdGEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHZhciBfcHJvdG8gPSBPYnNlcnZhYmxlU2V0LnByb3RvdHlwZTtcbiAgX3Byb3RvLmRlaGFuY2VWYWx1ZV8gPSBmdW5jdGlvbiBkZWhhbmNlVmFsdWVfKHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuZGVoYW5jZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVoYW5jZXIodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG4gIF9wcm90by5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgIHRyYW5zYWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgIHVudHJhY2tlZChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UoX3RoaXMyLmRhdGFfLnZhbHVlcygpKSwgX3N0ZXA7ICEoX3N0ZXAgPSBfaXRlcmF0b3IoKSkuZG9uZTspIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBfc3RlcC52YWx1ZTtcbiAgICAgICAgICBfdGhpczJbXCJkZWxldGVcIl0odmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgX3Byb3RvLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGNhbGxiYWNrRm4sIHRoaXNBcmcpIHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZSh0aGlzKSwgX3N0ZXAyOyAhKF9zdGVwMiA9IF9pdGVyYXRvcjIoKSkuZG9uZTspIHtcbiAgICAgIHZhciB2YWx1ZSA9IF9zdGVwMi52YWx1ZTtcbiAgICAgIGNhbGxiYWNrRm4uY2FsbCh0aGlzQXJnLCB2YWx1ZSwgdmFsdWUsIHRoaXMpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmFkZCA9IGZ1bmN0aW9uIGFkZCh2YWx1ZSkge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkKHRoaXMuYXRvbV8pO1xuICAgIGlmIChoYXNJbnRlcmNlcHRvcnModGhpcykpIHtcbiAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UodGhpcywge1xuICAgICAgICB0eXBlOiBBREQsXG4gICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgbmV3VmFsdWU6IHZhbHVlXG4gICAgICB9KTtcbiAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgLy8gaWRlYWxseSwgdmFsdWUgPSBjaGFuZ2UudmFsdWUgd291bGQgYmUgZG9uZSBoZXJlLCBzbyB0aGF0IHZhbHVlcyBjYW4gYmVcbiAgICAgIC8vIGNoYW5nZWQgYnkgaW50ZXJjZXB0b3IuIFNhbWUgYXBwbGllcyBmb3Igb3RoZXIgU2V0IGFuZCBNYXAgYXBpJ3MuXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhhcyh2YWx1ZSkpIHtcbiAgICAgIHRyYW5zYWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMzLmRhdGFfLmFkZChfdGhpczMuZW5oYW5jZXJfKHZhbHVlLCB1bmRlZmluZWQpKTtcbiAgICAgICAgX3RoaXMzLmF0b21fLnJlcG9ydENoYW5nZWQoKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIG5vdGlmeVNweSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBpc1NweUVuYWJsZWQoKTtcbiAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnModGhpcyk7XG4gICAgICB2YXIgX2NoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHkgPyB7XG4gICAgICAgIG9ic2VydmFibGVLaW5kOiBcInNldFwiLFxuICAgICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMubmFtZV8sXG4gICAgICAgIHR5cGU6IEFERCxcbiAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICBuZXdWYWx1ZTogdmFsdWVcbiAgICAgIH0gOiBudWxsO1xuICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgc3B5UmVwb3J0U3RhcnQoX2NoYW5nZSk7XG4gICAgICB9XG4gICAgICBpZiAobm90aWZ5KSB7XG4gICAgICAgIG5vdGlmeUxpc3RlbmVycyh0aGlzLCBfY2hhbmdlKTtcbiAgICAgIH1cbiAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgX3Byb3RvW1wiZGVsZXRlXCJdID0gZnVuY3Rpb24gX2RlbGV0ZSh2YWx1ZSkge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuICAgIGlmIChoYXNJbnRlcmNlcHRvcnModGhpcykpIHtcbiAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UodGhpcywge1xuICAgICAgICB0eXBlOiBERUxFVEUsXG4gICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgb2xkVmFsdWU6IHZhbHVlXG4gICAgICB9KTtcbiAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgdmFyIG5vdGlmeVNweSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBpc1NweUVuYWJsZWQoKTtcbiAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnModGhpcyk7XG4gICAgICB2YXIgX2NoYW5nZTIgPSBub3RpZnkgfHwgbm90aWZ5U3B5ID8ge1xuICAgICAgICBvYnNlcnZhYmxlS2luZDogXCJzZXRcIixcbiAgICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgICB0eXBlOiBERUxFVEUsXG4gICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgb2xkVmFsdWU6IHZhbHVlXG4gICAgICB9IDogbnVsbDtcbiAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIHNweVJlcG9ydFN0YXJ0KF9jaGFuZ2UyKTtcbiAgICAgIH1cbiAgICAgIHRyYW5zYWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXM0LmF0b21fLnJlcG9ydENoYW5nZWQoKTtcbiAgICAgICAgX3RoaXM0LmRhdGFfW1wiZGVsZXRlXCJdKHZhbHVlKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKG5vdGlmeSkge1xuICAgICAgICBub3RpZnlMaXN0ZW5lcnModGhpcywgX2NoYW5nZTIpO1xuICAgICAgfVxuICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgc3B5UmVwb3J0RW5kKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuICBfcHJvdG8uaGFzID0gZnVuY3Rpb24gaGFzKHZhbHVlKSB7XG4gICAgdGhpcy5hdG9tXy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgIHJldHVybiB0aGlzLmRhdGFfLmhhcyh0aGlzLmRlaGFuY2VWYWx1ZV8odmFsdWUpKTtcbiAgfTtcbiAgX3Byb3RvLmVudHJpZXMgPSBmdW5jdGlvbiBlbnRyaWVzKCkge1xuICAgIHZhciBuZXh0SW5kZXggPSAwO1xuICAgIHZhciBrZXlzID0gQXJyYXkuZnJvbSh0aGlzLmtleXMoKSk7XG4gICAgdmFyIHZhbHVlcyA9IEFycmF5LmZyb20odGhpcy52YWx1ZXMoKSk7XG4gICAgcmV0dXJuIG1ha2VJdGVyYWJsZSh7XG4gICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICB2YXIgaW5kZXggPSBuZXh0SW5kZXg7XG4gICAgICAgIG5leHRJbmRleCArPSAxO1xuICAgICAgICByZXR1cm4gaW5kZXggPCB2YWx1ZXMubGVuZ3RoID8ge1xuICAgICAgICAgIHZhbHVlOiBba2V5c1tpbmRleF0sIHZhbHVlc1tpbmRleF1dLFxuICAgICAgICAgIGRvbmU6IGZhbHNlXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICBfcHJvdG8ua2V5cyA9IGZ1bmN0aW9uIGtleXMoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzKCk7XG4gIH07XG4gIF9wcm90by52YWx1ZXMgPSBmdW5jdGlvbiB2YWx1ZXMoKSB7XG4gICAgdGhpcy5hdG9tXy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgbmV4dEluZGV4ID0gMDtcbiAgICB2YXIgb2JzZXJ2YWJsZVZhbHVlcyA9IEFycmF5LmZyb20odGhpcy5kYXRhXy52YWx1ZXMoKSk7XG4gICAgcmV0dXJuIG1ha2VJdGVyYWJsZSh7XG4gICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICByZXR1cm4gbmV4dEluZGV4IDwgb2JzZXJ2YWJsZVZhbHVlcy5sZW5ndGggPyB7XG4gICAgICAgICAgdmFsdWU6IHNlbGYuZGVoYW5jZVZhbHVlXyhvYnNlcnZhYmxlVmFsdWVzW25leHRJbmRleCsrXSksXG4gICAgICAgICAgZG9uZTogZmFsc2VcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICBkb25lOiB0cnVlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIF9wcm90by5yZXBsYWNlID0gZnVuY3Rpb24gcmVwbGFjZShvdGhlcikge1xuICAgIHZhciBfdGhpczUgPSB0aGlzO1xuICAgIGlmIChpc09ic2VydmFibGVTZXQob3RoZXIpKSB7XG4gICAgICBvdGhlciA9IG5ldyBTZXQob3RoZXIpO1xuICAgIH1cbiAgICB0cmFuc2FjdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvdGhlcikpIHtcbiAgICAgICAgX3RoaXM1LmNsZWFyKCk7XG4gICAgICAgIG90aGVyLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzNS5hZGQodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoaXNFUzZTZXQob3RoZXIpKSB7XG4gICAgICAgIF90aGlzNS5jbGVhcigpO1xuICAgICAgICBvdGhlci5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiBfdGhpczUuYWRkKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKG90aGVyICE9PSBudWxsICYmIG90aGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGllKFwiQ2Fubm90IGluaXRpYWxpemUgc2V0IGZyb20gXCIgKyBvdGhlcik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIF9wcm90by5vYnNlcnZlXyA9IGZ1bmN0aW9uIG9ic2VydmVfKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAvLyAuLi4gJ2ZpcmVJbW1lZGlhdGVseScgY291bGQgYWxzbyBiZSB0cnVlP1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgZmlyZUltbWVkaWF0ZWx5ID09PSB0cnVlKSB7XG4gICAgICBkaWUoXCJgb2JzZXJ2ZWAgZG9lc24ndCBzdXBwb3J0IGZpcmVJbW1lZGlhdGVseT10cnVlIGluIGNvbWJpbmF0aW9uIHdpdGggc2V0cy5cIik7XG4gICAgfVxuICAgIHJldHVybiByZWdpc3Rlckxpc3RlbmVyKHRoaXMsIGxpc3RlbmVyKTtcbiAgfTtcbiAgX3Byb3RvLmludGVyY2VwdF8gPSBmdW5jdGlvbiBpbnRlcmNlcHRfKGhhbmRsZXIpIHtcbiAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvcih0aGlzLCBoYW5kbGVyKTtcbiAgfTtcbiAgX3Byb3RvLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzKTtcbiAgfTtcbiAgX3Byb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBPYnNlcnZhYmxlU2V0XVwiO1xuICB9O1xuICBfcHJvdG9bX1N5bWJvbCRpdGVyYXRvciQxXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZXMoKTtcbiAgfTtcbiAgX2NyZWF0ZUNsYXNzKE9ic2VydmFibGVTZXQsIFt7XG4gICAga2V5OiBcInNpemVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHRoaXMuYXRvbV8ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICAgIHJldHVybiB0aGlzLmRhdGFfLnNpemU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBfU3ltYm9sJHRvU3RyaW5nVGFnJDEsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gXCJTZXRcIjtcbiAgICB9XG4gIH1dKTtcbiAgcmV0dXJuIE9ic2VydmFibGVTZXQ7XG59KCk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbnZhciBpc09ic2VydmFibGVTZXQgPSAvKiNfX1BVUkVfXyovY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZShcIk9ic2VydmFibGVTZXRcIiwgT2JzZXJ2YWJsZVNldCk7XG5cbnZhciBkZXNjcmlwdG9yQ2FjaGUgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmNyZWF0ZShudWxsKTtcbnZhciBSRU1PVkUgPSBcInJlbW92ZVwiO1xudmFyIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbih0YXJnZXRfLCB2YWx1ZXNfLCBuYW1lXyxcbiAgLy8gVXNlZCBhbnl0aW1lIGFubm90YXRpb24gaXMgbm90IGV4cGxpY2l0ZWx5IHByb3ZpZGVkXG4gIGRlZmF1bHRBbm5vdGF0aW9uXykge1xuICAgIGlmICh2YWx1ZXNfID09PSB2b2lkIDApIHtcbiAgICAgIHZhbHVlc18gPSBuZXcgTWFwKCk7XG4gICAgfVxuICAgIGlmIChkZWZhdWx0QW5ub3RhdGlvbl8gPT09IHZvaWQgMCkge1xuICAgICAgZGVmYXVsdEFubm90YXRpb25fID0gYXV0b0Fubm90YXRpb247XG4gICAgfVxuICAgIHRoaXMudGFyZ2V0XyA9IHZvaWQgMDtcbiAgICB0aGlzLnZhbHVlc18gPSB2b2lkIDA7XG4gICAgdGhpcy5uYW1lXyA9IHZvaWQgMDtcbiAgICB0aGlzLmRlZmF1bHRBbm5vdGF0aW9uXyA9IHZvaWQgMDtcbiAgICB0aGlzLmtleXNBdG9tXyA9IHZvaWQgMDtcbiAgICB0aGlzLmNoYW5nZUxpc3RlbmVyc18gPSB2b2lkIDA7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnNfID0gdm9pZCAwO1xuICAgIHRoaXMucHJveHlfID0gdm9pZCAwO1xuICAgIHRoaXMuaXNQbGFpbk9iamVjdF8gPSB2b2lkIDA7XG4gICAgdGhpcy5hcHBsaWVkQW5ub3RhdGlvbnNfID0gdm9pZCAwO1xuICAgIHRoaXMucGVuZGluZ0tleXNfID0gdm9pZCAwO1xuICAgIHRoaXMudGFyZ2V0XyA9IHRhcmdldF87XG4gICAgdGhpcy52YWx1ZXNfID0gdmFsdWVzXztcbiAgICB0aGlzLm5hbWVfID0gbmFtZV87XG4gICAgdGhpcy5kZWZhdWx0QW5ub3RhdGlvbl8gPSBkZWZhdWx0QW5ub3RhdGlvbl87XG4gICAgdGhpcy5rZXlzQXRvbV8gPSBuZXcgQXRvbShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB0aGlzLm5hbWVfICsgXCIua2V5c1wiIDogXCJPYnNlcnZhYmxlT2JqZWN0LmtleXNcIik7XG4gICAgLy8gT3B0aW1pemF0aW9uOiB3ZSB1c2UgdGhpcyBmcmVxdWVudGx5XG4gICAgdGhpcy5pc1BsYWluT2JqZWN0XyA9IGlzUGxhaW5PYmplY3QodGhpcy50YXJnZXRfKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFpc0Fubm90YXRpb24odGhpcy5kZWZhdWx0QW5ub3RhdGlvbl8pKSB7XG4gICAgICBkaWUoXCJkZWZhdWx0QW5ub3RhdGlvbiBtdXN0IGJlIHZhbGlkIGFubm90YXRpb25cIik7XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIC8vIFByZXBhcmUgc3RydWN0dXJlIGZvciB0cmFja2luZyB3aGljaCBmaWVsZHMgd2VyZSBhbHJlYWR5IGFubm90YXRlZFxuICAgICAgdGhpcy5hcHBsaWVkQW5ub3RhdGlvbnNfID0ge307XG4gICAgfVxuICB9XG4gIHZhciBfcHJvdG8gPSBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlO1xuICBfcHJvdG8uZ2V0T2JzZXJ2YWJsZVByb3BWYWx1ZV8gPSBmdW5jdGlvbiBnZXRPYnNlcnZhYmxlUHJvcFZhbHVlXyhrZXkpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZXNfLmdldChrZXkpLmdldCgpO1xuICB9O1xuICBfcHJvdG8uc2V0T2JzZXJ2YWJsZVByb3BWYWx1ZV8gPSBmdW5jdGlvbiBzZXRPYnNlcnZhYmxlUHJvcFZhbHVlXyhrZXksIG5ld1ZhbHVlKSB7XG4gICAgdmFyIG9ic2VydmFibGUgPSB0aGlzLnZhbHVlc18uZ2V0KGtleSk7XG4gICAgaWYgKG9ic2VydmFibGUgaW5zdGFuY2VvZiBDb21wdXRlZFZhbHVlKSB7XG4gICAgICBvYnNlcnZhYmxlLnNldChuZXdWYWx1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gaW50ZXJjZXB0XG4gICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgIHR5cGU6IFVQREFURSxcbiAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5XyB8fCB0aGlzLnRhcmdldF8sXG4gICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICB9KTtcbiAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgbmV3VmFsdWUgPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgfVxuICAgIG5ld1ZhbHVlID0gb2JzZXJ2YWJsZS5wcmVwYXJlTmV3VmFsdWVfKG5ld1ZhbHVlKTtcbiAgICAvLyBub3RpZnkgc3B5ICYgb2JzZXJ2ZXJzXG4gICAgaWYgKG5ld1ZhbHVlICE9PSBnbG9iYWxTdGF0ZS5VTkNIQU5HRUQpIHtcbiAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnModGhpcyk7XG4gICAgICB2YXIgbm90aWZ5U3B5ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGlzU3B5RW5hYmxlZCgpO1xuICAgICAgdmFyIF9jaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5ID8ge1xuICAgICAgICB0eXBlOiBVUERBVEUsXG4gICAgICAgIG9ic2VydmFibGVLaW5kOiBcIm9iamVjdFwiLFxuICAgICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMubmFtZV8sXG4gICAgICAgIG9iamVjdDogdGhpcy5wcm94eV8gfHwgdGhpcy50YXJnZXRfLFxuICAgICAgICBvbGRWYWx1ZTogb2JzZXJ2YWJsZS52YWx1ZV8sXG4gICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICB9IDogbnVsbDtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICAgIHNweVJlcG9ydFN0YXJ0KF9jaGFuZ2UpO1xuICAgICAgfVxuICAgICAgb2JzZXJ2YWJsZS5zZXROZXdWYWx1ZV8obmV3VmFsdWUpO1xuICAgICAgaWYgKG5vdGlmeSkge1xuICAgICAgICBub3RpZnlMaXN0ZW5lcnModGhpcywgX2NoYW5nZSk7XG4gICAgICB9XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIF9wcm90by5nZXRfID0gZnVuY3Rpb24gZ2V0XyhrZXkpIHtcbiAgICBpZiAoZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uICYmICFoYXNQcm9wKHRoaXMudGFyZ2V0Xywga2V5KSkge1xuICAgICAgLy8gS2V5IGRvZXNuJ3QgZXhpc3QgeWV0LCBzdWJzY3JpYmUgZm9yIGl0IGluIGNhc2UgaXQncyBhZGRlZCBsYXRlclxuICAgICAgdGhpcy5oYXNfKGtleSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRhcmdldF9ba2V5XTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtQcm9wZXJ0eUtleX0ga2V5XG4gICAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICAgKiBAcGFyYW0ge0Fubm90YXRpb258Ym9vbGVhbn0gYW5ub3RhdGlvbiB0cnVlIC0gdXNlIGRlZmF1bHQgYW5ub3RhdGlvbiwgZmFsc2UgLSBjb3B5IGFzIGlzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcHJveHlUcmFwIHdoZXRoZXIgaXQncyBjYWxsZWQgZnJvbSBwcm94eSB0cmFwXG4gICAqIEByZXR1cm5zIHtib29sZWFufG51bGx9IHRydWUgb24gc3VjY2VzcywgZmFsc2Ugb24gZmFpbHVyZSAocHJveHlUcmFwICsgbm9uLWNvbmZpZ3VyYWJsZSksIG51bGwgd2hlbiBjYW5jZWxsZWQgYnkgaW50ZXJjZXB0b3JcbiAgICovO1xuICBfcHJvdG8uc2V0XyA9IGZ1bmN0aW9uIHNldF8oa2V5LCB2YWx1ZSwgcHJveHlUcmFwKSB7XG4gICAgaWYgKHByb3h5VHJhcCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm94eVRyYXAgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gRG9uJ3QgdXNlIC5oYXMoa2V5KSAtIHdlIGNhcmUgYWJvdXQgb3duXG4gICAgaWYgKGhhc1Byb3AodGhpcy50YXJnZXRfLCBrZXkpKSB7XG4gICAgICAvLyBFeGlzdGluZyBwcm9wXG4gICAgICBpZiAodGhpcy52YWx1ZXNfLmhhcyhrZXkpKSB7XG4gICAgICAgIC8vIE9ic2VydmFibGUgKGNhbiBiZSBpbnRlcmNlcHRlZClcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0T2JzZXJ2YWJsZVByb3BWYWx1ZV8oa2V5LCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHByb3h5VHJhcCkge1xuICAgICAgICAvLyBOb24tb2JzZXJ2YWJsZSAtIHByb3h5XG4gICAgICAgIHJldHVybiBSZWZsZWN0LnNldCh0aGlzLnRhcmdldF8sIGtleSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTm9uLW9ic2VydmFibGVcbiAgICAgICAgdGhpcy50YXJnZXRfW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5ldyBwcm9wXG4gICAgICByZXR1cm4gdGhpcy5leHRlbmRfKGtleSwge1xuICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH0sIHRoaXMuZGVmYXVsdEFubm90YXRpb25fLCBwcm94eVRyYXApO1xuICAgIH1cbiAgfVxuICAvLyBUcmFwIGZvciBcImluXCJcbiAgO1xuICBfcHJvdG8uaGFzXyA9IGZ1bmN0aW9uIGhhc18oa2V5KSB7XG4gICAgaWYgKCFnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb24pIHtcbiAgICAgIC8vIFNraXAga2V5IHN1YnNjcmlwdGlvbiBvdXRzaWRlIGRlcml2YXRpb25cbiAgICAgIHJldHVybiBrZXkgaW4gdGhpcy50YXJnZXRfO1xuICAgIH1cbiAgICB0aGlzLnBlbmRpbmdLZXlzXyB8fCAodGhpcy5wZW5kaW5nS2V5c18gPSBuZXcgTWFwKCkpO1xuICAgIHZhciBlbnRyeSA9IHRoaXMucGVuZGluZ0tleXNfLmdldChrZXkpO1xuICAgIGlmICghZW50cnkpIHtcbiAgICAgIGVudHJ5ID0gbmV3IE9ic2VydmFibGVWYWx1ZShrZXkgaW4gdGhpcy50YXJnZXRfLCByZWZlcmVuY2VFbmhhbmNlciwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gdGhpcy5uYW1lXyArIFwiLlwiICsgc3RyaW5naWZ5S2V5KGtleSkgKyBcIj9cIiA6IFwiT2JzZXJ2YWJsZU9iamVjdC5rZXk/XCIsIGZhbHNlKTtcbiAgICAgIHRoaXMucGVuZGluZ0tleXNfLnNldChrZXksIGVudHJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIGVudHJ5LmdldCgpO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge1Byb3BlcnR5S2V5fSBrZXlcbiAgICogQHBhcmFtIHtBbm5vdGF0aW9ufGJvb2xlYW59IGFubm90YXRpb24gdHJ1ZSAtIHVzZSBkZWZhdWx0IGFubm90YXRpb24sIGZhbHNlIC0gaWdub3JlIHByb3BcbiAgICovO1xuICBfcHJvdG8ubWFrZV8gPSBmdW5jdGlvbiBtYWtlXyhrZXksIGFubm90YXRpb24pIHtcbiAgICBpZiAoYW5ub3RhdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgYW5ub3RhdGlvbiA9IHRoaXMuZGVmYXVsdEFubm90YXRpb25fO1xuICAgIH1cbiAgICBpZiAoYW5ub3RhdGlvbiA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXNzZXJ0QW5ub3RhYmxlKHRoaXMsIGFubm90YXRpb24sIGtleSk7XG4gICAgaWYgKCEoa2V5IGluIHRoaXMudGFyZ2V0XykpIHtcbiAgICAgIHZhciBfdGhpcyR0YXJnZXRfJHN0b3JlZEE7XG4gICAgICAvLyBUaHJvdyBvbiBtaXNzaW5nIGtleSwgZXhjZXB0IGZvciBkZWNvcmF0b3JzOlxuICAgICAgLy8gRGVjb3JhdG9yIGFubm90YXRpb25zIGFyZSBjb2xsZWN0ZWQgZnJvbSB3aG9sZSBwcm90b3R5cGUgY2hhaW4uXG4gICAgICAvLyBXaGVuIGNhbGxlZCBmcm9tIHN1cGVyKCkgc29tZSBwcm9wcyBtYXkgbm90IGV4aXN0IHlldC5cbiAgICAgIC8vIEhvd2V2ZXIgd2UgZG9uJ3QgaGF2ZSB0byB3b3JyeSBhYm91dCBtaXNzaW5nIHByb3AsXG4gICAgICAvLyBiZWNhdXNlIHRoZSBkZWNvcmF0b3IgbXVzdCBoYXZlIGJlZW4gYXBwbGllZCB0byBzb21ldGhpbmcuXG4gICAgICBpZiAoKF90aGlzJHRhcmdldF8kc3RvcmVkQSA9IHRoaXMudGFyZ2V0X1tzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbF0pICE9IG51bGwgJiYgX3RoaXMkdGFyZ2V0XyRzdG9yZWRBW2tleV0pIHtcbiAgICAgICAgcmV0dXJuOyAvLyB3aWxsIGJlIGFubm90YXRlZCBieSBzdWJjbGFzcyBjb25zdHJ1Y3RvclxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGllKDEsIGFubm90YXRpb24uYW5ub3RhdGlvblR5cGVfLCB0aGlzLm5hbWVfICsgXCIuXCIgKyBrZXkudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBzb3VyY2UgPSB0aGlzLnRhcmdldF87XG4gICAgd2hpbGUgKHNvdXJjZSAmJiBzb3VyY2UgIT09IG9iamVjdFByb3RvdHlwZSkge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBnZXREZXNjcmlwdG9yKHNvdXJjZSwga2V5KTtcbiAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgIHZhciBvdXRjb21lID0gYW5ub3RhdGlvbi5tYWtlXyh0aGlzLCBrZXksIGRlc2NyaXB0b3IsIHNvdXJjZSk7XG4gICAgICAgIGlmIChvdXRjb21lID09PSAwIC8qIE1ha2VSZXN1bHQuQ2FuY2VsICovKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvdXRjb21lID09PSAxIC8qIE1ha2VSZXN1bHQuQnJlYWsgKi8pIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc291cmNlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHNvdXJjZSk7XG4gICAgfVxuICAgIHJlY29yZEFubm90YXRpb25BcHBsaWVkKHRoaXMsIGFubm90YXRpb24sIGtleSk7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7UHJvcGVydHlLZXl9IGtleVxuICAgKiBAcGFyYW0ge1Byb3BlcnR5RGVzY3JpcHRvcn0gZGVzY3JpcHRvclxuICAgKiBAcGFyYW0ge0Fubm90YXRpb258Ym9vbGVhbn0gYW5ub3RhdGlvbiB0cnVlIC0gdXNlIGRlZmF1bHQgYW5ub3RhdGlvbiwgZmFsc2UgLSBjb3B5IGFzIGlzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcHJveHlUcmFwIHdoZXRoZXIgaXQncyBjYWxsZWQgZnJvbSBwcm94eSB0cmFwXG4gICAqIEByZXR1cm5zIHtib29sZWFufG51bGx9IHRydWUgb24gc3VjY2VzcywgZmFsc2Ugb24gZmFpbHVyZSAocHJveHlUcmFwICsgbm9uLWNvbmZpZ3VyYWJsZSksIG51bGwgd2hlbiBjYW5jZWxsZWQgYnkgaW50ZXJjZXB0b3JcbiAgICovO1xuICBfcHJvdG8uZXh0ZW5kXyA9IGZ1bmN0aW9uIGV4dGVuZF8oa2V5LCBkZXNjcmlwdG9yLCBhbm5vdGF0aW9uLCBwcm94eVRyYXApIHtcbiAgICBpZiAocHJveHlUcmFwID09PSB2b2lkIDApIHtcbiAgICAgIHByb3h5VHJhcCA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYW5ub3RhdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgYW5ub3RhdGlvbiA9IHRoaXMuZGVmYXVsdEFubm90YXRpb25fO1xuICAgIH1cbiAgICBpZiAoYW5ub3RhdGlvbiA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlZmluZVByb3BlcnR5XyhrZXksIGRlc2NyaXB0b3IsIHByb3h5VHJhcCk7XG4gICAgfVxuICAgIGFzc2VydEFubm90YWJsZSh0aGlzLCBhbm5vdGF0aW9uLCBrZXkpO1xuICAgIHZhciBvdXRjb21lID0gYW5ub3RhdGlvbi5leHRlbmRfKHRoaXMsIGtleSwgZGVzY3JpcHRvciwgcHJveHlUcmFwKTtcbiAgICBpZiAob3V0Y29tZSkge1xuICAgICAgcmVjb3JkQW5ub3RhdGlvbkFwcGxpZWQodGhpcywgYW5ub3RhdGlvbiwga2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dGNvbWU7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7UHJvcGVydHlLZXl9IGtleVxuICAgKiBAcGFyYW0ge1Byb3BlcnR5RGVzY3JpcHRvcn0gZGVzY3JpcHRvclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHByb3h5VHJhcCB3aGV0aGVyIGl0J3MgY2FsbGVkIGZyb20gcHJveHkgdHJhcFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbnxudWxsfSB0cnVlIG9uIHN1Y2Nlc3MsIGZhbHNlIG9uIGZhaWx1cmUgKHByb3h5VHJhcCArIG5vbi1jb25maWd1cmFibGUpLCBudWxsIHdoZW4gY2FuY2VsbGVkIGJ5IGludGVyY2VwdG9yXG4gICAqLztcbiAgX3Byb3RvLmRlZmluZVByb3BlcnR5XyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5XyhrZXksIGRlc2NyaXB0b3IsIHByb3h5VHJhcCkge1xuICAgIGlmIChwcm94eVRyYXAgPT09IHZvaWQgMCkge1xuICAgICAgcHJveHlUcmFwID0gZmFsc2U7XG4gICAgfVxuICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkKHRoaXMua2V5c0F0b21fKTtcbiAgICB0cnkge1xuICAgICAgc3RhcnRCYXRjaCgpO1xuICAgICAgLy8gRGVsZXRlXG4gICAgICB2YXIgZGVsZXRlT3V0Y29tZSA9IHRoaXMuZGVsZXRlXyhrZXkpO1xuICAgICAgaWYgKCFkZWxldGVPdXRjb21lKSB7XG4gICAgICAgIC8vIEZhaWx1cmUgb3IgaW50ZXJjZXB0ZWRcbiAgICAgICAgcmV0dXJuIGRlbGV0ZU91dGNvbWU7XG4gICAgICB9XG4gICAgICAvLyBBREQgaW50ZXJjZXB0b3JcbiAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnModGhpcykpIHtcbiAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5XyB8fCB0aGlzLnRhcmdldF8sXG4gICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgIHR5cGU6IEFERCxcbiAgICAgICAgICBuZXdWYWx1ZTogZGVzY3JpcHRvci52YWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3VmFsdWUgPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yLnZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgIGRlc2NyaXB0b3IgPSBfZXh0ZW5kcyh7fSwgZGVzY3JpcHRvciwge1xuICAgICAgICAgICAgdmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIERlZmluZVxuICAgICAgaWYgKHByb3h5VHJhcCkge1xuICAgICAgICBpZiAoIVJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGhpcy50YXJnZXRfLCBrZXksIGRlc2NyaXB0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLnRhcmdldF8sIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICB9XG4gICAgICAvLyBOb3RpZnlcbiAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlBZGRpdGlvbl8oa2V5LCBkZXNjcmlwdG9yLnZhbHVlKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgZW5kQmF0Y2goKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLy8gSWYgb3JpZ2luYWwgZGVzY3JpcHRvciBiZWNvbWVzIHJlbGV2YW50LCBtb3ZlIHRoaXMgdG8gYW5ub3RhdGlvbiBkaXJlY3RseVxuICA7XG4gIF9wcm90by5kZWZpbmVPYnNlcnZhYmxlUHJvcGVydHlfID0gZnVuY3Rpb24gZGVmaW5lT2JzZXJ2YWJsZVByb3BlcnR5XyhrZXksIHZhbHVlLCBlbmhhbmNlciwgcHJveHlUcmFwKSB7XG4gICAgaWYgKHByb3h5VHJhcCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm94eVRyYXAgPSBmYWxzZTtcbiAgICB9XG4gICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQodGhpcy5rZXlzQXRvbV8pO1xuICAgIHRyeSB7XG4gICAgICBzdGFydEJhdGNoKCk7XG4gICAgICAvLyBEZWxldGVcbiAgICAgIHZhciBkZWxldGVPdXRjb21lID0gdGhpcy5kZWxldGVfKGtleSk7XG4gICAgICBpZiAoIWRlbGV0ZU91dGNvbWUpIHtcbiAgICAgICAgLy8gRmFpbHVyZSBvciBpbnRlcmNlcHRlZFxuICAgICAgICByZXR1cm4gZGVsZXRlT3V0Y29tZTtcbiAgICAgIH1cbiAgICAgIC8vIEFERCBpbnRlcmNlcHRvclxuICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKHRoaXMsIHtcbiAgICAgICAgICBvYmplY3Q6IHRoaXMucHJveHlfIHx8IHRoaXMudGFyZ2V0XyxcbiAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgdHlwZTogQURELFxuICAgICAgICAgIG5ld1ZhbHVlOiB2YWx1ZVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgIH1cbiAgICAgIHZhciBjYWNoZWREZXNjcmlwdG9yID0gZ2V0Q2FjaGVkT2JzZXJ2YWJsZVByb3BEZXNjcmlwdG9yKGtleSk7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBnbG9iYWxTdGF0ZS5zYWZlRGVzY3JpcHRvcnMgPyB0aGlzLmlzUGxhaW5PYmplY3RfIDogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBjYWNoZWREZXNjcmlwdG9yLmdldCxcbiAgICAgICAgc2V0OiBjYWNoZWREZXNjcmlwdG9yLnNldFxuICAgICAgfTtcbiAgICAgIC8vIERlZmluZVxuICAgICAgaWYgKHByb3h5VHJhcCkge1xuICAgICAgICBpZiAoIVJlZmxlY3QuZGVmaW5lUHJvcGVydHkodGhpcy50YXJnZXRfLCBrZXksIGRlc2NyaXB0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLnRhcmdldF8sIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICB9XG4gICAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlVmFsdWUodmFsdWUsIGVuaGFuY2VyLCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB0aGlzLm5hbWVfICsgXCIuXCIgKyBrZXkudG9TdHJpbmcoKSA6IFwiT2JzZXJ2YWJsZU9iamVjdC5rZXlcIiwgZmFsc2UpO1xuICAgICAgdGhpcy52YWx1ZXNfLnNldChrZXksIG9ic2VydmFibGUpO1xuICAgICAgLy8gTm90aWZ5ICh2YWx1ZSBwb3NzaWJseSBjaGFuZ2VkIGJ5IE9ic2VydmFibGVWYWx1ZSlcbiAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlBZGRpdGlvbl8oa2V5LCBvYnNlcnZhYmxlLnZhbHVlXyk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGVuZEJhdGNoKCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8vIElmIG9yaWdpbmFsIGRlc2NyaXB0b3IgYmVjb21lcyByZWxldmFudCwgbW92ZSB0aGlzIHRvIGFubm90YXRpb24gZGlyZWN0bHlcbiAgO1xuICBfcHJvdG8uZGVmaW5lQ29tcHV0ZWRQcm9wZXJ0eV8gPSBmdW5jdGlvbiBkZWZpbmVDb21wdXRlZFByb3BlcnR5XyhrZXksIG9wdGlvbnMsIHByb3h5VHJhcCkge1xuICAgIGlmIChwcm94eVRyYXAgPT09IHZvaWQgMCkge1xuICAgICAgcHJveHlUcmFwID0gZmFsc2U7XG4gICAgfVxuICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkKHRoaXMua2V5c0F0b21fKTtcbiAgICB0cnkge1xuICAgICAgc3RhcnRCYXRjaCgpO1xuICAgICAgLy8gRGVsZXRlXG4gICAgICB2YXIgZGVsZXRlT3V0Y29tZSA9IHRoaXMuZGVsZXRlXyhrZXkpO1xuICAgICAgaWYgKCFkZWxldGVPdXRjb21lKSB7XG4gICAgICAgIC8vIEZhaWx1cmUgb3IgaW50ZXJjZXB0ZWRcbiAgICAgICAgcmV0dXJuIGRlbGV0ZU91dGNvbWU7XG4gICAgICB9XG4gICAgICAvLyBBREQgaW50ZXJjZXB0b3JcbiAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnModGhpcykpIHtcbiAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5XyB8fCB0aGlzLnRhcmdldF8sXG4gICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgIHR5cGU6IEFERCxcbiAgICAgICAgICBuZXdWYWx1ZTogdW5kZWZpbmVkXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWNoYW5nZSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvcHRpb25zLm5hbWUgfHwgKG9wdGlvbnMubmFtZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHRoaXMubmFtZV8gKyBcIi5cIiArIGtleS50b1N0cmluZygpIDogXCJPYnNlcnZhYmxlT2JqZWN0LmtleVwiKTtcbiAgICAgIG9wdGlvbnMuY29udGV4dCA9IHRoaXMucHJveHlfIHx8IHRoaXMudGFyZ2V0XztcbiAgICAgIHZhciBjYWNoZWREZXNjcmlwdG9yID0gZ2V0Q2FjaGVkT2JzZXJ2YWJsZVByb3BEZXNjcmlwdG9yKGtleSk7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBnbG9iYWxTdGF0ZS5zYWZlRGVzY3JpcHRvcnMgPyB0aGlzLmlzUGxhaW5PYmplY3RfIDogdHJ1ZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGdldDogY2FjaGVkRGVzY3JpcHRvci5nZXQsXG4gICAgICAgIHNldDogY2FjaGVkRGVzY3JpcHRvci5zZXRcbiAgICAgIH07XG4gICAgICAvLyBEZWZpbmVcbiAgICAgIGlmIChwcm94eVRyYXApIHtcbiAgICAgICAgaWYgKCFSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRoaXMudGFyZ2V0Xywga2V5LCBkZXNjcmlwdG9yKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmaW5lUHJvcGVydHkodGhpcy50YXJnZXRfLCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgfVxuICAgICAgdGhpcy52YWx1ZXNfLnNldChrZXksIG5ldyBDb21wdXRlZFZhbHVlKG9wdGlvbnMpKTtcbiAgICAgIC8vIE5vdGlmeVxuICAgICAgdGhpcy5ub3RpZnlQcm9wZXJ0eUFkZGl0aW9uXyhrZXksIHVuZGVmaW5lZCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGVuZEJhdGNoKCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge1Byb3BlcnR5S2V5fSBrZXlcbiAgICogQHBhcmFtIHtQcm9wZXJ0eURlc2NyaXB0b3J9IGRlc2NyaXB0b3JcbiAgICogQHBhcmFtIHtib29sZWFufSBwcm94eVRyYXAgd2hldGhlciBpdCdzIGNhbGxlZCBmcm9tIHByb3h5IHRyYXBcbiAgICogQHJldHVybnMge2Jvb2xlYW58bnVsbH0gdHJ1ZSBvbiBzdWNjZXNzLCBmYWxzZSBvbiBmYWlsdXJlIChwcm94eVRyYXAgKyBub24tY29uZmlndXJhYmxlKSwgbnVsbCB3aGVuIGNhbmNlbGxlZCBieSBpbnRlcmNlcHRvclxuICAgKi87XG4gIF9wcm90by5kZWxldGVfID0gZnVuY3Rpb24gZGVsZXRlXyhrZXksIHByb3h5VHJhcCkge1xuICAgIGlmIChwcm94eVRyYXAgPT09IHZvaWQgMCkge1xuICAgICAgcHJveHlUcmFwID0gZmFsc2U7XG4gICAgfVxuICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkKHRoaXMua2V5c0F0b21fKTtcbiAgICAvLyBObyBzdWNoIHByb3BcbiAgICBpZiAoIWhhc1Byb3AodGhpcy50YXJnZXRfLCBrZXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLy8gSW50ZXJjZXB0XG4gICAgaWYgKGhhc0ludGVyY2VwdG9ycyh0aGlzKSkge1xuICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgIG9iamVjdDogdGhpcy5wcm94eV8gfHwgdGhpcy50YXJnZXRfLFxuICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgIHR5cGU6IFJFTU9WRVxuICAgICAgfSk7XG4gICAgICAvLyBDYW5jZWxsZWRcbiAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBEZWxldGVcbiAgICB0cnkge1xuICAgICAgdmFyIF90aGlzJHBlbmRpbmdLZXlzXywgX3RoaXMkcGVuZGluZ0tleXNfJGdlO1xuICAgICAgc3RhcnRCYXRjaCgpO1xuICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyh0aGlzKTtcbiAgICAgIHZhciBub3RpZnlTcHkgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgaXNTcHlFbmFibGVkKCk7XG4gICAgICB2YXIgb2JzZXJ2YWJsZSA9IHRoaXMudmFsdWVzXy5nZXQoa2V5KTtcbiAgICAgIC8vIFZhbHVlIG5lZWRlZCBmb3Igc3BpZXMvbGlzdGVuZXJzXG4gICAgICB2YXIgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAvLyBPcHRpbWl6YXRpb246IGRvbid0IHB1bGwgdGhlIHZhbHVlIHVubGVzcyB3ZSB3aWxsIG5lZWQgaXRcbiAgICAgIGlmICghb2JzZXJ2YWJsZSAmJiAobm90aWZ5IHx8IG5vdGlmeVNweSkpIHtcbiAgICAgICAgdmFyIF9nZXREZXNjcmlwdG9yO1xuICAgICAgICB2YWx1ZSA9IChfZ2V0RGVzY3JpcHRvciA9IGdldERlc2NyaXB0b3IodGhpcy50YXJnZXRfLCBrZXkpKSA9PSBudWxsID8gdm9pZCAwIDogX2dldERlc2NyaXB0b3IudmFsdWU7XG4gICAgICB9XG4gICAgICAvLyBkZWxldGUgcHJvcCAoZG8gZmlyc3QsIG1heSBmYWlsKVxuICAgICAgaWYgKHByb3h5VHJhcCkge1xuICAgICAgICBpZiAoIVJlZmxlY3QuZGVsZXRlUHJvcGVydHkodGhpcy50YXJnZXRfLCBrZXkpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpcy50YXJnZXRfW2tleV07XG4gICAgICB9XG4gICAgICAvLyBBbGxvdyByZS1hbm5vdGF0aW5nIHRoaXMgZmllbGRcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuYXBwbGllZEFubm90YXRpb25zX1trZXldO1xuICAgICAgfVxuICAgICAgLy8gQ2xlYXIgb2JzZXJ2YWJsZVxuICAgICAgaWYgKG9ic2VydmFibGUpIHtcbiAgICAgICAgdGhpcy52YWx1ZXNfW1wiZGVsZXRlXCJdKGtleSk7XG4gICAgICAgIC8vIGZvciBjb21wdXRlZCwgdmFsdWUgaXMgdW5kZWZpbmVkXG4gICAgICAgIGlmIChvYnNlcnZhYmxlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVZhbHVlKSB7XG4gICAgICAgICAgdmFsdWUgPSBvYnNlcnZhYmxlLnZhbHVlXztcbiAgICAgICAgfVxuICAgICAgICAvLyBOb3RpZnk6IGF1dG9ydW4oKCkgPT4gb2JqW2tleV0pLCBzZWUgIzE3OTZcbiAgICAgICAgcHJvcGFnYXRlQ2hhbmdlZChvYnNlcnZhYmxlKTtcbiAgICAgIH1cbiAgICAgIC8vIE5vdGlmeSBcImtleXMvZW50cmllcy92YWx1ZXNcIiBvYnNlcnZlcnNcbiAgICAgIHRoaXMua2V5c0F0b21fLnJlcG9ydENoYW5nZWQoKTtcbiAgICAgIC8vIE5vdGlmeSBcImhhc1wiIG9ic2VydmVyc1xuICAgICAgLy8gXCJpblwiIGFzIGl0IG1heSBzdGlsbCBleGlzdCBpbiBwcm90b1xuICAgICAgKF90aGlzJHBlbmRpbmdLZXlzXyA9IHRoaXMucGVuZGluZ0tleXNfKSA9PSBudWxsID8gdm9pZCAwIDogKF90aGlzJHBlbmRpbmdLZXlzXyRnZSA9IF90aGlzJHBlbmRpbmdLZXlzXy5nZXQoa2V5KSkgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJHBlbmRpbmdLZXlzXyRnZS5zZXQoa2V5IGluIHRoaXMudGFyZ2V0Xyk7XG4gICAgICAvLyBOb3RpZnkgc3BpZXMvbGlzdGVuZXJzXG4gICAgICBpZiAobm90aWZ5IHx8IG5vdGlmeVNweSkge1xuICAgICAgICB2YXIgX2NoYW5nZTIgPSB7XG4gICAgICAgICAgdHlwZTogUkVNT1ZFLFxuICAgICAgICAgIG9ic2VydmFibGVLaW5kOiBcIm9iamVjdFwiLFxuICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eV8gfHwgdGhpcy50YXJnZXRfLFxuICAgICAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5uYW1lXyxcbiAgICAgICAgICBvbGRWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgbmFtZToga2V5XG4gICAgICAgIH07XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICAgICAgc3B5UmVwb3J0U3RhcnQoX2NoYW5nZTIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub3RpZnkpIHtcbiAgICAgICAgICBub3RpZnlMaXN0ZW5lcnModGhpcywgX2NoYW5nZTIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICAgICAgc3B5UmVwb3J0RW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgZW5kQmF0Y2goKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqXG4gICAqIE9ic2VydmVzIHRoaXMgb2JqZWN0LiBUcmlnZ2VycyBmb3IgdGhlIGV2ZW50cyAnYWRkJywgJ3VwZGF0ZScgYW5kICdkZWxldGUnLlxuICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9vYnNlcnZlXG4gICAqIGZvciBjYWxsYmFjayBkZXRhaWxzXG4gICAqLztcbiAgX3Byb3RvLm9ic2VydmVfID0gZnVuY3Rpb24gb2JzZXJ2ZV8oY2FsbGJhY2ssIGZpcmVJbW1lZGlhdGVseSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgZmlyZUltbWVkaWF0ZWx5ID09PSB0cnVlKSB7XG4gICAgICBkaWUoXCJgb2JzZXJ2ZWAgZG9lc24ndCBzdXBwb3J0IHRoZSBmaXJlIGltbWVkaWF0ZWx5IHByb3BlcnR5IGZvciBvYnNlcnZhYmxlIG9iamVjdHMuXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJMaXN0ZW5lcih0aGlzLCBjYWxsYmFjayk7XG4gIH07XG4gIF9wcm90by5pbnRlcmNlcHRfID0gZnVuY3Rpb24gaW50ZXJjZXB0XyhoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHJlZ2lzdGVySW50ZXJjZXB0b3IodGhpcywgaGFuZGxlcik7XG4gIH07XG4gIF9wcm90by5ub3RpZnlQcm9wZXJ0eUFkZGl0aW9uXyA9IGZ1bmN0aW9uIG5vdGlmeVByb3BlcnR5QWRkaXRpb25fKGtleSwgdmFsdWUpIHtcbiAgICB2YXIgX3RoaXMkcGVuZGluZ0tleXNfMiwgX3RoaXMkcGVuZGluZ0tleXNfMiRnO1xuICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnModGhpcyk7XG4gICAgdmFyIG5vdGlmeVNweSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBpc1NweUVuYWJsZWQoKTtcbiAgICBpZiAobm90aWZ5IHx8IG5vdGlmeVNweSkge1xuICAgICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHkgPyB7XG4gICAgICAgIHR5cGU6IEFERCxcbiAgICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwib2JqZWN0XCIsXG4gICAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5uYW1lXyxcbiAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5XyB8fCB0aGlzLnRhcmdldF8sXG4gICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgbmV3VmFsdWU6IHZhbHVlXG4gICAgICB9IDogbnVsbDtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICAgIHNweVJlcG9ydFN0YXJ0KGNoYW5nZSk7XG4gICAgICB9XG4gICAgICBpZiAobm90aWZ5KSB7XG4gICAgICAgIG5vdGlmeUxpc3RlbmVycyh0aGlzLCBjaGFuZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgICAgc3B5UmVwb3J0RW5kKCk7XG4gICAgICB9XG4gICAgfVxuICAgIChfdGhpcyRwZW5kaW5nS2V5c18yID0gdGhpcy5wZW5kaW5nS2V5c18pID09IG51bGwgPyB2b2lkIDAgOiAoX3RoaXMkcGVuZGluZ0tleXNfMiRnID0gX3RoaXMkcGVuZGluZ0tleXNfMi5nZXQoa2V5KSkgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJHBlbmRpbmdLZXlzXzIkZy5zZXQodHJ1ZSk7XG4gICAgLy8gTm90aWZ5IFwia2V5cy9lbnRyaWVzL3ZhbHVlc1wiIG9ic2VydmVyc1xuICAgIHRoaXMua2V5c0F0b21fLnJlcG9ydENoYW5nZWQoKTtcbiAgfTtcbiAgX3Byb3RvLm93bktleXNfID0gZnVuY3Rpb24gb3duS2V5c18oKSB7XG4gICAgdGhpcy5rZXlzQXRvbV8ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICByZXR1cm4gb3duS2V5cyh0aGlzLnRhcmdldF8pO1xuICB9O1xuICBfcHJvdG8ua2V5c18gPSBmdW5jdGlvbiBrZXlzXygpIHtcbiAgICAvLyBSZXR1cm5zIGVudW1lcmFibGUgJiYgb3duLCBidXQgdW5mb3J0dW5hdGVseSBrZXlzQXRvbSB3aWxsIHJlcG9ydCBvbiBBTlkga2V5IGNoYW5nZS5cbiAgICAvLyBUaGVyZSBpcyBubyB3YXkgdG8gZGlzdGluZ3Vpc2ggYmV0d2VlbiBPYmplY3Qua2V5cyhvYmplY3QpIGFuZCBSZWZsZWN0Lm93bktleXMob2JqZWN0KSAtIGJvdGggYXJlIGhhbmRsZWQgYnkgb3duS2V5cyB0cmFwLlxuICAgIC8vIFdlIGNhbiBlaXRoZXIgb3Zlci1yZXBvcnQgaW4gT2JqZWN0LmtleXMob2JqZWN0KSBvciB1bmRlci1yZXBvcnQgaW4gUmVmbGVjdC5vd25LZXlzKG9iamVjdClcbiAgICAvLyBXZSBjaG9vc2UgdG8gb3Zlci1yZXBvcnQgaW4gT2JqZWN0LmtleXMob2JqZWN0KSwgYmVjYXVzZTpcbiAgICAvLyAtIHR5cGljYWxseSBpdCdzIHVzZWQgd2l0aCBzaW1wbGUgZGF0YSBvYmplY3RzXG4gICAgLy8gLSB3aGVuIHN5bWJvbGljL25vbi1lbnVtZXJhYmxlIGtleXMgYXJlIHJlbGV2YW50IFJlZmxlY3Qub3duS2V5cyB3b3JrcyBhcyBleHBlY3RlZFxuICAgIHRoaXMua2V5c0F0b21fLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMudGFyZ2V0Xyk7XG4gIH07XG4gIHJldHVybiBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb247XG59KCk7XG5mdW5jdGlvbiBhc09ic2VydmFibGVPYmplY3QodGFyZ2V0LCBvcHRpb25zKSB7XG4gIHZhciBfb3B0aW9ucyRuYW1lO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG9wdGlvbnMgJiYgaXNPYnNlcnZhYmxlT2JqZWN0KHRhcmdldCkpIHtcbiAgICBkaWUoXCJPcHRpb25zIGNhbid0IGJlIHByb3ZpZGVkIGZvciBhbHJlYWR5IG9ic2VydmFibGUgb2JqZWN0cy5cIik7XG4gIH1cbiAgaWYgKGhhc1Byb3AodGFyZ2V0LCAkbW9ieCkpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICEoZ2V0QWRtaW5pc3RyYXRpb24odGFyZ2V0KSBpbnN0YW5jZW9mIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbikpIHtcbiAgICAgIGRpZShcIkNhbm5vdCBjb252ZXJ0ICdcIiArIGdldERlYnVnTmFtZSh0YXJnZXQpICsgXCInIGludG8gb2JzZXJ2YWJsZSBvYmplY3Q6XCIgKyBcIlxcblRoZSB0YXJnZXQgaXMgYWxyZWFkeSBvYnNlcnZhYmxlIG9mIGRpZmZlcmVudCB0eXBlLlwiICsgXCJcXG5FeHRlbmRpbmcgYnVpbHRpbnMgaXMgbm90IHN1cHBvcnRlZC5cIik7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhT2JqZWN0LmlzRXh0ZW5zaWJsZSh0YXJnZXQpKSB7XG4gICAgZGllKFwiQ2Fubm90IG1ha2UgdGhlIGRlc2lnbmF0ZWQgb2JqZWN0IG9ic2VydmFibGU7IGl0IGlzIG5vdCBleHRlbnNpYmxlXCIpO1xuICB9XG4gIHZhciBuYW1lID0gKF9vcHRpb25zJG5hbWUgPSBvcHRpb25zID09IG51bGwgPyB2b2lkIDAgOiBvcHRpb25zLm5hbWUpICE9IG51bGwgPyBfb3B0aW9ucyRuYW1lIDogcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gKGlzUGxhaW5PYmplY3QodGFyZ2V0KSA/IFwiT2JzZXJ2YWJsZU9iamVjdFwiIDogdGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWUpICsgXCJAXCIgKyBnZXROZXh0SWQoKSA6IFwiT2JzZXJ2YWJsZU9iamVjdFwiO1xuICB2YXIgYWRtID0gbmV3IE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbih0YXJnZXQsIG5ldyBNYXAoKSwgU3RyaW5nKG5hbWUpLCBnZXRBbm5vdGF0aW9uRnJvbU9wdGlvbnMob3B0aW9ucykpO1xuICBhZGRIaWRkZW5Qcm9wKHRhcmdldCwgJG1vYngsIGFkbSk7XG4gIHJldHVybiB0YXJnZXQ7XG59XG52YXIgaXNPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZShcIk9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvblwiLCBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24pO1xuZnVuY3Rpb24gZ2V0Q2FjaGVkT2JzZXJ2YWJsZVByb3BEZXNjcmlwdG9yKGtleSkge1xuICByZXR1cm4gZGVzY3JpcHRvckNhY2hlW2tleV0gfHwgKGRlc2NyaXB0b3JDYWNoZVtrZXldID0ge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXNbJG1vYnhdLmdldE9ic2VydmFibGVQcm9wVmFsdWVfKGtleSk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXNbJG1vYnhdLnNldE9ic2VydmFibGVQcm9wVmFsdWVfKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBpc09ic2VydmFibGVPYmplY3QodGhpbmcpIHtcbiAgaWYgKGlzT2JqZWN0KHRoaW5nKSkge1xuICAgIHJldHVybiBpc09ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbih0aGluZ1skbW9ieF0pO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIHJlY29yZEFubm90YXRpb25BcHBsaWVkKGFkbSwgYW5ub3RhdGlvbiwga2V5KSB7XG4gIHZhciBfYWRtJHRhcmdldF8kc3RvcmVkQW47XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBhZG0uYXBwbGllZEFubm90YXRpb25zX1trZXldID0gYW5ub3RhdGlvbjtcbiAgfVxuICAvLyBSZW1vdmUgYXBwbGllZCBkZWNvcmF0b3IgYW5ub3RhdGlvbiBzbyB3ZSBkb24ndCB0cnkgdG8gYXBwbHkgaXQgYWdhaW4gaW4gc3ViY2xhc3MgY29uc3RydWN0b3JcbiAgKF9hZG0kdGFyZ2V0XyRzdG9yZWRBbiA9IGFkbS50YXJnZXRfW3N0b3JlZEFubm90YXRpb25zU3ltYm9sXSkgPT0gbnVsbCA/IHRydWUgOiBkZWxldGUgX2FkbSR0YXJnZXRfJHN0b3JlZEFuW2tleV07XG59XG5mdW5jdGlvbiBhc3NlcnRBbm5vdGFibGUoYWRtLCBhbm5vdGF0aW9uLCBrZXkpIHtcbiAgLy8gVmFsaWQgYW5ub3RhdGlvblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFpc0Fubm90YXRpb24oYW5ub3RhdGlvbikpIHtcbiAgICBkaWUoXCJDYW5ub3QgYW5ub3RhdGUgJ1wiICsgYWRtLm5hbWVfICsgXCIuXCIgKyBrZXkudG9TdHJpbmcoKSArIFwiJzogSW52YWxpZCBhbm5vdGF0aW9uLlwiKTtcbiAgfVxuICAvKlxuICAvLyBDb25maWd1cmFibGUsIG5vdCBzZWFsZWQsIG5vdCBmcm96ZW5cbiAgLy8gUG9zc2libHkgbm90IG5lZWRlZCwganVzdCBhIGxpdHRsZSBiZXR0ZXIgZXJyb3IgdGhlbiB0aGUgb25lIHRocm93biBieSBlbmdpbmUuXG4gIC8vIENhc2VzIHdoZXJlIHRoaXMgd291bGQgYmUgdXNlZnVsIHRoZSBtb3N0IChzdWJjbGFzcyBmaWVsZCBpbml0aWFsaXplcikgYXJlIG5vdCBpbnRlcmNlcHRhYmxlIGJ5IHRoaXMuXG4gIGlmIChfX0RFVl9fKSB7XG4gICAgICBjb25zdCBjb25maWd1cmFibGUgPSBnZXREZXNjcmlwdG9yKGFkbS50YXJnZXRfLCBrZXkpPy5jb25maWd1cmFibGVcbiAgICAgIGNvbnN0IGZyb3plbiA9IE9iamVjdC5pc0Zyb3plbihhZG0udGFyZ2V0XylcbiAgICAgIGNvbnN0IHNlYWxlZCA9IE9iamVjdC5pc1NlYWxlZChhZG0udGFyZ2V0XylcbiAgICAgIGlmICghY29uZmlndXJhYmxlIHx8IGZyb3plbiB8fCBzZWFsZWQpIHtcbiAgICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBgJHthZG0ubmFtZV99LiR7a2V5LnRvU3RyaW5nKCl9YFxuICAgICAgICAgIGNvbnN0IHJlcXVlc3RlZEFubm90YXRpb25UeXBlID0gYW5ub3RhdGlvbi5hbm5vdGF0aW9uVHlwZV9cbiAgICAgICAgICBsZXQgZXJyb3IgPSBgQ2Fubm90IGFwcGx5ICcke3JlcXVlc3RlZEFubm90YXRpb25UeXBlfScgdG8gJyR7ZmllbGROYW1lfSc6YFxuICAgICAgICAgIGlmIChmcm96ZW4pIHtcbiAgICAgICAgICAgICAgZXJyb3IgKz0gYFxcbk9iamVjdCBpcyBmcm96ZW4uYFxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2VhbGVkKSB7XG4gICAgICAgICAgICAgIGVycm9yICs9IGBcXG5PYmplY3QgaXMgc2VhbGVkLmBcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFjb25maWd1cmFibGUpIHtcbiAgICAgICAgICAgICAgZXJyb3IgKz0gYFxcbnByb3BlcnR5IGlzIG5vdCBjb25maWd1cmFibGUuYFxuICAgICAgICAgICAgICAvLyBNZW50aW9uIG9ubHkgaWYgY2F1c2VkIGJ5IHVzIHRvIGF2b2lkIGNvbmZ1c2lvblxuICAgICAgICAgICAgICBpZiAoaGFzUHJvcChhZG0uYXBwbGllZEFubm90YXRpb25zISwga2V5KSkge1xuICAgICAgICAgICAgICAgICAgZXJyb3IgKz0gYFxcblRvIHByZXZlbnQgYWNjaWRlbnRhbCByZS1kZWZpbml0aW9uIG9mIGEgZmllbGQgYnkgYSBzdWJjbGFzcywgYFxuICAgICAgICAgICAgICAgICAgZXJyb3IgKz0gYGFsbCBhbm5vdGF0ZWQgZmllbGRzIG9mIG5vbi1wbGFpbiBvYmplY3RzIChjbGFzc2VzKSBhcmUgbm90IGNvbmZpZ3VyYWJsZS5gXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZGllKGVycm9yKVxuICAgICAgfVxuICB9XG4gICovXG4gIC8vIE5vdCBhbm5vdGF0ZWRcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhaXNPdmVycmlkZShhbm5vdGF0aW9uKSAmJiBoYXNQcm9wKGFkbS5hcHBsaWVkQW5ub3RhdGlvbnNfLCBrZXkpKSB7XG4gICAgdmFyIGZpZWxkTmFtZSA9IGFkbS5uYW1lXyArIFwiLlwiICsga2V5LnRvU3RyaW5nKCk7XG4gICAgdmFyIGN1cnJlbnRBbm5vdGF0aW9uVHlwZSA9IGFkbS5hcHBsaWVkQW5ub3RhdGlvbnNfW2tleV0uYW5ub3RhdGlvblR5cGVfO1xuICAgIHZhciByZXF1ZXN0ZWRBbm5vdGF0aW9uVHlwZSA9IGFubm90YXRpb24uYW5ub3RhdGlvblR5cGVfO1xuICAgIGRpZShcIkNhbm5vdCBhcHBseSAnXCIgKyByZXF1ZXN0ZWRBbm5vdGF0aW9uVHlwZSArIFwiJyB0byAnXCIgKyBmaWVsZE5hbWUgKyBcIic6XCIgKyAoXCJcXG5UaGUgZmllbGQgaXMgYWxyZWFkeSBhbm5vdGF0ZWQgd2l0aCAnXCIgKyBjdXJyZW50QW5ub3RhdGlvblR5cGUgKyBcIicuXCIpICsgXCJcXG5SZS1hbm5vdGF0aW5nIGZpZWxkcyBpcyBub3QgYWxsb3dlZC5cIiArIFwiXFxuVXNlICdvdmVycmlkZScgYW5ub3RhdGlvbiBmb3IgbWV0aG9kcyBvdmVycmlkZGVuIGJ5IHN1YmNsYXNzLlwiKTtcbiAgfVxufVxuXG4vLyBCdWcgaW4gc2FmYXJpIDkuKiAob3IgaU9TIDkgc2FmYXJpIG1vYmlsZSkuIFNlZSAjMzY0XG52YXIgRU5UUllfMCA9IC8qI19fUFVSRV9fKi9jcmVhdGVBcnJheUVudHJ5RGVzY3JpcHRvcigwKTtcbnZhciBzYWZhcmlQcm90b3R5cGVTZXR0ZXJJbmhlcml0YW5jZUJ1ZyA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIHZhciB2ID0gZmFsc2U7XG4gIHZhciBwID0ge307XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwLCBcIjBcIiwge1xuICAgIHNldDogZnVuY3Rpb24gc2V0KCkge1xuICAgICAgdiA9IHRydWU7XG4gICAgfVxuICB9KTtcbiAgLyojX19QVVJFX18qL09iamVjdC5jcmVhdGUocClbXCIwXCJdID0gMTtcbiAgcmV0dXJuIHYgPT09IGZhbHNlO1xufSgpO1xuLyoqXG4gKiBUaGlzIGFycmF5IGJ1ZmZlciBjb250YWlucyB0d28gbGlzdHMgb2YgcHJvcGVydGllcywgc28gdGhhdCBhbGwgYXJyYXlzXG4gKiBjYW4gcmVjeWNsZSB0aGVpciBwcm9wZXJ0eSBkZWZpbml0aW9ucywgd2hpY2ggc2lnbmlmaWNhbnRseSBpbXByb3ZlcyBwZXJmb3JtYW5jZSBvZiBjcmVhdGluZ1xuICogcHJvcGVydGllcyBvbiB0aGUgZmx5LlxuICovXG52YXIgT0JTRVJWQUJMRV9BUlJBWV9CVUZGRVJfU0laRSA9IDA7XG4vLyBUeXBlc2NyaXB0IHdvcmthcm91bmQgdG8gbWFrZSBzdXJlIE9ic2VydmFibGVBcnJheSBleHRlbmRzIEFycmF5XG52YXIgU3R1YkFycmF5ID0gZnVuY3Rpb24gU3R1YkFycmF5KCkge307XG5mdW5jdGlvbiBpbmhlcml0KGN0b3IsIHByb3RvKSB7XG4gIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoY3Rvci5wcm90b3R5cGUsIHByb3RvKTtcbiAgfSBlbHNlIGlmIChjdG9yLnByb3RvdHlwZS5fX3Byb3RvX18gIT09IHVuZGVmaW5lZCkge1xuICAgIGN0b3IucHJvdG90eXBlLl9fcHJvdG9fXyA9IHByb3RvO1xuICB9IGVsc2Uge1xuICAgIGN0b3IucHJvdG90eXBlID0gcHJvdG87XG4gIH1cbn1cbmluaGVyaXQoU3R1YkFycmF5LCBBcnJheS5wcm90b3R5cGUpO1xuLy8gV2VleCBwcm90byBmcmVlemUgcHJvdGVjdGlvbiB3YXMgaGVyZSxcbi8vIGJ1dCBpdCBpcyB1bmNsZWFyIHdoeSB0aGUgaGFjayBpcyBuZWVkIGFzIE1vYlggbmV2ZXIgY2hhbmdlZCB0aGUgcHJvdG90eXBlXG4vLyBhbnl3YXksIHNvIHJlbW92ZWQgaXQgaW4gVjZcbnZhciBMZWdhY3lPYnNlcnZhYmxlQXJyYXkgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9TdHViQXJyYXksIF9TeW1ib2wkdG9TdHJpbmdUYWcsIF9TeW1ib2wkaXRlcmF0b3IpIHtcbiAgX2luaGVyaXRzTG9vc2UoTGVnYWN5T2JzZXJ2YWJsZUFycmF5LCBfU3R1YkFycmF5KTtcbiAgZnVuY3Rpb24gTGVnYWN5T2JzZXJ2YWJsZUFycmF5KGluaXRpYWxWYWx1ZXMsIGVuaGFuY2VyLCBuYW1lLCBvd25lZCkge1xuICAgIHZhciBfdGhpcztcbiAgICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7XG4gICAgICBuYW1lID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJPYnNlcnZhYmxlQXJyYXlAXCIgKyBnZXROZXh0SWQoKSA6IFwiT2JzZXJ2YWJsZUFycmF5XCI7XG4gICAgfVxuICAgIGlmIChvd25lZCA9PT0gdm9pZCAwKSB7XG4gICAgICBvd25lZCA9IGZhbHNlO1xuICAgIH1cbiAgICBfdGhpcyA9IF9TdHViQXJyYXkuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIGluaXRPYnNlcnZhYmxlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhZG0gPSBuZXcgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24obmFtZSwgZW5oYW5jZXIsIG93bmVkLCB0cnVlKTtcbiAgICAgIGFkbS5wcm94eV8gPSBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKTtcbiAgICAgIGFkZEhpZGRlbkZpbmFsUHJvcChfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgJG1vYngsIGFkbSk7XG4gICAgICBpZiAoaW5pdGlhbFZhbHVlcyAmJiBpbml0aWFsVmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIF90aGlzLnNwbGljZVdpdGhBcnJheSgwLCAwLCBpbml0aWFsVmFsdWVzKTtcbiAgICAgIH1cbiAgICAgIGlmIChzYWZhcmlQcm90b3R5cGVTZXR0ZXJJbmhlcml0YW5jZUJ1Zykge1xuICAgICAgICAvLyBTZWVtcyB0aGF0IFNhZmFyaSB3b24ndCB1c2UgbnVtZXJpYyBwcm90b3R5cGUgc2V0dGVyIHVudGlsIGFueSAqIG51bWVyaWMgcHJvcGVydHkgaXNcbiAgICAgICAgLy8gZGVmaW5lZCBvbiB0aGUgaW5zdGFuY2UuIEFmdGVyIHRoYXQgaXQgd29ya3MgZmluZSwgZXZlbiBpZiB0aGlzIHByb3BlcnR5IGlzIGRlbGV0ZWQuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYXNzZXJ0VGhpc0luaXRpYWxpemVkKF90aGlzKSwgXCIwXCIsIEVOVFJZXzApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICB2YXIgX3Byb3RvID0gTGVnYWN5T2JzZXJ2YWJsZUFycmF5LnByb3RvdHlwZTtcbiAgX3Byb3RvLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCgpIHtcbiAgICB0aGlzWyRtb2J4XS5hdG9tXy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcnJheXMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcnJheXNbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KHRoaXMuc2xpY2UoKSxcbiAgICAvL0B0cy1pZ25vcmVcbiAgICBhcnJheXMubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gaXNPYnNlcnZhYmxlQXJyYXkoYSkgPyBhLnNsaWNlKCkgOiBhO1xuICAgIH0pKTtcbiAgfTtcbiAgX3Byb3RvW19TeW1ib2wkaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgbmV4dEluZGV4ID0gMDtcbiAgICByZXR1cm4gbWFrZUl0ZXJhYmxlKHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgIHJldHVybiBuZXh0SW5kZXggPCBzZWxmLmxlbmd0aCA/IHtcbiAgICAgICAgICB2YWx1ZTogc2VsZltuZXh0SW5kZXgrK10sXG4gICAgICAgICAgZG9uZTogZmFsc2VcbiAgICAgICAgfSA6IHtcbiAgICAgICAgICBkb25lOiB0cnVlLFxuICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWRcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgX2NyZWF0ZUNsYXNzKExlZ2FjeU9ic2VydmFibGVBcnJheSwgW3tcbiAgICBrZXk6IFwibGVuZ3RoXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpc1skbW9ieF0uZ2V0QXJyYXlMZW5ndGhfKCk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChuZXdMZW5ndGgpIHtcbiAgICAgIHRoaXNbJG1vYnhdLnNldEFycmF5TGVuZ3RoXyhuZXdMZW5ndGgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogX1N5bWJvbCR0b1N0cmluZ1RhZyxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBcIkFycmF5XCI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBMZWdhY3lPYnNlcnZhYmxlQXJyYXk7XG59KFN0dWJBcnJheSwgU3ltYm9sLnRvU3RyaW5nVGFnLCBTeW1ib2wuaXRlcmF0b3IpO1xuT2JqZWN0LmVudHJpZXMoYXJyYXlFeHRlbnNpb25zKS5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gIHZhciBwcm9wID0gX3JlZlswXSxcbiAgICBmbiA9IF9yZWZbMV07XG4gIGlmIChwcm9wICE9PSBcImNvbmNhdFwiKSB7XG4gICAgYWRkSGlkZGVuUHJvcChMZWdhY3lPYnNlcnZhYmxlQXJyYXkucHJvdG90eXBlLCBwcm9wLCBmbik7XG4gIH1cbn0pO1xuZnVuY3Rpb24gY3JlYXRlQXJyYXlFbnRyeURlc2NyaXB0b3IoaW5kZXgpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpc1skbW9ieF0uZ2V0XyhpbmRleCk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgdGhpc1skbW9ieF0uc2V0XyhpbmRleCwgdmFsdWUpO1xuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUFycmF5QnVmZmVySXRlbShpbmRleCkge1xuICBkZWZpbmVQcm9wZXJ0eShMZWdhY3lPYnNlcnZhYmxlQXJyYXkucHJvdG90eXBlLCBcIlwiICsgaW5kZXgsIGNyZWF0ZUFycmF5RW50cnlEZXNjcmlwdG9yKGluZGV4KSk7XG59XG5mdW5jdGlvbiByZXNlcnZlQXJyYXlCdWZmZXIobWF4KSB7XG4gIGlmIChtYXggPiBPQlNFUlZBQkxFX0FSUkFZX0JVRkZFUl9TSVpFKSB7XG4gICAgZm9yICh2YXIgaW5kZXggPSBPQlNFUlZBQkxFX0FSUkFZX0JVRkZFUl9TSVpFOyBpbmRleCA8IG1heCArIDEwMDsgaW5kZXgrKykge1xuICAgICAgY3JlYXRlQXJyYXlCdWZmZXJJdGVtKGluZGV4KTtcbiAgICB9XG4gICAgT0JTRVJWQUJMRV9BUlJBWV9CVUZGRVJfU0laRSA9IG1heDtcbiAgfVxufVxucmVzZXJ2ZUFycmF5QnVmZmVyKDEwMDApO1xuZnVuY3Rpb24gY3JlYXRlTGVnYWN5QXJyYXkoaW5pdGlhbFZhbHVlcywgZW5oYW5jZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBMZWdhY3lPYnNlcnZhYmxlQXJyYXkoaW5pdGlhbFZhbHVlcywgZW5oYW5jZXIsIG5hbWUpO1xufVxuXG5mdW5jdGlvbiBnZXRBdG9tKHRoaW5nLCBwcm9wZXJ0eSkge1xuICBpZiAodHlwZW9mIHRoaW5nID09PSBcIm9iamVjdFwiICYmIHRoaW5nICE9PSBudWxsKSB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZUFycmF5KHRoaW5nKSkge1xuICAgICAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGllKDIzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGluZ1skbW9ieF0uYXRvbV87XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVTZXQodGhpbmcpKSB7XG4gICAgICByZXR1cm4gdGhpbmcuYXRvbV87XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVNYXAodGhpbmcpKSB7XG4gICAgICBpZiAocHJvcGVydHkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpbmcua2V5c0F0b21fO1xuICAgICAgfVxuICAgICAgdmFyIG9ic2VydmFibGUgPSB0aGluZy5kYXRhXy5nZXQocHJvcGVydHkpIHx8IHRoaW5nLmhhc01hcF8uZ2V0KHByb3BlcnR5KTtcbiAgICAgIGlmICghb2JzZXJ2YWJsZSkge1xuICAgICAgICBkaWUoMjUsIHByb3BlcnR5LCBnZXREZWJ1Z05hbWUodGhpbmcpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KHRoaW5nKSkge1xuICAgICAgaWYgKCFwcm9wZXJ0eSkge1xuICAgICAgICByZXR1cm4gZGllKDI2KTtcbiAgICAgIH1cbiAgICAgIHZhciBfb2JzZXJ2YWJsZSA9IHRoaW5nWyRtb2J4XS52YWx1ZXNfLmdldChwcm9wZXJ0eSk7XG4gICAgICBpZiAoIV9vYnNlcnZhYmxlKSB7XG4gICAgICAgIGRpZSgyNywgcHJvcGVydHksIGdldERlYnVnTmFtZSh0aGluZykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIF9vYnNlcnZhYmxlO1xuICAgIH1cbiAgICBpZiAoaXNBdG9tKHRoaW5nKSB8fCBpc0NvbXB1dGVkVmFsdWUodGhpbmcpIHx8IGlzUmVhY3Rpb24odGhpbmcpKSB7XG4gICAgICByZXR1cm4gdGhpbmc7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpbmcpKSB7XG4gICAgaWYgKGlzUmVhY3Rpb24odGhpbmdbJG1vYnhdKSkge1xuICAgICAgLy8gZGlzcG9zZXIgZnVuY3Rpb25cbiAgICAgIHJldHVybiB0aGluZ1skbW9ieF07XG4gICAgfVxuICB9XG4gIGRpZSgyOCk7XG59XG5mdW5jdGlvbiBnZXRBZG1pbmlzdHJhdGlvbih0aGluZywgcHJvcGVydHkpIHtcbiAgaWYgKCF0aGluZykge1xuICAgIGRpZSgyOSk7XG4gIH1cbiAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZ2V0QWRtaW5pc3RyYXRpb24oZ2V0QXRvbSh0aGluZywgcHJvcGVydHkpKTtcbiAgfVxuICBpZiAoaXNBdG9tKHRoaW5nKSB8fCBpc0NvbXB1dGVkVmFsdWUodGhpbmcpIHx8IGlzUmVhY3Rpb24odGhpbmcpKSB7XG4gICAgcmV0dXJuIHRoaW5nO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVNYXAodGhpbmcpIHx8IGlzT2JzZXJ2YWJsZVNldCh0aGluZykpIHtcbiAgICByZXR1cm4gdGhpbmc7XG4gIH1cbiAgaWYgKHRoaW5nWyRtb2J4XSkge1xuICAgIHJldHVybiB0aGluZ1skbW9ieF07XG4gIH1cbiAgZGllKDI0LCB0aGluZyk7XG59XG5mdW5jdGlvbiBnZXREZWJ1Z05hbWUodGhpbmcsIHByb3BlcnR5KSB7XG4gIHZhciBuYW1lZDtcbiAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICBuYW1lZCA9IGdldEF0b20odGhpbmcsIHByb3BlcnR5KTtcbiAgfSBlbHNlIGlmIChpc0FjdGlvbih0aGluZykpIHtcbiAgICByZXR1cm4gdGhpbmcubmFtZTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGVPYmplY3QodGhpbmcpIHx8IGlzT2JzZXJ2YWJsZU1hcCh0aGluZykgfHwgaXNPYnNlcnZhYmxlU2V0KHRoaW5nKSkge1xuICAgIG5hbWVkID0gZ2V0QWRtaW5pc3RyYXRpb24odGhpbmcpO1xuICB9IGVsc2Uge1xuICAgIC8vIHZhbGlkIGZvciBhcnJheXMgYXMgd2VsbFxuICAgIG5hbWVkID0gZ2V0QXRvbSh0aGluZyk7XG4gIH1cbiAgcmV0dXJuIG5hbWVkLm5hbWVfO1xufVxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gZm9yIGluaXRpYWxpemluZyBvYnNlcnZhYmxlIHN0cnVjdHVyZXMsIGl0IGFwcGxpZXM6XG4gKiAxLiBhbGxvd1N0YXRlQ2hhbmdlcyBzbyB3ZSBkb24ndCB2aW9sYXRlIGVuZm9yY2VBY3Rpb25zLlxuICogMi4gdW50cmFja2VkIHNvIHdlIGRvbid0IGFjY2lkZW50YWx5IHN1YnNjcmliZSB0byBhbnl0aGluZyBvYnNlcnZhYmxlIGFjY2Vzc2VkIGR1cmluZyBpbml0IGluIGNhc2UgdGhlIG9ic2VydmFibGUgaXMgY3JlYXRlZCBpbnNpZGUgZGVyaXZhdGlvbi5cbiAqIDMuIGJhdGNoIHRvIGF2b2lkIHN0YXRlIHZlcnNpb24gdXBkYXRlc1xuICovXG5mdW5jdGlvbiBpbml0T2JzZXJ2YWJsZShjYikge1xuICB2YXIgZGVyaXZhdGlvbiA9IHVudHJhY2tlZFN0YXJ0KCk7XG4gIHZhciBhbGxvd1N0YXRlQ2hhbmdlcyA9IGFsbG93U3RhdGVDaGFuZ2VzU3RhcnQodHJ1ZSk7XG4gIHN0YXJ0QmF0Y2goKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gY2IoKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBlbmRCYXRjaCgpO1xuICAgIGFsbG93U3RhdGVDaGFuZ2VzRW5kKGFsbG93U3RhdGVDaGFuZ2VzKTtcbiAgICB1bnRyYWNrZWRFbmQoZGVyaXZhdGlvbik7XG4gIH1cbn1cblxudmFyIHRvU3RyaW5nID0gb2JqZWN0UHJvdG90eXBlLnRvU3RyaW5nO1xuZnVuY3Rpb24gZGVlcEVxdWFsKGEsIGIsIGRlcHRoKSB7XG4gIGlmIChkZXB0aCA9PT0gdm9pZCAwKSB7XG4gICAgZGVwdGggPSAtMTtcbiAgfVxuICByZXR1cm4gZXEoYSwgYiwgZGVwdGgpO1xufVxuLy8gQ29waWVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2phc2hrZW5hcy91bmRlcnNjb3JlL2Jsb2IvNWMyMzdhN2M2ODJmYjY4ZmQ1Mzc4MjAzZjBiZjIyZGNlMTYyNDg1NC91bmRlcnNjb3JlLmpzI0wxMTg2LUwxMjg5XG4vLyBJbnRlcm5hbCByZWN1cnNpdmUgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgYGlzRXF1YWxgLlxuZnVuY3Rpb24gZXEoYSwgYiwgZGVwdGgsIGFTdGFjaywgYlN0YWNrKSB7XG4gIC8vIElkZW50aWNhbCBvYmplY3RzIGFyZSBlcXVhbC4gYDAgPT09IC0wYCwgYnV0IHRoZXkgYXJlbid0IGlkZW50aWNhbC5cbiAgLy8gU2VlIHRoZSBbSGFybW9ueSBgZWdhbGAgcHJvcG9zYWxdKGh0dHA6Ly93aWtpLmVjbWFzY3JpcHQub3JnL2Rva3UucGhwP2lkPWhhcm1vbnk6ZWdhbCkuXG4gIGlmIChhID09PSBiKSB7XG4gICAgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICB9XG4gIC8vIGBudWxsYCBvciBgdW5kZWZpbmVkYCBvbmx5IGVxdWFsIHRvIGl0c2VsZiAoc3RyaWN0IGNvbXBhcmlzb24pLlxuICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxuICBpZiAoYSAhPT0gYSkge1xuICAgIHJldHVybiBiICE9PSBiO1xuICB9XG4gIC8vIEV4aGF1c3QgcHJpbWl0aXZlIGNoZWNrc1xuICB2YXIgdHlwZSA9IHR5cGVvZiBhO1xuICBpZiAodHlwZSAhPT0gXCJmdW5jdGlvblwiICYmIHR5cGUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGIgIT0gXCJvYmplY3RcIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBDb21wYXJlIGBbW0NsYXNzXV1gIG5hbWVzLlxuICB2YXIgY2xhc3NOYW1lID0gdG9TdHJpbmcuY2FsbChhKTtcbiAgaWYgKGNsYXNzTmFtZSAhPT0gdG9TdHJpbmcuY2FsbChiKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xuICAgIC8vIFN0cmluZ3MsIG51bWJlcnMsIHJlZ3VsYXIgZXhwcmVzc2lvbnMsIGRhdGVzLCBhbmQgYm9vbGVhbnMgYXJlIGNvbXBhcmVkIGJ5IHZhbHVlLlxuICAgIGNhc2UgXCJbb2JqZWN0IFJlZ0V4cF1cIjpcbiAgICAvLyBSZWdFeHBzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgZm9yIGNvbXBhcmlzb24gKE5vdGU6ICcnICsgL2EvaSA9PT0gJy9hL2knKVxuICAgIGNhc2UgXCJbb2JqZWN0IFN0cmluZ11cIjpcbiAgICAgIC8vIFByaW1pdGl2ZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgb2JqZWN0IHdyYXBwZXJzIGFyZSBlcXVpdmFsZW50OyB0aHVzLCBgXCI1XCJgIGlzXG4gICAgICAvLyBlcXVpdmFsZW50IHRvIGBuZXcgU3RyaW5nKFwiNVwiKWAuXG4gICAgICByZXR1cm4gXCJcIiArIGEgPT09IFwiXCIgKyBiO1xuICAgIGNhc2UgXCJbb2JqZWN0IE51bWJlcl1cIjpcbiAgICAgIC8vIGBOYU5gcyBhcmUgZXF1aXZhbGVudCwgYnV0IG5vbi1yZWZsZXhpdmUuXG4gICAgICAvLyBPYmplY3QoTmFOKSBpcyBlcXVpdmFsZW50IHRvIE5hTi5cbiAgICAgIGlmICgrYSAhPT0gK2EpIHtcbiAgICAgICAgcmV0dXJuICtiICE9PSArYjtcbiAgICAgIH1cbiAgICAgIC8vIEFuIGBlZ2FsYCBjb21wYXJpc29uIGlzIHBlcmZvcm1lZCBmb3Igb3RoZXIgbnVtZXJpYyB2YWx1ZXMuXG4gICAgICByZXR1cm4gK2EgPT09IDAgPyAxIC8gK2EgPT09IDEgLyBiIDogK2EgPT09ICtiO1xuICAgIGNhc2UgXCJbb2JqZWN0IERhdGVdXCI6XG4gICAgY2FzZSBcIltvYmplY3QgQm9vbGVhbl1cIjpcbiAgICAgIC8vIENvZXJjZSBkYXRlcyBhbmQgYm9vbGVhbnMgdG8gbnVtZXJpYyBwcmltaXRpdmUgdmFsdWVzLiBEYXRlcyBhcmUgY29tcGFyZWQgYnkgdGhlaXJcbiAgICAgIC8vIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9ucy4gTm90ZSB0aGF0IGludmFsaWQgZGF0ZXMgd2l0aCBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnNcbiAgICAgIC8vIG9mIGBOYU5gIGFyZSBub3QgZXF1aXZhbGVudC5cbiAgICAgIHJldHVybiArYSA9PT0gK2I7XG4gICAgY2FzZSBcIltvYmplY3QgU3ltYm9sXVwiOlxuICAgICAgcmV0dXJuIHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgU3ltYm9sLnZhbHVlT2YuY2FsbChhKSA9PT0gU3ltYm9sLnZhbHVlT2YuY2FsbChiKTtcbiAgICBjYXNlIFwiW29iamVjdCBNYXBdXCI6XG4gICAgY2FzZSBcIltvYmplY3QgU2V0XVwiOlxuICAgICAgLy8gTWFwcyBhbmQgU2V0cyBhcmUgdW53cmFwcGVkIHRvIGFycmF5cyBvZiBlbnRyeS1wYWlycywgYWRkaW5nIGFuIGluY2lkZW50YWwgbGV2ZWwuXG4gICAgICAvLyBIaWRlIHRoaXMgZXh0cmEgbGV2ZWwgYnkgaW5jcmVhc2luZyB0aGUgZGVwdGguXG4gICAgICBpZiAoZGVwdGggPj0gMCkge1xuICAgICAgICBkZXB0aCsrO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cbiAgLy8gVW53cmFwIGFueSB3cmFwcGVkIG9iamVjdHMuXG4gIGEgPSB1bndyYXAoYSk7XG4gIGIgPSB1bndyYXAoYik7XG4gIHZhciBhcmVBcnJheXMgPSBjbGFzc05hbWUgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgaWYgKCFhcmVBcnJheXMpIHtcbiAgICBpZiAodHlwZW9mIGEgIT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgYiAhPSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIE9iamVjdHMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1aXZhbGVudCwgYnV0IGBPYmplY3RgcyBvciBgQXJyYXlgc1xuICAgIC8vIGZyb20gZGlmZmVyZW50IGZyYW1lcyBhcmUuXG4gICAgdmFyIGFDdG9yID0gYS5jb25zdHJ1Y3RvcixcbiAgICAgIGJDdG9yID0gYi5jb25zdHJ1Y3RvcjtcbiAgICBpZiAoYUN0b3IgIT09IGJDdG9yICYmICEoaXNGdW5jdGlvbihhQ3RvcikgJiYgYUN0b3IgaW5zdGFuY2VvZiBhQ3RvciAmJiBpc0Z1bmN0aW9uKGJDdG9yKSAmJiBiQ3RvciBpbnN0YW5jZW9mIGJDdG9yKSAmJiBcImNvbnN0cnVjdG9yXCIgaW4gYSAmJiBcImNvbnN0cnVjdG9yXCIgaW4gYikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoZGVwdGggPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSBpZiAoZGVwdGggPCAwKSB7XG4gICAgZGVwdGggPSAtMTtcbiAgfVxuICAvLyBBc3N1bWUgZXF1YWxpdHkgZm9yIGN5Y2xpYyBzdHJ1Y3R1cmVzLiBUaGUgYWxnb3JpdGhtIGZvciBkZXRlY3RpbmcgY3ljbGljXG4gIC8vIHN0cnVjdHVyZXMgaXMgYWRhcHRlZCBmcm9tIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMsIGFic3RyYWN0IG9wZXJhdGlvbiBgSk9gLlxuICAvLyBJbml0aWFsaXppbmcgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gIC8vIEl0J3MgZG9uZSBoZXJlIHNpbmNlIHdlIG9ubHkgbmVlZCB0aGVtIGZvciBvYmplY3RzIGFuZCBhcnJheXMgY29tcGFyaXNvbi5cbiAgYVN0YWNrID0gYVN0YWNrIHx8IFtdO1xuICBiU3RhY2sgPSBiU3RhY2sgfHwgW107XG4gIHZhciBsZW5ndGggPSBhU3RhY2subGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAvLyBMaW5lYXIgc2VhcmNoLiBQZXJmb3JtYW5jZSBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2ZcbiAgICAvLyB1bmlxdWUgbmVzdGVkIHN0cnVjdHVyZXMuXG4gICAgaWYgKGFTdGFja1tsZW5ndGhdID09PSBhKSB7XG4gICAgICByZXR1cm4gYlN0YWNrW2xlbmd0aF0gPT09IGI7XG4gICAgfVxuICB9XG4gIC8vIEFkZCB0aGUgZmlyc3Qgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgYVN0YWNrLnB1c2goYSk7XG4gIGJTdGFjay5wdXNoKGIpO1xuICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgaWYgKGFyZUFycmF5cykge1xuICAgIC8vIENvbXBhcmUgYXJyYXkgbGVuZ3RocyB0byBkZXRlcm1pbmUgaWYgYSBkZWVwIGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5LlxuICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggIT09IGIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICBpZiAoIWVxKGFbbGVuZ3RoXSwgYltsZW5ndGhdLCBkZXB0aCAtIDEsIGFTdGFjaywgYlN0YWNrKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIERlZXAgY29tcGFyZSBvYmplY3RzLlxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYSk7XG4gICAgdmFyIGtleTtcbiAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICAvLyBFbnN1cmUgdGhhdCBib3RoIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBudW1iZXIgb2YgcHJvcGVydGllcyBiZWZvcmUgY29tcGFyaW5nIGRlZXAgZXF1YWxpdHkuXG4gICAgaWYgKE9iamVjdC5rZXlzKGIpLmxlbmd0aCAhPT0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgLy8gRGVlcCBjb21wYXJlIGVhY2ggbWVtYmVyXG4gICAgICBrZXkgPSBrZXlzW2xlbmd0aF07XG4gICAgICBpZiAoIShoYXNQcm9wKGIsIGtleSkgJiYgZXEoYVtrZXldLCBiW2tleV0sIGRlcHRoIC0gMSwgYVN0YWNrLCBiU3RhY2spKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIFJlbW92ZSB0aGUgZmlyc3Qgb2JqZWN0IGZyb20gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICBhU3RhY2sucG9wKCk7XG4gIGJTdGFjay5wb3AoKTtcbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiB1bndyYXAoYSkge1xuICBpZiAoaXNPYnNlcnZhYmxlQXJyYXkoYSkpIHtcbiAgICByZXR1cm4gYS5zbGljZSgpO1xuICB9XG4gIGlmIChpc0VTNk1hcChhKSB8fCBpc09ic2VydmFibGVNYXAoYSkpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhLmVudHJpZXMoKSk7XG4gIH1cbiAgaWYgKGlzRVM2U2V0KGEpIHx8IGlzT2JzZXJ2YWJsZVNldChhKSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGEuZW50cmllcygpKTtcbiAgfVxuICByZXR1cm4gYTtcbn1cblxuZnVuY3Rpb24gbWFrZUl0ZXJhYmxlKGl0ZXJhdG9yKSB7XG4gIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBnZXRTZWxmO1xuICByZXR1cm4gaXRlcmF0b3I7XG59XG5mdW5jdGlvbiBnZXRTZWxmKCkge1xuICByZXR1cm4gdGhpcztcbn1cblxuZnVuY3Rpb24gaXNBbm5vdGF0aW9uKHRoaW5nKSB7XG4gIHJldHVybiAoXG4gICAgLy8gQ2FuIGJlIGZ1bmN0aW9uXG4gICAgdGhpbmcgaW5zdGFuY2VvZiBPYmplY3QgJiYgdHlwZW9mIHRoaW5nLmFubm90YXRpb25UeXBlXyA9PT0gXCJzdHJpbmdcIiAmJiBpc0Z1bmN0aW9uKHRoaW5nLm1ha2VfKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLmV4dGVuZF8pXG4gICk7XG59XG5cbi8qKlxuICogKGMpIE1pY2hlbCBXZXN0c3RyYXRlIDIwMTUgLSAyMDIwXG4gKiBNSVQgTGljZW5zZWRcbiAqXG4gKiBXZWxjb21lIHRvIHRoZSBtb2J4IHNvdXJjZXMhIFRvIGdldCBhIGdsb2JhbCBvdmVydmlldyBvZiBob3cgTW9iWCBpbnRlcm5hbGx5IHdvcmtzLFxuICogdGhpcyBpcyBhIGdvb2QgcGxhY2UgdG8gc3RhcnQ6XG4gKiBodHRwczovL21lZGl1bS5jb20vQG13ZXN0c3RyYXRlL2JlY29taW5nLWZ1bGx5LXJlYWN0aXZlLWFuLWluLWRlcHRoLWV4cGxhbmF0aW9uLW9mLW1vYnNlcnZhYmxlLTU1OTk1MjYyYTI1NCMueHZiaDZxZDc0XG4gKlxuICogU291cmNlIGZvbGRlcnM6XG4gKiA9PT09PT09PT09PT09PT1cbiAqXG4gKiAtIGFwaS8gICAgIE1vc3Qgb2YgdGhlIHB1YmxpYyBzdGF0aWMgbWV0aG9kcyBleHBvc2VkIGJ5IHRoZSBtb2R1bGUgY2FuIGJlIGZvdW5kIGhlcmUuXG4gKiAtIGNvcmUvICAgIEltcGxlbWVudGF0aW9uIG9mIHRoZSBNb2JYIGFsZ29yaXRobTsgYXRvbXMsIGRlcml2YXRpb25zLCByZWFjdGlvbnMsIGRlcGVuZGVuY3kgdHJlZXMsIG9wdGltaXphdGlvbnMuIENvb2wgc3R1ZmYgY2FuIGJlIGZvdW5kIGhlcmUuXG4gKiAtIHR5cGVzLyAgIEFsbCB0aGUgbWFnaWMgdGhhdCBpcyBuZWVkIHRvIGhhdmUgb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMgYW5kIHZhbHVlcyBpcyBpbiB0aGlzIGZvbGRlci4gSW5jbHVkaW5nIHRoZSBtb2RpZmllcnMgbGlrZSBgYXNGbGF0YC5cbiAqIC0gdXRpbHMvICAgVXRpbGl0eSBzdHVmZi5cbiAqXG4gKi9cbltcIlN5bWJvbFwiLCBcIk1hcFwiLCBcIlNldFwiXS5mb3JFYWNoKGZ1bmN0aW9uIChtKSB7XG4gIHZhciBnID0gZ2V0R2xvYmFsKCk7XG4gIGlmICh0eXBlb2YgZ1ttXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGRpZShcIk1vYlggcmVxdWlyZXMgZ2xvYmFsICdcIiArIG0gKyBcIicgdG8gYmUgYXZhaWxhYmxlIG9yIHBvbHlmaWxsZWRcIik7XG4gIH1cbn0pO1xuaWYgKHR5cGVvZiBfX01PQlhfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyA9PT0gXCJvYmplY3RcIikge1xuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmR5a29nL21vYngtZGV2dG9vbHMvXG4gIF9fTU9CWF9ERVZUT09MU19HTE9CQUxfSE9PS19fLmluamVjdE1vYngoe1xuICAgIHNweTogc3B5LFxuICAgIGV4dHJhczoge1xuICAgICAgZ2V0RGVidWdOYW1lOiBnZXREZWJ1Z05hbWVcbiAgICB9LFxuICAgICRtb2J4OiAkbW9ieFxuICB9KTtcbn1cblxuZXhwb3J0IHsgJG1vYngsIEZsb3dDYW5jZWxsYXRpb25FcnJvciwgT2JzZXJ2YWJsZU1hcCwgT2JzZXJ2YWJsZVNldCwgUmVhY3Rpb24sIGFsbG93U3RhdGVDaGFuZ2VzIGFzIF9hbGxvd1N0YXRlQ2hhbmdlcywgcnVuSW5BY3Rpb24gYXMgX2FsbG93U3RhdGVDaGFuZ2VzSW5zaWRlQ29tcHV0ZWQsIGFsbG93U3RhdGVSZWFkc0VuZCBhcyBfYWxsb3dTdGF0ZVJlYWRzRW5kLCBhbGxvd1N0YXRlUmVhZHNTdGFydCBhcyBfYWxsb3dTdGF0ZVJlYWRzU3RhcnQsIGF1dG9BY3Rpb24gYXMgX2F1dG9BY3Rpb24sIF9lbmRBY3Rpb24sIGdldEFkbWluaXN0cmF0aW9uIGFzIF9nZXRBZG1pbmlzdHJhdGlvbiwgZ2V0R2xvYmFsU3RhdGUgYXMgX2dldEdsb2JhbFN0YXRlLCBpbnRlcmNlcHRSZWFkcyBhcyBfaW50ZXJjZXB0UmVhZHMsIGlzQ29tcHV0aW5nRGVyaXZhdGlvbiBhcyBfaXNDb21wdXRpbmdEZXJpdmF0aW9uLCByZXNldEdsb2JhbFN0YXRlIGFzIF9yZXNldEdsb2JhbFN0YXRlLCBfc3RhcnRBY3Rpb24sIGFjdGlvbiwgYXV0b3J1biwgY29tcGFyZXIsIGNvbXB1dGVkLCBjb25maWd1cmUsIGNyZWF0ZUF0b20sIGFwaURlZmluZVByb3BlcnR5IGFzIGRlZmluZVByb3BlcnR5LCBlbnRyaWVzLCBleHRlbmRPYnNlcnZhYmxlLCBmbG93LCBmbG93UmVzdWx0LCBnZXQsIGdldEF0b20sIGdldERlYnVnTmFtZSwgZ2V0RGVwZW5kZW5jeVRyZWUsIGdldE9ic2VydmVyVHJlZSwgaGFzLCBpbnRlcmNlcHQsIGlzQWN0aW9uLCBpc09ic2VydmFibGVWYWx1ZSBhcyBpc0JveGVkT2JzZXJ2YWJsZSwgaXNDb21wdXRlZCwgaXNDb21wdXRlZFByb3AsIGlzRmxvdywgaXNGbG93Q2FuY2VsbGF0aW9uRXJyb3IsIGlzT2JzZXJ2YWJsZSwgaXNPYnNlcnZhYmxlQXJyYXksIGlzT2JzZXJ2YWJsZU1hcCwgaXNPYnNlcnZhYmxlT2JqZWN0LCBpc09ic2VydmFibGVQcm9wLCBpc09ic2VydmFibGVTZXQsIGtleXMsIG1ha2VBdXRvT2JzZXJ2YWJsZSwgbWFrZU9ic2VydmFibGUsIG9ic2VydmFibGUsIG9ic2VydmUsIG9uQmVjb21lT2JzZXJ2ZWQsIG9uQmVjb21lVW5vYnNlcnZlZCwgb25SZWFjdGlvbkVycm9yLCBvdmVycmlkZSwgYXBpT3duS2V5cyBhcyBvd25LZXlzLCByZWFjdGlvbiwgcmVtb3ZlLCBydW5JbkFjdGlvbiwgc2V0LCBzcHksIHRvSlMsIHRyYWNlLCB0cmFuc2FjdGlvbiwgdW50cmFja2VkLCB2YWx1ZXMsIHdoZW4gfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1vYnguZXNtLmpzLm1hcFxuIiwiaW1wb3J0IHsgbWFrZU9ic2VydmFibGUgfSBmcm9tIFwibW9ieFwiO1xuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmlmICghdXNlU3RhdGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJtb2J4LXJlYWN0LWxpdGUgcmVxdWlyZXMgUmVhY3Qgd2l0aCBIb29rcyBzdXBwb3J0XCIpO1xufVxuaWYgKCFtYWtlT2JzZXJ2YWJsZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm1vYngtcmVhY3QtbGl0ZUAzIHJlcXVpcmVzIG1vYnggYXQgbGVhc3QgdmVyc2lvbiA2IHRvIGJlIGF2YWlsYWJsZVwiKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFzc2VydEVudmlyb25tZW50LmpzLm1hcCIsImltcG9ydCB7IGNvbmZpZ3VyZSB9IGZyb20gXCJtb2J4XCI7XG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdE5vb3BCYXRjaChjYWxsYmFjaykge1xuICAgIGNhbGxiYWNrKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZXJCYXRjaGluZyhyZWFjdGlvblNjaGVkdWxlcikge1xuICAgIGlmICghcmVhY3Rpb25TY2hlZHVsZXIpIHtcbiAgICAgICAgcmVhY3Rpb25TY2hlZHVsZXIgPSBkZWZhdWx0Tm9vcEJhdGNoO1xuICAgICAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbTW9iWF0gRmFpbGVkIHRvIGdldCB1bnN0YWJsZV9iYXRjaGVkIHVwZGF0ZXMgZnJvbSByZWFjdC1kb20gLyByZWFjdC1uYXRpdmVcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uZmlndXJlKHsgcmVhY3Rpb25TY2hlZHVsZXI6IHJlYWN0aW9uU2NoZWR1bGVyIH0pO1xufVxuZXhwb3J0IHZhciBpc09ic2VydmVyQmF0Y2hlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIltNb2JYXSBEZXByZWNhdGVkXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZlckJhdGNoaW5nLmpzLm1hcCIsImltcG9ydCB7IGdldERlcGVuZGVuY3lUcmVlIH0gZnJvbSBcIm1vYnhcIjtcbmV4cG9ydCBmdW5jdGlvbiBwcmludERlYnVnVmFsdWUodikge1xuICAgIHJldHVybiBnZXREZXBlbmRlbmN5VHJlZSh2KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByaW50RGVidWdWYWx1ZS5qcy5tYXAiLCJleHBvcnQgdmFyIFJFR0lTVFJZX0ZJTkFMSVpFX0FGVEVSID0gMTAwMDA7XG5leHBvcnQgdmFyIFJFR0lTVFJZX1NXRUVQX0lOVEVSVkFMID0gMTAwMDA7XG52YXIgVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeShmaW5hbGl6ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJmaW5hbGl6ZVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogZmluYWxpemVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInJlZ2lzdHJhdGlvbnNcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IG5ldyBNYXAoKVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic3dlZXBUaW1lb3V0XCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiB2b2lkIDBcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEJvdW5kIHNvIGl0IGNhbiBiZSB1c2VkIGRpcmVjdGx5IGFzIHNldFRpbWVvdXQgY2FsbGJhY2suXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInN3ZWVwXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAobWF4QWdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1heEFnZSA9PT0gdm9pZCAwKSB7IG1heEFnZSA9IFJFR0lTVFJZX0ZJTkFMSVpFX0FGVEVSOyB9XG4gICAgICAgICAgICAgICAgLy8gY2FuY2VsIHRpbWVvdXQgc28gd2UgY2FuIGZvcmNlIHN3ZWVwIGFueXRpbWVcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoX3RoaXMuc3dlZXBUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5zd2VlcFRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgX3RoaXMucmVnaXN0cmF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChyZWdpc3RyYXRpb24sIHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub3cgLSByZWdpc3RyYXRpb24ucmVnaXN0ZXJlZEF0ID49IG1heEFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZmluYWxpemUocmVnaXN0cmF0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnJlZ2lzdHJhdGlvbnMuZGVsZXRlKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5yZWdpc3RyYXRpb25zLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNjaGVkdWxlU3dlZXAoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBCb3VuZCBzbyBpdCBjYW4gYmUgZXhwb3J0ZWQgZGlyZWN0bHkgYXMgY2xlYXJUaW1lcnMgdGVzdCB1dGlsaXR5LlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJmaW5hbGl6ZUFsbEltbWVkaWF0ZWx5XCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuc3dlZXAoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBUb2tlbiBpcyBhY3R1YWxseSByZXF1aXJlZCB3aXRoIHRoaXMgaW1wbFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnkucHJvdG90eXBlLCBcInJlZ2lzdGVyXCIsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAodGFyZ2V0LCB2YWx1ZSwgdG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9ucy5zZXQodG9rZW4sIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJlZEF0OiBEYXRlLm5vdygpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVTd2VlcCgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeS5wcm90b3R5cGUsIFwidW5yZWdpc3RlclwiLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbnMuZGVsZXRlKHRva2VuKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnkucHJvdG90eXBlLCBcInNjaGVkdWxlU3dlZXBcIiwge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN3ZWVwVGltZW91dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zd2VlcFRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuc3dlZXAsIFJFR0lTVFJZX1NXRUVQX0lOVEVSVkFMKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnk7XG59KCkpO1xuZXhwb3J0IHsgVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5IH07XG5leHBvcnQgdmFyIFVuaXZlcnNhbEZpbmFsaXphdGlvblJlZ2lzdHJ5ID0gdHlwZW9mIEZpbmFsaXphdGlvblJlZ2lzdHJ5ICE9PSBcInVuZGVmaW5lZFwiXG4gICAgPyBGaW5hbGl6YXRpb25SZWdpc3RyeVxuICAgIDogVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VW5pdmVyc2FsRmluYWxpemF0aW9uUmVnaXN0cnkuanMubWFwIiwiaW1wb3J0IHsgVW5pdmVyc2FsRmluYWxpemF0aW9uUmVnaXN0cnkgfSBmcm9tIFwiLi9Vbml2ZXJzYWxGaW5hbGl6YXRpb25SZWdpc3RyeVwiO1xuZXhwb3J0IHZhciBvYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5ID0gbmV3IFVuaXZlcnNhbEZpbmFsaXphdGlvblJlZ2lzdHJ5KGZ1bmN0aW9uIChhZG0pIHtcbiAgICB2YXIgX2E7XG4gICAgKF9hID0gYWRtLnJlYWN0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGlzcG9zZSgpO1xuICAgIGFkbS5yZWFjdGlvbiA9IG51bGw7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkuanMubWFwIiwiaW1wb3J0IHsgUmVhY3Rpb24gfSBmcm9tIFwibW9ieFwiO1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgcHJpbnREZWJ1Z1ZhbHVlIH0gZnJvbSBcIi4vdXRpbHMvcHJpbnREZWJ1Z1ZhbHVlXCI7XG5pbXBvcnQgeyBpc1VzaW5nU3RhdGljUmVuZGVyaW5nIH0gZnJvbSBcIi4vc3RhdGljUmVuZGVyaW5nXCI7XG5pbXBvcnQgeyBvYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5IH0gZnJvbSBcIi4vdXRpbHMvb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeVwiO1xuZnVuY3Rpb24gY3JlYXRlUmVhY3Rpb24oYWRtKSB7XG4gICAgYWRtLnJlYWN0aW9uID0gbmV3IFJlYWN0aW9uKFwib2JzZXJ2ZXJcIi5jb25jYXQoYWRtLm5hbWUpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgYWRtLnN0YXRlVmVyc2lvbiA9IFN5bWJvbCgpO1xuICAgICAgICAvLyBvblN0b3JlQ2hhbmdlIHdvbid0IGJlIGF2YWlsYWJsZSB1bnRpbCB0aGUgY29tcG9uZW50IFwibW91bnRzXCIuXG4gICAgICAgIC8vIElmIHN0YXRlIGNoYW5nZXMgaW4gYmV0d2VlbiBpbml0aWFsIHJlbmRlciBhbmQgbW91bnQsXG4gICAgICAgIC8vIGB1c2VTeW5jRXh0ZXJuYWxTdG9yZWAgc2hvdWxkIGhhbmRsZSB0aGF0IGJ5IGNoZWNraW5nIHRoZSBzdGF0ZSB2ZXJzaW9uIGFuZCBpc3N1aW5nIHVwZGF0ZS5cbiAgICAgICAgKF9hID0gYWRtLm9uU3RvcmVDaGFuZ2UpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKGFkbSk7XG4gICAgfSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdXNlT2JzZXJ2ZXIocmVuZGVyLCBiYXNlQ29tcG9uZW50TmFtZSkge1xuICAgIGlmIChiYXNlQ29tcG9uZW50TmFtZSA9PT0gdm9pZCAwKSB7IGJhc2VDb21wb25lbnROYW1lID0gXCJvYnNlcnZlZFwiOyB9XG4gICAgaWYgKGlzVXNpbmdTdGF0aWNSZW5kZXJpbmcoKSkge1xuICAgICAgICByZXR1cm4gcmVuZGVyKCk7XG4gICAgfVxuICAgIHZhciBhZG1SZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gICAgaWYgKCFhZG1SZWYuY3VycmVudCkge1xuICAgICAgICAvLyBGaXJzdCByZW5kZXJcbiAgICAgICAgdmFyIGFkbV8xID0ge1xuICAgICAgICAgICAgcmVhY3Rpb246IG51bGwsXG4gICAgICAgICAgICBvblN0b3JlQ2hhbmdlOiBudWxsLFxuICAgICAgICAgICAgc3RhdGVWZXJzaW9uOiBTeW1ib2woKSxcbiAgICAgICAgICAgIG5hbWU6IGJhc2VDb21wb25lbnROYW1lLFxuICAgICAgICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbiAob25TdG9yZUNoYW5nZSkge1xuICAgICAgICAgICAgICAgIC8vIERvIE5PVCBhY2Nlc3MgYWRtUmVmIGhlcmUhXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeS51bnJlZ2lzdGVyKGFkbV8xKTtcbiAgICAgICAgICAgICAgICBhZG1fMS5vblN0b3JlQ2hhbmdlID0gb25TdG9yZUNoYW5nZTtcbiAgICAgICAgICAgICAgICBpZiAoIWFkbV8xLnJlYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlJ3ZlIGxvc3Qgb3VyIHJlYWN0aW9uIGFuZCB0aGVyZWZvcmUgYWxsIHN1YnNjcmlwdGlvbnMsIG9jY3VycyB3aGVuOlxuICAgICAgICAgICAgICAgICAgICAvLyAxLiBUaW1lciBiYXNlZCBmaW5hbGl6YXRpb24gcmVnaXN0cnkgZGlzcG9zZWQgcmVhY3Rpb24gYmVmb3JlIGNvbXBvbmVudCBtb3VudGVkLlxuICAgICAgICAgICAgICAgICAgICAvLyAyLiBSZWFjdCBcInJlLW1vdW50c1wiIHNhbWUgY29tcG9uZW50IHdpdGhvdXQgY2FsbGluZyByZW5kZXIgaW4gYmV0d2VlbiAodHlwaWNhbGx5IDxTdHJpY3RNb2RlPikuXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVjcmVhdGUgcmVhY3Rpb24gYW5kIHNjaGVkdWxlIHJlLXJlbmRlciB0byByZWNyZWF0ZSBzdWJzY3JpcHRpb25zLFxuICAgICAgICAgICAgICAgICAgICAvLyBldmVuIGlmIHN0YXRlIGRpZCBub3QgY2hhbmdlLlxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVSZWFjdGlvbihhZG1fMSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGBvblN0b3JlQ2hhbmdlYCB3b24ndCBmb3JjZSB1cGRhdGUgaWYgc3Vic2VxdWVudCBgZ2V0U25hcHNob3RgIHJldHVybnMgc2FtZSB2YWx1ZS5cbiAgICAgICAgICAgICAgICAgICAgLy8gU28gd2UgbWFrZSBzdXJlIHRoYXQgaXMgbm90IHRoZSBjYXNlXG4gICAgICAgICAgICAgICAgICAgIGFkbV8xLnN0YXRlVmVyc2lvbiA9IFN5bWJvbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgICAgIC8vIERvIE5PVCBhY2Nlc3MgYWRtUmVmIGhlcmUhXG4gICAgICAgICAgICAgICAgICAgIGFkbV8xLm9uU3RvcmVDaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSBhZG1fMS5yZWFjdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYWRtXzEucmVhY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ2V0U25hcHNob3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBEbyBOT1QgYWNjZXNzIGFkbVJlZiBoZXJlIVxuICAgICAgICAgICAgICAgIHJldHVybiBhZG1fMS5zdGF0ZVZlcnNpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGFkbVJlZi5jdXJyZW50ID0gYWRtXzE7XG4gICAgfVxuICAgIHZhciBhZG0gPSBhZG1SZWYuY3VycmVudDtcbiAgICBpZiAoIWFkbS5yZWFjdGlvbikge1xuICAgICAgICAvLyBGaXJzdCByZW5kZXIgb3IgcmVhY3Rpb24gd2FzIGRpc3Bvc2VkIGJ5IHJlZ2lzdHJ5IGJlZm9yZSBzdWJzY3JpYmVcbiAgICAgICAgY3JlYXRlUmVhY3Rpb24oYWRtKTtcbiAgICAgICAgLy8gU3RyaWN0TW9kZS9Db25jdXJyZW50TW9kZS9TdXNwZW5zZSBtYXkgbWVhbiB0aGF0IG91ciBjb21wb25lbnQgaXNcbiAgICAgICAgLy8gcmVuZGVyZWQgYW5kIGFiYW5kb25lZCBtdWx0aXBsZSB0aW1lcywgc28gd2UgbmVlZCB0byB0cmFjayBsZWFrZWRcbiAgICAgICAgLy8gUmVhY3Rpb25zLlxuICAgICAgICBvYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5LnJlZ2lzdGVyKGFkbVJlZiwgYWRtLCBhZG0pO1xuICAgIH1cbiAgICBSZWFjdC51c2VEZWJ1Z1ZhbHVlKGFkbS5yZWFjdGlvbiwgcHJpbnREZWJ1Z1ZhbHVlKTtcbiAgICBSZWFjdC51c2VTeW5jRXh0ZXJuYWxTdG9yZShcbiAgICAvLyBCb3RoIG9mIHRoZXNlIG11c3QgYmUgc3RhYmxlLCBvdGhlcndpc2UgaXQgd291bGQga2VlcCByZXN1YnNjcmliaW5nIGV2ZXJ5IHJlbmRlci5cbiAgICBhZG0uc3Vic2NyaWJlLCBhZG0uZ2V0U25hcHNob3QsIGFkbS5nZXRTbmFwc2hvdCk7XG4gICAgLy8gcmVuZGVyIHRoZSBvcmlnaW5hbCBjb21wb25lbnQsIGJ1dCBoYXZlIHRoZVxuICAgIC8vIHJlYWN0aW9uIHRyYWNrIHRoZSBvYnNlcnZhYmxlcywgc28gdGhhdCByZW5kZXJpbmdcbiAgICAvLyBjYW4gYmUgaW52YWxpZGF0ZWQgKHNlZSBhYm92ZSkgb25jZSBhIGRlcGVuZGVuY3kgY2hhbmdlc1xuICAgIHZhciByZW5kZXJSZXN1bHQ7XG4gICAgdmFyIGV4Y2VwdGlvbjtcbiAgICBhZG0ucmVhY3Rpb24udHJhY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVuZGVyUmVzdWx0ID0gcmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGV4Y2VwdGlvbiA9IGU7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoZXhjZXB0aW9uKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjsgLy8gcmUtdGhyb3cgYW55IGV4Y2VwdGlvbnMgY2F1Z2h0IGR1cmluZyByZW5kZXJpbmdcbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlclJlc3VsdDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZU9ic2VydmVyLmpzLm1hcCIsInZhciBfYSwgX2I7XG5pbXBvcnQgeyBmb3J3YXJkUmVmLCBtZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpc1VzaW5nU3RhdGljUmVuZGVyaW5nIH0gZnJvbSBcIi4vc3RhdGljUmVuZGVyaW5nXCI7XG5pbXBvcnQgeyB1c2VPYnNlcnZlciB9IGZyb20gXCIuL3VzZU9ic2VydmVyXCI7XG52YXIgd2Fybk9ic2VydmVyT3B0aW9uc0RlcHJlY2F0ZWQgPSB0cnVlO1xudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuZm9yO1xudmFyIGlzRnVuY3Rpb25OYW1lQ29uZmlndXJhYmxlID0gKF9iID0gKF9hID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihmdW5jdGlvbiAoKSB7IH0sIFwibmFtZVwiKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNvbmZpZ3VyYWJsZSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogZmFsc2U7XG4vLyBVc2luZyByZWFjdC1pcyBoYWQgc29tZSBpc3N1ZXMgKGFuZCBvcGVyYXRlcyBvbiBlbGVtZW50cywgbm90IG9uIHR5cGVzKSwgc2VlICM2MDggLyAjNjA5XG52YXIgUmVhY3RGb3J3YXJkUmVmU3ltYm9sID0gaGFzU3ltYm9sXG4gICAgPyBTeW1ib2wuZm9yKFwicmVhY3QuZm9yd2FyZF9yZWZcIilcbiAgICA6IHR5cGVvZiBmb3J3YXJkUmVmID09PSBcImZ1bmN0aW9uXCIgJiYgZm9yd2FyZFJlZihmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIG51bGw7IH0pW1wiJCR0eXBlb2ZcIl07XG52YXIgUmVhY3RNZW1vU3ltYm9sID0gaGFzU3ltYm9sXG4gICAgPyBTeW1ib2wuZm9yKFwicmVhY3QubWVtb1wiKVxuICAgIDogdHlwZW9mIG1lbW8gPT09IFwiZnVuY3Rpb25cIiAmJiBtZW1vKGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gbnVsbDsgfSlbXCIkJHR5cGVvZlwiXTtcbi8vIG4uYi4gYmFzZSBjYXNlIGlzIG5vdCB1c2VkIGZvciBhY3R1YWwgdHlwaW5ncyBvciBleHBvcnRlZCBpbiB0aGUgdHlwaW5nIGZpbGVzXG5leHBvcnQgZnVuY3Rpb24gb2JzZXJ2ZXIoYmFzZUNvbXBvbmVudCwgXG4vLyBUT0RPIHJlbW92ZSBpbiBuZXh0IG1ham9yXG5vcHRpb25zKSB7XG4gICAgdmFyIF9hO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgd2Fybk9ic2VydmVyT3B0aW9uc0RlcHJlY2F0ZWQgJiYgb3B0aW9ucykge1xuICAgICAgICB3YXJuT2JzZXJ2ZXJPcHRpb25zRGVwcmVjYXRlZCA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbbW9ieC1yZWFjdC1saXRlXSBgb2JzZXJ2ZXIoZm4sIHsgZm9yd2FyZFJlZjogdHJ1ZSB9KWAgaXMgZGVwcmVjYXRlZCwgdXNlIGBvYnNlcnZlcihSZWFjdC5mb3J3YXJkUmVmKGZuKSlgXCIpO1xuICAgIH1cbiAgICBpZiAoUmVhY3RNZW1vU3ltYm9sICYmIGJhc2VDb21wb25lbnRbXCIkJHR5cGVvZlwiXSA9PT0gUmVhY3RNZW1vU3ltYm9sKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4LXJlYWN0LWxpdGVdIFlvdSBhcmUgdHJ5aW5nIHRvIHVzZSBgb2JzZXJ2ZXJgIG9uIGEgZnVuY3Rpb24gY29tcG9uZW50IHdyYXBwZWQgaW4gZWl0aGVyIGFub3RoZXIgYG9ic2VydmVyYCBvciBgUmVhY3QubWVtb2AuIFRoZSBvYnNlcnZlciBhbHJlYWR5IGFwcGxpZXMgJ1JlYWN0Lm1lbW8nIGZvciB5b3UuXCIpO1xuICAgIH1cbiAgICAvLyBUaGUgd29ya2luZyBvZiBvYnNlcnZlciBpcyBleHBsYWluZWQgc3RlcCBieSBzdGVwIGluIHRoaXMgdGFsazogaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1jUEY0aUJlZG9GMCZmZWF0dXJlPXlvdXR1LmJlJnQ9MTMwN1xuICAgIGlmIChpc1VzaW5nU3RhdGljUmVuZGVyaW5nKCkpIHtcbiAgICAgICAgcmV0dXJuIGJhc2VDb21wb25lbnQ7XG4gICAgfVxuICAgIHZhciB1c2VGb3J3YXJkUmVmID0gKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmZvcndhcmRSZWYpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IGZhbHNlO1xuICAgIHZhciByZW5kZXIgPSBiYXNlQ29tcG9uZW50O1xuICAgIHZhciBiYXNlQ29tcG9uZW50TmFtZSA9IGJhc2VDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgYmFzZUNvbXBvbmVudC5uYW1lO1xuICAgIC8vIElmIGFscmVhZHkgd3JhcHBlZCB3aXRoIGZvcndhcmRSZWYsIHVud3JhcCxcbiAgICAvLyBzbyB3ZSBjYW4gcGF0Y2ggcmVuZGVyIGFuZCBhcHBseSBtZW1vXG4gICAgaWYgKFJlYWN0Rm9yd2FyZFJlZlN5bWJvbCAmJiBiYXNlQ29tcG9uZW50W1wiJCR0eXBlb2ZcIl0gPT09IFJlYWN0Rm9yd2FyZFJlZlN5bWJvbCkge1xuICAgICAgICB1c2VGb3J3YXJkUmVmID0gdHJ1ZTtcbiAgICAgICAgcmVuZGVyID0gYmFzZUNvbXBvbmVudFtcInJlbmRlclwiXTtcbiAgICAgICAgaWYgKHR5cGVvZiByZW5kZXIgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYngtcmVhY3QtbGl0ZV0gYHJlbmRlcmAgcHJvcGVydHkgb2YgRm9yd2FyZFJlZiB3YXMgbm90IGEgZnVuY3Rpb25cIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIG9ic2VydmVyQ29tcG9uZW50ID0gZnVuY3Rpb24gKHByb3BzLCByZWYpIHtcbiAgICAgICAgcmV0dXJuIHVzZU9ic2VydmVyKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlbmRlcihwcm9wcywgcmVmKTsgfSwgYmFzZUNvbXBvbmVudE5hbWUpO1xuICAgIH07XG4gICAgb2JzZXJ2ZXJDb21wb25lbnQuZGlzcGxheU5hbWUgPSBiYXNlQ29tcG9uZW50LmRpc3BsYXlOYW1lO1xuICAgIGlmIChpc0Z1bmN0aW9uTmFtZUNvbmZpZ3VyYWJsZSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JzZXJ2ZXJDb21wb25lbnQsIFwibmFtZVwiLCB7XG4gICAgICAgICAgICB2YWx1ZTogYmFzZUNvbXBvbmVudC5uYW1lLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFN1cHBvcnQgbGVnYWN5IGNvbnRleHQ6IGBjb250ZXh0VHlwZXNgIG11c3QgYmUgYXBwbGllZCBiZWZvcmUgYG1lbW9gXG4gICAgaWYgKGJhc2VDb21wb25lbnQuY29udGV4dFR5cGVzKSB7XG4gICAgICAgIDtcbiAgICAgICAgb2JzZXJ2ZXJDb21wb25lbnQuY29udGV4dFR5cGVzID0gYmFzZUNvbXBvbmVudC5jb250ZXh0VHlwZXM7XG4gICAgfVxuICAgIGlmICh1c2VGb3J3YXJkUmVmKSB7XG4gICAgICAgIC8vIGBmb3J3YXJkUmVmYCBtdXN0IGJlIGFwcGxpZWQgcHJpb3IgYG1lbW9gXG4gICAgICAgIC8vIGBmb3J3YXJkUmVmKG9ic2VydmVyKGNtcCkpYCB0aHJvd3M6XG4gICAgICAgIC8vIFwiZm9yd2FyZFJlZiByZXF1aXJlcyBhIHJlbmRlciBmdW5jdGlvbiBidXQgcmVjZWl2ZWQgYSBgbWVtb2AgY29tcG9uZW50LiBJbnN0ZWFkIG9mIGZvcndhcmRSZWYobWVtbyguLi4pKSwgdXNlIG1lbW8oZm9yd2FyZFJlZiguLi4pKVwiXG4gICAgICAgIG9ic2VydmVyQ29tcG9uZW50ID0gZm9yd2FyZFJlZihvYnNlcnZlckNvbXBvbmVudCk7XG4gICAgfVxuICAgIC8vIG1lbW87IHdlIGFyZSBub3QgaW50ZXJlc3RlZCBpbiBkZWVwIHVwZGF0ZXNcbiAgICAvLyBpbiBwcm9wczsgd2UgYXNzdW1lIHRoYXQgaWYgZGVlcCBvYmplY3RzIGFyZSBjaGFuZ2VkLFxuICAgIC8vIHRoaXMgaXMgaW4gb2JzZXJ2YWJsZXMsIHdoaWNoIHdvdWxkIGhhdmUgYmVlbiB0cmFja2VkIGFueXdheVxuICAgIG9ic2VydmVyQ29tcG9uZW50ID0gbWVtbyhvYnNlcnZlckNvbXBvbmVudCk7XG4gICAgY29weVN0YXRpY1Byb3BlcnRpZXMoYmFzZUNvbXBvbmVudCwgb2JzZXJ2ZXJDb21wb25lbnQpO1xuICAgIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9ic2VydmVyQ29tcG9uZW50LCBcImNvbnRleHRUeXBlc1wiLCB7XG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4LXJlYWN0LWxpdGVdIGBcIi5jb25jYXQodGhpcy5kaXNwbGF5TmFtZSB8fCAoKF9hID0gdGhpcy50eXBlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGlzcGxheU5hbWUpIHx8ICgoX2IgPSB0aGlzLnR5cGUpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5uYW1lKSB8fCBcIkNvbXBvbmVudFwiLCBcIi5jb250ZXh0VHlwZXNgIG11c3QgYmUgc2V0IGJlZm9yZSBhcHBseWluZyBgb2JzZXJ2ZXJgLlwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gb2JzZXJ2ZXJDb21wb25lbnQ7XG59XG4vLyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vbXJpZGd3YXkvaG9pc3Qtbm9uLXJlYWN0LXN0YXRpY3MvYmxvYi9tYXN0ZXIvc3JjL2luZGV4LmpzXG52YXIgaG9pc3RCbGFja0xpc3QgPSB7XG4gICAgJCR0eXBlb2Y6IHRydWUsXG4gICAgcmVuZGVyOiB0cnVlLFxuICAgIGNvbXBhcmU6IHRydWUsXG4gICAgdHlwZTogdHJ1ZSxcbiAgICAvLyBEb24ndCByZWRlZmluZSBgZGlzcGxheU5hbWVgLFxuICAgIC8vIGl0J3MgZGVmaW5lZCBhcyBnZXR0ZXItc2V0dGVyIHBhaXIgb24gYG1lbW9gIChzZWUgIzMxOTIpLlxuICAgIGRpc3BsYXlOYW1lOiB0cnVlXG59O1xuZnVuY3Rpb24gY29weVN0YXRpY1Byb3BlcnRpZXMoYmFzZSwgdGFyZ2V0KSB7XG4gICAgT2JqZWN0LmtleXMoYmFzZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICghaG9pc3RCbGFja0xpc3Rba2V5XSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGJhc2UsIGtleSkpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZlci5qcy5tYXAiLCJ2YXIgX2E7XG5pbXBvcnQgXCIuL3V0aWxzL2Fzc2VydEVudmlyb25tZW50XCI7XG5pbXBvcnQgeyB1bnN0YWJsZV9iYXRjaGVkVXBkYXRlcyBhcyBiYXRjaCB9IGZyb20gXCIuL3V0aWxzL3JlYWN0QmF0Y2hlZFVwZGF0ZXNcIjtcbmltcG9ydCB7IG9ic2VydmVyQmF0Y2hpbmcgfSBmcm9tIFwiLi91dGlscy9vYnNlcnZlckJhdGNoaW5nXCI7XG5pbXBvcnQgeyB1c2VEZXByZWNhdGVkIH0gZnJvbSBcIi4vdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IHVzZU9ic2VydmVyIGFzIHVzZU9ic2VydmVyT3JpZ2luYWwgfSBmcm9tIFwiLi91c2VPYnNlcnZlclwiO1xuaW1wb3J0IHsgZW5hYmxlU3RhdGljUmVuZGVyaW5nIH0gZnJvbSBcIi4vc3RhdGljUmVuZGVyaW5nXCI7XG5pbXBvcnQgeyBvYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5IH0gZnJvbSBcIi4vdXRpbHMvb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeVwiO1xub2JzZXJ2ZXJCYXRjaGluZyhiYXRjaCk7XG5leHBvcnQgeyBpc1VzaW5nU3RhdGljUmVuZGVyaW5nLCBlbmFibGVTdGF0aWNSZW5kZXJpbmcgfSBmcm9tIFwiLi9zdGF0aWNSZW5kZXJpbmdcIjtcbmV4cG9ydCB7IG9ic2VydmVyIH0gZnJvbSBcIi4vb2JzZXJ2ZXJcIjtcbmV4cG9ydCB7IE9ic2VydmVyIH0gZnJvbSBcIi4vT2JzZXJ2ZXJDb21wb25lbnRcIjtcbmV4cG9ydCB7IHVzZUxvY2FsT2JzZXJ2YWJsZSB9IGZyb20gXCIuL3VzZUxvY2FsT2JzZXJ2YWJsZVwiO1xuZXhwb3J0IHsgdXNlTG9jYWxTdG9yZSB9IGZyb20gXCIuL3VzZUxvY2FsU3RvcmVcIjtcbmV4cG9ydCB7IHVzZUFzT2JzZXJ2YWJsZVNvdXJjZSB9IGZyb20gXCIuL3VzZUFzT2JzZXJ2YWJsZVNvdXJjZVwiO1xuZXhwb3J0IHsgb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeSBhcyBfb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeSB9O1xuZXhwb3J0IHZhciBjbGVhclRpbWVycyA9IChfYSA9IG9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnlbXCJmaW5hbGl6ZUFsbEltbWVkaWF0ZWx5XCJdKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAoZnVuY3Rpb24gKCkgeyB9KTtcbmV4cG9ydCBmdW5jdGlvbiB1c2VPYnNlcnZlcihmbiwgYmFzZUNvbXBvbmVudE5hbWUpIHtcbiAgICBpZiAoYmFzZUNvbXBvbmVudE5hbWUgPT09IHZvaWQgMCkgeyBiYXNlQ29tcG9uZW50TmFtZSA9IFwib2JzZXJ2ZWRcIjsgfVxuICAgIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIHtcbiAgICAgICAgdXNlRGVwcmVjYXRlZChcIlttb2J4LXJlYWN0LWxpdGVdICd1c2VPYnNlcnZlcihmbiknIGlzIGRlcHJlY2F0ZWQuIFVzZSBgPE9ic2VydmVyPntmbn08L09ic2VydmVyPmAgaW5zdGVhZCwgb3Igd3JhcCB0aGUgZW50aXJlIGNvbXBvbmVudCBpbiBgb2JzZXJ2ZXJgLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHVzZU9ic2VydmVyT3JpZ2luYWwoZm4sIGJhc2VDb21wb25lbnROYW1lKTtcbn1cbmV4cG9ydCB7IGlzT2JzZXJ2ZXJCYXRjaGVkLCBvYnNlcnZlckJhdGNoaW5nIH0gZnJvbSBcIi4vdXRpbHMvb2JzZXJ2ZXJCYXRjaGluZ1wiO1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVN0YXRpY1JlbmRlcmluZyhlbmFibGUpIHtcbiAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlttb2J4LXJlYWN0LWxpdGVdICd1c2VTdGF0aWNSZW5kZXJpbmcnIGlzIGRlcHJlY2F0ZWQsIHVzZSAnZW5hYmxlU3RhdGljUmVuZGVyaW5nJyBpbnN0ZWFkXCIpO1xuICAgIH1cbiAgICBlbmFibGVTdGF0aWNSZW5kZXJpbmcoZW5hYmxlKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsImV4cG9ydCBjb25zdCBkZWJvdW5jZSA9IChmdW5jLCB3YWl0Rm9yKSA9PiB7XG4gICAgbGV0IHRpbWVvdXQgPSBudWxsO1xuICAgIGNvbnN0IGFib3J0ID0gKCkgPT4ge1xuICAgICAgICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGRlYm91bmNlZCA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGFib3J0KCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGZ1bmMoLi4uYXJncyksIHdhaXRGb3IpO1xuICAgIH07XG4gICAgcmV0dXJuIFtkZWJvdW5jZWQsIGFib3J0XTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWJvdW5jZS5qcy5tYXAiLCJpbXBvcnQgeyBtYWtlT2JzZXJ2YWJsZSwgb2JzZXJ2YWJsZSwgYWN0aW9uIH0gZnJvbSBcIm1vYnhcIjtcbmV4cG9ydCBjbGFzcyBJbnB1dFN0b3JlIHtcbiAgICB2YWx1ZTtcbiAgICBjb25zdHJ1Y3Rvcihpbml0ID0gXCJcIikge1xuICAgICAgICB0aGlzLnZhbHVlID0gaW5pdDtcbiAgICAgICAgbWFrZU9ic2VydmFibGUodGhpcywge1xuICAgICAgICAgICAgdmFsdWU6IG9ic2VydmFibGUsXG4gICAgICAgICAgICBzZXRWYWx1ZTogYWN0aW9uLFxuICAgICAgICAgICAgb25DaGFuZ2U6IGFjdGlvblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBvbkNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlucHV0U3RvcmUuanMubWFwIiwiaW1wb3J0IHsgY3JlYXRlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gXCJAbWVuZGl4L3dpZGdldC1wbHVnaW4tcGxhdGZvcm0vdXRpbHMvZGVib3VuY2VcIjtcbmltcG9ydCB7IGFjdGlvbiwgYXV0b3J1biwgY29tcHV0ZWQsIG1ha2VPYnNlcnZhYmxlLCByZWFjdGlvbiwgcnVuSW5BY3Rpb24gfSBmcm9tIFwibW9ieFwiO1xuaW1wb3J0IHsgSW5wdXRTdG9yZSB9IGZyb20gXCIuLi9zdG9yZXMvSW5wdXRTdG9yZVwiO1xuZXhwb3J0IGNsYXNzIEVkaXRhYmxlRmlsdGVyQ29udHJvbGxlciB7XG4gICAgZmlsdGVyO1xuICAgIGNoYW5nZURlbGF5O1xuICAgIGRpc2FibGVkRm47XG4gICAgaW5wdXQxO1xuICAgIGlucHV0MjtcbiAgICBpbnB1dFJlZiA9IGNyZWF0ZVJlZigpO1xuICAgIGRlZmF1bHRzO1xuICAgIGlucHV0cztcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgeyBmaWx0ZXIsIGNoYW5nZURlbGF5ID0gNTAwIH0gPSBwYXJhbXM7XG4gICAgICAgIHRoaXMuY2hhbmdlRGVsYXkgPSBjaGFuZ2VEZWxheTtcbiAgICAgICAgdGhpcy5pbnB1dDEgPSBuZXcgSW5wdXRTdG9yZShmaWx0ZXIuYXJnMS5kaXNwbGF5VmFsdWUpO1xuICAgICAgICB0aGlzLmlucHV0MiA9IG5ldyBJbnB1dFN0b3JlKGZpbHRlci5hcmcyLmRpc3BsYXlWYWx1ZSk7XG4gICAgICAgIHRoaXMuaW5wdXRzID0gW3RoaXMuaW5wdXQxLCB0aGlzLmlucHV0Ml07XG4gICAgICAgIHRoaXMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0gW3BhcmFtcy5kZWZhdWx0RmlsdGVyLCBwYXJhbXMuZGVmYXVsdFZhbHVlXTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZEZuID0gcGFyYW1zLmRpc2FibGVJbnB1dHM7XG4gICAgICAgIG1ha2VPYnNlcnZhYmxlKHRoaXMsIHtcbiAgICAgICAgICAgIHNlbGVjdGVkRm46IGNvbXB1dGVkLFxuICAgICAgICAgICAgZGlzYWJsZUlucHV0czogY29tcHV0ZWQsXG4gICAgICAgICAgICBoYW5kbGVGaWx0ZXJGbkNoYW5nZTogYWN0aW9uXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgc2VsZWN0ZWRGbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyLmZpbHRlckZ1bmN0aW9uO1xuICAgIH1cbiAgICBnZXQgZGlzYWJsZUlucHV0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRGbiA/IHRoaXMuZGlzYWJsZWRGbih0aGlzLmZpbHRlci5maWx0ZXJGdW5jdGlvbikgOiBmYWxzZTtcbiAgICB9XG4gICAgaGFuZGxlRmlsdGVyRm5DaGFuZ2UgPSAoZm4pID0+IHtcbiAgICAgICAgdGhpcy5maWx0ZXIuZmlsdGVyRnVuY3Rpb24gPSBmbjtcbiAgICAgICAgdGhpcy5pbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xuICAgIH07XG4gICAgc2V0dXAoKSB7XG4gICAgICAgIGNvbnN0IGRpc3Bvc2VycyA9IFtdO1xuICAgICAgICAvLyBvbklucHV0c0NoYW5nZSAtIGRlYm91bmNlZCByZWFjdGlvbiAoZWZmZWN0KSBmb3IgYm90aCBpbnB1dHMuXG4gICAgICAgIC8vIFRyaWdnZXJlZCB3aGVuZXZlciBvbmUgb2YgdGhlIGlucHV0cyBpcyBjaGFuZ2VkLlxuICAgICAgICAvLyBUaGlzIHJlYWN0aW9uIHdyaXRlcyB2YWx1ZSB0byBmaWx0ZXIuXG4gICAgICAgIGNvbnN0IFtvbklucHV0c0NoYW5nZSwgY2xlYXJEZWJvdW5jZV0gPSBkZWJvdW5jZSgoW3YxLCB2Ml0pID0+IHtcbiAgICAgICAgICAgIHJ1bkluQWN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlci5hcmcxLmRpc3BsYXlWYWx1ZSA9IHYxO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyLmFyZzIuZGlzcGxheVZhbHVlID0gdjI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdGhpcy5jaGFuZ2VEZWxheSk7XG4gICAgICAgIGRpc3Bvc2Vycy5wdXNoKGNsZWFyRGVib3VuY2UpO1xuICAgICAgICBkaXNwb3NlcnMucHVzaChyZWFjdGlvbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gW3RoaXMuaW5wdXQxLnZhbHVlLCB0aGlzLmlucHV0Mi52YWx1ZV07XG4gICAgICAgIH0sIG9uSW5wdXRzQ2hhbmdlKSk7XG4gICAgICAgIC8vIEF1dG9ydW4gdG8gc3luYyBmaWx0ZXIgYXJncyB3aXRoIGlucHV0cy5cbiAgICAgICAgLy8gUnVucyB3aGVuZXZlciBvbmUgb2YgdGhlIGFyZ3VtZW50IHZhbHVlIGlzIGNoYW5nZWQuXG4gICAgICAgIGRpc3Bvc2Vycy5wdXNoKGF1dG9ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbnB1dDEuc2V0VmFsdWUodGhpcy5maWx0ZXIuYXJnMS5kaXNwbGF5VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dDIuc2V0VmFsdWUodGhpcy5maWx0ZXIuYXJnMi5kaXNwbGF5VmFsdWUpO1xuICAgICAgICB9KSk7XG4gICAgICAgIC8vIFNldCBkZWZhdWx0IHN0YXRlIGZvciB0aGUgZmlsdGVyLCBpZiBwcmVzZW50LlxuICAgICAgICB0aGlzLmZpbHRlci5VTlNBRkVfc2V0RGVmYXVsdHModGhpcy5kZWZhdWx0cyk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlcnMuZm9yRWFjaChkaXNwb3NlID0+IGRpc3Bvc2UoKSk7XG4gICAgICAgIH07XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RWRpdGFibGVGaWx0ZXJDb250cm9sbGVyLmpzLm1hcCIsImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEVkaXRhYmxlRmlsdGVyQ29udHJvbGxlciB9IGZyb20gXCIuLi9jb250cm9sbGVycy9FZGl0YWJsZUZpbHRlckNvbnRyb2xsZXJcIjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VFZGl0YWJsZUZpbHRlckNvbnRyb2xsZXIocGFyYW1zKSB7XG4gICAgY29uc3QgW2N0cmxdID0gdXNlU3RhdGUoKCkgPT4gbmV3IEVkaXRhYmxlRmlsdGVyQ29udHJvbGxlcihwYXJhbXMpKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4gY3RybC5zZXR1cCgpLCBbY3RybF0pO1xuICAgIHJldHVybiBjdHJsO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlRWRpdGFibGVGaWx0ZXJDb250cm9sbGVyLmpzLm1hcCIsImltcG9ydCB7IHJlYWN0aW9uIH0gZnJvbSBcIm1vYnhcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5leHBvcnQgZnVuY3Rpb24gdXNlQmFzaWNTeW5jKHByb3BzLCBzdG9yZSkge1xuICAgIGNvbnN0IHBib3ggPSB1c2VSZWYocHJvcHMpO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHBib3guY3VycmVudCA9IHByb3BzO1xuICAgIH0pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHJldHVybiByZWFjdGlvbigoKSA9PiBbc3RvcmUuYXJnMS52YWx1ZSwgc3RvcmUuYXJnMi52YWx1ZV0sIGNyZWF0ZVB1c2hlcihwYm94KSk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9leGhhdXN0aXZlLWRlcHNcbiAgICB9LCBbXSk7XG59XG5mdW5jdGlvbiBjcmVhdGVQdXNoZXIocGJveCkge1xuICAgIHJldHVybiAoW3ZhbHVlMSwgX3ZhbHVlMl0pID0+IHtcbiAgICAgICAgY29uc3QgcHJvcHMgPSBwYm94LmN1cnJlbnQ7XG4gICAgICAgIHByb3BzLnZhbHVlQXR0cmlidXRlPy5zZXRWYWx1ZSh2YWx1ZTEgPz8gdW5kZWZpbmVkKTtcbiAgICAgICAgaWYgKHByb3BzLm9uQ2hhbmdlPy5jYW5FeGVjdXRlKSB7XG4gICAgICAgICAgICBwcm9wcy5vbkNoYW5nZT8uZXhlY3V0ZSgpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZUJhc2ljU3luYy5qcy5tYXAiLCJpbXBvcnQgeyBtYWtlT2JzZXJ2YWJsZSB9IGZyb20gXCJtb2J4XCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaWYgKCF1c2VTdGF0ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIm1vYngtcmVhY3QtbGl0ZSByZXF1aXJlcyBSZWFjdCB3aXRoIEhvb2tzIHN1cHBvcnRcIik7XG59XG5pZiAoIW1ha2VPYnNlcnZhYmxlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibW9ieC1yZWFjdC1saXRlQDMgcmVxdWlyZXMgbW9ieCBhdCBsZWFzdCB2ZXJzaW9uIDYgdG8gYmUgYXZhaWxhYmxlXCIpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXNzZXJ0RW52aXJvbm1lbnQuanMubWFwIiwiaW1wb3J0IHsgY29uZmlndXJlIH0gZnJvbSBcIm1vYnhcIjtcbmV4cG9ydCBmdW5jdGlvbiBkZWZhdWx0Tm9vcEJhdGNoKGNhbGxiYWNrKSB7XG4gICAgY2FsbGJhY2soKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlckJhdGNoaW5nKHJlYWN0aW9uU2NoZWR1bGVyKSB7XG4gICAgaWYgKCFyZWFjdGlvblNjaGVkdWxlcikge1xuICAgICAgICByZWFjdGlvblNjaGVkdWxlciA9IGRlZmF1bHROb29wQmF0Y2g7XG4gICAgICAgIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIltNb2JYXSBGYWlsZWQgdG8gZ2V0IHVuc3RhYmxlX2JhdGNoZWQgdXBkYXRlcyBmcm9tIHJlYWN0LWRvbSAvIHJlYWN0LW5hdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25maWd1cmUoeyByZWFjdGlvblNjaGVkdWxlcjogcmVhY3Rpb25TY2hlZHVsZXIgfSk7XG59XG5leHBvcnQgdmFyIGlzT2JzZXJ2ZXJCYXRjaGVkID0gZnVuY3Rpb24gKCkge1xuICAgIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW01vYlhdIERlcHJlY2F0ZWRcIik7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmVyQmF0Y2hpbmcuanMubWFwIiwiaW1wb3J0IHsgZ2V0RGVwZW5kZW5jeVRyZWUgfSBmcm9tIFwibW9ieFwiO1xuZXhwb3J0IGZ1bmN0aW9uIHByaW50RGVidWdWYWx1ZSh2KSB7XG4gICAgcmV0dXJuIGdldERlcGVuZGVuY3lUcmVlKHYpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cHJpbnREZWJ1Z1ZhbHVlLmpzLm1hcCIsImV4cG9ydCB2YXIgUkVHSVNUUllfRklOQUxJWkVfQUZURVIgPSAxMDAwMDtcbmV4cG9ydCB2YXIgUkVHSVNUUllfU1dFRVBfSU5URVJWQUwgPSAxMDAwMDtcbnZhciBUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5KGZpbmFsaXplKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImZpbmFsaXplXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBmaW5hbGl6ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwicmVnaXN0cmF0aW9uc1wiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogbmV3IE1hcCgpXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJzd2VlcFRpbWVvdXRcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IHZvaWQgMFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQm91bmQgc28gaXQgY2FuIGJlIHVzZWQgZGlyZWN0bHkgYXMgc2V0VGltZW91dCBjYWxsYmFjay5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic3dlZXBcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIChtYXhBZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAobWF4QWdlID09PSB2b2lkIDApIHsgbWF4QWdlID0gUkVHSVNUUllfRklOQUxJWkVfQUZURVI7IH1cbiAgICAgICAgICAgICAgICAvLyBjYW5jZWwgdGltZW91dCBzbyB3ZSBjYW4gZm9yY2Ugc3dlZXAgYW55dGltZVxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChfdGhpcy5zd2VlcFRpbWVvdXQpO1xuICAgICAgICAgICAgICAgIF90aGlzLnN3ZWVwVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5yZWdpc3RyYXRpb25zLmZvckVhY2goZnVuY3Rpb24gKHJlZ2lzdHJhdGlvbiwgdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdyAtIHJlZ2lzdHJhdGlvbi5yZWdpc3RlcmVkQXQgPj0gbWF4QWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5maW5hbGl6ZShyZWdpc3RyYXRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMucmVnaXN0cmF0aW9ucy5kZWxldGUodG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLnJlZ2lzdHJhdGlvbnMuc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2NoZWR1bGVTd2VlcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIEJvdW5kIHNvIGl0IGNhbiBiZSBleHBvcnRlZCBkaXJlY3RseSBhcyBjbGVhclRpbWVycyB0ZXN0IHV0aWxpdHkuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcImZpbmFsaXplQWxsSW1tZWRpYXRlbHlcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zd2VlcCgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIFRva2VuIGlzIGFjdHVhbGx5IHJlcXVpcmVkIHdpdGggdGhpcyBpbXBsXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeS5wcm90b3R5cGUsIFwicmVnaXN0ZXJcIiwge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICh0YXJnZXQsIHZhbHVlLCB0b2tlbikge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb25zLnNldCh0b2tlbiwge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICByZWdpc3RlcmVkQXQ6IERhdGUubm93KClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZVN3ZWVwKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5LnByb3RvdHlwZSwgXCJ1bnJlZ2lzdGVyXCIsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0cmF0aW9ucy5kZWxldGUodG9rZW4pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeS5wcm90b3R5cGUsIFwic2NoZWR1bGVTd2VlcFwiLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3dlZXBUaW1lb3V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN3ZWVwVGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5zd2VlcCwgUkVHSVNUUllfU1dFRVBfSU5URVJWQUwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIFRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeTtcbn0oKSk7XG5leHBvcnQgeyBUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnkgfTtcbmV4cG9ydCB2YXIgVW5pdmVyc2FsRmluYWxpemF0aW9uUmVnaXN0cnkgPSB0eXBlb2YgRmluYWxpemF0aW9uUmVnaXN0cnkgIT09IFwidW5kZWZpbmVkXCJcbiAgICA/IEZpbmFsaXphdGlvblJlZ2lzdHJ5XG4gICAgOiBUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Vbml2ZXJzYWxGaW5hbGl6YXRpb25SZWdpc3RyeS5qcy5tYXAiLCJpbXBvcnQgeyBVbml2ZXJzYWxGaW5hbGl6YXRpb25SZWdpc3RyeSB9IGZyb20gXCIuL1VuaXZlcnNhbEZpbmFsaXphdGlvblJlZ2lzdHJ5XCI7XG5leHBvcnQgdmFyIG9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkgPSBuZXcgVW5pdmVyc2FsRmluYWxpemF0aW9uUmVnaXN0cnkoZnVuY3Rpb24gKGFkbSkge1xuICAgIHZhciBfYTtcbiAgICAoX2EgPSBhZG0ucmVhY3Rpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kaXNwb3NlKCk7XG4gICAgYWRtLnJlYWN0aW9uID0gbnVsbDtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeS5qcy5tYXAiLCJpbXBvcnQgeyBSZWFjdGlvbiB9IGZyb20gXCJtb2J4XCI7XG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBwcmludERlYnVnVmFsdWUgfSBmcm9tIFwiLi91dGlscy9wcmludERlYnVnVmFsdWVcIjtcbmltcG9ydCB7IGlzVXNpbmdTdGF0aWNSZW5kZXJpbmcgfSBmcm9tIFwiLi9zdGF0aWNSZW5kZXJpbmdcIjtcbmltcG9ydCB7IG9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkgfSBmcm9tIFwiLi91dGlscy9vYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5XCI7XG5mdW5jdGlvbiBjcmVhdGVSZWFjdGlvbihhZG0pIHtcbiAgICBhZG0ucmVhY3Rpb24gPSBuZXcgUmVhY3Rpb24oXCJvYnNlcnZlclwiLmNvbmNhdChhZG0ubmFtZSksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBhZG0uc3RhdGVWZXJzaW9uID0gU3ltYm9sKCk7XG4gICAgICAgIC8vIG9uU3RvcmVDaGFuZ2Ugd29uJ3QgYmUgYXZhaWxhYmxlIHVudGlsIHRoZSBjb21wb25lbnQgXCJtb3VudHNcIi5cbiAgICAgICAgLy8gSWYgc3RhdGUgY2hhbmdlcyBpbiBiZXR3ZWVuIGluaXRpYWwgcmVuZGVyIGFuZCBtb3VudCxcbiAgICAgICAgLy8gYHVzZVN5bmNFeHRlcm5hbFN0b3JlYCBzaG91bGQgaGFuZGxlIHRoYXQgYnkgY2hlY2tpbmcgdGhlIHN0YXRlIHZlcnNpb24gYW5kIGlzc3VpbmcgdXBkYXRlLlxuICAgICAgICAoX2EgPSBhZG0ub25TdG9yZUNoYW5nZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNhbGwoYWRtKTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1c2VPYnNlcnZlcihyZW5kZXIsIGJhc2VDb21wb25lbnROYW1lKSB7XG4gICAgaWYgKGJhc2VDb21wb25lbnROYW1lID09PSB2b2lkIDApIHsgYmFzZUNvbXBvbmVudE5hbWUgPSBcIm9ic2VydmVkXCI7IH1cbiAgICBpZiAoaXNVc2luZ1N0YXRpY1JlbmRlcmluZygpKSB7XG4gICAgICAgIHJldHVybiByZW5kZXIoKTtcbiAgICB9XG4gICAgdmFyIGFkbVJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgICBpZiAoIWFkbVJlZi5jdXJyZW50KSB7XG4gICAgICAgIC8vIEZpcnN0IHJlbmRlclxuICAgICAgICB2YXIgYWRtXzEgPSB7XG4gICAgICAgICAgICByZWFjdGlvbjogbnVsbCxcbiAgICAgICAgICAgIG9uU3RvcmVDaGFuZ2U6IG51bGwsXG4gICAgICAgICAgICBzdGF0ZVZlcnNpb246IFN5bWJvbCgpLFxuICAgICAgICAgICAgbmFtZTogYmFzZUNvbXBvbmVudE5hbWUsXG4gICAgICAgICAgICBzdWJzY3JpYmU6IGZ1bmN0aW9uIChvblN0b3JlQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgLy8gRG8gTk9UIGFjY2VzcyBhZG1SZWYgaGVyZSFcbiAgICAgICAgICAgICAgICBvYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5LnVucmVnaXN0ZXIoYWRtXzEpO1xuICAgICAgICAgICAgICAgIGFkbV8xLm9uU3RvcmVDaGFuZ2UgPSBvblN0b3JlQ2hhbmdlO1xuICAgICAgICAgICAgICAgIGlmICghYWRtXzEucmVhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UndmUgbG9zdCBvdXIgcmVhY3Rpb24gYW5kIHRoZXJlZm9yZSBhbGwgc3Vic2NyaXB0aW9ucywgb2NjdXJzIHdoZW46XG4gICAgICAgICAgICAgICAgICAgIC8vIDEuIFRpbWVyIGJhc2VkIGZpbmFsaXphdGlvbiByZWdpc3RyeSBkaXNwb3NlZCByZWFjdGlvbiBiZWZvcmUgY29tcG9uZW50IG1vdW50ZWQuXG4gICAgICAgICAgICAgICAgICAgIC8vIDIuIFJlYWN0IFwicmUtbW91bnRzXCIgc2FtZSBjb21wb25lbnQgd2l0aG91dCBjYWxsaW5nIHJlbmRlciBpbiBiZXR3ZWVuICh0eXBpY2FsbHkgPFN0cmljdE1vZGU+KS5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byByZWNyZWF0ZSByZWFjdGlvbiBhbmQgc2NoZWR1bGUgcmUtcmVuZGVyIHRvIHJlY3JlYXRlIHN1YnNjcmlwdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIC8vIGV2ZW4gaWYgc3RhdGUgZGlkIG5vdCBjaGFuZ2UuXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVJlYWN0aW9uKGFkbV8xKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gYG9uU3RvcmVDaGFuZ2VgIHdvbid0IGZvcmNlIHVwZGF0ZSBpZiBzdWJzZXF1ZW50IGBnZXRTbmFwc2hvdGAgcmV0dXJucyBzYW1lIHZhbHVlLlxuICAgICAgICAgICAgICAgICAgICAvLyBTbyB3ZSBtYWtlIHN1cmUgdGhhdCBpcyBub3QgdGhlIGNhc2VcbiAgICAgICAgICAgICAgICAgICAgYWRtXzEuc3RhdGVWZXJzaW9uID0gU3ltYm9sKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAgICAgLy8gRG8gTk9UIGFjY2VzcyBhZG1SZWYgaGVyZSFcbiAgICAgICAgICAgICAgICAgICAgYWRtXzEub25TdG9yZUNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIChfYSA9IGFkbV8xLnJlYWN0aW9uKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBhZG1fMS5yZWFjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRTbmFwc2hvdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIERvIE5PVCBhY2Nlc3MgYWRtUmVmIGhlcmUhXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkbV8xLnN0YXRlVmVyc2lvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgYWRtUmVmLmN1cnJlbnQgPSBhZG1fMTtcbiAgICB9XG4gICAgdmFyIGFkbSA9IGFkbVJlZi5jdXJyZW50O1xuICAgIGlmICghYWRtLnJlYWN0aW9uKSB7XG4gICAgICAgIC8vIEZpcnN0IHJlbmRlciBvciByZWFjdGlvbiB3YXMgZGlzcG9zZWQgYnkgcmVnaXN0cnkgYmVmb3JlIHN1YnNjcmliZVxuICAgICAgICBjcmVhdGVSZWFjdGlvbihhZG0pO1xuICAgICAgICAvLyBTdHJpY3RNb2RlL0NvbmN1cnJlbnRNb2RlL1N1c3BlbnNlIG1heSBtZWFuIHRoYXQgb3VyIGNvbXBvbmVudCBpc1xuICAgICAgICAvLyByZW5kZXJlZCBhbmQgYWJhbmRvbmVkIG11bHRpcGxlIHRpbWVzLCBzbyB3ZSBuZWVkIHRvIHRyYWNrIGxlYWtlZFxuICAgICAgICAvLyBSZWFjdGlvbnMuXG4gICAgICAgIG9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkucmVnaXN0ZXIoYWRtUmVmLCBhZG0sIGFkbSk7XG4gICAgfVxuICAgIFJlYWN0LnVzZURlYnVnVmFsdWUoYWRtLnJlYWN0aW9uLCBwcmludERlYnVnVmFsdWUpO1xuICAgIFJlYWN0LnVzZVN5bmNFeHRlcm5hbFN0b3JlKFxuICAgIC8vIEJvdGggb2YgdGhlc2UgbXVzdCBiZSBzdGFibGUsIG90aGVyd2lzZSBpdCB3b3VsZCBrZWVwIHJlc3Vic2NyaWJpbmcgZXZlcnkgcmVuZGVyLlxuICAgIGFkbS5zdWJzY3JpYmUsIGFkbS5nZXRTbmFwc2hvdCwgYWRtLmdldFNuYXBzaG90KTtcbiAgICAvLyByZW5kZXIgdGhlIG9yaWdpbmFsIGNvbXBvbmVudCwgYnV0IGhhdmUgdGhlXG4gICAgLy8gcmVhY3Rpb24gdHJhY2sgdGhlIG9ic2VydmFibGVzLCBzbyB0aGF0IHJlbmRlcmluZ1xuICAgIC8vIGNhbiBiZSBpbnZhbGlkYXRlZCAoc2VlIGFib3ZlKSBvbmNlIGEgZGVwZW5kZW5jeSBjaGFuZ2VzXG4gICAgdmFyIHJlbmRlclJlc3VsdDtcbiAgICB2YXIgZXhjZXB0aW9uO1xuICAgIGFkbS5yZWFjdGlvbi50cmFjayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZW5kZXJSZXN1bHQgPSByZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZXhjZXB0aW9uID0gZTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChleGNlcHRpb24pIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uOyAvLyByZS10aHJvdyBhbnkgZXhjZXB0aW9ucyBjYXVnaHQgZHVyaW5nIHJlbmRlcmluZ1xuICAgIH1cbiAgICByZXR1cm4gcmVuZGVyUmVzdWx0O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlT2JzZXJ2ZXIuanMubWFwIiwidmFyIF9hLCBfYjtcbmltcG9ydCB7IGZvcndhcmRSZWYsIG1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGlzVXNpbmdTdGF0aWNSZW5kZXJpbmcgfSBmcm9tIFwiLi9zdGF0aWNSZW5kZXJpbmdcIjtcbmltcG9ydCB7IHVzZU9ic2VydmVyIH0gZnJvbSBcIi4vdXNlT2JzZXJ2ZXJcIjtcbnZhciB3YXJuT2JzZXJ2ZXJPcHRpb25zRGVwcmVjYXRlZCA9IHRydWU7XG52YXIgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5mb3I7XG52YXIgaXNGdW5jdGlvbk5hbWVDb25maWd1cmFibGUgPSAoX2IgPSAoX2EgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGZ1bmN0aW9uICgpIHsgfSwgXCJuYW1lXCIpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY29uZmlndXJhYmxlKSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiBmYWxzZTtcbi8vIFVzaW5nIHJlYWN0LWlzIGhhZCBzb21lIGlzc3VlcyAoYW5kIG9wZXJhdGVzIG9uIGVsZW1lbnRzLCBub3Qgb24gdHlwZXMpLCBzZWUgIzYwOCAvICM2MDlcbnZhciBSZWFjdEZvcndhcmRSZWZTeW1ib2wgPSBoYXNTeW1ib2xcbiAgICA/IFN5bWJvbC5mb3IoXCJyZWFjdC5mb3J3YXJkX3JlZlwiKVxuICAgIDogdHlwZW9mIGZvcndhcmRSZWYgPT09IFwiZnVuY3Rpb25cIiAmJiBmb3J3YXJkUmVmKGZ1bmN0aW9uIChwcm9wcykgeyByZXR1cm4gbnVsbDsgfSlbXCIkJHR5cGVvZlwiXTtcbnZhciBSZWFjdE1lbW9TeW1ib2wgPSBoYXNTeW1ib2xcbiAgICA/IFN5bWJvbC5mb3IoXCJyZWFjdC5tZW1vXCIpXG4gICAgOiB0eXBlb2YgbWVtbyA9PT0gXCJmdW5jdGlvblwiICYmIG1lbW8oZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBudWxsOyB9KVtcIiQkdHlwZW9mXCJdO1xuLy8gbi5iLiBiYXNlIGNhc2UgaXMgbm90IHVzZWQgZm9yIGFjdHVhbCB0eXBpbmdzIG9yIGV4cG9ydGVkIGluIHRoZSB0eXBpbmcgZmlsZXNcbmV4cG9ydCBmdW5jdGlvbiBvYnNlcnZlcihiYXNlQ29tcG9uZW50LCBcbi8vIFRPRE8gcmVtb3ZlIGluIG5leHQgbWFqb3Jcbm9wdGlvbnMpIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiB3YXJuT2JzZXJ2ZXJPcHRpb25zRGVwcmVjYXRlZCAmJiBvcHRpb25zKSB7XG4gICAgICAgIHdhcm5PYnNlcnZlck9wdGlvbnNEZXByZWNhdGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlttb2J4LXJlYWN0LWxpdGVdIGBvYnNlcnZlcihmbiwgeyBmb3J3YXJkUmVmOiB0cnVlIH0pYCBpcyBkZXByZWNhdGVkLCB1c2UgYG9ic2VydmVyKFJlYWN0LmZvcndhcmRSZWYoZm4pKWBcIik7XG4gICAgfVxuICAgIGlmIChSZWFjdE1lbW9TeW1ib2wgJiYgYmFzZUNvbXBvbmVudFtcIiQkdHlwZW9mXCJdID09PSBSZWFjdE1lbW9TeW1ib2wpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYngtcmVhY3QtbGl0ZV0gWW91IGFyZSB0cnlpbmcgdG8gdXNlIGBvYnNlcnZlcmAgb24gYSBmdW5jdGlvbiBjb21wb25lbnQgd3JhcHBlZCBpbiBlaXRoZXIgYW5vdGhlciBgb2JzZXJ2ZXJgIG9yIGBSZWFjdC5tZW1vYC4gVGhlIG9ic2VydmVyIGFscmVhZHkgYXBwbGllcyAnUmVhY3QubWVtbycgZm9yIHlvdS5cIik7XG4gICAgfVxuICAgIC8vIFRoZSB3b3JraW5nIG9mIG9ic2VydmVyIGlzIGV4cGxhaW5lZCBzdGVwIGJ5IHN0ZXAgaW4gdGhpcyB0YWxrOiBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PWNQRjRpQmVkb0YwJmZlYXR1cmU9eW91dHUuYmUmdD0xMzA3XG4gICAgaWYgKGlzVXNpbmdTdGF0aWNSZW5kZXJpbmcoKSkge1xuICAgICAgICByZXR1cm4gYmFzZUNvbXBvbmVudDtcbiAgICB9XG4gICAgdmFyIHVzZUZvcndhcmRSZWYgPSAoX2EgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuZm9yd2FyZFJlZikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogZmFsc2U7XG4gICAgdmFyIHJlbmRlciA9IGJhc2VDb21wb25lbnQ7XG4gICAgdmFyIGJhc2VDb21wb25lbnROYW1lID0gYmFzZUNvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBiYXNlQ29tcG9uZW50Lm5hbWU7XG4gICAgLy8gSWYgYWxyZWFkeSB3cmFwcGVkIHdpdGggZm9yd2FyZFJlZiwgdW53cmFwLFxuICAgIC8vIHNvIHdlIGNhbiBwYXRjaCByZW5kZXIgYW5kIGFwcGx5IG1lbW9cbiAgICBpZiAoUmVhY3RGb3J3YXJkUmVmU3ltYm9sICYmIGJhc2VDb21wb25lbnRbXCIkJHR5cGVvZlwiXSA9PT0gUmVhY3RGb3J3YXJkUmVmU3ltYm9sKSB7XG4gICAgICAgIHVzZUZvcndhcmRSZWYgPSB0cnVlO1xuICAgICAgICByZW5kZXIgPSBiYXNlQ29tcG9uZW50W1wicmVuZGVyXCJdO1xuICAgICAgICBpZiAodHlwZW9mIHJlbmRlciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieC1yZWFjdC1saXRlXSBgcmVuZGVyYCBwcm9wZXJ0eSBvZiBGb3J3YXJkUmVmIHdhcyBub3QgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgb2JzZXJ2ZXJDb21wb25lbnQgPSBmdW5jdGlvbiAocHJvcHMsIHJlZikge1xuICAgICAgICByZXR1cm4gdXNlT2JzZXJ2ZXIoZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVuZGVyKHByb3BzLCByZWYpOyB9LCBiYXNlQ29tcG9uZW50TmFtZSk7XG4gICAgfTtcbiAgICBvYnNlcnZlckNvbXBvbmVudC5kaXNwbGF5TmFtZSA9IGJhc2VDb21wb25lbnQuZGlzcGxheU5hbWU7XG4gICAgaWYgKGlzRnVuY3Rpb25OYW1lQ29uZmlndXJhYmxlKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYnNlcnZlckNvbXBvbmVudCwgXCJuYW1lXCIsIHtcbiAgICAgICAgICAgIHZhbHVlOiBiYXNlQ29tcG9uZW50Lm5hbWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gU3VwcG9ydCBsZWdhY3kgY29udGV4dDogYGNvbnRleHRUeXBlc2AgbXVzdCBiZSBhcHBsaWVkIGJlZm9yZSBgbWVtb2BcbiAgICBpZiAoYmFzZUNvbXBvbmVudC5jb250ZXh0VHlwZXMpIHtcbiAgICAgICAgO1xuICAgICAgICBvYnNlcnZlckNvbXBvbmVudC5jb250ZXh0VHlwZXMgPSBiYXNlQ29tcG9uZW50LmNvbnRleHRUeXBlcztcbiAgICB9XG4gICAgaWYgKHVzZUZvcndhcmRSZWYpIHtcbiAgICAgICAgLy8gYGZvcndhcmRSZWZgIG11c3QgYmUgYXBwbGllZCBwcmlvciBgbWVtb2BcbiAgICAgICAgLy8gYGZvcndhcmRSZWYob2JzZXJ2ZXIoY21wKSlgIHRocm93czpcbiAgICAgICAgLy8gXCJmb3J3YXJkUmVmIHJlcXVpcmVzIGEgcmVuZGVyIGZ1bmN0aW9uIGJ1dCByZWNlaXZlZCBhIGBtZW1vYCBjb21wb25lbnQuIEluc3RlYWQgb2YgZm9yd2FyZFJlZihtZW1vKC4uLikpLCB1c2UgbWVtbyhmb3J3YXJkUmVmKC4uLikpXCJcbiAgICAgICAgb2JzZXJ2ZXJDb21wb25lbnQgPSBmb3J3YXJkUmVmKG9ic2VydmVyQ29tcG9uZW50KTtcbiAgICB9XG4gICAgLy8gbWVtbzsgd2UgYXJlIG5vdCBpbnRlcmVzdGVkIGluIGRlZXAgdXBkYXRlc1xuICAgIC8vIGluIHByb3BzOyB3ZSBhc3N1bWUgdGhhdCBpZiBkZWVwIG9iamVjdHMgYXJlIGNoYW5nZWQsXG4gICAgLy8gdGhpcyBpcyBpbiBvYnNlcnZhYmxlcywgd2hpY2ggd291bGQgaGF2ZSBiZWVuIHRyYWNrZWQgYW55d2F5XG4gICAgb2JzZXJ2ZXJDb21wb25lbnQgPSBtZW1vKG9ic2VydmVyQ29tcG9uZW50KTtcbiAgICBjb3B5U3RhdGljUHJvcGVydGllcyhiYXNlQ29tcG9uZW50LCBvYnNlcnZlckNvbXBvbmVudCk7XG4gICAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JzZXJ2ZXJDb21wb25lbnQsIFwiY29udGV4dFR5cGVzXCIsIHtcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYngtcmVhY3QtbGl0ZV0gYFwiLmNvbmNhdCh0aGlzLmRpc3BsYXlOYW1lIHx8ICgoX2EgPSB0aGlzLnR5cGUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kaXNwbGF5TmFtZSkgfHwgKChfYiA9IHRoaXMudHlwZSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLm5hbWUpIHx8IFwiQ29tcG9uZW50XCIsIFwiLmNvbnRleHRUeXBlc2AgbXVzdCBiZSBzZXQgYmVmb3JlIGFwcGx5aW5nIGBvYnNlcnZlcmAuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBvYnNlcnZlckNvbXBvbmVudDtcbn1cbi8vIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9tcmlkZ3dheS9ob2lzdC1ub24tcmVhY3Qtc3RhdGljcy9ibG9iL21hc3Rlci9zcmMvaW5kZXguanNcbnZhciBob2lzdEJsYWNrTGlzdCA9IHtcbiAgICAkJHR5cGVvZjogdHJ1ZSxcbiAgICByZW5kZXI6IHRydWUsXG4gICAgY29tcGFyZTogdHJ1ZSxcbiAgICB0eXBlOiB0cnVlLFxuICAgIC8vIERvbid0IHJlZGVmaW5lIGBkaXNwbGF5TmFtZWAsXG4gICAgLy8gaXQncyBkZWZpbmVkIGFzIGdldHRlci1zZXR0ZXIgcGFpciBvbiBgbWVtb2AgKHNlZSAjMzE5MikuXG4gICAgZGlzcGxheU5hbWU6IHRydWVcbn07XG5mdW5jdGlvbiBjb3B5U3RhdGljUHJvcGVydGllcyhiYXNlLCB0YXJnZXQpIHtcbiAgICBPYmplY3Qua2V5cyhiYXNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKCFob2lzdEJsYWNrTGlzdFtrZXldKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYmFzZSwga2V5KSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW9ic2VydmVyLmpzLm1hcCIsInZhciBfYTtcbmltcG9ydCBcIi4vdXRpbHMvYXNzZXJ0RW52aXJvbm1lbnRcIjtcbmltcG9ydCB7IHVuc3RhYmxlX2JhdGNoZWRVcGRhdGVzIGFzIGJhdGNoIH0gZnJvbSBcIi4vdXRpbHMvcmVhY3RCYXRjaGVkVXBkYXRlc1wiO1xuaW1wb3J0IHsgb2JzZXJ2ZXJCYXRjaGluZyB9IGZyb20gXCIuL3V0aWxzL29ic2VydmVyQmF0Y2hpbmdcIjtcbmltcG9ydCB7IHVzZURlcHJlY2F0ZWQgfSBmcm9tIFwiLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgdXNlT2JzZXJ2ZXIgYXMgdXNlT2JzZXJ2ZXJPcmlnaW5hbCB9IGZyb20gXCIuL3VzZU9ic2VydmVyXCI7XG5pbXBvcnQgeyBlbmFibGVTdGF0aWNSZW5kZXJpbmcgfSBmcm9tIFwiLi9zdGF0aWNSZW5kZXJpbmdcIjtcbmltcG9ydCB7IG9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkgfSBmcm9tIFwiLi91dGlscy9vYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5XCI7XG5vYnNlcnZlckJhdGNoaW5nKGJhdGNoKTtcbmV4cG9ydCB7IGlzVXNpbmdTdGF0aWNSZW5kZXJpbmcsIGVuYWJsZVN0YXRpY1JlbmRlcmluZyB9IGZyb20gXCIuL3N0YXRpY1JlbmRlcmluZ1wiO1xuZXhwb3J0IHsgb2JzZXJ2ZXIgfSBmcm9tIFwiLi9vYnNlcnZlclwiO1xuZXhwb3J0IHsgT2JzZXJ2ZXIgfSBmcm9tIFwiLi9PYnNlcnZlckNvbXBvbmVudFwiO1xuZXhwb3J0IHsgdXNlTG9jYWxPYnNlcnZhYmxlIH0gZnJvbSBcIi4vdXNlTG9jYWxPYnNlcnZhYmxlXCI7XG5leHBvcnQgeyB1c2VMb2NhbFN0b3JlIH0gZnJvbSBcIi4vdXNlTG9jYWxTdG9yZVwiO1xuZXhwb3J0IHsgdXNlQXNPYnNlcnZhYmxlU291cmNlIH0gZnJvbSBcIi4vdXNlQXNPYnNlcnZhYmxlU291cmNlXCI7XG5leHBvcnQgeyBvYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5IGFzIF9vYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5IH07XG5leHBvcnQgdmFyIGNsZWFyVGltZXJzID0gKF9hID0gb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeVtcImZpbmFsaXplQWxsSW1tZWRpYXRlbHlcIl0pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IChmdW5jdGlvbiAoKSB7IH0pO1xuZXhwb3J0IGZ1bmN0aW9uIHVzZU9ic2VydmVyKGZuLCBiYXNlQ29tcG9uZW50TmFtZSkge1xuICAgIGlmIChiYXNlQ29tcG9uZW50TmFtZSA9PT0gdm9pZCAwKSB7IGJhc2VDb21wb25lbnROYW1lID0gXCJvYnNlcnZlZFwiOyB9XG4gICAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgICAgICB1c2VEZXByZWNhdGVkKFwiW21vYngtcmVhY3QtbGl0ZV0gJ3VzZU9ic2VydmVyKGZuKScgaXMgZGVwcmVjYXRlZC4gVXNlIGA8T2JzZXJ2ZXI+e2ZufTwvT2JzZXJ2ZXI+YCBpbnN0ZWFkLCBvciB3cmFwIHRoZSBlbnRpcmUgY29tcG9uZW50IGluIGBvYnNlcnZlcmAuXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdXNlT2JzZXJ2ZXJPcmlnaW5hbChmbiwgYmFzZUNvbXBvbmVudE5hbWUpO1xufVxuZXhwb3J0IHsgaXNPYnNlcnZlckJhdGNoZWQsIG9ic2VydmVyQmF0Y2hpbmcgfSBmcm9tIFwiLi91dGlscy9vYnNlcnZlckJhdGNoaW5nXCI7XG5leHBvcnQgZnVuY3Rpb24gdXNlU3RhdGljUmVuZGVyaW5nKGVuYWJsZSkge1xuICAgIGlmIChcInByb2R1Y3Rpb25cIiAhPT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW21vYngtcmVhY3QtbGl0ZV0gJ3VzZVN0YXRpY1JlbmRlcmluZycgaXMgZGVwcmVjYXRlZCwgdXNlICdlbmFibGVTdGF0aWNSZW5kZXJpbmcnIGluc3RlYWRcIik7XG4gICAgfVxuICAgIGVuYWJsZVN0YXRpY1JlbmRlcmluZyhlbmFibGUpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwiLyohXG5cdENvcHlyaWdodCAoYykgMjAxOCBKZWQgV2F0c29uLlxuXHRMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuXHRodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXHR2YXIgbmF0aXZlQ29kZVN0cmluZyA9ICdbbmF0aXZlIGNvZGVdJztcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRpZiAoYXJnLmxlbmd0aCkge1xuXHRcdFx0XHRcdHZhciBpbm5lciA9IGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKTtcblx0XHRcdFx0XHRpZiAoaW5uZXIpIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChpbm5lcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGlmIChhcmcudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgJiYgIWFyZy50b1N0cmluZy50b1N0cmluZygpLmluY2x1ZGVzKCdbbmF0aXZlIGNvZGVdJykpIHtcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnLnRvU3RyaW5nKCkpO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5leHBvcnQgZnVuY3Rpb24gdXNlUG9zaXRpb25PYnNlcnZlcih0YXJnZXQsIGFjdGl2ZSkge1xuICAgIGNvbnN0IFtwb3NpdGlvbiwgc2V0UG9zaXRpb25dID0gdXNlU3RhdGUoKTtcbiAgICBjb25zdCBvbkFuaW1hdGlvbkZyYW1lSGFuZGxlciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgc2V0UG9zaXRpb24ocHJldiA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gdGFyZ2V0Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGVQb3NpdGlvbihwcmV2LCBuZXh0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgIH0pO1xuICAgIH0sIFt0YXJnZXRdKTtcbiAgICB1c2VBbmltYXRpb25GcmFtZUVmZmVjdChhY3RpdmUgPyBvbkFuaW1hdGlvbkZyYW1lSGFuZGxlciA6IHVuZGVmaW5lZCk7XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xufVxuZnVuY3Rpb24gdXNlQW5pbWF0aW9uRnJhbWVFZmZlY3QoY2FsbGJhY2spIHtcbiAgICB1c2VFZmZlY3QoKCkgPT4gKGNhbGxiYWNrID8gYW5pbWF0aW9uTG9vcChjYWxsYmFjaykgOiB1bmRlZmluZWQpLCBbY2FsbGJhY2tdKTtcbn1cbmZ1bmN0aW9uIHNob3VsZFVwZGF0ZVBvc2l0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gKCFhIHx8XG4gICAgICAgICFiIHx8XG4gICAgICAgIGEuaGVpZ2h0ICE9PSBiLmhlaWdodCB8fFxuICAgICAgICBhLndpZHRoICE9PSBiLndpZHRoIHx8XG4gICAgICAgIGEuYm90dG9tICE9PSBiLmJvdHRvbSB8fFxuICAgICAgICBhLnRvcCAhPT0gYi50b3AgfHxcbiAgICAgICAgYS5sZWZ0ICE9PSBiLmxlZnQgfHxcbiAgICAgICAgYS5yaWdodCAhPT0gYi5yaWdodCk7XG59XG5mdW5jdGlvbiBhbmltYXRpb25Mb29wKGNhbGxiYWNrKSB7XG4gICAgbGV0IHJlcXVlc3RJZDtcbiAgICBjb25zdCByZXF1ZXN0RnJhbWUgPSAoKSA9PiB7XG4gICAgICAgIHJlcXVlc3RJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIHJlcXVlc3RGcmFtZSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IGNhbmNlbCA9ICgpID0+IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShyZXF1ZXN0SWQpO1xuICAgIHJlcXVlc3RGcmFtZSgpO1xuICAgIHJldHVybiBjYW5jZWw7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VQb3NpdGlvbk9ic2VydmVyLmpzLm1hcCIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgeyB1c2VQb3NpdGlvbk9ic2VydmVyIH0gZnJvbSBcIi4vdXNlUG9zaXRpb25PYnNlcnZlci5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIEZpbHRlclNlbGVjdG9yKHByb3BzKSB7XG4gICAgY29uc3QgeyB2YWx1ZSwgb25DaGFuZ2UgfSA9IHByb3BzO1xuICAgIGNvbnN0IFtzaG93LCBzZXRTaG93XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB1c2VSZWYobnVsbCk7XG4gICAgY29uc3QgZmlsdGVyU2VsZWN0b3JzUmVmID0gdXNlUmVmKG51bGwpO1xuICAgIHVzZU9uQ2xpY2tPdXRzaWRlKFtjb21wb25lbnRSZWYsIGZpbHRlclNlbGVjdG9yc1JlZl0sICgpID0+IHNldFNob3coZmFsc2UpKTtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHVzZVBvc2l0aW9uT2JzZXJ2ZXIoY29tcG9uZW50UmVmLmN1cnJlbnQsIHNob3cpO1xuICAgIGNvbnN0IG9uQ2xpY2sgPSB1c2VDYWxsYmFjaygodmFsdWUpID0+IHtcbiAgICAgICAgb25DaGFuZ2UodmFsdWUpO1xuICAgICAgICBzZXRTaG93KGZhbHNlKTtcbiAgICB9LCBbb25DaGFuZ2VdKTtcbiAgICBjb25zdCBmaWx0ZXJTZWxlY3RvcnMgPSAoY3JlYXRlRWxlbWVudChcInVsXCIsIHsgcmVmOiBmaWx0ZXJTZWxlY3RvcnNSZWYsIGlkOiBgJHtwcm9wcy5pZH0tZmlsdGVyLXNlbGVjdG9yc2AsIGNsYXNzTmFtZTogXCJmaWx0ZXItc2VsZWN0b3JzXCIsIHJvbGU6IFwibWVudVwiLCBcImRhdGEtZm9jdXNpbmRleFwiOiAwLCBzdHlsZTogeyBwb3NpdGlvbjogXCJmaXhlZFwiLCB0b3A6IHBvc2l0aW9uPy5ib3R0b20sIGxlZnQ6IHBvc2l0aW9uPy5sZWZ0IH0gfSwgcHJvcHMub3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IChjcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IGNsYXNzTmFtZXMoeyBcImZpbHRlci1zZWxlY3RlZFwiOiB2YWx1ZSA9PT0gb3B0aW9uLnZhbHVlIH0pLCBrZXk6IGluZGV4LCBvbkNsaWNrOiBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBvbkNsaWNrKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgIH0sIG9uS2V5RG93bjogZSA9PiB7XG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiB8fCBlLmtleSA9PT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBvbkNsaWNrKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlLmtleSA9PT0gXCJUYWJcIiAmJiBpbmRleCArIDEgPT09IHByb3BzLm9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIG9uQ2xpY2sodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKGUua2V5ID09PSBcIlRhYlwiICYmIGUuc2hpZnRLZXkgJiYgaW5kZXggPT09IDApIHx8IGUua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudFJlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpPy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHNldFNob3coZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCByb2xlOiBcIm1lbnVpdGVtXCIsIHRhYkluZGV4OiAwIH0sXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IGNsYXNzTmFtZXMoXCJmaWx0ZXItaWNvblwiLCBvcHRpb24udmFsdWUpLCBcImFyaWEtaGlkZGVuXCI6IHRydWUgfSksXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmlsdGVyLWxhYmVsXCIgfSwgb3B0aW9uLmxhYmVsKSkpKSkpO1xuICAgIGNvbnN0IGNvbnRhaW5lckNsaWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBzZXRTaG93KHByZXYgPT4gIXByZXYpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZpbHRlclNlbGVjdG9yc1JlZi5jdXJyZW50Py5xdWVyeVNlbGVjdG9yKFwibGkuZmlsdGVyLXNlbGVjdGVkXCIpPy5mb2N1cygpO1xuICAgICAgICB9LCAxMCk7XG4gICAgfSwgW10pO1xuICAgIHJldHVybiAoY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmaWx0ZXItc2VsZWN0b3JcIiB9LFxuICAgICAgICBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZpbHRlci1zZWxlY3Rvci1jb250ZW50XCIsIHJlZjogY29tcG9uZW50UmVmIH0sXG4gICAgICAgICAgICBjcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIsIHsgXCJhcmlhLWNvbnRyb2xzXCI6IGAke3Byb3BzLmlkfS1maWx0ZXItc2VsZWN0b3JzYCwgXCJhcmlhLWV4cGFuZGVkXCI6IHNob3csIFwiYXJpYS1oYXNwb3B1cFwiOiB0cnVlLCBcImFyaWEtbGFiZWxcIjogcHJvcHMuYXJpYUxhYmVsLCBjbGFzc05hbWU6IGNsYXNzTmFtZXMoXCJidG4gYnRuLWRlZmF1bHQgZmlsdGVyLXNlbGVjdG9yLWJ1dHRvbiBidXR0b24taWNvblwiLCB2YWx1ZSksIG9uQ2xpY2s6IGNvbnRhaW5lckNsaWNrLCBvbktleURvd246IGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIiB8fCBlLmtleSA9PT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXJDbGljaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSB9LCBcIlxcdTAwQTBcIiksXG4gICAgICAgICAgICBzaG93ICYmIGZpbHRlclNlbGVjdG9ycykpKTtcbn1cbmZ1bmN0aW9uIHVzZU9uQ2xpY2tPdXRzaWRlKHJlZiwgaGFuZGxlcikge1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGxpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZWYpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlZi5zb21lKHIgPT4gIXIuY3VycmVudCB8fCByLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFyZWYuY3VycmVudCB8fCByZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGFuZGxlcigpO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGxpc3RlbmVyKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgbGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBsaXN0ZW5lcik7XG4gICAgICAgIH07XG4gICAgfSwgW3JlZiwgaGFuZGxlcl0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RmlsdGVyU2VsZWN0b3IuanMubWFwIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuZXhwb3J0IGZ1bmN0aW9uIEJhZGdlKHByb3BzKSB7XG4gICAgcmV0dXJuIChjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImNvcm5lci1iYWRnZVwiLCBzdHlsZToge1xuICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgIGNvbG9yOiBcInZhcigtLWhpZ2hsaWdodFNlbGVjdGlvbkNvbG9yKVwiLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogXCJ2YXIoLS1oaWdobGlnaHRTZWxlY3Rpb25CYWNrZ3JvdW5kKVwiLFxuICAgICAgICAgICAgZm9udFNpemU6IDEwLFxuICAgICAgICAgICAgLy8gZm9udEZhbWlseTogXCJtb25vc3BhY2VcIixcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHBhZGRpbmc6IFwiMnB4IDhweFwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAzLFxuICAgICAgICAgICAgLi4ucHJvcHMuc3R5bGVcbiAgICAgICAgfSB9LCBwcm9wcy5jaGlsZHJlbikpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2hhcmVkLmpzLm1hcCIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IG9ic2VydmVyIH0gZnJvbSBcIm1vYngtcmVhY3QtbGl0ZVwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCB7IEZpbHRlclNlbGVjdG9yIH0gZnJvbSBcIkBtZW5kaXgvd2lkZ2V0LXBsdWdpbi1maWx0ZXItc2VsZWN0b3IvRmlsdGVyU2VsZWN0b3JcIjtcbmltcG9ydCB7IEJhZGdlIH0gZnJvbSBcIi4uL3NoYXJlZFwiO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1hcnJvdy1jYWxsYmFja1xuZXhwb3J0IGNvbnN0IElucHV0V2l0aEZpbHRlcnMgPSBvYnNlcnZlcihmdW5jdGlvbiBJbnB1dFdpdGhGaWx0ZXJzKHByb3BzKSB7XG4gICAgY29uc3QgeyBpbnB1dFN0b3JlczogW2lucHV0MV0gfSA9IHByb3BzO1xuICAgIHJldHVybiAoY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lcyhcImZpbHRlci1jb250YWluZXJcIiwgcHJvcHMuY2xhc3NOYW1lKSwgXCJkYXRhLWZvY3VzaW5kZXhcIjogcHJvcHMudGFiSW5kZXggPz8gMCwgc3R5bGU6IHByb3BzLnN0eWxlcyB9LFxuICAgICAgICBwcm9wcy5iYWRnZSA/IGNyZWF0ZUVsZW1lbnQoQmFkZ2UsIHsgc3R5bGU6IHsgbGVmdDogNDAgfSB9LCBwcm9wcy5iYWRnZSkgOiBudWxsLFxuICAgICAgICBwcm9wcy5hZGp1c3RhYmxlICYmIChjcmVhdGVFbGVtZW50KEZpbHRlclNlbGVjdG9yLCB7IGFyaWFMYWJlbDogcHJvcHMuc2NyZWVuUmVhZGVyQnV0dG9uQ2FwdGlvbiwgaWQ6IHByb3BzLmlkLCB2YWx1ZTogcHJvcHMuZmlsdGVyRm4sIG9uQ2hhbmdlOiBwcm9wcy5vbkZpbHRlckNoYW5nZSwgb3B0aW9uczogcHJvcHMuZmlsdGVyRm5MaXN0IH0pKSxcbiAgICAgICAgY3JlYXRlRWxlbWVudChcImlucHV0XCIsIHsgXCJhcmlhLWxhYmVsXCI6IHByb3BzLnNjcmVlblJlYWRlcklucHV0Q2FwdGlvbiwgY2xhc3NOYW1lOiBjbGFzc05hbWVzKFwiZm9ybS1jb250cm9sXCIsIHsgXCJmaWx0ZXItaW5wdXRcIjogcHJvcHMuYWRqdXN0YWJsZSB9KSwgZGlzYWJsZWQ6IHByb3BzLmRpc2FibGVJbnB1dHMsIG9uQ2hhbmdlOiBpbnB1dDEub25DaGFuZ2UsIHBsYWNlaG9sZGVyOiBwcm9wcy5wbGFjZWhvbGRlciwgcmVmOiBwcm9wcy5pbnB1dFJlZiwgdHlwZTogcHJvcHMudHlwZSwgdmFsdWU6IGlucHV0MS52YWx1ZSB9KSkpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1JbnB1dFdpdGhGaWx0ZXJzLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQoKSB7XG4gICAgY29uc3QgVVVJRExvY2F0aW9uID0gXCJjb20ubWVuZGl4LndpZGdldHMud2ViLlVVSURcIjtcbiAgICBpZiAoIXdpbmRvd1tVVUlETG9jYXRpb25dKSB7XG4gICAgICAgIHdpbmRvd1tVVUlETG9jYXRpb25dID0gMTtcbiAgICB9XG4gICAgcmV0dXJuIHdpbmRvd1tVVUlETG9jYXRpb25dKys7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZW5lcmF0ZS11dWlkLmpzLm1hcCIsImltcG9ydCB7IG9ic2VydmVyIH0gZnJvbSBcIm1vYngtcmVhY3QtbGl0ZVwiO1xuaW1wb3J0IHsgdXNlRWRpdGFibGVGaWx0ZXJDb250cm9sbGVyIH0gZnJvbSBcIkBtZW5kaXgvd2lkZ2V0LXBsdWdpbi1maWx0ZXJpbmcvaGVscGVycy91c2VFZGl0YWJsZUZpbHRlckNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IHVzZUJhc2ljU3luYyB9IGZyb20gXCJAbWVuZGl4L3dpZGdldC1wbHVnaW4tZmlsdGVyaW5nL2hlbHBlcnMvdXNlQmFzaWNTeW5jXCI7XG5pbXBvcnQgeyBGaWx0ZXJGbkxpc3QsIElucHV0V2l0aEZpbHRlcnMgfSBmcm9tIFwiQG1lbmRpeC93aWRnZXQtcGx1Z2luLWZpbHRlcmluZy9jb250cm9sc1wiO1xuaW1wb3J0IHsgZ2VuZXJhdGVVVUlEIH0gZnJvbSBcIkBtZW5kaXgvd2lkZ2V0LXBsdWdpbi1wbGF0Zm9ybS9mcmFtZXdvcmsvZ2VuZXJhdGUtdXVpZFwiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBEYXRhZ3JpZE51bWJlckZpbHRlckNvbnRhaW5lclByb3BzLCBEZWZhdWx0RmlsdGVyRW51bSB9IGZyb20gXCIuLi8uLi90eXBpbmdzL0RhdGFncmlkTnVtYmVyRmlsdGVyUHJvcHNcIjtcbmltcG9ydCB7IE51bWJlcl9JbnB1dEZpbHRlckludGVyZmFjZSB9IGZyb20gXCJAbWVuZGl4L3dpZGdldC1wbHVnaW4tZmlsdGVyaW5nL3R5cGluZ3MvSW5wdXRGaWx0ZXJJbnRlcmZhY2VcIjtcblxuY29uc3QgZmlsdGVyRGVmczogUmVjb3JkPERlZmF1bHRGaWx0ZXJFbnVtLCBzdHJpbmc+ID0ge1xuICAgIGdyZWF0ZXI6IFwiR3JlYXRlciB0aGFuXCIsXG4gICAgZ3JlYXRlckVxdWFsOiBcIkdyZWF0ZXIgdGhhbiBvciBlcXVhbFwiLFxuICAgIGVxdWFsOiBcIkVxdWFsXCIsXG4gICAgbm90RXF1YWw6IFwiTm90IGVxdWFsXCIsXG4gICAgc21hbGxlcjogXCJTbWFsbGVyIHRoYW5cIixcbiAgICBzbWFsbGVyRXF1YWw6IFwiU21hbGxlciB0aGFuIG9yIGVxdWFsXCIsXG4gICAgZW1wdHk6IFwiRW1wdHlcIixcbiAgICBub3RFbXB0eTogXCJOb3QgZW1wdHlcIlxufTtcblxuY29uc3QgZmlsdGVyczogRmlsdGVyRm5MaXN0PERlZmF1bHRGaWx0ZXJFbnVtPiA9IE9iamVjdC5lbnRyaWVzKGZpbHRlckRlZnMpLm1hcChcbiAgICAoW3ZhbHVlLCBsYWJlbF06IFtEZWZhdWx0RmlsdGVyRW51bSwgc3RyaW5nXSkgPT4gKHtcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGxhYmVsXG4gICAgfSlcbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGFpbmVyUHJvcHMgZXh0ZW5kcyBEYXRhZ3JpZE51bWJlckZpbHRlckNvbnRhaW5lclByb3BzIHtcbiAgICBmaWx0ZXJTdG9yZTogTnVtYmVyX0lucHV0RmlsdGVySW50ZXJmYWNlO1xuICAgIHBhcmVudENoYW5uZWxOYW1lOiBzdHJpbmcgfCBudWxsO1xufVxuXG5mdW5jdGlvbiBDb250YWluZXIocHJvcHM6IENvbnRhaW5lclByb3BzKTogUmVhY3QuUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBpZCA9ICh1c2VSZWY8c3RyaW5nPigpLmN1cnJlbnQgPz89IGBOdW1iZXJGaWx0ZXIke2dlbmVyYXRlVVVJRCgpfWApO1xuXG4gICAgY29uc3QgY29udHJvbGxlciA9IHVzZUVkaXRhYmxlRmlsdGVyQ29udHJvbGxlcih7XG4gICAgICAgIGZpbHRlcjogcHJvcHMuZmlsdGVyU3RvcmUsXG4gICAgICAgIGNoYW5nZURlbGF5OiBwcm9wcy5kZWxheSxcbiAgICAgICAgZGVmYXVsdEZpbHRlcjogcHJvcHMuZGVmYXVsdEZpbHRlcixcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBwcm9wcy5kZWZhdWx0VmFsdWU/LnZhbHVlLFxuICAgICAgICBkaXNhYmxlSW5wdXRzOiBmbiA9PiBmbiA9PT0gXCJlbXB0eVwiIHx8IGZuID09PSBcIm5vdEVtcHR5XCJcbiAgICB9KTtcblxuICAgIHVzZUJhc2ljU3luYyhwcm9wcywgcHJvcHMuZmlsdGVyU3RvcmUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPElucHV0V2l0aEZpbHRlcnNcbiAgICAgICAgICAgIGFkanVzdGFibGU9e3Byb3BzLmFkanVzdGFibGV9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3Byb3BzLmNsYXNzfVxuICAgICAgICAgICAgZGlzYWJsZUlucHV0cz17Y29udHJvbGxlci5kaXNhYmxlSW5wdXRzfVxuICAgICAgICAgICAgZmlsdGVyRm49e2NvbnRyb2xsZXIuc2VsZWN0ZWRGbn1cbiAgICAgICAgICAgIGZpbHRlckZuTGlzdD17ZmlsdGVyc31cbiAgICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICAgIGlucHV0UmVmPXtjb250cm9sbGVyLmlucHV0UmVmfVxuICAgICAgICAgICAgaW5wdXRTdG9yZXM9e2NvbnRyb2xsZXIuaW5wdXRzfVxuICAgICAgICAgICAgbmFtZT17cHJvcHMubmFtZX1cbiAgICAgICAgICAgIG9uRmlsdGVyQ2hhbmdlPXtjb250cm9sbGVyLmhhbmRsZUZpbHRlckZuQ2hhbmdlfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3Byb3BzLnBsYWNlaG9sZGVyPy52YWx1ZX1cbiAgICAgICAgICAgIHNjcmVlblJlYWRlckJ1dHRvbkNhcHRpb249e3Byb3BzLnNjcmVlblJlYWRlckJ1dHRvbkNhcHRpb24/LnZhbHVlfVxuICAgICAgICAgICAgc2NyZWVuUmVhZGVySW5wdXRDYXB0aW9uPXtwcm9wcy5zY3JlZW5SZWFkZXJJbnB1dENhcHRpb24/LnZhbHVlfVxuICAgICAgICAgICAgc3R5bGVzPXtwcm9wcy5zdHlsZX1cbiAgICAgICAgICAgIHRhYkluZGV4PXtwcm9wcy50YWJJbmRleH1cbiAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAvPlxuICAgICk7XG59XG5cbmV4cG9ydCBjb25zdCBOdW1iZXJGaWx0ZXJDb250YWluZXIgPSBvYnNlcnZlcihDb250YWluZXIpO1xuIiwiaW1wb3J0IHsgRHluYW1pY1ZhbHVlIH0gZnJvbSBcIm1lbmRpeFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNMb2FkaW5nRGVmYXVsdFZhbHVlcyhwcm9wczogeyBkZWZhdWx0VmFsdWU/OiBEeW5hbWljVmFsdWU8QmlnPiB9KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHByb3BzLmRlZmF1bHRWYWx1ZT8uc3RhdHVzID09PSBcImxvYWRpbmdcIjtcbn1cbiIsImltcG9ydCB7IENoaWxkcmVuLCBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuLy8gY2xvbmluZyBmcm9tIGh0dHBzOi8vZ2l0bGFiLnJuZC5tZW5kaXguY29tL2FwcGRldi9hcHBkZXYvLS9ibG9iL21hc3Rlci9jbGllbnQvc3JjL3dpZGdldHMvd2ViL2hlbHBlcnMvQWxlcnQudHN4XG5leHBvcnQgY29uc3QgVmFsaWRhdGlvbkFsZXJ0ID0gKHsgY2xhc3NOYW1lLCBjaGlsZHJlbiB9KSA9PiAoY3JlYXRlRWxlbWVudChBbGVydCwgeyBjbGFzc05hbWU6IGNsYXNzTmFtZXMoXCJteC12YWxpZGF0aW9uLW1lc3NhZ2VcIiwgY2xhc3NOYW1lKSwgYm9vdHN0cmFwU3R5bGU6IFwiZGFuZ2VyXCIsIHJvbGU6IFwiYWxlcnRcIiB9LCBjaGlsZHJlbikpO1xuZXhwb3J0IGNvbnN0IEFsZXJ0ID0gKHsgY2xhc3NOYW1lLCBib290c3RyYXBTdHlsZSwgY2hpbGRyZW4sIHJvbGUgfSkgPT4gQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID4gMCA/IChjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGBhbGVydCBhbGVydC0ke2Jvb3RzdHJhcFN0eWxlfWAsIGNsYXNzTmFtZSksIHJvbGU6IHJvbGUgfSwgY2hpbGRyZW4pKSA6IG51bGw7XG5BbGVydC5kaXNwbGF5TmFtZSA9IFwiQWxlcnRcIjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFsZXJ0LmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBlcnJvcihlcnJvcikge1xuICAgIHJldHVybiB7IGhhc0Vycm9yOiB0cnVlLCBlcnJvciB9O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHsgaGFzRXJyb3I6IGZhbHNlLCB2YWx1ZSB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVzdWx0LW1ldGEuanMubWFwIiwidmFyIENvZGU7XG4oZnVuY3Rpb24gKENvZGUpIHtcbiAgICBDb2RlW0NvZGVbXCJFR1JQSU5WQUxJREFUVFJTXCJdID0gNV0gPSBcIkVHUlBJTlZBTElEQVRUUlNcIjtcbiAgICBDb2RlW0NvZGVbXCJFR1JQU1RPUkVDUkVBVEVcIl0gPSA0XSA9IFwiRUdSUFNUT1JFQ1JFQVRFXCI7XG4gICAgQ29kZVtDb2RlW1wiRU1JU1NJTkdTVE9SRVwiXSA9IDJdID0gXCJFTUlTU0lOR1NUT1JFXCI7XG4gICAgQ29kZVtDb2RlW1wiRU5PQ09OVEVYVFwiXSA9IDFdID0gXCJFTk9DT05URVhUXCI7XG4gICAgQ29kZVtDb2RlW1wiRVNUT1JFVFlQRVwiXSA9IDNdID0gXCJFU1RPUkVUWVBFXCI7XG4gICAgQ29kZVtDb2RlW1wiRUdSUEtFWVwiXSA9IDZdID0gXCJFR1JQS0VZXCI7XG59KShDb2RlIHx8IChDb2RlID0ge30pKTtcbmV4cG9ydCB7IENvZGUgYXMgQVBJRXJyb3JDb2RlIH07XG5leHBvcnQgY29uc3QgRU5PQ09OVEVYVCA9IE9iamVjdC5mcmVlemUoe1xuICAgIGNvZGU6IENvZGUuRU5PQ09OVEVYVCxcbiAgICBtZXNzYWdlOiBcIlRoZSBmaWx0ZXIgd2lkZ2V0IG11c3QgYmUgcGxhY2VkIGluc2lkZSB0aGUgY29sdW1uIG9yIGhlYWRlciBvZiB0aGUgRGF0YSBncmlkIDIuMCBvciBpbnNpZGUgaGVhZGVyIG9mIHRoZSBHYWxsZXJ5IHdpZGdldC5cIlxufSk7XG5leHBvcnQgY29uc3QgRU1JU1NJTkdTVE9SRSA9IE9iamVjdC5mcmVlemUoe1xuICAgIGNvZGU6IENvZGUuRU1JU1NJTkdTVE9SRSxcbiAgICBtZXNzYWdlOiBcIlVuYWJsZSB0byBnZXQgZmlsdGVyIHN0b3JlLiBDaGVjayBwYXJlbnQgd2lkZ2V0IGNvbmZpZ3VyYXRpb24uXCJcbn0pO1xuZXhwb3J0IGNvbnN0IEVTVE9SRVRZUEUgPSBPYmplY3QuZnJlZXplKHtcbiAgICBjb2RlOiBDb2RlLkVTVE9SRVRZUEUsXG4gICAgbWVzc2FnZTogXCJUaGUgdHlwZSBvZiB0aGUgZmlsdGVyIGFuZCBwYXJlbnQgd2lkZ2V0IGNvbmZpZ3VyYXRpb24gaXMgaW5jb21wYXRpYmxlLiBUaGUgZmlsdGVyIG11c3QgXCIgK1xuICAgICAgICBcImJlIHVzZWQgd2l0aCBjb3JyZWN0IGF0dHJpYnV0ZS9ncm91cCB0eXBlLlwiXG59KTtcbmV4cG9ydCBjb25zdCBFR1JQS0VZID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY29kZTogQ29kZS5FR1JQS0VZLFxuICAgIG1lc3NhZ2U6IFwiRmlsdGVyIGVycm9yOiBwcm9wZXJ0eSAnR3JvdXAga2V5JyBpcyByZXF1aXJlZC5cIlxufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1lcnJvcnMuanMubWFwIiwiaW1wb3J0IHsgZXJyb3IsIHZhbHVlIH0gZnJvbSBcIi4vcmVzdWx0LW1ldGEuanNcIjtcbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEVOT0NPTlRFWFQgfSBmcm9tIFwiLi9lcnJvcnMuanNcIjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0IHZhciBGaWx0ZXJUeXBlO1xuKGZ1bmN0aW9uIChGaWx0ZXJUeXBlKSB7XG4gICAgRmlsdGVyVHlwZVtcIlNUUklOR1wiXSA9IFwic3RyaW5nXCI7XG4gICAgRmlsdGVyVHlwZVtcIk5VTUJFUlwiXSA9IFwibnVtYmVyXCI7XG4gICAgRmlsdGVyVHlwZVtcIkVOVU1FUkFUSU9OXCJdID0gXCJlbnVtXCI7XG4gICAgRmlsdGVyVHlwZVtcIkRBVEVcIl0gPSBcImRhdGVcIjtcbn0pKEZpbHRlclR5cGUgfHwgKEZpbHRlclR5cGUgPSB7fSkpO1xuY29uc3QgQ09OVEVYVF9PQkpFQ1RfUEFUSCA9IFwiY29tLm1lbmRpeC53aWRnZXRzLndlYi5maWx0ZXJhYmxlLmZpbHRlckNvbnRleHQudjJcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRHbG9iYWxGaWx0ZXJDb250ZXh0T2JqZWN0KCkge1xuICAgIHJldHVybiAod2luZG93W0NPTlRFWFRfT0JKRUNUX1BBVEhdID8/PSBjcmVhdGVDb250ZXh0KG51bGwpKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1c2VGaWx0ZXJDb250ZXh0VmFsdWUoKSB7XG4gICAgY29uc3QgY29udGV4dCA9IGdldEdsb2JhbEZpbHRlckNvbnRleHRPYmplY3QoKTtcbiAgICBjb25zdCBjb250ZXh0VmFsdWUgPSB1c2VDb250ZXh0KGNvbnRleHQpO1xuICAgIGlmIChjb250ZXh0VmFsdWUgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZXJyb3IoRU5PQ09OVEVYVCk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZShjb250ZXh0VmFsdWUpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbHRlclN0b3JlKHByb3ZpZGVyLCBsZWdhY3lUeXBlLCBrZXkpIHtcbiAgICBzd2l0Y2ggKHByb3ZpZGVyLnR5cGUpIHtcbiAgICAgICAgY2FzZSBcImRpcmVjdFwiOlxuICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyLnN0b3JlO1xuICAgICAgICBjYXNlIFwia2V5LXZhbHVlXCI6XG4gICAgICAgICAgICByZXR1cm4gcHJvdmlkZXIuZ2V0KGtleSk7XG4gICAgICAgIGNhc2UgXCJsZWdhY3lcIjpcbiAgICAgICAgICAgIHJldHVybiBwcm92aWRlci5nZXQobGVnYWN5VHlwZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb250ZXh0LmpzLm1hcCIsImltcG9ydCB7IERhdGVJbnB1dEZpbHRlclN0b3JlIH0gZnJvbSBcIi4vRGF0ZUlucHV0RmlsdGVyU3RvcmVcIjtcbmltcG9ydCB7IE51bWJlcklucHV0RmlsdGVyU3RvcmUgfSBmcm9tIFwiLi9OdW1iZXJJbnB1dEZpbHRlclN0b3JlXCI7XG5pbXBvcnQgeyBTdGF0aWNTZWxlY3RGaWx0ZXJTdG9yZSB9IGZyb20gXCIuL1N0YXRpY1NlbGVjdEZpbHRlclN0b3JlXCI7XG5pbXBvcnQgeyBTdHJpbmdJbnB1dEZpbHRlclN0b3JlIH0gZnJvbSBcIi4vU3RyaW5nSW5wdXRGaWx0ZXJTdG9yZVwiO1xuZXhwb3J0IGZ1bmN0aW9uIGF0dHJncm91cEZpbHRlclN0b3JlKHR5cGUsIGF0dHJpYnV0ZXMsIGluaXRDb25kKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgXCJEYXRlVGltZVwiOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlSW5wdXRGaWx0ZXJTdG9yZShhdHRyaWJ1dGVzLCBpbml0Q29uZCk7XG4gICAgICAgIGNhc2UgXCJBdXRvTnVtYmVyXCI6XG4gICAgICAgIGNhc2UgXCJEZWNpbWFsXCI6XG4gICAgICAgIGNhc2UgXCJJbnRlZ2VyXCI6XG4gICAgICAgIGNhc2UgXCJMb25nXCI6XG4gICAgICAgICAgICByZXR1cm4gbmV3IE51bWJlcklucHV0RmlsdGVyU3RvcmUoYXR0cmlidXRlcywgaW5pdENvbmQpO1xuICAgICAgICBjYXNlIFwiU3RyaW5nXCI6XG4gICAgICAgIGNhc2UgXCJIYXNoU3RyaW5nXCI6XG4gICAgICAgICAgICByZXR1cm4gbmV3IFN0cmluZ0lucHV0RmlsdGVyU3RvcmUoYXR0cmlidXRlcywgaW5pdENvbmQpO1xuICAgICAgICBjYXNlIFwiQm9vbGVhblwiOlxuICAgICAgICBjYXNlIFwiRW51bVwiOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdGF0aWNTZWxlY3RGaWx0ZXJTdG9yZShhdHRyaWJ1dGVzLCBpbml0Q29uZCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiYXR0cmdyb3VwRmlsdGVyU3RvcmU6IG5vdCBzdXBwb3J0ZWQgdHlwZSBcIiArIHR5cGUsIGF0dHJpYnV0ZXMpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyRmlsdGVyKHN0b3JlKSB7XG4gICAgcmV0dXJuIHN0b3JlLmFyZzEudHlwZSA9PT0gXCJudW1iZXJcIjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZ0ZpbHRlcihzdG9yZSkge1xuICAgIHJldHVybiBzdG9yZS5hcmcxLnR5cGUgPT09IFwic3RyaW5nXCI7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNEYXRlRmlsdGVyKHN0b3JlKSB7XG4gICAgcmV0dXJuIHN0b3JlLmFyZzEudHlwZSA9PT0gXCJkYXRlXCI7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdG9yZS11dGlscy5qcy5tYXAiLCJpbXBvcnQgeyB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEZpbHRlclR5cGUsIGdldEZpbHRlclN0b3JlLCB1c2VGaWx0ZXJDb250ZXh0VmFsdWUgfSBmcm9tIFwiLi4vY29udGV4dFwiO1xuaW1wb3J0IHsgZXJyb3IsIHZhbHVlIH0gZnJvbSBcIi4uL3Jlc3VsdC1tZXRhXCI7XG5pbXBvcnQgeyBFR1JQS0VZLCBFTUlTU0lOR1NUT1JFLCBFU1RPUkVUWVBFIH0gZnJvbSBcIi4uL2Vycm9yc1wiO1xuaW1wb3J0IHsgaXNOdW1iZXJGaWx0ZXIgfSBmcm9tIFwiLi4vc3RvcmVzL3N0b3JlLXV0aWxzXCI7XG5leHBvcnQgZnVuY3Rpb24gdXNlTnVtYmVyRmlsdGVyQVBJKGtleSkge1xuICAgIGNvbnN0IGN0eCA9IHVzZUZpbHRlckNvbnRleHRWYWx1ZSgpO1xuICAgIGNvbnN0IG51bUFQSSA9IHVzZVJlZigpO1xuICAgIGlmIChjdHguaGFzRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yKGN0eC5lcnJvcik7XG4gICAgfVxuICAgIGNvbnN0IGFwaSA9IGN0eC52YWx1ZTtcbiAgICBpZiAoYXBpLnByb3ZpZGVyLmhhc0Vycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvcihhcGkucHJvdmlkZXIuZXJyb3IpO1xuICAgIH1cbiAgICBpZiAoYXBpLnByb3ZpZGVyLnZhbHVlLnR5cGUgPT09IFwia2V5LXZhbHVlXCIgJiYga2V5ID09PSBcIlwiKSB7XG4gICAgICAgIHJldHVybiBlcnJvcihFR1JQS0VZKTtcbiAgICB9XG4gICAgY29uc3Qgc3RvcmUgPSBnZXRGaWx0ZXJTdG9yZShhcGkucHJvdmlkZXIudmFsdWUsIEZpbHRlclR5cGUuTlVNQkVSLCBrZXkpO1xuICAgIGlmIChzdG9yZSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZXJyb3IoRU1JU1NJTkdTVE9SRSk7XG4gICAgfVxuICAgIGlmIChzdG9yZS5zdG9yZVR5cGUgPT09IFwib3B0aW9ubGlzdFwiIHx8ICFpc051bWJlckZpbHRlcihzdG9yZSkpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yKEVTVE9SRVRZUEUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUoKG51bUFQSS5jdXJyZW50ID8/PSB7IGZpbHRlclN0b3JlOiBzdG9yZSwgcGFyZW50Q2hhbm5lbE5hbWU6IGFwaS5wYXJlbnRDaGFubmVsTmFtZSB9KSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VOdW1iZXJGaWx0ZXJBUEkuanMubWFwIiwiaW1wb3J0IHsgQWxlcnQgfSBmcm9tIFwiQG1lbmRpeC93aWRnZXQtcGx1Z2luLWNvbXBvbmVudC1raXQvQWxlcnRcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IE51bWJlcl9GaWx0ZXJBUEl2MiwgdXNlTnVtYmVyRmlsdGVyQVBJIH0gZnJvbSBcIkBtZW5kaXgvd2lkZ2V0LXBsdWdpbi1maWx0ZXJpbmcvaGVscGVycy91c2VOdW1iZXJGaWx0ZXJBUElcIjtcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgICBncm91cEtleTogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd2l0aE51bWJlckZpbHRlckFQSTxQIGV4dGVuZHMgUHJvcHM+KFxuICAgIENvbXBvbmVudDogKHByb3BzOiBQICYgTnVtYmVyX0ZpbHRlckFQSXYyKSA9PiBSZWFjdC5SZWFjdEVsZW1lbnRcbik6IChwcm9wczogUCkgPT4gUmVhY3QuUmVhY3RFbGVtZW50IHtcbiAgICByZXR1cm4gZnVuY3Rpb24gRmlsdGVyQVBJUHJvdmlkZXIocHJvcHMpIHtcbiAgICAgICAgY29uc3QgYXBpID0gdXNlTnVtYmVyRmlsdGVyQVBJKHByb3BzLmdyb3VwS2V5KTtcblxuICAgICAgICBpZiAoYXBpLmhhc0Vycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gPEFsZXJ0IGJvb3RzdHJhcFN0eWxlPVwiZGFuZ2VyXCI+e2FwaS5lcnJvci5tZXNzYWdlfTwvQWxlcnQ+O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDb21wb25lbnQgZmlsdGVyU3RvcmU9e2FwaS52YWx1ZS5maWx0ZXJTdG9yZX0gcGFyZW50Q2hhbm5lbE5hbWU9e2FwaS52YWx1ZS5wYXJlbnRDaGFubmVsTmFtZX0gey4uLnByb3BzfSAvPlxuICAgICAgICApO1xuICAgIH07XG59XG4iLCJpbXBvcnQgeyBSZWFjdEVsZW1lbnQsIGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHdpdGhQcmVsb2FkZXIgfSBmcm9tIFwiQG1lbmRpeC93aWRnZXQtcGx1Z2luLXBsYXRmb3JtL2hvYy93aXRoUHJlbG9hZGVyXCI7XG5pbXBvcnQgeyBEYXRhZ3JpZE51bWJlckZpbHRlckNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uL3R5cGluZ3MvRGF0YWdyaWROdW1iZXJGaWx0ZXJQcm9wc1wiO1xuaW1wb3J0IHsgTnVtYmVyRmlsdGVyQ29udGFpbmVyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9OdW1iZXJGaWx0ZXJDb250YWluZXJcIjtcbmltcG9ydCB7IGlzTG9hZGluZ0RlZmF1bHRWYWx1ZXMgfSBmcm9tIFwiLi91dGlscy93aWRnZXQtdXRpbHNcIjtcbmltcG9ydCB7IHdpdGhOdW1iZXJGaWx0ZXJBUEkgfSBmcm9tIFwiLi9ob2NzL3dpdGhOdW1iZXJGaWx0ZXJBUElcIjtcblxuY29uc3QgY29udGFpbmVyID0gd2l0aFByZWxvYWRlcjxEYXRhZ3JpZE51bWJlckZpbHRlckNvbnRhaW5lclByb3BzPihOdW1iZXJGaWx0ZXJDb250YWluZXIsIGlzTG9hZGluZ0RlZmF1bHRWYWx1ZXMpO1xuY29uc3QgV2lkZ2V0ID0gd2l0aE51bWJlckZpbHRlckFQSShjb250YWluZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXRhZ3JpZE51bWJlckZpbHRlcihwcm9wczogRGF0YWdyaWROdW1iZXJGaWx0ZXJDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgcmV0dXJuIDxXaWRnZXQgey4uLnByb3BzfSAvPjtcbn1cbiJdLCJuYW1lcyI6WyJ3aXRoUHJlbG9hZGVyIiwiQ29tcG9uZW50IiwiaXNMb2FkaW5nIiwiUHJlbG9hZGVyIiwicHJvcHMiLCJpc0xvYWRlZCIsInVzZVJlZiIsImN1cnJlbnQiLCJjcmVhdGVFbGVtZW50IiwiRnJhZ21lbnQiLCJuaWNlRXJyb3JzIiwiXyIsImFubm90YXRpb25UeXBlIiwia2V5IiwidG9TdHJpbmciLCJpbmRleCIsImxlbmd0aCIsIm90aGVyIiwiY29uc3RydWN0b3IiLCJuYW1lIiwiZGF0YVN0cnVjdHVyZSIsInRoaW5nIiwicHJvcGVydHkiLCJkZXJpdmF0aW9uIiwibWV0aG9kIiwiZXJyb3JzIiwiZGllIiwiZXJyb3IiLCJhcmdzIiwiQXJyYXkiLCJfbGVuIiwiX2tleSIsImFyZ3VtZW50cyIsImUiLCJhcHBseSIsIkVycm9yIiwidXNlU3RhdGUiLCJtYWtlT2JzZXJ2YWJsZSIsImRlZmF1bHROb29wQmF0Y2giLCJjYWxsYmFjayIsIm9ic2VydmVyQmF0Y2hpbmciLCJyZWFjdGlvblNjaGVkdWxlciIsImNvbnNvbGUiLCJ3YXJuIiwiY29uZmlndXJlIiwicHJpbnREZWJ1Z1ZhbHVlIiwidiIsImdldERlcGVuZGVuY3lUcmVlIiwiUkVHSVNUUllfRklOQUxJWkVfQUZURVIiLCJSRUdJU1RSWV9TV0VFUF9JTlRFUlZBTCIsIlRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeSIsImZpbmFsaXplIiwiX3RoaXMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsIk1hcCIsIm1heEFnZSIsImNsZWFyVGltZW91dCIsInN3ZWVwVGltZW91dCIsInVuZGVmaW5lZCIsIm5vdyIsIkRhdGUiLCJyZWdpc3RyYXRpb25zIiwiZm9yRWFjaCIsInJlZ2lzdHJhdGlvbiIsInRva2VuIiwicmVnaXN0ZXJlZEF0IiwidmFsdWUiLCJkZWxldGUiLCJzaXplIiwic2NoZWR1bGVTd2VlcCIsInN3ZWVwIiwidGFyZ2V0Iiwic2V0Iiwic2V0VGltZW91dCIsIlVuaXZlcnNhbEZpbmFsaXphdGlvblJlZ2lzdHJ5IiwiRmluYWxpemF0aW9uUmVnaXN0cnkiLCJvYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5IiwiYWRtIiwiX2EiLCJyZWFjdGlvbiIsImRpc3Bvc2UiLCJjcmVhdGVSZWFjdGlvbiIsIlJlYWN0aW9uIiwiY29uY2F0Iiwic3RhdGVWZXJzaW9uIiwiU3ltYm9sIiwib25TdG9yZUNoYW5nZSIsImNhbGwiLCJ1c2VPYnNlcnZlciIsInJlbmRlciIsImJhc2VDb21wb25lbnROYW1lIiwiYWRtUmVmIiwiUmVhY3QiLCJhZG1fMSIsInN1YnNjcmliZSIsInVucmVnaXN0ZXIiLCJnZXRTbmFwc2hvdCIsInJlZ2lzdGVyIiwidXNlRGVidWdWYWx1ZSIsInVzZVN5bmNFeHRlcm5hbFN0b3JlIiwicmVuZGVyUmVzdWx0IiwiZXhjZXB0aW9uIiwidHJhY2siLCJ3YXJuT2JzZXJ2ZXJPcHRpb25zRGVwcmVjYXRlZCIsImhhc1N5bWJvbCIsImZvciIsImlzRnVuY3Rpb25OYW1lQ29uZmlndXJhYmxlIiwiX2IiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJjb25maWd1cmFibGUiLCJSZWFjdEZvcndhcmRSZWZTeW1ib2wiLCJmb3J3YXJkUmVmIiwiUmVhY3RNZW1vU3ltYm9sIiwibWVtbyIsIm9ic2VydmVyIiwiYmFzZUNvbXBvbmVudCIsIm9wdGlvbnMiLCJ1c2VGb3J3YXJkUmVmIiwiZGlzcGxheU5hbWUiLCJvYnNlcnZlckNvbXBvbmVudCIsInJlZiIsIndyaXRhYmxlIiwiY29udGV4dFR5cGVzIiwiY29weVN0YXRpY1Byb3BlcnRpZXMiLCJ0eXBlIiwiaG9pc3RCbGFja0xpc3QiLCIkJHR5cGVvZiIsImNvbXBhcmUiLCJiYXNlIiwia2V5cyIsImJhdGNoIiwiZGVib3VuY2UiLCJmdW5jIiwid2FpdEZvciIsInRpbWVvdXQiLCJhYm9ydCIsImRlYm91bmNlZCIsIklucHV0U3RvcmUiLCJpbml0IiwiX2RlZmluZVByb3BlcnR5IiwiZXZlbnQiLCJzZXRWYWx1ZSIsIm9ic2VydmFibGUiLCJhY3Rpb24iLCJvbkNoYW5nZSIsIkVkaXRhYmxlRmlsdGVyQ29udHJvbGxlciIsInBhcmFtcyIsImNyZWF0ZVJlZiIsImZuIiwiZmlsdGVyIiwiZmlsdGVyRnVuY3Rpb24iLCJpbnB1dFJlZiIsImZvY3VzIiwiY2hhbmdlRGVsYXkiLCJpbnB1dDEiLCJhcmcxIiwiZGlzcGxheVZhbHVlIiwiaW5wdXQyIiwiYXJnMiIsImlucHV0cyIsImRlZmF1bHRzIiwiZGVmYXVsdEZpbHRlciIsImRlZmF1bHRWYWx1ZSIsImRpc2FibGVkRm4iLCJkaXNhYmxlSW5wdXRzIiwic2VsZWN0ZWRGbiIsImNvbXB1dGVkIiwiaGFuZGxlRmlsdGVyRm5DaGFuZ2UiLCJzZXR1cCIsImRpc3Bvc2VycyIsIm9uSW5wdXRzQ2hhbmdlIiwiY2xlYXJEZWJvdW5jZSIsInYxIiwidjIiLCJydW5JbkFjdGlvbiIsInB1c2giLCJhdXRvcnVuIiwiVU5TQUZFX3NldERlZmF1bHRzIiwidXNlRWRpdGFibGVGaWx0ZXJDb250cm9sbGVyIiwiY3RybCIsInVzZUVmZmVjdCIsInVzZUJhc2ljU3luYyIsInN0b3JlIiwicGJveCIsImNyZWF0ZVB1c2hlciIsInZhbHVlMSIsIl92YWx1ZTIiLCJ2YWx1ZUF0dHJpYnV0ZSIsImNhbkV4ZWN1dGUiLCJleGVjdXRlIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJjbGFzc05hbWVzIiwiY2xhc3NlcyIsImkiLCJhcmciLCJhcmdUeXBlIiwiaXNBcnJheSIsImlubmVyIiwicHJvdG90eXBlIiwiaW5jbHVkZXMiLCJqb2luIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJ3aW5kb3ciLCJ1c2VQb3NpdGlvbk9ic2VydmVyIiwiYWN0aXZlIiwicG9zaXRpb24iLCJzZXRQb3NpdGlvbiIsIm9uQW5pbWF0aW9uRnJhbWVIYW5kbGVyIiwidXNlQ2FsbGJhY2siLCJwcmV2IiwibmV4dCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInNob3VsZFVwZGF0ZVBvc2l0aW9uIiwidXNlQW5pbWF0aW9uRnJhbWVFZmZlY3QiLCJhbmltYXRpb25Mb29wIiwiYSIsImIiLCJoZWlnaHQiLCJ3aWR0aCIsImJvdHRvbSIsInRvcCIsImxlZnQiLCJyaWdodCIsInJlcXVlc3RJZCIsInJlcXVlc3RGcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiRmlsdGVyU2VsZWN0b3IiLCJzaG93Iiwic2V0U2hvdyIsImNvbXBvbmVudFJlZiIsImZpbHRlclNlbGVjdG9yc1JlZiIsInVzZU9uQ2xpY2tPdXRzaWRlIiwib25DbGljayIsImZpbHRlclNlbGVjdG9ycyIsImlkIiwiY2xhc3NOYW1lIiwicm9sZSIsInN0eWxlIiwibWFwIiwib3B0aW9uIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJvbktleURvd24iLCJzaGlmdEtleSIsInF1ZXJ5U2VsZWN0b3IiLCJ0YWJJbmRleCIsImxhYmVsIiwiY29udGFpbmVyQ2xpY2siLCJhcmlhTGFiZWwiLCJoYW5kbGVyIiwibGlzdGVuZXIiLCJzb21lIiwiciIsImNvbnRhaW5zIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkJhZGdlIiwiY29sb3IiLCJiYWNrZ3JvdW5kIiwiZm9udFNpemUiLCJwYWRkaW5nIiwiYm9yZGVyUmFkaXVzIiwiY2hpbGRyZW4iLCJJbnB1dFdpdGhGaWx0ZXJzIiwiaW5wdXRTdG9yZXMiLCJzdHlsZXMiLCJiYWRnZSIsImFkanVzdGFibGUiLCJzY3JlZW5SZWFkZXJCdXR0b25DYXB0aW9uIiwiZmlsdGVyRm4iLCJvbkZpbHRlckNoYW5nZSIsImZpbHRlckZuTGlzdCIsInNjcmVlblJlYWRlcklucHV0Q2FwdGlvbiIsImRpc2FibGVkIiwicGxhY2Vob2xkZXIiLCJnZW5lcmF0ZVVVSUQiLCJVVUlETG9jYXRpb24iLCJBbGVydCIsImJvb3RzdHJhcFN0eWxlIiwiQ2hpbGRyZW4iLCJjb3VudCIsImhhc0Vycm9yIiwiQ29kZSIsIkVOT0NPTlRFWFQiLCJmcmVlemUiLCJjb2RlIiwibWVzc2FnZSIsIkVNSVNTSU5HU1RPUkUiLCJFU1RPUkVUWVBFIiwiRUdSUEtFWSIsIkZpbHRlclR5cGUiLCJDT05URVhUX09CSkVDVF9QQVRIIiwiZ2V0R2xvYmFsRmlsdGVyQ29udGV4dE9iamVjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VGaWx0ZXJDb250ZXh0VmFsdWUiLCJjb250ZXh0IiwiY29udGV4dFZhbHVlIiwidXNlQ29udGV4dCIsImdldEZpbHRlclN0b3JlIiwicHJvdmlkZXIiLCJsZWdhY3lUeXBlIiwiZ2V0IiwiaXNOdW1iZXJGaWx0ZXIiLCJ1c2VOdW1iZXJGaWx0ZXJBUEkiLCJjdHgiLCJudW1BUEkiLCJhcGkiLCJOVU1CRVIiLCJzdG9yZVR5cGUiLCJmaWx0ZXJTdG9yZSIsInBhcmVudENoYW5uZWxOYW1lIl0sIm1hcHBpbmdzIjoiOzs7OztBQUVNLFNBQVVBLGFBQWFBLENBQ3pCQyxTQUEyQyxFQUMzQ0MsU0FBZ0MsRUFBQTtFQUVoQyxPQUFPLFNBQVNDLFNBQVNBLENBQUNDLEtBQVEsRUFBQTtBQUM5QixJQUFBLE1BQU1DLFFBQVEsR0FBSUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDQyxPQUFPLEtBQUssQ0FBQ0wsU0FBUyxDQUFDRSxLQUFLLENBQUUsQ0FBQTtBQUM5RCxJQUFBLE9BQU9DLFFBQVEsR0FBR0csYUFBQSxDQUFDUCxTQUFTLEVBQUE7TUFBQSxHQUFLRyxLQUFBQTtBQUFLLEtBQUEsQ0FBSSxHQUFHSSxhQUFBLENBQUNDLFFBQVEsRUFBRyxJQUFBLENBQUEsQ0FBQTtHQUM1RCxDQUFBO0FBQ0w7O0FDVkEsSUFBTUMsVUFBVSxHQUFHO0FBQ2YsRUFBQSxDQUFDLEVBQThGLDRGQUFBO0FBQy9GLEVBQUEsQ0FBQyxFQUFBQyxTQUFBQSxDQUFBQSxDQUFDQyxj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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
