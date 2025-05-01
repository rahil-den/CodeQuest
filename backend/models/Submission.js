const { DataTypes } = require('sequelize');
const { sequelize } = require('../shared/db');

const Submission = sequelize.define('Submission', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  problemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  code: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  executionTime: {
    type: DataTypes.FLOAT,
  },
  memoryUsed: {
    type: DataTypes.FLOAT,
  },
  errorMessage: {
    type: DataTypes.TEXT,
  },
});



const Problem = require('./Problem');
Submission.belongsTo(Problem, { foreignKey: 'problemId' });


// const User = require('./User');
// Submission.belongsTo(User, { foreignKey: 'userId' });


module.exports = Submission; 