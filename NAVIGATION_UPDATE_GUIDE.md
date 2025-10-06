# Hướng dẫn cập nhật Navigation và Layout

## Tổng quan
Đã cập nhật toàn bộ cấu trúc navigation và layout của ứng dụng PPI Predictor để có giao diện đồng nhất và dễ sử dụng.

## Các thay đổi chính

### 1. Component Navbar.tsx (MỚI)
- **Vị trí**: `src/components/Navbar.tsx`
- **Chức năng**: Navigation bar cố định ở đầu trang
- **Tính năng**:
  - Logo PPI Predictor với icon
  - Navigation links: Home, Dự đoán, Kết quả, Lịch sử
  - Active state highlighting với border-bottom
  - Responsive design

### 2. Component Layout.tsx (MỚI)
- **Vị trí**: `src/components/Layout.tsx`
- **Chức năng**: Layout chung cho tất cả các trang
- **Tính năng**:
  - Wrapper với `min-h-screen bg-gray-50`
  - Container chính với `max-w-5xl mx-auto px-6 py-12 pt-24`
  - Include Navbar ở tất cả các trang

### 3. Cấu trúc Route mới
```
/ → HomePage (trang chủ)
/input → DataInputPage (nhập dữ liệu)
/result → ResultPage (kết quả dự đoán)
/history → HistoryPage (lịch sử)
```

### 4. Cập nhật App.tsx
- Thêm BrowserRouter wrapper
- Sử dụng Layout component chung
- Cấu trúc: BrowserRouter > Layout > Routes

### 5. Cập nhật các trang

#### HomePage.tsx
- Loại bỏ layout cũ (min-h-screen, padding, etc.)
- Giữ lại nội dung chính
- Cập nhật button styles theo chuẩn mới
- Sửa link navigation từ `/results` thành `/result`

#### DataInputPage.tsx
- Loại bỏ container wrapper cũ
- Cập nhật tabs style:
  - Từ rounded tabs → border-bottom tabs
  - Active state: `border-b-2 border-blue-600 text-blue-600 font-semibold`
  - Inactive state: `border-transparent text-gray-500 hover:text-gray-700`

#### ResultPage.tsx
- Loại bỏ container wrapper cũ
- Cập nhật table style:
  - Từ `min-w-full divide-y` → `table-auto w-full border-collapse`
  - Thêm `border-b` cho tất cả cells
  - Cập nhật card styles: `shadow-md rounded-xl`

#### Components (ManualInputForm, UploadFileForm)
- Cập nhật input styles: `border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none`
- Cập nhật button styles: `bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors`
- Cập nhật card styles: `bg-white shadow-md rounded-xl p-6`

## Style Guide mới

### Container Layout
```jsx
<div className="min-h-screen bg-gray-50">
  <Navbar />
  <div className="max-w-5xl mx-auto px-6 py-12 pt-24">
    {/* Page content */}
  </div>
</div>
```

### Page Title
```jsx
<h1 className="text-3xl font-bold mb-6 text-gray-800">Page Title</h1>
```

### Cards/Boxes
```jsx
<div className="bg-white shadow-md rounded-xl p-6">
  {/* Card content */}
</div>
```

### Buttons
```jsx
<button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors">
  Button Text
</button>
```

### Input Fields
```jsx
<input className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none" />
```

### Tables
```jsx
<table className="table-auto w-full border-collapse">
  <thead>
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
        Header
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-b">
        Content
      </td>
    </tr>
  </tbody>
</table>
```

### Tabs Navigation
```jsx
<div className="border-b border-gray-200 mb-6">
  <nav className="-mb-px flex space-x-8">
    <button className="border-b-2 border-blue-600 text-blue-600 font-semibold py-2 px-1">
      Active Tab
    </button>
    <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-2 px-1">
      Inactive Tab
    </button>
  </nav>
</div>
```

## Navigation Features

### Navbar Features
- **Fixed position**: Luôn hiển thị ở đầu trang
- **Active highlighting**: Trang hiện tại được highlight với border-bottom
- **Responsive**: Hoạt động tốt trên mobile và desktop
- **Logo**: PPI Predictor với icon DNA/protein
- **Links**: Home, Dự đoán, Kết quả, Lịch sử

### Active State Logic
```typescript
const isActive = (path: string) => {
  return location.pathname === path;
};
```

## Responsive Design
- **Mobile**: Navigation links stack vertically nếu cần
- **Tablet**: Navigation links hiển thị ngang
- **Desktop**: Full navigation với spacing rộng

## Color Scheme
- **Primary**: Blue (#2563eb)
- **Success**: Green (#059669)
- **Warning**: Yellow (#d97706)
- **Error**: Red (#dc2626)
- **Neutral**: Gray (#6b7280)

## Testing
Để test các tính năng mới:

1. **Navigation**: Click qua các link trong navbar
2. **Active state**: Kiểm tra trang hiện tại được highlight
3. **Responsive**: Test trên các kích thước màn hình khác nhau
4. **Layout consistency**: Kiểm tra tất cả trang có layout giống nhau
5. **Form styling**: Test input và button styles mới

## Lưu ý kỹ thuật

1. **TypeScript**: Tất cả component có type safety
2. **React Router v6**: Sử dụng hooks và components mới nhất
3. **TailwindCSS**: Consistent styling với utility classes
4. **Performance**: Layout component được optimize
5. **Accessibility**: Proper ARIA labels và keyboard navigation

## Migration Notes

- Tất cả trang đã được cập nhật để sử dụng layout chung
- Không cần thay đổi logic business, chỉ UI/UX
- Backward compatible với các route cũ (`/results` vẫn hoạt động)
- Có thể dễ dàng thêm trang mới bằng cách sử dụng Layout component
