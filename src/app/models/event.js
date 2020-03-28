const mongoose = require('../../database');
const mongoosePaginate = require('mongoose-paginate');

const EventSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true,
    },
    location:{
        type:String,
        require: true,
    },
    date:{
        type:String,
        require:true,
    },
    hour:{
        type:String,
        require:true,
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
});
EventSchema.plugin(mongoosePaginate);
const Event = mongoose.model('Event', EventSchema);

module.exports = Event;