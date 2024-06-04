import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {  getTeacherQuestions } from "@/lib/questionController";
import {  TeacherQuestion } from "@/types/common.types";
import RNPickerSelect from "react-native-picker-select";
import QuestionCardTeacher from "@/components/QuestionCardTeacher";

const categories = [
  { label: "Matematik", value: "Matematik" },
  { label: "Tarih", value: "Tarih" },
  { label: "Türkçe", value: "Türkçe" },
  { label: "Biyoloji", value: "Biyoloji" },
  { label: "Felsefe", value: "Felsefe" },
  { label: "Coğrafya", value: "Coğrafya" },
  { label: "Fizik", value: "Fizik" },
  { label: "Kimya", value: "Kimya" },
  { label: "Kültürü", value: "Kültürü" },
  { label: "Geometri", value: "Geometri" },
];

const Teacher = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questions, setQuestions] = useState<TeacherQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  const fetchQuestions = async () => {
    const teacherToken = await AsyncStorage.getItem("token");
    if (!teacherToken) {
      Alert.alert("Unautherized");
      setLoading(false);
      return;
    }
    try {
      const questionsResponse = await getTeacherQuestions(teacherToken);
      if (questionsResponse?.status === 200) {
        setQuestions(questionsResponse?.data);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      Alert.alert("Error fetching questions");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem("role");
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        Alert.alert("Error fetching user role");
      }
    };
    fetchUserRole();
    fetchQuestions();
  }, []);

  const filteredQuestions = selectedCategory
    ? questions.filter((question) => question.category === selectedCategory)
    : questions;

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (userRole !== "teacher") {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.unauthorizedText}>Unauthorized</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full px-4 mb-6">
          <Text style={styles.label}>Select Category:</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedCategory(value)}
            items={categories}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a category...", value: null }}
          />
        </View>
        <View style={styles.questionsContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            filteredQuestions.map((question) => (
              <QuestionCardTeacher
                key={question.id}
                question={question}
                fetchQuestions={fetchQuestions}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Teacher;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  unauthorizedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  selectedCategoryText: {
    fontSize: 16,
    marginTop: 16,
  },
  questionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    width: "100%",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
