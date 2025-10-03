import { useLocation, useNavigate } from "react-router-dom";

type PredictionResult = {
    score: number;
    label: string;
    meta?: Record<string, unknown>;
};

export default function ResultsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const result = (location.state as { result?: PredictionResult })?.result;

    if (!result) {
        return (
            <div className="w-full min-h-screen bg-gray-50 overflow-x-hidden pt-16">
                <div className="w-full max-w-screen-xl mx-auto px-6 py-12">
                    <div className="text-center">
                        <div className="bg-white rounded-xl shadow-lg p-12">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                <span className="text-4xl">📊</span>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">Chưa có kết quả</h1>
                            <p className="text-lg text-gray-600 mb-8">
                                Vui lòng thực hiện dự đoán để xem kết quả tại đây
                            </p>
                            <button
                                onClick={() => navigate("/input")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                            >
                                Thực hiện dự đoán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const isInteraction = result.label === "interaction";
    const resultColor = isInteraction ? "green" : "red";
    const resultIcon = isInteraction ? "✅" : "❌";

    return (
        <div className="w-full min-h-screen bg-gray-50 overflow-x-hidden pt-16">
            <div className="w-full max-w-screen-xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Kết quả dự đoán
                    </h1>
                    <p className="text-lg text-gray-600">
                        Kết quả phân tích tương tác protein-protein
                    </p>
                </div>

                {/* Result Card */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
                    {/* Result Header */}
                    <div className={`bg-${resultColor}-50 px-8 py-6 border-l-4 border-${resultColor}-500`}>
                        <div className="flex items-center">
                            <span className="text-3xl mr-4">{resultIcon}</span>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Kết quả dự đoán
                                </h2>
                                <p className="text-gray-600">
                                    Phân tích hoàn tất lúc {new Date().toLocaleString('vi-VN')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Result Details */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Prediction Label */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Nhãn dự đoán</h3>
                                <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
                                    isInteraction 
                                        ? "bg-green-100 text-green-800" 
                                        : "bg-red-100 text-red-800"
                                }`}>
                                    <span className="mr-2">{resultIcon}</span>
                                    {result.label === "interaction" ? "Có tương tác" : "Không tương tác"}
                                </div>
                            </div>

                            {/* Confidence Score */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Độ tin cậy</h3>
                                <div className="bg-gray-100 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Điểm số</span>
                                        <span className="text-lg font-bold text-gray-800">
                                            {(result.score * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className={`h-3 rounded-full transition-all duration-500 ${
                                                isInteraction ? "bg-green-500" : "bg-red-500"
                                            }`}
                                            style={{ width: `${result.score * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interpretation */}
                        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Giải thích kết quả</h3>
                            <p className="text-gray-700">
                                {isInteraction ? (
                                    <>
                                        Kết quả cho thấy <strong>có khả năng cao</strong> hai protein sẽ tương tác với nhau 
                                        với độ tin cậy {(result.score * 100).toFixed(1)}%. Điều này có nghĩa là chúng có thể 
                                        liên kết và thực hiện các chức năng sinh học cùng nhau.
                                    </>
                                ) : (
                                    <>
                                        Kết quả cho thấy <strong>không có khả năng</strong> hai protein sẽ tương tác với nhau 
                                        với độ tin cậy {(result.score * 100).toFixed(1)}%. Điều này có nghĩa là chúng có thể 
                                        hoạt động độc lập trong hệ thống sinh học.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate("/input")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                    >
                        <span className="flex items-center justify-center">
                            <span className="mr-2">🔬</span>
                            Thực hiện dự đoán mới
                        </span>
                    </button>
                    <button
                        onClick={() => navigate("/history")}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                    >
                        <span className="flex items-center justify-center">
                            <span className="mr-2">📋</span>
                            Xem lịch sử
                        </span>
                    </button>
                    <button
                        onClick={() => navigate("/home")}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
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



