const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const RecordSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true,
    },
    url:{
        type:String,
        require: true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
});
RecordSchema.plugin(mongoosePaginate);
const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;