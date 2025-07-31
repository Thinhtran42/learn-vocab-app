import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [floatAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [waveAnim] = useState(new Animated.Value(0));
  const [orbAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Wave animation
    Animated.loop(
      Animated.timing(waveAnim, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Orb floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(orbAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(orbAnim, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Enhanced floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Enhanced pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 2500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleButtonPress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push('/(auth)/register');
  };

  const handleLoginPress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.push('/(auth)/login');
  };

  const floatTranslate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const waveRotation = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const orbTranslateY = orbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const orbTranslateX = orbAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <LinearGradient 
      colors={['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe']} 
      locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
      style={styles.container}
    >
      {/* Animated Wave Background */}
      <Animated.View style={[
        styles.waveShape,
        { transform: [{ rotate: waveRotation }] }
      ]} />
      
      {/* Floating Orbs */}
      <Animated.View style={[
        styles.orb1,
        { 
          transform: [
            { translateY: orbTranslateY },
            { translateX: orbTranslateX },
            { scale: pulseAnim }
          ] 
        }
      ]} />
      <Animated.View style={[
        styles.orb2,
        { 
          transform: [
            { translateY: floatTranslate },
            { scale: pulseAnim }
          ] 
        }
      ]} />
      <Animated.View style={[
        styles.orb3,
        { 
          transform: [
            { translateY: orbTranslateY },
            { translateX: -orbTranslateX }
          ] 
        }
      ]} />
      
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.heroSection}>
          <Animated.View style={[
            styles.emojiContainer, 
            { 
              transform: [
                { scale: pulseAnim },
                { rotate: waveRotation }
              ] 
            }
          ]}>
            <Animated.View style={[
              styles.emojiGlow,
              { 
                transform: [{ scale: pulseAnim }],
                opacity: pulseAnim.interpolate({
                  inputRange: [1, 1.15],
                  outputRange: [0.6, 1],
                })
              }
            ]} />
            <Text style={styles.heroEmoji}>🌈</Text>
          </Animated.View>
          <Animated.Text 
            style={[
              styles.heroTitle,
              { 
                transform: [{ translateY: floatTranslate }],
                opacity: fadeAnim
              }
            ]}
          >
            VocabMagic Universe
          </Animated.Text>
          <Animated.Text 
            style={[
              styles.heroSubtitle,
              { 
                transform: [{ translateY: floatTranslate }],
                opacity: fadeAnim
              }
            ]}
          >
            Embark on a magical journey where words transform into knowledge through 
            immersive learning, AI-powered insights, and enchanting visual experiences ✨
          </Animated.Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleButtonPress}
          >
            <LinearGradient
              colors={['#f093fb', '#f5576c', '#4facfe']}
              locations={[0, 0.5, 1]}
              style={styles.buttonGradient}
            >
              <Animated.View style={[
                styles.buttonContent,
                { transform: [{ scale: pulseAnim }] }
              ]}>
                <Text style={styles.primaryButtonText}>🚀 Begin Magic Journey</Text>
              </Animated.View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleLoginPress}
          >
            <Animated.View style={[
              styles.glassmorphism,
              { 
                transform: [{ scale: pulseAnim }],
                opacity: fadeAnim
              }
            ]}>
              <Text style={styles.secondaryButtonText}>✨ I'm Already a Wizard</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  waveShape: {
    position: 'absolute',
    top: -200,
    left: -200,
    width: width + 400,
    height: height + 400,
    borderRadius: (width + 400) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  orb1: {
    position: 'absolute',
    top: '15%',
    right: '10%',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  orb2: {
    position: 'absolute',
    bottom: '20%',
    left: '8%',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  orb3: {
    position: 'absolute',
    top: '60%',
    right: '5%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 100,
  },
  emojiContainer: {
    position: 'relative',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 100,
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 40,
    zIndex: 2,
  },
  emojiGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    zIndex: 1,
  },
  heroTitle: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
    letterSpacing: 2,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.95,
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 340,
    fontWeight: '300',
    letterSpacing: 0.8,
  },
  buttonContainer: {
    width: '100%',
    gap: 24,
  },
  primaryButton: {
    borderRadius: 35,
    shadowColor: '#f093fb',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  buttonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 35,
    alignItems: 'center',
  },
  buttonContent: {
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  secondaryButton: {
    borderRadius: 35,
    overflow: 'hidden',
  },
  glassmorphism: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 35,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});