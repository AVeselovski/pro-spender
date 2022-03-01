/* Update with proper types, once known */

import HttpErrorResponse from "models/HttpErrorResponse";

/* Main default import (state), should be named for importing convenience */
export default interface IErrorState {
  readonly [key: string]: HttpErrorResponse;
}

/* Other named exports */

// export {};
