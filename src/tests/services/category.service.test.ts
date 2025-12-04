import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CategoryService } from '../../services/category.service';
import { Category } from './../../models/category.model';

const service = new CategoryService();

describe('CategoryService', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should return all categories', async () => {
        const mockData = [{ id: 1, name: 'Ação' }];
        vi.spyOn(Category, 'findAll').mockResolvedValue(mockData as any);
        const result = await service.getAll();
        expect(result).toEqual(mockData);
    });

    it('should return a category by id', async () => {
        const mockCategory = { id: 1, name: 'Terror' };
        vi.spyOn(Category, 'findByPk').mockResolvedValue(mockCategory as any);
        const result = await service.getById(1);
        expect(result).toEqual(mockCategory);
    });

    it('should create a category', async () => {
        const mockCreate = { id: 1, name: 'Drama' };
        vi.spyOn(Category, 'create').mockResolvedValue(mockCreate as any);
        const result = await service.create({ name: 'Drama' });
        expect(result).toEqual(mockCreate);
    });

    it('should update a category', async () => {
        const mockUpdate = { update: vi.fn().mockResolvedValue(undefined), id: 1 };
        vi.spyOn(Category, 'findByPk').mockResolvedValue(mockUpdate as any);
        const result = await service.update(1, { name: 'Comédia' });
        expect(mockUpdate.update).toHaveBeenCalledWith({ name: 'Comédia' });
        expect(result).toEqual(mockUpdate);
    });

    it('should return null if category to update is not found', async () => {
        vi.spyOn(Category, 'findByPk').mockResolvedValue(null);
        const result = await service.update(99, { name: 'N/A' });
        expect(result).toBeNull();
    });

    it('should delete a category', async () => {
        vi.spyOn(Category, 'destroy').mockResolvedValue(1);
        const result = await service.delete(1);
        expect(result).toBe(true);
    });
});
