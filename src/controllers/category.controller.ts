import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { ErrorCode } from "../constants/errorCodes";
import { createErrorResponse } from "../utils/errorUtils";

const categoryService = new CategoryService();

export const getAllCategories = async (req: Request, res: Response) => {
    const categories = await categoryService.getAll();
    return res.status(200).json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const category = await categoryService.getById(id);

    if (!category) {
        const { status, body } = createErrorResponse(
            ErrorCode.CATEGORY_NOT_FOUND,
            404
        );
        return res.status(status).json(body);
    }

    return res.status(200).json(category);
};

export const createCategory = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    if (!name) {
        const { status, body } = createErrorResponse(
            ErrorCode.MISSING_FIELDS,
            422
        );
        return res.status(status).json(body);
    }

    try {
        const newCategory = await categoryService.create({ name, description });
        return res.status(201).json(newCategory);
    } catch (error: any) {
        const message = error?.message ?? "";

        if (message.includes("name")) {
            const { status, body } = createErrorResponse(
                ErrorCode.CATEGORY_ALREADY_EXISTS,
                409
            );
            return res.status(status).json(body);
        }

        const { status, body } = createErrorResponse(ErrorCode.SERVER_ERROR, 500);
        return res.status(status).json(body);
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, description } = req.body;

    const updated = await categoryService.update(id, { name, description });

    if (!updated) {
        const { status, body } = createErrorResponse(
            ErrorCode.CATEGORY_NOT_FOUND,
            404
        );
        return res.status(status).json(body);
    }

    return res.status(200).json(updated);
};

export const deleteCategory = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = await categoryService.delete(id);

    if (!deleted) {
        const { status, body } = createErrorResponse(
            ErrorCode.CATEGORY_NOT_FOUND,
            404
        );
        return res.status(status).json(body);
    }

    return res.status(204).send();
};
