export type PredictInput = {
    id1?: string;
    seq1?: string;
    id2?: string;
    seq2?: string;
};

export type PredictResponse = {
    score: number;
    label: string;
    meta?: Record<string, unknown>;
};

const API_BASE = import.meta.env.VITE_API_BASE || "";

export async function predictInteraction(input: PredictInput): Promise<PredictResponse> {
    // Use relative path to leverage Vite proxy
    const url = API_BASE ? `${API_BASE}/api/predict` : "/api/predict";
    console.log("Calling API:", url);
    
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    
    if (!res.ok) {
        throw new Error(`Predict failed: ${res.status} ${res.statusText}`);
    }

    return res.json();
}



