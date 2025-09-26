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
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>ID protein 1: </label>
                <input className="input" id="id1" value={id1} onChange={e => setId1(e.target.value)} />
            </div>
            <div>
                <label>Chuỗi 1: </label>
                <input className="input" id="seq1" value={seq1} onChange={e => setSeq1(e.target.value)} />
            </div>
            <div>
                <label>ID protein 2: </label>
                <input className="input" id="id2" value={id2} onChange={e => setId2(e.target.value)} />
            </div>
            <div>
                <label>Chuỗi 2: </label>
                <input className="input" id="seq2" value={seq2} onChange={e => setSeq2(e.target.value)} />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Đang dự đoán..." : "Dự đoán"}
            </button>
        </form>
    );
}
