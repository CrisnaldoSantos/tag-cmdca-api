const multer = require('multer')
const MulterAzureStorage = require('multer-azure-storage')
module.exports = multer({
  storage: new MulterAzureStorage({
    azureStorageConnectionString: process.env.AZURE_CONNETION_STRING,
    containerName: process.env.AZURE_CONTAINER,
    containerSecurity: 'blob'
  })
})