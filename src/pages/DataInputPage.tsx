import ProteinInputForm from "../components/ProteinInputForm";
// import FileUploader from "../components/FileUploader";

export default function DataInputPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nhập dữ liệu protein</h1>
      <ProteinInputForm />
      {/* <FileUploader /> */}
    </div>
  );
}
