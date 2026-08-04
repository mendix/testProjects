import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { DatabaseObjectListProperty } from "mendix/DatabaseObjectListProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { ListActionProperty } from "mendix/ListActionProperty";
import { ListAttributeProperty } from "mendix/ListAttributeProperty";
import { ListenObjectProperty } from "mendix/ListenObjectProperty";
import { SelectionProperty } from "mendix/SelectionProperty";
import { TemplatedWidgetProperty } from "mendix/TemplatedWidgetProperty";
import { TextProperty } from "mendix/TextProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import * as BadgeWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/custom/badge/Badge.mjs";
const Badge = Object.getOwnPropertyDescriptor(BadgeWidgetModule, "Badge")?.get() || Object.getOwnPropertyDescriptor(BadgeWidgetModule, "default")?.get();   
import { ConditionalVisibilityWrapper } from "mendix/widgets/web/ConditionalVisibilityWrapper";
import * as DatagridWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagrid/Datagrid.mjs";
const Datagrid = Object.getOwnPropertyDescriptor(DatagridWidgetModule, "Datagrid")?.get() || Object.getOwnPropertyDescriptor(DatagridWidgetModule, "default")?.get();   
import * as DatagridTextFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagridtextfilter/DatagridTextFilter.mjs";
const DatagridTextFilter = Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "DatagridTextFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "default")?.get();   
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import { Fragment } from "mendix/widgets/web/Fragment";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Div, $Datagrid, $DatagridTextFilter, $ConditionalVisibilityWrapper, $ActionButton, $Text, $DataView, $Fragment, $Badge } = asPluginWidgets({ Div, Datagrid, DatagridTextFilter, ConditionalVisibilityWrapper, ActionButton, Text, DataView, Fragment, Badge });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.BootstrapBadge.ListenToGrid.layoutGrid1"}
        $widgetId={"p.BootstrapBadge.ListenToGrid.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.BootstrapBadge.ListenToGrid.layoutGrid1$row0"}
                $widgetId={"p.BootstrapBadge.ListenToGrid.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.BootstrapBadge.ListenToGrid.layoutGrid1$row0$column0"}
                        $widgetId={"p.BootstrapBadge.ListenToGrid.layoutGrid1$row0$column0"}
                        class={"col-lg-12 col-md-12 col-12"}
                        content={[
                            <$Div key={"p.BootstrapBadge.ListenToGrid.layoutGrid2"}
                                $widgetId={"p.BootstrapBadge.ListenToGrid.layoutGrid2"}
                                class={"mx-name-layoutGrid2 mx-layoutgrid mx-layoutgrid-fluid"}
                                content={[
                                    <$Div key={"p.BootstrapBadge.ListenToGrid.layoutGrid2$row0"}
                                        $widgetId={"p.BootstrapBadge.ListenToGrid.layoutGrid2$row0"}
                                        class={"row"}
                                        content={[
                                            <$Div key={"p.BootstrapBadge.ListenToGrid.layoutGrid2$row0$column0"}
                                                $widgetId={"p.BootstrapBadge.ListenToGrid.layoutGrid2$row0$column0"}
                                                class={"col-lg-6 col-md-12 col-12"}
                                                content={[
                                                    <$Datagrid key={"p.BootstrapBadge.ListenToGrid.grid1"}
                                                        $widgetId={"p.BootstrapBadge.ListenToGrid.grid1"}
                                                        datasource={DatabaseObjectListProperty({
                                                            "dataSourceId": "p.0",
                                                            "entity": "BootstrapBadge.Badge",
                                                            "operationId": "flnUIRZpTVmehzWpw9IdfA",
                                                            "sort": []
                                                        })}
                                                        refreshInterval={0}
                                                        columns={[
                                                            {
                                                                "showContentAs": "attribute",
                                                                "attribute": ListAttributeProperty({
                                                                    "path": "",
                                                                    "entity": "BootstrapBadge.Badge",
                                                                    "attribute": "DataString",
                                                                    "attributeType": "String",
                                                                    "sortable": true,
                                                                    "filterable": true,
                                                                    "dataSourceId": "p.0",
                                                                    "isList": false
                                                                }),
                                                                "dynamicText": undefined,
                                                                "exportValue": undefined,
                                                                "exportType": "default",
                                                                "header": ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Data" }, "args": {} }
                                                                }),
                                                                "tooltip": undefined,
                                                                "filter": [
                                                                    <$DatagridTextFilter key={"p.BootstrapBadge.ListenToGrid.textFilter1"}
                                                                        $widgetId={"p.BootstrapBadge.ListenToGrid.textFilter1"}
                                                                        attrChoice={"auto"}
                                                                        attributes={[]}
                                                                        defaultFilter={"contains"}
                                                                        placeholder={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                                        })}
                                                                        adjustable={true}
                                                                        delay={500}
                                                                        screenReaderButtonCaption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                                        })}
                                                                        screenReaderInputCaption={t([
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Search" }, "args": {} }
                                                                            }),
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Zoeken" }, "args": {} }
                                                                            })
                                                                        ])}
                                                                        class={"mx-name-textFilter1"} />
                                                                ],
                                                                "visible": ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                                                }),
                                                                "sortable": true,
                                                                "resizable": true,
                                                                "draggable": true,
                                                                "hidable": "yes",
                                                                "allowEventPropagation": true,
                                                                "width": "manual",
                                                                "minWidth": "auto",
                                                                "minWidthLimit": 100,
                                                                "size": 100,
                                                                "alignment": "left",
                                                                "wrapText": false
                                                            },
                                                            {
                                                                "showContentAs": "customContent",
                                                                "attribute": ListAttributeProperty({
                                                                    "path": "",
                                                                    "entity": "BootstrapBadge.Badge",
                                                                    "attribute": "DataString",
                                                                    "attributeType": "String",
                                                                    "sortable": true,
                                                                    "filterable": true,
                                                                    "dataSourceId": "p.0",
                                                                    "isList": false
                                                                }),
                                                                "content": TemplatedWidgetProperty({
                                                                    "dataSourceId": "p.0",
                                                                    "editable": false,
                                                                    "children": () => [
                                                                        <$ConditionalVisibilityWrapper key={"p.BootstrapBadge.ListenToGrid.actionButton1$visibility"}
                                                                            $widgetId={"p.BootstrapBadge.ListenToGrid.actionButton1$visibility"}
                                                                            visible={ExpressionProperty({
                                                                                "expression": { "expr": { "type": "function", "name": "_hasSomeRole", "parameters": [ { "type": "literal", "value": "Administrator" }, { "type": "literal", "value": "User" } ] }, "args": {} }
                                                                            })}
                                                                            contents={[
                                                                                <$ActionButton key={"p.BootstrapBadge.ListenToGrid.actionButton1"}
                                                                                    $widgetId={"p.BootstrapBadge.ListenToGrid.actionButton1"}
                                                                                    buttonId={"p.BootstrapBadge.ListenToGrid.actionButton1"}
                                                                                    class={"mx-name-actionButton1"}
                                                                                    renderType={"button"}
                                                                                    buttonClass={"btn-default"}
                                                                                    caption={ExpressionProperty({
                                                                                        "expression": { "expr": { "type": "literal", "value": "Edit" }, "args": {} }
                                                                                    })}
                                                                                    tooltip={TextProperty({
                                                                                        "value": ""
                                                                                    })}
                                                                                    action={ActionProperty({
                                                                                        "action": { "type": "openPage", "argMap": { "param$Badge": { "widget": "p.BootstrapBadge.ListenToGrid.grid1", "source": "object" } }, "config": { "name": "BootstrapBadge/Badge_NewEdit_2.page.xml", "location": "popup", "resizable": true, "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": true },
                                                                                        "abortOnServerValidation": true
                                                                                    })} />
                                                                            ]} />,
                                                                        <$ConditionalVisibilityWrapper key={"p.BootstrapBadge.ListenToGrid.actionButton2$visibility"}
                                                                            $widgetId={"p.BootstrapBadge.ListenToGrid.actionButton2$visibility"}
                                                                            visible={ExpressionProperty({
                                                                                "expression": { "expr": { "type": "function", "name": "_hasSomeRole", "parameters": [ { "type": "literal", "value": "Administrator" }, { "type": "literal", "value": "User" } ] }, "args": {} }
                                                                            })}
                                                                            contents={[
                                                                                <$ActionButton key={"p.BootstrapBadge.ListenToGrid.actionButton2"}
                                                                                    $widgetId={"p.BootstrapBadge.ListenToGrid.actionButton2"}
                                                                                    buttonId={"p.BootstrapBadge.ListenToGrid.actionButton2"}
                                                                                    class={"mx-name-actionButton2"}
                                                                                    renderType={"button"}
                                                                                    buttonClass={"btn-danger"}
                                                                                    caption={ExpressionProperty({
                                                                                        "expression": { "expr": { "type": "literal", "value": "Delete" }, "args": {} }
                                                                                    })}
                                                                                    tooltip={TextProperty({
                                                                                        "value": ""
                                                                                    })}
                                                                                    action={ActionProperty({
                                                                                        "action": { "type": "deleteObject", "argMap": { "$object": { "widget": "p.BootstrapBadge.ListenToGrid.grid1", "source": "object" } }, "config": { "closePage": false, "operationId": "8269yT/iz1qzNLGdwtuqrQ" }, "disabledDuringExecution": true },
                                                                                        "abortOnServerValidation": true
                                                                                    })} />
                                                                            ]} />
                                                                    ]
                                                                }),
                                                                "dynamicText": undefined,
                                                                "exportValue": undefined,
                                                                "exportType": "default",
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
                                                                "allowEventPropagation": true,
                                                                "width": "manual",
                                                                "minWidth": "auto",
                                                                "minWidthLimit": 100,
                                                                "size": 20,
                                                                "alignment": "left",
                                                                "wrapText": false
                                                            }
                                                        ]}
                                                        columnsFilterable={true}
                                                        onClickTrigger={"double"}
                                                        onClick={ListActionProperty({
                                                            "action": { "type": "openPage", "argMap": { "param$Badge": { "widget": "p.BootstrapBadge.ListenToGrid.grid1", "source": "object" } }, "config": { "name": "BootstrapBadge/Badge_NewEdit_2.page.xml", "location": "popup", "resizable": true, "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                            "abortOnServerValidation": false,
                                                            "dataSourceId": "p.0",
                                                            "argumentTypes": { }
                                                        })}
                                                        filtersPlaceholder={[
                                                            <$ConditionalVisibilityWrapper key={"p.BootstrapBadge.ListenToGrid.actionButton3$visibility"}
                                                                $widgetId={"p.BootstrapBadge.ListenToGrid.actionButton3$visibility"}
                                                                visible={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "function", "name": "_hasSomeRole", "parameters": [ { "type": "literal", "value": "Administrator" }, { "type": "literal", "value": "User" } ] }, "args": {} }
                                                                })}
                                                                contents={[
                                                                    <$ActionButton key={"p.BootstrapBadge.ListenToGrid.actionButton3"}
                                                                        $widgetId={"p.BootstrapBadge.ListenToGrid.actionButton3"}
                                                                        buttonId={"p.BootstrapBadge.ListenToGrid.actionButton3"}
                                                                        class={"mx-name-actionButton3"}
                                                                        renderType={"button"}
                                                                        buttonClass={"btn-default"}
                                                                        caption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "New" }, "args": {} }
                                                                        })}
                                                                        tooltip={TextProperty({
                                                                            "value": ""
                                                                        })}
                                                                        action={ActionProperty({
                                                                            "action": { "type": "createObject", "argMap": {}, "config": { "entity": "BootstrapBadge.Badge", "operationId": "/lxkSUNDHlytF+Jx1HU4eg", "pageSettings": { "name": "BootstrapBadge/Badge_NewEdit_2.page.xml", "title": t([ { "type": "literal", "value": "New Badge" }, { "type": "literal", "value": "New Badge" } ]), "location": "popup", "resizable": true, "allowedRoles": [ "Administrator", "User" ] }, "allowedRoles": [ "Administrator", "User" ], "objectParameter": "param$Badge" }, "disabledDuringExecution": true },
                                                                            "abortOnServerValidation": true
                                                                        })} />
                                                                ]} />
                                                        ]}
                                                        itemSelection={SelectionProperty({
                                                            "selectionType": "Single",
                                                            "dataSourceId": "p.0"
                                                        })}
                                                        itemSelectionMethod={"rowClick"}
                                                        autoSelect={false}
                                                        itemSelectionMode={"clear"}
                                                        showSelectAllToggle={true}
                                                        enableSelectAll={false}
                                                        keepSelection={false}
                                                        selectionCounterPosition={"bottom"}
                                                        loadingType={"spinner"}
                                                        refreshIndicator={false}
                                                        pageSize={20}
                                                        pagination={"buttons"}
                                                        useCustomPagination={false}
                                                        showPagingButtons={"always"}
                                                        showNumberOfRows={false}
                                                        pagingPosition={"bottom"}
                                                        loadMoreButtonCaption={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Load More" }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Laad meer" }, "args": {} }
                                                            })
                                                        ])}
                                                        showEmptyPlaceholder={"none"}
                                                        columnsSortable={true}
                                                        columnsResizable={true}
                                                        columnsDraggable={true}
                                                        columnsHidable={true}
                                                        configurationStorageType={"attribute"}
                                                        storeFiltersInPersonalization={true}
                                                        filterSectionTitle={ExpressionProperty({
                                                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                        })}
                                                        exportDialogLabel={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Export progress" }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Exportvoortgang" }, "args": {} }
                                                            })
                                                        ])}
                                                        cancelExportLabel={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Cancel data export" }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Gegevensexport annuleren" }, "args": {} }
                                                            })
                                                        ])}
                                                        selectRowLabel={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Select row" }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Rij selecteren" }, "args": {} }
                                                            })
                                                        ])}
                                                        selectAllRowsLabel={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Select all rows" }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Selecteer alle rijen" }, "args": {} }
                                                            })
                                                        ])}
                                                        singleSelectionColumnLabel={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Select single row" }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Selecteer enkele rij" }, "args": {} }
                                                            })
                                                        ])}
                                                        selectingAllLabel={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Selecting all items..." }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Alle items selecteren..." }, "args": {} }
                                                            })
                                                        ])}
                                                        cancelSelectionLabel={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Cancel selection" }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Selectie annuleren" }, "args": {} }
                                                            })
                                                        ])}
                                                        selectedCountTemplateSingular={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "%d row selected" }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "%d rij geselecteerd" }, "args": {} }
                                                            })
                                                        ])}
                                                        selectedCountTemplatePlural={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "%d rows selected" }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "%d rijen geselecteerd" }, "args": {} }
                                                            })
                                                        ])}
                                                        selectAllText={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Select all rows in the data source" }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Selecteer alle rijen in de gegevensbron" }, "args": {} }
                                                            })
                                                        ])}
                                                        selectAllTemplate={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Select all %d rows in the data source" }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Selecteer alle %d rijen in de gegevensbron" }, "args": {} }
                                                            })
                                                        ])}
                                                        allSelectedText={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "All %d rows selected." }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Alle %d rijen geselecteerd." }, "args": {} }
                                                            })
                                                        ])}
                                                        clearSelectionButtonLabel={t([
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Clear selection" }, "args": {} }
                                                            }),
                                                            ExpressionProperty({
                                                                "expression": { "expr": { "type": "literal", "value": "Selectie wissen" }, "args": {} }
                                                            })
                                                        ])}
                                                        class={"mx-name-grid1"} />
                                                ]} />,
                                            <$Div key={"p.BootstrapBadge.ListenToGrid.layoutGrid2$row0$column1"}
                                                $widgetId={"p.BootstrapBadge.ListenToGrid.layoutGrid2$row0$column1"}
                                                class={"col-lg-3 col-md-12 col-12"}
                                                content={[
                                                    <$Text key={"p.BootstrapBadge.ListenToGrid.text1"}
                                                        $widgetId={"p.BootstrapBadge.ListenToGrid.text1"}
                                                        class={"mx-name-text1"}
                                                        caption={ExpressionProperty({
                                                            "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                        })}
                                                        renderMode={"h2"} />,
                                                    <$DataView key={"p.BootstrapBadge.ListenToGrid.dataView1"}
                                                        $widgetId={"p.BootstrapBadge.ListenToGrid.dataView1"}
                                                        class={"mx-name-dataView1 form-horizontal"}
                                                        object={ListenObjectProperty({
                                                            "dataSourceId": "p.32",
                                                            "editable": false,
                                                            "listenTo": "p.BootstrapBadge.ListenToGrid.grid1",
                                                            "operationId": "CgRfVSvrLlmKCQNriyh6TQ"
                                                        })}
                                                        emptyMessage={TextProperty({
                                                            "value": ""
                                                        })}
                                                        body={[
                                                            <$Fragment key={"p.BootstrapBadge.ListenToGrid.snippetCallWidget1"}
                                                                $widgetId={"p.BootstrapBadge.ListenToGrid.snippetCallWidget1"}
                                                                content={[
                                                                    <$Badge key={"p.BootstrapBadge.BadgeSnippetVertical.badgeV23"}
                                                                        $widgetId={"p.BootstrapBadge.BadgeSnippetVertical.badgeV23"}
                                                                        type={"badge"}
                                                                        value={t([
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "variable", "variable": "Badge", "path": "DataString" }, "args": { "Badge": { "widget": "p.BootstrapBadge.ListenToGrid.dataView1", "source": "object" } } }
                                                                            }),
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                            })
                                                                        ])}
                                                                        class={"mx-name-badgeV23"} />
                                                                ]} />
                                                        ]}
                                                        hideFooter={false} />
                                                ]} />,
                                            <$Div key={"p.BootstrapBadge.ListenToGrid.layoutGrid2$row0$column2"}
                                                $widgetId={"p.BootstrapBadge.ListenToGrid.layoutGrid2$row0$column2"}
                                                class={"col-lg-3 col-md-12 col-12"}
                                                content={[
                                                    <$Text key={"p.BootstrapBadge.ListenToGrid.text2"}
                                                        $widgetId={"p.BootstrapBadge.ListenToGrid.text2"}
                                                        class={"mx-name-text2"}
                                                        caption={ExpressionProperty({
                                                            "expression": { "expr": { "type": "literal", "value": "Color Label" }, "args": {} }
                                                        })}
                                                        renderMode={"h2"} />,
                                                    <$DataView key={"p.BootstrapBadge.ListenToGrid.dataView2"}
                                                        $widgetId={"p.BootstrapBadge.ListenToGrid.dataView2"}
                                                        class={"mx-name-dataView2 form-horizontal"}
                                                        object={ListenObjectProperty({
                                                            "dataSourceId": "p.43",
                                                            "editable": false,
                                                            "listenTo": "p.BootstrapBadge.ListenToGrid.grid1",
                                                            "operationId": "7IeSD1TAd1W9kt6SfT3ztQ"
                                                        })}
                                                        emptyMessage={TextProperty({
                                                            "value": ""
                                                        })}
                                                        body={[
                                                            <$Fragment key={"p.BootstrapBadge.ListenToGrid.snippetCall1"}
                                                                $widgetId={"p.BootstrapBadge.ListenToGrid.snippetCall1"}
                                                                content={[
                                                                    <$Badge key={"p.BootstrapBadge.ColorLabelSnippetVertical.badgeV23"}
                                                                        $widgetId={"p.BootstrapBadge.ColorLabelSnippetVertical.badgeV23"}
                                                                        type={"label"}
                                                                        value={t([
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "variable", "variable": "Badge", "path": "DataString" }, "args": { "Badge": { "widget": "p.BootstrapBadge.ListenToGrid.dataView2", "source": "object" } } }
                                                                            }),
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                            })
                                                                        ])}
                                                                        class={"mx-name-badgeV23"} />
                                                                ]} />
                                                        ]}
                                                        hideFooter={false} />
                                                ]} />
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
