import React, { useState, useEffect } from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask, deleteTask, setFilterText, resetFields } from '../redux/taskSlice';
import { RootState, AppDispatch } from '../redux/store';

interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    isActive: boolean;
    comments: string[];
  }
  type TaskScreenRouteProp = RouteProp<{ Task: { id: string } }, 'Task'>;

const Task = ({ route }: { route: "TaskScreenRouteProp" }) => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filterText = useSelector((state: RootState) => state.tasks.filterText);
  const editTaskId = useSelector((state: RootState) => state.tasks.editTaskId);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [taskStatus, setTaskStatus] = useState<string>('Working');
  const [isActive, setIsActive] = useState<boolean>(true);

  const statuses = ['Working', 'In-progress', 'Done', 'Testing', 'Deployed'];


  useEffect(() => {
    if (editTaskId) {
      const taskToEdit = tasks.find(task => task.id === editTaskId);
      if (taskToEdit) {
        setTaskTitle(taskToEdit.title);
        setTaskDescription(taskToEdit.description);
        setTaskStatus(taskToEdit.status);
        setIsActive(taskToEdit.isActive);
      }
    }
  }, [editTaskId, tasks]);

  const handleAddTask = () => {
    dispatch(addTask({ title: taskTitle, description: taskDescription, status: taskStatus, isActive, comments: [] }));
    resetFields();
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
     
    <View style={styles.footer}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        value={taskDescription}
        onChangeText={setTaskDescription}
      />
      <View>
        {statuses.map(status => (
          <TouchableOpacity key={status} onPress={() => setTaskStatus(status)}>
            <Text style={[styles.statusButton, taskStatus === status && styles.activeStatus]}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => setIsActive(!isActive)}>
        <Text style={styles.activeToggle}>{isActive ? 'Deactivate' : 'Activate'} Task</Text>
      </TouchableOpacity>
      <Button title={editTaskId ? "Update Task" : "Add Task"} onPress={handleAddTask} />
    </View>
  </View>
  )
}

export default Task

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

