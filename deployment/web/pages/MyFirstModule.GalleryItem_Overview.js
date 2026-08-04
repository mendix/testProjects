import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { DatabaseObjectListProperty } from "mendix/DatabaseObjectListProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { ListActionProperty } from "mendix/ListActionProperty";
import { ListAttributeProperty } from "mendix/ListAttributeProperty";
import { TemplatedWidgetProperty } from "mendix/TemplatedWidgetProperty";
import { WebDynamicImageProperty } from "mendix/WebDynamicImageProperty";

import * as DatagridWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagrid/Datagrid.mjs";
const Datagrid = Object.getOwnPropertyDescriptor(DatagridWidgetModule, "Datagrid")?.get() || Object.getOwnPropertyDescriptor(DatagridWidgetModule, "default")?.get();   
import * as DatagridDropdownFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagriddropdownfilter/DatagridDropdownFilter.mjs";
const DatagridDropdownFilter = Object.getOwnPropertyDescriptor(DatagridDropdownFilterWidgetModule, "DatagridDropdownFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridDropdownFilterWidgetModule, "default")?.get();   
import * as DatagridNumberFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagridnumberfilter/DatagridNumberFilter.mjs";
const DatagridNumberFilter = Object.getOwnPropertyDescriptor(DatagridNumberFilterWidgetModule, "DatagridNumberFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridNumberFilterWidgetModule, "default")?.get();   
import * as DatagridTextFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagridtextfilter/DatagridTextFilter.mjs";
const DatagridTextFilter = Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "DatagridTextFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "default")?.get();   
import { Div } from "mendix/widgets/web/Div";
import * as ImageWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.mjs";
const Image = Object.getOwnPropertyDescriptor(ImageWidgetModule, "Image")?.get() || Object.getOwnPropertyDescriptor(ImageWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.css";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Div, $Text, $Datagrid, $Image, $DatagridTextFilter, $DatagridNumberFilter, $DatagridDropdownFilter } = asPluginWidgets({ Div, Text, Datagrid, Image, DatagridTextFilter, DatagridNumberFilter, DatagridDropdownFilter });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.MyFirstModule.GalleryItem_Overview.layoutGrid1"}
        $widgetId={"p.MyFirstModule.GalleryItem_Overview.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.MyFirstModule.GalleryItem_Overview.layoutGrid1$row0"}
                $widgetId={"p.MyFirstModule.GalleryItem_Overview.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.MyFirstModule.GalleryItem_Overview.layoutGrid1$row0$column0"}
                        $widgetId={"p.MyFirstModule.GalleryItem_Overview.layoutGrid1$row0$column0"}
                        class={"col-lg col-md col"}
                        content={[
                            <$Text key={"p.MyFirstModule.GalleryItem_Overview.text1"}
                                $widgetId={"p.MyFirstModule.GalleryItem_Overview.text1"}
                                class={"mx-name-text1"}
                                caption={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Gallery Item" }, "args": {} }
                                })}
                                renderMode={"h2"} />,
                            <$Datagrid key={"p.MyFirstModule.GalleryItem_Overview.dataGrid21"}
                                $widgetId={"p.MyFirstModule.GalleryItem_Overview.dataGrid21"}
                                datasource={DatabaseObjectListProperty({
                                    "dataSourceId": "p.0",
                                    "entity": "MyFirstModule.GalleryItem",
                                    "operationId": "XguJHJD7gVCSM0Twgs9VMA",
                                    "sort": [
                                        [
                                            "FullName",
                                            "asc"
                                        ]
                                    ]
                                })}
                                columns={[
                                    {
                                        "showContentAs": "customContent",
                                        "attribute": ListAttributeProperty({
                                            "path": "",
                                            "entity": "MyFirstModule.GalleryItem",
                                            "attribute": "Name",
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
                                                <$Image key={"p.MyFirstModule.GalleryItem_Overview.image1"}
                                                    $widgetId={"p.MyFirstModule.GalleryItem_Overview.image1"}
                                                    datasource={"image"}
                                                    imageObject={WebDynamicImageProperty({
                                                        "scope": "p.MyFirstModule.GalleryItem_Overview.dataGrid21",
                                                        "showAsThumbnail": false,
                                                        "shareObject": false,
                                                        "allowUpload": false
                                                    })}
                                                    imageUrl={ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })}
                                                    isBackgroundImage={false}
                                                    onClickType={"action"}
                                                    alternativeText={ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })}
                                                    widthUnit={"auto"}
                                                    width={100}
                                                    heightUnit={"auto"}
                                                    height={100}
                                                    iconSize={14}
                                                    displayAs={"thumbnail"}
                                                    responsive={true}
                                                    class={"mx-name-image1"} />
                                            ]
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Image" }, "args": {} }
                                        }),
                                        "sortable": false,
                                        "resizable": false,
                                        "draggable": false,
                                        "hidable": "no",
                                        "width": "autoFit",
                                        "size": 1,
                                        "alignment": "left",
                                        "tooltip": undefined,
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
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
                                            "entity": "MyFirstModule.GalleryItem",
                                            "attribute": "FullName",
                                            "attributeType": "String",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.0",
                                            "isList": false
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Full name" }, "args": {} }
                                        }),
                                        "filter": [
                                            <$DatagridTextFilter key={"p.MyFirstModule.GalleryItem_Overview.textFilter1"}
                                                $widgetId={"p.MyFirstModule.GalleryItem_Overview.textFilter1"}
                                                defaultFilter={"contains"}
                                                placeholder={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Type a name" }, "args": {} }
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
                                        "sortable": true,
                                        "resizable": true,
                                        "draggable": true,
                                        "hidable": "yes",
                                        "width": "autoFill",
                                        "size": 1,
                                        "alignment": "left",
                                        "tooltip": undefined,
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
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
                                            "entity": "MyFirstModule.GalleryItem",
                                            "attribute": "Age",
                                            "attributeType": "Decimal",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.0",
                                            "isList": false
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Age" }, "args": {} }
                                        }),
                                        "filter": [
                                            <$DatagridNumberFilter key={"p.MyFirstModule.GalleryItem_Overview.numberFilter1"}
                                                $widgetId={"p.MyFirstModule.GalleryItem_Overview.numberFilter1"}
                                                defaultFilter={"equal"}
                                                placeholder={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Type an age" }, "args": {} }
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
                                                class={"mx-name-numberFilter1"} />
                                        ],
                                        "sortable": true,
                                        "resizable": true,
                                        "draggable": true,
                                        "hidable": "yes",
                                        "width": "autoFill",
                                        "size": 1,
                                        "alignment": "left",
                                        "tooltip": undefined,
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
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
                                            "entity": "MyFirstModule.GalleryItem",
                                            "attribute": "IsSenior",
                                            "attributeType": "Boolean",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.0",
                                            "isList": false
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Is Senior?" }, "args": {} }
                                        }),
                                        "filter": [
                                            <$DatagridDropdownFilter key={"p.MyFirstModule.GalleryItem_Overview.drop_downFilter1"}
                                                $widgetId={"p.MyFirstModule.GalleryItem_Overview.drop_downFilter1"}
                                                auto={true}
                                                filterOptions={[]}
                                                emptyOptionCaption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Select a value" }, "args": {} }
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
                                        "sortable": true,
                                        "resizable": true,
                                        "draggable": true,
                                        "hidable": "yes",
                                        "width": "autoFill",
                                        "size": 1,
                                        "alignment": "left",
                                        "tooltip": undefined,
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
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
                                            "entity": "MyFirstModule.GalleryItem",
                                            "attribute": "Role",
                                            "attributeType": "Enum",
                                            "sortable": true,
                                            "filterable": true,
                                            "dataSourceId": "p.0",
                                            "isList": false
                                        }),
                                        "dynamicText": undefined,
                                        "header": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Role" }, "args": {} }
                                        }),
                                        "filter": [
                                            <$DatagridDropdownFilter key={"p.MyFirstModule.GalleryItem_Overview.drop_downFilter2"}
                                                $widgetId={"p.MyFirstModule.GalleryItem_Overview.drop_downFilter2"}
                                                auto={true}
                                                filterOptions={[]}
                                                emptyOptionCaption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Select a role" }, "args": {} }
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
                                                class={"mx-name-drop_downFilter2"} />
                                        ],
                                        "sortable": true,
                                        "resizable": true,
                                        "draggable": true,
                                        "hidable": "yes",
                                        "width": "autoFill",
                                        "size": 1,
                                        "alignment": "left",
                                        "tooltip": undefined,
                                        "visible": ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": true }, "args": {} }
                                        }),
                                        "wrapText": false,
                                        "minWidth": "auto",
                                        "minWidthLimit": 100,
                                        "exportValue": undefined,
                                        "allowEventPropagation": true,
                                        "exportType": "default"
                                    }
                                ]}
                                columnsFilterable={true}
                                pageSize={10}
                                pagination={"buttons"}
                                pagingPosition={"top"}
                                showEmptyPlaceholder={"none"}
                                onClick={ListActionProperty({
                                    "action": { "type": "openPage", "argMap": { "param$GalleryItem": { "widget": "p.MyFirstModule.GalleryItem_Overview.dataGrid21", "source": "object" } }, "config": { "name": "MyFirstModule/GalleryItem_NewEdit.page.xml", "location": "modal", "resizable": true, "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                    "abortOnServerValidation": false,
                                    "dataSourceId": "p.0",
                                    "argumentTypes": { }
                                })}
                                columnsSortable={true}
                                columnsResizable={true}
                                columnsDraggable={true}
                                columnsHidable={true}
                                filtersPlaceholder={[
                                    <$Div key={"p.MyFirstModule.GalleryItem_Overview.layoutGrid2"}
                                        $widgetId={"p.MyFirstModule.GalleryItem_Overview.layoutGrid2"}
                                        class={"mx-name-layoutGrid2 mx-layoutgrid mx-layoutgrid-fluid spacing-outer-left-medium spacing-outer-right-medium spacing-outer-top-medium spacing-outer-bottom-medium"}
                                        content={[
                                            <$Div key={"p.MyFirstModule.GalleryItem_Overview.layoutGrid2$row0"}
                                                $widgetId={"p.MyFirstModule.GalleryItem_Overview.layoutGrid2$row0"}
                                                class={"row"}
                                                content={[
                                                    <$Div key={"p.MyFirstModule.GalleryItem_Overview.layoutGrid2$row0$column0"}
                                                        $widgetId={"p.MyFirstModule.GalleryItem_Overview.layoutGrid2$row0$column0"}
                                                        class={"col-lg col-md col"}
                                                        content={[
                                                            <$DatagridTextFilter key={"p.MyFirstModule.GalleryItem_Overview.textFilter2"}
                                                                $widgetId={"p.MyFirstModule.GalleryItem_Overview.textFilter2"}
                                                                defaultFilter={"contains"}
                                                                placeholder={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Type a full name" }, "args": {} }
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
                                                        ]} />,
                                                    <$Div key={"p.MyFirstModule.GalleryItem_Overview.layoutGrid2$row0$column1"}
                                                        $widgetId={"p.MyFirstModule.GalleryItem_Overview.layoutGrid2$row0$column1"}
                                                        class={"col-lg col-md col"}
                                                        content={[
                                                            <$DatagridDropdownFilter key={"p.MyFirstModule.GalleryItem_Overview.drop_downFilter3"}
                                                                $widgetId={"p.MyFirstModule.GalleryItem_Overview.drop_downFilter3"}
                                                                auto={true}
                                                                filterOptions={[]}
                                                                emptyOptionCaption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Select a role or is senior" }, "args": {} }
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
                                                                class={"mx-name-drop_downFilter3"} />
                                                        ]} />
                                                ]} />
                                        ]} />
                                ]}
                                refreshInterval={0}
                                itemSelectionMethod={"checkbox"}
                                showSelectAllToggle={true}
                                showPagingButtons={"always"}
                                onClickTrigger={"single"}
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
    "Gallery Item Overview"
]);

export const classes = "layout-atlas layout-atlas-responsive-default";

export const autofocus = "desktopOnly";
export const url = "/p/overview";
export const style = {};
export const parameters = {};
export const content = { ...parentContent,
    "Atlas_Core.Atlas_Default.Main": region$Main,
};
