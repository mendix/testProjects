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
    <$Div key={"p.BootstrapBadge.ShowFullPage.layoutGrid1"}
        $widgetId={"p.BootstrapBadge.ShowFullPage.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.BootstrapBadge.ShowFullPage.layoutGrid1$row0"}
                $widgetId={"p.BootstrapBadge.ShowFullPage.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.BootstrapBadge.ShowFullPage.layoutGrid1$row0$column0"}
                        $widgetId={"p.BootstrapBadge.ShowFullPage.layoutGrid1$row0$column0"}
                        class={"col-lg-12 col-md-12 col-12"}
                        content={[
                            <$DataView key={"p.BootstrapBadge.ShowFullPage.dataView1"}
                                $widgetId={"p.BootstrapBadge.ShowFullPage.dataView1"}
                                class={"mx-name-dataView1 form-vertical"}
                                object={AssociationObjectProperty({
                                    "dataSourceId": "p.8",
                                    "scope": "$Badge",
                                    "editable": false
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$FormGroup key={"p.BootstrapBadge.ShowFullPage.textBox6$formGroup"}
                                        $widgetId={"p.BootstrapBadge.ShowFullPage.textBox6$formGroup"}
                                        class={"mx-name-textBox6 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.ShowFullPage.textBox6"}
                                                $widgetId={"p.BootstrapBadge.ShowFullPage.textBox6"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.ShowFullPage.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "DataString",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "isEditable": { "expr": { "type": "literal", "value": false }, "args": {} },
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
                                                    "widgetId": "p.BootstrapBadge.ShowFullPage.textBox6"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Data string" }, "args": {} }
                                        })}
                                        orientation={"vertical"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.ShowFullPage.textBox6"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.ShowFullPage.textBox6"
                                        })} />,
                                    <$FormGroup key={"p.BootstrapBadge.ShowFullPage.radioButtons1$formGroup"}
                                        $widgetId={"p.BootstrapBadge.ShowFullPage.radioButtons1$formGroup"}
                                        class={"mx-name-radioButtons1 mx-radiobuttons inline"}
                                        control={[
                                            <$RadioButtonGroup key={"p.BootstrapBadge.ShowFullPage.radioButtons1"}
                                                $widgetId={"p.BootstrapBadge.ShowFullPage.radioButtons1"}
                                                value={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.ShowFullPage.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "BootstrapStyle",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "isEditable": { "expr": { "type": "literal", "value": false }, "args": {} },
                                                    "validation": null
                                                })}
                                                readOnlyStyle={"text"}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p.BootstrapBadge.ShowFullPage.radioButtons1"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Bootstrap style" }, "args": {} }
                                        })}
                                        orientation={"vertical"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.ShowFullPage.radioButtons1"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.ShowFullPage.radioButtons1"
                                        })} />,
                                    <$FormGroup key={"p.BootstrapBadge.ShowFullPage.textBox7$formGroup"}
                                        $widgetId={"p.BootstrapBadge.ShowFullPage.textBox7$formGroup"}
                                        class={"mx-name-textBox7 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.ShowFullPage.textBox7"}
                                                $widgetId={"p.BootstrapBadge.ShowFullPage.textBox7"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.ShowFullPage.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "LabelAttribute",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "isEditable": { "expr": { "type": "literal", "value": false }, "args": {} },
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
                                                    "widgetId": "p.BootstrapBadge.ShowFullPage.textBox7"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Label attribute" }, "args": {} }
                                        })}
                                        orientation={"vertical"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.ShowFullPage.textBox7"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.ShowFullPage.textBox7"
                                        })} />,
                                    <$FormGroup key={"p.BootstrapBadge.ShowFullPage.textBox8$formGroup"}
                                        $widgetId={"p.BootstrapBadge.ShowFullPage.textBox8$formGroup"}
                                        class={"mx-name-textBox8 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.ShowFullPage.textBox8"}
                                                $widgetId={"p.BootstrapBadge.ShowFullPage.textBox8"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.ShowFullPage.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "DataLong",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "isEditable": { "expr": { "type": "literal", "value": false }, "args": {} },
                                                    "validation": null,
                                                    "formatting": {
                                                        "numberFormat": {
                                                            "groupDigits": false
                                                        }
                                                    }
                                                })}
                                                isPassword={false}
                                                placeholder={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                mask={""}
                                                readOnlyStyle={"text"}
                                                autocomplete={"on"}
                                                submitWhileEditing={false}
                                                submitDelay={300}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p.BootstrapBadge.ShowFullPage.textBox8"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Data long" }, "args": {} }
                                        })}
                                        orientation={"vertical"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.ShowFullPage.textBox8"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.ShowFullPage.textBox8"
                                        })} />,
                                    <$FormGroup key={"p.BootstrapBadge.ShowFullPage.textBox9$formGroup"}
                                        $widgetId={"p.BootstrapBadge.ShowFullPage.textBox9$formGroup"}
                                        class={"mx-name-textBox9 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.ShowFullPage.textBox9"}
                                                $widgetId={"p.BootstrapBadge.ShowFullPage.textBox9"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.ShowFullPage.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "DataInteger",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "isEditable": { "expr": { "type": "literal", "value": false }, "args": {} },
                                                    "validation": null,
                                                    "formatting": {
                                                        "numberFormat": {
                                                            "groupDigits": false
                                                        }
                                                    }
                                                })}
                                                isPassword={false}
                                                placeholder={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                mask={""}
                                                readOnlyStyle={"text"}
                                                autocomplete={"on"}
                                                submitWhileEditing={false}
                                                submitDelay={300}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p.BootstrapBadge.ShowFullPage.textBox9"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Data integer" }, "args": {} }
                                        })}
                                        orientation={"vertical"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.ShowFullPage.textBox9"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.ShowFullPage.textBox9"
                                        })} />,
                                    <$FormGroup key={"p.BootstrapBadge.ShowFullPage.textBox10$formGroup"}
                                        $widgetId={"p.BootstrapBadge.ShowFullPage.textBox10$formGroup"}
                                        class={"mx-name-textBox10 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.ShowFullPage.textBox10"}
                                                $widgetId={"p.BootstrapBadge.ShowFullPage.textBox10"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.ShowFullPage.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "DataDecimal",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "isEditable": { "expr": { "type": "literal", "value": false }, "args": {} },
                                                    "validation": null,
                                                    "formatting": {
                                                        "numberFormat": {
                                                            "groupDigits": false,
                                                            "decimalPrecision": 2
                                                        }
                                                    }
                                                })}
                                                isPassword={false}
                                                placeholder={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                mask={""}
                                                readOnlyStyle={"text"}
                                                autocomplete={"on"}
                                                submitWhileEditing={false}
                                                submitDelay={300}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p.BootstrapBadge.ShowFullPage.textBox10"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Data decimal" }, "args": {} }
                                        })}
                                        orientation={"vertical"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.ShowFullPage.textBox10"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.ShowFullPage.textBox10"
                                        })} />,
                                    <$FormGroup key={"p.BootstrapBadge.ShowFullPage.textBox5$formGroup"}
                                        $widgetId={"p.BootstrapBadge.ShowFullPage.textBox5$formGroup"}
                                        class={"mx-name-textBox5 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.ShowFullPage.textBox5"}
                                                $widgetId={"p.BootstrapBadge.ShowFullPage.textBox5"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.ShowFullPage.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "DefaultValue",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "isEditable": { "expr": { "type": "literal", "value": false }, "args": {} },
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
                                                    "widgetId": "p.BootstrapBadge.ShowFullPage.textBox5"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Default value" }, "args": {} }
                                        })}
                                        orientation={"vertical"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.ShowFullPage.textBox5"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.ShowFullPage.textBox5"
                                        })} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.BootstrapBadge.ShowFullPage.actionButton2"}
                                        $widgetId={"p.BootstrapBadge.ShowFullPage.actionButton2"}
                                        buttonId={"p.BootstrapBadge.ShowFullPage.actionButton2"}
                                        class={"mx-name-actionButton2"}
                                        renderType={"button"}
                                        buttonClass={"btn-default"}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Close" }, "args": {} }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Annuleren" }, "args": {} }
                                            })
                                        ])}
                                        tooltip={TextProperty({
                                            "value": ""
                                        })}
                                        action={ActionProperty({
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "oCCXWLULylqq/8gmigSvQw", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Page Title",
    "Page Title"
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
