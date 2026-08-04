import { addEnumerations, t } from "mendix";

export const SUB_GetOrCreateFeedback = {
  "name": "FeedbackModule.SUB_GetOrCreateFeedback",
  "useListParameterByReference": true,
  "instructions": [
    {
      "type": "tryCatch",
      "label": "dc9c235a-aa50-4c90-9338-b7a4ff02c470",
      "catchTarget": "06d2884b-1f9c-4f5a-862a-af0dc233d542",
      "body": [
        {
          "type": "javaScriptActionCall",
          "action": () => require("Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/javascriptsource/feedbackmodule/actions/GetStorageItemObject").GetStorageItemObject,
          "outputVar": "LocalFeedback",
          "parameters": [
            {
              "kind": "primitive",
              "value": {
                "type": "constant",
                "name": "FeedbackModule.LocalStorageKey"
              }
            },
            {
              "kind": "primitive",
              "value": {
                "type": "literal",
                "value": "FeedbackModule.Feedback"
              }
            }
          ]
        },
        {
          "type": "return",
          "result": {
            "type": "literal",
            "value": true
          },
          "resultKind": "primitive"
        }
      ]
    },
    {
      "type": "switch",
      "label": "db11ae6a-8d81-4ef4-9bce-12d9c0837d45",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "LocalFeedback"
          },
          {
            "type": "literal",
            "value": null
          }
        ]
      },
      "targets": {
        "false": "adc76be6-a4ff-4292-9347-ea3b4e52b967",
        "true": "560709b9-31ed-4652-b198-8f629bb4e055"
      }
    },
    {
      "type": "return",
      "label": "560709b9-31ed-4652-b198-8f629bb4e055",
      "result": {
        "type": "variable",
        "variable": "LocalFeedback"
      },
      "resultKind": "object"
    },
    {
      "type": "jump",
      "label": "adc76be6-a4ff-4292-9347-ea3b4e52b967",
      "target": "d62c8dc8-eaaf-4739-bd66-2d6c0c3040b6"
    },
    {
      "type": "createObject",
      "label": "d62c8dc8-eaaf-4739-bd66-2d6c0c3040b6",
      "objectType": "FeedbackModule.Feedback",
      "outputVar": "NewFeedback"
    },
    {
      "type": "return",
      "label": "65f6bcd0-0c84-47f2-b55b-2b6b870aa000",
      "result": {
        "type": "variable",
        "variable": "NewFeedback"
      },
      "resultKind": "object"
    },
    {
      "type": "jump",
      "label": "06d2884b-1f9c-4f5a-862a-af0dc233d542",
      "target": "adc76be6-a4ff-4292-9347-ea3b4e52b967"
    },
    {
      "type": "jump",
      "label": "adc76be6-a4ff-4292-9347-ea3b4e52b967",
      "target": "d62c8dc8-eaaf-4739-bd66-2d6c0c3040b6"
    }
  ]
};
