import { PaymentMethod, PaymentStatus } from "../enums/payment.enum";

export const isValidPaymentMethod = (method: string): boolean => {
    return Object.values(PaymentMethod).includes(method as PaymentMethod);
};

export const isValidPaymentStatus = (status: string): boolean => {
    return Object.values(PaymentStatus).includes(status as PaymentStatus);
};
