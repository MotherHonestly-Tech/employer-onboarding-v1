import { HttpStatusCode } from './http-status-codes';

export interface HttpResponse<T> {
    status: HttpStatusCode;
    message: string;
    data: T;
}

export interface ErrorResponse {
    status: HttpStatusCode;
    message: string;
    errors: string;
}

export interface HttpError {
    headers:    Headers;
    status:     number;
    statusText: string;
    url:        string;
    ok:         boolean;
    name:       string;
    message:    string;
    error:      Error;
}

export interface Error {
    message: string;
    status:  number;
    time:    Date;
}
