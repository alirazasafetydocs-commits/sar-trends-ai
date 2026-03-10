// SAR Trends AI - Mobile App
// Built with React Native & Expo

import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// ========================================
// Navigation
// ========================================
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Auth Stack
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Home Stack
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ResumeGenerator" component={ResumeGeneratorScreen} />
      <Stack.Screen name="CoverLetter" component={CoverLetterScreen} />
      <Stack.Screen name="HSEDocuments" component={HSEDocumentsScreen} />
      <Stack.Screen name="WebsiteBuilder" component={WebsiteBuilderScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Tools') iconName = focused ? 'construct' : 'construct-outline';
          else if (route.name === 'Documents') iconName = focused ? 'document-text' : 'document-text-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6366f1',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: styles.tabBar,
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Tools" component={ToolsScreen} />
      <Tab.Screen name="Documents" component={DocumentsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// ========================================
// Screens
// ========================================

// Login Screen
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Demo login - in production, call API
    if (email && password) {
      navigation.replace('MainTabs');
    } else {
      Alert.alert('Error', 'Please enter email and password');
    }
  };

  return (
    <View style={styles.authContainer}>
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <Ionicons name="brain" size={40} color="white" />
        </View>
        <Text style={styles.logoText}>SAR Trends AI</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Register Screen
function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (name && email && password) {
      Alert.alert('Success', 'Account created! Please login.');
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
  };

  return (
    <View style={styles.authContainer}>
      <View style={styles.logoContainer}>
        <View style={styles.logoIcon}>
          <Ionicons name="brain" size={40} color="white" />
        </View>
        <Text style={styles.logoText}>SAR Trends AI</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#94a3b8"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.primaryButtonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Home Screen
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <View style={styles.planBadge}>
            <Text style={styles.planText}>Pro Plan</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Generations Left</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>23</Text>
            <Text style={styles.statLabel}>Documents</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('ResumeGenerator')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#6366f1' }]}>
              <Ionicons name="document-text" size={24} color="white" />
            </View>
            <Text style={styles.actionText}>Resume</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('CoverLetter')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#10b981' }]}>
              <Ionicons name="mail" size={24} color="white" />
            </View>
            <Text style={styles.actionText}>Cover Letter</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('HSEDocuments')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#f59e0b' }]}>
              <Ionicons name="shield-checkmark" size={24} color="white" />
            </View>
            <Text style={styles.actionText}>HSE Docs</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionCard}
            onPress={() => navigation.navigate('WebsiteBuilder')}
          >
            <View style={[styles.actionIcon, { backgroundColor: '#06b6d4' }]}>
              <Ionicons name="globe" size={24} color="white" />
            </View>
            <Text style={styles.actionText}>Website</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Recent Documents</Text>
        
        <View style={styles.documentsList}>
          <View style={styles.documentItem}>
            <Ionicons name="document-text" size={24} color="#6366f1" />
            <View style={styles.documentInfo}>
              <Text style={styles.documentTitle}>Professional Resume</Text>
              <Text style={styles.documentDate}>Today, 10:30 AM</Text>
            </View>
          </View>
          <View style={styles.documentItem}>
            <Ionicons name="document-text" size={24} color="#10b981" />
            <View style={styles.documentInfo}>
              <Text style={styles.documentTitle}>Cover Letter - Tech Corp</Text>
              <Text style={styles.documentDate}>Yesterday, 2:15 PM</Text>
            </View>
          </View>
          <View style={styles.documentItem}>
            <Ionicons name="document-text" size={24} color="#f59e0b" />
            <View style={styles.documentInfo}>
              <Text style={styles.documentTitle}>Risk Assessment</Text>
              <Text style={styles.documentDate}>Jan 5, 2024</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Resume Generator Screen
function ResumeGeneratorScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState('');

  const generateResume = () => {
    Alert.alert('Success', 'Resume generated! Check your documents.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>ATS Resume Generator</Text>
        <Text style={styles.screenSubtitle}>Create professional ATS-optimized resumes</Text>
      </View>
      
      <ScrollView style={styles.formScroll}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#94a3b8"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            placeholderTextColor="#94a3b8"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Professional Summary"
            placeholderTextColor="#94a3b8"
            value={summary}
            onChangeText={setSummary}
            multiline
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Skills (comma separated)"
            placeholderTextColor="#94a3b8"
            value={skills}
            onChangeText={setSkills}
            multiline
          />
          
          <TouchableOpacity style={styles.primaryButton} onPress={generateResume}>
            <Text style={styles.primaryButtonText}>Generate Resume</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Cover Letter Screen
function CoverLetterScreen() {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [manager, setManager] = useState('');
  const [yourName, setYourName] = useState('');

  const generate = () => {
    Alert.alert('Success', 'Cover letter generated!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Cover Letter Generator</Text>
      </View>
      
      <ScrollView style={styles.formScroll}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Position Title"
            placeholderTextColor="#94a3b8"
            value={position}
            onChangeText={setPosition}
          />
          <TextInput
            style={styles.input}
            placeholder="Company Name"
            placeholderTextColor="#94a3b8"
            value={company}
            onChangeText={setCompany}
          />
          <TextInput
            style={styles.input}
            placeholder="Hiring Manager Name"
            placeholderTextColor="#94a3b8"
            value={manager}
            onChangeText={setManager}
          />
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#94a3b8"
            value={yourName}
            onChangeText={setYourName}
          />
          
          <TouchableOpacity style={styles.primaryButton} onPress={generate}>
            <Text style={styles.primaryButtonText}>Generate Cover Letter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// HSE Documents Screen
function HSEDocumentsScreen() {
  const [docType, setDocType] = useState('risk-assessment');

  const docTypes = [
    { id: 'risk-assessment', name: 'Risk Assessment', icon: 'warning' },
    { id: ' rams', name: 'RAMS', icon: 'shield-checkmark' },
    { id: 'method-statement', name: 'Method Statement', icon: 'list' },
    { id: 'toolbox-talk', name: 'Toolbox Talk', icon: 'megaphone' },
    { id: 'incident-report', name: 'Incident Report', icon: 'alert-circle' },
  ];

  const generateDocument = () => {
    Alert.alert('Success', `${docTypes.find(d => d.id === docType)?.name} generated!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>HSE Documents</Text>
      </View>
      
      <ScrollView style={styles.formScroll}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Select Document Type</Text>
          
          {docTypes.map(type => (
            <TouchableOpacity
              key={type.id}
              style={[styles.optionCard, docType === type.id && styles.optionCardSelected]}
              onPress={() => setDocType(type.id)}
            >
              <Ionicons 
                name={type.icon} 
                size={24} 
                color={docType === type.id ? '#6366f1' : '#94a3b8'} 
              />
              <Text style={[
                styles.optionText,
                docType === type.id && styles.optionTextSelected
              ]}>
                {type.name}
              </Text>
            </TouchableOpacity>
          ))}
          
          <TextInput
            style={styles.input}
            placeholder="Project Name"
            placeholderTextColor="#94a3b8"
          />
          
          <TouchableOpacity style={styles.primaryButton} onPress={generateDocument}>
            <Text style={styles.primaryButtonText}>Generate Document</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Website Builder Screen
function WebsiteBuilderScreen() {
  const [businessName, setBusinessName] = useState('');
  const [industry, setIndustry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const generateWebsite = () => {
    Alert.alert('Success', 'Website generated! Check your documents.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>AI Website Builder</Text>
        <Text style={styles.screenSubtitle}>Create a modern website in minutes</Text>
      </View>
      
      <ScrollView style={styles.formScroll}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Business Name"
            placeholderTextColor="#94a3b8"
            value={businessName}
            onChangeText={setBusinessName}
          />
          <TextInput
            style={styles.input}
            placeholder="Industry"
            placeholderTextColor="#94a3b8"
            value={industry}
            onChangeText={setIndustry}
          />
          <TextInput
            style={styles.input}
            placeholder="Business Email"
            placeholderTextColor="#94a3b8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#94a3b8"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          
          <TouchableOpacity style={styles.primaryButton} onPress={generateWebsite}>
            <Text style={styles.primaryButtonText}>Build Website</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Payment Screen
function PaymentScreen() {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('easypaisa');

  const submitPayment = () => {
    Alert.alert(
      'Payment Instructions',
      'Please transfer to:\n\nEasyPaisa: +92 345 4837460\nMeezan Bank: 77010105779192\n\nThen upload your screenshot for verification.',
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Payment</Text>
        <Text style={styles.screenSubtitle}>Upgrade your plan</Text>
      </View>
      
      <ScrollView style={styles.formScroll}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Select Plan</Text>
          
          <TouchableOpacity 
            style={[styles.optionCard, method === 'easypaisa' && styles.optionCardSelected]}
            onPress={() => setMethod('easypaisa')}
          >
            <Ionicons name="wallet" size={24} color={method === 'easypaisa' ? '#6366f1' : '#94a3b8'} />
            <Text style={styles.optionText}>EasyPaisa - $19/mo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.optionCard, method === 'bank' && styles.optionCardSelected]}
            onPress={() => setMethod('bank')}
          >
            <Ionicons name="business" size={24} color={method === 'bank' ? '#6366f1' : '#94a3b8'} />
            <Text style={styles.optionText}>Meezan Bank - $19/mo</Text>
          </TouchableOpacity>

          <View style={styles.paymentInfo}>
            <Text style={styles.paymentTitle}>Payment Details</Text>
            <Text style={styles.paymentText}>EasyPaisa: +92 345 4837460</Text>
            <Text style={styles.paymentText}>Meezan Bank: 77010105779192</Text>
          </View>
          
          <TouchableOpacity style={styles.primaryButton} onPress={submitPayment}>
            <Text style={styles.primaryButtonText}>Upload Payment Proof</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Tools Screen
function ToolsScreen() {
  const tools = [
    { id: 1, name: 'ATS Resume', icon: 'document-text', color: '#6366f1' },
    { id: 2, name: 'Cover Letter', icon: 'mail', color: '#10b981' },
    { id: 3, name: 'Risk Assessment', icon: 'warning', color: '#f59e0b' },
    { id: 4, name: 'RAMS', icon: 'shield-checkmark', color: '#ef4444' },
    { id: 5, name: 'Method Statement', icon: 'list', color: '#8b5cf6' },
    { id: 6, name: 'Toolbox Talk', icon: 'megaphone', color: '#06b6d4' },
    { id: 7, name: 'Incident Report', icon: 'alert-circle', color: '#ec4899' },
    { id: 8, name: 'Website Builder', icon: 'globe', color: '#14b8a6' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>AI Tools</Text>
      </View>
      
      <ScrollView style={styles.formScroll}>
        <View style={styles.toolsGrid}>
          {tools.map(tool => (
            <View key={tool.id} style={styles.toolCard}>
              <View style={[styles.toolIcon, { backgroundColor: tool.color }]}>
                <Ionicons name={tool.icon} size={28} color="white" />
              </View>
              <Text style={styles.toolName}>{tool.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Documents Screen
function DocumentsScreen() {
  const documents = [
    { id: 1, name: 'Resume - John Doe', type: 'Resume', date: 'Today, 10:30 AM' },
    { id: 2, name: 'Cover Letter - Tech Corp', type: 'Cover Letter', date: 'Yesterday' },
    { id: 3, name: 'Risk Assessment', type: 'HSE', date: 'Jan 5, 2024' },
    { id: 4, name: 'My Website', type: 'Website', date: 'Jan 3, 2024' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>My Documents</Text>
      </View>
      
      <ScrollView style={styles.formScroll}>
        {documents.map(doc => (
          <View key={doc.id} style={styles.docCard}>
            <View style={styles.docIcon}>
              <Ionicons name="document-text" size={24} color="#6366f1" />
            </View>
            <View style={styles.docDetails}>
              <Text style={styles.docName}>{doc.name}</Text>
              <Text style={styles.docMeta}>{doc.type} • {doc.date}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="download-outline" size={24} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// Profile Screen
function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Profile</Text>
      </View>
      
      <ScrollView style={styles.formScroll}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john@example.com</Text>
          <View style={styles.planBadgeLarge}>
            <Text style={styles.planTextLarge}>Pro Plan</Text>
          </View>
        </View>

        <View style={styles.profileOptions}>
          <TouchableOpacity style={styles.profileOption}>
            <Ionicons name="person-outline" size={24} color="#94a3b8" />
            <Text style={styles.profileOptionText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={24} color="#94a3b8" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.profileOption}
            onPress={() => navigation.navigate('Payment')}
          >
            <Ionicons name="card-outline" size={24} color="#94a3b8" />
            <Text style={styles.profileOptionText}>Upgrade Plan</Text>
            <Ionicons name="chevron-forward" size={24} color="#94a3b8" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.profileOption}>
            <Ionicons name="settings-outline" size={24} color="#94a3b8" />
            <Text style={styles.profileOptionText}>Settings</Text>
            <Ionicons name="chevron-forward" size={24} color="#94a3b8" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.profileOption}>
            <Ionicons name="help-circle-outline" size={24} color="#94a3b8" />
            <Text style={styles.profileOptionText}>Support</Text>
            <Ionicons name="chevron-forward" size={24} color="#94a3b8" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.profileOption, styles.logoutOption]}>
            <Ionicons name="log-out-outline" size={24} color="#ef4444" />
            <Text style={[styles.profileOptionText, { color: '#ef4444' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ========================================
// Main App Component
// ========================================
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

// ========================================
// Styles
// ========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  scrollView: {
    flex: 1,
  },
  authContainer: {
    flex: 1,
    backgroundColor: '#0f0f23',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#6366f1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  formContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
  },
  input: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    color: 'white',
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2d3748',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#6366f1',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    color: '#94a3b8',
    fontSize: 14,
  },
  userName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  planBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  planText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  statNumber: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  actionCard: {
    width: '47%',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  documentsList: {
    paddingHorizontal: 20,
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  documentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  documentTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  documentDate: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  tabBar: {
    backgroundColor: '#1a1a2e',
    borderTopColor: '#2d3748',
    paddingBottom: 8,
    paddingTop: 8,
    height: 60,
  },
  screenHeader: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#0f0f23',
  },
  screenTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  screenSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 4,
  },
  formScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: '#6366f1',
  },
  optionText: {
    color: '#94a3b8',
    fontSize: 16,
    marginLeft: 12,
  },
  optionTextSelected: {
    color: 'white',
  },
  paymentInfo: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  paymentTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  paymentText: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 4,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingBottom: 20,
  },
  toolCard: {
    width: '47%',
    backgroundColor: '#1a1a2e',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  toolIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  docIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#16213e',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  docDetails: {
    flex: 1,
    marginLeft: 12,
  },
  docName: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  docMeta: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#6366f1',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileName: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
  profileEmail: {
    color: '#94a3b8',
    fontSize: 14,
    marginTop: 4,
  },
  planBadgeLarge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  planTextLarge: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  profileOptions: {
    paddingHorizontal: 20,
  },
  profileOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  profileOptionText: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
  },
  logoutOption: {
    marginTop: 20,
  },
});

