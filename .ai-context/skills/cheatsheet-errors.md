# MDL Common Errors Cheatsheet

Quick fixes for common MDL syntax errors.

## Variable Errors

### "Variable 'X' is not declared"

**Problem**: Using SET on a variable that wasn't declared.

```mdl
-- WRONG
if $value > 10 then
  set $IsValid = false;  -- ERROR: $IsValid not declared
end if;
```

**Fix**: Add DECLARE before SET.

```mdl
-- CORRECT
declare $IsValid boolean = true;
if $value > 10 then
  set $IsValid = false;
end if;
```

### "Selected type is not allowed" (CE0053)

**Problem**: Wrong syntax for entity type declaration.

```mdl
-- WRONG: Missing AS keyword
declare $Product Module.Product = empty;
```

**Fix**: Use AS keyword for entity types.

```mdl
-- CORRECT
declare $Product as Module.Product;
```

## Expression Errors

### "Error in expression" (CE0117)

**Problem 1**: Using unqualified association name in XPath.

```mdl
-- WRONG: Missing module qualification
set $Name = $Order/Customer/Name;
```

**Fix**: Use fully qualified association name.

```mdl
-- CORRECT: Module.AssociationName
set $Name = $Order/Shop.Order_Customer/Name;
```

**Problem 2**: Using `not` without parentheses — Mendix requires `not(expr)` form.

```mdl
-- WRONG: bare not rejected by Studio Pro
if not $IsActive then ...
if not contains($Name, 'demo') then ...
```

**Fix**: Always wrap the negated expression in parentheses.

```mdl
-- CORRECT: not(expr)
if not($IsActive) then ...
if not(contains($Name, 'demo')) then ...
```

> mxcli enforces this at parse time — `not expr` without parens is a syntax error.

### "Type mismatch" in enum comparison

**Problem**: Comparing enumeration with string literal.

```mdl
-- WRONG: String literal instead of enum value
if $task/status = 'Completed' then
```

**Fix**: Use qualified enumeration value.

```mdl
-- CORRECT: Module.Enumeration.Value
if $task/status = Module.TaskStatus.Completed then
```

## Control Flow Errors

### "Activity cannot be the last object" (CE0105)

**Problem**: Missing RETURN statement.

```mdl
-- WRONG: No RETURN
begin
  declare $Result boolean = true;
  log info 'Done';
  -- Missing RETURN!
end;
```

**Fix**: Add RETURN statement.

```mdl
-- CORRECT
begin
  declare $Result boolean = true;
  log info 'Done';
  return $Result;
end;
```

### "Action activity is unreachable" (CE0104)

**Problem**: Code after RETURN statement.

```mdl
-- WRONG: Code after RETURN
if $value < 0 then
  return false;
  log info 'Negative';  -- Unreachable!
end if;
```

**Fix**: Move code before RETURN.

```mdl
-- CORRECT
if $value < 0 then
  log info 'Negative';
  return false;
end if;
```

## Syntax Errors

### Division operator

```mdl
-- WRONG: Using / for division
set $average = $Total / $count;

-- CORRECT: Use 'div' keyword
set $average = $Total div $count;
```

### Missing END IF / END LOOP

```mdl
-- WRONG: Missing END IF
if $value > 0 then
  set $Positive = true;
-- Missing END IF!

-- CORRECT
if $value > 0 then
  set $Positive = true;
end if;
```

### Missing semicolons

```mdl
-- WRONG: Missing semicolon
declare $count integer = 0
set $count = 1

-- CORRECT
declare $count integer = 0;
set $count = 1;
```

## Reference Errors

### "Module not found"

**Problem**: Using non-existent module name.

**Fix**: Check module exists with `show modules`.

### "Entity not found"

**Problem**: Using non-existent entity name.

**Fix**:
1. Check entity exists: `show entities in ModuleName`
2. Use fully qualified name: `Module.EntityName`

### "Microflow not found"

**Problem**: Calling non-existent microflow.

**Fix**:
1. Check microflow exists: `show microflows in ModuleName`
2. Use fully qualified name: `Module.MicroflowName`

## Studio Pro Error Code Reference

| Code | Message | Common Cause |
|------|---------|--------------|
| CE0053 | Selected type is not allowed | Missing AS for entity type |
| CE0104 | Action activity is unreachable | Code after RETURN |
| CE0105 | Must end with end event | Missing RETURN |
| CE0117 | Error in expression | Unqualified association path |
| CW0094 | Variable never used | Unused parameter/variable |

## Quick Validation Checklist

Before executing MDL:

- [ ] All entity types use `declare $var as Module.Entity`
- [ ] All SET targets have prior DECLARE
- [ ] Association paths are qualified: `$var/Module.Assoc/attr`
- [ ] Enum comparisons use `Module.Enum.Value`
- [ ] Every flow path ends with RETURN
- [ ] Division uses `div` not `/`
- [ ] All statements end with `;`
- [ ] IF/LOOP properly closed with END IF/END LOOP
