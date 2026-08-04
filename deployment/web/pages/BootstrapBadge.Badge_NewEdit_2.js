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

import { ActionButton } from "mendix/widgets/web/ActionButton";
import * as ComboboxWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.mjs";
const Combobox = Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "Combobox")?.get() || Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.css";
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import { FormGroup } from "mendix/widgets/web/FormGroup";
import { TextBox } from "mendix/widgets/web/TextBox";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/BootstrapBadge.PopupPageLayout.js";

const { $Div, $DataView, $FormGroup, $TextBox, $Combobox, $ActionButton } = asPluginWidgets({ Div, DataView, FormGroup, TextBox, Combobox, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.BootstrapBadge.Badge_NewEdit_2.layoutGrid1"}
        $widgetId={"p.BootstrapBadge.Badge_NewEdit_2.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.BootstrapBadge.Badge_NewEdit_2.layoutGrid1$row0"}
                $widgetId={"p.BootstrapBadge.Badge_NewEdit_2.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.BootstrapBadge.Badge_NewEdit_2.layoutGrid1$row0$column0"}
                        $widgetId={"p.BootstrapBadge.Badge_NewEdit_2.layoutGrid1$row0$column0"}
                        class={"col-lg-12 col-md-12 col-12"}
                        content={[
                            <$DataView key={"p.BootstrapBadge.Badge_NewEdit_2.dataView1"}
                                $widgetId={"p.BootstrapBadge.Badge_NewEdit_2.dataView1"}
                                class={"mx-name-dataView1 form-horizontal"}
                                object={AssociationObjectProperty({
                                    "dataSourceId": "p.8",
                                    "scope": "$Badge",
                                    "editable": true
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$FormGroup key={"p.BootstrapBadge.Badge_NewEdit_2.textBox6$formGroup"}
                                        $widgetId={"p.BootstrapBadge.Badge_NewEdit_2.textBox6$formGroup"}
                                        class={"mx-name-textBox6 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.Badge_NewEdit_2.textBox6"}
                                                $widgetId={"p.BootstrapBadge.Badge_NewEdit_2.textBox6"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.Badge_NewEdit_2.dataView1",
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
                                                    "widgetId": "p.BootstrapBadge.Badge_NewEdit_2.textBox6"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Data" }, "args": {} }
                                        })}
                                        width={4}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.Badge_NewEdit_2.textBox6"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.Badge_NewEdit_2.textBox6"
                                        })} />,
                                    <$FormGroup key={"p.BootstrapBadge.Badge_NewEdit_2.textBox5$formGroup"}
                                        $widgetId={"p.BootstrapBadge.Badge_NewEdit_2.textBox5$formGroup"}
                                        class={"mx-name-textBox5 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.BootstrapBadge.Badge_NewEdit_2.textBox5"}
                                                $widgetId={"p.BootstrapBadge.Badge_NewEdit_2.textBox5"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.Badge_NewEdit_2.dataView1",
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
                                                readOnlyStyle={"text"}
                                                maxLength={200}
                                                autocomplete={"on"}
                                                submitWhileEditing={false}
                                                submitDelay={300}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p.BootstrapBadge.Badge_NewEdit_2.textBox5"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Label attribute" }, "args": {} }
                                        })}
                                        width={4}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.Badge_NewEdit_2.textBox5"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.Badge_NewEdit_2.textBox5"
                                        })} />,
                                    <$FormGroup key={"p.BootstrapBadge.Badge_NewEdit_2.dropDown1$formGroup"}
                                        $widgetId={"p.BootstrapBadge.Badge_NewEdit_2.dropDown1$formGroup"}
                                        class={"mx-name-dropDown1"}
                                        control={[
                                            <$Combobox key={"p.BootstrapBadge.Badge_NewEdit_2.dropDown1"}
                                                $widgetId={"p.BootstrapBadge.Badge_NewEdit_2.dropDown1"}
                                                source={"context"}
                                                optionsSourceType={"enumeration"}
                                                attributeEnumeration={AttributeProperty({
                                                    "scope": "p.BootstrapBadge.Badge_NewEdit_2.dataView1",
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
                                                readOnlyStyle={"text"}
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
                                                    "widgetId": "p.BootstrapBadge.Badge_NewEdit_2.dropDown1"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Bootstrap style" }, "args": {} }
                                        })}
                                        width={4}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.BootstrapBadge.Badge_NewEdit_2.dropDown1"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.BootstrapBadge.Badge_NewEdit_2.dropDown1"
                                        })} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.BootstrapBadge.Badge_NewEdit_2.saveButton1"}
                                        $widgetId={"p.BootstrapBadge.Badge_NewEdit_2.saveButton1"}
                                        buttonId={"p.BootstrapBadge.Badge_NewEdit_2.saveButton1"}
                                        class={"mx-name-saveButton1"}
                                        renderType={"button"}
                                        buttonClass={"btn-success"}
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
                                        action={ActionProperty({
                                            "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p.BootstrapBadge.Badge_NewEdit_2.dataView1", "source": "object" } }, "config": { "operationId": "SEXXJjeVxl2dfLNwQKV0yA", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />,
                                    <$ActionButton key={"p.BootstrapBadge.Badge_NewEdit_2.cancelButton1"}
                                        $widgetId={"p.BootstrapBadge.Badge_NewEdit_2.cancelButton1"}
                                        buttonId={"p.BootstrapBadge.Badge_NewEdit_2.cancelButton1"}
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
                                        action={ActionProperty({
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "U4dCu7Ps0lOrp35oCan5dw", "closePage": true }, "disabledDuringExecution": true },
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

export const classes = "page-form page-form-default";

export const autofocus = "desktopOnly";
export const cancelChangesOperationId = "v1joCGpuGl2dCbCY9pHT6w";
export const style = {};
export const parameters = {
  "$Badge": {
    "kind": "object"
  }
};
export const content = { ...parentContent,
    "BootstrapBadge.PopupPageLayout.Main": region$Main,
};
