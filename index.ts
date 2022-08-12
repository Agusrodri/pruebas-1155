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

app.post('/sendEmail', async (req: Request, res: Response) => {

  try {

    const { sender, textFromSender } = req.body
    if (myCache.has(`${sender}`)) {
      return res.status(401).json({
        msg: "Wait 3 minutes to send a new Email."
      })
    }

    myCache.set(`${sender}`, 0, 180000) //el email remitente se guarda en la cache por tres minutos
    await sendEmail(sender, textFromSender)
    res.status(200).json({ msg: "Email sent." })

  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }

});

app.all('*', (req: express.Request) => {
  throw new NotFoundError(req.path);
});

app.listen(process.env.PORT, () => {
  console.log(`server listing on port ${process.env.PORT}`);
});
