import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-x-hidden pt-16">
      <div className="w-full max-w-screen-xl mx-auto px-6 py-12">
        <div className="text-center">
          {/* Tiêu đề chính */}
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            PPI Predictor
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Hệ thống dự đoán tương tác Protein-Protein
          </p>
          
          {/* Mô tả */}
          <div className="w-full mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              Chào mừng đến với PPI Predictor - một công cụ tiên tiến sử dụng trí tuệ nhân tạo 
              để dự đoán khả năng tương tác giữa các protein. Hệ thống của chúng tôi giúp các nhà nghiên cứu 
              và sinh viên trong lĩnh vực sinh học phân tử dễ dàng phân tích và dự đoán các tương tác protein, 
              góp phần thúc đẩy nghiên cứu khoa học và phát triển dược phẩm.
            </p>
          </div>

          {/* Mục tiêu dự án */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Mục tiêu dự án</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Tự động hóa</h3>
                <p className="text-gray-600 text-sm">
                  Tự động hóa quá trình phân tích và dự đoán tương tác protein
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Tốc độ cao</h3>
                <p className="text-gray-600 text-sm">
                  Cung cấp kết quả nhanh chóng với độ chính xác cao
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Dễ sử dụng</h3>
                <p className="text-gray-600 text-sm">
                  Giao diện thân thiện, dễ dàng sử dụng cho mọi đối tượng
                </p>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Bắt đầu khám phá</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/input")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
              >
                Nhập dữ liệu protein
              </button>
              <button
                onClick={() => navigate("/results")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
              >
                Xem kết quả
              </button>
              <button
                onClick={() => navigate("/history")}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
              >
                Lịch sử tra cứu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
