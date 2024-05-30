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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(
        "https://smart-question-answering-backend.vercel.app",
        {
          email,
          password,
        }
      );

      const { token } = response.data;
      console.log(token);
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
            <Text className="text-2xl font-bold text-center">Login</Text>
            <Text>Email</Text>
            <TextInput
              className="flex justify-center p-2 rounded-lg border-2 border-gray-300 mt-2"
              // style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Text>Password</Text>
            <TextInput
              className="flex justify-center p-2 rounded-lg border-2 border-gray-300 my-2"
              // style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-black font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg font-psemibold text-secondary text-blue-500"
              >
                Signup
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
