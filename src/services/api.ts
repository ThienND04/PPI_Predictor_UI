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

export type ManualPredictInput = {
    protein1: {
        id: string;
        sequence: string;
    };
    protein2: {
        id: string;
        sequence: string;
    };
};

export type ManualPredictResponse = {
    protein1: string;
    protein2: string;
    score: number;
    label: string;
    threshold?: number;
    meta?: Record<string, unknown>;
};

export type UploadPredictResponse = {
    type: 'json' | 'text';
    data?: ManualPredictResponse[];
    // For text (batch) responses
    text?: string;
    model?: string | null;
    threshold?: number | null;
    timestamp?: string | null;
    totalPairs?: number | null;
    successfulPredictions?: number | null;
    failedPredictions?: number | null;
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

export async function predictManual(input: ManualPredictInput): Promise<ManualPredictResponse> {
    const url = API_BASE ? `${API_BASE}/api/predict` : "/api/predict";
    console.log("Calling manual predict API:", url);
    
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    });
    
    if (!res.ok) {
        throw new Error(`Manual predict failed: ${res.status} ${res.statusText}`);
    }

    return res.json();
}

export async function predictUpload(fastaFile: File, pairsFile: File): Promise<UploadPredictResponse> {
    const url = API_BASE ? `${API_BASE}/api/predict/batch` : "/api/predict/batch";
    console.log("Calling upload predict API:", url);
    
    const formData = new FormData();
    formData.append('fasta_file', fastaFile);
    formData.append('pairs_file', pairsFile);
    
    const res = await fetch(url, {
        method: "POST",
        body: formData,
    });
    
    if (!res.ok) {
        throw new Error(`Upload predict failed: ${res.status} ${res.statusText}`);
    }

    console.log("Upload predict response:", res);

    // Determine if server returned text (batch) or JSON
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        const data = await res.json();
        return { type: 'json', data };
    }

    // Treat others as text (e.g., text/plain, application/octet-stream with plain text content)
    const text = await res.text();

    // Extract metadata from headers
    const model = res.headers.get('X-Model');
    const thresholdStr = res.headers.get('X-Threshold');
    const timestamp = res.headers.get('X-Timestamp');
    const totalPairsStr = res.headers.get('X-Total-Pairs');
    const successfulStr = res.headers.get('X-Successful-Predictions');
    const failedStr = res.headers.get('X-Failed-Predictions');

    return {
        type: 'text',
        text,
        model,
        threshold: thresholdStr != null ? Number(thresholdStr) : null,
        timestamp,
        totalPairs: totalPairsStr != null ? Number(totalPairsStr) : null,
        successfulPredictions: successfulStr != null ? Number(successfulStr) : null,
        failedPredictions: failedStr != null ? Number(failedStr) : null,
    };
}



