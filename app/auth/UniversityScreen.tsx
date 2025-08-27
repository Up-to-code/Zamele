import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
  TextInput,
  FlatList
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Sample university data
const universities = [
  { id: '1', name: 'Stanford University', location: 'Stanford, CA' },
  { id: '2', name: 'Harvard University', location: 'Cambridge, MA' },
  { id: '3', name: 'MIT', location: 'Cambridge, MA' },
  { id: '4', name: 'UC Berkeley', location: 'Berkeley, CA' },
  { id: '5', name: 'Yale University', location: 'New Haven, CT' },
  { id: '6', name: 'Princeton University', location: 'Princeton, NJ' },
  { id: '7', name: 'Columbia University', location: 'New York, NY' },
  { id: '8', name: 'University of Chicago', location: 'Chicago, IL' },
  { id: '9', name: 'University of Michigan', location: 'Ann Arbor, MI' },
  { id: '10', name: 'UCLA', location: 'Los Angeles, CA' },
];

const UniversityScreen = () => {
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUniversities, setFilteredUniversities] = useState(universities);
  const [animation] = useState(new Animated.Value(0));
  const router = useRouter();
  const params = useLocalSearchParams();
  const userType = params.userType as string;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [animation]);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredUniversities(universities);
    } else {
      const filtered = universities.filter(
        uni => uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               uni.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUniversities(filtered);
    }
  }, [searchQuery]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const handleContinue = (): void => {
    if (selectedUniversity) {
      router.push({
        pathname: '/auth/SectionScreen',
        params: { 
          userType: userType,
          universityId: selectedUniversity 
        }
      });
    }
  };

  const renderUniversityItem = ({ item }: { item: { id: string; name: string; location: string } }) => (
    <TouchableOpacity
      style={[
        styles.universityItem,
        selectedUniversity === item.id && styles.universityItemSelected
      ]}
      onPress={() => setSelectedUniversity(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.universityInfo}>
        <Text style={[
          styles.universityName,
          selectedUniversity === item.id && styles.universityNameSelected
        ]}>
          {item.name}
        </Text>
        <Text style={styles.universityLocation}>{item.location}</Text>
      </View>
      {selectedUniversity === item.id && (
        <View style={styles.checkmarkContainer}>
          <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.header, { opacity, transform: [{ translateY }] }]}>
        <Text style={styles.title}>Select Your University</Text>
        <Text style={styles.subtitle}>Choose your institution to continue</Text>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search universities..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>
      </Animated.View>

      <FlatList
        data={filteredUniversities}
        renderItem={renderUniversityItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      />

      <Animated.View style={[styles.footer, { opacity, transform: [{ translateY }] }]}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedUniversity && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedUniversity}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>
            Continue
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: '#8E8E93',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  universityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  universityItemSelected: {
    backgroundColor: '#E6F2FF',
    borderRadius: 10,
  },
  universityInfo: {
    flex: 1,
  },
  universityName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  universityNameSelected: {
    color: '#007AFF',
  },
  universityLocation: {
    fontSize: 15,
    color: '#8E8E93',
  },
  checkmarkContainer: {
    marginLeft: 12,
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    backgroundColor: '#FFFFFF',
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

export default UniversityScreen;