import { createElement } from "react";
const React = { createElement };

import { ActionProperty } from "mendix/ActionProperty";
import { DatabaseObjectListProperty } from "mendix/DatabaseObjectListProperty";
import { ExpressionProperty } from "mendix/ExpressionProperty";
import { ListExpressionProperty } from "mendix/ListExpressionProperty";
import { PlaceholderProperty } from "mendix/PlaceholderProperty";
import { TextProperty } from "mendix/TextProperty";
import { WebIconProperty } from "mendix/WebIconProperty";
import { WebStaticImageProperty } from "mendix/WebStaticImageProperty";

import { Container } from "mendix/widgets/web/Container";
import { Div } from "mendix/widgets/web/Div";
import { Fragment } from "mendix/widgets/web/Fragment";
import * as ImageWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.mjs";
const Image = Object.getOwnPropertyDescriptor(ImageWidgetModule, "Image")?.get() || Object.getOwnPropertyDescriptor(ImageWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.css";
import * as LanguageSelectorWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/languageselector/LanguageSelector.mjs";
const LanguageSelector = Object.getOwnPropertyDescriptor(LanguageSelectorWidgetModule, "LanguageSelector")?.get() || Object.getOwnPropertyDescriptor(LanguageSelectorWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/languageselector/LanguageSelector.css";
import { MenuBar } from "mendix/widgets/web/MenuBar";
import { NavigationTree } from "mendix/widgets/web/NavigationTree";
import { Placeholder } from "mendix/widgets/web/Placeholder";
import { ScrollContainer } from "mendix/widgets/web/ScrollContainer";
import { SidebarToggle } from "mendix/widgets/web/SidebarToggle";
import * as SprintrFeedbackWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/deployment/web/widgets/SprintrFeedbackWidget/SprintrFeedback.mjs";
const SprintrFeedback = Object.getOwnPropertyDescriptor(SprintrFeedbackWidgetModule, "SprintrFeedback")?.get() || Object.getOwnPropertyDescriptor(SprintrFeedbackWidgetModule, "default")?.get();   
import { addEnumerations, asPluginWidgets, t } from "mendix";


const { $ScrollContainer, $Fragment, $SprintrFeedback, $Div, $Container, $SidebarToggle, $Image, $MenuBar, $LanguageSelector, $NavigationTree, $Placeholder } = asPluginWidgets({ ScrollContainer, Fragment, SprintrFeedback, Div, Container, SidebarToggle, Image, MenuBar, LanguageSelector, NavigationTree, Placeholder });

const region$Main = [
    <$ScrollContainer key={"l.Atlas_Core.Atlas_TopBar.layoutContainer"}
        $widgetId={"l.Atlas_Core.Atlas_TopBar.layoutContainer"}
        class={"mx-name-layoutContainer"}
        scrollPerRegion={true}
        layoutMode={"sidebar"}
        top={{
            "enabled": true,
            "content": [
                <$Fragment key={"l.Atlas_Core.Atlas_TopBar.snippetCall1"}
                    $widgetId={"l.Atlas_Core.Atlas_TopBar.snippetCall1"}
                    content={[
                        <$SprintrFeedback key={"l.Atlas_Core.FeedbackWidget.feedback1"}
                            $widgetId={"l.Atlas_Core.FeedbackWidget.feedback1"}
                            sprintrapp={"1"}
                            foreignObjectRendering={true}
                            scrollableAreaSelector={".mx-scrollcontainer-fixed > .mx-scrollcontainer-middle > .mx-scrollcontainer-wrapper"}
                            showFeedbackModalMethod={"default"}
                            title_label={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Feedback" }, "args": {} }
                            })}
                            take_screenshot_label={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Take screenshot" }, "args": {} }
                            })}
                            annotate_label={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Annotate" }, "args": {} }
                            })}
                            done_label={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Done" }, "args": {} }
                            })}
                            cancel_label={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Cancel" }, "args": {} }
                            })}
                            clear_label={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Clear" }, "args": {} }
                            })}
                            userDefinedButtonStyle={"side"}
                            class={"mx-name-feedback1"} />
                    ]} />,
                <$Div key={"l.Atlas_Core.Atlas_TopBar.layoutGrid1"}
                    $widgetId={"l.Atlas_Core.Atlas_TopBar.layoutGrid1"}
                    class={"mx-name-layoutGrid1 mx-layoutgrid mx-layoutgrid-fluid container-fluid"}
                    content={[
                        <$Div key={"l.Atlas_Core.Atlas_TopBar.layoutGrid1$row0"}
                            $widgetId={"l.Atlas_Core.Atlas_TopBar.layoutGrid1$row0"}
                            class={"row"}
                            content={[
                                <$Div key={"l.Atlas_Core.Atlas_TopBar.layoutGrid1$row0$column0"}
                                    $widgetId={"l.Atlas_Core.Atlas_TopBar.layoutGrid1$row0$column0"}
                                    class={"col-lg-12 col-md-12 col-12"}
                                    content={[
                                        <$Container key={"l.Atlas_Core.Atlas_TopBar.container2"}
                                            $widgetId={"l.Atlas_Core.Atlas_TopBar.container2"}
                                            class={"mx-name-container2 topbar-content"}
                                            renderMode={"div"}
                                            content={[
                                                <$SidebarToggle key={"l.Atlas_Core.Atlas_TopBar.sidebarToggle3"}
                                                    $widgetId={"l.Atlas_Core.Atlas_TopBar.sidebarToggle3"}
                                                    buttonId={"l.Atlas_Core.Atlas_TopBar.sidebarToggle3"}
                                                    renderType={"button"}
                                                    buttonClass={"btn-primary"}
                                                    caption={ExpressionProperty({
                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                    })}
                                                    tooltip={TextProperty({
                                                        "value": "Toggle Menu"
                                                    })}
                                                    icon={WebIconProperty({
                                                        "icon": { "type": "icon", "iconClass": "mx-icon-filled mx-icon-navigation-menu" }
                                                    })}
                                                    class={"mx-name-sidebarToggle3 toggle-btn"} />,
                                                <$Div key={"l.Atlas_Core.Atlas_TopBar.layoutGrid2"}
                                                    $widgetId={"l.Atlas_Core.Atlas_TopBar.layoutGrid2"}
                                                    class={"mx-name-layoutGrid2 mx-layoutgrid mx-layoutgrid-fluid navbar-brand"}
                                                    content={[
                                                        <$Div key={"l.Atlas_Core.Atlas_TopBar.layoutGrid2$row0"}
                                                            $widgetId={"l.Atlas_Core.Atlas_TopBar.layoutGrid2$row0"}
                                                            class={"row align-children-center"}
                                                            content={[
                                                                <$Div key={"l.Atlas_Core.Atlas_TopBar.layoutGrid2$row0$column0"}
                                                                    $widgetId={"l.Atlas_Core.Atlas_TopBar.layoutGrid2$row0$column0"}
                                                                    class={"col-lg-auto col-md-auto col-auto"}
                                                                    content={[
                                                                        <$Image key={"l.Atlas_Core.Atlas_TopBar.staticImage1"}
                                                                            $widgetId={"l.Atlas_Core.Atlas_TopBar.staticImage1"}
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
                                                                            widthUnit={"auto"}
                                                                            width={100}
                                                                            heightUnit={"auto"}
                                                                            height={100}
                                                                            iconSize={14}
                                                                            displayAs={"fullImage"}
                                                                            responsive={false}
                                                                            class={"mx-name-staticImage1"} />
                                                                    ]} />,
                                                                <$Div key={"l.Atlas_Core.Atlas_TopBar.layoutGrid2$row0$column1"}
                                                                    $widgetId={"l.Atlas_Core.Atlas_TopBar.layoutGrid2$row0$column1"}
                                                                    class={"col-lg col-md col"}
                                                                    content={[
                                                                        <$MenuBar key={"l.Atlas_Core.Atlas_TopBar.menuBar1"}
                                                                            $widgetId={"l.Atlas_Core.Atlas_TopBar.menuBar1"}
                                                                            class={"mx-name-menuBar1 hidden-xs hide-icons"}
                                                                            menu={[
                                                                                {
                                                                                    "caption": TextProperty({
                                                                                        "value": "Home"
                                                                                    }),
                                                                                    "icon": WebIconProperty({
                                                                                        "icon": { "type": "glyph", "iconClass": "glyphicon-home" }
                                                                                    }),
                                                                                    "action": ActionProperty({
                                                                                        "action": { "type": "openPage", "argMap": {}, "config": { "name": "MyFirstModule/Home_Web.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                                        "skipClientValidation": true
                                                                                    })
                                                                                }
                                                                            ]} />
                                                                    ]} />,
                                                                <$Div key={"l.Atlas_Core.Atlas_TopBar.layoutGrid2$row0$column2"}
                                                                    $widgetId={"l.Atlas_Core.Atlas_TopBar.layoutGrid2$row0$column2"}
                                                                    class={"col-lg-auto col-md-auto col-auto"}
                                                                    content={[
                                                                        <$Fragment key={"l.Atlas_Core.Atlas_TopBar.snippetCall2"}
                                                                            $widgetId={"l.Atlas_Core.Atlas_TopBar.snippetCall2"}
                                                                            content={[
                                                                                <$LanguageSelector key={"l.Atlas_Core.LanguageSelectorWidget.languageSelector1"}
                                                                                    $widgetId={"l.Atlas_Core.LanguageSelectorWidget.languageSelector1"}
                                                                                    languageOptions={DatabaseObjectListProperty({
                                                                                        "dataSourceId": "l.0",
                                                                                        "entity": "System.Language",
                                                                                        "operationId": "KOepXML//lO1vIdWw5QhgA",
                                                                                        "sort": [
                                                                                            [
                                                                                                "Description",
                                                                                                "asc"
                                                                                            ]
                                                                                        ]
                                                                                    })}
                                                                                    languageCaption={ListExpressionProperty({
                                                                                        "expression": { "expr": { "type": "variable", "variable": "currentObject", "path": "Description" }, "args": { "currentObject": { "widget": "l.Atlas_Core.LanguageSelectorWidget.languageSelector1", "source": "object" } } },
                                                                                        "dataSourceId": "l.0"
                                                                                    })}
                                                                                    position={"bottom"}
                                                                                    trigger={"click"}
                                                                                    hideForSingle={false}
                                                                                    class={"mx-name-languageSelector1"} />
                                                                            ]} />
                                                                    ]} />
                                                            ]} />
                                                    ]} />
                                            ]}
                                            ariaHidden={false} />
                                    ]} />
                            ]} />
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
                <$NavigationTree key={"l.Atlas_Core.Atlas_TopBar.navigationTree1"}
                    $widgetId={"l.Atlas_Core.Atlas_TopBar.navigationTree1"}
                    class={"mx-name-navigationTree1"}
                    menu={[
                        {
                            "caption": TextProperty({
                                "value": "Home"
                            }),
                            "icon": WebIconProperty({
                                "icon": { "type": "glyph", "iconClass": "glyphicon-home" }
                            }),
                            "action": ActionProperty({
                                "action": { "type": "openPage", "argMap": {}, "config": { "name": "MyFirstModule/Home_Web.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                "skipClientValidation": true
                            })
                        }
                    ]} />
            ],
            "sizeMode": "pixels",
            "sizeValue": 320,
            "class": "region-sidebar",
            "toggleMode": "push",
            "initiallyOpen": false
        }}
        right={{
            "enabled": false
        }}
        center={{
            "content": [
                <$Placeholder key={"l.Atlas_Core.Atlas_TopBar.Main"}
                    $widgetId={"l.Atlas_Core.Atlas_TopBar.Main"}
                    content={PlaceholderProperty({
                        "id": "Atlas_Core.Atlas_TopBar.Main"
                    })} />
            ],
            "class": "region-content"
        }} />
];

export const content = {
    "Main": region$Main,
};
