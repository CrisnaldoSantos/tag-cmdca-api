const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const NoticeSchema = new mongoose.Schema({
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
NoticeSchema.plugin(mongoosePaginate);
const Notice = mongoose.model('Notice', NoticeSchema);

module.exports = Notice;