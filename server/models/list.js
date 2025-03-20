const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('list', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    orderid: {
      
        type: DataTypes.STRING(445),
        allowNull: false,
      
      },
      quantity: {
      
        type: DataTypes.INTEGER,
        allowNull: false,
      
      },


    name: {
      type: DataTypes.STRING(445),
      allowNull: true
    },
    size: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    color: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    price: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
   variant_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      sku: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      hsn: {
        type: DataTypes.TEXT,
        allowNull: true
      },
   
  }, {
    sequelize,
    tableName: 'list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" }
        ]
      }
    ]
  });
};
