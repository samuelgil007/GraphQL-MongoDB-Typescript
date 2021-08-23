import { Document, Schema, model,createConnection } from 'mongoose';
let autoIncrement = require('mongoose-auto-increment');

interface Curso extends Document {
    id: Number,
    title: String,
    description: String,
    clases: Number,
    time: Number,
    level: String,
    path: String,
    logo: String,
    teacher: String
}

export const cursoSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    clases: {
        type: Number,
    },
    time: {
        type: Number,
    },
    level: {
        type: String,
        enum: [
            "TODOS",
            "NOVATOS",
            "INTERMEDIO",
            "EXPERTO"
        ]
    },
    logo: {
        type: String,
    },
    path: {
        type: String,
    },
    teacher: {
        type: String,
    }
})
let connection = createConnection("mongodb://admin:1234@graphqldb-shard-00-00.za8im.mongodb.net:27017,graphqldb-shard-00-01.za8im.mongodb.net:27017,graphqldb-shard-00-02.za8im.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-neqad9-shard-0&authSource=admin&retryWrites=true&w=majority");
autoIncrement.initialize(connection);

cursoSchema.plugin(autoIncrement.plugin, {
    model: 'Curso',
    field: 'id',
    startAt: 1,
    incrementBy: 1
});

export const CursoModel = model<Curso>('Curso', cursoSchema);