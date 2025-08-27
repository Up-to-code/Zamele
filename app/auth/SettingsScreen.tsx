import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Switch
} from 'react-native';

const SettingsScreen = () => {
  const [settings, setSettings] = useState < { [key: string]: boolean } > ({
    showNews: true,
    courseReminders: true,
    notifications: true
  });

  const toggleSetting = (setting : string) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };
 const router = useRouter();
  const handleComplete = () => {
    console.log('Settings saved:', settings);
    // Navigate to main app
    router.push('/auth/sign-up');
  };

  const handleSkip = () => {
    router.push('/auth/sign-up');

    console.log('Settings skipped');
    // Navigate to main app
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Almost Done!</Text>
          <Text style={styles.subtitle}>
            Customize your experience with these quick settings
          </Text>
        </View>

        <View style={styles.settingsContainer}>
          {/* University News Setting */}
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingName}>University News</Text>
              <Text style={styles.settingDescription}>
                Show news and updates from your university
              </Text>
            </View>
            <Switch
              value={settings.showNews}
              onValueChange={() => toggleSetting('showNews')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
            />
          </View>

          {/* Course Reminders Setting */}
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingName}>Course Reminders</Text>
              <Text style={styles.settingDescription}>
                Get reminders about your courses and assignments
              </Text>
            </View>
            <Switch
              value={settings.courseReminders}
              onValueChange={() => toggleSetting('courseReminders')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
            />
          </View>

          {/* Notifications Setting */}
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingName}>Notifications</Text>
              <Text style={styles.settingDescription}>
                Receive important alerts and updates
              </Text>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={() => toggleSetting('notifications')}
              trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.8}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.completeButtonText}>Complete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginHorizontal: 20,
    lineHeight: 22,
  },
  settingsContainer: {
    flex: 1,
    marginBottom: 30,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  settingName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 20,
    gap: 16,
  },
  skipButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  completeButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  skipButtonText: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '600',
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default SettingsScreen;