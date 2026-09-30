# Gallery

- **Widget ID:** `com.mendix.widget.web.gallery.Gallery`
- **Type:** PLUGGABLEWIDGET
- **Version:** 3.0.1

## MDL Example

```sql
PLUGGABLEWIDGET 'com.mendix.widget.web.gallery.Gallery' widget1
```

## Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `filtersPlaceholder` | widgets |  |  |  |
| `datasource` | datasource |  |  |  |
| `itemSelection` | selection |  |  |  |
| `itemSelectionMode` | enumeration |  | clear | Defines item selection behavior. |
| `content` | widgets |  |  |  |
| `desktopItems` | integer |  | 1 |  |
| `tabletItems` | integer |  | 1 |  |
| `phoneItems` | integer |  | 1 |  |
| `pageSize` | integer |  | 20 |  |
| `pagination` | enumeration |  | buttons |  |
| `pagingPosition` | enumeration |  | below |  |
| `showPagingButtons` | enumeration |  | always |  |
| `showTotalCount` | boolean |  | false |  |
| `showEmptyPlaceholder` | enumeration |  | none |  |
| `emptyPlaceholder` | widgets |  |  |  |
| `itemClass` | expression |  |  |  |
| `onClickTrigger` | enumeration |  | single |  |
| `onClick` | action |  |  |  |
| `onSelectionChange` | action |  |  |  |
| `filterSectionTitle` | textTemplate |  |  | Assistive technology will read this upon reaching a filtering or sorting sect... |
| `emptyMessageTitle` | textTemplate |  |  | Assistive technology will read this upon reaching an empty message section. |
| `ariaLabelListBox` | textTemplate |  |  | Assistive technology will read this upon reaching gallery. |
| `ariaLabelItem` | textTemplate |  |  | Assistive technology will read this upon reaching each gallery item. |

