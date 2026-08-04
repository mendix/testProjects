import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { DatabaseObjectListProperty } from "mendix/DatabaseObjectListProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { ListAttributeProperty } from "mendix/ListAttributeProperty";
import { ListExpressionProperty } from "mendix/ListExpressionProperty";

import { Container } from "mendix/widgets/web/Container";
import * as DatagridWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagrid/Datagrid.mjs";
const Datagrid = Object.getOwnPropertyDescriptor(DatagridWidgetModule, "Datagrid")?.get() || Object.getOwnPropertyDescriptor(DatagridWidgetModule, "default")?.get();   
import { Div } from "mendix/widgets/web/Div";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Container, $Div, $Text, $Datagrid } = asPluginWidgets({ Container, Div, Text, Datagrid });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Container key={"p.Administration.RuntimeInstances.container1"}
        $widgetId={"p.Administration.RuntimeInstances.container1"}
        class={"mx-name-container1 pageheader pageheader-fullwidth"}
        renderMode={"div"}
        content={[
            <$Div key={"p.Administration.RuntimeInstances.layoutGrid1"}
                $widgetId={"p.Administration.RuntimeInstances.layoutGrid1"}
                class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
                content={[
                    <$Div key={"p.Administration.RuntimeInstances.layoutGrid1$row0"}
                        $widgetId={"p.Administration.RuntimeInstances.layoutGrid1$row0"}
                        class={"row"}
                        content={[
                            <$Div key={"p.Administration.RuntimeInstances.layoutGrid1$row0$column0"}
                                $widgetId={"p.Administration.RuntimeInstances.layoutGrid1$row0$column0"}
                                class={"col-lg-12 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.Administration.RuntimeInstances.label1"}
                                        $widgetId={"p.Administration.RuntimeInstances.label1"}
                                        class={"mx-name-label1 pageheader-title"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Runtime Instances" }, "args": {} }
                                        })}
                                        renderMode={"h2"} />
                                ]} />
                        ]} />
                ]} />
        ]}
        ariaHidden={false} />,
    <$Div key={"p.Administration.RuntimeInstances.layoutGrid2"}
        $widgetId={"p.Administration.RuntimeInstances.layoutGrid2"}
        class={"mx-name-layoutGrid2 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.Administration.RuntimeInstances.layoutGrid2$row0"}
                $widgetId={"p.Administration.RuntimeInstances.layoutGrid2$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.Administration.RuntimeInstances.layoutGrid2$row0$column0"}
                        $widgetId={"p.Administration.RuntimeInstances.layoutGrid2$row0$column0"}
                        class={"col-lg-12 col-md-12 col-12"}
                        content={[
                            <$Datagrid key={"p.Administration.RuntimeInstances.dataGrid21"}
                                $widgetId={"p.Administration.RuntimeInstances.dataGrid21"}
                                datasource={DatabaseObjectListProperty({
                                    "dataSourceId": "p.10",
                                    "entity": "System.XASInstance",
                                    "operationId": "l8qMlKMZLl+48qrKy4YfMA",
                                    "sort": [
                                        [
                                            "XASId",
                                            "asc"
                                        ]
                                    ]
                                })}
                                refreshInterval={0}
                                itemSelectionMethod={"checkbox"}
                                showSelectAllToggle={true}
                                columns={[
                                    {
                                        "showContentAs": "attribute",
                                        "attribute": ListAttributeProperty({
                                            "path": "",
                                            "entity": "System.XASInstance",
                                            "attribute": "XASId",
                                            "attributeType": "String",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.10",
                                            "isList": false
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Runtime ID" }, "args": {} }
                                        }),
                                        "tooltip": undefined,
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
                                        "sortable": true,
                                        "resizable": true,
                                        "draggable": true,
                                        "hidable": "yes",
                                        "width": "autoFill",
                                        "size": 1,
                                        "alignment": "left",
                                        "wrapText": false,
                                        "minWidth": "auto",
                                        "minWidthLimit": 100,
                                        "exportValue": undefined,
                                        "allowEventPropagation": true,
                                        "exportType": "default"
                                    },
                                    {
                                        "showContentAs": "dynamicText",
                                        "attribute": ListAttributeProperty({
                                            "path": "",
                                            "entity": "System.XASInstance",
                                            "attribute": "createdDate",
                                            "attributeType": "DateTime",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.10",
                                            "isList": false
                                        }),
                                        "dynamicText": ListExpressionProperty({
                                            "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "createdDate" }, { "type": "literal", "value": "{\"type\":\"datetime\"}" } ] }, "args": { "currentObject": { "widget": "p.Administration.RuntimeInstances.dataGrid21", "source": "object" } } },
                                            "dataSourceId": "p.10"
                                        }),
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Created" }, "args": {} }
                                        }),
                                        "tooltip": undefined,
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
                                        "sortable": true,
                                        "resizable": true,
                                        "draggable": true,
                                        "hidable": "yes",
                                        "width": "autoFill",
                                        "size": 1,
                                        "alignment": "left",
                                        "wrapText": false,
                                        "minWidth": "auto",
                                        "minWidthLimit": 100,
                                        "exportValue": undefined,
                                        "allowEventPropagation": true,
                                        "exportType": "default"
                                    },
                                    {
                                        "showContentAs": "attribute",
                                        "attribute": ListAttributeProperty({
                                            "path": "",
                                            "entity": "System.XASInstance",
                                            "attribute": "AllowedNumberOfConcurrentUsers",
                                            "attributeType": "Integer",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.10",
                                            "isList": false
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Allowed concurrent users" }, "args": {} }
                                        }),
                                        "tooltip": undefined,
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
                                        "sortable": true,
                                        "resizable": true,
                                        "draggable": true,
                                        "hidable": "yes",
                                        "width": "autoFill",
                                        "size": 1,
                                        "alignment": "left",
                                        "wrapText": false,
                                        "minWidth": "auto",
                                        "minWidthLimit": 100,
                                        "exportValue": undefined,
                                        "allowEventPropagation": true,
                                        "exportType": "default"
                                    },
                                    {
                                        "showContentAs": "attribute",
                                        "attribute": ListAttributeProperty({
                                            "path": "",
                                            "entity": "System.XASInstance",
                                            "attribute": "PartnerName",
                                            "attributeType": "String",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.10",
                                            "isList": false
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Partner" }, "args": {} }
                                        }),
                                        "tooltip": undefined,
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
                                        "sortable": true,
                                        "resizable": true,
                                        "draggable": true,
                                        "hidable": "yes",
                                        "width": "autoFill",
                                        "size": 1,
                                        "alignment": "left",
                                        "wrapText": false,
                                        "minWidth": "auto",
                                        "minWidthLimit": 100,
                                        "exportValue": undefined,
                                        "allowEventPropagation": true,
                                        "exportType": "default"
                                    },
                                    {
                                        "showContentAs": "attribute",
                                        "attribute": ListAttributeProperty({
                                            "path": "",
                                            "entity": "System.XASInstance",
                                            "attribute": "CustomerName",
                                            "attributeType": "String",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.10",
                                            "isList": false
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Customer" }, "args": {} }
                                        }),
                                        "tooltip": undefined,
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
                                        "sortable": true,
                                        "resizable": true,
                                        "draggable": true,
                                        "hidable": "yes",
                                        "width": "autoFill",
                                        "size": 1,
                                        "alignment": "left",
                                        "wrapText": false,
                                        "minWidth": "auto",
                                        "minWidthLimit": 100,
                                        "exportValue": undefined,
                                        "allowEventPropagation": true,
                                        "exportType": "default"
                                    }
                                ]}
                                columnsFilterable={true}
                                pageSize={20}
                                pagination={"buttons"}
                                pagingPosition={"bottom"}
                                showPagingButtons={"always"}
                                showEmptyPlaceholder={"none"}
                                columnsSortable={true}
                                columnsResizable={true}
                                columnsDraggable={true}
                                columnsHidable={true}
                                filterSectionTitle={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                })}
                                exportDialogLabel={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Export progress" }, "args": {} }
                                })}
                                cancelExportLabel={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Cancel data export" }, "args": {} }
                                })}
                                selectRowLabel={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Select row" }, "args": {} }
                                })}
                                onClickTrigger={"single"}
                                itemSelectionMode={"clear"}
                                loadingType={"spinner"}
                                showNumberOfRows={false}
                                loadMoreButtonCaption={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Load More" }, "args": {} }
                                })}
                                configurationStorageType={"attribute"}
                                storeFiltersInPersonalization={true}
                                selectAllRowsLabel={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Select all rows" }, "args": {} }
                                })}
                                autoSelect={false}
                                enableSelectAll={false}
                                keepSelection={false}
                                selectionCounterPosition={"bottom"}
                                refreshIndicator={false}
                                useCustomPagination={false}
                                singleSelectionColumnLabel={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Select single row" }, "args": {} }
                                })}
                                selectingAllLabel={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Selecting all items..." }, "args": {} }
                                })}
                                cancelSelectionLabel={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Cancel selection" }, "args": {} }
                                })}
                                selectedCountTemplateSingular={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "%d row selected" }, "args": {} }
                                })}
                                selectedCountTemplatePlural={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "%d rows selected" }, "args": {} }
                                })}
                                selectAllText={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Select all rows in the data source" }, "args": {} }
                                })}
                                selectAllTemplate={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Select all %d rows in the data source" }, "args": {} }
                                })}
                                allSelectedText={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "All %d rows selected." }, "args": {} }
                                })}
                                clearSelectionButtonLabel={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Clear selection" }, "args": {} }
                                })}
                                class={"mx-name-dataGrid21"} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Runtime Instances"
]);

export const classes = "layout-atlas layout-atlas-responsive-default";

export const autofocus = "desktopOnly";
export const style = {};
export const parameters = {};
export const content = { ...parentContent,
    "Atlas_Core.Atlas_Default.Main": region$Main,
};
