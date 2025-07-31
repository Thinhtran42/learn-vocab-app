import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Share2, 
  Maximize2, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye,
  Brain,
  Zap,
  Settings,
  Sparkles,
  X
} from 'lucide-react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { aiService, GeneratedMindMap } from '../../services/AIService';
import AISettings from '../../components/AISettings';

const mindMapData = {
  central: { word: 'Communication', x: 50, y: 50 },
  nodes: [
    { word: 'Speaking', x: 20, y: 20, level: 1, color: '#FF6B6B' },
    { word: 'Writing', x: 80, y: 20, level: 1, color: '#4ECDC4' },
    { word: 'Listening', x: 20, y: 80, level: 1, color: '#45B7D1' },
    { word: 'Reading', x: 80, y: 80, level: 1, color: '#96CEB4' },
    { word: 'Conversation', x: 10, y: 35, level: 2, color: '#FF6B6B' },
    { word: 'Presentation', x: 30, y: 10, level: 2, color: '#FF6B6B' },
    { word: 'Email', x: 90, y: 10, level: 2, color: '#4ECDC4' },
    { word: 'Letter', x: 70, y: 30, level: 2, color: '#4ECDC4' },
    { word: 'Music', x: 10, y: 90, level: 2, color: '#45B7D1' },
    { word: 'Podcast', x: 30, y: 70, level: 2, color: '#45B7D1' },
  ]
};

const categories = [
  { name: 'All', active: true },
  { name: 'Verbs', active: false },
  { name: 'Nouns', active: false },
  { name: 'Adjectives', active: false },
];

