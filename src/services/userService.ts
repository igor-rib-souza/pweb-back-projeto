import { User, users } from "../models/user.js";

export class UserService {
  create(data: { name: string; email: string; cpf: string }): User {
    const { name, email, cpf } = data;

    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      cpf,
    };

    users.push(newUser);
    return newUser;
  }

  list(): User[] {
    return users;
  }
}
