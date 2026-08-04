import { jsxs, jsx } from 'react/jsx-runtime';
import { useCallback, useMemo, useState, useRef, createContext, useContext, useEffect, useLayoutEffect, Fragment } from 'react';
import { Icon } from 'mendix/components/web/Icon';
import { or, equals, association, literal } from 'mendix/filters/builders';

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

const keyValueToHandlerNameMap = {
    Enter: "Enter",
    " ": "Space",
    Home: "Home",
    End: "End",
    ArrowUp: "ArrowUp",
    ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft",
    ArrowRight: "ArrowRight"
};
function isKeyValueToHandle(key) {
    return Object.hasOwn(keyValueToHandlerNameMap, key);
}
function itCameFromCurrentTarget(event) {
    return event.currentTarget === event.target;
}
const useKeyboardHandler = keyHandlers => {
    return useCallback(event => {
        if (!itCameFromCurrentTarget(event)) {
            return;
        }
        if (isKeyValueToHandle(event.key)) {
            const handlerFn = keyHandlers[keyValueToHandlerNameMap[event.key]];
            if (!handlerFn) {
                return;
            }
            event.stopPropagation();
            event.preventDefault();
            handlerFn(event);
        }
    }, [keyHandlers]);
};

const useTreeNodeFocusChangeHandler = () => {
    return useCallback((targetElement, focusTargetChange, traverseOption) => {
        if (targetElement && targetElement instanceof Element) {
            const getTreeNodeHeadersInElement = (el) => {
                if (el) {
                    const allBranches = Array.from(el.querySelectorAll("li.widget-tree-node-branch"));
                    const hiddenBodies = Array.from(el.querySelectorAll(".widget-tree-node-body[aria-hidden=true]"));
                    return allBranches.filter(node => !hiddenBodies.some(hiddenBody => hiddenBody.contains(node)));
                }
                return [];
            };
            const currentTreeNodeScope = Array.from(document.body.querySelectorAll(".widget-tree-node[role=tree]")).find(element => element.contains(targetElement));
            if (!currentTreeNodeScope) {
                return;
            }
            const targetableBranches = getTreeNodeHeadersInElement(currentTreeNodeScope);
            const numberOfTargetableBranches = targetableBranches.length;
            if (numberOfTargetableBranches === 0) {
                return;
            }
            const currentBranchIndex = targetableBranches.findIndex(branch => branch.isSameNode(targetElement));
            switch (focusTargetChange) {
                case "FIRST" /* FocusTargetChange.FIRST */:
                    targetableBranches[0].focus();
                    break;
                case "LAST" /* FocusTargetChange.LAST */:
                    targetableBranches[numberOfTargetableBranches - 1].focus();
                    break;
                case "PREVIOUS" /* FocusTargetChange.PREVIOUS */: {
                    if (traverseOption === "VERTICAL") {
                        const parentTreeNodeHeaders = getTreeNodeHeadersInElement(document).filter(node => node.lastElementChild?.contains(targetElement));
                        if (parentTreeNodeHeaders.length > 0) {
                            parentTreeNodeHeaders[parentTreeNodeHeaders.length - 1].focus();
                        }
                        return;
                    }
                    const newBranchIndex = currentBranchIndex - 1;
                    const newBranchIndexProcessed = Math.max(newBranchIndex, 0);
                    if (newBranchIndexProcessed !== currentBranchIndex) {
                        targetableBranches[newBranchIndexProcessed].focus();
                    }
                    break;
                }
                case "NEXT" /* FocusTargetChange.NEXT */: {
                    if (traverseOption === "VERTICAL") {
                        const childTreeNodeHeaders = getTreeNodeHeadersInElement(targetElement.lastElementChild);
                        if (childTreeNodeHeaders.length > 0) {
                            childTreeNodeHeaders[0].focus();
                        }
                        return;
                    }
                    const newBranchIndex = currentBranchIndex + 1;
                    const newBranchIndexProcessed = Math.min(newBranchIndex, numberOfTargetableBranches - 1);
                    if (newBranchIndexProcessed !== currentBranchIndex) {
                        targetableBranches[newBranchIndexProcessed].focus();
                    }
                    break;
                }
            }
        }
    }, []);
};
const useTreeNodeBranchKeyboardHandler = (toggleTreeNodeContent, changeFocus, treeNodeState, isActualLeafNode, eventTargetIsNotCurrentBranch) => {
    const keyHandlers = useMemo(() => ({
        Enter: toggleTreeNodeContent,
        Space: toggleTreeNodeContent,
        Home: event => changeFocus(event.currentTarget, "FIRST" /* FocusTargetChange.FIRST */),
        End: event => changeFocus(event.currentTarget, "LAST" /* FocusTargetChange.LAST */),
        ArrowUp: event => changeFocus(event.currentTarget, "PREVIOUS" /* FocusTargetChange.PREVIOUS */, "HORIZONTAL"),
        ArrowDown: event => changeFocus(event.currentTarget, "NEXT" /* FocusTargetChange.NEXT */, "HORIZONTAL"),
        ArrowRight: event => {
            if (treeNodeState === "COLLAPSED_WITH_CSS" /* TreeNodeState.COLLAPSED_WITH_CSS */ ||
                treeNodeState === "COLLAPSED_WITH_JS" /* TreeNodeState.COLLAPSED_WITH_JS */) {
                toggleTreeNodeContent(event);
            }
            else if (treeNodeState === "EXPANDED" /* TreeNodeState.EXPANDED */ || isActualLeafNode) {
                changeFocus(event.currentTarget, "NEXT" /* FocusTargetChange.NEXT */, "VERTICAL");
            }
        },
        ArrowLeft: event => {
            if (treeNodeState === "COLLAPSED_WITH_CSS" /* TreeNodeState.COLLAPSED_WITH_CSS */ ||
                treeNodeState === "COLLAPSED_WITH_JS" /* TreeNodeState.COLLAPSED_WITH_JS */ ||
                isActualLeafNode) {
                changeFocus(event.currentTarget, "PREVIOUS" /* FocusTargetChange.PREVIOUS */, "VERTICAL");
            }
            else if (treeNodeState === "EXPANDED" /* TreeNodeState.EXPANDED */) {
                toggleTreeNodeContent(event);
            }
        }
    }), [toggleTreeNodeContent, changeFocus, treeNodeState, isActualLeafNode]);
    const keyboardHandler = useKeyboardHandler(keyHandlers);
    return useCallback(event => {
        if (eventTargetIsNotCurrentBranch(event)) {
            return;
        }
        return keyboardHandler(event);
    }, [eventTargetIsNotCurrentBranch, keyboardHandler]);
};

function useTreeNodeRef() {
    // Combination of useState + useCallback is necessary here over useRef because it needs to trigger an update in useInformParentContextOfChildNodes
    const [treeNodeElement, setTreeNodeElement] = useState(null);
    const updateTreeNodeElement = useCallback((node) => {
        if (node) {
            setTreeNodeElement(node);
        }
    }, []);
    return [treeNodeElement, updateTreeNodeElement];
}

const useTreeNodeLazyLoading = (treeNodeBranchBody) => {
    const hasNestedTreeNode = useCallback(() => treeNodeBranchBody.current?.lastElementChild?.className.includes("widget-tree-node") ?? true, []);
    return { hasNestedTreeNode };
};

const useAnimatedTreeNodeContentHeight = (treeNodeBranchBody) => {
    const currentElementHeight = useRef(undefined);
    const [isAnimating, setIsAnimating] = useState(false);
    const captureElementHeight = useCallback(() => {
        currentElementHeight.current = treeNodeBranchBody.current?.getBoundingClientRect().height ?? 0;
    }, []);
    const animateTreeNodeContent = useCallback(() => {
        if (treeNodeBranchBody.current &&
            currentElementHeight.current !== undefined &&
            !Number.isNaN(currentElementHeight.current)) {
            const newElementHeight = treeNodeBranchBody.current.getBoundingClientRect().height;
            if (newElementHeight - currentElementHeight.current !== 0) {
                setIsAnimating(true);
                treeNodeBranchBody.current.style.height = `${currentElementHeight.current}px`;
                const timeout = setTimeout(() => {
                    treeNodeBranchBody.current.style.height = `${newElementHeight}px`;
                    currentElementHeight.current = newElementHeight;
                }, 1);
                return () => clearTimeout(timeout);
            }
        }
    }, []);
    const cleanupAnimation = useCallback(() => {
        setIsAnimating(false);
        treeNodeBranchBody.current?.style.removeProperty("height");
    }, []);
    return { isAnimating, captureElementHeight, animateTreeNodeContent, cleanupAnimation };
};

const TreeNodeBranchContext = createContext({
    level: 0,
    informParentOfChildNodes: () => null
});
const useInformParentContextOfChildNodes = (numberOfNodes, identifyParentIsTreeNode) => {
    const { level, informParentOfChildNodes } = useContext(TreeNodeBranchContext);
    useEffect(() => {
        if (level > 0 && identifyParentIsTreeNode()) {
            informParentOfChildNodes(numberOfNodes);
        }
    }, [identifyParentIsTreeNode, informParentOfChildNodes, level, numberOfNodes]);
};

const treeNodeBranchUtils = {
    bodyClassName: "widget-tree-node-body",
    getHeaderId: (id) => `${id}TreeNodeBranchHeader`,
    getBodyId: (id) => `${id}TreeNodeBranchBody`
};
function TreeNodeBranch({ animateTreeNodeContent: animateTreeNodeContentProp, changeFocus, children, headerContent, iconPlacement, id, isUserDefinedLeafNode, openNodeOn, renderHeaderIcon, startExpanded }) {
    const { level: currentContextLevel } = useContext(TreeNodeBranchContext);
    const treeNodeBranchRef = useRef(null);
    const treeNodeBranchBody = useRef(null);
    const [isActualLeafNode, setIsActualLeafNode] = useState(isUserDefinedLeafNode || !children);
    const [treeNodeState, setTreeNodeState] = useState(startExpanded ? "EXPANDED" /* TreeNodeState.EXPANDED */ : "COLLAPSED_WITH_JS" /* TreeNodeState.COLLAPSED_WITH_JS */);
    const { isAnimating, captureElementHeight, animateTreeNodeContent, cleanupAnimation } = useAnimatedTreeNodeContentHeight(treeNodeBranchBody);
    const informParentOfChildNodes = numberOfNodes => {
        if (numberOfNodes !== undefined) {
            setTreeNodeState(treeNodeState => treeNodeState === "LOADING" /* TreeNodeState.LOADING */ ? "EXPANDED" /* TreeNodeState.EXPANDED */ : treeNodeState);
            setIsActualLeafNode(currentIsActualLeafNode => {
                if (numberOfNodes === 0 && !currentIsActualLeafNode) {
                    return true;
                }
                else if (numberOfNodes > 0 && currentIsActualLeafNode) {
                    return false;
                }
                return currentIsActualLeafNode;
            });
        }
    };
    const eventTargetIsNotCurrentBranch = useCallback(event => {
        const target = event.target;
        return (!treeNodeBranchRef.current?.isSameNode(target) &&
            !treeNodeBranchRef.current?.firstElementChild?.contains(target) &&
            !treeNodeBranchRef.current?.lastElementChild?.isSameNode(target));
    }, []);
    const toggleTreeNodeContent = useCallback(event => {
        if (eventTargetIsNotCurrentBranch(event)) {
            return;
        }
        if (!isActualLeafNode) {
            captureElementHeight();
            setTreeNodeState(treeNodeState => {
                if (treeNodeState === "LOADING" /* TreeNodeState.LOADING */) {
                    // TODO:
                    return treeNodeState;
                }
                if (treeNodeState === "COLLAPSED_WITH_JS" /* TreeNodeState.COLLAPSED_WITH_JS */) {
                    return "LOADING" /* TreeNodeState.LOADING */;
                }
                if (treeNodeState === "COLLAPSED_WITH_CSS" /* TreeNodeState.COLLAPSED_WITH_CSS */) {
                    return "EXPANDED" /* TreeNodeState.EXPANDED */;
                }
                return "COLLAPSED_WITH_CSS" /* TreeNodeState.COLLAPSED_WITH_CSS */;
            });
        }
    }, [captureElementHeight, eventTargetIsNotCurrentBranch, isActualLeafNode]);
    const onHeaderKeyDown = useTreeNodeBranchKeyboardHandler(toggleTreeNodeContent, changeFocus, treeNodeState, isActualLeafNode, eventTargetIsNotCurrentBranch);
    const treeNodeAccessibilityProps = getTreeNodeAccessibilityProps(treeNodeState === "EXPANDED" /* TreeNodeState.EXPANDED */);
    const isIconClickable = openNodeOn === "iconClick";
    const isHeaderClickable = openNodeOn === "headerClick";
    const onIconClick = isIconClickable ? toggleTreeNodeContent : undefined;
    const onHeaderClick = isHeaderClickable ? toggleTreeNodeContent : undefined;
    const { hasNestedTreeNode } = useTreeNodeLazyLoading(treeNodeBranchBody);
    useLayoutEffect(() => {
        if (animateTreeNodeContentProp && treeNodeState !== "LOADING" /* TreeNodeState.LOADING */) {
            const animationCleanup = animateTreeNodeContent();
            if (animationCleanup) {
                return animationCleanup;
            }
        }
    }, [animateTreeNodeContent, animateTreeNodeContentProp, treeNodeState]);
    useEffect(() => {
        setIsActualLeafNode(isUserDefinedLeafNode || !children);
    }, [children, isUserDefinedLeafNode]);
    useEffect(() => {
        if (treeNodeState === "LOADING" /* TreeNodeState.LOADING */) {
            if (!hasNestedTreeNode()) {
                setTreeNodeState("EXPANDED" /* TreeNodeState.EXPANDED */);
            }
        }
    }, [hasNestedTreeNode, treeNodeState]);
    return (jsxs("li", { className: "widget-tree-node-branch", onKeyDown: onHeaderKeyDown, ref: treeNodeBranchRef, ...treeNodeAccessibilityProps, children: [jsxs("span", { className: classNames("widget-tree-node-branch-header", {
                    "widget-tree-node-branch-header-clickable": !isActualLeafNode && isHeaderClickable,
                    "widget-tree-node-branch-header-reversed": iconPlacement === "left"
                }), id: treeNodeBranchUtils.getHeaderId(id), onClick: onHeaderClick, children: [jsx("span", { className: "widget-tree-node-branch-header-value", children: headerContent }), !isActualLeafNode && iconPlacement !== "no" && (jsx("span", { className: classNames("widget-tree-node-branch-header-icon-container", {
                            "widget-tree-node-branch-header-clickable": !isActualLeafNode && isIconClickable
                        }), onClick: onIconClick, children: renderHeaderIcon(treeNodeState, iconPlacement) }))] }), ((!isActualLeafNode && treeNodeState !== "COLLAPSED_WITH_JS" /* TreeNodeState.COLLAPSED_WITH_JS */) || isAnimating) && (jsx(TreeNodeBranchContext.Provider, { value: {
                    level: currentContextLevel + 1,
                    informParentOfChildNodes
                }, children: jsx("div", { className: classNames(treeNodeBranchUtils.bodyClassName, {
                        "widget-tree-node-branch-hidden": treeNodeState === "COLLAPSED_WITH_CSS" /* TreeNodeState.COLLAPSED_WITH_CSS */ && !isAnimating,
                        "widget-tree-node-branch-loading": treeNodeState === "LOADING" /* TreeNodeState.LOADING */
                    }), id: treeNodeBranchUtils.getBodyId(id), "aria-hidden": treeNodeState !== "EXPANDED" /* TreeNodeState.EXPANDED */, ref: treeNodeBranchBody, onTransitionEnd: cleanupAnimation, children: children }) }))] }));
}
function getTreeNodeAccessibilityProps(isExpanded) {
    return {
        "aria-expanded": isExpanded,
        role: "treeitem",
        tabIndex: 0
    };
}

