import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Key, Brain, Zap, Check, AlertCircle } from 'lucide-react-native';
import { aiService } from '../services/AIService';

interface AISettingsProps {
  onConfigured?: () => void;
}

export default function AISettings({ onConfigured }: AISettingsProps) {
  const { theme, isDark } = useTheme();
  const [geminiKey, setGeminiKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<'gemini' | 'openai'>('gemini');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [interests, setInterests] = useState('');
  const [learningStyle, setLearningStyle] = useState<'visual' | 'auditory' | 'kinesthetic' | 'reading'>('visual');

  useEffect(() => {
    checkConfiguration();
  }, []);

  const checkConfiguration = async () => {
    await aiService.initialize();
    setIsConfigured(aiService.isConfigured());
  };

  const handleSaveAPIKey = async () => {
    if (!geminiKey && !openaiKey) {
      Alert.alert('Lỗi', 'Vui lòng nhập ít nhất một API key');
      return;
    }

    setIsSaving(true);
    try {
      if (selectedProvider === 'gemini' && geminiKey) {
        await aiService.setAPIKey('gemini', geminiKey);
      } else if (selectedProvider === 'openai' && openaiKey) {
        await aiService.setAPIKey('openai', openaiKey);
      }

      setIsConfigured(true);
      Alert.alert('Thành công', 'API key đã được lưu thành công!');
      onConfigured?.();
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể lưu API key. Vui lòng thử lại.');
    } finally {
      setIsSaving(false);
    }
  };

  const learningStyles = [
    { key: 'visual', label: 'Visual (Hình ảnh)', icon: '👁️' },
    { key: 'auditory', label: 'Auditory (Âm thanh)', icon: '👂' },
    { key: 'kinesthetic', label: 'Kinesthetic (Vận động)', icon: '🤲' },
    { key: 'reading', label: 'Reading (Đọc viết)', icon: '📖' },
  ];

  const levels = [
    { key: 'beginner', label: 'Beginner (Mới bắt đầu)' },
    { key: 'intermediate', label: 'Intermediate (Trung cấp)' },
    { key: 'advanced', label: 'Advanced (Nâng cao)' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: theme.colors.primary }]}>
          <Brain size={24} color="#FFFFFF" />
        </View>
        <View>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            AI Configuration
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
            Cấu hình AI để tạo mindmap tự động
          </Text>
        </View>
      </View>

      {/* Configuration Status */}
      <View style={[styles.statusCard, { backgroundColor: theme.colors.card }]}>
        <View style={styles.statusHeader}>
          {isConfigured ? (
            <Check size={20} color="#22c55e" />
          ) : (
            <AlertCircle size={20} color="#f59e0b" />
          )}
          <Text style={[styles.statusText, { color: theme.colors.text }]}>
            {isConfigured ? 'AI đã được cấu hình' : 'Cần cấu hình AI'}
          </Text>
        </View>
        <Text style={[styles.statusDescription, { color: theme.colors.textSecondary }]}>
          {isConfigured 
            ? `Đang sử dụng ${aiService.getCurrentProvider().toUpperCase()}`
            : 'Nhập API key để sử dụng tính năng AI'
          }
        </Text>
      </View>

      {/* Provider Selection */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Chọn AI Provider
        </Text>
        
        <View style={styles.providerOptions}>
          <TouchableOpacity
            style={[
              styles.providerOption,
              { 
                backgroundColor: selectedProvider === 'gemini' ? theme.colors.primary : 'transparent',
                borderColor: theme.colors.border
              }
            ]}
            onPress={() => setSelectedProvider('gemini')}
          >
            <Text style={[
              styles.providerText,
              { 
                color: selectedProvider === 'gemini' ? '#FFFFFF' : theme.colors.text 
              }
            ]}>
              Google Gemini (Miễn phí)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.providerOption,
              { 
                backgroundColor: selectedProvider === 'openai' ? theme.colors.primary : 'transparent',
                borderColor: theme.colors.border
              }
            ]}
            onPress={() => setSelectedProvider('openai')}
          >
            <Text style={[
              styles.providerText,
              { 
                color: selectedProvider === 'openai' ? '#FFFFFF' : theme.colors.text 
              }
            ]}>
              OpenAI GPT (Trả phí)
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* API Key Input */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          API Key
        </Text>
        
        {selectedProvider === 'gemini' ? (
          <View style={styles.inputContainer}>
            <Key size={16} color={theme.colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[styles.textInput, { 
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border
              }]}
              value={geminiKey}
              onChangeText={setGeminiKey}
              placeholder="Nhập Google Gemini API key"
              placeholderTextColor={theme.colors.textSecondary}
              secureTextEntry
            />
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <Key size={16} color={theme.colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={[styles.textInput, { 
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.border
              }]}
              value={openaiKey}
              onChangeText={setOpenaiKey}
              placeholder="Nhập OpenAI API key"
              placeholderTextColor={theme.colors.textSecondary}
              secureTextEntry
            />
          </View>
        )}

        <Text style={[styles.helpText, { color: theme.colors.textSecondary }]}>
          {selectedProvider === 'gemini' 
            ? 'Lấy miễn phí tại: https://makersuite.google.com/app/apikey'
            : 'Lấy tại: https://platform.openai.com/api-keys (Có phí)'
          }
        </Text>

        <TouchableOpacity
          style={[styles.saveButton, { 
            backgroundColor: theme.colors.primary,
            opacity: isSaving ? 0.6 : 1
          }]}
          onPress={handleSaveAPIKey}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Đang lưu...' : 'Lưu API Key'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* User Profile Settings */}
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Hồ sơ học tập (Tùy chọn)
        </Text>

        {/* Level Selection */}
        <View style={styles.settingGroup}>
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            Trình độ
          </Text>
          <View style={styles.levelOptions}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level.key}
                style={[
                  styles.levelOption,
                  { 
                    backgroundColor: userLevel === level.key ? theme.colors.primary : 'transparent',
                    borderColor: theme.colors.border
                  }
                ]}
                onPress={() => setUserLevel(level.key as any)}
              >
                <Text style={[
                  styles.levelText,
                  { 
                    color: userLevel === level.key ? '#FFFFFF' : theme.colors.text 
                  }
                ]}>
                  {level.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Learning Style */}
        <View style={styles.settingGroup}>
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            Phong cách học
          </Text>
          <View style={styles.styleOptions}>
            {learningStyles.map((style) => (
              <TouchableOpacity
                key={style.key}
                style={[
                  styles.styleOption,
                  { 
                    backgroundColor: learningStyle === style.key ? theme.colors.primary : theme.colors.background,
                    borderColor: theme.colors.border
                  }
                ]}
                onPress={() => setLearningStyle(style.key as any)}
              >
                <Text style={styles.styleIcon}>{style.icon}</Text>
                <Text style={[
                  styles.styleText,
                  { 
                    color: learningStyle === style.key ? '#FFFFFF' : theme.colors.text 
                  }
                ]}>
                  {style.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Interests */}
        <View style={styles.settingGroup}>
          <Text style={[styles.settingLabel, { color: theme.colors.text }]}>
            Sở thích (phân cách bằng dấu phẩy)
          </Text>
          <TextInput
            style={[styles.textInput, { 
              color: theme.colors.text,
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.border
            }]}
            value={interests}
            onChangeText={setInterests}
            placeholder="Ví dụ: công nghệ, du lịch, âm nhạc"
            placeholderTextColor={theme.colors.textSecondary}
            multiline
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
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
  statusCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusDescription: {
    fontSize: 14,
  },
  section: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  providerOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  providerOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  providerText: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  textInput: {
    flex: 1,
    padding: 12,
    paddingLeft: 40,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 14,
  },
  helpText: {
    fontSize: 12,
    marginBottom: 16,
    lineHeight: 16,
  },
  saveButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  settingGroup: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  levelOptions: {
    gap: 8,
  },
  levelOption: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  levelText: {
    fontSize: 14,
    fontWeight: '500',
  },
  styleOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  styleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8, 
    borderWidth: 1,
    minWidth: '45%',
  },
  styleIcon: {
    fontSize: 16,
  },
  styleText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
