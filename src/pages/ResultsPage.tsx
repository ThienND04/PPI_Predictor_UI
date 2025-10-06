import { useEffect, useMemo, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { ManualPredictResponse } from "../services/api";

interface ResultPageState {
    result?: ManualPredictResponse;
    data?: ManualPredictResponse[];
    downloadUrl?: string;
    fileName?: string;
    inputData?: any;
    inputFiles?: { fastaFile?: string; pairsFile?: string };
    batchText?: string;
    batchMeta?: {
        model?: string | null;
        threshold?: number | null;
        timestamp?: string | null;
        totalPairs?: number | null;
        successfulPredictions?: number | null;
        failedPredictions?: number | null;
    };
}

export default function ResultPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as ResultPageState | null;
    const [batchRows, setBatchRows] = useState<Array<{ id1: string; id2: string; score: number }>>([]);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);
    const tableRef = useRef<HTMLTableElement | null>(null);

    // Helper: safely render values to avoid "Objects are not valid as a React child"
    const renderCell = (value: unknown) => {
        if (value === null || value === undefined) return "";
        if (typeof value === "object") return JSON.stringify(value);
        return String(value);
    };

    // If we have batchText, parse locally (text/plain from /predict/batch)
    useEffect(() => {
        if (!state?.batchText) return;
        setIsLoadingPreview(true);
        const lines = state.batchText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        const parsed: Array<{ id1: string; id2: string; score: number }> = [];
        for (const line of lines) {
            const parts = line.split(/\s+/);
            if (parts.length >= 3) {
                const id1 = parts[0];
                const id2 = parts[1];
                const score = Number(parts[2]);
                if (id1 && id2 && !Number.isNaN(score)) {
                    parsed.push({ id1, id2, score });
                }
            }
        }
        setBatchRows(parsed);
        setIsLoadingPreview(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state?.batchText]);

    if (!state || (!state.result && !state.data && !state.downloadUrl && !state.batchText)) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Kết quả dự đoán</h1>
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md mb-4">
                    <h2 className="text-xl font-bold mb-2">Chưa có kết quả nào</h2>
                    <p>Vui lòng thực hiện dự đoán trước.</p>
                </div>
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                    onClick={() => navigate("/input")}
                >
                    Quay lại nhập dữ liệu
                </button>
            </div>
        );
    }

    // Batch text view with download buttons (TXT + PDF)
    if (state?.batchText && !state.downloadUrl) {
        const downloadTxt = () => {
            if (!state?.batchText) return;
            const blob = new Blob([state.batchText], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "ppi_results.txt";
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        };

        return (
            <div>
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Kết quả dự đoán</h1>

                {state.inputFiles && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h2 className="text-lg font-semibold text-blue-800 mb-2">File đã upload:</h2>
                        <div className="space-y-1 text-sm text-blue-700">
                            {state.inputFiles.fastaFile && <p>• FASTA: {state.inputFiles.fastaFile}</p>}
                            {state.inputFiles.pairsFile && <p>• Pairs: {state.inputFiles.pairsFile}</p>}
                        </div>
                    </div>
                )}

                {/* Download Button */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <button
                        onClick={downloadTxt}
                        className="inline-flex items-center bg-blue-600 text-black px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors font-medium"
                    >
                        Tải về
                    </button>
                </div>

                {/* Results Table */}
                <div className="overflow-x-auto bg-white shadow-md rounded-xl">
                    <table ref={tableRef} className="table-auto w-full border-collapse border border-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Protein 1</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Protein 2</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoadingPreview && (
                                <tr>
                                    <td className="px-4 py-3 text-sm text-gray-700 border border-gray-300" colSpan={3}>Đang tải...</td>
                                </tr>
                            )}
                            {!isLoadingPreview && batchRows.length === 0 && (
                                <tr>
                                    <td className="px-4 py-3 text-sm text-gray-700 border border-gray-300" colSpan={3}>Không có dữ liệu</td>
                                </tr>
                            )}
                            {batchRows.map((row, idx) => (
                                <tr key={`${row.id1}-${row.id2}-${idx}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{row.id1}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{row.id2}</td>
                                    <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{row.score.toFixed(4)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                    <button 
                        className="bg-blue-600 text-black px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                        onClick={() => navigate("/input")}
                    >
                        Dự đoán lại
                    </button>
                    <button 
                        className="bg-gray-600 text-black px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition-colors"
                        onClick={() => navigate("/history")}
                    >
                        Xem lịch sử
                    </button>
                </div>
            </div>
        );
    }

    // Handle file download case (batch results)
    if (state.downloadUrl) {
        return (
            <div>
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Kết quả dự đoán</h1>
                
                {/* Input Files Info */}
                {state.inputFiles && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h2 className="text-lg font-semibold text-blue-800 mb-2">File đã upload:</h2>
                        <div className="space-y-1 text-sm text-blue-700">
                            {state.inputFiles.fastaFile && <p>• FASTA: {state.inputFiles.fastaFile}</p>}
                            {state.inputFiles.pairsFile && <p>• Pairs: {state.inputFiles.pairsFile}</p>}
                        </div>
                    </div>
                )}

                {/* Download Section */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-green-800 mb-2 text-center">Dự đoán hoàn tất!</h2>
                    <p className="text-green-700 mb-4 text-center">Kết quả đã được xử lý. Xem bản xem trước hoặc tải file đầy đủ.</p>

                    {/* Preview Table for batch results */}
                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">Bản xem trước</p>
                            <div className="flex items-center gap-2">
                                <a
                                    href={state.downloadUrl}
                                    download={state.fileName || 'ppi_results.txt'}
                                    className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Tải TXT
                                </a>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Protein 1</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Protein 2</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoadingPreview && (
                                        <tr>
                                            <td className="px-4 py-3 text-sm text-gray-700 border border-gray-300" colSpan={3}>Đang tải...</td>
                                        </tr>
                                    )}
                                    {!isLoadingPreview && batchRows.length === 0 && (
                                        <tr>
                                            <td className="px-4 py-3 text-sm text-gray-700 border border-gray-300" colSpan={3}>Không có dữ liệu xem trước</td>
                                        </tr>
                                    )}
                                    {batchRows.slice(0, 50).map((row, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{row.id1}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{row.id2}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{row.score.toFixed(4)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4 mt-6">
                    <button 
                        className="bg-blue-600 text-black px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                        onClick={() => navigate("/input")}
                    >
                        Dự đoán lại
                    </button>
                    <button 
                        className="bg-gray-600 text-black px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition-colors"
                        onClick={() => navigate("/history")}
                    >
                        Xem lịch sử
                    </button>
                </div>
            </div>
        );
    }

    // Handle JSON results (single or multiple)
    const results = useMemo(() => state.data || (state.result ? [state.result] : []), [state.data, state.result]);
    const isSinglePredict = results.length === 1 && !!results[0];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Kết quả dự đoán</h1>
            
            {/* Input Data Info */}
            {state.inputData && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h2 className="text-lg font-semibold text-blue-800 mb-2">Dữ liệu đầu vào:</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                        <div>
                            <p><strong>Protein 1:</strong> {renderCell(state.inputData.id1 ?? state.inputData.protein1Id)}</p>
                            <p className="truncate"><strong>Sequence 1:</strong> {renderCell((state.inputData.seq1 ?? state.inputData.protein1Sequence)?.substring ? (state.inputData.seq1 ?? state.inputData.protein1Sequence).substring(0, 50) + '...' : state.inputData.seq1 ?? state.inputData.protein1Sequence)}</p>
                        </div>
                        <div>
                            <p><strong>Protein 2:</strong> {renderCell(state.inputData.id2 ?? state.inputData.protein2Id)}</p>
                            <p className="truncate"><strong>Sequence 2:</strong> {renderCell((state.inputData.seq2 ?? state.inputData.protein2Sequence)?.substring ? (state.inputData.seq2 ?? state.inputData.protein2Sequence).substring(0, 50) + '...' : state.inputData.seq2 ?? state.inputData.protein2Sequence)}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Results Table */}
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {isSinglePredict ? 'Kết quả dự đoán' : `Kết quả (${results.length} cặp protein)`}
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    {/* Single predict: show detailed columns */}
                    {isSinglePredict ? (
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Protein 1</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Protein 2</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Model</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Score</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Label</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Threshold</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((r, idx) => {
                                    // protein1/protein2 might be string or object with { id }
                                    const protein1Id = (r as any)?.protein1?.id ?? (r as any)?.protein1 ?? '';
                                    const protein2Id = (r as any)?.protein2?.id ?? (r as any)?.protein2 ?? '';
                                    const model = (r as any)?.model;
                                    const score = (r as any)?.score;
                                    const label = (r as any)?.label;
                                    const threshold = (r as any)?.threshold;
                                    const timestamp = (r as any)?.timestamp;
                                    return (
                                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{renderCell(protein1Id)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{renderCell(protein2Id)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{renderCell(model)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">
                                                {typeof score === 'number' ? score.toFixed(4) : renderCell(score)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{renderCell(label)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">
                                                {typeof threshold === 'number' ? threshold.toFixed(4) : renderCell(threshold)}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{renderCell(timestamp)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        // Multiple JSON results fallback (if any): simple columns
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Protein 1</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Protein 2</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Score</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Label</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase border border-gray-300">Threshold</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((r, idx) => {
                                    const protein1Id = (r as any)?.protein1?.id ?? (r as any)?.protein1 ?? '';
                                    const protein2Id = (r as any)?.protein2?.id ?? (r as any)?.protein2 ?? '';
                                    const score = (r as any)?.score;
                                    const label = (r as any)?.label;
                                    const threshold = (r as any)?.threshold;
                                    return (
                                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{renderCell(protein1Id)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{renderCell(protein2Id)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{typeof score === 'number' ? score.toFixed(4) : renderCell(score)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{renderCell(label)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 border border-gray-300 whitespace-nowrap">{typeof threshold === 'number' ? threshold.toFixed(4) : renderCell(threshold)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6">
                <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                    onClick={() => navigate("/input")}
                >
                    Dự đoán lại
                </button>
                <button 
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition-colors"
                    onClick={() => navigate("/history")}
                >
                    Xem lịch sử
                </button>
            </div>
        </div>
    );
}



