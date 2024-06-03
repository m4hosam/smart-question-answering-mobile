// components/QuestionCard.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Question } from "@/types/common.types";
// import { submitAnswer } from '@/lib/questionController'; // Assume you have a function to submit the answer

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.categoryText}>{question.category}</Text>
      <View style={styles.separator} />
      <Image source={{ uri: question.questionImage }} style={styles.image} />
      <Text style={styles.questionText}>{question.question}</Text>
      {question.Answer.length > 0 ? (
        <Text style={styles.answerText}>
          Answer: {question.Answer[0].answer}
        </Text>
      ) : (
        <Text style={styles.answerText}>No answer yet</Text>
      )}
    </View>
  );
};

export default QuestionCard;

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
