import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Download, 
  Settings,
  ArrowLeft,
  Loader
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUpload, addChart } = useData();
  const [upload, setUpload] = useState(null);
  const [selectedXAxis, setSelectedXAxis] = useState('');
  const [selectedYAxis, setSelectedYAxis] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uploadData = getUpload(id);
    if (uploadData) {
      setUpload(uploadData);
      if (uploadData.columns.length > 0) {
        setSelectedXAxis(uploadData.columns[0]);
        setSelectedYAxis(uploadData.columns[1] || uploadData.columns[0]);
      }
    }
    setLoading(false);
  }, [id, getUpload]);

  useEffect(() => {
    if (upload && selectedXAxis && selectedYAxis) {
      generateChartData();
    }
  }, [upload, selectedXAxis, selectedYAxis, chartType]);

  const generateChartData = () => {
    if (!upload || !selectedXAxis || !selectedYAxis) return;

    const labels = upload.data.map(row => row[selectedXAxis]);
    const data = upload.data.map(row => parseFloat(row[selectedYAxis]) || 0);

    const colors = [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 101, 101, 0.8)',
      'rgba(251, 191, 36, 0.8)',
      'rgba(139, 92, 246, 0.8)',
    ];

    const chartConfig = {
      labels: labels.slice(0, 20), // Limit to first 20 items for better visualization
      datasets: [
        {
          label: selectedYAxis,
          data: data.slice(0, 20),
          backgroundColor: chartType === 'pie' ? colors : colors[0],
          borderColor: chartType === 'pie' ? colors : 'rgba(59, 130, 246, 1)',
          borderWidth: 2,
        },
      ],
    };

    setChartData(chartConfig);
  };

  const handleSaveChart = () => {
    if (chartData) {
      const chartInfo = {
        type: chartType,
        xAxis: selectedXAxis,
        yAxis: selectedYAxis,
        data: chartData,
        createdAt: new Date().toISOString()
      };
      addChart(id, chartInfo);
    }
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: `${selectedYAxis} by ${selectedXAxis}`,
        color: 'white'
      },
    },
    scales: chartType !== 'pie' ? {
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      y: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    } : {}
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  if (!upload) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">File Not Found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const renderChart = () => {
    if (!chartData) return null;

    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={chartOptions} />;
      case 'line':
        return <Line data={chartData} options={chartOptions} />;
      case 'pie':
        return <Pie data={chartData} options={chartOptions} />;
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">{upload.filename}</h1>
              <p className="text-white/70">
                {upload.data.length} rows • {upload.columns.length} columns
              </p>
            </div>
          </div>
          
          <button
            onClick={handleSaveChart}
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Save Chart</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 space-y-6">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Chart Settings</span>
              </h3>

              {/* Chart Type */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Chart Type
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
                    { value: 'line', label: 'Line Chart', icon: LineChart },
                    { value: 'pie', label: 'Pie Chart', icon: PieChart }
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setChartType(type.value)}
                      className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 ${
                        chartType === type.value
                          ? 'bg-gradient-to-r from-blue-500/30 to-teal-500/30 text-white'
                          : 'text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <type.icon className="h-4 w-4" />
                      <span>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* X Axis */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  X Axis
                </label>
                <select
                  value={selectedXAxis}
                  onChange={(e) => setSelectedXAxis(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {upload.columns.map((column) => (
                    <option key={column} value={column} className="bg-gray-800">
                      {column}
                    </option>
                  ))}
                </select>
              </div>

              {/* Y Axis */}
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Y Axis
                </label>
                <select
                  value={selectedYAxis}
                  onChange={(e) => setSelectedYAxis(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {upload.columns.map((column) => (
                    <option key={column} value={column} className="bg-gray-800">
                      {column}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <div className="h-96">
                {renderChart()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;