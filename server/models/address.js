const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    addressid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      
    },
    mobileno: {
        type: DataTypes.STRING(45), 
        allowNull: false,
        
      },
      username: {
        type: DataTypes.STRING(45), 
        allowNull: false,
        
      },
    /* landmark: {
      type: DataTypes.STRING(45),
      allowNull: true
    }, */
    city: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    zipcode: {
      type: DataTypes.STRING(45),
      allowNull: false
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
      email: {
        type: DataTypes.STRING(245),
        allowNull: true
      }
  }, {
    sequelize,
    tableName: 'address',
    timestamps: false,
  });
};