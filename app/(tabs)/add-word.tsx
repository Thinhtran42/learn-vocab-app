import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Volume2, BookOpen, Camera } from 'lucide-react-native';

export default function AddWordScreen() {
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [wordData, setWordData] = useState(null);

  const searchWord = async () => {
    if (!word.trim()) {
      Alert.alert('Error', 'Please enter a word to search');
      return;
    }

    setLoading(true);
    
    // Mock API call - replace with actual dictionary API
    setTimeout(() => {
      const mockData = {
        word: word.toLowerCase(),
        pronunciation: '/ˈwərd/',
        definition: 'A single distinct meaningful element of speech or writing',
        example: `The word "${word}" is very interesting.`,
        partOfSpeech: 'noun',
        synonyms: ['term', 'expression', 'phrase'],
      };
      
      setWordData(mockData);
      setLoading(false);
    }, 1500);
  };

  const saveWord = () => {
    if (!wordData) return;
    
    // Mock save - replace with actual save logic
    Alert.alert('Success', 'Word added to your vocabulary!', [
      { text: 'OK', onPress: () => {
        setWord('');
        setWordData(null);
      }}
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#45B7D1']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Add New Word</Text>
        <Text style={styles.headerSubtitle}>Expand your vocabulary</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <Text style={styles.sectionTitle}>Search for a word</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Enter a word..."
              value={word}
              onChangeText={setWord}
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
            <TouchableOpacity 
              style={styles.searchButton} 
              onPress={searchWord}
              disabled={loading}
            >
              <Search size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        )}

        {wordData && (
          <View style={styles.resultContainer}>
            <View style={styles.wordHeader}>
              <View style={styles.wordInfo}>
                <Text style={styles.wordTitle}>{wordData.word}</Text>
                <Text style={styles.partOfSpeech}>{wordData.partOfSpeech}</Text>
              </View>
              <TouchableOpacity style={styles.pronounceButton}>
                <Volume2 size={24} color="#4ECDC4" />
              </TouchableOpacity>
            </View>

            <Text style={styles.pronunciation}>{wordData.pronunciation}</Text>

            <View style={styles.definitionSection}>
              <Text style={styles.sectionLabel}>Definition</Text>
              <Text style={styles.definition}>{wordData.definition}</Text>
            </View>

            <View style={styles.exampleSection}>
              <Text style={styles.sectionLabel}>Example</Text>
              <Text style={styles.example}>{wordData.example}</Text>
            </View>

            <View style={styles.synonymsSection}>
              <Text style={styles.sectionLabel}>Synonyms</Text>
              <View style={styles.synonymsContainer}>
                {wordData.synonyms.map((synonym, index) => (
                  <View key={index} style={styles.synonymChip}>
                    <Text style={styles.synonymText}>{synonym}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.imageSection}>
              <Text style={styles.sectionLabel}>Add Image (Optional)</Text>
              <TouchableOpacity style={styles.imageButton}>
                <Camera size={24} color="#4ECDC4" />
                <Text style={styles.imageButtonText}>Choose Image</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={saveWord}>
              <BookOpen size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Add to My Vocabulary</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#E8E8E8',
  },
  searchButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  resultContainer: {
    backgroundColor: '#FFFFFF',
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
  wordInfo: {
    flex: 1,
  },
  wordTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    textTransform: 'capitalize',
  },
  partOfSpeech: {
    fontSize: 14,
    color: '#7F8C8D',
    fontStyle: 'italic',
    marginTop: 2,
  },
  pronounceButton: {
    backgroundColor: '#F0F8FF',
    padding: 12,
    borderRadius: 20,
  },
  pronunciation: {
    fontSize: 16,
    color: '#4ECDC4',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  definitionSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ECDC4',
    marginBottom: 8,
  },
  definition: {
    fontSize: 16,
    color: '#2C3E50',
    lineHeight: 24,
  },
  exampleSection: {
    marginBottom: 20,
  },
  example: {
    fontSize: 16,
    color: '#34495E',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  synonymsSection: {
    marginBottom: 20,
  },
  synonymsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  synonymChip: {
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  synonymText: {
    fontSize: 14,
    color: '#4ECDC4',
    fontWeight: '500',
  },
  imageSection: {
    marginBottom: 24,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4ECDC4',
    borderStyle: 'dashed',
    gap: 8,
  },
  imageButtonText: {
    fontSize: 16,
    color: '#4ECDC4',
    fontWeight: '500',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4ECDC4',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});