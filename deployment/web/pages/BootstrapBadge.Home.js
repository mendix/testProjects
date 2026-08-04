import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AssociationObjectProperty } from "mendix/AssociationObjectProperty";
import { AttributeProperty } from "mendix/AttributeProperty";
import { DerivedUniqueIdProperty } from "mendix/DerivedUniqueIdProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { TextProperty } from "mendix/TextProperty";
import { ValidationProperty } from "mendix/ValidationProperty";
import { WebIconProperty } from "mendix/WebIconProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import * as BadgeWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/custom/badge/Badge.mjs";
const Badge = Object.getOwnPropertyDescriptor(BadgeWidgetModule, "Badge")?.get() || Object.getOwnPropertyDescriptor(BadgeWidgetModule, "default")?.get();   
import { DataView } from "mendix/widgets/web/DataView";
import { FormGroup } from "mendix/widgets/web/FormGroup";
import { Table } from "mendix/widgets/web/Table";
import { TableRow } from "mendix/widgets/web/TableRow";
import { Text } from "mendix/widgets/web/Text";
import { TextBox } from "mendix/widgets/web/TextBox";
import { Title } from "mendix/widgets/web/Title";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $Title, $DataView, $Table, $TableRow, $FormGroup, $TextBox, $Text, $Badge, $ActionButton } = asPluginWidgets({ Title, DataView, Table, TableRow, FormGroup, TextBox, Text, Badge, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Title key={"p.BootstrapBadge.Home.pageTitle1"}
        $widgetId={"p.BootstrapBadge.Home.pageTitle1"}
        class={"mx-name-pageTitle1"}
        caption={ExpressionProperty({
            "expression": { "expr": { "type": "variable", "variable": "pageTitle" }, "args": {} }
        })} />,
    <$DataView key={"p.BootstrapBadge.Home.dataView1"}
        $widgetId={"p.BootstrapBadge.Home.dataView1"}
        class={"mx-name-dataView1 form-vertical"}
        object={AssociationObjectProperty({
            "dataSourceId": "p.4",
            "scope": "$Badge",
            "editable": true
        })}
        emptyMessage={TextProperty({
            "value": ""
        })}
        body={[
            <$Table key={"p.BootstrapBadge.Home.table1"}
                $widgetId={"p.BootstrapBadge.Home.table1"}
                class={"mx-name-table1"}
                autoWidth={false}
                columnWidths={[
                    "25%",
                    "38%",
                    "37%"
                ]}
                rows={[
                    <$TableRow key={"p.BootstrapBadge.Home.table1$row0"}
                        $widgetId={"p.BootstrapBadge.Home.table1$row0"}
                        class={""}
                        cells={[
                            {
                                "class": "",
                                "content": undefined
                            },
                            {
                                "class": "",
                                "content": undefined
                            },
                            {
                                "class": "",
                                "content": undefined
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.Home.table1$row1"}
                        $widgetId={"p.BootstrapBadge.Home.table1$row1"}
                        class={""}
                        cells={[
                            {
                                "class": "",
                                "width": 3,
                                "content": undefined
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.Home.table1$row2"}
                        $widgetId={"p.BootstrapBadge.Home.table1$row2"}
                        class={""}
                        cells={[
                            {
                                "class": "nopadding",
                                "width": 3,
                                "content": [
                                    <$Table key={"p.BootstrapBadge.Home.table2"}
                                        $widgetId={"p.BootstrapBadge.Home.table2"}
                                        class={"mx-name-table2"}
                                        autoWidth={false}
                                        columnWidths={[
                                            "100%"
                                        ]}
                                        rows={[
                                            <$TableRow key={"p.BootstrapBadge.Home.table2$row0"}
                                                $widgetId={"p.BootstrapBadge.Home.table2$row0"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$FormGroup key={"p.BootstrapBadge.Home.dataInput$formGroup"}
                                                                $widgetId={"p.BootstrapBadge.Home.dataInput$formGroup"}
                                                                class={"mx-name-dataInput mx-textbox"}
                                                                control={[
                                                                    <$TextBox key={"p.BootstrapBadge.Home.dataInput"}
                                                                        $widgetId={"p.BootstrapBadge.Home.dataInput"}
                                                                        inputValue={AttributeProperty({
                                                                            "scope": "p.BootstrapBadge.Home.dataView1",
                                                                            "path": "",
                                                                            "entity": "BootstrapBadge.Badge",
                                                                            "attribute": "DataString",
                                                                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                                            "isList": false,
                                                                            "validation": null,
                                                                            "formatting": { }
                                                                        })}
                                                                        isPassword={false}
                                                                        placeholder={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                                        })}
                                                                        mask={""}
                                                                        readOnlyStyle={"text"}
                                                                        maxLength={200}
                                                                        autocomplete={"on"}
                                                                        submitWhileEditing={false}
                                                                        submitDelay={300}
                                                                        id={DerivedUniqueIdProperty({
                                                                            "widgetId": "p.BootstrapBadge.Home.dataInput"
                                                                        })} />
                                                                ]}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Data" }, "args": {} }
                                                                })}
                                                                orientation={"vertical"}
                                                                hasError={ValidationProperty({
                                                                    "inputWidgetId": "p.BootstrapBadge.Home.dataInput"
                                                                })}
                                                                labelFor={DerivedUniqueIdProperty({
                                                                    "widgetId": "p.BootstrapBadge.Home.dataInput"
                                                                })} />
                                                        ]
                                                    }
                                                ]} />
                                        ]} />
                                ]
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.Home.table1$row3"}
                        $widgetId={"p.BootstrapBadge.Home.table1$row3"}
                        class={""}
                        cells={[
                            {
                                "class": "",
                                "content": undefined
                            },
                            {
                                "header": true,
                                "class": "h2",
                                "content": [
                                    <$Text key={"p.BootstrapBadge.Home.text10"}
                                        $widgetId={"p.BootstrapBadge.Home.text10"}
                                        class={"mx-name-text10"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                        })}
                                        renderMode={"span"} />
                                ]
                            },
                            {
                                "header": true,
                                "class": "h2",
                                "content": [
                                    <$Text key={"p.BootstrapBadge.Home.text6"}
                                        $widgetId={"p.BootstrapBadge.Home.text6"}
                                        class={"mx-name-text6"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Label" }, "args": {} }
                                        })}
                                        renderMode={"span"} />
                                ]
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.Home.table1$row4"}
                        $widgetId={"p.BootstrapBadge.Home.table1$row4"}
                        class={""}
                        cells={[
                            {
                                "header": true,
                                "class": "",
                                "content": [
                                    <$Text key={"p.BootstrapBadge.Home.text2"}
                                        $widgetId={"p.BootstrapBadge.Home.text2"}
                                        class={"mx-name-text2"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Pointer when microflow exists (no style design property)" }, "args": {} }
                                        })}
                                        renderMode={"span"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.badgeV22"}
                                        $widgetId={"p.BootstrapBadge.Home.badgeV22"}
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
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }, "config": { "operationId": "rpmfza+5tlafrKa/VBe2+w", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-badgeV22"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.badgeV23"}
                                        $widgetId={"p.BootstrapBadge.Home.badgeV23"}
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
                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "$Badge", "source": "object" } }, "config": { "operationId": "rpmfza+5tlafrKa/VBe2+w", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                            "argumentTypes": { }
                                        })}
                                        class={"mx-name-badgeV23"} />
                                ]
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.Home.table1$row5"}
                        $widgetId={"p.BootstrapBadge.Home.table1$row5"}
                        class={""}
                        cells={[
                            {
                                "header": true,
                                "class": "",
                                "content": [
                                    <$Text key={"p.BootstrapBadge.Home.text1"}
                                        $widgetId={"p.BootstrapBadge.Home.text1"}
                                        class={"mx-name-text1"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Static Data (no style design property)\r\n" }, "args": {} }
                                        })}
                                        renderMode={"span"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.badgeV24"}
                                        $widgetId={"p.BootstrapBadge.Home.badgeV24"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Static" }, "args": {} }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-badgeV24"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.badgeV25"}
                                        $widgetId={"p.BootstrapBadge.Home.badgeV25"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Static" }, "args": {} }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-badgeV25"} />
                                ]
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.Home.table1$row6"}
                        $widgetId={"p.BootstrapBadge.Home.table1$row6"}
                        class={""}
                        cells={[
                            {
                                "header": true,
                                "class": "",
                                "content": [
                                    <$Text key={"p.BootstrapBadge.Home.text7"}
                                        $widgetId={"p.BootstrapBadge.Home.text7"}
                                        class={"mx-name-text7"}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Empty" }, "args": {} }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Tekst" }, "args": {} }
                                            })
                                        ])}
                                        renderMode={"span"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.badgeV26"}
                                        $widgetId={"p.BootstrapBadge.Home.badgeV26"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-badgeV26"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.badgeV27"}
                                        $widgetId={"p.BootstrapBadge.Home.badgeV27"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-badgeV27"} />
                                ]
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.Home.table1$row7"}
                        $widgetId={"p.BootstrapBadge.Home.table1$row7"}
                        class={""}
                        cells={[
                            {
                                "header": true,
                                "class": "",
                                "content": [
                                    <$Text key={"p.BootstrapBadge.Home.text8"}
                                        $widgetId={"p.BootstrapBadge.Home.text8"}
                                        class={"mx-name-text8"}
                                        caption={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Style secondary" }, "args": {} }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Tekst" }, "args": {} }
                                            })
                                        ])}
                                        renderMode={"span"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.badgeV28"}
                                        $widgetId={"p.BootstrapBadge.Home.badgeV28"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-badgeV28 label-secondary"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.badgeV30"}
                                        $widgetId={"p.BootstrapBadge.Home.badgeV30"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-badgeV30 label-secondary"} />
                                ]
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.Home.table1$row8"}
                        $widgetId={"p.BootstrapBadge.Home.table1$row8"}
                        class={""}
                        cells={[
                            {
                                "header": true,
                                "class": "",
                                "content": [
                                    <$Text key={"p.BootstrapBadge.Home.text4"}
                                        $widgetId={"p.BootstrapBadge.Home.text4"}
                                        class={"mx-name-text4"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Style success\r\n" }, "args": {} }
                                        })}
                                        renderMode={"span"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.badgeV31"}
                                        $widgetId={"p.BootstrapBadge.Home.badgeV31"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-badgeV31 label-success"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.badgeV32"}
                                        $widgetId={"p.BootstrapBadge.Home.badgeV32"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-badgeV32 label-success"} />
                                ]
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.Home.table1$row9"}
                        $widgetId={"p.BootstrapBadge.Home.table1$row9"}
                        class={""}
                        cells={[
                            {
                                "header": true,
                                "class": "",
                                "content": [
                                    <$Text key={"p.BootstrapBadge.Home.text9"}
                                        $widgetId={"p.BootstrapBadge.Home.text9"}
                                        class={"mx-name-text9"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Style warning\r\n" }, "args": {} }
                                        })}
                                        renderMode={"span"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.badgeV33"}
                                        $widgetId={"p.BootstrapBadge.Home.badgeV33"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-badgeV33 label-warning"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.badgeV34"}
                                        $widgetId={"p.BootstrapBadge.Home.badgeV34"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-badgeV34 label-warning"} />
                                ]
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.Home.table1$row10"}
                        $widgetId={"p.BootstrapBadge.Home.table1$row10"}
                        class={""}
                        cells={[
                            {
                                "header": true,
                                "class": "",
                                "content": [
                                    <$Text key={"p.BootstrapBadge.Home.text5"}
                                        $widgetId={"p.BootstrapBadge.Home.text5"}
                                        class={"mx-name-text5"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Style danger" }, "args": {} }
                                        })}
                                        renderMode={"span"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.badgeDanger"}
                                        $widgetId={"p.BootstrapBadge.Home.badgeDanger"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-badgeDanger label-danger"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.Home.labelDanger"}
                                        $widgetId={"p.BootstrapBadge.Home.labelDanger"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "$Badge", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-labelDanger label-danger"} />
                                ]
                            }
                        ]} />
                ]} />
        ]}
        hideFooter={false}
        footer={[
            <$ActionButton key={"p.BootstrapBadge.Home.saveButton1"}
                $widgetId={"p.BootstrapBadge.Home.saveButton1"}
                buttonId={"p.BootstrapBadge.Home.saveButton1"}
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
                    "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p.BootstrapBadge.Home.dataView1", "source": "object" } }, "config": { "operationId": "mIeyvBLbsVW4FVOce++DJg", "closePage": true }, "disabledDuringExecution": true },
                    "abortOnServerValidation": true
                })} />,
            <$ActionButton key={"p.BootstrapBadge.Home.cancelButton1"}
                $widgetId={"p.BootstrapBadge.Home.cancelButton1"}
                buttonId={"p.BootstrapBadge.Home.cancelButton1"}
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
                    "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "ZyzzusPer1qTxWQnKnNuRA", "closePage": true }, "disabledDuringExecution": true },
                    "abortOnServerValidation": true
                })} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Home",
    "Thuis"
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
