import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useData } from '../../context/DataContext';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const { addUpload } = useData();

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      if (jsonData.length === 0) {
        throw new Error('No data found in the Excel file');
      }

      const columns = Object.keys(jsonData[0]);
      
      const uploadData = {
        filename: file.name,
        data: jsonData,
        columns: columns
      };

      addUpload(uploadData);
      setUploadStatus({ type: 'success', message: 'File uploaded successfully!' });
    } catch (error) {
      setUploadStatus({ type: 'error', message: error.message || 'Failed to upload file' });
    } finally {
      setUploading(false);
    }
  }, [addUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-blue-400 bg-blue-500/10'
            : 'border-white/30 hover:border-white/50 hover:bg-white/5'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {uploading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          ) : (
            <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-4 rounded-full">
              <Upload className="h-8 w-8 text-white" />
            </div>
          )}
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {uploading ? 'Processing...' : 'Upload Excel File'}
            </h3>
            <p className="text-white/70 text-sm">
              {isDragActive
                ? 'Drop the file here...'
                : 'Drag & drop an Excel file here, or click to select'}
            </p>
            <p className="text-white/50 text-xs mt-1">
              Supports .xlsx and .xls files
            </p>
          </div>
        </div>
      </div>

      {uploadStatus && (
        <div className={`mt-4 p-4 rounded-lg flex items-center space-x-2 ${
          uploadStatus.type === 'success' 
            ? 'bg-green-500/20 border border-green-500/50' 
            : 'bg-red-500/20 border border-red-500/50'
        }`}>
          {uploadStatus.type === 'success' ? (
            <CheckCircle className="h-5 w-5 text-green-400" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-400" />
          )}
          <p className={`text-sm ${
            uploadStatus.type === 'success' ? 'text-green-200' : 'text-red-200'
          }`}>
            {uploadStatus.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;