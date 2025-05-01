import React from 'react';

// Helper function to replace cn from @/lib/utils
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const ConsoleOutput = ({ output, isCompileError }) => {
  return (
    <div className="h-1/3 border-t flex flex-col max-w-full">
      <div className="p-2 bg-muted/30 border-b text-sm font-medium flex justify-between items-center">
        <span>Console Output</span>
        {isCompileError && <span className="text-red-500 text-xs">Compilation Error</span>}
      </div>
      <div 
        className={classNames(
          "flex-1 p-3 font-mono text-sm overflow-auto whitespace-pre",
          isCompileError ? "bg-red-50 text-red-900" : "bg-card/20"
        )}
      >
        {output || 'Run your code to see the output here.'}
      </div>
    </div>
  );
};

export default ConsoleOutput;