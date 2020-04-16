import { NO_CONTENT } from 'http-status-codes';

import { ApiError } from './types';

const NoContentError = class extends Error implements ApiError {
  status = NO_CONTENT;
};

export default NoContentError;
