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

	const debounce = (func, waitFor) => {
	  let timeout = null;

	  const debounced = (...args) => {
	    if (timeout !== null) {
	      clearTimeout(timeout);
	      timeout = null;
	    }

	    timeout = setTimeout(() => func(...args), waitFor);
	  };

	  return debounced;
	};

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

	function FilterSelector(props) {
	  const [value, setValue] = react.useState(props.defaultFilter);
	  const [show, setShow] = react.useState(false);
	  const componentRef = react.useRef(null);
	  useOnClickOutside(componentRef, () => setShow(false));
	  const onClick = react.useCallback(value => {
	    setValue(value);
	    props.onChange(value);
	    setShow(false);
	  }, [props.onChange]);
	  react.useEffect(() => {
	    setValue(props.defaultFilter);
	    props.onChange(props.defaultFilter);
	  }, [props.defaultFilter, props.onChange]);
	  return react.createElement("div", {
	    className: "filter-selector"
	  }, react.createElement("div", {
	    className: "filter-selector-content",
	    ref: componentRef
	  }, react.createElement("button", {
	    "aria-controls": `${props.name}-filter-selectors`,
	    "aria-expanded": show,
	    "aria-haspopup": true,
	    "aria-label": props.ariaLabel,
	    className: classnames("btn btn-default filter-selector-button button-icon", value),
	    onClick: () => setShow(show => !show)
	  }, "\u00A0"), show && react.createElement("ul", {
	    id: `${props.name}-filter-selectors`,
	    className: "filter-selectors",
	    role: "menu",
	    "data-focusindex": 0
	  }, props.options.map((option, index) => react.createElement("li", {
	    className: classnames({
	      "filter-selected": value === option.value
	    }),
	    key: index,
	    onClick: () => onClick(option.value),
	    onKeyDown: e => {
	      if (e.key === "Enter" || e.key === " ") {
	        e.preventDefault();
	        onClick(option.value);
	      }
	    },
	    role: "menuitem",
	    tabIndex: 0
	  }, react.createElement("div", {
	    className: classnames("filter-icon", option.value),
	    "aria-hidden": true
	  }), react.createElement("div", {
	    className: "filter-label"
	  }, option.label))))));
	}

	function FilterComponent(props) {
	    var _a;
	    const [type, setType] = react.useState(props.defaultFilter);
	    const [value, setValue] = react.useState("");
	    const [valueInput, setValueInput] = react.useState("");
	    const inputRef = react.useRef(null);
	    react.useEffect(() => {
	        if (props.value) {
	            setValueInput(props.value);
	            setValue(props.value);
	        }
	    }, [props.value]);
	    react.useEffect(() => {
	        var _a;
	        (_a = props.updateFilters) === null || _a === void 0 ? void 0 : _a.call(props, value, type);
	    }, [value, type]);
	    const onChange = react.useCallback(debounce((value) => setValue(value), props.delay), [props.delay]);
	    const focusInput = react.useCallback(() => {
	        if (inputRef.current) {
	            inputRef.current.focus();
	        }
	    }, [inputRef]);
	    return (react.createElement("div", { className: "filter-container", "data-focusindex": (_a = props.tabIndex) !== null && _a !== void 0 ? _a : 0 },
	        props.adjustable && (react.createElement(FilterSelector, { ariaLabel: props.screenReaderButtonCaption, name: props.name, defaultFilter: props.defaultFilter, onChange: react.useCallback(type => {
	                setType(type);
	                focusInput();
	            }, [focusInput]), options: [
	                { value: "contains", label: "Contains" },
	                { value: "startsWith", label: "Starts with" },
	                { value: "endsWith", label: "Ends with" },
	                { value: "greater", label: "Greater than" },
	                { value: "greaterEqual", label: "Greater than or equal" },
	                { value: "equal", label: "Equal" },
	                { value: "notEqual", label: "Not equal" },
	                { value: "smaller", label: "Smaller than" },
	                { value: "smallerEqual", label: "Smaller than or equal" }
	            ] })),
	        react.createElement("input", { "aria-label": props.screenReaderInputCaption, className: classnames("form-control", { "filter-input": props.adjustable }), onChange: e => {
	                setValueInput(e.target.value);
	                onChange(e.target.value);
	            }, placeholder: props.placeholder, ref: inputRef, type: "text", value: valueInput })));
	}

	function translateFilters(filters) {
	    if (filters && filters.length === 1) {
	        const [filter] = filters;
	        let type = "equal";
	        switch (filter.type) {
	            case "contains":
	                type = "contains";
	                break;
	            case "starts-with":
	                type = "startsWith";
	                break;
	            case "ends-with":
	                type = "endsWith";
	                break;
	            case ">":
	                type = "greater";
	                break;
	            case ">=":
	                type = "greaterEqual";
	                break;
	            case "=":
	                type = "equal";
	                break;
	            case "!=":
	                type = "notEqual";
	                break;
	            case "<":
	                type = "smaller";
	                break;
	            case "<=":
	                type = "smallerEqual";
	                break;
	        }
	        return {
	            type,
	            value: String(filter.value)
	        };
	    }
	    return undefined;
	}

	function DatagridTextFilter(props) {
	    const FilterContext = getFilterDispatcher();
	    const alertMessage = (react.createElement(Alert, { bootstrapStyle: "danger" }, "The text filter widget must be placed inside the header of the Data grid 2.0 or Gallery widget."));
	    const alertMessageMultipleFilters = (react.createElement(Alert, { bootstrapStyle: "danger" }, "To use multiple filters you need to define a filter identification in the properties of text filter or have a \"Hashed string or String\" attribute available."));
	    return (FilterContext === null || FilterContext === void 0 ? void 0 : FilterContext.Consumer) ? (react.createElement(FilterContext.Consumer, null, filterContextValue => {
	        var _a, _b, _c, _d, _e, _f, _g;
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
	        const defaultFilter = singleInitialFilter
	            ? translateFilters(singleInitialFilter)
	            : translateFilters(multipleInitialFilters === null || multipleInitialFilters === void 0 ? void 0 : multipleInitialFilters[attribute.id]); // TODO: Restore all
	        const errorMessage = getAttributeTypeErrorMessage(attribute.type);
	        if (errorMessage) {
	            return react.createElement(Alert, { bootstrapStyle: "danger" }, errorMessage);
	        }
	        return (react.createElement(FilterComponent, { adjustable: props.adjustable, defaultFilter: (_b = defaultFilter === null || defaultFilter === void 0 ? void 0 : defaultFilter.type) !== null && _b !== void 0 ? _b : props.defaultFilter, delay: props.delay, name: props.name, placeholder: (_c = props.placeholder) === null || _c === void 0 ? void 0 : _c.value, screenReaderButtonCaption: (_d = props.screenReaderButtonCaption) === null || _d === void 0 ? void 0 : _d.value, screenReaderInputCaption: (_e = props.screenReaderInputCaption) === null || _e === void 0 ? void 0 : _e.value, tabIndex: props.tabIndex, updateFilters: (value, type) => {
	                const attributes = singleAttribute ? [attribute] : findAttributesByType(multipleAttributes);
	                const conditions = attributes === null || attributes === void 0 ? void 0 : attributes.map(attribute => getFilterCondition(attribute, value, type)).filter((filter) => filter !== undefined);
	                filterDispatcher({
	                    getFilterCondition: () => conditions && conditions.length > 1 ? builders.or(...conditions) : conditions === null || conditions === void 0 ? void 0 : conditions[0],
	                    filterType: "string" /* STRING */
	                });
	            }, value: (_f = defaultFilter === null || defaultFilter === void 0 ? void 0 : defaultFilter.value) !== null && _f !== void 0 ? _f : (_g = props.defaultValue) === null || _g === void 0 ? void 0 : _g.value }));
	    })) : (alertMessage);
	}
	function findAttributesByType(multipleAttributes) {
	    if (!multipleAttributes) {
	        return undefined;
	    }
	    return Object.keys(multipleAttributes)
	        .map(key => multipleAttributes[key])
	        .filter(attr => attr.type.match(/HashString|String/));
	}
	function getAttributeTypeErrorMessage(type) {
	    return type && !type.match(/HashString|String/)
	        ? "The attribute type being used for Data grid text filter is not 'Hashed string or String'"
	        : null;
	}
	function getFilterCondition(listAttribute, value, type) {
	    if (!listAttribute || !listAttribute.filterable || !value) {
	        return undefined;
	    }
	    const filters = {
	        contains: builders.contains,
	        startsWith: builders.startsWith,
	        endsWith: builders.endsWith,
	        greater: builders.greaterThan,
	        greaterEqual: builders.greaterThanOrEqual,
	        equal: builders.equals,
	        notEqual: builders.notEqual,
	        smaller: builders.lessThan,
	        smallerEqual: builders.lessThanOrEqual
	    };
	    return filters[type](builders.attribute(listAttribute.id), builders.literal(value));
	}

	return DatagridTextFilter;

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWdyaWRUZXh0RmlsdGVyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Rvb2xzL3Bpdy11dGlscy1pbnRlcm5hbC9kaXN0L2NvbXBvbmVudHMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90b29scy9waXctdXRpbHMtaW50ZXJuYWwvZGlzdC9mdW5jdGlvbnMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90b29scy9waXctdXRpbHMtaW50ZXJuYWwvZGlzdC9idWlsZGVycy9FZGl0YWJsZVZhbHVlQnVpbGRlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Rvb2xzL3Bpdy11dGlscy1pbnRlcm5hbC9kaXN0L3V0aWxzL2RvbS5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Rvb2xzL3Bpdy11dGlscy1pbnRlcm5hbC9kaXN0L3V0aWxzL0ZpbHRlclByb3ZpZGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vdG9vbHMvcGl3LXV0aWxzLWludGVybmFsL2Rpc3Qvd2lkZ2V0cy9GaWx0ZXJTZWxlY3Rvci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0ZpbHRlckNvbXBvbmVudC50c3giLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvdXRpbHMvZmlsdGVycy50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9EYXRhZ3JpZFRleHRGaWx0ZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTcgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykgJiYgYXJnLmxlbmd0aCkge1xuXHRcdFx0XHR2YXIgaW5uZXIgPSBjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZyk7XG5cdFx0XHRcdGlmIChpbm5lcikge1xuXHRcdFx0XHRcdGNsYXNzZXMucHVzaChpbm5lcik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdGNsYXNzTmFtZXMuZGVmYXVsdCA9IGNsYXNzTmFtZXM7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsImltcG9ydCB7IENoaWxkcmVuLCBjcmVhdGVFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuZXhwb3J0IGNvbnN0IEFsZXJ0ID0gKHsgY2xhc3NOYW1lLCBib290c3RyYXBTdHlsZSwgY2hpbGRyZW4gfSkgPT4gQ2hpbGRyZW4uY291bnQoY2hpbGRyZW4pID4gMCA/IChjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBjbGFzc05hbWVzKGBhbGVydCBhbGVydC0ke2Jvb3RzdHJhcFN0eWxlfWAsIGNsYXNzTmFtZSkgfSwgY2hpbGRyZW4pKSA6IG51bGw7XG5BbGVydC5kaXNwbGF5TmFtZSA9IFwiQWxlcnRcIjtcbiIsImV4cG9ydCBjb25zdCBleGVjdXRlQWN0aW9uID0gKGFjdGlvbikgPT4ge1xuICAgIGlmIChhY3Rpb24gJiYgYWN0aW9uLmNhbkV4ZWN1dGUgJiYgIWFjdGlvbi5pc0V4ZWN1dGluZykge1xuICAgICAgICBhY3Rpb24uZXhlY3V0ZSgpO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgaXNBdmFpbGFibGUgPSAocHJvcGVydHkpID0+IHtcbiAgICByZXR1cm4gcHJvcGVydHkgJiYgcHJvcGVydHkuc3RhdHVzID09PSBcImF2YWlsYWJsZVwiIC8qIEF2YWlsYWJsZSAqLyAmJiBwcm9wZXJ0eS52YWx1ZTtcbn07XG5leHBvcnQgY29uc3QgcGFyc2VTdHlsZSA9IChzdHlsZSA9IFwiXCIpID0+IHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gc3R5bGUuc3BsaXQoXCI7XCIpLnJlZHVjZSgoc3R5bGVPYmplY3QsIGxpbmUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhaXIgPSBsaW5lLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgICAgIGlmIChwYWlyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwYWlyWzBdLnRyaW0oKS5yZXBsYWNlKC8oLS4pL2csIG1hdGNoID0+IG1hdGNoWzFdLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICAgICAgICAgIHN0eWxlT2JqZWN0W25hbWVdID0gcGFpclsxXS50cmltKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3R5bGVPYmplY3Q7XG4gICAgICAgIH0sIHt9KTtcbiAgICB9XG4gICAgY2F0Y2ggKF8pIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgZGVib3VuY2UgPSAoZnVuYywgd2FpdEZvcikgPT4ge1xuICAgIGxldCB0aW1lb3V0ID0gbnVsbDtcbiAgICBjb25zdCBkZWJvdW5jZWQgPSAoLi4uYXJncykgPT4ge1xuICAgICAgICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4gZnVuYyguLi5hcmdzKSwgd2FpdEZvcik7XG4gICAgfTtcbiAgICByZXR1cm4gZGVib3VuY2VkO1xufTtcbiIsImV4cG9ydCB2YXIgRm9ybWF0dGVyVHlwZTtcbihmdW5jdGlvbiAoRm9ybWF0dGVyVHlwZSkge1xuICAgIEZvcm1hdHRlclR5cGVbXCJOdW1iZXJcIl0gPSBcIm51bWJlclwiO1xuICAgIEZvcm1hdHRlclR5cGVbXCJEYXRlVGltZVwiXSA9IFwiZGF0ZXRpbWVcIjtcbn0pKEZvcm1hdHRlclR5cGUgfHwgKEZvcm1hdHRlclR5cGUgPSB7fSkpO1xuZXhwb3J0IGNsYXNzIEVkaXRhYmxlVmFsdWVCdWlsZGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlID0ge1xuICAgICAgICAgICAgdmFsdWU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRpc3BsYXlWYWx1ZTogXCJcIixcbiAgICAgICAgICAgIHN0YXR1czogXCJhdmFpbGFibGVcIiAvKiBBdmFpbGFibGUgKi8sXG4gICAgICAgICAgICB2YWxpZGF0aW9uOiB1bmRlZmluZWQsXG4gICAgICAgICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICAgICAgICBmb3JtYXR0ZXI6IHtcbiAgICAgICAgICAgICAgICBmb3JtYXQ6IGplc3QuZm4obmFtZSA9PiBgRm9ybWF0dGVkICR7bmFtZX1gKSxcbiAgICAgICAgICAgICAgICBwYXJzZTogamVzdC5mbigpLFxuICAgICAgICAgICAgICAgIHdpdGhDb25maWc6IGplc3QuZm4oKCkgPT4gbmV3IEVkaXRhYmxlVmFsdWVCdWlsZGVyKCkuYnVpbGQoKS5mb3JtYXR0ZXIpLFxuICAgICAgICAgICAgICAgIGdldEZvcm1hdFBsYWNlaG9sZGVyOiBqZXN0LmZuKCksXG4gICAgICAgICAgICAgICAgdHlwZTogRm9ybWF0dGVyVHlwZS5EYXRlVGltZSxcbiAgICAgICAgICAgICAgICBjb25maWc6IHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VmFsaWRhdG9yOiBqZXN0LmZuKCksXG4gICAgICAgICAgICBzZXRWYWx1ZTogamVzdC5mbigodmFsdWUpID0+IHRoaXMud2l0aFZhbHVlKHZhbHVlKSksXG4gICAgICAgICAgICBzZXRUZXh0VmFsdWU6IGplc3QuZm4oKSxcbiAgICAgICAgICAgIHNldEZvcm1hdHRlcjogamVzdC5mbigpXG4gICAgICAgIH07XG4gICAgfVxuICAgIHdpdGhWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLmVkaXRhYmxlVmFsdWUudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLmRpc3BsYXlWYWx1ZSA9IHRoaXMuZWRpdGFibGVWYWx1ZS5mb3JtYXR0ZXIuZm9ybWF0KHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHdpdGhGb3JtYXR0ZXIoZm9ybWF0dGVyKSB7XG4gICAgICAgIHRoaXMuZWRpdGFibGVWYWx1ZS5mb3JtYXR0ZXIgPSBmb3JtYXR0ZXI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBpc1JlYWRPbmx5KCkge1xuICAgICAgICB0aGlzLmVkaXRhYmxlVmFsdWUucmVhZE9ubHkgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaXNMb2FkaW5nKCkge1xuICAgICAgICB0aGlzLmVkaXRhYmxlVmFsdWUuc3RhdHVzID0gXCJsb2FkaW5nXCIgLyogTG9hZGluZyAqLztcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNSZWFkT25seSgpO1xuICAgIH1cbiAgICBpc1VuYXZhaWxhYmxlKCkge1xuICAgICAgICB0aGlzLmVkaXRhYmxlVmFsdWUuc3RhdHVzID0gXCJ1bmF2YWlsYWJsZVwiIC8qIFVuYXZhaWxhYmxlICovO1xuICAgICAgICByZXR1cm4gdGhpcy5pc1JlYWRPbmx5KCk7XG4gICAgfVxuICAgIHdpdGhWYWxpZGF0aW9uKHZhbGlkYXRpb24pIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnZhbGlkYXRpb24gPSB2YWxpZGF0aW9uO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgd2l0aFVuaXZlcnNlKC4uLnZhbHVlcykge1xuICAgICAgICB0aGlzLmVkaXRhYmxlVmFsdWUudW5pdmVyc2UgPSB2YWx1ZXM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBidWlsZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdGFibGVWYWx1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmV4cG9ydCBmdW5jdGlvbiB1c2VPbkNsaWNrT3V0c2lkZShyZWYsIGhhbmRsZXIpIHtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0ZW5lciA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFyZWYuY3VycmVudCB8fCByZWYuY3VycmVudC5jb250YWlucyhldmVudC50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGFuZGxlcigpO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGxpc3RlbmVyKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgbGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBsaXN0ZW5lcik7XG4gICAgICAgIH07XG4gICAgfSwgW3JlZiwgaGFuZGxlcl0pO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCB9IGZyb20gXCJyZWFjdFwiO1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbHRlckRpc3BhdGNoZXIoKSB7XG4gICAgcmV0dXJuIHdpbmRvd1tcImNvbS5tZW5kaXgud2lkZ2V0cy53ZWIuZmlsdGVyYWJsZS5maWx0ZXJDb250ZXh0XCJdO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZpbHRlckNvbnRleHQoKSB7XG4gICAgY29uc3QgZ2xvYmFsRmlsdGVyQ29udGV4dCA9IGdldEZpbHRlckRpc3BhdGNoZXIoKTtcbiAgICBpZiAoZ2xvYmFsRmlsdGVyQ29udGV4dCkge1xuICAgICAgICByZXR1cm4geyBGaWx0ZXJDb250ZXh0OiBnbG9iYWxGaWx0ZXJDb250ZXh0IH07XG4gICAgfVxuICAgIGNvbnN0IEZpbHRlckNvbnRleHQgPSBjcmVhdGVDb250ZXh0KHVuZGVmaW5lZCk7XG4gICAgd2luZG93W1wiY29tLm1lbmRpeC53aWRnZXRzLndlYi5maWx0ZXJhYmxlLmZpbHRlckNvbnRleHRcIl0gPSBGaWx0ZXJDb250ZXh0O1xuICAgIHJldHVybiB7IEZpbHRlckNvbnRleHQgfTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgeyB1c2VPbkNsaWNrT3V0c2lkZSB9IGZyb20gXCIuLi91dGlsc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIEZpbHRlclNlbGVjdG9yKHByb3BzKSB7XG4gICAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSB1c2VTdGF0ZShwcm9wcy5kZWZhdWx0RmlsdGVyKTtcbiAgICBjb25zdCBbc2hvdywgc2V0U2hvd10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdXNlUmVmKG51bGwpO1xuICAgIHVzZU9uQ2xpY2tPdXRzaWRlKGNvbXBvbmVudFJlZiwgKCkgPT4gc2V0U2hvdyhmYWxzZSkpO1xuICAgIGNvbnN0IG9uQ2xpY2sgPSB1c2VDYWxsYmFjaygodmFsdWUpID0+IHtcbiAgICAgICAgc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICBwcm9wcy5vbkNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIHNldFNob3coZmFsc2UpO1xuICAgIH0sIFtwcm9wcy5vbkNoYW5nZV0pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHNldFZhbHVlKHByb3BzLmRlZmF1bHRGaWx0ZXIpO1xuICAgICAgICBwcm9wcy5vbkNoYW5nZShwcm9wcy5kZWZhdWx0RmlsdGVyKTtcbiAgICB9LCBbcHJvcHMuZGVmYXVsdEZpbHRlciwgcHJvcHMub25DaGFuZ2VdKTtcbiAgICByZXR1cm4gKGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmlsdGVyLXNlbGVjdG9yXCIgfSxcbiAgICAgICAgY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmaWx0ZXItc2VsZWN0b3ItY29udGVudFwiLCByZWY6IGNvbXBvbmVudFJlZiB9LFxuICAgICAgICAgICAgY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7IFwiYXJpYS1jb250cm9sc1wiOiBgJHtwcm9wcy5uYW1lfS1maWx0ZXItc2VsZWN0b3JzYCwgXCJhcmlhLWV4cGFuZGVkXCI6IHNob3csIFwiYXJpYS1oYXNwb3B1cFwiOiB0cnVlLCBcImFyaWEtbGFiZWxcIjogcHJvcHMuYXJpYUxhYmVsLCBjbGFzc05hbWU6IGNsYXNzTmFtZXMoXCJidG4gYnRuLWRlZmF1bHQgZmlsdGVyLXNlbGVjdG9yLWJ1dHRvbiBidXR0b24taWNvblwiLCB2YWx1ZSksIG9uQ2xpY2s6ICgpID0+IHNldFNob3coc2hvdyA9PiAhc2hvdykgfSwgXCJcXHUwMEEwXCIpLFxuICAgICAgICAgICAgc2hvdyAmJiAoY3JlYXRlRWxlbWVudChcInVsXCIsIHsgaWQ6IGAke3Byb3BzLm5hbWV9LWZpbHRlci1zZWxlY3RvcnNgLCBjbGFzc05hbWU6IFwiZmlsdGVyLXNlbGVjdG9yc1wiLCByb2xlOiBcIm1lbnVcIiwgXCJkYXRhLWZvY3VzaW5kZXhcIjogMCB9LCBwcm9wcy5vcHRpb25zLm1hcCgob3B0aW9uLCBpbmRleCkgPT4gKGNyZWF0ZUVsZW1lbnQoXCJsaVwiLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lcyh7IFwiZmlsdGVyLXNlbGVjdGVkXCI6IHZhbHVlID09PSBvcHRpb24udmFsdWUgfSksIGtleTogaW5kZXgsIG9uQ2xpY2s6ICgpID0+IG9uQ2xpY2sob3B0aW9uLnZhbHVlKSwgb25LZXlEb3duOiBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIgfHwgZS5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrKG9wdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCByb2xlOiBcIm1lbnVpdGVtXCIsIHRhYkluZGV4OiAwIH0sXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lcyhcImZpbHRlci1pY29uXCIsIG9wdGlvbi52YWx1ZSksIFwiYXJpYS1oaWRkZW5cIjogdHJ1ZSB9KSxcbiAgICAgICAgICAgICAgICBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZpbHRlci1sYWJlbFwiIH0sIG9wdGlvbi5sYWJlbCkpKSkpKSkpKTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIFJlYWN0RWxlbWVudCwgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgZGVib3VuY2UsIEZpbHRlclNlbGVjdG9yIH0gZnJvbSBcIkBtZW5kaXgvcGl3LXV0aWxzLWludGVybmFsXCI7XG5cbmltcG9ydCB7IERlZmF1bHRGaWx0ZXJFbnVtIH0gZnJvbSBcIi4uLy4uL3R5cGluZ3MvRGF0YWdyaWRUZXh0RmlsdGVyUHJvcHNcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5cbmludGVyZmFjZSBGaWx0ZXJDb21wb25lbnRQcm9wcyB7XG4gICAgYWRqdXN0YWJsZTogYm9vbGVhbjtcbiAgICBkZWZhdWx0RmlsdGVyOiBEZWZhdWx0RmlsdGVyRW51bTtcbiAgICBkZWxheTogbnVtYmVyO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgdGFiSW5kZXg/OiBudW1iZXI7XG4gICAgc2NyZWVuUmVhZGVyQnV0dG9uQ2FwdGlvbj86IHN0cmluZztcbiAgICBzY3JlZW5SZWFkZXJJbnB1dENhcHRpb24/OiBzdHJpbmc7XG4gICAgdXBkYXRlRmlsdGVycz86ICh2YWx1ZTogc3RyaW5nLCB0eXBlOiBEZWZhdWx0RmlsdGVyRW51bSkgPT4gdm9pZDtcbiAgICB2YWx1ZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbHRlckNvbXBvbmVudChwcm9wczogRmlsdGVyQ29tcG9uZW50UHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IFt0eXBlLCBzZXRUeXBlXSA9IHVzZVN0YXRlPERlZmF1bHRGaWx0ZXJFbnVtPihwcm9wcy5kZWZhdWx0RmlsdGVyKTtcbiAgICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICAgIGNvbnN0IFt2YWx1ZUlucHV0LCBzZXRWYWx1ZUlucHV0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICAgIGNvbnN0IGlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChwcm9wcy52YWx1ZSkge1xuICAgICAgICAgICAgc2V0VmFsdWVJbnB1dChwcm9wcy52YWx1ZSk7XG4gICAgICAgICAgICBzZXRWYWx1ZShwcm9wcy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9LCBbcHJvcHMudmFsdWVdKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIHByb3BzLnVwZGF0ZUZpbHRlcnM/Lih2YWx1ZSwgdHlwZSk7XG4gICAgfSwgW3ZhbHVlLCB0eXBlXSk7XG5cbiAgICBjb25zdCBvbkNoYW5nZSA9IHVzZUNhbGxiYWNrKFxuICAgICAgICBkZWJvdW5jZSgodmFsdWU6IHN0cmluZykgPT4gc2V0VmFsdWUodmFsdWUpLCBwcm9wcy5kZWxheSksXG4gICAgICAgIFtwcm9wcy5kZWxheV1cbiAgICApO1xuXG4gICAgY29uc3QgZm9jdXNJbnB1dCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgaWYgKGlucHV0UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGlucHV0UmVmLmN1cnJlbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH0sIFtpbnB1dFJlZl0pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaWx0ZXItY29udGFpbmVyXCIgZGF0YS1mb2N1c2luZGV4PXtwcm9wcy50YWJJbmRleCA/PyAwfT5cbiAgICAgICAgICAgIHtwcm9wcy5hZGp1c3RhYmxlICYmIChcbiAgICAgICAgICAgICAgICA8RmlsdGVyU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgYXJpYUxhYmVsPXtwcm9wcy5zY3JlZW5SZWFkZXJCdXR0b25DYXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICBuYW1lPXtwcm9wcy5uYW1lfVxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0RmlsdGVyPXtwcm9wcy5kZWZhdWx0RmlsdGVyfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dXNlQ2FsbGJhY2soXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUeXBlKHR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzSW5wdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbZm9jdXNJbnB1dF1cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17XG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogXCJjb250YWluc1wiLCBsYWJlbDogXCJDb250YWluc1wiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogXCJzdGFydHNXaXRoXCIsIGxhYmVsOiBcIlN0YXJ0cyB3aXRoXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcImVuZHNXaXRoXCIsIGxhYmVsOiBcIkVuZHMgd2l0aFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogXCJncmVhdGVyXCIsIGxhYmVsOiBcIkdyZWF0ZXIgdGhhblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogXCJncmVhdGVyRXF1YWxcIiwgbGFiZWw6IFwiR3JlYXRlciB0aGFuIG9yIGVxdWFsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcImVxdWFsXCIsIGxhYmVsOiBcIkVxdWFsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcIm5vdEVxdWFsXCIsIGxhYmVsOiBcIk5vdCBlcXVhbFwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogXCJzbWFsbGVyXCIsIGxhYmVsOiBcIlNtYWxsZXIgdGhhblwiIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB2YWx1ZTogXCJzbWFsbGVyRXF1YWxcIiwgbGFiZWw6IFwiU21hbGxlciB0aGFuIG9yIGVxdWFsXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXSBhcyBBcnJheTx7IHZhbHVlOiBEZWZhdWx0RmlsdGVyRW51bTsgbGFiZWw6IHN0cmluZyB9PlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtwcm9wcy5zY3JlZW5SZWFkZXJJbnB1dENhcHRpb259XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiZm9ybS1jb250cm9sXCIsIHsgXCJmaWx0ZXItaW5wdXRcIjogcHJvcHMuYWRqdXN0YWJsZSB9KX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFZhbHVlSW5wdXQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17cHJvcHMucGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgICAgcmVmPXtpbnB1dFJlZn1cbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlSW5wdXR9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIiwiaW1wb3J0IHsgRmlsdGVyVmFsdWUgfSBmcm9tIFwiQG1lbmRpeC9waXctdXRpbHMtaW50ZXJuYWxcIjtcbmltcG9ydCB7IERlZmF1bHRGaWx0ZXJFbnVtIH0gZnJvbSBcIi4uLy4uL3R5cGluZ3MvRGF0YWdyaWRUZXh0RmlsdGVyUHJvcHNcIjtcblxuZXhwb3J0IHR5cGUgRGVmYXVsdEZpbHRlclZhbHVlID0ge1xuICAgIHR5cGU6IERlZmF1bHRGaWx0ZXJFbnVtO1xuICAgIHZhbHVlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlRmlsdGVycyhmaWx0ZXJzPzogRmlsdGVyVmFsdWVbXSk6IERlZmF1bHRGaWx0ZXJWYWx1ZSB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKGZpbHRlcnMgJiYgZmlsdGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY29uc3QgW2ZpbHRlcl0gPSBmaWx0ZXJzO1xuICAgICAgICBsZXQgdHlwZTogRGVmYXVsdEZpbHRlckVudW0gPSBcImVxdWFsXCI7XG4gICAgICAgIHN3aXRjaCAoZmlsdGVyLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJjb250YWluc1wiOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBcImNvbnRhaW5zXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3RhcnRzLXdpdGhcIjpcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJzdGFydHNXaXRoXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZW5kcy13aXRoXCI6XG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiZW5kc1dpdGhcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCI+XCI6XG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiZ3JlYXRlclwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIj49XCI6XG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiZ3JlYXRlckVxdWFsXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiPVwiOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBcImVxdWFsXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiIT1cIjpcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJub3RFcXVhbFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIjxcIjpcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJzbWFsbGVyXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiPD1cIjpcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJzbWFsbGVyRXF1YWxcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHZhbHVlOiBTdHJpbmcoZmlsdGVyLnZhbHVlKVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBEYXRhZ3JpZFRleHRGaWx0ZXJDb250YWluZXJQcm9wcywgRGVmYXVsdEZpbHRlckVudW0gfSBmcm9tIFwiLi4vdHlwaW5ncy9EYXRhZ3JpZFRleHRGaWx0ZXJQcm9wc1wiO1xuXG5pbXBvcnQgeyBGaWx0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL0ZpbHRlckNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQWxlcnQsIEZpbHRlclR5cGUsIGdldEZpbHRlckRpc3BhdGNoZXIgfSBmcm9tIFwiQG1lbmRpeC9waXctdXRpbHMtaW50ZXJuYWxcIjtcblxuaW1wb3J0IHtcbiAgICBhdHRyaWJ1dGUsXG4gICAgY29udGFpbnMsXG4gICAgZW5kc1dpdGgsXG4gICAgZXF1YWxzLFxuICAgIGdyZWF0ZXJUaGFuLFxuICAgIGdyZWF0ZXJUaGFuT3JFcXVhbCxcbiAgICBsZXNzVGhhbixcbiAgICBsZXNzVGhhbk9yRXF1YWwsXG4gICAgbGl0ZXJhbCxcbiAgICBub3RFcXVhbCxcbiAgICBvcixcbiAgICBzdGFydHNXaXRoXG59IGZyb20gXCJtZW5kaXgvZmlsdGVycy9idWlsZGVyc1wiO1xuaW1wb3J0IHsgRmlsdGVyQ29uZGl0aW9uIH0gZnJvbSBcIm1lbmRpeC9maWx0ZXJzXCI7XG5pbXBvcnQgeyBMaXN0QXR0cmlidXRlVmFsdWUgfSBmcm9tIFwibWVuZGl4XCI7XG5pbXBvcnQgeyB0cmFuc2xhdGVGaWx0ZXJzIH0gZnJvbSBcIi4vdXRpbHMvZmlsdGVyc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBEYXRhZ3JpZFRleHRGaWx0ZXIocHJvcHM6IERhdGFncmlkVGV4dEZpbHRlckNvbnRhaW5lclByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBGaWx0ZXJDb250ZXh0ID0gZ2V0RmlsdGVyRGlzcGF0Y2hlcigpO1xuICAgIGNvbnN0IGFsZXJ0TWVzc2FnZSA9IChcbiAgICAgICAgPEFsZXJ0IGJvb3RzdHJhcFN0eWxlPVwiZGFuZ2VyXCI+XG4gICAgICAgICAgICBUaGUgdGV4dCBmaWx0ZXIgd2lkZ2V0IG11c3QgYmUgcGxhY2VkIGluc2lkZSB0aGUgaGVhZGVyIG9mIHRoZSBEYXRhIGdyaWQgMi4wIG9yIEdhbGxlcnkgd2lkZ2V0LlxuICAgICAgICA8L0FsZXJ0PlxuICAgICk7XG4gICAgY29uc3QgYWxlcnRNZXNzYWdlTXVsdGlwbGVGaWx0ZXJzID0gKFxuICAgICAgICA8QWxlcnQgYm9vdHN0cmFwU3R5bGU9XCJkYW5nZXJcIj5cbiAgICAgICAgICAgIFRvIHVzZSBtdWx0aXBsZSBmaWx0ZXJzIHlvdSBuZWVkIHRvIGRlZmluZSBhIGZpbHRlciBpZGVudGlmaWNhdGlvbiBpbiB0aGUgcHJvcGVydGllcyBvZiB0ZXh0IGZpbHRlciBvciBoYXZlXG4gICAgICAgICAgICBhICZxdW90O0hhc2hlZCBzdHJpbmcgb3IgU3RyaW5nJnF1b3Q7IGF0dHJpYnV0ZSBhdmFpbGFibGUuXG4gICAgICAgIDwvQWxlcnQ+XG4gICAgKTtcblxuICAgIHJldHVybiBGaWx0ZXJDb250ZXh0Py5Db25zdW1lciA/IChcbiAgICAgICAgPEZpbHRlckNvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgICAgICB7ZmlsdGVyQ29udGV4dFZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICFmaWx0ZXJDb250ZXh0VmFsdWUgfHxcbiAgICAgICAgICAgICAgICAgICAgIWZpbHRlckNvbnRleHRWYWx1ZS5maWx0ZXJEaXNwYXRjaGVyIHx8XG4gICAgICAgICAgICAgICAgICAgICghZmlsdGVyQ29udGV4dFZhbHVlLnNpbmdsZUF0dHJpYnV0ZSAmJiAhZmlsdGVyQ29udGV4dFZhbHVlLm11bHRpcGxlQXR0cmlidXRlcylcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0TWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEaXNwYXRjaGVyLFxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVBdHRyaWJ1dGUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxlQXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlSW5pdGlhbEZpbHRlcixcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGVJbml0aWFsRmlsdGVyc1xuICAgICAgICAgICAgICAgIH0gPSBmaWx0ZXJDb250ZXh0VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBzaW5nbGVBdHRyaWJ1dGUgPz8gZmluZEF0dHJpYnV0ZXNCeVR5cGUobXVsdGlwbGVBdHRyaWJ1dGVzKT8uWzBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG11bHRpcGxlQXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0TWVzc2FnZU11bHRpcGxlRmlsdGVycztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWxlcnRNZXNzYWdlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRGaWx0ZXIgPSBzaW5nbGVJbml0aWFsRmlsdGVyXG4gICAgICAgICAgICAgICAgICAgID8gdHJhbnNsYXRlRmlsdGVycyhzaW5nbGVJbml0aWFsRmlsdGVyKVxuICAgICAgICAgICAgICAgICAgICA6IHRyYW5zbGF0ZUZpbHRlcnMobXVsdGlwbGVJbml0aWFsRmlsdGVycz8uW2F0dHJpYnV0ZS5pZF0pOyAvLyBUT0RPOiBSZXN0b3JlIGFsbFxuXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZ2V0QXR0cmlidXRlVHlwZUVycm9yTWVzc2FnZShhdHRyaWJ1dGUudHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEFsZXJ0IGJvb3RzdHJhcFN0eWxlPVwiZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L0FsZXJ0PjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8RmlsdGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGp1c3RhYmxlPXtwcm9wcy5hZGp1c3RhYmxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEZpbHRlcj17ZGVmYXVsdEZpbHRlcj8udHlwZSA/PyBwcm9wcy5kZWZhdWx0RmlsdGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXk9e3Byb3BzLmRlbGF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17cHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwcm9wcy5wbGFjZWhvbGRlcj8udmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5SZWFkZXJCdXR0b25DYXB0aW9uPXtwcm9wcy5zY3JlZW5SZWFkZXJCdXR0b25DYXB0aW9uPy52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlblJlYWRlcklucHV0Q2FwdGlvbj17cHJvcHMuc2NyZWVuUmVhZGVySW5wdXRDYXB0aW9uPy52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXtwcm9wcy50YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUZpbHRlcnM9eyh2YWx1ZTogc3RyaW5nLCB0eXBlOiBEZWZhdWx0RmlsdGVyRW51bSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBzaW5nbGVBdHRyaWJ1dGUgPyBbYXR0cmlidXRlXSA6IGZpbmRBdHRyaWJ1dGVzQnlUeXBlKG11bHRpcGxlQXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29uZGl0aW9ucyA9IGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5tYXAoYXR0cmlidXRlID0+IGdldEZpbHRlckNvbmRpdGlvbihhdHRyaWJ1dGUsIHZhbHVlLCB0eXBlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoZmlsdGVyKTogZmlsdGVyIGlzIEZpbHRlckNvbmRpdGlvbiA9PiBmaWx0ZXIgIT09IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRGlzcGF0Y2hlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEZpbHRlckNvbmRpdGlvbjogKCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbnMgJiYgY29uZGl0aW9ucy5sZW5ndGggPiAxID8gb3IoLi4uY29uZGl0aW9ucykgOiBjb25kaXRpb25zPy5bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclR5cGU6IEZpbHRlclR5cGUuU1RSSU5HXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2RlZmF1bHRGaWx0ZXI/LnZhbHVlID8/IHByb3BzLmRlZmF1bHRWYWx1ZT8udmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgIDwvRmlsdGVyQ29udGV4dC5Db25zdW1lcj5cbiAgICApIDogKFxuICAgICAgICBhbGVydE1lc3NhZ2VcbiAgICApO1xufVxuXG5mdW5jdGlvbiBmaW5kQXR0cmlidXRlc0J5VHlwZShtdWx0aXBsZUF0dHJpYnV0ZXM/OiB7XG4gICAgW2tleTogc3RyaW5nXTogTGlzdEF0dHJpYnV0ZVZhbHVlO1xufSk6IExpc3RBdHRyaWJ1dGVWYWx1ZVtdIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIW11bHRpcGxlQXR0cmlidXRlcykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmtleXMobXVsdGlwbGVBdHRyaWJ1dGVzKVxuICAgICAgICAubWFwKGtleSA9PiBtdWx0aXBsZUF0dHJpYnV0ZXNba2V5XSlcbiAgICAgICAgLmZpbHRlcihhdHRyID0+IGF0dHIudHlwZS5tYXRjaCgvSGFzaFN0cmluZ3xTdHJpbmcvKSk7XG59XG5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZVR5cGVFcnJvck1lc3NhZ2UodHlwZT86IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiB0eXBlICYmICF0eXBlLm1hdGNoKC9IYXNoU3RyaW5nfFN0cmluZy8pXG4gICAgICAgID8gXCJUaGUgYXR0cmlidXRlIHR5cGUgYmVpbmcgdXNlZCBmb3IgRGF0YSBncmlkIHRleHQgZmlsdGVyIGlzIG5vdCAnSGFzaGVkIHN0cmluZyBvciBTdHJpbmcnXCJcbiAgICAgICAgOiBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXRGaWx0ZXJDb25kaXRpb24oXG4gICAgbGlzdEF0dHJpYnV0ZTogTGlzdEF0dHJpYnV0ZVZhbHVlLFxuICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgdHlwZTogRGVmYXVsdEZpbHRlckVudW1cbik6IEZpbHRlckNvbmRpdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKCFsaXN0QXR0cmlidXRlIHx8ICFsaXN0QXR0cmlidXRlLmZpbHRlcmFibGUgfHwgIXZhbHVlKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgZmlsdGVycyA9IHtcbiAgICAgICAgY29udGFpbnMsXG4gICAgICAgIHN0YXJ0c1dpdGgsXG4gICAgICAgIGVuZHNXaXRoLFxuICAgICAgICBncmVhdGVyOiBncmVhdGVyVGhhbixcbiAgICAgICAgZ3JlYXRlckVxdWFsOiBncmVhdGVyVGhhbk9yRXF1YWwsXG4gICAgICAgIGVxdWFsOiBlcXVhbHMsXG4gICAgICAgIG5vdEVxdWFsLFxuICAgICAgICBzbWFsbGVyOiBsZXNzVGhhbixcbiAgICAgICAgc21hbGxlckVxdWFsOiBsZXNzVGhhbk9yRXF1YWxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGZpbHRlcnNbdHlwZV0oYXR0cmlidXRlKGxpc3RBdHRyaWJ1dGUuaWQpLCBsaXRlcmFsKHZhbHVlKSk7XG59XG4iXSwibmFtZXMiOlsiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJjbGFzc05hbWVzIiwiY2xhc3NlcyIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmciLCJhcmdUeXBlIiwicHVzaCIsIkFycmF5IiwiaXNBcnJheSIsImlubmVyIiwiYXBwbHkiLCJrZXkiLCJjYWxsIiwiam9pbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJkZWZhdWx0Iiwid2luZG93IiwiQWxlcnQiLCJjbGFzc05hbWUiLCJib290c3RyYXBTdHlsZSIsImNoaWxkcmVuIiwiQ2hpbGRyZW4iLCJjb3VudCIsImNyZWF0ZUVsZW1lbnQiLCJkaXNwbGF5TmFtZSIsImRlYm91bmNlIiwiZnVuYyIsIndhaXRGb3IiLCJ0aW1lb3V0IiwiZGVib3VuY2VkIiwiYXJncyIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJGb3JtYXR0ZXJUeXBlIiwidXNlT25DbGlja091dHNpZGUiLCJyZWYiLCJoYW5kbGVyIiwidXNlRWZmZWN0IiwibGlzdGVuZXIiLCJldmVudCIsImN1cnJlbnQiLCJjb250YWlucyIsInRhcmdldCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJnZXRGaWx0ZXJEaXNwYXRjaGVyIiwiRmlsdGVyU2VsZWN0b3IiLCJwcm9wcyIsInZhbHVlIiwic2V0VmFsdWUiLCJ1c2VTdGF0ZSIsImRlZmF1bHRGaWx0ZXIiLCJzaG93Iiwic2V0U2hvdyIsImNvbXBvbmVudFJlZiIsInVzZVJlZiIsIm9uQ2xpY2siLCJ1c2VDYWxsYmFjayIsIm9uQ2hhbmdlIiwibmFtZSIsImFyaWFMYWJlbCIsImlkIiwicm9sZSIsIm9wdGlvbnMiLCJtYXAiLCJvcHRpb24iLCJpbmRleCIsIm9uS2V5RG93biIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRhYkluZGV4IiwibGFiZWwiLCJvciIsInN0YXJ0c1dpdGgiLCJlbmRzV2l0aCIsImdyZWF0ZXJUaGFuIiwiZ3JlYXRlclRoYW5PckVxdWFsIiwiZXF1YWxzIiwibm90RXF1YWwiLCJsZXNzVGhhbiIsImxlc3NUaGFuT3JFcXVhbCIsImF0dHJpYnV0ZSIsImxpdGVyYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7Q0FDQTtDQUVDLGFBQVk7O0NBR1osTUFBSUEsTUFBTSxHQUFHLEdBQUdDLGNBQWhCOztDQUVBLFdBQVNDLFVBQVQsR0FBdUI7Q0FDdEIsUUFBSUMsT0FBTyxHQUFHLEVBQWQ7O0NBRUEsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHQyxTQUFTLENBQUNDLE1BQTlCLEVBQXNDRixDQUFDLEVBQXZDLEVBQTJDO0NBQzFDLFVBQUlHLEdBQUcsR0FBR0YsU0FBUyxDQUFDRCxDQUFELENBQW5CO0NBQ0EsVUFBSSxDQUFDRyxHQUFMLEVBQVU7Q0FFVixVQUFJQyxPQUFPLEdBQUcsT0FBT0QsR0FBckI7O0NBRUEsVUFBSUMsT0FBTyxLQUFLLFFBQVosSUFBd0JBLE9BQU8sS0FBSyxRQUF4QyxFQUFrRDtDQUNqREwsUUFBQUEsT0FBTyxDQUFDTSxJQUFSLENBQWFGLEdBQWI7Q0FDQSxPQUZELE1BRU8sSUFBSUcsS0FBSyxDQUFDQyxPQUFOLENBQWNKLEdBQWQsS0FBc0JBLEdBQUcsQ0FBQ0QsTUFBOUIsRUFBc0M7Q0FDNUMsWUFBSU0sS0FBSyxHQUFHVixVQUFVLENBQUNXLEtBQVgsQ0FBaUIsSUFBakIsRUFBdUJOLEdBQXZCLENBQVo7O0NBQ0EsWUFBSUssS0FBSixFQUFXO0NBQ1ZULFVBQUFBLE9BQU8sQ0FBQ00sSUFBUixDQUFhRyxLQUFiO0NBQ0E7Q0FDRCxPQUxNLE1BS0EsSUFBSUosT0FBTyxLQUFLLFFBQWhCLEVBQTBCO0NBQ2hDLGFBQUssSUFBSU0sR0FBVCxJQUFnQlAsR0FBaEIsRUFBcUI7Q0FDcEIsY0FBSVAsTUFBTSxDQUFDZSxJQUFQLENBQVlSLEdBQVosRUFBaUJPLEdBQWpCLEtBQXlCUCxHQUFHLENBQUNPLEdBQUQsQ0FBaEMsRUFBdUM7Q0FDdENYLFlBQUFBLE9BQU8sQ0FBQ00sSUFBUixDQUFhSyxHQUFiO0NBQ0E7Q0FDRDtDQUNEO0NBQ0Q7O0NBRUQsV0FBT1gsT0FBTyxDQUFDYSxJQUFSLENBQWEsR0FBYixDQUFQO0NBQ0E7O0NBRUQsT0FBcUNDLE1BQU0sQ0FBQ0MsT0FBNUMsRUFBcUQ7Q0FDcERoQixJQUFBQSxVQUFVLENBQUNpQixPQUFYLEdBQXFCakIsVUFBckI7Q0FDQWUsSUFBQUEsY0FBQSxHQUFpQmYsVUFBakI7Q0FDQSxHQUhELE1BUU87Q0FDTmtCLElBQUFBLE1BQU0sQ0FBQ2xCLFVBQVAsR0FBb0JBLFVBQXBCO0NBQ0E7Q0FDRCxDQTVDQSxHQUFEOzs7Q0NMTyxNQUFNbUIsS0FBSyxHQUFHLENBQUM7Q0FBRUMsRUFBQUEsU0FBRjtDQUFhQyxFQUFBQSxjQUFiO0NBQTZCQyxFQUFBQTtDQUE3QixDQUFELEtBQTZDQyxjQUFRLENBQUNDLEtBQVQsQ0FBZUYsUUFBZixJQUEyQixDQUEzQixHQUFnQ0csbUJBQWEsQ0FBQyxLQUFELEVBQVE7Q0FBRUwsRUFBQUEsU0FBUyxFQUFFcEIsVUFBVSxDQUFFLGVBQWNxQixjQUFlLEVBQS9CLEVBQWtDRCxTQUFsQztDQUF2QixDQUFSLEVBQStFRSxRQUEvRSxDQUE3QyxHQUF5SSxJQUFwTTtDQUNQSCxLQUFLLENBQUNPLFdBQU4sR0FBb0IsT0FBcEI7O0NDb0JPLE1BQU1DLFFBQVEsR0FBRyxDQUFDQyxJQUFELEVBQU9DLE9BQVAsS0FBbUI7Q0FDdkMsTUFBSUMsT0FBTyxHQUFHLElBQWQ7O0NBQ0EsUUFBTUMsU0FBUyxHQUFHLENBQUMsR0FBR0MsSUFBSixLQUFhO0NBQzNCLFFBQUlGLE9BQU8sS0FBSyxJQUFoQixFQUFzQjtDQUNsQkcsTUFBQUEsWUFBWSxDQUFDSCxPQUFELENBQVo7Q0FDQUEsTUFBQUEsT0FBTyxHQUFHLElBQVY7Q0FDSDs7Q0FDREEsSUFBQUEsT0FBTyxHQUFHSSxVQUFVLENBQUMsTUFBTU4sSUFBSSxDQUFDLEdBQUdJLElBQUosQ0FBWCxFQUFzQkgsT0FBdEIsQ0FBcEI7Q0FDSCxHQU5EOztDQU9BLFNBQU9FLFNBQVA7Q0FDSCxDQVZNOztDQ3ZCQSxJQUFJSSxhQUFKOztDQUNQLENBQUMsVUFBVUEsYUFBVixFQUF5QjtDQUN0QkEsRUFBQUEsYUFBYSxDQUFDLFFBQUQsQ0FBYixHQUEwQixRQUExQjtDQUNBQSxFQUFBQSxhQUFhLENBQUMsVUFBRCxDQUFiLEdBQTRCLFVBQTVCO0NBQ0gsQ0FIRCxFQUdHQSxhQUFhLEtBQUtBLGFBQWEsR0FBRyxFQUFyQixDQUhoQjs7Q0NBTyxTQUFTQyxpQkFBVCxDQUEyQkMsR0FBM0IsRUFBZ0NDLE9BQWhDLEVBQXlDO0NBQzVDQyxFQUFBQSxlQUFTLENBQUMsTUFBTTtDQUNaLFVBQU1DLFFBQVEsR0FBSUMsS0FBRCxJQUFXO0NBQ3hCLFVBQUksQ0FBQ0osR0FBRyxDQUFDSyxPQUFMLElBQWdCTCxHQUFHLENBQUNLLE9BQUosQ0FBWUMsUUFBWixDQUFxQkYsS0FBSyxDQUFDRyxNQUEzQixDQUFwQixFQUF3RDtDQUNwRDtDQUNIOztDQUNETixNQUFBQSxPQUFPO0NBQ1YsS0FMRDs7Q0FNQU8sSUFBQUEsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixXQUExQixFQUF1Q04sUUFBdkM7Q0FDQUssSUFBQUEsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixZQUExQixFQUF3Q04sUUFBeEM7Q0FDQSxXQUFPLE1BQU07Q0FDVEssTUFBQUEsUUFBUSxDQUFDRSxtQkFBVCxDQUE2QixXQUE3QixFQUEwQ1AsUUFBMUM7Q0FDQUssTUFBQUEsUUFBUSxDQUFDRSxtQkFBVCxDQUE2QixZQUE3QixFQUEyQ1AsUUFBM0M7Q0FDSCxLQUhEO0NBSUgsR0FiUSxFQWFOLENBQUNILEdBQUQsRUFBTUMsT0FBTixDQWJNLENBQVQ7Q0FjSDs7Q0NmTSxTQUFTVSxtQkFBVCxHQUErQjtDQUNsQyxTQUFPOUIsTUFBTSxDQUFDLGlEQUFELENBQWI7Q0FDSDs7Q0NBTSxTQUFTK0IsY0FBVCxDQUF3QkMsS0FBeEIsRUFBK0I7Q0FDbEMsUUFBTSxDQUFDQyxLQUFELEVBQVFDLFFBQVIsSUFBb0JDLGNBQVEsQ0FBQ0gsS0FBSyxDQUFDSSxhQUFQLENBQWxDO0NBQ0EsUUFBTSxDQUFDQyxJQUFELEVBQU9DLE9BQVAsSUFBa0JILGNBQVEsQ0FBQyxLQUFELENBQWhDO0NBQ0EsUUFBTUksWUFBWSxHQUFHQyxZQUFNLENBQUMsSUFBRCxDQUEzQjtDQUNBdEIsRUFBQUEsaUJBQWlCLENBQUNxQixZQUFELEVBQWUsTUFBTUQsT0FBTyxDQUFDLEtBQUQsQ0FBNUIsQ0FBakI7Q0FDQSxRQUFNRyxPQUFPLEdBQUdDLGlCQUFXLENBQUVULEtBQUQsSUFBVztDQUNuQ0MsSUFBQUEsUUFBUSxDQUFDRCxLQUFELENBQVI7Q0FDQUQsSUFBQUEsS0FBSyxDQUFDVyxRQUFOLENBQWVWLEtBQWY7Q0FDQUssSUFBQUEsT0FBTyxDQUFDLEtBQUQsQ0FBUDtDQUNILEdBSjBCLEVBSXhCLENBQUNOLEtBQUssQ0FBQ1csUUFBUCxDQUp3QixDQUEzQjtDQUtBdEIsRUFBQUEsZUFBUyxDQUFDLE1BQU07Q0FDWmEsSUFBQUEsUUFBUSxDQUFDRixLQUFLLENBQUNJLGFBQVAsQ0FBUjtDQUNBSixJQUFBQSxLQUFLLENBQUNXLFFBQU4sQ0FBZVgsS0FBSyxDQUFDSSxhQUFyQjtDQUNILEdBSFEsRUFHTixDQUFDSixLQUFLLENBQUNJLGFBQVAsRUFBc0JKLEtBQUssQ0FBQ1csUUFBNUIsQ0FITSxDQUFUO0NBSUEsU0FBUXBDLG1CQUFhLENBQUMsS0FBRCxFQUFRO0NBQUVMLElBQUFBLFNBQVMsRUFBRTtDQUFiLEdBQVIsRUFDakJLLG1CQUFhLENBQUMsS0FBRCxFQUFRO0NBQUVMLElBQUFBLFNBQVMsRUFBRSx5QkFBYjtDQUF3Q2lCLElBQUFBLEdBQUcsRUFBRW9CO0NBQTdDLEdBQVIsRUFDVGhDLG1CQUFhLENBQUMsUUFBRCxFQUFXO0NBQUUscUJBQWtCLEdBQUV5QixLQUFLLENBQUNZLElBQUssbUJBQWpDO0NBQXFELHFCQUFpQlAsSUFBdEU7Q0FBNEUscUJBQWlCLElBQTdGO0NBQW1HLGtCQUFjTCxLQUFLLENBQUNhLFNBQXZIO0NBQWtJM0MsSUFBQUEsU0FBUyxFQUFFcEIsVUFBVSxDQUFDLG9EQUFELEVBQXVEbUQsS0FBdkQsQ0FBdko7Q0FBc05RLElBQUFBLE9BQU8sRUFBRSxNQUFNSCxPQUFPLENBQUNELElBQUksSUFBSSxDQUFDQSxJQUFWO0NBQTVPLEdBQVgsRUFBMFEsUUFBMVEsQ0FESixFQUVUQSxJQUFJLElBQUs5QixtQkFBYSxDQUFDLElBQUQsRUFBTztDQUFFdUMsSUFBQUEsRUFBRSxFQUFHLEdBQUVkLEtBQUssQ0FBQ1ksSUFBSyxtQkFBcEI7Q0FBd0MxQyxJQUFBQSxTQUFTLEVBQUUsa0JBQW5EO0NBQXVFNkMsSUFBQUEsSUFBSSxFQUFFLE1BQTdFO0NBQXFGLHVCQUFtQjtDQUF4RyxHQUFQLEVBQW9IZixLQUFLLENBQUNnQixPQUFOLENBQWNDLEdBQWQsQ0FBa0IsQ0FBQ0MsTUFBRCxFQUFTQyxLQUFULEtBQW9CNUMsbUJBQWEsQ0FBQyxJQUFELEVBQU87Q0FBRUwsSUFBQUEsU0FBUyxFQUFFcEIsVUFBVSxDQUFDO0NBQUUseUJBQW1CbUQsS0FBSyxLQUFLaUIsTUFBTSxDQUFDakI7Q0FBdEMsS0FBRCxDQUF2QjtDQUF3RXZDLElBQUFBLEdBQUcsRUFBRXlELEtBQTdFO0NBQW9GVixJQUFBQSxPQUFPLEVBQUUsTUFBTUEsT0FBTyxDQUFDUyxNQUFNLENBQUNqQixLQUFSLENBQTFHO0NBQTBIbUIsSUFBQUEsU0FBUyxFQUFFQyxDQUFDLElBQUk7Q0FDdFUsVUFBSUEsQ0FBQyxDQUFDM0QsR0FBRixLQUFVLE9BQVYsSUFBcUIyRCxDQUFDLENBQUMzRCxHQUFGLEtBQVUsR0FBbkMsRUFBd0M7Q0FDcEMyRCxRQUFBQSxDQUFDLENBQUNDLGNBQUY7Q0FDQWIsUUFBQUEsT0FBTyxDQUFDUyxNQUFNLENBQUNqQixLQUFSLENBQVA7Q0FDSDtDQUNKLEtBTCtMO0NBSzdMYyxJQUFBQSxJQUFJLEVBQUUsVUFMdUw7Q0FLM0tRLElBQUFBLFFBQVEsRUFBRTtDQUxpSyxHQUFQLEVBTXpMaEQsbUJBQWEsQ0FBQyxLQUFELEVBQVE7Q0FBRUwsSUFBQUEsU0FBUyxFQUFFcEIsVUFBVSxDQUFDLGFBQUQsRUFBZ0JvRSxNQUFNLENBQUNqQixLQUF2QixDQUF2QjtDQUFzRCxtQkFBZTtDQUFyRSxHQUFSLENBTjRLLEVBT3pMMUIsbUJBQWEsQ0FBQyxLQUFELEVBQVE7Q0FBRUwsSUFBQUEsU0FBUyxFQUFFO0NBQWIsR0FBUixFQUF1Q2dELE1BQU0sQ0FBQ00sS0FBOUMsQ0FQNEssQ0FBbkQsQ0FBcEgsQ0FGYixDQURJLENBQXJCO0NBV0g7O1VDVGUsZUFBZSxDQUFDLEtBQTJCOztLQUN2RCxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHckIsY0FBUSxDQUFvQixLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDekUsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBR0EsY0FBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLEdBQUdBLGNBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNqRCxNQUFNLFFBQVEsR0FBR0ssWUFBTSxDQUEwQixJQUFJLENBQUMsQ0FBQztLQUV2RG5CLGVBQVMsQ0FBQztTQUNOLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTthQUNiLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0IsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztVQUN6QjtNQUNKLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUVsQkEsZUFBUyxDQUFDOztTQUNOLE1BQUEsS0FBSyxDQUFDLGFBQWEsK0NBQW5CLEtBQUssRUFBaUIsS0FBSyxFQUFFLElBQUksRUFBRTtNQUN0QyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7S0FFbEIsTUFBTSxRQUFRLEdBQUdxQixpQkFBVyxDQUN4QixRQUFRLENBQUMsQ0FBQyxLQUFhLEtBQUssUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFDekQsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQ2hCLENBQUM7S0FFRixNQUFNLFVBQVUsR0FBR0EsaUJBQVcsQ0FBQztTQUMzQixJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7YUFDbEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztVQUM1QjtNQUNKLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0tBRWYsUUFDSW5DLDZCQUFLLFNBQVMsRUFBQyxrQkFBa0IsMkJBQWtCLEtBQUssQ0FBQyxRQUFRLG1DQUFJLENBQUM7U0FDakUsS0FBSyxDQUFDLFVBQVUsS0FDYkEsb0JBQUMsY0FBYyxJQUNYLFNBQVMsRUFBRSxLQUFLLENBQUMseUJBQXlCLEVBQzFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUNoQixhQUFhLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFDbEMsUUFBUSxFQUFFbUMsaUJBQVcsQ0FDakIsSUFBSTtpQkFDQSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2QsVUFBVSxFQUFFLENBQUM7Y0FDaEIsRUFDRCxDQUFDLFVBQVUsQ0FBQyxDQUNmLEVBQ0QsT0FBTyxFQUNIO2lCQUNJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFO2lCQUN4QyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRTtpQkFDN0MsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUU7aUJBQ3pDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFO2lCQUMzQyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFO2lCQUN6RCxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRTtpQkFDbEMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUU7aUJBQ3pDLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsY0FBYyxFQUFFO2lCQUMzQyxFQUFFLEtBQUssRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFO2NBQ04sR0FFN0QsQ0FDTDtTQUNEbkMsNkNBQ2dCLEtBQUssQ0FBQyx3QkFBd0IsRUFDMUMsU0FBUyxFQUFFekIsVUFBVSxDQUFDLGNBQWMsRUFBRSxFQUFFLGNBQWMsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsRUFDM0UsUUFBUSxFQUFFLENBQUM7aUJBQ1AsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzlCLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2NBQzVCLEVBQ0QsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQzlCLEdBQUcsRUFBRSxRQUFRLEVBQ2IsSUFBSSxFQUFDLE1BQU0sRUFDWCxLQUFLLEVBQUUsVUFBVSxHQUNuQixDQUNBLEVBQ1I7Q0FDTjs7VUNsRmdCLGdCQUFnQixDQUFDLE9BQXVCO0tBQ3BELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1NBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUM7U0FDekIsSUFBSSxJQUFJLEdBQXNCLE9BQU8sQ0FBQztTQUN0QyxRQUFRLE1BQU0sQ0FBQyxJQUFJO2FBQ2YsS0FBSyxVQUFVO2lCQUNYLElBQUksR0FBRyxVQUFVLENBQUM7aUJBQ2xCLE1BQU07YUFDVixLQUFLLGFBQWE7aUJBQ2QsSUFBSSxHQUFHLFlBQVksQ0FBQztpQkFDcEIsTUFBTTthQUNWLEtBQUssV0FBVztpQkFDWixJQUFJLEdBQUcsVUFBVSxDQUFDO2lCQUNsQixNQUFNO2FBQ1YsS0FBSyxHQUFHO2lCQUNKLElBQUksR0FBRyxTQUFTLENBQUM7aUJBQ2pCLE1BQU07YUFDVixLQUFLLElBQUk7aUJBQ0wsSUFBSSxHQUFHLGNBQWMsQ0FBQztpQkFDdEIsTUFBTTthQUNWLEtBQUssR0FBRztpQkFDSixJQUFJLEdBQUcsT0FBTyxDQUFDO2lCQUNmLE1BQU07YUFDVixLQUFLLElBQUk7aUJBQ0wsSUFBSSxHQUFHLFVBQVUsQ0FBQztpQkFDbEIsTUFBTTthQUNWLEtBQUssR0FBRztpQkFDSixJQUFJLEdBQUcsU0FBUyxDQUFDO2lCQUNqQixNQUFNO2FBQ1YsS0FBSyxJQUFJO2lCQUNMLElBQUksR0FBRyxjQUFjLENBQUM7aUJBQ3RCLE1BQU07VUFDYjtTQUNELE9BQU87YUFDSCxJQUFJO2FBQ0osS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO1VBQzlCLENBQUM7TUFDTDtLQUNELE9BQU8sU0FBUyxDQUFDO0NBQ3JCOztVQ3ZCd0Isa0JBQWtCLENBQUMsS0FBdUM7S0FDOUUsTUFBTSxhQUFhLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztLQUM1QyxNQUFNLFlBQVksSUFDZHlCLG9CQUFDLEtBQUssSUFBQyxjQUFjLEVBQUMsUUFBUSxzR0FFdEIsQ0FDWCxDQUFDO0tBQ0YsTUFBTSwyQkFBMkIsSUFDN0JBLG9CQUFDLEtBQUssSUFBQyxjQUFjLEVBQUMsUUFBUSxxS0FHdEIsQ0FDWCxDQUFDO0tBRUYsT0FBTyxDQUFBLGFBQWEsYUFBYixhQUFhLHVCQUFiLGFBQWEsQ0FBRSxRQUFRLEtBQzFCQSxvQkFBQyxhQUFhLENBQUMsUUFBUSxRQUNsQixrQkFBa0I7O1NBQ2YsSUFDSSxDQUFDLGtCQUFrQjthQUNuQixDQUFDLGtCQUFrQixDQUFDLGdCQUFnQjtjQUNuQyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixDQUFDLEVBQ2pGO2FBQ0UsT0FBTyxZQUFZLENBQUM7VUFDdkI7U0FDRCxNQUFNLEVBQ0YsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLHNCQUFzQixFQUN6QixHQUFHLGtCQUFrQixDQUFDO1NBRXZCLE1BQU0sU0FBUyxHQUFHLGVBQWUsYUFBZixlQUFlLGNBQWYsZUFBZSxTQUFJLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLDBDQUFHLENBQUMsQ0FBQyxDQUFDO1NBRW5GLElBQUksQ0FBQyxTQUFTLEVBQUU7YUFDWixJQUFJLGtCQUFrQixFQUFFO2lCQUNwQixPQUFPLDJCQUEyQixDQUFDO2NBQ3RDO2FBQ0QsT0FBTyxZQUFZLENBQUM7VUFDdkI7U0FFRCxNQUFNLGFBQWEsR0FBRyxtQkFBbUI7ZUFDbkMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUM7ZUFDckMsZ0JBQWdCLENBQUMsc0JBQXNCLGFBQXRCLHNCQUFzQix1QkFBdEIsc0JBQXNCLENBQUcsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBRS9ELE1BQU0sWUFBWSxHQUFHLDRCQUE0QixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsRSxJQUFJLFlBQVksRUFBRTthQUNkLE9BQU9BLG9CQUFDLEtBQUssSUFBQyxjQUFjLEVBQUMsUUFBUSxJQUFFLFlBQVksQ0FBUyxDQUFDO1VBQ2hFO1NBRUQsUUFDSUEsb0JBQUMsZUFBZSxJQUNaLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUM1QixhQUFhLFFBQUUsYUFBYSxhQUFiLGFBQWEsdUJBQWIsYUFBYSxDQUFFLElBQUksbUNBQUksS0FBSyxDQUFDLGFBQWEsRUFDekQsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQ2xCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUNoQixXQUFXLFFBQUUsS0FBSyxDQUFDLFdBQVcsMENBQUUsS0FBSyxFQUNyQyx5QkFBeUIsUUFBRSxLQUFLLENBQUMseUJBQXlCLDBDQUFFLEtBQUssRUFDakUsd0JBQXdCLFFBQUUsS0FBSyxDQUFDLHdCQUF3QiwwQ0FBRSxLQUFLLEVBQy9ELFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUN4QixhQUFhLEVBQUUsQ0FBQyxLQUFhLEVBQUUsSUFBdUI7aUJBQ2xELE1BQU0sVUFBVSxHQUFHLGVBQWUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7aUJBQzVGLE1BQU0sVUFBVSxHQUFHLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FDdkIsR0FBRyxDQUFDLFNBQVMsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUM1RCxNQUFNLENBQUMsQ0FBQyxNQUFNLEtBQWdDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQztpQkFDekUsZ0JBQWdCLENBQUM7cUJBQ2Isa0JBQWtCLEVBQUUsTUFDaEIsVUFBVSxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHa0QsV0FBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsVUFBVSxhQUFWLFVBQVUsdUJBQVYsVUFBVSxDQUFHLENBQUMsQ0FBQztxQkFDN0UsVUFBVTtrQkFDYixDQUFDLENBQUM7Y0FDTixFQUNELEtBQUssUUFBRSxhQUFhLGFBQWIsYUFBYSx1QkFBYixhQUFhLENBQUUsS0FBSyx5Q0FBSSxLQUFLLENBQUMsWUFBWSwwQ0FBRSxLQUFLLEdBQzFELEVBQ0o7TUFDTCxDQUNvQixLQUV6QixZQUFZLENBQ2YsQ0FBQztDQUNOLENBQUM7Q0FFRCxTQUFTLG9CQUFvQixDQUFDLGtCQUU3QjtLQUNHLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtTQUNyQixPQUFPLFNBQVMsQ0FBQztNQUNwQjtLQUNELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztVQUNqQyxHQUFHLENBQUMsR0FBRyxJQUFJLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1VBQ25DLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO0NBQzlELENBQUM7Q0FFRCxTQUFTLDRCQUE0QixDQUFDLElBQWE7S0FDL0MsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1dBQ3pDLDBGQUEwRjtXQUMxRixJQUFJLENBQUM7Q0FDZixDQUFDO0NBRUQsU0FBUyxrQkFBa0IsQ0FDdkIsYUFBaUMsRUFDakMsS0FBYSxFQUNiLElBQXVCO0tBRXZCLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSyxFQUFFO1NBQ3ZELE9BQU8sU0FBUyxDQUFDO01BQ3BCO0tBRUQsTUFBTSxPQUFPLEdBQUc7bUJBQ1poQyxpQkFBUTtxQkFDUmlDLG1CQUFVO21CQUNWQyxpQkFBUTtTQUNSLE9BQU8sRUFBRUMsb0JBQVc7U0FDcEIsWUFBWSxFQUFFQywyQkFBa0I7U0FDaEMsS0FBSyxFQUFFQyxlQUFNO21CQUNiQyxpQkFBUTtTQUNSLE9BQU8sRUFBRUMsaUJBQVE7U0FDakIsWUFBWSxFQUFFQyx3QkFBZTtNQUNoQyxDQUFDO0tBRUYsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUNDLGtCQUFTLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxFQUFFQyxnQkFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Q0FDdEU7Ozs7Ozs7OyJ9
