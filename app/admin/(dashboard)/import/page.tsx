'use client';

import { useState } from 'react';
import Papa from 'papaparse';
import { Upload, Download, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface CSVProduct {
  // Required fields
  title: string;
  price: string;
  
  // Identification
  isbn?: string;
  barcode?: string;
  sku?: string;
  
  // Pricing
  originalPrice?: string;
  
  // Availability
  available?: string | boolean;
  stock?: string;
  
  // Images
  mainImageUrl?: string;
  image?: string; // fallback
  allImageUrls?: string;
  
  // Categorization
  productType?: string;
  categoryName?: string;
  categoryDescription?: string;
  tags?: string;
  
  // Publishing Info
  vendor?: string;
  publishedAt?: string;
  
  // Shipping
  weight?: string;
  weightGrams?: string;
  requiresShipping?: string | boolean;
  
  // URLs & Metadata
  url?: string;
  handle?: string;
  variantTitle?: string;
  
  // Content
  description?: string;
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
        const requiredColumns = ['title', 'price'];
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
    const template = `title,isbn,sku,price,originalPrice,available,stock,mainImageUrl,allImageUrls,productType,vendor,tags,weight,weightGrams,requiresShipping,url,handle,variantTitle,description
Sample Book Title,978-1234567890,BOOK-001,29.99,39.99,true,100,https://example.com/book.jpg,https://example.com/book1.jpg|https://example.com/book2.jpg,Books,Penguin Publishers,"fiction,bestseller",500g,500,true,https://mybookstore.com/sample-book,sample-book-title,Paperback,A comprehensive guide to modern programming...
Premium Notebook Set,,,15.50,19.99,true,200,https://example.com/notebook.jpg,,Stationery,Oxford,"notebooks,stationery",300g,300,true,https://mybookstore.com/notebook-set,premium-notebook-set,5-Pack,High-quality ruled notebooks perfect for students
School Backpack,BAG-12345,BAG-SCH-01,45.00,55.00,true,50,https://example.com/backpack.jpg,,Bags,Nike,"backpack,school,bags",1.2kg,1200,true,https://mybookstore.com/school-backpack,school-backpack,Large,Water-resistant backpack with padded laptop compartment`;

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
      <div className="mb-8">
        <h1 className="text-4xl font-black mb-2" style={{color: '#3C096C'}}>📥 Import Products</h1>
        <p style={{color: '#3C096C', opacity: 0.7}}>Bulk upload via CSV</p>
      </div>

      {/* CSV Template Download */}
      <div className="bg-gradient-to-br from-[#CDB4DB]/10 to-[#9D4EDD]/10 border border-[#9D4EDD]/20 rounded-2xl p-8 mb-8">
        <div className="flex items-start space-x-6">
          <div className="bg-white p-4 rounded-2xl shadow-md text-[#9D4EDD]">
            <FileSpreadsheet className="w-10 h-10" />
          </div>
          <div className="flex-grow">
            <h3 className="font-bold text-xl mb-2 text-[#3C096C]">CSV Format Required</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Your CSV must include these columns: <strong className="text-[#3C096C]">title, price</strong>
              <br />
              Optional columns: isbn, sku, originalPrice, available, stock, mainImageUrl, allImageUrls, productType, vendor, tags, weight, weightGrams, requiresShipping, url, handle, variantTitle, description
            </p>
            <button
              onClick={downloadTemplate}
              className="bg-white text-[#3C096C] border-2 border-[#9D4EDD]/30 px-6 py-3 rounded-xl hover:bg-[#9D4EDD] hover:text-white hover:border-transparent transition-all duration-300 flex items-center space-x-2 font-bold shadow-sm"
            >
              <Download className="w-5 h-5" />
              <span>Download CSV Template</span>
            </button>
          </div>
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
        <h2 className="text-2xl font-black mb-6 text-[#3C096C]">Step 1: Upload CSV File</h2>
        <div className="border-4 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-[#9D4EDD] hover:bg-purple-50/30 transition-all duration-300 group">
          <Upload className="w-20 h-20 text-gray-300 mx-auto mb-6 group-hover:text-[#9D4EDD] group-hover:scale-110 transition-all duration-300" />
          <label className="cursor-pointer">
            <span className="bg-[#9D4EDD] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-purple-300 hover:scale-105 transition-all duration-300 inline-block mb-4">
              Choose a CSV file
            </span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <p className="text-gray-500 font-medium">or drag and drop here</p>
        </div>
      </div>

      {/* Preview */}
      {preview.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-[#3C096C]">Step 2: Preview & Confirm</h2>
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-bold">{preview.length} products ready</span>
          </div>

          <div className="overflow-x-auto mb-8 rounded-xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">#</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">ISBN/SKU</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-600">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {preview.slice(0, 10).map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{product.title}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{product.isbn || product.sku || '-'}</td>
                    <td className="px-6 py-4 text-sm font-bold text-[#3C096C]">${product.price}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{product.stock || 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.productType || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {preview.length > 10 && (
              <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
                <p className="text-gray-500 text-sm font-medium">
                  Showing first 10 of {preview.length} products
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleImport}
            disabled={uploading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl hover:shadow-lg hover:shadow-green-200 hover:scale-[1.01] transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>Importing Products...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-6 h-6" />
                <span>Start Import Now</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Import Results */}
      {importResults && (
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in-up border border-gray-100">
          <h2 className="text-2xl font-black mb-6 text-[#3C096C]">Import Results</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-green-800 uppercase">Successful</p>
                  <p className="text-3xl font-black text-green-600">{importResults.success}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                 <div className="bg-red-100 p-3 rounded-xl">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                 </div>
                <div>
                  <p className="text-sm font-bold text-red-800 uppercase">Failed</p>
                  <p className="text-3xl font-black text-red-600">{importResults.failed}</p>
                </div>
              </div>
            </div>
          </div>

          {importResults.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="font-bold text-red-900 mb-4 text-lg">Detailed Errors</h3>
              <ul className="list-disc list-inside text-sm text-red-700 space-y-2 bg-white/50 p-4 rounded-xl max-h-60 overflow-y-auto">
                {importResults.errors.map((error: string, index: number) => (
                  <li key={index} className="leading-relaxed">{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

