export default (sequelize, DataTypes) => {
  return sequelize.define("Complaint", {
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: {
      type: DataTypes.STRING,
      defaultValue: "open",
    },
    response: DataTypes.TEXT,
  });
};