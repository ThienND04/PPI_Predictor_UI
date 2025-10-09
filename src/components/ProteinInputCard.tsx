import React from 'react';

interface ProteinInputCardProps {
  proteinNumber: 1 | 2;
  id: string;
  confidence: string;
  onInputChange: (field: string, value: string) => void;
  validation: {
    showIdError: boolean;
    showSeqError: boolean;
  };
}

export default function ProteinInputCard({ 
  proteinNumber, 
  id, 
  confidence, 
  onInputChange, 
  validation 
}: ProteinInputCardProps) {
  const isProtein1 = proteinNumber === 1;
  const bgColor = 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700';
  const focusRingColor = isProtein1 ? 'focus:ring-blue-500' : 'focus:ring-blue-400';
  const titleColor = 'text-slate-900 dark:text-slate-100';

  return (
    <div className={`${bgColor} rounded-xl shadow-lg p-6`}>
      <h3 className={`text-lg font-medium mb-4 ${titleColor}`}>
        Protein {proteinNumber}
      </h3>
      
      <div className="space-y-4">
        {/* ID Input */}
        <div>
          <label 
            htmlFor={`id${proteinNumber}`} 
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            ID Protein {proteinNumber}
          </label>
          <input
            type="text"
            id={`id${proteinNumber}`}
            name={`id${proteinNumber}`}
            value={id}
            onChange={(e) => onInputChange(`id${proteinNumber}`, e.target.value)}
            className={`border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 w-full focus:ring-2 ${focusRingColor} focus:outline-none`}
            placeholder={`Nhập ID protein ${proteinNumber}`}
          />
          {validation.showIdError && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              Vui lòng nhập ID protein {proteinNumber}
            </p>
          )}
        </div>

        {/* Sequence Textarea */}
        <div>
          <label 
            htmlFor={`seq${proteinNumber}`} 
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
          >
            Chuỗi Protein {proteinNumber}
          </label>
          <textarea
            id={`seq${proteinNumber}`}
            name={`seq${proteinNumber}`}
            value={confidence}
            onChange={(e) => onInputChange(`seq${proteinNumber}`, e.target.value)}
            rows={4}
            className={`border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg px-3 py-2 w-full focus:ring-2 ${focusRingColor} focus:outline-none`}
            placeholder={`Nhập chuỗi amino acid của protein ${proteinNumber}`}
          />
          {validation.showSeqError && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              Vui lòng nhập chuỗi protein {proteinNumber}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

