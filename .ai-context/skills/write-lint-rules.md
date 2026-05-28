# Writing Custom Starlark Lint Rules

Custom lint rules are written in Starlark (a Python-like language) and placed in `.claude/lint-rules/` as `.star` files. They run alongside the built-in rules when `mxcli lint -p app.mpr` is executed.

## Rule File Structure

Every `.star` file must define metadata constants and a `check()` function:

```python
RULE_ID = "CUSTOM001"          # unique identifier
RULE_NAME = "MyRule"           # Short display name
description = "What it checks" # One-line description
CATEGORY = "security"          # Category: naming, quality, design, security, etc.
SEVERITY = "warning"           # hint, info, warning, error

def check():
    violations = []
    # ... iterate data, find issues, append violations ...
    return violations
```

## Available Query Functions

| Function | Returns | Description |
|----------|---------|-------------|
| `entities()` | list of entity | All non-system entities |
| `microflows()` | list of microflow | All non-system microflows |
| `pages()` | list of page | All non-system pages |
| `enumerations()` | list of enumeration | All non-system enumerations |
| `widgets()` | list of widget | All non-system widgets |
| `snippets()` | list of snippet | All non-system snippets |
| `attributes_for(entity_qualified_name)` | list of attribute | Attributes for a specific entity |
| `activities_for(microflow_qualified_name)` | list of activity | Activities for a microflow (requires FULL catalog) |
| `permissions()` | list of permission | All permissions across all element types |
| `permissions_for(entity_qualified_name)` | list of permission | Access rules for a specific entity |
| `refs_to(target_name)` | list of reference | Cross-references to a target |
| `user_roles()` | list of user_role | User roles from project security |
| `module_roles()` | list of module_role | All module roles (deduplicated from role mappings) |
| `role_mappings()` | list of role_mapping | User role to module role assignments |
| `project_security()` | project_security or None | Project-level security settings (requires MPR reader) |

## Object Properties

### entity
| Property | Type | Example |
|----------|------|---------|
| `id` | string | Document UUID |
| `name` | string | `"Customer"` |
| `qualified_name` | string | `"Sales.Customer"` |
| `module_name` | string | `"Sales"` |
| `folder` | string | `"DomainModel"` — folder path within module |
| `entity_type` | string | `"persistent"`, `"NonPersistent"`, `"view"` |
| `description` | string | Documentation text |
| `generalization` | string | Parent entity qualified name |
| `attribute_count` | int | Number of attributes |
| `access_rule_count` | int | Number of access rules |
| `validation_rule_count` | int | Number of validation rules |
| `has_event_handlers` | bool | True if entity has event handlers |
| `is_external` | bool | True if entity is from an external service |

### microflow
| Property | Type | Example |
|----------|------|---------|
| `id` | string | Document UUID |
| `name` | string | `"ACT_Customer_Create"` |
| `qualified_name` | string | `"Sales.ACT_Customer_Create"` |
| `module_name` | string | `"Sales"` |
| `folder` | string | `"microflows/Customer"` — folder path within module |
| `microflow_type` | string | `"microflow"` or `"nanoflow"` |
| `description` | string | Documentation text |
| `return_type` | string | Return type |
| `parameter_count` | int | Number of parameters |
| `activity_count` | int | Number of activities |
| `complexity` | int | McCabe cyclomatic complexity |

### page
| Property | Type | Example |
|----------|------|---------|
| `id` | string | Document UUID |
| `name` | string | `"Customer_Overview"` |
| `qualified_name` | string | `"Sales.Customer_Overview"` |
| `module_name` | string | `"Sales"` |
| `folder` | string | `"pages/Customer"` — folder path within module |
| `title` | string | Page title |
| `url` | string | Page URL |
| `description` | string | Documentation text |
| `widget_count` | int | Number of widgets |

### enumeration
| Property | Type | Example |
|----------|------|---------|
| `id` | string | Document UUID |
| `name` | string | `"OrderStatus"` |
| `qualified_name` | string | `"Sales.OrderStatus"` |
| `module_name` | string | `"Sales"` |
| `folder` | string | `"enumerations"` — folder path within module |
| `description` | string | Documentation text |
| `value_count` | int | Number of enum values |

