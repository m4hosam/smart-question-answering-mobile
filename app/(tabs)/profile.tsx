import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  Text,
  Button,
  ActivityIndicator,
  Touchable,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import FeatureButton from "@/components/FeatureButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMyQuestions, deleteQuestion } from "@/lib/questionController";
import { Question } from "@/types/common.types";

export default function HomeScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const fetchQuestions = async (token: string) => {
    try {
      const questionsResponse = await getMyQuestions(token);
      if (questionsResponse?.status !== 200) {
        console.log("questionsResponse: ", questionsResponse?.data);
        Alert.alert("Error", "Unautherized user, please sign in again.");
      } else {
        // console.log("questionsResponse: ", questionsResponse);
        setQuestions(questionsResponse?.data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this question?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              if (token) {
                await deleteQuestion(id, token);
                setQuestions(
                  questions.filter((question) => question.id !== id)
                );
                Alert.alert("Success", "Question deleted successfully");
              }
            } catch (error) {
              console.error("Error deleting question:", error);
              Alert.alert("Error", "Failed to delete question");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("token: ", token);
      setLoading(false);
      if (!token) {
        setIsAuthenticated(false);
        router.push("/sign-in");
      } else {
        setIsAuthenticated(true);
        fetchQuestions(token);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (isAuthenticated === false) {
    return (
      <SafeAreaView className=" h-full">
        <ScrollView>
          <View
            className="w-full flex flex-col flex-wrap justify-center items-center h-full px-4 my-6"
            style={{
              minHeight: Dimensions.get("window").height - 100,
            }}
          >
            <FeatureButton
              title="Sign in"
              route="/sign-in"
              icon={<FontAwesome name="sign-in" size={24} color="black" />}
            />
            <FeatureButton
              title="Sign Up"
              route="/sign-up"
              icon={<FontAwesome name="sign-in" size={24} color="black" />}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View
          className="w-full flex flex-row flex-wrap justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <TouchableOpacity
            onPress={handleSignOut}
            className="w-40 p-2 bg-orange-300 m-2   flex flex-row items-center justify-center rounded-xl mb-8"
          >
            <Text>Sign Out</Text>
          </TouchableOpacity>

          <View style={styles.questionsContainer}>
            {questions?.map((question) => (
              <View key={question.id} style={styles.card}>
                <Image
                  source={{ uri: question.questionImage }}
                  style={styles.image}
                />
                <Text style={styles.questionText}>{question.question}</Text>
                <View className="flex flex-row justify-between items-center">
                  {question.Answer.length > 0 ? (
                    <Text style={styles.answerText}>
                      Answer: {question.Answer[0].answer}
                    </Text>
                  ) : (
                    <Text style={styles.answerText}>No answer yet</Text>
                  )}
                  <TouchableOpacity
                    className="bg-red-500 p-2 rounded-lg"
                    onPress={() => handleDelete(question.id)}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                  {/* <Button
                    title="Delete"
                    // onPress={() => handleDelete(question.id)}
                  /> */}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  questionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 8,
  },
  answerText: {
    fontSize: 14,
    color: "gray",
  },
});
