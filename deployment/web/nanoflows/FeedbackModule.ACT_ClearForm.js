import { addEnumerations, t } from "mendix";

export const ACT_ClearForm = {
  "name": "FeedbackModule.ACT_ClearForm",
  "useListParameterByReference": true,
  "instructions": [
    {
      "type": "changeObject",
      "label": "11d4ed3a-dc82-47c3-a388-6ac8d20de32b",
      "inputVar": "Feedback",
      "member": "Subject",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "changeObject",
      "inputVar": "Feedback",
      "member": "Description",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "changeObject",
      "inputVar": "Feedback",
      "member": "SubmitterEmail",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "changeObject",
      "inputVar": "Feedback",
      "member": "ImageB64",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "javaScriptActionCall",
      "label": "4f119dfa-a1d1-40c1-873d-4b74cb211784",
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
      "label": "09cde8de-d12c-421e-847e-f9d785b4f7c0",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    }
  ]
};
