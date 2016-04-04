var knox = require('knox');
var request = require('request');
var s3Client = null;

exports.config = function (options) {
  s3Client = knox.createClient(options);
};


exports.downloadFromUrlAndUploadToS3 = function (uri, filename, callback) {
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    var s3Request = s3Client.put(filename, {
      'Content-Length': res.headers['content-length'],
      'Content-Type': res.headers['content-type']
    });

    var remoteFileRequest = request(uri);

    remoteFileRequest.on('data', function (data) {
    	s3Request.write(data);
    }).on('end', function () {
    	s3Request.end();
    });

    s3Request.on('response', function(resp) {
      console.log('S3 status:', resp.statusCode, 'url:', s3Request.url);
      callback(resp);
    });

    s3Request.on('error', function(err) {
      console.error('Error uploading to s3:', err);
    });
  });
};

downloadFromUrlAndUploadToS3('https://remotehost.com/filename.jpg', 'folder/filename.jpg');


