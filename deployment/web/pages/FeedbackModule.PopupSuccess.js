import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ActionProperty } from "mendix/ActionProperty";
import { AssociationObjectProperty } from "mendix/AssociationObjectProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebStaticImageProperty } from "mendix/WebStaticImageProperty";

import { ActionButton } from "mendix/widgets/web/ActionButton";
import { Container } from "mendix/widgets/web/Container";
import { DataView } from "mendix/widgets/web/DataView";
import { Div } from "mendix/widgets/web/Div";
import * as ImageWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.mjs";
const Image = Object.getOwnPropertyDescriptor(ImageWidgetModule, "Image")?.get() || Object.getOwnPropertyDescriptor(ImageWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.css";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.PopupLayout.js";

const { $Div, $DataView, $Container, $Image, $Text, $ActionButton } = asPluginWidgets({ Div, DataView, Container, Image, Text, ActionButton });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.FeedbackModule.PopupSuccess.layoutGrid1"}
        $widgetId={"p.FeedbackModule.PopupSuccess.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.FeedbackModule.PopupSuccess.layoutGrid1$row0"}
                $widgetId={"p.FeedbackModule.PopupSuccess.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.FeedbackModule.PopupSuccess.layoutGrid1$row0$column0"}
                        $widgetId={"p.FeedbackModule.PopupSuccess.layoutGrid1$row0$column0"}
                        class={"col-lg col-md col"}
                        content={[
                            <$DataView key={"p.FeedbackModule.PopupSuccess.dataView1"}
                                $widgetId={"p.FeedbackModule.PopupSuccess.dataView1"}
                                class={"mx-name-dataView1 form-vertical"}
                                object={AssociationObjectProperty({
                                    "dataSourceId": "p.8",
                                    "scope": "$Response",
                                    "editable": true
                                })}
                                emptyMessage={TextProperty({
                                    "value": ""
                                })}
                                body={[
                                    <$Container key={"p.FeedbackModule.PopupSuccess.container1"}
                                        $widgetId={"p.FeedbackModule.PopupSuccess.container1"}
                                        class={"mx-name-container1"}
                                        renderMode={"div"}
                                        content={[
                                            <$Image key={"p.FeedbackModule.PopupSuccess.image1"}
                                                $widgetId={"p.FeedbackModule.PopupSuccess.image1"}
                                                datasource={"image"}
                                                imageObject={WebStaticImageProperty({
                                                    "image": { "uri": "img/FeedbackModule$Images$Success.png" }
                                                })}
                                                imageUrl={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                isBackgroundImage={false}
                                                onClickType={"action"}
                                                alternativeText={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                })}
                                                widthUnit={"auto"}
                                                width={100}
                                                heightUnit={"pixels"}
                                                height={240}
                                                iconSize={14}
                                                displayAs={"fullImage"}
                                                responsive={true}
                                                class={"mx-name-image1 img-center"} />,
                                            <$Text key={"p.FeedbackModule.PopupSuccess.text1"}
                                                $widgetId={"p.FeedbackModule.PopupSuccess.text1"}
                                                class={"mx-name-text1 text-center d-block spacing-outer-top-large spacing-outer-bottom-medium"}
                                                caption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "Thanks for sharing your feedback with us!" }, "args": {} }
                                                })}
                                                renderMode={"h3"} />,
                                            <$ActionButton key={"p.FeedbackModule.PopupSuccess.actionButton2"}
                                                $widgetId={"p.FeedbackModule.PopupSuccess.actionButton2"}
                                                buttonId={"p.FeedbackModule.PopupSuccess.actionButton2"}
                                                class={"mx-name-actionButton2 d-block center-block"}
                                                renderType={"button"}
                                                buttonClass={"btn-primary"}
                                                caption={ExpressionProperty({
                                                    "expression": { "expr": { "type": "literal", "value": "View your feedback" }, "args": {} }
                                                })}
                                                tooltip={TextProperty({
                                                    "value": ""
                                                })}
                                                action={ActionProperty({
                                                    "action": { "type": "openLink", "argMap": { "$object": { "widget": "$Response", "source": "object" } }, "config": { "schema": "web", "addressAttribute": "FeedbackModule.ResponseHelper/URL" }, "disabledDuringExecution": true },
                                                    "abortOnServerValidation": true
                                                })} />
                                        ]}
                                        ariaHidden={false} />
                                ]}
                                hideFooter={true} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Feedback Submitted"
]);

export const classes = "";

export const autofocus = "desktopOnly";
export const cancelChangesOperationId = "Tj7I/ao4a1yuvYZ3xc5CBQ";
export const style = {};
export const parameters = {
  "$Response": {
    "kind": "object"
  }
};
export const content = { ...parentContent,
    "Atlas_Core.PopupLayout.Main": region$Main,
};
