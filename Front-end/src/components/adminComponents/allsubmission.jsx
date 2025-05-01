import React, { useEffect, useState } from 'react';
import AdminHeader from './adminheader';
import AdminSidebar from './adminsidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllSubmission } from '../../service/api.js';

const Allsubmission = () => {
  const [submissions, setSubmissions] = useState([]);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchSubmissions();
  }, [currentPage, itemsPerPage]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getAllSubmission(currentPage, itemsPerPage);
      setSubmissions(data.submissions);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch submissions');
      setLoading(false);
    }
  };

  const handleViewCode = (code, language) => {
    setSelectedCode(code);
    setSelectedLanguage(language);
    setShowCodeModal(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        <ToastContainer position="top-right" autoClose={3000} />
        <AdminHeader />

        <div className="flex flex-1">
          <AdminSidebar />

          <div className="flex-1 p-6 overflow-auto">
            <h2 className="text-2xl font-semibold mb-4">All Submissions</h2>
            
            {/* Display and page size controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="mr-2">Show</span>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className="ml-2">entries</span>
              </div>
            </div>
            
            {/* Submissions table */}
            <div className="overflow-x-auto shadow rounded-lg bg-white">
              <table className="min-w-full text-sm text-left text-gray-700 border">
                <thead className="bg-gray-100 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 border">User</th>
                    <th className="px-4 py-3 border">Problem</th>
                    <th className="px-4 py-3 border">Language</th>
                    <th className="px-4 py-3 border">Status</th>
                    <th className="px-4 py-3 border">Submitted At</th>
                    <th className="px-4 py-3 border">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-3 text-center border">
                        Loading submissions...
                      </td>
                    </tr>
                  ) : submissions.length > 0 ? (
                    submissions.map((sub, index) => (
                      <tr key={index} className="hover:bg-gray-50 border-b">
                        <td className="px-4 py-2 border">{sub.userId}</td>
                        <td className="px-4 py-2 border">{sub.problemId}</td>
                        <td className="px-4 py-2 border">{sub.language}</td>
                        <td className={`px-4 py-2 border ${sub.status === 'Accepted' ? 'text-green-600' : 'text-red-500'}`}>
                          {sub.status}
                        </td>
                        <td className="px-4 py-2 border">{new Date(sub.updatedAt).toLocaleString()}</td>
                        <td className="px-4 py-2 border">
                          <button
                            onClick={() => handleViewCode(sub.code, sub.language)}
                            className="text-blue-600 hover:underline"
                          >
                            View Code
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-3 text-center border">
                        No submissions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 0 && (
              <div className="flex justify-between items-center mt-4">
                <div>
                  Showing page {currentPage} of {totalPages}
                </div>
                <div className="flex">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    First
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border-t border-b border-r border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Prev
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show 5 page numbers centered around current page
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-3 py-1 border-t border-b border-r border-gray-300 ${
                          currentPage === pageNum ? 'bg-blue-500 text-white' : ''
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border-t border-b border-r border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border-t border-b border-r border-gray-300 rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Last
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Code Modal */}
        {showCodeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
                onClick={() => setShowCodeModal(false)}
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold mb-4">Submitted Code ({selectedLanguage})</h3>
              <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">
                {selectedCode}
              </pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Allsubmission;