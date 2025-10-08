import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProteinInputCard from './ProteinInputCard';

interface FormData {
  id1: string;
  seq1: string;
  id2: string;
  seq2: string;
}

interface ValidationState {
  showId1Error: boolean;
  showSeq1Error: boolean;
  showId2Error: boolean;
  showSeq2Error: boolean;
}

export default function ManualInputForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    id1: '',
    seq1: '',
    id2: '',
    seq2: ''
  });
  const [validation, setValidation] = useState<ValidationState>({
    showId1Error: false,
    showSeq1Error: false,
    showId2Error: false,
    showSeq2Error: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear validation error when user starts typing
    if (field === 'id1' && value.trim()) {
      setValidation(prev => ({ ...prev, showId1Error: false }));
    } else if (field === 'seq1' && value.trim()) {
      setValidation(prev => ({ ...prev, showSeq1Error: false }));
    } else if (field === 'id2' && value.trim()) {
      setValidation(prev => ({ ...prev, showId2Error: false }));
    } else if (field === 'seq2' && value.trim()) {
      setValidation(prev => ({ ...prev, showSeq2Error: false }));
    }
  };

  const validateForm = (): boolean => {
    const newValidation: ValidationState = {
      showId1Error: !formData.id1.trim(),
      showSeq1Error: !formData.seq1.trim(),
      showId2Error: !formData.id2.trim(),
      showSeq2Error: !formData.seq2.trim()
    };

    setValidation(newValidation);

    return Object.values(newValidation).every(field => !field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Gọi API với body JSON theo cấu trúc yêu cầu
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id1: formData.id1,
          seq1: formData.seq1,
          id2: formData.id2,
          seq2: formData.seq2
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      // Điều hướng sang /result và truyền data
      navigate('/result', { 
        state: { 
          result,
          inputData: formData 
        } 
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi thực hiện dự đoán');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Nhập thông tin protein thủ công</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Protein Input Cards */}
        <div className="space-y-6">
          <ProteinInputCard
            proteinNumber={1}
            id={formData.id1}
            confidence={formData.seq1}
            onInputChange={handleInputChange}
            validation={{
              showIdError: validation.showId1Error,
              showSeqError: validation.showSeq1Error
            }}
          />

          <ProteinInputCard
            proteinNumber={2}
            id={formData.id2}
            confidence={formData.seq2}
            onInputChange={handleInputChange}
            validation={{
              showIdError: validation.showId2Error,
              showSeqError: validation.showSeq2Error
            }}
          />
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
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg shadow hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Đang thực hiện dự đoán...' : 'Thực hiện dự đoán'}
        </button>
      </form>
    </div>
  );
}