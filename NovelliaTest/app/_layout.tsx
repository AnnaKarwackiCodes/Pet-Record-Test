import { Stack, Tabs } from "expo-router";
import store from "../Redux/store";
import { Provider} from 'react-redux'

export default function RootLayout() {
  return (
  <Provider store={store}>
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" options={{title: 'Home'}} />
      <Stack.Screen name="dashboard" options={{title: 'DashBoard'}} />
      <Stack.Screen name="petProfile" options={{title: 'Pet Profile'}} />
    </Stack>
  </Provider>
  )
}
