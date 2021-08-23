define(['react', 'big.js', 'mendix/filters/builders'], function (react, big_js, builders) { 'use strict';

	

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
	    const [value, setValue] = react.useState(undefined);
	    const [valueInput, setValueInput] = react.useState(undefined);
	    const inputRef = react.useRef(null);
	    react.useEffect(() => {
	        if (props.value) {
	            setValueInput(props.value.toString());
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
	                { value: "greater", label: "Greater than" },
	                { value: "greaterEqual", label: "Greater than or equal" },
	                { value: "equal", label: "Equal" },
	                { value: "notEqual", label: "Not equal" },
	                { value: "smaller", label: "Smaller than" },
	                { value: "smallerEqual", label: "Smaller than or equal" }
	            ] })),
	        react.createElement("input", { "aria-label": props.screenReaderInputCaption, className: classnames("form-control", { "filter-input": props.adjustable }), onChange: e => {
	                const value = e.target.value;
	                if (value && !isNaN(Number(value))) {
	                    setValueInput(value);
	                    onChange(new big_js.Big(Number(value)));
	                }
	                else {
	                    setValueInput(value);
	                    onChange(undefined);
	                }
	            }, placeholder: props.placeholder, ref: inputRef, type: "number", value: valueInput })));
	}

	function translateFilters(filters) {
	    if (filters && filters.length === 1) {
	        const [filter] = filters;
	        let type = "equal";
	        switch (filter.type) {
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
	            value: filter.value
	        };
	    }
	    return undefined;
	}

	function DatagridNumberFilter(props) {
	    const FilterContext = getFilterDispatcher();
	    const alertMessage = (react.createElement(Alert, { bootstrapStyle: "danger" }, "The number filter widget must be placed inside the header of the Data grid 2.0 or Gallery widget."));
	    const alertMessageMultipleFilters = (react.createElement(Alert, { bootstrapStyle: "danger" }, "To use multiple filters you need to define a filter identification in the properties of number filter or have a \"Auto number, Decimal, Integer or Long\" attribute available."));
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
	                    filterType: "number" /* NUMBER */
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
	        .filter(attr => attr.type.match(/AutoNumber|Decimal|Integer|Long/));
	}
	function getAttributeTypeErrorMessage(type) {
	    return type && !type.match(/AutoNumber|Decimal|Integer|Long/)
	        ? "The attribute type being used for Data grid number filter is not 'Auto number, Decimal, Integer or Long'"
	        : null;
	}
	function getFilterCondition(listAttribute, value, type) {
	    if (!listAttribute || !listAttribute.filterable || !value) {
	        return undefined;
	    }
	    const filters = {
	        greater: builders.greaterThan,
	        greaterEqual: builders.greaterThanOrEqual,
	        equal: builders.equals,
	        notEqual: builders.notEqual,
	        smaller: builders.lessThan,
	        smallerEqual: builders.lessThanOrEqual
	    };
	    return filters[type](builders.attribute(listAttribute.id), builders.literal(value));
	}

	return DatagridNumberFilter;

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWdyaWROdW1iZXJGaWx0ZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vdG9vbHMvcGl3LXV0aWxzLWludGVybmFsL2Rpc3QvY29tcG9uZW50cy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Rvb2xzL3Bpdy11dGlscy1pbnRlcm5hbC9kaXN0L2Z1bmN0aW9ucy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Rvb2xzL3Bpdy11dGlscy1pbnRlcm5hbC9kaXN0L2J1aWxkZXJzL0VkaXRhYmxlVmFsdWVCdWlsZGVyLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vdG9vbHMvcGl3LXV0aWxzLWludGVybmFsL2Rpc3QvdXRpbHMvZG9tLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vdG9vbHMvcGl3LXV0aWxzLWludGVybmFsL2Rpc3QvdXRpbHMvRmlsdGVyUHJvdmlkZXIuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi90b29scy9waXctdXRpbHMtaW50ZXJuYWwvZGlzdC93aWRnZXRzL0ZpbHRlclNlbGVjdG9yLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvRmlsdGVyQ29tcG9uZW50LnRzeCIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy91dGlscy9maWx0ZXJzLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL0RhdGFncmlkTnVtYmVyRmlsdGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE3IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpICYmIGFyZy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGlubmVyID0gY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdFx0XHRpZiAoaW5uZXIpIHtcblx0XHRcdFx0XHRjbGFzc2VzLnB1c2goaW5uZXIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRjbGFzc05hbWVzLmRlZmF1bHQgPSBjbGFzc05hbWVzO1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCJpbXBvcnQgeyBDaGlsZHJlbiwgY3JlYXRlRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmV4cG9ydCBjb25zdCBBbGVydCA9ICh7IGNsYXNzTmFtZSwgYm9vdHN0cmFwU3R5bGUsIGNoaWxkcmVuIH0pID0+IENoaWxkcmVuLmNvdW50KGNoaWxkcmVuKSA+IDAgPyAoY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogY2xhc3NOYW1lcyhgYWxlcnQgYWxlcnQtJHtib290c3RyYXBTdHlsZX1gLCBjbGFzc05hbWUpIH0sIGNoaWxkcmVuKSkgOiBudWxsO1xuQWxlcnQuZGlzcGxheU5hbWUgPSBcIkFsZXJ0XCI7XG4iLCJleHBvcnQgY29uc3QgZXhlY3V0ZUFjdGlvbiA9IChhY3Rpb24pID0+IHtcbiAgICBpZiAoYWN0aW9uICYmIGFjdGlvbi5jYW5FeGVjdXRlICYmICFhY3Rpb24uaXNFeGVjdXRpbmcpIHtcbiAgICAgICAgYWN0aW9uLmV4ZWN1dGUoKTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IGlzQXZhaWxhYmxlID0gKHByb3BlcnR5KSA9PiB7XG4gICAgcmV0dXJuIHByb3BlcnR5ICYmIHByb3BlcnR5LnN0YXR1cyA9PT0gXCJhdmFpbGFibGVcIiAvKiBBdmFpbGFibGUgKi8gJiYgcHJvcGVydHkudmFsdWU7XG59O1xuZXhwb3J0IGNvbnN0IHBhcnNlU3R5bGUgPSAoc3R5bGUgPSBcIlwiKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIHN0eWxlLnNwbGl0KFwiO1wiKS5yZWR1Y2UoKHN0eWxlT2JqZWN0LCBsaW5lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWlyID0gbGluZS5zcGxpdChcIjpcIik7XG4gICAgICAgICAgICBpZiAocGFpci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gcGFpclswXS50cmltKCkucmVwbGFjZSgvKC0uKS9nLCBtYXRjaCA9PiBtYXRjaFsxXS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgICAgICAgICBzdHlsZU9iamVjdFtuYW1lXSA9IHBhaXJbMV0udHJpbSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0eWxlT2JqZWN0O1xuICAgICAgICB9LCB7fSk7XG4gICAgfVxuICAgIGNhdGNoIChfKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IGRlYm91bmNlID0gKGZ1bmMsIHdhaXRGb3IpID0+IHtcbiAgICBsZXQgdGltZW91dCA9IG51bGw7XG4gICAgY29uc3QgZGVib3VuY2VkID0gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgaWYgKHRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IGZ1bmMoLi4uYXJncyksIHdhaXRGb3IpO1xuICAgIH07XG4gICAgcmV0dXJuIGRlYm91bmNlZDtcbn07XG4iLCJleHBvcnQgdmFyIEZvcm1hdHRlclR5cGU7XG4oZnVuY3Rpb24gKEZvcm1hdHRlclR5cGUpIHtcbiAgICBGb3JtYXR0ZXJUeXBlW1wiTnVtYmVyXCJdID0gXCJudW1iZXJcIjtcbiAgICBGb3JtYXR0ZXJUeXBlW1wiRGF0ZVRpbWVcIl0gPSBcImRhdGV0aW1lXCI7XG59KShGb3JtYXR0ZXJUeXBlIHx8IChGb3JtYXR0ZXJUeXBlID0ge30pKTtcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZVZhbHVlQnVpbGRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWRpdGFibGVWYWx1ZSA9IHtcbiAgICAgICAgICAgIHZhbHVlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBkaXNwbGF5VmFsdWU6IFwiXCIsXG4gICAgICAgICAgICBzdGF0dXM6IFwiYXZhaWxhYmxlXCIgLyogQXZhaWxhYmxlICovLFxuICAgICAgICAgICAgdmFsaWRhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgICAgICAgZm9ybWF0dGVyOiB7XG4gICAgICAgICAgICAgICAgZm9ybWF0OiBqZXN0LmZuKG5hbWUgPT4gYEZvcm1hdHRlZCAke25hbWV9YCksXG4gICAgICAgICAgICAgICAgcGFyc2U6IGplc3QuZm4oKSxcbiAgICAgICAgICAgICAgICB3aXRoQ29uZmlnOiBqZXN0LmZuKCgpID0+IG5ldyBFZGl0YWJsZVZhbHVlQnVpbGRlcigpLmJ1aWxkKCkuZm9ybWF0dGVyKSxcbiAgICAgICAgICAgICAgICBnZXRGb3JtYXRQbGFjZWhvbGRlcjogamVzdC5mbigpLFxuICAgICAgICAgICAgICAgIHR5cGU6IEZvcm1hdHRlclR5cGUuRGF0ZVRpbWUsXG4gICAgICAgICAgICAgICAgY29uZmlnOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFZhbGlkYXRvcjogamVzdC5mbigpLFxuICAgICAgICAgICAgc2V0VmFsdWU6IGplc3QuZm4oKHZhbHVlKSA9PiB0aGlzLndpdGhWYWx1ZSh2YWx1ZSkpLFxuICAgICAgICAgICAgc2V0VGV4dFZhbHVlOiBqZXN0LmZuKCksXG4gICAgICAgICAgICBzZXRGb3JtYXR0ZXI6IGplc3QuZm4oKVxuICAgICAgICB9O1xuICAgIH1cbiAgICB3aXRoVmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHRoaXMuZWRpdGFibGVWYWx1ZS5kaXNwbGF5VmFsdWUgPSB0aGlzLmVkaXRhYmxlVmFsdWUuZm9ybWF0dGVyLmZvcm1hdCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB3aXRoRm9ybWF0dGVyKGZvcm1hdHRlcikge1xuICAgICAgICB0aGlzLmVkaXRhYmxlVmFsdWUuZm9ybWF0dGVyID0gZm9ybWF0dGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgaXNSZWFkT25seSgpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGlzTG9hZGluZygpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnN0YXR1cyA9IFwibG9hZGluZ1wiIC8qIExvYWRpbmcgKi87XG4gICAgICAgIHJldHVybiB0aGlzLmlzUmVhZE9ubHkoKTtcbiAgICB9XG4gICAgaXNVbmF2YWlsYWJsZSgpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnN0YXR1cyA9IFwidW5hdmFpbGFibGVcIiAvKiBVbmF2YWlsYWJsZSAqLztcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNSZWFkT25seSgpO1xuICAgIH1cbiAgICB3aXRoVmFsaWRhdGlvbih2YWxpZGF0aW9uKSB7XG4gICAgICAgIHRoaXMuZWRpdGFibGVWYWx1ZS52YWxpZGF0aW9uID0gdmFsaWRhdGlvbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHdpdGhVbml2ZXJzZSguLi52YWx1ZXMpIHtcbiAgICAgICAgdGhpcy5lZGl0YWJsZVZhbHVlLnVuaXZlcnNlID0gdmFsdWVzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgYnVpbGQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRhYmxlVmFsdWU7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5leHBvcnQgZnVuY3Rpb24gdXNlT25DbGlja091dHNpZGUocmVmLCBoYW5kbGVyKSB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghcmVmLmN1cnJlbnQgfHwgcmVmLmN1cnJlbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhhbmRsZXIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBsaXN0ZW5lcik7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgbGlzdGVuZXIpO1xuICAgICAgICB9O1xuICAgIH0sIFtyZWYsIGhhbmRsZXJdKTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUNvbnRleHQgfSBmcm9tIFwicmVhY3RcIjtcbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWx0ZXJEaXNwYXRjaGVyKCkge1xuICAgIHJldHVybiB3aW5kb3dbXCJjb20ubWVuZGl4LndpZGdldHMud2ViLmZpbHRlcmFibGUuZmlsdGVyQ29udGV4dFwiXTtcbn1cbmV4cG9ydCBmdW5jdGlvbiB1c2VGaWx0ZXJDb250ZXh0KCkge1xuICAgIGNvbnN0IGdsb2JhbEZpbHRlckNvbnRleHQgPSBnZXRGaWx0ZXJEaXNwYXRjaGVyKCk7XG4gICAgaWYgKGdsb2JhbEZpbHRlckNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHsgRmlsdGVyQ29udGV4dDogZ2xvYmFsRmlsdGVyQ29udGV4dCB9O1xuICAgIH1cbiAgICBjb25zdCBGaWx0ZXJDb250ZXh0ID0gY3JlYXRlQ29udGV4dCh1bmRlZmluZWQpO1xuICAgIHdpbmRvd1tcImNvbS5tZW5kaXgud2lkZ2V0cy53ZWIuZmlsdGVyYWJsZS5maWx0ZXJDb250ZXh0XCJdID0gRmlsdGVyQ29udGV4dDtcbiAgICByZXR1cm4geyBGaWx0ZXJDb250ZXh0IH07XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0IHsgdXNlT25DbGlja091dHNpZGUgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmV4cG9ydCBmdW5jdGlvbiBGaWx0ZXJTZWxlY3Rvcihwcm9wcykge1xuICAgIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUocHJvcHMuZGVmYXVsdEZpbHRlcik7XG4gICAgY29uc3QgW3Nob3csIHNldFNob3ddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHVzZVJlZihudWxsKTtcbiAgICB1c2VPbkNsaWNrT3V0c2lkZShjb21wb25lbnRSZWYsICgpID0+IHNldFNob3coZmFsc2UpKTtcbiAgICBjb25zdCBvbkNsaWNrID0gdXNlQ2FsbGJhY2soKHZhbHVlKSA9PiB7XG4gICAgICAgIHNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgcHJvcHMub25DaGFuZ2UodmFsdWUpO1xuICAgICAgICBzZXRTaG93KGZhbHNlKTtcbiAgICB9LCBbcHJvcHMub25DaGFuZ2VdKTtcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRWYWx1ZShwcm9wcy5kZWZhdWx0RmlsdGVyKTtcbiAgICAgICAgcHJvcHMub25DaGFuZ2UocHJvcHMuZGVmYXVsdEZpbHRlcik7XG4gICAgfSwgW3Byb3BzLmRlZmF1bHRGaWx0ZXIsIHByb3BzLm9uQ2hhbmdlXSk7XG4gICAgcmV0dXJuIChjcmVhdGVFbGVtZW50KFwiZGl2XCIsIHsgY2xhc3NOYW1lOiBcImZpbHRlci1zZWxlY3RvclwiIH0sXG4gICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IFwiZmlsdGVyLXNlbGVjdG9yLWNvbnRlbnRcIiwgcmVmOiBjb21wb25lbnRSZWYgfSxcbiAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIiwgeyBcImFyaWEtY29udHJvbHNcIjogYCR7cHJvcHMubmFtZX0tZmlsdGVyLXNlbGVjdG9yc2AsIFwiYXJpYS1leHBhbmRlZFwiOiBzaG93LCBcImFyaWEtaGFzcG9wdXBcIjogdHJ1ZSwgXCJhcmlhLWxhYmVsXCI6IHByb3BzLmFyaWFMYWJlbCwgY2xhc3NOYW1lOiBjbGFzc05hbWVzKFwiYnRuIGJ0bi1kZWZhdWx0IGZpbHRlci1zZWxlY3Rvci1idXR0b24gYnV0dG9uLWljb25cIiwgdmFsdWUpLCBvbkNsaWNrOiAoKSA9PiBzZXRTaG93KHNob3cgPT4gIXNob3cpIH0sIFwiXFx1MDBBMFwiKSxcbiAgICAgICAgICAgIHNob3cgJiYgKGNyZWF0ZUVsZW1lbnQoXCJ1bFwiLCB7IGlkOiBgJHtwcm9wcy5uYW1lfS1maWx0ZXItc2VsZWN0b3JzYCwgY2xhc3NOYW1lOiBcImZpbHRlci1zZWxlY3RvcnNcIiwgcm9sZTogXCJtZW51XCIsIFwiZGF0YS1mb2N1c2luZGV4XCI6IDAgfSwgcHJvcHMub3B0aW9ucy5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IChjcmVhdGVFbGVtZW50KFwibGlcIiwgeyBjbGFzc05hbWU6IGNsYXNzTmFtZXMoeyBcImZpbHRlci1zZWxlY3RlZFwiOiB2YWx1ZSA9PT0gb3B0aW9uLnZhbHVlIH0pLCBrZXk6IGluZGV4LCBvbkNsaWNrOiAoKSA9PiBvbkNsaWNrKG9wdGlvbi52YWx1ZSksIG9uS2V5RG93bjogZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiIHx8IGUua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljayhvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgcm9sZTogXCJtZW51aXRlbVwiLCB0YWJJbmRleDogMCB9LFxuICAgICAgICAgICAgICAgIGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgeyBjbGFzc05hbWU6IGNsYXNzTmFtZXMoXCJmaWx0ZXItaWNvblwiLCBvcHRpb24udmFsdWUpLCBcImFyaWEtaGlkZGVuXCI6IHRydWUgfSksXG4gICAgICAgICAgICAgICAgY3JlYXRlRWxlbWVudChcImRpdlwiLCB7IGNsYXNzTmFtZTogXCJmaWx0ZXItbGFiZWxcIiB9LCBvcHRpb24ubGFiZWwpKSkpKSkpKSk7XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVFbGVtZW50LCBSZWFjdEVsZW1lbnQsIHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGRlYm91bmNlLCBGaWx0ZXJTZWxlY3RvciB9IGZyb20gXCJAbWVuZGl4L3Bpdy11dGlscy1pbnRlcm5hbFwiO1xuXG5pbXBvcnQgeyBEZWZhdWx0RmlsdGVyRW51bSB9IGZyb20gXCIuLi8uLi90eXBpbmdzL0RhdGFncmlkTnVtYmVyRmlsdGVyUHJvcHNcIjtcbmltcG9ydCB7IEJpZyB9IGZyb20gXCJiaWcuanNcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5cbmludGVyZmFjZSBGaWx0ZXJDb21wb25lbnRQcm9wcyB7XG4gICAgYWRqdXN0YWJsZTogYm9vbGVhbjtcbiAgICBkZWZhdWx0RmlsdGVyOiBEZWZhdWx0RmlsdGVyRW51bTtcbiAgICBkZWxheTogbnVtYmVyO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgcGxhY2Vob2xkZXI/OiBzdHJpbmc7XG4gICAgc2NyZWVuUmVhZGVyQnV0dG9uQ2FwdGlvbj86IHN0cmluZztcbiAgICBzY3JlZW5SZWFkZXJJbnB1dENhcHRpb24/OiBzdHJpbmc7XG4gICAgdGFiSW5kZXg/OiBudW1iZXI7XG4gICAgdXBkYXRlRmlsdGVycz86ICh2YWx1ZTogQmlnIHwgdW5kZWZpbmVkLCB0eXBlOiBEZWZhdWx0RmlsdGVyRW51bSkgPT4gdm9pZDtcbiAgICB2YWx1ZT86IEJpZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbHRlckNvbXBvbmVudChwcm9wczogRmlsdGVyQ29tcG9uZW50UHJvcHMpOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IFt0eXBlLCBzZXRUeXBlXSA9IHVzZVN0YXRlPERlZmF1bHRGaWx0ZXJFbnVtPihwcm9wcy5kZWZhdWx0RmlsdGVyKTtcbiAgICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IHVzZVN0YXRlPEJpZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgICBjb25zdCBbdmFsdWVJbnB1dCwgc2V0VmFsdWVJbnB1dF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZCk7XG4gICAgY29uc3QgaW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKHByb3BzLnZhbHVlKSB7XG4gICAgICAgICAgICBzZXRWYWx1ZUlucHV0KHByb3BzLnZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgc2V0VmFsdWUocHJvcHMudmFsdWUpO1xuICAgICAgICB9XG4gICAgfSwgW3Byb3BzLnZhbHVlXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBwcm9wcy51cGRhdGVGaWx0ZXJzPy4odmFsdWUsIHR5cGUpO1xuICAgIH0sIFt2YWx1ZSwgdHlwZV0pO1xuXG4gICAgY29uc3Qgb25DaGFuZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgZGVib3VuY2UoKHZhbHVlPzogQmlnKSA9PiBzZXRWYWx1ZSh2YWx1ZSksIHByb3BzLmRlbGF5KSxcbiAgICAgICAgW3Byb3BzLmRlbGF5XVxuICAgICk7XG5cbiAgICBjb25zdCBmb2N1c0lucHV0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBpZiAoaW5wdXRSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgaW5wdXRSZWYuY3VycmVudC5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfSwgW2lucHV0UmVmXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jb250YWluZXJcIiBkYXRhLWZvY3VzaW5kZXg9e3Byb3BzLnRhYkluZGV4ID8/IDB9PlxuICAgICAgICAgICAge3Byb3BzLmFkanVzdGFibGUgJiYgKFxuICAgICAgICAgICAgICAgIDxGaWx0ZXJTZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICBhcmlhTGFiZWw9e3Byb3BzLnNjcmVlblJlYWRlckJ1dHRvbkNhcHRpb259XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e3Byb3BzLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRGaWx0ZXI9e3Byb3BzLmRlZmF1bHRGaWx0ZXJ9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt1c2VDYWxsYmFjayhcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFR5cGUodHlwZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNJbnB1dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtmb2N1c0lucHV0XVxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcImdyZWF0ZXJcIiwgbGFiZWw6IFwiR3JlYXRlciB0aGFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcImdyZWF0ZXJFcXVhbFwiLCBsYWJlbDogXCJHcmVhdGVyIHRoYW4gb3IgZXF1YWxcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IFwiZXF1YWxcIiwgbGFiZWw6IFwiRXF1YWxcIiB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdmFsdWU6IFwibm90RXF1YWxcIiwgbGFiZWw6IFwiTm90IGVxdWFsXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcInNtYWxsZXJcIiwgbGFiZWw6IFwiU21hbGxlciB0aGFuXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHZhbHVlOiBcInNtYWxsZXJFcXVhbFwiLCBsYWJlbDogXCJTbWFsbGVyIHRoYW4gb3IgZXF1YWxcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdIGFzIEFycmF5PHsgdmFsdWU6IERlZmF1bHRGaWx0ZXJFbnVtOyBsYWJlbDogc3RyaW5nIH0+XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e3Byb3BzLnNjcmVlblJlYWRlcklucHV0Q2FwdGlvbn1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJmb3JtLWNvbnRyb2xcIiwgeyBcImZpbHRlci1pbnB1dFwiOiBwcm9wcy5hZGp1c3RhYmxlIH0pfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlICYmICFpc05hTihOdW1iZXIodmFsdWUpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmFsdWVJbnB1dCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZShuZXcgQmlnKE51bWJlcih2YWx1ZSkpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFZhbHVlSW5wdXQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2UodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3Byb3BzLnBsYWNlaG9sZGVyfVxuICAgICAgICAgICAgICAgIHJlZj17aW5wdXRSZWZ9XG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlSW5wdXR9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufVxuIiwiaW1wb3J0IHsgRGVmYXVsdEZpbHRlckVudW0gfSBmcm9tIFwiLi4vLi4vdHlwaW5ncy9EYXRhZ3JpZE51bWJlckZpbHRlclByb3BzXCI7XG5pbXBvcnQgeyBCaWcgfSBmcm9tIFwiYmlnLmpzXCI7XG5pbXBvcnQgeyBGaWx0ZXJWYWx1ZSB9IGZyb20gXCJAbWVuZGl4L3Bpdy11dGlscy1pbnRlcm5hbFwiO1xuXG5leHBvcnQgdHlwZSBEZWZhdWx0RmlsdGVyVmFsdWUgPSB7XG4gICAgdHlwZTogRGVmYXVsdEZpbHRlckVudW07XG4gICAgdmFsdWU6IEJpZztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGVGaWx0ZXJzKGZpbHRlcnM/OiBGaWx0ZXJWYWx1ZVtdKTogRGVmYXVsdEZpbHRlclZhbHVlIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoZmlsdGVycyAmJiBmaWx0ZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBjb25zdCBbZmlsdGVyXSA9IGZpbHRlcnM7XG4gICAgICAgIGxldCB0eXBlOiBEZWZhdWx0RmlsdGVyRW51bSA9IFwiZXF1YWxcIjtcbiAgICAgICAgc3dpdGNoIChmaWx0ZXIudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBcIj5cIjpcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJncmVhdGVyXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiPj1cIjpcbiAgICAgICAgICAgICAgICB0eXBlID0gXCJncmVhdGVyRXF1YWxcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCI9XCI6XG4gICAgICAgICAgICAgICAgdHlwZSA9IFwiZXF1YWxcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCIhPVwiOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBcIm5vdEVxdWFsXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiPFwiOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBcInNtYWxsZXJcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCI8PVwiOlxuICAgICAgICAgICAgICAgIHR5cGUgPSBcInNtYWxsZXJFcXVhbFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgdmFsdWU6IGZpbHRlci52YWx1ZVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCwgUmVhY3RFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBEYXRhZ3JpZE51bWJlckZpbHRlckNvbnRhaW5lclByb3BzLCBEZWZhdWx0RmlsdGVyRW51bSB9IGZyb20gXCIuLi90eXBpbmdzL0RhdGFncmlkTnVtYmVyRmlsdGVyUHJvcHNcIjtcblxuaW1wb3J0IHsgRmlsdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9GaWx0ZXJDb21wb25lbnRcIjtcbmltcG9ydCB7IEFsZXJ0LCBGaWx0ZXJUeXBlLCBnZXRGaWx0ZXJEaXNwYXRjaGVyIH0gZnJvbSBcIkBtZW5kaXgvcGl3LXV0aWxzLWludGVybmFsXCI7XG5pbXBvcnQgeyBCaWcgfSBmcm9tIFwiYmlnLmpzXCI7XG5cbmltcG9ydCB7XG4gICAgYXR0cmlidXRlLFxuICAgIGVxdWFscyxcbiAgICBncmVhdGVyVGhhbixcbiAgICBncmVhdGVyVGhhbk9yRXF1YWwsXG4gICAgbGVzc1RoYW4sXG4gICAgbGVzc1RoYW5PckVxdWFsLFxuICAgIGxpdGVyYWwsXG4gICAgbm90RXF1YWwsXG4gICAgb3Jcbn0gZnJvbSBcIm1lbmRpeC9maWx0ZXJzL2J1aWxkZXJzXCI7XG5pbXBvcnQgeyBGaWx0ZXJDb25kaXRpb24gfSBmcm9tIFwibWVuZGl4L2ZpbHRlcnNcIjtcbmltcG9ydCB7IExpc3RBdHRyaWJ1dGVWYWx1ZSB9IGZyb20gXCJtZW5kaXhcIjtcbmltcG9ydCB7IHRyYW5zbGF0ZUZpbHRlcnMgfSBmcm9tIFwiLi91dGlscy9maWx0ZXJzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERhdGFncmlkTnVtYmVyRmlsdGVyKHByb3BzOiBEYXRhZ3JpZE51bWJlckZpbHRlckNvbnRhaW5lclByb3BzKTogUmVhY3RFbGVtZW50IHtcbiAgICBjb25zdCBGaWx0ZXJDb250ZXh0ID0gZ2V0RmlsdGVyRGlzcGF0Y2hlcigpO1xuICAgIGNvbnN0IGFsZXJ0TWVzc2FnZSA9IChcbiAgICAgICAgPEFsZXJ0IGJvb3RzdHJhcFN0eWxlPVwiZGFuZ2VyXCI+XG4gICAgICAgICAgICBUaGUgbnVtYmVyIGZpbHRlciB3aWRnZXQgbXVzdCBiZSBwbGFjZWQgaW5zaWRlIHRoZSBoZWFkZXIgb2YgdGhlIERhdGEgZ3JpZCAyLjAgb3IgR2FsbGVyeSB3aWRnZXQuXG4gICAgICAgIDwvQWxlcnQ+XG4gICAgKTtcbiAgICBjb25zdCBhbGVydE1lc3NhZ2VNdWx0aXBsZUZpbHRlcnMgPSAoXG4gICAgICAgIDxBbGVydCBib290c3RyYXBTdHlsZT1cImRhbmdlclwiPlxuICAgICAgICAgICAgVG8gdXNlIG11bHRpcGxlIGZpbHRlcnMgeW91IG5lZWQgdG8gZGVmaW5lIGEgZmlsdGVyIGlkZW50aWZpY2F0aW9uIGluIHRoZSBwcm9wZXJ0aWVzIG9mIG51bWJlciBmaWx0ZXIgb3JcbiAgICAgICAgICAgIGhhdmUgYSAmcXVvdDtBdXRvIG51bWJlciwgRGVjaW1hbCwgSW50ZWdlciBvciBMb25nJnF1b3Q7IGF0dHJpYnV0ZSBhdmFpbGFibGUuXG4gICAgICAgIDwvQWxlcnQ+XG4gICAgKTtcblxuICAgIHJldHVybiBGaWx0ZXJDb250ZXh0Py5Db25zdW1lciA/IChcbiAgICAgICAgPEZpbHRlckNvbnRleHQuQ29uc3VtZXI+XG4gICAgICAgICAgICB7ZmlsdGVyQ29udGV4dFZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICFmaWx0ZXJDb250ZXh0VmFsdWUgfHxcbiAgICAgICAgICAgICAgICAgICAgIWZpbHRlckNvbnRleHRWYWx1ZS5maWx0ZXJEaXNwYXRjaGVyIHx8XG4gICAgICAgICAgICAgICAgICAgICghZmlsdGVyQ29udGV4dFZhbHVlLnNpbmdsZUF0dHJpYnV0ZSAmJiAhZmlsdGVyQ29udGV4dFZhbHVlLm11bHRpcGxlQXR0cmlidXRlcylcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0TWVzc2FnZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJEaXNwYXRjaGVyLFxuICAgICAgICAgICAgICAgICAgICBzaW5nbGVBdHRyaWJ1dGUsXG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxlQXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICAgICAgc2luZ2xlSW5pdGlhbEZpbHRlcixcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGVJbml0aWFsRmlsdGVyc1xuICAgICAgICAgICAgICAgIH0gPSBmaWx0ZXJDb250ZXh0VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGUgPSBzaW5nbGVBdHRyaWJ1dGUgPz8gZmluZEF0dHJpYnV0ZXNCeVR5cGUobXVsdGlwbGVBdHRyaWJ1dGVzKT8uWzBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG11bHRpcGxlQXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0TWVzc2FnZU11bHRpcGxlRmlsdGVycztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWxlcnRNZXNzYWdlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRGaWx0ZXIgPSBzaW5nbGVJbml0aWFsRmlsdGVyXG4gICAgICAgICAgICAgICAgICAgID8gdHJhbnNsYXRlRmlsdGVycyhzaW5nbGVJbml0aWFsRmlsdGVyKVxuICAgICAgICAgICAgICAgICAgICA6IHRyYW5zbGF0ZUZpbHRlcnMobXVsdGlwbGVJbml0aWFsRmlsdGVycz8uW2F0dHJpYnV0ZS5pZF0pOyAvLyBUT0RPOiBSZXN0b3JlIGFsbFxuXG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZ2V0QXR0cmlidXRlVHlwZUVycm9yTWVzc2FnZShhdHRyaWJ1dGUudHlwZSk7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPEFsZXJ0IGJvb3RzdHJhcFN0eWxlPVwiZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L0FsZXJ0PjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8RmlsdGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGp1c3RhYmxlPXtwcm9wcy5hZGp1c3RhYmxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdEZpbHRlcj17ZGVmYXVsdEZpbHRlcj8udHlwZSA/PyBwcm9wcy5kZWZhdWx0RmlsdGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsYXk9e3Byb3BzLmRlbGF5fVxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZT17cHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwcm9wcy5wbGFjZWhvbGRlcj8udmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JlZW5SZWFkZXJCdXR0b25DYXB0aW9uPXtwcm9wcy5zY3JlZW5SZWFkZXJCdXR0b25DYXB0aW9uPy52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmVlblJlYWRlcklucHV0Q2FwdGlvbj17cHJvcHMuc2NyZWVuUmVhZGVySW5wdXRDYXB0aW9uPy52YWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PXtwcm9wcy50YWJJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUZpbHRlcnM9eyh2YWx1ZTogQmlnIHwgdW5kZWZpbmVkLCB0eXBlOiBEZWZhdWx0RmlsdGVyRW51bSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBzaW5nbGVBdHRyaWJ1dGUgPyBbYXR0cmlidXRlXSA6IGZpbmRBdHRyaWJ1dGVzQnlUeXBlKG11bHRpcGxlQXR0cmlidXRlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29uZGl0aW9ucyA9IGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPy5tYXAoYXR0cmlidXRlID0+IGdldEZpbHRlckNvbmRpdGlvbihhdHRyaWJ1dGUsIHZhbHVlLCB0eXBlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigoZmlsdGVyKTogZmlsdGVyIGlzIEZpbHRlckNvbmRpdGlvbiA9PiBmaWx0ZXIgIT09IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyRGlzcGF0Y2hlcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEZpbHRlckNvbmRpdGlvbjogKCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbnMgJiYgY29uZGl0aW9ucy5sZW5ndGggPiAxID8gb3IoLi4uY29uZGl0aW9ucykgOiBjb25kaXRpb25zPy5bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlclR5cGU6IEZpbHRlclR5cGUuTlVNQkVSXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2RlZmF1bHRGaWx0ZXI/LnZhbHVlID8/IHByb3BzLmRlZmF1bHRWYWx1ZT8udmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgIDwvRmlsdGVyQ29udGV4dC5Db25zdW1lcj5cbiAgICApIDogKFxuICAgICAgICBhbGVydE1lc3NhZ2VcbiAgICApO1xufVxuXG5mdW5jdGlvbiBmaW5kQXR0cmlidXRlc0J5VHlwZShtdWx0aXBsZUF0dHJpYnV0ZXM/OiB7XG4gICAgW2tleTogc3RyaW5nXTogTGlzdEF0dHJpYnV0ZVZhbHVlO1xufSk6IExpc3RBdHRyaWJ1dGVWYWx1ZVtdIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIW11bHRpcGxlQXR0cmlidXRlcykge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmtleXMobXVsdGlwbGVBdHRyaWJ1dGVzKVxuICAgICAgICAubWFwKGtleSA9PiBtdWx0aXBsZUF0dHJpYnV0ZXNba2V5XSlcbiAgICAgICAgLmZpbHRlcihhdHRyID0+IGF0dHIudHlwZS5tYXRjaCgvQXV0b051bWJlcnxEZWNpbWFsfEludGVnZXJ8TG9uZy8pKTtcbn1cblxuZnVuY3Rpb24gZ2V0QXR0cmlidXRlVHlwZUVycm9yTWVzc2FnZSh0eXBlPzogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHR5cGUgJiYgIXR5cGUubWF0Y2goL0F1dG9OdW1iZXJ8RGVjaW1hbHxJbnRlZ2VyfExvbmcvKVxuICAgICAgICA/IFwiVGhlIGF0dHJpYnV0ZSB0eXBlIGJlaW5nIHVzZWQgZm9yIERhdGEgZ3JpZCBudW1iZXIgZmlsdGVyIGlzIG5vdCAnQXV0byBudW1iZXIsIERlY2ltYWwsIEludGVnZXIgb3IgTG9uZydcIlxuICAgICAgICA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIGdldEZpbHRlckNvbmRpdGlvbihcbiAgICBsaXN0QXR0cmlidXRlOiBMaXN0QXR0cmlidXRlVmFsdWUsXG4gICAgdmFsdWU6IEJpZyB8IHVuZGVmaW5lZCxcbiAgICB0eXBlOiBEZWZhdWx0RmlsdGVyRW51bVxuKTogRmlsdGVyQ29uZGl0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIWxpc3RBdHRyaWJ1dGUgfHwgIWxpc3RBdHRyaWJ1dGUuZmlsdGVyYWJsZSB8fCAhdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBmaWx0ZXJzID0ge1xuICAgICAgICBncmVhdGVyOiBncmVhdGVyVGhhbixcbiAgICAgICAgZ3JlYXRlckVxdWFsOiBncmVhdGVyVGhhbk9yRXF1YWwsXG4gICAgICAgIGVxdWFsOiBlcXVhbHMsXG4gICAgICAgIG5vdEVxdWFsLFxuICAgICAgICBzbWFsbGVyOiBsZXNzVGhhbixcbiAgICAgICAgc21hbGxlckVxdWFsOiBsZXNzVGhhbk9yRXF1YWxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGZpbHRlcnNbdHlwZV0oYXR0cmlidXRlKGxpc3RBdHRyaWJ1dGUuaWQpLCBsaXRlcmFsKHZhbHVlKSk7XG59XG4iXSwibmFtZXMiOlsiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJjbGFzc05hbWVzIiwiY2xhc3NlcyIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJhcmciLCJhcmdUeXBlIiwicHVzaCIsIkFycmF5IiwiaXNBcnJheSIsImlubmVyIiwiYXBwbHkiLCJrZXkiLCJjYWxsIiwiam9pbiIsIm1vZHVsZSIsImV4cG9ydHMiLCJkZWZhdWx0Iiwid2luZG93IiwiQWxlcnQiLCJjbGFzc05hbWUiLCJib290c3RyYXBTdHlsZSIsImNoaWxkcmVuIiwiQ2hpbGRyZW4iLCJjb3VudCIsImNyZWF0ZUVsZW1lbnQiLCJkaXNwbGF5TmFtZSIsImRlYm91bmNlIiwiZnVuYyIsIndhaXRGb3IiLCJ0aW1lb3V0IiwiZGVib3VuY2VkIiwiYXJncyIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJGb3JtYXR0ZXJUeXBlIiwidXNlT25DbGlja091dHNpZGUiLCJyZWYiLCJoYW5kbGVyIiwidXNlRWZmZWN0IiwibGlzdGVuZXIiLCJldmVudCIsImN1cnJlbnQiLCJjb250YWlucyIsInRhcmdldCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJnZXRGaWx0ZXJEaXNwYXRjaGVyIiwiRmlsdGVyU2VsZWN0b3IiLCJwcm9wcyIsInZhbHVlIiwic2V0VmFsdWUiLCJ1c2VTdGF0ZSIsImRlZmF1bHRGaWx0ZXIiLCJzaG93Iiwic2V0U2hvdyIsImNvbXBvbmVudFJlZiIsInVzZVJlZiIsIm9uQ2xpY2siLCJ1c2VDYWxsYmFjayIsIm9uQ2hhbmdlIiwibmFtZSIsImFyaWFMYWJlbCIsImlkIiwicm9sZSIsIm9wdGlvbnMiLCJtYXAiLCJvcHRpb24iLCJpbmRleCIsIm9uS2V5RG93biIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRhYkluZGV4IiwibGFiZWwiLCJCaWciLCJvciIsImdyZWF0ZXJUaGFuIiwiZ3JlYXRlclRoYW5PckVxdWFsIiwiZXF1YWxzIiwibm90RXF1YWwiLCJsZXNzVGhhbiIsImxlc3NUaGFuT3JFcXVhbCIsImF0dHJpYnV0ZSIsImxpdGVyYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQUE7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7Q0FDQTtDQUVDLGFBQVk7O0NBR1osTUFBSUEsTUFBTSxHQUFHLEdBQUdDLGNBQWhCOztDQUVBLFdBQVNDLFVBQVQsR0FBdUI7Q0FDdEIsUUFBSUMsT0FBTyxHQUFHLEVBQWQ7O0NBRUEsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHQyxTQUFTLENBQUNDLE1BQTlCLEVBQXNDRixDQUFDLEVBQXZDLEVBQTJDO0NBQzFDLFVBQUlHLEdBQUcsR0FBR0YsU0FBUyxDQUFDRCxDQUFELENBQW5CO0NBQ0EsVUFBSSxDQUFDRyxHQUFMLEVBQVU7Q0FFVixVQUFJQyxPQUFPLEdBQUcsT0FBT0QsR0FBckI7O0NBRUEsVUFBSUMsT0FBTyxLQUFLLFFBQVosSUFBd0JBLE9BQU8sS0FBSyxRQUF4QyxFQUFrRDtDQUNqREwsUUFBQUEsT0FBTyxDQUFDTSxJQUFS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
