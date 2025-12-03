import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";
import { createErrorResponse } from "../utils/errorUtils";
import { ErrorCode } from "../constants/errorCodes";

const paymentService = new PaymentService();

export const getAllPayments = async (_req: Request, res: Response) => {
    const payments = await paymentService.getAll();
    return res.json(payments);
};

export const getPaymentById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const payment = await paymentService.getById(id);

    if (!payment) {
        const { status, body } = createErrorResponse(ErrorCode.PAYMENT_NOT_FOUND, 404);
        return res.status(status).json(body);
    }

    return res.json(payment);
};

export const createPayment = async (req: Request, res: Response) => {
    const { userId, amount, method, status } = req.body;

    if (!userId || !amount || !method) {
        const { status, body } = createErrorResponse(ErrorCode.MISSING_FIELDS, 400);
        return res.status(status).json(body);
    }

    try {
        const newPayment = await paymentService.create({ userId, amount, method, status });
        return res.status(201).json(newPayment);
    } catch (error: any) {
        const { status, body } = createErrorResponse(ErrorCode.SERVER_ERROR, 500);
        return res.status(status).json({ ...body, detail: error.message });
    }
};

export const updatePayment = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = req.body;

    const updated = await paymentService.update(id, data);
    if (!updated) {
        const { status, body } = createErrorResponse(ErrorCode.PAYMENT_NOT_FOUND, 404);
        return res.status(status).json(body);
    }

    return res.json(updated);
};

export const deletePayment = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleted = await paymentService.delete(id);

    if (!deleted) {
        const { status, body } = createErrorResponse(ErrorCode.PAYMENT_NOT_FOUND, 404);
        return res.status(status).json(body);
    }

    return res.status(204).send();
};
