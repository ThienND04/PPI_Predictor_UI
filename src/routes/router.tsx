import { Routes, Route } from "react-router-dom";
import DataInputPage from "../pages/DataInputPage";
import ResultsPage from "../pages/ResultsPage.tsx";
import HistoryPage from "../pages/HistoryPage.tsx";
import HomePage from "../pages/HomePage.tsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/input" element={<DataInputPage />} />
            <Route path="/result" element={<ResultsPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/history" element={<HistoryPage />} />
        </Routes>
    );
}
