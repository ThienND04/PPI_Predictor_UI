import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { predictUpload } from '../services/api';

export default function UploadFileForm() {
  const navigate = useNavigate();
  const [fastaFile, setFastaFile] = useState<File | null>(null);
  const [pairsFile, setPairsFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFastaFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFastaFile(file);
    setError(null);
  };

  const handlePairsFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPairsFile(file);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate files
      if (!fastaFile || !pairsFile) {
        throw new Error('Vui lòng chọn cả 2 file: FASTA và Pairs');
      }

      // Validate file types
      if (!fastaFile.name.toLowerCase().includes('.fasta') && !fastaFile.name.toLowerCase().includes('.fa')) {
        throw new Error('File FASTA phải có phần mở rộng .fasta hoặc .fa');
      }

      if (!pairsFile.name.toLowerCase().includes('.txt') && !pairsFile.name.toLowerCase().includes('.csv') && !pairsFile.name.toLowerCase().includes('.tsv')) {
        throw new Error('File Pairs phải có phần mở rộng .txt hoặc .csv hoặc .tsv');
      }

      const result = await predictUpload(fastaFile, pairsFile);

      if (result.type === 'json') {
        // Navigate to result page with JSON data (unlikely for batch, but supported)
        navigate('/result', {
          state: {
            result: result.data,
            inputFiles: { fastaFile: fastaFile.name, pairsFile: pairsFile.name }
          }
        });
      } else if (result.type === 'text') {
        // Navigate with text content and metadata
        navigate('/result', {
          state: {
            batchText: result.text,
            batchMeta: {
              model: result.model,
              threshold: result.threshold,
              timestamp: result.timestamp,
              totalPairs: result.totalPairs,
              successfulPredictions: result.successfulPredictions,
              failedPredictions: result.failedPredictions,
            },
            inputFiles: { fastaFile: fastaFile.name, pairsFile: pairsFile.name }
          }
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi upload và dự đoán');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = (type: 'fasta' | 'pairs') => {
    if (type === 'fasta') {
      setFastaFile(null);
      const input = document.getElementById('fastaFile') as HTMLInputElement;
      if (input) input.value = '';
    } else {
      setPairsFile(null);
      const input = document.getElementById('pairsFile') as HTMLInputElement;
      if (input) input.value = '';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">Upload file để dự đoán</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* FASTA File Upload */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-3 text-blue-600">File FASTA</h3>
          <div className="space-y-3">
            <div>
              <label htmlFor="fastaFile" className="block text-sm font-medium text-gray-700 mb-2">
                Chọn file FASTA (.fasta, .fa)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  id="fastaFile"
                  accept=".fasta,.fa"
                  onChange={handleFastaFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
                {fastaFile && (
                  <button
                    type="button"
                    onClick={() => removeFile('fasta')}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Xóa
                  </button>
                )}
              </div>
              {fastaFile && (
                <p className="text-sm text-green-600 mt-1">
                  ✓ Đã chọn: {fastaFile.name} ({(fastaFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <p><strong>Định dạng file FASTA:</strong></p>
              <p>• Mỗi protein bắt đầu bằng dòng chứa "{'>'}" theo sau là ID protein</p>
              <p>• Chuỗi amino acid ở các dòng tiếp theo</p>
              <p>• Ví dụ:</p>
              <pre className="mt-1 text-xs">
{`>protein1
MKLLVVLLLCLAVALA
>protein2
MKLLVVLLLCLAVALA`}
              </pre>
            </div>
          </div>
        </div>

        {/* Pairs File Upload */}
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-medium mb-3 text-green-600">File Pairs</h3>
          <div className="space-y-3">
            <div>
              <label htmlFor="pairsFile" className="block text-sm font-medium text-gray-700 mb-2">
                Chọn file Pairs (.txt, .csv)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  id="pairsFile"
                  accept=".txt,.csv,.tsv"
                  onChange={handlePairsFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  required
                />
                {pairsFile && (
                  <button
                    type="button"
                    onClick={() => removeFile('pairs')}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Xóa
                  </button>
                )}
              </div>
              {pairsFile && (
                <p className="text-sm text-green-600 mt-1">
                  ✓ Đã chọn: {pairsFile.name} ({(pairsFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <p><strong>Định dạng file Pairs:</strong></p>
              <p>• Mỗi dòng chứa một cặp ID protein, cách nhau bởi dấu phẩy hoặc tab</p>
              <p>• Ví dụ:</p>
              <pre className="mt-1 text-xs">
{`protein1,protein2
protein1,protein3
protein2,protein3`}
              </pre>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Đang dự đoán...' : 'Dự đoán'}
        </button>
      </form>
    </div>
  );
}
