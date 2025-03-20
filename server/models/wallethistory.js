const { x } = require('joi');
const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wallethistory', {
    walletid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    wallethistoryid: {
        autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
      

    },
    account: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    IFSC: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    bank: {
      type: DataTypes.STRING(245),
      allowNull: true
    },
    branch: {
      type: DataTypes.STRING(245),
      allowNull: true
    },
    stat: {
        type: DataTypes.STRING(245),
        allowNull: true
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
  }, {
    sequelize,
    tableName: 'wallethistory',
    timestamps: false
  });
};
