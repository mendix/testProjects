import { createElement } from "react";
const React = { createElement };

import { ExpressionProperty } from "mendix/ExpressionProperty";
import { PlaceholderProperty } from "mendix/PlaceholderProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebIconProperty } from "mendix/WebIconProperty";
import { WebStaticImageProperty } from "mendix/WebStaticImageProperty";

import { Container } from "mendix/widgets/web/Container";
import { Header } from "mendix/widgets/web/Header";
import * as ImageWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.mjs";
const Image = Object.getOwnPropertyDescriptor(ImageWidgetModule, "Image")?.get() || Object.getOwnPropertyDescriptor(ImageWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.css";
import { NavigationTree } from "mendix/widgets/web/NavigationTree";
import { Placeholder } from "mendix/widgets/web/Placeholder";
import { ScrollContainer } from "mendix/widgets/web/ScrollContainer";
import { SidebarToggle } from "mendix/widgets/web/SidebarToggle";
import { Text } from "mendix/widgets/web/Text";
import { Title } from "mendix/widgets/web/Title";
import { addEnumerations, asPluginWidgets, t } from "mendix";


const { $ScrollContainer, $Header, $Title, $SidebarToggle, $Placeholder, $Container, $Image, $Text, $NavigationTree } = asPluginWidgets({ ScrollContainer, Header, Title, SidebarToggle, Placeholder, Container, Image, Text, NavigationTree });

const region$Main = [
    <$ScrollContainer key={"l.Atlas_Core.Phone_Sidebar.scrollContainer1"}
        $widgetId={"l.Atlas_Core.Phone_Sidebar.scrollContainer1"}
        class={"mx-name-scrollContainer1"}
        scrollPerRegion={true}
        layoutMode={"sidebar"}
        top={{
            "enabled": true,
            "content": [
                <$Header key={"l.Atlas_Core.Phone_Sidebar.header1"}
                    $widgetId={"l.Atlas_Core.Phone_Sidebar.header1"}
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
                        <$SidebarToggle key={"l.Atlas_Core.Phone_Sidebar.sidebarToggle2"}
                            $widgetId={"l.Atlas_Core.Phone_Sidebar.sidebarToggle2"}
                            buttonId={"l.Atlas_Core.Phone_Sidebar.sidebarToggle2"}
                            renderType={"link"}
                            buttonClass={"btn-default"}
                            caption={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                            })}
                            tooltip={TextProperty({
                                "value": "Toggle Menu"
                            })}
                            icon={WebIconProperty({
                                "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-navigation-menu" }
                            })}
                            class={"mx-name-sidebarToggle2 toggle-btn"}
                            tabIndex={-1} />
                    ]}
                    rightWidgets={[
                        <$Placeholder key={"l.Atlas_Core.Phone_Sidebar.HeaderRight"}
                            $widgetId={"l.Atlas_Core.Phone_Sidebar.HeaderRight"}
                            content={PlaceholderProperty({
                                "id": "Atlas_Core.Phone_Sidebar.HeaderRight"
                            })} />
                    ]} />
            ],
            "sizeMode": "auto",
            "class": "region-topbar"
        }}
        bottom={{
            "enabled": false
        }}
        left={{
            "enabled": true,
            "content": [
                <$Container key={"l.Atlas_Core.Phone_Sidebar.container1"}
                    $widgetId={"l.Atlas_Core.Phone_Sidebar.container1"}
                    class={"mx-name-container1 sidebar-heading row-left spacing-inner-top-large spacing-inner-bottom-large spacing-inner-left-large spacing-inner-right-large"}
                    renderMode={"div"}
                    content={[
                        <$Image key={"l.Atlas_Core.Phone_Sidebar.image1"}
                            $widgetId={"l.Atlas_Core.Phone_Sidebar.image1"}
                            datasource={"image"}
                            imageObject={WebStaticImageProperty({
                                "image": { "uri": "img/Atlas_Core$Layout$logo.svg" }
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
                            width={28}
                            heightUnit={"auto"}
                            height={100}
                            iconSize={14}
                            displayAs={"fullImage"}
                            responsive={true}
                            class={"mx-name-image1 spacing-outer-right"} />,
                        <$Text key={"l.Atlas_Core.Phone_Sidebar.text1"}
                            $widgetId={"l.Atlas_Core.Phone_Sidebar.text1"}
                            class={"mx-name-text1 text-white text-bold"}
                            caption={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Mendix" }, "args": {} }
                            })}
                            renderMode={"span"} />
                    ]}
                    ariaHidden={false} />,
                <$NavigationTree key={"l.Atlas_Core.Phone_Sidebar.navigationTree1"}
                    $widgetId={"l.Atlas_Core.Phone_Sidebar.navigationTree1"}
                    class={"mx-name-navigationTree1 sidebar-menu"}
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
                    ]} />
            ],
            "sizeMode": "percentage",
            "sizeValue": 80,
            "class": "region-sidebar",
            "toggleMode": "push",
            "initiallyOpen": false
        }}
        right={{
            "enabled": false
        }}
        center={{
            "content": [
                <$Placeholder key={"l.Atlas_Core.Phone_Sidebar.Main"}
                    $widgetId={"l.Atlas_Core.Phone_Sidebar.Main"}
                    content={PlaceholderProperty({
                        "id": "Atlas_Core.Phone_Sidebar.Main"
                    })} />
            ],
            "class": "region-content"
        }} />
];

export const content = {
    "Main": region$Main,
};
