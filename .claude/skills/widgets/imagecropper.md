# Image Cropper

- **Widget ID:** `com.mendix.widget.web.imagecropper.ImageCropper`
- **Type:** PLUGGABLEWIDGET
- **Version:** 1.1.0

## MDL Example

```sql
PLUGGABLEWIDGET 'com.mendix.widget.web.imagecropper.ImageCropper' widget1
```

## Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `image` | image | Yes |  | The image to crop. The cropped result is saved back to it. |
| `cropShape` | enumeration | Yes | rect | Shape of the crop. Circle masks the corners. |
| `aspectRatio` | enumeration | Yes | free | Locks the crop proportions. Free lets the user resize freely. |
| `customAspectWidth` | expression | Yes | 1 | Width side of the ratio (e.g. 3 in 3:2). Used when Aspect ratio is Custom. Ca... |
| `customAspectHeight` | expression | Yes | 1 | Height side of the ratio (e.g. 2 in 3:2). Used when Aspect ratio is Custom. C... |
| `onCropAction` | action |  |  | Runs each time the crop is auto-applied to the image attribute. |
| `boundaryWidth` | integer | Yes | 800 | Maximum on-screen width of the crop area. The image scales down to fit; the c... |
| `boundaryHeight` | integer | Yes | 800 | Maximum on-screen height of the crop area. The image scales down to fit; the ... |
| `resizableEnabled` | boolean | Yes | true | Let the user resize the selection by dragging its corners. |
| `enableRotation` | boolean | Yes | true | Show rotate-left / rotate-right buttons. The rotation is baked into the saved... |
| `enableGrayscale` | boolean | Yes | false | Show a grayscale toggle. When on, the saved image is converted to grayscale (... |
| `showResetButton` | boolean | Yes | true | Show a Reset button that restores the original image and clears zoom, rotatio... |
| `zoomEnabled` | boolean | Yes | true | Master switch for zooming. When off, the slider and mouse-wheel zoom are disa... |
| `showZoomSlider` | boolean | Yes | true | Show the zoom slider below the crop area. Turn off to keep mouse-wheel zoom w... |
| `wheelZoomMode` | enumeration | Yes | onWithCtrl | Whether the mouse wheel zooms the image. "On (hold Ctrl)" keeps page scroll w... |
| `minZoom` | decimal | Yes | 1 | Smallest zoom level. 1 = image fits the canvas. Below 1 lets the user zoom ou... |
| `maxZoom` | decimal | Yes | 4 | Largest zoom level. 4 means up to 4× the canvas size. Must be greater than M... |
| `grayscaleCaption` | textTemplate |  |  | Visible text and tooltip for the grayscale toggle. |
| `resetCaption` | textTemplate |  |  | Visible text and tooltip for the reset button. |
| `zoomCaption` | textTemplate |  |  | Visible label for the zoom slider. |
| `noImageCaption` | textTemplate |  |  | Shown when no image is bound to the image attribute. |
| `rotateLeftLabel` | textTemplate |  |  | Accessible name and tooltip for the rotate-left button. |
| `rotateRightLabel` | textTemplate |  |  | Accessible name and tooltip for the rotate-right button. |
| `grayscaleAriaLabel` | textTemplate |  |  | Accessible name for the grayscale toggle (announced by screen readers). |
| `resetAriaLabel` | textTemplate |  |  | Accessible name for the reset button (announced by screen readers). |
| `zoomAriaLabel` | textTemplate |  |  | Accessible name for the zoom slider (announced by screen readers). |
| `outputFormat` | enumeration | Yes | png | File format. PNG keeps transparency; JPEG produces smaller files. |
| `outputQuality` | decimal | Yes | 0.92 | JPEG compression. Higher = sharper and larger. Ignored for PNG. |
| `outputSize` | enumeration | Yes | original | Resolution of the saved crop. Original is sharpest; Viewport matches the on-s... |

