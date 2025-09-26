import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataInputPage from "../pages/DataInputPage";
import ResultsPage from "../pages/ResultsPage.tsx";
import HistoryPage from "../pages/HistoryPage.tsx";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DataInputPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </BrowserRouter>
    );
}
