const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const execPromise = util.promisify(exec);
const writeFilePromise = util.promisify(fs.writeFile);
const unlinkPromise = util.promisify(fs.unlink);

function getFileExtension(language) {
  switch (language.toLowerCase()) {
    case 'javascript':
      return 'js';
    case 'python':
      return 'py';
    case 'java':
      return 'java';
    case 'c++':
      return 'cpp';
    default:
      return 'txt'; // default file extension if language is unsupported
  }
}

exports.executeCode = async (req, res) => {
  try {
    console.log(req.body);
    const result = await exports.executeCodeInternal(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      status: 'Runtime Error',
      errorMessage: error.message,
    });
  }
};

exports.executeCodeInternal = async (data) => {
  const { submissionId, problemId, code, language } = data;

  // Create temporary directory for code execution
  const tempDir = path.join(__dirname, '../temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  // Get problem test cases
  let testCases;
  try {
    const Problem = require('../../models/Problem');
    const problem = await Problem.findByPk(problemId);
    if (!problem) {
      return {
        status: 'Compilation Error',
        errorMessage: 'Problem not found'
      };
    }
    testCases = JSON.parse(problem.testCases);
  } catch (error) {
    return {
      status: 'Compilation Error',
      errorMessage: 'Failed to fetch problem test cases'
    };
  }

  // File paths for code and output
  const codeFilePath = path.join(tempDir, `submission_${submissionId}.${getFileExtension(language)}`);

  try {
    // Write code to file
    await writeFilePromise(codeFilePath, code);

    // Compile and run based on language
    let compileCommand, runCommand;

    switch (language.toLowerCase()) {
      case 'javascript':
        compileCommand = null;
        runCommand = `node ${codeFilePath}`;
        break;
      case 'python':
        compileCommand = null;
        runCommand = `python ${codeFilePath}`;
        break;
      case 'java':
        const className = 'Solution'; // Assuming the class name is Solution
        compileCommand = `javac ${codeFilePath}`;
        runCommand = `java -cp ${tempDir} ${className}`;
        break;
      case 'c++':
        const outputPath = path.join(tempDir, `submission_${submissionId}`);
        compileCommand = `g++ ${codeFilePath} -o ${outputPath}`;
        runCommand = outputPath;
        break;
      default:
        throw new Error('Unsupported language');
    }

    // Compile if needed
    if (compileCommand) {
      try {
        await execPromise(compileCommand);
      } catch (compileError) {
        return {
          status: 'Compilation Error',
          errorMessage: compileError.stderr,
        };
      }
    }

    // Run only the first test case
    let allTestsPassed = true;
    let executionTime = 0;
    let errorMessage = null;

    const testCase = testCases[0];  // Only use the first test case
    const startTime = Date.now();

    try {
      // Prepare input for the test case
      const inputFile = path.join(tempDir, `input_${submissionId}.txt`);

      // Ensure testCase.input is a string (if it's an object, convert it to a string)
      const inputContent = typeof testCase.input === 'string' ? testCase.input : JSON.stringify(testCase.input);

      await writeFilePromise(inputFile, inputContent);

      const normalizeOutput = (output) => {
        return output.replace(/\s+/g, '').trim();  // Remove all spaces, tabs, and newlines.
      }

      // Run with input
      const { stdout, stderr } = await execPromise(`${runCommand} < ${inputFile}`);

      // Calculate execution time
      const endTime = Date.now();
      executionTime += (endTime - startTime);

      // Clean up input file
      await unlinkPromise(inputFile);

      // Ensure that output is a string
      const expectedOutput = normalizeOutput(
        typeof testCase.output === 'string' ? testCase.output : JSON.stringify(testCase.output)
      );
      console.log('Expected Output:', expectedOutput);
      const actualOutput = stdout ? normalizeOutput(stdout) : ''; // Ensure it's a valid string
      console.log('Actual Output:', actualOutput.trim());

      if (actualOutput !== expectedOutput) {
        allTestsPassed = false;
        errorMessage = `Expected: ${expectedOutput}\nGot: ${actualOutput}`;
      }

    } catch (runError) {
      console.error('Error running code:', runError);
      allTestsPassed = false;
      errorMessage = runError.stderr || runError.message;
    }

    // Clean up code file
    await unlinkPromise(codeFilePath);

    // Return result
    return {
      status: allTestsPassed ? 'Accepted' : 'Wrong Answer',
      executionTime,
      memoryUsed: 0,
      errorMessage,
    };

  } catch (error) {
    // Clean up if possible
    try {
      if (fs.existsSync(codeFilePath)) {
        await unlinkPromise(codeFilePath);
      }
    } catch (cleanupError) {
      console.error('Error during cleanup:', cleanupError);
    }

    return {
      status: 'Runtime Error',
      errorMessage: error.message,
    };
  }
};
