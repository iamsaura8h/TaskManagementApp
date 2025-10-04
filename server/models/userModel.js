// 1️⃣ Import mongoose to define schema & model
const mongoose = require('mongoose');

// 2️⃣ Create a schema - defines structure for documents in MongoDB
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true, 
    },
    age : {
        type : Number,
        required : true,
        min : 1
    },
    about : {
        type : String,
        required : true,
        maxLength : 100
    }
}, {
    timestamps : true,
    versionKey : false
});

// 3️⃣ Convert schema to a model
// mongoose.model('User', schema) binds schema to the 'users' collection
const User = mongoose.model('User',userSchema);

// 4️⃣ export it to use it 
module.exports = User;