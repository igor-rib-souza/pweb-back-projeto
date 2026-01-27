import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

//TODO: talvez melhorar a lógica usada para remover a senha do usuário
export class UserService {
  async getAll() {
    return await User.findAll({
      attributes: { exclude: ["password"] },
    });
  }

  async getByUsername(username: string) {
    return User.findOne({ where: { name: username } });
  }

  async getById(id: number) {
    return await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  }

  async create(data: {
    name: string;
    email: string;
    cpf: string;
    password: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await User.create({ ...data, password: hashedPassword });
  }

  async update(
    id: number,
    data: Partial<{ name: string; email: string; cpf: string }>,
  ) {
    const user = await User.findByPk(id);
    if (!user) return null;

    const updatedUser = await user.update(data);

    const { password: _, ...safeUser } = updatedUser.get({ plain: true });
    return safeUser;
  }

  async delete(id: number) {
    const deletedCount = await User.destroy({ where: { id } });
    return deletedCount > 0;
  }
}
