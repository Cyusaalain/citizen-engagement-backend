import Sequelize from 'sequelize';
import dbConfig from '../config/db.config.js';
import UserModel from './user.model.js';
import AdminModel from './admin.model.js';
import AgencyModel from './agency.model.js';
import ComplaintModel from './complaint.model.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = UserModel(sequelize, Sequelize.DataTypes);
db.Admin = AdminModel(sequelize, Sequelize.DataTypes);
db.Agency = AgencyModel(sequelize, Sequelize.DataTypes);
db.Complaint = ComplaintModel(sequelize, Sequelize.DataTypes);

// Associations
db.User.hasMany(db.Complaint);
db.Complaint.belongsTo(db.User);
db.Agency.hasMany(db.Complaint);
db.Complaint.belongsTo(db.Agency);

export default db;