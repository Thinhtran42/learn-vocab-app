import { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Easing, Platform } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

export default function SplashScreen() {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const rotateAnim = new Animated.Value(0);
  const particleAnim = new Animated.Value(0);
  const morphAnim = new Animated.Value(0);
  const glowAnim = new Animated.Value(0);

  useEffect(() => {
    // Haptic feedback on load
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(particleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous morphing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(morphAnim, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(morphAnim, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glow pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  const particleScale = particleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1.2],
  });

  const morphScale = morphAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe']}
      locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
      style={styles.container}
    >
      {/* Morphing Background Shapes */}
      <Animated.View style={[
        styles.morphShape1, 
        { 
          transform: [{ scale: morphScale }, { rotate: rotation }],
          opacity: glowOpacity 
        }
      ]} />
      <Animated.View style={[
        styles.morphShape2, 
        { 
          transform: [{ scale: particleScale }, { rotate: rotation }],
          opacity: glowOpacity 
        }
      ]} />
      <Animated.View style={[
        styles.morphShape3, 
        { 
          transform: [{ scale: morphAnim }, { rotate: rotation }]
        }
      ]} />
      
      {/* Floating Particles */}
      <Animated.View style={[styles.particle, styles.particle1, { transform: [{ scale: particleScale }, { rotate: rotation }] }]} />
      <Animated.View style={[styles.particle, styles.particle2, { transform: [{ scale: particleScale }] }]} />
      <Animated.View style={[styles.particle, styles.particle3, { transform: [{ scale: particleScale }] }]} />
      <Animated.View style={[styles.particle, styles.particle4, { transform: [{ scale: morphAnim }] }]} />
      <Animated.View style={[styles.particle, styles.particle5, { transform: [{ scale: glowAnim }] }]} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Animated.View style={[
            styles.logoGlow,
            { 
              transform: [{ scale: glowAnim }],
              opacity: glowOpacity 
            }
          ]} />
          <Animated.Text 
            style={[
              styles.logo,
              { transform: [{ rotate: rotation }] }
            ]}
          >
            🌟
          </Animated.Text>
        </View>
        <Animated.Text 
          style={[
            styles.title,
            { 
              transform: [{ scale: scaleAnim }],
              opacity: fadeAnim 
            }
          ]}
        >
          VocabMagic
        </Animated.Text>
        <Animated.Text 
          style={[
            styles.subtitle,
            { 
              opacity: fadeAnim,
              transform: [{ translateY: morphAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -10],
              })}]
            }
          ]}
        >
          Where Words Come Alive ✨
        </Animated.Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center',
  },
  morphShape1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  morphShape2: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  morphShape3: {
    position: 'absolute',
    top: '30%',
    right: -200,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 120,
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
    zIndex: 2,
  },
  logoGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    zIndex: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    opacity: 0.95,
    fontWeight: '400',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  particle: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 50,
  },
  particle1: {
    top: '15%',
    left: '8%',
    width: 60,
    height: 60,
  },
  particle2: {
    top: '70%',
    right: '12%',
    width: 100,
    height: 100,
  },
  particle3: {
    bottom: '30%',
    left: '15%',
    width: 70,
    height: 70,
  },
  particle4: {
    top: '40%',
    left: '5%',
    width: 40,
    height: 40,
  },
  particle5: {
    bottom: '60%',
    right: '8%',
    width: 80,
    height: 80,
  },
});