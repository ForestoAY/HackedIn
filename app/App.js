import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import AddPost from "./pages/AddPost";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";

const logo = require("./assets/hacktiv8.png");
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#83B4FF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          header: ({ navigation }) => {
            return (
              <View
                style={{
                  height: 80,
                  backgroundColor: "#83B4FF",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image source={logo} style={{ width: 100, height: 100 }} />
                  <Text
                    style={{ fontSize: 24, fontWeight: "600", color: "#fff" }}
                  >
                    HackedIn
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={{ paddingHorizontal: 8 }}
                    onPress={() => {
                      navigation.navigate("Add");
                    }}
                  >
                    <Text
                      style={{ fontSize: 20, color: "#fff", fontWeight: "600" }}
                    >
                      Add post
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          headerStyle: { backgroundColor: "#83B4FF" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          headerStyle: { backgroundColor: "#83B4FF" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ height: "100%" }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeStack"
              component={HomeTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Add"
              component={AddPost}
              options={{
                headerStyle: { backgroundColor: "#83B4FF" },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold" },
              }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailPage}
              options={{
                headerStyle: { backgroundColor: "#83B4FF" },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold" },
              }}
            />
            {/* <LoginPage /> */}
            {/* <RegisterPage /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
