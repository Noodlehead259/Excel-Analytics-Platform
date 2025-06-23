import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [uploads, setUploads] = useState([]);
  const [currentData, setCurrentData] = useState(null);

  const addUpload = (uploadData) => {
    const newUpload = {
      id: Date.now().toString(),
      filename: uploadData.filename,
      data: uploadData.data,
      columns: uploadData.columns,
      uploadDate: new Date().toISOString(),
      charts: []
    };
    
    setUploads(prev => [newUpload, ...prev]);
    return newUpload;
  };

  const addChart = (uploadId, chartData) => {
    setUploads(prev => 
      prev.map(upload => 
        upload.id === uploadId 
          ? { ...upload, charts: [...upload.charts, { ...chartData, id: Date.now().toString() }] }
          : upload
      )
    );
  };

  const getUpload = (id) => {
    return uploads.find(upload => upload.id === id);
  };

  const value = {
    uploads,
    currentData,
    setCurrentData,
    addUpload,
    addChart,
    getUpload
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};