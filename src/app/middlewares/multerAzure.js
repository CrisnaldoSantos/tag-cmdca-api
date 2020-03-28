const multerAzure = require('multer-azure');
const crypto = require('crypto');
const multer = require('multer');

module.exports=
    multer({ 
        storage: multerAzure({
          connectionString: 'DefaultEndpointsProtocol=https;AccountName=testeuploads;AccountKey=koe5c/DB8omZTDgV9C9hv8f3/TZjMsMUum0FA0pfpi2MWjMhgh0FRBlIykslVcbCMHndDWOyz2NwUbLssgzn6A==;EndpointSuffix=core.windows.net',
          account: 'testeuploads', //The name of the Azure storage account
          key: 'koe5c/DB8omZTDgV9C9hv8f3/TZjMsMUum0FA0pfpi2MWjMhgh0FRBlIykslVcbCMHndDWOyz2NwUbLssgzn6A==', //A key listed under Access keys in the storage account pane
          container: 'cmdca',  //Any container name, it will be created if it doesn't exist
          blobPathResolver: function(req, file, callback){
            crypto.randomBytes(16, (err, hash)=>{
            const blobPath  = `${hash.toString("hex")}-${file.originalname}`;
            callback(null, blobPath );
            }) //Calculate blobPath in your own way.
            
          }
        })
    });