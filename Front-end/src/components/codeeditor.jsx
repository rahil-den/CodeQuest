import React from "react";
import MonacoEditor from "@monaco-editor/react";

const CodeEditor = ({ code, onChange }) => {
  return (
    <div className="w-full h-full">
      <MonacoEditor
        height="100%"
        language="python"
        theme="vs-dark"
        value={code}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          tabSize: 2,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
