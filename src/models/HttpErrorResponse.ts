import { v4 as uuid } from "uuid";

interface IError {
  readonly id: string;
  readonly message: string;
}

// TODO: This will need to be adjusted to match fetcher error response
export default class HttpErrorResponse implements IError {
  public readonly id: string = uuid();
  public error = true;
  public errors: string[] = [];
  public message: string = "";
  public status: number = 0;
  public url: string = "";
}
