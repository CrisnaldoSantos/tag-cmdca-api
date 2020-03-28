const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const NewsSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true,
    },
    content:{
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
NewsSchema.plugin(mongoosePaginate);
const News = mongoose.model('News', NewsSchema);

module.exports = News;