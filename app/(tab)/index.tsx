import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask, deleteTask, setFilterText, resetFields } from '../redux/taskSlice';
import { RootState, AppDispatch } from '../redux/store';
import { useRouter } from 'expo-router';


interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  isActive: boolean;
  comments: string[];
}

const Home = () => {
  const router:any = useRouter()
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filterText = useSelector((state: RootState) => state.tasks.filterText);

  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<string>('Working');
  const [isActive, setIsActive] = useState<boolean>(true);

  const statuses = ['Working', 'In-progress', 'Done', 'Testing', 'Deployed']

  const handleEditTask = (task: Task) => {
    dispatch(editTask({ id:task.id}));
    router.push('task');
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const resetFields = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskStatus('Working');
    setIsActive(true);
  };

  const filteredTasks = tasks.filter(task => task.title.includes(filterText));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Search tasks..."
          value={filterText}
          onChangeText={text => dispatch(setFilterText(text))}
        />
      </View>

      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <View style={[styles.taskItem, !item.isActive && styles.disabledTask]}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Status: {item.status}</Text>
            <View style={styles.taskActions}>
              <Button title="Edit" onPress={() => handleEditTask(item)} />
              <Button title="Delete" onPress={() => handleDeleteTask(item.id)} />
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />

    
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 10 },
  footer: { marginTop: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 },
  taskItem: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  disabledTask: { backgroundColor: '#f5f5f5' },
  taskTitle: { fontSize: 16, fontWeight: 'bold' },
  taskActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  statusButton: { padding: 5, borderWidth: 1, borderColor: '#ccc', margin: 2 },
  activeStatus: { backgroundColor: '#007BFF', color: '#fff' },
  activeToggle: { color: '#007BFF', textAlign: 'center', marginVertical: 10 },
})
