import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Question, TeacherQuestion } from "@/types/common.types";
import { createAnswer } from "@/lib/answerController"; // Assume you have a function to submit the answer

interface QuestionCardProps {
  question: TeacherQuestion;
  fetchQuestions: () => void; // Function to refresh the questions
}

const QuestionCardTeacher: React.FC<QuestionCardProps> = ({
  question,
  fetchQuestions,
}) => {
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!answer.trim()) {
      Alert.alert("Answer can not be empty");
      return;
    }

    const teacherAnswer = {
      question_id: question.id,
      answer: answer,
      answerImage: "",
    };
    const teacherToken = await AsyncStorage.getItem("token");
    if (!teacherToken) {
      Alert.alert("Unauthorized");
      return;
    }

    setLoading(true);

    try {
      const answerResponse = await createAnswer(teacherAnswer, teacherToken);
      if (answerResponse?.status === 200) {
        Alert.alert("Answer added successfully");
        setAnswer("");
        fetchQuestions(); // Refresh the questions feed
      } else {
        Alert.alert(
          "Error",
          answerResponse?.data.message || "Failed to submit answer"
        );
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      Alert.alert("Error submitting answer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.categoryText}>{question.category}</Text>
      <View style={styles.separator} />
      <Image source={{ uri: question.questionImage }} style={styles.image} />
      <Text style={styles.questionText}>{question.question}</Text>
      <TextInput
        style={styles.input}
        placeholder="Write your answer"
        value={answer}
        onChangeText={setAnswer}
        editable={!loading}
      />
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <TouchableOpacity
          onPress={handleSubmit}
          className="flex flex-row items-center justify-center bg-green-400 rounded-lg py-2 px-5"
        >
          <Text>Submit Answer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QuestionCardTeacher;

const styles = StyleSheet.create({
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
  categoryText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginVertical: 8,
    borderRadius: 4,
  },
});
