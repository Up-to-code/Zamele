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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SectionScreen = () => {
  const [selectedSection, setSelectedSection] = useState < string | null > (null);
  
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

  const sections = [
    { id: 'A', name: 'Section A', description: 'Morning session' },
    { id: 'B', name: 'Section B', description: 'Morning session' },
    { id: 'C', name: 'Section C', description: 'Afternoon session' },
    { id: 'D', name: 'Section D', description: 'Afternoon session' },
    { id: 'E', name: 'Section E', description: 'Evening session' },
    { id: 'F', name: 'Section F', description: 'Evening session' },
  ];
 const router = useRouter();
  const handleContinue = () => {
    // Navigate to next screen
    router.push({
      pathname: '/auth/AcademicYearScreen',
 
    });
    console.log('Selected section:', selectedSection);
  };

  const handleSectionSelect = (sectionId : string) => {
    setSelectedSection(sectionId);
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
          <Text style={styles.title}>Select Your Section</Text>
          <Text style={styles.subtitle}>
            Choose the section you belong to
          </Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.optionsContainer,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={[
                styles.sectionOption,
                selectedSection === section.id && styles.sectionOptionSelected
              ]}
              onPress={() => handleSectionSelect(section.id)}
              activeOpacity={0.7}
            >
              <View style={styles.sectionContent}>
                <View style={[
                  styles.sectionCircle,
                  selectedSection === section.id && styles.sectionCircleSelected
                ]}>
                  <Text style={[
                    styles.sectionLetter,
                    selectedSection === section.id && styles.sectionLetterSelected
                  ]}>
                    {section.id}
                  </Text>
                </View>
                <View style={styles.sectionTextContainer}>
                  <Text style={[
                    styles.sectionName,
                    selectedSection === section.id && styles.sectionNameSelected
                  ]}>
                    {section.name}
                  </Text>
                  <Text style={styles.sectionDescription}>
                    {section.description}
                  </Text>
                </View>
              </View>
              
              {selectedSection === section.id && (
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
              !selectedSection && styles.continueButtonDisabled
            ]}
            onPress={handleContinue}
            disabled={!selectedSection}
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
  sectionOption: {
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  sectionOptionSelected: {
    backgroundColor: '#E6F2FF',
    borderColor: '#007AFF',
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sectionCircleSelected: {
    backgroundColor: '#007AFF',
  },
  sectionLetter: {
    fontSize: 24,
    fontWeight: '700',
    color: '#8E8E93',
  },
  sectionLetterSelected: {
    color: '#FFFFFF',
  },
  sectionTextContainer: {
    flex: 1,
  },
  sectionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  sectionNameSelected: {
    color: '#007AFF',
  },
  sectionDescription: {
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

export default SectionScreen;