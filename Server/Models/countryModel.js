import { DataTypes } from 'sequelize';
import sequelize from '../db.js';




const Country = sequelize.define('Country', {
  country_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  iso_code: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  iso3_code: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  display_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  region_name: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  developed_status: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  population: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'countries', // Match your MySQL table
  timestamps: false // Disable createdAt and updatedAt
});

export default Country;
