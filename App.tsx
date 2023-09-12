import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import List from "./App/screens/List";
import Details from "./App/screens/Details";
import Login from "./App/screens/Login";
import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="My todos" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  );
}
export default function App() {
  const [authenticated, setAuthenticated] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setAuthenticated(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Login"}>
        {authenticated ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{
              headerShown: false,
              headerTitleAlign: "center",
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              headerTitleAlign: "center",
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
