import React, { useState, useEffect } from 'react'

import AdminHeader from './adminheader.jsx'
import AdminSidebar from './adminsidebar.jsx'
import { getAlluser, deleteUser as deleteUserapi } from '../../service/api.js'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Alluser = () => {
  const [isUser, setIsUser] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10); // default is 10
  const [loading, setLoading] = useState(true) // Loading state
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAlluser(page, limit)
        const filteredUsers = data.users.filter(user => user.role !== 'admin')
        setIsUser(filteredUsers)
        // setIsUser(data.users)
        setTotalPages(data.totalPages || 1)
      } catch (error) {
        console.error("Error fetching users:", error)
        toast.error("Failed to fetch users.")
      }
    }
    fetchUsers()
  }, [page, limit]) 
  

  const formatLinkedInURL = (url) => {
    if (!url) return null
    return url.startsWith('http') ? url : `https://${url}`
  }

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?")
    if (!confirmDelete) return

    try {
      await deleteUserapi(userId)
      toast.success("User deleted successfully.")
      setTimeout(() => {
        window.location.reload()
      }, 1000)
      setIsUser((prev) => prev.filter((user) => user.id !== userId))
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Failed to delete user.")
    }
  }

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} />
      <AdminHeader />
      <div className="flex flex-1 relative">
        <AdminSidebar />
        <div className="flex-1 pb-16 md:pb-0 p-4">
          <h2 className="text-xl font-semibold mb-4">All Users</h2>
          <div className="flex items-center gap-2">
    <label htmlFor="limit" className="text-sm font-medium">Users per page:</label>
    <select
      id="limit"
      value={limit}
      onChange={(e) => {
        setLimit(parseInt(e.target.value))
        setPage(1) // Reset to page 1 when limit changes
      }}
      className="border border-gray-300 rounded px-2 py-1 text-sm"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
    </select>
  </div>
          <div className="border rounded-md overflow-hidden shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-sm font-medium">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Username</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">LinkedIn</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Job Role</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Bio</th>
                  <th className="px-4 py-2 text-center text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {isUser.length > 0 ? (
                  isUser.map((user) => (
                    // i want this to come in ascending order of id
                    // i.e. 1,2,3,4,5,6,7,8,9,10
                  
                    <tr key={user.id} className="border-t hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-2">{user.id}</td>
                      <td className="px-4 py-2">{user.username}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">
                        {user.linkedin ? (
                          <a
                            href={formatLinkedInURL(user.linkedin)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            LinkedIn
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-2">{user.jobRole || <span className="text-gray-400 italic">N/A</span>}</td>
                      <td className="px-4 py-2">{user.bio || <span className="text-gray-400 italic">N/A</span>}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete user"
                        >
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-center items-center gap-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded"
            >
              Prev
            </button>
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alluser
