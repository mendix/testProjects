import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AssociationObjectProperty } from "mendix/AssociationObjectProperty";
import { AttributeProperty } from "mendix/AttributeProperty";
import { DerivedUniqueIdProperty } from "mendix/DerivedUniqueIdProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { TextProperty } from "mendix/TextProperty";
import { ValidationProperty } from "mendix/ValidationProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import { ConditionalVisibilityWrapper } from "mendix/widgets/web/ConditionalVisibilityWrapper";
import { DataView } from "mendix/widgets/web/DataView";
import { FormGroup } from "mendix/widgets/web/FormGroup";
import { TextBox } from "mendix/widgets/web/TextBox";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.PopupLayout.js";

const { $DataView, $FormGroup, $TextBox, $ConditionalVisibilityWrapper, $ActionButton } = asPluginWidgets({ DataView, FormGroup, TextBox, ConditionalVisibilityWrapper, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$DataView key={"p.Administration.ChangePasswordForm.dataView2"}
        $widgetId={"p.Administration.ChangePasswordForm.dataView2"}
        class={"mx-name-dataView2 form-horizontal"}
        object={AssociationObjectProperty({
            "dataSourceId": "p.2",
            "scope": "$AccountPasswordData",
            "editable": true
        })}
        emptyMessage={TextProperty({
            "value": ""
        })}
        body={[
            <$FormGroup key={"p.Administration.ChangePasswordForm.textBox3$formGroup"}
                $widgetId={"p.Administration.ChangePasswordForm.textBox3$formGroup"}
                class={"mx-name-textBox3 mx-textbox"}
                control={[
                    <$TextBox key={"p.Administration.ChangePasswordForm.textBox3"}
                        $widgetId={"p.Administration.ChangePasswordForm.textBox3"}
                        inputValue={AttributeProperty({
                            "scope": "p.Administration.ChangePasswordForm.dataView2",
                            "path": "",
                            "entity": "Administration.AccountPasswordData",
                            "attribute": "NewPassword",
                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                            "isList": false,
                            "validation": { "message": t([ "The password cannot be empty." ]), "expression": { "expr": { "type": "function", "name": ">", "parameters": [ { "type": "function", "name": "length", "parameters": [ { "type": "function", "name": "toString", "parameters": [ { "type": "variable", "variable": "value" } ] } ] }, { "type": "literalNumeric", "value": "0" } ] }, "args": {} } },
                            "formatting": { }
                        })}
                        isPassword={true}
                        placeholder={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                        })}
                        mask={""}
                        readOnlyStyle={"text"}
                        maxLength={200}
                        autocomplete={"on"}
                        submitWhileEditing={false}
                        submitDelay={300}
                        ariaRequired={true}
                        id={DerivedUniqueIdProperty({
                            "widgetId": "p.Administration.ChangePasswordForm.textBox3"
                        })} />
                ]}
                caption={ExpressionProperty({
                    "expression": { "expr": { "type": "literal", "value": "New password" }, "args": {} }
                })}
                width={3}
                orientation={"horizontal"}
                hasError={ValidationProperty({
                    "inputWidgetId": "p.Administration.ChangePasswordForm.textBox3"
                })}
                labelFor={DerivedUniqueIdProperty({
                    "widgetId": "p.Administration.ChangePasswordForm.textBox3"
                })} />,
            <$FormGroup key={"p.Administration.ChangePasswordForm.textBox1$formGroup"}
                $widgetId={"p.Administration.ChangePasswordForm.textBox1$formGroup"}
                class={"mx-name-textBox1 mx-textbox"}
                control={[
                    <$TextBox key={"p.Administration.ChangePasswordForm.textBox1"}
                        $widgetId={"p.Administration.ChangePasswordForm.textBox1"}
                        inputValue={AttributeProperty({
                            "scope": "p.Administration.ChangePasswordForm.dataView2",
                            "path": "",
                            "entity": "Administration.AccountPasswordData",
                            "attribute": "ConfirmPassword",
                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                            "isList": false,
                            "validation": { "message": t([ "The password cannot be empty." ]), "expression": { "expr": { "type": "function", "name": ">", "parameters": [ { "type": "function", "name": "length", "parameters": [ { "type": "function", "name": "toString", "parameters": [ { "type": "variable", "variable": "value" } ] } ] }, { "type": "literalNumeric", "value": "0" } ] }, "args": {} } },
                            "formatting": { }
                        })}
                        isPassword={true}
                        placeholder={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                        })}
                        mask={""}
                        readOnlyStyle={"text"}
                        maxLength={200}
                        autocomplete={"on"}
                        submitWhileEditing={false}
                        submitDelay={300}
                        ariaRequired={true}
                        id={DerivedUniqueIdProperty({
                            "widgetId": "p.Administration.ChangePasswordForm.textBox1"
                        })} />
                ]}
                caption={ExpressionProperty({
                    "expression": { "expr": { "type": "literal", "value": "Confirm password" }, "args": {} }
                })}
                width={3}
                orientation={"horizontal"}
                hasError={ValidationProperty({
                    "inputWidgetId": "p.Administration.ChangePasswordForm.textBox1"
                })}
                labelFor={DerivedUniqueIdProperty({
                    "widgetId": "p.Administration.ChangePasswordForm.textBox1"
                })} />
        ]}
        hideFooter={false}
        footer={[
            <$ConditionalVisibilityWrapper key={"p.Administration.ChangePasswordForm.microflowButton1$visibility"}
                $widgetId={"p.Administration.ChangePasswordForm.microflowButton1$visibility"}
                visible={ExpressionProperty({
                    "expression": { "expr": { "type": "function", "name": "_hasSomeRole", "parameters": [ { "type": "literal", "value": "Administrator" } ] }, "args": {} }
                })}
                contents={[
                    <$ActionButton key={"p.Administration.ChangePasswordForm.microflowButton1"}
                        $widgetId={"p.Administration.ChangePasswordForm.microflowButton1"}
                        buttonId={"p.Administration.ChangePasswordForm.microflowButton1"}
                        class={"mx-name-microflowButton1"}
                        renderType={"button"}
                        buttonClass={"btn-success"}
                        caption={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "Change" }, "args": {} }
                        })}
                        tooltip={TextProperty({
                            "value": ""
                        })}
                        action={ActionProperty({
                            "action": { "type": "callMicroflow", "argMap": { "AccountPasswordData": { "widget": "$AccountPasswordData", "source": "object" } }, "config": { "operationId": "NkowQRDsMlyzg71C2ejEkA", "validate": "view", "allowedRoles": [ "Administrator" ] }, "disabledDuringExecution": false },
                            "abortOnServerValidation": true
                        })} />
                ]} />,
            <$ActionButton key={"p.Administration.ChangePasswordForm.cancelButton1"}
                $widgetId={"p.Administration.ChangePasswordForm.cancelButton1"}
                buttonId={"p.Administration.ChangePasswordForm.cancelButton1"}
                class={"mx-name-cancelButton1"}
                renderType={"button"}
                buttonClass={"btn-default"}
                caption={ExpressionProperty({
                    "expression": { "expr": { "type": "literal", "value": "Cancel" }, "args": {} }
                })}
                tooltip={TextProperty({
                    "value": ""
                })}
                action={ActionProperty({
                    "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "OQel5b6ZalqpuuS2jPXSdw", "closePage": true }, "disabledDuringExecution": true },
                    "abortOnServerValidation": true
                })} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Change Password"
]);

export const classes = "";

export const autofocus = "desktopOnly";
export const cancelChangesOperationId = "YMotRBO7hlWfIfeu/+UU4Q";
export const closeButton = "p.Administration.ChangePasswordForm.cancelButton1";
export const style = {};
export const parameters = {
  "$AccountPasswordData": {
    "kind": "object"
  }
};
export const content = { ...parentContent,
    "Atlas_Core.PopupLayout.Main": region$Main,
};
