import express, { Request, Response } from 'express';
//import logger from 'morgan';
import cors from "cors";
import NotFoundError from './src/errors/notFoundError';
import sendEmail from './src/helpers/sendEmail'

const NodeCache = require("node-cache");
const myCache = new NodeCache();
export { myCache }

const app = express();

if (!process.env.PORT) {
  require('dotenv').config();
}
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));
app.use(express.json())
//app.use(logger('dev'))

app.use(express.static(__dirname + "/src/public"))

app.get('/health', async (req: Request, res: Response) => {
  res.send("ok")

});

app.all('*', (req: express.Request) => {
  throw new NotFoundError(req.path);
});

app.listen(process.env.PORT, () => {
  console.log(`server listing on port ${process.env.PORT}`);
});
