# English Learning App - Định hướng nâng cấp trải nghiệm học tập

## 🎯 Mục tiêu sản phẩm
Tạo ra một ứng dụng học tiếng Anh giúp người dùng:
- Tự học và phản hồi bằng AI
- Luyện nói/nghe/viết qua hội thoại thực tế
- Hứng thú học nhờ mô phỏng tình huống và game hóa
- Cảm nhận được sự tiến bộ thật qua từng ngày

---

## 🚀 Tính năng đột phá đề xuất

### 1. 🧠 Tự học + Phản hồi bằng GPT
- User viết đoạn văn hoặc nói 1 câu
- AI phản hồi:
  - Đúng/Sai
  - Sửa lỗi
  - Viết lại tốt hơn (nâng cấp)

### 2. 🗣️ Luyện nói hội thoại thực tế
- AI đóng vai người đối thoại (phỏng vấn, hỏi đường…)
- User nói bằng giọng nói
- Whisper -> chuyển thành text -> GPT đánh giá và phản hồi

### 3. 🔁 Mô phỏng tình huống đời thực
- User vào vai nhân vật trong hội thoại (đi mua hàng, đặt khách sạn)
- Từng bước hội thoại có thể được gợi ý và đánh giá

### 4. 📊 Theo dõi tiến bộ kỹ năng thực tế
- Lưu điểm, từ vựng đã học
- Đánh giá khả năng nghe/nói/đọc/viết theo tuần
- Giao diện biểu đồ tiến bộ

### 5. 🎥 Học từ video ngắn (short form)
- Xem video ngắn có phụ đề
- Click vào từ → lưu từ → luyện tập lại

---

## ✨ Các tính năng gây nghiện (sticky UX)

- Flashcard vuốt như Tinder
- Ranking, điểm XP mỗi ngày
- Câu hỏi phản xạ mỗi sáng “What are you doing today?”
- Daily streak + phần thưởng
- Đoán từ qua ảnh, âm thanh (ảo ảnh ngôn ngữ)

---

## 🤖 Prompt GPT chấm nói/viết (dùng trong n8n)

### Prompt chấm đoạn viết:
```
You are an English teacher. Analyze the following English sentence or paragraph written by a student. Return:
1. A score from 0 to 10 for grammar and vocabulary usage.
2. A short explanation of the mistakes (if any).
3. Suggestions for improving the sentence.
4. A corrected version (if needed).
Student's sentence: "{{input}}"
```

### Prompt chấm phát âm (sau khi Whisper đã chuyển thành text):
```
You are an English speaking coach. Compare the student's spoken sentence with the target sentence. Return:
1. Whether the student spoke the correct sentence (Yes/No)
2. Any word that was missing, incorrect, or mispronounced
3. A pronunciation feedback note
Target sentence: "{{target}}"
Student's spoken text: "{{spoken}}"
```

---

## 🔁 Gợi ý n8n flow: “Phân tích phản hồi AI + Lưu kết quả vào Supabase”

### 🎯 Use-case: Chấm đoạn văn người học viết

#### Các bước flow:
1. Webhook nhận `text` từ app (người dùng viết)
2. Gửi `text` vào OpenAI GPT (dùng prompt viết ở trên)
3. GPT trả về:
   - điểm (score)
   - nhận xét (feedback)
   - câu sửa lại (corrected)
4. Gửi kết quả xuống Supabase bảng `writing_feedback`
5. Trả JSON về cho app để hiển thị

#### Nodes trong n8n:
- Webhook node (POST từ app)
- Set node (gắn prompt)
- OpenAI node (ChatGPT)
- Function node (tách kết quả từ GPT)
- Supabase node (Insert dữ liệu vào bảng)
- Response node (trả kết quả cho frontend)

👉 Flow tương tự có thể dùng cho luyện nói bằng cách thêm bước Whisper (OpenAI speech-to-text).

---

## ✅ Bước tiếp theo:
- Chọn bảng Supabase muốn lưu (`writing_feedback` hoặc `speaking_feedback`)
- Tạo webhook và cấu trúc dữ liệu gửi từ app
- Mình sẽ hướng dẫn tạo flow đầu tiên trên n8n (có thể test được luôn)