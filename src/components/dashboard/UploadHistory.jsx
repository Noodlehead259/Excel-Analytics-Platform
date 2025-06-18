import React from 'react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';
import { FileSpreadsheet, Calendar, BarChart3, Download } from 'lucide-react';

const UploadHistory = () => {
  const { uploads } = useData();

  if (uploads.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
        <FileSpreadsheet className="h-12 w-12 text-white/50 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">No Files Uploaded Yet</h3>
        <p className="text-white/70">Upload your first Excel file to get started with analytics</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
          <FileSpreadsheet className="h-5 w-5" />
          <span>Upload History</span>
        </h2>
        <span className="text-white/60 text-sm">{uploads.length} files</span>
      </div>

      <div className="space-y-4">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-2 rounded-lg">
                  <FileSpreadsheet className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{upload.filename}</h3>
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(upload.uploadDate).toLocaleDateString()}</span>
                    </span>
                    <span>{upload.data.length} rows</span>
                    <span>{upload.columns.length} columns</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link
                  to={`/analytics/${upload.id}`}
                  className="bg-gradient-to-r from-blue-500/20 to-teal-500/20 text-white px-3 py-1 rounded-lg hover:from-blue-500/30 hover:to-teal-500/30 transition-all duration-200 flex items-center space-x-1 text-sm"
                >
                  <BarChart3 className="h-3 w-3" />
                  <span>Analyze</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadHistory;