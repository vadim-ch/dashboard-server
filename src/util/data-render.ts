import { UnauthorizedError } from 'express-jwt';
import * as util from 'util';

import { MongoError } from 'mongodb';
import {AuthError} from "../errors/auth-error";
// const ValidationError = require('../error/validation-error');

const SUCCESS_CODE = 200;
const BAD_DATA_CODE = 400;

const renderErrorHtml = (errors, backUrl) => {
  // language=HTML
  return `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Ошибка в отправленной форме</title>
</head>
<body>
<h1>Error:</h1>
<pre>
${util.inspect(errors)}
</pre>
</body>
</html>`;
};

const renderSuccessHtml = (form, backUrl) => {
  // language=HTML
  return `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Успех</title>
</head>
<body>
<h1>Success:</h1>
<pre>
${util.inspect(form)}
</pre>
</body>
</html>`;
};

const render = (req, res, data, success) => {
  const badStatusCode = data.code ? data.code : BAD_DATA_CODE;
  res.status(success ? SUCCESS_CODE : badStatusCode);
  switch (req.accepts([`json`, `html`])) {
    // case `html`:
    //   res.set(`Content-Type`, `text/html`);
    //   const referer = req.header(`Referer`);
    //   res.send((success ? renderSuccessHtml : renderErrorHtml)(data, referer));
    //   break;
    default:
      res.json(data);
  }
};

export const renderDataSuccess = (req, res, data) => render(req, res, data, true);
export const renderDataError = (req, res, data) => render(req, res, data, false);
export const renderException = (req, res, exception) => {
  let data = exception;
  // if (exception instanceof ValidationError) {
  //   data = exception.errors;
  // } else
    if (exception instanceof MongoError) {
    data = {};
    switch (exception.code) {
      case 11000:
        data.code = 400;
        data.errorMessage = `Dublicate`;
        break;
      default:
        data.code = 501;
        data.errorMessage = exception.message;
    }
  } else if (exception instanceof UnauthorizedError) {
    data.code = 401;
    data.errorMessage = 'Error: invalid token';
  } else if (exception instanceof AuthError) {
        data.code = exception.code;
        data.errorMessage = exception.errorMessage;
    }
  render(req, res, data, false);
};
