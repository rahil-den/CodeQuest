const Submission = require('../../models/Submission');
const executionController = require('../../execution-service/controllers/executionController');

exports.createSubmission = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;
    const userId = req.user.id;

    // Create submission record
    const submission = await Submission.create({
      userId,
      problemId,
      code,
      language,
      status: 'Pending',
    });

    // Load the problem to get only the first test case
    const Problem = require('../../models/Problem');
    const problem = await Problem.findByPk(problemId);

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    const allTestCases = JSON.parse(problem.testCases);
    const firstTestCaseOnly = [allTestCases[0]];
    // console.log('First test case only:', firstTestCaseOnly);
    // Create a clone of executeCodeInternal but inject the single test case
    const executionResult = await executionController.executeCodeInternal({
      submissionId: submission.id,
      problemId,
      code,
      language,
      testCases: firstTestCaseOnly // inject one test case only
    });

    // Update submission with execution results
    await submission.update({
      status: executionResult.status,
      executionTime: executionResult.executionTime,
      memoryUsed: executionResult.memoryUsed,
      errorMessage: executionResult.errorMessage,
    });

    res.status(200).json({
      message: 'Submission processed (1 test case only)',
      submission: {
        id: submission.id,
        status: submission.status,
        executionTime: submission.executionTime,
        memoryUsed: submission.memoryUsed,
        errorMessage: submission.errorMessage,
      },
    });
  } catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ message: 'Error processing submission', error: error.message });
  }
};


exports.getUserSubmissions = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const submissions = await Submission.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      
    });
    
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submissions', error: error.message });
  }
};

exports.getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findByPk(id);
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    // Check if user owns this submission
    if (submission.userId !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access to submission' });
    }
    
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching submission', error: error.message });
  }
}; 


exports.getAllSubmissions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    const { count, rows: submissions } = await Submission.findAndCountAll({
      order: [['createdAt', 'DESC']],
      limit: limit,
      offset: offset,
      
    });
    
    res.status(200).json({
      submissions,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all submissions', error: error.message });
  }
};