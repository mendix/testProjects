import { addEnumerations, t } from "mendix";
import { SUB_GetOrCreateFeedback } from "./FeedbackModule.SUB_GetOrCreateFeedback.js";

export const DS_FeedbackForm = {
  "name": "FeedbackModule.DS_FeedbackForm",
  "useListParameterByReference": true,
  "instructions": [
    {
      "type": "nanoflowCall",
      "label": "50a3c144-036f-4602-ba1e-6bb43cf963ec",
      "flow": () => SUB_GetOrCreateFeedback,
      "parameters": [],
      "outputVar": "Feedback"
    },
    {
      "type": "microflowCall",
      "label": "c86e8255-b103-4912-acd1-7f55784ff9aa",
      "operationId": "ooZTD5Xfvl24VMWsfTJKLQ",
      "parameters": [
        {
          "name": "Feedback",
          "value": {
            "type": "variable",
            "variable": "Feedback"
          },
          "kind": "object"
        }
      ]
    },
    {
      "type": "changeObject",
      "label": "6c2b2614-cc99-4969-aebe-3563eb9df60d",
      "inputVar": "Feedback",
      "member": "_showEmail",
      "value": {
        "type": "conditional",
        "condition": {
          "type": "conditional",
          "condition": {
            "type": "function",
            "name": "!=",
            "parameters": [
              {
                "type": "variable",
                "variable": "Feedback",
                "path": "SubmitterEmail"
              },
              {
                "type": "literal",
                "value": null
              }
            ]
          },
          "then": {
            "type": "function",
            "name": "!=",
            "parameters": [
              {
                "type": "variable",
                "variable": "Feedback",
                "path": "SubmitterEmail"
              },
              {
                "type": "literal",
                "value": ""
              }
            ]
          },
          "else": {
            "type": "literal",
            "value": false
          }
        },
        "then": {
          "type": "literal",
          "value": false
        },
        "else": {
          "type": "literal",
          "value": true
        }
      }
    },
    {
      "type": "javaScriptActionCall",
      "label": "c52aaeae-071b-40d2-bdc9-7d622168bc36",
      "action": () => require("Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/javascriptsource/feedbackmodule/actions/JS_PopulateFeedbackMetadata").JS_PopulateFeedbackMetadata,
      "parameters": [
        {
          "kind": "object",
          "value": {
            "type": "variable",
            "variable": "Feedback"
          }
        }
      ]
    },
    {
      "type": "javaScriptActionCall",
      "label": "609e1060-30d4-45d1-b7eb-01c6d667b236",
      "action": () => require("Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/javascriptsource/feedbackmodule/actions/SetStorageItemObject").SetStorageItemObject,
      "parameters": [
        {
          "kind": "primitive",
          "value": {
            "type": "constant",
            "name": "FeedbackModule.LocalStorageKey"
          }
        },
        {
          "kind": "object",
          "value": {
            "type": "variable",
            "variable": "Feedback"
          }
        }
      ]
    },
    {
      "type": "return",
      "label": "e634948c-a5ef-4ab7-bc42-e0141769ba90",
      "result": {
        "type": "variable",
        "variable": "Feedback"
      },
      "resultKind": "object"
    }
  ]
};
