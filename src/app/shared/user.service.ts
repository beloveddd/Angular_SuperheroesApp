import { User } from "./app.interfaces";

export class UserService {
  public static users: User[] = [];

  public createUser(formLoginValue: Record<string, string>): void {
    const user: User = {
      login: formLoginValue.login,
      password: formLoginValue.password
    }

    UserService.users.push(user);
  }
}
