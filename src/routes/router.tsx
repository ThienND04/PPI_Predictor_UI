import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DataInputPage from "../pages/DataInputPage";
import ResultsPage from "../pages/ResultsPage.tsx";
import HistoryPage from "../pages/HistoryPage.tsx";
import Navbar from "../components/Navbar";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <div className="w-full min-h-screen overflow-x-hidden">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/input" element={<DataInputPage />} />
                    <Route path="/results" element={<ResultsPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
