import { useEffect, useState } from "react";

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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Lịch sử tra cứu</h1>
            {items.length === 0 ? (
                <p>Chưa có lịch sử.</p>
            ) : (
                <div className="space-y-3">
                    {items.map(item => (
                        <div key={item.id} className="border rounded p-3">
                            <div className="text-sm opacity-70">{new Date(item.timestamp).toLocaleString()}</div>
                            <div><strong>Protein 1:</strong> {item.input.id1}</div>
                            <div><strong>Protein 2:</strong> {item.input.id2}</div>
                            <div><strong>Nhãn:</strong> {item.result.label} | <strong>Điểm:</strong> {item.result.score}</div>
                        </div>
                    ))}
                </div>
            )}
            <button className="btn mt-4" onClick={clear}>Xóa lịch sử</button>
        </div>
    );
}



