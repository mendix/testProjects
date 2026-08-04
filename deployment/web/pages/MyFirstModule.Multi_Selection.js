import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AttributeMetaDataProperty } from "mendix/AttributeMetaDataProperty";
import { DatabaseObjectListProperty } from "mendix/DatabaseObjectListProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { ListExpressionProperty } from "mendix/ListExpressionProperty";
import { SelectionProperty } from "mendix/SelectionProperty";
import { TemplatedWidgetProperty } from "mendix/TemplatedWidgetProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebDynamicImageProperty } from "mendix/WebDynamicImageProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import { ConditionalVisibilityWrapper } from "mendix/widgets/web/ConditionalVisibilityWrapper";
import { Container } from "mendix/widgets/web/Container";
import * as DatagridDateFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagriddatefilter/DatagridDateFilter.mjs";
const DatagridDateFilter = Object.getOwnPropertyDescriptor(DatagridDateFilterWidgetModule, "DatagridDateFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridDateFilterWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagriddatefilter/DatagridDateFilter.css";
import * as DatagridDropdownFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagriddropdownfilter/DatagridDropdownFilter.mjs";
const DatagridDropdownFilter = Object.getOwnPropertyDescriptor(DatagridDropdownFilterWidgetModule, "DatagridDropdownFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridDropdownFilterWidgetModule, "default")?.get();   
import * as DatagridNumberFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagridnumberfilter/DatagridNumberFilter.mjs";
const DatagridNumberFilter = Object.getOwnPropertyDescriptor(DatagridNumberFilterWidgetModule, "DatagridNumberFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridNumberFilterWidgetModule, "default")?.get();   
import * as DatagridTextFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagridtextfilter/DatagridTextFilter.mjs";
const DatagridTextFilter = Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "DatagridTextFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "default")?.get();   
import { Div } from "mendix/widgets/web/Div";
import * as DropdownSortWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/dropdownsort/DropdownSort.mjs";
const DropdownSort = Object.getOwnPropertyDescriptor(DropdownSortWidgetModule, "DropdownSort")?.get() || Object.getOwnPropertyDescriptor(DropdownSortWidgetModule, "default")?.get();   
import * as GalleryWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/gallery/Gallery.mjs";
const Gallery = Object.getOwnPropertyDescriptor(GalleryWidgetModule, "Gallery")?.get() || Object.getOwnPropertyDescriptor(GalleryWidgetModule, "default")?.get();   
import * as ImageWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.mjs";
const Image = Object.getOwnPropertyDescriptor(ImageWidgetModule, "Image")?.get() || Object.getOwnPropertyDescriptor(ImageWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.css";
import * as SelectionHelperWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/selectionhelper/SelectionHelper.mjs";
const SelectionHelper = Object.getOwnPropertyDescriptor(SelectionHelperWidgetModule, "SelectionHelper")?.get() || Object.getOwnPropertyDescriptor(SelectionHelperWidgetModule, "default")?.get();   
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Container, $Div, $Text, $ConditionalVisibilityWrapper, $ActionButton, $Gallery, $Image, $DatagridTextFilter, $DatagridNumberFilter, $DatagridDropdownFilter, $DatagridDateFilter, $SelectionHelper, $DropdownSort } = asPluginWidgets({ Container, Div, Text, ConditionalVisibilityWrapper, ActionButton, Gallery, Image, DatagridTextFilter, DatagridNumberFilter, DatagridDropdownFilter, DatagridDateFilter, SelectionHelper, DropdownSort });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Container key={"p.MyFirstModule.Multi_Selection.container1"}
        $widgetId={"p.MyFirstModule.Multi_Selection.container1"}
        class={"mx-name-container1 pageheader"}
        renderMode={"div"}
        content={[
            <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid2"}
                $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid2"}
                class={"mx-name-layoutGrid2 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
                content={[
                    <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid2$row0"}
                        $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid2$row0"}
                        class={"row"}
                        content={[
                            <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid2$row0$column0"}
                                $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid2$row0$column0"}
                                class={"col-lg col-md col"}
                                content={[
                                    <$Text key={"p.MyFirstModule.Multi_Selection.text1"}
                                        $widgetId={"p.MyFirstModule.Multi_Selection.text1"}
                                        class={"mx-name-text1 pageheader-title spacing-outer-bottom"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Multi Selection" }, "args": {} }
                                        })}
                                        renderMode={"h3"} />
                                ]} />
                        ]} />
                ]} />
        ]}
        ariaHidden={false} />,
    <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid1"}
        $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid1$row0"}
                $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid1$row0$column0"}
                        $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid1$row0$column0"}
                        class={"col-lg col-md col"}
                        content={[
                            <$ConditionalVisibilityWrapper key={"p.MyFirstModule.Multi_Selection.actionButton1$visibility"}
                                $widgetId={"p.MyFirstModule.Multi_Selection.actionButton1$visibility"}
                                visible={ExpressionProperty({
                                    "expression": { "expr": { "type": "function", "name": "_hasSomeRole", "parameters": [ { "type": "literal", "value": "Administrator" }, { "type": "literal", "value": "User" } ] }, "args": {} }
                                })}
                                contents={[
                                    <$ActionButton key={"p.MyFirstModule.Multi_Selection.actionButton1"}
                                        $widgetId={"p.MyFirstModule.Multi_Selection.actionButton1"}
                                        buttonId={"p.MyFirstModule.Multi_Selection.actionButton1"}
                                        class={"mx-name-actionButton1"}
                                        renderType={"button"}
                                        buttonClass={"btn-default"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Gallery item Overview" }, "args": {} }
                                        })}
                                        tooltip={TextProperty({
                                            "value": ""
                                        })}
                                        action={ActionProperty({
                                            "action": { "type": "openPage", "argMap": {}, "config": { "name": "MyFirstModule/GalleryItem_Overview.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ], "pageAddressExpression": { "expr": { "type": "function", "name": "+", "parameters": [ { "type": "literal", "value": "/p/" }, { "type": "literal", "value": "overview" } ] }, "args": {} } }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />,
                            <$Container key={"p.MyFirstModule.Multi_Selection.container3"}
                                $widgetId={"p.MyFirstModule.Multi_Selection.container3"}
                                class={"mx-name-container3"}
                                renderMode={"div"}
                                content={[
                                    <$Gallery key={"p.MyFirstModule.Multi_Selection.gallery1"}
                                        $widgetId={"p.MyFirstModule.Multi_Selection.gallery1"}
                                        datasource={DatabaseObjectListProperty({
                                            "dataSourceId": "p.10",
                                            "entity": "MyFirstModule.GalleryItem",
                                            "operationId": "OLSKM9WJt1ytrQbbn7xCsA",
                                            "sort": [
                                                [
                                                    "FullName",
                                                    "asc"
                                                ]
                                            ]
                                        })}
                                        content={TemplatedWidgetProperty({
                                            "dataSourceId": "p.10",
                                            "editable": false,
                                            "children": () => [
                                                <$Container key={"p.MyFirstModule.Multi_Selection.container2"}
                                                    $widgetId={"p.MyFirstModule.Multi_Selection.container2"}
                                                    class={"mx-name-container2 col-center spacing-outer-top spacing-outer-bottom spacing-outer-left spacing-outer-right"}
                                                    renderMode={"div"}
                                                    content={[
                                                        <$Text key={"p.MyFirstModule.Multi_Selection.text3"}
                                                            $widgetId={"p.MyFirstModule.Multi_Selection.text3"}
                                                            class={"mx-name-text3"}
                                                            caption={ExpressionProperty({
                                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "FullName" }, "args": { "currentObject": { "widget": "p.MyFirstModule.Multi_Selection.gallery1", "source": "object" } } }
                                                            })}
                                                            renderMode={"p"} />,
                                                        <$Text key={"p.MyFirstModule.Multi_Selection.text4"}
                                                            $widgetId={"p.MyFirstModule.Multi_Selection.text4"}
                                                            class={"mx-name-text4"}
                                                            caption={ExpressionProperty({
                                                                "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "Age" }, { "type": "literal", "value": "{\"decimalPrecision\":0}" } ] }, "args": { "currentObject": { "widget": "p.MyFirstModule.Multi_Selection.gallery1", "source": "object" } } }
                                                            })}
                                                            renderMode={"span"} />,
                                                        <$Image key={"p.MyFirstModule.Multi_Selection.image1"}
                                                            $widgetId={"p.MyFirstModule.Multi_Selection.image1"}
                                                            datasource={"image"}
                                                            imageObject={WebDynamicImageProperty({
                                                                "scope": "p.MyFirstModule.Multi_Selection.gallery1",
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
                                                            widthUnit={"pixels"}
                                                            width={250}
                                                            heightUnit={"pixels"}
                                                            height={250}
                                                            iconSize={14}
                                                            displayAs={"fullImage"}
                                                            responsive={true}
                                                            class={"mx-name-image1"} />
                                                    ]}
                                                    ariaHidden={false} />
                                            ]
                                        })}
                                        desktopItems={4}
                                        tabletItems={3}
                                        phoneItems={2}
                                        pageSize={3}
                                        pagination={"buttons"}
                                        pagingPosition={"bottom"}
                                        showEmptyPlaceholder={"none"}
                                        itemClass={ListExpressionProperty({
                                            "expression": { "expr": { "type": "conditional", "condition": { "type": "function", "name": "=", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "FullName" }, { "type": "literal", "value": "Isa" } ] }, "then": { "type": "literal", "value": "widget-gallery-column-span-2 aquamarine-background" }, "else": { "type": "conditional", "condition": { "type": "function", "name": "=", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "FullName" }, { "type": "literal", "value": "Leo" } ] }, "then": { "type": "literal", "value": "widget-gallery-row-span-2 red-background" }, "else": { "type": "literal", "value": "" } } }, "args": { "currentObject": { "widget": "p.MyFirstModule.Multi_Selection.gallery1", "source": "object" } } },
                                            "dataSourceId": "p.10"
                                        })}
                                        filtersPlaceholder={[
                                            <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid3"}
                                                $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid3"}
                                                class={"mx-name-layoutGrid3 mx-layoutgrid mx-layoutgrid-fluid"}
                                                content={[
                                                    <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid3$row0"}
                                                        $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid3$row0"}
                                                        class={"row"}
                                                        content={[
                                                            <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid3$row0$column0"}
                                                                $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid3$row0$column0"}
                                                                class={"col-lg col-md col"}
                                                                content={[
                                                                    <$DatagridTextFilter key={"p.MyFirstModule.Multi_Selection.textFilter1"}
                                                                        $widgetId={"p.MyFirstModule.Multi_Selection.textFilter1"}
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
                                                                        attrChoice={"linked"}
                                                                        attributes={[
                                                                            {
                                                                                "attribute": AttributeMetaDataProperty({
                                                                                    "path": "",
                                                                                    "entity": "MyFirstModule.GalleryItem",
                                                                                    "attribute": "FullName",
                                                                                    "attributeType": "String",
                                                                                    "sortable": true,
                                                                                    "filterable": true,
                                                                                    "dataSourceId": "p.10",
                                                                                    "isList": false
                                                                                })
                                                                            }
                                                                        ]}
                                                                        class={"mx-name-textFilter1"} />
                                                                ]} />,
                                                            <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid3$row0$column1"}
                                                                $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid3$row0$column1"}
                                                                class={"col-lg col-md col"}
                                                                content={[
                                                                    <$DatagridNumberFilter key={"p.MyFirstModule.Multi_Selection.numberFilter1"}
                                                                        $widgetId={"p.MyFirstModule.Multi_Selection.numberFilter1"}
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
                                                                        attrChoice={"linked"}
                                                                        attributes={[
                                                                            {
                                                                                "attribute": AttributeMetaDataProperty({
                                                                                    "path": "",
                                                                                    "entity": "MyFirstModule.GalleryItem",
                                                                                    "attribute": "Age",
                                                                                    "attributeType": "Decimal",
                                                                                    "sortable": true,
                                                                                    "filterable": true,
                                                                                    "dataSourceId": "p.10",
                                                                                    "isList": false
                                                                                })
                                                                            }
                                                                        ]}
                                                                        class={"mx-name-numberFilter1"} />
                                                                ]} />
                                                        ]} />,
                                                    <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid3$row1"}
                                                        $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid3$row1"}
                                                        class={"row"}
                                                        content={[
                                                            <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid3$row1$column0"}
                                                                $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid3$row1$column0"}
                                                                class={"col-lg col-md col"}
                                                                content={[
                                                                    <$DatagridDropdownFilter key={"p.MyFirstModule.Multi_Selection.drop_downFilter1"}
                                                                        $widgetId={"p.MyFirstModule.Multi_Selection.drop_downFilter1"}
                                                                        auto={false}
                                                                        filterOptions={[
                                                                            {
                                                                                "caption": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Architect" }, "args": {} }
                                                                                }),
                                                                                "value": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Architect" }, "args": {} }
                                                                                })
                                                                            },
                                                                            {
                                                                                "caption": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Product Designer" }, "args": {} }
                                                                                }),
                                                                                "value": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Product_Designer" }, "args": {} }
                                                                                })
                                                                            },
                                                                            {
                                                                                "caption": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Product Manager" }, "args": {} }
                                                                                }),
                                                                                "value": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Product_Manager" }, "args": {} }
                                                                                })
                                                                            },
                                                                            {
                                                                                "caption": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "QA Engineer" }, "args": {} }
                                                                                }),
                                                                                "value": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "QA_Engineer" }, "args": {} }
                                                                                })
                                                                            },
                                                                            {
                                                                                "caption": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Software Development Manager" }, "args": {} }
                                                                                }),
                                                                                "value": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Software_Development_Manager" }, "args": {} }
                                                                                })
                                                                            },
                                                                            {
                                                                                "caption": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Software Engineer" }, "args": {} }
                                                                                }),
                                                                                "value": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Software_Engineer" }, "args": {} }
                                                                                })
                                                                            },
                                                                            {
                                                                                "caption": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Team Lead" }, "args": {} }
                                                                                }),
                                                                                "value": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Team_Lead" }, "args": {} }
                                                                                })
                                                                            },
                                                                            {
                                                                                "caption": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Tech Lead" }, "args": {} }
                                                                                }),
                                                                                "value": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Tech_Lead" }, "args": {} }
                                                                                })
                                                                            }
                                                                        ]}
                                                                        emptyOptionCaption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "Select a role" }, "args": {} }
                                                                        })}
                                                                        multiSelect={false}
                                                                        ariaLabel={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                                        })}
                                                                        baseType={"attr"}
                                                                        attrChoice={"linked"}
                                                                        attr={AttributeMetaDataProperty({
                                                                            "path": "",
                                                                            "entity": "MyFirstModule.GalleryItem",
                                                                            "attribute": "Role",
                                                                            "attributeType": "Enum",
                                                                            "sortable": true,
                                                                            "filterable": true,
                                                                            "dataSourceId": "p.10",
                                                                            "isList": false
                                                                        })}
                                                                        fetchOptionsLazy={false}
                                                                        filterable={false}
                                                                        clearable={true}
                                                                        selectedItemsStyle={"text"}
                                                                        selectionMethod={"checkbox"}
                                                                        emptySelectionCaption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "Select a role" }, "args": {} }
                                                                        })}
                                                                        filterInputPlaceholderCaption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "Search" }, "args": {} }
                                                                        })}
                                                                        refCaptionSource={"attr"}
                                                                        class={"mx-name-drop_downFilter1"} />
                                                                ]} />,
                                                            <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid3$row1$column1"}
                                                                $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid3$row1$column1"}
                                                                class={"col-lg col-md col"}
                                                                content={[
                                                                    <$DatagridDateFilter key={"p.MyFirstModule.Multi_Selection.dateFilter1"}
                                                                        $widgetId={"p.MyFirstModule.Multi_Selection.dateFilter1"}
                                                                        defaultFilter={"greater"}
                                                                        placeholder={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "Initial date" }, "args": {} }
                                                                        })}
                                                                        adjustable={true}
                                                                        screenReaderButtonCaption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                                        })}
                                                                        screenReaderInputCaption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                                        })}
                                                                        screenReaderCalendarCaption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                                        })}
                                                                        attrChoice={"linked"}
                                                                        attributes={[
                                                                            {
                                                                                "attribute": AttributeMetaDataProperty({
                                                                                    "path": "",
                                                                                    "entity": "MyFirstModule.GalleryItem",
                                                                                    "attribute": "Birthday",
                                                                                    "attributeType": "DateTime",
                                                                                    "sortable": true,
                                                                                    "filterable": true,
                                                                                    "dataSourceId": "p.10",
                                                                                    "isList": false
                                                                                })
                                                                            }
                                                                        ]}
                                                                        class={"mx-name-dateFilter1"} />
                                                                ]} />
                                                        ]} />,
                                                    <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid3$row2"}
                                                        $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid3$row2"}
                                                        class={"row"}
                                                        content={[
                                                            <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid3$row2$column0"}
                                                                $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid3$row2$column0"}
                                                                class={"col-lg col-md col"}
                                                                content={[
                                                                    <$SelectionHelper key={"p.MyFirstModule.Multi_Selection.selectionHelper1"}
                                                                        $widgetId={"p.MyFirstModule.Multi_Selection.selectionHelper1"}
                                                                        renderStyle={"checkbox"}
                                                                        checkboxCaption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "Select All" }, "args": {} }
                                                                        })}
                                                                        class={"mx-name-selectionHelper1"} />
                                                                ]} />,
                                                            <$Div key={"p.MyFirstModule.Multi_Selection.layoutGrid3$row2$column1"}
                                                                $widgetId={"p.MyFirstModule.Multi_Selection.layoutGrid3$row2$column1"}
                                                                class={"col-lg col-md col"}
                                                                content={[
                                                                    <$DropdownSort key={"p.MyFirstModule.Multi_Selection.drop_downSort2"}
                                                                        $widgetId={"p.MyFirstModule.Multi_Selection.drop_downSort2"}
                                                                        emptyOptionCaption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "Select a field to sort" }, "args": {} }
                                                                        })}
                                                                        screenReaderButtonCaption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                                        })}
                                                                        screenReaderInputCaption={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                                        })}
                                                                        attributes={[
                                                                            {
                                                                                "attribute": AttributeMetaDataProperty({
                                                                                    "path": "",
                                                                                    "entity": "MyFirstModule.GalleryItem",
                                                                                    "attribute": "FullName",
                                                                                    "attributeType": "String",
                                                                                    "sortable": true,
                                                                                    "filterable": true,
                                                                                    "dataSourceId": "p.10",
                                                                                    "isList": false
                                                                                }),
                                                                                "caption": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Full name" }, "args": {} }
                                                                                })
                                                                            },
                                                                            {
                                                                                "attribute": AttributeMetaDataProperty({
                                                                                    "path": "",
                                                                                    "entity": "MyFirstModule.GalleryItem",
                                                                                    "attribute": "Age",
                                                                                    "attributeType": "Decimal",
                                                                                    "sortable": true,
                                                                                    "filterable": true,
                                                                                    "dataSourceId": "p.10",
                                                                                    "isList": false
                                                                                }),
                                                                                "caption": ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "literal", "value": "Age" }, "args": {} }
                                                                                })
                                                                            }
                                                                        ]}
                                                                        class={"mx-name-drop_downSort2"} />
                                                                ]} />
                                                        ]} />
                                                ]} />
                                        ]}
                                        itemSelection={SelectionProperty({
                                            "selectionType": "Multi",
                                            "dataSourceId": "p.10"
                                        })}
                                        filterSectionTitle={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Label 1" }, "args": {} }
                                        })}
                                        emptyMessageTitle={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Label 2" }, "args": {} }
                                        })}
                                        ariaLabelListBox={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Label 3" }, "args": {} }
                                        })}
                                        itemSelectionMode={"clear"}
                                        showPagingButtons={"always"}
                                        showTotalCount={false}
                                        onClickTrigger={"single"}
                                        ariaLabelItem={undefined}
                                        refreshInterval={0}
                                        autoSelect={false}
                                        keepSelection={false}
                                        selectionCountPosition={"bottom"}
                                        loadingType={"spinner"}
                                        refreshIndicator={false}
                                        useCustomPagination={false}
                                        loadMoreButtonCaption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Load More" }, "args": {} }
                                        })}
                                        stateStorageType={"attribute"}
                                        storeFilters={true}
                                        storeSort={true}
                                        selectedCountTemplateSingular={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "%d item selected" }, "args": {} }
                                        })}
                                        selectedCountTemplatePlural={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "%d items selected" }, "args": {} }
                                        })}
                                        clearSelectionButtonLabel={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Clear selection" }, "args": {} }
                                        })}
                                        class={"mx-name-gallery1"} />
                                ]}
                                ariaHidden={false} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Homepage"
]);

export const classes = "layout-atlas layout-atlas-responsive-default";

export const autofocus = "desktopOnly";
export const url = "/p/multi-selection";
export const style = {};
export const parameters = {};
export const content = { ...parentContent,
    "Atlas_Core.Atlas_Default.Main": region$Main,
};
