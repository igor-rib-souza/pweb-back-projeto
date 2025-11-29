import { Category } from "../models/category.model";

export class CategoryService {
    async getAll() {
        return Category.findAll();
    }

    async getById(id: number) {
        return Category.findByPk(id);
    }

    async create(data: { name: string; description?: string }) {
        return Category.create(data);
    }

    async update(id: number, data: { name?: string; description?: string }) {
        const category = await Category.findByPk(id);
        if (!category) return null;

        await category.update(data);
        return category;
    }

    async delete(id: number) {
        const deletedCount = await Category.destroy({ where: { id } });
        return deletedCount > 0;
    }
}
