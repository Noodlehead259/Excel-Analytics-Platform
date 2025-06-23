import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import FileUpload from '../components/upload/FileUpload';
import UploadHistory from '../components/dashboard/UploadHistory';
import StatsCards from '../components/dashboard/StatsCards';
import { Plus, FileSpreadsheet } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { uploads } = useData();

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-white/70">
            Upload and analyze your Excel files to create stunning visualizations
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Upload New File</span>
                </h2>
              </div>
              <FileUpload />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500/20 to-teal-500/20 text-white p-3 rounded-lg hover:from-blue-500/30 hover:to-teal-500/30 transition-all duration-200 flex items-center space-x-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Sample Data</span>
                </button>
                <button className="w-full bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white p-3 rounded-lg hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-200">
                  View Tutorial
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {uploads.slice(0, 3).map((upload) => (
                  <div key={upload.id} className="flex items-center space-x-3 p-2 rounded-lg bg-white/5">
                    <FileSpreadsheet className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{upload.filename}</p>
                      <p className="text-xs text-white/60">
                        {new Date(upload.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {uploads.length === 0 && (
                  <p className="text-white/60 text-sm">No recent activity</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Upload History */}
        <div className="mt-8">
          <UploadHistory />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;