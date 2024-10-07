import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(10))),
      100
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(10.5))),
      300
    );

    setTimeout(() => navigation.navigate("Home"), 2500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* logo image with rings */}
      <Animated.View style={[styles.ring, { padding: ring2padding }]}>
        <Animated.View style={[styles.ring, { padding: ring1padding }]}>
          <Image
            source={{uri:'https://cdn.pixabay.com/photo/2013/07/12/17/43/newspaper-152320_1280.png'}}
            style={styles.logo}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>WHATS GOING ON!</Text>
        <Text style={styles.subtitle}>your latest news app</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6439FF", // amber-500
  },
  ring: {
    backgroundColor: "rgba(255, 255, 255, 0.2)", // white/20
    borderRadius: 9999, // full rounded
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  textContainer: {
    alignItems: "center",
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(5),
    fontWeight: "bold",
    color: "#FFFFFF", // white
    letterSpacing: 3, // tracking-widest
  },
  subtitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: "#FFFFFF", // white
    letterSpacing: 3, // tracking-widest
  },
});
