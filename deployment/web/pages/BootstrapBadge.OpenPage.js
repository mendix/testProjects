import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AssociationObjectProperty } from "mendix/AssociationObjectProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebIconProperty } from "mendix/WebIconProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import * as BadgeWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/custom/badge/Badge.mjs";
const Badge = Object.getOwnPropertyDescriptor(BadgeWidgetModule, "Badge")?.get() || Object.getOwnPropertyDescriptor(BadgeWidgetModule, "default")?.get();   
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import { Table } from "mendix/widgets/web/Table";
import { TableRow } from "mendix/widgets/web/TableRow";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Div, $Text, $DataView, $Table, $TableRow, $Badge, $ActionButton } = asPluginWidgets({ Div, Text, DataView, Table, TableRow, Badge, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.BootstrapBadge.OpenPage.layoutGrid1"}
        $widgetId={"p.BootstrapBadge.OpenPage.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.BootstrapBadge.OpenPage.layoutGrid1$row0"}
                $widgetId={"p.BootstrapBadge.OpenPage.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.BootstrapBadge.OpenPage.layoutGrid1$row0$column0"}
                        $widgetId={"p.BootstrapBadge.OpenPage.layoutGrid1$row0$column0"}
                        class={"col-lg-6 col-md-12 col-12"}
                        content={[
                            <$Text key={"p.BootstrapBadge.OpenPage.text1"}
                                $widgetId={"p.BootstrapBadge.OpenPage.text1"}
                                class={"mx-name-text1"}
                                caption={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                })}
                                renderMode={"h1"} />,
                            <$DataView key={"p.BootstrapBadge.OpenPage.dataView1"}
                                $widgetId={"p.BootstrapBadge.OpenPage.dataView1"}
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
                                    <$Table key={"p.BootstrapBadge.OpenPage.table1"}
                                        $widgetId={"p.BootstrapBadge.OpenPage.table1"}
                                        class={"mx-name-table1"}
                                        autoWidth={false}
                                        columnWidths={[
                                            "100%"
                                        ]}
                                        rows={[
                                            <$TableRow key={"p.BootstrapBadge.OpenPage.table1$row0"}
                                                $widgetId={"p.BootstrapBadge.OpenPage.table1$row0"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.OpenPage.text3"}
                                                                $widgetId={"p.BootstrapBadge.OpenPage.text3"}
                                                                class={"mx-name-text3"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Onclick Open full page" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.OpenPage.table1$row1"}
                                                $widgetId={"p.BootstrapBadge.OpenPage.table1$row1"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$Badge key={"p.BootstrapBadge.OpenPage.badgeV27"}
                                                                $widgetId={"p.BootstrapBadge.OpenPage.badgeV27"}
                                                                type={"badge"}
                                                                value={t([
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                                                    }),
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                    })
                                                                ])}
                                                                onClick={ActionProperty({
                                                                    "action": { "type": "openPage", "argMap": { "param$Badge": { "widget": "$Badge", "source": "object" } }, "config": { "name": "BootstrapBadge/ShowFullPage.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                    "argumentTypes": { }
                                                                })}
                                                                class={"mx-name-badgeV27"} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.OpenPage.table1$row2"}
                                                $widgetId={"p.BootstrapBadge.OpenPage.table1$row2"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.OpenPage.text4"}
                                                                $widgetId={"p.BootstrapBadge.OpenPage.text4"}
                                                                class={"mx-name-text4"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Onclick Open popup page" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.OpenPage.table1$row3"}
                                                $widgetId={"p.BootstrapBadge.OpenPage.table1$row3"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$Badge key={"p.BootstrapBadge.OpenPage.badgeV29"}
                                                                $widgetId={"p.BootstrapBadge.OpenPage.badgeV29"}
                                                                type={"badge"}
                                                                value={t([
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                                                    }),
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                    })
                                                                ])}
                                                                onClick={ActionProperty({
                                                                    "action": { "type": "openPage", "argMap": { "param$Badge": { "widget": "$Badge", "source": "object" } }, "config": { "name": "BootstrapBadge/ShowPopupPage.page.xml", "location": "popup", "resizable": true, "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                    "argumentTypes": { }
                                                                })}
                                                                class={"mx-name-badgeV29"} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.OpenPage.table1$row4"}
                                                $widgetId={"p.BootstrapBadge.OpenPage.table1$row4"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.OpenPage.text5"}
                                                                $widgetId={"p.BootstrapBadge.OpenPage.text5"}
                                                                class={"mx-name-text5"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Onclick Open blocked popup page" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.OpenPage.table1$row5"}
                                                $widgetId={"p.BootstrapBadge.OpenPage.table1$row5"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$Badge key={"p.BootstrapBadge.OpenPage.badgeV31"}
                                                                $widgetId={"p.BootstrapBadge.OpenPage.badgeV31"}
                                                                type={"badge"}
                                                                value={t([
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                                                    }),
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                    })
                                                                ])}
                                                                onClick={ActionProperty({
                                                                    "action": { "type": "openPage", "argMap": { "param$Badge": { "widget": "$Badge", "source": "object" } }, "config": { "name": "BootstrapBadge/ShowModalPopupPage.page.xml", "location": "modal", "resizable": true, "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                    "argumentTypes": { }
                                                                })}
                                                                class={"mx-name-badgeV31"} />
                                                        ]
                                                    }
                                                ]} />
                                        ]} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.BootstrapBadge.OpenPage.saveButton1"}
                                        $widgetId={"p.BootstrapBadge.OpenPage.saveButton1"}
                                        buttonId={"p.BootstrapBadge.OpenPage.saveButton1"}
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
                                            "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p.BootstrapBadge.OpenPage.dataView1", "source": "object" } }, "config": { "operationId": "nP6Ts2dXwlSaFUkHFOLJkA", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />,
                                    <$ActionButton key={"p.BootstrapBadge.OpenPage.cancelButton1"}
                                        $widgetId={"p.BootstrapBadge.OpenPage.cancelButton1"}
                                        buttonId={"p.BootstrapBadge.OpenPage.cancelButton1"}
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
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "43zQck6qiVyeOcosBVaK/g", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />
                        ]} />,
                    <$Div key={"p.BootstrapBadge.OpenPage.layoutGrid1$row0$column1"}
                        $widgetId={"p.BootstrapBadge.OpenPage.layoutGrid1$row0$column1"}
                        class={"col-lg-6 col-md-12 col-12"}
                        content={[
                            <$Text key={"p.BootstrapBadge.OpenPage.text2"}
                                $widgetId={"p.BootstrapBadge.OpenPage.text2"}
                                class={"mx-name-text2"}
                                caption={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Color Label" }, "args": {} }
                                })}
                                renderMode={"h1"} />,
                            <$DataView key={"p.BootstrapBadge.OpenPage.dataView2"}
                                $widgetId={"p.BootstrapBadge.OpenPage.dataView2"}
                                class={"mx-name-dataView2 form-vertical"}
                                object={AssociationObjectProperty({
                                    "dataSourceId": "p.47",
                                    "scope": "$Badge",
                                    "editable": true
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$Table key={"p.BootstrapBadge.OpenPage.table2"}
                                        $widgetId={"p.BootstrapBadge.OpenPage.table2"}
                                        class={"mx-name-table2"}
                                        autoWidth={false}
                                        columnWidths={[
                                            "100%"
                                        ]}
                                        rows={[
                                            <$TableRow key={"p.BootstrapBadge.OpenPage.table2$row0"}
                                                $widgetId={"p.BootstrapBadge.OpenPage.table2$row0"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.OpenPage.text6"}
                                                                $widgetId={"p.BootstrapBadge.OpenPage.text6"}
                                                                class={"mx-name-text6"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Onclick Open full page" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.OpenPage.table2$row1"}
                                                $widgetId={"p.BootstrapBadge.OpenPage.table2$row1"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$Badge key={"p.BootstrapBadge.OpenPage.badgeV28"}
                                                                $widgetId={"p.BootstrapBadge.OpenPage.badgeV28"}
                                                                type={"label"}
                                                                value={t([
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                                                    }),
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                    })
                                                                ])}
                                                                onClick={ActionProperty({
                                                                    "action": { "type": "openPage", "argMap": { "param$Badge": { "widget": "$Badge", "source": "object" } }, "config": { "name": "BootstrapBadge/ShowFullPage.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                    "argumentTypes": { }
                                                                })}
                                                                class={"mx-name-badgeV28"} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.OpenPage.table2$row2"}
                                                $widgetId={"p.BootstrapBadge.OpenPage.table2$row2"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.OpenPage.text7"}
                                                                $widgetId={"p.BootstrapBadge.OpenPage.text7"}
                                                                class={"mx-name-text7"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Onclick Open popup page" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.OpenPage.table2$row3"}
                                                $widgetId={"p.BootstrapBadge.OpenPage.table2$row3"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$Badge key={"p.BootstrapBadge.OpenPage.badgeV30"}
                                                                $widgetId={"p.BootstrapBadge.OpenPage.badgeV30"}
                                                                type={"label"}
                                                                value={t([
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                                                    }),
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                    })
                                                                ])}
                                                                onClick={ActionProperty({
                                                                    "action": { "type": "openPage", "argMap": { "param$Badge": { "widget": "$Badge", "source": "object" } }, "config": { "name": "BootstrapBadge/ShowPopupPage.page.xml", "location": "popup", "resizable": true, "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                    "argumentTypes": { }
                                                                })}
                                                                class={"mx-name-badgeV30"} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.OpenPage.table2$row4"}
                                                $widgetId={"p.BootstrapBadge.OpenPage.table2$row4"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$Text key={"p.BootstrapBadge.OpenPage.text8"}
                                                                $widgetId={"p.BootstrapBadge.OpenPage.text8"}
                                                                class={"mx-name-text8"}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Onclick Open blocked popup page" }, "args": {} }
                                                                })}
                                                                renderMode={"span"} />
                                                        ]
                                                    }
                                                ]} />,
                                            <$TableRow key={"p.BootstrapBadge.OpenPage.table2$row5"}
                                                $widgetId={"p.BootstrapBadge.OpenPage.table2$row5"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$Badge key={"p.BootstrapBadge.OpenPage.badgeV32"}
                                                                $widgetId={"p.BootstrapBadge.OpenPage.badgeV32"}
                                                                type={"label"}
                                                                value={t([
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                                                    }),
                                                                    ExpressionProperty({
                                                                        "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                                                    })
                                                                ])}
                                                                onClick={ActionProperty({
                                                                    "action": { "type": "openPage", "argMap": { "param$Badge": { "widget": "$Badge", "source": "object" } }, "config": { "name": "BootstrapBadge/ShowModalPopupPage.page.xml", "location": "modal", "resizable": true, "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                    "argumentTypes": { }
                                                                })}
                                                                class={"mx-name-badgeV32"} />
                                                        ]
                                                    }
                                                ]} />
                                        ]} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.BootstrapBadge.OpenPage.saveButton2"}
                                        $widgetId={"p.BootstrapBadge.OpenPage.saveButton2"}
                                        buttonId={"p.BootstrapBadge.OpenPage.saveButton2"}
                                        class={"mx-name-saveButton2"}
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
                                            "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p.BootstrapBadge.OpenPage.dataView2", "source": "object" } }, "config": { "operationId": "48hxrMiN5VyOY2ouUbsJrw", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />,
                                    <$ActionButton key={"p.BootstrapBadge.OpenPage.cancelButton2"}
                                        $widgetId={"p.BootstrapBadge.OpenPage.cancelButton2"}
                                        buttonId={"p.BootstrapBadge.OpenPage.cancelButton2"}
                                        class={"mx-name-cancelButton2"}
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
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "WABbozvjlVKOYXeUX2G2ig", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Open Page",
    "Open Page"
]);

export const classes = "layout-atlas layout-atlas-responsive-default";

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
