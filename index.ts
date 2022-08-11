import express, { Request, Response } from 'express';
//import logger from 'morgan';
import cors from "cors";
import NotFoundError from './src/errors/notFoundError';
import sendEmail from './src/helpers/sendEmail'

const app = express();

if (!process.env.PORT) {
  require('dotenv').config();
}
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }));
app.use(express.json())
//app.use(logger('dev'))
/* app.use((req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE,PATCH,HEAD,OPTIONS");
}) */

app.post('/sendEmail', async (req: Request, res: Response) => {

  try {

    const { sender, textFromSender } = req.body
    console.log(sender, textFromSender)
    await sendEmail(sender, textFromSender)

    res.status(200).json({ msg: "Email enviado" })

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
