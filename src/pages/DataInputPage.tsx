import ProteinInputForm from "../components/ProteinInputForm";
// import FileUploader from "../components/FileUploader";

export default function DataInputPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 overflow-x-hidden pt-16">
      <div className="w-full max-w-screen-xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Nhập dữ liệu protein
          </h1>
          <p className="text-lg text-gray-600">
            Nhập thông tin ID và chuỗi protein để thực hiện dự đoán tương tác protein-protein
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <ProteinInputForm />
        </div>
        
        {/* <FileUploader /> */}
      </div>
    </div>
  );
}
