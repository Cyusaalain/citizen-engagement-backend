export default (sequelize, DataTypes) => {
  return sequelize.define("Agency", {
    name: DataTypes.STRING,
    categories: DataTypes.JSON, //["Sanitation", "Transport"]
  });
};