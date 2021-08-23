define(['exports', 'react', 'react-dom'], function (exports, React, ReactDOM) { 'use strict';

    

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

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
    var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

    const useLightboxState = () => {
        const [lightboxIsOpen, setLightboxIsOpen] = React.useState(false);
        const openLightbox = React.useCallback(() => {
            setLightboxIsOpen(true);
        }, []);
        const closeLightbox = React.useCallback(() => {
            setLightboxIsOpen(false);
        }, []);
        return { lightboxIsOpen, openLightbox, closeLightbox };
    };

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

    ___$insertStyle(".mx-image-viewer {\n  height: 100%;\n  width: 100%;\n}\n\n.mx-image-viewer-responsive img {\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.mx-image-viewer-lightbox-backdrop {\n  z-index: 110;\n  background-color: rgba(0, 0, 0, 0.85);\n  position: fixed;\n  inset: 0px;\n}\n.mx-image-viewer-lightbox-backdrop .close-button {\n  position: absolute;\n  top: 30px;\n  right: 30px;\n  color: white;\n  display: flex;\n  background: none;\n  border: none;\n  padding: 8px;\n  cursor: pointer;\n}\n.mx-image-viewer-lightbox-backdrop .close-button .removeIcon {\n  height: 16px;\n  width: 16px;\n}\n\n.mx-image-viewer-lightbox {\n  z-index: 210;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}");

    function getStyle(value, type) {
        // when type is auto default browser styles applies
        if (type === "pixels") {
            return value;
        }
        else if (type === "percentage") {
            return value + "%";
        }
        return "";
    }
    function Wrapper(props) {
        return (React.createElement("div", { className: classnames("mx-image-viewer", { "mx-image-viewer-responsive": props.responsive }, props.className, { hidden: !props.hasImage }) }, props.children));
    }
    function Glyphicon(props) {
        const accessibilityProps = props.altText
            ? {
                "aria-label": props.altText,
                role: "img"
            }
            : {};
        const onClickProps = getImageContentOnClickProps(props.onClick);
        return (React.createElement("span", Object.assign({ className: classnames("glyphicon", props.icon), style: { ...props.style, fontSize: `${props.size}px` } }, accessibilityProps, onClickProps)));
    }
    function Image(props) {
        const onClickProps = getImageContentOnClickProps(props.onClick);
        return (React.createElement("img", Object.assign({ src: props.image, style: {
                ...props.style,
                height: getStyle(props.height, props.heightUnit),
                width: getStyle(props.width, props.widthUnit)
            }, alt: props.altText }, onClickProps)));
    }
    function getImageContentOnClickProps(onClick) {
        if (!onClick) {
            return {};
        }
        return {
            onClick,
            role: "button",
            tabIndex: 0,
            onKeyDown: event => {
                if (event.key === "Enter" || event.key === " ") {
                    onClick(event);
                }
            }
        };
    }
    const ImageViewerUi = {
        Wrapper,
        Glyphicon,
        Image
    };

    function _extends() {
      _extends = Object.assign || function (target) {
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

    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null) return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;

      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
      }

      return target;
    }

    /**
     * Returns the owner document of a given element.
     * 
     * @param node the element
     */
    function ownerDocument(node) {
      return node && node.ownerDocument || document;
    }

    /**
     * Returns the actively focused element safely.
     *
     * @param doc the document to check
     */

    function activeElement(doc) {
      if (doc === void 0) {
        doc = ownerDocument();
      } // Support: IE 9 only
      // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>


      try {
        var active = doc.activeElement; // IE11 returns a seemingly empty object in some cases when accessing
        // document.activeElement from an <iframe>

        if (!active || !active.nodeName) return null;
        return active;
      } catch (e) {
        /* ie throws if no active element */
        return doc.body;
      }
    }

    /* eslint-disable no-bitwise, no-cond-assign */

    /**
     * Checks if an element contains another given element.
     * 
     * @param context the context element
     * @param node the element to check
     */
    function contains(context, node) {
      // HTML DOM and SVG DOM may have different support levels,
      // so we need to check on context instead of a document root element.
      if (context.contains) return context.contains(node);
      if (context.compareDocumentPosition) return context === node || !!(context.compareDocumentPosition(node) & 16);
    }

    var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

    /* eslint-disable no-return-assign */
    var optionsSupported = false;
    var onceSupported = false;

    try {
      var options = {
        get passive() {
          return optionsSupported = true;
        },

        get once() {
          // eslint-disable-next-line no-multi-assign
          return onceSupported = optionsSupported = true;
        }

      };

      if (canUseDOM) {
        window.addEventListener('test', options, options);
        window.removeEventListener('test', options, true);
      }
    } catch (e) {
      /* */
    }
    /**
     * An `addEventListener` ponyfill, supports the `once` option
     * 
     * @param node the element
     * @param eventName the event name
     * @param handle the handler
     * @param options event options
     */


    function addEventListener(node, eventName, handler, options) {
      if (options && typeof options !== 'boolean' && !onceSupported) {
        var once = options.once,
            capture = options.capture;
        var wrappedHandler = handler;

        if (!onceSupported && once) {
          wrappedHandler = handler.__once || function onceHandler(event) {
            this.removeEventListener(eventName, onceHandler, capture);
            handler.call(this, event);
          };

          handler.__once = wrappedHandler;
        }

        node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
      }

      node.addEventListener(eventName, handler, options);
    }

    /**
     * A `removeEventListener` ponyfill
     * 
     * @param node the element
     * @param eventName the event name
     * @param handle the handler
     * @param options event options
     */
    function removeEventListener(node, eventName, handler, options) {
      var capture = options && typeof options !== 'boolean' ? options.capture : options;
      node.removeEventListener(eventName, handler, capture);

      if (handler.__once) {
        node.removeEventListener(eventName, handler.__once, capture);
      }
    }

    function listen(node, eventName, handler, options) {
      addEventListener(node, eventName, handler, options);
      return function () {
        removeEventListener(node, eventName, handler, options);
      };
    }

    var reactIs_development = createCommonjsModule(function (module, exports) {

    {
      (function () {
        // nor polyfill, then a plain number is used for performance.

        var hasSymbol = typeof Symbol === 'function' && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
        // (unstable) APIs that have been removed. Can we remove the symbols?

        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

        function isValidElementType(type) {
          return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }

        function typeOf(object) {
          if (typeof object === 'object' && object !== null) {
            var $$typeof = object.$$typeof;

            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;

                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;

                  default:
                    var $$typeofType = type && type.$$typeof;

                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;

                      default:
                        return $$typeof;
                    }

                }

              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }

          return undefined;
        } // AsyncMode is deprecated along with isAsyncMode


        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

              console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }

        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }

        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }

        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }

        function isElement(object) {
          return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }

        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }

        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }

        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }

        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }

        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }

        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }

        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }

        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }

        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
    });

    var reactIs = createCommonjsModule(function (module) {

    {
      module.exports = reactIs_development;
    }
    });

    /*
    object-assign
    (c) Sindre Sorhus
    @license MIT
    */
    /* eslint-disable no-unused-vars */

    var getOwnPropertySymbols = Object.getOwnPropertySymbols;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var propIsEnumerable = Object.prototype.propertyIsEnumerable;

    function toObject(val) {
      if (val === null || val === undefined) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
      }

      return Object(val);
    }

    function shouldUseNative() {
      try {
        if (!Object.assign) {
          return false;
        } // Detect buggy property enumeration order in older V8 versions.
        // https://bugs.chromium.org/p/v8/issues/detail?id=4118


        var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

        test1[5] = 'de';

        if (Object.getOwnPropertyNames(test1)[0] === '5') {
          return false;
        } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


        var test2 = {};

        for (var i = 0; i < 10; i++) {
          test2['_' + String.fromCharCode(i)] = i;
        }

        var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
          return test2[n];
        });

        if (order2.join('') !== '0123456789') {
          return false;
        } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


        var test3 = {};
        'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
          test3[letter] = letter;
        });

        if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
          return false;
        }

        return true;
      } catch (err) {
        // We don't expect any of the above to throw, but better to be safe.
        return false;
      }
    }

    var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
      var from;
      var to = toObject(target);
      var symbols;

      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);

        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key];
          }
        }

        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from);

          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]];
            }
          }
        }
      }

      return to;
    };

    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
    var ReactPropTypesSecret_1 = ReactPropTypesSecret;

    var printWarning = function () {};

    {
      var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;

      var loggedTypeFailures = {};
      var has = Function.call.bind(Object.prototype.hasOwnProperty);

      printWarning = function (text) {
        var message = 'Warning: ' + text;

        if (typeof console !== 'undefined') {
          console.error(message);
        }

        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };
    }
    /**
     * Assert that the values match with the type specs.
     * Error messages are memorized and will only be shown once.
     *
     * @param {object} typeSpecs Map of name to a ReactPropType
     * @param {object} values Runtime values that need to be type-checked
     * @param {string} location e.g. "prop", "context", "child context"
     * @param {string} componentName Name of the component for error messages.
     * @param {?Function} getStack Returns the component stack.
     * @private
     */


    function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
      {
        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error; // Prop type validation may throw. In case they do, we don't want to
            // fail the render phase where it didn't fail before. So we log it.
            // After these have been cleaned up, we'll let them throw.

            try {
              // This is intentionally an invariant that gets caught. It's the same
              // behavior as without this statement except with a better message.
              if (typeof typeSpecs[typeSpecName] !== 'function') {
                var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.');
                err.name = 'Invariant Violation';
                throw err;
              }

              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
            } catch (ex) {
              error = ex;
            }

            if (error && !(error instanceof Error)) {
              printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
            }

            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              // Only monitor this failure once because there tends to be a lot of the
              // same error.
              loggedTypeFailures[error.message] = true;
              var stack = getStack ? getStack() : '';
              printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
            }
          }
        }
      }
    }
    /**
     * Resets warning cache when testing.
     *
     * @private
     */


    checkPropTypes.resetWarningCache = function () {
      {
        loggedTypeFailures = {};
      }
    };

    var checkPropTypes_1 = checkPropTypes;

    var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

    var printWarning$1 = function () {};

    {
      printWarning$1 = function (text) {
        var message = 'Warning: ' + text;

        if (typeof console !== 'undefined') {
          console.error(message);
        }

        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };
    }

    function emptyFunctionThatReturnsNull() {
      return null;
    }

    var factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
      /* global Symbol */
      var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

      /**
       * Returns the iterator method function contained on the iterable object.
       *
       * Be sure to invoke the function with the iterable as context:
       *
       *     var iteratorFn = getIteratorFn(myIterable);
       *     if (iteratorFn) {
       *       var iterator = iteratorFn.call(myIterable);
       *       ...
       *     }
       *
       * @param {?object} maybeIterable
       * @return {?function}
       */

      function getIteratorFn(maybeIterable) {
        var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

        if (typeof iteratorFn === 'function') {
          return iteratorFn;
        }
      }
      /**
       * Collection of methods that allow declaration and validation of props that are
       * supplied to React components. Example usage:
       *
       *   var Props = require('ReactPropTypes');
       *   var MyArticle = React.createClass({
       *     propTypes: {
       *       // An optional string prop named "description".
       *       description: Props.string,
       *
       *       // A required enum prop named "category".
       *       category: Props.oneOf(['News','Photos']).isRequired,
       *
       *       // A prop named "dialog" that requires an instance of Dialog.
       *       dialog: Props.instanceOf(Dialog).isRequired
       *     },
       *     render: function() { ... }
       *   });
       *
       * A more formal specification of how these methods are used:
       *
       *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
       *   decl := ReactPropTypes.{type}(.isRequired)?
       *
       * Each and every declaration produces a function with the same signature. This
       * allows the creation of custom validation functions. For example:
       *
       *  var MyLink = React.createClass({
       *    propTypes: {
       *      // An optional string or URI prop named "href".
       *      href: function(props, propName, componentName) {
       *        var propValue = props[propName];
       *        if (propValue != null && typeof propValue !== 'string' &&
       *            !(propValue instanceof URI)) {
       *          return new Error(
       *            'Expected a string or an URI for ' + propName + ' in ' +
       *            componentName
       *          );
       *        }
       *      }
       *    },
       *    render: function() {...}
       *  });
       *
       * @internal
       */


      var ANONYMOUS = '<<anonymous>>'; // Important!
      // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

      var ReactPropTypes = {
        array: createPrimitiveTypeChecker('array'),
        bool: createPrimitiveTypeChecker('boolean'),
        func: createPrimitiveTypeChecker('function'),
        number: createPrimitiveTypeChecker('number'),
        object: createPrimitiveTypeChecker('object'),
        string: createPrimitiveTypeChecker('string'),
        symbol: createPrimitiveTypeChecker('symbol'),
        any: createAnyTypeChecker(),
        arrayOf: createArrayOfTypeChecker,
        element: createElementTypeChecker(),
        elementType: createElementTypeTypeChecker(),
        instanceOf: createInstanceTypeChecker,
        node: createNodeChecker(),
        objectOf: createObjectOfTypeChecker,
        oneOf: createEnumTypeChecker,
        oneOfType: createUnionTypeChecker,
        shape: createShapeTypeChecker,
        exact: createStrictShapeTypeChecker
      };
      /**
       * inlined Object.is polyfill to avoid requiring consumers ship their own
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
       */

      /*eslint-disable no-self-compare*/

      function is(x, y) {
        // SameValue algorithm
        if (x === y) {
          // Steps 1-5, 7-10
          // Steps 6.b-6.e: +0 != -0
          return x !== 0 || 1 / x === 1 / y;
        } else {
          // Step 6.a: NaN == NaN
          return x !== x && y !== y;
        }
      }
      /*eslint-enable no-self-compare*/

      /**
       * We use an Error-like object for backward compatibility as people may call
       * PropTypes directly and inspect their output. However, we don't use real
       * Errors anymore. We don't inspect their stack anyway, and creating them
       * is prohibitively expensive if they are created too often, such as what
       * happens in oneOfType() for any type before the one that matched.
       */


      function PropTypeError(message) {
        this.message = message;
        this.stack = '';
      } // Make `instanceof Error` still work for returned errors.


      PropTypeError.prototype = Error.prototype;

      function createChainableTypeChecker(validate) {
        {
          var manualPropTypeCallCache = {};
          var manualPropTypeWarningCount = 0;
        }

        function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
          componentName = componentName || ANONYMOUS;
          propFullName = propFullName || propName;

          if (secret !== ReactPropTypesSecret_1) {
            if (throwOnDirectAccess) {
              // New behavior only for users of `prop-types` package
              var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
              err.name = 'Invariant Violation';
              throw err;
            } else if ( typeof console !== 'undefined') {
              // Old behavior for people using React.PropTypes
              var cacheKey = componentName + ':' + propName;

              if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
              manualPropTypeWarningCount < 3) {
                printWarning$1('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
                manualPropTypeCallCache[cacheKey] = true;
                manualPropTypeWarningCount++;
              }
            }
          }

          if (props[propName] == null) {
            if (isRequired) {
              if (props[propName] === null) {
                return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
              }

              return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
            }

            return null;
          } else {
            return validate(props, propName, componentName, location, propFullName);
          }
        }

        var chainedCheckType = checkType.bind(null, false);
        chainedCheckType.isRequired = checkType.bind(null, true);
        return chainedCheckType;
      }

      function createPrimitiveTypeChecker(expectedType) {
        function validate(props, propName, componentName, location, propFullName, secret) {
          var propValue = props[propName];
          var propType = getPropType(propValue);

          if (propType !== expectedType) {
            // `propValue` being instance of, say, date/regexp, pass the 'object'
            // check, but we can offer a more precise error message here rather than
            // 'of type `object`'.
            var preciseType = getPreciseType(propValue);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
          }

          return null;
        }

        return createChainableTypeChecker(validate);
      }

      function createAnyTypeChecker() {
        return createChainableTypeChecker(emptyFunctionThatReturnsNull);
      }

      function createArrayOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== 'function') {
            return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
          }

          var propValue = props[propName];

          if (!Array.isArray(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
          }

          for (var i = 0; i < propValue.length; i++) {
            var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);

            if (error instanceof Error) {
              return error;
            }
          }

          return null;
        }

        return createChainableTypeChecker(validate);
      }

      function createElementTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];

          if (!isValidElement(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
          }

          return null;
        }

        return createChainableTypeChecker(validate);
      }

      function createElementTypeTypeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];

          if (!reactIs.isValidElementType(propValue)) {
            var propType = getPropType(propValue);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
          }

          return null;
        }

        return createChainableTypeChecker(validate);
      }

      function createInstanceTypeChecker(expectedClass) {
        function validate(props, propName, componentName, location, propFullName) {
          if (!(props[propName] instanceof expectedClass)) {
            var expectedClassName = expectedClass.name || ANONYMOUS;
            var actualClassName = getClassName(props[propName]);
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
          }

          return null;
        }

        return createChainableTypeChecker(validate);
      }

      function createEnumTypeChecker(expectedValues) {
        if (!Array.isArray(expectedValues)) {
          {
            if (arguments.length > 1) {
              printWarning$1('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
            } else {
              printWarning$1('Invalid argument supplied to oneOf, expected an array.');
            }
          }

          return emptyFunctionThatReturnsNull;
        }

        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];

          for (var i = 0; i < expectedValues.length; i++) {
            if (is(propValue, expectedValues[i])) {
              return null;
            }
          }

          var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
            var type = getPreciseType(value);

            if (type === 'symbol') {
              return String(value);
            }

            return value;
          });
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
        }

        return createChainableTypeChecker(validate);
      }

      function createObjectOfTypeChecker(typeChecker) {
        function validate(props, propName, componentName, location, propFullName) {
          if (typeof typeChecker !== 'function') {
            return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
          }

          var propValue = props[propName];
          var propType = getPropType(propValue);

          if (propType !== 'object') {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
          }

          for (var key in propValue) {
            if (has$1(propValue, key)) {
              var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

              if (error instanceof Error) {
                return error;
              }
            }
          }

          return null;
        }

        return createChainableTypeChecker(validate);
      }

      function createUnionTypeChecker(arrayOfTypeCheckers) {
        if (!Array.isArray(arrayOfTypeCheckers)) {
           printWarning$1('Invalid argument supplied to oneOfType, expected an instance of array.') ;
          return emptyFunctionThatReturnsNull;
        }

        for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
          var checker = arrayOfTypeCheckers[i];

          if (typeof checker !== 'function') {
            printWarning$1('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
            return emptyFunctionThatReturnsNull;
          }
        }

        function validate(props, propName, componentName, location, propFullName) {
          for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
            var checker = arrayOfTypeCheckers[i];

            if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
              return null;
            }
          }

          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
        }

        return createChainableTypeChecker(validate);
      }

      function createNodeChecker() {
        function validate(props, propName, componentName, location, propFullName) {
          if (!isNode(props[propName])) {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
          }

          return null;
        }

        return createChainableTypeChecker(validate);
      }

      function createShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);

          if (propType !== 'object') {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
          }

          for (var key in shapeTypes) {
            var checker = shapeTypes[key];

            if (!checker) {
              continue;
            }

            var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

            if (error) {
              return error;
            }
          }

          return null;
        }

        return createChainableTypeChecker(validate);
      }

      function createStrictShapeTypeChecker(shapeTypes) {
        function validate(props, propName, componentName, location, propFullName) {
          var propValue = props[propName];
          var propType = getPropType(propValue);

          if (propType !== 'object') {
            return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
          } // We need to check all keys in case some are required but missing from
          // props.


          var allKeys = objectAssign({}, props[propName], shapeTypes);

          for (var key in allKeys) {
            var checker = shapeTypes[key];

            if (!checker) {
              return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
            }

            var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);

            if (error) {
              return error;
            }
          }

          return null;
        }

        return createChainableTypeChecker(validate);
      }

      function isNode(propValue) {
        switch (typeof propValue) {
          case 'number':
          case 'string':
          case 'undefined':
            return true;

          case 'boolean':
            return !propValue;

          case 'object':
            if (Array.isArray(propValue)) {
              return propValue.every(isNode);
            }

            if (propValue === null || isValidElement(propValue)) {
              return true;
            }

            var iteratorFn = getIteratorFn(propValue);

            if (iteratorFn) {
              var iterator = iteratorFn.call(propValue);
              var step;

              if (iteratorFn !== propValue.entries) {
                while (!(step = iterator.next()).done) {
                  if (!isNode(step.value)) {
                    return false;
                  }
                }
              } else {
                // Iterator will provide entry [k,v] tuples rather than values.
                while (!(step = iterator.next()).done) {
                  var entry = step.value;

                  if (entry) {
                    if (!isNode(entry[1])) {
                      return false;
                    }
                  }
                }
              }
            } else {
              return false;
            }

            return true;

          default:
            return false;
        }
      }

      function isSymbol(propType, propValue) {
        // Native Symbol.
        if (propType === 'symbol') {
          return true;
        } // falsy value can't be a Symbol


        if (!propValue) {
          return false;
        } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


        if (propValue['@@toStringTag'] === 'Symbol') {
          return true;
        } // Fallback for non-spec compliant Symbols which are polyfilled.


        if (typeof Symbol === 'function' && propValue instanceof Symbol) {
          return true;
        }

        return false;
      } // Equivalent of `typeof` but with special handling for array and regexp.


      function getPropType(propValue) {
        var propType = typeof propValue;

        if (Array.isArray(propValue)) {
          return 'array';
        }

        if (propValue instanceof RegExp) {
          // Old webkits (at least until Android 4.0) return 'function' rather than
          // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
          // passes PropTypes.object.
          return 'object';
        }

        if (isSymbol(propType, propValue)) {
          return 'symbol';
        }

        return propType;
      } // This handles more types than `getPropType`. Only used for error messages.
      // See `createPrimitiveTypeChecker`.


      function getPreciseType(propValue) {
        if (typeof propValue === 'undefined' || propValue === null) {
          return '' + propValue;
        }

        var propType = getPropType(propValue);

        if (propType === 'object') {
          if (propValue instanceof Date) {
            return 'date';
          } else if (propValue instanceof RegExp) {
            return 'regexp';
          }
        }

        return propType;
      } // Returns a string that is postfixed to a warning about an invalid type.
      // For example, "undefined" or "of type array"


      function getPostfixForTypeWarning(value) {
        var type = getPreciseType(value);

        switch (type) {
          case 'array':
          case 'object':
            return 'an ' + type;

          case 'boolean':
          case 'date':
          case 'regexp':
            return 'a ' + type;

          default:
            return type;
        }
      } // Returns class name of the object, if any.


      function getClassName(propValue) {
        if (!propValue.constructor || !propValue.constructor.name) {
          return ANONYMOUS;
        }

        return propValue.constructor.name;
      }

      ReactPropTypes.checkPropTypes = checkPropTypes_1;
      ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
      ReactPropTypes.PropTypes = ReactPropTypes;
      return ReactPropTypes;
    };

    var propTypes = createCommonjsModule(function (module) {
    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    {
      var ReactIs = reactIs; // By explicitly using `prop-types` you are opting into new development behavior.
      // http://fb.me/prop-types-in-prod


      var throwOnDirectAccess = true;
      module.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
    }
    });

    /**
     * Track whether a component is current mounted. Generally less preferable than
     * properlly canceling effects so they don't run after a component is unmounted,
     * but helpful in cases where that isn't feasible, such as a `Promise` resolution.
     *
     * @returns a function that returns the current isMounted state of the component
     *
     * ```ts
     * const [data, setData] = useState(null)
     * const isMounted = useMounted()
     *
     * useEffect(() => {
     *   fetchdata().then((newData) => {
     *      if (isMounted()) {
     *        setData(newData);
     *      }
     *   })
     * })
     * ```
     */

    function useMounted() {
      var mounted = React.useRef(true);
      var isMounted = React.useRef(function () {
        return mounted.current;
      });
      React.useEffect(function () {
        return function () {
          mounted.current = false;
        };
      }, []);
      return isMounted.current;
    }

    /**
     * Returns a ref that is immediately updated with the new value
     *
     * @param value The Ref value
     * @category refs
     */

    function useUpdatedRef(value) {
      var valueRef = React.useRef(value);
      valueRef.current = value;
      return valueRef;
    }

    /**
     * Attach a callback that fires when a component unmounts
     *
     * @param fn Handler to run when the component unmounts
     * @category effects
     */

    function useWillUnmount(fn) {
      var onUnmount = useUpdatedRef(fn);
      React.useEffect(function () {
        return function () {
          return onUnmount.current();
        };
      }, []);
    }

    /**
     * Store the last of some value. Tracked via a `Ref` only updating it
     * after the component renders.
     *
     * Helpful if you need to compare a prop value to it's previous value during render.
     *
     * ```ts
     * function Component(props) {
     *   const lastProps = usePrevious(props)
     *
     *   if (lastProps.foo !== props.foo)
     *     resetValueFromProps(props.foo)
     * }
     * ```
     *
     * @param value the value to track
     */

    function usePrevious(value) {
      var ref = React.useRef(null);
      React.useEffect(function () {
        ref.current = value;
      });
      return ref.current;
    }

    /**
     * Creates a `Ref` whose value is updated in an effect, ensuring the most recent
     * value is the one rendered with. Generally only required for Concurrent mode usage
     * where previous work in `render()` may be discarded befor being used.
     *
     * This is safe to access in an event handler.
     *
     * @param value The `Ref` value
     */

    function useCommittedRef(value) {
      var ref = React.useRef(value);
      React.useEffect(function () {
        ref.current = value;
      }, [value]);
      return ref;
    }

    function useEventCallback(fn) {
      var ref = useCommittedRef(fn);
      return React.useCallback(function () {
        return ref.current && ref.current.apply(ref, arguments);
      }, [ref]);
    }

    /**
     * Checks if a given element has a CSS class.
     * 
     * @param element the element
     * @param className the CSS class name
     */
    function hasClass(element, className) {
      if (element.classList) return !!className && element.classList.contains(className);
      return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
    }

    /**
     * Adds a CSS class to a given element.
     * 
     * @param element the element
     * @param className the CSS class name
     */

    function addClass(element, className) {
      if (element.classList) element.classList.add(className);else if (!hasClass(element, className)) if (typeof element.className === 'string') element.className = element.className + " " + className;else element.setAttribute('class', (element.className && element.className.baseVal || '') + " " + className);
    }

    function replaceClassName(origClass, classToRemove) {
      return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
    }
    /**
     * Removes a CSS class from a given element.
     * 
     * @param element the element
     * @param className the CSS class name
     */


    function removeClass(element, className) {
      if (element.classList) {
        element.classList.remove(className);
      } else if (typeof element.className === 'string') {
        element.className = replaceClassName(element.className, className);
      } else {
        element.setAttribute('class', replaceClassName(element.className && element.className.baseVal || '', className));
      }
    }

    /**
     * Returns the owner window of a given element.
     * 
     * @param node the element
     */

    function ownerWindow(node) {
      var doc = ownerDocument(node);
      return doc && doc.defaultView || window;
    }

    /**
     * Returns one or all computed style properties of an element.
     * 
     * @param node the element
     * @param psuedoElement the style property
     */

    function getComputedStyle(node, psuedoElement) {
      return ownerWindow(node).getComputedStyle(node, psuedoElement);
    }

    var rUpper = /([A-Z])/g;
    function hyphenate(string) {
      return string.replace(rUpper, '-$1').toLowerCase();
    }

    /**
     * Copyright 2013-2014, Facebook, Inc.
     * All rights reserved.
     * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
     */
    var msPattern = /^ms-/;
    function hyphenateStyleName(string) {
      return hyphenate(string).replace(msPattern, '-ms-');
    }

    var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
    function isTransform(value) {
      return !!(value && supportedTransforms.test(value));
    }

    function style(node, property) {
      var css = '';
      var transforms = '';

      if (typeof property === 'string') {
        return node.style.getPropertyValue(hyphenateStyleName(property)) || getComputedStyle(node).getPropertyValue(hyphenateStyleName(property));
      }

      Object.keys(property).forEach(function (key) {
        var value = property[key];

        if (!value && value !== 0) {
          node.style.removeProperty(hyphenateStyleName(key));
        } else if (isTransform(key)) {
          transforms += key + "(" + value + ") ";
        } else {
          css += hyphenateStyleName(key) + ": " + value + ";";
        }
      });

      if (transforms) {
        css += "transform: " + transforms + ";";
      }

      node.style.cssText += ";" + css;
    }

    var size;
    function scrollbarSize(recalc) {
      if (!size && size !== 0 || recalc) {
        if (canUseDOM) {
          var scrollDiv = document.createElement('div');
          scrollDiv.style.position = 'absolute';
          scrollDiv.style.top = '-9999px';
          scrollDiv.style.width = '50px';
          scrollDiv.style.height = '50px';
          scrollDiv.style.overflow = 'scroll';
          document.body.appendChild(scrollDiv);
          size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
          document.body.removeChild(scrollDiv);
        }
      }

      return size;
    }

    function isDocument(element) {
      return 'nodeType' in element && element.nodeType === document.DOCUMENT_NODE;
    }

    function isWindow(node) {
      if ('window' in node && node.window === node) return node;
      if (isDocument(node)) return node.defaultView || false;
      return false;
    }

    function isBody(node) {
      return node && node.tagName.toLowerCase() === 'body';
    }

    function bodyIsOverflowing(node) {
      var doc = isWindow(node) ? ownerDocument() : ownerDocument(node);
      var win = isWindow(node) || doc.defaultView;
      return doc.body.clientWidth < win.innerWidth;
    }

    function isOverflowing(container) {
      var win = isWindow(container);
      return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
    }

    var BLACKLIST = ['template', 'script', 'style'];

    var isHidable = function isHidable(_ref) {
      var nodeType = _ref.nodeType,
          tagName = _ref.tagName;
      return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
    };

    var siblings = function siblings(container, exclude, cb) {
      [].forEach.call(container.children, function (node) {
        if (exclude.indexOf(node) === -1 && isHidable(node)) {
          cb(node);
        }
      });
    };

    function ariaHidden(hide, node) {
      if (!node) return;

      if (hide) {
        node.setAttribute('aria-hidden', 'true');
      } else {
        node.removeAttribute('aria-hidden');
      }
    }
    function hideSiblings(container, _ref2) {
      var dialog = _ref2.dialog,
          backdrop = _ref2.backdrop;
      siblings(container, [dialog, backdrop], function (node) {
        return ariaHidden(true, node);
      });
    }
    function showSiblings(container, _ref3) {
      var dialog = _ref3.dialog,
          backdrop = _ref3.backdrop;
      siblings(container, [dialog, backdrop], function (node) {
        return ariaHidden(false, node);
      });
    }

    function findIndexOf(arr, cb) {
      var idx = -1;
      arr.some(function (d, i) {
        if (cb(d, i)) {
          idx = i;
          return true;
        }

        return false;
      });
      return idx;
    }
    /**
     * Proper state management for containers and the modals in those containers.
     *
     * @internal Used by the Modal to ensure proper styling of containers.
     */


    var ModalManager = /*#__PURE__*/function () {
      function ModalManager(_temp) {
        var _ref = _temp === void 0 ? {} : _temp,
            _ref$hideSiblingNodes = _ref.hideSiblingNodes,
            hideSiblingNodes = _ref$hideSiblingNodes === void 0 ? true : _ref$hideSiblingNodes,
            _ref$handleContainerO = _ref.handleContainerOverflow,
            handleContainerOverflow = _ref$handleContainerO === void 0 ? true : _ref$handleContainerO;

        this.hideSiblingNodes = void 0;
        this.handleContainerOverflow = void 0;
        this.modals = void 0;
        this.containers = void 0;
        this.data = void 0;
        this.scrollbarSize = void 0;
        this.hideSiblingNodes = hideSiblingNodes;
        this.handleContainerOverflow = handleContainerOverflow;
        this.modals = [];
        this.containers = [];
        this.data = [];
        this.scrollbarSize = scrollbarSize();
      }

      var _proto = ModalManager.prototype;

      _proto.isContainerOverflowing = function isContainerOverflowing(modal) {
        var data = this.data[this.containerIndexFromModal(modal)];
        return data && data.overflowing;
      };

      _proto.containerIndexFromModal = function containerIndexFromModal(modal) {
        return findIndexOf(this.data, function (d) {
          return d.modals.indexOf(modal) !== -1;
        });
      };

      _proto.setContainerStyle = function setContainerStyle(containerState, container) {
        var style$1 = {
          overflow: 'hidden'
        }; // we are only interested in the actual `style` here
        // because we will override it

        containerState.style = {
          overflow: container.style.overflow,
          paddingRight: container.style.paddingRight
        };

        if (containerState.overflowing) {
          // use computed style, here to get the real padding
          // to add our scrollbar width
          style$1.paddingRight = parseInt(style(container, 'paddingRight') || '0', 10) + this.scrollbarSize + "px";
        }

        style(container, style$1);
      };

      _proto.removeContainerStyle = function removeContainerStyle(containerState, container) {
        Object.assign(container.style, containerState.style);
      };

      _proto.add = function add(modal, container, className) {
        var modalIdx = this.modals.indexOf(modal);
        var containerIdx = this.containers.indexOf(container);

        if (modalIdx !== -1) {
          return modalIdx;
        }

        modalIdx = this.modals.length;
        this.modals.push(modal);

        if (this.hideSiblingNodes) {
          hideSiblings(container, modal);
        }

        if (containerIdx !== -1) {
          this.data[containerIdx].modals.push(modal);
          return modalIdx;
        }

        var data = {
          modals: [modal],
          // right now only the first modal of a container will have its classes applied
          classes: className ? className.split(/\s+/) : [],
          overflowing: isOverflowing(container)
        };

        if (this.handleContainerOverflow) {
          this.setContainerStyle(data, container);
        }

        data.classes.forEach(addClass.bind(null, container));
        this.containers.push(container);
        this.data.push(data);
        return modalIdx;
      };

      _proto.remove = function remove(modal) {
        var modalIdx = this.modals.indexOf(modal);

        if (modalIdx === -1) {
          return;
        }

        var containerIdx = this.containerIndexFromModal(modal);
        var data = this.data[containerIdx];
        var container = this.containers[containerIdx];
        data.modals.splice(data.modals.indexOf(modal), 1);
        this.modals.splice(modalIdx, 1); // if that was the last modal in a container,
        // clean up the container

        if (data.modals.length === 0) {
          data.classes.forEach(removeClass.bind(null, container));

          if (this.handleContainerOverflow) {
            this.removeContainerStyle(data, container);
          }

          if (this.hideSiblingNodes) {
            showSiblings(container, modal);
          }

          this.containers.splice(containerIdx, 1);
          this.data.splice(containerIdx, 1);
        } else if (this.hideSiblingNodes) {
          // otherwise make sure the next top modal is visible to a SR
          var _data$modals = data.modals[data.modals.length - 1],
              backdrop = _data$modals.backdrop,
              dialog = _data$modals.dialog;
          ariaHidden(false, dialog);
          ariaHidden(false, backdrop);
        }
      };

      _proto.isTopModal = function isTopModal(modal) {
        return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
      };

      return ModalManager;
    }();

    var resolveContainerRef = function resolveContainerRef(ref) {
      var _ref;

      if (typeof document === 'undefined') return null;
      if (ref == null) return ownerDocument().body;
      if (typeof ref === 'function') ref = ref();
      if (ref && 'current' in ref) ref = ref.current;
      if ((_ref = ref) != null && _ref.nodeType) return ref || null;
      return null;
    };
    function useWaitForDOMRef(ref, onResolved) {
      var _useState = React.useState(function () {
        return resolveContainerRef(ref);
      }),
          resolvedRef = _useState[0],
          setRef = _useState[1];

      if (!resolvedRef) {
        var earlyRef = resolveContainerRef(ref);
        if (earlyRef) setRef(earlyRef);
      }

      React.useEffect(function () {
        if (onResolved && resolvedRef) {
          onResolved(resolvedRef);
        }
      }, [onResolved, resolvedRef]);
      React.useEffect(function () {
        var nextRef = resolveContainerRef(ref);

        if (nextRef !== resolvedRef) {
          setRef(nextRef);
        }
      }, [ref, resolvedRef]);
      return resolvedRef;
    }

    var manager;

    function getManager() {
      if (!manager) manager = new ModalManager();
      return manager;
    }

    function useModalManager(provided) {
      var modalManager = provided || getManager();
      var modal = React.useRef({
        dialog: null,
        backdrop: null
      });
      return Object.assign(modal.current, {
        add: function add(container, className) {
          return modalManager.add(modal.current, container, className);
        },
        remove: function remove() {
          return modalManager.remove(modal.current);
        },
        isTopModal: function isTopModal() {
          return modalManager.isTopModal(modal.current);
        },
        setDialogRef: React.useCallback(function (ref) {
          modal.current.dialog = ref;
        }, []),
        setBackdropRef: React.useCallback(function (ref) {
          modal.current.backdrop = ref;
        }, [])
      });
    }

    var Modal = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
      var _ref$show = _ref.show,
          show = _ref$show === void 0 ? false : _ref$show,
          _ref$role = _ref.role,
          role = _ref$role === void 0 ? 'dialog' : _ref$role,
          className = _ref.className,
          style = _ref.style,
          children = _ref.children,
          _ref$backdrop = _ref.backdrop,
          backdrop = _ref$backdrop === void 0 ? true : _ref$backdrop,
          _ref$keyboard = _ref.keyboard,
          keyboard = _ref$keyboard === void 0 ? true : _ref$keyboard,
          onBackdropClick = _ref.onBackdropClick,
          onEscapeKeyDown = _ref.onEscapeKeyDown,
          transition = _ref.transition,
          backdropTransition = _ref.backdropTransition,
          _ref$autoFocus = _ref.autoFocus,
          autoFocus = _ref$autoFocus === void 0 ? true : _ref$autoFocus,
          _ref$enforceFocus = _ref.enforceFocus,
          enforceFocus = _ref$enforceFocus === void 0 ? true : _ref$enforceFocus,
          _ref$restoreFocus = _ref.restoreFocus,
          restoreFocus = _ref$restoreFocus === void 0 ? true : _ref$restoreFocus,
          restoreFocusOptions = _ref.restoreFocusOptions,
          renderDialog = _ref.renderDialog,
          _ref$renderBackdrop = _ref.renderBackdrop,
          renderBackdrop = _ref$renderBackdrop === void 0 ? function (props) {
        return /*#__PURE__*/React__default['default'].createElement("div", props);
      } : _ref$renderBackdrop,
          providedManager = _ref.manager,
          containerRef = _ref.container,
          containerClassName = _ref.containerClassName,
          onShow = _ref.onShow,
          _ref$onHide = _ref.onHide,
          onHide = _ref$onHide === void 0 ? function () {} : _ref$onHide,
          onExit = _ref.onExit,
          onExited = _ref.onExited,
          onExiting = _ref.onExiting,
          onEnter = _ref.onEnter,
          onEntering = _ref.onEntering,
          onEntered = _ref.onEntered,
          rest = _objectWithoutPropertiesLoose(_ref, ["show", "role", "className", "style", "children", "backdrop", "keyboard", "onBackdropClick", "onEscapeKeyDown", "transition", "backdropTransition", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "renderDialog", "renderBackdrop", "manager", "container", "containerClassName", "onShow", "onHide", "onExit", "onExited", "onExiting", "onEnter", "onEntering", "onEntered"]);

      var container = useWaitForDOMRef(containerRef);
      var modal = useModalManager(providedManager);
      var isMounted = useMounted();
      var prevShow = usePrevious(show);

      var _useState = React.useState(!show),
          exited = _useState[0],
          setExited = _useState[1];

      var lastFocusRef = React.useRef(null);
      React.useImperativeHandle(ref, function () {
        return modal;
      }, [modal]);

      if (canUseDOM && !prevShow && show) {
        lastFocusRef.current = activeElement();
      }

      if (!transition && !show && !exited) {
        setExited(true);
      } else if (show && exited) {
        setExited(false);
      }

      var handleShow = useEventCallback(function () {
        modal.add(container, containerClassName);
        removeKeydownListenerRef.current = listen(document, 'keydown', handleDocumentKeyDown);
        removeFocusListenerRef.current = listen(document, 'focus', // the timeout is necessary b/c this will run before the new modal is mounted
        // and so steals focus from it
        function () {
          return setTimeout(handleEnforceFocus);
        }, true);

        if (onShow) {
          onShow();
        } // autofocus after onShow to not trigger a focus event for previous
        // modals before this one is shown.


        if (autoFocus) {
          var currentActiveElement = activeElement(document);

          if (modal.dialog && currentActiveElement && !contains(modal.dialog, currentActiveElement)) {
            lastFocusRef.current = currentActiveElement;
            modal.dialog.focus();
          }
        }
      });
      var handleHide = useEventCallback(function () {
        modal.remove();
        removeKeydownListenerRef.current == null ? void 0 : removeKeydownListenerRef.current();
        removeFocusListenerRef.current == null ? void 0 : removeFocusListenerRef.current();

        if (restoreFocus) {
          var _lastFocusRef$current; // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)


          (_lastFocusRef$current = lastFocusRef.current) == null ? void 0 : _lastFocusRef$current.focus == null ? void 0 : _lastFocusRef$current.focus(restoreFocusOptions);
          lastFocusRef.current = null;
        }
      }); // TODO: try and combine these effects: https://github.com/react-bootstrap/react-overlays/pull/794#discussion_r409954120
      // Show logic when:
      //  - show is `true` _and_ `container` has resolved

      React.useEffect(function () {
        if (!show || !container) return;
        handleShow();
      }, [show, container,
      /* should never change: */
      handleShow]); // Hide cleanup logic when:
      //  - `exited` switches to true
      //  - component unmounts;

      React.useEffect(function () {
        if (!exited) return;
        handleHide();
      }, [exited, handleHide]);
      useWillUnmount(function () {
        handleHide();
      }); // --------------------------------

      var handleEnforceFocus = useEventCallback(function () {
        if (!enforceFocus || !isMounted() || !modal.isTopModal()) {
          return;
        }

        var currentActiveElement = activeElement();

        if (modal.dialog && currentActiveElement && !contains(modal.dialog, currentActiveElement)) {
          modal.dialog.focus();
        }
      });
      var handleBackdropClick = useEventCallback(function (e) {
        if (e.target !== e.currentTarget) {
          return;
        }

        onBackdropClick == null ? void 0 : onBackdropClick(e);

        if (backdrop === true) {
          onHide();
        }
      });
      var handleDocumentKeyDown = useEventCallback(function (e) {
        if (keyboard && e.keyCode === 27 && modal.isTopModal()) {
          onEscapeKeyDown == null ? void 0 : onEscapeKeyDown(e);

          if (!e.defaultPrevented) {
            onHide();
          }
        }
      });
      var removeFocusListenerRef = React.useRef();
      var removeKeydownListenerRef = React.useRef();

      var handleHidden = function handleHidden() {
        setExited(true);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        onExited == null ? void 0 : onExited.apply(void 0, args);
      };

      var Transition = transition;

      if (!container || !(show || Transition && !exited)) {
        return null;
      }

      var dialogProps = _extends({
        role: role,
        ref: modal.setDialogRef,
        // apparently only works on the dialog role element
        'aria-modal': role === 'dialog' ? true : undefined
      }, rest, {
        style: style,
        className: className,
        tabIndex: -1
      });

      var dialog = renderDialog ? renderDialog(dialogProps) : /*#__PURE__*/React__default['default'].createElement("div", dialogProps, /*#__PURE__*/React__default['default'].cloneElement(children, {
        role: 'document'
      }));

      if (Transition) {
        dialog = /*#__PURE__*/React__default['default'].createElement(Transition, {
          appear: true,
          unmountOnExit: true,
          "in": !!show,
          onExit: onExit,
          onExiting: onExiting,
          onExited: handleHidden,
          onEnter: onEnter,
          onEntering: onEntering,
          onEntered: onEntered
        }, dialog);
      }

      var backdropElement = null;

      if (backdrop) {
        var BackdropTransition = backdropTransition;
        backdropElement = renderBackdrop({
          ref: modal.setBackdropRef,
          onClick: handleBackdropClick
        });

        if (BackdropTransition) {
          backdropElement = /*#__PURE__*/React__default['default'].createElement(BackdropTransition, {
            appear: true,
            "in": !!show
          }, backdropElement);
        }
      }

      return /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, /*#__PURE__*/ReactDOM__default['default'].createPortal( /*#__PURE__*/React__default['default'].createElement(React__default['default'].Fragment, null, backdropElement, dialog), container));
    });
    var propTypes$1 = {
      /**
       * Set the visibility of the Modal
       */
      show: propTypes.bool,

      /**
       * A DOM element, a `ref` to an element, or function that returns either. The Modal is appended to it's `container` element.
       *
       * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
       * page content can be placed behind a virtual backdrop as well as a visual one.
       */
      container: propTypes.any,

      /**
       * A callback fired when the Modal is opening.
       */
      onShow: propTypes.func,

      /**
       * A callback fired when either the backdrop is clicked, or the escape key is pressed.
       *
       * The `onHide` callback only signals intent from the Modal,
       * you must actually set the `show` prop to `false` for the Modal to close.
       */
      onHide: propTypes.func,

      /**
       * Include a backdrop component.
       */
      backdrop: propTypes.oneOfType([propTypes.bool, propTypes.oneOf(['static'])]),

      /**
       * A function that returns the dialog component. Useful for custom
       * rendering. **Note:** the component should make sure to apply the provided ref.
       *
       * ```js static
       * renderDialog={props => <MyDialog {...props} />}
       * ```
       */
      renderDialog: propTypes.func,

      /**
       * A function that returns a backdrop component. Useful for custom
       * backdrop rendering.
       *
       * ```js
       *  renderBackdrop={props => <MyBackdrop {...props} />}
       * ```
       */
      renderBackdrop: propTypes.func,

      /**
       * A callback fired when the escape key, if specified in `keyboard`, is pressed.
       *
       * If preventDefault() is called on the keyboard event, closing the modal will be cancelled.
       */
      onEscapeKeyDown: propTypes.func,

      /**
       * A callback fired when the backdrop, if specified, is clicked.
       */
      onBackdropClick: propTypes.func,

      /**
       * A css class or set of classes applied to the modal container when the modal is open,
       * and removed when it is closed.
       */
      containerClassName: propTypes.string,

      /**
       * Close the modal when escape key is pressed
       */
      keyboard: propTypes.bool,

      /**
       * A `react-transition-group@2.0.0` `<Transition/>` component used
       * to control animations for the dialog component.
       */
      transition: propTypes.elementType,

      /**
       * A `react-transition-group@2.0.0` `<Transition/>` component used
       * to control animations for the backdrop components.
       */
      backdropTransition: propTypes.elementType,

      /**
       * When `true` The modal will automatically shift focus to itself when it opens, and
       * replace it to the last focused element when it closes. This also
       * works correctly with any Modal children that have the `autoFocus` prop.
       *
       * Generally this should never be set to `false` as it makes the Modal less
       * accessible to assistive technologies, like screen readers.
       */
      autoFocus: propTypes.bool,

      /**
       * When `true` The modal will prevent focus from leaving the Modal while open.
       *
       * Generally this should never be set to `false` as it makes the Modal less
       * accessible to assistive technologies, like screen readers.
       */
      enforceFocus: propTypes.bool,

      /**
       * When `true` The modal will restore focus to previously focused element once
       * modal is hidden
       */
      restoreFocus: propTypes.bool,

      /**
       * Options passed to focus function when `restoreFocus` is set to `true`
       *
       * @link  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Parameters
       */
      restoreFocusOptions: propTypes.shape({
        preventScroll: propTypes.bool
      }),

      /**
       * Callback fired before the Modal transitions in
       */
      onEnter: propTypes.func,

      /**
       * Callback fired as the Modal begins to transition in
       */
      onEntering: propTypes.func,

      /**
       * Callback fired after the Modal finishes transitioning in
       */
      onEntered: propTypes.func,

      /**
       * Callback fired right before the Modal transitions out
       */
      onExit: propTypes.func,

      /**
       * Callback fired as the Modal begins to transition out
       */
      onExiting: propTypes.func,

      /**
       * Callback fired after the Modal finishes transitioning out
       */
      onExited: propTypes.func,

      /**
       * A ModalManager instance used to track and manage the state of open
       * Modals. Useful when customizing how modals interact within a container
       */
      manager: propTypes.instanceOf(ModalManager)
    };
    Modal.displayName = 'Modal';
    Modal.propTypes = propTypes$1;
    var Modal$1 = Object.assign(Modal, {
      Manager: ModalManager
    });

    var closeIconSvg = "data:image/svg+xml,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M18.2222%2016.0003L26.5397%207.6828C27.1541%207.06838%2027.1541%206.07524%2026.5397%205.46082C25.9253%204.84639%2024.9321%204.84639%2024.3177%205.46082L16.0002%2013.7783L7.68279%205.46082C7.06837%204.84639%206.07524%204.84639%205.46082%205.46082C4.84639%206.07524%204.84639%207.06838%205.46082%207.6828L13.7783%2016.0003L5.46082%2024.3178C4.84639%2024.9323%204.84639%2025.9254%205.46082%2026.5398C5.76724%2026.8463%206.16952%2027.0003%206.5718%2027.0003C6.97408%2027.0003%207.37636%2026.8463%207.68279%2026.5398L16.0002%2018.2223L24.3177%2026.5398C24.6241%2026.8463%2025.0264%2027.0003%2025.4287%2027.0003C25.831%2027.0003%2026.2333%2026.8463%2026.5397%2026.5398C27.1541%2025.9254%2027.1541%2024.9323%2026.5397%2024.3178L18.2222%2016.0003Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E";

    /**
     * The `onClick` here is provided by the `onHide` from the Modal props. But unfortunately it only works
     * for the actual backdrop and not for other elements due to a `e.target !== e.currentTarget` check in
     * the library. Therefore, we extend it with an additional `onClose` prop for our close button.
     */
    function BackdropWithClose({ onClose, ...restProps }) {
        return (React.createElement("div", Object.assign({ className: "mx-image-viewer-lightbox-backdrop" }, restProps),
            React.createElement("button", { className: classnames("btn btn-image btn-icon close-button"), onClick: onClose },
                React.createElement("img", { src: closeIconSvg, className: "removeIcon", alt: "Close icon for the full screen image lightbox" }))));
    }
    function Lightbox({ isOpen, onClose, children }) {
        const renderBackdropWithClose = React.useCallback((props) => React.createElement(BackdropWithClose, Object.assign({ onClose: onClose }, props)), [onClose]);
        // This is to prevent on click from containers when clicking on the backdrop.
        const preventBackdropEventPropagation = React.useCallback(event => {
            event.stopPropagation();
        }, []);
        return (React.createElement(Modal$1, { show: isOpen, onHide: onClose, renderBackdrop: renderBackdropWithClose, onBackdropClick: preventBackdropEventPropagation, className: "mx-image-viewer-lightbox" },
            React.createElement("div", null, children)));
    }

    function processImageLink(imageLink, displayAs) {
        if (!imageLink || displayAs === "fullImage") {
            return imageLink;
        }
        const url = new URL(imageLink);
        url.searchParams.append("thumb", "true");
        return url.href;
    }
    const ImageViewer = ({ class: className, style, widthUnit, width, heightUnit, height, iconSize, responsive, onClickType, onClick, type, image, altText, displayAs, previewMode }) => {
        const { lightboxIsOpen, openLightbox, closeLightbox } = useLightboxState();
        const onCloseLightbox = React.useCallback(event => {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            closeLightbox();
        }, [closeLightbox]);
        const onImageClick = React.useCallback(event => {
            event.stopPropagation();
            if (onClickType === "action") {
                onClick === null || onClick === void 0 ? void 0 : onClick();
            }
            else if (onClickType === "enlarge") {
                openLightbox();
            }
        }, [onClick, onClickType, openLightbox]);
        const hasClickHandler = (onClickType === "action" && onClick) || onClickType === "enlarge";
        const sharedContentProps = {
            style,
            onClick: hasClickHandler ? onImageClick : undefined,
            altText
        };
        const content = type === "image" ? (React.createElement(ImageViewerUi.Image, Object.assign({ image: processImageLink(image, displayAs), height: height, heightUnit: heightUnit, width: width, widthUnit: widthUnit }, sharedContentProps))) : (React.createElement(ImageViewerUi.Glyphicon, Object.assign({ icon: image, size: iconSize }, sharedContentProps)));
        return (React.createElement(ImageViewerUi.Wrapper, { className: className, responsive: responsive, hasImage: image !== undefined && image.length > 0 },
            content,
            !previewMode && lightboxIsOpen && (React.createElement(Lightbox, { isOpen: lightboxIsOpen, onClose: onCloseLightbox }, type === "image" ? React.cloneElement(content, { image, onClick: undefined }) : content))));
    };

    function getImageProps({ datasource, imageIcon, imageObject, imageUrl }) {
        var _a, _b;
        const fallback = {
            type: "image",
            image: undefined
        };
        switch (datasource) {
            case "image":
                return {
                    type: "image",
                    image: (imageObject === null || imageObject === void 0 ? void 0 : imageObject.status) === "available" /* Available */ ? imageObject.value.uri : undefined
                };
            case "imageUrl":
                return {
                    type: "image",
                    image: (imageUrl === null || imageUrl === void 0 ? void 0 : imageUrl.status) === "available" /* Available */ ? imageUrl.value : undefined
                };
            case "icon": {
                if ((imageIcon === null || imageIcon === void 0 ? void 0 : imageIcon.status) === "available" /* Available */) {
                    if (((_a = imageIcon.value) === null || _a === void 0 ? void 0 : _a.type) === "glyph") {
                        return {
                            type: "icon",
                            image: imageIcon.value.iconClass
                        };
                    }
                    if (((_b = imageIcon.value) === null || _b === void 0 ? void 0 : _b.type) === "image") {
                        return {
                            type: "image",
                            image: imageIcon.value.iconUrl
                        };
                    }
                }
                return fallback;
            }
            default:
                return fallback;
        }
    }
    const ImageViewer$1 = props => {
        var _a;
        const onClick = React.useCallback(() => { var _a; return (_a = props.onClick) === null || _a === void 0 ? void 0 : _a.execute(); }, [props.onClick]);
        const { type, image } = getImageProps(props);
        const altText = ((_a = props.alternativeText) === null || _a === void 0 ? void 0 : _a.status) === "available" /* Available */ ? props.alternativeText.value : undefined;
        return (React.createElement(ImageViewer, { class: props.class, style: props.style, widthUnit: props.widthUnit, width: props.width, heightUnit: props.heightUnit, height: props.height, iconSize: props.iconSize, responsive: props.responsive, onClickType: props.onClickType, onClick: props.onClick ? onClick : undefined, type: type, image: image, altText: altText, displayAs: props.displayAs }));
    };

    exports.ImageViewer = ImageViewer$1;

    Object.defineProperty(exports, '__esModule', { value: true });

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2VWaWV3ZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9saWdodGJveFN0YXRlLnRzeCIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvSW1hZ2VWaWV3ZXIvdWkudHN4IiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9leHRlbmRzLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL25vZGVfbW9kdWxlcy9kb20taGVscGVycy9lc20vb3duZXJEb2N1bWVudC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1vdmVybGF5cy9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvZXNtL2FjdGl2ZUVsZW1lbnQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtb3ZlcmxheXMvbm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL2VzbS9jb250YWlucy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1vdmVybGF5cy9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvZXNtL2NhblVzZURPTS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1vdmVybGF5cy9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvZXNtL2FkZEV2ZW50TGlzdGVuZXIuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtb3ZlcmxheXMvbm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL2VzbS9yZW1vdmVFdmVudExpc3RlbmVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL25vZGVfbW9kdWxlcy9kb20taGVscGVycy9lc20vbGlzdGVuLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL25vZGVfbW9kdWxlcy9yZWFjdC1pcy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L2hvb2tzL2VzbS91c2VNb3VudGVkLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L2hvb2tzL2VzbS91c2VVcGRhdGVkUmVmLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0ByZXN0YXJ0L2hvb2tzL2VzbS91c2VXaWxsVW5tb3VudC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AcmVzdGFydC9ob29rcy9lc20vdXNlUHJldmlvdXMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvQHJlc3RhcnQvaG9va3MvZXNtL3VzZUNvbW1pdHRlZFJlZi5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AcmVzdGFydC9ob29rcy9lc20vdXNlRXZlbnRDYWxsYmFjay5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1vdmVybGF5cy9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvZXNtL2hhc0NsYXNzLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL25vZGVfbW9kdWxlcy9kb20taGVscGVycy9lc20vYWRkQ2xhc3MuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtb3ZlcmxheXMvbm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL2VzbS9yZW1vdmVDbGFzcy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1vdmVybGF5cy9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvZXNtL293bmVyV2luZG93LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL25vZGVfbW9kdWxlcy9kb20taGVscGVycy9lc20vZ2V0Q29tcHV0ZWRTdHlsZS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1vdmVybGF5cy9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvZXNtL2h5cGhlbmF0ZS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1vdmVybGF5cy9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvZXNtL2h5cGhlbmF0ZVN0eWxlLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL25vZGVfbW9kdWxlcy9kb20taGVscGVycy9lc20vaXNUcmFuc2Zvcm0uanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtb3ZlcmxheXMvbm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL2VzbS9jc3MuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtb3ZlcmxheXMvbm9kZV9tb2R1bGVzL2RvbS1oZWxwZXJzL2VzbS9zY3JvbGxiYXJTaXplLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL25vZGVfbW9kdWxlcy9kb20taGVscGVycy9lc20vaXNEb2N1bWVudC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9yZWFjdC1vdmVybGF5cy9ub2RlX21vZHVsZXMvZG9tLWhlbHBlcnMvZXNtL2lzV2luZG93LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL2VzbS9pc092ZXJmbG93aW5nLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL2VzbS9tYW5hZ2VBcmlhSGlkZGVuLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LW92ZXJsYXlzL2VzbS9Nb2RhbE1hbmFnZXIuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtb3ZlcmxheXMvZXNtL3VzZVdhaXRGb3JET01SZWYuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3Qtb3ZlcmxheXMvZXNtL01vZGFsLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2Fzc2V0cy9pYzI0LWNsb3NlLnN2ZyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0xpZ2h0Ym94LnRzeCIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0ltYWdlVmlld2VyL2luZGV4LnRzeCIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9JbWFnZVZpZXdlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmludGVyZmFjZSBMaWdodGJveFN0YXRlIHtcbiAgICBsaWdodGJveElzT3BlbjogYm9vbGVhbjtcbiAgICBvcGVuTGlnaHRib3g6ICgpID0+IHZvaWQ7XG4gICAgY2xvc2VMaWdodGJveDogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IHVzZUxpZ2h0Ym94U3RhdGUgPSAoKTogTGlnaHRib3hTdGF0ZSA9PiB7XG4gICAgY29uc3QgW2xpZ2h0Ym94SXNPcGVuLCBzZXRMaWdodGJveElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgICBjb25zdCBvcGVuTGlnaHRib3ggPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHNldExpZ2h0Ym94SXNPcGVuKHRydWUpO1xuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IGNsb3NlTGlnaHRib3ggPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIHNldExpZ2h0Ym94SXNPcGVuKGZhbHNlKTtcbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4geyBsaWdodGJveElzT3Blbiwgb3BlbkxpZ2h0Ym94LCBjbG9zZUxpZ2h0Ym94IH07XG59O1xuIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNyBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSAmJiBhcmcubGVuZ3RoKSB7XG5cdFx0XHRcdHZhciBpbm5lciA9IGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKTtcblx0XHRcdFx0aWYgKGlubmVyKSB7XG5cdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGlubmVyKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0Y2xhc3NOYW1lcy5kZWZhdWx0ID0gY2xhc3NOYW1lcztcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgQ1NTUHJvcGVydGllcywgSFRNTEF0dHJpYnV0ZXMsIFJlYWN0RWxlbWVudCwgUmVhY3RFdmVudEhhbmRsZXIgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgeyBIZWlnaHRVbml0RW51bSwgV2lkdGhVbml0RW51bSB9IGZyb20gXCIuLi8uLi8uLi90eXBpbmdzL0ltYWdlVmlld2VyUHJvcHNcIjtcbmltcG9ydCB7IExpZ2h0Ym94UHJvcHMgfSBmcm9tIFwiLi4vTGlnaHRib3hcIjtcblxuaW1wb3J0IFwiLi4vLi4vdWkvSW1hZ2VWaWV3ZXIuc2Nzc1wiO1xuXG5mdW5jdGlvbiBnZXRTdHlsZSh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLCB0eXBlOiBXaWR0aFVuaXRFbnVtIHwgSGVpZ2h0VW5pdEVudW0pOiBudW1iZXIgfCBzdHJpbmcge1xuICAgIC8vIHdoZW4gdHlwZSBpcyBhdXRvIGRlZmF1bHQgYnJvd3NlciBzdHlsZXMgYXBwbGllc1xuICAgIGlmICh0eXBlID09PSBcInBpeGVsc1wiKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwicGVyY2VudGFnZVwiKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSArIFwiJVwiO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiO1xufVxuZXhwb3J0IGludGVyZmFjZSBJbWFnZVZpZXdlcldyYXBwZXJQcm9wcyB7XG4gICAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICAgIHJlc3BvbnNpdmU6IGJvb2xlYW47XG4gICAgaGFzSW1hZ2U6IGJvb2xlYW47XG4gICAgY2hpbGRyZW46XG4gICAgICAgIHwgUmVhY3RFbGVtZW50PEltYWdlVmlld2VyR2x5cGhpY29uIHwgSW1hZ2VWaWV3ZXJJbWFnZT5cbiAgICAgICAgfCBbUmVhY3RFbGVtZW50PEltYWdlVmlld2VyR2x5cGhpY29uIHwgSW1hZ2VWaWV3ZXJJbWFnZT4sIFJlYWN0RWxlbWVudDxMaWdodGJveFByb3BzPiB8IGZhbHNlXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbWFnZVZpZXdlckNvbnRlbnRQcm9wcyB7XG4gICAgc3R5bGU/OiBDU1NQcm9wZXJ0aWVzO1xuICAgIG9uQ2xpY2s/OiBSZWFjdEV2ZW50SGFuZGxlcjxIVE1MRWxlbWVudD47XG4gICAgYWx0VGV4dD86IHN0cmluZztcbn1cblxuZnVuY3Rpb24gV3JhcHBlcihwcm9wczogSW1hZ2VWaWV3ZXJXcmFwcGVyUHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICBcIm14LWltYWdlLXZpZXdlclwiLFxuICAgICAgICAgICAgICAgIHsgXCJteC1pbWFnZS12aWV3ZXItcmVzcG9uc2l2ZVwiOiBwcm9wcy5yZXNwb25zaXZlIH0sXG4gICAgICAgICAgICAgICAgcHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICAgICAgICAgIHsgaGlkZGVuOiAhcHJvcHMuaGFzSW1hZ2UgfVxuICAgICAgICAgICAgKX1cbiAgICAgICAgPlxuICAgICAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlVmlld2VyR2x5cGhpY29uIGV4dGVuZHMgSW1hZ2VWaWV3ZXJDb250ZW50UHJvcHMge1xuICAgIGljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBzaXplOiBudW1iZXI7XG59XG5cbmZ1bmN0aW9uIEdseXBoaWNvbihwcm9wczogSW1hZ2VWaWV3ZXJHbHlwaGljb24pOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IGFjY2Vzc2liaWxpdHlQcm9wcyA9IHByb3BzLmFsdFRleHRcbiAgICAgICAgPyB7XG4gICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBwcm9wcy5hbHRUZXh0LFxuICAgICAgICAgICAgICByb2xlOiBcImltZ1wiXG4gICAgICAgICAgfVxuICAgICAgICA6IHt9O1xuXG4gICAgY29uc3Qgb25DbGlja1Byb3BzID0gZ2V0SW1hZ2VDb250ZW50T25DbGlja1Byb3BzKHByb3BzLm9uQ2xpY2spO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImdseXBoaWNvblwiLCBwcm9wcy5pY29uKX1cbiAgICAgICAgICAgIHN0eWxlPXt7IC4uLnByb3BzLnN0eWxlLCBmb250U2l6ZTogYCR7cHJvcHMuc2l6ZX1weGAgfX1cbiAgICAgICAgICAgIHsuLi5hY2Nlc3NpYmlsaXR5UHJvcHN9XG4gICAgICAgICAgICB7Li4ub25DbGlja1Byb3BzfVxuICAgICAgICAvPlxuICAgICk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VWaWV3ZXJJbWFnZSBleHRlbmRzIEltYWdlVmlld2VyQ29udGVudFByb3BzIHtcbiAgICBpbWFnZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGhlaWdodFVuaXQ6IEhlaWdodFVuaXRFbnVtO1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgd2lkdGhVbml0OiBXaWR0aFVuaXRFbnVtO1xufVxuXG5mdW5jdGlvbiBJbWFnZShwcm9wczogSW1hZ2VWaWV3ZXJJbWFnZSk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3Qgb25DbGlja1Byb3BzID0gZ2V0SW1hZ2VDb250ZW50T25DbGlja1Byb3BzKHByb3BzLm9uQ2xpY2spO1xuICAgIHJldHVybiAoXG4gICAgICAgIDxpbWdcbiAgICAgICAgICAgIHNyYz17cHJvcHMuaW1hZ2V9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIC4uLnByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICAgIGhlaWdodDogZ2V0U3R5bGUocHJvcHMuaGVpZ2h0LCBwcm9wcy5oZWlnaHRVbml0KSxcbiAgICAgICAgICAgICAgICB3aWR0aDogZ2V0U3R5bGUocHJvcHMud2lkdGgsIHByb3BzLndpZHRoVW5pdClcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBhbHQ9e3Byb3BzLmFsdFRleHR9XG4gICAgICAgICAgICB7Li4ub25DbGlja1Byb3BzfVxuICAgICAgICAvPlxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGdldEltYWdlQ29udGVudE9uQ2xpY2tQcm9wcyhvbkNsaWNrOiBJbWFnZVZpZXdlckNvbnRlbnRQcm9wc1tcIm9uQ2xpY2tcIl0pOiBIVE1MQXR0cmlidXRlczxIVE1MRWxlbWVudD4ge1xuICAgIGlmICghb25DbGljaykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIG9uQ2xpY2ssXG4gICAgICAgIHJvbGU6IFwiYnV0dG9uXCIsXG4gICAgICAgIHRhYkluZGV4OiAwLFxuICAgICAgICBvbktleURvd246IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgb25DbGljayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5leHBvcnQgY29uc3QgSW1hZ2VWaWV3ZXJVaSA9IHtcbiAgICBXcmFwcGVyLFxuICAgIEdseXBoaWNvbixcbiAgICBJbWFnZVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9leHRlbmRzKCkge1xuICBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgcmV0dXJuIF9leHRlbmRzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCkge1xuICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7fTtcbiAgdmFyIHRhcmdldCA9IHt9O1xuICB2YXIgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gIHZhciBrZXksIGk7XG5cbiAgZm9yIChpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59IiwiLyoqXG4gKiBSZXR1cm5zIHRoZSBvd25lciBkb2N1bWVudCBvZiBhIGdpdmVuIGVsZW1lbnQuXG4gKiBcbiAqIEBwYXJhbSBub2RlIHRoZSBlbGVtZW50XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG93bmVyRG9jdW1lbnQobm9kZSkge1xuICByZXR1cm4gbm9kZSAmJiBub2RlLm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG59IiwiaW1wb3J0IG93bmVyRG9jdW1lbnQgZnJvbSAnLi9vd25lckRvY3VtZW50Jztcbi8qKlxuICogUmV0dXJucyB0aGUgYWN0aXZlbHkgZm9jdXNlZCBlbGVtZW50IHNhZmVseS5cbiAqXG4gKiBAcGFyYW0gZG9jIHRoZSBkb2N1bWVudCB0byBjaGVja1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFjdGl2ZUVsZW1lbnQoZG9jKSB7XG4gIGlmIChkb2MgPT09IHZvaWQgMCkge1xuICAgIGRvYyA9IG93bmVyRG9jdW1lbnQoKTtcbiAgfVxuXG4gIC8vIFN1cHBvcnQ6IElFIDkgb25seVxuICAvLyBJRTkgdGhyb3dzIGFuIFwiVW5zcGVjaWZpZWQgZXJyb3JcIiBhY2Nlc3NpbmcgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBmcm9tIGFuIDxpZnJhbWU+XG4gIHRyeSB7XG4gICAgdmFyIGFjdGl2ZSA9IGRvYy5hY3RpdmVFbGVtZW50OyAvLyBJRTExIHJldHVybnMgYSBzZWVtaW5nbHkgZW1wdHkgb2JqZWN0IGluIHNvbWUgY2FzZXMgd2hlbiBhY2Nlc3NpbmdcbiAgICAvLyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGZyb20gYW4gPGlmcmFtZT5cblxuICAgIGlmICghYWN0aXZlIHx8ICFhY3RpdmUubm9kZU5hbWUpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBhY3RpdmU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvKiBpZSB0aHJvd3MgaWYgbm8gYWN0aXZlIGVsZW1lbnQgKi9cbiAgICByZXR1cm4gZG9jLmJvZHk7XG4gIH1cbn0iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlLCBuby1jb25kLWFzc2lnbiAqL1xuXG4vKipcbiAqIENoZWNrcyBpZiBhbiBlbGVtZW50IGNvbnRhaW5zIGFub3RoZXIgZ2l2ZW4gZWxlbWVudC5cbiAqIFxuICogQHBhcmFtIGNvbnRleHQgdGhlIGNvbnRleHQgZWxlbWVudFxuICogQHBhcmFtIG5vZGUgdGhlIGVsZW1lbnQgdG8gY2hlY2tcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udGFpbnMoY29udGV4dCwgbm9kZSkge1xuICAvLyBIVE1MIERPTSBhbmQgU1ZHIERPTSBtYXkgaGF2ZSBkaWZmZXJlbnQgc3VwcG9ydCBsZXZlbHMsXG4gIC8vIHNvIHdlIG5lZWQgdG8gY2hlY2sgb24gY29udGV4dCBpbnN0ZWFkIG9mIGEgZG9jdW1lbnQgcm9vdCBlbGVtZW50LlxuICBpZiAoY29udGV4dC5jb250YWlucykgcmV0dXJuIGNvbnRleHQuY29udGFpbnMobm9kZSk7XG4gIGlmIChjb250ZXh0LmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKSByZXR1cm4gY29udGV4dCA9PT0gbm9kZSB8fCAhIShjb250ZXh0LmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKG5vZGUpICYgMTYpO1xufSIsImV4cG9ydCBkZWZhdWx0ICEhKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5kb2N1bWVudCAmJiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7IiwiLyogZXNsaW50LWRpc2FibGUgbm8tcmV0dXJuLWFzc2lnbiAqL1xuaW1wb3J0IGNhblVzZURPTSBmcm9tICcuL2NhblVzZURPTSc7XG5leHBvcnQgdmFyIG9wdGlvbnNTdXBwb3J0ZWQgPSBmYWxzZTtcbmV4cG9ydCB2YXIgb25jZVN1cHBvcnRlZCA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBnZXQgcGFzc2l2ZSgpIHtcbiAgICAgIHJldHVybiBvcHRpb25zU3VwcG9ydGVkID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgZ2V0IG9uY2UoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbXVsdGktYXNzaWduXG4gICAgICByZXR1cm4gb25jZVN1cHBvcnRlZCA9IG9wdGlvbnNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgIH1cblxuICB9O1xuXG4gIGlmIChjYW5Vc2VET00pIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0ZXN0Jywgb3B0aW9ucywgdHJ1ZSk7XG4gIH1cbn0gY2F0Y2ggKGUpIHtcbiAgLyogKi9cbn1cblxuLyoqXG4gKiBBbiBgYWRkRXZlbnRMaXN0ZW5lcmAgcG9ueWZpbGwsIHN1cHBvcnRzIHRoZSBgb25jZWAgb3B0aW9uXG4gKiBcbiAqIEBwYXJhbSBub2RlIHRoZSBlbGVtZW50XG4gKiBAcGFyYW0gZXZlbnROYW1lIHRoZSBldmVudCBuYW1lXG4gKiBAcGFyYW0gaGFuZGxlIHRoZSBoYW5kbGVyXG4gKiBAcGFyYW0gb3B0aW9ucyBldmVudCBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIobm9kZSwgZXZlbnROYW1lLCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zICE9PSAnYm9vbGVhbicgJiYgIW9uY2VTdXBwb3J0ZWQpIHtcbiAgICB2YXIgb25jZSA9IG9wdGlvbnMub25jZSxcbiAgICAgICAgY2FwdHVyZSA9IG9wdGlvbnMuY2FwdHVyZTtcbiAgICB2YXIgd3JhcHBlZEhhbmRsZXIgPSBoYW5kbGVyO1xuXG4gICAgaWYgKCFvbmNlU3VwcG9ydGVkICYmIG9uY2UpIHtcbiAgICAgIHdyYXBwZWRIYW5kbGVyID0gaGFuZGxlci5fX29uY2UgfHwgZnVuY3Rpb24gb25jZUhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb25jZUhhbmRsZXIsIGNhcHR1cmUpO1xuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgfTtcblxuICAgICAgaGFuZGxlci5fX29uY2UgPSB3cmFwcGVkSGFuZGxlcjtcbiAgICB9XG5cbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB3cmFwcGVkSGFuZGxlciwgb3B0aW9uc1N1cHBvcnRlZCA/IG9wdGlvbnMgOiBjYXB0dXJlKTtcbiAgfVxuXG4gIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhZGRFdmVudExpc3RlbmVyOyIsIi8qKlxuICogQSBgcmVtb3ZlRXZlbnRMaXN0ZW5lcmAgcG9ueWZpbGxcbiAqIFxuICogQHBhcmFtIG5vZGUgdGhlIGVsZW1lbnRcbiAqIEBwYXJhbSBldmVudE5hbWUgdGhlIGV2ZW50IG5hbWVcbiAqIEBwYXJhbSBoYW5kbGUgdGhlIGhhbmRsZXJcbiAqIEBwYXJhbSBvcHRpb25zIGV2ZW50IG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihub2RlLCBldmVudE5hbWUsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgdmFyIGNhcHR1cmUgPSBvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zICE9PSAnYm9vbGVhbicgPyBvcHRpb25zLmNhcHR1cmUgOiBvcHRpb25zO1xuICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyLCBjYXB0dXJlKTtcblxuICBpZiAoaGFuZGxlci5fX29uY2UpIHtcbiAgICBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyLl9fb25jZSwgY2FwdHVyZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgcmVtb3ZlRXZlbnRMaXN0ZW5lcjsiLCJpbXBvcnQgYWRkRXZlbnRMaXN0ZW5lciBmcm9tICcuL2FkZEV2ZW50TGlzdGVuZXInO1xuaW1wb3J0IHJlbW92ZUV2ZW50TGlzdGVuZXIgZnJvbSAnLi9yZW1vdmVFdmVudExpc3RlbmVyJztcblxuZnVuY3Rpb24gbGlzdGVuKG5vZGUsIGV2ZW50TmFtZSwgaGFuZGxlciwgb3B0aW9ucykge1xuICBhZGRFdmVudExpc3RlbmVyKG5vZGUsIGV2ZW50TmFtZSwgaGFuZGxlciwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihub2RlLCBldmVudE5hbWUsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0ZW47IiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi4xMy4xXG4gKiByZWFjdC1pcy5kZXZlbG9wbWVudC5qc1xuICpcbiAqIENvcHlyaWdodCAoYykgRmFjZWJvb2ssIEluYy4gYW5kIGl0cyBhZmZpbGlhdGVzLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG52YXIgUkVBQ1RfUE9SVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wb3J0YWwnKSA6IDB4ZWFjYTtcbnZhciBSRUFDVF9GUkFHTUVOVF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnJhZ21lbnQnKSA6IDB4ZWFjYjtcbnZhciBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3RyaWN0X21vZGUnKSA6IDB4ZWFjYztcbnZhciBSRUFDVF9QUk9GSUxFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvZmlsZXInKSA6IDB4ZWFkMjtcbnZhciBSRUFDVF9QUk9WSURFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucHJvdmlkZXInKSA6IDB4ZWFjZDtcbnZhciBSRUFDVF9DT05URVhUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb250ZXh0JykgOiAweGVhY2U7IC8vIFRPRE86IFdlIGRvbid0IHVzZSBBc3luY01vZGUgb3IgQ29uY3VycmVudE1vZGUgYW55bW9yZS4gVGhleSB3ZXJlIHRlbXBvcmFyeVxuLy8gKHVuc3RhYmxlKSBBUElzIHRoYXQgaGF2ZSBiZWVuIHJlbW92ZWQuIENhbiB3ZSByZW1vdmUgdGhlIHN5bWJvbHM/XG5cbnZhciBSRUFDVF9BU1lOQ19NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5hc3luY19tb2RlJykgOiAweGVhY2Y7XG52YXIgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5jb25jdXJyZW50X21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKSA6IDB4ZWFkMDtcbnZhciBSRUFDVF9TVVNQRU5TRV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3Quc3VzcGVuc2UnKSA6IDB4ZWFkMTtcbnZhciBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZV9saXN0JykgOiAweGVhZDg7XG52YXIgUkVBQ1RfTUVNT19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubWVtbycpIDogMHhlYWQzO1xudmFyIFJFQUNUX0xBWllfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmxhenknKSA6IDB4ZWFkNDtcbnZhciBSRUFDVF9CTE9DS19UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuYmxvY2snKSA6IDB4ZWFkOTtcbnZhciBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QuZnVuZGFtZW50YWwnKSA6IDB4ZWFkNTtcbnZhciBSRUFDVF9SRVNQT05ERVJfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnJlc3BvbmRlcicpIDogMHhlYWQ2O1xudmFyIFJFQUNUX1NDT1BFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zY29wZScpIDogMHhlYWQ3O1xuXG5mdW5jdGlvbiBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSkge1xuICByZXR1cm4gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IC8vIE5vdGU6IGl0cyB0eXBlb2YgbWlnaHQgYmUgb3RoZXIgdGhhbiAnc3ltYm9sJyBvciAnbnVtYmVyJyBpZiBpdCdzIGEgcG9seWZpbGwuXG4gIHR5cGUgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfUFJPRklMRVJfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfTElTVF9UWVBFIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmICh0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9MQVpZX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTUVNT19UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1BST1ZJREVSX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQ09OVEVYVF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9SRVNQT05ERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9TQ09QRV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0JMT0NLX1RZUEUpO1xufVxuXG5mdW5jdGlvbiB0eXBlT2Yob2JqZWN0KSB7XG4gIGlmICh0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwpIHtcbiAgICB2YXIgJCR0eXBlb2YgPSBvYmplY3QuJCR0eXBlb2Y7XG5cbiAgICBzd2l0Y2ggKCQkdHlwZW9mKSB7XG4gICAgICBjYXNlIFJFQUNUX0VMRU1FTlRfVFlQRTpcbiAgICAgICAgdmFyIHR5cGUgPSBvYmplY3QudHlwZTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlIFJFQUNUX0FTWU5DX01PREVfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfRlJBR01FTlRfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgICAgICAgIHJldHVybiB0eXBlO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciAkJHR5cGVvZlR5cGUgPSB0eXBlICYmIHR5cGUuJCR0eXBlb2Y7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoJCR0eXBlb2ZUeXBlKSB7XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZlR5cGU7XG5cbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICBjYXNlIFJFQUNUX1BPUlRBTF9UWVBFOlxuICAgICAgICByZXR1cm4gJCR0eXBlb2Y7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn0gLy8gQXN5bmNNb2RlIGlzIGRlcHJlY2F0ZWQgYWxvbmcgd2l0aCBpc0FzeW5jTW9kZVxuXG52YXIgQXN5bmNNb2RlID0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xudmFyIENvbmN1cnJlbnRNb2RlID0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG52YXIgQ29udGV4dENvbnN1bWVyID0gUkVBQ1RfQ09OVEVYVF9UWVBFO1xudmFyIENvbnRleHRQcm92aWRlciA9IFJFQUNUX1BST1ZJREVSX1RZUEU7XG52YXIgRWxlbWVudCA9IFJFQUNUX0VMRU1FTlRfVFlQRTtcbnZhciBGb3J3YXJkUmVmID0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbnZhciBGcmFnbWVudCA9IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG52YXIgTGF6eSA9IFJFQUNUX0xBWllfVFlQRTtcbnZhciBNZW1vID0gUkVBQ1RfTUVNT19UWVBFO1xudmFyIFBvcnRhbCA9IFJFQUNUX1BPUlRBTF9UWVBFO1xudmFyIFByb2ZpbGVyID0gUkVBQ1RfUFJPRklMRVJfVFlQRTtcbnZhciBTdHJpY3RNb2RlID0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbnZhciBTdXNwZW5zZSA9IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG52YXIgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSBmYWxzZTsgLy8gQXN5bmNNb2RlIHNob3VsZCBiZSBkZXByZWNhdGVkXG5cbmZ1bmN0aW9uIGlzQXN5bmNNb2RlKG9iamVjdCkge1xuICB7XG4gICAgaWYgKCFoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSkge1xuICAgICAgaGFzV2FybmVkQWJvdXREZXByZWNhdGVkSXNBc3luY01vZGUgPSB0cnVlOyAvLyBVc2luZyBjb25zb2xlWyd3YXJuJ10gdG8gZXZhZGUgQmFiZWwgYW5kIEVTTGludFxuXG4gICAgICBjb25zb2xlWyd3YXJuJ10oJ1RoZSBSZWFjdElzLmlzQXN5bmNNb2RlKCkgYWxpYXMgaGFzIGJlZW4gZGVwcmVjYXRlZCwgJyArICdhbmQgd2lsbCBiZSByZW1vdmVkIGluIFJlYWN0IDE3Ky4gVXBkYXRlIHlvdXIgY29kZSB0byB1c2UgJyArICdSZWFjdElzLmlzQ29uY3VycmVudE1vZGUoKSBpbnN0ZWFkLiBJdCBoYXMgdGhlIGV4YWN0IHNhbWUgQVBJLicpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpc0NvbmN1cnJlbnRNb2RlKG9iamVjdCkgfHwgdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0FTWU5DX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRDb25zdW1lcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05URVhUX1RZUEU7XG59XG5mdW5jdGlvbiBpc0NvbnRleHRQcm92aWRlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9WSURFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNFbGVtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufVxuZnVuY3Rpb24gaXNGb3J3YXJkUmVmKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZyYWdtZW50KG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0ZSQUdNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0xhenkob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTEFaWV9UWVBFO1xufVxuZnVuY3Rpb24gaXNNZW1vKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX01FTU9fVFlQRTtcbn1cbmZ1bmN0aW9uIGlzUG9ydGFsKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BPUlRBTF9UWVBFO1xufVxuZnVuY3Rpb24gaXNQcm9maWxlcihvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xufVxuZnVuY3Rpb24gaXNTdHJpY3RNb2RlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N1c3BlbnNlKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1NVU1BFTlNFX1RZUEU7XG59XG5cbmV4cG9ydHMuQXN5bmNNb2RlID0gQXN5bmNNb2RlO1xuZXhwb3J0cy5Db25jdXJyZW50TW9kZSA9IENvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5Db250ZXh0Q29uc3VtZXIgPSBDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLkNvbnRleHRQcm92aWRlciA9IENvbnRleHRQcm92aWRlcjtcbmV4cG9ydHMuRWxlbWVudCA9IEVsZW1lbnQ7XG5leHBvcnRzLkZvcndhcmRSZWYgPSBGb3J3YXJkUmVmO1xuZXhwb3J0cy5GcmFnbWVudCA9IEZyYWdtZW50O1xuZXhwb3J0cy5MYXp5ID0gTGF6eTtcbmV4cG9ydHMuTWVtbyA9IE1lbW87XG5leHBvcnRzLlBvcnRhbCA9IFBvcnRhbDtcbmV4cG9ydHMuUHJvZmlsZXIgPSBQcm9maWxlcjtcbmV4cG9ydHMuU3RyaWN0TW9kZSA9IFN0cmljdE1vZGU7XG5leHBvcnRzLlN1c3BlbnNlID0gU3VzcGVuc2U7XG5leHBvcnRzLmlzQXN5bmNNb2RlID0gaXNBc3luY01vZGU7XG5leHBvcnRzLmlzQ29uY3VycmVudE1vZGUgPSBpc0NvbmN1cnJlbnRNb2RlO1xuZXhwb3J0cy5pc0NvbnRleHRDb25zdW1lciA9IGlzQ29udGV4dENvbnN1bWVyO1xuZXhwb3J0cy5pc0NvbnRleHRQcm92aWRlciA9IGlzQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5leHBvcnRzLmlzRm9yd2FyZFJlZiA9IGlzRm9yd2FyZFJlZjtcbmV4cG9ydHMuaXNGcmFnbWVudCA9IGlzRnJhZ21lbnQ7XG5leHBvcnRzLmlzTGF6eSA9IGlzTGF6eTtcbmV4cG9ydHMuaXNNZW1vID0gaXNNZW1vO1xuZXhwb3J0cy5pc1BvcnRhbCA9IGlzUG9ydGFsO1xuZXhwb3J0cy5pc1Byb2ZpbGVyID0gaXNQcm9maWxlcjtcbmV4cG9ydHMuaXNTdHJpY3RNb2RlID0gaXNTdHJpY3RNb2RlO1xuZXhwb3J0cy5pc1N1c3BlbnNlID0gaXNTdXNwZW5zZTtcbmV4cG9ydHMuaXNWYWxpZEVsZW1lbnRUeXBlID0gaXNWYWxpZEVsZW1lbnRUeXBlO1xuZXhwb3J0cy50eXBlT2YgPSB0eXBlT2Y7XG4gIH0pKCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB2YXIgaGFzID0gRnVuY3Rpb24uY2FsbC5iaW5kKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkpO1xuXG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmIChoYXModHlwZVNwZWNzLCB0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBlcnIgPSBFcnJvcihcbiAgICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiAnICsgbG9jYXRpb24gKyAnIHR5cGUgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyAnICtcbiAgICAgICAgICAgICAgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICsgJ2AuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yICYmICEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAnICtcbiAgICAgICAgICAgIGxvY2F0aW9uICsgJyBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJyArIHR5cGVvZiBlcnJvciArICcuICcgK1xuICAgICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArXG4gICAgICAgICAgICAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAnRmFpbGVkICcgKyBsb2NhdGlvbiArICcgdHlwZTogJyArIGVycm9yLm1lc3NhZ2UgKyAoc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlc2V0cyB3YXJuaW5nIGNhY2hlIHdoZW4gdGVzdGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5jaGVja1Byb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0SXMgPSByZXF1aXJlKCdyZWFjdC1pcycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxudmFyIGhhcyA9IEZ1bmN0aW9uLmNhbGwuYmluZChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBwcmludFdhcm5pbmcgPSBmdW5jdGlvbih0ZXh0KSB7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIHRleHQ7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxuZnVuY3Rpb24gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCgpIHtcbiAgcmV0dXJuIG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgLyogZ2xvYmFsIFN5bWJvbCAqL1xuICB2YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG4gIHZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gICAqXG4gICAqIEJlIHN1cmUgdG8gaW52b2tlIHRoZSBmdW5jdGlvbiB3aXRoIHRoZSBpdGVyYWJsZSBhcyBjb250ZXh0OlxuICAgKlxuICAgKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICAgKiAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICAgKiAgICAgICAuLi5cbiAgICogICAgIH1cbiAgICpcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gICAqIEByZXR1cm4gez9mdW5jdGlvbn1cbiAgICovXG4gIGZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gbWF5YmVJdGVyYWJsZSAmJiAoSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29sbGVjdGlvbiBvZiBtZXRob2RzIHRoYXQgYWxsb3cgZGVjbGFyYXRpb24gYW5kIHZhbGlkYXRpb24gb2YgcHJvcHMgdGhhdCBhcmVcbiAgICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAgICpcbiAgICogICB2YXIgUHJvcHMgPSByZXF1aXJlKCdSZWFjdFByb3BUeXBlcycpO1xuICAgKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIHByb3AgbmFtZWQgXCJkZXNjcmlwdGlvblwiLlxuICAgKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHJlcXVpcmVkIGVudW0gcHJvcCBuYW1lZCBcImNhdGVnb3J5XCIuXG4gICAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAgICpcbiAgICogICAgICAgLy8gQSBwcm9wIG5hbWVkIFwiZGlhbG9nXCIgdGhhdCByZXF1aXJlcyBhbiBpbnN0YW5jZSBvZiBEaWFsb2cuXG4gICAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAgICogICAgIH0sXG4gICAqICAgICByZW5kZXI6IGZ1bmN0aW9uKCkgeyAuLi4gfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiBBIG1vcmUgZm9ybWFsIHNwZWNpZmljYXRpb24gb2YgaG93IHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQ6XG4gICAqXG4gICAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICAgKiAgIGRlY2wgOj0gUmVhY3RQcm9wVHlwZXMue3R5cGV9KC5pc1JlcXVpcmVkKT9cbiAgICpcbiAgICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICAgKiBhbGxvd3MgdGhlIGNyZWF0aW9uIG9mIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9ucy4gRm9yIGV4YW1wbGU6XG4gICAqXG4gICAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICBwcm9wVHlwZXM6IHtcbiAgICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gICAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gICAqICAgICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gICAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gICAqICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAgICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gICAqICAgICAgICAgICk7XG4gICAqICAgICAgICB9XG4gICAqICAgICAgfVxuICAgKiAgICB9LFxuICAgKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAgICogIH0pO1xuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG5cbiAgdmFyIEFOT05ZTU9VUyA9ICc8PGFub255bW91cz4+JztcblxuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICAgIGZ1bmM6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdmdW5jdGlvbicpLFxuICAgIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICAgIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICAgIHN0cmluZzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N0cmluZycpLFxuICAgIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gICAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICAgIGFycmF5T2Y6IGNyZWF0ZUFycmF5T2ZUeXBlQ2hlY2tlcixcbiAgICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgICBlbGVtZW50VHlwZTogY3JlYXRlRWxlbWVudFR5cGVUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgJ1VzZSBgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKClgIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAgICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICAgICAgICApO1xuICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgcHJvcCBvbiBgJyArIGNvbXBvbmVudE5hbWUgICsgJ2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlVHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFSZWFjdElzLmlzVmFsaWRFbGVtZW50VHlwZShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudCB0eXBlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnRzIHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBhcnJheSwgZ290ICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyBhcmd1bWVudHMuICcgK1xuICAgICAgICAgICAgJ0EgY29tbW9uIG1pc3Rha2UgaXMgdG8gd3JpdGUgb25lT2YoeCwgeSwgeikgaW5zdGVhZCBvZiBvbmVPZihbeCwgeSwgel0pLidcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gYXJyYXkuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzLCBmdW5jdGlvbiByZXBsYWNlcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBTdHJpbmcocHJvcFZhbHVlKSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAoaGFzKHByb3BWYWx1ZSwga2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJyArIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSArICcgYXQgaW5kZXggJyArIGkgKyAnLidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIGZhbHN5IHZhbHVlIGNhbid0IGJlIGEgU3ltYm9sXG4gICAgaWYgKCFwcm9wVmFsdWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJyArIHByb3BWYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgcG9zdGZpeGVkIHRvIGEgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIHR5cGUuXG4gIC8vIEZvciBleGFtcGxlLCBcInVuZGVmaW5lZFwiIG9yIFwib2YgdHlwZSBhcnJheVwiXG4gIGZ1bmN0aW9uIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuICdhbiAnICsgdHlwZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdyZWdleHAnOlxuICAgICAgICByZXR1cm4gJ2EgJyArIHR5cGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuICBmdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICByZXR1cm4gQU5PTllNT1VTO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGNoZWNrUHJvcFR5cGVzO1xuICBSZWFjdFByb3BUeXBlcy5yZXNldFdhcm5pbmdDYWNoZSA9IGNoZWNrUHJvcFR5cGVzLnJlc2V0V2FybmluZ0NhY2hlO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RJcyA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShSZWFjdElzLmlzRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuIiwiaW1wb3J0IHsgdXNlUmVmLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG4vKipcbiAqIFRyYWNrIHdoZXRoZXIgYSBjb21wb25lbnQgaXMgY3VycmVudCBtb3VudGVkLiBHZW5lcmFsbHkgbGVzcyBwcmVmZXJhYmxlIHRoYW5cbiAqIHByb3BlcmxseSBjYW5jZWxpbmcgZWZmZWN0cyBzbyB0aGV5IGRvbid0IHJ1biBhZnRlciBhIGNvbXBvbmVudCBpcyB1bm1vdW50ZWQsXG4gKiBidXQgaGVscGZ1bCBpbiBjYXNlcyB3aGVyZSB0aGF0IGlzbid0IGZlYXNpYmxlLCBzdWNoIGFzIGEgYFByb21pc2VgIHJlc29sdXRpb24uXG4gKlxuICogQHJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGN1cnJlbnQgaXNNb3VudGVkIHN0YXRlIG9mIHRoZSBjb21wb25lbnRcbiAqXG4gKiBgYGB0c1xuICogY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUobnVsbClcbiAqIGNvbnN0IGlzTW91bnRlZCA9IHVzZU1vdW50ZWQoKVxuICpcbiAqIHVzZUVmZmVjdCgoKSA9PiB7XG4gKiAgIGZldGNoZGF0YSgpLnRoZW4oKG5ld0RhdGEpID0+IHtcbiAqICAgICAgaWYgKGlzTW91bnRlZCgpKSB7XG4gKiAgICAgICAgc2V0RGF0YShuZXdEYXRhKTtcbiAqICAgICAgfVxuICogICB9KVxuICogfSlcbiAqIGBgYFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZU1vdW50ZWQoKSB7XG4gIHZhciBtb3VudGVkID0gdXNlUmVmKHRydWUpO1xuICB2YXIgaXNNb3VudGVkID0gdXNlUmVmKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbW91bnRlZC5jdXJyZW50O1xuICB9KTtcbiAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgbW91bnRlZC5jdXJyZW50ID0gZmFsc2U7XG4gICAgfTtcbiAgfSwgW10pO1xuICByZXR1cm4gaXNNb3VudGVkLmN1cnJlbnQ7XG59IiwiaW1wb3J0IHsgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuLyoqXG4gKiBSZXR1cm5zIGEgcmVmIHRoYXQgaXMgaW1tZWRpYXRlbHkgdXBkYXRlZCB3aXRoIHRoZSBuZXcgdmFsdWVcbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIFJlZiB2YWx1ZVxuICogQGNhdGVnb3J5IHJlZnNcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VVcGRhdGVkUmVmKHZhbHVlKSB7XG4gIHZhciB2YWx1ZVJlZiA9IHVzZVJlZih2YWx1ZSk7XG4gIHZhbHVlUmVmLmN1cnJlbnQgPSB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlUmVmO1xufSIsImltcG9ydCB1c2VVcGRhdGVkUmVmIGZyb20gJy4vdXNlVXBkYXRlZFJlZic7XG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG4vKipcbiAqIEF0dGFjaCBhIGNhbGxiYWNrIHRoYXQgZmlyZXMgd2hlbiBhIGNvbXBvbmVudCB1bm1vdW50c1xuICpcbiAqIEBwYXJhbSBmbiBIYW5kbGVyIHRvIHJ1biB3aGVuIHRoZSBjb21wb25lbnQgdW5tb3VudHNcbiAqIEBjYXRlZ29yeSBlZmZlY3RzXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlV2lsbFVubW91bnQoZm4pIHtcbiAgdmFyIG9uVW5tb3VudCA9IHVzZVVwZGF0ZWRSZWYoZm4pO1xuICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gb25Vbm1vdW50LmN1cnJlbnQoKTtcbiAgICB9O1xuICB9LCBbXSk7XG59IiwiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG4vKipcbiAqIFN0b3JlIHRoZSBsYXN0IG9mIHNvbWUgdmFsdWUuIFRyYWNrZWQgdmlhIGEgYFJlZmAgb25seSB1cGRhdGluZyBpdFxuICogYWZ0ZXIgdGhlIGNvbXBvbmVudCByZW5kZXJzLlxuICpcbiAqIEhlbHBmdWwgaWYgeW91IG5lZWQgdG8gY29tcGFyZSBhIHByb3AgdmFsdWUgdG8gaXQncyBwcmV2aW91cyB2YWx1ZSBkdXJpbmcgcmVuZGVyLlxuICpcbiAqIGBgYHRzXG4gKiBmdW5jdGlvbiBDb21wb25lbnQocHJvcHMpIHtcbiAqICAgY29uc3QgbGFzdFByb3BzID0gdXNlUHJldmlvdXMocHJvcHMpXG4gKlxuICogICBpZiAobGFzdFByb3BzLmZvbyAhPT0gcHJvcHMuZm9vKVxuICogICAgIHJlc2V0VmFsdWVGcm9tUHJvcHMocHJvcHMuZm9vKVxuICogfVxuICogYGBgXG4gKlxuICogQHBhcmFtIHZhbHVlIHRoZSB2YWx1ZSB0byB0cmFja1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVByZXZpb3VzKHZhbHVlKSB7XG4gIHZhciByZWYgPSB1c2VSZWYobnVsbCk7XG4gIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgcmVmLmN1cnJlbnQgPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZWYuY3VycmVudDtcbn0iLCJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0Jztcbi8qKlxuICogQ3JlYXRlcyBhIGBSZWZgIHdob3NlIHZhbHVlIGlzIHVwZGF0ZWQgaW4gYW4gZWZmZWN0LCBlbnN1cmluZyB0aGUgbW9zdCByZWNlbnRcbiAqIHZhbHVlIGlzIHRoZSBvbmUgcmVuZGVyZWQgd2l0aC4gR2VuZXJhbGx5IG9ubHkgcmVxdWlyZWQgZm9yIENvbmN1cnJlbnQgbW9kZSB1c2FnZVxuICogd2hlcmUgcHJldmlvdXMgd29yayBpbiBgcmVuZGVyKClgIG1heSBiZSBkaXNjYXJkZWQgYmVmb3IgYmVpbmcgdXNlZC5cbiAqXG4gKiBUaGlzIGlzIHNhZmUgdG8gYWNjZXNzIGluIGFuIGV2ZW50IGhhbmRsZXIuXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSBgUmVmYCB2YWx1ZVxuICovXG5cbmZ1bmN0aW9uIHVzZUNvbW1pdHRlZFJlZih2YWx1ZSkge1xuICB2YXIgcmVmID0gdXNlUmVmKHZhbHVlKTtcbiAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICByZWYuY3VycmVudCA9IHZhbHVlO1xuICB9LCBbdmFsdWVdKTtcbiAgcmV0dXJuIHJlZjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdXNlQ29tbWl0dGVkUmVmOyIsImltcG9ydCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHVzZUNvbW1pdHRlZFJlZiBmcm9tICcuL3VzZUNvbW1pdHRlZFJlZic7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VFdmVudENhbGxiYWNrKGZuKSB7XG4gIHZhciByZWYgPSB1c2VDb21taXR0ZWRSZWYoZm4pO1xuICByZXR1cm4gdXNlQ2FsbGJhY2soZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByZWYuY3VycmVudCAmJiByZWYuY3VycmVudC5hcHBseShyZWYsIGFyZ3VtZW50cyk7XG4gIH0sIFtyZWZdKTtcbn0iLCIvKipcbiAqIENoZWNrcyBpZiBhIGdpdmVuIGVsZW1lbnQgaGFzIGEgQ1NTIGNsYXNzLlxuICogXG4gKiBAcGFyYW0gZWxlbWVudCB0aGUgZWxlbWVudFxuICogQHBhcmFtIGNsYXNzTmFtZSB0aGUgQ1NTIGNsYXNzIG5hbWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFzQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdCkgcmV0dXJuICEhY2xhc3NOYW1lICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIHJldHVybiAoXCIgXCIgKyAoZWxlbWVudC5jbGFzc05hbWUuYmFzZVZhbCB8fCBlbGVtZW50LmNsYXNzTmFtZSkgKyBcIiBcIikuaW5kZXhPZihcIiBcIiArIGNsYXNzTmFtZSArIFwiIFwiKSAhPT0gLTE7XG59IiwiaW1wb3J0IGhhc0NsYXNzIGZyb20gJy4vaGFzQ2xhc3MnO1xuLyoqXG4gKiBBZGRzIGEgQ1NTIGNsYXNzIHRvIGEgZ2l2ZW4gZWxlbWVudC5cbiAqIFxuICogQHBhcmFtIGVsZW1lbnQgdGhlIGVsZW1lbnRcbiAqIEBwYXJhbSBjbGFzc05hbWUgdGhlIENTUyBjbGFzcyBuYW1lXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdCkgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7ZWxzZSBpZiAoIWhhc0NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkpIGlmICh0eXBlb2YgZWxlbWVudC5jbGFzc05hbWUgPT09ICdzdHJpbmcnKSBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lICsgXCIgXCIgKyBjbGFzc05hbWU7ZWxzZSBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoZWxlbWVudC5jbGFzc05hbWUgJiYgZWxlbWVudC5jbGFzc05hbWUuYmFzZVZhbCB8fCAnJykgKyBcIiBcIiArIGNsYXNzTmFtZSk7XG59IiwiZnVuY3Rpb24gcmVwbGFjZUNsYXNzTmFtZShvcmlnQ2xhc3MsIGNsYXNzVG9SZW1vdmUpIHtcbiAgcmV0dXJuIG9yaWdDbGFzcy5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoXnxcXFxccylcIiArIGNsYXNzVG9SZW1vdmUgKyBcIig/OlxcXFxzfCQpXCIsICdnJyksICckMScpLnJlcGxhY2UoL1xccysvZywgJyAnKS5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJyk7XG59XG4vKipcbiAqIFJlbW92ZXMgYSBDU1MgY2xhc3MgZnJvbSBhIGdpdmVuIGVsZW1lbnQuXG4gKiBcbiAqIEBwYXJhbSBlbGVtZW50IHRoZSBlbGVtZW50XG4gKiBAcGFyYW0gY2xhc3NOYW1lIHRoZSBDU1MgY2xhc3MgbmFtZVxuICovXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50LmNsYXNzTmFtZSA9PT0gJ3N0cmluZycpIHtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IHJlcGxhY2VDbGFzc05hbWUoZWxlbWVudC5jbGFzc05hbWUsIGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgcmVwbGFjZUNsYXNzTmFtZShlbGVtZW50LmNsYXNzTmFtZSAmJiBlbGVtZW50LmNsYXNzTmFtZS5iYXNlVmFsIHx8ICcnLCBjbGFzc05hbWUpKTtcbiAgfVxufSIsImltcG9ydCBvd25lckRvY3VtZW50IGZyb20gJy4vb3duZXJEb2N1bWVudCc7XG4vKipcbiAqIFJldHVybnMgdGhlIG93bmVyIHdpbmRvdyBvZiBhIGdpdmVuIGVsZW1lbnQuXG4gKiBcbiAqIEBwYXJhbSBub2RlIHRoZSBlbGVtZW50XG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gb3duZXJXaW5kb3cobm9kZSkge1xuICB2YXIgZG9jID0gb3duZXJEb2N1bWVudChub2RlKTtcbiAgcmV0dXJuIGRvYyAmJiBkb2MuZGVmYXVsdFZpZXcgfHwgd2luZG93O1xufSIsImltcG9ydCBvd25lcldpbmRvdyBmcm9tICcuL293bmVyV2luZG93Jztcbi8qKlxuICogUmV0dXJucyBvbmUgb3IgYWxsIGNvbXB1dGVkIHN0eWxlIHByb3BlcnRpZXMgb2YgYW4gZWxlbWVudC5cbiAqIFxuICogQHBhcmFtIG5vZGUgdGhlIGVsZW1lbnRcbiAqIEBwYXJhbSBwc3VlZG9FbGVtZW50IHRoZSBzdHlsZSBwcm9wZXJ0eVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldENvbXB1dGVkU3R5bGUobm9kZSwgcHN1ZWRvRWxlbWVudCkge1xuICByZXR1cm4gb3duZXJXaW5kb3cobm9kZSkuZ2V0Q29tcHV0ZWRTdHlsZShub2RlLCBwc3VlZG9FbGVtZW50KTtcbn0iLCJ2YXIgclVwcGVyID0gLyhbQS1aXSkvZztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGh5cGhlbmF0ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKHJVcHBlciwgJy0kMScpLnRvTG93ZXJDYXNlKCk7XG59IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy0yMDE0LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iLzJhZWI4YTJhNmJlYjAwNjE3YTQyMTdmN2Y4Mjg0OTI0ZmEyYWQ4MTkvc3JjL3ZlbmRvci9jb3JlL2h5cGhlbmF0ZVN0eWxlTmFtZS5qc1xuICovXG5pbXBvcnQgaHlwaGVuYXRlIGZyb20gJy4vaHlwaGVuYXRlJztcbnZhciBtc1BhdHRlcm4gPSAvXm1zLS87XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoeXBoZW5hdGVTdHlsZU5hbWUoc3RyaW5nKSB7XG4gIHJldHVybiBoeXBoZW5hdGUoc3RyaW5nKS5yZXBsYWNlKG1zUGF0dGVybiwgJy1tcy0nKTtcbn0iLCJ2YXIgc3VwcG9ydGVkVHJhbnNmb3JtcyA9IC9eKCh0cmFuc2xhdGV8cm90YXRlfHNjYWxlKShYfFl8WnwzZCk/fG1hdHJpeCgzZCk/fHBlcnNwZWN0aXZlfHNrZXcoWHxZKT8pJC9pO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNUcmFuc2Zvcm0odmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHN1cHBvcnRlZFRyYW5zZm9ybXMudGVzdCh2YWx1ZSkpO1xufSIsImltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gJy4vZ2V0Q29tcHV0ZWRTdHlsZSc7XG5pbXBvcnQgaHlwaGVuYXRlIGZyb20gJy4vaHlwaGVuYXRlU3R5bGUnO1xuaW1wb3J0IGlzVHJhbnNmb3JtIGZyb20gJy4vaXNUcmFuc2Zvcm0nO1xuXG5mdW5jdGlvbiBzdHlsZShub2RlLCBwcm9wZXJ0eSkge1xuICB2YXIgY3NzID0gJyc7XG4gIHZhciB0cmFuc2Zvcm1zID0gJyc7XG5cbiAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbm9kZS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKGh5cGhlbmF0ZShwcm9wZXJ0eSkpIHx8IGdldENvbXB1dGVkU3R5bGUobm9kZSkuZ2V0UHJvcGVydHlWYWx1ZShoeXBoZW5hdGUocHJvcGVydHkpKTtcbiAgfVxuXG4gIE9iamVjdC5rZXlzKHByb3BlcnR5KS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9wZXJ0eVtrZXldO1xuXG4gICAgaWYgKCF2YWx1ZSAmJiB2YWx1ZSAhPT0gMCkge1xuICAgICAgbm9kZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShoeXBoZW5hdGUoa2V5KSk7XG4gICAgfSBlbHNlIGlmIChpc1RyYW5zZm9ybShrZXkpKSB7XG4gICAgICB0cmFuc2Zvcm1zICs9IGtleSArIFwiKFwiICsgdmFsdWUgKyBcIikgXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNzcyArPSBoeXBoZW5hdGUoa2V5KSArIFwiOiBcIiArIHZhbHVlICsgXCI7XCI7XG4gICAgfVxuICB9KTtcblxuICBpZiAodHJhbnNmb3Jtcykge1xuICAgIGNzcyArPSBcInRyYW5zZm9ybTogXCIgKyB0cmFuc2Zvcm1zICsgXCI7XCI7XG4gIH1cblxuICBub2RlLnN0eWxlLmNzc1RleHQgKz0gXCI7XCIgKyBjc3M7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0eWxlOyIsImltcG9ydCBjYW5Vc2VET00gZnJvbSAnLi9jYW5Vc2VET00nO1xudmFyIHNpemU7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzY3JvbGxiYXJTaXplKHJlY2FsYykge1xuICBpZiAoIXNpemUgJiYgc2l6ZSAhPT0gMCB8fCByZWNhbGMpIHtcbiAgICBpZiAoY2FuVXNlRE9NKSB7XG4gICAgICB2YXIgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgc2Nyb2xsRGl2LnN0eWxlLnRvcCA9ICctOTk5OXB4JztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS53aWR0aCA9ICc1MHB4JztcbiAgICAgIHNjcm9sbERpdi5zdHlsZS5oZWlnaHQgPSAnNTBweCc7XG4gICAgICBzY3JvbGxEaXYuc3R5bGUub3ZlcmZsb3cgPSAnc2Nyb2xsJztcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KTtcbiAgICAgIHNpemUgPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGg7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNpemU7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNEb2N1bWVudChlbGVtZW50KSB7XG4gIHJldHVybiAnbm9kZVR5cGUnIGluIGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gZG9jdW1lbnQuRE9DVU1FTlRfTk9ERTtcbn0iLCJpbXBvcnQgaXNEb2N1bWVudCBmcm9tICcuL2lzRG9jdW1lbnQnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNXaW5kb3cobm9kZSkge1xuICBpZiAoJ3dpbmRvdycgaW4gbm9kZSAmJiBub2RlLndpbmRvdyA9PT0gbm9kZSkgcmV0dXJuIG5vZGU7XG4gIGlmIChpc0RvY3VtZW50KG5vZGUpKSByZXR1cm4gbm9kZS5kZWZhdWx0VmlldyB8fCBmYWxzZTtcbiAgcmV0dXJuIGZhbHNlO1xufSIsImltcG9ydCBpc1dpbmRvdyBmcm9tICdkb20taGVscGVycy9pc1dpbmRvdyc7XG5pbXBvcnQgb3duZXJEb2N1bWVudCBmcm9tICdkb20taGVscGVycy9vd25lckRvY3VtZW50JztcblxuZnVuY3Rpb24gaXNCb2R5KG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUgJiYgbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdib2R5Jztcbn1cblxuZnVuY3Rpb24gYm9keUlzT3ZlcmZsb3dpbmcobm9kZSkge1xuICB2YXIgZG9jID0gaXNXaW5kb3cobm9kZSkgPyBvd25lckRvY3VtZW50KCkgOiBvd25lckRvY3VtZW50KG5vZGUpO1xuICB2YXIgd2luID0gaXNXaW5kb3cobm9kZSkgfHwgZG9jLmRlZmF1bHRWaWV3O1xuICByZXR1cm4gZG9jLmJvZHkuY2xpZW50V2lkdGggPCB3aW4uaW5uZXJXaWR0aDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNPdmVyZmxvd2luZyhjb250YWluZXIpIHtcbiAgdmFyIHdpbiA9IGlzV2luZG93KGNvbnRhaW5lcik7XG4gIHJldHVybiB3aW4gfHwgaXNCb2R5KGNvbnRhaW5lcikgPyBib2R5SXNPdmVyZmxvd2luZyhjb250YWluZXIpIDogY29udGFpbmVyLnNjcm9sbEhlaWdodCA+IGNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG59IiwidmFyIEJMQUNLTElTVCA9IFsndGVtcGxhdGUnLCAnc2NyaXB0JywgJ3N0eWxlJ107XG5cbnZhciBpc0hpZGFibGUgPSBmdW5jdGlvbiBpc0hpZGFibGUoX3JlZikge1xuICB2YXIgbm9kZVR5cGUgPSBfcmVmLm5vZGVUeXBlLFxuICAgICAgdGFnTmFtZSA9IF9yZWYudGFnTmFtZTtcbiAgcmV0dXJuIG5vZGVUeXBlID09PSAxICYmIEJMQUNLTElTVC5pbmRleE9mKHRhZ05hbWUudG9Mb3dlckNhc2UoKSkgPT09IC0xO1xufTtcblxudmFyIHNpYmxpbmdzID0gZnVuY3Rpb24gc2libGluZ3MoY29udGFpbmVyLCBleGNsdWRlLCBjYikge1xuICBbXS5mb3JFYWNoLmNhbGwoY29udGFpbmVyLmNoaWxkcmVuLCBmdW5jdGlvbiAobm9kZSkge1xuICAgIGlmIChleGNsdWRlLmluZGV4T2Yobm9kZSkgPT09IC0xICYmIGlzSGlkYWJsZShub2RlKSkge1xuICAgICAgY2Iobm9kZSk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmlhSGlkZGVuKGhpZGUsIG5vZGUpIHtcbiAgaWYgKCFub2RlKSByZXR1cm47XG5cbiAgaWYgKGhpZGUpIHtcbiAgICBub2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICB9IGVsc2Uge1xuICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaGlkZVNpYmxpbmdzKGNvbnRhaW5lciwgX3JlZjIpIHtcbiAgdmFyIGRpYWxvZyA9IF9yZWYyLmRpYWxvZyxcbiAgICAgIGJhY2tkcm9wID0gX3JlZjIuYmFja2Ryb3A7XG4gIHNpYmxpbmdzKGNvbnRhaW5lciwgW2RpYWxvZywgYmFja2Ryb3BdLCBmdW5jdGlvbiAobm9kZSkge1xuICAgIHJldHVybiBhcmlhSGlkZGVuKHRydWUsIG5vZGUpO1xuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzaG93U2libGluZ3MoY29udGFpbmVyLCBfcmVmMykge1xuICB2YXIgZGlhbG9nID0gX3JlZjMuZGlhbG9nLFxuICAgICAgYmFja2Ryb3AgPSBfcmVmMy5iYWNrZHJvcDtcbiAgc2libGluZ3MoY29udGFpbmVyLCBbZGlhbG9nLCBiYWNrZHJvcF0sIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgcmV0dXJuIGFyaWFIaWRkZW4oZmFsc2UsIG5vZGUpO1xuICB9KTtcbn0iLCJpbXBvcnQgYWRkQ2xhc3MgZnJvbSAnZG9tLWhlbHBlcnMvYWRkQ2xhc3MnO1xuaW1wb3J0IHJlbW92ZUNsYXNzIGZyb20gJ2RvbS1oZWxwZXJzL3JlbW92ZUNsYXNzJztcbmltcG9ydCBjc3MgZnJvbSAnZG9tLWhlbHBlcnMvY3NzJztcbmltcG9ydCBnZXRTY3JvbGxiYXJTaXplIGZyb20gJ2RvbS1oZWxwZXJzL3Njcm9sbGJhclNpemUnO1xuaW1wb3J0IGlzT3ZlcmZsb3dpbmcgZnJvbSAnLi9pc092ZXJmbG93aW5nJztcbmltcG9ydCB7IGFyaWFIaWRkZW4sIGhpZGVTaWJsaW5ncywgc2hvd1NpYmxpbmdzIH0gZnJvbSAnLi9tYW5hZ2VBcmlhSGlkZGVuJztcblxuZnVuY3Rpb24gZmluZEluZGV4T2YoYXJyLCBjYikge1xuICB2YXIgaWR4ID0gLTE7XG4gIGFyci5zb21lKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgaWYgKGNiKGQsIGkpKSB7XG4gICAgICBpZHggPSBpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgcmV0dXJuIGlkeDtcbn1cblxuLyoqXG4gKiBQcm9wZXIgc3RhdGUgbWFuYWdlbWVudCBmb3IgY29udGFpbmVycyBhbmQgdGhlIG1vZGFscyBpbiB0aG9zZSBjb250YWluZXJzLlxuICpcbiAqIEBpbnRlcm5hbCBVc2VkIGJ5IHRoZSBNb2RhbCB0byBlbnN1cmUgcHJvcGVyIHN0eWxpbmcgb2YgY29udGFpbmVycy5cbiAqL1xudmFyIE1vZGFsTWFuYWdlciA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1vZGFsTWFuYWdlcihfdGVtcCkge1xuICAgIHZhciBfcmVmID0gX3RlbXAgPT09IHZvaWQgMCA/IHt9IDogX3RlbXAsXG4gICAgICAgIF9yZWYkaGlkZVNpYmxpbmdOb2RlcyA9IF9yZWYuaGlkZVNpYmxpbmdOb2RlcyxcbiAgICAgICAgaGlkZVNpYmxpbmdOb2RlcyA9IF9yZWYkaGlkZVNpYmxpbmdOb2RlcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9yZWYkaGlkZVNpYmxpbmdOb2RlcyxcbiAgICAgICAgX3JlZiRoYW5kbGVDb250YWluZXJPID0gX3JlZi5oYW5kbGVDb250YWluZXJPdmVyZmxvdyxcbiAgICAgICAgaGFuZGxlQ29udGFpbmVyT3ZlcmZsb3cgPSBfcmVmJGhhbmRsZUNvbnRhaW5lck8gPT09IHZvaWQgMCA/IHRydWUgOiBfcmVmJGhhbmRsZUNvbnRhaW5lck87XG5cbiAgICB0aGlzLmhpZGVTaWJsaW5nTm9kZXMgPSB2b2lkIDA7XG4gICAgdGhpcy5oYW5kbGVDb250YWluZXJPdmVyZmxvdyA9IHZvaWQgMDtcbiAgICB0aGlzLm1vZGFscyA9IHZvaWQgMDtcbiAgICB0aGlzLmNvbnRhaW5lcnMgPSB2b2lkIDA7XG4gICAgdGhpcy5kYXRhID0gdm9pZCAwO1xuICAgIHRoaXMuc2Nyb2xsYmFyU2l6ZSA9IHZvaWQgMDtcbiAgICB0aGlzLmhpZGVTaWJsaW5nTm9kZXMgPSBoaWRlU2libGluZ05vZGVzO1xuICAgIHRoaXMuaGFuZGxlQ29udGFpbmVyT3ZlcmZsb3cgPSBoYW5kbGVDb250YWluZXJPdmVyZmxvdztcbiAgICB0aGlzLm1vZGFscyA9IFtdO1xuICAgIHRoaXMuY29udGFpbmVycyA9IFtdO1xuICAgIHRoaXMuZGF0YSA9IFtdO1xuICAgIHRoaXMuc2Nyb2xsYmFyU2l6ZSA9IGdldFNjcm9sbGJhclNpemUoKTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBNb2RhbE1hbmFnZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5pc0NvbnRhaW5lck92ZXJmbG93aW5nID0gZnVuY3Rpb24gaXNDb250YWluZXJPdmVyZmxvd2luZyhtb2RhbCkge1xuICAgIHZhciBkYXRhID0gdGhpcy5kYXRhW3RoaXMuY29udGFpbmVySW5kZXhGcm9tTW9kYWwobW9kYWwpXTtcbiAgICByZXR1cm4gZGF0YSAmJiBkYXRhLm92ZXJmbG93aW5nO1xuICB9O1xuXG4gIF9wcm90by5jb250YWluZXJJbmRleEZyb21Nb2RhbCA9IGZ1bmN0aW9uIGNvbnRhaW5lckluZGV4RnJvbU1vZGFsKG1vZGFsKSB7XG4gICAgcmV0dXJuIGZpbmRJbmRleE9mKHRoaXMuZGF0YSwgZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBkLm1vZGFscy5pbmRleE9mKG1vZGFsKSAhPT0gLTE7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLnNldENvbnRhaW5lclN0eWxlID0gZnVuY3Rpb24gc2V0Q29udGFpbmVyU3R5bGUoY29udGFpbmVyU3RhdGUsIGNvbnRhaW5lcikge1xuICAgIHZhciBzdHlsZSA9IHtcbiAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgIH07IC8vIHdlIGFyZSBvbmx5IGludGVyZXN0ZWQgaW4gdGhlIGFjdHVhbCBgc3R5bGVgIGhlcmVcbiAgICAvLyBiZWNhdXNlIHdlIHdpbGwgb3ZlcnJpZGUgaXRcblxuICAgIGNvbnRhaW5lclN0YXRlLnN0eWxlID0ge1xuICAgICAgb3ZlcmZsb3c6IGNvbnRhaW5lci5zdHlsZS5vdmVyZmxvdyxcbiAgICAgIHBhZGRpbmdSaWdodDogY29udGFpbmVyLnN0eWxlLnBhZGRpbmdSaWdodFxuICAgIH07XG5cbiAgICBpZiAoY29udGFpbmVyU3RhdGUub3ZlcmZsb3dpbmcpIHtcbiAgICAgIC8vIHVzZSBjb21wdXRlZCBzdHlsZSwgaGVyZSB0byBnZXQgdGhlIHJlYWwgcGFkZGluZ1xuICAgICAgLy8gdG8gYWRkIG91ciBzY3JvbGxiYXIgd2lkdGhcbiAgICAgIHN0eWxlLnBhZGRpbmdSaWdodCA9IHBhcnNlSW50KGNzcyhjb250YWluZXIsICdwYWRkaW5nUmlnaHQnKSB8fCAnMCcsIDEwKSArIHRoaXMuc2Nyb2xsYmFyU2l6ZSArIFwicHhcIjtcbiAgICB9XG5cbiAgICBjc3MoY29udGFpbmVyLCBzdHlsZSk7XG4gIH07XG5cbiAgX3Byb3RvLnJlbW92ZUNvbnRhaW5lclN0eWxlID0gZnVuY3Rpb24gcmVtb3ZlQ29udGFpbmVyU3R5bGUoY29udGFpbmVyU3RhdGUsIGNvbnRhaW5lcikge1xuICAgIE9iamVjdC5hc3NpZ24oY29udGFpbmVyLnN0eWxlLCBjb250YWluZXJTdGF0ZS5zdHlsZSk7XG4gIH07XG5cbiAgX3Byb3RvLmFkZCA9IGZ1bmN0aW9uIGFkZChtb2RhbCwgY29udGFpbmVyLCBjbGFzc05hbWUpIHtcbiAgICB2YXIgbW9kYWxJZHggPSB0aGlzLm1vZGFscy5pbmRleE9mKG1vZGFsKTtcbiAgICB2YXIgY29udGFpbmVySWR4ID0gdGhpcy5jb250YWluZXJzLmluZGV4T2YoY29udGFpbmVyKTtcblxuICAgIGlmIChtb2RhbElkeCAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBtb2RhbElkeDtcbiAgICB9XG5cbiAgICBtb2RhbElkeCA9IHRoaXMubW9kYWxzLmxlbmd0aDtcbiAgICB0aGlzLm1vZGFscy5wdXNoKG1vZGFsKTtcblxuICAgIGlmICh0aGlzLmhpZGVTaWJsaW5nTm9kZXMpIHtcbiAgICAgIGhpZGVTaWJsaW5ncyhjb250YWluZXIsIG1vZGFsKTtcbiAgICB9XG5cbiAgICBpZiAoY29udGFpbmVySWR4ICE9PSAtMSkge1xuICAgICAgdGhpcy5kYXRhW2NvbnRhaW5lcklkeF0ubW9kYWxzLnB1c2gobW9kYWwpO1xuICAgICAgcmV0dXJuIG1vZGFsSWR4O1xuICAgIH1cblxuICAgIHZhciBkYXRhID0ge1xuICAgICAgbW9kYWxzOiBbbW9kYWxdLFxuICAgICAgLy8gcmlnaHQgbm93IG9ubHkgdGhlIGZpcnN0IG1vZGFsIG9mIGEgY29udGFpbmVyIHdpbGwgaGF2ZSBpdHMgY2xhc3NlcyBhcHBsaWVkXG4gICAgICBjbGFzc2VzOiBjbGFzc05hbWUgPyBjbGFzc05hbWUuc3BsaXQoL1xccysvKSA6IFtdLFxuICAgICAgb3ZlcmZsb3dpbmc6IGlzT3ZlcmZsb3dpbmcoY29udGFpbmVyKVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5oYW5kbGVDb250YWluZXJPdmVyZmxvdykge1xuICAgICAgdGhpcy5zZXRDb250YWluZXJTdHlsZShkYXRhLCBjb250YWluZXIpO1xuICAgIH1cblxuICAgIGRhdGEuY2xhc3Nlcy5mb3JFYWNoKGFkZENsYXNzLmJpbmQobnVsbCwgY29udGFpbmVyKSk7XG4gICAgdGhpcy5jb250YWluZXJzLnB1c2goY29udGFpbmVyKTtcbiAgICB0aGlzLmRhdGEucHVzaChkYXRhKTtcbiAgICByZXR1cm4gbW9kYWxJZHg7XG4gIH07XG5cbiAgX3Byb3RvLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShtb2RhbCkge1xuICAgIHZhciBtb2RhbElkeCA9IHRoaXMubW9kYWxzLmluZGV4T2YobW9kYWwpO1xuXG4gICAgaWYgKG1vZGFsSWR4ID09PSAtMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjb250YWluZXJJZHggPSB0aGlzLmNvbnRhaW5lckluZGV4RnJvbU1vZGFsKG1vZGFsKTtcbiAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YVtjb250YWluZXJJZHhdO1xuICAgIHZhciBjb250YWluZXIgPSB0aGlzLmNvbnRhaW5lcnNbY29udGFpbmVySWR4XTtcbiAgICBkYXRhLm1vZGFscy5zcGxpY2UoZGF0YS5tb2RhbHMuaW5kZXhPZihtb2RhbCksIDEpO1xuICAgIHRoaXMubW9kYWxzLnNwbGljZShtb2RhbElkeCwgMSk7IC8vIGlmIHRoYXQgd2FzIHRoZSBsYXN0IG1vZGFsIGluIGEgY29udGFpbmVyLFxuICAgIC8vIGNsZWFuIHVwIHRoZSBjb250YWluZXJcblxuICAgIGlmIChkYXRhLm1vZGFscy5sZW5ndGggPT09IDApIHtcbiAgICAgIGRhdGEuY2xhc3Nlcy5mb3JFYWNoKHJlbW92ZUNsYXNzLmJpbmQobnVsbCwgY29udGFpbmVyKSk7XG5cbiAgICAgIGlmICh0aGlzLmhhbmRsZUNvbnRhaW5lck92ZXJmbG93KSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQ29udGFpbmVyU3R5bGUoZGF0YSwgY29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaGlkZVNpYmxpbmdOb2Rlcykge1xuICAgICAgICBzaG93U2libGluZ3MoY29udGFpbmVyLCBtb2RhbCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29udGFpbmVycy5zcGxpY2UoY29udGFpbmVySWR4LCAxKTtcbiAgICAgIHRoaXMuZGF0YS5zcGxpY2UoY29udGFpbmVySWR4LCAxKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGlkZVNpYmxpbmdOb2Rlcykge1xuICAgICAgLy8gb3RoZXJ3aXNlIG1ha2Ugc3VyZSB0aGUgbmV4dCB0b3AgbW9kYWwgaXMgdmlzaWJsZSB0byBhIFNSXG4gICAgICB2YXIgX2RhdGEkbW9kYWxzID0gZGF0YS5tb2RhbHNbZGF0YS5tb2RhbHMubGVuZ3RoIC0gMV0sXG4gICAgICAgICAgYmFja2Ryb3AgPSBfZGF0YSRtb2RhbHMuYmFja2Ryb3AsXG4gICAgICAgICAgZGlhbG9nID0gX2RhdGEkbW9kYWxzLmRpYWxvZztcbiAgICAgIGFyaWFIaWRkZW4oZmFsc2UsIGRpYWxvZyk7XG4gICAgICBhcmlhSGlkZGVuKGZhbHNlLCBiYWNrZHJvcCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5pc1RvcE1vZGFsID0gZnVuY3Rpb24gaXNUb3BNb2RhbChtb2RhbCkge1xuICAgIHJldHVybiAhIXRoaXMubW9kYWxzLmxlbmd0aCAmJiB0aGlzLm1vZGFsc1t0aGlzLm1vZGFscy5sZW5ndGggLSAxXSA9PT0gbW9kYWw7XG4gIH07XG5cbiAgcmV0dXJuIE1vZGFsTWFuYWdlcjtcbn0oKTtcblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxNYW5hZ2VyOyIsImltcG9ydCBvd25lckRvY3VtZW50IGZyb20gJ2RvbS1oZWxwZXJzL293bmVyRG9jdW1lbnQnO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmV4cG9ydCB2YXIgcmVzb2x2ZUNvbnRhaW5lclJlZiA9IGZ1bmN0aW9uIHJlc29sdmVDb250YWluZXJSZWYocmVmKSB7XG4gIHZhciBfcmVmO1xuXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gbnVsbDtcbiAgaWYgKHJlZiA9PSBudWxsKSByZXR1cm4gb3duZXJEb2N1bWVudCgpLmJvZHk7XG4gIGlmICh0eXBlb2YgcmVmID09PSAnZnVuY3Rpb24nKSByZWYgPSByZWYoKTtcbiAgaWYgKHJlZiAmJiAnY3VycmVudCcgaW4gcmVmKSByZWYgPSByZWYuY3VycmVudDtcbiAgaWYgKChfcmVmID0gcmVmKSAhPSBudWxsICYmIF9yZWYubm9kZVR5cGUpIHJldHVybiByZWYgfHwgbnVsbDtcbiAgcmV0dXJuIG51bGw7XG59O1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXNlV2FpdEZvckRPTVJlZihyZWYsIG9uUmVzb2x2ZWQpIHtcbiAgdmFyIF91c2VTdGF0ZSA9IHVzZVN0YXRlKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcmVzb2x2ZUNvbnRhaW5lclJlZihyZWYpO1xuICB9KSxcbiAgICAgIHJlc29sdmVkUmVmID0gX3VzZVN0YXRlWzBdLFxuICAgICAgc2V0UmVmID0gX3VzZVN0YXRlWzFdO1xuXG4gIGlmICghcmVzb2x2ZWRSZWYpIHtcbiAgICB2YXIgZWFybHlSZWYgPSByZXNvbHZlQ29udGFpbmVyUmVmKHJlZik7XG4gICAgaWYgKGVhcmx5UmVmKSBzZXRSZWYoZWFybHlSZWYpO1xuICB9XG5cbiAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAob25SZXNvbHZlZCAmJiByZXNvbHZlZFJlZikge1xuICAgICAgb25SZXNvbHZlZChyZXNvbHZlZFJlZik7XG4gICAgfVxuICB9LCBbb25SZXNvbHZlZCwgcmVzb2x2ZWRSZWZdKTtcbiAgdXNlRWZmZWN0KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbmV4dFJlZiA9IHJlc29sdmVDb250YWluZXJSZWYocmVmKTtcblxuICAgIGlmIChuZXh0UmVmICE9PSByZXNvbHZlZFJlZikge1xuICAgICAgc2V0UmVmKG5leHRSZWYpO1xuICAgIH1cbiAgfSwgW3JlZiwgcmVzb2x2ZWRSZWZdKTtcbiAgcmV0dXJuIHJlc29sdmVkUmVmO1xufSIsImltcG9ydCBfZXh0ZW5kcyBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vZXh0ZW5kc1wiO1xuaW1wb3J0IF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlXCI7XG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11c2UtYmVmb3JlLWRlZmluZSwgcmVhY3QvcHJvcC10eXBlcyAqL1xuaW1wb3J0IGFjdGl2ZUVsZW1lbnQgZnJvbSAnZG9tLWhlbHBlcnMvYWN0aXZlRWxlbWVudCc7XG5pbXBvcnQgY29udGFpbnMgZnJvbSAnZG9tLWhlbHBlcnMvY29udGFpbnMnO1xuaW1wb3J0IGNhblVzZURPTSBmcm9tICdkb20taGVscGVycy9jYW5Vc2VET00nO1xuaW1wb3J0IGxpc3RlbiBmcm9tICdkb20taGVscGVycy9saXN0ZW4nO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlUmVmLCB1c2VDYWxsYmFjaywgdXNlSW1wZXJhdGl2ZUhhbmRsZSwgZm9yd2FyZFJlZiwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgdXNlTW91bnRlZCBmcm9tICdAcmVzdGFydC9ob29rcy91c2VNb3VudGVkJztcbmltcG9ydCB1c2VXaWxsVW5tb3VudCBmcm9tICdAcmVzdGFydC9ob29rcy91c2VXaWxsVW5tb3VudCc7XG5pbXBvcnQgdXNlUHJldmlvdXMgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlUHJldmlvdXMnO1xuaW1wb3J0IHVzZUV2ZW50Q2FsbGJhY2sgZnJvbSAnQHJlc3RhcnQvaG9va3MvdXNlRXZlbnRDYWxsYmFjayc7XG5pbXBvcnQgTW9kYWxNYW5hZ2VyIGZyb20gJy4vTW9kYWxNYW5hZ2VyJztcbmltcG9ydCB1c2VXYWl0Rm9yRE9NUmVmIGZyb20gJy4vdXNlV2FpdEZvckRPTVJlZic7XG52YXIgbWFuYWdlcjtcblxuZnVuY3Rpb24gZ2V0TWFuYWdlcigpIHtcbiAgaWYgKCFtYW5hZ2VyKSBtYW5hZ2VyID0gbmV3IE1vZGFsTWFuYWdlcigpO1xuICByZXR1cm4gbWFuYWdlcjtcbn1cblxuZnVuY3Rpb24gdXNlTW9kYWxNYW5hZ2VyKHByb3ZpZGVkKSB7XG4gIHZhciBtb2RhbE1hbmFnZXIgPSBwcm92aWRlZCB8fCBnZXRNYW5hZ2VyKCk7XG4gIHZhciBtb2RhbCA9IHVzZVJlZih7XG4gICAgZGlhbG9nOiBudWxsLFxuICAgIGJhY2tkcm9wOiBudWxsXG4gIH0pO1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihtb2RhbC5jdXJyZW50LCB7XG4gICAgYWRkOiBmdW5jdGlvbiBhZGQoY29udGFpbmVyLCBjbGFzc05hbWUpIHtcbiAgICAgIHJldHVybiBtb2RhbE1hbmFnZXIuYWRkKG1vZGFsLmN1cnJlbnQsIGNvbnRhaW5lciwgY2xhc3NOYW1lKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmV0dXJuIG1vZGFsTWFuYWdlci5yZW1vdmUobW9kYWwuY3VycmVudCk7XG4gICAgfSxcbiAgICBpc1RvcE1vZGFsOiBmdW5jdGlvbiBpc1RvcE1vZGFsKCkge1xuICAgICAgcmV0dXJuIG1vZGFsTWFuYWdlci5pc1RvcE1vZGFsKG1vZGFsLmN1cnJlbnQpO1xuICAgIH0sXG4gICAgc2V0RGlhbG9nUmVmOiB1c2VDYWxsYmFjayhmdW5jdGlvbiAocmVmKSB7XG4gICAgICBtb2RhbC5jdXJyZW50LmRpYWxvZyA9IHJlZjtcbiAgICB9LCBbXSksXG4gICAgc2V0QmFja2Ryb3BSZWY6IHVzZUNhbGxiYWNrKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgIG1vZGFsLmN1cnJlbnQuYmFja2Ryb3AgPSByZWY7XG4gICAgfSwgW10pXG4gIH0pO1xufVxuXG52YXIgTW9kYWwgPSAvKiNfX1BVUkVfXyovZm9yd2FyZFJlZihmdW5jdGlvbiAoX3JlZiwgcmVmKSB7XG4gIHZhciBfcmVmJHNob3cgPSBfcmVmLnNob3csXG4gICAgICBzaG93ID0gX3JlZiRzaG93ID09PSB2b2lkIDAgPyBmYWxzZSA6IF9yZWYkc2hvdyxcbiAgICAgIF9yZWYkcm9sZSA9IF9yZWYucm9sZSxcbiAgICAgIHJvbGUgPSBfcmVmJHJvbGUgPT09IHZvaWQgMCA/ICdkaWFsb2cnIDogX3JlZiRyb2xlLFxuICAgICAgY2xhc3NOYW1lID0gX3JlZi5jbGFzc05hbWUsXG4gICAgICBzdHlsZSA9IF9yZWYuc3R5bGUsXG4gICAgICBjaGlsZHJlbiA9IF9yZWYuY2hpbGRyZW4sXG4gICAgICBfcmVmJGJhY2tkcm9wID0gX3JlZi5iYWNrZHJvcCxcbiAgICAgIGJhY2tkcm9wID0gX3JlZiRiYWNrZHJvcCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9yZWYkYmFja2Ryb3AsXG4gICAgICBfcmVmJGtleWJvYXJkID0gX3JlZi5rZXlib2FyZCxcbiAgICAgIGtleWJvYXJkID0gX3JlZiRrZXlib2FyZCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9yZWYka2V5Ym9hcmQsXG4gICAgICBvbkJhY2tkcm9wQ2xpY2sgPSBfcmVmLm9uQmFja2Ryb3BDbGljayxcbiAgICAgIG9uRXNjYXBlS2V5RG93biA9IF9yZWYub25Fc2NhcGVLZXlEb3duLFxuICAgICAgdHJhbnNpdGlvbiA9IF9yZWYudHJhbnNpdGlvbixcbiAgICAgIGJhY2tkcm9wVHJhbnNpdGlvbiA9IF9yZWYuYmFja2Ryb3BUcmFuc2l0aW9uLFxuICAgICAgX3JlZiRhdXRvRm9jdXMgPSBfcmVmLmF1dG9Gb2N1cyxcbiAgICAgIGF1dG9Gb2N1cyA9IF9yZWYkYXV0b0ZvY3VzID09PSB2b2lkIDAgPyB0cnVlIDogX3JlZiRhdXRvRm9jdXMsXG4gICAgICBfcmVmJGVuZm9yY2VGb2N1cyA9IF9yZWYuZW5mb3JjZUZvY3VzLFxuICAgICAgZW5mb3JjZUZvY3VzID0gX3JlZiRlbmZvcmNlRm9jdXMgPT09IHZvaWQgMCA/IHRydWUgOiBfcmVmJGVuZm9yY2VGb2N1cyxcbiAgICAgIF9yZWYkcmVzdG9yZUZvY3VzID0gX3JlZi5yZXN0b3JlRm9jdXMsXG4gICAgICByZXN0b3JlRm9jdXMgPSBfcmVmJHJlc3RvcmVGb2N1cyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9yZWYkcmVzdG9yZUZvY3VzLFxuICAgICAgcmVzdG9yZUZvY3VzT3B0aW9ucyA9IF9yZWYucmVzdG9yZUZvY3VzT3B0aW9ucyxcbiAgICAgIHJlbmRlckRpYWxvZyA9IF9yZWYucmVuZGVyRGlhbG9nLFxuICAgICAgX3JlZiRyZW5kZXJCYWNrZHJvcCA9IF9yZWYucmVuZGVyQmFja2Ryb3AsXG4gICAgICByZW5kZXJCYWNrZHJvcCA9IF9yZWYkcmVuZGVyQmFja2Ryb3AgPT09IHZvaWQgMCA/IGZ1bmN0aW9uIChwcm9wcykge1xuICAgIHJldHVybiAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBwcm9wcyk7XG4gIH0gOiBfcmVmJHJlbmRlckJhY2tkcm9wLFxuICAgICAgcHJvdmlkZWRNYW5hZ2VyID0gX3JlZi5tYW5hZ2VyLFxuICAgICAgY29udGFpbmVyUmVmID0gX3JlZi5jb250YWluZXIsXG4gICAgICBjb250YWluZXJDbGFzc05hbWUgPSBfcmVmLmNvbnRhaW5lckNsYXNzTmFtZSxcbiAgICAgIG9uU2hvdyA9IF9yZWYub25TaG93LFxuICAgICAgX3JlZiRvbkhpZGUgPSBfcmVmLm9uSGlkZSxcbiAgICAgIG9uSGlkZSA9IF9yZWYkb25IaWRlID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoKSB7fSA6IF9yZWYkb25IaWRlLFxuICAgICAgb25FeGl0ID0gX3JlZi5vbkV4aXQsXG4gICAgICBvbkV4aXRlZCA9IF9yZWYub25FeGl0ZWQsXG4gICAgICBvbkV4aXRpbmcgPSBfcmVmLm9uRXhpdGluZyxcbiAgICAgIG9uRW50ZXIgPSBfcmVmLm9uRW50ZXIsXG4gICAgICBvbkVudGVyaW5nID0gX3JlZi5vbkVudGVyaW5nLFxuICAgICAgb25FbnRlcmVkID0gX3JlZi5vbkVudGVyZWQsXG4gICAgICByZXN0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoX3JlZiwgW1wic2hvd1wiLCBcInJvbGVcIiwgXCJjbGFzc05hbWVcIiwgXCJzdHlsZVwiLCBcImNoaWxkcmVuXCIsIFwiYmFja2Ryb3BcIiwgXCJrZXlib2FyZFwiLCBcIm9uQmFja2Ryb3BDbGlja1wiLCBcIm9uRXNjYXBlS2V5RG93blwiLCBcInRyYW5zaXRpb25cIiwgXCJiYWNrZHJvcFRyYW5zaXRpb25cIiwgXCJhdXRvRm9jdXNcIiwgXCJlbmZvcmNlRm9jdXNcIiwgXCJyZXN0b3JlRm9jdXNcIiwgXCJyZXN0b3JlRm9jdXNPcHRpb25zXCIsIFwicmVuZGVyRGlhbG9nXCIsIFwicmVuZGVyQmFja2Ryb3BcIiwgXCJtYW5hZ2VyXCIsIFwiY29udGFpbmVyXCIsIFwiY29udGFpbmVyQ2xhc3NOYW1lXCIsIFwib25TaG93XCIsIFwib25IaWRlXCIsIFwib25FeGl0XCIsIFwib25FeGl0ZWRcIiwgXCJvbkV4aXRpbmdcIiwgXCJvbkVudGVyXCIsIFwib25FbnRlcmluZ1wiLCBcIm9uRW50ZXJlZFwiXSk7XG5cbiAgdmFyIGNvbnRhaW5lciA9IHVzZVdhaXRGb3JET01SZWYoY29udGFpbmVyUmVmKTtcbiAgdmFyIG1vZGFsID0gdXNlTW9kYWxNYW5hZ2VyKHByb3ZpZGVkTWFuYWdlcik7XG4gIHZhciBpc01vdW50ZWQgPSB1c2VNb3VudGVkKCk7XG4gIHZhciBwcmV2U2hvdyA9IHVzZVByZXZpb3VzKHNob3cpO1xuXG4gIHZhciBfdXNlU3RhdGUgPSB1c2VTdGF0ZSghc2hvdyksXG4gICAgICBleGl0ZWQgPSBfdXNlU3RhdGVbMF0sXG4gICAgICBzZXRFeGl0ZWQgPSBfdXNlU3RhdGVbMV07XG5cbiAgdmFyIGxhc3RGb2N1c1JlZiA9IHVzZVJlZihudWxsKTtcbiAgdXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbW9kYWw7XG4gIH0sIFttb2RhbF0pO1xuXG4gIGlmIChjYW5Vc2VET00gJiYgIXByZXZTaG93ICYmIHNob3cpIHtcbiAgICBsYXN0Rm9jdXNSZWYuY3VycmVudCA9IGFjdGl2ZUVsZW1lbnQoKTtcbiAgfVxuXG4gIGlmICghdHJhbnNpdGlvbiAmJiAhc2hvdyAmJiAhZXhpdGVkKSB7XG4gICAgc2V0RXhpdGVkKHRydWUpO1xuICB9IGVsc2UgaWYgKHNob3cgJiYgZXhpdGVkKSB7XG4gICAgc2V0RXhpdGVkKGZhbHNlKTtcbiAgfVxuXG4gIHZhciBoYW5kbGVTaG93ID0gdXNlRXZlbnRDYWxsYmFjayhmdW5jdGlvbiAoKSB7XG4gICAgbW9kYWwuYWRkKGNvbnRhaW5lciwgY29udGFpbmVyQ2xhc3NOYW1lKTtcbiAgICByZW1vdmVLZXlkb3duTGlzdGVuZXJSZWYuY3VycmVudCA9IGxpc3Rlbihkb2N1bWVudCwgJ2tleWRvd24nLCBoYW5kbGVEb2N1bWVudEtleURvd24pO1xuICAgIHJlbW92ZUZvY3VzTGlzdGVuZXJSZWYuY3VycmVudCA9IGxpc3Rlbihkb2N1bWVudCwgJ2ZvY3VzJywgLy8gdGhlIHRpbWVvdXQgaXMgbmVjZXNzYXJ5IGIvYyB0aGlzIHdpbGwgcnVuIGJlZm9yZSB0aGUgbmV3IG1vZGFsIGlzIG1vdW50ZWRcbiAgICAvLyBhbmQgc28gc3RlYWxzIGZvY3VzIGZyb20gaXRcbiAgICBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc2V0VGltZW91dChoYW5kbGVFbmZvcmNlRm9jdXMpO1xuICAgIH0sIHRydWUpO1xuXG4gICAgaWYgKG9uU2hvdykge1xuICAgICAgb25TaG93KCk7XG4gICAgfSAvLyBhdXRvZm9jdXMgYWZ0ZXIgb25TaG93IHRvIG5vdCB0cmlnZ2VyIGEgZm9jdXMgZXZlbnQgZm9yIHByZXZpb3VzXG4gICAgLy8gbW9kYWxzIGJlZm9yZSB0aGlzIG9uZSBpcyBzaG93bi5cblxuXG4gICAgaWYgKGF1dG9Gb2N1cykge1xuICAgICAgdmFyIGN1cnJlbnRBY3RpdmVFbGVtZW50ID0gYWN0aXZlRWxlbWVudChkb2N1bWVudCk7XG5cbiAgICAgIGlmIChtb2RhbC5kaWFsb2cgJiYgY3VycmVudEFjdGl2ZUVsZW1lbnQgJiYgIWNvbnRhaW5zKG1vZGFsLmRpYWxvZywgY3VycmVudEFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgIGxhc3RGb2N1c1JlZi5jdXJyZW50ID0gY3VycmVudEFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIG1vZGFsLmRpYWxvZy5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHZhciBoYW5kbGVIaWRlID0gdXNlRXZlbnRDYWxsYmFjayhmdW5jdGlvbiAoKSB7XG4gICAgbW9kYWwucmVtb3ZlKCk7XG4gICAgcmVtb3ZlS2V5ZG93bkxpc3RlbmVyUmVmLmN1cnJlbnQgPT0gbnVsbCA/IHZvaWQgMCA6IHJlbW92ZUtleWRvd25MaXN0ZW5lclJlZi5jdXJyZW50KCk7XG4gICAgcmVtb3ZlRm9jdXNMaXN0ZW5lclJlZi5jdXJyZW50ID09IG51bGwgPyB2b2lkIDAgOiByZW1vdmVGb2N1c0xpc3RlbmVyUmVmLmN1cnJlbnQoKTtcblxuICAgIGlmIChyZXN0b3JlRm9jdXMpIHtcbiAgICAgIHZhciBfbGFzdEZvY3VzUmVmJGN1cnJlbnQ7XG5cbiAgICAgIC8vIFN1cHBvcnQ6IDw9SUUxMSBkb2Vzbid0IHN1cHBvcnQgYGZvY3VzKClgIG9uIHN2ZyBlbGVtZW50cyAoUkI6ICM5MTcpXG4gICAgICAoX2xhc3RGb2N1c1JlZiRjdXJyZW50ID0gbGFzdEZvY3VzUmVmLmN1cnJlbnQpID09IG51bGwgPyB2b2lkIDAgOiBfbGFzdEZvY3VzUmVmJGN1cnJlbnQuZm9jdXMgPT0gbnVsbCA/IHZvaWQgMCA6IF9sYXN0Rm9jdXNSZWYkY3VycmVudC5mb2N1cyhyZXN0b3JlRm9jdXNPcHRpb25zKTtcbiAgICAgIGxhc3RGb2N1c1JlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gIH0pOyAvLyBUT0RPOiB0cnkgYW5kIGNvbWJpbmUgdGhlc2UgZWZmZWN0czogaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0LWJvb3RzdHJhcC9yZWFjdC1vdmVybGF5cy9wdWxsLzc5NCNkaXNjdXNzaW9uX3I0MDk5NTQxMjBcbiAgLy8gU2hvdyBsb2dpYyB3aGVuOlxuICAvLyAgLSBzaG93IGlzIGB0cnVlYCBfYW5kXyBgY29udGFpbmVyYCBoYXMgcmVzb2x2ZWRcblxuICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIGlmICghc2hvdyB8fCAhY29udGFpbmVyKSByZXR1cm47XG4gICAgaGFuZGxlU2hvdygpO1xuICB9LCBbc2hvdywgY29udGFpbmVyLFxuICAvKiBzaG91bGQgbmV2ZXIgY2hhbmdlOiAqL1xuICBoYW5kbGVTaG93XSk7IC8vIEhpZGUgY2xlYW51cCBsb2dpYyB3aGVuOlxuICAvLyAgLSBgZXhpdGVkYCBzd2l0Y2hlcyB0byB0cnVlXG4gIC8vICAtIGNvbXBvbmVudCB1bm1vdW50cztcblxuICB1c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgIGlmICghZXhpdGVkKSByZXR1cm47XG4gICAgaGFuZGxlSGlkZSgpO1xuICB9LCBbZXhpdGVkLCBoYW5kbGVIaWRlXSk7XG4gIHVzZVdpbGxVbm1vdW50KGZ1bmN0aW9uICgpIHtcbiAgICBoYW5kbGVIaWRlKCk7XG4gIH0pOyAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIHZhciBoYW5kbGVFbmZvcmNlRm9jdXMgPSB1c2VFdmVudENhbGxiYWNrKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIWVuZm9yY2VGb2N1cyB8fCAhaXNNb3VudGVkKCkgfHwgIW1vZGFsLmlzVG9wTW9kYWwoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjdXJyZW50QWN0aXZlRWxlbWVudCA9IGFjdGl2ZUVsZW1lbnQoKTtcblxuICAgIGlmIChtb2RhbC5kaWFsb2cgJiYgY3VycmVudEFjdGl2ZUVsZW1lbnQgJiYgIWNvbnRhaW5zKG1vZGFsLmRpYWxvZywgY3VycmVudEFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICBtb2RhbC5kaWFsb2cuZm9jdXMoKTtcbiAgICB9XG4gIH0pO1xuICB2YXIgaGFuZGxlQmFja2Ryb3BDbGljayA9IHVzZUV2ZW50Q2FsbGJhY2soZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQgIT09IGUuY3VycmVudFRhcmdldCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9uQmFja2Ryb3BDbGljayA9PSBudWxsID8gdm9pZCAwIDogb25CYWNrZHJvcENsaWNrKGUpO1xuXG4gICAgaWYgKGJhY2tkcm9wID09PSB0cnVlKSB7XG4gICAgICBvbkhpZGUoKTtcbiAgICB9XG4gIH0pO1xuICB2YXIgaGFuZGxlRG9jdW1lbnRLZXlEb3duID0gdXNlRXZlbnRDYWxsYmFjayhmdW5jdGlvbiAoZSkge1xuICAgIGlmIChrZXlib2FyZCAmJiBlLmtleUNvZGUgPT09IDI3ICYmIG1vZGFsLmlzVG9wTW9kYWwoKSkge1xuICAgICAgb25Fc2NhcGVLZXlEb3duID09IG51bGwgPyB2b2lkIDAgOiBvbkVzY2FwZUtleURvd24oZSk7XG5cbiAgICAgIGlmICghZS5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICAgIG9uSGlkZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHZhciByZW1vdmVGb2N1c0xpc3RlbmVyUmVmID0gdXNlUmVmKCk7XG4gIHZhciByZW1vdmVLZXlkb3duTGlzdGVuZXJSZWYgPSB1c2VSZWYoKTtcblxuICB2YXIgaGFuZGxlSGlkZGVuID0gZnVuY3Rpb24gaGFuZGxlSGlkZGVuKCkge1xuICAgIHNldEV4aXRlZCh0cnVlKTtcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBvbkV4aXRlZCA9PSBudWxsID8gdm9pZCAwIDogb25FeGl0ZWQuYXBwbHkodm9pZCAwLCBhcmdzKTtcbiAgfTtcblxuICB2YXIgVHJhbnNpdGlvbiA9IHRyYW5zaXRpb247XG5cbiAgaWYgKCFjb250YWluZXIgfHwgIShzaG93IHx8IFRyYW5zaXRpb24gJiYgIWV4aXRlZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBkaWFsb2dQcm9wcyA9IF9leHRlbmRzKHtcbiAgICByb2xlOiByb2xlLFxuICAgIHJlZjogbW9kYWwuc2V0RGlhbG9nUmVmLFxuICAgIC8vIGFwcGFyZW50bHkgb25seSB3b3JrcyBvbiB0aGUgZGlhbG9nIHJvbGUgZWxlbWVudFxuICAgICdhcmlhLW1vZGFsJzogcm9sZSA9PT0gJ2RpYWxvZycgPyB0cnVlIDogdW5kZWZpbmVkXG4gIH0sIHJlc3QsIHtcbiAgICBzdHlsZTogc3R5bGUsXG4gICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgdGFiSW5kZXg6IC0xXG4gIH0pO1xuXG4gIHZhciBkaWFsb2cgPSByZW5kZXJEaWFsb2cgPyByZW5kZXJEaWFsb2coZGlhbG9nUHJvcHMpIDogLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgZGlhbG9nUHJvcHMsIC8qI19fUFVSRV9fKi9SZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGRyZW4sIHtcbiAgICByb2xlOiAnZG9jdW1lbnQnXG4gIH0pKTtcblxuICBpZiAoVHJhbnNpdGlvbikge1xuICAgIGRpYWxvZyA9IC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFRyYW5zaXRpb24sIHtcbiAgICAgIGFwcGVhcjogdHJ1ZSxcbiAgICAgIHVubW91bnRPbkV4aXQ6IHRydWUsXG4gICAgICBcImluXCI6ICEhc2hvdyxcbiAgICAgIG9uRXhpdDogb25FeGl0LFxuICAgICAgb25FeGl0aW5nOiBvbkV4aXRpbmcsXG4gICAgICBvbkV4aXRlZDogaGFuZGxlSGlkZGVuLFxuICAgICAgb25FbnRlcjogb25FbnRlcixcbiAgICAgIG9uRW50ZXJpbmc6IG9uRW50ZXJpbmcsXG4gICAgICBvbkVudGVyZWQ6IG9uRW50ZXJlZFxuICAgIH0sIGRpYWxvZyk7XG4gIH1cblxuICB2YXIgYmFja2Ryb3BFbGVtZW50ID0gbnVsbDtcblxuICBpZiAoYmFja2Ryb3ApIHtcbiAgICB2YXIgQmFja2Ryb3BUcmFuc2l0aW9uID0gYmFja2Ryb3BUcmFuc2l0aW9uO1xuICAgIGJhY2tkcm9wRWxlbWVudCA9IHJlbmRlckJhY2tkcm9wKHtcbiAgICAgIHJlZjogbW9kYWwuc2V0QmFja2Ryb3BSZWYsXG4gICAgICBvbkNsaWNrOiBoYW5kbGVCYWNrZHJvcENsaWNrXG4gICAgfSk7XG5cbiAgICBpZiAoQmFja2Ryb3BUcmFuc2l0aW9uKSB7XG4gICAgICBiYWNrZHJvcEVsZW1lbnQgPSAvKiNfX1BVUkVfXyovUmVhY3QuY3JlYXRlRWxlbWVudChCYWNrZHJvcFRyYW5zaXRpb24sIHtcbiAgICAgICAgYXBwZWFyOiB0cnVlLFxuICAgICAgICBcImluXCI6ICEhc2hvd1xuICAgICAgfSwgYmFja2Ryb3BFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIC8qI19fUFVSRV9fKi9SZWFjdERPTS5jcmVhdGVQb3J0YWwoIC8qI19fUFVSRV9fKi9SZWFjdC5jcmVhdGVFbGVtZW50KFJlYWN0LkZyYWdtZW50LCBudWxsLCBiYWNrZHJvcEVsZW1lbnQsIGRpYWxvZyksIGNvbnRhaW5lcikpO1xufSk7XG52YXIgcHJvcFR5cGVzID0ge1xuICAvKipcbiAgICogU2V0IHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBNb2RhbFxuICAgKi9cbiAgc2hvdzogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIEEgRE9NIGVsZW1lbnQsIGEgYHJlZmAgdG8gYW4gZWxlbWVudCwgb3IgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGVpdGhlci4gVGhlIE1vZGFsIGlzIGFwcGVuZGVkIHRvIGl0J3MgYGNvbnRhaW5lcmAgZWxlbWVudC5cbiAgICpcbiAgICogRm9yIHRoZSBzYWtlIG9mIGFzc2lzdGl2ZSB0ZWNobm9sb2dpZXMsIHRoZSBjb250YWluZXIgc2hvdWxkIHVzdWFsbHkgYmUgdGhlIGRvY3VtZW50IGJvZHksIHNvIHRoYXQgdGhlIHJlc3Qgb2YgdGhlXG4gICAqIHBhZ2UgY29udGVudCBjYW4gYmUgcGxhY2VkIGJlaGluZCBhIHZpcnR1YWwgYmFja2Ryb3AgYXMgd2VsbCBhcyBhIHZpc3VhbCBvbmUuXG4gICAqL1xuICBjb250YWluZXI6IFByb3BUeXBlcy5hbnksXG5cbiAgLyoqXG4gICAqIEEgY2FsbGJhY2sgZmlyZWQgd2hlbiB0aGUgTW9kYWwgaXMgb3BlbmluZy5cbiAgICovXG4gIG9uU2hvdzogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIEEgY2FsbGJhY2sgZmlyZWQgd2hlbiBlaXRoZXIgdGhlIGJhY2tkcm9wIGlzIGNsaWNrZWQsIG9yIHRoZSBlc2NhcGUga2V5IGlzIHByZXNzZWQuXG4gICAqXG4gICAqIFRoZSBgb25IaWRlYCBjYWxsYmFjayBvbmx5IHNpZ25hbHMgaW50ZW50IGZyb20gdGhlIE1vZGFsLFxuICAgKiB5b3UgbXVzdCBhY3R1YWxseSBzZXQgdGhlIGBzaG93YCBwcm9wIHRvIGBmYWxzZWAgZm9yIHRoZSBNb2RhbCB0byBjbG9zZS5cbiAgICovXG4gIG9uSGlkZTogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIEluY2x1ZGUgYSBiYWNrZHJvcCBjb21wb25lbnQuXG4gICAqL1xuICBiYWNrZHJvcDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmJvb2wsIFByb3BUeXBlcy5vbmVPZihbJ3N0YXRpYyddKV0pLFxuXG4gIC8qKlxuICAgKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgZGlhbG9nIGNvbXBvbmVudC4gVXNlZnVsIGZvciBjdXN0b21cbiAgICogcmVuZGVyaW5nLiAqKk5vdGU6KiogdGhlIGNvbXBvbmVudCBzaG91bGQgbWFrZSBzdXJlIHRvIGFwcGx5IHRoZSBwcm92aWRlZCByZWYuXG4gICAqXG4gICAqIGBgYGpzIHN0YXRpY1xuICAgKiByZW5kZXJEaWFsb2c9e3Byb3BzID0+IDxNeURpYWxvZyB7Li4ucHJvcHN9IC8+fVxuICAgKiBgYGBcbiAgICovXG4gIHJlbmRlckRpYWxvZzogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgYmFja2Ryb3AgY29tcG9uZW50LiBVc2VmdWwgZm9yIGN1c3RvbVxuICAgKiBiYWNrZHJvcCByZW5kZXJpbmcuXG4gICAqXG4gICAqIGBgYGpzXG4gICAqICByZW5kZXJCYWNrZHJvcD17cHJvcHMgPT4gPE15QmFja2Ryb3Agey4uLnByb3BzfSAvPn1cbiAgICogYGBgXG4gICAqL1xuICByZW5kZXJCYWNrZHJvcDogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIEEgY2FsbGJhY2sgZmlyZWQgd2hlbiB0aGUgZXNjYXBlIGtleSwgaWYgc3BlY2lmaWVkIGluIGBrZXlib2FyZGAsIGlzIHByZXNzZWQuXG4gICAqXG4gICAqIElmIHByZXZlbnREZWZhdWx0KCkgaXMgY2FsbGVkIG9uIHRoZSBrZXlib2FyZCBldmVudCwgY2xvc2luZyB0aGUgbW9kYWwgd2lsbCBiZSBjYW5jZWxsZWQuXG4gICAqL1xuICBvbkVzY2FwZUtleURvd246IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBBIGNhbGxiYWNrIGZpcmVkIHdoZW4gdGhlIGJhY2tkcm9wLCBpZiBzcGVjaWZpZWQsIGlzIGNsaWNrZWQuXG4gICAqL1xuICBvbkJhY2tkcm9wQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBBIGNzcyBjbGFzcyBvciBzZXQgb2YgY2xhc3NlcyBhcHBsaWVkIHRvIHRoZSBtb2RhbCBjb250YWluZXIgd2hlbiB0aGUgbW9kYWwgaXMgb3BlbixcbiAgICogYW5kIHJlbW92ZWQgd2hlbiBpdCBpcyBjbG9zZWQuXG4gICAqL1xuICBjb250YWluZXJDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgLyoqXG4gICAqIENsb3NlIHRoZSBtb2RhbCB3aGVuIGVzY2FwZSBrZXkgaXMgcHJlc3NlZFxuICAgKi9cbiAga2V5Ym9hcmQ6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBBIGByZWFjdC10cmFuc2l0aW9uLWdyb3VwQDIuMC4wYCBgPFRyYW5zaXRpb24vPmAgY29tcG9uZW50IHVzZWRcbiAgICogdG8gY29udHJvbCBhbmltYXRpb25zIGZvciB0aGUgZGlhbG9nIGNvbXBvbmVudC5cbiAgICovXG4gIHRyYW5zaXRpb246IFByb3BUeXBlcy5lbGVtZW50VHlwZSxcblxuICAvKipcbiAgICogQSBgcmVhY3QtdHJhbnNpdGlvbi1ncm91cEAyLjAuMGAgYDxUcmFuc2l0aW9uLz5gIGNvbXBvbmVudCB1c2VkXG4gICAqIHRvIGNvbnRyb2wgYW5pbWF0aW9ucyBmb3IgdGhlIGJhY2tkcm9wIGNvbXBvbmVudHMuXG4gICAqL1xuICBiYWNrZHJvcFRyYW5zaXRpb246IFByb3BUeXBlcy5lbGVtZW50VHlwZSxcblxuICAvKipcbiAgICogV2hlbiBgdHJ1ZWAgVGhlIG1vZGFsIHdpbGwgYXV0b21hdGljYWxseSBzaGlmdCBmb2N1cyB0byBpdHNlbGYgd2hlbiBpdCBvcGVucywgYW5kXG4gICAqIHJlcGxhY2UgaXQgdG8gdGhlIGxhc3QgZm9jdXNlZCBlbGVtZW50IHdoZW4gaXQgY2xvc2VzLiBUaGlzIGFsc29cbiAgICogd29ya3MgY29ycmVjdGx5IHdpdGggYW55IE1vZGFsIGNoaWxkcmVuIHRoYXQgaGF2ZSB0aGUgYGF1dG9Gb2N1c2AgcHJvcC5cbiAgICpcbiAgICogR2VuZXJhbGx5IHRoaXMgc2hvdWxkIG5ldmVyIGJlIHNldCB0byBgZmFsc2VgIGFzIGl0IG1ha2VzIHRoZSBNb2RhbCBsZXNzXG4gICAqIGFjY2Vzc2libGUgdG8gYXNzaXN0aXZlIHRlY2hub2xvZ2llcywgbGlrZSBzY3JlZW4gcmVhZGVycy5cbiAgICovXG4gIGF1dG9Gb2N1czogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIFdoZW4gYHRydWVgIFRoZSBtb2RhbCB3aWxsIHByZXZlbnQgZm9jdXMgZnJvbSBsZWF2aW5nIHRoZSBNb2RhbCB3aGlsZSBvcGVuLlxuICAgKlxuICAgKiBHZW5lcmFsbHkgdGhpcyBzaG91bGQgbmV2ZXIgYmUgc2V0IHRvIGBmYWxzZWAgYXMgaXQgbWFrZXMgdGhlIE1vZGFsIGxlc3NcbiAgICogYWNjZXNzaWJsZSB0byBhc3Npc3RpdmUgdGVjaG5vbG9naWVzLCBsaWtlIHNjcmVlbiByZWFkZXJzLlxuICAgKi9cbiAgZW5mb3JjZUZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogV2hlbiBgdHJ1ZWAgVGhlIG1vZGFsIHdpbGwgcmVzdG9yZSBmb2N1cyB0byBwcmV2aW91c2x5IGZvY3VzZWQgZWxlbWVudCBvbmNlXG4gICAqIG1vZGFsIGlzIGhpZGRlblxuICAgKi9cbiAgcmVzdG9yZUZvY3VzOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICogT3B0aW9ucyBwYXNzZWQgdG8gZm9jdXMgZnVuY3Rpb24gd2hlbiBgcmVzdG9yZUZvY3VzYCBpcyBzZXQgdG8gYHRydWVgXG4gICAqXG4gICAqIEBsaW5rICBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTEVsZW1lbnQvZm9jdXMjUGFyYW1ldGVyc1xuICAgKi9cbiAgcmVzdG9yZUZvY3VzT3B0aW9uczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBwcmV2ZW50U2Nyb2xsOiBQcm9wVHlwZXMuYm9vbFxuICB9KSxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgZmlyZWQgYmVmb3JlIHRoZSBNb2RhbCB0cmFuc2l0aW9ucyBpblxuICAgKi9cbiAgb25FbnRlcjogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZpcmVkIGFzIHRoZSBNb2RhbCBiZWdpbnMgdG8gdHJhbnNpdGlvbiBpblxuICAgKi9cbiAgb25FbnRlcmluZzogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZpcmVkIGFmdGVyIHRoZSBNb2RhbCBmaW5pc2hlcyB0cmFuc2l0aW9uaW5nIGluXG4gICAqL1xuICBvbkVudGVyZWQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmaXJlZCByaWdodCBiZWZvcmUgdGhlIE1vZGFsIHRyYW5zaXRpb25zIG91dFxuICAgKi9cbiAgb25FeGl0OiBQcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgZmlyZWQgYXMgdGhlIE1vZGFsIGJlZ2lucyB0byB0cmFuc2l0aW9uIG91dFxuICAgKi9cbiAgb25FeGl0aW5nOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgZmlyZWQgYWZ0ZXIgdGhlIE1vZGFsIGZpbmlzaGVzIHRyYW5zaXRpb25pbmcgb3V0XG4gICAqL1xuICBvbkV4aXRlZDogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAqIEEgTW9kYWxNYW5hZ2VyIGluc3RhbmNlIHVzZWQgdG8gdHJhY2sgYW5kIG1hbmFnZSB0aGUgc3RhdGUgb2Ygb3BlblxuICAgKiBNb2RhbHMuIFVzZWZ1bCB3aGVuIGN1c3RvbWl6aW5nIGhvdyBtb2RhbHMgaW50ZXJhY3Qgd2l0aGluIGEgY29udGFpbmVyXG4gICAqL1xuICBtYW5hZ2VyOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihNb2RhbE1hbmFnZXIpXG59O1xuTW9kYWwuZGlzcGxheU5hbWUgPSAnTW9kYWwnO1xuTW9kYWwucHJvcFR5cGVzID0gcHJvcFR5cGVzO1xuZXhwb3J0IGRlZmF1bHQgT2JqZWN0LmFzc2lnbihNb2RhbCwge1xuICBNYW5hZ2VyOiBNb2RhbE1hbmFnZXJcbn0pOyIsImV4cG9ydCBkZWZhdWx0IFwiZGF0YTppbWFnZS9zdmcreG1sLCUzQ3N2ZyUyMHdpZHRoJTNEJTIyMzIlMjIlMjBoZWlnaHQlM0QlMjIzMiUyMiUyMHZpZXdCb3glM0QlMjIwJTIwMCUyMDMyJTIwMzIlMjIlMjBmaWxsJTNEJTIybm9uZSUyMiUyMHhtbG5zJTNEJTIyaHR0cCUzQSUyRiUyRnd3dy53My5vcmclMkYyMDAwJTJGc3ZnJTIyJTNFJTIwJTIwJTIwJTIwJTNDcGF0aCUyMGZpbGwtcnVsZSUzRCUyMmV2ZW5vZGQlMjIlMjBjbGlwLXJ1bGUlM0QlMjJldmVub2RkJTIyJTIwZCUzRCUyMk0xOC4yMjIyJTIwMTYuMDAwM0wyNi41Mzk3JTIwNy42ODI4QzI3LjE1NDElMjA3LjA2ODM4JTIwMjcuMTU0MSUyMDYuMDc1MjQlMjAyNi41Mzk3JTIwNS40NjA4MkMyNS45MjUzJTIwNC44NDYzOSUyMDI0LjkzMjElMjA0Ljg0NjM5JTIwMjQuMzE3NyUyMDUuNDYwODJMMTYuMDAwMiUyMDEzLjc3ODNMNy42ODI3OSUyMDUuNDYwODJDNy4wNjgzNyUyMDQuODQ2MzklMjA2LjA3NTI0JTIwNC44NDYzOSUyMDUuNDYwODIlMjA1LjQ2MDgyQzQuODQ2MzklMjA2LjA3NTI0JTIwNC44NDYzOSUyMDcuMDY4MzglMjA1LjQ2MDgyJTIwNy42ODI4TDEzLjc3ODMlMjAxNi4wMDAzTDUuNDYwODIlMjAyNC4zMTc4QzQuODQ2MzklMjAyNC45MzIzJTIwNC44NDYzOSUyMDI1LjkyNTQlMjA1LjQ2MDgyJTIwMjYuNTM5OEM1Ljc2NzI0JTIwMjYuODQ2MyUyMDYuMTY5NTIlMjAyNy4wMDAzJTIwNi41NzE4JTIwMjcuMDAwM0M2Ljk3NDA4JTIwMjcuMDAwMyUyMDcuMzc2MzYlMjAyNi44NDYzJTIwNy42ODI3OSUyMDI2LjUzOThMMTYuMDAwMiUyMDE4LjIyMjNMMjQuMzE3NyUyMDI2LjUzOThDMjQuNjI0MSUyMDI2Ljg0NjMlMjAyNS4wMjY0JTIwMjcuMDAwMyUyMDI1LjQyODclMjAyNy4wMDAzQzI1LjgzMSUyMDI3LjAwMDMlMjAyNi4yMzMzJTIwMjYuODQ2MyUyMDI2LjUzOTclMjAyNi41Mzk4QzI3LjE1NDElMjAyNS45MjU0JTIwMjcuMTU0MSUyMDI0LjkzMjMlMjAyNi41Mzk3JTIwMjQuMzE3OEwxOC4yMjIyJTIwMTYuMDAwM1olMjIlMjBmaWxsJTNEJTIyd2hpdGUlMjIlMkYlM0UlM0MlMkZzdmclM0VcIiIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgUmVhY3QsIHsgY3JlYXRlRWxlbWVudCwgUmVhY3RFbGVtZW50LCB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IE1vZGFsLCB7IE1vZGFsUHJvcHMsIFJlbmRlck1vZGFsQmFja2Ryb3BQcm9wcyB9IGZyb20gXCJyZWFjdC1vdmVybGF5cy9Nb2RhbFwiO1xuXG5pbXBvcnQgY2xvc2VJY29uU3ZnIGZyb20gXCIuLi9hc3NldHMvaWMyNC1jbG9zZS5zdmdcIjtcblxuZXhwb3J0IGludGVyZmFjZSBMaWdodGJveFByb3BzIHtcbiAgICBjaGlsZHJlbjogUmVhY3RFbGVtZW50O1xuICAgIGlzT3BlbjogYm9vbGVhbjtcbiAgICBvbkNsb3NlOiBSZW5kZXJCYWNrZHJvcFdpdGhDbG9zZVByb3BzW1wib25DbG9zZVwiXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZW5kZXJCYWNrZHJvcFdpdGhDbG9zZVByb3BzIGV4dGVuZHMgUmVuZGVyTW9kYWxCYWNrZHJvcFByb3BzIHtcbiAgICAvLyBgZXZlbnRgIGlzIG9wdGlvbmFsIGhlcmUgYmVjYXVzZSBgTW9kYWxQcm9wc1snb25IaWRlJ10gZG9lcyBub3QgcmVxdWlyZSBpdCwgYnV0IGlzXG4gICAgLy8gcHJlY2VlZGVkIGJ5IGBNb2RhbFByb3BzWydvbkJhY2tkcm9wQ2xpY2snXWAgdGhhdCB3aWxsIHByZXZlbnQgdGhlIGV2ZW50IHByb3BhZ2F0aW9uLlxuICAgIG9uQ2xvc2U6IChldmVudD86IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQsIE1vdXNlRXZlbnQ+KSA9PiB2b2lkO1xufVxuXG4vKipcbiAqIFRoZSBgb25DbGlja2AgaGVyZSBpcyBwcm92aWRlZCBieSB0aGUgYG9uSGlkZWAgZnJvbSB0aGUgTW9kYWwgcHJvcHMuIEJ1dCB1bmZvcnR1bmF0ZWx5IGl0IG9ubHkgd29ya3NcbiAqIGZvciB0aGUgYWN0dWFsIGJhY2tkcm9wIGFuZCBub3QgZm9yIG90aGVyIGVsZW1lbnRzIGR1ZSB0byBhIGBlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0YCBjaGVjayBpblxuICogdGhlIGxpYnJhcnkuIFRoZXJlZm9yZSwgd2UgZXh0ZW5kIGl0IHdpdGggYW4gYWRkaXRpb25hbCBgb25DbG9zZWAgcHJvcCBmb3Igb3VyIGNsb3NlIGJ1dHRvbi5cbiAqL1xuZnVuY3Rpb24gQmFja2Ryb3BXaXRoQ2xvc2UoeyBvbkNsb3NlLCAuLi5yZXN0UHJvcHMgfTogUmVuZGVyQmFja2Ryb3BXaXRoQ2xvc2VQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJteC1pbWFnZS12aWV3ZXItbGlnaHRib3gtYmFja2Ryb3BcIiB7Li4ucmVzdFByb3BzfT5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiYnRuIGJ0bi1pbWFnZSBidG4taWNvbiBjbG9zZS1idXR0b25cIil9IG9uQ2xpY2s9e29uQ2xvc2V9PlxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPXtjbG9zZUljb25Tdmd9IGNsYXNzTmFtZT17XCJyZW1vdmVJY29uXCJ9IGFsdD1cIkNsb3NlIGljb24gZm9yIHRoZSBmdWxsIHNjcmVlbiBpbWFnZSBsaWdodGJveFwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExpZ2h0Ym94KHsgaXNPcGVuLCBvbkNsb3NlLCBjaGlsZHJlbiB9OiBMaWdodGJveFByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCByZW5kZXJCYWNrZHJvcFdpdGhDbG9zZSA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAocHJvcHM6IFJlbmRlck1vZGFsQmFja2Ryb3BQcm9wcykgPT4gPEJhY2tkcm9wV2l0aENsb3NlIG9uQ2xvc2U9e29uQ2xvc2V9IHsuLi5wcm9wc30gLz4sXG4gICAgICAgIFtvbkNsb3NlXVxuICAgICk7XG5cbiAgICAvLyBUaGlzIGlzIHRvIHByZXZlbnQgb24gY2xpY2sgZnJvbSBjb250YWluZXJzIHdoZW4gY2xpY2tpbmcgb24gdGhlIGJhY2tkcm9wLlxuICAgIGNvbnN0IHByZXZlbnRCYWNrZHJvcEV2ZW50UHJvcGFnYXRpb24gPSB1c2VDYWxsYmFjazxFeGNsdWRlPE1vZGFsUHJvcHNbXCJvbkJhY2tkcm9wQ2xpY2tcIl0sIHVuZGVmaW5lZD4+KGV2ZW50ID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPE1vZGFsXG4gICAgICAgICAgICBzaG93PXtpc09wZW59XG4gICAgICAgICAgICBvbkhpZGU9e29uQ2xvc2V9XG4gICAgICAgICAgICByZW5kZXJCYWNrZHJvcD17cmVuZGVyQmFja2Ryb3BXaXRoQ2xvc2V9XG4gICAgICAgICAgICBvbkJhY2tkcm9wQ2xpY2s9e3ByZXZlbnRCYWNrZHJvcEV2ZW50UHJvcGFnYXRpb259XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJteC1pbWFnZS12aWV3ZXItbGlnaHRib3hcIlxuICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2PntjaGlsZHJlbn08L2Rpdj5cbiAgICAgICAgPC9Nb2RhbD5cbiAgICApO1xufVxuIiwiaW1wb3J0IHsgY2xvbmVFbGVtZW50LCBjcmVhdGVFbGVtZW50LCBDU1NQcm9wZXJ0aWVzLCBGdW5jdGlvbkNvbXBvbmVudCwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEhlaWdodFVuaXRFbnVtLCBXaWR0aFVuaXRFbnVtLCBPbkNsaWNrVHlwZUVudW0sIERpc3BsYXlBc0VudW0gfSBmcm9tIFwiLi4vLi4vLi4vdHlwaW5ncy9JbWFnZVZpZXdlclByb3BzXCI7XG5pbXBvcnQgeyB1c2VMaWdodGJveFN0YXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2xpZ2h0Ym94U3RhdGVcIjtcbmltcG9ydCB7IEltYWdlVmlld2VyVWksIEltYWdlVmlld2VyQ29udGVudFByb3BzIH0gZnJvbSBcIi4vdWlcIjtcbmltcG9ydCB7IExpZ2h0Ym94LCBMaWdodGJveFByb3BzIH0gZnJvbSBcIi4uL0xpZ2h0Ym94XCI7XG5cbmltcG9ydCBcIi4uLy4uL3VpL0ltYWdlVmlld2VyLnNjc3NcIjtcblxuZXhwb3J0IHR5cGUgSW1hZ2VWaWV3ZXJJbWFnZVByb3BzID0ge1xuICAgIHR5cGU6IFwiaW1hZ2VcIiB8IFwiaWNvblwiO1xuICAgIGltYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlVmlld2VyUHJvcHMgZXh0ZW5kcyBJbWFnZVZpZXdlckltYWdlUHJvcHMge1xuICAgIGNsYXNzOiBzdHJpbmc7XG4gICAgc3R5bGU/OiBDU1NQcm9wZXJ0aWVzO1xuICAgIHdpZHRoVW5pdDogV2lkdGhVbml0RW51bTtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodFVuaXQ6IEhlaWdodFVuaXRFbnVtO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICAgIGljb25TaXplOiBudW1iZXI7XG4gICAgcmVzcG9uc2l2ZTogYm9vbGVhbjtcbiAgICBvbkNsaWNrVHlwZTogT25DbGlja1R5cGVFbnVtO1xuICAgIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xuICAgIGFsdFRleHQ/OiBzdHJpbmc7XG4gICAgZGlzcGxheUFzOiBEaXNwbGF5QXNFbnVtO1xuICAgIHByZXZpZXdNb2RlPzogYm9vbGVhbjtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0ltYWdlTGluayhpbWFnZUxpbms6IHN0cmluZyB8IHVuZGVmaW5lZCwgZGlzcGxheUFzOiBEaXNwbGF5QXNFbnVtKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWltYWdlTGluayB8fCBkaXNwbGF5QXMgPT09IFwiZnVsbEltYWdlXCIpIHtcbiAgICAgICAgcmV0dXJuIGltYWdlTGluaztcbiAgICB9XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChpbWFnZUxpbmspO1xuICAgIHVybC5zZWFyY2hQYXJhbXMuYXBwZW5kKFwidGh1bWJcIiwgXCJ0cnVlXCIpO1xuICAgIHJldHVybiB1cmwuaHJlZjtcbn1cblxuZXhwb3J0IGNvbnN0IEltYWdlVmlld2VyOiBGdW5jdGlvbkNvbXBvbmVudDxJbWFnZVZpZXdlclByb3BzPiA9ICh7XG4gICAgY2xhc3M6IGNsYXNzTmFtZSxcbiAgICBzdHlsZSxcbiAgICB3aWR0aFVuaXQsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0VW5pdCxcbiAgICBoZWlnaHQsXG4gICAgaWNvblNpemUsXG4gICAgcmVzcG9uc2l2ZSxcbiAgICBvbkNsaWNrVHlwZSxcbiAgICBvbkNsaWNrLFxuICAgIHR5cGUsXG4gICAgaW1hZ2UsXG4gICAgYWx0VGV4dCxcbiAgICBkaXNwbGF5QXMsXG4gICAgcHJldmlld01vZGVcbn0pID0+IHtcbiAgICBjb25zdCB7IGxpZ2h0Ym94SXNPcGVuLCBvcGVuTGlnaHRib3gsIGNsb3NlTGlnaHRib3ggfSA9IHVzZUxpZ2h0Ym94U3RhdGUoKTtcblxuICAgIGNvbnN0IG9uQ2xvc2VMaWdodGJveCA9IHVzZUNhbGxiYWNrPExpZ2h0Ym94UHJvcHNbXCJvbkNsb3NlXCJdPihcbiAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQ/LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgY2xvc2VMaWdodGJveCgpO1xuICAgICAgICB9LFxuICAgICAgICBbY2xvc2VMaWdodGJveF1cbiAgICApO1xuXG4gICAgY29uc3Qgb25JbWFnZUNsaWNrID0gdXNlQ2FsbGJhY2s8RXhjbHVkZTxJbWFnZVZpZXdlckNvbnRlbnRQcm9wc1tcIm9uQ2xpY2tcIl0sIHVuZGVmaW5lZD4+KFxuICAgICAgICBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGlmIChvbkNsaWNrVHlwZSA9PT0gXCJhY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIG9uQ2xpY2s/LigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvbkNsaWNrVHlwZSA9PT0gXCJlbmxhcmdlXCIpIHtcbiAgICAgICAgICAgICAgICBvcGVuTGlnaHRib3goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW29uQ2xpY2ssIG9uQ2xpY2tUeXBlLCBvcGVuTGlnaHRib3hdXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc0NsaWNrSGFuZGxlciA9IChvbkNsaWNrVHlwZSA9PT0gXCJhY3Rpb25cIiAmJiBvbkNsaWNrKSB8fCBvbkNsaWNrVHlwZSA9PT0gXCJlbmxhcmdlXCI7XG4gICAgY29uc3Qgc2hhcmVkQ29udGVudFByb3BzOiBJbWFnZVZpZXdlckNvbnRlbnRQcm9wcyA9IHtcbiAgICAgICAgc3R5bGUsXG4gICAgICAgIG9uQ2xpY2s6IGhhc0NsaWNrSGFuZGxlciA/IG9uSW1hZ2VDbGljayA6IHVuZGVmaW5lZCxcbiAgICAgICAgYWx0VGV4dFxuICAgIH07XG5cbiAgICBjb25zdCBjb250ZW50ID1cbiAgICAgICAgdHlwZSA9PT0gXCJpbWFnZVwiID8gKFxuICAgICAgICAgICAgPEltYWdlVmlld2VyVWkuSW1hZ2VcbiAgICAgICAgICAgICAgICBpbWFnZT17cHJvY2Vzc0ltYWdlTGluayhpbWFnZSwgZGlzcGxheUFzKX1cbiAgICAgICAgICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgICAgICAgICBoZWlnaHRVbml0PXtoZWlnaHRVbml0fVxuICAgICAgICAgICAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAgICAgICAgICAgICB3aWR0aFVuaXQ9e3dpZHRoVW5pdH1cbiAgICAgICAgICAgICAgICB7Li4uc2hhcmVkQ29udGVudFByb3BzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxJbWFnZVZpZXdlclVpLkdseXBoaWNvbiBpY29uPXtpbWFnZX0gc2l6ZT17aWNvblNpemV9IHsuLi5zaGFyZWRDb250ZW50UHJvcHN9IC8+XG4gICAgICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8SW1hZ2VWaWV3ZXJVaS5XcmFwcGVyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICAgIHJlc3BvbnNpdmU9e3Jlc3BvbnNpdmV9XG4gICAgICAgICAgICBoYXNJbWFnZT17aW1hZ2UgIT09IHVuZGVmaW5lZCAmJiBpbWFnZS5sZW5ndGggPiAwfVxuICAgICAgICA+XG4gICAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgICAgIHshcHJldmlld01vZGUgJiYgbGlnaHRib3hJc09wZW4gJiYgKFxuICAgICAgICAgICAgICAgIDxMaWdodGJveCBpc09wZW49e2xpZ2h0Ym94SXNPcGVufSBvbkNsb3NlPXtvbkNsb3NlTGlnaHRib3h9PlxuICAgICAgICAgICAgICAgICAgICB7dHlwZSA9PT0gXCJpbWFnZVwiID8gY2xvbmVFbGVtZW50KGNvbnRlbnQsIHsgaW1hZ2UsIG9uQ2xpY2s6IHVuZGVmaW5lZCB9KSA6IGNvbnRlbnR9XG4gICAgICAgICAgICAgICAgPC9MaWdodGJveD5cbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvSW1hZ2VWaWV3ZXJVaS5XcmFwcGVyPlxuICAgICk7XG59O1xuIiwiaW1wb3J0IHsgVmFsdWVTdGF0dXMgfSBmcm9tIFwibWVuZGl4XCI7XG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBGdW5jdGlvbkNvbXBvbmVudCwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEltYWdlVmlld2VyQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vdHlwaW5ncy9JbWFnZVZpZXdlclByb3BzXCI7XG5pbXBvcnQgeyBJbWFnZVZpZXdlciBhcyBJbWFnZVZpZXdlckNvbXBvbmVudCwgSW1hZ2VWaWV3ZXJJbWFnZVByb3BzIH0gZnJvbSBcIi4vY29tcG9uZW50cy9JbWFnZVZpZXdlci9pbmRleFwiO1xuXG5mdW5jdGlvbiBnZXRJbWFnZVByb3BzKHtcbiAgICBkYXRhc291cmNlLFxuICAgIGltYWdlSWNvbixcbiAgICBpbWFnZU9iamVjdCxcbiAgICBpbWFnZVVybFxufTogSW1hZ2VWaWV3ZXJDb250YWluZXJQcm9wcyk6IEltYWdlVmlld2VySW1hZ2VQcm9wcyB7XG4gICAgY29uc3QgZmFsbGJhY2s6IEltYWdlVmlld2VySW1hZ2VQcm9wcyA9IHtcbiAgICAgICAgdHlwZTogXCJpbWFnZVwiLFxuICAgICAgICBpbWFnZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBzd2l0Y2ggKGRhdGFzb3VyY2UpIHtcbiAgICAgICAgY2FzZSBcImltYWdlXCI6XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2VcIixcbiAgICAgICAgICAgICAgICBpbWFnZTogaW1hZ2VPYmplY3Q/LnN0YXR1cyA9PT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlID8gaW1hZ2VPYmplY3QudmFsdWUudXJpIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIFwiaW1hZ2VVcmxcIjpcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJpbWFnZVwiLFxuICAgICAgICAgICAgICAgIGltYWdlOiBpbWFnZVVybD8uc3RhdHVzID09PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgPyBpbWFnZVVybC52YWx1ZSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSBcImljb25cIjoge1xuICAgICAgICAgICAgaWYgKGltYWdlSWNvbj8uc3RhdHVzID09PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2VJY29uLnZhbHVlPy50eXBlID09PSBcImdseXBoXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiaWNvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IGltYWdlSWNvbi52YWx1ZS5pY29uQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGltYWdlSWNvbi52YWx1ZT8udHlwZSA9PT0gXCJpbWFnZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogaW1hZ2VJY29uLnZhbHVlLmljb25VcmxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsbGJhY2s7XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBmYWxsYmFjaztcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBJbWFnZVZpZXdlcjogRnVuY3Rpb25Db21wb25lbnQ8SW1hZ2VWaWV3ZXJDb250YWluZXJQcm9wcz4gPSBwcm9wcyA9PiB7XG4gICAgY29uc3Qgb25DbGljayA9IHVzZUNhbGxiYWNrKCgpID0+IHByb3BzLm9uQ2xpY2s/LmV4ZWN1dGUoKSwgW3Byb3BzLm9uQ2xpY2tdKTtcbiAgICBjb25zdCB7IHR5cGUsIGltYWdlIH0gPSBnZXRJbWFnZVByb3BzKHByb3BzKTtcblxuICAgIGNvbnN0IGFsdFRleHQgPSBwcm9wcy5hbHRlcm5hdGl2ZVRleHQ/LnN0YXR1cyA9PT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlID8gcHJvcHMuYWx0ZXJuYXRpdmVUZXh0LnZhbHVlIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEltYWdlVmlld2VyQ29tcG9uZW50XG4gICAgICAgICAgICBjbGFzcz17cHJvcHMuY2xhc3N9XG4gICAgICAgICAgICBzdHlsZT17cHJvcHMuc3R5bGV9XG4gICAgICAgICAgICB3aWR0aFVuaXQ9e3Byb3BzLndpZHRoVW5pdH1cbiAgICAgICAgICAgIHdpZHRoPXtwcm9wcy53aWR0aH1cbiAgICAgICAgICAgIGhlaWdodFVuaXQ9e3Byb3BzLmhlaWdodFVuaXR9XG4gICAgICAgICAgICBoZWlnaHQ9e3Byb3BzLmhlaWdodH1cbiAgICAgICAgICAgIGljb25TaXplPXtwcm9wcy5pY29uU2l6ZX1cbiAgICAgICAgICAgIHJlc3BvbnNpdmU9e3Byb3BzLnJlc3BvbnNpdmV9XG4gICAgICAgICAgICBvbkNsaWNrVHlwZT17cHJvcHMub25DbGlja1R5cGV9XG4gICAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5vbkNsaWNrID8gb25DbGljayA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHR5cGU9e3R5cGV9XG4gICAgICAgICAgICBpbWFnZT17aW1hZ2V9XG4gICAgICAgICAgICBhbHRUZXh0PXthbHRUZXh0fVxuICAgICAgICAgICAgZGlzcGxheUFzPXtwcm9wcy5kaXNwbGF5QXN9XG4gICAgICAgIC8+XG4gICAgKTtcbn07XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VDYWxsYmFjayIsImhhc093biIsImhhc093blByb3BlcnR5IiwiY2xhc3NOYW1lcyIsImNsYXNzZXMiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiYXJnIiwiYXJnVHlwZSIsInB1c2giLCJBcnJheSIsImlzQXJyYXkiLCJpbm5lciIsImFwcGx5Iiwia2V5IiwiY2FsbCIsImpvaW4iLCJtb2R1bGUiLCJleHBvcnRzIiwiZGVmYXVsdCIsIndpbmRvdyIsImNyZWF0ZUVsZW1lbnQiLCJfZXh0ZW5kcyIsIk9iamVjdCIsImFzc2lnbiIsInRhcmdldCIsInNvdXJjZSIsInByb3RvdHlwZSIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIiwiZXhjbHVkZWQiLCJzb3VyY2VLZXlzIiwia2V5cyIsImluZGV4T2YiLCJvd25lckRvY3VtZW50Iiwibm9kZSIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImRvYyIsImFjdGl2ZSIsIm5vZGVOYW1lIiwiZSIsImJvZHkiLCJjb250YWlucyIsImNvbnRleHQiLCJjb21wYXJlRG9jdW1lbnRQb3NpdGlvbiIsIm9wdGlvbnNTdXBwb3J0ZWQiLCJvbmNlU3VwcG9ydGVkIiwib3B0aW9ucyIsInBhc3NpdmUiLCJvbmNlIiwiY2FuVXNlRE9NIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJldmVudE5hbWUiLCJoYW5kbGVyIiwiY2FwdHVyZSIsIndyYXBwZWRIYW5kbGVyIiwiX19vbmNlIiwib25jZUhhbmRsZXIiLCJldmVudCIsImxpc3RlbiIsImhhc1N5bWJvbCIsIlN5bWJvbCIsImZvciIsIlJFQUNUX0VMRU1FTlRfVFlQRSIsIlJFQUNUX1BPUlRBTF9UWVBFIiwiUkVBQ1RfRlJBR01FTlRfVFlQRSIsIlJFQUNUX1NUUklDVF9NT0RFX1RZUEUiLCJSRUFDVF9QUk9GSUxFUl9UWVBFIiwiUkVBQ1RfUFJPVklERVJfVFlQRSIsIlJFQUNUX0NPTlRFWFRfVFlQRSIsIlJFQUNUX0FTWU5DX01PREVfVFlQRSIsIlJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFIiwiUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSIsIlJFQUNUX1NVU1BFTlNFX1RZUEUiLCJSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUiLCJSRUFDVF9NRU1PX1RZUEUiLCJSRUFDVF9MQVpZX1RZUEUiLCJSRUFDVF9CTE9DS19UWVBFIiwiUkVBQ1RfRlVOREFNRU5UQUxfVFlQRSIsIlJFQUNUX1JFU1BPTkRFUl9UWVBFIiwiUkVBQ1RfU0NPUEVfVFlQRSIsImlzVmFsaWRFbGVtZW50VHlwZSIsInR5cGUiLCIkJHR5cGVvZiIsInR5cGVPZiIsIm9iamVjdCIsIiQkdHlwZW9mVHlwZSIsInVuZGVmaW5lZCIsIkFzeW5jTW9kZSIsIkNvbmN1cnJlbnRNb2RlIiwiQ29udGV4dENvbnN1bWVyIiwiQ29udGV4dFByb3ZpZGVyIiwiRWxlbWVudCIsIkZvcndhcmRSZWYiLCJGcmFnbWVudCIsIkxhenkiLCJNZW1vIiwiUG9ydGFsIiwiUHJvZmlsZXIiLCJTdHJpY3RNb2RlIiwiU3VzcGVuc2UiLCJoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSIsImlzQXN5bmNNb2RlIiwiY29uc29sZSIsImlzQ29uY3VycmVudE1vZGUiLCJpc0NvbnRleHRDb25zdW1lciIsImlzQ29udGV4dFByb3ZpZGVyIiwiaXNFbGVtZW50IiwiaXNGb3J3YXJkUmVmIiwiaXNGcmFnbWVudCIsImlzTGF6eSIsImlzTWVtbyIsImlzUG9ydGFsIiwiaXNQcm9maWxlciIsImlzU3RyaWN0TW9kZSIsImlzU3VzcGVuc2UiLCJyZXF1aXJlIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwicHJvcElzRW51bWVyYWJsZSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwidG9PYmplY3QiLCJ2YWwiLCJUeXBlRXJyb3IiLCJzaG91bGRVc2VOYXRpdmUiLCJ0ZXN0MSIsIlN0cmluZyIsImdldE93blByb3BlcnR5TmFtZXMiLCJ0ZXN0MiIsImZyb21DaGFyQ29kZSIsIm9yZGVyMiIsIm1hcCIsIm4iLCJ0ZXN0MyIsInNwbGl0IiwiZm9yRWFjaCIsImxldHRlciIsImVyciIsImZyb20iLCJ0byIsInN5bWJvbHMiLCJzIiwiUmVhY3RQcm9wVHlwZXNTZWNyZXQiLCJwcmludFdhcm5pbmciLCJsb2dnZWRUeXBlRmFpbHVyZXMiLCJoYXMiLCJGdW5jdGlvbiIsImJpbmQiLCJ0ZXh0IiwibWVzc2FnZSIsImVycm9yIiwiRXJyb3IiLCJ4IiwiY2hlY2tQcm9wVHlwZXMiLCJ0eXBlU3BlY3MiLCJ2YWx1ZXMiLCJsb2NhdGlvbiIsImNvbXBvbmVudE5hbWUiLCJnZXRTdGFjayIsInR5cGVTcGVjTmFtZSIsIm5hbWUiLCJleCIsInN0YWNrIiwicmVzZXRXYXJuaW5nQ2FjaGUiLCJlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsIiwiaXNWYWxpZEVsZW1lbnQiLCJ0aHJvd09uRGlyZWN0QWNjZXNzIiwiSVRFUkFUT1JfU1lNQk9MIiwiaXRlcmF0b3IiLCJGQVVYX0lURVJBVE9SX1NZTUJPTCIsImdldEl0ZXJhdG9yRm4iLCJtYXliZUl0ZXJhYmxlIiwiaXRlcmF0b3JGbiIsIkFOT05ZTU9VUyIsIlJlYWN0UHJvcFR5cGVzIiwiYXJyYXkiLCJjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlciIsImJvb2wiLCJmdW5jIiwibnVtYmVyIiwic3RyaW5nIiwic3ltYm9sIiwiYW55IiwiY3JlYXRlQW55VHlwZUNoZWNrZXIiLCJhcnJheU9mIiwiY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyIiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlciIsImVsZW1lbnRUeXBlIiwiY3JlYXRlRWxlbWVudFR5cGVUeXBlQ2hlY2tlciIsImluc3RhbmNlT2YiLCJjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyIiwiY3JlYXRlTm9kZUNoZWNrZXIiLCJvYmplY3RPZiIsImNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIiLCJvbmVPZiIsImNyZWF0ZUVudW1UeXBlQ2hlY2tlciIsIm9uZU9mVHlwZSIsImNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIiLCJzaGFwZSIsImNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIiLCJleGFjdCIsImNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIiLCJpcyIsInkiLCJQcm9wVHlwZUVycm9yIiwiY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIiLCJ2YWxpZGF0ZSIsIm1hbnVhbFByb3BUeXBlQ2FsbENhY2hlIiwibWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQiLCJjaGVja1R5cGUiLCJpc1JlcXVpcmVkIiwicHJvcHMiLCJwcm9wTmFtZSIsInByb3BGdWxsTmFtZSIsInNlY3JldCIsImNhY2hlS2V5IiwiY2hhaW5lZENoZWNrVHlwZSIsImV4cGVjdGVkVHlwZSIsInByb3BWYWx1ZSIsInByb3BUeXBlIiwiZ2V0UHJvcFR5cGUiLCJwcmVjaXNlVHlwZSIsImdldFByZWNpc2VUeXBlIiwidHlwZUNoZWNrZXIiLCJSZWFjdElzIiwiZXhwZWN0ZWRDbGFzcyIsImV4cGVjdGVkQ2xhc3NOYW1lIiwiYWN0dWFsQ2xhc3NOYW1lIiwiZ2V0Q2xhc3NOYW1lIiwiZXhwZWN0ZWRWYWx1ZXMiLCJ2YWx1ZXNTdHJpbmciLCJKU09OIiwic3RyaW5naWZ5IiwicmVwbGFjZXIiLCJ2YWx1ZSIsImFycmF5T2ZUeXBlQ2hlY2tlcnMiLCJwcm9jZXNzIiwiY2hlY2tlciIsImdldFBvc3RmaXhGb3JUeXBlV2FybmluZyIsImlzTm9kZSIsInNoYXBlVHlwZXMiLCJhbGxLZXlzIiwiZXZlcnkiLCJzdGVwIiwiZW50cmllcyIsIm5leHQiLCJkb25lIiwiZW50cnkiLCJpc1N5bWJvbCIsIlJlZ0V4cCIsIkRhdGUiLCJjb25zdHJ1Y3RvciIsIlByb3BUeXBlcyIsInVzZU1vdW50ZWQiLCJtb3VudGVkIiwidXNlUmVmIiwiaXNNb3VudGVkIiwiY3VycmVudCIsInVzZUVmZmVjdCIsInVzZVVwZGF0ZWRSZWYiLCJ2YWx1ZVJlZiIsInVzZVdpbGxVbm1vdW50IiwiZm4iLCJvblVubW91bnQiLCJ1c2VQcmV2aW91cyIsInJlZiIsInVzZUNvbW1pdHRlZFJlZiIsInVzZUV2ZW50Q2FsbGJhY2siLCJoYXNDbGFzcyIsImNsYXNzTmFtZSIsImNsYXNzTGlzdCIsImJhc2VWYWwiLCJhZGRDbGFzcyIsImFkZCIsInNldEF0dHJpYnV0ZSIsInJlcGxhY2VDbGFzc05hbWUiLCJvcmlnQ2xhc3MiLCJjbGFzc1RvUmVtb3ZlIiwicmVwbGFjZSIsInJlbW92ZUNsYXNzIiwicmVtb3ZlIiwib3duZXJXaW5kb3ciLCJkZWZhdWx0VmlldyIsImdldENvbXB1dGVkU3R5bGUiLCJwc3VlZG9FbGVtZW50IiwiclVwcGVyIiwiaHlwaGVuYXRlIiwidG9Mb3dlckNhc2UiLCJtc1BhdHRlcm4iLCJoeXBoZW5hdGVTdHlsZU5hbWUiLCJzdXBwb3J0ZWRUcmFuc2Zvcm1zIiwiaXNUcmFuc2Zvcm0iLCJ0ZXN0Iiwic3R5bGUiLCJwcm9wZXJ0eSIsImNzcyIsInRyYW5zZm9ybXMiLCJnZXRQcm9wZXJ0eVZhbHVlIiwicmVtb3ZlUHJvcGVydHkiLCJjc3NUZXh0Iiwic2l6ZSIsInNjcm9sbGJhclNpemUiLCJyZWNhbGMiLCJzY3JvbGxEaXYiLCJwb3NpdGlvbiIsInRvcCIsIndpZHRoIiwiaGVpZ2h0Iiwib3ZlcmZsb3ciLCJhcHBlbmRDaGlsZCIsIm9mZnNldFdpZHRoIiwiY2xpZW50V2lkdGgiLCJyZW1vdmVDaGlsZCIsImlzRG9jdW1lbnQiLCJub2RlVHlwZSIsIkRPQ1VNRU5UX05PREUiLCJpc1dpbmRvdyIsImlzQm9keSIsInRhZ05hbWUiLCJib2R5SXNPdmVyZmxvd2luZyIsIndpbiIsImlubmVyV2lkdGgiLCJpc092ZXJmbG93aW5nIiwiY29udGFpbmVyIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiQkxBQ0tMSVNUIiwiaXNIaWRhYmxlIiwiX3JlZiIsInNpYmxpbmdzIiwiZXhjbHVkZSIsImNiIiwiY2hpbGRyZW4iLCJhcmlhSGlkZGVuIiwiaGlkZSIsInJlbW92ZUF0dHJpYnV0ZSIsImhpZGVTaWJsaW5ncyIsIl9yZWYyIiwiZGlhbG9nIiwiYmFja2Ryb3AiLCJzaG93U2libGluZ3MiLCJfcmVmMyIsImZpbmRJbmRleE9mIiwiYXJyIiwiaWR4Iiwic29tZSIsImQiLCJNb2RhbE1hbmFnZXIiLCJfdGVtcCIsIl9yZWYkaGlkZVNpYmxpbmdOb2RlcyIsImhpZGVTaWJsaW5nTm9kZXMiLCJfcmVmJGhhbmRsZUNvbnRhaW5lck8iLCJoYW5kbGVDb250YWluZXJPdmVyZmxvdyIsIm1vZGFscyIsImNvbnRhaW5lcnMiLCJkYXRhIiwiZ2V0U2Nyb2xsYmFyU2l6ZSIsIl9wcm90byIsImlzQ29udGFpbmVyT3ZlcmZsb3dpbmciLCJtb2RhbCIsImNvbnRhaW5lckluZGV4RnJvbU1vZGFsIiwib3ZlcmZsb3dpbmciLCJzZXRDb250YWluZXJTdHlsZSIsImNvbnRhaW5lclN0YXRlIiwicGFkZGluZ1JpZ2h0IiwicGFyc2VJbnQiLCJyZW1vdmVDb250YWluZXJTdHlsZSIsIm1vZGFsSWR4IiwiY29udGFpbmVySWR4Iiwic3BsaWNlIiwiX2RhdGEkbW9kYWxzIiwiaXNUb3BNb2RhbCIsInJlc29sdmVDb250YWluZXJSZWYiLCJ1c2VXYWl0Rm9yRE9NUmVmIiwib25SZXNvbHZlZCIsIl91c2VTdGF0ZSIsInJlc29sdmVkUmVmIiwic2V0UmVmIiwiZWFybHlSZWYiLCJuZXh0UmVmIiwibWFuYWdlciIsImdldE1hbmFnZXIiLCJ1c2VNb2RhbE1hbmFnZXIiLCJwcm92aWRlZCIsIm1vZGFsTWFuYWdlciIsInNldERpYWxvZ1JlZiIsInNldEJhY2tkcm9wUmVmIiwiTW9kYWwiLCJmb3J3YXJkUmVmIiwiX3JlZiRzaG93Iiwic2hvdyIsIl9yZWYkcm9sZSIsInJvbGUiLCJfcmVmJGJhY2tkcm9wIiwiX3JlZiRrZXlib2FyZCIsImtleWJvYXJkIiwib25CYWNrZHJvcENsaWNrIiwib25Fc2NhcGVLZXlEb3duIiwidHJhbnNpdGlvbiIsImJhY2tkcm9wVHJhbnNpdGlvbiIsIl9yZWYkYXV0b0ZvY3VzIiwiYXV0b0ZvY3VzIiwiX3JlZiRlbmZvcmNlRm9jdXMiLCJlbmZvcmNlRm9jdXMiLCJfcmVmJHJlc3RvcmVGb2N1cyIsInJlc3RvcmVGb2N1cyIsInJlc3RvcmVGb2N1c09wdGlvbnMiLCJyZW5kZXJEaWFsb2ciLCJfcmVmJHJlbmRlckJhY2tkcm9wIiwicmVuZGVyQmFja2Ryb3AiLCJSZWFjdCIsInByb3ZpZGVkTWFuYWdlciIsImNvbnRhaW5lclJlZiIsImNvbnRhaW5lckNsYXNzTmFtZSIsIm9uU2hvdyIsIl9yZWYkb25IaWRlIiwib25IaWRlIiwib25FeGl0Iiwib25FeGl0ZWQiLCJvbkV4aXRpbmciLCJvbkVudGVyIiwib25FbnRlcmluZyIsIm9uRW50ZXJlZCIsInJlc3QiLCJwcmV2U2hvdyIsImV4aXRlZCIsInNldEV4aXRlZCIsImxhc3RGb2N1c1JlZiIsInVzZUltcGVyYXRpdmVIYW5kbGUiLCJoYW5kbGVTaG93IiwicmVtb3ZlS2V5ZG93bkxpc3RlbmVyUmVmIiwiaGFuZGxlRG9jdW1lbnRLZXlEb3duIiwicmVtb3ZlRm9jdXNMaXN0ZW5lclJlZiIsInNldFRpbWVvdXQiLCJoYW5kbGVFbmZvcmNlRm9jdXMiLCJjdXJyZW50QWN0aXZlRWxlbWVudCIsImZvY3VzIiwiaGFuZGxlSGlkZSIsIl9sYXN0Rm9jdXNSZWYkY3VycmVudCIsImhhbmRsZUJhY2tkcm9wQ2xpY2siLCJjdXJyZW50VGFyZ2V0Iiwia2V5Q29kZSIsImRlZmF1bHRQcmV2ZW50ZWQiLCJoYW5kbGVIaWRkZW4iLCJfbGVuIiwiYXJncyIsIl9rZXkiLCJUcmFuc2l0aW9uIiwiZGlhbG9nUHJvcHMiLCJ0YWJJbmRleCIsImNsb25lRWxlbWVudCIsImFwcGVhciIsInVubW91bnRPbkV4aXQiLCJiYWNrZHJvcEVsZW1lbnQiLCJCYWNrZHJvcFRyYW5zaXRpb24iLCJvbkNsaWNrIiwiUmVhY3RET00iLCJjcmVhdGVQb3J0YWwiLCJwcm9wVHlwZXMiLCJwcmV2ZW50U2Nyb2xsIiwiZGlzcGxheU5hbWUiLCJNYW5hZ2VyIiwiSW1hZ2VWaWV3ZXIiLCJJbWFnZVZpZXdlckNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQVFPLE1BQU0sZ0JBQWdCLEdBQUc7UUFDNUIsTUFBTSxDQUFDLGNBQWMsRUFBRSxpQkFBaUIsQ0FBQyxHQUFHQSxjQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFNUQsTUFBTSxZQUFZLEdBQUdDLGlCQUFXLENBQUM7WUFDN0IsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVQLE1BQU0sYUFBYSxHQUFHQSxpQkFBVyxDQUFDO1lBQzlCLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFUCxPQUFPLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsQ0FBQztJQUMzRCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztJQ3BCRDtJQUNBO0lBQ0E7SUFDQTtJQUNBOztJQUNBO0lBRUMsYUFBWTs7SUFHWixNQUFJQyxNQUFNLEdBQUcsR0FBR0MsY0FBaEI7O0lBRUEsV0FBU0MsVUFBVCxHQUF1QjtJQUN0QixRQUFJQyxPQUFPLEdBQUcsRUFBZDs7SUFFQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdDLFNBQVMsQ0FBQ0MsTUFBOUIsRUFBc0NGLENBQUMsRUFBdkMsRUFBMkM7SUFDMUMsVUFBSUcsR0FBRyxHQUFHRixTQUFTLENBQUNELENBQUQsQ0FBbkI7SUFDQSxVQUFJLENBQUNHLEdBQUwsRUFBVTtJQUVWLFVBQUlDLE9BQU8sR0FBRyxPQUFPRCxHQUFyQjs7SUFFQSxVQUFJQyxPQUFPLEtBQUssUUFBWixJQUF3QkEsT0FBTyxLQUFLLFFBQXhDLEVBQWtEO0lBQ2pETCxRQUFBQSxPQUFPLENBQUNNLElBQVIsQ0FBYUYsR0FBYjtJQUNBLE9BRkQsTUFFTyxJQUFJ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
