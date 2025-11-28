import { User } from "../models/user.model";

export class UserService {
  async getAll() {
    return await User.findAll();
  }

  async getById(id: number) {
    return await User.findByPk(id);
  }

  async create(data: { name: string; email: string; cpf: string }) {
    return await User.create(data);
  }

  async update(
    id: number,
    data: Partial<{ name: string; email: string; cpf: string }>
  ) {
    const user = await User.findByPk(id);
    if (!user) return null;

    return await user.update(data);
  }

  async delete(id: number) {
    const deletedCount = await User.destroy({ where: { id } });
    return deletedCount > 0;
  }
}
