import React from 'react';

const DashboardContent = () => {
  return (
    <main className="flex-1 p-4 md:p-6 overflow-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome to your admin dashboard. Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold mt-1">2,431</h3>
              <span className="text-green-500 text-sm flex items-center mt-1">
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 3L20 11H15V21H9V11H4L12 3Z" fill="currentColor" />
                </svg>
                12.5% <span className="text-gray-400 ml-1">vs last month</span>
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
              <span className="material-symbols-outlined">group</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Problems Created</p>
              <h3 className="text-2xl font-bold mt-1">856</h3>
              <span className="text-green-500 text-sm flex items-center mt-1">
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 3L20 11H15V21H9V11H4L12 3Z" fill="currentColor" />
                </svg>
                8.2% <span className="text-gray-400 ml-1">vs last month</span>
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
              <span className="material-symbols-outlined">code</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Submissions</p>
              <h3 className="text-2xl font-bold mt-1">14,235</h3>
              <span className="text-red-500 text-sm flex items-center mt-1">
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21L4 13H9V3H15V13H20L12 21Z" fill="currentColor" />
                </svg>
                3.1% <span className="text-gray-400 ml-1">vs last month</span>
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-500">
              <span className="material-symbols-outlined">upload_file</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Acceptance Rate</p>
              <h3 className="text-2xl font-bold mt-1">48.7%</h3>
              <span className="text-green-500 text-sm flex items-center mt-1">
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 3L20 11H15V21H9V11H4L12 3Z" fill="currentColor" />
                </svg>
                2.3% <span className="text-gray-400 ml-1">vs last month</span>
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500">
              <span className="material-symbols-outlined">analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="font-medium text-gray-800">User Growth</h3>
            <div className="flex gap-2 flex-wrap">
              <button className="text-sm px-3 py-1 rounded-md bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors">
                Weekly
              </button>
              <button className="text-sm px-3 py-1 rounded-md hover:bg-gray-50 transition-colors">
                Monthly
              </button>
              <button className="text-sm px-3 py-1 rounded-md hover:bg-gray-50 transition-colors">
                Yearly
              </button>
            </div>
          </div>
          <div className="h-[240px] flex items-center justify-center bg-gray-50 rounded-lg">
            {/* Chart placeholder */}
            <div className="flex flex-col items-center text-gray-400">
              <span className="material-symbols-outlined text-4xl mb-2">insert_chart</span>
              <span>User Growth Chart</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="font-medium text-gray-800">Problem Difficulty Distribution</h3>
            <select className="text-sm rounded-md border border-gray-200 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>All Time</option>
              <option>This Month</option>
              <option>This Week</option>
            </select>
          </div>
          <div className="h-[240px] flex items-center justify-center bg-gray-50 rounded-lg">
            {/* Chart placeholder */}
            <div className="flex flex-col items-center text-gray-400">
              <span className="material-symbols-outlined text-4xl mb-2">pie_chart</span>
              <span>Problem Difficulty Chart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-800">Recent Users</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1">
            View All
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
                >
                  Role
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell"
                >
                  Last Active
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-medium text-sm">
                        {["JD", "SM", "AK", "TS", "RL"][item - 1]}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {["John Doe", "Sarah Miller", "Alex Kim", "Tom Smith", "Rebecca Lee"][item - 1]}
                        </div>
                        <div className="text-sm text-gray-500 hidden sm:block">
                          {[
                            "john@example.com",
                            "sarah@example.com",
                            "alex@example.com",
                            "tom@example.com",
                            "rebecca@example.com",
                          ][item - 1]}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      {["User", "Admin", "User", "Moderator", "User"][item - 1]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        [
                          "bg-green-100 text-green-800",
                          "bg-green-100 text-green-800",
                          "bg-yellow-100 text-yellow-800",
                          "bg-green-100 text-green-800",
                          "bg-red-100 text-red-800",
                        ][item - 1]
                      }`}
                    >
                      {["Active", "Active", "Away", "Active", "Inactive"][item - 1]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                    {[
                      "Today, 10:30 AM",
                      "Yesterday, 2:43 PM",
                      "3 days ago",
                      "Today, 9:15 AM",
                      "1 week ago",
                    ][item - 1]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button className="text-gray-500 hover:text-primary-600">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                      <button className="text-gray-500 hover:text-blue-600">
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="text-gray-500 hover:text-red-600">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 border-t pt-4 gap-4">
          <div className="text-sm text-gray-500">Showing 5 of 24 users</div>
          <div className="flex gap-2 flex-wrap justify-center">
            <button className="px-3 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 rounded border border-gray-200 bg-primary-50 text-primary-600 hover:bg-primary-100 transition-colors">
              1
            </button>
            <button className="px-3 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-3 py-1 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContent;