'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comparison = sequelize.define('Comparisons', {
    comparison_id: {
      type: DataTypes.UUID,
      required: true,
      allowNull: false
    },
    first_student_name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    first_student_text: {
      type: DataTypes.TEXT,
      required: true,
      allowNull: false
    },
    second_student_name: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false
    },
    second_student_text: {
      type: DataTypes.TEXT,
      required: true,
      allowNull: false
    },
    similarity: {
      type: DataTypes.STRING,
      required: true,
    },

    link: {
      type: DataTypes.STRING,
      required: true,
    },
    
  }, {
    tableName: 'Comparisons',
    timestamps: true,
  });
  return Comparison;
};