import { Routes, Route } from "react-router-dom";
import DataInputPage from "../pages/DataInputPage";
import ResultsPage from "../pages/ResultsPage.tsx";
import HistoryPage from "../pages/HistoryPage.tsx";
import HomePage from "../pages/HomePage.tsx";
import LoginPage from "../pages/auth/LoginPage.tsx";
import RegisterPage from "../pages/auth/RegisterPage.tsx";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.tsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.tsx";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/input" element={<DataInputPage />} />
            <Route path="/result" element={<ResultsPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        </Routes>
    );
}
