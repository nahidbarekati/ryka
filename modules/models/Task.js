const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');
// const bcrypt = require('bcrypt');

const TaskSchema = new Schema ({
    title : { type : String , default : null},
    description : { type : String , default : null},
    status : { type : String , enum : ['toDo', 'inQA' , 'InProgress' , 'Done' , 'Deployed' , 'Blocked'] , default : 'toDo' },
    user : {  type : Schema.Types.ObjectId  , ref : 'User' },
}, { timestamps: {createdAt: "created", updatedAt: "updated"} })



TaskSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Task' , TaskSchema);