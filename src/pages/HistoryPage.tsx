import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeHistoryById } from "../services/history";

type HistoryItem = {
    id: string;
    timestamp: number;
    input: {
        id1: string;
        id2: string;
    };
    result: {
        score: number;
        label: string;
    };
};

export default function HistoryPage() {
    const [items, setItems] = useState<HistoryItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const raw = localStorage.getItem("ppi_history");
        if (raw) {
            try {
                const parsed = JSON.parse(raw) as HistoryItem[];
                setItems(parsed.sort((a, b) => b.timestamp - a.timestamp));
            } catch {}
        }
    }, []);

    const clear = () => {
        localStorage.removeItem("ppi_history");
        setItems([]);
    };

    return (
        <div className="w-full min-h-screen bg-[#f9fafb] dark:bg-[#0f172a] overflow-x-hidden pt-16">
            <div className="w-full max-w-screen-xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                        Lịch sử tra cứu
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        Xem lại tất cả các dự đoán đã thực hiện
                    </p>
                </div>

                {items.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-slate-700">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                            <span className="text-4xl">📋</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">Chưa có lịch sử</h2>
                        <p className="text-slate-600 dark:text-slate-300 mb-8">
                            Bạn chưa thực hiện dự đoán nào. Hãy bắt đầu với dự đoán đầu tiên!
                        </p>
                        <button
                            onClick={() => navigate("/input")}
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                        >
                            Thực hiện dự đoán đầu tiên
                        </button>
                    </div>
                ) : (
                    /* History Table */
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-slate-700">
                        {/* Table Header */}
                        <div className="bg-blue-50 dark:bg-slate-700 px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                    Tổng cộng: {items.length} dự đoán
                                </h2>
                                <button
                                    onClick={clear}
                                    className="bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 font-medium py-2 px-4 rounded-lg transition duration-200"
                                >
                                    <span className="flex items-center">
                                        <span className="mr-2">🗑️</span>
                                        Xóa tất cả
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-blue-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 dark:text-slate-200 uppercase tracking-wider">
                                            Thời gian
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 dark:text-slate-200 uppercase tracking-wider">
                                            Protein 1
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 dark:text-slate-200 uppercase tracking-wider">
                                            Protein 2
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 dark:text-slate-200 uppercase tracking-wider">
                                            Kết quả
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 dark:text-slate-200 uppercase tracking-wider">
                                            Khả năng tương tác
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-slate-600 dark:text-slate-200 uppercase tracking-wider">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
                                    {items.map((item, index) => {
                                        const isInteraction = item.result.label === "interaction";
                                        const resultIcon = isInteraction ? "✅" : "❌";
                                        const resultText = isInteraction ? "Có tương tác" : "Không tương tác";
                                        
                                        return (
                                            <tr
                                                key={item.id}
                                                className={`hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors duration-150 ${
                                                    index % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-gray-50 dark:bg-slate-800/60"
                                                }`}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-slate-900 dark:text-slate-100">
                                                        {new Date(item.timestamp).toLocaleDateString('vi-VN')}
                                                    </div>
                                                    <div className="text-sm text-slate-500 dark:text-slate-300">
                                                        {new Date(item.timestamp).toLocaleTimeString('vi-VN')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                                        {item.input.id1 || "Không có ID"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                                        {item.input.id2 || "Không có ID"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                        isInteraction
                                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                                    }`}>
                                                        <span className="mr-1">{resultIcon}</span>
                                                        {resultText}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-1 bg-gray-200 dark:bg-slate-700 rounded-full h-2 mr-3">
                                                            <div
                                                                className={`h-2 rounded-full ${
                                                                    isInteraction ? "bg-green-500 dark:bg-green-400" : "bg-red-500 dark:bg-red-400"
                                                                }`}
                                                                style={{ width: `${item.result.score * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                                            {(item.result.score * 100).toFixed(1)}%
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => navigate("/results", { 
                                                                state: { 
                                                                    result: {
                                                                        protein1: item.input.id1,
                                                                        protein2: item.input.id2,
                                                                        model: "MCAPST5",
                                                                        score: item.result.score,
                                                                        label: item.result.label,
                                                                        threshold: 0.5,
                                                                        timestamp: new Date(item.timestamp).toISOString()
                                                                    }
                                                                } 
                                                            })}
                                                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-150"
                                                        >
                                                            Xem chi tiết
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                const next = removeHistoryById(item.id);
                                                                setItems((next as HistoryItem[]).sort((a, b) => b.timestamp - a.timestamp));
                                                            }}
                                                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors duration-150"
                                                        >
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Back to Home Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-400 hover:bg-gray-600 text-black font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                    >
                        <span className="flex items-center justify-center">
                            <span className="mr-2">🏠</span>
                            Về trang chủ
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}



