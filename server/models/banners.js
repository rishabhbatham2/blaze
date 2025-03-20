const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productcategory', {
    bannerid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    set1: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    set2: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      set3: {
        type: DataTypes.TEXT,
        allowNull: false
      },
  
  }, {
    sequelize,
    tableName: 'banners',
    timestamps: false, // Disables automatic handling of `createdAt` and `updatedAt` by Sequelize
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bannerid" },
        ]
      },
    ]
  });
};
