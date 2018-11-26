import * as nodemailer from 'nodemailer';
import { CLIENT_URL, MAIN_EMAIL_LOGIN, MAIN_EMAIL_PASSWORD } from '../util/env-vars';
import { logger } from '../logger';

// const transporter = nodemailer.createTransport({
//   host: 'smtp.ethereal.email',
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: 'svjy3c7swvnpaeis@ethereal.email', // generated ethereal user
//     pass: 'kmzRgS8Z9DM7FBysWT' // generated ethereal password
//   }
// });

export const emailLogin = MAIN_EMAIL_LOGIN;

const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: emailLogin,
    // pass: 'asdQWE123QWEasd',
    pass: MAIN_EMAIL_PASSWORD
  }
});

const url = CLIENT_URL;

const sendMail = (mailOptions) => {
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    logger.info('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
};

export const sendInviteToEmail = (to: string, token: string) => {
  let mailOptions = {
    from: `"НСП" <${emailLogin}>`,
    to,
    subject: 'Приглашение в проект', // Subject line
    html: `
        <h1>Найди своего психолога</h1>
        <h3>Вас пригласили в проект НСП</h3>
        <a href="${url}/settings/?email-token=${encodeURIComponent(token)}">
          Заполнить профиль
        </a>
      `,
    text: `${url}/settings/?email-token=${encodeURIComponent(token)}`,
  };
  sendMail(mailOptions);
};


export const sendEmailSigninToEmail = (to: string, token: string) => {
  let mailOptions = {
    from: `"НСП" <${emailLogin}>`,
    to,
    subject: 'Magic link', // Subject line
    html: `
        <h1>Найди своего психолога</h1>
        <h3>Перейдите по ссылке, чтобы зайти в личный кабинет</h3>
        <a href="${url}/?email-token=${encodeURIComponent(token)}">
          Перейти
        </a>
      `,
    text: `${url}/?email-token=${encodeURIComponent(token)}`,
  };
  sendMail(mailOptions);
};
