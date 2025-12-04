import { describe, it, expect, beforeEach, vi } from "vitest";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";

const service = new UserService();

describe("UserService", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("should return all users", async () => {
        const mockUsers = [{ id: 1, name: "João", email: "j@a.com", cpf: "123" }];
        vi.spyOn(User, "findAll").mockResolvedValue(mockUsers as any);

        const result = await service.getAll();
        expect(result).toEqual(mockUsers);
    });

    it("should return user by ID", async () => {
        const mockUser = { id: 1, name: "João", email: "j@a.com", cpf: "123" };
        vi.spyOn(User, "findByPk").mockResolvedValue(mockUser as any);

        const result = await service.getById(1);
        expect(result).toEqual(mockUser);
    });

    it("should create a user", async () => {
        const input = { name: "Maria", email: "m@a.com", cpf: "456" };
        const createdUser = { id: 2, ...input };
        vi.spyOn(User, "create").mockResolvedValue(createdUser as any);

        const result = await service.create(input);
        expect(result).toEqual(createdUser);
    });

    it("should delete a user", async () => {
        vi.spyOn(User, "destroy").mockResolvedValue(1);
        const result = await service.delete(1);
        expect(result).toBe(true);
    });

    it("should not delete if user not found", async () => {
        vi.spyOn(User, "destroy").mockResolvedValue(0);
        const result = await service.delete(999);
        expect(result).toBe(false);
    });
});
