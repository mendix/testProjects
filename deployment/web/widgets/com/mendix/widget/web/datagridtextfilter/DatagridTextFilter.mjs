import React, { useRef, createElement, Fragment, useState, forwardRef, memo, useCallback, useEffect, createRef, Children, useContext, createContext } from 'react';
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
const InputWithFilters = observer$1(function InputWithFilters(props) {
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

function generateUUID() {
  const UUIDLocation = "com.mendix.widgets.web.UUID";
  if (!window[UUIDLocation]) {
    window[UUIDLocation] = 1;
  }
  return window[UUIDLocation]++;
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

const filterDefs = {
    contains: "Contains",
    startsWith: "Starts with",
    endsWith: "Ends with",
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
// eslint-disable-next-line prefer-arrow-callback
const TextFilterContainer = observer(function TextFilterContainer(props) {
    var _a, _b, _c, _d, _e, _f;
    var _g;
    const id = ((_a = (_g = useRef()).current) !== null && _a !== void 0 ? _a : (_g.current = `TextFilter${generateUUID()}`));
    const controller = useEditableFilterController({
        filter: props.filterStore,
        defaultFilter: props.defaultFilter,
        defaultValue: (_b = props.defaultValue) === null || _b === void 0 ? void 0 : _b.value,
        changeDelay: props.delay,
        disableInputs: fn => fn === "empty" || fn === "notEmpty"
    });
    useBasicSync(props, props.filterStore);
    return (createElement(InputWithFilters, { adjustable: props.adjustable, className: props.class, disableInputs: controller.disableInputs, filterFn: controller.selectedFn, filterFnList: filters, id: id, inputRef: controller.inputRef, inputStores: controller.inputs, name: props.name, onFilterChange: controller.handleFilterFnChange, placeholder: (_c = props.placeholder) === null || _c === void 0 ? void 0 : _c.value, screenReaderButtonCaption: (_d = props.screenReaderButtonCaption) === null || _d === void 0 ? void 0 : _d.value, screenReaderInputCaption: (_e = props.screenReaderInputCaption) === null || _e === void 0 ? void 0 : _e.value, styles: props.style, tabIndex: props.tabIndex, type: "text", defaultValue: (_f = props.defaultValue) === null || _f === void 0 ? void 0 : _f.value }));
});

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

function isStringFilter(store) {
  return store.arg1.type === "string";
}

function useStringFilterAPI(key) {
  const ctx = useFilterContextValue();
  const strAPI = useRef();
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
  const store = getFilterStore(api.provider.value, FilterType.STRING, key);
  if (store === null) {
    return error(EMISSINGSTORE);
  }
  if (store.storeType === "optionlist" || !isStringFilter(store)) {
    return error(ESTORETYPE);
  }
  return value(strAPI.current ??= {
    filterStore: store,
    parentChannelName: api.parentChannelName
  });
}

function withTextFilterAPI(Component) {
    return function FilterAPIProvider(props) {
        const api = useStringFilterAPI(props.groupKey);
        if (api.hasError) {
            return createElement(Alert, { bootstrapStyle: "danger" }, api.error.message);
        }
        return (createElement(Component, { filterStore: api.value.filterStore, parentChannelName: api.value.parentChannelName, ...props }));
    };
}

function isLoadingDefaultValues(props) {
    var _a;
    return ((_a = props.defaultValue) === null || _a === void 0 ? void 0 : _a.status) === "loading";
}

const container = withPreloader(TextFilterContainer, isLoadingDefaultValues);
const Widget = withTextFilterAPI(container);
function DatagridTextFilter(props) {
    return createElement(Widget, { ...props });
}

export { DatagridTextFilter as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWdyaWRUZXh0RmlsdGVyLm1qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tcGxhdGZvcm0vZGlzdC9ob2Mvd2l0aFByZWxvYWRlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4QDYuMTIuM19wYXRjaF9oYXNoPWhuMjRoZnludm9zcnVyMjVtcWNuYXl5dnFpL25vZGVfbW9kdWxlcy9tb2J4L2Rpc3QvbW9ieC5lc20uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9eml1d3NkdG9qZXN6c3U0dzV6cWZjczc0NW1fbW9ieEA2LjEyLjNfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvYXNzZXJ0RW52aXJvbm1lbnQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9eml1d3NkdG9qZXN6c3U0dzV6cWZjczc0NW1fbW9ieEA2LjEyLjNfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvb2JzZXJ2ZXJCYXRjaGluZy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4LXJlYWN0LWxpdGVANC4wLjdfcGF0Y2hfaGFzaD16aXV3c2R0b2plc3pzdTR3NXpxZmNzNzQ1bV9tb2J4QDYuMTIuM19yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL21vYngtcmVhY3QtbGl0ZS9lcy91dGlscy9wcmludERlYnVnVmFsdWUuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9eml1d3NkdG9qZXN6c3U0dzV6cWZjczc0NW1fbW9ieEA2LjEyLjNfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvVW5pdmVyc2FsRmluYWxpemF0aW9uUmVnaXN0cnkuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9eml1d3NkdG9qZXN6c3U0dzV6cWZjczc0NW1fbW9ieEA2LjEyLjNfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4LXJlYWN0LWxpdGVANC4wLjdfcGF0Y2hfaGFzaD16aXV3c2R0b2plc3pzdTR3NXpxZmNzNzQ1bV9tb2J4QDYuMTIuM19yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL21vYngtcmVhY3QtbGl0ZS9lcy91c2VPYnNlcnZlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4LXJlYWN0LWxpdGVANC4wLjdfcGF0Y2hfaGFzaD16aXV3c2R0b2plc3pzdTR3NXpxZmNzNzQ1bV9tb2J4QDYuMTIuM19yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL21vYngtcmVhY3QtbGl0ZS9lcy9vYnNlcnZlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4LXJlYWN0LWxpdGVANC4wLjdfcGF0Y2hfaGFzaD16aXV3c2R0b2plc3pzdTR3NXpxZmNzNzQ1bV9tb2J4QDYuMTIuM19yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL21vYngtcmVhY3QtbGl0ZS9lcy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9jbGFzc25hbWVzQDIuMy4yL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tZmlsdGVyLXNlbGVjdG9yL2Rpc3QvdXNlUG9zaXRpb25PYnNlcnZlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLWZpbHRlci1zZWxlY3Rvci9kaXN0L0ZpbHRlclNlbGVjdG9yLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tZmlsdGVyaW5nL2Rpc3QvY29udHJvbHMvc2hhcmVkLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tZmlsdGVyaW5nL2Rpc3QvY29udHJvbHMvaW5wdXQvSW5wdXRXaXRoRmlsdGVycy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLWZpbHRlcmluZy9kaXN0L2hlbHBlcnMvdXNlQmFzaWNTeW5jLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tcGxhdGZvcm0vZGlzdC91dGlscy9kZWJvdW5jZS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLWZpbHRlcmluZy9kaXN0L3N0b3Jlcy9JbnB1dFN0b3JlLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tZmlsdGVyaW5nL2Rpc3QvY29udHJvbGxlcnMvRWRpdGFibGVGaWx0ZXJDb250cm9sbGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc2hhcmVkL3dpZGdldC1wbHVnaW4tZmlsdGVyaW5nL2Rpc3QvaGVscGVycy91c2VFZGl0YWJsZUZpbHRlckNvbnRyb2xsZXIuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zaGFyZWQvd2lkZ2V0LXBsdWdpbi1wbGF0Zm9ybS9kaXN0L2ZyYW1ld29yay9nZW5lcmF0ZS11dWlkLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21vYngtcmVhY3QtbGl0ZUA0LjAuN19wYXRjaF9oYXNoPXppdXdzZHRvamVzenN1NHc1enFmY3M3NDVtX21vYnhANi4xMi4zX3JlYWN0LWRvbUAxOC4yLjBfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvYXNzZXJ0RW52aXJvbm1lbnQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9eml1d3NkdG9qZXN6c3U0dzV6cWZjczc0NW1fbW9ieEA2LjEyLjNfcmVhY3QtZG9tQDE4LjIuMF9yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL21vYngtcmVhY3QtbGl0ZS9lcy91dGlscy9vYnNlcnZlckJhdGNoaW5nLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21vYngtcmVhY3QtbGl0ZUA0LjAuN19wYXRjaF9oYXNoPXppdXdzZHRvamVzenN1NHc1enFmY3M3NDVtX21vYnhANi4xMi4zX3JlYWN0LWRvbUAxOC4yLjBfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvcHJpbnREZWJ1Z1ZhbHVlLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21vYngtcmVhY3QtbGl0ZUA0LjAuN19wYXRjaF9oYXNoPXppdXdzZHRvamVzenN1NHc1enFmY3M3NDVtX21vYnhANi4xMi4zX3JlYWN0LWRvbUAxOC4yLjBfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXRpbHMvVW5pdmVyc2FsRmluYWxpemF0aW9uUmVnaXN0cnkuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9eml1d3NkdG9qZXN6c3U0dzV6cWZjczc0NW1fbW9ieEA2LjEyLjNfcmVhY3QtZG9tQDE4LjIuMF9yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL21vYngtcmVhY3QtbGl0ZS9lcy91dGlscy9vYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21vYngtcmVhY3QtbGl0ZUA0LjAuN19wYXRjaF9oYXNoPXppdXdzZHRvamVzenN1NHc1enFmY3M3NDVtX21vYnhANi4xMi4zX3JlYWN0LWRvbUAxOC4yLjBfcmVhY3RAMTguMi4wL25vZGVfbW9kdWxlcy9tb2J4LXJlYWN0LWxpdGUvZXMvdXNlT2JzZXJ2ZXIuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbW9ieC1yZWFjdC1saXRlQDQuMC43X3BhdGNoX2hhc2g9eml1d3NkdG9qZXN6c3U0dzV6cWZjczc0NW1fbW9ieEA2LjEyLjNfcmVhY3QtZG9tQDE4LjIuMF9yZWFjdEAxOC4yLjAvbm9kZV9tb2R1bGVzL21vYngtcmVhY3QtbGl0ZS9lcy9vYnNlcnZlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tb2J4LXJlYWN0LWxpdGVANC4wLjdfcGF0Y2hfaGFzaD16aXV3c2R0b2plc3pzdTR3NXpxZmNzNzQ1bV9tb2J4QDYuMTIuM19yZWFjdC1kb21AMTguMi4wX3JlYWN0QDE4LjIuMC9ub2RlX21vZHVsZXMvbW9ieC1yZWFjdC1saXRlL2VzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvVGV4dEZpbHRlckNvbnRhaW5lci50c3giLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zaGFyZWQvd2lkZ2V0LXBsdWdpbi1jb21wb25lbnQta2l0L2Rpc3QvQWxlcnQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zaGFyZWQvd2lkZ2V0LXBsdWdpbi1maWx0ZXJpbmcvZGlzdC9yZXN1bHQtbWV0YS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLWZpbHRlcmluZy9kaXN0L2Vycm9ycy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NoYXJlZC93aWRnZXQtcGx1Z2luLWZpbHRlcmluZy9kaXN0L2NvbnRleHQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zaGFyZWQvd2lkZ2V0LXBsdWdpbi1maWx0ZXJpbmcvZGlzdC9zdG9yZXMvc3RvcmUtdXRpbHMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zaGFyZWQvd2lkZ2V0LXBsdWdpbi1maWx0ZXJpbmcvZGlzdC9oZWxwZXJzL3VzZVN0cmluZ0ZpbHRlckFQSS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9ob2NzL3dpdGhUZXh0RmlsdGVyQVBJLnRzeCIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy93aWRnZXQtdXRpbHMudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvRGF0YWdyaWRUZXh0RmlsdGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCB1c2VSZWYsIEZyYWdtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5leHBvcnQgZnVuY3Rpb24gd2l0aFByZWxvYWRlcihDb21wb25lbnQsIGlzTG9hZGluZykge1xuICAgIHJldHVybiBmdW5jdGlvbiBQcmVsb2FkZXIocHJvcHMpIHtcbiAgICAgICAgY29uc3QgaXNMb2FkZWQgPSAodXNlUmVmKGZhbHNlKS5jdXJyZW50IHx8PSAhaXNMb2FkaW5nKHByb3BzKSk7XG4gICAgICAgIHJldHVybiBpc0xvYWRlZCA/IGNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCB7IC4uLnByb3BzIH0pIDogY3JlYXRlRWxlbWVudChGcmFnbWVudCwgbnVsbCk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpdGhQcmVsb2FkZXIuanMubWFwIiwidmFyIG5pY2VFcnJvcnMgPSB7XG4gIDA6IFwiSW52YWxpZCB2YWx1ZSBmb3IgY29uZmlndXJhdGlvbiAnZW5mb3JjZUFjdGlvbnMnLCBleHBlY3RlZCAnbmV2ZXInLCAnYWx3YXlzJyBvciAnb2JzZXJ2ZWQnXCIsXG4gIDE6IGZ1bmN0aW9uIF8oYW5ub3RhdGlvblR5cGUsIGtleSkge1xuICAgIHJldHVybiBcIkNhbm5vdCBhcHBseSAnXCIgKyBhbm5vdGF0aW9uVHlwZSArIFwiJyB0byAnXCIgKyBrZXkudG9TdHJpbmcoKSArIFwiJzogRmllbGQgbm90IGZvdW5kLlwiO1xuICB9LFxuICAvKlxuICAyKHByb3ApIHtcbiAgICAgIHJldHVybiBgaW52YWxpZCBkZWNvcmF0b3IgZm9yICcke3Byb3AudG9TdHJpbmcoKX0nYFxuICB9LFxuICAzKHByb3ApIHtcbiAgICAgIHJldHVybiBgQ2Fubm90IGRlY29yYXRlICcke3Byb3AudG9TdHJpbmcoKX0nOiBhY3Rpb24gY2FuIG9ubHkgYmUgdXNlZCBvbiBwcm9wZXJ0aWVzIHdpdGggYSBmdW5jdGlvbiB2YWx1ZS5gXG4gIH0sXG4gIDQocHJvcCkge1xuICAgICAgcmV0dXJuIGBDYW5ub3QgZGVjb3JhdGUgJyR7cHJvcC50b1N0cmluZygpfSc6IGNvbXB1dGVkIGNhbiBvbmx5IGJlIHVzZWQgb24gZ2V0dGVyIHByb3BlcnRpZXMuYFxuICB9LFxuICAqL1xuICA1OiBcIidrZXlzKCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMsIHNldHMgYW5kIG1hcHNcIixcbiAgNjogXCIndmFsdWVzKCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMsIHNldHMgYW5kIG1hcHNcIixcbiAgNzogXCInZW50cmllcygpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzIGFuZCBtYXBzXCIsXG4gIDg6IFwiJ3NldCgpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzIGFuZCBtYXBzXCIsXG4gIDk6IFwiJ3JlbW92ZSgpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzIGFuZCBtYXBzXCIsXG4gIDEwOiBcIidoYXMoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cyBhbmQgbWFwc1wiLFxuICAxMTogXCInZ2V0KCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMgYW5kIG1hcHNcIixcbiAgMTI6IFwiSW52YWxpZCBhbm5vdGF0aW9uXCIsXG4gIDEzOiBcIkR5bmFtaWMgb2JzZXJ2YWJsZSBvYmplY3RzIGNhbm5vdCBiZSBmcm96ZW4uIElmIHlvdSdyZSBwYXNzaW5nIG9ic2VydmFibGVzIHRvIDNyZCBwYXJ0eSBjb21wb25lbnQvZnVuY3Rpb24gdGhhdCBjYWxscyBPYmplY3QuZnJlZXplLCBwYXNzIGNvcHkgaW5zdGVhZDogdG9KUyhvYnNlcnZhYmxlKVwiLFxuICAxNDogXCJJbnRlcmNlcHQgaGFuZGxlcnMgc2hvdWxkIHJldHVybiBub3RoaW5nIG9yIGEgY2hhbmdlIG9iamVjdFwiLFxuICAxNTogXCJPYnNlcnZhYmxlIGFycmF5cyBjYW5ub3QgYmUgZnJvemVuLiBJZiB5b3UncmUgcGFzc2luZyBvYnNlcnZhYmxlcyB0byAzcmQgcGFydHkgY29tcG9uZW50L2Z1bmN0aW9uIHRoYXQgY2FsbHMgT2JqZWN0LmZyZWV6ZSwgcGFzcyBjb3B5IGluc3RlYWQ6IHRvSlMob2JzZXJ2YWJsZSlcIixcbiAgMTY6IFwiTW9kaWZpY2F0aW9uIGV4Y2VwdGlvbjogdGhlIGludGVybmFsIHN0cnVjdHVyZSBvZiBhbiBvYnNlcnZhYmxlIGFycmF5IHdhcyBjaGFuZ2VkLlwiLFxuICAxNzogZnVuY3Rpb24gXyhpbmRleCwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIFwiW21vYnguYXJyYXldIEluZGV4IG91dCBvZiBib3VuZHMsIFwiICsgaW5kZXggKyBcIiBpcyBsYXJnZXIgdGhhbiBcIiArIGxlbmd0aDtcbiAgfSxcbiAgMTg6IFwibW9ieC5tYXAgcmVxdWlyZXMgTWFwIHBvbHlmaWxsIGZvciB0aGUgY3VycmVudCBicm93c2VyLiBDaGVjayBiYWJlbC1wb2x5ZmlsbCBvciBjb3JlLWpzL2VzNi9tYXAuanNcIixcbiAgMTk6IGZ1bmN0aW9uIF8ob3RoZXIpIHtcbiAgICByZXR1cm4gXCJDYW5ub3QgaW5pdGlhbGl6ZSBmcm9tIGNsYXNzZXMgdGhhdCBpbmhlcml0IGZyb20gTWFwOiBcIiArIG90aGVyLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH0sXG4gIDIwOiBmdW5jdGlvbiBfKG90aGVyKSB7XG4gICAgcmV0dXJuIFwiQ2Fubm90IGluaXRpYWxpemUgbWFwIGZyb20gXCIgKyBvdGhlcjtcbiAgfSxcbiAgMjE6IGZ1bmN0aW9uIF8oZGF0YVN0cnVjdHVyZSkge1xuICAgIHJldHVybiBcIkNhbm5vdCBjb252ZXJ0IHRvIG1hcCBmcm9tICdcIiArIGRhdGFTdHJ1Y3R1cmUgKyBcIidcIjtcbiAgfSxcbiAgMjI6IFwibW9ieC5zZXQgcmVxdWlyZXMgU2V0IHBvbHlmaWxsIGZvciB0aGUgY3VycmVudCBicm93c2VyLiBDaGVjayBiYWJlbC1wb2x5ZmlsbCBvciBjb3JlLWpzL2VzNi9zZXQuanNcIixcbiAgMjM6IFwiSXQgaXMgbm90IHBvc3NpYmxlIHRvIGdldCBpbmRleCBhdG9tcyBmcm9tIGFycmF5c1wiLFxuICAyNDogZnVuY3Rpb24gXyh0aGluZykge1xuICAgIHJldHVybiBcIkNhbm5vdCBvYnRhaW4gYWRtaW5pc3RyYXRpb24gZnJvbSBcIiArIHRoaW5nO1xuICB9LFxuICAyNTogZnVuY3Rpb24gXyhwcm9wZXJ0eSwgbmFtZSkge1xuICAgIHJldHVybiBcInRoZSBlbnRyeSAnXCIgKyBwcm9wZXJ0eSArIFwiJyBkb2VzIG5vdCBleGlzdCBpbiB0aGUgb2JzZXJ2YWJsZSBtYXAgJ1wiICsgbmFtZSArIFwiJ1wiO1xuICB9LFxuICAyNjogXCJwbGVhc2Ugc3BlY2lmeSBhIHByb3BlcnR5XCIsXG4gIDI3OiBmdW5jdGlvbiBfKHByb3BlcnR5LCBuYW1lKSB7XG4gICAgcmV0dXJuIFwibm8gb2JzZXJ2YWJsZSBwcm9wZXJ0eSAnXCIgKyBwcm9wZXJ0eS50b1N0cmluZygpICsgXCInIGZvdW5kIG9uIHRoZSBvYnNlcnZhYmxlIG9iamVjdCAnXCIgKyBuYW1lICsgXCInXCI7XG4gIH0sXG4gIDI4OiBmdW5jdGlvbiBfKHRoaW5nKSB7XG4gICAgcmV0dXJuIFwiQ2Fubm90IG9idGFpbiBhdG9tIGZyb20gXCIgKyB0aGluZztcbiAgfSxcbiAgMjk6IFwiRXhwZWN0aW5nIHNvbWUgb2JqZWN0XCIsXG4gIDMwOiBcImludmFsaWQgYWN0aW9uIHN0YWNrLiBkaWQgeW91IGZvcmdldCB0byBmaW5pc2ggYW4gYWN0aW9uP1wiLFxuICAzMTogXCJtaXNzaW5nIG9wdGlvbiBmb3IgY29tcHV0ZWQ6IGdldFwiLFxuICAzMjogZnVuY3Rpb24gXyhuYW1lLCBkZXJpdmF0aW9uKSB7XG4gICAgcmV0dXJuIFwiQ3ljbGUgZGV0ZWN0ZWQgaW4gY29tcHV0YXRpb24gXCIgKyBuYW1lICsgXCI6IFwiICsgZGVyaXZhdGlvbjtcbiAgfSxcbiAgMzM6IGZ1bmN0aW9uIF8obmFtZSkge1xuICAgIHJldHVybiBcIlRoZSBzZXR0ZXIgb2YgY29tcHV0ZWQgdmFsdWUgJ1wiICsgbmFtZSArIFwiJyBpcyB0cnlpbmcgdG8gdXBkYXRlIGl0c2VsZi4gRGlkIHlvdSBpbnRlbmQgdG8gdXBkYXRlIGFuIF9vYnNlcnZhYmxlXyB2YWx1ZSwgaW5zdGVhZCBvZiB0aGUgY29tcHV0ZWQgcHJvcGVydHk/XCI7XG4gIH0sXG4gIDM0OiBmdW5jdGlvbiBfKG5hbWUpIHtcbiAgICByZXR1cm4gXCJbQ29tcHV0ZWRWYWx1ZSAnXCIgKyBuYW1lICsgXCInXSBJdCBpcyBub3QgcG9zc2libGUgdG8gYXNzaWduIGEgbmV3IHZhbHVlIHRvIGEgY29tcHV0ZWQgdmFsdWUuXCI7XG4gIH0sXG4gIDM1OiBcIlRoZXJlIGFyZSBtdWx0aXBsZSwgZGlmZmVyZW50IHZlcnNpb25zIG9mIE1vYlggYWN0aXZlLiBNYWtlIHN1cmUgTW9iWCBpcyBsb2FkZWQgb25seSBvbmNlIG9yIHVzZSBgY29uZmlndXJlKHsgaXNvbGF0ZUdsb2JhbFN0YXRlOiB0cnVlIH0pYFwiLFxuICAzNjogXCJpc29sYXRlR2xvYmFsU3RhdGUgc2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgTW9iWCBpcyBydW5uaW5nIGFueSByZWFjdGlvbnNcIixcbiAgMzc6IGZ1bmN0aW9uIF8obWV0aG9kKSB7XG4gICAgcmV0dXJuIFwiW21vYnhdIGBvYnNlcnZhYmxlQXJyYXkuXCIgKyBtZXRob2QgKyBcIigpYCBtdXRhdGVzIHRoZSBhcnJheSBpbi1wbGFjZSwgd2hpY2ggaXMgbm90IGFsbG93ZWQgaW5zaWRlIGEgZGVyaXZhdGlvbi4gVXNlIGBhcnJheS5zbGljZSgpLlwiICsgbWV0aG9kICsgXCIoKWAgaW5zdGVhZFwiO1xuICB9LFxuICAzODogXCInb3duS2V5cygpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0c1wiLFxuICAzOTogXCInZGVmaW5lUHJvcGVydHkoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHNcIlxufTtcbnZhciBlcnJvcnMgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBuaWNlRXJyb3JzIDoge307XG5mdW5jdGlvbiBkaWUoZXJyb3IpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICB2YXIgZSA9IHR5cGVvZiBlcnJvciA9PT0gXCJzdHJpbmdcIiA/IGVycm9yIDogZXJyb3JzW2Vycm9yXTtcbiAgICBpZiAodHlwZW9mIGUgPT09IFwiZnVuY3Rpb25cIikgZSA9IGUuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiW01vYlhdIFwiICsgZSk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKHR5cGVvZiBlcnJvciA9PT0gXCJudW1iZXJcIiA/IFwiW01vYlhdIG1pbmlmaWVkIGVycm9yIG5yOiBcIiArIGVycm9yICsgKGFyZ3MubGVuZ3RoID8gXCIgXCIgKyBhcmdzLm1hcChTdHJpbmcpLmpvaW4oXCIsXCIpIDogXCJcIikgKyBcIi4gRmluZCB0aGUgZnVsbCBlcnJvciBhdDogaHR0cHM6Ly9naXRodWIuY29tL21vYnhqcy9tb2J4L2Jsb2IvbWFpbi9wYWNrYWdlcy9tb2J4L3NyYy9lcnJvcnMudHNcIiA6IFwiW01vYlhdIFwiICsgZXJyb3IpO1xufVxuXG52YXIgbW9ja0dsb2JhbCA9IHt9O1xuZnVuY3Rpb24gZ2V0R2xvYmFsKCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gZ2xvYmFsVGhpcztcbiAgfVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB3aW5kb3c7XG4gIH1cbiAgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gZ2xvYmFsO1xuICB9XG4gIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiBzZWxmO1xuICB9XG4gIHJldHVybiBtb2NrR2xvYmFsO1xufVxuXG4vLyBXZSBzaG9ydGVuIGFueXRoaW5nIHVzZWQgPiA1IHRpbWVzXG52YXIgYXNzaWduID0gT2JqZWN0LmFzc2lnbjtcbnZhciBnZXREZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBvYmplY3RQcm90b3R5cGUgPSBPYmplY3QucHJvdG90eXBlO1xudmFyIEVNUFRZX0FSUkFZID0gW107XG5PYmplY3QuZnJlZXplKEVNUFRZX0FSUkFZKTtcbnZhciBFTVBUWV9PQkpFQ1QgPSB7fTtcbk9iamVjdC5mcmVlemUoRU1QVFlfT0JKRUNUKTtcbnZhciBoYXNQcm94eSA9IHR5cGVvZiBQcm94eSAhPT0gXCJ1bmRlZmluZWRcIjtcbnZhciBwbGFpbk9iamVjdFN0cmluZyA9IC8qI19fUFVSRV9fKi9PYmplY3QudG9TdHJpbmcoKTtcbmZ1bmN0aW9uIGFzc2VydFByb3hpZXMoKSB7XG4gIGlmICghaGFzUHJveHkpIHtcbiAgICBkaWUocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJgUHJveHlgIG9iamVjdHMgYXJlIG5vdCBhdmFpbGFibGUgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQuIFBsZWFzZSBjb25maWd1cmUgTW9iWCB0byBlbmFibGUgYSBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbi5gXCIgOiBcIlByb3h5IG5vdCBhdmFpbGFibGVcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIHdhcm5BYm91dFByb3h5UmVxdWlyZW1lbnQobXNnKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgZ2xvYmFsU3RhdGUudmVyaWZ5UHJveGllcykge1xuICAgIGRpZShcIk1vYlggaXMgY3VycmVudGx5IGNvbmZpZ3VyZWQgdG8gYmUgYWJsZSB0byBydW4gaW4gRVM1IG1vZGUsIGJ1dCBpbiBFUzUgTW9iWCB3b24ndCBiZSBhYmxlIHRvIFwiICsgbXNnKTtcbiAgfVxufVxuZnVuY3Rpb24gZ2V0TmV4dElkKCkge1xuICByZXR1cm4gKytnbG9iYWxTdGF0ZS5tb2J4R3VpZDtcbn1cbi8qKlxuICogTWFrZXMgc3VyZSB0aGF0IHRoZSBwcm92aWRlZCBmdW5jdGlvbiBpcyBpbnZva2VkIGF0IG1vc3Qgb25jZS5cbiAqL1xuZnVuY3Rpb24gb25jZShmdW5jKSB7XG4gIHZhciBpbnZva2VkID0gZmFsc2U7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGludm9rZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW52b2tlZCA9IHRydWU7XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbnZhciBub29wID0gZnVuY3Rpb24gbm9vcCgpIHt9O1xuZnVuY3Rpb24gaXNGdW5jdGlvbihmbikge1xuICByZXR1cm4gdHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCI7XG59XG5mdW5jdGlvbiBpc1N0cmluZ2lzaCh2YWx1ZSkge1xuICB2YXIgdCA9IHR5cGVvZiB2YWx1ZTtcbiAgc3dpdGNoICh0KSB7XG4gICAgY2FzZSBcInN0cmluZ1wiOlxuICAgIGNhc2UgXCJzeW1ib2xcIjpcbiAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuICBpZiAocHJvdG8gPT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBwcm90b0NvbnN0cnVjdG9yID0gT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwocHJvdG8sIFwiY29uc3RydWN0b3JcIikgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgcHJvdG9Db25zdHJ1Y3RvciA9PT0gXCJmdW5jdGlvblwiICYmIHByb3RvQ29uc3RydWN0b3IudG9TdHJpbmcoKSA9PT0gcGxhaW5PYmplY3RTdHJpbmc7XG59XG4vLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzc4NjUxNzBcbmZ1bmN0aW9uIGlzR2VuZXJhdG9yKG9iaikge1xuICB2YXIgY29uc3RydWN0b3IgPSBvYmogPT0gbnVsbCA/IHZvaWQgMCA6IG9iai5jb25zdHJ1Y3RvcjtcbiAgaWYgKCFjb25zdHJ1Y3Rvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoXCJHZW5lcmF0b3JGdW5jdGlvblwiID09PSBjb25zdHJ1Y3Rvci5uYW1lIHx8IFwiR2VuZXJhdG9yRnVuY3Rpb25cIiA9PT0gY29uc3RydWN0b3IuZGlzcGxheU5hbWUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBhZGRIaWRkZW5Qcm9wKG9iamVjdCwgcHJvcE5hbWUsIHZhbHVlKSB7XG4gIGRlZmluZVByb3BlcnR5KG9iamVjdCwgcHJvcE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IHZhbHVlXG4gIH0pO1xufVxuZnVuY3Rpb24gYWRkSGlkZGVuRmluYWxQcm9wKG9iamVjdCwgcHJvcE5hbWUsIHZhbHVlKSB7XG4gIGRlZmluZVByb3BlcnR5KG9iamVjdCwgcHJvcE5hbWUsIHtcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUobmFtZSwgdGhlQ2xhc3MpIHtcbiAgdmFyIHByb3BOYW1lID0gXCJpc01vYlhcIiArIG5hbWU7XG4gIHRoZUNsYXNzLnByb3RvdHlwZVtwcm9wTmFtZV0gPSB0cnVlO1xuICByZXR1cm4gZnVuY3Rpb24gKHgpIHtcbiAgICByZXR1cm4gaXNPYmplY3QoeCkgJiYgeFtwcm9wTmFtZV0gPT09IHRydWU7XG4gIH07XG59XG5mdW5jdGlvbiBpc0VTNk1hcCh0aGluZykge1xuICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiBNYXA7XG59XG5mdW5jdGlvbiBpc0VTNlNldCh0aGluZykge1xuICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiBTZXQ7XG59XG52YXIgaGFzR2V0T3duUHJvcGVydHlTeW1ib2xzID0gdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgIT09IFwidW5kZWZpbmVkXCI7XG4vKipcbiAqIFJldHVybnMgdGhlIGZvbGxvd2luZzogb3duIGVudW1lcmFibGUga2V5cyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gZ2V0UGxhaW5PYmplY3RLZXlzKG9iamVjdCkge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iamVjdCk7XG4gIC8vIE5vdCBzdXBwb3J0ZWQgaW4gSUUsIHNvIHRoZXJlIGFyZSBub3QgZ29pbmcgdG8gYmUgc3ltYm9sIHByb3BzIGFueXdheS4uLlxuICBpZiAoIWhhc0dldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHJldHVybiBrZXlzO1xuICB9XG4gIHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpO1xuICBpZiAoIXN5bWJvbHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGtleXM7XG4gIH1cbiAgcmV0dXJuIFtdLmNvbmNhdChrZXlzLCBzeW1ib2xzLmZpbHRlcihmdW5jdGlvbiAocykge1xuICAgIHJldHVybiBvYmplY3RQcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsIHMpO1xuICB9KSk7XG59XG4vLyBGcm9tIEltbWVyIHV0aWxzXG4vLyBSZXR1cm5zIGFsbCBvd24ga2V5cywgaW5jbHVkaW5nIG5vbi1lbnVtZXJhYmxlIGFuZCBzeW1ib2xpY1xudmFyIG93bktleXMgPSB0eXBlb2YgUmVmbGVjdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBSZWZsZWN0Lm93bktleXMgPyBSZWZsZWN0Lm93bktleXMgOiBoYXNHZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaikpO1xufSA6IC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG5mdW5jdGlvbiBzdHJpbmdpZnlLZXkoa2V5KSB7XG4gIGlmICh0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuICBpZiAodHlwZW9mIGtleSA9PT0gXCJzeW1ib2xcIikge1xuICAgIHJldHVybiBrZXkudG9TdHJpbmcoKTtcbiAgfVxuICByZXR1cm4gbmV3IFN0cmluZyhrZXkpLnRvU3RyaW5nKCk7XG59XG5mdW5jdGlvbiB0b1ByaW1pdGl2ZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgPyBudWxsIDogdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiID8gXCJcIiArIHZhbHVlIDogdmFsdWU7XG59XG5mdW5jdGlvbiBoYXNQcm9wKHRhcmdldCwgcHJvcCkge1xuICByZXR1cm4gb2JqZWN0UHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBwcm9wKTtcbn1cbi8vIEZyb20gSW1tZXIgdXRpbHNcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyh0YXJnZXQpIHtcbiAgLy8gUG9seWZpbGwgbmVlZGVkIGZvciBIZXJtZXMgYW5kIElFLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2hlcm1lcy9pc3N1ZXMvMjc0XG4gIHZhciByZXMgPSB7fTtcbiAgLy8gTm90ZTogd2l0aG91dCBwb2x5ZmlsbCBmb3Igb3duS2V5cywgc3ltYm9scyB3b24ndCBiZSBwaWNrZWQgdXBcbiAgb3duS2V5cyh0YXJnZXQpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHJlc1trZXldID0gZ2V0RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gIH0pO1xuICByZXR1cm4gcmVzO1xufTtcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgX3RvUHJvcGVydHlLZXkoZGVzY3JpcHRvci5rZXkpLCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn1cbmZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gPyBPYmplY3QuYXNzaWduLmJpbmQoKSA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gIHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzO1xuICBfc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHtcbiAgX3NldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mLmJpbmQoKSA6IGZ1bmN0aW9uIF9zZXRQcm90b3R5cGVPZihvLCBwKSB7XG4gICAgby5fX3Byb3RvX18gPSBwO1xuICAgIHJldHVybiBvO1xuICB9O1xuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuZnVuY3Rpb24gX2Fzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKSB7XG4gIGlmIChzZWxmID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cbiAgcmV0dXJuIHNlbGY7XG59XG5mdW5jdGlvbiBfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkobywgbWluTGVuKSB7XG4gIGlmICghbykgcmV0dXJuO1xuICBpZiAodHlwZW9mIG8gPT09IFwic3RyaW5nXCIpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pO1xuICB2YXIgbiA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gIGlmIChuID09PSBcIk9iamVjdFwiICYmIG8uY29uc3RydWN0b3IpIG4gPSBvLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmIChuID09PSBcIk1hcFwiIHx8IG4gPT09IFwiU2V0XCIpIHJldHVybiBBcnJheS5mcm9tKG8pO1xuICBpZiAobiA9PT0gXCJBcmd1bWVudHNcIiB8fCAvXig/OlVpfEkpbnQoPzo4fDE2fDMyKSg/OkNsYW1wZWQpP0FycmF5JC8udGVzdChuKSkgcmV0dXJuIF9hcnJheUxpa2VUb0FycmF5KG8sIG1pbkxlbik7XG59XG5mdW5jdGlvbiBfYXJyYXlMaWtlVG9BcnJheShhcnIsIGxlbikge1xuICBpZiAobGVuID09IG51bGwgfHwgbGVuID4gYXJyLmxlbmd0aCkgbGVuID0gYXJyLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBuZXcgQXJyYXkobGVuKTsgaSA8IGxlbjsgaSsrKSBhcnIyW2ldID0gYXJyW2ldO1xuICByZXR1cm4gYXJyMjtcbn1cbmZ1bmN0aW9uIF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UobywgYWxsb3dBcnJheUxpa2UpIHtcbiAgdmFyIGl0ID0gdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0gfHwgb1tcIkBAaXRlcmF0b3JcIl07XG4gIGlmIChpdCkgcmV0dXJuIChpdCA9IGl0LmNhbGwobykpLm5leHQuYmluZChpdCk7XG4gIGlmIChBcnJheS5pc0FycmF5KG8pIHx8IChpdCA9IF91bnN1cHBvcnRlZEl0ZXJhYmxlVG9BcnJheShvKSkgfHwgYWxsb3dBcnJheUxpa2UgJiYgbyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHtcbiAgICBpZiAoaXQpIG8gPSBpdDtcbiAgICB2YXIgaSA9IDA7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpID49IG8ubGVuZ3RoKSByZXR1cm4ge1xuICAgICAgICBkb25lOiB0cnVlXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZG9uZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBvW2krK11cbiAgICAgIH07XG4gICAgfTtcbiAgfVxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGl0ZXJhdGUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7XG59XG5mdW5jdGlvbiBfdG9QcmltaXRpdmUoaW5wdXQsIGhpbnQpIHtcbiAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gXCJvYmplY3RcIiB8fCBpbnB1dCA9PT0gbnVsbCkgcmV0dXJuIGlucHV0O1xuICB2YXIgcHJpbSA9IGlucHV0W1N5bWJvbC50b1ByaW1pdGl2ZV07XG4gIGlmIChwcmltICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgcmVzID0gcHJpbS5jYWxsKGlucHV0LCBoaW50IHx8IFwiZGVmYXVsdFwiKTtcbiAgICBpZiAodHlwZW9mIHJlcyAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHJlcztcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQEB0b1ByaW1pdGl2ZSBtdXN0IHJldHVybiBhIHByaW1pdGl2ZSB2YWx1ZS5cIik7XG4gIH1cbiAgcmV0dXJuIChoaW50ID09PSBcInN0cmluZ1wiID8gU3RyaW5nIDogTnVtYmVyKShpbnB1dCk7XG59XG5mdW5jdGlvbiBfdG9Qcm9wZXJ0eUtleShhcmcpIHtcbiAgdmFyIGtleSA9IF90b1ByaW1pdGl2ZShhcmcsIFwic3RyaW5nXCIpO1xuICByZXR1cm4gdHlwZW9mIGtleSA9PT0gXCJzeW1ib2xcIiA/IGtleSA6IFN0cmluZyhrZXkpO1xufVxuXG52YXIgc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2wgPSAvKiNfX1BVUkVfXyovU3ltYm9sKFwibW9ieC1zdG9yZWQtYW5ub3RhdGlvbnNcIik7XG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGFjdHMgYXNcbiAqIC0gZGVjb3JhdG9yXG4gKiAtIGFubm90YXRpb24gb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZURlY29yYXRvckFubm90YXRpb24oYW5ub3RhdGlvbikge1xuICBmdW5jdGlvbiBkZWNvcmF0b3IodGFyZ2V0LCBwcm9wZXJ0eSkge1xuICAgIGlmIChpczIwMjIzRGVjb3JhdG9yKHByb3BlcnR5KSkge1xuICAgICAgcmV0dXJuIGFubm90YXRpb24uZGVjb3JhdGVfMjAyMjNfKHRhcmdldCwgcHJvcGVydHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdG9yZUFubm90YXRpb24odGFyZ2V0LCBwcm9wZXJ0eSwgYW5ub3RhdGlvbik7XG4gICAgfVxuICB9XG4gIHJldHVybiBPYmplY3QuYXNzaWduKGRlY29yYXRvciwgYW5ub3RhdGlvbik7XG59XG4vKipcbiAqIFN0b3JlcyBhbm5vdGF0aW9uIHRvIHByb3RvdHlwZSxcbiAqIHNvIGl0IGNhbiBiZSBpbnNwZWN0ZWQgbGF0ZXIgYnkgYG1ha2VPYnNlcnZhYmxlYCBjYWxsZWQgZnJvbSBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBzdG9yZUFubm90YXRpb24ocHJvdG90eXBlLCBrZXksIGFubm90YXRpb24pIHtcbiAgaWYgKCFoYXNQcm9wKHByb3RvdHlwZSwgc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2wpKSB7XG4gICAgYWRkSGlkZGVuUHJvcChwcm90b3R5cGUsIHN0b3JlZEFubm90YXRpb25zU3ltYm9sLCBfZXh0ZW5kcyh7fSwgcHJvdG90eXBlW3N0b3JlZEFubm90YXRpb25zU3ltYm9sXSkpO1xuICB9XG4gIC8vIEBvdmVycmlkZSBtdXN0IG92ZXJyaWRlIHNvbWV0aGluZ1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGlzT3ZlcnJpZGUoYW5ub3RhdGlvbikgJiYgIWhhc1Byb3AocHJvdG90eXBlW3N0b3JlZEFubm90YXRpb25zU3ltYm9sXSwga2V5KSkge1xuICAgIHZhciBmaWVsZE5hbWUgPSBwcm90b3R5cGUuY29uc3RydWN0b3IubmFtZSArIFwiLnByb3RvdHlwZS5cIiArIGtleS50b1N0cmluZygpO1xuICAgIGRpZShcIidcIiArIGZpZWxkTmFtZSArIFwiJyBpcyBkZWNvcmF0ZWQgd2l0aCAnb3ZlcnJpZGUnLCBcIiArIFwiYnV0IG5vIHN1Y2ggZGVjb3JhdGVkIG1lbWJlciB3YXMgZm91bmQgb24gcHJvdG90eXBlLlwiKTtcbiAgfVxuICAvLyBDYW5ub3QgcmUtZGVjb3JhdGVcbiAgYXNzZXJ0Tm90RGVjb3JhdGVkKHByb3RvdHlwZSwgYW5ub3RhdGlvbiwga2V5KTtcbiAgLy8gSWdub3JlIG92ZXJyaWRlXG4gIGlmICghaXNPdmVycmlkZShhbm5vdGF0aW9uKSkge1xuICAgIHByb3RvdHlwZVtzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbF1ba2V5XSA9IGFubm90YXRpb247XG4gIH1cbn1cbmZ1bmN0aW9uIGFzc2VydE5vdERlY29yYXRlZChwcm90b3R5cGUsIGFubm90YXRpb24sIGtleSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFpc092ZXJyaWRlKGFubm90YXRpb24pICYmIGhhc1Byb3AocHJvdG90eXBlW3N0b3JlZEFubm90YXRpb25zU3ltYm9sXSwga2V5KSkge1xuICAgIHZhciBmaWVsZE5hbWUgPSBwcm90b3R5cGUuY29uc3RydWN0b3IubmFtZSArIFwiLnByb3RvdHlwZS5cIiArIGtleS50b1N0cmluZygpO1xuICAgIHZhciBjdXJyZW50QW5ub3RhdGlvblR5cGUgPSBwcm90b3R5cGVbc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2xdW2tleV0uYW5ub3RhdGlvblR5cGVfO1xuICAgIHZhciByZXF1ZXN0ZWRBbm5vdGF0aW9uVHlwZSA9IGFubm90YXRpb24uYW5ub3RhdGlvblR5cGVfO1xuICAgIGRpZShcIkNhbm5vdCBhcHBseSAnQFwiICsgcmVxdWVzdGVkQW5ub3RhdGlvblR5cGUgKyBcIicgdG8gJ1wiICsgZmllbGROYW1lICsgXCInOlwiICsgKFwiXFxuVGhlIGZpZWxkIGlzIGFscmVhZHkgZGVjb3JhdGVkIHdpdGggJ0BcIiArIGN1cnJlbnRBbm5vdGF0aW9uVHlwZSArIFwiJy5cIikgKyBcIlxcblJlLWRlY29yYXRpbmcgZmllbGRzIGlzIG5vdCBhbGxvd2VkLlwiICsgXCJcXG5Vc2UgJ0BvdmVycmlkZScgZGVjb3JhdG9yIGZvciBtZXRob2RzIG92ZXJyaWRkZW4gYnkgc3ViY2xhc3MuXCIpO1xuICB9XG59XG4vKipcbiAqIENvbGxlY3RzIGFubm90YXRpb25zIGZyb20gcHJvdG90eXBlcyBhbmQgc3RvcmVzIHRoZW0gb24gdGFyZ2V0IChpbnN0YW5jZSlcbiAqL1xuZnVuY3Rpb24gY29sbGVjdFN0b3JlZEFubm90YXRpb25zKHRhcmdldCkge1xuICBpZiAoIWhhc1Byb3AodGFyZ2V0LCBzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbCkpIHtcbiAgICAvLyBpZiAoX19ERVZfXyAmJiAhdGFyZ2V0W3N0b3JlZEFubm90YXRpb25zU3ltYm9sXSkge1xuICAgIC8vICAgICBkaWUoXG4gICAgLy8gICAgICAgICBgTm8gYW5ub3RhdGlvbnMgd2VyZSBwYXNzZWQgdG8gbWFrZU9ic2VydmFibGUsIGJ1dCBubyBkZWNvcmF0ZWQgbWVtYmVycyBoYXZlIGJlZW4gZm91bmQgZWl0aGVyYFxuICAgIC8vICAgICApXG4gICAgLy8gfVxuICAgIC8vIFdlIG5lZWQgYSBjb3B5IGFzIHdlIHdpbGwgcmVtb3ZlIGFubm90YXRpb24gZnJvbSB0aGUgbGlzdCBvbmNlIGl0J3MgYXBwbGllZC5cbiAgICBhZGRIaWRkZW5Qcm9wKHRhcmdldCwgc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2wsIF9leHRlbmRzKHt9LCB0YXJnZXRbc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2xdKSk7XG4gIH1cbiAgcmV0dXJuIHRhcmdldFtzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbF07XG59XG5mdW5jdGlvbiBpczIwMjIzRGVjb3JhdG9yKGNvbnRleHQpIHtcbiAgcmV0dXJuIHR5cGVvZiBjb250ZXh0ID09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGNvbnRleHRbXCJraW5kXCJdID09IFwic3RyaW5nXCI7XG59XG5mdW5jdGlvbiBhc3NlcnQyMDIyM0RlY29yYXRvclR5cGUoY29udGV4dCwgdHlwZXMpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhdHlwZXMuaW5jbHVkZXMoY29udGV4dC5raW5kKSkge1xuICAgIGRpZShcIlRoZSBkZWNvcmF0b3IgYXBwbGllZCB0byAnXCIgKyBTdHJpbmcoY29udGV4dC5uYW1lKSArIFwiJyBjYW5ub3QgYmUgdXNlZCBvbiBhIFwiICsgY29udGV4dC5raW5kICsgXCIgZWxlbWVudFwiKTtcbiAgfVxufVxuXG52YXIgJG1vYnggPSAvKiNfX1BVUkVfXyovU3ltYm9sKFwibW9ieCBhZG1pbmlzdHJhdGlvblwiKTtcbnZhciBBdG9tID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLy8gZm9yIGVmZmVjdGl2ZSB1bm9ic2VydmluZy4gQmFzZUF0b20gaGFzIHRydWUsIGZvciBleHRyYSBvcHRpbWl6YXRpb24sIHNvIGl0cyBvbkJlY29tZVVub2JzZXJ2ZWQgbmV2ZXIgZ2V0cyBjYWxsZWQsIGJlY2F1c2UgaXQncyBub3QgbmVlZGVkXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBhdG9tLiBGb3IgZGVidWdnaW5nIHB1cnBvc2VzIGl0IGlzIHJlY29tbWVuZGVkIHRvIGdpdmUgaXQgYSBuYW1lLlxuICAgKiBUaGUgb25CZWNvbWVPYnNlcnZlZCBhbmQgb25CZWNvbWVVbm9ic2VydmVkIGNhbGxiYWNrcyBjYW4gYmUgdXNlZCBmb3IgcmVzb3VyY2UgbWFuYWdlbWVudC5cbiAgICovXG4gIGZ1bmN0aW9uIEF0b20obmFtZV8pIHtcbiAgICBpZiAobmFtZV8gPT09IHZvaWQgMCkge1xuICAgICAgbmFtZV8gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcIkF0b21AXCIgKyBnZXROZXh0SWQoKSA6IFwiQXRvbVwiO1xuICAgIH1cbiAgICB0aGlzLm5hbWVfID0gdm9pZCAwO1xuICAgIHRoaXMuaXNQZW5kaW5nVW5vYnNlcnZhdGlvbl8gPSBmYWxzZTtcbiAgICB0aGlzLmlzQmVpbmdPYnNlcnZlZF8gPSBmYWxzZTtcbiAgICB0aGlzLm9ic2VydmVyc18gPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5kaWZmVmFsdWVfID0gMDtcbiAgICB0aGlzLmxhc3RBY2Nlc3NlZEJ5XyA9IDA7XG4gICAgdGhpcy5sb3dlc3RPYnNlcnZlclN0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLk5PVF9UUkFDS0lOR187XG4gICAgdGhpcy5vbkJPTCA9IHZvaWQgMDtcbiAgICB0aGlzLm9uQlVPTCA9IHZvaWQgMDtcbiAgICB0aGlzLm5hbWVfID0gbmFtZV87XG4gIH1cbiAgLy8gb25CZWNvbWVPYnNlcnZlZExpc3RlbmVyc1xuICB2YXIgX3Byb3RvID0gQXRvbS5wcm90b3R5cGU7XG4gIF9wcm90by5vbkJPID0gZnVuY3Rpb24gb25CTygpIHtcbiAgICBpZiAodGhpcy5vbkJPTCkge1xuICAgICAgdGhpcy5vbkJPTC5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gbGlzdGVuZXIoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLm9uQlVPID0gZnVuY3Rpb24gb25CVU8oKSB7XG4gICAgaWYgKHRoaXMub25CVU9MKSB7XG4gICAgICB0aGlzLm9uQlVPTC5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gbGlzdGVuZXIoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogSW52b2tlIHRoaXMgbWV0aG9kIHRvIG5vdGlmeSBtb2J4IHRoYXQgeW91ciBhdG9tIGhhcyBiZWVuIHVzZWQgc29tZWhvdy5cbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGlzIGN1cnJlbnRseSBhIHJlYWN0aXZlIGNvbnRleHQuXG4gICAqLztcbiAgX3Byb3RvLnJlcG9ydE9ic2VydmVkID0gZnVuY3Rpb24gcmVwb3J0T2JzZXJ2ZWQkMSgpIHtcbiAgICByZXR1cm4gcmVwb3J0T2JzZXJ2ZWQodGhpcyk7XG4gIH1cbiAgLyoqXG4gICAqIEludm9rZSB0aGlzIG1ldGhvZCBfYWZ0ZXJfIHRoaXMgbWV0aG9kIGhhcyBjaGFuZ2VkIHRvIHNpZ25hbCBtb2J4IHRoYXQgYWxsIGl0cyBvYnNlcnZlcnMgc2hvdWxkIGludmFsaWRhdGUuXG4gICAqLztcbiAgX3Byb3RvLnJlcG9ydENoYW5nZWQgPSBmdW5jdGlvbiByZXBvcnRDaGFuZ2VkKCkge1xuICAgIHN0YXJ0QmF0Y2goKTtcbiAgICBwcm9wYWdhdGVDaGFuZ2VkKHRoaXMpO1xuICAgIGVuZEJhdGNoKCk7XG4gIH07XG4gIF9wcm90by50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWVfO1xuICB9O1xuICByZXR1cm4gQXRvbTtcbn0oKTtcbnZhciBpc0F0b20gPSAvKiNfX1BVUkVfXyovY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZShcIkF0b21cIiwgQXRvbSk7XG5mdW5jdGlvbiBjcmVhdGVBdG9tKG5hbWUsIG9uQmVjb21lT2JzZXJ2ZWRIYW5kbGVyLCBvbkJlY29tZVVub2JzZXJ2ZWRIYW5kbGVyKSB7XG4gIGlmIChvbkJlY29tZU9ic2VydmVkSGFuZGxlciA9PT0gdm9pZCAwKSB7XG4gICAgb25CZWNvbWVPYnNlcnZlZEhhbmRsZXIgPSBub29wO1xuICB9XG4gIGlmIChvbkJlY29tZVVub2JzZXJ2ZWRIYW5kbGVyID09PSB2b2lkIDApIHtcbiAgICBvbkJlY29tZVVub2JzZXJ2ZWRIYW5kbGVyID0gbm9vcDtcbiAgfVxuICB2YXIgYXRvbSA9IG5ldyBBdG9tKG5hbWUpO1xuICAvLyBkZWZhdWx0IGBub29wYCBsaXN0ZW5lciB3aWxsIG5vdCBpbml0aWFsaXplIHRoZSBob29rIFNldFxuICBpZiAob25CZWNvbWVPYnNlcnZlZEhhbmRsZXIgIT09IG5vb3ApIHtcbiAgICBvbkJlY29tZU9ic2VydmVkKGF0b20sIG9uQmVjb21lT2JzZXJ2ZWRIYW5kbGVyKTtcbiAgfVxuICBpZiAob25CZWNvbWVVbm9ic2VydmVkSGFuZGxlciAhPT0gbm9vcCkge1xuICAgIG9uQmVjb21lVW5vYnNlcnZlZChhdG9tLCBvbkJlY29tZVVub2JzZXJ2ZWRIYW5kbGVyKTtcbiAgfVxuICByZXR1cm4gYXRvbTtcbn1cblxuZnVuY3Rpb24gaWRlbnRpdHlDb21wYXJlcihhLCBiKSB7XG4gIHJldHVybiBhID09PSBiO1xufVxuZnVuY3Rpb24gc3RydWN0dXJhbENvbXBhcmVyKGEsIGIpIHtcbiAgcmV0dXJuIGRlZXBFcXVhbChhLCBiKTtcbn1cbmZ1bmN0aW9uIHNoYWxsb3dDb21wYXJlcihhLCBiKSB7XG4gIHJldHVybiBkZWVwRXF1YWwoYSwgYiwgMSk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZXIoYSwgYikge1xuICBpZiAoT2JqZWN0LmlzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5pcyhhLCBiKTtcbiAgfVxuICByZXR1cm4gYSA9PT0gYiA/IGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiIDogYSAhPT0gYSAmJiBiICE9PSBiO1xufVxudmFyIGNvbXBhcmVyID0ge1xuICBpZGVudGl0eTogaWRlbnRpdHlDb21wYXJlcixcbiAgc3RydWN0dXJhbDogc3RydWN0dXJhbENvbXBhcmVyLFxuICBcImRlZmF1bHRcIjogZGVmYXVsdENvbXBhcmVyLFxuICBzaGFsbG93OiBzaGFsbG93Q29tcGFyZXJcbn07XG5cbmZ1bmN0aW9uIGRlZXBFbmhhbmNlcih2LCBfLCBuYW1lKSB7XG4gIC8vIGl0IGlzIGFuIG9ic2VydmFibGUgYWxyZWFkeSwgZG9uZVxuICBpZiAoaXNPYnNlcnZhYmxlKHYpKSB7XG4gICAgcmV0dXJuIHY7XG4gIH1cbiAgLy8gc29tZXRoaW5nIHRoYXQgY2FuIGJlIGNvbnZlcnRlZCBhbmQgbXV0YXRlZD9cbiAgaWYgKEFycmF5LmlzQXJyYXkodikpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5hcnJheSh2LCB7XG4gICAgICBuYW1lOiBuYW1lXG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzUGxhaW5PYmplY3QodikpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5vYmplY3QodiwgdW5kZWZpbmVkLCB7XG4gICAgICBuYW1lOiBuYW1lXG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzRVM2TWFwKHYpKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUubWFwKHYsIHtcbiAgICAgIG5hbWU6IG5hbWVcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNFUzZTZXQodikpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5zZXQodiwge1xuICAgICAgbmFtZTogbmFtZVxuICAgIH0pO1xuICB9XG4gIGlmICh0eXBlb2YgdiA9PT0gXCJmdW5jdGlvblwiICYmICFpc0FjdGlvbih2KSAmJiAhaXNGbG93KHYpKSB7XG4gICAgaWYgKGlzR2VuZXJhdG9yKHYpKSB7XG4gICAgICByZXR1cm4gZmxvdyh2KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGF1dG9BY3Rpb24obmFtZSwgdik7XG4gICAgfVxuICB9XG4gIHJldHVybiB2O1xufVxuZnVuY3Rpb24gc2hhbGxvd0VuaGFuY2VyKHYsIF8sIG5hbWUpIHtcbiAgaWYgKHYgPT09IHVuZGVmaW5lZCB8fCB2ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHY7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCh2KSB8fCBpc09ic2VydmFibGVBcnJheSh2KSB8fCBpc09ic2VydmFibGVNYXAodikgfHwgaXNPYnNlcnZhYmxlU2V0KHYpKSB7XG4gICAgcmV0dXJuIHY7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkodikpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5hcnJheSh2LCB7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgZGVlcDogZmFsc2VcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNQbGFpbk9iamVjdCh2KSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlLm9iamVjdCh2LCB1bmRlZmluZWQsIHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICBkZWVwOiBmYWxzZVxuICAgIH0pO1xuICB9XG4gIGlmIChpc0VTNk1hcCh2KSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlLm1hcCh2LCB7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgZGVlcDogZmFsc2VcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNFUzZTZXQodikpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5zZXQodiwge1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGRlZXA6IGZhbHNlXG4gICAgfSk7XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGRpZShcIlRoZSBzaGFsbG93IG1vZGlmaWVyIC8gZGVjb3JhdG9yIGNhbiBvbmx5IHVzZWQgaW4gY29tYmluYXRpb24gd2l0aCBhcnJheXMsIG9iamVjdHMsIG1hcHMgYW5kIHNldHNcIik7XG4gIH1cbn1cbmZ1bmN0aW9uIHJlZmVyZW5jZUVuaGFuY2VyKG5ld1ZhbHVlKSB7XG4gIC8vIG5ldmVyIHR1cm4gaW50byBhbiBvYnNlcnZhYmxlXG4gIHJldHVybiBuZXdWYWx1ZTtcbn1cbmZ1bmN0aW9uIHJlZlN0cnVjdEVuaGFuY2VyKHYsIG9sZFZhbHVlKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgaXNPYnNlcnZhYmxlKHYpKSB7XG4gICAgZGllKFwib2JzZXJ2YWJsZS5zdHJ1Y3Qgc2hvdWxkIG5vdCBiZSB1c2VkIHdpdGggb2JzZXJ2YWJsZSB2YWx1ZXNcIik7XG4gIH1cbiAgaWYgKGRlZXBFcXVhbCh2LCBvbGRWYWx1ZSkpIHtcbiAgICByZXR1cm4gb2xkVmFsdWU7XG4gIH1cbiAgcmV0dXJuIHY7XG59XG5cbnZhciBPVkVSUklERSA9IFwib3ZlcnJpZGVcIjtcbnZhciBvdmVycmlkZSA9IC8qI19fUFVSRV9fKi9jcmVhdGVEZWNvcmF0b3JBbm5vdGF0aW9uKHtcbiAgYW5ub3RhdGlvblR5cGVfOiBPVkVSUklERSxcbiAgbWFrZV86IG1ha2VfLFxuICBleHRlbmRfOiBleHRlbmRfLFxuICBkZWNvcmF0ZV8yMDIyM186IGRlY29yYXRlXzIwMjIzX1xufSk7XG5mdW5jdGlvbiBpc092ZXJyaWRlKGFubm90YXRpb24pIHtcbiAgcmV0dXJuIGFubm90YXRpb24uYW5ub3RhdGlvblR5cGVfID09PSBPVkVSUklERTtcbn1cbmZ1bmN0aW9uIG1ha2VfKGFkbSwga2V5KSB7XG4gIC8vIE11c3Qgbm90IGJlIHBsYWluIG9iamVjdFxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGFkbS5pc1BsYWluT2JqZWN0Xykge1xuICAgIGRpZShcIkNhbm5vdCBhcHBseSAnXCIgKyB0aGlzLmFubm90YXRpb25UeXBlXyArIFwiJyB0byAnXCIgKyBhZG0ubmFtZV8gKyBcIi5cIiArIGtleS50b1N0cmluZygpICsgXCInOlwiICsgKFwiXFxuJ1wiICsgdGhpcy5hbm5vdGF0aW9uVHlwZV8gKyBcIicgY2Fubm90IGJlIHVzZWQgb24gcGxhaW4gb2JqZWN0cy5cIikpO1xuICB9XG4gIC8vIE11c3Qgb3ZlcnJpZGUgc29tZXRoaW5nXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWhhc1Byb3AoYWRtLmFwcGxpZWRBbm5vdGF0aW9uc18sIGtleSkpIHtcbiAgICBkaWUoXCInXCIgKyBhZG0ubmFtZV8gKyBcIi5cIiArIGtleS50b1N0cmluZygpICsgXCInIGlzIGFubm90YXRlZCB3aXRoICdcIiArIHRoaXMuYW5ub3RhdGlvblR5cGVfICsgXCInLCBcIiArIFwiYnV0IG5vIHN1Y2ggYW5ub3RhdGVkIG1lbWJlciB3YXMgZm91bmQgb24gcHJvdG90eXBlLlwiKTtcbiAgfVxuICByZXR1cm4gMCAvKiBNYWtlUmVzdWx0LkNhbmNlbCAqLztcbn1cblxuZnVuY3Rpb24gZXh0ZW5kXyhhZG0sIGtleSwgZGVzY3JpcHRvciwgcHJveHlUcmFwKSB7XG4gIGRpZShcIidcIiArIHRoaXMuYW5ub3RhdGlvblR5cGVfICsgXCInIGNhbiBvbmx5IGJlIHVzZWQgd2l0aCAnbWFrZU9ic2VydmFibGUnXCIpO1xufVxuZnVuY3Rpb24gZGVjb3JhdGVfMjAyMjNfKGRlc2MsIGNvbnRleHQpIHtcbiAgY29uc29sZS53YXJuKFwiJ1wiICsgdGhpcy5hbm5vdGF0aW9uVHlwZV8gKyBcIicgY2Fubm90IGJlIHVzZWQgd2l0aCBkZWNvcmF0b3JzIC0gdGhpcyBpcyBhIG5vLW9wXCIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBY3Rpb25Bbm5vdGF0aW9uKG5hbWUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHtcbiAgICBhbm5vdGF0aW9uVHlwZV86IG5hbWUsXG4gICAgb3B0aW9uc186IG9wdGlvbnMsXG4gICAgbWFrZV86IG1ha2VfJDEsXG4gICAgZXh0ZW5kXzogZXh0ZW5kXyQxLFxuICAgIGRlY29yYXRlXzIwMjIzXzogZGVjb3JhdGVfMjAyMjNfJDFcbiAgfTtcbn1cbmZ1bmN0aW9uIG1ha2VfJDEoYWRtLCBrZXksIGRlc2NyaXB0b3IsIHNvdXJjZSkge1xuICB2YXIgX3RoaXMkb3B0aW9uc187XG4gIC8vIGJvdW5kXG4gIGlmICgoX3RoaXMkb3B0aW9uc18gPSB0aGlzLm9wdGlvbnNfKSAhPSBudWxsICYmIF90aGlzJG9wdGlvbnNfLmJvdW5kKSB7XG4gICAgcmV0dXJuIHRoaXMuZXh0ZW5kXyhhZG0sIGtleSwgZGVzY3JpcHRvciwgZmFsc2UpID09PSBudWxsID8gMCAvKiBNYWtlUmVzdWx0LkNhbmNlbCAqLyA6IDEgLyogTWFrZVJlc3VsdC5CcmVhayAqLztcbiAgfVxuICAvLyBvd25cbiAgaWYgKHNvdXJjZSA9PT0gYWRtLnRhcmdldF8pIHtcbiAgICByZXR1cm4gdGhpcy5leHRlbmRfKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBmYWxzZSkgPT09IG51bGwgPyAwIC8qIE1ha2VSZXN1bHQuQ2FuY2VsICovIDogMiAvKiBNYWtlUmVzdWx0LkNvbnRpbnVlICovO1xuICB9XG4gIC8vIHByb3RvdHlwZVxuICBpZiAoaXNBY3Rpb24oZGVzY3JpcHRvci52YWx1ZSkpIHtcbiAgICAvLyBBIHByb3RvdHlwZSBjb3VsZCBoYXZlIGJlZW4gYW5ub3RhdGVkIGFscmVhZHkgYnkgb3RoZXIgY29uc3RydWN0b3IsXG4gICAgLy8gcmVzdCBvZiB0aGUgcHJvdG8gY2hhaW4gbXVzdCBiZSBhbm5vdGF0ZWQgYWxyZWFkeVxuICAgIHJldHVybiAxIC8qIE1ha2VSZXN1bHQuQnJlYWsgKi87XG4gIH1cblxuICB2YXIgYWN0aW9uRGVzY3JpcHRvciA9IGNyZWF0ZUFjdGlvbkRlc2NyaXB0b3IoYWRtLCB0aGlzLCBrZXksIGRlc2NyaXB0b3IsIGZhbHNlKTtcbiAgZGVmaW5lUHJvcGVydHkoc291cmNlLCBrZXksIGFjdGlvbkRlc2NyaXB0b3IpO1xuICByZXR1cm4gMiAvKiBNYWtlUmVzdWx0LkNvbnRpbnVlICovO1xufVxuXG5mdW5jdGlvbiBleHRlbmRfJDEoYWRtLCBrZXksIGRlc2NyaXB0b3IsIHByb3h5VHJhcCkge1xuICB2YXIgYWN0aW9uRGVzY3JpcHRvciA9IGNyZWF0ZUFjdGlvbkRlc2NyaXB0b3IoYWRtLCB0aGlzLCBrZXksIGRlc2NyaXB0b3IpO1xuICByZXR1cm4gYWRtLmRlZmluZVByb3BlcnR5XyhrZXksIGFjdGlvbkRlc2NyaXB0b3IsIHByb3h5VHJhcCk7XG59XG5mdW5jdGlvbiBkZWNvcmF0ZV8yMDIyM18kMShtdGhkLCBjb250ZXh0KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBhc3NlcnQyMDIyM0RlY29yYXRvclR5cGUoY29udGV4dCwgW1wibWV0aG9kXCIsIFwiZmllbGRcIl0pO1xuICB9XG4gIHZhciBraW5kID0gY29udGV4dC5raW5kLFxuICAgIG5hbWUgPSBjb250ZXh0Lm5hbWUsXG4gICAgYWRkSW5pdGlhbGl6ZXIgPSBjb250ZXh0LmFkZEluaXRpYWxpemVyO1xuICB2YXIgYW5uID0gdGhpcztcbiAgdmFyIF9jcmVhdGVBY3Rpb24gPSBmdW5jdGlvbiBfY3JlYXRlQWN0aW9uKG0pIHtcbiAgICB2YXIgX2FubiRvcHRpb25zXyRuYW1lLCBfYW5uJG9wdGlvbnNfLCBfYW5uJG9wdGlvbnNfJGF1dG9BY3QsIF9hbm4kb3B0aW9uc18yO1xuICAgIHJldHVybiBjcmVhdGVBY3Rpb24oKF9hbm4kb3B0aW9uc18kbmFtZSA9IChfYW5uJG9wdGlvbnNfID0gYW5uLm9wdGlvbnNfKSA9PSBudWxsID8gdm9pZCAwIDogX2FubiRvcHRpb25zXy5uYW1lKSAhPSBudWxsID8gX2FubiRvcHRpb25zXyRuYW1lIDogbmFtZS50b1N0cmluZygpLCBtLCAoX2FubiRvcHRpb25zXyRhdXRvQWN0ID0gKF9hbm4kb3B0aW9uc18yID0gYW5uLm9wdGlvbnNfKSA9PSBudWxsID8gdm9pZCAwIDogX2FubiRvcHRpb25zXzIuYXV0b0FjdGlvbikgIT0gbnVsbCA/IF9hbm4kb3B0aW9uc18kYXV0b0FjdCA6IGZhbHNlKTtcbiAgfTtcbiAgLy8gQmFja3dhcmRzL0xlZ2FjeSBiZWhhdmlvciwgZXhwZWN0cyBtYWtlT2JzZXJ2YWJsZSh0aGlzKVxuICBpZiAoa2luZCA9PSBcImZpZWxkXCIpIHtcbiAgICBhZGRJbml0aWFsaXplcihmdW5jdGlvbiAoKSB7XG4gICAgICBzdG9yZUFubm90YXRpb24odGhpcywgbmFtZSwgYW5uKTtcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGtpbmQgPT0gXCJtZXRob2RcIikge1xuICAgIHZhciBfdGhpcyRvcHRpb25zXzI7XG4gICAgaWYgKCFpc0FjdGlvbihtdGhkKSkge1xuICAgICAgbXRoZCA9IF9jcmVhdGVBY3Rpb24obXRoZCk7XG4gICAgfVxuICAgIGlmICgoX3RoaXMkb3B0aW9uc18yID0gdGhpcy5vcHRpb25zXykgIT0gbnVsbCAmJiBfdGhpcyRvcHRpb25zXzIuYm91bmQpIHtcbiAgICAgIGFkZEluaXRpYWxpemVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgYm91bmQgPSBzZWxmW25hbWVdLmJpbmQoc2VsZik7XG4gICAgICAgIGJvdW5kLmlzTW9ieEFjdGlvbiA9IHRydWU7XG4gICAgICAgIHNlbGZbbmFtZV0gPSBib3VuZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbXRoZDtcbiAgfVxuICBkaWUoXCJDYW5ub3QgYXBwbHkgJ1wiICsgYW5uLmFubm90YXRpb25UeXBlXyArIFwiJyB0byAnXCIgKyBTdHJpbmcobmFtZSkgKyBcIicgKGtpbmQ6IFwiICsga2luZCArIFwiKTpcIiArIChcIlxcbidcIiArIGFubi5hbm5vdGF0aW9uVHlwZV8gKyBcIicgY2FuIG9ubHkgYmUgdXNlZCBvbiBwcm9wZXJ0aWVzIHdpdGggYSBmdW5jdGlvbiB2YWx1ZS5cIikpO1xufVxuZnVuY3Rpb24gYXNzZXJ0QWN0aW9uRGVzY3JpcHRvcihhZG0sIF9yZWYsIGtleSwgX3JlZjIpIHtcbiAgdmFyIGFubm90YXRpb25UeXBlXyA9IF9yZWYuYW5ub3RhdGlvblR5cGVfO1xuICB2YXIgdmFsdWUgPSBfcmVmMi52YWx1ZTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICBkaWUoXCJDYW5ub3QgYXBwbHkgJ1wiICsgYW5ub3RhdGlvblR5cGVfICsgXCInIHRvICdcIiArIGFkbS5uYW1lXyArIFwiLlwiICsga2V5LnRvU3RyaW5nKCkgKyBcIic6XCIgKyAoXCJcXG4nXCIgKyBhbm5vdGF0aW9uVHlwZV8gKyBcIicgY2FuIG9ubHkgYmUgdXNlZCBvbiBwcm9wZXJ0aWVzIHdpdGggYSBmdW5jdGlvbiB2YWx1ZS5cIikpO1xuICB9XG59XG5mdW5jdGlvbiBjcmVhdGVBY3Rpb25EZXNjcmlwdG9yKGFkbSwgYW5ub3RhdGlvbiwga2V5LCBkZXNjcmlwdG9yLFxuLy8gcHJvdmlkZXMgYWJpbGl0eSB0byBkaXNhYmxlIHNhZmVEZXNjcmlwdG9ycyBmb3IgcHJvdG90eXBlc1xuc2FmZURlc2NyaXB0b3JzKSB7XG4gIHZhciBfYW5ub3RhdGlvbiRvcHRpb25zXywgX2Fubm90YXRpb24kb3B0aW9uc18kLCBfYW5ub3RhdGlvbiRvcHRpb25zXzIsIF9hbm5vdGF0aW9uJG9wdGlvbnNfJDIsIF9hbm5vdGF0aW9uJG9wdGlvbnNfMywgX2Fubm90YXRpb24kb3B0aW9uc180LCBfYWRtJHByb3h5XzI7XG4gIGlmIChzYWZlRGVzY3JpcHRvcnMgPT09IHZvaWQgMCkge1xuICAgIHNhZmVEZXNjcmlwdG9ycyA9IGdsb2JhbFN0YXRlLnNhZmVEZXNjcmlwdG9ycztcbiAgfVxuICBhc3NlcnRBY3Rpb25EZXNjcmlwdG9yKGFkbSwgYW5ub3RhdGlvbiwga2V5LCBkZXNjcmlwdG9yKTtcbiAgdmFyIHZhbHVlID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgaWYgKChfYW5ub3RhdGlvbiRvcHRpb25zXyA9IGFubm90YXRpb24ub3B0aW9uc18pICE9IG51bGwgJiYgX2Fubm90YXRpb24kb3B0aW9uc18uYm91bmQpIHtcbiAgICB2YXIgX2FkbSRwcm94eV87XG4gICAgdmFsdWUgPSB2YWx1ZS5iaW5kKChfYWRtJHByb3h5XyA9IGFkbS5wcm94eV8pICE9IG51bGwgPyBfYWRtJHByb3h5XyA6IGFkbS50YXJnZXRfKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIHZhbHVlOiBjcmVhdGVBY3Rpb24oKF9hbm5vdGF0aW9uJG9wdGlvbnNfJCA9IChfYW5ub3RhdGlvbiRvcHRpb25zXzIgPSBhbm5vdGF0aW9uLm9wdGlvbnNfKSA9PSBudWxsID8gdm9pZCAwIDogX2Fubm90YXRpb24kb3B0aW9uc18yLm5hbWUpICE9IG51bGwgPyBfYW5ub3RhdGlvbiRvcHRpb25zXyQgOiBrZXkudG9TdHJpbmcoKSwgdmFsdWUsIChfYW5ub3RhdGlvbiRvcHRpb25zXyQyID0gKF9hbm5vdGF0aW9uJG9wdGlvbnNfMyA9IGFubm90YXRpb24ub3B0aW9uc18pID09IG51bGwgPyB2b2lkIDAgOiBfYW5ub3RhdGlvbiRvcHRpb25zXzMuYXV0b0FjdGlvbikgIT0gbnVsbCA/IF9hbm5vdGF0aW9uJG9wdGlvbnNfJDIgOiBmYWxzZSxcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9ieGpzL21vYngvZGlzY3Vzc2lvbnMvMzE0MFxuICAgIChfYW5ub3RhdGlvbiRvcHRpb25zXzQgPSBhbm5vdGF0aW9uLm9wdGlvbnNfKSAhPSBudWxsICYmIF9hbm5vdGF0aW9uJG9wdGlvbnNfNC5ib3VuZCA/IChfYWRtJHByb3h5XzIgPSBhZG0ucHJveHlfKSAhPSBudWxsID8gX2FkbSRwcm94eV8yIDogYWRtLnRhcmdldF8gOiB1bmRlZmluZWQpLFxuICAgIC8vIE5vbi1jb25maWd1cmFibGUgZm9yIGNsYXNzZXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsIGZpZWxkIHJlZGVmaW5pdGlvbiBpbiBzdWJjbGFzc1xuICAgIGNvbmZpZ3VyYWJsZTogc2FmZURlc2NyaXB0b3JzID8gYWRtLmlzUGxhaW5PYmplY3RfIDogdHJ1ZSxcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9ieGpzL21vYngvcHVsbC8yNjQxI2lzc3VlY29tbWVudC03MzcyOTIwNThcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAvLyBOb24tb2JzZXZhYmxlLCB0aGVyZWZvcmUgbm9uLXdyaXRhYmxlXG4gICAgLy8gQWxzbyBwcmV2ZW50cyByZXdyaXRpbmcgaW4gc3ViY2xhc3MgY29uc3RydWN0b3JcbiAgICB3cml0YWJsZTogc2FmZURlc2NyaXB0b3JzID8gZmFsc2UgOiB0cnVlXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZsb3dBbm5vdGF0aW9uKG5hbWUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHtcbiAgICBhbm5vdGF0aW9uVHlwZV86IG5hbWUsXG4gICAgb3B0aW9uc186IG9wdGlvbnMsXG4gICAgbWFrZV86IG1ha2VfJDIsXG4gICAgZXh0ZW5kXzogZXh0ZW5kXyQyLFxuICAgIGRlY29yYXRlXzIwMjIzXzogZGVjb3JhdGVfMjAyMjNfJDJcbiAgfTtcbn1cbmZ1bmN0aW9uIG1ha2VfJDIoYWRtLCBrZXksIGRlc2NyaXB0b3IsIHNvdXJjZSkge1xuICB2YXIgX3RoaXMkb3B0aW9uc187XG4gIC8vIG93blxuICBpZiAoc291cmNlID09PSBhZG0udGFyZ2V0Xykge1xuICAgIHJldHVybiB0aGlzLmV4dGVuZF8oYWRtLCBrZXksIGRlc2NyaXB0b3IsIGZhbHNlKSA9PT0gbnVsbCA/IDAgLyogTWFrZVJlc3VsdC5DYW5jZWwgKi8gOiAyIC8qIE1ha2VSZXN1bHQuQ29udGludWUgKi87XG4gIH1cbiAgLy8gcHJvdG90eXBlXG4gIC8vIGJvdW5kIC0gbXVzdCBhbm5vdGF0ZSBwcm90b3MgdG8gc3VwcG9ydCBzdXBlci5mbG93KClcbiAgaWYgKChfdGhpcyRvcHRpb25zXyA9IHRoaXMub3B0aW9uc18pICE9IG51bGwgJiYgX3RoaXMkb3B0aW9uc18uYm91bmQgJiYgKCFoYXNQcm9wKGFkbS50YXJnZXRfLCBrZXkpIHx8ICFpc0Zsb3coYWRtLnRhcmdldF9ba2V5XSkpKSB7XG4gICAgaWYgKHRoaXMuZXh0ZW5kXyhhZG0sIGtleSwgZGVzY3JpcHRvciwgZmFsc2UpID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gMCAvKiBNYWtlUmVzdWx0LkNhbmNlbCAqLztcbiAgICB9XG4gIH1cblxuICBpZiAoaXNGbG93KGRlc2NyaXB0b3IudmFsdWUpKSB7XG4gICAgLy8gQSBwcm90b3R5cGUgY291bGQgaGF2ZSBiZWVuIGFubm90YXRlZCBhbHJlYWR5IGJ5IG90aGVyIGNvbnN0cnVjdG9yLFxuICAgIC8vIHJlc3Qgb2YgdGhlIHByb3RvIGNoYWluIG11c3QgYmUgYW5ub3RhdGVkIGFscmVhZHlcbiAgICByZXR1cm4gMSAvKiBNYWtlUmVzdWx0LkJyZWFrICovO1xuICB9XG5cbiAgdmFyIGZsb3dEZXNjcmlwdG9yID0gY3JlYXRlRmxvd0Rlc2NyaXB0b3IoYWRtLCB0aGlzLCBrZXksIGRlc2NyaXB0b3IsIGZhbHNlLCBmYWxzZSk7XG4gIGRlZmluZVByb3BlcnR5KHNvdXJjZSwga2V5LCBmbG93RGVzY3JpcHRvcik7XG4gIHJldHVybiAyIC8qIE1ha2VSZXN1bHQuQ29udGludWUgKi87XG59XG5cbmZ1bmN0aW9uIGV4dGVuZF8kMihhZG0sIGtleSwgZGVzY3JpcHRvciwgcHJveHlUcmFwKSB7XG4gIHZhciBfdGhpcyRvcHRpb25zXzI7XG4gIHZhciBmbG93RGVzY3JpcHRvciA9IGNyZWF0ZUZsb3dEZXNjcmlwdG9yKGFkbSwgdGhpcywga2V5LCBkZXNjcmlwdG9yLCAoX3RoaXMkb3B0aW9uc18yID0gdGhpcy5vcHRpb25zXykgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJG9wdGlvbnNfMi5ib3VuZCk7XG4gIHJldHVybiBhZG0uZGVmaW5lUHJvcGVydHlfKGtleSwgZmxvd0Rlc2NyaXB0b3IsIHByb3h5VHJhcCk7XG59XG5mdW5jdGlvbiBkZWNvcmF0ZV8yMDIyM18kMihtdGhkLCBjb250ZXh0KSB7XG4gIHZhciBfdGhpcyRvcHRpb25zXzM7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICBhc3NlcnQyMDIyM0RlY29yYXRvclR5cGUoY29udGV4dCwgW1wibWV0aG9kXCJdKTtcbiAgfVxuICB2YXIgbmFtZSA9IGNvbnRleHQubmFtZSxcbiAgICBhZGRJbml0aWFsaXplciA9IGNvbnRleHQuYWRkSW5pdGlhbGl6ZXI7XG4gIGlmICghaXNGbG93KG10aGQpKSB7XG4gICAgbXRoZCA9IGZsb3cobXRoZCk7XG4gIH1cbiAgaWYgKChfdGhpcyRvcHRpb25zXzMgPSB0aGlzLm9wdGlvbnNfKSAhPSBudWxsICYmIF90aGlzJG9wdGlvbnNfMy5ib3VuZCkge1xuICAgIGFkZEluaXRpYWxpemVyKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBib3VuZCA9IHNlbGZbbmFtZV0uYmluZChzZWxmKTtcbiAgICAgIGJvdW5kLmlzTW9iWEZsb3cgPSB0cnVlO1xuICAgICAgc2VsZltuYW1lXSA9IGJvdW5kO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBtdGhkO1xufVxuZnVuY3Rpb24gYXNzZXJ0Rmxvd0Rlc2NyaXB0b3IoYWRtLCBfcmVmLCBrZXksIF9yZWYyKSB7XG4gIHZhciBhbm5vdGF0aW9uVHlwZV8gPSBfcmVmLmFubm90YXRpb25UeXBlXztcbiAgdmFyIHZhbHVlID0gX3JlZjIudmFsdWU7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgZGllKFwiQ2Fubm90IGFwcGx5ICdcIiArIGFubm90YXRpb25UeXBlXyArIFwiJyB0byAnXCIgKyBhZG0ubmFtZV8gKyBcIi5cIiArIGtleS50b1N0cmluZygpICsgXCInOlwiICsgKFwiXFxuJ1wiICsgYW5ub3RhdGlvblR5cGVfICsgXCInIGNhbiBvbmx5IGJlIHVzZWQgb24gcHJvcGVydGllcyB3aXRoIGEgZ2VuZXJhdG9yIGZ1bmN0aW9uIHZhbHVlLlwiKSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZUZsb3dEZXNjcmlwdG9yKGFkbSwgYW5ub3RhdGlvbiwga2V5LCBkZXNjcmlwdG9yLCBib3VuZCxcbi8vIHByb3ZpZGVzIGFiaWxpdHkgdG8gZGlzYWJsZSBzYWZlRGVzY3JpcHRvcnMgZm9yIHByb3RvdHlwZXNcbnNhZmVEZXNjcmlwdG9ycykge1xuICBpZiAoc2FmZURlc2NyaXB0b3JzID09PSB2b2lkIDApIHtcbiAgICBzYWZlRGVzY3JpcHRvcnMgPSBnbG9iYWxTdGF0ZS5zYWZlRGVzY3JpcHRvcnM7XG4gIH1cbiAgYXNzZXJ0Rmxvd0Rlc2NyaXB0b3IoYWRtLCBhbm5vdGF0aW9uLCBrZXksIGRlc2NyaXB0b3IpO1xuICB2YXIgdmFsdWUgPSBkZXNjcmlwdG9yLnZhbHVlO1xuICAvLyBJbiBjYXNlIG9mIGZsb3cuYm91bmQsIHRoZSBkZXNjcmlwdG9yIGNhbiBiZSBmcm9tIGFscmVhZHkgYW5ub3RhdGVkIHByb3RvdHlwZVxuICBpZiAoIWlzRmxvdyh2YWx1ZSkpIHtcbiAgICB2YWx1ZSA9IGZsb3codmFsdWUpO1xuICB9XG4gIGlmIChib3VuZCkge1xuICAgIHZhciBfYWRtJHByb3h5XztcbiAgICAvLyBXZSBkbyBub3Qga2VlcCBvcmlnaW5hbCBmdW5jdGlvbiBhcm91bmQsIHNvIHdlIGJpbmQgdGhlIGV4aXN0aW5nIGZsb3dcbiAgICB2YWx1ZSA9IHZhbHVlLmJpbmQoKF9hZG0kcHJveHlfID0gYWRtLnByb3h5XykgIT0gbnVsbCA/IF9hZG0kcHJveHlfIDogYWRtLnRhcmdldF8pO1xuICAgIC8vIFRoaXMgaXMgbm9ybWFsbHkgc2V0IGJ5IGBmbG93YCwgYnV0IGBiaW5kYCByZXR1cm5zIG5ldyBmdW5jdGlvbi4uLlxuICAgIHZhbHVlLmlzTW9iWEZsb3cgPSB0cnVlO1xuICB9XG4gIHJldHVybiB7XG4gICAgdmFsdWU6IHZhbHVlLFxuICAgIC8vIE5vbi1jb25maWd1cmFibGUgZm9yIGNsYXNzZXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsIGZpZWxkIHJlZGVmaW5pdGlvbiBpbiBzdWJjbGFzc1xuICAgIGNvbmZpZ3VyYWJsZTogc2FmZURlc2NyaXB0b3JzID8gYWRtLmlzUGxhaW5PYmplY3RfIDogdHJ1ZSxcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbW9ieGpzL21vYngvcHVsbC8yNjQxI2lzc3VlY29tbWVudC03MzcyOTIwNThcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAvLyBOb24tb2JzZXZhYmxlLCB0aGVyZWZvcmUgbm9uLXdyaXRhYmxlXG4gICAgLy8gQWxzbyBwcmV2ZW50cyByZXdyaXRpbmcgaW4gc3ViY2xhc3MgY29uc3RydWN0b3JcbiAgICB3cml0YWJsZTogc2FmZURlc2NyaXB0b3JzID8gZmFsc2UgOiB0cnVlXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXB1dGVkQW5ub3RhdGlvbihuYW1lLCBvcHRpb25zKSB7XG4gIHJldHVybiB7XG4gICAgYW5ub3RhdGlvblR5cGVfOiBuYW1lLFxuICAgIG9wdGlvbnNfOiBvcHRpb25zLFxuICAgIG1ha2VfOiBtYWtlXyQzLFxuICAgIGV4dGVuZF86IGV4dGVuZF8kMyxcbiAgICBkZWNvcmF0ZV8yMDIyM186IGRlY29yYXRlXzIwMjIzXyQzXG4gIH07XG59XG5mdW5jdGlvbiBtYWtlXyQzKGFkbSwga2V5LCBkZXNjcmlwdG9yKSB7XG4gIHJldHVybiB0aGlzLmV4dGVuZF8oYWRtLCBrZXksIGRlc2NyaXB0b3IsIGZhbHNlKSA9PT0gbnVsbCA/IDAgLyogTWFrZVJlc3VsdC5DYW5jZWwgKi8gOiAxIC8qIE1ha2VSZXN1bHQuQnJlYWsgKi87XG59XG5cbmZ1bmN0aW9uIGV4dGVuZF8kMyhhZG0sIGtleSwgZGVzY3JpcHRvciwgcHJveHlUcmFwKSB7XG4gIGFzc2VydENvbXB1dGVkRGVzY3JpcHRvcihhZG0sIHRoaXMsIGtleSwgZGVzY3JpcHRvcik7XG4gIHJldHVybiBhZG0uZGVmaW5lQ29tcHV0ZWRQcm9wZXJ0eV8oa2V5LCBfZXh0ZW5kcyh7fSwgdGhpcy5vcHRpb25zXywge1xuICAgIGdldDogZGVzY3JpcHRvci5nZXQsXG4gICAgc2V0OiBkZXNjcmlwdG9yLnNldFxuICB9KSwgcHJveHlUcmFwKTtcbn1cbmZ1bmN0aW9uIGRlY29yYXRlXzIwMjIzXyQzKGdldCwgY29udGV4dCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgYXNzZXJ0MjAyMjNEZWNvcmF0b3JUeXBlKGNvbnRleHQsIFtcImdldHRlclwiXSk7XG4gIH1cbiAgdmFyIGFubiA9IHRoaXM7XG4gIHZhciBrZXkgPSBjb250ZXh0Lm5hbWUsXG4gICAgYWRkSW5pdGlhbGl6ZXIgPSBjb250ZXh0LmFkZEluaXRpYWxpemVyO1xuICBhZGRJbml0aWFsaXplcihmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFkbSA9IGFzT2JzZXJ2YWJsZU9iamVjdCh0aGlzKVskbW9ieF07XG4gICAgdmFyIG9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgYW5uLm9wdGlvbnNfLCB7XG4gICAgICBnZXQ6IGdldCxcbiAgICAgIGNvbnRleHQ6IHRoaXNcbiAgICB9KTtcbiAgICBvcHRpb25zLm5hbWUgfHwgKG9wdGlvbnMubmFtZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGFkbS5uYW1lXyArIFwiLlwiICsga2V5LnRvU3RyaW5nKCkgOiBcIk9ic2VydmFibGVPYmplY3QuXCIgKyBrZXkudG9TdHJpbmcoKSk7XG4gICAgYWRtLnZhbHVlc18uc2V0KGtleSwgbmV3IENvbXB1dGVkVmFsdWUob3B0aW9ucykpO1xuICB9KTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpc1skbW9ieF0uZ2V0T2JzZXJ2YWJsZVByb3BWYWx1ZV8oa2V5KTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGFzc2VydENvbXB1dGVkRGVzY3JpcHRvcihhZG0sIF9yZWYsIGtleSwgX3JlZjIpIHtcbiAgdmFyIGFubm90YXRpb25UeXBlXyA9IF9yZWYuYW5ub3RhdGlvblR5cGVfO1xuICB2YXIgZ2V0ID0gX3JlZjIuZ2V0O1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFnZXQpIHtcbiAgICBkaWUoXCJDYW5ub3QgYXBwbHkgJ1wiICsgYW5ub3RhdGlvblR5cGVfICsgXCInIHRvICdcIiArIGFkbS5uYW1lXyArIFwiLlwiICsga2V5LnRvU3RyaW5nKCkgKyBcIic6XCIgKyAoXCJcXG4nXCIgKyBhbm5vdGF0aW9uVHlwZV8gKyBcIicgY2FuIG9ubHkgYmUgdXNlZCBvbiBnZXR0ZXIoK3NldHRlcikgcHJvcGVydGllcy5cIikpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9ic2VydmFibGVBbm5vdGF0aW9uKG5hbWUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHtcbiAgICBhbm5vdGF0aW9uVHlwZV86IG5hbWUsXG4gICAgb3B0aW9uc186IG9wdGlvbnMsXG4gICAgbWFrZV86IG1ha2VfJDQsXG4gICAgZXh0ZW5kXzogZXh0ZW5kXyQ0LFxuICAgIGRlY29yYXRlXzIwMjIzXzogZGVjb3JhdGVfMjAyMjNfJDRcbiAgfTtcbn1cbmZ1bmN0aW9uIG1ha2VfJDQoYWRtLCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgcmV0dXJuIHRoaXMuZXh0ZW5kXyhhZG0sIGtleSwgZGVzY3JpcHRvciwgZmFsc2UpID09PSBudWxsID8gMCAvKiBNYWtlUmVzdWx0LkNhbmNlbCAqLyA6IDEgLyogTWFrZVJlc3VsdC5CcmVhayAqLztcbn1cblxuZnVuY3Rpb24gZXh0ZW5kXyQ0KGFkbSwga2V5LCBkZXNjcmlwdG9yLCBwcm94eVRyYXApIHtcbiAgdmFyIF90aGlzJG9wdGlvbnNfJGVuaGFuYywgX3RoaXMkb3B0aW9uc187XG4gIGFzc2VydE9ic2VydmFibGVEZXNjcmlwdG9yKGFkbSwgdGhpcywga2V5LCBkZXNjcmlwdG9yKTtcbiAgcmV0dXJuIGFkbS5kZWZpbmVPYnNlcnZhYmxlUHJvcGVydHlfKGtleSwgZGVzY3JpcHRvci52YWx1ZSwgKF90aGlzJG9wdGlvbnNfJGVuaGFuYyA9IChfdGhpcyRvcHRpb25zXyA9IHRoaXMub3B0aW9uc18pID09IG51bGwgPyB2b2lkIDAgOiBfdGhpcyRvcHRpb25zXy5lbmhhbmNlcikgIT0gbnVsbCA/IF90aGlzJG9wdGlvbnNfJGVuaGFuYyA6IGRlZXBFbmhhbmNlciwgcHJveHlUcmFwKTtcbn1cbmZ1bmN0aW9uIGRlY29yYXRlXzIwMjIzXyQ0KGRlc2MsIGNvbnRleHQpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGlmIChjb250ZXh0LmtpbmQgPT09IFwiZmllbGRcIikge1xuICAgICAgdGhyb3cgZGllKFwiUGxlYXNlIHVzZSBgQG9ic2VydmFibGUgYWNjZXNzb3IgXCIgKyBTdHJpbmcoY29udGV4dC5uYW1lKSArIFwiYCBpbnN0ZWFkIG9mIGBAb2JzZXJ2YWJsZSBcIiArIFN0cmluZyhjb250ZXh0Lm5hbWUpICsgXCJgXCIpO1xuICAgIH1cbiAgICBhc3NlcnQyMDIyM0RlY29yYXRvclR5cGUoY29udGV4dCwgW1wiYWNjZXNzb3JcIl0pO1xuICB9XG4gIHZhciBhbm4gPSB0aGlzO1xuICB2YXIga2luZCA9IGNvbnRleHQua2luZCxcbiAgICBuYW1lID0gY29udGV4dC5uYW1lO1xuICAvLyBUaGUgbGF6aW5lc3MgaGVyZSBpcyBub3QgaWRlYWwuLi4gSXQncyBhIHdvcmthcm91bmQgdG8gaG93IDIwMjIuMyBEZWNvcmF0b3JzIGFyZSBpbXBsZW1lbnRlZDpcbiAgLy8gICBgYWRkSW5pdGlhbGl6ZXJgIGNhbGxiYWNrcyBhcmUgZXhlY3V0ZWQgX2JlZm9yZV8gYW55IGFjY2Vzc29ycyBhcmUgZGVmaW5lZCAoaW5zdGVhZCBvZiB0aGUgaWRlYWwtZm9yLXVzIHJpZ2h0IGFmdGVyIGVhY2gpLlxuICAvLyAgIFRoaXMgbWVhbnMgdGhhdCwgaWYgd2Ugd2VyZSB0byBkbyBvdXIgc3R1ZmYgaW4gYW4gYGFkZEluaXRpYWxpemVyYCwgd2UnZCBhdHRlbXB0IHRvIHJlYWQgYSBwcml2YXRlIHNsb3RcbiAgLy8gICBiZWZvcmUgaXQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuIFRoZSBydW50aW1lIGRvZXNuJ3QgbGlrZSB0aGF0IGFuZCB0aHJvd3MgYSBgQ2Fubm90IHJlYWQgcHJpdmF0ZSBtZW1iZXJcbiAgLy8gICBmcm9tIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRgIGVycm9yLlxuICAvLyBUT0RPOiBpdCBzZWVtcyB0aGF0IHRoaXMgd2lsbCBub3QgYmUgcmVxdWlyZWQgYW55bW9yZSBpbiB0aGUgZmluYWwgdmVyc2lvbiBvZiB0aGUgc3BlY1xuICAvLyBTZWUgVE9ETzogbGlua1xuICB2YXIgaW5pdGlhbGl6ZWRPYmplY3RzID0gbmV3IFdlYWtTZXQoKTtcbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZU9ic2VydmFibGUodGFyZ2V0LCB2YWx1ZSkge1xuICAgIHZhciBfYW5uJG9wdGlvbnNfJGVuaGFuY2UsIF9hbm4kb3B0aW9uc187XG4gICAgdmFyIGFkbSA9IGFzT2JzZXJ2YWJsZU9iamVjdCh0YXJnZXQpWyRtb2J4XTtcbiAgICB2YXIgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlVmFsdWUodmFsdWUsIChfYW5uJG9wdGlvbnNfJGVuaGFuY2UgPSAoX2FubiRvcHRpb25zXyA9IGFubi5vcHRpb25zXykgPT0gbnVsbCA/IHZvaWQgMCA6IF9hbm4kb3B0aW9uc18uZW5oYW5jZXIpICE9IG51bGwgPyBfYW5uJG9wdGlvbnNfJGVuaGFuY2UgOiBkZWVwRW5oYW5jZXIsIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IGFkbS5uYW1lXyArIFwiLlwiICsgbmFtZS50b1N0cmluZygpIDogXCJPYnNlcnZhYmxlT2JqZWN0LlwiICsgbmFtZS50b1N0cmluZygpLCBmYWxzZSk7XG4gICAgYWRtLnZhbHVlc18uc2V0KG5hbWUsIG9ic2VydmFibGUpO1xuICAgIGluaXRpYWxpemVkT2JqZWN0cy5hZGQodGFyZ2V0KTtcbiAgfVxuICBpZiAoa2luZCA9PSBcImFjY2Vzc29yXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIGlmICghaW5pdGlhbGl6ZWRPYmplY3RzLmhhcyh0aGlzKSkge1xuICAgICAgICAgIGluaXRpYWxpemVPYnNlcnZhYmxlKHRoaXMsIGRlc2MuZ2V0LmNhbGwodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzWyRtb2J4XS5nZXRPYnNlcnZhYmxlUHJvcFZhbHVlXyhuYW1lKTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgICBpZiAoIWluaXRpYWxpemVkT2JqZWN0cy5oYXModGhpcykpIHtcbiAgICAgICAgICBpbml0aWFsaXplT2JzZXJ2YWJsZSh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNbJG1vYnhdLnNldE9ic2VydmFibGVQcm9wVmFsdWVfKG5hbWUsIHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICBpbml0OiBmdW5jdGlvbiBpbml0KHZhbHVlKSB7XG4gICAgICAgIGlmICghaW5pdGlhbGl6ZWRPYmplY3RzLmhhcyh0aGlzKSkge1xuICAgICAgICAgIGluaXRpYWxpemVPYnNlcnZhYmxlKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICByZXR1cm47XG59XG5mdW5jdGlvbiBhc3NlcnRPYnNlcnZhYmxlRGVzY3JpcHRvcihhZG0sIF9yZWYsIGtleSwgZGVzY3JpcHRvcikge1xuICB2YXIgYW5ub3RhdGlvblR5cGVfID0gX3JlZi5hbm5vdGF0aW9uVHlwZV87XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIShcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikpIHtcbiAgICBkaWUoXCJDYW5ub3QgYXBwbHkgJ1wiICsgYW5ub3RhdGlvblR5cGVfICsgXCInIHRvICdcIiArIGFkbS5uYW1lXyArIFwiLlwiICsga2V5LnRvU3RyaW5nKCkgKyBcIic6XCIgKyAoXCJcXG4nXCIgKyBhbm5vdGF0aW9uVHlwZV8gKyBcIicgY2Fubm90IGJlIHVzZWQgb24gZ2V0dGVyL3NldHRlciBwcm9wZXJ0aWVzXCIpKTtcbiAgfVxufVxuXG52YXIgQVVUTyA9IFwidHJ1ZVwiO1xudmFyIGF1dG9Bbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUF1dG9Bbm5vdGF0aW9uKCk7XG5mdW5jdGlvbiBjcmVhdGVBdXRvQW5ub3RhdGlvbihvcHRpb25zKSB7XG4gIHJldHVybiB7XG4gICAgYW5ub3RhdGlvblR5cGVfOiBBVVRPLFxuICAgIG9wdGlvbnNfOiBvcHRpb25zLFxuICAgIG1ha2VfOiBtYWtlXyQ1LFxuICAgIGV4dGVuZF86IGV4dGVuZF8kNSxcbiAgICBkZWNvcmF0ZV8yMDIyM186IGRlY29yYXRlXzIwMjIzXyQ1XG4gIH07XG59XG5mdW5jdGlvbiBtYWtlXyQ1KGFkbSwga2V5LCBkZXNjcmlwdG9yLCBzb3VyY2UpIHtcbiAgdmFyIF90aGlzJG9wdGlvbnNfMywgX3RoaXMkb3B0aW9uc180O1xuICAvLyBnZXR0ZXIgLT4gY29tcHV0ZWRcbiAgaWYgKGRlc2NyaXB0b3IuZ2V0KSB7XG4gICAgcmV0dXJuIGNvbXB1dGVkLm1ha2VfKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBzb3VyY2UpO1xuICB9XG4gIC8vIGxvbmUgc2V0dGVyIC0+IGFjdGlvbiBzZXR0ZXJcbiAgaWYgKGRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgLy8gVE9ETyBtYWtlIGFjdGlvbiBhcHBsaWNhYmxlIHRvIHNldHRlciBhbmQgZGVsZWdhdGUgdG8gYWN0aW9uLm1ha2VfXG4gICAgdmFyIHNldCA9IGNyZWF0ZUFjdGlvbihrZXkudG9TdHJpbmcoKSwgZGVzY3JpcHRvci5zZXQpO1xuICAgIC8vIG93blxuICAgIGlmIChzb3VyY2UgPT09IGFkbS50YXJnZXRfKSB7XG4gICAgICByZXR1cm4gYWRtLmRlZmluZVByb3BlcnR5XyhrZXksIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBnbG9iYWxTdGF0ZS5zYWZlRGVzY3JpcHRvcnMgPyBhZG0uaXNQbGFpbk9iamVjdF8gOiB0cnVlLFxuICAgICAgICBzZXQ6IHNldFxuICAgICAgfSkgPT09IG51bGwgPyAwIC8qIE1ha2VSZXN1bHQuQ2FuY2VsICovIDogMiAvKiBNYWtlUmVzdWx0LkNvbnRpbnVlICovO1xuICAgIH1cbiAgICAvLyBwcm90b1xuICAgIGRlZmluZVByb3BlcnR5KHNvdXJjZSwga2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBzZXQ6IHNldFxuICAgIH0pO1xuICAgIHJldHVybiAyIC8qIE1ha2VSZXN1bHQuQ29udGludWUgKi87XG4gIH1cbiAgLy8gZnVuY3Rpb24gb24gcHJvdG8gLT4gYXV0b0FjdGlvbi9mbG93XG4gIGlmIChzb3VyY2UgIT09IGFkbS50YXJnZXRfICYmIHR5cGVvZiBkZXNjcmlwdG9yLnZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgX3RoaXMkb3B0aW9uc18yO1xuICAgIGlmIChpc0dlbmVyYXRvcihkZXNjcmlwdG9yLnZhbHVlKSkge1xuICAgICAgdmFyIF90aGlzJG9wdGlvbnNfO1xuICAgICAgdmFyIGZsb3dBbm5vdGF0aW9uID0gKF90aGlzJG9wdGlvbnNfID0gdGhpcy5vcHRpb25zXykgIT0gbnVsbCAmJiBfdGhpcyRvcHRpb25zXy5hdXRvQmluZCA/IGZsb3cuYm91bmQgOiBmbG93O1xuICAgICAgcmV0dXJuIGZsb3dBbm5vdGF0aW9uLm1ha2VfKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBzb3VyY2UpO1xuICAgIH1cbiAgICB2YXIgYWN0aW9uQW5ub3RhdGlvbiA9IChfdGhpcyRvcHRpb25zXzIgPSB0aGlzLm9wdGlvbnNfKSAhPSBudWxsICYmIF90aGlzJG9wdGlvbnNfMi5hdXRvQmluZCA/IGF1dG9BY3Rpb24uYm91bmQgOiBhdXRvQWN0aW9uO1xuICAgIHJldHVybiBhY3Rpb25Bbm5vdGF0aW9uLm1ha2VfKGFkbSwga2V5LCBkZXNjcmlwdG9yLCBzb3VyY2UpO1xuICB9XG4gIC8vIG90aGVyIC0+IG9ic2VydmFibGVcbiAgLy8gQ29weSBwcm9wcyBmcm9tIHByb3RvIGFzIHdlbGwsIHNlZSB0ZXN0OlxuICAvLyBcImRlY29yYXRlIHNob3VsZCB3b3JrIHdpdGggT2JqZWN0LmNyZWF0ZVwiXG4gIHZhciBvYnNlcnZhYmxlQW5ub3RhdGlvbiA9ICgoX3RoaXMkb3B0aW9uc18zID0gdGhpcy5vcHRpb25zXykgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzJG9wdGlvbnNfMy5kZWVwKSA9PT0gZmFsc2UgPyBvYnNlcnZhYmxlLnJlZiA6IG9ic2VydmFibGU7XG4gIC8vIGlmIGZ1bmN0aW9uIHJlc3BlY3QgYXV0b0JpbmQgb3B0aW9uXG4gIGlmICh0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSA9PT0gXCJmdW5jdGlvblwiICYmIChfdGhpcyRvcHRpb25zXzQgPSB0aGlzLm9wdGlvbnNfKSAhPSBudWxsICYmIF90aGlzJG9wdGlvbnNfNC5hdXRvQmluZCkge1xuICAgIHZhciBfYWRtJHByb3h5XztcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gZGVzY3JpcHRvci52YWx1ZS5iaW5kKChfYWRtJHByb3h5XyA9IGFkbS5wcm94eV8pICE9IG51bGwgPyBfYWRtJHByb3h5XyA6IGFkbS50YXJnZXRfKTtcbiAgfVxuICByZXR1cm4gb2JzZXJ2YWJsZUFubm90YXRpb24ubWFrZV8oYWRtLCBrZXksIGRlc2NyaXB0b3IsIHNvdXJjZSk7XG59XG5mdW5jdGlvbiBleHRlbmRfJDUoYWRtLCBrZXksIGRlc2NyaXB0b3IsIHByb3h5VHJhcCkge1xuICB2YXIgX3RoaXMkb3B0aW9uc181LCBfdGhpcyRvcHRpb25zXzY7XG4gIC8vIGdldHRlciAtPiBjb21wdXRlZFxuICBpZiAoZGVzY3JpcHRvci5nZXQpIHtcbiAgICByZXR1cm4gY29tcHV0ZWQuZXh0ZW5kXyhhZG0sIGtleSwgZGVzY3JpcHRvciwgcHJveHlUcmFwKTtcbiAgfVxuICAvLyBsb25lIHNldHRlciAtPiBhY3Rpb24gc2V0dGVyXG4gIGlmIChkZXNjcmlwdG9yLnNldCkge1xuICAgIC8vIFRPRE8gbWFrZSBhY3Rpb24gYXBwbGljYWJsZSB0byBzZXR0ZXIgYW5kIGRlbGVnYXRlIHRvIGFjdGlvbi5leHRlbmRfXG4gICAgcmV0dXJuIGFkbS5kZWZpbmVQcm9wZXJ0eV8oa2V5LCB7XG4gICAgICBjb25maWd1cmFibGU6IGdsb2JhbFN0YXRlLnNhZmVEZXNjcmlwdG9ycyA/IGFkbS5pc1BsYWluT2JqZWN0XyA6IHRydWUsXG4gICAgICBzZXQ6IGNyZWF0ZUFjdGlvbihrZXkudG9TdHJpbmcoKSwgZGVzY3JpcHRvci5zZXQpXG4gICAgfSwgcHJveHlUcmFwKTtcbiAgfVxuICAvLyBvdGhlciAtPiBvYnNlcnZhYmxlXG4gIC8vIGlmIGZ1bmN0aW9uIHJlc3BlY3QgYXV0b0JpbmQgb3B0aW9uXG4gIGlmICh0eXBlb2YgZGVzY3JpcHRvci52YWx1ZSA9PT0gXCJmdW5jdGlvblwiICYmIChfdGhpcyRvcHRpb25zXzUgPSB0aGlzLm9wdGlvbnNfKSAhPSBudWxsICYmIF90aGlzJG9wdGlvbnNfNS5hdXRvQmluZCkge1xuICAgIHZhciBfYWRtJHByb3h5XzI7XG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IGRlc2NyaXB0b3IudmFsdWUuYmluZCgoX2FkbSRwcm94eV8yID0gYWRtLnByb3h5XykgIT0gbnVsbCA/IF9hZG0kcHJveHlfMiA6IGFkbS50YXJnZXRfKTtcbiAgfVxuICB2YXIgb2JzZXJ2YWJsZUFubm90YXRpb24gPSAoKF90aGlzJG9wdGlvbnNfNiA9IHRoaXMub3B0aW9uc18pID09IG51bGwgPyB2b2lkIDAgOiBfdGhpcyRvcHRpb25zXzYuZGVlcCkgPT09IGZhbHNlID8gb2JzZXJ2YWJsZS5yZWYgOiBvYnNlcnZhYmxlO1xuICByZXR1cm4gb2JzZXJ2YWJsZUFubm90YXRpb24uZXh0ZW5kXyhhZG0sIGtleSwgZGVzY3JpcHRvciwgcHJveHlUcmFwKTtcbn1cbmZ1bmN0aW9uIGRlY29yYXRlXzIwMjIzXyQ1KGRlc2MsIGNvbnRleHQpIHtcbiAgZGllKFwiJ1wiICsgdGhpcy5hbm5vdGF0aW9uVHlwZV8gKyBcIicgY2Fubm90IGJlIHVzZWQgYXMgYSBkZWNvcmF0b3JcIik7XG59XG5cbnZhciBPQlNFUlZBQkxFID0gXCJvYnNlcnZhYmxlXCI7XG52YXIgT0JTRVJWQUJMRV9SRUYgPSBcIm9ic2VydmFibGUucmVmXCI7XG52YXIgT0JTRVJWQUJMRV9TSEFMTE9XID0gXCJvYnNlcnZhYmxlLnNoYWxsb3dcIjtcbnZhciBPQlNFUlZBQkxFX1NUUlVDVCA9IFwib2JzZXJ2YWJsZS5zdHJ1Y3RcIjtcbi8vIFByZWRlZmluZWQgYmFncyBvZiBjcmVhdGUgb2JzZXJ2YWJsZSBvcHRpb25zLCB0byBhdm9pZCBhbGxvY2F0aW5nIHRlbXBvcmFyaWx5IG9wdGlvbiBvYmplY3RzXG4vLyBpbiB0aGUgbWFqb3JpdHkgb2YgY2FzZXNcbnZhciBkZWZhdWx0Q3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMgPSB7XG4gIGRlZXA6IHRydWUsXG4gIG5hbWU6IHVuZGVmaW5lZCxcbiAgZGVmYXVsdERlY29yYXRvcjogdW5kZWZpbmVkLFxuICBwcm94eTogdHJ1ZVxufTtcbk9iamVjdC5mcmVlemUoZGVmYXVsdENyZWF0ZU9ic2VydmFibGVPcHRpb25zKTtcbmZ1bmN0aW9uIGFzQ3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnModGhpbmcpIHtcbiAgcmV0dXJuIHRoaW5nIHx8IGRlZmF1bHRDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucztcbn1cbnZhciBvYnNlcnZhYmxlQW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVPYnNlcnZhYmxlQW5ub3RhdGlvbihPQlNFUlZBQkxFKTtcbnZhciBvYnNlcnZhYmxlUmVmQW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVPYnNlcnZhYmxlQW5ub3RhdGlvbihPQlNFUlZBQkxFX1JFRiwge1xuICBlbmhhbmNlcjogcmVmZXJlbmNlRW5oYW5jZXJcbn0pO1xudmFyIG9ic2VydmFibGVTaGFsbG93QW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVPYnNlcnZhYmxlQW5ub3RhdGlvbihPQlNFUlZBQkxFX1NIQUxMT1csIHtcbiAgZW5oYW5jZXI6IHNoYWxsb3dFbmhhbmNlclxufSk7XG52YXIgb2JzZXJ2YWJsZVN0cnVjdEFubm90YXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlT2JzZXJ2YWJsZUFubm90YXRpb24oT0JTRVJWQUJMRV9TVFJVQ1QsIHtcbiAgZW5oYW5jZXI6IHJlZlN0cnVjdEVuaGFuY2VyXG59KTtcbnZhciBvYnNlcnZhYmxlRGVjb3JhdG9yQW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVEZWNvcmF0b3JBbm5vdGF0aW9uKG9ic2VydmFibGVBbm5vdGF0aW9uKTtcbmZ1bmN0aW9uIGdldEVuaGFuY2VyRnJvbU9wdGlvbnMob3B0aW9ucykge1xuICByZXR1cm4gb3B0aW9ucy5kZWVwID09PSB0cnVlID8gZGVlcEVuaGFuY2VyIDogb3B0aW9ucy5kZWVwID09PSBmYWxzZSA/IHJlZmVyZW5jZUVuaGFuY2VyIDogZ2V0RW5oYW5jZXJGcm9tQW5ub3RhdGlvbihvcHRpb25zLmRlZmF1bHREZWNvcmF0b3IpO1xufVxuZnVuY3Rpb24gZ2V0QW5ub3RhdGlvbkZyb21PcHRpb25zKG9wdGlvbnMpIHtcbiAgdmFyIF9vcHRpb25zJGRlZmF1bHREZWNvcjtcbiAgcmV0dXJuIG9wdGlvbnMgPyAoX29wdGlvbnMkZGVmYXVsdERlY29yID0gb3B0aW9ucy5kZWZhdWx0RGVjb3JhdG9yKSAhPSBudWxsID8gX29wdGlvbnMkZGVmYXVsdERlY29yIDogY3JlYXRlQXV0b0Fubm90YXRpb24ob3B0aW9ucykgOiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBnZXRFbmhhbmNlckZyb21Bbm5vdGF0aW9uKGFubm90YXRpb24pIHtcbiAgdmFyIF9hbm5vdGF0aW9uJG9wdGlvbnNfJCwgX2Fubm90YXRpb24kb3B0aW9uc187XG4gIHJldHVybiAhYW5ub3RhdGlvbiA/IGRlZXBFbmhhbmNlciA6IChfYW5ub3RhdGlvbiRvcHRpb25zXyQgPSAoX2Fubm90YXRpb24kb3B0aW9uc18gPSBhbm5vdGF0aW9uLm9wdGlvbnNfKSA9PSBudWxsID8gdm9pZCAwIDogX2Fubm90YXRpb24kb3B0aW9uc18uZW5oYW5jZXIpICE9IG51bGwgPyBfYW5ub3RhdGlvbiRvcHRpb25zXyQgOiBkZWVwRW5oYW5jZXI7XG59XG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCwgYXJyYXkgb3IgZnVuY3Rpb24gaW50byBhIHJlYWN0aXZlIHN0cnVjdHVyZS5cbiAqIEBwYXJhbSB2IHRoZSB2YWx1ZSB3aGljaCBzaG91bGQgYmVjb21lIG9ic2VydmFibGUuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU9ic2VydmFibGUodiwgYXJnMiwgYXJnMykge1xuICAvLyBAb2JzZXJ2YWJsZSBzb21lUHJvcDsgKDIwMjIuMyBEZWNvcmF0b3JzKVxuICBpZiAoaXMyMDIyM0RlY29yYXRvcihhcmcyKSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlQW5ub3RhdGlvbi5kZWNvcmF0ZV8yMDIyM18odiwgYXJnMik7XG4gIH1cbiAgLy8gQG9ic2VydmFibGUgc29tZVByb3A7XG4gIGlmIChpc1N0cmluZ2lzaChhcmcyKSkge1xuICAgIHN0b3JlQW5ub3RhdGlvbih2LCBhcmcyLCBvYnNlcnZhYmxlQW5ub3RhdGlvbik7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGFscmVhZHkgb2JzZXJ2YWJsZSAtIGlnbm9yZVxuICBpZiAoaXNPYnNlcnZhYmxlKHYpKSB7XG4gICAgcmV0dXJuIHY7XG4gIH1cbiAgLy8gcGxhaW4gb2JqZWN0XG4gIGlmIChpc1BsYWluT2JqZWN0KHYpKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUub2JqZWN0KHYsIGFyZzIsIGFyZzMpO1xuICB9XG4gIC8vIEFycmF5XG4gIGlmIChBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUuYXJyYXkodiwgYXJnMik7XG4gIH1cbiAgLy8gTWFwXG4gIGlmIChpc0VTNk1hcCh2KSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlLm1hcCh2LCBhcmcyKTtcbiAgfVxuICAvLyBTZXRcbiAgaWYgKGlzRVM2U2V0KHYpKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUuc2V0KHYsIGFyZzIpO1xuICB9XG4gIC8vIG90aGVyIG9iamVjdCAtIGlnbm9yZVxuICBpZiAodHlwZW9mIHYgPT09IFwib2JqZWN0XCIgJiYgdiAhPT0gbnVsbCkge1xuICAgIHJldHVybiB2O1xuICB9XG4gIC8vIGFueXRoaW5nIGVsc2VcbiAgcmV0dXJuIG9ic2VydmFibGUuYm94KHYsIGFyZzIpO1xufVxuYXNzaWduKGNyZWF0ZU9ic2VydmFibGUsIG9ic2VydmFibGVEZWNvcmF0b3JBbm5vdGF0aW9uKTtcbnZhciBvYnNlcnZhYmxlRmFjdG9yaWVzID0ge1xuICBib3g6IGZ1bmN0aW9uIGJveCh2YWx1ZSwgb3B0aW9ucykge1xuICAgIHZhciBvID0gYXNDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyhvcHRpb25zKTtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVWYWx1ZSh2YWx1ZSwgZ2V0RW5oYW5jZXJGcm9tT3B0aW9ucyhvKSwgby5uYW1lLCB0cnVlLCBvLmVxdWFscyk7XG4gIH0sXG4gIGFycmF5OiBmdW5jdGlvbiBhcnJheShpbml0aWFsVmFsdWVzLCBvcHRpb25zKSB7XG4gICAgdmFyIG8gPSBhc0NyZWF0ZU9ic2VydmFibGVPcHRpb25zKG9wdGlvbnMpO1xuICAgIHJldHVybiAoZ2xvYmFsU3RhdGUudXNlUHJveGllcyA9PT0gZmFsc2UgfHwgby5wcm94eSA9PT0gZmFsc2UgPyBjcmVhdGVMZWdhY3lBcnJheSA6IGNyZWF0ZU9ic2VydmFibGVBcnJheSkoaW5pdGlhbFZhbHVlcywgZ2V0RW5oYW5jZXJGcm9tT3B0aW9ucyhvKSwgby5uYW1lKTtcbiAgfSxcbiAgbWFwOiBmdW5jdGlvbiBtYXAoaW5pdGlhbFZhbHVlcywgb3B0aW9ucykge1xuICAgIHZhciBvID0gYXNDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyhvcHRpb25zKTtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVNYXAoaW5pdGlhbFZhbHVlcywgZ2V0RW5oYW5jZXJGcm9tT3B0aW9ucyhvKSwgby5uYW1lKTtcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbiBzZXQoaW5pdGlhbFZhbHVlcywgb3B0aW9ucykge1xuICAgIHZhciBvID0gYXNDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyhvcHRpb25zKTtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGVTZXQoaW5pdGlhbFZhbHVlcywgZ2V0RW5oYW5jZXJGcm9tT3B0aW9ucyhvKSwgby5uYW1lKTtcbiAgfSxcbiAgb2JqZWN0OiBmdW5jdGlvbiBvYmplY3QocHJvcHMsIGRlY29yYXRvcnMsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gaW5pdE9ic2VydmFibGUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGV4dGVuZE9ic2VydmFibGUoZ2xvYmFsU3RhdGUudXNlUHJveGllcyA9PT0gZmFsc2UgfHwgKG9wdGlvbnMgPT0gbnVsbCA/IHZvaWQgMCA6IG9wdGlvbnMucHJveHkpID09PSBmYWxzZSA/IGFzT2JzZXJ2YWJsZU9iamVjdCh7fSwgb3B0aW9ucykgOiBhc0R5bmFtaWNPYnNlcnZhYmxlT2JqZWN0KHt9LCBvcHRpb25zKSwgcHJvcHMsIGRlY29yYXRvcnMpO1xuICAgIH0pO1xuICB9LFxuICByZWY6IC8qI19fUFVSRV9fKi9jcmVhdGVEZWNvcmF0b3JBbm5vdGF0aW9uKG9ic2VydmFibGVSZWZBbm5vdGF0aW9uKSxcbiAgc2hhbGxvdzogLyojX19QVVJFX18qL2NyZWF0ZURlY29yYXRvckFubm90YXRpb24ob2JzZXJ2YWJsZVNoYWxsb3dBbm5vdGF0aW9uKSxcbiAgZGVlcDogb2JzZXJ2YWJsZURlY29yYXRvckFubm90YXRpb24sXG4gIHN0cnVjdDogLyojX19QVVJFX18qL2NyZWF0ZURlY29yYXRvckFubm90YXRpb24ob2JzZXJ2YWJsZVN0cnVjdEFubm90YXRpb24pXG59O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG52YXIgb2JzZXJ2YWJsZSA9IC8qI19fUFVSRV9fKi9hc3NpZ24oY3JlYXRlT2JzZXJ2YWJsZSwgb2JzZXJ2YWJsZUZhY3Rvcmllcyk7XG5cbnZhciBDT01QVVRFRCA9IFwiY29tcHV0ZWRcIjtcbnZhciBDT01QVVRFRF9TVFJVQ1QgPSBcImNvbXB1dGVkLnN0cnVjdFwiO1xudmFyIGNvbXB1dGVkQW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVDb21wdXRlZEFubm90YXRpb24oQ09NUFVURUQpO1xudmFyIGNvbXB1dGVkU3RydWN0QW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVDb21wdXRlZEFubm90YXRpb24oQ09NUFVURURfU1RSVUNULCB7XG4gIGVxdWFsczogY29tcGFyZXIuc3RydWN0dXJhbFxufSk7XG4vKipcbiAqIERlY29yYXRvciBmb3IgY2xhc3MgcHJvcGVydGllczogQGNvbXB1dGVkIGdldCB2YWx1ZSgpIHsgcmV0dXJuIGV4cHI7IH0uXG4gKiBGb3IgbGVnYWN5IHB1cnBvc2VzIGFsc28gaW52b2thYmxlIGFzIEVTNSBvYnNlcnZhYmxlIGNyZWF0ZWQ6IGBjb21wdXRlZCgoKSA9PiBleHByKWA7XG4gKi9cbnZhciBjb21wdXRlZCA9IGZ1bmN0aW9uIGNvbXB1dGVkKGFyZzEsIGFyZzIpIHtcbiAgaWYgKGlzMjAyMjNEZWNvcmF0b3IoYXJnMikpIHtcbiAgICAvLyBAY29tcHV0ZWQgKDIwMjIuMyBEZWNvcmF0b3JzKVxuICAgIHJldHVybiBjb21wdXRlZEFubm90YXRpb24uZGVjb3JhdGVfMjAyMjNfKGFyZzEsIGFyZzIpO1xuICB9XG4gIGlmIChpc1N0cmluZ2lzaChhcmcyKSkge1xuICAgIC8vIEBjb21wdXRlZFxuICAgIHJldHVybiBzdG9yZUFubm90YXRpb24oYXJnMSwgYXJnMiwgY29tcHV0ZWRBbm5vdGF0aW9uKTtcbiAgfVxuICBpZiAoaXNQbGFpbk9iamVjdChhcmcxKSkge1xuICAgIC8vIEBjb21wdXRlZCh7IG9wdGlvbnMgfSlcbiAgICByZXR1cm4gY3JlYXRlRGVjb3JhdG9yQW5ub3RhdGlvbihjcmVhdGVDb21wdXRlZEFubm90YXRpb24oQ09NUFVURUQsIGFyZzEpKTtcbiAgfVxuICAvLyBjb21wdXRlZChleHByLCBvcHRpb25zPylcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGlmICghaXNGdW5jdGlvbihhcmcxKSkge1xuICAgICAgZGllKFwiRmlyc3QgYXJndW1lbnQgdG8gYGNvbXB1dGVkYCBzaG91bGQgYmUgYW4gZXhwcmVzc2lvbi5cIik7XG4gICAgfVxuICAgIGlmIChpc0Z1bmN0aW9uKGFyZzIpKSB7XG4gICAgICBkaWUoXCJBIHNldHRlciBhcyBzZWNvbmQgYXJndW1lbnQgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCwgdXNlIGB7IHNldDogZm4gfWAgb3B0aW9uIGluc3RlYWRcIik7XG4gICAgfVxuICB9XG4gIHZhciBvcHRzID0gaXNQbGFpbk9iamVjdChhcmcyKSA/IGFyZzIgOiB7fTtcbiAgb3B0cy5nZXQgPSBhcmcxO1xuICBvcHRzLm5hbWUgfHwgKG9wdHMubmFtZSA9IGFyZzEubmFtZSB8fCBcIlwiKTsgLyogZm9yIGdlbmVyYXRlZCBuYW1lICovXG4gIHJldHVybiBuZXcgQ29tcHV0ZWRWYWx1ZShvcHRzKTtcbn07XG5PYmplY3QuYXNzaWduKGNvbXB1dGVkLCBjb21wdXRlZEFubm90YXRpb24pO1xuY29tcHV0ZWQuc3RydWN0ID0gLyojX19QVVJFX18qL2NyZWF0ZURlY29yYXRvckFubm90YXRpb24oY29tcHV0ZWRTdHJ1Y3RBbm5vdGF0aW9uKTtcblxudmFyIF9nZXREZXNjcmlwdG9yJGNvbmZpZywgX2dldERlc2NyaXB0b3I7XG4vLyB3ZSBkb24ndCB1c2UgZ2xvYmFsU3RhdGUgZm9yIHRoZXNlIGluIG9yZGVyIHRvIGF2b2lkIHBvc3NpYmxlIGlzc3VlcyB3aXRoIG11bHRpcGxlXG4vLyBtb2J4IHZlcnNpb25zXG52YXIgY3VycmVudEFjdGlvbklkID0gMDtcbnZhciBuZXh0QWN0aW9uSWQgPSAxO1xudmFyIGlzRnVuY3Rpb25OYW1lQ29uZmlndXJhYmxlID0gKF9nZXREZXNjcmlwdG9yJGNvbmZpZyA9IChfZ2V0RGVzY3JpcHRvciA9IC8qI19fUFVSRV9fKi9nZXREZXNjcmlwdG9yKGZ1bmN0aW9uICgpIHt9LCBcIm5hbWVcIikpID09IG51bGwgPyB2b2lkIDAgOiBfZ2V0RGVzY3JpcHRvci5jb25maWd1cmFibGUpICE9IG51bGwgPyBfZ2V0RGVzY3JpcHRvciRjb25maWcgOiBmYWxzZTtcbi8vIHdlIGNhbiBzYWZlbHkgcmVjeWNsZSB0aGlzIG9iamVjdFxudmFyIHRtcE5hbWVEZXNjcmlwdG9yID0ge1xuICB2YWx1ZTogXCJhY3Rpb25cIixcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICB3cml0YWJsZTogZmFsc2UsXG4gIGVudW1lcmFibGU6IGZhbHNlXG59O1xuZnVuY3Rpb24gY3JlYXRlQWN0aW9uKGFjdGlvbk5hbWUsIGZuLCBhdXRvQWN0aW9uLCByZWYpIHtcbiAgaWYgKGF1dG9BY3Rpb24gPT09IHZvaWQgMCkge1xuICAgIGF1dG9BY3Rpb24gPSBmYWxzZTtcbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgaWYgKCFpc0Z1bmN0aW9uKGZuKSkge1xuICAgICAgZGllKFwiYGFjdGlvbmAgY2FuIG9ubHkgYmUgaW52b2tlZCBvbiBmdW5jdGlvbnNcIik7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYWN0aW9uTmFtZSAhPT0gXCJzdHJpbmdcIiB8fCAhYWN0aW9uTmFtZSkge1xuICAgICAgZGllKFwiYWN0aW9ucyBzaG91bGQgaGF2ZSB2YWxpZCBuYW1lcywgZ290OiAnXCIgKyBhY3Rpb25OYW1lICsgXCInXCIpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiByZXMoKSB7XG4gICAgcmV0dXJuIGV4ZWN1dGVBY3Rpb24oYWN0aW9uTmFtZSwgYXV0b0FjdGlvbiwgZm4sIHJlZiB8fCB0aGlzLCBhcmd1bWVudHMpO1xuICB9XG4gIHJlcy5pc01vYnhBY3Rpb24gPSB0cnVlO1xuICByZXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZuLnRvU3RyaW5nKCk7XG4gIH07XG4gIGlmIChpc0Z1bmN0aW9uTmFtZUNvbmZpZ3VyYWJsZSkge1xuICAgIHRtcE5hbWVEZXNjcmlwdG9yLnZhbHVlID0gYWN0aW9uTmFtZTtcbiAgICBkZWZpbmVQcm9wZXJ0eShyZXMsIFwibmFtZVwiLCB0bXBOYW1lRGVzY3JpcHRvcik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGV4ZWN1dGVBY3Rpb24oYWN0aW9uTmFtZSwgY2FuUnVuQXNEZXJpdmF0aW9uLCBmbiwgc2NvcGUsIGFyZ3MpIHtcbiAgdmFyIHJ1bkluZm8gPSBfc3RhcnRBY3Rpb24oYWN0aW9uTmFtZSwgY2FuUnVuQXNEZXJpdmF0aW9uLCBzY29wZSwgYXJncyk7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHNjb3BlLCBhcmdzKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcnVuSW5mby5lcnJvcl8gPSBlcnI7XG4gICAgdGhyb3cgZXJyO1xuICB9IGZpbmFsbHkge1xuICAgIF9lbmRBY3Rpb24ocnVuSW5mbyk7XG4gIH1cbn1cbmZ1bmN0aW9uIF9zdGFydEFjdGlvbihhY3Rpb25OYW1lLCBjYW5SdW5Bc0Rlcml2YXRpb24sXG4vLyB0cnVlIGZvciBhdXRvQWN0aW9uXG5zY29wZSwgYXJncykge1xuICB2YXIgbm90aWZ5U3B5XyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBpc1NweUVuYWJsZWQoKSAmJiAhIWFjdGlvbk5hbWU7XG4gIHZhciBzdGFydFRpbWVfID0gMDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHlfKSB7XG4gICAgc3RhcnRUaW1lXyA9IERhdGUubm93KCk7XG4gICAgdmFyIGZsYXR0ZW5lZEFyZ3MgPSBhcmdzID8gQXJyYXkuZnJvbShhcmdzKSA6IEVNUFRZX0FSUkFZO1xuICAgIHNweVJlcG9ydFN0YXJ0KHtcbiAgICAgIHR5cGU6IEFDVElPTixcbiAgICAgIG5hbWU6IGFjdGlvbk5hbWUsXG4gICAgICBvYmplY3Q6IHNjb3BlLFxuICAgICAgYXJndW1lbnRzOiBmbGF0dGVuZWRBcmdzXG4gICAgfSk7XG4gIH1cbiAgdmFyIHByZXZEZXJpdmF0aW9uXyA9IGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbjtcbiAgdmFyIHJ1bkFzQWN0aW9uID0gIWNhblJ1bkFzRGVyaXZhdGlvbiB8fCAhcHJldkRlcml2YXRpb25fO1xuICBzdGFydEJhdGNoKCk7XG4gIHZhciBwcmV2QWxsb3dTdGF0ZUNoYW5nZXNfID0gZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZUNoYW5nZXM7IC8vIGJ5IGRlZmF1bHQgcHJlc2VydmUgcHJldmlvdXMgYWxsb3dcbiAgaWYgKHJ1bkFzQWN0aW9uKSB7XG4gICAgdW50cmFja2VkU3RhcnQoKTtcbiAgICBwcmV2QWxsb3dTdGF0ZUNoYW5nZXNfID0gYWxsb3dTdGF0ZUNoYW5nZXNTdGFydCh0cnVlKTtcbiAgfVxuICB2YXIgcHJldkFsbG93U3RhdGVSZWFkc18gPSBhbGxvd1N0YXRlUmVhZHNTdGFydCh0cnVlKTtcbiAgdmFyIHJ1bkluZm8gPSB7XG4gICAgcnVuQXNBY3Rpb25fOiBydW5Bc0FjdGlvbixcbiAgICBwcmV2RGVyaXZhdGlvbl86IHByZXZEZXJpdmF0aW9uXyxcbiAgICBwcmV2QWxsb3dTdGF0ZUNoYW5nZXNfOiBwcmV2QWxsb3dTdGF0ZUNoYW5nZXNfLFxuICAgIHByZXZBbGxvd1N0YXRlUmVhZHNfOiBwcmV2QWxsb3dTdGF0ZVJlYWRzXyxcbiAgICBub3RpZnlTcHlfOiBub3RpZnlTcHlfLFxuICAgIHN0YXJ0VGltZV86IHN0YXJ0VGltZV8sXG4gICAgYWN0aW9uSWRfOiBuZXh0QWN0aW9uSWQrKyxcbiAgICBwYXJlbnRBY3Rpb25JZF86IGN1cnJlbnRBY3Rpb25JZFxuICB9O1xuICBjdXJyZW50QWN0aW9uSWQgPSBydW5JbmZvLmFjdGlvbklkXztcbiAgcmV0dXJuIHJ1bkluZm87XG59XG5mdW5jdGlvbiBfZW5kQWN0aW9uKHJ1bkluZm8pIHtcbiAgaWYgKGN1cnJlbnRBY3Rpb25JZCAhPT0gcnVuSW5mby5hY3Rpb25JZF8pIHtcbiAgICBkaWUoMzApO1xuICB9XG4gIGN1cnJlbnRBY3Rpb25JZCA9IHJ1bkluZm8ucGFyZW50QWN0aW9uSWRfO1xuICBpZiAocnVuSW5mby5lcnJvcl8gIT09IHVuZGVmaW5lZCkge1xuICAgIGdsb2JhbFN0YXRlLnN1cHByZXNzUmVhY3Rpb25FcnJvcnMgPSB0cnVlO1xuICB9XG4gIGFsbG93U3RhdGVDaGFuZ2VzRW5kKHJ1bkluZm8ucHJldkFsbG93U3RhdGVDaGFuZ2VzXyk7XG4gIGFsbG93U3RhdGVSZWFkc0VuZChydW5JbmZvLnByZXZBbGxvd1N0YXRlUmVhZHNfKTtcbiAgZW5kQmF0Y2goKTtcbiAgaWYgKHJ1bkluZm8ucnVuQXNBY3Rpb25fKSB7XG4gICAgdW50cmFja2VkRW5kKHJ1bkluZm8ucHJldkRlcml2YXRpb25fKTtcbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIHJ1bkluZm8ubm90aWZ5U3B5Xykge1xuICAgIHNweVJlcG9ydEVuZCh7XG4gICAgICB0aW1lOiBEYXRlLm5vdygpIC0gcnVuSW5mby5zdGFydFRpbWVfXG4gICAgfSk7XG4gIH1cbiAgZ2xvYmFsU3RhdGUuc3VwcHJlc3NSZWFjdGlvbkVycm9ycyA9IGZhbHNlO1xufVxuZnVuY3Rpb24gYWxsb3dTdGF0ZUNoYW5nZXMoYWxsb3dTdGF0ZUNoYW5nZXMsIGZ1bmMpIHtcbiAgdmFyIHByZXYgPSBhbGxvd1N0YXRlQ2hhbmdlc1N0YXJ0KGFsbG93U3RhdGVDaGFuZ2VzKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZnVuYygpO1xuICB9IGZpbmFsbHkge1xuICAgIGFsbG93U3RhdGVDaGFuZ2VzRW5kKHByZXYpO1xuICB9XG59XG5mdW5jdGlvbiBhbGxvd1N0YXRlQ2hhbmdlc1N0YXJ0KGFsbG93U3RhdGVDaGFuZ2VzKSB7XG4gIHZhciBwcmV2ID0gZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZUNoYW5nZXM7XG4gIGdsb2JhbFN0YXRlLmFsbG93U3RhdGVDaGFuZ2VzID0gYWxsb3dTdGF0ZUNoYW5nZXM7XG4gIHJldHVybiBwcmV2O1xufVxuZnVuY3Rpb24gYWxsb3dTdGF0ZUNoYW5nZXNFbmQocHJldikge1xuICBnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlQ2hhbmdlcyA9IHByZXY7XG59XG5cbnZhciBfU3ltYm9sJHRvUHJpbWl0aXZlO1xudmFyIENSRUFURSA9IFwiY3JlYXRlXCI7XG5fU3ltYm9sJHRvUHJpbWl0aXZlID0gU3ltYm9sLnRvUHJpbWl0aXZlO1xudmFyIE9ic2VydmFibGVWYWx1ZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoX0F0b20pIHtcbiAgX2luaGVyaXRzTG9vc2UoT2JzZXJ2YWJsZVZhbHVlLCBfQXRvbSk7XG4gIGZ1bmN0aW9uIE9ic2VydmFibGVWYWx1ZSh2YWx1ZSwgZW5oYW5jZXIsIG5hbWVfLCBub3RpZnlTcHksIGVxdWFscykge1xuICAgIHZhciBfdGhpcztcbiAgICBpZiAobmFtZV8gPT09IHZvaWQgMCkge1xuICAgICAgbmFtZV8gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcIk9ic2VydmFibGVWYWx1ZUBcIiArIGdldE5leHRJZCgpIDogXCJPYnNlcnZhYmxlVmFsdWVcIjtcbiAgICB9XG4gICAgaWYgKG5vdGlmeVNweSA9PT0gdm9pZCAwKSB7XG4gICAgICBub3RpZnlTcHkgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoZXF1YWxzID09PSB2b2lkIDApIHtcbiAgICAgIGVxdWFscyA9IGNvbXBhcmVyW1wiZGVmYXVsdFwiXTtcbiAgICB9XG4gICAgX3RoaXMgPSBfQXRvbS5jYWxsKHRoaXMsIG5hbWVfKSB8fCB0aGlzO1xuICAgIF90aGlzLmVuaGFuY2VyID0gdm9pZCAwO1xuICAgIF90aGlzLm5hbWVfID0gdm9pZCAwO1xuICAgIF90aGlzLmVxdWFscyA9IHZvaWQgMDtcbiAgICBfdGhpcy5oYXNVbnJlcG9ydGVkQ2hhbmdlXyA9IGZhbHNlO1xuICAgIF90aGlzLmludGVyY2VwdG9yc18gPSB2b2lkIDA7XG4gICAgX3RoaXMuY2hhbmdlTGlzdGVuZXJzXyA9IHZvaWQgMDtcbiAgICBfdGhpcy52YWx1ZV8gPSB2b2lkIDA7XG4gICAgX3RoaXMuZGVoYW5jZXIgPSB2b2lkIDA7XG4gICAgX3RoaXMuZW5oYW5jZXIgPSBlbmhhbmNlcjtcbiAgICBfdGhpcy5uYW1lXyA9IG5hbWVfO1xuICAgIF90aGlzLmVxdWFscyA9IGVxdWFscztcbiAgICBfdGhpcy52YWx1ZV8gPSBlbmhhbmNlcih2YWx1ZSwgdW5kZWZpbmVkLCBuYW1lXyk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkgJiYgaXNTcHlFbmFibGVkKCkpIHtcbiAgICAgIC8vIG9ubHkgbm90aWZ5IHNweSBpZiB0aGlzIGlzIGEgc3RhbmQtYWxvbmUgb2JzZXJ2YWJsZVxuICAgICAgc3B5UmVwb3J0KHtcbiAgICAgICAgdHlwZTogQ1JFQVRFLFxuICAgICAgICBvYmplY3Q6IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoX3RoaXMpLFxuICAgICAgICBvYnNlcnZhYmxlS2luZDogXCJ2YWx1ZVwiLFxuICAgICAgICBkZWJ1Z09iamVjdE5hbWU6IF90aGlzLm5hbWVfLFxuICAgICAgICBuZXdWYWx1ZTogXCJcIiArIF90aGlzLnZhbHVlX1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBfdGhpcztcbiAgfVxuICB2YXIgX3Byb3RvID0gT2JzZXJ2YWJsZVZhbHVlLnByb3RvdHlwZTtcbiAgX3Byb3RvLmRlaGFuY2VWYWx1ZSA9IGZ1bmN0aW9uIGRlaGFuY2VWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmRlaGFuY2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VyKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuICBfcHJvdG8uc2V0ID0gZnVuY3Rpb24gc2V0KG5ld1ZhbHVlKSB7XG4gICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZV87XG4gICAgbmV3VmFsdWUgPSB0aGlzLnByZXBhcmVOZXdWYWx1ZV8obmV3VmFsdWUpO1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gZ2xvYmFsU3RhdGUuVU5DSEFOR0VEKSB7XG4gICAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkKCk7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgICBzcHlSZXBvcnRTdGFydCh7XG4gICAgICAgICAgdHlwZTogVVBEQVRFLFxuICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICBvYnNlcnZhYmxlS2luZDogXCJ2YWx1ZVwiLFxuICAgICAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5uYW1lXyxcbiAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWUsXG4gICAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXROZXdWYWx1ZV8obmV3VmFsdWUpO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgICAgc3B5UmVwb3J0RW5kKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBfcHJvdG8ucHJlcGFyZU5ld1ZhbHVlXyA9IGZ1bmN0aW9uIHByZXBhcmVOZXdWYWx1ZV8obmV3VmFsdWUpIHtcbiAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCh0aGlzKTtcbiAgICBpZiAoaGFzSW50ZXJjZXB0b3JzKHRoaXMpKSB7XG4gICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKHRoaXMsIHtcbiAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICB0eXBlOiBVUERBVEUsXG4gICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgfSk7XG4gICAgICBpZiAoIWNoYW5nZSkge1xuICAgICAgICByZXR1cm4gZ2xvYmFsU3RhdGUuVU5DSEFOR0VEO1xuICAgICAgfVxuICAgICAgbmV3VmFsdWUgPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgfVxuICAgIC8vIGFwcGx5IG1vZGlmaWVyXG4gICAgbmV3VmFsdWUgPSB0aGlzLmVuaGFuY2VyKG5ld1ZhbHVlLCB0aGlzLnZhbHVlXywgdGhpcy5uYW1lXyk7XG4gICAgcmV0dXJuIHRoaXMuZXF1YWxzKHRoaXMudmFsdWVfLCBuZXdWYWx1ZSkgPyBnbG9iYWxTdGF0ZS5VTkNIQU5HRUQgOiBuZXdWYWx1ZTtcbiAgfTtcbiAgX3Byb3RvLnNldE5ld1ZhbHVlXyA9IGZ1bmN0aW9uIHNldE5ld1ZhbHVlXyhuZXdWYWx1ZSkge1xuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWVfO1xuICAgIHRoaXMudmFsdWVfID0gbmV3VmFsdWU7XG4gICAgdGhpcy5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgaWYgKGhhc0xpc3RlbmVycyh0aGlzKSkge1xuICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIHtcbiAgICAgICAgdHlwZTogVVBEQVRFLFxuICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgdGhpcy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgIHJldHVybiB0aGlzLmRlaGFuY2VWYWx1ZSh0aGlzLnZhbHVlXyk7XG4gIH07XG4gIF9wcm90by5pbnRlcmNlcHRfID0gZnVuY3Rpb24gaW50ZXJjZXB0XyhoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHJlZ2lzdGVySW50ZXJjZXB0b3IodGhpcywgaGFuZGxlcik7XG4gIH07XG4gIF9wcm90by5vYnNlcnZlXyA9IGZ1bmN0aW9uIG9ic2VydmVfKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICBpZiAoZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICBsaXN0ZW5lcih7XG4gICAgICAgIG9ic2VydmFibGVLaW5kOiBcInZhbHVlXCIsXG4gICAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5uYW1lXyxcbiAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICB0eXBlOiBVUERBVEUsXG4gICAgICAgIG5ld1ZhbHVlOiB0aGlzLnZhbHVlXyxcbiAgICAgICAgb2xkVmFsdWU6IHVuZGVmaW5lZFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZWdpc3Rlckxpc3RlbmVyKHRoaXMsIGxpc3RlbmVyKTtcbiAgfTtcbiAgX3Byb3RvLnJhdyA9IGZ1bmN0aW9uIHJhdygpIHtcbiAgICAvLyB1c2VkIGJ5IE1TVCBvdCBnZXQgdW5kZWhhbmNlZCB2YWx1ZVxuICAgIHJldHVybiB0aGlzLnZhbHVlXztcbiAgfTtcbiAgX3Byb3RvLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoKTtcbiAgfTtcbiAgX3Byb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZV8gKyBcIltcIiArIHRoaXMudmFsdWVfICsgXCJdXCI7XG4gIH07XG4gIF9wcm90by52YWx1ZU9mID0gZnVuY3Rpb24gdmFsdWVPZigpIHtcbiAgICByZXR1cm4gdG9QcmltaXRpdmUodGhpcy5nZXQoKSk7XG4gIH07XG4gIF9wcm90b1tfU3ltYm9sJHRvUHJpbWl0aXZlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCk7XG4gIH07XG4gIHJldHVybiBPYnNlcnZhYmxlVmFsdWU7XG59KEF0b20pO1xudmFyIGlzT2JzZXJ2YWJsZVZhbHVlID0gLyojX19QVVJFX18qL2NyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUoXCJPYnNlcnZhYmxlVmFsdWVcIiwgT2JzZXJ2YWJsZVZhbHVlKTtcblxudmFyIF9TeW1ib2wkdG9QcmltaXRpdmUkMTtcbi8qKlxuICogQSBub2RlIGluIHRoZSBzdGF0ZSBkZXBlbmRlbmN5IHJvb3QgdGhhdCBvYnNlcnZlcyBvdGhlciBub2RlcywgYW5kIGNhbiBiZSBvYnNlcnZlZCBpdHNlbGYuXG4gKlxuICogQ29tcHV0ZWRWYWx1ZSB3aWxsIHJlbWVtYmVyIHRoZSByZXN1bHQgb2YgdGhlIGNvbXB1dGF0aW9uIGZvciB0aGUgZHVyYXRpb24gb2YgdGhlIGJhdGNoLCBvclxuICogd2hpbGUgYmVpbmcgb2JzZXJ2ZWQuXG4gKlxuICogRHVyaW5nIHRoaXMgdGltZSBpdCB3aWxsIHJlY29tcHV0ZSBvbmx5IHdoZW4gb25lIG9mIGl0cyBkaXJlY3QgZGVwZW5kZW5jaWVzIGNoYW5nZWQsXG4gKiBidXQgb25seSB3aGVuIGl0IGlzIGJlaW5nIGFjY2Vzc2VkIHdpdGggYENvbXB1dGVkVmFsdWUuZ2V0KClgLlxuICpcbiAqIEltcGxlbWVudGF0aW9uIGRlc2NyaXB0aW9uOlxuICogMS4gRmlyc3QgdGltZSBpdCdzIGJlaW5nIGFjY2Vzc2VkIGl0IHdpbGwgY29tcHV0ZSBhbmQgcmVtZW1iZXIgcmVzdWx0XG4gKiAgICBnaXZlIGJhY2sgcmVtZW1iZXJlZCByZXN1bHQgdW50aWwgMi4gaGFwcGVuc1xuICogMi4gRmlyc3QgdGltZSBhbnkgZGVlcCBkZXBlbmRlbmN5IGNoYW5nZSwgcHJvcGFnYXRlIFBPU1NJQkxZX1NUQUxFIHRvIGFsbCBvYnNlcnZlcnMsIHdhaXQgZm9yIDMuXG4gKiAzLiBXaGVuIGl0J3MgYmVpbmcgYWNjZXNzZWQsIHJlY29tcHV0ZSBpZiBhbnkgc2hhbGxvdyBkZXBlbmRlbmN5IGNoYW5nZWQuXG4gKiAgICBpZiByZXN1bHQgY2hhbmdlZDogcHJvcGFnYXRlIFNUQUxFIHRvIGFsbCBvYnNlcnZlcnMsIHRoYXQgd2VyZSBQT1NTSUJMWV9TVEFMRSBmcm9tIHRoZSBsYXN0IHN0ZXAuXG4gKiAgICBnbyB0byBzdGVwIDIuIGVpdGhlciB3YXlcbiAqXG4gKiBJZiBhdCBhbnkgcG9pbnQgaXQncyBvdXRzaWRlIGJhdGNoIGFuZCBpdCBpc24ndCBvYnNlcnZlZDogcmVzZXQgZXZlcnl0aGluZyBhbmQgZ28gdG8gMS5cbiAqL1xuX1N5bWJvbCR0b1ByaW1pdGl2ZSQxID0gU3ltYm9sLnRvUHJpbWl0aXZlO1xudmFyIENvbXB1dGVkVmFsdWUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICAvLyBub2RlcyB3ZSBhcmUgbG9va2luZyBhdC4gT3VyIHZhbHVlIGRlcGVuZHMgb24gdGhlc2Ugbm9kZXNcbiAgLy8gZHVyaW5nIHRyYWNraW5nIGl0J3MgYW4gYXJyYXkgd2l0aCBuZXcgb2JzZXJ2ZWQgb2JzZXJ2ZXJzXG5cbiAgLy8gdG8gY2hlY2sgZm9yIGN5Y2xlc1xuXG4gIC8vIE4uQjogdW5taW5pZmllZCBhcyBpdCBpcyB1c2VkIGJ5IE1TVFxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgY29tcHV0ZWQgdmFsdWUgYmFzZWQgb24gYSBmdW5jdGlvbiBleHByZXNzaW9uLlxuICAgKlxuICAgKiBUaGUgYG5hbWVgIHByb3BlcnR5IGlzIGZvciBkZWJ1ZyBwdXJwb3NlcyBvbmx5LlxuICAgKlxuICAgKiBUaGUgYGVxdWFsc2AgcHJvcGVydHkgc3BlY2lmaWVzIHRoZSBjb21wYXJlciBmdW5jdGlvbiB0byB1c2UgdG8gZGV0ZXJtaW5lIGlmIGEgbmV3bHkgcHJvZHVjZWRcbiAgICogdmFsdWUgZGlmZmVycyBmcm9tIHRoZSBwcmV2aW91cyB2YWx1ZS4gVHdvIGNvbXBhcmVycyBhcmUgcHJvdmlkZWQgaW4gdGhlIGxpYnJhcnk7IGBkZWZhdWx0Q29tcGFyZXJgXG4gICAqIGNvbXBhcmVzIGJhc2VkIG9uIGlkZW50aXR5IGNvbXBhcmlzb24gKD09PSksIGFuZCBgc3RydWN0dXJhbENvbXBhcmVyYCBkZWVwbHkgY29tcGFyZXMgdGhlIHN0cnVjdHVyZS5cbiAgICogU3RydWN0dXJhbCBjb21wYXJpc29uIGNhbiBiZSBjb252ZW5pZW50IGlmIHlvdSBhbHdheXMgcHJvZHVjZSBhIG5ldyBhZ2dyZWdhdGVkIG9iamVjdCBhbmRcbiAgICogZG9uJ3Qgd2FudCB0byBub3RpZnkgb2JzZXJ2ZXJzIGlmIGl0IGlzIHN0cnVjdHVyYWxseSB0aGUgc2FtZS5cbiAgICogVGhpcyBpcyB1c2VmdWwgZm9yIHdvcmtpbmcgd2l0aCB2ZWN0b3JzLCBtb3VzZSBjb29yZGluYXRlcyBldGMuXG4gICAqL1xuICBmdW5jdGlvbiBDb21wdXRlZFZhbHVlKG9wdGlvbnMpIHtcbiAgICB0aGlzLmRlcGVuZGVuY2llc1N0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLk5PVF9UUkFDS0lOR187XG4gICAgdGhpcy5vYnNlcnZpbmdfID0gW107XG4gICAgdGhpcy5uZXdPYnNlcnZpbmdfID0gbnVsbDtcbiAgICB0aGlzLmlzQmVpbmdPYnNlcnZlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmlzUGVuZGluZ1Vub2JzZXJ2YXRpb25fID0gZmFsc2U7XG4gICAgdGhpcy5vYnNlcnZlcnNfID0gbmV3IFNldCgpO1xuICAgIHRoaXMuZGlmZlZhbHVlXyA9IDA7XG4gICAgdGhpcy5ydW5JZF8gPSAwO1xuICAgIHRoaXMubGFzdEFjY2Vzc2VkQnlfID0gMDtcbiAgICB0aGlzLmxvd2VzdE9ic2VydmVyU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uVVBfVE9fREFURV87XG4gICAgdGhpcy51bmJvdW5kRGVwc0NvdW50XyA9IDA7XG4gICAgdGhpcy52YWx1ZV8gPSBuZXcgQ2F1Z2h0RXhjZXB0aW9uKG51bGwpO1xuICAgIHRoaXMubmFtZV8gPSB2b2lkIDA7XG4gICAgdGhpcy50cmlnZ2VyZWRCeV8gPSB2b2lkIDA7XG4gICAgdGhpcy5pc0NvbXB1dGluZ18gPSBmYWxzZTtcbiAgICB0aGlzLmlzUnVubmluZ1NldHRlcl8gPSBmYWxzZTtcbiAgICB0aGlzLmRlcml2YXRpb24gPSB2b2lkIDA7XG4gICAgdGhpcy5zZXR0ZXJfID0gdm9pZCAwO1xuICAgIHRoaXMuaXNUcmFjaW5nXyA9IFRyYWNlTW9kZS5OT05FO1xuICAgIHRoaXMuc2NvcGVfID0gdm9pZCAwO1xuICAgIHRoaXMuZXF1YWxzXyA9IHZvaWQgMDtcbiAgICB0aGlzLnJlcXVpcmVzUmVhY3Rpb25fID0gdm9pZCAwO1xuICAgIHRoaXMua2VlcEFsaXZlXyA9IHZvaWQgMDtcbiAgICB0aGlzLm9uQk9MID0gdm9pZCAwO1xuICAgIHRoaXMub25CVU9MID0gdm9pZCAwO1xuICAgIGlmICghb3B0aW9ucy5nZXQpIHtcbiAgICAgIGRpZSgzMSk7XG4gICAgfVxuICAgIHRoaXMuZGVyaXZhdGlvbiA9IG9wdGlvbnMuZ2V0O1xuICAgIHRoaXMubmFtZV8gPSBvcHRpb25zLm5hbWUgfHwgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiQ29tcHV0ZWRWYWx1ZUBcIiArIGdldE5leHRJZCgpIDogXCJDb21wdXRlZFZhbHVlXCIpO1xuICAgIGlmIChvcHRpb25zLnNldCkge1xuICAgICAgdGhpcy5zZXR0ZXJfID0gY3JlYXRlQWN0aW9uKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHRoaXMubmFtZV8gKyBcIi1zZXR0ZXJcIiA6IFwiQ29tcHV0ZWRWYWx1ZS1zZXR0ZXJcIiwgb3B0aW9ucy5zZXQpO1xuICAgIH1cbiAgICB0aGlzLmVxdWFsc18gPSBvcHRpb25zLmVxdWFscyB8fCAob3B0aW9ucy5jb21wYXJlU3RydWN0dXJhbCB8fCBvcHRpb25zLnN0cnVjdCA/IGNvbXBhcmVyLnN0cnVjdHVyYWwgOiBjb21wYXJlcltcImRlZmF1bHRcIl0pO1xuICAgIHRoaXMuc2NvcGVfID0gb3B0aW9ucy5jb250ZXh0O1xuICAgIHRoaXMucmVxdWlyZXNSZWFjdGlvbl8gPSBvcHRpb25zLnJlcXVpcmVzUmVhY3Rpb247XG4gICAgdGhpcy5rZWVwQWxpdmVfID0gISFvcHRpb25zLmtlZXBBbGl2ZTtcbiAgfVxuICB2YXIgX3Byb3RvID0gQ29tcHV0ZWRWYWx1ZS5wcm90b3R5cGU7XG4gIF9wcm90by5vbkJlY29tZVN0YWxlXyA9IGZ1bmN0aW9uIG9uQmVjb21lU3RhbGVfKCkge1xuICAgIHByb3BhZ2F0ZU1heWJlQ2hhbmdlZCh0aGlzKTtcbiAgfTtcbiAgX3Byb3RvLm9uQk8gPSBmdW5jdGlvbiBvbkJPKCkge1xuICAgIGlmICh0aGlzLm9uQk9MKSB7XG4gICAgICB0aGlzLm9uQk9MLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8ub25CVU8gPSBmdW5jdGlvbiBvbkJVTygpIHtcbiAgICBpZiAodGhpcy5vbkJVT0wpIHtcbiAgICAgIHRoaXMub25CVU9MLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoaXMgY29tcHV0ZWQgdmFsdWUuXG4gICAqIFdpbGwgZXZhbHVhdGUgaXRzIGNvbXB1dGF0aW9uIGZpcnN0IGlmIG5lZWRlZC5cbiAgICovO1xuICBfcHJvdG8uZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgIGlmICh0aGlzLmlzQ29tcHV0aW5nXykge1xuICAgICAgZGllKDMyLCB0aGlzLm5hbWVfLCB0aGlzLmRlcml2YXRpb24pO1xuICAgIH1cbiAgICBpZiAoZ2xvYmFsU3RhdGUuaW5CYXRjaCA9PT0gMCAmJlxuICAgIC8vICFnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRwaW9uICYmXG4gICAgdGhpcy5vYnNlcnZlcnNfLnNpemUgPT09IDAgJiYgIXRoaXMua2VlcEFsaXZlXykge1xuICAgICAgaWYgKHNob3VsZENvbXB1dGUodGhpcykpIHtcbiAgICAgICAgdGhpcy53YXJuQWJvdXRVbnRyYWNrZWRSZWFkXygpO1xuICAgICAgICBzdGFydEJhdGNoKCk7IC8vIFNlZSBwZXJmIHRlc3QgJ2NvbXB1dGVkIG1lbW9pemF0aW9uJ1xuICAgICAgICB0aGlzLnZhbHVlXyA9IHRoaXMuY29tcHV0ZVZhbHVlXyhmYWxzZSk7XG4gICAgICAgIGVuZEJhdGNoKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcG9ydE9ic2VydmVkKHRoaXMpO1xuICAgICAgaWYgKHNob3VsZENvbXB1dGUodGhpcykpIHtcbiAgICAgICAgdmFyIHByZXZUcmFja2luZ0NvbnRleHQgPSBnbG9iYWxTdGF0ZS50cmFja2luZ0NvbnRleHQ7XG4gICAgICAgIGlmICh0aGlzLmtlZXBBbGl2ZV8gJiYgIXByZXZUcmFja2luZ0NvbnRleHQpIHtcbiAgICAgICAgICBnbG9iYWxTdGF0ZS50cmFja2luZ0NvbnRleHQgPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRyYWNrQW5kQ29tcHV0ZSgpKSB7XG4gICAgICAgICAgcHJvcGFnYXRlQ2hhbmdlQ29uZmlybWVkKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGdsb2JhbFN0YXRlLnRyYWNraW5nQ29udGV4dCA9IHByZXZUcmFja2luZ0NvbnRleHQ7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSB0aGlzLnZhbHVlXztcbiAgICBpZiAoaXNDYXVnaHRFeGNlcHRpb24ocmVzdWx0KSkge1xuICAgICAgdGhyb3cgcmVzdWx0LmNhdXNlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBfcHJvdG8uc2V0ID0gZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgaWYgKHRoaXMuc2V0dGVyXykge1xuICAgICAgaWYgKHRoaXMuaXNSdW5uaW5nU2V0dGVyXykge1xuICAgICAgICBkaWUoMzMsIHRoaXMubmFtZV8pO1xuICAgICAgfVxuICAgICAgdGhpcy5pc1J1bm5pbmdTZXR0ZXJfID0gdHJ1ZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuc2V0dGVyXy5jYWxsKHRoaXMuc2NvcGVfLCB2YWx1ZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICB0aGlzLmlzUnVubmluZ1NldHRlcl8gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGllKDM0LCB0aGlzLm5hbWVfKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by50cmFja0FuZENvbXB1dGUgPSBmdW5jdGlvbiB0cmFja0FuZENvbXB1dGUoKSB7XG4gICAgLy8gTi5COiB1bm1pbmlmaWVkIGFzIGl0IGlzIHVzZWQgYnkgTVNUXG4gICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZV87XG4gICAgdmFyIHdhc1N1c3BlbmRlZCA9IC8qIHNlZSAjMTIwOCAqL3RoaXMuZGVwZW5kZW5jaWVzU3RhdGVfID09PSBJRGVyaXZhdGlvblN0YXRlXy5OT1RfVFJBQ0tJTkdfO1xuICAgIHZhciBuZXdWYWx1ZSA9IHRoaXMuY29tcHV0ZVZhbHVlXyh0cnVlKTtcbiAgICB2YXIgY2hhbmdlZCA9IHdhc1N1c3BlbmRlZCB8fCBpc0NhdWdodEV4Y2VwdGlvbihvbGRWYWx1ZSkgfHwgaXNDYXVnaHRFeGNlcHRpb24obmV3VmFsdWUpIHx8ICF0aGlzLmVxdWFsc18ob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgdGhpcy52YWx1ZV8gPSBuZXdWYWx1ZTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgaXNTcHlFbmFibGVkKCkpIHtcbiAgICAgICAgc3B5UmVwb3J0KHtcbiAgICAgICAgICBvYnNlcnZhYmxlS2luZDogXCJjb21wdXRlZFwiLFxuICAgICAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5uYW1lXyxcbiAgICAgICAgICBvYmplY3Q6IHRoaXMuc2NvcGVfLFxuICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlLFxuICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNoYW5nZWQ7XG4gIH07XG4gIF9wcm90by5jb21wdXRlVmFsdWVfID0gZnVuY3Rpb24gY29tcHV0ZVZhbHVlXyh0cmFjaykge1xuICAgIHRoaXMuaXNDb21wdXRpbmdfID0gdHJ1ZTtcbiAgICAvLyBkb24ndCBhbGxvdyBzdGF0ZSBjaGFuZ2VzIGR1cmluZyBjb21wdXRhdGlvblxuICAgIHZhciBwcmV2ID0gYWxsb3dTdGF0ZUNoYW5nZXNTdGFydChmYWxzZSk7XG4gICAgdmFyIHJlcztcbiAgICBpZiAodHJhY2spIHtcbiAgICAgIHJlcyA9IHRyYWNrRGVyaXZlZEZ1bmN0aW9uKHRoaXMsIHRoaXMuZGVyaXZhdGlvbiwgdGhpcy5zY29wZV8pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZ2xvYmFsU3RhdGUuZGlzYWJsZUVycm9yQm91bmRhcmllcyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXMgPSB0aGlzLmRlcml2YXRpb24uY2FsbCh0aGlzLnNjb3BlXyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcyA9IHRoaXMuZGVyaXZhdGlvbi5jYWxsKHRoaXMuc2NvcGVfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJlcyA9IG5ldyBDYXVnaHRFeGNlcHRpb24oZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgYWxsb3dTdGF0ZUNoYW5nZXNFbmQocHJldik7XG4gICAgdGhpcy5pc0NvbXB1dGluZ18gPSBmYWxzZTtcbiAgICByZXR1cm4gcmVzO1xuICB9O1xuICBfcHJvdG8uc3VzcGVuZF8gPSBmdW5jdGlvbiBzdXNwZW5kXygpIHtcbiAgICBpZiAoIXRoaXMua2VlcEFsaXZlXykge1xuICAgICAgY2xlYXJPYnNlcnZpbmcodGhpcyk7XG4gICAgICB0aGlzLnZhbHVlXyA9IHVuZGVmaW5lZDsgLy8gZG9uJ3QgaG9sZCBvbiB0byBjb21wdXRlZCB2YWx1ZSFcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgdGhpcy5pc1RyYWNpbmdfICE9PSBUcmFjZU1vZGUuTk9ORSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlttb2J4LnRyYWNlXSBDb21wdXRlZCB2YWx1ZSAnXCIgKyB0aGlzLm5hbWVfICsgXCInIHdhcyBzdXNwZW5kZWQgYW5kIGl0IHdpbGwgcmVjb21wdXRlIG9uIHRoZSBuZXh0IGFjY2Vzcy5cIik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBfcHJvdG8ub2JzZXJ2ZV8gPSBmdW5jdGlvbiBvYnNlcnZlXyhsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZmlyc3RUaW1lID0gdHJ1ZTtcbiAgICB2YXIgcHJldlZhbHVlID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBhdXRvcnVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIFRPRE86IHdoeSBpcyB0aGlzIGluIGEgZGlmZmVyZW50IHBsYWNlIHRoYW4gdGhlIHNweVJlcG9ydCgpIGZ1bmN0aW9uPyBpbiBhbGwgb3RoZXIgb2JzZXJ2YWJsZXMgaXQncyBjYWxsZWQgaW4gdGhlIHNhbWUgcGxhY2VcbiAgICAgIHZhciBuZXdWYWx1ZSA9IF90aGlzLmdldCgpO1xuICAgICAgaWYgKCFmaXJzdFRpbWUgfHwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICAgIHZhciBwcmV2VSA9IHVudHJhY2tlZFN0YXJ0KCk7XG4gICAgICAgIGxpc3RlbmVyKHtcbiAgICAgICAgICBvYnNlcnZhYmxlS2luZDogXCJjb21wdXRlZFwiLFxuICAgICAgICAgIGRlYnVnT2JqZWN0TmFtZTogX3RoaXMubmFtZV8sXG4gICAgICAgICAgdHlwZTogVVBEQVRFLFxuICAgICAgICAgIG9iamVjdDogX3RoaXMsXG4gICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICAgIG9sZFZhbHVlOiBwcmV2VmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIHVudHJhY2tlZEVuZChwcmV2VSk7XG4gICAgICB9XG4gICAgICBmaXJzdFRpbWUgPSBmYWxzZTtcbiAgICAgIHByZXZWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH0pO1xuICB9O1xuICBfcHJvdG8ud2FybkFib3V0VW50cmFja2VkUmVhZF8gPSBmdW5jdGlvbiB3YXJuQWJvdXRVbnRyYWNrZWRSZWFkXygpIHtcbiAgICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmlzVHJhY2luZ18gIT09IFRyYWNlTW9kZS5OT05FKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIlttb2J4LnRyYWNlXSBDb21wdXRlZCB2YWx1ZSAnXCIgKyB0aGlzLm5hbWVfICsgXCInIGlzIGJlaW5nIHJlYWQgb3V0c2lkZSBhIHJlYWN0aXZlIGNvbnRleHQuIERvaW5nIGEgZnVsbCByZWNvbXB1dGUuXCIpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMucmVxdWlyZXNSZWFjdGlvbl8gPT09IFwiYm9vbGVhblwiID8gdGhpcy5yZXF1aXJlc1JlYWN0aW9uXyA6IGdsb2JhbFN0YXRlLmNvbXB1dGVkUmVxdWlyZXNSZWFjdGlvbikge1xuICAgICAgY29uc29sZS53YXJuKFwiW21vYnhdIENvbXB1dGVkIHZhbHVlICdcIiArIHRoaXMubmFtZV8gKyBcIicgaXMgYmVpbmcgcmVhZCBvdXRzaWRlIGEgcmVhY3RpdmUgY29udGV4dC4gRG9pbmcgYSBmdWxsIHJlY29tcHV0ZS5cIik7XG4gICAgfVxuICB9O1xuICBfcHJvdG8udG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lXyArIFwiW1wiICsgdGhpcy5kZXJpdmF0aW9uLnRvU3RyaW5nKCkgKyBcIl1cIjtcbiAgfTtcbiAgX3Byb3RvLnZhbHVlT2YgPSBmdW5jdGlvbiB2YWx1ZU9mKCkge1xuICAgIHJldHVybiB0b1ByaW1pdGl2ZSh0aGlzLmdldCgpKTtcbiAgfTtcbiAgX3Byb3RvW19TeW1ib2wkdG9QcmltaXRpdmUkMV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVPZigpO1xuICB9O1xuICByZXR1cm4gQ29tcHV0ZWRWYWx1ZTtcbn0oKTtcbnZhciBpc0NvbXB1dGVkVmFsdWUgPSAvKiNfX1BVUkVfXyovY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZShcIkNvbXB1dGVkVmFsdWVcIiwgQ29tcHV0ZWRWYWx1ZSk7XG5cbnZhciBJRGVyaXZhdGlvblN0YXRlXztcbihmdW5jdGlvbiAoSURlcml2YXRpb25TdGF0ZV8pIHtcbiAgLy8gYmVmb3JlIGJlaW5nIHJ1biBvciAob3V0c2lkZSBiYXRjaCBhbmQgbm90IGJlaW5nIG9ic2VydmVkKVxuICAvLyBhdCB0aGlzIHBvaW50IGRlcml2YXRpb24gaXMgbm90IGhvbGRpbmcgYW55IGRhdGEgYWJvdXQgZGVwZW5kZW5jeSB0cmVlXG4gIElEZXJpdmF0aW9uU3RhdGVfW0lEZXJpdmF0aW9uU3RhdGVfW1wiTk9UX1RSQUNLSU5HX1wiXSA9IC0xXSA9IFwiTk9UX1RSQUNLSU5HX1wiO1xuICAvLyBubyBzaGFsbG93IGRlcGVuZGVuY3kgY2hhbmdlZCBzaW5jZSBsYXN0IGNvbXB1dGF0aW9uXG4gIC8vIHdvbid0IHJlY2FsY3VsYXRlIGRlcml2YXRpb25cbiAgLy8gdGhpcyBpcyB3aGF0IG1ha2VzIG1vYnggZmFzdFxuICBJRGVyaXZhdGlvblN0YXRlX1tJRGVyaXZhdGlvblN0YXRlX1tcIlVQX1RPX0RBVEVfXCJdID0gMF0gPSBcIlVQX1RPX0RBVEVfXCI7XG4gIC8vIHNvbWUgZGVlcCBkZXBlbmRlbmN5IGNoYW5nZWQsIGJ1dCBkb24ndCBrbm93IGlmIHNoYWxsb3cgZGVwZW5kZW5jeSBjaGFuZ2VkXG4gIC8vIHdpbGwgcmVxdWlyZSB0byBjaGVjayBmaXJzdCBpZiBVUF9UT19EQVRFIG9yIFBPU1NJQkxZX1NUQUxFXG4gIC8vIGN1cnJlbnRseSBvbmx5IENvbXB1dGVkVmFsdWUgd2lsbCBwcm9wYWdhdGUgUE9TU0lCTFlfU1RBTEVcbiAgLy9cbiAgLy8gaGF2aW5nIHRoaXMgc3RhdGUgaXMgc2Vjb25kIGJpZyBvcHRpbWl6YXRpb246XG4gIC8vIGRvbid0IGhhdmUgdG8gcmVjb21wdXRlIG9uIGV2ZXJ5IGRlcGVuZGVuY3kgY2hhbmdlLCBidXQgb25seSB3aGVuIGl0J3MgbmVlZGVkXG4gIElEZXJpdmF0aW9uU3RhdGVfW0lEZXJpdmF0aW9uU3RhdGVfW1wiUE9TU0lCTFlfU1RBTEVfXCJdID0gMV0gPSBcIlBPU1NJQkxZX1NUQUxFX1wiO1xuICAvLyBBIHNoYWxsb3cgZGVwZW5kZW5jeSBoYXMgY2hhbmdlZCBzaW5jZSBsYXN0IGNvbXB1dGF0aW9uIGFuZCB0aGUgZGVyaXZhdGlvblxuICAvLyB3aWxsIG5lZWQgdG8gcmVjb21wdXRlIHdoZW4gaXQncyBuZWVkZWQgbmV4dC5cbiAgSURlcml2YXRpb25TdGF0ZV9bSURlcml2YXRpb25TdGF0ZV9bXCJTVEFMRV9cIl0gPSAyXSA9IFwiU1RBTEVfXCI7XG59KShJRGVyaXZhdGlvblN0YXRlXyB8fCAoSURlcml2YXRpb25TdGF0ZV8gPSB7fSkpO1xudmFyIFRyYWNlTW9kZTtcbihmdW5jdGlvbiAoVHJhY2VNb2RlKSB7XG4gIFRyYWNlTW9kZVtUcmFjZU1vZGVbXCJOT05FXCJdID0gMF0gPSBcIk5PTkVcIjtcbiAgVHJhY2VNb2RlW1RyYWNlTW9kZVtcIkxPR1wiXSA9IDFdID0gXCJMT0dcIjtcbiAgVHJhY2VNb2RlW1RyYWNlTW9kZVtcIkJSRUFLXCJdID0gMl0gPSBcIkJSRUFLXCI7XG59KShUcmFjZU1vZGUgfHwgKFRyYWNlTW9kZSA9IHt9KSk7XG52YXIgQ2F1Z2h0RXhjZXB0aW9uID0gZnVuY3Rpb24gQ2F1Z2h0RXhjZXB0aW9uKGNhdXNlKSB7XG4gIHRoaXMuY2F1c2UgPSB2b2lkIDA7XG4gIHRoaXMuY2F1c2UgPSBjYXVzZTtcbiAgLy8gRW1wdHlcbn07XG5cbmZ1bmN0aW9uIGlzQ2F1Z2h0RXhjZXB0aW9uKGUpIHtcbiAgcmV0dXJuIGUgaW5zdGFuY2VvZiBDYXVnaHRFeGNlcHRpb247XG59XG4vKipcbiAqIEZpbmRzIG91dCB3aGV0aGVyIGFueSBkZXBlbmRlbmN5IG9mIHRoZSBkZXJpdmF0aW9uIGhhcyBhY3R1YWxseSBjaGFuZ2VkLlxuICogSWYgZGVwZW5kZW5jaWVzU3RhdGUgaXMgMSB0aGVuIGl0IHdpbGwgcmVjYWxjdWxhdGUgZGVwZW5kZW5jaWVzLFxuICogaWYgYW55IGRlcGVuZGVuY3kgY2hhbmdlZCBpdCB3aWxsIHByb3BhZ2F0ZSBpdCBieSBjaGFuZ2luZyBkZXBlbmRlbmNpZXNTdGF0ZSB0byAyLlxuICpcbiAqIEJ5IGl0ZXJhdGluZyBvdmVyIHRoZSBkZXBlbmRlbmNpZXMgaW4gdGhlIHNhbWUgb3JkZXIgdGhhdCB0aGV5IHdlcmUgcmVwb3J0ZWQgYW5kXG4gKiBzdG9wcGluZyBvbiB0aGUgZmlyc3QgY2hhbmdlLCBhbGwgdGhlIHJlY2FsY3VsYXRpb25zIGFyZSBvbmx5IGNhbGxlZCBmb3IgQ29tcHV0ZWRWYWx1ZXNcbiAqIHRoYXQgd2lsbCBiZSB0cmFja2VkIGJ5IGRlcml2YXRpb24uIFRoYXQgaXMgYmVjYXVzZSB3ZSBhc3N1bWUgdGhhdCBpZiB0aGUgZmlyc3QgeFxuICogZGVwZW5kZW5jaWVzIG9mIHRoZSBkZXJpdmF0aW9uIGRvZXNuJ3QgY2hhbmdlIHRoZW4gdGhlIGRlcml2YXRpb24gc2hvdWxkIHJ1biB0aGUgc2FtZSB3YXlcbiAqIHVwIHVudGlsIGFjY2Vzc2luZyB4LXRoIGRlcGVuZGVuY3kuXG4gKi9cbmZ1bmN0aW9uIHNob3VsZENvbXB1dGUoZGVyaXZhdGlvbikge1xuICBzd2l0Y2ggKGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGVfKSB7XG4gICAgY2FzZSBJRGVyaXZhdGlvblN0YXRlXy5VUF9UT19EQVRFXzpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlIElEZXJpdmF0aW9uU3RhdGVfLk5PVF9UUkFDS0lOR186XG4gICAgY2FzZSBJRGVyaXZhdGlvblN0YXRlXy5TVEFMRV86XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlIElEZXJpdmF0aW9uU3RhdGVfLlBPU1NJQkxZX1NUQUxFXzpcbiAgICAgIHtcbiAgICAgICAgLy8gc3RhdGUgcHJvcGFnYXRpb24gY2FuIG9jY3VyIG91dHNpZGUgb2YgYWN0aW9uL3JlYWN0aXZlIGNvbnRleHQgIzIxOTVcbiAgICAgICAgdmFyIHByZXZBbGxvd1N0YXRlUmVhZHMgPSBhbGxvd1N0YXRlUmVhZHNTdGFydCh0cnVlKTtcbiAgICAgICAgdmFyIHByZXZVbnRyYWNrZWQgPSB1bnRyYWNrZWRTdGFydCgpOyAvLyBubyBuZWVkIGZvciB0aG9zZSBjb21wdXRlZHMgdG8gYmUgcmVwb3J0ZWQsIHRoZXkgd2lsbCBiZSBwaWNrZWQgdXAgaW4gdHJhY2tEZXJpdmVkRnVuY3Rpb24uXG4gICAgICAgIHZhciBvYnMgPSBkZXJpdmF0aW9uLm9ic2VydmluZ18sXG4gICAgICAgICAgbCA9IG9icy5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgdmFyIG9iaiA9IG9ic1tpXTtcbiAgICAgICAgICBpZiAoaXNDb21wdXRlZFZhbHVlKG9iaikpIHtcbiAgICAgICAgICAgIGlmIChnbG9iYWxTdGF0ZS5kaXNhYmxlRXJyb3JCb3VuZGFyaWVzKSB7XG4gICAgICAgICAgICAgIG9iai5nZXQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgb2JqLmdldCgpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgLy8gd2UgYXJlIG5vdCBpbnRlcmVzdGVkIGluIHRoZSB2YWx1ZSAqb3IqIGV4Y2VwdGlvbiBhdCB0aGlzIG1vbWVudCwgYnV0IGlmIHRoZXJlIGlzIG9uZSwgbm90aWZ5IGFsbFxuICAgICAgICAgICAgICAgIHVudHJhY2tlZEVuZChwcmV2VW50cmFja2VkKTtcbiAgICAgICAgICAgICAgICBhbGxvd1N0YXRlUmVhZHNFbmQocHJldkFsbG93U3RhdGVSZWFkcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIENvbXB1dGVkVmFsdWUgYG9iamAgYWN0dWFsbHkgY2hhbmdlZCBpdCB3aWxsIGJlIGNvbXB1dGVkIGFuZCBwcm9wYWdhdGVkIHRvIGl0cyBvYnNlcnZlcnMuXG4gICAgICAgICAgICAvLyBhbmQgYGRlcml2YXRpb25gIGlzIGFuIG9ic2VydmVyIG9mIGBvYmpgXG4gICAgICAgICAgICAvLyBpbnZhcmlhbnRTaG91bGRDb21wdXRlKGRlcml2YXRpb24pXG4gICAgICAgICAgICBpZiAoZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZV8gPT09IElEZXJpdmF0aW9uU3RhdGVfLlNUQUxFXykge1xuICAgICAgICAgICAgICB1bnRyYWNrZWRFbmQocHJldlVudHJhY2tlZCk7XG4gICAgICAgICAgICAgIGFsbG93U3RhdGVSZWFkc0VuZChwcmV2QWxsb3dTdGF0ZVJlYWRzKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoYW5nZURlcGVuZGVuY2llc1N0YXRlVG8wKGRlcml2YXRpb24pO1xuICAgICAgICB1bnRyYWNrZWRFbmQocHJldlVudHJhY2tlZCk7XG4gICAgICAgIGFsbG93U3RhdGVSZWFkc0VuZChwcmV2QWxsb3dTdGF0ZVJlYWRzKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICB9XG59XG5mdW5jdGlvbiBpc0NvbXB1dGluZ0Rlcml2YXRpb24oKSB7XG4gIHJldHVybiBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb24gIT09IG51bGw7IC8vIGZpbHRlciBvdXQgYWN0aW9ucyBpbnNpZGUgY29tcHV0YXRpb25zXG59XG5cbmZ1bmN0aW9uIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkKGF0b20pIHtcbiAgaWYgKCEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaGFzT2JzZXJ2ZXJzID0gYXRvbS5vYnNlcnZlcnNfLnNpemUgPiAwO1xuICAvLyBTaG91bGQgbm90IGJlIHBvc3NpYmxlIHRvIGNoYW5nZSBvYnNlcnZlZCBzdGF0ZSBvdXRzaWRlIHN0cmljdCBtb2RlLCBleGNlcHQgZHVyaW5nIGluaXRpYWxpemF0aW9uLCBzZWUgIzU2M1xuICBpZiAoIWdsb2JhbFN0YXRlLmFsbG93U3RhdGVDaGFuZ2VzICYmIChoYXNPYnNlcnZlcnMgfHwgZ2xvYmFsU3RhdGUuZW5mb3JjZUFjdGlvbnMgPT09IFwiYWx3YXlzXCIpKSB7XG4gICAgY29uc29sZS53YXJuKFwiW01vYlhdIFwiICsgKGdsb2JhbFN0YXRlLmVuZm9yY2VBY3Rpb25zID8gXCJTaW5jZSBzdHJpY3QtbW9kZSBpcyBlbmFibGVkLCBjaGFuZ2luZyAob2JzZXJ2ZWQpIG9ic2VydmFibGUgdmFsdWVzIHdpdGhvdXQgdXNpbmcgYW4gYWN0aW9uIGlzIG5vdCBhbGxvd2VkLiBUcmllZCB0byBtb2RpZnk6IFwiIDogXCJTaWRlIGVmZmVjdHMgbGlrZSBjaGFuZ2luZyBzdGF0ZSBhcmUgbm90IGFsbG93ZWQgYXQgdGhpcyBwb2ludC4gQXJlIHlvdSB0cnlpbmcgdG8gbW9kaWZ5IHN0YXRlIGZyb20sIGZvciBleGFtcGxlLCBhIGNvbXB1dGVkIHZhbHVlIG9yIHRoZSByZW5kZXIgZnVuY3Rpb24gb2YgYSBSZWFjdCBjb21wb25lbnQ/IFlvdSBjYW4gd3JhcCBzaWRlIGVmZmVjdHMgaW4gJ3J1bkluQWN0aW9uJyAob3IgZGVjb3JhdGUgZnVuY3Rpb25zIHdpdGggJ2FjdGlvbicpIGlmIG5lZWRlZC4gVHJpZWQgdG8gbW9kaWZ5OiBcIikgKyBhdG9tLm5hbWVfKTtcbiAgfVxufVxuZnVuY3Rpb24gY2hlY2tJZlN0YXRlUmVhZHNBcmVBbGxvd2VkKG9ic2VydmFibGUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZVJlYWRzICYmIGdsb2JhbFN0YXRlLm9ic2VydmFibGVSZXF1aXJlc1JlYWN0aW9uKSB7XG4gICAgY29uc29sZS53YXJuKFwiW21vYnhdIE9ic2VydmFibGUgJ1wiICsgb2JzZXJ2YWJsZS5uYW1lXyArIFwiJyBiZWluZyByZWFkIG91dHNpZGUgYSByZWFjdGl2ZSBjb250ZXh0LlwiKTtcbiAgfVxufVxuLyoqXG4gKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gYGZgIGFuZCB0cmFja3Mgd2hpY2ggb2JzZXJ2YWJsZXMgYXJlIGJlaW5nIGFjY2Vzc2VkLlxuICogVGhlIHRyYWNraW5nIGluZm9ybWF0aW9uIGlzIHN0b3JlZCBvbiB0aGUgYGRlcml2YXRpb25gIG9iamVjdCBhbmQgdGhlIGRlcml2YXRpb24gaXMgcmVnaXN0ZXJlZFxuICogYXMgb2JzZXJ2ZXIgb2YgYW55IG9mIHRoZSBhY2Nlc3NlZCBvYnNlcnZhYmxlcy5cbiAqL1xuZnVuY3Rpb24gdHJhY2tEZXJpdmVkRnVuY3Rpb24oZGVyaXZhdGlvbiwgZiwgY29udGV4dCkge1xuICB2YXIgcHJldkFsbG93U3RhdGVSZWFkcyA9IGFsbG93U3RhdGVSZWFkc1N0YXJ0KHRydWUpO1xuICBjaGFuZ2VEZXBlbmRlbmNpZXNTdGF0ZVRvMChkZXJpdmF0aW9uKTtcbiAgLy8gUHJlYWxsb2NhdGUgYXJyYXk7IHdpbGwgYmUgdHJpbW1lZCBieSBiaW5kRGVwZW5kZW5jaWVzLlxuICBkZXJpdmF0aW9uLm5ld09ic2VydmluZ18gPSBuZXcgQXJyYXkoXG4gIC8vIFJlc2VydmUgY29uc3RhbnQgc3BhY2UgZm9yIGluaXRpYWwgZGVwZW5kZW5jaWVzLCBkeW5hbWljIHNwYWNlIG90aGVyd2lzZS5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb2J4anMvbW9ieC9wdWxsLzM4MzNcbiAgZGVyaXZhdGlvbi5ydW5JZF8gPT09IDAgPyAxMDAgOiBkZXJpdmF0aW9uLm9ic2VydmluZ18ubGVuZ3RoKTtcbiAgZGVyaXZhdGlvbi51bmJvdW5kRGVwc0NvdW50XyA9IDA7XG4gIGRlcml2YXRpb24ucnVuSWRfID0gKytnbG9iYWxTdGF0ZS5ydW5JZDtcbiAgdmFyIHByZXZUcmFja2luZyA9IGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbjtcbiAgZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uID0gZGVyaXZhdGlvbjtcbiAgZ2xvYmFsU3RhdGUuaW5CYXRjaCsrO1xuICB2YXIgcmVzdWx0O1xuICBpZiAoZ2xvYmFsU3RhdGUuZGlzYWJsZUVycm9yQm91bmRhcmllcyA9PT0gdHJ1ZSkge1xuICAgIHJlc3VsdCA9IGYuY2FsbChjb250ZXh0KTtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gZi5jYWxsKGNvbnRleHQpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBDYXVnaHRFeGNlcHRpb24oZSk7XG4gICAgfVxuICB9XG4gIGdsb2JhbFN0YXRlLmluQmF0Y2gtLTtcbiAgZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uID0gcHJldlRyYWNraW5nO1xuICBiaW5kRGVwZW5kZW5jaWVzKGRlcml2YXRpb24pO1xuICB3YXJuQWJvdXREZXJpdmF0aW9uV2l0aG91dERlcGVuZGVuY2llcyhkZXJpdmF0aW9uKTtcbiAgYWxsb3dTdGF0ZVJlYWRzRW5kKHByZXZBbGxvd1N0YXRlUmVhZHMpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gd2FybkFib3V0RGVyaXZhdGlvbldpdGhvdXREZXBlbmRlbmNpZXMoZGVyaXZhdGlvbikge1xuICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChkZXJpdmF0aW9uLm9ic2VydmluZ18ubGVuZ3RoICE9PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlb2YgZGVyaXZhdGlvbi5yZXF1aXJlc09ic2VydmFibGVfID09PSBcImJvb2xlYW5cIiA/IGRlcml2YXRpb24ucmVxdWlyZXNPYnNlcnZhYmxlXyA6IGdsb2JhbFN0YXRlLnJlYWN0aW9uUmVxdWlyZXNPYnNlcnZhYmxlKSB7XG4gICAgY29uc29sZS53YXJuKFwiW21vYnhdIERlcml2YXRpb24gJ1wiICsgZGVyaXZhdGlvbi5uYW1lXyArIFwiJyBpcyBjcmVhdGVkL3VwZGF0ZWQgd2l0aG91dCByZWFkaW5nIGFueSBvYnNlcnZhYmxlIHZhbHVlLlwiKTtcbiAgfVxufVxuLyoqXG4gKiBkaWZmcyBuZXdPYnNlcnZpbmcgd2l0aCBvYnNlcnZpbmcuXG4gKiB1cGRhdGUgb2JzZXJ2aW5nIHRvIGJlIG5ld09ic2VydmluZyB3aXRoIHVuaXF1ZSBvYnNlcnZhYmxlc1xuICogbm90aWZ5IG9ic2VydmVycyB0aGF0IGJlY29tZSBvYnNlcnZlZC91bm9ic2VydmVkXG4gKi9cbmZ1bmN0aW9uIGJpbmREZXBlbmRlbmNpZXMoZGVyaXZhdGlvbikge1xuICAvLyBpbnZhcmlhbnQoZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZSAhPT0gSURlcml2YXRpb25TdGF0ZS5OT1RfVFJBQ0tJTkcsIFwiSU5URVJOQUwgRVJST1IgYmluZERlcGVuZGVuY2llcyBleHBlY3RzIGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGUgIT09IC0xXCIpO1xuICB2YXIgcHJldk9ic2VydmluZyA9IGRlcml2YXRpb24ub2JzZXJ2aW5nXztcbiAgdmFyIG9ic2VydmluZyA9IGRlcml2YXRpb24ub2JzZXJ2aW5nXyA9IGRlcml2YXRpb24ubmV3T2JzZXJ2aW5nXztcbiAgdmFyIGxvd2VzdE5ld09ic2VydmluZ0Rlcml2YXRpb25TdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGVfLlVQX1RPX0RBVEVfO1xuICAvLyBHbyB0aHJvdWdoIGFsbCBuZXcgb2JzZXJ2YWJsZXMgYW5kIGNoZWNrIGRpZmZWYWx1ZTogKHRoaXMgbGlzdCBjYW4gY29udGFpbiBkdXBsaWNhdGVzKTpcbiAgLy8gICAwOiBmaXJzdCBvY2N1cnJlbmNlLCBjaGFuZ2UgdG8gMSBhbmQga2VlcCBpdFxuICAvLyAgIDE6IGV4dHJhIG9jY3VycmVuY2UsIGRyb3AgaXRcbiAgdmFyIGkwID0gMCxcbiAgICBsID0gZGVyaXZhdGlvbi51bmJvdW5kRGVwc0NvdW50XztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgZGVwID0gb2JzZXJ2aW5nW2ldO1xuICAgIGlmIChkZXAuZGlmZlZhbHVlXyA9PT0gMCkge1xuICAgICAgZGVwLmRpZmZWYWx1ZV8gPSAxO1xuICAgICAgaWYgKGkwICE9PSBpKSB7XG4gICAgICAgIG9ic2VydmluZ1tpMF0gPSBkZXA7XG4gICAgICB9XG4gICAgICBpMCsrO1xuICAgIH1cbiAgICAvLyBVcGNhc3QgaXMgJ3NhZmUnIGhlcmUsIGJlY2F1c2UgaWYgZGVwIGlzIElPYnNlcnZhYmxlLCBgZGVwZW5kZW5jaWVzU3RhdGVgIHdpbGwgYmUgdW5kZWZpbmVkLFxuICAgIC8vIG5vdCBoaXR0aW5nIHRoZSBjb25kaXRpb25cbiAgICBpZiAoZGVwLmRlcGVuZGVuY2llc1N0YXRlXyA+IGxvd2VzdE5ld09ic2VydmluZ0Rlcml2YXRpb25TdGF0ZSkge1xuICAgICAgbG93ZXN0TmV3T2JzZXJ2aW5nRGVyaXZhdGlvblN0YXRlID0gZGVwLmRlcGVuZGVuY2llc1N0YXRlXztcbiAgICB9XG4gIH1cbiAgb2JzZXJ2aW5nLmxlbmd0aCA9IGkwO1xuICBkZXJpdmF0aW9uLm5ld09ic2VydmluZ18gPSBudWxsOyAvLyBuZXdPYnNlcnZpbmcgc2hvdWxkbid0IGJlIG5lZWRlZCBvdXRzaWRlIHRyYWNraW5nIChzdGF0ZW1lbnQgbW92ZWQgZG93biB0byB3b3JrIGFyb3VuZCBGRiBidWcsIHNlZSAjNjE0KVxuICAvLyBHbyB0aHJvdWdoIGFsbCBvbGQgb2JzZXJ2YWJsZXMgYW5kIGNoZWNrIGRpZmZWYWx1ZTogKGl0IGlzIHVuaXF1ZSBhZnRlciBsYXN0IGJpbmREZXBlbmRlbmNpZXMpXG4gIC8vICAgMDogaXQncyBub3QgaW4gbmV3IG9ic2VydmFibGVzLCB1bm9ic2VydmUgaXRcbiAgLy8gICAxOiBpdCBrZWVwcyBiZWluZyBvYnNlcnZlZCwgZG9uJ3Qgd2FudCB0byBub3RpZnkgaXQuIGNoYW5nZSB0byAwXG4gIGwgPSBwcmV2T2JzZXJ2aW5nLmxlbmd0aDtcbiAgd2hpbGUgKGwtLSkge1xuICAgIHZhciBfZGVwID0gcHJldk9ic2VydmluZ1tsXTtcbiAgICBpZiAoX2RlcC5kaWZmVmFsdWVfID09PSAwKSB7XG4gICAgICByZW1vdmVPYnNlcnZlcihfZGVwLCBkZXJpdmF0aW9uKTtcbiAgICB9XG4gICAgX2RlcC5kaWZmVmFsdWVfID0gMDtcbiAgfVxuICAvLyBHbyB0aHJvdWdoIGFsbCBuZXcgb2JzZXJ2YWJsZXMgYW5kIGNoZWNrIGRpZmZWYWx1ZTogKG5vdyBpdCBzaG91bGQgYmUgdW5pcXVlKVxuICAvLyAgIDA6IGl0IHdhcyBzZXQgdG8gMCBpbiBsYXN0IGxvb3AuIGRvbid0IG5lZWQgdG8gZG8gYW55dGhpbmcuXG4gIC8vICAgMTogaXQgd2Fzbid0IG9ic2VydmVkLCBsZXQncyBvYnNlcnZlIGl0LiBzZXQgYmFjayB0byAwXG4gIHdoaWxlIChpMC0tKSB7XG4gICAgdmFyIF9kZXAyID0gb2JzZXJ2aW5nW2kwXTtcbiAgICBpZiAoX2RlcDIuZGlmZlZhbHVlXyA9PT0gMSkge1xuICAgICAgX2RlcDIuZGlmZlZhbHVlXyA9IDA7XG4gICAgICBhZGRPYnNlcnZlcihfZGVwMiwgZGVyaXZhdGlvbik7XG4gICAgfVxuICB9XG4gIC8vIFNvbWUgbmV3IG9ic2VydmVkIGRlcml2YXRpb25zIG1heSBiZWNvbWUgc3RhbGUgZHVyaW5nIHRoaXMgZGVyaXZhdGlvbiBjb21wdXRhdGlvblxuICAvLyBzbyB0aGV5IGhhdmUgaGFkIG5vIGNoYW5jZSB0byBwcm9wYWdhdGUgc3RhbGVuZXNzICgjOTE2KVxuICBpZiAobG93ZXN0TmV3T2JzZXJ2aW5nRGVyaXZhdGlvblN0YXRlICE9PSBJRGVyaXZhdGlvblN0YXRlXy5VUF9UT19EQVRFXykge1xuICAgIGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGVfID0gbG93ZXN0TmV3T2JzZXJ2aW5nRGVyaXZhdGlvblN0YXRlO1xuICAgIGRlcml2YXRpb24ub25CZWNvbWVTdGFsZV8oKTtcbiAgfVxufVxuZnVuY3Rpb24gY2xlYXJPYnNlcnZpbmcoZGVyaXZhdGlvbikge1xuICAvLyBpbnZhcmlhbnQoZ2xvYmFsU3RhdGUuaW5CYXRjaCA+IDAsIFwiSU5URVJOQUwgRVJST1IgY2xlYXJPYnNlcnZpbmcgc2hvdWxkIGJlIGNhbGxlZCBvbmx5IGluc2lkZSBiYXRjaFwiKTtcbiAgdmFyIG9icyA9IGRlcml2YXRpb24ub2JzZXJ2aW5nXztcbiAgZGVyaXZhdGlvbi5vYnNlcnZpbmdfID0gW107XG4gIHZhciBpID0gb2JzLmxlbmd0aDtcbiAgd2hpbGUgKGktLSkge1xuICAgIHJlbW92ZU9ic2VydmVyKG9ic1tpXSwgZGVyaXZhdGlvbik7XG4gIH1cbiAgZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5OT1RfVFJBQ0tJTkdfO1xufVxuZnVuY3Rpb24gdW50cmFja2VkKGFjdGlvbikge1xuICB2YXIgcHJldiA9IHVudHJhY2tlZFN0YXJ0KCk7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGFjdGlvbigpO1xuICB9IGZpbmFsbHkge1xuICAgIHVudHJhY2tlZEVuZChwcmV2KTtcbiAgfVxufVxuZnVuY3Rpb24gdW50cmFja2VkU3RhcnQoKSB7XG4gIHZhciBwcmV2ID0gZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uO1xuICBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb24gPSBudWxsO1xuICByZXR1cm4gcHJldjtcbn1cbmZ1bmN0aW9uIHVudHJhY2tlZEVuZChwcmV2KSB7XG4gIGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbiA9IHByZXY7XG59XG5mdW5jdGlvbiBhbGxvd1N0YXRlUmVhZHNTdGFydChhbGxvd1N0YXRlUmVhZHMpIHtcbiAgdmFyIHByZXYgPSBnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlUmVhZHM7XG4gIGdsb2JhbFN0YXRlLmFsbG93U3RhdGVSZWFkcyA9IGFsbG93U3RhdGVSZWFkcztcbiAgcmV0dXJuIHByZXY7XG59XG5mdW5jdGlvbiBhbGxvd1N0YXRlUmVhZHNFbmQocHJldikge1xuICBnbG9iYWxTdGF0ZS5hbGxvd1N0YXRlUmVhZHMgPSBwcmV2O1xufVxuLyoqXG4gKiBuZWVkZWQgdG8ga2VlcCBgbG93ZXN0T2JzZXJ2ZXJTdGF0ZWAgY29ycmVjdC4gd2hlbiBjaGFuZ2luZyBmcm9tICgyIG9yIDEpIHRvIDBcbiAqXG4gKi9cbmZ1bmN0aW9uIGNoYW5nZURlcGVuZGVuY2llc1N0YXRlVG8wKGRlcml2YXRpb24pIHtcbiAgaWYgKGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGVfID09PSBJRGVyaXZhdGlvblN0YXRlXy5VUF9UT19EQVRFXykge1xuICAgIHJldHVybjtcbiAgfVxuICBkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLlVQX1RPX0RBVEVfO1xuICB2YXIgb2JzID0gZGVyaXZhdGlvbi5vYnNlcnZpbmdfO1xuICB2YXIgaSA9IG9icy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvYnNbaV0ubG93ZXN0T2JzZXJ2ZXJTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5VUF9UT19EQVRFXztcbiAgfVxufVxuXG4vKipcbiAqIFRoZXNlIHZhbHVlcyB3aWxsIHBlcnNpc3QgaWYgZ2xvYmFsIHN0YXRlIGlzIHJlc2V0XG4gKi9cbnZhciBwZXJzaXN0ZW50S2V5cyA9IFtcIm1vYnhHdWlkXCIsIFwic3B5TGlzdGVuZXJzXCIsIFwiZW5mb3JjZUFjdGlvbnNcIiwgXCJjb21wdXRlZFJlcXVpcmVzUmVhY3Rpb25cIiwgXCJyZWFjdGlvblJlcXVpcmVzT2JzZXJ2YWJsZVwiLCBcIm9ic2VydmFibGVSZXF1aXJlc1JlYWN0aW9uXCIsIFwiYWxsb3dTdGF0ZVJlYWRzXCIsIFwiZGlzYWJsZUVycm9yQm91bmRhcmllc1wiLCBcInJ1bklkXCIsIFwiVU5DSEFOR0VEXCIsIFwidXNlUHJveGllc1wiXTtcbnZhciBNb2JYR2xvYmFscyA9IGZ1bmN0aW9uIE1vYlhHbG9iYWxzKCkge1xuICB0aGlzLnZlcnNpb24gPSA2O1xuICB0aGlzLlVOQ0hBTkdFRCA9IHt9O1xuICB0aGlzLnRyYWNraW5nRGVyaXZhdGlvbiA9IG51bGw7XG4gIHRoaXMudHJhY2tpbmdDb250ZXh0ID0gbnVsbDtcbiAgdGhpcy5ydW5JZCA9IDA7XG4gIHRoaXMubW9ieEd1aWQgPSAwO1xuICB0aGlzLmluQmF0Y2ggPSAwO1xuICB0aGlzLnBlbmRpbmdVbm9ic2VydmF0aW9ucyA9IFtdO1xuICB0aGlzLnBlbmRpbmdSZWFjdGlvbnMgPSBbXTtcbiAgdGhpcy5pc1J1bm5pbmdSZWFjdGlvbnMgPSBmYWxzZTtcbiAgdGhpcy5hbGxvd1N0YXRlQ2hhbmdlcyA9IGZhbHNlO1xuICB0aGlzLmFsbG93U3RhdGVSZWFkcyA9IHRydWU7XG4gIHRoaXMuZW5mb3JjZUFjdGlvbnMgPSB0cnVlO1xuICB0aGlzLnNweUxpc3RlbmVycyA9IFtdO1xuICB0aGlzLmdsb2JhbFJlYWN0aW9uRXJyb3JIYW5kbGVycyA9IFtdO1xuICB0aGlzLmNvbXB1dGVkUmVxdWlyZXNSZWFjdGlvbiA9IGZhbHNlO1xuICB0aGlzLnJlYWN0aW9uUmVxdWlyZXNPYnNlcnZhYmxlID0gZmFsc2U7XG4gIHRoaXMub2JzZXJ2YWJsZVJlcXVpcmVzUmVhY3Rpb24gPSBmYWxzZTtcbiAgdGhpcy5kaXNhYmxlRXJyb3JCb3VuZGFyaWVzID0gZmFsc2U7XG4gIHRoaXMuc3VwcHJlc3NSZWFjdGlvbkVycm9ycyA9IGZhbHNlO1xuICB0aGlzLnVzZVByb3hpZXMgPSB0cnVlO1xuICB0aGlzLnZlcmlmeVByb3hpZXMgPSBmYWxzZTtcbiAgdGhpcy5zYWZlRGVzY3JpcHRvcnMgPSB0cnVlO1xufTtcbnZhciBjYW5NZXJnZUdsb2JhbFN0YXRlID0gdHJ1ZTtcbnZhciBpc29sYXRlQ2FsbGVkID0gZmFsc2U7XG52YXIgZ2xvYmFsU3RhdGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgZ2xvYmFsID0gLyojX19QVVJFX18qL2dldEdsb2JhbCgpO1xuICBpZiAoZ2xvYmFsLl9fbXhfaXNvbGF0ZWRfbW9ieEluc3RhbmNlQ291bnQgPiAwICYmICFnbG9iYWwuX19teF9pc29sYXRlZF9tb2J4R2xvYmFscykge1xuICAgIGNhbk1lcmdlR2xvYmFsU3RhdGUgPSBmYWxzZTtcbiAgfVxuICBpZiAoZ2xvYmFsLl9fbXhfaXNvbGF0ZWRfbW9ieEdsb2JhbHMgJiYgZ2xvYmFsLl9fbXhfaXNvbGF0ZWRfbW9ieEdsb2JhbHMudmVyc2lvbiAhPT0gbmV3IE1vYlhHbG9iYWxzKCkudmVyc2lvbikge1xuICAgIGNhbk1lcmdlR2xvYmFsU3RhdGUgPSBmYWxzZTtcbiAgfVxuICBpZiAoIWNhbk1lcmdlR2xvYmFsU3RhdGUpIHtcbiAgICAvLyBCZWNhdXNlIHRoaXMgaXMgYSBJSUZFIHdlIG5lZWQgdG8gbGV0IGlzb2xhdGVDYWxsZWQgYSBjaGFuY2UgdG8gY2hhbmdlXG4gICAgLy8gc28gd2UgcnVuIGl0IGFmdGVyIHRoZSBldmVudCBsb29wIGNvbXBsZXRlZCBhdCBsZWFzdCAxIGl0ZXJhdGlvblxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFpc29sYXRlQ2FsbGVkKSB7XG4gICAgICAgIGRpZSgzNSk7XG4gICAgICB9XG4gICAgfSwgMSk7XG4gICAgcmV0dXJuIG5ldyBNb2JYR2xvYmFscygpO1xuICB9IGVsc2UgaWYgKGdsb2JhbC5fX214X2lzb2xhdGVkX21vYnhHbG9iYWxzKSB7XG4gICAgZ2xvYmFsLl9fbXhfaXNvbGF0ZWRfbW9ieEluc3RhbmNlQ291bnQgKz0gMTtcbiAgICBpZiAoIWdsb2JhbC5fX214X2lzb2xhdGVkX21vYnhHbG9iYWxzLlVOQ0hBTkdFRCkge1xuICAgICAgZ2xvYmFsLl9fbXhfaXNvbGF0ZWRfbW9ieEdsb2JhbHMuVU5DSEFOR0VEID0ge307XG4gICAgfSAvLyBtYWtlIG1lcmdlIGJhY2t3YXJkIGNvbXBhdGlibGVcbiAgICByZXR1cm4gZ2xvYmFsLl9fbXhfaXNvbGF0ZWRfbW9ieEdsb2JhbHM7XG4gIH0gZWxzZSB7XG4gICAgZ2xvYmFsLl9fbXhfaXNvbGF0ZWRfbW9ieEluc3RhbmNlQ291bnQgPSAxO1xuICAgIHJldHVybiBnbG9iYWwuX19teF9pc29sYXRlZF9tb2J4R2xvYmFscyA9IC8qI19fUFVSRV9fKi9uZXcgTW9iWEdsb2JhbHMoKTtcbiAgfVxufSgpO1xuZnVuY3Rpb24gaXNvbGF0ZUdsb2JhbFN0YXRlKCkge1xuICBpZiAoZ2xvYmFsU3RhdGUucGVuZGluZ1JlYWN0aW9ucy5sZW5ndGggfHwgZ2xvYmFsU3RhdGUuaW5CYXRjaCB8fCBnbG9iYWxTdGF0ZS5pc1J1bm5pbmdSZWFjdGlvbnMpIHtcbiAgICBkaWUoMzYpO1xuICB9XG4gIGlzb2xhdGVDYWxsZWQgPSB0cnVlO1xuICBpZiAoY2FuTWVyZ2VHbG9iYWxTdGF0ZSkge1xuICAgIHZhciBnbG9iYWwgPSBnZXRHbG9iYWwoKTtcbiAgICBpZiAoLS1nbG9iYWwuX19teF9pc29sYXRlZF9tb2J4SW5zdGFuY2VDb3VudCA9PT0gMCkge1xuICAgICAgZ2xvYmFsLl9fbXhfaXNvbGF0ZWRfbW9ieEdsb2JhbHMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGdsb2JhbFN0YXRlID0gbmV3IE1vYlhHbG9iYWxzKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldEdsb2JhbFN0YXRlKCkge1xuICByZXR1cm4gZ2xvYmFsU3RhdGU7XG59XG4vKipcbiAqIEZvciB0ZXN0aW5nIHB1cnBvc2VzIG9ubHk7IHRoaXMgd2lsbCBicmVhayB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgZXhpc3Rpbmcgb2JzZXJ2YWJsZXMsXG4gKiBidXQgY2FuIGJlIHVzZWQgdG8gZ2V0IGJhY2sgYXQgYSBzdGFibGUgc3RhdGUgYWZ0ZXIgdGhyb3dpbmcgZXJyb3JzXG4gKi9cbmZ1bmN0aW9uIHJlc2V0R2xvYmFsU3RhdGUoKSB7XG4gIHZhciBkZWZhdWx0R2xvYmFscyA9IG5ldyBNb2JYR2xvYmFscygpO1xuICBmb3IgKHZhciBrZXkgaW4gZGVmYXVsdEdsb2JhbHMpIHtcbiAgICBpZiAocGVyc2lzdGVudEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgZ2xvYmFsU3RhdGVba2V5XSA9IGRlZmF1bHRHbG9iYWxzW2tleV07XG4gICAgfVxuICB9XG4gIGdsb2JhbFN0YXRlLmFsbG93U3RhdGVDaGFuZ2VzID0gIWdsb2JhbFN0YXRlLmVuZm9yY2VBY3Rpb25zO1xufVxuXG5mdW5jdGlvbiBoYXNPYnNlcnZlcnMob2JzZXJ2YWJsZSkge1xuICByZXR1cm4gb2JzZXJ2YWJsZS5vYnNlcnZlcnNfICYmIG9ic2VydmFibGUub2JzZXJ2ZXJzXy5zaXplID4gMDtcbn1cbmZ1bmN0aW9uIGdldE9ic2VydmVycyhvYnNlcnZhYmxlKSB7XG4gIHJldHVybiBvYnNlcnZhYmxlLm9ic2VydmVyc187XG59XG4vLyBmdW5jdGlvbiBpbnZhcmlhbnRPYnNlcnZlcnMob2JzZXJ2YWJsZTogSU9ic2VydmFibGUpIHtcbi8vICAgICBjb25zdCBsaXN0ID0gb2JzZXJ2YWJsZS5vYnNlcnZlcnNcbi8vICAgICBjb25zdCBtYXAgPSBvYnNlcnZhYmxlLm9ic2VydmVyc0luZGV4ZXNcbi8vICAgICBjb25zdCBsID0gbGlzdC5sZW5ndGhcbi8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuLy8gICAgICAgICBjb25zdCBpZCA9IGxpc3RbaV0uX19tYXBpZFxuLy8gICAgICAgICBpZiAoaSkge1xuLy8gICAgICAgICAgICAgaW52YXJpYW50KG1hcFtpZF0gPT09IGksIFwiSU5URVJOQUwgRVJST1IgbWFwcyBkZXJpdmF0aW9uLl9fbWFwaWQgdG8gaW5kZXggaW4gbGlzdFwiKSAvLyBmb3IgcGVyZm9ybWFuY2Vcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGludmFyaWFudCghKGlkIGluIG1hcCksIFwiSU5URVJOQUwgRVJST1Igb2JzZXJ2ZXIgb24gaW5kZXggMCBzaG91bGRuJ3QgYmUgaGVsZCBpbiBtYXAuXCIpIC8vIGZvciBwZXJmb3JtYW5jZVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gICAgIGludmFyaWFudChcbi8vICAgICAgICAgbGlzdC5sZW5ndGggPT09IDAgfHwgT2JqZWN0LmtleXMobWFwKS5sZW5ndGggPT09IGxpc3QubGVuZ3RoIC0gMSxcbi8vICAgICAgICAgXCJJTlRFUk5BTCBFUlJPUiB0aGVyZSBpcyBubyBqdW5rIGluIG1hcFwiXG4vLyAgICAgKVxuLy8gfVxuZnVuY3Rpb24gYWRkT2JzZXJ2ZXIob2JzZXJ2YWJsZSwgbm9kZSkge1xuICAvLyBpbnZhcmlhbnQobm9kZS5kZXBlbmRlbmNpZXNTdGF0ZSAhPT0gLTEsIFwiSU5URVJOQUwgRVJST1IsIGNhbiBhZGQgb25seSBkZXBlbmRlbmNpZXNTdGF0ZSAhPT0gLTFcIik7XG4gIC8vIGludmFyaWFudChvYnNlcnZhYmxlLl9vYnNlcnZlcnMuaW5kZXhPZihub2RlKSA9PT0gLTEsIFwiSU5URVJOQUwgRVJST1IgYWRkIGFscmVhZHkgYWRkZWQgbm9kZVwiKTtcbiAgLy8gaW52YXJpYW50T2JzZXJ2ZXJzKG9ic2VydmFibGUpO1xuICBvYnNlcnZhYmxlLm9ic2VydmVyc18uYWRkKG5vZGUpO1xuICBpZiAob2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlXyA+IG5vZGUuZGVwZW5kZW5jaWVzU3RhdGVfKSB7XG4gICAgb2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlXyA9IG5vZGUuZGVwZW5kZW5jaWVzU3RhdGVfO1xuICB9XG4gIC8vIGludmFyaWFudE9ic2VydmVycyhvYnNlcnZhYmxlKTtcbiAgLy8gaW52YXJpYW50KG9ic2VydmFibGUuX29ic2VydmVycy5pbmRleE9mKG5vZGUpICE9PSAtMSwgXCJJTlRFUk5BTCBFUlJPUiBkaWRuJ3QgYWRkIG5vZGVcIik7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU9ic2VydmVyKG9ic2VydmFibGUsIG5vZGUpIHtcbiAgLy8gaW52YXJpYW50KGdsb2JhbFN0YXRlLmluQmF0Y2ggPiAwLCBcIklOVEVSTkFMIEVSUk9SLCByZW1vdmUgc2hvdWxkIGJlIGNhbGxlZCBvbmx5IGluc2lkZSBiYXRjaFwiKTtcbiAgLy8gaW52YXJpYW50KG9ic2VydmFibGUuX29ic2VydmVycy5pbmRleE9mKG5vZGUpICE9PSAtMSwgXCJJTlRFUk5BTCBFUlJPUiByZW1vdmUgYWxyZWFkeSByZW1vdmVkIG5vZGVcIik7XG4gIC8vIGludmFyaWFudE9ic2VydmVycyhvYnNlcnZhYmxlKTtcbiAgb2JzZXJ2YWJsZS5vYnNlcnZlcnNfW1wiZGVsZXRlXCJdKG5vZGUpO1xuICBpZiAob2JzZXJ2YWJsZS5vYnNlcnZlcnNfLnNpemUgPT09IDApIHtcbiAgICAvLyBkZWxldGluZyBsYXN0IG9ic2VydmVyXG4gICAgcXVldWVGb3JVbm9ic2VydmF0aW9uKG9ic2VydmFibGUpO1xuICB9XG4gIC8vIGludmFyaWFudE9ic2VydmVycyhvYnNlcnZhYmxlKTtcbiAgLy8gaW52YXJpYW50KG9ic2VydmFibGUuX29ic2VydmVycy5pbmRleE9mKG5vZGUpID09PSAtMSwgXCJJTlRFUk5BTCBFUlJPUiByZW1vdmUgYWxyZWFkeSByZW1vdmVkIG5vZGUyXCIpO1xufVxuXG5mdW5jdGlvbiBxdWV1ZUZvclVub2JzZXJ2YXRpb24ob2JzZXJ2YWJsZSkge1xuICBpZiAob2JzZXJ2YWJsZS5pc1BlbmRpbmdVbm9ic2VydmF0aW9uXyA9PT0gZmFsc2UpIHtcbiAgICAvLyBpbnZhcmlhbnQob2JzZXJ2YWJsZS5fb2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCwgXCJJTlRFUk5BTCBFUlJPUiwgc2hvdWxkIG9ubHkgcXVldWUgZm9yIHVub2JzZXJ2YXRpb24gdW5vYnNlcnZlZCBvYnNlcnZhYmxlc1wiKTtcbiAgICBvYnNlcnZhYmxlLmlzUGVuZGluZ1Vub2JzZXJ2YXRpb25fID0gdHJ1ZTtcbiAgICBnbG9iYWxTdGF0ZS5wZW5kaW5nVW5vYnNlcnZhdGlvbnMucHVzaChvYnNlcnZhYmxlKTtcbiAgfVxufVxuLyoqXG4gKiBCYXRjaCBzdGFydHMgYSB0cmFuc2FjdGlvbiwgYXQgbGVhc3QgZm9yIHB1cnBvc2VzIG9mIG1lbW9pemluZyBDb21wdXRlZFZhbHVlcyB3aGVuIG5vdGhpbmcgZWxzZSBkb2VzLlxuICogRHVyaW5nIGEgYmF0Y2ggYG9uQmVjb21lVW5vYnNlcnZlZGAgd2lsbCBiZSBjYWxsZWQgYXQgbW9zdCBvbmNlIHBlciBvYnNlcnZhYmxlLlxuICogQXZvaWRzIHVubmVjZXNzYXJ5IHJlY2FsY3VsYXRpb25zLlxuICovXG5mdW5jdGlvbiBzdGFydEJhdGNoKCkge1xuICBnbG9iYWxTdGF0ZS5pbkJhdGNoKys7XG59XG5mdW5jdGlvbiBlbmRCYXRjaCgpIHtcbiAgaWYgKC0tZ2xvYmFsU3RhdGUuaW5CYXRjaCA9PT0gMCkge1xuICAgIHJ1blJlYWN0aW9ucygpO1xuICAgIC8vIHRoZSBiYXRjaCBpcyBhY3R1YWxseSBhYm91dCB0byBmaW5pc2gsIGFsbCB1bm9ic2VydmluZyBzaG91bGQgaGFwcGVuIGhlcmUuXG4gICAgdmFyIGxpc3QgPSBnbG9iYWxTdGF0ZS5wZW5kaW5nVW5vYnNlcnZhdGlvbnM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgb2JzZXJ2YWJsZSA9IGxpc3RbaV07XG4gICAgICBvYnNlcnZhYmxlLmlzUGVuZGluZ1Vub2JzZXJ2YXRpb25fID0gZmFsc2U7XG4gICAgICBpZiAob2JzZXJ2YWJsZS5vYnNlcnZlcnNfLnNpemUgPT09IDApIHtcbiAgICAgICAgaWYgKG9ic2VydmFibGUuaXNCZWluZ09ic2VydmVkXykge1xuICAgICAgICAgIC8vIGlmIHRoaXMgb2JzZXJ2YWJsZSBoYWQgcmVhY3RpdmUgb2JzZXJ2ZXJzLCB0cmlnZ2VyIHRoZSBob29rc1xuICAgICAgICAgIG9ic2VydmFibGUuaXNCZWluZ09ic2VydmVkXyA9IGZhbHNlO1xuICAgICAgICAgIG9ic2VydmFibGUub25CVU8oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob2JzZXJ2YWJsZSBpbnN0YW5jZW9mIENvbXB1dGVkVmFsdWUpIHtcbiAgICAgICAgICAvLyBjb21wdXRlZCB2YWx1ZXMgYXJlIGF1dG9tYXRpY2FsbHkgdGVhcmVkIGRvd24gd2hlbiB0aGUgbGFzdCBvYnNlcnZlciBsZWF2ZXNcbiAgICAgICAgICAvLyB0aGlzIHByb2Nlc3MgaGFwcGVucyByZWN1cnNpdmVseSwgdGhpcyBjb21wdXRlZCBtaWdodCBiZSB0aGUgbGFzdCBvYnNlcnZhYmUgb2YgYW5vdGhlciwgZXRjLi5cbiAgICAgICAgICBvYnNlcnZhYmxlLnN1c3BlbmRfKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZ2xvYmFsU3RhdGUucGVuZGluZ1Vub2JzZXJ2YXRpb25zID0gW107XG4gIH1cbn1cbmZ1bmN0aW9uIHJlcG9ydE9ic2VydmVkKG9ic2VydmFibGUpIHtcbiAgY2hlY2tJZlN0YXRlUmVhZHNBcmVBbGxvd2VkKG9ic2VydmFibGUpO1xuICB2YXIgZGVyaXZhdGlvbiA9IGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbjtcbiAgaWYgKGRlcml2YXRpb24gIT09IG51bGwpIHtcbiAgICAvKipcbiAgICAgKiBTaW1wbGUgb3B0aW1pemF0aW9uLCBnaXZlIGVhY2ggZGVyaXZhdGlvbiBydW4gYW4gdW5pcXVlIGlkIChydW5JZClcbiAgICAgKiBDaGVjayBpZiBsYXN0IHRpbWUgdGhpcyBvYnNlcnZhYmxlIHdhcyBhY2Nlc3NlZCB0aGUgc2FtZSBydW5JZCBpcyB1c2VkXG4gICAgICogaWYgdGhpcyBpcyB0aGUgY2FzZSwgdGhlIHJlbGF0aW9uIGlzIGFscmVhZHkga25vd25cbiAgICAgKi9cbiAgICBpZiAoZGVyaXZhdGlvbi5ydW5JZF8gIT09IG9ic2VydmFibGUubGFzdEFjY2Vzc2VkQnlfKSB7XG4gICAgICBvYnNlcnZhYmxlLmxhc3RBY2Nlc3NlZEJ5XyA9IGRlcml2YXRpb24ucnVuSWRfO1xuICAgICAgLy8gVHJpZWQgc3RvcmluZyBuZXdPYnNlcnZpbmcsIG9yIG9ic2VydmluZywgb3IgYm90aCBhcyBTZXQsIGJ1dCBwZXJmb3JtYW5jZSBkaWRuJ3QgY29tZSBjbG9zZS4uLlxuICAgICAgZGVyaXZhdGlvbi5uZXdPYnNlcnZpbmdfW2Rlcml2YXRpb24udW5ib3VuZERlcHNDb3VudF8rK10gPSBvYnNlcnZhYmxlO1xuICAgICAgaWYgKCFvYnNlcnZhYmxlLmlzQmVpbmdPYnNlcnZlZF8gJiYgZ2xvYmFsU3RhdGUudHJhY2tpbmdDb250ZXh0KSB7XG4gICAgICAgIG9ic2VydmFibGUuaXNCZWluZ09ic2VydmVkXyA9IHRydWU7XG4gICAgICAgIG9ic2VydmFibGUub25CTygpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JzZXJ2YWJsZS5pc0JlaW5nT2JzZXJ2ZWRfO1xuICB9IGVsc2UgaWYgKG9ic2VydmFibGUub2JzZXJ2ZXJzXy5zaXplID09PSAwICYmIGdsb2JhbFN0YXRlLmluQmF0Y2ggPiAwKSB7XG4gICAgcXVldWVGb3JVbm9ic2VydmF0aW9uKG9ic2VydmFibGUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbi8vIGZ1bmN0aW9uIGludmFyaWFudExPUyhvYnNlcnZhYmxlOiBJT2JzZXJ2YWJsZSwgbXNnOiBzdHJpbmcpIHtcbi8vICAgICAvLyBpdCdzIGV4cGVuc2l2ZSBzbyBiZXR0ZXIgbm90IHJ1biBpdCBpbiBwcm9kdWNpdG9uLiBidXQgdGVtcG9yYXJpbHkgaGVscGZ1bCBmb3IgdGVzdGluZ1xuLy8gICAgIGNvbnN0IG1pbiA9IGdldE9ic2VydmVycyhvYnNlcnZhYmxlKS5yZWR1Y2UoKGEsIGIpID0+IE1hdGgubWluKGEsIGIuZGVwZW5kZW5jaWVzU3RhdGUpLCAyKVxuLy8gICAgIGlmIChtaW4gPj0gb2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlKSByZXR1cm4gLy8gPC0gdGhlIG9ubHkgYXNzdW1wdGlvbiBhYm91dCBgbG93ZXN0T2JzZXJ2ZXJTdGF0ZWBcbi8vICAgICB0aHJvdyBuZXcgRXJyb3IoXG4vLyAgICAgICAgIFwibG93ZXN0T2JzZXJ2ZXJTdGF0ZSBpcyB3cm9uZyBmb3IgXCIgK1xuLy8gICAgICAgICAgICAgbXNnICtcbi8vICAgICAgICAgICAgIFwiIGJlY2F1c2UgXCIgK1xuLy8gICAgICAgICAgICAgbWluICtcbi8vICAgICAgICAgICAgIFwiIDwgXCIgK1xuLy8gICAgICAgICAgICAgb2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlXG4vLyAgICAgKVxuLy8gfVxuLyoqXG4gKiBOT1RFOiBjdXJyZW50IHByb3BhZ2F0aW9uIG1lY2hhbmlzbSB3aWxsIGluIGNhc2Ugb2Ygc2VsZiByZXJ1bmluZyBhdXRvcnVucyBiZWhhdmUgdW5leHBlY3RlZGx5XG4gKiBJdCB3aWxsIHByb3BhZ2F0ZSBjaGFuZ2VzIHRvIG9ic2VydmVycyBmcm9tIHByZXZpb3VzIHJ1blxuICogSXQncyBoYXJkIG9yIG1heWJlIGltcG9zc2libGUgKHdpdGggcmVhc29uYWJsZSBwZXJmKSB0byBnZXQgaXQgcmlnaHQgd2l0aCBjdXJyZW50IGFwcHJvYWNoXG4gKiBIb3BlZnVsbHkgc2VsZiByZXJ1bmluZyBhdXRvcnVucyBhcmVuJ3QgYSBmZWF0dXJlIHBlb3BsZSBzaG91bGQgZGVwZW5kIG9uXG4gKiBBbHNvIG1vc3QgYmFzaWMgdXNlIGNhc2VzIHNob3VsZCBiZSBva1xuICovXG4vLyBDYWxsZWQgYnkgQXRvbSB3aGVuIGl0cyB2YWx1ZSBjaGFuZ2VzXG5mdW5jdGlvbiBwcm9wYWdhdGVDaGFuZ2VkKG9ic2VydmFibGUpIHtcbiAgLy8gaW52YXJpYW50TE9TKG9ic2VydmFibGUsIFwiY2hhbmdlZCBzdGFydFwiKTtcbiAgaWYgKG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZV8gPT09IElEZXJpdmF0aW9uU3RhdGVfLlNUQUxFXykge1xuICAgIHJldHVybjtcbiAgfVxuICBvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uU1RBTEVfO1xuICAvLyBJZGVhbGx5IHdlIHVzZSBmb3IuLm9mIGhlcmUsIGJ1dCB0aGUgZG93bmNvbXBpbGVkIHZlcnNpb24gaXMgcmVhbGx5IHNsb3cuLi5cbiAgb2JzZXJ2YWJsZS5vYnNlcnZlcnNfLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICBpZiAoZC5kZXBlbmRlbmNpZXNTdGF0ZV8gPT09IElEZXJpdmF0aW9uU3RhdGVfLlVQX1RPX0RBVEVfKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGQuaXNUcmFjaW5nXyAhPT0gVHJhY2VNb2RlLk5PTkUpIHtcbiAgICAgICAgbG9nVHJhY2VJbmZvKGQsIG9ic2VydmFibGUpO1xuICAgICAgfVxuICAgICAgZC5vbkJlY29tZVN0YWxlXygpO1xuICAgIH1cbiAgICBkLmRlcGVuZGVuY2llc1N0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLlNUQUxFXztcbiAgfSk7XG4gIC8vIGludmFyaWFudExPUyhvYnNlcnZhYmxlLCBcImNoYW5nZWQgZW5kXCIpO1xufVxuLy8gQ2FsbGVkIGJ5IENvbXB1dGVkVmFsdWUgd2hlbiBpdCByZWNhbGN1bGF0ZSBhbmQgaXRzIHZhbHVlIGNoYW5nZWRcbmZ1bmN0aW9uIHByb3BhZ2F0ZUNoYW5nZUNvbmZpcm1lZChvYnNlcnZhYmxlKSB7XG4gIC8vIGludmFyaWFudExPUyhvYnNlcnZhYmxlLCBcImNvbmZpcm1lZCBzdGFydFwiKTtcbiAgaWYgKG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZV8gPT09IElEZXJpdmF0aW9uU3RhdGVfLlNUQUxFXykge1xuICAgIHJldHVybjtcbiAgfVxuICBvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGVfID0gSURlcml2YXRpb25TdGF0ZV8uU1RBTEVfO1xuICBvYnNlcnZhYmxlLm9ic2VydmVyc18uZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgIGlmIChkLmRlcGVuZGVuY2llc1N0YXRlXyA9PT0gSURlcml2YXRpb25TdGF0ZV8uUE9TU0lCTFlfU1RBTEVfKSB7XG4gICAgICBkLmRlcGVuZGVuY2llc1N0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLlNUQUxFXztcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgZC5pc1RyYWNpbmdfICE9PSBUcmFjZU1vZGUuTk9ORSkge1xuICAgICAgICBsb2dUcmFjZUluZm8oZCwgb2JzZXJ2YWJsZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkLmRlcGVuZGVuY2llc1N0YXRlXyA9PT0gSURlcml2YXRpb25TdGF0ZV8uVVBfVE9fREFURV8gLy8gdGhpcyBoYXBwZW5zIGR1cmluZyBjb21wdXRpbmcgb2YgYGRgLCBqdXN0IGtlZXAgbG93ZXN0T2JzZXJ2ZXJTdGF0ZSB1cCB0byBkYXRlLlxuICAgICkge1xuICAgICAgb2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLlVQX1RPX0RBVEVfO1xuICAgIH1cbiAgfSk7XG4gIC8vIGludmFyaWFudExPUyhvYnNlcnZhYmxlLCBcImNvbmZpcm1lZCBlbmRcIik7XG59XG4vLyBVc2VkIGJ5IGNvbXB1dGVkIHdoZW4gaXRzIGRlcGVuZGVuY3kgY2hhbmdlZCwgYnV0IHdlIGRvbid0IHdhbid0IHRvIGltbWVkaWF0ZWx5IHJlY29tcHV0ZS5cbmZ1bmN0aW9uIHByb3BhZ2F0ZU1heWJlQ2hhbmdlZChvYnNlcnZhYmxlKSB7XG4gIC8vIGludmFyaWFudExPUyhvYnNlcnZhYmxlLCBcIm1heWJlIHN0YXJ0XCIpO1xuICBpZiAob2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlXyAhPT0gSURlcml2YXRpb25TdGF0ZV8uVVBfVE9fREFURV8pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgb2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLlBPU1NJQkxZX1NUQUxFXztcbiAgb2JzZXJ2YWJsZS5vYnNlcnZlcnNfLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICBpZiAoZC5kZXBlbmRlbmNpZXNTdGF0ZV8gPT09IElEZXJpdmF0aW9uU3RhdGVfLlVQX1RPX0RBVEVfKSB7XG4gICAgICBkLmRlcGVuZGVuY2llc1N0YXRlXyA9IElEZXJpdmF0aW9uU3RhdGVfLlBPU1NJQkxZX1NUQUxFXztcbiAgICAgIGQub25CZWNvbWVTdGFsZV8oKTtcbiAgICB9XG4gIH0pO1xuICAvLyBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZSwgXCJtYXliZSBlbmRcIik7XG59XG5cbmZ1bmN0aW9uIGxvZ1RyYWNlSW5mbyhkZXJpdmF0aW9uLCBvYnNlcnZhYmxlKSB7XG4gIGNvbnNvbGUubG9nKFwiW21vYngudHJhY2VdICdcIiArIGRlcml2YXRpb24ubmFtZV8gKyBcIicgaXMgaW52YWxpZGF0ZWQgZHVlIHRvIGEgY2hhbmdlIGluOiAnXCIgKyBvYnNlcnZhYmxlLm5hbWVfICsgXCInXCIpO1xuICBpZiAoZGVyaXZhdGlvbi5pc1RyYWNpbmdfID09PSBUcmFjZU1vZGUuQlJFQUspIHtcbiAgICB2YXIgbGluZXMgPSBbXTtcbiAgICBwcmludERlcFRyZWUoZ2V0RGVwZW5kZW5jeVRyZWUoZGVyaXZhdGlvbiksIGxpbmVzLCAxKTtcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICBuZXcgRnVuY3Rpb24oXCJkZWJ1Z2dlcjtcXG4vKlxcblRyYWNpbmcgJ1wiICsgZGVyaXZhdGlvbi5uYW1lXyArIFwiJ1xcblxcbllvdSBhcmUgZW50ZXJpbmcgdGhpcyBicmVhayBwb2ludCBiZWNhdXNlIGRlcml2YXRpb24gJ1wiICsgZGVyaXZhdGlvbi5uYW1lXyArIFwiJyBpcyBiZWluZyB0cmFjZWQgYW5kICdcIiArIG9ic2VydmFibGUubmFtZV8gKyBcIicgaXMgbm93IGZvcmNpbmcgaXQgdG8gdXBkYXRlLlxcbkp1c3QgZm9sbG93IHRoZSBzdGFja3RyYWNlIHlvdSBzaG91bGQgbm93IHNlZSBpbiB0aGUgZGV2dG9vbHMgdG8gc2VlIHByZWNpc2VseSB3aGF0IHBpZWNlIG9mIHlvdXIgY29kZSBpcyBjYXVzaW5nIHRoaXMgdXBkYXRlXFxuVGhlIHN0YWNrZnJhbWUgeW91IGFyZSBsb29raW5nIGZvciBpcyBhdCBsZWFzdCB+Ni04IHN0YWNrLWZyYW1lcyB1cC5cXG5cXG5cIiArIChkZXJpdmF0aW9uIGluc3RhbmNlb2YgQ29tcHV0ZWRWYWx1ZSA/IGRlcml2YXRpb24uZGVyaXZhdGlvbi50b1N0cmluZygpLnJlcGxhY2UoL1sqXVxcLy9nLCBcIi9cIikgOiBcIlwiKSArIFwiXFxuXFxuVGhlIGRlcGVuZGVuY2llcyBmb3IgdGhpcyBkZXJpdmF0aW9uIGFyZTpcXG5cXG5cIiArIGxpbmVzLmpvaW4oXCJcXG5cIikgKyBcIlxcbiovXFxuICAgIFwiKSgpO1xuICB9XG59XG5mdW5jdGlvbiBwcmludERlcFRyZWUodHJlZSwgbGluZXMsIGRlcHRoKSB7XG4gIGlmIChsaW5lcy5sZW5ndGggPj0gMTAwMCkge1xuICAgIGxpbmVzLnB1c2goXCIoYW5kIG1hbnkgbW9yZSlcIik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxpbmVzLnB1c2goXCJcIiArIFwiXFx0XCIucmVwZWF0KGRlcHRoIC0gMSkgKyB0cmVlLm5hbWUpO1xuICBpZiAodHJlZS5kZXBlbmRlbmNpZXMpIHtcbiAgICB0cmVlLmRlcGVuZGVuY2llcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgcmV0dXJuIHByaW50RGVwVHJlZShjaGlsZCwgbGluZXMsIGRlcHRoICsgMSk7XG4gICAgfSk7XG4gIH1cbn1cblxudmFyIFJlYWN0aW9uID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLy8gbm9kZXMgd2UgYXJlIGxvb2tpbmcgYXQuIE91ciB2YWx1ZSBkZXBlbmRzIG9uIHRoZXNlIG5vZGVzXG5cbiAgZnVuY3Rpb24gUmVhY3Rpb24obmFtZV8sIG9uSW52YWxpZGF0ZV8sIGVycm9ySGFuZGxlcl8sIHJlcXVpcmVzT2JzZXJ2YWJsZV8pIHtcbiAgICBpZiAobmFtZV8gPT09IHZvaWQgMCkge1xuICAgICAgbmFtZV8gPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcIlJlYWN0aW9uQFwiICsgZ2V0TmV4dElkKCkgOiBcIlJlYWN0aW9uXCI7XG4gICAgfVxuICAgIHRoaXMubmFtZV8gPSB2b2lkIDA7XG4gICAgdGhpcy5vbkludmFsaWRhdGVfID0gdm9pZCAwO1xuICAgIHRoaXMuZXJyb3JIYW5kbGVyXyA9IHZvaWQgMDtcbiAgICB0aGlzLnJlcXVpcmVzT2JzZXJ2YWJsZV8gPSB2b2lkIDA7XG4gICAgdGhpcy5vYnNlcnZpbmdfID0gW107XG4gICAgdGhpcy5uZXdPYnNlcnZpbmdfID0gW107XG4gICAgdGhpcy5kZXBlbmRlbmNpZXNTdGF0ZV8gPSBJRGVyaXZhdGlvblN0YXRlXy5OT1RfVFJBQ0tJTkdfO1xuICAgIHRoaXMuZGlmZlZhbHVlXyA9IDA7XG4gICAgdGhpcy5ydW5JZF8gPSAwO1xuICAgIHRoaXMudW5ib3VuZERlcHNDb3VudF8gPSAwO1xuICAgIHRoaXMuaXNEaXNwb3NlZF8gPSBmYWxzZTtcbiAgICB0aGlzLmlzU2NoZWR1bGVkXyA9IGZhbHNlO1xuICAgIHRoaXMuaXNUcmFja1BlbmRpbmdfID0gZmFsc2U7XG4gICAgdGhpcy5pc1J1bm5pbmdfID0gZmFsc2U7XG4gICAgdGhpcy5pc1RyYWNpbmdfID0gVHJhY2VNb2RlLk5PTkU7XG4gICAgdGhpcy5uYW1lXyA9IG5hbWVfO1xuICAgIHRoaXMub25JbnZhbGlkYXRlXyA9IG9uSW52YWxpZGF0ZV87XG4gICAgdGhpcy5lcnJvckhhbmRsZXJfID0gZXJyb3JIYW5kbGVyXztcbiAgICB0aGlzLnJlcXVpcmVzT2JzZXJ2YWJsZV8gPSByZXF1aXJlc09ic2VydmFibGVfO1xuICB9XG4gIHZhciBfcHJvdG8gPSBSZWFjdGlvbi5wcm90b3R5cGU7XG4gIF9wcm90by5vbkJlY29tZVN0YWxlXyA9IGZ1bmN0aW9uIG9uQmVjb21lU3RhbGVfKCkge1xuICAgIHRoaXMuc2NoZWR1bGVfKCk7XG4gIH07XG4gIF9wcm90by5zY2hlZHVsZV8gPSBmdW5jdGlvbiBzY2hlZHVsZV8oKSB7XG4gICAgaWYgKCF0aGlzLmlzU2NoZWR1bGVkXykge1xuICAgICAgdGhpcy5pc1NjaGVkdWxlZF8gPSB0cnVlO1xuICAgICAgZ2xvYmFsU3RhdGUucGVuZGluZ1JlYWN0aW9ucy5wdXNoKHRoaXMpO1xuICAgICAgcnVuUmVhY3Rpb25zKCk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uaXNTY2hlZHVsZWQgPSBmdW5jdGlvbiBpc1NjaGVkdWxlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1NjaGVkdWxlZF87XG4gIH1cbiAgLyoqXG4gICAqIGludGVybmFsLCB1c2Ugc2NoZWR1bGUoKSBpZiB5b3UgaW50ZW5kIHRvIGtpY2sgb2ZmIGEgcmVhY3Rpb25cbiAgICovO1xuICBfcHJvdG8ucnVuUmVhY3Rpb25fID0gZnVuY3Rpb24gcnVuUmVhY3Rpb25fKCkge1xuICAgIGlmICghdGhpcy5pc0Rpc3Bvc2VkXykge1xuICAgICAgc3RhcnRCYXRjaCgpO1xuICAgICAgdGhpcy5pc1NjaGVkdWxlZF8gPSBmYWxzZTtcbiAgICAgIHZhciBwcmV2ID0gZ2xvYmFsU3RhdGUudHJhY2tpbmdDb250ZXh0O1xuICAgICAgZ2xvYmFsU3RhdGUudHJhY2tpbmdDb250ZXh0ID0gdGhpcztcbiAgICAgIGlmIChzaG91bGRDb21wdXRlKHRoaXMpKSB7XG4gICAgICAgIHRoaXMuaXNUcmFja1BlbmRpbmdfID0gdHJ1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLm9uSW52YWxpZGF0ZV8oKTtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIHRoaXMuaXNUcmFja1BlbmRpbmdfICYmIGlzU3B5RW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAvLyBvbkludmFsaWRhdGUgZGlkbid0IHRyaWdnZXIgdHJhY2sgcmlnaHQgYXdheS4uXG4gICAgICAgICAgICBzcHlSZXBvcnQoe1xuICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgICAgICAgICB0eXBlOiBcInNjaGVkdWxlZC1yZWFjdGlvblwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aGlzLnJlcG9ydEV4Y2VwdGlvbkluRGVyaXZhdGlvbl8oZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGdsb2JhbFN0YXRlLnRyYWNraW5nQ29udGV4dCA9IHByZXY7XG4gICAgICBlbmRCYXRjaCgpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnRyYWNrID0gZnVuY3Rpb24gdHJhY2soZm4pIHtcbiAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkXykge1xuICAgICAgcmV0dXJuO1xuICAgICAgLy8gY29uc29sZS53YXJuKFwiUmVhY3Rpb24gYWxyZWFkeSBkaXNwb3NlZFwiKSAvLyBOb3RlOiBOb3QgYSB3YXJuaW5nIC8gZXJyb3IgaW4gbW9ieCA0IGVpdGhlclxuICAgIH1cblxuICAgIHN0YXJ0QmF0Y2goKTtcbiAgICB2YXIgbm90aWZ5ID0gaXNTcHlFbmFibGVkKCk7XG4gICAgdmFyIHN0YXJ0VGltZTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeSkge1xuICAgICAgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgIHNweVJlcG9ydFN0YXJ0KHtcbiAgICAgICAgbmFtZTogdGhpcy5uYW1lXyxcbiAgICAgICAgdHlwZTogXCJyZWFjdGlvblwiXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5pc1J1bm5pbmdfID0gdHJ1ZTtcbiAgICB2YXIgcHJldlJlYWN0aW9uID0gZ2xvYmFsU3RhdGUudHJhY2tpbmdDb250ZXh0OyAvLyByZWFjdGlvbnMgY291bGQgY3JlYXRlIHJlYWN0aW9ucy4uLlxuICAgIGdsb2JhbFN0YXRlLnRyYWNraW5nQ29udGV4dCA9IHRoaXM7XG4gICAgdmFyIHJlc3VsdCA9IHRyYWNrRGVyaXZlZEZ1bmN0aW9uKHRoaXMsIGZuLCB1bmRlZmluZWQpO1xuICAgIGdsb2JhbFN0YXRlLnRyYWNraW5nQ29udGV4dCA9IHByZXZSZWFjdGlvbjtcbiAgICB0aGlzLmlzUnVubmluZ18gPSBmYWxzZTtcbiAgICB0aGlzLmlzVHJhY2tQZW5kaW5nXyA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmlzRGlzcG9zZWRfKSB7XG4gICAgICAvLyBkaXNwb3NlZCBkdXJpbmcgbGFzdCBydW4uIENsZWFuIHVwIGV2ZXJ5dGhpbmcgdGhhdCB3YXMgYm91bmQgYWZ0ZXIgdGhlIGRpc3Bvc2UgY2FsbC5cbiAgICAgIGNsZWFyT2JzZXJ2aW5nKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoaXNDYXVnaHRFeGNlcHRpb24ocmVzdWx0KSkge1xuICAgICAgdGhpcy5yZXBvcnRFeGNlcHRpb25JbkRlcml2YXRpb25fKHJlc3VsdC5jYXVzZSk7XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5KSB7XG4gICAgICBzcHlSZXBvcnRFbmQoe1xuICAgICAgICB0aW1lOiBEYXRlLm5vdygpIC0gc3RhcnRUaW1lXG4gICAgICB9KTtcbiAgICB9XG4gICAgZW5kQmF0Y2goKTtcbiAgfTtcbiAgX3Byb3RvLnJlcG9ydEV4Y2VwdGlvbkluRGVyaXZhdGlvbl8gPSBmdW5jdGlvbiByZXBvcnRFeGNlcHRpb25JbkRlcml2YXRpb25fKGVycm9yKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBpZiAodGhpcy5lcnJvckhhbmRsZXJfKSB7XG4gICAgICB0aGlzLmVycm9ySGFuZGxlcl8oZXJyb3IsIHRoaXMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZ2xvYmFsU3RhdGUuZGlzYWJsZUVycm9yQm91bmRhcmllcykge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIHZhciBtZXNzYWdlID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJbbW9ieF0gRW5jb3VudGVyZWQgYW4gdW5jYXVnaHQgZXhjZXB0aW9uIHRoYXQgd2FzIHRocm93biBieSBhIHJlYWN0aW9uIG9yIG9ic2VydmVyIGNvbXBvbmVudCwgaW46ICdcIiArIHRoaXMgKyBcIidcIiA6IFwiW21vYnhdIHVuY2F1Z2h0IGVycm9yIGluICdcIiArIHRoaXMgKyBcIidcIjtcbiAgICBpZiAoIWdsb2JhbFN0YXRlLnN1cHByZXNzUmVhY3Rpb25FcnJvcnMpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgZXJyb3IpO1xuICAgICAgLyoqIElmIGRlYnVnZ2luZyBicm91Z2h0IHlvdSBoZXJlLCBwbGVhc2UsIHJlYWQgdGhlIGFib3ZlIG1lc3NhZ2UgOi0pLiBUbnghICovXG4gICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlttb2J4XSAoZXJyb3IgaW4gcmVhY3Rpb24gJ1wiICsgdGhpcy5uYW1lXyArIFwiJyBzdXBwcmVzc2VkLCBmaXggZXJyb3Igb2YgY2F1c2luZyBhY3Rpb24gYmVsb3cpXCIpO1xuICAgIH0gLy8gcHJldHRpZXItaWdub3JlXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBpc1NweUVuYWJsZWQoKSkge1xuICAgICAgc3B5UmVwb3J0KHtcbiAgICAgICAgdHlwZTogXCJlcnJvclwiLFxuICAgICAgICBuYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICBlcnJvcjogXCJcIiArIGVycm9yXG4gICAgICB9KTtcbiAgICB9XG4gICAgZ2xvYmFsU3RhdGUuZ2xvYmFsUmVhY3Rpb25FcnJvckhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiBmKGVycm9yLCBfdGhpcyk7XG4gICAgfSk7XG4gIH07XG4gIF9wcm90by5kaXNwb3NlID0gZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICBpZiAoIXRoaXMuaXNEaXNwb3NlZF8pIHtcbiAgICAgIHRoaXMuaXNEaXNwb3NlZF8gPSB0cnVlO1xuICAgICAgaWYgKCF0aGlzLmlzUnVubmluZ18pIHtcbiAgICAgICAgLy8gaWYgZGlzcG9zZWQgd2hpbGUgcnVubmluZywgY2xlYW4gdXAgbGF0ZXIuIE1heWJlIG5vdCBvcHRpbWFsLCBidXQgcmFyZSBjYXNlXG4gICAgICAgIHN0YXJ0QmF0Y2goKTtcbiAgICAgICAgY2xlYXJPYnNlcnZpbmcodGhpcyk7XG4gICAgICAgIGVuZEJhdGNoKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBfcHJvdG8uZ2V0RGlzcG9zZXJfID0gZnVuY3Rpb24gZ2V0RGlzcG9zZXJfKGFib3J0U2lnbmFsKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG4gICAgdmFyIGRpc3Bvc2UgPSBmdW5jdGlvbiBkaXNwb3NlKCkge1xuICAgICAgX3RoaXMyLmRpc3Bvc2UoKTtcbiAgICAgIGFib3J0U2lnbmFsID09IG51bGwgPyB2b2lkIDAgOiBhYm9ydFNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyID09IG51bGwgPyB2b2lkIDAgOiBhYm9ydFNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgZGlzcG9zZSk7XG4gICAgfTtcbiAgICBhYm9ydFNpZ25hbCA9PSBudWxsID8gdm9pZCAwIDogYWJvcnRTaWduYWwuYWRkRXZlbnRMaXN0ZW5lciA9PSBudWxsID8gdm9pZCAwIDogYWJvcnRTaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGRpc3Bvc2UpO1xuICAgIGRpc3Bvc2VbJG1vYnhdID0gdGhpcztcbiAgICByZXR1cm4gZGlzcG9zZTtcbiAgfTtcbiAgX3Byb3RvLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIFwiUmVhY3Rpb25bXCIgKyB0aGlzLm5hbWVfICsgXCJdXCI7XG4gIH07XG4gIF9wcm90by50cmFjZSA9IGZ1bmN0aW9uIHRyYWNlJDEoZW50ZXJCcmVha1BvaW50KSB7XG4gICAgaWYgKGVudGVyQnJlYWtQb2ludCA9PT0gdm9pZCAwKSB7XG4gICAgICBlbnRlckJyZWFrUG9pbnQgPSBmYWxzZTtcbiAgICB9XG4gICAgdHJhY2UodGhpcywgZW50ZXJCcmVha1BvaW50KTtcbiAgfTtcbiAgcmV0dXJuIFJlYWN0aW9uO1xufSgpO1xuZnVuY3Rpb24gb25SZWFjdGlvbkVycm9yKGhhbmRsZXIpIHtcbiAgZ2xvYmFsU3RhdGUuZ2xvYmFsUmVhY3Rpb25FcnJvckhhbmRsZXJzLnB1c2goaGFuZGxlcik7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlkeCA9IGdsb2JhbFN0YXRlLmdsb2JhbFJlYWN0aW9uRXJyb3JIYW5kbGVycy5pbmRleE9mKGhhbmRsZXIpO1xuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgZ2xvYmFsU3RhdGUuZ2xvYmFsUmVhY3Rpb25FcnJvckhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgfTtcbn1cbi8qKlxuICogTWFnaWMgbnVtYmVyIGFsZXJ0IVxuICogRGVmaW5lcyB3aXRoaW4gaG93IG1hbnkgdGltZXMgYSByZWFjdGlvbiBpcyBhbGxvd2VkIHRvIHJlLXRyaWdnZXIgaXRzZWxmXG4gKiB1bnRpbCBpdCBpcyBhc3N1bWVkIHRoYXQgdGhpcyBpcyBnb25uYSBiZSBhIG5ldmVyIGVuZGluZyBsb29wLi4uXG4gKi9cbnZhciBNQVhfUkVBQ1RJT05fSVRFUkFUSU9OUyA9IDEwMDtcbnZhciByZWFjdGlvblNjaGVkdWxlciA9IGZ1bmN0aW9uIHJlYWN0aW9uU2NoZWR1bGVyKGYpIHtcbiAgcmV0dXJuIGYoKTtcbn07XG5mdW5jdGlvbiBydW5SZWFjdGlvbnMoKSB7XG4gIC8vIFRyYW1wb2xpbmluZywgaWYgcnVuUmVhY3Rpb25zIGFyZSBhbHJlYWR5IHJ1bm5pbmcsIG5ldyByZWFjdGlvbnMgd2lsbCBiZSBwaWNrZWQgdXBcbiAgaWYgKGdsb2JhbFN0YXRlLmluQmF0Y2ggPiAwIHx8IGdsb2JhbFN0YXRlLmlzUnVubmluZ1JlYWN0aW9ucykge1xuICAgIHJldHVybjtcbiAgfVxuICByZWFjdGlvblNjaGVkdWxlcihydW5SZWFjdGlvbnNIZWxwZXIpO1xufVxuZnVuY3Rpb24gcnVuUmVhY3Rpb25zSGVscGVyKCkge1xuICBnbG9iYWxTdGF0ZS5pc1J1bm5pbmdSZWFjdGlvbnMgPSB0cnVlO1xuICB2YXIgYWxsUmVhY3Rpb25zID0gZ2xvYmFsU3RhdGUucGVuZGluZ1JlYWN0aW9ucztcbiAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAvLyBXaGlsZSBydW5uaW5nIHJlYWN0aW9ucywgbmV3IHJlYWN0aW9ucyBtaWdodCBiZSB0cmlnZ2VyZWQuXG4gIC8vIEhlbmNlIHdlIHdvcmsgd2l0aCB0d28gdmFyaWFibGVzIGFuZCBjaGVjayB3aGV0aGVyXG4gIC8vIHdlIGNvbnZlcmdlIHRvIG5vIHJlbWFpbmluZyByZWFjdGlvbnMgYWZ0ZXIgYSB3aGlsZS5cbiAgd2hpbGUgKGFsbFJlYWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgaWYgKCsraXRlcmF0aW9ucyA9PT0gTUFYX1JFQUNUSU9OX0lURVJBVElPTlMpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJSZWFjdGlvbiBkb2Vzbid0IGNvbnZlcmdlIHRvIGEgc3RhYmxlIHN0YXRlIGFmdGVyIFwiICsgTUFYX1JFQUNUSU9OX0lURVJBVElPTlMgKyBcIiBpdGVyYXRpb25zLlwiICsgKFwiIFByb2JhYmx5IHRoZXJlIGlzIGEgY3ljbGUgaW4gdGhlIHJlYWN0aXZlIGZ1bmN0aW9uOiBcIiArIGFsbFJlYWN0aW9uc1swXSkgOiBcIlttb2J4XSBjeWNsZSBpbiByZWFjdGlvbjogXCIgKyBhbGxSZWFjdGlvbnNbMF0pO1xuICAgICAgYWxsUmVhY3Rpb25zLnNwbGljZSgwKTsgLy8gY2xlYXIgcmVhY3Rpb25zXG4gICAgfVxuXG4gICAgdmFyIHJlbWFpbmluZ1JlYWN0aW9ucyA9IGFsbFJlYWN0aW9ucy5zcGxpY2UoMCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSByZW1haW5pbmdSZWFjdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICByZW1haW5pbmdSZWFjdGlvbnNbaV0ucnVuUmVhY3Rpb25fKCk7XG4gICAgfVxuICB9XG4gIGdsb2JhbFN0YXRlLmlzUnVubmluZ1JlYWN0aW9ucyA9IGZhbHNlO1xufVxudmFyIGlzUmVhY3Rpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZShcIlJlYWN0aW9uXCIsIFJlYWN0aW9uKTtcbmZ1bmN0aW9uIHNldFJlYWN0aW9uU2NoZWR1bGVyKGZuKSB7XG4gIHZhciBiYXNlU2NoZWR1bGVyID0gcmVhY3Rpb25TY2hlZHVsZXI7XG4gIHJlYWN0aW9uU2NoZWR1bGVyID0gZnVuY3Rpb24gcmVhY3Rpb25TY2hlZHVsZXIoZikge1xuICAgIHJldHVybiBmbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYmFzZVNjaGVkdWxlcihmKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNTcHlFbmFibGVkKCkge1xuICByZXR1cm4gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICEhZ2xvYmFsU3RhdGUuc3B5TGlzdGVuZXJzLmxlbmd0aDtcbn1cbmZ1bmN0aW9uIHNweVJlcG9ydChldmVudCkge1xuICBpZiAoIShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpKSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIGRlYWQgY29kZSBlbGltaW5hdGlvbiBjYW4gZG8gdGhlIHJlc3RcbiAgaWYgKCFnbG9iYWxTdGF0ZS5zcHlMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsaXN0ZW5lcnMgPSBnbG9iYWxTdGF0ZS5zcHlMaXN0ZW5lcnM7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGxpc3RlbmVyc1tpXShldmVudCk7XG4gIH1cbn1cbmZ1bmN0aW9uIHNweVJlcG9ydFN0YXJ0KGV2ZW50KSB7XG4gIGlmICghKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGNoYW5nZSA9IF9leHRlbmRzKHt9LCBldmVudCwge1xuICAgIHNweVJlcG9ydFN0YXJ0OiB0cnVlXG4gIH0pO1xuICBzcHlSZXBvcnQoY2hhbmdlKTtcbn1cbnZhciBFTkRfRVZFTlQgPSB7XG4gIHR5cGU6IFwicmVwb3J0LWVuZFwiLFxuICBzcHlSZXBvcnRFbmQ6IHRydWVcbn07XG5mdW5jdGlvbiBzcHlSZXBvcnRFbmQoY2hhbmdlKSB7XG4gIGlmICghKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNoYW5nZSkge1xuICAgIHNweVJlcG9ydChfZXh0ZW5kcyh7fSwgY2hhbmdlLCB7XG4gICAgICB0eXBlOiBcInJlcG9ydC1lbmRcIixcbiAgICAgIHNweVJlcG9ydEVuZDogdHJ1ZVxuICAgIH0pKTtcbiAgfSBlbHNlIHtcbiAgICBzcHlSZXBvcnQoRU5EX0VWRU5UKTtcbiAgfVxufVxuZnVuY3Rpb24gc3B5KGxpc3RlbmVyKSB7XG4gIGlmICghKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICBjb25zb2xlLndhcm4oXCJbbW9ieC5zcHldIElzIGEgbm8tb3AgaW4gcHJvZHVjdGlvbiBidWlsZHNcIik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuICB9IGVsc2Uge1xuICAgIGdsb2JhbFN0YXRlLnNweUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICByZXR1cm4gb25jZShmdW5jdGlvbiAoKSB7XG4gICAgICBnbG9iYWxTdGF0ZS5zcHlMaXN0ZW5lcnMgPSBnbG9iYWxTdGF0ZS5zcHlMaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChsKSB7XG4gICAgICAgIHJldHVybiBsICE9PSBsaXN0ZW5lcjtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbnZhciBBQ1RJT04gPSBcImFjdGlvblwiO1xudmFyIEFDVElPTl9CT1VORCA9IFwiYWN0aW9uLmJvdW5kXCI7XG52YXIgQVVUT0FDVElPTiA9IFwiYXV0b0FjdGlvblwiO1xudmFyIEFVVE9BQ1RJT05fQk9VTkQgPSBcImF1dG9BY3Rpb24uYm91bmRcIjtcbnZhciBERUZBVUxUX0FDVElPTl9OQU1FID0gXCI8dW5uYW1lZCBhY3Rpb24+XCI7XG52YXIgYWN0aW9uQW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVBY3Rpb25Bbm5vdGF0aW9uKEFDVElPTik7XG52YXIgYWN0aW9uQm91bmRBbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUFjdGlvbkFubm90YXRpb24oQUNUSU9OX0JPVU5ELCB7XG4gIGJvdW5kOiB0cnVlXG59KTtcbnZhciBhdXRvQWN0aW9uQW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVBY3Rpb25Bbm5vdGF0aW9uKEFVVE9BQ1RJT04sIHtcbiAgYXV0b0FjdGlvbjogdHJ1ZVxufSk7XG52YXIgYXV0b0FjdGlvbkJvdW5kQW5ub3RhdGlvbiA9IC8qI19fUFVSRV9fKi9jcmVhdGVBY3Rpb25Bbm5vdGF0aW9uKEFVVE9BQ1RJT05fQk9VTkQsIHtcbiAgYXV0b0FjdGlvbjogdHJ1ZSxcbiAgYm91bmQ6IHRydWVcbn0pO1xuZnVuY3Rpb24gY3JlYXRlQWN0aW9uRmFjdG9yeShhdXRvQWN0aW9uKSB7XG4gIHZhciByZXMgPSBmdW5jdGlvbiBhY3Rpb24oYXJnMSwgYXJnMikge1xuICAgIC8vIGFjdGlvbihmbigpIHt9KVxuICAgIGlmIChpc0Z1bmN0aW9uKGFyZzEpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQWN0aW9uKGFyZzEubmFtZSB8fCBERUZBVUxUX0FDVElPTl9OQU1FLCBhcmcxLCBhdXRvQWN0aW9uKTtcbiAgICB9XG4gICAgLy8gYWN0aW9uKFwibmFtZVwiLCBmbigpIHt9KVxuICAgIGlmIChpc0Z1bmN0aW9uKGFyZzIpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQWN0aW9uKGFyZzEsIGFyZzIsIGF1dG9BY3Rpb24pO1xuICAgIH1cbiAgICAvLyBAYWN0aW9uICgyMDIyLjMgRGVjb3JhdG9ycylcbiAgICBpZiAoaXMyMDIyM0RlY29yYXRvcihhcmcyKSkge1xuICAgICAgcmV0dXJuIChhdXRvQWN0aW9uID8gYXV0b0FjdGlvbkFubm90YXRpb24gOiBhY3Rpb25Bbm5vdGF0aW9uKS5kZWNvcmF0ZV8yMDIyM18oYXJnMSwgYXJnMik7XG4gICAgfVxuICAgIC8vIEBhY3Rpb25cbiAgICBpZiAoaXNTdHJpbmdpc2goYXJnMikpIHtcbiAgICAgIHJldHVybiBzdG9yZUFubm90YXRpb24oYXJnMSwgYXJnMiwgYXV0b0FjdGlvbiA/IGF1dG9BY3Rpb25Bbm5vdGF0aW9uIDogYWN0aW9uQW5ub3RhdGlvbik7XG4gICAgfVxuICAgIC8vIGFjdGlvbihcIm5hbWVcIikgJiBAYWN0aW9uKFwibmFtZVwiKVxuICAgIGlmIChpc1N0cmluZ2lzaChhcmcxKSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZURlY29yYXRvckFubm90YXRpb24oY3JlYXRlQWN0aW9uQW5ub3RhdGlvbihhdXRvQWN0aW9uID8gQVVUT0FDVElPTiA6IEFDVElPTiwge1xuICAgICAgICBuYW1lOiBhcmcxLFxuICAgICAgICBhdXRvQWN0aW9uOiBhdXRvQWN0aW9uXG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgIGRpZShcIkludmFsaWQgYXJndW1lbnRzIGZvciBgYWN0aW9uYFwiKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiByZXM7XG59XG52YXIgYWN0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUFjdGlvbkZhY3RvcnkoZmFsc2UpO1xuT2JqZWN0LmFzc2lnbihhY3Rpb24sIGFjdGlvbkFubm90YXRpb24pO1xudmFyIGF1dG9BY3Rpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlQWN0aW9uRmFjdG9yeSh0cnVlKTtcbk9iamVjdC5hc3NpZ24oYXV0b0FjdGlvbiwgYXV0b0FjdGlvbkFubm90YXRpb24pO1xuYWN0aW9uLmJvdW5kID0gLyojX19QVVJFX18qL2NyZWF0ZURlY29yYXRvckFubm90YXRpb24oYWN0aW9uQm91bmRBbm5vdGF0aW9uKTtcbmF1dG9BY3Rpb24uYm91bmQgPSAvKiNfX1BVUkVfXyovY3JlYXRlRGVjb3JhdG9yQW5ub3RhdGlvbihhdXRvQWN0aW9uQm91bmRBbm5vdGF0aW9uKTtcbmZ1bmN0aW9uIHJ1bkluQWN0aW9uKGZuKSB7XG4gIHJldHVybiBleGVjdXRlQWN0aW9uKGZuLm5hbWUgfHwgREVGQVVMVF9BQ1RJT05fTkFNRSwgZmFsc2UsIGZuLCB0aGlzLCB1bmRlZmluZWQpO1xufVxuZnVuY3Rpb24gaXNBY3Rpb24odGhpbmcpIHtcbiAgcmV0dXJuIGlzRnVuY3Rpb24odGhpbmcpICYmIHRoaW5nLmlzTW9ieEFjdGlvbiA9PT0gdHJ1ZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmFtZWQgcmVhY3RpdmUgdmlldyBhbmQga2VlcHMgaXQgYWxpdmUsIHNvIHRoYXQgdGhlIHZpZXcgaXMgYWx3YXlzXG4gKiB1cGRhdGVkIGlmIG9uZSBvZiB0aGUgZGVwZW5kZW5jaWVzIGNoYW5nZXMsIGV2ZW4gd2hlbiB0aGUgdmlldyBpcyBub3QgZnVydGhlciB1c2VkIGJ5IHNvbWV0aGluZyBlbHNlLlxuICogQHBhcmFtIHZpZXcgVGhlIHJlYWN0aXZlIHZpZXdcbiAqIEByZXR1cm5zIGRpc3Bvc2VyIGZ1bmN0aW9uLCB3aGljaCBjYW4gYmUgdXNlZCB0byBzdG9wIHRoZSB2aWV3IGZyb20gYmVpbmcgdXBkYXRlZCBpbiB0aGUgZnV0dXJlLlxuICovXG5mdW5jdGlvbiBhdXRvcnVuKHZpZXcsIG9wdHMpIHtcbiAgdmFyIF9vcHRzJG5hbWUsIF9vcHRzLCBfb3B0czIsIF9vcHRzMiRzaWduYWwsIF9vcHRzMztcbiAgaWYgKG9wdHMgPT09IHZvaWQgMCkge1xuICAgIG9wdHMgPSBFTVBUWV9PQkpFQ1Q7XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGlmICghaXNGdW5jdGlvbih2aWV3KSkge1xuICAgICAgZGllKFwiQXV0b3J1biBleHBlY3RzIGEgZnVuY3Rpb24gYXMgZmlyc3QgYXJndW1lbnRcIik7XG4gICAgfVxuICAgIGlmIChpc0FjdGlvbih2aWV3KSkge1xuICAgICAgZGllKFwiQXV0b3J1biBkb2VzIG5vdCBhY2NlcHQgYWN0aW9ucyBzaW5jZSBhY3Rpb25zIGFyZSB1bnRyYWNrYWJsZVwiKTtcbiAgICB9XG4gIH1cbiAgdmFyIG5hbWUgPSAoX29wdHMkbmFtZSA9IChfb3B0cyA9IG9wdHMpID09IG51bGwgPyB2b2lkIDAgOiBfb3B0cy5uYW1lKSAhPSBudWxsID8gX29wdHMkbmFtZSA6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHZpZXcubmFtZSB8fCBcIkF1dG9ydW5AXCIgKyBnZXROZXh0SWQoKSA6IFwiQXV0b3J1blwiO1xuICB2YXIgcnVuU3luYyA9ICFvcHRzLnNjaGVkdWxlciAmJiAhb3B0cy5kZWxheTtcbiAgdmFyIHJlYWN0aW9uO1xuICBpZiAocnVuU3luYykge1xuICAgIC8vIG5vcm1hbCBhdXRvcnVuXG4gICAgcmVhY3Rpb24gPSBuZXcgUmVhY3Rpb24obmFtZSwgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy50cmFjayhyZWFjdGlvblJ1bm5lcik7XG4gICAgfSwgb3B0cy5vbkVycm9yLCBvcHRzLnJlcXVpcmVzT2JzZXJ2YWJsZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNjaGVkdWxlciA9IGNyZWF0ZVNjaGVkdWxlckZyb21PcHRpb25zKG9wdHMpO1xuICAgIC8vIGRlYm91bmNlZCBhdXRvcnVuXG4gICAgdmFyIGlzU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgcmVhY3Rpb24gPSBuZXcgUmVhY3Rpb24obmFtZSwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFpc1NjaGVkdWxlZCkge1xuICAgICAgICBpc1NjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgIHNjaGVkdWxlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaXNTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICBpZiAoIXJlYWN0aW9uLmlzRGlzcG9zZWRfKSB7XG4gICAgICAgICAgICByZWFjdGlvbi50cmFjayhyZWFjdGlvblJ1bm5lcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCBvcHRzLm9uRXJyb3IsIG9wdHMucmVxdWlyZXNPYnNlcnZhYmxlKTtcbiAgfVxuICBmdW5jdGlvbiByZWFjdGlvblJ1bm5lcigpIHtcbiAgICB2aWV3KHJlYWN0aW9uKTtcbiAgfVxuICBpZiAoISgoX29wdHMyID0gb3B0cykgIT0gbnVsbCAmJiAoX29wdHMyJHNpZ25hbCA9IF9vcHRzMi5zaWduYWwpICE9IG51bGwgJiYgX29wdHMyJHNpZ25hbC5hYm9ydGVkKSkge1xuICAgIHJlYWN0aW9uLnNjaGVkdWxlXygpO1xuICB9XG4gIHJldHVybiByZWFjdGlvbi5nZXREaXNwb3Nlcl8oKF9vcHRzMyA9IG9wdHMpID09IG51bGwgPyB2b2lkIDAgOiBfb3B0czMuc2lnbmFsKTtcbn1cbnZhciBydW4gPSBmdW5jdGlvbiBydW4oZikge1xuICByZXR1cm4gZigpO1xufTtcbmZ1bmN0aW9uIGNyZWF0ZVNjaGVkdWxlckZyb21PcHRpb25zKG9wdHMpIHtcbiAgcmV0dXJuIG9wdHMuc2NoZWR1bGVyID8gb3B0cy5zY2hlZHVsZXIgOiBvcHRzLmRlbGF5ID8gZnVuY3Rpb24gKGYpIHtcbiAgICByZXR1cm4gc2V0VGltZW91dChmLCBvcHRzLmRlbGF5KTtcbiAgfSA6IHJ1bjtcbn1cbmZ1bmN0aW9uIHJlYWN0aW9uKGV4cHJlc3Npb24sIGVmZmVjdCwgb3B0cykge1xuICB2YXIgX29wdHMkbmFtZTIsIF9vcHRzNCwgX29wdHM0JHNpZ25hbCwgX29wdHM1O1xuICBpZiAob3B0cyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0cyA9IEVNUFRZX09CSkVDVDtcbiAgfVxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgaWYgKCFpc0Z1bmN0aW9uKGV4cHJlc3Npb24pIHx8ICFpc0Z1bmN0aW9uKGVmZmVjdCkpIHtcbiAgICAgIGRpZShcIkZpcnN0IGFuZCBzZWNvbmQgYXJndW1lbnQgdG8gcmVhY3Rpb24gc2hvdWxkIGJlIGZ1bmN0aW9uc1wiKTtcbiAgICB9XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KG9wdHMpKSB7XG4gICAgICBkaWUoXCJUaGlyZCBhcmd1bWVudCBvZiByZWFjdGlvbnMgc2hvdWxkIGJlIGFuIG9iamVjdFwiKTtcbiAgICB9XG4gIH1cbiAgdmFyIG5hbWUgPSAoX29wdHMkbmFtZTIgPSBvcHRzLm5hbWUpICE9IG51bGwgPyBfb3B0cyRuYW1lMiA6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiUmVhY3Rpb25AXCIgKyBnZXROZXh0SWQoKSA6IFwiUmVhY3Rpb25cIjtcbiAgdmFyIGVmZmVjdEFjdGlvbiA9IGFjdGlvbihuYW1lLCBvcHRzLm9uRXJyb3IgPyB3cmFwRXJyb3JIYW5kbGVyKG9wdHMub25FcnJvciwgZWZmZWN0KSA6IGVmZmVjdCk7XG4gIHZhciBydW5TeW5jID0gIW9wdHMuc2NoZWR1bGVyICYmICFvcHRzLmRlbGF5O1xuICB2YXIgc2NoZWR1bGVyID0gY3JlYXRlU2NoZWR1bGVyRnJvbU9wdGlvbnMob3B0cyk7XG4gIHZhciBmaXJzdFRpbWUgPSB0cnVlO1xuICB2YXIgaXNTY2hlZHVsZWQgPSBmYWxzZTtcbiAgdmFyIHZhbHVlO1xuICB2YXIgZXF1YWxzID0gb3B0cy5jb21wYXJlU3RydWN0dXJhbCA/IGNvbXBhcmVyLnN0cnVjdHVyYWwgOiBvcHRzLmVxdWFscyB8fCBjb21wYXJlcltcImRlZmF1bHRcIl07XG4gIHZhciByID0gbmV3IFJlYWN0aW9uKG5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZmlyc3RUaW1lIHx8IHJ1blN5bmMpIHtcbiAgICAgIHJlYWN0aW9uUnVubmVyKCk7XG4gICAgfSBlbHNlIGlmICghaXNTY2hlZHVsZWQpIHtcbiAgICAgIGlzU2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgIHNjaGVkdWxlcihyZWFjdGlvblJ1bm5lcik7XG4gICAgfVxuICB9LCBvcHRzLm9uRXJyb3IsIG9wdHMucmVxdWlyZXNPYnNlcnZhYmxlKTtcbiAgZnVuY3Rpb24gcmVhY3Rpb25SdW5uZXIoKSB7XG4gICAgaXNTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICBpZiAoci5pc0Rpc3Bvc2VkXykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBvbGRWYWx1ZSA9IHZhbHVlO1xuICAgIHIudHJhY2soZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG5leHRWYWx1ZSA9IGFsbG93U3RhdGVDaGFuZ2VzKGZhbHNlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBleHByZXNzaW9uKHIpO1xuICAgICAgfSk7XG4gICAgICBjaGFuZ2VkID0gZmlyc3RUaW1lIHx8ICFlcXVhbHModmFsdWUsIG5leHRWYWx1ZSk7XG4gICAgICB2YWx1ZSA9IG5leHRWYWx1ZTtcbiAgICB9KTtcbiAgICBpZiAoZmlyc3RUaW1lICYmIG9wdHMuZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICBlZmZlY3RBY3Rpb24odmFsdWUsIG9sZFZhbHVlLCByKTtcbiAgICB9IGVsc2UgaWYgKCFmaXJzdFRpbWUgJiYgY2hhbmdlZCkge1xuICAgICAgZWZmZWN0QWN0aW9uKHZhbHVlLCBvbGRWYWx1ZSwgcik7XG4gICAgfVxuICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICB9XG4gIGlmICghKChfb3B0czQgPSBvcHRzKSAhPSBudWxsICYmIChfb3B0czQkc2lnbmFsID0gX29wdHM0LnNpZ25hbCkgIT0gbnVsbCAmJiBfb3B0czQkc2lnbmFsLmFib3J0ZWQpKSB7XG4gICAgci5zY2hlZHVsZV8oKTtcbiAgfVxuICByZXR1cm4gci5nZXREaXNwb3Nlcl8oKF9vcHRzNSA9IG9wdHMpID09IG51bGwgPyB2b2lkIDAgOiBfb3B0czUuc2lnbmFsKTtcbn1cbmZ1bmN0aW9uIHdyYXBFcnJvckhhbmRsZXIoZXJyb3JIYW5kbGVyLCBiYXNlRm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGJhc2VGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGVycm9ySGFuZGxlci5jYWxsKHRoaXMsIGUpO1xuICAgIH1cbiAgfTtcbn1cblxudmFyIE9OX0JFQ09NRV9PQlNFUlZFRCA9IFwib25CT1wiO1xudmFyIE9OX0JFQ09NRV9VTk9CU0VSVkVEID0gXCJvbkJVT1wiO1xuZnVuY3Rpb24gb25CZWNvbWVPYnNlcnZlZCh0aGluZywgYXJnMiwgYXJnMykge1xuICByZXR1cm4gaW50ZXJjZXB0SG9vayhPTl9CRUNPTUVfT0JTRVJWRUQsIHRoaW5nLCBhcmcyLCBhcmczKTtcbn1cbmZ1bmN0aW9uIG9uQmVjb21lVW5vYnNlcnZlZCh0aGluZywgYXJnMiwgYXJnMykge1xuICByZXR1cm4gaW50ZXJjZXB0SG9vayhPTl9CRUNPTUVfVU5PQlNFUlZFRCwgdGhpbmcsIGFyZzIsIGFyZzMpO1xufVxuZnVuY3Rpb24gaW50ZXJjZXB0SG9vayhob29rLCB0aGluZywgYXJnMiwgYXJnMykge1xuICB2YXIgYXRvbSA9IHR5cGVvZiBhcmczID09PSBcImZ1bmN0aW9uXCIgPyBnZXRBdG9tKHRoaW5nLCBhcmcyKSA6IGdldEF0b20odGhpbmcpO1xuICB2YXIgY2IgPSBpc0Z1bmN0aW9uKGFyZzMpID8gYXJnMyA6IGFyZzI7XG4gIHZhciBsaXN0ZW5lcnNLZXkgPSBob29rICsgXCJMXCI7XG4gIGlmIChhdG9tW2xpc3RlbmVyc0tleV0pIHtcbiAgICBhdG9tW2xpc3RlbmVyc0tleV0uYWRkKGNiKTtcbiAgfSBlbHNlIHtcbiAgICBhdG9tW2xpc3RlbmVyc0tleV0gPSBuZXcgU2V0KFtjYl0pO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhvb2tMaXN0ZW5lcnMgPSBhdG9tW2xpc3RlbmVyc0tleV07XG4gICAgaWYgKGhvb2tMaXN0ZW5lcnMpIHtcbiAgICAgIGhvb2tMaXN0ZW5lcnNbXCJkZWxldGVcIl0oY2IpO1xuICAgICAgaWYgKGhvb2tMaXN0ZW5lcnMuc2l6ZSA9PT0gMCkge1xuICAgICAgICBkZWxldGUgYXRvbVtsaXN0ZW5lcnNLZXldO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxudmFyIE5FVkVSID0gXCJuZXZlclwiO1xudmFyIEFMV0FZUyA9IFwiYWx3YXlzXCI7XG52YXIgT0JTRVJWRUQgPSBcIm9ic2VydmVkXCI7XG4vLyBjb25zdCBJRl9BVkFJTEFCTEUgPSBcImlmYXZhaWxhYmxlXCJcbmZ1bmN0aW9uIGNvbmZpZ3VyZShvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zLmlzb2xhdGVHbG9iYWxTdGF0ZSA9PT0gdHJ1ZSkge1xuICAgIGlzb2xhdGVHbG9iYWxTdGF0ZSgpO1xuICB9XG4gIHZhciB1c2VQcm94aWVzID0gb3B0aW9ucy51c2VQcm94aWVzLFxuICAgIGVuZm9yY2VBY3Rpb25zID0gb3B0aW9ucy5lbmZvcmNlQWN0aW9ucztcbiAgaWYgKHVzZVByb3hpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGdsb2JhbFN0YXRlLnVzZVByb3hpZXMgPSB1c2VQcm94aWVzID09PSBBTFdBWVMgPyB0cnVlIDogdXNlUHJveGllcyA9PT0gTkVWRVIgPyBmYWxzZSA6IHR5cGVvZiBQcm94eSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgfVxuICBpZiAodXNlUHJveGllcyA9PT0gXCJpZmF2YWlsYWJsZVwiKSB7XG4gICAgZ2xvYmFsU3RhdGUudmVyaWZ5UHJveGllcyA9IHRydWU7XG4gIH1cbiAgaWYgKGVuZm9yY2VBY3Rpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZWEgPSBlbmZvcmNlQWN0aW9ucyA9PT0gQUxXQVlTID8gQUxXQVlTIDogZW5mb3JjZUFjdGlvbnMgPT09IE9CU0VSVkVEO1xuICAgIGdsb2JhbFN0YXRlLmVuZm9yY2VBY3Rpb25zID0gZWE7XG4gICAgZ2xvYmFsU3RhdGUuYWxsb3dTdGF0ZUNoYW5nZXMgPSBlYSA9PT0gdHJ1ZSB8fCBlYSA9PT0gQUxXQVlTID8gZmFsc2UgOiB0cnVlO1xuICB9XG4gIFtcImNvbXB1dGVkUmVxdWlyZXNSZWFjdGlvblwiLCBcInJlYWN0aW9uUmVxdWlyZXNPYnNlcnZhYmxlXCIsIFwib2JzZXJ2YWJsZVJlcXVpcmVzUmVhY3Rpb25cIiwgXCJkaXNhYmxlRXJyb3JCb3VuZGFyaWVzXCIsIFwic2FmZURlc2NyaXB0b3JzXCJdLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGlmIChrZXkgaW4gb3B0aW9ucykge1xuICAgICAgZ2xvYmFsU3RhdGVba2V5XSA9ICEhb3B0aW9uc1trZXldO1xuICAgIH1cbiAgfSk7XG4gIGdsb2JhbFN0YXRlLmFsbG93U3RhdGVSZWFkcyA9ICFnbG9iYWxTdGF0ZS5vYnNlcnZhYmxlUmVxdWlyZXNSZWFjdGlvbjtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBnbG9iYWxTdGF0ZS5kaXNhYmxlRXJyb3JCb3VuZGFyaWVzID09PSB0cnVlKSB7XG4gICAgY29uc29sZS53YXJuKFwiV0FSTklORzogRGVidWcgZmVhdHVyZSBvbmx5LiBNb2JYIHdpbGwgTk9UIHJlY292ZXIgZnJvbSBlcnJvcnMgd2hlbiBgZGlzYWJsZUVycm9yQm91bmRhcmllc2AgaXMgZW5hYmxlZC5cIik7XG4gIH1cbiAgaWYgKG9wdGlvbnMucmVhY3Rpb25TY2hlZHVsZXIpIHtcbiAgICBzZXRSZWFjdGlvblNjaGVkdWxlcihvcHRpb25zLnJlYWN0aW9uU2NoZWR1bGVyKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBleHRlbmRPYnNlcnZhYmxlKHRhcmdldCwgcHJvcGVydGllcywgYW5ub3RhdGlvbnMsIG9wdGlvbnMpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gNCkge1xuICAgICAgZGllKFwiJ2V4dGVuZE9ic2VydmFibGUnIGV4cGVjdGVkIDItNCBhcmd1bWVudHNcIik7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICBkaWUoXCInZXh0ZW5kT2JzZXJ2YWJsZScgZXhwZWN0cyBhbiBvYmplY3QgYXMgZmlyc3QgYXJndW1lbnRcIik7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVNYXAodGFyZ2V0KSkge1xuICAgICAgZGllKFwiJ2V4dGVuZE9ic2VydmFibGUnIHNob3VsZCBub3QgYmUgdXNlZCBvbiBtYXBzLCB1c2UgbWFwLm1lcmdlIGluc3RlYWRcIik7XG4gICAgfVxuICAgIGlmICghaXNQbGFpbk9iamVjdChwcm9wZXJ0aWVzKSkge1xuICAgICAgZGllKFwiJ2V4dGVuZE9ic2VydmFibGUnIG9ubHkgYWNjZXB0cyBwbGFpbiBvYmplY3RzIGFzIHNlY29uZCBhcmd1bWVudFwiKTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZShwcm9wZXJ0aWVzKSB8fCBpc09ic2VydmFibGUoYW5ub3RhdGlvbnMpKSB7XG4gICAgICBkaWUoXCJFeHRlbmRpbmcgYW4gb2JqZWN0IHdpdGggYW5vdGhlciBvYnNlcnZhYmxlIChvYmplY3QpIGlzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgfVxuICB9XG4gIC8vIFB1bGwgZGVzY3JpcHRvcnMgZmlyc3QsIHNvIHdlIGRvbid0IGhhdmUgdG8gZGVhbCB3aXRoIHByb3BzIGFkZGVkIGJ5IGFkbWluaXN0cmF0aW9uICgkbW9ieClcbiAgdmFyIGRlc2NyaXB0b3JzID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhwcm9wZXJ0aWVzKTtcbiAgaW5pdE9ic2VydmFibGUoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhZG0gPSBhc09ic2VydmFibGVPYmplY3QodGFyZ2V0LCBvcHRpb25zKVskbW9ieF07XG4gICAgb3duS2V5cyhkZXNjcmlwdG9ycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBhZG0uZXh0ZW5kXyhrZXksIGRlc2NyaXB0b3JzW2tleV0sXG4gICAgICAvLyBtdXN0IHBhc3MgXCJ1bmRlZmluZWRcIiBmb3IgeyBrZXk6IHVuZGVmaW5lZCB9XG4gICAgICAhYW5ub3RhdGlvbnMgPyB0cnVlIDoga2V5IGluIGFubm90YXRpb25zID8gYW5ub3RhdGlvbnNba2V5XSA6IHRydWUpO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuZnVuY3Rpb24gZ2V0RGVwZW5kZW5jeVRyZWUodGhpbmcsIHByb3BlcnR5KSB7XG4gIHJldHVybiBub2RlVG9EZXBlbmRlbmN5VHJlZShnZXRBdG9tKHRoaW5nLCBwcm9wZXJ0eSkpO1xufVxuZnVuY3Rpb24gbm9kZVRvRGVwZW5kZW5jeVRyZWUobm9kZSkge1xuICB2YXIgcmVzdWx0ID0ge1xuICAgIG5hbWU6IG5vZGUubmFtZV9cbiAgfTtcbiAgaWYgKG5vZGUub2JzZXJ2aW5nXyAmJiBub2RlLm9ic2VydmluZ18ubGVuZ3RoID4gMCkge1xuICAgIHJlc3VsdC5kZXBlbmRlbmNpZXMgPSB1bmlxdWUobm9kZS5vYnNlcnZpbmdfKS5tYXAobm9kZVRvRGVwZW5kZW5jeVRyZWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBnZXRPYnNlcnZlclRyZWUodGhpbmcsIHByb3BlcnR5KSB7XG4gIHJldHVybiBub2RlVG9PYnNlcnZlclRyZWUoZ2V0QXRvbSh0aGluZywgcHJvcGVydHkpKTtcbn1cbmZ1bmN0aW9uIG5vZGVUb09ic2VydmVyVHJlZShub2RlKSB7XG4gIHZhciByZXN1bHQgPSB7XG4gICAgbmFtZTogbm9kZS5uYW1lX1xuICB9O1xuICBpZiAoaGFzT2JzZXJ2ZXJzKG5vZGUpKSB7XG4gICAgcmVzdWx0Lm9ic2VydmVycyA9IEFycmF5LmZyb20oZ2V0T2JzZXJ2ZXJzKG5vZGUpKS5tYXAobm9kZVRvT2JzZXJ2ZXJUcmVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gdW5pcXVlKGxpc3QpIHtcbiAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChsaXN0KSk7XG59XG5cbnZhciBnZW5lcmF0b3JJZCA9IDA7XG5mdW5jdGlvbiBGbG93Q2FuY2VsbGF0aW9uRXJyb3IoKSB7XG4gIHRoaXMubWVzc2FnZSA9IFwiRkxPV19DQU5DRUxMRURcIjtcbn1cbkZsb3dDYW5jZWxsYXRpb25FcnJvci5wcm90b3R5cGUgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuZnVuY3Rpb24gaXNGbG93Q2FuY2VsbGF0aW9uRXJyb3IoZXJyb3IpIHtcbiAgcmV0dXJuIGVycm9yIGluc3RhbmNlb2YgRmxvd0NhbmNlbGxhdGlvbkVycm9yO1xufVxudmFyIGZsb3dBbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUZsb3dBbm5vdGF0aW9uKFwiZmxvd1wiKTtcbnZhciBmbG93Qm91bmRBbm5vdGF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUZsb3dBbm5vdGF0aW9uKFwiZmxvdy5ib3VuZFwiLCB7XG4gIGJvdW5kOiB0cnVlXG59KTtcbnZhciBmbG93ID0gLyojX19QVVJFX18qL09iamVjdC5hc3NpZ24oZnVuY3Rpb24gZmxvdyhhcmcxLCBhcmcyKSB7XG4gIC8vIEBmbG93ICgyMDIyLjMgRGVjb3JhdG9ycylcbiAgaWYgKGlzMjAyMjNEZWNvcmF0b3IoYXJnMikpIHtcbiAgICByZXR1cm4gZmxvd0Fubm90YXRpb24uZGVjb3JhdGVfMjAyMjNfKGFyZzEsIGFyZzIpO1xuICB9XG4gIC8vIEBmbG93XG4gIGlmIChpc1N0cmluZ2lzaChhcmcyKSkge1xuICAgIHJldHVybiBzdG9yZUFubm90YXRpb24oYXJnMSwgYXJnMiwgZmxvd0Fubm90YXRpb24pO1xuICB9XG4gIC8vIGZsb3coZm4pXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgYXJndW1lbnRzLmxlbmd0aCAhPT0gMSkge1xuICAgIGRpZShcIkZsb3cgZXhwZWN0cyBzaW5nbGUgYXJndW1lbnQgd2l0aCBnZW5lcmF0b3IgZnVuY3Rpb25cIik7XG4gIH1cbiAgdmFyIGdlbmVyYXRvciA9IGFyZzE7XG4gIHZhciBuYW1lID0gZ2VuZXJhdG9yLm5hbWUgfHwgXCI8dW5uYW1lZCBmbG93PlwiO1xuICAvLyBJbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vdGovY28vYmxvYi9tYXN0ZXIvaW5kZXguanNcbiAgdmFyIHJlcyA9IGZ1bmN0aW9uIHJlcygpIHtcbiAgICB2YXIgY3R4ID0gdGhpcztcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICB2YXIgcnVuSWQgPSArK2dlbmVyYXRvcklkO1xuICAgIHZhciBnZW4gPSBhY3Rpb24obmFtZSArIFwiIC0gcnVuaWQ6IFwiICsgcnVuSWQgKyBcIiAtIGluaXRcIiwgZ2VuZXJhdG9yKS5hcHBseShjdHgsIGFyZ3MpO1xuICAgIHZhciByZWplY3RvcjtcbiAgICB2YXIgcGVuZGluZ1Byb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgc3RlcElkID0gMDtcbiAgICAgIHJlamVjdG9yID0gcmVqZWN0O1xuICAgICAgZnVuY3Rpb24gb25GdWxmaWxsZWQocmVzKSB7XG4gICAgICAgIHBlbmRpbmdQcm9taXNlID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgcmV0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldCA9IGFjdGlvbihuYW1lICsgXCIgLSBydW5pZDogXCIgKyBydW5JZCArIFwiIC0geWllbGQgXCIgKyBzdGVwSWQrKywgZ2VuLm5leHQpLmNhbGwoZ2VuLCByZXMpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgICAgICBuZXh0KHJldCk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBvblJlamVjdGVkKGVycikge1xuICAgICAgICBwZW5kaW5nUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIHJldDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXQgPSBhY3Rpb24obmFtZSArIFwiIC0gcnVuaWQ6IFwiICsgcnVuSWQgKyBcIiAtIHlpZWxkIFwiICsgc3RlcElkKyssIGdlbltcInRocm93XCJdKS5jYWxsKGdlbiwgZXJyKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV4dChyZXQpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gbmV4dChyZXQpIHtcbiAgICAgICAgaWYgKGlzRnVuY3Rpb24ocmV0ID09IG51bGwgPyB2b2lkIDAgOiByZXQudGhlbikpIHtcbiAgICAgICAgICAvLyBhbiBhc3luYyBpdGVyYXRvclxuICAgICAgICAgIHJldC50aGVuKG5leHQsIHJlamVjdCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXQuZG9uZSkge1xuICAgICAgICAgIHJldHVybiByZXNvbHZlKHJldC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcGVuZGluZ1Byb21pc2UgPSBQcm9taXNlLnJlc29sdmUocmV0LnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHBlbmRpbmdQcm9taXNlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpO1xuICAgICAgfVxuICAgICAgb25GdWxmaWxsZWQodW5kZWZpbmVkKTsgLy8ga2ljayBvZmYgdGhlIHByb2Nlc3NcbiAgICB9KTtcblxuICAgIHByb21pc2UuY2FuY2VsID0gYWN0aW9uKG5hbWUgKyBcIiAtIHJ1bmlkOiBcIiArIHJ1bklkICsgXCIgLSBjYW5jZWxcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHBlbmRpbmdQcm9taXNlKSB7XG4gICAgICAgICAgY2FuY2VsUHJvbWlzZShwZW5kaW5nUHJvbWlzZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRmluYWxseSBibG9jayBjYW4gcmV0dXJuIChvciB5aWVsZCkgc3R1ZmYuLlxuICAgICAgICB2YXIgX3JlcyA9IGdlbltcInJldHVyblwiXSh1bmRlZmluZWQpO1xuICAgICAgICAvLyBlYXQgYW55dGhpbmcgdGhhdCBwcm9taXNlIHdvdWxkIGRvLCBpdCdzIGNhbmNlbGxlZCFcbiAgICAgICAgdmFyIHlpZWxkZWRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKF9yZXMudmFsdWUpO1xuICAgICAgICB5aWVsZGVkUHJvbWlzZS50aGVuKG5vb3AsIG5vb3ApO1xuICAgICAgICBjYW5jZWxQcm9taXNlKHlpZWxkZWRQcm9taXNlKTsgLy8gbWF5YmUgaXQgY2FuIGJlIGNhbmNlbGxlZCA6KVxuICAgICAgICAvLyByZWplY3Qgb3VyIG9yaWdpbmFsIHByb21pc2VcbiAgICAgICAgcmVqZWN0b3IobmV3IEZsb3dDYW5jZWxsYXRpb25FcnJvcigpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmVqZWN0b3IoZSk7IC8vIHRoZXJlIGNvdWxkIGJlIGEgdGhyb3dpbmcgZmluYWxseSBibG9ja1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH07XG4gIHJlcy5pc01vYlhGbG93ID0gdHJ1ZTtcbiAgcmV0dXJuIHJlcztcbn0sIGZsb3dBbm5vdGF0aW9uKTtcbmZsb3cuYm91bmQgPSAvKiNfX1BVUkVfXyovY3JlYXRlRGVjb3JhdG9yQW5ub3RhdGlvbihmbG93Qm91bmRBbm5vdGF0aW9uKTtcbmZ1bmN0aW9uIGNhbmNlbFByb21pc2UocHJvbWlzZSkge1xuICBpZiAoaXNGdW5jdGlvbihwcm9taXNlLmNhbmNlbCkpIHtcbiAgICBwcm9taXNlLmNhbmNlbCgpO1xuICB9XG59XG5mdW5jdGlvbiBmbG93UmVzdWx0KHJlc3VsdCkge1xuICByZXR1cm4gcmVzdWx0OyAvLyBqdXN0IHRyaWNraW5nIFR5cGVTY3JpcHQgOilcbn1cblxuZnVuY3Rpb24gaXNGbG93KGZuKSB7XG4gIHJldHVybiAoZm4gPT0gbnVsbCA/IHZvaWQgMCA6IGZuLmlzTW9iWEZsb3cpID09PSB0cnVlO1xufVxuXG5mdW5jdGlvbiBpbnRlcmNlcHRSZWFkcyh0aGluZywgcHJvcE9ySGFuZGxlciwgaGFuZGxlcikge1xuICB2YXIgdGFyZ2V0O1xuICBpZiAoaXNPYnNlcnZhYmxlTWFwKHRoaW5nKSB8fCBpc09ic2VydmFibGVBcnJheSh0aGluZykgfHwgaXNPYnNlcnZhYmxlVmFsdWUodGhpbmcpKSB7XG4gICAgdGFyZ2V0ID0gZ2V0QWRtaW5pc3RyYXRpb24odGhpbmcpO1xuICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCh0aGluZykpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFpc1N0cmluZ2lzaChwcm9wT3JIYW5kbGVyKSkge1xuICAgICAgcmV0dXJuIGRpZShcIkludGVyY2VwdFJlYWRzIGNhbiBvbmx5IGJlIHVzZWQgd2l0aCBhIHNwZWNpZmljIHByb3BlcnR5LCBub3Qgd2l0aCBhbiBvYmplY3QgaW4gZ2VuZXJhbFwiKTtcbiAgICB9XG4gICAgdGFyZ2V0ID0gZ2V0QWRtaW5pc3RyYXRpb24odGhpbmcsIHByb3BPckhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIHJldHVybiBkaWUoXCJFeHBlY3RlZCBvYnNlcnZhYmxlIG1hcCwgb2JqZWN0IG9yIGFycmF5IGFzIGZpcnN0IGFycmF5XCIpO1xuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgdGFyZ2V0LmRlaGFuY2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZGllKFwiQW4gaW50ZXJjZXB0IHJlYWRlciB3YXMgYWxyZWFkeSBlc3RhYmxpc2hlZFwiKTtcbiAgfVxuICB0YXJnZXQuZGVoYW5jZXIgPSB0eXBlb2YgcHJvcE9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiID8gcHJvcE9ySGFuZGxlciA6IGhhbmRsZXI7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdGFyZ2V0LmRlaGFuY2VyID0gdW5kZWZpbmVkO1xuICB9O1xufVxuXG5mdW5jdGlvbiBpbnRlcmNlcHQodGhpbmcsIHByb3BPckhhbmRsZXIsIGhhbmRsZXIpIHtcbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICByZXR1cm4gaW50ZXJjZXB0UHJvcGVydHkodGhpbmcsIHByb3BPckhhbmRsZXIsIGhhbmRsZXIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBpbnRlcmNlcHRJbnRlcmNlcHRhYmxlKHRoaW5nLCBwcm9wT3JIYW5kbGVyKTtcbiAgfVxufVxuZnVuY3Rpb24gaW50ZXJjZXB0SW50ZXJjZXB0YWJsZSh0aGluZywgaGFuZGxlcikge1xuICByZXR1cm4gZ2V0QWRtaW5pc3RyYXRpb24odGhpbmcpLmludGVyY2VwdF8oaGFuZGxlcik7XG59XG5mdW5jdGlvbiBpbnRlcmNlcHRQcm9wZXJ0eSh0aGluZywgcHJvcGVydHksIGhhbmRsZXIpIHtcbiAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uKHRoaW5nLCBwcm9wZXJ0eSkuaW50ZXJjZXB0XyhoYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gX2lzQ29tcHV0ZWQodmFsdWUsIHByb3BlcnR5KSB7XG4gIGlmIChwcm9wZXJ0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGlzQ29tcHV0ZWRWYWx1ZSh2YWx1ZSk7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCh2YWx1ZSkgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICghdmFsdWVbJG1vYnhdLnZhbHVlc18uaGFzKHByb3BlcnR5KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgYXRvbSA9IGdldEF0b20odmFsdWUsIHByb3BlcnR5KTtcbiAgcmV0dXJuIGlzQ29tcHV0ZWRWYWx1ZShhdG9tKTtcbn1cbmZ1bmN0aW9uIGlzQ29tcHV0ZWQodmFsdWUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIHJldHVybiBkaWUoXCJpc0NvbXB1dGVkIGV4cGVjdHMgb25seSAxIGFyZ3VtZW50LiBVc2UgaXNDb21wdXRlZFByb3AgdG8gaW5zcGVjdCB0aGUgb2JzZXJ2YWJpbGl0eSBvZiBhIHByb3BlcnR5XCIpO1xuICB9XG4gIHJldHVybiBfaXNDb21wdXRlZCh2YWx1ZSk7XG59XG5mdW5jdGlvbiBpc0NvbXB1dGVkUHJvcCh2YWx1ZSwgcHJvcE5hbWUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhaXNTdHJpbmdpc2gocHJvcE5hbWUpKSB7XG4gICAgcmV0dXJuIGRpZShcImlzQ29tcHV0ZWQgZXhwZWN0ZWQgYSBwcm9wZXJ0eSBuYW1lIGFzIHNlY29uZCBhcmd1bWVudFwiKTtcbiAgfVxuICByZXR1cm4gX2lzQ29tcHV0ZWQodmFsdWUsIHByb3BOYW1lKTtcbn1cblxuZnVuY3Rpb24gX2lzT2JzZXJ2YWJsZSh2YWx1ZSwgcHJvcGVydHkpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgKGlzT2JzZXJ2YWJsZU1hcCh2YWx1ZSkgfHwgaXNPYnNlcnZhYmxlQXJyYXkodmFsdWUpKSkge1xuICAgICAgcmV0dXJuIGRpZShcImlzT2JzZXJ2YWJsZShvYmplY3QsIHByb3BlcnR5TmFtZSkgaXMgbm90IHN1cHBvcnRlZCBmb3IgYXJyYXlzIGFuZCBtYXBzLiBVc2UgbWFwLmhhcyBvciBhcnJheS5sZW5ndGggaW5zdGVhZC5cIik7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVPYmplY3QodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWVbJG1vYnhdLnZhbHVlc18uaGFzKHByb3BlcnR5KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEZvciBmaXJzdCBjaGVjaywgc2VlICM3MDFcbiAgcmV0dXJuIGlzT2JzZXJ2YWJsZU9iamVjdCh2YWx1ZSkgfHwgISF2YWx1ZVskbW9ieF0gfHwgaXNBdG9tKHZhbHVlKSB8fCBpc1JlYWN0aW9uKHZhbHVlKSB8fCBpc0NvbXB1dGVkVmFsdWUodmFsdWUpO1xufVxuZnVuY3Rpb24gaXNPYnNlcnZhYmxlKHZhbHVlKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgYXJndW1lbnRzLmxlbmd0aCAhPT0gMSkge1xuICAgIGRpZShcImlzT2JzZXJ2YWJsZSBleHBlY3RzIG9ubHkgMSBhcmd1bWVudC4gVXNlIGlzT2JzZXJ2YWJsZVByb3AgdG8gaW5zcGVjdCB0aGUgb2JzZXJ2YWJpbGl0eSBvZiBhIHByb3BlcnR5XCIpO1xuICB9XG4gIHJldHVybiBfaXNPYnNlcnZhYmxlKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGlzT2JzZXJ2YWJsZVByb3AodmFsdWUsIHByb3BOYW1lKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWlzU3RyaW5naXNoKHByb3BOYW1lKSkge1xuICAgIHJldHVybiBkaWUoXCJleHBlY3RlZCBhIHByb3BlcnR5IG5hbWUgYXMgc2Vjb25kIGFyZ3VtZW50XCIpO1xuICB9XG4gIHJldHVybiBfaXNPYnNlcnZhYmxlKHZhbHVlLCBwcm9wTmFtZSk7XG59XG5cbmZ1bmN0aW9uIGtleXMob2JqKSB7XG4gIGlmIChpc09ic2VydmFibGVPYmplY3Qob2JqKSkge1xuICAgIHJldHVybiBvYmpbJG1vYnhdLmtleXNfKCk7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZU1hcChvYmopIHx8IGlzT2JzZXJ2YWJsZVNldChvYmopKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ob2JqLmtleXMoKSk7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZUFycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqLm1hcChmdW5jdGlvbiAoXywgaW5kZXgpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9KTtcbiAgfVxuICBkaWUoNSk7XG59XG5mdW5jdGlvbiB2YWx1ZXMob2JqKSB7XG4gIGlmIChpc09ic2VydmFibGVPYmplY3Qob2JqKSkge1xuICAgIHJldHVybiBrZXlzKG9iaikubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlTWFwKG9iaikpIHtcbiAgICByZXR1cm4ga2V5cyhvYmopLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gb2JqLmdldChrZXkpO1xuICAgIH0pO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVTZXQob2JqKSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKG9iai52YWx1ZXMoKSk7XG4gIH1cbiAgaWYgKGlzT2JzZXJ2YWJsZUFycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqLnNsaWNlKCk7XG4gIH1cbiAgZGllKDYpO1xufVxuZnVuY3Rpb24gZW50cmllcyhvYmopIHtcbiAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdChvYmopKSB7XG4gICAgcmV0dXJuIGtleXMob2JqKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIFtrZXksIG9ialtrZXldXTtcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlTWFwKG9iaikpIHtcbiAgICByZXR1cm4ga2V5cyhvYmopLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gW2tleSwgb2JqLmdldChrZXkpXTtcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlU2V0KG9iaikpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShvYmouZW50cmllcygpKTtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmoubWFwKGZ1bmN0aW9uIChrZXksIGluZGV4KSB7XG4gICAgICByZXR1cm4gW2luZGV4LCBrZXldO1xuICAgIH0pO1xuICB9XG4gIGRpZSg3KTtcbn1cbmZ1bmN0aW9uIHNldChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgIWlzT2JzZXJ2YWJsZVNldChvYmopKSB7XG4gICAgc3RhcnRCYXRjaCgpO1xuICAgIHZhciBfdmFsdWVzID0ga2V5O1xuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfa2V5IGluIF92YWx1ZXMpIHtcbiAgICAgICAgc2V0KG9iaiwgX2tleSwgX3ZhbHVlc1tfa2V5XSk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGVuZEJhdGNoKCk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KG9iaikpIHtcbiAgICBvYmpbJG1vYnhdLnNldF8oa2V5LCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlTWFwKG9iaikpIHtcbiAgICBvYmouc2V0KGtleSwgdmFsdWUpO1xuICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZVNldChvYmopKSB7XG4gICAgb2JqLmFkZChrZXkpO1xuICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZUFycmF5KG9iaikpIHtcbiAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJudW1iZXJcIikge1xuICAgICAga2V5ID0gcGFyc2VJbnQoa2V5LCAxMCk7XG4gICAgfVxuICAgIGlmIChrZXkgPCAwKSB7XG4gICAgICBkaWUoXCJJbnZhbGlkIGluZGV4OiAnXCIgKyBrZXkgKyBcIidcIik7XG4gICAgfVxuICAgIHN0YXJ0QmF0Y2goKTtcbiAgICBpZiAoa2V5ID49IG9iai5sZW5ndGgpIHtcbiAgICAgIG9iai5sZW5ndGggPSBrZXkgKyAxO1xuICAgIH1cbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIGVuZEJhdGNoKCk7XG4gIH0gZWxzZSB7XG4gICAgZGllKDgpO1xuICB9XG59XG5mdW5jdGlvbiByZW1vdmUob2JqLCBrZXkpIHtcbiAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdChvYmopKSB7XG4gICAgb2JqWyRtb2J4XS5kZWxldGVfKGtleSk7XG4gIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlTWFwKG9iaikpIHtcbiAgICBvYmpbXCJkZWxldGVcIl0oa2V5KTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGVTZXQob2JqKSkge1xuICAgIG9ialtcImRlbGV0ZVwiXShrZXkpO1xuICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZUFycmF5KG9iaikpIHtcbiAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJudW1iZXJcIikge1xuICAgICAga2V5ID0gcGFyc2VJbnQoa2V5LCAxMCk7XG4gICAgfVxuICAgIG9iai5zcGxpY2Uoa2V5LCAxKTtcbiAgfSBlbHNlIHtcbiAgICBkaWUoOSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGhhcyhvYmosIGtleSkge1xuICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KG9iaikpIHtcbiAgICByZXR1cm4gb2JqWyRtb2J4XS5oYXNfKGtleSk7XG4gIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlTWFwKG9iaikpIHtcbiAgICByZXR1cm4gb2JqLmhhcyhrZXkpO1xuICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZVNldChvYmopKSB7XG4gICAgcmV0dXJuIG9iai5oYXMoa2V5KTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGVBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIGtleSA+PSAwICYmIGtleSA8IG9iai5sZW5ndGg7XG4gIH1cbiAgZGllKDEwKTtcbn1cbmZ1bmN0aW9uIGdldChvYmosIGtleSkge1xuICBpZiAoIWhhcyhvYmosIGtleSkpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGlmIChpc09ic2VydmFibGVPYmplY3Qob2JqKSkge1xuICAgIHJldHVybiBvYmpbJG1vYnhdLmdldF8oa2V5KTtcbiAgfSBlbHNlIGlmIChpc09ic2VydmFibGVNYXAob2JqKSkge1xuICAgIHJldHVybiBvYmouZ2V0KGtleSk7XG4gIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBvYmpba2V5XTtcbiAgfVxuICBkaWUoMTEpO1xufVxuZnVuY3Rpb24gYXBpRGVmaW5lUHJvcGVydHkob2JqLCBrZXksIGRlc2NyaXB0b3IpIHtcbiAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdChvYmopKSB7XG4gICAgcmV0dXJuIG9ialskbW9ieF0uZGVmaW5lUHJvcGVydHlfKGtleSwgZGVzY3JpcHRvcik7XG4gIH1cbiAgZGllKDM5KTtcbn1cbmZ1bmN0aW9uIGFwaU93bktleXMob2JqKSB7XG4gIGlmIChpc09ic2VydmFibGVPYmplY3Qob2JqKSkge1xuICAgIHJldHVybiBvYmpbJG1vYnhdLm93bktleXNfKCk7XG4gIH1cbiAgZGllKDM4KTtcbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZSh0aGluZywgcHJvcE9yQ2IsIGNiT3JGaXJlLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgaWYgKGlzRnVuY3Rpb24oY2JPckZpcmUpKSB7XG4gICAgcmV0dXJuIG9ic2VydmVPYnNlcnZhYmxlUHJvcGVydHkodGhpbmcsIHByb3BPckNiLCBjYk9yRmlyZSwgZmlyZUltbWVkaWF0ZWx5KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JzZXJ2ZU9ic2VydmFibGUodGhpbmcsIHByb3BPckNiLCBjYk9yRmlyZSk7XG4gIH1cbn1cbmZ1bmN0aW9uIG9ic2VydmVPYnNlcnZhYmxlKHRoaW5nLCBsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbih0aGluZykub2JzZXJ2ZV8obGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSk7XG59XG5mdW5jdGlvbiBvYnNlcnZlT2JzZXJ2YWJsZVByb3BlcnR5KHRoaW5nLCBwcm9wZXJ0eSwgbGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICByZXR1cm4gZ2V0QWRtaW5pc3RyYXRpb24odGhpbmcsIHByb3BlcnR5KS5vYnNlcnZlXyhsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KTtcbn1cblxuZnVuY3Rpb24gY2FjaGUobWFwLCBrZXksIHZhbHVlKSB7XG4gIG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHRvSlNIZWxwZXIoc291cmNlLCBfX2FscmVhZHlTZWVuKSB7XG4gIGlmIChzb3VyY2UgPT0gbnVsbCB8fCB0eXBlb2Ygc291cmNlICE9PSBcIm9iamVjdFwiIHx8IHNvdXJjZSBpbnN0YW5jZW9mIERhdGUgfHwgIWlzT2JzZXJ2YWJsZShzb3VyY2UpKSB7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlVmFsdWUoc291cmNlKSB8fCBpc0NvbXB1dGVkVmFsdWUoc291cmNlKSkge1xuICAgIHJldHVybiB0b0pTSGVscGVyKHNvdXJjZS5nZXQoKSwgX19hbHJlYWR5U2Vlbik7XG4gIH1cbiAgaWYgKF9fYWxyZWFkeVNlZW4uaGFzKHNvdXJjZSkpIHtcbiAgICByZXR1cm4gX19hbHJlYWR5U2Vlbi5nZXQoc291cmNlKTtcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlQXJyYXkoc291cmNlKSkge1xuICAgIHZhciByZXMgPSBjYWNoZShfX2FscmVhZHlTZWVuLCBzb3VyY2UsIG5ldyBBcnJheShzb3VyY2UubGVuZ3RoKSk7XG4gICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpZHgpIHtcbiAgICAgIHJlc1tpZHhdID0gdG9KU0hlbHBlcih2YWx1ZSwgX19hbHJlYWR5U2Vlbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlU2V0KHNvdXJjZSkpIHtcbiAgICB2YXIgX3JlcyA9IGNhY2hlKF9fYWxyZWFkeVNlZW4sIHNvdXJjZSwgbmV3IFNldCgpKTtcbiAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIF9yZXMuYWRkKHRvSlNIZWxwZXIodmFsdWUsIF9fYWxyZWFkeVNlZW4pKTtcbiAgICB9KTtcbiAgICByZXR1cm4gX3JlcztcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlTWFwKHNvdXJjZSkpIHtcbiAgICB2YXIgX3JlczIgPSBjYWNoZShfX2FscmVhZHlTZWVuLCBzb3VyY2UsIG5ldyBNYXAoKSk7XG4gICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIF9yZXMyLnNldChrZXksIHRvSlNIZWxwZXIodmFsdWUsIF9fYWxyZWFkeVNlZW4pKTtcbiAgICB9KTtcbiAgICByZXR1cm4gX3JlczI7XG4gIH0gZWxzZSB7XG4gICAgLy8gbXVzdCBiZSBvYnNlcnZhYmxlIG9iamVjdFxuICAgIHZhciBfcmVzMyA9IGNhY2hlKF9fYWxyZWFkeVNlZW4sIHNvdXJjZSwge30pO1xuICAgIGFwaU93bktleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChvYmplY3RQcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgX3JlczNba2V5XSA9IHRvSlNIZWxwZXIoc291cmNlW2tleV0sIF9fYWxyZWFkeVNlZW4pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBfcmVzMztcbiAgfVxufVxuLyoqXG4gKiBSZWN1cnNpdmVseSBjb252ZXJ0cyBhbiBvYnNlcnZhYmxlIHRvIGl0J3Mgbm9uLW9ic2VydmFibGUgbmF0aXZlIGNvdW50ZXJwYXJ0LlxuICogSXQgZG9lcyBOT1QgcmVjdXJzZSBpbnRvIG5vbi1vYnNlcnZhYmxlcywgdGhlc2UgYXJlIGxlZnQgYXMgdGhleSBhcmUsIGV2ZW4gaWYgdGhleSBjb250YWluIG9ic2VydmFibGVzLlxuICogQ29tcHV0ZWQgYW5kIG90aGVyIG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXMgYXJlIGNvbXBsZXRlbHkgaWdub3JlZC5cbiAqIENvbXBsZXggc2NlbmFyaW9zIHJlcXVpcmUgY3VzdG9tIHNvbHV0aW9uLCBlZyBpbXBsZW1lbnRpbmcgYHRvSlNPTmAgb3IgdXNpbmcgYHNlcmlhbGl6cmAgbGliLlxuICovXG5mdW5jdGlvbiB0b0pTKHNvdXJjZSwgb3B0aW9ucykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG9wdGlvbnMpIHtcbiAgICBkaWUoXCJ0b0pTIG5vIGxvbmdlciBzdXBwb3J0cyBvcHRpb25zXCIpO1xuICB9XG4gIHJldHVybiB0b0pTSGVscGVyKHNvdXJjZSwgbmV3IE1hcCgpKTtcbn1cblxuZnVuY3Rpb24gdHJhY2UoKSB7XG4gIGlmICghKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGVudGVyQnJlYWtQb2ludCA9IGZhbHNlO1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG4gIGlmICh0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdID09PSBcImJvb2xlYW5cIikge1xuICAgIGVudGVyQnJlYWtQb2ludCA9IGFyZ3MucG9wKCk7XG4gIH1cbiAgdmFyIGRlcml2YXRpb24gPSBnZXRBdG9tRnJvbUFyZ3MoYXJncyk7XG4gIGlmICghZGVyaXZhdGlvbikge1xuICAgIHJldHVybiBkaWUoXCIndHJhY2UoYnJlYWs/KScgY2FuIG9ubHkgYmUgdXNlZCBpbnNpZGUgYSB0cmFja2VkIGNvbXB1dGVkIHZhbHVlIG9yIGEgUmVhY3Rpb24uIENvbnNpZGVyIHBhc3NpbmcgaW4gdGhlIGNvbXB1dGVkIHZhbHVlIG9yIHJlYWN0aW9uIGV4cGxpY2l0bHlcIik7XG4gIH1cbiAgaWYgKGRlcml2YXRpb24uaXNUcmFjaW5nXyA9PT0gVHJhY2VNb2RlLk5PTkUpIHtcbiAgICBjb25zb2xlLmxvZyhcIlttb2J4LnRyYWNlXSAnXCIgKyBkZXJpdmF0aW9uLm5hbWVfICsgXCInIHRyYWNpbmcgZW5hYmxlZFwiKTtcbiAgfVxuICBkZXJpdmF0aW9uLmlzVHJhY2luZ18gPSBlbnRlckJyZWFrUG9pbnQgPyBUcmFjZU1vZGUuQlJFQUsgOiBUcmFjZU1vZGUuTE9HO1xufVxuZnVuY3Rpb24gZ2V0QXRvbUZyb21BcmdzKGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDpcbiAgICAgIHJldHVybiBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb247XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIGdldEF0b20oYXJnc1swXSk7XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIGdldEF0b20oYXJnc1swXSwgYXJnc1sxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEdXJpbmcgYSB0cmFuc2FjdGlvbiBubyB2aWV3cyBhcmUgdXBkYXRlZCB1bnRpbCB0aGUgZW5kIG9mIHRoZSB0cmFuc2FjdGlvbi5cbiAqIFRoZSB0cmFuc2FjdGlvbiB3aWxsIGJlIHJ1biBzeW5jaHJvbm91c2x5IG5vbmV0aGVsZXNzLlxuICpcbiAqIEBwYXJhbSBhY3Rpb24gYSBmdW5jdGlvbiB0aGF0IHVwZGF0ZXMgc29tZSByZWFjdGl2ZSBzdGF0ZVxuICogQHJldHVybnMgYW55IHZhbHVlIHRoYXQgd2FzIHJldHVybmVkIGJ5IHRoZSAnYWN0aW9uJyBwYXJhbWV0ZXIuXG4gKi9cbmZ1bmN0aW9uIHRyYW5zYWN0aW9uKGFjdGlvbiwgdGhpc0FyZykge1xuICBpZiAodGhpc0FyZyA9PT0gdm9pZCAwKSB7XG4gICAgdGhpc0FyZyA9IHVuZGVmaW5lZDtcbiAgfVxuICBzdGFydEJhdGNoKCk7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGFjdGlvbi5hcHBseSh0aGlzQXJnKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBlbmRCYXRjaCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdoZW4ocHJlZGljYXRlLCBhcmcxLCBhcmcyKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxIHx8IGFyZzEgJiYgdHlwZW9mIGFyZzEgPT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gd2hlblByb21pc2UocHJlZGljYXRlLCBhcmcxKTtcbiAgfVxuICByZXR1cm4gX3doZW4ocHJlZGljYXRlLCBhcmcxLCBhcmcyIHx8IHt9KTtcbn1cbmZ1bmN0aW9uIF93aGVuKHByZWRpY2F0ZSwgZWZmZWN0LCBvcHRzKSB7XG4gIHZhciB0aW1lb3V0SGFuZGxlO1xuICBpZiAodHlwZW9mIG9wdHMudGltZW91dCA9PT0gXCJudW1iZXJcIikge1xuICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihcIldIRU5fVElNRU9VVFwiKTtcbiAgICB0aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIWRpc3Bvc2VyWyRtb2J4XS5pc0Rpc3Bvc2VkXykge1xuICAgICAgICBkaXNwb3NlcigpO1xuICAgICAgICBpZiAob3B0cy5vbkVycm9yKSB7XG4gICAgICAgICAgb3B0cy5vbkVycm9yKGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIG9wdHMudGltZW91dCk7XG4gIH1cbiAgb3B0cy5uYW1lID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gb3B0cy5uYW1lIHx8IFwiV2hlbkBcIiArIGdldE5leHRJZCgpIDogXCJXaGVuXCI7XG4gIHZhciBlZmZlY3RBY3Rpb24gPSBjcmVhdGVBY3Rpb24ocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gb3B0cy5uYW1lICsgXCItZWZmZWN0XCIgOiBcIldoZW4tZWZmZWN0XCIsIGVmZmVjdCk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICB2YXIgZGlzcG9zZXIgPSBhdXRvcnVuKGZ1bmN0aW9uIChyKSB7XG4gICAgLy8gcHJlZGljYXRlIHNob3VsZCBub3QgY2hhbmdlIHN0YXRlXG4gICAgdmFyIGNvbmQgPSBhbGxvd1N0YXRlQ2hhbmdlcyhmYWxzZSwgcHJlZGljYXRlKTtcbiAgICBpZiAoY29uZCkge1xuICAgICAgci5kaXNwb3NlKCk7XG4gICAgICBpZiAodGltZW91dEhhbmRsZSkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dEhhbmRsZSk7XG4gICAgICB9XG4gICAgICBlZmZlY3RBY3Rpb24oKTtcbiAgICB9XG4gIH0sIG9wdHMpO1xuICByZXR1cm4gZGlzcG9zZXI7XG59XG5mdW5jdGlvbiB3aGVuUHJvbWlzZShwcmVkaWNhdGUsIG9wdHMpIHtcbiAgdmFyIF9vcHRzJHNpZ25hbDtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBvcHRzICYmIG9wdHMub25FcnJvcikge1xuICAgIHJldHVybiBkaWUoXCJ0aGUgb3B0aW9ucyAnb25FcnJvcicgYW5kICdwcm9taXNlJyBjYW5ub3QgYmUgY29tYmluZWRcIik7XG4gIH1cbiAgaWYgKG9wdHMgIT0gbnVsbCAmJiAoX29wdHMkc2lnbmFsID0gb3B0cy5zaWduYWwpICE9IG51bGwgJiYgX29wdHMkc2lnbmFsLmFib3J0ZWQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJXSEVOX0FCT1JURURcIikpLCB7XG4gICAgICBjYW5jZWw6IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgdmFyIGNhbmNlbDtcbiAgdmFyIGFib3J0O1xuICB2YXIgcmVzID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciBfb3B0cyRzaWduYWwyO1xuICAgIHZhciBkaXNwb3NlciA9IF93aGVuKHByZWRpY2F0ZSwgcmVzb2x2ZSwgX2V4dGVuZHMoe30sIG9wdHMsIHtcbiAgICAgIG9uRXJyb3I6IHJlamVjdFxuICAgIH0pKTtcbiAgICBjYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICBkaXNwb3NlcigpO1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIldIRU5fQ0FOQ0VMTEVEXCIpKTtcbiAgICB9O1xuICAgIGFib3J0ID0gZnVuY3Rpb24gYWJvcnQoKSB7XG4gICAgICBkaXNwb3NlcigpO1xuICAgICAgcmVqZWN0KG5ldyBFcnJvcihcIldIRU5fQUJPUlRFRFwiKSk7XG4gICAgfTtcbiAgICBvcHRzID09IG51bGwgPyB2b2lkIDAgOiAoX29wdHMkc2lnbmFsMiA9IG9wdHMuc2lnbmFsKSA9PSBudWxsID8gdm9pZCAwIDogX29wdHMkc2lnbmFsMi5hZGRFdmVudExpc3RlbmVyID09IG51bGwgPyB2b2lkIDAgOiBfb3B0cyRzaWduYWwyLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBhYm9ydCk7XG4gIH0pW1wiZmluYWxseVwiXShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF9vcHRzJHNpZ25hbDM7XG4gICAgcmV0dXJuIG9wdHMgPT0gbnVsbCA/IHZvaWQgMCA6IChfb3B0cyRzaWduYWwzID0gb3B0cy5zaWduYWwpID09IG51bGwgPyB2b2lkIDAgOiBfb3B0cyRzaWduYWwzLnJlbW92ZUV2ZW50TGlzdGVuZXIgPT0gbnVsbCA/IHZvaWQgMCA6IF9vcHRzJHNpZ25hbDMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGFib3J0KTtcbiAgfSk7XG4gIHJlcy5jYW5jZWwgPSBjYW5jZWw7XG4gIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIGdldEFkbSh0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldFskbW9ieF07XG59XG4vLyBPcHRpbWl6YXRpb246IHdlIGRvbid0IG5lZWQgdGhlIGludGVybWVkaWF0ZSBvYmplY3RzIGFuZCBjb3VsZCBoYXZlIGEgY29tcGxldGVseSBjdXN0b20gYWRtaW5pc3RyYXRpb24gZm9yIER5bmFtaWNPYmplY3RzLFxuLy8gYW5kIHNraXAgZWl0aGVyIHRoZSBpbnRlcm5hbCB2YWx1ZXMgbWFwLCBvciB0aGUgYmFzZSBvYmplY3Qgd2l0aCBpdHMgcHJvcGVydHkgZGVzY3JpcHRvcnMhXG52YXIgb2JqZWN0UHJveHlUcmFwcyA9IHtcbiAgaGFzOiBmdW5jdGlvbiBoYXModGFyZ2V0LCBuYW1lKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb24pIHtcbiAgICAgIHdhcm5BYm91dFByb3h5UmVxdWlyZW1lbnQoXCJkZXRlY3QgbmV3IHByb3BlcnRpZXMgdXNpbmcgdGhlICdpbicgb3BlcmF0b3IuIFVzZSAnaGFzJyBmcm9tICdtb2J4JyBpbnN0ZWFkLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldEFkbSh0YXJnZXQpLmhhc18obmFtZSk7XG4gIH0sXG4gIGdldDogZnVuY3Rpb24gZ2V0KHRhcmdldCwgbmFtZSkge1xuICAgIHJldHVybiBnZXRBZG0odGFyZ2V0KS5nZXRfKG5hbWUpO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uIHNldCh0YXJnZXQsIG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIF9nZXRBZG0kc2V0XztcbiAgICBpZiAoIWlzU3RyaW5naXNoKG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWdldEFkbSh0YXJnZXQpLnZhbHVlc18uaGFzKG5hbWUpKSB7XG4gICAgICB3YXJuQWJvdXRQcm94eVJlcXVpcmVtZW50KFwiYWRkIGEgbmV3IG9ic2VydmFibGUgcHJvcGVydHkgdGhyb3VnaCBkaXJlY3QgYXNzaWdubWVudC4gVXNlICdzZXQnIGZyb20gJ21vYngnIGluc3RlYWQuXCIpO1xuICAgIH1cbiAgICAvLyBudWxsIChpbnRlcmNlcHRlZCkgLT4gdHJ1ZSAoc3VjY2VzcylcbiAgICByZXR1cm4gKF9nZXRBZG0kc2V0XyA9IGdldEFkbSh0YXJnZXQpLnNldF8obmFtZSwgdmFsdWUsIHRydWUpKSAhPSBudWxsID8gX2dldEFkbSRzZXRfIDogdHJ1ZTtcbiAgfSxcbiAgZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uIGRlbGV0ZVByb3BlcnR5KHRhcmdldCwgbmFtZSkge1xuICAgIHZhciBfZ2V0QWRtJGRlbGV0ZV87XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgd2FybkFib3V0UHJveHlSZXF1aXJlbWVudChcImRlbGV0ZSBwcm9wZXJ0aWVzIGZyb20gYW4gb2JzZXJ2YWJsZSBvYmplY3QuIFVzZSAncmVtb3ZlJyBmcm9tICdtb2J4JyBpbnN0ZWFkLlwiKTtcbiAgICB9XG4gICAgaWYgKCFpc1N0cmluZ2lzaChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBudWxsIChpbnRlcmNlcHRlZCkgLT4gdHJ1ZSAoc3VjY2VzcylcbiAgICByZXR1cm4gKF9nZXRBZG0kZGVsZXRlXyA9IGdldEFkbSh0YXJnZXQpLmRlbGV0ZV8obmFtZSwgdHJ1ZSkpICE9IG51bGwgPyBfZ2V0QWRtJGRlbGV0ZV8gOiB0cnVlO1xuICB9LFxuICBkZWZpbmVQcm9wZXJ0eTogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKSB7XG4gICAgdmFyIF9nZXRBZG0kZGVmaW5lUHJvcGVydDtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICB3YXJuQWJvdXRQcm94eVJlcXVpcmVtZW50KFwiZGVmaW5lIHByb3BlcnR5IG9uIGFuIG9ic2VydmFibGUgb2JqZWN0LiBVc2UgJ2RlZmluZVByb3BlcnR5JyBmcm9tICdtb2J4JyBpbnN0ZWFkLlwiKTtcbiAgICB9XG4gICAgLy8gbnVsbCAoaW50ZXJjZXB0ZWQpIC0+IHRydWUgKHN1Y2Nlc3MpXG4gICAgcmV0dXJuIChfZ2V0QWRtJGRlZmluZVByb3BlcnQgPSBnZXRBZG0odGFyZ2V0KS5kZWZpbmVQcm9wZXJ0eV8obmFtZSwgZGVzY3JpcHRvcikpICE9IG51bGwgPyBfZ2V0QWRtJGRlZmluZVByb3BlcnQgOiB0cnVlO1xuICB9LFxuICBvd25LZXlzOiBmdW5jdGlvbiBvd25LZXlzKHRhcmdldCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uKSB7XG4gICAgICB3YXJuQWJvdXRQcm94eVJlcXVpcmVtZW50KFwiaXRlcmF0ZSBrZXlzIHRvIGRldGVjdCBhZGRlZCAvIHJlbW92ZWQgcHJvcGVydGllcy4gVXNlICdrZXlzJyBmcm9tICdtb2J4JyBpbnN0ZWFkLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGdldEFkbSh0YXJnZXQpLm93bktleXNfKCk7XG4gIH0sXG4gIHByZXZlbnRFeHRlbnNpb25zOiBmdW5jdGlvbiBwcmV2ZW50RXh0ZW5zaW9ucyh0YXJnZXQpIHtcbiAgICBkaWUoMTMpO1xuICB9XG59O1xuZnVuY3Rpb24gYXNEeW5hbWljT2JzZXJ2YWJsZU9iamVjdCh0YXJnZXQsIG9wdGlvbnMpIHtcbiAgdmFyIF90YXJnZXQkJG1vYngsIF90YXJnZXQkJG1vYngkcHJveHlfO1xuICBhc3NlcnRQcm94aWVzKCk7XG4gIHRhcmdldCA9IGFzT2JzZXJ2YWJsZU9iamVjdCh0YXJnZXQsIG9wdGlvbnMpO1xuICByZXR1cm4gKF90YXJnZXQkJG1vYngkcHJveHlfID0gKF90YXJnZXQkJG1vYnggPSB0YXJnZXRbJG1vYnhdKS5wcm94eV8pICE9IG51bGwgPyBfdGFyZ2V0JCRtb2J4JHByb3h5XyA6IF90YXJnZXQkJG1vYngucHJveHlfID0gbmV3IFByb3h5KHRhcmdldCwgb2JqZWN0UHJveHlUcmFwcyk7XG59XG5cbmZ1bmN0aW9uIGhhc0ludGVyY2VwdG9ycyhpbnRlcmNlcHRhYmxlKSB7XG4gIHJldHVybiBpbnRlcmNlcHRhYmxlLmludGVyY2VwdG9yc18gIT09IHVuZGVmaW5lZCAmJiBpbnRlcmNlcHRhYmxlLmludGVyY2VwdG9yc18ubGVuZ3RoID4gMDtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVySW50ZXJjZXB0b3IoaW50ZXJjZXB0YWJsZSwgaGFuZGxlcikge1xuICB2YXIgaW50ZXJjZXB0b3JzID0gaW50ZXJjZXB0YWJsZS5pbnRlcmNlcHRvcnNfIHx8IChpbnRlcmNlcHRhYmxlLmludGVyY2VwdG9yc18gPSBbXSk7XG4gIGludGVyY2VwdG9ycy5wdXNoKGhhbmRsZXIpO1xuICByZXR1cm4gb25jZShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlkeCA9IGludGVyY2VwdG9ycy5pbmRleE9mKGhhbmRsZXIpO1xuICAgIGlmIChpZHggIT09IC0xKSB7XG4gICAgICBpbnRlcmNlcHRvcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIGludGVyY2VwdENoYW5nZShpbnRlcmNlcHRhYmxlLCBjaGFuZ2UpIHtcbiAgdmFyIHByZXZVID0gdW50cmFja2VkU3RhcnQoKTtcbiAgdHJ5IHtcbiAgICAvLyBJbnRlcmNlcHRvciBjYW4gbW9kaWZ5IHRoZSBhcnJheSwgY29weSBpdCB0byBhdm9pZCBjb25jdXJyZW50IG1vZGlmaWNhdGlvbiwgc2VlICMxOTUwXG4gICAgdmFyIGludGVyY2VwdG9ycyA9IFtdLmNvbmNhdChpbnRlcmNlcHRhYmxlLmludGVyY2VwdG9yc18gfHwgW10pO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gaW50ZXJjZXB0b3JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgY2hhbmdlID0gaW50ZXJjZXB0b3JzW2ldKGNoYW5nZSk7XG4gICAgICBpZiAoY2hhbmdlICYmICFjaGFuZ2UudHlwZSkge1xuICAgICAgICBkaWUoMTQpO1xuICAgICAgfVxuICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjaGFuZ2U7XG4gIH0gZmluYWxseSB7XG4gICAgdW50cmFja2VkRW5kKHByZXZVKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYXNMaXN0ZW5lcnMobGlzdGVuYWJsZSkge1xuICByZXR1cm4gbGlzdGVuYWJsZS5jaGFuZ2VMaXN0ZW5lcnNfICE9PSB1bmRlZmluZWQgJiYgbGlzdGVuYWJsZS5jaGFuZ2VMaXN0ZW5lcnNfLmxlbmd0aCA+IDA7XG59XG5mdW5jdGlvbiByZWdpc3Rlckxpc3RlbmVyKGxpc3RlbmFibGUsIGhhbmRsZXIpIHtcbiAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmFibGUuY2hhbmdlTGlzdGVuZXJzXyB8fCAobGlzdGVuYWJsZS5jaGFuZ2VMaXN0ZW5lcnNfID0gW10pO1xuICBsaXN0ZW5lcnMucHVzaChoYW5kbGVyKTtcbiAgcmV0dXJuIG9uY2UoZnVuY3Rpb24gKCkge1xuICAgIHZhciBpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZihoYW5kbGVyKTtcbiAgICBpZiAoaWR4ICE9PSAtMSkge1xuICAgICAgbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBub3RpZnlMaXN0ZW5lcnMobGlzdGVuYWJsZSwgY2hhbmdlKSB7XG4gIHZhciBwcmV2VSA9IHVudHJhY2tlZFN0YXJ0KCk7XG4gIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5hYmxlLmNoYW5nZUxpc3RlbmVyc187XG4gIGlmICghbGlzdGVuZXJzKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgpO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBsaXN0ZW5lcnNbaV0oY2hhbmdlKTtcbiAgfVxuICB1bnRyYWNrZWRFbmQocHJldlUpO1xufVxuXG5mdW5jdGlvbiBtYWtlT2JzZXJ2YWJsZSh0YXJnZXQsIGFubm90YXRpb25zLCBvcHRpb25zKSB7XG4gIGluaXRPYnNlcnZhYmxlKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX2Fubm90YXRpb25zO1xuICAgIHZhciBhZG0gPSBhc09ic2VydmFibGVPYmplY3QodGFyZ2V0LCBvcHRpb25zKVskbW9ieF07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBhbm5vdGF0aW9ucyAmJiB0YXJnZXRbc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2xdKSB7XG4gICAgICBkaWUoXCJtYWtlT2JzZXJ2YWJsZSBzZWNvbmQgYXJnIG11c3QgYmUgbnVsbGlzaCB3aGVuIHVzaW5nIGRlY29yYXRvcnMuIE1peGluZyBAZGVjb3JhdG9yIHN5bnRheCB3aXRoIGFubm90YXRpb25zIGlzIG5vdCBzdXBwb3J0ZWQuXCIpO1xuICAgIH1cbiAgICAvLyBEZWZhdWx0IHRvIGRlY29yYXRvcnNcbiAgICAoX2Fubm90YXRpb25zID0gYW5ub3RhdGlvbnMpICE9IG51bGwgPyBfYW5ub3RhdGlvbnMgOiBhbm5vdGF0aW9ucyA9IGNvbGxlY3RTdG9yZWRBbm5vdGF0aW9ucyh0YXJnZXQpO1xuICAgIC8vIEFubm90YXRlXG4gICAgb3duS2V5cyhhbm5vdGF0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gYWRtLm1ha2VfKGtleSwgYW5ub3RhdGlvbnNba2V5XSk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxuLy8gcHJvdG9ba2V5c1N5bWJvbF0gPSBuZXcgU2V0PFByb3BlcnR5S2V5PigpXG52YXIga2V5c1N5bWJvbCA9IC8qI19fUFVSRV9fKi9TeW1ib2woXCJtb2J4LWtleXNcIik7XG5mdW5jdGlvbiBtYWtlQXV0b09ic2VydmFibGUodGFyZ2V0LCBvdmVycmlkZXMsIG9wdGlvbnMpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGlmICghaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmICFpc1BsYWluT2JqZWN0KE9iamVjdC5nZXRQcm90b3R5cGVPZih0YXJnZXQpKSkge1xuICAgICAgZGllKFwiJ21ha2VBdXRvT2JzZXJ2YWJsZScgY2FuIG9ubHkgYmUgdXNlZCBmb3IgY2xhc3NlcyB0aGF0IGRvbid0IGhhdmUgYSBzdXBlcmNsYXNzXCIpO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KHRhcmdldCkpIHtcbiAgICAgIGRpZShcIm1ha2VBdXRvT2JzZXJ2YWJsZSBjYW4gb25seSBiZSB1c2VkIG9uIG9iamVjdHMgbm90IGFscmVhZHkgbWFkZSBvYnNlcnZhYmxlXCIpO1xuICAgIH1cbiAgfVxuICAvLyBPcHRpbWl6YXRpb246IGF2b2lkIHZpc2l0aW5nIHByb3Rvc1xuICAvLyBBc3N1bWVzIHRoYXQgYW5ub3RhdGlvbi5tYWtlXy8uZXh0ZW5kXyB3b3JrcyB0aGUgc2FtZSBmb3IgcGxhaW4gb2JqZWN0c1xuICBpZiAoaXNQbGFpbk9iamVjdCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuIGV4dGVuZE9ic2VydmFibGUodGFyZ2V0LCB0YXJnZXQsIG92ZXJyaWRlcywgb3B0aW9ucyk7XG4gIH1cbiAgaW5pdE9ic2VydmFibGUoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhZG0gPSBhc09ic2VydmFibGVPYmplY3QodGFyZ2V0LCBvcHRpb25zKVskbW9ieF07XG4gICAgLy8gT3B0aW1pemF0aW9uOiBjYWNoZSBrZXlzIG9uIHByb3RvXG4gICAgLy8gQXNzdW1lcyBtYWtlQXV0b09ic2VydmFibGUgY2FuIGJlIGNhbGxlZCBvbmx5IG9uY2UgcGVyIG9iamVjdCBhbmQgY2FuJ3QgYmUgdXNlZCBpbiBzdWJjbGFzc1xuICAgIGlmICghdGFyZ2V0W2tleXNTeW1ib2xdKSB7XG4gICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGFyZ2V0KTtcbiAgICAgIHZhciBrZXlzID0gbmV3IFNldChbXS5jb25jYXQob3duS2V5cyh0YXJnZXQpLCBvd25LZXlzKHByb3RvKSkpO1xuICAgICAga2V5c1tcImRlbGV0ZVwiXShcImNvbnN0cnVjdG9yXCIpO1xuICAgICAga2V5c1tcImRlbGV0ZVwiXSgkbW9ieCk7XG4gICAgICBhZGRIaWRkZW5Qcm9wKHByb3RvLCBrZXlzU3ltYm9sLCBrZXlzKTtcbiAgICB9XG4gICAgdGFyZ2V0W2tleXNTeW1ib2xdLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIGFkbS5tYWtlXyhrZXksXG4gICAgICAvLyBtdXN0IHBhc3MgXCJ1bmRlZmluZWRcIiBmb3IgeyBrZXk6IHVuZGVmaW5lZCB9XG4gICAgICAhb3ZlcnJpZGVzID8gdHJ1ZSA6IGtleSBpbiBvdmVycmlkZXMgPyBvdmVycmlkZXNba2V5XSA6IHRydWUpO1xuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIHRhcmdldDtcbn1cblxudmFyIFNQTElDRSA9IFwic3BsaWNlXCI7XG52YXIgVVBEQVRFID0gXCJ1cGRhdGVcIjtcbnZhciBNQVhfU1BMSUNFX1NJWkUgPSAxMDAwMDsgLy8gU2VlIGUuZy4gaHR0cHM6Ly9naXRodWIuY29tL21vYnhqcy9tb2J4L2lzc3Vlcy84NTlcbnZhciBhcnJheVRyYXBzID0ge1xuICBnZXQ6IGZ1bmN0aW9uIGdldCh0YXJnZXQsIG5hbWUpIHtcbiAgICB2YXIgYWRtID0gdGFyZ2V0WyRtb2J4XTtcbiAgICBpZiAobmFtZSA9PT0gJG1vYngpIHtcbiAgICAgIHJldHVybiBhZG07XG4gICAgfVxuICAgIGlmIChuYW1lID09PSBcImxlbmd0aFwiKSB7XG4gICAgICByZXR1cm4gYWRtLmdldEFycmF5TGVuZ3RoXygpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIgJiYgIWlzTmFOKG5hbWUpKSB7XG4gICAgICByZXR1cm4gYWRtLmdldF8ocGFyc2VJbnQobmFtZSkpO1xuICAgIH1cbiAgICBpZiAoaGFzUHJvcChhcnJheUV4dGVuc2lvbnMsIG5hbWUpKSB7XG4gICAgICByZXR1cm4gYXJyYXlFeHRlbnNpb25zW25hbWVdO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0W25hbWVdO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uIHNldCh0YXJnZXQsIG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIGFkbSA9IHRhcmdldFskbW9ieF07XG4gICAgaWYgKG5hbWUgPT09IFwibGVuZ3RoXCIpIHtcbiAgICAgIGFkbS5zZXRBcnJheUxlbmd0aF8odmFsdWUpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3ltYm9sXCIgfHwgaXNOYU4obmFtZSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBudW1lcmljIHN0cmluZ1xuICAgICAgYWRtLnNldF8ocGFyc2VJbnQobmFtZSksIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIHByZXZlbnRFeHRlbnNpb25zOiBmdW5jdGlvbiBwcmV2ZW50RXh0ZW5zaW9ucygpIHtcbiAgICBkaWUoMTUpO1xuICB9XG59O1xudmFyIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLy8gdGhpcyBpcyB0aGUgcHJvcCB0aGF0IGdldHMgcHJveGllZCwgc28gY2FuJ3QgcmVwbGFjZSBpdCFcblxuICBmdW5jdGlvbiBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbihuYW1lLCBlbmhhbmNlciwgb3duZWRfLCBsZWdhY3lNb2RlXykge1xuICAgIGlmIChuYW1lID09PSB2b2lkIDApIHtcbiAgICAgIG5hbWUgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBcIk9ic2VydmFibGVBcnJheUBcIiArIGdldE5leHRJZCgpIDogXCJPYnNlcnZhYmxlQXJyYXlcIjtcbiAgICB9XG4gICAgdGhpcy5vd25lZF8gPSB2b2lkIDA7XG4gICAgdGhpcy5sZWdhY3lNb2RlXyA9IHZvaWQgMDtcbiAgICB0aGlzLmF0b21fID0gdm9pZCAwO1xuICAgIHRoaXMudmFsdWVzXyA9IFtdO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzXyA9IHZvaWQgMDtcbiAgICB0aGlzLmNoYW5nZUxpc3RlbmVyc18gPSB2b2lkIDA7XG4gICAgdGhpcy5lbmhhbmNlcl8gPSB2b2lkIDA7XG4gICAgdGhpcy5kZWhhbmNlciA9IHZvaWQgMDtcbiAgICB0aGlzLnByb3h5XyA9IHZvaWQgMDtcbiAgICB0aGlzLmxhc3RLbm93bkxlbmd0aF8gPSAwO1xuICAgIHRoaXMub3duZWRfID0gb3duZWRfO1xuICAgIHRoaXMubGVnYWN5TW9kZV8gPSBsZWdhY3lNb2RlXztcbiAgICB0aGlzLmF0b21fID0gbmV3IEF0b20obmFtZSk7XG4gICAgdGhpcy5lbmhhbmNlcl8gPSBmdW5jdGlvbiAobmV3Viwgb2xkVikge1xuICAgICAgcmV0dXJuIGVuaGFuY2VyKG5ld1YsIG9sZFYsIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IG5hbWUgKyBcIlsuLl1cIiA6IFwiT2JzZXJ2YWJsZUFycmF5Wy4uXVwiKTtcbiAgICB9O1xuICB9XG4gIHZhciBfcHJvdG8gPSBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGU7XG4gIF9wcm90by5kZWhhbmNlVmFsdWVfID0gZnVuY3Rpb24gZGVoYW5jZVZhbHVlXyh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmRlaGFuY2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VyKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuICBfcHJvdG8uZGVoYW5jZVZhbHVlc18gPSBmdW5jdGlvbiBkZWhhbmNlVmFsdWVzXyh2YWx1ZXMpIHtcbiAgICBpZiAodGhpcy5kZWhhbmNlciAhPT0gdW5kZWZpbmVkICYmIHZhbHVlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdmFsdWVzLm1hcCh0aGlzLmRlaGFuY2VyKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfTtcbiAgX3Byb3RvLmludGVyY2VwdF8gPSBmdW5jdGlvbiBpbnRlcmNlcHRfKGhhbmRsZXIpIHtcbiAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvcih0aGlzLCBoYW5kbGVyKTtcbiAgfTtcbiAgX3Byb3RvLm9ic2VydmVfID0gZnVuY3Rpb24gb2JzZXJ2ZV8obGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgIGlmIChmaXJlSW1tZWRpYXRlbHkgPT09IHZvaWQgMCkge1xuICAgICAgZmlyZUltbWVkaWF0ZWx5ID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgIGxpc3RlbmVyKHtcbiAgICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwiYXJyYXlcIixcbiAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5XyxcbiAgICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLmF0b21fLm5hbWVfLFxuICAgICAgICB0eXBlOiBcInNwbGljZVwiLFxuICAgICAgICBpbmRleDogMCxcbiAgICAgICAgYWRkZWQ6IHRoaXMudmFsdWVzXy5zbGljZSgpLFxuICAgICAgICBhZGRlZENvdW50OiB0aGlzLnZhbHVlc18ubGVuZ3RoLFxuICAgICAgICByZW1vdmVkOiBbXSxcbiAgICAgICAgcmVtb3ZlZENvdW50OiAwXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZ2lzdGVyTGlzdGVuZXIodGhpcywgbGlzdGVuZXIpO1xuICB9O1xuICBfcHJvdG8uZ2V0QXJyYXlMZW5ndGhfID0gZnVuY3Rpb24gZ2V0QXJyYXlMZW5ndGhfKCkge1xuICAgIHRoaXMuYXRvbV8ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICByZXR1cm4gdGhpcy52YWx1ZXNfLmxlbmd0aDtcbiAgfTtcbiAgX3Byb3RvLnNldEFycmF5TGVuZ3RoXyA9IGZ1bmN0aW9uIHNldEFycmF5TGVuZ3RoXyhuZXdMZW5ndGgpIHtcbiAgICBpZiAodHlwZW9mIG5ld0xlbmd0aCAhPT0gXCJudW1iZXJcIiB8fCBpc05hTihuZXdMZW5ndGgpIHx8IG5ld0xlbmd0aCA8IDApIHtcbiAgICAgIGRpZShcIk91dCBvZiByYW5nZTogXCIgKyBuZXdMZW5ndGgpO1xuICAgIH1cbiAgICB2YXIgY3VycmVudExlbmd0aCA9IHRoaXMudmFsdWVzXy5sZW5ndGg7XG4gICAgaWYgKG5ld0xlbmd0aCA9PT0gY3VycmVudExlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAobmV3TGVuZ3RoID4gY3VycmVudExlbmd0aCkge1xuICAgICAgdmFyIG5ld0l0ZW1zID0gbmV3IEFycmF5KG5ld0xlbmd0aCAtIGN1cnJlbnRMZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdMZW5ndGggLSBjdXJyZW50TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbmV3SXRlbXNbaV0gPSB1bmRlZmluZWQ7XG4gICAgICB9IC8vIE5vIEFycmF5LmZpbGwgZXZlcnl3aGVyZS4uLlxuICAgICAgdGhpcy5zcGxpY2VXaXRoQXJyYXlfKGN1cnJlbnRMZW5ndGgsIDAsIG5ld0l0ZW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zcGxpY2VXaXRoQXJyYXlfKG5ld0xlbmd0aCwgY3VycmVudExlbmd0aCAtIG5ld0xlbmd0aCk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8udXBkYXRlQXJyYXlMZW5ndGhfID0gZnVuY3Rpb24gdXBkYXRlQXJyYXlMZW5ndGhfKG9sZExlbmd0aCwgZGVsdGEpIHtcbiAgICBpZiAob2xkTGVuZ3RoICE9PSB0aGlzLmxhc3RLbm93bkxlbmd0aF8pIHtcbiAgICAgIGRpZSgxNik7XG4gICAgfVxuICAgIHRoaXMubGFzdEtub3duTGVuZ3RoXyArPSBkZWx0YTtcbiAgICBpZiAodGhpcy5sZWdhY3lNb2RlXyAmJiBkZWx0YSA+IDApIHtcbiAgICAgIHJlc2VydmVBcnJheUJ1ZmZlcihvbGRMZW5ndGggKyBkZWx0YSArIDEpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLnNwbGljZVdpdGhBcnJheV8gPSBmdW5jdGlvbiBzcGxpY2VXaXRoQXJyYXlfKGluZGV4LCBkZWxldGVDb3VudCwgbmV3SXRlbXMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkKHRoaXMuYXRvbV8pO1xuICAgIHZhciBsZW5ndGggPSB0aGlzLnZhbHVlc18ubGVuZ3RoO1xuICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpbmRleCA9IDA7XG4gICAgfSBlbHNlIGlmIChpbmRleCA+IGxlbmd0aCkge1xuICAgICAgaW5kZXggPSBsZW5ndGg7XG4gICAgfSBlbHNlIGlmIChpbmRleCA8IDApIHtcbiAgICAgIGluZGV4ID0gTWF0aC5tYXgoMCwgbGVuZ3RoICsgaW5kZXgpO1xuICAgIH1cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZGVsZXRlQ291bnQgPSBsZW5ndGggLSBpbmRleDtcbiAgICB9IGVsc2UgaWYgKGRlbGV0ZUNvdW50ID09PSB1bmRlZmluZWQgfHwgZGVsZXRlQ291bnQgPT09IG51bGwpIHtcbiAgICAgIGRlbGV0ZUNvdW50ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlQ291bnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihkZWxldGVDb3VudCwgbGVuZ3RoIC0gaW5kZXgpKTtcbiAgICB9XG4gICAgaWYgKG5ld0l0ZW1zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG5ld0l0ZW1zID0gRU1QVFlfQVJSQVk7XG4gICAgfVxuICAgIGlmIChoYXNJbnRlcmNlcHRvcnModGhpcykpIHtcbiAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UodGhpcywge1xuICAgICAgICBvYmplY3Q6IHRoaXMucHJveHlfLFxuICAgICAgICB0eXBlOiBTUExJQ0UsXG4gICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgcmVtb3ZlZENvdW50OiBkZWxldGVDb3VudCxcbiAgICAgICAgYWRkZWQ6IG5ld0l0ZW1zXG4gICAgICB9KTtcbiAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgIHJldHVybiBFTVBUWV9BUlJBWTtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZUNvdW50ID0gY2hhbmdlLnJlbW92ZWRDb3VudDtcbiAgICAgIG5ld0l0ZW1zID0gY2hhbmdlLmFkZGVkO1xuICAgIH1cbiAgICBuZXdJdGVtcyA9IG5ld0l0ZW1zLmxlbmd0aCA9PT0gMCA/IG5ld0l0ZW1zIDogbmV3SXRlbXMubWFwKGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gX3RoaXMuZW5oYW5jZXJfKHYsIHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gICAgaWYgKHRoaXMubGVnYWN5TW9kZV8gfHwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICB2YXIgbGVuZ3RoRGVsdGEgPSBuZXdJdGVtcy5sZW5ndGggLSBkZWxldGVDb3VudDtcbiAgICAgIHRoaXMudXBkYXRlQXJyYXlMZW5ndGhfKGxlbmd0aCwgbGVuZ3RoRGVsdGEpOyAvLyBjaGVja3MgaWYgaW50ZXJuYWwgYXJyYXkgd2Fzbid0IG1vZGlmaWVkXG4gICAgfVxuXG4gICAgdmFyIHJlcyA9IHRoaXMuc3BsaWNlSXRlbXNJbnRvVmFsdWVzXyhpbmRleCwgZGVsZXRlQ291bnQsIG5ld0l0ZW1zKTtcbiAgICBpZiAoZGVsZXRlQ291bnQgIT09IDAgfHwgbmV3SXRlbXMubGVuZ3RoICE9PSAwKSB7XG4gICAgICB0aGlzLm5vdGlmeUFycmF5U3BsaWNlXyhpbmRleCwgbmV3SXRlbXMsIHJlcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRlaGFuY2VWYWx1ZXNfKHJlcyk7XG4gIH07XG4gIF9wcm90by5zcGxpY2VJdGVtc0ludG9WYWx1ZXNfID0gZnVuY3Rpb24gc3BsaWNlSXRlbXNJbnRvVmFsdWVzXyhpbmRleCwgZGVsZXRlQ291bnQsIG5ld0l0ZW1zKSB7XG4gICAgaWYgKG5ld0l0ZW1zLmxlbmd0aCA8IE1BWF9TUExJQ0VfU0laRSkge1xuICAgICAgdmFyIF90aGlzJHZhbHVlc187XG4gICAgICByZXR1cm4gKF90aGlzJHZhbHVlc18gPSB0aGlzLnZhbHVlc18pLnNwbGljZS5hcHBseShfdGhpcyR2YWx1ZXNfLCBbaW5kZXgsIGRlbGV0ZUNvdW50XS5jb25jYXQobmV3SXRlbXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhlIGl0ZW1zIHJlbW92ZWQgYnkgdGhlIHNwbGljZVxuICAgICAgdmFyIHJlcyA9IHRoaXMudmFsdWVzXy5zbGljZShpbmRleCwgaW5kZXggKyBkZWxldGVDb3VudCk7XG4gICAgICAvLyBUaGUgaXRlbXMgdGhhdCB0aGF0IHNob3VsZCByZW1haW4gYXQgdGhlIGVuZCBvZiB0aGUgYXJyYXlcbiAgICAgIHZhciBvbGRJdGVtcyA9IHRoaXMudmFsdWVzXy5zbGljZShpbmRleCArIGRlbGV0ZUNvdW50KTtcbiAgICAgIC8vIE5ldyBsZW5ndGggaXMgdGhlIHByZXZpb3VzIGxlbmd0aCArIGFkZGl0aW9uIGNvdW50IC0gZGVsZXRpb24gY291bnRcbiAgICAgIHRoaXMudmFsdWVzXy5sZW5ndGggKz0gbmV3SXRlbXMubGVuZ3RoIC0gZGVsZXRlQ291bnQ7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld0l0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMudmFsdWVzX1tpbmRleCArIGldID0gbmV3SXRlbXNbaV07XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgb2xkSXRlbXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHRoaXMudmFsdWVzX1tpbmRleCArIG5ld0l0ZW1zLmxlbmd0aCArIF9pXSA9IG9sZEl0ZW1zW19pXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICB9O1xuICBfcHJvdG8ubm90aWZ5QXJyYXlDaGlsZFVwZGF0ZV8gPSBmdW5jdGlvbiBub3RpZnlBcnJheUNoaWxkVXBkYXRlXyhpbmRleCwgbmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgdmFyIG5vdGlmeVNweSA9ICF0aGlzLm93bmVkXyAmJiBpc1NweUVuYWJsZWQoKTtcbiAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKHRoaXMpO1xuICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5ID8ge1xuICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwiYXJyYXlcIixcbiAgICAgIG9iamVjdDogdGhpcy5wcm94eV8sXG4gICAgICB0eXBlOiBVUERBVEUsXG4gICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMuYXRvbV8ubmFtZV8sXG4gICAgICBpbmRleDogaW5kZXgsXG4gICAgICBuZXdWYWx1ZTogbmV3VmFsdWUsXG4gICAgICBvbGRWYWx1ZTogb2xkVmFsdWVcbiAgICB9IDogbnVsbDtcbiAgICAvLyBUaGUgcmVhc29uIHdoeSB0aGlzIGlzIG9uIHJpZ2h0IGhhbmQgc2lkZSBoZXJlIChhbmQgbm90IGFib3ZlKSwgaXMgdGhpcyB3YXkgdGhlIHVnbGlmaWVyIHdpbGwgZHJvcCBpdCwgYnV0IGl0IHdvbid0XG4gICAgLy8gY2F1c2UgYW55IHJ1bnRpbWUgb3ZlcmhlYWQgaW4gZGV2ZWxvcG1lbnQgbW9kZSB3aXRob3V0IE5PREVfRU5WIHNldCwgdW5sZXNzIHNweWluZyBpcyBlbmFibGVkXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgIHNweVJlcG9ydFN0YXJ0KGNoYW5nZSk7XG4gICAgfVxuICAgIHRoaXMuYXRvbV8ucmVwb3J0Q2hhbmdlZCgpO1xuICAgIGlmIChub3RpZnkpIHtcbiAgICAgIG5vdGlmeUxpc3RlbmVycyh0aGlzLCBjaGFuZ2UpO1xuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgc3B5UmVwb3J0RW5kKCk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8ubm90aWZ5QXJyYXlTcGxpY2VfID0gZnVuY3Rpb24gbm90aWZ5QXJyYXlTcGxpY2VfKGluZGV4LCBhZGRlZCwgcmVtb3ZlZCkge1xuICAgIHZhciBub3RpZnlTcHkgPSAhdGhpcy5vd25lZF8gJiYgaXNTcHlFbmFibGVkKCk7XG4gICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyh0aGlzKTtcbiAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweSA/IHtcbiAgICAgIG9ic2VydmFibGVLaW5kOiBcImFycmF5XCIsXG4gICAgICBvYmplY3Q6IHRoaXMucHJveHlfLFxuICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLmF0b21fLm5hbWVfLFxuICAgICAgdHlwZTogU1BMSUNFLFxuICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgcmVtb3ZlZDogcmVtb3ZlZCxcbiAgICAgIGFkZGVkOiBhZGRlZCxcbiAgICAgIHJlbW92ZWRDb3VudDogcmVtb3ZlZC5sZW5ndGgsXG4gICAgICBhZGRlZENvdW50OiBhZGRlZC5sZW5ndGhcbiAgICB9IDogbnVsbDtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgc3B5UmVwb3J0U3RhcnQoY2hhbmdlKTtcbiAgICB9XG4gICAgdGhpcy5hdG9tXy5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgLy8gY29uZm9ybTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvb2JzZXJ2ZVxuICAgIGlmIChub3RpZnkpIHtcbiAgICAgIG5vdGlmeUxpc3RlbmVycyh0aGlzLCBjaGFuZ2UpO1xuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgc3B5UmVwb3J0RW5kKCk7XG4gICAgfVxuICB9O1xuICBfcHJvdG8uZ2V0XyA9IGZ1bmN0aW9uIGdldF8oaW5kZXgpIHtcbiAgICBpZiAodGhpcy5sZWdhY3lNb2RlXyAmJiBpbmRleCA+PSB0aGlzLnZhbHVlc18ubGVuZ3RoKSB7XG4gICAgICBjb25zb2xlLndhcm4ocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJbbW9ieC5hcnJheV0gQXR0ZW1wdCB0byByZWFkIGFuIGFycmF5IGluZGV4IChcIiArIGluZGV4ICsgXCIpIHRoYXQgaXMgb3V0IG9mIGJvdW5kcyAoXCIgKyB0aGlzLnZhbHVlc18ubGVuZ3RoICsgXCIpLiBQbGVhc2UgY2hlY2sgbGVuZ3RoIGZpcnN0LiBPdXQgb2YgYm91bmQgaW5kaWNlcyB3aWxsIG5vdCBiZSB0cmFja2VkIGJ5IE1vYlhcIiA6IFwiW21vYnhdIE91dCBvZiBib3VuZHMgcmVhZDogXCIgKyBpbmRleCk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICB0aGlzLmF0b21fLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgcmV0dXJuIHRoaXMuZGVoYW5jZVZhbHVlXyh0aGlzLnZhbHVlc19baW5kZXhdKTtcbiAgfTtcbiAgX3Byb3RvLnNldF8gPSBmdW5jdGlvbiBzZXRfKGluZGV4LCBuZXdWYWx1ZSkge1xuICAgIHZhciB2YWx1ZXMgPSB0aGlzLnZhbHVlc187XG4gICAgaWYgKHRoaXMubGVnYWN5TW9kZV8gJiYgaW5kZXggPiB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAvLyBvdXQgb2YgYm91bmRzXG4gICAgICBkaWUoMTcsIGluZGV4LCB2YWx1ZXMubGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKGluZGV4IDwgdmFsdWVzLmxlbmd0aCkge1xuICAgICAgLy8gdXBkYXRlIGF0IGluZGV4IGluIHJhbmdlXG4gICAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCh0aGlzLmF0b21fKTtcbiAgICAgIHZhciBvbGRWYWx1ZSA9IHZhbHVlc1tpbmRleF07XG4gICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzKHRoaXMpKSB7XG4gICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UodGhpcywge1xuICAgICAgICAgIHR5cGU6IFVQREFURSxcbiAgICAgICAgICBvYmplY3Q6IHRoaXMucHJveHlfLFxuICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG5ld1ZhbHVlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgICAgfVxuICAgICAgbmV3VmFsdWUgPSB0aGlzLmVuaGFuY2VyXyhuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgdmFyIGNoYW5nZWQgPSBuZXdWYWx1ZSAhPT0gb2xkVmFsdWU7XG4gICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICB2YWx1ZXNbaW5kZXhdID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMubm90aWZ5QXJyYXlDaGlsZFVwZGF0ZV8oaW5kZXgsIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZvciBvdXQgb2YgYm91bmQgaW5kZXgsIHdlIGRvbid0IGNyZWF0ZSBhbiBhY3R1YWwgc3BhcnNlIGFycmF5LFxuICAgICAgLy8gYnV0IHJhdGhlciBmaWxsIHRoZSBob2xlcyB3aXRoIHVuZGVmaW5lZCAoc2FtZSBhcyBzZXRBcnJheUxlbmd0aF8pLlxuICAgICAgLy8gVGhpcyBjb3VsZCBiZSBjb25zaWRlcmVkIGEgYnVnLlxuICAgICAgdmFyIG5ld0l0ZW1zID0gbmV3IEFycmF5KGluZGV4ICsgMSAtIHZhbHVlcy5sZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdJdGVtcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgbmV3SXRlbXNbaV0gPSB1bmRlZmluZWQ7XG4gICAgICB9IC8vIE5vIEFycmF5LmZpbGwgZXZlcnl3aGVyZS4uLlxuICAgICAgbmV3SXRlbXNbbmV3SXRlbXMubGVuZ3RoIC0gMV0gPSBuZXdWYWx1ZTtcbiAgICAgIHRoaXMuc3BsaWNlV2l0aEFycmF5Xyh2YWx1ZXMubGVuZ3RoLCAwLCBuZXdJdGVtcyk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb247XG59KCk7XG5mdW5jdGlvbiBjcmVhdGVPYnNlcnZhYmxlQXJyYXkoaW5pdGlhbFZhbHVlcywgZW5oYW5jZXIsIG5hbWUsIG93bmVkKSB7XG4gIGlmIChuYW1lID09PSB2b2lkIDApIHtcbiAgICBuYW1lID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gXCJPYnNlcnZhYmxlQXJyYXlAXCIgKyBnZXROZXh0SWQoKSA6IFwiT2JzZXJ2YWJsZUFycmF5XCI7XG4gIH1cbiAgaWYgKG93bmVkID09PSB2b2lkIDApIHtcbiAgICBvd25lZCA9IGZhbHNlO1xuICB9XG4gIGFzc2VydFByb3hpZXMoKTtcbiAgcmV0dXJuIGluaXRPYnNlcnZhYmxlKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYWRtID0gbmV3IE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uKG5hbWUsIGVuaGFuY2VyLCBvd25lZCwgZmFsc2UpO1xuICAgIGFkZEhpZGRlbkZpbmFsUHJvcChhZG0udmFsdWVzXywgJG1vYngsIGFkbSk7XG4gICAgdmFyIHByb3h5ID0gbmV3IFByb3h5KGFkbS52YWx1ZXNfLCBhcnJheVRyYXBzKTtcbiAgICBhZG0ucHJveHlfID0gcHJveHk7XG4gICAgaWYgKGluaXRpYWxWYWx1ZXMgJiYgaW5pdGlhbFZhbHVlcy5sZW5ndGgpIHtcbiAgICAgIGFkbS5zcGxpY2VXaXRoQXJyYXlfKDAsIDAsIGluaXRpYWxWYWx1ZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcHJveHk7XG4gIH0pO1xufVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG52YXIgYXJyYXlFeHRlbnNpb25zID0ge1xuICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3BsaWNlKDApO1xuICB9LFxuICByZXBsYWNlOiBmdW5jdGlvbiByZXBsYWNlKG5ld0l0ZW1zKSB7XG4gICAgdmFyIGFkbSA9IHRoaXNbJG1vYnhdO1xuICAgIHJldHVybiBhZG0uc3BsaWNlV2l0aEFycmF5XygwLCBhZG0udmFsdWVzXy5sZW5ndGgsIG5ld0l0ZW1zKTtcbiAgfSxcbiAgLy8gVXNlZCBieSBKU09OLnN0cmluZ2lmeVxuICB0b0pTT046IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy5zbGljZSgpO1xuICB9LFxuICAvKlxuICAgKiBmdW5jdGlvbnMgdGhhdCBkbyBhbHRlciB0aGUgaW50ZXJuYWwgc3RydWN0dXJlIG9mIHRoZSBhcnJheSwgKGJhc2VkIG9uIGxpYi5lczYuZC50cylcbiAgICogc2luY2UgdGhlc2UgZnVuY3Rpb25zIGFsdGVyIHRoZSBpbm5lciBzdHJ1Y3R1cmUgb2YgdGhlIGFycmF5LCB0aGUgaGF2ZSBzaWRlIGVmZmVjdHMuXG4gICAqIEJlY2F1c2UgdGhlIGhhdmUgc2lkZSBlZmZlY3RzLCB0aGV5IHNob3VsZCBub3QgYmUgdXNlZCBpbiBjb21wdXRlZCBmdW5jdGlvbixcbiAgICogYW5kIGZvciB0aGF0IHJlYXNvbiB0aGUgZG8gbm90IGNhbGwgZGVwZW5kZW5jeVN0YXRlLm5vdGlmeU9ic2VydmVkXG4gICAqL1xuICBzcGxpY2U6IGZ1bmN0aW9uIHNwbGljZShpbmRleCwgZGVsZXRlQ291bnQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbmV3SXRlbXMgPSBuZXcgQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgbmV3SXRlbXNbX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cbiAgICB2YXIgYWRtID0gdGhpc1skbW9ieF07XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIGFkbS5zcGxpY2VXaXRoQXJyYXlfKGluZGV4KTtcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIGFkbS5zcGxpY2VXaXRoQXJyYXlfKGluZGV4LCBkZWxldGVDb3VudCk7XG4gICAgfVxuICAgIHJldHVybiBhZG0uc3BsaWNlV2l0aEFycmF5XyhpbmRleCwgZGVsZXRlQ291bnQsIG5ld0l0ZW1zKTtcbiAgfSxcbiAgc3BsaWNlV2l0aEFycmF5OiBmdW5jdGlvbiBzcGxpY2VXaXRoQXJyYXkoaW5kZXgsIGRlbGV0ZUNvdW50LCBuZXdJdGVtcykge1xuICAgIHJldHVybiB0aGlzWyRtb2J4XS5zcGxpY2VXaXRoQXJyYXlfKGluZGV4LCBkZWxldGVDb3VudCwgbmV3SXRlbXMpO1xuICB9LFxuICBwdXNoOiBmdW5jdGlvbiBwdXNoKCkge1xuICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4XTtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGl0ZW1zID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICBpdGVtc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cbiAgICBhZG0uc3BsaWNlV2l0aEFycmF5XyhhZG0udmFsdWVzXy5sZW5ndGgsIDAsIGl0ZW1zKTtcbiAgICByZXR1cm4gYWRtLnZhbHVlc18ubGVuZ3RoO1xuICB9LFxuICBwb3A6IGZ1bmN0aW9uIHBvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5zcGxpY2UoTWF0aC5tYXgodGhpc1skbW9ieF0udmFsdWVzXy5sZW5ndGggLSAxLCAwKSwgMSlbMF07XG4gIH0sXG4gIHNoaWZ0OiBmdW5jdGlvbiBzaGlmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5zcGxpY2UoMCwgMSlbMF07XG4gIH0sXG4gIHVuc2hpZnQ6IGZ1bmN0aW9uIHVuc2hpZnQoKSB7XG4gICAgdmFyIGFkbSA9IHRoaXNbJG1vYnhdO1xuICAgIGZvciAodmFyIF9sZW4zID0gYXJndW1lbnRzLmxlbmd0aCwgaXRlbXMgPSBuZXcgQXJyYXkoX2xlbjMpLCBfa2V5MyA9IDA7IF9rZXkzIDwgX2xlbjM7IF9rZXkzKyspIHtcbiAgICAgIGl0ZW1zW19rZXkzXSA9IGFyZ3VtZW50c1tfa2V5M107XG4gICAgfVxuICAgIGFkbS5zcGxpY2VXaXRoQXJyYXlfKDAsIDAsIGl0ZW1zKTtcbiAgICByZXR1cm4gYWRtLnZhbHVlc18ubGVuZ3RoO1xuICB9LFxuICByZXZlcnNlOiBmdW5jdGlvbiByZXZlcnNlKCkge1xuICAgIC8vIHJldmVyc2UgYnkgZGVmYXVsdCBtdXRhdGVzIGluIHBsYWNlIGJlZm9yZSByZXR1cm5pbmcgdGhlIHJlc3VsdFxuICAgIC8vIHdoaWNoIG1ha2VzIGl0IGJvdGggYSAnZGVyaXZhdGlvbicgYW5kIGEgJ211dGF0aW9uJy5cbiAgICBpZiAoZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uKSB7XG4gICAgICBkaWUoMzcsIFwicmV2ZXJzZVwiKTtcbiAgICB9XG4gICAgdGhpcy5yZXBsYWNlKHRoaXMuc2xpY2UoKS5yZXZlcnNlKCkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBzb3J0OiBmdW5jdGlvbiBzb3J0KCkge1xuICAgIC8vIHNvcnQgYnkgZGVmYXVsdCBtdXRhdGVzIGluIHBsYWNlIGJlZm9yZSByZXR1cm5pbmcgdGhlIHJlc3VsdFxuICAgIC8vIHdoaWNoIGdvZXMgYWdhaW5zdCBhbGwgZ29vZCBwcmFjdGljZXMuIExldCdzIG5vdCBjaGFuZ2UgdGhlIGFycmF5IGluIHBsYWNlIVxuICAgIGlmIChnbG9iYWxTdGF0ZS50cmFja2luZ0Rlcml2YXRpb24pIHtcbiAgICAgIGRpZSgzNywgXCJzb3J0XCIpO1xuICAgIH1cbiAgICB2YXIgY29weSA9IHRoaXMuc2xpY2UoKTtcbiAgICBjb3B5LnNvcnQuYXBwbHkoY29weSwgYXJndW1lbnRzKTtcbiAgICB0aGlzLnJlcGxhY2UoY29weSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKHZhbHVlKSB7XG4gICAgdmFyIGFkbSA9IHRoaXNbJG1vYnhdO1xuICAgIHZhciBpZHggPSBhZG0uZGVoYW5jZVZhbHVlc18oYWRtLnZhbHVlc18pLmluZGV4T2YodmFsdWUpO1xuICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgdGhpcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG4vKipcbiAqIFdyYXAgZnVuY3Rpb24gZnJvbSBwcm90b3R5cGVcbiAqIFdpdGhvdXQgdGhpcywgZXZlcnl0aGluZyB3b3JrcyBhcyB3ZWxsLCBidXQgdGhpcyB3b3Jrc1xuICogZmFzdGVyIGFzIGV2ZXJ5dGhpbmcgd29ya3Mgb24gdW5wcm94aWVkIHZhbHVlc1xuICovXG5hZGRBcnJheUV4dGVuc2lvbihcImF0XCIsIHNpbXBsZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJjb25jYXRcIiwgc2ltcGxlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcImZsYXRcIiwgc2ltcGxlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcImluY2x1ZGVzXCIsIHNpbXBsZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJpbmRleE9mXCIsIHNpbXBsZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJqb2luXCIsIHNpbXBsZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJsYXN0SW5kZXhPZlwiLCBzaW1wbGVGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwic2xpY2VcIiwgc2ltcGxlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcInRvU3RyaW5nXCIsIHNpbXBsZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJ0b0xvY2FsZVN0cmluZ1wiLCBzaW1wbGVGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwidG9Tb3J0ZWRcIiwgc2ltcGxlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcInRvU3BsaWNlZFwiLCBzaW1wbGVGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwid2l0aFwiLCBzaW1wbGVGdW5jKTtcbi8vIG1hcFxuYWRkQXJyYXlFeHRlbnNpb24oXCJldmVyeVwiLCBtYXBMaWtlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcImZpbHRlclwiLCBtYXBMaWtlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcImZpbmRcIiwgbWFwTGlrZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJmaW5kSW5kZXhcIiwgbWFwTGlrZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJmaW5kTGFzdFwiLCBtYXBMaWtlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcImZpbmRMYXN0SW5kZXhcIiwgbWFwTGlrZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJmbGF0TWFwXCIsIG1hcExpa2VGdW5jKTtcbmFkZEFycmF5RXh0ZW5zaW9uKFwiZm9yRWFjaFwiLCBtYXBMaWtlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcIm1hcFwiLCBtYXBMaWtlRnVuYyk7XG5hZGRBcnJheUV4dGVuc2lvbihcInNvbWVcIiwgbWFwTGlrZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJ0b1JldmVyc2VkXCIsIG1hcExpa2VGdW5jKTtcbi8vIHJlZHVjZVxuYWRkQXJyYXlFeHRlbnNpb24oXCJyZWR1Y2VcIiwgcmVkdWNlTGlrZUZ1bmMpO1xuYWRkQXJyYXlFeHRlbnNpb24oXCJyZWR1Y2VSaWdodFwiLCByZWR1Y2VMaWtlRnVuYyk7XG5mdW5jdGlvbiBhZGRBcnJheUV4dGVuc2lvbihmdW5jTmFtZSwgZnVuY0ZhY3RvcnkpIHtcbiAgaWYgKHR5cGVvZiBBcnJheS5wcm90b3R5cGVbZnVuY05hbWVdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBhcnJheUV4dGVuc2lvbnNbZnVuY05hbWVdID0gZnVuY0ZhY3RvcnkoZnVuY05hbWUpO1xuICB9XG59XG4vLyBSZXBvcnQgYW5kIGRlbGVnYXRlIHRvIGRlaGFuY2VkIGFycmF5XG5mdW5jdGlvbiBzaW1wbGVGdW5jKGZ1bmNOYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFkbSA9IHRoaXNbJG1vYnhdO1xuICAgIGFkbS5hdG9tXy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgIHZhciBkZWhhbmNlZFZhbHVlcyA9IGFkbS5kZWhhbmNlVmFsdWVzXyhhZG0udmFsdWVzXyk7XG4gICAgcmV0dXJuIGRlaGFuY2VkVmFsdWVzW2Z1bmNOYW1lXS5hcHBseShkZWhhbmNlZFZhbHVlcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbi8vIE1ha2Ugc3VyZSBjYWxsYmFja3MgcmVjZWl2ZSBjb3JyZWN0IGFycmF5IGFyZyAjMjMyNlxuZnVuY3Rpb24gbWFwTGlrZUZ1bmMoZnVuY05hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4XTtcbiAgICBhZG0uYXRvbV8ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICB2YXIgZGVoYW5jZWRWYWx1ZXMgPSBhZG0uZGVoYW5jZVZhbHVlc18oYWRtLnZhbHVlc18pO1xuICAgIHJldHVybiBkZWhhbmNlZFZhbHVlc1tmdW5jTmFtZV0oZnVuY3Rpb24gKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBlbGVtZW50LCBpbmRleCwgX3RoaXMyKTtcbiAgICB9KTtcbiAgfTtcbn1cbi8vIE1ha2Ugc3VyZSBjYWxsYmFja3MgcmVjZWl2ZSBjb3JyZWN0IGFycmF5IGFyZyAjMjMyNlxuZnVuY3Rpb24gcmVkdWNlTGlrZUZ1bmMoZnVuY05hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcbiAgICB2YXIgYWRtID0gdGhpc1skbW9ieF07XG4gICAgYWRtLmF0b21fLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgdmFyIGRlaGFuY2VkVmFsdWVzID0gYWRtLmRlaGFuY2VWYWx1ZXNfKGFkbS52YWx1ZXNfKTtcbiAgICAvLyAjMjQzMiAtIHJlZHVjZSBiZWhhdmlvciBkZXBlbmRzIG9uIGFyZ3VtZW50cy5sZW5ndGhcbiAgICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMF07XG4gICAgYXJndW1lbnRzWzBdID0gZnVuY3Rpb24gKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUsIGluZGV4KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSwgaW5kZXgsIF90aGlzMyk7XG4gICAgfTtcbiAgICByZXR1cm4gZGVoYW5jZWRWYWx1ZXNbZnVuY05hbWVdLmFwcGx5KGRlaGFuY2VkVmFsdWVzLCBhcmd1bWVudHMpO1xuICB9O1xufVxudmFyIGlzT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24gPSAvKiNfX1BVUkVfXyovY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZShcIk9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uXCIsIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uKTtcbmZ1bmN0aW9uIGlzT2JzZXJ2YWJsZUFycmF5KHRoaW5nKSB7XG4gIHJldHVybiBpc09iamVjdCh0aGluZykgJiYgaXNPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbih0aGluZ1skbW9ieF0pO1xufVxuXG52YXIgX1N5bWJvbCRpdGVyYXRvciwgX1N5bWJvbCR0b1N0cmluZ1RhZztcbnZhciBPYnNlcnZhYmxlTWFwTWFya2VyID0ge307XG52YXIgQUREID0gXCJhZGRcIjtcbnZhciBERUxFVEUgPSBcImRlbGV0ZVwiO1xuLy8ganVzdCBleHRlbmQgTWFwPyBTZWUgYWxzbyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9uZXN0aGFydXMvMTNiNGQ3NGYyZWY0YTJmNDM1N2RiZDNmYzIzYzFlNTRcbi8vIEJ1dDogaHR0cHM6Ly9naXRodWIuY29tL21vYnhqcy9tb2J4L2lzc3Vlcy8xNTU2XG5fU3ltYm9sJGl0ZXJhdG9yID0gU3ltYm9sLml0ZXJhdG9yO1xuX1N5bWJvbCR0b1N0cmluZ1RhZyA9IFN5bWJvbC50b1N0cmluZ1RhZztcbnZhciBPYnNlcnZhYmxlTWFwID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgLy8gaGFzTWFwLCBub3QgaGFzaE1hcCA+LSkuXG5cbiAgZnVuY3Rpb24gT2JzZXJ2YWJsZU1hcChpbml0aWFsRGF0YSwgZW5oYW5jZXJfLCBuYW1lXykge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgaWYgKGVuaGFuY2VyXyA9PT0gdm9pZCAwKSB7XG4gICAgICBlbmhhbmNlcl8gPSBkZWVwRW5oYW5jZXI7XG4gICAgfVxuICAgIGlmIChuYW1lXyA9PT0gdm9pZCAwKSB7XG4gICAgICBuYW1lXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiT2JzZXJ2YWJsZU1hcEBcIiArIGdldE5leHRJZCgpIDogXCJPYnNlcnZhYmxlTWFwXCI7XG4gICAgfVxuICAgIHRoaXMuZW5oYW5jZXJfID0gdm9pZCAwO1xuICAgIHRoaXMubmFtZV8gPSB2b2lkIDA7XG4gICAgdGhpc1skbW9ieF0gPSBPYnNlcnZhYmxlTWFwTWFya2VyO1xuICAgIHRoaXMuZGF0YV8gPSB2b2lkIDA7XG4gICAgdGhpcy5oYXNNYXBfID0gdm9pZCAwO1xuICAgIHRoaXMua2V5c0F0b21fID0gdm9pZCAwO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzXyA9IHZvaWQgMDtcbiAgICB0aGlzLmNoYW5nZUxpc3RlbmVyc18gPSB2b2lkIDA7XG4gICAgdGhpcy5kZWhhbmNlciA9IHZvaWQgMDtcbiAgICB0aGlzLmVuaGFuY2VyXyA9IGVuaGFuY2VyXztcbiAgICB0aGlzLm5hbWVfID0gbmFtZV87XG4gICAgaWYgKCFpc0Z1bmN0aW9uKE1hcCkpIHtcbiAgICAgIGRpZSgxOCk7XG4gICAgfVxuICAgIGluaXRPYnNlcnZhYmxlKGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzLmtleXNBdG9tXyA9IGNyZWF0ZUF0b20ocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gX3RoaXMubmFtZV8gKyBcIi5rZXlzKClcIiA6IFwiT2JzZXJ2YWJsZU1hcC5rZXlzKClcIik7XG4gICAgICBfdGhpcy5kYXRhXyA9IG5ldyBNYXAoKTtcbiAgICAgIF90aGlzLmhhc01hcF8gPSBuZXcgTWFwKCk7XG4gICAgICBpZiAoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgX3RoaXMubWVyZ2UoaW5pdGlhbERhdGEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHZhciBfcHJvdG8gPSBPYnNlcnZhYmxlTWFwLnByb3RvdHlwZTtcbiAgX3Byb3RvLmhhc18gPSBmdW5jdGlvbiBoYXNfKGtleSkge1xuICAgIHJldHVybiB0aGlzLmRhdGFfLmhhcyhrZXkpO1xuICB9O1xuICBfcHJvdG8uaGFzID0gZnVuY3Rpb24gaGFzKGtleSkge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuICAgIGlmICghZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNfKGtleSk7XG4gICAgfVxuICAgIHZhciBlbnRyeSA9IHRoaXMuaGFzTWFwXy5nZXQoa2V5KTtcbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICB2YXIgbmV3RW50cnkgPSBlbnRyeSA9IG5ldyBPYnNlcnZhYmxlVmFsdWUodGhpcy5oYXNfKGtleSksIHJlZmVyZW5jZUVuaGFuY2VyLCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB0aGlzLm5hbWVfICsgXCIuXCIgKyBzdHJpbmdpZnlLZXkoa2V5KSArIFwiP1wiIDogXCJPYnNlcnZhYmxlTWFwLmtleT9cIiwgZmFsc2UpO1xuICAgICAgdGhpcy5oYXNNYXBfLnNldChrZXksIG5ld0VudHJ5KTtcbiAgICAgIG9uQmVjb21lVW5vYnNlcnZlZChuZXdFbnRyeSwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLmhhc01hcF9bXCJkZWxldGVcIl0oa2V5KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZW50cnkuZ2V0KCk7XG4gIH07XG4gIF9wcm90by5zZXQgPSBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIHZhciBoYXNLZXkgPSB0aGlzLmhhc18oa2V5KTtcbiAgICBpZiAoaGFzSW50ZXJjZXB0b3JzKHRoaXMpKSB7XG4gICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKHRoaXMsIHtcbiAgICAgICAgdHlwZTogaGFzS2V5ID8gVVBEQVRFIDogQURELFxuICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgIG5ld1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgbmFtZToga2V5XG4gICAgICB9KTtcbiAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgfVxuICAgIGlmIChoYXNLZXkpIHtcbiAgICAgIHRoaXMudXBkYXRlVmFsdWVfKGtleSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZFZhbHVlXyhrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIF9wcm90b1tcImRlbGV0ZVwiXSA9IGZ1bmN0aW9uIF9kZWxldGUoa2V5KSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG4gICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQodGhpcy5rZXlzQXRvbV8pO1xuICAgIGlmIChoYXNJbnRlcmNlcHRvcnModGhpcykpIHtcbiAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UodGhpcywge1xuICAgICAgICB0eXBlOiBERUxFVEUsXG4gICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgbmFtZToga2V5XG4gICAgICB9KTtcbiAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaGFzXyhrZXkpKSB7XG4gICAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkKCk7XG4gICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKHRoaXMpO1xuICAgICAgdmFyIF9jaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5ID8ge1xuICAgICAgICBvYnNlcnZhYmxlS2luZDogXCJtYXBcIixcbiAgICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgICB0eXBlOiBERUxFVEUsXG4gICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgb2xkVmFsdWU6IHRoaXMuZGF0YV8uZ2V0KGtleSkudmFsdWVfLFxuICAgICAgICBuYW1lOiBrZXlcbiAgICAgIH0gOiBudWxsO1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgICAgc3B5UmVwb3J0U3RhcnQoX2NoYW5nZSk7XG4gICAgICB9IC8vIFRPRE8gZml4IHR5cGVcbiAgICAgIHRyYW5zYWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzMyRoYXNNYXBfJGdldDtcbiAgICAgICAgX3RoaXMzLmtleXNBdG9tXy5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgIChfdGhpczMkaGFzTWFwXyRnZXQgPSBfdGhpczMuaGFzTWFwXy5nZXQoa2V5KSkgPT0gbnVsbCA/IHZvaWQgMCA6IF90aGlzMyRoYXNNYXBfJGdldC5zZXROZXdWYWx1ZV8oZmFsc2UpO1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSA9IF90aGlzMy5kYXRhXy5nZXQoa2V5KTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zZXROZXdWYWx1ZV8odW5kZWZpbmVkKTtcbiAgICAgICAgX3RoaXMzLmRhdGFfW1wiZGVsZXRlXCJdKGtleSk7XG4gICAgICB9KTtcbiAgICAgIGlmIChub3RpZnkpIHtcbiAgICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIF9jaGFuZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgICAgc3B5UmVwb3J0RW5kKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuICBfcHJvdG8udXBkYXRlVmFsdWVfID0gZnVuY3Rpb24gdXBkYXRlVmFsdWVfKGtleSwgbmV3VmFsdWUpIHtcbiAgICB2YXIgb2JzZXJ2YWJsZSA9IHRoaXMuZGF0YV8uZ2V0KGtleSk7XG4gICAgbmV3VmFsdWUgPSBvYnNlcnZhYmxlLnByZXBhcmVOZXdWYWx1ZV8obmV3VmFsdWUpO1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gZ2xvYmFsU3RhdGUuVU5DSEFOR0VEKSB7XG4gICAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkKCk7XG4gICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKHRoaXMpO1xuICAgICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHkgPyB7XG4gICAgICAgIG9ic2VydmFibGVLaW5kOiBcIm1hcFwiLFxuICAgICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMubmFtZV8sXG4gICAgICAgIHR5cGU6IFVQREFURSxcbiAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICBvbGRWYWx1ZTogb2JzZXJ2YWJsZS52YWx1ZV8sXG4gICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICB9IDogbnVsbDtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICAgIHNweVJlcG9ydFN0YXJ0KGNoYW5nZSk7XG4gICAgICB9IC8vIFRPRE8gZml4IHR5cGVcbiAgICAgIG9ic2VydmFibGUuc2V0TmV3VmFsdWVfKG5ld1ZhbHVlKTtcbiAgICAgIGlmIChub3RpZnkpIHtcbiAgICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIGNoYW5nZSk7XG4gICAgICB9XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIF9wcm90by5hZGRWYWx1ZV8gPSBmdW5jdGlvbiBhZGRWYWx1ZV8oa2V5LCBuZXdWYWx1ZSkge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkKHRoaXMua2V5c0F0b21fKTtcbiAgICB0cmFuc2FjdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgX3RoaXM0JGhhc01hcF8kZ2V0O1xuICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZVZhbHVlKG5ld1ZhbHVlLCBfdGhpczQuZW5oYW5jZXJfLCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyBfdGhpczQubmFtZV8gKyBcIi5cIiArIHN0cmluZ2lmeUtleShrZXkpIDogXCJPYnNlcnZhYmxlTWFwLmtleVwiLCBmYWxzZSk7XG4gICAgICBfdGhpczQuZGF0YV8uc2V0KGtleSwgb2JzZXJ2YWJsZSk7XG4gICAgICBuZXdWYWx1ZSA9IG9ic2VydmFibGUudmFsdWVfOyAvLyB2YWx1ZSBtaWdodCBoYXZlIGJlZW4gY2hhbmdlZFxuICAgICAgKF90aGlzNCRoYXNNYXBfJGdldCA9IF90aGlzNC5oYXNNYXBfLmdldChrZXkpKSA9PSBudWxsID8gdm9pZCAwIDogX3RoaXM0JGhhc01hcF8kZ2V0LnNldE5ld1ZhbHVlXyh0cnVlKTtcbiAgICAgIF90aGlzNC5rZXlzQXRvbV8ucmVwb3J0Q2hhbmdlZCgpO1xuICAgIH0pO1xuICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQoKTtcbiAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKHRoaXMpO1xuICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5ID8ge1xuICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwibWFwXCIsXG4gICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMubmFtZV8sXG4gICAgICB0eXBlOiBBREQsXG4gICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICBuYW1lOiBrZXksXG4gICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICB9IDogbnVsbDtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgc3B5UmVwb3J0U3RhcnQoY2hhbmdlKTtcbiAgICB9IC8vIFRPRE8gZml4IHR5cGVcbiAgICBpZiAobm90aWZ5KSB7XG4gICAgICBub3RpZnlMaXN0ZW5lcnModGhpcywgY2hhbmdlKTtcbiAgICB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgIH1cbiAgfTtcbiAgX3Byb3RvLmdldCA9IGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICBpZiAodGhpcy5oYXMoa2V5KSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVoYW5jZVZhbHVlXyh0aGlzLmRhdGFfLmdldChrZXkpLmdldCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGVoYW5jZVZhbHVlXyh1bmRlZmluZWQpO1xuICB9O1xuICBfcHJvdG8uZGVoYW5jZVZhbHVlXyA9IGZ1bmN0aW9uIGRlaGFuY2VWYWx1ZV8odmFsdWUpIHtcbiAgICBpZiAodGhpcy5kZWhhbmNlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWhhbmNlcih2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbiAgX3Byb3RvLmtleXMgPSBmdW5jdGlvbiBrZXlzKCkge1xuICAgIHRoaXMua2V5c0F0b21fLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgcmV0dXJuIHRoaXMuZGF0YV8ua2V5cygpO1xuICB9O1xuICBfcHJvdG8udmFsdWVzID0gZnVuY3Rpb24gdmFsdWVzKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIga2V5cyA9IHRoaXMua2V5cygpO1xuICAgIHJldHVybiBtYWtlSXRlcmFibGUoe1xuICAgICAgbmV4dDogZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgdmFyIF9rZXlzJG5leHQgPSBrZXlzLm5leHQoKSxcbiAgICAgICAgICBkb25lID0gX2tleXMkbmV4dC5kb25lLFxuICAgICAgICAgIHZhbHVlID0gX2tleXMkbmV4dC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBkb25lOiBkb25lLFxuICAgICAgICAgIHZhbHVlOiBkb25lID8gdW5kZWZpbmVkIDogc2VsZi5nZXQodmFsdWUpXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIF9wcm90by5lbnRyaWVzID0gZnVuY3Rpb24gZW50cmllcygpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGtleXMgPSB0aGlzLmtleXMoKTtcbiAgICByZXR1cm4gbWFrZUl0ZXJhYmxlKHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgIHZhciBfa2V5cyRuZXh0MiA9IGtleXMubmV4dCgpLFxuICAgICAgICAgIGRvbmUgPSBfa2V5cyRuZXh0Mi5kb25lLFxuICAgICAgICAgIHZhbHVlID0gX2tleXMkbmV4dDIudmFsdWU7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZG9uZTogZG9uZSxcbiAgICAgICAgICB2YWx1ZTogZG9uZSA/IHVuZGVmaW5lZCA6IFt2YWx1ZSwgc2VsZi5nZXQodmFsdWUpXVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICBfcHJvdG9bX1N5bWJvbCRpdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW50cmllcygpO1xuICB9O1xuICBfcHJvdG8uZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKHRoaXMpLCBfc3RlcDsgIShfc3RlcCA9IF9pdGVyYXRvcigpKS5kb25lOykge1xuICAgICAgdmFyIF9zdGVwJHZhbHVlID0gX3N0ZXAudmFsdWUsXG4gICAgICAgIGtleSA9IF9zdGVwJHZhbHVlWzBdLFxuICAgICAgICB2YWx1ZSA9IF9zdGVwJHZhbHVlWzFdO1xuICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwga2V5LCB0aGlzKTtcbiAgICB9XG4gIH1cbiAgLyoqIE1lcmdlIGFub3RoZXIgb2JqZWN0IGludG8gdGhpcyBvYmplY3QsIHJldHVybnMgdGhpcy4gKi87XG4gIF9wcm90by5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKG90aGVyKSB7XG4gICAgdmFyIF90aGlzNSA9IHRoaXM7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU1hcChvdGhlcikpIHtcbiAgICAgIG90aGVyID0gbmV3IE1hcChvdGhlcik7XG4gICAgfVxuICAgIHRyYW5zYWN0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChpc1BsYWluT2JqZWN0KG90aGVyKSkge1xuICAgICAgICBnZXRQbGFpbk9iamVjdEtleXMob3RoZXIpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHJldHVybiBfdGhpczUuc2V0KGtleSwgb3RoZXJba2V5XSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG90aGVyKSkge1xuICAgICAgICBvdGhlci5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgdmFyIGtleSA9IF9yZWZbMF0sXG4gICAgICAgICAgICB2YWx1ZSA9IF9yZWZbMV07XG4gICAgICAgICAgcmV0dXJuIF90aGlzNS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChpc0VTNk1hcChvdGhlcikpIHtcbiAgICAgICAgaWYgKG90aGVyLmNvbnN0cnVjdG9yICE9PSBNYXApIHtcbiAgICAgICAgICBkaWUoMTksIG90aGVyKTtcbiAgICAgICAgfVxuICAgICAgICBvdGhlci5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgcmV0dXJuIF90aGlzNS5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChvdGhlciAhPT0gbnVsbCAmJiBvdGhlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRpZSgyMCwgb3RoZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBfcHJvdG8uY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICB2YXIgX3RoaXM2ID0gdGhpcztcbiAgICB0cmFuc2FjdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICB1bnRyYWNrZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShfdGhpczYua2V5cygpKSwgX3N0ZXAyOyAhKF9zdGVwMiA9IF9pdGVyYXRvcjIoKSkuZG9uZTspIHtcbiAgICAgICAgICB2YXIga2V5ID0gX3N0ZXAyLnZhbHVlO1xuICAgICAgICAgIF90aGlzNltcImRlbGV0ZVwiXShrZXkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbiAgX3Byb3RvLnJlcGxhY2UgPSBmdW5jdGlvbiByZXBsYWNlKHZhbHVlcykge1xuICAgIHZhciBfdGhpczcgPSB0aGlzO1xuICAgIC8vIEltcGxlbWVudGF0aW9uIHJlcXVpcmVtZW50czpcbiAgICAvLyAtIHJlc3BlY3Qgb3JkZXJpbmcgb2YgcmVwbGFjZW1lbnQgbWFwXG4gICAgLy8gLSBhbGxvdyBpbnRlcmNlcHRvcnMgdG8gcnVuIGFuZCBwb3RlbnRpYWxseSBwcmV2ZW50IGluZGl2aWR1YWwgb3BlcmF0aW9uc1xuICAgIC8vIC0gZG9uJ3QgcmVjcmVhdGUgb2JzZXJ2YWJsZXMgdGhhdCBhbHJlYWR5IGV4aXN0IGluIG9yaWdpbmFsIG1hcCAoc28gd2UgZG9uJ3QgZGVzdHJveSBleGlzdGluZyBzdWJzY3JpcHRpb25zKVxuICAgIC8vIC0gZG9uJ3QgX2tleXNBdG9tLnJlcG9ydENoYW5nZWQgaWYgdGhlIGtleXMgb2YgcmVzdWx0aW5nIG1hcCBhcmUgaW5kZW50aWNhbCAob3JkZXIgbWF0dGVycyEpXG4gICAgLy8gLSBub3RlIHRoYXQgcmVzdWx0IG1hcCBtYXkgZGlmZmVyIGZyb20gcmVwbGFjZW1lbnQgbWFwIGR1ZSB0byB0aGUgaW50ZXJjZXB0b3JzXG4gICAgdHJhbnNhY3Rpb24oZnVuY3Rpb24gKCkge1xuICAgICAgLy8gQ29udmVydCB0byBtYXAgc28gd2UgY2FuIGRvIHF1aWNrIGtleSBsb29rdXBzXG4gICAgICB2YXIgcmVwbGFjZW1lbnRNYXAgPSBjb252ZXJ0VG9NYXAodmFsdWVzKTtcbiAgICAgIHZhciBvcmRlcmVkRGF0YSA9IG5ldyBNYXAoKTtcbiAgICAgIC8vIFVzZWQgZm9yIG9wdGltaXphdGlvblxuICAgICAgdmFyIGtleXNSZXBvcnRDaGFuZ2VkQ2FsbGVkID0gZmFsc2U7XG4gICAgICAvLyBEZWxldGUga2V5cyB0aGF0IGRvbid0IGV4aXN0IGluIHJlcGxhY2VtZW50IG1hcFxuICAgICAgLy8gaWYgdGhlIGtleSBkZWxldGlvbiBpcyBwcmV2ZW50ZWQgYnkgaW50ZXJjZXB0b3JcbiAgICAgIC8vIGFkZCBlbnRyeSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSByZXN1bHQgbWFwXG4gICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXJMb29zZShfdGhpczcuZGF0YV8ua2V5cygpKSwgX3N0ZXAzOyAhKF9zdGVwMyA9IF9pdGVyYXRvcjMoKSkuZG9uZTspIHtcbiAgICAgICAgdmFyIGtleSA9IF9zdGVwMy52YWx1ZTtcbiAgICAgICAgLy8gQ29uY3VycmVudGx5IGl0ZXJhdGluZy9kZWxldGluZyBrZXlzXG4gICAgICAgIC8vIGl0ZXJhdG9yIHNob3VsZCBoYW5kbGUgdGhpcyBjb3JyZWN0bHlcbiAgICAgICAgaWYgKCFyZXBsYWNlbWVudE1hcC5oYXMoa2V5KSkge1xuICAgICAgICAgIHZhciBkZWxldGVkID0gX3RoaXM3W1wiZGVsZXRlXCJdKGtleSk7XG4gICAgICAgICAgLy8gV2FzIHRoZSBrZXkgcmVtb3ZlZD9cbiAgICAgICAgICBpZiAoZGVsZXRlZCkge1xuICAgICAgICAgICAgLy8gX2tleXNBdG9tLnJlcG9ydENoYW5nZWQoKSB3YXMgYWxyZWFkeSBjYWxsZWRcbiAgICAgICAgICAgIGtleXNSZXBvcnRDaGFuZ2VkQ2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gRGVsZXRlIHByZXZlbnRlZCBieSBpbnRlcmNlcHRvclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gX3RoaXM3LmRhdGFfLmdldChrZXkpO1xuICAgICAgICAgICAgb3JkZXJlZERhdGEuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gTWVyZ2UgZW50cmllc1xuICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yNCA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UocmVwbGFjZW1lbnRNYXAuZW50cmllcygpKSwgX3N0ZXA0OyAhKF9zdGVwNCA9IF9pdGVyYXRvcjQoKSkuZG9uZTspIHtcbiAgICAgICAgdmFyIF9zdGVwNCR2YWx1ZSA9IF9zdGVwNC52YWx1ZSxcbiAgICAgICAgICBfa2V5ID0gX3N0ZXA0JHZhbHVlWzBdLFxuICAgICAgICAgIF92YWx1ZSA9IF9zdGVwNCR2YWx1ZVsxXTtcbiAgICAgICAgLy8gV2Ugd2lsbCB3YW50IHRvIGtub3cgd2hldGhlciBhIG5ldyBrZXkgaXMgYWRkZWRcbiAgICAgICAgdmFyIGtleUV4aXN0ZWQgPSBfdGhpczcuZGF0YV8uaGFzKF9rZXkpO1xuICAgICAgICAvLyBBZGQgb3IgdXBkYXRlIHZhbHVlXG4gICAgICAgIF90aGlzNy5zZXQoX2tleSwgX3ZhbHVlKTtcbiAgICAgICAgLy8gVGhlIGFkZGl0aW9uIGNvdWxkIGhhdmUgYmVlbiBwcmV2ZW50IGJ5IGludGVyY2VwdG9yXG4gICAgICAgIGlmIChfdGhpczcuZGF0YV8uaGFzKF9rZXkpKSB7XG4gICAgICAgICAgLy8gVGhlIHVwZGF0ZSBjb3VsZCBoYXZlIGJlZW4gcHJldmVudGVkIGJ5IGludGVyY2VwdG9yXG4gICAgICAgICAgLy8gYW5kIGFsc28gd2Ugd2FudCB0byBwcmVzZXJ2ZSBleGlzdGluZyB2YWx1ZXNcbiAgICAgICAgICAvLyBzbyB1c2UgdmFsdWUgZnJvbSBfZGF0YSBtYXAgKGluc3RlYWQgb2YgcmVwbGFjZW1lbnQgbWFwKVxuICAgICAgICAgIHZhciBfdmFsdWUyID0gX3RoaXM3LmRhdGFfLmdldChfa2V5KTtcbiAgICAgICAgICBvcmRlcmVkRGF0YS5zZXQoX2tleSwgX3ZhbHVlMik7XG4gICAgICAgICAgLy8gV2FzIGEgbmV3IGtleSBhZGRlZD9cbiAgICAgICAgICBpZiAoIWtleUV4aXN0ZWQpIHtcbiAgICAgICAgICAgIC8vIF9rZXlzQXRvbS5yZXBvcnRDaGFuZ2VkKCkgd2FzIGFscmVhZHkgY2FsbGVkXG4gICAgICAgICAgICBrZXlzUmVwb3J0Q2hhbmdlZENhbGxlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBDaGVjayBmb3IgcG9zc2libGUga2V5IG9yZGVyIGNoYW5nZVxuICAgICAgaWYgKCFrZXlzUmVwb3J0Q2hhbmdlZENhbGxlZCkge1xuICAgICAgICBpZiAoX3RoaXM3LmRhdGFfLnNpemUgIT09IG9yZGVyZWREYXRhLnNpemUpIHtcbiAgICAgICAgICAvLyBJZiBzaXplIGRpZmZlcnMsIGtleXMgYXJlIGRlZmluaXRlbHkgbW9kaWZpZWRcbiAgICAgICAgICBfdGhpczcua2V5c0F0b21fLnJlcG9ydENoYW5nZWQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgaXRlcjEgPSBfdGhpczcuZGF0YV8ua2V5cygpO1xuICAgICAgICAgIHZhciBpdGVyMiA9IG9yZGVyZWREYXRhLmtleXMoKTtcbiAgICAgICAgICB2YXIgbmV4dDEgPSBpdGVyMS5uZXh0KCk7XG4gICAgICAgICAgdmFyIG5leHQyID0gaXRlcjIubmV4dCgpO1xuICAgICAgICAgIHdoaWxlICghbmV4dDEuZG9uZSkge1xuICAgICAgICAgICAgaWYgKG5leHQxLnZhbHVlICE9PSBuZXh0Mi52YWx1ZSkge1xuICAgICAgICAgICAgICBfdGhpczcua2V5c0F0b21fLnJlcG9ydENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0MSA9IGl0ZXIxLm5leHQoKTtcbiAgICAgICAgICAgIG5leHQyID0gaXRlcjIubmV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gVXNlIGNvcnJlY3RseSBvcmRlcmVkIG1hcFxuICAgICAgX3RoaXM3LmRhdGFfID0gb3JkZXJlZERhdGE7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIF9wcm90by50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgT2JzZXJ2YWJsZU1hcF1cIjtcbiAgfTtcbiAgX3Byb3RvLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzKTtcbiAgfTtcbiAgLyoqXG4gICAqIE9ic2VydmVzIHRoaXMgb2JqZWN0LiBUcmlnZ2VycyBmb3IgdGhlIGV2ZW50cyAnYWRkJywgJ3VwZGF0ZScgYW5kICdkZWxldGUnLlxuICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9vYnNlcnZlXG4gICAqIGZvciBjYWxsYmFjayBkZXRhaWxzXG4gICAqL1xuICBfcHJvdG8ub2JzZXJ2ZV8gPSBmdW5jdGlvbiBvYnNlcnZlXyhsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBmaXJlSW1tZWRpYXRlbHkgPT09IHRydWUpIHtcbiAgICAgIGRpZShcImBvYnNlcnZlYCBkb2Vzbid0IHN1cHBvcnQgZmlyZUltbWVkaWF0ZWx5PXRydWUgaW4gY29tYmluYXRpb24gd2l0aCBtYXBzLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZ2lzdGVyTGlzdGVuZXIodGhpcywgbGlzdGVuZXIpO1xuICB9O1xuICBfcHJvdG8uaW50ZXJjZXB0XyA9IGZ1bmN0aW9uIGludGVyY2VwdF8oaGFuZGxlcikge1xuICAgIHJldHVybiByZWdpc3RlckludGVyY2VwdG9yKHRoaXMsIGhhbmRsZXIpO1xuICB9O1xuICBfY3JlYXRlQ2xhc3MoT2JzZXJ2YWJsZU1hcCwgW3tcbiAgICBrZXk6IFwic2l6ZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdGhpcy5rZXlzQXRvbV8ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICAgIHJldHVybiB0aGlzLmRhdGFfLnNpemU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBfU3ltYm9sJHRvU3RyaW5nVGFnLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIFwiTWFwXCI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBPYnNlcnZhYmxlTWFwO1xufSgpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG52YXIgaXNPYnNlcnZhYmxlTWFwID0gLyojX19QVVJFX18qL2NyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUoXCJPYnNlcnZhYmxlTWFwXCIsIE9ic2VydmFibGVNYXApO1xuZnVuY3Rpb24gY29udmVydFRvTWFwKGRhdGFTdHJ1Y3R1cmUpIHtcbiAgaWYgKGlzRVM2TWFwKGRhdGFTdHJ1Y3R1cmUpIHx8IGlzT2JzZXJ2YWJsZU1hcChkYXRhU3RydWN0dXJlKSkge1xuICAgIHJldHVybiBkYXRhU3RydWN0dXJlO1xuICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YVN0cnVjdHVyZSkpIHtcbiAgICByZXR1cm4gbmV3IE1hcChkYXRhU3RydWN0dXJlKTtcbiAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGRhdGFTdHJ1Y3R1cmUpKSB7XG4gICAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YVN0cnVjdHVyZSkge1xuICAgICAgbWFwLnNldChrZXksIGRhdGFTdHJ1Y3R1cmVba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRpZSgyMSwgZGF0YVN0cnVjdHVyZSk7XG4gIH1cbn1cblxudmFyIF9TeW1ib2wkaXRlcmF0b3IkMSwgX1N5bWJvbCR0b1N0cmluZ1RhZyQxO1xudmFyIE9ic2VydmFibGVTZXRNYXJrZXIgPSB7fTtcbl9TeW1ib2wkaXRlcmF0b3IkMSA9IFN5bWJvbC5pdGVyYXRvcjtcbl9TeW1ib2wkdG9TdHJpbmdUYWckMSA9IFN5bWJvbC50b1N0cmluZ1RhZztcbnZhciBPYnNlcnZhYmxlU2V0ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gT2JzZXJ2YWJsZVNldChpbml0aWFsRGF0YSwgZW5oYW5jZXIsIG5hbWVfKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICBpZiAoZW5oYW5jZXIgPT09IHZvaWQgMCkge1xuICAgICAgZW5oYW5jZXIgPSBkZWVwRW5oYW5jZXI7XG4gICAgfVxuICAgIGlmIChuYW1lXyA9PT0gdm9pZCAwKSB7XG4gICAgICBuYW1lXyA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiT2JzZXJ2YWJsZVNldEBcIiArIGdldE5leHRJZCgpIDogXCJPYnNlcnZhYmxlU2V0XCI7XG4gICAgfVxuICAgIHRoaXMubmFtZV8gPSB2b2lkIDA7XG4gICAgdGhpc1skbW9ieF0gPSBPYnNlcnZhYmxlU2V0TWFya2VyO1xuICAgIHRoaXMuZGF0YV8gPSBuZXcgU2V0KCk7XG4gICAgdGhpcy5hdG9tXyA9IHZvaWQgMDtcbiAgICB0aGlzLmNoYW5nZUxpc3RlbmVyc18gPSB2b2lkIDA7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnNfID0gdm9pZCAwO1xuICAgIHRoaXMuZGVoYW5jZXIgPSB2b2lkIDA7XG4gICAgdGhpcy5lbmhhbmNlcl8gPSB2b2lkIDA7XG4gICAgdGhpcy5uYW1lXyA9IG5hbWVfO1xuICAgIGlmICghaXNGdW5jdGlvbihTZXQpKSB7XG4gICAgICBkaWUoMjIpO1xuICAgIH1cbiAgICB0aGlzLmVuaGFuY2VyXyA9IGZ1bmN0aW9uIChuZXdWLCBvbGRWKSB7XG4gICAgICByZXR1cm4gZW5oYW5jZXIobmV3Viwgb2xkViwgbmFtZV8pO1xuICAgIH07XG4gICAgaW5pdE9ic2VydmFibGUoZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYXRvbV8gPSBjcmVhdGVBdG9tKF90aGlzLm5hbWVfKTtcbiAgICAgIGlmIChpbml0aWFsRGF0YSkge1xuICAgICAgICBfdGhpcy5yZXBsYWNlKGluaXRpYWxEYXRhKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICB2YXIgX3Byb3RvID0gT2JzZXJ2YWJsZVNldC5wcm90b3R5cGU7XG4gIF9wcm90by5kZWhhbmNlVmFsdWVfID0gZnVuY3Rpb24gZGVoYW5jZVZhbHVlXyh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmRlaGFuY2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VyKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuICBfcHJvdG8uY2xlYXIgPSBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcbiAgICB0cmFuc2FjdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICB1bnRyYWNrZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlckxvb3NlKF90aGlzMi5kYXRhXy52YWx1ZXMoKSksIF9zdGVwOyAhKF9zdGVwID0gX2l0ZXJhdG9yKCkpLmRvbmU7KSB7XG4gICAgICAgICAgdmFyIHZhbHVlID0gX3N0ZXAudmFsdWU7XG4gICAgICAgICAgX3RoaXMyW1wiZGVsZXRlXCJdKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG4gIF9wcm90by5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja0ZuLCB0aGlzQXJnKSB7XG4gICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IF9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyTG9vc2UodGhpcyksIF9zdGVwMjsgIShfc3RlcDIgPSBfaXRlcmF0b3IyKCkpLmRvbmU7KSB7XG4gICAgICB2YXIgdmFsdWUgPSBfc3RlcDIudmFsdWU7XG4gICAgICBjYWxsYmFja0ZuLmNhbGwodGhpc0FyZywgdmFsdWUsIHZhbHVlLCB0aGlzKTtcbiAgICB9XG4gIH07XG4gIF9wcm90by5hZGQgPSBmdW5jdGlvbiBhZGQodmFsdWUpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcbiAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCh0aGlzLmF0b21fKTtcbiAgICBpZiAoaGFzSW50ZXJjZXB0b3JzKHRoaXMpKSB7XG4gICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKHRoaXMsIHtcbiAgICAgICAgdHlwZTogQURELFxuICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgIG5ld1ZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG4gICAgICBpZiAoIWNoYW5nZSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIC8vIGlkZWFsbHksIHZhbHVlID0gY2hhbmdlLnZhbHVlIHdvdWxkIGJlIGRvbmUgaGVyZSwgc28gdGhhdCB2YWx1ZXMgY2FuIGJlXG4gICAgICAvLyBjaGFuZ2VkIGJ5IGludGVyY2VwdG9yLiBTYW1lIGFwcGxpZXMgZm9yIG90aGVyIFNldCBhbmQgTWFwIGFwaSdzLlxuICAgIH1cblxuICAgIGlmICghdGhpcy5oYXModmFsdWUpKSB7XG4gICAgICB0cmFuc2FjdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMy5kYXRhXy5hZGQoX3RoaXMzLmVuaGFuY2VyXyh2YWx1ZSwgdW5kZWZpbmVkKSk7XG4gICAgICAgIF90aGlzMy5hdG9tXy5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICB9KTtcbiAgICAgIHZhciBub3RpZnlTcHkgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgaXNTcHlFbmFibGVkKCk7XG4gICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKHRoaXMpO1xuICAgICAgdmFyIF9jaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5ID8ge1xuICAgICAgICBvYnNlcnZhYmxlS2luZDogXCJzZXRcIixcbiAgICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgICB0eXBlOiBBREQsXG4gICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgbmV3VmFsdWU6IHZhbHVlXG4gICAgICB9IDogbnVsbDtcbiAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIHNweVJlcG9ydFN0YXJ0KF9jaGFuZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKG5vdGlmeSkge1xuICAgICAgICBub3RpZnlMaXN0ZW5lcnModGhpcywgX2NoYW5nZSk7XG4gICAgICB9XG4gICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBzcHlSZXBvcnRFbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIF9wcm90b1tcImRlbGV0ZVwiXSA9IGZ1bmN0aW9uIF9kZWxldGUodmFsdWUpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcbiAgICBpZiAoaGFzSW50ZXJjZXB0b3JzKHRoaXMpKSB7XG4gICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlKHRoaXMsIHtcbiAgICAgICAgdHlwZTogREVMRVRFLFxuICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgIG9sZFZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG4gICAgICBpZiAoIWNoYW5nZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmhhcyh2YWx1ZSkpIHtcbiAgICAgIHZhciBub3RpZnlTcHkgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgaXNTcHlFbmFibGVkKCk7XG4gICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKHRoaXMpO1xuICAgICAgdmFyIF9jaGFuZ2UyID0gbm90aWZ5IHx8IG5vdGlmeVNweSA/IHtcbiAgICAgICAgb2JzZXJ2YWJsZUtpbmQ6IFwic2V0XCIsXG4gICAgICAgIGRlYnVnT2JqZWN0TmFtZTogdGhpcy5uYW1lXyxcbiAgICAgICAgdHlwZTogREVMRVRFLFxuICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgIG9sZFZhbHVlOiB2YWx1ZVxuICAgICAgfSA6IG51bGw7XG4gICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBzcHlSZXBvcnRTdGFydChfY2hhbmdlMik7XG4gICAgICB9XG4gICAgICB0cmFuc2FjdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzNC5hdG9tXy5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgIF90aGlzNC5kYXRhX1tcImRlbGV0ZVwiXSh2YWx1ZSk7XG4gICAgICB9KTtcbiAgICAgIGlmIChub3RpZnkpIHtcbiAgICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIF9jaGFuZ2UyKTtcbiAgICAgIH1cbiAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbiAgX3Byb3RvLmhhcyA9IGZ1bmN0aW9uIGhhcyh2YWx1ZSkge1xuICAgIHRoaXMuYXRvbV8ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICByZXR1cm4gdGhpcy5kYXRhXy5oYXModGhpcy5kZWhhbmNlVmFsdWVfKHZhbHVlKSk7XG4gIH07XG4gIF9wcm90by5lbnRyaWVzID0gZnVuY3Rpb24gZW50cmllcygpIHtcbiAgICB2YXIgbmV4dEluZGV4ID0gMDtcbiAgICB2YXIga2V5cyA9IEFycmF5LmZyb20odGhpcy5rZXlzKCkpO1xuICAgIHZhciB2YWx1ZXMgPSBBcnJheS5mcm9tKHRoaXMudmFsdWVzKCkpO1xuICAgIHJldHVybiBtYWtlSXRlcmFibGUoe1xuICAgICAgbmV4dDogZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gbmV4dEluZGV4O1xuICAgICAgICBuZXh0SW5kZXggKz0gMTtcbiAgICAgICAgcmV0dXJuIGluZGV4IDwgdmFsdWVzLmxlbmd0aCA/IHtcbiAgICAgICAgICB2YWx1ZTogW2tleXNbaW5kZXhdLCB2YWx1ZXNbaW5kZXhdXSxcbiAgICAgICAgICBkb25lOiBmYWxzZVxuICAgICAgICB9IDoge1xuICAgICAgICAgIGRvbmU6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgX3Byb3RvLmtleXMgPSBmdW5jdGlvbiBrZXlzKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlcygpO1xuICB9O1xuICBfcHJvdG8udmFsdWVzID0gZnVuY3Rpb24gdmFsdWVzKCkge1xuICAgIHRoaXMuYXRvbV8ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIG5leHRJbmRleCA9IDA7XG4gICAgdmFyIG9ic2VydmFibGVWYWx1ZXMgPSBBcnJheS5mcm9tKHRoaXMuZGF0YV8udmFsdWVzKCkpO1xuICAgIHJldHVybiBtYWtlSXRlcmFibGUoe1xuICAgICAgbmV4dDogZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIG5leHRJbmRleCA8IG9ic2VydmFibGVWYWx1ZXMubGVuZ3RoID8ge1xuICAgICAgICAgIHZhbHVlOiBzZWxmLmRlaGFuY2VWYWx1ZV8ob2JzZXJ2YWJsZVZhbHVlc1tuZXh0SW5kZXgrK10pLFxuICAgICAgICAgIGRvbmU6IGZhbHNlXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgZG9uZTogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuICBfcHJvdG8ucmVwbGFjZSA9IGZ1bmN0aW9uIHJlcGxhY2Uob3RoZXIpIHtcbiAgICB2YXIgX3RoaXM1ID0gdGhpcztcbiAgICBpZiAoaXNPYnNlcnZhYmxlU2V0KG90aGVyKSkge1xuICAgICAgb3RoZXIgPSBuZXcgU2V0KG90aGVyKTtcbiAgICB9XG4gICAgdHJhbnNhY3Rpb24oZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3RoZXIpKSB7XG4gICAgICAgIF90aGlzNS5jbGVhcigpO1xuICAgICAgICBvdGhlci5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIHJldHVybiBfdGhpczUuYWRkKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGlzRVM2U2V0KG90aGVyKSkge1xuICAgICAgICBfdGhpczUuY2xlYXIoKTtcbiAgICAgICAgb3RoZXIuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXM1LmFkZCh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChvdGhlciAhPT0gbnVsbCAmJiBvdGhlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRpZShcIkNhbm5vdCBpbml0aWFsaXplIHNldCBmcm9tIFwiICsgb3RoZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBfcHJvdG8ub2JzZXJ2ZV8gPSBmdW5jdGlvbiBvYnNlcnZlXyhsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgLy8gLi4uICdmaXJlSW1tZWRpYXRlbHknIGNvdWxkIGFsc28gYmUgdHJ1ZT9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGZpcmVJbW1lZGlhdGVseSA9PT0gdHJ1ZSkge1xuICAgICAgZGllKFwiYG9ic2VydmVgIGRvZXNuJ3Qgc3VwcG9ydCBmaXJlSW1tZWRpYXRlbHk9dHJ1ZSBpbiBjb21iaW5hdGlvbiB3aXRoIHNldHMuXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVnaXN0ZXJMaXN0ZW5lcih0aGlzLCBsaXN0ZW5lcik7XG4gIH07XG4gIF9wcm90by5pbnRlcmNlcHRfID0gZnVuY3Rpb24gaW50ZXJjZXB0XyhoYW5kbGVyKSB7XG4gICAgcmV0dXJuIHJlZ2lzdGVySW50ZXJjZXB0b3IodGhpcywgaGFuZGxlcik7XG4gIH07XG4gIF9wcm90by50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04oKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20odGhpcyk7XG4gIH07XG4gIF9wcm90by50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgT2JzZXJ2YWJsZVNldF1cIjtcbiAgfTtcbiAgX3Byb3RvW19TeW1ib2wkaXRlcmF0b3IkMV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzKCk7XG4gIH07XG4gIF9jcmVhdGVDbGFzcyhPYnNlcnZhYmxlU2V0LCBbe1xuICAgIGtleTogXCJzaXplXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB0aGlzLmF0b21fLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhXy5zaXplO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogX1N5bWJvbCR0b1N0cmluZ1RhZyQxLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIFwiU2V0XCI7XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBPYnNlcnZhYmxlU2V0O1xufSgpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG52YXIgaXNPYnNlcnZhYmxlU2V0ID0gLyojX19QVVJFX18qL2NyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUoXCJPYnNlcnZhYmxlU2V0XCIsIE9ic2VydmFibGVTZXQpO1xuXG52YXIgZGVzY3JpcHRvckNhY2hlID0gLyojX19QVVJFX18qL09iamVjdC5jcmVhdGUobnVsbCk7XG52YXIgUkVNT1ZFID0gXCJyZW1vdmVcIjtcbnZhciBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24gPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24odGFyZ2V0XywgdmFsdWVzXywgbmFtZV8sXG4gIC8vIFVzZWQgYW55dGltZSBhbm5vdGF0aW9uIGlzIG5vdCBleHBsaWNpdGVseSBwcm92aWRlZFxuICBkZWZhdWx0QW5ub3RhdGlvbl8pIHtcbiAgICBpZiAodmFsdWVzXyA9PT0gdm9pZCAwKSB7XG4gICAgICB2YWx1ZXNfID0gbmV3IE1hcCgpO1xuICAgIH1cbiAgICBpZiAoZGVmYXVsdEFubm90YXRpb25fID09PSB2b2lkIDApIHtcbiAgICAgIGRlZmF1bHRBbm5vdGF0aW9uXyA9IGF1dG9Bbm5vdGF0aW9uO1xuICAgIH1cbiAgICB0aGlzLnRhcmdldF8gPSB2b2lkIDA7XG4gICAgdGhpcy52YWx1ZXNfID0gdm9pZCAwO1xuICAgIHRoaXMubmFtZV8gPSB2b2lkIDA7XG4gICAgdGhpcy5kZWZhdWx0QW5ub3RhdGlvbl8gPSB2b2lkIDA7XG4gICAgdGhpcy5rZXlzQXRvbV8gPSB2b2lkIDA7XG4gICAgdGhpcy5jaGFuZ2VMaXN0ZW5lcnNfID0gdm9pZCAwO1xuICAgIHRoaXMuaW50ZXJjZXB0b3JzXyA9IHZvaWQgMDtcbiAgICB0aGlzLnByb3h5XyA9IHZvaWQgMDtcbiAgICB0aGlzLmlzUGxhaW5PYmplY3RfID0gdm9pZCAwO1xuICAgIHRoaXMuYXBwbGllZEFubm90YXRpb25zXyA9IHZvaWQgMDtcbiAgICB0aGlzLnBlbmRpbmdLZXlzXyA9IHZvaWQgMDtcbiAgICB0aGlzLnRhcmdldF8gPSB0YXJnZXRfO1xuICAgIHRoaXMudmFsdWVzXyA9IHZhbHVlc187XG4gICAgdGhpcy5uYW1lXyA9IG5hbWVfO1xuICAgIHRoaXMuZGVmYXVsdEFubm90YXRpb25fID0gZGVmYXVsdEFubm90YXRpb25fO1xuICAgIHRoaXMua2V5c0F0b21fID0gbmV3IEF0b20ocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gdGhpcy5uYW1lXyArIFwiLmtleXNcIiA6IFwiT2JzZXJ2YWJsZU9iamVjdC5rZXlzXCIpO1xuICAgIC8vIE9wdGltaXphdGlvbjogd2UgdXNlIHRoaXMgZnJlcXVlbnRseVxuICAgIHRoaXMuaXNQbGFpbk9iamVjdF8gPSBpc1BsYWluT2JqZWN0KHRoaXMudGFyZ2V0Xyk7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhaXNBbm5vdGF0aW9uKHRoaXMuZGVmYXVsdEFubm90YXRpb25fKSkge1xuICAgICAgZGllKFwiZGVmYXVsdEFubm90YXRpb24gbXVzdCBiZSB2YWxpZCBhbm5vdGF0aW9uXCIpO1xuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAvLyBQcmVwYXJlIHN0cnVjdHVyZSBmb3IgdHJhY2tpbmcgd2hpY2ggZmllbGRzIHdlcmUgYWxyZWFkeSBhbm5vdGF0ZWRcbiAgICAgIHRoaXMuYXBwbGllZEFubm90YXRpb25zXyA9IHt9O1xuICAgIH1cbiAgfVxuICB2YXIgX3Byb3RvID0gT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uLnByb3RvdHlwZTtcbiAgX3Byb3RvLmdldE9ic2VydmFibGVQcm9wVmFsdWVfID0gZnVuY3Rpb24gZ2V0T2JzZXJ2YWJsZVByb3BWYWx1ZV8oa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVzXy5nZXQoa2V5KS5nZXQoKTtcbiAgfTtcbiAgX3Byb3RvLnNldE9ic2VydmFibGVQcm9wVmFsdWVfID0gZnVuY3Rpb24gc2V0T2JzZXJ2YWJsZVByb3BWYWx1ZV8oa2V5LCBuZXdWYWx1ZSkge1xuICAgIHZhciBvYnNlcnZhYmxlID0gdGhpcy52YWx1ZXNfLmdldChrZXkpO1xuICAgIGlmIChvYnNlcnZhYmxlIGluc3RhbmNlb2YgQ29tcHV0ZWRWYWx1ZSkge1xuICAgICAgb2JzZXJ2YWJsZS5zZXQobmV3VmFsdWUpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vIGludGVyY2VwdFxuICAgIGlmIChoYXNJbnRlcmNlcHRvcnModGhpcykpIHtcbiAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UodGhpcywge1xuICAgICAgICB0eXBlOiBVUERBVEUsXG4gICAgICAgIG9iamVjdDogdGhpcy5wcm94eV8gfHwgdGhpcy50YXJnZXRfLFxuICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgfSk7XG4gICAgICBpZiAoIWNoYW5nZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIG5ld1ZhbHVlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgIH1cbiAgICBuZXdWYWx1ZSA9IG9ic2VydmFibGUucHJlcGFyZU5ld1ZhbHVlXyhuZXdWYWx1ZSk7XG4gICAgLy8gbm90aWZ5IHNweSAmIG9ic2VydmVyc1xuICAgIGlmIChuZXdWYWx1ZSAhPT0gZ2xvYmFsU3RhdGUuVU5DSEFOR0VEKSB7XG4gICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKHRoaXMpO1xuICAgICAgdmFyIG5vdGlmeVNweSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBpc1NweUVuYWJsZWQoKTtcbiAgICAgIHZhciBfY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweSA/IHtcbiAgICAgICAgdHlwZTogVVBEQVRFLFxuICAgICAgICBvYnNlcnZhYmxlS2luZDogXCJvYmplY3RcIixcbiAgICAgICAgZGVidWdPYmplY3ROYW1lOiB0aGlzLm5hbWVfLFxuICAgICAgICBvYmplY3Q6IHRoaXMucHJveHlfIHx8IHRoaXMudGFyZ2V0XyxcbiAgICAgICAgb2xkVmFsdWU6IG9ic2VydmFibGUudmFsdWVfLFxuICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgfSA6IG51bGw7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgICBzcHlSZXBvcnRTdGFydChfY2hhbmdlKTtcbiAgICAgIH1cbiAgICAgIG9ic2VydmFibGUuc2V0TmV3VmFsdWVfKG5ld1ZhbHVlKTtcbiAgICAgIGlmIChub3RpZnkpIHtcbiAgICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIF9jaGFuZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBub3RpZnlTcHkpIHtcbiAgICAgICAgc3B5UmVwb3J0RW5kKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICBfcHJvdG8uZ2V0XyA9IGZ1bmN0aW9uIGdldF8oa2V5KSB7XG4gICAgaWYgKGdsb2JhbFN0YXRlLnRyYWNraW5nRGVyaXZhdGlvbiAmJiAhaGFzUHJvcCh0aGlzLnRhcmdldF8sIGtleSkpIHtcbiAgICAgIC8vIEtleSBkb2Vzbid0IGV4aXN0IHlldCwgc3Vic2NyaWJlIGZvciBpdCBpbiBjYXNlIGl0J3MgYWRkZWQgbGF0ZXJcbiAgICAgIHRoaXMuaGFzXyhrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy50YXJnZXRfW2tleV07XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7UHJvcGVydHlLZXl9IGtleVxuICAgKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAgICogQHBhcmFtIHtBbm5vdGF0aW9ufGJvb2xlYW59IGFubm90YXRpb24gdHJ1ZSAtIHVzZSBkZWZhdWx0IGFubm90YXRpb24sIGZhbHNlIC0gY29weSBhcyBpc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHByb3h5VHJhcCB3aGV0aGVyIGl0J3MgY2FsbGVkIGZyb20gcHJveHkgdHJhcFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbnxudWxsfSB0cnVlIG9uIHN1Y2Nlc3MsIGZhbHNlIG9uIGZhaWx1cmUgKHByb3h5VHJhcCArIG5vbi1jb25maWd1cmFibGUpLCBudWxsIHdoZW4gY2FuY2VsbGVkIGJ5IGludGVyY2VwdG9yXG4gICAqLztcbiAgX3Byb3RvLnNldF8gPSBmdW5jdGlvbiBzZXRfKGtleSwgdmFsdWUsIHByb3h5VHJhcCkge1xuICAgIGlmIChwcm94eVRyYXAgPT09IHZvaWQgMCkge1xuICAgICAgcHJveHlUcmFwID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIERvbid0IHVzZSAuaGFzKGtleSkgLSB3ZSBjYXJlIGFib3V0IG93blxuICAgIGlmIChoYXNQcm9wKHRoaXMudGFyZ2V0Xywga2V5KSkge1xuICAgICAgLy8gRXhpc3RpbmcgcHJvcFxuICAgICAgaWYgKHRoaXMudmFsdWVzXy5oYXMoa2V5KSkge1xuICAgICAgICAvLyBPYnNlcnZhYmxlIChjYW4gYmUgaW50ZXJjZXB0ZWQpXG4gICAgICAgIHJldHVybiB0aGlzLnNldE9ic2VydmFibGVQcm9wVmFsdWVfKGtleSwgdmFsdWUpO1xuICAgICAgfSBlbHNlIGlmIChwcm94eVRyYXApIHtcbiAgICAgICAgLy8gTm9uLW9ic2VydmFibGUgLSBwcm94eVxuICAgICAgICByZXR1cm4gUmVmbGVjdC5zZXQodGhpcy50YXJnZXRfLCBrZXksIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE5vbi1vYnNlcnZhYmxlXG4gICAgICAgIHRoaXMudGFyZ2V0X1trZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOZXcgcHJvcFxuICAgICAgcmV0dXJuIHRoaXMuZXh0ZW5kXyhrZXksIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9LCB0aGlzLmRlZmF1bHRBbm5vdGF0aW9uXywgcHJveHlUcmFwKTtcbiAgICB9XG4gIH1cbiAgLy8gVHJhcCBmb3IgXCJpblwiXG4gIDtcbiAgX3Byb3RvLmhhc18gPSBmdW5jdGlvbiBoYXNfKGtleSkge1xuICAgIGlmICghZ2xvYmFsU3RhdGUudHJhY2tpbmdEZXJpdmF0aW9uKSB7XG4gICAgICAvLyBTa2lwIGtleSBzdWJzY3JpcHRpb24gb3V0c2lkZSBkZXJpdmF0aW9uXG4gICAgICByZXR1cm4ga2V5IGluIHRoaXMudGFyZ2V0XztcbiAgICB9XG4gICAgdGhpcy5wZW5kaW5nS2V5c18gfHwgKHRoaXMucGVuZGluZ0tleXNfID0gbmV3IE1hcCgpKTtcbiAgICB2YXIgZW50cnkgPSB0aGlzLnBlbmRpbmdLZXlzXy5nZXQoa2V5KTtcbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICBlbnRyeSA9IG5ldyBPYnNlcnZhYmxlVmFsdWUoa2V5IGluIHRoaXMudGFyZ2V0XywgcmVmZXJlbmNlRW5oYW5jZXIsIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IHRoaXMubmFtZV8gKyBcIi5cIiArIHN0cmluZ2lmeUtleShrZXkpICsgXCI/XCIgOiBcIk9ic2VydmFibGVPYmplY3Qua2V5P1wiLCBmYWxzZSk7XG4gICAgICB0aGlzLnBlbmRpbmdLZXlzXy5zZXQoa2V5LCBlbnRyeSk7XG4gICAgfVxuICAgIHJldHVybiBlbnRyeS5nZXQoKTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtQcm9wZXJ0eUtleX0ga2V5XG4gICAqIEBwYXJhbSB7QW5ub3RhdGlvbnxib29sZWFufSBhbm5vdGF0aW9uIHRydWUgLSB1c2UgZGVmYXVsdCBhbm5vdGF0aW9uLCBmYWxzZSAtIGlnbm9yZSBwcm9wXG4gICAqLztcbiAgX3Byb3RvLm1ha2VfID0gZnVuY3Rpb24gbWFrZV8oa2V5LCBhbm5vdGF0aW9uKSB7XG4gICAgaWYgKGFubm90YXRpb24gPT09IHRydWUpIHtcbiAgICAgIGFubm90YXRpb24gPSB0aGlzLmRlZmF1bHRBbm5vdGF0aW9uXztcbiAgICB9XG4gICAgaWYgKGFubm90YXRpb24gPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGFzc2VydEFubm90YWJsZSh0aGlzLCBhbm5vdGF0aW9uLCBrZXkpO1xuICAgIGlmICghKGtleSBpbiB0aGlzLnRhcmdldF8pKSB7XG4gICAgICB2YXIgX3RoaXMkdGFyZ2V0XyRzdG9yZWRBO1xuICAgICAgLy8gVGhyb3cgb24gbWlzc2luZyBrZXksIGV4Y2VwdCBmb3IgZGVjb3JhdG9yczpcbiAgICAgIC8vIERlY29yYXRvciBhbm5vdGF0aW9ucyBhcmUgY29sbGVjdGVkIGZyb20gd2hvbGUgcHJvdG90eXBlIGNoYWluLlxuICAgICAgLy8gV2hlbiBjYWxsZWQgZnJvbSBzdXBlcigpIHNvbWUgcHJvcHMgbWF5IG5vdCBleGlzdCB5ZXQuXG4gICAgICAvLyBIb3dldmVyIHdlIGRvbid0IGhhdmUgdG8gd29ycnkgYWJvdXQgbWlzc2luZyBwcm9wLFxuICAgICAgLy8gYmVjYXVzZSB0aGUgZGVjb3JhdG9yIG11c3QgaGF2ZSBiZWVuIGFwcGxpZWQgdG8gc29tZXRoaW5nLlxuICAgICAgaWYgKChfdGhpcyR0YXJnZXRfJHN0b3JlZEEgPSB0aGlzLnRhcmdldF9bc3RvcmVkQW5ub3RhdGlvbnNTeW1ib2xdKSAhPSBudWxsICYmIF90aGlzJHRhcmdldF8kc3RvcmVkQVtrZXldKSB7XG4gICAgICAgIHJldHVybjsgLy8gd2lsbCBiZSBhbm5vdGF0ZWQgYnkgc3ViY2xhc3MgY29uc3RydWN0b3JcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpZSgxLCBhbm5vdGF0aW9uLmFubm90YXRpb25UeXBlXywgdGhpcy5uYW1lXyArIFwiLlwiICsga2V5LnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgc291cmNlID0gdGhpcy50YXJnZXRfO1xuICAgIHdoaWxlIChzb3VyY2UgJiYgc291cmNlICE9PSBvYmplY3RQcm90b3R5cGUpIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gZ2V0RGVzY3JpcHRvcihzb3VyY2UsIGtleSk7XG4gICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICB2YXIgb3V0Y29tZSA9IGFubm90YXRpb24ubWFrZV8odGhpcywga2V5LCBkZXNjcmlwdG9yLCBzb3VyY2UpO1xuICAgICAgICBpZiAob3V0Y29tZSA9PT0gMCAvKiBNYWtlUmVzdWx0LkNhbmNlbCAqLykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3V0Y29tZSA9PT0gMSAvKiBNYWtlUmVzdWx0LkJyZWFrICovKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNvdXJjZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2UpO1xuICAgIH1cbiAgICByZWNvcmRBbm5vdGF0aW9uQXBwbGllZCh0aGlzLCBhbm5vdGF0aW9uLCBrZXkpO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge1Byb3BlcnR5S2V5fSBrZXlcbiAgICogQHBhcmFtIHtQcm9wZXJ0eURlc2NyaXB0b3J9IGRlc2NyaXB0b3JcbiAgICogQHBhcmFtIHtBbm5vdGF0aW9ufGJvb2xlYW59IGFubm90YXRpb24gdHJ1ZSAtIHVzZSBkZWZhdWx0IGFubm90YXRpb24sIGZhbHNlIC0gY29weSBhcyBpc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHByb3h5VHJhcCB3aGV0aGVyIGl0J3MgY2FsbGVkIGZyb20gcHJveHkgdHJhcFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbnxudWxsfSB0cnVlIG9uIHN1Y2Nlc3MsIGZhbHNlIG9uIGZhaWx1cmUgKHByb3h5VHJhcCArIG5vbi1jb25maWd1cmFibGUpLCBudWxsIHdoZW4gY2FuY2VsbGVkIGJ5IGludGVyY2VwdG9yXG4gICAqLztcbiAgX3Byb3RvLmV4dGVuZF8gPSBmdW5jdGlvbiBleHRlbmRfKGtleSwgZGVzY3JpcHRvciwgYW5ub3RhdGlvbiwgcHJveHlUcmFwKSB7XG4gICAgaWYgKHByb3h5VHJhcCA9PT0gdm9pZCAwKSB7XG4gICAgICBwcm94eVRyYXAgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGFubm90YXRpb24gPT09IHRydWUpIHtcbiAgICAgIGFubm90YXRpb24gPSB0aGlzLmRlZmF1bHRBbm5vdGF0aW9uXztcbiAgICB9XG4gICAgaWYgKGFubm90YXRpb24gPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5kZWZpbmVQcm9wZXJ0eV8oa2V5LCBkZXNjcmlwdG9yLCBwcm94eVRyYXApO1xuICAgIH1cbiAgICBhc3NlcnRBbm5vdGFibGUodGhpcywgYW5ub3RhdGlvbiwga2V5KTtcbiAgICB2YXIgb3V0Y29tZSA9IGFubm90YXRpb24uZXh0ZW5kXyh0aGlzLCBrZXksIGRlc2NyaXB0b3IsIHByb3h5VHJhcCk7XG4gICAgaWYgKG91dGNvbWUpIHtcbiAgICAgIHJlY29yZEFubm90YXRpb25BcHBsaWVkKHRoaXMsIGFubm90YXRpb24sIGtleSk7XG4gICAgfVxuICAgIHJldHVybiBvdXRjb21lO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge1Byb3BlcnR5S2V5fSBrZXlcbiAgICogQHBhcmFtIHtQcm9wZXJ0eURlc2NyaXB0b3J9IGRlc2NyaXB0b3JcbiAgICogQHBhcmFtIHtib29sZWFufSBwcm94eVRyYXAgd2hldGhlciBpdCdzIGNhbGxlZCBmcm9tIHByb3h5IHRyYXBcbiAgICogQHJldHVybnMge2Jvb2xlYW58bnVsbH0gdHJ1ZSBvbiBzdWNjZXNzLCBmYWxzZSBvbiBmYWlsdXJlIChwcm94eVRyYXAgKyBub24tY29uZmlndXJhYmxlKSwgbnVsbCB3aGVuIGNhbmNlbGxlZCBieSBpbnRlcmNlcHRvclxuICAgKi87XG4gIF9wcm90by5kZWZpbmVQcm9wZXJ0eV8gPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eV8oa2V5LCBkZXNjcmlwdG9yLCBwcm94eVRyYXApIHtcbiAgICBpZiAocHJveHlUcmFwID09PSB2b2lkIDApIHtcbiAgICAgIHByb3h5VHJhcCA9IGZhbHNlO1xuICAgIH1cbiAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCh0aGlzLmtleXNBdG9tXyk7XG4gICAgdHJ5IHtcbiAgICAgIHN0YXJ0QmF0Y2goKTtcbiAgICAgIC8vIERlbGV0ZVxuICAgICAgdmFyIGRlbGV0ZU91dGNvbWUgPSB0aGlzLmRlbGV0ZV8oa2V5KTtcbiAgICAgIGlmICghZGVsZXRlT3V0Y29tZSkge1xuICAgICAgICAvLyBGYWlsdXJlIG9yIGludGVyY2VwdGVkXG4gICAgICAgIHJldHVybiBkZWxldGVPdXRjb21lO1xuICAgICAgfVxuICAgICAgLy8gQUREIGludGVyY2VwdG9yXG4gICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzKHRoaXMpKSB7XG4gICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UodGhpcywge1xuICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eV8gfHwgdGhpcy50YXJnZXRfLFxuICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICB0eXBlOiBBREQsXG4gICAgICAgICAgbmV3VmFsdWU6IGRlc2NyaXB0b3IudmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgICAgICBpZiAoZGVzY3JpcHRvci52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICBkZXNjcmlwdG9yID0gX2V4dGVuZHMoe30sIGRlc2NyaXB0b3IsIHtcbiAgICAgICAgICAgIHZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBEZWZpbmVcbiAgICAgIGlmIChwcm94eVRyYXApIHtcbiAgICAgICAgaWYgKCFSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRoaXMudGFyZ2V0Xywga2V5LCBkZXNjcmlwdG9yKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmaW5lUHJvcGVydHkodGhpcy50YXJnZXRfLCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgfVxuICAgICAgLy8gTm90aWZ5XG4gICAgICB0aGlzLm5vdGlmeVByb3BlcnR5QWRkaXRpb25fKGtleSwgZGVzY3JpcHRvci52YWx1ZSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGVuZEJhdGNoKCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8vIElmIG9yaWdpbmFsIGRlc2NyaXB0b3IgYmVjb21lcyByZWxldmFudCwgbW92ZSB0aGlzIHRvIGFubm90YXRpb24gZGlyZWN0bHlcbiAgO1xuICBfcHJvdG8uZGVmaW5lT2JzZXJ2YWJsZVByb3BlcnR5XyA9IGZ1bmN0aW9uIGRlZmluZU9ic2VydmFibGVQcm9wZXJ0eV8oa2V5LCB2YWx1ZSwgZW5oYW5jZXIsIHByb3h5VHJhcCkge1xuICAgIGlmIChwcm94eVRyYXAgPT09IHZvaWQgMCkge1xuICAgICAgcHJveHlUcmFwID0gZmFsc2U7XG4gICAgfVxuICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkKHRoaXMua2V5c0F0b21fKTtcbiAgICB0cnkge1xuICAgICAgc3RhcnRCYXRjaCgpO1xuICAgICAgLy8gRGVsZXRlXG4gICAgICB2YXIgZGVsZXRlT3V0Y29tZSA9IHRoaXMuZGVsZXRlXyhrZXkpO1xuICAgICAgaWYgKCFkZWxldGVPdXRjb21lKSB7XG4gICAgICAgIC8vIEZhaWx1cmUgb3IgaW50ZXJjZXB0ZWRcbiAgICAgICAgcmV0dXJuIGRlbGV0ZU91dGNvbWU7XG4gICAgICB9XG4gICAgICAvLyBBREQgaW50ZXJjZXB0b3JcbiAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnModGhpcykpIHtcbiAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSh0aGlzLCB7XG4gICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5XyB8fCB0aGlzLnRhcmdldF8sXG4gICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgIHR5cGU6IEFERCxcbiAgICAgICAgICBuZXdWYWx1ZTogdmFsdWVcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICB9XG4gICAgICB2YXIgY2FjaGVkRGVzY3JpcHRvciA9IGdldENhY2hlZE9ic2VydmFibGVQcm9wRGVzY3JpcHRvcihrZXkpO1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZ2xvYmFsU3RhdGUuc2FmZURlc2NyaXB0b3JzID8gdGhpcy5pc1BsYWluT2JqZWN0XyA6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGdldDogY2FjaGVkRGVzY3JpcHRvci5nZXQsXG4gICAgICAgIHNldDogY2FjaGVkRGVzY3JpcHRvci5zZXRcbiAgICAgIH07XG4gICAgICAvLyBEZWZpbmVcbiAgICAgIGlmIChwcm94eVRyYXApIHtcbiAgICAgICAgaWYgKCFSZWZsZWN0LmRlZmluZVByb3BlcnR5KHRoaXMudGFyZ2V0Xywga2V5LCBkZXNjcmlwdG9yKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmaW5lUHJvcGVydHkodGhpcy50YXJnZXRfLCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgfVxuICAgICAgdmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZVZhbHVlKHZhbHVlLCBlbmhhbmNlciwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiID8gdGhpcy5uYW1lXyArIFwiLlwiICsga2V5LnRvU3RyaW5nKCkgOiBcIk9ic2VydmFibGVPYmplY3Qua2V5XCIsIGZhbHNlKTtcbiAgICAgIHRoaXMudmFsdWVzXy5zZXQoa2V5LCBvYnNlcnZhYmxlKTtcbiAgICAgIC8vIE5vdGlmeSAodmFsdWUgcG9zc2libHkgY2hhbmdlZCBieSBPYnNlcnZhYmxlVmFsdWUpXG4gICAgICB0aGlzLm5vdGlmeVByb3BlcnR5QWRkaXRpb25fKGtleSwgb2JzZXJ2YWJsZS52YWx1ZV8pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBlbmRCYXRjaCgpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvLyBJZiBvcmlnaW5hbCBkZXNjcmlwdG9yIGJlY29tZXMgcmVsZXZhbnQsIG1vdmUgdGhpcyB0byBhbm5vdGF0aW9uIGRpcmVjdGx5XG4gIDtcbiAgX3Byb3RvLmRlZmluZUNvbXB1dGVkUHJvcGVydHlfID0gZnVuY3Rpb24gZGVmaW5lQ29tcHV0ZWRQcm9wZXJ0eV8oa2V5LCBvcHRpb25zLCBwcm94eVRyYXApIHtcbiAgICBpZiAocHJveHlUcmFwID09PSB2b2lkIDApIHtcbiAgICAgIHByb3h5VHJhcCA9IGZhbHNlO1xuICAgIH1cbiAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCh0aGlzLmtleXNBdG9tXyk7XG4gICAgdHJ5IHtcbiAgICAgIHN0YXJ0QmF0Y2goKTtcbiAgICAgIC8vIERlbGV0ZVxuICAgICAgdmFyIGRlbGV0ZU91dGNvbWUgPSB0aGlzLmRlbGV0ZV8oa2V5KTtcbiAgICAgIGlmICghZGVsZXRlT3V0Y29tZSkge1xuICAgICAgICAvLyBGYWlsdXJlIG9yIGludGVyY2VwdGVkXG4gICAgICAgIHJldHVybiBkZWxldGVPdXRjb21lO1xuICAgICAgfVxuICAgICAgLy8gQUREIGludGVyY2VwdG9yXG4gICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzKHRoaXMpKSB7XG4gICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UodGhpcywge1xuICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eV8gfHwgdGhpcy50YXJnZXRfLFxuICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICB0eXBlOiBBREQsXG4gICAgICAgICAgbmV3VmFsdWU6IHVuZGVmaW5lZFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFjaGFuZ2UpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgb3B0aW9ucy5uYW1lIHx8IChvcHRpb25zLm5hbWUgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgPyB0aGlzLm5hbWVfICsgXCIuXCIgKyBrZXkudG9TdHJpbmcoKSA6IFwiT2JzZXJ2YWJsZU9iamVjdC5rZXlcIik7XG4gICAgICBvcHRpb25zLmNvbnRleHQgPSB0aGlzLnByb3h5XyB8fCB0aGlzLnRhcmdldF87XG4gICAgICB2YXIgY2FjaGVkRGVzY3JpcHRvciA9IGdldENhY2hlZE9ic2VydmFibGVQcm9wRGVzY3JpcHRvcihrZXkpO1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZ2xvYmFsU3RhdGUuc2FmZURlc2NyaXB0b3JzID8gdGhpcy5pc1BsYWluT2JqZWN0XyA6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBnZXQ6IGNhY2hlZERlc2NyaXB0b3IuZ2V0LFxuICAgICAgICBzZXQ6IGNhY2hlZERlc2NyaXB0b3Iuc2V0XG4gICAgICB9O1xuICAgICAgLy8gRGVmaW5lXG4gICAgICBpZiAocHJveHlUcmFwKSB7XG4gICAgICAgIGlmICghUmVmbGVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLnRhcmdldF8sIGtleSwgZGVzY3JpcHRvcikpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlZmluZVByb3BlcnR5KHRoaXMudGFyZ2V0Xywga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudmFsdWVzXy5zZXQoa2V5LCBuZXcgQ29tcHV0ZWRWYWx1ZShvcHRpb25zKSk7XG4gICAgICAvLyBOb3RpZnlcbiAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlBZGRpdGlvbl8oa2V5LCB1bmRlZmluZWQpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBlbmRCYXRjaCgpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtQcm9wZXJ0eUtleX0ga2V5XG4gICAqIEBwYXJhbSB7UHJvcGVydHlEZXNjcmlwdG9yfSBkZXNjcmlwdG9yXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcHJveHlUcmFwIHdoZXRoZXIgaXQncyBjYWxsZWQgZnJvbSBwcm94eSB0cmFwXG4gICAqIEByZXR1cm5zIHtib29sZWFufG51bGx9IHRydWUgb24gc3VjY2VzcywgZmFsc2Ugb24gZmFpbHVyZSAocHJveHlUcmFwICsgbm9uLWNvbmZpZ3VyYWJsZSksIG51bGwgd2hlbiBjYW5jZWxsZWQgYnkgaW50ZXJjZXB0b3JcbiAgICovO1xuICBfcHJvdG8uZGVsZXRlXyA9IGZ1bmN0aW9uIGRlbGV0ZV8oa2V5LCBwcm94eVRyYXApIHtcbiAgICBpZiAocHJveHlUcmFwID09PSB2b2lkIDApIHtcbiAgICAgIHByb3h5VHJhcCA9IGZhbHNlO1xuICAgIH1cbiAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCh0aGlzLmtleXNBdG9tXyk7XG4gICAgLy8gTm8gc3VjaCBwcm9wXG4gICAgaWYgKCFoYXNQcm9wKHRoaXMudGFyZ2V0Xywga2V5KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vIEludGVyY2VwdFxuICAgIGlmIChoYXNJbnRlcmNlcHRvcnModGhpcykpIHtcbiAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UodGhpcywge1xuICAgICAgICBvYmplY3Q6IHRoaXMucHJveHlfIHx8IHRoaXMudGFyZ2V0XyxcbiAgICAgICAgbmFtZToga2V5LFxuICAgICAgICB0eXBlOiBSRU1PVkVcbiAgICAgIH0pO1xuICAgICAgLy8gQ2FuY2VsbGVkXG4gICAgICBpZiAoIWNoYW5nZSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gRGVsZXRlXG4gICAgdHJ5IHtcbiAgICAgIHZhciBfdGhpcyRwZW5kaW5nS2V5c18sIF90aGlzJHBlbmRpbmdLZXlzXyRnZTtcbiAgICAgIHN0YXJ0QmF0Y2goKTtcbiAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnModGhpcyk7XG4gICAgICB2YXIgbm90aWZ5U3B5ID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGlzU3B5RW5hYmxlZCgpO1xuICAgICAgdmFyIG9ic2VydmFibGUgPSB0aGlzLnZhbHVlc18uZ2V0KGtleSk7XG4gICAgICAvLyBWYWx1ZSBuZWVkZWQgZm9yIHNwaWVzL2xpc3RlbmVyc1xuICAgICAgdmFyIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgLy8gT3B0aW1pemF0aW9uOiBkb24ndCBwdWxsIHRoZSB2YWx1ZSB1bmxlc3Mgd2Ugd2lsbCBuZWVkIGl0XG4gICAgICBpZiAoIW9ic2VydmFibGUgJiYgKG5vdGlmeSB8fCBub3RpZnlTcHkpKSB7XG4gICAgICAgIHZhciBfZ2V0RGVzY3JpcHRvcjtcbiAgICAgICAgdmFsdWUgPSAoX2dldERlc2NyaXB0b3IgPSBnZXREZXNjcmlwdG9yKHRoaXMudGFyZ2V0Xywga2V5KSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9nZXREZXNjcmlwdG9yLnZhbHVlO1xuICAgICAgfVxuICAgICAgLy8gZGVsZXRlIHByb3AgKGRvIGZpcnN0LCBtYXkgZmFpbClcbiAgICAgIGlmIChwcm94eVRyYXApIHtcbiAgICAgICAgaWYgKCFSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRoaXMudGFyZ2V0Xywga2V5KSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIHRoaXMudGFyZ2V0X1trZXldO1xuICAgICAgfVxuICAgICAgLy8gQWxsb3cgcmUtYW5ub3RhdGluZyB0aGlzIGZpZWxkXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmFwcGxpZWRBbm5vdGF0aW9uc19ba2V5XTtcbiAgICAgIH1cbiAgICAgIC8vIENsZWFyIG9ic2VydmFibGVcbiAgICAgIGlmIChvYnNlcnZhYmxlKSB7XG4gICAgICAgIHRoaXMudmFsdWVzX1tcImRlbGV0ZVwiXShrZXkpO1xuICAgICAgICAvLyBmb3IgY29tcHV0ZWQsIHZhbHVlIGlzIHVuZGVmaW5lZFxuICAgICAgICBpZiAob2JzZXJ2YWJsZSBpbnN0YW5jZW9mIE9ic2VydmFibGVWYWx1ZSkge1xuICAgICAgICAgIHZhbHVlID0gb2JzZXJ2YWJsZS52YWx1ZV87XG4gICAgICAgIH1cbiAgICAgICAgLy8gTm90aWZ5OiBhdXRvcnVuKCgpID0+IG9ialtrZXldKSwgc2VlICMxNzk2XG4gICAgICAgIHByb3BhZ2F0ZUNoYW5nZWQob2JzZXJ2YWJsZSk7XG4gICAgICB9XG4gICAgICAvLyBOb3RpZnkgXCJrZXlzL2VudHJpZXMvdmFsdWVzXCIgb2JzZXJ2ZXJzXG4gICAgICB0aGlzLmtleXNBdG9tXy5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAvLyBOb3RpZnkgXCJoYXNcIiBvYnNlcnZlcnNcbiAgICAgIC8vIFwiaW5cIiBhcyBpdCBtYXkgc3RpbGwgZXhpc3QgaW4gcHJvdG9cbiAgICAgIChfdGhpcyRwZW5kaW5nS2V5c18gPSB0aGlzLnBlbmRpbmdLZXlzXykgPT0gbnVsbCA/IHZvaWQgMCA6IChfdGhpcyRwZW5kaW5nS2V5c18kZ2UgPSBfdGhpcyRwZW5kaW5nS2V5c18uZ2V0KGtleSkpID09IG51bGwgPyB2b2lkIDAgOiBfdGhpcyRwZW5kaW5nS2V5c18kZ2Uuc2V0KGtleSBpbiB0aGlzLnRhcmdldF8pO1xuICAgICAgLy8gTm90aWZ5IHNwaWVzL2xpc3RlbmVyc1xuICAgICAgaWYgKG5vdGlmeSB8fCBub3RpZnlTcHkpIHtcbiAgICAgICAgdmFyIF9jaGFuZ2UyID0ge1xuICAgICAgICAgIHR5cGU6IFJFTU9WRSxcbiAgICAgICAgICBvYnNlcnZhYmxlS2luZDogXCJvYmplY3RcIixcbiAgICAgICAgICBvYmplY3Q6IHRoaXMucHJveHlfIHx8IHRoaXMudGFyZ2V0XyxcbiAgICAgICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMubmFtZV8sXG4gICAgICAgICAgb2xkVmFsdWU6IHZhbHVlLFxuICAgICAgICAgIG5hbWU6IGtleVxuICAgICAgICB9O1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgICAgIHNweVJlcG9ydFN0YXJ0KF9jaGFuZ2UyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm90aWZ5KSB7XG4gICAgICAgICAgbm90aWZ5TGlzdGVuZXJzKHRoaXMsIF9jaGFuZ2UyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGVuZEJhdGNoKCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIC8qKlxuICAgKiBPYnNlcnZlcyB0aGlzIG9iamVjdC4gVHJpZ2dlcnMgZm9yIHRoZSBldmVudHMgJ2FkZCcsICd1cGRhdGUnIGFuZCAnZGVsZXRlJy5cbiAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3Qvb2JzZXJ2ZVxuICAgKiBmb3IgY2FsbGJhY2sgZGV0YWlsc1xuICAgKi87XG4gIF9wcm90by5vYnNlcnZlXyA9IGZ1bmN0aW9uIG9ic2VydmVfKGNhbGxiYWNrLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGZpcmVJbW1lZGlhdGVseSA9PT0gdHJ1ZSkge1xuICAgICAgZGllKFwiYG9ic2VydmVgIGRvZXNuJ3Qgc3VwcG9ydCB0aGUgZmlyZSBpbW1lZGlhdGVseSBwcm9wZXJ0eSBmb3Igb2JzZXJ2YWJsZSBvYmplY3RzLlwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlZ2lzdGVyTGlzdGVuZXIodGhpcywgY2FsbGJhY2spO1xuICB9O1xuICBfcHJvdG8uaW50ZXJjZXB0XyA9IGZ1bmN0aW9uIGludGVyY2VwdF8oaGFuZGxlcikge1xuICAgIHJldHVybiByZWdpc3RlckludGVyY2VwdG9yKHRoaXMsIGhhbmRsZXIpO1xuICB9O1xuICBfcHJvdG8ubm90aWZ5UHJvcGVydHlBZGRpdGlvbl8gPSBmdW5jdGlvbiBub3RpZnlQcm9wZXJ0eUFkZGl0aW9uXyhrZXksIHZhbHVlKSB7XG4gICAgdmFyIF90aGlzJHBlbmRpbmdLZXlzXzIsIF90aGlzJHBlbmRpbmdLZXlzXzIkZztcbiAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzKHRoaXMpO1xuICAgIHZhciBub3RpZnlTcHkgPSBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgaXNTcHlFbmFibGVkKCk7XG4gICAgaWYgKG5vdGlmeSB8fCBub3RpZnlTcHkpIHtcbiAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5ID8ge1xuICAgICAgICB0eXBlOiBBREQsXG4gICAgICAgIG9ic2VydmFibGVLaW5kOiBcIm9iamVjdFwiLFxuICAgICAgICBkZWJ1Z09iamVjdE5hbWU6IHRoaXMubmFtZV8sXG4gICAgICAgIG9iamVjdDogdGhpcy5wcm94eV8gfHwgdGhpcy50YXJnZXRfLFxuICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgIG5ld1ZhbHVlOiB2YWx1ZVxuICAgICAgfSA6IG51bGw7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG5vdGlmeVNweSkge1xuICAgICAgICBzcHlSZXBvcnRTdGFydChjaGFuZ2UpO1xuICAgICAgfVxuICAgICAgaWYgKG5vdGlmeSkge1xuICAgICAgICBub3RpZnlMaXN0ZW5lcnModGhpcywgY2hhbmdlKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgbm90aWZ5U3B5KSB7XG4gICAgICAgIHNweVJlcG9ydEVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgICAoX3RoaXMkcGVuZGluZ0tleXNfMiA9IHRoaXMucGVuZGluZ0tleXNfKSA9PSBudWxsID8gdm9pZCAwIDogKF90aGlzJHBlbmRpbmdLZXlzXzIkZyA9IF90aGlzJHBlbmRpbmdLZXlzXzIuZ2V0KGtleSkpID09IG51bGwgPyB2b2lkIDAgOiBfdGhpcyRwZW5kaW5nS2V5c18yJGcuc2V0KHRydWUpO1xuICAgIC8vIE5vdGlmeSBcImtleXMvZW50cmllcy92YWx1ZXNcIiBvYnNlcnZlcnNcbiAgICB0aGlzLmtleXNBdG9tXy5yZXBvcnRDaGFuZ2VkKCk7XG4gIH07XG4gIF9wcm90by5vd25LZXlzXyA9IGZ1bmN0aW9uIG93bktleXNfKCkge1xuICAgIHRoaXMua2V5c0F0b21fLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgcmV0dXJuIG93bktleXModGhpcy50YXJnZXRfKTtcbiAgfTtcbiAgX3Byb3RvLmtleXNfID0gZnVuY3Rpb24ga2V5c18oKSB7XG4gICAgLy8gUmV0dXJucyBlbnVtZXJhYmxlICYmIG93biwgYnV0IHVuZm9ydHVuYXRlbHkga2V5c0F0b20gd2lsbCByZXBvcnQgb24gQU5ZIGtleSBjaGFuZ2UuXG4gICAgLy8gVGhlcmUgaXMgbm8gd2F5IHRvIGRpc3Rpbmd1aXNoIGJldHdlZW4gT2JqZWN0LmtleXMob2JqZWN0KSBhbmQgUmVmbGVjdC5vd25LZXlzKG9iamVjdCkgLSBib3RoIGFyZSBoYW5kbGVkIGJ5IG93bktleXMgdHJhcC5cbiAgICAvLyBXZSBjYW4gZWl0aGVyIG92ZXItcmVwb3J0IGluIE9iamVjdC5rZXlzKG9iamVjdCkgb3IgdW5kZXItcmVwb3J0IGluIFJlZmxlY3Qub3duS2V5cyhvYmplY3QpXG4gICAgLy8gV2UgY2hvb3NlIHRvIG92ZXItcmVwb3J0IGluIE9iamVjdC5rZXlzKG9iamVjdCksIGJlY2F1c2U6XG4gICAgLy8gLSB0eXBpY2FsbHkgaXQncyB1c2VkIHdpdGggc2ltcGxlIGRhdGEgb2JqZWN0c1xuICAgIC8vIC0gd2hlbiBzeW1ib2xpYy9ub24tZW51bWVyYWJsZSBrZXlzIGFyZSByZWxldmFudCBSZWZsZWN0Lm93bktleXMgd29ya3MgYXMgZXhwZWN0ZWRcbiAgICB0aGlzLmtleXNBdG9tXy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnRhcmdldF8pO1xuICB9O1xuICByZXR1cm4gT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uO1xufSgpO1xuZnVuY3Rpb24gYXNPYnNlcnZhYmxlT2JqZWN0KHRhcmdldCwgb3B0aW9ucykge1xuICB2YXIgX29wdGlvbnMkbmFtZTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBvcHRpb25zICYmIGlzT2JzZXJ2YWJsZU9iamVjdCh0YXJnZXQpKSB7XG4gICAgZGllKFwiT3B0aW9ucyBjYW4ndCBiZSBwcm92aWRlZCBmb3IgYWxyZWFkeSBvYnNlcnZhYmxlIG9iamVjdHMuXCIpO1xuICB9XG4gIGlmIChoYXNQcm9wKHRhcmdldCwgJG1vYngpKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhKGdldEFkbWluaXN0cmF0aW9uKHRhcmdldCkgaW5zdGFuY2VvZiBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24pKSB7XG4gICAgICBkaWUoXCJDYW5ub3QgY29udmVydCAnXCIgKyBnZXREZWJ1Z05hbWUodGFyZ2V0KSArIFwiJyBpbnRvIG9ic2VydmFibGUgb2JqZWN0OlwiICsgXCJcXG5UaGUgdGFyZ2V0IGlzIGFscmVhZHkgb2JzZXJ2YWJsZSBvZiBkaWZmZXJlbnQgdHlwZS5cIiArIFwiXFxuRXh0ZW5kaW5nIGJ1aWx0aW5zIGlzIG5vdCBzdXBwb3J0ZWQuXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIU9iamVjdC5pc0V4dGVuc2libGUodGFyZ2V0KSkge1xuICAgIGRpZShcIkNhbm5vdCBtYWtlIHRoZSBkZXNpZ25hdGVkIG9iamVjdCBvYnNlcnZhYmxlOyBpdCBpcyBub3QgZXh0ZW5zaWJsZVwiKTtcbiAgfVxuICB2YXIgbmFtZSA9IChfb3B0aW9ucyRuYW1lID0gb3B0aW9ucyA9PSBudWxsID8gdm9pZCAwIDogb3B0aW9ucy5uYW1lKSAhPSBudWxsID8gX29wdGlvbnMkbmFtZSA6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IChpc1BsYWluT2JqZWN0KHRhcmdldCkgPyBcIk9ic2VydmFibGVPYmplY3RcIiA6IHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lKSArIFwiQFwiICsgZ2V0TmV4dElkKCkgOiBcIk9ic2VydmFibGVPYmplY3RcIjtcbiAgdmFyIGFkbSA9IG5ldyBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24odGFyZ2V0LCBuZXcgTWFwKCksIFN0cmluZyhuYW1lKSwgZ2V0QW5ub3RhdGlvbkZyb21PcHRpb25zKG9wdGlvbnMpKTtcbiAgYWRkSGlkZGVuUHJvcCh0YXJnZXQsICRtb2J4LCBhZG0pO1xuICByZXR1cm4gdGFyZ2V0O1xufVxudmFyIGlzT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uID0gLyojX19QVVJFX18qL2NyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUoXCJPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb25cIiwgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uKTtcbmZ1bmN0aW9uIGdldENhY2hlZE9ic2VydmFibGVQcm9wRGVzY3JpcHRvcihrZXkpIHtcbiAgcmV0dXJuIGRlc2NyaXB0b3JDYWNoZVtrZXldIHx8IChkZXNjcmlwdG9yQ2FjaGVba2V5XSA9IHtcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzWyRtb2J4XS5nZXRPYnNlcnZhYmxlUHJvcFZhbHVlXyhrZXkpO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzWyRtb2J4XS5zZXRPYnNlcnZhYmxlUHJvcFZhbHVlXyhrZXksIHZhbHVlKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gaXNPYnNlcnZhYmxlT2JqZWN0KHRoaW5nKSB7XG4gIGlmIChpc09iamVjdCh0aGluZykpIHtcbiAgICByZXR1cm4gaXNPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24odGhpbmdbJG1vYnhdKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiByZWNvcmRBbm5vdGF0aW9uQXBwbGllZChhZG0sIGFubm90YXRpb24sIGtleSkge1xuICB2YXIgX2FkbSR0YXJnZXRfJHN0b3JlZEFuO1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgYWRtLmFwcGxpZWRBbm5vdGF0aW9uc19ba2V5XSA9IGFubm90YXRpb247XG4gIH1cbiAgLy8gUmVtb3ZlIGFwcGxpZWQgZGVjb3JhdG9yIGFubm90YXRpb24gc28gd2UgZG9uJ3QgdHJ5IHRvIGFwcGx5IGl0IGFnYWluIGluIHN1YmNsYXNzIGNvbnN0cnVjdG9yXG4gIChfYWRtJHRhcmdldF8kc3RvcmVkQW4gPSBhZG0udGFyZ2V0X1tzdG9yZWRBbm5vdGF0aW9uc1N5bWJvbF0pID09IG51bGwgPyB0cnVlIDogZGVsZXRlIF9hZG0kdGFyZ2V0XyRzdG9yZWRBbltrZXldO1xufVxuZnVuY3Rpb24gYXNzZXJ0QW5ub3RhYmxlKGFkbSwgYW5ub3RhdGlvbiwga2V5KSB7XG4gIC8vIFZhbGlkIGFubm90YXRpb25cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhaXNBbm5vdGF0aW9uKGFubm90YXRpb24pKSB7XG4gICAgZGllKFwiQ2Fubm90IGFubm90YXRlICdcIiArIGFkbS5uYW1lXyArIFwiLlwiICsga2V5LnRvU3RyaW5nKCkgKyBcIic6IEludmFsaWQgYW5ub3RhdGlvbi5cIik7XG4gIH1cbiAgLypcbiAgLy8gQ29uZmlndXJhYmxlLCBub3Qgc2VhbGVkLCBub3QgZnJvemVuXG4gIC8vIFBvc3NpYmx5IG5vdCBuZWVkZWQsIGp1c3QgYSBsaXR0bGUgYmV0dGVyIGVycm9yIHRoZW4gdGhlIG9uZSB0aHJvd24gYnkgZW5naW5lLlxuICAvLyBDYXNlcyB3aGVyZSB0aGlzIHdvdWxkIGJlIHVzZWZ1bCB0aGUgbW9zdCAoc3ViY2xhc3MgZmllbGQgaW5pdGlhbGl6ZXIpIGFyZSBub3QgaW50ZXJjZXB0YWJsZSBieSB0aGlzLlxuICBpZiAoX19ERVZfXykge1xuICAgICAgY29uc3QgY29uZmlndXJhYmxlID0gZ2V0RGVzY3JpcHRvcihhZG0udGFyZ2V0Xywga2V5KT8uY29uZmlndXJhYmxlXG4gICAgICBjb25zdCBmcm96ZW4gPSBPYmplY3QuaXNGcm96ZW4oYWRtLnRhcmdldF8pXG4gICAgICBjb25zdCBzZWFsZWQgPSBPYmplY3QuaXNTZWFsZWQoYWRtLnRhcmdldF8pXG4gICAgICBpZiAoIWNvbmZpZ3VyYWJsZSB8fCBmcm96ZW4gfHwgc2VhbGVkKSB7XG4gICAgICAgICAgY29uc3QgZmllbGROYW1lID0gYCR7YWRtLm5hbWVffS4ke2tleS50b1N0cmluZygpfWBcbiAgICAgICAgICBjb25zdCByZXF1ZXN0ZWRBbm5vdGF0aW9uVHlwZSA9IGFubm90YXRpb24uYW5ub3RhdGlvblR5cGVfXG4gICAgICAgICAgbGV0IGVycm9yID0gYENhbm5vdCBhcHBseSAnJHtyZXF1ZXN0ZWRBbm5vdGF0aW9uVHlwZX0nIHRvICcke2ZpZWxkTmFtZX0nOmBcbiAgICAgICAgICBpZiAoZnJvemVuKSB7XG4gICAgICAgICAgICAgIGVycm9yICs9IGBcXG5PYmplY3QgaXMgZnJvemVuLmBcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNlYWxlZCkge1xuICAgICAgICAgICAgICBlcnJvciArPSBgXFxuT2JqZWN0IGlzIHNlYWxlZC5gXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghY29uZmlndXJhYmxlKSB7XG4gICAgICAgICAgICAgIGVycm9yICs9IGBcXG5wcm9wZXJ0eSBpcyBub3QgY29uZmlndXJhYmxlLmBcbiAgICAgICAgICAgICAgLy8gTWVudGlvbiBvbmx5IGlmIGNhdXNlZCBieSB1cyB0byBhdm9pZCBjb25mdXNpb25cbiAgICAgICAgICAgICAgaWYgKGhhc1Byb3AoYWRtLmFwcGxpZWRBbm5vdGF0aW9ucyEsIGtleSkpIHtcbiAgICAgICAgICAgICAgICAgIGVycm9yICs9IGBcXG5UbyBwcmV2ZW50IGFjY2lkZW50YWwgcmUtZGVmaW5pdGlvbiBvZiBhIGZpZWxkIGJ5IGEgc3ViY2xhc3MsIGBcbiAgICAgICAgICAgICAgICAgIGVycm9yICs9IGBhbGwgYW5ub3RhdGVkIGZpZWxkcyBvZiBub24tcGxhaW4gb2JqZWN0cyAoY2xhc3NlcykgYXJlIG5vdCBjb25maWd1cmFibGUuYFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGRpZShlcnJvcilcbiAgICAgIH1cbiAgfVxuICAqL1xuICAvLyBOb3QgYW5ub3RhdGVkXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWlzT3ZlcnJpZGUoYW5ub3RhdGlvbikgJiYgaGFzUHJvcChhZG0uYXBwbGllZEFubm90YXRpb25zXywga2V5KSkge1xuICAgIHZhciBmaWVsZE5hbWUgPSBhZG0ubmFtZV8gKyBcIi5cIiArIGtleS50b1N0cmluZygpO1xuICAgIHZhciBjdXJyZW50QW5ub3RhdGlvblR5cGUgPSBhZG0uYXBwbGllZEFubm90YXRpb25zX1trZXldLmFubm90YXRpb25UeXBlXztcbiAgICB2YXIgcmVxdWVzdGVkQW5ub3RhdGlvblR5cGUgPSBhbm5vdGF0aW9uLmFubm90YXRpb25UeXBlXztcbiAgICBkaWUoXCJDYW5ub3QgYXBwbHkgJ1wiICsgcmVxdWVzdGVkQW5ub3RhdGlvblR5cGUgKyBcIicgdG8gJ1wiICsgZmllbGROYW1lICsgXCInOlwiICsgKFwiXFxuVGhlIGZpZWxkIGlzIGFscmVhZHkgYW5ub3RhdGVkIHdpdGggJ1wiICsgY3VycmVudEFubm90YXRpb25UeXBlICsgXCInLlwiKSArIFwiXFxuUmUtYW5ub3RhdGluZyBmaWVsZHMgaXMgbm90IGFsbG93ZWQuXCIgKyBcIlxcblVzZSAnb3ZlcnJpZGUnIGFubm90YXRpb24gZm9yIG1ldGhvZHMgb3ZlcnJpZGRlbiBieSBzdWJjbGFzcy5cIik7XG4gIH1cbn1cblxuLy8gQnVnIGluIHNhZmFyaSA5LiogKG9yIGlPUyA5IHNhZmFyaSBtb2JpbGUpLiBTZWUgIzM2NFxudmFyIEVOVFJZXzAgPSAvKiNfX1BVUkVfXyovY3JlYXRlQXJyYXlFbnRyeURlc2NyaXB0b3IoMCk7XG52YXIgc2FmYXJpUHJvdG90eXBlU2V0dGVySW5oZXJpdGFuY2VCdWcgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICB2YXIgdiA9IGZhbHNlO1xuICB2YXIgcCA9IHt9O1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocCwgXCIwXCIsIHtcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCgpIHtcbiAgICAgIHYgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIC8qI19fUFVSRV9fKi9PYmplY3QuY3JlYXRlKHApW1wiMFwiXSA9IDE7XG4gIHJldHVybiB2ID09PSBmYWxzZTtcbn0oKTtcbi8qKlxuICogVGhpcyBhcnJheSBidWZmZXIgY29udGFpbnMgdHdvIGxpc3RzIG9mIHByb3BlcnRpZXMsIHNvIHRoYXQgYWxsIGFycmF5c1xuICogY2FuIHJlY3ljbGUgdGhlaXIgcHJvcGVydHkgZGVmaW5pdGlvbnMsIHdoaWNoIHNpZ25pZmljYW50bHkgaW1wcm92ZXMgcGVyZm9ybWFuY2Ugb2YgY3JlYXRpbmdcbiAqIHByb3BlcnRpZXMgb24gdGhlIGZseS5cbiAqL1xudmFyIE9CU0VSVkFCTEVfQVJSQVlfQlVGRkVSX1NJWkUgPSAwO1xuLy8gVHlwZXNjcmlwdCB3b3JrYXJvdW5kIHRvIG1ha2Ugc3VyZSBPYnNlcnZhYmxlQXJyYXkgZXh0ZW5kcyBBcnJheVxudmFyIFN0dWJBcnJheSA9IGZ1bmN0aW9uIFN0dWJBcnJheSgpIHt9O1xuZnVuY3Rpb24gaW5oZXJpdChjdG9yLCBwcm90bykge1xuICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGN0b3IucHJvdG90eXBlLCBwcm90byk7XG4gIH0gZWxzZSBpZiAoY3Rvci5wcm90b3R5cGUuX19wcm90b19fICE9PSB1bmRlZmluZWQpIHtcbiAgICBjdG9yLnByb3RvdHlwZS5fX3Byb3RvX18gPSBwcm90bztcbiAgfSBlbHNlIHtcbiAgICBjdG9yLnByb3RvdHlwZSA9IHByb3RvO1xuICB9XG59XG5pbmhlcml0KFN0dWJBcnJheSwgQXJyYXkucHJvdG90eXBlKTtcbi8vIFdlZXggcHJvdG8gZnJlZXplIHByb3RlY3Rpb24gd2FzIGhlcmUsXG4vLyBidXQgaXQgaXMgdW5jbGVhciB3aHkgdGhlIGhhY2sgaXMgbmVlZCBhcyBNb2JYIG5ldmVyIGNoYW5nZWQgdGhlIHByb3RvdHlwZVxuLy8gYW55d2F5LCBzbyByZW1vdmVkIGl0IGluIFY2XG52YXIgTGVnYWN5T2JzZXJ2YWJsZUFycmF5ID0gLyojX19QVVJFX18qL2Z1bmN0aW9uIChfU3R1YkFycmF5LCBfU3ltYm9sJHRvU3RyaW5nVGFnLCBfU3ltYm9sJGl0ZXJhdG9yKSB7XG4gIF9pbmhlcml0c0xvb3NlKExlZ2FjeU9ic2VydmFibGVBcnJheSwgX1N0dWJBcnJheSk7XG4gIGZ1bmN0aW9uIExlZ2FjeU9ic2VydmFibGVBcnJheShpbml0aWFsVmFsdWVzLCBlbmhhbmNlciwgbmFtZSwgb3duZWQpIHtcbiAgICB2YXIgX3RoaXM7XG4gICAgaWYgKG5hbWUgPT09IHZvaWQgMCkge1xuICAgICAgbmFtZSA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiA/IFwiT2JzZXJ2YWJsZUFycmF5QFwiICsgZ2V0TmV4dElkKCkgOiBcIk9ic2VydmFibGVBcnJheVwiO1xuICAgIH1cbiAgICBpZiAob3duZWQgPT09IHZvaWQgMCkge1xuICAgICAgb3duZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgX3RoaXMgPSBfU3R1YkFycmF5LmNhbGwodGhpcykgfHwgdGhpcztcbiAgICBpbml0T2JzZXJ2YWJsZShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYWRtID0gbmV3IE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uKG5hbWUsIGVuaGFuY2VyLCBvd25lZCwgdHJ1ZSk7XG4gICAgICBhZG0ucHJveHlfID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyk7XG4gICAgICBhZGRIaWRkZW5GaW5hbFByb3AoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksICRtb2J4LCBhZG0pO1xuICAgICAgaWYgKGluaXRpYWxWYWx1ZXMgJiYgaW5pdGlhbFZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBfdGhpcy5zcGxpY2VXaXRoQXJyYXkoMCwgMCwgaW5pdGlhbFZhbHVlcyk7XG4gICAgICB9XG4gICAgICBpZiAoc2FmYXJpUHJvdG90eXBlU2V0dGVySW5oZXJpdGFuY2VCdWcpIHtcbiAgICAgICAgLy8gU2VlbXMgdGhhdCBTYWZhcmkgd29uJ3QgdXNlIG51bWVyaWMgcHJvdG90eXBlIHNldHRlciB1bnRpbCBhbnkgKiBudW1lcmljIHByb3BlcnR5IGlzXG4gICAgICAgIC8vIGRlZmluZWQgb24gdGhlIGluc3RhbmNlLiBBZnRlciB0aGF0IGl0IHdvcmtzIGZpbmUsIGV2ZW4gaWYgdGhpcyBwcm9wZXJ0eSBpcyBkZWxldGVkLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2Fzc2VydFRoaXNJbml0aWFsaXplZChfdGhpcyksIFwiMFwiLCBFTlRSWV8wKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgdmFyIF9wcm90byA9IExlZ2FjeU9ic2VydmFibGVBcnJheS5wcm90b3R5cGU7XG4gIF9wcm90by5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQoKSB7XG4gICAgdGhpc1skbW9ieF0uYXRvbV8ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJyYXlzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJyYXlzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseSh0aGlzLnNsaWNlKCksXG4gICAgLy9AdHMtaWdub3JlXG4gICAgYXJyYXlzLm1hcChmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGlzT2JzZXJ2YWJsZUFycmF5KGEpID8gYS5zbGljZSgpIDogYTtcbiAgICB9KSk7XG4gIH07XG4gIF9wcm90b1tfU3ltYm9sJGl0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIG5leHRJbmRleCA9IDA7XG4gICAgcmV0dXJuIG1ha2VJdGVyYWJsZSh7XG4gICAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICByZXR1cm4gbmV4dEluZGV4IDwgc2VsZi5sZW5ndGggPyB7XG4gICAgICAgICAgdmFsdWU6IHNlbGZbbmV4dEluZGV4KytdLFxuICAgICAgICAgIGRvbmU6IGZhbHNlXG4gICAgICAgIH0gOiB7XG4gICAgICAgICAgZG9uZTogdHJ1ZSxcbiAgICAgICAgICB2YWx1ZTogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIF9jcmVhdGVDbGFzcyhMZWdhY3lPYnNlcnZhYmxlQXJyYXksIFt7XG4gICAga2V5OiBcImxlbmd0aFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXNbJG1vYnhdLmdldEFycmF5TGVuZ3RoXygpO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQobmV3TGVuZ3RoKSB7XG4gICAgICB0aGlzWyRtb2J4XS5zZXRBcnJheUxlbmd0aF8obmV3TGVuZ3RoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IF9TeW1ib2wkdG9TdHJpbmdUYWcsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gXCJBcnJheVwiO1xuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gTGVnYWN5T2JzZXJ2YWJsZUFycmF5O1xufShTdHViQXJyYXksIFN5bWJvbC50b1N0cmluZ1RhZywgU3ltYm9sLml0ZXJhdG9yKTtcbk9iamVjdC5lbnRyaWVzKGFycmF5RXh0ZW5zaW9ucykuZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuICB2YXIgcHJvcCA9IF9yZWZbMF0sXG4gICAgZm4gPSBfcmVmWzFdO1xuICBpZiAocHJvcCAhPT0gXCJjb25jYXRcIikge1xuICAgIGFkZEhpZGRlblByb3AoTGVnYWN5T2JzZXJ2YWJsZUFycmF5LnByb3RvdHlwZSwgcHJvcCwgZm4pO1xuICB9XG59KTtcbmZ1bmN0aW9uIGNyZWF0ZUFycmF5RW50cnlEZXNjcmlwdG9yKGluZGV4KSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXNbJG1vYnhdLmdldF8oaW5kZXgpO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQodmFsdWUpIHtcbiAgICAgIHRoaXNbJG1vYnhdLnNldF8oaW5kZXgsIHZhbHVlKTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBjcmVhdGVBcnJheUJ1ZmZlckl0ZW0oaW5kZXgpIHtcbiAgZGVmaW5lUHJvcGVydHkoTGVnYWN5T2JzZXJ2YWJsZUFycmF5LnByb3RvdHlwZSwgXCJcIiArIGluZGV4LCBjcmVhdGVBcnJheUVudHJ5RGVzY3JpcHRvcihpbmRleCkpO1xufVxuZnVuY3Rpb24gcmVzZXJ2ZUFycmF5QnVmZmVyKG1heCkge1xuICBpZiAobWF4ID4gT0JTRVJWQUJMRV9BUlJBWV9CVUZGRVJfU0laRSkge1xuICAgIGZvciAodmFyIGluZGV4ID0gT0JTRVJWQUJMRV9BUlJBWV9CVUZGRVJfU0laRTsgaW5kZXggPCBtYXggKyAxMDA7IGluZGV4KyspIHtcbiAgICAgIGNyZWF0ZUFycmF5QnVmZmVySXRlbShpbmRleCk7XG4gICAgfVxuICAgIE9CU0VSVkFCTEVfQVJSQVlfQlVGRkVSX1NJWkUgPSBtYXg7XG4gIH1cbn1cbnJlc2VydmVBcnJheUJ1ZmZlcigxMDAwKTtcbmZ1bmN0aW9uIGNyZWF0ZUxlZ2FjeUFycmF5KGluaXRpYWxWYWx1ZXMsIGVuaGFuY2VyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgTGVnYWN5T2JzZXJ2YWJsZUFycmF5KGluaXRpYWxWYWx1ZXMsIGVuaGFuY2VyLCBuYW1lKTtcbn1cblxuZnVuY3Rpb24gZ2V0QXRvbSh0aGluZywgcHJvcGVydHkpIHtcbiAgaWYgKHR5cGVvZiB0aGluZyA9PT0gXCJvYmplY3RcIiAmJiB0aGluZyAhPT0gbnVsbCkge1xuICAgIGlmIChpc09ic2VydmFibGVBcnJheSh0aGluZykpIHtcbiAgICAgIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGRpZSgyMyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpbmdbJG1vYnhdLmF0b21fO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlU2V0KHRoaW5nKSkge1xuICAgICAgcmV0dXJuIHRoaW5nLmF0b21fO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlTWFwKHRoaW5nKSkge1xuICAgICAgaWYgKHByb3BlcnR5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaW5nLmtleXNBdG9tXztcbiAgICAgIH1cbiAgICAgIHZhciBvYnNlcnZhYmxlID0gdGhpbmcuZGF0YV8uZ2V0KHByb3BlcnR5KSB8fCB0aGluZy5oYXNNYXBfLmdldChwcm9wZXJ0eSk7XG4gICAgICBpZiAoIW9ic2VydmFibGUpIHtcbiAgICAgICAgZGllKDI1LCBwcm9wZXJ0eSwgZ2V0RGVidWdOYW1lKHRoaW5nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JzZXJ2YWJsZTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCh0aGluZykpIHtcbiAgICAgIGlmICghcHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIGRpZSgyNik7XG4gICAgICB9XG4gICAgICB2YXIgX29ic2VydmFibGUgPSB0aGluZ1skbW9ieF0udmFsdWVzXy5nZXQocHJvcGVydHkpO1xuICAgICAgaWYgKCFfb2JzZXJ2YWJsZSkge1xuICAgICAgICBkaWUoMjcsIHByb3BlcnR5LCBnZXREZWJ1Z05hbWUodGhpbmcpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfb2JzZXJ2YWJsZTtcbiAgICB9XG4gICAgaWYgKGlzQXRvbSh0aGluZykgfHwgaXNDb21wdXRlZFZhbHVlKHRoaW5nKSB8fCBpc1JlYWN0aW9uKHRoaW5nKSkge1xuICAgICAgcmV0dXJuIHRoaW5nO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRoaW5nKSkge1xuICAgIGlmIChpc1JlYWN0aW9uKHRoaW5nWyRtb2J4XSkpIHtcbiAgICAgIC8vIGRpc3Bvc2VyIGZ1bmN0aW9uXG4gICAgICByZXR1cm4gdGhpbmdbJG1vYnhdO1xuICAgIH1cbiAgfVxuICBkaWUoMjgpO1xufVxuZnVuY3Rpb24gZ2V0QWRtaW5pc3RyYXRpb24odGhpbmcsIHByb3BlcnR5KSB7XG4gIGlmICghdGhpbmcpIHtcbiAgICBkaWUoMjkpO1xuICB9XG4gIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uKGdldEF0b20odGhpbmcsIHByb3BlcnR5KSk7XG4gIH1cbiAgaWYgKGlzQXRvbSh0aGluZykgfHwgaXNDb21wdXRlZFZhbHVlKHRoaW5nKSB8fCBpc1JlYWN0aW9uKHRoaW5nKSkge1xuICAgIHJldHVybiB0aGluZztcbiAgfVxuICBpZiAoaXNPYnNlcnZhYmxlTWFwKHRoaW5nKSB8fCBpc09ic2VydmFibGVTZXQodGhpbmcpKSB7XG4gICAgcmV0dXJuIHRoaW5nO1xuICB9XG4gIGlmICh0aGluZ1skbW9ieF0pIHtcbiAgICByZXR1cm4gdGhpbmdbJG1vYnhdO1xuICB9XG4gIGRpZSgyNCwgdGhpbmcpO1xufVxuZnVuY3Rpb24gZ2V0RGVidWdOYW1lKHRoaW5nLCBwcm9wZXJ0eSkge1xuICB2YXIgbmFtZWQ7XG4gIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbmFtZWQgPSBnZXRBdG9tKHRoaW5nLCBwcm9wZXJ0eSk7XG4gIH0gZWxzZSBpZiAoaXNBY3Rpb24odGhpbmcpKSB7XG4gICAgcmV0dXJuIHRoaW5nLm5hbWU7XG4gIH0gZWxzZSBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0KHRoaW5nKSB8fCBpc09ic2VydmFibGVNYXAodGhpbmcpIHx8IGlzT2JzZXJ2YWJsZVNldCh0aGluZykpIHtcbiAgICBuYW1lZCA9IGdldEFkbWluaXN0cmF0aW9uKHRoaW5nKTtcbiAgfSBlbHNlIHtcbiAgICAvLyB2YWxpZCBmb3IgYXJyYXlzIGFzIHdlbGxcbiAgICBuYW1lZCA9IGdldEF0b20odGhpbmcpO1xuICB9XG4gIHJldHVybiBuYW1lZC5uYW1lXztcbn1cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIGZvciBpbml0aWFsaXppbmcgb2JzZXJ2YWJsZSBzdHJ1Y3R1cmVzLCBpdCBhcHBsaWVzOlxuICogMS4gYWxsb3dTdGF0ZUNoYW5nZXMgc28gd2UgZG9uJ3QgdmlvbGF0ZSBlbmZvcmNlQWN0aW9ucy5cbiAqIDIuIHVudHJhY2tlZCBzbyB3ZSBkb24ndCBhY2NpZGVudGFseSBzdWJzY3JpYmUgdG8gYW55dGhpbmcgb2JzZXJ2YWJsZSBhY2Nlc3NlZCBkdXJpbmcgaW5pdCBpbiBjYXNlIHRoZSBvYnNlcnZhYmxlIGlzIGNyZWF0ZWQgaW5zaWRlIGRlcml2YXRpb24uXG4gKiAzLiBiYXRjaCB0byBhdm9pZCBzdGF0ZSB2ZXJzaW9uIHVwZGF0ZXNcbiAqL1xuZnVuY3Rpb24gaW5pdE9ic2VydmFibGUoY2IpIHtcbiAgdmFyIGRlcml2YXRpb24gPSB1bnRyYWNrZWRTdGFydCgpO1xuICB2YXIgYWxsb3dTdGF0ZUNoYW5nZXMgPSBhbGxvd1N0YXRlQ2hhbmdlc1N0YXJ0KHRydWUpO1xuICBzdGFydEJhdGNoKCk7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGNiKCk7XG4gIH0gZmluYWxseSB7XG4gICAgZW5kQmF0Y2goKTtcbiAgICBhbGxvd1N0YXRlQ2hhbmdlc0VuZChhbGxvd1N0YXRlQ2hhbmdlcyk7XG4gICAgdW50cmFja2VkRW5kKGRlcml2YXRpb24pO1xuICB9XG59XG5cbnZhciB0b1N0cmluZyA9IG9iamVjdFByb3RvdHlwZS50b1N0cmluZztcbmZ1bmN0aW9uIGRlZXBFcXVhbChhLCBiLCBkZXB0aCkge1xuICBpZiAoZGVwdGggPT09IHZvaWQgMCkge1xuICAgIGRlcHRoID0gLTE7XG4gIH1cbiAgcmV0dXJuIGVxKGEsIGIsIGRlcHRoKTtcbn1cbi8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZS9ibG9iLzVjMjM3YTdjNjgyZmI2OGZkNTM3ODIwM2YwYmYyMmRjZTE2MjQ4NTQvdW5kZXJzY29yZS5qcyNMMTE4Ni1MMTI4OVxuLy8gSW50ZXJuYWwgcmVjdXJzaXZlIGNvbXBhcmlzb24gZnVuY3Rpb24gZm9yIGBpc0VxdWFsYC5cbmZ1bmN0aW9uIGVxKGEsIGIsIGRlcHRoLCBhU3RhY2ssIGJTdGFjaykge1xuICAvLyBJZGVudGljYWwgb2JqZWN0cyBhcmUgZXF1YWwuIGAwID09PSAtMGAsIGJ1dCB0aGV5IGFyZW4ndCBpZGVudGljYWwuXG4gIC8vIFNlZSB0aGUgW0hhcm1vbnkgYGVnYWxgIHByb3Bvc2FsXShodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1oYXJtb255OmVnYWwpLlxuICBpZiAoYSA9PT0gYikge1xuICAgIHJldHVybiBhICE9PSAwIHx8IDEgLyBhID09PSAxIC8gYjtcbiAgfVxuICAvLyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgb25seSBlcXVhbCB0byBpdHNlbGYgKHN0cmljdCBjb21wYXJpc29uKS5cbiAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gYE5hTmBzIGFyZSBlcXVpdmFsZW50LCBidXQgbm9uLXJlZmxleGl2ZS5cbiAgaWYgKGEgIT09IGEpIHtcbiAgICByZXR1cm4gYiAhPT0gYjtcbiAgfVxuICAvLyBFeGhhdXN0IHByaW1pdGl2ZSBjaGVja3NcbiAgdmFyIHR5cGUgPSB0eXBlb2YgYTtcbiAgaWYgKHR5cGUgIT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlICE9PSBcIm9iamVjdFwiICYmIHR5cGVvZiBiICE9IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gQ29tcGFyZSBgW1tDbGFzc11dYCBuYW1lcy5cbiAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwoYSk7XG4gIGlmIChjbGFzc05hbWUgIT09IHRvU3RyaW5nLmNhbGwoYikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3dpdGNoIChjbGFzc05hbWUpIHtcbiAgICAvLyBTdHJpbmdzLCBudW1iZXJzLCByZWd1bGFyIGV4cHJlc3Npb25zLCBkYXRlcywgYW5kIGJvb2xlYW5zIGFyZSBjb21wYXJlZCBieSB2YWx1ZS5cbiAgICBjYXNlIFwiW29iamVjdCBSZWdFeHBdXCI6XG4gICAgLy8gUmVnRXhwcyBhcmUgY29lcmNlZCB0byBzdHJpbmdzIGZvciBjb21wYXJpc29uIChOb3RlOiAnJyArIC9hL2kgPT09ICcvYS9pJylcbiAgICBjYXNlIFwiW29iamVjdCBTdHJpbmddXCI6XG4gICAgICAvLyBQcmltaXRpdmVzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIG9iamVjdCB3cmFwcGVycyBhcmUgZXF1aXZhbGVudDsgdGh1cywgYFwiNVwiYCBpc1xuICAgICAgLy8gZXF1aXZhbGVudCB0byBgbmV3IFN0cmluZyhcIjVcIilgLlxuICAgICAgcmV0dXJuIFwiXCIgKyBhID09PSBcIlwiICsgYjtcbiAgICBjYXNlIFwiW29iamVjdCBOdW1iZXJdXCI6XG4gICAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxuICAgICAgLy8gT2JqZWN0KE5hTikgaXMgZXF1aXZhbGVudCB0byBOYU4uXG4gICAgICBpZiAoK2EgIT09ICthKSB7XG4gICAgICAgIHJldHVybiArYiAhPT0gK2I7XG4gICAgICB9XG4gICAgICAvLyBBbiBgZWdhbGAgY29tcGFyaXNvbiBpcyBwZXJmb3JtZWQgZm9yIG90aGVyIG51bWVyaWMgdmFsdWVzLlxuICAgICAgcmV0dXJuICthID09PSAwID8gMSAvICthID09PSAxIC8gYiA6ICthID09PSArYjtcbiAgICBjYXNlIFwiW29iamVjdCBEYXRlXVwiOlxuICAgIGNhc2UgXCJbb2JqZWN0IEJvb2xlYW5dXCI6XG4gICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWVyaWMgcHJpbWl0aXZlIHZhbHVlcy4gRGF0ZXMgYXJlIGNvbXBhcmVkIGJ5IHRoZWlyXG4gICAgICAvLyBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnMuIE5vdGUgdGhhdCBpbnZhbGlkIGRhdGVzIHdpdGggbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zXG4gICAgICAvLyBvZiBgTmFOYCBhcmUgbm90IGVxdWl2YWxlbnQuXG4gICAgICByZXR1cm4gK2EgPT09ICtiO1xuICAgIGNhc2UgXCJbb2JqZWN0IFN5bWJvbF1cIjpcbiAgICAgIHJldHVybiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIFN5bWJvbC52YWx1ZU9mLmNhbGwoYSkgPT09IFN5bWJvbC52YWx1ZU9mLmNhbGwoYik7XG4gICAgY2FzZSBcIltvYmplY3QgTWFwXVwiOlxuICAgIGNhc2UgXCJbb2JqZWN0IFNldF1cIjpcbiAgICAgIC8vIE1hcHMgYW5kIFNldHMgYXJlIHVud3JhcHBlZCB0byBhcnJheXMgb2YgZW50cnktcGFpcnMsIGFkZGluZyBhbiBpbmNpZGVudGFsIGxldmVsLlxuICAgICAgLy8gSGlkZSB0aGlzIGV4dHJhIGxldmVsIGJ5IGluY3JlYXNpbmcgdGhlIGRlcHRoLlxuICAgICAgaWYgKGRlcHRoID49IDApIHtcbiAgICAgICAgZGVwdGgrKztcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICB9XG4gIC8vIFVud3JhcCBhbnkgd3JhcHBlZCBvYmplY3RzLlxuICBhID0gdW53cmFwKGEpO1xuICBiID0gdW53cmFwKGIpO1xuICB2YXIgYXJlQXJyYXlzID0gY2xhc3NOYW1lID09PSBcIltvYmplY3QgQXJyYXldXCI7XG4gIGlmICghYXJlQXJyYXlzKSB7XG4gICAgaWYgKHR5cGVvZiBhICE9IFwib2JqZWN0XCIgfHwgdHlwZW9mIGIgIT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBPYmplY3RzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWl2YWxlbnQsIGJ1dCBgT2JqZWN0YHMgb3IgYEFycmF5YHNcbiAgICAvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxuICAgIHZhciBhQ3RvciA9IGEuY29uc3RydWN0b3IsXG4gICAgICBiQ3RvciA9IGIuY29uc3RydWN0b3I7XG4gICAgaWYgKGFDdG9yICE9PSBiQ3RvciAmJiAhKGlzRnVuY3Rpb24oYUN0b3IpICYmIGFDdG9yIGluc3RhbmNlb2YgYUN0b3IgJiYgaXNGdW5jdGlvbihiQ3RvcikgJiYgYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcikgJiYgXCJjb25zdHJ1Y3RvclwiIGluIGEgJiYgXCJjb25zdHJ1Y3RvclwiIGluIGIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGRlcHRoID09PSAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IGVsc2UgaWYgKGRlcHRoIDwgMCkge1xuICAgIGRlcHRoID0gLTE7XG4gIH1cbiAgLy8gQXNzdW1lIGVxdWFsaXR5IGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhlIGFsZ29yaXRobSBmb3IgZGV0ZWN0aW5nIGN5Y2xpY1xuICAvLyBzdHJ1Y3R1cmVzIGlzIGFkYXB0ZWQgZnJvbSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLCBhYnN0cmFjdCBvcGVyYXRpb24gYEpPYC5cbiAgLy8gSW5pdGlhbGl6aW5nIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAvLyBJdCdzIGRvbmUgaGVyZSBzaW5jZSB3ZSBvbmx5IG5lZWQgdGhlbSBmb3Igb2JqZWN0cyBhbmQgYXJyYXlzIGNvbXBhcmlzb24uXG4gIGFTdGFjayA9IGFTdGFjayB8fCBbXTtcbiAgYlN0YWNrID0gYlN0YWNrIHx8IFtdO1xuICB2YXIgbGVuZ3RoID0gYVN0YWNrLmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgLy8gTGluZWFyIHNlYXJjaC4gUGVyZm9ybWFuY2UgaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mXG4gICAgLy8gdW5pcXVlIG5lc3RlZCBzdHJ1Y3R1cmVzLlxuICAgIGlmIChhU3RhY2tbbGVuZ3RoXSA9PT0gYSkge1xuICAgICAgcmV0dXJuIGJTdGFja1tsZW5ndGhdID09PSBiO1xuICAgIH1cbiAgfVxuICAvLyBBZGQgdGhlIGZpcnN0IG9iamVjdCB0byB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gIGFTdGFjay5wdXNoKGEpO1xuICBiU3RhY2sucHVzaChiKTtcbiAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIGFuZCBhcnJheXMuXG4gIGlmIChhcmVBcnJheXMpIHtcbiAgICAvLyBDb21wYXJlIGFycmF5IGxlbmd0aHMgdG8gZGV0ZXJtaW5lIGlmIGEgZGVlcCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeS5cbiAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICBpZiAobGVuZ3RoICE9PSBiLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBEZWVwIGNvbXBhcmUgdGhlIGNvbnRlbnRzLCBpZ25vcmluZyBub24tbnVtZXJpYyBwcm9wZXJ0aWVzLlxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgaWYgKCFlcShhW2xlbmd0aF0sIGJbbGVuZ3RoXSwgZGVwdGggLSAxLCBhU3RhY2ssIGJTdGFjaykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBEZWVwIGNvbXBhcmUgb2JqZWN0cy5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGEpO1xuICAgIHZhciBrZXk7XG4gICAgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgLy8gRW5zdXJlIHRoYXQgYm90aCBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyIG9mIHByb3BlcnRpZXMgYmVmb3JlIGNvbXBhcmluZyBkZWVwIGVxdWFsaXR5LlxuICAgIGlmIChPYmplY3Qua2V5cyhiKS5sZW5ndGggIT09IGxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIC8vIERlZXAgY29tcGFyZSBlYWNoIG1lbWJlclxuICAgICAga2V5ID0ga2V5c1tsZW5ndGhdO1xuICAgICAgaWYgKCEoaGFzUHJvcChiLCBrZXkpICYmIGVxKGFba2V5XSwgYltrZXldLCBkZXB0aCAtIDEsIGFTdGFjaywgYlN0YWNrKSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBSZW1vdmUgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgYVN0YWNrLnBvcCgpO1xuICBiU3RhY2sucG9wKCk7XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gdW53cmFwKGEpIHtcbiAgaWYgKGlzT2JzZXJ2YWJsZUFycmF5KGEpKSB7XG4gICAgcmV0dXJuIGEuc2xpY2UoKTtcbiAgfVxuICBpZiAoaXNFUzZNYXAoYSkgfHwgaXNPYnNlcnZhYmxlTWFwKGEpKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYS5lbnRyaWVzKCkpO1xuICB9XG4gIGlmIChpc0VTNlNldChhKSB8fCBpc09ic2VydmFibGVTZXQoYSkpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShhLmVudHJpZXMoKSk7XG4gIH1cbiAgcmV0dXJuIGE7XG59XG5cbmZ1bmN0aW9uIG1ha2VJdGVyYWJsZShpdGVyYXRvcikge1xuICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZ2V0U2VsZjtcbiAgcmV0dXJuIGl0ZXJhdG9yO1xufVxuZnVuY3Rpb24gZ2V0U2VsZigpIHtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZ1bmN0aW9uIGlzQW5ub3RhdGlvbih0aGluZykge1xuICByZXR1cm4gKFxuICAgIC8vIENhbiBiZSBmdW5jdGlvblxuICAgIHRoaW5nIGluc3RhbmNlb2YgT2JqZWN0ICYmIHR5cGVvZiB0aGluZy5hbm5vdGF0aW9uVHlwZV8gPT09IFwic3RyaW5nXCIgJiYgaXNGdW5jdGlvbih0aGluZy5tYWtlXykgJiYgaXNGdW5jdGlvbih0aGluZy5leHRlbmRfKVxuICApO1xufVxuXG4vKipcbiAqIChjKSBNaWNoZWwgV2VzdHN0cmF0ZSAyMDE1IC0gMjAyMFxuICogTUlUIExpY2Vuc2VkXG4gKlxuICogV2VsY29tZSB0byB0aGUgbW9ieCBzb3VyY2VzISBUbyBnZXQgYSBnbG9iYWwgb3ZlcnZpZXcgb2YgaG93IE1vYlggaW50ZXJuYWxseSB3b3JrcyxcbiAqIHRoaXMgaXMgYSBnb29kIHBsYWNlIHRvIHN0YXJ0OlxuICogaHR0cHM6Ly9tZWRpdW0uY29tL0Btd2VzdHN0cmF0ZS9iZWNvbWluZy1mdWxseS1yZWFjdGl2ZS1hbi1pbi1kZXB0aC1leHBsYW5hdGlvbi1vZi1tb2JzZXJ2YWJsZS01NTk5NTI2MmEyNTQjLnh2Ymg2cWQ3NFxuICpcbiAqIFNvdXJjZSBmb2xkZXJzOlxuICogPT09PT09PT09PT09PT09XG4gKlxuICogLSBhcGkvICAgICBNb3N0IG9mIHRoZSBwdWJsaWMgc3RhdGljIG1ldGhvZHMgZXhwb3NlZCBieSB0aGUgbW9kdWxlIGNhbiBiZSBmb3VuZCBoZXJlLlxuICogLSBjb3JlLyAgICBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgTW9iWCBhbGdvcml0aG07IGF0b21zLCBkZXJpdmF0aW9ucywgcmVhY3Rpb25zLCBkZXBlbmRlbmN5IHRyZWVzLCBvcHRpbWl6YXRpb25zLiBDb29sIHN0dWZmIGNhbiBiZSBmb3VuZCBoZXJlLlxuICogLSB0eXBlcy8gICBBbGwgdGhlIG1hZ2ljIHRoYXQgaXMgbmVlZCB0byBoYXZlIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzIGFuZCB2YWx1ZXMgaXMgaW4gdGhpcyBmb2xkZXIuIEluY2x1ZGluZyB0aGUgbW9kaWZpZXJzIGxpa2UgYGFzRmxhdGAuXG4gKiAtIHV0aWxzLyAgIFV0aWxpdHkgc3R1ZmYuXG4gKlxuICovXG5bXCJTeW1ib2xcIiwgXCJNYXBcIiwgXCJTZXRcIl0uZm9yRWFjaChmdW5jdGlvbiAobSkge1xuICB2YXIgZyA9IGdldEdsb2JhbCgpO1xuICBpZiAodHlwZW9mIGdbbV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBkaWUoXCJNb2JYIHJlcXVpcmVzIGdsb2JhbCAnXCIgKyBtICsgXCInIHRvIGJlIGF2YWlsYWJsZSBvciBwb2x5ZmlsbGVkXCIpO1xuICB9XG59KTtcbmlmICh0eXBlb2YgX19NT0JYX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gPT09IFwib2JqZWN0XCIpIHtcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYW5keWtvZy9tb2J4LWRldnRvb2xzL1xuICBfX01PQlhfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5pbmplY3RNb2J4KHtcbiAgICBzcHk6IHNweSxcbiAgICBleHRyYXM6IHtcbiAgICAgIGdldERlYnVnTmFtZTogZ2V0RGVidWdOYW1lXG4gICAgfSxcbiAgICAkbW9ieDogJG1vYnhcbiAgfSk7XG59XG5cbmV4cG9ydCB7ICRtb2J4LCBGbG93Q2FuY2VsbGF0aW9uRXJyb3IsIE9ic2VydmFibGVNYXAsIE9ic2VydmFibGVTZXQsIFJlYWN0aW9uLCBhbGxvd1N0YXRlQ2hhbmdlcyBhcyBfYWxsb3dTdGF0ZUNoYW5nZXMsIHJ1bkluQWN0aW9uIGFzIF9hbGxvd1N0YXRlQ2hhbmdlc0luc2lkZUNvbXB1dGVkLCBhbGxvd1N0YXRlUmVhZHNFbmQgYXMgX2FsbG93U3RhdGVSZWFkc0VuZCwgYWxsb3dTdGF0ZVJlYWRzU3RhcnQgYXMgX2FsbG93U3RhdGVSZWFkc1N0YXJ0LCBhdXRvQWN0aW9uIGFzIF9hdXRvQWN0aW9uLCBfZW5kQWN0aW9uLCBnZXRBZG1pbmlzdHJhdGlvbiBhcyBfZ2V0QWRtaW5pc3RyYXRpb24sIGdldEdsb2JhbFN0YXRlIGFzIF9nZXRHbG9iYWxTdGF0ZSwgaW50ZXJjZXB0UmVhZHMgYXMgX2ludGVyY2VwdFJlYWRzLCBpc0NvbXB1dGluZ0Rlcml2YXRpb24gYXMgX2lzQ29tcHV0aW5nRGVyaXZhdGlvbiwgcmVzZXRHbG9iYWxTdGF0ZSBhcyBfcmVzZXRHbG9iYWxTdGF0ZSwgX3N0YXJ0QWN0aW9uLCBhY3Rpb24sIGF1dG9ydW4sIGNvbXBhcmVyLCBjb21wdXRlZCwgY29uZmlndXJlLCBjcmVhdGVBdG9tLCBhcGlEZWZpbmVQcm9wZXJ0eSBhcyBkZWZpbmVQcm9wZXJ0eSwgZW50cmllcywgZXh0ZW5kT2JzZXJ2YWJsZSwgZmxvdywgZmxvd1Jlc3VsdCwgZ2V0LCBnZXRBdG9tLCBnZXREZWJ1Z05hbWUsIGdldERlcGVuZGVuY3lUcmVlLCBnZXRPYnNlcnZlclRyZWUsIGhhcywgaW50ZXJjZXB0LCBpc0FjdGlvbiwgaXNPYnNlcnZhYmxlVmFsdWUgYXMgaXNCb3hlZE9ic2VydmFibGUsIGlzQ29tcHV0ZWQsIGlzQ29tcHV0ZWRQcm9wLCBpc0Zsb3csIGlzRmxvd0NhbmNlbGxhdGlvbkVycm9yLCBpc09ic2VydmFibGUsIGlzT2JzZXJ2YWJsZUFycmF5LCBpc09ic2VydmFibGVNYXAsIGlzT2JzZXJ2YWJsZU9iamVjdCwgaXNPYnNlcnZhYmxlUHJvcCwgaXNPYnNlcnZhYmxlU2V0LCBrZXlzLCBtYWtlQXV0b09ic2VydmFibGUsIG1ha2VPYnNlcnZhYmxlLCBvYnNlcnZhYmxlLCBvYnNlcnZlLCBvbkJlY29tZU9ic2VydmVkLCBvbkJlY29tZVVub2JzZXJ2ZWQsIG9uUmVhY3Rpb25FcnJvciwgb3ZlcnJpZGUsIGFwaU93bktleXMgYXMgb3duS2V5cywgcmVhY3Rpb24sIHJlbW92ZSwgcnVuSW5BY3Rpb24sIHNldCwgc3B5LCB0b0pTLCB0cmFjZSwgdHJhbnNhY3Rpb24sIHVudHJhY2tlZCwgdmFsdWVzLCB3aGVuIH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1tb2J4LmVzbS5qcy5tYXBcbiIsImltcG9ydCB7IG1ha2VPYnNlcnZhYmxlIH0gZnJvbSBcIm1vYnhcIjtcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pZiAoIXVzZVN0YXRlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibW9ieC1yZWFjdC1saXRlIHJlcXVpcmVzIFJlYWN0IHdpdGggSG9va3Mgc3VwcG9ydFwiKTtcbn1cbmlmICghbWFrZU9ic2VydmFibGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJtb2J4LXJlYWN0LWxpdGVAMyByZXF1aXJlcyBtb2J4IGF0IGxlYXN0IHZlcnNpb24gNiB0byBiZSBhdmFpbGFibGVcIik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc3NlcnRFbnZpcm9ubWVudC5qcy5tYXAiLCJpbXBvcnQgeyBjb25maWd1cmUgfSBmcm9tIFwibW9ieFwiO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHROb29wQmF0Y2goY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjaygpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVyQmF0Y2hpbmcocmVhY3Rpb25TY2hlZHVsZXIpIHtcbiAgICBpZiAoIXJlYWN0aW9uU2NoZWR1bGVyKSB7XG4gICAgICAgIHJlYWN0aW9uU2NoZWR1bGVyID0gZGVmYXVsdE5vb3BCYXRjaDtcbiAgICAgICAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW01vYlhdIEZhaWxlZCB0byBnZXQgdW5zdGFibGVfYmF0Y2hlZCB1cGRhdGVzIGZyb20gcmVhY3QtZG9tIC8gcmVhY3QtbmF0aXZlXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbmZpZ3VyZSh7IHJlYWN0aW9uU2NoZWR1bGVyOiByZWFjdGlvblNjaGVkdWxlciB9KTtcbn1cbmV4cG9ydCB2YXIgaXNPYnNlcnZlckJhdGNoZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbTW9iWF0gRGVwcmVjYXRlZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2ZXJCYXRjaGluZy5qcy5tYXAiLCJpbXBvcnQgeyBnZXREZXBlbmRlbmN5VHJlZSB9IGZyb20gXCJtb2J4XCI7XG5leHBvcnQgZnVuY3Rpb24gcHJpbnREZWJ1Z1ZhbHVlKHYpIHtcbiAgICByZXR1cm4gZ2V0RGVwZW5kZW5jeVRyZWUodik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmludERlYnVnVmFsdWUuanMubWFwIiwiZXhwb3J0IHZhciBSRUdJU1RSWV9GSU5BTElaRV9BRlRFUiA9IDEwMDAwO1xuZXhwb3J0IHZhciBSRUdJU1RSWV9TV0VFUF9JTlRFUlZBTCA9IDEwMDAwO1xudmFyIFRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnkoZmluYWxpemUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZmluYWxpemVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGZpbmFsaXplXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJyZWdpc3RyYXRpb25zXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBuZXcgTWFwKClcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInN3ZWVwVGltZW91dFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBCb3VuZCBzbyBpdCBjYW4gYmUgdXNlZCBkaXJlY3RseSBhcyBzZXRUaW1lb3V0IGNhbGxiYWNrLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJzd2VlcFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKG1heEFnZSkge1xuICAgICAgICAgICAgICAgIGlmIChtYXhBZ2UgPT09IHZvaWQgMCkgeyBtYXhBZ2UgPSBSRUdJU1RSWV9GSU5BTElaRV9BRlRFUjsgfVxuICAgICAgICAgICAgICAgIC8vIGNhbmNlbCB0aW1lb3V0IHNvIHdlIGNhbiBmb3JjZSBzd2VlcCBhbnl0aW1lXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLnN3ZWVwVGltZW91dCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuc3dlZXBUaW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIF90aGlzLnJlZ2lzdHJhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocmVnaXN0cmF0aW9uLCB0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm93IC0gcmVnaXN0cmF0aW9uLnJlZ2lzdGVyZWRBdCA+PSBtYXhBZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmFsaXplKHJlZ2lzdHJhdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZWdpc3RyYXRpb25zLmRlbGV0ZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMucmVnaXN0cmF0aW9ucy5zaXplID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zY2hlZHVsZVN3ZWVwKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQm91bmQgc28gaXQgY2FuIGJlIGV4cG9ydGVkIGRpcmVjdGx5IGFzIGNsZWFyVGltZXJzIHRlc3QgdXRpbGl0eS5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZmluYWxpemVBbGxJbW1lZGlhdGVseVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnN3ZWVwKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gVG9rZW4gaXMgYWN0dWFsbHkgcmVxdWlyZWQgd2l0aCB0aGlzIGltcGxcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5LnByb3RvdHlwZSwgXCJyZWdpc3RlclwiLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHRhcmdldCwgdmFsdWUsIHRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbnMuc2V0KHRva2VuLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyZWRBdDogRGF0ZS5ub3coKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlU3dlZXAoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnkucHJvdG90eXBlLCBcInVucmVnaXN0ZXJcIiwge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb25zLmRlbGV0ZSh0b2tlbik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5LnByb3RvdHlwZSwgXCJzY2hlZHVsZVN3ZWVwXCIsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zd2VlcFRpbWVvdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3dlZXBUaW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLnN3ZWVwLCBSRUdJU1RSWV9TV0VFUF9JTlRFUlZBTCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5O1xufSgpKTtcbmV4cG9ydCB7IFRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeSB9O1xuZXhwb3J0IHZhciBVbml2ZXJzYWxGaW5hbGl6YXRpb25SZWdpc3RyeSA9IHR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeSAhPT0gXCJ1bmRlZmluZWRcIlxuICAgID8gRmluYWxpemF0aW9uUmVnaXN0cnlcbiAgICA6IFRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuaXZlcnNhbEZpbmFsaXphdGlvblJlZ2lzdHJ5LmpzLm1hcCIsImltcG9ydCB7IFVuaXZlcnNhbEZpbmFsaXphdGlvblJlZ2lzdHJ5IH0gZnJvbSBcIi4vVW5pdmVyc2FsRmluYWxpemF0aW9uUmVnaXN0cnlcIjtcbmV4cG9ydCB2YXIgb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeSA9IG5ldyBVbml2ZXJzYWxGaW5hbGl6YXRpb25SZWdpc3RyeShmdW5jdGlvbiAoYWRtKSB7XG4gICAgdmFyIF9hO1xuICAgIChfYSA9IGFkbS5yZWFjdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRpc3Bvc2UoKTtcbiAgICBhZG0ucmVhY3Rpb24gPSBudWxsO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5LmpzLm1hcCIsImltcG9ydCB7IFJlYWN0aW9uIH0gZnJvbSBcIm1vYnhcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHByaW50RGVidWdWYWx1ZSB9IGZyb20gXCIuL3V0aWxzL3ByaW50RGVidWdWYWx1ZVwiO1xuaW1wb3J0IHsgaXNVc2luZ1N0YXRpY1JlbmRlcmluZyB9IGZyb20gXCIuL3N0YXRpY1JlbmRlcmluZ1wiO1xuaW1wb3J0IHsgb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeSB9IGZyb20gXCIuL3V0aWxzL29ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnlcIjtcbmZ1bmN0aW9uIGNyZWF0ZVJlYWN0aW9uKGFkbSkge1xuICAgIGFkbS5yZWFjdGlvbiA9IG5ldyBSZWFjdGlvbihcIm9ic2VydmVyXCIuY29uY2F0KGFkbS5uYW1lKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGFkbS5zdGF0ZVZlcnNpb24gPSBTeW1ib2woKTtcbiAgICAgICAgLy8gb25TdG9yZUNoYW5nZSB3b24ndCBiZSBhdmFpbGFibGUgdW50aWwgdGhlIGNvbXBvbmVudCBcIm1vdW50c1wiLlxuICAgICAgICAvLyBJZiBzdGF0ZSBjaGFuZ2VzIGluIGJldHdlZW4gaW5pdGlhbCByZW5kZXIgYW5kIG1vdW50LFxuICAgICAgICAvLyBgdXNlU3luY0V4dGVybmFsU3RvcmVgIHNob3VsZCBoYW5kbGUgdGhhdCBieSBjaGVja2luZyB0aGUgc3RhdGUgdmVyc2lvbiBhbmQgaXNzdWluZyB1cGRhdGUuXG4gICAgICAgIChfYSA9IGFkbS5vblN0b3JlQ2hhbmdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChhZG0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVzZU9ic2VydmVyKHJlbmRlciwgYmFzZUNvbXBvbmVudE5hbWUpIHtcbiAgICBpZiAoYmFzZUNvbXBvbmVudE5hbWUgPT09IHZvaWQgMCkgeyBiYXNlQ29tcG9uZW50TmFtZSA9IFwib2JzZXJ2ZWRcIjsgfVxuICAgIGlmIChpc1VzaW5nU3RhdGljUmVuZGVyaW5nKCkpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlcigpO1xuICAgIH1cbiAgICB2YXIgYWRtUmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICAgIGlmICghYWRtUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgLy8gRmlyc3QgcmVuZGVyXG4gICAgICAgIHZhciBhZG1fMSA9IHtcbiAgICAgICAgICAgIHJlYWN0aW9uOiBudWxsLFxuICAgICAgICAgICAgb25TdG9yZUNoYW5nZTogbnVsbCxcbiAgICAgICAgICAgIHN0YXRlVmVyc2lvbjogU3ltYm9sKCksXG4gICAgICAgICAgICBuYW1lOiBiYXNlQ29tcG9uZW50TmFtZSxcbiAgICAgICAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gKG9uU3RvcmVDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAvLyBEbyBOT1QgYWNjZXNzIGFkbVJlZiBoZXJlIVxuICAgICAgICAgICAgICAgIG9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkudW5yZWdpc3RlcihhZG1fMSk7XG4gICAgICAgICAgICAgICAgYWRtXzEub25TdG9yZUNoYW5nZSA9IG9uU3RvcmVDaGFuZ2U7XG4gICAgICAgICAgICAgICAgaWYgKCFhZG1fMS5yZWFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSd2ZSBsb3N0IG91ciByZWFjdGlvbiBhbmQgdGhlcmVmb3JlIGFsbCBzdWJzY3JpcHRpb25zLCBvY2N1cnMgd2hlbjpcbiAgICAgICAgICAgICAgICAgICAgLy8gMS4gVGltZXIgYmFzZWQgZmluYWxpemF0aW9uIHJlZ2lzdHJ5IGRpc3Bvc2VkIHJlYWN0aW9uIGJlZm9yZSBjb21wb25lbnQgbW91bnRlZC5cbiAgICAgICAgICAgICAgICAgICAgLy8gMi4gUmVhY3QgXCJyZS1tb3VudHNcIiBzYW1lIGNvbXBvbmVudCB3aXRob3V0IGNhbGxpbmcgcmVuZGVyIGluIGJldHdlZW4gKHR5cGljYWxseSA8U3RyaWN0TW9kZT4pLlxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHJlY3JlYXRlIHJlYWN0aW9uIGFuZCBzY2hlZHVsZSByZS1yZW5kZXIgdG8gcmVjcmVhdGUgc3Vic2NyaXB0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlbiBpZiBzdGF0ZSBkaWQgbm90IGNoYW5nZS5cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlUmVhY3Rpb24oYWRtXzEpO1xuICAgICAgICAgICAgICAgICAgICAvLyBgb25TdG9yZUNoYW5nZWAgd29uJ3QgZm9yY2UgdXBkYXRlIGlmIHN1YnNlcXVlbnQgYGdldFNuYXBzaG90YCByZXR1cm5zIHNhbWUgdmFsdWUuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNvIHdlIG1ha2Ugc3VyZSB0aGF0IGlzIG5vdCB0aGUgY2FzZVxuICAgICAgICAgICAgICAgICAgICBhZG1fMS5zdGF0ZVZlcnNpb24gPSBTeW1ib2woKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICAvLyBEbyBOT1QgYWNjZXNzIGFkbVJlZiBoZXJlIVxuICAgICAgICAgICAgICAgICAgICBhZG1fMS5vblN0b3JlQ2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gYWRtXzEucmVhY3Rpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGFkbV8xLnJlYWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFNuYXBzaG90OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gRG8gTk9UIGFjY2VzcyBhZG1SZWYgaGVyZSFcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRtXzEuc3RhdGVWZXJzaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBhZG1SZWYuY3VycmVudCA9IGFkbV8xO1xuICAgIH1cbiAgICB2YXIgYWRtID0gYWRtUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFhZG0ucmVhY3Rpb24pIHtcbiAgICAgICAgLy8gRmlyc3QgcmVuZGVyIG9yIHJlYWN0aW9uIHdhcyBkaXNwb3NlZCBieSByZWdpc3RyeSBiZWZvcmUgc3Vic2NyaWJlXG4gICAgICAgIGNyZWF0ZVJlYWN0aW9uKGFkbSk7XG4gICAgICAgIC8vIFN0cmljdE1vZGUvQ29uY3VycmVudE1vZGUvU3VzcGVuc2UgbWF5IG1lYW4gdGhhdCBvdXIgY29tcG9uZW50IGlzXG4gICAgICAgIC8vIHJlbmRlcmVkIGFuZCBhYmFuZG9uZWQgbXVsdGlwbGUgdGltZXMsIHNvIHdlIG5lZWQgdG8gdHJhY2sgbGVha2VkXG4gICAgICAgIC8vIFJlYWN0aW9ucy5cbiAgICAgICAgb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeS5yZWdpc3RlcihhZG1SZWYsIGFkbSwgYWRtKTtcbiAgICB9XG4gICAgUmVhY3QudXNlRGVidWdWYWx1ZShhZG0ucmVhY3Rpb24sIHByaW50RGVidWdWYWx1ZSk7XG4gICAgUmVhY3QudXNlU3luY0V4dGVybmFsU3RvcmUoXG4gICAgLy8gQm90aCBvZiB0aGVzZSBtdXN0IGJlIHN0YWJsZSwgb3RoZXJ3aXNlIGl0IHdvdWxkIGtlZXAgcmVzdWJzY3JpYmluZyBldmVyeSByZW5kZXIuXG4gICAgYWRtLnN1YnNjcmliZSwgYWRtLmdldFNuYXBzaG90LCBhZG0uZ2V0U25hcHNob3QpO1xuICAgIC8vIHJlbmRlciB0aGUgb3JpZ2luYWwgY29tcG9uZW50LCBidXQgaGF2ZSB0aGVcbiAgICAvLyByZWFjdGlvbiB0cmFjayB0aGUgb2JzZXJ2YWJsZXMsIHNvIHRoYXQgcmVuZGVyaW5nXG4gICAgLy8gY2FuIGJlIGludmFsaWRhdGVkIChzZWUgYWJvdmUpIG9uY2UgYSBkZXBlbmRlbmN5IGNoYW5nZXNcbiAgICB2YXIgcmVuZGVyUmVzdWx0O1xuICAgIHZhciBleGNlcHRpb247XG4gICAgYWRtLnJlYWN0aW9uLnRyYWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlbmRlclJlc3VsdCA9IHJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBleGNlcHRpb24gPSBlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGV4Y2VwdGlvbikge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247IC8vIHJlLXRocm93IGFueSBleGNlcHRpb25zIGNhdWdodCBkdXJpbmcgcmVuZGVyaW5nXG4gICAgfVxuICAgIHJldHVybiByZW5kZXJSZXN1bHQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VPYnNlcnZlci5qcy5tYXAiLCJ2YXIgX2EsIF9iO1xuaW1wb3J0IHsgZm9yd2FyZFJlZiwgbWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaXNVc2luZ1N0YXRpY1JlbmRlcmluZyB9IGZyb20gXCIuL3N0YXRpY1JlbmRlcmluZ1wiO1xuaW1wb3J0IHsgdXNlT2JzZXJ2ZXIgfSBmcm9tIFwiLi91c2VPYnNlcnZlclwiO1xudmFyIHdhcm5PYnNlcnZlck9wdGlvbnNEZXByZWNhdGVkID0gdHJ1ZTtcbnZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLmZvcjtcbnZhciBpc0Z1bmN0aW9uTmFtZUNvbmZpZ3VyYWJsZSA9IChfYiA9IChfYSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZnVuY3Rpb24gKCkgeyB9LCBcIm5hbWVcIikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb25maWd1cmFibGUpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGZhbHNlO1xuLy8gVXNpbmcgcmVhY3QtaXMgaGFkIHNvbWUgaXNzdWVzIChhbmQgb3BlcmF0ZXMgb24gZWxlbWVudHMsIG5vdCBvbiB0eXBlcyksIHNlZSAjNjA4IC8gIzYwOVxudmFyIFJlYWN0Rm9yd2FyZFJlZlN5bWJvbCA9IGhhc1N5bWJvbFxuICAgID8gU3ltYm9sLmZvcihcInJlYWN0LmZvcndhcmRfcmVmXCIpXG4gICAgOiB0eXBlb2YgZm9yd2FyZFJlZiA9PT0gXCJmdW5jdGlvblwiICYmIGZvcndhcmRSZWYoZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBudWxsOyB9KVtcIiQkdHlwZW9mXCJdO1xudmFyIFJlYWN0TWVtb1N5bWJvbCA9IGhhc1N5bWJvbFxuICAgID8gU3ltYm9sLmZvcihcInJlYWN0Lm1lbW9cIilcbiAgICA6IHR5cGVvZiBtZW1vID09PSBcImZ1bmN0aW9uXCIgJiYgbWVtbyhmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIG51bGw7IH0pW1wiJCR0eXBlb2ZcIl07XG4vLyBuLmIuIGJhc2UgY2FzZSBpcyBub3QgdXNlZCBmb3IgYWN0dWFsIHR5cGluZ3Mgb3IgZXhwb3J0ZWQgaW4gdGhlIHR5cGluZyBmaWxlc1xuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVyKGJhc2VDb21wb25lbnQsIFxuLy8gVE9ETyByZW1vdmUgaW4gbmV4dCBtYWpvclxub3B0aW9ucykge1xuICAgIHZhciBfYTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIHdhcm5PYnNlcnZlck9wdGlvbnNEZXByZWNhdGVkICYmIG9wdGlvbnMpIHtcbiAgICAgICAgd2Fybk9ic2VydmVyT3B0aW9uc0RlcHJlY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW21vYngtcmVhY3QtbGl0ZV0gYG9ic2VydmVyKGZuLCB7IGZvcndhcmRSZWY6IHRydWUgfSlgIGlzIGRlcHJlY2F0ZWQsIHVzZSBgb2JzZXJ2ZXIoUmVhY3QuZm9yd2FyZFJlZihmbikpYFwiKTtcbiAgICB9XG4gICAgaWYgKFJlYWN0TWVtb1N5bWJvbCAmJiBiYXNlQ29tcG9uZW50W1wiJCR0eXBlb2ZcIl0gPT09IFJlYWN0TWVtb1N5bWJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieC1yZWFjdC1saXRlXSBZb3UgYXJlIHRyeWluZyB0byB1c2UgYG9ic2VydmVyYCBvbiBhIGZ1bmN0aW9uIGNvbXBvbmVudCB3cmFwcGVkIGluIGVpdGhlciBhbm90aGVyIGBvYnNlcnZlcmAgb3IgYFJlYWN0Lm1lbW9gLiBUaGUgb2JzZXJ2ZXIgYWxyZWFkeSBhcHBsaWVzICdSZWFjdC5tZW1vJyBmb3IgeW91LlwiKTtcbiAgICB9XG4gICAgLy8gVGhlIHdvcmtpbmcgb2Ygb2JzZXJ2ZXIgaXMgZXhwbGFpbmVkIHN0ZXAgYnkgc3RlcCBpbiB0aGlzIHRhbGs6IGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9Y1BGNGlCZWRvRjAmZmVhdHVyZT15b3V0dS5iZSZ0PTEzMDdcbiAgICBpZiAoaXNVc2luZ1N0YXRpY1JlbmRlcmluZygpKSB7XG4gICAgICAgIHJldHVybiBiYXNlQ29tcG9uZW50O1xuICAgIH1cbiAgICB2YXIgdXNlRm9yd2FyZFJlZiA9IChfYSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5mb3J3YXJkUmVmKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBmYWxzZTtcbiAgICB2YXIgcmVuZGVyID0gYmFzZUNvbXBvbmVudDtcbiAgICB2YXIgYmFzZUNvbXBvbmVudE5hbWUgPSBiYXNlQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IGJhc2VDb21wb25lbnQubmFtZTtcbiAgICAvLyBJZiBhbHJlYWR5IHdyYXBwZWQgd2l0aCBmb3J3YXJkUmVmLCB1bndyYXAsXG4gICAgLy8gc28gd2UgY2FuIHBhdGNoIHJlbmRlciBhbmQgYXBwbHkgbWVtb1xuICAgIGlmIChSZWFjdEZvcndhcmRSZWZTeW1ib2wgJiYgYmFzZUNvbXBvbmVudFtcIiQkdHlwZW9mXCJdID09PSBSZWFjdEZvcndhcmRSZWZTeW1ib2wpIHtcbiAgICAgICAgdXNlRm9yd2FyZFJlZiA9IHRydWU7XG4gICAgICAgIHJlbmRlciA9IGJhc2VDb21wb25lbnRbXCJyZW5kZXJcIl07XG4gICAgICAgIGlmICh0eXBlb2YgcmVuZGVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4LXJlYWN0LWxpdGVdIGByZW5kZXJgIHByb3BlcnR5IG9mIEZvcndhcmRSZWYgd2FzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBvYnNlcnZlckNvbXBvbmVudCA9IGZ1bmN0aW9uIChwcm9wcywgcmVmKSB7XG4gICAgICAgIHJldHVybiB1c2VPYnNlcnZlcihmdW5jdGlvbiAoKSB7IHJldHVybiByZW5kZXIocHJvcHMsIHJlZik7IH0sIGJhc2VDb21wb25lbnROYW1lKTtcbiAgICB9O1xuICAgIG9ic2VydmVyQ29tcG9uZW50LmRpc3BsYXlOYW1lID0gYmFzZUNvbXBvbmVudC5kaXNwbGF5TmFtZTtcbiAgICBpZiAoaXNGdW5jdGlvbk5hbWVDb25maWd1cmFibGUpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9ic2VydmVyQ29tcG9uZW50LCBcIm5hbWVcIiwge1xuICAgICAgICAgICAgdmFsdWU6IGJhc2VDb21wb25lbnQubmFtZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBTdXBwb3J0IGxlZ2FjeSBjb250ZXh0OiBgY29udGV4dFR5cGVzYCBtdXN0IGJlIGFwcGxpZWQgYmVmb3JlIGBtZW1vYFxuICAgIGlmIChiYXNlQ29tcG9uZW50LmNvbnRleHRUeXBlcykge1xuICAgICAgICA7XG4gICAgICAgIG9ic2VydmVyQ29tcG9uZW50LmNvbnRleHRUeXBlcyA9IGJhc2VDb21wb25lbnQuY29udGV4dFR5cGVzO1xuICAgIH1cbiAgICBpZiAodXNlRm9yd2FyZFJlZikge1xuICAgICAgICAvLyBgZm9yd2FyZFJlZmAgbXVzdCBiZSBhcHBsaWVkIHByaW9yIGBtZW1vYFxuICAgICAgICAvLyBgZm9yd2FyZFJlZihvYnNlcnZlcihjbXApKWAgdGhyb3dzOlxuICAgICAgICAvLyBcImZvcndhcmRSZWYgcmVxdWlyZXMgYSByZW5kZXIgZnVuY3Rpb24gYnV0IHJlY2VpdmVkIGEgYG1lbW9gIGNvbXBvbmVudC4gSW5zdGVhZCBvZiBmb3J3YXJkUmVmKG1lbW8oLi4uKSksIHVzZSBtZW1vKGZvcndhcmRSZWYoLi4uKSlcIlxuICAgICAgICBvYnNlcnZlckNvbXBvbmVudCA9IGZvcndhcmRSZWYob2JzZXJ2ZXJDb21wb25lbnQpO1xuICAgIH1cbiAgICAvLyBtZW1vOyB3ZSBhcmUgbm90IGludGVyZXN0ZWQgaW4gZGVlcCB1cGRhdGVzXG4gICAgLy8gaW4gcHJvcHM7IHdlIGFzc3VtZSB0aGF0IGlmIGRlZXAgb2JqZWN0cyBhcmUgY2hhbmdlZCxcbiAgICAvLyB0aGlzIGlzIGluIG9ic2VydmFibGVzLCB3aGljaCB3b3VsZCBoYXZlIGJlZW4gdHJhY2tlZCBhbnl3YXlcbiAgICBvYnNlcnZlckNvbXBvbmVudCA9IG1lbW8ob2JzZXJ2ZXJDb21wb25lbnQpO1xuICAgIGNvcHlTdGF0aWNQcm9wZXJ0aWVzKGJhc2VDb21wb25lbnQsIG9ic2VydmVyQ29tcG9uZW50KTtcbiAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYnNlcnZlckNvbXBvbmVudCwgXCJjb250ZXh0VHlwZXNcIiwge1xuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieC1yZWFjdC1saXRlXSBgXCIuY29uY2F0KHRoaXMuZGlzcGxheU5hbWUgfHwgKChfYSA9IHRoaXMudHlwZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRpc3BsYXlOYW1lKSB8fCAoKF9iID0gdGhpcy50eXBlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubmFtZSkgfHwgXCJDb21wb25lbnRcIiwgXCIuY29udGV4dFR5cGVzYCBtdXN0IGJlIHNldCBiZWZvcmUgYXBwbHlpbmcgYG9ic2VydmVyYC5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG9ic2VydmVyQ29tcG9uZW50O1xufVxuLy8gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL21yaWRnd2F5L2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2Jsb2IvbWFzdGVyL3NyYy9pbmRleC5qc1xudmFyIGhvaXN0QmxhY2tMaXN0ID0ge1xuICAgICQkdHlwZW9mOiB0cnVlLFxuICAgIHJlbmRlcjogdHJ1ZSxcbiAgICBjb21wYXJlOiB0cnVlLFxuICAgIHR5cGU6IHRydWUsXG4gICAgLy8gRG9uJ3QgcmVkZWZpbmUgYGRpc3BsYXlOYW1lYCxcbiAgICAvLyBpdCdzIGRlZmluZWQgYXMgZ2V0dGVyLXNldHRlciBwYWlyIG9uIGBtZW1vYCAoc2VlICMzMTkyKS5cbiAgICBkaXNwbGF5TmFtZTogdHJ1ZVxufTtcbmZ1bmN0aW9uIGNvcHlTdGF0aWNQcm9wZXJ0aWVzKGJhc2UsIHRhcmdldCkge1xuICAgIE9iamVjdC5rZXlzKGJhc2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoIWhvaXN0QmxhY2tMaXN0W2tleV0pIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBrZXkpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2ZXIuanMubWFwIiwidmFyIF9hO1xuaW1wb3J0IFwiLi91dGlscy9hc3NlcnRFbnZpcm9ubWVudFwiO1xuaW1wb3J0IHsgdW5zdGFibGVfYmF0Y2hlZFVwZGF0ZXMgYXMgYmF0Y2ggfSBmcm9tIFwiLi91dGlscy9yZWFjdEJhdGNoZWRVcGRhdGVzXCI7XG5pbXBvcnQgeyBvYnNlcnZlckJhdGNoaW5nIH0gZnJvbSBcIi4vdXRpbHMvb2JzZXJ2ZXJCYXRjaGluZ1wiO1xuaW1wb3J0IHsgdXNlRGVwcmVjYXRlZCB9IGZyb20gXCIuL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyB1c2VPYnNlcnZlciBhcyB1c2VPYnNlcnZlck9yaWdpbmFsIH0gZnJvbSBcIi4vdXNlT2JzZXJ2ZXJcIjtcbmltcG9ydCB7IGVuYWJsZVN0YXRpY1JlbmRlcmluZyB9IGZyb20gXCIuL3N0YXRpY1JlbmRlcmluZ1wiO1xuaW1wb3J0IHsgb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeSB9IGZyb20gXCIuL3V0aWxzL29ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnlcIjtcbm9ic2VydmVyQmF0Y2hpbmcoYmF0Y2gpO1xuZXhwb3J0IHsgaXNVc2luZ1N0YXRpY1JlbmRlcmluZywgZW5hYmxlU3RhdGljUmVuZGVyaW5nIH0gZnJvbSBcIi4vc3RhdGljUmVuZGVyaW5nXCI7XG5leHBvcnQgeyBvYnNlcnZlciB9IGZyb20gXCIuL29ic2VydmVyXCI7XG5leHBvcnQgeyBPYnNlcnZlciB9IGZyb20gXCIuL09ic2VydmVyQ29tcG9uZW50XCI7XG5leHBvcnQgeyB1c2VMb2NhbE9ic2VydmFibGUgfSBmcm9tIFwiLi91c2VMb2NhbE9ic2VydmFibGVcIjtcbmV4cG9ydCB7IHVzZUxvY2FsU3RvcmUgfSBmcm9tIFwiLi91c2VMb2NhbFN0b3JlXCI7XG5leHBvcnQgeyB1c2VBc09ic2VydmFibGVTb3VyY2UgfSBmcm9tIFwiLi91c2VBc09ic2VydmFibGVTb3VyY2VcIjtcbmV4cG9ydCB7IG9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkgYXMgX29ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkgfTtcbmV4cG9ydCB2YXIgY2xlYXJUaW1lcnMgPSAoX2EgPSBvYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5W1wiZmluYWxpemVBbGxJbW1lZGlhdGVseVwiXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKGZ1bmN0aW9uICgpIHsgfSk7XG5leHBvcnQgZnVuY3Rpb24gdXNlT2JzZXJ2ZXIoZm4sIGJhc2VDb21wb25lbnROYW1lKSB7XG4gICAgaWYgKGJhc2VDb21wb25lbnROYW1lID09PSB2b2lkIDApIHsgYmFzZUNvbXBvbmVudE5hbWUgPSBcIm9ic2VydmVkXCI7IH1cbiAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgICAgIHVzZURlcHJlY2F0ZWQoXCJbbW9ieC1yZWFjdC1saXRlXSAndXNlT2JzZXJ2ZXIoZm4pJyBpcyBkZXByZWNhdGVkLiBVc2UgYDxPYnNlcnZlcj57Zm59PC9PYnNlcnZlcj5gIGluc3RlYWQsIG9yIHdyYXAgdGhlIGVudGlyZSBjb21wb25lbnQgaW4gYG9ic2VydmVyYC5cIik7XG4gICAgfVxuICAgIHJldHVybiB1c2VPYnNlcnZlck9yaWdpbmFsKGZuLCBiYXNlQ29tcG9uZW50TmFtZSk7XG59XG5leHBvcnQgeyBpc09ic2VydmVyQmF0Y2hlZCwgb2JzZXJ2ZXJCYXRjaGluZyB9IGZyb20gXCIuL3V0aWxzL29ic2VydmVyQmF0Y2hpbmdcIjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VTdGF0aWNSZW5kZXJpbmcoZW5hYmxlKSB7XG4gICAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbbW9ieC1yZWFjdC1saXRlXSAndXNlU3RhdGljUmVuZGVyaW5nJyBpcyBkZXByZWNhdGVkLCB1c2UgJ2VuYWJsZVN0YXRpY1JlbmRlcmluZycgaW5zdGVhZFwiKTtcbiAgICB9XG4gICAgZW5hYmxlU3RhdGljUmVuZGVyaW5nKGVuYWJsZSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCIvKiFcblx0Q29weXJpZ2h0IChjKSAyMDE4IEplZCBXYXRzb24uXG5cdExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG5cdGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cdHZhciBuYXRpdmVDb2RlU3RyaW5nID0gJ1tuYXRpdmUgY29kZV0nO1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGlmIChhcmcubGVuZ3RoKSB7XG5cdFx0XHRcdFx0dmFyIGlubmVyID0gY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdFx0XHRcdGlmIChpbm5lcikge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGlubmVyKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0aWYgKGFyZy50b1N0cmluZyAhPT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyAmJiAhYXJnLnRvU3RyaW5nLnRvU3RyaW5nKCkuaW5jbHVkZXMoJ1tuYXRpdmUgY29kZV0nKSkge1xuXHRcdFx0XHRcdGNsYXNzZXMucHVzaChhcmcudG9TdHJpbmcoKSk7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0Y2xhc3NOYW1lcy5kZWZhdWx0ID0gY2xhc3NOYW1lcztcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VQb3NpdGlvbk9ic2VydmVyKHRhcmdldCwgYWN0aXZlKSB7XG4gICAgY29uc3QgW3Bvc2l0aW9uLCBzZXRQb3NpdGlvbl0gPSB1c2VTdGF0ZSgpO1xuICAgIGNvbnN0IG9uQW5pbWF0aW9uRnJhbWVIYW5kbGVyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBzZXRQb3NpdGlvbihwcmV2ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5leHQgPSB0YXJnZXQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYgKHNob3VsZFVwZGF0ZVBvc2l0aW9uKHByZXYsIG5leHQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgfSk7XG4gICAgfSwgW3RhcmdldF0pO1xuICAgIHVzZUFuaW1hdGlvbkZyYW1lRWZmZWN0KGFjdGl2ZSA/IG9uQW5pbWF0aW9uRnJhbWVIYW5kbGVyIDogdW5kZWZpbmVkKTtcbiAgICByZXR1cm4gcG9zaXRpb247XG59XG5mdW5jdGlvbiB1c2VBbmltYXRpb25GcmFtZUVmZmVjdChjYWxsYmFjaykge1xuICAgIHVzZUVmZmVjdCgoKSA9PiAoY2FsbGJhY2sgPyBhbmltYXRpb25Mb29wKGNhbGxiYWNrKSA6IHVuZGVmaW5lZCksIFtjYWxsYmFja10pO1xufVxuZnVuY3Rpb24gc2hvdWxkVXBkYXRlUG9zaXRpb24oYSwgYikge1xuICAgIHJldHVybiAoIWEgfHxcbiAgICAgICAgIWIgfHxcbiAgICAgICAgYS5oZWlnaHQgIT09IGIuaGVpZ2h0IHx8XG4gICAgICAgIGEud2lkdGggIT09IGIud2lkdGggfHxcbiAgICAgICAgYS5ib3R0b20gIT09IGIuYm90dG9tIHx8XG4gICAgICAgIGEudG9wICE9PSBiLnRvcCB8fFxuICAgICAgICBhLmxlZnQgIT09IGIubGVmdCB8fFxuICAgICAgICBhLnJpZ2h0ICE9PSBiLnJpZ2h0KTtcbn1cbmZ1bmN0aW9uIGFuaW1hdGlvbkxvb3AoY2FsbGJhY2spIHtcbiAgICBsZXQgcmVxdWVzdElkO1xuICAgIGNvbnN0IHJlcXVlc3RGcmFtZSA9ICgpID0+IHtcbiAgICAgICAgcmVxdWVzdElkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgcmVxdWVzdEZyYW1lKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgY29uc3QgY2FuY2VsID0gKCkgPT4gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHJlcXVlc3RJZCk7XG4gICAgcmVxdWVzdEZyYW1lKCk7XG4gICAgcmV0dXJuIGNhbmNlbDtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZVBvc2l0aW9uT2JzZXJ2ZXIuanMubWFwIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCB7IHVzZVBvc2l0aW9uT2JzZXJ2ZXIgfSBmcm9tIFwiLi91c2VQb3NpdGlvbk9ic2VydmVyLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gRmlsdGVyU2VsZWN0b3IocHJvcHMpIHtcbiAgICBjb25zdCB7IHZhbHVlLCBvbkNoYW5nZSB9ID0gcHJvcHM7XG4gICAgY29uc3QgW3Nob3csIHNldFNob3ddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHVzZVJlZihudWxsKTtcbiAgICBjb25zdCBmaWx0ZXJTZWxlY3RvcnNSZWYgPSB1c2VSZWYobnVsbCk7XG4gICAgdXNlT25DbGlja091dHNpZGUoW2NvbXBvbmVudFJlZiwgZmlsdGVyU2VsZWN0b3JzUmVmXSwgKCkgPT4gc2V0U2hvdyhmYWxzZSkpO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdXNlUG9zaXRpb25PYnNlcnZlcihjb21wb25lbnRSZWYuY3VycmVudCwgc2hvdyk7XG4gICAgY29uc3Qgb25DbGljayA9IHVzZUNhbGxiYWNrKCh2YWx1ZSkgPT4ge1xuICAgICAgICBvbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIHNldFNob3coZmFsc2UpO1xuICAgIH0sIFtvbkNoYW5nZV0pO1xuICAgIGNvbnN0IGZpbHRlclNlbGVjdG9ycyA9IChjcmVhdGVFbGVtZW50KFwidWxcIiwgeyByZWY6IGZpbHRlclNlbGVjdG9yc1JlZiwgaWQ6IGAke3Byb3BzLmlkfS1maWx0ZXItc2VsZWN0b3JzYCwgY2xhc3NOYW1lOiBcImZpbHRlci1zZWxlY3RvcnNcIiwgcm9sZTogXCJtZW51XCIsIFwiZGF0YS1mb2N1c2luZGV4XCI6IDAsIHN0eWxlOiB7IHBvc2l0aW9uOiBcImZpeGVkXCIsIHRvcDogcG9zaXRpb24/LmJvdHRvbSwgbGVmdDogcG9zaXRpb24/LmxlZnQgfSB9LCBwcm9wcy5vcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKGNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lcyh7IFwiZmlsdGVyLXNlbGVjdGVkXCI6IHZhbHVlID09PSBvcHRpb24udmFsdWUgfSksIGtleTogaW5kZXgsIG9uQ2xpY2s6IGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIG9uQ2xpY2sob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgfSwgb25LZXlEb3duOiBlID0+IHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiIHx8IGUua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIG9uQ2xpY2sob3B0aW9uLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5ID09PSBcIlRhYlwiICYmIGluZGV4ICsgMSA9PT0gcHJvcHMub3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgb25DbGljayh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgoZS5rZXkgPT09IFwiVGFiXCIgJiYgZS5zaGlmdEtleSAmJiBpbmRleCA9PT0gMCkgfHwgZS5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50UmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIik/LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgc2V0U2hvdyhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHJvbGU6IFwibWVudWl0ZW1cIiwgdGFiSW5kZXg6IDAgfSxcbiAgICAgICAgY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lcyhcImZpbHRlci1pY29uXCIsIG9wdGlvbi52YWx1ZSksIFwiYXJpYS1oaWRkZW5cIjogdHJ1ZSB9KSxcbiAgICAgICAgY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmaWx0ZXItbGFiZWxcIiB9LCBvcHRpb24ubGFiZWwpKSkpKSk7XG4gICAgY29uc3QgY29udGFpbmVyQ2xpY2sgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHNldFNob3cocHJldiA9PiAhcHJldik7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZmlsdGVyU2VsZWN0b3JzUmVmLmN1cnJlbnQ/LnF1ZXJ5U2VsZWN0b3IoXCJsaS5maWx0ZXItc2VsZWN0ZWRcIik/LmZvY3VzKCk7XG4gICAgICAgIH0sIDEwKTtcbiAgICB9LCBbXSk7XG4gICAgcmV0dXJuIChjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZpbHRlci1zZWxlY3RvclwiIH0sXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmlsdGVyLXNlbGVjdG9yLWNvbnRlbnRcIiwgcmVmOiBjb21wb25lbnRSZWYgfSxcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBcImFyaWEtY29udHJvbHNcIjogYCR7cHJvcHMuaWR9LWZpbHRlci1zZWxlY3RvcnNgLCBcImFyaWEtZXhwYW5kZWRcIjogc2hvdywgXCJhcmlhLWhhc3BvcHVwXCI6IHRydWUsIFwiYXJpYS1sYWJlbFwiOiBwcm9wcy5hcmlhTGFiZWwsIGNsYXNzTmFtZTogY2xhc3NOYW1lcyhcImJ0biBidG4tZGVmYXVsdCBmaWx0ZXItc2VsZWN0b3ItYnV0dG9uIGJ1dHRvbi1pY29uXCIsIHZhbHVlKSwgb25DbGljazogY29udGFpbmVyQ2xpY2ssIG9uS2V5RG93bjogZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiIHx8IGUua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lckNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IH0sIFwiXFx1MDBBMFwiKSxcbiAgICAgICAgICAgIHNob3cgJiYgZmlsdGVyU2VsZWN0b3JzKSkpO1xufVxuZnVuY3Rpb24gdXNlT25DbGlja091dHNpZGUocmVmLCBoYW5kbGVyKSB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlZikpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVmLnNvbWUociA9PiAhci5jdXJyZW50IHx8IHIuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoIXJlZi5jdXJyZW50IHx8IHJlZi5jdXJyZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoYW5kbGVyKCk7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbGlzdGVuZXIpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGxpc3RlbmVyKTtcbiAgICAgICAgfTtcbiAgICB9LCBbcmVmLCBoYW5kbGVyXSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1GaWx0ZXJTZWxlY3Rvci5qcy5tYXAiLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5leHBvcnQgZnVuY3Rpb24gQmFkZ2UocHJvcHMpIHtcbiAgICByZXR1cm4gKGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiY29ybmVyLWJhZGdlXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICAgICAgY29sb3I6IFwidmFyKC0taGlnaGxpZ2h0U2VsZWN0aW9uQ29sb3IpXCIsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBcInZhcigtLWhpZ2hsaWdodFNlbGVjdGlvbkJhY2tncm91bmQpXCIsXG4gICAgICAgICAgICBmb250U2l6ZTogMTAsXG4gICAgICAgICAgICAvLyBmb250RmFtaWx5OiBcIm1vbm9zcGFjZVwiLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgcGFkZGluZzogXCIycHggOHB4XCIsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6IDMsXG4gICAgICAgICAgICAuLi5wcm9wcy5zdHlsZVxuICAgICAgICB9IH0sIHByb3BzLmNoaWxkcmVuKSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zaGFyZWQuanMubWFwIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgb2JzZXJ2ZXIgfSBmcm9tIFwibW9ieC1yZWFjdC1saXRlXCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0IHsgRmlsdGVyU2VsZWN0b3IgfSBmcm9tIFwiQG1lbmRpeC93aWRnZXQtcGx1Z2luLWZpbHRlci1zZWxlY3Rvci9GaWx0ZXJTZWxlY3RvclwiO1xuaW1wb3J0IHsgQmFkZ2UgfSBmcm9tIFwiLi4vc2hhcmVkXCI7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWFycm93LWNhbGxiYWNrXG5leHBvcnQgY29uc3QgSW5wdXRXaXRoRmlsdGVycyA9IG9ic2VydmVyKGZ1bmN0aW9uIElucHV0V2l0aEZpbHRlcnMocHJvcHMpIHtcbiAgICBjb25zdCB7IGlucHV0U3RvcmVzOiBbaW5wdXQxXSB9ID0gcHJvcHM7XG4gICAgcmV0dXJuIChjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWVzKFwiZmlsdGVyLWNvbnRhaW5lclwiLCBwcm9wcy5jbGFzc05hbWUpLCBcImRhdGEtZm9jdXNpbmRleFwiOiBwcm9wcy50YWJJbmRleCA/PyAwLCBzdHlsZTogcHJvcHMuc3R5bGVzIH0sXG4gICAgICAgIHByb3BzLmJhZGdlID8gY3JlYXRlRWxlbWVudChCYWRnZSwgeyBzdHlsZTogeyBsZWZ0OiA0MCB9IH0sIHByb3BzLmJhZGdlKSA6IG51bGwsXG4gICAgICAgIHByb3BzLmFkanVzdGFibGUgJiYgKGNyZWF0ZUVsZW1lbnQoRmlsdGVyU2VsZWN0b3IsIHsgYXJpYUxhYmVsOiBwcm9wcy5zY3JlZW5SZWFkZXJCdXR0b25DYXB0aW9uLCBpZDogcHJvcHMuaWQsIHZhbHVlOiBwcm9wcy5maWx0ZXJGbiwgb25DaGFuZ2U6IHByb3BzLm9uRmlsdGVyQ2hhbmdlLCBvcHRpb25zOiBwcm9wcy5maWx0ZXJGbkxpc3QgfSkpLFxuICAgICAgICBjcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgeyBcImFyaWEtbGFiZWxcIjogcHJvcHMuc2NyZWVuUmVhZGVySW5wdXRDYXB0aW9uLCBjbGFzc05hbWU6IGNsYXNzTmFtZXMoXCJmb3JtLWNvbnRyb2xcIiwgeyBcImZpbHRlci1pbnB1dFwiOiBwcm9wcy5hZGp1c3RhYmxlIH0pLCBkaXNhYmxlZDogcHJvcHMuZGlzYWJsZUlucHV0cywgb25DaGFuZ2U6IGlucHV0MS5vbkNoYW5nZSwgcGxhY2Vob2xkZXI6IHByb3BzLnBsYWNlaG9sZGVyLCByZWY6IHByb3BzLmlucHV0UmVmLCB0eXBlOiBwcm9wcy50eXBlLCB2YWx1ZTogaW5wdXQxLnZhbHVlIH0pKSk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlucHV0V2l0aEZpbHRlcnMuanMubWFwIiwiaW1wb3J0IHsgcmVhY3Rpb24gfSBmcm9tIFwibW9ieFwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VCYXNpY1N5bmMocHJvcHMsIHN0b3JlKSB7XG4gICAgY29uc3QgcGJveCA9IHVzZVJlZihwcm9wcyk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgcGJveC5jdXJyZW50ID0gcHJvcHM7XG4gICAgfSk7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlYWN0aW9uKCgpID0+IFtzdG9yZS5hcmcxLnZhbHVlLCBzdG9yZS5hcmcyLnZhbHVlXSwgY3JlYXRlUHVzaGVyKHBib3gpKTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL2V4aGF1c3RpdmUtZGVwc1xuICAgIH0sIFtdKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVB1c2hlcihwYm94KSB7XG4gICAgcmV0dXJuIChbdmFsdWUxLCBfdmFsdWUyXSkgPT4ge1xuICAgICAgICBjb25zdCBwcm9wcyA9IHBib3guY3VycmVudDtcbiAgICAgICAgcHJvcHMudmFsdWVBdHRyaWJ1dGU/LnNldFZhbHVlKHZhbHVlMSA/PyB1bmRlZmluZWQpO1xuICAgICAgICBpZiAocHJvcHMub25DaGFuZ2U/LmNhbkV4ZWN1dGUpIHtcbiAgICAgICAgICAgIHByb3BzLm9uQ2hhbmdlPy5leGVjdXRlKCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlQmFzaWNTeW5jLmpzLm1hcCIsImV4cG9ydCBjb25zdCBkZWJvdW5jZSA9IChmdW5jLCB3YWl0Rm9yKSA9PiB7XG4gICAgbGV0IHRpbWVvdXQgPSBudWxsO1xuICAgIGNvbnN0IGFib3J0ID0gKCkgPT4ge1xuICAgICAgICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGRlYm91bmNlZCA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgIGFib3J0KCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGZ1bmMoLi4uYXJncyksIHdhaXRGb3IpO1xuICAgIH07XG4gICAgcmV0dXJuIFtkZWJvdW5jZWQsIGFib3J0XTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWJvdW5jZS5qcy5tYXAiLCJpbXBvcnQgeyBtYWtlT2JzZXJ2YWJsZSwgb2JzZXJ2YWJsZSwgYWN0aW9uIH0gZnJvbSBcIm1vYnhcIjtcbmV4cG9ydCBjbGFzcyBJbnB1dFN0b3JlIHtcbiAgICB2YWx1ZTtcbiAgICBjb25zdHJ1Y3Rvcihpbml0ID0gXCJcIikge1xuICAgICAgICB0aGlzLnZhbHVlID0gaW5pdDtcbiAgICAgICAgbWFrZU9ic2VydmFibGUodGhpcywge1xuICAgICAgICAgICAgdmFsdWU6IG9ic2VydmFibGUsXG4gICAgICAgICAgICBzZXRWYWx1ZTogYWN0aW9uLFxuICAgICAgICAgICAgb25DaGFuZ2U6IGFjdGlvblxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBvbkNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgICAgICB0aGlzLnNldFZhbHVlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUlucHV0U3RvcmUuanMubWFwIiwiaW1wb3J0IHsgY3JlYXRlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gXCJAbWVuZGl4L3dpZGdldC1wbHVnaW4tcGxhdGZvcm0vdXRpbHMvZGVib3VuY2VcIjtcbmltcG9ydCB7IGFjdGlvbiwgYXV0b3J1biwgY29tcHV0ZWQsIG1ha2VPYnNlcnZhYmxlLCByZWFjdGlvbiwgcnVuSW5BY3Rpb24gfSBmcm9tIFwibW9ieFwiO1xuaW1wb3J0IHsgSW5wdXRTdG9yZSB9IGZyb20gXCIuLi9zdG9yZXMvSW5wdXRTdG9yZVwiO1xuZXhwb3J0IGNsYXNzIEVkaXRhYmxlRmlsdGVyQ29udHJvbGxlciB7XG4gICAgZmlsdGVyO1xuICAgIGNoYW5nZURlbGF5O1xuICAgIGRpc2FibGVkRm47XG4gICAgaW5wdXQxO1xuICAgIGlucHV0MjtcbiAgICBpbnB1dFJlZiA9IGNyZWF0ZVJlZigpO1xuICAgIGRlZmF1bHRzO1xuICAgIGlucHV0cztcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgeyBmaWx0ZXIsIGNoYW5nZURlbGF5ID0gNTAwIH0gPSBwYXJhbXM7XG4gICAgICAgIHRoaXMuY2hhbmdlRGVsYXkgPSBjaGFuZ2VEZWxheTtcbiAgICAgICAgdGhpcy5pbnB1dDEgPSBuZXcgSW5wdXRTdG9yZShmaWx0ZXIuYXJnMS5kaXNwbGF5VmFsdWUpO1xuICAgICAgICB0aGlzLmlucHV0MiA9IG5ldyBJbnB1dFN0b3JlKGZpbHRlci5hcmcyLmRpc3BsYXlWYWx1ZSk7XG4gICAgICAgIHRoaXMuaW5wdXRzID0gW3RoaXMuaW5wdXQxLCB0aGlzLmlucHV0Ml07XG4gICAgICAgIHRoaXMuZmlsdGVyID0gZmlsdGVyO1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0gW3BhcmFtcy5kZWZhdWx0RmlsdGVyLCBwYXJhbXMuZGVmYXVsdFZhbHVlXTtcbiAgICAgICAgdGhpcy5kaXNhYmxlZEZuID0gcGFyYW1zLmRpc2FibGVJbnB1dHM7XG4gICAgICAgIG1ha2VPYnNlcnZhYmxlKHRoaXMsIHtcbiAgICAgICAgICAgIHNlbGVjdGVkRm46IGNvbXB1dGVkLFxuICAgICAgICAgICAgZGlzYWJsZUlucHV0czogY29tcHV0ZWQsXG4gICAgICAgICAgICBoYW5kbGVGaWx0ZXJGbkNoYW5nZTogYWN0aW9uXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXQgc2VsZWN0ZWRGbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyLmZpbHRlckZ1bmN0aW9uO1xuICAgIH1cbiAgICBnZXQgZGlzYWJsZUlucHV0cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRGbiA/IHRoaXMuZGlzYWJsZWRGbih0aGlzLmZpbHRlci5maWx0ZXJGdW5jdGlvbikgOiBmYWxzZTtcbiAgICB9XG4gICAgaGFuZGxlRmlsdGVyRm5DaGFuZ2UgPSAoZm4pID0+IHtcbiAgICAgICAgdGhpcy5maWx0ZXIuZmlsdGVyRnVuY3Rpb24gPSBmbjtcbiAgICAgICAgdGhpcy5pbnB1dFJlZi5jdXJyZW50Py5mb2N1cygpO1xuICAgIH07XG4gICAgc2V0dXAoKSB7XG4gICAgICAgIGNvbnN0IGRpc3Bvc2VycyA9IFtdO1xuICAgICAgICAvLyBvbklucHV0c0NoYW5nZSAtIGRlYm91bmNlZCByZWFjdGlvbiAoZWZmZWN0KSBmb3IgYm90aCBpbnB1dHMuXG4gICAgICAgIC8vIFRyaWdnZXJlZCB3aGVuZXZlciBvbmUgb2YgdGhlIGlucHV0cyBpcyBjaGFuZ2VkLlxuICAgICAgICAvLyBUaGlzIHJlYWN0aW9uIHdyaXRlcyB2YWx1ZSB0byBmaWx0ZXIuXG4gICAgICAgIGNvbnN0IFtvbklucHV0c0NoYW5nZSwgY2xlYXJEZWJvdW5jZV0gPSBkZWJvdW5jZSgoW3YxLCB2Ml0pID0+IHtcbiAgICAgICAgICAgIHJ1bkluQWN0aW9uKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlci5hcmcxLmRpc3BsYXlWYWx1ZSA9IHYxO1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyLmFyZzIuZGlzcGxheVZhbHVlID0gdjI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdGhpcy5jaGFuZ2VEZWxheSk7XG4gICAgICAgIGRpc3Bvc2Vycy5wdXNoKGNsZWFyRGVib3VuY2UpO1xuICAgICAgICBkaXNwb3NlcnMucHVzaChyZWFjdGlvbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gW3RoaXMuaW5wdXQxLnZhbHVlLCB0aGlzLmlucHV0Mi52YWx1ZV07XG4gICAgICAgIH0sIG9uSW5wdXRzQ2hhbmdlKSk7XG4gICAgICAgIC8vIEF1dG9ydW4gdG8gc3luYyBmaWx0ZXIgYXJncyB3aXRoIGlucHV0cy5cbiAgICAgICAgLy8gUnVucyB3aGVuZXZlciBvbmUgb2YgdGhlIGFyZ3VtZW50IHZhbHVlIGlzIGNoYW5nZWQuXG4gICAgICAgIGRpc3Bvc2Vycy5wdXNoKGF1dG9ydW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pbnB1dDEuc2V0VmFsdWUodGhpcy5maWx0ZXIuYXJnMS5kaXNwbGF5VmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5pbnB1dDIuc2V0VmFsdWUodGhpcy5maWx0ZXIuYXJnMi5kaXNwbGF5VmFsdWUpO1xuICAgICAgICB9KSk7XG4gICAgICAgIC8vIFNldCBkZWZhdWx0IHN0YXRlIGZvciB0aGUgZmlsdGVyLCBpZiBwcmVzZW50LlxuICAgICAgICB0aGlzLmZpbHRlci5VTlNBRkVfc2V0RGVmYXVsdHModGhpcy5kZWZhdWx0cyk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBkaXNwb3NlcnMuZm9yRWFjaChkaXNwb3NlID0+IGRpc3Bvc2UoKSk7XG4gICAgICAgIH07XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RWRpdGFibGVGaWx0ZXJDb250cm9sbGVyLmpzLm1hcCIsImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEVkaXRhYmxlRmlsdGVyQ29udHJvbGxlciB9IGZyb20gXCIuLi9jb250cm9sbGVycy9FZGl0YWJsZUZpbHRlckNvbnRyb2xsZXJcIjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VFZGl0YWJsZUZpbHRlckNvbnRyb2xsZXIocGFyYW1zKSB7XG4gICAgY29uc3QgW2N0cmxdID0gdXNlU3RhdGUoKCkgPT4gbmV3IEVkaXRhYmxlRmlsdGVyQ29udHJvbGxlcihwYXJhbXMpKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4gY3RybC5zZXR1cCgpLCBbY3RybF0pO1xuICAgIHJldHVybiBjdHJsO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlRWRpdGFibGVGaWx0ZXJDb250cm9sbGVyLmpzLm1hcCIsImV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQoKSB7XG4gICAgY29uc3QgVVVJRExvY2F0aW9uID0gXCJjb20ubWVuZGl4LndpZGdldHMud2ViLlVVSURcIjtcbiAgICBpZiAoIXdpbmRvd1tVVUlETG9jYXRpb25dKSB7XG4gICAgICAgIHdpbmRvd1tVVUlETG9jYXRpb25dID0gMTtcbiAgICB9XG4gICAgcmV0dXJuIHdpbmRvd1tVVUlETG9jYXRpb25dKys7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1nZW5lcmF0ZS11dWlkLmpzLm1hcCIsImltcG9ydCB7IG1ha2VPYnNlcnZhYmxlIH0gZnJvbSBcIm1vYnhcIjtcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pZiAoIXVzZVN0YXRlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibW9ieC1yZWFjdC1saXRlIHJlcXVpcmVzIFJlYWN0IHdpdGggSG9va3Mgc3VwcG9ydFwiKTtcbn1cbmlmICghbWFrZU9ic2VydmFibGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJtb2J4LXJlYWN0LWxpdGVAMyByZXF1aXJlcyBtb2J4IGF0IGxlYXN0IHZlcnNpb24gNiB0byBiZSBhdmFpbGFibGVcIik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hc3NlcnRFbnZpcm9ubWVudC5qcy5tYXAiLCJpbXBvcnQgeyBjb25maWd1cmUgfSBmcm9tIFwibW9ieFwiO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHROb29wQmF0Y2goY2FsbGJhY2spIHtcbiAgICBjYWxsYmFjaygpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVyQmF0Y2hpbmcocmVhY3Rpb25TY2hlZHVsZXIpIHtcbiAgICBpZiAoIXJlYWN0aW9uU2NoZWR1bGVyKSB7XG4gICAgICAgIHJlYWN0aW9uU2NoZWR1bGVyID0gZGVmYXVsdE5vb3BCYXRjaDtcbiAgICAgICAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW01vYlhdIEZhaWxlZCB0byBnZXQgdW5zdGFibGVfYmF0Y2hlZCB1cGRhdGVzIGZyb20gcmVhY3QtZG9tIC8gcmVhY3QtbmF0aXZlXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbmZpZ3VyZSh7IHJlYWN0aW9uU2NoZWR1bGVyOiByZWFjdGlvblNjaGVkdWxlciB9KTtcbn1cbmV4cG9ydCB2YXIgaXNPYnNlcnZlckJhdGNoZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbTW9iWF0gRGVwcmVjYXRlZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2ZXJCYXRjaGluZy5qcy5tYXAiLCJpbXBvcnQgeyBnZXREZXBlbmRlbmN5VHJlZSB9IGZyb20gXCJtb2J4XCI7XG5leHBvcnQgZnVuY3Rpb24gcHJpbnREZWJ1Z1ZhbHVlKHYpIHtcbiAgICByZXR1cm4gZ2V0RGVwZW5kZW5jeVRyZWUodik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wcmludERlYnVnVmFsdWUuanMubWFwIiwiZXhwb3J0IHZhciBSRUdJU1RSWV9GSU5BTElaRV9BRlRFUiA9IDEwMDAwO1xuZXhwb3J0IHZhciBSRUdJU1RSWV9TV0VFUF9JTlRFUlZBTCA9IDEwMDAwO1xudmFyIFRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnkoZmluYWxpemUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZmluYWxpemVcIiwge1xuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgdmFsdWU6IGZpbmFsaXplXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJyZWdpc3RyYXRpb25zXCIsIHtcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBuZXcgTWFwKClcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInN3ZWVwVGltZW91dFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogdm9pZCAwXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBCb3VuZCBzbyBpdCBjYW4gYmUgdXNlZCBkaXJlY3RseSBhcyBzZXRUaW1lb3V0IGNhbGxiYWNrLlxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJzd2VlcFwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKG1heEFnZSkge1xuICAgICAgICAgICAgICAgIGlmIChtYXhBZ2UgPT09IHZvaWQgMCkgeyBtYXhBZ2UgPSBSRUdJU1RSWV9GSU5BTElaRV9BRlRFUjsgfVxuICAgICAgICAgICAgICAgIC8vIGNhbmNlbCB0aW1lb3V0IHNvIHdlIGNhbiBmb3JjZSBzd2VlcCBhbnl0aW1lXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF90aGlzLnN3ZWVwVGltZW91dCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuc3dlZXBUaW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIF90aGlzLnJlZ2lzdHJhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAocmVnaXN0cmF0aW9uLCB0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm93IC0gcmVnaXN0cmF0aW9uLnJlZ2lzdGVyZWRBdCA+PSBtYXhBZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmZpbmFsaXplKHJlZ2lzdHJhdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5yZWdpc3RyYXRpb25zLmRlbGV0ZSh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMucmVnaXN0cmF0aW9ucy5zaXplID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zY2hlZHVsZVN3ZWVwKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gQm91bmQgc28gaXQgY2FuIGJlIGV4cG9ydGVkIGRpcmVjdGx5IGFzIGNsZWFyVGltZXJzIHRlc3QgdXRpbGl0eS5cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiZmluYWxpemVBbGxJbW1lZGlhdGVseVwiLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnN3ZWVwKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gVG9rZW4gaXMgYWN0dWFsbHkgcmVxdWlyZWQgd2l0aCB0aGlzIGltcGxcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5LnByb3RvdHlwZSwgXCJyZWdpc3RlclwiLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHRhcmdldCwgdmFsdWUsIHRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdHJhdGlvbnMuc2V0KHRva2VuLCB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyZWRBdDogRGF0ZS5ub3coKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlU3dlZXAoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShUaW1lckJhc2VkRmluYWxpemF0aW9uUmVnaXN0cnkucHJvdG90eXBlLCBcInVucmVnaXN0ZXJcIiwge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RyYXRpb25zLmRlbGV0ZSh0b2tlbik7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5LnByb3RvdHlwZSwgXCJzY2hlZHVsZVN3ZWVwXCIsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zd2VlcFRpbWVvdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3dlZXBUaW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLnN3ZWVwLCBSRUdJU1RSWV9TV0VFUF9JTlRFUlZBTCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5O1xufSgpKTtcbmV4cG9ydCB7IFRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeSB9O1xuZXhwb3J0IHZhciBVbml2ZXJzYWxGaW5hbGl6YXRpb25SZWdpc3RyeSA9IHR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeSAhPT0gXCJ1bmRlZmluZWRcIlxuICAgID8gRmluYWxpemF0aW9uUmVnaXN0cnlcbiAgICA6IFRpbWVyQmFzZWRGaW5hbGl6YXRpb25SZWdpc3RyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuaXZlcnNhbEZpbmFsaXphdGlvblJlZ2lzdHJ5LmpzLm1hcCIsImltcG9ydCB7IFVuaXZlcnNhbEZpbmFsaXphdGlvblJlZ2lzdHJ5IH0gZnJvbSBcIi4vVW5pdmVyc2FsRmluYWxpemF0aW9uUmVnaXN0cnlcIjtcbmV4cG9ydCB2YXIgb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeSA9IG5ldyBVbml2ZXJzYWxGaW5hbGl6YXRpb25SZWdpc3RyeShmdW5jdGlvbiAoYWRtKSB7XG4gICAgdmFyIF9hO1xuICAgIChfYSA9IGFkbS5yZWFjdGlvbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRpc3Bvc2UoKTtcbiAgICBhZG0ucmVhY3Rpb24gPSBudWxsO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5LmpzLm1hcCIsImltcG9ydCB7IFJlYWN0aW9uIH0gZnJvbSBcIm1vYnhcIjtcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHByaW50RGVidWdWYWx1ZSB9IGZyb20gXCIuL3V0aWxzL3ByaW50RGVidWdWYWx1ZVwiO1xuaW1wb3J0IHsgaXNVc2luZ1N0YXRpY1JlbmRlcmluZyB9IGZyb20gXCIuL3N0YXRpY1JlbmRlcmluZ1wiO1xuaW1wb3J0IHsgb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeSB9IGZyb20gXCIuL3V0aWxzL29ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnlcIjtcbmZ1bmN0aW9uIGNyZWF0ZVJlYWN0aW9uKGFkbSkge1xuICAgIGFkbS5yZWFjdGlvbiA9IG5ldyBSZWFjdGlvbihcIm9ic2VydmVyXCIuY29uY2F0KGFkbS5uYW1lKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGFkbS5zdGF0ZVZlcnNpb24gPSBTeW1ib2woKTtcbiAgICAgICAgLy8gb25TdG9yZUNoYW5nZSB3b24ndCBiZSBhdmFpbGFibGUgdW50aWwgdGhlIGNvbXBvbmVudCBcIm1vdW50c1wiLlxuICAgICAgICAvLyBJZiBzdGF0ZSBjaGFuZ2VzIGluIGJldHdlZW4gaW5pdGlhbCByZW5kZXIgYW5kIG1vdW50LFxuICAgICAgICAvLyBgdXNlU3luY0V4dGVybmFsU3RvcmVgIHNob3VsZCBoYW5kbGUgdGhhdCBieSBjaGVja2luZyB0aGUgc3RhdGUgdmVyc2lvbiBhbmQgaXNzdWluZyB1cGRhdGUuXG4gICAgICAgIChfYSA9IGFkbS5vblN0b3JlQ2hhbmdlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChhZG0pO1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVzZU9ic2VydmVyKHJlbmRlciwgYmFzZUNvbXBvbmVudE5hbWUpIHtcbiAgICBpZiAoYmFzZUNvbXBvbmVudE5hbWUgPT09IHZvaWQgMCkgeyBiYXNlQ29tcG9uZW50TmFtZSA9IFwib2JzZXJ2ZWRcIjsgfVxuICAgIGlmIChpc1VzaW5nU3RhdGljUmVuZGVyaW5nKCkpIHtcbiAgICAgICAgcmV0dXJuIHJlbmRlcigpO1xuICAgIH1cbiAgICB2YXIgYWRtUmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xuICAgIGlmICghYWRtUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgLy8gRmlyc3QgcmVuZGVyXG4gICAgICAgIHZhciBhZG1fMSA9IHtcbiAgICAgICAgICAgIHJlYWN0aW9uOiBudWxsLFxuICAgICAgICAgICAgb25TdG9yZUNoYW5nZTogbnVsbCxcbiAgICAgICAgICAgIHN0YXRlVmVyc2lvbjogU3ltYm9sKCksXG4gICAgICAgICAgICBuYW1lOiBiYXNlQ29tcG9uZW50TmFtZSxcbiAgICAgICAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gKG9uU3RvcmVDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICAvLyBEbyBOT1QgYWNjZXNzIGFkbVJlZiBoZXJlIVxuICAgICAgICAgICAgICAgIG9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkudW5yZWdpc3RlcihhZG1fMSk7XG4gICAgICAgICAgICAgICAgYWRtXzEub25TdG9yZUNoYW5nZSA9IG9uU3RvcmVDaGFuZ2U7XG4gICAgICAgICAgICAgICAgaWYgKCFhZG1fMS5yZWFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBXZSd2ZSBsb3N0IG91ciByZWFjdGlvbiBhbmQgdGhlcmVmb3JlIGFsbCBzdWJzY3JpcHRpb25zLCBvY2N1cnMgd2hlbjpcbiAgICAgICAgICAgICAgICAgICAgLy8gMS4gVGltZXIgYmFzZWQgZmluYWxpemF0aW9uIHJlZ2lzdHJ5IGRpc3Bvc2VkIHJlYWN0aW9uIGJlZm9yZSBjb21wb25lbnQgbW91bnRlZC5cbiAgICAgICAgICAgICAgICAgICAgLy8gMi4gUmVhY3QgXCJyZS1tb3VudHNcIiBzYW1lIGNvbXBvbmVudCB3aXRob3V0IGNhbGxpbmcgcmVuZGVyIGluIGJldHdlZW4gKHR5cGljYWxseSA8U3RyaWN0TW9kZT4pLlxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHJlY3JlYXRlIHJlYWN0aW9uIGFuZCBzY2hlZHVsZSByZS1yZW5kZXIgdG8gcmVjcmVhdGUgc3Vic2NyaXB0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlbiBpZiBzdGF0ZSBkaWQgbm90IGNoYW5nZS5cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlUmVhY3Rpb24oYWRtXzEpO1xuICAgICAgICAgICAgICAgICAgICAvLyBgb25TdG9yZUNoYW5nZWAgd29uJ3QgZm9yY2UgdXBkYXRlIGlmIHN1YnNlcXVlbnQgYGdldFNuYXBzaG90YCByZXR1cm5zIHNhbWUgdmFsdWUuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNvIHdlIG1ha2Ugc3VyZSB0aGF0IGlzIG5vdCB0aGUgY2FzZVxuICAgICAgICAgICAgICAgICAgICBhZG1fMS5zdGF0ZVZlcnNpb24gPSBTeW1ib2woKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgICAgICAvLyBEbyBOT1QgYWNjZXNzIGFkbVJlZiBoZXJlIVxuICAgICAgICAgICAgICAgICAgICBhZG1fMS5vblN0b3JlQ2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gYWRtXzEucmVhY3Rpb24pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGFkbV8xLnJlYWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFNuYXBzaG90OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gRG8gTk9UIGFjY2VzcyBhZG1SZWYgaGVyZSFcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRtXzEuc3RhdGVWZXJzaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBhZG1SZWYuY3VycmVudCA9IGFkbV8xO1xuICAgIH1cbiAgICB2YXIgYWRtID0gYWRtUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFhZG0ucmVhY3Rpb24pIHtcbiAgICAgICAgLy8gRmlyc3QgcmVuZGVyIG9yIHJlYWN0aW9uIHdhcyBkaXNwb3NlZCBieSByZWdpc3RyeSBiZWZvcmUgc3Vic2NyaWJlXG4gICAgICAgIGNyZWF0ZVJlYWN0aW9uKGFkbSk7XG4gICAgICAgIC8vIFN0cmljdE1vZGUvQ29uY3VycmVudE1vZGUvU3VzcGVuc2UgbWF5IG1lYW4gdGhhdCBvdXIgY29tcG9uZW50IGlzXG4gICAgICAgIC8vIHJlbmRlcmVkIGFuZCBhYmFuZG9uZWQgbXVsdGlwbGUgdGltZXMsIHNvIHdlIG5lZWQgdG8gdHJhY2sgbGVha2VkXG4gICAgICAgIC8vIFJlYWN0aW9ucy5cbiAgICAgICAgb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeS5yZWdpc3RlcihhZG1SZWYsIGFkbSwgYWRtKTtcbiAgICB9XG4gICAgUmVhY3QudXNlRGVidWdWYWx1ZShhZG0ucmVhY3Rpb24sIHByaW50RGVidWdWYWx1ZSk7XG4gICAgUmVhY3QudXNlU3luY0V4dGVybmFsU3RvcmUoXG4gICAgLy8gQm90aCBvZiB0aGVzZSBtdXN0IGJlIHN0YWJsZSwgb3RoZXJ3aXNlIGl0IHdvdWxkIGtlZXAgcmVzdWJzY3JpYmluZyBldmVyeSByZW5kZXIuXG4gICAgYWRtLnN1YnNjcmliZSwgYWRtLmdldFNuYXBzaG90LCBhZG0uZ2V0U25hcHNob3QpO1xuICAgIC8vIHJlbmRlciB0aGUgb3JpZ2luYWwgY29tcG9uZW50LCBidXQgaGF2ZSB0aGVcbiAgICAvLyByZWFjdGlvbiB0cmFjayB0aGUgb2JzZXJ2YWJsZXMsIHNvIHRoYXQgcmVuZGVyaW5nXG4gICAgLy8gY2FuIGJlIGludmFsaWRhdGVkIChzZWUgYWJvdmUpIG9uY2UgYSBkZXBlbmRlbmN5IGNoYW5nZXNcbiAgICB2YXIgcmVuZGVyUmVzdWx0O1xuICAgIHZhciBleGNlcHRpb247XG4gICAgYWRtLnJlYWN0aW9uLnRyYWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlbmRlclJlc3VsdCA9IHJlbmRlcigpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBleGNlcHRpb24gPSBlO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgaWYgKGV4Y2VwdGlvbikge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247IC8vIHJlLXRocm93IGFueSBleGNlcHRpb25zIGNhdWdodCBkdXJpbmcgcmVuZGVyaW5nXG4gICAgfVxuICAgIHJldHVybiByZW5kZXJSZXN1bHQ7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2VPYnNlcnZlci5qcy5tYXAiLCJ2YXIgX2EsIF9iO1xuaW1wb3J0IHsgZm9yd2FyZFJlZiwgbWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaXNVc2luZ1N0YXRpY1JlbmRlcmluZyB9IGZyb20gXCIuL3N0YXRpY1JlbmRlcmluZ1wiO1xuaW1wb3J0IHsgdXNlT2JzZXJ2ZXIgfSBmcm9tIFwiLi91c2VPYnNlcnZlclwiO1xudmFyIHdhcm5PYnNlcnZlck9wdGlvbnNEZXByZWNhdGVkID0gdHJ1ZTtcbnZhciBoYXNTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLmZvcjtcbnZhciBpc0Z1bmN0aW9uTmFtZUNvbmZpZ3VyYWJsZSA9IChfYiA9IChfYSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZnVuY3Rpb24gKCkgeyB9LCBcIm5hbWVcIikpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jb25maWd1cmFibGUpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGZhbHNlO1xuLy8gVXNpbmcgcmVhY3QtaXMgaGFkIHNvbWUgaXNzdWVzIChhbmQgb3BlcmF0ZXMgb24gZWxlbWVudHMsIG5vdCBvbiB0eXBlcyksIHNlZSAjNjA4IC8gIzYwOVxudmFyIFJlYWN0Rm9yd2FyZFJlZlN5bWJvbCA9IGhhc1N5bWJvbFxuICAgID8gU3ltYm9sLmZvcihcInJlYWN0LmZvcndhcmRfcmVmXCIpXG4gICAgOiB0eXBlb2YgZm9yd2FyZFJlZiA9PT0gXCJmdW5jdGlvblwiICYmIGZvcndhcmRSZWYoZnVuY3Rpb24gKHByb3BzKSB7IHJldHVybiBudWxsOyB9KVtcIiQkdHlwZW9mXCJdO1xudmFyIFJlYWN0TWVtb1N5bWJvbCA9IGhhc1N5bWJvbFxuICAgID8gU3ltYm9sLmZvcihcInJlYWN0Lm1lbW9cIilcbiAgICA6IHR5cGVvZiBtZW1vID09PSBcImZ1bmN0aW9uXCIgJiYgbWVtbyhmdW5jdGlvbiAocHJvcHMpIHsgcmV0dXJuIG51bGw7IH0pW1wiJCR0eXBlb2ZcIl07XG4vLyBuLmIuIGJhc2UgY2FzZSBpcyBub3QgdXNlZCBmb3IgYWN0dWFsIHR5cGluZ3Mgb3IgZXhwb3J0ZWQgaW4gdGhlIHR5cGluZyBmaWxlc1xuZXhwb3J0IGZ1bmN0aW9uIG9ic2VydmVyKGJhc2VDb21wb25lbnQsIFxuLy8gVE9ETyByZW1vdmUgaW4gbmV4dCBtYWpvclxub3B0aW9ucykge1xuICAgIHZhciBfYTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIHdhcm5PYnNlcnZlck9wdGlvbnNEZXByZWNhdGVkICYmIG9wdGlvbnMpIHtcbiAgICAgICAgd2Fybk9ic2VydmVyT3B0aW9uc0RlcHJlY2F0ZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW21vYngtcmVhY3QtbGl0ZV0gYG9ic2VydmVyKGZuLCB7IGZvcndhcmRSZWY6IHRydWUgfSlgIGlzIGRlcHJlY2F0ZWQsIHVzZSBgb2JzZXJ2ZXIoUmVhY3QuZm9yd2FyZFJlZihmbikpYFwiKTtcbiAgICB9XG4gICAgaWYgKFJlYWN0TWVtb1N5bWJvbCAmJiBiYXNlQ29tcG9uZW50W1wiJCR0eXBlb2ZcIl0gPT09IFJlYWN0TWVtb1N5bWJvbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieC1yZWFjdC1saXRlXSBZb3UgYXJlIHRyeWluZyB0byB1c2UgYG9ic2VydmVyYCBvbiBhIGZ1bmN0aW9uIGNvbXBvbmVudCB3cmFwcGVkIGluIGVpdGhlciBhbm90aGVyIGBvYnNlcnZlcmAgb3IgYFJlYWN0Lm1lbW9gLiBUaGUgb2JzZXJ2ZXIgYWxyZWFkeSBhcHBsaWVzICdSZWFjdC5tZW1vJyBmb3IgeW91LlwiKTtcbiAgICB9XG4gICAgLy8gVGhlIHdvcmtpbmcgb2Ygb2JzZXJ2ZXIgaXMgZXhwbGFpbmVkIHN0ZXAgYnkgc3RlcCBpbiB0aGlzIHRhbGs6IGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9Y1BGNGlCZWRvRjAmZmVhdHVyZT15b3V0dS5iZSZ0PTEzMDdcbiAgICBpZiAoaXNVc2luZ1N0YXRpY1JlbmRlcmluZygpKSB7XG4gICAgICAgIHJldHVybiBiYXNlQ29tcG9uZW50O1xuICAgIH1cbiAgICB2YXIgdXNlRm9yd2FyZFJlZiA9IChfYSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5mb3J3YXJkUmVmKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBmYWxzZTtcbiAgICB2YXIgcmVuZGVyID0gYmFzZUNvbXBvbmVudDtcbiAgICB2YXIgYmFzZUNvbXBvbmVudE5hbWUgPSBiYXNlQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IGJhc2VDb21wb25lbnQubmFtZTtcbiAgICAvLyBJZiBhbHJlYWR5IHdyYXBwZWQgd2l0aCBmb3J3YXJkUmVmLCB1bndyYXAsXG4gICAgLy8gc28gd2UgY2FuIHBhdGNoIHJlbmRlciBhbmQgYXBwbHkgbWVtb1xuICAgIGlmIChSZWFjdEZvcndhcmRSZWZTeW1ib2wgJiYgYmFzZUNvbXBvbmVudFtcIiQkdHlwZW9mXCJdID09PSBSZWFjdEZvcndhcmRSZWZTeW1ib2wpIHtcbiAgICAgICAgdXNlRm9yd2FyZFJlZiA9IHRydWU7XG4gICAgICAgIHJlbmRlciA9IGJhc2VDb21wb25lbnRbXCJyZW5kZXJcIl07XG4gICAgICAgIGlmICh0eXBlb2YgcmVuZGVyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4LXJlYWN0LWxpdGVdIGByZW5kZXJgIHByb3BlcnR5IG9mIEZvcndhcmRSZWYgd2FzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBvYnNlcnZlckNvbXBvbmVudCA9IGZ1bmN0aW9uIChwcm9wcywgcmVmKSB7XG4gICAgICAgIHJldHVybiB1c2VPYnNlcnZlcihmdW5jdGlvbiAoKSB7IHJldHVybiByZW5kZXIocHJvcHMsIHJlZik7IH0sIGJhc2VDb21wb25lbnROYW1lKTtcbiAgICB9O1xuICAgIG9ic2VydmVyQ29tcG9uZW50LmRpc3BsYXlOYW1lID0gYmFzZUNvbXBvbmVudC5kaXNwbGF5TmFtZTtcbiAgICBpZiAoaXNGdW5jdGlvbk5hbWVDb25maWd1cmFibGUpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9ic2VydmVyQ29tcG9uZW50LCBcIm5hbWVcIiwge1xuICAgICAgICAgICAgdmFsdWU6IGJhc2VDb21wb25lbnQubmFtZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBTdXBwb3J0IGxlZ2FjeSBjb250ZXh0OiBgY29udGV4dFR5cGVzYCBtdXN0IGJlIGFwcGxpZWQgYmVmb3JlIGBtZW1vYFxuICAgIGlmIChiYXNlQ29tcG9uZW50LmNvbnRleHRUeXBlcykge1xuICAgICAgICA7XG4gICAgICAgIG9ic2VydmVyQ29tcG9uZW50LmNvbnRleHRUeXBlcyA9IGJhc2VDb21wb25lbnQuY29udGV4dFR5cGVzO1xuICAgIH1cbiAgICBpZiAodXNlRm9yd2FyZFJlZikge1xuICAgICAgICAvLyBgZm9yd2FyZFJlZmAgbXVzdCBiZSBhcHBsaWVkIHByaW9yIGBtZW1vYFxuICAgICAgICAvLyBgZm9yd2FyZFJlZihvYnNlcnZlcihjbXApKWAgdGhyb3dzOlxuICAgICAgICAvLyBcImZvcndhcmRSZWYgcmVxdWlyZXMgYSByZW5kZXIgZnVuY3Rpb24gYnV0IHJlY2VpdmVkIGEgYG1lbW9gIGNvbXBvbmVudC4gSW5zdGVhZCBvZiBmb3J3YXJkUmVmKG1lbW8oLi4uKSksIHVzZSBtZW1vKGZvcndhcmRSZWYoLi4uKSlcIlxuICAgICAgICBvYnNlcnZlckNvbXBvbmVudCA9IGZvcndhcmRSZWYob2JzZXJ2ZXJDb21wb25lbnQpO1xuICAgIH1cbiAgICAvLyBtZW1vOyB3ZSBhcmUgbm90IGludGVyZXN0ZWQgaW4gZGVlcCB1cGRhdGVzXG4gICAgLy8gaW4gcHJvcHM7IHdlIGFzc3VtZSB0aGF0IGlmIGRlZXAgb2JqZWN0cyBhcmUgY2hhbmdlZCxcbiAgICAvLyB0aGlzIGlzIGluIG9ic2VydmFibGVzLCB3aGljaCB3b3VsZCBoYXZlIGJlZW4gdHJhY2tlZCBhbnl3YXlcbiAgICBvYnNlcnZlckNvbXBvbmVudCA9IG1lbW8ob2JzZXJ2ZXJDb21wb25lbnQpO1xuICAgIGNvcHlTdGF0aWNQcm9wZXJ0aWVzKGJhc2VDb21wb25lbnQsIG9ic2VydmVyQ29tcG9uZW50KTtcbiAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYnNlcnZlckNvbXBvbmVudCwgXCJjb250ZXh0VHlwZXNcIiwge1xuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieC1yZWFjdC1saXRlXSBgXCIuY29uY2F0KHRoaXMuZGlzcGxheU5hbWUgfHwgKChfYSA9IHRoaXMudHlwZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmRpc3BsYXlOYW1lKSB8fCAoKF9iID0gdGhpcy50eXBlKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IubmFtZSkgfHwgXCJDb21wb25lbnRcIiwgXCIuY29udGV4dFR5cGVzYCBtdXN0IGJlIHNldCBiZWZvcmUgYXBwbHlpbmcgYG9ic2VydmVyYC5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIG9ic2VydmVyQ29tcG9uZW50O1xufVxuLy8gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL21yaWRnd2F5L2hvaXN0LW5vbi1yZWFjdC1zdGF0aWNzL2Jsb2IvbWFzdGVyL3NyYy9pbmRleC5qc1xudmFyIGhvaXN0QmxhY2tMaXN0ID0ge1xuICAgICQkdHlwZW9mOiB0cnVlLFxuICAgIHJlbmRlcjogdHJ1ZSxcbiAgICBjb21wYXJlOiB0cnVlLFxuICAgIHR5cGU6IHRydWUsXG4gICAgLy8gRG9uJ3QgcmVkZWZpbmUgYGRpc3BsYXlOYW1lYCxcbiAgICAvLyBpdCdzIGRlZmluZWQgYXMgZ2V0dGVyLXNldHRlciBwYWlyIG9uIGBtZW1vYCAoc2VlICMzMTkyKS5cbiAgICBkaXNwbGF5TmFtZTogdHJ1ZVxufTtcbmZ1bmN0aW9uIGNvcHlTdGF0aWNQcm9wZXJ0aWVzKGJhc2UsIHRhcmdldCkge1xuICAgIE9iamVjdC5rZXlzKGJhc2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoIWhvaXN0QmxhY2tMaXN0W2tleV0pIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihiYXNlLCBrZXkpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9b2JzZXJ2ZXIuanMubWFwIiwidmFyIF9hO1xuaW1wb3J0IFwiLi91dGlscy9hc3NlcnRFbnZpcm9ubWVudFwiO1xuaW1wb3J0IHsgdW5zdGFibGVfYmF0Y2hlZFVwZGF0ZXMgYXMgYmF0Y2ggfSBmcm9tIFwiLi91dGlscy9yZWFjdEJhdGNoZWRVcGRhdGVzXCI7XG5pbXBvcnQgeyBvYnNlcnZlckJhdGNoaW5nIH0gZnJvbSBcIi4vdXRpbHMvb2JzZXJ2ZXJCYXRjaGluZ1wiO1xuaW1wb3J0IHsgdXNlRGVwcmVjYXRlZCB9IGZyb20gXCIuL3V0aWxzL3V0aWxzXCI7XG5pbXBvcnQgeyB1c2VPYnNlcnZlciBhcyB1c2VPYnNlcnZlck9yaWdpbmFsIH0gZnJvbSBcIi4vdXNlT2JzZXJ2ZXJcIjtcbmltcG9ydCB7IGVuYWJsZVN0YXRpY1JlbmRlcmluZyB9IGZyb20gXCIuL3N0YXRpY1JlbmRlcmluZ1wiO1xuaW1wb3J0IHsgb2JzZXJ2ZXJGaW5hbGl6YXRpb25SZWdpc3RyeSB9IGZyb20gXCIuL3V0aWxzL29ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnlcIjtcbm9ic2VydmVyQmF0Y2hpbmcoYmF0Y2gpO1xuZXhwb3J0IHsgaXNVc2luZ1N0YXRpY1JlbmRlcmluZywgZW5hYmxlU3RhdGljUmVuZGVyaW5nIH0gZnJvbSBcIi4vc3RhdGljUmVuZGVyaW5nXCI7XG5leHBvcnQgeyBvYnNlcnZlciB9IGZyb20gXCIuL29ic2VydmVyXCI7XG5leHBvcnQgeyBPYnNlcnZlciB9IGZyb20gXCIuL09ic2VydmVyQ29tcG9uZW50XCI7XG5leHBvcnQgeyB1c2VMb2NhbE9ic2VydmFibGUgfSBmcm9tIFwiLi91c2VMb2NhbE9ic2VydmFibGVcIjtcbmV4cG9ydCB7IHVzZUxvY2FsU3RvcmUgfSBmcm9tIFwiLi91c2VMb2NhbFN0b3JlXCI7XG5leHBvcnQgeyB1c2VBc09ic2VydmFibGVTb3VyY2UgfSBmcm9tIFwiLi91c2VBc09ic2VydmFibGVTb3VyY2VcIjtcbmV4cG9ydCB7IG9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkgYXMgX29ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkgfTtcbmV4cG9ydCB2YXIgY2xlYXJUaW1lcnMgPSAoX2EgPSBvYnNlcnZlckZpbmFsaXphdGlvblJlZ2lzdHJ5W1wiZmluYWxpemVBbGxJbW1lZGlhdGVseVwiXSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKGZ1bmN0aW9uICgpIHsgfSk7XG5leHBvcnQgZnVuY3Rpb24gdXNlT2JzZXJ2ZXIoZm4sIGJhc2VDb21wb25lbnROYW1lKSB7XG4gICAgaWYgKGJhc2VDb21wb25lbnROYW1lID09PSB2b2lkIDApIHsgYmFzZUNvbXBvbmVudE5hbWUgPSBcIm9ic2VydmVkXCI7IH1cbiAgICBpZiAoXCJwcm9kdWN0aW9uXCIgIT09IHByb2Nlc3MuZW52Lk5PREVfRU5WKSB7XG4gICAgICAgIHVzZURlcHJlY2F0ZWQoXCJbbW9ieC1yZWFjdC1saXRlXSAndXNlT2JzZXJ2ZXIoZm4pJyBpcyBkZXByZWNhdGVkLiBVc2UgYDxPYnNlcnZlcj57Zm59PC9PYnNlcnZlcj5gIGluc3RlYWQsIG9yIHdyYXAgdGhlIGVudGlyZSBjb21wb25lbnQgaW4gYG9ic2VydmVyYC5cIik7XG4gICAgfVxuICAgIHJldHVybiB1c2VPYnNlcnZlck9yaWdpbmFsKGZuLCBiYXNlQ29tcG9uZW50TmFtZSk7XG59XG5leHBvcnQgeyBpc09ic2VydmVyQmF0Y2hlZCwgb2JzZXJ2ZXJCYXRjaGluZyB9IGZyb20gXCIuL3V0aWxzL29ic2VydmVyQmF0Y2hpbmdcIjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VTdGF0aWNSZW5kZXJpbmcoZW5hYmxlKSB7XG4gICAgaWYgKFwicHJvZHVjdGlvblwiICE9PSBwcm9jZXNzLmVudi5OT0RFX0VOVikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbbW9ieC1yZWFjdC1saXRlXSAndXNlU3RhdGljUmVuZGVyaW5nJyBpcyBkZXByZWNhdGVkLCB1c2UgJ2VuYWJsZVN0YXRpY1JlbmRlcmluZycgaW5zdGVhZFwiKTtcbiAgICB9XG4gICAgZW5hYmxlU3RhdGljUmVuZGVyaW5nKGVuYWJsZSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJpbXBvcnQgeyBGaWx0ZXJGbkxpc3QsIElucHV0V2l0aEZpbHRlcnMgfSBmcm9tIFwiQG1lbmRpeC93aWRnZXQtcGx1Z2luLWZpbHRlcmluZy9jb250cm9sc1wiO1xuaW1wb3J0IHsgdXNlQmFzaWNTeW5jIH0gZnJvbSBcIkBtZW5kaXgvd2lkZ2V0LXBsdWdpbi1maWx0ZXJpbmcvaGVscGVycy91c2VCYXNpY1N5bmNcIjtcbmltcG9ydCB7IHVzZUVkaXRhYmxlRmlsdGVyQ29udHJvbGxlciB9IGZyb20gXCJAbWVuZGl4L3dpZGdldC1wbHVnaW4tZmlsdGVyaW5nL2hlbHBlcnMvdXNlRWRpdGFibGVGaWx0ZXJDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBTdHJpbmdfSW5wdXRGaWx0ZXJJbnRlcmZhY2UgfSBmcm9tIFwiQG1lbmRpeC93aWRnZXQtcGx1Z2luLWZpbHRlcmluZy90eXBpbmdzL0lucHV0RmlsdGVySW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZVVVSUQgfSBmcm9tIFwiQG1lbmRpeC93aWRnZXQtcGx1Z2luLXBsYXRmb3JtL2ZyYW1ld29yay9nZW5lcmF0ZS11dWlkXCI7XG5pbXBvcnQgeyBvYnNlcnZlciB9IGZyb20gXCJtb2J4LXJlYWN0LWxpdGVcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgRGF0YWdyaWRUZXh0RmlsdGVyQ29udGFpbmVyUHJvcHMsIERlZmF1bHRGaWx0ZXJFbnVtIH0gZnJvbSBcIi4uLy4uL3R5cGluZ3MvRGF0YWdyaWRUZXh0RmlsdGVyUHJvcHNcIjtcblxuY29uc3QgZmlsdGVyRGVmczogUmVjb3JkPERlZmF1bHRGaWx0ZXJFbnVtLCBzdHJpbmc+ID0ge1xuICAgIGNvbnRhaW5zOiBcIkNvbnRhaW5zXCIsXG4gICAgc3RhcnRzV2l0aDogXCJTdGFydHMgd2l0aFwiLFxuICAgIGVuZHNXaXRoOiBcIkVuZHMgd2l0aFwiLFxuICAgIGdyZWF0ZXI6IFwiR3JlYXRlciB0aGFuXCIsXG4gICAgZ3JlYXRlckVxdWFsOiBcIkdyZWF0ZXIgdGhhbiBvciBlcXVhbFwiLFxuICAgIGVxdWFsOiBcIkVxdWFsXCIsXG4gICAgbm90RXF1YWw6IFwiTm90IGVxdWFsXCIsXG4gICAgc21hbGxlcjogXCJTbWFsbGVyIHRoYW5cIixcbiAgICBzbWFsbGVyRXF1YWw6IFwiU21hbGxlciB0aGFuIG9yIGVxdWFsXCIsXG4gICAgZW1wdHk6IFwiRW1wdHlcIixcbiAgICBub3RFbXB0eTogXCJOb3QgZW1wdHlcIlxufTtcblxuY29uc3QgZmlsdGVyczogRmlsdGVyRm5MaXN0PERlZmF1bHRGaWx0ZXJFbnVtPiA9IE9iamVjdC5lbnRyaWVzKGZpbHRlckRlZnMpLm1hcChcbiAgICAoW3ZhbHVlLCBsYWJlbF06IFtEZWZhdWx0RmlsdGVyRW51bSwgc3RyaW5nXSkgPT4gKHtcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGxhYmVsXG4gICAgfSlcbik7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGFpbmVyUHJvcHMgZXh0ZW5kcyBEYXRhZ3JpZFRleHRGaWx0ZXJDb250YWluZXJQcm9wcyB7XG4gICAgcGFyZW50Q2hhbm5lbE5hbWU6IHN0cmluZyB8IG51bGw7XG4gICAgZmlsdGVyU3RvcmU6IFN0cmluZ19JbnB1dEZpbHRlckludGVyZmFjZTtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1hcnJvdy1jYWxsYmFja1xuZXhwb3J0IGNvbnN0IFRleHRGaWx0ZXJDb250YWluZXI6IChwcm9wczogQ29udGFpbmVyUHJvcHMpID0+IFJlYWN0LlJlYWN0RWxlbWVudCA9IG9ic2VydmVyKGZ1bmN0aW9uIFRleHRGaWx0ZXJDb250YWluZXIoXG4gICAgcHJvcHNcbikge1xuICAgIGNvbnN0IGlkID0gKHVzZVJlZjxzdHJpbmc+KCkuY3VycmVudCA/Pz0gYFRleHRGaWx0ZXIke2dlbmVyYXRlVVVJRCgpfWApO1xuXG4gICAgY29uc3QgY29udHJvbGxlciA9IHVzZUVkaXRhYmxlRmlsdGVyQ29udHJvbGxlcih7XG4gICAgICAgIGZpbHRlcjogcHJvcHMuZmlsdGVyU3RvcmUsXG4gICAgICAgIGRlZmF1bHRGaWx0ZXI6IHByb3BzLmRlZmF1bHRGaWx0ZXIsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogcHJvcHMuZGVmYXVsdFZhbHVlPy52YWx1ZSxcbiAgICAgICAgY2hhbmdlRGVsYXk6IHByb3BzLmRlbGF5LFxuICAgICAgICBkaXNhYmxlSW5wdXRzOiBmbiA9PiBmbiA9PT0gXCJlbXB0eVwiIHx8IGZuID09PSBcIm5vdEVtcHR5XCJcbiAgICB9KTtcblxuICAgIHVzZUJhc2ljU3luYyhwcm9wcywgcHJvcHMuZmlsdGVyU3RvcmUpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPElucHV0V2l0aEZpbHRlcnNcbiAgICAgICAgICAgIGFkanVzdGFibGU9e3Byb3BzLmFkanVzdGFibGV9XG4gICAgICAgICAgICBjbGFzc05hbWU9e3Byb3BzLmNsYXNzfVxuICAgICAgICAgICAgZGlzYWJsZUlucHV0cz17Y29udHJvbGxlci5kaXNhYmxlSW5wdXRzfVxuICAgICAgICAgICAgZmlsdGVyRm49e2NvbnRyb2xsZXIuc2VsZWN0ZWRGbn1cbiAgICAgICAgICAgIGZpbHRlckZuTGlzdD17ZmlsdGVyc31cbiAgICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICAgIGlucHV0UmVmPXtjb250cm9sbGVyLmlucHV0UmVmfVxuICAgICAgICAgICAgaW5wdXRTdG9yZXM9e2NvbnRyb2xsZXIuaW5wdXRzfVxuICAgICAgICAgICAgbmFtZT17cHJvcHMubmFtZX1cbiAgICAgICAgICAgIG9uRmlsdGVyQ2hhbmdlPXtjb250cm9sbGVyLmhhbmRsZUZpbHRlckZuQ2hhbmdlfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3Byb3BzLnBsYWNlaG9sZGVyPy52YWx1ZX1cbiAgICAgICAgICAgIHNjcmVlblJlYWRlckJ1dHRvbkNhcHRpb249e3Byb3BzLnNjcmVlblJlYWRlckJ1dHRvbkNhcHRpb24/LnZhbHVlfVxuICAgICAgICAgICAgc2NyZWVuUmVhZGVySW5wdXRDYXB0aW9uPXtwcm9wcy5zY3JlZW5SZWFkZXJJbnB1dENhcHRpb24/LnZhbHVlfVxuICAgICAgICAgICAgc3R5bGVzPXtwcm9wcy5zdHlsZX1cbiAgICAgICAgICAgIHRhYkluZGV4PXtwcm9wcy50YWJJbmRleH1cbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT17cHJvcHMuZGVmYXVsdFZhbHVlPy52YWx1ZX1cbiAgICAgICAgLz5cbiAgICApO1xufSk7XG4iLCJpbXBvcnQgeyBDaGlsZHJlbiwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbi8vIGNsb25pbmcgZnJvbSBodHRwczovL2dpdGxhYi5ybmQubWVuZGl4LmNvbS9hcHBkZXYvYXBwZGV2Ly0vYmxvYi9tYXN0ZXIvY2xpZW50L3NyYy93aWRnZXRzL3dlYi9oZWxwZXJzL0FsZXJ0LnRzeFxuZXhwb3J0IGNvbnN0IFZhbGlkYXRpb25BbGVydCA9ICh7IGNsYXNzTmFtZSwgY2hpbGRyZW4gfSkgPT4gKGNyZWF0ZUVsZW1lbnQoQWxlcnQsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWVzKFwibXgtdmFsaWRhdGlvbi1tZXNzYWdlXCIsIGNsYXNzTmFtZSksIGJvb3RzdHJhcFN0eWxlOiBcImRhbmdlclwiLCByb2xlOiBcImFsZXJ0XCIgfSwgY2hpbGRyZW4pKTtcbmV4cG9ydCBjb25zdCBBbGVydCA9ICh7IGNsYXNzTmFtZSwgYm9vdHN0cmFwU3R5bGUsIGNoaWxkcmVuLCByb2xlIH0pID0+IENoaWxkcmVuLmNvdW50KGNoaWxkcmVuKSA+IDAgPyAoY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lcyhgYWxlcnQgYWxlcnQtJHtib290c3RyYXBTdHlsZX1gLCBjbGFzc05hbWUpLCByb2xlOiByb2xlIH0sIGNoaWxkcmVuKSkgOiBudWxsO1xuQWxlcnQuZGlzcGxheU5hbWUgPSBcIkFsZXJ0XCI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BbGVydC5qcy5tYXAiLCJleHBvcnQgZnVuY3Rpb24gZXJyb3IoZXJyb3IpIHtcbiAgICByZXR1cm4geyBoYXNFcnJvcjogdHJ1ZSwgZXJyb3IgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB2YWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB7IGhhc0Vycm9yOiBmYWxzZSwgdmFsdWUgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlc3VsdC1tZXRhLmpzLm1hcCIsInZhciBDb2RlO1xuKGZ1bmN0aW9uIChDb2RlKSB7XG4gICAgQ29kZVtDb2RlW1wiRUdSUElOVkFMSURBVFRSU1wiXSA9IDVdID0gXCJFR1JQSU5WQUxJREFUVFJTXCI7XG4gICAgQ29kZVtDb2RlW1wiRUdSUFNUT1JFQ1JFQVRFXCJdID0gNF0gPSBcIkVHUlBTVE9SRUNSRUFURVwiO1xuICAgIENvZGVbQ29kZVtcIkVNSVNTSU5HU1RPUkVcIl0gPSAyXSA9IFwiRU1JU1NJTkdTVE9SRVwiO1xuICAgIENvZGVbQ29kZVtcIkVOT0NPTlRFWFRcIl0gPSAxXSA9IFwiRU5PQ09OVEVYVFwiO1xuICAgIENvZGVbQ29kZVtcIkVTVE9SRVRZUEVcIl0gPSAzXSA9IFwiRVNUT1JFVFlQRVwiO1xuICAgIENvZGVbQ29kZVtcIkVHUlBLRVlcIl0gPSA2XSA9IFwiRUdSUEtFWVwiO1xufSkoQ29kZSB8fCAoQ29kZSA9IHt9KSk7XG5leHBvcnQgeyBDb2RlIGFzIEFQSUVycm9yQ29kZSB9O1xuZXhwb3J0IGNvbnN0IEVOT0NPTlRFWFQgPSBPYmplY3QuZnJlZXplKHtcbiAgICBjb2RlOiBDb2RlLkVOT0NPTlRFWFQsXG4gICAgbWVzc2FnZTogXCJUaGUgZmlsdGVyIHdpZGdldCBtdXN0IGJlIHBsYWNlZCBpbnNpZGUgdGhlIGNvbHVtbiBvciBoZWFkZXIgb2YgdGhlIERhdGEgZ3JpZCAyLjAgb3IgaW5zaWRlIGhlYWRlciBvZiB0aGUgR2FsbGVyeSB3aWRnZXQuXCJcbn0pO1xuZXhwb3J0IGNvbnN0IEVNSVNTSU5HU1RPUkUgPSBPYmplY3QuZnJlZXplKHtcbiAgICBjb2RlOiBDb2RlLkVNSVNTSU5HU1RPUkUsXG4gICAgbWVzc2FnZTogXCJVbmFibGUgdG8gZ2V0IGZpbHRlciBzdG9yZS4gQ2hlY2sgcGFyZW50IHdpZGdldCBjb25maWd1cmF0aW9uLlwiXG59KTtcbmV4cG9ydCBjb25zdCBFU1RPUkVUWVBFID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY29kZTogQ29kZS5FU1RPUkVUWVBFLFxuICAgIG1lc3NhZ2U6IFwiVGhlIHR5cGUgb2YgdGhlIGZpbHRlciBhbmQgcGFyZW50IHdpZGdldCBjb25maWd1cmF0aW9uIGlzIGluY29tcGF0aWJsZS4gVGhlIGZpbHRlciBtdXN0IFwiICtcbiAgICAgICAgXCJiZSB1c2VkIHdpdGggY29ycmVjdCBhdHRyaWJ1dGUvZ3JvdXAgdHlwZS5cIlxufSk7XG5leHBvcnQgY29uc3QgRUdSUEtFWSA9IE9iamVjdC5mcmVlemUoe1xuICAgIGNvZGU6IENvZGUuRUdSUEtFWSxcbiAgICBtZXNzYWdlOiBcIkZpbHRlciBlcnJvcjogcHJvcGVydHkgJ0dyb3VwIGtleScgaXMgcmVxdWlyZWQuXCJcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JzLmpzLm1hcCIsImltcG9ydCB7IGVycm9yLCB2YWx1ZSB9IGZyb20gXCIuL3Jlc3VsdC1tZXRhLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBFTk9DT05URVhUIH0gZnJvbSBcIi4vZXJyb3JzLmpzXCI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydCB2YXIgRmlsdGVyVHlwZTtcbihmdW5jdGlvbiAoRmlsdGVyVHlwZSkge1xuICAgIEZpbHRlclR5cGVbXCJTVFJJTkdcIl0gPSBcInN0cmluZ1wiO1xuICAgIEZpbHRlclR5cGVbXCJOVU1CRVJcIl0gPSBcIm51bWJlclwiO1xuICAgIEZpbHRlclR5cGVbXCJFTlVNRVJBVElPTlwiXSA9IFwiZW51bVwiO1xuICAgIEZpbHRlclR5cGVbXCJEQVRFXCJdID0gXCJkYXRlXCI7XG59KShGaWx0ZXJUeXBlIHx8IChGaWx0ZXJUeXBlID0ge30pKTtcbmNvbnN0IENPTlRFWFRfT0JKRUNUX1BBVEggPSBcImNvbS5tZW5kaXgud2lkZ2V0cy53ZWIuZmlsdGVyYWJsZS5maWx0ZXJDb250ZXh0LnYyXCI7XG5leHBvcnQgZnVuY3Rpb24gZ2V0R2xvYmFsRmlsdGVyQ29udGV4dE9iamVjdCgpIHtcbiAgICByZXR1cm4gKHdpbmRvd1tDT05URVhUX09CSkVDVF9QQVRIXSA/Pz0gY3JlYXRlQ29udGV4dChudWxsKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gdXNlRmlsdGVyQ29udGV4dFZhbHVlKCkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBnZXRHbG9iYWxGaWx0ZXJDb250ZXh0T2JqZWN0KCk7XG4gICAgY29uc3QgY29udGV4dFZhbHVlID0gdXNlQ29udGV4dChjb250ZXh0KTtcbiAgICBpZiAoY29udGV4dFZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yKEVOT0NPTlRFWFQpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWUoY29udGV4dFZhbHVlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWx0ZXJTdG9yZShwcm92aWRlciwgbGVnYWN5VHlwZSwga2V5KSB7XG4gICAgc3dpdGNoIChwcm92aWRlci50eXBlKSB7XG4gICAgICAgIGNhc2UgXCJkaXJlY3RcIjpcbiAgICAgICAgICAgIHJldHVybiBwcm92aWRlci5zdG9yZTtcbiAgICAgICAgY2FzZSBcImtleS12YWx1ZVwiOlxuICAgICAgICAgICAgcmV0dXJuIHByb3ZpZGVyLmdldChrZXkpO1xuICAgICAgICBjYXNlIFwibGVnYWN5XCI6XG4gICAgICAgICAgICByZXR1cm4gcHJvdmlkZXIuZ2V0KGxlZ2FjeVR5cGUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29udGV4dC5qcy5tYXAiLCJpbXBvcnQgeyBEYXRlSW5wdXRGaWx0ZXJTdG9yZSB9IGZyb20gXCIuL0RhdGVJbnB1dEZpbHRlclN0b3JlXCI7XG5pbXBvcnQgeyBOdW1iZXJJbnB1dEZpbHRlclN0b3JlIH0gZnJvbSBcIi4vTnVtYmVySW5wdXRGaWx0ZXJTdG9yZVwiO1xuaW1wb3J0IHsgU3RhdGljU2VsZWN0RmlsdGVyU3RvcmUgfSBmcm9tIFwiLi9TdGF0aWNTZWxlY3RGaWx0ZXJTdG9yZVwiO1xuaW1wb3J0IHsgU3RyaW5nSW5wdXRGaWx0ZXJTdG9yZSB9IGZyb20gXCIuL1N0cmluZ0lucHV0RmlsdGVyU3RvcmVcIjtcbmV4cG9ydCBmdW5jdGlvbiBhdHRyZ3JvdXBGaWx0ZXJTdG9yZSh0eXBlLCBhdHRyaWJ1dGVzLCBpbml0Q29uZCkge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlIFwiRGF0ZVRpbWVcIjpcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZUlucHV0RmlsdGVyU3RvcmUoYXR0cmlidXRlcywgaW5pdENvbmQpO1xuICAgICAgICBjYXNlIFwiQXV0b051bWJlclwiOlxuICAgICAgICBjYXNlIFwiRGVjaW1hbFwiOlxuICAgICAgICBjYXNlIFwiSW50ZWdlclwiOlxuICAgICAgICBjYXNlIFwiTG9uZ1wiOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBOdW1iZXJJbnB1dEZpbHRlclN0b3JlKGF0dHJpYnV0ZXMsIGluaXRDb25kKTtcbiAgICAgICAgY2FzZSBcIlN0cmluZ1wiOlxuICAgICAgICBjYXNlIFwiSGFzaFN0cmluZ1wiOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmdJbnB1dEZpbHRlclN0b3JlKGF0dHJpYnV0ZXMsIGluaXRDb25kKTtcbiAgICAgICAgY2FzZSBcIkJvb2xlYW5cIjpcbiAgICAgICAgY2FzZSBcIkVudW1cIjpcbiAgICAgICAgICAgIHJldHVybiBuZXcgU3RhdGljU2VsZWN0RmlsdGVyU3RvcmUoYXR0cmlidXRlcywgaW5pdENvbmQpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImF0dHJncm91cEZpbHRlclN0b3JlOiBub3Qgc3VwcG9ydGVkIHR5cGUgXCIgKyB0eXBlLCBhdHRyaWJ1dGVzKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlckZpbHRlcihzdG9yZSkge1xuICAgIHJldHVybiBzdG9yZS5hcmcxLnR5cGUgPT09IFwibnVtYmVyXCI7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNTdHJpbmdGaWx0ZXIoc3RvcmUpIHtcbiAgICByZXR1cm4gc3RvcmUuYXJnMS50eXBlID09PSBcInN0cmluZ1wiO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0ZUZpbHRlcihzdG9yZSkge1xuICAgIHJldHVybiBzdG9yZS5hcmcxLnR5cGUgPT09IFwiZGF0ZVwiO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3RvcmUtdXRpbHMuanMubWFwIiwiaW1wb3J0IHsgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBGaWx0ZXJUeXBlLCBnZXRGaWx0ZXJTdG9yZSwgdXNlRmlsdGVyQ29udGV4dFZhbHVlIH0gZnJvbSBcIi4uL2NvbnRleHRcIjtcbmltcG9ydCB7IGVycm9yLCB2YWx1ZSB9IGZyb20gXCIuLi9yZXN1bHQtbWV0YVwiO1xuaW1wb3J0IHsgRUdSUEtFWSwgRU1JU1NJTkdTVE9SRSwgRVNUT1JFVFlQRSB9IGZyb20gXCIuLi9lcnJvcnNcIjtcbmltcG9ydCB7IGlzU3RyaW5nRmlsdGVyIH0gZnJvbSBcIi4uL3N0b3Jlcy9zdG9yZS11dGlsc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIHVzZVN0cmluZ0ZpbHRlckFQSShrZXkpIHtcbiAgICBjb25zdCBjdHggPSB1c2VGaWx0ZXJDb250ZXh0VmFsdWUoKTtcbiAgICBjb25zdCBzdHJBUEkgPSB1c2VSZWYoKTtcbiAgICBpZiAoY3R4Lmhhc0Vycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvcihjdHguZXJyb3IpO1xuICAgIH1cbiAgICBjb25zdCBhcGkgPSBjdHgudmFsdWU7XG4gICAgaWYgKGFwaS5wcm92aWRlci5oYXNFcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3IoYXBpLnByb3ZpZGVyLmVycm9yKTtcbiAgICB9XG4gICAgaWYgKGFwaS5wcm92aWRlci52YWx1ZS50eXBlID09PSBcImtleS12YWx1ZVwiICYmIGtleSA9PT0gXCJcIikge1xuICAgICAgICByZXR1cm4gZXJyb3IoRUdSUEtFWSk7XG4gICAgfVxuICAgIGNvbnN0IHN0b3JlID0gZ2V0RmlsdGVyU3RvcmUoYXBpLnByb3ZpZGVyLnZhbHVlLCBGaWx0ZXJUeXBlLlNUUklORywga2V5KTtcbiAgICBpZiAoc3RvcmUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yKEVNSVNTSU5HU1RPUkUpO1xuICAgIH1cbiAgICBpZiAoc3RvcmUuc3RvcmVUeXBlID09PSBcIm9wdGlvbmxpc3RcIiB8fCAhaXNTdHJpbmdGaWx0ZXIoc3RvcmUpKSB7XG4gICAgICAgIHJldHVybiBlcnJvcihFU1RPUkVUWVBFKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlKChzdHJBUEkuY3VycmVudCA/Pz0geyBmaWx0ZXJTdG9yZTogc3RvcmUsIHBhcmVudENoYW5uZWxOYW1lOiBhcGkucGFyZW50Q2hhbm5lbE5hbWUgfSkpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXNlU3RyaW5nRmlsdGVyQVBJLmpzLm1hcCIsImltcG9ydCB7IEFsZXJ0IH0gZnJvbSBcIkBtZW5kaXgvd2lkZ2V0LXBsdWdpbi1jb21wb25lbnQta2l0L0FsZXJ0XCI7XG5pbXBvcnQgeyBTdHJpbmdfRmlsdGVyQVBJdjIsIHVzZVN0cmluZ0ZpbHRlckFQSSB9IGZyb20gXCJAbWVuZGl4L3dpZGdldC1wbHVnaW4tZmlsdGVyaW5nL2hlbHBlcnMvdXNlU3RyaW5nRmlsdGVyQVBJXCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gICAgZ3JvdXBLZXk6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhUZXh0RmlsdGVyQVBJPFAgZXh0ZW5kcyBQcm9wcz4oXG4gICAgQ29tcG9uZW50OiAocHJvcHM6IFAgJiBTdHJpbmdfRmlsdGVyQVBJdjIpID0+IFJlYWN0LlJlYWN0RWxlbWVudFxuKTogKHByb3BzOiBQKSA9PiBSZWFjdC5SZWFjdEVsZW1lbnQge1xuICAgIHJldHVybiBmdW5jdGlvbiBGaWx0ZXJBUElQcm92aWRlcihwcm9wcykge1xuICAgICAgICBjb25zdCBhcGkgPSB1c2VTdHJpbmdGaWx0ZXJBUEkocHJvcHMuZ3JvdXBLZXkpO1xuXG4gICAgICAgIGlmIChhcGkuaGFzRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiA8QWxlcnQgYm9vdHN0cmFwU3R5bGU9XCJkYW5nZXJcIj57YXBpLmVycm9yLm1lc3NhZ2V9PC9BbGVydD47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPENvbXBvbmVudCBmaWx0ZXJTdG9yZT17YXBpLnZhbHVlLmZpbHRlclN0b3JlfSBwYXJlbnRDaGFubmVsTmFtZT17YXBpLnZhbHVlLnBhcmVudENoYW5uZWxOYW1lfSB7Li4ucHJvcHN9IC8+XG4gICAgICAgICk7XG4gICAgfTtcbn1cbiIsImltcG9ydCB7IER5bmFtaWNWYWx1ZSB9IGZyb20gXCJtZW5kaXhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTG9hZGluZ0RlZmF1bHRWYWx1ZXMocHJvcHM6IHsgZGVmYXVsdFZhbHVlPzogRHluYW1pY1ZhbHVlPHN0cmluZz4gfSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBwcm9wcy5kZWZhdWx0VmFsdWU/LnN0YXR1cyA9PT0gXCJsb2FkaW5nXCI7XG59XG4iLCJpbXBvcnQgeyB3aXRoUHJlbG9hZGVyIH0gZnJvbSBcIkBtZW5kaXgvd2lkZ2V0LXBsdWdpbi1wbGF0Zm9ybS9ob2Mvd2l0aFByZWxvYWRlclwiO1xuaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBEYXRhZ3JpZFRleHRGaWx0ZXJDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi90eXBpbmdzL0RhdGFncmlkVGV4dEZpbHRlclByb3BzXCI7XG5pbXBvcnQgeyBUZXh0RmlsdGVyQ29udGFpbmVyIH0gZnJvbSBcIi4vY29tcG9uZW50cy9UZXh0RmlsdGVyQ29udGFpbmVyXCI7XG5pbXBvcnQgeyB3aXRoVGV4dEZpbHRlckFQSSB9IGZyb20gXCIuL2hvY3Mvd2l0aFRleHRGaWx0ZXJBUElcIjtcbmltcG9ydCB7IGlzTG9hZGluZ0RlZmF1bHRWYWx1ZXMgfSBmcm9tIFwiLi91dGlscy93aWRnZXQtdXRpbHNcIjtcblxuY29uc3QgY29udGFpbmVyID0gd2l0aFByZWxvYWRlcjxEYXRhZ3JpZFRleHRGaWx0ZXJDb250YWluZXJQcm9wcz4oVGV4dEZpbHRlckNvbnRhaW5lciwgaXNMb2FkaW5nRGVmYXVsdFZhbHVlcyk7XG5jb25zdCBXaWRnZXQgPSB3aXRoVGV4dEZpbHRlckFQSShjb250YWluZXIpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXRhZ3JpZFRleHRGaWx0ZXIocHJvcHM6IERhdGFncmlkVGV4dEZpbHRlckNvbnRhaW5lclByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgICByZXR1cm4gPFdpZGdldCB7Li4ucHJvcHN9IC8+O1xufVxuIl0sIm5hbWVzIjpbIndpdGhQcmVsb2FkZXIiLCJDb21wb25lbnQiLCJpc0xvYWRpbmciLCJQcmVsb2FkZXIiLCJwcm9wcyIsImlzTG9hZGVkIiwidXNlUmVmIiwiY3VycmVudCIsImNyZWF0ZUVsZW1lbnQiLCJGcmFnbWVudCIsIm5pY2VFcnJvcnMiLCJfIiwiYW5ub3RhdGlvblR5cGUiLCJrZXkiLCJ0b1N0cmluZyIsImluZGV4IiwibGVuZ3RoIiwib3RoZXIiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJkYXRhU3RydWN0dXJlIiwidGhpbmciLCJwcm9wZXJ0eSIsImRlcml2YXRpb24iLCJtZXRob2QiLCJlcnJvcnMiLCJkaWUiLCJlcnJvciIsImFyZ3MiLCJBcnJheSIsIl9sZW4iLCJfa2V5IiwiYXJndW1lbnRzIiwiZSIsImFwcGx5IiwiRXJyb3IiLCJ1c2VTdGF0ZSIsIm1ha2VPYnNlcnZhYmxlIiwiZGVmYXVsdE5vb3BCYXRjaCIsImNhbGxiYWNrIiwib2JzZXJ2ZXJCYXRjaGluZyIsInJlYWN0aW9uU2NoZWR1bGVyIiwiY29uc29sZSIsIndhcm4iLCJjb25maWd1cmUiLCJwcmludERlYnVnVmFsdWUiLCJ2IiwiZ2V0RGVwZW5kZW5jeVRyZWUiLCJSRUdJU1RSWV9GSU5BTElaRV9BRlRFUiIsIlJFR0lTVFJZX1NXRUVQX0lOVEVSVkFMIiwiVGltZXJCYXNlZEZpbmFsaXphdGlvblJlZ2lzdHJ5IiwiZmluYWxpemUiLCJfdGhpcyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiTWFwIiwibWF4QWdlIiwiY2xlYXJUaW1lb3V0Iiwic3dlZXBUaW1lb3V0IiwidW5kZWZpbmVkIiwibm93IiwiRGF0ZSIsInJlZ2lzdHJhdGlvbnMiLCJmb3JFYWNoIiwicmVnaXN0cmF0aW9uIiwidG9rZW4iLCJyZWdpc3RlcmVkQXQiLCJ2YWx1ZSIsImRlbGV0ZSIsInNpemUiLCJzY2hlZHVsZVN3ZWVwIiwic3dlZXAiLCJ0YXJnZXQiLCJzZXQiLCJzZXRUaW1lb3V0IiwiVW5pdmVyc2FsRmluYWxpemF0aW9uUmVnaXN0cnkiLCJGaW5hbGl6YXRpb25SZWdpc3RyeSIsIm9ic2VydmVyRmluYWxpemF0aW9uUmVnaXN0cnkiLCJhZG0iLCJfYSIsInJlYWN0aW9uIiwiZGlzcG9zZSIsImNyZWF0ZVJlYWN0aW9uIiwiUmVhY3Rpb24iLCJjb25jYXQiLCJzdGF0ZVZlcnNpb24iLCJTeW1ib2wiLCJvblN0b3JlQ2hhbmdlIiwiY2FsbCIsInVzZU9ic2VydmVyIiwicmVuZGVyIiwiYmFzZUNvbXBvbmVudE5hbWUiLCJhZG1SZWYiLCJSZWFjdCIsImFkbV8xIiwic3Vic2NyaWJlIiwidW5yZWdpc3RlciIsImdldFNuYXBzaG90IiwicmVnaXN0ZXIiLCJ1c2VEZWJ1Z1ZhbHVlIiwidXNlU3luY0V4dGVybmFsU3RvcmUiLCJyZW5kZXJSZXN1bHQiLCJleGNlcHRpb24iLCJ0cmFjayIsIndhcm5PYnNlcnZlck9wdGlvbnNEZXByZWNhdGVkIiwiaGFzU3ltYm9sIiwiZm9yIiwiaXNGdW5jdGlvbk5hbWVDb25maWd1cmFibGUiLCJfYiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImNvbmZpZ3VyYWJsZSIsIlJlYWN0Rm9yd2FyZFJlZlN5bWJvbCIsImZvcndhcmRSZWYiLCJSZWFjdE1lbW9TeW1ib2wiLCJtZW1vIiwib2JzZXJ2ZXIiLCJiYXNlQ29tcG9uZW50Iiwib3B0aW9ucyIsInVzZUZvcndhcmRSZWYiLCJkaXNwbGF5TmFtZSIsIm9ic2VydmVyQ29tcG9uZW50IiwicmVmIiwid3JpdGFibGUiLCJjb250ZXh0VHlwZXMiLCJjb3B5U3RhdGljUHJvcGVydGllcyIsInR5cGUiLCJob2lzdEJsYWNrTGlzdCIsIiQkdHlwZW9mIiwiY29tcGFyZSIsImJhc2UiLCJrZXlzIiwiYmF0Y2giLCJoYXNPd24iLCJoYXNPd25Qcm9wZXJ0eSIsImNsYXNzTmFtZXMiLCJjbGFzc2VzIiwiaSIsImFyZyIsImFyZ1R5cGUiLCJwdXNoIiwiaXNBcnJheSIsImlubmVyIiwicHJvdG90eXBlIiwiaW5jbHVkZXMiLCJqb2luIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJ3aW5kb3ciLCJ1c2VQb3NpdGlvbk9ic2VydmVyIiwiYWN0aXZlIiwicG9zaXRpb24iLCJzZXRQb3NpdGlvbiIsIm9uQW5pbWF0aW9uRnJhbWVIYW5kbGVyIiwidXNlQ2FsbGJhY2siLCJwcmV2IiwibmV4dCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInNob3VsZFVwZGF0ZVBvc2l0aW9uIiwidXNlQW5pbWF0aW9uRnJhbWVFZmZlY3QiLCJ1c2VFZmZlY3QiLCJhbmltYXRpb25Mb29wIiwiYSIsImIiLCJoZWlnaHQiLCJ3aWR0aCIsImJvdHRvbSIsInRvcCIsImxlZnQiLCJyaWdodCIsInJlcXVlc3RJZCIsInJlcXVlc3RGcmFtZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImNhbmNlbCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiRmlsdGVyU2VsZWN0b3IiLCJvbkNoYW5nZSIsInNob3ciLCJzZXRTaG93IiwiY29tcG9uZW50UmVmIiwiZmlsdGVyU2VsZWN0b3JzUmVmIiwidXNlT25DbGlja091dHNpZGUiLCJvbkNsaWNrIiwiZmlsdGVyU2VsZWN0b3JzIiwiaWQiLCJjbGFzc05hbWUiLCJyb2xlIiwic3R5bGUiLCJtYXAiLCJvcHRpb24iLCJwcmV2ZW50RGVmYXVsdCIsInN0b3BQcm9wYWdhdGlvbiIsIm9uS2V5RG93biIsInNoaWZ0S2V5IiwicXVlcnlTZWxlY3RvciIsImZvY3VzIiwidGFiSW5kZXgiLCJsYWJlbCIsImNvbnRhaW5lckNsaWNrIiwiYXJpYUxhYmVsIiwiaGFuZGxlciIsImxpc3RlbmVyIiwiZXZlbnQiLCJzb21lIiwiciIsImNvbnRhaW5zIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkJhZGdlIiwiY29sb3IiLCJiYWNrZ3JvdW5kIiwiZm9udFNpemUiLCJwYWRkaW5nIiwiYm9yZGVyUmFkaXVzIiwiY2hpbGRyZW4iLCJJbnB1dFdpdGhGaWx0ZXJzIiwiaW5wdXRTdG9yZXMiLCJpbnB1dDEiLCJzdHlsZXMiLCJiYWRnZSIsImFkanVzdGFibGUiLCJzY3JlZW5SZWFkZXJCdXR0b25DYXB0aW9uIiwiZmlsdGVyRm4iLCJvbkZpbHRlckNoYW5nZSIsImZpbHRlckZuTGlzdCIsInNjcmVlblJlYWRlcklucHV0Q2FwdGlvbiIsImRpc2FibGVkIiwiZGlzYWJsZUlucHV0cyIsInBsYWNlaG9sZGVyIiwiaW5wdXRSZWYiLCJ1c2VCYXNpY1N5bmMiLCJzdG9yZSIsInBib3giLCJhcmcxIiwiYXJnMiIsImNyZWF0ZVB1c2hlciIsInZhbHVlMSIsIl92YWx1ZTIiLCJ2YWx1ZUF0dHJpYnV0ZSIsInNldFZhbHVlIiwiY2FuRXhlY3V0ZSIsImV4ZWN1dGUiLCJkZWJvdW5jZSIsImZ1bmMiLCJ3YWl0Rm9yIiwidGltZW91dCIsImFib3J0IiwiZGVib3VuY2VkIiwiSW5wdXRTdG9yZSIsImluaXQiLCJfZGVmaW5lUHJvcGVydHkiLCJvYnNlcnZhYmxlIiwiYWN0aW9uIiwiRWRpdGFibGVGaWx0ZXJDb250cm9sbGVyIiwicGFyYW1zIiwiY3JlYXRlUmVmIiwiZm4iLCJmaWx0ZXIiLCJmaWx0ZXJGdW5jdGlvbiIsImNoYW5nZURlbGF5IiwiZGlzcGxheVZhbHVlIiwiaW5wdXQyIiwiaW5wdXRzIiwiZGVmYXVsdHMiLCJkZWZhdWx0RmlsdGVyIiwiZGVmYXVsdFZhbHVlIiwiZGlzYWJsZWRGbiIsInNlbGVjdGVkRm4iLCJjb21wdXRlZCIsImhhbmRsZUZpbHRlckZuQ2hhbmdlIiwic2V0dXAiLCJkaXNwb3NlcnMiLCJvbklucHV0c0NoYW5nZSIsImNsZWFyRGVib3VuY2UiLCJ2MSIsInYyIiwicnVuSW5BY3Rpb24iLCJhdXRvcnVuIiwiVU5TQUZFX3NldERlZmF1bHRzIiwidXNlRWRpdGFibGVGaWx0ZXJDb250cm9sbGVyIiwiY3RybCIsImdlbmVyYXRlVVVJRCIsIlVVSURMb2NhdGlvbiIsIkFsZXJ0IiwiYm9vdHN0cmFwU3R5bGUiLCJDaGlsZHJlbiIsImNvdW50IiwiaGFzRXJyb3IiLCJDb2RlIiwiRU5PQ09OVEVYVCIsImZyZWV6ZSIsImNvZGUiLCJtZXNzYWdlIiwiRU1JU1NJTkdTVE9SRSIsIkVTVE9SRVRZUEUiLCJFR1JQS0VZIiwiRmlsdGVyVHlwZSIsIkNPTlRFWFRfT0JKRUNUX1BBVEgiLCJnZXRHbG9iYWxGaWx0ZXJDb250ZXh0T2JqZWN0IiwiY3JlYXRlQ29udGV4dCIsInVzZUZpbHRlckNvbnRleHRWYWx1ZSIsImNvbnRleHQiLCJjb250ZXh0VmFsdWUiLCJ1c2VDb250ZXh0IiwiZ2V0RmlsdGVyU3RvcmUiLCJwcm92aWRlciIsImxlZ2FjeVR5cGUiLCJnZXQiLCJpc1N0cmluZ0ZpbHRlciIsInVzZVN0cmluZ0ZpbHRlckFQSSIsImN0eCIsInN0ckFQSSIsImFwaSIsIlNUUklORyIsInN0b3JlVHlwZSIsImZpbHRlclN0b3JlIiwicGFyZW50Q2hhbm5lbE5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBRU0sU0FBVUEsYUFBYUEsQ0FDekJDLFNBQTJDLEVBQzNDQyxTQUFnQyxFQUFBO0VBRWhDLE9BQU8sU0FBU0MsU0FBU0EsQ0FBQ0MsS0FBUSxFQUFBO0FBQzlCLElBQUEsTUFBTUMsUUFBUSxHQUFJQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUNDLE9BQU8sS0FBSyxDQUFDTCxTQUFTLENBQUNFLEtBQUssQ0FBRSxDQUFBO0FBQzlELElBQUEsT0FBT0MsUUFBUSxHQUFHRyxhQUFBLENBQUNQLFNBQVMsRUFBQTtNQUFBLEdB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SSxPQUFPTSxDQUFDLEtBQUssVUFBVSxFQUFFQSxDQUFDLEdBQUdBLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLElBQUksRUFBRU4sSUFBVyxDQUFDLENBQUE7QUFDM0QsSUFBQSxNQUFNLElBQUlPLEtBQUssQ0FBV0YsU0FBQUEsR0FBQUEsQ0FBQyxDQUFHLENBQUE7O0FBU3RDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pGQSxJQUFJLENBQUNHLFFBQVEsRUFBRTtBQUNYLEVBQUEsTUFBTSxJQUFJRCxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQTs7QUFFeEUsSUFBSSxDQUFDRSxjQUFjLEVBQUU7QUFDakIsRUFBQSxNQUFNLElBQUlG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
