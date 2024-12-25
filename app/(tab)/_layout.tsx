import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";

const TabLayout = () => {
  return (
    <NavigationContainer>

    <Tabs
      screenOptions={{ tabBarActiveTintColor: "green", headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <Octicons name="home" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: "Task",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <MaterialIcons name="add-circle" size={24} color="black" />
            ) : (
              <MaterialIcons
                name="add-circle-outline"
                size={24}
                color="black"
              />
            ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            focused ? (
              <Ionicons name="person-circle" size={24} color="black" />
            ) : (
              <Ionicons name="person-circle-outline" size={24} color="black" />
            ),
        }}
      />
    </Tabs>
    </NavigationContainer>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
