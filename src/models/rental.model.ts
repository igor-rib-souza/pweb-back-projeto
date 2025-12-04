import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./user.model";
import { Movie } from "./movie.model";
import { Payment } from "./payment.model";

interface RentalAttributes {
  id: number;
  userId: number;
  movieId: number;
  rentedAt: Date;
  payment?: Payment;
  expiresAt: Date;
  extended: boolean;
}

interface RentalCreationAttributes
  extends Optional<RentalAttributes, "id" | "extended"> { }

export class Rental
  extends Model<RentalAttributes, RentalCreationAttributes>
  implements RentalAttributes {
  public id!: number;
  public userId!: number;
  public movieId!: number;
  public rentedAt!: Date;
  public expiresAt!: Date;
  public extended!: boolean;
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
    rentedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    extended: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Rental",
    tableName: "rentals",
    timestamps: false,
  }
);

// Associações
Rental.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Rental, { foreignKey: "userId", as: "rentals" });

Rental.belongsTo(Movie, { foreignKey: "movieId", as: "movie" });
Movie.hasMany(Rental, { foreignKey: "movieId", as: "rentals" });

Rental.hasOne(Payment, { foreignKey: "rentalId", as: "payment" });
Payment.belongsTo(Rental, { foreignKey: "rentalId", as: "rental" });
