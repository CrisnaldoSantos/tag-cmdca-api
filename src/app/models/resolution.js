const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const ResolutionSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true,
    },
    responsable:{
        type:String,
        require: true,
    },
    office:{
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
ResolutionSchema.plugin(mongoosePaginate);
const Resolution = mongoose.model('Resolution', ResolutionSchema);

module.exports = Resolution;