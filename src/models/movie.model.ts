import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface MovieAttributes {
  id: number;
  tmdbId: number;
  title: string;
  overview: string;
  posterPath: string | null;
  releaseDate: string;
  createdAt?: Date;
}

interface MovieCreationAttributes
  extends Optional<MovieAttributes, "id" | "title" | "overview" | "posterPath" | "releaseDate" | "createdAt"> {}

export class Movie
  extends Model<MovieAttributes, MovieCreationAttributes>
  implements MovieAttributes
{
  public id!: number;
  public tmdbId!: number;
  public title!: string;
  public overview!: string;
  public posterPath!: string;
  public releaseDate!: string;
  public createdAt!: Date;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tmdbId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    posterPath: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    sequelize,
    modelName: "Movie",
    tableName: "movies",
    timestamps: false,
  }
);
