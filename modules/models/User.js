const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');


const UserSchema = new Schema({
    name: {type: String},
    email : {type: String, sparse: true},
    password: {type: String},
    token : {type: String},
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}]

})

UserSchema.plugin(timestamps)


UserSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('User', UserSchema);