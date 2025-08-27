import { SplashScreen, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StatusBar, Text, View, StyleSheet, Image } from "react-native";
import { useAuth } from '@clerk/clerk-expo';
import { useFonts } from 'expo-font';

export default function Index() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const [appReady, setAppReady] = useState(false);
  
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'Tajawal-Medium': require('../assets/fonts/Tajawal-Medium.ttf'),
    'Tajawal-Bold': require('../assets/fonts/Tajawal-Bold.ttf'),
   });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load any resources here (API calls, assets, etc.)
        await SplashScreen.preventAutoHideAsync();
        
        // Simulate loading process (replace with actual loading tasks)
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appReady && fontsLoaded && isLoaded) {
      SplashScreen.hideAsync();
      
      // Redirect based on authentication status
      if (isSignedIn) {
        router.replace("/home");
      } else {
        router.replace("/auth/welcome");
      }
    }
  }, [appReady, fontsLoaded, isLoaded]);

  if (!appReady || !fontsLoaded || !isLoaded) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={"#FFF"} barStyle="dark-content" />
        
        {/* App logo */}
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        {/* Loading indicator */}
        <ActivityIndicator size="large" color="#4157B2" style={styles.spinner} />
        
        {/* Optional loading text */}
        <Text style={styles.loadingText}>Loading...</Text>
        
        {/* Optional version info */}
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  spinner: {
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4157B2",
    fontFamily: 'Inter-Regular',
  },
  versionText: {
    position: 'absolute',
    bottom: 30,
    fontSize: 12,
    color: "#888",
    fontFamily: 'Inter-Regular',
  },
});