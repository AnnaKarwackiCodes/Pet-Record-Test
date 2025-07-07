import { Stack, Tabs } from "expo-router";
import store from "../Redux/store";
import { Provider} from 'react-redux'

export default function RootLayout() {
  return (
  <Provider store={store}>
    <Tabs>
      <Tabs.Screen name="index" options={{title: 'Home'}} />
      <Tabs.Screen name="testpage" options={{title: 'Test'}} />
    </Tabs>
  </Provider>
  )
}
