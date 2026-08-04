import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AttributeProperty } from "mendix/AttributeProperty";
import { DerivedUniqueIdProperty } from "mendix/DerivedUniqueIdProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { MicroflowObjectProperty } from "mendix/MicroflowObjectProperty";
import { TextProperty } from "mendix/TextProperty";
import { ValidationProperty } from "mendix/ValidationProperty";
import { WebIconProperty } from "mendix/WebIconProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import * as BadgeWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/custom/badge/Badge.mjs";
const Badge = Object.getOwnPropertyDescriptor(BadgeWidgetModule, "Badge")?.get() || Object.getOwnPropertyDescriptor(BadgeWidgetModule, "default")?.get();   
import * as ComboboxWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.mjs";
const Combobox = Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "Combobox")?.get() || Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.css";
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import { FormGroup } from "mendix/widgets/web/FormGroup";
import { Text } from "mendix/widgets/web/Text";
import { TextBox } from "mendix/widgets/web/TextBox";
import { Title } from "mendix/widgets/web/Title";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Title, $DataView, $Div, $FormGroup, $TextBox, $Text, $Badge, $Combobox, $ActionButton } = asPluginWidgets({ Title, DataView, Div, FormGroup, TextBox, Text, Badge, Combobox, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Title key={"p.BootstrapBadge.AttributeType.pageTitle1"}
        $widgetId={"p.BootstrapBadge.AttributeType.pageTitle1"}
        class={"mx-name-pageTitle1"}
        caption={ExpressionProperty({
            "expression": { "expr": { "type": "variable", "variable": "pageTitle" }, "args": {} }
        })} />,
    <$DataView key={"p.BootstrapBadge.AttributeType.dataView1"}
        $widgetId={"p.BootstrapBadge.AttributeType.dataView1"}
        class={"mx-name-dataView1 form-vertical"}
        object={MicroflowObjectProperty({
            "dataSourceId": "p.4",
            "editable": true,
            "operationId": "Q8sfK49R5la/lpOeE65ftA",
            "argMap": {}
        })}
        emptyMessage={TextProperty({
            "value": ""
        })}
        body={[
            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1"}
                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1"}
                class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
                content={[
                    <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row0"}
                        $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row0"}
                        class={"row"}
                        content={[
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row0$column0"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row0$column0"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$FormGroup key={"p.BootstrapBadge.AttributeType.textBox1$formGroup"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.textBox1$formGroup"}
                                        class={"mx-name-textBox1 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.AttributeType.textBox1"}
                                                $widgetId={"p.BootstrapBadge.AttributeType.textBox1"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.AttributeType.dataView1",
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
                                                    "widgetId": "p.BootstrapBadge.AttributeType.textBox1"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Data string" }, "args": {} }
                                        })}
                                        orientation={"vertical"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.AttributeType.textBox1"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.AttributeType.textBox1"
                                        })} />
                                ]} />,
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row0$column1"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row0$column1"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.BootstrapBadge.AttributeType.text3"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.text3"}
                                        class={"mx-name-text3"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "String" }, "args": {} }
                                        })}
                                        renderMode={"span"} />,
                                    <$Badge key={"p.BootstrapBadge.AttributeType.badgeString"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.badgeString"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } }, "config": { "operationId": "dAgZeBY/p1+SP7ieAhoqpg", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-badgeString label-secondary"} />
                                ]} />,
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row0$column2"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row0$column2"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.BootstrapBadge.AttributeType.text6"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.text6"}
                                        class={"mx-name-text6"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "String" }, "args": {} }
                                        })}
                                        renderMode={"span"} />,
                                    <$Badge key={"p.BootstrapBadge.AttributeType.labelString"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.labelString"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } }, "config": { "operationId": "dAgZeBY/p1+SP7ieAhoqpg", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-labelString label-secondary"} />
                                ]} />
                        ]} />,
                    <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row1"}
                        $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row1"}
                        class={"row"}
                        content={[
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row1$column0"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row1$column0"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$FormGroup key={"p.BootstrapBadge.AttributeType.textBox2$formGroup"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.textBox2$formGroup"}
                                        class={"mx-name-textBox2 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.AttributeType.textBox2"}
                                                $widgetId={"p.BootstrapBadge.AttributeType.textBox2"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.AttributeType.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "DataLong",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
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
                                                    "widgetId": "p.BootstrapBadge.AttributeType.textBox2"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Data long" }, "args": {} }
                                        })}
                                        orientation={"vertical"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.AttributeType.textBox2"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.AttributeType.textBox2"
                                        })} />
                                ]} />,
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row1$column1"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row1$column1"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.BootstrapBadge.AttributeType.text1"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.text1"}
                                        class={"mx-name-text1"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Long" }, "args": {} }
                                        })}
                                        renderMode={"span"} />,
                                    <$Badge key={"p.BootstrapBadge.AttributeType.badgeLong"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.badgeLong"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "DataLong" }, { "type": "literal", "value": "{}" } ] }, "args": { "currentObject": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } }, "config": { "operationId": "dAgZeBY/p1+SP7ieAhoqpg", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-badgeLong label-secondary"} />
                                ]} />,
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row1$column2"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row1$column2"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.BootstrapBadge.AttributeType.text7"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.text7"}
                                        class={"mx-name-text7"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Long" }, "args": {} }
                                        })}
                                        renderMode={"span"} />,
                                    <$Badge key={"p.BootstrapBadge.AttributeType.labelLong"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.labelLong"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "DataLong" }, { "type": "literal", "value": "{}" } ] }, "args": { "currentObject": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } }, "config": { "operationId": "dAgZeBY/p1+SP7ieAhoqpg", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-labelLong label-secondary"} />
                                ]} />
                        ]} />,
                    <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row2"}
                        $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row2"}
                        class={"row"}
                        content={[
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row2$column0"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row2$column0"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$FormGroup key={"p.BootstrapBadge.AttributeType.textBox5$formGroup"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.textBox5$formGroup"}
                                        class={"mx-name-textBox5 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.AttributeType.textBox5"}
                                                $widgetId={"p.BootstrapBadge.AttributeType.textBox5"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.AttributeType.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "DataInteger",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
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
                                                    "widgetId": "p.BootstrapBadge.AttributeType.textBox5"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Data integer" }, "args": {} }
                                        })}
                                        orientation={"vertical"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.AttributeType.textBox5"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.AttributeType.textBox5"
                                        })} />
                                ]} />,
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row2$column1"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row2$column1"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.BootstrapBadge.AttributeType.text4"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.text4"}
                                        class={"mx-name-text4"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Integer" }, "args": {} }
                                        })}
                                        renderMode={"span"} />,
                                    <$Badge key={"p.BootstrapBadge.AttributeType.badgeInteger"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.badgeInteger"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "DataInteger" }, { "type": "literal", "value": "{}" } ] }, "args": { "currentObject": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } }, "config": { "operationId": "dAgZeBY/p1+SP7ieAhoqpg", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-badgeInteger label-secondary"} />
                                ]} />,
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row2$column2"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row2$column2"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.BootstrapBadge.AttributeType.text8"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.text8"}
                                        class={"mx-name-text8"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Integer" }, "args": {} }
                                        })}
                                        renderMode={"span"} />,
                                    <$Badge key={"p.BootstrapBadge.AttributeType.labelInteger"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.labelInteger"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "DataInteger" }, { "type": "literal", "value": "{}" } ] }, "args": { "currentObject": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } }, "config": { "operationId": "dAgZeBY/p1+SP7ieAhoqpg", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-labelInteger label-secondary"} />
                                ]} />
                        ]} />,
                    <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row3"}
                        $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row3"}
                        class={"row"}
                        content={[
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row3$column0"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row3$column0"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$FormGroup key={"p.BootstrapBadge.AttributeType.textBox3$formGroup"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.textBox3$formGroup"}
                                        class={"mx-name-textBox3 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.AttributeType.textBox3"}
                                                $widgetId={"p.BootstrapBadge.AttributeType.textBox3"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.AttributeType.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "DataDecimal",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
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
                                                    "widgetId": "p.BootstrapBadge.AttributeType.textBox3"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Data decimal" }, "args": {} }
                                        })}
                                        orientation={"vertical"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.AttributeType.textBox3"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.AttributeType.textBox3"
                                        })} />
                                ]} />,
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row3$column1"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row3$column1"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.BootstrapBadge.AttributeType.text5"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.text5"}
                                        class={"mx-name-text5"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Decimal" }, "args": {} }
                                        })}
                                        renderMode={"span"} />,
                                    <$Badge key={"p.BootstrapBadge.AttributeType.badgeDecimal"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.badgeDecimal"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "DataDecimal" }, { "type": "literal", "value": "{}" } ] }, "args": { "currentObject": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } }, "config": { "operationId": "dAgZeBY/p1+SP7ieAhoqpg", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-badgeDecimal label-secondary"} />
                                ]} />,
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row3$column2"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row3$column2"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.BootstrapBadge.AttributeType.text9"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.text9"}
                                        class={"mx-name-text9"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Decimal" }, "args": {} }
                                        })}
                                        renderMode={"span"} />,
                                    <$Badge key={"p.BootstrapBadge.AttributeType.labelDecimal"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.labelDecimal"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "DataDecimal" }, { "type": "literal", "value": "{}" } ] }, "args": { "currentObject": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } }, "config": { "operationId": "dAgZeBY/p1+SP7ieAhoqpg", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-labelDecimal label-secondary"} />
                                ]} />
                        ]} />,
                    <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row4"}
                        $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row4"}
                        class={"row"}
                        content={[
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row4$column0"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row4$column0"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$FormGroup key={"p.BootstrapBadge.AttributeType.dropDown1$formGroup"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.dropDown1$formGroup"}
                                        class={"mx-name-dropDown1"}
                                        control={[
                                            <$Combobox key={"p.BootstrapBadge.AttributeType.dropDown1"}
                                                $widgetId={"p.BootstrapBadge.AttributeType.dropDown1"}
                                                source={"context"}
                                                optionsSourceType={"enumeration"}
                                                attributeEnumeration={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.AttributeType.dataView1",
                                                    "path": "",
                                                    "entity": "BootstrapBadge.Badge",
                                                    "attribute": "BootstrapStyle",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false
                                                })}
                                                optionsSourceAssociationCaptionType={"attribute"}
                                                optionsSourceDatabaseCaptionType={"attribute"}
                                                optionsSourceStaticDataSource={[]}
                                                emptyOptionText={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                noOptionsText={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                clearable={true}
                                                optionsSourceAssociationCustomContentType={"no"}
                                                optionsSourceDatabaseCustomContentType={"no"}
                                                staticDataSourceCustomContentType={"no"}
                                                showFooter={false}
                                                selectionMethod={"checkbox"}
                                                selectedItemsStyle={"text"}
                                                selectAllButton={false}
                                                selectAllButtonCaption={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Select all" }, "args": {} }
                                                    }),
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Selecteer alles" }, "args": {} }
                                                    })
                                                ])}
                                                customEditability={"default"}
                                                customEditabilityExpression={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": false }, "args": {} }
                                                })}
                                                readOnlyStyle={"text"}
                                                ariaRequired={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": false }, "args": {} }
                                                })}
                                                ariaLabel={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Combo box" }, "args": {} }
                                                    }),
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Keuzelijst" }, "args": {} }
                                                    })
                                                ])}
                                                clearButtonAriaLabel={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Clear selection" }, "args": {} }
                                                    }),
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Selectie wissen" }, "args": {} }
                                                    })
                                                ])}
                                                removeValueAriaLabel={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Remove value" }, "args": {} }
                                                    }),
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Waarde verwijderen" }, "args": {} }
                                                    })
                                                ])}
                                                a11ySelectedValue={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Selected value:" }, "args": {} }
                                                    }),
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Geselecteerde waarde:" }, "args": {} }
                                                    })
                                                ])}
                                                a11yOptionsAvailable={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Number of options available:" }, "args": {} }
                                                    }),
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Aantal beschikbare opties:" }, "args": {} }
                                                    })
                                                ])}
                                                a11yInstructions={t([
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Use up and down arrow keys to navigate. Press Enter or Space Bar keys to select." }, "args": {} }
                                                    }),
                                                    ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "Gebruik de pijltjestoetsen (omhoog en omlaag) om te navigeren. Druk op Enter of de spatiebalk om de waarde te selecteren." }, "args": {} }
                                                    })
                                                ])}
                                                lazyLoading={true}
                                                loadingType={"spinner"}
                                                selectedItemsSorting={"none"}
                                                filterType={"contains"}
                                                filterInputDebounceInterval={200}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p.BootstrapBadge.AttributeType.dropDown1"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Data Enum" }, "args": {} }
                                        })}
                                        orientation={"vertical"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.AttributeType.dropDown1"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.AttributeType.dropDown1"
                                        })} />
                                ]} />,
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row4$column1"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row4$column1"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.BootstrapBadge.AttributeType.text2"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.text2"}
                                        class={"mx-name-text2"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Enum" }, "args": {} }
                                        })}
                                        renderMode={"span"} />,
                                    <$Badge key={"p.BootstrapBadge.AttributeType.badgeEnum"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.badgeEnum"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "function", "name": "getCaption", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "BootstrapStyle" }, { "type": "literal", "value": "BootstrapBadge.bootstrapStyle" } ] }, "args": { "currentObject": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } }, "config": { "operationId": "dAgZeBY/p1+SP7ieAhoqpg", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-badgeEnum label-secondary"} />
                                ]} />,
                            <$Div key={"p.BootstrapBadge.AttributeType.layoutGrid1$row4$column2"}
                                $widgetId={"p.BootstrapBadge.AttributeType.layoutGrid1$row4$column2"}
                                class={"col-lg-4 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.BootstrapBadge.AttributeType.text10"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.text10"}
                                        class={"mx-name-text10"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Enum" }, "args": {} }
                                        })}
                                        renderMode={"span"} />,
                                    <$Badge key={"p.BootstrapBadge.AttributeType.labelEnum"}
                                        $widgetId={"p.BootstrapBadge.AttributeType.labelEnum"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "function", "name": "getCaption", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "BootstrapStyle" }, { "type": "literal", "value": "BootstrapBadge.bootstrapStyle" } ] }, "args": { "currentObject": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } }, "config": { "operationId": "dAgZeBY/p1+SP7ieAhoqpg", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-labelEnum label-secondary"} />
                                ]} />
                        ]} />
                ]} />
        ]}
        hideFooter={false}
        footer={[
            <$ActionButton key={"p.BootstrapBadge.AttributeType.saveButton1"}
                $widgetId={"p.BootstrapBadge.AttributeType.saveButton1"}
                buttonId={"p.BootstrapBadge.AttributeType.saveButton1"}
                class={"mx-name-saveButton1"}
                renderType={"button"}
                buttonClass={"btn-default"}
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
                icon={WebIconProperty({
                    "icon": { "type": "image", "iconUrl": "img/System$Images$Save.png" }
                })}
                action={ActionProperty({
                    "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p.BootstrapBadge.AttributeType.dataView1", "source": "object" } }, "config": { "operationId": "OwlqMvtkGl6x1M1o7dIpYQ", "closePage": true }, "disabledDuringExecution": true },
                    "abortOnServerValidation": true
                })} />,
            <$ActionButton key={"p.BootstrapBadge.AttributeType.cancelButton1"}
                $widgetId={"p.BootstrapBadge.AttributeType.cancelButton1"}
                buttonId={"p.BootstrapBadge.AttributeType.cancelButton1"}
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
                icon={WebIconProperty({
                    "icon": { "type": "image", "iconUrl": "img/System$Images$Cancel.png" }
                })}
                action={ActionProperty({
                    "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "DJc3tujqxlKP9JP22qyD4w", "closePage": true }, "disabledDuringExecution": true },
                    "abortOnServerValidation": true
                })} />
        ]} />
]}</PageFragment>);

export const title = t([
    "DataType",
    "Thuis"
]);

export const classes = "layout-atlas layout-atlas-responsive-default";

export const autofocus = "desktopOnly";
export const url = "/p/dataTypes";
export const style = {};
export const parameters = {};
export const content = { ...parentContent,
    "Atlas_Core.Atlas_Default.Main": region$Main,
};