const ChevronIcon = ({ className }) => (jsx("svg", { className: className, "aria-hidden": true, width: "16", height: "16", viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg", children: jsx("path", { d: "M1.64598 4.64601C1.69242 4.59945 1.7476 4.5625 1.80834 4.5373C1.86909 4.51209 1.93421 4.49911 1.99998 4.49911C2.06575 4.49911 2.13087 4.51209 2.19161 4.5373C2.25236 4.5625 2.30753 4.59945 2.35398 4.64601L7.99998 10.293L13.646 4.64601C13.6925 4.59952 13.7477 4.56264 13.8084 4.53749C13.8691 4.51233 13.9342 4.49938 14 4.49938C14.0657 4.49938 14.1308 4.51233 14.1916 4.53749C14.2523 4.56264 14.3075 4.59952 14.354 4.64601C14.4005 4.6925 14.4373 4.74769 14.4625 4.80842C14.4877 4.86916 14.5006 4.93426 14.5006 5.00001C14.5006 5.06575 14.4877 5.13085 14.4625 5.19159C14.4373 5.25233 14.4005 5.30752 14.354 5.35401L8.35398 11.354C8.30753 11.4006 8.25236 11.4375 8.19161 11.4627C8.13087 11.4879 8.06575 11.5009 7.99998 11.5009C7.93421 11.5009 7.86909 11.4879 7.80834 11.4627C7.7476 11.4375 7.69242 11.4006 7.64598 11.354L1.64598 5.35401C1.59942 5.30756 1.56247 5.25239 1.53727 5.19164C1.51206 5.1309 1.49908 5.06578 1.49908 5.00001C1.49908 4.93424 1.51206 4.86912 1.53727 4.80837C1.56247 4.74763 1.59942 4.69245 1.64598 4.64601V4.64601Z" }) }));
const CustomHeaderIcon = ({ icon }) => {
    let currentIcon = icon;
    if (icon && icon.type !== "image") {
        currentIcon = { ...icon, iconClass: classNames(icon.iconClass, "widget-tree-node-branch-header-icon") };
    }
    return jsx(Icon, { icon: currentIcon });
};

var loadingCircleSvg = "widgets/com/mendix/widget/web/treenode/assets/72df3b1b0b37a958.svg";

function renderTreeNodeHeaderIcon(treeNodeState, iconPlacement, iconOptions) {
    if (treeNodeState === "LOADING" /* TreeNodeState.LOADING */) {
        return jsx("img", { src: loadingCircleSvg, className: "widget-tree-node-loading-spinner", alt: "", "aria-hidden": true });
    }
    const { animateIcon, collapsedIcon, expandedIcon, showCustomIcon } = iconOptions;
    const treeNodeIsExpanded = treeNodeState === "EXPANDED" /* TreeNodeState.EXPANDED */;
    return showCustomIcon ? (jsx(CustomHeaderIcon, { icon: treeNodeIsExpanded ? expandedIcon : collapsedIcon })) : (jsx(ChevronIcon, { className: classNames("widget-tree-node-branch-header-icon", {
            "widget-tree-node-branch-header-icon-animated": animateIcon,
            "widget-tree-node-branch-header-icon-collapsed-left": !treeNodeIsExpanded && iconPlacement === "left",
            "widget-tree-node-branch-header-icon-collapsed-right": !treeNodeIsExpanded && iconPlacement === "right"
        }) }));
}

function TreeNode$1({ class: className, items, style, showCustomIcon, startExpanded, iconPlacement, expandedIcon, collapsedIcon, tabIndex, animateIcon, animateTreeNodeContent, openNodeOn }) {
    const { level } = useContext(TreeNodeBranchContext);
    const [treeNodeElement, updateTreeNodeElement] = useTreeNodeRef();
    const renderHeaderIconCallback = useCallback((treeNodeState, iconPlacement) => renderTreeNodeHeaderIcon(treeNodeState, iconPlacement, {
        animateIcon,
        collapsedIcon,
        expandedIcon,
        showCustomIcon
    }), [collapsedIcon, expandedIcon, showCustomIcon, animateIcon]);
    const isInsideAnotherTreeNode = useCallback(() => {
        return treeNodeElement?.parentElement?.className.includes(treeNodeBranchUtils.bodyClassName) ?? false;
    }, [treeNodeElement]);
    useInformParentContextOfChildNodes(Array.isArray(items) ? items.length : 0, isInsideAnotherTreeNode);
    const changeTreeNodeBranchHeaderFocus = useTreeNodeFocusChangeHandler();
    if (items === null || (Array.isArray(items) && items.length === 0)) {
        return null;
    }
    return (jsx("ul", { className: classNames("widget-tree-node", className), style: style, ref: updateTreeNodeElement, "data-focusindex": tabIndex || 0, role: level === 0 ? "tree" : "group", children: Array.isArray(items) &&
            items.map(item => {
                const { id, headerContent, bodyContent, isUserDefinedLeafNode } = item;
                return (jsx(TreeNodeBranch, { id: id, headerContent: headerContent, isUserDefinedLeafNode: isUserDefinedLeafNode, startExpanded: startExpanded, iconPlacement: iconPlacement, renderHeaderIcon: renderHeaderIconCallback, changeFocus: changeTreeNodeBranchHeaderFocus, animateTreeNodeContent: animateTreeNodeContent, openNodeOn: openNodeOn, children: bodyContent }, id));
            }) }));
}

function mapDataSourceItemToTreeNodeItem(item, props) {
    return {
        id: item.id,
        headerContent: props.headerType === "text" ? props.headerCaption?.get(item).value : props.headerContent?.get(item),
        bodyContent: props.children?.get(item),
        isUserDefinedLeafNode: props.hasChildren?.get(item).value === false
    };
}
function TreeNodeV1(props) {
    const { datasource } = props;
    const [treeNodeItems, setTreeNodeItems] = useState([]);
    useEffect(() => {
        // Only process datasource items when they are available to avoid rendering resets while loading.
        if (datasource.status === "available" /* ValueStatus.Available */) {
            if (datasource.items && datasource.items.length) {
                setTreeNodeItems(datasource.items.map(item => mapDataSourceItemToTreeNodeItem(item, props)));
            }
            else {
                setTreeNodeItems({
                    Message: "No data available"
                });
            }
        }
    }, [datasource.status, datasource.items]);
    const expandedIcon = props.expandedIcon?.status === "available" /* ValueStatus.Available */ ? props.expandedIcon.value : undefined;
    const collapsedIcon = props.collapsedIcon?.status === "available" /* ValueStatus.Available */ ? props.collapsedIcon.value : undefined;
    return (jsx(TreeNode$1, { class: props.class, style: props.style, items: treeNodeItems, startExpanded: props.startExpanded, showCustomIcon: Boolean(props.expandedIcon) || Boolean(props.collapsedIcon), iconPlacement: props.showIcon, expandedIcon: expandedIcon, collapsedIcon: collapsedIcon, tabIndex: props.tabIndex, animateIcon: props.animate && props.animateIcon, animateTreeNodeContent: props.animate, openNodeOn: props.openNodeOn }));
}

function getItemId(item) {
    return String(item.id);
}
function getParentId(item, parentAssociation) {
    const parentObject = parentAssociation?.get(item).value;
    return parentObject?.id ? getItemId(parentObject) : undefined;
}
function getItemTitle(item, config) {
    if (config.headerType === "text") {
        return config.headerCaption?.get(item).value ?? getItemId(item);
    }
    return config.headerContent?.get(item) ?? getItemId(item);
}
function isConfigChanged(previous, next) {
    if (!previous) {
        return true;
    }
    return (previous.headerType !== next.headerType ||
        previous.headerCaption !== next.headerCaption ||
        previous.headerContent !== next.headerContent ||
        previous.parentAssociation !== next.parentAssociation);
}
function onKeyDownHandler(event, hasChildren, isExpanded, onNodeClick, node) {
    // Only handle key events on the tree item itself, not bubbled from children
    if (event.currentTarget !== event.target) {
        return;
    }
    switch (event.key) {
        case "Enter":
        case " ": // Space key
            if (hasChildren) {
                event.preventDefault();
                event.stopPropagation();
                onNodeClick(node);
            }
            break;
        case "ArrowRight":
            if (hasChildren) {
                if (!isExpanded) {
                    event.preventDefault();
                    event.stopPropagation();
                    onNodeClick(node);
                }
            }
            break;
        case "ArrowLeft":
            if (hasChildren && isExpanded) {
                event.preventDefault();
                event.stopPropagation();
                onNodeClick(node);
            }
            break;
    }
}

function useIncrementalTreeData(items, config) {
    const [treeData, setTreeData] = useState([]);
    const rootsRef = useRef([]);
    const nodesByIdRef = useRef(new Map());
    const placementByIdRef = useRef(new Map());
    const previousIdsRef = useRef(new Set());
    const previousConfigRef = useRef(null);
    useEffect(() => {
        const sourceItems = items ?? [];
        const incomingIds = new Set(sourceItems.map(getItemId));
        const removedIdsDetected = incomingIds.size < previousIdsRef.current.size ||
            [...previousIdsRef.current].some(id => !incomingIds.has(id));
        const configChanged = isConfigChanged(previousConfigRef.current, config);
        previousConfigRef.current = config;
        if (configChanged || removedIdsDetected) {
            rootsRef.current = [];
            nodesByIdRef.current.clear();
            placementByIdRef.current.clear();
        }
        const removeFromCurrentPlacement = (nodeId) => {
            const placement = placementByIdRef.current.get(nodeId);
            if (placement === undefined) {
                return;
            }
            if (placement === null) {
                rootsRef.current = rootsRef.current.filter(node => node.id !== nodeId);
                return;
            }
            const parent = nodesByIdRef.current.get(placement);
            if (parent) {
                parent.children = parent.children.filter(child => child.id !== nodeId);
            }
        };
        const placeNode = (node) => {
            const parentId = node.parentId && node.parentId !== node.id ? node.parentId : undefined;
            if (parentId) {
                const parent = nodesByIdRef.current.get(parentId);
                if (parent) {
                    if (placementByIdRef.current.get(node.id) === parentId) {
                        return;
                    }
                    removeFromCurrentPlacement(node.id);
                    parent.children.push(node);
                    placementByIdRef.current.set(node.id, parentId);
                    return;
                }
            }
            if (placementByIdRef.current.get(node.id) === null) {
                return;
            }
            removeFromCurrentPlacement(node.id);
            rootsRef.current.push(node);
            placementByIdRef.current.set(node.id, null);
        };
        for (const item of sourceItems) {
            const nodeId = getItemId(item);
            const nextParentId = getParentId(item, config.parentAssociation);
            const nextTitle = getItemTitle(item, config);
            const existingNode = nodesByIdRef.current.get(nodeId);
            // if already exists, update the item
            if (existingNode) {
                const parentChanged = existingNode.parentId !== nextParentId;
                existingNode.item = item;
                existingNode.parentId = nextParentId;
                existingNode.title = nextTitle;
                if (parentChanged) {
                    placeNode(existingNode);
                }
                if (existingNode.treeNodeState === "LOADING" /* TreeNodeState.LOADING */) {
                    existingNode.treeNodeState = config.startExpanded
                        ? "EXPANDED" /* TreeNodeState.EXPANDED */
                        : "COLLAPSED_WITH_JS" /* TreeNodeState.COLLAPSED_WITH_JS */;
                    nodesByIdRef.current.set(nodeId, existingNode);
                }
                continue;
            }
            const newNode = {
                children: [],
                id: nodeId,
                item,
                parentId: nextParentId,
                treeNodeState: "LOADING" /* TreeNodeState.LOADING */,
                title: nextTitle
            };
            nodesByIdRef.current.set(nodeId, newNode);
            placeNode(newNode);
            // Re-place potential children that were temporarily roots while parent wasn't loaded yet.
            for (const candidate of nodesByIdRef.current.values()) {
                if (candidate.parentId === nodeId && candidate.id !== nodeId) {
                    placeNode(candidate);
                }
            }
        }
        previousIdsRef.current = incomingIds;
        setTreeData([...rootsRef.current]);
    }, [items, config]);
    return treeData;
}

function useInfiniteTreeNodes(props) {
    const { datasource, parentAssociation, startExpanded } = props;
    // loadedParents : track the nodes that are expanded
    const loadedParentsByIdRef = useRef(new Map());
    // loadedChilds : track the pre-loaded nodes of expanded nodes.
    const loadedChildsByIdRef = useRef(new Map());
    const initializedRef = useRef(false);
    const getDatasourceFilter = useCallback((items) => {
        if (items && items.length > 1) {
            // retrieve new datasource for array of items
            return or(...items.map(item => equals(association(parentAssociation.id), literal(item))));
        }
        else {
            return equals(association(parentAssociation.id), literal(items?.[0]));
        }
    }, [parentAssociation]);
    const getExpandedFilterItems = useCallback(() => [undefined, ...loadedParentsByIdRef.current.values(), ...loadedChildsByIdRef.current.values()], []);
    const appendItems = useCallback((newItem, children) => {
        const parentId = getItemId(newItem);
        if (loadedParentsByIdRef.current.has(parentId)) {
            if (children && children.length > 0) {
                children.forEach(child => {
                    const childId = getItemId(child);
                    // get all expanded node's children Id, in order to pre-load them
                    // this is needed to be able to know if a node has further level children before expanding it.
                    loadedChildsByIdRef.current.set(childId, child);
                });
                // if the new item is already in loadedChilds,
                // it means that it was pre-loaded as a child of an expanded node,
                // so we need to move it to loadedParents
                if (loadedChildsByIdRef.current.has(parentId)) {
                    loadedParentsByIdRef.current.set(parentId, loadedChildsByIdRef.current.get(parentId));
                    loadedChildsByIdRef.current.delete(parentId);
                }
                else {
                    loadedParentsByIdRef.current.set(parentId, newItem);
                }
            }
        }
        else {
            loadedParentsByIdRef.current.set(parentId, newItem);
        }
        datasource.setFilter(getDatasourceFilter(getExpandedFilterItems()));
    }, [datasource, getDatasourceFilter, getExpandedFilterItems]);
    useEffect(() => {
        if (initializedRef.current) {
            // after the first load of the datasource,
            // we want to pre-load the child nodes of roots
            if (loadedParentsByIdRef.current.size === 0) {
                datasource.items?.forEach(item => {
                    const parentId = getItemId(item);
                    loadedParentsByIdRef.current.set(parentId, item);
                });
                datasource.setFilter(getDatasourceFilter(getExpandedFilterItems()));
            }
            return;
        }
        initializedRef.current = true;
        loadedParentsByIdRef.current.clear();
        // when datasource is loaded for the first time, we want to load only the root nodes (nodes without parent)
        // if startExpanded is false, otherwise we want to load all nodes
        if (!startExpanded) {
            datasource.setFilter(getDatasourceFilter([undefined]));
        }
    }, [datasource, getDatasourceFilter, getExpandedFilterItems, startExpanded]);
    return {
        items: datasource.items,
        appendItems
    };
}

function renderRecursiveNode(node, renderHeaderIcon, iconPlacement, openNodeOn, onNodeClick, children) {
    const hasChildren = node.children.length > 0;
    const isExpanded = node.treeNodeState === "EXPANDED" /* TreeNodeState.EXPANDED */;
    const isIconClickable = openNodeOn === "iconClick";
    const isHeaderClickable = openNodeOn === "headerClick";
    const onIconClick = isIconClickable ? () => onNodeClick(node) : undefined;
    const onHeaderClick = isHeaderClickable ? () => onNodeClick(node) : undefined;
    const onKeyDown = (event) => {
        onKeyDownHandler(event, hasChildren, isExpanded, onNodeClick, node);
    };
    return (jsxs("li", { className: "widget-tree-node-branch", role: "treeitem", tabIndex: 0, "aria-expanded": hasChildren ? isExpanded : undefined, onKeyDown: onKeyDown, children: [jsxs("span", { className: classNames("widget-tree-node-branch-header", {
                    "widget-tree-node-branch-header-reversed": iconPlacement === "left",
                    "widget-tree-node-branch-header-clickable": hasChildren && isHeaderClickable
                }), id: `${node.id}TreeNodeBranchHeader`, onClick: onHeaderClick, children: [jsx("span", { className: "widget-tree-node-branch-header-value", children: node.title }), (hasChildren || node.treeNodeState === "LOADING" /* TreeNodeState.LOADING */) && iconPlacement !== "no" && (jsx("span", { className: classNames("widget-tree-node-branch-header-icon-container", {
                            "widget-tree-node-branch-header-clickable": hasChildren && isIconClickable
                        }), onClick: onIconClick, children: renderHeaderIcon(node.treeNodeState, iconPlacement) }))] }), hasChildren ? (jsxs("div", { className: classNames("widget-tree-node-body", "widget-tree-node-v2-body", {
                    "widget-tree-node-v2-body-collapsed": !isExpanded
                }), id: `${node.id}TreeNodeBranchBody`, children: [jsx("div", { children: children?.get(node.item) }), jsx("ul", { role: "group", children: node.children.map(child => {
                            return (jsx(Fragment, { children: renderRecursiveNode(child, renderHeaderIcon, iconPlacement, openNodeOn, onNodeClick, children) }, child.id));
                        }) })] })) : null] }, node.id));
}
function TreeNodeV2(props) {
    const { items, appendItems } = useInfiniteTreeNodes(props);
    const [, forceRender] = useState(0);
    const expandedIcon = props.expandedIcon?.status === "available" /* ValueStatus.Available */ ? props.expandedIcon.value : undefined;
    const collapsedIcon = props.collapsedIcon?.status === "available" /* ValueStatus.Available */ ? props.collapsedIcon.value : undefined;
    const showCustomIcon = Boolean(props.expandedIcon) || Boolean(props.collapsedIcon);
    const iconPlacement = props.showIcon;
    const animateIcon = props.animate && props.animateIcon;
    const renderHeaderIcon = useMemo(() => (treeNodeState, placement) => renderTreeNodeHeaderIcon(treeNodeState, placement, {
        animateIcon,
        collapsedIcon,
        expandedIcon,
        showCustomIcon
    }), [animateIcon, collapsedIcon, expandedIcon, showCustomIcon]);
    const treeConfig = useMemo(() => ({
        headerCaption: props.headerCaption,
        headerContent: props.headerContent,
        headerType: props.headerType,
        parentAssociation: props.parentAssociation,
        startExpanded: props.startExpanded
    }), [props.headerCaption, props.headerContent, props.headerType, props.parentAssociation, props.startExpanded]);
    const treeData = useIncrementalTreeData(items, treeConfig);
    const onNodeClick = useCallback((node) => {
        if (node.treeNodeState === "EXPANDED" /* TreeNodeState.EXPANDED */) {
            node.treeNodeState = "COLLAPSED_WITH_CSS" /* TreeNodeState.COLLAPSED_WITH_CSS */;
            forceRender(version => version + 1);
            return;
        }
        node.treeNodeState = "EXPANDED" /* TreeNodeState.EXPANDED */;
        appendItems(node.item, node.children.map(child => child.item));
        forceRender(version => version + 1);
    }, [appendItems]);
    if (treeData.length === 0) {
        return (jsx("div", { className: classNames("widget-tree-node", "widget-tree-node-v2", props.class), style: props.style, children: jsx("div", { className: "widget-tree-node-no-data", children: props.noDataMessage?.value ?? "No data available" }) }));
    }
    return (jsx("ul", { className: classNames("widget-tree-node", "widget-tree-node-v2", props.class), style: props.style, "data-focusindex": props.tabIndex || 0, role: "tree", children: treeData.map(node => renderRecursiveNode(node, renderHeaderIcon, iconPlacement, props.openNodeOn, onNodeClick, props.children)) }));
}

function TreeNode(props) {
    if (props.parentAssociation) {
        return jsx(TreeNodeV2, { ...props });
    }
    else {
        return jsx(TreeNodeV1, { ...props });
    }
}

export { TreeNode };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZU5vZGUubWpzIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vY2xhc3NuYW1lc0AyLjUuMS9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3YxL2hvb2tzL3VzZUtleWJvYXJkSGFuZGxlci50c3giLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy92MS9ob29rcy9UcmVlTm9kZUFjY2Vzc2liaWxpdHkudHN4IiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvdjEvaG9va3MvdXNlVHJlZU5vZGVSZWYudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy92MS9ob29rcy9sYXp5TG9hZGluZy50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3YxL2hvb2tzL3VzZUFuaW1hdGVkSGVpZ2h0LnRzeCIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3YxL1RyZWVOb2RlQnJhbmNoQ29udGV4dC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3YxL1RyZWVOb2RlQnJhbmNoLnRzeCIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9JY29ucy50c3giLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXNzZXRzL2xvYWRpbmctY2lyY2xlLnN2ZyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL2NvbW1vbi9IZWFkZXJJY29uLnRzeCIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3YxL1RyZWVOb2RlLnRzeCIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3YxL1Jvb3QudHN4IiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvdjIvaG9va3MvaGVscGVycy50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3YyL2hvb2tzL3VzZUluY3JlbWVudGFsVHJlZURhdGEudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy92Mi9ob29rcy91c2VJbmZpbml0ZVRyZWVOb2RlLnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvdjIvVHJlZU5vZGUudHN4IiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL1RyZWVOb2RlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcblx0Q29weXJpZ2h0IChjKSAyMDE4IEplZCBXYXRzb24uXG5cdExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG5cdGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSAnJztcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKGFyZykge1xuXHRcdFx0XHRjbGFzc2VzID0gYXBwZW5kQ2xhc3MoY2xhc3NlcywgcGFyc2VWYWx1ZShhcmcpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcztcblx0fVxuXG5cdGZ1bmN0aW9uIHBhcnNlVmFsdWUgKGFyZykge1xuXHRcdGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuXHRcdFx0cmV0dXJuIGFyZztcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIGFyZyAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiAnJztcblx0XHR9XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpO1xuXHRcdH1cblxuXHRcdGlmIChhcmcudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcgJiYgIWFyZy50b1N0cmluZy50b1N0cmluZygpLmluY2x1ZGVzKCdbbmF0aXZlIGNvZGVdJykpIHtcblx0XHRcdHJldHVybiBhcmcudG9TdHJpbmcoKTtcblx0XHR9XG5cblx0XHR2YXIgY2xhc3NlcyA9ICcnO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRjbGFzc2VzID0gYXBwZW5kQ2xhc3MoY2xhc3Nlcywga2V5KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcztcblx0fVxuXG5cdGZ1bmN0aW9uIGFwcGVuZENsYXNzICh2YWx1ZSwgbmV3Q2xhc3MpIHtcblx0XHRpZiAoIW5ld0NsYXNzKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0fVxuXHRcblx0XHRpZiAodmFsdWUpIHtcblx0XHRcdHJldHVybiB2YWx1ZSArICcgJyArIG5ld0NsYXNzO1xuXHRcdH1cblx0XG5cdFx0cmV0dXJuIHZhbHVlICsgbmV3Q2xhc3M7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRjbGFzc05hbWVzLmRlZmF1bHQgPSBjbGFzc05hbWVzO1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCJpbXBvcnQgeyBLZXlib2FyZEV2ZW50SGFuZGxlciwgU3ludGhldGljRXZlbnQsIHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5cbi8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi91aWV2ZW50cy1rZXkvI2tleS1hdHRyLXZhbHVlc1xudHlwZSBLZXlBdHRyaWJ1dGVWYWx1ZSA9IFwiRW50ZXJcIiB8IFwiIFwiIHwgXCJIb21lXCIgfCBcIkVuZFwiIHwgXCJBcnJvd1VwXCIgfCBcIkFycm93RG93blwiIHwgXCJBcnJvd1JpZ2h0XCIgfCBcIkFycm93TGVmdFwiO1xuXG50eXBlIEtleUhhbmRsZXJOYW1lID0gXCJBcnJvd1VwXCIgfCBcIkFycm93RG93blwiIHwgXCJBcnJvd0xlZnRcIiB8IFwiQXJyb3dSaWdodFwiIHwgXCJFbnRlclwiIHwgXCJTcGFjZVwiIHwgXCJIb21lXCIgfCBcIkVuZFwiO1xuXG5jb25zdCBrZXlWYWx1ZVRvSGFuZGxlck5hbWVNYXA6IFJlY29yZDxLZXlBdHRyaWJ1dGVWYWx1ZSwgS2V5SGFuZGxlck5hbWU+ID0ge1xuICAgIEVudGVyOiBcIkVudGVyXCIsXG4gICAgXCIgXCI6IFwiU3BhY2VcIixcbiAgICBIb21lOiBcIkhvbWVcIixcbiAgICBFbmQ6IFwiRW5kXCIsXG4gICAgQXJyb3dVcDogXCJBcnJvd1VwXCIsXG4gICAgQXJyb3dEb3duOiBcIkFycm93RG93blwiLFxuICAgIEFycm93TGVmdDogXCJBcnJvd0xlZnRcIixcbiAgICBBcnJvd1JpZ2h0OiBcIkFycm93UmlnaHRcIlxufTtcblxuZnVuY3Rpb24gaXNLZXlWYWx1ZVRvSGFuZGxlKGtleTogc3RyaW5nKToga2V5IGlzIEtleUF0dHJpYnV0ZVZhbHVlIHtcbiAgICByZXR1cm4gT2JqZWN0Lmhhc093bihrZXlWYWx1ZVRvSGFuZGxlck5hbWVNYXAsIGtleSk7XG59XG5cbmZ1bmN0aW9uIGl0Q2FtZUZyb21DdXJyZW50VGFyZ2V0KGV2ZW50OiBTeW50aGV0aWNFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBldmVudC5jdXJyZW50VGFyZ2V0ID09PSBldmVudC50YXJnZXQ7XG59XG5cbmV4cG9ydCB0eXBlIEtleUhhbmRsZXJzID0gUGFydGlhbDxSZWNvcmQ8S2V5SGFuZGxlck5hbWUsIEtleWJvYXJkRXZlbnRIYW5kbGVyPEhUTUxFbGVtZW50Pj4+O1xuXG5leHBvcnQgdHlwZSBLZXlib2FyZEhhbmRsZXJIb29rID0gKGtleUhhbmRsZXJzOiBLZXlIYW5kbGVycykgPT4gS2V5Ym9hcmRFdmVudEhhbmRsZXI8SFRNTEVsZW1lbnQ+O1xuXG5leHBvcnQgY29uc3QgdXNlS2V5Ym9hcmRIYW5kbGVyOiBLZXlib2FyZEhhbmRsZXJIb29rID0ga2V5SGFuZGxlcnMgPT4ge1xuICAgIHJldHVybiB1c2VDYWxsYmFjayhcbiAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKCFpdENhbWVGcm9tQ3VycmVudFRhcmdldChldmVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNLZXlWYWx1ZVRvSGFuZGxlKGV2ZW50LmtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyRm4gPSBrZXlIYW5kbGVyc1trZXlWYWx1ZVRvSGFuZGxlck5hbWVNYXBbZXZlbnQua2V5XV07XG5cbiAgICAgICAgICAgICAgICBpZiAoIWhhbmRsZXJGbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaGFuZGxlckZuKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW2tleUhhbmRsZXJzXVxuICAgICk7XG59O1xuIiwiaW1wb3J0IHsgRXZlbnRIYW5kbGVyLCBTeW50aGV0aWNFdmVudCwgdXNlQ2FsbGJhY2ssIHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEtleWJvYXJkSGFuZGxlckhvb2ssIHVzZUtleWJvYXJkSGFuZGxlciB9IGZyb20gXCIuL3VzZUtleWJvYXJkSGFuZGxlclwiO1xuaW1wb3J0IHsgVHJlZU5vZGVTdGF0ZSB9IGZyb20gXCIuLi8uLi9jb21tb24vVHJlZU5vZGVTdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgZW51bSBGb2N1c1RhcmdldENoYW5nZSB7XG4gICAgRklSU1QgPSBcIkZJUlNUXCIsXG4gICAgTEFTVCA9IFwiTEFTVFwiLFxuICAgIFBSRVZJT1VTID0gXCJQUkVWSU9VU1wiLFxuICAgIE5FWFQgPSBcIk5FWFRcIlxufVxuXG5leHBvcnQgdHlwZSBUcmVlTm9kZUZvY3VzQ2hhbmdlSGFuZGxlciA9IChcbiAgICB0YXJnZXRFbGVtZW50OiBFdmVudFRhcmdldCB8IG51bGwsXG4gICAgZm9jdXNUYXJnZXRDaGFuZ2U6IEZvY3VzVGFyZ2V0Q2hhbmdlLFxuICAgIHRyYXZlcnNlT3B0aW9uPzogXCJIT1JJWk9OVEFMXCIgfCBcIlZFUlRJQ0FMXCJcbikgPT4gdm9pZDtcblxuZXhwb3J0IGNvbnN0IHVzZVRyZWVOb2RlRm9jdXNDaGFuZ2VIYW5kbGVyID0gKCk6IFRyZWVOb2RlRm9jdXNDaGFuZ2VIYW5kbGVyID0+IHtcbiAgICByZXR1cm4gdXNlQ2FsbGJhY2soKHRhcmdldEVsZW1lbnQsIGZvY3VzVGFyZ2V0Q2hhbmdlLCB0cmF2ZXJzZU9wdGlvbikgPT4ge1xuICAgICAgICBpZiAodGFyZ2V0RWxlbWVudCAmJiB0YXJnZXRFbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgICAgY29uc3QgZ2V0VHJlZU5vZGVIZWFkZXJzSW5FbGVtZW50ID0gKGVsOiBFbGVtZW50IHwgRG9jdW1lbnQgfCBudWxsKTogSFRNTEVsZW1lbnRbXSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFsbEJyYW5jaGVzID0gQXJyYXkuZnJvbShlbC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcImxpLndpZGdldC10cmVlLW5vZGUtYnJhbmNoXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGlkZGVuQm9kaWVzID0gQXJyYXkuZnJvbShlbC5xdWVyeVNlbGVjdG9yQWxsKFwiLndpZGdldC10cmVlLW5vZGUtYm9keVthcmlhLWhpZGRlbj10cnVlXVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhbGxCcmFuY2hlcy5maWx0ZXIobm9kZSA9PiAhaGlkZGVuQm9kaWVzLnNvbWUoaGlkZGVuQm9keSA9PiBoaWRkZW5Cb2R5LmNvbnRhaW5zKG5vZGUpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUcmVlTm9kZVNjb3BlID0gQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoXCIud2lkZ2V0LXRyZWUtbm9kZVtyb2xlPXRyZWVdXCIpXG4gICAgICAgICAgICApLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50LmNvbnRhaW5zKHRhcmdldEVsZW1lbnQpKTtcblxuICAgICAgICAgICAgaWYgKCFjdXJyZW50VHJlZU5vZGVTY29wZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0YWJsZUJyYW5jaGVzID0gZ2V0VHJlZU5vZGVIZWFkZXJzSW5FbGVtZW50KGN1cnJlbnRUcmVlTm9kZVNjb3BlKTtcblxuICAgICAgICAgICAgY29uc3QgbnVtYmVyT2ZUYXJnZXRhYmxlQnJhbmNoZXMgPSB0YXJnZXRhYmxlQnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKG51bWJlck9mVGFyZ2V0YWJsZUJyYW5jaGVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50QnJhbmNoSW5kZXggPSB0YXJnZXRhYmxlQnJhbmNoZXMuZmluZEluZGV4KGJyYW5jaCA9PiBicmFuY2guaXNTYW1lTm9kZSh0YXJnZXRFbGVtZW50KSk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZm9jdXNUYXJnZXRDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICBjYXNlIEZvY3VzVGFyZ2V0Q2hhbmdlLkZJUlNUOlxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRhYmxlQnJhbmNoZXNbMF0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBGb2N1c1RhcmdldENoYW5nZS5MQVNUOlxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRhYmxlQnJhbmNoZXNbbnVtYmVyT2ZUYXJnZXRhYmxlQnJhbmNoZXMgLSAxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEZvY3VzVGFyZ2V0Q2hhbmdlLlBSRVZJT1VTOiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmF2ZXJzZU9wdGlvbiA9PT0gXCJWRVJUSUNBTFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRUcmVlTm9kZUhlYWRlcnMgPSBnZXRUcmVlTm9kZUhlYWRlcnNJbkVsZW1lbnQoZG9jdW1lbnQpLmZpbHRlcihub2RlID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5sYXN0RWxlbWVudENoaWxkPy5jb250YWlucyh0YXJnZXRFbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRUcmVlTm9kZUhlYWRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudFRyZWVOb2RlSGVhZGVyc1twYXJlbnRUcmVlTm9kZUhlYWRlcnMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdCcmFuY2hJbmRleCA9IGN1cnJlbnRCcmFuY2hJbmRleCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0JyYW5jaEluZGV4UHJvY2Vzc2VkID0gTWF0aC5tYXgobmV3QnJhbmNoSW5kZXgsIDApO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3QnJhbmNoSW5kZXhQcm9jZXNzZWQgIT09IGN1cnJlbnRCcmFuY2hJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0YWJsZUJyYW5jaGVzW25ld0JyYW5jaEluZGV4UHJvY2Vzc2VkXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIEZvY3VzVGFyZ2V0Q2hhbmdlLk5FWFQ6IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYXZlcnNlT3B0aW9uID09PSBcIlZFUlRJQ0FMXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkVHJlZU5vZGVIZWFkZXJzID0gZ2V0VHJlZU5vZGVIZWFkZXJzSW5FbGVtZW50KHRhcmdldEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRUcmVlTm9kZUhlYWRlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkVHJlZU5vZGVIZWFkZXJzWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3QnJhbmNoSW5kZXggPSBjdXJyZW50QnJhbmNoSW5kZXggKyAxO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdCcmFuY2hJbmRleFByb2Nlc3NlZCA9IE1hdGgubWluKG5ld0JyYW5jaEluZGV4LCBudW1iZXJPZlRhcmdldGFibGVCcmFuY2hlcyAtIDEpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3QnJhbmNoSW5kZXhQcm9jZXNzZWQgIT09IGN1cnJlbnRCcmFuY2hJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0YWJsZUJyYW5jaGVzW25ld0JyYW5jaEluZGV4UHJvY2Vzc2VkXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFtdKTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VUcmVlTm9kZUJyYW5jaEtleWJvYXJkSGFuZGxlciA9IChcbiAgICB0b2dnbGVUcmVlTm9kZUNvbnRlbnQ6IEV2ZW50SGFuZGxlcjxTeW50aGV0aWNFdmVudDxIVE1MRWxlbWVudD4+LFxuICAgIGNoYW5nZUZvY3VzOiBUcmVlTm9kZUZvY3VzQ2hhbmdlSGFuZGxlcixcbiAgICB0cmVlTm9kZVN0YXRlOiBUcmVlTm9kZVN0YXRlLFxuICAgIGlzQWN0dWFsTGVhZk5vZGU6IGJvb2xlYW4sXG4gICAgZXZlbnRUYXJnZXRJc05vdEN1cnJlbnRCcmFuY2g6IChldmVudDogU3ludGhldGljRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiBib29sZWFuXG4pOiBSZXR1cm5UeXBlPEtleWJvYXJkSGFuZGxlckhvb2s+ID0+IHtcbiAgICBjb25zdCBrZXlIYW5kbGVycyA9IHVzZU1lbW88UGFyYW1ldGVyczxLZXlib2FyZEhhbmRsZXJIb29rPlswXT4oXG4gICAgICAgICgpID0+ICh7XG4gICAgICAgICAgICBFbnRlcjogdG9nZ2xlVHJlZU5vZGVDb250ZW50LFxuICAgICAgICAgICAgU3BhY2U6IHRvZ2dsZVRyZWVOb2RlQ29udGVudCxcbiAgICAgICAgICAgIEhvbWU6IGV2ZW50ID0+IGNoYW5nZUZvY3VzKGV2ZW50LmN1cnJlbnRUYXJnZXQsIEZvY3VzVGFyZ2V0Q2hhbmdlLkZJUlNUKSxcbiAgICAgICAgICAgIEVuZDogZXZlbnQgPT4gY2hhbmdlRm9jdXMoZXZlbnQuY3VycmVudFRhcmdldCwgRm9jdXNUYXJnZXRDaGFuZ2UuTEFTVCksXG4gICAgICAgICAgICBBcnJvd1VwOiBldmVudCA9PiBjaGFuZ2VGb2N1cyhldmVudC5jdXJyZW50VGFyZ2V0LCBGb2N1c1RhcmdldENoYW5nZS5QUkVWSU9VUywgXCJIT1JJWk9OVEFMXCIpLFxuICAgICAgICAgICAgQXJyb3dEb3duOiBldmVudCA9PiBjaGFuZ2VGb2N1cyhldmVudC5jdXJyZW50VGFyZ2V0LCBGb2N1c1RhcmdldENoYW5nZS5ORVhULCBcIkhPUklaT05UQUxcIiksXG4gICAgICAgICAgICBBcnJvd1JpZ2h0OiBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB0cmVlTm9kZVN0YXRlID09PSBUcmVlTm9kZVN0YXRlLkNPTExBUFNFRF9XSVRIX0NTUyB8fFxuICAgICAgICAgICAgICAgICAgICB0cmVlTm9kZVN0YXRlID09PSBUcmVlTm9kZVN0YXRlLkNPTExBUFNFRF9XSVRIX0pTXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVRyZWVOb2RlQ29udGVudChldmVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0cmVlTm9kZVN0YXRlID09PSBUcmVlTm9kZVN0YXRlLkVYUEFOREVEIHx8IGlzQWN0dWFsTGVhZk5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlRm9jdXMoZXZlbnQuY3VycmVudFRhcmdldCwgRm9jdXNUYXJnZXRDaGFuZ2UuTkVYVCwgXCJWRVJUSUNBTFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgQXJyb3dMZWZ0OiBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB0cmVlTm9kZVN0YXRlID09PSBUcmVlTm9kZVN0YXRlLkNPTExBUFNFRF9XSVRIX0NTUyB8fFxuICAgICAgICAgICAgICAgICAgICB0cmVlTm9kZVN0YXRlID09PSBUcmVlTm9kZVN0YXRlLkNPTExBUFNFRF9XSVRIX0pTIHx8XG4gICAgICAgICAgICAgICAgICAgIGlzQWN0dWFsTGVhZk5vZGVcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlRm9jdXMoZXZlbnQuY3VycmVudFRhcmdldCwgRm9jdXNUYXJnZXRDaGFuZ2UuUFJFVklPVVMsIFwiVkVSVElDQUxcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0cmVlTm9kZVN0YXRlID09PSBUcmVlTm9kZVN0YXRlLkVYUEFOREVEKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZVRyZWVOb2RlQ29udGVudChldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgW3RvZ2dsZVRyZWVOb2RlQ29udGVudCwgY2hhbmdlRm9jdXMsIHRyZWVOb2RlU3RhdGUsIGlzQWN0dWFsTGVhZk5vZGVdXG4gICAgKTtcblxuICAgIGNvbnN0IGtleWJvYXJkSGFuZGxlciA9IHVzZUtleWJvYXJkSGFuZGxlcihrZXlIYW5kbGVycyk7XG5cbiAgICByZXR1cm4gdXNlQ2FsbGJhY2soXG4gICAgICAgIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudFRhcmdldElzTm90Q3VycmVudEJyYW5jaChldmVudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga2V5Ym9hcmRIYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgfSxcbiAgICAgICAgW2V2ZW50VGFyZ2V0SXNOb3RDdXJyZW50QnJhbmNoLCBrZXlib2FyZEhhbmRsZXJdXG4gICAgKTtcbn07XG4iLCJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBUcmVlTm9kZUVsZW1lbnQgPSBIVE1MRGl2RWxlbWVudCB8IEhUTUxVTGlzdEVsZW1lbnQgfCBudWxsO1xudHlwZSBVcGRhdGVSZWYgPSAobm9kZTogVHJlZU5vZGVFbGVtZW50KSA9PiB2b2lkO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlVHJlZU5vZGVSZWYoKTogW1RyZWVOb2RlRWxlbWVudCwgVXBkYXRlUmVmXSB7XG4gICAgLy8gQ29tYmluYXRpb24gb2YgdXNlU3RhdGUgKyB1c2VDYWxsYmFjayBpcyBuZWNlc3NhcnkgaGVyZSBvdmVyIHVzZVJlZiBiZWNhdXNlIGl0IG5lZWRzIHRvIHRyaWdnZXIgYW4gdXBkYXRlIGluIHVzZUluZm9ybVBhcmVudENvbnRleHRPZkNoaWxkTm9kZXNcbiAgICBjb25zdCBbdHJlZU5vZGVFbGVtZW50LCBzZXRUcmVlTm9kZUVsZW1lbnRdID0gdXNlU3RhdGU8VHJlZU5vZGVFbGVtZW50PihudWxsKTtcbiAgICBjb25zdCB1cGRhdGVUcmVlTm9kZUVsZW1lbnQgPSB1c2VDYWxsYmFjaygobm9kZTogVHJlZU5vZGVFbGVtZW50KSA9PiB7XG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBzZXRUcmVlTm9kZUVsZW1lbnQobm9kZSk7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4gW3RyZWVOb2RlRWxlbWVudCwgdXBkYXRlVHJlZU5vZGVFbGVtZW50XTtcbn1cbiIsImltcG9ydCB7IFJlZk9iamVjdCwgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRIYXNOZXN0ZWRUcmVlTm9kZShlbGVtZW50OiBIVE1MRGl2RWxlbWVudCB8IG51bGwpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZWxlbWVudD8ubGFzdEVsZW1lbnRDaGlsZD8uY2xhc3NOYW1lLmluY2x1ZGVzKFwid2lkZ2V0LXRyZWUtbm9kZVwiKSA/PyB0cnVlO1xufVxuXG5leHBvcnQgY29uc3QgdXNlVHJlZU5vZGVMYXp5TG9hZGluZyA9IChcbiAgICB0cmVlTm9kZUJyYW5jaEJvZHk6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+XG4pOiB7XG4gICAgaGFzTmVzdGVkVHJlZU5vZGU6ICgpID0+IGJvb2xlYW47XG59ID0+IHtcbiAgICBjb25zdCBoYXNOZXN0ZWRUcmVlTm9kZSA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoKSA9PiB0cmVlTm9kZUJyYW5jaEJvZHkuY3VycmVudD8ubGFzdEVsZW1lbnRDaGlsZD8uY2xhc3NOYW1lLmluY2x1ZGVzKFwid2lkZ2V0LXRyZWUtbm9kZVwiKSA/PyB0cnVlLFxuICAgICAgICBbXVxuICAgICk7XG5cbiAgICByZXR1cm4geyBoYXNOZXN0ZWRUcmVlTm9kZSB9O1xufTtcbiIsImltcG9ydCB7IFJlZk9iamVjdCwgdXNlQ2FsbGJhY2ssIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGNvbnN0IHVzZUFuaW1hdGVkVHJlZU5vZGVDb250ZW50SGVpZ2h0ID0gKFxuICAgIHRyZWVOb2RlQnJhbmNoQm9keTogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD5cbik6IHtcbiAgICBpc0FuaW1hdGluZzogYm9vbGVhbjtcbiAgICBjYXB0dXJlRWxlbWVudEhlaWdodDogKCkgPT4gdm9pZDtcbiAgICBhbmltYXRlVHJlZU5vZGVDb250ZW50OiAoKSA9PiAoKCkgPT4gdm9pZCkgfCB1bmRlZmluZWQ7XG4gICAgY2xlYW51cEFuaW1hdGlvbjogKCkgPT4gdm9pZDtcbn0gPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRFbGVtZW50SGVpZ2h0ID0gdXNlUmVmPG51bWJlcj4odW5kZWZpbmVkKTtcbiAgICBjb25zdCBbaXNBbmltYXRpbmcsIHNldElzQW5pbWF0aW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIGNvbnN0IGNhcHR1cmVFbGVtZW50SGVpZ2h0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBjdXJyZW50RWxlbWVudEhlaWdodC5jdXJyZW50ID0gdHJlZU5vZGVCcmFuY2hCb2R5LmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCA/PyAwO1xuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IGFuaW1hdGVUcmVlTm9kZUNvbnRlbnQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRyZWVOb2RlQnJhbmNoQm9keS5jdXJyZW50ICYmXG4gICAgICAgICAgICBjdXJyZW50RWxlbWVudEhlaWdodC5jdXJyZW50ICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICFOdW1iZXIuaXNOYU4oY3VycmVudEVsZW1lbnRIZWlnaHQuY3VycmVudClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50SGVpZ2h0ID0gdHJlZU5vZGVCcmFuY2hCb2R5LmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgICAgICAgICAgaWYgKG5ld0VsZW1lbnRIZWlnaHQgLSBjdXJyZW50RWxlbWVudEhlaWdodC5jdXJyZW50ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgc2V0SXNBbmltYXRpbmcodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdHJlZU5vZGVCcmFuY2hCb2R5LmN1cnJlbnQuc3R5bGUuaGVpZ2h0ID0gYCR7Y3VycmVudEVsZW1lbnRIZWlnaHQuY3VycmVudH1weGA7XG4gICAgICAgICAgICAgICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0cmVlTm9kZUJyYW5jaEJvZHkuY3VycmVudCEuc3R5bGUuaGVpZ2h0ID0gYCR7bmV3RWxlbWVudEhlaWdodH1weGA7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRFbGVtZW50SGVpZ2h0LmN1cnJlbnQgPSBuZXdFbGVtZW50SGVpZ2h0O1xuICAgICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoKSA9PiBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBjbGVhbnVwQW5pbWF0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgICBzZXRJc0FuaW1hdGluZyhmYWxzZSk7XG4gICAgICAgIHRyZWVOb2RlQnJhbmNoQm9keS5jdXJyZW50Py5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImhlaWdodFwiKTtcbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4geyBpc0FuaW1hdGluZywgY2FwdHVyZUVsZW1lbnRIZWlnaHQsIGFuaW1hdGVUcmVlTm9kZUNvbnRlbnQsIGNsZWFudXBBbmltYXRpb24gfTtcbn07XG4iLCJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGludGVyZmFjZSBUcmVlTm9kZUJyYW5jaENvbnRleHRQcm9wcyB7XG4gICAgbGV2ZWw6IG51bWJlcjtcbiAgICBpbmZvcm1QYXJlbnRPZkNoaWxkTm9kZXM6IChudW1iZXJPZk5vZGVzOiBudW1iZXIgfCB1bmRlZmluZWQpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBUcmVlTm9kZUJyYW5jaENvbnRleHQgPSBjcmVhdGVDb250ZXh0PFRyZWVOb2RlQnJhbmNoQ29udGV4dFByb3BzPih7XG4gICAgbGV2ZWw6IDAsXG4gICAgaW5mb3JtUGFyZW50T2ZDaGlsZE5vZGVzOiAoKSA9PiBudWxsXG59KTtcblxuZXhwb3J0IGNvbnN0IHVzZUluZm9ybVBhcmVudENvbnRleHRPZkNoaWxkTm9kZXMgPSAoXG4gICAgbnVtYmVyT2ZOb2RlczogbnVtYmVyLFxuICAgIGlkZW50aWZ5UGFyZW50SXNUcmVlTm9kZTogKCkgPT4gYm9vbGVhblxuKTogdm9pZCA9PiB7XG4gICAgY29uc3QgeyBsZXZlbCwgaW5mb3JtUGFyZW50T2ZDaGlsZE5vZGVzIH0gPSB1c2VDb250ZXh0KFRyZWVOb2RlQnJhbmNoQ29udGV4dCk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAobGV2ZWwgPiAwICYmIGlkZW50aWZ5UGFyZW50SXNUcmVlTm9kZSgpKSB7XG4gICAgICAgICAgICBpbmZvcm1QYXJlbnRPZkNoaWxkTm9kZXMobnVtYmVyT2ZOb2Rlcyk7XG4gICAgICAgIH1cbiAgICB9LCBbaWRlbnRpZnlQYXJlbnRJc1RyZWVOb2RlLCBpbmZvcm1QYXJlbnRPZkNoaWxkTm9kZXMsIGxldmVsLCBudW1iZXJPZk5vZGVzXSk7XG59O1xuIiwiaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSBcImNsYXNzbmFtZXNcIjtcbmltcG9ydCB7XG4gICAgSFRNTEF0dHJpYnV0ZXMsXG4gICAgUmVhY3RFbGVtZW50LFxuICAgIFJlYWN0RXZlbnRIYW5kbGVyLFxuICAgIFJlYWN0Tm9kZSxcbiAgICBTeW50aGV0aWNFdmVudCxcbiAgICB1c2VDYWxsYmFjayxcbiAgICB1c2VDb250ZXh0LFxuICAgIHVzZUVmZmVjdCxcbiAgICB1c2VMYXlvdXRFZmZlY3QsXG4gICAgdXNlUmVmLFxuICAgIHVzZVN0YXRlXG59IGZyb20gXCJyZWFjdFwiO1xuXG5pbXBvcnQgeyBPcGVuTm9kZU9uRW51bSwgU2hvd0ljb25FbnVtIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGluZ3MvVHJlZU5vZGVQcm9wc1wiO1xuaW1wb3J0IHsgVHJlZU5vZGVIZWFkZXJJY29uIH0gZnJvbSBcIi4uL2NvbW1vbi9IZWFkZXJJY29uXCI7XG5pbXBvcnQgeyBUcmVlTm9kZVN0YXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9UcmVlTm9kZVN0YXRlXCI7XG5cbmltcG9ydCB7IHVzZVRyZWVOb2RlTGF6eUxvYWRpbmcgfSBmcm9tIFwiLi9ob29rcy9sYXp5TG9hZGluZ1wiO1xuaW1wb3J0IHsgVHJlZU5vZGVGb2N1c0NoYW5nZUhhbmRsZXIsIHVzZVRyZWVOb2RlQnJhbmNoS2V5Ym9hcmRIYW5kbGVyIH0gZnJvbSBcIi4vaG9va3MvVHJlZU5vZGVBY2Nlc3NpYmlsaXR5XCI7XG5pbXBvcnQgeyB1c2VBbmltYXRlZFRyZWVOb2RlQ29udGVudEhlaWdodCB9IGZyb20gXCIuL2hvb2tzL3VzZUFuaW1hdGVkSGVpZ2h0XCI7XG5pbXBvcnQgeyBUcmVlTm9kZUl0ZW0gfSBmcm9tIFwiLi9UcmVlTm9kZVwiO1xuXG5pbXBvcnQgeyBUcmVlTm9kZUJyYW5jaENvbnRleHQsIFRyZWVOb2RlQnJhbmNoQ29udGV4dFByb3BzIH0gZnJvbSBcIi4vVHJlZU5vZGVCcmFuY2hDb250ZXh0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJlZU5vZGVCcmFuY2hQcm9wcyB7XG4gICAgYW5pbWF0ZVRyZWVOb2RlQ29udGVudDogYm9vbGVhbjtcbiAgICBjaGlsZHJlbjogUmVhY3ROb2RlO1xuICAgIGhlYWRlckNvbnRlbnQ6IFJlYWN0Tm9kZTtcbiAgICBpY29uUGxhY2VtZW50OiBTaG93SWNvbkVudW07XG4gICAgaWQ6IFRyZWVOb2RlSXRlbVtcImlkXCJdO1xuICAgIGlzVXNlckRlZmluZWRMZWFmTm9kZTogYm9vbGVhbjtcbiAgICBvcGVuTm9kZU9uOiBPcGVuTm9kZU9uRW51bTtcbiAgICBzdGFydEV4cGFuZGVkOiBib29sZWFuO1xuICAgIGNoYW5nZUZvY3VzOiBUcmVlTm9kZUZvY3VzQ2hhbmdlSGFuZGxlcjtcbiAgICByZW5kZXJIZWFkZXJJY29uOiBUcmVlTm9kZUhlYWRlckljb247XG59XG5cbmV4cG9ydCBjb25zdCB0cmVlTm9kZUJyYW5jaFV0aWxzID0ge1xuICAgIGJvZHlDbGFzc05hbWU6IFwid2lkZ2V0LXRyZWUtbm9kZS1ib2R5XCIsXG4gICAgZ2V0SGVhZGVySWQ6IChpZDogVHJlZU5vZGVJdGVtW1wiaWRcIl0pID0+IGAke2lkfVRyZWVOb2RlQnJhbmNoSGVhZGVyYCxcbiAgICBnZXRCb2R5SWQ6IChpZDogVHJlZU5vZGVJdGVtW1wiaWRcIl0pID0+IGAke2lkfVRyZWVOb2RlQnJhbmNoQm9keWBcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBUcmVlTm9kZUJyYW5jaCh7XG4gICAgYW5pbWF0ZVRyZWVOb2RlQ29udGVudDogYW5pbWF0ZVRyZWVOb2RlQ29udGVudFByb3AsXG4gICAgY2hhbmdlRm9jdXMsXG4gICAgY2hpbGRyZW4sXG4gICAgaGVhZGVyQ29udGVudCxcbiAgICBpY29uUGxhY2VtZW50LFxuICAgIGlkLFxuICAgIGlzVXNlckRlZmluZWRMZWFmTm9kZSxcbiAgICBvcGVuTm9kZU9uLFxuICAgIHJlbmRlckhlYWRlckljb24sXG4gICAgc3RhcnRFeHBhbmRlZFxufTogVHJlZU5vZGVCcmFuY2hQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgeyBsZXZlbDogY3VycmVudENvbnRleHRMZXZlbCB9ID0gdXNlQ29udGV4dChUcmVlTm9kZUJyYW5jaENvbnRleHQpO1xuXG4gICAgY29uc3QgdHJlZU5vZGVCcmFuY2hSZWYgPSB1c2VSZWY8SFRNTExJRWxlbWVudD4obnVsbCk7XG4gICAgY29uc3QgdHJlZU5vZGVCcmFuY2hCb2R5ID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcblxuICAgIGNvbnN0IFtpc0FjdHVhbExlYWZOb2RlLCBzZXRJc0FjdHVhbExlYWZOb2RlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGlzVXNlckRlZmluZWRMZWFmTm9kZSB8fCAhY2hpbGRyZW4pO1xuICAgIGNvbnN0IFt0cmVlTm9kZVN0YXRlLCBzZXRUcmVlTm9kZVN0YXRlXSA9IHVzZVN0YXRlPFRyZWVOb2RlU3RhdGU+KFxuICAgICAgICBzdGFydEV4cGFuZGVkID8gVHJlZU5vZGVTdGF0ZS5FWFBBTkRFRCA6IFRyZWVOb2RlU3RhdGUuQ09MTEFQU0VEX1dJVEhfSlNcbiAgICApO1xuXG4gICAgY29uc3QgeyBpc0FuaW1hdGluZywgY2FwdHVyZUVsZW1lbnRIZWlnaHQsIGFuaW1hdGVUcmVlTm9kZUNvbnRlbnQsIGNsZWFudXBBbmltYXRpb24gfSA9XG4gICAgICAgIHVzZUFuaW1hdGVkVHJlZU5vZGVDb250ZW50SGVpZ2h0KHRyZWVOb2RlQnJhbmNoQm9keSk7XG5cbiAgICBjb25zdCBpbmZvcm1QYXJlbnRPZkNoaWxkTm9kZXM6IFRyZWVOb2RlQnJhbmNoQ29udGV4dFByb3BzW1wiaW5mb3JtUGFyZW50T2ZDaGlsZE5vZGVzXCJdID0gbnVtYmVyT2ZOb2RlcyA9PiB7XG4gICAgICAgIGlmIChudW1iZXJPZk5vZGVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNldFRyZWVOb2RlU3RhdGUodHJlZU5vZGVTdGF0ZSA9PlxuICAgICAgICAgICAgICAgIHRyZWVOb2RlU3RhdGUgPT09IFRyZWVOb2RlU3RhdGUuTE9BRElORyA/IFRyZWVOb2RlU3RhdGUuRVhQQU5ERUQgOiB0cmVlTm9kZVN0YXRlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc2V0SXNBY3R1YWxMZWFmTm9kZShjdXJyZW50SXNBY3R1YWxMZWFmTm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG51bWJlck9mTm9kZXMgPT09IDAgJiYgIWN1cnJlbnRJc0FjdHVhbExlYWZOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobnVtYmVyT2ZOb2RlcyA+IDAgJiYgY3VycmVudElzQWN0dWFsTGVhZk5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudElzQWN0dWFsTGVhZk5vZGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCBldmVudFRhcmdldElzTm90Q3VycmVudEJyYW5jaCA9IHVzZUNhbGxiYWNrPChldmVudDogU3ludGhldGljRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiBib29sZWFuPihldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBOb2RlO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgIXRyZWVOb2RlQnJhbmNoUmVmLmN1cnJlbnQ/LmlzU2FtZU5vZGUodGFyZ2V0KSAmJlxuICAgICAgICAgICAgIXRyZWVOb2RlQnJhbmNoUmVmLmN1cnJlbnQ/LmZpcnN0RWxlbWVudENoaWxkPy5jb250YWlucyh0YXJnZXQpICYmXG4gICAgICAgICAgICAhdHJlZU5vZGVCcmFuY2hSZWYuY3VycmVudD8ubGFzdEVsZW1lbnRDaGlsZD8uaXNTYW1lTm9kZSh0YXJnZXQpXG4gICAgICAgICk7XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgdG9nZ2xlVHJlZU5vZGVDb250ZW50ID0gdXNlQ2FsbGJhY2s8UmVhY3RFdmVudEhhbmRsZXI8SFRNTEVsZW1lbnQ+PihcbiAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50VGFyZ2V0SXNOb3RDdXJyZW50QnJhbmNoKGV2ZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpc0FjdHVhbExlYWZOb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FwdHVyZUVsZW1lbnRIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBzZXRUcmVlTm9kZVN0YXRlKHRyZWVOb2RlU3RhdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHJlZU5vZGVTdGF0ZSA9PT0gVHJlZU5vZGVTdGF0ZS5MT0FESU5HKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyZWVOb2RlU3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVOb2RlU3RhdGUgPT09IFRyZWVOb2RlU3RhdGUuQ09MTEFQU0VEX1dJVEhfSlMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBUcmVlTm9kZVN0YXRlLkxPQURJTkc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyZWVOb2RlU3RhdGUgPT09IFRyZWVOb2RlU3RhdGUuQ09MTEFQU0VEX1dJVEhfQ1NTKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gVHJlZU5vZGVTdGF0ZS5FWFBBTkRFRDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVHJlZU5vZGVTdGF0ZS5DT0xMQVBTRURfV0lUSF9DU1M7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtjYXB0dXJlRWxlbWVudEhlaWdodCwgZXZlbnRUYXJnZXRJc05vdEN1cnJlbnRCcmFuY2gsIGlzQWN0dWFsTGVhZk5vZGVdXG4gICAgKTtcblxuICAgIGNvbnN0IG9uSGVhZGVyS2V5RG93biA9IHVzZVRyZWVOb2RlQnJhbmNoS2V5Ym9hcmRIYW5kbGVyKFxuICAgICAgICB0b2dnbGVUcmVlTm9kZUNvbnRlbnQsXG4gICAgICAgIGNoYW5nZUZvY3VzLFxuICAgICAgICB0cmVlTm9kZVN0YXRlLFxuICAgICAgICBpc0FjdHVhbExlYWZOb2RlLFxuICAgICAgICBldmVudFRhcmdldElzTm90Q3VycmVudEJyYW5jaFxuICAgICk7XG5cbiAgICBjb25zdCB0cmVlTm9kZUFjY2Vzc2liaWxpdHlQcm9wcyA9IGdldFRyZWVOb2RlQWNjZXNzaWJpbGl0eVByb3BzKHRyZWVOb2RlU3RhdGUgPT09IFRyZWVOb2RlU3RhdGUuRVhQQU5ERUQpO1xuICAgIGNvbnN0IGlzSWNvbkNsaWNrYWJsZSA9IG9wZW5Ob2RlT24gPT09IFwiaWNvbkNsaWNrXCI7XG4gICAgY29uc3QgaXNIZWFkZXJDbGlja2FibGUgPSBvcGVuTm9kZU9uID09PSBcImhlYWRlckNsaWNrXCI7XG4gICAgY29uc3Qgb25JY29uQ2xpY2sgPSBpc0ljb25DbGlja2FibGUgPyB0b2dnbGVUcmVlTm9kZUNvbnRlbnQgOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgb25IZWFkZXJDbGljayA9IGlzSGVhZGVyQ2xpY2thYmxlID8gdG9nZ2xlVHJlZU5vZGVDb250ZW50IDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IHsgaGFzTmVzdGVkVHJlZU5vZGUgfSA9IHVzZVRyZWVOb2RlTGF6eUxvYWRpbmcodHJlZU5vZGVCcmFuY2hCb2R5KTtcblxuICAgIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGlmIChhbmltYXRlVHJlZU5vZGVDb250ZW50UHJvcCAmJiB0cmVlTm9kZVN0YXRlICE9PSBUcmVlTm9kZVN0YXRlLkxPQURJTkcpIHtcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkNsZWFudXAgPSBhbmltYXRlVHJlZU5vZGVDb250ZW50KCk7XG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uQ2xlYW51cCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhbmltYXRpb25DbGVhbnVwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgW2FuaW1hdGVUcmVlTm9kZUNvbnRlbnQsIGFuaW1hdGVUcmVlTm9kZUNvbnRlbnRQcm9wLCB0cmVlTm9kZVN0YXRlXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBzZXRJc0FjdHVhbExlYWZOb2RlKGlzVXNlckRlZmluZWRMZWFmTm9kZSB8fCAhY2hpbGRyZW4pO1xuICAgIH0sIFtjaGlsZHJlbiwgaXNVc2VyRGVmaW5lZExlYWZOb2RlXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBpZiAodHJlZU5vZGVTdGF0ZSA9PT0gVHJlZU5vZGVTdGF0ZS5MT0FESU5HKSB7XG4gICAgICAgICAgICBpZiAoIWhhc05lc3RlZFRyZWVOb2RlKCkpIHtcbiAgICAgICAgICAgICAgICBzZXRUcmVlTm9kZVN0YXRlKFRyZWVOb2RlU3RhdGUuRVhQQU5ERUQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgW2hhc05lc3RlZFRyZWVOb2RlLCB0cmVlTm9kZVN0YXRlXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8bGlcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIndpZGdldC10cmVlLW5vZGUtYnJhbmNoXCJcbiAgICAgICAgICAgIG9uS2V5RG93bj17b25IZWFkZXJLZXlEb3dufVxuICAgICAgICAgICAgcmVmPXt0cmVlTm9kZUJyYW5jaFJlZn1cbiAgICAgICAgICAgIHsuLi50cmVlTm9kZUFjY2Vzc2liaWxpdHlQcm9wc31cbiAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ3aWRnZXQtdHJlZS1ub2RlLWJyYW5jaC1oZWFkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICBcIndpZGdldC10cmVlLW5vZGUtYnJhbmNoLWhlYWRlci1jbGlja2FibGVcIjogIWlzQWN0dWFsTGVhZk5vZGUgJiYgaXNIZWFkZXJDbGlja2FibGUsXG4gICAgICAgICAgICAgICAgICAgIFwid2lkZ2V0LXRyZWUtbm9kZS1icmFuY2gtaGVhZGVyLXJldmVyc2VkXCI6IGljb25QbGFjZW1lbnQgPT09IFwibGVmdFwiXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgaWQ9e3RyZWVOb2RlQnJhbmNoVXRpbHMuZ2V0SGVhZGVySWQoaWQpfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uSGVhZGVyQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwid2lkZ2V0LXRyZWUtbm9kZS1icmFuY2gtaGVhZGVyLXZhbHVlXCI+e2hlYWRlckNvbnRlbnR9PC9zcGFuPlxuICAgICAgICAgICAgICAgIHshaXNBY3R1YWxMZWFmTm9kZSAmJiBpY29uUGxhY2VtZW50ICE9PSBcIm5vXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwid2lkZ2V0LXRyZWUtbm9kZS1icmFuY2gtaGVhZGVyLWljb24tY29udGFpbmVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZGdldC10cmVlLW5vZGUtYnJhbmNoLWhlYWRlci1jbGlja2FibGVcIjogIWlzQWN0dWFsTGVhZk5vZGUgJiYgaXNJY29uQ2xpY2thYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uSWNvbkNsaWNrfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cmVuZGVySGVhZGVySWNvbih0cmVlTm9kZVN0YXRlLCBpY29uUGxhY2VtZW50KX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICB7KCghaXNBY3R1YWxMZWFmTm9kZSAmJiB0cmVlTm9kZVN0YXRlICE9PSBUcmVlTm9kZVN0YXRlLkNPTExBUFNFRF9XSVRIX0pTKSB8fCBpc0FuaW1hdGluZykgJiYgKFxuICAgICAgICAgICAgICAgIDxUcmVlTm9kZUJyYW5jaENvbnRleHQuUHJvdmlkZXJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiBjdXJyZW50Q29udGV4dExldmVsICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm9ybVBhcmVudE9mQ2hpbGROb2Rlc1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHRyZWVOb2RlQnJhbmNoVXRpbHMuYm9keUNsYXNzTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkZ2V0LXRyZWUtbm9kZS1icmFuY2gtaGlkZGVuXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyZWVOb2RlU3RhdGUgPT09IFRyZWVOb2RlU3RhdGUuQ09MTEFQU0VEX1dJVEhfQ1NTICYmICFpc0FuaW1hdGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIndpZGdldC10cmVlLW5vZGUtYnJhbmNoLWxvYWRpbmdcIjogdHJlZU5vZGVTdGF0ZSA9PT0gVHJlZU5vZGVTdGF0ZS5MT0FESU5HXG4gICAgICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPXt0cmVlTm9kZUJyYW5jaFV0aWxzLmdldEJvZHlJZChpZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWhpZGRlbj17dHJlZU5vZGVTdGF0ZSAhPT0gVHJlZU5vZGVTdGF0ZS5FWFBBTkRFRH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17dHJlZU5vZGVCcmFuY2hCb2R5fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kPXtjbGVhbnVwQW5pbWF0aW9ufVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvVHJlZU5vZGVCcmFuY2hDb250ZXh0LlByb3ZpZGVyPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC9saT5cbiAgICApO1xufVxuXG5mdW5jdGlvbiBnZXRUcmVlTm9kZUFjY2Vzc2liaWxpdHlQcm9wcyhpc0V4cGFuZGVkOiBib29sZWFuKTogSFRNTEF0dHJpYnV0ZXM8SFRNTExJRWxlbWVudD4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIFwiYXJpYS1leHBhbmRlZFwiOiBpc0V4cGFuZGVkLFxuICAgICAgICByb2xlOiBcInRyZWVpdGVtXCIsXG4gICAgICAgIHRhYkluZGV4OiAwXG4gICAgfTtcbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgV2ViSWNvbiB9IGZyb20gXCJtZW5kaXhcIjtcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgeyBJY29uIH0gZnJvbSBcIm1lbmRpeC9jb21wb25lbnRzL3dlYi9JY29uXCI7XG5cbmV4cG9ydCBjb25zdCBDaGV2cm9uSWNvbiA9ICh7IGNsYXNzTmFtZSB9OiB7IGNsYXNzTmFtZTogc3RyaW5nIH0pOiBSZWFjdEVsZW1lbnQgPT4gKFxuICAgIDxzdmdcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgIGFyaWEtaGlkZGVuXG4gICAgICAgIHdpZHRoPVwiMTZcIlxuICAgICAgICBoZWlnaHQ9XCIxNlwiXG4gICAgICAgIHZpZXdCb3g9XCIwIDAgMTYgMTZcIlxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICA+XG4gICAgICAgIDxwYXRoIGQ9XCJNMS42NDU5OCA0LjY0NjAxQzEuNjkyNDIgNC41OTk0NSAxLjc0NzYgNC41NjI1IDEuODA4MzQgNC41MzczQzEuODY5MDkgNC41MTIwOSAxLjkzNDIxIDQuNDk5MTEgMS45OTk5OCA0LjQ5OTExQzIuMDY1NzUgNC40OTkxMSAyLjEzMDg3IDQuNTEyMDkgMi4xOTE2MSA0LjUzNzNDMi4yNTIzNiA0LjU2MjUgMi4zMDc1MyA0LjU5OTQ1IDIuMzUzOTggNC42NDYwMUw3Ljk5OTk4IDEwLjI5M0wxMy42NDYgNC42NDYwMUMxMy42OTI1IDQuNTk5NTIgMTMuNzQ3NyA0LjU2MjY0IDEzLjgwODQgNC41Mzc0OUMxMy44NjkxIDQuNTEyMzMgMTMuOTM0MiA0LjQ5OTM4IDE0IDQuNDk5MzhDMTQuMDY1NyA0LjQ5OTM4IDE0LjEzMDggNC41MTIzMyAxNC4xOTE2IDQuNTM3NDlDMTQuMjUyMyA0LjU2MjY0IDE0LjMwNzUgNC41OTk1MiAxNC4zNTQgNC42NDYwMUMxNC40MDA1IDQuNjkyNSAxNC40MzczIDQuNzQ3NjkgMTQuNDYyNSA0LjgwODQyQzE0LjQ4NzcgNC44NjkxNiAxNC41MDA2IDQuOTM0MjYgMTQuNTAwNiA1LjAwMDAxQzE0LjUwMDYgNS4wNjU3NSAxNC40ODc3IDUuMTMwODUgMTQuNDYyNSA1LjE5MTU5QzE0LjQzNzMgNS4yNTIzMyAxNC40MDA1IDUuMzA3NTIgMTQuMzU0IDUuMzU0MDFMOC4zNTM5OCAxMS4zNTRDOC4zMDc1MyAxMS40MDA2IDguMjUyMzYgMTEuNDM3NSA4LjE5MTYxIDExLjQ2MjdDOC4xMzA4NyAxMS40ODc5IDguMDY1NzUgMTEuNTAwOSA3Ljk5OTk4IDExLjUwMDlDNy45MzQyMSAxMS41MDA5IDcuODY5MDkgMTEuNDg3OSA3LjgwODM0IDExLjQ2MjdDNy43NDc2IDExLjQzNzUgNy42OTI0MiAxMS40MDA2IDcuNjQ1OTggMTEuMzU0TDEuNjQ1OTggNS4zNTQwMUMxLjU5OTQyIDUuMzA3NTYgMS41NjI0NyA1LjI1MjM5IDEuNTM3MjcgNS4xOTE2NEMxLjUxMjA2IDUuMTMwOSAxLjQ5OTA4IDUuMDY1NzggMS40OTkwOCA1LjAwMDAxQzEuNDk5MDggNC45MzQyNCAxLjUxMjA2IDQuODY5MTIgMS41MzcyNyA0LjgwODM3QzEuNTYyNDcgNC43NDc2MyAxLjU5OTQyIDQuNjkyNDUgMS42NDU5OCA0LjY0NjAxVjQuNjQ2MDFaXCIgLz5cbiAgICA8L3N2Zz5cbik7XG5cbmV4cG9ydCBjb25zdCBDdXN0b21IZWFkZXJJY29uID0gKHsgaWNvbiB9OiB7IGljb246IFdlYkljb24gfSk6IFJlYWN0RWxlbWVudCA9PiB7XG4gICAgbGV0IGN1cnJlbnRJY29uID0gaWNvbjtcbiAgICBpZiAoaWNvbiAmJiBpY29uLnR5cGUgIT09IFwiaW1hZ2VcIikge1xuICAgICAgICBjdXJyZW50SWNvbiA9IHsgLi4uaWNvbiwgaWNvbkNsYXNzOiBjbGFzc05hbWVzKGljb24uaWNvbkNsYXNzLCBcIndpZGdldC10cmVlLW5vZGUtYnJhbmNoLWhlYWRlci1pY29uXCIpIH07XG4gICAgfVxuICAgIHJldHVybiA8SWNvbiBpY29uPXtjdXJyZW50SWNvbn0gLz47XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgXCJ3aWRnZXRzL2NvbS9tZW5kaXgvd2lkZ2V0L3dlYi90cmVlbm9kZS9hc3NldHMvNzJkZjNiMWIwYjM3YTk1OC5zdmdcIiIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgeyBXZWJJY29uIH0gZnJvbSBcIm1lbmRpeFwiO1xuaW1wb3J0IHsgUmVhY3ROb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IENoZXZyb25JY29uLCBDdXN0b21IZWFkZXJJY29uIH0gZnJvbSBcIi4vSWNvbnNcIjtcbmltcG9ydCB7IFRyZWVOb2RlU3RhdGUgfSBmcm9tIFwiLi9UcmVlTm9kZVN0YXRlXCI7XG5pbXBvcnQgeyBTaG93SWNvbkVudW0gfSBmcm9tIFwiLi4vLi4vLi4vdHlwaW5ncy9UcmVlTm9kZVByb3BzXCI7XG5pbXBvcnQgbG9hZGluZ0NpcmNsZVN2ZyBmcm9tIFwiLi4vLi4vYXNzZXRzL2xvYWRpbmctY2lyY2xlLnN2Z1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEljb25PcHRpb25zIHtcbiAgICBhbmltYXRlSWNvbjogYm9vbGVhbjtcbiAgICBjb2xsYXBzZWRJY29uPzogV2ViSWNvbjtcbiAgICBleHBhbmRlZEljb24/OiBXZWJJY29uO1xuICAgIHNob3dDdXN0b21JY29uOiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBUcmVlTm9kZUhlYWRlckljb24gPSAoXG4gICAgdHJlZU5vZGVTdGF0ZTogVHJlZU5vZGVTdGF0ZSxcbiAgICBpY29uUGxhY2VtZW50OiBFeGNsdWRlPFNob3dJY29uRW51bSwgXCJub1wiPlxuKSA9PiBSZWFjdE5vZGU7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJUcmVlTm9kZUhlYWRlckljb24oXG4gICAgdHJlZU5vZGVTdGF0ZTogVHJlZU5vZGVTdGF0ZSxcbiAgICBpY29uUGxhY2VtZW50OiBFeGNsdWRlPFNob3dJY29uRW51bSwgXCJub1wiPixcbiAgICBpY29uT3B0aW9uczogSWNvbk9wdGlvbnNcbik6IFJlYWN0Tm9kZSB7XG4gICAgaWYgKHRyZWVOb2RlU3RhdGUgPT09IFRyZWVOb2RlU3RhdGUuTE9BRElORykge1xuICAgICAgICByZXR1cm4gPGltZyBzcmM9e2xvYWRpbmdDaXJjbGVTdmd9IGNsYXNzTmFtZT1cIndpZGdldC10cmVlLW5vZGUtbG9hZGluZy1zcGlubmVyXCIgYWx0PVwiXCIgYXJpYS1oaWRkZW4gLz47XG4gICAgfVxuXG4gICAgY29uc3QgeyBhbmltYXRlSWNvbiwgY29sbGFwc2VkSWNvbiwgZXhwYW5kZWRJY29uLCBzaG93Q3VzdG9tSWNvbiB9ID0gaWNvbk9wdGlvbnM7XG4gICAgY29uc3QgdHJlZU5vZGVJc0V4cGFuZGVkID0gdHJlZU5vZGVTdGF0ZSA9PT0gVHJlZU5vZGVTdGF0ZS5FWFBBTkRFRDtcblxuICAgIHJldHVybiBzaG93Q3VzdG9tSWNvbiA/IChcbiAgICAgICAgPEN1c3RvbUhlYWRlckljb24gaWNvbj17dHJlZU5vZGVJc0V4cGFuZGVkID8gZXhwYW5kZWRJY29uIDogY29sbGFwc2VkSWNvbn0gLz5cbiAgICApIDogKFxuICAgICAgICA8Q2hldnJvbkljb25cbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcIndpZGdldC10cmVlLW5vZGUtYnJhbmNoLWhlYWRlci1pY29uXCIsIHtcbiAgICAgICAgICAgICAgICBcIndpZGdldC10cmVlLW5vZGUtYnJhbmNoLWhlYWRlci1pY29uLWFuaW1hdGVkXCI6IGFuaW1hdGVJY29uLFxuICAgICAgICAgICAgICAgIFwid2lkZ2V0LXRyZWUtbm9kZS1icmFuY2gtaGVhZGVyLWljb24tY29sbGFwc2VkLWxlZnRcIjogIXRyZWVOb2RlSXNFeHBhbmRlZCAmJiBpY29uUGxhY2VtZW50ID09PSBcImxlZnRcIixcbiAgICAgICAgICAgICAgICBcIndpZGdldC10cmVlLW5vZGUtYnJhbmNoLWhlYWRlci1pY29uLWNvbGxhcHNlZC1yaWdodFwiOiAhdHJlZU5vZGVJc0V4cGFuZGVkICYmIGljb25QbGFjZW1lbnQgPT09IFwicmlnaHRcIlxuICAgICAgICAgICAgfSl9XG4gICAgICAgIC8+XG4gICAgKTtcbn1cbiIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgeyBPYmplY3RJdGVtLCBXZWJJY29uIH0gZnJvbSBcIm1lbmRpeFwiO1xuaW1wb3J0IHsgQ1NTUHJvcGVydGllcywgUmVhY3RFbGVtZW50LCBSZWFjdE5vZGUsIHVzZUNhbGxiYWNrLCB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IHVzZVRyZWVOb2RlRm9jdXNDaGFuZ2VIYW5kbGVyIH0gZnJvbSBcIi4vaG9va3MvVHJlZU5vZGVBY2Nlc3NpYmlsaXR5XCI7XG5pbXBvcnQgeyB1c2VUcmVlTm9kZVJlZiB9IGZyb20gXCIuL2hvb2tzL3VzZVRyZWVOb2RlUmVmXCI7XG5pbXBvcnQgeyBUcmVlTm9kZUJyYW5jaCwgVHJlZU5vZGVCcmFuY2hQcm9wcywgdHJlZU5vZGVCcmFuY2hVdGlscyB9IGZyb20gXCIuL1RyZWVOb2RlQnJhbmNoXCI7XG5pbXBvcnQgeyBUcmVlTm9kZUJyYW5jaENvbnRleHQsIHVzZUluZm9ybVBhcmVudENvbnRleHRPZkNoaWxkTm9kZXMgfSBmcm9tIFwiLi9UcmVlTm9kZUJyYW5jaENvbnRleHRcIjtcbmltcG9ydCB7IE9wZW5Ob2RlT25FbnVtLCBUcmVlTm9kZUNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGluZ3MvVHJlZU5vZGVQcm9wc1wiO1xuaW1wb3J0IHsgcmVuZGVyVHJlZU5vZGVIZWFkZXJJY29uLCBUcmVlTm9kZUhlYWRlckljb24gfSBmcm9tIFwiLi4vY29tbW9uL0hlYWRlckljb25cIjtcblxuZXhwb3J0IGludGVyZmFjZSBUcmVlTm9kZUl0ZW0gZXh0ZW5kcyBPYmplY3RJdGVtIHtcbiAgICBoZWFkZXJDb250ZW50OiBSZWFjdE5vZGU7XG4gICAgYm9keUNvbnRlbnQ6IFJlYWN0Tm9kZTtcbiAgICBpc1VzZXJEZWZpbmVkTGVhZk5vZGU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSW5mb1RyZWVOb2RlSXRlbSB7XG4gICAgTWVzc2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyZWVOb2RlUHJvcHMgZXh0ZW5kcyBQaWNrPFRyZWVOb2RlQ29udGFpbmVyUHJvcHMsIFwidGFiSW5kZXhcIj4ge1xuICAgIGNsYXNzOiBzdHJpbmc7XG4gICAgc3R5bGU/OiBDU1NQcm9wZXJ0aWVzO1xuICAgIGl0ZW1zOiBUcmVlTm9kZUl0ZW1bXSB8IEluZm9UcmVlTm9kZUl0ZW0gfCBudWxsO1xuICAgIHN0YXJ0RXhwYW5kZWQ6IFRyZWVOb2RlQnJhbmNoUHJvcHNbXCJzdGFydEV4cGFuZGVkXCJdO1xuICAgIHNob3dDdXN0b21JY29uOiBib29sZWFuO1xuICAgIGljb25QbGFjZW1lbnQ6IFRyZWVOb2RlQnJhbmNoUHJvcHNbXCJpY29uUGxhY2VtZW50XCJdO1xuICAgIGV4cGFuZGVkSWNvbj86IFdlYkljb247XG4gICAgY29sbGFwc2VkSWNvbj86IFdlYkljb247XG4gICAgYW5pbWF0ZUljb246IGJvb2xlYW47XG4gICAgYW5pbWF0ZVRyZWVOb2RlQ29udGVudDogVHJlZU5vZGVCcmFuY2hQcm9wc1tcImFuaW1hdGVUcmVlTm9kZUNvbnRlbnRcIl07XG4gICAgb3Blbk5vZGVPbjogT3Blbk5vZGVPbkVudW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUcmVlTm9kZSh7XG4gICAgY2xhc3M6IGNsYXNzTmFtZSxcbiAgICBpdGVtcyxcbiAgICBzdHlsZSxcbiAgICBzaG93Q3VzdG9tSWNvbixcbiAgICBzdGFydEV4cGFuZGVkLFxuICAgIGljb25QbGFjZW1lbnQsXG4gICAgZXhwYW5kZWRJY29uLFxuICAgIGNvbGxhcHNlZEljb24sXG4gICAgdGFiSW5kZXgsXG4gICAgYW5pbWF0ZUljb24sXG4gICAgYW5pbWF0ZVRyZWVOb2RlQ29udGVudCxcbiAgICBvcGVuTm9kZU9uXG59OiBUcmVlTm9kZVByb3BzKTogUmVhY3RFbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3QgeyBsZXZlbCB9ID0gdXNlQ29udGV4dChUcmVlTm9kZUJyYW5jaENvbnRleHQpO1xuICAgIGNvbnN0IFt0cmVlTm9kZUVsZW1lbnQsIHVwZGF0ZVRyZWVOb2RlRWxlbWVudF0gPSB1c2VUcmVlTm9kZVJlZigpO1xuXG4gICAgY29uc3QgcmVuZGVySGVhZGVySWNvbkNhbGxiYWNrID0gdXNlQ2FsbGJhY2s8VHJlZU5vZGVIZWFkZXJJY29uPihcbiAgICAgICAgKHRyZWVOb2RlU3RhdGUsIGljb25QbGFjZW1lbnQpID0+XG4gICAgICAgICAgICByZW5kZXJUcmVlTm9kZUhlYWRlckljb24odHJlZU5vZGVTdGF0ZSwgaWNvblBsYWNlbWVudCwge1xuICAgICAgICAgICAgICAgIGFuaW1hdGVJY29uLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZEljb24sXG4gICAgICAgICAgICAgICAgZXhwYW5kZWRJY29uLFxuICAgICAgICAgICAgICAgIHNob3dDdXN0b21JY29uXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgW2NvbGxhcHNlZEljb24sIGV4cGFuZGVkSWNvbiwgc2hvd0N1c3RvbUljb24sIGFuaW1hdGVJY29uXVxuICAgICk7XG5cbiAgICBjb25zdCBpc0luc2lkZUFub3RoZXJUcmVlTm9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRyZWVOb2RlRWxlbWVudD8ucGFyZW50RWxlbWVudD8uY2xhc3NOYW1lLmluY2x1ZGVzKHRyZWVOb2RlQnJhbmNoVXRpbHMuYm9keUNsYXNzTmFtZSkgPz8gZmFsc2U7XG4gICAgfSwgW3RyZWVOb2RlRWxlbWVudF0pO1xuXG4gICAgdXNlSW5mb3JtUGFyZW50Q29udGV4dE9mQ2hpbGROb2RlcyhBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zLmxlbmd0aCA6IDAsIGlzSW5zaWRlQW5vdGhlclRyZWVOb2RlKTtcblxuICAgIGNvbnN0IGNoYW5nZVRyZWVOb2RlQnJhbmNoSGVhZGVyRm9jdXMgPSB1c2VUcmVlTm9kZUZvY3VzQ2hhbmdlSGFuZGxlcigpO1xuXG4gICAgaWYgKGl0ZW1zID09PSBudWxsIHx8IChBcnJheS5pc0FycmF5KGl0ZW1zKSAmJiBpdGVtcy5sZW5ndGggPT09IDApKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDx1bFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwid2lkZ2V0LXRyZWUtbm9kZVwiLCBjbGFzc05hbWUpfVxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICAgICAgcmVmPXt1cGRhdGVUcmVlTm9kZUVsZW1lbnR9XG4gICAgICAgICAgICBkYXRhLWZvY3VzaW5kZXg9e3RhYkluZGV4IHx8IDB9XG4gICAgICAgICAgICByb2xlPXtsZXZlbCA9PT0gMCA/IFwidHJlZVwiIDogXCJncm91cFwifVxuICAgICAgICA+XG4gICAgICAgICAgICB7QXJyYXkuaXNBcnJheShpdGVtcykgJiZcbiAgICAgICAgICAgICAgICBpdGVtcy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgaWQsIGhlYWRlckNvbnRlbnQsIGJvZHlDb250ZW50LCBpc1VzZXJEZWZpbmVkTGVhZk5vZGUgfSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8VHJlZU5vZGVCcmFuY2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2lkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtpZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJDb250ZW50PXtoZWFkZXJDb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVXNlckRlZmluZWRMZWFmTm9kZT17aXNVc2VyRGVmaW5lZExlYWZOb2RlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0RXhwYW5kZWQ9e3N0YXJ0RXhwYW5kZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvblBsYWNlbWVudD17aWNvblBsYWNlbWVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJIZWFkZXJJY29uPXtyZW5kZXJIZWFkZXJJY29uQ2FsbGJhY2t9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlRm9jdXM9e2NoYW5nZVRyZWVOb2RlQnJhbmNoSGVhZGVyRm9jdXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZVRyZWVOb2RlQ29udGVudD17YW5pbWF0ZVRyZWVOb2RlQ29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuTm9kZU9uPXtvcGVuTm9kZU9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtib2R5Q29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvVHJlZU5vZGVCcmFuY2g+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgIDwvdWw+XG4gICAgKTtcbn1cbiIsImltcG9ydCB7IE9iamVjdEl0ZW0sIFZhbHVlU3RhdHVzIH0gZnJvbSBcIm1lbmRpeFwiO1xuaW1wb3J0IHsgUmVhY3RFbGVtZW50LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IEluZm9UcmVlTm9kZUl0ZW0sIFRyZWVOb2RlLCBUcmVlTm9kZUl0ZW0gfSBmcm9tIFwiLi9UcmVlTm9kZVwiO1xuaW1wb3J0IHsgVHJlZU5vZGVDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi90eXBpbmdzL1RyZWVOb2RlUHJvcHNcIjtcblxuZnVuY3Rpb24gbWFwRGF0YVNvdXJjZUl0ZW1Ub1RyZWVOb2RlSXRlbShpdGVtOiBPYmplY3RJdGVtLCBwcm9wczogVHJlZU5vZGVDb250YWluZXJQcm9wcyk6IFRyZWVOb2RlSXRlbSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGl0ZW0uaWQsXG4gICAgICAgIGhlYWRlckNvbnRlbnQ6XG4gICAgICAgICAgICBwcm9wcy5oZWFkZXJUeXBlID09PSBcInRleHRcIiA/IHByb3BzLmhlYWRlckNhcHRpb24/LmdldChpdGVtKS52YWx1ZSA6IHByb3BzLmhlYWRlckNvbnRlbnQ/LmdldChpdGVtKSxcbiAgICAgICAgYm9keUNvbnRlbnQ6IHByb3BzLmNoaWxkcmVuPy5nZXQoaXRlbSksXG4gICAgICAgIGlzVXNlckRlZmluZWRMZWFmTm9kZTogcHJvcHMuaGFzQ2hpbGRyZW4/LmdldChpdGVtKS52YWx1ZSA9PT0gZmFsc2VcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVHJlZU5vZGVWMShwcm9wczogVHJlZU5vZGVDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgeyBkYXRhc291cmNlIH0gPSBwcm9wcztcbiAgICBjb25zdCBbdHJlZU5vZGVJdGVtcywgc2V0VHJlZU5vZGVJdGVtc10gPSB1c2VTdGF0ZTxUcmVlTm9kZUl0ZW1bXSB8IEluZm9UcmVlTm9kZUl0ZW0gfCBudWxsPihbXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICAvLyBPbmx5IHByb2Nlc3MgZGF0YXNvdXJjZSBpdGVtcyB3aGVuIHRoZXkgYXJlIGF2YWlsYWJsZSB0byBhdm9pZCByZW5kZXJpbmcgcmVzZXRzIHdoaWxlIGxvYWRpbmcuXG4gICAgICAgIGlmIChkYXRhc291cmNlLnN0YXR1cyA9PT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICBpZiAoZGF0YXNvdXJjZS5pdGVtcyAmJiBkYXRhc291cmNlLml0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHNldFRyZWVOb2RlSXRlbXMoZGF0YXNvdXJjZS5pdGVtcy5tYXAoaXRlbSA9PiBtYXBEYXRhU291cmNlSXRlbVRvVHJlZU5vZGVJdGVtKGl0ZW0sIHByb3BzKSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRUcmVlTm9kZUl0ZW1zKHtcbiAgICAgICAgICAgICAgICAgICAgTWVzc2FnZTogXCJObyBkYXRhIGF2YWlsYWJsZVwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBbZGF0YXNvdXJjZS5zdGF0dXMsIGRhdGFzb3VyY2UuaXRlbXNdKTtcblxuICAgIGNvbnN0IGV4cGFuZGVkSWNvbiA9IHByb3BzLmV4cGFuZGVkSWNvbj8uc3RhdHVzID09PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgPyBwcm9wcy5leHBhbmRlZEljb24udmFsdWUgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgY29sbGFwc2VkSWNvbiA9IHByb3BzLmNvbGxhcHNlZEljb24/LnN0YXR1cyA9PT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlID8gcHJvcHMuY29sbGFwc2VkSWNvbi52YWx1ZSA6IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxUcmVlTm9kZVxuICAgICAgICAgICAgY2xhc3M9e3Byb3BzLmNsYXNzfVxuICAgICAgICAgICAgc3R5bGU9e3Byb3BzLnN0eWxlfVxuICAgICAgICAgICAgaXRlbXM9e3RyZWVOb2RlSXRlbXN9XG4gICAgICAgICAgICBzdGFydEV4cGFuZGVkPXtwcm9wcy5zdGFydEV4cGFuZGVkfVxuICAgICAgICAgICAgc2hvd0N1c3RvbUljb249e0Jvb2xlYW4ocHJvcHMuZXhwYW5kZWRJY29uKSB8fCBCb29sZWFuKHByb3BzLmNvbGxhcHNlZEljb24pfVxuICAgICAgICAgICAgaWNvblBsYWNlbWVudD17cHJvcHMuc2hvd0ljb259XG4gICAgICAgICAgICBleHBhbmRlZEljb249e2V4cGFuZGVkSWNvbn1cbiAgICAgICAgICAgIGNvbGxhcHNlZEljb249e2NvbGxhcHNlZEljb259XG4gICAgICAgICAgICB0YWJJbmRleD17cHJvcHMudGFiSW5kZXh9XG4gICAgICAgICAgICBhbmltYXRlSWNvbj17cHJvcHMuYW5pbWF0ZSAmJiBwcm9wcy5hbmltYXRlSWNvbn1cbiAgICAgICAgICAgIGFuaW1hdGVUcmVlTm9kZUNvbnRlbnQ9e3Byb3BzLmFuaW1hdGV9XG4gICAgICAgICAgICBvcGVuTm9kZU9uPXtwcm9wcy5vcGVuTm9kZU9ufVxuICAgICAgICAvPlxuICAgICk7XG59XG4iLCJpbXBvcnQgeyBPYmplY3RJdGVtIH0gZnJvbSBcIm1lbmRpeFwiO1xuaW1wb3J0IHsgUmVhY3ROb2RlLCBLZXlib2FyZEV2ZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBUcmVlQ29uZmlnUmVmIH0gZnJvbSBcIi4vdXNlSW5jcmVtZW50YWxUcmVlRGF0YVwiO1xuaW1wb3J0IHsgVHJlZU5vZGVDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBpbmdzL1RyZWVOb2RlUHJvcHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZW1JZChpdGVtOiBPYmplY3RJdGVtKTogc3RyaW5nIHtcbiAgICByZXR1cm4gU3RyaW5nKGl0ZW0uaWQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50SWQoXG4gICAgaXRlbTogT2JqZWN0SXRlbSxcbiAgICBwYXJlbnRBc3NvY2lhdGlvbjogVHJlZU5vZGVDb250YWluZXJQcm9wc1tcInBhcmVudEFzc29jaWF0aW9uXCJdXG4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHBhcmVudE9iamVjdCA9IHBhcmVudEFzc29jaWF0aW9uPy5nZXQoaXRlbSkudmFsdWU7XG4gICAgcmV0dXJuIHBhcmVudE9iamVjdD8uaWQgPyBnZXRJdGVtSWQocGFyZW50T2JqZWN0KSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEl0ZW1UaXRsZShpdGVtOiBPYmplY3RJdGVtLCBjb25maWc6IFRyZWVDb25maWdSZWYpOiBSZWFjdE5vZGUge1xuICAgIGlmIChjb25maWcuaGVhZGVyVHlwZSA9PT0gXCJ0ZXh0XCIpIHtcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5oZWFkZXJDYXB0aW9uPy5nZXQoaXRlbSkudmFsdWUgPz8gZ2V0SXRlbUlkKGl0ZW0pO1xuICAgIH1cbiAgICByZXR1cm4gY29uZmlnLmhlYWRlckNvbnRlbnQ/LmdldChpdGVtKSA/PyBnZXRJdGVtSWQoaXRlbSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbmZpZ0NoYW5nZWQocHJldmlvdXM6IFRyZWVDb25maWdSZWYgfCBudWxsLCBuZXh0OiBUcmVlQ29uZmlnUmVmKTogYm9vbGVhbiB7XG4gICAgaWYgKCFwcmV2aW91cykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICBwcmV2aW91cy5oZWFkZXJUeXBlICE9PSBuZXh0LmhlYWRlclR5cGUgfHxcbiAgICAgICAgcHJldmlvdXMuaGVhZGVyQ2FwdGlvbiAhPT0gbmV4dC5oZWFkZXJDYXB0aW9uIHx8XG4gICAgICAgIHByZXZpb3VzLmhlYWRlckNvbnRlbnQgIT09IG5leHQuaGVhZGVyQ29udGVudCB8fFxuICAgICAgICBwcmV2aW91cy5wYXJlbnRBc3NvY2lhdGlvbiAhPT0gbmV4dC5wYXJlbnRBc3NvY2lhdGlvblxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbktleURvd25IYW5kbGVyPFQ+KFxuICAgIGV2ZW50OiBLZXlib2FyZEV2ZW50PEhUTUxMSUVsZW1lbnQ+LFxuICAgIGhhc0NoaWxkcmVuOiBib29sZWFuLFxuICAgIGlzRXhwYW5kZWQ6IGJvb2xlYW4sXG4gICAgb25Ob2RlQ2xpY2s6IChub2RlOiBUKSA9PiB2b2lkLFxuICAgIG5vZGU6IFRcbik6IHZvaWQge1xuICAgIC8vIE9ubHkgaGFuZGxlIGtleSBldmVudHMgb24gdGhlIHRyZWUgaXRlbSBpdHNlbGYsIG5vdCBidWJibGVkIGZyb20gY2hpbGRyZW5cbiAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldCAhPT0gZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICBjYXNlIFwiRW50ZXJcIjpcbiAgICAgICAgY2FzZSBcIiBcIjogLy8gU3BhY2Uga2V5XG4gICAgICAgICAgICBpZiAoaGFzQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIG9uTm9kZUNsaWNrKG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJBcnJvd1JpZ2h0XCI6XG4gICAgICAgICAgICBpZiAoaGFzQ2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzRXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIG9uTm9kZUNsaWNrKG5vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiQXJyb3dMZWZ0XCI6XG4gICAgICAgICAgICBpZiAoaGFzQ2hpbGRyZW4gJiYgaXNFeHBhbmRlZCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgb25Ob2RlQ2xpY2sobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBPYmplY3RJdGVtIH0gZnJvbSBcIm1lbmRpeFwiO1xuaW1wb3J0IHsgUmVhY3ROb2RlLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGdldEl0ZW1JZCwgZ2V0SXRlbVRpdGxlLCBnZXRQYXJlbnRJZCwgaXNDb25maWdDaGFuZ2VkIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgVHJlZU5vZGVDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBpbmdzL1RyZWVOb2RlUHJvcHNcIjtcbmltcG9ydCB7IFRyZWVOb2RlU3RhdGUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL1RyZWVOb2RlU3RhdGVcIjtcblxudHlwZSBOb2RlUGxhY2VtZW50ID0gc3RyaW5nIHwgbnVsbDtcblxuZXhwb3J0IGludGVyZmFjZSBUcmVlQ29uZmlnUmVmIHtcbiAgICBoZWFkZXJDYXB0aW9uOiBUcmVlTm9kZUNvbnRhaW5lclByb3BzW1wiaGVhZGVyQ2FwdGlvblwiXTtcbiAgICBoZWFkZXJDb250ZW50OiBUcmVlTm9kZUNvbnRhaW5lclByb3BzW1wiaGVhZGVyQ29udGVudFwiXTtcbiAgICBoZWFkZXJUeXBlOiBUcmVlTm9kZUNvbnRhaW5lclByb3BzW1wiaGVhZGVyVHlwZVwiXTtcbiAgICBwYXJlbnRBc3NvY2lhdGlvbjogVHJlZU5vZGVDb250YWluZXJQcm9wc1tcInBhcmVudEFzc29jaWF0aW9uXCJdO1xuICAgIHN0YXJ0RXhwYW5kZWQ6IFRyZWVOb2RlQ29udGFpbmVyUHJvcHNbXCJzdGFydEV4cGFuZGVkXCJdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyZWVOb2RlVjJEYXRhSXRlbSB7XG4gICAgY2hpbGRyZW46IFRyZWVOb2RlVjJEYXRhSXRlbVtdO1xuICAgIGlkOiBzdHJpbmc7XG4gICAgaXRlbTogT2JqZWN0SXRlbTtcbiAgICBwYXJlbnRJZD86IHN0cmluZztcbiAgICB0cmVlTm9kZVN0YXRlOiBUcmVlTm9kZVN0YXRlO1xuICAgIHRpdGxlOiBSZWFjdE5vZGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VJbmNyZW1lbnRhbFRyZWVEYXRhKGl0ZW1zOiBPYmplY3RJdGVtW10gfCB1bmRlZmluZWQsIGNvbmZpZzogVHJlZUNvbmZpZ1JlZik6IFRyZWVOb2RlVjJEYXRhSXRlbVtdIHtcbiAgICBjb25zdCBbdHJlZURhdGEsIHNldFRyZWVEYXRhXSA9IHVzZVN0YXRlPFRyZWVOb2RlVjJEYXRhSXRlbVtdPihbXSk7XG5cbiAgICBjb25zdCByb290c1JlZiA9IHVzZVJlZjxUcmVlTm9kZVYyRGF0YUl0ZW1bXT4oW10pO1xuICAgIGNvbnN0IG5vZGVzQnlJZFJlZiA9IHVzZVJlZjxNYXA8c3RyaW5nLCBUcmVlTm9kZVYyRGF0YUl0ZW0+PihuZXcgTWFwKCkpO1xuICAgIGNvbnN0IHBsYWNlbWVudEJ5SWRSZWYgPSB1c2VSZWY8TWFwPHN0cmluZywgTm9kZVBsYWNlbWVudD4+KG5ldyBNYXAoKSk7XG4gICAgY29uc3QgcHJldmlvdXNJZHNSZWYgPSB1c2VSZWY8U2V0PHN0cmluZz4+KG5ldyBTZXQoKSk7XG4gICAgY29uc3QgcHJldmlvdXNDb25maWdSZWYgPSB1c2VSZWY8VHJlZUNvbmZpZ1JlZiB8IG51bGw+KG51bGwpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3Qgc291cmNlSXRlbXMgPSBpdGVtcyA/PyBbXTtcbiAgICAgICAgY29uc3QgaW5jb21pbmdJZHMgPSBuZXcgU2V0PHN0cmluZz4oc291cmNlSXRlbXMubWFwKGdldEl0ZW1JZCkpO1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZWRJZHNEZXRlY3RlZCA9XG4gICAgICAgICAgICBpbmNvbWluZ0lkcy5zaXplIDwgcHJldmlvdXNJZHNSZWYuY3VycmVudC5zaXplIHx8XG4gICAgICAgICAgICBbLi4ucHJldmlvdXNJZHNSZWYuY3VycmVudF0uc29tZShpZCA9PiAhaW5jb21pbmdJZHMuaGFzKGlkKSk7XG5cbiAgICAgICAgY29uc3QgY29uZmlnQ2hhbmdlZCA9IGlzQ29uZmlnQ2hhbmdlZChwcmV2aW91c0NvbmZpZ1JlZi5jdXJyZW50LCBjb25maWcpO1xuICAgICAgICBwcmV2aW91c0NvbmZpZ1JlZi5jdXJyZW50ID0gY29uZmlnO1xuXG4gICAgICAgIGlmIChjb25maWdDaGFuZ2VkIHx8IHJlbW92ZWRJZHNEZXRlY3RlZCkge1xuICAgICAgICAgICAgcm9vdHNSZWYuY3VycmVudCA9IFtdO1xuICAgICAgICAgICAgbm9kZXNCeUlkUmVmLmN1cnJlbnQuY2xlYXIoKTtcbiAgICAgICAgICAgIHBsYWNlbWVudEJ5SWRSZWYuY3VycmVudC5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlRnJvbUN1cnJlbnRQbGFjZW1lbnQgPSAobm9kZUlkOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlbWVudCA9IHBsYWNlbWVudEJ5SWRSZWYuY3VycmVudC5nZXQobm9kZUlkKTtcblxuICAgICAgICAgICAgaWYgKHBsYWNlbWVudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGxhY2VtZW50ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcm9vdHNSZWYuY3VycmVudCA9IHJvb3RzUmVmLmN1cnJlbnQuZmlsdGVyKG5vZGUgPT4gbm9kZS5pZCAhPT0gbm9kZUlkKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IG5vZGVzQnlJZFJlZi5jdXJyZW50LmdldChwbGFjZW1lbnQpO1xuICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgIHBhcmVudC5jaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlbi5maWx0ZXIoY2hpbGQgPT4gY2hpbGQuaWQgIT09IG5vZGVJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcGxhY2VOb2RlID0gKG5vZGU6IFRyZWVOb2RlVjJEYXRhSXRlbSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50SWQgPSBub2RlLnBhcmVudElkICYmIG5vZGUucGFyZW50SWQgIT09IG5vZGUuaWQgPyBub2RlLnBhcmVudElkIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICBpZiAocGFyZW50SWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnQgPSBub2Rlc0J5SWRSZWYuY3VycmVudC5nZXQocGFyZW50SWQpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2VtZW50QnlJZFJlZi5jdXJyZW50LmdldChub2RlLmlkKSA9PT0gcGFyZW50SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUZyb21DdXJyZW50UGxhY2VtZW50KG5vZGUuaWQpO1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50QnlJZFJlZi5jdXJyZW50LnNldChub2RlLmlkLCBwYXJlbnRJZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwbGFjZW1lbnRCeUlkUmVmLmN1cnJlbnQuZ2V0KG5vZGUuaWQpID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZW1vdmVGcm9tQ3VycmVudFBsYWNlbWVudChub2RlLmlkKTtcbiAgICAgICAgICAgIHJvb3RzUmVmLmN1cnJlbnQucHVzaChub2RlKTtcbiAgICAgICAgICAgIHBsYWNlbWVudEJ5SWRSZWYuY3VycmVudC5zZXQobm9kZS5pZCwgbnVsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yIChjb25zdCBpdGVtIG9mIHNvdXJjZUl0ZW1zKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlSWQgPSBnZXRJdGVtSWQoaXRlbSk7XG4gICAgICAgICAgICBjb25zdCBuZXh0UGFyZW50SWQgPSBnZXRQYXJlbnRJZChpdGVtLCBjb25maWcucGFyZW50QXNzb2NpYXRpb24pO1xuICAgICAgICAgICAgY29uc3QgbmV4dFRpdGxlID0gZ2V0SXRlbVRpdGxlKGl0ZW0sIGNvbmZpZyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nTm9kZSA9IG5vZGVzQnlJZFJlZi5jdXJyZW50LmdldChub2RlSWQpO1xuICAgICAgICAgICAgLy8gaWYgYWxyZWFkeSBleGlzdHMsIHVwZGF0ZSB0aGUgaXRlbVxuICAgICAgICAgICAgaWYgKGV4aXN0aW5nTm9kZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudENoYW5nZWQgPSBleGlzdGluZ05vZGUucGFyZW50SWQgIT09IG5leHRQYXJlbnRJZDtcbiAgICAgICAgICAgICAgICBleGlzdGluZ05vZGUuaXRlbSA9IGl0ZW07XG4gICAgICAgICAgICAgICAgZXhpc3RpbmdOb2RlLnBhcmVudElkID0gbmV4dFBhcmVudElkO1xuICAgICAgICAgICAgICAgIGV4aXN0aW5nTm9kZS50aXRsZSA9IG5leHRUaXRsZTtcblxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlTm9kZShleGlzdGluZ05vZGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChleGlzdGluZ05vZGUudHJlZU5vZGVTdGF0ZSA9PT0gVHJlZU5vZGVTdGF0ZS5MT0FESU5HKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nTm9kZS50cmVlTm9kZVN0YXRlID0gY29uZmlnLnN0YXJ0RXhwYW5kZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gVHJlZU5vZGVTdGF0ZS5FWFBBTkRFRFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBUcmVlTm9kZVN0YXRlLkNPTExBUFNFRF9XSVRIX0pTO1xuICAgICAgICAgICAgICAgICAgICBub2Rlc0J5SWRSZWYuY3VycmVudC5zZXQobm9kZUlkLCBleGlzdGluZ05vZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbmV3Tm9kZTogVHJlZU5vZGVWMkRhdGFJdGVtID0ge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgICAgICAgICAgICBpZDogbm9kZUlkLFxuICAgICAgICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgICAgICAgcGFyZW50SWQ6IG5leHRQYXJlbnRJZCxcbiAgICAgICAgICAgICAgICB0cmVlTm9kZVN0YXRlOiBUcmVlTm9kZVN0YXRlLkxPQURJTkcsXG4gICAgICAgICAgICAgICAgdGl0bGU6IG5leHRUaXRsZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5vZGVzQnlJZFJlZi5jdXJyZW50LnNldChub2RlSWQsIG5ld05vZGUpO1xuICAgICAgICAgICAgcGxhY2VOb2RlKG5ld05vZGUpO1xuXG4gICAgICAgICAgICAvLyBSZS1wbGFjZSBwb3RlbnRpYWwgY2hpbGRyZW4gdGhhdCB3ZXJlIHRlbXBvcmFyaWx5IHJvb3RzIHdoaWxlIHBhcmVudCB3YXNuJ3QgbG9hZGVkIHlldC5cbiAgICAgICAgICAgIGZvciAoY29uc3QgY2FuZGlkYXRlIG9mIG5vZGVzQnlJZFJlZi5jdXJyZW50LnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbmRpZGF0ZS5wYXJlbnRJZCA9PT0gbm9kZUlkICYmIGNhbmRpZGF0ZS5pZCAhPT0gbm9kZUlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlTm9kZShjYW5kaWRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByZXZpb3VzSWRzUmVmLmN1cnJlbnQgPSBpbmNvbWluZ0lkcztcbiAgICAgICAgc2V0VHJlZURhdGEoWy4uLnJvb3RzUmVmLmN1cnJlbnRdKTtcbiAgICB9LCBbaXRlbXMsIGNvbmZpZ10pO1xuXG4gICAgcmV0dXJuIHRyZWVEYXRhO1xufVxuIiwiaW1wb3J0IHsgT2JqZWN0SXRlbSwgT3B0aW9uIH0gZnJvbSBcIm1lbmRpeFwiO1xuaW1wb3J0IHsgYXNzb2NpYXRpb24sIGVxdWFscywgbGl0ZXJhbCwgb3IgfSBmcm9tIFwibWVuZGl4L2ZpbHRlcnMvYnVpbGRlcnNcIjtcbmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgVHJlZU5vZGVDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi8uLi8uLi8uLi90eXBpbmdzL1RyZWVOb2RlUHJvcHNcIjtcbmltcG9ydCB7IGdldEl0ZW1JZCB9IGZyb20gXCIuL2hlbHBlcnNcIjtcblxuZXhwb3J0IHR5cGUgSXRlbVR5cGUgPSBBcnJheTxPcHRpb248T2JqZWN0SXRlbT4+O1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlSW5maW5pdGVUcmVlTm9kZXMocHJvcHM6IFRyZWVOb2RlQ29udGFpbmVyUHJvcHMpOiB7XG4gICAgaXRlbXM6IE9iamVjdEl0ZW1bXSB8IHVuZGVmaW5lZDtcbiAgICBhcHBlbmRJdGVtczogKG5ld0l0ZW06IE9iamVjdEl0ZW0sIGNoaWxkcmVuPzogT2JqZWN0SXRlbVtdKSA9PiB2b2lkO1xufSB7XG4gICAgY29uc3QgeyBkYXRhc291cmNlLCBwYXJlbnRBc3NvY2lhdGlvbiwgc3RhcnRFeHBhbmRlZCB9ID0gcHJvcHM7XG4gICAgLy8gbG9hZGVkUGFyZW50cyA6IHRyYWNrIHRoZSBub2RlcyB0aGF0IGFyZSBleHBhbmRlZFxuICAgIGNvbnN0IGxvYWRlZFBhcmVudHNCeUlkUmVmID0gdXNlUmVmPE1hcDxzdHJpbmcsIE9iamVjdEl0ZW0+PihuZXcgTWFwKCkpO1xuICAgIC8vIGxvYWRlZENoaWxkcyA6IHRyYWNrIHRoZSBwcmUtbG9hZGVkIG5vZGVzIG9mIGV4cGFuZGVkIG5vZGVzLlxuICAgIGNvbnN0IGxvYWRlZENoaWxkc0J5SWRSZWYgPSB1c2VSZWY8TWFwPHN0cmluZywgT2JqZWN0SXRlbT4+KG5ldyBNYXAoKSk7XG4gICAgY29uc3QgaW5pdGlhbGl6ZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gICAgY29uc3QgZ2V0RGF0YXNvdXJjZUZpbHRlciA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoaXRlbXM/OiBJdGVtVHlwZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAvLyByZXRyaWV2ZSBuZXcgZGF0YXNvdXJjZSBmb3IgYXJyYXkgb2YgaXRlbXNcbiAgICAgICAgICAgICAgICByZXR1cm4gb3IoLi4uaXRlbXMubWFwKGl0ZW0gPT4gZXF1YWxzKGFzc29jaWF0aW9uKHBhcmVudEFzc29jaWF0aW9uIS5pZCksIGxpdGVyYWwoaXRlbSkpKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcXVhbHMoYXNzb2NpYXRpb24ocGFyZW50QXNzb2NpYXRpb24hLmlkKSwgbGl0ZXJhbChpdGVtcz8uWzBdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFtwYXJlbnRBc3NvY2lhdGlvbl1cbiAgICApO1xuXG4gICAgY29uc3QgZ2V0RXhwYW5kZWRGaWx0ZXJJdGVtcyA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoKTogSXRlbVR5cGUgPT4gW3VuZGVmaW5lZCwgLi4ubG9hZGVkUGFyZW50c0J5SWRSZWYuY3VycmVudC52YWx1ZXMoKSwgLi4ubG9hZGVkQ2hpbGRzQnlJZFJlZi5jdXJyZW50LnZhbHVlcygpXSxcbiAgICAgICAgW11cbiAgICApO1xuXG4gICAgY29uc3QgYXBwZW5kSXRlbXMgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKG5ld0l0ZW06IE9iamVjdEl0ZW0sIGNoaWxkcmVuPzogT2JqZWN0SXRlbVtdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRJZCA9IGdldEl0ZW1JZChuZXdJdGVtKTtcblxuICAgICAgICAgICAgaWYgKGxvYWRlZFBhcmVudHNCeUlkUmVmLmN1cnJlbnQuaGFzKHBhcmVudElkKSkge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGRJZCA9IGdldEl0ZW1JZChjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWxsIGV4cGFuZGVkIG5vZGUncyBjaGlsZHJlbiBJZCwgaW4gb3JkZXIgdG8gcHJlLWxvYWQgdGhlbVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpcyBuZWVkZWQgdG8gYmUgYWJsZSB0byBrbm93IGlmIGEgbm9kZSBoYXMgZnVydGhlciBsZXZlbCBjaGlsZHJlbiBiZWZvcmUgZXhwYW5kaW5nIGl0LlxuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVkQ2hpbGRzQnlJZFJlZi5jdXJyZW50LnNldChjaGlsZElkLCBjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBuZXcgaXRlbSBpcyBhbHJlYWR5IGluIGxvYWRlZENoaWxkcyxcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgbWVhbnMgdGhhdCBpdCB3YXMgcHJlLWxvYWRlZCBhcyBhIGNoaWxkIG9mIGFuIGV4cGFuZGVkIG5vZGUsXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIG5lZWQgdG8gbW92ZSBpdCB0byBsb2FkZWRQYXJlbnRzXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2FkZWRDaGlsZHNCeUlkUmVmLmN1cnJlbnQuaGFzKHBhcmVudElkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9hZGVkUGFyZW50c0J5SWRSZWYuY3VycmVudC5zZXQocGFyZW50SWQsIGxvYWRlZENoaWxkc0J5SWRSZWYuY3VycmVudC5nZXQocGFyZW50SWQpISk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkZWRDaGlsZHNCeUlkUmVmLmN1cnJlbnQuZGVsZXRlKHBhcmVudElkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYWRlZFBhcmVudHNCeUlkUmVmLmN1cnJlbnQuc2V0KHBhcmVudElkLCBuZXdJdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9hZGVkUGFyZW50c0J5SWRSZWYuY3VycmVudC5zZXQocGFyZW50SWQsIG5ld0l0ZW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhc291cmNlLnNldEZpbHRlcihnZXREYXRhc291cmNlRmlsdGVyKGdldEV4cGFuZGVkRmlsdGVySXRlbXMoKSkpO1xuICAgICAgICB9LFxuICAgICAgICBbZGF0YXNvdXJjZSwgZ2V0RGF0YXNvdXJjZUZpbHRlciwgZ2V0RXhwYW5kZWRGaWx0ZXJJdGVtc11cbiAgICApO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgaWYgKGluaXRpYWxpemVkUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vIGFmdGVyIHRoZSBmaXJzdCBsb2FkIG9mIHRoZSBkYXRhc291cmNlLFxuICAgICAgICAgICAgLy8gd2Ugd2FudCB0byBwcmUtbG9hZCB0aGUgY2hpbGQgbm9kZXMgb2Ygcm9vdHNcbiAgICAgICAgICAgIGlmIChsb2FkZWRQYXJlbnRzQnlJZFJlZi5jdXJyZW50LnNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRhc291cmNlLml0ZW1zPy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnRJZCA9IGdldEl0ZW1JZChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVkUGFyZW50c0J5SWRSZWYuY3VycmVudC5zZXQocGFyZW50SWQsIGl0ZW0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRhdGFzb3VyY2Uuc2V0RmlsdGVyKGdldERhdGFzb3VyY2VGaWx0ZXIoZ2V0RXhwYW5kZWRGaWx0ZXJJdGVtcygpKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGluaXRpYWxpemVkUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICBsb2FkZWRQYXJlbnRzQnlJZFJlZi5jdXJyZW50LmNsZWFyKCk7XG5cbiAgICAgICAgLy8gd2hlbiBkYXRhc291cmNlIGlzIGxvYWRlZCBmb3IgdGhlIGZpcnN0IHRpbWUsIHdlIHdhbnQgdG8gbG9hZCBvbmx5IHRoZSByb290IG5vZGVzIChub2RlcyB3aXRob3V0IHBhcmVudClcbiAgICAgICAgLy8gaWYgc3RhcnRFeHBhbmRlZCBpcyBmYWxzZSwgb3RoZXJ3aXNlIHdlIHdhbnQgdG8gbG9hZCBhbGwgbm9kZXNcbiAgICAgICAgaWYgKCFzdGFydEV4cGFuZGVkKSB7XG4gICAgICAgICAgICBkYXRhc291cmNlLnNldEZpbHRlcihnZXREYXRhc291cmNlRmlsdGVyKFt1bmRlZmluZWRdKSk7XG4gICAgICAgIH1cbiAgICB9LCBbZGF0YXNvdXJjZSwgZ2V0RGF0YXNvdXJjZUZpbHRlciwgZ2V0RXhwYW5kZWRGaWx0ZXJJdGVtcywgc3RhcnRFeHBhbmRlZF0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgaXRlbXM6IGRhdGFzb3VyY2UuaXRlbXMsXG4gICAgICAgIGFwcGVuZEl0ZW1zXG4gICAgfTtcbn1cbiIsImltcG9ydCBjbGFzc05hbWVzIGZyb20gXCJjbGFzc25hbWVzXCI7XG5pbXBvcnQgeyBWYWx1ZVN0YXR1cyB9IGZyb20gXCJtZW5kaXhcIjtcbmltcG9ydCB7IFJlYWN0RWxlbWVudCwgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVN0YXRlLCBLZXlib2FyZEV2ZW50LCBGcmFnbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFwiLi91aS9UcmVlTm9kZVYyLnNjc3NcIjtcbmltcG9ydCB7IHJlbmRlclRyZWVOb2RlSGVhZGVySWNvbiwgVHJlZU5vZGVIZWFkZXJJY29uIH0gZnJvbSBcIi4uL2NvbW1vbi9IZWFkZXJJY29uXCI7XG5pbXBvcnQgeyBUcmVlTm9kZVN0YXRlIH0gZnJvbSBcIi4uL2NvbW1vbi9UcmVlTm9kZVN0YXRlXCI7XG5pbXBvcnQgeyBvbktleURvd25IYW5kbGVyIH0gZnJvbSBcIi4vaG9va3MvaGVscGVyc1wiO1xuaW1wb3J0IHsgdXNlSW5jcmVtZW50YWxUcmVlRGF0YSwgVHJlZU5vZGVWMkRhdGFJdGVtIH0gZnJvbSBcIi4vaG9va3MvdXNlSW5jcmVtZW50YWxUcmVlRGF0YVwiO1xuaW1wb3J0IHsgdXNlSW5maW5pdGVUcmVlTm9kZXMgfSBmcm9tIFwiLi9ob29rcy91c2VJbmZpbml0ZVRyZWVOb2RlXCI7XG5pbXBvcnQgeyBUcmVlTm9kZUNvbnRhaW5lclByb3BzIH0gZnJvbSBcIi4uLy4uLy4uL3R5cGluZ3MvVHJlZU5vZGVQcm9wc1wiO1xuXG5mdW5jdGlvbiByZW5kZXJSZWN1cnNpdmVOb2RlKFxuICAgIG5vZGU6IFRyZWVOb2RlVjJEYXRhSXRlbSxcbiAgICByZW5kZXJIZWFkZXJJY29uOiBUcmVlTm9kZUhlYWRlckljb24sXG4gICAgaWNvblBsYWNlbWVudDogVHJlZU5vZGVDb250YWluZXJQcm9wc1tcInNob3dJY29uXCJdLFxuICAgIG9wZW5Ob2RlT246IFRyZWVOb2RlQ29udGFpbmVyUHJvcHNbXCJvcGVuTm9kZU9uXCJdLFxuICAgIG9uTm9kZUNsaWNrOiAobm9kZTogVHJlZU5vZGVWMkRhdGFJdGVtKSA9PiB2b2lkLFxuICAgIGNoaWxkcmVuPzogVHJlZU5vZGVDb250YWluZXJQcm9wc1tcImNoaWxkcmVuXCJdXG4pOiBSZWFjdEVsZW1lbnQge1xuICAgIGNvbnN0IGhhc0NoaWxkcmVuID0gbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGlzRXhwYW5kZWQgPSBub2RlLnRyZWVOb2RlU3RhdGUgPT09IFRyZWVOb2RlU3RhdGUuRVhQQU5ERUQ7XG4gICAgY29uc3QgaXNJY29uQ2xpY2thYmxlID0gb3Blbk5vZGVPbiA9PT0gXCJpY29uQ2xpY2tcIjtcbiAgICBjb25zdCBpc0hlYWRlckNsaWNrYWJsZSA9IG9wZW5Ob2RlT24gPT09IFwiaGVhZGVyQ2xpY2tcIjtcbiAgICBjb25zdCBvbkljb25DbGljayA9IGlzSWNvbkNsaWNrYWJsZSA/ICgpID0+IG9uTm9kZUNsaWNrKG5vZGUpIDogdW5kZWZpbmVkO1xuICAgIGNvbnN0IG9uSGVhZGVyQ2xpY2sgPSBpc0hlYWRlckNsaWNrYWJsZSA/ICgpID0+IG9uTm9kZUNsaWNrKG5vZGUpIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3Qgb25LZXlEb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50PEhUTUxMSUVsZW1lbnQ+KTogdm9pZCA9PiB7XG4gICAgICAgIG9uS2V5RG93bkhhbmRsZXI8VHJlZU5vZGVWMkRhdGFJdGVtPihldmVudCwgaGFzQ2hpbGRyZW4sIGlzRXhwYW5kZWQsIG9uTm9kZUNsaWNrLCBub2RlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGxpXG4gICAgICAgICAgICBrZXk9e25vZGUuaWR9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3aWRnZXQtdHJlZS1ub2RlLWJyYW5jaFwiXG4gICAgICAgICAgICByb2xlPVwidHJlZWl0ZW1cIlxuICAgICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtoYXNDaGlsZHJlbiA/IGlzRXhwYW5kZWQgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICBvbktleURvd249e29uS2V5RG93bn1cbiAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ3aWRnZXQtdHJlZS1ub2RlLWJyYW5jaC1oZWFkZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICBcIndpZGdldC10cmVlLW5vZGUtYnJhbmNoLWhlYWRlci1yZXZlcnNlZFwiOiBpY29uUGxhY2VtZW50ID09PSBcImxlZnRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ3aWRnZXQtdHJlZS1ub2RlLWJyYW5jaC1oZWFkZXItY2xpY2thYmxlXCI6IGhhc0NoaWxkcmVuICYmIGlzSGVhZGVyQ2xpY2thYmxlXG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgaWQ9e2Ake25vZGUuaWR9VHJlZU5vZGVCcmFuY2hIZWFkZXJgfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uSGVhZGVyQ2xpY2t9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwid2lkZ2V0LXRyZWUtbm9kZS1icmFuY2gtaGVhZGVyLXZhbHVlXCI+e25vZGUudGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIHsoaGFzQ2hpbGRyZW4gfHwgbm9kZS50cmVlTm9kZVN0YXRlID09PSBUcmVlTm9kZVN0YXRlLkxPQURJTkcpICYmIGljb25QbGFjZW1lbnQgIT09IFwibm9cIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ3aWRnZXQtdHJlZS1ub2RlLWJyYW5jaC1oZWFkZXItaWNvbi1jb250YWluZXJcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkZ2V0LXRyZWUtbm9kZS1icmFuY2gtaGVhZGVyLWNsaWNrYWJsZVwiOiBoYXNDaGlsZHJlbiAmJiBpc0ljb25DbGlja2FibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25JY29uQ2xpY2t9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtyZW5kZXJIZWFkZXJJY29uKG5vZGUudHJlZU5vZGVTdGF0ZSwgaWNvblBsYWNlbWVudCl9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAge2hhc0NoaWxkcmVuID8gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwid2lkZ2V0LXRyZWUtbm9kZS1ib2R5XCIsIFwid2lkZ2V0LXRyZWUtbm9kZS12Mi1ib2R5XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2lkZ2V0LXRyZWUtbm9kZS12Mi1ib2R5LWNvbGxhcHNlZFwiOiAhaXNFeHBhbmRlZFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake25vZGUuaWR9VHJlZU5vZGVCcmFuY2hCb2R5YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+e2NoaWxkcmVuPy5nZXQobm9kZS5pdGVtKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHVsIHJvbGU9XCJncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge25vZGUuY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RnJhZ21lbnQga2V5PXtjaGlsZC5pZH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVuZGVyUmVjdXJzaXZlTm9kZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJIZWFkZXJJY29uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb25QbGFjZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3Blbk5vZGVPbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk5vZGVDbGljayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPC9saT5cbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVHJlZU5vZGVWMihwcm9wczogVHJlZU5vZGVDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgY29uc3QgeyBpdGVtcywgYXBwZW5kSXRlbXMgfSA9IHVzZUluZmluaXRlVHJlZU5vZGVzKHByb3BzKTtcbiAgICBjb25zdCBbLCBmb3JjZVJlbmRlcl0gPSB1c2VTdGF0ZSgwKTtcblxuICAgIGNvbnN0IGV4cGFuZGVkSWNvbiA9IHByb3BzLmV4cGFuZGVkSWNvbj8uc3RhdHVzID09PSBWYWx1ZVN0YXR1cy5BdmFpbGFibGUgPyBwcm9wcy5leHBhbmRlZEljb24udmFsdWUgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgY29sbGFwc2VkSWNvbiA9IHByb3BzLmNvbGxhcHNlZEljb24/LnN0YXR1cyA9PT0gVmFsdWVTdGF0dXMuQXZhaWxhYmxlID8gcHJvcHMuY29sbGFwc2VkSWNvbi52YWx1ZSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBzaG93Q3VzdG9tSWNvbiA9IEJvb2xlYW4ocHJvcHMuZXhwYW5kZWRJY29uKSB8fCBCb29sZWFuKHByb3BzLmNvbGxhcHNlZEljb24pO1xuICAgIGNvbnN0IGljb25QbGFjZW1lbnQgPSBwcm9wcy5zaG93SWNvbjtcbiAgICBjb25zdCBhbmltYXRlSWNvbiA9IHByb3BzLmFuaW1hdGUgJiYgcHJvcHMuYW5pbWF0ZUljb247XG5cbiAgICBjb25zdCByZW5kZXJIZWFkZXJJY29uID0gdXNlTWVtbzxUcmVlTm9kZUhlYWRlckljb24+KFxuICAgICAgICAoKSA9PiAodHJlZU5vZGVTdGF0ZSwgcGxhY2VtZW50KSA9PlxuICAgICAgICAgICAgcmVuZGVyVHJlZU5vZGVIZWFkZXJJY29uKHRyZWVOb2RlU3RhdGUsIHBsYWNlbWVudCwge1xuICAgICAgICAgICAgICAgIGFuaW1hdGVJY29uLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZEljb24sXG4gICAgICAgICAgICAgICAgZXhwYW5kZWRJY29uLFxuICAgICAgICAgICAgICAgIHNob3dDdXN0b21JY29uXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgW2FuaW1hdGVJY29uLCBjb2xsYXBzZWRJY29uLCBleHBhbmRlZEljb24sIHNob3dDdXN0b21JY29uXVxuICAgICk7XG5cbiAgICBjb25zdCB0cmVlQ29uZmlnID0gdXNlTWVtbyhcbiAgICAgICAgKCkgPT4gKHtcbiAgICAgICAgICAgIGhlYWRlckNhcHRpb246IHByb3BzLmhlYWRlckNhcHRpb24sXG4gICAgICAgICAgICBoZWFkZXJDb250ZW50OiBwcm9wcy5oZWFkZXJDb250ZW50LFxuICAgICAgICAgICAgaGVhZGVyVHlwZTogcHJvcHMuaGVhZGVyVHlwZSxcbiAgICAgICAgICAgIHBhcmVudEFzc29jaWF0aW9uOiBwcm9wcy5wYXJlbnRBc3NvY2lhdGlvbixcbiAgICAgICAgICAgIHN0YXJ0RXhwYW5kZWQ6IHByb3BzLnN0YXJ0RXhwYW5kZWRcbiAgICAgICAgfSksXG4gICAgICAgIFtwcm9wcy5oZWFkZXJDYXB0aW9uLCBwcm9wcy5oZWFkZXJDb250ZW50LCBwcm9wcy5oZWFkZXJUeXBlLCBwcm9wcy5wYXJlbnRBc3NvY2lhdGlvbiwgcHJvcHMuc3RhcnRFeHBhbmRlZF1cbiAgICApO1xuXG4gICAgY29uc3QgdHJlZURhdGEgPSB1c2VJbmNyZW1lbnRhbFRyZWVEYXRhKGl0ZW1zLCB0cmVlQ29uZmlnKTtcbiAgICBjb25zdCBvbk5vZGVDbGljayA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAobm9kZTogVHJlZU5vZGVWMkRhdGFJdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZS50cmVlTm9kZVN0YXRlID09PSBUcmVlTm9kZVN0YXRlLkVYUEFOREVEKSB7XG4gICAgICAgICAgICAgICAgbm9kZS50cmVlTm9kZVN0YXRlID0gVHJlZU5vZGVTdGF0ZS5DT0xMQVBTRURfV0lUSF9DU1M7XG4gICAgICAgICAgICAgICAgZm9yY2VSZW5kZXIodmVyc2lvbiA9PiB2ZXJzaW9uICsgMSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub2RlLnRyZWVOb2RlU3RhdGUgPSBUcmVlTm9kZVN0YXRlLkVYUEFOREVEO1xuICAgICAgICAgICAgYXBwZW5kSXRlbXMoXG4gICAgICAgICAgICAgICAgbm9kZS5pdGVtLFxuICAgICAgICAgICAgICAgIG5vZGUuY2hpbGRyZW4ubWFwKGNoaWxkID0+IGNoaWxkLml0ZW0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZm9yY2VSZW5kZXIodmVyc2lvbiA9PiB2ZXJzaW9uICsgMSk7XG4gICAgICAgIH0sXG4gICAgICAgIFthcHBlbmRJdGVtc11cbiAgICApO1xuXG4gICAgaWYgKHRyZWVEYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ3aWRnZXQtdHJlZS1ub2RlXCIsIFwid2lkZ2V0LXRyZWUtbm9kZS12MlwiLCBwcm9wcy5jbGFzcyl9IHN0eWxlPXtwcm9wcy5zdHlsZX0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtdHJlZS1ub2RlLW5vLWRhdGFcIj57cHJvcHMubm9EYXRhTWVzc2FnZT8udmFsdWUgPz8gXCJObyBkYXRhIGF2YWlsYWJsZVwifTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPHVsXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ3aWRnZXQtdHJlZS1ub2RlXCIsIFwid2lkZ2V0LXRyZWUtbm9kZS12MlwiLCBwcm9wcy5jbGFzcyl9XG4gICAgICAgICAgICBzdHlsZT17cHJvcHMuc3R5bGV9XG4gICAgICAgICAgICBkYXRhLWZvY3VzaW5kZXg9e3Byb3BzLnRhYkluZGV4IHx8IDB9XG4gICAgICAgICAgICByb2xlPVwidHJlZVwiXG4gICAgICAgID5cbiAgICAgICAgICAgIHt0cmVlRGF0YS5tYXAobm9kZSA9PlxuICAgICAgICAgICAgICAgIHJlbmRlclJlY3Vyc2l2ZU5vZGUoXG4gICAgICAgICAgICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlckhlYWRlckljb24sXG4gICAgICAgICAgICAgICAgICAgIGljb25QbGFjZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgIHByb3BzLm9wZW5Ob2RlT24sXG4gICAgICAgICAgICAgICAgICAgIG9uTm9kZUNsaWNrLFxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5jaGlsZHJlblxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvdWw+XG4gICAgKTtcbn1cbiIsImltcG9ydCB7IFJlYWN0RWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgVHJlZU5vZGVDb250YWluZXJQcm9wcyB9IGZyb20gXCIuLi90eXBpbmdzL1RyZWVOb2RlUHJvcHNcIjtcbmltcG9ydCB7IFRyZWVOb2RlVjEgfSBmcm9tIFwiLi9jb21wb25lbnRzL3YxL1Jvb3RcIjtcbmltcG9ydCB7IFRyZWVOb2RlVjIgfSBmcm9tIFwiLi9jb21wb25lbnRzL3YyL1RyZWVOb2RlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBUcmVlTm9kZShwcm9wczogVHJlZU5vZGVDb250YWluZXJQcm9wcyk6IFJlYWN0RWxlbWVudCB7XG4gICAgaWYgKHByb3BzLnBhcmVudEFzc29jaWF0aW9uKSB7XG4gICAgICAgIHJldHVybiA8VHJlZU5vZGVWMiB7Li4ucHJvcHN9IC8+O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiA8VHJlZU5vZGVWMSB7Li4ucHJvcHN9IC8+O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJoYXNPd24iLCJoYXNPd25Qcm9wZXJ0eSIsImNsYXNzTmFtZXMiLCJjbGFzc2VzIiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsImFyZyIsImFwcGVuZENsYXNzIiwicGFyc2VWYWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsImFwcGx5IiwidG9TdHJpbmciLCJPYmplY3QiLCJwcm90b3R5cGUiLCJpbmNsdWRlcyIsImtleSIsImNhbGwiLCJ2YWx1ZSIsIm5ld0NsYXNzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJ3aW5kb3ciLCJfanN4cyIsIl9qc3giLCJUcmVlTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQTs7QUFFQyxFQUFBLENBQUEsWUFBWTs7QUFHWixJQUFBLElBQUlBLE1BQU0sR0FBRyxFQUFFLENBQUNDLGNBQWM7SUFFOUIsU0FBU0MsVUFBVUEsR0FBSTtNQUN0QixJQUFJQyxPQUFPLEdBQUcsRUFBRTtBQUVoQixNQUFBLEtBQUssSUFBSUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHQyxTQUFTLENBQUNDLE1BQU0sRUFBRUYsQ0FBQyxFQUFFLEVBQUU7QUFDMUMsUUFBQSxJQUFJRyxHQUFHLEdBQUdGLFNBQVMsQ0FBQ0QsQ0FBQyxDQUFDO1FBQ3RCLElBQUlHLEdBQUcsRUFBRTtVQUNSSixPQUFPLEdBQUdLLFdBQVcsQ0FBQ0wsT0FBTyxFQUFFTSxVQUFVLENBQUNGLEdBQUcsQ0FBQyxDQUFDO0FBQ2hELFFBQUE7QUFDRCxNQUFBO0FBRUEsTUFBQSxPQUFPSixPQUFPO0FBQ2YsSUFBQTtJQUVBLFNBQVNNLFVBQVVBLENBQUVGLEdBQUcsRUFBRTtNQUN6QixJQUFJLE9BQU9BLEdBQUcsS0FBSyxRQUFRLElBQUksT0FBT0EsR0FBRyxLQUFLLFFBQVEsRUFBRTtBQUN2RCxRQUFBLE9BQU9BLEdBQUc7QUFDWCxNQUFBO0FBRUEsTUFBQSxJQUFJLE9BQU9BLEdBQUcsS0FBSyxRQUFRLEVBQUU7QUFDNUIsUUFBQSxPQUFPLEVBQUU7QUFDVixNQUFBO0FBRUEsTUFBQSxJQUFJRyxLQUFLLENBQUNDLE9BQU8sQ0FBQ0osR0FBRyxDQUFDLEVBQUU7UUFDdkIsT0FBT0wsVUFBVSxDQUFDVSxLQUFLLENBQUMsSUFBSSxFQUFFTCxHQUFHLENBQUM7QUFDbkMsTUFBQTtNQUVBLElBQUlBLEdBQUcsQ0FBQ00sUUFBUSxLQUFLQyxNQUFNLENBQUNDLFNBQVMsQ0FBQ0YsUUFBUSxJQUFJLENBQUNOLEdBQUcsQ0FBQ00sUUFBUSxDQUFDQSxRQUFRLEVBQUUsQ0FBQ0csUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO0FBQ3JHLFFBQUEsT0FBT1QsR0FBRyxDQUFDTSxRQUFRLEVBQUU7QUFDdEIsTUFBQTtNQUVBLElBQUlWLE9BQU8sR0FBRyxFQUFFO0FBRWhCLE1BQUEsS0FBSyxJQUFJYyxHQUFHLElBQUlWLEdBQUcsRUFBRTtBQUNwQixRQUFBLElBQUlQLE1BQU0sQ0FBQ2tCLElBQUksQ0FBQ1gsR0FBRyxFQUFFVSxHQUFHLENBQUMsSUFBSVYsR0FBRyxDQUFDVSxHQUFHLENBQUMsRUFBRTtBQUN0Q2QsVUFBQUEsT0FBTyxHQUFHSyxXQUFXLENBQUNMLE9BQU8sRUFBRWMsR0FBRyxDQUFDO0FBQ3BDLFFBQUE7QUFDRCxNQUFBO0FBRUEsTUFBQSxPQUFPZCxPQUFPO0FBQ2YsSUFBQTtBQUVBLElBQUEsU0FBU0ssV0FBV0EsQ0FBRVcsS0FBSyxFQUFFQyxRQUFRLEVBQUU7TUFDdEMsSUFBSSxDQUFDQSxRQUFRLEVBQUU7QUFDZCxRQUFBLE9BQU9ELEtBQUs7QUFDYixNQUFBO01BRUEsSUFBSUEsS0FBSyxFQUFFO0FBQ1YsUUFBQSxPQUFPQSxLQUFLLEdBQUcsR0FBRyxHQUFHQyxRQUFRO0FBQzlCLE1BQUE7TUFFQSxPQUFPRCxLQUFLLEdBQUdDLFFBQVE7QUFDeEIsSUFBQTtJQUVBLElBQXFDQyxNQUFNLENBQUNDLE9BQU8sRUFBRTtNQUNwRHBCLFVBQVUsQ0FBQ3FCLE9BQU8sR0FBR3JCLFVBQVU7TUFDL0JtQixpQkFBaUJuQixVQUFVO0FBQzVCLElBQUEsQ0FBQyxNQUtNO01BQ05zQixNQUFNLENBQUN0QixVQUFVLEdBQUdBLFVBQVU7QUFDL0IsSUFBQTtBQUNELEVBQUEsQ0FBQyxHQUFFLENBQUE7Ozs7Ozs7O0FDckVILE1BQU0sd0JBQXdCLEdBQThDO0FBQ3hFLElBQUEsS0FBSyxFQUFFLE9BQU87QUFDZCxJQUFBLEdBQUcsRUFBRSxPQUFPO0FBQ1osSUFBQSxJQUFJLEVBQUUsTUFBTTtBQUNaLElBQUEsR0FBRyxFQUFFLEtBQUs7QUFDVixJQUFBLE9BQU8sRUFBRSxTQUFTO0FBQ2xCLElBQUEsU0FBUyxFQUFFLFdBQVc7QUFDdEIsSUFBQSxTQUFTLEVBQUUsV0FBVztBQUN0QixJQUFBLFVBQVUsRUFBRTtDQUNmO0FBRUQsU0FBUyxrQkFBa0IsQ0FBQyxHQUFXLEVBQUE7SUFDbkMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLHdCQUF3QixFQUFFLEdBQUcsQ0FBQztBQUN2RDtBQUVBLFNBQVMsdUJBQXVCLENBQUMsS0FBcUIsRUFBQTtBQUNsRCxJQUFBLE9BQU8sS0FBSyxDQUFDLGFBQWEsS0FBSyxLQUFLLENBQUMsTUFBTTtBQUMvQztBQU1PLE1BQU0sa0JBQWtCLEdBQXdCLFdBQVcsSUFBRztBQUNqRSxJQUFBLE9BQU8sV0FBVyxDQUNkLEtBQUssSUFBRztBQUNKLFFBQUEsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2pDO1FBQ0o7QUFDQSxRQUFBLElBQUksa0JBQWtCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbEUsSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDWjtZQUNKO1lBQ0EsS0FBSyxDQUFDLGVBQWUsRUFBRTtZQUN2QixLQUFLLENBQUMsY0FBYyxFQUFFO1lBQ3RCLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDcEI7QUFDSixJQUFBLENBQUMsRUFDRCxDQUFDLFdBQVcsQ0FBQyxDQUNoQjtBQUNMLENBQUM7O0FDaENNLE1BQU0sNkJBQTZCLEdBQUcsTUFBaUM7SUFDMUUsT0FBTyxXQUFXLENBQUMsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxLQUFJO0FBQ3BFLFFBQUEsSUFBSSxhQUFhLElBQUksYUFBYSxZQUFZLE9BQU8sRUFBRTtBQUNuRCxZQUFBLE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxFQUE2QixLQUFtQjtnQkFDakYsSUFBSSxFQUFFLEVBQUU7QUFDSixvQkFBQSxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBYyw0QkFBNEIsQ0FBQyxDQUFDO0FBQzlGLG9CQUFBLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLDBDQUEwQyxDQUFDLENBQUM7b0JBQ2hHLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xHO0FBQ0EsZ0JBQUEsT0FBTyxFQUFFO0FBQ2IsWUFBQSxDQUFDO0FBRUQsWUFBQSxNQUFNLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ25DLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsOEJBQThCLENBQUMsQ0FDakUsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFbEQsSUFBSSxDQUFDLG9CQUFvQixFQUFFO2dCQUN2QjtZQUNKO0FBRUEsWUFBQSxNQUFNLGtCQUFrQixHQUFHLDJCQUEyQixDQUFDLG9CQUFvQixDQUFDO0FBRTVFLFlBQUEsTUFBTSwwQkFBMEIsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNO0FBQzVELFlBQUEsSUFBSSwwQkFBMEIsS0FBSyxDQUFDLEVBQUU7Z0JBQ2xDO1lBQ0o7QUFFQSxZQUFBLE1BQU0sa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRW5HLFFBQVEsaUJBQWlCO0FBQ3JCLGdCQUFBLEtBQUEsT0FBQTtBQUNJLG9CQUFBLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtvQkFDN0I7QUFDSixnQkFBQSxLQUFBLE1BQUE7b0JBQ0ksa0JBQWtCLENBQUMsMEJBQTBCLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO29CQUMxRDtnQkFDSixLQUFBLFVBQUEsbUNBQWlDO0FBQzdCLG9CQUFBLElBQUksY0FBYyxLQUFLLFVBQVUsRUFBRTt3QkFDL0IsTUFBTSxxQkFBcUIsR0FBRywyQkFBMkIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUMzRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUNqRDtBQUNELHdCQUFBLElBQUkscUJBQXFCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDbEMscUJBQXFCLENBQUMscUJBQXFCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTt3QkFDbkU7d0JBQ0E7b0JBQ0o7QUFDQSxvQkFBQSxNQUFNLGNBQWMsR0FBRyxrQkFBa0IsR0FBRyxDQUFDO29CQUM3QyxNQUFNLHVCQUF1QixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztBQUMzRCxvQkFBQSxJQUFJLHVCQUF1QixLQUFLLGtCQUFrQixFQUFFO0FBQ2hELHdCQUFBLGtCQUFrQixDQUFDLHVCQUF1QixDQUFDLENBQUMsS0FBSyxFQUFFO29CQUN2RDtvQkFDQTtnQkFDSjtnQkFDQSxLQUFBLE1BQUEsK0JBQTZCO0FBQ3pCLG9CQUFBLElBQUksY0FBYyxLQUFLLFVBQVUsRUFBRTt3QkFDL0IsTUFBTSxvQkFBb0IsR0FBRywyQkFBMkIsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7QUFDeEYsd0JBQUEsSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ2pDLDRCQUFBLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTt3QkFDbkM7d0JBQ0E7b0JBQ0o7QUFDQSxvQkFBQSxNQUFNLGNBQWMsR0FBRyxrQkFBa0IsR0FBRyxDQUFDO0FBQzdDLG9CQUFBLE1BQU0sdUJBQXVCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCLEdBQUcsQ0FBQyxDQUFDO0FBQ3hGLG9CQUFBLElBQUksdUJBQXVCLEtBQUssa0JBQWtCLEVBQUU7QUFDaEQsd0JBQUEsa0JBQWtCLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxLQUFLLEVBQUU7b0JBQ3ZEO29CQUNBO2dCQUNKOztRQUVSO0lBQ0osQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNWLENBQUM7QUFFTSxNQUFNLGdDQUFnQyxHQUFHLENBQzVDLHFCQUFnRSxFQUNoRSxXQUF1QyxFQUN2QyxhQUE0QixFQUM1QixnQkFBeUIsRUFDekIsNkJBQThFLEtBQzdDO0FBQ2pDLElBQUEsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUN2QixPQUFPO0FBQ0gsUUFBQSxLQUFLLEVBQUUscUJBQXFCO0FBQzVCLFFBQUEsS0FBSyxFQUFFLHFCQUFxQjtRQUM1QixJQUFJLEVBQUUsS0FBSyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFBLE9BQUEsK0JBQTBCO1FBQ3hFLEdBQUcsRUFBRSxLQUFLLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUEsTUFBQSw4QkFBeUI7QUFDdEUsUUFBQSxPQUFPLEVBQUUsS0FBSyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFBLFVBQUEsbUNBQThCLFlBQVksQ0FBQztBQUM1RixRQUFBLFNBQVMsRUFBRSxLQUFLLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUEsTUFBQSwrQkFBMEIsWUFBWSxDQUFDO1FBQzFGLFVBQVUsRUFBRSxLQUFLLElBQUc7QUFDaEIsWUFBQSxJQUNJLGFBQWEsS0FBQSxvQkFBQTtnQkFDYixhQUFhLEtBQUEsbUJBQUEsd0NBQ2Y7Z0JBQ0UscUJBQXFCLENBQUMsS0FBSyxDQUFDO1lBQ2hDO0FBQU8saUJBQUEsSUFBSSxhQUFhLEtBQUEsVUFBQSxpQ0FBK0IsZ0JBQWdCLEVBQUU7QUFDckUsZ0JBQUEsV0FBVyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUEsTUFBQSwrQkFBMEIsVUFBVSxDQUFDO1lBQ3hFO1FBQ0osQ0FBQztRQUNELFNBQVMsRUFBRSxLQUFLLElBQUc7QUFDZixZQUFBLElBQ0ksYUFBYSxLQUFBLG9CQUFBO0FBQ2IsZ0JBQUEsYUFBYSxLQUFBLG1CQUFBO0FBQ2IsZ0JBQUEsZ0JBQWdCLEVBQ2xCO0FBQ0UsZ0JBQUEsV0FBVyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUEsVUFBQSxtQ0FBOEIsVUFBVSxDQUFDO1lBQzVFO2lCQUFPLElBQUksYUFBYSxLQUFBLFVBQUEsK0JBQTZCO2dCQUNqRCxxQkFBcUIsQ0FBQyxLQUFLLENBQUM7WUFDaEM7UUFDSjtLQUNILENBQUMsRUFDRixDQUFDLHFCQUFxQixFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsQ0FDeEU7QUFFRCxJQUFBLE1BQU0sZUFBZSxHQUFHLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztBQUV2RCxJQUFBLE9BQU8sV0FBVyxDQUNkLEtBQUssSUFBRztBQUNKLFFBQUEsSUFBSSw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN0QztRQUNKO0FBQ0EsUUFBQSxPQUFPLGVBQWUsQ0FBQyxLQUFLLENBQUM7QUFDakMsSUFBQSxDQUFDLEVBQ0QsQ0FBQyw2QkFBNkIsRUFBRSxlQUFlLENBQUMsQ0FDbkQ7QUFDTCxDQUFDOztTQ3hJZSxjQUFjLEdBQUE7O0lBRTFCLE1BQU0sQ0FBQyxlQUFlLEVBQUUsa0JBQWtCLENBQUMsR0FBRyxRQUFRLENBQWtCLElBQUksQ0FBQztBQUM3RSxJQUFBLE1BQU0scUJBQXFCLEdBQUcsV0FBVyxDQUFDLENBQUMsSUFBcUIsS0FBSTtRQUNoRSxJQUFJLElBQUksRUFBRTtZQUNOLGtCQUFrQixDQUFDLElBQUksQ0FBQztRQUM1QjtJQUNKLENBQUMsRUFBRSxFQUFFLENBQUM7QUFFTixJQUFBLE9BQU8sQ0FBQyxlQUFlLEVBQUUscUJBQXFCLENBQUM7QUFDbkQ7O0FDVE8sTUFBTSxzQkFBc0IsR0FBRyxDQUNsQyxrQkFBb0QsS0FHcEQ7SUFDQSxNQUFNLGlCQUFpQixHQUFHLFdBQVcsQ0FDakMsTUFBTSxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLElBQUksRUFDbEcsRUFBRSxDQUNMO0lBRUQsT0FBTyxFQUFFLGlCQUFpQixFQUFFO0FBQ2hDLENBQUM7O0FDZk0sTUFBTSxnQ0FBZ0MsR0FBRyxDQUM1QyxrQkFBb0QsS0FNcEQ7QUFDQSxJQUFBLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFTLFNBQVMsQ0FBQztJQUN0RCxNQUFNLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxHQUFHLFFBQVEsQ0FBVSxLQUFLLENBQUM7QUFFOUQsSUFBQSxNQUFNLG9CQUFvQixHQUFHLFdBQVcsQ0FBQyxNQUFLO0FBQzFDLFFBQUEsb0JBQW9CLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDO0lBQ2xHLENBQUMsRUFBRSxFQUFFLENBQUM7QUFFTixJQUFBLE1BQU0sc0JBQXNCLEdBQUcsV0FBVyxDQUFDLE1BQUs7UUFDNUMsSUFDSSxrQkFBa0IsQ0FBQyxPQUFPO1lBQzFCLG9CQUFvQixDQUFDLE9BQU8sS0FBSyxTQUFTO1lBQzFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsRUFDN0M7WUFDRSxNQUFNLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLE1BQU07WUFDbEYsSUFBSSxnQkFBZ0IsR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO2dCQUN2RCxjQUFjLENBQUMsSUFBSSxDQUFDO0FBQ3BCLGdCQUFBLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUEsRUFBRyxvQkFBb0IsQ0FBQyxPQUFPLENBQUEsRUFBQSxDQUFJO0FBQzdFLGdCQUFBLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFLO29CQUM1QixrQkFBa0IsQ0FBQyxPQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFBLEVBQUcsZ0JBQWdCLENBQUEsRUFBQSxDQUFJO0FBQ2xFLG9CQUFBLG9CQUFvQixDQUFDLE9BQU8sR0FBRyxnQkFBZ0I7Z0JBQ25ELENBQUMsRUFBRSxDQUFDLENBQUM7QUFDTCxnQkFBQSxPQUFPLE1BQU0sWUFBWSxDQUFDLE9BQU8sQ0FBQztZQUN0QztRQUNKO0lBQ0osQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUVOLElBQUEsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsTUFBSztRQUN0QyxjQUFjLENBQUMsS0FBSyxDQUFDO1FBQ3JCLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQztJQUM5RCxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBRU4sT0FBTyxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxnQkFBZ0IsRUFBRTtBQUMxRixDQUFDOztBQ25DTSxNQUFNLHFCQUFxQixHQUFHLGFBQWEsQ0FBNkI7QUFDM0UsSUFBQSxLQUFLLEVBQUUsQ0FBQztBQUNSLElBQUEsd0JBQXdCLEVBQUUsTUFBTTtBQUNuQyxDQUFBLENBQUM7QUFFSyxNQUFNLGtDQUFrQyxHQUFHLENBQzlDLGFBQXFCLEVBQ3JCLHdCQUF1QyxLQUNqQztJQUNOLE1BQU0sRUFBRSxLQUFLLEVBQUUsd0JBQXdCLEVBQUUsR0FBRyxVQUFVLENBQUMscUJBQXFCLENBQUM7SUFFN0UsU0FBUyxDQUFDLE1BQUs7QUFDWCxRQUFBLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSx3QkFBd0IsRUFBRSxFQUFFO1lBQ3pDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQztRQUMzQztJQUNKLENBQUMsRUFBRSxDQUFDLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztBQUNsRixDQUFDOztBQ2dCTSxNQUFNLG1CQUFtQixHQUFHO0FBQy9CLElBQUEsYUFBYSxFQUFFLHVCQUF1QjtJQUN0QyxXQUFXLEVBQUUsQ0FBQyxFQUFzQixLQUFLLENBQUEsRUFBRyxFQUFFLENBQUEsb0JBQUEsQ0FBc0I7SUFDcEUsU0FBUyxFQUFFLENBQUMsRUFBc0IsS0FBSyxDQUFBLEVBQUcsRUFBRSxDQUFBLGtCQUFBO0NBQy9DO0FBRUssU0FBVSxjQUFjLENBQUMsRUFDM0Isc0JBQXNCLEVBQUUsMEJBQTBCLEVBQ2xELFdBQVcsRUFDWCxRQUFRLEVBQ1IsYUFBYSxFQUNiLGFBQWEsRUFDYixFQUFFLEVBQ0YscUJBQXFCLEVBQ3JCLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNLLEVBQUE7SUFDbEIsTUFBTSxFQUFFLEtBQUssRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQztBQUV4RSxJQUFBLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFnQixJQUFJLENBQUM7QUFDckQsSUFBQSxNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBaUIsSUFBSSxDQUFDO0FBRXZELElBQUEsTUFBTSxDQUFDLGdCQUFnQixFQUFFLG1CQUFtQixDQUFDLEdBQUcsUUFBUSxDQUFVLHFCQUFxQixJQUFJLENBQUMsUUFBUSxDQUFDO0FBQ3JHLElBQUEsTUFBTSxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLFFBQVEsQ0FDOUMsYUFBYSxHQUFFLFVBQUEsZ0NBQXlCLG1CQUFBLHVDQUMzQztBQUVELElBQUEsTUFBTSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxzQkFBc0IsRUFBRSxnQkFBZ0IsRUFBRSxHQUNqRixnQ0FBZ0MsQ0FBQyxrQkFBa0IsQ0FBQztBQUV4RCxJQUFBLE1BQU0sd0JBQXdCLEdBQTJELGFBQWEsSUFBRztBQUNyRyxRQUFBLElBQUksYUFBYSxLQUFLLFNBQVMsRUFBRTtBQUM3QixZQUFBLGdCQUFnQixDQUFDLGFBQWEsSUFDMUIsYUFBYSxLQUFBLFNBQUEsK0JBQTRCLFVBQUEsZ0NBQTBCLGFBQWEsQ0FDbkY7WUFDRCxtQkFBbUIsQ0FBQyx1QkFBdUIsSUFBRztBQUMxQyxnQkFBQSxJQUFJLGFBQWEsS0FBSyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtBQUNqRCxvQkFBQSxPQUFPLElBQUk7Z0JBQ2Y7QUFBTyxxQkFBQSxJQUFJLGFBQWEsR0FBRyxDQUFDLElBQUksdUJBQXVCLEVBQUU7QUFDckQsb0JBQUEsT0FBTyxLQUFLO2dCQUNoQjtBQUNBLGdCQUFBLE9BQU8sdUJBQXVCO0FBQ2xDLFlBQUEsQ0FBQyxDQUFDO1FBQ047QUFDSixJQUFBLENBQUM7QUFFRCxJQUFBLE1BQU0sNkJBQTZCLEdBQUcsV0FBVyxDQUFrRCxLQUFLLElBQUc7QUFDdkcsUUFBQSxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBYztRQUNuQyxRQUNJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDOUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUMvRCxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDO0lBRXhFLENBQUMsRUFBRSxFQUFFLENBQUM7QUFFTixJQUFBLE1BQU0scUJBQXFCLEdBQUcsV0FBVyxDQUNyQyxLQUFLLElBQUc7QUFDSixRQUFBLElBQUksNkJBQTZCLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdEM7UUFDSjtRQUVBLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtBQUNuQixZQUFBLG9CQUFvQixFQUFFO1lBQ3RCLGdCQUFnQixDQUFDLGFBQWEsSUFBRztnQkFDN0IsSUFBSSxhQUFhLEtBQUEsU0FBQSw4QkFBNEI7O0FBRXpDLG9CQUFBLE9BQU8sYUFBYTtnQkFDeEI7Z0JBQ0EsSUFBSSxhQUFhLEtBQUEsbUJBQUEsd0NBQXNDO29CQUNuRCxPQUFBLFNBQUE7Z0JBQ0o7Z0JBQ0EsSUFBSSxhQUFhLEtBQUEsb0JBQUEseUNBQXVDO29CQUNwRCxPQUFBLFVBQUE7Z0JBQ0o7Z0JBQ0EsT0FBQSxvQkFBQTtBQUNKLFlBQUEsQ0FBQyxDQUFDO1FBQ047SUFDSixDQUFDLEVBQ0QsQ0FBQyxvQkFBb0IsRUFBRSw2QkFBNkIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUMxRTtBQUVELElBQUEsTUFBTSxlQUFlLEdBQUcsZ0NBQWdDLENBQ3BELHFCQUFxQixFQUNyQixXQUFXLEVBQ1gsYUFBYSxFQUNiLGdCQUFnQixFQUNoQiw2QkFBNkIsQ0FDaEM7QUFFRCxJQUFBLE1BQU0sMEJBQTBCLEdBQUcsNkJBQTZCLENBQUMsYUFBYSxLQUFBLFVBQUEsOEJBQTRCO0FBQzFHLElBQUEsTUFBTSxlQUFlLEdBQUcsVUFBVSxLQUFLLFdBQVc7QUFDbEQsSUFBQSxNQUFNLGlCQUFpQixHQUFHLFVBQVUsS0FBSyxhQUFhO0lBQ3RELE1BQU0sV0FBVyxHQUFHLGVBQWUsR0FBRyxxQkFBcUIsR0FBRyxTQUFTO0lBQ3ZFLE1BQU0sYUFBYSxHQUFHLGlCQUFpQixHQUFHLHFCQUFxQixHQUFHLFNBQVM7SUFDM0UsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsc0JBQXNCLENBQUMsa0JBQWtCLENBQUM7SUFFeEUsZUFBZSxDQUFDLE1BQUs7QUFDakIsUUFBQSxJQUFJLDBCQUEwQixJQUFJLGFBQWEsS0FBQSxTQUFBLDhCQUE0QjtBQUN2RSxZQUFBLE1BQU0sZ0JBQWdCLEdBQUcsc0JBQXNCLEVBQUU7WUFDakQsSUFBSSxnQkFBZ0IsRUFBRTtBQUNsQixnQkFBQSxPQUFPLGdCQUFnQjtZQUMzQjtRQUNKO0lBQ0osQ0FBQyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsMEJBQTBCLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFdkUsU0FBUyxDQUFDLE1BQUs7QUFDWCxRQUFBLG1CQUFtQixDQUFDLHFCQUFxQixJQUFJLENBQUMsUUFBUSxDQUFDO0FBQzNELElBQUEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFFckMsU0FBUyxDQUFDLE1BQUs7UUFDWCxJQUFJLGFBQWEsS0FBQSxTQUFBLDhCQUE0QjtBQUN6QyxZQUFBLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO0FBQ3RCLGdCQUFBLGdCQUFnQix5Q0FBd0I7WUFDNUM7UUFDSjtBQUNKLElBQUEsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFFdEMsUUFDSXVCLGFBQ0ksU0FBUyxFQUFDLHlCQUF5QixFQUNuQyxTQUFTLEVBQUUsZUFBZSxFQUMxQixHQUFHLEVBQUUsaUJBQWlCLEVBQUEsR0FDbEIsMEJBQTBCLEVBQUEsUUFBQSxFQUFBLENBRTlCQSxJQUFBLENBQUEsTUFBQSxFQUFBLEVBQ0ksU0FBUyxFQUFFLFVBQVUsQ0FBQyxnQ0FBZ0MsRUFBRTtBQUNwRCxvQkFBQSwwQ0FBMEMsRUFBRSxDQUFDLGdCQUFnQixJQUFJLGlCQUFpQjtvQkFDbEYseUNBQXlDLEVBQUUsYUFBYSxLQUFLO0FBQ2hFLGlCQUFBLENBQUMsRUFDRixFQUFFLEVBQUUsbUJBQW1CLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUN2QyxPQUFPLEVBQUUsYUFBYSxFQUFBLFFBQUEsRUFBQSxDQUV0QkMsR0FBQSxDQUFBLE1BQUEsRUFBQSxFQUFNLFNBQVMsRUFBQyxzQ0FBc0MsRUFBQSxRQUFBLEVBQUUsYUFBYSxHQUFRLEVBQzVFLENBQUMsZ0JBQWdCLElBQUksYUFBYSxLQUFLLElBQUksS0FDeENBLGNBQ0ksU0FBUyxFQUFFLFVBQVUsQ0FBQywrQ0FBK0MsRUFBRTtBQUNuRSw0QkFBQSwwQ0FBMEMsRUFBRSxDQUFDLGdCQUFnQixJQUFJO0FBQ3BFLHlCQUFBLENBQUMsRUFDRixPQUFPLEVBQUUsV0FBVyxZQUVuQixnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEVBQUEsQ0FDNUMsQ0FDVixDQUFBLEVBQUEsQ0FDRSxFQUNOLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLGFBQWEsS0FBQSxtQkFBQSwyQ0FBeUMsV0FBVyxNQUNyRkEsSUFBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUEsRUFDM0IsS0FBSyxFQUFFO29CQUNILEtBQUssRUFBRSxtQkFBbUIsR0FBRyxDQUFDO29CQUM5QjtpQkFDSCxFQUFBLFFBQUEsRUFFREEsR0FBQSxDQUFBLEtBQUEsRUFBQSxFQUNJLFNBQVMsRUFBRSxVQUFVLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFO0FBQ3JELHdCQUFBLGdDQUFnQyxFQUM1QixhQUFhLEtBQUEsb0JBQUEsMkNBQXlDLENBQUMsV0FBVzt3QkFDdEUsaUNBQWlDLEVBQUUsYUFBYSxLQUFBLFNBQUE7cUJBQ25ELENBQUMsRUFDRixFQUFFLEVBQUUsbUJBQW1CLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFBLGFBQUEsRUFDeEIsYUFBYSxLQUFBLFVBQUEsK0JBQzFCLEdBQUcsRUFBRSxrQkFBa0IsRUFDdkIsZUFBZSxFQUFFLGdCQUFnQixFQUFBLFFBQUEsRUFFaEMsUUFBUSxFQUFBLENBQ1AsRUFBQSxDQUN1QixDQUNwQyxDQUFBLEVBQUEsQ0FDQTtBQUViO0FBRUEsU0FBUyw2QkFBNkIsQ0FBQyxVQUFtQixFQUFBO0lBQ3RELE9BQU87QUFDSCxRQUFBLGVBQWUsRUFBRSxVQUFVO0FBQzNCLFFBQUEsSUFBSSxFQUFFLFVBQVU7QUFDaEIsUUFBQSxRQUFRLEVBQUU7S0FDYjtBQUNMOztBQ25OTyxNQUFNLFdBQVcsR0FBRyxDQUFDLEVBQUUsU0FBUyxFQUF5QixNQUM1REEsR0FBQSxDQUFBLEtBQUEsRUFBQSxFQUNJLFNBQVMsRUFBRSxTQUFTLEVBQUEsYUFBQSxFQUFBLElBQUEsRUFFcEIsS0FBSyxFQUFDLElBQUksRUFDVixNQUFNLEVBQUMsSUFBSSxFQUNYLE9BQU8sRUFBQyxXQUFXLEVBQ25CLEtBQUssRUFBQyw0QkFBNEIsRUFBQSxRQUFBLEVBRWxDQSxjQUFNLENBQUMsRUFBQyx3Z0NBQXdnQyxFQUFBLENBQUcsRUFBQSxDQUNqaEMsQ0FDVDtBQUVNLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBcUIsS0FBa0I7SUFDMUUsSUFBSSxXQUFXLEdBQUcsSUFBSTtJQUN0QixJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtBQUMvQixRQUFBLFdBQVcsR0FBRyxFQUFFLEdBQUcsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxxQ0FBcUMsQ0FBQyxFQUFFO0lBQzNHO0FBQ0EsSUFBQSxPQUFPQSxJQUFDLElBQUksRUFBQSxFQUFDLElBQUksRUFBRSxXQUFXLEdBQUk7QUFDdEMsQ0FBQzs7QUN4QkQsdUJBQWU7O1NDcUJDLHdCQUF3QixDQUNwQyxhQUE0QixFQUM1QixhQUEwQyxFQUMxQyxXQUF3QixFQUFBO0lBRXhCLElBQUksYUFBYSxLQUFBLFNBQUEsOEJBQTRCO0FBQ3pDLFFBQUEsT0FBT0EsR0FBQSxDQUFBLEtBQUEsRUFBQSxFQUFLLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUMsa0NBQWtDLEVBQUMsR0FBRyxFQUFDLEVBQUUsd0JBQWU7SUFDekc7SUFFQSxNQUFNLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsY0FBYyxFQUFFLEdBQUcsV0FBVztBQUNoRixJQUFBLE1BQU0sa0JBQWtCLEdBQUcsYUFBYSxLQUFBLFVBQUE7QUFFeEMsSUFBQSxPQUFPLGNBQWMsSUFDakJBLEdBQUEsQ0FBQyxnQkFBZ0IsRUFBQSxFQUFDLElBQUksRUFBRSxrQkFBa0IsR0FBRyxZQUFZLEdBQUcsYUFBYSxFQUFBLENBQUksS0FFN0VBLEdBQUEsQ0FBQyxXQUFXLElBQ1IsU0FBUyxFQUFFLFVBQVUsQ0FBQyxxQ0FBcUMsRUFBRTtBQUN6RCxZQUFBLDhDQUE4QyxFQUFFLFdBQVc7QUFDM0QsWUFBQSxvREFBb0QsRUFBRSxDQUFDLGtCQUFrQixJQUFJLGFBQWEsS0FBSyxNQUFNO0FBQ3JHLFlBQUEscURBQXFELEVBQUUsQ0FBQyxrQkFBa0IsSUFBSSxhQUFhLEtBQUs7U0FDbkcsQ0FBQyxFQUFBLENBQ0osQ0FDTDtBQUNMOztBQ1RNLFNBQVVDLFVBQVEsQ0FBQyxFQUNyQixLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQ0wsS0FBSyxFQUNMLGNBQWMsRUFDZCxhQUFhLEVBQ2IsYUFBYSxFQUNiLFlBQVksRUFDWixhQUFhLEVBQ2IsUUFBUSxFQUNSLFdBQVcsRUFDWCxzQkFBc0IsRUFDdEIsVUFBVSxFQUNFLEVBQUE7SUFDWixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDLHFCQUFxQixDQUFDO0lBQ25ELE1BQU0sQ0FBQyxlQUFlLEVBQUUscUJBQXFCLENBQUMsR0FBRyxjQUFjLEVBQUU7QUFFakUsSUFBQSxNQUFNLHdCQUF3QixHQUFHLFdBQVcsQ0FDeEMsQ0FBQyxhQUFhLEVBQUUsYUFBYSxLQUN6Qix3QkFBd0IsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFO1FBQ25ELFdBQVc7UUFDWCxhQUFhO1FBQ2IsWUFBWTtRQUNaO0tBQ0gsQ0FBQyxFQUNOLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQzdEO0FBRUQsSUFBQSxNQUFNLHVCQUF1QixHQUFHLFdBQVcsQ0FBQyxNQUFLO0FBQzdDLFFBQUEsT0FBTyxlQUFlLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSztBQUN6RyxJQUFBLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRXJCLGtDQUFrQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsdUJBQXVCLENBQUM7QUFFcEcsSUFBQSxNQUFNLCtCQUErQixHQUFHLDZCQUE2QixFQUFFO0FBRXZFLElBQUEsSUFBSSxLQUFLLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNoRSxRQUFBLE9BQU8sSUFBSTtJQUNmO0FBRUEsSUFBQSxRQUNJRCxHQUFBLENBQUEsSUFBQSxFQUFBLEVBQ0ksU0FBUyxFQUFFLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxTQUFTLENBQUMsRUFDcEQsS0FBSyxFQUFFLEtBQUssRUFDWixHQUFHLEVBQUUscUJBQXFCLHFCQUNULFFBQVEsSUFBSSxDQUFDLEVBQzlCLElBQUksRUFBRSxLQUFLLEtBQUssQ0FBQyxHQUFHLE1BQU0sR0FBRyxPQUFPLEVBQUEsUUFBQSxFQUVuQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztBQUNqQixZQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFHO2dCQUNiLE1BQU0sRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBRSxHQUFHLElBQUk7Z0JBQ3RFLFFBQ0lBLElBQUMsY0FBYyxFQUFBLEVBRVgsRUFBRSxFQUFFLEVBQUUsRUFDTixhQUFhLEVBQUUsYUFBYSxFQUM1QixxQkFBcUIsRUFBRSxxQkFBcUIsRUFDNUMsYUFBYSxFQUFFLGFBQWEsRUFDNUIsYUFBYSxFQUFFLGFBQWEsRUFDNUIsZ0JBQWdCLEVBQUUsd0JBQXdCLEVBQzFDLFdBQVcsRUFBRSwrQkFBK0IsRUFDNUMsc0JBQXNCLEVBQUUsc0JBQXNCLEVBQzlDLFVBQVUsRUFBRSxVQUFVLEVBQUEsUUFBQSxFQUVyQixXQUFXLEVBQUEsRUFYUCxFQUFFLENBWU07WUFFekIsQ0FBQyxDQUFDLEVBQUEsQ0FDTDtBQUViOztBQ25HQSxTQUFTLCtCQUErQixDQUFDLElBQWdCLEVBQUUsS0FBNkIsRUFBQTtJQUNwRixPQUFPO1FBQ0gsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQ1gsUUFBQSxhQUFhLEVBQ1QsS0FBSyxDQUFDLFVBQVUsS0FBSyxNQUFNLEdBQUcsS0FBSyxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN2RyxXQUFXLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3RDLFFBQUEscUJBQXFCLEVBQUUsS0FBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFLO0tBQ2pFO0FBQ0w7QUFFTSxTQUFVLFVBQVUsQ0FBQyxLQUE2QixFQUFBO0FBQ3BELElBQUEsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLEtBQUs7SUFDNUIsTUFBTSxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLFFBQVEsQ0FBMkMsRUFBRSxDQUFDO0lBRWhHLFNBQVMsQ0FBQyxNQUFLOztBQUVYLFFBQUEsSUFBSSxVQUFVLENBQUMsTUFBTSxLQUFBLFdBQUEsOEJBQTRCO1lBQzdDLElBQUksVUFBVSxDQUFDLEtBQUssSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUM3QyxnQkFBQSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksK0JBQStCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEc7aUJBQU87QUFDSCxnQkFBQSxnQkFBZ0IsQ0FBQztBQUNiLG9CQUFBLE9BQU8sRUFBRTtBQUNaLGlCQUFBLENBQUM7WUFDTjtRQUNKO0lBQ0osQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFekMsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksRUFBRSxNQUFNLCtDQUE2QixLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxTQUFTO0lBQ2hILE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLEVBQUUsTUFBTSwrQ0FBNkIsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEdBQUcsU0FBUztBQUVuSCxJQUFBLFFBQ0lBLEdBQUEsQ0FBQ0MsVUFBUSxJQUNMLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUNsQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFDbEIsS0FBSyxFQUFFLGFBQWEsRUFDcEIsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQ2xDLGNBQWMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQzNFLGFBQWEsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUM3QixZQUFZLEVBQUUsWUFBWSxFQUMxQixhQUFhLEVBQUUsYUFBYSxFQUM1QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFDeEIsV0FBVyxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLFdBQVcsRUFDL0Msc0JBQXNCLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFDckMsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUEsQ0FDOUI7QUFFVjs7QUMvQ00sU0FBVSxTQUFTLENBQUMsSUFBZ0IsRUFBQTtBQUN0QyxJQUFBLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDMUI7QUFFTSxTQUFVLFdBQVcsQ0FDdkIsSUFBZ0IsRUFDaEIsaUJBQThELEVBQUE7SUFFOUQsTUFBTSxZQUFZLEdBQUcsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUs7QUFDdkQsSUFBQSxPQUFPLFlBQVksRUFBRSxFQUFFLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLFNBQVM7QUFDakU7QUFFTSxTQUFVLFlBQVksQ0FBQyxJQUFnQixFQUFFLE1BQXFCLEVBQUE7QUFDaEUsSUFBQSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssTUFBTSxFQUFFO0FBQzlCLFFBQUEsT0FBTyxNQUFNLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQztJQUNuRTtBQUNBLElBQUEsT0FBTyxNQUFNLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQzdEO0FBRU0sU0FBVSxlQUFlLENBQUMsUUFBOEIsRUFBRSxJQUFtQixFQUFBO0lBQy9FLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDWCxRQUFBLE9BQU8sSUFBSTtJQUNmO0FBRUEsSUFBQSxRQUNJLFFBQVEsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLFVBQVU7QUFDdkMsUUFBQSxRQUFRLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxhQUFhO0FBQzdDLFFBQUEsUUFBUSxDQUFDLGFBQWEsS0FBSyxJQUFJLENBQUMsYUFBYTtBQUM3QyxRQUFBLFFBQVEsQ0FBQyxpQkFBaUIsS0FBSyxJQUFJLENBQUMsaUJBQWlCO0FBRTdEO0FBRU0sU0FBVSxnQkFBZ0IsQ0FDNUIsS0FBbUMsRUFDbkMsV0FBb0IsRUFDcEIsVUFBbUIsRUFDbkIsV0FBOEIsRUFDOUIsSUFBTyxFQUFBOztJQUdQLElBQUksS0FBSyxDQUFDLGFBQWEsS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ3RDO0lBQ0o7QUFFQSxJQUFBLFFBQVEsS0FBSyxDQUFDLEdBQUc7QUFDYixRQUFBLEtBQUssT0FBTztRQUNaLEtBQUssR0FBRztZQUNKLElBQUksV0FBVyxFQUFFO2dCQUNiLEtBQUssQ0FBQyxjQUFjLEVBQUU7Z0JBQ3RCLEtBQUssQ0FBQyxlQUFlLEVBQUU7Z0JBQ3ZCLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDckI7WUFDQTtBQUNKLFFBQUEsS0FBSyxZQUFZO1lBQ2IsSUFBSSxXQUFXLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDYixLQUFLLENBQUMsY0FBYyxFQUFFO29CQUN0QixLQUFLLENBQUMsZUFBZSxFQUFFO29CQUN2QixXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUNyQjtZQUNKO1lBQ0E7QUFDSixRQUFBLEtBQUssV0FBVztBQUNaLFlBQUEsSUFBSSxXQUFXLElBQUksVUFBVSxFQUFFO2dCQUMzQixLQUFLLENBQUMsY0FBYyxFQUFFO2dCQUN0QixLQUFLLENBQUMsZUFBZSxFQUFFO2dCQUN2QixXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3JCO1lBQ0E7O0FBRVo7O0FDbERNLFNBQVUsc0JBQXNCLENBQUMsS0FBK0IsRUFBRSxNQUFxQixFQUFBO0lBQ3pGLE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUF1QixFQUFFLENBQUM7QUFFbEUsSUFBQSxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQXVCLEVBQUUsQ0FBQztJQUNqRCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQWtDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDdkUsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQTZCLElBQUksR0FBRyxFQUFFLENBQUM7SUFDdEUsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFjLElBQUksR0FBRyxFQUFFLENBQUM7QUFDckQsSUFBQSxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBdUIsSUFBSSxDQUFDO0lBRTVELFNBQVMsQ0FBQyxNQUFLO0FBQ1gsUUFBQSxNQUFNLFdBQVcsR0FBRyxLQUFLLElBQUksRUFBRTtBQUMvQixRQUFBLE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxDQUFTLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFL0QsTUFBTSxrQkFBa0IsR0FDcEIsV0FBVyxDQUFDLElBQUksR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDOUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVoRSxNQUFNLGFBQWEsR0FBRyxlQUFlLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztBQUN4RSxRQUFBLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxNQUFNO0FBRWxDLFFBQUEsSUFBSSxhQUFhLElBQUksa0JBQWtCLEVBQUU7QUFDckMsWUFBQSxRQUFRLENBQUMsT0FBTyxHQUFHLEVBQUU7QUFDckIsWUFBQSxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtBQUM1QixZQUFBLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7UUFDcEM7QUFFQSxRQUFBLE1BQU0sMEJBQTBCLEdBQUcsQ0FBQyxNQUFjLEtBQVU7WUFDeEQsTUFBTSxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFFdEQsWUFBQSxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7Z0JBQ3pCO1lBQ0o7QUFFQSxZQUFBLElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtBQUNwQixnQkFBQSxRQUFRLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQztnQkFDdEU7WUFDSjtZQUVBLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQztZQUNsRCxJQUFJLE1BQU0sRUFBRTtBQUNSLGdCQUFBLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxFQUFFLEtBQUssTUFBTSxDQUFDO1lBQzFFO0FBQ0osUUFBQSxDQUFDO0FBRUQsUUFBQSxNQUFNLFNBQVMsR0FBRyxDQUFDLElBQXdCLEtBQVU7WUFDakQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTO1lBRXZGLElBQUksUUFBUSxFQUFFO2dCQUNWLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQztnQkFFakQsSUFBSSxNQUFNLEVBQUU7QUFDUixvQkFBQSxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLFFBQVEsRUFBRTt3QkFDcEQ7b0JBQ0o7QUFFQSxvQkFBQSwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0FBQ25DLG9CQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDMUIsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQztvQkFDL0M7Z0JBQ0o7WUFDSjtBQUVBLFlBQUEsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ2hEO1lBQ0o7QUFFQSxZQUFBLDBCQUEwQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7QUFDbkMsWUFBQSxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDM0IsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQztBQUMvQyxRQUFBLENBQUM7QUFFRCxRQUFBLEtBQUssTUFBTSxJQUFJLElBQUksV0FBVyxFQUFFO0FBQzVCLFlBQUEsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztZQUM5QixNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztZQUNoRSxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQztZQUU1QyxNQUFNLFlBQVksR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7O1lBRXJELElBQUksWUFBWSxFQUFFO0FBQ2QsZ0JBQUEsTUFBTSxhQUFhLEdBQUcsWUFBWSxDQUFDLFFBQVEsS0FBSyxZQUFZO0FBQzVELGdCQUFBLFlBQVksQ0FBQyxJQUFJLEdBQUcsSUFBSTtBQUN4QixnQkFBQSxZQUFZLENBQUMsUUFBUSxHQUFHLFlBQVk7QUFDcEMsZ0JBQUEsWUFBWSxDQUFDLEtBQUssR0FBRyxTQUFTO2dCQUU5QixJQUFJLGFBQWEsRUFBRTtvQkFDZixTQUFTLENBQUMsWUFBWSxDQUFDO2dCQUMzQjtBQUVBLGdCQUFBLElBQUksWUFBWSxDQUFDLGFBQWEsS0FBQSxTQUFBLDhCQUE0QjtBQUN0RCxvQkFBQSxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQzswQkFDL0IsVUFBQTtBQUNEO29CQUNKLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUM7Z0JBQ2xEO2dCQUNBO1lBQ0o7QUFFQSxZQUFBLE1BQU0sT0FBTyxHQUF1QjtBQUNoQyxnQkFBQSxRQUFRLEVBQUUsRUFBRTtBQUNaLGdCQUFBLEVBQUUsRUFBRSxNQUFNO2dCQUNWLElBQUk7QUFDSixnQkFBQSxRQUFRLEVBQUUsWUFBWTtBQUN0QixnQkFBQSxhQUFhLEVBQUEsU0FBQTtBQUNiLGdCQUFBLEtBQUssRUFBRTthQUNWO1lBQ0QsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQztZQUN6QyxTQUFTLENBQUMsT0FBTyxDQUFDOztZQUdsQixLQUFLLE1BQU0sU0FBUyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUU7QUFDbkQsZ0JBQUEsSUFBSSxTQUFTLENBQUMsUUFBUSxLQUFLLE1BQU0sSUFBSSxTQUFTLENBQUMsRUFBRSxLQUFLLE1BQU0sRUFBRTtvQkFDMUQsU0FBUyxDQUFDLFNBQVMsQ0FBQztnQkFDeEI7WUFDSjtRQUNKO0FBRUEsUUFBQSxjQUFjLENBQUMsT0FBTyxHQUFHLFdBQVc7UUFDcEMsV0FBVyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEMsSUFBQSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFFbkIsSUFBQSxPQUFPLFFBQVE7QUFDbkI7O0FDMUlNLFNBQVUsb0JBQW9CLENBQUMsS0FBNkIsRUFBQTtJQUk5RCxNQUFNLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLGFBQWEsRUFBRSxHQUFHLEtBQUs7O0lBRTlELE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUEwQixJQUFJLEdBQUcsRUFBRSxDQUFDOztJQUV2RSxNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBMEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN0RSxJQUFBLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFFcEMsSUFBQSxNQUFNLG1CQUFtQixHQUFHLFdBQVcsQ0FDbkMsQ0FBQyxLQUFnQixLQUFJO1FBQ2pCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztZQUUzQixPQUFPLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWtCLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RjthQUFPO0FBQ0gsWUFBQSxPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWtCLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFFO0FBQ0osSUFBQSxDQUFDLEVBQ0QsQ0FBQyxpQkFBaUIsQ0FBQyxDQUN0QjtBQUVELElBQUEsTUFBTSxzQkFBc0IsR0FBRyxXQUFXLENBQ3RDLE1BQWdCLENBQUMsU0FBUyxFQUFFLEdBQUcsb0JBQW9CLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQzlHLEVBQUUsQ0FDTDtJQUVELE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FDM0IsQ0FBQyxPQUFtQixFQUFFLFFBQXVCLEtBQUk7QUFDN0MsUUFBQSxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBRW5DLElBQUksb0JBQW9CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QyxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNqQyxnQkFBQSxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBRztBQUNyQixvQkFBQSxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDOzs7b0JBR2hDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQztBQUNuRCxnQkFBQSxDQUFDLENBQUM7Ozs7Z0JBS0YsSUFBSSxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQzNDLG9CQUFBLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFFLENBQUM7QUFDdEYsb0JBQUEsbUJBQW1CLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2hEO3FCQUFPO29CQUNILG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQztnQkFDdkQ7WUFDSjtRQUNKO2FBQU87WUFDSCxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUM7UUFDdkQ7UUFFQSxVQUFVLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDLEVBQ0QsQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsc0JBQXNCLENBQUMsQ0FDNUQ7SUFFRCxTQUFTLENBQUMsTUFBSztBQUNYLFFBQUEsSUFBSSxjQUFjLENBQUMsT0FBTyxFQUFFOzs7WUFHeEIsSUFBSSxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLENBQUMsRUFBRTtBQUN6QyxnQkFBQSxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUc7QUFDN0Isb0JBQUEsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztvQkFDaEMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO0FBQ3BELGdCQUFBLENBQUMsQ0FBQztnQkFDRixVQUFVLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQztZQUN2RTtZQUVBO1FBQ0o7QUFFQSxRQUFBLGNBQWMsQ0FBQyxPQUFPLEdBQUcsSUFBSTtBQUM3QixRQUFBLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7OztRQUlwQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2hCLFVBQVUsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzFEO0lBQ0osQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLG1CQUFtQixFQUFFLHNCQUFzQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRTVFLE9BQU87UUFDSCxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7UUFDdkI7S0FDSDtBQUNMOztBQ3RGQSxTQUFTLG1CQUFtQixDQUN4QixJQUF3QixFQUN4QixnQkFBb0MsRUFDcEMsYUFBaUQsRUFDakQsVUFBZ0QsRUFDaEQsV0FBK0MsRUFDL0MsUUFBNkMsRUFBQTtJQUU3QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQzVDLElBQUEsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWE7QUFDckMsSUFBQSxNQUFNLGVBQWUsR0FBRyxVQUFVLEtBQUssV0FBVztBQUNsRCxJQUFBLE1BQU0saUJBQWlCLEdBQUcsVUFBVSxLQUFLLGFBQWE7QUFDdEQsSUFBQSxNQUFNLFdBQVcsR0FBRyxlQUFlLEdBQUcsTUFBTSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUztBQUN6RSxJQUFBLE1BQU0sYUFBYSxHQUFHLGlCQUFpQixHQUFHLE1BQU0sV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVM7QUFFN0UsSUFBQSxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQW1DLEtBQVU7UUFDNUQsZ0JBQWdCLENBQXFCLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUM7QUFDM0YsSUFBQSxDQUFDO0FBRUQsSUFBQSxRQUNJRixJQUFBLENBQUEsSUFBQSxFQUFBLEVBRUksU0FBUyxFQUFDLHlCQUF5QixFQUNuQyxJQUFJLEVBQUMsVUFBVSxFQUNmLFFBQVEsRUFBRSxDQUFDLEVBQUEsZUFBQSxFQUNJLFdBQVcsR0FBRyxVQUFVLEdBQUcsU0FBUyxFQUNuRCxTQUFTLEVBQUUsU0FBUyxFQUFBLFFBQUEsRUFBQSxDQUVwQkEsZUFDSSxTQUFTLEVBQUUsVUFBVSxDQUFDLGdDQUFnQyxFQUFFO29CQUNwRCx5Q0FBeUMsRUFBRSxhQUFhLEtBQUssTUFBTTtvQkFDbkUsMENBQTBDLEVBQUUsV0FBVyxJQUFJO0FBQzlELGlCQUFBLENBQUMsRUFDRixFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFBLG9CQUFBLENBQXNCLEVBQ3BDLE9BQU8sRUFBRSxhQUFhLGFBRXRCQyxHQUFBLENBQUEsTUFBQSxFQUFBLEVBQU0sU0FBUyxFQUFDLHNDQUFzQyxFQUFBLFFBQUEsRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFRLEVBQ3pFLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUEsU0FBQSxpQ0FBK0IsYUFBYSxLQUFLLElBQUksS0FDcEZBLEdBQUEsQ0FBQSxNQUFBLEVBQUEsRUFDSSxTQUFTLEVBQUUsVUFBVSxDQUFDLCtDQUErQyxFQUFFOzRCQUNuRSwwQ0FBMEMsRUFBRSxXQUFXLElBQUk7QUFDOUQseUJBQUEsQ0FBQyxFQUNGLE9BQU8sRUFBRSxXQUFXLEVBQUEsUUFBQSxFQUVuQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxFQUFBLENBQ2pELENBQ1YsQ0FBQSxFQUFBLENBQ0UsRUFDTixXQUFXLElBQ1JELElBQUEsQ0FBQSxLQUFBLEVBQUEsRUFDSSxTQUFTLEVBQUUsVUFBVSxDQUFDLHVCQUF1QixFQUFFLDBCQUEwQixFQUFFO29CQUN2RSxvQ0FBb0MsRUFBRSxDQUFDO0FBQzFDLGlCQUFBLENBQUMsRUFDRixFQUFFLEVBQUUsQ0FBQSxFQUFHLElBQUksQ0FBQyxFQUFFLENBQUEsa0JBQUEsQ0FBb0IsRUFBQSxRQUFBLEVBQUEsQ0FFbENDLEdBQUEsQ0FBQSxLQUFBLEVBQUEsRUFBQSxRQUFBLEVBQU0sUUFBUSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUEsQ0FBTyxFQUNyQ0EsR0FBQSxDQUFBLElBQUEsRUFBQSxFQUFJLElBQUksRUFBQyxPQUFPLEVBQUEsUUFBQSxFQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBRzs0QkFDdkIsUUFDSUEsR0FBQSxDQUFDLFFBQVEsRUFBQSxFQUFBLFFBQUEsRUFDSixtQkFBbUIsQ0FDaEIsS0FBSyxFQUNMLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsVUFBVSxFQUNWLFdBQVcsRUFDWCxRQUFRLENBQ1gsRUFBQSxFQVJVLEtBQUssQ0FBQyxFQUFFLENBU1o7QUFFbkIsd0JBQUEsQ0FBQyxDQUFDLEVBQUEsQ0FDRCxDQUFBLEVBQUEsQ0FDSCxJQUNOLElBQUksQ0FBQSxFQUFBLEVBcERILElBQUksQ0FBQyxFQUFFLENBcURYO0FBRWI7QUFFTSxTQUFVLFVBQVUsQ0FBQyxLQUE2QixFQUFBO0lBQ3BELE1BQU0sRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDO0lBQzFELE1BQU0sR0FBRyxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRW5DLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxZQUFZLEVBQUUsTUFBTSwrQ0FBNkIsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsU0FBUztJQUNoSCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxFQUFFLE1BQU0sK0NBQTZCLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxHQUFHLFNBQVM7QUFDbkgsSUFBQSxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO0FBQ2xGLElBQUEsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLFFBQVE7SUFDcEMsTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsV0FBVztBQUV0RCxJQUFBLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUM1QixNQUFNLENBQUMsYUFBYSxFQUFFLFNBQVMsS0FDM0Isd0JBQXdCLENBQUMsYUFBYSxFQUFFLFNBQVMsRUFBRTtRQUMvQyxXQUFXO1FBQ1gsYUFBYTtRQUNiLFlBQVk7UUFDWjtLQUNILENBQUMsRUFDTixDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUM3RDtBQUVELElBQUEsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUN0QixPQUFPO1FBQ0gsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhO1FBQ2xDLGFBQWEsRUFBRSxLQUFLLENBQUMsYUFBYTtRQUNsQyxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7UUFDNUIsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLGlCQUFpQjtRQUMxQyxhQUFhLEVBQUUsS0FBSyxDQUFDO0tBQ3hCLENBQUMsRUFDRixDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQzdHO0lBRUQsTUFBTSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQztBQUMxRCxJQUFBLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FDM0IsQ0FBQyxJQUF3QixLQUFJO0FBQ3pCLFFBQUEsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFBLFVBQUEsK0JBQTZCO1lBQy9DLElBQUksQ0FBQyxhQUFhLEdBQUEsb0JBQUE7WUFDbEIsV0FBVyxDQUFDLE9BQU8sSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ25DO1FBQ0o7UUFFQSxJQUFJLENBQUMsYUFBYSxHQUFBLFVBQUE7UUFDbEIsV0FBVyxDQUNQLElBQUksQ0FBQyxJQUFJLEVBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FDekM7UUFDRCxXQUFXLENBQUMsT0FBTyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDdkMsSUFBQSxDQUFDLEVBQ0QsQ0FBQyxXQUFXLENBQUMsQ0FDaEI7QUFFRCxJQUFBLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDdkIsUUFBQSxRQUNJQSxHQUFBLENBQUEsS0FBQSxFQUFBLEVBQUssU0FBUyxFQUFFLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLFlBQ2xHQSxHQUFBLENBQUEsS0FBQSxFQUFBLEVBQUssU0FBUyxFQUFDLDBCQUEwQixZQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxJQUFJLG1CQUFtQixFQUFBLENBQU8sRUFBQSxDQUNqRztJQUVkO0FBRUEsSUFBQSxRQUNJQSxHQUFBLENBQUEsSUFBQSxFQUFBLEVBQ0ksU0FBUyxFQUFFLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQzdFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFBLGlCQUFBLEVBQ0QsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLEVBQ3BDLElBQUksRUFBQyxNQUFNLEVBQUEsUUFBQSxFQUVWLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUNkLG1CQUFtQixDQUNmLElBQUksRUFDSixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLEtBQUssQ0FBQyxVQUFVLEVBQ2hCLFdBQVcsRUFDWCxLQUFLLENBQUMsUUFBUSxDQUNqQixDQUNKLEVBQUEsQ0FDQTtBQUViOztBQ2xLTSxTQUFVLFFBQVEsQ0FBQyxLQUE2QixFQUFBO0FBQ2xELElBQUEsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEVBQUU7QUFDekIsUUFBQSxPQUFPQSxHQUFBLENBQUMsVUFBVSxFQUFBLEVBQUEsR0FBSyxLQUFLLEdBQUk7SUFDcEM7U0FBTztBQUNILFFBQUEsT0FBT0EsR0FBQSxDQUFDLFVBQVUsRUFBQSxFQUFBLEdBQUssS0FBSyxHQUFJO0lBQ3BDO0FBQ0o7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdfQ==
