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
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import { FormGroup } from "mendix/widgets/web/FormGroup";
import { Text } from "mendix/widgets/web/Text";
import { TextBox } from "mendix/widgets/web/TextBox";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/BootstrapBadge.PopupPageLayout.js";

const { $Div, $DataView, $Text, $FormGroup, $TextBox, $ActionButton } = asPluginWidgets({ Div, DataView, Text, FormGroup, TextBox, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.BootstrapBadge.WidgetPopup.layoutGrid1"}
        $widgetId={"p.BootstrapBadge.WidgetPopup.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.BootstrapBadge.WidgetPopup.layoutGrid1$row0"}
                $widgetId={"p.BootstrapBadge.WidgetPopup.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.BootstrapBadge.WidgetPopup.layoutGrid1$row0$column0"}
                        $widgetId={"p.BootstrapBadge.WidgetPopup.layoutGrid1$row0$column0"}
                        class={"col-lg-12 col-md-12 col-12"}
                        content={[
                            <$DataView key={"p.BootstrapBadge.WidgetPopup.dataView1"}
                                $widgetId={"p.BootstrapBadge.WidgetPopup.dataView1"}
                                class={"mx-name-dataView1 form-horizontal"}
                                object={AssociationObjectProperty({
                                    "dataSourceId": "p.8",
                                    "scope": "$Badge",
                                    "editable": true
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$Text key={"p.BootstrapBadge.WidgetPopup.text4"}
                                        $widgetId={"p.BootstrapBadge.WidgetPopup.text4"}
                                        class={"mx-name-text4"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "PopUp Page" }, "args": {} }
                                        })}
                                        renderMode={"h1"} />,
                                    <$FormGroup key={"p.BootstrapBadge.WidgetPopup.textBox1$formGroup"}
                                        $widgetId={"p.BootstrapBadge.WidgetPopup.textBox1$formGroup"}
                                        class={"mx-name-textBox1 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.WidgetPopup.textBox1"}
                                                $widgetId={"p.BootstrapBadge.WidgetPopup.textBox1"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.WidgetPopup.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "DataString",
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
                                                    "widgetId": "p.BootstrapBadge.WidgetPopup.textBox1"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Data string" }, "args": {} }
                                        })}
                                        width={4}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.WidgetPopup.textBox1"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.WidgetPopup.textBox1"
                                        })} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.BootstrapBadge.WidgetPopup.closePageButton1"}
                                        $widgetId={"p.BootstrapBadge.WidgetPopup.closePageButton1"}
                                        buttonId={"p.BootstrapBadge.WidgetPopup.closePageButton1"}
                                        class={"mx-name-closePageButton1"}
                                        renderType={"button"}
                                        buttonClass={"btn-default"}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Close page" }, "args": {} }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Pagina sluiten" }, "args": {} }
                                            })
                                        ])}
                                        tooltip={TextProperty({
                                            "value": ""
                                        })}
                                        action={ActionProperty({
                                            "action": { "type": "closePage", "argMap": {}, "config": {}, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "OnClick Popup Page",
    "Badge Bewerken"
]);

export const classes = "page-form page-form-default";

export const autofocus = "desktopOnly";
export const cancelChangesOperationId = "4b8EkIJffV2nUnA+7RzvEg";
export const style = {};
export const parameters = {
  "$Badge": {
    "kind": "object"
  }
};
export const content = { ...parentContent,
    "BootstrapBadge.PopupPageLayout.Main": region$Main,
};
