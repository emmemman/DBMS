import { DataTypes } from 'sequelize';
import sequelize from '../db.js';



const CountryStats = sequelize.define('CountryStats', {
  country_stat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  country_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  match_year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  wins: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  losses: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  draws: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  home_wins: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  home_losses: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  home_draws: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  away_wins: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  away_losses: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  away_draws: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'country_stats',
  timestamps: false
});

export default CountryStats;
