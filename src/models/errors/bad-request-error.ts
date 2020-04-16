import { BAD_REQUEST } from 'http-status-codes';

import { ApiError } from './types';

const BadRequestError = class extends Error implements ApiError {
  status = BAD_REQUEST;
};

export default BadRequestError;