### widget
| Property | Type | Example |
|----------|------|---------|
| `id` | string | Widget UUID |
| `name` | string | Widget name |
| `widget_type` | string | `"dataview"`, `"listview"`, etc. |
| `container_id` | string | Container UUID |
| `container_qualified_name` | string | `"Sales.Customer_Overview"` |
| `container_type` | string | `"page"` or `"snippet"` |
| `module_name` | string | `"Sales"` |
| `entity_ref` | string | Referenced entity qualified name |
| `attribute_ref` | string | Referenced attribute path |

### snippet
| Property | Type | Example |
|----------|------|---------|
| `id` | string | Document UUID |
| `name` | string | `"SNIPPET_CustomerCard"` |
| `qualified_name` | string | `"Sales.SNIPPET_CustomerCard"` |
| `module_name` | string | `"Sales"` |
| `folder` | string | `"snippets"` — folder path within module |
| `widget_count` | int | Number of widgets |

### attribute
| Property | Type | Example |
|----------|------|---------|
| `id` | string | Attribute UUID |
| `name` | string | `"Name"` |
| `entity_id` | string | Parent entity UUID |
| `entity_qualified_name` | string | `"Sales.Customer"` |
| `module_name` | string | `"Sales"` |
| `data_type` | string | `"string"`, `"integer"`, `"datetime"`, etc. |
| `length` | int | Field length (for strings) |
| `is_unique` | bool | Has unique constraint |
| `is_required` | bool | Is required |
| `default_value` | string | Default value |
| `is_calculated` | bool | True if attribute is calculated (virtual) |
| `description` | string | Documentation text |

### activity
| Property | Type | Example |
|----------|------|---------|
| `id` | string | Activity UUID |
| `name` | string | Activity name |
| `caption` | string | Activity caption |
| `activity_type` | string | `"ActionActivity"`, `"ExclusiveSplit"`, `"LoopedActivity"`, etc. |
| `action_type` | string | `"CreateChangeAction"`, `"CommitAction"`, `"ShowFormAction"`, etc. |
| `microflow_id` | string | Parent microflow UUID |
| `microflow_qualified_name` | string | `"Sales.ACT_Customer_Create"` |
| `module_name` | string | `"Sales"` |
| `entity_ref` | string | Referenced entity qualified name |

### permission

Returned by `permissions()` (all types) or `permissions_for()` (entity-specific).

| Property | Type | Example |
|----------|------|---------|
| `module_role_name` | string | `"Admin"` |
| `element_type` | string | `"entity"`, `"microflow"`, `"page"`, `"ODATA_SERVICE"` (from `permissions()` only) |
| `element_name` | string | `"Sales.Customer"` |
| `module_name` | string | `"Sales"` |
| `entity_name` | string | `"Sales.Customer"` (from `permissions_for()` only) |
| `access_type` | string | `"create"`, `"read"`, `"write"`, `"delete"`, `"execute"`, `"view"`, `"access"`, `"MEMBER_READ"`, `"MEMBER_WRITE"` |
| `member_name` | string | Attribute name (for MEMBER_READ/MEMBER_WRITE) |
| `xpath_constraint` | string | XPath constraint or empty |
| `is_constrained` | bool | True if XPath constraint is set |

### user_role
| Property | Type | Example |
|----------|------|---------|
| `name` | string | `"Administrator"` |
| `is_anonymous` | bool | True if this is the anonymous/guest role |
| `module_roles` | list of string | `["Sales.Admin", "HR.Viewer"]` |

### module_role
| Property | Type | Example |
|----------|------|---------|
| `name` | string | `"Sales.Admin"` — qualified module role name |
| `module_name` | string | `"Sales"` |
| `description` | string | Module role description |

### role_mapping
| Property | Type | Example |
|----------|------|---------|
| `user_role_name` | string | `"Administrator"` |
| `module_role_name` | string | `"Sales.Admin"` |
| `module_name` | string | `"Sales"` |

### reference
| Property | Type | Example |
|----------|------|---------|
| `source_type` | string | `"microflow"`, `"page"`, etc. |
| `source_id` | string | Source UUID |
| `source_name` | string | `"Sales.ACT_Customer_Create"` |
| `target_type` | string | `"entity"`, `"microflow"`, etc. |
| `target_id` | string | Target UUID |
| `target_name` | string | `"Sales.Customer"` |
| `ref_kind` | string | Reference kind |
| `module_name` | string | Source module |

