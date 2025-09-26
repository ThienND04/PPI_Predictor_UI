import type { PredictInput, PredictResponse } from "./api";

export type HistoryRecord = {
    id: string;
    timestamp: number;
    input: Pick<PredictInput, "id1" | "id2">;
    result: Pick<PredictResponse, "score" | "label">;
};

const STORAGE_KEY = "ppi_history";

export function saveHistory(record: HistoryRecord) {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: HistoryRecord[] = raw ? JSON.parse(raw) : [];
    list.push(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function loadHistory(): HistoryRecord[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryRecord[]) : [];
}

export function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
}



