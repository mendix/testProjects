import { createElement } from "react";
const React = { createElement };

import { PlaceholderProperty } from "mendix/PlaceholderProperty";

import { Placeholder } from "mendix/widgets/web/Placeholder";
import { ScrollContainer } from "mendix/widgets/web/ScrollContainer";
import { addEnumerations, asPluginWidgets, t } from "mendix";


const { $ScrollContainer, $Placeholder } = asPluginWidgets({ ScrollContainer, Placeholder });

const region$Main = [
    <$ScrollContainer key={"l.Atlas_Core.Tablet_FullPage.layoutContainer"}
        $widgetId={"l.Atlas_Core.Tablet_FullPage.layoutContainer"}
        class={"mx-name-layoutContainer"}
        scrollPerRegion={true}
        layoutMode={"sidebar"}
        top={{
            "enabled": false
        }}
        bottom={{
            "enabled": false
        }}
        left={{
            "enabled": false
        }}
        right={{
            "enabled": false
        }}
        center={{
            "content": [
                <$Placeholder key={"l.Atlas_Core.Tablet_FullPage.Main"}
                    $widgetId={"l.Atlas_Core.Tablet_FullPage.Main"}
                    content={PlaceholderProperty({
                        "id": "Atlas_Core.Tablet_FullPage.Main"
                    })} />
            ],
            "class": "region-content"
        }} />
];

export const content = {
    "Main": region$Main,
};
