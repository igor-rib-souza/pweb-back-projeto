import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../models/payment.model';
import { PaymentMethod, PaymentStatus } from '../../enums/payment.enum';

const service = new PaymentService();

describe('PaymentService', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should get all payments', async () => {
        vi.spyOn(Payment, 'findAll').mockResolvedValue([{ id: 1 }] as any);
        const result = await service.getAll();
        expect(result).toHaveLength(1);
    });

    it('should get a payment by id', async () => {
        vi.spyOn(Payment, 'findByPk').mockResolvedValue({ id: 1 } as any);
        const result = await service.getById(1);
        expect(result?.id).toBe(1);
    });

    it('should create a payment', async () => {
        vi.spyOn(Payment, 'create').mockResolvedValue({ id: 1, amount: 50 } as any);

        const result = await service.create({
            userId: 1,
            amount: 50,
            rentalId: 10,
            method: PaymentMethod.PIX,
            status: PaymentStatus.PAID,
        });

        expect(result?.amount).toBe(50);
    });

    it('should update payment', async () => {
        const mockPayment = { update: vi.fn(), id: 1 };

        vi.spyOn(Payment, 'findByPk').mockResolvedValue(mockPayment as any);

        const result = await service.update(1, { amount: 99 });

        expect(mockPayment.update).toHaveBeenCalledWith({ amount: 99 });
        expect(result).toEqual(mockPayment);
    });

    it('should return null if payment not found for update', async () => {
        vi.spyOn(Payment, 'findByPk').mockResolvedValue(null);

        const result = await service.update(999, {});

        expect(result).toBeNull();
    });

    it('should delete payment', async () => {
        vi.spyOn(Payment, 'destroy').mockResolvedValue(1);

        const result = await service.delete(1);

        expect(result).toBe(true);
    });
});
