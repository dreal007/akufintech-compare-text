'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    id: { 
      type : DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },

    displayName: { 
      type: DataTypes.STRING,
      allowNull: false
    },

    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    active: {
      type : DataTypes.BOOLEAN,
      defaultValue: true
    },
    
  }, {
    tableName: 'Users',
    timestamps: true
  });
  return User;
};