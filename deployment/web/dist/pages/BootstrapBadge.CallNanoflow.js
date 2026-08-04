export const __rspack_esm_id = "pages/BootstrapBadge.CallNanoflow";
export const __rspack_esm_ids = ["pages/BootstrapBadge.CallNanoflow"];
export const __webpack_modules__ = {
"\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\nanoflows\\BootstrapBadge.GetBadge.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  GetBadge: () => (GetBadge)
});
/* import */ var mendix__rspack_import_0 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\index.js");

const GetBadge = {
    "name": "BootstrapBadge.GetBadge",
    "useListParameterByReference": true,
    "instructions": [
        {
            "type": "createObject",
            "label": "4579fa5e-35a1-42e3-b429-50f034e1a118",
            "operationId": "/V+Io2zgzF+HI3B36dsxPw",
            "objectType": "BootstrapBadge.Badge",
            "outputVar": "NewBadge"
        },
        {
            "type": "changeObject",
            "inputVar": "NewBadge",
            "member": "DefaultValue",
            "value": {
                "type": "literal",
                "value": "NewSuccess"
            }
        },
        {
            "type": "changeObject",
            "inputVar": "NewBadge",
            "member": "DataString",
            "value": {
                "type": "literal",
                "value": "NewSuccess"
            }
        },
        {
            "type": "return",
            "label": "9e1b0789-b9ee-4ff9-b64d-847d33c0b90f",
            "result": {
                "type": "variable",
                "variable": "NewBadge"
            },
            "resultKind": "object"
        }
    ]
};


},
"\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\nanoflows\\BootstrapBadge.IVK_Nanoflow.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  IVK_Nanoflow: () => (IVK_Nanoflow)
});
/* import */ var mendix__rspack_import_0 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\index.js");

const IVK_Nanoflow = {
    "name": "BootstrapBadge.IVK_Nanoflow",
    "useListParameterByReference": true,
    "instructions": [
        {
            "type": "openForm",
            "label": "8d75f9f9-596b-4f39-9434-d5e11b38a58c",
            "path": "BootstrapBadge/Badge_NewEdit_Nanoflow.page.xml",
            "title": (0,mendix__rspack_import_0.t)([
                {
                    "type": "literal",
                    "value": "Nanoflow executed successfully !!"
                },
                {
                    "type": "literal",
                    "value": "Nanoflow executed successfully !!"
                }
            ]),
            "params": {
                "name": "BootstrapBadge/Badge_NewEdit_Nanoflow.page.xml",
                "title": (0,mendix__rspack_import_0.t)([
                    {
                        "type": "literal",
                        "value": "Nanoflow executed successfully !!"
                    },
                    {
                        "type": "literal",
                        "value": "Nanoflow executed successfully !!"
                    }
                ]),
                "location": "popup",
                "resizable": true
            },
            "inputArgs": {
                "$Badge": {
                    "type": "variable",
                    "variable": "Badge"
                }
            }
        },
        {
            "type": "return",
            "label": "a0d4d2f4-f7cf-4fa2-bfb6-e269a18096b9",
            "result": {
                "type": "literal",
                "value": null
            },
            "resultKind": "primitive"
        }
    ]
};


},
"\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  autofocus: () => (autofocus),
  classes: () => (classes),
  content: () => (content),
  parameters: () => (parameters),
  style: () => (style),
  title: () => (title),
  url: () => (url)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\react\\jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\react\\index.js");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var mendix_PageFragment__rspack_import_2 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\PageFragment.js");
