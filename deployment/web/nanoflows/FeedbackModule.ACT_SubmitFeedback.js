import { addEnumerations, t } from "mendix";

export const ACT_SubmitFeedback = {
  "name": "FeedbackModule.ACT_SubmitFeedback",
  "useListParameterByReference": true,
  "instructions": [
    {
      "type": "microflowCall",
      "label": "ffc074f2-8c2a-465a-ad78-e2d90b0242a2",
      "operationId": "agGVqwTqgFGUzJx2yIe2Hw",
      "parameters": [
        {
          "name": "Feedback",
          "value": {
            "type": "variable",
            "variable": "Feedback"
          },
          "kind": "object"
        }
      ],
      "outputVar": "isValid"
    },
    {
      "type": "switch",
      "label": "a4e6d817-dad7-4c91-873b-9980a994ffd9",
      "condition": {
        "type": "variable",
        "variable": "isValid"
      },
      "targets": {
        "true": "0e9e450b-6797-43bc-8246-43f7e65237b0",
        "false": "d37d4766-fe61-487f-98a8-dafe9fc9e28e"
      }
    },
    {
      "type": "return",
      "label": "d37d4766-fe61-487f-98a8-dafe9fc9e28e",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "microflowCall",
      "label": "0e9e450b-6797-43bc-8246-43f7e65237b0",
      "operationId": "s446IP9/8V2PPb2xuGp/bA",
      "parameters": [
        {
          "name": "Feedback",
          "value": {
            "type": "variable",
            "variable": "Feedback"
          },
          "kind": "object"
        }
      ],
      "outputVar": "ResponseHelper"
    },
    {
      "type": "switch",
      "label": "fe8d4e28-2f9e-4bd3-af12-47cb203a7c30",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "ResponseHelper"
          },
          {
            "type": "literal",
            "value": null
          }
        ]
      },
      "targets": {
        "true": "849df2d5-8d64-46cf-8ab9-dadf7e518db9",
        "false": "314f0719-5b93-47bc-be5e-f4e5ac9bddee"
      }
    },
    {
      "type": "openForm",
      "label": "314f0719-5b93-47bc-be5e-f4e5ac9bddee",
      "path": "FeedbackModule/PopupFailure.page.xml",
      "params": {
        "name": "FeedbackModule/PopupFailure.page.xml",
        "location": "modal",
        "resizable": false
      },
      "numberOfPagesToClose": {
        "type": "literalNumeric",
        "value": "1"
      }
    },
    {
      "type": "return",
      "label": "4d6b07ac-f4c9-496f-9196-213a80ee7eb0",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "openForm",
      "label": "849df2d5-8d64-46cf-8ab9-dadf7e518db9",
      "path": "FeedbackModule/PopupSuccess.page.xml",
      "params": {
        "name": "FeedbackModule/PopupSuccess.page.xml",
        "location": "modal",
        "resizable": false
      },
      "inputArgs": {
        "$Response": {
          "type": "variable",
          "variable": "ResponseHelper"
        }
      },
      "numberOfPagesToClose": {
        "type": "literalNumeric",
        "value": "1"
      }
    },
    {
      "type": "changeObject",
      "label": "47feb342-1941-4e09-8901-7c1f7c98360b",
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
      "member": "SubmitterUUID",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "changeObject",
      "inputVar": "Feedback",
      "member": "SubmitterDisplayName",
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
      "type": "changeObject",
      "inputVar": "Feedback",
      "member": "ActiveUserRoles",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "changeObject",
      "inputVar": "Feedback",
      "member": "PageName",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "changeObject",
      "inputVar": "Feedback",
      "member": "Browser",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "changeObject",
      "inputVar": "Feedback",
      "member": "EnvironmentURL",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "changeObject",
      "inputVar": "Feedback",
      "member": "ScreenshotName",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "changeObject",
      "inputVar": "Feedback",
      "member": "Priority",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "changeObject",
      "inputVar": "Feedback",
      "member": "ScreenWidth",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "changeObject",
      "inputVar": "Feedback",
      "member": "ScreenHeight",
      "value": {
        "type": "literal",
        "value": null
      }
    },
    {
      "type": "javaScriptActionCall",
      "label": "3157a21e-b55e-4fda-859b-381370e26d0b",
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
      "label": "c900370a-376a-4d33-9f26-9897ea87cec1",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    }
  ]
};
