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
import { RadioButtonGroup } from "mendix/widgets/web/RadioButtonGroup";
import { TextBox } from "mendix/widgets/web/TextBox";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Div, $DataView, $FormGroup, $TextBox, $RadioButtonGroup, $ActionButton } = asPluginWidgets({ Div, DataView, FormGroup, TextBox, RadioButtonGroup, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.BootstrapBadge.Badge_NewEdit.layoutGrid1"}
        $widgetId={"p.BootstrapBadge.Badge_NewEdit.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.BootstrapBadge.Badge_NewEdit.layoutGrid1$row0"}
                $widgetId={"p.BootstrapBadge.Badge_NewEdit.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.BootstrapBadge.Badge_NewEdit.layoutGrid1$row0$column0"}
                        $widgetId={"p.BootstrapBadge.Badge_NewEdit.layoutGrid1$row0$column0"}
                        class={"col-lg-12 col-md-12 col-12"}
                        content={[
                            <$DataView key={"p.BootstrapBadge.Badge_NewEdit.dataView1"}
                                $widgetId={"p.BootstrapBadge.Badge_NewEdit.dataView1"}
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
                                    <$FormGroup key={"p.BootstrapBadge.Badge_NewEdit.textBox6$formGroup"}
                                        $widgetId={"p.BootstrapBadge.Badge_NewEdit.textBox6$formGroup"}
                                        class={"mx-name-textBox6 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.Badge_NewEdit.textBox6"}
                                                $widgetId={"p.BootstrapBadge.Badge_NewEdit.textBox6"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.Badge_NewEdit.dataView1",
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
                                                    "widgetId": "p.BootstrapBadge.Badge_NewEdit.textBox6"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Data" }, "args": {} }
                                        })}
                                        width={4}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.Badge_NewEdit.textBox6"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.Badge_NewEdit.textBox6"
                                        })} />,
                                    <$FormGroup key={"p.BootstrapBadge.Badge_NewEdit.radioButtons1$formGroup"}
                                        $widgetId={"p.BootstrapBadge.Badge_NewEdit.radioButtons1$formGroup"}
                                        class={"mx-name-radioButtons1 mx-radiobuttons inline"}
                                        control={[
                                            <$RadioButtonGroup key={"p.BootstrapBadge.Badge_NewEdit.radioButtons1"}
                                                $widgetId={"p.BootstrapBadge.Badge_NewEdit.radioButtons1"}
                                                value={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.Badge_NewEdit.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "BootstrapStyle",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "validation": null
                                                })}
                                                readOnlyStyle={"text"}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p.BootstrapBadge.Badge_NewEdit.radioButtons1"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Bootstrap style" }, "args": {} }
                                        })}
                                        width={4}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.Badge_NewEdit.radioButtons1"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.Badge_NewEdit.radioButtons1"
                                        })} />,
                                    <$FormGroup key={"p.BootstrapBadge.Badge_NewEdit.textBox5$formGroup"}
                                        $widgetId={"p.BootstrapBadge.Badge_NewEdit.textBox5$formGroup"}
                                        class={"mx-name-textBox5 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.Badge_NewEdit.textBox5"}
                                                $widgetId={"p.BootstrapBadge.Badge_NewEdit.textBox5"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.Badge_NewEdit.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "LabelAttribute",
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
                                                    "widgetId": "p.BootstrapBadge.Badge_NewEdit.textBox5"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Label attribute" }, "args": {} }
                                        })}
                                        width={4}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.Badge_NewEdit.textBox5"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.Badge_NewEdit.textBox5"
                                        })} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.BootstrapBadge.Badge_NewEdit.saveButton1"}
                                        $widgetId={"p.BootstrapBadge.Badge_NewEdit.saveButton1"}
                                        buttonId={"p.BootstrapBadge.Badge_NewEdit.saveButton1"}
                                        class={"mx-name-saveButton1"}
                                        renderType={"button"}
                                        buttonClass={"btn-success"}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Save" }, "args": {} }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Opslaan" }, "args": {} }
                                            })
                                        ])}
                                        tooltip={TextProperty({
                                            "value": ""
                                        })}
                                        action={ActionProperty({
                                            "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p.BootstrapBadge.Badge_NewEdit.dataView1", "source": "object" } }, "config": { "operationId": "1hI8pQtbjlatsj/yjY0vxg", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />,
                                    <$ActionButton key={"p.BootstrapBadge.Badge_NewEdit.cancelButton1"}
                                        $widgetId={"p.BootstrapBadge.Badge_NewEdit.cancelButton1"}
                                        buttonId={"p.BootstrapBadge.Badge_NewEdit.cancelButton1"}
                                        class={"mx-name-cancelButton1"}
                                        renderType={"button"}
                                        buttonClass={"btn-default"}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Cancel" }, "args": {} }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Annuleren" }, "args": {} }
                                            })
                                        ])}
                                        tooltip={TextProperty({
                                            "value": ""
                                        })}
                                        action={ActionProperty({
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "lVKE7DJpoF6wT2U921QI6w", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Edit Badge",
    "Badge Bewerken"
]);

export const classes = "layout-atlas layout-atlas-responsive-default page-form page-form-default";

export const autofocus = "desktopOnly";
export const style = {};
export const parameters = {
  "$Badge": {
    "kind": "object"
  }
};
export const content = { ...parentContent,
    "Atlas_Core.Atlas_Default.Main": region$Main,
};
