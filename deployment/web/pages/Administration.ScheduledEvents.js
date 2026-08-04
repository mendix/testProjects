import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { DatabaseObjectListProperty } from "mendix/DatabaseObjectListProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { ListAttributeProperty } from "mendix/ListAttributeProperty";
import { ListExpressionProperty } from "mendix/ListExpressionProperty";
import { TemplatedWidgetProperty } from "mendix/TemplatedWidgetProperty";

import { ConditionalVisibilityWrapper } from "mendix/widgets/web/ConditionalVisibilityWrapper";
import { Container } from "mendix/widgets/web/Container";
import * as DatagridWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagrid/Datagrid.mjs";
const Datagrid = Object.getOwnPropertyDescriptor(DatagridWidgetModule, "Datagrid")?.get() || Object.getOwnPropertyDescriptor(DatagridWidgetModule, "default")?.get();   
import * as DatagridDateFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagriddatefilter/DatagridDateFilter.mjs";
const DatagridDateFilter = Object.getOwnPropertyDescriptor(DatagridDateFilterWidgetModule, "DatagridDateFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridDateFilterWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagriddatefilter/DatagridDateFilter.css";
import * as DatagridDropdownFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagriddropdownfilter/DatagridDropdownFilter.mjs";
const DatagridDropdownFilter = Object.getOwnPropertyDescriptor(DatagridDropdownFilterWidgetModule, "DatagridDropdownFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridDropdownFilterWidgetModule, "default")?.get();   
import * as DatagridTextFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagridtextfilter/DatagridTextFilter.mjs";
const DatagridTextFilter = Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "DatagridTextFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "default")?.get();   
import { Div } from "mendix/widgets/web/Div";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Container, $Div, $Text, $Datagrid, $DatagridTextFilter, $DatagridDateFilter, $ConditionalVisibilityWrapper, $DatagridDropdownFilter } = asPluginWidgets({ Container, Div, Text, Datagrid, DatagridTextFilter, DatagridDateFilter, ConditionalVisibilityWrapper, DatagridDropdownFilter });

addEnumerations({
    "System.EventStatus": [
        [
            "Running",
            t([
                "Running"
            ])
        ],
        [
            "Completed",
            t([
                "Completed"
            ])
        ],
        [
            "Error",
            t([
                "Error"
            ])
        ],
        [
            "Stopped",
            t([
                "Stopped"
            ])
        ]
    ]
});

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Container key={"p.Administration.ScheduledEvents.container1"}
        $widgetId={"p.Administration.ScheduledEvents.container1"}
        class={"mx-name-container1 pageheader pageheader-fullwidth"}
        renderMode={"div"}
        content={[
            <$Div key={"p.Administration.ScheduledEvents.layoutGrid1"}
                $widgetId={"p.Administration.ScheduledEvents.layoutGrid1"}
                class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
                content={[
                    <$Div key={"p.Administration.ScheduledEvents.layoutGrid1$row0"}
                        $widgetId={"p.Administration.ScheduledEvents.layoutGrid1$row0"}
                        class={"row"}
                        content={[
                            <$Div key={"p.Administration.ScheduledEvents.layoutGrid1$row0$column0"}
                                $widgetId={"p.Administration.ScheduledEvents.layoutGrid1$row0$column0"}
                                class={"col-lg-12 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.Administration.ScheduledEvents.label1"}
                                        $widgetId={"p.Administration.ScheduledEvents.label1"}
                                        class={"mx-name-label1 pageheader-title"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Scheduled Events" }, "args": {} }
                                        })}
                                        renderMode={"h2"} />
                                ]} />
                        ]} />
                ]} />
        ]}
        ariaHidden={false} />,
    <$Div key={"p.Administration.ScheduledEvents.layoutGrid2"}
        $widgetId={"p.Administration.ScheduledEvents.layoutGrid2"}
        class={"mx-name-layoutGrid2 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.Administration.ScheduledEvents.layoutGrid2$row0"}
                $widgetId={"p.Administration.ScheduledEvents.layoutGrid2$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.Administration.ScheduledEvents.layoutGrid2$row0$column0"}
                        $widgetId={"p.Administration.ScheduledEvents.layoutGrid2$row0$column0"}
                        class={"col-lg-12 col-md-12 col-12"}
                        content={[
                            <$Datagrid key={"p.Administration.ScheduledEvents.dataGrid21"}
                                $widgetId={"p.Administration.ScheduledEvents.dataGrid21"}
                                datasource={DatabaseObjectListProperty({
                                    "dataSourceId": "p.10",
                                    "entity": "System.ScheduledEventInformation",
                                    "operationId": "F2NUIaSOelqvl0HRZK/+uQ",
                                    "sort": [
                                        [
                                            "StartTime",
                                            "desc"
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
                                            "entity": "System.ScheduledEventInformation",
                                            "attribute": "Name",
                                            "attributeType": "String",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.10",
                                            "isList": false
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Name" }, "args": {} }
                                        }),
                                        "tooltip": undefined,
                                        "filter": [
                                            <$DatagridTextFilter key={"p.Administration.ScheduledEvents.textFilter1"}
                                                $widgetId={"p.Administration.ScheduledEvents.textFilter1"}
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
                                        "showContentAs": "attribute",
                                        "attribute": ListAttributeProperty({
                                            "path": "",
                                            "entity": "System.ScheduledEventInformation",
                                            "attribute": "Description",
                                            "attributeType": "String",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.10",
                                            "isList": false
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Description" }, "args": {} }
                                        }),
                                        "tooltip": undefined,
                                        "filter": [
                                            <$DatagridTextFilter key={"p.Administration.ScheduledEvents.textFilter2"}
                                                $widgetId={"p.Administration.ScheduledEvents.textFilter2"}
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
                                                class={"mx-name-textFilter2"} />
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
                                            "entity": "System.ScheduledEventInformation",
                                            "attribute": "StartTime",
                                            "attributeType": "DateTime",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.10",
                                            "isList": false
                                        }),
                                        "dynamicText": ListExpressionProperty({
                                            "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "StartTime" }, { "type": "literal", "value": "{\"type\":\"datetime\"}" } ] }, "args": { "currentObject": { "widget": "p.Administration.ScheduledEvents.dataGrid21", "source": "object" } } },
                                            "dataSourceId": "p.10"
                                        }),
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Start time" }, "args": {} }
                                        }),
                                        "tooltip": undefined,
                                        "filter": [
                                            <$DatagridDateFilter key={"p.Administration.ScheduledEvents.dateFilter1"}
                                                $widgetId={"p.Administration.ScheduledEvents.dateFilter1"}
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
                                            "entity": "System.ScheduledEventInformation",
                                            "attribute": "Status",
                                            "attributeType": "Enum",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.10",
                                            "isList": false
                                        }),
                                        "content": TemplatedWidgetProperty({
                                            "dataSourceId": "p.10",
                                            "editable": false,
                                            "children": () => [
                                                <$ConditionalVisibilityWrapper key={"p.Administration.ScheduledEvents.text2$visibility"}
                                                    $widgetId={"p.Administration.ScheduledEvents.text2$visibility"}
                                                    visible={ExpressionProperty({
                                                        "expression": { "expr": { "type": "function", "name": "=", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "Status" }, { "type": "literal", "value": "Running" } ] }, "args": { "currentObject": { "widget": "p.Administration.ScheduledEvents.dataGrid21", "source": "object" } } }
                                                    })}
                                                    contents={[
                                                        <$Text key={"p.Administration.ScheduledEvents.text2"}
                                                            $widgetId={"p.Administration.ScheduledEvents.text2"}
                                                            class={"mx-name-text2 badge label-primary"}
                                                            caption={ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Running" }, "args": {} }
                                                            })}
                                                            renderMode={"span"} />
                                                    ]} />,
                                                <$ConditionalVisibilityWrapper key={"p.Administration.ScheduledEvents.text1$visibility"}
                                                    $widgetId={"p.Administration.ScheduledEvents.text1$visibility"}
                                                    visible={ExpressionProperty({
                                                        "expression": { "expr": { "type": "function", "name": "=", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "Status" }, { "type": "literal", "value": "Completed" } ] }, "args": { "currentObject": { "widget": "p.Administration.ScheduledEvents.dataGrid21", "source": "object" } } }
                                                    })}
                                                    contents={[
                                                        <$Text key={"p.Administration.ScheduledEvents.text1"}
                                                            $widgetId={"p.Administration.ScheduledEvents.text1"}
                                                            class={"mx-name-text1 badge label-success"}
                                                            caption={ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Completed" }, "args": {} }
                                                            })}
                                                            renderMode={"span"} />
                                                    ]} />,
                                                <$ConditionalVisibilityWrapper key={"p.Administration.ScheduledEvents.text3$visibility"}
                                                    $widgetId={"p.Administration.ScheduledEvents.text3$visibility"}
                                                    visible={ExpressionProperty({
                                                        "expression": { "expr": { "type": "function", "name": "=", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "Status" }, { "type": "literal", "value": "Error" } ] }, "args": { "currentObject": { "widget": "p.Administration.ScheduledEvents.dataGrid21", "source": "object" } } }
                                                    })}
                                                    contents={[
                                                        <$Text key={"p.Administration.ScheduledEvents.text3"}
                                                            $widgetId={"p.Administration.ScheduledEvents.text3"}
                                                            class={"mx-name-text3 badge label-danger"}
                                                            caption={ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Error" }, "args": {} }
                                                            })}
                                                            renderMode={"span"} />
                                                    ]} />,
                                                <$ConditionalVisibilityWrapper key={"p.Administration.ScheduledEvents.text4$visibility"}
                                                    $widgetId={"p.Administration.ScheduledEvents.text4$visibility"}
                                                    visible={ExpressionProperty({
                                                        "expression": { "expr": { "type": "function", "name": "=", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "Status" }, { "type": "literal", "value": "Stopped" } ] }, "args": { "currentObject": { "widget": "p.Administration.ScheduledEvents.dataGrid21", "source": "object" } } }
                                                    })}
                                                    contents={[
                                                        <$Text key={"p.Administration.ScheduledEvents.text4"}
                                                            $widgetId={"p.Administration.ScheduledEvents.text4"}
                                                            class={"mx-name-text4 badge label-secondary"}
                                                            caption={ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Stopped" }, "args": {} }
                                                            })}
                                                            renderMode={"span"} />
                                                    ]} />
                                            ]
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Status" }, "args": {} }
                                        }),
                                        "tooltip": undefined,
                                        "filter": [
                                            <$DatagridDropdownFilter key={"p.Administration.ScheduledEvents.drop_downFilter1"}
                                                $widgetId={"p.Administration.ScheduledEvents.drop_downFilter1"}
                                                auto={true}
                                                filterOptions={[]}
                                                emptyOptionCaption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                multiSelect={false}
                                                ariaLabel={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                baseType={"attr"}
                                                attrChoice={"auto"}
                                                fetchOptionsLazy={false}
                                                filterable={false}
                                                clearable={true}
                                                selectedItemsStyle={"text"}
                                                selectionMethod={"checkbox"}
                                                emptySelectionCaption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Select" }, "args": {} }
                                                })}
                                                filterInputPlaceholderCaption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Search" }, "args": {} }
                                                })}
                                                refCaptionSource={"attr"}
                                                class={"mx-name-drop_downFilter1"} />
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
                                            "entity": "System.ScheduledEventInformation",
                                            "attribute": "EndTime",
                                            "attributeType": "DateTime",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.10",
                                            "isList": false
                                        }),
                                        "dynamicText": ListExpressionProperty({
                                            "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "EndTime" }, { "type": "literal", "value": "{\"type\":\"datetime\"}" } ] }, "args": { "currentObject": { "widget": "p.Administration.ScheduledEvents.dataGrid21", "source": "object" } } },
                                            "dataSourceId": "p.10"
                                        }),
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "End time" }, "args": {} }
                                        }),
                                        "tooltip": undefined,
                                        "filter": [
                                            <$DatagridDateFilter key={"p.Administration.ScheduledEvents.dateFilter2"}
                                                $widgetId={"p.Administration.ScheduledEvents.dateFilter2"}
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
                                                class={"mx-name-dateFilter2"} />
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
    "Scheduled Events"
]);

export const classes = "layout-atlas layout-atlas-responsive-default";

export const autofocus = "desktopOnly";
export const style = {};
export const parameters = {};
export const content = { ...parentContent,
    "Atlas_Core.Atlas_Default.Main": region$Main,
};
