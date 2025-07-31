import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTheme } from '../contexts/ThemeContext';
import * as Haptics from 'expo-haptics';

interface ModernCardProps {
  title: string;
  subtitle?: string;
  count?: number;
  icon?: React.ComponentType<any>;
  emoji?: string;
  gradient?: string[];
  onPress?: () => void;
  style?: any;
  animatedValue?: Animated.Value;
  children?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'gradient' | 'glass' | 'solid';
}

export const ModernCard: React.FC<ModernCardProps> = ({
  title,
  subtitle,
  count,
  icon: Icon,
  emoji,
  gradient,
  onPress,
  style,
  animatedValue,
  children,
  size = 'medium',
  variant = 'gradient',
}) => {
  const { theme } = useTheme();
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const cardTransform = animatedValue
    ? [
        {
          scale: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          }),
        },
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          }),
        },
        { scale: scaleAnim },
      ]
    : [{ scale: scaleAnim }];

  const cardOpacity = animatedValue
    ? animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      })
    : 1;

  const getCardHeight = () => {
    switch (size) {
      case 'small':
        return 120;
      case 'large':
        return 200;
      default:
        return 160;
    }
  };

  const renderCardContent = () => (
    <View style={styles.cardContent}>
      {emoji && (
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
      )}
      {Icon && !emoji && (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.colors.primary + '20' },
          ]}
        >
          <Icon size={24} color={theme.colors.primary} />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            { color: variant === 'gradient' ? '#FFFFFF' : theme.colors.text },
          ]}
          numberOfLines={2}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              {
                color:
                  variant === 'gradient'
                    ? '#FFFFFF90'
                    : theme.colors.textSecondary,
              },
            ]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
        {count !== undefined && (
          <View style={styles.countContainer}>
            <Text
              style={[
                styles.count,
                {
                  color:
                    variant === 'gradient' ? '#FFFFFF' : theme.colors.primary,
                },
              ]}
            >
              {count} words
            </Text>
          </View>
        )}
      </View>
      {children}
    </View>
  );

  const cardStyle = [
    styles.card,
    {
      height: getCardHeight(),
      backgroundColor: variant === 'solid' ? theme.colors.card : 'transparent',
      borderColor: theme.colors.border,
    },
    style,
  ];

  if (variant === 'gradient' && gradient) {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={cardStyle}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              opacity: cardOpacity,
              transform: cardTransform,
            },
          ]}
        >
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.gradientCard, { borderRadius: 20 }]}
          >
            {renderCardContent()}
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  if (variant === 'glass') {
    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={cardStyle}
      >
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              opacity: cardOpacity,
              transform: cardTransform,
            },
          ]}
        >
          <BlurView
            intensity={20}
            tint={theme.isDark ? 'dark' : 'light'}
            style={styles.blurCard}
          >
            {renderCardContent()}
          </BlurView>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
      style={cardStyle}
    >
      <Animated.View
        style={[
          styles.solidCard,
          {
            opacity: cardOpacity,
            transform: cardTransform,
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.shadow,
          },
        ]}
      >
        {renderCardContent()}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 8,
  },
  gradientCard: {
    flex: 1,
    borderRadius: 20,
  },
  blurCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  solidCard: {
    flex: 1,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  cardContent: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emoji: {
    fontSize: 24,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  countContainer: {
    alignSelf: 'flex-start',
  },
  count: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.9,
  },
});

export default ModernCard;
