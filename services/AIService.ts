import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface MindMapNode {
  id: string;
  word: string;
  x: number;
  y: number;
  level: number;
  color: string;
  connections: string[];
  definition?: string;
  examples?: string[];
  relatedWords?: string[];
}

export interface GeneratedMindMap {
  central: MindMapNode;
  nodes: MindMapNode[];
  theme: string;
  description: string;
}

class AIService {
  private geminiAI: GoogleGenerativeAI | null = null;
  private openAI: OpenAI | null = null;
  private currentProvider: 'gemini' | 'openai' = 'gemini';

  async initialize() {
    try {
      // Lấy API keys từ storage
      const geminiKey = await AsyncStorage.getItem('GEMINI_API_KEY');
      const openaiKey = await AsyncStorage.getItem('OPENAI_API_KEY');

      if (geminiKey) {
        this.geminiAI = new GoogleGenerativeAI(geminiKey);
      }

      if (openaiKey) {
        this.openAI = new OpenAI({
          apiKey: openaiKey,
        });
      }

      // Ưu tiên Gemini nếu có key
      this.currentProvider = geminiKey ? 'gemini' : 'openai';
    } catch (error) {
      console.error('AI Service initialization error:', error);
    }
  }

  async setAPIKey(provider: 'gemini' | 'openai', apiKey: string) {
    try {
      if (provider === 'gemini') {
        await AsyncStorage.setItem('GEMINI_API_KEY', apiKey);
        this.geminiAI = new GoogleGenerativeAI(apiKey);
      } else {
        await AsyncStorage.setItem('OPENAI_API_KEY', apiKey);
        this.openAI = new OpenAI({ apiKey });
      }
      this.currentProvider = provider;
    } catch (error) {
      console.error('Error setting API key:', error);
      throw error;
    }
  }

  async generatePersonalizedMindMap(
    topic: string,
    userLevel: 'beginner' | 'intermediate' | 'advanced',
    interests: string[],
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  ): Promise<GeneratedMindMap> {
    const prompt = this.createPersonalizedPrompt(topic, userLevel, interests, learningStyle);
    
    try {
      if (this.currentProvider === 'gemini' && this.geminiAI) {
        return await this.generateWithGemini(prompt);
      } else if (this.currentProvider === 'openai' && this.openAI) {
        return await this.generateWithOpenAI(prompt);
      } else {
        throw new Error('No AI provider available. Please set up API keys.');
      }
    } catch (error) {
      console.error('Mind map generation error:', error);
      throw error;
    }
  }

  private createPersonalizedPrompt(
    topic: string,
    userLevel: string,
    interests: string[],
    learningStyle: string
  ): string {
    return `
Create a personalized mind map for learning vocabulary around the topic "${topic}".

User Profile:
- Level: ${userLevel}
- Interests: ${interests.join(', ')}
- Learning Style: ${learningStyle}

Please generate a mind map with:
1. One central concept
2. 4-6 main branches (level 1 nodes)
3. 2-3 sub-branches for each main branch (level 2 nodes)
4. Vocabulary appropriate for ${userLevel} level
5. Examples and connections relevant to interests: ${interests.join(', ')}
6. Learning approach optimized for ${learningStyle} learners

Return the response as a JSON object with this structure:
{
  "central": {
    "id": "central",
    "word": "Central Topic",
    "x": 50,
    "y": 50,
    "level": 0,
    "color": "#6366f1",
    "connections": [],
    "definition": "Main concept definition",
    "examples": ["example1", "example2"]
  },
  "nodes": [
    {
      "id": "unique_id",
      "word": "Branch Word",
      "x": 30,
      "y": 30,
      "level": 1,
      "color": "#ef4444",
      "connections": ["central"],
      "definition": "Word definition",
      "examples": ["usage example"],
      "relatedWords": ["synonym1", "synonym2"]
    }
  ],
  "theme": "Learning theme name",
  "description": "Brief description of the mind map focus"
}

Make sure vocabulary is contextually connected and progressively builds from basic to complex concepts.
`;
  }

  private async generateWithGemini(prompt: string): Promise<GeneratedMindMap> {
    if (!this.geminiAI) throw new Error('Gemini AI not initialized');

    const model = this.geminiAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return this.parseAIResponse(text);
  }

  private async generateWithOpenAI(prompt: string): Promise<GeneratedMindMap> {
    if (!this.openAI) throw new Error('OpenAI not initialized');

    const completion = await this.openAI.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 2000,
    });

    const text = completion.choices[0]?.message?.content || '';
    return this.parseAIResponse(text);
  }

  private parseAIResponse(text: string): GeneratedMindMap {
    try {
      // Tìm JSON trong response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const jsonString = jsonMatch[0];
      const parsed = JSON.parse(jsonString);

      // Validate và format lại dữ liệu
      return this.validateAndFormatMindMap(parsed);
    } catch (error) {
      console.error('Error parsing AI response:', error);
      // Fallback với dữ liệu mẫu
      return this.getFallbackMindMap();
    }
  }

  private validateAndFormatMindMap(data: any): GeneratedMindMap {
    // Ensure positions are distributed properly
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899'];
    
    const nodes = data.nodes.map((node: any, index: number) => ({
      ...node,
      id: node.id || `node_${index}`,
      color: node.color || colors[index % colors.length],
      x: node.x || (30 + (index % 3) * 20),
      y: node.y || (20 + Math.floor(index / 3) * 25),
      connections: node.connections || ['central'],
      examples: node.examples || [],
      relatedWords: node.relatedWords || []
    }));

    return {
      central: {
        id: 'central',
        ...data.central,
        connections: [],
        examples: data.central.examples || []
      },
      nodes,
      theme: data.theme || 'Personalized Learning',
      description: data.description || 'AI-generated personalized mind map'
    };
  }

  private getFallbackMindMap(): GeneratedMindMap {
    return {
      central: {
        id: 'central',
        word: 'Learning',
        x: 50,
        y: 50,
        level: 0,
        color: '#6366f1',
        connections: [],
        definition: 'The process of acquiring knowledge',
        examples: ['Study', 'Practice', 'Experience']
      },
      nodes: [
        {
          id: 'reading',
          word: 'Reading',
          x: 20,
          y: 20,
          level: 1,
          color: '#ef4444',
          connections: ['central'],
          definition: 'Understanding written text',
          examples: ['Books', 'Articles'],
          relatedWords: ['Literature', 'Comprehension']
        },
        {
          id: 'writing',
          word: 'Writing',
          x: 80,
          y: 20,
          level: 1,
          color: '#22c55e',
          connections: ['central'],
          definition: 'Expressing ideas in text',
          examples: ['Essays', 'Stories'],
          relatedWords: ['Grammar', 'Vocabulary']
        }
      ],
      theme: 'Basic Learning',
      description: 'Fundamental learning concepts'
    };
  }

  async generateMindMapFromUserData(userVocabulary: string[]): Promise<GeneratedMindMap> {
    const prompt = `
Analyze these vocabulary words and create a connected mind map: ${userVocabulary.join(', ')}

Create logical groupings and show relationships between words. Return as JSON format as specified earlier.
`;

    return this.generatePersonalizedMindMap('Custom Vocabulary', 'intermediate', [], 'visual');
  }

  switchProvider(provider: 'gemini' | 'openai') {
    this.currentProvider = provider;
  }

  getCurrentProvider(): string {
    return this.currentProvider;
  }

  isConfigured(): boolean {
    return (this.currentProvider === 'gemini' && this.geminiAI !== null) ||
           (this.currentProvider === 'openai' && this.openAI !== null);
  }
}

export const aiService = new AIService();
