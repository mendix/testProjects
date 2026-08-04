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
import { WebDynamicImageProperty } from "mendix/WebDynamicImageProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import * as ComboboxWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.mjs";
const Combobox = Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "Combobox")?.get() || Object.getOwnPropertyDescriptor(ComboboxWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/combobox/Combobox.css";
import { Container } from "mendix/widgets/web/Container";
import { DataView } from "mendix/widgets/web/DataView";
import { DatePicker } from "mendix/widgets/web/DatePicker";
import { Div } from "mendix/widgets/web/Div";
import { FileManager } from "mendix/widgets/web/FileManager";
import { FormGroup } from "mendix/widgets/web/FormGroup";
import * as ImageWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.mjs";
const Image = Object.getOwnPropertyDescriptor(ImageWidgetModule, "Image")?.get() || Object.getOwnPropertyDescriptor(ImageWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.css";
import { RadioButtonGroup } from "mendix/widgets/web/RadioButtonGroup";
import { TextBox } from "mendix/widgets/web/TextBox";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.PopupLayout.js";

const { $Div, $DataView, $Container, $Image, $FormGroup, $TextBox, $RadioButtonGroup, $DatePicker, $Combobox, $FileManager, $ActionButton } = asPluginWidgets({ Div, DataView, Container, Image, FormGroup, TextBox, RadioButtonGroup, DatePicker, Combobox, FileManager, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.MyFirstModule.GalleryItem_NewEdit.layoutGrid1"}
        $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.MyFirstModule.GalleryItem_NewEdit.layoutGrid1$row0"}
                $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.MyFirstModule.GalleryItem_NewEdit.layoutGrid1$row0$column0"}
                        $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.layoutGrid1$row0$column0"}
                        class={"col-lg col-md col"}
                        content={[
                            <$DataView key={"p.MyFirstModule.GalleryItem_NewEdit.dataView1"}
                                $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.dataView1"}
                                class={"mx-name-dataView1 form-horizontal"}
                                object={AssociationObjectProperty({
                                    "dataSourceId": "p.8",
                                    "scope": "$GalleryItem",
                                    "editable": true
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$Container key={"p.MyFirstModule.GalleryItem_NewEdit.container1"}
                                        $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.container1"}
                                        class={"mx-name-container1 spacing-outer-bottom-medium"}
                                        renderMode={"div"}
                                        content={[
                                            <$Image key={"p.MyFirstModule.GalleryItem_NewEdit.image1"}
                                                $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.image1"}
                                                datasource={"image"}
                                                imageObject={WebDynamicImageProperty({
                                                    "scope": "p.MyFirstModule.GalleryItem_NewEdit.dataView1",
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
                                                width={200}
                                                heightUnit={"pixels"}
                                                height={200}
                                                iconSize={14}
                                                displayAs={"fullImage"}
                                                responsive={true}
                                                class={"mx-name-image1"} />
                                        ]}
                                        ariaHidden={false} />,
                                    <$FormGroup key={"p.MyFirstModule.GalleryItem_NewEdit.textBox1$formGroup"}
                                        $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.textBox1$formGroup"}
                                        class={"mx-name-textBox1 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.MyFirstModule.GalleryItem_NewEdit.textBox1"}
                                                $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.textBox1"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.MyFirstModule.GalleryItem_NewEdit.dataView1",
                                                    "path": "",
                                                    "entity": "MyFirstModule.GalleryItem",
                                                    "attribute": "FullName",
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
                                                    "widgetId": "p.MyFirstModule.GalleryItem_NewEdit.textBox1"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Full name" }, "args": {} }
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.MyFirstModule.GalleryItem_NewEdit.textBox1"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.MyFirstModule.GalleryItem_NewEdit.textBox1"
                                        })} />,
                                    <$FormGroup key={"p.MyFirstModule.GalleryItem_NewEdit.textBox2$formGroup"}
                                        $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.textBox2$formGroup"}
                                        class={"mx-name-textBox2 mx-textbox"}
                                        control={[
                                            <$TextBox key={"p.MyFirstModule.GalleryItem_NewEdit.textBox2"}
                                                $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.textBox2"}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.MyFirstModule.GalleryItem_NewEdit.dataView1",
                                                    "path": "",
                                                    "entity": "MyFirstModule.GalleryItem",
                                                    "attribute": "Age",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "validation": null,
                                                    "formatting": {
                                                        "numberFormat": {
                                                            "groupDigits": false,
                                                            "decimalPrecision": 2
                                                        }
                                                    }
                                                })}
                                                isPassword={false}
                                                placeholder={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                mask={""}
                                                readOnlyStyle={"control"}
                                                autocomplete={"on"}
                                                submitWhileEditing={false}
                                                submitDelay={300}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p.MyFirstModule.GalleryItem_NewEdit.textBox2"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Age" }, "args": {} }
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.MyFirstModule.GalleryItem_NewEdit.textBox2"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.MyFirstModule.GalleryItem_NewEdit.textBox2"
                                        })} />,
                                    <$FormGroup key={"p.MyFirstModule.GalleryItem_NewEdit.radioButtons1$formGroup"}
                                        $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.radioButtons1$formGroup"}
                                        class={"mx-name-radioButtons1 mx-radiobuttons inline"}
                                        control={[
                                            <$RadioButtonGroup key={"p.MyFirstModule.GalleryItem_NewEdit.radioButtons1"}
                                                $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.radioButtons1"}
                                                value={AttributeProperty({
                                                    "scope": "p.MyFirstModule.GalleryItem_NewEdit.dataView1",
                                                    "path": "",
                                                    "entity": "MyFirstModule.GalleryItem",
                                                    "attribute": "IsSenior",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "validation": null
                                                })}
                                                readOnlyStyle={"control"}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p.MyFirstModule.GalleryItem_NewEdit.radioButtons1"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Is senior" }, "args": {} }
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.MyFirstModule.GalleryItem_NewEdit.radioButtons1"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.MyFirstModule.GalleryItem_NewEdit.radioButtons1"
                                        })} />,
                                    <$FormGroup key={"p.MyFirstModule.GalleryItem_NewEdit.datePicker1$formGroup"}
                                        $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.datePicker1$formGroup"}
                                        class={"mx-name-datePicker1 mx-datepicker"}
                                        control={[
                                            <$DatePicker key={"p.MyFirstModule.GalleryItem_NewEdit.datePicker1"}
                                                $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.datePicker1"}
                                                mode={"date"}
                                                showCalendarButton={true}
                                                inputValue={AttributeProperty({
                                                    "scope": "p.MyFirstModule.GalleryItem_NewEdit.dataView1",
                                                    "path": "",
                                                    "entity": "MyFirstModule.GalleryItem",
                                                    "attribute": "Birthday",
                                                    "onChange": { "type": "doNothing", "argMap": {}, "config": {}, "disabledDuringExecution": false },
                                                    "isList": false,
                                                    "validation": null,
                                                    "formatting": {
                                                        "dateFormat": {
                                                            "type": "date"
                                                        }
                                                    }
                                                })}
                                                placeholder={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                buttonLabel={TextProperty({
                                                    "value": "Show date picker"
                                                })}
                                                readOnlyStyle={"control"}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p.MyFirstModule.GalleryItem_NewEdit.datePicker1"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Birthday" }, "args": {} }
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.MyFirstModule.GalleryItem_NewEdit.datePicker1"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.MyFirstModule.GalleryItem_NewEdit.datePicker1"
                                        })} />,
                                    <$FormGroup key={"p.MyFirstModule.GalleryItem_NewEdit.dropDown1$formGroup"}
                                        $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.dropDown1$formGroup"}
                                        class={"mx-name-dropDown1"}
                                        control={[
                                            <$Combobox key={"p.MyFirstModule.GalleryItem_NewEdit.dropDown1"}
                                                $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.dropDown1"}
                                                source={"context"}
                                                optionsSourceType={"enumeration"}
                                                attributeEnumeration={AttributeProperty({
                                                    "scope": "p.MyFirstModule.GalleryItem_NewEdit.dataView1",
                                                    "path": "",
                                                    "entity": "MyFirstModule.GalleryItem",
                                                    "attribute": "Role",
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
                                                selectAllButtonCaption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Select all" }, "args": {} }
                                                })}
                                                customEditability={"default"}
                                                customEditabilityExpression={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": false }, "args": {} }
                                                })}
                                                readOnlyStyle={"bordered"}
                                                ariaRequired={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": false }, "args": {} }
                                                })}
                                                ariaLabel={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Combo box" }, "args": {} }
                                                })}
                                                clearButtonAriaLabel={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Clear selection" }, "args": {} }
                                                })}
                                                removeValueAriaLabel={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Remove value" }, "args": {} }
                                                })}
                                                a11ySelectedValue={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Selected value:" }, "args": {} }
                                                })}
                                                a11yOptionsAvailable={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Number of options available:" }, "args": {} }
                                                })}
                                                a11yInstructions={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Use up and down arrow keys to navigate. Press Enter or Space Bar keys to select." }, "args": {} }
                                                })}
                                                lazyLoading={true}
                                                loadingType={"spinner"}
                                                selectedItemsSorting={"none"}
                                                filterType={"contains"}
                                                filterInputDebounceInterval={200}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p.MyFirstModule.GalleryItem_NewEdit.dropDown1"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Role" }, "args": {} }
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.MyFirstModule.GalleryItem_NewEdit.dropDown1"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.MyFirstModule.GalleryItem_NewEdit.dropDown1"
                                        })} />,
                                    <$FormGroup key={"p.MyFirstModule.GalleryItem_NewEdit.imageUploader1$formGroup"}
                                        $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.imageUploader1$formGroup"}
                                        class={"mx-imageuploader mx-name-imageUploader1 mx-imageuploader"}
                                        control={[
                                            <$FileManager key={"p.MyFirstModule.GalleryItem_NewEdit.imageUploader1"}
                                                $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.imageUploader1"}
                                                content={WebDynamicImageProperty({
                                                    "scope": "p.MyFirstModule.GalleryItem_NewEdit.dataView1",
                                                    "showAsThumbnail": false,
                                                    "shareObject": false,
                                                    "allowUpload": true
                                                })}
                                                widgetType={"upload"}
                                                maxFileSize={5}
                                                thumbnailSizeWidth={100}
                                                thumbnailSizeHeight={75}
                                                extensions={""}
                                                id={DerivedUniqueIdProperty({
                                                    "widgetId": "p.MyFirstModule.GalleryItem_NewEdit.imageUploader1"
                                                })} />
                                        ]}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Upload image" }, "args": {} }
                                        })}
                                        width={3}
                                        orientation={"horizontal"}
                                        hasError={ValidationProperty({
                                            "inputWidgetId": "p.MyFirstModule.GalleryItem_NewEdit.imageUploader1"
                                        })}
                                        labelFor={DerivedUniqueIdProperty({
                                            "widgetId": "p.MyFirstModule.GalleryItem_NewEdit.imageUploader1"
                                        })} />
                                ]}
                                hideFooter={false}
                                footer={[
                                    <$ActionButton key={"p.MyFirstModule.GalleryItem_NewEdit.actionButton1"}
                                        $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.actionButton1"}
                                        buttonId={"p.MyFirstModule.GalleryItem_NewEdit.actionButton1"}
                                        class={"mx-name-actionButton1"}
                                        renderType={"button"}
                                        buttonClass={"btn-success"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Save" }, "args": {} }
                                        })}
                                        tooltip={TextProperty({
                                            "value": ""
                                        })}
                                        action={ActionProperty({
                                            "action": { "type": "saveChanges", "argMap": { "$object": { "widget": "p.MyFirstModule.GalleryItem_NewEdit.dataView1", "source": "object" } }, "config": { "operationId": "vQeOik7NY1en6/lo53kSiA", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />,
                                    <$ActionButton key={"p.MyFirstModule.GalleryItem_NewEdit.actionButton2"}
                                        $widgetId={"p.MyFirstModule.GalleryItem_NewEdit.actionButton2"}
                                        buttonId={"p.MyFirstModule.GalleryItem_NewEdit.actionButton2"}
                                        class={"mx-name-actionButton2"}
                                        renderType={"button"}
                                        buttonClass={"btn-default"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Cancel" }, "args": {} }
                                        })}
                                        tooltip={TextProperty({
                                            "value": ""
                                        })}
                                        action={ActionProperty({
                                            "action": { "type": "cancelChanges", "argMap": {}, "config": { "operationId": "UK0Ez8opqVykBrHEacxh0w", "closePage": true }, "disabledDuringExecution": true },
                                            "abortOnServerValidation": true
                                        })} />
                                ]} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Edit Gallery Item"
]);

export const classes = "";

export const autofocus = "desktopOnly";
export const cancelChangesOperationId = "1yrUxw/hkVCUUtrOY/1PNQ";
export const style = {};
export const parameters = {
  "$GalleryItem": {
    "kind": "object"
  }
};
export const content = { ...parentContent,
    "Atlas_Core.PopupLayout.Main": region$Main,
};
