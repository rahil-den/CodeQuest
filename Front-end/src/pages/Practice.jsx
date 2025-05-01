import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeaderProblem from "../components/problemheader.jsx";
import { BarChart2, Filter, Search, ExternalLink, X } from "lucide-react";
import { getAllProblems } from "../service/api.js";

const PracticeTable = () => {
  // State for search input
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for filters
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: [],
    tags: []  // Changed from category to tags
  });
  
  // Original problems data - initialize as empty array
  const [allProblems, setAllProblems] = useState([]);
  
  // Arrays to store unique tags and difficulties
  const [tags, setTags] = useState([]); // Changed from categories to tags
  const [difficulties, setDifficulties] = useState([]);
  
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const response = await getAllProblems();
        const data = response || [];
        
        // Sort problems by ID in ascending order
        const sortedData = [...data].sort((a, b) => {
          // Convert IDs to numbers if they're numeric, otherwise compare as strings
          const idA = isNaN(Number(a.id)) ? a.id : Number(a.id);
          const idB = isNaN(Number(b.id)) ? b.id : Number(b.id);
          
          if (typeof idA === 'number' && typeof idB === 'number') {
            return idA - idB;
          }
          return String(idA).localeCompare(String(idB));
        });
        
        setAllProblems(sortedData);
        
        // Extract unique tags and difficulties
        // Handling tags as an array if it exists, otherwise use an empty array
        const allTags = sortedData.reduce((acc, problem) => {
          const problemTags = problem.tags || [];
          // If tags is a string, convert to array
          const tagsArray = Array.isArray(problemTags) ? problemTags : [problemTags];
          tagsArray.forEach(tag => {
            if (tag && !acc.includes(tag)) {
              acc.push(tag);
            }
          });
          return acc;
        }, []);
        
        setTags(allTags);
        setDifficulties([...new Set(sortedData.map(p => p.difficulty))]);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching problems:", error);
        setLoading(false);
        // Initialize with empty arrays on error
        setAllProblems([]);
        setTags([]);
        setDifficulties([]);
      }
    };
    fetchProblems();
  }, []);

  // Filter problems based on search term and selected filters
  const filteredProblems = allProblems.filter(problem => {
    // Search term filter
    const matchesSearch = searchTerm === "" || 
      problem.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (problem.id && problem.id.toString().includes(searchTerm)) ||
      problem.difficulty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // Search in tags if they exist
      (problem.tags && (
        Array.isArray(problem.tags) 
          ? problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
          : problem.tags.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    
    // Difficulty filter
    const matchesDifficulty = filters.difficulty.length === 0 || 
      filters.difficulty.includes(problem.difficulty);
    
    // Tags filter
    const matchesTags = filters.tags.length === 0 || 
      (problem.tags && (
        Array.isArray(problem.tags)
          ? problem.tags.some(tag => filters.tags.includes(tag))
          : filters.tags.includes(problem.tags)
      ));
    
    return matchesSearch && matchesDifficulty && matchesTags;
  });

  // Function to get the appropriate color class based on difficulty
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "Medium":
        return "text-amber-600 bg-amber-50 border-amber-200";
      case "Hard":
        return "text-rose-600 bg-rose-50 border-rose-200";
      default:
        return "";
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Toggle filter panel
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Handle filter change
  const handleFilterChange = (type, value) => {
    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters };
      
      if (updatedFilters[type].includes(value)) {
        // Remove the value if it's already selected
        updatedFilters[type] = updatedFilters[type].filter(item => item !== value);
      } else {
        // Add the value if it's not already selected
        updatedFilters[type] = [...updatedFilters[type], value];
      }
      
      return updatedFilters;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      difficulty: [],
      tags: [] // Changed from category to tags
    });
  };

  // Count active filters
  const activeFilterCount = filters.difficulty.length + filters.tags.length;
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }
  
  if (!allProblems || allProblems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">No problems available</p>
      </div>
    );
  }
  
  return (
    <>
      <HeaderProblem />
      
      <div className="container mx-auto p-4 pt-20 max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">Problems</h1>
        
        <div className="mb-6 flex items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search problems..." 
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <button 
            className={`flex items-center px-3 py-2 text-sm border rounded-md hover:bg-gray-50 ${activeFilterCount > 0 ? 'bg-blue-50 border-blue-200 text-blue-600' : ''}`}
            onClick={toggleFilters}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
          </button>
        </div>
        
        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 p-4 border rounded-md bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Filters</h3>
              <div className="flex items-center">
                <button 
                  className="text-sm text-gray-500 hover:text-gray-700 mr-4"
                  onClick={clearFilters}
                >
                  Clear all
                </button>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={toggleFilters}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Difficulty Filter */}
              <div>
                <h4 className="text-sm font-medium mb-2">Difficulty</h4>
                <div className="space-y-2">
                  {difficulties.map(difficulty => (
                    <label key={difficulty} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded text-blue-500 mr-2"
                        checked={filters.difficulty.includes(difficulty)}
                        onChange={() => handleFilterChange('difficulty', difficulty)}
                      />
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(difficulty)}`}>
                        {difficulty}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Tags Filter */}
              <div>
                <h4 className="text-sm font-medium mb-2">Tags</h4>
                <div className="space-y-2">
                  {tags.map(tag => (
                    <label key={tag} className="flex items-center">
                      <input 
                        type="checkbox" 
                        className="rounded text-blue-500 mr-2"
                        checked={filters.tags.includes(tag)}
                        onChange={() => handleFilterChange('tags', tag)}
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="border rounded-md overflow-hidden shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-sm">Number</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Title</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Difficulty</th>
                <th className="px-4 py-3 text-left font-medium text-sm">Tags</th>
                <th className="px-4 py-3 text-center font-medium text-sm">View</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => (
                  <tr 
                    key={problem.id} 
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">{problem.id}</td>
                    <td className="px-4 py-3">
                      <Link 
                        to={`/problem/${problem.id}`} 
                        className="text-blue-600 hover:underline font-medium"
                        target="_blank"
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                        <BarChart2 className="w-3 h-3 mr-1" />
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {problem.tags && (
                        Array.isArray(problem.tags) 
                          ? problem.tags.join(", ") 
                          : problem.tags
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link 
                        to={`/Problem/${problem.id}`} 
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Solve this problem" target="_blank"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                    No problems found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing <strong>{filteredProblems.length}</strong> of <strong>{allProblems.length}</strong> problems
          </p>
          
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border rounded-md bg-gray-50 text-gray-400 cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PracticeTable;