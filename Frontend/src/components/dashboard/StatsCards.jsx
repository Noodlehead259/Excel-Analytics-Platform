import React from 'react';
import { useData } from '../../context/DataContext';
import { FileSpreadsheet, BarChart3, TrendingUp, Users } from 'lucide-react';

const StatsCards = () => {
  const { uploads } = useData();

  const totalFiles = uploads.length;
  const totalCharts = uploads.reduce((acc, upload) => acc + upload.charts.length, 0);
  const totalRows = uploads.reduce((acc, upload) => acc + upload.data.length, 0);

  const stats = [
    {
      title: 'Files Uploaded',
      value: totalFiles,
      icon: FileSpreadsheet,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Charts Created',
      value: totalCharts,
      icon: BarChart3,
      color: 'from-teal-500 to-teal-600'
    },
    {
      title: 'Data Rows',
      value: totalRows.toLocaleString(),
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Active Projects',
      value: totalFiles > 0 ? totalFiles : 0,
      icon: Users,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
            </div>
            <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;