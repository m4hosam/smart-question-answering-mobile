import {
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import FeatureButton from "@/components/FeatureButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("token: ", token);
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);
  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View
          className="w-full flex flex-row flex-wrap justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <FeatureButton
            title="Sign in"
            route="/sign-in"
            icon={<Entypo name="game-controller" size={35} color="black" />}
          />
          <FeatureButton
            title="Sign Up"
            route="/sign-up"
            icon={<Entypo name="game-controller" size={35} color="black" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
