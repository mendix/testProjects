import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { DatabaseObjectListProperty } from "mendix/DatabaseObjectListProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { TemplatedWidgetProperty } from "mendix/TemplatedWidgetProperty";
import { TextProperty } from "mendix/TextProperty";

import * as BadgeWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/custom/badge/Badge.mjs";
const Badge = Object.getOwnPropertyDescriptor(BadgeWidgetModule, "Badge")?.get() || Object.getOwnPropertyDescriptor(BadgeWidgetModule, "default")?.get();   
import { Div } from "mendix/widgets/web/Div";
import { Fragment } from "mendix/widgets/web/Fragment";
import { ListView } from "mendix/widgets/web/ListView";
import { TabContainer } from "mendix/widgets/web/TabContainer";
import { Table } from "mendix/widgets/web/Table";
import { TableRow } from "mendix/widgets/web/TableRow";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Div, $TabContainer, $Table, $TableRow, $Text, $ListView, $Fragment, $Badge } = asPluginWidgets({ Div, TabContainer, Table, TableRow, Text, ListView, Fragment, Badge });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.BootstrapBadge.TabContainer.layoutGrid1"}
        $widgetId={"p.BootstrapBadge.TabContainer.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.BootstrapBadge.TabContainer.layoutGrid1$row0"}
                $widgetId={"p.BootstrapBadge.TabContainer.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.BootstrapBadge.TabContainer.layoutGrid1$row0$column0"}
                        $widgetId={"p.BootstrapBadge.TabContainer.layoutGrid1$row0$column0"}
                        class={"col-lg-12 col-md-12 col-12"}
                        content={[
                            <$TabContainer key={"p.BootstrapBadge.TabContainer.tabControl1"}
                                $widgetId={"p.BootstrapBadge.TabContainer.tabControl1"}
                                class={"mx-name-tabControl1"}
                                widgetId={"p.BootstrapBadge.TabContainer.tabControl1"}
                                defaultTab={0}
                                tabs={[
                                    {
                                        "name": "tabPage1",
                                        "caption": TextProperty({
                                            "value": "Tab 1"
                                        }),
                                        "isDelayed": false,
                                        "refreshOnShow": false,
                                        "content": [
                                            <$Table key={"p.BootstrapBadge.TabContainer.table1"}
                                                $widgetId={"p.BootstrapBadge.TabContainer.table1"}
                                                class={"mx-name-table1"}
                                                autoWidth={false}
                                                columnWidths={[
                                                    "50%",
                                                    "50%"
                                                ]}
                                                rows={[
                                                    <$TableRow key={"p.BootstrapBadge.TabContainer.table1$row0"}
                                                        $widgetId={"p.BootstrapBadge.TabContainer.table1$row0"}
                                                        class={""}
                                                        cells={[
                                                            {
                                                                "header": true,
                                                                "class": "",
                                                                "content": [
                                                                    <$Text key={"p.BootstrapBadge.TabContainer.text1"}
                                                                        $widgetId={"p.BootstrapBadge.TabContainer.text1"}
                                                                        class={"mx-name-text1"}
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
                                                                    <$Text key={"p.BootstrapBadge.TabContainer.text2"}
                                                                        $widgetId={"p.BootstrapBadge.TabContainer.text2"}
                                                                        class={"mx-name-text2"}
                                                                        caption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "Color Label" }, "args": {} }
                                                                        })}
                                                                        renderMode={"span"} />
                                                                ]
                                                            }
                                                        ]} />,
                                                    <$TableRow key={"p.BootstrapBadge.TabContainer.table1$row1"}
                                                        $widgetId={"p.BootstrapBadge.TabContainer.table1$row1"}
                                                        class={""}
                                                        cells={[
                                                            {
                                                                "class": "",
                                                                "content": [
                                                                    <$ListView key={"p.BootstrapBadge.TabContainer.listView1"}
                                                                        $widgetId={"p.BootstrapBadge.TabContainer.listView1"}
                                                                        class={"mx-name-listView1"}
                                                                        listValue={DatabaseObjectListProperty({
                                                                            "dataSourceId": "p.0",
                                                                            "entity": "BootstrapBadge.Badge",
                                                                            "operationId": "i9xFaYPmRFecMAOyBBbuUA",
                                                                            "sort": [],
                                                                            "constraints": { "type": "function", "name": "or", "parameters": [ { "type": "function", "name": "=", "parameters": [ { "type": "attribute", "attribute": "BootstrapStyle", "context": "BootstrapBadge.Badge", "attributeType": "#BootstrapBadge.bootstrapStyle" }, { "type": "literal", "value": "primary" } ] }, { "type": "function", "name": "=", "parameters": [ { "type": "attribute", "attribute": "BootstrapStyle", "context": "BootstrapBadge.Badge", "attributeType": "#BootstrapBadge.bootstrapStyle" }, { "type": "literal", "value": "warning" } ] } ] }
                                                                        })}
                                                                        itemTemplate={TemplatedWidgetProperty({
                                                                            "dataSourceId": "p.0",
                                                                            "editable": true,
                                                                            "children": () => [
                                                                                <$Fragment key={"p.BootstrapBadge.TabContainer.snippetCallWidget1"}
                                                                                    $widgetId={"p.BootstrapBadge.TabContainer.snippetCallWidget1"}
                                                                                    content={[
                                                                                        <$Badge key={"p.BootstrapBadge.BadgeSnippetHorizontal.badgeV23"}
                                                                                            $widgetId={"p.BootstrapBadge.BadgeSnippetHorizontal.badgeV23"}
                                                                                            type={"badge"}
                                                                                            value={t([
                                                                                                ExpressionProperty({
                                                                                                    "expression": { "expr": { "type": "variable", "variable": "Badge", "path": "DataString" }, "args": { "Badge": { "widget": "p.BootstrapBadge.TabContainer.listView1", "source": "object" } } }
                                                                                                }),
                                                                                                ExpressionProperty({
                                                                                                    "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                                                })
                                                                                            ])}
                                                                                            class={"mx-name-badgeV23"} />
                                                                                    ]} />
                                                                            ]
                                                                        })}
                                                                        pageSize={0} />
                                                                ]
                                                            },
                                                            {
                                                                "class": "",
                                                                "content": [
                                                                    <$ListView key={"p.BootstrapBadge.TabContainer.listView3"}
                                                                        $widgetId={"p.BootstrapBadge.TabContainer.listView3"}
                                                                        class={"mx-name-listView3"}
                                                                        listValue={DatabaseObjectListProperty({
                                                                            "dataSourceId": "p.1",
                                                                            "entity": "BootstrapBadge.Badge",
                                                                            "operationId": "ndHvvFQaqViv6kkn8AS7VA",
                                                                            "sort": [],
                                                                            "constraints": { "type": "function", "name": "or", "parameters": [ { "type": "function", "name": "=", "parameters": [ { "type": "attribute", "attribute": "BootstrapStyle", "context": "BootstrapBadge.Badge", "attributeType": "#BootstrapBadge.bootstrapStyle" }, { "type": "literal", "value": "primary" } ] }, { "type": "function", "name": "=", "parameters": [ { "type": "attribute", "attribute": "BootstrapStyle", "context": "BootstrapBadge.Badge", "attributeType": "#BootstrapBadge.bootstrapStyle" }, { "type": "literal", "value": "warning" } ] } ] }
                                                                        })}
                                                                        itemTemplate={TemplatedWidgetProperty({
                                                                            "dataSourceId": "p.1",
                                                                            "editable": true,
                                                                            "children": () => [
                                                                                <$Fragment key={"p.BootstrapBadge.TabContainer.snippetCallWidget3"}
                                                                                    $widgetId={"p.BootstrapBadge.TabContainer.snippetCallWidget3"}
                                                                                    content={[
                                                                                        <$Badge key={"p.BootstrapBadge.ColorLabelSnippetHorizontal.badgeV23"}
                                                                                            $widgetId={"p.BootstrapBadge.ColorLabelSnippetHorizontal.badgeV23"}
                                                                                            type={"label"}
                                                                                            value={t([
                                                                                                ExpressionProperty({
                                                                                                    "expression": { "expr": { "type": "variable", "variable": "Badge", "path": "DataString" }, "args": { "Badge": { "widget": "p.BootstrapBadge.TabContainer.listView3", "source": "object" } } }
                                                                                                }),
                                                                                                ExpressionProperty({
                                                                                                    "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                                                })
                                                                                            ])}
                                                                                            class={"mx-name-badgeV23"} />
                                                                                    ]} />
                                                                            ]
                                                                        })}
                                                                        pageSize={0} />
                                                                ]
                                                            }
                                                        ]} />
                                                ]} />
                                        ]
                                    },
                                    {
                                        "name": "tabPage2",
                                        "caption": TextProperty({
                                            "value": "Tab 2"
                                        }),
                                        "isDelayed": false,
                                        "refreshOnShow": false,
                                        "content": [
                                            <$Table key={"p.BootstrapBadge.TabContainer.table2"}
                                                $widgetId={"p.BootstrapBadge.TabContainer.table2"}
                                                class={"mx-name-table2"}
                                                autoWidth={false}
                                                columnWidths={[
                                                    "50%",
                                                    "50%"
                                                ]}
                                                rows={[
                                                    <$TableRow key={"p.BootstrapBadge.TabContainer.table2$row0"}
                                                        $widgetId={"p.BootstrapBadge.TabContainer.table2$row0"}
                                                        class={""}
                                                        cells={[
                                                            {
                                                                "header": true,
                                                                "class": "",
                                                                "content": [
                                                                    <$Text key={"p.BootstrapBadge.TabContainer.text3"}
                                                                        $widgetId={"p.BootstrapBadge.TabContainer.text3"}
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
                                                                    <$Text key={"p.BootstrapBadge.TabContainer.text6"}
                                                                        $widgetId={"p.BootstrapBadge.TabContainer.text6"}
                                                                        class={"mx-name-text6"}
                                                                        caption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "Color Label" }, "args": {} }
                                                                        })}
                                                                        renderMode={"span"} />
                                                                ]
                                                            }
                                                        ]} />,
                                                    <$TableRow key={"p.BootstrapBadge.TabContainer.table2$row1"}
                                                        $widgetId={"p.BootstrapBadge.TabContainer.table2$row1"}
                                                        class={""}
                                                        cells={[
                                                            {
                                                                "class": "",
                                                                "content": [
                                                                    <$ListView key={"p.BootstrapBadge.TabContainer.listView2"}
                                                                        $widgetId={"p.BootstrapBadge.TabContainer.listView2"}
                                                                        class={"mx-name-listView2"}
                                                                        listValue={DatabaseObjectListProperty({
                                                                            "dataSourceId": "p.2",
                                                                            "entity": "BootstrapBadge.Badge",
                                                                            "operationId": "elheHp2XmV2Nk+V+tzw4Jw",
                                                                            "sort": [],
                                                                            "constraints": { "type": "function", "name": "or", "parameters": [ { "type": "function", "name": "=", "parameters": [ { "type": "attribute", "attribute": "BootstrapStyle", "context": "BootstrapBadge.Badge", "attributeType": "#BootstrapBadge.bootstrapStyle" }, { "type": "literal", "value": "success" } ] }, { "type": "function", "name": "=", "parameters": [ { "type": "attribute", "attribute": "BootstrapStyle", "context": "BootstrapBadge.Badge", "attributeType": "#BootstrapBadge.bootstrapStyle" }, { "type": "literal", "value": "danger" } ] } ] }
                                                                        })}
                                                                        itemTemplate={TemplatedWidgetProperty({
                                                                            "dataSourceId": "p.2",
                                                                            "editable": true,
                                                                            "children": () => [
                                                                                <$Fragment key={"p.BootstrapBadge.TabContainer.snippetCallWidget2"}
                                                                                    $widgetId={"p.BootstrapBadge.TabContainer.snippetCallWidget2"}
                                                                                    content={[
                                                                                        <$Badge key={"p.BootstrapBadge.BadgeSnippetHorizontal.badgeV23.48"}
                                                                                            $widgetId={"p.BootstrapBadge.BadgeSnippetHorizontal.badgeV23.48"}
                                                                                            type={"badge"}
                                                                                            value={t([
                                                                                                ExpressionProperty({
                                                                                                    "expression": { "expr": { "type": "variable", "variable": "Badge", "path": "DataString" }, "args": { "Badge": { "widget": "p.BootstrapBadge.TabContainer.listView2", "source": "object" } } }
                                                                                                }),
                                                                                                ExpressionProperty({
                                                                                                    "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                                                })
                                                                                            ])}
                                                                                            class={"mx-name-badgeV23"} />
                                                                                    ]} />
                                                                            ]
                                                                        })}
                                                                        pageSize={0} />
                                                                ]
                                                            },
                                                            {
                                                                "class": "",
                                                                "content": [
                                                                    <$ListView key={"p.BootstrapBadge.TabContainer.listView4"}
                                                                        $widgetId={"p.BootstrapBadge.TabContainer.listView4"}
                                                                        class={"mx-name-listView4"}
                                                                        listValue={DatabaseObjectListProperty({
                                                                            "dataSourceId": "p.3",
                                                                            "entity": "BootstrapBadge.Badge",
                                                                            "operationId": "g8tOKCyUFVWkZPFuhaHRsw",
                                                                            "sort": [],
                                                                            "constraints": { "type": "function", "name": "or", "parameters": [ { "type": "function", "name": "=", "parameters": [ { "type": "attribute", "attribute": "BootstrapStyle", "context": "BootstrapBadge.Badge", "attributeType": "#BootstrapBadge.bootstrapStyle" }, { "type": "literal", "value": "success" } ] }, { "type": "function", "name": "=", "parameters": [ { "type": "attribute", "attribute": "BootstrapStyle", "context": "BootstrapBadge.Badge", "attributeType": "#BootstrapBadge.bootstrapStyle" }, { "type": "literal", "value": "danger" } ] } ] }
                                                                        })}
                                                                        itemTemplate={TemplatedWidgetProperty({
                                                                            "dataSourceId": "p.3",
                                                                            "editable": true,
                                                                            "children": () => [
                                                                                <$Fragment key={"p.BootstrapBadge.TabContainer.snippetCallWidget4"}
                                                                                    $widgetId={"p.BootstrapBadge.TabContainer.snippetCallWidget4"}
                                                                                    content={[
                                                                                        <$Badge key={"p.BootstrapBadge.ColorLabelSnippetHorizontal.badgeV23.53"}
                                                                                            $widgetId={"p.BootstrapBadge.ColorLabelSnippetHorizontal.badgeV23.53"}
                                                                                            type={"label"}
                                                                                            value={t([
                                                                                                ExpressionProperty({
                                                                                                    "expression": { "expr": { "type": "variable", "variable": "Badge", "path": "DataString" }, "args": { "Badge": { "widget": "p.BootstrapBadge.TabContainer.listView4", "source": "object" } } }
                                                                                                }),
                                                                                                ExpressionProperty({
                                                                                                    "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                                                })
                                                                                            ])}
                                                                                            class={"mx-name-badgeV23"} />
                                                                                    ]} />
                                                                            ]
                                                                        })}
                                                                        pageSize={0} />
                                                                ]
                                                            }
                                                        ]} />
                                                ]} />
                                        ]
                                    }
                                ]}
                                hoistedSelections={[]} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Page Title",
    "Page Title"
]);

export const classes = "layout-atlas layout-atlas-responsive-default";

export const autofocus = "desktopOnly";
export const style = {};
export const parameters = {};
export const content = { ...parentContent,
    "Atlas_Core.Atlas_Default.Main": region$Main,
};
