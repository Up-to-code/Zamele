import { Stack, useRouter, Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';

const Layout = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        if (isLoaded) {
            if (isSignedIn) {
                // Redirect to home if already signed in
                router.replace('/home');
            }
            setCheckingAuth(false);
        }
    }, [isLoaded, isSignedIn]);

    // Show loading indicator while checking authentication status
    if (checkingAuth) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // If signed in, this will be briefly shown before redirect happens
    if (isSignedIn) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <Stack screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            animationDuration: 300,
            animationTypeForReplace: 'push',
        }}>
            <Stack.Screen name="welcome" />
        </Stack>
    );
}

export default Layout;