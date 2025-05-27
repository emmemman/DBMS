import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Matches = sequelize.define(
  "Matches",
  {
    match_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    match_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER(100),
      allowNull: true,
    },
    home_team_country_id: {
      type: DataTypes.INTEGER(100),
      allowNull: true,
    },
    away_team_country_id: {
      type: DataTypes.INTEGER(100),
      allowNull: true,
    },
    home_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    away_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tournament: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    neutral: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    draw: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    had_shootout: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: "matches",
    timestamps: false,
  }
);

export default Matches;
