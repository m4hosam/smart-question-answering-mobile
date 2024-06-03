import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
  Text,
  Button,
  ActivityIndicator,
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
import RNPickerSelect from "react-native-picker-select";

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

  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View
          className="w-full flex flex-col flex-wrap justify-center items-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text style={styles.label}>Select Category:</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedCategory(value)}
            items={categories}
            style={pickerSelectStyles}
            placeholder={{ label: "Select a category...", value: null }}
          />
          {selectedCategory && (
            <Text style={styles.selectedCategoryText}>
              Selected Category: {selectedCategory}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Teacher;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  selectedCategoryText: {
    fontSize: 16,
    marginTop: 16,
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
