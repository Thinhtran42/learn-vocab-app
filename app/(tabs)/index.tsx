import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  BookOpen,
  Play,
  Music,
  Award,
  Moon,
  Sun,
  Star,
  Zap,
  Target,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../contexts/ThemeContext';

const lessons = [
  {
    id: 1,
    title: 'Writing lessons',
    subtitle: 'Continue lesson',
    progress: 0.6,
    color: '#FF6B9D',
    emoji: '✏️',
    courses: 6,
  },
  {
    id: 2,
    title: 'Speaking lessons',
    subtitle: 'Continue lesson',
    progress: 0.8,
    color: '#4ECDC4',
    emoji: '🗣️',
    courses: 8,
  },
  {
    id: 3,
    title: 'Listening lessons',
    subtitle: "Let's start from lesson 1",
    progress: 0.3,
    color: '#45B7D1',
    emoji: '🎧',
    courses: 6,
  },
];

const topics = [
  {
    id: 1,
    title: 'Food',
    exercises: 12,
    stars: 2000,
    image: '🍕',
    gradient: ['#FF6B9D', '#C44569'],
  },
  {
    id: 2,
    title: 'Family and friends',
    exercises: 8,
    stars: 1235,
    image: '👨‍👩‍👧‍👦',
    gradient: ['#4ECDC4', '#44A08D'],
  },
];

export default function HomeScreen() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [userName] = useState('Maria');
  const [currentScore] = useState(1235);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [cardAnims] = useState(lessons.map(() => new Animated.Value(0)));

  useEffect(() => {
    // Animate entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Animate cards with stagger
    const cardAnimations = cardAnims.map((anim: any, index: any) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: index * 150,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      })
    );

    Animated.stagger(100, cardAnimations).start();
  }, []);

  const handleLessonPress = (lesson: any) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    // Navigate to lesson
  };

  const handleTopicPress = (topic: any) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    // Navigate to topic
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <LinearGradient
          colors={isDark ? ['#1A1A2E', '#16213E'] : ['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={['#FF6B9D', '#4ECDC4']}
                  style={styles.avatar}
                >
                  <Text style={styles.avatarText}>M</Text>
                </LinearGradient>
                <View style={styles.flagContainer}>
                  <Text style={styles.flag}>🇬🇧</Text>
                </View>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.language}>English</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
              {isDark ? (
                <Sun size={24} color="#FFFFFF" />
              ) : (
                <Moon size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.scoreSection}>
            <View style={styles.scoreCard}>
              <Star size={20} color="#FFD700" />
              <Text style={styles.scoreNumber}>{currentScore}</Text>
              <Text style={styles.scoreLabel}>Your score</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Today's Goal Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Let's begin studying
          </Text>

          {lessons.map((lesson, index) => {
            const cardTransform = cardAnims[index].interpolate({
              inputRange: [0, 1],
              outputRange: [30, 0],
            });

            return (
              <Animated.View
                key={lesson.id}
                style={[
                  styles.lessonCard,
                  {
                    opacity: cardAnims[index],
                    transform: [{ translateY: cardTransform }],
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => handleLessonPress(lesson)}
                  style={[
                    styles.lessonCardContent,
                    { backgroundColor: theme.colors.card },
                  ]}
                  activeOpacity={0.9}
                >
                  <View style={styles.lessonInfo}>
                    <View
                      style={[
                        styles.lessonIcon,
                        { backgroundColor: lesson.color + '20' },
                      ]}
                    >
                      <Text style={styles.lessonEmoji}>{lesson.emoji}</Text>
                    </View>
                    <View style={styles.lessonText}>
                      <Text
                        style={[
                          styles.lessonTitle,
                          { color: theme.colors.text },
                        ]}
                      >
                        {lesson.title}
                      </Text>
                      <Text
                        style={[
                          styles.lessonSubtitle,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        {lesson.subtitle}
                      </Text>
                      <Text
                        style={[
                          styles.lessonCourses,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        Includes {lesson.courses} courses
                      </Text>
                    </View>
                  </View>

                  {/* Progress Bar */}
                  <View style={styles.progressContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        { backgroundColor: theme.colors.border },
                      ]}
                    >
                      <Animated.View
                        style={[
                          styles.progressFill,
                          {
                            width: `${lesson.progress * 100}%`,
                            backgroundColor: lesson.color,
                          },
                        ]}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </Animated.View>

        {/* Topics Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Speaking lessons
          </Text>

          <View style={styles.topicsGrid}>
            {topics.map((topic, index) => (
              <TouchableOpacity
                key={topic.id}
                onPress={() => handleTopicPress(topic)}
                style={styles.topicCard}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={topic.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.topicGradient}
                >
                  <View style={styles.topicHeader}>
                    <View style={styles.topicOptions}>
                      <TouchableOpacity style={styles.optionButton}>
                        <Play size={16} color="#FFFFFF" />
                        <Text style={styles.optionText}>Video</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.optionButton}>
                        <Music size={16} color="#FFFFFF" />
                        <Text style={styles.optionText}>Music</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.optionButton}>
                        <Award size={16} color="#FFFFFF" />
                        <Text style={styles.optionText}>Quiz</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.topicImageContainer}>
                    <Text style={styles.topicImage}>{topic.image}</Text>
                  </View>

                  <View style={styles.topicInfo}>
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                    <Text style={styles.topicStats}>
                      <Star size={12} color="#FFD700" /> {topic.stars}
                    </Text>
                    <Text style={styles.topicExercises}>
                      {topic.exercises} exercises
                    </Text>
                    <View style={styles.progressDots}>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <View
                          key={i}
                          style={[
                            styles.dot,
                            {
                              backgroundColor:
                                i < 8 ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
                            },
                          ]}
                        />
                      ))}
                    </View>
                  </View>

                  <TouchableOpacity style={styles.beginButton}>
                    <Text style={styles.beginButtonText}>Begin</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 12,
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  flagContainer: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 2,
  },
  flag: {
    fontSize: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  language: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  themeToggle: {
    position: 'absolute',
    right: -10,
    top: '30%',
    transform: [{ translateY: -10 }],
    padding: 10,
  },
  scoreSection: {
    alignItems: 'center',
  },
  scoreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  scoreNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  scoreLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  lessonCard: {
    marginBottom: 16,
  },
  lessonCardContent: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  lessonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lessonEmoji: {
    fontSize: 24,
  },
  lessonText: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lessonSubtitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  lessonCourses: {
    fontSize: 12,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  topicsGrid: {
    gap: 16,
  },
  topicCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  topicGradient: {
    padding: 20,
    minHeight: 280,
  },
  topicHeader: {
    marginBottom: 20,
  },
  topicOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  topicImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  topicImage: {
    fontSize: 60,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  topicStats: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  topicExercises: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 16,
  },
  progressDots: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  beginButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  beginButtonText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
