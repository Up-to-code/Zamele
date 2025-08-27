import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  Animated,
  Easing
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HIGHT } = Dimensions.get('window');

const AcademicYearScreen = () => {
  const [selectedYear, setSelectedYear] = useState < string | null > (null);
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(30))[0];

  React.useEffect(() => {
    // Animate on component mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      })
    ]).start();
  }, [fadeAnim, slideAnim]);

  const academicYears = [
    { id: '1', name: '1st Year', description: 'Freshman' },
    { id: '2', name: '2nd Year', description: 'Sophomore' },
    { id: '3', name: '3rd Year', description: 'Junior' },
    { id: '4', name: '4th Year', description: 'Senior' },
    { id: '5', name: '5th Year', description: 'Super Senior' },
    { id: 'grad', name: 'Graduate', description: 'Master or PhD' },
  ];
 const router = useRouter();
  const handleContinue = () => {
    // Navigate to next screen
       router.push({
      pathname: '/auth/SettingsScreen',
 
    });
    console.log('Selected year:', selectedYear);
  };

  const handleYearSelect = (yearId : string) => {
    setSelectedYear(yearId as string);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          style={[
            styles.header,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <Text style={styles.title}>Select Your Academic Year</Text>
          <Text style={styles.subtitle}>
            Choose your current year of study
          </Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.optionsContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          {academicYears.map((year) => (
            <TouchableOpacity
              key={year.id}
              style={[
                styles.yearOption,
                selectedYear === year.id && styles.yearOptionSelected
              ]}
              onPress={() => handleYearSelect(year.id)}
              activeOpacity={0.7}
            >
              <View style={styles.yearContent}>
                <View style={styles.yearCircle}>
                  <Text style={[
                    styles.yearNumber,
                    selectedYear === year.id && styles.yearNumberSelected
                  ]}>
                    {year.id.length === 1 ? year.id : 'G'}
                  </Text>
                </View>
                <View style={styles.yearTextContainer}>
                  <Text style={[
                    styles.yearName,
                    selectedYear === year.id && styles.yearNameSelected
                  ]}>
                    {year.name}
                  </Text>
                  <Text style={styles.yearDescription}>
                    {year.description}
                  </Text>
                </View>
              </View>
              
              {selectedYear === year.id && (
                <View style={styles.selectedIndicator}>
                  <View style={styles.selectedIndicatorInner} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </Animated.View>

        <Animated.View 
          style={[
            styles.footer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <TouchableOpacity
            style={[
              styles.continueButton,
              !selectedYear && styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={!selectedYear}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>
              Continue
            </Text>
          </TouchableOpacity>
        </Animated.View>
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
    padding: 24,
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
    fontSize: 17,
    color: '#8E8E93',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  optionsContainer: {
    flex: 1,
    gap: 16,
    marginBottom: 30,
  },
  yearOption: {
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  yearOptionSelected: {
    backgroundColor: '#E6F2FF',
    borderColor: '#007AFF',
  },
  yearContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yearCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  yearNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#8E8E93',
  },
  yearNumberSelected: {
    color: '#007AFF',
  },
  yearTextContainer: {
    flex: 1,
  },
  yearName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  yearNameSelected: {
    color: '#007AFF',
  },
  yearDescription: {
    fontSize: 15,
    color: '#8E8E93',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicatorInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 30,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default AcademicYearScreen;