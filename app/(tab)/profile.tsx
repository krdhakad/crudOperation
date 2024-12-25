import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import { logout } from './../redux/taskSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.tasks.userDetails);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      {userDetails ? (
        <>
          <Text>Welcome, {userDetails}!</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default Profile;