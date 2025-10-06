import { useState } from 'react';
import ManualInputForm from '../components/ManualInputForm';
import UploadFileForm from '../components/UploadFileForm';

type TabType = 'manual' | 'upload';

export default function DataInputPage() {
  const [activeTab, setActiveTab] = useState<TabType>('manual');

  const tabs = [
    { id: 'manual' as TabType, label: 'Nhập thủ công', component: ManualInputForm },
    { id: 'upload' as TabType, label: 'Upload file', component: UploadFileForm }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ManualInputForm;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dự đoán tương tác Protein-Protein</h1>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <ActiveComponent />
      </div>
    </div>
  );
}
