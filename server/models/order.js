const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('order', {
    orderid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shippingfees: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bill: {
      type: DataTypes.JSON,
      allowNull: true
    },
    waybill: {
      type: DataTypes.STRING(245),
      allowNull: true
    },
    list: {
      type: DataTypes.JSON,
      allowNull: true
    },
    customername: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    addline1: {
      type: DataTypes.STRING(245),
      allowNull: true
    },
    addline2: {
      type: DataTypes.STRING(245),
      allowNull: true
    },
    
    state: {
      type: DataTypes.STRING(245),
      allowNull: true
    },
    mobileno: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    paymentmode: {
      type: DataTypes.STRING(45),
      allowNull: true,
    

    },
    city: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    zipcode: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'order',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "orderid" }
        ]
      }
    ]
  });
};
