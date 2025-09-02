import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataInputPage from "../pages/DataInputPage";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DataInputPage />} />
                {/* Các route khác sẽ thêm sau */}
            </Routes>
        </BrowserRouter>
    );
}
