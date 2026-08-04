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
import * as ImageWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.mjs";
const Image = Object.getOwnPropertyDescriptor(ImageWidgetModule, "Image")?.get() || Object.getOwnPropertyDescriptor(ImageWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/image/Image.css";
import * as LanguageSelectorWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/languageselector/LanguageSelector.mjs";
const LanguageSelector = Object.getOwnPropertyDescriptor(LanguageSelectorWidgetModule, "LanguageSelector")?.get() || Object.getOwnPropertyDescriptor(LanguageSelectorWidgetModule, "default")?.get();   
import "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/com/mendix/widget/web/languageselector/LanguageSelector.css";
import { MenuBar } from "mendix/widgets/web/MenuBar";
import { NavigationTree } from "mendix/widgets/web/NavigationTree";
import { Placeholder } from "mendix/widgets/web/Placeholder";
import { ScrollContainer } from "mendix/widgets/web/ScrollContainer";
import { SidebarToggle } from "mendix/widgets/web/SidebarToggle";
import * as SprintrFeedbackWidgetModule from "Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/badge-web/tests/testProject/deployment/web/widgets/SprintrFeedbackWidget/SprintrFeedback.mjs";
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
                            allowScreenshot={true}
                            overrideFeedbackServerLocation={""}
                            foreignObjectRendering={true}
                            scrollableAreaSelector={".mx-scrollcontainer-fixed > .mx-scrollcontainer-middle > .mx-scrollcontainer-wrapper"}
                            translation_Cancel={t([
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Cancel" }, "args": {} }
                                }),
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Annuleren" }, "args": {} }
                                })
                            ])}
                            translation_Submit={t([
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Submit" }, "args": {} }
                                }),
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Versturen" }, "args": {} }
                                })
                            ])}
                            translation_Feedback={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Feedback" }, "args": {} }
                            })}
                            translation_Email_Address={t([
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Email" }, "args": {} }
                                }),
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "E-mail" }, "args": {} }
                                })
                            ])}
                            translation_Include_a_screenshot_of_the_current_page={t([
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Include a screenshot of the current page" }, "args": {} }
                                }),
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Voeg een screenshot van de huidige pagina toe" }, "args": {} }
                                })
                            ])}
                            translation_Screenshots_have_been_disabled_for_the_feedback_mode={t([
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Screenshots have been disabled for the feedback mode" }, "args": {} }
                                }),
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Schermafbeeldingen zijn uitgeschakeld voor de feedbackmodus" }, "args": {} }
                                })
                            ])}
                            translation_Take_screenshot={t([
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Take screenshot" }, "args": {} }
                                }),
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Screenshot maken" }, "args": {} }
                                })
                            ])}
                            translation_Error={t([
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Error" }, "args": {} }
                                }),
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Fout" }, "args": {} }
                                })
                            ])}
                            translation_Sending_feedback={t([
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Sending..." }, "args": {} }
                                }),
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Verzenden..." }, "args": {} }
                                })
                            ])}
                            translation_Error_creating_a_screenshot={t([
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Error creating a screenshot" }, "args": {} }
                                }),
                                ExpressionProperty({
                                    "expression": { "expr": { "type": "literal", "value": "Fout bij het maken van een screenshot" }, "args": {} }
                                })
                            ])}
                            submitSuccessImgUrl={""}
                            submitFailedImgUrl={""}
                            userInfo={"prefilled"}
                            translation_Modal_Title={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Share Feedback" }, "args": {} }
                            })}
                            translation_Modal_Introduction_Text={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Help us make your experience better and share your feedback with us!" }, "args": {} }
                            })}
                            translation_Close={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Close" }, "args": {} }
                            })}
                            translation_Clear={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Clear" }, "args": {} }
                            })}
                            translation_Subject={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Subject" }, "args": {} }
                            })}
                            translation_Description={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Description" }, "args": {} }
                            })}
                            translation_Description_Placeholder={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Please add a detailed description, including steps you took before finding the issue, or how this idea would help improve the experience for you and other users." }, "args": {} }
                            })}
                            translation_Description_Error={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Description is Invalid" }, "args": {} }
                            })}
                            translation_Attachment={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Attachment" }, "args": {} }
                            })}
                            translation_Email_Invalid={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Email is Invalid" }, "args": {} }
                            })}
                            translation_Email_Description_Placeholder={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "name@company.com" }, "args": {} }
                            })}
                            translation_Your_email_address_is_optional={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Your email address will only be used as a means to contact you about your feedback items." }, "args": {} }
                            })}
                            translation_Done={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Done" }, "args": {} }
                            })}
                            translation_Enter_screenshot_mode={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Enter Screenshot Mode" }, "args": {} }
                            })}
                            translation_Upload_from_computer={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Upload From Computer" }, "args": {} }
                            })}
                            translation_File_Size={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Maximum size is 5MB." }, "args": {} }
                            })}
                            translation_Screenshot_Image_Alt_Text={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Feedback screenshot image" }, "args": {} }
                            })}
                            translation_Annotate={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Annotate" }, "args": {} }
                            })}
                            translation_Summarize_feedback_item={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Summarize your feedback item in a few words" }, "args": {} }
                            })}
                            translation_Add_as_many_details_as_you_can={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Add as many details as you can, including steps you took before finding the issue, or how the\n                        idea you are suggesting could help us improve the experience for you and other people using the\n                        app." }, "args": {} }
                            })}
                            translation_Use_Screenshot_mode_to_take_a_snapshot={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Use ‘Screenshot mode’ to take a snapshot of your screen and annotate it. ‘Screenshote mode’ requires you to allow your browser to share your screen. Alternatively you can upload an image of up to 5MB in one of the following formats: jpg, jpeg, png, gif." }, "args": {} }
                            })}
                            translation_Outro_Title={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Feedback Submitted!" }, "args": {} }
                            })}
                            translation_Outro_Paragraph={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Thanks for sharing your feedback with us!" }, "args": {} }
                            })}
                            translation_Submit_Feedback_Error_Title={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Oops, it seems your feedback wasn’t sent!" }, "args": {} }
                            })}
                            translation_Submit_Feedback_Error_Message={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "Please try again later, or contact support if the issue persists." }, "args": {} }
                            })}
                            translation_Field_Required={ExpressionProperty({
                                "expression": { "expr": { "type": "literal", "value": "This Field is Required" }, "args": {} }
                            })}
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
                                                                                    "action": ActionProperty({
                                                                                        "action": { "type": "callMicroflow", "argMap": {}, "config": { "operationId": "ubLLpFYx0VCA1/5ng/qddA", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                                        "skipClientValidation": true
                                                                                    })
                                                                                },
                                                                                {
                                                                                    "caption": TextProperty({
                                                                                        "value": "Wrong configs"
                                                                                    }),
                                                                                    "items": [
                                                                                        {
                                                                                            "caption": TextProperty({
                                                                                                "value": "NoContext"
                                                                                            }),
                                                                                            "action": ActionProperty({
                                                                                                "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/NoContext.page.xml", "title": t([ { "type": "literal", "value": "No Context" }, { "type": "literal", "value": "No Context" } ]), "location": "content", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                                                "skipClientValidation": true
                                                                                            })
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "caption": TextProperty({
                                                                                        "value": "Different Views"
                                                                                    }),
                                                                                    "items": [
                                                                                        {
                                                                                            "caption": TextProperty({
                                                                                                "value": "Listen To Grid"
                                                                                            }),
                                                                                            "action": ActionProperty({
                                                                                                "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/ListenToGrid.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                                                "skipClientValidation": true
                                                                                            })
                                                                                        },
                                                                                        {
                                                                                            "caption": TextProperty({
                                                                                                "value": "Listview"
                                                                                            }),
                                                                                            "action": ActionProperty({
                                                                                                "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/ListView.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                                                "skipClientValidation": true
                                                                                            })
                                                                                        },
                                                                                        {
                                                                                            "caption": TextProperty({
                                                                                                "value": "Tab Container"
                                                                                            }),
                                                                                            "action": ActionProperty({
                                                                                                "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/TabContainer.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                                                "skipClientValidation": true
                                                                                            })
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "caption": TextProperty({
                                                                                        "value": "Onclick"
                                                                                    }),
                                                                                    "items": [
                                                                                        {
                                                                                            "caption": TextProperty({
                                                                                                "value": "Call Microflow"
                                                                                            }),
                                                                                            "action": ActionProperty({
                                                                                                "action": { "type": "callMicroflow", "argMap": {}, "config": { "operationId": "mZvyKD4mUVGXN+9YbLQW+w", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                                                "skipClientValidation": true
                                                                                            })
                                                                                        },
                                                                                        {
                                                                                            "caption": TextProperty({
                                                                                                "value": "Call Nanoflow"
                                                                                            }),
                                                                                            "action": ActionProperty({
                                                                                                "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/CallNanoflow.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ], "pageAddressExpression": { "expr": { "type": "function", "name": "+", "parameters": [ { "type": "literal", "value": "/p/" }, { "type": "literal", "value": "callNanoflow" } ] }, "args": {} } }, "disabledDuringExecution": false },
                                                                                                "skipClientValidation": true
                                                                                            })
                                                                                        },
                                                                                        {
                                                                                            "caption": TextProperty({
                                                                                                "value": "Open Page"
                                                                                            }),
                                                                                            "action": ActionProperty({
                                                                                                "action": { "type": "callMicroflow", "argMap": {}, "config": { "operationId": "6QD1RlmHC1KxwIxbGfNH9w", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                                                "skipClientValidation": true
                                                                                            })
                                                                                        },
                                                                                        {
                                                                                            "caption": TextProperty({
                                                                                                "value": "On Click Close Page"
                                                                                            }),
                                                                                            "action": ActionProperty({
                                                                                                "action": { "type": "callMicroflow", "argMap": {}, "config": { "operationId": "n9puxy6Sg1a5aiH+GKDsYA", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                                                "skipClientValidation": true
                                                                                            })
                                                                                        },
                                                                                        {
                                                                                            "caption": TextProperty({
                                                                                                "value": "Error in microflow"
                                                                                            }),
                                                                                            "action": ActionProperty({
                                                                                                "action": { "type": "callMicroflow", "argMap": {}, "config": { "operationId": "2pbwEW6cdFex0GBCDRrY4g", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                                                "skipClientValidation": true
                                                                                            })
                                                                                        },
                                                                                        {
                                                                                            "caption": TextProperty({
                                                                                                "value": "Close Popup"
                                                                                            }),
                                                                                            "action": ActionProperty({
                                                                                                "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/ClosePopup.page.xml", "location": "popup", "resizable": true, "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                                                                                "skipClientValidation": true
                                                                                            })
                                                                                        }
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    "caption": TextProperty({
                                                                                        "value": "Data Type"
                                                                                    }),
                                                                                    "action": ActionProperty({
                                                                                        "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/AttributeType.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ], "pageAddressExpression": { "expr": { "type": "function", "name": "+", "parameters": [ { "type": "literal", "value": "/p/" }, { "type": "literal", "value": "dataTypes" } ] }, "args": {} } }, "disabledDuringExecution": false },
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
                                                                                        "operationId": "tDmkICPNLlCVeeG0xl7XSQ",
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
                                                                                    screenReaderLabelCaption={ExpressionProperty({
                                                                                        "expression": { "expr": { "type": "literal", "value": "" }, "args": {} }
                                                                                    })}
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
                            "action": ActionProperty({
                                "action": { "type": "callMicroflow", "argMap": {}, "config": { "operationId": "ubLLpFYx0VCA1/5ng/qddA", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                "skipClientValidation": true
                            })
                        },
                        {
                            "caption": TextProperty({
                                "value": "Wrong configs"
                            }),
                            "items": [
                                {
                                    "caption": TextProperty({
                                        "value": "NoContext"
                                    }),
                                    "action": ActionProperty({
                                        "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/NoContext.page.xml", "title": t([ { "type": "literal", "value": "No Context" }, { "type": "literal", "value": "No Context" } ]), "location": "content", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                        "skipClientValidation": true
                                    })
                                }
                            ]
                        },
                        {
                            "caption": TextProperty({
                                "value": "Different Views"
                            }),
                            "items": [
                                {
                                    "caption": TextProperty({
                                        "value": "Listen To Grid"
                                    }),
                                    "action": ActionProperty({
                                        "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/ListenToGrid.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                        "skipClientValidation": true
                                    })
                                },
                                {
                                    "caption": TextProperty({
                                        "value": "Listview"
                                    }),
                                    "action": ActionProperty({
                                        "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/ListView.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                        "skipClientValidation": true
                                    })
                                },
                                {
                                    "caption": TextProperty({
                                        "value": "Tab Container"
                                    }),
                                    "action": ActionProperty({
                                        "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/TabContainer.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                        "skipClientValidation": true
                                    })
                                }
                            ]
                        },
                        {
                            "caption": TextProperty({
                                "value": "Onclick"
                            }),
                            "items": [
                                {
                                    "caption": TextProperty({
                                        "value": "Call Microflow"
                                    }),
                                    "action": ActionProperty({
                                        "action": { "type": "callMicroflow", "argMap": {}, "config": { "operationId": "mZvyKD4mUVGXN+9YbLQW+w", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                        "skipClientValidation": true
                                    })
                                },
                                {
                                    "caption": TextProperty({
                                        "value": "Call Nanoflow"
                                    }),
                                    "action": ActionProperty({
                                        "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/CallNanoflow.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ], "pageAddressExpression": { "expr": { "type": "function", "name": "+", "parameters": [ { "type": "literal", "value": "/p/" }, { "type": "literal", "value": "callNanoflow" } ] }, "args": {} } }, "disabledDuringExecution": false },
                                        "skipClientValidation": true
                                    })
                                },
                                {
                                    "caption": TextProperty({
                                        "value": "Open Page"
                                    }),
                                    "action": ActionProperty({
                                        "action": { "type": "callMicroflow", "argMap": {}, "config": { "operationId": "6QD1RlmHC1KxwIxbGfNH9w", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                        "skipClientValidation": true
                                    })
                                },
                                {
                                    "caption": TextProperty({
                                        "value": "On Click Close Page"
                                    }),
                                    "action": ActionProperty({
                                        "action": { "type": "callMicroflow", "argMap": {}, "config": { "operationId": "n9puxy6Sg1a5aiH+GKDsYA", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                        "skipClientValidation": true
                                    })
                                },
                                {
                                    "caption": TextProperty({
                                        "value": "Error in microflow"
                                    }),
                                    "action": ActionProperty({
                                        "action": { "type": "callMicroflow", "argMap": {}, "config": { "operationId": "2pbwEW6cdFex0GBCDRrY4g", "validate": "view", "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                        "skipClientValidation": true
                                    })
                                },
                                {
                                    "caption": TextProperty({
                                        "value": "Close Popup"
                                    }),
                                    "action": ActionProperty({
                                        "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/ClosePopup.page.xml", "location": "popup", "resizable": true, "allowedRoles": [ "Administrator", "User" ] }, "disabledDuringExecution": false },
                                        "skipClientValidation": true
                                    })
                                }
                            ]
                        },
                        {
                            "caption": TextProperty({
                                "value": "Data Type"
                            }),
                            "action": ActionProperty({
                                "action": { "type": "openPage", "argMap": {}, "config": { "name": "BootstrapBadge/AttributeType.page.xml", "location": "content", "allowedRoles": [ "Administrator", "User" ], "pageAddressExpression": { "expr": { "type": "function", "name": "+", "parameters": [ { "type": "literal", "value": "/p/" }, { "type": "literal", "value": "dataTypes" } ] }, "args": {} } }, "disabledDuringExecution": false },
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
