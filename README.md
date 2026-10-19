# Nền Tảng Học Tập: Rà Quét URL & Phân Tích Tệp Tin Độc Hại (Bài 4)

Ứng dụng web tương tác mô phỏng an toàn thông tin dành cho học viên trung cấp, cao đẳng và đại học. Bao gồm bộ lọc dữ liệu thực tế tại Việt Nam, kính lúp phân tích URL, giả lập VirusTotal 70+ AV, sơ đồ tiến trình sandbox Any.run, phòng lab tính mã băm SHA-256 nội bộ và đấu trường thử thách SOC.

---

## 🚀 Hướng Dẫn Nhanh: Đưa Lên GitHub & Mở Web Cho Học Sinh Học Online

Để học sinh có thể mở trang web học trực tiếp trên máy tính hoặc điện thoại mà không cần cài đặt phần mềm nào, bạn chỉ cần thực hiện 3 bước sau:

### Bước 1: Tạo Repository Trên GitHub
1. Đăng nhập vào [GitHub.com](https://github.com).
2. Bấm nút **New** (hoặc dấu `+` ở góc trên bên phải) để tạo một Repository mới.
3. Đặt tên repository (ví dụ: `cybersec-lesson-4`), chọn chế độ **Public**, sau đó bấm **Create repository**.

### Bước 2: Tải Mã Nguồn & Đẩy Lên GitHub
Mở Terminal / Command Prompt trong thư mục dự án và chạy các lệnh sau:

```bash
# 1. Khởi tạo Git
git init

# 2. Thêm toàn bộ file vào git
git add .

# 3. Tạo commit đầu tiên
git commit -m "Khoi tao nen tang thuc hanh An toan thong tin Bai 4"

# 4. Đổi tên nhánh chính sang main
git branch -M main

# 5. Kết nối tới kho GitHub của bạn (thay username và repo của bạn vào)
git remote add origin https://github.com/<TEN_GITHUB_CUA_BAN>/<TEN_REPO>.git

# 6. Đẩy code lên
git push -u origin main
```

---

### Bước 3: Xuất Bản Web Trực Tuyến Miễn Phí (GitHub Pages hoặc Vercel)

#### Cách 1: Triển khai siêu nhanh qua Vercel (Khuyên dùng - 1 Click)
1. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
2. Bấm **Add New...** &rarr; **Project**.
3. Chọn repository vừa tạo và bấm **Deploy**.
4. Chỉ sau 30 giây, bạn sẽ có đường link như: `https://cybersec-lesson-4.vercel.app` để gửi cho học sinh học ngay lập tức!

#### Cách 2: Triển khai qua GitHub Pages
Dự án đã được cấu hình sẵn `base: './'` trong `vite.config.ts`.
1. Chạy lệnh đóng gói:
   ```bash
   npm run build
   ```
2. Thư mục `dist/` được tạo ra chứa toàn bộ mã nguồn tĩnh.
3. Cài đặt công cụ đẩy nhánh gh-pages:
   ```bash
   npx gh-pages -d dist
   ```
4. Vào repository trên GitHub &rarr; **Settings** &rarr; **Pages** &rarr; Tại mục **Branch** chọn `gh-pages` &rarr; **Save**.
5. Đường link học trực tuyến sẽ có dạng: `https://<TEN_GITHUB_CUA_BAN>.github.io/<TEN_REPO>/`.

---

## 💻 Chạy Cục Bộ Trên Máy Tính (Dành Cho Giáo Viên / Học Sinh)

Yêu cầu máy đã cài **Node.js** (phiên bản 18 trở lên).

```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi động môi trường phát triển cục bộ
npm run dev
```

Mở trình duyệt truy cập: `http://localhost:3000` (hoặc cổng hiển thị trên terminal).

---

## 📚 Nội Dung Giáo Trình Trong Ứng Dụng

- **Tổng quan bài học & Khung thời gian 135 phút** chuẩn sư phạm.
- **Biểu đồ kênh phát tán độc hại tại Việt Nam**: Hóa đơn giả, phần mềm crack, link Drive giả, CV tuyển dụng.
- **Mô phỏng kính lúp URL**: Phát hiện Typosquatting, Homograph Cyrillic, Subdomain bẫy, đuôi lạ `.xyz/.top`.
- **Giả lập VirusTotal**: Nhận diện tỉ lệ phát hiện x/90, cảnh báo Zero-Day 2/90 và lệch chữ ký tệp tin.
- **Sơ đồ tiến trình Sandbox Any.run**: Quan sát hành vi chạy ngầm, kết nối C2 IP và sửa Windows Registry.
- **Phòng Lab Hash SHA-256**: Tính mã băm tệp tin trực tiếp bằng Web Crypto API không upload ra mạng, demo hiệu ứng thác lũ và tệp kiểm tra chuẩn EICAR.
- **Công thức Cố định 5 Bước (SOP)** & Cây ra quyết định xử lý sự cố khẩn cấp.
- **Đấu trường tương tác SOC**: 6 màn thử thách thực tế có chấm điểm, chuỗi combo và chứng nhận.
