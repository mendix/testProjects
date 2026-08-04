import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { DatabaseObjectListProperty } from "mendix/DatabaseObjectListProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { ListAttributeProperty } from "mendix/ListAttributeProperty";
import { ListExpressionProperty } from "mendix/ListExpressionProperty";
import { TemplatedWidgetProperty } from "mendix/TemplatedWidgetProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebIconProperty } from "mendix/WebIconProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import { ConditionalVisibilityWrapper } from "mendix/widgets/web/ConditionalVisibilityWrapper";
import { Container } from "mendix/widgets/web/Container";
import * as DatagridWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagrid/Datagrid.mjs";
const Datagrid = Object.getOwnPropertyDescriptor(DatagridWidgetModule, "Datagrid")?.get() || Object.getOwnPropertyDescriptor(DatagridWidgetModule, "default")?.get();   
import * as DatagridDateFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagriddatefilter/DatagridDateFilter.mjs";
const DatagridDateFilter = Object.getOwnPropertyDescriptor(DatagridDateFilterWidgetModule, "DatagridDateFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridDateFilterWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagriddatefilter/DatagridDateFilter.css";
import * as DatagridTextFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagridtextfilter/DatagridTextFilter.mjs";
const DatagridTextFilter = Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "DatagridTextFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "default")?.get();   
import { Div } from "mendix/widgets/web/Div";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Container, $Div, $Text, $Datagrid, $DatagridTextFilter, $DatagridDateFilter, $ConditionalVisibilityWrapper, $ActionButton } = asPluginWidgets({ Container, Div, Text, Datagrid, DatagridTextFilter, DatagridDateFilter, ConditionalVisibilityWrapper, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Container key={"p.Administration.ActiveSessions.container1"}
        $widgetId={"p.Administration.ActiveSessions.container1"}
        class={"mx-name-container1 pageheader pageheader-fullwidth"}
        renderMode={"div"}
        content={[
            <$Div key={"p.Administration.ActiveSessions.layoutGrid1"}
                $widgetId={"p.Administration.ActiveSessions.layoutGrid1"}
                class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
                content={[
                    <$Div key={"p.Administration.ActiveSessions.layoutGrid1$row0"}
                        $widgetId={"p.Administration.ActiveSessions.layoutGrid1$row0"}
                        class={"row"}
                        content={[
                            <$Div key={"p.Administration.ActiveSessions.layoutGrid1$row0$column0"}
                                $widgetId={"p.Administration.ActiveSessions.layoutGrid1$row0$column0"}
                                class={"col-lg-12 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.Administration.ActiveSessions.label1"}
                                        $widgetId={"p.Administration.ActiveSessions.label1"}
                                        class={"mx-name-label1 pageheader-title"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Active Sessions" }, "args": {} }
                                        })}
                                        renderMode={"h2"} />
                                ]} />
                        ]} />
                ]} />
        ]}
        ariaHidden={false} />,
    <$Div key={"p.Administration.ActiveSessions.layoutGrid2"}
        $widgetId={"p.Administration.ActiveSessions.layoutGrid2"}
        class={"mx-name-layoutGrid2 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.Administration.ActiveSessions.layoutGrid2$row0"}
                $widgetId={"p.Administration.ActiveSessions.layoutGrid2$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.Administration.ActiveSessions.layoutGrid2$row0$column0"}
                        $widgetId={"p.Administration.ActiveSessions.layoutGrid2$row0$column0"}
                        class={"col-lg-12 col-md-12 col-12"}
                        content={[
                            <$Datagrid key={"p.Administration.ActiveSessions.dataGrid21"}
                                $widgetId={"p.Administration.ActiveSessions.dataGrid21"}
                                datasource={DatabaseObjectListProperty({
                                    "dataSourceId": "p.10",
                                    "entity": "System.Session",
                                    "operationId": "b9QCYq+whFuvuUNX9zIpUw",
                                    "sort": [
                                        [
                                            "System.Session_User/System.User/Name",
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
                                            "path": "System.Session_User/System.User",
                                            "entity": "System.User",
                                            "attribute": "Name",
                                            "attributeType": "String",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.10",
                                            "isList": false
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "User name" }, "args": {} }
                                        }),
                                        "tooltip": undefined,
                                        "filter": [
                                            <$DatagridTextFilter key={"p.Administration.ActiveSessions.textFilter1"}
                                                $widgetId={"p.Administration.ActiveSessions.textFilter1"}
                                                defaultFilter={"contains"}
                                                placeholder={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                adjustable={true}
                                                delay={500}
                                                screenReaderButtonCaption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                screenReaderInputCaption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                attrChoice={"auto"}
                                                attributes={[]}
                                                class={"mx-name-textFilter1"} />
                                        ],
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
                                            "entity": "System.Session",
                                            "attribute": "LastActive",
                                            "attributeType": "DateTime",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.10",
                                            "isList": false
                                        }),
                                        "dynamicText": ListExpressionProperty({
                                            "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "LastActive" }, { "type": "literal", "value": "{\"type\":\"datetime\"}" } ] }, "args": { "currentObject": { "widget": "p.Administration.ActiveSessions.dataGrid21", "source": "object" } } },
                                            "dataSourceId": "p.10"
                                        }),
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Last active" }, "args": {} }
                                        }),
                                        "tooltip": undefined,
                                        "filter": [
                                            <$DatagridDateFilter key={"p.Administration.ActiveSessions.dateFilter1"}
                                                $widgetId={"p.Administration.ActiveSessions.dateFilter1"}
                                                defaultFilter={"equal"}
                                                placeholder={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                adjustable={true}
                                                screenReaderButtonCaption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                screenReaderCalendarCaption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                screenReaderInputCaption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                attrChoice={"auto"}
                                                attributes={[]}
                                                class={"mx-name-dateFilter1"} />
                                        ],
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
                                        "showContentAs": "customContent",
                                        "attribute": ListAttributeProperty({
                                            "path": "",
                                            "entity": "System.Session",
                                            "attribute": "LastActive",
                                            "attributeType": "DateTime",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.10",
                                            "isList": false
                                        }),
                                        "content": TemplatedWidgetProperty({
                                            "dataSourceId": "p.10",
                                            "editable": false,
                                            "children": () => [
                                                <$ConditionalVisibilityWrapper key={"p.Administration.ActiveSessions.actionButton1$visibility"}
                                                    $widgetId={"p.Administration.ActiveSessions.actionButton1$visibility"}
                                                    visible={ExpressionProperty({
                                                        "expression": { "expr": { "type": "function", "name": "_hasSomeRole", "parameters": [ { "type": "literal", "value": "Administrator" } ] }, "args": {} }
                                                    })}
                                                    contents={[
                                                        <$ActionButton key={"p.Administration.ActiveSessions.actionButton1"}
                                                            $widgetId={"p.Administration.ActiveSessions.actionButton1"}
                                                            buttonId={"p.Administration.ActiveSessions.actionButton1"}
                                                            class={"mx-name-actionButton1 btn-lg"}
                                                            renderType={"link"}
                                                            role={"button"}
                                                            buttonClass={"btn-default"}
                                                            caption={ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                            })}
                                                            tooltip={TextProperty({
                                                                "value": ""
                                                            })}
                                                            icon={WebIconProperty({
                                                                "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-logout" }
                                                            })}
                                                            action={ActionProperty({
                                                                "action": { "type": "deleteObject", "argMap": { "$object": { "widget": "p.Administration.ActiveSessions.dataGrid21", "source": "object" } }, "config": { "closePage": false, "operationId": "+6KLeZcLOV2AN3rqC4opHQ" }, "disabledDuringExecution": true },
                                                                "abortOnServerValidation": true
                                                            })} />
                                                    ]} />
                                            ]
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                        }),
                                        "tooltip": undefined,
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
                                        "sortable": false,
                                        "resizable": true,
                                        "draggable": true,
                                        "hidable": "no",
                                        "width": "autoFit",
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
                                class={"mx-name-dataGrid21 table-hover"} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Active Sessions"
]);

export const classes = "layout-atlas layout-atlas-responsive-default";

export const autofocus = "desktopOnly";
export const style = {};
export const parameters = {};
export const content = { ...parentContent,
    "Atlas_Core.Atlas_Default.Main": region$Main,
};
