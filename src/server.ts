import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema'
import expressPlayGround from 'graphql-playground-middleware-express';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(compression());

mongoose.connect("mongodb://admin:1234@graphqldb-shard-00-00.za8im.mongodb.net:27017,graphqldb-shard-00-01.za8im.mongodb.net:27017,graphqldb-shard-00-02.za8im.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-neqad9-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=>{
    console.log("Connected to MongoDB")
})

const servidor = new ApolloServer ({
    schema,
    introspection: true
});

servidor.applyMiddleware({app});
app.get('/', expressPlayGround ({
    endpoint: '/graphql'
}));

const puerto = 5400
const httpServerx = createServer(app)

httpServerx.listen(
    { port: puerto },
    () => console.log("Escuchando por el puerto: http://localhost:" + puerto+"/graphql")
)