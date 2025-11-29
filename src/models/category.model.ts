import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface CategoryAttributes {
    id: number;
    name: string;
    description?: string;
    createdAt?: Date;
}

interface CategoryCreationAttributes extends Optional<CategoryAttributes, "id" | "description" | "createdAt"> { }

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
    public id!: number;
    public name!: string;
    public description?: string;
    public createdAt?: Date;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: "Category",
        tableName: "categories",
        timestamps: false,
    }
);
