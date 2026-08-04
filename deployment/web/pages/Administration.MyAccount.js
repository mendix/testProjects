import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AssociationObjectProperty } from "mendix/AssociationObjectProperty";
import { AssociationProperty } from "mendix/AssociationProperty";
import { AttributeProperty } from "mendix/AttributeProperty";
import { DatabaseObjectListProperty } from "mendix/DatabaseObjectListProperty";
import { DerivedUniqueIdProperty } from "mendix/DerivedUniqueIdProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { ListAttributeProperty } from "mendix/ListAttributeProperty";
import { TextProperty } from "mendix/TextProperty";
import { ValidationProperty } from "mendix/ValidationProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import * as ComboboxWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.mjs";
const Combobox = Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "Combobox")?.get() || Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.css";
import { ConditionalVisibilityWrapper } from "mendix/widgets/web/ConditionalVisibilityWrapper";
import { DataView } from "mendix/widgets/web/DataView";
import { FormGroup } from "mendix/widgets/web/FormGroup";
import { TextBox } from "mendix/widgets/web/TextBox";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.PopupLayout.js";

const { $DataView, $FormGroup, $TextBox, $Combobox, $ConditionalVisibilityWrapper, $ActionButton } = asPluginWidgets({ DataView, FormGroup, TextBox, Combobox, ConditionalVisibilityWrapper, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$DataView key={"p.Administration.MyAccount.dataView1"}
        $widgetId={"p.Administration.MyAccount.dataView1"}
        class={"mx-name-dataView1 form-horizontal"}
        object={AssociationObjectProperty({
            "dataSourceId": "p.3",
            "scope": "$Account",
            "editable": true
        })}
        emptyMessage={TextProperty({
            "value": ""
        })}
        body={[
            <$FormGroup key={"p.Administration.MyAccount.textBox2$formGroup"}
                $widgetId={"p.Administration.MyAccount.textBox2$formGroup"}
                class={"mx-name-textBox2 mx-textbox"}
                control={[
                    <$TextBox key={"p.Administration.MyAccount.textBox2"}
                        $widgetId={"p.Administration.MyAccount.textBox2"}
                        inputValue={AttributeProperty({
                            "scope": "p.Administration.MyAccount.dataView1",
                            "path": "",
                            "entity": "Administration.Account",
                            "attribute": "FullName",
                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                            "isList": false,
                            "validation": null,
                            "formatting": { }
                        })}
                        isPassword={false}
                        placeholder={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                        })}
                        mask={""}
                        readOnlyStyle={"text"}
                        maxLength={200}
                        autocomplete={"on"}
                        submitWhileEditing={false}
                        submitDelay={300}
                        id={DerivedUniqueIdProperty({
                            "widgetId": "p.Administration.MyAccount.textBox2"
                        })} />
                ]}
                caption={ExpressionProperty({
                    "expression": { "expr": { "type": "literal", "value": "Full name" }, "args": {} }
                })}
                width={3}
                orientation={"horizontal"}
                hasError={ValidationProperty({
                    "inputWidgetId": "p.Administration.MyAccount.textBox2"
                })}
                labelFor={DerivedUniqueIdProperty({
                    "widgetId": "p.Administration.MyAccount.textBox2"
                })} />,
            <$FormGroup key={"p.Administration.MyAccount.textBox5$formGroup"}
                $widgetId={"p.Administration.MyAccount.textBox5$formGroup"}
                class={"mx-name-textBox5 mx-textbox"}
                control={[
                    <$TextBox key={"p.Administration.MyAccount.textBox5"}
                        $widgetId={"p.Administration.MyAccount.textBox5"}
                        inputValue={AttributeProperty({
                            "scope": "p.Administration.MyAccount.dataView1",
                            "path": "",
                            "entity": "Administration.Account",
                            "attribute": "Name",
                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                            "isList": false,
                            "validation": null,
                            "formatting": { }
                        })}
                        isPassword={false}
                        placeholder={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                        })}
                        mask={""}
                        readOnlyStyle={"text"}
                        maxLength={100}
                        autocomplete={"on"}
                        submitWhileEditing={false}
                        submitDelay={300}
                        id={DerivedUniqueIdProperty({
                            "widgetId": "p.Administration.MyAccount.textBox5"
                        })} />
                ]}
                caption={ExpressionProperty({
                    "expression": { "expr": { "type": "literal", "value": "User name" }, "args": {} }
                })}
                width={3}
                orientation={"horizontal"}
                hasError={ValidationProperty({
                    "inputWidgetId": "p.Administration.MyAccount.textBox5"
                })}
                labelFor={DerivedUniqueIdProperty({
                    "widgetId": "p.Administration.MyAccount.textBox5"
                })} />,
            <$FormGroup key={"p.Administration.MyAccount.comboBox3$formGroup"}
                $widgetId={"p.Administration.MyAccount.comboBox3$formGroup"}
                class={"mx-name-comboBox3"}
                control={[
                    <$Combobox key={"p.Administration.MyAccount.comboBox3"}
                        $widgetId={"p.Administration.MyAccount.comboBox3"}
                        optionsSourceType={"association"}
                        attributeAssociation={AssociationProperty({
                            "type": "Reference",
                            "entity": "Administration.Account",
                            "path": "",
                            "attribute": "System.User_Language",
                            "endpointEntity": "System.Language",
                            "selectableObjectsId": "p.0",
                            "scope": "p.Administration.MyAccount.dataView1",
                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false }
                        })}
                        optionsSourceAssociationDataSource={DatabaseObjectListProperty({
                            "dataSourceId": "p.0",
                            "entity": "System.Language",
                            "scope": "p.Administration.MyAccount.dataView1",
                            "operationId": "9V4CNzOH8lCWRj4hjgpZcg",
                            "sort": []
                        })}
                        optionsSourceAssociationCaptionType={"attribute"}
                        optionsSourceAssociationCaptionAttribute={ListAttributeProperty({
                            "path": "",
                            "entity": "System.Language",
                            "attribute": "Description",
                            "attributeType": "String",
                            "sortable": true,
                            "filterable": true,
                            "dataSourceId": "p.0",
                            "isList": false
                        })}
                        emptyOptionText={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                        })}
                        filterType={"contains"}
                        noOptionsText={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                        })}
                        clearable={true}
                        optionsSourceAssociationCustomContentType={"no"}
                        showFooter={false}
                        selectionMethod={"checkbox"}
                        selectedItemsStyle={"text"}
                        selectAllButton={false}
                        selectAllButtonCaption={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "Select all" }, "args": {} }
                        })}
                        ariaRequired={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": false }, "args": {} }
                        })}
                        clearButtonAriaLabel={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "Clear selection" }, "args": {} }
                        })}
                        removeValueAriaLabel={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "Remove value" }, "args": {} }
                        })}
                        a11ySelectedValue={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "Selected value:" }, "args": {} }
                        })}
                        a11yOptionsAvailable={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "Number of options available:" }, "args": {} }
                        })}
                        a11yInstructions={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "Use up and down arrow keys to navigate. Press Enter or Space Bar keys to select." }, "args": {} }
                        })}
                        source={"context"}
                        optionsSourceDatabaseCaptionType={"attribute"}
                        optionsSourceDatabaseCustomContentType={"no"}
                        optionsSourceStaticDataSource={[]}
                        staticDataSourceCustomContentType={"no"}
                        customEditability={"default"}
                        customEditabilityExpression={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": false }, "args": {} }
                        })}
                        readOnlyStyle={"text"}
                        ariaLabel={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "Combo box" }, "args": {} }
                        })}
                        lazyLoading={true}
                        loadingType={"spinner"}
                        selectedItemsSorting={"none"}
                        filterInputDebounceInterval={200}
                        id={DerivedUniqueIdProperty({
                            "widgetId": "p.Administration.MyAccount.comboBox3"
                        })} />
                ]}
                caption={ExpressionProperty({
                    "expression": { "expr": { "type": "literal", "value": "Language" }, "args": {} }
                })}
                width={3}
                orientation={"horizontal"}
                hasError={ValidationProperty({
                    "inputWidgetId": "p.Administration.MyAccount.comboBox3"
                })}
                labelFor={DerivedUniqueIdProperty({
                    "widgetId": "p.Administration.MyAccount.comboBox3"
                })} />,
            <$ConditionalVisibilityWrapper key={"p.Administration.MyAccount.microflowTrigger1$visibility"}
                $widgetId={"p.Administration.MyAccount.microflowTrigger1$visibility"}
                visible={ExpressionProperty({
                    "expression": { "expr": { "type": "function", "name": "_hasSomeRole", "parameters": [ { "type": "literal", "value": "Administrator" }, { "type": "literal", "value": "User" } ] }, "args": {} }
                })}
                contents={[
                    <$ActionButton key={"p.Administration.MyAccount.microflowTrigger1"}
                        $widgetId={"p.Administration.MyAccount.microflowTrigger1"}
                        buttonId={"p.Administration.MyAccount.microflowTrigger1"}
                        class={"mx-name-microflowTrigger1"}
                        renderType={"button"}
                        buttonClass={"btn-default"}
                        caption={ExpressionProperty({
                            "expression": { "expr": { "type": "literal", "value": "Change password" }, "args": {} }
                        })}
                        tooltip={TextProperty({
                            "value": ""
                        })}
                        action={ActionProperty({
                            "action": { "type": "callMicroflow", "argMap": { "Account": { "widget": "$Account", "source": "object" } }, "config": { "operationId": "yUjFLrzYjlibUuU1nP7e/w", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                            "abortOnServerValidation": true
                        })} />
                ]} />
        ]}
        hideFooter={false}
        footer={[
            <$ActionButton key={"p.Administration.MyAccount.saveButton1"}
                $widgetId={"p.Administration.MyAccount.saveButton1"}
                buttonId={"p.Administration.MyAccount.saveButton1"}
                class={"mx-name-saveButton1"}
                renderType={"button"}
                buttonClass={"btn-success"}
                caption={ExpressionProperty({
                    "expression": { "expr": { "type": "literal", "value": "Save" }, "args": {} }
                })}
                tooltip={TextProperty({
                    "value": ""
                })}
                action={ActionProperty({
                    "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p.Administration.MyAccount.dataView1", "source": "object" } }, "config": { "operationId": "lpBD4s89F1a6NS6UEmBciw", "closePage": true }, "disabledDuringExecution": true },
                    "abortOnServerValidation": true
                })} />,
            <$ActionButton key={"p.Administration.MyAccount.cancelButton1"}
                $widgetId={"p.Administration.MyAccount.cancelButton1"}
                buttonId={"p.Administration.MyAccount.cancelButton1"}
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
                    "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "3kmCFRwA41+xFCU7r1cwFg", "closePage": true }, "disabledDuringExecution": true },
                    "abortOnServerValidation": true
                })} />
        ]} />
]}</PageFragment>);

export const title = t([
    "My Account"
]);

export const classes = "";

export const autofocus = "desktopOnly";
export const cancelChangesOperationId = "CaO78vNOQl+VJENByF43aw";
export const closeButton = "p.Administration.MyAccount.cancelButton1";
export const style = {};
export const parameters = {
  "$Account": {
    "kind": "object"
  }
};
export const content = { ...parentContent,
    "Atlas_Core.PopupLayout.Main": region$Main,
};
