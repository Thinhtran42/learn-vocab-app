import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Volume2,
  RotateCcw,
  Heart,
  Check,
  X,
  ArrowLeft,
  BookOpen,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../contexts/ThemeContext';

const { width } = Dimensions.get('window');

const sampleWords = [
  {
    id: 1,
    word: 'Serendipity',
    pronunciation: '/ˌserənˈdipədē/',
    definition:
      'The occurrence and development of events by chance in a happy or beneficial way',
    example:
      'It was pure serendipity that led her to discover the hidden café.',
    emoji: '🌟',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face',
  },
  {
    id: 2,
    word: 'Ephemeral',
    pronunciation: '/əˈfem(ə)rəl/',
    definition: 'Lasting for a very short time',
    example:
      'The beauty of cherry blossoms is ephemeral, lasting only a few weeks.',
    emoji: '🌸',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&h=300&fit=crop',
  },
];

export default function LearnScreen() {
  const { theme, isDark } = useTheme();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [flipAnimation] = useState(new Animated.Value(0));
  const [cardScale] = useState(new Animated.Value(1));

  const currentWord = sampleWords[currentWordIndex];

  useEffect(() => {
    // Simple card entrance animation
    Animated.spring(cardScale, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [currentWordIndex]);

  const flipCard = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    Animated.parallel([
      Animated.timing(flipAnimation, {
        toValue: showDefinition ? 0 : 1,
        duration: 600,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(cardScale, {
          toValue: 0.95,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(cardScale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    setShowDefinition(!showDefinition);
  };

  const nextWord = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    Animated.sequence([
      Animated.timing(cardScale, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(cardScale, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    setShowDefinition(false);
    flipAnimation.setValue(0);
    setCurrentWordIndex((prev) => (prev + 1) % sampleWords.length);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Clean Header */}
      <View
        style={[styles.header, { backgroundColor: theme.colors.background }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.colors.card }]}
          >
            <ArrowLeft size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <BookOpen size={24} color={theme.colors.primary} />
            <Text style={[styles.title, { color: theme.colors.text }]}>
              Learn Words
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text
              style={[styles.counter, { color: theme.colors.textSecondary }]}
            >
              {currentWordIndex + 1}/{sampleWords.length}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View
          style={[
            styles.progressContainer,
            { backgroundColor: theme.colors.border },
          ]}
        >
          <View
            style={[
              styles.progressBar,
              {
                width: `${
                  ((currentWordIndex + 1) / sampleWords.length) * 100
                }%`,
                backgroundColor: theme.colors.primary,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.content}>
        {/* Main Card */}
        <View style={styles.cardContainer}>
          <TouchableOpacity
            onPress={flipCard}
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.card,
                transform: [{ scale: cardScale }],
              },
            ]}
            activeOpacity={0.98}
          >
            {/* Front Side */}
            <Animated.View
              style={[
                styles.cardSide,
                { transform: [{ rotateY: frontInterpolate }] },
                showDefinition && styles.cardHidden,
              ]}
            >
              <View style={styles.cardContent}>
                {/* Image Section */}
                <View style={styles.imageSection}>
                  <Image
                    source={{ uri: currentWord.imageUrl }}
                    style={styles.wordImage}
                    resizeMode="cover"
                  />
                  <View style={styles.imageOverlay}>
                    <View style={[styles.emojiContainer, { backgroundColor: 'rgba(255, 255, 255, 0.9)' }]}>
                      <Text style={styles.emoji}>{currentWord.emoji}</Text>
                    </View>
                  </View>
                </View>

                {/* Word Section */}
                <View style={styles.wordSection}>
                  <Text style={[styles.word, { color: theme.colors.text }]}>
                    {currentWord.word}
                  </Text>
                  <Text
                    style={[
                      styles.pronunciation,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    {currentWord.pronunciation}
                  </Text>
                </View>

                {/* Bottom Section */}
                <View style={styles.bottomSection}>
                  <TouchableOpacity
                    style={[
                      styles.soundButton,
                      { backgroundColor: theme.colors.primary },
                    ]}
                  >
                    <Volume2 size={20} color="#FFFFFF" />
                  </TouchableOpacity>

                  <Text
                    style={[
                      styles.tapHint,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Tap to see definition
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* Back Side */}
            <Animated.View
              style={[
                styles.cardSide,
                { transform: [{ rotateY: backInterpolate }] },
                !showDefinition && styles.cardHidden,
              ]}
            >
              <View style={styles.cardContent}>
                <View style={styles.definitionSection}>
                  <Text
                    style={[
                      styles.sectionLabel,
                      { color: theme.colors.primary },
                    ]}
                  >
                    Definition
                  </Text>
                  <Text
                    style={[styles.definition, { color: theme.colors.text }]}
                  >
                    {currentWord.definition}
                  </Text>
                </View>

                <View style={styles.exampleSection}>
                  <Text
                    style={[
                      styles.sectionLabel,
                      { color: theme.colors.primary },
                    ]}
                  >
                    Example
                  </Text>
                  <Text
                    style={[
                      styles.example,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    "{currentWord.example}"
                  </Text>
                </View>

                <Text
                  style={[
                    styles.tapHint,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Tap to see word
                </Text>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.hardButton]}>
            <X size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Hard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.againButton]}>
            <RotateCcw size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Again</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.goodButton]}>
            <Heart size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Good</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.easyButton]}
            onPress={nextWord}
          >
            <Check size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Easy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
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
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  headerRight: {
    width: 44,
    alignItems: 'center',
  },
  counter: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  card: {
    height: 400,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
  },
  cardSide: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 24,
    backfaceVisibility: 'hidden',
  },
  cardHidden: {
    opacity: 0,
  },
  cardContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  imageSection: {
    height: 200,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  wordImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  wordSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  emojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomSection: {
    alignItems: 'center',
    gap: 12,
  },
  emoji: {
    fontSize: 32,
  },
  word: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  pronunciation: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  soundButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  tapHint: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  definitionSection: {
    marginBottom: 24,
    width: '100%',
  },
  exampleSection: {
    marginBottom: 24,
    width: '100%',
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  definition: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
  },
  example: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 100,
  },
  actionButton: {
    flex: 1,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  hardButton: {
    backgroundColor: '#ef4444',
  },
  againButton: {
    backgroundColor: '#f97316',
  },
  goodButton: {
    backgroundColor: '#3b82f6',
  },
  easyButton: {
    backgroundColor: '#22c55e',
  },
});
