import {Document, Schema, model, createConnection} from 'mongoose';
let autoIncrement = require('mongoose-auto-increment');

interface Student extends Document{
    id:Number,
    name:String,
    email: String,
    website: String,
    courses:  []
  }

const studentSchema =  new Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    website: {
        type: String,
    },
    courses: {
        type: [Number],
    },
})

let connection = createConnection("mongodb://admin:1234@graphqldb-shard-00-00.za8im.mongodb.net:27017,graphqldb-shard-00-01.za8im.mongodb.net:27017,graphqldb-shard-00-02.za8im.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-neqad9-shard-0&authSource=admin&retryWrites=true&w=majority");
autoIncrement.initialize(connection);

studentSchema.plugin(autoIncrement.plugin, {
    model: 'Student',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

export const StudentModel =  model<Student>('Student', studentSchema);
