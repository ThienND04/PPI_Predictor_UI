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
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Kết quả</h1>
                <p>Chưa có dữ liệu kết quả. Vui lòng thực hiện dự đoán.</p>
                <button className="btn btn-primary mt-4" onClick={() => navigate("/")}>Quay lại nhập dữ liệu</button>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Kết quả dự đoán</h1>
            <div className="border rounded p-4">
                <div className="mb-2"><strong>Nhãn:</strong> {result.label}</div>
                <div className="mb-2"><strong>Điểm:</strong> {result.score}</div>
            </div>
            <div className="flex gap-2">
                <button className="btn" onClick={() => navigate("/")}>Dự đoán lại</button>
                <button className="btn" onClick={() => navigate("/history")}>Xem lịch sử</button>
            </div>
        </div>
    );
}



