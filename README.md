# Remote url to s3
Stream a file from remote url and upload it to s3 bucket. Mostly required when scrapping stuff.

## Installation
`npm install remoteFileToS3 --save`

## Usage
```
var remoteFileToS3 = require('remoteFileToS3');

remoteFileToS3.config({
  bucket: 'your_s3bucket', 
  key: 'your_s3Key', 
  secret: 'your_s3Secret'
});

remoteFileToS3.downloadFromUrlAndUploadToS3('https://remote.com/filename.jpg', 'filename_in_s3.jpg', function (response) {
  console.log('Done uploading filename_in_s3.jpg');
});

```
