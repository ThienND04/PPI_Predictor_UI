import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="w-full min-h-screen bg-gray-50 overflow-x-hidden pt-16">
            <div className="w-full max-w-screen-xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Lịch sử tra cứu
                    </h1>
                    <p className="text-lg text-gray-600">
                        Xem lại tất cả các dự đoán đã thực hiện
                    </p>
                </div>

                {items.length === 0 ? (
                    /* Empty State */
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-4xl">📋</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Chưa có lịch sử</h2>
                        <p className="text-gray-600 mb-8">
                            Bạn chưa thực hiện dự đoán nào. Hãy bắt đầu với dự đoán đầu tiên!
                        </p>
                        <button
                            onClick={() => navigate("/input")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                        >
                            Thực hiện dự đoán đầu tiên
                        </button>
                    </div>
                ) : (
                    /* History Table */
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Table Header */}
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Tổng cộng: {items.length} dự đoán
                                </h2>
                                <button
                                    onClick={clear}
                                    className="bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-lg transition duration-200"
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
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thời gian
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Protein 1
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Protein 2
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kết quả
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Độ tin cậy
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {items.map((item, index) => {
                                        const isInteraction = item.result.label === "interaction";
                                        const resultIcon = isInteraction ? "✅" : "❌";
                                        const resultText = isInteraction ? "Có tương tác" : "Không tương tác";
                                        
                                        return (
                                            <tr
                                                key={item.id}
                                                className={`hover:bg-gray-50 transition-colors duration-150 ${
                                                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                                }`}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {new Date(item.timestamp).toLocaleDateString('vi-VN')}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(item.timestamp).toLocaleTimeString('vi-VN')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.input.id1 || "Không có ID"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {item.input.id2 || "Không có ID"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                                        isInteraction
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}>
                                                        <span className="mr-1">{resultIcon}</span>
                                                        {resultText}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                                                            <div
                                                                className={`h-2 rounded-full ${
                                                                    isInteraction ? "bg-green-500" : "bg-red-500"
                                                                }`}
                                                                style={{ width: `${item.result.score * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900">
                                                            {(item.result.score * 100).toFixed(1)}%
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => navigate("/results", { 
                                                            state: { result: item.result } 
                                                        })}
                                                        className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                                                    >
                                                        Xem chi tiết
                                                    </button>
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
                        className="bg-gray-600 hover:bg-gray-700 text-black font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
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



