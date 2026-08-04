import { createElement } from "react";
const React = { createElement };

import { ExpressionProperty } from "mendix/ExpressionProperty";
import { PlaceholderProperty } from "mendix/PlaceholderProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebIconProperty } from "mendix/WebIconProperty";

import { Header } from "mendix/widgets/web/Header";
import { Placeholder } from "mendix/widgets/web/Placeholder";
import { ScrollContainer } from "mendix/widgets/web/ScrollContainer";
import { SimpleMenuBar } from "mendix/widgets/web/SimpleMenuBar";
import { Title } from "mendix/widgets/web/Title";
import { addEnumerations, asPluginWidgets, t } from "mendix";


const { $ScrollContainer, $Header, $Title, $Placeholder, $SimpleMenuBar } = asPluginWidgets({ ScrollContainer, Header, Title, Placeholder, SimpleMenuBar });

const region$Main = [
    <$ScrollContainer key={"l.Atlas_Core.Phone_Default.scrollContainer1"}
        $widgetId={"l.Atlas_Core.Phone_Default.scrollContainer1"}
        class={"mx-name-scrollContainer1"}
        scrollPerRegion={true}
        layoutMode={"headline"}
        top={{
            "enabled": true,
            "content": [
                <$Header key={"l.Atlas_Core.Phone_Default.header1"}
                    $widgetId={"l.Atlas_Core.Phone_Default.header1"}
                    class={"mx-name-header1"}
                    content={[
                        <$Title key={"l.4"}
                            $widgetId={"l.4"}
                            class={""}
                            caption={ExpressionProperty({
                                "expression": { "expr": { "type": "variable", "variable": "pageTitle" }, "args": {} }
                            })} />
                    ]}
                    leftWidgets={[
                        <$Placeholder key={"l.Atlas_Core.Phone_Default.HeaderLeft"}
                            $widgetId={"l.Atlas_Core.Phone_Default.HeaderLeft"}
                            content={PlaceholderProperty({
                                "id": "Atlas_Core.Phone_Default.HeaderLeft"
                            })} />
                    ]}
                    rightWidgets={[
                        <$Placeholder key={"l.Atlas_Core.Phone_Default.HeaderRight"}
                            $widgetId={"l.Atlas_Core.Phone_Default.HeaderRight"}
                            content={PlaceholderProperty({
                                "id": "Atlas_Core.Phone_Default.HeaderRight"
                            })} />
                    ]} />
            ],
            "sizeMode": "auto",
            "class": ""
        }}
        bottom={{
            "enabled": true,
            "content": [
                <$SimpleMenuBar key={"l.Atlas_Core.Phone_Default.simpleMenuBar1"}
                    $widgetId={"l.Atlas_Core.Phone_Default.simpleMenuBar1"}
                    class={"mx-name-simpleMenuBar1 bottom-nav-text-icons"}
                    menu={[
                        {
                            "caption": TextProperty({
                                "value": "Home"
                            }),
                            "icon": WebIconProperty({
                                "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-home" }
                            })
                        },
                        {
                            "caption": TextProperty({
                                "value": "Layouts"
                            }),
                            "icon": WebIconProperty({
                                "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-layout-2" }
                            })
                        },
                        {
                            "caption": TextProperty({
                                "value": "Templates"
                            }),
                            "icon": WebIconProperty({
                                "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-notes-paper-text" }
                            })
                        },
                        {
                            "caption": TextProperty({
                                "value": "Widgets"
                            }),
                            "icon": WebIconProperty({
                                "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-cog" }
                            })
                        }
                    ]}
                    orientation={"horizontal"} />
            ],
            "sizeMode": "auto",
            "class": "region-bottombar"
        }}
        left={{
            "enabled": false
        }}
        right={{
            "enabled": false
        }}
        center={{
            "content": [
                <$Placeholder key={"l.Atlas_Core.Phone_Default.Main"}
                    $widgetId={"l.Atlas_Core.Phone_Default.Main"}
                    content={PlaceholderProperty({
                        "id": "Atlas_Core.Phone_Default.Main"
                    })} />
            ],
            "class": "region-content"
        }} />
];

export const content = {
    "Main": region$Main,
};
