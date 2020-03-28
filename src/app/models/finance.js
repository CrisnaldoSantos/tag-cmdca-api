const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const FinanceSchema = new mongoose.Schema({
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
FinanceSchema.plugin(mongoosePaginate);
const Finance = mongoose.model('Finance', FinanceSchema);

module.exports = Finance;