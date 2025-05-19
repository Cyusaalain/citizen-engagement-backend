// File: backend/models/admin.model.js
export default (sequelize, DataTypes) => {
  return sequelize.define("Admin", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    AgencyId: DataTypes.INTEGER, 
  });
};