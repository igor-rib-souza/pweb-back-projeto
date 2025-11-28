import { ErrorCode } from '../constants/errorCodes';
import { errorMessages } from '../constants/errorMessages';

export function createErrorResponse(code: ErrorCode, status = 400) {
  return {
    status,
    body: {
      error: code,
      message: errorMessages[code],
    },
  };
}
