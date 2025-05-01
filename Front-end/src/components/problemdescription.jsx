import React from 'react';
import { Bookmark, BarChart2, Medal, ChevronLeft, ChevronRight } from 'lucide-react';

// Helper function to replace cn from @/lib/utils
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};


const ProblemDescription = ({ isExpanded, toggleDescription,problemdescirption }) => {
  if (!problemdescirption) return <div>Loading...</div>; 
  return (
    
    <div 
      className={classNames(
        "border-r transition-all duration-300 flex flex-col",
        isExpanded ? "w-2/5" : "w-12"
      )}
    >
      {isExpanded ? (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-3 border-b">
            <h1 className="text-lg font-semibold"> {problemdescirption.title}</h1>
            <button 
              onClick={toggleDescription}
              className="p-1 rounded-md hover:bg-muted"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                  <BarChart2 className="w-3 h-3 mr-1" />
                  {problemdescirption.difficulty}
                </span>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                {/* <Bookmark className="w-5 h-5" /> */}
              </button>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <p>
                {problemdescirption.description}
              </p>
              <p>
                You can return the answer in any order.
              </p>
              
              <h3 className="text-base font-medium mt-6 mb-2">Example 1:</h3>
              <pre className="text-sm bg-secondary/50 p-3 rounded-md">
                <code>
                  {problemdescirption.examples}
                </code>
              </pre>
              
              <h3 className="text-base font-medium mt-4 mb-2">Example 2:</h3>
              <pre className="text-sm bg-secondary/50 p-3 rounded-md">
                <code>
                  {problemdescirption.examples2}
                </code>
              </pre>
              
              <h3 className="text-base font-medium mt-4 mb-2">Example 3:</h3>
              <pre className="text-sm bg-secondary/50 p-3 rounded-md">
                <code>
                  Input: nums = [3,3], target = 6
                  Output: [0,1]
                </code>
              </pre>
              
              <h3 className="text-base font-medium mt-6 mb-2">Constraints:</h3>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li><code>{problemdescirption.constraints}</code></li>
               
                <li><strong>Only one valid answer exists.</strong></li>
              </ul>
              
              <h3 className="text-base font-medium mt-6 mb-2">Follow-up:</h3>
              <p>
                Can you come up with an algorithm that is less than <code>O(n²)</code> time complexity?
              </p>
            </div>
            
            {/* <div className="mt-6 bg-muted/30 rounded-lg p-4 border">
              <h3 className="text-sm font-medium flex items-center mb-2">
                <Medal className="w-4 h-4 mr-1.5" />
                Hints
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  1. A brute force approach would be to check every pair of numbers.
                </p>
                <p className="text-muted-foreground">
                  2. Consider using a hash map to store values you've seen as you iterate through the array.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <button 
            onClick={toggleDescription}
            className="p-2 rounded-md hover:bg-muted"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProblemDescription;