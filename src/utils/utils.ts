import * as CryptoJS from 'crypto-js';

import { environment } from '../env';

export const isEmpty = (value: any) => {
  return value === undefined || value === null || value === '';
};

export const encrypt = (value: string): string => {
  return CryptoJS.AES.encrypt(value, environment.ENCRYPTION_KEY).toString();
}

export const decrypt = (encryptedStr: string) => {
  return CryptoJS.AES.decrypt(
    encryptedStr,
    environment.ENCRYPTION_KEY
  ).toString(CryptoJS.enc.Utf8);
}