/* import */ var mendix_ActionProperty__rspack_import_3 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\ActionProperty.js");
/* import */ var mendix_ExpressionProperty__rspack_import_4 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\ExpressionProperty.js");
/* import */ var mendix_NanoflowObjectProperty__rspack_import_5 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\NanoflowObjectProperty.js");
/* import */ var mendix_TextProperty__rspack_import_6 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\TextProperty.js");
/* import */ var mendix_WebIconProperty__rspack_import_7 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\WebIconProperty.js");
/* import */ var mendix_widgets_web_ActionButton__rspack_import_8 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\widgets\\web\\ActionButton.js");
/* import */ var Z_Documents_Projects_web_widgets_packages_pluggableWidgets_badge_web_tests_testProject_deployment_web_widgets_com_mendix_widget_custom_badge_Badge_mjs__rspack_import_9 = __webpack_require__("Z:\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\widgets\\com\\mendix\\widget\\custom\\badge\\Badge.mjs");
/* import */ var mendix_widgets_web_DataView__rspack_import_10 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\widgets\\web\\DataView.js");
/* import */ var mendix_widgets_web_Div__rspack_import_11 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\widgets\\web\\Div.js");
/* import */ var mendix_widgets_web_Text__rspack_import_12 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\widgets\\web\\Text.js");
/* import */ var mendix__rspack_import_13 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\index.js");
/* import */ var _layouts_Atlas_Core_Atlas_Default_js__rspack_import_14 = __webpack_require__("\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\layouts\\Atlas_Core.Atlas_Default.js");
/* import */ var _nanoflows_BootstrapBadge_GetBadge_js__rspack_import_15 = __webpack_require__("\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\nanoflows\\BootstrapBadge.GetBadge.js");
/* import */ var _nanoflows_BootstrapBadge_IVK_Nanoflow_js__rspack_import_16 = __webpack_require__("\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\nanoflows\\BootstrapBadge.IVK_Nanoflow.js");


const React = {
    createElement: react__rspack_import_1.createElement
};








const Badge = Object.getOwnPropertyDescriptor(Z_Documents_Projects_web_widgets_packages_pluggableWidgets_badge_web_tests_testProject_deployment_web_widgets_com_mendix_widget_custom_badge_Badge_mjs__rspack_import_9, "Badge")?.get() || Object.getOwnPropertyDescriptor(Z_Documents_Projects_web_widgets_packages_pluggableWidgets_badge_web_tests_testProject_deployment_web_widgets_com_mendix_widget_custom_badge_Badge_mjs__rspack_import_9, "default")?.get();







