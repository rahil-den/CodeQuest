import React, { useState, useEffect } from "react";
import ProblemDescription from "../components/problemdescription";
import CodeEditor from "../components/codeeditor";
import ConsoleOutput from "../components/consoleouput";
import AiChatSidebar from "../components/aichatsidebar";
import TalkWithBuddyButton from "../components/talkwithbudy";
import LanguageSelector from "../components/languageselector";
import { Button } from "@mui/material";
import { PlayCircle, CheckCircle2, X, MessageCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createSubmission,getProblemById, generateAIResponse } from "../service/api"; 

const SolveProblemPage = () => {
  const [selectedProblem, setSelectedProblem] = useState();
  const { id } = useParams(); // Assuming you're using react-router-dom for routing
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(true);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [code, setCode] = useState(`def twoSum(nums, target):
    # Write your solution here
    pass

# Test example
nums = [2, 7, 11, 15]
target = 9
print(twoSum(nums, target))`);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isCompileError, setIsCompileError] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("python");
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [iscode, setIsCode] =useState();
  const [aiMessages, setAiMessages] = useState([
    { role: "assistant", content: "Hello! I'm your coding assistant. How can I help you with the Two Sum problem?" },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const languageOptions = [
    { label: "Python", value: "python" },
    
  ];

  useEffect(() => {
    setSelectedProblem(id);
    const fetchProblem = async () => {
     const response = await getProblemById(id);
    //  console.log(response);
     setIsCode(response);
    }
    fetchProblem();
  }, []);
  // Handle code change in Monaco
  const handleCodeChange = (newValue) => {
    setCode(newValue);


  };

  // Run code - Mock for now
  const runCode = async () => {
    setIsRunning(true);
    setIsCompileError(false);
    console.log("Running code...");
  
    try {
      console.log("Sending request to server...");
      const response = await fetch("https://codequest-service.onrender.com/api/execute/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you have a token stored in localStorage
        },
        body: JSON.stringify({
          problemId: selectedProblem,
          code: code,
          language: currentLanguage,
        }),
      });
      
  
      const result = await response.json();
      console.log("Received response from server:", result);
  
      if (response.ok) {
        console.log("Code executed successfully:", response);
        setOutput(
          result.status === "Accepted"
            ? `✅ Output: All test cases passed.\nExecution Time: ${result.executionTime} ms`
            : `❌ Error: ${result.errorMessage || "Test cases failed"}`
        );
        setIsCompileError(result.status !== "Accepted");
      } else {
        setOutput(`❌ Error: ${result.error || "Unknown error occurred."}`);
        setIsCompileError(true);
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
      setOutput(`❌ Error: Failed to connect to server.`);
      setIsCompileError(true);
    } finally {
      setIsRunning(false);
    }
  };
  
  
const submitCode = async () => {
  setIsRunning(true);
  setOutput(""); // Clear previous output
  setIsCompileError(false);

  try {
    const submissionData = {
      problemId: selectedProblem,
      code,
      language: currentLanguage,
    };

    const result = await createSubmission(submissionData);
    // console.log("Submission result:", result);
    if (result.submission.status === "Accepted") {
      setOutput(`✅ Code submitted successfully!\nAll test cases passed.\nExecution Time: ${result.executionTime} ms`);
      setIsCompileError(false);
    } else {
      setOutput(`❌ Submission Failed.\nError: ${result.errorMessage || "Some test cases failed."}`);
      setIsCompileError(true);
    }
  } catch (error) {
    console.error("Submission error:", error);
    setOutput(`❌ Error submitting code: ${error.message || "Server error"}`);
    setIsCompileError(true);
  } finally {
    setIsRunning(false);
  }
};

  // Change language in Monaco
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  // Toggle Description
  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  // Toggle AI Chat Sidebar
  const toggleAiChat = () => {
    setIsAiChatOpen(!isAiChatOpen);
  };

  // Handle user AI chat input
  const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  // Send AI Message - Mock
  const sendMessage = async () => {
    if (userMessage.trim() === "") return;
  
    const updatedMessages = [...aiMessages, { role: "user", content: userMessage }];
    setAiMessages(updatedMessages);
    setUserMessage("");
  
    try {
      const aiReply = await generateAIResponse(userMessage);
      const newMessage = {
        role: "assistant",
        content: aiReply || "Sorry, I didn't get that. Could you try rephrasing?",
      };
  
      setAiMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error("AI Response error:", error);
      setAiMessages((prev) => [
        ...prev,
        { role: "assistant", content: "❌ Failed to get response. Please try again later." },
      ]);
    }
  };
  

  const talkWithBuddy = () => {
    console.log("Talk with Code Buddy clicked");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Problem Description Panel */}
      <ProblemDescription isExpanded={isDescriptionExpanded} toggleDescription={toggleDescription} problemdescirption={iscode} />

      {/* Code Editor Panel */}
      <div className="flex-1 flex flex-col h-full relative">
        <div className="p-3 border-b flex justify-between items-center">
          <LanguageSelector
            currentLanguage={currentLanguage}
            isMenuOpen={isLanguageMenuOpen}
            setIsMenuOpen={setIsLanguageMenuOpen}
            languageOptions={languageOptions}
            onChangeLanguage={changeLanguage}
          />

          <div className="flex space-x-2">
            <TalkWithBuddyButton onClick={talkWithBuddy} />
            <Button
              variant="outlined"
              size="small"
              className={isCompileError ? "border-red-500 text-red-500" : ""}
              onClick={runCode}
              disabled={isRunning}
            >
              <PlayCircle className="w-4 h-4 mr-1" />
              Run
            </Button>

            <Button size="small" className="text-xs h-8" onClick={submitCode} disabled={isRunning}>
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Submit
            </Button>
          </div>
        </div>

        {/* Monaco Code Editor */}
        <CodeEditor code={code} onChange={handleCodeChange} isCompileError={isCompileError} scode={iscode} />

        {/* Console Output */}
        <ConsoleOutput output={output} isCompileError={isCompileError} />

        {/* AI Assistant Toggle Button */}
        <button
          onClick={toggleAiChat}
          className={`absolute bottom-4 right-4 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-colors ${
            isAiChatOpen ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isAiChatOpen ? <X className="w-5 h-5 text-white" /> : <MessageCircle className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* AI Chat Sidebar */}
      <div
  className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300 ${
    isAiChatOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <AiChatSidebar
    messages={aiMessages}
    userMessage={userMessage}
    onChangeUserMessage={handleUserMessageChange}
    onSendMessage={sendMessage}
    onClose={toggleAiChat}
  />
</div>

    </div>
  );
};

export default SolveProblemPage;
