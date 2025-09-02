import { useState } from "react";
import "../components/ProteinInputForm.css";

export default function ProteinInputForm() {
    const [id1, setId1] = useState("");
    const [seq1, setSeq1] = useState("");
    const [id2, setId2] = useState("");
    const [seq2, setSeq2] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Gửi dữ liệu đến backend
        console.log({ id1, seq1, id2, seq2 });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label>ID protein 1: </label>
                <input className="input" value={id1} onChange={e => setId1(e.target.value)} />
            </div>
            <div>
                <label>Chuỗi 1: </label>
                <input className="input" value={seq1} onChange={e => setSeq1(e.target.value)} />
            </div>
            <div>
                <label>ID protein 2: </label>
                <input className="input" value={id2} onChange={e => setId2(e.target.value)} />
            </div>
            <div>
                <label>Chuỗi 2: </label>
                <input className="input" value={seq2} onChange={e => setSeq2(e.target.value)} />
            </div>
            <button className="btn btn-primary" type="submit">Dự đoán</button>
        </form>
    );
}
