/* Main default import (state), should be named for importing convenience */
export default interface IUserState extends IUser {}

/* Other named exports */

export interface IUser {
  readonly id?: string;
  readonly username?: string;
  readonly email?: string;
}

export interface ICredentials {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
}
