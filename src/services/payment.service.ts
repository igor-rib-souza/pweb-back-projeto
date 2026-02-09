import { PaymentStatus } from "../enums/payment.enum";
import { Payment, PaymentCreationAttributes } from "../models/payment.model";
import { Rental } from "../models/rental.model";

export class PaymentService {
  async getAll() {
    return Payment.findAll();
  }

  async getById(id: number) {
    return Payment.findByPk(id);
  }

  async create(data: PaymentCreationAttributes) {
    return Payment.create({ ...data, status: PaymentStatus.PENDING });
  }

  async update(id: number, data: Partial<Payment>) {
    const payment = await Payment.findByPk(id);
    if (!payment) return null;

    try {
      await payment.update(data);

      if (data.status === PaymentStatus.PAID) {
        const rental = await Rental.findByPk(payment.rentalId);

        if (rental && !rental.startDate) {
          const startDate = new Date();
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + rental.days);

          await rental.update({ startDate, endDate });
        }
      }

      return payment;
    } catch (error) {
      await payment.update({ status: PaymentStatus.FAILED });

      throw error;
    }
  }

  async delete(id: number) {
    const deleted = await Payment.destroy({ where: { id } });
    return deleted > 0;
  }
}
