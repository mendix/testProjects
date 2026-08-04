import { addEnumerations, t } from "mendix";

export const ACT_OnClick = {
  "name": "MyFirstModule.ACT_OnClick",
  "useListParameterByReference": true,
  "instructions": [
    {
      "type": "showMessage",
      "label": "1044ce3a-5120-4179-9a30-da7676beb043",
      "messageType": "info",
      "message": t([
        {
          "type": "function",
          "name": "+",
          "parameters": [
            {
              "type": "function",
              "name": "+",
              "parameters": [
                {
                  "type": "literal",
                  "value": "You've clicked at "
                },
                {
                  "type": "variable",
                  "variable": "GalleryItem",
                  "path": "FullName"
                }
              ]
            },
            {
              "type": "literal",
              "value": "'s face."
            }
          ]
        }
      ]),
      "blocking": true
    },
    {
      "type": "return",
      "label": "d1ea7031-ef84-4a18-9602-10fdfde93bf6",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    }
  ]
};
