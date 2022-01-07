import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes/index';

dotenv.config();

const PORT = process.env.PORT || 9998;
const app: Express = express();

app.use(helmet()); // Adds some sensible default security Headers to our app.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mount all routes on /api path
app.use('/', routes);

app.listen(PORT, () => console.log(`Running on ${PORT}!!`));
