const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productcategory', {
    productcategoryid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    productcategoryname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW // Automatically sets the current date/time when created
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW, // Automatically updates the date/time when the record is updated
      onUpdate: Sequelize.NOW // This will update the timestamp when the record is updated
    }
  }, {
    sequelize,
    tableName: 'productcategory',
    timestamps: false, // Disables automatic handling of `createdAt` and `updatedAt` by Sequelize
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productcategoryid" },
        ]
      },
    ]
  });
};
