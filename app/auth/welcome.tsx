import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  StyleSheet,
  Dimensions,
  Easing
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function WelcomeScreen() {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpTitle = useRef(new Animated.Value(30)).current;
  const slideUpSubtitle = useRef(new Animated.Value(30)).current;
  const slideUpImage = useRef(new Animated.Value(40)).current;
  const slideUpButtons = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start animations on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpTitle, {
        toValue: 0,
        duration: 700,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
      }),
      Animated.timing(slideUpSubtitle, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
        delay: 100,
      }),
      Animated.timing(slideUpImage, {
        toValue: 0,
        duration: 900,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
        delay: 200,
      }),
      Animated.timing(slideUpButtons, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true,
        delay: 300,
      }),
    ]).start();
  }, []);
 const router = useRouter();
  const handleGetStarted = () => {
    router.push('/auth/user-type');    
  };

  const handleSignIn = () => {
    router.push('/auth/sign-in');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View 
        style={[
          styles.content,
          { opacity: fadeAnim }
        ]}
      >
        <Animated.Text 
          style={[
            styles.title,
            { transform: [{ translateY: slideUpTitle }] }
          ]}
        >
          Welcome to{' '}
          <Text style={styles.titleAccent}>New Learning</Text>
        </Animated.Text>
        
        <Animated.Text 
          style={[
            styles.subtitle,
            { transform: [{ translateY: slideUpSubtitle }] }
          ]}
        >
          Collaborate with universities and enhance your college experience
        </Animated.Text>

        <Animated.View 
          style={[
            styles.imageContainer,
            { transform: [{ translateY: slideUpImage }] }
          ]}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80' }}
            style={styles.image}
            resizeMode="cover"
          />
        </Animated.View>

        <Animated.View 
          style={[
            styles.buttonsContainer,
            { transform: [{ translateY: slideUpButtons }] }
          ]}
        >
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>
              Get Started
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
    color: '#000000',
    letterSpacing: -0.5,
  },
  titleAccent: {
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    color: '#8E8E93',
    marginBottom: 40,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.6,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
  },
  buttonsContainer: {
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
});