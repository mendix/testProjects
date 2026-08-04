import { createElement } from "react";
const React = { createElement };

import { PageFragment } from "mendix/PageFragment";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { WebStaticImageProperty } from "mendix/WebStaticImageProperty";

import { Container } from "mendix/widgets/web/Container";
import { Div } from "mendix/widgets/web/Div";
import * as ImageWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.mjs";
const Image = Object.getOwnPropertyDescriptor(ImageWidgetModule, "Image")?.get() || Object.getOwnPropertyDescriptor(ImageWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.css";
import { Text } from "mendix/widgets/web/Text";
import { addEnumerations, asPluginWidgets, t } from "mendix";

import { content as parentContent } from "../layouts/Atlas_Core.PopupLayout.js";

const { $Div, $Container, $Image, $Text } = asPluginWidgets({ Div, Container, Image, Text });

const region$Main = (historyId) => (<PageFragment renderKey={historyId}>{[
    <$Div key={"p.FeedbackModule.PopupFailure.layoutGrid1"}
        $widgetId={"p.FeedbackModule.PopupFailure.layoutGrid1"}
        class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
        content={[
            <$Div key={"p.FeedbackModule.PopupFailure.layoutGrid1$row0"}
                $widgetId={"p.FeedbackModule.PopupFailure.layoutGrid1$row0"}
                class={"row"}
                content={[
                    <$Div key={"p.FeedbackModule.PopupFailure.layoutGrid1$row0$column0"}
                        $widgetId={"p.FeedbackModule.PopupFailure.layoutGrid1$row0$column0"}
                        class={"col-lg col-md col"}
                        content={[
                            <$Container key={"p.FeedbackModule.PopupFailure.container1"}
                                $widgetId={"p.FeedbackModule.PopupFailure.container1"}
                                class={"mx-name-container1"}
                                renderMode={"div"}
                                content={[
                                    <$Image key={"p.FeedbackModule.PopupFailure.image1"}
                                        $widgetId={"p.FeedbackModule.PopupFailure.image1"}
                                        datasource={"image"}
                                        imageObject={WebStaticImageProperty({
                                            "image": { "uri": "img/FeedbackModule$Images$Failure.png" }
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
                                    <$Text key={"p.FeedbackModule.PopupFailure.text1"}
                                        $widgetId={"p.FeedbackModule.PopupFailure.text1"}
                                        class={"mx-name-text1 text-center d-block spacing-outer-top-large spacing-outer-bottom"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Oops, it seems your feedback wasn't sent!" }, "args": {} }
                                        })}
                                        renderMode={"h3"} />,
                                    <$Text key={"p.FeedbackModule.PopupFailure.text2"}
                                        $widgetId={"p.FeedbackModule.PopupFailure.text2"}
                                        class={"mx-name-text2 text-center d-block"}
                                        caption={ExpressionProperty({
                                            "expression": { "expr": { "type": "literal", "value": "Please try again later, or contact support if the issue persists." }, "args": {} }
                                        })}
                                        renderMode={"p"} />
                                ]}
                                ariaHidden={false} />
                        ]} />
                ]} />
        ]} />
]}</PageFragment>);

export const title = t([
    "Something went wrong"
]);

export const classes = "";

export const autofocus = "desktopOnly";
export const cancelChangesOperationId = "QNxMNHj7ZlaSpMXYjwWHuA";
export const style = {};
export const parameters = {};
export const content = { ...parentContent,
    "Atlas_Core.PopupLayout.Main": region$Main,
};
