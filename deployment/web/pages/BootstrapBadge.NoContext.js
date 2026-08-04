import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AttributeProperty } from "mendix/AttributeProperty";
import { DerivedUniqueIdProperty } from "mendix/DerivedUniqueIdProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { MicroflowObjectProperty } from "mendix/MicroflowObjectProperty";
import { TextProperty } from "mendix/TextProperty";
import { ValidationProperty } from "mendix/ValidationProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import * as BadgeWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/custom/badge/Badge.mjs";
const Badge = Object.getOwnPropertyDescriptor(BadgeWidgetModule, "Badge")?.get() || Object.getOwnPropertyDescriptor(BadgeWidgetModule, "default")?.get();   
import * as ComboboxWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.mjs";
const Combobox = Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "Combobox")?.get() || Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.css";
import { ConditionalVisibilityWrapper } from "mendix/widgets/web/ConditionalVisibilityWrapper";
import { DataView } from "mendix/widgets/web/DataView";
import { FormGroup } from "mendix/widgets/web/FormGroup";
import { Table } from "mendix/widgets/web/Table";
import { TableRow } from "mendix/widgets/web/TableRow";
import { Text } from "mendix/widgets/web/Text";
import { TextBox } from "mendix/widgets/web/TextBox";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.Atlas_Default.js";

