import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { PaymentMethod, PaymentStatus } from "../enums/payment.enum";

interface PaymentAttributes {
    id: number;
    userId: number;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    rentalId: number;
    createdAt?: Date;
}

export interface PaymentCreationAttributes
    extends Optional<PaymentAttributes, "id" | "createdAt" | "status"> { }

export class Payment
    extends Model<PaymentAttributes, PaymentCreationAttributes>
    implements PaymentAttributes {
    public id!: number;
    public userId!: number;
    public amount!: number;
    public method!: PaymentMethod;
    public status!: PaymentStatus;
    public rentalId!: number;
    public createdAt!: Date;
}

Payment.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        method: {
            type: DataTypes.ENUM(...Object.values(PaymentMethod)),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(...Object.values(PaymentStatus)),
            allowNull: false,
            defaultValue: PaymentStatus.PENDING,
        },
        rentalId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: "Payment",
        tableName: "payments",
        timestamps: false,
    }
);
