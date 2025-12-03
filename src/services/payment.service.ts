import { Payment, PaymentCreationAttributes } from "../models/payment.model";

export class PaymentService {
    async getAll() {
        return Payment.findAll();
    }

    async getById(id: number) {
        return Payment.findByPk(id);
    }

    async create(data: PaymentCreationAttributes) {
        return Payment.create(data);
    }

    async update(id: number, data: Partial<PaymentCreationAttributes>) {
        const payment = await Payment.findByPk(id);
        if (!payment) return null;

        await payment.update(data);
        return payment;
    }

    async delete(id: number) {
        const deleted = await Payment.destroy({ where: { id } });
        return deleted > 0;
    }
}
