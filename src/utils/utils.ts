import * as CryptoJS from 'crypto-js';

export const isEmpty = (value: any) => {
  return value === undefined || value === null || value === '';
};

export const encrypt = (value: string): string => {
  return CryptoJS.AES.encrypt(value, process.env.REACT_APP_ENCRYPTION_KEY as string).toString();
}

export const decrypt = (encryptedStr: string) => {
  return CryptoJS.AES.decrypt(
    encryptedStr,
    process.env.REACT_APP_ENCRYPTION_KEY as string
  ).toString(CryptoJS.enc.Utf8);
}

export const getURLWithQueryParams = (
  base: string,
  params: Record<string, string>
) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return `${base}?${query}`;
};