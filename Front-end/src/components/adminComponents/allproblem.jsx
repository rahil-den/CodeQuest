import React, { useEffect, useState } from 'react'

import AdminHeader from './adminheader.jsx'
import AdminSidebar from './adminsidebar.jsx'

// import { getAllProblems, deleteProblem } from '../../service/api.js'
import { getAllProblems, deleteProblem } from '../../service/api.js'
// import React from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Allproblem = () => {
  const [isProblem, setIsProblem] = useState([]) // Holds fetched problems
  const [loading, setLoading] = useState(true) // Loading state
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await getAllProblems()

        setIsProblem(data) // Set directly, not data.problems
      } catch (error) {
        console.error("Error fetching problems:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProblems()
  }, [])

  const handledelete = async (problemId) => {
    // Handle delete action here, e.g., call API to delete the problem
    const confirmDelete = window.confirm("Are you sure you want to delete this problem?")
    if (!confirmDelete) return
    try {
      // Call API to delete the problem
      const response = await deleteProblem(problemId)

      toast.success ("Problem deleted successfully.")
      setTimeout(() => {
        window.location.reload()
      }, 1000)
      
      
    } catch (error) {
      console.error("Error deleting problem:", error)
      // Handle error, e.g., show a toast notification
      
    }
    console.log(`Delete problem with ID: ${problemId}`)
  }
  // Helper to get difficulty badge color
  const getBadgeColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

const handleedit = (problemId) => {
  // Handle edit action here, e.g., navigate to edit page
  navigate(`/admin/dashboard/editproblem/${problemId}`)
  console.log(`Edit problem with ID: ${problemId}`)
}
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Top Header */}
      <AdminHeader />

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">All Problems</h1>

          <div className="overflow-x-auto">
            <div className="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full text-sm text-left text-gray-700">
  <thead className="bg-gray-100 text-gray-900 text-base font-semibold">
    <tr>
      <th className="px-6 py-4">#</th>
      <th className="px-6 py-4">Title</th>
      <th className="px-6 py-4">Difficulty</th>
      <th className="px-6 py-4">Actions</th>
    </tr>
  </thead>
  <tbody>
    {loading ? (
      <tr>
        <td colSpan="4" className="text-center px-6 py-8 text-gray-500">
          Loading problems...
        </td>
      </tr>
    ) : isProblem.length === 0 ? (
      <tr>
        <td colSpan="4" className="text-center px-6 py-8 text-gray-500">
          No problems found.
        </td>
      </tr>
    ) : (
      isProblem.map((problem, index) => (
        <tr key={problem.id} className="hover:bg-gray-50 transition">
          <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
          <td className="px-6 py-4">{problem.title}</td>
          <td className="px-6 py-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
          </td>
          <td className="px-6 py-4 space-x-3">
          
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs" onClick={() => handleedit(problem.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L3.586 12.586A2 2 0 003 14v4a1 1 0 001 1h4a2 2 0 001.414-.586l11-11a2 2 0 000-2.828zM5.414 16H4v-1.414l10-10L15.414 6l-10 10V16h1.414z" /></svg>
              Edit
            </button>
         
            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"   onClick={() => handledelete(problem.id)}>
              Delete
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Allproblem
