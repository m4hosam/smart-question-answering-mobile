import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { register } from "@/lib/authController";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      Alert.alert("Please fill in all fields");
      return;
    }
    try {
      const registerResponse = await register(email, password, name);
      console.log("registerStatus", registerResponse);
      if (registerResponse?.status === 200) {
        router.push("/");
      } else {
        Alert.alert(registerResponse?.data);
      }
      // Store the token securely
      //   await AsyncStorage.setItem('token', token);
      // Navigate to the main app
      //   navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Login failed",
        "Please check your email and password and try again."
      );
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          className="w-full flex flex-row flex-wrap justify-center px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <View className="flex-1 justify-center mt-9">
            <Text className="text-2xl font-bold text-center">Sign Up</Text>
            <Text>Name</Text>
            <TextInput
              className="flex justify-center p-2 rounded-lg border-2 border-gray-300 mt-2"
              // style={styles.input}
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
              // keyword type as name
            />
            <Text>Email</Text>
            <TextInput
              className="flex justify-center p-2 rounded-lg border-2 border-gray-300 mt-2"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Text>Password</Text>
            <TextInput
              className="flex justify-center p-2 rounded-lg border-2 border-gray-300 my-2"
              // style={styles.input}            value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignUp} />
            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-black font-pregular">
                Already have an account?
              </Text>
              <Link
                href="/sign-in"
                className="text-lg font-psemibold text-secondary text-blue-500"
              >
                Login
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
