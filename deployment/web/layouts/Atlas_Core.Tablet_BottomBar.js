import { createElement } from "react";
const React = { createElement };

import { PlaceholderProperty } from "mendix/PlaceholderProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebIconProperty } from "mendix/WebIconProperty";

import { Placeholder } from "mendix/widgets/web/Placeholder";
import { ScrollContainer } from "mendix/widgets/web/ScrollContainer";
import { SimpleMenuBar } from "mendix/widgets/web/SimpleMenuBar";
import { addEnumerations, asPluginWidgets, t } from "mendix";


const { $ScrollContainer, $SimpleMenuBar, $Placeholder } = asPluginWidgets({ ScrollContainer, SimpleMenuBar, Placeholder });

const region$Main = [
    <$ScrollContainer key={"l.Atlas_Core.Tablet_BottomBar.layoutContainer"}
        $widgetId={"l.Atlas_Core.Tablet_BottomBar.layoutContainer"}
        class={"mx-name-layoutContainer"}
        scrollPerRegion={true}
        layoutMode={"sidebar"}
        top={{
            "enabled": false
        }}
        bottom={{
            "enabled": true,
            "content": [
                <$SimpleMenuBar key={"l.Atlas_Core.Tablet_BottomBar.simpleMenuBar1"}
                    $widgetId={"l.Atlas_Core.Tablet_BottomBar.simpleMenuBar1"}
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
                <$Placeholder key={"l.Atlas_Core.Tablet_BottomBar.Main"}
                    $widgetId={"l.Atlas_Core.Tablet_BottomBar.Main"}
                    content={PlaceholderProperty({
                        "id": "Atlas_Core.Tablet_BottomBar.Main"
                    })} />
            ],
            "class": "region-content"
        }} />
];

export const content = {
    "Main": region$Main,
};
