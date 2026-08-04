import { addEnumerations, t } from "mendix";

export const ACT_TriggerScreenshotMode = {
  "name": "FeedbackModule.ACT_TriggerScreenshotMode",
  "useListParameterByReference": true,
  "instructions": [
    {
      "type": "closeForm",
      "label": "1c6d4a50-5e03-4579-a845-a96b70ff4eb3"
    },
    {
      "type": "javaScriptActionCall",
      "label": "dc839acc-7e36-4d98-a696-40f632d34740",
      "action": () => require("Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/javascriptsource/feedbackmodule/actions/JS_ToggleFeedbackScreenshotWidget").JS_ToggleFeedbackScreenshotWidget,
      "outputVar": "base64FromWidget",
      "parameters": []
    },
    {
      "type": "switch",
      "label": "028529fd-c8b3-4e72-869c-a8c22db7dd2e",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "base64FromWidget"
          },
          {
            "type": "literal",
            "value": "uploadCancelled"
          }
        ]
      },
      "targets": {
        "true": "f26ecffc-6169-4a81-9af8-da2129688f2e",
        "false": "570568b0-8a88-4fe7-b9f7-cfd36c773f0d"
      }
    },
    {
      "type": "jump",
      "label": "570568b0-8a88-4fe7-b9f7-cfd36c773f0d",
      "target": "7846843f-d550-437d-bd5e-cdff313d812e"
    },
    {
      "type": "jump",
      "label": "7846843f-d550-437d-bd5e-cdff313d812e",
      "target": "0df07996-22f9-4565-946f-b70b6769e3b8"
    },
    {
      "type": "jump",
      "label": "0df07996-22f9-4565-946f-b70b6769e3b8",
      "target": "b804e77c-0db7-4bdf-8b87-a37150d8e8cb"
    },
    {
      "type": "openForm",
      "label": "b804e77c-0db7-4bdf-8b87-a37150d8e8cb",
      "path": "FeedbackModule/ShareFeedback.page.xml",
      "params": {
        "name": "FeedbackModule/ShareFeedback.page.xml",
        "location": "modal",
        "resizable": true
      }
    },
    {
      "type": "return",
      "label": "4a3f62e9-8339-44b4-8f9f-6977fd199c3b",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "switch",
      "label": "f26ecffc-6169-4a81-9af8-da2129688f2e",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "base64FromWidget"
          },
          {
            "type": "literal",
            "value": null
          }
        ]
      },
      "targets": {
        "true": "c860784f-a69e-4d9c-803a-450b8248c940",
        "false": "2d9cf3e5-111a-4805-bd72-95fc5d7fb4f6"
      }
    },
    {
      "type": "return",
      "label": "2d9cf3e5-111a-4805-bd72-95fc5d7fb4f6",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "changeObject",
      "label": "c860784f-a69e-4d9c-803a-450b8248c940",
      "inputVar": "Feedback",
      "member": "ImageB64",
      "value": {
        "type": "variable",
        "variable": "base64FromWidget"
      }
    },
    {
      "type": "commitObjects",
      "operationId": "gAKaokF8X1myZz/XcSt0MA",
      "inputVar": "Feedback"
    },
    {
      "type": "jump",
      "label": "0df07996-22f9-4565-946f-b70b6769e3b8",
      "target": "b804e77c-0db7-4bdf-8b87-a37150d8e8cb"
    }
  ]
};
