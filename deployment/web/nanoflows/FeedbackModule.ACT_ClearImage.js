import { addEnumerations, t } from "mendix";

export const ACT_ClearImage = {
  "name": "FeedbackModule.ACT_ClearImage",
  "useListParameterByReference": true,
  "instructions": [
    {
      "type": "changeObject",
      "label": "753d5b76-70b5-467d-933c-357f3da29e12",
      "inputVar": "Feedback",
      "member": "ImageB64",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "javaScriptActionCall",
      "label": "62298e5f-25f9-4fda-8edd-ec2226616fe1",
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
      "label": "767efc29-dfd4-4464-827a-31058c9293a1",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    }
  ]
};
