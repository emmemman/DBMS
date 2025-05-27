import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const PlayerGoals = sequelize.define(
  "PlayerGoals",
  {
    player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    player_name: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    match_date: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    goals: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    most_goals_scored: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "player_goals", // Match your MySQL table
    timestamps: false, // Disable createdAt and updatedAt
  }
);

export default PlayerGoals;
