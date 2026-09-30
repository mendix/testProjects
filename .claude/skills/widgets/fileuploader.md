# File uploader

- **Widget ID:** `com.mendix.widget.web.fileuploader.FileUploader`
- **Type:** PLUGGABLEWIDGET
- **Version:** 2.2.2

## MDL Example

```sql
PLUGGABLEWIDGET 'com.mendix.widget.web.fileuploader.FileUploader' widget1 {
  allowedfileformat item1   -- one entry of `allowedFileFormats`
  custombutton item1   -- one entry of `customButtons`
}
```

## Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `uploadMode` | enumeration |  | files |  |
| `associatedFiles` | datasource |  | FileUploader.FileUploadContext/FileUploader.UploadedFile_FileUploadContext/FileUploader.UploadedFile |  |
| `associatedImages` | datasource |  | FileUploader.FileUploadContext/FileUploader.UploadedImage_FileUploadContext/FileUploader.UploadedImage |  |
| `readOnlyMode` | boolean |  | false |  |
| `createFileAction` | action |  | FileUploader.ACT_CreateUploadedFileDocument | Nanoflow that creates a file object, associates it to the current object and ... |
| `createImageAction` | action |  | FileUploader.ACT_CreateUploadedImageDocument | Nanoflow that creates an image object, associates it to the current object an... |
| `allowedFileFormats` | object |  |  | No restrictions if left empty. |
| `maxFilesPerUpload` | integer |  | 10 | Limit the number of files per one upload. |
| `maxFileSize` | integer |  | 25 | Reject files that are bigger than specified size. |
| `dropzoneIdleMessage` | textTemplate |  |  |  |
| `dropzoneAcceptedMessage` | textTemplate |  |  |  |
| `dropzoneRejectedMessage` | textTemplate |  |  |  |
| `uploadInProgressMessage` | textTemplate |  |  |  |
| `uploadSuccessMessage` | textTemplate |  |  |  |
| `uploadFailureGenericMessage` | textTemplate |  |  |  |
| `uploadFailureInvalidFileFormatMessage` | textTemplate |  |  |  |
| `uploadFailureFileIsTooBigMessage` | textTemplate |  |  |  |
| `uploadFailureTooManyFilesMessage` | textTemplate |  |  |  |
| `unavailableCreateActionMessage` | textTemplate |  |  |  |
| `downloadButtonTextMessage` | textTemplate |  |  |  |
| `removeButtonTextMessage` | textTemplate |  |  |  |
| `removeSuccessMessage` | textTemplate |  |  |  |
| `removeErrorMessage` | textTemplate |  |  |  |
| `objectCreationTimeout` | integer |  | 10 | Consider uploads unsuccessful if the Action to create new files/images does n... |
| `enableCustomButtons` | boolean |  | false |  |
| `customButtons` | object |  |  |  |

## Object Lists (repeating child entries)

### `allowedfileformat` → property `allowedFileFormats`

Item properties:

| Property | Operation |
|----------|-----------|
| `configMode` | primitive |
| `predefinedType` | primitive |
| `mimeType` | primitive |
| `extensions` | primitive |
| `typeFormatDescription` | texttemplate |

### `custombutton` → property `customButtons`

Item properties:

| Property | Operation |
|----------|-----------|
| `buttonCaption` | texttemplate |
| `buttonActionFile` | action |
| `buttonActionImage` | action |
| `buttonIsDefault` | primitive |
| `buttonIsVisible` | expression |

