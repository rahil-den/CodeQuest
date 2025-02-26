import React, { useEffect,useState } from 'react'
import Chart from 'react-apexcharts'
import { getUser } from '../../service/api.js';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'
import { Link } from 'react-router-dom';
const Dashboard = () => {
	const [user, setUser] = useState({});
	const navigate = useNavigate();
	useEffect(() => {
		 getUser().then((data) => {
			console.log(data);
			setUser(data.user);
		});
	}, []);

	const handleClick = () => {
		console.log('Edit User');
		navigate(`/edit/user`);
	};
  return (
    <>
   <div id="webcrumbs"> 
        	<div className=" bg-gradient-to-br from-gray-50 to-gray-100">
	    <header className="bg-white shadow-lg p-6 rounded-b-2xl">
	        <nav className="flex items-center justify-between">
	            <div className="flex items-center gap-4 group">
					
	                <span className="material-symbols-outlined text-3xl bg-blue-500 text-white p-2 rounded-lg group-hover:rotate-12 transition-transform">code</span>
	                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"><Link to="/">CodeQuest | User Dashboard</Link></h1>
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
	                                    <p className="text-sm text-gray-600">Frontend Developer</p>
	                                </div>
	                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors">
	                                    <span className="material-symbols-outlined text-sm">edit</span>
	                                    <span onClick={handleClick}>Edit</span>
	                                </button>
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
	                                    <a href="#" className="text-sm hover:text-blue-500 transition-colors">linkedin.com/in/johndoe</a>
	                                </div>
	                            </div>
	                            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
	                                <p className="text-sm leading-relaxed">
	                                    Experienced frontend developer with expertise in React, JSX, and Tailwind CSS.
	                                    Passionate about creating beautiful and responsive user interfaces.
	                                </p>
	                            </div>
	                        </div>
	                    </details>
	                </div>
	            </div>
	        </nav>
	    </header>
	
	    <main className="p-8 space-y-8">
	        <div className="grid grid-cols-4 gap-8">
	            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
	                <div className="flex items-center gap-4">
	                    <span className="material-symbols-outlined text-green-500 text-3xl bg-green-50 p-3 rounded-xl">task_alt</span>
	                    <div>
	                        <h3 className="text-sm font-medium">Problems Solved</h3>
	                        <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">245</p>
	                    </div>
	                </div>
	            </div>
	            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
	                <div className="flex items-center gap-4">
	                    <span className="material-symbols-outlined text-yellow-500 text-3xl bg-yellow-50 p-3 rounded-xl">military_tech</span>
	                    <div>
	                        <h3 className="text-sm font-medium">Contest Rating</h3>
	                        <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent">1856</p>
	                    </div>
	                </div>
	            </div>
	            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
	                <div className="flex items-center gap-4">
	                    <span className="material-symbols-outlined text-blue-500 text-3xl bg-blue-50 p-3 rounded-xl">timeline</span>
	                    <div>
	                        <h3 className="text-sm font-medium">Submissions</h3>
	                        <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">789</p>
	                    </div>
	                </div>
	            </div>
	            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
	                <div className="flex items-center gap-4">
	                    <span className="material-symbols-outlined text-purple-500 text-3xl bg-purple-50 p-3 rounded-xl">workspace_premium</span>
	                    <div>
	                        <h3 className="text-sm font-medium">Premium Status</h3>
	                        <p className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Active</p>
	                    </div>
	                </div>
	            </div>
	        </div>
	
	        <div className="grid grid-cols-3 gap-8">
	            <div className="bg-white p-8 rounded-2xl shadow-lg col-span-2 hover:shadow-xl transition-all">
	                <h2 className="text-xl font-bold mb-6">Solving Progress</h2>
	                <Chart
	                    type="area"
	                    height={320}
	                    options={{
	                        chart: {toolbar: {show: false}},
	                        stroke: {curve: "smooth", width: 3},
	                        fill: {type: "gradient", gradient: {shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.2}},
	                        xaxis: {categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
	                    }}
	                    series={[{name: "Problems Solved", data: [30, 40, 35, 50, 49, 60]}]}
	                />
	            </div>
	
	            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
	                <h2 className="text-xl font-bold mb-6">Problem Types</h2>
	                <Chart
	                    type="donut"
	                    height={320}
	                    options={{
	                        chart: {toolbar: {show: false}},
	                        labels: ["Easy", "Medium", "Hard"],
	                        colors: ['#10B981', '#3B82F6', '#EF4444']
	                    }}
	                    series={[45, 35, 20]}
	                />
	            </div>
	        </div>
	
	        <div className="bg-white p-8 rounded-2xl shadow-lg">
	            <h2 className="text-xl font-bold mb-6">Recent Submissions</h2>
	            <div className="space-y-4">
	                <div className="flex items-center justify-between p-6 hover:bg-gray-50 rounded-xl transition-all duration-300 hover:shadow-md">
	                    <div className="flex items-center gap-6">
	                        <span className="material-symbols-outlined text-green-500 bg-green-50 p-2 rounded-lg">check_circle</span>
	                        <div>
	                            <h3 className="font-semibold">Two Sum</h3>
	                            <p className="text-sm text-gray-500">Easy</p>
	                        </div>
	                    </div>
	                    <p className="text-sm bg-gray-100 px-4 py-2 rounded-full">2 hours ago</p>
	                </div>
	                <div className="flex items-center justify-between p-6 hover:bg-gray-50 rounded-xl transition-all duration-300 hover:shadow-md">
	                    <div className="flex items-center gap-6">
	                        <span className="material-symbols-outlined text-green-500 bg-green-50 p-2 rounded-lg">check_circle</span>
	                        <div>
	                            <h3 className="font-semibold">Add Two Numbers</h3>
	                            <p className="text-sm text-gray-500">Medium</p>
	                        </div>
	                    </div>
	                    <p className="text-sm bg-gray-100 px-4 py-2 rounded-full">5 hours ago</p>
	                </div>
	                <div className="flex items-center justify-between p-6 hover:bg-gray-50 rounded-xl transition-all duration-300 hover:shadow-md">
	                    <div className="flex items-center gap-6">
	                        <span className="material-symbols-outlined text-red-500 bg-red-50 p-2 rounded-lg">cancel</span>
	                        <div>
	                            <h3 className="font-semibold">Median of Two Sorted Arrays</h3>
	                            <p className="text-sm text-gray-500">Hard</p>
	                        </div>
	                    </div>
	                    <p className="text-sm bg-gray-100 px-4 py-2 rounded-full">1 day ago</p>
	                </div>
	            </div>
	        </div>
	    </main>
	</div> 
        </div>
    </>
  )
}

export default Dashboard
