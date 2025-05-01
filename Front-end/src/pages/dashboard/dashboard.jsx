import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './dashboard.css';
import { getUserSubmissions } from '../../service/api.js';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  // Add state for code modal
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Fetch submissions when user loads
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const data = await getUserSubmissions(); // Using your API function
        // console.log("Submissions Data:", data); 
        setSubmissions(data);
      } catch (error) {
        console.error('Failed to fetch submissions:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (user) {
      fetchSubmissions();
    }
  }, [user]);
  
  const handleClick = () => {
    navigate(`/edit/user`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffHours < 1) return 'Just now';
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${Math.floor(diffHours / 24)} day(s) ago`;
  };

  // Process submission data for charts
  const getMonthlySubmissionData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const lastSixMonths = [];
    
    // Generate last 6 months
    for (let i = 5; i >= 0; i--) {
      const month = new Date(currentDate);
      month.setMonth(currentDate.getMonth() - i);
      lastSixMonths.push(months[month.getMonth()]);
    }
    
    // Count submissions per month
    const submissionCounts = Array(6).fill(0);
    
    submissions.forEach(submission => {
      const submissionDate = new Date(submission.updatedAt || submission.timestamp);
      for (let i = 0; i < 6; i++) {
        const monthIndex = (currentDate.getMonth() - i + 12) % 12;
        if (submissionDate.getMonth() === monthIndex && 
            submissionDate.getFullYear() === (currentDate.getMonth() >= monthIndex ? currentDate.getFullYear() : currentDate.getFullYear() - 1)) {
          submissionCounts[5 - i]++;
          break;
        }
      }
    });
    
    return {
      categories: lastSixMonths,
      data: submissionCounts
    };
  };

  const chartData = getMonthlySubmissionData();
  
  // Calculate problem counts by difficulty
  const easyCount = submissions.filter(s => s.level === 'Easy').length;
  const mediumCount = submissions.filter(s => s.level === 'Medium').length;
  const hardCount = submissions.filter(s => s.level === 'Hard').length;
  
  // Calculate total passed submissions
  const passedCount = submissions.filter(s => s.status === 'Accepted').length;

  // Modified to show code in modal instead of navigating
  const handleViewCode = (submission) => {
    setSelectedCode(submission.code);
    setSelectedLanguage(submission.language);
    setShowCodeModal(true);
  };

  return (
    <>
      <div id="dashboard" className="min-h-screen bg-gray-50 font-sans flex flex-col">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100">
          {user ? (
            <>
              <header className="bg-white shadow-lg p-6 rounded-b-2xl">
                <nav className="flex items-center justify-between">
                  <div className="flex items-center gap-4 group">
                    <span className="material-symbols-outlined text-3xl bg-blue-500 text-white p-2 rounded-lg group-hover:rotate-12 transition-transform">code</span>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                      <Link to="/">CodeQuest | User Dashboard</Link>
                    </h1>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className="material-symbols-outlined cursor-pointer hover:scale-110 transition-all duration-300 relative p-2 hover:bg-blue-50 rounded-full">
                      notifications
                      <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                    </span>
                    <div className="relative">
                      <details className="group">
                        <summary className="list-none cursor-pointer">
                          <img
                            src="https://webcrumbs.cloud/placeholder"
                            alt="profile"
                            className="w-12 h-12 rounded-full border-2 border-blue-500 hover:border-blue-600 transition-colors"
                          />
                        </summary>
                        <div className="absolute right-0 mt-2 w-[480px] bg-white rounded-2xl shadow-xl p-6 z-50">
                          <div className="flex items-center gap-6 mb-6">
                            <div className="relative group">
                              <img
                                src="https://webcrumbs.cloud/placeholder"
                                alt="profile"
                                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all"
                              />
                              <div className="absolute inset-0 bg-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="flex-1">
                              <h2 className="text-2xl font-bold mb-2">{user.username}</h2>
                              <p className="text-sm text-gray-600">{user.jobRole}</p>
                            </div>
                            <button
                              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors"
                              onClick={handleClick}
                            >
                              <span className="material-symbols-outlined text-sm">edit</span>
                              <span>Edit</span>
                            </button>
							<Link to="/logout">
							<button
                              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-accent text-white rounded-xl transition-colors"
                              
							  >
                              <span className="material-symbols-outlined text-sm">logout</span>
                              <span>logout</span>
                            </button>
								</Link>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 hover:translate-x-2 transition-transform">
                              <span className="material-symbols-outlined text-blue-500">mail</span>
                              <span className="text-sm">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 hover:translate-x-2 transition-transform">
                              <span className="material-symbols-outlined text-blue-500">location_on</span>
                              <span className="text-sm">New York, USA</span>
                            </div>
                            <div className="flex items-center gap-3 hover:translate-x-2 transition-transform">
                              <i className="fa-brands fa-linkedin text-lg text-blue-500"></i>
                              <a href={user.linkedin} className="text-sm hover:text-blue-500 transition-colors" target="_blank" rel="noreferrer">
                                {user.linkedin}
                              </a>
                            </div>
                          </div>
                          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm leading-relaxed">{user.bio}</p>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                </nav>
              </header>

              <main className="p-8 space-y-8">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-4 gap-8">
                      <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-green-500 text-3xl bg-green-50 p-3 rounded-xl">task_alt</span>
                          <div>
                            <h3 className="text-sm font-medium">Problems Solved</h3>
                            <p className="text-3xl font-bold text-green-600">{passedCount}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-blue-500 text-3xl bg-blue-50 p-3 rounded-xl">timeline</span>
                          <div>
                            <h3 className="text-sm font-medium">Submissions</h3>
                            <p className="text-3xl font-bold text-blue-600">{submissions.length}</p>
                          </div>
                        </div>
                      </div>
                      {/* <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-purple-500 text-3xl bg-purple-50 p-3 rounded-xl">workspace_premium</span>
                          <div>
                            <h3 className="text-sm font-medium">Premium Status</h3>
                            <p className="text-3xl font-bold text-purple-600">Active</p>
                          </div>
                        </div>
                      </div> */}
                      <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-orange-500 text-3xl bg-orange-50 p-3 rounded-xl">military_tech</span>
                          <div>
                            <h3 className="text-sm font-medium">Success Rate</h3>
                            <p className="text-3xl font-bold text-orange-600">
                              {submissions.length > 0 ? `${Math.round((passedCount / submissions.length) * 100)}%` : '0%'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Recent Submissions</h2>
                        {/* <Link to="/submissions" className="text-blue-500 hover:text-blue-600 flex items-center gap-1">
                          <span>View all</span>
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </Link> */}
                      </div>
                      
                      {submissions.length === 0 ? (
                        <div className="text-center py-10">
                          <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">code_off</span>
                          <p className="text-gray-500">No submissions found.</p>
                          <Link to="/practice" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                            Solve Problems
                          </Link>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="text-left border-b border-gray-200">
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Problem</th>
                                {/* <th className="px-6 py-3">Difficulty</th> */}
                                <th className="px-6 py-3">Language</th>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {submissions.slice(0, 5).map((submission, idx) => {
                                const isPassed = submission.status === 'Accepted' || submission.status === 'Passed';
                                const statusColor = isPassed ? 'green' : 'red';
                                const icon = isPassed ? 'check_circle' : 'cancel';

                                return (
                                  <tr key={idx} className="hover:bg-gray-50 border-b border-gray-100">
                                    <td className="px-6 py-4">
                                      <div className="flex items-center">
                                        <span className={`material-symbols-outlined text-${statusColor}-500`}>
                                          {icon}
                                        </span>
                                        <span className={`ml-2 text-${statusColor}-500`}>
                                          {submission.status}
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{submission.problemId}</td>
                                  
                                    <td className="px-6 py-4">
                                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                                        {submission.language}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                      {formatDate(submission.updatedAt || submission.timestamp)}
                                    </td>
                                    <td className="px-6 py-4">
                                      <div className="flex gap-3">
                                        <button
                                          onClick={() => handleViewCode(submission)}
                                          className="text-blue-500 hover:text-blue-600 flex items-center gap-1"
                                          title="View Code"
                                        >
                                          <span className="material-symbols-outlined">code</span>
                                        </button>
                                       
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </main>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Loading user data...</p>
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
    </>
  );
};

export default Dashboard;