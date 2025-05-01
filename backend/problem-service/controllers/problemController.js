const Problem = require('../../models/Problem');

exports.getAllProblems = async (req, res) => {
  try {
    const problems = await Problem.findAll({
      attributes: ['id', 'title', 'difficulty','tags'],
    });
    
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching problems', error: error.message });
  }
};

exports.getProblemById = async (req, res) => {
  try {
    const { id } = req.params;
    const problem = await Problem.findByPk(id);
    
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching problem', error: error.message });
  }
};

exports.createProblem = async (req, res) => {
  try {
    const { title, description, difficulty, constraints, examples, testCases, solutionTemplate, tags } = req.body;
   
    // Optional validation to ensure testCases is valid JSON
    try {
      JSON.parse(testCases); 
    } catch(err) {
      return res.status(400).json({ message: 'Invalid test cases format' });
    }
    
    const problem = await Problem.create({
      title,
      description,
      difficulty,
      constraints,
      examples,
      testCases, // Store directly as is - no JSON.stringify needed
      solutionTemplate,
      tags,
    });
   
    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating problem', error: error.message });
  }
};

exports.deleteProblem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const problem = await Problem.findByPk(id);
    
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    
    await problem.destroy();
    
    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting problem', error: error.message });
  }
}
exports.updateProblem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, difficulty, constraints, examples, testCases, solutionTemplate, tags } = req.body;
    
    const problem = await Problem.findByPk(id);
    
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    
    // Optional validation to ensure testCases is valid JSON
    try {
      JSON.parse(testCases); 
    } catch(err) {
      return res.status(400).json({ message: 'Invalid test cases format' });
    }
    
    await problem.update({
      title,
      description,
      difficulty,
      constraints,
      examples,
      testCases,
      solutionTemplate,
      tags,
    });
    
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating problem', error: error.message });
  }
}