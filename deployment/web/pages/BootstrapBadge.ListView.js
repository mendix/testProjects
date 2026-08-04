import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { DatabaseObjectListProperty } from "mendix/DatabaseObjectListProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { TemplatedWidgetProperty } from "mendix/TemplatedWidgetProperty";

import * as BadgeWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/custom/badge/Badge.mjs";
const Badge = Object.getOwnPropertyDescriptor(BadgeWidgetModule, "Badge")?.get() || Object.getOwnPropertyDescriptor(BadgeWidgetModule, "default")?.get();   
import { Div } from "mendix/widgets/web/Div";
import { Fragment } from "mendix/widgets/web/Fragment";
import { ListView } from "mendix/widgets/web/ListView";
import { Table } from "mendix/widgets/web/Table";
import { TableRow } from "mendix/widgets/web/TableRow";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Div, $Table, $TableRow, $Text, $ListView, $Fragment, $Badge } = asPluginWidgets({ Div, Table, TableRow, Text, ListView, Fragment, Badge });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.BootstrapBadge.ListView.layoutGrid1"}
        $widgetId={"p.BootstrapBadge.ListView.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.BootstrapBadge.ListView.layoutGrid1$row0"}
                $widgetId={"p.BootstrapBadge.ListView.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.BootstrapBadge.ListView.layoutGrid1$row0$column0"}
                        $widgetId={"p.BootstrapBadge.ListView.layoutGrid1$row0$column0"}
                        class={"col-lg-12 col-md-12 col-12"}
                        content={[
                            <$Table key={"p.BootstrapBadge.ListView.table1"}
                                $widgetId={"p.BootstrapBadge.ListView.table1"}
                                class={"mx-name-table1"}
                                autoWidth={false}
                                columnWidths={[
                                    "50%",
                                    "50%"
                                ]}
                                rows={[
                                    <$TableRow key={"p.BootstrapBadge.ListView.table1$row0"}
                                        $widgetId={"p.BootstrapBadge.ListView.table1$row0"}
                                        class={""}
                                        cells={[
                                            {
                                                "header": true,
                                                "class": "",
                                                "content": [
                                                    <$Text key={"p.BootstrapBadge.ListView.text2"}
                                                        $widgetId={"p.BootstrapBadge.ListView.text2"}
                                                        class={"mx-name-text2"}
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
                                                    <$Text key={"p.BootstrapBadge.ListView.text1"}
                                                        $widgetId={"p.BootstrapBadge.ListView.text1"}
                                                        class={"mx-name-text1"}
                                                        caption={ExpressionProperty({
                                                            "expression": { "expr": { "type": "literal", "value": "Color Label" }, "args": {} }
                                                        })}
                                                        renderMode={"span"} />
                                                ]
                                            }
                                        ]} />,
                                    <$TableRow key={"p.BootstrapBadge.ListView.table1$row1"}
                                        $widgetId={"p.BootstrapBadge.ListView.table1$row1"}
                                        class={""}
                                        cells={[
                                            {
                                                "class": "",
                                                "content": [
                                                    <$ListView key={"p.BootstrapBadge.ListView.listView1"}
                                                        $widgetId={"p.BootstrapBadge.ListView.listView1"}
                                                        class={"mx-name-listView1"}
                                                        listValue={DatabaseObjectListProperty({
                                                            "dataSourceId": "p.0",
                                                            "entity": "BootstrapBadge.Badge",
                                                            "operationId": "DlEkJbuWuleLSnLlV7QWjA",
                                                            "sort": []
                                                        })}
                                                        itemTemplate={TemplatedWidgetProperty({
                                                            "dataSourceId": "p.0",
                                                            "editable": false,
                                                            "children": () => [
                                                                <$Fragment key={"p.BootstrapBadge.ListView.snippetCallWidget1"}
                                                                    $widgetId={"p.BootstrapBadge.ListView.snippetCallWidget1"}
                                                                    content={[
                                                                        <$Badge key={"p.BootstrapBadge.BadgeSnippetHorizontal.badgeV23"}
                                                                            $widgetId={"p.BootstrapBadge.BadgeSnippetHorizontal.badgeV23"}
                                                                            type={"badge"}
                                                                            value={t([
                                                                                ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "variable", "variable": "Badge", "path": "DataString" }, "args": { "Badge": { "widget": "p.BootstrapBadge.ListView.listView1", "source": "object" } } }
                                                                                }),
                                                                                ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                                })
                                                                            ])}
                                                                            class={"mx-name-badgeV23"} />
                                                                    ]} />
                                                            ]
                                                        })}
                                                        pageSize={10} />
                                                ]
                                            },
                                            {
                                                "class": "",
                                                "content": [
                                                    <$ListView key={"p.BootstrapBadge.ListView.listView2"}
                                                        $widgetId={"p.BootstrapBadge.ListView.listView2"}
                                                        class={"mx-name-listView2"}
                                                        listValue={DatabaseObjectListProperty({
                                                            "dataSourceId": "p.1",
                                                            "entity": "BootstrapBadge.Badge",
                                                            "operationId": "+1g+XUA2bVi9DEW0+paiww",
                                                            "sort": []
                                                        })}
                                                        itemTemplate={TemplatedWidgetProperty({
                                                            "dataSourceId": "p.1",
                                                            "editable": false,
                                                            "children": () => [
                                                                <$Fragment key={"p.BootstrapBadge.ListView.snippetCallWidget2"}
                                                                    $widgetId={"p.BootstrapBadge.ListView.snippetCallWidget2"}
                                                                    content={[
                                                                        <$Badge key={"p.BootstrapBadge.ColorLabelSnippetHorizontal.badgeV23"}
                                                                            $widgetId={"p.BootstrapBadge.ColorLabelSnippetHorizontal.badgeV23"}
                                                                            type={"label"}
                                                                            value={t([
                                                                                ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "variable", "variable": "Badge", "path": "DataString" }, "args": { "Badge": { "widget": "p.BootstrapBadge.ListView.listView2", "source": "object" } } }
                                                                                }),
                                                                                ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                                })
                                                                            ])}
                                                                            class={"mx-name-badgeV23"} />
                                                                    ]} />
                                                            ]
                                                        })}
                                                        pageSize={10} />
                                                ]
                                            }
                                        ]} />
                                ]} />
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
