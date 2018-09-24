import * as jwt from 'jsonwebtoken';
import { ErrorWrapper } from '../util/error-wrapper';
import { errorCodes } from '../../config/errorCodes';

export const verify = (token: string, SECRET: string): Promise<boolean | string | object> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          return reject(new ErrorWrapper({...errorCodes.TOKEN_EXPIRED}))
        }
        return reject(new ErrorWrapper({...errorCodes.TOKEN_VERIFY, message: error.message}))
      }
      return resolve(decoded)
    })
  })
};

export const sign = (payload: object, SECRET: string, options: object): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, options, (error, token) => {
      if (error) {
        console.error(error);
        return reject(new ErrorWrapper({...errorCodes.TOKEN_NOT_SIGNED}))
      }
      return resolve(token)
    })
  })
};
