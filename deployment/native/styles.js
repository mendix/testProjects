import * as style0 from "/source/tests/testProject/themesource/atlas_core/native/main";
import * as style1 from "/source/tests/testProject/themesource/myfirstmodule/native/main";
import * as style2 from "/source/tests/testProject/theme/native/main";

import { flatten } from "mendix/native";

module.exports = flatten([style0, style1, style2]);
