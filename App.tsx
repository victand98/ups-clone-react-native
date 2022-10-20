import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwind-rn";
import RootNavigator from "./navigator/RootNavigator";
import utilities from "./tailwind.json";

export default function App() {
  return (
    // @ts-ignore
    <TailwindProvider utilities={utilities}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </TailwindProvider>
  );
}