### project_security

Returned by `project_security()`. Returns `none` if no MPR reader is available.

| Property | Type | Description |
|----------|------|-------------|
| `security_level` | string | `"CheckNothing"` (Off), `"CheckFormsAndMicroflows"` (Prototype), `"CheckEverything"` (Production) |
| `enable_demo_users` | bool | Whether demo users are enabled |
| `enable_guest_access` | bool | Whether anonymous/guest access is enabled |
| `check_security` | bool | Whether security checking is active |
| `strict_mode` | bool | Strict security mode |
| `password_policy` | struct | Nested password policy settings |

#### password_policy (nested in project_security)
| Property | Type | Description |
|----------|------|-------------|
| `min_length` | int | Minimum password length |
| `require_digit` | bool | Must contain a digit |
| `require_mixed_case` | bool | Must contain upper and lower case |
| `require_symbol` | bool | Must contain a symbol |

## Helper Functions

| Function | Description |
|----------|-------------|
| `violation(message, location?, suggestion?)` | Create a violation to return |
| `location(module, document_type, document_name, document_id?)` | Create a location for a violation |
| `is_pascal_case(s)` | Returns True if string is PascalCase |
| `is_camel_case(s)` | Returns True if string is camelCase |
| `matches(s, pattern)` | Returns True if string matches regex |

## Common Patterns

### Pattern 1: Iterate entities and check a property

```python
RULE_ID = "SEC001"
RULE_NAME = "NoEntityAccessRules"
description = "persistent entities should have access rules"
CATEGORY = "security"
SEVERITY = "warning"

def check():
    violations = []
    for e in entities():
        if e.entity_type == "persistent" and not e.is_external and e.access_rule_count == 0:
            violations.append(violation(
                message="persistent entity '{}' has no access rules".format(e.qualified_name),
                location=location(module=e.module_name, document_type="entity", document_name=e.name),
                suggestion="grant <role> on {} (read *)".format(e.qualified_name),
            ))
    return violations
```

### Pattern 2: Check project-level security settings

```python
RULE_ID = "SEC002"
RULE_NAME = "WeakPasswordPolicy"
description = "password policy should require at least 8 characters"
CATEGORY = "security"
SEVERITY = "warning"

def check():
    sec = project_security()
    if sec == none:
        return []
    if sec.password_policy.min_length < 8:
        return [violation(
            message="password minimum length is {} (recommended: 8+)".format(sec.password_policy.min_length),
            location=location(module="", document_type="security", document_name="ProjectSecurity"),
            suggestion="alter project security password POLICY minimum length 8",
        )]
    return []
```

### Pattern 3: Check cross-references

```python
RULE_ID = "CUSTOM003"
RULE_NAME = "UnreferencedEntity"
description = "entities should be referenced by at least one microflow or page"
CATEGORY = "quality"
SEVERITY = "info"

def check():
    violations = []
    for e in entities():
        refs = refs_to(e.qualified_name)
        if len(refs) == 0:
            violations.append(violation(
                message="entity '{}' is not referenced anywhere".format(e.qualified_name),
                location=location(module=e.module_name, document_type="entity", document_name=e.name),
            ))
    return violations
```

### Pattern 4: Check attributes of entities

```python
RULE_ID = "CUSTOM004"
RULE_NAME = "RequiredStringLength"
description = "string attributes should have a length limit"
CATEGORY = "design"
SEVERITY = "warning"

def check():
    violations = []
    for e in entities():
        for attr in attributes_for(e.qualified_name):
            if attr.data_type == "string" and attr.length == 0:
                violations.append(violation(
                    message="string attribute '{}.{}' has unlimited length".format(e.name, attr.name),
                    location=location(module=e.module_name, document_type="entity", document_name=e.name),
                ))
    return violations
```

## Validation

Test your rule by running the linter:

```bash
mxcli lint -p app.mpr --list-rules   # Verify rule is loaded
mxcli lint -p app.mpr                 # run all rules including yours
```

If a `.star` file has syntax errors, a warning is printed and the rule is skipped.
