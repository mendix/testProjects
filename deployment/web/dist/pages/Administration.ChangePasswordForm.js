export const __rspack_esm_id = "pages/Administration.ChangePasswordForm";
export const __rspack_esm_ids = ["pages/Administration.ChangePasswordForm"];
export const __webpack_modules__ = {
"\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\gallery-web\\tests\\testProject\\deployment\\web\\pages\\Administration.ChangePasswordForm.js"(__unused_rspack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  autofocus: () => (autofocus),
  cancelChangesOperationId: () => (cancelChangesOperationId),
  classes: () => (classes),
  closeButton: () => (closeButton),
  content: () => (content),
  parameters: () => (parameters),
  style: () => (style),
  title: () => (title)
});
/* import */ var react_jsx_dev_runtime__rspack_import_0 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\react\\jsx-dev-runtime.js");
/* import */ var react__rspack_import_1 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\react\\index.js");
/* import */ var react__rspack_import_1_default = /*#__PURE__*/__webpack_require__.n(react__rspack_import_1);
/* import */ var mendix_PageFragment__rspack_import_2 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\PageFragment.js");
/* import */ var mendix_ActionProperty__rspack_import_3 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\ActionProperty.js");
/* import */ var mendix_AssociationObjectProperty__rspack_import_4 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\AssociationObjectProperty.js");
/* import */ var mendix_AttributeProperty__rspack_import_5 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\AttributeProperty.js");
/* import */ var mendix_DerivedUniqueIdProperty__rspack_import_6 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\DerivedUniqueIdProperty.js");
/* import */ var mendix_ExpressionProperty__rspack_import_7 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\ExpressionProperty.js");
/* import */ var mendix_TextProperty__rspack_import_8 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\TextProperty.js");
/* import */ var mendix_ValidationProperty__rspack_import_9 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\ValidationProperty.js");
/* import */ var mendix_widgets_web_ActionButton__rspack_import_10 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\widgets\\web\\ActionButton.js");
/* import */ var mendix_widgets_web_ConditionalVisibilityWrapper__rspack_import_11 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\widgets\\web\\ConditionalVisibilityWrapper.js");
/* import */ var mendix_widgets_web_DataView__rspack_import_12 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\widgets\\web\\DataView.js");
/* import */ var mendix_widgets_web_FormGroup__rspack_import_13 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\widgets\\web\\FormGroup.js");
/* import */ var mendix_widgets_web_TextBox__rspack_import_14 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\widgets\\web\\TextBox.js");
/* import */ var mendix__rspack_import_15 = __webpack_require__("C:\\Program Files\\Mendix\\11.12.2\\modeler\\tools\\node\\node_modules\\mendix\\index.js");
/* import */ var _layouts_Atlas_Core_PopupLayout_js__rspack_import_16 = __webpack_require__("\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\gallery-web\\tests\\testProject\\deployment\\web\\layouts\\Atlas_Core.PopupLayout.js");


const React = {
    createElement: react__rspack_import_1.createElement
};