const { $DataView, $Table, $TableRow, $FormGroup, $Combobox, $TextBox, $ConditionalVisibilityWrapper, $ActionButton, $Text, $Badge } = asPluginWidgets({ DataView, Table, TableRow, FormGroup, Combobox, TextBox, ConditionalVisibilityWrapper, ActionButton, Text, Badge });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$DataView key={"p.BootstrapBadge.NoContext.dataView2"}
        $widgetId={"p.BootstrapBadge.NoContext.dataView2"}
        class={"mx-name-dataView2 form-horizontal"}
        object={MicroflowObjectProperty({
            "dataSourceId": "p.2",
            "editable": true,
            "operationId": "8m5A3q1rf1a0VbbmIMrlSg",
            "argMap": {}
        })}
        emptyMessage={TextProperty({
            "value": ""
        })}
        body={[
            <$Table key={"p.BootstrapBadge.NoContext.table1"}
                $widgetId={"p.BootstrapBadge.NoContext.table1"}
                class={"mx-name-table1"}
                autoWidth={false}
                columnWidths={[
                    "25%",
                    "38%",
                    "37%"
                ]}
                rows={[
                    <$TableRow key={"p.BootstrapBadge.NoContext.table1$row0"}
                        $widgetId={"p.BootstrapBadge.NoContext.table1$row0"}
                        class={""}
                        cells={[
                            {
                                "class": "",
                                "width": 3,
                                "content": undefined
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.NoContext.table1$row1"}
                        $widgetId={"p.BootstrapBadge.NoContext.table1$row1"}
                        class={""}
                        cells={[
                            {
                                "class": "nopadding",
                                "width": 3,
                                "content": [
                                    <$Table key={"p.BootstrapBadge.NoContext.table2"}
                                        $widgetId={"p.BootstrapBadge.NoContext.table2"}
                                        class={"mx-name-table2"}
                                        autoWidth={false}
                                        columnWidths={[
                                            "25%",
                                            "25%",
                                            "25%",
                                            "25%"
                                        ]}
                                        rows={[
                                            <$TableRow key={"p.BootstrapBadge.NoContext.table2$row0"}
                                                $widgetId={"p.BootstrapBadge.NoContext.table2$row0"}
                                                class={""}
                                                cells={[
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$FormGroup key={"p.BootstrapBadge.NoContext.dropDown1$formGroup"}
                                                                $widgetId={"p.BootstrapBadge.NoContext.dropDown1$formGroup"}
                                                                class={"mx-name-dropDown1"}
                                                                control={[
                                                                    <$Combobox key={"p.BootstrapBadge.NoContext.dropDown1"}
                                                                        $widgetId={"p.BootstrapBadge.NoContext.dropDown1"}
                                                                        source={"context"}
                                                                        optionsSourceType={"enumeration"}
                                                                        attributeEnumeration={AttributeProperty({
                                                                            "scope": "p.BootstrapBadge.NoContext.dataView2",
                                                                            "path": "",
                                                                            "entity": "BootstrapBadge.Badge",
                                                                            "attribute": "BootstrapStyle",
                                                                            "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                                            "isList": false
                                                                        })}
                                                                        optionsSourceAssociationCaptionType={"attribute"}
                                                                        optionsSourceDatabaseCaptionType={"attribute"}
                                                                        optionsSourceStaticDataSource={[]}
                                                                        emptyOptionText={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                                        })}
                                                                        noOptionsText={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                                        })}
                                                                        clearable={true}
                                                                        optionsSourceAssociationCustomContentType={"no"}
                                                                        optionsSourceDatabaseCustomContentType={"no"}
                                                                        staticDataSourceCustomContentType={"no"}
                                                                        showFooter={false}
                                                                        selectionMethod={"checkbox"}
                                                                        selectedItemsStyle={"text"}
                                                                        selectAllButton={false}
                                                                        selectAllButtonCaption={t([
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Select all" }, "args": {} }
                                                                            }),
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Selecteer alles" }, "args": {} }
                                                                            })
                                                                        ])}
                                                                        customEditability={"default"}
                                                                        customEditabilityExpression={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": false }, "args": {} }
                                                                        })}
                                                                        readOnlyStyle={"bordered"}
                                                                        ariaRequired={ExpressionProperty({
                                                                            "expression": { "expr": { "type": "literal", "value": false }, "args": {} }
                                                                        })}
                                                                        ariaLabel={t([
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Combo box" }, "args": {} }
                                                                            }),
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Keuzelijst" }, "args": {} }
                                                                            })
                                                                        ])}
                                                                        clearButtonAriaLabel={t([
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Clear selection" }, "args": {} }
                                                                            }),
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Selectie wissen" }, "args": {} }
                                                                            })
                                                                        ])}
                                                                        removeValueAriaLabel={t([
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Remove value" }, "args": {} }
                                                                            }),
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Waarde verwijderen" }, "args": {} }
                                                                            })
                                                                        ])}
                                                                        a11ySelectedValue={t([
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Selected value:" }, "args": {} }
                                                                            }),
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Geselecteerde waarde:" }, "args": {} }
                                                                            })
                                                                        ])}
                                                                        a11yOptionsAvailable={t([
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Number of options available:" }, "args": {} }
                                                                            }),
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Aantal beschikbare opties:" }, "args": {} }
                                                                            })
                                                                        ])}
                                                                        a11yInstructions={t([
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Use up and down arrow keys to navigate. Press Enter or Space Bar keys to select." }, "args": {} }
                                                                            }),
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Gebruik de pijltjestoetsen (omhoog en omlaag) om te navigeren. Druk op Enter of de spatiebalk om de waarde te selecteren." }, "args": {} }
                                                                            })
                                                                        ])}
                                                                        lazyLoading={true}
                                                                        loadingType={"spinner"}
                                                                        selectedItemsSorting={"none"}
                                                                        filterType={"contains"}
                                                                        filterInputDebounceInterval={200}
                                                                        id={DerivedUniqueIdProperty({
                                                                            "widgetId": "p.BootstrapBadge.NoContext.dropDown1"
                                                                        })} />
                                                                ]}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Bootstrap style" }, "args": {} }
                                                                })}
                                                                width={3}
                                                                orientation={"horizontal"}
                                                                hasError={ValidationProperty({
                                                                    "inputWidgetId": "p.BootstrapBadge.NoContext.dropDown1"
                                                                })}
                                                                labelFor={DerivedUniqueIdProperty({
                                                                    "widgetId": "p.BootstrapBadge.NoContext.dropDown1"
                                                                })} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$FormGroup key={"p.BootstrapBadge.NoContext.textBox2$formGroup"}
                                                                $widgetId={"p.BootstrapBadge.NoContext.textBox2$formGroup"}
                                                                class={"mx-name-textBox2 mx-textbox"}
                                                                control={[
                                                                    <$TextBox key={"p.BootstrapBadge.NoContext.textBox2"}
                                                                        $widgetId={"p.BootstrapBadge.NoContext.textBox2"}
                                                                        inputValue={AttributeProperty({
                                                                            "scope": "p.BootstrapBadge.NoContext.dataView2",
                                                                            "path": "",
                                                                            "entity": "BootstrapBadge.Badge",
                                                                            "attribute": "LabelAttribute",
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
                                                                        readOnlyStyle={"control"}
                                                                        maxLength={200}
                                                                        autocomplete={"on"}
                                                                        submitWhileEditing={false}
                                                                        submitDelay={300}
                                                                        id={DerivedUniqueIdProperty({
                                                                            "widgetId": "p.BootstrapBadge.NoContext.textBox2"
                                                                        })} />
                                                                ]}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Label attribute" }, "args": {} }
                                                                })}
                                                                width={3}
                                                                orientation={"horizontal"}
                                                                hasError={ValidationProperty({
                                                                    "inputWidgetId": "p.BootstrapBadge.NoContext.textBox2"
                                                                })}
                                                                labelFor={DerivedUniqueIdProperty({
                                                                    "widgetId": "p.BootstrapBadge.NoContext.textBox2"
                                                                })} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$FormGroup key={"p.BootstrapBadge.NoContext.textBox1$formGroup"}
                                                                $widgetId={"p.BootstrapBadge.NoContext.textBox1$formGroup"}
                                                                class={"mx-name-textBox1 mx-textbox"}
                                                                control={[
                                                                    <$TextBox key={"p.BootstrapBadge.NoContext.textBox1"}
                                                                        $widgetId={"p.BootstrapBadge.NoContext.textBox1"}
                                                                        inputValue={AttributeProperty({
                                                                            "scope": "p.BootstrapBadge.NoContext.dataView2",
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
                                                                        readOnlyStyle={"control"}
                                                                        maxLength={200}
                                                                        autocomplete={"on"}
                                                                        submitWhileEditing={false}
                                                                        submitDelay={300}
                                                                        id={DerivedUniqueIdProperty({
                                                                            "widgetId": "p.BootstrapBadge.NoContext.textBox1"
                                                                        })} />
                                                                ]}
                                                                caption={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "literal", "value": "Data" }, "args": {} }
                                                                })}
                                                                width={3}
                                                                orientation={"horizontal"}
                                                                hasError={ValidationProperty({
                                                                    "inputWidgetId": "p.BootstrapBadge.NoContext.textBox1"
                                                                })}
                                                                labelFor={DerivedUniqueIdProperty({
                                                                    "widgetId": "p.BootstrapBadge.NoContext.textBox1"
                                                                })} />
                                                        ]
                                                    },
                                                    {
                                                        "class": "",
                                                        "content": [
                                                            <$ConditionalVisibilityWrapper key={"p.BootstrapBadge.NoContext.microflowButton3$visibility"}
                                                                $widgetId={"p.BootstrapBadge.NoContext.microflowButton3$visibility"}
                                                                visible={ExpressionProperty({
                                                                    "expression": { "expr": { "type": "function", "name": "_hasSomeRole", "parameters": [ { "type": "literal", "value": "Administrator" }, { "type": "literal", "value": "User" } ] }, "args": {} }
                                                                })}
                                                                contents={[
                                                                    <$ActionButton key={"p.BootstrapBadge.NoContext.microflowButton3"}
                                                                        $widgetId={"p.BootstrapBadge.NoContext.microflowButton3"}
                                                                        buttonId={"p.BootstrapBadge.NoContext.microflowButton3"}
                                                                        class={"mx-name-microflowButton3"}
                                                                        renderType={"button"}
                                                                        buttonClass={"btn-default"}
                                                                        caption={t([
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Refresh" }, "args": {} }
                                                                            }),
                                                                            ExpressionProperty({
                                                                                "expression": { "expr": { "type": "literal", "value": "Microflow" }, "args": {} }
                                                                            })
                                                                        ])}
                                                                        tooltip={TextProperty({
                                                                            "value": ""
                                                                        })}
                                                                        action={ActionProperty({
                                                                            "action": { "type": "callMicroflow", "argMap": { "Badge": { "widget": "p.BootstrapBadge.NoContext.dataView2", "source": "object" } }, "config": { "operationId": "HWhRVqWOKFaqLucvKzU/9Q", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                            "abortOnServerValidation": true
                                                                        })} />
                                                                ]} />
                                                        ]
                                                    }
                                                ]} />
                                        ]} />
                                ]
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.NoContext.table1$row2"}
                        $widgetId={"p.BootstrapBadge.NoContext.table1$row2"}
                        class={""}
                        cells={[
                            {
                                "class": "",
                                "width": 3,
                                "content": undefined
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.NoContext.table1$row3"}
                        $widgetId={"p.BootstrapBadge.NoContext.table1$row3"}
                        class={""}
                        cells={[
                            {
                                "class": "",
                                "content": undefined
                            },
                            {
                                "header": true,
                                "class": "",
                                "content": [
                                    <$Text key={"p.BootstrapBadge.NoContext.text1"}
                                        $widgetId={"p.BootstrapBadge.NoContext.text1"}
                                        class={"mx-name-text1"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                        })}
                                        renderMode={"span"} />
                                ]
                            },
                            {
                                "header": true,
                                "class": "",
                                "content": [
                                    <$Text key={"p.BootstrapBadge.NoContext.text3"}
                                        $widgetId={"p.BootstrapBadge.NoContext.text3"}
                                        class={"mx-name-text3"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Color Label" }, "args": {} }
                                        })}
                                        renderMode={"span"} />
                                ]
                            }
                        ]} />,
                    <$TableRow key={"p.BootstrapBadge.NoContext.table1$row4"}
                        $widgetId={"p.BootstrapBadge.NoContext.table1$row4"}
                        class={""}
                        cells={[
                            {
                                "header": true,
                                "class": "",
                                "content": [
                                    <$Text key={"p.BootstrapBadge.NoContext.text2"}
                                        $widgetId={"p.BootstrapBadge.NoContext.text2"}
                                        class={"mx-name-text2"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Case Study with MF action" }, "args": {} }
                                        })}
                                        renderMode={"span"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.NoContext.badgeV23"}
                                        $widgetId={"p.BootstrapBadge.NoContext.badgeV23"}
                                        type={"badge"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "p.BootstrapBadge.NoContext.dataView2", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-badgeV23"} />
                                ]
                            },
                            {
                                "class": "",
                                "content": [
                                    <$Badge key={"p.BootstrapBadge.NoContext.badgeV24"}
                                        $widgetId={"p.BootstrapBadge.NoContext.badgeV24"}
                                        type={"label"}
                                        value={t([
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "DataString" }, "args": { "currentObject": { "widget": "p.BootstrapBadge.NoContext.dataView2", "source": "object" } } }
                                            }),
                                            ExpressionProperty({
                                                "expression": { "expr": { "type": "literal", "value": "Badge" }, "args": {} }
                                            })
                                        ])}
                                        class={"mx-name-badgeV24"} />
                                ]
                            }
                        ]} />
                ]} />
        ]}
        hideFooter={true} />
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
