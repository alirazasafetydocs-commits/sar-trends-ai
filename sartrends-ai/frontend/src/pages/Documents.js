import React, { useState, useEffect } from 'react';
import { documentAPI } from '../services/api';
import { FileText, Trash2, Download, Loader } from 'lucide-react';

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const response = await documentAPI.getAll({});
      setDocuments(response.data.documents || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await documentAPI.delete(id);
        setDocuments(documents.filter(doc => doc._id !== id));
      } catch (error) {
        alert('Error deleting document');
      }
    }
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Documents</h1>

        {loading ? (
          <div className="glass-card p-8 text-center">
            <Loader className="w-8 h-8 animate-spin mx-auto text-primary" />
          </div>
        ) : documents.length > 0 ? (
          <div className="grid gap-4">
            {documents.map((doc) => (
              <div key={doc._id} className="glass-card p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{doc.title}</h3>
                    <p className="text-sm text-gray-400">{doc.type} • {new Date(doc.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-primary">
                    <Download className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(doc._id)} className="p-2 text-gray-400 hover:text-red-500">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No documents yet. Start creating!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Documents;

