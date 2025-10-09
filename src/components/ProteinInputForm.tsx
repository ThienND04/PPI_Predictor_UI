import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictInteraction } from "../services/api";
import { saveHistory } from "../services/history";
import "../components/ProteinInputForm.css";

export default function ProteinInputForm() {
    const [id1, setId1] = useState("");
    const [seq1, setSeq1] = useState("");
    const [id2, setId2] = useState("");
    const [seq2, setSeq2] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const result = await predictInteraction({ id1, seq1, id2, seq2 });
            console.log(result);
            saveHistory({
                id: crypto.randomUUID(),
                timestamp: Date.now(),
                input: { id1, id2 },
                result: { score: result.score, label: result.label },
            });
            navigate("/results", { state: { result } });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Protein 1 Section */}
            <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                    <span className="mr-2">🧬</span>
                    Protein 1
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="id1" className="block text-sm font-medium text-gray-700">
                            ID Protein 1
                        </label>
                        <input
                            id="id1"
                            type="text"
                            value={id1}
                            onChange={e => setId1(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            placeholder="Ví dụ: P12345"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="seq1" className="block text-sm font-medium text-gray-700">
                            Chuỗi protein 1
                        </label>
                        <input
                            id="seq1"
                            type="text"
                            value={seq1}
                            onChange={e => setSeq1(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            placeholder="Nhập chuỗi amino acid..."
                        />
                    </div>
                </div>
            </div>

            {/* Protein 2 Section */}
            <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                    <span className="mr-2">🧬</span>
                    Protein 2
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="id2" className="block text-sm font-medium text-gray-700">
                            ID Protein 2
                        </label>
                        <input
                            id="id2"
                            type="text"
                            value={id2}
                            onChange={e => setId2(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                            placeholder="Ví dụ: Q67890"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="seq2" className="block text-sm font-medium text-gray-700">
                            Chuỗi protein 2
                        </label>
                        <input
                            id="seq2"
                            type="text"
                            value={seq2}
                            onChange={e => setSeq2(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                            placeholder="Nhập chuỗi amino acid..."
                        />
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <span className="text-red-500 mr-2">⚠️</span>
                        <span className="text-red-700 text-sm">{error}</span>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className={`px-8 py-3 rounded-lg font-semibold text-white transition duration-200 ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-primary-600 hover:bg-primary-700 hover:shadow-lg"
                    }`}
                >
                    {loading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang dự đoán...
                        </span>
                    ) : (
                        <span className="flex items-center">
                            <span className="mr-2">🔬</span>
                            Dự đoán
                        </span>
                    )}
                </button>
            </div>
        </form>
    );
}
