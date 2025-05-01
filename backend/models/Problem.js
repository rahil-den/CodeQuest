const { DataTypes } = require('sequelize');
const { sequelize } = require('../shared/db');

// Import the Submission model correctly
const Submission = require('./Submission.js');

// Define the Problem model
const Problem = sequelize.define('Problem', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),
    allowNull: false,
  },
  constraints: {
    type: DataTypes.TEXT,
  },
  examples: {
    type: DataTypes.TEXT,
  },
  testCases: {
    type: DataTypes.TEXT, // JSON string of test cases
    allowNull: false,
    field: 'test_cases',
  },
  solutionTemplate: {
    type: DataTypes.TEXT,
    field: 'solution_template',
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING), // Store tags as an array of strings
    allowNull: true,
  },
});

// Create the hasMany association after importing the Submission model
// Problem.hasMany(Submission, { foreignKey: 'problemId' });

module.exports = Problem;
