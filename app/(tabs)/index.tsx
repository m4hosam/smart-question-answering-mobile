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
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { AntDesign, FontAwesome, Entypo } from "@expo/vector-icons";
import FeatureButton from "@/components/FeatureButton";
import { getAllQuestions } from "@/lib/questionController";
import { Question } from "@/types/common.types";

export default function HomeScreen() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsResponse = await getAllQuestions();
        let questions: Question[] = [];
        if (questionsResponse?.status === 200) {
          setQuestions(questionsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  // const questions = await getAllQuestions();
  // console.log(questions);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {/* <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            paddingHorizontal: 16,
            marginVertical: 24,
            minHeight: Dimensions.get("window").height - 100,
          }}
        > */}
        <FeatureButton
          title="Sign in"
          route="/sign-in"
          icon={<Entypo name="game-controller" size={35} color="black" />}
        />
        {/* </View> */}

        <View style={styles.questionsContainer}>
          {questions.map((question) => (
            <View key={question.id} style={styles.card}>
              <Image
                source={{ uri: question.questionImage }}
                style={styles.image}
              />
              <Text style={styles.questionText}>{question.question}</Text>
              {question.Answer.length > 0 ? (
                <Text style={styles.answerText}>
                  Answer: {question.Answer[0].answer}
                </Text>
              ) : (
                <Text style={styles.answerText}>No answer yet</Text>
              )}
            </View>
          ))}
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
