import { addEnumerations, t } from "mendix";

export const IVK_Nanoflow = {
  "name": "BootstrapBadge.IVK_Nanoflow",
  "useListParameterByReference": true,
  "instructions": [
    {
      "type": "openForm",
      "label": "8d75f9f9-596b-4f39-9434-d5e11b38a58c",
      "path": "BootstrapBadge/Badge_NewEdit_Nanoflow.page.xml",
      "title": t([
        {
          "type": "literal",
          "value": "Nanoflow executed successfully !!"
        },
        {
          "type": "literal",
          "value": "Nanoflow executed successfully !!"
        }
      ]),
      "params": {
        "name": "BootstrapBadge/Badge_NewEdit_Nanoflow.page.xml",
        "title": t([
          {
            "type": "literal",
            "value": "Nanoflow executed successfully !!"
          },
          {
            "type": "literal",
            "value": "Nanoflow executed successfully !!"
          }
        ]),
        "location": "popup",
        "resizable": true
      },
      "inputArgs": {
        "$Badge": {
          "type": "variable",
          "variable": "Badge"
        }
      }
    },
    {
      "type": "return",
      "label": "a0d4d2f4-f7cf-4fa2-bfb6-e269a18096b9",
      "result": {
        "type": "literal",
        "value": null
      },
      "resultKind": "primitive"
    }
  ]
};
