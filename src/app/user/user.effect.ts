import { ICredentials } from "./types";

export async function createUser(credentials: ICredentials): Promise<any> {
  return {
    id: 1,
    name: "John Doe",
    email: "john.doe@mail.com",
  };
}

export async function loginUser(credentials: ICredentials): Promise<any> {
  return {
    id: 1,
    name: "John Doe",
    email: "john.doe@mail.com",
  };
}
