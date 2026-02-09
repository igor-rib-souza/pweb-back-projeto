import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./user.model";
import { Movie } from "./movie.model";
import { Payment } from "./payment.model";

interface RentalAttributes {
  id: number;
  userId: number;
  movieId: number;
  startDate?: Date;
  payment?: Payment;
  endDate?: Date;
  rentedAt?: Date;
  extended: boolean;
  days: number;
}

interface RentalCreationAttributes extends Optional<
  RentalAttributes,
  "id" | "extended"
> {}

export class Rental
  extends Model<RentalAttributes, RentalCreationAttributes>
  implements RentalAttributes
{
  public id!: number;
  public userId!: number;
  public movieId!: number;
  public startDate!: Date;
  public endDate!: Date;
  public rentedAt!: Date;
  public extended!: boolean;
  public days!: number;
}

Rental.init(
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
    movieId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    rentedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    extended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    days: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Rental",
    tableName: "rentals",
    timestamps: false,
  },
);

// Associações
Rental.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Rental, { foreignKey: "userId", as: "rentals" });

Rental.belongsTo(Movie, { foreignKey: "movieId", as: "movie" });
Movie.hasMany(Rental, { foreignKey: "movieId", as: "rentals" });

Rental.hasOne(Payment, { foreignKey: "rentalId", as: "payment" });
Payment.belongsTo(Rental, { foreignKey: "rentalId", as: "rental" });
