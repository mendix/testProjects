import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { NanoflowObjectProperty } from "mendix/NanoflowObjectProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebIconProperty } from "mendix/WebIconProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import * as BadgeWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/custom/badge/Badge.mjs";
const Badge = Object.getOwnPropertyDescriptor(BadgeWidgetModule, "Badge")?.get() || Object.getOwnPropertyDescriptor(BadgeWidgetModule, "default")?.get();   
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";
import { GetBadge } from "../nanoflows/BootstrapBadge.GetBadge.js";
import { IVK_Nanoflow } from "../nanoflows/BootstrapBadge.IVK_Nanoflow.js";

const { $Div, $Text, $DataView, $Badge, $ActionButton } = asPluginWidgets({ Div, Text, DataView, Badge, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.BootstrapBadge.CallNanoflow.layoutGrid1"}
        $widgetId={"p.BootstrapBadge.CallNanoflow.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.BootstrapBadge.CallNanoflow.layoutGrid1$row0"}
                $widgetId={"p.BootstrapBadge.CallNanoflow.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.BootstrapBadge.CallNanoflow.layoutGrid1$row0$column0"}
                        $widgetId={"p.BootstrapBadge.CallNanoflow.layoutGrid1$row0$column0"}
                        class={"col-lg-6 col-md-12 col-12"}
                        content={[
                            <$Text key={"p.BootstrapBadge.CallNanoflow.text1"}
                                $widgetId={"p.BootstrapBadge.CallNanoflow.text1"}
                                class={"mx-name-text1"}
                                caption={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                })}
                                renderMode={"h1"} />,
                            <$DataView key={"p.BootstrapBadge.CallNanoflow.dataView1"}
                                $widgetId={"p.BootstrapBadge.CallNanoflow.dataView1"}
                                class={"mx-name-dataView1 form-vertical"}
                                object={NanoflowObjectProperty({
                                    "dataSourceId": "p.10",
                                    "editable": true,
                                    "source": { "nanoflow": () => GetBadge, "allowedRoles": [ "Administrator", "User" ] },
                                    "argMap": {}
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$Badge key={"p.BootstrapBadge.CallNanoflow.badgeCallNanoflow"}
                                        $widgetId={"p.BootstrapBadge.CallNanoflow.badgeCallNanoflow"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "p.BootstrapBadge.CallNanoflow.dataView1", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "callNanoflow", "argMap": { "Badge": { "widget": "p.BootstrapBadge.CallNanoflow.dataView1", "source": "object" } }, "config": { "nanoflow": () => IVK_Nanoflow, "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-badgeCallNanoflow label-success"} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.BootstrapBadge.CallNanoflow.cancelButton1"}
                                        $widgetId={"p.BootstrapBadge.CallNanoflow.cancelButton1"}
                                        buttonId={"p.BootstrapBadge.CallNanoflow.cancelButton1"}
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
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "wR7vmDrerlCEUO+RxyOhrQ", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />
                        ]} />,
                    <$Div key={"p.BootstrapBadge.CallNanoflow.layoutGrid1$row0$column1"}
                        $widgetId={"p.BootstrapBadge.CallNanoflow.layoutGrid1$row0$column1"}
                        class={"col-lg-6 col-md-12 col-12"}
                        content={[
                            <$Text key={"p.BootstrapBadge.CallNanoflow.text2"}
                                $widgetId={"p.BootstrapBadge.CallNanoflow.text2"}
                                class={"mx-name-text2"}
                                caption={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Color Label" }, "args": {} }
                                })}
                                renderMode={"h1"} />,
                            <$DataView key={"p.BootstrapBadge.CallNanoflow.dataView2"}
                                $widgetId={"p.BootstrapBadge.CallNanoflow.dataView2"}
                                class={"mx-name-dataView2 form-vertical"}
                                object={NanoflowObjectProperty({
                                    "dataSourceId": "p.21",
                                    "editable": true,
                                    "source": { "nanoflow": () => GetBadge, "allowedRoles": [ "Administrator", "User" ] },
                                    "argMap": {}
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$Badge key={"p.BootstrapBadge.CallNanoflow.labelCallNanoflow"}
                                        $widgetId={"p.BootstrapBadge.CallNanoflow.labelCallNanoflow"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "p.BootstrapBadge.CallNanoflow.dataView2", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "callNanoflow", "argMap": { "Badge": { "widget": "p.BootstrapBadge.CallNanoflow.dataView2", "source": "object" } }, "config": { "nanoflow": () => IVK_Nanoflow, "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-labelCallNanoflow label-success"} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.BootstrapBadge.CallNanoflow.cancelButton2"}
                                        $widgetId={"p.BootstrapBadge.CallNanoflow.cancelButton2"}
                                        buttonId={"p.BootstrapBadge.CallNanoflow.cancelButton2"}
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
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "CmGcih1ZxlOVo/672jN3dA", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
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
export const url = "/p/callNanoflow";
export const style = {};
export const parameters = {};
export const content = { ...parentContent,
    "Atlas_Core.Atlas_Default.Main": region$Main,
};
