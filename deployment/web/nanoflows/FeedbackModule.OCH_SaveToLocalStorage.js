import { addEnumerations, t } from "mendix";

export const OCH_SaveToLocalStorage = {
  "name": "FeedbackModule.OCH_SaveToLocalStorage",
  "useListParameterByReference": true,
  "instructions": [
    {
      "type": "javaScriptActionCall",
      "label": "8fba27aa-41f5-4783-9451-1992db36fe08",
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
      "label": "1e3ed1a7-241b-406a-8e4d-442d9e00d349",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    }
  ]
};
