export interface User {
  login: string,
  password: any,
  userName?: string,
  token?: Date,
  lifetime?: number | undefined,
}
