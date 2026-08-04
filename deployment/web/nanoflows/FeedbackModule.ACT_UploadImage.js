import { addEnumerations, t } from "mendix";

export const ACT_UploadImage = {
  "name": "FeedbackModule.ACT_UploadImage",
  "useListParameterByReference": true,
  "instructions": [
    {
      "type": "setVariable",
      "label": "de40f442-8783-4764-bed1-441df2060020",
      "value": {
        "type": "literal",
        "value": ".gif,.png,.jpg,.jpeg"
      },
      "outputVar": "mimeTypes",
      "outputKind": "primitive"
    },
    {
      "type": "setVariable",
      "label": "6319ebff-abdd-4406-ad9b-0d4a130b7f3f",
      "value": {
        "type": "literalNumeric",
        "value": "5"
      },
      "outputVar": "fileUploadSize",
      "outputKind": "primitive"
    },
    {
      "type": "javaScriptActionCall",
      "label": "9e9fdc1e-e5c9-4022-a738-10ae66824ee3",
      "action": () => require("Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/javascriptsource/feedbackmodule/actions/JS_UploadAndConvertToFileBlobURL").JS_UploadAndConvertToFileBlobURL,
      "outputVar": "fileBlobURL",
      "parameters": [
        {
          "kind": "primitive",
          "value": {
            "type": "variable",
            "variable": "mimeTypes"
          }
        },
        {
          "kind": "primitive",
          "value": {
            "type": "variable",
            "variable": "fileUploadSize"
          }
        }
      ]
    },
    {
      "type": "switch",
      "label": "88a00e8f-dbe3-4bd9-9003-eb53dd7fea15",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "fileBlobURL"
          },
          {
            "type": "literal",
            "value": "uploadCancelled"
          }
        ]
      },
      "targets": {
        "true": "febb0528-7548-4a72-a8fe-6b553ddfb200",
        "false": "bf5f52af-5a65-46a0-891c-de0a9861abea"
      }
    },
    {
      "type": "return",
      "label": "bf5f52af-5a65-46a0-891c-de0a9861abea",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "switch",
      "label": "febb0528-7548-4a72-a8fe-6b553ddfb200",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "fileBlobURL"
          },
          {
            "type": "literal",
            "value": null
          }
        ]
      },
      "targets": {
        "false": "600698ba-fc0e-4b12-9ba3-520eed31ecdc",
        "true": "7649407c-ee8e-4dac-8788-88ff9256914c"
      }
    },
    {
      "type": "switch",
      "label": "7649407c-ee8e-4dac-8788-88ff9256914c",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "fileBlobURL"
          },
          {
            "type": "literal",
            "value": "fileSizeNotAccepted"
          }
        ]
      },
      "targets": {
        "true": "67f1cf59-4d0f-44f5-9f91-6e95d288107a",
        "false": "0d0d1fed-90e4-4c94-a53e-2cd80c0b25a6"
      }
    },
    {
      "type": "showMessage",
      "label": "0d0d1fed-90e4-4c94-a53e-2cd80c0b25a6",
      "messageType": "error",
      "message": t([
        {
          "type": "literal",
          "value": "Maximum image size allowed is 5MB."
        }
      ]),
      "blocking": true
    },
    {
      "type": "return",
      "label": "4b8c1cb7-6d7b-48f7-a8cd-28cdb4d50dcf",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "switch",
      "label": "67f1cf59-4d0f-44f5-9f91-6e95d288107a",
      "condition": {
        "type": "function",
        "name": "!=",
        "parameters": [
          {
            "type": "variable",
            "variable": "fileBlobURL"
          },
          {
            "type": "literal",
            "value": "fileTypeNotAccepted"
          }
        ]
      },
      "targets": {
        "false": "f44cea16-744e-4f24-bbfc-69eb9bc856b1",
        "true": "b8ecd522-f001-4adf-aee4-ccccad7c0c28"
      }
    },
    {
      "type": "closeForm",
      "label": "b8ecd522-f001-4adf-aee4-ccccad7c0c28"
    },
    {
      "type": "javaScriptActionCall",
      "label": "ad2ffb96-b2c5-4e86-9567-9172a10f6adc",
      "action": () => require("Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/javascriptsource/feedbackmodule/actions/JS_ToggleFeedbackAnnotateWidget").JS_ToggleFeedbackAnnotateWidget,
      "outputVar": "base64ImageFromWidget",
      "parameters": [
        {
          "kind": "primitive",
          "value": {
            "type": "variable",
            "variable": "fileBlobURL"
          }
        }
      ]
    },
    {
      "type": "changeObject",
      "label": "67f867ac-1ccb-48ec-b0ea-1e0b1ccdfb60",
      "inputVar": "Feedback",
      "member": "ImageB64",
      "value": {
        "type": "variable",
        "variable": "base64ImageFromWidget"
      }
    },
    {
      "type": "commitObjects",
      "operationId": "t8JUbf6MTVikfMDDBUKmZQ",
      "inputVar": "Feedback"
    },
    {
      "type": "openForm",
      "label": "6d371a4a-8457-47a8-bf7e-9a86a51998ec",
      "path": "FeedbackModule/ShareFeedback.page.xml",
      "params": {
        "name": "FeedbackModule/ShareFeedback.page.xml",
        "location": "modal",
        "resizable": true
      }
    },
    {
      "type": "javaScriptActionCall",
      "label": "42494292-910d-4185-be32-97304d5dad23",
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
      "type": "javaScriptActionCall",
      "label": "5df137ae-f649-4a26-93bc-2ed2bc1dd772",
      "action": () => require("Z:/Documents/Projects/web-widgets/packages/pluggableWidgets/gallery-web/tests/testProject/javascriptsource/feedbackmodule/actions/JS_RevokeUploadedFileFromMemory").JS_RevokeUploadedFileFromMemory,
      "parameters": [
        {
          "kind": "primitive",
          "value": {
            "type": "variable",
            "variable": "fileBlobURL"
          }
        }
      ]
    },
    {
      "type": "return",
      "label": "de106fef-f017-4b1d-baec-376147661744",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "showMessage",
      "label": "f44cea16-744e-4f24-bbfc-69eb9bc856b1",
      "messageType": "error",
      "message": t([
        {
          "type": "literal",
          "value": "Only images with format of .gif .jpg .jpeg .png are allowed"
        }
      ]),
      "blocking": true
    },
    {
      "type": "return",
      "label": "7bc8d642-ada4-48b9-8086-ca29638f8c5c",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    },
    {
      "type": "showMessage",
      "label": "600698ba-fc0e-4b12-9ba3-520eed31ecdc",
      "messageType": "error",
      "message": t([
        {
          "type": "literal",
          "value": "Upload failed, please try again."
        }
      ]),
      "blocking": true
    },
    {
      "type": "return",
      "label": "1f54917d-9684-4bbd-93b0-649e8d93e999",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    }
  ]
};
