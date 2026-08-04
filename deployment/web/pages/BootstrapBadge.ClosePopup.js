import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { MicroflowObjectProperty } from "mendix/MicroflowObjectProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebIconProperty } from "mendix/WebIconProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import * as BadgeWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/custom/badge/Badge.mjs";
const Badge = Object.getOwnPropertyDescriptor(BadgeWidgetModule, "Badge")?.get() || Object.getOwnPropertyDescriptor(BadgeWidgetModule, "default")?.get();   
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/BootstrapBadge.PopupPageLayout.js";

const { $Div, $Text, $DataView, $Badge, $ActionButton } = asPluginWidgets({ Div, Text, DataView, Badge, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.BootstrapBadge.ClosePopup.layoutGrid1"}
        $widgetId={"p.BootstrapBadge.ClosePopup.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.BootstrapBadge.ClosePopup.layoutGrid1$row0"}
                $widgetId={"p.BootstrapBadge.ClosePopup.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.BootstrapBadge.ClosePopup.layoutGrid1$row0$column0"}
                        $widgetId={"p.BootstrapBadge.ClosePopup.layoutGrid1$row0$column0"}
                        class={"col-lg-6 col-md-12 col-12"}
                        content={[
                            <$Text key={"p.BootstrapBadge.ClosePopup.text1"}
                                $widgetId={"p.BootstrapBadge.ClosePopup.text1"}
                                class={"mx-name-text1"}
                                caption={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                })}
                                renderMode={"h1"} />,
                            <$DataView key={"p.BootstrapBadge.ClosePopup.dataView1"}
                                $widgetId={"p.BootstrapBadge.ClosePopup.dataView1"}
                                class={"mx-name-dataView1 form-vertical"}
                                object={MicroflowObjectProperty({
                                    "dataSourceId": "p.10",
                                    "editable": true,
                                    "operationId": "Vtd7beSXY1SDkGtoOeIKzg",
                                    "argMap": {}
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$Badge key={"p.BootstrapBadge.ClosePopup.badgeV31"}
                                        $widgetId={"p.BootstrapBadge.ClosePopup.badgeV31"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "p.BootstrapBadge.ClosePopup.dataView1", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "closePage", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-badgeV31"} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.BootstrapBadge.ClosePopup.saveButton1"}
                                        $widgetId={"p.BootstrapBadge.ClosePopup.saveButton1"}
                                        buttonId={"p.BootstrapBadge.ClosePopup.saveButton1"}
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
                                            "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p.BootstrapBadge.ClosePopup.dataView1", "source": "object" } }, "config": { "operationId": "9zqR/QUx8lu1swGw9GWE8Q", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />,
                                    <$ActionButton key={"p.BootstrapBadge.ClosePopup.cancelButton1"}
                                        $widgetId={"p.BootstrapBadge.ClosePopup.cancelButton1"}
                                        buttonId={"p.BootstrapBadge.ClosePopup.cancelButton1"}
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
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "KlmbcySB3lGFyA1Sx3Iz2w", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />
                        ]} />,
                    <$Div key={"p.BootstrapBadge.ClosePopup.layoutGrid1$row0$column1"}
                        $widgetId={"p.BootstrapBadge.ClosePopup.layoutGrid1$row0$column1"}
                        class={"col-lg-6 col-md-12 col-12"}
                        content={[
                            <$Text key={"p.BootstrapBadge.ClosePopup.text2"}
                                $widgetId={"p.BootstrapBadge.ClosePopup.text2"}
                                class={"mx-name-text2"}
                                caption={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Color Label" }, "args": {} }
                                })}
                                renderMode={"h1"} />,
                            <$DataView key={"p.BootstrapBadge.ClosePopup.dataView2"}
                                $widgetId={"p.BootstrapBadge.ClosePopup.dataView2"}
                                class={"mx-name-dataView2 form-vertical"}
                                object={MicroflowObjectProperty({
                                    "dataSourceId": "p.23",
                                    "editable": true,
                                    "operationId": "JXvuZ2Dgr16LuM+SDaQRpQ",
                                    "argMap": {}
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$Badge key={"p.BootstrapBadge.ClosePopup.badgeV32"}
                                        $widgetId={"p.BootstrapBadge.ClosePopup.badgeV32"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "p.BootstrapBadge.ClosePopup.dataView2", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        onClick={ActionProperty({
                                            "action": { "type": "openPage", "argMap": { "param$Badge": { "widget": "p.BootstrapBadge.ClosePopup.dataView2", "source": "object" } }, "config": { "name": "BootstrapBadge/ShowModalPopupPage.page.xml", "location": "modal", "resizable": true, "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-badgeV32"} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.BootstrapBadge.ClosePopup.saveButton2"}
                                        $widgetId={"p.BootstrapBadge.ClosePopup.saveButton2"}
                                        buttonId={"p.BootstrapBadge.ClosePopup.saveButton2"}
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
                                            "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p.BootstrapBadge.ClosePopup.dataView2", "source": "object" } }, "config": { "operationId": "Ba/N3b7oJlqxuvluMajIgA", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />,
                                    <$ActionButton key={"p.BootstrapBadge.ClosePopup.cancelButton2"}
                                        $widgetId={"p.BootstrapBadge.ClosePopup.cancelButton2"}
                                        buttonId={"p.BootstrapBadge.ClosePopup.cancelButton2"}
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
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "fY9wrtTkVVa+DUbXWtvfLA", "closePage": true }, "disabledDuringExecution": true },
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

export const classes = "";

export const autofocus = "desktopOnly";
export const cancelChangesOperationId = "CHx/0mngAVitawUcziVj5A";
export const style = {};
export const parameters = {};
export const content = { ...parentContent,
    "BootstrapBadge.PopupPageLayout.Main": region$Main,
};
