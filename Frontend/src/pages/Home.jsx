import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Upload, 
  BarChart3, 
  Download, 
  Brain, 
  Users, 
  Shield,
  TrendingUp,
  Zap,
  Globe
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Upload,
      title: 'Smart File Upload',
      description: 'Drag and drop Excel files with automatic parsing and validation'
    },
    {
      icon: BarChart3,
      title: 'Interactive Charts',
      description: 'Generate 2D and 3D visualizations with dynamic axis selection'
    },
    {
      icon: Download,
      title: 'Export Options',
      description: 'Download charts as PNG, PDF, or share interactive versions'
    },
    {
      icon: Brain,
      title: 'AI Insights',
      description: 'Get intelligent summaries and insights from your data'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share analyses and collaborate with team members'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with encrypted data storage'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-teal-500/20 backdrop-blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your
              <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                {' '}Excel Data
              </span>
              <br />
              Into Powerful Insights
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Upload any Excel file and create stunning interactive charts with AI-powered analytics. 
              No coding required – just drag, drop, and visualize.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <Zap className="h-5 w-5" />
                <span>{isAuthenticated ? 'Go to Dashboard' : 'Start Free Trial'}</span>
              </Link>
              <button className="text-white border border-white/30 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need for Data Analysis
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Our platform combines powerful analytics with an intuitive interface, 
              making data visualization accessible to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="bg-gradient-to-r from-blue-500 to-teal-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                10K+
              </div>
              <div className="text-white/70 text-lg">Files Analyzed</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="text-white/70 text-lg">Charts Generated</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-white/70 text-lg">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-2xl p-8 md:p-12 backdrop-blur-md border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Unlock Your Data's Potential?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of professionals who trust ExcelAnalytics for their data visualization needs.
            </p>
            <Link
              to={isAuthenticated ? "/dashboard" : "/register"}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Start Analyzing Now</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;