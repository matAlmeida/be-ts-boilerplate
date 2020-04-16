import { ErrorRequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

import { ApiError } from '../models/errors/types';

const handleError = (err: ApiError): ApiError => {
  if (err.status) {
    return err;
  }
  return {
    ...err,
    status: INTERNAL_SERVER_ERROR,
  };
};

const encapsuleReq: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const error_res = handleError(err);
  return res.status(error_res.status).send(error_res.message);
};

export default encapsuleReq;
