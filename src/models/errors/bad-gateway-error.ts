import { BAD_GATEWAY } from 'http-status-codes';

import { ApiError } from './types';

const BadGatewayError = class extends Error implements ApiError {
  status = BAD_GATEWAY;
};

export default BadGatewayError;
