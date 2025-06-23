import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { 
  Users, 
  FileSpreadsheet, 
  BarChart3, 
  TrendingUp,
  Shield,
  Database
} from 'lucide-react';

const Admin = () => {
  const { user } = useAuth();
  const { uploads } = useData();

  const totalFiles = uploads.length;
  const totalCharts = uploads.reduce((acc, upload) => acc + upload.charts.length, 0);
  const totalRows = uploads.reduce((acc, upload) => acc + upload.data.length, 0);

  const adminStats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      title: 'Files Uploaded',
      value: totalFiles.toLocaleString(),
      icon: FileSpreadsheet,
      color: 'from-teal-500 to-teal-600',
      change: '+8%'
    },
    {
      title: 'Charts Created',
      value: totalCharts.toLocaleString(),
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      change: '+15%'
    },
    {
      title: 'Data Processed',
      value: `${(totalRows / 1000).toFixed(1)}K rows`,
      icon: Database,
      color: 'from-orange-500 to-orange-600',
      change: '+23%'
    }
  ];

  const recentActivity = [
    { user: 'john@example.com', action: 'Uploaded sales_data.xlsx', time: '2 minutes ago' },
    { user: 'sarah@example.com', action: 'Created bar chart', time: '5 minutes ago' },
    { user: 'mike@example.com', action: 'Downloaded report.pdf', time: '10 minutes ago' },
    { user: 'lisa@example.com', action: 'Uploaded inventory.xlsx', time: '15 minutes ago' },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="h-6 w-6 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <p className="text-white/70">
            Welcome back, {user?.name}. Here's what's happening on your platform.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Recent Activity</span>
            </h2>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-500 w-2 h-2 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-white/60 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>System Status</span>
            </h2>
            
            <div className="space-y-4">
              {[
                { service: 'API Server', status: 'Operational', uptime: '99.9%' },
                { service: 'Database', status: 'Operational', uptime: '99.8%' },
                { service: 'File Storage', status: 'Operational', uptime: '100%' },
                { service: 'Analytics Engine', status: 'Operational', uptime: '99.7%' }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white text-sm">{service.service}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 text-sm font-medium">{service.status}</p>
                    <p className="text-white/60 text-xs">{service.uptime} uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-gradient-to-r from-blue-500/20 to-teal-500/20 text-white p-4 rounded-lg hover:from-blue-500/30 hover:to-teal-500/30 transition-all duration-200 text-left">
                <Users className="h-6 w-6 mb-2" />
                <h3 className="font-medium">Manage Users</h3>
                <p className="text-sm text-white/70">View and manage user accounts</p>
              </button>
              
              <button className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white p-4 rounded-lg hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200 text-left">
                <BarChart3 className="h-6 w-6 mb-2" />
                <h3 className="font-medium">Analytics</h3>
                <p className="text-sm text-white/70">View detailed platform analytics</p>
              </button>
              
              <button className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white p-4 rounded-lg hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-200 text-left">
                <Shield className="h-6 w-6 mb-2" />
                <h3 className="font-medium">Security</h3>
                <p className="text-sm text-white/70">Configure security settings</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;