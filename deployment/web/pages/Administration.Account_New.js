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
import { ListExpressionProperty } from "mendix/ListExpressionProperty";
import { TextProperty } from "mendix/TextProperty";
import { ValidationProperty } from "mendix/ValidationProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import { CheckBox } from "mendix/widgets/web/CheckBox";
import * as ComboboxWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.mjs";
const Combobox = Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "Combobox")?.get() || Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.css";
import { ConditionalVisibilityWrapper } from "mendix/widgets/web/ConditionalVisibilityWrapper";
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import { FormGroup } from "mendix/widgets/web/FormGroup";
import { TextBox } from "mendix/widgets/web/TextBox";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.PopupLayout.js";

const { $Div, $DataView, $FormGroup, $TextBox, $Combobox, $CheckBox, $ConditionalVisibilityWrapper, $ActionButton } = asPluginWidgets({ Div, DataView, FormGroup, TextBox, Combobox, CheckBox, ConditionalVisibilityWrapper, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.Administration.Account_New.layoutGrid1"}
        $widgetId={"p.Administration.Account_New.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.Administration.Account_New.layoutGrid1$row0"}
                $widgetId={"p.Administration.Account_New.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.Administration.Account_New.layoutGrid1$row0$column0"}
                        $widgetId={"p.Administration.Account_New.layoutGrid1$row0$column0"}
                        class={"col-lg col-md col"}
                        content={[
                            <$DataView key={"p.Administration.Account_New.dataView2"}
                                $widgetId={"p.Administration.Account_New.dataView2"}
                                class={"mx-name-dataView2 form-horizontal"}
                                object={AssociationObjectProperty({
                                    "dataSourceId": "p.11",
                                    "scope": "$AccountPasswordData",
                                    "editable": true
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$DataView key={"p.Administration.Account_New.dataView1"}
                                        $widgetId={"p.Administration.Account_New.dataView1"}
                                        class={"mx-name-dataView1 form-horizontal"}
                                        object={AssociationObjectProperty({
                                            "dataSourceId": "p.14",
                                            "scope": "$AccountPasswordData",
                                            "editable": true,
                                            "path": "Administration.AccountPasswordData_Account/Administration.Account",
                                            "operationId": "ltAdVVqgLF2DypXxQ5p2/Q"
                                        })}
                                        emptyMessage={TextProperty({
                                            "value": ""
                                        })}
                                        body={[
                                            <$FormGroup key={"p.Administration.Account_New.textBox6$formGroup"}
                                                $widgetId={"p.Administration.Account_New.textBox6$formGroup"}
                                                class={"mx-name-textBox6 mx-textbox"}
                                                control={[
                                                    <$TextBox key={"p.Administration.Account_New.textBox6"}
                                                        $widgetId={"p.Administration.Account_New.textBox6"}
                                                        inputValue={AttributeProperty({
                                                            "scope": "p.Administration.Account_New.dataView1",
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
                                                            "widgetId": "p.Administration.Account_New.textBox6"
                                                        })} />
                                                ]}
                                                caption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Full name" }, "args": {} }
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p.Administration.Account_New.textBox6"
                                                })}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p.Administration.Account_New.textBox6"
                                                })} />,
                                            <$FormGroup key={"p.Administration.Account_New.textBox9$formGroup"}
                                                $widgetId={"p.Administration.Account_New.textBox9$formGroup"}
                                                class={"mx-name-textBox9 mx-textbox"}
                                                control={[
                                                    <$TextBox key={"p.Administration.Account_New.textBox9"}
                                                        $widgetId={"p.Administration.Account_New.textBox9"}
                                                        inputValue={AttributeProperty({
                                                            "scope": "p.Administration.Account_New.dataView1",
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
                                                            "widgetId": "p.Administration.Account_New.textBox9"
                                                        })} />
                                                ]}
                                                caption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "User name" }, "args": {} }
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p.Administration.Account_New.textBox9"
                                                })}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p.Administration.Account_New.textBox9"
                                                })} />,
                                            <$FormGroup key={"p.Administration.Account_New.comboBox1$formGroup"}
                                                $widgetId={"p.Administration.Account_New.comboBox1$formGroup"}
                                                class={"mx-name-comboBox1"}
                                                control={[
                                                    <$Combobox key={"p.Administration.Account_New.comboBox1"}
                                                        $widgetId={"p.Administration.Account_New.comboBox1"}
                                                        optionsSourceType={"association"}
                                                        attributeAssociation={AssociationProperty({
                                                            "type": "ReferenceSet",
                                                            "entity": "Administration.Account",
                                                            "path": "",
                                                            "attribute": "System.UserRoles",
                                                            "endpointEntity": "System.UserRole",
                                                            "selectableObjectsId": "p.0",
                                                            "scope": "p.Administration.Account_New.dataView1",
                                                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false }
                                                        })}
                                                        optionsSourceAssociationDataSource={DatabaseObjectListProperty({
                                                            "dataSourceId": "p.0",
                                                            "entity": "System.UserRole",
                                                            "scope": "p.Administration.Account_New.dataView1",
                                                            "operationId": "qumDJ0UjPVWtkXkfyteKbg",
                                                            "sort": [
                                                                [
                                                                    "Name",
                                                                    "asc"
                                                                ]
                                                            ],
                                                            "constraints": { "type": "relatedEntity", "left": { "type": "attribute", "attribute": "id", "context": "System.UserRole", "attributeType": "ObjectReference" }, "rightEntity": "System.UserRole", "rightEntityAlias": "System.UserRole1", "right": { "type": "attribute", "attribute": "System.grantableRoles", "context": "System.UserRole1", "attributeType": "ObjectReferenceSet" }, "next": { "type": "relatedEntity", "left": { "type": "attribute", "attribute": "id", "context": "System.UserRole1", "attributeType": "ObjectReference" }, "rightEntity": "System.User", "rightEntityAlias": "System.User", "right": { "type": "attribute", "attribute": "System.UserRoles", "context": "System.User", "attributeType": "ObjectReferenceSet" }, "next": { "type": "function", "name": "=", "parameters": [ { "type": "attribute", "attribute": "id", "context": "System.User", "attributeType": "ObjectReference" }, { "type": "token", "name": "currentUser" } ] } } }
                                                        })}
                                                        optionsSourceAssociationCaptionType={"attribute"}
                                                        optionsSourceAssociationCaptionAttribute={ListAttributeProperty({
                                                            "path": "",
                                                            "entity": "System.UserRole",
                                                            "attribute": "Name",
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
                                                            "widgetId": "p.Administration.Account_New.comboBox1"
                                                        })} />
                                                ]}
                                                caption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "User role(s)" }, "args": {} }
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p.Administration.Account_New.comboBox1"
                                                })}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p.Administration.Account_New.comboBox1"
                                                })} />,
                                            <$FormGroup key={"p.Administration.Account_New.checkBox1$formGroup"}
                                                $widgetId={"p.Administration.Account_New.checkBox1$formGroup"}
                                                class={"mx-name-checkBox1 mx-checkbox"}
                                                control={[
                                                    <$CheckBox key={"p.Administration.Account_New.checkBox1"}
                                                        $widgetId={"p.Administration.Account_New.checkBox1"}
                                                        value={AttributeProperty({
                                                            "scope": "p.Administration.Account_New.dataView1",
                                                            "path": "",
                                                            "entity": "Administration.Account",
                                                            "attribute": "Blocked",
                                                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                            "isList": false,
                                                            "validation": null
                                                        })}
                                                        readOnlyStyle={"text"}
                                                        id={DerivedUniqueIdProperty({
                                                            "widgetId": "p.Administration.Account_New.checkBox1"
                                                        })} />
                                                ]}
                                                caption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Blocked" }, "args": {} }
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p.Administration.Account_New.checkBox1"
                                                })}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p.Administration.Account_New.checkBox1"
                                                })} />,
                                            <$FormGroup key={"p.Administration.Account_New.checkBox2$formGroup"}
                                                $widgetId={"p.Administration.Account_New.checkBox2$formGroup"}
                                                class={"mx-name-checkBox2 mx-checkbox"}
                                                control={[
                                                    <$CheckBox key={"p.Administration.Account_New.checkBox2"}
                                                        $widgetId={"p.Administration.Account_New.checkBox2"}
                                                        value={AttributeProperty({
                                                            "scope": "p.Administration.Account_New.dataView1",
                                                            "path": "",
                                                            "entity": "Administration.Account",
                                                            "attribute": "Active",
                                                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                            "isList": false,
                                                            "validation": null
                                                        })}
                                                        readOnlyStyle={"text"}
                                                        id={DerivedUniqueIdProperty({
                                                            "widgetId": "p.Administration.Account_New.checkBox2"
                                                        })} />
                                                ]}
                                                caption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Active" }, "args": {} }
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p.Administration.Account_New.checkBox2"
                                                })}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p.Administration.Account_New.checkBox2"
                                                })} />,
                                            <$FormGroup key={"p.Administration.Account_New.comboBox3$formGroup"}
                                                $widgetId={"p.Administration.Account_New.comboBox3$formGroup"}
                                                class={"mx-name-comboBox3"}
                                                control={[
                                                    <$Combobox key={"p.Administration.Account_New.comboBox3"}
                                                        $widgetId={"p.Administration.Account_New.comboBox3"}
                                                        optionsSourceType={"association"}
                                                        attributeAssociation={AssociationProperty({
                                                            "type": "Reference",
                                                            "entity": "Administration.Account",
                                                            "path": "",
                                                            "attribute": "System.User_Language",
                                                            "endpointEntity": "System.Language",
                                                            "selectableObjectsId": "p.1",
                                                            "scope": "p.Administration.Account_New.dataView1",
                                                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false }
                                                        })}
                                                        optionsSourceAssociationDataSource={DatabaseObjectListProperty({
                                                            "dataSourceId": "p.1",
                                                            "entity": "System.Language",
                                                            "scope": "p.Administration.Account_New.dataView1",
                                                            "operationId": "twh2vHYQ0leulj5v5+/zqw",
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
                                                            "dataSourceId": "p.1",
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
                                                            "widgetId": "p.Administration.Account_New.comboBox3"
                                                        })} />
                                                ]}
                                                caption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Language" }, "args": {} }
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p.Administration.Account_New.comboBox3"
                                                })}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p.Administration.Account_New.comboBox3"
                                                })} />,
                                            <$FormGroup key={"p.Administration.Account_New.comboBox2$formGroup"}
                                                $widgetId={"p.Administration.Account_New.comboBox2$formGroup"}
                                                class={"mx-name-comboBox2"}
                                                control={[
                                                    <$Combobox key={"p.Administration.Account_New.comboBox2"}
                                                        $widgetId={"p.Administration.Account_New.comboBox2"}
                                                        optionsSourceType={"association"}
                                                        attributeAssociation={AssociationProperty({
                                                            "type": "Reference",
                                                            "entity": "Administration.Account",
                                                            "path": "",
                                                            "attribute": "System.User_TimeZone",
                                                            "endpointEntity": "System.TimeZone",
                                                            "selectableObjectsId": "p.2",
                                                            "scope": "p.Administration.Account_New.dataView1",
                                                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false }
                                                        })}
                                                        optionsSourceAssociationDataSource={DatabaseObjectListProperty({
                                                            "dataSourceId": "p.2",
                                                            "entity": "System.TimeZone",
                                                            "scope": "p.Administration.Account_New.dataView1",
                                                            "operationId": "dEjLdwljqFKRqtZx3LaWYA",
                                                            "sort": [
                                                                [
                                                                    "RawOffset",
                                                                    "asc"
                                                                ],
                                                                [
                                                                    "Description",
                                                                    "asc"
                                                                ]
                                                            ]
                                                        })}
                                                        optionsSourceAssociationCaptionType={"expression"}
                                                        optionsSourceAssociationCaptionExpression={ListExpressionProperty({
                                                            "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "Description" }, "args": { "currentObject": { "widget": "p.Administration.Account_New.comboBox2", "source": "object" } } },
                                                            "dataSourceId": "p.2"
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
                                                            "widgetId": "p.Administration.Account_New.comboBox2"
                                                        })} />
                                                ]}
                                                caption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Time zone" }, "args": {} }
                                                })}
                                                width={3}
                                                orientation={"horizontal"}
                                                hasError={ValidationProperty({
                                                    "inputWidgetId": "p.Administration.Account_New.comboBox2"
                                                })}
                                                labelFor={DerivedUniqueIdProperty({
                                                    "widgetId": "p.Administration.Account_New.comboBox2"
                                                })} />
                                        ]}
                                        hideFooter={true} />,
                                    <$FormGroup key={"p.Administration.Account_New.textBox5$formGroup"}
                                        $widgetId={"p.Administration.Account_New.textBox5$formGroup"}
                                        class={"mx-name-textBox5 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.Administration.Account_New.textBox5"}
                                                $widgetId={"p.Administration.Account_New.textBox5"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.Administration.Account_New.dataView2",
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
                                                    "widgetId": "p.Administration.Account_New.textBox5"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "New password" }, "args": {} }
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.Administration.Account_New.textBox5"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.Administration.Account_New.textBox5"
                                        })} />,
                                    <$FormGroup key={"p.Administration.Account_New.textBox7$formGroup"}
                                        $widgetId={"p.Administration.Account_New.textBox7$formGroup"}
                                        class={"mx-name-textBox7 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.Administration.Account_New.textBox7"}
                                                $widgetId={"p.Administration.Account_New.textBox7"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.Administration.Account_New.dataView2",
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
                                                    "widgetId": "p.Administration.Account_New.textBox7"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Confirm password" }, "args": {} }
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.Administration.Account_New.textBox7"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.Administration.Account_New.textBox7"
                                        })} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ConditionalVisibilityWrapper key={"p.Administration.Account_New.microflowButton1$visibility"}
                                        $widgetId={"p.Administration.Account_New.microflowButton1$visibility"}
                                        visible={ExpressionProperty({
                                            "expression": { "expr": { "type": "function", "name": "_hasSomeRole", "parameters": [ { "type": "literal", "value": "Administrator" } ] }, "args": {} }
                                        })}
                                        contents={[
                                            <$ActionButton key={"p.Administration.Account_New.microflowButton1"}
                                                $widgetId={"p.Administration.Account_New.microflowButton1"}
                                                buttonId={"p.Administration.Account_New.microflowButton1"}
                                                class={"mx-name-microflowButton1"}
                                                renderType={"button"}
                                                buttonClass={"btn-success"}
                                                caption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Save" }, "args": {} }
                                                })}
                                                tooltip={TextProperty({
                                                    "value": ""
                                                })}
                                                action={ActionProperty({
                                                    "action": { "type": "callMicroflow", "argMap": { "AccountPasswordData": { "widget": "$AccountPasswordData", "source": "object" } }, "config": { "operationId": "H8nSmby2LV2F5Eoa4gOZRg", "validate": "view", "allowedRoles": [ "Administrator" ] }, "disabledDuringExecution": false },
                                                    "abortOnServerValidation": true
                                                })} />
                                        ]} />,
                                    <$ActionButton key={"p.Administration.Account_New.cancelButton1"}
                                        $widgetId={"p.Administration.Account_New.cancelButton1"}
                                        buttonId={"p.Administration.Account_New.cancelButton1"}
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
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "83QgBDxRDlSeBUzK1eLp8g", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "New Account"
]);

export const classes = "";

export const autofocus = "desktopOnly";
export const cancelChangesOperationId = "X5/4+1XSM1yyjeV54zkzsQ";
export const closeButton = "p.Administration.Account_New.cancelButton1";
export const style = {};
export const parameters = {
  "$AccountPasswordData": {
    "kind": "object"
  }
};
export const content = { ...parentContent,
    "Atlas_Core.PopupLayout.Main": region$Main,
};