export default function MindMapScreen() {
  const { theme, isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWord, setSelectedWord] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'explore' | 'focus'>('explore');
  
  // AI Integration States
  const [showAISettings, setShowAISettings] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMindMap, setGeneratedMindMap] = useState<GeneratedMindMap | null>(null);
  const [currentMindMap, setCurrentMindMap] = useState(mindMapData);
  
  // AI Generation Form
  const [topic, setTopic] = useState('');
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [interests, setInterests] = useState('');
  const [learningStyle, setLearningStyle] = useState<'visual' | 'auditory' | 'kinesthetic' | 'reading'>('visual');

  useEffect(() => {
    initializeAI();
  }, []);

  const initializeAI = async () => {
    await aiService.initialize();
  };

  const handleGenerateAIMindMap = async () => {
    if (!topic.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập chủ đề muốn học');
      return;
    }

    if (!aiService.isConfigured()) {
      setShowAISettings(true);
      return;
    }

    setIsGenerating(true);
    try {
      const interestsList = interests.split(',').map(i => i.trim()).filter(i => i);
      const generated = await aiService.generatePersonalizedMindMap(
        topic,
        userLevel,
        interestsList,
        learningStyle
      );
      
      setGeneratedMindMap(generated);
      setCurrentMindMap({
        central: generated.central,
        nodes: generated.nodes.slice(0, 10) // Giới hạn để hiển thị đẹp
      });
      setShowGenerateModal(false);
      Alert.alert('Thành công', `Đã tạo mindmap AI cho chủ đề "${topic}"!`);
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể tạo mindmap. Vui lòng thử lại.');
      console.error('AI Generation Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Modern Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
              <Brain size={24} color="#FFFFFF" />
            </View>
            <View>
              <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Mind Map</Text>
              <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
                Visual learning
              </Text>
            </View>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => setShowGenerateModal(true)}
            >
              <Sparkles size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: theme.colors.card }]}
              onPress={() => setShowAISettings(true)}
            >
              <Settings size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.card }]}>
              <Search size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.card }]}>
              <Share2 size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {/* Modern Control Bar */}
        <View style={[styles.controlBar, { backgroundColor: theme.colors.card }]}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.categories}
            contentContainerStyle={styles.categoriesContent}
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryChip,
                  { 
                    backgroundColor: category.active ? theme.colors.primary : 'transparent',
                    borderColor: theme.colors.border 
                  }
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <Text style={[
                  styles.categoryText,
                  { 
                    color: category.active ? '#FFFFFF' : theme.colors.textSecondary 
                  }
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.viewModeToggle}>
            <TouchableOpacity 
              style={[
                styles.modeButton,
                viewMode === 'explore' && { backgroundColor: theme.colors.primary }
              ]}
              onPress={() => setViewMode('explore')}
            >
              <Eye size={16} color={viewMode === 'explore' ? '#FFFFFF' : theme.colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.modeButton,
                viewMode === 'focus' && { backgroundColor: theme.colors.primary }
              ]}
              onPress={() => setViewMode('focus')}
            >
              <Zap size={16} color={viewMode === 'focus' ? '#FFFFFF' : theme.colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Interactive Mindmap Canvas */}
        <View style={[styles.mindMapCanvas, { backgroundColor: theme.colors.card }]}>
          <View style={styles.canvasHeader}>
            <View>
              <Text style={[styles.canvasTitle, { color: theme.colors.text }]}>
                {generatedMindMap ? generatedMindMap.theme : 'Communication Network'}
              </Text>
              {generatedMindMap && (
                <Text style={[styles.canvasSubtitle, { color: theme.colors.textSecondary }]}>
                  {generatedMindMap.description}
                </Text>
              )}
            </View>
            <View style={styles.canvasActions}>
              <TouchableOpacity style={[styles.canvasButton, { backgroundColor: theme.colors.background }]}>
                <Plus size={16} color={theme.colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.canvasButton, { backgroundColor: theme.colors.background }]}>
                <Maximize2 size={16} color={theme.colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.canvasButton, { backgroundColor: theme.colors.background }]}>
                <Download size={16} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Simplified Visual Representation */}
          <View style={styles.visualMindMap}>
            <View style={styles.centerNode}>
              <TouchableOpacity 
                style={[styles.centralCircle, { backgroundColor: theme.colors.primary }]}
                onPress={() => setSelectedWord(currentMindMap.central)}
              >
                <Text style={styles.centralText}>{currentMindMap.central.word}</Text>
              </TouchableOpacity>
            </View>

            {/* Branch Nodes */}
            <View style={styles.branchNodes}>
              {currentMindMap.nodes.slice(0, 4).map((node, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.branchNode,
                    { 
                      backgroundColor: node.color,
                      transform: [
                        { translateX: (index % 2 === 0 ? -1 : 1) * 80 },
                        { translateY: (index < 2 ? -1 : 1) * 60 }
                      ]
                    }
                  ]}
                  onPress={() => setSelectedWord(node)}
                >
                  <Text style={styles.branchText}>{node.word}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Connection Lines */}
            <View style={styles.connectionLines}>
              {[0, 1, 2, 3].map((index) => (
                <View
                  key={index}
                  style={[
                    styles.connectionLine,
                    {
                      backgroundColor: theme.colors.border,
                      transform: [{ rotate: `${index * 90}deg` }]
                    }
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Smart Word Details Panel */}
        {selectedWord && (
          <View style={[styles.wordDetails, { backgroundColor: theme.colors.card }]}>
            <View style={styles.wordHeader}>
              <Text style={[styles.selectedWord, { color: theme.colors.text }]}>
                {selectedWord.word}
              </Text>
              <TouchableOpacity style={styles.shareButton}>
                <Share2 size={16} color={theme.colors.primary} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.wordDescription, { color: theme.colors.textSecondary }]}>
              {selectedWord.definition || 
               (selectedWord === currentMindMap.central 
                ? "Central concept connecting all vocabulary relationships"
                : `Branch concept related to ${currentMindMap.central.word} - explore connections`
               )}
            </Text>
            <View style={styles.relatedWords}>
              <Text style={[styles.relatedTitle, { color: theme.colors.text }]}>
                {selectedWord.relatedWords ? 'Related Words:' : 'Connected Words:'}
              </Text>
              <View style={styles.relatedChips}>
                {(selectedWord.relatedWords || ['Express', 'Interact', 'Connect', 'Share', 'Discuss']).map((word: string, index: number) => (
                  <TouchableOpacity key={index} style={styles.relatedChip}>
                    <Text style={[styles.relatedChipText, { color: theme.colors.primary }]}>
                      {word}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </View>

      {/* AI Generation Modal */}
      <Modal
        visible={showGenerateModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              Generate AI MindMap
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowGenerateModal(false)}
            >
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: theme.colors.text }]}>
                Chủ đề muốn học *
              </Text>
              <TextInput
                style={[styles.formInput, { 
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  borderColor: theme.colors.border
                }]}
                value={topic}
                onChangeText={setTopic}
                placeholder="Ví dụ: Business English, Travel, Technology..."
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: theme.colors.text }]}>
                Trình độ
              </Text>
              <View style={styles.levelSelector}>
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.levelButton,
                      { 
                        backgroundColor: userLevel === level ? theme.colors.primary : theme.colors.card,
                        borderColor: theme.colors.border
                      }
                    ]}
                    onPress={() => setUserLevel(level as any)}
                  >
                    <Text style={[
                      styles.levelButtonText,
                      { color: userLevel === level ? '#FFFFFF' : theme.colors.text }
                    ]}>
                      {level === 'beginner' ? 'Cơ bản' : level === 'intermediate' ? 'Trung cấp' : 'Nâng cao'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: theme.colors.text }]}>
                Sở thích (tùy chọn)
              </Text>
              <TextInput
                style={[styles.formInput, { 
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  borderColor: theme.colors.border
                }]}
                value={interests}
                onChangeText={setInterests}
                placeholder="Công nghệ, du lịch, âm nhạc..."
                placeholderTextColor={theme.colors.textSecondary}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={[styles.formLabel, { color: theme.colors.text }]}>
                Phong cách học
              </Text>
              <View style={styles.styleSelector}>
                {[
                  { key: 'visual', label: '👁️ Visual' },
                  { key: 'auditory', label: '👂 Auditory' },
                  { key: 'kinesthetic', label: '🤲 Kinesthetic' },
                  { key: 'reading', label: '📖 Reading' }
                ].map((style) => (
                  <TouchableOpacity
                    key={style.key}
                    style={[
                      styles.styleButton,
                      { 
                        backgroundColor: learningStyle === style.key ? theme.colors.primary : theme.colors.card,
                        borderColor: theme.colors.border
                      }
                    ]}
                    onPress={() => setLearningStyle(style.key as any)}
                  >
                    <Text style={[
                      styles.styleButtonText,
                      { color: learningStyle === style.key ? '#FFFFFF' : theme.colors.text }
                    ]}>
                      {style.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={[styles.generateButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleGenerateAIMindMap}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Sparkles size={20} color="#FFFFFF" />
                  <Text style={styles.generateButtonText}>Generate MindMap</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* AI Settings Modal */}
      <Modal
        visible={showAISettings}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: theme.colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              AI Settings
            </Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowAISettings(false)}
            >
              <X size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          
          <AISettings 
            onConfigured={() => {
              setShowAISettings(false);
              Alert.alert('Success', 'AI has been configured successfully!');
            }}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  controlBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categories: {
    flex: 1,
    marginRight: 16,
  },
  categoriesContent: {
    paddingHorizontal: 4,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  viewModeToggle: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    padding: 2,
  },
  modeButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mindMapCanvas: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  canvasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  canvasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  canvasSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  canvasActions: {
    flexDirection: 'row',
    gap: 8,
  },
  canvasButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  visualMindMap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  centerNode: {
    position: 'absolute',
    zIndex: 10,
  },
  centralCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  centralText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  branchNodes: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  branchNode: {
    position: 'absolute',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  branchText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  connectionLines: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionLine: {
    position: 'absolute',
    width: 80,
    height: 2,
    opacity: 0.3,
  },
  wordDetails: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  wordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedWord: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  shareButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  wordDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    opacity: 0.8,
  },
  relatedWords: {
    gap: 8,
  },
  relatedTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  relatedChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  relatedChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  relatedChipText: {
    fontSize: 12,
    fontWeight: '500',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  formInput: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  levelSelector: {
    gap: 8,
  },
  levelButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  levelButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  styleSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  styleButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: '45%',
  },
  styleButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    borderRadius: 12,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});