/**
 * Demo Script - AI MindMap Integration
 * 
 * Hướng dẫn sử dụng AI để tạo mindmap tự động:
 * 
 * 1. Cấu hình API Keys:
 *    - Gemini (Google): https://makersuite.google.com/app/apikey (Miễn phí)
 *    - OpenAI: https://platform.openai.com/api-keys (Có phí)
 * 
 * 2. Tính năng AI:
 *    - Tạo mindmap từ chủ đề
 *    - Cá nhân hóa theo trình độ và sở thích
 *    - Tối ưu theo phong cách học
 *    - Tự động tạo từ vựng liên quan
 * 
 * 3. Cách sử dụng:
 *    - Bấm nút Sparkles (✨) để tạo mindmap AI
 *    - Bấm nút Settings (⚙️) để cấu hình API
 *    - Nhập chủ đề muốn học
 *    - Chọn trình độ và phong cách học
 *    - AI sẽ tạo mindmap phù hợp
 * 
 * 4. Ví dụ chủ đề:
 *    - "Business English"
 *    - "Travel Vocabulary" 
 *    - "Technology Terms"
 *    - "Daily Conversation"
 *    - "Academic Writing"
 * 
 * 5. Lưu ý:
 *    - Gemini API miễn phí với giới hạn
 *    - OpenAI có phí nhưng chất lượng cao hơn
 *    - Cần kết nối internet
 *    - Dữ liệu được lưu local
 */

// Ví dụ response từ AI:
const exampleAIResponse = {
  "central": {
    "id": "central",
    "word": "Business English",
    "x": 50,
    "y": 50,
    "level": 0,
    "color": "#6366f1",
    "connections": [],
    "definition": "Professional English used in business contexts",
    "examples": ["Meetings", "Presentations", "Negotiations"]
  },
  "nodes": [
    {
      "id": "meetings",
      "word": "Meetings",
      "x": 20,
      "y": 20,
      "level": 1,
      "color": "#ef4444",
      "connections": ["central"],
      "definition": "Formal business gatherings",
      "examples": ["Schedule a meeting", "Attend the conference"],
      "relatedWords": ["Conference", "Discussion", "Agenda"]
    },
    {
      "id": "presentations",
      "word": "Presentations",
      "x": 80,
      "y": 20,
      "level": 1,
      "color": "#22c55e",
      "connections": ["central"],
      "definition": "Formal speaking to an audience",
      "examples": ["Give a presentation", "PowerPoint slides"],
      "relatedWords": ["Slides", "Audience", "Speaker"]
    },
    // ... more nodes
  ],
  "theme": "Business Communication",
  "description": "Essential vocabulary for professional business communication"
};

export default exampleAIResponse;
