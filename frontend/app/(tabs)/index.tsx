import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';



export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.title, { flex: 0.5}]}>JOY</Text>
      <View style={[styles.card, { flex: 6 }]}>
      <LinearGradient 
       colors={['#00ab4d', '#fff']}
       locations={[0.5, 0.5]}
       style={styles.background}
      > 
      <View style={styles.textContainer}>
    <Text style={styles.pointsText}>у вас X баллов</Text>
  </View>
      </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    flexDirection: 'column',
    flex: 1,
  },
  background: {
    left: 0,
    right: 0,
    top: 0,
    height: 300,
    borderRadius: 10,
    justifyContent: 'flex-end',
    paddingBottom: 20    
  },
  card: {
    width: '90%', 
    height: '30%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: { 

  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  }
});