const { $DataView, $FormGroup, $TextBox, $ConditionalVisibilityWrapper, $ActionButton } = (0,mendix__rspack_import_15.asPluginWidgets)({
    DataView: mendix_widgets_web_DataView__rspack_import_12.DataView,
    FormGroup: mendix_widgets_web_FormGroup__rspack_import_13.FormGroup,
    TextBox: mendix_widgets_web_TextBox__rspack_import_14.TextBox,
    ConditionalVisibilityWrapper: mendix_widgets_web_ConditionalVisibilityWrapper__rspack_import_11.ConditionalVisibilityWrapper,
    ActionButton: mendix_widgets_web_ActionButton__rspack_import_10.ActionButton
});
const region$Main = (historyId)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)(mendix_PageFragment__rspack_import_2.PageFragment, {
        renderKey: historyId,
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($DataView, {
                $widgetId: "p.Administration.ChangePasswordForm.dataView2",
                class: "mx-name-dataView2 form-horizontal",
                object: (0,mendix_AssociationObjectProperty__rspack_import_4.AssociationObjectProperty)({
                    "dataSourceId": "p.2",
                    "scope": "$AccountPasswordData",
                    "editable": true
                }),
                emptyMessage: (0,mendix_TextProperty__rspack_import_8.TextProperty)({
                    "value": ""
                }),
                body: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($FormGroup, {
                        $widgetId: "p.Administration.ChangePasswordForm.textBox3$formGroup",
                        class: "mx-name-textBox3 mx-textbox",
                        control: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($TextBox, {
                                $widgetId: "p.Administration.ChangePasswordForm.textBox3",
                                inputValue: (0,mendix_AttributeProperty__rspack_import_5.AttributeProperty)({
                                    "scope": "p.Administration.ChangePasswordForm.dataView2",
                                    "path": "",
                                    "entity": "Administration.AccountPasswordData",
                                    "attribute": "NewPassword",
                                    "onChange": {
                                        "type": "doNothing",
                                        "argMap": {},
                                        "config": {},
                                        "disabledDuringExecution": false
                                    },
                                    "isList": false,
                                    "validation": {
                                        "message": (0,mendix__rspack_import_15.t)([
                                            "The password cannot be empty."
                                        ]),
                                        "expression": {
                                            "expr": {
                                                "type": "function",
                                                "name": ">",
                                                "parameters": [
                                                    {
                                                        "type": "function",
                                                        "name": "length",
                                                        "parameters": [
                                                            {
                                                                "type": "function",
                                                                "name": "toString",
                                                                "parameters": [
                                                                    {
                                                                        "type": "variable",
                                                                        "variable": "value"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "literalNumeric",
                                                        "value": "0"
                                                    }
                                                ]
                                            },
                                            "args": {}
                                        }
                                    },
                                    "formatting": {}
                                }),
                                isPassword: true,
                                placeholder: (0,mendix_ExpressionProperty__rspack_import_7.ExpressionProperty)({
                                    "expression": {
                                        "expr": {
                                            "type": "literal",
                                            "value": ""
                                        },
                                        "args": {}
                                    }
                                }),
                                mask: "",
                                readOnlyStyle: "text",
                                maxLength: 200,
                                autocomplete: "on",
                                submitWhileEditing: false,
                                submitDelay: 300,
                                ariaRequired: true,
                                id: (0,mendix_DerivedUniqueIdProperty__rspack_import_6.DerivedUniqueIdProperty)({
                                    "widgetId": "p.Administration.ChangePasswordForm.textBox3"
                                })
                            }, "p.Administration.ChangePasswordForm.textBox3", false, {
                                fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\gallery-web\\tests\\testProject\\deployment\\web\\pages\\Administration.ChangePasswordForm.js",
                                lineNumber: 41,
                                columnNumber: 21
                            }, undefined)
                        ],
                        caption: (0,mendix_ExpressionProperty__rspack_import_7.ExpressionProperty)({
                            "expression": {
                                "expr": {
                                    "type": "literal",
                                    "value": "New password"
                                },
                                "args": {}
                            }
                        }),
                        width: 3,
                        orientation: "horizontal",
                        hasError: (0,mendix_ValidationProperty__rspack_import_9.ValidationProperty)({
                            "inputWidgetId": "p.Administration.ChangePasswordForm.textBox3"
                        }),
                        labelFor: (0,mendix_DerivedUniqueIdProperty__rspack_import_6.DerivedUniqueIdProperty)({
                            "widgetId": "p.Administration.ChangePasswordForm.textBox3"
                        })
                    }, "p.Administration.ChangePasswordForm.textBox3$formGroup", false, {
                        fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\gallery-web\\tests\\testProject\\deployment\\web\\pages\\Administration.ChangePasswordForm.js",
                        lineNumber: 37,
                        columnNumber: 13
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($FormGroup, {
                        $widgetId: "p.Administration.ChangePasswordForm.textBox1$formGroup",
                        class: "mx-name-textBox1 mx-textbox",
                        control: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($TextBox, {
                                $widgetId: "p.Administration.ChangePasswordForm.textBox1",
                                inputValue: (0,mendix_AttributeProperty__rspack_import_5.AttributeProperty)({
                                    "scope": "p.Administration.ChangePasswordForm.dataView2",
                                    "path": "",
                                    "entity": "Administration.AccountPasswordData",
                                    "attribute": "ConfirmPassword",
                                    "onChange": {
                                        "type": "doNothing",
                                        "argMap": {},
                                        "config": {},
                                        "disabledDuringExecution": false
                                    },
                                    "isList": false,
                                    "validation": {
                                        "message": (0,mendix__rspack_import_15.t)([
                                            "The password cannot be empty."
                                        ]),
                                        "expression": {
                                            "expr": {
                                                "type": "function",
                                                "name": ">",
                                                "parameters": [
                                                    {
                                                        "type": "function",
                                                        "name": "length",
                                                        "parameters": [
                                                            {
                                                                "type": "function",
                                                                "name": "toString",
                                                                "parameters": [
                                                                    {
                                                                        "type": "variable",
                                                                        "variable": "value"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "literalNumeric",
                                                        "value": "0"
                                                    }
                                                ]
                                            },
                                            "args": {}
                                        }
                                    },
                                    "formatting": {}
                                }),
                                isPassword: true,
                                placeholder: (0,mendix_ExpressionProperty__rspack_import_7.ExpressionProperty)({
                                    "expression": {
                                        "expr": {
                                            "type": "literal",
                                            "value": ""
                                        },
                                        "args": {}
                                    }
                                }),
                                mask: "",
                                readOnlyStyle: "text",
                                maxLength: 200,
                                autocomplete: "on",
                                submitWhileEditing: false,
                                submitDelay: 300,
                                ariaRequired: true,
                                id: (0,mendix_DerivedUniqueIdProperty__rspack_import_6.DerivedUniqueIdProperty)({
                                    "widgetId": "p.Administration.ChangePasswordForm.textBox1"
                                })
                            }, "p.Administration.ChangePasswordForm.textBox1", false, {
                                fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\gallery-web\\tests\\testProject\\deployment\\web\\pages\\Administration.ChangePasswordForm.js",
                                lineNumber: 83,
                                columnNumber: 21
                            }, undefined)
                        ],
                        caption: (0,mendix_ExpressionProperty__rspack_import_7.ExpressionProperty)({
                            "expression": {
                                "expr": {
                                    "type": "literal",
                                    "value": "Confirm password"
                                },
                                "args": {}
                            }
                        }),
                        width: 3,
                        orientation: "horizontal",
                        hasError: (0,mendix_ValidationProperty__rspack_import_9.ValidationProperty)({
                            "inputWidgetId": "p.Administration.ChangePasswordForm.textBox1"
                        }),
                        labelFor: (0,mendix_DerivedUniqueIdProperty__rspack_import_6.DerivedUniqueIdProperty)({
                            "widgetId": "p.Administration.ChangePasswordForm.textBox1"
                        })
                    }, "p.Administration.ChangePasswordForm.textBox1$formGroup", false, {
                        fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\gallery-web\\tests\\testProject\\deployment\\web\\pages\\Administration.ChangePasswordForm.js",
                        lineNumber: 79,
                        columnNumber: 13
                    }, undefined)
                ],
                hideFooter: false,
                footer: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($ConditionalVisibilityWrapper, {
                        $widgetId: "p.Administration.ChangePasswordForm.microflowButton1$visibility",
                        visible: (0,mendix_ExpressionProperty__rspack_import_7.ExpressionProperty)({
                            "expression": {
                                "expr": {
                                    "type": "function",
                                    "name": "_hasSomeRole",
                                    "parameters": [
                                        {
                                            "type": "literal",
                                            "value": "Administrator"
                                        }
                                    ]
                                },
                                "args": {}
                            }
                        }),
                        contents: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($ActionButton, {
                                $widgetId: "p.Administration.ChangePasswordForm.microflowButton1",
                                buttonId: "p.Administration.ChangePasswordForm.microflowButton1",
                                class: "mx-name-microflowButton1",
                                renderType: "button",
                                buttonClass: "btn-success",
                                caption: (0,mendix_ExpressionProperty__rspack_import_7.ExpressionProperty)({
                                    "expression": {
                                        "expr": {
                                            "type": "literal",
                                            "value": "Change"
                                        },
                                        "args": {}
                                    }
                                }),
                                tooltip: (0,mendix_TextProperty__rspack_import_8.TextProperty)({
                                    "value": ""
                                }),
                                action: (0,mendix_ActionProperty__rspack_import_3.ActionProperty)({
                                    "action": {
                                        "type": "callMicroflow",
                                        "argMap": {
                                            "AccountPasswordData": {
                                                "widget": "$AccountPasswordData",
                                                "source": "object"
                                            }
                                        },
                                        "config": {
                                            "operationId": "NkowQRDsMlyzg71C2ejEkA",
                                            "validate": "view",
                                            "allowedRoles": [
                                                "Administrator"
                                            ]
                                        },
                                        "disabledDuringExecution": false
                                    },
                                    "abortOnServerValidation": true
                                })
                            }, "p.Administration.ChangePasswordForm.microflowButton1", false, {
                                fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\gallery-web\\tests\\testProject\\deployment\\web\\pages\\Administration.ChangePasswordForm.js",
                                lineNumber: 130,
                                columnNumber: 21
                            }, undefined)
                        ]
                    }, "p.Administration.ChangePasswordForm.microflowButton1$visibility", false, {
                        fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\gallery-web\\tests\\testProject\\deployment\\web\\pages\\Administration.ChangePasswordForm.js",
                        lineNumber: 124,
                        columnNumber: 13
                    }, undefined),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__rspack_import_0.jsxDEV)($ActionButton, {
                        $widgetId: "p.Administration.ChangePasswordForm.cancelButton1",
                        buttonId: "p.Administration.ChangePasswordForm.cancelButton1",
                        class: "mx-name-cancelButton1",
                        renderType: "button",
                        buttonClass: "btn-default",
                        caption: (0,mendix_ExpressionProperty__rspack_import_7.ExpressionProperty)({
                            "expression": {
                                "expr": {
                                    "type": "literal",
                                    "value": "Cancel"
                                },
                                "args": {}
                            }
                        }),
                        tooltip: (0,mendix_TextProperty__rspack_import_8.TextProperty)({
                            "value": ""
                        }),
                        action: (0,mendix_ActionProperty__rspack_import_3.ActionProperty)({
                            "action": {
                                "type": "cancelChanges",
                                "argMap": {},
                                "config": {
                                    "operationId": "OQel5b6ZalqpuuS2jPXSdw",
                                    "closePage": true
                                },
                                "disabledDuringExecution": true
                            },
                            "abortOnServerValidation": true
                        })
                    }, "p.Administration.ChangePasswordForm.cancelButton1", false, {
                        fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\gallery-web\\tests\\testProject\\deployment\\web\\pages\\Administration.ChangePasswordForm.js",
                        lineNumber: 147,
                        columnNumber: 13
                    }, undefined)
                ]
            }, "p.Administration.ChangePasswordForm.dataView2", false, {
                fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\gallery-web\\tests\\testProject\\deployment\\web\\pages\\Administration.ChangePasswordForm.js",
                lineNumber: 25,
                columnNumber: 5
            }, undefined)
        ]
    }, void 0, false, {
        fileName: "\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\gallery-web\\tests\\testProject\\deployment\\web\\pages\\Administration.ChangePasswordForm.js",
        lineNumber: 24,
        columnNumber: 37
    }, undefined);
const title = (0,mendix__rspack_import_15.t)([
    "Change Password"
]);
const classes = "";
const autofocus = "desktopOnly";
const cancelChangesOperationId = "YMotRBO7hlWfIfeu/+UU4Q";
const closeButton = "p.Administration.ChangePasswordForm.cancelButton1";
const style = {};
const parameters = {
    "$AccountPasswordData": {
        "kind": "object"
    }
};
const content = {
    ..._layouts_Atlas_Core_PopupLayout_js__rspack_import_16.content,
    "Atlas_Core.PopupLayout.Main": region$Main
};


},

};
import { __webpack_require__ } from '../chunks/runtime-5adbffe4a2e3422f.js';
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
import * as __rspack_chunk_1 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_index_js-ecd25008df0b366d.js';
__webpack_require__.C(__rspack_chunk_1);
import * as __rspack_chunk_2 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_widgets_web_Pla-1d3072-2de84ffd78b95c1a.js';
__webpack_require__.C(__rspack_chunk_2);
import * as __rspack_chunk_3 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_widgets_web_Act-8bef92-a509fbc1e16f57d2.js';
__webpack_require__.C(__rspack_chunk_3);
import * as __rspack_chunk_4 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_AttributeProperty_js-552c0362a5a9940e.js';
__webpack_require__.C(__rspack_chunk_4);
import * as __rspack_chunk_5 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_widgets_web_Con-761375-d94c5d0b11ae03dc.js';
__webpack_require__.C(__rspack_chunk_5);
import * as __rspack_chunk_6 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_ChhPn_1a_js-c8f132d6e62ca033.js';
__webpack_require__.C(__rspack_chunk_6);
import * as __rspack_chunk_7 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_widgets_web_Dat-93c30b-c41c0bf221178075.js';
__webpack_require__.C(__rspack_chunk_7);
import * as __rspack_chunk_8 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_widgets_web_For-48f489-13dbe54cdc15995a.js';
__webpack_require__.C(__rspack_chunk_8);
import * as __rspack_chunk_9 from '../chunks/vendors-C_Program_Files_Mendix_11_12_2_modeler_tools_node_node_modules_mendix_AssociationObje-5e8a0e-224d8eb3e4e7eb5e.js';
__webpack_require__.C(__rspack_chunk_9);
import * as __rspack_chunk_10 from '../chunks/_Mac_Home_Documents_Projects_web-widgets_packages_pluggableWidgets_gallery-web_tests_testProj-36c6f0-8d63c7f1616bf06f.js';
__webpack_require__.C(__rspack_chunk_10);
import * as __rspack_chunk_11 from './Administration.ChangePasswordForm.js';
__webpack_require__.C(__rspack_chunk_11);
var __webpack_exports__ = __webpack_exec__("\\\\Mac\\Home\\Documents\\Projects\\web-widgets\\packages\\pluggableWidgets\\gallery-web\\tests\\testProject\\deployment\\web\\pages\\Administration.ChangePasswordForm.js");var __webpack_exports__autofocus = __webpack_exports__.autofocus;
var __webpack_exports__cancelChangesOperationId = __webpack_exports__.cancelChangesOperationId;
var __webpack_exports__classes = __webpack_exports__.classes;
var __webpack_exports__closeButton = __webpack_exports__.closeButton;
var __webpack_exports__content = __webpack_exports__.content;
var __webpack_exports__parameters = __webpack_exports__.parameters;
var __webpack_exports__style = __webpack_exports__.style;
var __webpack_exports__title = __webpack_exports__.title;
export { __webpack_exports__autofocus as autofocus, __webpack_exports__cancelChangesOperationId as cancelChangesOperationId, __webpack_exports__classes as classes, __webpack_exports__closeButton as closeButton, __webpack_exports__content as content, __webpack_exports__parameters as parameters, __webpack_exports__style as style, __webpack_exports__title as title };
