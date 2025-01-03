import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function RootLayout() {
  return (
    <Provider store={store}>

      <Stack>
          <Stack.Screen name="index" options={{headerShown:false}}/>
          <Stack.Screen name="(tab)" options={{headerShown:false}}/>
      </Stack>
    </Provider>

  );
}
