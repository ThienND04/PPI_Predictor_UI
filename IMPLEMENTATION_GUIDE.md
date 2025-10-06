# Hướng dẫn triển khai PPI Predictor UI

## Tổng quan
Dự án đã được cập nhật với các component và chức năng mới theo yêu cầu. Dưới đây là tóm tắt những gì đã được triển khai:

## Các component đã tạo

### 1. ManualInputForm.tsx
- **Vị trí**: `src/components/ManualInputForm.tsx`
- **Chức năng**: Form nhập thủ công cho 2 protein (ID + chuỗi protein)
- **Tính năng**:
  - Validation input
  - Loading state
  - Error handling
  - Gọi API `/predict` và điều hướng đến ResultPage

### 2. UploadFileForm.tsx
- **Vị trí**: `src/components/UploadFileForm.tsx`
- **Chức năng**: Upload 2 file (FASTA và Pairs) để dự đoán
- **Tính năng**:
  - Upload file FASTA (chứa nhiều protein)
  - Upload file Pairs (chứa các cặp ID protein)
  - Validation file type
  - Gọi API `/predict/upload` với FormData
  - Xử lý kết quả JSON hoặc file download

### 3. DataInputPage.tsx (đã cập nhật)
- **Vị trí**: `src/pages/DataInputPage.tsx`
- **Chức năng**: Trang chính với 2 tab
- **Tính năng**:
  - Tab "Nhập thủ công" → hiển thị ManualInputForm
  - Tab "Upload file" → hiển thị UploadFileForm
  - UI responsive và đẹp mắt

### 4. ResultsPage.tsx (đã cập nhật)
- **Vị trí**: `src/pages/ResultsPage.tsx`
- **Chức năng**: Hiển thị kết quả dự đoán
- **Tính năng**:
  - Hiển thị kết quả JSON dạng bảng
  - Hiển thị nút download cho file kết quả
  - Responsive table
  - Navigation buttons

### 5. API Services (đã cập nhật)
- **Vị trí**: `src/services/api.ts`
- **Chức năng**: Các hàm API mới
- **Hàm mới**:
  - `predictManual()`: Gọi POST `/predict` với JSON
  - `predictUpload()`: Gọi POST `/predict/upload` với FormData
  - Xử lý response JSON và file download

### 6. Router (đã cập nhật)
- **Vị trí**: `src/routes/router.tsx`
- **Route mới**:
  - `/input` → DataInputPage
  - `/result` → ResultsPage
  - Giữ nguyên các route cũ để tương thích

## Cấu trúc API

### Manual Prediction
```typescript
POST /predict
Content-Type: application/json

{
  "protein1": {
    "id": "string",
    "sequence": "string"
  },
  "protein2": {
    "id": "string", 
    "sequence": "string"
  }
}

Response: ManualPredictResponse
```

### Upload Prediction
```typescript
POST /predict/upload
Content-Type: multipart/form-data

FormData:
- fasta_file: File (FASTA format)
- pairs_file: File (pairs format)

Response: 
- JSON array of ManualPredictResponse (nếu kết quả nhỏ)
- File download (nếu kết quả lớn)
```

## Định dạng file

### FASTA File
```
>protein1
MKLLVVLLLCLAVALA
>protein2
MKLLVVLLLCLAVALA
```

### Pairs File
```
protein1,protein2
protein1,protein3
protein2,protein3
```

## Cách sử dụng

1. **Nhập thủ công**:
   - Chọn tab "Nhập thủ công"
   - Điền ID và chuỗi protein cho 2 protein
   - Nhấn "Thực hiện dự đoán"
   - Xem kết quả trong bảng

2. **Upload file**:
   - Chọn tab "Upload file"
   - Upload file FASTA chứa các protein
   - Upload file Pairs chứa các cặp protein
   - Nhấn "Upload & Dự đoán"
   - Tải xuống kết quả hoặc xem trong bảng

## Tùy chỉnh

### Environment Variables
```env
VITE_API_BASE=http://localhost:8000  # Base URL của API backend
```

### Styling
- Sử dụng TailwindCSS
- Responsive design
- Color scheme: Blue cho manual input, Green cho file upload
- Modern UI với shadows và rounded corners

## Lưu ý kỹ thuật

1. **TypeScript**: Tất cả component được viết bằng TypeScript với type safety
2. **Error Handling**: Xử lý lỗi đầy đủ với user-friendly messages
3. **Loading States**: Hiển thị loading khi đang xử lý
4. **File Validation**: Kiểm tra định dạng file trước khi upload
5. **Memory Management**: Cleanup URL objects khi download file
6. **Responsive**: Hoạt động tốt trên mobile và desktop

## Testing

Để test các chức năng:

1. Start development server: `npm run dev`
2. Test manual input với dữ liệu mẫu
3. Test file upload với file FASTA và Pairs mẫu
4. Kiểm tra navigation giữa các trang
5. Test responsive trên các kích thước màn hình khác nhau
