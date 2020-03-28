const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const AdvisorSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
    },
    action:{
        type:String,
        require: true,
    },
    contact:{
        type:String,
        require: true,
    },
    image_url:{
        type:String,
        require: true,
    },
    about:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
});
AdvisorSchema.plugin(mongoosePaginate);
const Advisor = mongoose.model('Advisor', AdvisorSchema);

module.exports = Advisor;