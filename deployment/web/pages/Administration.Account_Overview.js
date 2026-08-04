import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AssociationObjectListProperty } from "mendix/AssociationObjectListProperty";
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
import * as DatagridDropdownFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagriddropdownfilter/DatagridDropdownFilter.mjs";
const DatagridDropdownFilter = Object.getOwnPropertyDescriptor(DatagridDropdownFilterWidgetModule, "DatagridDropdownFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridDropdownFilterWidgetModule, "default")?.get();   
import * as DatagridTextFilterWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/datagridtextfilter/DatagridTextFilter.mjs";
const DatagridTextFilter = Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "DatagridTextFilter")?.get() || Object.getOwnPropertyDescriptor(DatagridTextFilterWidgetModule, "default")?.get();   
import { Div } from "mendix/widgets/web/Div";
import { ListView } from "mendix/widgets/web/ListView";
import { TabContainer } from "mendix/widgets/web/TabContainer";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Container, $Div, $Text, $TabContainer, $Datagrid, $DatagridTextFilter, $ListView, $DatagridDropdownFilter, $DatagridDateFilter, $ConditionalVisibilityWrapper, $ActionButton } = asPluginWidgets({ Container, Div, Text, TabContainer, Datagrid, DatagridTextFilter, ListView, DatagridDropdownFilter, DatagridDateFilter, ConditionalVisibilityWrapper, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Container key={"p.Administration.Account_Overview.container1"}
        $widgetId={"p.Administration.Account_Overview.container1"}
        class={"mx-name-container1 pageheader pageheader-fullwidth"}
        renderMode={"div"}
        content={[
            <$Div key={"p.Administration.Account_Overview.layoutGrid1"}
                $widgetId={"p.Administration.Account_Overview.layoutGrid1"}
                class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
                content={[
                    <$Div key={"p.Administration.Account_Overview.layoutGrid1$row0"}
                        $widgetId={"p.Administration.Account_Overview.layoutGrid1$row0"}
                        class={"row"}
                        content={[
                            <$Div key={"p.Administration.Account_Overview.layoutGrid1$row0$column0"}
                                $widgetId={"p.Administration.Account_Overview.layoutGrid1$row0$column0"}
                                class={"col-lg-12 col-md-12 col-12"}
                                content={[
                                    <$Text key={"p.Administration.Account_Overview.label1"}
                                        $widgetId={"p.Administration.Account_Overview.label1"}
                                        class={"mx-name-label1 pageheader-title"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Account Overview" }, "args": {} }
                                        })}
                                        renderMode={"h2"} />,
                                    <$Text key={"p.Administration.Account_Overview.label2"}
                                        $widgetId={"p.Administration.Account_Overview.label2"}
                                        class={"mx-name-label2 pageheader-subtitle"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "These are the local users of your app. Please note that only these users should be managed in this app. MendixSSO users are provisioned by the MendixSSO module and should be managed from the App User Management screen (Developer Portal > General Settings > Manage App Users)." }, "args": {} }
                                        })}
                                        renderMode={"h4"} />
                                ]} />
                        ]} />
                ]} />
        ]}
        ariaHidden={false} />,
    <$Div key={"p.Administration.Account_Overview.layoutGrid4"}
        $widgetId={"p.Administration.Account_Overview.layoutGrid4"}
        class={"mx-name-layoutGrid4 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.Administration.Account_Overview.layoutGrid4$row0"}
                $widgetId={"p.Administration.Account_Overview.layoutGrid4$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.Administration.Account_Overview.layoutGrid4$row0$column0"}
                        $widgetId={"p.Administration.Account_Overview.layoutGrid4$row0$column0"}
                        class={"col-lg-12 col-md-12 col-12"}
                        content={[
                            <$TabContainer key={"p.Administration.Account_Overview.tabControl"}
                                $widgetId={"p.Administration.Account_Overview.tabControl"}
                                class={"mx-name-tabControl tabsfullwidth"}
                                widgetId={"p.Administration.Account_Overview.tabControl"}
                                defaultTab={0}
                                tabs={[
                                    {
                                        "name": "tabPage2",
                                        "caption": TextProperty({
                                            "value": "Local Users"
                                        }),
                                        "isDelayed": false,
                                        "refreshOnShow": false,
                                        "content": [
                                            <$Datagrid key={"p.Administration.Account_Overview.dataGrid21"}
                                                $widgetId={"p.Administration.Account_Overview.dataGrid21"}
                                                datasource={DatabaseObjectListProperty({
                                                    "dataSourceId": "p.12",
                                                    "entity": "Administration.Account",
                                                    "operationId": "HNC4/ZuXwVWLHGDzX2ExVw",
                                                    "sort": [
                                                        [
                                                            "FullName",
                                                            "asc"
                                                        ]
                                                    ],
                                                    "constraints": { "type": "function", "name": "and", "parameters": [ { "type": "function", "name": "or", "parameters": [ { "type": "relatedEntity", "left": { "type": "attribute", "attribute": "System.UserRoles", "context": "Administration.Account", "attributeType": "ObjectReferenceSet" }, "rightEntity": "System.UserRole", "rightEntityAlias": "System.UserRole1", "right": { "type": "attribute", "attribute": "System.grantableRoles", "context": "System.UserRole1", "attributeType": "ObjectReferenceSet" }, "next": { "type": "relatedEntity", "left": { "type": "attribute", "attribute": "id", "context": "System.UserRole1", "attributeType": "ObjectReference" }, "rightEntity": "System.User", "rightEntityAlias": "System.User", "right": { "type": "attribute", "attribute": "System.UserRoles", "context": "System.User", "attributeType": "ObjectReferenceSet" }, "next": { "type": "function", "name": "=", "parameters": [ { "type": "attribute", "attribute": "id", "context": "System.User", "attributeType": "ObjectReference" }, { "type": "token", "name": "currentUser" } ] } } }, { "type": "function", "name": "not", "parameters": [ { "type": "relatedEntity", "left": { "type": "attribute", "attribute": "System.UserRoles", "context": "Administration.Account", "attributeType": "ObjectReferenceSet" }, "rightEntity": "System.UserRole", "rightEntityAlias": "System.UserRole2", "right": { "type": "attribute", "attribute": "id", "context": "System.UserRole2", "attributeType": "ObjectReference" }, "next": { "type": "attribute", "attribute": "id", "context": "System.UserRole2", "attributeType": "ObjectReference" } } ] } ] }, { "type": "function", "name": "!=", "parameters": [ { "type": "attribute", "attribute": "Name", "context": "Administration.Account", "attributeType": "String" }, { "type": "literal", "value": null } ] } ] }
                                                })}
                                                refreshInterval={0}
                                                itemSelectionMethod={"checkbox"}
                                                showSelectAllToggle={true}
                                                columns={[
                                                    {
                                                        "showContentAs": "attribute",
                                                        "attribute": ListAttributeProperty({
                                                            "path": "",
                                                            "entity": "Administration.Account",
                                                            "attribute": "FullName",
                                                            "attributeType": "String",
                                                            "sortable": true,
                                                            "filterable": true,
                                                            "dataSourceId": "p.12",
                                                            "isList": false
                                                        }),
                                                        "dynamicText": undefined,
                                                        "header": ExpressionProperty({
                                                            "expression": { "expr": { "type": "literal", "value": "Full name" }, "args": {} }
                                                        }),
                                                        "tooltip": undefined,
                                                        "filter": [
                                                            <$DatagridTextFilter key={"p.Administration.Account_Overview.textFilter1"}
                                                                $widgetId={"p.Administration.Account_Overview.textFilter1"}
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
                                                            "entity": "Administration.Account",
                                                            "attribute": "Name",
                                                            "attributeType": "String",
                                                            "sortable": true,
                                                            "filterable": true,
                                                            "dataSourceId": "p.12",
                                                            "isList": false
                                                        }),
                                                        "dynamicText": undefined,
                                                        "header": ExpressionProperty({
                                                            "expression": { "expr": { "type": "literal", "value": "Login" }, "args": {} }
                                                        }),
                                                        "tooltip": undefined,
                                                        "filter": [
                                                            <$DatagridTextFilter key={"p.Administration.Account_Overview.textFilter2"}
                                                                $widgetId={"p.Administration.Account_Overview.textFilter2"}
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
                                                        "showContentAs": "customContent",
                                                        "content": TemplatedWidgetProperty({
                                                            "dataSourceId": "p.12",
                                                            "editable": false,
                                                            "children": () => [
                                                                <$ListView key={"p.Administration.Account_Overview.listView1"}
                                                                    $widgetId={"p.Administration.Account_Overview.listView1"}
                                                                    class={"mx-name-listView1 mx-administration-lv-dg-list listview-stylingless"}
                                                                    listValue={AssociationObjectListProperty({
                                                                        "dataSourceId": "p.13",
                                                                        "entity": "System.UserRole",
                                                                        "scope": "p.Administration.Account_Overview.dataGrid21",
                                                                        "operationId": "qL4G5E48mFKJm3iwJOANgg",
                                                                        "directPath": "System.UserRoles/System.UserRole"
                                                                    })}
                                                                    itemTemplate={TemplatedWidgetProperty({
                                                                        "dataSourceId": "p.13",
                                                                        "editable": false,
                                                                        "children": () => [
                                                                            <$Text key={"p.Administration.Account_Overview.text1"}
                                                                                $widgetId={"p.Administration.Account_Overview.text1"}
                                                                                class={"mx-name-text1"}
                                                                                caption={ExpressionProperty({
                                                                                    "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "Name" }, "args": { "currentObject": { "widget": "p.Administration.Account_Overview.listView1", "source": "object" } } }
                                                                                })}
                                                                                renderMode={"span"} />
                                                                        ]
                                                                    })}
                                                                    pageSize={5} />
                                                            ]
                                                        }),
                                                        "dynamicText": undefined,
                                                        "header": ExpressionProperty({
                                                            "expression": { "expr": { "type": "literal", "value": "Roles" }, "args": {} }
                                                        }),
                                                        "tooltip": undefined,
                                                        "filter": [
                                                            <$DatagridDropdownFilter key={"p.Administration.Account_Overview.drop_downFilter1"}
                                                                $widgetId={"p.Administration.Account_Overview.drop_downFilter1"}
                                                                auto={true}
                                                                filterOptions={[]}
                                                                emptyOptionCaption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "None" }, "args": {} }
                                                                })}
                                                                multiSelect={true}
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
                                                        "sortable": false,
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
                                                            "entity": "Administration.Account",
                                                            "attribute": "LastLogin",
                                                            "attributeType": "DateTime",
                                                            "sortable": true,
                                                            "filterable": true,
                                                            "dataSourceId": "p.12",
                                                            "isList": false
                                                        }),
                                                        "dynamicText": ListExpressionProperty({
                                                            "expression": { "expr": { "type": "function", "name": "_format", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "LastLogin" }, { "type": "literal", "value": "{\"type\":\"datetime\"}" } ] }, "args": { "currentObject": { "widget": "p.Administration.Account_Overview.dataGrid21", "source": "object" } } },
                                                            "dataSourceId": "p.12"
                                                        }),
                                                        "header": ExpressionProperty({
                                                            "expression": { "expr": { "type": "literal", "value": "Last login" }, "args": {} }
                                                        }),
                                                        "tooltip": undefined,
                                                        "filter": [
                                                            <$DatagridDateFilter key={"p.Administration.Account_Overview.dateFilter1"}
                                                                $widgetId={"p.Administration.Account_Overview.dateFilter1"}
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
                                                            "entity": "Administration.Account",
                                                            "attribute": "Active",
                                                            "attributeType": "Boolean",
                                                            "sortable": true,
                                                            "filterable": true,
                                                            "dataSourceId": "p.12",
                                                            "isList": false
                                                        }),
                                                        "content": TemplatedWidgetProperty({
                                                            "dataSourceId": "p.12",
                                                            "editable": false,
                                                            "children": () => [
                                                                <$ConditionalVisibilityWrapper key={"p.Administration.Account_Overview.text2$visibility"}
                                                                    $widgetId={"p.Administration.Account_Overview.text2$visibility"}
                                                                    visible={ExpressionProperty({
                                                                        "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "Active" }, "args": { "currentObject": { "widget": "p.Administration.Account_Overview.dataGrid21", "source": "object" } } }
                                                                    })}
                                                                    contents={[
                                                                        <$Text key={"p.Administration.Account_Overview.text2"}
                                                                            $widgetId={"p.Administration.Account_Overview.text2"}
                                                                            class={"mx-name-text2 badge label-success"}
                                                                            caption={ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Active" }, "args": {} }
                                                                            })}
                                                                            renderMode={"span"} />
                                                                    ]} />,
                                                                <$ConditionalVisibilityWrapper key={"p.Administration.Account_Overview.text3$visibility"}
                                                                    $widgetId={"p.Administration.Account_Overview.text3$visibility"}
                                                                    visible={ExpressionProperty({
                                                                        "expression": { "expr": { "type": "function", "name": "not", "parameters": [ { "type": "variable", "variable": "currentObject", "path": "Active" } ] }, "args": { "currentObject": { "widget": "p.Administration.Account_Overview.dataGrid21", "source": "object" } } }
                                                                    })}
                                                                    contents={[
                                                                        <$Text key={"p.Administration.Account_Overview.text3"}
                                                                            $widgetId={"p.Administration.Account_Overview.text3"}
                                                                            class={"mx-name-text3 badge label-secondary"}
                                                                            caption={ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Inactive" }, "args": {} }
                                                                            })}
                                                                            renderMode={"span"} />
                                                                    ]} />
                                                            ]
                                                        }),
                                                        "dynamicText": undefined,
                                                        "header": ExpressionProperty({
                                                            "expression": { "expr": { "type": "literal", "value": "Active" }, "args": {} }
                                                        }),
                                                        "tooltip": undefined,
                                                        "filter": [
                                                            <$DatagridDropdownFilter key={"p.Administration.Account_Overview.drop_downFilter2"}
                                                                $widgetId={"p.Administration.Account_Overview.drop_downFilter2"}
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
                                                                class={"mx-name-drop_downFilter2"} />
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
                                                            "entity": "Administration.Account",
                                                            "attribute": "WebServiceUser",
                                                            "attributeType": "Boolean",
                                                            "sortable": true,
                                                            "filterable": true,
                                                            "dataSourceId": "p.12",
                                                            "isList": false
                                                        }),
                                                        "dynamicText": undefined,
                                                        "header": ExpressionProperty({
                                                            "expression": { "expr": { "type": "literal", "value": "Web service user" }, "args": {} }
                                                        }),
                                                        "tooltip": undefined,
                                                        "filter": [
                                                            <$DatagridDropdownFilter key={"p.Administration.Account_Overview.drop_downFilter3"}
                                                                $widgetId={"p.Administration.Account_Overview.drop_downFilter3"}
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
                                                                class={"mx-name-drop_downFilter3"} />
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
                                                            "entity": "Administration.Account",
                                                            "attribute": "IsLocalUser",
                                                            "attributeType": "Boolean",
                                                            "sortable": true,
                                                            "filterable": true,
                                                            "dataSourceId": "p.12",
                                                            "isList": false
                                                        }),
                                                        "dynamicText": undefined,
                                                        "header": ExpressionProperty({
                                                            "expression": { "expr": { "type": "literal", "value": "Local" }, "args": {} }
                                                        }),
                                                        "tooltip": undefined,
                                                        "filter": [
                                                            <$DatagridDropdownFilter key={"p.Administration.Account_Overview.drop_downFilter4"}
                                                                $widgetId={"p.Administration.Account_Overview.drop_downFilter4"}
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
                                                                class={"mx-name-drop_downFilter4"} />
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
                                                            "entity": "Administration.Account",
                                                            "attribute": "FullName",
                                                            "attributeType": "String",
                                                            "sortable": true,
                                                            "filterable": true,
                                                            "dataSourceId": "p.12",
                                                            "isList": false
                                                        }),
                                                        "content": TemplatedWidgetProperty({
                                                            "dataSourceId": "p.12",
                                                            "editable": false,
                                                            "children": () => [
                                                                <$ConditionalVisibilityWrapper key={"p.Administration.Account_Overview.actionButton3$visibility"}
                                                                    $widgetId={"p.Administration.Account_Overview.actionButton3$visibility"}
                                                                    visible={ExpressionProperty({
                                                                        "expression": { "expr": { "type": "function", "name": "_hasSomeRole", "parameters": [ { "type": "literal", "value": "Administrator" } ] }, "args": {} }
                                                                    })}
                                                                    contents={[
                                                                        <$ActionButton key={"p.Administration.Account_Overview.actionButton3"}
                                                                            $widgetId={"p.Administration.Account_Overview.actionButton3"}
                                                                            buttonId={"p.Administration.Account_Overview.actionButton3"}
                                                                            class={"mx-name-actionButton3 btn-lg"}
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
                                                                                "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-pencil" }
                                                                            })}
                                                                            action={ActionProperty({
                                                                                "action": { "type": "openPage", "argMap": { "param$Account": { "widget": "p.Administration.Account_Overview.dataGrid21", "source": "object" } }, "config": { "name": "Administration/Account_Edit.page.xml", "location": "modal", "resizable": true, "allowedRoles": [ "Administrator" ] }, "disabledDuringExecution": true },
                                                                                "abortOnServerValidation": true
                                                                            })} />
                                                                    ]} />,
                                                                <$ConditionalVisibilityWrapper key={"p.Administration.Account_Overview.actionButton4$visibility"}
                                                                    $widgetId={"p.Administration.Account_Overview.actionButton4$visibility"}
                                                                    visible={ExpressionProperty({
                                                                        "expression": { "expr": { "type": "function", "name": "_hasSomeRole", "parameters": [ { "type": "literal", "value": "Administrator" } ] }, "args": {} }
                                                                    })}
                                                                    contents={[
                                                                        <$ActionButton key={"p.Administration.Account_Overview.actionButton4"}
                                                                            $widgetId={"p.Administration.Account_Overview.actionButton4"}
                                                                            buttonId={"p.Administration.Account_Overview.actionButton4"}
                                                                            class={"mx-name-actionButton4 btn-lg spacing-outer-left-medium"}
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
                                                                                "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-trash-can" }
                                                                            })}
                                                                            action={ActionProperty({
                                                                                "action": { "type": "deleteObject", "argMap": { "$object": { "widget": "p.Administration.Account_Overview.dataGrid21", "source": "object" } }, "config": { "closePage": false, "operationId": "1KKbPDh1h1mb/4Sc5jD2Mw" }, "disabledDuringExecution": true },
                                                                                "abortOnServerValidation": true
                                                                            })} />
                                                                    ]} />
                                                            ]
                                                        }),
                                                        "dynamicText": undefined,
                                                        "header": ExpressionProperty({
                                                            "expression": { "expr": { "type": "literal", "value": " " }, "args": {} }
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
                                                filtersPlaceholder={[
                                                    <$ConditionalVisibilityWrapper key={"p.Administration.Account_Overview.actionButton1$visibility"}
                                                        $widgetId={"p.Administration.Account_Overview.actionButton1$visibility"}
                                                        visible={ExpressionProperty({
                                                            "expression": { "expr": { "type": "function", "name": "_hasSomeRole", "parameters": [ { "type": "literal", "value": "Administrator" } ] }, "args": {} }
                                                        })}
                                                        contents={[
                                                            <$ActionButton key={"p.Administration.Account_Overview.actionButton1"}
                                                                $widgetId={"p.Administration.Account_Overview.actionButton1"}
                                                                buttonId={"p.Administration.Account_Overview.actionButton1"}
                                                                class={"mx-name-actionButton1 spacing-outer-bottom"}
                                                                renderType={"button"}
                                                                buttonClass={"btn-success"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "New local user" }, "args": {} }
                                                                })}
                                                                tooltip={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                action={ActionProperty({
                                                                    "action": { "type": "callMicroflow", "argMap": {}, "config": { "operationId": "78EYwfqPPVShfhy0zXbARw", "validate": "view", "allowedRoles": [ "Administrator" ] }, "disabledDuringExecution": true },
                                                                    "abortOnServerValidation": true
                                                                })} />
                                                        ]} />,
                                                    <$ConditionalVisibilityWrapper key={"p.Administration.Account_Overview.actionButton2$visibility"}
                                                        $widgetId={"p.Administration.Account_Overview.actionButton2$visibility"}
                                                        visible={ExpressionProperty({
                                                            "expression": { "expr": { "type": "function", "name": "_hasSomeRole", "parameters": [ { "type": "literal", "value": "Administrator" } ] }, "args": {} }
                                                        })}
                                                        contents={[
                                                            <$ActionButton key={"p.Administration.Account_Overview.actionButton2"}
                                                                $widgetId={"p.Administration.Account_Overview.actionButton2"}
                                                                buttonId={"p.Administration.Account_Overview.actionButton2"}
                                                                class={"mx-name-actionButton2 spacing-outer-left spacing-outer-bottom"}
                                                                renderType={"button"}
                                                                buttonClass={"btn-default"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "New web service user" }, "args": {} }
                                                                })}
                                                                tooltip={TextProperty({
                                                                    "value": ""
                                                                })}
                                                                action={ActionProperty({
                                                                    "action": { "type": "callMicroflow", "argMap": {}, "config": { "operationId": "6kFjR965DVqo2EMLx7IE0g", "validate": "view", "allowedRoles": [ "Administrator" ] }, "disabledDuringExecution": true },
                                                                    "abortOnServerValidation": true
                                                                })} />
                                                        ]} />
                                                ]}
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
                                        ]
                                    }
                                ]}
                                hoistedSelections={[]} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Accounts"
]);

export const classes = "layout-atlas layout-atlas-responsive-default page-tabs page-tabs-fullwidth";

export const autofocus = "desktopOnly";
export const style = {};
export const parameters = {};
export const content = { ...parentContent,
    "Atlas_Core.Atlas_Default.Main": region$Main,
};
