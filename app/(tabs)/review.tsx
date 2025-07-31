import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Calendar,
  Clock,
  BookOpen,
  TrendingUp,
  Target,
  Play,
  RotateCcw,
} from 'lucide-react-native';

const reviewData = [
  { category: 'Due Now', count: 12, color: '#E74C3C', urgent: true },
  { category: 'Due Today', count: 24, color: '#F39C12', urgent: false },
  { category: 'Due Tomorrow', count: 18, color: '#3498DB', urgent: false },
  { category: 'This Week', count: 45, color: '#27AE60', urgent: false },
];

const studyStats = [
  { label: 'Words Reviewed', value: '156', icon: BookOpen },
  { label: 'Accuracy Rate', value: '87%', icon: Target },
  { label: 'Study Streak', value: '7 days', icon: TrendingUp },
  { label: 'Time Spent', value: '2.5h', icon: Clock },
];

export default function ReviewScreen() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');

  const startReview = (category) => {
    // Mock review start - replace with actual navigation
    console.log(`Starting review for ${category}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#4ECDC4', '#45B7D1']} style={styles.header}>
        <Text style={styles.headerTitle}>Review Schedule</Text>
        <Text style={styles.headerSubtitle}>Spaced repetition learning</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Due for Review</Text>
          <View style={styles.reviewCards}>
            {reviewData.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.reviewCard,
                  item.urgent && styles.urgentCard,
                  { borderLeftColor: item.color },
                ]}
                onPress={() => startReview(item.category)}
              >
                <View style={styles.reviewCardContent}>
                  <View style={styles.reviewInfo}>
                    <Text style={styles.reviewCategory}>{item.category}</Text>
                    <Text style={[styles.reviewCount, { color: item.color }]}>
                      {item.count} words
                    </Text>
                  </View>
                  <View
                    style={[styles.reviewIcon, { backgroundColor: item.color }]}
                  >
                    <Play size={16} color="#FFFFFF" />
                  </View>
                </View>
                {item.urgent && (
                  <View style={styles.urgentBadge}>
                    <Text style={styles.urgentText}>URGENT</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <RotateCcw size={24} color="#4ECDC4" />
              </View>
              <Text style={styles.actionTitle}>Review All Due</Text>
              <Text style={styles.actionSubtitle}>36 words ready</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIcon}>
                <Target size={24} color="#E74C3C" />
              </View>
              <Text style={styles.actionTitle}>Difficult Words</Text>
              <Text style={styles.actionSubtitle}>Focus practice</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Study Statistics</Text>
          <View style={styles.statsGrid}>
            {studyStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={styles.statIcon}>
                  <stat.icon size={20} color="#4ECDC4" />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Learning Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>Weekly Goal</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '68%' }]} />
              </View>
              <Text style={styles.progressText}>68/100 words</Text>
            </View>

            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>Monthly Target</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '42%' }]} />
              </View>
              <Text style={styles.progressText}>168/400 words</Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, styles.lastSection]}>
          <Text style={styles.sectionTitle}>Review Calendar</Text>
          <View style={styles.calendarContainer}>
            <View style={styles.calendarHeader}>
              <Text style={styles.calendarTitle}>This Week</Text>
              <TouchableOpacity>
                <Calendar size={20} color="#4ECDC4" />
              </TouchableOpacity>
            </View>
            <View style={styles.calendarDays}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                (day, index) => (
                  <View key={index} style={styles.calendarDay}>
                    <Text style={styles.dayLabel}>{day}</Text>
                    <View
                      style={[
                        styles.dayCircle,
                        index === 2 && styles.todayCircle,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayNumber,
                          index === 2 && styles.todayNumber,
                        ]}
                      >
                        {15 + index}
                      </Text>
                    </View>
                    <View style={styles.reviewDots}>
                      {index < 3 && (
                        <View style={[styles.dot, styles.completedDot]} />
                      )}
                      {index === 2 && (
                        <View style={[styles.dot, styles.pendingDot]} />
                      )}
                      {index > 2 && (
                        <View style={[styles.dot, styles.scheduledDot]} />
                      )}
                    </View>
                  </View>
                )
              )}
            </View>
          </View>
        </View>
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
  section: {
    marginBottom: 30,
  },
  lastSection: {
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
  },
  reviewCards: {
    gap: 12,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  urgentCard: {
    borderWidth: 2,
    borderColor: '#E74C3C',
  },
  reviewCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewInfo: {
    flex: 1,
  },
  reviewCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  reviewCount: {
    fontSize: 14,
    fontWeight: '500',
  },
  reviewIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  urgentBadge: {
    position: 'absolute',
    top: -1,
    right: -1,
    backgroundColor: '#E74C3C',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  urgentText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#F0F8FF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    width: '47%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F0F8FF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressItem: {
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  calendarDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarDay: {
    alignItems: 'center',
    gap: 8,
  },
  dayLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayCircle: {
    backgroundColor: '#4ECDC4',
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  todayNumber: {
    color: '#FFFFFF',
  },
  reviewDots: {
    flexDirection: 'row',
    gap: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  completedDot: {
    backgroundColor: '#27AE60',
  },
  pendingDot: {
    backgroundColor: '#F39C12',
  },
  scheduledDot: {
    backgroundColor: '#BDC3C7',
  },
});
