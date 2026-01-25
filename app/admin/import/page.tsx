'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import { Upload, Download, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface CSVProduct {
  name: string;
  categoryName: string;
  categoryDescription?: string;
  price: string;
  stock: string;
  description: string;
  image: string;
}

export default function ImportProductsPage() {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<CSVProduct[]>([]);
  const [importResults, setImportResults] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as CSVProduct[];
        if (data.length === 0) {
          toast.error('CSV file is empty');
          return;
        }

        // Validate required columns
        const firstRow = data[0];
        const requiredColumns = ['name', 'categoryName', 'price'];
        const missingColumns = requiredColumns.filter(col => !(col in firstRow));

        if (missingColumns.length > 0) {
          toast.error(`Missing required columns: ${missingColumns.join(', ')}`);
          return;
        }

        setPreview(data);
        toast.success(`Loaded ${data.length} products from CSV`);
      },
      error: (error) => {
        toast.error(`CSV parsing error: ${error.message}`);
      },
    });
  };

  const handleImport = async () => {
    if (preview.length === 0) {
      toast.error('No data to import');
      return;
    }

    setUploading(true);
    setImportResults(null);

    try {
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: preview }),
      });

      const data = await res.json();

      if (res.ok) {
        setImportResults(data.results);
        toast.success(`Import completed! ${data.results.success} products added.`);
        setPreview([]);
      } else {
        toast.error(data.error || 'Import failed');
      }
    } catch (error) {
      toast.error('Failed to import products');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const template = `name,categoryName,categoryDescription,price,stock,description,image
Sample Book Title,Books,Educational books for all ages,29.99,100,A comprehensive guide to...,https://example.com/image.jpg
Premium Notebook Set,Stationery,Quality stationery items,15.50,200,5-pack ruled notebooks,https://example.com/notebook.jpg
School Backpack,Bags,Durable school bags,45.00,50,Water-resistant backpack with laptop compartment,https://example.com/backpack.jpg`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'product-import-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Template downloaded');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Import Products from CSV</h1>
        <p className="text-gray-600">
          Bulk import products using a CSV file. Categories will be created automatically if they don't exist.
        </p>
      </div>

      {/* CSV Template Download */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-4">
          <FileSpreadsheet className="w-12 h-12 text-blue-600 flex-shrink-0" />
          <div className="flex-grow">
            <h3 className="font-bold text-lg mb-2">CSV Format Required</h3>
            <p className="text-gray-700 mb-4">
              Your CSV must include these columns: <strong>name, categoryName, price</strong>
              <br />
              Optional columns: categoryDescription, stock, description, image
            </p>
            <button
              onClick={downloadTemplate}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download CSV Template</span>
            </button>
          </div>
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Step 1: Upload CSV File</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <label className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-700 font-semibold">
              Choose a CSV file
            </span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <p className="text-gray-500 text-sm mt-2">or drag and drop</p>
        </div>
      </div>

      {/* Preview */}
      {preview.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Step 2: Preview & Confirm</h2>
            <span className="text-gray-600">{preview.length} products ready to import</span>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {preview.slice(0, 10).map((product, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm">{index + 1}</td>
                    <td className="px-4 py-2 text-sm font-medium">{product.name}</td>
                    <td className="px-4 py-2 text-sm">{product.categoryName}</td>
                    <td className="px-4 py-2 text-sm">${product.price}</td>
                    <td className="px-4 py-2 text-sm">{product.stock || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {preview.length > 10 && (
              <p className="text-gray-500 text-sm mt-4 text-center">
                Showing first 10 of {preview.length} products
              </p>
            )}
          </div>

          <button
            onClick={handleImport}
            disabled={uploading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Importing...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Import {preview.length} Products</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Import Results */}
      {importResults && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Import Results</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Successful</p>
                  <p className="text-2xl font-bold text-green-600">{importResults.success}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-sm text-gray-600">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{importResults.failed}</p>
                </div>
              </div>
            </div>
          </div>

          {importResults.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-bold text-red-900 mb-2">Errors:</h3>
              <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                {importResults.errors.map((error: string, index: number) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
