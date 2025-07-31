# AI MindMap Integration - Hướng dẫn sử dụng

## 🚀 Tổng quan
Ứng dụng đã được tích hợp AI để tự động tạo mindmap học từ vựng cá nhân hóa bằng OpenAI GPT và Google Gemini AI.

## 🔧 Cài đặt và Cấu hình

### 1. Cài đặt thư viện
```bash
npm install @google/generative-ai openai @react-native-async-storage/async-storage
```

### 2. Lấy API Keys

#### Google Gemini (Miễn phí - Khuyến nghị)
1. Truy cập: https://makersuite.google.com/app/apikey
2. Đăng nhập tài khoản Google
3. Tạo API key mới
4. Copy API key

#### OpenAI (Có phí)
1. Truy cập: https://platform.openai.com/api-keys
2. Đăng nhập/Đăng ký tài khoản
3. Tạo API key mới
4. Copy API key
5. Nạp credit vào tài khoản

### 3. Cấu hình trong App
1. Mở trang MindMap
2. Bấm nút Settings (⚙️) ở góc trên bên phải
3. Chọn AI Provider (Gemini hoặc OpenAI)
4. Nhập API key
5. Bấm "Lưu API Key"

## 🎯 Cách sử dụng

### Tạo MindMap tự động
1. **Bấm nút Sparkles (✨)** trên header
2. **Nhập thông tin:**
   - Chủ đề muốn học (bắt buộc)
   - Trình độ: Cơ bản/Trung cấp/Nâng cao
   - Sở thích (tùy chọn): công nghệ, du lịch, âm nhạc...
   - Phong cách học: Visual/Auditory/Kinesthetic/Reading
3. **Bấm "Generate MindMap"**
4. **Chờ AI tạo** (5-15 giây)
5. **Mindmap mới xuất hiện** với từ vựng phù hợp

### Ví dụ chủ đề hay
- **Business English** - Tiếng Anh thương mại
- **Travel Vocabulary** - Từ vựng du lịch  
- **Technology Terms** - Thuật ngữ công nghệ
- **Daily Conversation** - Hội thoại hàng ngày
- **Academic Writing** - Viết học thuật
- **Food & Cooking** - Ẩm thực & nấu ăn
- **Medical Terms** - Thuật ngữ y tế
- **Sports & Fitness** - Thể thao & thể hình

## 🔍 Tính năng AI

### Cá nhân hóa thông minh
- **Theo trình độ:** Từ vựng phù hợp với level
- **Theo sở thích:** Ví dụ liên quan đến hobby
- **Theo phong cách học:** Tối ưu cách tiếp cận
- **Theo ngữ cảnh:** Kết nối logic giữa các từ

### Nội dung sinh ra
- **Central Node:** Khái niệm chính
- **Branch Nodes:** 4-6 nhóm từ vựng chính
- **Sub-branches:** 2-3 từ con cho mỗi nhóm
- **Definitions:** Giải thích ý nghĩa
- **Examples:** Ví dụ sử dụng
- **Related Words:** Từ đồng nghĩa/liên quan

## 📱 Giao diện sử dụng

### Header Actions
- **✨ Sparkles:** Tạo AI MindMap mới
- **⚙️ Settings:** Cấu hình API
- **🔍 Search:** Tìm kiếm trong mindmap
- **📤 Share:** Chia sẻ mindmap

### Interactive Canvas
- **Central Circle:** Khái niệm trung tâm
- **Branch Nodes:** Các nhóm từ vựng
- **Connections:** Đường nối thể hiện mối liên hệ
- **Details Panel:** Hiển thị khi bấm vào node

### View Modes
- **👁️ Explore:** Xem tổng quan toàn bộ
- **⚡ Focus:** Tập trung vào 1 nhóm từ

## 🔐 Bảo mật và Privacy

### Local Storage
- API keys được mã hóa và lưu local
- Không gửi lên server
- Chỉ bạn có quyền truy cập

### Data Usage
- Chỉ gửi chủ đề và preferences lên AI
- Không gửi dữ liệu cá nhân
- Response được cache local

## 💡 Tips và Tricks

### Tối ưu prompt
- **Specific topics:** "IELTS Speaking Part 2" thay vì "English"
- **Add context:** "Marketing for startups" thay vì "Marketing" 
- **Include level:** Luôn chọn đúng trình độ
- **Mention interests:** Giúp AI tạo ví dụ phù hợp

### Sử dụng hiệu quả
- **Save favorites:** Screenshot những mindmap hay
- **Combine topics:** Tạo nhiều mindmap cho 1 chủ đề lớn
- **Progressive learning:** Từ basic → intermediate → advanced
- **Review regularly:** Quay lại mindmap cũ để ôn tập

## 🚨 Troubleshooting

### Lỗi thường gặp
- **"No AI provider available":** Chưa cấu hình API key
- **"Generation failed":** Hết quota hoặc lỗi mạng
- **"Invalid API key":** Key sai hoặc hết hạn
- **Mindmap trống:** Chủ đề quá khó hoặc mơ hồ

### Giải pháp
1. **Kiểm tra API key** trong Settings
2. **Thử đổi provider** (Gemini ↔ OpenAI)
3. **Kiểm tra mạng internet**
4. **Đơn giản hóa chủ đề** nếu quá phức tạp
5. **Restart app** nếu cần

## 📊 So sánh Providers

| Tính năng | Google Gemini | OpenAI GPT |
|-----------|---------------|------------|
| **Giá** | Miễn phí | Có phí (~$0.002/1K tokens) |
| **Chất lượng** | Tốt | Rất tốt |
| **Tốc độ** | Nhanh | Trung bình |
| **Giới hạn** | 60 requests/phút | Theo credit |
| **Ngôn ngữ** | Đa ngôn ngữ tốt | Tiếng Anh xuất sắc |
| **Khuyến nghị** | Cho người mới | Cho power user |

## 🎓 Kết luận

AI MindMap giúp bạn:
- ✅ Học từ vựng có hệ thống
- ✅ Cá nhân hóa theo nhu cầu  
- ✅ Tiết kiệm thời gian tạo nội dung
- ✅ Khám phá từ vựng mới liên quan
- ✅ Tăng hiệu quả ghi nhớ bằng visual learning

Hãy thử ngay với chủ đề bạn quan tâm! 🚀