const { $Div, $Text, $DataView, $Badge, $ActionButton } = (0,mendix__rspack_import_13.asPluginWidgets)({
    Div: mendix_widgets_web_Div__rspack_import_11.Div,
    Text: mendix_widgets_web_Text__rspack_import_12.Text,
    DataView: mendix_widgets_web_DataView__rspack_import_10.DataView,
    Badge,
    ActionButton: mendix_widgets_web_ActionButton__rspack_import_8.ActionButton
});
const region$Main = (historyId)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(mendix_PageFragment__rspack_import_2.PageFragment, {
        renderKey: historyId,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($Div, {
                $widgetId: "p.BootstrapBadge.CallNanoflow.layoutGrid1",
                class: "mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid",
                content: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($Div, {
                        $widgetId: "p.BootstrapBadge.CallNanoflow.layoutGrid1$row0",
                        class: "row",
                        content: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($Div, {
                                $widgetId: "p.BootstrapBadge.CallNanoflow.layoutGrid1$row0$column0",
                                class: "col-lg-6 col-md-12 col-12",
                                content: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($Text, {
                                        $widgetId: "p.BootstrapBadge.CallNanoflow.text1",
                                        class: "mx-name-text1",
                                        caption: (0,mendix_ExpressionProperty__rspack_import_4.ExpressionProperty)({
                                            "expression": {
                                                "expr": {
                                                    "type": "literal",
                                                    "value": "Badge"
                                                },
                                                "args": {}
                                            }
                                        }),
                                        renderMode: "h1"
                                    }, "p.BootstrapBadge.CallNanoflow.text1", false, {
                                        fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js",
                                        lineNumber: 38,
                                        columnNumber: 29
                                    }, undefined),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($DataView, {
                                        $widgetId: "p.BootstrapBadge.CallNanoflow.dataView1",
                                        class: "mx-name-dataView1 form-vertical",
                                        object: (0,mendix_NanoflowObjectProperty__rspack_import_5.NanoflowObjectProperty)({
                                            "dataSourceId": "p.10",
                                            "editable": true,
                                            "source": {
                                                "nanoflow": ()=>_nanoflows_BootstrapBadge_GetBadge_js__rspack_import_15.GetBadge,
                                                "allowedRoles": [
                                                    "Administrator",
                                                    "User"
                                                ]
                                            },
                                            "argMap": {}
                                        }),
                                        emptyMessage: (0,mendix_TextProperty__rspack_import_6.TextProperty)({
                                            "value": ""
                                        }),
                                        body: [
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($Badge, {
                                                $widgetId: "p.BootstrapBadge.CallNanoflow.badgeCallNanoflow",
                                                type: "badge",
                                                value: (0,mendix__rspack_import_13.t)([
                                                    (0,mendix_ExpressionProperty__rspack_import_4.ExpressionProperty)({
                                                        "expression": {
                                                            "expr": {
                                                                "type": "variable",
                                                                "variable": "currentObject",
                                                                "path": "DataString"
                                                            },
                                                            "args": {
                                                                "currentObject": {
                                                                    "widget": "p.BootstrapBadge.CallNanoflow.dataView1",
                                                                    "source": "object"
                                                                }
                                                            }
                                                        }
                                                    }),
                                                    (0,mendix_ExpressionProperty__rspack_import_4.ExpressionProperty)({
                                                        "expression": {
                                                            "expr": {
                                                                "type": "literal",
                                                                "value": "Badge"
                                                            },
                                                            "args": {}
                                                        }
                                                    })
                                                ]),
                                                onClick: (0,mendix_ActionProperty__rspack_import_3.ActionProperty)({
                                                    "action": {
                                                        "type": "callNanoflow",
                                                        "argMap": {
                                                            "Badge": {
                                                                "widget": "p.BootstrapBadge.CallNanoflow.dataView1",
                                                                "source": "object"
                                                            }
                                                        },
                                                        "config": {
                                                            "nanoflow": ()=>_nanoflows_BootstrapBadge_IVK_Nanoflow_js__rspack_import_16.IVK_Nanoflow,
                                                            "allowedRoles": [
                                                                "Administrator",
                                                                "User"
                                                            ]
                                                        },
                                                        "disabledDuringExecution": false
                                                    },
                                                    "argumentTypes": {}
                                                }),
                                                class: "mx-name-badgeCallNanoflow label-success"
                                            }, "p.BootstrapBadge.CallNanoflow.badgeCallNanoflow", false, {
                                                fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js",
                                                lineNumber: 58,
                                                columnNumber: 37
                                            }, undefined)
                                        ],
                                        hideFooter: false,
                                        footer: [
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($ActionButton, {
                                                $widgetId: "p.BootstrapBadge.CallNanoflow.cancelButton1",
                                                buttonId: "p.BootstrapBadge.CallNanoflow.cancelButton1",
                                                class: "mx-name-cancelButton1",
                                                renderType: "button",
                                                buttonClass: "btn-default",
                                                caption: (0,mendix__rspack_import_13.t)([
                                                    (0,mendix_ExpressionProperty__rspack_import_4.ExpressionProperty)({
                                                        "expression": {
                                                            "expr": {
                                                                "type": "literal",
                                                                "value": "Cancel"
                                                            },
                                                            "args": {}
                                                        }
                                                    }),
                                                    (0,mendix_ExpressionProperty__rspack_import_4.ExpressionProperty)({
                                                        "expression": {
                                                            "expr": {
                                                                "type": "literal",
                                                                "value": "Annuleren"
                                                            },
                                                            "args": {}
                                                        }
                                                    })
                                                ]),
                                                tooltip: (0,mendix_TextProperty__rspack_import_6.TextProperty)({
                                                    "value": ""
                                                }),
                                                icon: (0,mendix_WebIconProperty__rspack_import_7.WebIconProperty)({
                                                    "icon": {
                                                        "type": "image",
                                                        "iconUrl": "img/System$Images$Cancel.png"
                                                    }
                                                }),
                                                action: (0,mendix_ActionProperty__rspack_import_3.ActionProperty)({
                                                    "action": {
                                                        "type": "cancelChanges",
                                                        "argMap": {},
                                                        "config": {
                                                            "operationId": "wR7vmDrerlCEUO+RxyOhrQ",
                                                            "closePage": true
                                                        },
                                                        "disabledDuringExecution": true
                                                    },
                                                    "abortOnServerValidation": true
                                                })
                                            }, "p.BootstrapBadge.CallNanoflow.cancelButton1", false, {
                                                fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js",
                                                lineNumber: 77,
                                                columnNumber: 37
                                            }, undefined)
                                        ]
                                    }, "p.BootstrapBadge.CallNanoflow.dataView1", false, {
                                        fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js",
                                        lineNumber: 45,
                                        columnNumber: 29
                                    }, undefined)
                                ]
                            }, "p.BootstrapBadge.CallNanoflow.layoutGrid1$row0$column0", false, {
                                fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js",
                                lineNumber: 34,
                                columnNumber: 21
                            }, undefined),
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($Div, {
                                $widgetId: "p.BootstrapBadge.CallNanoflow.layoutGrid1$row0$column1",
                                class: "col-lg-6 col-md-12 col-12",
                                content: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($Text, {
                                        $widgetId: "p.BootstrapBadge.CallNanoflow.text2",
                                        class: "mx-name-text2",
                                        caption: (0,mendix_ExpressionProperty__rspack_import_4.ExpressionProperty)({
                                            "expression": {
                                                "expr": {
                                                    "type": "literal",
                                                    "value": "Color Label"
                                                },
                                                "args": {}
                                            }
                                        }),
                                        renderMode: "h1"
                                    }, "p.BootstrapBadge.CallNanoflow.text2", false, {
                                        fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js",
                                        lineNumber: 107,
                                        columnNumber: 29
                                    }, undefined),
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($DataView, {
                                        $widgetId: "p.BootstrapBadge.CallNanoflow.dataView2",
                                        class: "mx-name-dataView2 form-vertical",
                                        object: (0,mendix_NanoflowObjectProperty__rspack_import_5.NanoflowObjectProperty)({
                                            "dataSourceId": "p.21",
                                            "editable": true,
                                            "source": {
                                                "nanoflow": ()=>_nanoflows_BootstrapBadge_GetBadge_js__rspack_import_15.GetBadge,
                                                "allowedRoles": [
                                                    "Administrator",
                                                    "User"
                                                ]
                                            },
                                            "argMap": {}
                                        }),
                                        emptyMessage: (0,mendix_TextProperty__rspack_import_6.TextProperty)({
                                            "value": ""
                                        }),
                                        body: [
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($Badge, {
                                                $widgetId: "p.BootstrapBadge.CallNanoflow.labelCallNanoflow",
                                                type: "label",
                                                value: (0,mendix__rspack_import_13.t)([
                                                    (0,mendix_ExpressionProperty__rspack_import_4.ExpressionProperty)({
                                                        "expression": {
                                                            "expr": {
                                                                "type": "variable",
                                                                "variable": "currentObject",
                                                                "path": "DataString"
                                                            },
                                                            "args": {
                                                                "currentObject": {
                                                                    "widget": "p.BootstrapBadge.CallNanoflow.dataView2",
                                                                    "source": "object"
                                                                }
                                                            }
                                                        }
                                                    }),
                                                    (0,mendix_ExpressionProperty__rspack_import_4.ExpressionProperty)({
                                                        "expression": {
                                                            "expr": {
                                                                "type": "literal",
                                                                "value": "Badge"
                                                            },
                                                            "args": {}
                                                        }
                                                    })
                                                ]),
                                                onClick: (0,mendix_ActionProperty__rspack_import_3.ActionProperty)({
                                                    "action": {
                                                        "type": "callNanoflow",
                                                        "argMap": {
                                                            "Badge": {
                                                                "widget": "p.BootstrapBadge.CallNanoflow.dataView2",
                                                                "source": "object"
                                                            }
                                                        },
                                                        "config": {
                                                            "nanoflow": ()=>_nanoflows_BootstrapBadge_IVK_Nanoflow_js__rspack_import_16.IVK_Nanoflow,
                                                            "allowedRoles": [
                                                                "Administrator",
                                                                "User"
                                                            ]
                                                        },
                                                        "disabledDuringExecution": false
                                                    },
                                                    "argumentTypes": {}
                                                }),
                                                class: "mx-name-labelCallNanoflow label-success"
                                            }, "p.BootstrapBadge.CallNanoflow.labelCallNanoflow", false, {
                                                fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js",
                                                lineNumber: 127,
                                                columnNumber: 37
                                            }, undefined)
                                        ],
                                        hideFooter: false,
                                        footer: [
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($ActionButton, {
                                                $widgetId: "p.BootstrapBadge.CallNanoflow.cancelButton2",
                                                buttonId: "p.BootstrapBadge.CallNanoflow.cancelButton2",
                                                class: "mx-name-cancelButton2",
                                                renderType: "button",
                                                buttonClass: "btn-default",
                                                caption: (0,mendix__rspack_import_13.t)([
                                                    (0,mendix_ExpressionProperty__rspack_import_4.ExpressionProperty)({
                                                        "expression": {
                                                            "expr": {
                                                                "type": "literal",
                                                                "value": "Cancel"
                                                            },
                                                            "args": {}
                                                        }
                                                    }),
                                                    (0,mendix_ExpressionProperty__rspack_import_4.ExpressionProperty)({
                                                        "expression": {
                                                            "expr": {
                                                                "type": "literal",
                                                                "value": "Annuleren"
                                                            },
                                                            "args": {}
                                                        }
                                                    })
                                                ]),
                                                tooltip: (0,mendix_TextProperty__rspack_import_6.TextProperty)({
                                                    "value": ""
                                                }),
                                                icon: (0,mendix_WebIconProperty__rspack_import_7.WebIconProperty)({
                                                    "icon": {
                                                        "type": "image",
                                                        "iconUrl": "img/System$Images$Cancel.png"
                                                    }
                                                }),
                                                action: (0,mendix_ActionProperty__rspack_import_3.ActionProperty)({
                                                    "action": {
                                                        "type": "cancelChanges",
                                                        "argMap": {},
                                                        "config": {
                                                            "operationId": "CmGcih1ZxlOVo/672jN3dA",
                                                            "closePage": true
                                                        },
                                                        "disabledDuringExecution": true
                                                    },
                                                    "abortOnServerValidation": true
                                                })
                                            }, "p.BootstrapBadge.CallNanoflow.cancelButton2", false, {
                                                fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js",
                                                lineNumber: 146,
                                                columnNumber: 37
                                            }, undefined)
                                        ]
                                    }, "p.BootstrapBadge.CallNanoflow.dataView2", false, {
                                        fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js",
                                        lineNumber: 114,
                                        columnNumber: 29
                                    }, undefined)
                                ]
                            }, "p.BootstrapBadge.CallNanoflow.layoutGrid1$row0$column1", false, {
                                fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js",
                                lineNumber: 103,
                                columnNumber: 21
                            }, undefined)
                        ]
                    }, "p.BootstrapBadge.CallNanoflow.layoutGrid1$row0", false, {
                        fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js",
                        lineNumber: 30,
                        columnNumber: 13
                    }, undefined)
                ]
            }, "p.BootstrapBadge.CallNanoflow.layoutGrid1", false, {
                fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js",
                lineNumber: 26,
                columnNumber: 5
            }, undefined)
        ]
    }, void 0, false, {
        fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js",
        lineNumber: 25,
        columnNumber: 37
    }, undefined);
