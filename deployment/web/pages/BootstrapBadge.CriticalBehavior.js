import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AssociationObjectProperty } from "mendix/AssociationObjectProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { MicroflowObjectProperty } from "mendix/MicroflowObjectProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebIconProperty } from "mendix/WebIconProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import { Table } from "mendix/widgets/web/Table";
import { TableRow } from "mendix/widgets/web/TableRow";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Div, $Text, $DataView, $Table, $TableRow, $ActionButton } = asPluginWidgets({ Div, Text, DataView, Table, TableRow, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.BootstrapBadge.CriticalBehavior.layoutGrid1"}
        $widgetId={"p.BootstrapBadge.CriticalBehavior.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.BootstrapBadge.CriticalBehavior.layoutGrid1$row0"}
                $widgetId={"p.BootstrapBadge.CriticalBehavior.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.BootstrapBadge.CriticalBehavior.layoutGrid1$row0$column0"}
                        $widgetId={"p.BootstrapBadge.CriticalBehavior.layoutGrid1$row0$column0"}
                        class={"col-lg-12 col-md-12 col-12"}
                        content={[
                            <$Text key={"p.BootstrapBadge.CriticalBehavior.text7"}
                                $widgetId={"p.BootstrapBadge.CriticalBehavior.text7"}
                                class={"mx-name-text7"}
                                caption={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Critical Behaviour" }, "args": {} }
                                })}
                                renderMode={"h3"} />,
                            <$DataView key={"p.BootstrapBadge.CriticalBehavior.dataView1"}
                                $widgetId={"p.BootstrapBadge.CriticalBehavior.dataView1"}
                                class={"mx-name-dataView1 form-vertical"}
                                object={AssociationObjectProperty({
                                    "dataSourceId": "p.10",
                                    "scope": "$Badge",
                                    "editable": true
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$Table key={"p.BootstrapBadge.CriticalBehavior.table1"}
                                        $widgetId={"p.BootstrapBadge.CriticalBehavior.table1"}
                                        class={"mx-name-table1"}
                                        autoWidth={false}
                                        columnWidths={[
                                            "25%",
                                            "38%",
                                            "37%"
                                        ]}
                                        rows={[
                                            <$TableRow key={"p.BootstrapBadge.CriticalBehavior.table1$row0"}
                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.table1$row0"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": undefined
                                                    },
                                                    {
                                                        "header": true,
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.CriticalBehavior.text3"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.text3"}
                                                                class={"mx-name-text3"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    },
                                                    {
                                                        "header": true,
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.CriticalBehavior.text4"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.text4"}
                                                                class={"mx-name-text4"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Color Label" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.CriticalBehavior.table1$row1"}
                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.table1$row1"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "header": true,
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.CriticalBehavior.text12"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.text12"}
                                                                class={"mx-name-text12"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Data, Label, Style" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$DataView key={"p.BootstrapBadge.CriticalBehavior.dataView19"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.dataView19"}
                                                                class={"mx-name-dataView19 form-horizontal"}
                                                                object={MicroflowObjectProperty({
                                                                    "dataSourceId": "p.25",
                                                                    "scope": "p.BootstrapBadge.CriticalBehavior.dataView1",
                                                                    "editable": true,
                                                                    "operationId": "j8nD9dEcWV2uwzZ4bVKyeQ",
                                                                    "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }
                                                                })}
                                                                emptyMessage={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                hideFooter={true} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$DataView key={"p.BootstrapBadge.CriticalBehavior.dataView21"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.dataView21"}
                                                                class={"mx-name-dataView21 form-horizontal"}
                                                                object={MicroflowObjectProperty({
                                                                    "dataSourceId": "p.28",
                                                                    "scope": "p.BootstrapBadge.CriticalBehavior.dataView1",
                                                                    "editable": true,
                                                                    "operationId": "uEktSfk2Tl2Evsf9F7mnSA",
                                                                    "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }
                                                                })}
                                                                emptyMessage={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                hideFooter={true} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.CriticalBehavior.table1$row2"}
                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.table1$row2"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "header": true,
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.CriticalBehavior.text10"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.text10"}
                                                                class={"mx-name-text10"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Data, Label, no style" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$DataView key={"p.BootstrapBadge.CriticalBehavior.dataView15"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.dataView15"}
                                                                class={"mx-name-dataView15 form-horizontal"}
                                                                object={MicroflowObjectProperty({
                                                                    "dataSourceId": "p.35",
                                                                    "scope": "p.BootstrapBadge.CriticalBehavior.dataView1",
                                                                    "editable": true,
                                                                    "operationId": "glTb1R7bF161NPMQLQQq3g",
                                                                    "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }
                                                                })}
                                                                emptyMessage={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                hideFooter={true} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$DataView key={"p.BootstrapBadge.CriticalBehavior.dataView22"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.dataView22"}
                                                                class={"mx-name-dataView22 form-horizontal"}
                                                                object={MicroflowObjectProperty({
                                                                    "dataSourceId": "p.38",
                                                                    "scope": "p.BootstrapBadge.CriticalBehavior.dataView1",
                                                                    "editable": true,
                                                                    "operationId": "61FVFpLglV6Lo0iRHJvd6Q",
                                                                    "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }
                                                                })}
                                                                emptyMessage={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                hideFooter={true} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.CriticalBehavior.table1$row3"}
                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.table1$row3"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "header": true,
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.CriticalBehavior.text2"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.text2"}
                                                                class={"mx-name-text2"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Data, No Label, No Style" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$DataView key={"p.BootstrapBadge.CriticalBehavior.dataView16"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.dataView16"}
                                                                class={"mx-name-dataView16 form-horizontal"}
                                                                object={MicroflowObjectProperty({
                                                                    "dataSourceId": "p.45",
                                                                    "scope": "p.BootstrapBadge.CriticalBehavior.dataView1",
                                                                    "editable": true,
                                                                    "operationId": "m4SvBslbEF+EtAq12D8sog",
                                                                    "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }
                                                                })}
                                                                emptyMessage={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                hideFooter={true} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$DataView key={"p.BootstrapBadge.CriticalBehavior.dataView23"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.dataView23"}
                                                                class={"mx-name-dataView23 form-horizontal"}
                                                                object={MicroflowObjectProperty({
                                                                    "dataSourceId": "p.48",
                                                                    "scope": "p.BootstrapBadge.CriticalBehavior.dataView1",
                                                                    "editable": true,
                                                                    "operationId": "BFBKvCORnliqR+JOYAKV9Q",
                                                                    "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }
                                                                })}
                                                                emptyMessage={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                hideFooter={true} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.CriticalBehavior.table1$row4"}
                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.table1$row4"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "header": true,
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.CriticalBehavior.text11"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.text11"}
                                                                class={"mx-name-text11"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Data, No Label, Style" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$DataView key={"p.BootstrapBadge.CriticalBehavior.dataView18"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.dataView18"}
                                                                class={"mx-name-dataView18 form-horizontal"}
                                                                object={MicroflowObjectProperty({
                                                                    "dataSourceId": "p.55",
                                                                    "scope": "p.BootstrapBadge.CriticalBehavior.dataView1",
                                                                    "editable": true,
                                                                    "operationId": "KSJtXVZfW1C6TYEeubVb1w",
                                                                    "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }
                                                                })}
                                                                emptyMessage={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                hideFooter={true} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$DataView key={"p.BootstrapBadge.CriticalBehavior.dataView24"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.dataView24"}
                                                                class={"mx-name-dataView24 form-horizontal"}
                                                                object={MicroflowObjectProperty({
                                                                    "dataSourceId": "p.58",
                                                                    "scope": "p.BootstrapBadge.CriticalBehavior.dataView1",
                                                                    "editable": true,
                                                                    "operationId": "+Ngj6RQE0le/s1IQBNtAYg",
                                                                    "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }
                                                                })}
                                                                emptyMessage={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                hideFooter={true} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.CriticalBehavior.table1$row5"}
                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.table1$row5"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "header": true,
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.CriticalBehavior.text8"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.text8"}
                                                                class={"mx-name-text8"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "NoData, NoLabel, No Style, Static label" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$DataView key={"p.BootstrapBadge.CriticalBehavior.dataView17"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.dataView17"}
                                                                class={"mx-name-dataView17 form-horizontal"}
                                                                object={MicroflowObjectProperty({
                                                                    "dataSourceId": "p.65",
                                                                    "scope": "p.BootstrapBadge.CriticalBehavior.dataView1",
                                                                    "editable": true,
                                                                    "operationId": "E27MW3ih9V+jD68zcoaePA",
                                                                    "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }
                                                                })}
                                                                emptyMessage={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                hideFooter={true} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$DataView key={"p.BootstrapBadge.CriticalBehavior.dataView25"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.dataView25"}
                                                                class={"mx-name-dataView25 form-horizontal"}
                                                                object={MicroflowObjectProperty({
                                                                    "dataSourceId": "p.68",
                                                                    "scope": "p.BootstrapBadge.CriticalBehavior.dataView1",
                                                                    "editable": true,
                                                                    "operationId": "SbmFG9YS1F+OX1CymTy1Mg",
                                                                    "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }
                                                                })}
                                                                emptyMessage={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                hideFooter={true} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.CriticalBehavior.table1$row6"}
                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.table1$row6"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "header": true,
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.CriticalBehavior.text1"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.text1"}
                                                                class={"mx-name-text1"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "NoData, Label, Style, Static data" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$DataView key={"p.BootstrapBadge.CriticalBehavior.dataView20"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.dataView20"}
                                                                class={"mx-name-dataView20 form-horizontal"}
                                                                object={MicroflowObjectProperty({
                                                                    "dataSourceId": "p.75",
                                                                    "scope": "p.BootstrapBadge.CriticalBehavior.dataView1",
                                                                    "editable": true,
                                                                    "operationId": "OZb4kDvCz1GXqgBMsZ9Z8g",
                                                                    "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }
                                                                })}
                                                                emptyMessage={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                hideFooter={true} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$DataView key={"p.BootstrapBadge.CriticalBehavior.dataView26"}
                                                                $widgetId={"p.BootstrapBadge.CriticalBehavior.dataView26"}
                                                                class={"mx-name-dataView26 form-horizontal"}
                                                                object={MicroflowObjectProperty({
                                                                    "dataSourceId": "p.78",
                                                                    "scope": "p.BootstrapBadge.CriticalBehavior.dataView1",
                                                                    "editable": true,
                                                                    "operationId": "vJY8kTTrXVmVls+6vIMoTA",
                                                                    "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }
                                                                })}
                                                                emptyMessage={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                hideFooter={true} />
                                                        ]
                                                    }
                                                ]} />
                                        ]} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.BootstrapBadge.CriticalBehavior.saveButton1"}
                                        $widgetId={"p.BootstrapBadge.CriticalBehavior.saveButton1"}
                                        buttonId={"p.BootstrapBadge.CriticalBehavior.saveButton1"}
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
                                            "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p.BootstrapBadge.CriticalBehavior.dataView1", "source": "object" } }, "config": { "operationId": "fky26NHY21uSJhDzK0EXkQ", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />,
                                    <$ActionButton key={"p.BootstrapBadge.CriticalBehavior.cancelButton1"}
                                        $widgetId={"p.BootstrapBadge.CriticalBehavior.cancelButton1"}
                                        buttonId={"p.BootstrapBadge.CriticalBehavior.cancelButton1"}
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
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "wdmp9nq3flegFbdfL0p+PQ", "closePage": true }, "disabledDuringExecution": true },
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
