const { DataTypes } = require("sequelize/types");
const { user } = require(".");
const uuid = require('uuid');


user.init (
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { 
        len: [10]
      }
    }
  },
  {
    hooks:{
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash (newUserData.password, 10);
        return newUserData;
      }
    }
  }
)

module.exports = members;