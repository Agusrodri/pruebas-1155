import nodeMailer from 'nodemailer'
require("dotenv").config();

//If bnb balance for the casino wallet is low an email es sent
export default (sender: string, textFromSender: string) => {
    return new Promise<string>((resolve, reject) => {
        try {
            const transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'contact@bitionz.net',
                    pass: 'gqityocuzonwsnrq'
                }
            });

            const mailOptions = {
                from: 'contact@bitionz.net',
                to: 'contact@bitionz.net',
                subject: "Default subject",
                text: `Email remitente: ${sender}\nTexto: ${textFromSender}`,
                //html: `<a href=${nuevoLink}>Click aquí para verificar tu cuenta</a>` // html body
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                //console.log('Message %s sent: %s', info.messageId, info.response);
                resolve(`Mensaje enviado: ${info.messageId} ${info.response}`)
            });

        } catch (error) {
            console.log(error)
            reject()
        }
    })
}