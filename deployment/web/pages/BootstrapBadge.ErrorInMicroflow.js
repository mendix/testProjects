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
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Div, $Text, $DataView, $Badge, $ActionButton } = asPluginWidgets({ Div, Text, DataView, Badge, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.BootstrapBadge.ErrorInMicroflow.layoutGrid1"}
        $widgetId={"p.BootstrapBadge.ErrorInMicroflow.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.BootstrapBadge.ErrorInMicroflow.layoutGrid1$row0"}
                $widgetId={"p.BootstrapBadge.ErrorInMicroflow.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.BootstrapBadge.ErrorInMicroflow.layoutGrid1$row0$column0"}
                        $widgetId={"p.BootstrapBadge.ErrorInMicroflow.layoutGrid1$row0$column0"}
                        class={"col-lg-6 col-md-12 col-12"}
                        content={[
                            <$Text key={"p.BootstrapBadge.ErrorInMicroflow.text1"}
                                $widgetId={"p.BootstrapBadge.ErrorInMicroflow.text1"}
                                class={"mx-name-text1"}
                                caption={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                })}
                                renderMode={"h1"} />,
                            <$DataView key={"p.BootstrapBadge.ErrorInMicroflow.dataView2"}
                                $widgetId={"p.BootstrapBadge.ErrorInMicroflow.dataView2"}
                                class={"mx-name-dataView2 form-vertical"}
                                object={AssociationObjectProperty({
                                    "dataSourceId": "p.10",
                                    "scope": "$Badge",
                                    "editable": true
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$Badge key={"p.BootstrapBadge.ErrorInMicroflow.badgeV23"}
                                        $widgetId={"p.BootstrapBadge.ErrorInMicroflow.badgeV23"}
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
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }, "config": { "operationId": "JK+tzQ/wVVS8eXJ0EMRxJg", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-badgeV23 label-danger"} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.BootstrapBadge.ErrorInMicroflow.saveButton1"}
                                        $widgetId={"p.BootstrapBadge.ErrorInMicroflow.saveButton1"}
                                        buttonId={"p.BootstrapBadge.ErrorInMicroflow.saveButton1"}
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
                                            "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p.BootstrapBadge.ErrorInMicroflow.dataView2", "source": "object" } }, "config": { "operationId": "LfqoqZNnjlS/eYTVFI6R0g", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />,
                                    <$ActionButton key={"p.BootstrapBadge.ErrorInMicroflow.cancelButton1"}
                                        $widgetId={"p.BootstrapBadge.ErrorInMicroflow.cancelButton1"}
                                        buttonId={"p.BootstrapBadge.ErrorInMicroflow.cancelButton1"}
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
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "JSQBIQQXP12eyjWdX6HWmw", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />
                        ]} />,
                    <$Div key={"p.BootstrapBadge.ErrorInMicroflow.layoutGrid1$row0$column1"}
                        $widgetId={"p.BootstrapBadge.ErrorInMicroflow.layoutGrid1$row0$column1"}
                        class={"col-lg-6 col-md-12 col-12"}
                        content={[
                            <$Text key={"p.BootstrapBadge.ErrorInMicroflow.text2"}
                                $widgetId={"p.BootstrapBadge.ErrorInMicroflow.text2"}
                                class={"mx-name-text2"}
                                caption={ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Color Label" }, "args": {} }
                                })}
                                renderMode={"h1"} />,
                            <$DataView key={"p.BootstrapBadge.ErrorInMicroflow.dataView3"}
                                $widgetId={"p.BootstrapBadge.ErrorInMicroflow.dataView3"}
                                class={"mx-name-dataView3 form-vertical"}
                                object={AssociationObjectProperty({
                                    "dataSourceId": "p.23",
                                    "scope": "$Badge",
                                    "editable": true
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$Badge key={"p.BootstrapBadge.ErrorInMicroflow.badgeV24"}
                                        $widgetId={"p.BootstrapBadge.ErrorInMicroflow.badgeV24"}
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
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }, "config": { "operationId": "JK+tzQ/wVVS8eXJ0EMRxJg", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-badgeV24 label-danger"} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.BootstrapBadge.ErrorInMicroflow.saveButton2"}
                                        $widgetId={"p.BootstrapBadge.ErrorInMicroflow.saveButton2"}
                                        buttonId={"p.BootstrapBadge.ErrorInMicroflow.saveButton2"}
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
                                            "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p.BootstrapBadge.ErrorInMicroflow.dataView3", "source": "object" } }, "config": { "operationId": "ENR1hqCLzFOVhTwJ/hYHRg", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />,
                                    <$ActionButton key={"p.BootstrapBadge.ErrorInMicroflow.cancelButton2"}
                                        $widgetId={"p.BootstrapBadge.ErrorInMicroflow.cancelButton2"}
                                        buttonId={"p.BootstrapBadge.ErrorInMicroflow.cancelButton2"}
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
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "E6RoF055NFOJfeZID+5aWw", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Edit Badge",
    "Badge Bewerken"
]);

export const classes = "layout-atlas layout-atlas-responsive-default page-form page-form-default";

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
