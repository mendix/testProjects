import { addEnumerations, t } from "mendix";

export const GetBadge = {
  "name": "BootstrapBadge.GetBadge",
  "useListParameterByReference": true,
  "instructions": [
    {
      "type": "createObject",
      "label": "4579fa5e-35a1-42e3-b429-50f034e1a118",
      "operationId": "/V+Io2zgzF+HI3B36dsxPw",
      "objectType": "BootstrapBadge.Badge",
      "outputVar": "NewBadge"
    },
    {
      "type": "changeObject",
      "inputVar": "NewBadge",
      "member": "DefaultValue",
      "value": {
        "type": "literal",
        "value": "NewSuccess"
      }
    },
    {
      "type": "changeObject",
      "inputVar": "NewBadge",
      "member": "DataString",
      "value": {
        "type": "literal",
        "value": "NewSuccess"
      }
    },
    {
      "type": "return",
      "label": "9e1b0789-b9ee-4ff9-b64d-847d33c0b90f",
      "result": {
        "type": "variable",
        "variable": "NewBadge"
      },
      "resultKind": "object"
    }
  ]
};