const title = (0,mendix__rspack_import_13.t)([
    "Page Title",
    "Page Title"
]);
const classes = "layout-atlas layout-atlas-responsive-default";
const autofocus = "desktopOnly";
const url = "/p/callNanoflow";
const style = {};
const parameters = {};
const content = {
    ..._layouts_Atlas_Core_Atlas_Default_js__rspack_import_14.content,
    "Atlas_Core.Atlas_Default.Main": region$Main
};


},

};
import { __webpack_require__ } from '../chunks/runtime-5adbffe4a2e3422f.js';
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
import * as __rspack_chunk_1 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_index_js-ecd25008df0b366d.js';
__webpack_require__.C(__rspack_chunk_1);
import * as __rspack_chunk_2 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_widgets_web_Act-7b04d1-7f1320146aba681c.js';
__webpack_require__.C(__rspack_chunk_2);
import * as __rspack_chunk_3 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_DmCG7g3V_js-3f3b67526c4b5f5f.js';
__webpack_require__.C(__rspack_chunk_3);
import * as __rspack_chunk_4 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_ChhPn_1a_js-c8f132d6e62ca033.js';
__webpack_require__.C(__rspack_chunk_4);
import * as __rspack_chunk_5 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_widgets_web_Dat-93c30b-c41c0bf221178075.js';
__webpack_require__.C(__rspack_chunk_5);
import * as __rspack_chunk_6 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_react-dom_index_js-534c2a4ef59e45c1.js';
__webpack_require__.C(__rspack_chunk_6);
import * as __rspack_chunk_7 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_WebIconProperty_js-329385a7c4f7797d.js';
__webpack_require__.C(__rspack_chunk_7);
import * as __rspack_chunk_8 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_widgets_web_Con-2a6928-4058291e84f4d81b.js';
__webpack_require__.C(__rspack_chunk_8);
import * as __rspack_chunk_9 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_widgets_web_Text_js-9b43faa727b3ad59.js';
__webpack_require__.C(__rspack_chunk_9);
import * as __rspack_chunk_10 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_a7rQvYIE_js-7250602992c69157.js';
__webpack_require__.C(__rspack_chunk_10);
import * as __rspack_chunk_11 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_NanoflowObjectP-359215-4ca7ca8fa833a7d1.js';
__webpack_require__.C(__rspack_chunk_11);
import * as __rspack_chunk_12 from '../chunks/Z_Documents_Projects_web-widgets_packages_pluggableWidgets_badge-web_tests_testProject_deploy-75cb46-c28be6760b4c9793.js';
__webpack_require__.C(__rspack_chunk_12);
import * as __rspack_chunk_13 from '../chunks/_Mac_Home_Documents_Projects_web-widgets_packages_pluggableWidgets_badge-web_tests_testProjec-195a0c-24b0c6be41772f35.js';
__webpack_require__.C(__rspack_chunk_13);
import * as __rspack_chunk_14 from '../chunks/Z_Documents_Projects_web-widgets_packages_pluggableWidgets_badge-web_tests_testProject_deploy-cacf59-835145553f0d4b3a.js';
__webpack_require__.C(__rspack_chunk_14);
import * as __rspack_chunk_15 from './BootstrapBadge.CallNanoflow.js';
__webpack_require__.C(__rspack_chunk_15);
var __webpack_exports__ = __webpack_exec__("\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\badge-web\\tests\\testProject\\deployment\\web\\pages\\BootstrapBadge.CallNanoflow.js");var __webpack_exports__autofocus = __webpack_exports__.autofocus;
var __webpack_exports__classes = __webpack_exports__.classes;
var __webpack_exports__content = __webpack_exports__.content;
var __webpack_exports__parameters = __webpack_exports__.parameters;
var __webpack_exports__style = __webpack_exports__.style;
var __webpack_exports__title = __webpack_exports__.title;
var __webpack_exports__url = __webpack_exports__.url;
export { __webpack_exports__autofocus as autofocus, __webpack_exports__classes as classes, __webpack_exports__content as content, __webpack_exports__parameters as parameters, __webpack_exports__style as style, __webpack_exports__title as title, __webpack_exports__url as url };
