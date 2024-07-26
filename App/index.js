// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    ScrollView, 
    View, 
    Button, 
    ActivityIndicator 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([
        { id: '1', name: 'Push-ups', sets: 3, reps: 12 },
        { id: '2', name: 'Squats', sets: 4, reps: 15 },
        { id: '3', name: 'Pull-ups', sets: 3, reps: 10 },
    ]);
    const [selectedWorkout, setSelectedWorkout] = useState('1');
    const [loading, setLoading] = useState(false);

    const handleSelectChange = (itemValue) => {
        setSelectedWorkout(itemValue);
    };

    const handleAddSet = () => {
        setLoading(true);
        setTimeout(() => {
            setWorkouts((prevWorkouts) => 
                prevWorkouts.map((workout) => 
                    workout.id === selectedWorkout ? { ...workout, sets: workout.sets + 1 } : workout
                )
            );
            setLoading(false);
        }, 1000);
    };

    return (
        <ScrollView contentContainerStyle={styles.list}>
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
            {workouts.map((workout) => (
                <View key={workout.id} style={styles.workoutContainer}>
                    <Text style={styles.workoutTitle}>{workout.name}</Text>
                    <Text style={styles.workoutDetail}>Sets: {workout.sets}</Text>
                    <Text style={styles.workoutDetail}>Reps: {workout.reps}</Text>
                </View>
            ))}
            <Picker
                selectedValue={selectedWorkout}
                style={styles.picker}
                onValueChange={handleSelectChange}
            >
                {workouts.map((workout) => (
                    <Picker.Item key={workout.id} label={workout.name} value={workout.id} />
                ))}
            </Picker>
            <Button title="Add Set" onPress={handleAddSet} />
        </ScrollView>
    );
};

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Workout Tracker</Text>
            <WorkoutList />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    list: {
        paddingVertical: 20,
    },
    workoutContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    workoutTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    workoutDetail: {
        fontSize: 16,
        marginVertical: 5,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
});

export default App;