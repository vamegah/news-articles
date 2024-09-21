import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import MyArticlesScreen from "../screens/MyArticlesScreen";
import CustomNewsScreen from "../screens/CustomNewsScreen";
import NewsFormScreen from "../screens/NewsFormScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ArticleDetailScreen from "../screens/ArticleDetailScreen";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
        <Stack.Screen name="MyArticles" component={MyArticlesScreen} />
        <Stack.Screen name="CustomNewsScreen" component={CustomNewsScreen} />
        <Stack.Screen name="NewsFormScreen" component={NewsFormScreen} />
        <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
