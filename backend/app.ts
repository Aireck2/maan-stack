import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { dbConnect } from './db/mongo.db';
import { startApolloServer } from './graphql';
import config from './helpers/config';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('env', config.server.env);
app.set('port', config.server.port);

startApolloServer(app);
dbConnect();
